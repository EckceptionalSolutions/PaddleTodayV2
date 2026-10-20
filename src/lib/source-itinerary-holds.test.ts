import { describe, expect, it } from 'vitest';
import { routeInventory } from '../data/rivers';
import { routeAccessReviewHolds } from '../data/route-access-review-holds';
import { getRiverBySlug, listAllRiversForAudit, listRivers, listScoredRivers, WITHHELD_ROUTE_SLUGS } from './rivers';

describe('source-contradicted itinerary holds', () => {
  for (const slug of ['fox-river-sunset-kimberly-lutz-appleton', 'kent-island-chesapeake-bay-trail']) {
    it(`keeps ${slug} out of public routes and scores while preserving its research record`, () => {
      expect(routeInventory.find(route => route.slug === slug)?.sourceLinks.length).toBeGreaterThan(0);
      expect(routeAccessReviewHolds[slug]).toContain('source-itinerary-holds-2026-10-20.json');
      expect(WITHHELD_ROUTE_SLUGS.has(slug)).toBe(true);
      expect(getRiverBySlug(slug)).toBeUndefined();
      expect(listRivers().some(route => route.slug === slug)).toBe(false);
      expect(listScoredRivers().some(route => route.slug === slug)).toBe(false);
    });
  }

  it('preserves both endpoint pairs and the upper-only Fox profile for explicit correction', () => {
    const fox = listAllRiversForAudit().find(route => route.slug === 'fox-river-sunset-kimberly-lutz-appleton')!;
    expect(fox.putIn?.name).toContain('Sunset');
    expect(fox.takeOut?.name).toContain('Lutz');
    expect(fox.profile.idealMin).toBe(0);
    expect(fox.profile.tooHigh).toBe(6000);
    const kent = listAllRiversForAudit().find(route => route.slug === 'kent-island-chesapeake-bay-trail')!;
    expect(kent.takeOut?.latitude).toBe(38.87115);
    expect(kent.takeOut?.longitude).toBe(-76.3555);
  });
});
