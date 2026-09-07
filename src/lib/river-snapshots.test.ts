import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getStoredRiverSummarySnapshot,
  getStoredWeekendSummarySnapshot,
  getStoredRiverGroupSnapshot,
  isStoredSnapshotFresh,
  storedSnapshotMetadata,
} from './river-snapshots';
import { getRiverBySlug } from './rivers';

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
    expect(snapshot?.rivers.every((item) => Boolean(getRiverBySlug(item.river.slug)))).toBe(true);
  });
  it('serves an allowed stale Weekend snapshot without requiring a summary-only readiness field', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2027-01-01T00:00:00.000Z'));
    await expect(getStoredWeekendSummarySnapshot()).resolves.toBeNull();
    const snapshot = await getStoredWeekendSummarySnapshot({ allowStale: true });
    expect(snapshot?.snapshotStatus).toBe('stale');
    expect(snapshot?.rivers.length).toBeGreaterThan(0);
    expect(snapshot?.rivers[0].liveData.summary).toContain('latest successful Paddle Today snapshot');
    expect(snapshot?.rivers[0].liveData.overall).not.toBe('live');
    expect(snapshot?.rivers[0].weekend.label).toBeTruthy();
  });

  it('keeps difficulty choices and gauge metrics when rebuilding a river group from summary data', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2027-01-01T00:00:00.000Z'));
    const summary = await getStoredRiverSummarySnapshot({ allowStale: true });
    const riverId = summary?.rivers[0].river.riverId;
    expect(riverId).toBeTruthy();
    const snapshot = await getStoredRiverGroupSnapshot(riverId!, { allowStale: true });
    expect(snapshot?.result.routes.length).toBeGreaterThan(0);
    for (const route of snapshot!.result.routes) {
      expect(snapshot!.result.group.difficultyOptions).toContain(route.river.profile.difficulty);
      expect(route.river.gaugeSource.metric).toBe(getRiverBySlug(route.river.slug)!.gaugeSource.metric);
    }
  });

});
