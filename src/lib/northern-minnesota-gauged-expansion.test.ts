import { describe, expect, it } from 'vitest';
import { getRoutePreviewPhoto } from '../data/route-gallery.js';
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

const whitewaterRouteIds = new Set([
  'red-lake-river-huot-highway-75-bypass',
  'red-lake-river-crookston-fisher',
  'vermilion-river-dam-county-road-24',
]);

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

  it('does not use generic placeholder imagery for any expansion route', () => {
    const routes = new Map(listRivers().map((route) => [route.slug, route]));

    for (const routeId of routeIds) {
      const route = routes.get(routeId);
      expect(route).toBeDefined();
      expect(getRoutePreviewPhoto(route!).sourceKind).not.toBe('placeholder');
    }
  });

  it('reserves the whitewater filter for whitewater-focused expansion routes', () => {
    const routes = new Map(listRivers().map((route) => [route.slug, route]));

    for (const routeId of routeIds) {
      expect(routes.get(routeId)?.routeType).toBe(
        whitewaterRouteIds.has(routeId) ? 'whitewater' : 'recreational',
      );
    }
  });

  it('uses the combined-route take-outs in safety guidance', () => {
    const routes = new Map(listRivers().map((route) => [route.slug, route]));
    const countyRoad95ToZim = routes.get('st-louis-river-county-road-95-zim');
    const vermilionToCountyRoad24 = routes.get('vermilion-river-dam-county-road-24');

    expect(countyRoad95ToZim?.safetyProfile?.safetyNotes.join(' ')).toContain('continue from Forbes Access toward Zim');
    expect(countyRoad95ToZim?.safetyProfile?.safetyNotes.join(' ')).not.toContain('Take out at Forbes');
    expect(vermilionToCountyRoad24?.safetyProfile?.safetyNotes.join(' ')).toContain('County Road 24 is the planned take-out');
    expect(vermilionToCountyRoad24?.safetyProfile?.safetyNotes.join(' ')).not.toContain('Take out at Twomile Creek');
  });
});
