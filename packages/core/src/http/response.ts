import type { ApiResponse, ValidationErrors } from '../types.js';

export class ResponseFactory {
  /**
   * Return a standard JSON response
   */
  json<T = any>(data: T, status = 200, headers: HeadersInit = {}): Response {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
      },
    });
  }

  /**
   * Return a standardized success JSON response
   */
  success<T = any>(data?: T, message = 'Success', status = 200): Response {
    const payload: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    return this.json(payload, status);
  }

  /**
   * Return a standardized 201 Created JSON response
   */
  created<T = any>(data?: T, message = 'Resource created successfully'): Response {
    return this.success(data, message, 201);
  }

  /**
   * Return a 204 No Content response
   */
  noContent(): Response {
    return new Response(null, { status: 204 });
  }

  /**
   * Return a standardized error JSON response
   */
  error(message = 'An error occurred', status = 400, errors?: ValidationErrors): Response {
    const payload: ApiResponse = {
      success: false,
      message,
      ...(errors ? { errors } : {}),
    };
    return this.json(payload, status);
  }

  /**
   * Return a standardized paginated response
   */
  paginated<T = any>(
    items: T[],
    pagination: { page: number; perPage: number; total: number; totalPages?: number },
    message = 'Success'
  ): Response {
    const totalPages = pagination.totalPages ?? Math.ceil(pagination.total / pagination.perPage);
    const payload: ApiResponse<T[]> = {
      success: true,
      message,
      data: items,
      meta: {
        page: pagination.page,
        perPage: pagination.perPage,
        total: pagination.total,
        totalPages,
      },
    };
    return this.json(payload, 200);
  }

  /**
   * Return plain text
   */
  text(text: string, status = 200, headers: HeadersInit = {}): Response {
    return new Response(text, {
      status,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        ...headers,
      },
    });
  }

  /**
   * Return an HTML response
   */
  html(htmlContent: string, status = 200, headers: HeadersInit = {}): Response {
    return new Response(htmlContent, {
      status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...headers,
      },
    });
  }

  /**
   * Return redirect response
   */
  redirect(url: string, status = 302): Response {
    return new Response(null, {
      status,
      headers: {
        Location: url,
      },
    });
  }
}

export const response = new ResponseFactory();
