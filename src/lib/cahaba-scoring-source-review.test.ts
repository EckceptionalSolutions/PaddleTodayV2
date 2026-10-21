import { describe, expect, it } from 'vitest';
import { getRiverBySlug, listRivers } from './rivers';
import { scoreRiverCondition } from './scoring';
import { hasStandaloneRoutePage } from '../data/route-page-consolidations';
import { routeGuideReviewByRiverId } from '../data/route-guide-publication-reviews';
import type { GaugeReading, WeatherSnapshot } from './types';
import fixture from '../../tests/mobile-web/fixtures/route-detail.json';

describe('Cahaba reach-specific scoring evidence', () => {
  it('uses the published Moon River floor without inventing an ideal range or high-water clearance', () => {
    const river = getRiverBySlug('cahaba-river-moon-grants-mill')!;
    expect(river.scoreEligibility).toBe('scored');
    expect(river.profile.thresholdModel).toBe('minimum-only');
    expect(river.profile.tooLow).toBe(100);
    expect(river.profile.thresholdSource.url).toBe('https://www.cahabablueway.org/moon-river/');
    for (const key of ['idealMin', 'idealMax', 'tooHigh'] as const) expect(river.profile[key]).toBeUndefined();
    const now = new Date('2026-07-25T18:00:00Z');
    const weather = { ...fixture.result.weather, observedAt: now.toISOString() } as unknown as WeatherSnapshot;
    for (const current of [99, 100, 400, 7000]) {
      const gauge: GaugeReading = { sourceId: river.gaugeSource.id, observedAt: now.toISOString(), current, unit: 'cfs', trend: 'steady', delta24h: 0, changePercent24h: 0, recentSamples: [], gaugeHeightNow: null, dischargeNow: current, waterTempF: 68, waterTempObservedAt: now.toISOString(), gaugeSource: 'Synthetic test observation', waterTempSource: 'Synthetic test observation' };
      const result = scoreRiverCondition({ river, gauge, weather, now });
      expect(result.score).toBeLessThanOrEqual(74);
      expect(result.readiness.status).not.toBe('ready');
      expect(result.gaugeBand).toBe(current < 100 ? 'too-low' : 'minimum-met');
    }
  });

  it.each(['cahaba-river-grants-mill-old-overton', 'cahaba-river-old-overton-highway-280'])('%s preserves the direct observation as planning context with no borrowed numeric band', slug => {
    const route = getRiverBySlug(slug)!;
    expect(route.scoreEligibility).toBe('planning');
    expect(route.gaugeSource).toMatchObject({ siteId: '02423380', kind: 'direct' });
    for (const key of ['tooLow', 'idealMin', 'idealMax', 'tooHigh'] as const) expect(route.profile[key]).toBeUndefined();
    expect(route.profile.confidenceNotes).toMatch(/does not publish|do not establish/);
    expect(JSON.stringify(route)).not.toContain('7,000');
    expect(route.putIn).toBeDefined(); expect(route.takeOut).toBeDefined();
    expect(route.safetyProfile?.hazards).toContain('dam');
  });

  it('retains three distinct guides and records the same three choices in the comparison hub', () => {
    const routes = listRivers().filter(route => route.riverId === 'cahaba-river-alabama');
    expect(routes).toHaveLength(3);
    const review = routeGuideReviewByRiverId.get('cahaba-river-alabama')!;
    expect(review.retainedGuides.slice().sort()).toEqual(routes.map(route => route.slug).sort());
    expect(review.hubOptions).toHaveLength(0);
    for (const route of routes) expect(hasStandaloneRoutePage(route.slug)).toBe(true);
  });
});
