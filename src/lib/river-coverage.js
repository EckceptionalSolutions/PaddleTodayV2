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
  const centers = (Array.isArray(results) ? results : [])
    .map((result) => {
      const points = routeCoveragePoints(result);
      if (points.length === 0) return null;
      return {
        longitude: points.reduce((sum, point) => sum + point.longitude, 0) / points.length,
        latitude: points.reduce((sum, point) => sum + point.latitude, 0) / points.length,
      };
    })
    .filter(Boolean);

  if (centers.length === 0) {
    return null;
  }

  return {
    longitude: centers.reduce((sum, point) => sum + point.longitude, 0) / centers.length,
    latitude: centers.reduce((sum, point) => sum + point.latitude, 0) / centers.length,
  };
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

  let best = null;
  for (const line of lines) {
    for (let index = 1; index < line.length; index += 1) {
      const candidate = nearestPointOnCoverageSegment(center, line[index - 1], line[index]);
      if (!best || candidate.distanceSquared < best.distanceSquared) best = candidate;
    }
  }

  return best ? { longitude: best.longitude, latitude: best.latitude } : center;
}

function flattenCoverageGeometry(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'LineString') return [geometry.coordinates];
  if (geometry.type === 'MultiLineString') return geometry.coordinates;
  return [];
}

function nearestPointOnCoverageSegment(target, start, end) {
  const latitudeScale = Math.cos((target.latitude * Math.PI) / 180);
  const startX = start[0] * latitudeScale;
  const startY = start[1];
  const endX = end[0] * latitudeScale;
  const endY = end[1];
  const targetX = target.longitude * latitudeScale;
  const targetY = target.latitude;
  const dx = endX - startX;
  const dy = endY - startY;
  const lengthSquared = dx * dx + dy * dy;
  const rawT = lengthSquared === 0
    ? 0
    : ((targetX - startX) * dx + (targetY - startY) * dy) / lengthSquared;
  const t = Math.max(0, Math.min(1, rawT));
  const longitude = start[0] + (end[0] - start[0]) * t;
  const latitude = start[1] + (end[1] - start[1]) * t;
  const distanceSquared = ((longitude - target.longitude) * latitudeScale) ** 2
    + (latitude - target.latitude) ** 2;
  return { longitude, latitude, distanceSquared };
}
