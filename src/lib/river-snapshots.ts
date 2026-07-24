import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
  isArrayOf,
  isNumber,
  isOptionalString,
  isRecord,
  isString,
} from './json-guards';
import {
  serializeDetailResult,
  serializeSummaryResult,
  serializeWeekendSummaryResult,
  type RiverDetailApiResult,
  type RiverGroupApiResult,
  type RiverSummaryApiItem,
  type WeekendSummaryApiItem,
} from './api-contract';
import { getRiverBySlug, listRiverGroups } from './rivers';
import { gaugeDisplayForSource } from './source-adapters';
import { mapWithConcurrency } from './async-concurrency';
import type { GaugeBand, RiverGaugeSource, RiverScoreResult } from './types';

const DEFAULT_SNAPSHOT_DIR = '.local';
// Scheduled snapshots are expected every 30 minutes. Once the last successful
// capture is more than two hours old, a stored "live" call is more misleading
// than useful, so callers fall back to a fresh live read instead.
const MAX_STORED_SNAPSHOT_AGE_MS = 2 * 60 * 60 * 1000;
const MAX_SUMMARY_SNAPSHOT_BYTES = 4 * 1024 * 1024;

type BlobContainer = {
  base: string;
  query: string;
};

function isRiverSummaryApiItem(value: unknown): value is RiverSummaryApiItem {
  if (!isRecord(value) || !isRecord(value.river)) {
    return false;
  }

  return (
    isString(value.river.slug) &&
    isOptionalString(value.river.estimatedPaddleTime) &&
    isOptionalString(value.river.difficulty)
  );
}

function isRiverDetailApiResult(value: unknown): value is RiverDetailApiResult {
  if (!isRecord(value) || !isRecord(value.river)) {
    return false;
  }

  return isString(value.river.slug) && isOptionalString(value.river.estimatedPaddleTime);
}

function isWeekendSummaryApiItem(value: unknown): value is WeekendSummaryApiItem {
  if (!isRecord(value) || !isRecord(value.river) || !isRecord(value.weekend) || !isRecord(value.current)) {
    return false;
  }

  return (
    isString(value.river.slug) &&
    isOptionalString(value.river.estimatedPaddleTime) &&
    isOptionalString(value.river.difficulty) &&
    isString(value.weekend.label) &&
    isNumber(value.weekend.score) &&
    isString(value.weekend.confidence) &&
    isNumber(value.current.score)
  );
}

function isRiverGroupApiResult(value: unknown): value is RiverGroupApiResult {
  return isRecord(value) && isRecord(value.group) && isString(value.group.riverId) && isArrayOf(value.routes, isRiverDetailApiResult);
}

function isRiverSummarySnapshot(value: unknown): value is RiverSummarySnapshot {
  return isRecord(value) && isString(value.generatedAt) && isNumber(value.riverCount) && isArrayOf(value.rivers, isRiverSummaryApiItem);
}

function isRiverDetailSnapshot(value: unknown): value is RiverDetailSnapshot {
  return isRecord(value) && isString(value.generatedAt) && isRiverDetailApiResult(value.result);
}

function isWeekendSummarySnapshot(value: unknown): value is WeekendSummarySnapshot {
  return (
    isRecord(value) &&
    isString(value.generatedAt) &&
    isString(value.label) &&
    isNumber(value.riverCount) &&
    isNumber(value.withheldCount) &&
    isArrayOf(value.rivers, isWeekendSummaryApiItem)
  );
}

function isRiverGroupSnapshot(value: unknown): value is RiverGroupSnapshot {
  return isRecord(value) && isString(value.generatedAt) && isRiverGroupApiResult(value.result);
}

export interface RiverSummarySnapshot {
  generatedAt: string;
  riverCount: number;
  rivers: RiverSummaryApiItem[];
}

export interface RiverDetailSnapshot {
  generatedAt: string;
  result: RiverDetailApiResult;
}

export interface WeekendSummarySnapshot {
  generatedAt: string;
  label: string;
  riverCount: number;
  withheldCount: number;
  rivers: WeekendSummaryApiItem[];
}

export interface RiverGroupSnapshot {
  generatedAt: string;
  result: RiverGroupApiResult;
}

export async function captureRiverSnapshots(args: {
  results: RiverScoreResult[];
  generatedAt?: string;
  writeConcurrency?: number;
}): Promise<{
  generatedAt: string;
  routeCount: number;
  groupCount: number;
  storage: 'local' | 'blob';
}> {
  const generatedAt = args.generatedAt ?? new Date().toISOString();
  const storage = snapshotStorage();
  const summary = buildSummarySnapshot(args.results, generatedAt);
  const weekendSummary = buildWeekendSummarySnapshot(args.results, generatedAt);
  const detailSnapshots = buildDetailSnapshots(args.results, generatedAt);
  const groupCount = listRiverGroups().length;

  const routeBlobs = detailSnapshots.map(({ slug, payload }) => ({ name: detailBlobName(slug), payload }));
  assertSnapshotSize(summaryBlobName(), summary, MAX_SUMMARY_SNAPSHOT_BYTES);

  // Keep upstream/storage fan-out bounded so a refresh cannot starve normal API
  // traffic. Group responses are derived from the summary instead of writing a
  // duplicate collection for every river family. Publish summaries last.
  await mapWithConcurrency(routeBlobs, args.writeConcurrency ?? 12, ({ name, payload }) => storage.writeJson(name, payload));
  await Promise.all([
    storage.writeJson(summaryBlobName(), summary),
    storage.writeJson(weekendSummaryBlobName(), weekendSummary),
  ]);

  return {
    generatedAt,
    routeCount: args.results.length,
    groupCount,
    storage: storage.kind,
  };
}

export async function getStoredRiverSummarySnapshot(): Promise<RiverSummarySnapshot | null> {
  const snapshot = await readStoredOrLocalSummary();
  if (!snapshot) {
    return null;
  }
  if (!isStoredSnapshotFresh(snapshot)) {
    return null;
  }

  return {
    ...snapshot,
    rivers: snapshot.rivers.map(normalizeSummarySnapshotItem),
  };
}

async function readStoredOrLocalSummary(): Promise<RiverSummarySnapshot | null> {
  return (
    (await snapshotStorage().readJson<RiverSummarySnapshot>(summaryBlobName())) ??
    (await readLocalSummaryFallback())
  );
}

async function readLocalSummaryFallback(): Promise<RiverSummarySnapshot | null> {
  try {
    const payload = await readFile(resolve(process.cwd(), 'tmp-summary.json'), 'utf8');
    const parsed: unknown = JSON.parse(payload);
    return isRiverSummarySnapshot(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function getStoredRiverDetailSnapshot(slug: string): Promise<RiverDetailSnapshot | null> {
  const snapshot =
    (await snapshotStorage().readJson<RiverDetailSnapshot>(detailBlobName(slug))) ??
    (await readSummaryDetailFallback(slug));
  if (!snapshot) {
    return null;
  }
  if (!isStoredSnapshotFresh(snapshot)) {
    return null;
  }

  return {
    ...snapshot,
    result: normalizeDetailSnapshotResult(snapshot.result),
  };
}

export async function getStoredWeekendSummarySnapshot(): Promise<WeekendSummarySnapshot | null> {
  const snapshot =
    (await snapshotStorage().readJson<WeekendSummarySnapshot>(weekendSummaryBlobName())) ??
    (await readSummaryWeekendFallback());
  if (!snapshot) {
    return null;
  }
  if (!isStoredSnapshotFresh(snapshot)) {
    return null;
  }

  return {
    ...snapshot,
    rivers: snapshot.rivers.map(normalizeWeekendSnapshotItem),
  };
}

export async function getStoredRiverGroupSnapshot(riverId: string): Promise<RiverGroupSnapshot | null> {
  const snapshot = await readSummaryGroupFallback(riverId);
  if (!snapshot) {
    return null;
  }
  if (!isStoredSnapshotFresh(snapshot)) {
    return null;
  }

  return {
    ...snapshot,
    result: {
      ...snapshot.result,
      routes: snapshot.result.routes.map(normalizeDetailSnapshotResult),
    },
  };
}

async function readSummaryDetailFallback(slug: string): Promise<RiverDetailSnapshot | null> {
  const summary = await readStoredOrLocalSummary();
  const item = summary?.rivers.find((river) => river.river.slug === slug);
  if (!summary || !item) {
    return null;
  }

  return item ? { generatedAt: summary.generatedAt, result: detailFromSummaryItem(item) } : null;
}

async function readSummaryWeekendFallback(): Promise<WeekendSummarySnapshot | null> {
  const summary = await readStoredOrLocalSummary();
  if (!summary) {
    return null;
  }

  const rivers = summary.rivers
    .map(normalizeSummarySnapshotItem)
    .map((item) => ({
      river: {
        riverId: item.river.riverId,
        slug: item.river.slug,
        name: item.river.name,
        reach: item.river.reach,
        state: item.river.state,
        region: item.river.region,
        latitude: item.river.latitude,
        longitude: item.river.longitude,
        distanceLabel: item.river.distanceLabel,
        estimatedPaddleTime: item.river.estimatedPaddleTime,
        difficulty: item.river.difficulty,
        routeType: item.river.routeType,
      },
      current: {
        score: item.score,
        rating: item.rating,
        gaugeBandLabel: item.gaugeBandLabel,
      },
      weekend: {
        label: 'Current board',
        score: item.score,
        rating: item.rating,
        confidence: item.confidence.label,
        explanation: 'Weekend forecast data is unavailable, so this card is using the stored current board.',
        summary: item.summary.shortExplanation || item.explanation,
        signalLine: item.summary.rawSignalLine,
      },
      liveData: {
        overall: item.liveData.overall,
        summary: item.liveData.summary,
        gaugeState: item.liveData.gaugeState,
        gaugeDetail: item.liveData.gaugeDetail,
        weatherState: item.liveData.weatherState,
        weatherDetail: item.liveData.weatherDetail,
      },
      generatedAt: summary.generatedAt,
    }));

  return {
    generatedAt: summary.generatedAt,
    label: 'Current board fallback',
    riverCount: rivers.length,
    withheldCount: 0,
    rivers,
  };
}

async function readSummaryGroupFallback(riverId: string): Promise<RiverGroupSnapshot | null> {
  const summary = await readStoredOrLocalSummary();
  const routes = summary?.rivers
    .filter((item) => item.river.riverId === riverId)
    .map((item) => detailFromSummaryItem(item))
    .sort((left, right) => right.score - left.score);

  if (!summary || !routes?.length) {
    return null;
  }

  const states = [...new Set(routes.map((route) => route.river.state))].sort();
  const regions = [...new Set(routes.map((route) => route.river.region))].sort();

  return {
    generatedAt: summary.generatedAt,
    result: {
      group: {
        riverId,
        name: routes[0]?.river.name ?? riverId,
        routeCount: routes.length,
        stateSummary: states.join(', '),
        regionSummary: regions.join(', '),
      },
      routes,
    },
  };
}

function detailFromSummaryItem(item: RiverSummaryApiItem): RiverDetailApiResult {
  const river = getRiverBySlug(item.river.slug);
  const normalized = normalizeSummarySnapshotItem(item);
  const gaugeSource = river?.gaugeSource ?? fallbackGaugeSource(item);
  const profile = river?.profile;

  return {
    river: {
      riverId: normalized.river.riverId,
      slug: normalized.river.slug,
      name: normalized.river.name,
      reach: normalized.river.reach,
      state: normalized.river.state,
      region: normalized.river.region,
      latitude: normalized.river.latitude,
      longitude: normalized.river.longitude,
      distanceLabel: normalized.river.distanceLabel,
      estimatedPaddleTime: normalized.river.estimatedPaddleTime,
      routeType: normalized.river.routeType,
      safetyProfile: normalized.river.safetyProfile ?? river?.safetyProfile,
      gaugeSource: {
        provider: gaugeSource.provider,
        unit: gaugeSource.unit,
        detailUrl: gaugeSource.detailUrl,
        hydrographUrl: gaugeSource.hydrographUrl,
        display: gaugeDisplayForSource(gaugeSource),
      },
      profile: {
        thresholdModel: profile?.thresholdModel ?? 'minimum-only',
        thresholdSourceStrength: profile?.thresholdSourceStrength ?? 'derived',
        idealMin: profile?.idealMin,
        idealMax: profile?.idealMax,
        tooLow: profile?.tooLow,
        tooHigh: profile?.tooHigh,
        difficulty: normalized.river.difficulty,
      },
      putIn: normalized.river.putIn,
      takeOut: normalized.river.takeOut,
      logistics: river?.logistics,
    },
    score: item.score,
    rating: item.rating,
    gaugeBand: gaugeBandFromSummary(item),
    gaugeBandLabel: item.gaugeBandLabel,
    explanation: item.explanation,
    scoreBreakdown: item.scoreBreakdown ?? fallbackScoreBreakdown(item),
    confidence: {
      score: item.confidence.score,
      label: item.confidence.label,
      level: confidenceLevel(item.confidence.label),
      reasons: [item.summary.confidenceText].filter(Boolean),
      warnings: item.liveData.overall === 'live' ? [] : [item.liveData.summary],
      rationale: [item.explanation],
    },
    liveData: {
      overall: item.liveData.overall,
      summary: item.liveData.summary,
      gauge: {
        state: item.liveData.gaugeState,
        ageMinutes: null,
        detail: item.liveData.gaugeDetail,
      },
      weather: {
        state: item.liveData.weatherState,
        ageMinutes: null,
        detail: item.liveData.weatherDetail,
      },
    },
    factors: [
      {
        id: 'summary-primary',
        label: 'Primary factor',
        value: item.summary.primaryFactor,
        detail: item.summary.shortExplanation || item.explanation,
        impact: item.rating === 'Strong' || item.rating === 'Good' ? 'positive' : item.rating === 'Fair' ? 'warning' : 'negative',
      },
      {
        id: 'summary-secondary',
        label: 'Secondary factor',
        value: item.summary.secondaryFactor,
        detail: item.summary.rawSignalLine || item.summary.gaugeNow,
        impact: 'neutral',
      },
    ],
    checklist: [
      {
        status: item.rating === 'Strong' || item.rating === 'Good' ? 'go' : item.rating === 'Fair' ? 'watch' : 'skip',
        label: 'Stored board call',
        detail: item.summary.shortExplanation || item.explanation,
      },
      {
        status: item.liveData.overall === 'live' ? 'go' : 'watch',
        label: 'Live data status',
        detail: item.liveData.summary,
      },
    ],
    outlooks: [],
    gauge: null,
    weather: null,
    generatedAt: item.generatedAt,
  };
}

function fallbackGaugeSource(item: RiverSummaryApiItem): RiverGaugeSource {
  return {
    id: `${item.river.slug}-fallback-gauge`,
    provider: 'usgs',
    siteId: '',
    metric: 'discharge_cfs',
    unit: 'cfs',
    kind: 'direct',
    siteName: item.river.name,
  };
}

function gaugeBandFromSummary(item: RiverSummaryApiItem): GaugeBand {
  const label = item.gaugeBandLabel.toLowerCase();
  if (label.includes('ideal')) return 'ideal';
  if (label.includes('too low')) return 'too-low';
  if (label.includes('too high')) return 'too-high';
  if (label.includes('low')) return 'low-shoulder';
  if (label.includes('high')) return 'high-shoulder';
  if (label.includes('minimum')) return 'minimum-met';
  return 'unknown';
}

function fallbackScoreBreakdown(item: RiverSummaryApiItem): RiverDetailApiResult['scoreBreakdown'] {
  return {
    riverQuality: item.score,
    windAdjustment: 0,
    temperatureAdjustment: 0,
    rainAdjustment: 0,
    comfortAdjustment: 0,
    rawTripScore: item.score,
    finalScore: item.score,
    capReasons: [],
    riverQualityExplanation: item.summary.gaugeNow || item.gaugeBandLabel,
    windExplanation: item.liveData.weatherDetail,
    temperatureExplanation: item.liveData.weatherDetail,
    rainExplanation: item.liveData.weatherDetail,
    comfortExplanation: item.summary.shortExplanation || item.explanation,
  };
}

function confidenceLevel(label: RiverSummaryApiItem['confidence']['label']): RiverDetailApiResult['confidence']['level'] {
  if (label === 'High') return 'high';
  if (label === 'Medium') return 'medium';
  return 'low';
}

function normalizeSummarySnapshotItem(item: RiverSummaryApiItem): RiverSummaryApiItem {
  const river = getRiverBySlug(item.river.slug);
  const { safetyProfile: _safetyProfile, logistics: storedLogistics, ...storedRiver } = item.river;
  return {
    ...item,
    river: {
      ...storedRiver,
      estimatedPaddleTime: item.river.estimatedPaddleTime || river?.logistics?.estimatedPaddleTime || '',
      difficulty: item.river.difficulty || river?.profile.difficulty || 'moderate',
      routeType: item.river.routeType || river?.routeType || 'recreational',
      putIn: item.river.putIn || river?.putIn,
      takeOut: item.river.takeOut || river?.takeOut,
      accessPoints: item.river.accessPoints || river?.accessPoints,
      logistics: {
        campingClassification:
          storedLogistics?.campingClassification
          ?? river?.logistics?.campingClassification
          ?? 'unknown',
      },
    },
  };
}

function isStoredSnapshotFresh(snapshot: { generatedAt: string }) {
  const generatedAt = Date.parse(snapshot.generatedAt);
  return Number.isFinite(generatedAt) && Date.now() - generatedAt <= MAX_STORED_SNAPSHOT_AGE_MS;
}

function normalizeWeekendSnapshotItem(item: WeekendSummaryApiItem): WeekendSummaryApiItem {
  const river = getRiverBySlug(item.river.slug);
  const { safetyProfile: _safetyProfile, logistics: storedLogistics, ...storedRiver } = item.river;
  return {
    ...item,
    river: {
      ...storedRiver,
      estimatedPaddleTime: item.river.estimatedPaddleTime || river?.logistics?.estimatedPaddleTime || '',
      difficulty: item.river.difficulty || river?.profile.difficulty || 'moderate',
      routeType: item.river.routeType || river?.routeType || 'recreational',
      accessPoints: item.river.accessPoints || river?.accessPoints,
      logistics: {
        campingClassification:
          storedLogistics?.campingClassification
          ?? river?.logistics?.campingClassification
          ?? 'unknown',
      },
    },
  };
}

function normalizeDetailSnapshotResult(result: RiverDetailApiResult): RiverDetailApiResult {
  const river = getRiverBySlug(result.river.slug);
  return {
    ...result,
    river: {
      ...result.river,
      estimatedPaddleTime: result.river.estimatedPaddleTime || river?.logistics?.estimatedPaddleTime || '',
      routeType: result.river.routeType || river?.routeType || 'recreational',
      safetyProfile: result.river.safetyProfile || river?.safetyProfile,
      accessPoints: result.river.accessPoints || river?.accessPoints,
      logistics: result.river.logistics || river?.logistics,
      gaugeSource:
        river && !result.river.gaugeSource.display
          ? {
              ...result.river.gaugeSource,
              display: gaugeDisplayForSource(river.gaugeSource),
            }
          : result.river.gaugeSource,
    },
  };
}

function buildSummarySnapshot(results: RiverScoreResult[], generatedAt: string): RiverSummarySnapshot {
  return {
    generatedAt,
    riverCount: results.length,
    rivers: results.map((result) => serializeSummaryResult({
      ...result,
      generatedAt,
    })),
  };
}

function buildWeekendSummarySnapshot(results: RiverScoreResult[], generatedAt: string): WeekendSummarySnapshot {
  const rivers = results
    .map((result) =>
      serializeWeekendSummaryResult({
        ...result,
        generatedAt,
      })
    )
    .filter((item): item is WeekendSummaryApiItem => Boolean(item))
    .sort((left, right) => {
      if (left.weekend.score !== right.weekend.score) {
        return right.weekend.score - left.weekend.score;
      }

      const confidenceWeight = { High: 3, Medium: 2, Low: 1 };
      const leftConfidence = confidenceWeight[left.weekend.confidence] ?? 0;
      const rightConfidence = confidenceWeight[right.weekend.confidence] ?? 0;
      if (leftConfidence !== rightConfidence) {
        return rightConfidence - leftConfidence;
      }

      return right.current.score - left.current.score;
    });

  return {
    generatedAt,
    label: rivers[0]?.weekend.label ?? 'Weekend',
    riverCount: rivers.length,
    withheldCount: Math.max(0, results.length - rivers.length),
    rivers,
  };
}

function buildDetailSnapshots(results: RiverScoreResult[], generatedAt: string) {
  return results.map((result) => ({
    slug: result.river.slug,
    payload: {
      generatedAt,
      result: serializeDetailResult({
        ...result,
        generatedAt,
      }),
    } satisfies RiverDetailSnapshot,
  }));
}

function summaryBlobName() {
  return `${snapshotPrefix()}/summary.json`;
}

function weekendSummaryBlobName() {
  return `${snapshotPrefix()}/weekend-summary.json`;
}

function detailBlobName(slug: string) {
  return `${snapshotPrefix()}/details/${slug}.json`;
}

function snapshotPrefix() {
  return cleanPathSegment(process.env.RIVER_SNAPSHOT_BLOB_PREFIX || 'river-snapshots');
}

function snapshotStorage():
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
  const configuredContainerSasUrl = process.env.RIVER_SNAPSHOT_CONTAINER_SAS_URL?.trim() ?? '';
  const container = parseContainerSas(configuredContainerSasUrl);
  if (configuredContainerSasUrl && !container) {
    throw new Error('RIVER_SNAPSHOT_CONTAINER_SAS_URL must be a valid container SAS URL.');
  }

  if (container) {
    return {
      kind: 'blob',
      async readJson<T>(blobName: string) {
        const response = await fetch(blobUrl(container, blobName), {
          method: 'GET',
          headers: { accept: 'application/json' },
        });

        if (response.status === 404) {
          return null;
        }

      if (!response.ok) {
          throw new Error(`Failed to read snapshot blob ${blobName}: HTTP ${response.status}`);
        }

        const payload: unknown = await response.json();
        if (
          !isRiverSummarySnapshot(payload) &&
          !isRiverDetailSnapshot(payload) &&
          !isWeekendSummarySnapshot(payload) &&
          !isRiverGroupSnapshot(payload)
        ) {
          throw new Error(`Invalid snapshot blob ${blobName}`);
        }
        return payload as T;
      },
      async writeJson(blobName: string, value: unknown) {
        const payload = JSON.stringify(value);
        const response = await fetch(blobUrl(container, blobName), {
          method: 'PUT',
          headers: {
            'x-ms-blob-type': 'BlockBlob',
            'content-type': 'application/json; charset=utf-8',
          },
          body: payload,
        });

        if (!response.ok) {
          throw new Error(`Failed to write snapshot blob ${blobName}: HTTP ${response.status}`);
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
        if (
          !isRiverSummarySnapshot(parsed) &&
          !isRiverDetailSnapshot(parsed) &&
          !isWeekendSummarySnapshot(parsed) &&
          !isRiverGroupSnapshot(parsed)
        ) {
          throw new Error(`Invalid snapshot JSON in ${blobName}`);
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
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, JSON.stringify(value), 'utf8');
    },
  };
}

function assertSnapshotSize(blobName: string, value: unknown, maxBytes: number) {
  const bytes = Buffer.byteLength(JSON.stringify(value));
  if (bytes > maxBytes) {
    throw new Error(
      `Snapshot ${blobName} is ${bytes} bytes; maximum is ${maxBytes}. `
      + 'Move detail-only fields out of the summary contract.',
    );
  }
}

function localPathFor(blobName: string) {
  return resolve(process.cwd(), process.env.RIVER_SNAPSHOT_DIR || DEFAULT_SNAPSHOT_DIR, blobName);
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

function blobUrl(container: BlobContainer, blobName: string) {
  return `${container.base}/${blobName}${container.query}`;
}

function cleanPathSegment(value: string) {
  return value
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-zA-Z0-9/_-]+/g, '-');
}
