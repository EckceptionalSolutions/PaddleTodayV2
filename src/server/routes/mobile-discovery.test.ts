import type { ServerResponse } from 'node:http';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { handleMobileDiscovery } from './mobile-discovery';
import * as snapshots from '../../lib/river-snapshots';
import * as rivers from '../../lib/rivers';
import { scoreRiverCondition } from '../../lib/scoring';

afterEach(() => vi.restoreAllMocks());
async function request(path: string) {
  const response = { writeHead: vi.fn(), end: vi.fn() };
  await handleMobileDiscovery(response as unknown as ServerResponse, 'mobile-test', true, new URL(path, 'http://localhost'));
  return { status: response.writeHead.mock.calls[0][0], payload: JSON.parse(response.end.mock.calls[0][0].toString()) };
}

describe('mobile discovery endpoints', () => {
  it('retains live evaluation failover without inventing calls when the snapshot store is unavailable', async () => {
    vi.spyOn(snapshots, 'getStoredRiverSummarySnapshot').mockResolvedValue(null);
    vi.spyOn(snapshots, 'getStoredWeekendSummarySnapshot').mockResolvedValue(null);
    const river = rivers.listRivers().find(route => route.scoreEligibility !== 'planning')!;
    vi.spyOn(rivers, 'getAllRiverScores').mockResolvedValue([scoreRiverCondition({ river, gauge: null, weather: null })]);
    const summary = await request(`/api/mobile/summary.json?slugs=${river.slug}`);
    expect(summary.status).toBe(200);
    expect(summary.payload.snapshotStatus).toBe('live');
    expect(summary.payload.rivers[0].readiness.status).toBe('withheld');
    const weekend = await request('/api/mobile/weekend.json');
    expect(weekend.status).toBe(200);
    expect(weekend.payload.rivers).toEqual([]);
    expect(weekend.payload.withheldCount).toBe(1);
  });
  it('returns an unavailable response when both snapshots and live source evaluation fail', async () => {
    vi.spyOn(snapshots, 'getStoredRiverSummarySnapshot').mockResolvedValue(null);
    vi.spyOn(snapshots, 'getStoredWeekendSummarySnapshot').mockResolvedValue(null);
    vi.spyOn(rivers, 'getAllRiverScores').mockRejectedValue(new Error('unavailable'));
    expect((await request('/api/mobile/summary.json')).status).toBe(503);
    expect((await request('/api/mobile/weekend.json')).status).toBe(503);
  });
  it('serves nearby metadata on both sides of the Minnesota/Wisconsin border', async () => {
    const { status, payload } = await request('/api/mobile/catalog.json?latitude=45&longitude=-92.7&radiusMiles=100');
    expect(status).toBe(200);
    expect(payload.scope.kind).toBe('nearby');
    expect(payload.rivers.some((river: { state: string }) => river.state === 'Minnesota')).toBe(true);
    expect(payload.rivers.some((river: { state: string }) => river.state === 'Wisconsin')).toBe(true);
    expect(payload.scope.returnedRoutes).toBeLessThan(payload.scope.totalRoutes);
    expect(payload.states).toContain('New York');
    expect(payload.rivers.some((river: { safetyProfile?: unknown }) => river.safetyProfile)).toBe(true);
  });
  it('preserves planning discovery and withheld calls when snapshots are missing', async () => {
    vi.spyOn(snapshots, 'getStoredRiverSummarySnapshot').mockResolvedValue(null);
    const { payload } = await request('/api/mobile/explore.json?state=Minnesota');
    const { payload: catalog } = await request('/api/mobile/catalog.json?state=Minnesota');
    expect(payload.rivers.map((item: { slug: string }) => item.slug)).toEqual(catalog.rivers.map((river: { slug: string }) => river.slug));
    expect(payload.rivers.every((item: { readiness: { status: string } }) => item.readiness.status === 'withheld')).toBe(true);
    expect(payload.generatedAt).toBeNull();
    expect(payload.snapshotStatus).toBe('unavailable');
    expect(catalog.rivers.some((river: { scoreEligibility: string }) => river.scoreEligibility === 'planning')).toBe(true);
  });
  it('rejects invalid scopes and mismatched catalog revisions', async () => {
    expect((await request('/api/mobile/catalog.json?latitude=Infinity')).status).toBe(400);
    expect((await request('/api/mobile/catalog.json?revision=old')).status).toBe(409);
  });
  it('returns no metadata for an empty saved-route selection', async () => {
    const { payload } = await request('/api/mobile/catalog.json?slugs=');
    expect(payload.rivers).toEqual([]);
    expect(payload.scope.kind).toBe('routes');
  });
});
