import { describe, expect, it } from 'vitest';
import type { ApiRequest } from './http';
import { requestHasRefreshToken } from './routes/snapshots';

function request(headers: Record<string, string> = {}) {
  return { headers } as unknown as ApiRequest;
}

describe('snapshot refresh authorization', () => {
  it('fails closed in production when no token is configured', () => {
    expect(requestHasRefreshToken(request(), undefined, true)).toBe(false);
    expect(requestHasRefreshToken(request({ 'x-history-token': 'anything' }), '', true)).toBe(false);
  });

  it('allows tokenless local development when production mode is off', () => {
    expect(requestHasRefreshToken(request(), undefined, false)).toBe(true);
  });

  it('accepts the configured token from the dedicated header', () => {
    expect(requestHasRefreshToken(request({ 'x-history-token': 'correct-token' }), 'correct-token', true)).toBe(true);
  });

  it('accepts a Bearer token and rejects mismatches', () => {
    expect(requestHasRefreshToken(request({ authorization: 'Bearer correct-token' }), 'correct-token', true)).toBe(true);
    expect(requestHasRefreshToken(request({ authorization: 'Bearer wrong-token' }), 'correct-token', true)).toBe(false);
  });
});
