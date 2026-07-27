import {
  appendRiverAlertEvent,
  listRiverAlerts,
  updateRiverAlert,
  type RiverAlertState,
  type RiverThresholdAlert,
} from './alerts';
import { sendRiverAlertEmail } from './alert-email';
import { sendRiverAlertPush } from './alert-push';
import {
  alertSnapshotIneligibility,
  alertStateForRating,
  DEFAULT_ALERT_MAX_SNAPSHOT_AGE_MS,
} from './alert-policy';
import { getStoredRiverDetailSnapshot, type RiverDetailSnapshot } from './river-snapshots';

const DEFAULT_COOLDOWN_MS = 12 * 60 * 60 * 1000;
export const DEFAULT_ALERT_REARM_MS = 2 * 60 * 60 * 1000;

export async function evaluateRiverAlerts(args: {
  now?: Date;
  maxSnapshotAgeMs?: number;
  cooldownMs?: number;
  rearmMs?: number;
} = {}) {
  const now = args.now ?? new Date();
  const maxSnapshotAgeMs = args.maxSnapshotAgeMs ?? DEFAULT_ALERT_MAX_SNAPSHOT_AGE_MS;
  const cooldownMs = args.cooldownMs ?? DEFAULT_COOLDOWN_MS;
  const rearmMs = args.rearmMs ?? DEFAULT_ALERT_REARM_MS;
  const alerts = await listRiverAlerts({ activeOnly: true });

  const stats = {
    evaluated: 0,
    triggered: 0,
    skipped: 0,
    emailsSent: 0,
    emailFailures: 0,
    pushesSent: 0,
    pushFailures: 0,
    resetToBelow: 0,
    stayedAbove: 0,
    pendingRearm: 0,
  };

  for (const alert of alerts) {
    stats.evaluated += 1;
    const evaluatedAt = now.toISOString();
    const snapshot = await getStoredRiverDetailSnapshot(alert.riverSlug).catch((error) => {
      console.error('[alerts] snapshot read failed', {
        alertId: alert.id,
        riverSlug: alert.riverSlug,
        error,
      });
      return null;
    });

    const evaluation = evaluateAlertSnapshot(alert, snapshot, now, maxSnapshotAgeMs, cooldownMs, rearmMs);
    console.log('[alerts] evaluated', {
      alertId: alert.id,
      riverSlug: alert.riverSlug,
      threshold: alert.threshold,
      status: evaluation.status,
      reason: evaluation.reason,
    });

    if (evaluation.status === 'skip') {
      await updateRiverAlert(alert.id, {
        lastEvaluatedAt: evaluatedAt,
      });
      stats.skipped += 1;
      continue;
    }

    if (evaluation.status === 'stay_below') {
      await updateRiverAlert(alert.id, {
        lastEvaluatedAt: evaluatedAt,
      });
      continue;
    }

    if (evaluation.status === 'stay_above') {
      await updateRiverAlert(alert.id, {
        belowSince: null,
        lastEvaluatedAt: evaluatedAt,
      });
      stats.stayedAbove += 1;
      continue;
    }

    if (evaluation.status === 'pending_rearm') {
      await updateRiverAlert(alert.id, {
        belowSince: evaluation.belowSince,
        lastEvaluatedAt: evaluatedAt,
      });
      stats.pendingRearm += 1;
      continue;
    }

    if (evaluation.status === 'reset_below') {
      await updateRiverAlert(alert.id, {
        lastState: 'below_threshold',
        belowSince: null,
        lastEvaluatedAt: evaluatedAt,
        updatedAt: evaluatedAt,
      });
      stats.resetToBelow += 1;
      continue;
    }

    if (evaluation.status === 'cooldown') {
      await updateRiverAlert(alert.id, {
        lastState: 'at_or_above_threshold',
        belowSince: null,
        lastEvaluatedAt: evaluatedAt,
      });
      stats.skipped += 1;
      continue;
    }

    try {
      const delivery = alert.deliveryMethod === 'push'
        ? await sendRiverAlertPush({ alert, snapshot: evaluation.snapshot })
        : await sendRiverAlertEmail({ alert, snapshot: evaluation.snapshot });
      await appendRiverAlertEvent({
        alertId: alert.id,
        riverId: alert.riverId,
        riverSlug: alert.riverSlug,
        threshold: alert.threshold,
        triggeredScore: evaluation.snapshot.result.score,
        triggeredLabel: evaluation.snapshot.result.rating,
        message: delivery.subject,
        sentAt: now.toISOString(),
        deliveryMethod: alert.deliveryMethod ?? 'email',
        provider: delivery.provider,
        deliveryId: delivery.id,
        deliveryKey: delivery.deliveryKey,
        deliveryStatus: delivery.deliveryStatus,
      });
      await updateRiverAlert(alert.id, {
        lastState: 'at_or_above_threshold',
        belowSince: null,
        lastTriggeredAt: evaluatedAt,
        lastEvaluatedAt: evaluatedAt,
        updatedAt: evaluatedAt,
      });
      console.log('[alerts] triggered', {
        alertId: alert.id,
        riverSlug: alert.riverSlug,
        threshold: alert.threshold,
        provider: delivery.provider,
        deliveryId: delivery.id,
      });
      stats.triggered += 1;
      if (alert.deliveryMethod === 'push') {
        stats.pushesSent += 1;
      } else {
        stats.emailsSent += 1;
      }
    } catch (error) {
      console.error('[alerts] delivery failed', {
        alertId: alert.id,
        riverSlug: alert.riverSlug,
        threshold: alert.threshold,
        deliveryMethod: alert.deliveryMethod ?? 'email',
        error,
      });
      if (alert.deliveryMethod === 'push') {
        stats.pushFailures += 1;
      } else {
        stats.emailFailures += 1;
      }
    }
  }

  return stats;
}

export function evaluateAlertSnapshot(
  alert: Pick<RiverThresholdAlert, 'threshold' | 'lastState' | 'belowSince' | 'lastTriggeredAt'>,
  snapshot: RiverDetailSnapshot | null,
  now: Date,
  maxSnapshotAgeMs: number = DEFAULT_ALERT_MAX_SNAPSHOT_AGE_MS,
  cooldownMs: number = DEFAULT_COOLDOWN_MS,
  rearmMs: number = DEFAULT_ALERT_REARM_MS
):
  | { status: 'skip'; reason: string }
  | { status: 'stay_below'; reason: string }
  | { status: 'stay_above'; reason: string }
  | { status: 'pending_rearm'; reason: string; belowSince: string }
  | { status: 'reset_below'; reason: string }
  | { status: 'cooldown'; reason: string; snapshot: RiverDetailSnapshot }
  | { status: 'trigger'; reason: string; snapshot: RiverDetailSnapshot } {
  const ineligibility = alertSnapshotIneligibility(snapshot, now, maxSnapshotAgeMs);
  if (ineligibility || !snapshot) {
    return { status: 'skip', reason: ineligibility ?? 'missing_snapshot' };
  }

  const currentState: RiverAlertState = alertStateForRating(snapshot.result.rating, alert.threshold);

  if (currentState === 'below_threshold') {
    if (alert.lastState === 'at_or_above_threshold') {
      const belowSince = validTimestamp(alert.belowSince) ?? now.getTime();
      if (now.getTime() - belowSince < rearmMs) {
        return {
          status: 'pending_rearm',
          reason: 'awaiting_sustained_drop',
          belowSince: new Date(belowSince).toISOString(),
        };
      }
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

function validTimestamp(value: string | null | undefined) {
  if (!value) {
    return null;
  }
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}
