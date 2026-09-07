import { describe, expect, it } from 'vitest';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import { requestFailureMessage } from './request-failure';

describe('request failure guidance', () => {
  it.each([
    [0, 'request_timeout', 'took too long'],
    [429, null, 'Wait a moment'],
    [503, null, 'temporarily unavailable'],
  ])('explains status %s and code %s without raw diagnostics', (status, code, expected) => {
    const message = requestFailureMessage(new PaddleTodayApiError({ status, code, message: 'QA internal diagnostic' }));
    expect(message).toContain(expected);
    expect(message).not.toContain('QA internal diagnostic');
  });

  it('offers connection recovery for an unknown failure', () => {
    expect(requestFailureMessage(new Error('QA internal diagnostic'))).toContain('Check your connection');
  });
});
