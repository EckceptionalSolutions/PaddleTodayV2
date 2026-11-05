import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const checks = [];
for (const path of ['/', '/explore/?utm_source=hosting-verification', '/api/health', '/api/account',
  '/.well-known/assetlinks.json', '/.well-known/apple-app-site-association']) {
  const response = await fetch('https://www.paddletoday.com' + path, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 301, path);
  assert.equal(response.headers.get('location'), 'https://paddletoday.com' + path, path);
  await response.body?.cancel(); checks.push({ path, status: response.status, location: response.headers.get('location') });
}
await mkdir('.local/frontend-hosting', { recursive: true });
await writeFile('.local/frontend-hosting/www-verification.json', JSON.stringify({ checkedAt: new Date().toISOString(), checks, status: 'passed' }, null, 2));
console.log('Verified six www redirects, including query strings, APIs, and mobile associations.');
