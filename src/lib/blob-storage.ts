import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { createHash } from 'node:crypto';

export interface BlobContainer {
  base: string;
  query: string;
}

export interface ParseContainerSasOptions {
  throwOnInvalid?: boolean;
}

export interface PutJsonBlobOptions {
  fetchImplementation?: typeof fetch;
  space?: number;
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
  ifMatch?: string;
  ifNoneMatch?: string;
}

export interface JsonStorage {
  kind: 'blob' | 'local';
  listJsonNames(prefix?: string): Promise<string[]>;
  readJson<T>(blobName: string): Promise<T | null>;
  readJsonWithEtag<T>(blobName: string): Promise<{ value: T | null; etag: string | null }>;
  writeJson(blobName: string, value: unknown, options?: { ifMatch?: string; ifNoneMatch?: string }): Promise<void>;
}

export class BlobPreconditionError extends Error {
  readonly status = 412;

  constructor(message = 'Blob changed before the mutation could be committed.') {
    super(message);
    this.name = 'BlobPreconditionError';
  }
}

export interface CreateJsonStorageOptions {
  containerSasUrl?: string | null;
  localDirectory: string;
  validate: (value: unknown) => boolean;
  label: string;
  space?: number;
  fetchImplementation?: typeof fetch;
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
}

const DEFAULT_BLOB_TIMEOUT_MS = 30_000;
const DEFAULT_BLOB_ATTEMPTS = 3;
const DEFAULT_BLOB_RETRY_DELAY_MS = 500;
const jsonMutationLocks = new Map<string, Promise<void>>();

/** Serialize read-modify-write mutations within this process. */
export async function withJsonStorageLock<T>(key: string, operation: () => Promise<T>): Promise<T> {
  const previous = jsonMutationLocks.get(key) ?? Promise.resolve();
  let release!: () => void;
  const current = new Promise<void>((resolve) => { release = resolve; });
  jsonMutationLocks.set(key, current);
  await previous;
  try {
    return await operation();
  } finally {
    release();
    if (jsonMutationLocks.get(key) === current) jsonMutationLocks.delete(key);
  }
}

export async function mutateJson<T>(args: {
  storage: JsonStorage;
  blobName: string;
  initial: T;
  mutate: (current: T) => T | Promise<T>;
  attempts?: number;
}): Promise<T> {
  return withJsonStorageLock(`${args.storage.kind}:${args.blobName}`, () => mutateJsonUnlocked(args));
}

async function mutateJsonUnlocked<T>(args: {
  storage: JsonStorage;
  blobName: string;
  initial: T;
  mutate: (current: T) => T | Promise<T>;
  attempts?: number;
}): Promise<T> {
  const attempts = Math.max(1, args.attempts ?? 5);
  let lastConflict: unknown;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const current = await args.storage.readJsonWithEtag<T>(args.blobName);
    const next = await args.mutate(current.value ?? structuredClone(args.initial));
    try {
      await args.storage.writeJson(
        args.blobName,
        next,
        current.etag ? { ifMatch: current.etag } : { ifNoneMatch: '*' },
      );
      return next;
    } catch (error) {
      if (!(error instanceof BlobPreconditionError)) throw error;
      lastConflict = error;
    }
  }
  throw lastConflict instanceof Error
    ? lastConflict
    : new BlobPreconditionError(`Could not commit ${args.blobName} after ${attempts} attempts.`);
}

/**
 * Splits a container SAS URL into its stable container base and signed query.
 * Domain repositories can then build blob URLs without re-parsing credentials.
 */
export function parseContainerSas(
  value: string | null | undefined,
  options: ParseContainerSasOptions = {},
): BlobContainer | null {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return null;

  try {
    const url = new URL(raw);
    const query = url.search;
    url.search = '';
    url.hash = '';
    return {
      base: url.toString().replace(/\/$/, ''),
      query,
    };
  } catch (error) {
    if (options.throwOnInvalid) throw error;
    return null;
  }
}

export function blobUrl(container: BlobContainer, blobName: string) {
  return `${container.base}/${blobName.replace(/^\/+/, '')}${container.query}`;
}

export function cleanBlobPath(value: string) {
  return value
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-zA-Z0-9/_-]+/g, '-');
}

export async function putJsonBlob(
  container: BlobContainer,
  blobName: string,
  value: unknown,
  options: PutJsonBlobOptions = {},
) {
  const fetchImplementation = options.fetchImplementation ?? fetch;
  return fetchWithRetry(fetchImplementation, blobUrl(container, blobName), {
    method: 'PUT',
    headers: {
      'x-ms-blob-type': 'BlockBlob',
      'content-type': 'application/json; charset=utf-8',
      ...(options.ifMatch ? { 'if-match': options.ifMatch } : {}),
      ...(options.ifNoneMatch ? { 'if-none-match': options.ifNoneMatch } : {}),
    },
    body: JSON.stringify(value, null, options.space ?? 2),
  }, options);
}

async function fetchWithRetry(
  fetchImplementation: typeof fetch,
  url: string,
  init: RequestInit,
  options: Pick<CreateJsonStorageOptions, 'timeoutMs' | 'retries' | 'retryDelayMs'>,
) {
  const timeoutMs = positiveInteger(options.timeoutMs, DEFAULT_BLOB_TIMEOUT_MS);
  const attempts = positiveInteger(options.retries, DEFAULT_BLOB_ATTEMPTS);
  const retryDelayMs = positiveInteger(options.retryDelayMs, DEFAULT_BLOB_RETRY_DELAY_MS);
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetchImplementation(url, {
        ...init,
        signal: controller.signal,
      });
      if (!shouldRetryResponse(response.status) || attempt === attempts) {
        return response;
      }
    } catch (error) {
      lastError = error;
      if (attempt === attempts) {
        throw error;
      }
    } finally {
      clearTimeout(timer);
    }

    await delay(retryDelayMs * 2 ** (attempt - 1));
  }

  throw lastError ?? new Error(`Request failed for ${url}`);
}

function shouldRetryResponse(status: number) {
  return status === 408 || status === 429 || status >= 500;
}

function positiveInteger(value: number | undefined, fallback: number): number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0 ? value : fallback;
}

async function delay(milliseconds: number) {
  await new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

export function createJsonStorage(options: CreateJsonStorageOptions): JsonStorage {
  const container = parseContainerSas(options.containerSasUrl);
  const fetchImplementation = options.fetchImplementation ?? fetch;
  const space = options.space ?? 2;

  if (container) {
    return {
      kind: 'blob',
      async listJsonNames(prefix = '') {
        const prefixParam = prefix ? `&prefix=${encodeURIComponent(prefix)}` : '';
        const query = container.query ? `&${container.query.slice(1)}` : '';
        const response = await fetchWithRetry(
          fetchImplementation,
          `${container.base}?restype=container&comp=list${prefixParam}${query}`,
          { method: 'GET' },
          options,
        );
        if (!response.ok) {
          const detail = await response.text().catch(() => '');
          throw new Error(
            `Failed to list ${options.label} blobs: HTTP ${response.status}${detail ? ` ${detail.slice(0, 300)}` : ''}`,
          );
        }
        const xml = await response.text();
        return [...xml.matchAll(/<Name>([^<]+)<\/Name>/g)]
          .map((match) => decodeXml(match[1]))
          .filter((name) => name.endsWith('.json'));
      },
      async readJsonWithEtag<T>(blobName: string) {
        const response = await fetchWithRetry(
          fetchImplementation,
          blobUrl(container, blobName),
          {
            method: 'GET',
            headers: { accept: 'application/json' },
          },
          options,
        );
        if (response.status === 404) return { value: null, etag: null };
        if (!response.ok) {
          throw new Error(`Failed to read ${options.label} blob ${blobName}: HTTP ${response.status}`);
        }
        const value: unknown = await response.json();
        if (!options.validate(value)) {
          throw new Error(`Invalid ${options.label} blob ${blobName}`);
        }
        return { value: value as T, etag: response.headers.get('etag') };
      },
      async readJson<T>(blobName: string) {
        return (await this.readJsonWithEtag<T>(blobName)).value;
      },
      async writeJson(blobName: string, value: unknown, writeOptions = {}) {
        const response = await putJsonBlob(container, blobName, value, {
          fetchImplementation,
          space,
          timeoutMs: options.timeoutMs,
          retries: options.retries,
          retryDelayMs: options.retryDelayMs,
          ...writeOptions,
        });
        if (response.status === 412) {
          throw new BlobPreconditionError(`Blob ${blobName} changed before it could be written.`);
        }
        if (!response.ok) {
          throw new Error(`Failed to write ${options.label} blob ${blobName}: HTTP ${response.status}`);
        }
      },
    };
  }

  return {
    kind: 'local',
    async listJsonNames(prefix = '') {
      const localRoot = resolve(process.cwd(), options.localDirectory);
      const prefixRoot = resolve(localRoot, prefix);
      const files = await listLocalJsonFiles(prefixRoot);
      return files.map((filePath) => relative(localRoot, filePath).replaceAll('\\', '/'));
    },
    async readJsonWithEtag<T>(blobName: string) {
      const filePath = resolve(process.cwd(), options.localDirectory, blobName);
      try {
        const raw = await readFile(filePath, 'utf8');
        const value: unknown = JSON.parse(raw);
        if (!options.validate(value)) {
          throw new Error(`Invalid ${options.label} JSON in ${blobName}`);
        }
        return { value: value as T, etag: etagFor(raw) };
      } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
          return { value: null, etag: null };
        }
        throw error;
      }
    },
    async readJson<T>(blobName: string) {
      return (await this.readJsonWithEtag<T>(blobName)).value;
    },
    async writeJson(blobName: string, value: unknown, writeOptions = {}) {
      const filePath = resolve(process.cwd(), options.localDirectory, blobName);
      await mkdir(dirname(filePath), { recursive: true });
      if (writeOptions.ifMatch || writeOptions.ifNoneMatch) {
        let existing: string | null = null;
        try { existing = etagFor(await readFile(filePath, 'utf8')); } catch (error) {
          if (!(error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT')) throw error;
        }
        if (writeOptions.ifNoneMatch === '*' && existing !== null) {
          throw new BlobPreconditionError(`Blob ${blobName} already exists.`);
        }
        if (writeOptions.ifMatch && existing !== writeOptions.ifMatch) {
          throw new BlobPreconditionError(`Blob ${blobName} changed before it could be written.`);
        }
      }
      await writeFile(filePath, JSON.stringify(value, null, space), 'utf8');
    },
  };
}

async function listLocalJsonFiles(directory: string): Promise<string[]> {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = resolve(directory, entry.name);
        if (entry.isDirectory()) return listLocalJsonFiles(fullPath);
        return fullPath.endsWith('.json') ? [fullPath] : [];
      }),
    );
    return nested.flat();
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

function decodeXml(value: string) {
  return value
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&amp;', '&');
}

function etagFor(value: string) {
  return `"${createHash('sha256').update(value, 'utf8').digest('hex')}"`;
}
