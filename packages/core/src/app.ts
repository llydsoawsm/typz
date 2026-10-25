import { Hono } from 'hono';
import type { Context as HonoContext } from 'hono';
import { serve } from '@hono/node-server';
import { ZodError } from 'zod';
import type {
  TypzAppConfig,
  TypzMiddleware,
  ValidationErrors,
} from './types.js';
import { Route } from './routing/route.js';
import { TypzRequest } from './http/request.js';
import { response } from './http/response.js';
import {
  HttpException,
  NotFoundException,
  ValidationException,
} from './http/exceptions.js';
import { cors } from './middleware/index.js';

export class TypzApp {
  public readonly hono: Hono;
  private _globalMiddlewares: TypzMiddleware[] = [];
  private _config: TypzAppConfig;

  constructor(config: TypzAppConfig = {}) {
    this._config = {
      port: 3000,
      debug: process.env.NODE_ENV !== 'production',
      ...config,
    };
    this.hono = new Hono();
    this.setupErrorHandling();
  }

  /**
   * Helper to obtain or instantiate a shared TypzRequest for the context
   */
  public getRequest(c: HonoContext): TypzRequest {
    let req = c.get('typz_request') as TypzRequest | undefined;
    if (!req) {
      req = new TypzRequest(c);
      c.set('typz_request', req);
    }
    return req;
  }

  /**
   * Register global middleware
   */
  use(middleware: TypzMiddleware): this {
    this._globalMiddlewares.push(middleware);
    this.hono.use('*', async (c: HonoContext, next) => {
      const req = this.getRequest(c);
      let nextCalled = false;
      const res = await middleware(req, async () => {
        nextCalled = true;
        await next();
      });
      if (res instanceof Response) return res;
    });
    return this;
  }

  /**
   * Setup error handlers and 404 fallback
   */
  private setupErrorHandling(): void {
    // 404 handler
    this.hono.notFound((c) => {
      const payload = {
        success: false,
        message: `Route not found: ${c.req.method} ${c.req.path}`,
      };
      return c.json(payload, 404);
    });

    // Global exception handler
    this.hono.onError((err, c) => {
      // Typz HttpExceptions (Validation, NotFound, Unauthorized, etc.)
      if (err instanceof HttpException) {
        return c.json(
          {
            success: false,
            message: err.message,
            ...(err.errors ? { errors: err.errors } : {}),
          },
          err.status as any
        );
      }

      // Raw Zod validation error
      if (err instanceof ZodError) {
        const errors: ValidationErrors = {};
        for (const issue of err.issues) {
          const field = issue.path.join('.') || 'root';
          if (!errors[field]) {
            errors[field] = [];
          }
          errors[field].push(issue.message);
        }
        return c.json(
          {
            success: false,
            message: 'Validation failed',
            errors,
          },
          422
        );
      }

      // Uncaught / Internal errors
      console.error('[typz uncaught error]:', err);
      const isDebug = this._config.debug;
      return c.json(
        {
          success: false,
          message: isDebug ? err.message : 'Internal Server Error',
          ...(isDebug && err.stack ? { stack: err.stack } : {}),
        },
        500
      );
    });
  }

  /**
   * Compile and bind all registered routes from Route manager
   */
  public registerRoutes(): void {
    const routes = Route.getRoutes();

    for (const route of routes) {
      const method = route.method.toLowerCase();
      const honoMethod = (this.hono as any)[method];

      if (typeof honoMethod !== 'function') {
        continue;
      }

      // Handler pipeline for the route
      honoMethod.call(this.hono, route.path, async (c: HonoContext) => {
        const req = this.getRequest(c);

        // 1. Execute route middlewares
        for (const mw of route.middleware) {
          let nextCalled = false;
          const res = await mw(req, async () => {
            nextCalled = true;
          });
          if (res instanceof Response) return res;
          if (!nextCalled) return;
        }

        // 3. FormRequest validation if specified on route
        if (route.formRequest) {
          const formReq = new route.formRequest(req);
          await formReq.validate();
          (req as any).formRequest = formReq;
        }

        // 4. Inline Zod schema validation if specified
        if (route.schema) {
          if (route.schema.body) {
            const body = await req.body();
            await route.schema.body.parseAsync(body);
          }
          if (route.schema.query) {
            const query = req.query();
            await route.schema.query.parseAsync(query);
          }
          if (route.schema.params) {
            const params = req.params();
            await route.schema.params.parseAsync(params);
          }
        }

        // 5. Execute route handler
        const result = await route.handler(req, c);

        // 6. Format response
        if (result instanceof Response) {
          return result;
        }

        if (result === undefined || result === null) {
          return response.noContent();
        }

        if (typeof result === 'object') {
          return c.json(result);
        }

        return c.text(String(result));
      });
    }
  }

  /**
   * Native fetch interface (compatible with Bun.serve and test runners)
   */
  public fetch = (request: Request, env?: any, executionCtx?: any): Response | Promise<Response> => {
    return this.hono.fetch(request, env, executionCtx);
  };

  /**
   * Start HTTP server
   */
  public listen(
    port?: number,
    callback?: (info: { port: number; host: string }) => void
  ): any {
    this.registerRoutes();

    const listenPort = port || this._config.port || 3000;

    // Check if running directly in Bun
    if (typeof (globalThis as any).Bun !== 'undefined') {
      const bunServer = (globalThis as any).Bun.serve({
        port: listenPort,
        fetch: this.fetch,
      });
      if (callback) {
        callback({ port: bunServer.port, host: bunServer.hostname });
      } else {
        console.log(`🚀 [typz] Server running on http://${bunServer.hostname}:${bunServer.port} (Bun)`);
      }
      return bunServer;
    }

    // Node.js environment via @hono/node-server
    return serve(
      {
        fetch: this.fetch,
        port: listenPort,
      },
      (info) => {
        const rawAddr = info.address;
        const host = (!rawAddr || rawAddr === '::' || rawAddr === '0.0.0.0' || rawAddr === '::1')
          ? 'localhost'
          : rawAddr;

        if (callback) {
          callback({ port: info.port, host });
        } else {
          console.log(`🚀 [typz] Server running on http://${host}:${info.port} (Node.js)`);
        }
      }
    );
  }
}
