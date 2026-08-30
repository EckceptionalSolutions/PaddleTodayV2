import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  cleanBlobPath as cleanPathSegment,
  createJsonStorage,
  parseContainerSas,
  type JsonStorage,
} from './blob-storage';
import {
  isArrayOf,
  isNumber,
  isOptionalString,
  isRecord,
  isString,
} from './json-guards';
import {
  serializeDetailResult,
  difficultyOptionsForRoutes,
  distanceRangeForLabels,
  serializeSummaryResult,
  serializeWeekendSummaryResult,
  type RiverDetailApiResult,
  type RiverGroupApiResult,
  type RiverSummaryApiItem,
  type WeekendSummaryApiItem,
} from './api-contract';
import { todayBoardConfidenceWeight } from '@paddletoday/api-contract';
import { getRiverGroupHeroPhoto } from '../data/river-group-hero';
import { getRiverBySlug, listRiverGroups } from './rivers';
import { gaugeDisplayForSource } from './source-adapters';
import { conditionZoneIdForRiver } from './condition-zones';
import { corridorForSlug } from '../data/route-corridors';
import { mapWithConcurrency } from './async-concurrency';
import type { GaugeBand, RiverGaugeSource, RiverScoreResult } from './types';

const DEFAULT_SNAPSHOT_DIR = '.local';
// Scheduled snapshots are expected every 30 minutes. After two hours they are
// stale and must be presented as degraded, but public request handlers may
// still use them rather than fan out to every upstream provider during an
// outage.
const MAX_STORED_SNAPSHOT_AGE_MS = 2 * 60 * 60 * 1000;
const MAX_STORED_SNAPSHOT_CLOCK_SKEW_MS = 5 * 60 * 1000;
const MAX_SUMMARY_SNAPSHOT_BYTES = 4 * 1024 * 1024;

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

export type StoredSnapshotStatus = 'fresh' | 'stale';

export interface StoredSnapshotMetadata {
  snapshotStatus: StoredSnapshotStatus;
  snapshotAgeSeconds: number;
}

export interface StoredSnapshotReadOptions {
  allowStale?: boolean;
}

type StoredSnapshot<T> = T & StoredSnapshotMetadata;

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
  await storage.writeJson(weekendSummaryBlobName(), weekendSummary);
  await storage.writeJson(summaryBlobName(), summary);

  return {
    generatedAt,
    routeCount: args.results.length,
    groupCount,
    storage: storage.kind,
  };
}

export async function getStoredRiverSummarySnapshot(
  options: StoredSnapshotReadOptions = {},
): Promise<StoredSnapshot<RiverSummarySnapshot> | null> {
  const snapshot = await readStoredOrLocalSummary();
  const metadata = snapshot ? storedSnapshotMetadata(snapshot) : null;
  if (!snapshot || !metadata || (metadata.snapshotStatus === 'stale' && !options.allowStale)) {
    return null;
  }

  return {
    ...snapshot,
    ...metadata,
    rivers: snapshot.rivers
      .map(normalizeSummarySnapshotItem)
      .map((item) => metadata.snapshotStatus === 'stale' ? markSummarySnapshotItemStale(item) : item),
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

export async function getStoredRiverDetailSnapshot(
  slug: string,
  options: StoredSnapshotReadOptions = {},
): Promise<StoredSnapshot<RiverDetailSnapshot> | null> {
  const snapshot =
    (await snapshotStorage().readJson<RiverDetailSnapshot>(detailBlobName(slug))) ??
    (await readSummaryDetailFallback(slug));
  const metadata = snapshot ? storedSnapshotMetadata(snapshot) : null;
  if (!snapshot || !metadata || (metadata.snapshotStatus === 'stale' && !options.allowStale)) {
    return null;
  }

  const result = normalizeDetailSnapshotResult(snapshot.result);

  return {
    ...snapshot,
    ...metadata,
    result: metadata.snapshotStatus === 'stale' ? markDetailSnapshotResultStale(result) : result,
  };
}

export async function getStoredWeekendSummarySnapshot(
  options: StoredSnapshotReadOptions = {},
): Promise<StoredSnapshot<WeekendSummarySnapshot> | null> {
  const snapshot =
    (await snapshotStorage().readJson<WeekendSummarySnapshot>(weekendSummaryBlobName())) ??
    (await readSummaryWeekendFallback());
  const metadata = snapshot ? storedSnapshotMetadata(snapshot) : null;
  if (!snapshot || !metadata || (metadata.snapshotStatus === 'stale' && !options.allowStale)) {
    return null;
  }

  return {
    ...snapshot,
    ...metadata,
    rivers: snapshot.rivers
      .map(normalizeWeekendSnapshotItem)
      .map((item) => metadata.snapshotStatus === 'stale' ? markWeekendSnapshotItemStale(item) : item),
  };
}

export async function getStoredRiverGroupSnapshot(
  riverId: string,
  options: StoredSnapshotReadOptions = {},
): Promise<StoredSnapshot<RiverGroupSnapshot> | null> {
  const snapshot = await readSummaryGroupFallback(riverId);
  const metadata = snapshot ? storedSnapshotMetadata(snapshot) : null;
  if (!snapshot || !metadata || (metadata.snapshotStatus === 'stale' && !options.allowStale)) {
    return null;
  }

  return {
    ...snapshot,
    ...metadata,
    result: {
      ...snapshot.result,
      routes: snapshot.result.routes
        .map(normalizeDetailSnapshotResult)
        .map((result) => metadata.snapshotStatus === 'stale' ? markDetailSnapshotResultStale(result) : result),
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
        regions,
        difficultyOptions: difficultyOptionsForRoutes(routes.map((route) => route.river.difficulty)),
        distanceRange: distanceRangeForLabels(routes.map((route) => route.river.distanceLabel)),
        heroPhoto: getRiverGroupHeroPhoto(riverId, routes.map((route) => route.river)),
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
      conditionZoneId: normalized.river.conditionZoneId,
      corridorId: normalized.river.corridorId,
      corridorLabel: normalized.river.corridorLabel,
      continuityStatus: normalized.river.continuityStatus,
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
      segmentEdges: normalized.river.segmentEdges,
    },
    score: item.score,
    rating: item.rating,
    readiness: item.readiness ?? fallbackReadiness(item),
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
    readiness: item.readiness ?? fallbackReadiness(item),
    river: {
      ...storedRiver,
      conditionZoneId: item.river.conditionZoneId || (river ? conditionZoneIdForRiver(river) : undefined),
      corridorId: item.river.corridorId || river?.corridorId || corridorForSlug(item.river.slug)?.corridorId,
      corridorLabel: item.river.corridorLabel || river?.corridorLabel || corridorForSlug(item.river.slug)?.label,
      continuityStatus: item.river.continuityStatus || river?.continuityStatus || corridorForSlug(item.river.slug)?.continuityStatus,
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

export function isStoredSnapshotFresh(snapshot: { generatedAt: string }) {
  return storedSnapshotMetadata(snapshot)?.snapshotStatus === 'fresh';
}

export function storedSnapshotMetadata(snapshot: { generatedAt: string }): StoredSnapshotMetadata | null {
  const generatedAt = Date.parse(snapshot.generatedAt);
  if (!Number.isFinite(generatedAt)) {
    return null;
  }

  const ageMs = Date.now() - generatedAt;
  if (ageMs < -MAX_STORED_SNAPSHOT_CLOCK_SKEW_MS) {
    return null;
  }

  return {
    snapshotStatus: ageMs <= MAX_STORED_SNAPSHOT_AGE_MS ? 'fresh' : 'stale',
    snapshotAgeSeconds: Math.max(0, Math.floor(ageMs / 1000)),
  };
}

function markSummarySnapshotItemStale(item: RiverSummaryApiItem): RiverSummaryApiItem {
  const staleSummary = staleSnapshotMessage(item.generatedAt);
  return {
    ...item,
    liveData: {
      ...item.liveData,
      overall: item.liveData.overall === 'offline' ? 'offline' : 'degraded',
      summary: staleSummary,
      gaugeState: item.liveData.gaugeState === 'unavailable' ? 'unavailable' : 'stale',
      gaugeDetail: `${item.liveData.gaugeDetail} ${staleSummary}`,
      weatherState: item.liveData.weatherState === 'unavailable' ? 'unavailable' : 'stale',
      weatherDetail: `${item.liveData.weatherDetail} ${staleSummary}`,
    },
  };
}

function markWeekendSnapshotItemStale(item: WeekendSummaryApiItem): WeekendSummaryApiItem {
  const staleSummary = staleSnapshotMessage(item.generatedAt);
  return {
    ...item,
    liveData: {
      ...item.liveData,
      overall: item.liveData.overall === 'offline' ? 'offline' : 'degraded',
      summary: staleSummary,
      gaugeState: item.liveData.gaugeState === 'unavailable' ? 'unavailable' : 'stale',
      gaugeDetail: `${item.liveData.gaugeDetail} ${staleSummary}`,
      weatherState: item.liveData.weatherState === 'unavailable' ? 'unavailable' : 'stale',
      weatherDetail: `${item.liveData.weatherDetail} ${staleSummary}`,
    },
  };
}

function markDetailSnapshotResultStale(result: RiverDetailApiResult): RiverDetailApiResult {
  const staleSummary = staleSnapshotMessage(result.generatedAt);
  return {
    ...result,
    liveData: {
      ...result.liveData,
      overall: result.liveData.overall === 'offline' ? 'offline' : 'degraded',
      summary: staleSummary,
      gauge: {
        ...result.liveData.gauge,
        state: result.liveData.gauge.state === 'unavailable' ? 'unavailable' : 'stale',
        detail: `${result.liveData.gauge.detail} ${staleSummary}`,
      },
      weather: {
        ...result.liveData.weather,
        state: result.liveData.weather.state === 'unavailable' ? 'unavailable' : 'stale',
        detail: `${result.liveData.weather.detail} ${staleSummary}`,
      },
    },
  };
}

function staleSnapshotMessage(generatedAt: string) {
  const metadata = storedSnapshotMetadata({ generatedAt });
  const ageMinutes = Math.max(1, Math.round((metadata?.snapshotAgeSeconds ?? 0) / 60));
  const ageLabel = ageMinutes >= 120 ? `${Math.round(ageMinutes / 60)} hours` : `${ageMinutes} minutes`;
  return `The latest successful Paddle Today snapshot is ${ageLabel} old. Treat these conditions as stale and verify before driving or launching.`;
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
    readiness: result.readiness ?? {
      status: result.liveData.gauge.state !== 'live' ? 'withheld' : result.rating === 'No-go' ? 'skip' : 'verify',
      label: result.liveData.gauge.state !== 'live' ? 'Withheld' : result.rating === 'No-go' ? 'Skip' : 'Verify',
      reason: 'Derived from a stored result created before explicit readiness was available.',
    },
    outlooks: result.outlooks.map((outlook) => ({
      ...outlook,
      direction: outlook.direction ?? 'uncertain',
      scoreRange: outlook.scoreRange ?? (typeof outlook.score === 'number' ? { min: outlook.score, max: outlook.score } : null),
    })),
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

function fallbackReadiness(item: RiverSummaryApiItem): RiverSummaryApiItem['readiness'] {
  if (item.liveData.gaugeState !== 'live') {
    return { status: 'withheld', label: 'Withheld', reason: item.liveData.gaugeDetail };
  }
  if (item.rating === 'No-go') {
    return { status: 'skip', label: 'Skip', reason: item.explanation };
  }
  return { status: 'verify', label: 'Verify', reason: 'Refresh this stored result before using it as launch readiness.' };
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

      const leftConfidence = todayBoardConfidenceWeight[left.weekend.confidence] ?? 0;
      const rightConfidence = todayBoardConfidenceWeight[right.weekend.confidence] ?? 0;
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

function snapshotStorage(): JsonStorage {
  const configuredContainerSasUrl = process.env.RIVER_SNAPSHOT_CONTAINER_SAS_URL?.trim() ?? '';
  if (configuredContainerSasUrl && !parseContainerSas(configuredContainerSasUrl)) {
    throw new Error('RIVER_SNAPSHOT_CONTAINER_SAS_URL must be a valid container SAS URL.');
  }

  return createJsonStorage({
    containerSasUrl: configuredContainerSasUrl,
    localDirectory: process.env.RIVER_SNAPSHOT_DIR || DEFAULT_SNAPSHOT_DIR,
    validate: (value) => (
      isRiverSummarySnapshot(value)
      || isRiverDetailSnapshot(value)
      || isWeekendSummarySnapshot(value)
      || isRiverGroupSnapshot(value)
    ),
    label: 'snapshot',
    space: 0,
  });
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

