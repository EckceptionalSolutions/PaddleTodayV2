import { describe, expect, it } from 'vitest';
import { getCanonicalStateId, getOperationsSnapshot, rankStateCoverage } from './operations';

describe('operations snapshot', () => {
  it('normalizes state names and codes to one registry', () => {
    expect(getCanonicalStateId('Minnesota')).toBe('MN');
    expect(getCanonicalStateId('MN')).toBe('MN');
    expect(getCanonicalStateId('Wisconsin')).toBe('WI');
  });

  it('keeps planning routes out of scored saturation counts', () => {
    const snapshot = getOperationsSnapshot();
    const minnesota = snapshot.states.find((state) => state.id === 'MN');
    expect(minnesota).toMatchObject({ scored: 145, planning: 113, saturation: 'provisionally_saturated' });
    expect(snapshot.policy.planningRoutes).toBe('frozen_without_explicit_user_request');
    expect(snapshot.totals.scored + snapshot.totals.planning).toBe(snapshot.totals.inventory);
  });

  it('keeps Texas in review until the discovery sweep completes', () => {
    const snapshot = getOperationsSnapshot();
    const texas = snapshot.states.find((state) => state.id === 'TX');
    expect(texas).toMatchObject({ planning: 0, saturation: 'not_started' });
    expect(texas?.scored ?? 0).toBeGreaterThanOrEqual(16);
  });

  it('keeps Utah in review until the bounded discovery sweep completes', () => {
    const snapshot = getOperationsSnapshot();
    const utah = snapshot.states.find((state) => state.id === 'UT');
    expect(utah).toMatchObject({ scored: 3, planning: 0, saturation: 'not_started' });
  });

  it('exposes the route implementation WIP limit and control-plane activity', () => {
    const snapshot = getOperationsSnapshot();
    expect(snapshot.policy.maxRouteImplementationsInProgress).toBe(1);
    expect(snapshot.automations.some((automation) => automation.id === 'route-control-plane')).toBe(true);
    expect(Array.isArray(snapshot.controlPlane.recentClaims)).toBe(true);
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

  it('does not call coverage-complete Texas or Utah saturated before discovery', () => {
    const snapshot = getOperationsSnapshot();
    expect(snapshot.states.find((state) => state.id === 'TX')?.saturation).toBe('not_started');
    expect(snapshot.states.find((state) => state.id === 'UT')?.saturation).toBe('not_started');
    expect(snapshot.tasks.find((task) => task.id === 'tx-bounded-discovery-sweep')?.lane).toBe('ready');
    expect(snapshot.tasks.find((task) => task.id === 'utah-bounded-discovery-sweep')?.lane).toBe('ready');
  });
});
