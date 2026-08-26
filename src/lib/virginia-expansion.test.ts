import { describe, expect, it } from 'vitest';
import { riverTripDetails } from '../data/river-trip-details';
import { routeInventory } from '../data/rivers';

const routeBySlug = (slug: string) => routeInventory.find((route) => route.slug === slug);

describe('Virginia corridor-first expansion', () => {
  it('publishes the Maury route with official minimum-only stage guidance', () => {
    const route = routeBySlug('maury-river-glen-maury-locher');

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '02024000', metric: 'gage_height_ft', kind: 'direct' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 2 });
    expect(route?.profile.tooHigh).toBeUndefined();
  });

  it('publishes Austinville to Foster Falls with direct flow and bounded guidance', () => {
    const slug = 'new-river-austinville-foster-falls';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '03165500', metric: 'discharge_cfs', kind: 'direct' });
    expect(route?.profile).toMatchObject({
      thresholdModel: 'two-sided',
      tooLow: 1200,
      idealMin: 1600,
      idealMax: 6000,
      tooHigh: 10000,
    });
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(trip?.putIn.name).toContain('Austinville');
    expect(trip?.takeOut.name).toContain('Foster Falls');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it("publishes Puckett's Hole to Nash's Ford with direct flow and reviewed access", () => {
    const slug = 'clinch-river-pucketts-hole-nash-ford';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '03524000', metric: 'discharge_cfs', kind: 'direct' });
    expect(route?.profile).toMatchObject({
      thresholdModel: 'two-sided',
      tooLow: 600,
      idealMin: 800,
      idealMax: 3000,
      tooHigh: 5000,
    });
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(trip?.putIn.name).toContain("Puckett's Hole");
    expect(trip?.takeOut.name).toContain("Nash's Ford");
    expect(trip?.continuityStatus).toBe('verified');
  });

  it('publishes Buchanan to Arcadia with a direct gauge and formal public endpoints', () => {
    const slug = 'james-river-buchanan-arcadia';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '02019500', metric: 'discharge_cfs', kind: 'direct' });
    expect(route?.profile).toMatchObject({
      thresholdModel: 'two-sided',
      tooLow: 500,
      idealMin: 800,
      idealMax: 6000,
      tooHigh: 25000,
    });
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(trip?.putIn.name).toContain('Buchanan');
    expect(trip?.takeOut.name).toContain('Arcadia');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it("publishes Rector Tract to Kelly's Ford with direct stage and public endpoints", () => {
    const slug = 'rappahannock-river-rector-tract-kellys-ford';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '01664000', metric: 'gage_height_ft', kind: 'direct' });
    expect(route?.profile).toMatchObject({
      thresholdModel: 'two-sided',
      tooLow: 3.5,
      idealMin: 3.8,
      idealMax: 5.5,
      tooHigh: 6.5,
    });
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(trip?.putIn.name).toContain('Rector Tract');
    expect(trip?.takeOut.name).toContain("Kelly's Ford");
    expect(trip?.continuityStatus).toBe('verified');
  });
});
