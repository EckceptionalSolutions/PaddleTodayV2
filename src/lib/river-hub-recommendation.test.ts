import { describe, expect, it } from 'vitest';
import { isRecommendableRiverHubRoute, riverHubDecisionPriority } from './river-hub-recommendation.js';

describe('river hub recommendations', () => {
  it('uses the public call gates instead of a high raw score', () => {
    expect(isRecommendableRiverHubRoute({ score: 95, rating: 'Strong', readiness: { status: 'skip' } })).toBe(false);
    expect(isRecommendableRiverHubRoute({ score: 95, rating: 'Strong', readiness: { status: 'verify' } })).toBe(false);
    expect(isRecommendableRiverHubRoute({ score: 95, rating: 'Strong', readiness: { status: 'withheld' } })).toBe(false);
    expect(isRecommendableRiverHubRoute({ score: 65, rating: 'Good', readiness: { status: 'ready' } })).toBe(true);
  });

  it('excludes planning, unavailable and watch calls', () => {
    expect(isRecommendableRiverHubRoute({ scoreEligibility: 'planning', rating: 'Strong', readiness: { status: 'ready' } })).toBe(false);
    expect(isRecommendableRiverHubRoute({ rating: 'Strong', liveData: { overall: 'offline' } })).toBe(false);
    expect(isRecommendableRiverHubRoute({ rating: 'Strong', liveData: { overall: 'degraded', gaugeState: 'stale' } })).toBe(false);
    expect(isRecommendableRiverHubRoute({ rating: 'Fair', readiness: { status: 'ready' } })).toBe(false);
    expect(isRecommendableRiverHubRoute(null)).toBe(false);
  });

  it('ranks a paddle call before a higher-scoring skip or watch call', () => {
    const routes = [
      { slug: 'skip', score: 95, rating: 'Strong', readiness: { status: 'skip' } },
      { slug: 'watch', score: 90, rating: 'Strong', readiness: { status: 'verify' } },
      { slug: 'paddle', score: 65, rating: 'Good', readiness: { status: 'ready' } },
    ];
    expect(routes.sort((a, b) => riverHubDecisionPriority(b) - riverHubDecisionPriority(a)).map(route => route.slug))
      .toEqual(['paddle', 'watch', 'skip']);
  });
});
