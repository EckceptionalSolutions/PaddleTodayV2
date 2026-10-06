import { copyFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

await copyFile('staticwebapp.config.json', 'dist/staticwebapp.config.json');

const result = spawnSync(
  process.execPath,
  ['--import', 'tsx', 'scripts/audit-search-indexability.ts'],
  { stdio: 'inherit' },
);

if (result.error) throw result.error;
if (result.status !== 0) process.exitCode = result.status ?? 1;
