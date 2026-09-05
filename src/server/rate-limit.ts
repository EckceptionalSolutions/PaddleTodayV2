import type { ApiRequest } from './http';
import { clean } from './http';

const DEFAULT_WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_MAX_REQUESTS = 5;
const DEFAULT_MAX_BUCKETS = 10_000;

export type RateLimitScope = 'alerts' | 'feedback' | 'route_contributions' | 'route_requests' | 'admin_login';

export interface RateLimitDecision {
  limited: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
}

interface RateLimitPolicy {
  windowMs: number;
  maxRequests: number;
}

const rateByScopeAndIp = new Map<string, number[]>();

export function getIp(request: ApiRequest, options: { trustedProxyAddresses?: string[] } = {}) {
  const socket = socketAddress(request);
  const trustedProxyAddresses = options.trustedProxyAddresses
    ?? (process.env.TRUSTED_PROXY_IPS || '').split(',').map((value) => value.trim()).filter(Boolean);
  const proxyTrusted = trustedProxyAddresses.includes(socket);
  if (!proxyTrusted) return socket;

  const forwardedFor = clean(request.headers['x-forwarded-for'], 240);
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || socketAddress(request);
  }

  return clean(request.headers['x-client-ip'], 240) || socketAddress(request);
}

export function consumeRateLimit(
  scope: RateLimitScope,
  ip: string,
  options: {
    now?: number;
    windowMs?: number;
    maxRequests?: number;
  } = {}
): RateLimitDecision {
  const now = options.now ?? Date.now();
  const policy = rateLimitPolicy(scope, options);
  const key = `${scope}:${ip || 'unknown'}`;
  const previous = rateByScopeAndIp.get(key) ?? [];
  const recent = previous.filter((timestamp) => now - timestamp < policy.windowMs);
  const limited = recent.length >= policy.maxRequests;

  if (!limited) {
    recent.push(now);
  }

  if (recent.length > 0) {
    rateByScopeAndIp.set(key, recent);
  } else {
    rateByScopeAndIp.delete(key);
  }

  pruneExpiredBuckets(now, policy.windowMs);

  const resetAt = (recent[0] ?? now) + policy.windowMs;
  return {
    limited,
    limit: policy.maxRequests,
    remaining: Math.max(0, policy.maxRequests - recent.length),
    resetAt,
    retryAfterSeconds: limited ? Math.max(1, Math.ceil((resetAt - now) / 1000)) : 0,
  };
}

export function rateLimitHeaders(decision: RateLimitDecision) {
  return {
    'ratelimit-limit': String(decision.limit),
    'ratelimit-remaining': String(decision.remaining),
    'ratelimit-reset': String(Math.ceil(decision.resetAt / 1000)),
    ...(decision.limited ? { 'retry-after': String(decision.retryAfterSeconds) } : {}),
  };
}

export function clearRateLimitState() {
  rateByScopeAndIp.clear();
}

function rateLimitPolicy(
  scope: RateLimitScope,
  overrides: { windowMs?: number; maxRequests?: number }
): RateLimitPolicy {
  const scopeKey = scope.toUpperCase();
  return {
    windowMs: positiveInteger(
      overrides.windowMs,
      process.env[`RATE_LIMIT_${scopeKey}_WINDOW_MS`],
      process.env.RATE_LIMIT_WINDOW_MS,
      DEFAULT_WINDOW_MS
    ),
    maxRequests: positiveInteger(
      overrides.maxRequests,
      process.env[`RATE_LIMIT_${scopeKey}_MAX`],
      process.env.RATE_LIMIT_MAX,
      DEFAULT_MAX_REQUESTS
    ),
  };
}

function positiveInteger(...values: unknown[]) {
  for (const value of values) {
    const parsed = Number(value);
    if (Number.isSafeInteger(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return 1;
}

function socketAddress(request: ApiRequest) {
  return clean(request.socket?.remoteAddress, 240) || 'unknown';
}

function pruneExpiredBuckets(now: number, windowMs: number) {
  if (rateByScopeAndIp.size <= DEFAULT_MAX_BUCKETS) {
    return;
  }

  for (const [key, timestamps] of rateByScopeAndIp) {
    if (!timestamps.some((timestamp) => now - timestamp < windowMs)) {
      rateByScopeAndIp.delete(key);
    }
  }

  while (rateByScopeAndIp.size > DEFAULT_MAX_BUCKETS) {
    const oldestKey = rateByScopeAndIp.keys().next().value;
    if (typeof oldestKey !== 'string') {
      break;
    }
    rateByScopeAndIp.delete(oldestKey);
  }
}
