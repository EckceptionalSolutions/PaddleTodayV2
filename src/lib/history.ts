import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { isArrayOf, isNullableNumber, isNullableString, isNumber, isOneOf, isRecord, isString } from './json-guards';
import type { RiverScoreResult, ScoreRating } from './types';

const DEFAULT_HISTORY_DIR = '.local';
const HISTORY_TIME_ZONE = process.env.HISTORY_TIME_ZONE || 'America/Chicago';

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

type BlobContainer = {
  base: string;
  query: string;
};

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
}): Promise<{ routeCount: number; date: string; hour: string; storage: 'local' | 'blob' }> {
  const now = args.now ?? new Date();
  const storage = historyStorage();
  const date = localDateKey(now);
  const hour = localHourKey(now);

  await Promise.all(
    args.results.map(async (result) => {
      const snapshot = buildSnapshot(result, now);
      const hourlyPath = hourlyBlobName(result.river.slug, date);
      const dailyPath = dailyBlobName(result.river.slug);
      const existingHourly = (await storage.readJson<RiverHistorySnapshot[]>(hourlyPath)) ?? [];
      const nextHourly = upsertSnapshot(existingHourly, snapshot);
      await storage.writeJson(hourlyPath, nextHourly);

      const existingDaily = (await storage.readJson<RiverHistoryDaySummary[]>(dailyPath)) ?? [];
      const nextDaily = upsertDailySummary(existingDaily, summarizeSnapshots(nextHourly, date));
      await storage.writeJson(dailyPath, nextDaily);
    })
  );

  return {
    routeCount: args.results.length,
    date,
    hour,
    storage: storage.kind,
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
  const daily = ((await storage.readJson<RiverHistoryDaySummary[]>(dailyBlobName(args.slug))) ?? [])
    .sort((left, right) => left.date.localeCompare(right.date));
  const limitedDays = daily.slice(-Math.max(1, args.days ?? 7));
  const todayHourly = (((await storage.readJson<RiverHistorySnapshot[]>(hourlyBlobName(args.slug, date))) ?? [])
    .sort((left, right) => left.capturedAt.localeCompare(right.capturedAt)));

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

function buildSnapshot(result: RiverScoreResult, now: Date): RiverHistorySnapshot {
  return {
    slug: result.river.slug,
    capturedAt: now.toISOString(),
    localDate: localDateKey(now),
    localHour: localHourKey(now),
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
  const filtered = existing.filter((snapshot) => snapshot.localHour !== next.localHour);
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

function historyPrefix() {
  return cleanPathSegment(process.env.RIVER_HISTORY_BLOB_PREFIX || 'river-history');
}

function historyStorage():
  | {
      kind: 'local';
      readJson<T>(blobName: string): Promise<T | null>;
      writeJson(blobName: string, value: unknown): Promise<void>;
    }
  | {
      kind: 'blob';
      readJson<T>(blobName: string): Promise<T | null>;
      writeJson(blobName: string, value: unknown): Promise<void>;
    } {
  const container = parseContainerSas(process.env.RIVER_HISTORY_CONTAINER_SAS_URL ?? '');
  if (container) {
    return {
      kind: 'blob',
      async readJson<T>(blobName: string) {
        const response = await fetch(putBlobUrl(container, blobName), {
          method: 'GET',
          headers: { accept: 'application/json' },
        });

        if (response.status === 404) {
          return null;
        }

        if (!response.ok) {
          throw new Error(`Failed to read history blob ${blobName}: HTTP ${response.status}`);
        }

        const payload: unknown = await response.json();
        if (!isRiverHistorySnapshotArray(payload) && !isRiverHistoryDaySummaryArray(payload)) {
          throw new Error(`Invalid history blob ${blobName}`);
        }
        return payload as T;
      },
      async writeJson(blobName: string, value: unknown) {
        const payload = JSON.stringify(value, null, 2);
        const response = await fetch(putBlobUrl(container, blobName), {
          method: 'PUT',
          headers: {
            'x-ms-blob-type': 'BlockBlob',
            'content-type': 'application/json; charset=utf-8',
          },
          body: payload,
        });

        if (!response.ok) {
          throw new Error(`Failed to write history blob ${blobName}: HTTP ${response.status}`);
        }
      },
    };
  }

  return {
    kind: 'local',
    async readJson<T>(blobName: string) {
      const filePath = localPathFor(blobName);
      try {
        const payload = await readFile(filePath, 'utf8');
        const parsed: unknown = JSON.parse(payload);
        if (!isRiverHistorySnapshotArray(parsed) && !isRiverHistoryDaySummaryArray(parsed)) {
          throw new Error(`Invalid history JSON in ${blobName}`);
        }
        return parsed as T;
      } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
          return null;
        }
        throw error;
      }
    },
    async writeJson(blobName: string, value: unknown) {
      const filePath = localPathFor(blobName);
      const parentDir = dirname(filePath);
      await mkdir(parentDir, { recursive: true });
      await writeFile(filePath, JSON.stringify(value, null, 2), 'utf8');
    },
  };
}

function localPathFor(blobName: string) {
  return resolve(process.cwd(), process.env.RIVER_HISTORY_DIR || DEFAULT_HISTORY_DIR, blobName);
}

function parseContainerSas(value: string): BlobContainer | null {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    return {
      base: url.origin + url.pathname.replace(/\/$/, ''),
      query: url.search,
    };
  } catch {
    return null;
  }
}

function putBlobUrl(container: BlobContainer, blobName: string) {
  return `${container.base}/${blobName}${container.query}`;
}

function cleanPathSegment(value: string) {
  return value
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-zA-Z0-9/_-]+/g, '-');
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
