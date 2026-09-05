import { describe, expect, it } from 'vitest';
import { getRouteGalleryPhotos, getRoutePreviewPhoto } from '../data/route-gallery';
import { northCarolinaRoutes } from '../data/routes/north-carolina';
import { publicRivers } from '../data/rivers';

describe('North Carolina strategic expansion', () => {
  it('adds the three adjacent New River State Park access sections', () => {
    expect(northCarolinaRoutes).toHaveLength(45);

    const routes = [
      northCarolinaRoutes.find((route) => route.id === 'new-river-elk-shoals-wagoner'),
      northCarolinaRoutes.find((route) => route.id === 'new-river-wagoner-us221'),
      northCarolinaRoutes.find((route) => route.id === 'new-river-us221-kings-creek'),
    ];

    for (const route of routes) {
      expect(route).toBeDefined();
      expect(route?.riverId).toBe('new-river');
      expect(route?.name).toBe('South Fork New River');
      expect(route?.state).toBe('North Carolina');
      expect(route?.routeType).toBe('recreational');
      expect(route?.gaugeSource.kind).toBe('proxy');
      expect(route?.gaugeSource.siteId).toBe('03161000');
      expect(route?.scoreEligibility).toBe('planning');
      expect(route?.scoreEligibilityReason).toBe('proxy_gauge');
      expect(route?.profile.thresholdModel).toBe('minimum-only');
      expect(route?.profile.idealMin).toBeUndefined();
      expect(route?.profile.idealMax).toBeUndefined();
      expect(route?.accessPoints).toHaveLength(2);
      expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'strainers', 'mandatory_takeout']));
      expect(route?.logistics?.campingClassification).toBeTruthy();
      expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
      expect(route?.evidenceNotes.some((item) => item.label === 'Official section mileage and paddling time')).toBe(true);
      expect(route?.evidenceNotes.some((item) => item.label === 'Same-river proxy gauge')).toBe(true);
      expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
      expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
    }

    expect(routes[0]?.accessPoints?.[0]?.name).toContain('Elk Shoals');
    expect(routes[0]?.accessPoints?.[1]?.name).toContain('Wagoner');
    expect(routes[1]?.accessPoints?.[0]?.name).toContain('Wagoner');
    expect(routes[1]?.accessPoints?.[1]?.name).toContain('U.S. 221');
    expect(routes[2]?.accessPoints?.[0]?.name).toContain('U.S. 221');
    expect(routes[2]?.accessPoints?.[1]?.name).toContain('Kings Creek');
  });

  it('adds a coastal blackwater route and two Piedmont blueway sections', () => {
    const routes = [
      northCarolinaRoutes.find((route) => route.id === 'lumber-river-boardman-princess-ann'),
      northCarolinaRoutes.find((route) => route.id === 'south-fork-catawba-spencer-mcadenville'),
      northCarolinaRoutes.find((route) => route.id === 'south-fork-catawba-mcadenville-cramerton'),
    ];

    expect(routes.every(Boolean)).toBe(true);
    expect(routes.every((route) => route?.state === 'North Carolina')).toBe(true);
    expect(routes.every((route) => route?.routeType === 'recreational')).toBe(true);
    expect(routes.every((route) => route?.scoreEligibility === 'planning')).toBe(true);
    expect(routes.every((route) => route?.profile.thresholdModel === 'minimum-only')).toBe(true);
    expect(routes.every((route) => route?.accessPoints?.length === 2)).toBe(true);
    expect(routes.every((route) => route?.safetyProfile?.reviewStatus === 'reviewed')).toBe(true);
    expect(routes.every((route) => route?.evidenceNotes.some((item) => item.label === 'Named public endpoint pair'))).toBe(true);
    expect(routes.every((route) => route?.logistics?.campingClassification)).toBe(true);
    expect(routes.every((route) => getRoutePreviewPhoto(route!).isPlaceholder === false)).toBe(true);

    const lumber = routes[0];
    expect(lumber?.riverId).toBe('lumber-river');
    expect(lumber?.gaugeSource.kind).toBe('direct');
    expect(lumber?.gaugeSource.siteId).toBe('02134500');
    expect(lumber?.takeOut?.name).toContain('Princess Ann');

    const southFork = routes[1];
    expect(southFork?.riverId).toBe('south-fork-catawba-river');
    expect(southFork?.gaugeSource.kind).toBe('proxy');
    expect(southFork?.scoreEligibilityReason).toBe('proxy_gauge');
    expect(southFork?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['dam', 'mandatory_takeout']));
  });

  it('adds a defensible tidal and estuarine coastal route', () => {
    const route = northCarolinaRoutes.find((candidate) => candidate.id === 'hammocks-beach-huggins-island-loop');

    expect(route).toBeDefined();
    expect(route?.riverId).toBe('hammocks-beach');
    expect(route?.region).toContain('Bogue Inlet');
    expect(route?.routeType).toBe('recreational');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.scoreEligibilityReason).toBe('proxy_gauge');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('02092760');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.profile.windSensitivity).toBe(5);
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['wind', 'cold_water', 'access_uncertain']));
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.putIn).toEqual(route?.takeOut);
    expect(route?.evidenceNotes.some((item) => item.label === 'Named coastal paddle route')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Independent coastal-trail GIS')).toBe(true);
    expect(getRoutePreviewPhoto(route!).isPlaceholder).toBe(false);
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('adds five connected French Broad Paddle Trail sections', () => {
    const routeIds = [
      'french-broad-island-ford-hap-simpson',
      'french-broad-penrose-blantyre',
      'french-broad-blantyre-horse-shoe',
      'french-broad-horse-shoe-lazy-otter',
      'french-broad-lazy-otter-westfeldt',
    ];
    const routes = routeIds.map((id) => northCarolinaRoutes.find((route) => route.id === id));

    expect(routes.every(Boolean)).toBe(true);
    for (const route of routes) {
      expect(route?.riverId).toBe('french-broad-river');
      expect(route?.state).toBe('North Carolina');
      expect(route?.routeType).toBe('recreational');
      expect(route?.gaugeSource.kind).toBe('direct');
      expect(route?.gaugeSource.siteId).toBe('03439000');
      expect(route?.scoreEligibility).toBe('planning');
      expect(route?.profile.thresholdModel).toBe('minimum-only');
      expect(route?.profile.idealMin).toBeUndefined();
      expect(route?.profile.idealMax).toBeUndefined();
      expect(route?.accessPoints).toHaveLength(2);
      expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['cold_water', 'strainers', 'access_uncertain']));
      expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route?.evidenceNotes.some((item) => item.label === 'Named public endpoint pair')).toBe(true);
      expect(getRoutePreviewPhoto(route!).isPlaceholder).toBe(false);
      expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
    }

    expect(routes[0]?.putIn?.name).toContain('Island Ford');
    expect(routes[0]?.takeOut?.name).toContain('Hap Simpson');
    expect(routes[4]?.putIn?.name).toContain('Lazy Otter');
    expect(routes[4]?.takeOut?.name).toContain('Westfeldt');
  });

  it('adds the connected Haw River Paddle Trail access sections', () => {
    const routeIds = [
      'haw-river-brooks-altamahaw',
      'haw-river-altamahaw-shallow-ford',
      'haw-river-shallow-ford-indian-valley',
      'haw-river-indian-valley-great-bend',
      'haw-river-glencoe-red-slide',
      'haw-river-red-slide-graham',
      'haw-river-graham-swepsonville',
      'haw-river-swepsonville-saxapahaw-lake',
    ];
    const routes = routeIds.map((id) => northCarolinaRoutes.find((route) => route.id === id));

    expect(routes.every(Boolean)).toBe(true);
    for (const route of routes) {
      expect(route?.riverId).toBe('haw-river');
      expect(route?.state).toBe('North Carolina');
      expect(route?.routeType).toBe('recreational');
      expect(route?.scoreEligibility).toBe('planning');
      expect(route?.profile.thresholdModel).toBe('minimum-only');
      expect(route?.profile.idealMin).toBeUndefined();
      expect(route?.profile.idealMax).toBeUndefined();
      expect(route?.accessPoints).toHaveLength(2);
      expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'fast_rise', 'strainers']));
      expect(route?.logistics?.campingClassification).toBeTruthy();
      expect(route?.evidenceNotes.some((item) => item.label === 'Named public endpoint pair')).toBe(true);
      expect(getRoutePreviewPhoto(route!).isPlaceholder).toBe(false);
      expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
    }

    expect(routes[0]?.putIn?.name).toContain('Brooks Bridge');
    expect(routes[0]?.takeOut?.name).toContain('Altamahaw');
    expect(routes[7]?.putIn?.name).toContain('Swepsonville');
    expect(routes[7]?.takeOut?.name).toContain('Saxapahaw');
  });

  it('adds the documented Roanoke Williamston-to-Astoria section as planning-only context', () => {
    const route = northCarolinaRoutes.find((candidate) => candidate.id === 'roanoke-river-williamston-astoria');

    expect(route?.riverId).toBe('roanoke-river');
    expect(route?.state).toBe('North Carolina');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.takeOut.name).toBe('NCWRC Astoria Landing');
    expect(getRoutePreviewPhoto(route!).isPlaceholder).toBe(false);
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('adds ten named Mayo and Yadkin public-access sections', () => {
    const routeIds = [
      'mayo-river-deshazo-anglin',
      'mayo-river-anglin-hickory',
      'mayo-river-hickory-mayodan',
      'yadkin-river-crater-burch',
      'yadkin-river-burch-shore',
      'yadkin-river-shore-shoals',
      'yadkin-river-shoals-donnaha',
      'yadkin-river-donnaha-old-421',
      'yadkin-river-old-421-huntsville',
      'yadkin-river-huntsville-tanglewood',
    ];
    const routes = routeIds.map((id) => northCarolinaRoutes.find((route) => route.id === id));

    expect(routes.every(Boolean)).toBe(true);
    for (const route of routes) {
      expect(route?.state).toBe('North Carolina');
      expect(route?.routeType).toBe('recreational');
      expect(route?.scoreEligibility).toBe('planning');
      expect(route?.profile.thresholdModel).toBe('minimum-only');
      expect(route?.profile.idealMin).toBeUndefined();
      expect(route?.profile.idealMax).toBeUndefined();
      expect(route?.accessPoints).toHaveLength(2);
      expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route?.logistics?.campingClassification).toBeTruthy();
      expect(getRoutePreviewPhoto(route!).isPlaceholder).toBe(false);
      expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
    }

    expect(routes.slice(0, 3).every((route) => route?.riverId === 'mayo-river')).toBe(true);
    expect(routes.slice(3).every((route) => route?.riverId === 'yadkin-river')).toBe(true);
    expect(routes[0]?.putIn.name).toContain('Deshazo');
    expect(routes[9]?.takeOut.name).toContain('Tanglewood');
  });

  it('keeps the state route set gallery-ready and endpoint-pair unique', () => {
    const endpointKey = (route: (typeof northCarolinaRoutes)[number]) => {
      const endpoints = [route.putIn, route.takeOut].map((point) =>
        `${point?.latitude?.toFixed(5)},${point?.longitude?.toFixed(5)}`,
      );
      return [route.riverId, ...endpoints.sort()].join('|');
    };

    const endpointKeys = northCarolinaRoutes.map(endpointKey);
    expect(new Set(endpointKeys).size).toBe(endpointKeys.length);

    for (const route of northCarolinaRoutes) {
      expect(route.safetyProfile?.hazards?.length, route.slug).toBeGreaterThan(0);
      expect(route.safetyProfile?.safetyNotes?.length, route.slug).toBeGreaterThan(0);
      expect(route.logistics?.camping, route.slug).toBeTruthy();
      expect(route.logistics?.campingClassification, route.slug).toBeTruthy();
      expect(getRouteGalleryPhotos(route), route.slug).not.toHaveLength(0);
      expect(getRoutePreviewPhoto(route).isPlaceholder, route.slug).toBe(false);
    }
  });
});
