import type { RiverSummaryApiItem } from '@paddletoday/api-contract';

export interface RiverRouteGroupMeta {
  routeCount: number;
}

export function buildRouteGroupMeta(rivers: RiverSummaryApiItem[]) {
  const counts = new Map<string, number>();

  rivers.forEach((item) => {
    const key = groupKeyForRoute(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  return counts;
}

export function routeGroupMetaForRoute(
  route: RiverSummaryApiItem,
  routeCounts: ReadonlyMap<string, number>
): RiverRouteGroupMeta {
  const key = groupKeyForRoute(route);
  const routeCount = routeCounts.get(key) ?? 1;
  const riverId = route.river.riverId;

  return { routeCount: riverId ? routeCount : 1 };
}

export function uniqueRoutesByRiver<Item extends RiverSummaryApiItem>(routes: Item[]): Item[] {
  const seen = new Set<string>();

  return routes.filter((route) => {
    const key = groupKeyForRoute(route);
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function groupKeyForRoute(route: RiverSummaryApiItem) {
  return route.river.riverId || route.river.slug;
}
