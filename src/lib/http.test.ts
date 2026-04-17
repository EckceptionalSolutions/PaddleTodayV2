import { afterEach, describe, expect, it, vi } from 'vitest';

import { fetchJson } from './http';

afterEach(() => {
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
});
