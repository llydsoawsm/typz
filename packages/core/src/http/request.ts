import type { Context as HonoContext } from 'hono';
import { z, ZodError } from 'zod';
import { ValidationException } from './exceptions.js';
import type { ValidationErrors } from '../types.js';

export class TypzRequest {
  private _bodyCache?: any;
  private _allCache?: Record<string, any>;

  constructor(public readonly ctx: HonoContext) {}

  /**
   * Underlying native Web Request
   */
  get raw(): Request {
    return this.ctx.req.raw;
  }

  /**
   * HTTP Method (GET, POST, etc.)
   */
  get method(): string {
    return this.ctx.req.method;
  }

  /**
   * Request URL
   */
  get url(): string {
    return this.ctx.req.url;
  }

  /**
   * Request Path
   */
  get path(): string {
    return this.ctx.req.path;
  }

  /**
   * Get a route parameter by name (e.g. :id)
   */
  param(name: string): string | undefined {
    return this.ctx.req.param(name as any);
  }

  /**
   * Get all route parameters
   */
  params(): Record<string, string> {
    return this.ctx.req.param() as Record<string, string>;
  }

  /**
   * Get a query parameter by key with optional default
   */
  query(key?: string, defaultValue?: string): any {
    if (!key) {
      return this.ctx.req.query();
    }
    const val = this.ctx.req.query(key);
    return val !== undefined ? val : defaultValue;
  }

  /**
   * Get a request header by name
   */
  header(name: string): string | undefined {
    return this.ctx.req.header(name);
  }

  /**
   * Extract Bearer token from Authorization header
   */
  bearerToken(): string | null {
    const authHeader = this.header('authorization') || this.header('Authorization');
    if (!authHeader) return null;
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
      return parts[1];
    }
    return null;
  }

  /**
   * Get parsed request body (JSON, form data, or text)
   */
  async body<T = any>(): Promise<T> {
    if (this._bodyCache !== undefined) {
      return this._bodyCache as T;
    }

    const contentType = this.header('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        this._bodyCache = await this.ctx.req.json();
      } catch {
        this._bodyCache = {};
      }
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      try {
        this._bodyCache = await this.ctx.req.parseBody();
      } catch {
        this._bodyCache = {};
      }
    } else {
      try {
        const text = await this.ctx.req.text();
        if (text) {
          try {
            this._bodyCache = JSON.parse(text);
          } catch {
            this._bodyCache = text;
          }
        } else {
          this._bodyCache = {};
        }
      } catch {
        this._bodyCache = {};
      }
    }

    return this._bodyCache as T;
  }

  /**
   * Get all request data (merged route params, query params, and body)
   */
  async all(): Promise<Record<string, any>> {
    if (this._allCache !== undefined) {
      return this._allCache;
    }

    const parsedBody = (await this.body()) || {};
    const bodyObj = typeof parsedBody === 'object' && parsedBody !== null ? parsedBody : {};
    const queryObj = this.ctx.req.query() || {};
    const paramObj = this.ctx.req.param() || {};

    const merged: Record<string, any> = {
      ...queryObj,
      ...bodyObj,
      ...paramObj,
    };

    this._allCache = merged;
    return merged;
  }

  /**
   * Get an input value by key (from body, query, or params) with optional fallback
   */
  async input<T = any>(key: string, defaultValue?: T): Promise<T> {
    const allData = await this.all();
    return (allData[key] !== undefined ? allData[key] : defaultValue) as T;
  }

  /**
   * Get authenticated user attached to the context
   */
  user<T = any>(): T | null {
    return (this.ctx.get('user') as T) || null;
  }

  /**
   * Attach authenticated user to the context
   */
  setUser(user: any): void {
    this.ctx.set('user', user);
  }

  /**
   * Validate request data against a Zod schema.
   * Throws ValidationException (status 422) on failure.
   */
  async validate<T extends z.ZodTypeAny>(schema: T): Promise<z.infer<T>> {
    const data = await this.all();
    try {
      return await schema.parseAsync(data);
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: ValidationErrors = {};
        for (const issue of err.issues) {
          const field = issue.path.join('.') || 'root';
          if (!errors[field]) {
            errors[field] = [];
          }
          errors[field].push(issue.message);
        }
        throw new ValidationException(errors);
      }
      throw err;
    }
  }
}
