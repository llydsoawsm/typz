import { TypzApp, cors, logger } from '@typz/core';

// 1. Load your routes
import '../routes/api.js';

// 2. Instantiate TypzApp
export const app = new TypzApp({
  port: 3000,
  debug: true,
});

// 3. Attach global middlewares
app.use(cors());
app.use(logger({ format: 'dev' }));

// 4. Start the server
app.listen(3000, ({ port, host }) => {
  const displayHost = (!host || host === '::' || host === '0.0.0.0') ? 'localhost' : host;
  console.log(`\n🚀 [typz] Server running at http://${displayHost}:${port}`);
  console.log(`👉 Visit:   http://localhost:${port}/`);
  console.log(`👉 Health:  http://localhost:${port}/health\n`);
});
