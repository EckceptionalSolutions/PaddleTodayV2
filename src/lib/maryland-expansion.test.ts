import { describe, expect, it } from 'vitest';
import { publicRivers } from '../data/rivers';
import { marylandRoutes } from '../data/routes/maryland';
import { getRoutePreviewPhoto } from '../data/route-gallery';
import { riverTripDetails } from '../data/river-trip-details';
import { corridorForSlug } from '../data/route-corridors';
import { getRiverBySlug } from './rivers';

describe('Maryland route expansion', () => {
  const expectedIds = [
    'baltimore-blueway-inner-harbor-heritage',
    'baltimore-blueway-canton',
    'baltimore-blueway-domino-sugar',
    'baltimore-blueway-middle-branch',
    'baltimore-blueway-fort-mchenry',
    'baltimore-blueway-baltimore-peninsula',
    'baltimore-blueway-masonville-cove',
    'baltimore-blueway-patapsco-river',
    'patapsco-river-woodstock-daniels',
    'patapsco-river-orange-grove-avalon',
    'antietam-creek-devils-backbone-md34',
    'antietam-creek-md34-potomac',
    'monocacy-river-rocky-ridge-devilbiss',
    'monocacy-river-devilbiss-gambrill',
    'monocacy-river-gambrill-monocacy-ramp',
    'potomac-river-oldtown-paw-paw',
    'potomac-river-fifteen-mile-creek-hancock',
    'potomac-river-hancock-big-pool',
    'potomac-river-big-pool-williamsport',
    'big-pipe-creek-hapes-mill-double-pipe-park',
    'little-pipe-creek-union-bridge-double-pipe-park',
    'catoctin-creek-doubs-meadow-catoctin-park',
    'catoctin-creek-catoctin-park-lander',
    'deer-creek-sandy-hook-md136',
    'gunpowder-falls-prettyboy-falls-road',
    'gunpowder-falls-masemore-monkton',
    'gunpowder-falls-monkton-phoenix',
    'conococheague-creek-kemps-mill-williamsport',
    'patuxent-river-governor-bridge-queen-anne',
    'patuxent-river-queen-anne-wootons',
    'patuxent-river-wootons-jacksons-landing',
    'patuxent-river-jacksons-selbys-landing',
    'patuxent-river-selbys-clyde-watson',
    'pocomoke-river-snow-hill-shad',
    'pocomoke-river-shad-milburn',
    'pocomoke-river-mattaponi-milburn',
    'north-branch-potomac-mason-spring-gap',
    'north-branch-potomac-spring-gap-oldtown',
    'potomac-river-paw-paw-bonds',
    'potomac-river-bonds-fifteen-mile-creek',
    'north-branch-potomac-westernport-mccoole',
    'north-branch-potomac-mccoole-black-oak',
    'north-branch-potomac-black-oak-fairgrounds',
    'janes-island-short-trail-loop',
    'janes-island-yellow-trail-loop',
    'janes-island-blue-trail-loop',
    'janes-island-black-trail-loop',
    'janes-island-red-trail-loop',
    'janes-island-green-trail-loop',
    'janes-island-brown-trail-loop',
    'blackwater-river-green-trail-loop',
    'blackwater-river-purple-trail-shorters',
    'blackwater-river-orange-trail-loop',
    'corsica-river-mill-stream-trail',
    'corsica-river-yellow-bank-stream-trail',
    'corsica-river-alder-branch-trail',
    'kent-island-chesapeake-bay-trail',
    'kent-island-eastern-bay-trail',
    'kent-island-thompson-warehouse-creek-trail',
    'kent-island-kent-narrows-jackson-creek-trail',
    'kent-island-kent-narrows-goodhands-creek-trail',
    'kent-island-cabin-creek-trail-loop',
    'tilghman-bay-hundred-claiborne-tilghman-creek',
    'tilghman-bay-hundred-claiborne-wades-point-loop',
    'tilghman-bay-hundred-bayshore-lowes-wharf',
    'tilghman-bay-hundred-lowes-cabin-cove-loop',
    'tilghman-bay-hundred-pwec-front-creek-loop',
    'tilghman-bay-hundred-pwec-back-creek-loop',
    'tilghman-bay-hundred-black-walnut-cove-loop',
    'tilghman-bay-hundred-balls-creek-loop',
    'monie-bay-orange-trail-loop',
    'monie-bay-yellow-trail-loop',
    'monie-bay-white-marsh-gut-loop',
    'monie-bay-white-bay-point-loop',
    'fishing-bay-transquaking-river-loop',
    'fishing-bay-island-creek-out-and-back',
    'eastern-neck-island-water-trail-loop',
    'marshyhope-creek-federalsburg-town-trail',
    'ea-vaughn-taylors-landing-3-mile',
    'ea-vaughn-george-island-4-mile',
    'ea-vaughn-taylors-landing-6-mile',
    'corkers-creek-blackwater-canoe-trail',
    'nassawango-creek-red-house-pocomoke',
    'nassawango-creek-red-house-nassawango-road',
    'sinepuxent-bay-old-ferry-landing-loop',
    'sinepuxent-bay-bayside-drive-loop',
    'point-lookout-creek-water-trail',
    'point-lookout-lake-conoy-water-trail',
    'point-lookout-bay-point-water-trail',
    'mattawoman-creek-mattlingy-smallwood',
    'lower-potomac-purse-mallows-bay',
    'nanjemoy-creek-friendship-farm-park',
    'port-tobacco-river-chapel-point-port-tobacco',
    'calvert-kings-landing-cocktown-loop',
    'calvert-hallowing-point-caney-benedict',
    'calvert-nans-cove-rock-creek-loop',
    'calvert-jefferson-patterson-st-leonard-creek-loop',
    'calvert-solomons-island-patuxent-loop',
    'calvert-fishing-creek-kellams-loop',
    'wicomico-river-wicomico-shores-bushwood',
    'mcintosh-run-port-leonardtown-abells',
    'st-marys-river-great-mills-st-marys-city',
    'herring-creek-tall-timbers-loop',
    'piney-point-creek-lighthouse-loop',
    'st-inigoes-smith-creek-loop',
    'st-inigoes-jutland-creek-loop',
    'st-inigoes-kitts-point-loop',
    'smith-island-tylerton-ewell-back-route',
    'smith-island-tylerton-loop',
    'smith-island-ewell-loop',
    'smith-island-doctors-gut',
    'smith-island-jugglins-creek',
    'smith-island-fishing-creek',
    'smith-island-swan-island',
    'nanticoke-river-vienna-cherry-beach',
    'nanticoke-river-vienna-chicone-loop',
    'barren-creek-mardela-springs-loop',
    'nanticoke-river-wetipquin-tyaskin',
    'nanticoke-river-cedar-hill-nanticoke-harbor',
    'nanticoke-river-cove-road-roaring-point',
    'elk-river-rogues-harbor-loop',
    'northeast-river-north-east-beach-loop',
    'deer-creek-walters-benjamins',
    'deer-creek-rocks-ma-pa-portage',
    'susquehanna-river-lapidum-shuresville',
    'susquehanna-river-frank-hutchins-lapidum',
    'broad-creek-harford-public-landing-loop',
    'anacostia-river-bladensburg-anacostia-park',
    'bohemia-river-bridge-great-bohemia-loop',
    'cbec-marshy-creek-water-trail',
    'cbec-prospect-bay-water-trail',
    'potomac-river-shepherdstown-dargan',
    'potomac-river-williamsport-big-slackwater',
    'potomac-river-dam-four-shepherdstown',
    'potomac-river-taylors-snyders',
    'potomac-river-edwards-violettes',
    'potomac-river-brunswick-point-of-rocks',
    'potomac-river-big-slackwater-taylors',
    'potomac-river-point-of-rocks-monocacy',
    'potomac-river-monocacy-edwards',
  ];

  it('publishes the selected Maryland corridor inventory', () => {
    expect(marylandRoutes.map((route) => route.id)).toEqual(expectedIds);
    expect(publicRivers.filter((route) => expectedIds.includes(route.id)).map((route) => route.id)).toEqual(expectedIds);
  });

  it('keeps each route complete, gauged, and visibly sourced', () => {
    for (const route of marylandRoutes) {
      expect(route.state).toBe('Maryland');
      expect(route.putIn).toBeDefined();
      expect(route.takeOut).toBeDefined();
      expect(route.accessPoints?.length).toBeGreaterThanOrEqual(2);
      expect(['direct', 'proxy']).toContain(route.gaugeSource.kind);
      expect(route.gaugeSource.provider).toBe('usgs');
      expect(route.logistics).toBeDefined();
      expect(riverTripDetails[route.id]?.continuityStatus).toBe('verified');
      expect(getRoutePreviewPhoto(route)).not.toMatchObject({ isPlaceholder: true });
    }
  });

  it('preserves the Monocacy and Potomac safety boundaries', () => {
    const monocacy = marylandRoutes.filter((route) => route.riverId === 'monocacy-river');
    expect(monocacy.every((route) => route.profile.thresholdModel === 'minimum-only')).toBe(true);
    expect(monocacy.map((route) => route.profile.tooLow)).toEqual([2.1, 1.7, 1.7]);
    expect(monocacy.every((route) => route.safetyProfile?.hazards.includes('cold_water'))).toBe(true);

    const potomac = marylandRoutes.find((route) => route.id === 'potomac-river-oldtown-paw-paw');
    expect(potomac?.gaugeSource.siteId).toBe('01610000');
    expect(potomac?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['fast_rise', 'private_banks', 'mandatory_takeout']));
    expect(potomac?.logistics?.campingClassification).toBe('endpoint_campground');

    expect(marylandRoutes.find((route) => route.id === 'potomac-river-fifteen-mile-creek-hancock')?.gaugeSource.siteId).toBe('01613000');
    expect(marylandRoutes.find((route) => route.id === 'potomac-river-hancock-big-pool')?.safetyProfile?.hazards).toContain('dam');

    const williamsport = marylandRoutes.find((route) => route.id === 'potomac-river-big-pool-williamsport');
    expect(williamsport?.gaugeSource.siteId).toBe('01613000');
    expect(williamsport?.profile.tooLow).toBe(2.22);
    expect(williamsport?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['dam', 'mandatory_takeout', 'access_uncertain']));
    expect(williamsport?.accessPoints?.map((point) => point.id)).toEqual([
      'potomac-big-pool-fort-frederick-campground',
      'potomac-mccoys-ferry',
      'potomac-four-locks',
      'potomac-dam-five-portage',
      'potomac-williamsport-river-bottom',
    ]);

    const patapsco = marylandRoutes.find((route) => route.id === 'patapsco-river-woodstock-daniels');
    expect(patapsco?.gaugeSource.siteId).toBe('01589000');
    expect(patapsco?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['dam', 'access_uncertain', 'mandatory_takeout']));
    expect(patapsco?.profile.thresholdModel).toBe('minimum-only');

    const lowerPatapsco = marylandRoutes.find((route) => route.id === 'patapsco-river-orange-grove-avalon');
    expect(lowerPatapsco?.gaugeSource.siteId).toBe('01589000');
    expect(lowerPatapsco?.profile.tooLow).toBe(175);
    expect(lowerPatapsco?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'strainers', 'mandatory_takeout']));
    expect(lowerPatapsco?.accessPoints?.map((point) => point.id)).toEqual([
      'patapsco-orange-grove-swinging-bridge',
      'patapsco-avalon-glen-artney',
    ]);

    const antietam = marylandRoutes.find((route) => route.id === 'antietam-creek-md34-potomac');
    expect(antietam?.gaugeSource.siteId).toBe('01619500');
    expect(antietam?.profile.tooLow).toBe(2.8);
    expect(antietam?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['dam', 'private_banks', 'mandatory_takeout']));

    expect(marylandRoutes.find((route) => route.id === 'little-pipe-creek-union-bridge-double-pipe-park')?.gaugeSource.kind).toBe('proxy');
    expect(marylandRoutes.find((route) => route.id === 'big-pipe-creek-hapes-mill-double-pipe-park')?.profile.tooLow).toBe(0.84);
    expect(marylandRoutes.find((route) => route.id === 'catoctin-creek-catoctin-park-lander')?.gaugeSource.siteId).toBe('01637500');
    expect(marylandRoutes.find((route) => route.id === 'deer-creek-sandy-hook-md136')?.profile.tooLow).toBe(2.5);

    const gunpowderGorge = marylandRoutes.find((route) => route.id === 'gunpowder-falls-prettyboy-falls-road');
    expect(gunpowderGorge?.gaugeSource.siteId).toBe('01581920');
    expect(gunpowderGorge?.routeType).toBe('whitewater');
    expect(gunpowderGorge?.profile.tooLow).toBe(72.5);
    expect(gunpowderGorge?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['whitewater', 'cold_water', 'mandatory_takeout']));

    const gunpowderHereford = marylandRoutes.find((route) => route.id === 'gunpowder-falls-masemore-monkton');
    expect(gunpowderHereford?.gaugeSource.siteId).toBe('01581920');
    expect(gunpowderHereford?.profile.tooHigh).toBe(1230);
    expect(gunpowderHereford?.accessPoints?.map((point) => point.id)).toEqual([
      'gunpowder-masemore-road',
      'gunpowder-bunker-hill-road',
      'gunpowder-york-road',
      'gunpowder-big-falls-road',
      'gunpowder-blue-mount-road',
      'gunpowder-monkton-road',
    ]);

    const gunpowderGlencoe = marylandRoutes.find((route) => route.id === 'gunpowder-falls-monkton-phoenix');
    expect(gunpowderGlencoe?.gaugeSource.siteId).toBe('01582500');
    expect(gunpowderGlencoe?.profile.tooLow).toBe(105.49);
    expect(gunpowderGlencoe?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['private_banks', 'mandatory_takeout']));

    const conococheague = marylandRoutes.find((route) => route.id === 'conococheague-creek-kemps-mill-williamsport');
    expect(conococheague?.gaugeSource.siteId).toBe('01614500');
    expect(conococheague?.profile.tooLow).toBe(2);
    expect(conococheague?.profile.idealMax).toBe(6);
    expect(conococheague?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['dam', 'low_water', 'private_banks', 'mandatory_takeout']));

    const patuxent = marylandRoutes.filter((route) => route.riverId === 'patuxent-river-maryland');
    expect(patuxent).toHaveLength(5);
    expect(patuxent.every((route) => route.gaugeSource.siteId === '01594440')).toBe(true);
    expect(patuxent.every((route) => route.gaugeSource.kind === 'proxy')).toBe(true);
    expect(patuxent.every((route) => route.profile.thresholdModel === 'minimum-only')).toBe(true);
    expect(patuxent.every((route) => ['low_water', 'fast_rise', 'access_uncertain'].every((hazard) => route.safetyProfile?.hazards.includes(hazard as never)))).toBe(true);
    expect(marylandRoutes.find((route) => route.id === 'patuxent-river-jacksons-selbys-landing')?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(marylandRoutes.find((route) => route.id === 'patuxent-river-selbys-clyde-watson')?.logistics?.campingClassification).toBe('on_route_campsite');

    const pocomoke = marylandRoutes.filter((route) => route.riverId === 'pocomoke-river-maryland');
    expect(pocomoke).toHaveLength(3);
    expect(pocomoke.every((route) => route.gaugeSource.siteId === '01485000')).toBe(true);
    expect(pocomoke.every((route) => route.gaugeSource.kind === 'proxy')).toBe(true);
    expect(pocomoke.every((route) => route.profile.thresholdModel === 'minimum-only')).toBe(true);
    expect(pocomoke.every((route) => ['low_water', 'strainers', 'mandatory_takeout'].every((hazard) => route.safetyProfile?.hazards.includes(hazard as never)))).toBe(true);
    expect(marylandRoutes.find((route) => route.id === 'pocomoke-river-shad-milburn')?.logistics?.campingClassification).toBe('endpoint_campground');

    const northBranch = marylandRoutes.find((route) => route.id === 'north-branch-potomac-black-oak-fairgrounds');
    expect(northBranch?.gaugeSource.siteId).toBe('01598500');
    expect(northBranch?.gaugeSource.kind).toBe('proxy');
    expect(northBranch?.profile.tooLow).toBe(391);
    expect(northBranch?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['dam', 'strainers', 'mandatory_takeout']));

    const northBranchCumberland = marylandRoutes.filter((route) => route.id === 'north-branch-potomac-mason-spring-gap' || route.id === 'north-branch-potomac-spring-gap-oldtown');
    expect(northBranchCumberland).toHaveLength(2);
    expect(northBranchCumberland.every((route) => route.gaugeSource.siteId === '01603000')).toBe(true);
    expect(northBranchCumberland.every((route) => route.gaugeSource.kind === 'direct')).toBe(true);
    expect(northBranchCumberland.every((route) => route.profile.tooLow === 642 && route.profile.idealMax === 5600)).toBe(true);
    expect(northBranchCumberland.every((route) => route.safetyProfile?.hazards.includes('cold_water'))).toBe(true);

    const janes = marylandRoutes.filter((route) => route.riverId === 'janes-island-water-trails-maryland');
    expect(janes).toHaveLength(7);
    expect(janes.every((route) => route.gaugeSource.siteId === '01485755')).toBe(true);
    expect(janes.every((route) => route.gaugeSource.kind === 'proxy')).toBe(true);
    expect(janes.every((route) => route.profile.thresholdModel === 'minimum-only')).toBe(true);
    expect(janes.every((route) => route.accessPoints?.length === 2)).toBe(true);
    expect(janes.every((route) => route.safetyProfile?.hazards.includes('access_uncertain'))).toBe(true);
    expect(marylandRoutes.find((route) => route.id === 'janes-island-green-trail-loop')?.profile.difficulty).toBe('moderate');
    expect(marylandRoutes.find((route) => route.id === 'janes-island-brown-trail-loop')?.logistics?.campingClassification).toBe('on_route_campsite');

    const blackwater = marylandRoutes.filter((route) => route.riverId === 'blackwater-river-maryland');
    expect(blackwater).toHaveLength(3);
    expect(blackwater.every((route) => route.gaugeSource.siteId === '01490120')).toBe(true);
    expect(blackwater.every((route) => route.gaugeSource.kind === 'proxy')).toBe(true);
    expect(blackwater.every((route) => route.profile.thresholdModel === 'minimum-only')).toBe(true);
    expect(blackwater.every((route) => route.safetyProfile?.hazards.includes('mandatory_takeout'))).toBe(true);
    expect(marylandRoutes.find((route) => route.id === 'blackwater-river-purple-trail-shorters')?.logistics?.campingClassification).toBe('none');
  });

  it('models the Dam 4 to Shepherdstown parent route and Taylors to Snyders option as one access-chain family', () => {
    const corridor = corridorForSlug('potomac-river-dam-four-shepherdstown');
    expect(corridor).toMatchObject({
      corridorId: 'md-middle-potomac-dam-four-shepherdstown',
      canonicalSlug: 'potomac-river-dam-four-shepherdstown',
      continuityStatus: 'verified',
    });
    expect(corridor?.slugs).toEqual(expect.arrayContaining([
      'potomac-river-dam-four-shepherdstown',
      'potomac-river-taylors-snyders',
    ]));
    expect(corridor?.segmentEdges).toEqual([
      { fromId: 'potomac-dam-four-downstream', toId: 'potomac-taylors-landing', status: 'verified' },
      { fromId: 'potomac-taylors-landing', toId: 'potomac-snyders-landing', status: 'verified' },
      { fromId: 'potomac-snyders-landing', toId: 'potomac-shepherdstown-princess', status: 'verified' },
    ]);

    const parent = marylandRoutes.find((route) => route.id === 'potomac-river-dam-four-shepherdstown');
    const child = marylandRoutes.find((route) => route.id === 'potomac-river-taylors-snyders');
    expect(parent).toBeDefined();
    expect(child).toBeDefined();
    expect(riverTripDetails[parent!.id]).toBeDefined();
    expect(riverTripDetails[child!.id]).toBeDefined();

    expect(getRiverBySlug(parent!.slug)).toMatchObject({
      corridorId: 'md-middle-potomac-dam-four-shepherdstown',
      segmentEdges: corridor?.segmentEdges,
    });
    expect(getRiverBySlug(child!.slug)).toMatchObject({
      corridorId: 'md-middle-potomac-dam-four-shepherdstown',
      continuityStatus: 'verified',
    });
  });
});
