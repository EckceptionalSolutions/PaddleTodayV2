import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { PROXY_VERSION } from '../infra/cloudflare/api-proxy.mjs';

const origin = new URL(process.env.FRONTEND_CANARY_ORIGIN || 'http://127.0.0.1:8788');
assert.ok(origin.protocol === 'https:' || (origin.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(origin.hostname)));
assert.ok(!origin.username && !origin.password && origin.pathname === '/' && !origin.search && !origin.hash);
const report = { checkedAt: new Date().toISOString(), origin: origin.origin, checks: [] };
async function get(path, status, options = {}) {
  const response = await fetch(origin.origin + path, { ...options, redirect: 'manual', signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, status, `${options.method || 'GET'} ${path}`);
  report.checks.push({ method: options.method || 'GET', path, status });
  return response;
}
try {
  for (const path of ['/', '/explore/', '/account/', '/trips/']) {
    const response = await get(path, 200);
    assert.match(response.headers.get('content-type') || '', /text\/html/);
    assert.match(response.headers.get('strict-transport-security') || '', /max-age=31536000/);
    assert.match(response.headers.get('permissions-policy') || '', /geolocation=\(self\)/);
    assert.ok((await response.text()).includes('Paddle Today'));
  }
  const missing = await get('/not-a-real-page-frontend-migration-check', 404);
  assert.match(missing.headers.get('content-type') || '', /text\/html/); await missing.body?.cancel();
  const config = JSON.parse(await readFile('staticwebapp.config.json', 'utf8'));
  const alias = config.routes.find(route => route.route.startsWith('/rivers/') && route.redirect && route.statusCode === 301 && !/[.*]/.test(route.route));
  assert.ok(alias, 'A canonical redirect probe is required.');
  for (const path of [alias.route, alias.route + '/']) {
    const response = await get(path, 301); assert.equal(new URL(response.headers.get('location'), origin).pathname,
      new URL(alias.redirect, origin).pathname); assert.equal(new URL(response.headers.get('location'), origin).hash,
      new URL(alias.redirect, origin).hash); await response.body?.cancel();
  }
  const association = await get('/.well-known/apple-app-site-association', 200);
  assert.match(association.headers.get('content-type') || '', /application\/json/); assert.ok((await association.json()).applinks);
  const release = await (await get('/.well-known/paddletoday-frontend-release.json', 200)).json();
  assert.equal(release.format, 'PaddleTodayFrontendRelease');
  if (process.env.EXPECTED_FRONTEND_REVISION) assert.equal(release.sourceRevision, process.env.EXPECTED_FRONTEND_REVISION);
  report.frontendRevision = release.sourceRevision;
  const legacy = await get('/gallery/fallbacks/river-fallback-wide.jpg', 302, { method: 'HEAD' });
  assert.equal(legacy.headers.get('location'), 'https://paddletoday.blob.core.windows.net/web-assets/legacy/gallery/fallbacks/river-fallback-wide.jpg');
  for (const path of ['/api/account', '/api/trips']) {
    for (const headers of [{}, { authorization: 'Bearer invalid-canary-verification-token' }]) {
      const response = await get(path, 401, { headers });
      assert.equal(response.headers.get('x-paddletoday-api-proxy'), PROXY_VERSION);
      assert.match(response.headers.get('cache-control') || '', /no-store/); await response.body?.cancel();
    }
  }
  const options = await get('/api/account', 204, { method: 'OPTIONS' });
  assert.match(options.headers.get('access-control-allow-headers') || '', /authorization/);
  const healthResponse = await get('/api/health', 200);
  assert.equal(healthResponse.headers.get('x-paddletoday-api-proxy'), PROXY_VERSION);
  const health = await healthResponse.json(); assert.equal(health.ok, true); report.apiRevision = health.buildRevision;
  const summaryResponse = await get('/api/rivers/summary.json', 200);
  const summary = await summaryResponse.json(); assert.equal(summary.snapshotStatus, 'fresh'); assert.ok(summary.rivers.length > 1000);
  report.routeCount = summary.rivers.length;
  const head = await get('/api/rivers/summary.json', 200, { method: 'HEAD' }); assert.equal(await head.text(), '');
  const missingApi = await get('/api/not-a-real-api-migration-check', 404);
  assert.match(missingApi.headers.get('content-type') || '', /application\/json/); await missingApi.body?.cancel();
  report.status = 'passed';
} catch (error) { report.status = 'failed'; report.error = error.message; process.exitCode = 1; }
const output = process.env.FRONTEND_CANARY_REPORT || '.local/frontend-hosting/canary-verification.json';
await mkdir(dirname(output), { recursive: true }); await writeFile(output, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
