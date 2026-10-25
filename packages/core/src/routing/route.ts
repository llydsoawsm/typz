import type {
  HttpMethod,
  RouteDefinition,
  RouteGroupOptions,
  TypzHandler,
  TypzMiddleware,
  ValidationSchema,
  ResourceController,
} from '../types.js';
import { TypzRequest } from '../http/request.js';
import type { FormRequest } from '../http/form-request.js';
import { Controller } from '../http/controller.js';

export type ControllerActionTuple<T = any> = [new () => T, keyof T] | [T, keyof T];

export type RouteHandlerInput = TypzHandler | ControllerActionTuple;

export interface RouteOptions {
  middleware?: TypzMiddleware | TypzMiddleware[];
  schema?: ValidationSchema;
  request?: new (req: TypzRequest) => FormRequest<any>;
  name?: string;
}

export class RouteItem {
  constructor(public readonly def: RouteDefinition) {}

  middleware(...middlewares: TypzMiddleware[]): this {
    this.def.middleware.push(...middlewares);
    return this;
  }

  name(name: string): this {
    this.def.name = name;
    return this;
  }

  validate(schema: ValidationSchema): this {
    this.def.schema = schema;
    return this;
  }

  request(requestClass: new (req: TypzRequest) => FormRequest<any>): this {
    this.def.formRequest = requestClass;
    return this;
  }
}

class RouterManager {
  private _routes: RouteDefinition[] = [];
  private _groupStack: RouteGroupOptions[] = [];

  private normalizePath(prefix: string, path: string): string {
    const combined = `${prefix}/${path}`.replace(/\/+/g, '/');
    if (combined === '/') return '/';
    return combined.endsWith('/') ? combined.slice(0, -1) : combined;
  }

  private getCurrentPrefix(): string {
    return this._groupStack.map((g) => g.prefix || '').join('');
  }

  private getCurrentMiddleware(): TypzMiddleware[] {
    return this._groupStack.flatMap((g) => g.middleware || []);
  }

  private resolveHandler(handlerInput: RouteHandlerInput): TypzHandler {
    if (Array.isArray(handlerInput)) {
      const [target, method] = handlerInput;
      return async (req: TypzRequest, ...rest: any[]) => {
        let instance: any;
        if (typeof target === 'function') {
          instance = new (target as any)();
        } else {
          instance = target;
        }
        const action = instance[method];
        if (typeof action !== 'function') {
          throw new Error(`Controller action "${String(method)}" is not a function.`);
        }
        return action.call(instance, req, ...rest);
      };
    }

    if (typeof handlerInput === 'function') {
      return handlerInput;
    }

    throw new Error('Invalid route handler passed to Route definition.');
  }

  private addRoute(
    method: HttpMethod,
    path: string,
    handlerOrOptions: RouteHandlerInput | RouteOptions,
    handlerInput?: RouteHandlerInput
  ): RouteItem {
    let options: RouteOptions = {};
    let handler: RouteHandlerInput;

    if (handlerInput !== undefined) {
      options = (handlerOrOptions as RouteOptions) || {};
      handler = handlerInput;
    } else {
      handler = handlerOrOptions as RouteHandlerInput;
    }

    const currentPrefix = this.getCurrentPrefix();
    const fullPath = this.normalizePath(currentPrefix, path);

    const initialMiddleware: TypzMiddleware[] = [...this.getCurrentMiddleware()];
    if (options.middleware) {
      if (Array.isArray(options.middleware)) {
        initialMiddleware.push(...options.middleware);
      } else {
        initialMiddleware.push(options.middleware);
      }
    }

    const routeDef: RouteDefinition = {
      method,
      path: fullPath,
      handler: this.resolveHandler(handler),
      middleware: initialMiddleware,
      schema: options.schema,
      formRequest: options.request,
      name: options.name,
    };

    this._routes.push(routeDef);
    return new RouteItem(routeDef);
  }

  get(path: string, handler: RouteHandlerInput): RouteItem;
  get(path: string, options: RouteOptions, handler: RouteHandlerInput): RouteItem;
  get(path: string, handlerOrOptions: any, handler?: any): RouteItem {
    return this.addRoute('GET', path, handlerOrOptions, handler);
  }

  post(path: string, handler: RouteHandlerInput): RouteItem;
  post(path: string, options: RouteOptions, handler: RouteHandlerInput): RouteItem;
  post(path: string, handlerOrOptions: any, handler?: any): RouteItem {
    return this.addRoute('POST', path, handlerOrOptions, handler);
  }

  put(path: string, handler: RouteHandlerInput): RouteItem;
  put(path: string, options: RouteOptions, handler: RouteHandlerInput): RouteItem;
  put(path: string, handlerOrOptions: any, handler?: any): RouteItem {
    return this.addRoute('PUT', path, handlerOrOptions, handler);
  }

  patch(path: string, handler: RouteHandlerInput): RouteItem;
  patch(path: string, options: RouteOptions, handler: RouteHandlerInput): RouteItem;
  patch(path: string, handlerOrOptions: any, handler?: any): RouteItem {
    return this.addRoute('PATCH', path, handlerOrOptions, handler);
  }

  delete(path: string, handler: RouteHandlerInput): RouteItem;
  delete(path: string, options: RouteOptions, handler: RouteHandlerInput): RouteItem;
  delete(path: string, handlerOrOptions: any, handler?: any): RouteItem {
    return this.addRoute('DELETE', path, handlerOrOptions, handler);
  }

  /**
   * Group routes with shared prefix and/or middleware
   */
  group(options: RouteGroupOptions, callback: () => void): void {
    this._groupStack.push(options);
    try {
      callback();
    } finally {
      this._groupStack.pop();
    }
  }

  /**
   * Register a full RESTful resource controller:
   * GET    /prefix           -> index
   * POST   /prefix           -> store
   * GET    /prefix/:id       -> show
   * PUT    /prefix/:id       -> update
   * DELETE /prefix/:id       -> destroy
   */
  resource(
    path: string,
    controllerInput: (new () => ResourceController) | ResourceController,
    options?: { idParam?: string; middleware?: TypzMiddleware[] }
  ): void {
    const idParam = options?.idParam || 'id';
    let instance: ResourceController;
    if (typeof controllerInput === 'function') {
      instance = new (controllerInput as any)();
    } else {
      instance = controllerInput;
    }

    const basePath = path.endsWith('/') ? path.slice(0, -1) : path;
    const itemPath = `${basePath}/:${idParam}`;
    const opts = options?.middleware ? { middleware: options.middleware } : {};

    if (typeof instance.index === 'function') {
      this.get(basePath, opts, (req) => instance.index!(req));
    }
    if (typeof instance.store === 'function') {
      this.post(basePath, opts, (req) => instance.store!(req));
    }
    if (typeof instance.show === 'function') {
      this.get(itemPath, opts, (req) => instance.show!(req));
    }
    if (typeof instance.update === 'function') {
      this.put(itemPath, opts, (req) => instance.update!(req));
    }
    if (typeof instance.destroy === 'function') {
      this.delete(itemPath, opts, (req) => instance.destroy!(req));
    }
  }

  /**
   * Get all registered route definitions
   */
  getRoutes(): RouteDefinition[] {
    return [...this._routes];
  }

  /**
   * Clear all registered routes
   */
  clear(): void {
    this._routes = [];
    this._groupStack = [];
  }
}

export const Route = new RouterManager();
