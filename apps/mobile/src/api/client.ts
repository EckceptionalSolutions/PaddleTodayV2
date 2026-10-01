import { createPaddleTodayApiClient } from '@paddletoday/api-client';
import { resolveApiBaseUrl } from '../lib/api-base-url';

export const apiClient = createPaddleTodayApiClient({
  baseUrl: resolveApiBaseUrl(),
  timeoutMs: 12000,
  // TanStack controls snapshot reuse and offline persistence. Revalidate the
  // native HTTP cache so an explicit refresh can retrieve corrected access
  // points and current conditions even after an installed-app upgrade.
  headers: { 'cache-control': 'no-cache' },
});
