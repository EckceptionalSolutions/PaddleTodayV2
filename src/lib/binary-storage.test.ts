import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep, basename } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { createBinaryStorage } from './binary-storage';

const name = 'trip-photo-bytes/owner/log/photo.jpg';
const options = { containerSasUrl: 'https://example.com/private?sig=test', localDirectory: '.local/test', label: 'private photo', accessTier: 'Hot' as const, retries: 2, retryDelayMs: 1 };

describe('private binary storage', () => {
  it('returns one bounded cloud inventory page without fetching its continuation', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('<EnumerationResults><Blobs></Blobs><NextMarker>next&amp;page</NextMarker></EnumerationResults>'));
    const page = await createBinaryStorage({ ...options, fetchImplementation: fetchImpl }).listPage('trip-photo-bytes/', 'previous', 25);
    expect(page).toEqual({ entries: [], nextCursor: 'next&page' });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const url = new URL(fetchImpl.mock.calls[0]![0]);
    expect(url.searchParams.get('maxresults')).toBe('25');
    expect(url.searchParams.get('marker')).toBe('previous');
  });
  it('persists exact bytes across local instances and prevents path traversal', async () => {
    const root = await mkdtemp(join(tmpdir(), 'paddle-private-binary-'));
    try {
      const first = createBinaryStorage({ ...options, containerSasUrl: null, localDirectory: root });
      const bytes = Buffer.from([0, 255, 216, 10, 0]);
      await first.write(name, bytes);
      expect(await readFile(join(root, name))).toEqual(bytes);
      const restarted = createBinaryStorage({ ...options, containerSasUrl: null, localDirectory: root });
      expect(await restarted.read(name)).toEqual(bytes);
      expect(await restarted.list('trip-photo-bytes/')).toEqual([{ name, modifiedAt: expect.any(String) }]);
      await expect(first.write('../escape.jpg', bytes)).rejects.toThrow();
      await expect(first.list('../')).rejects.toThrow();
      await restarted.delete(name); await restarted.delete(name);
      expect(await restarted.read(name)).toBeNull();
    } finally {
      if (!resolve(root).startsWith(resolve(tmpdir()) + sep) || !basename(root).startsWith('paddle-private-binary-')) throw new Error('Unexpected cleanup directory');
      await rm(root, { recursive: true, force: true });
    }
  });

  it('writes raw JPEGs with the existing private container and Hot tier, retrying transient failures', async () => {
    const fetchImpl = vi.fn().mockResolvedValueOnce(new Response(null, { status: 503 })).mockResolvedValueOnce(new Response(null, { status: 201 }));
    const bytes = Buffer.from([255, 216, 0, 255]);
    await createBinaryStorage({ ...options, fetchImplementation: fetchImpl }).write(name, bytes);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    const [url, init] = fetchImpl.mock.calls[1]!;
    expect(url).toBe('https://example.com/private/' + name + '?sig=test');
    expect(init.headers).toEqual({ 'x-ms-blob-type': 'BlockBlob', 'content-type': 'image/jpeg', 'x-ms-access-tier': 'Hot' });
    expect(Buffer.from(init.body)).toEqual(bytes);
  });

  it('reads bytes, tolerates missing objects, and deletes snapshots with private photos', async () => {
    const fetchImpl = vi.fn().mockResolvedValueOnce(new Response(new Uint8Array([0, 255]))).mockResolvedValueOnce(new Response(null, { status: 404 })).mockResolvedValueOnce(new Response(null, { status: 404 }));
    const storage = createBinaryStorage({ ...options, fetchImplementation: fetchImpl });
    expect(await storage.read(name)).toEqual(Buffer.from([0, 255]));
    expect(await storage.read(name)).toBeNull();
    await storage.delete(name);
    expect(fetchImpl.mock.calls[2]![1]).toMatchObject({ method: 'DELETE', headers: { 'x-ms-delete-snapshots': 'include' } });
  });

  it('follows every listing marker and preserves modification times for orphan recovery', async () => {
    const page = (id: string, marker: string) => `<EnumerationResults><Blobs><Blob><Name>trip-photo-bytes/owner/log/${id}.jpg</Name><Properties><Last-Modified>Mon, 05 Oct 2026 08:00:00 GMT</Last-Modified></Properties></Blob></Blobs><NextMarker>${marker}</NextMarker></EnumerationResults>`;
    const fetchImpl = vi.fn().mockResolvedValueOnce(new Response(page('one', 'a&amp;b'))).mockResolvedValueOnce(new Response(page('two', '')));
    expect(await createBinaryStorage({ ...options, fetchImplementation: fetchImpl }).list('trip-photo-bytes/')).toEqual([
      { name: 'trip-photo-bytes/owner/log/one.jpg', modifiedAt: 'Mon, 05 Oct 2026 08:00:00 GMT' },
      { name: 'trip-photo-bytes/owner/log/two.jpg', modifiedAt: 'Mon, 05 Oct 2026 08:00:00 GMT' },
    ]);
    expect(fetchImpl.mock.calls[1]![0]).toContain('marker=a%26b');
  });

  it('bounds response-body reads even if an implementation does not react to abort', async () => {
    const fetchImpl = vi.fn(async () => ({ status: 200, ok: true, arrayBuffer: () => new Promise(() => {}) } as unknown as Response));
    await expect(createBinaryStorage({ ...options, retries: 1, timeoutMs: 10, fetchImplementation: fetchImpl }).read(name)).rejects.toThrow('timed out');
  });
});
