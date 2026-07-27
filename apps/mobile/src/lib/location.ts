import {
  distanceMiles,
  distancePenalty,
  estimateTravelMinutes,
} from '@paddletoday/api-contract';

export interface StoredLocation {
  latitude: number;
  longitude: number;
  label: string;
  source: 'device' | 'search';
}

export { distanceMiles, distancePenalty, estimateTravelMinutes };

export function formatTravelTime(minutes: number) {
  if (!Number.isFinite(minutes)) return 'Distance unavailable';
  if (minutes < 60) return `${minutes} min away`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes === 0 ? `${hours}h away` : `${hours}h ${remainingMinutes}m away`;
}

