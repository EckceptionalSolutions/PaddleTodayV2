import {
  cleanBlobPath as cleanPathSegment,
  createJsonStorage,
  type JsonStorage,
} from './blob-storage';
import { isBoolean, isRecord, isString } from './json-guards';

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
  return createJsonStorage({
    containerSasUrl: process.env.ROUTE_AUDITS_CONTAINER_SAS_URL,
    localDirectory: process.env.ROUTE_AUDITS_DIR || DEFAULT_AUDITS_DIR,
    validate: isRouteAuditStorageValue,
    label: 'route audit',
  });
}
