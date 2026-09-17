import { afterEach, describe, expect, it } from 'vitest';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { prepareAssets, packageFrontend, verifyAssets } from '../../scripts/lib/static-assets.mjs';

const temporary: string[] = [];
afterEach(async () => { await Promise.all(temporary.splice(0).map((path) => rm(path, { recursive: true, force: true }))); });
async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'paddle-assets-'));
  temporary.push(root);
  const source = join(root, 'public');
  for (const dir of ['gallery', 'data']) await mkdir(join(source, dir), { recursive: true });
  await writeFile(join(source, 'gallery/photo.jpg'), 'photo');
  await writeFile(join(source, 'data/geometry.json'), '{}');
  const manifest = await prepareAssets({ source, staging: join(root, 'upload'), origin: 'https://assets.test/container' });
  return { root, source, manifest };
}

describe('static asset publishing', () => {
  it('creates reproducible, content-addressed releases and refuses a dirty upload directory', async () => {
    const { root, source, manifest } = await fixture();
    const repeat = await prepareAssets({ source, staging: join(root, 'repeat'), origin: 'https://assets.test/container' });
    expect(repeat.release).toBe(manifest.release);
    await expect(prepareAssets({ source, staging: join(root, 'upload'), origin: 'https://assets.test/container' })).rejects.toThrow();
    await writeFile(join(source, 'data/geometry.json'), '{"changed":true}');
    const changed = await prepareAssets({ source, staging: join(root, 'changed'), origin: 'https://assets.test/container' });
    expect(changed.release).not.toBe(manifest.release);
  });

  it('keeps API assets intact while excluding them from the frontend and preserving configuration', async () => {
    const { root, source, manifest } = await fixture();
    await mkdir(join(source, 'rivers/route'), { recursive: true });
    await writeFile(join(source, 'rivers/route/index.html'), `<img src="${manifest.baseUrl}/gallery/photo.jpg">`);
    await writeFile(join(source, 'staticwebapp.config.json'), JSON.stringify({ routes: [{ route: '/old', redirect: '/new' }] }));
    const destination = join(root, 'frontend');
    await packageFrontend({ source, destination, manifest, baseUrl: manifest.baseUrl });
    expect(await readdir(destination)).toEqual(['rivers', 'staticwebapp.config.json']);
    expect(await readFile(join(source, 'gallery/photo.jpg'), 'utf8')).toBe('photo');
    const config = JSON.parse(await readFile(join(destination, 'staticwebapp.config.json'), 'utf8'));
    expect(config.routes).toEqual([{ route: '/old', redirect: '/new' }]);
    expect(config.navigationFallback.exclude).toContain('/gallery/*');
    await writeFile(join(source, 'data/geometry.json'), '{"changed":true}');
    await expect(packageFrontend({ source, destination: join(root, 'bad'), manifest, baseUrl: manifest.baseUrl })).rejects.toThrow('changed after preparation');
  });

  it('rejects unreadable or incorrectly served assets before frontend deployment', async () => {
    const { source, manifest } = await fixture();
    const serve = async (url: string, options: { method?: string }) => {
      const file = manifest.files.find((entry: { path: string }) => url.endsWith(entry.path));
      return new Response(options.method === 'HEAD' ? null : await readFile(join(source, file.path)), { headers: {
        'content-length': String(file.bytes), 'content-type': file.contentType,
        'access-control-allow-origin': '*', 'cache-control': 'public, max-age=31536000, immutable',
      } });
    };
    await expect(verifyAssets(manifest, { fetchImpl: serve })).resolves.toBeUndefined();
    await expect(verifyAssets(manifest, { fetchImpl: async () => new Response(null, { status: 404 }) })).rejects.toThrow('verification failed');
    await expect(verifyAssets(manifest, { fetchImpl: async (url: string, options: { method?: string }) => {
      const response = await serve(url, options);
      response.headers.delete('access-control-allow-origin');
      return response;
    } })).rejects.toThrow('verification failed');
    await expect(verifyAssets(manifest, { fetchImpl: async (url: string, options: { method?: string }) =>
      options.method === 'HEAD' ? serve(url, options) : new Response('corrupt') })).rejects.toThrow('checksum failed');
  });
});
