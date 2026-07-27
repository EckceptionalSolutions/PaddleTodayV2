import { coverageCenter, nearestPointOnLines } from '@paddletoday/geo';

function riverForResult(result) {
  return result?.river ?? result ?? {};
}

function finiteCoordinate(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

export function routesForRiverItem(item, { includeAll = false } = {}) {
  const preferred = includeAll ? item?.allRiverRoutes : item?.matchingRoutes;
  if (Array.isArray(preferred) && preferred.length > 0) {
    return preferred;
  }

  if (Array.isArray(item?.matchingRoutes) && item.matchingRoutes.length > 0) {
    return item.matchingRoutes;
  }

  return item?.cardRoute ? [item.cardRoute] : [];
}

export function conditionScoreKey(result) {
  const river = riverForResult(result);
  const zone = river.conditionZoneId
    || river.gaugeSource?.id
    || river.corridorId
    || river.riverId
    || river.slug
    || 'route';
  const score = Number.isFinite(Number(result?.score)) ? Number(result.score) : 'pending';
  return `${zone}:${score}`;
}

export function groupRoutesByConditionScore(results) {
  const groups = new Map();

  for (const result of Array.isArray(results) ? results : []) {
    const key = conditionScoreKey(result);
    const existing = groups.get(key);
    if (existing) {
      existing.routes.push(result);
      continue;
    }

    groups.set(key, {
      key,
      score: Number.isFinite(Number(result?.score)) ? Number(result.score) : null,
      rating: result?.rating ?? '',
      confidence: result?.confidence ?? null,
      region: riverForResult(result).region ?? '',
      routes: [result],
    });
  }

  return [...groups.values()].map((group) => ({
    ...group,
    regions: [...new Set(group.routes.map((route) => riverForResult(route).region).filter(Boolean))],
    representative: [...group.routes].sort((left, right) => {
      const scoreDifference = Number(right?.score ?? -1) - Number(left?.score ?? -1);
      if (scoreDifference !== 0) return scoreDifference;
      return String(riverForResult(left).reach ?? '').localeCompare(String(riverForResult(right).reach ?? ''));
    })[0],
  }));
}

export function routeCoveragePoints(result) {
  const river = riverForResult(result);
  const points = [
    river.putIn,
    ...(Array.isArray(river.accessPoints) ? river.accessPoints : []),
    river.takeOut,
  ]
    .filter(Boolean)
    .filter((point) => finiteCoordinate(point.longitude) && finiteCoordinate(point.latitude))
    .map((point) => ({ longitude: point.longitude, latitude: point.latitude }));

  if (points.length > 0) {
    return points;
  }

  return finiteCoordinate(river.longitude) && finiteCoordinate(river.latitude)
    ? [{ longitude: river.longitude, latitude: river.latitude }]
    : [];
}

export function coverageCenterForRoutes(results) {
  return coverageCenter((Array.isArray(results) ? results : []).map(routeCoveragePoints));
}

/**
 * Returns a coverage center constrained to the mapped river geometry when it
 * is available. A raw access-point average can fall off the river on a bend.
 */
export function coverageAnchorForRoutes(results, geometryBySlug) {
  const center = coverageCenterForRoutes(results);
  if (!center || !geometryBySlug) return center;

  const lines = (Array.isArray(results) ? results : [])
    .flatMap((result) => {
      const route = riverForResult(result);
      const stored = geometryBySlug.get?.(route.slug)?.geometry;
      const geometryLines = flattenCoverageGeometry(stored);
      if (geometryLines.length > 0) return geometryLines;

      const fallbackPoints = routeCoveragePoints(result);
      return fallbackPoints.length >= 2
        ? [fallbackPoints.map((point) => [point.longitude, point.latitude])]
        : [];
    });
  if (lines.length === 0) return center;

  return nearestPointOnLines(center, lines) ?? center;
}

function flattenCoverageGeometry(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'LineString') return [geometry.coordinates];
  if (geometry.type === 'MultiLineString') return geometry.coordinates;
  return [];
}
