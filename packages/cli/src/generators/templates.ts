export function controllerTemplate(name: string, isResource = false): string {
  if (isResource) {
    return `import { Controller, TypzRequest } from '@typz/core';

export class ${name} extends Controller {
  /**
   * Display a listing of the resource.
   */
  async index(req: TypzRequest) {
    return this.success([], 'Items retrieved successfully');
  }

  /**
   * Store a newly created resource in storage.
   */
  async store(req: TypzRequest) {
    const data = await req.all();
    return this.created(data, 'Resource created successfully');
  }

  /**
   * Display the specified resource.
   */
  async show(req: TypzRequest) {
    const id = req.param('id');
    return this.success({ id }, 'Resource retrieved successfully');
  }

  /**
   * Update the specified resource in storage.
   */
  async update(req: TypzRequest) {
    const id = req.param('id');
    const data = await req.all();
    return this.success({ id, ...data }, 'Resource updated successfully');
  }

  /**
   * Remove the specified resource from storage.
   */
  async destroy(req: TypzRequest) {
    const id = req.param('id');
    return this.success({ id }, 'Resource deleted successfully');
  }
}
`;
  }

  return `import { Controller, TypzRequest } from '@typz/core';

export class ${name} extends Controller {
  /**
   * Handle the incoming request.
   */
  async index(req: TypzRequest) {
    return this.success({ message: 'Hello from ${name}' });
  }
}
`;
}

export function formRequestTemplate(name: string): string {
  return `import { FormRequest, z } from '@typz/core';

export class ${name} extends FormRequest {
  /**
   * Determine if the user is authorized to make this request.
   */
  authorize(): boolean {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   */
  rules(): z.ZodTypeAny {
    return z.object({
      // Add your Zod schema fields here
      // example: title: z.string().min(1, 'Title is required'),
    });
  }
}
`;
}

export function modelTemplate(name: string): string {
  const tableName = name.toLowerCase() + 's';
  return `import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const ${tableName} = sqliteTable('${tableName}', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
`;
}

export function middlewareTemplate(name: string): string {
  return `import type { TypzMiddleware, TypzRequest } from '@typz/core';

export function ${name}(): TypzMiddleware {
  return async (req: TypzRequest, next: () => Promise<void>) => {
    // Perform checks before handler
    await next();
    // Perform actions after response
  };
}
`;
}
