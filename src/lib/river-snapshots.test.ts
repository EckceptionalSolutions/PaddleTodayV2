import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getStoredRiverSummarySnapshot,
  getStoredWeekendSummarySnapshot,
  getStoredRiverGroupSnapshot,
  isStoredSnapshotFresh,
  storedSnapshotMetadata,
} from './river-snapshots';
import { getRiverBySlug } from './rivers';
import { forgetCache } from './server-cache';
import { readFile } from 'node:fs/promises';
import * as blobStorage from './blob-storage';

const NOW = new Date('2026-07-27T04:00:00.000Z');

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  forgetCache('snapshot:', { prefix: true });
});

describe('stored river snapshot freshness', () => {
  it('reuses normalized data within a generation while updating age and stale readiness', async () => {
    const original = JSON.parse(await readFile('tmp-summary.json', 'utf8'));
    const createStorage = blobStorage.createJsonStorage;
    vi.spyOn(blobStorage, 'createJsonStorage').mockImplementation(options => ({
      ...createStorage(options),
      async readJson<T>() { return original as T; },
    }));
    vi.useFakeTimers();
    forgetCache('snapshot:', { prefix: true });
    vi.setSystemTime(new Date(Date.parse(original.generatedAt) + 1000));
    const first = await getStoredRiverSummarySnapshot({ allowStale: true });
    vi.advanceTimersByTime(1000);
    const second = await getStoredRiverSummarySnapshot({ allowStale: true });
    expect(second?.rivers).toBe(first?.rivers);
    expect(second?.snapshotAgeSeconds).toBe((first?.snapshotAgeSeconds ?? 0) + 1);
    vi.setSystemTime(new Date(Date.parse(original.generatedAt) + 7200001));
    const stale = await getStoredRiverSummarySnapshot({ allowStale: true });
    expect(stale?.snapshotStatus).toBe('stale');
    expect(stale?.rivers).not.toBe(first?.rivers);
    expect(stale?.rivers.every(item => item.readiness.status !== 'ready')).toBe(true);
    expect(first?.snapshotStatus).toBe('fresh');
    forgetCache('snapshot:', { prefix: true });
  });
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
