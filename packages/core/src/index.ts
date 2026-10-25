// Application
export { TypzApp } from './app.js';

// Routing
export { Route, RouteItem } from './routing/route.js';
export type { ControllerActionTuple, RouteHandlerInput, RouteOptions } from './routing/route.js';

// HTTP & Controllers
export { Controller } from './http/controller.js';
export { FormRequest } from './http/form-request.js';
export { TypzRequest } from './http/request.js';
export { response, ResponseFactory } from './http/response.js';
export {
  HttpException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  ValidationException,
} from './http/exceptions.js';

// Middlewares & Auth
export {
  cors,
  logger,
  jwtAuth,
  apiKeyAuth,
  rateLimiter,
  signJwt,
  verifyJwt,
} from './middleware/index.js';
export type {
  CorsOptions,
  LoggerOptions,
  JwtAuthOptions,
  RateLimiterOptions,
} from './middleware/index.js';

// Database
export { createSqliteDb } from './database/index.js';
export type { SqliteDbOptions } from './database/index.js';

// Types
export type {
  HttpMethod,
  ValidationErrors,
  ValidationSchema,
  HandlerReturn,
  TypzHandler,
  TypzMiddleware,
  RouteDefinition,
  RouteGroupOptions,
  ResourceController,
  ApiResponse,
  TypzAppConfig,
} from './types.js';

// Re-export Zod for schema validation convenience
export { z } from 'zod';
