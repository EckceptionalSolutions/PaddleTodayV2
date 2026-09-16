import type { RiverAccessPoint, RiverDetailApiResult, RiverGeometryResponse, RiverRouteAccessPoint } from '@paddletoday/api-contract';
import { endpointSnappedRiverGeometry } from '@paddletoday/geo';
import { estimateSegmentDurationMinutes, parseDistanceMiles } from '@paddletoday/trip-pack';

export type OfflineSegmentGeometry = { lines: number[][][] };
export type OfflineTripSegment = {
  distanceMiles: number | null;
  estimatedPaddleMinutes: { min: number; max: number } | null;
  geometry: OfflineSegmentGeometry | null;
  missing: string[];
};
const MAX_ENDPOINT_SNAP_ERROR_SQUARED = 0.0001;

function geoPoint(point: RiverAccessPoint) {
  return typeof point.latitude === 'number' && Number.isFinite(point.latitude)
    && typeof point.longitude === 'number' && Number.isFinite(point.longitude)
    ? { latitude: point.latitude, longitude: point.longitude }
    : null;
}

export function selectedSegmentDistance(
  points: RiverRouteAccessPoint[] | undefined,
  putIn: RiverAccessPoint | undefined,
  takeOut: RiverAccessPoint | undefined,
  fullDistanceLabel: string | null | undefined,
): number | null {
  const start = points?.find(point => point.id === putIn?.id);
  const end = points?.find(point => point.id === takeOut?.id);
  const measured = start && end ? end.mileFromStart - start.mileFromStart : null;
  if (measured && Number.isFinite(measured) && measured > 0) return Number(measured.toFixed(1));
  const fullRoute = start?.mileFromStart === 0 && end?.mileFromStart === Math.max(...(points ?? []).map(point => point.mileFromStart));
  return fullRoute ? parseDistanceMiles(fullDistanceLabel) : null;
}

export function buildOfflineTripSegment(args: {
  detail: RiverDetailApiResult;
  putIn: RiverAccessPoint;
  takeOut: RiverAccessPoint;
  geometryResponse?: RiverGeometryResponse | null;
}): OfflineTripSegment {
  const { detail, putIn, takeOut, geometryResponse } = args;
  const distanceMiles = selectedSegmentDistance(detail.river.accessPoints, putIn, takeOut, detail.river.distanceLabel);
  const estimatedPaddleMinutes = distanceMiles
    ? estimateSegmentDurationMinutes(detail.river.distanceLabel, detail.river.estimatedPaddleTime, distanceMiles)
    : null;
  const missing: string[] = [];
  if (distanceMiles === null) missing.push('Selected segment distance');
  if (!estimatedPaddleMinutes) missing.push('Selected segment time estimate');

  const rawLines: readonly (readonly (readonly number[])[])[] | null = geometryResponse?.geometry?.type === 'LineString'
    ? [geometryResponse.geometry.coordinates] as unknown as readonly (readonly (readonly number[])[])[]
    : geometryResponse?.geometry?.type === 'MultiLineString'
      ? geometryResponse.geometry.coordinates as unknown as readonly (readonly (readonly number[])[])[]
      : null;
  const geometry = rawLines ? clipOfflineSegmentGeometry(rawLines, putIn, takeOut) : null;
  if (!geometry) missing.push('Selected segment geometry');
  return { distanceMiles, estimatedPaddleMinutes, geometry, missing };
}

export function clipOfflineSegmentGeometry(
  lines: readonly (readonly (readonly number[])[])[],
  putIn: RiverAccessPoint,
  takeOut: RiverAccessPoint,
): OfflineSegmentGeometry | null {
  const start = geoPoint(putIn), end = geoPoint(takeOut);
  if (!start || !end) return null;
  const snapped = endpointSnappedRiverGeometry(lines, [start, end]);
  return snapped && snapped.coordinates.length >= 2 && snapped.errorSquared <= MAX_ENDPOINT_SNAP_ERROR_SQUARED
    ? { lines: [snapped.coordinates] } : null;
}
