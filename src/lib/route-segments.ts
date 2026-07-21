import {
  buildRouteSegments as buildSharedRouteSegments,
  fullRouteDistanceMiles as fullSharedRouteDistanceMiles,
  paddleTimeBucketForRoute as sharedPaddleTimeBucketForRoute,
  routeAccessPoints as sharedRouteAccessPoints,
  routeMatchesPaddleFilters as sharedRouteMatchesPaddleFilters,
  routeSegmentSummary as sharedRouteSegmentSummary,
  selectRouteSegment as selectSharedRouteSegment,
  type PaddleLengthFilter,
  type PaddleTimeFilter,
  type RoutePlanningRiver,
  type RouteSegment,
  type RouteSegmentSummary,
  type SegmentFilterSelection,
} from '@paddletoday/api-contract';
import type { River, RiverRouteAccessPoint, RiverScoreResult } from './types';

export type {
  PaddleLengthFilter,
  PaddleTimeFilter,
  RouteSegment,
  RouteSegmentSummary,
  SegmentFilterSelection,
};

function planningRiver(river: River): RoutePlanningRiver {
  return {
    putIn: river.putIn,
    takeOut: river.takeOut,
    accessPoints: river.accessPoints,
    logistics: river.logistics,
  };
}

export function routeAccessPoints(river: River): RiverRouteAccessPoint[] {
  return sharedRouteAccessPoints(planningRiver(river)) as RiverRouteAccessPoint[];
}

export function fullRouteDistanceMiles(river: River): number | null {
  return fullSharedRouteDistanceMiles(planningRiver(river));
}

export function buildRouteSegments(river: River): RouteSegment[] {
  return buildSharedRouteSegments(planningRiver(river));
}

export function routeSegmentSummary(river: River): RouteSegmentSummary | null {
  return sharedRouteSegmentSummary(planningRiver(river));
}

export function paddleTimeBucketForRoute(river: River): PaddleTimeFilter {
  return sharedPaddleTimeBucketForRoute(planningRiver(river));
}

export function selectRouteSegment(
  result: Pick<RiverScoreResult, 'river'> | { river: River },
  filters: SegmentFilterSelection,
): RouteSegment | null {
  return selectSharedRouteSegment({ river: planningRiver(result.river) }, filters);
}

export function routeMatchesPaddleFilters(
  result: Pick<RiverScoreResult, 'river'> | { river: River },
  filters: SegmentFilterSelection,
) {
  return sharedRouteMatchesPaddleFilters({ river: planningRiver(result.river) }, filters);
}

export function formatRouteSegmentLabel(summary: RouteSegmentSummary | null, selectedSegment: RouteSegment | null) {
  if (selectedSegment) {
    return `Selected segment: ${selectedSegment.distanceMiles.toFixed(1)} mi`;
  }

  if (!summary) return '';
  return `Shorter options: ${summary.shortestDistanceMiles.toFixed(1)}–${summary.longestDistanceMiles.toFixed(1)} mi`;
}

export function buildRoutePlannerHref(slug: string, selectedSegment: RouteSegment | null) {
  const href = `/rivers/${encodeURIComponent(slug)}/`;
  if (!selectedSegment) return href;

  const params = new URLSearchParams({
    putin: selectedSegment.putIn.id,
    takeout: selectedSegment.takeOut.id,
  });
  return `${href}?${params.toString()}`;
}
