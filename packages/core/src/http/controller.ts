import type { z } from 'zod';
import { response } from './response.js';
import type { TypzRequest } from './request.js';
import type { FormRequest } from './form-request.js';
import type { ValidationErrors } from '../types.js';

export abstract class Controller {
  /**
   * Return a standard JSON response
   */
  protected json<T = any>(data: T, status = 200, headers: HeadersInit = {}): Response {
    return response.json(data, status, headers);
  }

  /**
   * Return an HTML response
   */
  protected html(htmlContent: string, status = 200, headers: HeadersInit = {}): Response {
    return response.html(htmlContent, status, headers);
  }

  /**
   * Return a 200 OK success JSON response
   */
  protected success<T = any>(data?: T, message = 'Success', status = 200): Response {
    return response.success(data, message, status);
  }

  /**
   * Return a 201 Created JSON response
   */
  protected created<T = any>(data?: T, message = 'Resource created successfully'): Response {
    return response.created(data, message);
  }

  /**
   * Return a 204 No Content response
   */
  protected noContent(): Response {
    return response.noContent();
  }

  /**
   * Return a formatted error JSON response
   */
  protected error(message = 'An error occurred', status = 400, errors?: ValidationErrors): Response {
    return response.error(message, status, errors);
  }

  /**
   * Return a paginated response
   */
  protected paginated<T = any>(
    items: T[],
    pagination: { page: number; perPage: number; total: number; totalPages?: number },
    message = 'Success'
  ): Response {
    return response.paginated(items, pagination, message);
  }

  /**
   * Validate request against a Zod schema
   */
  protected async validate<T extends z.ZodTypeAny>(req: TypzRequest, schema: T): Promise<z.infer<T>> {
    return req.validate(schema);
  }

  /**
   * Instantiate, authorize, and validate a FormRequest class
   */
  protected async formRequest<T extends FormRequest<any>>(
    req: TypzRequest,
    RequestClass: new (req: TypzRequest) => T
  ): Promise<T> {
    const instance = new RequestClass(req);
    await instance.validate();
    return instance;
  }
}
