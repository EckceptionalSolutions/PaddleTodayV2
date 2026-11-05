import { createHash } from 'node:crypto';
import type { RiverHistoryDaySummary, RiverHistorySnapshot } from './history';
import { isHistoryDate } from './history-calendar';
import { isArrayOf, isRecord, isString } from './json-guards';

export const HISTORY_BUCKET_LAYOUT = 'history-buckets-v1';
export const HISTORY_BUCKET_COUNT = 32;
export const HISTORY_BUCKET_MAX_BYTES = 2 * 1024 * 1024;
export type HistoryStorageLayout = 'legacy' | typeof HISTORY_BUCKET_LAYOUT;
export type HistoryStorageSelection = 'auto' | HistoryStorageLayout;
export interface HistoryStorageControl {
  format: 'history-storage-control-v1';
  activeLayout: HistoryStorageLayout;
  generation: string;
  activatedAt: string;
  hourlyDates: string[];
  dailyMonths: string[];
}
export type HourlyHistoryBucket = { format: typeof HISTORY_BUCKET_LAYOUT; kind: 'hourly'; period: string; bucket: number; routes: Record<string, RiverHistorySnapshot[]> };
export type DailyHistoryBucket = { format: typeof HISTORY_BUCKET_LAYOUT; kind: 'daily'; period: string; bucket: number; routes: Record<string, RiverHistoryDaySummary[]> };
export type HistoryBucket = HourlyHistoryBucket | DailyHistoryBucket;
export const isHistoryMonth = (value: unknown): value is string => typeof value === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
export function historyBucketForSlug(slug: string) { return createHash('sha256').update(slug).digest().readUInt32BE(0) % HISTORY_BUCKET_COUNT; }
export function historyStorageControlName(prefix: string) { return `${prefix}/_storage-layout.json`; }
export function historyBucketName(prefix: string, generation: string, kind: HistoryBucket['kind'], period: string, bucket: number) {
  return `${prefix}/storage/${HISTORY_BUCKET_LAYOUT}/${generation}/${kind}/${period}/${String(bucket).padStart(2, '0')}.json`;
}
export function isHistoryStorageControl(value: unknown): value is HistoryStorageControl {
  return isRecord(value) && value.format === 'history-storage-control-v1'
    && (value.activeLayout === 'legacy' || value.activeLayout === HISTORY_BUCKET_LAYOUT)
    && isString(value.generation) && /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(value.generation)
    && isString(value.activatedAt) && Number.isFinite(Date.parse(value.activatedAt))
    && isArrayOf(value.hourlyDates, isHistoryDate) && new Set(value.hourlyDates).size === value.hourlyDates.length
    && isArrayOf(value.dailyMonths, isHistoryMonth) && new Set(value.dailyMonths).size === value.dailyMonths.length
    && Buffer.byteLength(JSON.stringify(value, null, 2)) <= 4 * 1024 * 1024;
}
export function isHistoryBucket(value: unknown,
  snapshots: (value: unknown) => value is RiverHistorySnapshot[],
  summaries: (value: unknown) => value is RiverHistoryDaySummary[]): value is HistoryBucket {
  if (!isRecord(value) || value.format !== HISTORY_BUCKET_LAYOUT || (value.kind !== 'hourly' && value.kind !== 'daily')
    || typeof value.bucket !== 'number' || !Number.isInteger(value.bucket) || value.bucket < 0 || value.bucket >= HISTORY_BUCKET_COUNT
    || !isString(value.period) || !(value.kind === 'hourly' ? isHistoryDate(value.period) : isHistoryMonth(value.period))
    || !isRecord(value.routes) || Buffer.byteLength(JSON.stringify(value, null, 2)) > HISTORY_BUCKET_MAX_BYTES) return false;
  return Object.entries(value.routes).every(([slug, rows]) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || historyBucketForSlug(slug) !== value.bucket) return false;
    if (value.kind === 'hourly') return snapshots(rows) && rows.every(row => row.slug === slug && row.localDate === value.period
      && Number.isFinite(Date.parse(row.capturedAt)) && /^(?:[01]\d|2[0-3]):00$/.test(row.localHour))
      && new Set(rows.map(row => Math.floor(Date.parse(row.capturedAt) / 3_600_000))).size === rows.length;
    return summaries(rows) && rows.every(row => isHistoryDate(row.date) && row.date.slice(0, 7) === value.period)
      && new Set(rows.map(row => row.date)).size === rows.length;
  });
}
export function mergeHistorySnapshots(existing: RiverHistorySnapshot[], additions: RiverHistorySnapshot[]) {
  let next = existing;
  for (const row of additions) {
    const hour = Math.floor(Date.parse(row.capturedAt) / 3_600_000);
    next = next.filter(old => Math.floor(Date.parse(old.capturedAt) / 3_600_000) !== hour).concat(row);
  }
  return [...next].sort((a, b) => a.capturedAt.localeCompare(b.capturedAt));
}
export function mergeHistoryDays(existing: RiverHistoryDaySummary[], additions: RiverHistoryDaySummary[]) {
  const days = new Map(existing.map(day => [day.date, day]));
  for (const day of additions) days.set(day.date, day);
  return [...days.values()].sort((a, b) => a.date.localeCompare(b.date));
}
