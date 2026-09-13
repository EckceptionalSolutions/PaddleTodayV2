import { describe, expect, it } from 'vitest';
import { washingtonSpokaneRoutes } from './washington-spokane';

describe('Washington Spokane River planning routes', () => {
  it('publishes researched public-access planning cards without fabricated thresholds', () => {
    expect(washingtonSpokaneRoutes).toHaveLength(9);
    for (const route of washingtonSpokaneRoutes) {
      expect(route.state).toBe('Washington');
      expect(route.scoreEligibility).toBe('planning');
      expect(route.gaugeSource?.kind).toBe('direct');
      expect(route.accessPoints).toHaveLength(2);
      expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge'))).toBe(true);
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.safetyProfile?.hazards).toContain('dam');
      expect(route.sourceLinks?.length).toBeGreaterThanOrEqual(4);
    }
  });
});
