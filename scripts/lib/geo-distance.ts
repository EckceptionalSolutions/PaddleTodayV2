export type Coordinate = { latitude: number; longitude: number };

export const FEET_PER_MILE = 5280;

const EARTH_RADIUS_MILES = 3958.8;

export function radians(value: number) {
  return (value * Math.PI) / 180;
}

export function distanceFeet(left: Coordinate, right: Coordinate) {
  const deltaLat = radians(right.latitude - left.latitude);
  const deltaLon = radians(right.longitude - left.longitude);
  const leftLat = radians(left.latitude);
  const rightLat = radians(right.latitude);
  const haversine =
    Math.sin(deltaLat / 2) ** 2
    + Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(deltaLon / 2) ** 2;

  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(haversine)) * FEET_PER_MILE;
}
