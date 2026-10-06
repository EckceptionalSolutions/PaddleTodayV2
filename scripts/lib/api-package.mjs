import { build } from 'esbuild';
import { cp, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, resolve, sep } from 'node:path';
import { compressStaticHtml } from './static-compression.mjs';

const externalDependencies = ['@azure/communication-email', '@azure/monitor-opentelemetry', 'firebase-admin', 'sharp'];
export const apiRuntimeResources = [
  'docs/operations/state-registry.json', 'docs/operations/tasks.json', 'docs/operations/runs.json',
  'docs/operations/gauge-inventory.json', 'docs/operations/gauge-review-ledger.json',
  'automations/route-control-plane/state.json',
];
const optionalResources = ['docs/operations/overlap-review-queue.json', 'docs/operations/route-opportunity-queue.json'];

async function inventory(directory) {
  let bytes = 0, files = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) { const nested = await inventory(path); bytes += nested.bytes; files += nested.files; }
    else if (entry.isFile()) { bytes += (await stat(path)).size; files++; }
    else throw new Error(`Unexpected link or special file in API static resources: ${path}`);
  }
  return { files, bytes };
}

/** Compile only reachable server modules, retaining the complete documented one-origin fallback. */
export async function createApiPackage({ root = process.cwd(), staticDir = join(root, 'dist'), destination }) {
  root = resolve(root); staticDir = resolve(staticDir); destination = resolve(destination);
  const existing = await readdir(destination).catch(error => { if (error.code === 'ENOENT') return []; throw error; });
  if (existing.length || destination === root || destination === staticDir || destination.startsWith(staticDir + sep)) throw new Error('API package destination must be a new or empty directory outside static input.');
  const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  const lock = JSON.parse(await readFile(join(root, 'package-lock.json'), 'utf8'));
  const dependencies = Object.fromEntries(externalDependencies.map(name => {
    const version = lock.packages?.[`node_modules/${name}`]?.version;
    if (!pkg.dependencies?.[name] || !version) throw new Error(`Missing locked runtime dependency: ${name}`);
    return [name, version];
  }));
  await stat(join(staticDir, 'index.html'));
  await stat(join(staticDir, '404.html'));
  await mkdir(destination, { recursive: true });
  const compiled = await build({ absWorkingDir: root, entryPoints: ['src/server/bootstrap.ts'], outfile: join(destination, 'server.mjs'),
    bundle: true, platform: 'node', format: 'esm', target: 'node22.12', external: externalDependencies,
    minifyWhitespace: true, metafile: true, logLevel: 'silent' });
  const resources = [];
  for (const path of [...apiRuntimeResources, ...optionalResources]) {
    const raw = await readFile(join(root, path), 'utf8').catch(error => {
      if (error.code === 'ENOENT' && optionalResources.includes(path)) return null; throw error;
    });
    if (raw === null) continue;
    const compact = JSON.stringify(JSON.parse(raw)) + '\n';
    const output = join(destination, path);
    await mkdir(resolve(output, '..'), { recursive: true });
    await writeFile(output, compact);
    resources.push({ path, originalBytes: Buffer.byteLength(raw), packagedBytes: Buffer.byteLength(compact), sha256: createHash('sha256').update(compact).digest('hex') });
  }
  await cp(staticDir, join(destination, 'dist'), { recursive: true });
  const staticCompression = await compressStaticHtml(join(destination, 'dist'));
  const packaged = { name: pkg.name, version: pkg.version, private: true, type: 'module', engines: pkg.engines,
    scripts: { start: 'node server.mjs --static dist' }, dependencies, ...(pkg.overrides ? { overrides: pkg.overrides } : {}) };
  await writeFile(join(destination, 'package.json'), JSON.stringify(packaged, null, 2) + '\n');
  // Seed npm with the already reviewed resolutions. Its package-lock-only pass prunes unrelated packages.
  const seededLock = { ...lock, packages: { '': { name: pkg.name, version: pkg.version, dependencies, engines: pkg.engines },
    ...Object.fromEntries(Object.entries(lock.packages).filter(([path, value]) => path.startsWith('node_modules/') && !value.link)) } };
  await writeFile(join(destination, 'package-lock.json'), JSON.stringify(seededLock, null, 2) + '\n');
  // Dependencies arrive ready to run; do not repeat installation through an App Service/Oryx build.
  await writeFile(join(destination, '.deployment'), '[config]\nSCM_DO_BUILD_DURING_DEPLOYMENT=false\n');
  const manifest = { format: 'PaddleTodayApiPackage', entry: 'server.mjs', nodeTarget: '22.12', dependencies,
    sourceInputs: Object.keys(compiled.metafile.inputs).sort(), compiledBytes: (await stat(join(destination, 'server.mjs'))).size,
    externalImports: Object.values(compiled.metafile.outputs).flatMap(output => output.imports.filter(item => item.external).map(item => item.path)),
    resources, static: await inventory(join(destination, 'dist')), staticSource: await inventory(staticDir), staticCompression, staticPolicy: 'Complete one-origin fallback site retained, including geometry and gallery assets; HTML stored losslessly as gzip with streamed identity fallback',
    installPolicy: 'Prune seeded lock, npm ci once in the build job; runtime deployment build disabled' };
  await writeFile(join(destination, 'api-package-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  return manifest;
}
