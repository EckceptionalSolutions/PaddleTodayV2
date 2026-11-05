import { randomUUID } from 'node:crypto';
import { mutateJson, type JsonStorage } from './blob-storage';
import { mapWithConcurrency } from './async-concurrency';
import type { RiverHistoryDaySummary, RiverHistorySnapshot } from './history';
import {
  HISTORY_BUCKET_COUNT, HISTORY_BUCKET_LAYOUT, historyBucketForSlug, historyBucketName, historyStorageControlName,
  isHistoryStorageControl, mergeHistoryDays, mergeHistorySnapshots, type DailyHistoryBucket, type HistoryBucket,
  type HistoryStorageControl, type HistoryStorageSelection, type HourlyHistoryBucket,
} from './history-buckets';

type BucketState = { value: HistoryBucket; etag: string | null; dirty: boolean };
type RepositoryOptions = { storage: JsonStorage; prefix: string; validateBucket: (value: unknown) => boolean;
  writer?: { selection: HistoryStorageSelection; assertOwned: () => void; now: Date }; concurrency?: number };
const equal = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const ownRow = <T>(rows: Record<string, T>, slug: string) => Object.hasOwn(rows, slug) ? rows[slug] : undefined;

/** Drain active requests before a capture/export releases its distributed lease. */
export async function drainHistoryWork<T>(items: T[], concurrency: number, action: (item: T) => Promise<void>) {
  let failed = false, failure: unknown;
  await mapWithConcurrency(items, concurrency, async item => {
    if (failed) return;
    try { await action(item); } catch (error) { if (!failed) failure = error; failed = true; }
  });
  if (failed) throw failure;
}

class HistoryRepository {
  readonly stats = { hourlyBlobWrites: 0, dailyBlobWrites: 0, layoutControlBlobWrites: 0, bucketReadbacks: 0 };
  private readonly buckets = new Map<string, Promise<BucketState>>();
  constructor(private readonly options: RepositoryOptions,
    private control: HistoryStorageControl | null, private controlEtag: string | null) {}
  get layout() { return this.control?.activeLayout ?? 'legacy'; }
  private legacyHourly(slug: string, date: string) { return `${this.options.prefix}/hourly/${slug}/${date}.json`; }
  private legacyDaily(slug: string) { return `${this.options.prefix}/daily/${slug}.json`; }
  private owned() {
    if (!this.options.writer) throw new Error('A read-only history repository cannot write.');
    this.options.writer.assertOwned();
  }
  async selectWriterLayout() {
    const writer = this.options.writer;
    if (!writer) return;
    if (writer.selection === 'legacy' && this.layout === HISTORY_BUCKET_LAYOUT) {
      throw new Error('Export history buckets to legacy files before selecting legacy storage.');
    }
    if (writer.selection === HISTORY_BUCKET_LAYOUT && this.layout !== HISTORY_BUCKET_LAYOUT) {
      await this.saveControl({ format: 'history-storage-control-v1', activeLayout: HISTORY_BUCKET_LAYOUT,
        generation: randomUUID(), activatedAt: writer.now.toISOString(), hourlyDates: [], dailyMonths: [] });
    }
  }
  private async saveControl(next: HistoryStorageControl) {
    this.owned();
    if (!isHistoryStorageControl(next)) throw new Error('History storage control is invalid or exceeds its size limit.');
    const name = historyStorageControlName(this.options.prefix);
    await this.options.storage.writeJson(name, next, this.controlEtag ? { ifMatch: this.controlEtag } : { ifNoneMatch: '*' });
    this.stats.layoutControlBlobWrites++;
    const saved = await this.options.storage.readJsonWithEtag<HistoryStorageControl>(name);
    if (!equal(saved.value, next) || !saved.etag) throw new Error('History storage control readback did not match.');
    this.control = saved.value; this.controlEtag = saved.etag;
  }
  async prepareHourlyDate(date: string) {
    if (this.layout !== HISTORY_BUCKET_LAYOUT || this.control!.hourlyDates.includes(date)) return;
    await this.saveControl({ ...this.control!, hourlyDates: [...this.control!.hourlyDates, date].sort() });
  }
  private loadBucket(kind: HistoryBucket['kind'], period: string, bucket: number): Promise<BucketState> {
    if (!this.control) throw new Error('History bucket generation is missing.');
    const name = historyBucketName(this.options.prefix, this.control.generation, kind, period, bucket);
    let pending = this.buckets.get(name);
    if (!pending) {
      pending = (async () => {
        const current = await this.options.storage.readJsonWithEtag<HistoryBucket>(name);
        if (current.value && (current.value.kind !== kind || current.value.period !== period || current.value.bucket !== bucket)) {
          throw new Error('History bucket identity does not match its path.');
        }
        const value = current.value ?? { format: HISTORY_BUCKET_LAYOUT, kind, period, bucket, routes: {} } as HistoryBucket;
        return { value, etag: current.etag, dirty: false };
      })();
      this.buckets.set(name, pending);
    }
    return pending;
  }
  async readHourly(slug: string, date: string): Promise<RiverHistorySnapshot[]> {
    if (this.layout === HISTORY_BUCKET_LAYOUT) {
      const state = await this.loadBucket('hourly', date, historyBucketForSlug(slug));
      const row = ownRow((state.value as HourlyHistoryBucket).routes, slug);
      if (row) return [...row];
    }
    return (await this.options.storage.readJson<RiverHistorySnapshot[]>(this.legacyHourly(slug, date))) ?? [];
  }
  async readDaily(slug: string, options: { days?: number; beforeDate?: string } = {}): Promise<RiverHistoryDaySummary[]> {
    let rows = (await this.options.storage.readJson<RiverHistoryDaySummary[]>(this.legacyDaily(slug))) ?? [];
    const filter = (values: RiverHistoryDaySummary[]) => values.filter(day => !options.beforeDate || day.date < options.beforeDate);
    rows = filter(rows).sort((a, b) => a.date.localeCompare(b.date));
    if (this.layout !== HISTORY_BUCKET_LAYOUT) return options.days === undefined ? rows : rows.slice(-Math.max(1, options.days));
    const count = Math.max(1, options.days ?? Infinity);
    for (const month of [...this.control!.dailyMonths].sort().reverse()) {
      if (options.beforeDate && month > options.beforeDate.slice(0, 7)) continue;
      const cutoff = rows.length >= count ? rows.at(-count)?.date : undefined;
      if (cutoff && month + '-99' < cutoff) break;
      const state = await this.loadBucket('daily', month, historyBucketForSlug(slug));
      rows = mergeHistoryDays(rows, filter(ownRow((state.value as DailyHistoryBucket).routes, slug) ?? []));
    }
    return Number.isFinite(count) ? rows.slice(-count) : rows;
  }
  async appendHourly(snapshot: RiverHistorySnapshot) {
    this.owned();
    if (this.layout === 'legacy') {
      await mutateJson<RiverHistorySnapshot[]>({ storage: this.options.storage,
        blobName: this.legacyHourly(snapshot.slug, snapshot.localDate), initial: [],
        mutate: current => { this.owned(); return mergeHistorySnapshots(current, [snapshot]); } });
      this.stats.hourlyBlobWrites++; return;
    }
    const state = await this.loadBucket('hourly', snapshot.localDate, historyBucketForSlug(snapshot.slug));
    const old = await this.readHourly(snapshot.slug, snapshot.localDate);
    const next = mergeHistorySnapshots(old, [snapshot]);
    if (!equal(old, next) || !ownRow((state.value as HourlyHistoryBucket).routes, snapshot.slug)) {
      (state.value as HourlyHistoryBucket).routes[snapshot.slug] = next; state.dirty = true;
    }
  }
  async upsertDaily(slug: string, additions: RiverHistoryDaySummary[]): Promise<boolean> {
    this.owned(); if (!additions.length) return false;
    const legacy = (await this.options.storage.readJson<RiverHistoryDaySummary[]>(this.legacyDaily(slug))) ?? [];
    if (this.layout === 'legacy') {
      if (equal(mergeHistoryDays(legacy, additions), legacy)) return false;
      await mutateJson<RiverHistoryDaySummary[]>({ storage: this.options.storage, blobName: this.legacyDaily(slug), initial: [],
        mutate: current => { this.owned(); return mergeHistoryDays(current, additions); } });
      this.stats.dailyBlobWrites++; return true;
    }
    let changed = false;
    for (const day of additions) {
      const state = await this.loadBucket('daily', day.date.slice(0, 7), historyBucketForSlug(slug));
      const routes = (state.value as DailyHistoryBucket).routes;
      const row = ownRow(routes, slug) ?? [];
      const previous = row.find(old => old.date === day.date) ?? legacy.find(old => old.date === day.date);
      if (!equal(previous, day)) { routes[slug] = mergeHistoryDays(row, [day]); state.dirty = true; changed = true; }
    }
    return changed;
  }
  async flush(kind: HistoryBucket['kind']) {
    if (this.layout !== HISTORY_BUCKET_LAYOUT) return;
    const all = await Promise.all([...this.buckets].map(async ([name, pending]) => ({ name, state: await pending })));
    const pending = all.filter(({ state }) => state.dirty && state.value.kind === kind);
    // Reject an oversized capture before publishing any of its bucket payloads.
    for (const { state } of pending) if (!this.options.validateBucket(state.value)) throw new Error('History bucket is invalid or exceeds its size limit.');
    if (kind === 'daily' && pending.length) {
      const months = [...new Set(this.control!.dailyMonths.concat(pending.map(({ state }) => state.value.period)))].sort();
      if (!equal(months, this.control!.dailyMonths)) await this.saveControl({ ...this.control!, dailyMonths: months });
    }
    await drainHistoryWork(pending, this.options.concurrency ?? 8, async ({ name, state }) => {
      this.owned();
      await this.options.storage.writeJson(name, state.value, state.etag ? { ifMatch: state.etag } : { ifNoneMatch: '*' });
      this.stats[kind === 'hourly' ? 'hourlyBlobWrites' : 'dailyBlobWrites']++;
      const readback = await this.options.storage.readJsonWithEtag<HistoryBucket>(name);
      if (!equal(readback.value, state.value) || !readback.etag) throw new Error('History bucket readback did not match.');
      state.etag = readback.etag; state.dirty = false; this.stats.bucketReadbacks++;
    });
  }
  async exportLegacy() {
    this.owned();
    const report = { storageLayoutBefore: this.layout, storageLayoutAfter: 'legacy' as const,
      hourlyFilesWritten: 0, dailyFilesWritten: 0, filesVerified: 0, generation: this.control?.generation ?? null };
    if (this.layout === 'legacy') return report;
    const persist = async (name: string, merge: (current: unknown) => unknown, counter: 'hourlyFilesWritten' | 'dailyFilesWritten') => {
      this.owned(); const old = await this.options.storage.readJsonWithEtag(name); const next = merge(old.value);
      if (!equal(old.value, next)) {
        this.owned();
        await this.options.storage.writeJson(name, next, old.etag ? { ifMatch: old.etag } : { ifNoneMatch: '*' }); report[counter]++;
        if (!equal(await this.options.storage.readJson(name), next)) throw new Error('Legacy history export readback did not match.');
      }
      report.filesVerified++;
    };
    for (const date of this.control!.hourlyDates) {
      await drainHistoryWork(Array.from({ length: HISTORY_BUCKET_COUNT }, (_, bucket) => bucket), this.options.concurrency ?? 8, async bucket => {
        this.owned(); const state = await this.loadBucket('hourly', date, bucket);
        for (const [slug, rows] of Object.entries((state.value as HourlyHistoryBucket).routes)) {
          await persist(this.legacyHourly(slug, date), current => mergeHistorySnapshots((current as RiverHistorySnapshot[] | null) ?? [], rows), 'hourlyFilesWritten');
        }
      });
      for (const key of this.buckets.keys()) if (key.includes(`/hourly/${date}/`)) this.buckets.delete(key);
    }
    // Bound export memory by processing a few buckets at a time, combining
    // their months before writing each route's legacy daily array once.
    await drainHistoryWork(Array.from({ length: HISTORY_BUCKET_COUNT }, (_, bucket) => bucket), this.options.concurrency ?? 8, async bucket => {
      const daily = new Map<string, RiverHistoryDaySummary[]>();
      for (const month of this.control!.dailyMonths) {
        this.owned(); const state = await this.loadBucket('daily', month, bucket);
        for (const [slug, rows] of Object.entries((state.value as DailyHistoryBucket).routes)) daily.set(slug, mergeHistoryDays(daily.get(slug) ?? [], rows));
        this.buckets.delete(historyBucketName(this.options.prefix, this.control!.generation, 'daily', month, bucket));
      }
      for (const [slug, rows] of daily) {
        await persist(this.legacyDaily(slug), current => mergeHistoryDays((current as RiverHistoryDaySummary[] | null) ?? [], rows), 'dailyFilesWritten');
      }
    });
    // Publication barrier: old readers are safe only after every export readback.
    // Keep bucket objects intact. A later activation receives a fresh generation.
    await this.saveControl({ ...this.control!, activeLayout: 'legacy' });
    return report;
  }
}

export async function openHistoryRepository(options: RepositoryOptions) {
  const current = await options.storage.readJsonWithEtag<HistoryStorageControl>(historyStorageControlName(options.prefix));
  if (current.value !== null && !isHistoryStorageControl(current.value)) throw new Error('Invalid history storage control.');
  const repository = new HistoryRepository(options, current.value, current.etag);
  await repository.selectWriterLayout(); return repository;
}
