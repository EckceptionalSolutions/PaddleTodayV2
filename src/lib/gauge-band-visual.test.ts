import { describe, expect, it } from 'vitest';
import { gaugeBandVisualModel } from './gauge-band-visual';
import type { RiverDetailApiResult } from '@paddletoday/api-contract';

function input() {
  return { river: { gaugeSource: { unit: 'ft' }, profile: { thresholdModel: 'two-sided', idealMin: 2, idealMax: 4, tooLow: 1, tooHigh: 6 } },
    gauge: { current: 3, unit: 'ft' }, gaugeBand: 'ideal', gaugeBandLabel: 'Within preferred range' } as RiverDetailApiResult;
}

describe('shared water-range graphic', () => {
  it('places a preferred reading inside the preferred interval', () => {
    const model = gaugeBandVisualModel(input())!;
    expect(model.currentPercent).toBeGreaterThan(model.usableStart);
    expect(model.currentPercent).toBeLessThan(model.usableStart + model.usableWidth);
  });
  it('places low and high observations on the corresponding side', () => {
    const value = input(); value.gauge!.current = 0; value.gaugeBand = 'too-low';
    const low = gaugeBandVisualModel(value)!;
    expect(low.currentPercent).toBeLessThan(low.usableStart);
    expect(low.markerTone).toBe('skip');
    value.gauge!.current = 10; value.gaugeBand = 'too-high';
    const high = gaugeBandVisualModel(value)!;
    expect(high.currentPercent).toBeGreaterThan(high.usableStart + high.usableWidth);
    expect(high.currentPercent).toBeLessThanOrEqual(100);
  });
  it('keeps a zero-foot minimum and discloses the unknown upper limit', () => {
    const value = input(); value.river.profile.thresholdModel = 'minimum-only'; value.river.profile.tooLow = 0; value.gaugeBand = 'minimum-met';
    expect(gaugeBandVisualModel(value)).toMatchObject({ kind: 'minimum-only', highLabel: 'Upper limit unknown', targetLabel: 'Minimum 0 ft' });
  });
  it('does not interpret missing, unknown or mismatched-unit readings', () => {
    const value = input(); value.gaugeBand = 'unknown';
    expect(gaugeBandVisualModel(value)).toBeNull();
    value.gaugeBand = 'ideal'; value.gauge!.current = NaN;
    expect(gaugeBandVisualModel(value)).toBeNull();
    value.gauge!.current = 3; value.gauge!.unit = 'cfs';
    expect(gaugeBandVisualModel(value)).toBeNull();
  });
});
