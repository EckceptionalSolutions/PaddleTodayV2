import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const checkOnly = process.argv.includes('--check');
const scriptNames = [
  'client-cache.js',
  'map-leaflet-runtime.js',
  'map-runtime.js',
  'request-guard.js',
  'ui-taxonomy.js',
];

let driftFound = false;

for (const scriptName of scriptNames) {
  const sourcePath = resolve('src', 'scripts', scriptName);
  const publicPath = resolve('public', 'scripts', scriptName);
  const source = await readFile(sourcePath);
  const current = await readFile(publicPath).catch(() => null);

  if (current?.equals(source)) {
    continue;
  }

  if (checkOnly) {
    driftFound = true;
    console.error(`[public-scripts] ${scriptName} differs from src/scripts/${scriptName}.`);
    continue;
  }

  await writeFile(publicPath, source);
  console.log(`[public-scripts] Synced ${scriptName}.`);
}

if (driftFound) {
  console.error('[public-scripts] Run npm run scripts:public:sync and commit the generated files.');
  process.exitCode = 1;
} else if (checkOnly) {
  console.log(`[public-scripts] ${scriptNames.length} generated scripts are in sync.`);
}
