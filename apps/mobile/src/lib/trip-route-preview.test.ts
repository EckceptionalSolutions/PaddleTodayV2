import { describe, expect, it } from 'vitest';
import type { RiverGeometryResponse, TripRoute } from '@paddletoday/api-contract';
import { tripDurationLabel, tripRoutePreview } from './trip-route-preview';
const points = [
  { id: 'start', name: 'Launch', latitude: 45, longitude: -90, mileFromStart: 0, segmentKind: 'creek' as const },
  { id: 'middle', name: 'Bridge', latitude: 45.05, longitude: -89.95, mileFromStart: 4, segmentKind: 'creek' as const },
  { id: 'end', name: 'Landing', latitude: 45.1, longitude: -89.9, mileFromStart: 10, segmentKind: 'creek' as const },
];
const river = { slug: 'river', name: 'River', distanceLabel: '10 mi', estimatedPaddleTime: '4 to 6 hr', putIn: points[0], takeOut: points[2], accessPoints: points };
const detail = (extra: Partial<typeof river> = {}) => ({ river: { ...river, ...extra } });
const route: TripRoute = { slug: 'river', name: 'River', putInId: 'start', putInName: 'Launch', takeOutId: 'middle', takeOutName: 'Bridge' };
const geometry: RiverGeometryResponse = { requestId: 'map', routeId: 'river', state: null, source: 'test', geometry: { type: 'LineString', coordinates: points.map(p => [p.longitude, p.latitude]) } };
describe('saved trip route preview', () => {
  it('uses the selected section’s distance, time, and clipped geometry', () => {
    const result = tripRoutePreview(route, detail(), geometry)!;
    expect(result.distanceMiles).toBe(4);
    expect(result.estimatedMinutes).toEqual({ min: 96, max: 144 });
    expect(result.points.map(p => p.name)).toEqual(['Launch', 'Bridge']);
    expect(result.lines[0]?.at(-1)).toEqual({ latitude: 45.05, longitude: -89.95 });
  });
  it('does not replace a removed selected endpoint with the route default', () => {
    const result = tripRoutePreview({ ...route, takeOutId: 'removed' }, detail(), geometry)!;
    expect(result.points).toHaveLength(1);
    expect(result.distanceMiles).toBeNull();
    expect(result.lines).toEqual([]);
  });
  it('resolves manually named access only when its name is unique', () => {
    expect(tripRoutePreview({ ...route, takeOutId: '' }, detail())?.distanceMiles).toBe(4);
    expect(tripRoutePreview({ ...route, takeOutId: '' }, detail({ accessPoints: [...points, { ...points[1]!, id: 'duplicate' }] }))?.distanceMiles).toBeNull();
  });
  it('withholds measurements and geometry across an unverified link', () => {
    const restricted = { river: { ...river, segmentEdges: [{ fromId: 'start', toId: 'middle', status: 'unknown' as const }] } };
    const result = tripRoutePreview(route, restricted, geometry)!;
    expect(result.points).toHaveLength(2);
    expect(result.distanceMiles).toBeNull();
    expect(result.lines).toEqual([]);
  });
  it('never interprets kilometers or a distance range as miles', () => {
    const full = { ...route, takeOutId: 'end', takeOutName: 'Landing' };
    for (const distanceLabel of ['10 km', '8–10 mi']) {
      const result = tripRoutePreview(full, detail({ accessPoints: [], distanceLabel }))!;
      expect(result.distanceMiles).toBeNull(); expect(result.estimatedMinutes).toBeNull();
    }
  });
  it('withholds distance for reversed endpoints and rejects mismatched catalog data', () => {
    expect(tripRoutePreview({ ...route, putInId: 'end', takeOutId: 'start' }, detail())?.distanceMiles).toBeNull();
    expect(tripRoutePreview({ ...route, slug: '' }, detail())).toBeNull();
    expect(tripRoutePreview({ ...route, slug: 'other' }, detail())).toBeNull();
    expect(tripRoutePreview(route, detail(), { ...geometry, routeId: 'other' })?.lines).toEqual([]);
  });
  it('formats estimates as a range and preserves equal endpoints', () => {
    expect(tripDurationLabel({ min: 90, max: 180 })).toBe('1 hr 30 min–3 hr');
    expect(tripDurationLabel({ min: 45, max: 45 })).toBe('45 min');
  });
});
