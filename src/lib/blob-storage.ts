import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';

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
}

export interface JsonStorage {
  kind: 'blob' | 'local';
  listJsonNames(prefix?: string): Promise<string[]>;
  readJson<T>(blobName: string): Promise<T | null>;
  writeJson(blobName: string, value: unknown): Promise<void>;
}

export interface CreateJsonStorageOptions {
  containerSasUrl?: string | null;
  localDirectory: string;
  validate: (value: unknown) => boolean;
  label: string;
  space?: number;
  fetchImplementation?: typeof fetch;
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
  return fetchImplementation(blobUrl(container, blobName), {
    method: 'PUT',
    headers: {
      'x-ms-blob-type': 'BlockBlob',
      'content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(value, null, options.space ?? 2),
  });
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
        const response = await fetchImplementation(
          `${container.base}?restype=container&comp=list${prefixParam}${query}`,
          { method: 'GET' },
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
      async readJson<T>(blobName: string) {
        const response = await fetchImplementation(blobUrl(container, blobName), {
          method: 'GET',
          headers: { accept: 'application/json' },
        });
        if (response.status === 404) return null;
        if (!response.ok) {
          throw new Error(`Failed to read ${options.label} blob ${blobName}: HTTP ${response.status}`);
        }
        const value: unknown = await response.json();
        if (!options.validate(value)) {
          throw new Error(`Invalid ${options.label} blob ${blobName}`);
        }
        return value as T;
      },
      async writeJson(blobName: string, value: unknown) {
        const response = await putJsonBlob(container, blobName, value, {
          fetchImplementation,
          space,
        });
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
    async readJson<T>(blobName: string) {
      const filePath = resolve(process.cwd(), options.localDirectory, blobName);
      try {
        const value: unknown = JSON.parse(await readFile(filePath, 'utf8'));
        if (!options.validate(value)) {
          throw new Error(`Invalid ${options.label} JSON in ${blobName}`);
        }
        return value as T;
      } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
          return null;
        }
        throw error;
      }
    },
    async writeJson(blobName: string, value: unknown) {
      const filePath = resolve(process.cwd(), options.localDirectory, blobName);
      await mkdir(dirname(filePath), { recursive: true });
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
