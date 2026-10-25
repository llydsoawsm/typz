import type { ValidationErrors } from '../types.js';

export class HttpException extends Error {
  public readonly status: number;
  public readonly errors?: ValidationErrors;

  constructor(status: number, message: string, errors?: ValidationErrors) {
    super(message);
    this.name = 'HttpException';
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = 'Resource not found') {
    super(404, message);
    this.name = 'NotFoundException';
  }
}

export class BadRequestException extends HttpException {
  constructor(message = 'Bad request', errors?: ValidationErrors) {
    super(400, message, errors);
    this.name = 'BadRequestException';
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized') {
    super(401, message);
    this.name = 'UnauthorizedException';
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super(403, message);
    this.name = 'ForbiddenException';
  }
}

export class ConflictException extends HttpException {
  constructor(message = 'Resource conflict') {
    super(409, message);
    this.name = 'ConflictException';
  }
}

export class ValidationException extends HttpException {
  constructor(errors: ValidationErrors, message = 'Validation failed') {
    super(422, message, errors);
    this.name = 'ValidationException';
  }
}
