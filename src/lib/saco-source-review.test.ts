import { describe, expect, it } from 'vitest';
import { getRiverBySlug, listAllRiversForAudit, listRiverGroups } from './rivers';
import { routeGuideReviewByRiverId } from '../data/route-guide-publication-reviews';
import { hasStandaloneRoutePage, routePageConsolidationTarget } from '../data/route-page-consolidations';
import { canonicalRiverRouteLineFromFeature } from './canonical-river-geometries.js';
import { readFileSync } from 'node:fs';

describe('Saco facility and itinerary boundaries', () => {
  it('corrects the existing Fryeburg launch identity and overnight commitment without moving it', () => {
    const route = getRiverBySlug('saco-river-route-160-brownfield')!;
    expect(route.putIn).toMatchObject({ latitude: 44.038, longitude: -70.9817 });
    expect(route.putIn!.name).toContain('Swan’s Falls');
    expect(route.takeOut).toMatchObject({ latitude: 43.9555, longitude: -70.8826 });
    expect(route.logistics!.distanceLabel).toContain('18 river miles');
    expect(route.accessPoints!.at(-1)!.mileFromStart).toBe(18);
    expect(route.logistics!.estimatedPaddleTime).toContain('two paddling days');
    expect(route.profile.difficultyNotes).toContain('Walker’s Rips');
    expect(route.gaugeSource).toMatchObject({ siteId: '01066000', kind: 'proxy' });
    expect(route.profile.confidenceNotes).toContain('downstream proxy');
  });

  it('keeps Canal Bridge as the same physical alternate start rather than a second repeated guide', () => {
    const route = getRiverBySlug('saco-river-fryeburg-brownfield')!;
    expect(route.putIn).toMatchObject({ latitude: 44.0646, longitude: -70.9479 });
    expect(route.putIn!.name).toContain('Canal Bridge');
    expect(route.logistics!.distanceLabel).toContain('15 river miles');
    expect(route.logistics!.estimatedPaddleTime).not.toContain('5–8');
    expect(hasStandaloneRoutePage(route.slug)).toBe(false);
    expect(routePageConsolidationTarget(route.slug)).toBe(`/rivers/by-river/saco-river/#trip-${route.slug}`);
  });

  it('separates tidal Front Street from the upstream freshwater municipal access and river observations', () => {
    const route = getRiverBySlug('saco-river-saco-biddeford')!;
    expect(route.putIn).toMatchObject({ latitude: 43.4948, longitude: -70.4429 });
    expect(route.putIn!.name).toContain('Front Street');
    expect(route.takeOut).toMatchObject({ latitude: 43.4743, longitude: -70.4098 });
    expect(route.takeOut!.name).toContain('Marblehead');
    expect(route.logistics!.distanceLabel).toContain('unverified catalog estimate');
    expect(route.logistics!.estimatedPaddleTime).not.toMatch(/^About 2/);
    expect(route.profile.confidenceNotes).toContain('not a tide or tidal-current prediction');
    expect(route.sourceLinks.some(s => s.url.includes('8418828'))).toBe(true);
    expect(route.scoreEligibility).toBe('planning');
    expect(route.profile.tooLow).toBeUndefined();
    expect(route.profile.idealMin).toBeUndefined();
  });

  it('preserves eight research identities while withholding the five failed itineraries with exact explanations', () => {
    expect(listAllRiversForAudit().filter(route => route.riverId === 'saco-river')).toHaveLength(8);
    const group = listRiverGroups().find(group => group.riverId === 'saco-river')!;
    expect(group.routes).toHaveLength(3);
    const review = routeGuideReviewByRiverId.get('saco-river')!;
    expect(review.retainedGuides).toHaveLength(2);
    expect(review.hubOptions).toHaveLength(1);
    expect(review.underReview).toHaveLength(5);
    for (const notice of review.underReview!) {
      expect(getRiverBySlug(notice.slug)).toBeUndefined();
      expect(routePageConsolidationTarget(notice.slug)).toBe(`/rivers/by-river/saco-river/#review-${notice.slug}`);
    }
  });

  it('rejects the disconnected Swan’s Falls legacy line while preserving the two connected planning corridors', () => {
    const slug = 'saco-river-route-160-brownfield';
    const held = JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${slug}.json`, 'utf8'));
    expect(held.geometry).toBeNull();
    expect(held.properties.geometryReviewStatus).toBe('withheld');
    expect(canonicalRiverRouteLineFromFeature({ properties: { routeId: slug }, geometry: { type: 'LineString', coordinates: [[-70.9817, 44.038], [-70.8826, 43.9555]] } }, getRiverBySlug(slug)!.accessPoints)).toBeNull();
    for (const other of ['saco-river-fryeburg-brownfield', 'saco-river-saco-biddeford']) {
      const asset = JSON.parse(readFileSync(`public/data/canonical-river-geometries/routes/${other}.json`, 'utf8'));
      expect(asset.geometry.coordinates).toHaveLength(1);
      expect(asset.properties.traceMode).toBe('network-traced');
    }
  });
});
