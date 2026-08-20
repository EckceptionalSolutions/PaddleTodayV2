import { describe, expect, it } from 'vitest';
import { buildScoringCalibrationMetrics } from './scoring-calibration';
import type { RouteContributionSubmission } from './route-contributions';

function submission(
  status: RouteContributionSubmission['status'],
  appRating: NonNullable<RouteContributionSubmission['scoringOutcome']>['appRating'],
  overallVerdict: NonNullable<RouteContributionSubmission['scoringOutcome']>['overallVerdict'],
  thresholdModel: 'two-sided' | 'minimum-only' = 'two-sided'
): RouteContributionSubmission {
  return {
    id: `${status}-${appRating}-${overallVerdict}`,
    status,
    submittedAt: '2026-05-10T12:00:00Z',
    reviewedAt: status === 'pending' ? null : '2026-05-11T12:00:00Z',
    reviewedBy: status === 'pending' ? null : 'Admin',
    reviewNote: '',
    river: { slug: 'test', name: 'Test', reach: 'Reach', state: 'MN', region: 'Test' },
    contributor: { name: 'Paddler', email: 'paddler@example.com' },
    trip: { date: '2026-05-10', sentiment: 'good', report: 'Report' },
    notes: '',
    scoringOutcome: {
      schemaVersion: 1,
      decisionCapturedAt: '2026-05-10T10:00:00Z',
      appScore: appRating === 'No-go' ? 40 : 80,
      appRating,
      observedWaterLevel: overallVerdict === 'unsafe' ? 'unsafe' : 'ideal',
      tripCompletion: overallVerdict === 'unsafe' ? 'not-launched' : 'completed',
      overallVerdict,
      thresholdModel,
      thresholdSourceStrength: 'official',
    },
    rightsConfirmed: true,
    reviewConsent: true,
    files: [],
    meta: { ip: '', ua: '', referer: '' },
  };
}

describe('buildScoringCalibrationMetrics', () => {
  it('computes agreement, safety errors, confusion counts, and segment metrics from approved outcomes', () => {
    const metrics = buildScoringCalibrationMetrics([
      submission('approved', 'Good', 'good'),
      submission('approved', 'No-go', 'excellent'),
      submission('approved', 'Good', 'unsafe', 'minimum-only'),
      submission('pending', 'Strong', 'excellent'),
    ]);

    expect(metrics).toMatchObject({
      totalOutcomes: 4,
      approvedOutcomes: 3,
      comparableOutcomes: 3,
      agreementCount: 1,
      agreementRate: 33.3,
      safetyFalsePositives: 1,
      unsafeFalseNegatives: 1,
    });
    expect(metrics.confusionMatrix['No-go'].excellent).toBe(1);
    expect(metrics.byThresholdModel).toEqual(expect.arrayContaining([
      expect.objectContaining({ key: 'two-sided', sampleSize: 2 }),
      expect.objectContaining({ key: 'minimum-only', sampleSize: 1 }),
    ]));
  });
});
