import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdtemp, mkdir, readFile, writeFile, rm, access, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { captureHistorySnapshotForResults, DAILY_HISTORY_SUMMARY_MODE, exportHistoryBucketsToLegacy, getRiverHistory, summarizeSnapshots } from './history';
import { HISTORY_BUCKET_LAYOUT, HISTORY_BUCKET_MAX_BYTES, historyBucketForSlug, historyBucketName, historyStorageControlName,
  type HistoryStorageControl, type HistoryStorageSelection } from './history-buckets';
import * as blobStorage from './blob-storage';
import { forgetCache } from './server-cache';
import { listScoredRivers } from './rivers';
import { scoreRiverCondition } from './scoring';

const catalog = listScoredRivers();
const base = scoreRiverCondition({ river: catalog[0], gauge: null, weather: null });
const distinct = [catalog[0], catalog.find(route => historyBucketForSlug(route.slug) !== historyBucketForSlug(catalog[0].slug))!];
const result = (score: number, slug = distinct[0].slug) => ({ ...base, river: { ...base.river, slug }, score, rating: 'Fair' as const });
const prefix = 'river-history';
const dailyName = (slug = distinct[0].slug) => `${prefix}/daily/${slug}.json`;
const hourlyName = (date: string, slug = distinct[0].slug) => `${prefix}/hourly/${slug}/${date}.json`;
let root: string;
const read = async (name: string) => JSON.parse(await readFile(join(root, name), 'utf8'));
const control = async (): Promise<HistoryStorageControl> => read(historyStorageControlName(prefix));
async function seed(name: string, value: unknown) { const path = join(root, name); await mkdir(dirname(path), { recursive: true }); await writeFile(path, JSON.stringify(value)); }
async function physical(kind: 'hourly' | 'daily', period: string, slug = distinct[0].slug) {
  return historyBucketName(prefix, (await control()).generation, kind, period, historyBucketForSlug(slug));
}
async function capture(at: string, results = [result(60)], storageLayout: HistoryStorageSelection = 'auto') {
  vi.setSystemTime(new Date(at));
  return captureHistorySnapshotForResults({ results, now: new Date(at), storageLayout, dailySummaryMode: DAILY_HISTORY_SUMMARY_MODE });
}
const makeStorage = blobStorage.createJsonStorage;
function failWrites(predicate: (name: string) => boolean, message: string) {
  return vi.spyOn(blobStorage, 'createJsonStorage').mockImplementation(options => {
    const storage = makeStorage(options);
    return { ...storage, async writeJson(name, value, conditions) {
      if (predicate(name)) throw new Error(message);
      return storage.writeJson(name, value, conditions);
    } };
  });
}
beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'history-buckets-'));
  vi.useFakeTimers(); vi.setSystemTime(new Date('2026-11-04T16:00:00Z'));
  vi.stubEnv('RIVER_HISTORY_DIR', root); vi.stubEnv('RIVER_HISTORY_CONTAINER_SAS_URL', '');
  vi.stubEnv('RIVER_HISTORY_BLOB_PREFIX', prefix); vi.stubEnv('RIVER_HISTORY_STORAGE_LAYOUT', 'auto');
  vi.stubEnv('RIVER_HISTORY_WRITE_CONCURRENCY', '8'); forgetCache('history:', { prefix: true });
});
afterEach(async () => {
  vi.restoreAllMocks(); vi.unstubAllEnvs(); vi.useRealTimers(); forgetCache('history:', { prefix: true });
  if (dirname(root) !== tmpdir()) throw new Error('Unexpected temporary history directory');
  await rm(root, { recursive: true, force: true });
});

describe('bucketed history storage', () => {
  it('seeds existing hourly samples, preserves legacy files, follows auto, and finalizes a closed day', async () => {
    await capture('2026-11-04T16:00:00Z', [result(60)]);
    await capture('2026-11-04T17:00:00Z', [result(70)]);
    const legacy = await read(hourlyName('2026-11-04'));
    const migrated = await capture('2026-11-04T18:00:00Z', [result(80)], HISTORY_BUCKET_LAYOUT);
    expect(migrated).toMatchObject({ storageLayout: HISTORY_BUCKET_LAYOUT, hourlyBlobWrites: 1, bucketReadbacks: 1, dailyBlobWrites: 0 });
    expect(await read(hourlyName('2026-11-04'))).toEqual(legacy);
    await capture('2026-11-04T19:00:00Z', [result(90)]);
    await capture('2026-11-04T19:45:00Z', [result(100)]);
    const today = await getRiverHistory({ slug: distinct[0].slug });
    expect(today.todayHourly.map(row => row.score)).toEqual([60, 70, 80, 100]);
    expect(today.days).toMatchObject([{ date: '2026-11-04', sampleCount: 4, avgScore: 78 }]);
    const closed = await capture('2026-11-05T08:00:00Z', [result(50)]);
    expect(closed).toMatchObject({ dailySummaryWrites: 1, dailyBlobWrites: 1, hourlyBlobWrites: 1, bucketReadbacks: 2 });
    const daily = await read(await physical('daily', '2026-11'));
    expect(daily.routes[distinct[0].slug]).toMatchObject([{ date: '2026-11-04', sampleCount: 4 }]);
    await expect(read(dailyName())).rejects.toThrow();
  });

  it('partitions daily summaries across year/month boundaries without losing older legacy history', async () => {
    await seed(dailyName(), [{ date: '2026-12-20', avgScore: 50, minScore: 50, maxScore: 50, latestScore: 50,
      latestRating: 'Fair', sampleCount: 1, morningScore: 50, afternoonScore: null }]);
    await capture('2026-12-31T16:00:00Z', [result(60)], HISTORY_BUCKET_LAYOUT);
    await capture('2027-01-01T16:00:00Z', [result(70)]);
    await capture('2027-01-02T16:00:00Z', [result(80)]);
    expect((await control()).dailyMonths).toEqual(['2026-12', '2027-01']);
    expect((await getRiverHistory({ slug: distinct[0].slug, days: 10 })).days.map(day => day.date))
      .toEqual(['2026-12-20', '2026-12-31', '2027-01-01', '2027-01-02']);
    expect((await getRiverHistory({ slug: distinct[0].slug, days: 2 })).days.map(day => day.date)).toEqual(['2027-01-01', '2027-01-02']);
  });

  it('retains removed and newly introduced routes sharing the same bucket', async () => {
    const grouped = new Map<number, string[]>();
    for (const route of catalog) { const key = historyBucketForSlug(route.slug); grouped.set(key, [...(grouped.get(key) ?? []), route.slug]); }
    const slugs = [...grouped.values()].find(group => group.length >= 3)!.slice(0, 3);
    expect((await capture('2026-11-04T16:00:00Z', [result(50, slugs[0]), result(60, slugs[1])], HISTORY_BUCKET_LAYOUT)).hourlyBlobWrites).toBe(1);
    await capture('2026-11-04T17:00:00Z', [result(70, slugs[0])]);
    await capture('2026-11-04T18:00:00Z', [result(80, slugs[2])]);
    expect((await getRiverHistory({ slug: slugs[1] })).todayHourly).toHaveLength(1);
    const closed = await capture('2026-11-05T16:00:00Z', [result(90, slugs[0])]);
    expect(closed).toMatchObject({ dailySummaryWrites: 3, dailyBlobWrites: 1, finalizedDays: 3 });
    expect((await getRiverHistory({ slug: slugs[1] })).days).toMatchObject([{ date: '2026-11-04', sampleCount: 1 }]);
    expect(Object.keys((await read(await physical('daily', '2026-11', slugs[0]))).routes).sort()).toEqual([...slugs].sort());
  });

  it('keeps partial hourly captures discoverable and retries only the missing bucket', async () => {
    vi.stubEnv('RIVER_HISTORY_WRITE_CONCURRENCY', '1');
    const results = [result(60), result(80, distinct[1].slug)];
    await capture('2026-11-04T16:00:00Z', results);
    const failingBucket = `${String(historyBucketForSlug(distinct[1].slug)).padStart(2, '0')}.json`;
    const spy = failWrites(name => name.includes('/hourly/2026-11-04/') && name.endsWith('/' + failingBucket), 'injected bucket failure');
    await expect(capture('2026-11-04T17:00:00Z', results, HISTORY_BUCKET_LAYOUT)).rejects.toThrow('injected bucket'); spy.mockRestore();
    expect((await getRiverHistory({ slug: distinct[0].slug })).todayHourly).toHaveLength(2);
    expect((await getRiverHistory({ slug: distinct[1].slug })).todayHourly).toHaveLength(1);
    expect((await read(`${prefix}/_daily-finalization.json`)).pending['2026-11-04']).toHaveLength(2);
    const retried = await capture('2026-11-04T17:00:00Z', results);
    expect(retried.hourlyBlobWrites).toBe(1);
    expect((await getRiverHistory({ slug: distinct[1].slug })).todayHourly).toHaveLength(2);
  });

  it('does not publish finalization completion before every daily bucket is durable', async () => {
    vi.stubEnv('RIVER_HISTORY_WRITE_CONCURRENCY', '1');
    const results = [result(60), result(80, distinct[1].slug)];
    await capture('2026-11-04T16:00:00Z', results, HISTORY_BUCKET_LAYOUT);
    const failingBucket = `${String(historyBucketForSlug(distinct[1].slug)).padStart(2, '0')}.json`;
    const spy = failWrites(name => name.includes('/daily/2026-11/') && name.endsWith('/' + failingBucket), 'injected daily bucket failure');
    await expect(capture('2026-11-05T16:00:00Z', results)).rejects.toThrow('injected daily'); spy.mockRestore();
    expect((await getRiverHistory({ slug: distinct[1].slug })).days[0]).toMatchObject({ date: '2026-11-04', sampleCount: 1 });
    expect((await read(`${prefix}/_daily-finalization.json`)).pending['2026-11-04']).toHaveLength(2);
    const retried = await capture('2026-11-05T16:00:00Z', results);
    expect(retried).toMatchObject({ hourlyBlobWrites: 0, dailyBlobWrites: 1, dailySummaryWrites: 1 });
    expect((await read(`${prefix}/_daily-finalization.json`)).pending['2026-11-04']).toBeUndefined();
  });

  it('requires a verified export before legacy rollback and starts a fresh generation when reactivated', async () => {
    await capture('2026-11-04T16:00:00Z', [result(50)]);
    await capture('2026-11-04T17:00:00Z', [result(60)], HISTORY_BUCKET_LAYOUT);
    await capture('2026-11-05T16:00:00Z', [result(70)]);
    const before = await getRiverHistory({ slug: distinct[0].slug }); const generation = (await control()).generation;
    const archive = await physical('hourly', '2026-11-04');
    await expect(capture('2026-11-05T16:00:00Z', [result(70)], 'legacy')).rejects.toThrow('Export history');
    const spy = failWrites(name => name === hourlyName('2026-11-05'), 'injected legacy export failure');
    await expect(exportHistoryBucketsToLegacy()).rejects.toThrow('injected legacy'); spy.mockRestore();
    expect((await control()).activeLayout).toBe(HISTORY_BUCKET_LAYOUT);
    expect(await getRiverHistory({ slug: distinct[0].slug })).toEqual(before);
    expect(await exportHistoryBucketsToLegacy()).toMatchObject({ storageLayoutAfter: 'legacy', dailyFilesWritten: 1 });
    expect(await getRiverHistory({ slug: distinct[0].slug })).toEqual(before);
    expect((await read(dailyName()))[0]).toMatchObject({ date: '2026-11-04', sampleCount: 2 });
    await capture('2026-11-05T17:00:00Z', [result(80)]);
    await capture('2026-11-05T18:00:00Z', [result(90)], HISTORY_BUCKET_LAYOUT);
    expect((await control()).generation).not.toBe(generation);
    expect((await getRiverHistory({ slug: distinct[0].slug })).todayHourly.map(row => row.score)).toEqual([70, 80, 90]);
    await expect(access(join(root, archive))).resolves.toBeUndefined();
  });

  it('keeps bucket readers active when legacy export readback fails', async () => {
    await capture('2026-11-04T16:00:00Z', [result(60)], HISTORY_BUCKET_LAYOUT);
    const spy = vi.spyOn(blobStorage, 'createJsonStorage').mockImplementation(options => {
      const storage = makeStorage(options);
      return { ...storage, async readJson(name) {
        const value = await storage.readJson(name);
        if (name === hourlyName('2026-11-04') && value) return [] as typeof value;
        return value;
      } };
    });
    await expect(exportHistoryBucketsToLegacy()).rejects.toThrow('readback did not match'); spy.mockRestore();
    expect((await control()).activeLayout).toBe(HISTORY_BUCKET_LAYOUT);
    expect((await getRiverHistory({ slug: distinct[0].slug })).todayHourly).toHaveLength(1);
    expect(await exportHistoryBucketsToLegacy()).toMatchObject({ hourlyFilesWritten: 0, filesVerified: 1, storageLayoutAfter: 'legacy' });
  });

  it('drains in-flight bucket writes before releasing the capture lease after a failure', async () => {
    const events: string[] = []; let finish!: () => void;
    const gate = new Promise<void>(resolve => { finish = resolve; });
    const first = '/' + String(historyBucketForSlug(distinct[0].slug)).padStart(2, '0') + '.json';
    const spy = vi.spyOn(blobStorage, 'createJsonStorage').mockImplementation(options => {
      const storage = makeStorage(options);
      return { ...storage, async writeJson(name, value, conditions) {
        if (name.includes('/hourly/2026-11-04/')) {
          if (name.endsWith(first)) { events.push('first-started'); await gate; await storage.writeJson(name, value, conditions); events.push('first-finished'); return; }
          events.push('second-failed'); throw new Error('injected concurrent failure');
        }
        if (name.endsWith('/_capture-lease.json') && (value as { expiresAt?: string }).expiresAt === new Date(0).toISOString()) events.push('lease-released');
        return storage.writeJson(name, value, conditions);
      } };
    });
    let settled = false;
    const attempt = capture('2026-11-04T16:00:00Z', [result(60), result(80, distinct[1].slug)], HISTORY_BUCKET_LAYOUT)
      .finally(() => { settled = true; });
    void attempt.catch(() => {});
    await vi.waitFor(() => expect(events).toContain('second-failed'));
    expect(settled).toBe(false); expect(events).not.toContain('lease-released');
    finish(); await expect(attempt).rejects.toThrow('injected concurrent'); spy.mockRestore();
    expect(events.indexOf('first-finished')).toBeLessThan(events.indexOf('lease-released'));
  });

  it('refuses a valid bucket placed under the wrong date instead of silently reading legacy data', async () => {
    await capture('2026-11-04T16:00:00Z', [result(60)], HISTORY_BUCKET_LAYOUT);
    const name = await physical('hourly', '2026-11-04'); const bucket = await read(name);
    bucket.period = '2026-11-05'; for (const row of bucket.routes[distinct[0].slug]) row.localDate = bucket.period;
    await seed(name, bucket);
    await expect(getRiverHistory({ slug: distinct[0].slug })).rejects.toThrow('identity does not match');
  });

  it.each([
    { first: '2026-11-01T06:15:00Z', second: '2026-11-01T07:15:00Z', next: '2026-11-02T16:00:00Z', hours: ['01:00', '01:00'] },
    { first: '2026-03-08T07:15:00Z', second: '2026-03-08T08:15:00Z', next: '2026-03-09T16:00:00Z', hours: ['01:00', '03:00'] },
  ])('preserves actual samples across DST: $first', async ({ first, second, next, hours }) => {
    await capture(first, [result(50)], HISTORY_BUCKET_LAYOUT); await capture(second, [result(90)]);
    expect((await getRiverHistory({ slug: distinct[0].slug })).todayHourly.map(row => row.localHour)).toEqual(hours);
    await capture(next, [result(70)]);
    expect((await getRiverHistory({ slug: distinct[0].slug })).days[0]).toMatchObject({ sampleCount: 2, avgScore: 70 });
  });

  it('rejects oversized payloads before any hourly bucket is written, then recovers', async () => {
    const oversized = { ...result(60), gaugeBandLabel: 'x'.repeat(HISTORY_BUCKET_MAX_BYTES) };
    await expect(capture('2026-11-04T16:00:00Z', [oversized], HISTORY_BUCKET_LAYOUT)).rejects.toThrow('size limit');
    const name = await physical('hourly', '2026-11-04'); await expect(read(name)).rejects.toThrow();
    expect((await getRiverHistory({ slug: distinct[0].slug })).todayHourly).toEqual([]);
    expect((await capture('2026-11-04T16:00:00Z')).hourlyBlobWrites).toBe(1);
  });

  it('stores 1,392 routes in 32 verified hourly objects and skips identical retries', async () => {
    const results = Array.from({ length: 1392 }, (_, index) => result(60, `test-route-${String(index).padStart(4, '0')}`));
    const captured = await capture('2026-11-04T16:00:00Z', results, HISTORY_BUCKET_LAYOUT);
    expect(captured).toMatchObject({ routeCount: 1392, hourlyBlobWrites: 32, dailyBlobWrites: 0, bucketReadbacks: 32 });
    const directory = dirname(join(root, await physical('hourly', '2026-11-04', results[0].river.slug)));
    expect(await readdir(directory)).toHaveLength(32);
    expect(await capture('2026-11-04T16:00:00Z', results)).toMatchObject({ hourlyBlobWrites: 0, dailyBlobWrites: 0 });
    expect((await getRiverHistory({ slug: results.at(-1)!.river.slug })).todayHourly).toHaveLength(1);
  });
});
