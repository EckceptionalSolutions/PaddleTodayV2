import { describe, expect, it } from 'vitest';
import { buildScoreBreakdownViewModel } from './river-detail-view-model';

const breakdown = {
  riverQuality: 82,
  windAdjustment: -4,
  temperatureAdjustment: 0,
  rainAdjustment: -3,
  comfortAdjustment: 0,
  rawTripScore: 75,
  finalScore: 70,
  capReasons: ['Cold air limits today\'s score to 70 or lower.'],
  riverQualityExplanation: 'The river is in range.',
  windExplanation: 'Wind trims the score.',
  temperatureExplanation: 'Temperature is neutral.',
  rainExplanation: 'Rain is approaching.',
  comfortExplanation: 'No other adjustment.',
};

describe('river detail score breakdown view model', () => {
  it('builds platform-neutral rows, normalized cap copy, and summary text', () => {
    const model = buildScoreBreakdownViewModel(breakdown);

    expect(model.rows.map((row) => row.key)).toEqual([
      'riverQuality',
      'wind',
      'temperature',
      'rain',
      'limit',
    ]);
    expect(model.rows.at(-1)?.value).toBe(-5);
    expect(model.capReasons[0]).toContain('Cold air');
    expect(model.summary).toBe('River quality starts at 82. Weather shifts it to 70 today.');
  });

  it('can expose zero-value comfort while omitting a platform-owned limit row', () => {
    const model = buildScoreBreakdownViewModel(breakdown, {
      includeZeroComfort: true,
      includeLimit: false,
    });

    expect(model.rows.map((row) => row.key)).toContain('comfort');
    expect(model.rows.map((row) => row.key)).not.toContain('limit');
  });
});
