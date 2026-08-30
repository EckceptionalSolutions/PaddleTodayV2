import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getStoredRiverSummarySnapshot,
  isStoredSnapshotFresh,
  storedSnapshotMetadata,
} from './river-snapshots';

const NOW = new Date('2026-07-27T04:00:00.000Z');

afterEach(() => {
  vi.useRealTimers();
});

describe('stored river snapshot freshness', () => {
  it('accepts a recent snapshot and small producer clock skew', () => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);

    expect(isStoredSnapshotFresh({ generatedAt: '2026-07-27T02:00:00.000Z' })).toBe(true);
    expect(isStoredSnapshotFresh({ generatedAt: '2026-07-27T04:05:00.000Z' })).toBe(true);
  });

  it('rejects stale, invalid, and implausibly future snapshots', () => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);

    expect(isStoredSnapshotFresh({ generatedAt: '2026-07-27T01:59:59.999Z' })).toBe(false);
    expect(isStoredSnapshotFresh({ generatedAt: 'not-a-date' })).toBe(false);
    expect(isStoredSnapshotFresh({ generatedAt: '2026-07-27T04:05:00.001Z' })).toBe(false);
  });

  it('retains valid old snapshots as stale fallback candidates', () => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);

    expect(storedSnapshotMetadata({ generatedAt: '2026-07-27T01:59:59.999Z' })).toEqual({
      snapshotStatus: 'stale',
      snapshotAgeSeconds: 7_200,
    });
    expect(storedSnapshotMetadata({ generatedAt: 'not-a-date' })).toBeNull();
    expect(storedSnapshotMetadata({ generatedAt: '2026-07-27T04:05:00.001Z' })).toBeNull();
  });

  it('serves an allowed stale summary with degraded route states', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2027-01-01T00:00:00.000Z'));

    await expect(getStoredRiverSummarySnapshot()).resolves.toBeNull();
    const snapshot = await getStoredRiverSummarySnapshot({ allowStale: true });

    expect(snapshot).toMatchObject({
      snapshotStatus: 'stale',
      snapshotAgeSeconds: expect.any(Number),
    });
    expect(snapshot?.rivers[0]?.liveData).toMatchObject({
      overall: 'degraded',
      gaugeState: 'stale',
      weatherState: 'stale',
    });
    expect(snapshot?.rivers[0]?.liveData.summary).toContain('latest successful Paddle Today snapshot');
  });
});
