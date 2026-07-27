const EARTH_RADIUS_MILES = 3958.8;
const DEFAULT_DRIVE_SPEED_MPH = 50;

export function distanceMiles(
  latitudeA: number,
  longitudeA: number,
  latitudeB: number,
  longitudeB: number
) {
  const dLat = toRadians(latitudeB - latitudeA);
  const dLon = toRadians(longitudeB - longitudeA);
  const latA = toRadians(latitudeA);
  const latB = toRadians(latitudeB);

  const haversine =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(latA) * Math.cos(latB) * Math.sin(dLon / 2) ** 2;

  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(haversine));
}

export function estimateTravelMinutes(distance: number, speedMph = DEFAULT_DRIVE_SPEED_MPH) {
  if (!Number.isFinite(distance)) {
    return Number.POSITIVE_INFINITY;
  }

  if (!Number.isFinite(speedMph) || speedMph <= 0) {
    throw new Error('Travel speed must be a positive finite number.');
  }

  return Math.max(5, Math.round(((distance / speedMph) * 60) / 5) * 5);
}

export function distancePenalty(travelMinutes: number) {
  if (!Number.isFinite(travelMinutes)) {
    return 0;
  }

  return Math.min(travelMinutes / 6, 30);
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}
