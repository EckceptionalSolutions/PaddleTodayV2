import { describe, expect, it, vi } from 'vitest';
import { blobUrl, cleanBlobPath, parseContainerSas, putJsonBlob } from './blob-storage';
import { createJsonStorage } from './blob-storage';

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
      { method: 'GET' },
    );
  });
});
