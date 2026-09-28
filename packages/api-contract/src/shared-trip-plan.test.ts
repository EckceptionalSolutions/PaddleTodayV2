import { describe, expect, it } from 'vitest';
import { decodeSharedTripPlan, encodeSharedTripPlan, isSharedTripPlan } from './shared-trip-plan';

const plan = {
  routeSlug: 'rice-creek',
  routeName: 'Rice Creek',
  putInId: 'peltier-lake',
  putInName: 'Peltier Lake',
  takeOutId: 'long-lake',
  takeOutName: 'Long Lake',
  launchLocal: '2026-09-26 08:30',
  timeZone: 'America/Chicago',
};

describe('shared trip plans', () => {
  it('round-trips the selected route, access points, and local launch time in the URL fragment', () => {
    const url = new URL(encodeSharedTripPlan(plan, 'https://paddletoday.com/'));
    expect(url.pathname).toBe('/share/trip/');
    expect(url.search).toBe('');
    const shared = decodeSharedTripPlan(new URLSearchParams(url.hash.slice(1)).get('plan'));
    expect(shared).toEqual({ version: 1, ...plan });
  });

  it('rejects malformed routes and dates', () => {
    expect(isSharedTripPlan({ version: 1, ...plan, routeSlug: '../account' })).toBe(false);
    expect(isSharedTripPlan({ version: 1, ...plan, launchLocal: '2026-02-30 08:30' })).toBe(false);
    expect(decodeSharedTripPlan('{broken')).toBeNull();
  });

  it('rejects data with extra private fields', () => {
    expect(isSharedTripPlan({ version: 1, ...plan, note: 'private note' })).toBe(false);
  });

  it('rejects oversized or empty payloads', () => {
    expect(decodeSharedTripPlan(null)).toBeNull();
    expect(decodeSharedTripPlan('x'.repeat(4097))).toBeNull();
  });
});
