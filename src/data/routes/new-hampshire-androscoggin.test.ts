import { describe, expect, it } from 'vitest';
import { newHampshireAndroscogginRoutes } from './new-hampshire-androscoggin';

describe('New Hampshire Androscoggin planning routes', () => {
  it('publishes researched public-access planning cards without fabricated thresholds', () => {
    expect(newHampshireAndroscogginRoutes).toHaveLength(3);
    for (const route of newHampshireAndroscogginRoutes) {
      expect(route.state).toBe('New Hampshire');
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
