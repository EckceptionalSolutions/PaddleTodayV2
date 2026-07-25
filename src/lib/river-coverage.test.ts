import { describe, expect, it } from 'vitest';
import {
  conditionScoreKey,
  coverageAnchorForRoutes,
  coverageCenterForRoutes,
  groupRoutesByConditionScore,
} from './river-coverage.js';

const route = (slug: string, score: number, conditionZoneId: string, longitude: number) => ({
  score,
  rating: score >= 70 ? 'Good' : 'Fair',
  confidence: { label: 'High' },
  river: {
    slug,
    riverId: 'mississippi-river',
    conditionZoneId,
    region: conditionZoneId,
    putIn: { longitude, latitude: 45 },
    takeOut: { longitude: longitude + 1, latitude: 45 },
  },
});

describe('river coverage helpers', () => {
  it('keeps distinct scores within a shared condition zone visible', () => {
    const routes = [
      route('one', 74, 'twin-cities', -94),
      route('two', 74, 'twin-cities', -93),
      route('three', 63, 'twin-cities', -92),
    ];

    expect(groupRoutesByConditionScore(routes)).toHaveLength(2);
    expect(groupRoutesByConditionScore(routes)[0].routes).toHaveLength(2);
    expect(conditionScoreKey(routes[0])).toBe('twin-cities:74');
  });

  it('centers coverage across route spans rather than on one representative route', () => {
    expect(coverageCenterForRoutes([
      route('one', 41, 'headwaters', -96),
      route('two', 74, 'twin-cities', -92),
    ])).toEqual({ longitude: -93.5, latitude: 45 });
  });

  it('snaps a score-zone anchor back onto the mapped river line', () => {
    const routes = [route('curved', 74, 'curve', -94)];
    const anchor = coverageAnchorForRoutes(routes, new Map([
      ['curved', {
        geometry: {
          type: 'LineString',
          coordinates: [[-94.5, 44.5], [-94, 45.5], [-93.5, 44.5]],
        },
      }],
    ]));

    expect(anchor.latitude).toBeGreaterThan(44.5);
    expect(anchor.latitude).toBeLessThan(45.5);
    expect(anchor.longitude).toBeGreaterThan(-94.5);
    expect(anchor.longitude).toBeLessThan(-93.5);
  });
});
