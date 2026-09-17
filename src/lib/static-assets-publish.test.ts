import { afterEach, describe, expect, it, vi } from 'vitest';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:http';
import { once } from 'node:events';
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
  it('reuses a bounded number of connections across many real HEAD requests', async () => {
    const { manifest } = await fixture();
    const photo = manifest.files.find((file: { path: string }) => file.path === 'gallery/photo.jpg');
    let connections = 0;
    let requests = 0;
    const server = createServer((request, response) => {
      requests++;
      response.writeHead(200, {
        'content-length': String(photo.bytes), 'content-type': photo.contentType,
        'access-control-allow-origin': '*', 'cache-control': 'public, max-age=31536000, immutable',
      });
      response.end(request.method === 'HEAD' ? undefined : 'photo');
    });
    server.on('connection', () => connections++);
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Missing test server address');
    try {
      await verifyAssets({ ...manifest, baseUrl: `http://127.0.0.1:${address.port}`,
        files: Array.from({ length: 100 }, (_, index) => ({ ...photo, path: `gallery/${index}.jpg` })),
      }, { concurrency: 2 });
      expect(requests).toBe(101);
      expect(connections).toBeLessThanOrEqual(2);
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
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

  it('recovers from transient HEAD errors and GET body interruptions without skipping validation', async () => {
    const { manifest } = await fixture();
    manifest.files = manifest.files.filter((file: { path: string }) => file.path === 'gallery/photo.jpg');
    const file = manifest.files[0];
    let heads = 0;
    let gets = 0;
    const pauses: number[] = [];
    const onRetry = vi.fn();
    const fetchImpl = async (_url: string, options: { method: string }) => {
      if (options.method === 'HEAD' && ++heads === 1) {
        throw new TypeError('fetch failed', { cause: Object.assign(new Error('connection reset'), { code: 'ECONNRESET' }) });
      }
      if (options.method === 'GET' && ++gets === 1) {
        return new Response(new ReadableStream({ start(controller) { controller.error(new Error('body interrupted')); } }));
      }
      return new Response(options.method === 'HEAD' ? null : 'photo', { headers: {
        'content-length': String(file.bytes), 'content-type': file.contentType,
        'access-control-allow-origin': '*', 'cache-control': 'public, max-age=31536000, immutable',
      } });
    };
    await expect(verifyAssets(manifest, { fetchImpl, delayImpl: async (ms: number) => { pauses.push(ms); }, onRetry })).resolves.toBeUndefined();
    expect([heads, gets]).toEqual([2, 2]);
    expect(pauses).toEqual([1000, 1000]);
    expect(onRetry.mock.calls[0][0]).toContain('ECONNRESET');
    expect(onRetry.mock.calls[1][0]).toContain('GET https://assets.test/container/');
  });

  it.each([408, 429, 503])('bounds retries for transient HTTP %s and reports the asset', async (status) => {
    const { manifest } = await fixture();
    manifest.files = [manifest.files[0]];
    const fetchImpl = vi.fn(async () => new Response(null, { status }));
    const delayImpl = vi.fn(async () => {});
    await expect(verifyAssets(manifest, { fetchImpl, delayImpl, onRetry: () => {} }))
      .rejects.toThrow(`HEAD ${manifest.baseUrl}/${manifest.files[0].path}, attempt 3/3: HTTP ${status}`);
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    expect(delayImpl.mock.calls).toEqual([[1000], [2000]]);
  });

  it('bounds network retries and preserves the underlying failure in diagnostics', async () => {
    const { manifest } = await fixture();
    manifest.files = [manifest.files[0]];
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('fetch failed', { cause: Object.assign(new Error('connect timeout'), { code: 'UND_ERR_CONNECT_TIMEOUT' }) });
    });
    await expect(verifyAssets(manifest, { fetchImpl, delayImpl: async () => {}, onRetry: () => {} }))
      .rejects.toThrow('attempt 3/3: fetch failed (UND_ERR_CONNECT_TIMEOUT)');
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it('does not retry permanent HTTP failures', async () => {
    const { manifest } = await fixture();
    manifest.files = [manifest.files[0]];
    const fetchImpl = vi.fn(async () => new Response(null, { status: 404 }));
    const delayImpl = vi.fn(async () => {});
    await expect(verifyAssets(manifest, { fetchImpl, delayImpl })).rejects.toThrow('attempt 1/3: HTTP 404');
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(delayImpl).not.toHaveBeenCalled();
  });
});
