import { afterEach, describe, expect, it, vi } from 'vitest';
import { createBrowserApiClient } from './browser-api-client.js';

describe('browser PaddleToday API client', () => {
  afterEach(() => vi.useRealTimers());

  it('uses the page origin and forwards browser cache and abort options', async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const fetchImpl = vi.fn(async () => Response.json({
      requestId: 'request-1',
      generatedAt: '2026-07-27T12:00:00.000Z',
      riverCount: 0,
      rivers: [],
    }));
    const client = createBrowserApiClient({
      origin: 'https://paddletoday.com/explore/',
      fetchImpl,
    });

    await client.getSummary({
      cache: 'no-store',
      signal: controller.signal,
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      new URL('https://paddletoday.com/api/rivers/summary.json'),
      expect.objectContaining({
        cache: 'no-store',
        signal: expect.any(AbortSignal),
      }),
    );
    expect(vi.getTimerCount()).toBe(0);
  });

  it('ends a stalled request after 30 seconds and allows a subsequent retry', async () => {
    vi.useFakeTimers();
    const fetchImpl = vi.fn<typeof fetch>()
      .mockImplementationOnce((_url, init) => new Promise((_resolve, reject) => {
        init!.signal!.addEventListener('abort', () => reject(init!.signal!.reason), { once: true });
      }))
      .mockResolvedValueOnce(Response.json({ rivers: [] }));
    const client = createBrowserApiClient({ origin: 'https://paddletoday.com', fetchImpl });
    const assertion = expect(client.getSummary()).rejects.toMatchObject({
      name: 'PaddleTodayApiError', code: 'request_timeout', status: 0,
    });

    await vi.advanceTimersByTimeAsync(29_999);
    expect(fetchImpl.mock.calls[0][1]!.signal!.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    await assertion;
    expect(vi.getTimerCount()).toBe(0);
    await expect(client.getSummary()).resolves.toEqual({ rivers: [] });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('still cancels superseded requests without reporting a timeout', async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const client = createBrowserApiClient({
      origin: 'https://paddletoday.com',
      fetchImpl: (_url, init) => new Promise((_resolve, reject) => {
        init!.signal!.addEventListener('abort', () => reject(init!.signal!.reason), { once: true });
      }),
    });
    const assertion = expect(client.getSummary({ signal: controller.signal }))
      .rejects.toMatchObject({ name: 'AbortError' });
    controller.abort();
    await assertion;
    expect(vi.getTimerCount()).toBe(0);
  });
});
