import type { IncomingMessage } from 'node:http';
import { afterEach, describe, expect, it } from 'vitest';
import {
  clearRateLimitState,
  consumeRateLimit,
  getIp,
  rateLimitHeaders,
} from './rate-limit';

afterEach(() => {
  clearRateLimitState();
});

describe('rate limiting', () => {
  it('allows the configured quota and rejects the next request with retry metadata', () => {
    const options = { now: 1_000, windowMs: 60_000, maxRequests: 2 };

    expect(consumeRateLimit('alerts', '203.0.113.8', options)).toMatchObject({
      limited: false,
      remaining: 1,
    });
    expect(consumeRateLimit('alerts', '203.0.113.8', options)).toMatchObject({
      limited: false,
      remaining: 0,
    });

    const rejected = consumeRateLimit('alerts', '203.0.113.8', options);
    expect(rejected).toMatchObject({
      limited: true,
      limit: 2,
      remaining: 0,
      retryAfterSeconds: 60,
    });
    expect(rateLimitHeaders(rejected)).toEqual({
      'ratelimit-limit': '2',
      'ratelimit-remaining': '0',
      'ratelimit-reset': '61',
      'retry-after': '60',
    });
  });

  it('does not let rejected attempts extend the lockout window', () => {
    consumeRateLimit('alerts', '203.0.113.8', { now: 1_000, windowMs: 60_000, maxRequests: 1 });
    consumeRateLimit('alerts', '203.0.113.8', { now: 30_000, windowMs: 60_000, maxRequests: 1 });

    expect(
      consumeRateLimit('alerts', '203.0.113.8', { now: 61_000, windowMs: 60_000, maxRequests: 1 })
    ).toMatchObject({ limited: false, remaining: 0 });
  });

  it('isolates endpoint scopes and client addresses', () => {
    consumeRateLimit('alerts', '203.0.113.8', { now: 1_000, maxRequests: 1 });

    expect(consumeRateLimit('alerts', '203.0.113.8', { now: 1_000, maxRequests: 1 }).limited).toBe(true);
    expect(consumeRateLimit('feedback', '203.0.113.8', { now: 1_000, maxRequests: 1 }).limited).toBe(false);
    expect(consumeRateLimit('alerts', '203.0.113.9', { now: 1_000, maxRequests: 1 }).limited).toBe(false);
  });

  it('uses forwarded addresses only when the connecting proxy is trusted', () => {
    const forwarded = {
      headers: { 'x-forwarded-for': '198.51.100.7, 10.0.0.4' },
      socket: { remoteAddress: '10.0.0.5' },
    } as IncomingMessage;
    const direct = {
      headers: {},
      socket: { remoteAddress: '198.51.100.9' },
    } as IncomingMessage;

    expect(getIp(forwarded)).toBe('10.0.0.5');
    expect(getIp(forwarded, { trustedProxyAddresses: ['10.0.0.5'] })).toBe('198.51.100.7');
    expect(getIp(direct)).toBe('198.51.100.9');
  });
});
