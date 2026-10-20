import { describe, expect, it } from 'vitest';
import { deploymentRevisionMatches, normalizeDeploymentRevision, waitForApiRevision } from './deployment-revision.mjs';

const current = 'a'.repeat(40), old = 'b'.repeat(40);
const response = (payload: unknown, status = 200) => new Response(JSON.stringify(payload), { status });
function clock() {
  let time = 0;
  return { now: () => time, sleep: async (ms: number) => { time += ms; } };
}

describe('deployed API revision readiness', () => {
  it('does not accept a healthy old worker with the same catalog size', async () => {
    const attempts: any[] = [], requests: any[] = [];
    const result = await waitForApiRevision({ baseUrl: 'https://example.test', expectedRevision: current, timeoutMs: 30, intervalMs: 10, ...clock(),
      fetchImpl: async (url: URL, init: RequestInit) => { requests.push({ url: String(url), init }); return response({ ok: true, riverCount: 2546, buildRevision: requests.length === 1 ? old : current }); },
      onAttempt: (attempt: any) => attempts.push(attempt),
    });
    expect(attempts.map(attempt => attempt.matches)).toEqual([false, true]);
    expect(result.reportedRevision).toBe(current);
    expect(requests[0].url).toBe('https://example.test/api/health');
    expect(requests[0].init.redirect).toBe('manual');
    expect(requests[0].init.headers['cache-control']).toBe('no-cache');
  });

  it('fails when an older worker never reports the expected revision', async () => {
    await expect(waitForApiRevision({ baseUrl: 'http://127.0.0.1:4321', expectedRevision: current, timeoutMs: 20, intervalMs: 10, ...clock(),
      fetchImpl: async () => response({ ok: true, buildRevision: old }),
    })).rejects.toThrow(`expected ${current}, last reported ${old}`);
  });

  it('does not accept missing revision fields from the pre-upgrade API', async () => {
    await expect(waitForApiRevision({ baseUrl: 'https://example.test', expectedRevision: current, timeoutMs: 10, intervalMs: 10, ...clock(),
      fetchImpl: async () => response({ ok: true, riverCount: 2546 }),
    })).rejects.toThrow('last reported missing');
  });

  it('waits through startup failures without inventing success or restarting a process', async () => {
    let calls = 0;
    const result = await waitForApiRevision({ baseUrl: 'https://example.test', expectedRevision: current, timeoutMs: 40, intervalMs: 10, ...clock(),
      fetchImpl: async () => { calls++; if (calls === 1) throw new Error('connection unavailable'); return response({ ok: true, buildRevision: current }, calls === 2 ? 503 : 200); },
    });
    expect(calls).toBe(3);
    expect(result.matches).toBe(true);
  });

  it('rejects an unhealthy matching revision and invalid configuration', async () => {
    expect(deploymentRevisionMatches({ ok: false, buildRevision: current }, current)).toBe(false);
    expect(normalizeDeploymentRevision(current.toUpperCase())).toBe(current);
    expect(() => normalizeDeploymentRevision('main')).toThrow('full 40-character');
    await expect(waitForApiRevision({ baseUrl: 'http://example.test', expectedRevision: current })).rejects.toThrow('HTTPS or a loopback');
  });

  it('does not accept a redirect carrying a matching revision', async () => {
    await expect(waitForApiRevision({ baseUrl: 'https://example.test', expectedRevision: current, timeoutMs: 10, intervalMs: 10, ...clock(),
      fetchImpl: async () => response({ ok: true, buildRevision: current }, 302),
    })).rejects.toThrow('HTTP 302');
  });
});
