import type { ScoreImpact } from './index';

export type ThresholdSourceStrength = 'official' | 'mixed' | 'community' | 'derived';
export type ThresholdModel = 'two-sided' | 'minimum-only';

export interface SourceStrengthViewModelOptions {
  thresholdModel?: ThresholdModel;
  sourceLabel?: string | null;
}

export interface SourceStrengthViewModel {
  strength: ThresholdSourceStrength;
  impact: ScoreImpact;
  badgeLabel: string;
  confidenceLabel: string;
  guidanceLabel: string;
  waterLevelLabel: string;
  detail: string | null;
}

export function buildSourceStrengthViewModel(
  strength: ThresholdSourceStrength,
  options: SourceStrengthViewModelOptions = {},
): SourceStrengthViewModel {
  const sourceLabel = options.sourceLabel?.trim() || null;

  switch (strength) {
    case 'official':
      return {
        strength,
        impact: 'positive',
        badgeLabel: 'Official',
        confidenceLabel: 'Official data source',
        guidanceLabel: 'Official numeric guidance',
        waterLevelLabel: 'Official water levels',
        detail: sourceLabel
          ? `Threshold guidance comes from an official published source. Current numeric thresholds are anchored by ${sourceLabel}.`
          : null,
      };
    case 'mixed':
      return {
        strength,
        impact: 'neutral',
        badgeLabel: 'Mixed',
        confidenceLabel: 'Official and local sources',
        guidanceLabel: 'Mixed-source numeric guidance',
        waterLevelLabel: 'Mixed sources',
        detail: sourceLabel
          ? `Thresholds are built from multiple source types rather than one official range. Current guidance is anchored by ${sourceLabel} and supporting notes.`
          : null,
      };
    case 'community':
      return {
        strength,
        impact: 'warning',
        badgeLabel: 'Community',
        confidenceLabel: 'Local route guidance',
        guidanceLabel: 'Community numeric guidance',
        waterLevelLabel: 'Paddler-reported levels',
        detail: sourceLabel
          ? `Thresholds currently lean on community trip reports. Current guidance is anchored by ${sourceLabel}, so leave yourself extra margin.`
          : null,
      };
    default:
      return {
        strength,
        impact: 'warning',
        badgeLabel: options.thresholdModel === 'minimum-only' ? 'Minimum' : 'Community',
        confidenceLabel: 'Partial source data',
        guidanceLabel: 'Derived numeric guidance',
        waterLevelLabel: 'Calculated water levels',
        detail: sourceLabel
          ? `Thresholds are built from partial evidence rather than a published range. Current guidance is anchored by ${sourceLabel}.`
          : null,
      };
  }
}
