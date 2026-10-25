import type { TypzMiddleware } from '../types.js';
import { TypzRequest } from '../http/request.js';
import { UnauthorizedException, HttpException } from '../http/exceptions.js';

/**
 * CORS Middleware
 */
export interface CorsOptions {
  origin?: string | string[] | ((origin: string) => string | boolean);
  methods?: string[];
  allowHeaders?: string[];
  exposeHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

export function cors(options: CorsOptions = {}): TypzMiddleware {
  const defaultMethods = ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'];
  const defaultHeaders = ['Content-Type', 'Authorization', 'X-Requested-With'];

  return async (req: TypzRequest, next: () => Promise<void>) => {
    const originHeader = req.header('origin') || '*';
    const allowedOrigin = typeof options.origin === 'function'
      ? options.origin(originHeader)
      : options.origin || '*';

    const headers: Record<string, string> = {
      'Access-Control-Allow-Origin': String(allowedOrigin),
      'Access-Control-Allow-Methods': (options.methods || defaultMethods).join(', '),
      'Access-Control-Allow-Headers': (options.allowHeaders || defaultHeaders).join(', '),
    };

    if (options.credentials) {
      headers['Access-Control-Allow-Credentials'] = 'true';
    }
    if (options.maxAge) {
      headers['Access-Control-Max-Age'] = String(options.maxAge);
    }
    if (options.exposeHeaders) {
      headers['Access-Control-Expose-Headers'] = options.exposeHeaders.join(', ');
    }

    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers,
      });
    }

    await next();

    // Attach CORS headers to outgoing response if not yet present
    for (const [key, value] of Object.entries(headers)) {
      if (!req.ctx.res.headers.has(key)) {
        req.ctx.res.headers.set(key, value);
      }
    }
  };
}

/**
 * Logger Middleware
 */
export interface LoggerOptions {
  format?: 'json' | 'dev';
}

export function logger(options: LoggerOptions = { format: 'dev' }): TypzMiddleware {
  return async (req: TypzRequest, next: () => Promise<void>) => {
    const start = performance.now();
    await next();
    const duration = (performance.now() - start).toFixed(2);
    const status = req.ctx.res.status || 200;

    if (options.format === 'json') {
      console.log(
        JSON.stringify({
          method: req.method,
          path: req.path,
          status,
          duration: `${duration}ms`,
          timestamp: new Date().toISOString(),
        })
      );
    } else {
      console.log(`[typz] ${req.method} ${req.path} -> ${status} (${duration}ms)`);
    }
  };
}

/**
 * Native WebCrypto JWT Utilities
 */
function base64UrlEncode(str: string): string {
  const base64 = btoa(str);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function signJwt(payload: Record<string, any>, secret: string, expiresInSeconds = 3600): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp, iat: Math.floor(Date.now() / 1000) };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const key = await getCryptoKey(secret);
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(dataToSign));

  const binaryString = String.fromCharCode(...new Uint8Array(signatureBuffer));
  const encodedSignature = base64UrlEncode(binaryString);

  return `${dataToSign}.${encodedSignature}`;
}

export async function verifyJwt<T = any>(token: string, secret: string): Promise<T> {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new UnauthorizedException('Malformed token');
  }

  const [headerB64, payloadB64, signatureB64] = parts;
  const dataToVerify = `${headerB64}.${payloadB64}`;

  const key = await getCryptoKey(secret);

  const sigBinary = base64UrlDecode(signatureB64);
  const sigBytes = new Uint8Array(sigBinary.length);
  for (let i = 0; i < sigBinary.length; i++) {
    sigBytes[i] = sigBinary.charCodeAt(i);
  }

  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    sigBytes,
    new TextEncoder().encode(dataToVerify)
  );

  if (!isValid) {
    throw new UnauthorizedException('Invalid token signature');
  }

  const payload = JSON.parse(base64UrlDecode(payloadB64)) as any;
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new UnauthorizedException('Token has expired');
  }

  return payload as T;
}

/**
 * JWT Authentication Middleware
 */
export interface JwtAuthOptions {
  secret: string;
  getUser?: (payload: any) => Promise<any> | any;
}

export function jwtAuth(options: JwtAuthOptions): TypzMiddleware {
  return async (req: TypzRequest, next: () => Promise<void>) => {
    const token = req.bearerToken();
    if (!token) {
      throw new UnauthorizedException('Authentication token required');
    }

    try {
      const payload = await verifyJwt(token, options.secret);
      const user = options.getUser ? await options.getUser(payload) : payload;
      req.setUser(user);
    } catch (err: any) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      throw new UnauthorizedException(err.message || 'Invalid authentication token');
    }

    await next();
  };
}

/**
 * API Key Middleware
 */
export function apiKeyAuth(validKeys: string | string[], headerName = 'x-api-key'): TypzMiddleware {
  const allowed = Array.isArray(validKeys) ? validKeys : [validKeys];
  return async (req: TypzRequest, next: () => Promise<void>) => {
    const key = req.header(headerName);
    if (!key || !allowed.includes(key)) {
      throw new UnauthorizedException('Invalid or missing API key');
    }
    await next();
  };
}

/**
 * In-Memory Sliding Window Rate Limiter Middleware
 */
export interface RateLimiterOptions {
  limit?: number; // max requests
  windowMs?: number; // window size in ms
}

export function rateLimiter(options: RateLimiterOptions = {}): TypzMiddleware {
  const limit = options.limit ?? 100;
  const windowMs = options.windowMs ?? 60_000;
  const ipStore = new Map<string, { count: number; resetTime: number }>();

  return async (req: TypzRequest, next: () => Promise<void>) => {
    const ip = req.header('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    let record = ipStore.get(ip);
    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + windowMs };
      ipStore.set(ip, record);
    }

    record.count++;
    const remaining = Math.max(0, limit - record.count);
    const resetSeconds = Math.ceil((record.resetTime - now) / 1000);

    req.ctx.res.headers.set('X-RateLimit-Limit', String(limit));
    req.ctx.res.headers.set('X-RateLimit-Remaining', String(remaining));
    req.ctx.res.headers.set('X-RateLimit-Reset', String(resetSeconds));

    if (record.count > limit) {
      throw new HttpException(429, 'Too many requests. Please try again later.');
    }

    await next();
  };
}
