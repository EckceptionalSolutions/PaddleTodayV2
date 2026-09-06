import { describe, expect, it } from 'vitest';
import type { River } from '../lib/types';
import { routeInventory } from './rivers';
import {
  enforceHighConsequencePlanning,
  hasQualifyingGauge,
  isPublicPlanningRoute,
  isScoreEligible,
  maxPublishedRapidClass,
} from './route-publication';

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

  it('never exposes an explicitly Class IV+ route to live scoring', () => {
    const highConsequenceRoutes = routeInventory.filter(
      (river) => (maxPublishedRapidClass(river) ?? 0) >= 4,
    );

    expect(highConsequenceRoutes.length).toBeGreaterThan(0);
    expect(highConsequenceRoutes.every((river) => river.scoreEligibility !== 'scored')).toBe(true);
    expect(routeInventory.filter((river) => isScoreEligible(river)).some((river) => (maxPublishedRapidClass(river) ?? 0) >= 4)).toBe(false);
  });

  it('downgrades a high-consequence direct route to planning at publication time', () => {
    const candidate = route({
      scoreEligibility: 'scored',
      summary: 'Class III-IV reach with a short Class V rapid.',
    });

    enforceHighConsequencePlanning(candidate);
    expect(candidate.scoreEligibility).toBe('planning');
    expect(isScoreEligible(candidate)).toBe(false);
  });
});
