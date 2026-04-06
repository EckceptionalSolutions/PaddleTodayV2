import type { RiverAccessPoint } from '@paddletoday/api-contract';

export function mapUrlForAccessPoint(point: RiverAccessPoint | undefined) {
  if (
    !point ||
    typeof point.latitude !== 'number' ||
    !Number.isFinite(point.latitude) ||
    typeof point.longitude !== 'number' ||
    !Number.isFinite(point.longitude)
  ) {
    return null;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${point.latitude},${point.longitude}`
  )}`;
}
