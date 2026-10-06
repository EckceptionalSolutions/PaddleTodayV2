import { describe, expect, it } from 'vitest';
import { compactMobileCondition, mobileCatalogMetadata, mobileRouteMatches, parseMobileScope } from './mobile-discovery';
import { assembleMobileRoutes, type MobileExploreResponse, type MobileRouteCatalogResponse, type RiverSummaryApiItem } from '@paddletoday/api-contract';

const river = { slug: 'border-route', riverId: 'shared-river', state: 'Wisconsin', latitude: 45, longitude: -92.7,
  putIn: { name: 'Public launch', latitude: 45, longitude: -92.7 } } as RiverSummaryApiItem['river'];

describe('mobile discovery scope', () => {
  it('includes cross-border routes by distance and supports explicit nationwide and state search', () => {
    const scope = parseMobileScope(new URLSearchParams('latitude=45&longitude=-92.8&radiusMiles=25'));
    expect(mobileRouteMatches(river, scope)).toBe(true);
    expect(mobileRouteMatches({ ...river, latitude: 40 }, scope)).toBe(false);
    expect(mobileRouteMatches(river, {})).toBe(true);
    expect(mobileRouteMatches(river, { state: 'wisconsin' })).toBe(true);
    expect(mobileRouteMatches(river, { state: 'Minnesota' })).toBe(false);
  });
  it('rejects invalid coordinates, unbounded radii and ambiguous scopes', () => {
    for (const value of ['latitude=&longitude=0&radiusMiles=25', 'latitude=91&longitude=0&radiusMiles=25',
      'latitude=0&longitude=NaN&radiusMiles=25', 'latitude=0&longitude=0&radiusMiles=1001',
      'latitude=0&longitude=0&radiusMiles=25&state=Minnesota', 'state=Minnesota&slugs=a']) {
      expect(() => parseMobileScope(new URLSearchParams(value))).toThrow();
    }
  });
  it('keeps empty and explicit saved-route scopes distinct from nationwide', () => {
    expect(mobileRouteMatches(river, parseMobileScope(new URLSearchParams('slugs=')))).toBe(false);
    expect(mobileRouteMatches(river, parseMobileScope(new URLSearchParams('slugs=border-route,border-route')))).toBe(true);
    expect(() => parseMobileScope(new URLSearchParams(`slugs=${Array.from({ length: 101 }, (_, index) => `route-${index}`).join(',')}`))).toThrow();
  });
  it('changes the catalog revision for access changes and retains full group counts', () => {
    const before = mobileCatalogMetadata([river, { ...river, slug: 'second-reach' }]);
    const after = mobileCatalogMetadata([{ ...river, putIn: { ...river.putIn!, name: 'Corrected launch' } }, { ...river, slug: 'second-reach' }]);
    expect(before.catalogRevision).not.toBe(after.catalogRevision);
    expect(before.groupCounts['shared-river']).toBe(2);
  });
});

describe('split metadata and conditions', () => {
  const item = {
    river, score: 95, rating: 'Strong', readiness: { status: 'withheld', label: 'Withheld', reason: 'Verify the dam portage.' },
    explanation: 'Detailed explanation served only on route detail.',
    summary: { shortExplanation: 'Check access before launching.' },
    liveData: { overall: 'degraded', gaugeState: 'stale', gaugeDetail: 'Old reading', weatherState: 'live' },
    generatedAt: '2026-10-06T12:00:00Z',
    scoreBreakdown: { riverQuality: 80, windAdjustment: 0, temperatureAdjustment: 2, rainAdjustment: 0,
      comfortAdjustment: 0, rawTripScore: 82, finalScore: 82, capReasons: ['Unverified access'], riverQualityExplanation: 'Long explanation' },
  } as RiverSummaryApiItem;
  const metadata = mobileCatalogMetadata([river]);
  const catalog = { requestId: 'test', ...metadata, rivers: [river], scope: { kind: 'nationwide', returnedRoutes: 1, totalRoutes: 1 } } as MobileRouteCatalogResponse;
  const response = { requestId: 'conditions', ...metadata, scope: catalog.scope, generatedAt: item.generatedAt, snapshotStatus: 'stale',
    riverCount: 1, rivers: [compactMobileCondition(item)] } as unknown as MobileExploreResponse;
  it('preserves readiness, source freshness, access, numeric preview factors and score caps', () => {
    const wire = response.rivers[0];
    expect(wire).not.toHaveProperty('river');
    expect(wire).not.toHaveProperty('explanation');
    expect(wire.scoreBreakdown).not.toHaveProperty('riverQualityExplanation');
    const assembled = assembleMobileRoutes(catalog, response);
    expect(assembled.rivers[0].river.putIn).toEqual(river.putIn);
    expect(assembled.rivers[0].readiness).toEqual(item.readiness);
    expect(assembled.rivers[0].liveData).toEqual(item.liveData);
    expect(assembled.rivers[0].scoreBreakdown?.capReasons).toEqual(['Unverified access']);
    expect(assembled.rivers[0].scoreBreakdown?.riverQuality).toBe(80);
    expect(assembled.snapshotStatus).toBe('stale');
  });
  it('fails closed on obsolete or missing route metadata', () => {
    expect(() => assembleMobileRoutes({ ...catalog, catalogRevision: undefined } as unknown as MobileRouteCatalogResponse,
      { ...response, catalogRevision: undefined } as unknown as MobileExploreResponse)).toThrow('metadata is unavailable');
    expect(() => assembleMobileRoutes({ ...catalog, catalogRevision: 'obsolete' }, response)).toThrow('catalog changed');
    expect(() => assembleMobileRoutes({ ...catalog, rivers: [] }, response)).toThrow('metadata is unavailable');
  });
});
