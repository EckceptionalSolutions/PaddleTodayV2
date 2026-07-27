import { afterEach, describe, expect, it, vi } from 'vitest';

import { fetchJson, getUpstreamTelemetry, resetUpstreamTelemetryForTests } from './http';

afterEach(() => {
  resetUpstreamTelemetryForTests();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('fetchJson', () => {
  it('rejects responses that do not advertise JSON content', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response('<html><body>nope</body></html>', {
        status: 200,
        headers: {
          'content-type': 'text/html; charset=utf-8',
        },
      }),
    );

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      fetchJson('https://example.com/test', {
        retries: 1,
      }),
    ).rejects.toThrow('Expected JSON but received text/html; charset=utf-8');

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('passes parsed JSON through an optional decoder', async () => {
    const payload = {
      id: 'sample-id',
      count: 3,
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(payload), {
        status: 200,
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      }),
    );

    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchJson('https://example.com/test', {
      retries: 1,
      decoder: (value) => {
        expect(value).toEqual(payload);

        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
          throw new Error('Expected an object payload');
        }

        const record = value as Record<string, unknown>;

        return {
          id: String(record.id),
          count: Number(record.count),
        };
      },
    });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('records successful upstream requests without retaining full URLs', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      ),
    );

    await fetchJson('https://api.weather.gov/gridpoints/secret?token=private', { retries: 1 });

    const telemetry = getUpstreamTelemetry();
    expect(telemetry).toMatchObject({
      requests: 1,
      successes: 1,
      failures: 0,
      attempts: 1,
      failureRate: 0,
    });
    expect(telemetry.providers).toEqual([
      expect.objectContaining({
        provider: 'api.weather.gov',
        requests: 1,
        successes: 1,
        failures: 0,
      }),
    ]);
    expect(JSON.stringify(telemetry)).not.toContain('secret');
    expect(JSON.stringify(telemetry)).not.toContain('private');
  });

  it('records retries, rate limits, and eventual recovery', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'slow_down' }), {
          status: 429,
          headers: { 'content-type': 'application/json' },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }),
      );
    vi.stubGlobal('fetch', fetchMock);

    await fetchJson('https://waterservices.usgs.gov/nwis/iv/', { retries: 2 });

    expect(getUpstreamTelemetry().providers[0]).toMatchObject({
      provider: 'waterservices.usgs.gov',
      requests: 1,
      successes: 1,
      failures: 0,
      attempts: 2,
      failedAttempts: 1,
      retries: 1,
      rateLimitedResponses: 1,
      consecutiveFailures: 0,
      lastFailureKind: 'rate_limited',
    });
  });

  it('records terminal upstream failures by category', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: 'unavailable' }), {
          status: 503,
          headers: { 'content-type': 'application/json' },
        }),
      ),
    );

    await expect(fetchJson('https://api.weather.gov/points/1,2', { retries: 1 })).rejects.toThrow('HTTP 503');

    expect(getUpstreamTelemetry().providers[0]).toMatchObject({
      requests: 1,
      successes: 0,
      failures: 1,
      failureRate: 1,
      attempts: 1,
      failedAttempts: 1,
      retries: 0,
      serverErrorResponses: 1,
      consecutiveFailures: 1,
      lastFailureKind: 'upstream_server_error',
    });
  });
});
