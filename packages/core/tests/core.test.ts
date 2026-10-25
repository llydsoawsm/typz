import { describe, it, expect, beforeEach } from 'vitest';
import {
  TypzApp,
  Route,
  Controller,
  FormRequest,
  TypzRequest,
  cors,
  jwtAuth,
  apiKeyAuth,
  rateLimiter,
  signJwt,
  createSqliteDb,
  NotFoundException,
  ConflictException,
  z,
} from '../src/index.js';

describe('@typz/core Framework Tests', () => {
  let app: TypzApp;

  beforeEach(() => {
    Route.clear();
    app = new TypzApp({ debug: true });
  });

  describe('Routing & Route Groups', () => {
    it('handles GET, POST, PUT, PATCH, DELETE', async () => {
      Route.get('/items', (req) => ({ method: 'GET' }));
      Route.post('/items', (req) => ({ method: 'POST' }));
      Route.put('/items/:id', (req) => ({ method: 'PUT', id: req.param('id') }));
      Route.patch('/items/:id', (req) => ({ method: 'PATCH', id: req.param('id') }));
      Route.delete('/items/:id', (req) => ({ method: 'DELETE', id: req.param('id') }));

      app.registerRoutes();

      const getRes = await app.fetch(new Request('http://localhost/items'));
      expect(await getRes.json()).toEqual({ method: 'GET' });

      const postRes = await app.fetch(new Request('http://localhost/items', { method: 'POST' }));
      expect(await postRes.json()).toEqual({ method: 'POST' });

      const putRes = await app.fetch(new Request('http://localhost/items/42', { method: 'PUT' }));
      expect(await putRes.json()).toEqual({ method: 'PUT', id: '42' });

      const patchRes = await app.fetch(new Request('http://localhost/items/42', { method: 'PATCH' }));
      expect(await patchRes.json()).toEqual({ method: 'PATCH', id: '42' });

      const deleteRes = await app.fetch(new Request('http://localhost/items/42', { method: 'DELETE' }));
      expect(await deleteRes.json()).toEqual({ method: 'DELETE', id: '42' });
    });

    it('handles nested route groups with prefix concatenation and middleware', async () => {
      const order: string[] = [];

      const mw1 = async (req: any, next: any) => {
        order.push('group1');
        await next();
      };
      const mw2 = async (req: any, next: any) => {
        order.push('group2');
        await next();
      };

      Route.group({ prefix: '/api', middleware: [mw1] }, () => {
        Route.group({ prefix: '/v1', middleware: [mw2] }, () => {
          Route.get('/users', () => {
            order.push('handler');
            return { users: [] };
          });
        });
      });

      app.registerRoutes();

      const res = await app.fetch(new Request('http://localhost/api/v1/users'));
      expect(res.status).toBe(200);
      expect(order).toEqual(['group1', 'group2', 'handler']);
    });

    it('maps full RESTful resource controller correctly', async () => {
      class TestResourceController extends Controller {
        async index() {
          return this.success(['item1', 'item2']);
        }
        async store(req: TypzRequest) {
          const body = await req.body();
          return this.created(body);
        }
        async show(req: TypzRequest) {
          return this.success({ id: req.param('id') });
        }
        async update(req: TypzRequest) {
          return this.success({ id: req.param('id'), updated: true });
        }
        async destroy(req: TypzRequest) {
          return this.success({ id: req.param('id'), deleted: true });
        }
      }

      Route.resource('/articles', TestResourceController);
      app.registerRoutes();

      const indexRes = await app.fetch(new Request('http://localhost/articles'));
      expect(indexRes.status).toBe(200);
      expect((await indexRes.json()).data).toEqual(['item1', 'item2']);

      const storeRes = await app.fetch(
        new Request('http://localhost/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'New Article' }),
        })
      );
      expect(storeRes.status).toBe(201);
      expect((await storeRes.json()).data).toEqual({ title: 'New Article' });

      const showRes = await app.fetch(new Request('http://localhost/articles/99'));
      expect((await showRes.json()).data).toEqual({ id: '99' });

      const updateRes = await app.fetch(new Request('http://localhost/articles/99', { method: 'PUT' }));
      expect((await updateRes.json()).data).toEqual({ id: '99', updated: true });

      const deleteRes = await app.fetch(new Request('http://localhost/articles/99', { method: 'DELETE' }));
      expect((await deleteRes.json()).data).toEqual({ id: '99', deleted: true });
    });
  });

  describe('FormRequest Validation & Authorization', () => {
    class CreateUserRequest extends FormRequest<{ email: string; age: number }> {
      authorize() {
        return this.req.header('x-role') === 'admin';
      }

      rules() {
        return z.object({
          email: z.string().email('Invalid email address'),
          age: z.number().min(18, 'Must be at least 18 years old'),
        });
      }
    }

    class UserController extends Controller {
      async store(req: TypzRequest) {
        const form = await this.formRequest(req, CreateUserRequest);
        return this.created(form.validated());
      }
    }

    it('rejects unauthorized requests with 403', async () => {
      Route.post('/users', [UserController, 'store']);
      app.registerRoutes();

      const res = await app.fetch(
        new Request('http://localhost/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@example.com', age: 25 }),
        })
      );

      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.message).toBe('This action is unauthorized.');
    });

    it('rejects invalid inputs with 422 and structured field errors', async () => {
      Route.post('/users', [UserController, 'store']);
      app.registerRoutes();

      const res = await app.fetch(
        new Request('http://localhost/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-role': 'admin',
          },
          body: JSON.stringify({ email: 'bad-email', age: 15 }),
        })
      );

      expect(res.status).toBe(422);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.message).toBe('Validation failed');
      expect(json.errors.email).toBeDefined();
      expect(json.errors.age).toBeDefined();
    });

    it('accepts valid inputs and returns 201', async () => {
      Route.post('/users', [UserController, 'store']);
      app.registerRoutes();

      const res = await app.fetch(
        new Request('http://localhost/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-role': 'admin',
          },
          body: JSON.stringify({ email: 'valid@example.com', age: 21 }),
        })
      );

      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data).toEqual({ email: 'valid@example.com', age: 21 });
    });
  });

  describe('Middlewares Suite', () => {
    it('cors middleware handles preflight and sets headers', async () => {
      app.use(cors({ origin: 'https://example.com' }));
      Route.get('/ping', () => 'pong');
      app.registerRoutes();

      // Preflight
      const preflight = await app.fetch(
        new Request('http://localhost/ping', {
          method: 'OPTIONS',
          headers: { Origin: 'https://example.com' },
        })
      );
      expect(preflight.status).toBe(204);
      expect(preflight.headers.get('Access-Control-Allow-Origin')).toBe('https://example.com');

      // Normal request
      const getRes = await app.fetch(new Request('http://localhost/ping'));
      expect(getRes.headers.get('Access-Control-Allow-Origin')).toBe('https://example.com');
    });

    it('jwtAuth protects routes and passes authenticated user', async () => {
      const secret = 'super-secret-key-32-chars-length!';
      const token = await signJwt({ sub: 123, role: 'admin' }, secret, 3600);

      Route.get(
        '/protected',
        { middleware: [jwtAuth({ secret })] },
        (req) => ({ user: req.user() })
      );
      app.registerRoutes();

      // No token -> 401
      const unauthRes = await app.fetch(new Request('http://localhost/protected'));
      expect(unauthRes.status).toBe(401);

      // Invalid token -> 401
      const badTokenRes = await app.fetch(
        new Request('http://localhost/protected', {
          headers: { Authorization: 'Bearer bad.token.here' },
        })
      );
      expect(badTokenRes.status).toBe(401);

      // Valid token -> 200
      const authRes = await app.fetch(
        new Request('http://localhost/protected', {
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      expect(authRes.status).toBe(200);
      const json = await authRes.json();
      expect(json.user.sub).toBe(123);
      expect(json.user.role).toBe('admin');
    });

    it('apiKeyAuth rejects missing key and allows valid key', async () => {
      Route.get(
        '/internal',
        { middleware: [apiKeyAuth('my-secret-api-key')] },
        () => ({ status: 'ok' })
      );
      app.registerRoutes();

      const failRes = await app.fetch(new Request('http://localhost/internal'));
      expect(failRes.status).toBe(401);

      const passRes = await app.fetch(
        new Request('http://localhost/internal', {
          headers: { 'x-api-key': 'my-secret-api-key' },
        })
      );
      expect(passRes.status).toBe(200);
    });

    it('rateLimiter sets rate limit headers and blocks when exceeded', async () => {
      Route.get(
        '/limited',
        { middleware: [rateLimiter({ limit: 2, windowMs: 10000 })] },
        () => 'ok'
      );
      app.registerRoutes();

      const r1 = await app.fetch(new Request('http://localhost/limited'));
      expect(r1.status).toBe(200);
      expect(r1.headers.get('X-RateLimit-Limit')).toBe('2');
      expect(r1.headers.get('X-RateLimit-Remaining')).toBe('1');

      const r2 = await app.fetch(new Request('http://localhost/limited'));
      expect(r2.status).toBe(200);
      expect(r2.headers.get('X-RateLimit-Remaining')).toBe('0');

      const r3 = await app.fetch(new Request('http://localhost/limited'));
      expect(r3.status).toBe(429);
    });
  });

  describe('Database Integration', () => {
    it('creates in-memory SQLite database and executes queries', async () => {
      const { client } = createSqliteDb({ url: 'file::memory:' });

      await client.execute(`CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT);`);
      await client.execute(`INSERT INTO test (name) VALUES ('Test Item');`);

      const result = await client.execute(`SELECT * FROM test;`);
      expect(result.rows.length).toBe(1);
      expect(result.rows[0].name).toBe('Test Item');
    });
  });

  describe('Exception Handling', () => {
    it('catches NotFoundException and returns 404', async () => {
      Route.get('/not-found', () => {
        throw new NotFoundException('Item does not exist');
      });
      app.registerRoutes();

      const res = await app.fetch(new Request('http://localhost/not-found'));
      expect(res.status).toBe(404);
      const json = await res.json();
      expect(json.message).toBe('Item does not exist');
    });

    it('catches custom ConflictException and returns 409', async () => {
      Route.get('/conflict', () => {
        throw new ConflictException('Email already exists');
      });
      app.registerRoutes();

      const res = await app.fetch(new Request('http://localhost/conflict'));
      expect(res.status).toBe(409);
      const json = await res.json();
      expect(json.message).toBe('Email already exists');
    });

    it('returns 404 for unmapped endpoints', async () => {
      app.registerRoutes();
      const res = await app.fetch(new Request('http://localhost/does-not-exist'));
      expect(res.status).toBe(404);
    });
  });
});
