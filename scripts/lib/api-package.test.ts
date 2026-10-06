import { afterEach, describe, expect, it } from 'vitest';
import { mkdtemp, mkdir, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, resolve, sep, basename } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { gunzipSync } from 'node:zlib';
import { createApiPackage, apiRuntimeResources } from './api-package.mjs';

const temporary: string[] = [];
afterEach(async () => {
  for (const path of temporary.splice(0)) {
    if (!resolve(path).startsWith(resolve(tmpdir()) + sep) || !basename(path).startsWith('paddle-api-package-')) throw new Error('Unexpected cleanup target');
    await rm(path, { recursive: true, force: true });
  }
});
async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'paddle-api-package-')); temporary.push(root);
  async function file(path: string, value: string) { await mkdir(dirname(join(root, path)), { recursive: true }); await writeFile(join(root, path), value); }
  for (const path of ['package.json', 'package-lock.json']) await file(path, await readFile(path, 'utf8'));
  await file('src/server/bootstrap.ts', "const {value} = await import('../lib/operations'); console.log(JSON.stringify({value}));");
  await file('src/lib/operations.ts', "import {readFileSync} from 'node:fs'; import {answer} from './value'; export const value={answer,resource:JSON.parse(readFileSync('docs/operations/state-registry.json','utf8'))};");
  await file('src/lib/value.ts', 'export const answer: number = 42;');
  await file('src/lib/unused.test.ts', 'throw new Error("Do not package tests");');
  await file('src/data/generated/route-access-registry.json', '{"unused":true}');
  for (const path of apiRuntimeResources) await file(path, JSON.stringify({ path, retained: true }, null, 2));
  for (const [path, value] of [['index.html', '<html>Home</html>'], ['404.html', '<html>Not found</html>'], ['rivers/route/index.html', '<html>Route</html>'], ['data/canonical-river-geometries/routes/route.json', '{"geometry":true}'], ['gallery/photo.jpg', 'photo']]) await file('dist/' + path, value);
  return { root, destination: join(root, 'package') };
}

describe('compiled API deployment manifest', () => {
  it('runs the reachable compiled graph independently and preserves static and required admin resources', async () => {
    const { root, destination } = await fixture();
    const manifest = await createApiPackage({ root, destination });
    expect(manifest.sourceInputs).toEqual(['src/lib/operations.ts', 'src/lib/value.ts', 'src/server/bootstrap.ts']);
    expect((await readdir(destination)).sort()).toEqual(['.deployment', 'api-package-manifest.json', 'automations', 'dist', 'docs', 'package-lock.json', 'package.json', 'server.mjs']);
    const execution = await promisify(execFile)(process.execPath, ['server.mjs'], { cwd: destination, windowsHide: true });
    expect(JSON.parse(execution.stdout).value).toEqual({ answer: 42, resource: { path: apiRuntimeResources[0], retained: true } });
    for (const path of apiRuntimeResources) expect(JSON.parse(await readFile(join(destination, path), 'utf8'))).toEqual(JSON.parse(await readFile(join(root, path), 'utf8')));
    expect(await readFile(join(destination, 'dist/gallery/photo.jpg'), 'utf8')).toBe('photo');
    expect(gunzipSync(await readFile(join(destination, 'dist/index.html.gz'))).toString()).toBe('<html>Home</html>');
    expect(gunzipSync(await readFile(join(destination, 'dist/rivers/route/index.html.gz'))).toString()).toBe('<html>Route</html>');
    expect(await readFile(join(root, 'dist/index.html'), 'utf8')).toBe('<html>Home</html>');
    expect(await readFile(join(destination, 'dist/data/canonical-river-geometries/routes/route.json'), 'utf8')).toBe('{"geometry":true}');
    const pkg = JSON.parse(await readFile(join(destination, 'package.json'), 'utf8'));
    expect(pkg.scripts.start).toBe('node server.mjs --static dist');
    expect(pkg.dependencies.tsx).toBeUndefined();
    expect(pkg.overrides).toEqual(JSON.parse(await readFile(join(root, 'package.json'), 'utf8')).overrides);
  });

  it('refuses dirty destinations and output nested inside static input', async () => {
    const { root, destination } = await fixture();
    await mkdir(destination); await writeFile(join(destination, 'keep.txt'), 'user work');
    await expect(createApiPackage({ root, destination })).rejects.toThrow('new or empty');
    expect(await readFile(join(destination, 'keep.txt'), 'utf8')).toBe('user work');
    await expect(createApiPackage({ root, destination: join(root, 'dist/package') })).rejects.toThrow('outside static');
  });
});
