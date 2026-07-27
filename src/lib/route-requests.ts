import {
  cleanBlobPath as cleanPathSegment,
  createJsonStorage,
  type JsonStorage,
} from './blob-storage';
import { isOptionalString, isRecord, isString } from './json-guards';

const DEFAULT_REQUESTS_DIR = '.local';

export interface RouteRequestRecord {
  submittedAt: string;
  routeName: string;
  state: string;
  putIn: string;
  takeOut: string;
  sources: string;
  notes: string;
  replyEmail: string;
  meta?: {
    ip?: string;
    ua?: string;
    referer?: string;
  };
  replies?: RouteRequestReplyRecord[];
  _blobName?: string;
}

export interface RouteRequestReplyRecord {
  sentAt: string;
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  provider: 'azure' | 'log' | 'manual';
  providerId: string;
}

function isRouteRequestMeta(value: unknown): value is NonNullable<RouteRequestRecord['meta']> {
  if (!isRecord(value)) {
    return false;
  }

  return isOptionalString(value.ip) && isOptionalString(value.ua) && isOptionalString(value.referer);
}

function isRouteRequestRecord(value: unknown): value is RouteRequestRecord {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.submittedAt) &&
    isString(value.routeName) &&
    isString(value.state) &&
    isString(value.putIn) &&
    isString(value.takeOut) &&
    isString(value.sources) &&
    isString(value.notes) &&
    isString(value.replyEmail) &&
    (value.meta === undefined || isRouteRequestMeta(value.meta)) &&
    (value.replies === undefined || Array.isArray(value.replies)) &&
    (value._blobName === undefined || isString(value._blobName))
  );
}

export async function listRouteRequests(): Promise<RouteRequestRecord[]> {
  const prefix = cleanPathSegment(process.env.ROUTE_REQUESTS_BLOB_PREFIX || 'route-requests');
  const storage = routeRequestStorage();
  const storageKeys = await storage.listJsonNames(prefix ? `${prefix}/` : '');
  const items = await Promise.all(
    storageKeys.map(async (storageKey) => {
      try {
        const payload = await storage.readJson<RouteRequestRecord>(storageKey);
        if (!payload) {
          return null;
        }
        return {
          ...payload,
          _blobName: storageKey,
        };
      } catch {
        return null;
      }
    }),
  );
  return items.filter((item): item is RouteRequestRecord => item !== null).sort(sortNewestFirst);
}

export async function getRouteRequestByStorageKey(storageKey: string): Promise<RouteRequestRecord | null> {
  try {
    const request = await routeRequestStorage().readJson<RouteRequestRecord>(storageKey);
    return request ? { ...request, _blobName: storageKey } : null;
  } catch {
    return null;
  }
}

export async function appendRouteRequestReply(storageKey: string, reply: RouteRequestReplyRecord): Promise<RouteRequestRecord> {
  const routeRequest = await getRouteRequestByStorageKey(storageKey);
  if (!routeRequest) {
    throw new Error('Route request not found.');
  }

  const next: RouteRequestRecord = {
    ...routeRequest,
    replies: [...(Array.isArray(routeRequest.replies) ? routeRequest.replies : []), reply],
  };
  delete next._blobName;

  await writeRouteRequest(storageKey, next);

  return {
    ...next,
    _blobName: storageKey,
  };
}

function sortNewestFirst(left: RouteRequestRecord, right: RouteRequestRecord) {
  return String(right.submittedAt || '').localeCompare(String(left.submittedAt || ''));
}

async function writeRouteRequest(storageKey: string, routeRequest: RouteRequestRecord) {
  await routeRequestStorage().writeJson(storageKey, routeRequest);
}

function routeRequestStorage(): JsonStorage {
  return createJsonStorage({
    containerSasUrl: process.env.ROUTE_REQUESTS_CONTAINER_SAS_URL,
    localDirectory: process.env.ROUTE_REQUESTS_DIR || DEFAULT_REQUESTS_DIR,
    validate: isRouteRequestRecord,
    label: 'route request',
  });
}
