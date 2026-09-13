import { describe, expect, it } from 'vitest';
import { arizonaGilaBoxRoutes } from './arizona-gila-box';

describe('Arizona Gila Box routes', () => {
  it('publishes the BLM/American Whitewater scored overnight reach', () => {
    expect(arizonaGilaBoxRoutes).toHaveLength(1);
    const route = arizonaGilaBoxRoutes[0];
    expect(route.scoreEligibility).toBe('scored');
    expect(route.gaugeSource).toMatchObject({ siteId: '09442000', kind: 'direct' });
    expect(route.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 60, idealMin: 200 });
    expect(route.accessPoints).toHaveLength(2);
    expect(route.accessPoints?.every((point) => point.name.toLowerCase().includes('water-entry edge'))).toBe(true);
    expect(route.logistics?.campingClassification).toBe('sandbar_or_gravel_bar');
    expect(route.safetyProfile?.hazards).toContain('strainers');
  });
});
