import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdir, open, readFile, realpath, stat, unlink } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mobile = path.join(repository, 'apps', 'mobile');
const output = path.join(mobile, '.expo', 'mobile-web-check');
const lockPath = `${output}.lock`;
const contentTypes = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff': 'font/woff', '.woff2': 'font/woff2', '.otf': 'font/otf' };
function insideOutput(file) {
  const relative = path.relative(output, file);
  return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}
async function isFile(file) {
  try { return insideOutput(await realpath(file)) && (await stat(file)).isFile(); }
  catch { return false; }
}
const server = createServer(async (request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'GET' && request.method !== 'HEAD') { response.writeHead(405).end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end(); return; }
  // Unmocked API calls fail locally. This fixture server never proxies production.
  if (pathname.startsWith('/api/')) {
    response.writeHead(503, { 'Content-Type': 'application/json' }).end(request.method === 'HEAD' ? undefined : JSON.stringify({ error: 'offline', message: 'API requests must be mocked in mobile web checks.' }));
    return;
  }
  let file = path.resolve(output, `.${pathname}`);
  if (!insideOutput(file) || pathname.includes('\0')) { response.writeHead(400).end(); return; }
  if (pathname === '/') file = path.join(output, 'index.html');
  else if (!path.extname(file)) file = `${file.replace(/[\\/]$/, '')}.html`;
  let status = 200;
  if (!(await isFile(file))) {
    const dynamic = /^\/(river|contribute-photo|river-hub)\/[^/]+\/?$/.exec(pathname);
    if (dynamic) file = path.join(output, dynamic[1], dynamic[1] === 'river-hub' ? '[riverId].html' : '[slug].html');
    else if (!path.extname(pathname)) { file = path.join(output, '+not-found.html'); status = 404; }
    else { response.writeHead(404).end(); return; }
  }
  if (!(await isFile(file))) { response.writeHead(404).end(); return; }
  try {
    const body = request.method === 'HEAD' ? undefined : await readFile(file);
    response.writeHead(status, { 'Content-Type': contentTypes[path.extname(file)] ?? 'application/octet-stream' }).end(body);
  } catch { response.writeHead(500).end(); }
});

let child;
let interrupted = false;
function interrupt() { interrupted = true; child?.kill(); }
function run(cli, args, cwd, env) {
  return new Promise((resolve, reject) => {
    if (interrupted) { reject(new Error('Checks interrupted.')); return; }
    child = spawn(process.execPath, [cli, ...args], { cwd, env, stdio: 'inherit', windowsHide: true });
    child.once('error', reject);
    child.once('close', (code, signal) => {
      child = undefined;
      if (code === 0) resolve();
      else reject(new Error(`${path.basename(cli)} exited with ${signal ?? code}.`));
    });
  });
}

let lock;
try {
  await mkdir(path.dirname(output), { recursive: true });
  try { lock = await open(lockPath, 'wx'); }
  catch (error) {
    if (error.code === 'EEXIST') throw new Error(`Another export check may be running. If it has stopped, remove the stale lock: ${lockPath}`);
    throw error;
  }
  await lock.writeFile(String(process.pid));
  process.on('SIGINT', interrupt);
  process.on('SIGTERM', interrupt);
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const origin = `http://127.0.0.1:${server.address().port}`;
  const env = { ...process.env, EXPO_PUBLIC_API_BASE_URL: origin, EXPO_NO_TELEMETRY: '1', EXPO_OFFLINE: '1' };
  console.log(`Building mobile web checks into ${output}`);
  await run(require.resolve('expo/bin/cli'), ['export', '--platform', 'web', '--output-dir', output], mobile, env);
  console.log(`Testing the exported app at ${origin}`);
  await run(require.resolve('@playwright/test/cli'), ['test', '--config=playwright.mobile.config.ts', ...process.argv.slice(2)], repository,
    { ...env, MOBILE_WEB_BASE_URL: origin, MOBILE_WEB_EXPORT_CHECK: '1' });
} catch (error) {
  console.error(error.message);
  process.exitCode = interrupted ? 130 : 1;
} finally {
  child?.kill();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
  if (lock) { await lock.close(); await unlink(lockPath); }
  process.removeListener('SIGINT', interrupt);
  process.removeListener('SIGTERM', interrupt);
}
