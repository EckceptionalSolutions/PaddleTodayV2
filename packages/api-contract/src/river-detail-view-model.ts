import type { ScoreBreakdown } from './index';
import { friendlyCapReason } from './presentation';

export type ScoreBreakdownRowKey =
  | 'riverQuality'
  | 'wind'
  | 'temperature'
  | 'rain'
  | 'comfort'
  | 'limit';

export interface ScoreBreakdownViewModelRow {
  key: ScoreBreakdownRowKey;
  value: number;
  explanation: string;
}

export interface ScoreBreakdownViewModel {
  rows: ScoreBreakdownViewModelRow[];
  capReasons: string[];
  summary: string;
  finalScore: number;
}

export function buildScoreBreakdownViewModel(
  breakdown: ScoreBreakdown,
  {
    includeZeroComfort = false,
    includeLimit = true,
  }: {
    includeZeroComfort?: boolean;
    includeLimit?: boolean;
  } = {},
): ScoreBreakdownViewModel {
  const rows: ScoreBreakdownViewModelRow[] = [
    {
      key: 'riverQuality',
      value: breakdown.riverQuality,
      explanation: breakdown.riverQualityExplanation,
    },
    {
      key: 'wind',
      value: breakdown.windAdjustment,
      explanation: breakdown.windExplanation,
    },
    {
      key: 'temperature',
      value: breakdown.temperatureAdjustment,
      explanation: breakdown.temperatureExplanation,
    },
    {
      key: 'rain',
      value: breakdown.rainAdjustment,
      explanation: breakdown.rainExplanation,
    },
  ];

  if (includeZeroComfort || breakdown.comfortAdjustment !== 0) {
    rows.push({
      key: 'comfort',
      value: breakdown.comfortAdjustment,
      explanation: breakdown.comfortExplanation,
    });
  }

  if (includeLimit && breakdown.finalScore !== breakdown.rawTripScore) {
    rows.push({
      key: 'limit',
      value: breakdown.finalScore - breakdown.rawTripScore,
      explanation: 'A safety or confidence limit was applied to the raw trip score.',
    });
  }

  return {
    rows,
    capReasons: breakdown.capReasons
      .map((reason) => friendlyCapReason(reason))
      .filter(Boolean),
    summary: `River quality starts at ${breakdown.riverQuality}. Weather shifts it to ${breakdown.finalScore} today.`,
    finalScore: breakdown.finalScore,
  };
}
