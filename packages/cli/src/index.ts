import { cac } from 'cac';
import pc from 'picocolors';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import {
  controllerTemplate,
  formRequestTemplate,
  modelTemplate,
  middlewareTemplate,
} from './generators/templates.js';

const cli = cac('typz');

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createFile(targetPath: string, content: string, label: string) {
  if (fs.existsSync(targetPath)) {
    console.log(pc.yellow(`⚠️  ${label} already exists at: ${targetPath}`));
    return;
  }
  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, content, 'utf-8');
  console.log(pc.green(`✅  ${label} created: ${path.relative(process.cwd(), targetPath)}`));
}

// Command: make:controller
cli
  .command('make:controller <name>', 'Scaffold a new Controller')
  .option('--resource', 'Generate a full resource CRUD controller')
  .action((name: string, options: { resource?: boolean }) => {
    let controllerName = name.trim();
    if (!controllerName.endsWith('Controller')) {
      controllerName += 'Controller';
    }
    const target = path.join(process.cwd(), 'app', 'Http', 'Controllers', `${controllerName}.ts`);
    const content = controllerTemplate(controllerName, !!options.resource);
    createFile(target, content, `Controller [${controllerName}]`);
  });

// Command: make:request
cli
  .command('make:request <name>', 'Scaffold a new FormRequest class')
  .action((name: string) => {
    let reqName = name.trim();
    if (!reqName.endsWith('Request')) {
      reqName += 'Request';
    }
    const target = path.join(process.cwd(), 'app', 'Http', 'Requests', `${reqName}.ts`);
    const content = formRequestTemplate(reqName);
    createFile(target, content, `FormRequest [${reqName}]`);
  });

// Command: make:model
cli
  .command('make:model <name>', 'Scaffold a new Drizzle Model/Schema')
  .action((name: string) => {
    const modelName = name.trim();
    const target = path.join(process.cwd(), 'database', 'models', `${modelName}.ts`);
    const content = modelTemplate(modelName);
    createFile(target, content, `Model [${modelName}]`);
  });

// Command: make:middleware
cli
  .command('make:middleware <name>', 'Scaffold a new Middleware function')
  .action((name: string) => {
    const mwName = name.trim();
    const target = path.join(process.cwd(), 'app', 'Http', 'Middleware', `${mwName}.ts`);
    const content = middlewareTemplate(mwName);
    createFile(target, content, `Middleware [${mwName}]`);
  });

// Command: routes:list
cli
  .command('routes:list', 'List all registered routes')
  .action(async () => {
    const cwd = process.cwd();
    const routesFile = [
      path.join(cwd, 'routes', 'api.ts'),
      path.join(cwd, 'routes', 'api.js'),
      path.join(cwd, 'src', 'routes.ts'),
      path.join(cwd, 'src', 'routes.js'),
    ].find((f) => fs.existsSync(f));

    if (!routesFile) {
      console.log(pc.red('❌  No routes file found (looked for routes/api.ts or src/routes.ts).'));
      return;
    }

    const isTs = routesFile.endsWith('.ts');
    const isBun = typeof (globalThis as any).Bun !== 'undefined';

    // If running in Node on a .ts file without loader, re-exec cleanly with tsx
    if (isTs && !isBun && !process.env.TYPZ_TS_LOADER) {
      const cmd = `npx tsx "${process.argv[1]}" routes:list`;
      const child = spawn(cmd, {
        stdio: 'inherit',
        env: { ...process.env, TYPZ_TS_LOADER: '1' },
        shell: true,
      });
      child.on('exit', (code) => {
        if (code && code !== 0) process.exit(code);
      });
      return;
    }

    try {
      // Dynamic import of routes
      await import(pathToFileURL(routesFile).href);
      const { Route } = await import('@typz/core');
      const routes = Route.getRoutes();

      if (routes.length === 0) {
        console.log(pc.yellow('No routes registered in ' + routesFile));
        return;
      }

      console.log('\n' + pc.bold(pc.cyan('⚡ typz Route Manifest:')) + '\n');
      console.log(
        pc.bold(
          `${'Method'.padEnd(10)} ${'URI / Path'.padEnd(35)} ${'Name'.padEnd(20)} ${'Middlewares'.padEnd(15)}`
        )
      );
      console.log(''.padEnd(80, '-'));

      for (const r of routes) {
        const methodColor =
          r.method === 'GET'
            ? pc.green
            : r.method === 'POST'
            ? pc.blue
            : r.method === 'PUT' || r.method === 'PATCH'
            ? pc.yellow
            : pc.red;

        const methodStr = methodColor(r.method.padEnd(10));
        const pathStr = r.path.padEnd(35);
        const nameStr = (r.name || '-').padEnd(20);
        const mwCount = (r.middleware.length > 0 ? `${r.middleware.length} attached` : '-').padEnd(15);

        console.log(`${methodStr} ${pathStr} ${nameStr} ${mwCount}`);
      }
      console.log('\n' + pc.dim(`Total routes: ${routes.length}`) + '\n');
    } catch (err: any) {
      console.error(pc.red('Error loading routes: ' + err.message));
    }
  });

// Command: dev
cli
  .command('dev [entry]', 'Start development server with live reload')
  .action((entry = 'src/server.ts') => {
    console.log(pc.cyan(`⚡ [typz] Starting dev server for ${entry}...`));

    const isBun = typeof (globalThis as any).Bun !== 'undefined';
    const cmd = isBun ? `bun --watch ${entry}` : `npx tsx watch ${entry}`;

    const child = spawn(cmd, { stdio: 'inherit', shell: true });
    child.on('exit', (code) => {
      process.exit(code || 0);
    });
  });

cli.help();
cli.version('0.1.0');
cli.parse();
