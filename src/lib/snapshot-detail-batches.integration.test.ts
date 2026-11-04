import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as blobs from './blob-storage';
import { captureRiverSnapshots, getStoredRiverDetailSnapshot } from './river-snapshots';
import { DETAIL_BATCH_FORMAT, detailBucketForSlug } from './snapshot-detail-batches';
import { listScoredRivers } from './rivers';
import { scoreRiverCondition } from './scoring';
import { serializeDetailResult } from './api-contract';
import { forgetCache, getCacheStats } from './server-cache';

const NOW = new Date('2026-11-04T12:00:00Z');
const results = listScoredRivers().slice(0, 100).map(river => scoreRiverCondition({ river, gauge: null, weather: null }));
let store: Map<string, any>;
let writes: string[];
let reads: string[];
let failedWrite: string | null;

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
  vi.stubEnv('RIVER_SNAPSHOT_CONTAINER_SAS_URL', '');
  vi.stubEnv('RIVER_SNAPSHOT_BLOB_PREFIX', 'river-snapshots');
  vi.stubEnv('RIVER_SNAPSHOT_DETAIL_LAYOUT', 'legacy');
  forgetCache('snapshot:', { prefix: true });
  store = new Map(); writes = []; reads = []; failedWrite = null;
  const create = blobs.createJsonStorage;
  vi.spyOn(blobs, 'createJsonStorage').mockImplementation(options => ({
    ...create(options),
    async readJson<T>(name: string) {
      reads.push(name);
      const value = store.get(name) ?? null;
      if (value && !options.validate(value)) throw new Error('Invalid snapshot');
      return value as T;
    },
    async writeJson(name, value) {
      if (name === failedWrite) throw new Error('write failed');
      writes.push(name); store.set(name, structuredClone(value));
    },
  }));
});
afterEach(() => {
  vi.restoreAllMocks(); vi.unstubAllEnvs(); vi.useRealTimers(); forgetCache('snapshot:', { prefix: true });
});

describe('batched snapshot writer and compatible readers', () => {
  it('writes 32 fixed buckets and two summaries while preserving full detail contracts', async () => {
    await captureRiverSnapshots({ results, generatedAt: NOW.toISOString(), detailLayout: DETAIL_BATCH_FORMAT });
    expect(writes).toHaveLength(34);
    expect(writes.slice(-2)).toEqual(['river-snapshots/weekend-summary.json', 'river-snapshots/summary.json']);
    expect(writes.some(name => name.includes('/details/'))).toBe(false);
    expect(store.get('river-snapshots/summary.json').detailLayout).toBe(DETAIL_BATCH_FORMAT);
    const result = await getStoredRiverDetailSnapshot(results[0].river.slug);
    expect(result?.result).toMatchObject(serializeDetailResult({ ...results[0], generatedAt: NOW.toISOString() }));
    expect(result?.snapshotStatus).toBe('fresh');
  });

  it('reads legacy blobs when the published writer uses the old format, including rollback', async () => {
    await captureRiverSnapshots({ results: results.slice(0, 2), generatedAt: NOW.toISOString(), detailLayout: DETAIL_BATCH_FORMAT });
    const later = new Date(NOW.getTime() + 60_000).toISOString();
    await captureRiverSnapshots({ results: results.slice(0, 2), generatedAt: later, detailLayout: 'legacy' });
    const result = await getStoredRiverDetailSnapshot(results[0].river.slug);
    expect(result?.generatedAt).toBe(later);
    expect(store.get('river-snapshots/summary.json').detailLayout).toBeUndefined();
    expect(reads).toContain(`river-snapshots/details/${results[0].river.slug}.json`);
  });

  it('shares a bounded bucket cache between route reads and concurrent requests', async () => {
    await captureRiverSnapshots({ results, generatedAt: NOW.toISOString(), detailLayout: DETAIL_BATCH_FORMAT });
    const first = results[0];
    const second = results.find(r => r.river.slug !== first.river.slug
      && detailBucketForSlug(r.river.slug) === detailBucketForSlug(first.river.slug))!;
    expect(second).toBeTruthy();
    await Promise.all([first, first, second].map(r => getStoredRiverDetailSnapshot(r.river.slug)));
    expect(reads.filter(name => name.includes('/detail-buckets-v1/'))).toHaveLength(1);
    for (const r of results) await getStoredRiverDetailSnapshot(r.river.slug);
    expect(getCacheStats().namespaces['snapshot-detail-buckets'].entries).toBeLessThanOrEqual(8);
  });

  it.each(['missing', 'corrupt', 'older'])('uses the published summary when a bucket is %s, without serving obsolete legacy detail', async state => {
    await captureRiverSnapshots({ results: results.slice(0, 2), generatedAt: NOW.toISOString(), detailLayout: DETAIL_BATCH_FORMAT });
    const slug = results[0].river.slug;
    const name = `river-snapshots/detail-buckets-v1/${String(detailBucketForSlug(slug)).padStart(2, '0')}.json`;
    if (state === 'missing') store.delete(name);
    if (state === 'corrupt') store.set(name, { invalid: true });
    if (state === 'older') store.get(name).generatedAt = '2026-11-04T11:00:00Z';
    const result = await getStoredRiverDetailSnapshot(slug);
    expect(result?.generatedAt).toBe(NOW.toISOString());
    expect(result?.result.river.slug).toBe(slug);
    expect(reads.some(name => name.includes('/details/'))).toBe(false);
  });

  it('keeps the stale-data boundary and degrades readiness after two hours', async () => {
    await captureRiverSnapshots({ results: results.slice(0, 2), generatedAt: NOW.toISOString(), detailLayout: DETAIL_BATCH_FORMAT });
    vi.setSystemTime(new Date(NOW.getTime() + 7_200_001));
    expect(await getStoredRiverDetailSnapshot(results[0].river.slug)).toBeNull();
    const stale = await getStoredRiverDetailSnapshot(results[0].river.slug, { allowStale: true });
    expect(stale?.snapshotStatus).toBe('stale');
    expect(stale?.result.readiness.status).not.toBe('ready');
  });

  it('does not publish summaries if a bucket write fails', async () => {
    failedWrite = 'river-snapshots/detail-buckets-v1/05.json';
    await expect(captureRiverSnapshots({ results, generatedAt: NOW.toISOString(), detailLayout: DETAIL_BATCH_FORMAT })).rejects.toThrow('write failed');
    expect(store.has('river-snapshots/summary.json')).toBe(false);
  });

  it('rejects invalid writer configuration before writes', async () => {
    vi.stubEnv('RIVER_SNAPSHOT_DETAIL_LAYOUT', 'invalid');
    await expect(captureRiverSnapshots({ results })).rejects.toThrow('Invalid RIVER_SNAPSHOT_DETAIL_LAYOUT');
    expect(writes).toHaveLength(0);
  });
});
