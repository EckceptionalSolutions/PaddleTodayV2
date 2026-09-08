import type { DecisionReadinessStatus } from './today-board';

// Scheduled snapshots are expected every 30 minutes. This is the existing
// server policy, shared with clients that retain responses in memory.
export const SNAPSHOT_MAX_AGE_MS = 2 * 60 * 60 * 1000;
export const SNAPSHOT_MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;

export function snapshotFreshnessMetadata(snapshot: { generatedAt: string }, now = Date.now()) {
  const timestamp = Date.parse(snapshot.generatedAt);
  if (!Number.isFinite(timestamp)) return null;
  const ageMs = now - timestamp;
  if (ageMs < -SNAPSHOT_MAX_CLOCK_SKEW_MS) return null;
  return { snapshotStatus: ageMs <= SNAPSHOT_MAX_AGE_MS ? 'fresh' as const : 'stale' as const,
    snapshotAgeSeconds: Math.max(0, Math.floor(ageMs / 1000)) };
}

export function staleSnapshotReadiness<T extends { status: DecisionReadinessStatus; label: string; reason: string }>(readiness: T): T {
  if (readiness.status !== 'ready') return readiness;
  return { ...readiness, status: 'withheld', label: 'Not enough data',
    reason: `${readiness.reason} This stored snapshot is stale, so Paddle Today is withholding a current call until the live sources refresh.` };
}
