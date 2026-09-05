import { describe, expect, it } from 'vitest';
import type { River } from '../lib/types';
import { hasQualifyingGauge, isPublicPlanningRoute, isScoreEligible } from './route-publication';

function route(overrides: Partial<River> = {}) {
  return {
    gaugeSource: { kind: 'direct', provider: 'usgs', siteId: '123', metric: 'discharge_cfs' },
    scoreEligibility: 'planning',
    routeType: 'recreational',
    safetyProfile: { reviewStatus: 'reviewed' },
    profile: { thresholdModel: 'two-sided' },
    ...overrides,
  } as River;
}

describe('route publication policy', () => {
  it('keeps explicitly planning direct routes public but out of scoring', () => {
    const planning = route();
    expect(hasQualifyingGauge(planning)).toBe(true);
    expect(isScoreEligible(planning)).toBe(false);
    expect(isPublicPlanningRoute(planning)).toBe(true);
  });

  it('keeps reviewed explicit planning whitewater discoverable', () => {
    const planning = route({ routeType: 'whitewater', safetyProfile: { reviewStatus: 'reviewed', riskLevel: 'advanced' } });
    expect(isScoreEligible(planning)).toBe(false);
    expect(isPublicPlanningRoute(planning)).toBe(true);
  });

  it('keeps reviewed proxy routes in the planning population', () => {
    const proxy = route({
      scoreEligibility: undefined,
      gaugeSource: { kind: 'proxy', provider: 'usgs', siteId: '456', metric: 'gage_height_ft' },
    });
    expect(isScoreEligible(proxy)).toBe(false);
    expect(isPublicPlanningRoute(proxy)).toBe(true);
  });
});
