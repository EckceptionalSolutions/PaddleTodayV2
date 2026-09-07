import { PaddleTodayApiError } from '@paddletoday/api-client';

export function requestFailureMessage(error: unknown): string {
  if (error instanceof PaddleTodayApiError) {
    if (error.code === 'request_timeout') return 'The request took too long. Please try again.';
    if (error.status === 429) return 'PaddleToday is receiving too many requests. Wait a moment, then try again.';
    if (error.status >= 500) return 'PaddleToday is temporarily unavailable. Please try again shortly.';
  }
  return 'Could not load the latest updates. Check your connection, then try again.';
}
