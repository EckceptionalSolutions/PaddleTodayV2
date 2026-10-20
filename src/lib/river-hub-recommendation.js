import { callStateForDecision } from '@paddletoday/api-contract';
import { isCurrentCallUnavailable } from './current-call-availability.js';

export function riverHubDecisionPriority(route) {
  if (!route || route.scoreEligibility === 'planning' || isCurrentCallUnavailable(route)) return 0;
  const call = callStateForDecision(route?.rating, route?.readiness?.status);
  return { paddle: 3, watch: 2, skip: 1, unavailable: 0 }[call] ?? 0;
}

export function isRecommendableRiverHubRoute(route) {
  return Boolean(route) && riverHubDecisionPriority(route) === 3;
}
