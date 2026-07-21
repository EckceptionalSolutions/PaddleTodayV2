import { describe, expect, it } from 'vitest';
import {
  buildRoutePlannerParams,
  buildRouteSegments,
  formatRouteSegmentLabel,
  routeMatchesPaddleFilters,
  routeSegmentSummary,
  selectRouteSegment,
} from '@paddletoday/api-contract';

const riceCreek = {
  distanceLabel: '15.2 mi',
  estimatedPaddleTime: 'About 5 hr to 7 hr',
  putIn: { id: 'peltier-lake', name: 'Peltier Lake boat launch', latitude: 45.2, longitude: -93.1 },
  takeOut: { id: 'long-lake', name: 'Long Lake Regional Park', latitude: 45.1, longitude: -93.2 },
  accessPoints: [
    { id: 'peltier-lake', name: 'Peltier Lake boat launch', latitude: 45.2, longitude: -93.1, mileFromStart: 0, segmentKind: 'lake' as const },
    { id: 'baldwin-lake', name: 'Baldwin Lake carry-in', latitude: 45.18, longitude: -93.13, mileFromStart: 4.2, segmentKind: 'lake' as const },
    { id: 'county-road-i', name: 'County Road I access', latitude: 45.12, longitude: -93.18, mileFromStart: 9.5, segmentKind: 'creek' as const },
    { id: 'long-lake', name: 'Long Lake Regional Park', latitude: 45.1, longitude: -93.2, mileFromStart: 15.2, segmentKind: 'creek' as const },
  ],
};

describe('shared route planning', () => {
  it('plans from mobile access points that only carry river-mile ordering', () => {
    const mobileRiver = {
      distanceLabel: '12 mi',
      putIn: { id: 'upper', name: 'Upper launch', latitude: 45.2, longitude: -93.1 },
      takeOut: { id: 'lower', name: 'Lower launch', latitude: 45.1, longitude: -93.2 },
      accessPoints: [
        { id: 'upper', name: 'Upper launch', mileFromStart: 0, segmentKind: 'creek' as const },
        { id: 'middle', name: 'Middle launch', mileFromStart: 4, segmentKind: 'creek' as const },
        { id: 'lower', name: 'Lower launch', mileFromStart: 12, segmentKind: 'creek' as const },
      ],
    };

    const selected = selectRouteSegment(mobileRiver, { paddleLength: 'under-5' });

    expect(selected?.putIn.id).toBe('upper');
    expect(selected?.takeOut.id).toBe('middle');
    expect(selected?.distanceMiles).toBe(4);
  });

  it('selects a shorter segment for a length filter', () => {
    const selected = selectRouteSegment({ river: riceCreek }, { paddleLength: '5-to-10' });

    expect(selected?.putIn.id).toBe('baldwin-lake');
    expect(selected?.takeOut.id).toBe('county-road-i');
    expect(selected?.distanceMiles).toBe(5.3);
    expect(buildRoutePlannerParams(selected)).toEqual({ putin: 'baldwin-lake', takeout: 'county-road-i' });
  });

  it('keeps the route eligible when a matching shorter segment exists', () => {
    expect(routeMatchesPaddleFilters({ river: riceCreek }, { paddleLength: '5-to-10' })).toBe(true);
  });

  it('labels the available family and selected plan', () => {
    const summary = routeSegmentSummary(riceCreek);
    const selected = selectRouteSegment(riceCreek, { paddleLength: '5-to-10' });

    expect(summary).not.toBeNull();
    expect(formatRouteSegmentLabel(summary, null)).toContain('Shorter options');
    expect(formatRouteSegmentLabel(summary, selected)).toBe('Selected plan · 5.3 mi');
    expect(buildRouteSegments(riceCreek)).toHaveLength(5);
  });
});
