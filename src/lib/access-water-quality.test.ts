import { describe, expect, it } from 'vitest';
import { assessWaterProximity, buildAccessReviewQueue, pointInWaterPolygon, validateHydrographyResponse } from '../../scripts/lib/access-water-quality';

describe('access water quality', () => {
  const distances = (matched: number | null, waterway: number | null, polygon: number | null) => ({
    distanceFeetToMatchedRiver: matched, distanceFeetToNearestWaterway: waterway,
    distanceFeetToNearestWaterbody: polygon,
  });
  it('uses a wide river polygon instead of reporting its distant centerline as dry land', () => {
    expect(assessWaterProximity(distances(2400, 2400, 0), true)).toEqual({
      waterProximity: 'within-100ft', distanceFeetToMappedWater: 0,
    });
  });
  it('keeps route identity separate from proximity to another mapped waterway', () => {
    expect(assessWaterProximity(distances(9000, 40, 2000), true).waterProximity).toBe('within-100ft');
  });
  it.each([[100, 'within-100ft'], [100.1, 'within-300ft'], [300, 'within-300ft'],
    [300.1, 'over-300ft'], [800, 'over-300ft'], [800.1, 'over-800ft']])('classifies the %s ft boundary', (distance, expected) => {
    expect(assessWaterProximity(distances(Number(distance), null, null), true).waterProximity).toBe(expected);
  });
  it('does not infer dry land from unavailable, invalid, or incomplete evidence', () => {
    expect(assessWaterProximity(distances(null, NaN, Infinity), true).waterProximity).toBe('unknown');
    expect(assessWaterProximity(distances(9000, 9000, null), false).waterProximity).toBe('unknown');
    expect(assessWaterProximity(distances(25, null, null), false).waterProximity).toBe('within-100ft');
  });
  it('preserves islands and multipart polygons regardless of ring winding', () => {
    const outer = [[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]];
    const island = [[3, 3], [7, 3], [7, 7], [3, 7], [3, 3]];
    const separate = [[20, 20], [30, 20], [30, 30], [20, 30], [20, 20]];
    expect(pointInWaterPolygon({ latitude: 5, longitude: 5 }, [outer, island])).toBe(false);
    expect(pointInWaterPolygon({ latitude: 2, longitude: 2 }, [outer, island])).toBe(true);
    expect(pointInWaterPolygon({ latitude: 25, longitude: 25 }, [outer, island, separate])).toBe(true);
    expect(pointInWaterPolygon({ latitude: 5, longitude: 5 }, [outer, [...island].reverse()])).toBe(false);
    expect(pointInWaterPolygon({ latitude: 15, longitude: 15 }, [outer, island, separate])).toBe(false);
  });
  it('rejects poisoned caches and partial ArcGIS results, while accepting a complete empty result', () => {
    for (const value of [null, {}, { error: {} }, { error: { message: 'busy' } },
      { features: [], exceededTransferLimit: true }]) {
      expect(() => validateHydrographyResponse(value)).toThrow();
    }
    expect(() => validateHydrographyResponse({ features: [] })).not.toThrow();
  });

  const endpoint = (overrides = {}) => ({ ...distances(2500, 2500, 1800),
    routeId: 'route-a', state: 'Iowa', endpoint: 'putIn', endpointName: 'County Park',
    latitude: 41, longitude: -93, severity: 'review', waterProximity: 'over-800ft' as const,
    distanceFeetToMappedWater: 1800, coordinateEvidenceRole: 'authoritative-access-anchor', ...overrides });
  it('keeps far-away official parking anchors in the queue with a distinct offset reason', () => {
    const queue = buildAccessReviewQueue([endpoint(), endpoint({ routeId: 'route-b', endpoint: 'takeOut' }),
      endpoint({ routeId: 'route-c', waterProximity: 'unknown' })]);
    expect(queue).toHaveLength(1);
    expect(queue[0].occurrences).toHaveLength(3);
    expect(queue[0].reasons).toEqual(['documented-access-anchor-offset']);
  });
  it('keeps unverified coordinates classified as mapped-water offsets', () => {
    const queue = buildAccessReviewQueue([endpoint({ coordinateEvidenceRole: null })]);
    expect(queue[0].reasons).toEqual(['mapped-water-offset']);
  });
  it('does not combine distant sites that share a name or ignore closer evidence from another query', () => {
    expect(buildAccessReviewQueue([endpoint(), endpoint({ latitude: 42 })])).toHaveLength(2);
    expect(buildAccessReviewQueue([endpoint(), endpoint({ routeId: 'route-b',
      waterProximity: 'within-100ft', distanceFeetToMappedWater: 20 })])).toHaveLength(0);
  });
  it('retains area centroids as an independent access-identity problem even near water', () => {
    const queue = buildAccessReviewQueue([endpoint({ coordinateEvidenceRole: 'authoritative-area-anchor',
      waterProximity: 'within-100ft', distanceFeetToMappedWater: 0 })]);
    expect(queue[0].reasons).toEqual(['area-anchor-not-launch']);
  });
});
