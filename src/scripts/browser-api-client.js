import { createPaddleTodayApiClient } from '@paddletoday/api-client';

let sharedClient = null;

export function createBrowserApiClient({
  origin = globalThis.location?.origin,
  fetchImpl = globalThis.fetch,
} = {}) {
  if (typeof origin !== 'string' || !origin.trim()) {
    throw new Error('A browser origin is required to create the PaddleToday API client.');
  }

  return createPaddleTodayApiClient({
    baseUrl: origin,
    fetchImpl,
    // Bound the full request, including the body, so stalled connections reach
    // the page's existing failure/retry flow instead of leaving it loading.
    timeoutMs: 30_000,
  });
}

export function getBrowserApiClient() {
  sharedClient ??= createBrowserApiClient();
  return sharedClient;
}
