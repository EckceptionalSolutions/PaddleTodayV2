import { describe, expect, it } from 'vitest';
import { buildSourceStrengthViewModel } from './source-strength-view-model';

describe('source strength view model', () => {
  it('provides consistent copy variants and semantic impacts', () => {
    expect(buildSourceStrengthViewModel('official')).toMatchObject({
      impact: 'positive',
      badgeLabel: 'Official',
      confidenceLabel: 'Official data source',
      guidanceLabel: 'Official numeric guidance',
      waterLevelLabel: 'Official water levels',
    });
    expect(buildSourceStrengthViewModel('mixed')).toMatchObject({
      impact: 'neutral',
      badgeLabel: 'Mixed',
      confidenceLabel: 'Official and local sources',
      guidanceLabel: 'Mixed-source numeric guidance',
      waterLevelLabel: 'Mixed sources',
    });
    expect(buildSourceStrengthViewModel('community')).toMatchObject({
      impact: 'warning',
      confidenceLabel: 'Local route guidance',
      waterLevelLabel: 'Paddler-reported levels',
    });
  });

  it('preserves minimum-only badges and builds source-specific detail', () => {
    expect(buildSourceStrengthViewModel('derived', {
      thresholdModel: 'minimum-only',
      sourceLabel: 'Local calibration',
    })).toEqual({
      strength: 'derived',
      impact: 'warning',
      badgeLabel: 'Minimum',
      confidenceLabel: 'Partial source data',
      guidanceLabel: 'Derived numeric guidance',
      waterLevelLabel: 'Calculated water levels',
      detail: 'Thresholds are built from partial evidence rather than a published range. Current guidance is anchored by Local calibration.',
    });
  });
});
