import type { ScoreRating, TripOutcomeVerdict } from '@paddletoday/api-contract';
import type { RouteContributionSubmission } from './route-contributions';

export interface CalibrationGroupMetric {
  key: string;
  sampleSize: number;
  agreementCount: number;
  agreementRate: number | null;
}

export interface ScoringCalibrationMetrics {
  totalOutcomes: number;
  approvedOutcomes: number;
  comparableOutcomes: number;
  agreementCount: number;
  agreementRate: number | null;
  safetyFalsePositives: number;
  unsafeFalseNegatives: number;
  incompleteSnapshots: number;
  confusionMatrix: Record<ScoreRating, Record<TripOutcomeVerdict, number>>;
  byThresholdModel: CalibrationGroupMetric[];
  bySourceStrength: CalibrationGroupMetric[];
  sampleWarning: string | null;
}

const APP_RATINGS: ScoreRating[] = ['Strong', 'Good', 'Fair', 'No-go'];
const OBSERVED_VERDICTS: TripOutcomeVerdict[] = ['excellent', 'good', 'fair', 'poor', 'unsafe'];

export function buildScoringCalibrationMetrics(
  submissions: RouteContributionSubmission[]
): ScoringCalibrationMetrics {
  const allOutcomes = submissions.filter((submission) => submission.scoringOutcome);
  const approved = allOutcomes.filter((submission) => submission.status === 'approved');
  const comparable = approved.filter((submission) => submission.scoringOutcome?.appRating);
  const confusionMatrix = Object.fromEntries(
    APP_RATINGS.map((rating) => [
      rating,
      Object.fromEntries(OBSERVED_VERDICTS.map((verdict) => [verdict, 0])),
    ])
  ) as ScoringCalibrationMetrics['confusionMatrix'];

  let agreementCount = 0;
  let safetyFalsePositives = 0;
  let unsafeFalseNegatives = 0;
  for (const submission of comparable) {
    const outcome = submission.scoringOutcome!;
    const appRating = outcome.appRating!;
    confusionMatrix[appRating][outcome.overallVerdict] += 1;
    if (observedRating(outcome.overallVerdict) === appRating) agreementCount += 1;
    if (appRating === 'No-go' && ['good', 'excellent'].includes(outcome.overallVerdict)) {
      safetyFalsePositives += 1;
    }
    if (appRating !== 'No-go' && outcome.overallVerdict === 'unsafe') {
      unsafeFalseNegatives += 1;
    }
  }

  const incompleteSnapshots = approved.filter((submission) => {
    const outcome = submission.scoringOutcome!;
    return outcome.appScore === undefined || !outcome.appRating || !outcome.decisionCapturedAt;
  }).length;

  return {
    totalOutcomes: allOutcomes.length,
    approvedOutcomes: approved.length,
    comparableOutcomes: comparable.length,
    agreementCount,
    agreementRate: rate(agreementCount, comparable.length),
    safetyFalsePositives,
    unsafeFalseNegatives,
    incompleteSnapshots,
    confusionMatrix,
    byThresholdModel: groupMetrics(comparable, (submission) => submission.scoringOutcome?.thresholdModel ?? 'unknown'),
    bySourceStrength: groupMetrics(comparable, (submission) => submission.scoringOutcome?.thresholdSourceStrength ?? 'unknown'),
    sampleWarning:
      comparable.length < 30
        ? `Only ${comparable.length} approved comparable outcome${comparable.length === 1 ? '' : 's'}; treat rates as directional until at least 30 are collected.`
        : null,
  };
}

function observedRating(verdict: TripOutcomeVerdict): ScoreRating {
  if (verdict === 'excellent') return 'Strong';
  if (verdict === 'good') return 'Good';
  if (verdict === 'fair') return 'Fair';
  return 'No-go';
}

function groupMetrics(
  submissions: RouteContributionSubmission[],
  keyFor: (submission: RouteContributionSubmission) => string
): CalibrationGroupMetric[] {
  const groups = new Map<string, { sampleSize: number; agreementCount: number }>();
  for (const submission of submissions) {
    const key = keyFor(submission);
    const current = groups.get(key) ?? { sampleSize: 0, agreementCount: 0 };
    current.sampleSize += 1;
    if (submission.scoringOutcome?.appRating === observedRating(submission.scoringOutcome!.overallVerdict)) {
      current.agreementCount += 1;
    }
    groups.set(key, current);
  }
  return [...groups.entries()]
    .map(([key, value]) => ({ ...value, key, agreementRate: rate(value.agreementCount, value.sampleSize) }))
    .sort((left, right) => right.sampleSize - left.sampleSize || left.key.localeCompare(right.key));
}

function rate(numerator: number, denominator: number) {
  return denominator > 0 ? Math.round((numerator / denominator) * 1000) / 10 : null;
}
