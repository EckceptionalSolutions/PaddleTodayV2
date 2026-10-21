import { guestTripPlans, GUEST_TRIP_PLANS_KEY } from '../lib/guest-trip-plans';
import { tripPlanHref } from '../lib/trip-schedule';

const root = document.querySelector('[data-guest-trip-plans]')!;
const status = root.querySelector('[data-guest-trip-status]')!;
const params = new URLSearchParams(location.search), slug = params.get('route');
if (slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 180) {
  const context = new URLSearchParams();
  for (const key of ['putin', 'takeout', 'date', 'launch', 'expected', 'start', 'end', 'timeZone']) {
    const value = params.get(key); if (value && value.length <= 200) context.set(key, value);
  }
  location.replace(tripPlanHref(slug, context));
} else {
  try {
    const plans = guestTripPlans(localStorage.getItem(GUEST_TRIP_PLANS_KEY));
    status.textContent = params.has('id') ? 'Shared account trips remain paused on the website. Your browser plans are available below.'
      : plans.length ? 'These plans stay in this browser. Open a plan to review current access and conditions before launch.' : 'No browser plans saved yet. Open a route and choose Plan this route to start.';
    const list = root.querySelector('[data-guest-trip-list]')!;
    for (const plan of plans) {
      const item = document.createElement('li'), link = document.createElement('a');
      link.href = tripPlanHref(plan.slug, new URLSearchParams({ putin: plan.putInId, takeout: plan.takeOutId, start: plan.start, end: plan.end, timeZone: plan.timeZone }));
      link.textContent = `${plan.name}: ${plan.reach} — ${plan.start.replace('T', ' ')} (${plan.timeZone})`;
      item.append(link); list.append(item);
    }
  } catch { status.textContent = 'Saved plans could not be read in this browser. Existing data was kept. You can still choose a route and plan a paddle.'; }
}
