import { performance, monitorEventLoopDelay } from 'node:perf_hooks';
import { createServer, request } from 'node:http';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import { gzipSync } from 'node:zlib';
import { readFile, writeFile } from 'node:fs/promises';
import { listRivers, listScoredRivers, getUpstreamCacheLimits } from '../src/lib/rivers';
import { forgetCache, getCacheStats, remember } from '../src/lib/server-cache';
import { buildExploreCatalog, createExploreCatalogBuilder } from '../src/lib/explore-catalog';
import { serializeJsonResponse, jsonCompression, getJsonResponseStats } from '../src/server/json-response';
import { sendJson } from '../src/server/http';
import { prepareSearchIndex, findSearchMatches } from '../src/scripts/site-search.js';
import { normalizeSearchText } from '@paddletoday/api-contract';

function measure(fn: () => unknown, iterations = 9) {
  const times: number[] = [];
  for (let n = 0; n < iterations; n++) { const start = performance.now(); fn(); times.push(performance.now() - start); }
  times.sort((a, b) => a - b);
  return { minMs: times[0], medianMs: times[Math.floor(times.length / 2)], maxMs: times.at(-1)! };
}

const routes = listRivers(), scored = listScoredRivers(), limits = getUpstreamCacheLimits();
const keys = scored.flatMap(route => [
  { namespace: 'gauge', key: [route.gaugeSource, ...(route.fallbackGaugeSources ?? [])].map(source => `${source.provider}:${source.siteId}:${source.metric}`).join('|') },
  { namespace: 'weather', key: `weather:${route.latitude}:${route.longitude}` },
]);
const oldCache = new Map<string, true>();
function oldSweep() {
  let loads = 0;
  for (const { key } of keys) {
    if (oldCache.has(key)) continue;
    loads++; oldCache.set(key, true);
    if (oldCache.size > 256) oldCache.delete(oldCache.keys().next().value!);
  }
  return loads;
}
forgetCache('', { prefix: true });
async function newSweep() {
  let loads = 0;
  for (const { namespace, key } of keys) await remember({ namespace, key, ttlMs: 300000,
    maxEntries: limits[namespace as keyof typeof limits], load: async () => { loads++; return true; } });
  return loads;
}
const cache = { fixture: 'Current scored route keys; sequential zero-I/O loaders; two sweeps within five minute TTL',
  lookupsPerSweep: keys.length, uniqueKeys: new Set(keys.map(row => row.key)).size,
  before: { firstSweepLoads: oldSweep(), secondSweepLoads: oldSweep() },
  after: { firstSweepLoads: await newSweep(), secondSweepLoads: await newSweep() }, limits, stats: getCacheStats() };

const builder = createExploreCatalogBuilder(routes), emptyScores: Parameters<typeof builder>[0] = [];
const catalog = builder(emptyScores);
const payload = { requestId: 'benchmark-0000', generatedAt: null, snapshotStatus: 'unavailable', riverCount: routes.length, ...catalog };
const options = { immutableFields: ['rivers', 'coverage'] };
const body = Buffer.from(JSON.stringify(payload));
serializeJsonResponse(payload, options);
const serialization = { fixture: 'Current public catalog with unavailable synthetic conditions; warm repeated response bodies',
  before: measure(() => JSON.stringify(payload)), after: measure(() => serializeJsonResponse(payload, options)),
  identicalBytes: serializeJsonResponse(payload, options).equals(body) };
const explore = { before: measure(() => buildExploreCatalog(routes, emptyScores)), after: measure(() => builder(emptyScores)) };
const gzipTimes: number[] = [];
let compressed: Buffer | null = null;
for (let n = 0; n < 9; n++) { const start = performance.now(); compressed = await jsonCompression.compress(body); gzipTimes.push(performance.now() - start); }
gzipTimes.sort((a, b) => a - b);
const compression = { before: measure(() => gzipSync(body)), after: { medianMs: gzipTimes[4] },
  beforeBytes: gzipSync(body).length, afterBytes: compressed!.length, beforeLevel: 6, afterLevel: 4 };

async function wireProfile(mode: 'before' | 'after') {
  let counter = 0;
  const server = createServer((_req, res) => {
    const value = { ...payload, requestId: `benchmark-${String(counter++).padStart(4, '0')}` };
    if (mode === 'before') {
      const zipped = gzipSync(Buffer.from(JSON.stringify(value)));
      res.writeHead(200, { 'content-encoding': 'gzip', 'content-length': zipped.length }); res.end(zipped);
    } else sendJson(res, 200, value, true, 'no-store', {}, options);
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const histogram = monitorEventLoopDelay({ resolution: 5 }); histogram.enable();
  await new Promise(resolve => setTimeout(resolve, 20)); histogram.reset();
  const port = (server.address() as AddressInfo).port;
  const start = performance.now();
  const timings: number[] = [];
  const fetchOne = () => new Promise<void>((resolve, reject) => {
    const opened = performance.now();
    const outgoing = request({ hostname: '127.0.0.1', port, headers: { 'accept-encoding': 'gzip' } }, response => {
      if (response.statusCode !== 200 || response.headers['content-encoding'] !== 'gzip') return reject(new Error('Benchmark response changed representation.'));
      response.resume(); response.on('error', reject);
      response.on('end', () => { timings.push(performance.now() - opened); resolve(); });
    });
    outgoing.on('error', reject); outgoing.end();
  });
  try {
    for (let batch = 0; batch < 2; batch++) await Promise.all(Array.from({ length: 4 }, fetchOne));
    await new Promise(resolve => setTimeout(resolve, 10));
    timings.sort((a, b) => a - b);
    return { requests: timings.length, concurrency: 4, elapsedMs: performance.now() - start,
      p95ResponseMs: timings[Math.ceil(timings.length * .95) - 1], maxEventLoopDelayMs: histogram.max / 1e6 };
  } finally { histogram.disable(); server.close(); await once(server, 'close'); }
}
const wire = { fixture: 'Eight loopback HTTP responses in two batches of four; raw gzip bodies consumed, no client JSON parsing',
  before: await wireProfile('before'), after: await wireProfile('after') };

const searchItems = JSON.parse(await readFile('.local/efficiency-audit/build/search-index.json', 'utf8'));
const prepared = prepareSearchIndex(searchItems);
const normalize = (value: unknown) => normalizeSearchText(String(value || '')).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
function legacySearch(query: string) {
  const terms = normalize(query).split(' ').filter(Boolean);
  if (!terms.length) return [...searchItems.filter((item: any) => item.kind === 'river').slice(0, 6), ...searchItems.filter((item: any) => item.kind === 'route').slice(0, 4)];
  return searchItems.map((item: any) => {
    const haystack = normalize(item.searchText || `${item.title} ${item.subtitle} ${item.meta}`);
    let score = 0;
    for (const term of terms) { if (!haystack.includes(term)) return null; score += 2; if (normalize(item.title).startsWith(term)) score += 4; if (normalize(item.subtitle || '').includes(term)) score += 1; }
    if (item.kind === 'river') score += .5;
    return { item, score };
  }).filter(Boolean).sort((a: any, b: any) => b.score - a.score || a.item.title.localeCompare(b.item.title)).slice(0, 10).map((row: any) => row.item);
}
const search = { records: searchItems.length, preparation: measure(() => prepareSearchIndex(searchItems)),
  queries: ['', 'river', 'rice creek', 'susquehanna', 'Rivière'].map(query => ({ query,
    before: measure(() => legacySearch(query)), after: measure(() => findSearchMatches(prepared, query)),
    identicalResults: JSON.stringify(legacySearch(query)) === JSON.stringify(findSearchMatches(prepared, query)) })) };
const result = { date: '2026-10-06', node: process.version, fixture: 'Local current catalog; no live provider calls; microbenchmarks do not predict production latency',
  publicRoutes: routes.length, scoredRoutes: scored.length, cache, explore, serialization, compression, wire, search, jsonResponseStats: getJsonResponseStats() };
const destination = process.argv[2];
if (destination) await writeFile(destination, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
