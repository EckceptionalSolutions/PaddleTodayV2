import {
  cleanBlobPath as cleanPathSegment,
  createJsonStorage,
  mutateJson,
  withJsonStorageLock,
  type JsonStorage,
} from './blob-storage';
import { mapWithConcurrency } from './async-concurrency';
import { isArrayOf, isNullableNumber, isNullableString, isNumber, isOneOf, isRecord, isString } from './json-guards';
import type { RiverScoreResult, ScoreRating } from './types';
import { forgetCache, remember } from './server-cache';
import { historyDatesThrough, isHistoryDate, previousHistoryDate } from './history-calendar';
import { isHistoryCaptureLease, withHistoryCaptureLease } from './history-capture-lease';

const DEFAULT_HISTORY_DIR = '.local';
const HISTORY_TIME_ZONE = process.env.HISTORY_TIME_ZONE || 'America/Chicago';
export const DAILY_HISTORY_SUMMARY_MODE = 'daily-finalize-v1';
type HistorySummaryMode = 'legacy' | typeof DAILY_HISTORY_SUMMARY_MODE;
type FinalizationCheckpoint = {
  format: 'history-daily-finalization-v1';
  latestCaptureDate: string;
  knownRoutes: string[];
  pending: Record<string, string[]>;
};

function isFinalizationCheckpoint(value: unknown): value is FinalizationCheckpoint {
  if (!isRecord(value) || value.format !== 'history-daily-finalization-v1' || !isHistoryDate(value.latestCaptureDate)
    || !isArrayOf(value.knownRoutes, isString) || !isRecord(value.pending)) return false;
  const known = new Set(value.knownRoutes);
  return known.size === value.knownRoutes.length && Object.entries(value.pending).every(([date, slugs]) =>
    isHistoryDate(date) && isArrayOf(slugs, isString) && new Set(slugs).size === slugs.length && slugs.every(slug => known.has(slug)))
    && Buffer.byteLength(JSON.stringify(value)) <= 4 * 1024 * 1024;
}

export interface RiverHistorySnapshot {
  slug: string;
  capturedAt: string;
  localDate: string;
  localHour: string;
  score: number;
  rating: ScoreRating;
  riverQuality: number;
  windAdjustment: number;
  temperatureAdjustment: number;
  rainAdjustment: number;
  comfortAdjustment: number;
  gaugeBandLabel: string;
  gaugeNow: string | null;
  temperatureF: number | null;
  windMph: number | null;
  rainChance: number | null;
}

export interface RiverHistoryDaySummary {
  date: string;
  avgScore: number;
  minScore: number;
  maxScore: number;
  latestScore: number;
  latestRating: ScoreRating;
  sampleCount: number;
  morningScore: number | null;
  afternoonScore: number | null;
}

export interface RiverHistoryResult {
  slug: string;
  days: RiverHistoryDaySummary[];
  todayHourly: RiverHistorySnapshot[];
  latestSnapshotAt: string | null;
}

function isRiverHistorySnapshot(value: unknown): value is RiverHistorySnapshot {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.slug) &&
    isString(value.capturedAt) &&
    isString(value.localDate) &&
    isString(value.localHour) &&
    isNumber(value.score) &&
    isOneOf(value.rating, ['Strong', 'Good', 'Fair', 'No-go'] as const) &&
    isNumber(value.riverQuality) &&
    isNumber(value.windAdjustment) &&
    isNumber(value.temperatureAdjustment) &&
    isNumber(value.rainAdjustment) &&
    isNumber(value.comfortAdjustment) &&
    isString(value.gaugeBandLabel) &&
    isNullableString(value.gaugeNow) &&
    isNullableNumber(value.temperatureF) &&
    isNullableNumber(value.windMph) &&
    isNullableNumber(value.rainChance)
  );
}

function isRiverHistoryDaySummary(value: unknown): value is RiverHistoryDaySummary {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.date) &&
    isNumber(value.avgScore) &&
    isNumber(value.minScore) &&
    isNumber(value.maxScore) &&
    isNumber(value.latestScore) &&
    isOneOf(value.latestRating, ['Strong', 'Good', 'Fair', 'No-go'] as const) &&
    isNumber(value.sampleCount) &&
    isNullableNumber(value.morningScore) &&
    isNullableNumber(value.afternoonScore)
  );
}

function isRiverHistorySnapshotArray(value: unknown): value is RiverHistorySnapshot[] {
  return isArrayOf(value, isRiverHistorySnapshot);
}

function isRiverHistoryDaySummaryArray(value: unknown): value is RiverHistoryDaySummary[] {
  return isArrayOf(value, isRiverHistoryDaySummary);
}

export async function captureHistorySnapshotForResults(args: {
  results: RiverScoreResult[];
  now?: Date;
  dailySummaryMode?: HistorySummaryMode;
}): Promise<{ routeCount: number; date: string; hour: string; storage: 'local' | 'blob'; dailySummaryMode: HistorySummaryMode; dailySummaryWrites: number; finalizedDays: number }> {
  const now = args.now ?? new Date();
  const storage = historyStorage();
  const date = localDateKey(now);
  const hour = localHourKey(now);
  const writeConcurrency = positiveInteger(process.env.RIVER_HISTORY_WRITE_CONCURRENCY, 8);
  const mode = args.dailySummaryMode ?? process.env.RIVER_HISTORY_DAILY_SUMMARY_MODE ?? 'legacy';
  if (mode !== 'legacy' && mode !== DAILY_HISTORY_SUMMARY_MODE) throw new Error('Invalid RIVER_HISTORY_DAILY_SUMMARY_MODE.');
  const slugs = args.results.map(result => result.river.slug).sort();
  if (new Set(slugs).size !== slugs.length) throw new Error('Duplicate history route.');
  let dailySummaryWrites = 0, finalizedDays = 0;
  if (!args.results.length) return { routeCount: 0, date, hour, storage: storage.kind, dailySummaryMode: mode, dailySummaryWrites, finalizedDays };

  await withJsonStorageLock(`history-capture:${historyPrefix()}`, () => withHistoryCaptureLease(storage,
    `${historyPrefix()}/_capture-lease.json`, async assertOwned => {
      const original = await storage.readJsonWithEtag<FinalizationCheckpoint>(checkpointBlobName());
      const known = new Set(original.value?.knownRoutes ?? []);
      const pending = new Map(Object.entries(original.value?.pending ?? {}).map(([day, routes]) => [day, new Set(routes)]));
      const addPending = (day: string, slug: string) => {
        const routes = pending.get(day) ?? new Set<string>();
        routes.add(slug); pending.set(day, routes);
      };
      // Bootstrap each route once, preserving legacy summaries and repairing the
      // last known partial/missed-day boundary from retained hourly files.
      await drainHistoryWork(slugs.filter(slug => !known.has(slug)), writeConcurrency, async slug => {
        assertOwned();
        const daily = await storage.readJson<RiverHistoryDaySummary[]>(dailyBlobName(slug));
        const latest = daily?.map(day => day.date).filter(day => day < date).sort().at(-1) ?? previousHistoryDate(date);
        for (const day of historyDatesThrough(latest, previousHistoryDate(date))) addPending(day, slug);
        known.add(slug);
      });
      for (const slug of slugs) addPending(date, slug);
      const checkpoint: FinalizationCheckpoint = {
        format: 'history-daily-finalization-v1',
        latestCaptureDate: original.value && original.value.latestCaptureDate > date ? original.value.latestCaptureDate : date,
        knownRoutes: [...known].sort(),
        pending: Object.fromEntries([...pending].sort(([a], [b]) => a.localeCompare(b)).map(([day, routes]) => [day, [...routes].sort()])),
      };
      if (!isFinalizationCheckpoint(checkpoint)) throw new Error('History finalization journal is invalid or exceeds 4 MiB.');
      // Announce possible writes before issuing them. Failed/partial captures
      // remain discoverable to readers and retries, including removed routes.
      assertOwned();
      if (JSON.stringify(checkpoint) !== JSON.stringify(original.value)) {
        await storage.writeJson(checkpointBlobName(), checkpoint, original.etag ? { ifMatch: original.etag } : { ifNoneMatch: '*' });
      }
      await drainHistoryWork(args.results, writeConcurrency, async result => {
        assertOwned();
        const snapshot = buildSnapshot(result, now, date, hour);
        await mutateJson<RiverHistorySnapshot[]>({ storage, blobName: hourlyBlobName(result.river.slug, date), initial: [],
          mutate: existing => { assertOwned(); return upsertSnapshot(existing, snapshot); } });
      });
      const work = new Map<string, Set<string>>();
      const addWork = (slug: string, day: string) => {
        const dates = work.get(slug) ?? new Set<string>(); dates.add(day); work.set(slug, dates);
      };
      for (const [day, routes] of pending) {
        if (day < checkpoint.latestCaptureDate) for (const slug of routes) addWork(slug, day);
      }
      if (mode === 'legacy') for (const slug of slugs) addWork(slug, date);
      await drainHistoryWork([...work], writeConcurrency, async ([slug, dates]) => {
        assertOwned();
        const dailyPath = dailyBlobName(slug);
        const existing = (await storage.readJson<RiverHistoryDaySummary[]>(dailyPath)) ?? [];
        const summaries: RiverHistoryDaySummary[] = [];
        for (const day of [...dates].sort()) {
          assertOwned();
          const samples = await storage.readJson<RiverHistorySnapshot[]>(hourlyBlobName(slug, day));
          if (samples?.length) {
            summaries.push(summarizeSnapshots(samples, day));
            if (day < checkpoint.latestCaptureDate) finalizedDays++;
          }
        }
        const next = summaries.reduce((days, day) => upsertDailySummary(days, day), existing);
        if (JSON.stringify(next) !== JSON.stringify(existing)) {
          await mutateJson<RiverHistoryDaySummary[]>({ storage, blobName: dailyPath, initial: [],
            mutate: current => { assertOwned(); return summaries.reduce((days, day) => upsertDailySummary(days, day), current); } });
          dailySummaryWrites++;
        }
      });
      // Publish completion only after all daily arrays are durable. Empty dates
      // remove an announced-but-never-written attempt without inventing samples.
      for (const [slug, dates] of work) for (const day of dates) pending.get(day)?.delete(slug);
      const completed = { ...checkpoint, pending: Object.fromEntries([...pending].filter(([, routes]) => routes.size)
        .sort(([a], [b]) => a.localeCompare(b)).map(([day, routes]) => [day, [...routes].sort()])) };
      if (JSON.stringify(completed) !== JSON.stringify(checkpoint)) {
        await mutateJson<FinalizationCheckpoint>({ storage, blobName: checkpointBlobName(), initial: checkpoint,
          mutate: () => { assertOwned(); return completed; } });
      }
  }));
  forgetCache('history:', { prefix: true });

  return {
    routeCount: args.results.length,
    date,
    hour,
    storage: storage.kind,
    dailySummaryMode: mode,
    dailySummaryWrites,
    finalizedDays,
  };
}

export async function getRiverHistory(args: {
  slug: string;
  days?: number;
  now?: Date;
}): Promise<RiverHistoryResult> {
  const now = args.now ?? new Date();
  const storage = historyStorage();
  const date = localDateKey(now);
  // Read the publication checkpoint before daily arrays. A newer checkpoint
  // therefore cannot hide daily writes that were still pending when read began.
  const checkpoint = await remember<FinalizationCheckpoint | null>({ key: `history:checkpoint:${historyPrefix()}`,
    namespace: 'history-control', ttlMs: 45_000, staleWhileErrorMs: 0, maxEntries: 4,
    load: () => storage.readJson<FinalizationCheckpoint>(checkpointBlobName()) });
  const daily = ((await storage.readJson<RiverHistoryDaySummary[]>(dailyBlobName(args.slug))) ?? [])
    .sort((left, right) => left.date.localeCompare(right.date));
  const pendingDates = [...new Set([date, ...(checkpoint ? Object.entries(checkpoint.pending)
    .filter(([day, routes]) => day <= date && routes.includes(args.slug)).map(([day]) => day)
    : daily.at(-1)?.date && daily.at(-1)!.date < date ? [daily.at(-1)!.date] : [])])].sort();
  const pending = await mapWithConcurrency(pendingDates, 6, async day => ({ day,
    samples: (await storage.readJson<RiverHistorySnapshot[]>(hourlyBlobName(args.slug, day))) ?? [] }));
  const derivedDaily = pending.filter(item => item.samples.length)
    .reduce((days, item) => upsertDailySummary(days, summarizeSnapshots(item.samples, item.day)), daily);
  const limitedDays = derivedDaily.slice(-Math.max(1, args.days ?? 7));
  const todayHourly = (pending.find(item => item.day === date)?.samples ?? []).sort((left, right) => left.capturedAt.localeCompare(right.capturedAt));

  return {
    slug: args.slug,
    days: limitedDays,
    todayHourly,
    latestSnapshotAt: todayHourly.at(-1)?.capturedAt ?? limitedDays.at(-1)?.date ?? null,
  };
}

export function summarizeSnapshots(
  snapshots: RiverHistorySnapshot[],
  date: string = snapshots[0]?.localDate ?? ''
): RiverHistoryDaySummary {
  const sorted = [...snapshots].sort((left, right) => left.capturedAt.localeCompare(right.capturedAt));
  const scores = sorted.map((snapshot) => snapshot.score);
  const latest = sorted.at(-1);
  const avgScore =
    scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;
  const morning = sorted.find((snapshot) => snapshot.localHour >= '06:00' && snapshot.localHour < '12:00') ?? null;
  const afternoon =
    [...sorted].reverse().find((snapshot) => snapshot.localHour >= '12:00' && snapshot.localHour < '18:00') ?? null;

  return {
    date,
    avgScore,
    minScore: scores.length > 0 ? Math.min(...scores) : 0,
    maxScore: scores.length > 0 ? Math.max(...scores) : 0,
    latestScore: latest?.score ?? 0,
    latestRating: latest?.rating ?? 'No-go',
    sampleCount: sorted.length,
    morningScore: morning?.score ?? null,
    afternoonScore: afternoon?.score ?? null,
  };
}

function buildSnapshot(result: RiverScoreResult, now: Date, date: string, hour: string): RiverHistorySnapshot {
  return {
    slug: result.river.slug,
    capturedAt: now.toISOString(),
    localDate: date,
    localHour: hour,
    score: result.score,
    rating: result.rating,
    riverQuality: result.riverQuality,
    windAdjustment: result.scoreBreakdown.windAdjustment,
    temperatureAdjustment: result.scoreBreakdown.temperatureAdjustment,
    rainAdjustment: result.scoreBreakdown.rainAdjustment,
    comfortAdjustment: result.scoreBreakdown.comfortAdjustment,
    gaugeBandLabel: result.gaugeBandLabel,
    gaugeNow: result.gauge
      ? `${result.gauge.current.toFixed(result.gauge.unit === 'ft' ? 2 : 0).replace(/\.00$/, '')} ${result.gauge.unit}`
      : null,
    temperatureF: result.weather?.temperatureF ?? null,
    windMph: result.weather?.windMph ?? null,
    rainChance: result.weather?.next12hPrecipProbabilityMax ?? null,
  };
}

function upsertSnapshot(existing: RiverHistorySnapshot[], next: RiverHistorySnapshot): RiverHistorySnapshot[] {
  const nextUtcHour = Math.floor(Date.parse(next.capturedAt) / 3_600_000);
  const filtered = existing.filter(snapshot => Math.floor(Date.parse(snapshot.capturedAt) / 3_600_000) !== nextUtcHour);
  filtered.push(next);
  return filtered.sort((left, right) => left.capturedAt.localeCompare(right.capturedAt));
}

function upsertDailySummary(
  existing: RiverHistoryDaySummary[],
  next: RiverHistoryDaySummary
): RiverHistoryDaySummary[] {
  const filtered = existing.filter((summary) => summary.date !== next.date);
  filtered.push(next);
  return filtered.sort((left, right) => left.date.localeCompare(right.date));
}

function hourlyBlobName(slug: string, date: string) {
  return `${historyPrefix()}/hourly/${slug}/${date}.json`;
}

function dailyBlobName(slug: string) {
  return `${historyPrefix()}/daily/${slug}.json`;
}

function checkpointBlobName() { return `${historyPrefix()}/_daily-finalization.json`; }

async function drainHistoryWork<T>(items: T[], concurrency: number, action: (item: T) => Promise<void>) {
  let failed = false;
  let failure: unknown;
  await mapWithConcurrency(items, concurrency, async item => {
    if (failed) return;
    try { await action(item); } catch (error) { if (!failed) failure = error; failed = true; }
  });
  if (failed) throw failure;
}

function historyPrefix() {
  return cleanPathSegment(process.env.RIVER_HISTORY_BLOB_PREFIX || 'river-history');
}

function historyStorage(): JsonStorage {
  return createJsonStorage({
    containerSasUrl: process.env.RIVER_HISTORY_CONTAINER_SAS_URL,
    localDirectory: process.env.RIVER_HISTORY_DIR || DEFAULT_HISTORY_DIR,
    validate: (value) => isRiverHistorySnapshotArray(value) || isRiverHistoryDaySummaryArray(value)
      || isFinalizationCheckpoint(value) || isHistoryCaptureLease(value),
    label: 'history',
    accessTier: 'Hot',
  });
}

function localDateKey(date: Date) {
  const parts = zonedParts(date);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function localHourKey(date: Date) {
  const parts = zonedParts(date);
  return `${parts.hour}:00`;
}

function zonedParts(date: Date) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: HISTORY_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
  });
  const map = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));
  return {
    year: map.year,
    month: map.month,
    day: map.day,
    hour: map.hour,
  };
}

function positiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}
