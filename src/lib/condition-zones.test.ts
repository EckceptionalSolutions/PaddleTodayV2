import { describe, expect, it } from 'vitest';
import { conditionZoneIdForRiver } from './condition-zones';

const base = {
  riverId: 'cedar-river',
  name: 'Cedar River',
  gaugeSource: { provider: 'usgs' as const, siteId: '05457700', metric: 'discharge_cfs' as const },
  profile: {
    thresholdModel: 'two-sided' as const,
    idealMin: 400,
    idealMax: 600,
    tooLow: 200,
    tooHigh: 1200,
    rainfallSensitivity: 'medium' as const,
    seasonMonths: [4, 5, 6, 7, 8, 9],
  },
};

describe('condition zones', () => {
  it('groups routes with the same water-condition model', () => {
    expect(conditionZoneIdForRiver(base)).toBe(conditionZoneIdForRiver({ ...base, name: 'Cedar River reach 2' }));
  });

  it('separates routes when the gauge or threshold changes', () => {
    expect(conditionZoneIdForRiver(base)).not.toBe(
      conditionZoneIdForRiver({ ...base, gaugeSource: { ...base.gaugeSource, siteId: '05458000' } }),
    );
    expect(conditionZoneIdForRiver(base)).not.toBe(
      conditionZoneIdForRiver({ ...base, profile: { ...base.profile, idealMax: 900 } }),
    );
  });
});
