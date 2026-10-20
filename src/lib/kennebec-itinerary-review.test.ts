import { describe, expect, it } from 'vitest';
import { routeInventory } from '../data/rivers';
import { routeAccessReviewHolds } from '../data/route-access-review-holds';
import { routePageConsolidationTarget } from '../data/route-page-consolidations';
import { getRiverBySlug, getRiverGroupById, listRivers, WITHHELD_ROUTE_SLUGS } from './rivers';

const unsupportedTrips = [
  'kennebec-river-solon-madison',
  'kennebec-river-madison-starks',
  'kennebec-river-starks-skowhegan',
  'kennebec-river-skowhegan-norridgewock',
  'kennebec-river-norridgewock-waterville',
  'kennebec-river-solon-norridgewock',
];

describe('Kennebec itinerary review', () => {
  it('preserves research records while excluding unsupported trips from public discovery and detail', () => {
    const publicSlugs = new Set(listRivers().map(route => route.slug));
    for (const slug of unsupportedTrips) {
      const record = routeInventory.find(route => route.slug === slug)!;
      expect(record, slug).toBeDefined();
      expect(record.putIn?.name).toBeTruthy();
      expect(record.takeOut?.name).toBeTruthy();
      expect(record.sourceLinks.length).toBeGreaterThan(0);
      expect(routeAccessReviewHolds[slug]).toContain('kennebec-itinerary-review-2026-10-20.json');
      expect(WITHHELD_ROUTE_SLUGS.has(slug), slug).toBe(true);
      expect(publicSlugs.has(slug), slug).toBe(false);
      expect(getRiverBySlug(slug), slug).toBeUndefined();
    }
  });

  it('does not redirect the held macro to a missing selectable trip', () => {
    expect(routePageConsolidationTarget('kennebec-river-solon-norridgewock')).toBeUndefined();
    expect(routePageConsolidationTarget('kennebec-river-waterville-augusta'))
      .toBe('/rivers/by-river/kennebec-river/#trip-kennebec-river-waterville-augusta');
  });

  it('preserves the nine other planning choices and both station contexts', () => {
    const group = getRiverGroupById('kennebec-river')!;
    expect(group.routes).toHaveLength(9);
    expect(new Set(group.routes.map(route => route.gaugeSource.siteId)))
      .toEqual(new Set(['01049265', '01049505']));
    expect(group.routes.every(route => route.scoreEligibility === 'planning')).toBe(true);
    for (const slug of ['kennebec-river-waterville-augusta', 'kennebec-river-sidney-augusta', 'kennebec-river-bath-phippsburg']) {
      expect(getRiverBySlug(slug), slug).toBeDefined();
    }
  });
});
