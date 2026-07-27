import type { RiverDetailSnapshot } from './river-snapshots';
import type { RiverAlertState, RiverAlertThreshold } from './alerts';
import type { ConfidenceLabel, ScoreRating } from './types';

export const DEFAULT_ALERT_MAX_SNAPSHOT_AGE_MS = 2 * 60 * 60 * 1000;

export type AlertSnapshotIneligibility =
  | 'missing_snapshot'
  | 'stale_snapshot'
  | 'snapshot_not_live'
  | 'low_confidence';

export function alertSnapshotIneligibility(
  snapshot: RiverDetailSnapshot | null,
  now: Date,
  maxSnapshotAgeMs: number = DEFAULT_ALERT_MAX_SNAPSHOT_AGE_MS,
): AlertSnapshotIneligibility | null {
  if (!snapshot) {
    return 'missing_snapshot';
  }

  if (!isSnapshotFresh(snapshot, now, maxSnapshotAgeMs)) {
    return 'stale_snapshot';
  }

  if (snapshot.result.liveData.overall !== 'live') {
    return 'snapshot_not_live';
  }

  if (!confidenceEligible(snapshot.result.confidence.label)) {
    return 'low_confidence';
  }

  return null;
}

export function initialAlertStateForSnapshot(
  snapshot: RiverDetailSnapshot | null,
  threshold: RiverAlertThreshold,
  now: Date = new Date(),
  maxSnapshotAgeMs: number = DEFAULT_ALERT_MAX_SNAPSHOT_AGE_MS,
): RiverAlertState {
  if (alertSnapshotIneligibility(snapshot, now, maxSnapshotAgeMs) || !snapshot) {
    return 'below_threshold';
  }

  return alertStateForRating(snapshot.result.rating, threshold);
}

export function alertStateForRating(
  rating: ScoreRating,
  threshold: RiverAlertThreshold,
): RiverAlertState {
  return ratingRank(rating) >= thresholdRank(threshold)
    ? 'at_or_above_threshold'
    : 'below_threshold';
}

function thresholdRank(threshold: RiverAlertThreshold) {
  return threshold === 'strong' ? 3 : 2;
}

function ratingRank(rating: ScoreRating) {
  if (rating === 'Strong') return 3;
  if (rating === 'Good') return 2;
  if (rating === 'Fair') return 1;
  return 0;
}

function confidenceEligible(label: ConfidenceLabel) {
  return label === 'High' || label === 'Medium';
}

function isSnapshotFresh(snapshot: RiverDetailSnapshot, now: Date, maxSnapshotAgeMs: number) {
  const generatedAt = Date.parse(snapshot.generatedAt || snapshot.result.generatedAt || '');
  if (!Number.isFinite(generatedAt)) {
    return false;
  }

  const ageMs = now.getTime() - generatedAt;
  return ageMs >= -5 * 60 * 1000 && ageMs <= maxSnapshotAgeMs;
}
