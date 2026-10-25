# ⚡ typz

> **Laravel's ergonomic developer experience meets modern, lightweight, type-safe TypeScript.**

`typz` is a modern backend framework designed for simple backend tasks, microservices, and APIs. It combines the clean architecture and developer productivity of Laravel (fluent routing, controllers, form requests, 422 validation, Artisan CLI) with the raw speed and type-safety of **Hono**, **Drizzle ORM**, and **TypeScript** — running with zero fuss on **Bun** and **Node.js**.

---

## 💡 Why typz?

| Feature | Laravel (PHP) | NestJS (TS) | Express / Hono (raw) | **typz (TS)** |
| :--- | :--- | :--- | :--- | :--- |
| **Routing** | Fluent & explicit (`Route::get`) | Heavy `@Get()` decorators | Functional handler spaghetti | **Fluent & explicit (`Route.get`)** |
| **Controllers** | Clean OOP separation | Decorator + DI boilerplate | None (manual) | **Clean OOP (`extends Controller`)** |
| **Validation** | FormRequest (auto 422 JSON) | `class-validator` + pipes | Manual schema parsing | **FormRequest + Zod (auto 422 JSON)** |
| **Speed** | Moderate (PHP FPM) | Moderate (overhead) | Blazing fast | **Blazing fast (microsecond latency)** |
| **Runtime** | PHP 8.2+ | Node.js | Node / Bun / Edge | **Bun & Node.js (Web standards)** |
| **CLI** | `php artisan` | `nest generate` | None | **`typz make:*` & `typz routes:list`** |

---

## 🚀 Quick Start

### 1. Project Structure

```
typz-project/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # Resource & action controllers
│   │   │   ├── AuthController.ts
│   │   │   └── TaskController.ts
│   │   ├── Requests/          # Laravel-style FormRequests
│   │   │   ├── LoginRequest.ts
│   │   │   └── StoreTaskRequest.ts
│   │   └── Middleware/        # Custom middlewares
├── database/
│   ├── schema.ts              # Drizzle ORM schema definitions
│   └── db.ts                  # Drizzle database connection
├── routes/
│   └── api.ts                 # Explicit route declarations
├── src/
│   └── server.ts              # TypzApp bootstrap & server start
└── typz.config.ts             # Application configuration
```

---

## 🛠️ Key Concepts

### 1. Expressive Fluent Routing (`routes/api.ts`)

```typescript
import { Route, jwtAuth } from '@typz/core';
import { AuthController } from '../app/Http/Controllers/AuthController.js';
import { TaskController } from '../app/Http/Controllers/TaskController.js';

// Public endpoints
Route.get('/health', (req) => ({ status: 'healthy' }));

// Route Groups with prefix & middleware
Route.group({ prefix: '/api/v1/auth' }, () => {
  Route.post('/login', [AuthController, 'login']).name('auth.login');
  Route.get('/me', { middleware: [jwtAuth({ secret: 'secret' })] }, [AuthController, 'profile']);
});

// RESTful Resource routing (auto-maps index, store, show, update, destroy)
Route.group({ prefix: '/api/v1', middleware: [jwtAuth({ secret: 'secret' })] }, () => {
  Route.resource('/tasks', TaskController);
});
```

### 2. Laravel-Style Form Requests (`app/Http/Requests/StoreTaskRequest.ts`)

Form requests handle both authorization and input validation with automatic 422 JSON formatting:

```typescript
import { FormRequest, z } from '@typz/core';

export class StoreTaskRequest extends FormRequest<{ title: string; priority?: string }> {
  // Gate / Policy authorization check
  authorize(): boolean {
    return this.user() !== null;
  }

  // Zod-powered validation rules
  rules(): z.ZodTypeAny {
    return z.object({
      title: z.string().min(1, 'Title is required').max(200),
      priority: z.enum(['low', 'medium', 'high']).optional(),
    });
  }
}
```

When validation fails, `typz` automatically generates uniform 422 responses:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "title": ["Title is required"]
  }
}
```

### 3. Clean Controllers (`app/Http/Controllers/TaskController.ts`)

```typescript
import { Controller, TypzRequest, NotFoundException } from '@typz/core';
import { StoreTaskRequest } from '../Requests/StoreTaskRequest.js';
import { db } from '../../database/db.js';
import { tasks } from '../../database/schema.js';
import { eq } from 'drizzle-orm';

export class TaskController extends Controller {
  async index(req: TypzRequest) {
    const list = await db.select().from(tasks).all();
    return this.success(list, 'Tasks retrieved');
  }

  async store(req: TypzRequest) {
    // Validates automatically or throws 422
    const form = await this.formRequest(req, StoreTaskRequest);
    const data = form.validated();

    const created = await db.insert(tasks).values(data).returning().get();
    return this.created(created, 'Task created successfully');
  }

  async show(req: TypzRequest) {
    const id = Number(req.param('id'));
    const task = await db.select().from(tasks).where(eq(tasks.id, id)).get();

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    return this.success(task);
  }
}
```

### 4. Artisan-Style CLI

Scaffold boilerplate with a single command:

```bash
# Generate a standard Controller
typz make:controller InvoiceController

# Generate a full CRUD Resource Controller
typz make:controller TaskController --resource

# Generate a FormRequest class
typz make:request StoreTaskRequest

# Generate a Drizzle model schema
typz make:model Project

# Generate a custom middleware
typz make:middleware EnsureAdmin

# Inspect all registered routes in a table
typz routes:list

# Start dev server with hot reload
typz dev
```

---

## 🧪 Testing

`typz` uses Web Standard `fetch` (`Request`/`Response`) under the hood, enabling instant, in-memory testing without opening ports:

```typescript
import { describe, it, expect } from 'vitest';
import { app } from '../src/server.js';

describe('API Tests', () => {
  it('GET /health returns 200', async () => {
    const res = await app.fetch(new Request('http://localhost/health'));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('healthy');
  });
});
```

---

## 📄 License
MIT
