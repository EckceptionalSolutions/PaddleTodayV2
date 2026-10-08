import { describe, expect, it } from 'vitest';
import { washingtonSpokaneRoutes } from './washington-spokane';
import { washingtonSpokaneExpansionRoutes } from './washington-spokane';

describe('Washington Spokane River routes', () => {
  it('publishes reviewed public-access cards with thresholds only where scoring is supported', () => {
    expect(washingtonSpokaneRoutes).toHaveLength(15);
    for (const route of washingtonSpokaneRoutes) {
      expect(route.state).toBe('Washington');
      expect(['planning', 'scored']).toContain(route.scoreEligibility);
      expect(route.gaugeSource?.kind).toBe('direct');
      expect(route.profile.thresholdModel).toBe('minimum-only');
      if (route.scoreEligibility === 'scored') {
        expect(route.profile.tooLow).toBe(1350);
        expect(route.profile.idealMin).toBe(route.gaugeSource?.siteId === '12419000' ? 3000 : 2500);
      } else {
        expect(route.profile.tooLow).toBeUndefined();
        expect(route.profile.idealMin).toBeUndefined();
      }
      expect(route.accessPoints).toHaveLength(2);
      for (const point of route.accessPoints ?? []) {
        if (point.name.startsWith('Mission Ave.')) {
          expect(point).toMatchObject({ latitude: 47.671585, longitude: -117.180981 });
          expect(point.name).toContain('whitewater park/play only');
        } else {
          expect(point.name).toMatch(/water-entry edge|shoreline entry/);
        }
        if (point.name.startsWith('Sullivan Park')) {
          expect(point).toMatchObject({ latitude: 47.672873, longitude: -117.196939 });
          expect(point.name).toContain('imagery-derived');
        }
        if (point.name.startsWith('Mirabeau Park')) {
          expect(point).toMatchObject({ latitude: 47.68186, longitude: -117.22255 });
          expect(point.name).toContain('imagery-georeferenced');
        }
      }
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.safetyProfile?.hazards).toContain('dam');
      expect(route.sourceLinks?.length).toBeGreaterThanOrEqual(6);
    }
    expect(washingtonSpokaneRoutes.find((route) => route.slug === 'spokane-river-tj-meenach-plese-flats')?.scoreEligibility).toBe('planning');
  });
});

describe('Washington Spokane expansion routes', () => {
  it('publishes documented upper launch pairs as planning-only choices with reviewed safety metadata', () => {
    expect(washingtonSpokaneExpansionRoutes).toHaveLength(16);
    for (const route of washingtonSpokaneExpansionRoutes) {
      expect(route.state).toBe('Washington');
      if (route.slug === 'spokane-river-harvard-barker') {
        expect(route.scoreEligibility).toBe('scored');
        expect(route.profile.tooLow).toBe(1350);
        expect(route.profile.idealMin).toBe(3000);
      } else {
        expect(route.scoreEligibility).toBe('planning');
        expect(route.profile.tooLow).toBeUndefined();
        expect(route.profile.idealMin).toBeUndefined();
      }
      expect(route.gaugeSource).toMatchObject({ siteId: '12419000', kind: 'direct' });
      expect(route.accessPoints).toHaveLength(2);
      for (const point of route.accessPoints ?? []) {
        if (point.name.startsWith('Mission Ave.')) {
          expect(point).toMatchObject({ latitude: 47.671585, longitude: -117.180981 });
          expect(point.name).toContain('whitewater park/play only');
        } else {
          expect(point.name).toMatch(/water-entry edge|shoreline entry/);
        }
        if (point.name.startsWith('Sullivan Park')) {
          expect(point).toMatchObject({ latitude: 47.672873, longitude: -117.196939 });
          expect(point.name).toContain('imagery-derived');
        }
        if (point.name.startsWith('Mirabeau Park')) {
          expect(point).toMatchObject({ latitude: 47.68186, longitude: -117.22255 });
          expect(point.name).toContain('imagery-georeferenced');
        }
      }
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
    }
    expect(washingtonSpokaneExpansionRoutes.filter((route) => route.scoreEligibility === 'scored').map((route) => route.slug)).toEqual(['spokane-river-harvard-barker']);
  });
});
