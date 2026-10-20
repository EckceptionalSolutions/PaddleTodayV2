import { describe, expect, it, vi } from 'vitest';
import { getRiverBySlug, getRiverScore, listScoredRivers } from './rivers';
import { isScoreEligible } from '../data/route-publication';
import { hasStandaloneRoutePage } from '../data/route-page-consolidations';
import { serializePlanningRoute } from './api-contract';
import { scoreRiverCondition } from './scoring';
import type { GaugeReading } from './types';

const now = new Date('2026-07-25T18:00:00Z');
const countyK = 'namekagon-river-county-k-whispering-pines';
const remmel = 'ouachita-river-remmel-whitewater-park';

describe('reference observations and activity-specific flow evidence', () => {
  it('keeps County K public with its direct station and historical observation, without inventing a minimum', () => {
    const route = getRiverBySlug(countyK)!;
    expect(hasStandaloneRoutePage(countyK)).toBe(true);
    expect(route.gaugeSource).toMatchObject({ siteId: '05331833', kind: 'direct' });
    expect(route.profile.tooLow).toBeUndefined();
    expect(route.profile.idealMin).toBeUndefined();
    expect(route.scoreEligibility).toBe('planning');
    expect(isScoreEligible(route)).toBe(false);
    expect(listScoredRivers().some(r => r.slug === countyK)).toBe(false);
    expect(route.evidenceNotes.find(n => n.label === 'Exact route report')?.note).toContain('155 cfs');
    expect(route.logistics!.distanceLabel).toContain('9.9 mi per NPS');
    expect(route.logistics!.watchFor.join(' ')).toContain('not a published minimum');
  });

  it('does not calculate or publish a same-day County K recommendation', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Unexpected upstream request'));
    try {
      expect(await getRiverScore(countyK)).toBeNull();
      expect(fetchSpy).not.toHaveBeenCalled();
    } finally { fetchSpy.mockRestore(); }
    const plan = serializePlanningRoute(getRiverBySlug(countyK)!);
    expect(plan.gaugeBandLabel).toBe('Not scored');
    expect(plan.readiness.status).toBe('withheld');
    expect(plan.river.gaugeSource.siteName).toContain('Leonards');
    expect(plan.river.profile.tooLow).toBeUndefined();
    expect(plan.outlooks).toEqual([]);
  });

  it.each([
    [200, 'too-low'], [500, 'too-low'], [3199, 'too-low'],
    [3200, 'low-shoulder'], [3499, 'low-shoulder'], [3500, 'ideal'],
    [4000, 'ideal'], [4001, 'too-high'], [5000, 'too-high'],
  ])('evaluates Remmel at %i cfs for recreational floating (%s)', (current, band) => {
    const river = getRiverBySlug(remmel)!;
    const gauge: GaugeReading = {
      sourceId: river.gaugeSource.id, observedAt: now.toISOString(), current, unit: 'cfs',
      trend: 'steady', delta24h: 0, changePercent24h: 0, recentSamples: [],
      gaugeHeightNow: null, dischargeNow: current, waterTempF: 68,
      waterTempObservedAt: now.toISOString(), gaugeSource: 'Test observation', waterTempSource: 'Test observation',
    };
    const result = scoreRiverCondition({ river, gauge, weather: null, now });
    expect(result.gaugeBand).toBe(band);
    if (current <= 500) expect(result.riverQuality).toBe(0);
    if (current > 4000) expect(result.readiness.status).toBe('skip');
    expect(result.explanation).not.toContain('River use is prohibited');
  });

  it('retains the Remmel guide and distinct whitewater references without using a scrape-through floor', () => {
    const route = getRiverBySlug(remmel)!;
    expect(hasStandaloneRoutePage(remmel)).toBe(true);
    expect(isScoreEligible(route)).toBe(true);
    expect(route.profile).toMatchObject({ tooLow: 3200, idealMin: 3500, idealMax: 4000, tooHigh: 4000 });
    expect(route.summary).toContain('recreational floating');
    expect(route.profile.confidenceNotes).toContain('not the future release duration');
    expect(route.sourceLinks.some(s => s.url.endsWith('/3052/flow'))).toBe(true);
    expect(route.logistics!.watchFor.join(' ')).toContain('200-500 cfs');
  });
});
