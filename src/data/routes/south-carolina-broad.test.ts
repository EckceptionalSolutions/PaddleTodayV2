import { describe, expect, it } from 'vitest';
import { southCarolinaBroadRoutes } from './south-carolina-broad';

describe('South Carolina Broad River starter routes', () => {
  it('publishes fifteen scored public-access reaches with numeric flow evidence', () => {
    expect(southCarolinaBroadRoutes).toHaveLength(15);
    for (const route of southCarolinaBroadRoutes) {
      expect(route.state).toBe('South Carolina');
      expect(route.scoreEligibility).toBe('scored');
      expect(route.putIn?.latitude).toBeTypeOf('number');
      expect(route.takeOut?.longitude).toBeTypeOf('number');
      expect(route.profile?.thresholdSourceStrength).toBe('community');
      expect(route.evidenceNotes?.some(note => note.label === 'Numeric scoring evidence')).toBe(true);
      expect(route.safetyProfile?.safetyNotes.length).toBeGreaterThanOrEqual(3);
      expect(route.logistics?.camping).toBeTruthy();
    }
  });
});
