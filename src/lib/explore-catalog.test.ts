import { describe, expect, it } from 'vitest';
import { listRivers, listScoredRivers } from './rivers';
import { buildExploreCatalog, createExploreCatalogBuilder } from './explore-catalog';
import { isScoreEligible } from '../data/route-publication';
import { serializeSummaryResult } from './api-contract';
import { scoreRiverCondition } from './scoring';

describe('catalog-led Explore', () => {
  it('reuses an unchanged generation and rebuilds stale and replacement envelopes', () => {
    const route = listScoredRivers()[0];
    const build = createExploreCatalogBuilder([route]);
    const item = serializeSummaryResult(scoreRiverCondition({ river: route, gauge: null, weather: null }));
    const fresh = [{ ...item, score: 85, readiness: { status: 'ready' as const, label: 'Ready' as const, reason: 'Current' } }];
    const first = build(fresh);
    expect(build(fresh)).toBe(first);
    const stale = [{ ...fresh[0], readiness: { status: 'withheld' as const, label: 'Withheld' as const, reason: 'Stale' } }];
    expect(build(stale)).not.toBe(first);
    expect(build(stale).rivers[0].readiness.status).toBe('withheld');
    const replacement = [{ ...item, score: 55 }];
    expect(build(replacement).rivers[0].score).toBe(55);
  });
  it('keeps every published route and state discoverable with no snapshot', () => {
    const routes = listRivers();
    const result = buildExploreCatalog(routes, []);
    expect(result.rivers.map(item => item.river.slug)).toEqual(routes.map(route => route.slug));
    expect(new Set(result.rivers.map(item => item.river.state)).size).toBe(48);
    expect(result.coverage.missingScores).toBe(listScoredRivers().length);
    expect(result.rivers.every(item => item.readiness.status === 'withheld')).toBe(true);
    expect(result.rivers.find(item => item.river.scoreEligibility === 'planning')?.explanation).toContain('Planning route');
  });

  it('overlays existing scores, adds missing routes, and ignores removed or reclassified snapshot records', () => {
    const routes = listRivers();
    const scored = routes.find(isScoreEligible)!;
    const planning = routes.find(route => !isScoreEligible(route))!;
    const snapshot = serializeSummaryResult(scoreRiverCondition({ river: scored, gauge: null, weather: null }));
    snapshot.score = 82;
    snapshot.river.name = 'Old catalog name';
    const result = buildExploreCatalog([scored, planning], [snapshot,
      { ...snapshot, river: { ...snapshot.river, slug: planning.slug } },
      { ...snapshot, river: { ...snapshot.river, slug: 'removed-route' } },
    ]);
    expect(result.rivers).toHaveLength(2);
    expect(result.rivers[0].score).toBe(82);
    expect(result.rivers[0].river.name).toBe(scored.name);
    expect(result.rivers[1].river.scoreEligibility).toBe('planning');
    expect(result.rivers[1].readiness.status).toBe('withheld');
    expect(result.coverage.missingScores).toBe(0);
  });
});
