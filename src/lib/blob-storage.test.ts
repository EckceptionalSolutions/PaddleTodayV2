import { describe, expect, it, vi } from 'vitest';
import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  BlobPreconditionError,
  blobUrl,
  cleanBlobPath,
  mutateJson,
  parseContainerSas,
  putJsonBlob,
  withJsonStorageLock,
} from './blob-storage';
import { createJsonStorage, type JsonStorage } from './blob-storage';

describe('blob storage primitives', () => {
  it('separates the signed query from the stable container URL', () => {
    expect(parseContainerSas('https://account.blob.core.windows.net/data/?sp=rw&sig=secret')).toEqual({
      base: 'https://account.blob.core.windows.net/data',
      query: '?sp=rw&sig=secret',
    });
  });

  it('supports safe fallback and strict configuration modes', () => {
    expect(parseContainerSas('not a URL')).toBeNull();
    expect(() => parseContainerSas('not a URL', { throwOnInvalid: true })).toThrow();
  });

  it('builds blob URLs and cleans configured prefixes consistently', () => {
    const container = parseContainerSas('https://example.com/container?sig=x')!;
    expect(blobUrl(container, '/routes/one.json')).toBe(
      'https://example.com/container/routes/one.json?sig=x'
    );
    expect(cleanBlobPath(' /route requests/2026! ')).toBe('route-requests/2026-');
  });

  it('writes formatted JSON with the required Azure headers', async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 201 }));
    const container = parseContainerSas('https://example.com/container?sig=x')!;
    await putJsonBlob(container, 'items/one.json', { ok: true }, {
      fetchImplementation: fetchMock as typeof fetch,
    });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://example.com/container/items/one.json?sig=x',
      expect.objectContaining({
        method: 'PUT',
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'content-type': 'application/json; charset=utf-8',
        },
        body: '{\n  "ok": true\n}',
      }),
    );
  });

  it('retries transient blob request failures', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('fetch failed'))
      .mockResolvedValueOnce(new Response(null, { status: 201 }));
    const container = parseContainerSas('https://example.com/container?sig=x')!;

    await putJsonBlob(container, 'items/one.json', { ok: true }, {
      fetchImplementation: fetchMock as typeof fetch,
      retries: 2,
      retryDelayMs: 1,
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('provides one validated blob-backed JSON repository', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 201 }));
    const storage = createJsonStorage({
      containerSasUrl: 'https://example.com/container?sig=x',
      localDirectory: '.unused',
      label: 'test',
      validate: (value) => Boolean(value && typeof value === 'object' && 'ok' in value),
      fetchImplementation: fetchMock as typeof fetch,
    });

    expect(storage.kind).toBe('blob');
    expect(await storage.readJson('one.json')).toEqual({ ok: true });
    await storage.writeJson('one.json', { ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('lists decoded JSON blob names through the same repository', async () => {
    const fetchMock = vi.fn(async () => new Response([
      '<EnumerationResults><Blobs>',
      '<Blob><Name>route-requests/one.json</Name></Blob>',
      '<Blob><Name>route-requests/two&amp;three.json</Name></Blob>',
      '<Blob><Name>route-requests/readme.txt</Name></Blob>',
      '</Blobs></EnumerationResults>',
    ].join('')));
    const storage = createJsonStorage({
      containerSasUrl: 'https://example.com/container?sig=x',
      localDirectory: '.unused',
      label: 'test',
      validate: () => true,
      fetchImplementation: fetchMock as typeof fetch,
    });

    await expect(storage.listJsonNames('route-requests/')).resolves.toEqual([
      'route-requests/one.json',
      'route-requests/two&three.json',
    ]);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://example.com/container?restype=container&comp=list&prefix=route-requests%2F&sig=x',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('serializes same-process JSON mutations for one blob key', async () => {
    const order: string[] = [];
    await Promise.all([
      withJsonStorageLock('test:alerts.json', async () => {
        order.push('first-start');
        await new Promise((resolve) => setTimeout(resolve, 5));
        order.push('first-end');
      }),
      withJsonStorageLock('test:alerts.json', async () => {
        order.push('second-start');
        order.push('second-end');
      }),
    ]);

    expect(order).toEqual(['first-start', 'first-end', 'second-start', 'second-end']);
  });

  it('commits local JSON mutations with a content precondition', async () => {
    const blobName = 'counter.json';
    const localPath = resolve(process.cwd(), '.local/blob-storage-test', blobName);
    await rm(localPath, { force: true });
    const storage = createJsonStorage({
      localDirectory: '.local/blob-storage-test',
      label: 'test',
      validate: (value) => Boolean(value && typeof value === 'object' && 'count' in value),
    });
    try {
      const first = await mutateJson({
        storage,
        blobName,
        initial: { count: 0 },
        mutate: (value) => ({ count: value.count + 1 }),
      });
      const second = await mutateJson({
        storage,
        blobName,
        initial: { count: 0 },
        mutate: (value) => ({ count: value.count + 1 }),
      });

      expect(first.count).toBe(1);
      expect(second.count).toBe(2);
    } finally {
      await rm(localPath, { force: true });
    }
  });

  it('retries a conditional mutation after a concurrent writer wins', async () => {
    let current = { count: 0 };
    let etag = '"initial"';
    let conflictInjected = false;
    const storage: JsonStorage = {
      kind: 'local',
      listJsonNames: async () => [],
      readJson: async () => current,
      readJsonWithEtag: async () => ({ value: { ...current }, etag }),
      writeJson: async (_blobName, value, options = {}) => {
        if (!conflictInjected) {
          conflictInjected = true;
          current = { count: 10 };
          etag = '"external"';
          throw new BlobPreconditionError();
        }
        expect(options.ifMatch).toBe('"external"');
        current = value as { count: number };
        etag = '"committed"';
      },
    };

    await expect(mutateJson({
      storage,
      blobName: 'counter.json',
      initial: { count: 0 },
      mutate: (value) => ({ count: value.count + 1 }),
    })).resolves.toEqual({ count: 11 });
  });
});
