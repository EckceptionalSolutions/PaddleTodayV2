import { describe, expect, it } from 'vitest';
import { riverTripDetails } from '../data/river-trip-details';
import { routeInventory } from '../data/rivers';
import { getApprovedRoutePhotos } from '../data/route-gallery';

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

  it('publishes Iron Gate to Glen Wilton with direct Lick Run flow and public endpoints', () => {
    const slug = 'james-river-iron-gate-glen-wilton';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '02016500', metric: 'discharge_cfs', kind: 'direct' });
    expect(route?.profile).toMatchObject({
      thresholdModel: 'two-sided',
      tooLow: 400,
      idealMin: 800,
      idealMax: 5000,
      tooHigh: 20000,
    });
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.distanceLabel).toContain('2.5 published river miles');
    expect(route?.logistics?.distanceLabel).toContain('3.2 miles');
    expect(route?.logistics?.estimatedPaddleTime).toContain('Plan 2–3 hours');
    expect(trip?.putIn.name).toContain('Iron Gate');
    expect(trip?.takeOut.name).toContain('Glen Wilton');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it('publishes Bent Creek to James River State Park with direct flow and public endpoints', () => {
    const slug = 'james-river-bent-creek-state-park';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '02026000', metric: 'discharge_cfs', kind: 'direct' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 800, idealMin: 1200, idealMax: 4000, tooHigh: 6000 });
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(trip?.putIn.name).toContain('Bent Creek');
    expect(trip?.takeOut.name).toContain('Park Road');
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

  it('publishes Newport to White House with direct Luray flow and public endpoints', () => {
    const slug = 'south-fork-shenandoah-newport-white-house';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '01629500', metric: 'discharge_cfs', kind: 'direct' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 450, idealMin: 600, idealMax: 1600, tooHigh: 2500 });
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.profile.confidenceNotes).toContain('8.5-mile Newport-to-White House');
    expect(trip?.putIn.name).toContain('Newport');
    expect(trip?.takeOut.name).toContain('White House');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it("publishes Meems Bottom to Chapman's Landing with direct stage and public endpoints", () => {
    const slug = 'north-fork-shenandoah-meems-chapmans';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '01632000', metric: 'gage_height_ft', kind: 'direct' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 3, idealMin: 3.5, idealMax: 5, tooHigh: 6 });
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.distanceLabel).toContain('20.4 mapped river miles');
    expect(route?.logistics?.estimatedPaddleTime).toContain('7–10+ hours');
    expect(route?.profile.confidenceNotes).toContain("DWR's current access inventory");
    expect(route?.safetyProfile?.safetyNotes.join(' ')).toContain('about 3 miles downstream');
    expect(route?.safetyProfile?.safetyNotes.join(' ')).toContain('portaging it is not advised');
    expect(trip?.putIn.name).toContain('Meems Bottom');
    expect(trip?.takeOut.name).toContain("Chapman's Landing");
    expect(trip?.continuityStatus).toBe('verified');
  });

  it('publishes Route 6 to the Hardware River WMA bridge with direct flow and a mandatory takeout', () => {
    const slug = 'hardware-river-route-6-wma-bridge';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '02030000', metric: 'discharge_cfs', kind: 'direct' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 190, idealMin: 300, idealMax: 1800, tooHigh: 7500 });
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.camping).toContain('14 consecutive nights');
    expect(route?.logistics?.camping).toContain('within 300 feet');
    expect(trip?.putIn.name).toContain('Route 6');
    expect(trip?.takeOut.name).toContain('bridge');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it('publishes Pony Pasture to Reedy Creek with direct Richmond stage and a mandatory takeout', () => {
    const slug = 'james-river-pony-pasture-reedy-creek';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '02037500', metric: 'gage_height_ft', kind: 'direct' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 3, idealMin: 4, idealMax: 7, tooHigh: 9 });
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.logistics?.distanceLabel).toContain('4.5 river miles');
    expect(route?.logistics?.distanceLabel).toContain('3.5 miles');
    expect(route?.sourceLinks.some((link) => link.label.includes('combined sewer overflow'))).toBe(true);
    expect(trip?.putIn.name).toContain('Pony Pasture');
    expect(trip?.takeOut.name).toContain('Reedy Creek');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it('uses rights-cleared route imagery for the five Virginia corridors with verified assets', () => {
    const slugs = [
      'james-river-bent-creek-state-park',
      'south-fork-shenandoah-newport-white-house',
      'north-fork-shenandoah-meems-chapmans',
      'hardware-river-route-6-wma-bridge',
      'james-river-pony-pasture-reedy-creek',
    ];

    for (const slug of slugs) {
      const photos = getApprovedRoutePhotos(slug);
      expect(photos, slug).toHaveLength(1);
      expect(photos[0].src, slug).toMatch(new RegExp(`^/gallery/${slug}/`));
      expect(photos[0].credit, slug).not.toBe('Paddle Today');
    }
  });

  it('publishes the Upper Pigg Blueway with an explicit proxy gauge and reviewed access anchors', () => {
    const slug = 'pigg-river-waid-lynch';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.scoreEligibilityReason).toBe('proxy_gauge');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '02056900', metric: 'gage_height_ft', kind: 'proxy' });
    expect(route?.fallbackGaugeSources?.[0]).toMatchObject({ provider: 'usgs', siteId: '02058400', kind: 'direct' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'two-sided', tooLow: 2, idealMin: 2.6, idealMax: 3.5, tooHigh: 4 });
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(trip?.putIn.name).toContain('Waid');
    expect(trip?.takeOut.name).toContain('Lynch');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it('publishes the Danville Riverfront to Anglers corridor as planning-only proxy coverage', () => {
    const slug = 'dan-river-danville-riverfront-anglers';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.scoreEligibilityReason).toBe('proxy_gauge');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '02075045', metric: 'discharge_cfs', kind: 'proxy' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'minimum-only' });
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'strainers', 'whitewater', 'urban_water_quality']));
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.distanceLabel).toContain('3.3 river miles');
    expect(trip?.putIn.name).toContain('Riverfront');
    expect(trip?.takeOut.name).toContain('Anglers');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it('publishes the North Fork Holston Wadlow Gap to Yuma chain as planning-only proxy coverage', () => {
    const slug = 'north-fork-holston-wadlow-yuma';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.scoreEligibilityReason).toBe('proxy_gauge');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '03490000', metric: 'discharge_cfs', kind: 'proxy' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'minimum-only' });
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'fast_rise', 'strainers', 'access_uncertain']));
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.distanceLabel).toContain('4.4 river miles');
    expect(route?.accessPoints).toHaveLength(3);
    expect(trip?.putIn.name).toContain('Wadlow');
    expect(trip?.takeOut.name).toContain('Yuma');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it('publishes the Banister King’s Bridge to Terry’s Bridge corridor as planning-only proxy coverage', () => {
    const slug = 'banister-river-kings-bridge-terrys';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.scoreEligibilityReason).toBe('proxy_gauge');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '02077000', metric: 'gage_height_ft', kind: 'proxy' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'minimum-only' });
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('access_uncertain');
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.distanceLabel).toContain('5 river miles');
    expect(trip?.putIn.name).toContain('King');
    expect(trip?.takeOut.name).toContain('Terry');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it('publishes the South Fork Holston Route 58 to Alvarado float with direct DWR flow guidance', () => {
    const slug = 'south-fork-holston-route58-alvarado';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '03473000', metric: 'gage_height_ft', kind: 'direct' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 3.5, idealMin: 3.5 });
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['whitewater', 'fast_rise', 'strainers', 'dam', 'access_uncertain']));
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.distanceLabel).toContain('3.5–3.8 river miles');
    expect(route?.accessPoints).toHaveLength(2);
    expect(trip?.putIn.name).toContain('Route 58');
    expect(trip?.takeOut.name).toContain('Alvarado');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it('publishes the Chestnut Creek Galax to Byllesby reach as planning-only direct-gauge coverage', () => {
    const slug = 'chestnut-creek-galax-byllesby';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '03165000', metric: 'discharge_cfs', kind: 'direct' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 200, thresholdSourceStrength: 'community' });
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['whitewater', 'low_water', 'strainers', 'dam', 'access_uncertain']));
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.distanceLabel).toContain('13.2 river miles');
    expect(route?.accessPoints).toHaveLength(2);
    expect(trip?.putIn.name).toContain('Galax');
    expect(trip?.takeOut.name).toContain('Byllesby');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it("publishes the Upper Clinch Blackford Bridge to Puckett's Hole float as planning-only direct-gauge coverage", () => {
    const slug = 'clinch-river-blackford-pucketts-hole';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '03524000', metric: 'discharge_cfs', kind: 'direct' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'minimum-only', thresholdSourceStrength: 'mixed' });
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'fast_rise', 'strainers', 'cold_water', 'private_banks', 'access_uncertain']));
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.logistics?.distanceLabel).toContain('7.3 river miles');
    expect(route?.accessPoints).toHaveLength(2);
    expect(trip?.putIn.name).toContain('Blackford');
    expect(trip?.takeOut.name).toContain("Puckett's Hole");
    expect(trip?.continuityStatus).toBe('verified');
  });

  it('publishes the Smith River Bassett to Great Road section as planning-only direct-gauge coverage', () => {
    const slug = 'smith-river-bassett-great-road';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '02072500', metric: 'discharge_cfs', kind: 'direct' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'minimum-only', thresholdSourceStrength: 'mixed' });
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['whitewater', 'low_water', 'fast_rise', 'dam', 'cold_water', 'access_uncertain']));
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.logistics?.distanceLabel).toContain('5 river miles');
    expect(route?.accessPoints).toHaveLength(2);
    expect(trip?.putIn.name).toContain('Bassett');
    expect(trip?.takeOut.name).toContain('Great Road');
    expect(trip?.continuityStatus).toBe('verified');
  });

  it('publishes the Rivanna Crofton to Palmyra section as planning-only direct-gauge coverage', () => {
    const slug = 'rivanna-river-crofton-palmyra';
    const route = routeBySlug(slug);
    const trip = riverTripDetails[slug];

    expect(route?.state).toBe('Virginia');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.gaugeSource).toMatchObject({ provider: 'usgs', siteId: '02034000', metric: 'discharge_cfs', kind: 'direct' });
    expect(route?.profile).toMatchObject({ thresholdModel: 'minimum-only', thresholdSourceStrength: 'official' });
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['whitewater', 'low_water', 'fast_rise', 'strainers', 'cold_water', 'access_uncertain']));
    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.logistics?.distanceLabel).toContain('6.5 river miles');
    expect(route?.accessPoints).toHaveLength(2);
    expect(trip?.putIn.name).toContain('Crofton');
    expect(trip?.takeOut.name).toContain('Palmyra');
    expect(trip?.continuityStatus).toBe('verified');
  });
});
