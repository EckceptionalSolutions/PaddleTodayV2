import { createApiPackage } from './lib/api-package.mjs';
function value(flag, fallback) { const index = process.argv.indexOf(flag); return index >= 0 ? process.argv[index + 1] : fallback; }
const manifest = await createApiPackage({ destination: value('--out', 'deploy-package'), staticDir: value('--static', 'dist') });
console.log(JSON.stringify({ compiledBytes: manifest.compiledBytes, sourceModules: manifest.sourceInputs.length, static: manifest.static,
  resources: manifest.resources.length, externalDependencies: manifest.dependencies }, null, 2));
