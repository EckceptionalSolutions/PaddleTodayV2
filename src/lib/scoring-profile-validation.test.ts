import { describe, expect, it } from 'vitest';
import type { RiverScoringProfile } from './types';
import { validateScoringProfile } from './scoring-profile-validation';

const profile: RiverScoringProfile = {
  thresholdModel: 'two-sided',
  tooLow: 200,
  idealMin: 300,
  idealMax: 700,
  tooHigh: 900,
  thresholdSource: { label: 'Test', url: 'https://example.com' },
  thresholdSourceStrength: 'official',
  rainfallSensitivity: 'medium',
  seasonMonths: [5, 6, 7, 8, 9],
  seasonNotes: 'Test season.',
  difficulty: 'easy',
  difficultyNotes: 'Test difficulty.',
  confidenceNotes: 'Test confidence.',
};

describe('validateScoringProfile', () => {
  it('accepts ordered two-sided thresholds', () => {
    expect(validateScoringProfile(profile)).toEqual([]);
  });

  it('rejects reversed and non-finite thresholds', () => {
    expect(validateScoringProfile({ ...profile, idealMin: 800 })).toEqual([
      expect.objectContaining({ code: 'invalid-ideal-range', severity: 'error' }),
    ]);
    expect(validateScoringProfile({ ...profile, tooHigh: Number.NaN })).toEqual([
      expect.objectContaining({ code: 'incomplete-two-sided-thresholds', severity: 'error' }),
    ]);
  });

  it('allows collapsed shoulders but reports that continuous tapering is active', () => {
    expect(validateScoringProfile({ ...profile, tooLow: 300, tooHigh: 700 })).toEqual([
      expect.objectContaining({ code: 'collapsed-low-shoulder', severity: 'warning' }),
      expect.objectContaining({ code: 'collapsed-high-shoulder', severity: 'warning' }),
    ]);
  });

  it('marks minimum-only profiles without a floor as context-only', () => {
    expect(validateScoringProfile({
      ...profile,
      thresholdModel: 'minimum-only',
      tooLow: undefined,
      idealMin: undefined,
      idealMax: undefined,
      tooHigh: undefined,
    })).toEqual([
      expect.objectContaining({ code: 'missing-minimum', severity: 'warning' }),
    ]);
  });
});
