export function normalizeDeploymentRevision(value) {
  if (typeof value !== 'string' || !/^[a-f0-9]{40}$/i.test(value)) throw new Error('Expected deployment revision must be a full 40-character Git commit SHA.');
  return value.toLowerCase();
}

export function deploymentRevisionMatches(payload, expected) {
  return payload?.ok === true && payload.buildRevision === normalizeDeploymentRevision(expected);
}

/** Check the running process, never a mutable deployment file or a cached public API. */
export async function waitForApiRevision({ baseUrl, expectedRevision, timeoutMs = 240000, intervalMs = 10000, requestTimeoutMs = 10000, onAttempt = () => {}, fetchImpl = globalThis.fetch, now = Date.now, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)) }) {
  const expected = normalizeDeploymentRevision(expectedRevision);
  const endpoint = new URL('/api/health', baseUrl);
  if (endpoint.protocol !== 'https:' && !(endpoint.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(endpoint.hostname))) throw new Error('Revision readiness requires HTTPS or a loopback test origin.');
  if (![timeoutMs, intervalMs, requestTimeoutMs].every(value => Number.isFinite(value) && value > 0)) throw new Error('Revision readiness timings must be positive.');
  const deadline = now() + timeoutMs;
  let last;
  for (let attempt = 1; ; attempt++) {
    last = { attempt, expectedRevision: expected, reportedRevision: null, matches: false };
    try {
      const remaining = Math.max(1, deadline - now());
      const response = await fetchImpl(endpoint, { redirect: 'manual', headers: { accept: 'application/json', 'cache-control': 'no-cache' }, signal: AbortSignal.timeout(Math.min(requestTimeoutMs, remaining)) });
      last.httpStatus = response.status;
      if (response.status === 200) {
        const payload = await response.json();
        last.reportedRevision = typeof payload?.buildRevision === 'string' && /^[a-f0-9]{40}$/i.test(payload.buildRevision) ? payload.buildRevision : null;
        last.matches = deploymentRevisionMatches(payload, expected);
      } else await response.body?.cancel();
    } catch (error) {
      last.error = error instanceof Error ? error.name : 'request_failed';
    }
    onAttempt(last);
    if (last.matches) return last;
    if (now() >= deadline) throw new Error(`API revision did not become ready: expected ${expected}, last reported ${last.reportedRevision ?? 'missing'} (HTTP ${last.httpStatus ?? 'unavailable'}).`);
    await sleep(Math.min(intervalMs, deadline - now()));
  }
}
