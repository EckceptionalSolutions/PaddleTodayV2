import { describe, expect, it } from 'vitest';
import {
  buildRoutePlannerHref,
  buildRouteSegments,
  formatRouteSegmentLabel,
  routeMatchesPaddleFilters,
  routeSegmentSummary,
  selectRouteSegment,
} from './route-segments';

const riceCreek = {
  slug: 'rice-creek-peltier-to-long-lake',
  putIn: { id: 'peltier-lake', name: 'Peltier Lake', latitude: 45.175, longitude: -93.07 },
  takeOut: { id: 'long-lake', name: 'Long Lake', latitude: 45.08, longitude: -93.19 },
  logistics: { distanceLabel: '15.2 mi', estimatedPaddleTime: '5–7 hours' },
  accessPoints: [
    { id: 'peltier-lake', name: 'Peltier Lake', latitude: 45.175, longitude: -93.07, mileFromStart: 0, segmentKind: 'lake' as const },
    { id: 'baldwin-lake', name: 'Baldwin Lake', latitude: 45.138, longitude: -93.136, mileFromStart: 5.7, segmentKind: 'transition' as const },
    { id: 'county-road-i', name: 'County Road I', latitude: 45.108, longitude: -93.184, mileFromStart: 11, segmentKind: 'creek' as const },
    { id: 'long-lake', name: 'Long Lake', latitude: 45.08, longitude: -93.19, mileFromStart: 15.2, segmentKind: 'creek' as const },
  ],
} as any;

describe('route segment discovery', () => {
  it('builds shorter pairs from the ordered access chain', () => {
    const segments = buildRouteSegments(riceCreek);
    expect(segments.some((segment) => segment.putIn.id === 'baldwin-lake' && segment.takeOut.id === 'county-road-i')).toBe(true);
    expect(routeSegmentSummary(riceCreek)).toMatchObject({
      shortestDistanceMiles: 4.2,
      fullDistanceMiles: 15.2,
    });
  });

  it('matches a short length filter and creates a planner deep link', () => {
    expect(routeMatchesPaddleFilters({ river: riceCreek }, { paddleLength: '5-to-10' })).toBe(true);
    const segment = selectRouteSegment({ river: riceCreek }, { paddleLength: '5-to-10' });
    expect(segment?.distanceMiles).toBe(5.3);
    expect(buildRoutePlannerHref(riceCreek.slug, segment)).toBe(
      '/rivers/rice-creek-peltier-to-long-lake/?putin=baldwin-lake&takeout=county-road-i',
    );
  });

  it('does not replace a full route that already fits the filter', () => {
    expect(selectRouteSegment({ river: riceCreek }, { paddleTime: '5-to-7' })).toBeNull();
  });

  it('labels both the route family and selected segment', () => {
    const summary = routeSegmentSummary(riceCreek);
    expect(formatRouteSegmentLabel(summary, null)).toBe('Shorter options: 4.2–11.0 mi');
    expect(formatRouteSegmentLabel(summary, selectRouteSegment({ river: riceCreek }, { paddleLength: '5-to-10' }))).toBe('Selected segment: 5.3 mi');
  });
});
