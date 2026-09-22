import { describe, expect, it } from 'vitest';
import { washingtonSpokaneRoutes } from './washington-spokane';
import { washingtonSpokaneExpansionRoutes } from './washington-spokane';

describe('Washington Spokane River scored routes', () => {
  it('publishes researched public-access cards with documented flow thresholds', () => {
    expect(washingtonSpokaneRoutes).toHaveLength(15);
    for (const route of washingtonSpokaneRoutes) {
      expect(route.state).toBe('Washington');
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource?.kind).toBe('direct');
      expect(route.profile.thresholdModel).toBe('minimum-only');
      expect(route.profile.tooLow).toBe(1350);
      expect(route.profile.idealMin).toBe(2500);
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
  });
});

describe('Washington Spokane expansion routes', () => {
  it('publishes the documented upper launch pairs with scored safety metadata', () => {
    expect(washingtonSpokaneExpansionRoutes).toHaveLength(14);
    for (const route of washingtonSpokaneExpansionRoutes) {
      expect(route.state).toBe('Washington');
      expect(route.scoreEligibility).toBe('scored');
      expect(route.gaugeSource).toMatchObject({ siteId: '12422500', kind: 'direct' });
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
  });
});
