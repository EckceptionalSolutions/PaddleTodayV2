import type { RiverSummaryApiItem, RouteSegment, RouteSegmentSummary } from '@paddletoday/api-contract';
import type { RoutePlotPoint } from '../components/route-plot-map-model';
import { coverageAnchorForRoute, coverageCenter, groupRoutesByConditionScore } from './river-coverage';
import { riverGroupKeyForRoute, routeGroupMetaForRoute } from './route-groups';

export interface ExploreRiver extends RiverSummaryApiItem {
  distanceMiles: number | null;
  travelLabel: string | null;
  selectedSegment: RouteSegment | null;
  segmentSummary: RouteSegmentSummary | null;
}

export interface ExploreMapPoint extends RoutePlotPoint {
  routeSlug: string;
  routeSlugs: string[];
}

type MapCoordinate = { latitude: number; longitude: number };
type SummaryAccessPoint = NonNullable<RiverSummaryApiItem['river']['accessPoints']>[number];

export function buildExploreMapPoints(
  results: ExploreRiver[],
  routeCounts: ReadonlyMap<string, number>,
  allMatchingRoutes: ExploreRiver[] = results,
  individualRoutes = false
) {
  const routesByRiver = new Map<string, ExploreRiver[]>();
  const routesBySlug = new Map<string, ExploreRiver>();
  for (const route of allMatchingRoutes) {
    const key = riverGroupKeyForRoute(route);
    const group = routesByRiver.get(key);
    if (group) group.push(route);
    else routesByRiver.set(key, [route]);
    routesBySlug.set(route.river.slug, route);
  }
  return dedupeExploreRoutes(results).flatMap((river) => {
    const routeCount = routeGroupMetaForRoute(river, routeCounts).routeCount;
    const riverKey = riverGroupKeyForRoute(river);
    const matchingRiverRoutes = river.selectedSegment
      ? [routesBySlug.get(river.river.slug)].filter((route): route is ExploreRiver => Boolean(route))
      : routesByRiver.get(riverKey) ?? [];
    const matchingRouteCount = matchingRiverRoutes.length;

    if (individualRoutes) {
      return matchingRiverRoutes.map((route) => {
        const center = coverageAnchorForRoute(route, routeSpanCoordinatesForRiver(route));
        if (!center) return null;
        return {
          id: `route:${route.river.slug}`,
          routeSlug: route.river.slug,
          routeSlugs: [route.river.slug],
          label: route.river.name,
          latitude: center.latitude,
          longitude: center.longitude,
          score: route.score,
          rating: route.rating,
          markerAccessibilityLabel: `${route.river.reach}, score ${route.score}`,
          routeCount: 1,
          spanSegments: [routeSpanCoordinatesForRiver(route)].filter((span): span is MapCoordinate[] => Boolean(span && span.length >= 2)),
          meta: [route.river.reach, `${route.score} ${route.rating}`].filter(Boolean).join(' - '),
        };
      }).filter(Boolean) as ExploreMapPoint[];
    }

    return groupRoutesByConditionScore(matchingRiverRoutes).flatMap((group) => {
      const representative = group.representative;
      const center = coverageCenter(group.routes);
      if (!representative || !center || group.score === null) return [];
      const spanSegments = group.routes
        .map(routeSpanCoordinatesForRiver)
        .filter((span): span is MapCoordinate[] => Boolean(span && span.length >= 2));

      return [{
        id: river.selectedSegment ? `segment:${representative.river.slug}` : `score-group:${group.key}`,
        routeSlug: representative.river.slug,
        routeSlugs: group.routes.map((route) => route.river.slug),
        label: representative.river.name,
        latitude: center.latitude,
        longitude: center.longitude,
        score: group.score,
        rating: group.rating,
        markerAccessibilityLabel: `${group.regions.join(', ') || 'condition zone'}, score ${group.score}, ${group.routes.length} ${group.routes.length === 1 ? 'route' : 'routes'}`,
        routeCount,
        spanSegments,
        meta: [
          accessPointCountLabel(representative),
          `${group.routes.length} ${group.routes.length === 1 ? 'route' : 'routes'} in this zone`,
          matchingRouteCount > group.routes.length ? `${matchingRouteCount} routes on this river` : null,
          routeCount !== matchingRouteCount ? `${routeCount} total routes` : null,
          representative.travelLabel ? `${representative.travelLabel} drive` : null,
        ]
          .filter(Boolean)
          .join(' - '),
      }];
    });
  });
}

export function dedupeExploreRoutes(results: ExploreRiver[]) {
  const seen = new Set<string>();
  return results.filter((river) => {
    const key = river.selectedSegment
      ? `segment:${river.river.slug}`
      : `river:${riverGroupKeyForRoute(river)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function routeSpanCoordinatesForRiver(river: RiverSummaryApiItem): MapCoordinate[] | null {
  const selectedSegment = 'selectedSegment' in river
    ? (river as ExploreRiver).selectedSegment
    : null;
  if (selectedSegment) {
    const segmentStart = Math.min(selectedSegment.putIn.mileFromStart, selectedSegment.takeOut.mileFromStart);
    const segmentEnd = Math.max(selectedSegment.putIn.mileFromStart, selectedSegment.takeOut.mileFromStart);
    const segmentChain = [
      selectedSegment.putIn,
      ...(river.river.accessPoints ?? []).filter((point) => (
        point.mileFromStart > segmentStart && point.mileFromStart < segmentEnd
      )),
      selectedSegment.takeOut,
    ]
      .map(accessCoordinate)
      .filter(isMapCoordinate);

    if (segmentChain.length >= 2) {
      return segmentChain;
    }
  }

  const accessPoints = river.river.accessPoints
    ?.map((point) => ({ point, coordinate: accessCoordinate(point) }))
    .filter(hasMappedAccessCoordinate)
    .sort((left, right) => left.point.mileFromStart - right.point.mileFromStart);

  if (accessPoints && accessPoints.length > 0) {
    const routeChain = [
      accessCoordinate(river.river.putIn),
      ...accessPoints.map((entry) => entry.coordinate),
      accessCoordinate(river.river.takeOut),
    ].filter(isMapCoordinate);
    if (routeChain.length >= 2) {
      return routeChain;
    }
  }

  const endpoints = [accessCoordinate(river.river.putIn), accessCoordinate(river.river.takeOut)].filter(isMapCoordinate);
  if (endpoints.length >= 2) {
    return endpoints;
  }

  return null;
}

function accessPointCountLabel(river: RiverSummaryApiItem) {
  const accessPointCount = river.river.accessPoints?.filter((point) => accessCoordinate(point)).length ?? 0;
  if (accessPointCount > 2) {
    return `${accessPointCount} access points`;
  }

  return null;
}

function accessCoordinate(
  point: { latitude?: number; longitude?: number } | null | undefined
): MapCoordinate | null {
  if (!point || !Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) {
    return null;
  }

  return {
    latitude: point.latitude as number,
    longitude: point.longitude as number,
  };
}

function isMapCoordinate(coordinate: MapCoordinate | null): coordinate is MapCoordinate {
  return coordinate !== null;
}

function hasMappedAccessCoordinate(
  entry: { point: SummaryAccessPoint; coordinate: MapCoordinate | null }
): entry is { point: SummaryAccessPoint; coordinate: MapCoordinate } {
  return entry.coordinate !== null;
}
