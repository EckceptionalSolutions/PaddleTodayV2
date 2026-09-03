import { describe, expect, it } from 'vitest';
import { getRoutePreviewPhoto } from '../data/route-gallery';
import { publicRivers } from '../data/rivers';
import { newYorkRoutes } from '../data/routes/new-york';

describe('New York strategic expansion', () => {
  it('publishes more than one bounded New York route', () => {
    expect(newYorkRoutes.length).toBe(302);
    expect(newYorkRoutes.map((route) => route.id)).toEqual([
      'susquehanna-river-sidney-bainbridge',
      'grass-river-woods-bridge-route47',
      'rondout-creek-high-falls-rosendale',
      'indian-river-hall-road-rossie-falls-out-and-back',
      'oswegatchie-east-branch-flat-rock-edwards',
      'lake-champlain-rouses-point-great-chazy',
      'great-chazy-river-point-au-roche',
      'st-regis-river-winthrop-route-92',
      'chautauqua-lake-chadakoin-celoron-mccrea',
      'oriskany-creek-clinton',
      'west-canada-creek-partridge-hill-route-28-overlook',
      'esopus-creek-phoenicia-boiceville',
      'wappinger-creek-cady-greenvale',
      'erie-canal-fairport-bushnells-basin',
      'schoharie-creek-north-blenheim-middleburgh',
      'schoharie-creek-middleburgh-central-bridge',
      'schoharie-creek-central-bridge-esperance',
      'jordan-river-lassiter-carry-falls',
      'anthony-kill-round-lake-mechanicville',
      'cohocton-river-bath-campbell',
      'hudson-river-corning-preserve-hudson-shores',
      'ganargua-creek-swifts-landing-norsen-bridge',
      'irondequoit-creek-ellison-lasalles',
      'onondaga-creek-meachem-inner-harbor',
      'cayuga-inlet-treman-cass-park',
      'oak-orchard-creek-route-63-knowlesville',
      'oak-orchard-creek-medina-lake-ontario',
      'schroon-river-warrensburg-thurman-station',
      'delaware-river-hancock-callicoon',
      'buffalo-river-harlem-ohio-street',
      'oswego-canal-lock-island-indian-point',
      'oswego-canal-indian-point-lock-o8',
      'cayuga-seneca-canal-oak-island-locks-cs2-3',
      'old-erie-canal-cedar-bay-chittenango-landing',
      'erie-canal-mays-point-montezuma-aqueduct',
      'ramapo-river-tuxedo-pierson-mapes',
      'croton-river-dam-echo-point',
      'boquet-river-willsboro-noblewood',
      'hoosic-river-buskirk-johnsonville',
    'hoosic-river-powerhouse-lock-4',
      'susquehanna-river-kirkwood-sandy-beach',
      'hudson-river-indian-confluence-north-river',
      'hudson-river-newcomb-indian-confluence',
      'hudson-river-north-river-riparius',
      'mohawk-river-herkimer-little-falls',
      'saranac-river-second-pond-lake-flower',
      'ausable-west-branch-wilmington-ausable-forks',
      'ausable-east-branch-keene-upper-jay',
      'ausable-east-branch-hulls-falls-keene',
      'raquette-river-axton-crusher',
      'raquette-river-dead-creek-jamestown',
      'schroon-river-starbuckville-riverbank',
      'east-kill-beaches-corners-jewett-center',
      'east-canada-creek-dolgeville-route-5',
      'west-canada-creek-middleville-kast-bridge',
      'st-regis-middle-branch-st-regis-falls-fort-jackson',
      'south-sandy-creek-route-95-route-11',
      'susquehanna-river-cooperstown-phoenix-mills',
      'susquehanna-river-crumhorn-goodyear-lake',
      'susquehanna-river-william-hill-grippen',
      'susquehanna-river-apalachin-hickories',
      'chemung-river-kinsella-cohocton-street',
      'chemung-river-cohocton-street-bottchers',
      'chemung-river-toll-bridge-white-wagon',
      'chenango-river-greene-chenango-forks',
      'unadilla-river-rockdale-sidney',
      'west-branch-delaware-river-hale-eddy-balls-eddy',
      'west-branch-delaware-river-delhi-walton',
      'east-branch-delaware-river-fishs-eddy-hancock',
      'delaware-river-callicoon-narrowsburg',
      'delaware-river-port-jervis-milford',
      'cattaraugus-creek-gowanda-sunset-bay',
      'cattaraugus-creek-zoar-bridge-gowanda',
      'oswegatchie-river-inlet-high-falls',
      'tioughnioga-river-cortland-marathon',
      'schoharie-creek-esperance-burtonsville',
      'genesee-river-avon-scottsville',
      'wallkill-river-popp-gardiner',
      'wallkill-river-gardiner-new-paltz',
      'batten-kill-battenville-clarks-mills',
      'esopus-creek-mount-marion-saugerties',
      'salmon-river-altmar-pineville',
      'black-river-lyons-falls-carthage',
      'beaver-kill-cooks-falls-peakville',
      'genesee-river-mount-morris-avon',
      'grass-river-pyrites-canton',
      'hudson-river-hadley-lake-luzerne',
      'sacandaga-river-hope-northville',
      'canandaigua-outlet-littleville-manchester',
      'neversink-river-oakland-valley-us-209',
      'allens-creek-corbett-glen',
      'caroga-creek-ephratah-route-5',
      'chittenango-creek-cazenovia-falls',
      'honeoye-creek-fishell-out-and-back',
      'oatka-creek-mumford-scottsville',
      'champlain-canal-moreau-lock-c5',
      'champlain-canal-lock-c5-stillwater',
      'genesee-river-waterways-center-corn-hill',
      'erie-canal-brockport-holley',
      'buffalo-river-canalside-red-jacket',
      'erie-canal-ransom-creek-lockport',
      'champlain-canal-whitehall-fort-ann',
      'champlain-canal-fort-ann-fort-edward',
      'champlain-canal-stillwater-mechanicville',
      'champlain-canal-mechanicville-waterford',
      'erie-canal-waterford-flight',
      'erie-canal-lock-e7-waterford-flight',
      'erie-canal-tonawanda-amherst',
      'erie-canal-amherst-lockport',
      'erie-canal-lockport-gasport',
      'erie-canal-gasport-medina',
      'erie-canal-medina-albion',
      'erie-canal-albion-san-souci',
      'erie-canal-brockport-spencerport',
      'erie-canal-spencerport-genesee-river',
      'erie-canal-genesee-river-bushnells-basin',
      'erie-canal-bushnells-basin-macedon',
      'erie-canal-macedon-newark',
      'erie-canal-newark-lyons',
      'erie-canal-lyons-seneca-county-line',
      'erie-canal-montezuma-nwr',
      'erie-canal-seneca-river-mentz-brutus',
      'erie-canal-baldwinsville-three-rivers',
      'erie-canal-three-rivers-brewerton',
      'erie-canal-sylvan-beach',
      'erie-canal-rome-marcy',
      'erie-canal-lock-e20-frankfort',
      'erie-canal-frankfort-lock-e18',
      'erie-canal-german-flatts-st-johnsville',
      'erie-canal-st-johnsville-canajoharie',
      'erie-canal-canajoharie-fultonville',
      'erie-canal-fultonville-amsterdam',
      'erie-canal-amsterdam-rotterdam-junction',
      'erie-canal-rotterdam-junction-freemans-bridge',
      'erie-canal-freemans-bridge-lock-e7',
      'erie-canal-lock-e7-waterford-flight-south',
      'waterford-hudson-confluence-lansingburgh',
      'glens-falls-feeder-canal-queensbury-hudson-falls',
      'carmans-river-montauk-beaverdam',
      'nissequogue-river-paul-given-state-park',
      'peconic-river-river-road-edwards-avenue',
      'peconic-river-forge-pond-upper-mills',
      'peconic-river-upper-mills-weeping-willow',
      'peconic-river-weeping-willow-indian-island',
      'south-branch-grass-river-spruce-first-brook',
      'middle-branch-grass-river-lampson-falls',
      'east-branch-st-regis-river-vanderwalker-everton-falls',
      'middle-branch-st-regis-river-indian-rock-four-mile',
      'grass-river-lampson-falls-downerville',
      'south-branch-grass-river-twin-falls-degrasse',
      'north-branch-grass-river-clare-downerville',
      'fall-creek-route-13-flat-rock',
      'salmon-river-route-2a-black-hole',
      'grass-river-downerville-russell',
      'south-branch-moose-river-rock-dam-mckeever',
      'moose-river-mckeever-iron-bridge',
      'salmon-creek-ludlowville-cayuga-lake',
      'raquette-river-helenbrooks-hole',
      'ausable-river-ausable-chasm-us9',
      'sacandaga-river-stewarts-bridge-hudson',
      'south-branch-west-canada-creek-fayle-nobleboro',
      'west-branch-sacandaga-chub-lake-shaker-place',
      'west-branch-sacandaga-whitehouse-campsite',
      'east-branch-sacandaga-griffin-gorge',
      'cedar-river-pelon-outer-gooley',
      'indian-river-abanakee-dam-outer-gooley',
      'miami-river-lewey-lake-out-and-back',
      'jessup-river-route-30-indian-lake',
      'black-creek-churchville-black-creek-park',
      'connetquot-river-great-river-heckscher',
      'catatonk-creek-candor-owego',
      'canisteo-river-canisteo-addison',
      'cazenovia-creek-west-falls-mill-road',
      'keuka-outlet-penn-yan-dresden',
      'black-river-watertown-dexter-canyon',
      'flint-creek-orleans-phelps',
      'kinderhook-creek-east-nassau-valatie',
      'kayaderosseras-creek-grays-crossing-driscoll-road',
      'kinderhook-creek-stuyvesant-falls-stockport',
      'hudson-river-schodack-island-catskill',
      'ramshorn-livingston-sanctuary-dutchmans',
      'independence-river-bailey-donnattsburg',
      'bog-river-lower-dam-bog-river-falls',
      'bog-river-flow-lower-dam-lows-lake',
      'oswegatchie-east-branch-inlet-wanakena',
      'saranac-river-union-falls-casey-road',
      'butternut-creek-jamesville-route-481',
      'chittenango-creek-falls-chittenango',
      'ellicott-creek-park-eastern-park',
      'beaver-river-canoe-route-moshier-high-falls',
      'nine-mile-creek-munro-pumphouse',
      'raquette-river-forked-lake-deerland',
      'genesee-river-lee-landing-st-helena',
      'st-regis-middle-branch-fort-jackson-buckton',
      'wallkill-river-new-paltz-rosendale',
      'batten-kill-eagleville-battenville',
      'roeliff-jansen-kill-roe-jan-park-out-and-back',
      'owego-creek-lower-owego-out-and-back',
      'seneca-river-howland-island-loop',
      'genesee-river-turning-point-port-of-rochester',
      'oatka-creek-leroy-mumford',
      'hudson-river-tivoli-north-bay-loop',
      'rondout-creek-kingston-eddyville-loop',
      'otselic-river-willet-landers-corners',
      'chenango-river-north-norwich-greene',
      'fishkill-creek-jean-van-pelt-sarah-taylor',
      'catskill-creek-kiwanis-dutchmans',
      'tioughnioga-river-itaska-chenango-forks',
      'south-sandy-creek-lakeview-outlet',
      'schoharie-creek-burtonsville-fort-hunter',
      'hudson-river-riparius-glen',
      'black-river-forestport-hawkinsville',
      'black-river-hawkinsville-norton-road',
      'raquette-river-piercefield-parmenter',
      'oswegatchie-river-heuvelton-ogdensburg',
      'raquette-river-raymondville-massena-springs',
      'east-canada-creek-powley-place-out-and-back',
      'sacandaga-river-speculator-duck-bay-loop',
      'kunjamuk-river-speculator-elm-lake-out-and-back',
      'marion-river-blue-mountain-raquette-lake',
      'dead-creek-route-3-headwaters-out-and-back',
      'osgood-river-osgood-pond-out-and-back',
      'north-branch-saranac-river-north-branch-road-out-and-back',
      'grass-river-degrasse-pyrites',
      'boquet-river-route-73-split-rock',
      'little-river-youngs-streeter-lake-road',
      'susquehanna-river-west-oneonta-otego',
      'susquehanna-river-emmons-west-oneonta',
      'susquehanna-river-otego-unadilla',
      'susquehanna-river-unadilla-sidney',
      'piseco-outlet-route-10-west-branch-out-and-back',
      'south-branch-black-river-south-lake-out-and-back',
      'mongaup-river-rio-powerhouse-delaware',
      'saranac-river-kent-falls-military-turnpike',
      'saranac-river-military-turnpike-imperial-mill',
      'saranac-river-imperial-mill-lake-champlain',
      'east-branch-delaware-river-downsville-shinhopple',
      'boquet-river-beaver-meadow-northway',
      'boquet-river-northway-boquet',
      'chenango-river-sherburne-north-norwich',
      'salmon-river-pineville-compactor',
      'west-canada-creek-route-28-middleville',
      'susquehanna-river-colliersville-emmons',
      'unadilla-river-new-berlin-mount-upton',
      'unadilla-river-guilford-rockdale',
      'west-river-marsh-sunnyside-out-and-back',
      'chemung-river-elmira-chemung',
      'susquehanna-river-bainbridge-afton',
      'susquehanna-river-afton-nineveh',
      'chenango-river-chenango-forks-port-crane',
      'chenango-river-port-crane-chenango-bridge',
      'chenango-river-chenango-bridge-port-dickinson',
      'genesee-river-scottsville-genesee-valley-park',
      'tioga-river-lindley-mulholland',
      'otselic-river-landers-upper-lisle',
      'fish-creek-westdale-camden',
      'tioughnioga-river-marathon-whitney-point',
      'eighteenmile-creek-burt-newfane',
      'saranac-river-moose-pond-permanent-rapids',
      'saranac-river-saranac-lake-moose-pond-footbridge',
      'bronx-river-219th-soundview',
      'cohocton-river-campbell-kinsella',
      'cedar-river-flow-cedar-river-out-and-back',
      'la-chute-river-bicentennial-fort-ticonderoga',
      'fishing-brook-pickwickett-county-line-flow',
      'moose-river-nelson-lake-out-and-back',
      'genesee-river-petten-lower-falls-out-and-back',
      'delaware-river-hancock-lordville',
      'delaware-river-lordville-long-eddy',
      'wallkill-river-walden-popp',
      'batten-kill-greenwich-schuylerville',
      'allegheny-river-allegany-olean',
      'allegheny-river-olean-portville',
      'mohawk-river-lock-9-freemans-bridge',
      'mohawk-river-freemans-bridge-lock-7',
      'west-branch-delaware-river-airport-hale-eddy',
      'delaware-river-balls-eddy-hancock',
      'st-lawrence-river-louisville-massena',
      'niagara-river-lewiston-fort-niagara',
      'st-regis-middle-branch-route-458-st-regis-falls',
      'west-branch-st-regis-five-mile-hand-launches',
      'bog-river-lows-oswegatchie-inlet',
      'sangerfield-river-nine-mile-park-out-and-back',
      'fish-creek-wma-route-184-pope-mills',
      'ausable-west-branch-adirondak-loj-route-73',
      'ausable-west-branch-monument-high-falls',
      'hudson-river-thurman-station-hadley',
      'hudson-river-spier-falls-out-and-back',
      'cazenovia-creek-mill-road-cazenovia-park',
      'cazenovia-creek-cazenovia-park-thomas-higgins',
      'west-branch-oswegatchie-jerden-kimballs',
      'schroon-river-schroon-falls-schroon-lake',
      'schroon-river-south-horicon-starbuckville',
      'cobleskill-creek-warnerville-central-bridge',
      'nine-mile-creek-pumphouse-onondaga-outlet',
      'mattituck-creek-dec-waterway-access-route-48',
      'old-place-creek-gulf-avenue-arthur-kill-out-and-back',
      'lemon-creek-bayview-raritan-bay-out-and-back',
      'braddock-bay-hand-launch-lake-ontario-marsh-out-and-back',
      'hudson-river-fish-hatchery-thurman-station',
      'balsam-pond-carry-south-branch-grass-river',
      'catharine-creek-wma-marsh-connector',
    ]);
  });

  it('publishes the two adjacent Allegheny River public-launch floats with direct gauge context', () => {
    for (const [id, start, finish] of [
      ['allegheny-river-allegany-olean', 'Allegany River Park', 'Olean municipal'],
      ['allegheny-river-olean-portville', 'Olean municipal', 'Linn Launch'],
    ] as const) {
      const route = newYorkRoutes.find((candidate) => candidate.id === id);

      expect(route?.riverId).toBe('allegheny-river');
      expect(route?.routeType).toBe('recreational');
      expect(route?.gaugeSource.kind).toBe('direct');
      expect(route?.gaugeSource.siteId).toBe('03010820');
      expect(route?.scoreEligibility).toBe('planning');
      expect(route?.profile.thresholdModel).toBe('minimum-only');
      expect(route?.profile.idealMin).toBeUndefined();
      expect(route?.accessPoints).toHaveLength(2);
      expect(route?.accessPoints?.[0]?.name).toContain(start);
      expect(route?.accessPoints?.[1]?.name).toContain(finish);
      expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'private_banks', 'urban_water_quality']));
      expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
      expect(route?.evidenceNotes.some((item) => item.label === 'Direct live gauge')).toBe(true);
      expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
      expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
    }
  });

  it('publishes the Schenectady Mohawk public-launch sections with direct gauge context', () => {
    for (const [id, start, finish, gauge] of [
      ['mohawk-river-lock-9-freemans-bridge', 'Lock 9', "Freeman's Bridge", '01354330'],
      ['mohawk-river-freemans-bridge-lock-7', "Freeman's Bridge", 'Lock 7', '01354500'],
    ] as const) {
      const route = newYorkRoutes.find((candidate) => candidate.id === id);

      expect(route?.riverId).toBe('mohawk-river');
      expect(route?.routeType).toBe('recreational');
      expect(route?.gaugeSource.kind).toBe('direct');
      expect(route?.gaugeSource.siteId).toBe(gauge);
      expect(route?.scoreEligibility).toBe('planning');
      expect(route?.profile.thresholdModel).toBe('minimum-only');
      expect(route?.profile.idealMin).toBeUndefined();
      expect(route?.accessPoints).toHaveLength(2);
      expect(route?.accessPoints?.[0]?.name).toContain(start);
      expect(route?.accessPoints?.[1]?.name).toContain(finish);
      expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['dam', 'mandatory_takeout', 'urban_water_quality']));
      expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
      expect(route?.evidenceNotes.some((item) => item.label === 'Direct live gauge')).toBe(true);
      expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
      expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
    }
  });

  it('publishes the Deposit to Hale Eddy West Branch Delaware tailwater section', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'west-branch-delaware-river-airport-hale-eddy');

    expect(route?.riverId).toBe('west-branch-delaware-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01426500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(3);
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Airport Road');
    expect(route?.accessPoints?.[2]?.name).toContain('Hale Eddy');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'dam_release', 'strainers', 'cold_water']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct live gauge')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route-specific flow guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Balls Eddy to Hancock Upper Delaware connector', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'delaware-river-balls-eddy-hancock');

    expect(route?.riverId).toBe('delaware-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01427000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Balls Eddy');
    expect(route?.accessPoints?.[1]?.name).toContain('Hancock');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'dam_release', 'strainers', 'private_banks']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct live gauge')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route-specific flow guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Louisville to Massena St. Lawrence open-water paddle', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'st-lawrence-river-louisville-massena');

    expect(route?.riverId).toBe('st-lawrence-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04264331');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Wilson Hill');
    expect(route?.accessPoints?.[1]?.name).toContain('Massena');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'dam_release', 'urban_water_quality', 'cold_water']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Same-river proxy gauge')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route-specific flow and weather guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Lewiston to Fort Niagara lower Niagara open-water paddle', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'niagara-river-lewiston-fort-niagara');

    expect(route?.riverId).toBe('niagara-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04219501');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Lewiston Landing');
    expect(route?.accessPoints?.[1]?.name).toContain('Youngstown');
    expect(route?.accessPoints?.[2]?.name).toContain('Fort Niagara');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['dam_release', 'urban_water_quality', 'cold_water', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct live gauge')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route-specific flow and release guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Route 458 to St. Regis Falls Middle Branch whitewater reach', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'st-regis-middle-branch-route-458-st-regis-falls');

    expect(route?.riverId).toBe('st-regis-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04268800');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Santa Clara Flow');
    expect(route?.accessPoints?.[1]?.name).toContain('St. Regis Falls');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['whitewater', 'dam', 'dam_release', 'cold_water', 'access_uncertain']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Named whitewater corridor')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public upstream access')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Same-watershed proxy gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the seasonal Five Mile West Branch St. Regis hand-launch corridor', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'west-branch-st-regis-five-mile-hand-launches');

    expect(route?.riverId).toBe('st-regis-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04268800');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[0]?.name).toContain('Area #4');
    expect(route?.accessPoints?.[1]?.name).toContain('Area #3');
    expect(route?.accessPoints?.[3]?.name).toContain('Area #1');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'cold_water', 'remote', 'access_uncertain']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route-specific flow and access guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Lows Lake to Oswegatchie Inlet wilderness traverse', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'bog-river-lows-oswegatchie-inlet');

    expect(route?.riverId).toBe('oswegatchie-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04262000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Lows Lower Dam');
    expect(route?.accessPoints?.[1]?.name).toContain('Lows Lake');
    expect(route?.accessPoints?.[2]?.name).toContain('Oswegatchie River Canoe Carry');
    expect(route?.accessPoints?.[4]?.name).toContain('Inlet Road');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'whitewater', 'cold_water', 'remote', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route-specific carry and water guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Saranac Lake to Moose Pond Footbridge moving-water section with managed-access and camping posture', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'saranac-river-saranac-lake-moose-pond-footbridge');

    expect(route?.riverId).toBe('saranac-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04272512');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Saranac Lake Hand Launch');
    expect(route?.accessPoints?.[1]?.name).toContain('Moose Pond Road Bridge');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('cold_water');
    expect(route?.safetyProfile?.hazards).toContain('access_uncertain');
    expect(route?.statusText).toContain('five-mile');
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint access')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Tioga Lindley to Mulholland gap with direct levels and public launch evidence', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'tioga-river-lindley-mulholland');

    expect(route?.riverId).toBe('tioga-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01520500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.idealMin).toBe(4);
    expect(route?.profile.idealMax).toBe(7);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Lindley Road');
    expect(route?.accessPoints?.[1]?.name).toContain('Mulholland Road');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.statusText).toContain('4–7 ft');
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct live gauge')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint access')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Otselic Landers Corners to Upper Lisle extension with current access use', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'otselic-river-landers-upper-lisle');

    expect(route?.riverId).toBe('otselic-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01510000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Landers Corners');
    expect(route?.accessPoints?.[1]?.name).toContain('Upper Lisle');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Current Upper Lisle use')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct live gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Westdale to Camden Fish Creek section with guarded proxy conditions', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'fish-creek-westdale-camden');

    expect(route?.riverId).toBe('fish-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04242640');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Westdale');
    expect(route?.accessPoints?.[1]?.name).toContain('Route 69');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Current local paddling use')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Same-river proxy gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Tioughnioga Marathon to Whitney Point gap with direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'tioughnioga-river-marathon-whitney-point');

    expect(route?.riverId).toBe('tioughnioga-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01509305');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Marathon');
    expect(route?.accessPoints?.[1]?.name).toContain('Route 206');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public downstream access')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct live gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Eighteenmile Creek Burt to Newfane Marina route with regulated direct context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'eighteenmile-creek-burt-newfane');

    expect(route?.riverId).toBe('eighteenmile-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04219768');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Fisherman');
    expect(route?.accessPoints?.[1]?.name).toContain('Newfane Marina');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct live gauge')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Conditional upstream water access')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Saranac Moose Pond to Permanent Rapids boundary with proxy gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'saranac-river-moose-pond-permanent-rapids');

    expect(route?.riverId).toBe('saranac-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04273500');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.putIn.name).toContain('Moose Pond Road Bridge');
    expect(route?.takeOut.name).toContain('Permanent Rapids');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['cold_water', 'fast_rise', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((note) => note.label === 'Current NFCT rapid and carry guidance')).toBe(true);
    expect(route?.evidenceNotes.some((note) => note.label === 'Approved same-river image')).toBe(true);
    expect(publicRivers.some((river) => river.slug === route?.slug)).toBe(true);
  });

  it('publishes two distinct upper Boquet Lake Placid routes with guarded access', () => {
    for (const [id, classLabel, startName, endName] of [
      ['boquet-river-beaver-meadow-northway', 'Class II–III', 'Beaver Meadow Brook', 'Northway'],
      ['boquet-river-northway-boquet', 'Class II–IV', 'Northway', 'Boquet'],
    ] as const) {
      const route = newYorkRoutes.find((candidate) => candidate.id === id);

      expect(route?.riverId).toBe('boquet-river');
      expect(route?.routeType).toBe('whitewater');
      expect(route?.gaugeSource.kind).toBe('proxy');
      expect(route?.gaugeSource.siteId).toBe('04276500');
      expect(route?.scoreEligibility).toBe('planning');
      expect(route?.profile.thresholdModel).toBe('minimum-only');
      expect(route?.profile.idealMin).toBeUndefined();
      expect(route?.accessPoints).toHaveLength(2);
      expect(route?.accessPoints?.[0]?.name).toContain(startName);
      expect(route?.accessPoints?.[1]?.name).toContain(endName);
      expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route?.safetyProfile?.hazards).toContain('whitewater');
      expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
      expect(route?.statusText).toContain('Confirm');
      expect(route?.evidenceNotes.some((item) => item.label === 'Same-river proxy gauge')).toBe(true);
      expect(route?.evidenceNotes.some((item) => item.label === 'Route-source water entry')).toBe(true);
      expect(route?.evidenceNotes.some((item) => item.value.includes(classLabel))).toBe(true);
      expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
      expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
    }
  });

  it('publishes the upper Chenango Sherburne to North Norwich section with current public launches', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'chenango-river-sherburne-north-norwich');

    expect(newYorkRoutes.length).toBe(302);
    expect(route?.riverId).toBe('chenango-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01505000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Sherburne');
    expect(route?.accessPoints?.[1]?.name).toContain('North Norwich');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('access_uncertain');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.statusText).toContain('historical 2.95-ft');
    expect(route?.evidenceNotes.some((item) => item.label === 'Authoritative public water access')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct gauge')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route-specific water guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the lower Saranac Foot of Kent Falls to Military Turnpike segment with guarded access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'saranac-river-kent-falls-military-turnpike');

    expect(route?.riverId).toBe('saranac-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04273500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Kent Falls Powerhouse');
    expect(route?.accessPoints?.[1]?.name).toContain('Military Turnpike');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.statusText).toContain('Do not access or run Kent Falls');
    expect(route?.evidenceNotes.some((item) => item.label === 'Same-river proxy gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the lower Saranac Military Turnpike to Imperial Mill reach with portage controls', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'saranac-river-military-turnpike-imperial-mill');

    expect(route?.riverId).toBe('saranac-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04273500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBe(5);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Military Turnpike');
    expect(route?.accessPoints?.[1]?.name).toContain('Imperial Mill');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.statusText).toContain('carry the broken concrete dam');
    expect(route?.evidenceNotes.some((item) => item.label === 'Same-river proxy gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the lower Saranac Imperial Mill to Lake Champlain section with mouth safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'saranac-river-imperial-mill-lake-champlain');

    expect(route?.riverId).toBe('saranac-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04273500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBe(5);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Imperial Mill');
    expect(route?.accessPoints?.[1]?.name).toContain('Plattsburgh');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.statusText).toContain('never run the dam');
    expect(route?.evidenceNotes.some((item) => item.label === 'Public downstream water access')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Same-river proxy gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Downsville to Shinhopple East Branch itinerary with managed access safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'east-branch-delaware-river-downsville-shinhopple');

    expect(route?.riverId).toBe('east-branch-delaware-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01417000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain("Al's");
    expect(route?.accessPoints?.[1]?.name).toContain('Shinhopple');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('private_banks');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.statusText).toContain('Reserve or independently confirm');
    expect(route?.evidenceNotes.some((item) => item.label === 'Managed upstream access')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct live gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the West Oneonta to Otego Susquehanna itinerary with public DEC endpoints', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'susquehanna-river-west-oneonta-otego');

    expect(route?.riverId).toBe('susquehanna-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01498620');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('West Oneonta');
    expect(route?.accessPoints?.[1]?.name).toContain('Otego');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.evidenceNotes.some((item) => item.label === 'Historical same-river gauge context')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Unadilla to Sidney Susquehanna segment with direct flow context and a hard handoff', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'susquehanna-river-unadilla-sidney');

    expect(route?.riverId).toBe('susquehanna-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01500500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.idealMin).toBe(300);
    expect(route?.profile.idealMax).toBe(6000);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Unadilla');
    expect(route?.accessPoints?.[1]?.name).toContain('Sidney');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct flow guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the lower Catskill Creek tidal connector with public access and proxy safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'catskill-creek-kiwanis-dutchmans');

    expect(route?.riverId).toBe('catskill-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01362090');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Kiwanis');
    expect(route?.accessPoints?.[1]?.name).toContain('Dutchman');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Historical same-creek proxy gauge')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.value.includes('tide'))).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Letchworth Gorge reach with permit-only access and direct stage safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'genesee-river-lee-landing-st-helena');

    expect(route?.riverId).toBe('genesee-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04223000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.idealMin).toBe(9);
    expect(route?.profile.idealMax).toBe(14);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Lee');
    expect(route?.accessPoints?.[1]?.name).toContain('St. Helena');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.hazards).toContain('cold_water');
    expect(route?.logistics?.permits).toContain('permit');
    expect(route?.evidenceNotes.some((item) => item.label === 'Permit-only public access')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Fort Jackson to Buckton reach with proxy flow and guarded state-forest access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'st-regis-middle-branch-fort-jackson-buckton');

    expect(route?.riverId).toBe('middle-branch-st-regis-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04268800');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBe(450);
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Fort Jackson');
    expect(route?.accessPoints?.[1]?.name).toContain('Buckton');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('access_uncertain');
    expect(route?.logistics?.permits).toContain('PFD');
    expect(route?.evidenceNotes.some((item) => item.label === 'Public endpoint access context')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Forked Lake to Deerland reach with proxy flow and mandatory falls-portage safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'raquette-river-forked-lake-deerland');

    expect(route?.riverId).toBe('raquette-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04266500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBe(4.5);
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[0]?.name).toContain('Forked Lake');
    expect(route?.accessPoints?.[2]?.name).toContain('Buttermilk');
    expect(route?.accessPoints?.[3]?.name).toContain('Deerland');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.evidenceNotes.some((item) => item.label === 'Proxy flow guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the lower Nine Mile Creek corridor with historical proxy and access safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'nine-mile-creek-munro-pumphouse');

    expect(route?.riverId).toBe('nine-mile-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04240180');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Munro');
    expect(route?.accessPoints?.[1]?.name).toContain('Pumphouse');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('access_uncertain');
    expect(route?.evidenceNotes.some((item) => item.label === 'Historical same-creek station')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the lower Nine Mile Creek to Onondaga outlet continuation with seasonal access safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'nine-mile-creek-pumphouse-onondaga-outlet');

    expect(route?.riverId).toBe('nine-mile-creek');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04240200');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Pumphouse');
    expect(route?.accessPoints?.[1]?.name).toContain('outlet');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['urban_water_quality', 'mandatory_takeout', 'access_uncertain']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Historical same-creek station')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Mattituck Creek tidal inlet section with permit and tide safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'mattituck-creek-dec-waterway-access-route-48');

    expect(route?.riverId).toBe('mattituck-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01304500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('NYSDEC');
    expect(route?.accessPoints?.[1]?.name).toContain('Route 48');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.permits).toContain('permit');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['cold_water', 'urban_water_quality', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Tidal and dredged-channel context')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Old Place Creek tidal wetland out-and-back with launch and return safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'old-place-creek-gulf-avenue-arthur-kill-out-and-back');

    expect(route?.riverId).toBe('old-place-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01396060');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Gulf Avenue');
    expect(route?.accessPoints?.[1]?.name).toContain('same-launch');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.logistics?.camping).toContain('No camping');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['cold_water', 'urban_water_quality', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Route-specific tidal guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Lemon Creek high-tide wetland out-and-back with launch and return safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'lemon-creek-bayview-raritan-bay-out-and-back');

    expect(route?.riverId).toBe('lemon-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01396060');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Bayview');
    expect(route?.accessPoints?.[1]?.name).toContain('same-launch');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.logistics?.camping).toContain('No camping');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['cold_water', 'urban_water_quality', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Route-specific high-tide guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Braddock Bay hand-launch marsh out-and-back with lake-exposure safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'braddock-bay-hand-launch-lake-ontario-marsh-out-and-back');

    expect(route?.riverId).toBe('braddock-bay');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('0423205342');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Braddock Bay');
    expect(route?.accessPoints?.[1]?.name).toContain('same-launch');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.logistics?.camping).toContain('No on-route camping');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['cold_water', 'urban_water_quality', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Route-specific lake and marsh guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Saranac Union Falls-to-Casey Road reach with a guarded carry boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'saranac-river-union-falls-casey-road');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04273500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Union Falls');
    expect(route?.accessPoints?.[1]?.name).toContain('Casey Road');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the East Branch Oswegatchie Inlet-to-Wanakena whitewater reach with guarded access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'oswegatchie-east-branch-inlet-wanakena');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04262000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Inlet Road');
    expect(route?.accessPoints?.[1]?.name).toContain('Wanakena');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the East Branch Oswegatchie Flat Rock-to-Edwards reach with expert-only proxy safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'oswegatchie-east-branch-flat-rock-edwards');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04262500');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Route 58');
    expect(route?.accessPoints?.[1]?.name).toContain('New Street');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['whitewater', 'dam', 'strainers', 'mandatory_takeout']));
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.evidenceNotes.some((item) => item.label === 'Named expert whitewater corridor')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Indian River Hall Road day paddle with a private-falls boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'indian-river-hall-road-rossie-falls-out-and-back');

    expect(route?.riverId).toBe('indian-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04263350');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Hall Road');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'private_banks', 'mandatory_takeout']));
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.evidenceNotes.some((item) => item.label === 'Private downstream boundary')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Rondout High Falls-to-Rosendale whitewater reach with direct-gauge safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'rondout-creek-high-falls-rosendale');

    expect(route?.riverId).toBe('rondout-creek');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01367500');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('High Falls');
    expect(route?.accessPoints?.[1]?.name).toContain('Rosendale');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['whitewater', 'dam_release', 'mandatory_takeout']));
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.evidenceNotes.some((item) => item.label === 'Named moving-water corridor')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Grass River Woods Bridge-to-Route 47 reach with proxy-flow safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'grass-river-woods-bridge-route47');

    expect(route?.riverId).toBe('grass-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04262500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBe(400);
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Woods Bridge');
    expect(route?.accessPoints?.[1]?.name).toContain('Route 47');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['whitewater', 'strainers', 'mandatory_takeout']));
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.evidenceNotes.some((item) => item.label === 'Named moving-water corridor')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Flint Creek seasonal whitewater route with direct Phelps telemetry', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'flint-creek-orleans-phelps');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04235250');
    expect(route?.profile.idealMin).toBe(250);
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the East Nassau-to-Valatie Kinderhook route with guarded public access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'kinderhook-creek-east-nassau-valatie');

    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01361000');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.safetyProfile?.hazards).toContain('private_banks');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Kayaderosseras blueway segment with public access and historical-gauge safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'kayaderosseras-creek-grays-crossing-driscoll-road');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01330500');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Gray');
    expect(route?.accessPoints?.[1]?.name).toContain('Driscoll');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.sourceLinks.some((link) => link.url.includes('kayadeross.org/activities/paddling'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the lower Kinderhook route with official downstream access and portage safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'kinderhook-creek-stuyvesant-falls-stockport');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01361000');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.evidenceNotes.some((item) => item.label === 'Official downstream launch')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Schodack-to-Catskill tidal Hudson route with open-water safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'hudson-river-schodack-island-catskill');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01361450');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.safetyProfile?.hazards).toContain('cold_water');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.evidenceNotes.some((item) => item.label === 'Public downstream access')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the RamsHorn-to-Dutchman’s tidal connector with carry and proxy safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'ramshorn-livingston-sanctuary-dutchmans');

    expect(route?.riverId).toBe('ramshorn-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01361450');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.evidenceNotes.some((item) => item.label === 'Official public cartop launch')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Independence upper whitewater reach with direct gauge and access-anchor safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'independence-river-bailey-donnattsburg');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04256000');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.evidenceNotes.some((item) => item.label === 'Public-road access context')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Lows Lake wilderness canoe route with official launches, carry, and camping safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'bog-river-flow-lower-dam-lows-lake');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04266500');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('remote');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.evidenceNotes.some((item) => item.label === 'Official public hand launches')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the lower Bog River advanced reach with public endpoints and proxy-flow safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'bog-river-lower-dam-bog-river-falls');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01315500');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBe(4.5);
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Lower Dam');
    expect(route?.accessPoints?.[1]?.name).toContain('Bog River Falls');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.evidenceNotes.some((item) => item.label === 'Spring-only rapids and carries')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the North River-to-Riparius Hudson reach with public downstream access and guarded upstream staging', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'hudson-river-north-river-riparius');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01315500');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('North River');
    expect(route?.accessPoints?.[1]?.name).toContain('Riparius');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.evidenceNotes.some((item) => item.label === 'Public downstream hand launch')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Catatonk-to-Owego route with direct gauge and access evidence', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'catatonk-creek-candor-owego');

    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01514000');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.idealMin).toBe(2);
    expect(route?.profile.idealMax).toBe(5);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Canisteo-to-Addison route with direct gauge and intermediate bailouts', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'canisteo-river-canisteo-addison');

    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01525500');
    expect(route?.profile.idealMin).toBe(4);
    expect(route?.profile.idealMax).toBe(17);
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Cazenovia Creek route with direct gauge and public park context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'cazenovia-creek-west-falls-mill-road');

    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04215500');
    expect(route?.profile.idealMin).toBe(6.5);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the two lower Cazenovia Creek park-to-park sections with direct gauge and guarded access', () => {
    for (const [id, start, finish] of [
      ['cazenovia-creek-mill-road-cazenovia-park', 'Mill Road Park', 'Cazenovia Park'],
      ['cazenovia-creek-cazenovia-park-thomas-higgins', 'Cazenovia Park', 'Thomas F. Higgins'],
    ] as const) {
      const route = newYorkRoutes.find((candidate) => candidate.id === id);

      expect(route?.riverId).toBe('cazenovia-creek');
      expect(route?.gaugeSource.kind).toBe('direct');
      expect(route?.gaugeSource.siteId).toBe('04215500');
      expect(route?.profile.thresholdModel).toBe('minimum-only');
      expect(route?.profile.idealMin).toBeUndefined();
      expect(route?.scoreEligibility).toBe('planning');
      expect(route?.accessPoints).toHaveLength(2);
      expect(route?.accessPoints?.[0]?.name).toContain(start);
      expect(route?.accessPoints?.[1]?.name).toContain(finish);
      expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['urban_water_quality', 'access_uncertain', 'mandatory_takeout']));
      expect(route?.evidenceNotes.some((item) => item.label === 'Direct live gauge')).toBe(true);
      expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
      expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
    }
  });

  it('publishes the West Branch Oswegatchie bridge-to-Kimballs Mills paddle with guarded public access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'west-branch-oswegatchie-jerden-kimballs');

    expect(route?.riverId).toBe('oswegatchie-river');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04262500');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Jerden Falls Road');
    expect(route?.accessPoints?.[1]?.name).toContain('Kimballs Mills');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['remote', 'access_uncertain', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Same-river proxy gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the West Canada upper reach with public carry-in context and a labeled proxy gauge', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'west-canada-creek-partridge-hill-route-28-overlook');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01346000');
    expect(route?.profile.idealMin).toBe(300);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Keuka Outlet corridor with direct regulated gauge and mandatory carries', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'keuka-outlet-penn-yan-dresden');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04232482');
    expect(route?.profile.idealMin).toBe(250);
    expect(route?.profile.idealMax).toBe(1000);
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Black River canyon-to-Dexter boundary with direct flow guidance', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'black-river-watertown-dexter-canyon');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04260500');
    expect(route?.profile.idealMin).toBe(1000);
    expect(route?.profile.idealMax).toBe(6000);
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the bounded Sidney-to-Bainbridge route with complete trip metadata', () => {
    const route = newYorkRoutes[0];

    expect(route.id).toBe('susquehanna-river-sidney-bainbridge');
    expect(route.state).toBe('New York');
    expect(route.reach).toContain('Sidney');
    expect(route.profile.thresholdModel).toBe('two-sided');
    expect(route.profile.idealMin).toBe(3);
    expect(route.profile.idealMax).toBe(4);
    expect(route.profile.tooLow).toBe(2.1);
    expect(route.profile.tooHigh).toBe(8);
    expect(route.gaugeSource.siteId).toBe('01502632');
    expect(route.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route.accessPoints).toHaveLength(2);
    expect(route.sourceLinks.length).toBeGreaterThanOrEqual(5);
  });

  it('publishes the Buffalo Canalside to Red Jacket day trip with urban-water safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'buffalo-river-canalside-red-jacket');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('0421580305');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Canalside');
    expect(route?.accessPoints?.[4]?.name).toContain('Red Jacket');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('private_banks');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Ransom Creek to Lockport trip with lock and hydraulic safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-ransom-creek-lockport');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Ransom Creek');
    expect(route?.accessPoints?.[3]?.name).toContain('Locks E35');
    expect(route?.accessPoints?.[4]?.name).toContain('Nelson');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Whitehall to Fort Ann Champlain section with the C11 boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'champlain-canal-whitehall-fort-ann');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01327750');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Skenesborough');
    expect(route?.accessPoints?.[2]?.name).toContain('Lock C11');
    expect(route?.accessPoints?.[4]?.name).toContain('Fort Ann');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Fort Ann to Fort Edward Champlain section with C9/C8 controls', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'champlain-canal-fort-ann-fort-edward');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01327750');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(6);
    expect(route?.accessPoints?.[0]?.name).toContain('Fort Ann');
    expect(route?.accessPoints?.[2]?.name).toContain('Lock C9');
    expect(route?.accessPoints?.[4]?.name).toContain('Lock C8');
    expect(route?.accessPoints?.[5]?.name).toContain('Fort Edward');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Stillwater to Mechanicville Champlain section with C4/C3 controls', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'champlain-canal-stillwater-mechanicville');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01327750');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[0]?.name).toContain('Stillwater');
    expect(route?.accessPoints?.[1]?.name).toContain('Lock C4');
    expect(route?.accessPoints?.[2]?.name).toContain('Lock C3');
    expect(route?.accessPoints?.[3]?.name).toContain('Mechanicville');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Mechanicville to Waterford Champlain section with C2/C1 controls', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'champlain-canal-mechanicville-waterford');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01327750');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Mechanicville');
    expect(route?.accessPoints?.[1]?.name).toContain('Lock C2');
    expect(route?.accessPoints?.[2]?.name).toContain('Lighthouse');
    expect(route?.accessPoints?.[3]?.name).toContain('Lock C1');
    expect(route?.accessPoints?.[4]?.name).toContain('Waterford');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Waterford Flight with lock and guard-gate controls', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-waterford-flight');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01358000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(6);
    expect(route?.accessPoints?.[0]?.name).toContain('Alcathy');
    expect(route?.accessPoints?.[1]?.name).toContain('Guard Gate 2');
    expect(route?.accessPoints?.[2]?.name).toContain('Lock E6');
    expect(route?.accessPoints?.[5]?.name).toContain('Waterford Point');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Lock E7 to Waterford Flight section with dam and access controls', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-lock-e7-waterford-flight');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01358000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Lock E7');
    expect(route?.accessPoints?.[1]?.name).toContain('Vischer Ferry');
    expect(route?.accessPoints?.[2]?.name).toContain('Vandenburgh');
    expect(route?.accessPoints?.[4]?.name).toContain('Alcathy');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Tonawanda to Amherst Erie Canal section with public launch controls', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-tonawanda-amherst');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Tonawanda');
    expect(route?.accessPoints?.[1]?.name).toContain('Niagara');
    expect(route?.accessPoints?.[3]?.name).toContain('Botanical');
    expect(route?.accessPoints?.[4]?.name).toContain('Amherst');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Amherst to Lockport Erie Canal section with the Deep Cut boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-amherst-lockport');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[0]?.name).toContain('Amherst');
    expect(route?.accessPoints?.[1]?.name).toContain('Ransom');
    expect(route?.accessPoints?.[2]?.name).toContain('Guard Gate');
    expect(route?.accessPoints?.[3]?.name).toContain('Lockport');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Lockport to Gasport Erie Canal section with the Gasport ramp boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-lockport-gasport');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Lockport');
    expect(route?.accessPoints?.[1]?.name).toContain('Wide Waters');
    expect(route?.accessPoints?.[3]?.name).toContain('Guard Gate');
    expect(route?.accessPoints?.[4]?.name).toContain('Gasport');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Gasport to Medina Erie Canal section with the Bates Road boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-gasport-medina');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Gasport');
    expect(route?.accessPoints?.[1]?.name).toContain('Middleport');
    expect(route?.accessPoints?.[2]?.name).toContain('Canal Port');
    expect(route?.accessPoints?.[4]?.name).toContain('Bates');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Medina to Albion Erie Canal section with the Albion boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-medina-albion');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(6);
    expect(route?.accessPoints?.[0]?.name).toContain('Bates');
    expect(route?.accessPoints?.[2]?.name).toContain('Culvert');
    expect(route?.accessPoints?.[4]?.name).toContain('Guard Gate 14');
    expect(route?.accessPoints?.[5]?.name).toContain('Albion');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Albion to San Souci Erie Canal section with Holley camping context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-albion-san-souci');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Albion');
    expect(route?.accessPoints?.[2]?.name).toContain('Guard Gate 13');
    expect(route?.accessPoints?.[3]?.name).toContain('Holley');
    expect(route?.accessPoints?.[4]?.name).toContain('San Souci');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Brockport to Spencerport Erie Canal section with high-traffic safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-brockport-spencerport');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218700');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Brockport');
    expect(route?.accessPoints?.[1]?.name).toContain('Arrowhead');
    expect(route?.accessPoints?.[2]?.name).toContain('Adams Basin');
    expect(route?.accessPoints?.[4]?.name).toContain('Spencerport');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Spencerport to Genesee Erie Canal section with a hard river boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-spencerport-genesee-river');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218700');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[0]?.name).toContain('Heritage');
    expect(route?.accessPoints?.[1]?.name).toContain('Henpeck');
    expect(route?.accessPoints?.[2]?.name).toContain('junction');
    expect(route?.accessPoints?.[3]?.name).toContain('Genesee Waterways');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Genesee River to Bushnell’s Basin Erie Canal section with lock safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-genesee-river-bushnells-basin');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218700');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(8);
    expect(route?.accessPoints?.[1]?.name).toContain('Brighton');
    expect(route?.accessPoints?.[2]?.name).toContain('Lock E33');
    expect(route?.accessPoints?.[3]?.name).toContain('Lock 32');
    expect(route?.accessPoints?.[7]?.name).toContain('Bushnell');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Bushnell’s Basin to Macedon Erie Canal section with Fairport and Lock E30 safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-bushnells-basin-macedon');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218700');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(7);
    expect(route?.accessPoints?.[1]?.name).toContain('Ayrault');
    expect(route?.accessPoints?.[3]?.name).toContain('Fairport');
    expect(route?.accessPoints?.[6]?.name).toContain('Macedon');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Macedon to Newark Erie Canal section with portage and spillway safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-macedon-newark');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218700');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(8);
    expect(route?.accessPoints?.[2]?.name).toContain('Lock E29');
    expect(route?.accessPoints?.[4]?.name).toContain('Port of Palmyra');
    expect(route?.accessPoints?.[7]?.name).toContain('Widewaters');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Irondequoit Creek waterway with public park endpoints and historical gauge limits', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'irondequoit-creek-ellison-lasalles');

    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('easy');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04232030');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Ellison');
    expect(route?.accessPoints?.[1]?.name).toContain('LaSalle');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Onondaga Creek urban reach with current public launches and direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'onondaga-creek-meachem-inner-harbor');

    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04240010');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Meachem');
    expect(route?.accessPoints?.[1]?.name).toContain('Inner Harbor');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Cayuga Inlet waterfront reach with public launches and same-inlet gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'cayuga-inlet-treman-cass-park');

    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('easy');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04233255');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Treman');
    expect(route?.accessPoints?.[1]?.name).toContain('Cass Park');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Oak Orchard Creek refuge water trail with direct gauge context and obstruction warnings', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'oak-orchard-creek-route-63-knowlesville');

    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('0422018610');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Route 63');
    expect(route?.accessPoints?.[1]?.name).toContain('Knowlesville');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('remote');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Oak Orchard Creek Medina-to-lake corridor with public launch sequence and portage boundaries', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'oak-orchard-creek-medina-lake-ontario');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('0422018610');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Glenwood');
    expect(route?.accessPoints?.[1]?.name).toContain('Slade');
    expect(route?.accessPoints?.[2]?.name).toContain('State Marine Park');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Warrensburg-to-Thurman Schroon reach with current public access context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'schroon-river-warrensburg-thurman-station');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01317000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('River Street');
    expect(route?.accessPoints?.[1]?.name).toContain('Thurman Station');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Upper Delaware Hancock-to-Callicoon access corridor with NPS safety context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'delaware-river-hancock-callicoon');

    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01427510');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[0]?.name).toContain('Hancock');
    expect(route?.accessPoints?.[1]?.name).toContain('Lordville');
    expect(route?.accessPoints?.[2]?.name).toContain('Long Eddy');
    expect(route?.accessPoints?.[3]?.name).toContain('Callicoon');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Buffalo River urban canoe trail with public launches and direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'buffalo-river-harlem-ohio-street');

    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('0421560108');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Harlem');
    expect(route?.accessPoints?.[2]?.name).toContain('Ohio');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Phoenix-to-Fulton Oswego Canal day trip with lock and dam controls', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'oswego-canal-lock-island-indian-point');

    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04249000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Lock Island');
    expect(route?.accessPoints?.[2]?.name).toContain('Indian Point');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Fulton-to-Oswego Oswego Canal day trip with four-lock controls', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'oswego-canal-indian-point-lock-o8');

    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04249000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Indian Point');
    expect(route?.accessPoints?.[1]?.name).toContain('Lock O8');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Waterloo-to-Seneca Falls Cayuga-Seneca Canal day trip', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'cayuga-seneca-canal-oak-island-locks-cs2-3');

    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04232730');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Oak Island');
    expect(route?.accessPoints?.[2]?.name).toContain('CS2');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Cedar Bay to Chittenango Landing Old Erie Canal day trip', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'old-erie-canal-cedar-bay-chittenango-landing');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04244000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Cedar Bay');
    expect(route?.accessPoints?.[2]?.name).toContain('Chittenango Landing');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Fairport to Bushnell’s Basin Erie Canal day trip', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-fairport-bushnells-basin');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('easy');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218700');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Fairport');
    expect(route?.accessPoints?.[2]?.name).toContain('Bushnell');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Mays Point to Montezuma Richmond Aqueduct paddle', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-mays-point-montezuma-aqueduct');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Mays Point');
    expect(route?.accessPoints?.[1]?.name).toContain('Richmond Aqueduct');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Moreau to Lock C5 Champlain Canal day trip', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'champlain-canal-moreau-lock-c5');

    expect(route?.riverId).toBe('champlain-canal');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01327750');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[0]?.name).toContain('Moreau');
    expect(route?.accessPoints?.[3]?.name).toContain('Lock C5');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Lock C5 to Stillwater Champlain Canal day trip', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'champlain-canal-lock-c5-stillwater');

    expect(route?.riverId).toBe('champlain-canal');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01327750');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[0]?.name).toContain('Solomon');
    expect(route?.accessPoints?.[3]?.name).toContain('Stillwater');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Genesee Waterways Center to Corn Hill urban day trip', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'genesee-river-waterways-center-corn-hill');

    expect(route?.riverId).toBe('genesee-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04231600');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Waterways');
    expect(route?.accessPoints?.[2]?.name).toContain('Corn Hill');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the lower Genesee Turning Point to Port connector with public access safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'genesee-river-turning-point-port-of-rochester');

    expect(route?.riverId).toBe('genesee-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04231600');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Turning Point');
    expect(route?.accessPoints?.[1]?.name).toContain('Petten');
    expect(route?.accessPoints?.[2]?.name).toContain('Port of Rochester');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('cold_water');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Brockport to Holley Erie Canal day trip', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-brockport-holley');

    expect(route?.riverId).toBe('erie-canal');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('easy');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218700');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Brockport');
    expect(route?.accessPoints?.[1]?.name).toContain('Holley');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('cold_water');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Shortsville Run with release context and a complete access posture', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'canandaigua-outlet-littleville-manchester');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04235000');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
  });

  it('publishes the Neversink Oakland Valley reach with direct-gauge flow and access caveats', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'neversink-river-oakland-valley-us-209');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01437500');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(1200);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
  });

  it('publishes the Allens Creek Corbett’s Glen feature run with direct flow guidance', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'allens-creek-corbett-glen');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04232050');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(180);
    expect(route?.logistics?.distanceLabel).toContain('0.21');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('access_uncertain');
  });

  it('publishes Caroga Creek as a proxy-gauge whitewater corridor with county access context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'caroga-creek-ephratah-route-5');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01321000');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(5000);
    expect(route?.profile.tooHigh).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Ephratah');
    expect(route?.accessPoints?.[1]?.name).toContain('Route 5');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes Chittenango Creek as advanced direct-gauge whitewater with a mandatory pre-falls take-out', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'chittenango-creek-cazenovia-falls');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04244000');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.tooLow).toBe(150);
    expect(route?.profile.tooHigh).toBe(1500);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Lakeland');
    expect(route?.accessPoints?.[1]?.name).toContain('fishing access');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes Butternut Creek as a proxy-gauge whitewater corridor with route-specific access caveats', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'butternut-creek-jamesville-route-481');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04244000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(150);
    expect(route?.profile.tooHigh).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Jamesville Reservoir');
    expect(route?.accessPoints?.[1]?.name).toContain('Route 481');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the downstream Chittenango Creek section with direct gauge and current village launch context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'chittenango-creek-falls-chittenango');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04244000');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.tooLow).toBe(150);
    expect(route?.profile.tooHigh).toBe(1500);
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('lower bridge');
    expect(route?.accessPoints?.[2]?.name).toContain('Recognition Park');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Chautauqua Lake outlet to McCrea Point corridor with public launches and a proxy gauge', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'chautauqua-lake-chadakoin-celoron-mccrea');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('03014500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Lucille Ball');
    expect(route?.accessPoints?.[1]?.name).toContain('McCrea Point');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Ellicott Creek Park to Eastern Park blueway with seasonal access controls', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'ellicott-creek-park-eastern-park');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218518');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Ellicott Creek Park');
    expect(route?.accessPoints?.[1]?.name).toContain('Eastern Park');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Beaver River Canoe Route with regulated-flow proxy context and route camping', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'beaver-river-canoe-route-moshier-high-falls');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04258000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Moshier');
    expect(route?.accessPoints?.[1]?.name).toContain('High Falls');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('remote');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the lower Oatka Creek corridor with direct gauge and public park access context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'oatka-creek-mumford-scottsville');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04230500');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Mumford');
    expect(route?.accessPoints?.[1]?.name).toContain('Canawaugus');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Le Roy to Mumford Oatka connector with a named public finish and mandatory falls portage', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'oatka-creek-leroy-mumford');

    expect(route?.riverId).toBe('oatka-creek');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04230500');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBe(4.5);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Red Bridge');
    expect(route?.accessPoints?.[1]?.name).toContain('Mumford');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.hazards).toContain('cold_water');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Honeoye Creek Fishell out-and-back with direct gauge and a bounded public launch', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'honeoye-creek-fishell-out-and-back');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04229500');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.putIn.latitude).toBe(route?.takeOut.latitude);
    expect(route?.putIn.longitude).toBe(route?.takeOut.longitude);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Fishell');
    expect(route?.accessPoints?.[1]?.name).toContain('turnaround');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('access_uncertain');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the upper Schoharie Creek corridor with direct gauge and public access context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'schoharie-creek-north-blenheim-middleburgh');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01350180');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('North Blenheim');
    expect(route?.accessPoints?.[1]?.name).toContain('Timothy Murphy');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Phoenicia-to-Boiceville Esopus reach with direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'esopus-creek-phoenicia-boiceville');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01362500');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Mt. Tremper');
    expect(route?.accessPoints?.[1]?.name).toContain('Boiceville');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('cold_water');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Cady-to-Greenvale Wappinger reach with direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'wappinger-creek-cady-greenvale');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01372500');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Cady');
    expect(route?.accessPoints?.[1]?.name).toContain('Greenvale');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('low_head_dam');
    expect(route?.safetyProfile?.hazards).toContain('cold_water');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Popp Park-to-Gardiner Wallkill gap with direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'wallkill-river-popp-gardiner');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01371500');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(1000);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Popp');
    expect(route?.accessPoints?.[1]?.name).toContain('Gardiner');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('low_head_dam');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the New Paltz-to-Rosendale Wallkill gap with public endpoint launches', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'wallkill-river-new-paltz-rosendale');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01371500');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(1000);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('New Paltz');
    expect(route?.accessPoints?.[1]?.name).toContain('Rosendale');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Middleburgh-to-Central Bridge Schoharie gap with direct stage context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'schoharie-creek-middleburgh-central-bridge');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01350750');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Timothy Murphy');
    expect(route?.accessPoints?.[1]?.name).toContain('Route 7');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('flash_flood');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Central Bridge-to-Esperance Schoharie gap with current public launches', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'schoharie-creek-central-bridge-esperance');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01351450');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Central Bridge');
    expect(route?.accessPoints?.[1]?.name).toContain('Esperance');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('flash_flood');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the lower Jordan River as access-bounded advanced whitewater', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'jordan-river-lassiter-carry-falls');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04267500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Jordan River');
    expect(route?.accessPoints?.[1]?.name).toContain('Carry Falls');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('remote');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Anthony Kill Tenandeho corridor with public endpoints and direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'anthony-kill-round-lake-mechanicville');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01335698');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Round Lake Preserve');
    expect(route?.accessPoints?.[1]?.name).toContain('Mechanicville City Dock');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Cohocton Bath-to-Campbell corridor with direct flow guidance', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'cohocton-river-bath-campbell');

    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('easy');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01529500');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.tooLow).toBe(100);
    expect(route?.profile.tooHigh).toBe(2500);
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Babcock Hollow');
    expect(route?.accessPoints?.[1]?.name).toContain('Wood Road');
    expect(route?.accessPoints?.[2]?.name).toContain('Campbell');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Cohocton Campbell-to-Kinsella gap with public water access and conservative flow guidance', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'cohocton-river-campbell-kinsella');

    expect(route?.riverId).toBe('cohocton-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01529500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Wood Road');
    expect(route?.accessPoints?.[1]?.name).toContain('Kinsella');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Connector continuity evidence')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct flow context')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Cedar River Flow out-and-back with a confirmed launch, camping posture, and dam boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'cedar-river-flow-cedar-river-out-and-back');

    expect(route?.riverId).toBe('cedar-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01313000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Cedar River Flow');
    expect(route?.accessPoints?.[1]?.name).toContain('return');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.evidenceNotes.some((item) => item.label === 'Named out-and-back paddling guidance')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Historical same-river gauge context')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the lower La Chute with public water endpoints, direct flow context, and upper-falls boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'la-chute-river-bicentennial-fort-ticonderoga');

    expect(route?.riverId).toBe('la-chute-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04279015');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Bicentennial');
    expect(route?.accessPoints?.[1]?.name).toContain('Lake Champlain');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Lower-reach paddling guidance')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct flow context')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Fishing Brook connector with DEC endpoint coordinates and easement shoreline controls', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'fishing-brook-pickwickett-county-line-flow');

    expect(route?.riverId).toBe('fishing-brook');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('0131199050');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Pickwickett');
    expect(route?.accessPoints?.[1]?.name).toContain('County Line Flow');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('private_banks');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Named public paddling corridor')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Easement and shoreline boundary')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the lower Hudson Corning-to-Hudson-Shores pool as a proxy-gauge route', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'hudson-river-corning-preserve-hudson-shores');

    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01358000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Corning Preserve');
    expect(route?.accessPoints?.[1]?.name).toContain('Hudson Shores');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Ganargua Creek blueway with public endpoints and proxy flow context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'ganargua-creek-swifts-landing-norsen-bridge');

    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04234254');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Swift');
    expect(route?.accessPoints?.[1]?.name).toContain('Norsen');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('gives every added corridor a direct gauge, access chain, camping posture, and threshold source', () => {
    for (const route of newYorkRoutes) {
      expect(['direct', 'proxy']).toContain(route.gaugeSource.kind);
      expect(route.gaugeSource.siteId).toMatch(/^\d{8,15}$/);
      expect(route.accessPoints?.length).toBeGreaterThanOrEqual(2);
      expect(route.logistics?.campingClassification).toBeTruthy();
      expect(route.profile.thresholdSource.url).toMatch(/^https:\/\//);
      expect(route.sourceLinks.length).toBeGreaterThanOrEqual(5);
    }
  });

  it('uses approved same-river imagery rather than placeholders', () => {
    for (const route of newYorkRoutes) {
      const photo = getRoutePreviewPhoto(route);

      expect(photo.isPlaceholder).toBe(false);
      expect(['river', 'route']).toContain(photo.sourceKind);
    }
  });

  it('keeps the Schoharie gorge route visible only as advanced whitewater', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'schoharie-creek-esperance-burtonsville');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
  });

  it('labels the Black River Watertown reading as a planning-only proxy', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'black-river-lyons-falls-carthage');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.scoreEligibilityReason).toBe('proxy_gauge');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
  });

  it('labels the Grass River Chase Mills reading as a planning-only proxy', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'grass-river-pyrites-canton');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.scoreEligibilityReason).toBe('proxy_gauge');
    expect(route?.safetyProfile?.hazards).toContain('low_head_dam');
  });

  it('publishes the South Branch Grass River high-water section with public hand launches', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'south-branch-grass-river-spruce-first-brook');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04265432');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Spruce Mountain');
    expect(route?.accessPoints?.[1]?.name).toContain('First Brook');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('remote');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Middle Branch Grass River flatwater reach with documented carries and a falls boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'middle-branch-grass-river-lampson-falls');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04265432');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Middle Branch');
    expect(route?.accessPoints?.[1]?.name).toContain('Lampson Falls');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.hazards).toContain('access_uncertain');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the East Branch St. Regis flatwater section with the documented shuttle pair', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'east-branch-st-regis-river-vanderwalker-everton-falls');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04268800');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Vanderwalker');
    expect(route?.accessPoints?.[1]?.name).toContain('Everton');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('access_uncertain');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Indian Rock to Four Mile St. Regis moving-water section with carry safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'middle-branch-st-regis-river-indian-rock-four-mile');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04268800');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Indian Rock');
    expect(route?.accessPoints?.[1]?.name).toContain('Four Mile');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Grass River Lampson Falls to Downerville advanced section with a falls boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'grass-river-lampson-falls-downerville');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04265432');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Lampson Falls');
    expect(route?.accessPoints?.[1]?.name).toContain('Downerville');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Lower South Branch Grass River whitewater section with current DEC endpoints', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'south-branch-grass-river-twin-falls-degrasse');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04265432');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('State Fishing Access');
    expect(route?.accessPoints?.[1]?.name).toContain('DeGrasse');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('keeps the lower Raquette as advanced planning-only whitewater', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'raquette-river-dead-creek-jamestown');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04267500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
  });

  it('publishes the bounded Schroon whitewater route with direct stage guidance', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'schroon-river-starbuckville-riverbank');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01317000');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(3.9);
    expect(route?.profile.idealMin).toBe(3.9);
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
  });

  it('publishes the distinct Schroon Falls to Schroon Lake public-launch continuation', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'schroon-river-schroon-falls-schroon-lake');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01317000');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the distinct South Horicon to Starbuckville moving-water subsection', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'schroon-river-south-horicon-starbuckville');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01317000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the distinct Port Crane to Chenango Bridge moving-water subsection', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'chenango-river-port-crane-chenango-bridge');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01512652');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.profile.difficulty).toBe('easy');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the distinct Chenango Bridge to Port Dickinson moving-water subsection', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'chenango-river-chenango-bridge-port-dickinson');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01512652');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.profile.difficulty).toBe('easy');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Upstream same-river proxy gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('keeps the South Sandy Creek corridor planning-only with direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'south-sandy-creek-route-95-route-11');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04250750');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
  });

  it('keeps the Silver Staircase as advanced proxy-gauge whitewater with conditional access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'st-regis-middle-branch-st-regis-falls-fort-jackson');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04268800');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('dam');
  });

  it('publishes West Canada Creek as a direct-gauge regulated Class II section', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'west-canada-creek-middleville-kast-bridge');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01346000');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.tooLow).toBe(600);
    expect(route?.profile.tooHigh).toBe(10000);
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('low_head_dam');
  });

  it('publishes the East Kill bridge-to-bridge reach with direct flow guidance', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'east-kill-beaches-corners-jewett-center');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01349700');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.tooLow).toBe(300);
    expect(route?.profile.tooHigh).toBe(1200);
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
  });

  it('publishes the lower East Canada Creek reach with direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'east-canada-creek-dolgeville-route-5');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01348000');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
  });

  it('keeps the Sacandaga Hope access explicitly caveated', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'sacandaga-river-hope-northville');

    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01321000');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.accessPoints?.[0]?.note).toContain('not a surveyed ramp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
  });

  it('keeps the lower Hoosic as a proxy-gauge, access-controlled moving-water route', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'hoosic-river-powerhouse-lock-4');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01334500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.accessPoints?.[0]?.note).toContain('limited');
  });

  it('publishes the Buskirk to Johnsonville Hoosic reach with direct gauge context and a hard dam boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'hoosic-river-buskirk-johnsonville');

    expect(route?.riverId).toBe('hoosic-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01334500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.note).toContain('NYSDEC');
    expect(route?.accessPoints?.[1]?.note).toContain('Johnsonville Dam');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks?.some((source) => source.url.includes('01334500.jpg'))).toBe(true);
  });

  it('publishes the lower Boquet with direct telemetry and public mouth access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'boquet-river-willsboro-noblewood');

    expect(route?.riverId).toBe('boquet-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04276500');
    expect(route?.scoreEligibility).toBe('scored');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.note).toContain('public boat-launch area');
    expect(route?.accessPoints?.[1]?.note).toContain('cartop launch');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
  });

  it('publishes Croton as advanced planning-only whitewater with conditional dam access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'croton-river-dam-echo-point');

    expect(route?.riverId).toBe('croton-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01375000');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(3);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.note).toContain('condition');
    expect(route?.accessPoints?.[1]?.note).toContain('public trailer/cartop launch');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('low_head_dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
  });

  it('publishes Ramapo with a same-river proxy gauge and public Tuxedo/Flat Rock access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'ramapo-river-tuxedo-pierson-mapes');

    expect(route?.riverId).toBe('ramapo-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01387420');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(2.9);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.note).toContain('DEC');
    expect(route?.accessPoints?.[1]?.note).toContain('Rockland County');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_head_dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
  });

  it('publishes the upper Hudson wilderness approach with a direct stage screen and carry-aware access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'hudson-river-newcomb-indian-confluence');

    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01315500');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(4);
    expect(route?.profile.idealMin).toBe(4);
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[2]?.note).toContain('0.1-mile carry');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
  });

  it('keeps the Hudson Gorge run advanced and release-dependent', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'hudson-river-indian-confluence-north-river');

    expect(route?.gaugeSource.siteId).toBe('01315500');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.profile.thresholdSource.url).toContain('americanwhitewater.org');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
  });

  it('labels the East Branch Delaware route as a Hancock proxy with DEC hand launches', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'east-branch-delaware-river-fishs-eddy-hancock');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01421500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.scoreEligibilityReason).toBe('proxy_gauge');
    expect(route?.accessPoints?.[0]?.name).toContain("Fish's Eddy");
    expect(route?.accessPoints?.[1]?.name).toContain('Cadosia');
    expect(route?.safetyProfile?.hazards).toContain('cold_water');
  });

  it('publishes the Callicoon-to-Narrowsburg main-stem Delaware route with direct flow and public access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'delaware-river-callicoon-narrowsburg');

    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01427510');
    expect(route?.profile.idealMin).toBe(400);
    expect(route?.profile.idealMax).toBe(8000);
    expect(route?.accessPoints?.[0]?.name).toContain('Callicoon');
    expect(route?.accessPoints?.[1]?.name).toContain('Narrowsburg');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
  });

  it('publishes the Port Jervis-to-Milford Delaware route with direct flow and cross-state access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'delaware-river-port-jervis-milford');

    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01434000');
    expect(route?.profile.idealMin).toBe(700);
    expect(route?.profile.idealMax).toBe(12000);
    expect(route?.accessPoints?.[0]?.name).toContain('Port Jervis');
    expect(route?.accessPoints?.[1]?.name).toContain('Milford');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
  });

  it('publishes the conditional Cattaraugus Creek route with direct flow and public endpoint access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'cattaraugus-creek-gowanda-sunset-bay');

    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04213500');
    expect(route?.profile.idealMin).toBe(150);
    expect(route?.profile.idealMax).toBe(3000);
    expect(route?.accessPoints?.[0]?.name).toContain('Gateway Park');
    expect(route?.accessPoints?.[1]?.name).toContain('Sunset Bay');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.permits).toContain('Seneca Nation');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
  });

  it('publishes the Zoar Bridge-to-Gowanda Cattaraugus reach with DEC stage guidance', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'cattaraugus-creek-zoar-bridge-gowanda');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04213500');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('North Otto');
    expect(route?.accessPoints?.[1]?.name).toContain('Aldrich');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Oswegatchie wilderness route as a proxy-gauge out-and-back', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'oswegatchie-river-inlet-high-falls');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04262000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.scoreEligibilityReason).toBe('proxy_gauge');
    expect(route?.profile.idealMin).toBe(80);
    expect(route?.profile.idealMax).toBe(1500);
    expect(route?.accessPoints?.[0]?.name).toContain('Inlet Road');
    expect(route?.accessPoints?.[1]?.name).toContain('High Falls');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
  });

  it('publishes the Heuvelton to Ogdensburg Oswegatchie flatwater corridor', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'oswegatchie-river-heuvelton-ogdensburg');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04263000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Heuvelton');
    expect(route?.accessPoints?.[1]?.name).toContain('Eel Weir');
    expect(route?.accessPoints?.[2]?.name).toContain('Lafayette');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Raquette flatwater route as a planning-only context route without inventing a threshold', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'raquette-river-axton-crusher');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04266500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints?.[0]?.name).toContain('Axton Landing');
    expect(route?.accessPoints?.[1]?.name).toContain('Crusher');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('remote');
  });

  it('publishes Cooperstown to Phoenix Mills as an experienced planning-only lake-to-river transition', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'susquehanna-river-cooperstown-phoenix-mills');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01496352');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints?.[0]?.name).toContain('Fish Road');
    expect(route?.accessPoints?.[1]?.name).toContain('Compton Bridge');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
  });

  it('publishes Crumhorn Pond to Goodyear Lake as a planning-only flatwater corridor', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'susquehanna-river-crumhorn-goodyear-lake');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01497500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Crumhorn');
    expect(route?.accessPoints?.[1]?.name).toContain('Portlandville');
    expect(route?.accessPoints?.[2]?.name).toContain('Goodyear');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
  });

  it('publishes Mohawk Herkimer to Little Falls as a planning-only canalized flatwater route', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'mohawk-river-herkimer-little-falls');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01347000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Herkimer');
    expect(route?.accessPoints?.[1]?.name).toContain('Rotary Park');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
  });

  it('publishes Second Pond to Lake Flower as a planning-only lock and lake transition', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'saranac-river-second-pond-lake-flower');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04272512');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Second Pond');
    expect(route?.accessPoints?.[1]?.name).toContain('Lake Flower');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('dam');
  });

  it('publishes the West Branch Ausable as advanced planning-only whitewater', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'ausable-west-branch-wilmington-ausable-forks');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04275500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the East Branch Ausable as advanced planning-only whitewater', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'ausable-east-branch-keene-upper-jay');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04275500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Hulls Falls to Keene reach as advanced planning-only whitewater', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'ausable-east-branch-hulls-falls-keene');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.profile.difficulty).toBe('hard');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04275500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.latitude).toBe(44.2346);
    expect(route?.accessPoints?.[1]?.longitude).toBe(-73.79001);
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Newark-to-Lyons Erie Canal section with lock and dry-dock safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-newark-lyons');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04218700');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(6);
    expect(route?.accessPoints?.[1]?.name).toContain('Port of Newark');
    expect(route?.accessPoints?.[2]?.name).toContain('E28B');
    expect(route?.accessPoints?.[3]?.name).toContain('E28A');
    expect(route?.accessPoints?.[4]?.name).toContain('Abbey');
    expect(route?.accessPoints?.[5]?.name).toContain('Lyons');
    expect(route?.accessPoints?.[3]?.latitude).toBe(43.06249);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Lyons-to-Seneca County Line section with Clyde marsh and Lock E26 safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-lyons-seneca-county-line');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[1]?.name).toContain('Lauraville');
    expect(route?.accessPoints?.[2]?.name).toContain('E26');
    expect(route?.accessPoints?.[3]?.name).toContain('Armitage');
    expect(route?.accessPoints?.[2]?.latitude).toBe(43.06148);
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.logistics?.camping).toContain('free permit');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Montezuma refuge section with Mays Point, wildlife-area, and Mentz safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-montezuma-nwr');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(6);
    expect(route?.accessPoints?.[1]?.name).toContain('Upper Mays');
    expect(route?.accessPoints?.[2]?.name).toContain('Mays Point');
    expect(route?.accessPoints?.[3]?.name).toContain('Richmond');
    expect(route?.accessPoints?.[4]?.name).toContain('Howland');
    expect(route?.accessPoints?.[5]?.name).toContain('Mentz');
    expect(route?.accessPoints?.[5]?.latitude).toBe(43.07886);
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.camping).toContain('Montezuma Anchorage');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Mentz-to-Brutus Seneca River section with private-camp and open-water safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-seneca-river-mentz-brutus');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[0]?.name).toContain('Mentz');
    expect(route?.accessPoints?.[1]?.name).toContain('Riverforest');
    expect(route?.accessPoints?.[2]?.name).toContain('Brutus');
    expect(route?.accessPoints?.[3]?.name).toContain('Cross Lake');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.camping).toContain('Riverforest Park');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Baldwinsville-to-Three Rivers section with outlet traffic and Lock E24 safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-baldwinsville-three-rivers');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(6);
    expect(route?.accessPoints?.[0]?.name).toContain('Mercer');
    expect(route?.accessPoints?.[1]?.name).toContain('Lions');
    expect(route?.accessPoints?.[2]?.name).toContain('DEC');
    expect(route?.accessPoints?.[3]?.name).toContain('Outlet');
    expect(route?.accessPoints?.[4]?.name).toContain('Willow Bay');
    expect(route?.accessPoints?.[5]?.name).toContain('Three Rivers');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Three Rivers-to-Brewerton section with lock and Oneida Lake safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-three-rivers-brewerton');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Three Rivers');
    expect(route?.accessPoints?.[1]?.name).toContain('Bonstead');
    expect(route?.accessPoints?.[2]?.name).toContain('E23');
    expect(route?.accessPoints?.[3]?.name).toContain('Lighthouse');
    expect(route?.accessPoints?.[4]?.name).toContain('Dockwall');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Sylvan Beach section with lake, breakwater, and lock safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-sylvan-beach');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(6);
    expect(route?.accessPoints?.[0]?.name).toContain('Verona');
    expect(route?.accessPoints?.[1]?.name).toContain('Squires');
    expect(route?.accessPoints?.[2]?.name).toContain('Sylvan Beach');
    expect(route?.accessPoints?.[3]?.name).toContain('Cove Road');
    expect(route?.accessPoints?.[4]?.name).toContain('E22');
    expect(route?.accessPoints?.[5]?.name).toContain('E21');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.logistics?.camping).toContain('Verona Beach State Park');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Rome-to-Marcy section with spillway and Lock E20 safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-rome-marcy');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[0]?.name).toContain('Muck');
    expect(route?.accessPoints?.[1]?.name).toContain('Bellamy');
    expect(route?.accessPoints?.[2]?.name).toContain('Navigation');
    expect(route?.accessPoints?.[3]?.name).toContain('E20');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Lock E20-to-Frankfort section with lock, spillway, and harbor safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-lock-e20-frankfort');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[0]?.name).toContain('E20');
    expect(route?.accessPoints?.[1]?.name).toContain('Utica Marsh');
    expect(route?.accessPoints?.[2]?.name).toContain('Historic Marina');
    expect(route?.accessPoints?.[3]?.name).toContain('Frankfort');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Frankfort-to-Lock E18 section with Guard Gate 5 and WMA safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-frankfort-lock-e18');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(7);
    expect(route?.accessPoints?.[0]?.name).toContain('Frankfort');
    expect(route?.accessPoints?.[1]?.name).toContain('Ilion');
    expect(route?.accessPoints?.[2]?.name).toContain('Fulmer');
    expect(route?.accessPoints?.[3]?.name).toContain('Gems');
    expect(route?.accessPoints?.[4]?.name).toContain('Plantation');
    expect(route?.accessPoints?.[5]?.name).toContain('Fort Herkimer');
    expect(route?.accessPoints?.[6]?.name).toContain('E18');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.camping).toContain('Ilion Marina');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the German Flatts-to-St. Johnsville section with Little Falls safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-german-flatts-st-johnsville');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(6);
    expect(route?.accessPoints?.[0]?.name).toContain('E18');
    expect(route?.accessPoints?.[1]?.name).toContain('Little Falls Launch');
    expect(route?.accessPoints?.[2]?.name).toContain('Rotary');
    expect(route?.accessPoints?.[3]?.name).toContain('E17');
    expect(route?.accessPoints?.[4]?.name).toContain('Herkimer Home');
    expect(route?.accessPoints?.[5]?.name).toContain('E16');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.camping).toContain('Little Falls Canal Harbor');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the St. Johnsville-to-Canajoharie section with movable-dam and railroad safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-st-johnsville-canajoharie');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(8);
    expect(route?.accessPoints?.[0]?.name).toContain('E16');
    expect(route?.accessPoints?.[1]?.name).toContain('St. Johnsville');
    expect(route?.accessPoints?.[2]?.name).toContain('Lock 33');
    expect(route?.accessPoints?.[3]?.name).toContain('E15');
    expect(route?.accessPoints?.[4]?.name).toContain('Nelliston');
    expect(route?.accessPoints?.[5]?.name).toContain('E14');
    expect(route?.accessPoints?.[6]?.name).toContain('Canajoharie Fishing');
    expect(route?.accessPoints?.[7]?.name).toContain('Riverfront');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.camping).toContain('St. Johnsville');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Canajoharie-to-Fultonville section with E13 and Fonda safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-canajoharie-fultonville');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Riverfront');
    expect(route?.accessPoints?.[1]?.name).toContain('Canajoharie');
    expect(route?.accessPoints?.[2]?.name).toContain('E13');
    expect(route?.accessPoints?.[3]?.name).toContain('Fonda');
    expect(route?.accessPoints?.[4]?.name).toContain('Fultonville');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.camping).toContain('Fonda');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Fultonville-to-Amsterdam section with Schoharie and movable-dam safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-fultonville-amsterdam');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(6);
    expect(route?.accessPoints?.[0]?.name).toContain('Fultonville');
    expect(route?.accessPoints?.[1]?.name).toContain('Schoharie');
    expect(route?.accessPoints?.[2]?.name).toContain('E12');
    expect(route?.accessPoints?.[3]?.name).toContain('Yankee Hill');
    expect(route?.accessPoints?.[4]?.name).toContain('E11');
    expect(route?.accessPoints?.[5]?.name).toContain('Port Jackson');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.camping).toContain('Amsterdam');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Amsterdam-to-Rotterdam Junction section with E10 and E9 safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-amsterdam-rotterdam-junction');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Riverlink');
    expect(route?.accessPoints?.[1]?.name).toContain('Fishing Access');
    expect(route?.accessPoints?.[2]?.name).toContain('E10');
    expect(route?.accessPoints?.[3]?.name).toContain('Florida');
    expect(route?.accessPoints?.[4]?.name).toContain('E9');
    expect(route?.logistics?.campingClassification).toBe('none');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Rotterdam Junction-to-Freeman’s Bridge section with E8 and island-channel safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-rotterdam-junction-freemans-bridge');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(8);
    expect(route?.accessPoints?.[0]?.name).toContain('E9');
    expect(route?.accessPoints?.[1]?.name).toContain('Mabee');
    expect(route?.accessPoints?.[3]?.name).toContain('Maalwyck');
    expect(route?.accessPoints?.[4]?.name).toContain('E8');
    expect(route?.accessPoints?.[7]?.name).toContain('Freeman');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.logistics?.camping).toContain('Arrowhead');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Freeman’s Bridge-to-Lock E7 section with the Vischer Ferry dam exclusion', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-freemans-bridge-lock-e7');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(6);
    expect(route?.accessPoints?.[0]?.name).toContain('Freeman');
    expect(route?.accessPoints?.[1]?.name).toContain('Mohawk Harbor');
    expect(route?.accessPoints?.[3]?.name).toContain('Mohawk Landing');
    expect(route?.accessPoints?.[4]?.name).toContain('E7');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.logistics?.camping).toContain('Lock E7');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the south-side Lock E7-to-Waterford section with vegetation safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'erie-canal-lock-e7-waterford-flight-south');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(4);
    expect(route?.accessPoints?.[0]?.name).toContain('E7');
    expect(route?.accessPoints?.[1]?.name).toContain('Lions');
    expect(route?.accessPoints?.[2]?.name).toContain('Mohawk Riverside');
    expect(route?.accessPoints?.[3]?.name).toContain('Freddie');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Waterford-to-Lansingburgh confluence crossing with traffic safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'waterford-hudson-confluence-lansingburgh');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01358000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Waterford Point');
    expect(route?.accessPoints?.[1]?.name).toContain('Lansingburgh');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Feeder Canal Section 34 with access and lock-boundary safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'glens-falls-feeder-canal-queensbury-hudson-falls');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01327750');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Feeder Dam');
    expect(route?.accessPoints?.[1]?.name).toContain('Shermantown');
    expect(route?.accessPoints?.[2]?.name).toContain('Martindale');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Nissequogue tidal route with tide-window safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'nissequogue-river-paul-given-state-park');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01304000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Paul T. Given');
    expect(route?.accessPoints?.[1]?.name).toContain('Nissequogue River State Park');
    expect(route?.accessPoints?.[2]?.name).toContain('Sunken Meadow');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the lower Carmans tidal reach with tide and access safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'carmans-river-montauk-beaverdam');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01305000');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Montauk');
    expect(route?.accessPoints?.[1]?.name).toContain('Beaver Dam');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('access_uncertain');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Peconic upper reach with the Edwards Avenue dam boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'peconic-river-river-road-edwards-avenue');

    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01304500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('River Road East');
    expect(route?.accessPoints?.[2]?.name).toContain('Edwards Avenue');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Peconic Forge Pond to Upper Mills reach with direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'peconic-river-forge-pond-upper-mills');

    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01304500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Forge Pond');
    expect(route?.accessPoints?.[1]?.name).toContain('Upper Mills');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Peconic Upper Mills to Weeping Willow Blueway gap with bounded access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'peconic-river-upper-mills-weeping-willow');

    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01304500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.logistics?.distanceLabel).toContain('1.5');
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Upper Mills');
    expect(route?.accessPoints?.[1]?.name).toContain('Lower');
    expect(route?.accessPoints?.[2]?.name).toContain('Weeping Willow');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('01304500'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Peconic tidal Blueway reach with endpoint camping safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'peconic-river-weeping-willow-indian-island');

    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01304500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Weeping Willow');
    expect(route?.accessPoints?.[2]?.name).toContain('Indian Island');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the North Branch Grass River with the Harper Falls carry boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'north-branch-grass-river-clare-downerville');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04265432');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Clare Road');
    expect(route?.accessPoints?.[1]?.name).toContain('Downerville');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Fall Creek Route 13 to Flat Rock reach with direct flow and dam-boundary safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'fall-creek-route-13-flat-rock');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04234000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.tooLow).toBe(350);
    expect(route?.profile.tooHigh).toBe(5000);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Route 13');
    expect(route?.accessPoints?.[1]?.name).toContain('Flat Rock');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('/2910/main'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Salmon Route 2A to Black Hole reach with release and fishing safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'salmon-river-route-2a-black-hole');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04250200');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.tooLow).toBe(750);
    expect(route?.profile.tooHigh).toBe(10000);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Compactor');
    expect(route?.accessPoints?.[1]?.name).toContain('Black Hole');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('/1404/main'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
  });

  it('publishes the Grass River Downerville to Russell reach with access and proxy-flow safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'grass-river-downerville-russell');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04265432');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Downerville');
    expect(route?.accessPoints?.[1]?.name).toContain('Russell');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('cold_water');
    expect(route?.safetyProfile?.hazards).toContain('access_uncertain');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('/10629/main'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the South Branch Moose Rock Dam to McKeever reach with ALC traverse safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'south-branch-moose-river-rock-dam-mckeever');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04254500');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(2.65);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Rock Dam');
    expect(route?.accessPoints?.[1]?.name).toContain('McKeever');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('private_banks');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('/1355/main'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Moose McKeever to Iron Bridge reach with direct-stage feature safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'moose-river-mckeever-iron-bridge');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04254500');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('McKeever');
    expect(route?.accessPoints?.[1]?.name).toContain('Iron Bridge');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('/3590/main'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Salmon Creek Ludlowville to Cayuga Lake reach with direct-gauge and falls-portage safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'salmon-creek-ludlowville-cayuga-lake');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('0423401815');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Ludlowville');
    expect(route?.accessPoints?.[1]?.name).toContain('Myers');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('/2912/main'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Raquette Helenbrooks Hole reach with direct-gauge and release safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'raquette-river-helenbrooks-hole');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04267500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Stowe');
    expect(route?.accessPoints?.[1]?.name).toContain('Cold Brook');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('/11753/main'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Ausable Chasm reach with proxy-gauge and designated-access safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'ausable-river-ausable-chasm-us9');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04275500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('NYSEG');
    expect(route?.accessPoints?.[1]?.name).toContain('Route 9');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('/1236/main'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Stewarts Bridge release reach with direct-gauge and managed-access safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'sacandaga-river-stewarts-bridge-hudson');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01325000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Stewarts Bridge');
    expect(route?.accessPoints?.[1]?.name).toContain('Sacandaga Outdoor Center');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('/1400/main'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('safewaters.com/facility/stewarts-bridge'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the South Branch West Canada reach with proxy-gauge and state-land access safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'south-branch-west-canada-creek-fayle-nobleboro');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01343060');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(2000);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Fayle');
    expect(route?.accessPoints?.[1]?.name).toContain('Nobleboro');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.sourceLinks.some((link) => link.url.includes('/1456/main'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('01343060'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the upper West Branch Sacandaga flatwater reach with DEC access and camping safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'west-branch-sacandaga-chub-lake-shaker-place');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01321000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.safetyProfile?.riskLevel).toBe('caution');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Chub Lake');
    expect(route?.accessPoints?.[1]?.name).toContain('Shaker Place');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.sourceLinks.some((link) => link.url.includes('/silver-lake-wilderness'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('01321000'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the lower West Branch Sacandaga whitewater reach with proxy-flow safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'west-branch-sacandaga-whitehouse-campsite');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01321000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(1800);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Whitehouse');
    expect(route?.accessPoints?.[1]?.name).toContain('Blackbridge');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.sourceLinks.some((link) => link.url.includes('/1402/main'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('01321000'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the East Branch Sacandaga Griffin Gorge reach with guarded roadside access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'east-branch-sacandaga-griffin-gorge');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01321000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Moose Mountain');
    expect(route?.accessPoints?.[1]?.name).toContain('Route 30');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.sourceLinks.some((link) => link.url.includes('/1401/main'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('01321000'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Cedar Pelon to Outer Gooley wilderness reach with proxy-stage safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'cedar-river-pelon-outer-gooley');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01315500');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(4);
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Pelon');
    expect(route?.accessPoints?.[1]?.name).toContain('Gooley Club Road');
    expect(route?.accessPoints?.[2]?.name).toContain('Outer Gooley');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.sourceLinks.some((link) => link.url.includes('/1281/main'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('01315500'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Indian Abanakee to Outer Gooley reach with direct-gauge and release safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'indian-river-abanakee-dam-outer-gooley');

    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01315000');
    expect(route?.gaugeSource.metric).toBe('discharge_cfs');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Rafters');
    expect(route?.accessPoints?.[1]?.name).toContain('Outer Gooley');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('/1325/main'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('01315000'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Lewey Lake and Miami River out-and-back with proxy-gauge safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'miami-river-lewey-lake-out-and-back');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01314200');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.logistics?.distanceLabel).toContain('5');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Lewey Lake');
    expect(route?.accessPoints?.[1]?.name).toContain('Miami River');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.sourceLinks.some((link) => link.url.includes('01314200'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Black Creek Churchville to Black Creek Park reach with direct-gauge safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'black-creek-churchville-black-creek-park');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04231000');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.logistics?.distanceLabel).toContain('10.8');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Churchville');
    expect(route?.accessPoints?.[1]?.name).toContain('Black Creek');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.sourceLinks.some((link) => link.url.includes('04231000'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Delhi-to-Walton reach with current public access and direct flow safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'west-branch-delaware-river-delhi-walton');

    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01421900');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.idealMin).toBe(300);
    expect(route?.profile.idealMax).toBe(1200);
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Delhi');
    expect(route?.accessPoints?.[1]?.name).toContain('Hamden');
    expect(route?.accessPoints?.[2]?.name).toContain('Walton');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('cold_water');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.sourceLinks.some((link) => link.url.includes('/3416/main'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('01421900'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Roe-Jan Kill Park out-and-back with public park access and proxy safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'roeliff-jansen-kill-roe-jan-park-out-and-back');

    expect(route?.riverId).toBe('roeliff-jansen-kill');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01197000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Roe-Jan');
    expect(route?.accessPoints?.[1]?.name).toContain('Route 9G');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('/1392/main'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('01197000'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Image decision')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the upper Batten Kill float with DEC hand-launch access and direct stage safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'batten-kill-eagleville-battenville');

    expect(route?.riverId).toBe('batten-kill');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01329490');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Eagleville');
    expect(route?.accessPoints?.[1]?.name).toContain('Battenville');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('northeastwild.blogspot.com'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('01329490'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the lower Owego Creek out-and-back with DEC launch and direct gauge safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'owego-creek-lower-owego-out-and-back');

    expect(route?.riverId).toBe('owego-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01514000');
    expect(route?.gaugeSource.metric).toBe('gage_height_ft');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.tooLow).toBe(2);
    expect(route?.profile.tooHigh).toBe(5);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Canal Street');
    expect(route?.accessPoints?.[1]?.name).toContain('gauge-corridor');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.sourceLinks.some((link) => link.url.includes('/11040/main'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('01514000'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Northern Montezuma Howland Island loop with public launch and proxy safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'seneca-river-howland-island-loop');

    expect(route?.riverId).toBe('seneca-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04237496');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Carncross');
    expect(route?.accessPoints?.[1]?.name).toContain('Howland');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.sourceLinks.some((link) => link.url.includes('nomodraftapup.pdf'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('04237496'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Tivoli North Bay loop with public DEC launch and tide safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'hudson-river-tivoli-north-bay-loop');

    expect(route?.riverId).toBe('hudson-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01358000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Kidd Lane');
    expect(route?.accessPoints?.[1]?.name).toContain('Hudson River');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.sourceLinks.some((link) => link.url.includes('tivoli-bays'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('8518964'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Rondout Kingston-to-Eddyville loop with dam and proxy safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'rondout-creek-kingston-eddyville-loop');

    expect(route?.riverId).toBe('rondout-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01367500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Gallo');
    expect(route?.accessPoints?.[1]?.name).toContain('Eddyville');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.sourceLinks.some((link) => link.url.includes('hudsonrivergreenwaywatertrail'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('midhudsonadk.org'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Otselic Willet section with two public hand launches and direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'otselic-river-willet-landers-corners');

    expect(route?.riverId).toBe('otselic-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01510000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('41/26');
    expect(route?.accessPoints?.[1]?.name).toContain('Landers');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('parks.ny.gov/boating/launch-sites'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('experiencecortland.com'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the upper Chenango section with public launch chain and private-bank safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'chenango-river-north-norwich-greene');

    expect(route?.riverId).toBe('chenango-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01507000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('North Norwich');
    expect(route?.accessPoints?.[1]?.name).toContain('Norwich');
    expect(route?.accessPoints?.[2]?.name).toContain('Greene');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('private_banks');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('launch-sites/chenango-county'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('chenangocounty.org/water-recreation'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Fishkill Creek section with municipal park access and dam safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'fishkill-creek-jean-van-pelt-sarah-taylor');

    expect(route?.riverId).toBe('fishkill-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01372915');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Jean Van Pelt');
    expect(route?.accessPoints?.[1]?.name).toContain('Sarah Taylor');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('fishkillwatershed.org/creek-paddling'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('01372915'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('dutchessny.gov/Departments/Parks'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Itaska to Chenango Forks Tioughnioga section with DEC launches and proxy safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'tioughnioga-river-itaska-chenango-forks');

    expect(route?.riverId).toBe('tioughnioga-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01512500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Itaska');
    expect(route?.accessPoints?.[1]?.name).toContain('Chenango Forks');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.sourceLinks.some((link) => link.url.includes('Broome_River'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('launch-sites/broome-county'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Lakeview South Sandy Creek outlet out-and-back with public WMA launch safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'south-sandy-creek-lakeview-outlet');

    expect(route?.riverId).toBe('south-sandy-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04250750');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Lakeview');
    expect(route?.accessPoints?.[1]?.name).toContain('outlet');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('LakeviewMarshWMA'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('launch-sites/jefferson-county'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Burtonsville to Fort Hunter Schoharie section with public launch and confluence safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'schoharie-creek-burtonsville-fort-hunter');

    expect(route?.riverId).toBe('schoharie-creek');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01351500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Burtonsville');
    expect(route?.accessPoints?.[1]?.name).toContain('Dufel');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('americanwhitewater.org'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('SchoharieCrossingTrailMap'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('launch-sites.aspx'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Riparius to The Glen Hudson reach with public launches and Class III safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'hudson-river-riparius-glen');

    expect(route?.riverId).toBe('hudson-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01316031');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Riparius');
    expect(route?.accessPoints?.[1]?.name).toContain('Glen');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('river-detail/1323'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('launch-sites/warren-county'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('01316031'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Forestport to Hawkinsville Black River reach with direct gauge and dam safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'black-river-forestport-hawkinsville');

    expect(route?.riverId).toBe('black-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04252500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.idealMin).toBe(4.5);
    expect(route?.profile.idealMax).toBe(14);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Forestport');
    expect(route?.accessPoints?.[1]?.name).toContain('Hawkinsville');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('river-detail/10625'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('fishing-and-canoeing-the-black-river'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('launch-sites/oneida-county'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Hawkinsville to Norton Road Black River reach with the separate dam boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'black-river-hawkinsville-norton-road');

    expect(route?.riverId).toBe('black-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04252500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.idealMin).toBe(4.5);
    expect(route?.profile.idealMax).toBe(12);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Hawkinsville');
    expect(route?.accessPoints?.[1]?.name).toContain('Norton');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('river-detail/1254'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('fishing-and-canoeing-the-black-river'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('04252500'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Piercefield to Parmenter Raquette reach with expert portage safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'raquette-river-piercefield-parmenter');

    expect(route?.riverId).toBe('raquette-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04266500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.idealMin).toBe(1700);
    expect(route?.profile.idealMax).toBe(8000);
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Piercefield');
    expect(route?.accessPoints?.[2]?.name).toContain('Moody');
    expect(route?.accessPoints?.[3]?.name).toContain('Jamestown');
    expect(route?.accessPoints?.[4]?.name).toContain('Parmenter');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('river-detail/1386'))).toBe(true);
    expect(route?.sourceLinks.some((link) => link.url.includes('raquette-boreal-complex'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('04266500'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Raymondville to Massena Springs lower Raquette section with direct-gauge and boundary safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'raquette-river-raymondville-massena-springs');

    expect(route?.riverId).toBe('raquette-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04268000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('River Road');
    expect(route?.accessPoints?.[1]?.name).toContain('Massena Springs');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('fishing-and-canoeing-the-raquette-river'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('04268000'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Powley Place East Canada Creek out-and-back with a hard rapids boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'east-canada-creek-powley-place-out-and-back');

    expect(route?.riverId).toBe('east-canada-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01348000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.putIn?.latitude).toBe(route?.takeOut?.latitude);
    expect(route?.putIn?.longitude).toBe(route?.takeOut?.longitude);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Powley Place');
    expect(route?.accessPoints?.[1]?.name).toContain('turn-around');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('ferris-lake-wild-forest'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('01348000'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Speculator to Duck Bay Sacandaga flatwater loop with proxy safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'sacandaga-river-speculator-duck-bay-loop');

    expect(route?.riverId).toBe('sacandaga-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01321000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.putIn?.latitude).toBe(route?.accessPoints?.[0]?.latitude);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Speculator');
    expect(route?.accessPoints?.[1]?.name).toContain('Duck Bay');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('perkins-clearing-and-speculator-tree-farm'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('01321000'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved same-river image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Kunjamuk to Elm Lake out-and-back with an explicit objective boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'kunjamuk-river-speculator-elm-lake-out-and-back');

    expect(route?.riverId).toBe('kunjamuk-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01318779');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.putIn?.latitude).toBe(route?.takeOut?.latitude);
    expect(route?.putIn?.longitude).toBe(route?.takeOut?.longitude);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Speculator');
    expect(route?.accessPoints?.[1]?.name).toContain('Elm Lake');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('perkins-clearing-and-speculator-tree-farm'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('kunjamuk-river'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('speculatorperkinsrmp.pdf'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Marion River linked-lake route with public endpoints and a mandatory carry', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'marion-river-blue-mountain-raquette-lake');

    expect(route?.riverId).toBe('marion-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04267500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Blue Mountain');
    expect(route?.accessPoints?.[1]?.name).toContain('Raquette Lake');
    expect(route?.logistics?.campingClassification).toBe('endpoint_campground');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('northernforestcanoetrail.org'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('sargent-ponds-wild-forest'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Approved route image')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Dead Creek marsh out-and-back with a conservative informal-access boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'dead-creek-route-3-headwaters-out-and-back');

    expect(route?.riverId).toBe('dead-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04267500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.putIn?.latitude).toBe(route?.takeOut?.latitude);
    expect(route?.putIn?.longitude).toBe(route?.takeOut?.longitude);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Route 3');
    expect(route?.accessPoints?.[1]?.name).toContain('headwaters');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('raquette-boreal-complex'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('dead-creek-primitive-area'))).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Osgood Pond and Osgood River paddle with historical-gauge safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'osgood-river-osgood-pond-out-and-back');

    expect(route?.riverId).toBe('osgood-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('0426859505');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.putIn?.latitude).toBe(route?.takeOut?.latitude);
    expect(route?.putIn?.longitude).toBe(route?.takeOut?.longitude);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Osgood Pond');
    expect(route?.accessPoints?.[1]?.name).toContain('Meacham Lake mouth');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('mappaulsmithscel'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('visitmalone.com/paddling/osgood-river'))).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the North Branch Saranac River paddle with public hand-launch and moving-water safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'north-branch-saranac-river-north-branch-road-out-and-back');

    expect(route?.riverId).toBe('north-branch-saranac-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04273500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.putIn?.latitude).toBe(route?.takeOut?.latitude);
    expect(route?.putIn?.longitude).toBe(route?.takeOut?.longitude);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('North Branch');
    expect(route?.accessPoints?.[1]?.name).toContain('Lake Kushaqua');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.sourceLinks.some((link) => link.url.includes('kushaqua-conservation-easement-tract'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('sable-highlands-conservation-easement-tract'))).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the DeGrasse to Pyrites Grass River route with high-water and dam safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'grass-river-degrasse-pyrites');

    expect(route?.riverId).toBe('grass-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04265432');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('DeGrasse');
    expect(route?.accessPoints?.[1]?.name).toContain('Pyrites');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.sourceLinks.some((link) => link.url.includes('grass-river-complex'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('documents.dps.ny.gov'))).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the upper Boquet whitewater reach with a hard Split Rock Falls boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'boquet-river-route-73-split-rock');

    expect(route?.riverId).toBe('boquet-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04275500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Route 73');
    expect(route?.accessPoints?.[1]?.name).toContain('primitive tent-site');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('river-detail/10295'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('hammond-pond-wild-forest'))).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Little River canoe route with closure and proxy-gauge safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'little-river-youngs-streeter-lake-road');

    expect(route?.riverId).toBe('little-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04262000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Youngs Road');
    expect(route?.accessPoints?.[1]?.name).toContain('Streeter Lake Road');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('access_uncertain');
    expect(route?.sourceLinks.some((link) => link.url.includes('aldrich-pond-wild-forest'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('aldrchamend2'))).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Piseco Outlet whitewater out-and-back with a DEC launch and water-only boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'piseco-outlet-route-10-west-branch-out-and-back');

    expect(route?.riverId).toBe('piseco-outlet');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01321000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.putIn?.latitude).toBe(route?.takeOut?.latitude);
    expect(route?.putIn?.longitude).toBe(route?.takeOut?.longitude);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Big Bay');
    expect(route?.accessPoints?.[1]?.name).toContain('confluence');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('river-detail/1376'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('ferris-lake-wild-forest'))).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the South Branch Black River whitewater out-and-back with a DEC launch and confluence boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'south-branch-black-river-south-lake-out-and-back');

    expect(route?.riverId).toBe('south-branch-black-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04252500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.putIn?.latitude).toBe(route?.takeOut?.latitude);
    expect(route?.putIn?.longitude).toBe(route?.takeOut?.longitude);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('South Lake');
    expect(route?.accessPoints?.[1]?.name).toContain('confluence');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('whitewater');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('river-detail/1258'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('black-river-wild-forest'))).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Mongaup Rio Reach as release-dependent whitewater with public downstream access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'mongaup-river-rio-powerhouse-delaware');

    expect(route?.riverId).toBe('mongaup-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01433500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.tooLow).toBe(400);
    expect(route?.profile.idealMin).toBe(400);
    expect(route?.profile.idealMax).toBe(1200);
    expect(route?.profile.tooHigh).toBe(1200);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Rio Powerhouse');
    expect(route?.accessPoints?.[1]?.name).toContain('Route 97');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.riskLevel).toBe('advanced');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('river-detail/1349'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('eaglecreekre.com'))).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Salmon River Pineville to Compactor section between current DEC launch areas', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'salmon-river-pineville-compactor');

    expect(route?.riverId).toBe('salmon-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04250200');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Pineville');
    expect(route?.accessPoints?.[1]?.name).toContain('Compactor');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('river-detail/10883'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('dec.ny.gov/places/salmon-river'))).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the West Canada Creek Route 28 to Middleville access-study gap', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'west-canada-creek-route-28-middleville');

    expect(route?.riverId).toBe('west-canada-creek');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01346000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('overlook');
    expect(route?.accessPoints?.[1]?.name).toContain('Middleville');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam_release');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.sourceLinks.some((link) => link.url.includes('river-detail/1453'))).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.sourceUrl.includes('Whitewater-Boating-Flow-Access-Study-Progress-Report'))).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Colliersville to Emmons Susquehanna section with current DEC launches', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'susquehanna-river-colliersville-emmons');

    expect(route?.riverId).toBe('susquehanna-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01500500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Colliersville');
    expect(route?.accessPoints?.[1]?.name).toContain('Emmons');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('fast_rise');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Authoritative public water access')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Downstream proxy gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Emmons to West Oneonta Susquehanna gap with guarded proxy flow context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'susquehanna-river-emmons-west-oneonta');

    expect(route?.riverId).toBe('susquehanna-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01500500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints[0]?.name).toContain('Emmons');
    expect(route?.accessPoints[1]?.name).toContain('West Oneonta');
    expect(route?.logistics.campingClassification).toBe('none');
    expect(route?.safetyProfile.hazards).toContain('strainers');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Otego to Unadilla Susquehanna gap with direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'susquehanna-river-otego-unadilla');

    expect(route?.riverId).toBe('susquehanna-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01500500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints[0]?.name).toContain('Otego');
    expect(route?.accessPoints[1]?.name).toContain('Unadilla');
    expect(route?.logistics.campingClassification).toBe('none');
    expect(route?.safetyProfile.hazards).toContain('fast_rise');
    expect(getRoutePreviewPhoto(route!)).toBeDefined();
  });

  it('publishes the Unadilla New Berlin to Mount Upton section between current DEC launches', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'unadilla-river-new-berlin-mount-upton');

    expect(route?.riverId).toBe('unadilla-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01502500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('north');
    expect(route?.accessPoints?.[1]?.name).toContain('south');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('fast_rise');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Authoritative public water access')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Downstream proxy gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Unadilla Guilford to Rockdale connector before the existing card', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'unadilla-river-guilford-rockdale');

    expect(route?.riverId).toBe('unadilla-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01502500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Guilford');
    expect(route?.accessPoints?.[1]?.name).toContain('Rockdale');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('fast_rise');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Authoritative public water access')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct boundary gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the West River Marsh Sunnyside out-and-back with direct gauge context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'west-river-marsh-sunnyside-out-and-back');

    expect(route?.riverId).toBe('west-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04234398');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.putIn.latitude).toBe(route?.takeOut.latitude);
    expect(route?.putIn.longitude).toBe(route?.takeOut.longitude);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints[0]?.name).toContain('Sunnyside');
    expect(route?.accessPoints[1]?.name).toContain('South Hill');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Official public access and WMA context')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Elmira to Chemung Chemung River section with official launches and flow guidance', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'chemung-river-elmira-chemung');

    expect(route?.riverId).toBe('chemung-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01531000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('two-sided');
    expect(route?.profile.tooLow).toBe(400);
    expect(route?.profile.tooHigh).toBe(8000);
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints[0]?.name).toContain('Elmira');
    expect(route?.accessPoints[1]?.name).toContain('White Wagon');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint access')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct flow guidance')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Nelson Lake out-and-back with informal access and shallow-outlet safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'moose-river-nelson-lake-out-and-back');

    expect(route?.riverId).toBe('moose-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04254500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Nelson Lake Hand Launch');
    expect(route?.accessPoints?.[1]?.name).toContain('return');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public water entry')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Route distance and local conditions')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Petten Street to Lower Falls out-and-back with a hard waterfall boundary', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'genesee-river-petten-lower-falls-out-and-back');

    expect(route?.riverId).toBe('genesee-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04231600');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Petten Street');
    expect(route?.accessPoints?.[1]?.name).toContain('return');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('dam');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Named Lower Falls boundary')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Bronx River Blueway with permit, portage, tidal, and proxy-gauge safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'bronx-river-219th-soundview');

    expect(route?.riverId).toBe('bronx-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01302020');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.profile.idealMax).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('219th Street');
    expect(route?.accessPoints?.[1]?.name).toContain('Soundview');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_head_dam');
    expect(route?.safetyProfile?.hazards).toContain('urban_water_quality');
    expect(route?.safetyProfile?.hazards).toContain('flash_flood');
    expect(route?.evidenceNotes.some((item) => item.label === 'Route-specific portage and hazard guidance')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Same-river proxy gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Sangerfield River Nine Mile Park out-and-back with public launch, proxy gauge, and wetland safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'sangerfield-river-nine-mile-park-out-and-back');

    expect(route?.riverId).toBe('sangerfield-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('easy');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01505000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBeUndefined();
    expect(route?.profile.idealMin).toBeUndefined();
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('9-Mile Park');
    expect(route?.accessPoints?.[1]?.name).toContain('return');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toContain('low_water');
    expect(route?.safetyProfile?.hazards).toContain('strainers');
    expect(route?.safetyProfile?.hazards).toContain('mandatory_takeout');
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public water entry')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Same-basin proxy gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Fish Creek WMA public-launch wetland route with proxy gauge and obstacle safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'fish-creek-wma-route-184-pope-mills');

    expect(route?.riverId).toBe('fish-creek-wma');
    expect(route?.routeType).toBe('recreational');
    expect(route?.profile.difficulty).toBe('moderate');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04263350');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Route 184');
    expect(route?.accessPoints?.[1]?.name).toContain('Pope Mills');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'strainers', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Same-watershed historical gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the connected northern Lake Champlain and Great Chazy blueway segments', () => {
    const routes = [
      newYorkRoutes.find((candidate) => candidate.id === 'lake-champlain-rouses-point-great-chazy'),
      newYorkRoutes.find((candidate) => candidate.id === 'great-chazy-river-point-au-roche'),
    ];

    for (const route of routes) {
      expect(route).toBeDefined();
      expect(route?.routeType).toBe('recreational');
      expect(route?.scoreEligibility).toBe('planning');
      expect(route?.profile.thresholdModel).toBe('minimum-only');
      expect(route?.accessPoints).toHaveLength(2);
      expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'cold_water', 'private_banks']));
      expect(route?.evidenceNotes.some((item) => item.label === 'Camping posture')).toBe(true);
      expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
      expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
    }
  });

  it('publishes the St. Regis Winthrop to Route 92 reach with direct flow context and a conditional bailout', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'st-regis-river-winthrop-route-92');

    expect(route?.riverId).toBe('st-regis-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04269000');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.profile.tooLow).toBe(1000);
    expect(route?.profile.idealMin).toBe(1000);
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[1]?.name).toContain('Brasher Center');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['strainers', 'cold_water', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public intermediate access')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the upper West Branch Ausable sequence with conditional access and proxy flow context', () => {
    const routes = [
      newYorkRoutes.find((candidate) => candidate.id === 'ausable-west-branch-adirondak-loj-route-73'),
      newYorkRoutes.find((candidate) => candidate.id === 'ausable-west-branch-monument-high-falls'),
    ];

    for (const route of routes) {
      expect(route).toBeDefined();
      expect(route?.riverId).toBe('ausable-west-branch');
      expect(route?.routeType).toBe('whitewater');
      expect(route?.gaugeSource.kind).toBe('proxy');
      expect(route?.gaugeSource.siteId).toBe('04275500');
      expect(route?.scoreEligibility).toBe('planning');
      expect(route?.profile.thresholdModel).toBe('minimum-only');
      expect(route?.accessPoints).toHaveLength(2);
      expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
      expect(route?.safetyProfile?.hazards).toEqual(
        expect.arrayContaining(['whitewater', 'low_water', 'cold_water', 'strainers', 'mandatory_takeout']),
      );
      expect(route?.evidenceNotes.some((item) => item.label === 'Same-system proxy gauge')).toBe(true);
      expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
      expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
    }

    expect(routes[0]?.accessPoints?.[0]?.name).toContain('Adirondak Loj');
    expect(routes[1]?.accessPoints?.[1]?.name).toContain('High Falls Gorge');
  });

  it('publishes the Upper Hudson Thurman-to-Hadley day trip with public access chain and long-day safeguards', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'hudson-river-thurman-station-hadley');

    expect(route?.riverId).toBe('hudson-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01318500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(5);
    expect(route?.accessPoints?.[0]?.name).toContain('Thurman Station');
    expect(route?.accessPoints?.[4]?.name).toContain('Hadley');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['cold_water', 'strainers', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Spier Falls same-launch outing with a dam boundary and proxy flow context', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'hudson-river-spier-falls-out-and-back');

    expect(route?.riverId).toBe('hudson-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('01327750');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(3);
    expect(route?.accessPoints?.[0]?.name).toContain('Spier Falls');
    expect(route?.accessPoints?.[1]?.name).toContain('turnaround');
    expect(route?.accessPoints?.[2]?.name).toContain('return');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['dam', 'cold_water', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public paddling use')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Hydro-project boundary')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Cobleskill Creek Warnerville-to-Central Bridge corridor with direct flow and bounded public access', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'cobleskill-creek-warnerville-central-bridge');

    expect(route?.riverId).toBe('cobleskill-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01351298');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Warnerville');
    expect(route?.accessPoints?.[1]?.name).toContain('Central Bridge');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['whitewater', 'low_water', 'strainers', 'dam', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Direct live gauge')).toBe(true);
    expect(route?.evidenceNotes.some((item) => item.label === 'Current downstream public take-out')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the distinct Upper Hudson Fish Hatchery-to-Thurman connector', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'hudson-river-fish-hatchery-thurman-station');

    expect(route?.riverId).toBe('hudson-river');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('01318500');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Fish Hatchery');
    expect(route?.accessPoints?.[1]?.name).toContain('Thurman Station');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['cold_water', 'strainers', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Current public endpoint chain')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Balsam Pond carry-to-Route 3 South Branch high-water connector', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'balsam-pond-carry-south-branch-grass-river');

    expect(route?.riverId).toBe('south-branch-grass-river');
    expect(route?.routeType).toBe('whitewater');
    expect(route?.gaugeSource.kind).toBe('proxy');
    expect(route?.gaugeSource.siteId).toBe('04265432');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Balsam Pond');
    expect(route?.accessPoints?.[1]?.name).toContain('Route 3');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['whitewater', 'cold_water', 'strainers', 'remote', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Same-river proxy gauge')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });

  it('publishes the Catharine Creek WMA cartop-launch marsh connector', () => {
    const route = newYorkRoutes.find((candidate) => candidate.id === 'catharine-creek-wma-marsh-connector');

    expect(route?.riverId).toBe('catharine-creek');
    expect(route?.routeType).toBe('recreational');
    expect(route?.gaugeSource.kind).toBe('direct');
    expect(route?.gaugeSource.siteId).toBe('04232200');
    expect(route?.scoreEligibility).toBe('planning');
    expect(route?.profile.thresholdModel).toBe('minimum-only');
    expect(route?.accessPoints).toHaveLength(2);
    expect(route?.accessPoints?.[0]?.name).toContain('Airport/Rock Cabin');
    expect(route?.accessPoints?.[1]?.name).toContain('observation-tower');
    expect(route?.logistics?.campingClassification).toBe('nearby_basecamp');
    expect(route?.safetyProfile?.hazards).toEqual(expect.arrayContaining(['low_water', 'fast_rise', 'strainers', 'mandatory_takeout']));
    expect(route?.evidenceNotes.some((item) => item.label === 'Distinct public marsh corridor')).toBe(true);
    expect(getRoutePreviewPhoto(route!)).not.toMatchObject({ isPlaceholder: true });
    expect(publicRivers.some((candidate) => candidate.slug === route?.slug)).toBe(true);
  });
});
