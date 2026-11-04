import { afterEach, describe, expect, it, vi } from 'vitest';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { prepareAssets } from './static-assets.mjs';
import { publishAssets, releaseCacheControl } from './static-asset-publish.mjs';

const temporary: string[] = [];
afterEach(async () => {
  await Promise.all(temporary.splice(0).map(path => rm(path, { recursive: true, force: true })));
});

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'paddle-publish-test-'));
  temporary.push(root);
  const source = join(root, 'public');
  await mkdir(join(source, 'gallery'), { recursive: true });
  await mkdir(join(source, 'data'), { recursive: true });
  await writeFile(join(source, 'gallery/photo.jpg'), 'photo');
  await writeFile(join(source, 'gallery/other.jpg'), 'other');
  await writeFile(join(source, 'data/map.json'), '{}');
  const staging = join(root, 'upload');
  const manifest = await prepareAssets({ source, staging, origin: 'https://paddletoday.blob.core.windows.net/web-assets' });
  const blobs = new Map<string, any>();
  const writes: string[] = [];
  const directories: string[] = [];
  const azure = vi.fn(async (args: string[]) => {
    const arg = (name: string) => args[args.indexOf(name) + 1];
    expect(arg('--auth-mode')).toBe('login');
    if (args[2] === 'list') {
      expect(arg('--num-results')).toBe('*');
      return [...blobs.values()].filter(blob => blob.name.startsWith(arg('--prefix')));
    }
    expect(args[2]).toBe('upload-batch');
    expect(arg('--tier')).toBe('Hot');
    expect(args).toContain('--validate-content');
    const directory = arg('--source');
    directories.push(directory);
    for (const path of await readdir(directory, { recursive: true, withFileTypes: true })) {
      if (!path.isFile()) continue;
      const absolute = join(path.parentPath, path.name);
      const name = `${arg('--destination-path')}/${relative(directory, absolute).replaceAll('\\', '/')}`;
      const bytes = await readFile(absolute);
      writes.push(name);
      blobs.set(name, { name, properties: { contentLength: bytes.length, contentSettings: {
        contentMd5: createHash('md5').update(bytes).digest('base64'), contentType: arg('--content-type'),
        cacheControl: arg('--content-cache-control'),
      } } });
    }
    return null;
  });
  const publish = () => publishAssets({ manifest, source: staging, account: 'paddletoday', container: 'web-assets', azure, log: () => {} });
  return { root, source, staging, manifest, blobs, writes, directories, azure, publish };
}

describe('deduplicated asset publishing', () => {
  it('uploads both targets once, then reuses every unchanged asset with two paginated inventories and zero writes', async () => {
    const f = await fixture();
    expect(await f.publish()).toMatchObject({ uploaded: 6, skipped: 0, bytesUploaded: 24 });
    f.azure.mockClear();
    f.writes.length = 0;
    expect(await f.publish()).toEqual({ uploaded: 0, skipped: 6, bytesUploaded: 0 });
    expect(f.azure).toHaveBeenCalledTimes(2);
    expect(f.writes).toEqual([]);
    for (const path of f.directories) await expect(readFile(join(path, 'gallery/photo.jpg'))).rejects.toThrow();
  });

  it('repairs a partial release and a same-size edited legacy file without touching old paths', async () => {
    const f = await fixture();
    await f.publish();
    const missing = `releases/${f.manifest.release}/gallery/photo.jpg`;
    f.blobs.delete(missing);
    f.blobs.get('legacy/gallery/other.jpg').properties.contentSettings.contentMd5 = 'different';
    f.blobs.set('legacy/gallery/retired.jpg', { name: 'legacy/gallery/retired.jpg' });
    f.writes.length = 0;
    expect(await f.publish()).toMatchObject({ uploaded: 2, skipped: 4 });
    expect(f.writes.sort()).toEqual(['legacy/gallery/other.jpg', missing].sort());
    expect(f.blobs.has('legacy/gallery/retired.jpg')).toBe(true);
  });

  it('repairs MIME and cache headers even when bytes are unchanged', async () => {
    const f = await fixture();
    await f.publish();
    f.blobs.get('legacy/data/map.json').properties.contentSettings.contentType = 'text/plain';
    const name = `releases/${f.manifest.release}/gallery/photo.jpg`;
    f.blobs.get(name).properties.contentSettings.cacheControl = 'public, max-age=300';
    f.writes.length = 0;
    expect(await f.publish()).toMatchObject({ uploaded: 2 });
    expect(f.blobs.get(name).properties.contentSettings.cacheControl).toBe(releaseCacheControl);
  });

  it('refuses conflicting immutable content before any writes', async () => {
    const f = await fixture();
    await f.publish();
    f.blobs.get(`releases/${f.manifest.release}/gallery/photo.jpg`).properties.contentSettings.contentMd5 = 'wrong';
    f.writes.length = 0;
    await expect(f.publish()).rejects.toThrow('Immutable asset differs');
    expect(f.writes).toEqual([]);
  });

  it('does not trust a missing checksum and establishes one on upload', async () => {
    const f = await fixture();
    await f.publish();
    delete f.blobs.get('legacy/data/map.json').properties.contentSettings.contentMd5;
    expect(await f.publish()).toMatchObject({ uploaded: 1 });
    expect(await f.publish()).toMatchObject({ uploaded: 0 });
  });

  it('fails closed on inventory denial rather than falling back to a full upload', async () => {
    const f = await fixture();
    f.azure.mockRejectedValueOnce(new Error('403 denied'));
    await expect(f.publish()).rejects.toThrow('403 denied');
    expect(f.writes).toEqual([]);
  });

  it('rejects changed staged bytes before calling Azure', async () => {
    const f = await fixture();
    await writeFile(join(f.staging, 'gallery/photo.jpg'), 'wrong');
    await expect(f.publish()).rejects.toThrow('Staged asset changed');
    expect(f.azure).not.toHaveBeenCalled();
  });

  it('propagates upload failures and removes scratch files', async () => {
    const f = await fixture();
    let directory = '';
    f.azure.mockImplementation(async args => {
      if (args[2] === 'list') return [];
      directory = args[args.indexOf('--source') + 1];
      throw new Error('upload interrupted');
    });
    await expect(f.publish()).rejects.toThrow('upload interrupted');
    await expect(readdir(directory)).rejects.toThrow();
  });
});
