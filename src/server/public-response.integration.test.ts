import { createServer, request, type IncomingHttpHeaders } from 'node:http';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import { gunzipSync } from 'node:zlib';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as snapshots from '../lib/river-snapshots';
import { listScoredRivers } from '../lib/rivers';
import { serializeSummaryResult } from '../lib/api-contract';
import { scoreRiverCondition } from '../lib/scoring';
import { handleRiverSummary } from './routes/public-rivers';

afterEach(() => vi.restoreAllMocks());

describe('public JSON wire behavior', () => {
  it('preserves concurrent request IDs, GET and HEAD lengths, encoding, and generation changes', async () => {
    const item = serializeSummaryResult(scoreRiverCondition({ river: listScoredRivers()[0], gauge: null, weather: null }));
    let snapshot = { generatedAt: '2026-10-06T12:00:00.000Z', snapshotStatus: 'fresh' as 'fresh' | 'stale', snapshotAgeSeconds: 10, riverCount: 20, rivers: Array.from({ length: 20 }, () => ({ ...item, score: 85 })) };
    vi.spyOn(snapshots, 'getStoredRiverSummarySnapshot').mockImplementation(async () => snapshot);
    let id = 0;
    const server = createServer((req, res) => { void handleRiverSummary(res, `request-${String(id++).padStart(3, '0')}`, req.method !== 'HEAD'); });
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const port = (server.address() as AddressInfo).port;
    const get = (encoding: string, method = 'GET') => new Promise<{ status: number; headers: IncomingHttpHeaders; body: Buffer }>((resolve, reject) => {
      const outgoing = request({ hostname: '127.0.0.1', port, method, headers: { 'accept-encoding': encoding } }, res => {
        const chunks: Buffer[] = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve({ status: res.statusCode!, headers: res.headers, body: Buffer.concat(chunks) }));
      });
      outgoing.on('error', reject); outgoing.end();
    });
    try {
      const responses = await Promise.all(Array.from({ length: 6 }, () => get('gzip')));
      const ids = new Set<string>();
      for (const response of responses) {
        expect(response.status).toBe(200);
        expect(response.headers['content-encoding']).toBe('gzip');
        expect(Number(response.headers['content-length'])).toBe(response.body.length);
        const data = JSON.parse(gunzipSync(response.body).toString());
        expect(data.requestId).toBe(response.headers['x-request-id']); ids.add(data.requestId);
        expect(data.snapshotAgeSeconds).toBe(10);
        expect(data.rivers[0].score).toBe(85);
      }
      expect(ids.size).toBe(6);
      const plain = await get('gzip;q=0');
      expect(plain.headers['content-encoding']).toBeUndefined();
      expect(JSON.parse(plain.body.toString()).requestId).toBe(plain.headers['x-request-id']);
      const head = await get('gzip', 'HEAD');
      expect(head.body.length).toBe(0); expect(head.headers['content-encoding']).toBe('gzip');
      expect(Number(head.headers['content-length'])).toBeGreaterThan(0);
      snapshot = { ...snapshot, snapshotStatus: 'stale', snapshotAgeSeconds: 7201, rivers: snapshot.rivers.map(row => ({ ...row, readiness: { status: 'withheld', label: 'Withheld', reason: 'Expired' } })) };
      const stale = JSON.parse(gunzipSync((await get('gzip')).body).toString());
      expect(stale.snapshotStatus).toBe('stale'); expect(stale.snapshotAgeSeconds).toBe(7201);
      expect(stale.rivers[0].readiness.status).toBe('withheld');
      snapshot = { ...snapshot, generatedAt: '2026-10-06T13:00:00.000Z', snapshotStatus: 'fresh', snapshotAgeSeconds: 0, rivers: [{ ...item, score: 44 }], riverCount: 1 };
      const updated = JSON.parse(gunzipSync((await get('gzip')).body).toString());
      expect(updated.generatedAt).toBe(snapshot.generatedAt); expect(updated.rivers[0].score).toBe(44);
      expect(updated.riverCount).toBe(1);
    } finally { server.close(); await once(server, 'close'); }
  });
});
