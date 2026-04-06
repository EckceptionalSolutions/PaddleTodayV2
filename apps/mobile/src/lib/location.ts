export interface StoredLocation {
  latitude: number;
  longitude: number;
  label: string;
  source: 'device';
}

const EARTH_RADIUS_MILES = 3958.8;
const AVERAGE_DRIVE_MPH = 50;

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

export function estimateTravelMinutes(distance: number) {
  if (!Number.isFinite(distance)) return Number.POSITIVE_INFINITY;
  return Math.max(5, Math.round(((distance / AVERAGE_DRIVE_MPH) * 60) / 5) * 5);
}

export function distancePenalty(travelMinutes: number) {
  if (!Number.isFinite(travelMinutes)) return 0;
  return Math.min(travelMinutes / 6, 30);
}

export function formatTravelTime(minutes: number) {
  if (!Number.isFinite(minutes)) return 'Distance unavailable';
  if (minutes < 60) return `${minutes} min away`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes === 0 ? `${hours}h away` : `${hours}h ${remainingMinutes}m away`;
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}
