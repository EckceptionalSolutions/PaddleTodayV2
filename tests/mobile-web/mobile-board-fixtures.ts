import type { Page, Route } from '@playwright/test';
import type { RiverSummaryApiItem, WeekendSummaryApiItem } from '@paddletoday/api-contract';
import { compactMobileCondition, mobileCatalogMetadata, mobileDistanceMiles, mobileRouteMatches, mobileScopeMetadata, parseMobileScope } from '../../src/lib/mobile-discovery';

type BoardFixture = { rivers: (RiverSummaryApiItem | WeekendSummaryApiItem)[]; [key: string]: unknown };

// Exercise the actual mobile wire format while keeping each test's existing
// freshness, safety and route fixtures. Catalog and conditions load in parallel.
export async function installMobileBoardFixtures(page: Page) {
  const metadata = new Map<string, RiverSummaryApiItem['river']>();
  let ready!: () => void;
  const firstBoard = new Promise<void>(resolve => { ready = resolve; });
  const revision = 'mobile-browser-fixture';
  await page.route('**/api/mobile/catalog.json**', async route => {
    await firstBoard;
    const scope = parseMobileScope(new URL(route.request().url()).searchParams);
    const all = [...metadata.values()];
    const rivers = all.filter(river => mobileRouteMatches(river, scope));
    const catalog = mobileCatalogMetadata(all);
    await route.fulfill({ json: { ...catalog, catalogRevision: revision, rivers,
      scope: mobileScopeMetadata(scope, rivers.length, all.length) } });
  });
  return async (route: Route, options: { json: unknown; status?: number }) => {
    if ((options.status ?? 200) >= 400 || !Array.isArray((options.json as BoardFixture)?.rivers)) {
      await route.fulfill(options);
      return;
    }
    const json = options.json as BoardFixture;
    for (const item of json.rivers) metadata.set(item.river.slug, item.river);
    ready();
    const url = new URL(route.request().url());
    const scope = parseMobileScope(url.searchParams);
    const selected = json.rivers.filter(item => mobileRouteMatches(item.river, scope));
    const weekend = url.pathname.endsWith('/weekend.json');
    const compact = (item: RiverSummaryApiItem | WeekendSummaryApiItem) => {
      if (!weekend) return compactMobileCondition(item as RiverSummaryApiItem);
      const { river, ...condition } = item;
      return { slug: river.slug, ...condition };
    };
    const alternatives = weekend && scope.latitude !== undefined ? json.rivers
      .filter(item => !mobileRouteMatches(item.river, scope) && 'weekend' in item && ['Good', 'Strong'].includes(item.weekend.rating))
      .sort((a, b) => mobileDistanceMiles(scope, a.river) - mobileDistanceMiles(scope, b.river)).slice(0, 4).map(compact) : [];
    await route.fulfill({ json: { ...json, catalogRevision: revision, rivers: selected.map(compact),
      ...(weekend ? { alternatives } : {}), scope: mobileScopeMetadata(scope, selected.length, json.rivers.length) } });
  };
}
