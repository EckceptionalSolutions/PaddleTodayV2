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
  serializeRiverGroupResult,
  serializeSummaryResult,
  serializeWeekendSummaryResult,
  type RiverDetailApiResult,
  type RiverGroupApiResult,
  type RiverSummaryApiItem,
  type WeekendSummaryApiItem,
} from './api-contract';
import { getRiverBySlug, listRiverGroups } from './rivers';
import { gaugeDisplayForSource } from './source-adapters';
import type { RiverScoreResult } from './types';

const DEFAULT_SNAPSHOT_DIR = '.local';

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
  return isRecord(value) && isString(value.riverId) && isArrayOf(value.routes, isRiverDetailApiResult);
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
  const groupSnapshots = buildGroupSnapshots(args.results, generatedAt);

  await Promise.all([
    storage.writeJson(summaryBlobName(), summary),
    storage.writeJson(weekendSummaryBlobName(), weekendSummary),
  ]);
  await Promise.all([
    ...detailSnapshots.map(({ slug, payload }) => storage.writeJson(detailBlobName(slug), payload)),
    ...groupSnapshots.map(({ riverId, payload }) => storage.writeJson(groupBlobName(riverId), payload)),
  ]);

  return {
    generatedAt,
    routeCount: args.results.length,
    groupCount: groupSnapshots.length,
    storage: storage.kind,
  };
}

export async function getStoredRiverSummarySnapshot(): Promise<RiverSummarySnapshot | null> {
  const snapshot = await snapshotStorage().readJson<RiverSummarySnapshot>(summaryBlobName());
  if (!snapshot) {
    return null;
  }

  return {
    ...snapshot,
    rivers: snapshot.rivers.map(normalizeSummarySnapshotItem),
  };
}

export async function getStoredRiverDetailSnapshot(slug: string): Promise<RiverDetailSnapshot | null> {
  const snapshot = await snapshotStorage().readJson<RiverDetailSnapshot>(detailBlobName(slug));
  if (!snapshot) {
    return null;
  }

  return {
    ...snapshot,
    result: normalizeDetailSnapshotResult(snapshot.result),
  };
}

export async function getStoredWeekendSummarySnapshot(): Promise<WeekendSummarySnapshot | null> {
  const snapshot = await snapshotStorage().readJson<WeekendSummarySnapshot>(weekendSummaryBlobName());
  if (!snapshot) {
    return null;
  }

  return {
    ...snapshot,
    rivers: snapshot.rivers.map(normalizeWeekendSnapshotItem),
  };
}

export async function getStoredRiverGroupSnapshot(riverId: string): Promise<RiverGroupSnapshot | null> {
  const snapshot = await snapshotStorage().readJson<RiverGroupSnapshot>(groupBlobName(riverId));
  if (!snapshot) {
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

function normalizeSummarySnapshotItem(item: RiverSummaryApiItem): RiverSummaryApiItem {
  const river = getRiverBySlug(item.river.slug);
  return {
    ...item,
    river: {
      ...item.river,
      estimatedPaddleTime: item.river.estimatedPaddleTime || river?.logistics?.estimatedPaddleTime || '',
      difficulty: item.river.difficulty || river?.profile.difficulty || 'moderate',
      routeType: item.river.routeType || river?.routeType || 'recreational',
      putIn: item.river.putIn || river?.putIn,
      takeOut: item.river.takeOut || river?.takeOut,
    },
  };
}

function normalizeWeekendSnapshotItem(item: WeekendSummaryApiItem): WeekendSummaryApiItem {
  const river = getRiverBySlug(item.river.slug);
  return {
    ...item,
    river: {
      ...item.river,
      estimatedPaddleTime: item.river.estimatedPaddleTime || river?.logistics?.estimatedPaddleTime || '',
      difficulty: item.river.difficulty || river?.profile.difficulty || 'moderate',
      routeType: item.river.routeType || river?.routeType || 'recreational',
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
    .filter(Boolean)
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

function buildGroupSnapshots(results: RiverScoreResult[], generatedAt: string) {
  const byRiverId = new Map<string, RiverScoreResult[]>();

  for (const result of results) {
    const riverId = result.river.riverId;
    if (!riverId) {
      continue;
    }

    const bucket = byRiverId.get(riverId) ?? [];
    bucket.push(result);
    byRiverId.set(riverId, bucket);
  }

  return listRiverGroups()
    .map((group) => {
      const routes = [...(byRiverId.get(group.riverId) ?? [])].sort((left, right) => right.score - left.score);
      if (routes.length === 0) {
        return null;
      }

      return {
        riverId: group.riverId,
        payload: {
          generatedAt,
          result: serializeRiverGroupResult({
            riverId: group.riverId,
            routes: routes.map((route) => ({
              ...route,
              generatedAt,
            })),
          }),
        } satisfies RiverGroupSnapshot,
      };
    })
    .filter(Boolean) as Array<{ riverId: string; payload: RiverGroupSnapshot }>;
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

function groupBlobName(riverId: string) {
  return `${snapshotPrefix()}/groups/${riverId}.json`;
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
  const container = parseContainerSas(process.env.RIVER_SNAPSHOT_CONTAINER_SAS_URL ?? '');
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
        const payload = JSON.stringify(value, null, 2);
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
      await writeFile(filePath, JSON.stringify(value, null, 2), 'utf8');
    },
  };
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
