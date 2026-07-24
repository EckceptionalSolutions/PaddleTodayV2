import type { RiverSummaryApiItem } from '@paddletoday/api-contract';

export interface RiverRouteGroupMeta {
  routeCount: number;
}

export function matchingRiverReadiness(routes: RiverSummaryApiItem[]) {
  return {
    readyCount: routes.filter((route) => route.rating === 'Strong' || route.rating === 'Good').length,
    matchingRouteCount: routes.length,
  };
}

export function buildRouteGroupMeta(rivers: RiverSummaryApiItem[]) {
  const counts = new Map<string, number>();

  rivers.forEach((item) => {
    const key = riverGroupKeyForRoute(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  return counts;
}

export function routeGroupMetaForRoute(
  route: RiverSummaryApiItem,
  routeCounts: ReadonlyMap<string, number>
): RiverRouteGroupMeta {
  const key = riverGroupKeyForRoute(route);
  const routeCount = routeCounts.get(key) ?? 1;
  const riverId = route.river.riverId;

  return { routeCount: riverId ? routeCount : 1 };
}

export function uniqueRoutesByRiver<Item extends RiverSummaryApiItem>(routes: Item[]): Item[] {
  const seen = new Set<string>();

  return routes.filter((route) => {
    const key = riverGroupKeyForRoute(route);
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function uniqueRoutesByCorridor<Item extends RiverSummaryApiItem>(routes: Item[]): Item[] {
  const seen = new Set<string>();

  return routes.filter((route) => {
    const key = corridorGroupKeyForRoute(route);
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function riverGroupKeyForRoute(route: RiverSummaryApiItem) {
  return route.river.riverId || route.river.slug;
}

export function corridorGroupKeyForRoute(route: RiverSummaryApiItem) {
  return route.river.continuityStatus === 'condition-family'
    ? route.river.conditionZoneId || route.river.slug
    : route.river.corridorId || route.river.conditionZoneId || route.river.riverId || route.river.slug;
}
