import { describe, expect, it, vi } from 'vitest';
import { createBrowserApiClient } from './browser-api-client.js';

describe('browser PaddleToday API client', () => {
  it('uses the page origin and forwards browser cache and abort options', async () => {
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
        signal: controller.signal,
      }),
    );
  });
});
