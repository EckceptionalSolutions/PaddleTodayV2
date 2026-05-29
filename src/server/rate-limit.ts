import type { ApiRequest } from './http';
import { clean } from './http';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const rateByIp = new Map<string, number[]>();

export function getIp(request: ApiRequest) {
  const forwardedFor = clean(request.headers['x-forwarded-for'], 240);
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return clean(request.headers['x-client-ip'], 240) || 'unknown';
}

export function isRateLimited(ip: string) {
  const now = Date.now();
  const previous = rateByIp.get(ip) || [];
  const recent = previous.filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  recent.push(now);
  rateByIp.set(ip, recent);
  return recent.length > RATE_MAX;
}
