import { describe, expect, it } from 'vitest';
import { getCanonicalStateId, getOperationsSnapshot } from './operations';

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

  it('exposes the route implementation WIP limit and control-plane activity', () => {
    const snapshot = getOperationsSnapshot();
    expect(snapshot.policy.maxRouteImplementationsInProgress).toBe(1);
    expect(snapshot.automations.some((automation) => automation.id === 'route-control-plane')).toBe(true);
    expect(Array.isArray(snapshot.controlPlane.recentClaims)).toBe(true);
  });
});
