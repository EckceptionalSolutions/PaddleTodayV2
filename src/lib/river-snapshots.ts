import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
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
import { listRiverGroups } from './rivers';
import type { RiverScoreResult } from './types';

const DEFAULT_SNAPSHOT_DIR = '.local';

type BlobContainer = {
  base: string;
  query: string;
};

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
  return snapshotStorage().readJson<RiverSummarySnapshot>(summaryBlobName());
}

export async function getStoredRiverDetailSnapshot(slug: string): Promise<RiverDetailSnapshot | null> {
  return snapshotStorage().readJson<RiverDetailSnapshot>(detailBlobName(slug));
}

export async function getStoredWeekendSummarySnapshot(): Promise<WeekendSummarySnapshot | null> {
  return snapshotStorage().readJson<WeekendSummarySnapshot>(weekendSummaryBlobName());
}

export async function getStoredRiverGroupSnapshot(riverId: string): Promise<RiverGroupSnapshot | null> {
  return snapshotStorage().readJson<RiverGroupSnapshot>(groupBlobName(riverId));
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

        return (await response.json()) as T;
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
        return JSON.parse(payload) as T;
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
