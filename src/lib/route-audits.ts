import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { isBoolean, isRecord, isString, safeParseJson } from './json-guards';

const DEFAULT_AUDITS_DIR = '.local';
const ROUTE_AUDITS_PREFIX = cleanPathSegment(process.env.ROUTE_AUDITS_BLOB_PREFIX || 'route-audits');

export interface RouteAuditRecord {
  routeSlug: string;
  audited: boolean;
  auditedAt: string | null;
  auditedBy: string;
  notes: string;
  updatedAt: string;
}

interface RouteAuditIndex {
  audits: Record<string, RouteAuditRecord>;
}

type BlobContainer = {
  base: string;
  query: string;
};

type JsonStorage = {
  kind: 'blob' | 'local';
  readJson<T>(blobName: string): Promise<T | null>;
  writeJson(blobName: string, value: unknown): Promise<void>;
};

function isRouteAuditRecord(value: unknown): value is RouteAuditRecord {
  return (
    isRecord(value) &&
    isString(value.routeSlug) &&
    isBoolean(value.audited) &&
    (value.auditedAt === null || isString(value.auditedAt)) &&
    isString(value.auditedBy) &&
    isString(value.notes) &&
    isString(value.updatedAt)
  );
}

function isRouteAuditIndex(value: unknown): value is RouteAuditIndex {
  if (!isRecord(value) || !isRecord(value.audits)) {
    return false;
  }

  return Object.values(value.audits).every(isRouteAuditRecord);
}

function isRouteAuditStorageValue(value: unknown): value is RouteAuditIndex | RouteAuditRecord {
  return isRouteAuditIndex(value) || isRouteAuditRecord(value);
}

export async function listRouteAudits() {
  const index = (await routeAuditStorage().readJson<RouteAuditIndex>(indexBlobName())) ?? { audits: {} };
  return Object.values(index.audits).sort((left, right) => left.routeSlug.localeCompare(right.routeSlug));
}

export async function updateRouteAudit(args: {
  routeSlug: string;
  audited: boolean;
  reviewer: string;
  notes?: string;
}) {
  const storage = routeAuditStorage();
  const index = (await storage.readJson<RouteAuditIndex>(indexBlobName())) ?? { audits: {} };
  const previous = index.audits[args.routeSlug] ?? null;
  const updatedAt = new Date().toISOString();
  const record: RouteAuditRecord = {
    routeSlug: args.routeSlug,
    audited: args.audited,
    auditedAt: args.audited ? previous?.auditedAt || updatedAt : null,
    auditedBy: args.audited ? args.reviewer : '',
    notes: args.notes?.trim() ?? previous?.notes ?? '',
    updatedAt,
  };

  index.audits[args.routeSlug] = record;
  await storage.writeJson(indexBlobName(), index);
  await storage.writeJson(recordBlobName(args.routeSlug), record);
  return record;
}

function indexBlobName() {
  return `${ROUTE_AUDITS_PREFIX}/index.json`;
}

function recordBlobName(routeSlug: string) {
  return `${ROUTE_AUDITS_PREFIX}/routes/${cleanPathSegment(routeSlug)}.json`;
}

function routeAuditStorage(): JsonStorage {
  const container = parseContainerSas(process.env.ROUTE_AUDITS_CONTAINER_SAS_URL || '');
  if (container) {
    return {
      kind: 'blob',
      async readJson<T>(blobName: string) {
        const response = await fetch(blobUrl(container, blobName), { method: 'GET', headers: { accept: 'application/json' } });
        if (response.status === 404) return null;
        if (!response.ok) throw new Error(`Failed to read route audit blob ${blobName}: HTTP ${response.status}`);
        const payload: unknown = await response.json();
        if (!isRouteAuditStorageValue(payload)) {
          throw new Error(`Invalid route audit blob ${blobName}`);
        }
        return payload as T;
      },
      async writeJson(blobName: string, value: unknown) {
        const response = await fetch(blobUrl(container, blobName), {
          method: 'PUT',
          headers: {
            'x-ms-blob-type': 'BlockBlob',
            'content-type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(value, null, 2),
        });
        if (!response.ok) throw new Error(`Failed to write route audit blob ${blobName}: HTTP ${response.status}`);
      },
    };
  }

  return {
    kind: 'local',
    async readJson<T>(blobName: string) {
      const filePath = localPathFor(blobName);
      try {
        return safeParseJson(await readFile(filePath, 'utf8'), isRouteAuditStorageValue) as T | null;
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
  return resolve(process.cwd(), process.env.ROUTE_AUDITS_DIR || DEFAULT_AUDITS_DIR, blobName);
}

function parseContainerSas(value: string): BlobContainer | null {
  if (!value) return null;
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
  return value.trim().replace(/^\/+|\/+$/g, '').replace(/[^a-zA-Z0-9/_-]+/g, '-');
}
