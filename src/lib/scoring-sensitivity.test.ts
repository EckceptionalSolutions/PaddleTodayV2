import { describe, expect, it } from 'vitest';
import { rivers } from '../data/rivers';
import {
  analyzeScoringSensitivity,
  compareSensitivityBaselines,
  findSensitivityBaselineChanges,
  type SensitivityBaseline,
} from './scoring-sensitivity';

const representativeRoute = rivers.find((route) =>
  route.profile.thresholdModel === 'two-sided'
  && typeof route.profile.tooLow === 'number'
  && typeof route.profile.idealMin === 'number'
  && typeof route.profile.idealMax === 'number'
  && typeof route.profile.tooHigh === 'number'
);

describe('scoring sensitivity audit', () => {
  it('sweeps threshold, freshness, weather, and trend states without violating safety invariants', () => {
    expect(representativeRoute).toBeDefined();
    const analysis = analyzeScoringSensitivity([representativeRoute!], null, '2026-08-20T12:00:00.000Z');

    expect(analysis.report).toMatchObject({
      routeCount: 1,
      invariantFailureCount: 0,
    });
    expect(analysis.report.scenarioCount).toBeGreaterThan(15);
    const scenarios = analysis.baseline.routes[representativeRoute!.slug];
    expect(scenarios['missing-gauge'].readiness).toBe('withheld');
    expect(scenarios['stale-gauge'].readiness).toBe('withheld');
    expect(scenarios['missing-weather'].readiness).not.toBe('ready');
    expect(scenarios['cold-water'].readiness).not.toBe('ready');
  });

  it('reports compact score, rating, and readiness drift against a prior baseline', () => {
    expect(representativeRoute).toBeDefined();
    const current = analyzeScoringSensitivity([representativeRoute!], null, '2026-08-20T12:00:00.000Z').baseline;
    const previous = structuredClone(current) as SensitivityBaseline;
    const scenario = Object.values(previous.routes[representativeRoute!.slug])[0];
    scenario.score = Math.max(0, scenario.score - 5);
    scenario.rating = scenario.rating === 'No-go' ? 'Fair' : 'No-go';
    scenario.readiness = scenario.readiness === 'skip' ? 'verify' : 'skip';

    expect(compareSensitivityBaselines(previous, current)).toMatchObject({
      baselineAvailable: true,
      changedScenarios: 1,
      readinessChanges: 1,
      ratingChanges: 1,
      maxScoreDelta: 5,
    });
    expect(findSensitivityBaselineChanges(previous, current)).toEqual([
      expect.objectContaining({
        routeSlug: representativeRoute!.slug,
        scoreDelta: 5,
      }),
    ]);
  });
});
