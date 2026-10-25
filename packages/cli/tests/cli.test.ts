import { describe, it, expect } from 'vitest';
import {
  controllerTemplate,
  formRequestTemplate,
  modelTemplate,
  middlewareTemplate,
} from '../src/generators/templates.js';

describe('typz CLI Generators', () => {
  it('generates standard Controller template', () => {
    const code = controllerTemplate('UserController', false);
    expect(code).toContain('export class UserController extends Controller');
    expect(code).toContain('async index(req: TypzRequest)');
  });

  it('generates resource CRUD Controller template', () => {
    const code = controllerTemplate('TaskController', true);
    expect(code).toContain('export class TaskController extends Controller');
    expect(code).toContain('async index(req: TypzRequest)');
    expect(code).toContain('async store(req: TypzRequest)');
    expect(code).toContain('async show(req: TypzRequest)');
    expect(code).toContain('async update(req: TypzRequest)');
    expect(code).toContain('async destroy(req: TypzRequest)');
  });

  it('generates FormRequest template', () => {
    const code = formRequestTemplate('StoreUserRequest');
    expect(code).toContain('export class StoreUserRequest extends FormRequest');
    expect(code).toContain('authorize(): boolean');
    expect(code).toContain('rules(): z.ZodTypeAny');
  });

  it('generates Drizzle Model schema template', () => {
    const code = modelTemplate('Product');
    expect(code).toContain("sqliteTable('products'");
    expect(code).toContain('id: integer');
    expect(code).toContain('name: text');
  });

  it('generates Middleware template', () => {
    const code = middlewareTemplate('EnsureAuth');
    expect(code).toContain('export function EnsureAuth(): TypzMiddleware');
    expect(code).toContain('await next()');
  });
});
