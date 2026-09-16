import type { RiverDetailApiResult, RiverSummaryApiItem } from '@paddletoday/api-contract';
import { distanceMiles, estimateTravelMinutes, formatTravelTime, hasValidLocationCoordinates, type StoredLocation } from './location';
import { routeDecisionPresentation } from './map-decision';

export type ComparableRoute = RiverDetailApiResult | RiverSummaryApiItem;

export const ROUTE_COMPARISON_LIMIT = 3;
export type ComparisonFactGroup = 'Conditions' | 'Trip effort' | 'Access';
export interface RouteComparisonFact {
  id: string;
  group: ComparisonFactGroup;
  label: string;
  value: string;
  comparableValue: string;
}
function normalizeComparisonValue(value: string) {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
}
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
  const fact = (id: string, group: ComparisonFactGroup, label: string, value: string, comparableValue = value): RouteComparisonFact => ({
    id, group, label, value, comparableValue: normalizeComparisonValue(comparableValue),
  });
  return [
    fact('call', 'Conditions', isStale ? 'Stored call' : 'Current call', decision.label),
    fact('score', 'Conditions', 'Score', isStale || decision.score === null ? 'Current score unavailable' : String(decision.score)),
    fact('confidence', 'Conditions', 'Confidence', isStale || decision.call === 'unavailable' ? 'Current confidence unavailable' : route.confidence.label),
    fact('captured', 'Conditions', 'Conditions captured', Number.isFinite(captured.getTime()) ? captured.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : 'Time unavailable', Number.isFinite(captured.getTime()) ? route.generatedAt : 'time-unavailable'),
    fact('paddle-time', 'Trip effort', 'Paddle time', route.river.estimatedPaddleTime || 'Not listed'),
    fact('distance', 'Trip effort', 'Distance', route.river.distanceLabel || 'Not listed'),
    fact('difficulty', 'Trip effort', 'Difficulty', difficulty ? difficulty[0].toUpperCase() + difficulty.slice(1) : 'Not listed'),
    fact('drive', 'Trip effort', 'Approx. drive', drive),
    fact('put-in', 'Access', 'Put-in', route.river.putIn?.name || 'Not listed'),
    fact('take-out', 'Access', 'Take-out', route.river.takeOut?.name || 'Not listed'),
  ];
}
