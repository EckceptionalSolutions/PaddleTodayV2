export interface SharedTripPlan {
  version: 1;
  routeSlug: string;
  routeName: string;
  putInId: string;
  putInName: string;
  takeOutId: string;
  takeOutName: string;
  launchLocal: string;
  timeZone: string;
}

export type SharedTripPlanInput = Omit<SharedTripPlan, 'version'>;

export function isSharedTripPlan(value: unknown): value is SharedTripPlan {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const plan = value as Record<string, unknown>;
  const expectedKeys = ['version', 'routeSlug', 'routeName', 'putInId', 'putInName', 'takeOutId', 'takeOutName', 'launchLocal', 'timeZone'];
  if (Object.keys(plan).length !== expectedKeys.length
    || expectedKeys.some(key => !Object.prototype.hasOwnProperty.call(plan, key))) return false;
  return plan.version === 1
    && isShortText(plan.routeSlug, 160) && /^[a-z0-9-]+$/.test(plan.routeSlug)
    && isShortText(plan.routeName, 240)
    && isShortText(plan.putInId, 160)
    && isShortText(plan.putInName, 240)
    && isShortText(plan.takeOutId, 160)
    && isShortText(plan.takeOutName, 240)
    && isLocalDateTime(plan.launchLocal)
    && isShortText(plan.timeZone, 80);
}

export function encodeSharedTripPlan(plan: SharedTripPlanInput, baseUrl: string) {
  const value = { version: 1 as const, ...plan };
  if (!isSharedTripPlan(value)) throw new TypeError('Trip plan cannot be shared because one or more fields are invalid.');
  const url = new URL('/share/trip/', baseUrl);
  // The fragment is not sent in HTTP requests or referrer headers.
  url.hash = new URLSearchParams({ plan: JSON.stringify(value) }).toString();
  return url.toString();
}

export function decodeSharedTripPlan(value: string | null): SharedTripPlan | null {
  if (!value || value.length > 4096) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    return isSharedTripPlan(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function isShortText(value: unknown, maxLength: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

function isLocalDateTime(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const match = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})$/.exec(value);
  if (!match) return false;
  const [, year, month, day, hour, minute] = match.map(Number);
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) return false;
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}
