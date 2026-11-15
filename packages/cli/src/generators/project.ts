import fs from 'node:fs';
import path from 'node:path';
import pc from 'picocolors';
import {
  landingTemplate,
  serverTemplate,
  routesTemplate,
  baseControllerTemplate,
  userControllerTemplate,
  createUserRequestTemplate,
  exampleMiddlewareTemplate,
  databaseIndexTemplate,
  userModelTemplate,
  databaseSeedTemplate,
  gitignoreTemplate,
  envExampleTemplate,
  readmeTemplate,
} from './starter-templates.js';

export interface ProjectOptions {
  template?: string;
}

export function generateProject(projectName: string, options: ProjectOptions = {}) {
  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    console.error(pc.red(`\n❌ Error: Directory "${projectName}" already exists and is not empty.\n`));
    process.exit(1);
  }

  console.log(pc.cyan(`\n⚡ Scaffolding a new Typz application in ${pc.bold(targetDir)}...\n`));

  const dirs = [
    'src',
    path.join('src', 'views'),
    'routes',
    path.join('app', 'Http', 'Controllers'),
    path.join('app', 'Http', 'Middleware'),
    path.join('app', 'Http', 'Requests'),
    'database',
    path.join('database', 'models'),
  ];

  for (const dir of dirs) {
    fs.mkdirSync(path.join(targetDir, dir), { recursive: true });
  }

  // 1. package.json
  const packageJson = {
    name: projectName,
    version: '0.1.0',
    private: true,
    type: 'module',
    scripts: {
      dev: 'typz dev',
      routes: 'typz routes:list',
      'db:seed': 'tsx database/seed.ts',
      build: 'tsc',
    },
    dependencies: {
      '@libsql/client': '^0.14.0',
      '@llydsoawsm/core': '^0.1.0',
      '@llydsoawsm/typz': '^0.1.1',
      'drizzle-orm': '^0.33.0',
      hono: '^4.5.8',
      zod: '^3.23.8',
    },
    devDependencies: {
      '@types/node': '^20.14.12',
      tsx: '^4.19.0',
      typescript: '^5.5.4',
    },
  };
  fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(packageJson, null, 2), 'utf-8');

  // 2. tsconfig.json
  const tsConfig = {
    compilerOptions: {
      target: 'ES2022',
      module: 'NodeNext',
      moduleResolution: 'NodeNext',
      esModuleInterop: true,
      strict: true,
      skipLibCheck: true,
      outDir: 'dist',
    },
    include: ['src/**/*', 'routes/**/*', 'app/**/*', 'database/**/*'],
  };
  fs.writeFileSync(path.join(targetDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2), 'utf-8');

  // 3. src/server.ts
  fs.writeFileSync(path.join(targetDir, 'src', 'server.ts'), serverTemplate, 'utf-8');

  // 4. src/views/landing.ts
  fs.writeFileSync(path.join(targetDir, 'src', 'views', 'landing.ts'), landingTemplate, 'utf-8');

  // 5. routes/api.ts
  fs.writeFileSync(path.join(targetDir, 'routes', 'api.ts'), routesTemplate, 'utf-8');

  // 6. Controllers
  fs.writeFileSync(path.join(targetDir, 'app', 'Http', 'Controllers', 'Controller.ts'), baseControllerTemplate, 'utf-8');
  fs.writeFileSync(path.join(targetDir, 'app', 'Http', 'Controllers', 'UserController.ts'), userControllerTemplate, 'utf-8');

  // 7. Form Requests
  fs.writeFileSync(path.join(targetDir, 'app', 'Http', 'Requests', 'CreateUserRequest.ts'), createUserRequestTemplate, 'utf-8');

  // 8. Middleware
  fs.writeFileSync(path.join(targetDir, 'app', 'Http', 'Middleware', 'ExampleMiddleware.ts'), exampleMiddlewareTemplate, 'utf-8');

  // 9. Database (connection, model, seeder)
  fs.writeFileSync(path.join(targetDir, 'database', 'index.ts'), databaseIndexTemplate, 'utf-8');
  fs.writeFileSync(path.join(targetDir, 'database', 'models', 'User.ts'), userModelTemplate, 'utf-8');
  fs.writeFileSync(path.join(targetDir, 'database', 'seed.ts'), databaseSeedTemplate, 'utf-8');

  // 10. .gitignore
  fs.writeFileSync(path.join(targetDir, '.gitignore'), gitignoreTemplate, 'utf-8');

  // 11. .env & .env.example
  fs.writeFileSync(path.join(targetDir, '.env.example'), envExampleTemplate, 'utf-8');
  fs.writeFileSync(path.join(targetDir, '.env'), envExampleTemplate, 'utf-8');

  // 12. README.md
  fs.writeFileSync(path.join(targetDir, 'README.md'), readmeTemplate(projectName), 'utf-8');

  console.log(pc.green(`✔ Created directory structure in ${projectName}/`));
  console.log(pc.green(`✔ Created configuration files (package.json, tsconfig.json, .env)`));
  console.log(pc.green(`✔ Created database models & SQLite seeder (database/models/User.ts, database/seed.ts)`));
  console.log(pc.green(`✔ Created controllers, requests & middleware (UserController.ts, CreateUserRequest.ts)`));
  console.log(pc.green(`✔ Created starter routes and server (src/server.ts, routes/api.ts)`));
  console.log(pc.green(`✔ Created welcome landing page (src/views/landing.ts)`));
  console.log(pc.bold(pc.green('\n🎉 Typz application ready!\n')));
  console.log(pc.bold('Next steps:'));
  console.log(pc.cyan(`  cd ${projectName}`));
  console.log(pc.cyan(`  npm install   (or pnpm install)`));
  console.log(pc.cyan(`  npm run dev   (or pnpm dev)\n`));
}
