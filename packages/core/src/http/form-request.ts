import { z, ZodError } from 'zod';
import type { TypzRequest } from './request.js';
import { ForbiddenException, ValidationException } from './exceptions.js';
import type { ValidationErrors } from '../types.js';

export abstract class FormRequest<TValidated = any> {
  protected _validatedData?: TValidated;

  constructor(public readonly req: TypzRequest) {}

  /**
   * Determine if the user is authorized to make this request.
   * Return true to allow, false to throw ForbiddenException (403).
   */
  authorize(): boolean | Promise<boolean> {
    return true;
  }

  /**
   * Define the validation schema (Zod) for this request.
   */
  abstract rules(): z.ZodTypeAny;

  /**
   * Optional custom messages or transformations
   */
  messages?(): Record<string, string>;

  /**
   * Execute authorization and validation pipeline
   */
  async validate(): Promise<TValidated> {
    const isAuthorized = await this.authorize();
    if (!isAuthorized) {
      throw new ForbiddenException('This action is unauthorized.');
    }

    const schema = this.rules();
    const allInput = await this.req.all();

    try {
      this._validatedData = (await schema.parseAsync(allInput)) as TValidated;
      return this._validatedData;
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

  /**
   * Retrieve validated data. Throws if not yet validated.
   */
  validated(): TValidated {
    if (this._validatedData === undefined) {
      throw new Error('FormRequest has not been validated yet. Call await formRequest.validate() first.');
    }
    return this._validatedData;
  }

  /**
   * Shortcut to authenticated user
   */
  user<TUser = any>(): TUser | null {
    return this.req.user<TUser>();
  }
}
