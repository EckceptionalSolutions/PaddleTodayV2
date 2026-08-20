import type { RiverScoringProfile } from './types';

export interface ScoringProfileIssue {
  code:
    | 'missing-minimum'
    | 'incomplete-two-sided-thresholds'
    | 'invalid-ideal-range'
    | 'invalid-threshold-order'
    | 'collapsed-low-shoulder'
    | 'collapsed-high-shoulder';
  severity: 'error' | 'warning';
  message: string;
}

export function validateScoringProfile(profile: RiverScoringProfile): ScoringProfileIssue[] {
  if (profile.thresholdModel === 'minimum-only') {
    const minimum = typeof profile.tooLow === 'number' ? profile.tooLow : profile.idealMin;
    return Number.isFinite(minimum)
      ? []
      : [{
          code: 'missing-minimum',
          severity: 'warning',
          message: 'Minimum-only guidance has no finite floor, so telemetry can be shown only as unscored context.',
        }];
  }

  const values = [profile.tooLow, profile.idealMin, profile.idealMax, profile.tooHigh];
  if (!values.every((value) => typeof value === 'number' && Number.isFinite(value))) {
    return [{
      code: 'incomplete-two-sided-thresholds',
      severity: 'error',
      message: 'Two-sided guidance requires finite tooLow, idealMin, idealMax, and tooHigh thresholds.',
    }];
  }

  const tooLow = profile.tooLow as number;
  const idealMin = profile.idealMin as number;
  const idealMax = profile.idealMax as number;
  const tooHigh = profile.tooHigh as number;
  const issues: ScoringProfileIssue[] = [];

  if (idealMin >= idealMax) {
    issues.push({ code: 'invalid-ideal-range', severity: 'error', message: 'idealMin must be lower than idealMax.' });
  }
  if (tooLow > idealMin || idealMax > tooHigh) {
    issues.push({
      code: 'invalid-threshold-order',
      severity: 'error',
      message: 'Thresholds must satisfy tooLow <= idealMin < idealMax <= tooHigh.',
    });
  }
  if (tooLow === idealMin) {
    issues.push({
      code: 'collapsed-low-shoulder',
      severity: 'warning',
      message: 'The low shoulder is collapsed; scoring will taper continuously outside the ideal edge.',
    });
  }
  if (idealMax === tooHigh) {
    issues.push({
      code: 'collapsed-high-shoulder',
      severity: 'warning',
      message: 'The high shoulder is collapsed; scoring will taper continuously outside the ideal edge.',
    });
  }

  return issues;
}
