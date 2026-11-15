import process from 'node:process';
import { generateProject } from './project.js';

const args = process.argv.slice(2);

if (args.includes('-h') || args.includes('--help')) {
  console.log(`
Usage:
  $ npm create typz [project-name]
  $ npx create-typz [project-name]

Options:
  -h, --help     Display this message
  -v, --version  Display version number
`);
  process.exit(0);
}

if (args.includes('-v') || args.includes('--version')) {
  console.log('create-typz/0.1.0');
  process.exit(0);
}

const projectName = args[0] || 'my-typz-app';
generateProject(projectName);
