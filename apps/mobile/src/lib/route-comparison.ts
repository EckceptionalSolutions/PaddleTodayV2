import type { RiverDetailApiResult, RiverSummaryApiItem } from '@paddletoday/api-contract';
import { distanceMiles, estimateTravelMinutes, formatTravelTime, hasValidLocationCoordinates, type StoredLocation } from './location';
import { routeDecisionPresentation } from './map-decision';

export type ComparableRoute = RiverDetailApiResult | RiverSummaryApiItem;

export const ROUTE_COMPARISON_LIMIT = 3;
export function toggleRouteComparison(selected: string[], slug: string, available: string[]) {
  const valid = [...new Set(selected)].filter(id => available.includes(id));
  if (valid.includes(slug)) return valid.filter(id => id !== slug);
  if (!available.includes(slug) || valid.length >= ROUTE_COMPARISON_LIMIT) return valid;
  return [...valid, slug];
}

export function routeComparisonFacts(route: ComparableRoute, location: StoredLocation | null, isStale: boolean) {
  const decision = routeDecisionPresentation(route);
  const difficulty = 'difficulty' in route.river ? route.river.difficulty : route.river.profile?.difficulty;
  const drive = location && hasValidLocationCoordinates(location) && hasValidLocationCoordinates(route.river)
    ? formatTravelTime(estimateTravelMinutes(distanceMiles(location.latitude, location.longitude, route.river.latitude, route.river.longitude)))
    : 'No drive estimate';
  const captured = new Date(route.generatedAt);
  return [
    { label: isStale ? 'Stored call' : 'Current call', value: decision.label },
    { label: 'Score', value: isStale || decision.score === null ? 'Current score unavailable' : String(decision.score) },
    { label: 'Paddle time', value: route.river.estimatedPaddleTime || 'Not listed' },
    { label: 'Distance', value: route.river.distanceLabel || 'Not listed' },
    { label: 'Difficulty', value: difficulty ? difficulty[0].toUpperCase() + difficulty.slice(1) : 'Not listed' },
    { label: 'Approx. drive', value: drive },
    { label: 'Put-in', value: route.river.putIn?.name || 'Not listed' },
    { label: 'Take-out', value: route.river.takeOut?.name || 'Not listed' },
    { label: 'Confidence', value: isStale || decision.call === 'unavailable' ? 'Current confidence unavailable' : route.confidence.label },
    { label: 'Conditions captured', value: Number.isFinite(captured.getTime()) ? captured.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : 'Time unavailable' },
  ];
}
