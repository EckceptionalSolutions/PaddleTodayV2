import { describe, expect, it } from 'vitest';
import { newHampshireMerrimackRoutes } from './new-hampshire-merrimack';

describe('New Hampshire Merrimack River planning routes', () => {
  it('publishes public on-water access cards with explicit planning posture', () => {
    expect(newHampshireMerrimackRoutes).toHaveLength(4);
    for (const route of newHampshireMerrimackRoutes) {
      expect(route.state).toBe('New Hampshire');
      expect(route.scoreEligibility).toBe('planning');
      expect(route.gaugeSource).toMatchObject({ siteId: '01081500', kind: 'direct' });
      expect(route.accessPoints).toHaveLength(2);
      expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge'))).toBe(true);
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.safetyProfile?.hazards).toContain('dam');
      expect(route.sourceLinks?.length).toBeGreaterThanOrEqual(5);
    }
  });
});
