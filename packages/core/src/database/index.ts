import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export interface SqliteDbOptions {
  url?: string;
  authToken?: string;
  schema?: Record<string, any>;
}

/**
 * Helper to bootstrap a Drizzle LibSQL / SQLite database instance.
 * Supports local files ('file:database.sqlite'), in-memory ('file::memory:'),
 * or remote Turso instances ('libsql://...').
 */
export function createSqliteDb(options: SqliteDbOptions = {}) {
  const url = options.url || 'file:database.sqlite';
  const client = createClient({
    url,
    authToken: options.authToken,
  });

  const db = drizzle(client, { schema: options.schema as any });
  return { db, client };
}

