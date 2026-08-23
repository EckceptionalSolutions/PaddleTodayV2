import { describe, expect, it } from 'vitest';
import { getCanonicalStateId, getOperationsSnapshot, rankGaugeStateCoverage, rankStateCoverage } from './operations';
import type { StateGaugeCoverage } from './gauge-coverage';

describe('operations snapshot', () => {
  it('normalizes state names and codes to one registry', () => {
    expect(getCanonicalStateId('Minnesota')).toBe('MN');
    expect(getCanonicalStateId('MN')).toBe('MN');
    expect(getCanonicalStateId('Wisconsin')).toBe('WI');
  });

  it('keeps planning routes out of scored saturation counts', () => {
    const snapshot = getOperationsSnapshot();
    const minnesota = snapshot.states.find((state) => state.id === 'MN');
    expect(minnesota).toMatchObject({ scored: 145, planning: 113, legacySaturation: 'provisionally_saturated' });
    expect(minnesota?.saturation).toBe('saturated');
    expect(minnesota?.discoveryComplete).toBe(true);
    expect(snapshot.policy.planningRoutes).toBe('frozen_without_explicit_user_request');
    expect(snapshot.totals.scored + snapshot.totals.planning).toBe(snapshot.totals.inventory);
  });

  it('requires a discovery sweep after Texas gauge review completes', () => {
    const snapshot = getOperationsSnapshot();
    const texas = snapshot.states.find((state) => state.id === 'TX');
    expect(texas).toMatchObject({ planning: 0, legacySaturation: 'saturated' });
    expect(texas?.saturation).toBe('discovery_sweep_required');
    expect(texas?.scored ?? 0).toBeGreaterThanOrEqual(16);
  });

  it('does not let Utah legacy saturation bypass gauge review', () => {
    const snapshot = getOperationsSnapshot();
    const utah = snapshot.states.find((state) => state.id === 'UT');
    const rankedUtah = snapshot.stateResearchRanking.find((state) => state.id === 'UT');
    expect(utah).toMatchObject({ planning: 0, legacySaturation: 'saturated' });
    expect(utah?.saturation).not.toBe('saturated');
    expect(utah?.scored ?? 0).toBeGreaterThanOrEqual(3);
    expect(rankedUtah?.researchStatus).toBe('discovery_sweep_required');
    expect(rankedUtah?.done).toBe(false);
  });

  it('exposes the route implementation WIP limit and control-plane activity', () => {
    const snapshot = getOperationsSnapshot();
    expect(snapshot.policy.maxRouteImplementationsInProgress).toBe(1);
    expect(snapshot.automations.some((automation) => automation.id === 'route-control-plane')).toBe(true);
    expect(Array.isArray(snapshot.controlPlane.recentClaims)).toBe(true);
    expect(snapshot.policy.completenessModel).toContain('gauge_network');
    expect(snapshot.policy.researchStrategy).toBe('geographic_frontier_then_completion_gap');
    const activeFrontier = snapshot.stateResearchRanking.find((state) => state.id === snapshot.policy.activeFrontierState);
    const unfinishedFrontierTiers = snapshot.stateResearchRanking
      .filter((state) => !state.done)
      .map((state) => state.frontierTier);
    expect(activeFrontier?.done).toBe(false);
    expect(activeFrontier?.frontierTier).toBe(Math.min(...unfinishedFrontierTiers));
    expect(snapshot.totals.knownGauges).toBeGreaterThan(0);
    expect(snapshot.states.find((state) => state.id === 'MN')?.gaugeCoverage.knownGaugeCount).toBeGreaterThan(0);
    expect(snapshot.totals.gaugeReviewCoveragePercent).toBeGreaterThanOrEqual(0);
    expect(snapshot.totals.gaugeReviewCoveragePercent).toBeLessThanOrEqual(100);
    expect(snapshot.totals.routeGaugeCoveragePercent).toBeGreaterThanOrEqual(0);
    expect(snapshot.totals.routeGaugeCoveragePercent).toBeLessThanOrEqual(100);
    expect(JSON.stringify(snapshot.tasks)).not.toMatch(/(?:Â|â†|â€“|�)/);
  });

  it('prioritizes incomplete gauge baselines before legacy route saturation', () => {
    const coverage = (overrides: Partial<StateGaugeCoverage>): StateGaugeCoverage => ({
      stateId: 'TX', inventoryId: 'seed', baselineComplete: true, knownGaugeCount: 10,
      eligibleGaugeCount: 10, reviewedGaugeCount: 10, unreviewedGaugeCount: 0,
      coveredGaugeCount: 10, blockedGaugeCount: 0, screenedOutGaugeCount: 0,
      staleGaugeCount: 0, routeCapableGaugeCount: 10, uncoveredRouteCapableGaugeCount: 0,
      reviewCoveragePercent: 100, routeCoveragePercent: 100, routeFamilyCount: 10,
      ...overrides,
    });
    const ranked = rankGaugeStateCoverage([
      { id: 'TX', scored: 80, planning: 0, saturation: 'not_started', gaugeCoverage: coverage({}) },
      { id: 'MN', scored: 145, planning: 113, saturation: 'provisionally_saturated', gaugeCoverage: coverage({ stateId: 'MN', baselineComplete: false }) },
    ]);
    expect(ranked[0].id).toBe('MN');
    expect(ranked[0].researchStatus).toBe('gauge_baseline_pending');
    expect(ranked[1].legacyCoveragePercent).toBe(100);
  });

  it('ranks unsaturated states by scored coverage, then route depth', () => {
    const ranked = rankStateCoverage([
      { id: 'UT', scored: 2, planning: 0, saturation: 'not_started' },
      { id: 'SD', scored: 12, planning: 0, saturation: 'not_started' },
      { id: 'MN', scored: 145, planning: 113, saturation: 'provisionally_saturated' },
    ]);
    expect(ranked.map((state) => state.id)).toEqual(['SD', 'UT', 'MN']);
    expect(ranked[0].coveragePercent).toBe(100);
    expect(ranked[2].done).toBe(true);
  });

  it('keeps legacy state decisions separate from gauge completeness', () => {
    const snapshot = getOperationsSnapshot();
    expect(snapshot.stateResearchRanking.find((state) => state.id === 'TX')?.researchStatus).not.toBe('saturated');
    expect(snapshot.stateResearchRanking.find((state) => state.id === 'UT')?.researchStatus).not.toBe('saturated');
    expect(snapshot.legacyStateResearchRanking.length).toBe(snapshot.states.length);
    expect(snapshot.policy.completenessModel).toBe('gauge_network_authoritative_after_bounded_review');
    expect(snapshot.states.find((state) => state.id === 'UT')?.legacySaturation).toBe('saturated');
    expect(snapshot.states.find((state) => state.id === 'UT')?.saturation).not.toBe('saturated');
  });
});
