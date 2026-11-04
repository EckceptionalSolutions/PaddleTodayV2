export async function waitForSnapshotReader({ baseUrl, requiredFormat = 'detail-buckets-v1', capability = 'snapshotDetailFormats', timeoutMs = 20 * 60_000, intervalMs = 10_000,
  requestTimeoutMs = 10_000, now = Date.now, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
  fetchImpl = globalThis.fetch, onAttempt = () => {} }) {
  const endpoint = new URL('/api/health', baseUrl);
  if (endpoint.protocol !== 'https:' && !(endpoint.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(endpoint.hostname))) {
    throw new Error('Snapshot reader readiness requires HTTPS or a loopback test origin.');
  }
  if (![timeoutMs, intervalMs, requestTimeoutMs].every(value => Number.isFinite(value) && value > 0)) {
    throw new Error('Snapshot reader readiness timings must be positive.');
  }
  const deadline = now() + timeoutMs;
  for (let attempt = 1; ; attempt++) {
    const result = { attempt, compatible: false };
    try {
      const response = await fetchImpl(endpoint, { redirect: 'manual', signal: AbortSignal.timeout(Math.min(requestTimeoutMs, Math.max(1, deadline - now()))),
        headers: { accept: 'application/json', 'cache-control': 'no-cache' } });
      result.status = response.status;
      if (response.status === 200) {
        const body = await response.json();
        result.compatible = body?.ok === true && Array.isArray(body[capability])
          && body[capability].includes(requiredFormat);
      } else await response.body?.cancel();
    } catch {
      result.status = 'unavailable';
    }
    onAttempt(result);
    if (result.compatible) return result;
    if (now() >= deadline) throw new Error('Compatible snapshot API reader was not observed; stopping before batched worker deployment.');
    await sleep(Math.min(intervalMs, deadline - now()));
  }
}
