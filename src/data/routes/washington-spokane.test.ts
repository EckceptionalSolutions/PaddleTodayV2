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
      expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge'))).toBe(true);
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
      expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge'))).toBe(true);
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
    }
  });
});
