import assert from 'node:assert/strict';
const revision = process.env.EXPECTED_FRONTEND_REVISION;
assert.match(revision || '', /^[a-f0-9]{40}$/);
const origins = (process.env.FRONTEND_RELEASE_ORIGINS || 'https://paddletoday.com,https://www.paddletoday.com').split(',');
assert.ok(origins.length && origins.length <= 2);
for (const origin of origins) {
  const url = new URL(origin); assert.equal(url.protocol, 'https:');
  assert.ok(['paddletoday.com', 'www.paddletoday.com'].includes(url.host)); assert.equal(url.pathname, '/');
}
let ready = false;
for (let attempt = 1; attempt <= 48; attempt++) {
  const results = await Promise.all(origins.map(async origin => {
    try {
      const response = await fetch(`${origin}/.well-known/paddletoday-frontend-release.json?revision=${revision}`, {
        cache: 'no-store', signal: AbortSignal.timeout(10000) });
      return { origin, status: response.status, matches: response.ok && (await response.json()).sourceRevision === revision };
    } catch { return { origin, status: 'unavailable', matches: false }; }
  }));
  console.log(JSON.stringify({ attempt, results }));
  if (results.every(result => result.matches)) { ready = true; break; }
  if (attempt < 48) await new Promise(resolve => setTimeout(resolve, 10000));
}
assert.ok(ready, 'Expected frontend revision did not become available on both production hosts.');
