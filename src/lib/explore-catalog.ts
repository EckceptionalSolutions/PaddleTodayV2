import { catalogRevision } from './catalog-coverage';
import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import type { River } from './types';
import { isScoreEligible } from '../data/route-publication';
import { scoreRiverCondition } from './scoring';
import { serializeSummaryResult } from './api-contract';

/** Discovery is catalog-led: a missing score must never remove a public route. */
export function buildExploreCatalog(routes: River[], scores: RiverSummaryApiItem[]) {
  const bySlug = new Map(scores.map(item => [item.river.slug, item]));
  const scoredRoutes = routes.filter(isScoreEligible);
  const missing = scoredRoutes.filter(route => !bySlug.has(route.slug));
  const rivers = routes.map(route => {
    const scored = isScoreEligible(route);
    const current = scored ? bySlug.get(route.slug) : undefined;
    // Always use current catalog metadata, including publication and route type.
    const fallback = serializeSummaryResult(scoreRiverCondition({ river: route, gauge: null, weather: null }));
    if (current) return { ...current, river: fallback.river };
    const reason = scored
      ? 'Current conditions are unavailable. Open the route to check its latest readings before launching.'
      : 'Planning route: no live conditions score. Verify water, access, and hazards before launching.';
    return {
      ...fallback,
      river: { ...fallback.river, scoreEligibility: scored ? 'scored' as const : 'planning' as const },
      readiness: { status: 'withheld' as const, label: 'Withheld' as const, reason },
      explanation: reason,
      gaugeBandLabel: scored ? 'Conditions unavailable' : 'Planning route',
      scoreBreakdown: undefined,
      summary: { ...fallback.summary, shortExplanation: reason, cardText: reason, rawSignalLine: '', gaugeNow: '', freshnessText: '' },
    };
  });
  return {
    rivers,
    coverage: {
      catalogRevision: catalogRevision(routes),
      publicRoutes: routes.length,
      scoredRoutes: scoredRoutes.length,
      planningRoutes: routes.length - scoredRoutes.length,
      missingScores: missing.length,
      missingScoreStates: [...new Set(missing.map(route => route.state))].sort(),
    },
  };
}
