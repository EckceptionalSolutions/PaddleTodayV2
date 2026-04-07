import {
  appendRiverAlertEvent,
  listRiverAlerts,
  updateRiverAlert,
  type RiverAlertState,
  type RiverThresholdAlert,
} from './alerts';
import { sendRiverAlertEmail } from './alert-email';
import { getStoredRiverDetailSnapshot, type RiverDetailSnapshot } from './river-snapshots';
import type { ConfidenceLabel, ScoreRating } from './types';

const DEFAULT_MAX_SNAPSHOT_AGE_MS = 2 * 60 * 60 * 1000;
const DEFAULT_COOLDOWN_MS = 12 * 60 * 60 * 1000;

export async function evaluateRiverAlerts(args: {
  now?: Date;
  maxSnapshotAgeMs?: number;
  cooldownMs?: number;
} = {}) {
  const now = args.now ?? new Date();
  const maxSnapshotAgeMs = args.maxSnapshotAgeMs ?? DEFAULT_MAX_SNAPSHOT_AGE_MS;
  const cooldownMs = args.cooldownMs ?? DEFAULT_COOLDOWN_MS;
  const alerts = await listRiverAlerts({ activeOnly: true });

  const stats = {
    evaluated: 0,
    triggered: 0,
    skipped: 0,
    emailsSent: 0,
    emailFailures: 0,
    resetToBelow: 0,
    stayedAbove: 0,
  };

  for (const alert of alerts) {
    stats.evaluated += 1;
    const snapshot = await getStoredRiverDetailSnapshot(alert.riverSlug).catch((error) => {
      console.error('[alerts] snapshot read failed', {
        alertId: alert.id,
        riverSlug: alert.riverSlug,
        error,
      });
      return null;
    });

    const evaluation = evaluateAlertSnapshot(alert, snapshot, now, maxSnapshotAgeMs, cooldownMs);
    console.log('[alerts] evaluated', {
      alertId: alert.id,
      riverSlug: alert.riverSlug,
      threshold: alert.threshold,
      status: evaluation.status,
      reason: evaluation.reason,
    });

    if (evaluation.status === 'skip') {
      stats.skipped += 1;
      continue;
    }

    if (evaluation.status === 'stay_below') {
      continue;
    }

    if (evaluation.status === 'stay_above') {
      stats.stayedAbove += 1;
      continue;
    }

    if (evaluation.status === 'reset_below') {
      await updateRiverAlert(alert.id, {
        lastState: 'below_threshold',
        updatedAt: now.toISOString(),
      });
      stats.resetToBelow += 1;
      continue;
    }

    if (evaluation.status === 'cooldown') {
      await updateRiverAlert(alert.id, {
        lastState: 'at_or_above_threshold',
        updatedAt: now.toISOString(),
      });
      stats.skipped += 1;
      continue;
    }

    try {
      const delivery = await sendRiverAlertEmail({
        alert,
        snapshot: evaluation.snapshot,
      });
      await appendRiverAlertEvent({
        alertId: alert.id,
        riverId: alert.riverId,
        riverSlug: alert.riverSlug,
        threshold: alert.threshold,
        triggeredScore: evaluation.snapshot.result.score,
        triggeredLabel: evaluation.snapshot.result.rating,
        message: delivery.subject,
        sentAt: now.toISOString(),
      });
      await updateRiverAlert(alert.id, {
        lastState: 'at_or_above_threshold',
        lastTriggeredAt: now.toISOString(),
        updatedAt: now.toISOString(),
      });
      console.log('[alerts] triggered', {
        alertId: alert.id,
        riverSlug: alert.riverSlug,
        threshold: alert.threshold,
        provider: delivery.provider,
        emailId: delivery.id,
      });
      stats.triggered += 1;
      stats.emailsSent += 1;
    } catch (error) {
      console.error('[alerts] email failed', {
        alertId: alert.id,
        riverSlug: alert.riverSlug,
        threshold: alert.threshold,
        error,
      });
      stats.emailFailures += 1;
    }
  }

  return stats;
}

export function evaluateAlertSnapshot(
  alert: Pick<RiverThresholdAlert, 'threshold' | 'lastState' | 'lastTriggeredAt'>,
  snapshot: RiverDetailSnapshot | null,
  now: Date,
  maxSnapshotAgeMs: number = DEFAULT_MAX_SNAPSHOT_AGE_MS,
  cooldownMs: number = DEFAULT_COOLDOWN_MS
):
  | { status: 'skip'; reason: string }
  | { status: 'stay_below'; reason: string }
  | { status: 'stay_above'; reason: string }
  | { status: 'reset_below'; reason: string }
  | { status: 'cooldown'; reason: string; snapshot: RiverDetailSnapshot }
  | { status: 'trigger'; reason: string; snapshot: RiverDetailSnapshot } {
  if (!snapshot) {
    return { status: 'skip', reason: 'missing_snapshot' };
  }

  if (!isSnapshotFresh(snapshot, now, maxSnapshotAgeMs)) {
    return { status: 'skip', reason: 'stale_snapshot' };
  }

  if (snapshot.result.liveData.overall !== 'live') {
    return { status: 'skip', reason: 'snapshot_not_live' };
  }

  if (!confidenceEligible(snapshot.result.confidence.label)) {
    return { status: 'skip', reason: 'low_confidence' };
  }

  const currentState: RiverAlertState = meetsThreshold(snapshot.result.rating, alert.threshold)
    ? 'at_or_above_threshold'
    : 'below_threshold';

  if (currentState === 'below_threshold') {
    if (alert.lastState === 'at_or_above_threshold') {
      return { status: 'reset_below', reason: 'dropped_below_threshold' };
    }
    return { status: 'stay_below', reason: 'still_below_threshold' };
  }

  if (alert.lastState === 'at_or_above_threshold') {
    return { status: 'stay_above', reason: 'already_above_threshold' };
  }

  if (withinCooldown(alert.lastTriggeredAt, now, cooldownMs)) {
    return { status: 'cooldown', reason: 'cooldown_active', snapshot };
  }

  return { status: 'trigger', reason: 'crossed_threshold', snapshot };
}

function meetsThreshold(rating: ScoreRating, threshold: RiverThresholdAlert['threshold']) {
  return ratingRank(rating) >= thresholdRank(threshold);
}

function thresholdRank(threshold: RiverThresholdAlert['threshold']) {
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

  return now.getTime() - generatedAt <= maxSnapshotAgeMs;
}

function withinCooldown(lastTriggeredAt: string | null, now: Date, cooldownMs: number) {
  if (!lastTriggeredAt) {
    return false;
  }

  const parsed = Date.parse(lastTriggeredAt);
  if (!Number.isFinite(parsed)) {
    return false;
  }

  return now.getTime() - parsed < cooldownMs;
}
