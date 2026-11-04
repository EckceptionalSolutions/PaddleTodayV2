import { describe, expect, it } from 'vitest';
import { waitForSnapshotReader } from './snapshot-reader-readiness.mjs';

const response = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const compatible = { ok: true, snapshotDetailFormats: ['legacy', 'detail-buckets-v1'] };
function clock() {
  let time = 0;
  return { now: () => time, sleep: async (ms: number) => { time += ms; } };
}

describe('batch writer rollout guard', () => {
  it('requires the history capability for daily-finalization writers', async () => {
    let calls = 0;
    const result = await waitForSnapshotReader({ baseUrl: 'https://api.test', capability: 'historySummaryModes', requiredFormat: 'daily-finalize-v1',
      timeoutMs: 30, intervalMs: 10, ...clock(), fetchImpl: async () => response(++calls === 1 ? compatible
        : { ok: true, historySummaryModes: ['legacy', 'daily-finalize-v1'] }) });
    expect(calls).toBe(2);expect(result.compatible).toBe(true);
  });
  it('waits for an explicitly compatible running API, regardless of its release SHA', async () => {
    let count = 0;
    const result = await waitForSnapshotReader({ baseUrl: 'https://api.test', timeoutMs: 30, intervalMs: 10, ...clock(),
      fetchImpl: async (url: URL, init: RequestInit) => {
        expect(String(url)).toBe('https://api.test/api/health');
        expect(init.redirect).toBe('manual');
        expect(init.headers).toMatchObject({ 'cache-control': 'no-cache' });
        return response(++count === 1 ? { ok: true } : compatible);
      } });
    expect(count).toBe(2);
    expect(result.compatible).toBe(true);
  });

  it.each([
    [compatible, 302], [compatible, 503], [{ ...compatible, ok: false }, 200],
    [{ ok: true, snapshotDetailFormats: ['legacy'] }, 200],
  ])('refuses unhealthy, redirected, and incompatible APIs', async (body, status) => {
    await expect(waitForSnapshotReader({ baseUrl: 'https://api.test', timeoutMs: 10, intervalMs: 10, ...clock(),
      fetchImpl: async () => response(body, status as number),
    })).rejects.toThrow('Compatible snapshot API reader was not observed');
  });

  it('bounds retries for unreachable APIs and rejects insecure nonlocal origins', async () => {
    await expect(waitForSnapshotReader({ baseUrl: 'https://api.test', timeoutMs: 10, intervalMs: 10, ...clock(),
      fetchImpl: async () => { throw new Error('offline'); },
    })).rejects.toThrow('Compatible snapshot API reader was not observed');
    await expect(waitForSnapshotReader({ baseUrl: 'http://api.test' })).rejects.toThrow('HTTPS or a loopback');
  });
});
