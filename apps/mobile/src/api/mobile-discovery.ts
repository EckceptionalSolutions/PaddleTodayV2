import {
  assembleMobileRoutes, assembleMobileWeekend,
  type MobileRouteCatalogResponse, type MobileRouteScope,
} from '@paddletoday/api-contract';
import type { QueryClient } from '@tanstack/react-query';
import { apiClient } from './client';

export function mobileScopeKey(scope: MobileRouteScope = {}) {
  return scope.slugs !== undefined ? { slugs: [...new Set(scope.slugs)].sort() } : scope;
}

function catalogOptions(scope: MobileRouteScope) {
  return {
    queryKey: ['mobile-route-catalog', mobileScopeKey(scope)],
    queryFn: ({ signal }: { signal: AbortSignal }) => apiClient.getMobileCatalog(scope, { signal }),
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
  };
}

async function matchingCatalog(client: QueryClient, scope: MobileRouteScope, catalog: MobileRouteCatalogResponse, revision: string) {
  if (catalog.catalogRevision === revision) return catalog;
  // A deployment can correct access points while the long-lived catalog is
  // still cached. Refresh once; the assembler rejects a second mismatch.
  return client.fetchQuery({ ...catalogOptions(scope), staleTime: 0 });
}

export async function loadMobileSummary(client: QueryClient, scope: MobileRouteScope = {}, signal?: AbortSignal) {
  if (scope.slugs && scope.slugs.length > 100) {
    const slugs = [...new Set(scope.slugs)].sort();
    const chunks = [];
    for (let index = 0; index < slugs.length; index += 100) {
      // Keep large saved collections bounded on the server and avoid starting
      // a burst of catalog requests at once on a mobile connection.
      chunks.push(await loadMobileSummaryChunk(client, { slugs: slugs.slice(index, index + 100) }, signal));
    }
    const revisions = new Set(chunks.map(chunk => chunk.catalogRevision));
    if (revisions.size !== 1) throw new Error('Route catalog changed. Refresh your saved routes.');
    const rivers = chunks.flatMap(chunk => chunk.rivers);
    // Keep the oldest envelope so a newer chunk cannot mask expired data.
    const oldest = chunks.reduce((a, b) => Date.parse(a.generatedAt) < Date.parse(b.generatedAt) ? a : b);
    return { ...oldest, riverCount: rivers.length, rivers,
      snapshotStatus: chunks.some(chunk => chunk.snapshotStatus === 'stale') ? 'stale' as const : oldest.snapshotStatus,
      scope: { ...oldest.scope, returnedRoutes: rivers.length } };
  }
  return loadMobileSummaryChunk(client, scope, signal);
}

async function loadMobileSummaryChunk(client: QueryClient, scope: MobileRouteScope, signal?: AbortSignal) {
  const [catalog, response] = await Promise.all([
    client.fetchQuery(catalogOptions(scope)), apiClient.getMobileSummary(scope, { signal }),
  ]);
  return assembleMobileRoutes(await matchingCatalog(client, scope, catalog, response.catalogRevision), response);
}

export async function loadMobileExplore(client: QueryClient, scope: MobileRouteScope = {}, signal?: AbortSignal) {
  const [catalog, response] = await Promise.all([
    client.fetchQuery(catalogOptions(scope)), apiClient.getMobileExplore(scope, { signal }),
  ]);
  return assembleMobileRoutes(await matchingCatalog(client, scope, catalog, response.catalogRevision), response);
}

export async function loadMobileWeekend(client: QueryClient, scope: MobileRouteScope = {}, signal?: AbortSignal) {
  const [initialCatalog, response] = await Promise.all([
    client.fetchQuery(catalogOptions(scope)), apiClient.getMobileWeekend(scope, { signal }),
  ]);
  let catalog = await matchingCatalog(client, scope, initialCatalog, response.catalogRevision);
  if (response.alternatives.length) {
    const extraScope = { slugs: response.alternatives.map(item => item.slug) };
    const extras = await client.fetchQuery(catalogOptions(extraScope));
    const matchingExtras = await matchingCatalog(client, extraScope, extras, response.catalogRevision);
    catalog = { ...catalog, groupCounts: { ...catalog.groupCounts, ...matchingExtras.groupCounts },
      rivers: [...catalog.rivers, ...matchingExtras.rivers] };
  }
  const rivers = [...response.rivers, ...response.alternatives];
  return assembleMobileWeekend(catalog, { ...response, riverCount: rivers.length, rivers });
}
