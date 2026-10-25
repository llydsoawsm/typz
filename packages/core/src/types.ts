import type { Context as HonoContext, MiddlewareHandler as HonoMiddlewareHandler } from 'hono';
import type { z } from 'zod';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

export type ValidationErrors = Record<string, string[]>;

export interface ValidationSchema {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  headers?: z.ZodTypeAny;
}

export type HandlerReturn = Response | object | string | number | boolean | null | void;

export type TypzHandler = (req: any, ctx?: any) => Promise<HandlerReturn> | HandlerReturn;

export type TypzMiddleware<C = any> = (
  ctx: C,
  next: () => Promise<void>
) => Promise<Response | void> | Response | void;

export interface RouteDefinition {
  method: HttpMethod;
  path: string;
  handler: TypzHandler;
  middleware: TypzMiddleware[];
  schema?: ValidationSchema;
  formRequest?: new (ctx: any) => any;
  name?: string;
}

export interface RouteGroupOptions {
  prefix?: string;
  middleware?: TypzMiddleware[];
  name?: string;
}

export interface ResourceController {
  index?: TypzHandler;
  store?: TypzHandler;
  show?: TypzHandler;
  update?: TypzHandler;
  destroy?: TypzHandler;
  [key: string]: TypzHandler | any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: ValidationErrors;
  meta?: Record<string, any>;
}

export interface TypzAppConfig {
  port?: number;
  cors?: boolean | Record<string, any>;
  logger?: boolean | Record<string, any>;
  debug?: boolean;
}
