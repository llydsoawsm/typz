export default {
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  clean: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
};
