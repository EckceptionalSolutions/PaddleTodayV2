import { describe, expect, it } from 'vitest';
import { montanaBitterrootRoutes } from './montana-bitterroot';

describe('Montana Bitterroot expansion', () => {
  it('keeps eight reviewed public-access planning reaches', () => {
    expect(montanaBitterrootRoutes).toHaveLength(8);
    for (const route of montanaBitterrootRoutes) {
      expect(route.scoreEligibility).toBe('planning');
      expect(route.gaugeSource?.siteId).toBe('12350250');
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route.putIn?.name).toMatch(/Fishing Access|FAS/);
      expect(route.takeOut?.name).toMatch(/Fishing Access|FAS/);
      expect(route.evidenceNotes.find(note => note.label === 'Launch coordinate provenance')?.note).toContain('not necessarily surveyed water-entry toes');
      expect(route.sourceLinks.length).toBeGreaterThanOrEqual(7);
    }
  });
});
