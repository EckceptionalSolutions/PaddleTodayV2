import { describe, expect, it } from 'vitest';
import { buildDetailBatches, detailBucketForSlug, DETAIL_BATCH_COUNT, isRiverDetailBatch } from './snapshot-detail-batches';
import type { RiverDetailApiResult } from './api-contract';

const detail = (slug: string) => ({ river: { slug } }) as RiverDetailApiResult;

describe('fixed snapshot detail buckets', () => {
  it('keeps every route in the same bucket across catalog ordering and membership changes', () => {
    const routes = Array.from({ length: 1392 }, (_, i) => detail(`route-${i}`));
    const batches = buildDetailBatches(routes, '2026-11-04T12:00:00Z');
    expect(batches).toHaveLength(DETAIL_BATCH_COUNT);
    expect(batches.flatMap(batch => batch.results)).toHaveLength(1392);
    const changed = buildDetailBatches([...routes.slice(10).reverse(), detail('new-route')], '2026-11-04T12:30:00Z');
    for (const route of routes.slice(10)) {
      expect(changed[detailBucketForSlug(route.river.slug)].results).toContain(route);
    }
    expect(batches.every(isRiverDetailBatch)).toBe(true);
  });

  it('writes empty buckets too, replacing removed-route data without growing new generation paths', () => {
    const batches = buildDetailBatches([], '2026-11-04T12:00:00Z');
    expect(batches).toHaveLength(32);
    expect(batches.every(batch => batch.results.length === 0 && isRiverDetailBatch(batch))).toBe(true);
  });

  it('rejects duplicates, malformed buckets, incorrect routing, and oversized payloads', () => {
    expect(() => buildDetailBatches([detail('a'), detail('a')], 'now')).toThrow('Duplicate snapshot route');
    const bucket = buildDetailBatches([detail('a')], 'now')[detailBucketForSlug('a')];
    expect(isRiverDetailBatch({ ...bucket, bucket: (bucket.bucket + 1) % 32 })).toBe(false);
    expect(isRiverDetailBatch({ ...bucket, bucket: 1.5 })).toBe(false);
    expect(isRiverDetailBatch({ ...bucket, results: [detail('a'), detail('a')] })).toBe(false);
    expect(isRiverDetailBatch({ ...bucket, format: 'unknown' })).toBe(false);
    const huge = { ...detail('a'), explanation: 'x'.repeat(2 * 1024 * 1024) };
    expect(() => buildDetailBatches([huge], 'now')).toThrow('exceeds');
  });
});
