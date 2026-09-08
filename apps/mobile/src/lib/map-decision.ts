import { callLabelForDecision, callStateForDecision, type DecisionReadinessStatus, type ScoreRating } from '@paddletoday/api-contract';

export function routeDecisionPresentation(route: {
  score: number; rating: ScoreRating; readiness?: { status: DecisionReadinessStatus };
  river?: { scoreEligibility?: string };
}) {
  const planning = route.river?.scoreEligibility === 'planning';
  const readiness = planning ? 'withheld' : route.readiness?.status ?? 'withheld';
  const call = planning ? 'unavailable' : callStateForDecision(route.rating, readiness);
  const label = planning ? 'Planning only' : callLabelForDecision(route.rating, readiness);
  return {
    call, label, readiness,
    scoreLabel: call === 'unavailable' ? label : `Score ${route.score}`,
    score: call === 'unavailable' ? null : route.score,
    rating: call === 'unavailable' ? 'unavailable' : call === 'watch' ? 'Fair' : call === 'skip' ? 'No-go' : route.rating,
    markerLabel: call === 'unavailable' ? '—' : undefined,
    description: call === 'unavailable' ? label : `${label}, score ${route.score}`,
  };
}

// Maps and route previews share the same public-call gate.
export const mapDecision = routeDecisionPresentation;
