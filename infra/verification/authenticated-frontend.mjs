import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
const allowedOrigins = new Set(['https://paddletoday.com', 'https://paddletoday-frontend-canary.paddletoday-c8681e05.workers.dev']);

/** Exercise only a newly created test identity; never read existing users. */
export async function verifyAuthenticatedFrontend({ auth, exchangeCustomToken, origin, fetchImpl = fetch,
  uidFactory = () => `paddletoday-hosting-${randomUUID()}` }) {
  assert.ok(allowedOrigins.has(origin), 'Unexpected authenticated-test destination.');
  const uid = uidFactory(); assert.match(uid, /^paddletoday-hosting-[a-f0-9-]{36}$/);
  const report = { checkedAt: new Date().toISOString(), origin, status: 'failed', stage: 'create-user', checks: [], cleanup: 'pending' };
  let created = false, idToken;
  try {
    await auth.createUser({ uid, displayName: uid }); created = true;
    report.stage = 'exchange-token';
    idToken = await exchangeCustomToken(await auth.createCustomToken(uid));
    assert.ok(typeof idToken === 'string' && idToken.length > 20);
    for (const path of ['/api/account', '/api/trips']) {
      report.stage = path;
      const response = await fetchImpl(origin + path, { redirect: 'manual', cache: 'no-store',
        headers: { authorization: `Bearer ${idToken}` }, signal: AbortSignal.timeout(30000) });
      const privateNoStore = /private.*no-store/.test(response.headers.get('cache-control') || '');
      const proxyVerified = response.headers.get('x-paddletoday-api-proxy') === 'paddletoday-api-proxy-v1';
      report.checks.push({ path, status: response.status, privateNoStore, proxyVerified });
      assert.equal(response.status, 200); assert.ok(privateNoStore && proxyVerified);
      const body = await response.json();
      if (path === '/api/account') assert.equal(body.uid, uid);
    }
    report.status = 'passed'; report.stage = 'verified';
  } catch {
    // Never serialize an SDK/fetch error: it may contain credential material.
    report.status = 'failed';
  } finally {
    try {
      if (!created) {
        // Resolve an uncertain create result before cleanup. A pre-existing
        // identity with a different marker must never be deleted.
        try { created = (await auth.getUser(uid)).displayName === uid; }
        catch (error) { if (error?.code !== 'auth/user-not-found') throw error; }
      }
      if (created) { await auth.deleteUser(uid); report.cleanup = 'deleted'; }
      else report.cleanup = 'not-created';
    } catch { report.cleanup = 'failed'; report.cleanupUid = uid; report.status = 'failed'; }
  }
  if (idToken && report.cleanup === 'deleted') {
    try {
      const response = await fetchImpl(origin + '/api/account', { redirect: 'manual', cache: 'no-store',
        headers: { authorization: `Bearer ${idToken}` }, signal: AbortSignal.timeout(30000) });
      report.deletedIdentityStatus = response.status; await response.body?.cancel();
      assert.equal(response.status, 401);
    } catch { report.status = 'failed'; report.stage = 'deleted-identity-rejection'; }
  }
  return report;
}
