import type { RiverDetailApiResult, RiverSummaryApiItem, ScoreRating } from '@paddletoday/api-contract';

export type RiverCoverageResult = RiverSummaryApiItem | RiverDetailApiResult;

export interface RiverConditionScoreGroup<Result extends RiverCoverageResult = RiverCoverageResult> {
  key: string;
  score: number;
  rating: ScoreRating;
  routes: Result[];
  representative: Result;
  regions: string[];
}

export function riverCoverageKey(result: RiverCoverageResult) {
  return result.river.riverId || result.river.name || result.river.slug;
}

export function conditionScoreKey(result: RiverCoverageResult) {
  const zone = result.river.conditionZoneId
    || result.river.corridorId
    || result.river.riverId
    || result.river.slug;
  return `${zone}:${result.score}`;
}

export function groupRoutesByConditionScore<Result extends RiverCoverageResult>(
  routes: Result[]
): RiverConditionScoreGroup<Result>[] {
  const groups = new Map<string, Result[]>();

  for (const route of routes) {
    const key = conditionScoreKey(route);
    groups.set(key, [...(groups.get(key) ?? []), route]);
  }

  return [...groups.entries()].map(([key, groupRoutes]) => {
    const representative = [...groupRoutes].sort((left, right) => (
      right.score - left.score || left.river.reach.localeCompare(right.river.reach)
    ))[0];
    return {
      key,
      score: representative.score,
      rating: representative.rating,
      routes: groupRoutes,
      representative,
      regions: [...new Set(groupRoutes.map((route) => route.river.region).filter(Boolean))],
    };
  });
}

export function coverageCenter(routes: RiverCoverageResult[]) {
  const routeCenters = routes
    .map((route) => {
      const points = [
        route.river.putIn,
        ...(route.river.accessPoints ?? []),
        route.river.takeOut,
      ].flatMap((point) => (
        isCoordinate(point)
          ? [{ latitude: point.latitude, longitude: point.longitude }]
          : []
      ));

      if (points.length === 0) {
        return isCoordinate(route.river)
          ? { latitude: route.river.latitude, longitude: route.river.longitude }
          : null;
      }

      return {
        latitude: points.reduce((sum, point) => sum + point.latitude, 0) / points.length,
        longitude: points.reduce((sum, point) => sum + point.longitude, 0) / points.length,
      };
    })
    .filter((point): point is { latitude: number; longitude: number } => point !== null);

  if (routeCenters.length === 0) return null;
  return {
    latitude: routeCenters.reduce((sum, point) => sum + point.latitude, 0) / routeCenters.length,
    longitude: routeCenters.reduce((sum, point) => sum + point.longitude, 0) / routeCenters.length,
  };
}

export function coverageAnchorForRoute(route: RiverCoverageResult, span: Array<{ latitude: number; longitude: number }> | null) {
  const center = coverageCenter([route]);
  if (!center || !span || span.length < 2) return center;
  let best = span[0];
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let index = 1; index < span.length; index += 1) {
    const start = span[index - 1];
    const end = span[index];
    const dx = end.longitude - start.longitude;
    const dy = end.latitude - start.latitude;
    const lengthSquared = dx * dx + dy * dy;
    const rawT = lengthSquared === 0
      ? 0
      : ((center.longitude - start.longitude) * dx + (center.latitude - start.latitude) * dy) / lengthSquared;
    const t = Math.max(0, Math.min(1, rawT));
    const candidate = {
      longitude: start.longitude + (end.longitude - start.longitude) * t,
      latitude: start.latitude + (end.latitude - start.latitude) * t,
    };
    const distance = (candidate.longitude - center.longitude) ** 2 + (candidate.latitude - center.latitude) ** 2;
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return best;
}

function isCoordinate(
  value: { latitude?: number; longitude?: number } | null | undefined
): value is { latitude: number; longitude: number } {
  return Boolean(value && Number.isFinite(value.latitude) && Number.isFinite(value.longitude));
}
