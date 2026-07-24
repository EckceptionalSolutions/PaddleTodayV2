import { describe, expect, it } from 'vitest';
import type { RiverDetailApiResult, RiverSummaryApiItem } from '@paddletoday/api-contract';
import {
  buildRouteGroupMeta,
  corridorGroupKeyForRoute,
  matchingRiverReadiness,
  riverGroupKeyForRoute,
  routeGroupMetaForRoute,
  uniqueRoutesByRiver,
} from '../../apps/mobile/src/lib/route-groups';
import {
  activeRiverHubFilterCount,
  filterRiverHubRoutes,
  routeDistanceMiles,
} from '../../apps/mobile/src/lib/river-hub-filters';
import { difficultyOptionsForRoutes, distanceRangeForLabels } from './api-contract';

function summaryRoute(
  slug: string,
  riverId: string,
  corridorId: string
): RiverSummaryApiItem {
  return {
    river: {
      slug,
      riverId,
      corridorId,
      continuityStatus: 'verified',
    },
  } as unknown as RiverSummaryApiItem;
}

function detailRoute(
  slug: string,
  distanceLabel: string,
  difficulty: 'easy' | 'moderate' | 'hard',
  region: string
): RiverDetailApiResult {
  return {
    river: {
      slug,
      distanceLabel,
      region,
      profile: { difficulty },
    },
  } as unknown as RiverDetailApiResult;
}

describe('mobile river grouping', () => {
  it('counts one river while preserving separate corridor identities', () => {
    const routes = [
      summaryRoute('cedar-a', 'cedar-river', 'cedar-upper'),
      summaryRoute('cedar-b', 'cedar-river', 'cedar-lower'),
      summaryRoute('root-a', 'root-river', 'root-upper'),
    ];
    const counts = buildRouteGroupMeta(routes);

    expect(riverGroupKeyForRoute(routes[0])).toBe('cedar-river');
    expect(corridorGroupKeyForRoute(routes[0])).toBe('cedar-upper');
    expect(routeGroupMetaForRoute(routes[0], counts).routeCount).toBe(2);
    expect(uniqueRoutesByRiver(routes).map((route) => route.river.slug)).toEqual(['cedar-a', 'root-a']);
  });

  it('summarizes readiness without turning it into a river-wide score', () => {
    const routes = [
      { rating: 'Good' },
      { rating: 'Strong' },
      { rating: 'Fair' },
      { rating: 'No-go' },
    ] as RiverSummaryApiItem[];

    expect(matchingRiverReadiness(routes)).toEqual({
      readyCount: 2,
      matchingRouteCount: 4,
    });
  });
});

describe('mobile river hub filters', () => {
  const routes = [
    detailRoute('short-easy', '4.2 mi', 'easy', 'Cedar Valley'),
    detailRoute('medium-moderate', '7 miles', 'moderate', 'North Iowa'),
    detailRoute('long-hard', '12 mi', 'hard', 'North Iowa'),
  ];

  it('combines distance, difficulty, and area filters', () => {
    expect(filterRiverHubRoutes(routes, {
      distance: '5-10',
      difficulty: 'moderate',
      region: 'North Iowa',
    }).map((route) => route.river.slug)).toEqual(['medium-moderate']);
  });

  it('uses stable distance boundaries and reports active filters', () => {
    expect(routeDistanceMiles(routes[0])).toBe(4.2);
    expect(filterRiverHubRoutes(routes, {
      distance: '10-plus',
      difficulty: 'all',
      region: null,
    }).map((route) => route.river.slug)).toEqual(['long-hard']);
    expect(activeRiverHubFilterCount({
      distance: '10-plus',
      difficulty: 'hard',
      region: 'North Iowa',
    })).toBe(3);
  });
});

describe('river group API summaries', () => {
  it('builds the compact range and ordered difficulty summary used by mobile', () => {
    expect(distanceRangeForLabels(['14 mi', '0.3 miles', undefined, '5.6 mi'])).toEqual({
      minMiles: 0.3,
      maxMiles: 14,
      label: '0.3–14 mi',
    });
    expect(difficultyOptionsForRoutes(['hard', 'easy', 'hard', 'moderate'])).toEqual([
      'easy',
      'moderate',
      'hard',
    ]);
  });
});
