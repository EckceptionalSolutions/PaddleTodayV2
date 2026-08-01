import { describe, expect, it } from 'vitest';
import { listRivers } from './rivers.js';

const routeIds = [
  'big-fork-river-highway-6-south-johnson',
  'big-fork-river-highway-6-north-big-falls-east',
  'red-lake-river-huot-highway-75-bypass',
  'red-lake-river-crookston-fisher',
  'st-louis-river-county-road-95-zim',
  'st-louis-river-forbes-toivola',
  'st-louis-river-toivola-floodwood',
  'crow-wing-river-huntersville-stigmans-mound',
  'mississippi-river-steamboat-county-road-72',
  'vermilion-river-dam-county-road-24',
] as const;

describe('Northern Minnesota direct-gauge expansion', () => {
  it('publishes exactly ten new routes across multiple river systems', () => {
    const routes = new Map(listRivers().map((route) => [route.slug, route]));
    const expansion = routeIds.map((routeId) => routes.get(routeId));

    expect(expansion.every(Boolean)).toBe(true);
    expect(new Set(expansion.map((route) => route?.name)).size).toBeGreaterThanOrEqual(6);

    for (const route of expansion) {
      expect(route?.state).toBe('Minnesota');
      expect(route?.gaugeSource.kind).toBe('direct');
      expect(route?.gaugeSource.siteId).toBeTruthy();
      expect(route?.putIn).toBeDefined();
      expect(route?.takeOut).toBeDefined();
      expect(route?.logistics?.distanceLabel).toMatch(/mi/i);
      expect(route?.profile.thresholdSource.url).toBeTruthy();
    }
  });
});
