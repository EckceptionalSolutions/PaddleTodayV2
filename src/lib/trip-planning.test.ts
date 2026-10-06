import { describe, expect, it } from 'vitest';
import { hydrateTripRoute, planFromRouteLink, tripRouteUrl } from './trip-planning';
import type { RiverDetailApiResult } from '@paddletoday/api-contract';
const river = { name: 'Test River', putIn: { id: 'upper', name: 'Upper' }, takeOut: { id: 'lower', name: 'Lower' }, accessPoints: [{ id: 'middle', name: 'Middle' }] } as RiverDetailApiResult['river'];
describe('route planning context', () => {
  it('preserves selected access and date while hydrating names', () => {
    const plan = planFromRouteLink(new URLSearchParams('route=test-river&putin=middle&takeout=lower&date=2026-10-10&launch=09:00&timeZone=America%2FChicago'))!;
    const result = hydrateTripRoute(plan, river);
    expect(result.route.putInId).toBe('middle');
    expect(result.route.putInName).toBe('Middle');
    expect(result.title).toBe('Test River');
    expect(result.date).toBe('2026-10-10');
    expect(result.launch).toBe('09:00');
    expect(tripRouteUrl(result.route)).toBe('/rivers/test-river/?putin=middle&takeout=lower');
  });
  it('does not replace missing saved access or a custom title', () => {
    const plan = planFromRouteLink(new URLSearchParams('route=test-river&putin=closed'))!;
    plan.title = 'With friends'; plan.route.putInName = 'Closed landing';
    const result = hydrateTripRoute(plan, river);
    expect(result.route.putInId).toBe('closed');
    expect(result.route.putInName).toBe('Closed landing');
    expect(result.title).toBe('With friends');
  });
  it('rejects invalid dates and does not attach a time without a date', () => {
    expect(planFromRouteLink(new URLSearchParams('route=../bad'))).toBeNull();
    const plan = planFromRouteLink(new URLSearchParams('route=test&date=2026-02-30&launch=09:00&timeZone=bad'))!;
    expect(plan.date).toBe(''); expect(plan.launch).toBe('');
    expect(plan.timeZone).not.toBe('bad');
  });
});
