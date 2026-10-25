import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@typz/core': path.resolve(__dirname, './packages/core/src/index.ts'),
      typz: path.resolve(__dirname, './packages/cli/src/index.ts'),
    },
  },
});
