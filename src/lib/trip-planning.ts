import { newTripPlan, validTripDate, validTripTime, validTimeZone, type TripPlan, type RiverDetailApiResult } from '@paddletoday/api-contract';
import { routePageHref } from '../data/route-page-consolidations';

/** Route links carry IDs, never a second copy of route metadata. */
export function planFromRouteLink(params: URLSearchParams): TripPlan | null {
  const slug = params.get('route') || '';
  if (!/^[a-z0-9-]{1,180}$/.test(slug)) return null;
  const plan = newTripPlan({ slug, name: (params.get('name') || '').slice(0, 200) });
  plan.route.putInId = (params.get('putin') || '').slice(0, 200);
  plan.route.takeOutId = (params.get('takeout') || '').slice(0, 200);
  const date = params.get('date') || '';
  if (validTripDate(date, false)) plan.date = date;
  for (const key of ['launch', 'expected'] as const) {
    const time = params.get(key) || '';
    if (plan.date && validTripTime(time)) plan[key] = time;
  }
  const zone = params.get('timeZone');
  if (zone && validTimeZone(zone)) plan.timeZone = zone;
  return plan;
}

export function routeAccessPoints(river: RiverDetailApiResult['river']) {
  const points = [...(river.accessPoints || []), river.putIn, river.takeOut].filter(p => p != null);
  return points.filter((point, index) => points.findIndex(p => point.id ? p.id === point.id : p.name === point.name) === index);
}

/** Preserve saved selections and edits; missing IDs must be reviewed, not silently replaced. */
export function hydrateTripRoute(plan: TripPlan, river: RiverDetailApiResult['river']): TripPlan {
  const points = routeAccessPoints(river);
  const putIn = plan.route.putInId ? points.find(p => p.id === plan.route.putInId) : river.putIn;
  const takeOut = plan.route.takeOutId ? points.find(p => p.id === plan.route.takeOutId) : river.takeOut;
  return {
    ...plan,
    title: !plan.title || plan.title === 'New paddle' || plan.title === plan.route.name ? river.name : plan.title,
    route: { ...plan.route, name: river.name,
      putInId: plan.route.putInId || putIn?.id || '', takeOutId: plan.route.takeOutId || takeOut?.id || '',
      putInName: putIn?.name || plan.route.putInName, takeOutName: takeOut?.name || plan.route.takeOutName },
  };
}

export function tripRouteUrl(route: TripPlan['route']) {
  const params = new URLSearchParams();
  if (route.putInId) params.set('putin', route.putInId);
  if (route.takeOutId) params.set('takeout', route.takeOutId);
  return routePageHref(route.slug, params);
}
