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
