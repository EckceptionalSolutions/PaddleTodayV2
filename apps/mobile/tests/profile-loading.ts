import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { performance } from 'node:perf_hooks';
import { resolve } from 'node:path';
import { transformSync } from 'esbuild';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { PersistedClient } from '@tanstack/react-query-persist-client';
import { assembleMobileRoutes, assembleMobileWeekend, type ExploreCatalogResponse, type MobileRouteCatalogResponse,
  type MobileSummaryResponse, type MobileExploreResponse, type MobileWeekendResponse, type RiverSummaryResponse, type WeekendSummaryResponse } from '@paddletoday/api-contract';
import { compactMobileCondition, mobileCatalogMetadata, mobileRouteMatches, mobileScopeMetadata } from '../../../src/lib/mobile-discovery';
import { createRouteCacheSerializer, shouldPersistRouteQuery } from '../src/lib/query-cache-serializer';

// Public, downloaded audit samples only. No production requests or user data.
const samples = resolve(process.argv[2] ?? 'apps/mobile/tmp');
const explore = JSON.parse(readFileSync(resolve(samples, 'performance-explore.json'), 'utf8')) as ExploreCatalogResponse;
const summary = JSON.parse(readFileSync(resolve(samples, 'performance-summary.json'), 'utf8')) as RiverSummaryResponse;
const weekend = JSON.parse(readFileSync(resolve(samples, 'performance-weekend.json'), 'utf8')) as WeekendSummaryResponse;
const scope = process.argv[3] === 'nationwide' ? {} : { latitude: 45.08, longitude: -93.2, radiusMiles: 300 };
const allMetadata = explore.rivers.map(item => item.river);
const metadata = mobileCatalogMetadata(allMetadata);
const selected = allMetadata.filter(river => mobileRouteMatches(river, scope));
const slugs = new Set(selected.map(river => river.slug));
const catalog: MobileRouteCatalogResponse = { requestId: 'audit', ...metadata,
  groupCounts: Object.fromEntries([...new Set(selected.map(river => river.riverId || river.slug))].map(key => [key, metadata.groupCounts[key]])),
  scope: mobileScopeMetadata(scope, selected.length, allMetadata.length), rivers: selected };
const wire = (response: RiverSummaryResponse | ExploreCatalogResponse) => ({ ...response,
  riverCount: response.rivers.filter(item => slugs.has(item.river.slug)).length,
  catalogRevision: metadata.catalogRevision, scope: mobileScopeMetadata(scope, response.rivers.filter(item => slugs.has(item.river.slug)).length, response.rivers.length),
  rivers: response.rivers.filter(item => slugs.has(item.river.slug)).map(compactMobileCondition) });
const summaryWire = wire(summary) as MobileSummaryResponse;
const exploreWire = wire(explore) as MobileExploreResponse;
const weekendRivers = weekend.rivers.filter(item => slugs.has(item.river.slug)).map(({ river, ...condition }) => ({ slug: river.slug, ...condition }));
const weekendWire: MobileWeekendResponse = { ...weekend, catalogRevision: metadata.catalogRevision,
  scope: mobileScopeMetadata(scope, weekendRivers.length, weekend.rivers.length), riverCount: weekendRivers.length, rivers: weekendRivers, alternatives: [] };

function persisted(values: Array<[string, unknown]>) {
  const client = new QueryClient();
  values.forEach(([key, data], index) => client.setQueryData([key], data, { updatedAt: index + 1 }));
  const result: PersistedClient = { timestamp: Date.now(), buster: 'audit', clientState: dehydrate(client, { shouldDehydrateQuery: shouldPersistRouteQuery }) };
  client.clear();
  return result;
}
const oldClient = persisted([['river-summary', summary], ['weekend-summary', weekend]]);
const newClient = persisted([
  ['mobile-route-catalog', catalog], ['river-summary', assembleMobileRoutes(catalog, summaryWire)],
  ['weekend-summary', assembleMobileWeekend(catalog, weekendWire)],
]);
const original = execFileSync('git', ['show', 'HEAD:apps/mobile/src/lib/query-persister.ts'], { encoding: 'utf8' });
const pure = original.slice(original.indexOf('const MAX_CACHE_BYTES'), original.indexOf('export function createRouteQueryPersister'));
const module = { exports: {} as { serializeRouteCache: (client: PersistedClient) => string } };
new Function('module', 'exports', transformSync(pure, { loader: 'ts', format: 'cjs' }).code)(module, module.exports);
const oldSerialize = module.exports.serializeRouteCache;
const cachedSerialize = createRouteCacheSerializer();
cachedSerialize(newClient);
function median(action: () => unknown) {
  for (let index = 0; index < 3; index++) action();
  const values = Array.from({ length: 15 }, () => { const start = performance.now(); action(); return performance.now() - start; }).sort((a, b) => a - b);
  return Number(values[7].toFixed(2));
}
const bytes = (value: unknown) => Buffer.byteLength(JSON.stringify(value));
const newCache = cachedSerialize(newClient);
const retained = (JSON.parse(newCache) as PersistedClient).clientState.queries.map(query => query.queryKey[0]);
if (!retained.includes('river-summary') || !retained.includes('weekend-summary')) throw new Error('Both boards must fit the cache budget.');
console.log(JSON.stringify({
  baselineRevision: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  note: 'Desktop workload measurements, not Android tap-to-content latency. Scope and split use the same public samples for both revisions; Weekend alternatives are excluded from this workload.',
  scope, routes: { nationwide: explore.rivers.length, nearby: selected.length },
  decodedBytes: { nationwideExplore: bytes(explore), scopedMetadata: bytes(catalog), scopedExploreConditions: bytes(exploreWire),
    firstExploreVisit: bytes(catalog) + bytes(exploreWire), refreshExplore: bytes(exploreWire), cache: Buffer.byteLength(newCache) },
  medianMilliseconds: { oldCacheSerialization: median(() => oldSerialize(oldClient)),
    newFirstCacheSerialization: median(() => createRouteCacheSerializer()(newClient)),
    newUnchangedCacheSerialization: median(() => cachedSerialize(newClient)) },
  retainedQueries: retained,
}, null, 2));
