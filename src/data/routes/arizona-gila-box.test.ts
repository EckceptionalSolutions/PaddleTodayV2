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
    expect(route.putIn?.name).toContain('water-entry edge');
    expect(route.takeOut).toMatchObject({ name: 'Dry Canyon boater take-out access area (BLM)', latitude: 32.8922, longitude: -109.4921 });
    expect(route.accessPoints?.[1]?.note).toContain('not a surveyed river edge');
    expect(route.logistics?.campingClassification).toBe('sandbar_or_gravel_bar');
    expect(route.safetyProfile?.hazards).toContain('strainers');
  });
});
