import { describe, expect, it } from 'vitest';
import { distanceMiles } from '@paddletoday/api-contract';
import { getRoutePreviewPhoto } from '../data/route-gallery.js';
import { listAllRiversForAudit, listRivers, WITHHELD_ROUTE_SLUGS } from './rivers.js';
import { routeAccessReviewHolds } from '../data/route-access-review-holds.js';

const routeIds = [
  'poplar-river-lutsen-seventh-bridge',
  'baptism-river-eckbeck-river-mouth',
  'beaver-river-lax-lake-highway-61',
] as const;

const grandMarais = { latitude: 47.7504, longitude: -90.3343 };

describe('Grand Marais direct-gauge expansion', () => {
  it('keeps the Poplar route private until its launch access is verified', () => {
    const slug = 'poplar-river-lutsen-seventh-bridge';
    expect(routeAccessReviewHolds[slug]).toContain('Public kayak/canoe access is not verified');
    expect(WITHHELD_ROUTE_SLUGS.has(slug)).toBe(true);
    expect(listRivers().some((route) => route.slug === slug)).toBe(false);
    for (const publishedSlug of routeIds.slice(1)) {
      expect(listRivers().some((route) => route.slug === publishedSlug)).toBe(true);
    }
  });

  it('retains three inventory whitewater routes with direct, current-station gauge sources', () => {
    const routes = new Map(listAllRiversForAudit().map((route) => [route.slug, route]));

    for (const routeId of routeIds) {
      const route = routes.get(routeId);
      expect(route).toBeDefined();
      expect(route?.state).toBe('Minnesota');
      expect(route?.routeType).toBe('whitewater');
      expect(route?.gaugeSource.kind).toBe('direct');
      expect(route?.gaugeSource.provider).toBe('mn_dnr');
      expect(route?.gaugeSource.siteId).toMatch(/^\d{8}$/);
      expect(route?.putIn).toBeDefined();
      expect(route?.takeOut).toBeDefined();
      expect(route?.logistics?.distanceLabel).toMatch(/mi/i);
    }
  });

  it('places all three routes inside the 75-mile Grand Marais filter', () => {
    const routes = new Map(listAllRiversForAudit().map((route) => [route.slug, route]));

    for (const routeId of routeIds) {
      const route = routes.get(routeId);
      expect(route).toBeDefined();
      expect(
        distanceMiles(
          grandMarais.latitude,
          grandMarais.longitude,
          route!.latitude,
          route!.longitude,
        ),
      ).toBeLessThanOrEqual(75);
    }
  });

  it('keeps Lake Superior outside each supported route', () => {
    const routes = new Map(listAllRiversForAudit().map((route) => [route.slug, route]));

    for (const routeId of routeIds) {
      const route = routes.get(routeId);
      expect(route?.name).not.toBe('Lake Superior');
      expect(route?.accessPoints?.some((point) => point.segmentKind === 'lake') ?? false).toBe(false);
    }

    expect(routes.get('poplar-river-lutsen-seventh-bridge')?.safetyProfile?.safetyNotes.join(' ')).toContain(
      'outside this supported route',
    );
    expect(routes.get('baptism-river-eckbeck-river-mouth')?.logistics?.accessCaveats.join(' ')).toContain(
      'Lake Superior is not part of this route',
    );
    expect(routes.get('beaver-river-lax-lake-highway-61')?.reach).toContain('Highway 61');
  });

  it('uses real route imagery and does not invent missing runnable bands', () => {
    const routes = new Map(listAllRiversForAudit().map((route) => [route.slug, route]));

    for (const routeId of routeIds) {
      const route = routes.get(routeId);
      expect(route).toBeDefined();
      expect(getRoutePreviewPhoto(route!).sourceKind).toBe('route');
      expect(getRoutePreviewPhoto(route!).isPlaceholder).toBe(false);
    }

    const poplar = routes.get('poplar-river-lutsen-seventh-bridge');
    const baptism = routes.get('baptism-river-eckbeck-river-mouth');
    const beaver = routes.get('beaver-river-lax-lake-highway-61');

    expect(poplar?.profile.idealMin).toBeUndefined();
    expect(poplar?.profile.tooLow).toBeUndefined();
    expect(beaver?.profile.idealMin).toBeUndefined();
    expect(beaver?.profile.tooLow).toBeUndefined();
    expect(baptism?.profile).toMatchObject({
      tooLow: 200,
      idealMin: 300,
      idealMax: 450,
      tooHigh: 500,
    });
  });
});
