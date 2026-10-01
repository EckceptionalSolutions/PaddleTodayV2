import { expect, it, vi } from 'vitest';

const createClient = vi.hoisted(() => vi.fn(() => ({ marker: 'configured-client' })));
vi.mock('@paddletoday/api-client', () => ({ createPaddleTodayApiClient: createClient }));
vi.mock('../lib/api-base-url', () => ({ resolveApiBaseUrl: () => 'https://paddletoday.com' }));

import { apiClient } from './client';

it('revalidates native HTTP responses while TanStack owns snapshot reuse', () => {
  expect(createClient).toHaveBeenCalledWith({
    baseUrl: 'https://paddletoday.com',
    timeoutMs: 12000,
    headers: { 'cache-control': 'no-cache' },
  });
  expect(apiClient).toEqual({ marker: 'configured-client' });
});
