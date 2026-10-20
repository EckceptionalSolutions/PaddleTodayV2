import { afterEach, describe, expect, it, vi } from 'vitest';
import { getRiverBySlug } from './rivers';
import { scoreRiverCondition } from './scoring';
import { serializeDetailResult, serializeSummaryResult, serializeWeekendSummaryResult } from './api-contract';
import { getStoredRiverDetailSnapshot, getStoredRiverGroupSnapshot, getStoredRiverSummarySnapshot, getStoredWeekendSummarySnapshot } from './river-snapshots';
import { forgetCache } from './server-cache';
import * as blobStorage from './blob-storage';
import type { GaugeReading, River, WeatherSnapshot } from './types';
import fixture from '../../tests/mobile-web/fixtures/route-detail.json';

const now = new Date('2026-07-25T18:00:00Z');
afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); forgetCache('snapshot:', { prefix: true }); });

function installSnapshot(route: River, missingIdentity = false) {
  const gauge: GaugeReading = {
    sourceId: route.gaugeSource.id, observedAt: now.toISOString(), current: 3750, unit: 'cfs',
    trend: 'steady', delta24h: 0, changePercent24h: 0, recentSamples: [], gaugeHeightNow: null,
    dischargeNow: 3750, waterTempF: 68, waterTempObservedAt: now.toISOString(), gaugeSource: 'Synthetic verification observation', waterTempSource: 'Synthetic verification observation',
  };
  const weather = { ...fixture.result.weather, observedAt: now.toISOString() } as unknown as WeatherSnapshot;
  const result = scoreRiverCondition({ river: route, gauge, weather, now });
  const summary = serializeSummaryResult(result), detail = serializeDetailResult(result), weekend = serializeWeekendSummaryResult(result)!;
  if (missingIdentity) { delete summary.river.conditionZoneId; delete detail.river.conditionZoneId; if (weekend) delete weekend.river.conditionZoneId; }
  const generatedAt = now.toISOString(), createStorage = blobStorage.createJsonStorage;
  vi.spyOn(blobStorage, 'createJsonStorage').mockImplementation(options => ({ ...createStorage(options),
    async readJson<T>(name: string) {
      if (name.includes('/details/')) return { generatedAt, result: detail } as T;
      if (name.endsWith('/weekend-summary.json')) return { generatedAt, label: 'Synthetic verification weekend', riverCount: weekend ? 1 : 0, withheldCount: weekend ? 0 : 1, rivers: weekend ? [weekend] : [] } as T;
      return { generatedAt, riverCount: 1, rivers: [summary] } as T;
    },
  }));
  vi.useFakeTimers(); vi.setSystemTime(now); forgetCache('snapshot:', { prefix: true });
}

async function expectNoStoredRecommendation(slug: string, riverId: string) {
  expect(await getStoredRiverSummarySnapshot()).toBeNull();
  expect(await getStoredWeekendSummarySnapshot()).toBeNull();
  expect(await getStoredRiverDetailSnapshot(slug)).toBeNull();
  expect(await getStoredRiverGroupSnapshot(riverId)).toBeNull();
}

describe('stored-score eligibility and condition-zone applicability', () => {
  it('rejects fresh County K scores after the source changes to planning, including alert detail reads', async () => {
    const route = getRiverBySlug('namekagon-river-county-k-whispering-pines')!;
    const old: River = { ...route, scoreEligibility: 'scored', profile: { ...route.profile, tooLow: 155 } };
    installSnapshot(old);
    await expectNoStoredRecommendation(route.slug, route.riverId!);
  });
  it('rejects fresh Remmel scores calculated with the former 200-cfs condition zone', async () => {
    const route = getRiverBySlug('ouachita-river-remmel-whitewater-park')!;
    installSnapshot({ ...route, profile: { ...route.profile, tooLow: 200 } });
    await expectNoStoredRecommendation(route.slug, route.riverId!);
  });
  it('does not manufacture a current condition-zone identity for an unversioned stored score', async () => {
    const route = getRiverBySlug('ouachita-river-remmel-whitewater-park')!;
    installSnapshot(route, true);
    await expectNoStoredRecommendation(route.slug, route.riverId!);
  });
  it('keeps fresh scores that actually match the current route condition zone', async () => {
    const route = getRiverBySlug('ouachita-river-remmel-whitewater-park')!;
    installSnapshot(route);
    expect((await getStoredRiverSummarySnapshot())?.rivers[0].river.slug).toBe(route.slug);
    expect((await getStoredWeekendSummarySnapshot())?.rivers[0].river.slug).toBe(route.slug);
    expect((await getStoredRiverDetailSnapshot(route.slug))?.result.river.profile.tooLow).toBe(3200);
    expect((await getStoredRiverGroupSnapshot(route.riverId!))?.result.routes[0].river.slug).toBe(route.slug);
  });
});
