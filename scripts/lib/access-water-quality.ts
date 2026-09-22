export type WaterProximity = 'within-100ft' | 'within-300ft' | 'over-300ft' | 'over-800ft' | 'unknown';

export type WaterQualityInput = {
  distanceFeetToMatchedRiver: number | null;
  distanceFeetToNearestWaterway: number | null;
  distanceFeetToNearestWaterbody: number | null;
};

/** Independent of access citations, parking-anchor exceptions, and route-name matching. */
export function assessWaterProximity(input: WaterQualityInput, coverageComplete: boolean) {
  const distances = [input.distanceFeetToMatchedRiver, input.distanceFeetToNearestWaterway,
    input.distanceFeetToNearestWaterbody].filter((value): value is number =>
    value !== null && Number.isFinite(value) && value >= 0);
  const distanceFeetToMappedWater = distances.length ? Math.min(...distances) : null;
  const waterProximity: WaterProximity = distanceFeetToMappedWater === null ? 'unknown'
    : distanceFeetToMappedWater <= 100 ? 'within-100ft'
    : distanceFeetToMappedWater <= 300 ? 'within-300ft'
    : !coverageComplete ? 'unknown'
    : distanceFeetToMappedWater <= 800 ? 'over-300ft' : 'over-800ft';
  return { waterProximity, distanceFeetToMappedWater };
}

/** Even/odd containment preserves islands (holes) and multipart water polygons. */
export function pointInWaterPolygon(point: { latitude: number; longitude: number }, rings: number[][][]) {
  let inside = false;
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const a = ring[i];
      const b = ring[j];
      if (!a || !b || a.length < 2 || b.length < 2) continue;
      if ((a[1] > point.latitude) !== (b[1] > point.latitude)
        && point.longitude < ((b[0] - a[0]) * (point.latitude - a[1])) / (b[1] - a[1]) + a[0]) {
        inside = !inside;
      }
    }
  }
  return inside;
}

export function validateHydrographyResponse(value: unknown): asserts value is { features: unknown[] } {
  const response = value as { error?: { message?: string }; exceededTransferLimit?: boolean; features?: unknown[] } | null;
  if (!response || response.error || !Array.isArray(response.features)) {
    throw new Error(response?.error?.message ?? 'NHD response has no feature collection');
  }
  if (response.exceededTransferLimit) throw new Error('NHD response is truncated (exceededTransferLimit)');
}

type ReviewEndpoint = WaterQualityInput & {
  routeId: string; state: string; endpoint: string; endpointName: string;
  latitude: number; longitude: number; severity: string;
  waterProximity: WaterProximity; distanceFeetToMappedWater: number | null;
  coordinateEvidenceRole: string | null;
};

export function buildAccessReviewQueue(endpoints: ReviewEndpoint[]) {
  const groups = new Map<string, {
    state: string; name: string; latitude: number; longitude: number;
    distanceFeetToMappedWater: number | null; reasons: string[];
    occurrences: Array<{ routeId: string; endpoint: string; endpointName: string; severity: string }>;
  }>();
  for (const point of endpoints) {
    const reasons: string[] = [];
    if (point.waterProximity === 'over-300ft' || point.waterProximity === 'over-800ft') {
      reasons.push(point.coordinateEvidenceRole === 'authoritative-access-anchor'
        ? 'documented-access-anchor-offset' : 'mapped-water-offset');
    }
    if (point.coordinateEvidenceRole === 'authoritative-area-anchor') reasons.push('area-anchor-not-launch');
    if (!reasons.length) continue;
    // Exact coordinates only: a shared name is not evidence of shared identity.
    const key = JSON.stringify([point.state, point.latitude, point.longitude]);
    let group = groups.get(key);
    if (!group) {
      group = { state: point.state, name: point.endpointName, latitude: point.latitude,
        longitude: point.longitude, distanceFeetToMappedWater: point.distanceFeetToMappedWater,
        reasons: [], occurrences: [] };
      groups.set(key, group);
    }
    group.reasons = [...new Set([...group.reasons, ...reasons])];
  }
  for (const point of endpoints) {
    const group = groups.get(JSON.stringify([point.state, point.latitude, point.longitude]));
    if (!group) continue;
    // Keep the closest observed water evidence across overlapping route queries.
    if (point.distanceFeetToMappedWater !== null) group.distanceFeetToMappedWater = Math.min(
      group.distanceFeetToMappedWater ?? Infinity, point.distanceFeetToMappedWater);
    group.occurrences.push({ routeId: point.routeId, endpoint: point.endpoint,
      endpointName: point.endpointName, severity: point.severity });
  }
  return [...groups.values()].map((group) => ({
    ...group,
    reasons: group.reasons.filter((reason) => !['mapped-water-offset', 'documented-access-anchor-offset'].includes(reason)
      || (group.distanceFeetToMappedWater ?? 0) > 300),
    occurrences: group.occurrences.sort((a, b) => a.routeId.localeCompare(b.routeId)
      || a.endpoint.localeCompare(b.endpoint) || a.endpointName.localeCompare(b.endpointName)),
  })).filter((group) => group.reasons.length > 0).sort((a, b) =>
    (b.distanceFeetToMappedWater ?? -1) - (a.distanceFeetToMappedWater ?? -1)
    || b.occurrences.length - a.occurrences.length || a.state.localeCompare(b.state)
    || a.name.localeCompare(b.name));
}
