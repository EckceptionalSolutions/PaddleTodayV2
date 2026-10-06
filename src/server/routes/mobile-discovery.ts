import type { ServerResponse } from 'node:http';
import type { MobileRouteScope, RiverSummaryApiItem } from '@paddletoday/api-contract';
import { getAllRiverScores, listRivers } from '../../lib/rivers';
import { serializeSummaryResult, serializeWeekendSummaryResult } from '../../lib/api-contract';
import { createExploreCatalogBuilder } from '../../lib/explore-catalog';
import { compactMobileCondition, mobileCatalogMetadata, mobileDistanceMiles, mobileRouteMatches, mobileScopeMetadata, parseMobileScope } from '../../lib/mobile-discovery';
import { getStoredRiverSummarySnapshot, getStoredWeekendSummarySnapshot } from '../../lib/river-snapshots';
import { sendJson } from '../http';
import { withTimeout } from '../server-runtime';

let catalog: ReturnType<typeof createMobileCatalog> | undefined;
let exploreBuilder: ReturnType<typeof createExploreCatalogBuilder> | undefined;
const EMPTY_SCORES: RiverSummaryApiItem[] = [];
const CONDITIONS_CACHE = 'public, max-age=60, s-maxage=180, stale-while-revalidate=600';

async function liveSummaryFallback() {
  const generatedAt = new Date().toISOString();
  const scores = await withTimeout(getAllRiverScores(), 12_000, 'mobile summary scoring');
  const rivers = scores.map(result => serializeSummaryResult({ ...result, generatedAt }));
  return { generatedAt, snapshotStatus: 'live' as const, snapshotAgeSeconds: 0, rivers };
}

async function liveWeekendFallback() {
  const generatedAt = new Date().toISOString();
  const scores = await withTimeout(getAllRiverScores(), 12_000, 'mobile weekend scoring');
  const rivers = scores.map(result => serializeWeekendSummaryResult({ ...result, generatedAt }))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  return { generatedAt, snapshotStatus: 'live' as const, snapshotAgeSeconds: 0,
    label: rivers[0]?.weekend.label ?? 'Weekend', withheldCount: scores.length - rivers.length, rivers };
}

function createMobileCatalog() {
  const routes = listRivers();
  const safety = new Map(routes.map(route => [route.slug, route.safetyProfile]));
  // The builder's unavailable-condition entries provide catalog-led metadata
  // even when the snapshot store has never been populated.
  const rivers = createExploreCatalogBuilder(routes)(EMPTY_SCORES).rivers.map(item => ({
    ...item.river, safetyProfile: safety.get(item.river.slug),
  }));
  return { rivers, ...mobileCatalogMetadata(rivers) };
}

export async function handleMobileDiscovery(response: ServerResponse, requestId: string, includeBody: boolean, url: URL) {
  const kind = url.pathname.match(/^\/api\/mobile\/(catalog|summary|explore|weekend)\.json$/)?.[1];
  if (!kind) return sendJson(response, 404, { requestId, error: 'not_found' }, includeBody, 'no-store');
  let scope: MobileRouteScope;
  try { scope = parseMobileScope(url.searchParams); }
  catch (error) {
    return sendJson(response, 400, { requestId, error: 'invalid_scope', message: (error as Error).message }, includeBody, 'no-store');
  }
  const metadata = catalog ??= createMobileCatalog();
  if (url.searchParams.has('revision') && url.searchParams.get('revision') !== metadata.catalogRevision) {
    return sendJson(response, 409, { requestId, error: 'catalog_changed', message: 'Refresh the route catalog.' }, includeBody, 'no-store');
  }
  const selected = metadata.rivers.filter(river => mobileRouteMatches(river, scope));
  const common = {
    requestId, catalogRevision: metadata.catalogRevision,
  };
  if (kind === 'catalog') {
    return sendJson(response, 200, {
      ...common, states: metadata.states,
      groupCounts: Object.fromEntries([...new Set(selected.map(river => river.riverId || river.slug))].map(key => [key, metadata.groupCounts[key]])),
      scope: mobileScopeMetadata(scope, selected.length, metadata.rivers.length), rivers: selected,
    }, includeBody, 'public, max-age=300, s-maxage=600, stale-while-revalidate=1800');
  }
  const selectedSlugs = new Set(selected.map(river => river.slug));
  const scoredSlugs = new Set(metadata.rivers.filter(river => river.scoreEligibility !== 'planning').map(river => river.slug));
  if (kind === 'weekend') {
    const stored = await getStoredWeekendSummarySnapshot({ allowStale: true }).catch(() => null);
    const snapshot = stored ?? await liveWeekendFallback().catch(() => null);
    // Only a stored forecast or freshly evaluated source data can supply calls.
    if (!snapshot) return sendJson(response, 503, { requestId, error: 'snapshot_unavailable' }, includeBody, 'no-store');
    const forecastRoutes = snapshot.rivers.filter(item => scoredSlugs.has(item.river.slug));
    const rivers = forecastRoutes.filter(item => selectedSlugs.has(item.river.slug)).map(({ river, ...condition }) => ({ slug: river.slug, ...condition }));
    // Keep the existing out-of-range recovery without including the entire country.
    // These alternatives are explicit and have separately requested metadata.
    const alternatives = scope.latitude !== undefined ? forecastRoutes
      .filter(item => !selectedSlugs.has(item.river.slug) && (item.weekend.rating === 'Good' || item.weekend.rating === 'Strong'))
      .sort((a, b) => mobileDistanceMiles(scope, a.river) - mobileDistanceMiles(scope, b.river)).slice(0, 4)
      .map(({ river, ...condition }) => ({ slug: river.slug, ...condition })) : [];
    return sendJson(response, 200, {
      ...common, generatedAt: snapshot.generatedAt, snapshotStatus: snapshot.snapshotStatus,
      snapshotAgeSeconds: snapshot.snapshotAgeSeconds, label: snapshot.label, withheldCount: snapshot.withheldCount,
      riverCount: rivers.length, rivers, alternatives,
      scope: mobileScopeMetadata(scope, rivers.length, forecastRoutes.length),
    }, includeBody, CONDITIONS_CACHE);
  }
  const stored = await getStoredRiverSummarySnapshot({ allowStale: true }).catch(() => null);
  const snapshot = stored ?? (kind === 'summary' ? await liveSummaryFallback().catch(() => null) : null);
  if (kind === 'summary' && !snapshot) {
    return sendJson(response, 503, { requestId, error: 'snapshot_unavailable' }, includeBody, 'no-store');
  }
  exploreBuilder ??= createExploreCatalogBuilder(listRivers());
  const discovery = exploreBuilder(snapshot?.rivers ?? EMPTY_SCORES);
  const snapshotSlugs = new Set(snapshot?.rivers.map(item => item.river.slug));
  const source = kind === 'explore' || scope.slugs !== undefined ? discovery.rivers
    : discovery.rivers.filter(item => scoredSlugs.has(item.river.slug) && snapshotSlugs.has(item.river.slug));
  const rivers = source.filter(item => selectedSlugs.has(item.river.slug)).map(compactMobileCondition);
  return sendJson(response, 200, {
    ...common, generatedAt: snapshot?.generatedAt ?? null, snapshotStatus: snapshot?.snapshotStatus ?? 'unavailable',
    snapshotAgeSeconds: snapshot?.snapshotAgeSeconds,
    ...(kind === 'explore' ? { coverage: discovery.coverage } : {}),
    riverCount: rivers.length, rivers, scope: mobileScopeMetadata(scope, rivers.length, source.length),
  }, includeBody, CONDITIONS_CACHE);
}
