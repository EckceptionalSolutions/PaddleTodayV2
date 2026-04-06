import { createPaddleTodayApiClient } from '@paddletoday/api-client';
import { resolveApiBaseUrl } from '../lib/api-base-url';

export const apiClient = createPaddleTodayApiClient({
  baseUrl: resolveApiBaseUrl(),
});
