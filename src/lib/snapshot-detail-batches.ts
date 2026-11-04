import { createHash } from 'node:crypto';
import type { RiverDetailApiResult } from './api-contract';
import { isArrayOf, isNumber, isOptionalString, isRecord, isString } from './json-guards';

export const DETAIL_BATCH_FORMAT = 'detail-buckets-v1';
export const DETAIL_BATCH_COUNT = 32;
export const DETAIL_BATCH_MAX_BYTES = 2 * 1024 * 1024;

export interface RiverDetailBatch {
  format: typeof DETAIL_BATCH_FORMAT;
  generatedAt: string;
  bucket: number;
  results: RiverDetailApiResult[];
}

export function detailBucketForSlug(slug: string) {
  return createHash('sha256').update(slug).digest().readUInt32BE(0) % DETAIL_BATCH_COUNT;
}

export function buildDetailBatches(results: RiverDetailApiResult[], generatedAt: string): RiverDetailBatch[] {
  const batches = Array.from({ length: DETAIL_BATCH_COUNT }, (_, bucket): RiverDetailBatch =>
    ({ format: DETAIL_BATCH_FORMAT, generatedAt, bucket, results: [] }));
  const slugs = new Set<string>();
  for (const result of results) {
    if (slugs.has(result.river.slug)) throw new Error(`Duplicate snapshot route: ${result.river.slug}`);
    slugs.add(result.river.slug);
    batches[detailBucketForSlug(result.river.slug)].results.push(result);
  }
  for (const batch of batches) {
    const bytes = Buffer.byteLength(JSON.stringify(batch));
    if (bytes > DETAIL_BATCH_MAX_BYTES) {
      throw new Error(`Detail bucket ${batch.bucket} exceeds ${DETAIL_BATCH_MAX_BYTES} bytes (${bytes}).`);
    }
  }
  return batches;
}

export function isRiverDetailBatch(value: unknown): value is RiverDetailBatch {
  return isRecord(value) && value.format === DETAIL_BATCH_FORMAT && isString(value.generatedAt)
    && isNumber(value.bucket) && Number.isInteger(value.bucket) && value.bucket >= 0 && value.bucket < DETAIL_BATCH_COUNT
    && isArrayOf(value.results, (item): item is RiverDetailApiResult => isRecord(item) && isRecord(item.river)
      && isString(item.river.slug) && isOptionalString(item.river.estimatedPaddleTime))
    && value.results.every(item => detailBucketForSlug(item.river.slug) === value.bucket)
    && new Set(value.results.map(item => item.river.slug)).size === value.results.length
    && Buffer.byteLength(JSON.stringify(value)) <= DETAIL_BATCH_MAX_BYTES;
}
