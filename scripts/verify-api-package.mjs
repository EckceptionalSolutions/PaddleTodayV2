import { createRequire } from 'node:module';
import { mkdir, mkdtemp, readFile, realpath, writeFile, rm, readdir } from 'node:fs/promises';
import { resolve, join, sep, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { createServer } from 'node:net';
import assert from 'node:assert/strict';
import { gunzipSync } from 'node:zlib';

const directory = resolve(process.argv[2] ?? 'deploy-package');
const manifest = JSON.parse(await readFile(join(directory, 'api-package-manifest.json'), 'utf8'));
const requirePackage = createRequire(join(directory, 'package.json'));
for (const name of Object.keys(manifest.dependencies)) {
  const entry = await realpath(requirePackage.resolve(name));
  assert(entry.startsWith(join(directory, 'node_modules') + sep), `${name} must resolve inside the installed package`);
}
assert(!manifest.sourceInputs.some(path => /\.test\.|generated\/route-access-registry\.json/.test(path)), 'Tests and audit registry must be excluded');
const sharp = requirePackage('sharp');
const image = await sharp({ create: { width: 2, height: 2, channels: 3, background: '#269db2' } }).jpeg().toBuffer();
assert(image.length > 0, 'Packaged native image processing must work');
const fixture = await mkdtemp(join(tmpdir(), 'paddle-api-verify-'));
let child;
const checks = ['isolated dependency resolution', 'native JPEG processing'];
const staticSource = resolve(process.argv[3] ?? 'dist');
const compression = JSON.parse(await readFile(join(directory, 'dist/.static-compression.json'), 'utf8'));
let staticFilesVerified = 0;
async function verifyStatic(parent, prefix = '') {
  for (const entry of await readdir(parent, { withFileTypes: true })) {
    const path = prefix + entry.name;
    if (entry.isDirectory()) await verifyStatic(join(parent, entry.name), path + '/');
    else if (entry.isFile()) {
      const original = await readFile(join(parent, entry.name));
      const encoded = compression[path + '.gz'];
      const packaged = await readFile(join(directory, 'dist', path + (encoded ? '.gz' : '')));
      assert((encoded ? gunzipSync(packaged) : packaged).equals(original), `Static resource changed: ${path}`);
      if (encoded) assert.equal(encoded.sourceBytes, original.length, path);
      staticFilesVerified++;
    }
  }
}
await verifyStatic(staticSource);
assert.equal(staticFilesVerified, manifest.staticSource.files);
checks.push(`all ${staticFilesVerified} static resources match original bytes`);
try {
  // This hook blocks all external calls. Runtime snapshot and admin resource checks remain local.
  const hook = join(fixture, 'network-policy.mjs');
  await writeFile(hook, "globalThis.fetch = async () => { throw new Error('External requests disabled in package verification'); };\n");
  const summary = JSON.parse(await readFile(resolve('tmp-summary.json'), 'utf8'));
  await mkdir(join(fixture, 'river-snapshots'), { recursive: true });
  await writeFile(join(fixture, 'river-snapshots/summary.json'), JSON.stringify(summary));
  const reserver = createServer();
  await new Promise(resolve => reserver.listen(0, '127.0.0.1', resolve));
  const port = reserver.address().port;
  await new Promise(resolve => reserver.close(resolve));
  const env = Object.fromEntries(['PATH', 'SystemRoot', 'WINDIR', 'TEMP', 'TMP', 'HOME', 'USERPROFILE'].filter(name => process.env[name]).map(name => [name, process.env[name]]));
  Object.assign(env, { NODE_ENV: 'development', CANOE_API_HOST: '127.0.0.1', TRIP_MAINTENANCE_ENABLED: '0', RIVER_SNAPSHOT_DIR: fixture,
    PADDLETODAY_ADMIN_PASSWORD: 'isolated-package-check', PADDLETODAY_ADMIN_SESSION_SECRET: 'isolated-package-signature' });
  child = spawn(process.execPath, ['--import', pathToFileURL(hook).href, manifest.entry, '--static', 'dist', '--port', String(port)], { cwd: directory, env, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  let output = '';
  child.stdout.on('data', value => { output += value; }); child.stderr.on('data', value => { output += value; });
  const url = path => `http://127.0.0.1:${port}${path}`;
  const deadline = Date.now() + 60000;
  while (true) {
    if (child.exitCode !== null || child.signalCode !== null) throw new Error(`Packaged runtime exited: ${output.slice(-2000)}`);
    try { if ((await fetch(url('/api/health'), { signal: AbortSignal.timeout(1000) })).ok) break; } catch { /* Wait for this owned child. */ }
    if (Date.now() > deadline) throw new Error(`Packaged runtime did not start: ${output.slice(-2000)}`);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  async function json(path, init = {}) {
    const response = await fetch(url(path), { ...init, signal: AbortSignal.timeout(10000) });
    assert.equal(response.status, 200, `${path} failed`);
    const payload = await response.json();
    assert.equal(response.headers.get('x-request-id'), payload.requestId);
    checks.push(path); return { payload, response };
  }
  assert.equal((await json('/api/health/ready')).payload.ok, true);
  const board = (await json('/api/rivers/summary.json')).payload;
  await json('/api/weekend/summary.json');
  const catalog = (await json('/api/rivers/catalog.json')).payload;
  const route = board.rivers.find(item => item.river.slug === 'rum-river-wayside-milaca') ?? board.rivers[0];
  assert(route && catalog.rivers.some(item => item.river.slug === route.river.slug));
  const slug = encodeURIComponent(route.river.slug);
  await json(`/api/rivers/${slug}.json?snapshot_check=1`);
  const geometry = (await json(`/api/rivers/${slug}/geometry.json`)).payload;
  assert(Array.isArray(geometry.geometry.coordinates));
  const preview = (await json(`/api/rivers/${slug}/preview-photo.json`)).payload.photo;
  if (preview.src.startsWith('/')) {
    const photo = await fetch(url(preview.src), { signal: AbortSignal.timeout(10000) });
    assert.equal(photo.status, 200); assert((await photo.arrayBuffer()).byteLength > 0); checks.push('local preview image delivery');
  }
  for (const path of ['/', '/404.html', `/rivers/${slug}/`, '/weekend/', '/admin/']) {
    const response = await fetch(url(path)); assert.equal(response.status, 200, path); assert((await response.text()).includes('<html')); checks.push(path);
  }
  const trip = await fetch(url(`/api/rivers/${slug}/trip.gpx`));
  assert.equal(trip.status, 200); assert((await trip.text()).includes('<gpx')); checks.push('GPX export');
  const calendar = await fetch(url(`/api/rivers/${slug}/trip.ics?start=2026-10-06T14:00:00Z&end=2026-10-06T18:00:00Z`));
  assert.equal(calendar.status, 200); assert((await calendar.text()).includes('BEGIN:VCALENDAR')); checks.push('calendar export');
  const login = await json('/api/admin/session', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password: env.PADDLETODAY_ADMIN_PASSWORD }) });
  const cookie = login.response.headers.get('set-cookie').split(';')[0];
  const admin = (await json('/api/admin/operations', { headers: { cookie } })).payload;
  assert(Array.isArray(admin.snapshot.states), 'Dynamic admin operations data must load');
  assert.equal((await fetch(url('/api/trips'))).status, 401); checks.push('private trips require authentication');
  console.log(JSON.stringify({ verified: true, node: process.version, compiledBytes: manifest.compiledBytes, checks, externalNetwork: 'disabled' }, null, 2));
} finally {
  if (child && child.exitCode === null && child.signalCode === null) {
    child.kill(); await new Promise(resolve => child.once('exit', resolve));
  }
  // Delete only the explicitly created verification fixture, never the deploy package or repository.
  const target = resolve(fixture);
  assert(target.startsWith(resolve(tmpdir()) + sep) && basename(target).startsWith('paddle-api-verify-'));
  await rm(target, { recursive: true, force: true });
}
