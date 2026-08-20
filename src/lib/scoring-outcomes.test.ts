import { describe, expect, it } from 'vitest';
import { parseScoringOutcomeObservation } from './scoring-outcomes';

describe('parseScoringOutcomeObservation', () => {
  it('normalizes a complete versioned outcome for calibration storage', () => {
    const result = parseScoringOutcomeObservation({
      schemaVersion: 1,
      decisionCapturedAt: '2026-05-10T12:00:00-05:00',
      appScore: 82,
      appRating: 'Good',
      appConfidence: 76,
      appReadiness: 'ready',
      thresholdModel: 'two-sided',
      thresholdSourceStrength: 'official',
      gaugeValue: 5350,
      gaugeUnit: 'cfs',
      gaugeTrend: 'steady',
      observedWaterLevel: 'low',
      tripCompletion: 'completed',
      overallVerdict: 'good',
      comfortRating: 4,
      accessStatus: 'open',
      paddlerExperience: 'intermediate',
      craftType: 'canoe',
      hazards: ['wind', 'wind', 'shallow bars'],
      reasonCodes: ['paddleable-low-water'],
    });

    expect(result).toEqual({
      ok: true,
      value: expect.objectContaining({
        schemaVersion: 1,
        decisionCapturedAt: '2026-05-10T17:00:00.000Z',
        appScore: 82,
        appReadiness: 'ready',
        thresholdModel: 'two-sided',
        observedWaterLevel: 'low',
        tripCompletion: 'completed',
        overallVerdict: 'good',
        hazards: ['wind', 'shallow bars'],
      }),
    });
  });

  it('rejects incomplete, unversioned, and out-of-range labels', () => {
    expect(parseScoringOutcomeObservation({
      observedWaterLevel: 'ideal',
      tripCompletion: 'completed',
      overallVerdict: 'good',
    }).ok).toBe(false);

    expect(parseScoringOutcomeObservation({
      schemaVersion: 1,
      appScore: 140,
      observedWaterLevel: 'ideal',
      tripCompletion: 'completed',
      overallVerdict: 'good',
    })).toMatchObject({ ok: false });

    expect(parseScoringOutcomeObservation({
      schemaVersion: 1,
      observedWaterLevel: 'ideal',
      tripCompletion: 'maybe',
      overallVerdict: 'good',
    })).toMatchObject({ ok: false });
  });

  it('supports aborted and not-launched reports so unsafe cases are not selection-biased away', () => {
    for (const tripCompletion of ['aborted', 'not-launched']) {
      expect(parseScoringOutcomeObservation({
        schemaVersion: 1,
        observedWaterLevel: 'unsafe',
        tripCompletion,
        overallVerdict: 'unsafe',
        reasonCodes: ['unsafe-high-water'],
      })).toMatchObject({ ok: true });
    }
  });
});
