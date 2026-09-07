const { readdirSync, readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const packages = resolve(__dirname, '../packages');
const alias = {};
for (const entry of readdirSync(packages, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const directory = resolve(packages, entry.name);
  const manifest = JSON.parse(readFileSync(resolve(directory, 'package.json'), 'utf8'));
  const rootExport = manifest.exports?.['.'];
  const source = typeof rootExport === 'string' ? rootExport : rootExport?.default;
  if (manifest.name && typeof source === 'string') alias[manifest.name] = resolve(directory, source);
}

module.exports = { resolve: { alias, extensions: ['.ts', '.tsx', '.js', '.mjs', '.json'] } };
