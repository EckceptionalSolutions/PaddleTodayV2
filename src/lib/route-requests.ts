import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { isOptionalString, isRecord, isString, safeParseJson } from './json-guards';

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
  provider: 'azure' | 'log';
  providerId: string;
}

type BlobContainer = {
  base: string;
  query: string;
};

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
  const container = parseContainerSas(process.env.ROUTE_REQUESTS_CONTAINER_SAS_URL || '');
  const prefix = cleanPathSegment(process.env.ROUTE_REQUESTS_BLOB_PREFIX || 'route-requests');
  if (container) {
    const blobNames = await listBlobNames(container, prefix ? `${prefix}/` : '');
    const items = await Promise.all(
      blobNames
        .filter((name) => name.endsWith('.json'))
        .map(async (blobName) => {
          try {
            const response = await fetch(blobUrl(container, blobName), {
              method: 'GET',
              headers: { accept: 'application/json' },
            });
            if (!response.ok) return null;
            const payload: unknown = await response.json();
            if (!isRouteRequestRecord(payload)) {
              return null;
            }
            payload._blobName = blobName;
            return payload;
          } catch {
            return null;
          }
        })
    );
    return items.filter((item): item is RouteRequestRecord => item !== null).sort(sortNewestFirst);
  }

  const localDir = resolve(process.cwd(), process.env.ROUTE_REQUESTS_DIR || DEFAULT_REQUESTS_DIR, prefix || 'route-requests');
  const files = await listLocalJsonFiles(localDir);
  const items = await Promise.all(
    files.map(async (filePath) => {
      try {
        const payload = safeParseJson(await readFile(filePath, 'utf8'), isRouteRequestRecord);
        if (!payload) {
          return null;
        }
        payload._blobName = filePath;
        return payload;
      } catch {
        return null;
      }
    })
  );
  return items.filter((item): item is RouteRequestRecord => item !== null).sort(sortNewestFirst);
}

export async function getRouteRequestByStorageKey(storageKey: string): Promise<RouteRequestRecord | null> {
  const requests = await listRouteRequests();
  return requests.find((request) => request._blobName === storageKey) ?? null;
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

async function listLocalJsonFiles(dir: string): Promise<string[]> {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const nested = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = resolve(dir, entry.name);
        if (entry.isDirectory()) return listLocalJsonFiles(fullPath);
        return fullPath.endsWith('.json') ? [fullPath] : [];
      })
    );
    return nested.flat();
  } catch {
    return [];
  }
}

async function listBlobNames(container: BlobContainer, prefix: string) {
  const prefixParam = prefix ? `&prefix=${encodeURIComponent(prefix)}` : '';
  const query = container.query ? `&${container.query.slice(1)}` : '';
  const response = await fetch(`${container.base}?restype=container&comp=list${prefixParam}${query}`, {
    method: 'GET',
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Failed to list route request blobs: HTTP ${response.status}${detail ? ` ${detail.slice(0, 300)}` : ''}`);
  }
  const xml = await response.text();
  return [...xml.matchAll(/<Name>([^<]+)<\/Name>/g)].map((match) => decodeXml(match[1]));
}

function sortNewestFirst(left: RouteRequestRecord, right: RouteRequestRecord) {
  return String(right.submittedAt || '').localeCompare(String(left.submittedAt || ''));
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

async function writeRouteRequest(storageKey: string, routeRequest: RouteRequestRecord) {
  const container = parseContainerSas(process.env.ROUTE_REQUESTS_CONTAINER_SAS_URL || '');
  if (container) {
    const response = await fetch(blobUrl(container, storageKey), {
      method: 'PUT',
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(routeRequest, null, 2),
    });
    if (!response.ok) {
      throw new Error(`Failed to update route request blob: HTTP ${response.status}`);
    }
    return;
  }

  await writeFile(storageKey, JSON.stringify(routeRequest, null, 2), 'utf8');
}

function cleanPathSegment(value: string) {
  return value.trim().replace(/^\/+|\/+$/g, '').replace(/[^a-zA-Z0-9/_-]+/g, '-');
}

function decodeXml(value: string) {
  return value
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&amp;', '&');
}
