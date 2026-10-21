import { tripSchedule } from './trip-schedule';

export const GUEST_TRIP_PLANS_KEY = 'paddletoday:route-plans:v1';
export interface GuestTripPlan {
  slug: string; name: string; reach: string; putInId: string; takeOutId: string;
  start: string; end: string; timeZone: string; savedAt: string;
}
export function guestTripPlans(raw: string | null): GuestTripPlan[] {
  if (raw === null) return [];
  const data = JSON.parse(raw);
  if (data.version !== 1 || !Array.isArray(data.plans) || data.plans.length > 100
    || !data.plans.every((p: GuestTripPlan) => p && p.slug.length <= 180 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)
      && ['name', 'reach', 'putInId', 'takeOutId', 'start', 'end', 'timeZone', 'savedAt'].every(key => typeof p[key as keyof GuestTripPlan] === 'string' && p[key as keyof GuestTripPlan].length <= 500)
      && Number.isFinite(Date.parse(p.savedAt)) && !tripSchedule(p.start, p.end, p.timeZone).error)) {
    throw new Error('Saved browser plans could not be read. Existing data was kept.');
  }
  return data.plans;
}
export function saveGuestTripPlan(storage: Pick<Storage, 'getItem' | 'setItem'>, plan: GuestTripPlan) {
  const plans = guestTripPlans(storage.getItem(GUEST_TRIP_PLANS_KEY));
  const next = [plan, ...plans.filter(p => p.slug !== plan.slug || p.putInId !== plan.putInId || p.takeOutId !== plan.takeOutId)];
  const raw = JSON.stringify({ version: 1, plans: next });
  guestTripPlans(raw); // Validate before writing; never replace unreadable or overflowing data.
  storage.setItem(GUEST_TRIP_PLANS_KEY, raw);
}
