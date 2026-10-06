import { mkdir, readFile, readdir, writeFile, unlink, stat } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';
import { blobUrl, fetchWithRetry, parseContainerSas, type CreateJsonStorageOptions } from './blob-storage';

export interface BinaryStorage {
  write(name: string, bytes: Buffer): Promise<void>;
  read(name: string): Promise<Buffer | null>;
  delete(name: string): Promise<void>;
  list(prefix: string): Promise<{ name: string; modifiedAt: string }[]>;
  listPage(prefix: string, cursor: string | null, pageSize: number): Promise<{ entries: { name: string; modifiedAt: string }[]; nextCursor: string | null }>;
}
type Options = Omit<CreateJsonStorageOptions, 'validate' | 'space'>;
const decode = (value: string) => value.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&#39;', "'").replaceAll('&amp;', '&');

/** Private binary objects share the JSON repository's container and access tier. */
export function createBinaryStorage(options: Options): BinaryStorage {
  const container = parseContainerSas(options.containerSasUrl);
  const fetchImpl = options.fetchImplementation ?? fetch;
  const valid = (name: string) => {
    if (!name || !/^[a-zA-Z0-9_/-]+\.jpg$/.test(name) || name.startsWith('/')) throw new Error('Invalid private photo object name');
    return name;
  };
  if (container) return {
    async write(name, bytes) {
      const response = await fetchWithRetry(fetchImpl, blobUrl(container, valid(name)), {
        method: 'PUT', headers: { 'x-ms-blob-type': 'BlockBlob', 'content-type': 'image/jpeg',
          ...(options.accessTier ? { 'x-ms-access-tier': options.accessTier } : {}) }, body: new Uint8Array(bytes.buffer as ArrayBuffer, bytes.byteOffset, bytes.byteLength),
      }, options);
      if (!response.ok) throw new Error(`Failed to write ${options.label}: HTTP ${response.status}`);
      await response.body?.cancel();
    },
    async read(name) {
      return fetchWithRetry(fetchImpl, blobUrl(container, valid(name)), { method: 'GET' }, options, async response => {
        if (response.status === 404) { await response.body?.cancel(); return null; }
        if (!response.ok) throw new Error(`Failed to read ${options.label}: HTTP ${response.status}`);
        return Buffer.from(await response.arrayBuffer());
      });
    },
    async delete(name) {
      const response = await fetchWithRetry(fetchImpl, blobUrl(container, valid(name)), { method: 'DELETE', headers: { 'x-ms-delete-snapshots': 'include' } }, options);
      if (!response.ok && response.status !== 404) throw new Error(`Failed to delete ${options.label}: HTTP ${response.status}`);
      await response.body?.cancel();
    },
    async list(prefix) {
      const entries: { name: string; modifiedAt: string }[] = [];
      let cursor: string | null = null;
      do {
        const page = await this.listPage(prefix, cursor, 500);
        entries.push(...page.entries); cursor = page.nextCursor;
      } while (cursor);
      return entries;
    },
    async listPage(prefix, cursor, pageSize) {
      if (!/^[a-zA-Z0-9_/-]*$/.test(prefix)) throw new Error('Invalid private photo prefix');
      const entries: { name: string; modifiedAt: string }[] = [];
      const limit = Number.isSafeInteger(pageSize) ? Math.max(1, Math.min(500, pageSize)) : 100;
        const url = `${container.base}?restype=container&comp=list&maxresults=${limit}&prefix=${encodeURIComponent(prefix)}${container.query ? '&' + container.query.slice(1) : ''}${cursor ? '&marker=' + encodeURIComponent(cursor) : ''}`;
        const xml = await fetchWithRetry(fetchImpl, url, { method: 'GET' }, options, async response => {
          if (!response.ok) throw new Error(`Failed to list ${options.label}: HTTP ${response.status}`);
          return response.text();
        });
        for (const match of xml.matchAll(/<Blob>([\s\S]*?)<\/Blob>/g)) {
          const name = decode(/<Name>([^<]+)<\/Name>/.exec(match[1])?.[1] ?? '');
          if (!name.startsWith(prefix) || !name.endsWith('.jpg')) continue;
          valid(name);
          const modifiedAt = /<Last-Modified>([^<]+)<\/Last-Modified>/.exec(match[1])?.[1] ?? '';
          if (!Number.isFinite(Date.parse(modifiedAt))) throw new Error('Private photo listing lacks a modification timestamp');
          entries.push({ name, modifiedAt });
        }
      const nextCursor = decode(/<NextMarker>([^<]*)<\/NextMarker>/.exec(xml)?.[1] ?? '') || null;
      return { entries, nextCursor };
    },
  };
  const root = resolve(options.localDirectory);
  const local = (name: string) => {
    const path = resolve(root, name);
    if (!path.startsWith(root + sep)) throw new Error('Private photo path escapes its storage directory');
    return path;
  };
  const missing = (error: unknown) => !!error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT';
  return {
    async write(name, bytes) { const path = local(valid(name)); await mkdir(dirname(path), { recursive: true }); await writeFile(path, bytes); },
    async read(name) { try { return await readFile(local(valid(name))); } catch (error) { if (missing(error)) return null; throw error; } },
    async delete(name) { try { await unlink(local(valid(name))); } catch (error) { if (!missing(error)) throw error; } },
    async list(prefix) {
      if (!/^[a-zA-Z0-9_/-]*$/.test(prefix)) throw new Error('Invalid private photo prefix');
      const entries: { name: string; modifiedAt: string }[] = [];
      async function walk(directory: string) {
        try {
          for (const entry of await readdir(directory, { withFileTypes: true })) {
            const path = resolve(directory, entry.name);
            if (entry.isDirectory()) await walk(path);
            else if (entry.isFile() && entry.name.endsWith('.jpg')) {
              const name = relative(root, path).replaceAll('\\', '/');
              if (name.startsWith(prefix)) entries.push({ name, modifiedAt: (await stat(path)).mtime.toISOString() });
            }
          }
        } catch (error) { if (!missing(error)) throw error; }
      }
      const directory = prefix ? local(prefix) : root;
      await walk(directory);
      return entries;
    },
    async listPage(prefix, cursor, pageSize) {
      const limit = Number.isSafeInteger(pageSize) ? Math.max(1, Math.min(500, pageSize)) : 100;
      const remaining = (await this.list(prefix)).filter(entry => cursor === null || entry.name > cursor).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      const entries = remaining.slice(0, limit);
      return { entries, nextCursor: remaining.length > entries.length ? entries.at(-1)!.name : null };
    },
  };
}
