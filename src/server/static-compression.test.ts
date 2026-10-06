import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { join, resolve, sep, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { createServer, request } from 'node:http';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import { gzipSync, gunzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { loadStaticCompressionManifest, resolveStaticFile, resolveNotFoundPage, sendStatic } from './static-route';

describe('lossless packaged HTML delivery', () => {
  it('streams both negotiated representations with matching GET/HEAD lengths and recovery status', async () => {
    const root = await mkdtemp(join(tmpdir(), 'paddle-compressed-static-'));
    const body = Buffer.from('<html><title>Rivière 🌊</title>' + '<p>Route conditions</p>'.repeat(300) + '</html>');
    const compressed = gzipSync(body);
    await writeFile(join(root, 'index.html.gz'), compressed);
    await writeFile(join(root, '404.html.gz'), compressed);
    await writeFile(join(root, '.static-compression.json'), JSON.stringify({ 'index.html.gz': { sourceBytes: body.length }, '404.html.gz': { sourceBytes: body.length } }));
    const inventory = loadStaticCompressionManifest(root);
    expect(resolveStaticFile('/', root)).toBe(join(root, 'index.html.gz'));
    expect(resolveStaticFile('/../escape', root)).toBeNull();
    const server = createServer((req, res) => {
      const found = resolveStaticFile(req.url!, root);
      const target = found ?? resolveNotFoundPage(req.url!, req.headers.accept, root);
      if (!target) { res.writeHead(404); res.end(); return; }
      sendStatic(res, target, req.method !== 'HEAD', found ? 200 : 404, inventory.get(target));
    });
    server.listen(0, '127.0.0.1'); await once(server, 'listening');
    const port = (server.address() as AddressInfo).port;
    async function get(path: string, encoding: string, method = 'GET') {
      return new Promise<{ status: number; headers: import('node:http').IncomingHttpHeaders; body: Buffer }>((resolve, reject) => {
        const req = request({ hostname: '127.0.0.1', port, path, method, headers: { 'accept-encoding': encoding, accept: 'text/html' } }, res => {
          const chunks: Buffer[] = []; res.on('data', value => chunks.push(value)); res.on('error', reject);
          res.on('end', () => resolve({ status: res.statusCode!, headers: res.headers, body: Buffer.concat(chunks) }));
        });
        req.on('error', reject); req.end();
      });
    }
    try {
      for (const encoding of ['gzip', 'GZIP;Q=0.5', '*;q=0, gzip;q=1', 'gzip;q=0', 'identity', 'br', '']) {
        const zipped = encoding === 'gzip' || encoding.includes('GZIP') || encoding.includes('gzip;q=1');
        const response = await get('/', encoding);
        expect(response.status).toBe(200); expect(response.headers.vary).toBe('Accept-Encoding');
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
        expect(response.headers['cache-control']).toContain('max-age=300');
        expect(response.headers['content-encoding']).toBe(zipped ? 'gzip' : undefined);
        expect(zipped ? gunzipSync(response.body) : response.body).toEqual(body);
        expect(Number(response.headers['content-length'])).toBe(response.body.length);
        const head = await get('/', encoding, 'HEAD');
        expect(head.body.length).toBe(0); expect(head.headers['content-length']).toBe(response.headers['content-length']);
      }
      const unsupported = await get('/', 'br, gzip;q=0, identity;q=0');
      expect(unsupported.status).toBe(406); expect(unsupported.body.length).toBe(0);
      const recovery = await get('/unknown', 'gzip');
      expect(recovery.status).toBe(404); expect(recovery.headers['cache-control']).toBe('no-store');
      expect(gunzipSync(recovery.body)).toEqual(body);
    } finally {
      server.close(); await once(server, 'close');
      if (!resolve(root).startsWith(resolve(tmpdir()) + sep) || !basename(root).startsWith('paddle-compressed-static-')) throw new Error('Unexpected cleanup directory');
      await rm(root, { recursive: true, force: true });
    }
  });
});
