import type { River } from '../lib/types';

export const rivers: River[] = [
  {
    id: 'cannon-river-welch',
    slug: 'cannon-river-welch',
    name: 'Cannon River',
    reach: 'Cannon Falls to Welch',
    state: 'Minnesota',
    region: 'Southeast Minnesota',
    summary:
      'Easy-moving day paddle from Cannon Falls to Welch. Flow is the main call, with crowding and private take-out logistics as secondary concerns.',
    statusText:
      'Best in the 300 to 700 cfs sweet spot. Still workable through a broader medium band when the river is not spiking after rain.',
    latitude: 44.5148835,
    longitude: -92.8990298,
    gaugeSource: {
      id: 'usgs-05355200',
      provider: 'usgs',
      siteId: '05355200',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Cannon River at Welch, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 300,
      idealMax: 700,
      tooLow: 220,
      tooHigh: 1540,
      thresholdSource: {
        label: 'MilesPaddled Cannon River II numeric range notes',
        url: 'https://milespaddled.com/cannon-river-ii/',
      },
      thresholdSourceStrength: 'mixed',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes: 'Spring through early fall is the normal window. Summer is still viable, but crowding can reduce trip quality.',
      difficulty: 'easy',
      difficultyNotes: 'Mostly an easy day-trip river, but current still matters when the gauge climbs.',
      confidenceNotes:
        'The sweet spot is still community-sourced, but MN DNR route guidance and DNR weekly stream-flow reports support a broader workable band and confirm that spring spikes push this reach into a higher-risk state.',
    },
    evidenceNotes: [
      {
        label: 'Ideal gauge',
        value: '300 to 700 cfs',
        note: 'Primary sweet spot from MilesPaddled. The same source treats 300 to 1,540 cfs as medium rather than extreme.',
        sourceUrl: 'https://milespaddled.com/cannon-river-ii/',
      },
      {
        label: 'DNR level context',
        value: '310 cfs = Normal; 1,840 cfs = High',
        note: 'MN DNR weekly stream-flow reports classified Welch as Normal at 310 cfs on October 18, 2021 and High at 1,840 cfs on May 2, 2011.',
        sourceUrl: 'https://files.dnr.state.mn.us/waters/surfacewater_section/stream_hydro/2021data/sfr101721table.pdf',
      },
      {
        label: 'Difficulty',
        value: 'Easy',
        note: 'Good first-pass river, but not a blind yes when levels spike.',
      },
      {
        label: 'Primary caution',
        value: 'Welch take-out logistics',
        note: 'Private landing context reduces confidence outside well-known conditions.',
      },
    ],
    sourceLinks: [
      {
        label: 'City of Cannon Falls Riverside Park',
        url: 'https://www.cannonfallsmn.gov/1285/Riverside-Park',
      },
      {
        label: 'MN DNR Cannon River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/cannonriver/segments-maps.html',
      },
      {
        label: 'MN DNR recommended Cannon Falls to Welch trip',
        url: 'https://www.dnr.state.mn.us/watertrails/recommended/cannon.html',
      },
      {
        label: 'MN DNR weekly stream-flow report 2021-10-18',
        url: 'https://files.dnr.state.mn.us/waters/surfacewater_section/stream_hydro/2021data/sfr101721table.pdf',
      },
      {
        label: 'MN DNR weekly stream-flow report 2011-05-02',
        url: 'https://files.dnr.state.mn.us/waters/surfacewater_section/stream_hydro/2011data/sfr050211table.pdf',
      },
      {
        label: 'USGS 05355200 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05355200/',
      },
      {
        label: 'MilesPaddled Cannon River II',
        url: 'https://milespaddled.com/cannon-river-ii/',
      },
    ],
  },
  {
    id: 'straight-river-faribault',
    slug: 'straight-river-faribault',
    name: 'Straight River',
    reach: "Krogh's Landing to Faribault",
    state: 'Minnesota',
    region: 'Southern Minnesota',
    summary:
      'Quick, riffly run into Faribault. A little low gets scrapy, and a little high gets pushier fast.',
    statusText:
      'This reach is best when Faribault sits in a narrow middle band. Low 4s can still work, but upper 5s get pushy fast.',
    latitude: 44.24285,
    longitude: -93.24006,
    gaugeSource: {
      id: 'usgs-05353800',
      provider: 'usgs',
      siteId: '05353800',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Straight River at Faribault, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 4.4,
      idealMax: 5.6,
      tooLow: 3.8,
      tooHigh: 6,
      thresholdSource: {
        label: 'MilesPaddled Straight River numeric range notes',
        url: 'https://milespaddled.com/straight-river/',
      },
      thresholdSourceStrength: 'mixed',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6],
      seasonNotes: 'Spring and early summer are the core window. By midsummer, this river often trends too low for a clean run.',
      difficulty: 'moderate',
      difficultyNotes: 'Small-river current, shallow riffles, and wood make this more technical than the score alone suggests.',
      confidenceNotes:
        'The preferred band starts from community trip data, but MN DNR seasonality guidance plus DNR weekly stream-flow reports help anchor the low and high shoulders. This is still a small, rain-sensitive river.',
    },
    evidenceNotes: [
      {
        label: 'Preferred band',
        value: '4.4 to 5.6 ft',
        note: 'The app narrows the original 4.6 to 6.0 ft trip-report band using MN DNR evidence that 5.71 ft already reads High while 3.76 ft still reads Normal.',
        sourceUrl: 'https://milespaddled.com/straight-river/',
      },
      {
        label: 'DNR level context',
        value: '3.76 ft = Normal; 5.71 ft = High',
        note: 'MN DNR weekly stream-flow reports classified Faribault as Normal at 3.76 ft on October 18, 2021 and High at 5.71 ft on May 2, 2011.',
        sourceUrl: 'https://files.dnr.state.mn.us/waters/surfacewater_section/stream_hydro/2021data/sfr101721table.pdf',
      },
      {
        label: 'Access support',
        value: 'Kroghs carry-in; city-managed Faribault finish',
        note: 'The MN DNR map explicitly names Kroghs Landing carry-in access at river mile 10.1, and the City of Faribault park amenities list confirms Two Rivers Park as a city park with river/public-access amenities.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/cannon1_straight.pdf',
      },
      {
        label: 'Faribault take-out support',
        value: 'Two Rivers Park has public access and canoe landing',
        note: 'The City of Faribault parks amenities sheet marks Two Rivers Park with both Public Access and Canoe Landing, which is stronger downstream endpoint support than the earlier route seed had.',
        sourceUrl: 'https://www.ci.faribault.mn.us/DocumentCenter/View/2494/Parks--Amenities',
      },
      {
        label: 'Rain sensitivity',
        value: 'High',
        note: 'Fast-changing small river. Trend matters almost as much as the current reading.',
      },
      {
        label: 'Difficulty',
        value: 'Moderate',
        note: 'Expect riffles, steering, and downed tree risk.',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR Straight River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/straightriver/index.html',
      },
      {
        label: 'MN DNR Straight River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/straightriver/segments-maps.html',
      },
      {
        label: 'MN DNR Cannon and Straight Rivers map PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/cannon1_straight.pdf',
      },
      {
        label: 'MN DNR weekly stream-flow report 2021-10-18',
        url: 'https://files.dnr.state.mn.us/waters/surfacewater_section/stream_hydro/2021data/sfr101721table.pdf',
      },
      {
        label: 'MN DNR weekly stream-flow report 2011-05-02',
        url: 'https://files.dnr.state.mn.us/waters/surfacewater_section/stream_hydro/2011data/sfr050211table.pdf',
      },
      {
        label: 'USGS 05353800 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/05353800/',
      },
      {
        label: 'City of Faribault parks and amenities PDF',
        url: 'https://www.ci.faribault.mn.us/DocumentCenter/View/2494/Parks--Amenities',
      },
      {
        label: 'City of Faribault Straight River master plan PDF',
        url: 'https://www.ci.faribault.mn.us/DocumentCenter/View/2824',
      },
      {
        label: 'MilesPaddled Straight River',
        url: 'https://milespaddled.com/straight-river/',
      },
    ],
  },
  {
    id: 'blue-earth-river-rapidan-county-road-90',
    slug: 'blue-earth-river-rapidan-county-road-90',
    name: 'Blue Earth River',
    reach: 'Rapidan Dam Park to County Road 90',
    state: 'Minnesota',
    region: 'Mankato Area',
    summary:
      'Hard Blue Earth day below Rapidan where both the gauge and the route character matter. The official DNR ladder gives this stretch real level guidance, but high water and rapids can still turn it into the wrong day fast.',
    statusText:
      'Treat 4.0 to 6.0 ft at Rapidan as the target band. Below 2.0 ft gets too scrapy, and above 15.0 ft is out of bounds for this stretch.',
    latitude: 44.12135,
    longitude: -94.08935,
    gaugeSource: {
      id: 'usgs-05320000',
      provider: 'usgs',
      siteId: '05320000',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Blue Earth River near Rapidan, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 4,
      idealMax: 6,
      tooLow: 2,
      tooHigh: 15,
      thresholdSource: {
        label: 'MN DNR river-level interpretation bands for Blue Earth River near Rapidan',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Spring through fall is the practical window. Recent rainfall matters more than the calendar because this stretch gets pushy fast when it rises.',
      difficulty: 'hard',
      difficultyNotes:
        'This is for experienced paddlers, not a casual float. Class I current, dam context, and fast post-rain changes all matter.',
      confidenceNotes:
        'MN DNR recommends this exact trip and publishes official level guidance for the Rapidan gauge. Confidence is still tempered because this is a genuinely hard stretch and the County Road 90 take-out has limited public detail.',
    },
    evidenceNotes: [
      {
        label: 'DNR bands',
        value: '2.0 / 4.0 / 6.0 / 15.0 ft',
        note: 'MN DNR interprets this gauge as Scrapable below 2.0 ft, Low from 2.0 to 4.0, Medium from 4.0 to 6.0, High from 6.0 to 15.0, and Very High above 15.0.',
        sourceUrl: 'https://maps.dnr.state.mn.us/cgi-bin/mapserv?map=RL_MAPFILE&mode=nquery',
      },
      {
        label: 'Recommended trip',
        value: '9.1 river miles',
        note: 'MN DNR treats Rapidan Dam Park to County Road 90 as the recommended Blue Earth day trip and explicitly marks it for experienced paddlers.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/blueearthriver/segments-maps.html',
      },
      {
        label: 'Primary hazards',
        value: 'Rapids, dam context, post-rain push',
        note: 'MN DNR warns about Rapidan Dam, Class I rapids, and rainfall-driven fast water and waves on this corridor.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/blueearthriver/segments-maps.html',
      },
      {
        label: 'Put-in support',
        value: 'County park launch and camping',
        note: 'Blue Earth County manages Rapidan Dam Park and identifies a canoe launch, campground, and posted park operations there.',
        sourceUrl: 'https://www.blueearthcountymn.gov/facilities/facility/details/6',
      },
      {
        label: 'Difficulty',
        value: 'Hard',
        note: 'Worth adding because the route is complete and well supported, but it is not the same kind of beginner-friendly product citizen as the easy Cannon or Root reaches.',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR river levels',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      {
        label: 'MN DNR Blue Earth River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/blueearthriver/segments-maps.html',
      },
      {
        label: 'MN DNR Blue Earth River GeoPDF',
        url: 'https://gdrs.dnr.state.mn.us/gdrs/apps/pub/us_mn_state_dnr/mndnr_geopdf_download/Water_Trail/Blue%20Earth%20GEO.pdf',
      },
      {
        label: 'Blue Earth County Rapidan Dam Park',
        url: 'https://www.blueearthcountymn.gov/facilities/facility/details/6',
      },
      {
        label: 'USGS 05320000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05320000/',
      },
    ],
  },
  {
    id: 'root-river-lanesboro-peterson',
    slug: 'root-river-lanesboro-peterson',
    name: 'Root River',
    reach: 'Lanesboro to Peterson',
    state: 'Minnesota',
    region: 'Southeast Minnesota',
    summary:
      'Classic Driftless day paddle with easy current and strong scenery. Flow is still the main call, but low-water scraping and post-rain debris should lower confidence before the gauge gets extreme.',
    statusText:
      'Treat about 300 cfs as the lower edge of a worthwhile day, not a perfect one. This route improves with a little more water, but rising flow and fresh rain still matter.',
    latitude: 43.76164,
    longitude: -91.88708,
    gaugeSource: {
      id: 'usgs-05384000',
      provider: 'usgs',
      siteId: '05384000',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Root River near Lanesboro, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 325,
      idealMax: 700,
      tooLow: 200,
      tooHigh: 1200,
      thresholdSource: {
        label: 'MilesPaddled Root River I same-segment gauge note',
        url: 'https://milespaddled.com/root-river-i/',
      },
      thresholdSourceStrength: 'mixed',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through early fall is the normal window. Summer can still work well, but low water hurts quality before the route becomes impossible.',
      difficulty: 'easy',
      difficultyNotes:
        'Mostly approachable current, but shallow riffles, sweepers, and cold shoulder-season water still make this more than a blind yes.',
      confidenceNotes:
        'MN DNR strongly supports the route itself, but the numeric range still comes from one same-segment trip report at 300 cfs plus nearby Root River guidance instead of a published official paddling range.',
    },
    evidenceNotes: [
      {
        label: 'Exact-route gauge note',
        value: '2.4 ft / 300 cfs = recommended, but low',
        note: 'MilesPaddled ties this exact Lanesboro to Peterson route to a 300 cfs day at the Lanesboro gauge and describes it as a recommended but low-water run.',
        sourceUrl: 'https://milespaddled.com/root-river-i/',
      },
      {
        label: 'Route context',
        value: 'MN DNR recommended day trip',
        note: 'MN DNR supports Lanesboro to Peterson as a marquee Root River day trip with public accesses at both ends.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html',
      },
      {
        label: 'Trail-town amenities',
        value: 'Lanesboro and Peterson both support launches and parking',
        note: 'The official DNR Guide to Trail Towns says Lanesboro has a trail center, parking, campground, and public restrooms at the trailhead, while Peterson has a canoe launch plus public restrooms, parking, and a campground in town.',
        sourceUrl: 'https://files.dnr.state.mn.us/destinations/state_trails/harmony_preston/guide_to_towns.pdf',
      },
      {
        label: 'Primary caution',
        value: 'Low water and post-rain debris',
        note: 'Low water means scraping and channel-picking. After rain, current and wood risk rise before a simple score fully captures it.',
      },
      {
        label: 'Threshold confidence',
        value: 'Mixed',
        note: 'The route and gauge are direct, but the usable range is still an estimate rather than an official paddling range.',
      },
    ],
    sourceLinks: [
      {
        label: 'MilesPaddled Root River I',
        url: 'https://milespaddled.com/root-river-i/',
      },
      {
        label: 'MN DNR Root River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/rootriver/index.html',
      },
      {
        label: 'MN DNR Root River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html',
      },
      {
        label: 'MN DNR Root River map PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/root.pdf',
      },
      {
        label: 'MN DNR Root River Hwy 16 Public Water Access',
        url: 'https://www.dnr.state.mn.us/water_access/site.html?id=WAS02189',
      },
      {
        label: 'MN DNR Root River Peterson Public Water Access',
        url: 'https://www.dnr.state.mn.us/water_access/site.html?id=WAS00265',
      },
      {
        label: 'MN DNR Guide to Trail Towns PDF',
        url: 'https://files.dnr.state.mn.us/destinations/state_trails/harmony_preston/guide_to_towns.pdf',
      },
      {
        label: 'USGS 05384000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05384000/',
      },
    ],
  },
  {
    id: 'root-river-rushford-houston',
    slug: 'root-river-rushford-houston',
    name: 'Root River',
    reach: 'Rushford to Houston',
    state: 'Minnesota',
    region: 'Southeast Minnesota',
    summary:
      'Longer Driftless day with mostly gentle current, wooded banks, and one main decision first: is the Houston gauge comfortably above late-low-water conditions without recent rain turning easy miles into a debris check?',
    statusText:
      'Treat about 300 cfs at Houston as a conservative low-water floor. This route is officially supported, but the app does not claim a full sweet spot because the Houston gauge does not have a published paddling range.',
    latitude: 43.77405,
    longitude: -91.7022,
    gaugeSource: {
      id: 'usgs-05385000',
      provider: 'usgs',
      siteId: '05385000',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Root River near Houston, MN',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 300,
      thresholdSource: {
        label: 'Conservative low-water floor from Root River near Houston official gauge context',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05385000/',
      },
      thresholdSourceStrength: 'derived',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through early fall is the normal window. Summer can still work, but lower water slows the day down fast and post-rain wood matters more than the easy rating suggests.',
      difficulty: 'easy',
      difficultyNotes:
        'Mostly friendly current and flatwater miles, but this is still a 15-mile day with sweepers, low-water riffles, and cold shoulder-season water.',
      confidenceNotes:
        'The route and gauge are both official and direct. The weak point is numeric threshold quality: the app only claims a conservative low-water floor because there is not yet a published paddling range for the Houston gauge.',
    },
    evidenceNotes: [
      {
        label: 'Official route context',
        value: '15.1 river miles',
        note: 'MN DNR recommends Rushford to Houston as a full-day Root River trip, with Rushford carry-in access at river mile 33.8 and Houston carry-in access at river mile 18.7.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html',
      },
      {
        label: 'Access support',
        value: 'Rushford carry-in to Houston carry-in',
        note: 'The Root River Map 2 PDF names both water-trail endpoints, and the state-trail map gives parking guidance at the Rushford Historic Depot lot and Houston Nature Center lot.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/root2.pdf',
      },
      {
        label: 'Trailhead amenities',
        value: 'Parking, restrooms, campground support',
        note: 'The official Guide to Trail Towns says both Rushford and Houston offer canoe launch access plus parking and public restrooms, with campground support in each town.',
        sourceUrl: 'https://files.dnr.state.mn.us/destinations/state_trails/harmony_preston/guide_to_towns.pdf',
      },
      {
        label: 'Route character',
        value: 'Gentle to moderate flow',
        note: 'MN DNR describes this stretch as having gentle to moderate flow, with flat water greeting paddlers along much of the route, while noting that water level can vary substantially with rainfall.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html',
      },
      {
        label: 'Official low-flow context',
        value: 'Q90 = 270 cfs at Houston',
        note: 'MN DNR drought guidance uses 270 cfs at the Root River near Houston as the annual Q90 low-flow benchmark for the watershed. That is not a paddling threshold, but it does support keeping the app low-water floor conservative and close to the obvious low-flow zone.',
        sourceUrl: 'https://files.dnr.state.mn.us/natural_resources/climate/drought/drought_permit_suspension.pdf',
      },
      {
        label: 'Conservative low-water floor',
        value: '300 cfs',
        note: 'This is a cautious app floor, not a published paddling threshold. It is intentionally set just above obvious late-low-water conditions because the Houston gauge has route support but no official numeric paddling ladder.',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR Root River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/rootriver/index.html',
      },
      {
        label: 'MN DNR Root River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html',
      },
      {
        label: 'MN DNR Root River Map 2 PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/root2.pdf',
      },
      {
        label: 'MN DNR Root River and Harmony-Preston Valley State Trail map',
        url: 'https://files.dnr.state.mn.us/maps/state_trails/rootriver_harmonypreston.pdf',
      },
      {
        label: 'MN DNR Guide to Trail Towns PDF',
        url: 'https://files.dnr.state.mn.us/destinations/state_trails/harmony_preston/guide_to_towns.pdf',
      },
      {
        label: 'Rushford Peterson Valley visitor info',
        url: 'https://rushfordpetersonvalley.com/visit-the-valley/',
      },
      {
        label: 'Houston Nature Center',
        url: 'https://www.houstonnaturecenter.com/',
      },
      {
        label: 'Houston Nature Center Root River Trail access',
        url: 'https://www.houstonnaturecenter.com/root-river-trail/',
      },
      {
        label: 'MN DNR drought low-flow Q90 guidance PDF',
        url: 'https://files.dnr.state.mn.us/natural_resources/climate/drought/drought_permit_suspension.pdf',
      },
      {
        label: 'USGS 05385000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05385000/',
      },
    ],
  },
  {
    id: 'root-river-parsley-moens',
    slug: 'root-river-parsley-moens',
    name: 'Root River',
    reach: "Parsley Bridge to Moen's Bridge",
    state: 'Minnesota',
    region: 'Southeast Minnesota',
    summary:
      'Upper North Branch Driftless day with riffles, bluffs, and a cleaner gauge question than most small rivers: is Pilot Mound at or above the lower edge of the published preferred band without recent rain turning a pretty easy run into a wood-and-current check?',
    statusText:
      'Treat 8.25 ft at Pilot Mound as a conservative minimum, not a hard published cutoff. Around 8.7 ft was described as a strong day, but the app stays minimum-only because the source trail does not define true low and high shoulders.',
    latitude: 43.7993,
    longitude: -92.0855,
    gaugeSource: {
      id: 'usgs-05383950',
      provider: 'usgs',
      siteId: '05383950',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Root River near Pilot Mound, MN',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 8.25,
      thresholdSource: {
        label: 'MilesPaddled Root River North Branch guidebook range note',
        url: 'https://milespaddled.com/root-river-north-branch/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through early fall is the normal window. This upper North Branch reach gets shallow sooner than the bigger lower Root routes, and fresh rain can change wood and current faster than the easy rating suggests.',
      difficulty: 'easy',
      difficultyNotes:
        'Mostly beginner-friendly moving water with riffles and steering, but low-water scraping, sweepers, and cold shoulder-season water still matter.',
      confidenceNotes:
        'The route and gauge are both strong, but the numeric model is intentionally conservative. The best published benchmark is the lower edge of a preferred stage band from community guidance, not a manager-published paddling ladder.',
    },
    evidenceNotes: [
      {
        label: 'Official route context',
        value: '13.3 river miles',
        note: 'MN DNR recommends Parsley Bridge to Moen\'s Bridge as a full-day North Branch Root trip, from Parsley Bridge carry-in access at river mile 78.4 to Moen\'s Bridge carry-in access at river mile 65.3.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html',
      },
      {
        label: 'Published preferred band',
        value: '8.25 to 9.25 ft at Pilot Mound',
        note: 'MilesPaddled cites an older guidebook preferred range for the North Branch and reports a trip day of 8.7 ft / 550 cfs as close to ideal.',
        sourceUrl: 'https://milespaddled.com/root-river-north-branch/',
      },
      {
        label: 'Access support',
        value: 'DNR carry-in accesses at both ends',
        note: 'DNR Map 1 names Parsley Bridge carry-in access at river mile 78.6 and Moen\'s Bridge carry-in access at river mile 65.3, with a toilet facility and river-level gauge at Moen\'s Bridge.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/root1.pdf',
      },
      {
        label: 'Route character',
        value: 'Gentle to moderate flow with riffles',
        note: 'MN DNR describes the Root River as having a gentle to moderate flow with some riffles, while warning that levels vary substantially with rainfall.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/root.pdf',
      },
      {
        label: 'On-route campsite support',
        value: 'Pilot Mound campsites',
        note: 'DNR Map 1 lists Pilot Mound campsites on this reach with picnic tables and pit toilets, which supports treating this as a possible overnight corridor even though the product fit is still mainly day-trip.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/root1.pdf',
      },
      {
        label: 'Conservative low-water floor',
        value: '8.25 ft',
        note: 'The app uses the lower edge of the published preferred band as a cautious floor because the source trail does not define a separate hard minimum below it.',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR Root River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/rootriver/index.html',
      },
      {
        label: 'MN DNR Root River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html',
      },
      {
        label: 'MN DNR Root River map PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/root.pdf',
      },
      {
        label: 'MN DNR Root River Map 1 PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/root1.pdf',
      },
      {
        label: 'MN DNR river levels',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      {
        label: 'USGS 05383950 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05383950/',
      },
      {
        label: 'MilesPaddled Root River North Branch',
        url: 'https://milespaddled.com/root-river-north-branch/',
      },
    ],
  },
  {
    id: 'root-river-moens-whalan',
    slug: 'root-river-moens-whalan',
    name: 'Root River',
    reach: "Moen's Bridge to Whalan",
    state: 'Minnesota',
    region: 'Southeast Minnesota',
    summary:
      'Classic bluff-country Root day where the branches gather, the valley opens up, and the decision stays practical: is Lanesboro comfortably above late-low-water conditions without recent rain turning an easy family-style trip into a debris check?',
    statusText:
      'Treat about 300 cfs at Lanesboro as a conservative low-water floor. This route is officially supported, but the app does not claim a full sweet spot because the gauge story is still stronger on the low side than on the high side.',
    latitude: 43.7692,
    longitude: -91.9748,
    gaugeSource: {
      id: 'usgs-05384000',
      provider: 'usgs',
      siteId: '05384000',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Root River near Lanesboro, MN',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 300,
      thresholdSource: {
        label: 'Conservative low-water floor from same-gauge Root River community guidance',
        url: 'https://milespaddled.com/root-river-i/',
      },
      thresholdSourceStrength: 'derived',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through early fall is the normal window. This is a friendlier Root day than many tiny creeks, but low water still slows the trip down and fresh rain still raises debris and current risk before the score fully captures it.',
      difficulty: 'easy',
      difficultyNotes:
        'Mostly approachable moving water with some riffles, but long mileage, shallow spots, and cold shoulder-season conditions keep it from being a blind yes.',
      confidenceNotes:
        'The route itself is very strong, and the gauge is on the route. Numeric confidence is lower because the best same-gauge benchmark comes from a nearby downstream trip report rather than a published paddling ladder for Moen\'s Bridge to Whalan itself.',
    },
    evidenceNotes: [
      {
        label: 'Official route context',
        value: '15.8 river miles',
        note: 'MN DNR recommends Moen\'s Bridge to Whalan as a full-day Root trip, from Moen\'s Bridge carry-in access at river mile 65.3 to Whalan carry-in access at river mile 49.3.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html',
      },
      {
        label: 'Access support',
        value: 'Moen\'s carry-in; Whalan parking 500 feet away',
        note: 'DNR Map 1 names Moen\'s Bridge carry-in access at river mile 65.3 with a toilet facility and says the Whalan carry-in access at river mile 49.5 has parking 500 feet away.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/root1.pdf',
      },
      {
        label: 'Route character',
        value: 'South Branch joins above Whalan; gentle to moderate flow',
        note: 'The Root River map says the South Branch joins above Whalan and that the Root has gentle to moderate flow with some riffles while varying substantially with rainfall.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/root.pdf',
      },
      {
        label: 'Known river hazard',
        value: 'Old bridge debris near Whalan',
        note: 'DNR Map 1 flags underwater old bridge debris near river mile 49.9 just above the Whalan finish, which is useful route-specific caution beyond the generic low-water and wood notes.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/root1.pdf',
      },
      {
        label: 'Same-gauge low benchmark',
        value: '300 cfs = recommended, but low',
        note: 'MilesPaddled treats 300 cfs at the Lanesboro gauge as recommended but low on the nearby Lanesboro to Peterson route. The app uses that exact same-gauge reading as a cautious floor here rather than claiming a tighter target band.',
        sourceUrl: 'https://milespaddled.com/root-river-i/',
      },
      {
        label: 'Whalan logistics',
        value: 'Street parking in town',
        note: 'MN DNR state-trail guidance says parking in Whalan is on city streets, which is useful context for the take-out plan even though the river access itself is separate from the trailhead page.',
        sourceUrl: 'https://www.dnr.state.mn.us/state_trails/root_river/index.html',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR Root River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/rootriver/index.html',
      },
      {
        label: 'MN DNR Root River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/rootriver/segments-maps.html',
      },
      {
        label: 'MN DNR Root River map PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/root.pdf',
      },
      {
        label: 'MN DNR Root River Map 1 PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/root1.pdf',
      },
      {
        label: 'MN DNR Root River State Trail page',
        url: 'https://www.dnr.state.mn.us/state_trails/root_river/index.html',
      },
      {
        label: 'USGS 05384000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05384000/',
      },
      {
        label: 'MilesPaddled Root River I',
        url: 'https://milespaddled.com/root-river-i/',
      },
    ],
  },
  {
    id: 'wolf-river-lily-hollister',
    slug: 'wolf-river-lily-hollister',
    name: 'Wolf River',
    reach: 'Hwy 52 to West Hollister Road',
    state: 'Wisconsin',
    region: 'Northwoods Wisconsin',
    summary:
      'Short rocky Wolf River warm-up with class I-II rapids and multiple boulder-garden lines. This is one of the clearer gauge-driven whitewater-ish day trips in the old repo, but it still deserves a moderate-skill stance.',
    statusText:
      'Treat about 250 cfs as the low cutoff and 500 cfs as a strong target. Above that, the river is still in play, but the consequences rise faster than on an easy scenic float.',
    latitude: 45.27752,
    longitude: -88.83183,
    gaugeSource: {
      id: 'usgs-04074950',
      provider: 'usgs',
      siteId: '04074950',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Wolf River at Langlade, WI',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 500,
      idealMax: 1000,
      tooLow: 250,
      tooHigh: 2000,
      thresholdSource: {
        label: 'American Whitewater Wolf gauge info plus MilesPaddled Wolf I notes',
        url: 'https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=2318',
      },
      thresholdSourceStrength: 'mixed',
      rainfallSensitivity: 'medium',
      seasonMonths: [5, 6, 7, 8, 9],
      seasonNotes:
        'Late spring through early fall is the normal window. Shoulder-season cold water makes swims and boulder hits matter more here than on easier day rivers.',
      difficulty: 'moderate',
      difficultyNotes:
        'The rapids stay in the class I-II range for this section, but shallow boulder gardens and faster current still reward paddlers who can read lines and recover from quick mistakes.',
      confidenceNotes:
        'The gauge is direct and American Whitewater provides a usable section range, but the route still leans on river-running judgment rather than a simple scenic-float threshold. The app keeps the call more conservative than the raw number alone.',
    },
    evidenceNotes: [
      {
        label: 'Working band',
        value: '250 to 2,000 cfs',
        note: 'American Whitewater lists this Wolf section family as boatable through that broader range, with 250 to 1,000 cfs covering the lower to moderate sweet spot.',
        sourceUrl: 'https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=2318',
      },
      {
        label: 'Strong target',
        value: '~500 cfs',
        note: 'Miles Paddled describes about 500 cfs as an awesome level for this exact Lily to Hollister section.',
        sourceUrl: 'https://milespaddled.com/wolf-river-i/',
      },
      {
        label: 'Too low cutoff',
        value: '~250 cfs',
        note: 'Miles Paddled treats roughly 250 cfs as the too-low cutoff point for this route.',
        sourceUrl: 'https://milespaddled.com/wolf-river-i/',
      },
      {
        label: 'Access confidence',
        value: 'Verified',
        note: 'Both landings are backed by Wisconsin DNR boat-access inventory records.',
      },
    ],
    sourceLinks: [
      {
        label: 'American Whitewater Wolf gauge info',
        url: 'https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=2318',
      },
      {
        label: 'MilesPaddled Wolf River I',
        url: 'https://milespaddled.com/wolf-river-i/',
      },
      {
        label: 'USGS 04074950 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-04074950/',
      },
      {
        label: 'WI DNR Wolf River State Trail',
        url: 'https://dnr.wisconsin.gov/topic/parks/wolfriver',
      },
      {
        label: 'WI DNR boat access inventory',
        url: 'https://dnr.wisconsin.gov/topic/lands/boataccess',
      },
    ],
  },
  {
    id: 'white-river-maple-ridge-highway-112',
    slug: 'white-river-maple-ridge-highway-112',
    name: 'White River',
    reach: 'Maple Ridge Road to Highway 112 Dam',
    state: 'Wisconsin',
    region: 'Northern Wisconsin',
    summary:
      'Fast-moving Northwoods run with nearly continuous class I-II current, clay banks, and a dam finish. This is a moving-water decision first, not a lazy scenic float.',
    statusText:
      'Treat about 1.47 ft as the best same-route reference point we have today. Lower water gets scrapier fast, and higher water raises consequence before the app can claim a fully official sweet spot.',
    latitude: 46.46811,
    longitude: -90.96808,
    gaugeSource: {
      id: 'usgs-04027500',
      provider: 'usgs',
      siteId: '04027500',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'White River near Ashland, WI',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 1.35,
      idealMax: 1.75,
      tooLow: 1.1,
      tooHigh: 2.6,
      thresholdSource: {
        label: 'MilesPaddled White River same-route gauge note',
        url: 'https://milespaddled.com/white-river-bayfield-county/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'medium',
      seasonMonths: [5, 6, 7, 8, 9],
      seasonNotes:
        'Late spring through early fall is the core window. Cold shoulder-season water and hydro-related fluctuation make the route less forgiving than its class rating alone suggests.',
      difficulty: 'moderate',
      difficultyNotes:
        'Mostly class I-II, but nearly continuous current, boulder gardens, and the dam finish reward paddlers who can read lines and stay attentive for the full day.',
      confidenceNotes:
        'The gauge is direct and the route note gives one exact same-route recommended level, but the working band is still a cautious manual calibration rather than an official manager-published threshold. Hydropeaking remarks from USGS also justify a more conservative read.',
    },
    evidenceNotes: [
      {
        label: 'Exact-route gauge note',
        value: '1.47 ft / 200 cfs = recommended',
        note: 'MilesPaddled ties this exact Maple Ridge to Hwy 112 route to a recommended day around 1.47 ft / 200 cfs on the White River gauge near Ashland.',
        sourceUrl: 'https://milespaddled.com/white-river-bayfield-county/',
      },
      {
        label: 'Primary caution',
        value: 'Continuous current plus dam take-out',
        note: 'This is not a drift-and-chat river. Quick current, boulder gardens, and the dam finish mean consequence rises before the number alone looks extreme.',
      },
      {
        label: 'USGS gauge note',
        value: 'Hydropeaking / diurnal fluctuation possible',
        note: 'USGS remarks mention hydroelectric-plant-driven fluctuation, so the same reading can feel less stable than on a free-flowing scenic river.',
        sourceUrl: 'https://waterdata.usgs.gov/nwis/uv?site_no=04027500',
      },
      {
        label: 'Access confidence',
        value: 'Partial',
        note: 'Put-in and take-out coordinates are good, but official landing and parking authority is weaker than on the strongest seeded routes.',
      },
    ],
    sourceLinks: [
      {
        label: 'MilesPaddled White River route notes',
        url: 'https://milespaddled.com/white-river-bayfield-county/',
      },
      {
        label: 'USGS 04027500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-04027500/',
      },
      {
        label: 'USGS 04027500 legacy current conditions',
        url: 'https://waterdata.usgs.gov/nwis/uv?site_no=04027500',
      },
    ],
  },
  {
    id: 'red-cedar-river-menomonie-dunnville',
    slug: 'red-cedar-river-menomonie-dunnville',
    name: 'Red Cedar River',
    reach: 'Menomonie to Dunnville',
    state: 'Wisconsin',
    region: 'West-Central Wisconsin',
    summary:
      'Easy lower Red Cedar day with mild riffles, a strong access pair, and one of the better bike shuttles in the current seed set. It still needs enough water to keep the riffles fun instead of scratchy.',
    statusText:
      'Treat about 6.4 to 7.0 ft as the best same-route window we have today. Lower water gets slower and scrapier, while higher water starts to flatten the riffles into a faster wood-watch day.',
    latitude: 44.794472375,
    longitude: -91.918879435,
    gaugeSource: {
      id: 'usgs-05369000',
      provider: 'usgs',
      siteId: '05369000',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Red Cedar River at Menomonie, WI',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 6.4,
      idealMax: 7.0,
      tooLow: 5.8,
      tooHigh: 8.2,
      thresholdSource: {
        label: 'MilesPaddled Red Cedar River I gauge note',
        url: 'https://milespaddled.com/red-cedar-river-i/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'medium',
      seasonMonths: [5, 6, 7, 8, 9],
      seasonNotes:
        'Late spring through early fall is the core window. This is an easy river, but cold shoulder-season water and fresh post-storm wood still lower the quality fast.',
      difficulty: 'easy',
      difficultyNotes:
        'Beginner-friendly when the gauge is in range, with mild riffles early and mostly forgiving current. The main trip-day risks are low water, storm debris, and a longer full-day pace.',
      confidenceNotes:
        'The direct Menomonie gauge and Wisconsin DNR access records make the route itself trustworthy. Confidence is still capped below the official tier because the preferred range comes mainly from a same-route trip report rather than a manager-published paddling band.',
    },
    evidenceNotes: [
      {
        label: 'Same-route sweet spot',
        value: '6.4 to 7.0 ft',
        note: 'MilesPaddled describes about 6.4 to 7.0 ft at Menomonie as the best range for keeping some character in the riffles without turning the river into fast, featureless high water.',
        sourceUrl: 'https://milespaddled.com/red-cedar-river-i/',
      },
      {
        label: 'Trip length',
        value: '14.75 mi',
        note: 'This is a real day trip, but the rail-trail shuttle and mild current keep it friendlier than many 15-mile river days.',
        sourceUrl: 'https://milespaddled.com/red-cedar-river-i/',
      },
      {
        label: 'Access confidence',
        value: 'Verified',
        note: 'Both Riverside Park Canoe Launch and Dunnville Bottoms Boat Landing are backed by Wisconsin DNR boat-access records.',
      },
      {
        label: 'Primary caution',
        value: 'Wood after storms',
        note: 'Even an easy lower Red Cedar day can change fast after storms if strainers and fresh wood move into the current.',
      },
    ],
    sourceLinks: [
      {
        label: 'MilesPaddled Red Cedar River I',
        url: 'https://milespaddled.com/red-cedar-river-i/',
      },
      {
        label: 'USGS 05369000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/05369000/',
      },
      {
        label: 'WI DNR Riverside Park canoe launch record',
        url: 'https://dnrmaps.wi.gov/arcgis/rest/services/LF_DML/LF_DNR_BOAT_BoatAccess_WTM_Ext/MapServer/2/query?f=json&where=BOATLANDING_SEQ_NO%3D970&outFields=*&returnGeometry=false',
      },
      {
        label: 'WI DNR Dunnville Bottoms boat landing record',
        url: 'https://dnrmaps.wi.gov/arcgis/rest/services/LF_DML/LF_DNR_BOAT_BoatAccess_WTM_Ext/MapServer/2/query?f=json&where=BOATLANDING_SEQ_NO%3D3005&outFields=*&returnGeometry=false',
      },
      {
        label: 'WI DNR Red Cedar State Trail',
        url: 'https://dnr.wisconsin.gov/topic/parks/redcedar',
      },
    ],
  },
  {
    id: 'namekagon-river-big-bend-trego',
    slug: 'namekagon-river-big-bend-trego',
    name: 'Namekagon River',
    reach: 'Big Bend Landing to Trego Town Park',
    state: 'Wisconsin',
    region: 'Northwest Wisconsin',
    summary:
      'Trusted Riverway day trip with a mellow wooded opening, a more scenic midsection near Earl Park, and a clear main decision first: is the official Leonards gauge comfortably above the scrape zone without current conditions hinting at a high-water day?',
    statusText:
      'Treat about 150 cfs at Leonards as the practical floor. NPS calls 150 to 230 cfs normal and 650+ cfs high, but the app stays conservative and uses this route as a minimum-only call because that gauge is an upstream same-river reference rather than an exact reach gauge.',
    latitude: 45.92135,
    longitude: -91.78778,
    gaugeSource: {
      id: 'usgs-05331833',
      provider: 'usgs',
      siteId: '05331833',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'proxy',
      siteName: 'Namekagon River at Leonards, WI',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 150,
      thresholdSource: {
        label: 'NPS Namekagon current-conditions normal level at Leonards',
        url: 'https://www.nps.gov/sacn/planyourvisit/current-conditions.htm',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'low',
      seasonMonths: [5, 6, 7, 8, 9],
      seasonNotes:
        'Late spring through early fall is the main window. This middle Namekagon trip is usually floatable through the season, but lower rainfall can turn the islanded Trego approach into a scrape-and-pick-your-channel finish.',
      difficulty: 'easy',
      difficultyNotes:
        'Mostly friendly for newer paddlers, with only occasional rock gardens and one quicker stretch near Highway 63. Low water and busy tubing traffic are more likely to degrade the day than technical difficulty.',
      confidenceNotes:
        'The route, access points, and flow context are all supported by the National Park Service. Confidence is still capped below absolute because the live gauge sits upstream at Leonards, so the app only claims a conservative minimum rather than a route-specific sweet spot.',
    },
    evidenceNotes: [
      {
        label: 'Official trip detail',
        value: '7.7 miles; 2 to 4 hours',
        note: 'NPS lists Big Bend to Trego as an easy middle-Namekagon trip with occasional riffles and rock gardens.',
        sourceUrl: 'https://www.nps.gov/sacn/planyourvisit/bigbend-trego.htm',
      },
      {
        label: 'Official level context',
        value: '150 to 230 cfs normal; 650+ cfs high',
        note: 'The NPS current-conditions dataset uses the Leonards gauge as the Namekagon river-level reference and publishes 150 to 230 cfs as Normal Level with High Level above 650 cfs.',
        sourceUrl:
          'https://www.nps.gov/common/uploads/sortable_dataset/sacn/A0AA7297-9A93-D166-BA7CC72680163EB0/A0AA7297-9A93-D166-BA7CC72680163EB0.json',
      },
      {
        label: 'Route character',
        value: 'Easy with occasional rock gardens',
        note: 'NPS says the first half is lazy and sandy, the stretch near Earl Park is more scenic and popular, and quicker current appears as the river approaches Highway 63 in Trego.',
        sourceUrl: 'https://www.nps.gov/sacn/planyourvisit/bigbend-trego.htm',
      },
      {
        label: 'Low-water caution',
        value: 'Scraping possible near the islands below Highway 63',
        note: 'NPS says this stretch is generally floatable throughout the season, but low-rainfall periods can require scraping or walking, especially after Highway 63 near the islands.',
        sourceUrl: 'https://www.nps.gov/sacn/planyourvisit/bigbend-trego.htm',
      },
      {
        label: 'Access quality',
        value: 'NPS landings and town-park finish',
        note: 'NPS Section Map 2 names Big Bend Landing and Trego Town Park Landing, and the Town of Trego confirms its campground sits on the Namekagon River at the take-out area.',
        sourceUrl: 'https://www.nps.gov/sacn/planyourvisit/maps.htm',
      },
      {
        label: 'Useful amenities',
        value: '4 campsites; potable water at Earl Park Landing',
        note: 'NPS lists four campsites on this trip, including group-site support and potable water at Earl Park Landing.',
        sourceUrl: 'https://www.nps.gov/sacn/planyourvisit/bigbend-trego.htm',
      },
    ],
    sourceLinks: [
      {
        label: 'NPS Big Bend to Trego trip page',
        url: 'https://www.nps.gov/sacn/planyourvisit/bigbend-trego.htm',
      },
      {
        label: 'NPS current conditions',
        url: 'https://www.nps.gov/sacn/planyourvisit/current-conditions.htm',
      },
      {
        label: 'NPS Namekagon current-conditions dataset JSON',
        url: 'https://www.nps.gov/common/uploads/sortable_dataset/sacn/A0AA7297-9A93-D166-BA7CC72680163EB0/A0AA7297-9A93-D166-BA7CC72680163EB0.json',
      },
      {
        label: 'NPS Namekagon Section Map 2 PDF',
        url: 'https://www.nps.gov/sacn/planyourvisit/upload/Section-2_Namekagon_Hayward-Landing-to-Trego-Namekagon_2024_508.pdf',
      },
      {
        label: 'NPS Namekagon River overview',
        url: 'https://www.nps.gov/sacn/planyourvisit/namekagon-river.htm',
      },
      {
        label: 'USGS 05331833 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05331833/',
      },
      {
        label: 'Town of Trego park and campground',
        url: 'https://townoftregowi.com/parks-recreation',
      },
    ],
  },
  {
    id: 'st-croix-river-fox-highway-70',
    slug: 'st-croix-river-fox-highway-70',
    name: 'St. Croix River',
    reach: 'Fox Landing to Highway 70',
    state: 'Wisconsin',
    region: 'Northwest Wisconsin',
    summary:
      'Broad northwoods border run with current, boulder gardens, and real wind exposure. This is more practical once the Danbury gauge gets above the scrape-and-walk low end.',
    statusText:
      'Treat about 1,000 cfs as the low-water floor. Below that this route gets too scrapy to recommend widely, and above that wind and channel-reading still matter.',
    latitude: 45.83215,
    longitude: -92.74622,
    gaugeSource: {
      id: 'usgs-05333500',
      provider: 'usgs',
      siteId: '05333500',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'St. Croix River near Danbury, WI',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 1000,
      thresholdSource: {
        label: 'MilesPaddled St. Croix River III minimum-flow note',
        url: 'https://milespaddled.com/st-croix-river-iii/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'low',
      windSensitivity: 1.3,
      seasonMonths: [5, 6, 7, 8, 9],
      seasonNotes:
        'Late spring through early fall is the main window. Wind matters almost as much as level on this broader channel, and cold shoulder-season water raises the cost of mistakes.',
      difficulty: 'moderate',
      difficultyNotes:
        'Intermediate day trip with multiple channels, boulder gardens, and level-dependent rapids. A workable gauge does not erase the need for route-finding and wind judgment.',
      confidenceNotes:
        'The direct gauge and verified access points are solid, but the numeric threshold still mostly works as a low-water floor. The app stays conservative above the minimum because there is not yet a clear preferred upper range.',
    },
    evidenceNotes: [
      {
        label: 'Low-water floor',
        value: '~1,000 cfs',
        note: 'Miles Paddled recommends waiting for at least about 1,000 cfs on the Danbury gauge for this Fox Landing to Highway 70 section.',
        sourceUrl: 'https://milespaddled.com/st-croix-river-iii/',
      },
      {
        label: 'Too low reference',
        value: '720 cfs',
        note: 'The same route report describes 720 cfs as too low for a worthwhile run.',
        sourceUrl: 'https://milespaddled.com/st-croix-river-iii/',
      },
      {
        label: 'Access confidence',
        value: 'Verified',
        note: 'Fox Landing and the Highway 70 landing are both backed by Wisconsin DNR boat-access inventory records.',
      },
      {
        label: 'Primary caution',
        value: 'Wind on a broad channel',
        note: 'Even when the gauge is workable, headwind and crosswind can dominate the effort on this wide upper St. Croix reach.',
      },
    ],
    sourceLinks: [
      {
        label: 'MilesPaddled St. Croix River III',
        url: 'https://milespaddled.com/st-croix-river-iii/',
      },
      {
        label: 'USGS 05333500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05333500/',
      },
      {
        label: 'WI DNR boat access inventory',
        url: 'https://dnr.wisconsin.gov/topic/lands/boataccess',
      },
      {
        label: 'NPS Saint Croix boating rules',
        url: 'https://www.nps.gov/sacn/planyourvisit/boating.htm',
      },
      {
        label: 'NPS Saint Croix maps',
        url: 'https://www.nps.gov/sacn/planyourvisit/maps.htm',
      },
    ],
  },
  {
    id: 'st-croix-river-interstate-osceola',
    slug: 'st-croix-river-interstate-osceola',
    name: 'St. Croix River',
    reach: 'Minnesota Interstate State Park Landing to Osceola Landing',
    aliases: [
      'Taylors Falls to Osceola Landing',
      'Taylors Falls to Osceola',
      'Highway 8 to Osceola Landing',
      'Interstate State Park to Osceola Landing',
    ],
    state: 'Minnesota',
    region: 'Lower St. Croix',
    summary:
      'Classic Taylors Falls to Osceola lower St. Croix day with strong official support and a cleaner trust story than most border-river additions. It is beginner-friendly by Riverway standards, but side channels, sandbars, and shared motorized traffic still matter more than the score alone suggests.',
    statusText:
      'Treat about 3,000 cfs at St. Croix Falls as the conservative floor. Below that, stay in the main channel and expect more sandbars and side-slough dead ends.',
    latitude: 45.401,
    longitude: -92.651,
    gaugeSource: {
      id: 'usgs-05340500',
      provider: 'usgs',
      siteId: '05340500',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'St. Croix River at St. Croix Falls, WI',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 3000,
      thresholdSource: {
        label: 'NPS lower St. Croix paddling guide low-water main-channel note',
        url: 'https://www.nps.gov/sacn/planyourvisit/upload/lower-st-croix-pg-final.pdf',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'low',
      windSensitivity: 1.35,
      seasonMonths: [5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through fall is the practical window. The gauge matters, but summer wind and boat traffic can shape the day almost as much as flow on this wider lower-river corridor.',
      difficulty: 'easy',
      difficultyNotes:
        'Usually a friendly downstream day, but this is still a broad moving river with strainers, wingdams, sandbars, and powerboat traffic rather than a tiny sheltered creek.',
      confidenceNotes:
        'NPS publishes this exact Highway 8 to Osceola trip, the lower-river paddling guide gives an official low-water caution tied to the St. Croix Falls gauge, and both landings are clearly documented. The app stays conservative because the official source gives a low-water warning, not a polished ideal range.',
    },
    evidenceNotes: [
      {
        label: 'Official trip',
        value: '6.6 miles / 3 to 4 hours / easy',
        note: 'NPS publishes Highway 8 to Osceola Landing, commonly treated as the Taylors Falls to Osceola run, as a ranger-recommended lower St. Croix paddle with easy difficulty and a 3 to 4 hour average pace.',
        sourceUrl: 'https://www.nps.gov/sacn/planyourvisit/8toosceola.htm',
      },
      {
        label: 'Low-water floor',
        value: 'Below 3,000 cfs stay in main channel',
        note: 'The NPS lower St. Croix paddling guide says that when flow at St. Croix Falls drops below 3,000 cfs, paddlers should stay in the main channel and avoid the side sloughs.',
        sourceUrl: 'https://www.nps.gov/sacn/planyourvisit/upload/lower-st-croix-pg-final.pdf',
      },
      {
        label: 'Route character',
        value: 'No rapids, but wood, sandbars, wingdams, rocks, and motorboats',
        note: 'NPS describes this reach as having no existing rapids, but says strainers, submerged logs, sandbars, wingdams, rocks, and shared motorized traffic occur throughout the area.',
        sourceUrl: 'https://www.nps.gov/sacn/planyourvisit/upload/lower-st-croix-pg-final.pdf',
      },
      {
        label: 'Access support',
        value: 'Official launch details on both ends',
        note: 'Minnesota DNR says the Interstate landing has a small concrete boat launch plus toilets, picnic tables, drinking water, and a required state-park vehicle permit, while NPS says Osceola has two launches, paved parking, restrooms, and drinking water.',
        sourceUrl: 'https://www.dnr.state.mn.us/state_water_trail/virtual_tour/st_croix_river/snapshot.html',
      },
      {
        label: 'Osceola operations',
        value: 'Separated motorized and nonmotorized launch flow',
        note: 'NPS says the 2023 Osceola rehab added a new motorized launch so motorized and nonmotorized traffic could be separated, along with better wayfinding, parking, restrooms, and utilities.',
        sourceUrl: 'https://www.nps.gov/sacn/planyourvisit/osceola-landing.htm',
      },
    ],
    sourceLinks: [
      {
        label: 'NPS lower St. Croix paddling guide PDF',
        url: 'https://www.nps.gov/sacn/planyourvisit/upload/lower-st-croix-pg-final.pdf',
      },
      {
        label: 'NPS Highway 8 to Osceola trip page',
        url: 'https://www.nps.gov/sacn/planyourvisit/8toosceola.htm',
      },
      {
        label: 'NPS St. Croix map 8 PDF',
        url: 'https://www.nps.gov/sacn/planyourvisit/upload/Section-8_St-Croix_Highway-8-to-Osceola-Landing_2024_508.pdf',
      },
      {
        label: 'NPS Osceola Landing',
        url: 'https://www.nps.gov/sacn/planyourvisit/osceola-landing.htm',
      },
      {
        label: 'MN DNR St. Croix virtual tour',
        url: 'https://www.dnr.state.mn.us/state_water_trail/virtual_tour/st_croix_river/snapshot.html',
      },
      {
        label: 'MN DNR Interstate State Park map guide',
        url: 'https://files.dnr.state.mn.us/maps/state_parks/spk00178.pdf',
      },
      {
        label: 'NPS Saint Croix accessibility',
        url: 'https://www.nps.gov/sacn/planyourvisit/accessibility.htm',
      },
      {
        label: 'NPS Saint Croix current conditions',
        url: 'https://www.nps.gov/sacn/planyourvisit/current-conditions.htm',
      },
      {
        label: 'USGS 05340500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05340500/',
      },
    ],
  },
  {
    id: 'st-croix-river-osceola-william-obrien',
    slug: 'st-croix-river-osceola-william-obrien',
    name: 'St. Croix River',
    reach: "Osceola Landing to William O'Brien State Park Landing",
    state: 'Minnesota',
    region: 'Lower St. Croix',
    summary:
      "Popular lower St. Croix bluff run with a better public-access story than most broad-river routes. The water is usually straightforward, but wind, powerboat traffic, and William O'Brien take-out status still matter enough that this should stay a decision route, not an automatic yes.",
    statusText:
      "Treat about 2,500 cfs at St. Croix Falls as a conservative floor for this lower-river run. Below that, expect more shallow bars and slower side-channel options, and always verify William O'Brien access before launching.",
    latitude: 45.31996700000001,
    longitude: -92.71514719999999,
    gaugeSource: {
      id: 'usgs-05340500',
      provider: 'usgs',
      siteId: '05340500',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'proxy',
      siteName: 'St. Croix River at St. Croix Falls, WI',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 2500,
      thresholdSource: {
        label: 'MilesPaddled lower St. Croix floor for the Osceola downstream corridor',
        url: 'https://milespaddled.com/st-croix-river-ii/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'low',
      windSensitivity: 1.45,
      seasonMonths: [5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through fall is the main window. Wind and summer boat traffic can matter more than raw flow on this lower-river reach, especially once the river opens into broader lake-like stretches.',
      difficulty: 'easy',
      difficultyNotes:
        "There are no rapids on this reach, but broad water, wakes, and a side-channel state-park take-out make it a bigger day than a tiny-flatwater beginner route.",
      confidenceNotes:
        "Osceola and William O'Brien are both real public landings on an official lower St. Croix corridor, and current NPS and DNR materials clearly place the route and the 2026 take-out status. Remaining uncertainty comes from the community-sourced low-water floor and the St. Croix Falls gauge sitting upstream of this lower-river reach.",
    },
    evidenceNotes: [
      {
        label: 'Official route geometry',
        value: '8.8 miles on NPS distance chart',
        note: "The NPS lower St. Croix paddling guide distance chart puts William O'Brien State Park Landing 8.8 river miles below Osceola Landing, with the take-out on a side channel behind an island.",
        sourceUrl: 'https://www.nps.gov/sacn/planyourvisit/upload/lower-st-croix-pg-final.pdf',
      },
      {
        label: 'Take-out status caveat',
        value: 'Open as water levels allow through 2026',
        note: "Minnesota DNR said in February 2026 that the St. Croix public water access at William O'Brien State Park would remain open as water levels allow through 2026, with dredging planned in 2027.",
        sourceUrl: 'https://www.dnr.state.mn.us/news/2026/02/17/minnesota-dnr-shares-reconstruction-plan-lake-alice-william-obrien-state-park',
      },
      {
        label: 'Official route character',
        value: 'No rapids, powerboats common, take-out on side channel',
        note: "NPS Map 9 says no rapids are found on this stretch, powerboats are common, the river becomes shallow at Arcola Sandbar, and William O'Brien Landing sits on a side channel behind an island.",
        sourceUrl: 'https://www.nps.gov/sacn/planyourvisit/upload/Map_9_Osceola_to_High_Bridge_2024_legal_508_mredits.pdf',
      },
      {
        label: 'Supplemental low-water floor',
        value: '2,500 cfs recommended on the lower corridor',
        note: 'Miles Paddled recommends about 2,500 cfs at St. Croix Falls for the downstream Osceola-to-Somerset reach, which is a defensible conservative floor for this upstream subset.',
        sourceUrl: 'https://milespaddled.com/st-croix-river-ii/',
      },
      {
        label: 'Big-river caution',
        value: 'Powerboats common; slow-no-wake above 683.0 ft at Stillwater',
        note: 'NPS says powerboats are common on this part of the lower St. Croix and documents a slow-no-wake rule when the Stillwater gauge reaches or exceeds 683.0 ft.',
        sourceUrl: 'https://www.nps.gov/sacn/planyourvisit/boating.htm',
      },
    ],
    sourceLinks: [
      {
        label: 'NPS lower St. Croix paddling guide PDF',
        url: 'https://www.nps.gov/sacn/planyourvisit/upload/lower-st-croix-pg-final.pdf',
      },
      {
        label: 'NPS St. Croix map 9 PDF',
        url: 'https://www.nps.gov/sacn/planyourvisit/upload/Section-9_St-Croix_Osceola-Landing-to-High-Bridge_2024_508.pdf',
      },
      {
        label: 'NPS Osceola Landing',
        url: 'https://www.nps.gov/sacn/planyourvisit/osceola-landing.htm',
      },
      {
        label: "MN DNR William O'Brien State Park",
        url: 'https://www.dnr.state.mn.us/state_parks/park.html?id=spk00283#homepage',
      },
      {
        label: "MN DNR William O'Brien State Park top stops",
        url: 'https://www.dnr.state.mn.us/state_parks/william_obrien/things_to_do.html',
      },
      {
        label: 'MN DNR St. Croix virtual tour',
        url: 'https://www.dnr.state.mn.us/state_water_trail/virtual_tour/st_croix_river/snapshot.html',
      },
      {
        label: 'MN DNR February 17, 2026 William O\'Brien access update',
        url: 'https://www.dnr.state.mn.us/news/2026/02/17/minnesota-dnr-shares-reconstruction-plan-lake-alice-william-obrien-state-park',
      },
      {
        label: 'NPS Saint Croix boating rules',
        url: 'https://www.nps.gov/sacn/planyourvisit/boating.htm',
      },
      {
        label: 'NPS St. Croix map 9 PDF',
        url: 'https://www.nps.gov/sacn/planyourvisit/upload/Map_9_Osceola_to_High_Bridge_2024_legal_508_mredits.pdf',
      },
      {
        label: 'MilesPaddled St. Croix River II',
        url: 'https://milespaddled.com/st-croix-river-ii/',
      },
      {
        label: 'USGS 05340500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05340500/',
      },
    ],
  },
  {
    id: 'rum-river-martins-north-county-park',
    slug: 'rum-river-martins-north-county-park',
    name: 'Rum River',
    reach: "Martin's Landing to North County Park",
    state: 'Minnesota',
    region: 'Twin Cities North Metro',
    summary:
      'Classic easy Rum day with enough current to feel like a river, not just a slow drift. The main decision is whether the St. Francis gauge is above scrape level without pushing into floody debris conditions.',
    statusText:
      'Treat the DNR medium band as the best window here. Below about 600 cfs gets too scrapy, and above 3,000 cfs turns this into a high-water day rather than a casual yes.',
    latitude: 45.44146,
    longitude: -93.31015,
    gaugeSource: {
      id: 'usgs-05286000',
      provider: 'usgs',
      siteId: '05286000',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Rum River near St. Francis, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 1000,
      idealMax: 2000,
      tooLow: 600,
      tooHigh: 3000,
      thresholdSource: {
        label: 'MN DNR river-level interpretation bands for Rum River near St. Francis',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through early fall is the main window. Summer can still work well, but very low water slows the day down fast and post-rain debris still matters.',
      difficulty: 'easy',
      difficultyNotes:
        'Generally beginner-friendly with wider, deeper current than the smallest creeks, but flood debris and cold shoulder-season water still deserve respect.',
      confidenceNotes:
        'The route and gauge are both officially supported, and the DNR river-level page gives clear paddling guidance for the St. Francis gauge. Confidence is still not absolute because that guidance is broad and same-day hazards can still change the call.',
    },
    evidenceNotes: [
      {
        label: 'DNR bands',
        value: '600 / 1,000 / 2,000 / 3,000 cfs',
        note: 'MN DNR interprets this gauge as Scrapable below 600 cfs, Low from 600 to 1,000, Medium from 1,000 to 2,000, High from 2,000 to 3,000, and Very High above 3,000.',
        sourceUrl: 'https://maps.dnr.state.mn.us/cgi-bin/mapserv?map=RL_MAPFILE&mode=nquery',
      },
      {
        label: 'Route character',
        value: 'Easy scenic day',
        note: 'MN DNR treats Martin\'s Landing to Rum River North County Park as a recommended paddling trip with few rapids and a wider, deeper lower-river feel.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/recommended/rum.html',
      },
      {
        label: 'Access confidence',
        value: 'Verified',
        note: 'Martin\'s Landing and Rum River North County Park are both documented public endpoints for this corridor.',
      },
      {
        label: 'Primary caution',
        value: 'Flood debris',
        note: 'Rising post-rain water can add debris and make an easy scenic route feel less forgiving.',
        sourceUrl: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR river levels',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      {
        label: 'MN DNR recommended Rum trip',
        url: 'https://www.dnr.state.mn.us/watertrails/recommended/rum.html',
      },
      {
        label: 'MN DNR Rum River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/rumriver/segments-maps.html',
      },
      {
        label: 'USGS 05286000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05286000/',
      },
      {
        label: 'Anoka County Rum River North County Park',
        url: 'https://www.anokacountymn.gov/Facilities/Facility/Details/Rum-River-North-County-Park-15',
      },
    ],
  },
  {
    id: 'rum-river-walbo-cambridge-west',
    slug: 'rum-river-walbo-cambridge-west',
    name: 'Rum River',
    reach: 'Walbo Access to Cambridge West Park',
    state: 'Minnesota',
    region: 'East Central Minnesota',
    summary:
      'Wide, winding middle-Rum day with wooded banks, moderate current, and a cleaner beginner/intermediate feel than many smaller rivers. The product question is mostly whether the river is clearly above skinny conditions, not whether it has a narrow ideal band.',
    statusText:
      'Treat the St. Francis gauge as a downstream proxy, not a perfect reach gauge. If that proxy is below about 600 cfs, this middle Rum route is too close to scrape territory for a confident easy-day recommendation.',
    latitude: 45.57573,
    longitude: -93.27928,
    gaugeSource: {
      id: 'usgs-05286000',
      provider: 'usgs',
      siteId: '05286000',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'proxy',
      siteName: 'Rum River near St. Francis, MN',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 600,
      thresholdSource: {
        label: 'MN DNR St. Francis gauge interpretation used as a downstream proxy for the middle Rum',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through early fall is the main window. Summer is still viable on this wider middle-river segment, but low water, log jams, and fresh debris still matter.',
      difficulty: 'easy',
      difficultyNotes:
        'This is a friendly moving-water day for beginning or intermediate paddlers, but it is still long enough that low water, wood, and fatigue deserve respect.',
      confidenceNotes:
        'The route itself is very well supported by MN DNR. Confidence is reduced because the live gauge is a downstream proxy at St. Francis rather than a current gauge on the Walbo-to-Cambridge reach.',
    },
    evidenceNotes: [
      {
        label: 'Official route context',
        value: '15.8 river miles',
        note: 'MN DNR recommends Walbo to Cambridge West as a full day on the middle Rum, from Walbo carry-in access at river mile 56.8 to Cambridge West Park at river mile 41.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/rumriver/segments-maps.html',
      },
      {
        label: 'Segment character',
        value: 'Moderate flows, few rapids',
        note: 'MN DNR describes Map 2 as wider, deeper, and slower than the upper Rum, suitable for beginning and intermediate canoeists when usual middle-river hazards are respected.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/rumriver/segments-maps.html',
      },
      {
        label: 'Proxy low-water floor',
        value: '600 cfs at St. Francis',
        note: 'MN DNR interprets the active St. Francis gauge as scrapable below 600 cfs. The app uses that same-river downstream reading as a conservative low-water proxy because the historical Cambridge gauge is not a good live product gauge.',
        sourceUrl: 'https://maps.dnr.state.mn.us/cgi-bin/mapserv?map=RL_MAPFILE&mode=nquery',
      },
      {
        label: 'Why the gauge is a proxy',
        value: 'Cambridge USGS site is discontinued',
        note: 'USGS lists Rum River at Cambridge (05285000) as a discontinued discharge station with record only from 1909 to 1914. That is why the app relies on the active same-river St. Francis gauge for live decision support instead of pretending Cambridge has a current direct gauge.',
        sourceUrl: 'https://mn.water.usgs.gov/infodata/ann-repts/annrpt99/discontinued.pdf',
      },
      {
        label: 'Access flexibility',
        value: 'Highway 14 shorten option',
        note: 'DNR notes you can shorten the route by starting or ending at the Highway 14 carry-in access if you do not want the full Walbo-to-Cambridge day.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/rumriver/segments-maps.html',
      },
      {
        label: 'Cambridge endpoint detail',
        value: 'West Park parking; 5 a.m. to 10 p.m.',
        note: 'The official Spirit River Nature Area map shows West Park at the Cambridge endpoint and lists the park-hours window as 5 a.m. to 10 p.m.',
        sourceUrl: 'https://www.ci.cambridge.mn.us/home/showpublisheddocument/128/636898412699200000',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR Rum River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/rumriver/index.html',
      },
      {
        label: 'MN DNR Rum River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/rumriver/segments-maps.html',
      },
      {
        label: 'MN DNR Rum River Map 2 PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/rum2.pdf',
      },
      {
        label: 'MN DNR river levels',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      {
        label: 'USGS discontinued Minnesota gaging stations PDF',
        url: 'https://mn.water.usgs.gov/infodata/ann-repts/annrpt99/discontinued.pdf',
      },
      {
        label: 'Cambridge parks overview',
        url: 'https://www.ci.cambridge.mn.us/amenities-fun/parks',
      },
      {
        label: 'Cambridge Spirit River Nature Area map PDF',
        url: 'https://www.ci.cambridge.mn.us/home/showpublisheddocument/128/636898412699200000',
      },
      {
        label: 'Isanti County parks overview',
        url: 'https://www.co.isanti.mn.us/184/Parks-Recreation',
      },
      {
        label: 'USGS 05286000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05286000/',
      },
    ],
  },
  {
    id: 'sauk-river-eagle-miller-landing',
    slug: 'sauk-river-eagle-miller-landing',
    name: 'Sauk River',
    reach: 'Eagle Park to Miller Landing',
    state: 'Minnesota',
    region: 'Central Minnesota',
    summary:
      'Friendly lower Sauk day with easy current, tree cover, and a cleaner decision than many borderline small rivers. Low water and vegetation are the main quality killers before it becomes a true no-go.',
    statusText:
      'Treat 15 to 17 ft as the best zone. Below 14 ft drifts toward scrapey late-summer conditions, and above 20 ft deserves a much more cautious flood-style read.',
    latitude: 45.51358,
    longitude: -94.30749,
    gaugeSource: {
      id: 'usgs-05270500',
      provider: 'usgs',
      siteId: '05270500',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Sauk River near St. Cloud, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 15,
      idealMax: 17,
      tooLow: 14,
      tooHigh: 20,
      thresholdSource: {
        label: 'MN DNR river-level interpretation bands for Sauk River near St. Martin',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Late spring through early fall is the core window. By late summer, low water and vegetation can drag quality down before the route fully stops working.',
      difficulty: 'easy',
      difficultyNotes:
        'Approachable for newer paddlers at sane levels, but wood, strainers, and cold-water exposure still matter more than the easy label alone implies.',
      confidenceNotes:
        'MN DNR recommends this exact trip and publishes official level guidance for the matching Sauk gauge. Confidence stays a bit below absolute because that guidance is broad and does not account for every same-day hazard on this route.',
    },
    evidenceNotes: [
      {
        label: 'DNR bands',
        value: '14 / 15 / 17 / 20 ft',
        note: 'MN DNR interprets this gauge as Scrapable below 14 ft, Low from 14 to 15, Medium from 15 to 17, High from 17 to 20, and Very High above 20.',
        sourceUrl: 'https://maps.dnr.state.mn.us/cgi-bin/mapserv?map=RL_MAPFILE&mode=nquery',
      },
      {
        label: 'Recommended trip',
        value: '8.6 miles',
        note: 'MN DNR treats Eagle Park to Miller Landing as the recommended lower Sauk day trip.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/saukriver/segments-maps.html',
      },
      {
        label: 'Low-water caution',
        value: 'Late summer can get scrapy',
        note: 'MN DNR explicitly says this segment is not recommended in late summer when the water is low and vegetation gets thick.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/saukriver/segments-maps.html',
      },
      {
        label: 'Access confidence',
        value: 'Verified',
        note: 'Eagle Park and Miller Landing both have authoritative local manager pages backing the access points.',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR river levels',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      {
        label: 'MN DNR Sauk River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/saukriver/index.html',
      },
      {
        label: 'MN DNR Sauk River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/saukriver/segments-maps.html',
      },
      {
        label: 'USGS 05270500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05270500/',
      },
      {
        label: 'City of Rockville Eagle Park',
        url: 'https://www.rockvillecity.org/eaglepark',
      },
      {
        label: 'Stearns County Miller Landing',
        url: 'https://www.stearnscountymn.gov/393/Miller-Landing',
      },
    ],
  },
  {
    id: 'snake-river-canary-cross-lake',
    slug: 'snake-river-canary-cross-lake',
    name: 'Snake River',
    reach: 'Canary Road to Cross Lake / Pine City',
    state: 'Minnesota',
    region: 'Pine City Area',
    summary:
      'Clean lower Snake day with one of the better official flow stories in the app. The Pine City gauge and the DNR-recommended route pair make this a stronger decision than many small-river adds, but quick level swings and low water below Cross Lake still matter.',
    statusText:
      'Treat 3.3 to 5.0 ft as the best window. Below 2.3 ft gets too scrapy, and above 6.3 ft is no longer the mellow all-levels day this route wants to be.',
    latitude: 45.7959352,
    longitude: -93.0796766,
    gaugeSource: {
      id: 'usgs-05338500',
      provider: 'usgs',
      siteId: '05338500',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Snake River near Pine City, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 3.3,
      idealMax: 5,
      tooLow: 2.3,
      tooHigh: 6.3,
      thresholdSource: {
        label: 'MN DNR river-level interpretation bands for Snake River near Pine City',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Spring through early fall is the practical window. The Snake rises and falls quickly, so recent weather matters almost as much as the raw reading.',
      difficulty: 'easy',
      difficultyNotes:
        'Usually approachable for most paddlers at sane levels, but wood and fast post-rain changes still deserve real attention.',
      confidenceNotes:
        "MN DNR recommends this exact trip, the Pine City gauge has official DNR level guidance, and the launch and take-out are backed by state access records.",
    },
    evidenceNotes: [
      {
        label: 'DNR bands',
        value: '2.3 / 3.3 / 5.0 / 6.3 ft',
        note: 'MN DNR interprets this gauge as Scrapable below 2.3 ft, Low from 2.3 to 3.3, Medium from 3.3 to 5.0, High from 5.0 to 6.3, and Very High above 6.3.',
        sourceUrl: 'https://maps.dnr.state.mn.us/cgi-bin/mapserv?map=RL_MAPFILE&mode=nquery',
      },
      {
        label: 'Recommended trip',
        value: '10.2 river miles',
        note: 'MN DNR treats Canary Road access to Cross Lake/Pine City as the recommended Snake River day trip for this lower corridor.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/snakeriver/segments-maps.html',
      },
      {
        label: 'Endpoint authority',
        value: 'DNR access records for both landings',
        note: 'Minnesota public-water-access data identifies the exact Snake River #1 Canary Road carry-in at river mile 22.1 and the Snake River Cross Lake landing in Pine City at river mile 11.9.',
        sourceUrl: 'https://resources.gisdata.mn.gov/pub/gdrs/data/pub/us_mn_state_dnr/struc_water_access_sites/gpkg_struc_water_access_sites.zip',
      },
      {
        label: 'Low-water caveat',
        value: 'Below Cross Lake can stop working',
        note: 'MN DNR notes that canoeing the stretch below Cross Lake may not be possible during low water, which reinforces the official low-end ladder.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/snakeriver/index.html',
      },
      {
        label: 'Take-out context',
        value: 'Pine City landing with trailer parking',
        note: 'Pine City recreation materials describe the Snake River landing across Highway 61 from Voyageur Park as a landscaped access with parking for vehicles and trailers.',
        sourceUrl: 'https://pinecitymn.gov/recreation',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR river levels',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      {
        label: 'MN DNR Snake River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/snakeriver/index.html',
      },
      {
        label: 'MN DNR Snake River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/snakeriver/segments-maps.html',
      },
      {
        label: 'MN DNR Snake River map PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/snake.pdf',
      },
      {
        label: 'Minnesota public water access dataset (GeoPackage zip)',
        url: 'https://resources.gisdata.mn.gov/pub/gdrs/data/pub/us_mn_state_dnr/struc_water_access_sites/gpkg_struc_water_access_sites.zip',
      },
      {
        label: 'City of Pine City recreation',
        url: 'https://pinecitymn.gov/recreation',
      },
      {
        label: 'USGS 05338500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05338500/',
      },
    ],
  },
  {
    id: 'snake-river-county-road-9-snake-bit',
    slug: 'snake-river-county-road-9-snake-bit',
    name: 'Snake River',
    reach: 'County Road 9 carry-in access to Snake Bit Access',
    state: 'Minnesota',
    region: 'Pine City Area',
    summary:
      'Lower Snake run below Cross Lake where the main question is simple: is Pine City clearly above the official low-water floor for the rapids below County Road 9? This is a stronger trust-first add than many lower-river candidates because the route, gauge, and low-water warning are all official.',
    statusText:
      'Treat 2.3 ft at Pine City as the conservative floor. This route improves with more water, but the app stays minimum-only because the official source is much clearer on the low side than on a polished ideal band.',
    latitude: 45.8395826,
    longitude: -92.9363969,
    gaugeSource: {
      id: 'usgs-05338500',
      provider: 'usgs',
      siteId: '05338500',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Snake River near Pine City, MN',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 2.3,
      thresholdSource: {
        label: 'MN DNR river-level interpretation bands for Snake River near Pine City',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Spring through early fall is the practical window. The Snake drains quickly, so recent rain and rising trend matter almost as much as the raw reading.',
      difficulty: 'moderate',
      difficultyNotes:
        'Class I rapids, low-water scraping, and the long runout to the St. Croix make this more than a lazy flatwater shuttle even though it is not a technical whitewater run.',
      confidenceNotes:
        'MN DNR names this lower corridor directly, the Pine City gauge is on the route, and the low-water guidance is official. Remaining uncertainty comes from the take-out: Snake Bit is clearly named on the DNR map, but public access details are clearer at the nearby Snake/St. Croix landing than at Snake Bit itself.',
    },
    evidenceNotes: [
      {
        label: 'DNR floor',
        value: '2.3 ft',
        note: 'MN DNR interprets Pine City as Scrapable below 2.3 ft and Low from 2.3 to 3.3 ft. The app uses that official floor without pretending this lower rapids stretch has a cleaner ideal band.',
        sourceUrl: 'https://maps.dnr.state.mn.us/cgi-bin/mapserv?map=RL_MAPFILE&mode=nquery',
      },
      {
        label: 'Official route shape',
        value: '11.7 river miles',
        note: 'The Snake River map names County Road 9 bridge/carry-in access at river mile 11.7 and Snake Bit Access at the St. Croix confluence.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/snake.pdf',
      },
      {
        label: 'Low-water warning',
        value: '11.7 to 10.9 not canoeable much of the year',
        note: 'MN DNR explicitly warns that the first rapids section below County Road 9 is low-water limited much of the year, which is the main reason this route is modeled as minimum-only.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/snake.pdf',
      },
      {
        label: 'Route character',
        value: 'Scattered Class I rapids to the St. Croix',
        note: 'MN DNR describes the County Road 9 to mouth corridor as scattered Class I rapids below the initial low-water-sensitive section.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/snake.pdf',
      },
      {
        label: 'Take-out anchor',
        value: 'State access at Snake/St. Croix confluence',
        note: 'Minnesota public-water-access data identifies the St. Croix River/Snake River access on the Snake River at the confluence, which is the best current access anchor for the Snake Bit finish area.',
        sourceUrl: 'https://resources.gisdata.mn.gov/pub/gdrs/data/pub/us_mn_state_dnr/struc_water_access_sites/gpkg_struc_water_access_sites.zip',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR river levels',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      {
        label: 'MN DNR Snake River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/snakeriver/index.html',
      },
      {
        label: 'MN DNR Snake River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/snakeriver/segments-maps.html',
      },
      {
        label: 'MN DNR Snake River map PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/snake.pdf',
      },
      {
        label: 'Minnesota public water access dataset (GeoPackage zip)',
        url: 'https://resources.gisdata.mn.gov/pub/gdrs/data/pub/us_mn_state_dnr/struc_water_access_sites/gpkg_struc_water_access_sites.zip',
      },
      {
        label: 'MN DNR Chengwatana State Forest map PDF',
        url: 'https://files.dnr.state.mn.us/maps/state_forests/sft00012.pdf',
      },
      {
        label: 'USGS 05338500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05338500/',
      },
    ],
  },
  {
    id: 'minnesota-river-judson-land-of-memories',
    slug: 'minnesota-river-judson-land-of-memories',
    name: 'Minnesota River',
    reach: 'Judson Access to Land of Memories Park',
    state: 'Minnesota',
    region: 'Mankato Area',
    summary:
      'Big-river Minnesota day with a better trust story than the old partial draft ever had. The route is not technical, but level, wind, sandbars, and open-water feel matter more here than on the smaller easy rivers.',
    statusText:
      'Treat 4,550 to 17,900 cfs at Mankato as the best working band. Below 566.9 cfs gets too skinny and sandy, and above 22,500 cfs is beyond the range this route should be pitched for.',
    latitude: 44.2010236,
    longitude: -94.1947673,
    gaugeSource: {
      id: 'usgs-05325000',
      provider: 'usgs',
      siteId: '05325000',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Minnesota River at Mankato, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 4550,
      idealMax: 17900,
      tooLow: 566.9,
      tooHigh: 22500,
      thresholdSource: {
        label: 'MN DNR river-level interpretation bands for Minnesota River at Mankato',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through fall is the practical window. Because this is a larger river, wind and exposed sandbars can matter as much as the raw gauge number on a given day.',
      difficulty: 'easy',
      difficultyNotes:
        'The current is usually manageable, but distance, open-water feel, wind, and motorboat-style landings make it a bigger day than a small-river easy label suggests.',
      confidenceNotes:
        'Confidence is high because MN DNR recommends this exact trip, the Mankato gauge has official level guidance, and the launch and take-out are backed by state access records. Confidence is still tempered by big-river variables like wind and sandbar exposure.',
    },
    evidenceNotes: [
      {
        label: 'DNR bands',
        value: '566.9 / 4,550 / 17,900 / 22,500 cfs',
        note: 'MN DNR interprets this gauge as Scrapable below 566.9 cfs, Low from 566.9 to 4,550, Medium from 4,550 to 17,900, High from 17,900 to 22,500, and Very High above 22,500.',
        sourceUrl: 'https://maps.dnr.state.mn.us/cgi-bin/mapserv?map=RL_MAPFILE&mode=nquery',
      },
      {
        label: 'Recommended trip',
        value: '11.1 river miles',
        note: 'MN DNR treats Judson Access to Land of Memories Park as the recommended day trip on this Mankato-area Minnesota River segment.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/minnesotariver/segments-maps.html',
      },
      {
        label: 'Endpoint authority',
        value: 'State access records on both ends',
        note: 'Minnesota public-water-access data identifies Judson Public Water Access at river mile 116.0 and Land of Memories Park Public Water Access at river mile 105.0.',
        sourceUrl: 'https://resources.gisdata.mn.gov/pub/gdrs/data/pub/us_mn_state_dnr/struc_water_access_sites/gpkg_struc_water_access_sites.zip',
      },
      {
        label: 'Primary cautions',
        value: 'Sandbars, wind, larger-river exposure',
        note: 'MN DNR highlights many sandbars on this stretch and warns paddlers not to underestimate wind and waves on larger open-water corridors.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/minnesotariver/segments-maps.html',
      },
      {
        label: 'Take-out support',
        value: 'City park with boat landing',
        note: 'Mankato describes Land of Memories Park as having a boat landing for Minnesota River access, along with campground and park amenities.',
        sourceUrl: 'https://www.mankatomn.gov/about-mankato/parks-trails-and-recreation/community-parks/land-of-memories-park',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR river levels',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      {
        label: 'MN DNR Minnesota River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/minnesotariver/index.html',
      },
      {
        label: 'MN DNR Minnesota River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/minnesotariver/segments-maps.html',
      },
      {
        label: 'Minnesota public water access dataset (GeoPackage zip)',
        url: 'https://resources.gisdata.mn.gov/pub/gdrs/data/pub/us_mn_state_dnr/struc_water_access_sites/gpkg_struc_water_access_sites.zip',
      },
      {
        label: 'City of Mankato Land of Memories Park',
        url: 'https://www.mankatomn.gov/about-mankato/parks-trails-and-recreation/community-parks/land-of-memories-park',
      },
      {
        label: 'USGS 05325000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05325000/',
      },
    ],
  },
  {
    id: 'minnesota-river-henderson-belle-plaine',
    slug: 'minnesota-river-henderson-belle-plaine',
    name: 'Minnesota River',
    reach: 'Henderson Station to Belle Plaine',
    state: 'Minnesota',
    region: 'Lower Minnesota Valley',
    summary:
      'Long lower Minnesota shuttle with a much better trust story than the old draft. It is not technical whitewater, but mileage, wind, and big-river pacing matter enough that a clean gauge read alone does not make it automatic.',
    statusText:
      'Treat 9.0 to 12.0 ft at Jordan as the best working band. Below 4.0 ft drags the pace down, and above 16.0 ft is beyond the level this route should be sold for.',
    latitude: 44.5244176,
    longitude: -93.8862799,
    gaugeSource: {
      id: 'usgs-05330000',
      provider: 'usgs',
      siteId: '05330000',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'proxy',
      siteName: 'Minnesota River near Jordan, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 9,
      idealMax: 12,
      tooLow: 4,
      tooHigh: 16,
      thresholdSource: {
        label: 'MN DNR river-level interpretation bands for Minnesota River near Jordan',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through fall is the practical window. This is a long open lower-river day, so wind and pace matter almost as much as the gauge.',
      difficulty: 'easy',
      difficultyNotes:
        'The water is usually straightforward, but 17.4 miles on the Minnesota River is still a serious day because of distance, wind exposure, and big-river landings.',
      confidenceNotes:
        'MN DNR recommends this exact trip, both ends are backed by Minnesota public-water-access records, and the Jordan USGS gauge has official DNR level guidance. Remaining uncertainty comes from the gauge sitting downstream at Thompson Ferry rather than exactly on the Henderson-to-Belle Plaine reach.',
    },
    evidenceNotes: [
      {
        label: 'DNR bands',
        value: '4.0 / 9.0 / 12.0 / 16.0 ft',
        note: 'MN DNR interprets the Jordan gauge as Scrapable below 4.0 ft, Low from 4.0 to 9.0, Medium from 9.0 to 12.0, High from 12.0 to 16.0, and Very High above 16.0.',
        sourceUrl: 'https://maps.dnr.state.mn.us/cgi-bin/mapserv?map=RL_MAPFILE&mode=nquery',
      },
      {
        label: 'Recommended trip',
        value: '17.4 river miles',
        note: 'MN DNR Map 6 lists Henderson Station carry-in access to Belle Plaine trailer access as the day-trip segment for this lower Minnesota corridor.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/minnesota6.pdf',
      },
      {
        label: 'Endpoint authority',
        value: 'State access records on both ends',
        note: 'Minnesota public-water-access data identifies Henderson Station Public Water Access at river mile 68.0 and Belle Plaine Public Water Access at river mile 50.4.',
        sourceUrl: 'https://resources.gisdata.mn.gov/pub/gdrs/data/pub/us_mn_state_dnr/struc_water_access_sites/gpkg_struc_water_access_sites.zip',
      },
      {
        label: 'Put-in support',
        value: 'County river-access park',
        note: 'Le Sueur County confirms Henderson Station River Access & Park has parking along the gravel entrance road and a walk-in launch point for canoes and kayaks into the Minnesota River.',
        sourceUrl: 'https://www.lesueurcounty.gov/Facilities/Facility/Details/Henderson-Station-River-Access-Park-6',
      },
      {
        label: 'Primary cautions',
        value: 'Long day, wind, private shoreland',
        note: 'MN DNR Map 6 tells paddlers to expect 2 to 3 river miles per hour, respect private shoreland, and not underestimate wind, waves, or obstacles.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/minnesota6.pdf',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR river levels',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      {
        label: 'MN DNR Minnesota River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/minnesotariver/index.html',
      },
      {
        label: 'MN DNR Minnesota River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/minnesotariver/segments-maps.html',
      },
      {
        label: 'MN DNR Minnesota River map 6 PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/minnesota6.pdf',
      },
      {
        label: 'Minnesota public water access dataset (GeoPackage zip)',
        url: 'https://resources.gisdata.mn.gov/pub/gdrs/data/pub/us_mn_state_dnr/struc_water_access_sites/gpkg_struc_water_access_sites.zip',
      },
      {
        label: 'Le Sueur County Henderson Station River Access & Park',
        url: 'https://www.lesueurcounty.gov/Facilities/Facility/Details/Henderson-Station-River-Access-Park-6',
      },
      {
        label: 'USGS 05330000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/05330000/',
      },
    ],
  },
  {
    id: 'mississippi-river-east-river-flats-hidden-falls',
    slug: 'mississippi-river-east-river-flats-hidden-falls',
    name: 'Mississippi River',
    reach: 'East River Flats to Hidden Falls Regional Park',
    state: 'Minnesota',
    region: 'Twin Cities',
    summary:
      'Short urban Mississippi day with a much stronger trust story than most metro additions. The route itself is officially recommended by DNR, but swift current, large wakes, and Lock and Dam 1 logistics matter more here than the mileage suggests.',
    statusText:
      'Treat 6,000 to 30,000 cfs at St. Paul as the best working band. Below 2,000 cfs gets too low for this route model, and above 40,000 cfs is beyond the level this route should be sold for.',
    latitude: 44.9703514,
    longitude: -93.2350599,
    gaugeSource: {
      id: 'usgs-05331000',
      provider: 'usgs',
      siteId: '05331000',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'proxy',
      siteName: 'Mississippi River at St. Paul, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 6000,
      idealMax: 30000,
      tooLow: 2000,
      tooHigh: 40000,
      thresholdSource: {
        label: 'MN DNR river-level interpretation bands for Mississippi River at St. Paul',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through fall is the practical season. Recent rain matters, but this route is more likely to be ruled by commercial traffic, lock status, and wind exposure than by tiny day-to-day gauge wiggles.',
      difficulty: 'moderate',
      difficultyNotes:
        'This is not technical whitewater, but it is not a casual flatwater float either. Swift current, barge wakes, urban boat traffic, and lock or portage logistics demand solid boat handling and decision-making.',
      confidenceNotes:
        'Confidence is high because MN DNR recommends this exact trip, the St. Paul gauge has official level guidance, Hidden Falls has a clearly documented public launch, and NPS has current lock and portage guidance. Confidence is still tempered because the gauge is downstream of the route and East River Flats has thinner launch detail than the take-out.',
    },
    evidenceNotes: [
      {
        label: 'DNR bands',
        value: '2,000 / 6,000 / 30,000 / 40,000 cfs',
        note: 'MN DNR interprets the St. Paul reading as Scrapable below 2,000 cfs, Low from 2,000 to 6,000, Medium from 6,000 to 30,000, High from 30,000 to 40,000, and Very High above 40,000.',
        sourceUrl: 'https://maps.dnr.state.mn.us/cgi-bin/mapserv?map=RL_MAPFILE&mode=nquery',
      },
      {
        label: 'Recommended trip',
        value: '5 river miles / about 2 hours',
        note: 'MN DNR explicitly recommends East River Flats Park to Hidden Falls Park as the first of its two Mississippi River recommended paddling trips.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/recommended/miss1.html',
      },
      {
        label: 'Route character',
        value: 'Swift current, large wakes, navigational lock',
        note: 'DNR says this stretch requires a moderate degree of paddling skill because of swift current and large wakes from large boats and barges, and tells paddlers to follow navigational lock procedures.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/recommended/miss1.html',
      },
      {
        label: 'Take-out support',
        value: 'Hidden Falls boat launch and posted hours',
        note: 'Saint Paul identifies Hidden Falls Regional Park as a Mississippi River boat-launch site with north-entrance access, sunrise-to-10 p.m. hours, and closures possible during flooding or other conditions.',
        sourceUrl: 'https://www.stpaul.gov/facilities/hidden-falls-regional-park',
      },
      {
        label: 'Lock and Dam 1 backup plan',
        value: 'Use lock when open; portage is 1.40 miles',
        note: 'NPS advises using Lock and Dam 1 when operational because the portage is long. The current portage was updated in September 2025, is about 1.40 miles, and is not yet signed.',
        sourceUrl: 'https://www.nps.gov/miss/planyourvisit/navigating-portages-locks-and-dams.htm',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR river levels',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      {
        label: 'MN DNR Mississippi River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/mississippiriver/index.html',
      },
      {
        label: 'MN DNR recommended paddling trip: East River Flats to Hidden Falls',
        url: 'https://www.dnr.state.mn.us/watertrails/recommended/miss1.html',
      },
      {
        label: 'MN DNR Mississippi River map 10 PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/mississippi10.pdf',
      },
      {
        label: 'Minneapolis Parks East River Flats Park',
        url: 'https://www.minneapolisparks.org/parks-destinations/parks-lakes/east_river_flats_park/',
      },
      {
        label: 'Saint Paul Hidden Falls Regional Park',
        url: 'https://www.stpaul.gov/facilities/hidden-falls-regional-park',
      },
      {
        label: 'NPS navigating portages, locks, and dams',
        url: 'https://www.nps.gov/miss/planyourvisit/navigating-portages-locks-and-dams.htm',
      },
      {
        label: 'USGS 05331000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05331000/',
      },
    ],
  },
  {
    id: 'snake-river-county-road-3-mora',
    slug: 'snake-river-county-road-3-mora',
    name: 'Snake River',
    reach: 'County Road 3 to Canoe Park (Mora)',
    state: 'Minnesota',
    region: 'Mora Area',
    summary:
      'Long Mora-area Snake River day with enough mileage that the wrong water level can waste the day. The Pine City gauge still gives us a workable official ladder, but this upstream segment also depends on fresh wood and real local read-the-river judgment.',
    statusText:
      'Treat 3.3 to 5.0 ft as the best window. Below 2.3 ft gets too scrapy, and above 6.3 ft is no longer the mellow family-style day this route wants to be.',
    latitude: 45.9529532,
    longitude: -93.27082115,
    gaugeSource: {
      id: 'usgs-05338500',
      provider: 'usgs',
      siteId: '05338500',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Snake River near Pine City, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 3.3,
      idealMax: 5,
      tooLow: 2.3,
      tooHigh: 6.3,
      thresholdSource: {
        label: 'MN DNR river-level interpretation bands for Snake River near Pine City',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Spring through early fall is the practical window. Recent storms matter more than the calendar because fresh wood and rising current can change the day fast.',
      difficulty: 'easy',
      difficultyNotes:
        'Mostly approachable at normal levels, but a 15-mile Mora day is still a real effort and higher water can turn a mellow shuttle float into a stronger moving-water commitment.',
      confidenceNotes:
        'The Pine City gauge has official DNR level guidance, but this Mora segment still relies more on local route knowledge than the better-documented lower Snake trips. Confidence is tempered by route length, wood, and access details that are lighter than on the lower river.',
    },
    evidenceNotes: [
      {
        label: 'DNR bands',
        value: '2.3 / 3.3 / 5.0 / 6.3 ft',
        note: 'MN DNR interprets this gauge as Scrapable below 2.3 ft, Low from 2.3 to 3.3, Medium from 3.3 to 5.0, High from 5.0 to 6.3, and Very High above 6.3.',
        sourceUrl: 'https://maps.dnr.state.mn.us/cgi-bin/mapserv?map=RL_MAPFILE&mode=nquery',
      },
      {
        label: 'Trip length',
        value: '15 miles',
        note: 'The Mora Snake River Canoe Race uses this County Road 3 to Canoe Park corridor as a full-day route.',
        sourceUrl: 'https://vasaloppet.us/calendar/canoe-and-kayak-race/',
      },
      {
        label: 'Access confidence',
        value: 'Local mapped landings',
        note: 'County Road 3 and Canoe Park are clean named landings in the carried-over route data and race materials, but not the same official DNR park-to-park pair used on the lower Snake route.',
        sourceUrl: 'https://vasaloppet.us/snake-river-canoe-race/',
      },
      {
        label: 'Primary caution',
        value: 'Storm debris',
        note: 'After storms or high water, expect new strainers and obstructions that the gauge alone cannot fully price in.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/snakeriver/index.html',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR river levels',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      {
        label: 'MN DNR Snake River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/snakeriver/index.html',
      },
      {
        label: 'MN DNR Snake River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/snakeriver/segments-maps.html',
      },
      {
        label: 'MN DNR Snake River map PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/snake.pdf',
      },
      {
        label: 'Vasaloppet Snake River Canoe Race',
        url: 'https://vasaloppet.us/snake-river-canoe-race/',
      },
      {
        label: 'USGS 05338500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05338500/',
      },
    ],
  },
  {
    id: 'north-fork-crow-river-riverside-dayton',
    slug: 'north-fork-crow-river-riverside-dayton',
    name: 'North Fork Crow River',
    reach: 'Riverside County Park to Dayton',
    state: 'Minnesota',
    region: 'Twin Cities Northwest Metro',
    summary:
      'Long lower North Fork Crow run with enough mileage that level still matters even though the river is not especially technical. The Dayton end is well-supported, and the DNR ladder finally gives this corridor a real launchability band.',
    statusText:
      'Treat 500 to 1,500 cfs as the best zone on the lower North Fork Crow. Below 345 cfs gets too scrapy for a long day, and above 1,750 cfs is no longer a broad-audience same-day recommendation.',
    latitude: 45.20486,
    longitude: -93.5813,
    gaugeSource: {
      id: 'usgs-05280400',
      provider: 'usgs',
      siteId: '05280400',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Crow River below State Hwy 101 at Dayton, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 500,
      idealMax: 1500,
      tooLow: 345,
      tooHigh: 1750,
      thresholdSource: {
        label: 'MN DNR river-level interpretation bands for North Fork Crow River near Rockford',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through early fall is the main window. Summer can still work, but low water drags down a 15-mile day quickly and flood debris still matters after storms.',
      difficulty: 'moderate',
      difficultyNotes:
        'Not especially technical at sane levels, but 15-plus miles, wood, and a lower-river shuttle make this more of a committed river day than a casual park float.',
      confidenceNotes:
        'This route now has both official access support and official DNR level guidance for the lower North Fork Crow corridor. Remaining uncertainty comes from the route length and the fact that strainers, fatigue, and storm debris still matter beyond the raw number.',
    },
    evidenceNotes: [
      {
        label: 'DNR bands',
        value: '345 / 500–1,500 / 1,750 cfs',
        note: 'MN DNR interprets the lower North Fork Crow gauge as Scrapable below 345 cfs, Low from 345 to 500, Medium from 500 to 1,500, High from 1,500 to 1,750, and Very High above 1,750.',
        sourceUrl: 'https://maps.dnr.state.mn.us/cgi-bin/mapserv?map=RL_MAPFILE&mode=nquery',
      },
      {
        label: 'Trip length',
        value: '15.3 miles',
        note: 'This is a long lower-river day. Low water and fatigue matter more here than on a short metro paddle.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/northforkcrow2.pdf',
      },
      {
        label: 'Access confidence',
        value: 'Verified',
        note: 'Both Riverside County Park and the Dayton/Crow-Mississippi access are backed by DNR access-guide material and local manager pages.',
      },
      {
        label: 'Primary caution',
        value: 'Wood after rain',
        note: 'Treat storms and recent high water as a stronger caution signal than the gauge alone, especially on a long route with fewer quick exit options.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/crowrivernorthfork/index.html',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR river levels',
        url: 'https://www.dnr.state.mn.us/river_levels/index.html',
      },
      {
        label: 'MN DNR North Fork Crow overview',
        url: 'https://www.dnr.state.mn.us/watertrails/crowrivernorthfork/index.html',
      },
      {
        label: 'MN DNR North Fork Crow segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/crowrivernorthfork/segments-maps.html',
      },
      {
        label: 'MN DNR North Fork Crow map PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/northforkcrow2.pdf',
      },
      {
        label: 'USGS 05280400 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05280400/',
      },
      {
        label: 'MN DNR Crow access guide',
        url: 'https://www.dnr.state.mn.us/areas/fisheries/saukrapids/crow_river_access.html',
      },
    ],
  },
  {
    id: 'minnehaha-creek-grays-bay-longfellow-lagoon',
    slug: 'minnehaha-creek-grays-bay-longfellow-lagoon',
    name: 'Minnehaha Creek',
    reach: "Gray's Bay to Longfellow Lagoon",
    state: 'Minnesota',
    region: 'Twin Cities West Metro',
    summary:
      'Urban Minnehaha Creek corridor with many designated landings, but it only works when the Hiawatha gauge is inside the MCWD paddling band. Low water means scraping and portaging; high water turns bridges, rapids, and bends into a bad decision fast.',
    statusText:
      'MCWD recommends paddling only between 75 and 150 cfs at Hiawatha. Below that gets scrape-heavy, and above that the creek becomes difficult to navigate safely under bridges and through faster features.',
    latitude: 44.9572,
    longitude: -93.3513,
    gaugeSource: {
      id: 'usgs-05289800',
      provider: 'usgs',
      siteId: '05289800',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Minnehaha Creek at Hiawatha Ave. in Minneapolis, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 75,
      idealMax: 150,
      tooLow: 75,
      tooHigh: 150,
      thresholdSource: {
        label: 'Minnehaha Creek Watershed District paddling guidance',
        url: 'https://minnehahacreek.org/explore/watershed-places/paddle-minnehaha-creek/',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'high',
      windSensitivity: 0.8,
      seasonMonths: [5, 6, 7, 8, 9],
      seasonNotes:
        'Warm-season paddling only. This creek is flow-sensitive, bridge-heavy, and much less forgiving after rain or in cold shoulder-season water.',
      difficulty: 'easy',
      difficultyNotes:
        'Technically approachable at proper flows, but urban obstacles, low bridges, portages, and fast post-rain current make this more than a blind beginner yes.',
      confidenceNotes:
        'MCWD publishes an official paddling band and explicitly ties it to the live USGS Hiawatha gauge, which makes this a well-supported route. The main limitation is the creek itself: bridge clearance, wood, and urban obstacles can change the day even inside the official flow range.',
    },
    evidenceNotes: [
      {
        label: 'Official band',
        value: '75 to 150 cfs',
        note: 'MCWD says ideal paddling conditions are when the Hiawatha gauge reads between 75 and 150 cfs.',
        sourceUrl: 'https://minnehahacreek.org/explore/watershed-places/paddle-minnehaha-creek/',
      },
      {
        label: 'Below range',
        value: 'Poor',
        note: 'MCWD says below 75 cfs you may need to portage over portions of the creek.',
        sourceUrl: 'https://minnehahacreek.org/explore/watershed-places/paddle-minnehaha-creek/',
      },
      {
        label: 'Above range',
        value: 'Dangerous',
        note: 'MCWD says above 150 cfs it becomes difficult to navigate through fast-moving rapids and under bridges.',
        sourceUrl: 'https://minnehahacreek.org/explore/watershed-places/paddle-minnehaha-creek/',
      },
      {
        label: 'Trip length',
        value: '21.3 miles',
        note: 'MCWD treats the entire creek from Gray\'s Bay headwaters to Longfellow Lagoon as about 6 to 9 hours, with shorter official sub-segments in between.',
        sourceUrl: 'https://minnehahacreek.org/explore/watershed-places/paddle-minnehaha-creek/',
      },
    ],
    sourceLinks: [
      {
        label: 'MCWD Paddle Minnehaha Creek',
        url: 'https://minnehahacreek.org/explore/watershed-places/paddle-minnehaha-creek/',
      },
      {
        label: 'MCWD paddling map PDF',
        url: 'https://minnehahacreek.org/wp-content/uploads/2023/04/MCWD-Creek-Map-2018-FINAL-tagged.pdf',
      },
      {
        label: 'USGS 05289800 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05289800/',
      },
      {
        label: "MCWD Gray's Bay Dam operations",
        url: 'https://minnehahacreek.org/explore/grays-bay-dam/grays-bay-dam-operations/',
      },
    ],
  },
  {
    id: 'cloquet-river-island-lake-bachelor-road',
    slug: 'cloquet-river-island-lake-bachelor-road',
    name: 'Cloquet River',
    reach: 'Island Lake Dam to Bachelor Road',
    state: 'Minnesota',
    region: 'Duluth Area',
    summary:
      'Official lower-Cloquet day with dam-release-dependent current, Class I-II rapids, and a cleaner trust story than most unsurfaced Minnesota route gaps. The gauge is direct and the route is official, but the app still treats this as a conservative low-floor call instead of inventing a polished sweet spot.',
    statusText:
      'Treat about 175 cfs as the low-water floor. Around 350 cfs and up is the stronger May-June paddling target when releases allow, but there is no published route-specific upper band.',
    latitude: 46.9912948,
    longitude: -92.225418,
    gaugeSource: {
      id: 'usgs-04021960',
      provider: 'usgs',
      siteId: '04021960',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Cloquet River near Island Lake, MN',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 175,
      thresholdSource: {
        label: 'MN DNR Cloquet River release guidance for Island Lake Dam to Bachelor Road',
        url: 'https://www.dnr.state.mn.us/watertrails/cloquetriver/segments-maps.html',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'medium',
      seasonMonths: [5, 6, 7, 8, 9],
      seasonNotes:
        'Late spring through early fall is the practical window. This segment depends more on Island Lake Dam release conditions than on broad seasonal norms, so same-day flow matters more than the calendar.',
      difficulty: 'moderate',
      difficultyNotes:
        'Mostly Class I current with a few Class II rapids. A workable gauge does not remove the need to scout and portage, especially for less experienced paddlers.',
      confidenceNotes:
        'MN DNR recommends this trip, the gauge is direct, and the low-flow guidance is official. Remaining uncertainty comes from the source giving a low-water floor and a better May-June target, not a full upper range, and from Bachelor Road having limited public access detail.',
    },
    evidenceNotes: [
      {
        label: 'Official route',
        value: '8.1 river miles',
        note: 'MN DNR treats Island Lake Dam carry-in access to Bachelor Road access as the recommended Cloquet River day trip on Map 1.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/cloquetriver/segments-maps.html',
      },
      {
        label: 'Official low-flow guidance',
        value: '350 cfs in May-June; 175 cfs in summer',
        note: 'MN DNR says 350 cfs in May and June offers good paddling, while 175 cfs during the rest of the summer still usually allows floating down the rapids with some scraping and occasional river walking.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/cloquet1.pdf',
      },
      {
        label: 'Access support',
        value: 'Carry-in dam launch to trailer access',
        note: 'MN DNR Map 1 names Island Lake Dam carry-in access at river mile 28.6 and Bachelor Road trailer access at river mile 20.5.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/cloquet1.pdf',
      },
      {
        label: 'Primary hazards',
        value: 'Class I-II rapids and release swings',
        note: 'MN DNR says rapids are Class I-II, advises scouting before proceeding, and notes that flow depends on Island Lake Dam releases.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/cloquetriver/segments-maps.html',
      },
      {
        label: 'Camping context',
        value: 'Primitive DNR watercraft campsites',
        note: 'MN DNR says this stretch includes numerous primitive first-come watercraft campsites on DNR-managed property.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/cloquetriver/segments-maps.html',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR Cloquet River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/cloquetriver/index.html',
      },
      {
        label: 'MN DNR Cloquet River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/cloquetriver/segments-maps.html',
      },
      {
        label: 'MN DNR Cloquet River Map 1 PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/cloquet1.pdf',
      },
      {
        label: 'USGS 04021960 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-04021960/',
      },
      {
        label: 'Minnesota Power reservoir recreation information',
        url: 'https://www.mpland.com/Recreation/Reservoirs',
      },
    ],
  },
  {
    id: 'zumbro-river-falls',
    slug: 'zumbro-river-falls',
    name: 'Zumbro River',
    reach: 'Green Bridge to Zumbro Falls',
    state: 'Minnesota',
    region: 'Southeast Minnesota',
    summary:
      'Classic Driftless-style paddle with a moderate target band. Flashy rainfall response means rising water can turn this from fun to pushy quickly.',
    statusText:
      'Best in the 7 to 9 ft sweet spot. It can still work below that, but quality and margin drop quickly, and post-rain spikes matter more than the raw number.',
    latitude: 44.2335481,
    longitude: -92.4820266,
    gaugeSource: {
      id: 'usgs-05374000',
      provider: 'usgs',
      siteId: '05374000',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Zumbro River at Zumbro Falls, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 7,
      idealMax: 9,
      tooLow: 5.5,
      tooHigh: 11.5,
      thresholdSource: {
        label: 'MilesPaddled Zumbro River I numeric range notes',
        url: 'https://milespaddled.com/zumbro-river-i/',
      },
      thresholdSourceStrength: 'mixed',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes: 'Most reliable from spring into early fall, but heavy rain matters more than the calendar here.',
      difficulty: 'moderate',
      difficultyNotes: 'Moderate when levels are normal. Flash flooding and fresh strainers can quickly change the day.',
      confidenceNotes:
        'The numeric bands remain partly guidebook and community-derived. Official DNR materials support the same segment choice and confirm that this reach stays lively even at moderate levels and can flash flood after rain.',
    },
    evidenceNotes: [
      {
        label: 'Preferred band',
        value: '7 to 9 ft',
        note: 'Operational sweet spot from the same-segment MilesPaddled report, which also treats 5.5 ft as the lowest recommended level and 12 ft as high by DNR map reference.',
        sourceUrl: 'https://milespaddled.com/zumbro-river-i/',
      },
      {
        label: 'Lowest recommended',
        value: '5.5 ft',
        note: 'The same segment was paddled and described as the lowest recommended level at 5.5 ft on November 4, 2023.',
        sourceUrl: 'https://milespaddled.com/zumbro-river-i/',
      },
      {
        label: 'Flashiness',
        value: 'High rainfall response',
        note: 'Heavy rain should lower confidence even if the latest reading looks acceptable.',
      },
      {
        label: 'DNR route context',
        value: 'Recommended day trip with lively current',
        note: 'MN DNR recommends Green Bridge to Zumbro Falls and warns that the river stays lively even at moderate levels and can flash flood after storms.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/zumbro1.pdf',
      },
      {
        label: 'Difficulty',
        value: 'Moderate',
        note: 'Moderate only when wood and flood risk are under control.',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR Zumbro River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/zumbroriver/segments-maps.html',
      },
      {
        label: 'MN DNR Zumbro River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/zumbroriver/index.html',
      },
      {
        label: 'MN DNR Zumbro map 1 PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/zumbro1.pdf',
      },
      {
        label: 'USGS 05374000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/05374000/',
      },
      {
        label: 'MilesPaddled Zumbro River I',
        url: 'https://milespaddled.com/zumbro-river-i/',
      },
    ],
  },
  {
    id: 'iowa-river-sturgis-ferry-hills-access',
    slug: 'iowa-river-sturgis-ferry-hills-access',
    name: 'Iowa River',
    reach: 'Sturgis Ferry Park to Hills Access',
    state: 'Iowa',
    region: 'Iowa City Area',
    summary:
      'Straightforward Johnson County water-trail day from Iowa City to Hills. The access story is strong and the Iowa City gauge is direct, but the threshold model stays conservative because there is no published paddling ladder for this reach.',
    statusText:
      'Treat roughly 200 cfs at Iowa City as the conservative floor. This route has handled higher official event days too, but there is not a published upper paddling band for this segment.',
    latitude: 41.640199994977,
    longitude: -91.538966712124,
    gaugeSource: {
      id: 'usgs-05454500',
      provider: 'usgs',
      siteId: '05454500',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Iowa River at Iowa City, IA',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 200,
      thresholdSource: {
        label: 'Johnson County Iowa River Clean Up history for the Sturgis Ferry to Hills reach',
        url: 'https://www.johnsoncountyiowa.gov/iowa-river-clean',
      },
      thresholdSourceStrength: 'derived',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Spring through fall is the practical window. This is a broader Iowa River float than the tiny creeks in the app, so recent rain, debris, and muddy landings still matter even when the route is not technical.',
      difficulty: 'easy',
      difficultyNotes:
        'Usually an approachable downstream day, but nine-plus miles, storm wood, and soft river banks keep it from being a blind beginner yes.',
      confidenceNotes:
        'The route is official and the gauge is direct. Confidence is capped mainly by level guidance: Johnson County clearly uses this exact reach at flows from about 200 to 830 cfs, but there is still no published paddling guide for the Iowa City gauge, so the app only claims a conservative low-water floor.',
    },
    evidenceNotes: [
      {
        label: 'Official route',
        value: '9.25 miles',
        note: 'Johnson County publishes Sturgis Ferry Park to Hills Access as the opening Johnson County segment of the Iowa River Water Trail.',
        sourceUrl: 'https://johnsoncountyiowa.gov/sites/default/files/2021-05/Iowa_River_Water_Trail.pdf',
      },
      {
        label: 'Access support',
        value: 'City launch to county ramp',
        note: 'Iowa City lists Sturgis Ferry Park with a boat ramp, parking, restrooms, and a 2024 renovation, while Johnson County says Hills Access has a boat ramp, parking, water, restrooms, playground, and camping.',
        sourceUrl: 'https://www.icgov.org/Home/Components/FacilityDirectory/FacilityDirectory/82/252?npage=2',
      },
      {
        label: 'Observed working levels',
        value: 'Official events at 200 to 830 cfs',
        note: 'Johnson County cleanup records show this exact Sturgis Ferry to Hills route running at 200, 228, 281, 420, 804, and 830 cfs. The app uses 200 cfs only as a conservative floor, not as a claimed sweet spot.',
        sourceUrl: 'https://www.johnsoncountyiowa.gov/iowa-river-clean',
      },
      {
        label: 'Route character',
        value: 'Urban edge into bottomland forest',
        note: 'Johnson County describes the first half as light industry and cabin-lined banks, with longer forested bottomland miles in the latter half.',
        sourceUrl: 'https://johnsoncountyiowa.gov/sites/default/files/2021-05/Iowa_River_Water_Trail.pdf',
      },
      {
        label: 'Take-out operations',
        value: 'Seasonal campground and ramp support',
        note: 'Johnson County says Hills Access offers a boat ramp, vault toilets, water, playground, and seasonal camping, with the campground typically open from April 15 to October 15.',
        sourceUrl: 'https://www.johnsoncountyiowa.gov/sites/default/files/2025-02/Hills%20Campground%20and%20Access.pdf',
      },
      {
        label: 'Shore-use caveat',
        value: 'Archery / falconry use east of the river',
        note: 'Johnson County notes that the area east of the Iowa River at Hills Access is limited to archery or falconry hunting only, which is useful context if you are exploring around the take-out.',
        sourceUrl: 'https://www.johnsoncountyiowa.gov/conservation/public-use-areas',
      },
      {
        label: 'Decision style',
        value: 'Conservative low-floor only',
        note: 'This route has stronger access support than threshold support. Use the gauge to avoid obvious low-water days, then judge debris, mud, and recent weather the same day.',
      },
    ],
    sourceLinks: [
      {
        label: 'Johnson County Iowa River Water Trail PDF',
        url: 'https://johnsoncountyiowa.gov/sites/default/files/2021-05/Iowa_River_Water_Trail.pdf',
      },
      {
        label: 'Iowa City Sturgis Ferry Park page',
        url: 'https://www.icgov.org/Home/Components/FacilityDirectory/FacilityDirectory/82/252?npage=2',
      },
      {
        label: 'Johnson County camping information',
        url: 'https://johnsoncountyiowa.gov/conservation/camping',
      },
      {
        label: 'Johnson County Hills Access PDF',
        url: 'https://www.johnsoncountyiowa.gov/sites/default/files/2025-02/Hills%20Campground%20and%20Access.pdf',
      },
      {
        label: 'Johnson County public use areas',
        url: 'https://johnsoncountyiowa.gov/conservation/public-use-areas',
      },
      {
        label: 'Johnson County conservation rules and regulations',
        url: 'https://www.johnsoncountyiowa.gov/conservation/rules-and-regulations',
      },
      {
        label: 'Johnson County Iowa River Clean Up',
        url: 'https://www.johnsoncountyiowa.gov/iowa-river-clean',
      },
      {
        label: 'USGS 05454500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05454500/',
      },
    ],
  },
  {
    id: 'black-hawk-creek-hudson-waterloo',
    slug: 'black-hawk-creek-hudson-waterloo',
    name: 'Black Hawk Creek',
    reach: 'Franck Park to Ranchero Road',
    state: 'Iowa',
    region: 'Cedar Valley',
    summary:
      'Tight, obstructed creek run from Hudson into Waterloo. Gauge range matters, but wood, portages, and technical maneuvering matter just as much.',
    statusText:
      'Only consider this when Hudson is inside the published 100 to 500 cfs band. Even then, this is a skilled-creek call, not a casual yes.',
    latitude: 42.430765,
    longitude: -92.43989,
    gaugeSource: {
      id: 'usgs-05463500',
      provider: 'usgs',
      siteId: '05463500',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Black Hawk Creek at Hudson, IA',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 100,
      idealMax: 500,
      tooLow: 100,
      tooHigh: 500,
      thresholdSource: {
        label: 'Iowa DNR Black Hawk Creek Water Trail brochure',
        url: 'https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/watertrails/watertrail_blackhawk.pdf',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes: 'Warm-season paddling only. Recent storms can add fresh wood and strainers fast on this narrow creek.',
      difficulty: 'hard',
      difficultyNotes:
        'The Iowa DNR brochure says this is not the best choice for novice paddlers. Expect strainers, deadfalls, portages, and tight maneuvering.',
      confidenceNotes:
        'The 100 to 500 cfs range comes directly from an Iowa DNR brochure. Confidence is still capped by the creek itself, because new wood and obstructions can change the day even when the gauge is in range.',
    },
    evidenceNotes: [
      {
        label: 'Published flow range',
        value: '100 to 500 cfs',
        note: 'Iowa DNR publishes this as the recommended range for safe and enjoyable paddling at the Hudson gauge.',
        sourceUrl: 'https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/watertrails/watertrail_blackhawk.pdf',
      },
      {
        label: 'Difficulty',
        value: 'Hard',
        note: 'The brochure explicitly says this is not the best choice for novice paddlers.',
        sourceUrl: 'https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/watertrails/watertrail_blackhawk.pdf',
      },
      {
        label: 'Primary hazards',
        value: 'Wood, strainers, and portages',
        note: 'The official water-trail brochure calls out frequent deadfalls, strainers, and two fords that can behave like low-head dam hazards.',
        sourceUrl: 'https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/watertrails/watertrail_blackhawk.pdf',
      },
      {
        label: 'Decision style',
        value: 'Conservative',
        note: 'A good gauge reading does not erase fresh storm damage. If you cannot scout and portage confidently, skip it.',
      },
    ],
    sourceLinks: [
      {
        label: 'Iowa DNR Black Hawk Creek Water Trail brochure',
        url: 'https://www.iowadnr.gov/Portals/idnr/uploads/riverprograms/watertrails/watertrail_blackhawk.pdf',
      },
      {
        label: 'USGS 05463500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05463500/',
      },
      {
        label: 'Cedar Valley Water Trails master plan notes',
        url: 'https://cedarvalleywatertrails.wordpress.com/master-plan/recommendations/hudson/',
      },
    ],
  },
  {
    id: 'rice-creek-peltier-to-long-lake',
    slug: 'rice-creek-peltier-to-long-lake',
    name: 'Rice Creek',
    reach: 'Peltier Lake to Long Lake',
    state: 'Minnesota',
    region: 'Twin Cities North Metro',
    summary:
      'Lake-and-creek water trail where the official water-level band and wind across the lake chain matter more than raw mileage.',
    statusText:
      'Treat this as in play only when Rice Creek is inside the official 6.30 to 7.90 ft passable band and wind on the lake section looks manageable.',
    latitude: 45.127788,
    longitude: -93.134827,
    gaugeSource: {
      id: 'usgs-05288580',
      provider: 'usgs',
      siteId: '05288580',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Rice Creek near New Brighton, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 6.3,
      idealMax: 7.9,
      tooLow: 6.3,
      tooHigh: 7.9,
      thresholdSource: {
        label: 'Rice Creek Watershed District water-level guidance',
        url: 'https://www.ricecreek.org/the-watershed/rice-creek-water-trail/',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Late spring through early fall is the practical window. Lake wind matters almost as much as the gauge on this route.',
      difficulty: 'easy',
      difficultyNotes:
        'Technically easy when levels cooperate, but lake exposure, culverts, and occasional portages change the day quality.',
      confidenceNotes:
        'The passable 6.30 to 7.90 ft band comes directly from the Rice Creek Watershed District. The remaining uncertainty is mostly wind on the lake crossings and whether a portage is needed at road or fish-barrier crossings.',
    },
    evidenceNotes: [
      {
        label: 'Published level band',
        value: '6.30 to 7.90 ft',
        note: 'Rice Creek Watershed District publishes this as the passable water-level recommendation.',
        sourceUrl: 'https://www.ricecreek.org/the-watershed/rice-creek-water-trail/',
      },
      {
        label: 'Route shape',
        value: 'Five lakes before the creek narrows',
        note: 'The upstream miles are lake crossings, so wind can matter more than the gauge suggests.',
        sourceUrl: 'https://www.anokacountymn.gov/DocumentCenter/View/10433/Rice-Creek-Water-Trail',
      },
      {
        label: 'Portage note',
        value: 'County Road I may require a portage in high water',
        note: 'The official trail map flags County Road I as a possible high-water portage point.',
        sourceUrl: 'https://www.anokacountymn.gov/DocumentCenter/View/10433/Rice-Creek-Water-Trail',
      },
      {
        label: 'Barrier note',
        value: 'Fish barrier near Long Lake',
        note: 'The downstream end can require a portage near the Long Lake fish barrier depending on posted conditions.',
        sourceUrl: 'https://www.anokacountymn.gov/DocumentCenter/View/10433/Rice-Creek-Water-Trail',
      },
    ],
    sourceLinks: [
      {
        label: 'Rice Creek Watershed District water-trail guidance',
        url: 'https://www.ricecreek.org/the-watershed/rice-creek-water-trail/',
      },
      {
        label: 'Anoka County Rice Creek Water Trail map',
        url: 'https://www.anokacountymn.gov/DocumentCenter/View/10433/Rice-Creek-Water-Trail',
      },
      {
        label: 'USGS 05288580 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/05288580/',
      },
      {
        label: 'Anoka County Parks Rice Creek overview',
        url: 'https://www.anokacountyparks.com/rice-creek-water-trail',
      },
    ],
  },
  {
    id: 'kettle-river-lower-kettle-5-to-6',
    slug: 'kettle-river-lower-kettle-5-to-6',
    name: 'Kettle River',
    reach: '#5 trailer access to #6 trailer access',
    state: 'Minnesota',
    region: 'East Central Minnesota',
    summary:
      'Lower-Kettle day trip that is mostly flatwater, but still runoff-sensitive and noticeably pushier when the Sandstone gauge climbs.',
    statusText:
      'Treat this as in play when the Sandstone gauge is roughly 6 to 10 ft. Below that gets bony; above that loses margin quickly.',
    latitude: 46.0107725,
    longitude: -92.8407339,
    gaugeSource: {
      id: 'usgs-05336700',
      provider: 'usgs',
      siteId: '05336700',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Kettle River near Sandstone, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 6,
      idealMax: 10,
      tooLow: 6,
      tooHigh: 10,
      thresholdSource: {
        label: 'American Whitewater Lower Kettle gauge info',
        url: 'https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=4091',
      },
      thresholdSourceStrength: 'mixed',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Spring through early fall is the practical window. Rain-driven spikes matter more than the calendar on this runoff-fed reach.',
      difficulty: 'moderate',
      difficultyNotes:
        'Mostly flatwater, but it is still a real river day with one Class I rapid and stronger current after storms.',
      confidenceNotes:
        'The 6 to 10 ft band comes from American Whitewater rather than MN DNR. Official DNR materials support the same day-trip reach and its mostly flatwater character, but not the exact numeric thresholds.',
    },
    evidenceNotes: [
      {
        label: 'Working gauge band',
        value: '6.0 to 10.0 ft',
        note: 'American Whitewater lists this as the Lower Kettle gauge range at Sandstone for the same reach family.',
        sourceUrl: 'https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=4091',
      },
      {
        label: 'DNR route context',
        value: 'Mostly flat water, one Class I rapid',
        note: 'MN DNR Map 2 describes the #5 to #6 day trip as mostly flat water with a noted Class I rapid around river mile 11.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/kettle2.pdf',
      },
      {
        label: 'Flow style',
        value: 'Runoff sensitive',
        note: 'The Sandstone gauge trend matters almost as much as the current reading because this reach responds to rain and spring runoff.',
      },
      {
        label: 'Difficulty',
        value: 'Moderate',
        note: 'This is not technical whitewater, but it is still a longer river day that deserves respect once levels rise.',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR Kettle River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/kettleriver/segments-maps.html',
      },
      {
        label: 'MN DNR Kettle River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/kettleriver/index.html',
      },
      {
        label: 'MN DNR Kettle River Map 2 PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/kettle2.pdf',
      },
      {
        label: 'USGS 05336700 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05336700/',
      },
      {
        label: 'American Whitewater Lower Kettle gauge info',
        url: 'https://www.americanwhitewater.org/content/River/show-gauge-info/?reachid=4091',
      },
    ],
  },
  {
    id: 'south-fork-zumbro-lake-zumbro',
    slug: 'south-fork-zumbro-lake-zumbro',
    name: 'South Fork Zumbro',
    reach: '90th Street NW to Lake Zumbro',
    state: 'Minnesota',
    region: 'Rochester Area',
    summary:
      'Short Rochester-area river call where the sweet spot is narrow and quick rain response matters more than mileage.',
    statusText:
      'Best for a straightforward day when the Rochester gauge is around 3 to 4 ft. Above that it gets pushier fast for newer paddlers.',
    latitude: 44.1545,
    longitude: -92.46247,
    gaugeSource: {
      id: 'usgs-05372995',
      provider: 'usgs',
      siteId: '05372995',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'South Fork Zumbro River at Rochester, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 3,
      idealMax: 4,
      tooLow: 3,
      tooHigh: 4,
      thresholdSource: {
        label: 'MilesPaddled South Fork Zumbro numeric range notes',
        url: 'https://milespaddled.com/zumbro-river-south-fork/',
      },
      thresholdSourceStrength: 'mixed',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Spring through early fall is the practical window. Rapid rises after rain matter more than the calendar, and Lake Zumbro wind still affects the finish.',
      difficulty: 'easy',
      difficultyNotes:
        'Generally beginner-friendly at the right level, but rising water, wood, and wind on Lake Zumbro can change the day quickly.',
      confidenceNotes:
        'The 3 to 4 ft band is still trip-report guidance. MN DNR and Olmsted County support the route and its flash-flood and wind context, but not a published official numeric threshold for this exact reach.',
    },
    evidenceNotes: [
      {
        label: 'Working gauge band',
        value: '3.0 to 4.0 ft',
        note: 'MilesPaddled treats this as the good beginner window on the Rochester gauge for this exact South Fork reach.',
        sourceUrl: 'https://milespaddled.com/zumbro-river-south-fork/',
      },
      {
        label: 'Flood caution',
        value: 'Rapid rises after rain',
        note: 'MN DNR repeatedly warns that the Zumbro system can rise dramatically and dangerously after rainstorms.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/zumbroriver/index.html',
      },
      {
        label: 'Lake finish',
        value: 'Wind matters at the take-out',
        note: 'The route finishes onto Lake Zumbro, so a gauge in range does not erase wind exposure near the end of the day.',
        sourceUrl: 'https://www.olmstedcounty.gov/residents/parks-and-trails/parks/lake-zumbro-park',
      },
      {
        label: 'Take-out quality',
        value: 'Separate canoe/kayak launch',
        note: 'Olmsted County says Lake Zumbro Park has a separate canoe and kayak launch on a sandy bank apart from the motorized launch, which makes the downstream endpoint stronger than the put-in side of this route.',
        sourceUrl: 'https://www.olmstedcounty.gov/residents/parks-and-trails/parks/lake-zumbro-park',
      },
      {
        label: 'Put-in locator',
        value: "Frank's Ford Bridge / Bridge L6322",
        note: 'MnDOT historic-bridge records provide a real authoritative anchor for the 90th Street NW footbridge location, even though they do not by themselves establish canoe-launch parking rules.',
        sourceUrl: 'https://dot.state.mn.us/historicbridges/L6322.html',
      },
      {
        label: 'Difficulty',
        value: 'Easy at the right level',
        note: 'This is a reasonable beginner day only when the river stays inside the working band and is not rising quickly.',
      },
    ],
    sourceLinks: [
      {
        label: 'USGS 05372995 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05372995/',
      },
      {
        label: 'MN DNR Zumbro River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/zumbroriver/index.html',
      },
      {
        label: 'MN DNR Zumbro River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/zumbroriver/segments-maps.html',
      },
      {
        label: 'Olmsted County Lake Zumbro Park',
        url: 'https://www.olmstedcounty.gov/residents/parks-and-trails/parks/lake-zumbro-park',
      },
      {
        label: "MnDOT Frank's Ford Bridge",
        url: 'https://dot.state.mn.us/historicbridges/L6322.html',
      },
      {
        label: 'MilesPaddled South Fork Zumbro',
        url: 'https://milespaddled.com/zumbro-river-south-fork/',
      },
    ],
  },
  {
    id: 'upper-iowa-river-kendallville-decorah',
    slug: 'upper-iowa-river-kendallville-decorah',
    name: 'Upper Iowa River',
    reach: 'Kendallville Park to Decorah',
    state: 'Iowa',
    region: 'Northeast Iowa',
    summary:
      'Classic Driftless float with clear water and bluff scenery. The big question here is simple: is there enough water to make it worth the drive?',
    statusText:
      'Treat 200 cfs as the low end. Above that can work, but there is still not enough guidance to call the upper end with much confidence.',
    latitude: 43.44202,
    longitude: -92.03809,
    gaugeSource: {
      id: 'usgs-05387500',
      provider: 'usgs',
      siteId: '05387500',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Upper Iowa River near Decorah, IA',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 200,
      thresholdSource: {
        label: 'MilesPaddled Upper Iowa River III minimum-flow note',
        url: 'https://milespaddled.com/upper-iowa-river-iii/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'high',
      seasonMonths: [5, 6, 7, 8, 9],
      seasonNotes:
        'Late spring through early fall is the practical window. Heavy rain can raise current and wood risk quickly on this bluff-country run.',
      difficulty: 'easy',
      difficultyNotes:
        'Generally beginner-friendly at sensible levels, but this is still a long moving-water day with strainers and flood-current consequences.',
      confidenceNotes:
        'This reach has a useful low-water mark, but not a published upper range. County and Iowa DNR sources support the segment itself, but not the full scoring range.',
    },
    evidenceNotes: [
      {
        label: 'Published minimum',
        value: '200 cfs',
        note: 'MilesPaddled treats anything below 200 cfs on the Decorah gauge as a scrape-prone day to avoid.',
        sourceUrl: 'https://milespaddled.com/upper-iowa-river-iii/',
      },
      {
        label: 'Route shape',
        value: 'Long Driftless day trip',
        note: 'Kendallville to Decorah is a scenic but full-length outing. Low water hurts trip quality before it becomes unsafe.',
        sourceUrl: 'https://www.winneshiekwild.com/park-trail/upper-iowa-river',
      },
      {
        label: 'Kendallville staging',
        value: 'County park access and campground',
        note: 'The Winneshiek County paddlers guide lists Kendallville Park Access and campground support, which strengthens the upstream endpoint as a real staging access rather than just a dropped pin.',
        sourceUrl: 'https://www.winneshiekwild.com/wp-content/uploads/2019/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf',
      },
      {
        label: 'Decorah take-out support',
        value: 'City-park canoe access shown',
        note: 'Decorah park materials show canoe access in the Ice Cave park corridor at the city finish, which is stronger than treating the take-out as an undocumented local landing.',
        sourceUrl: 'https://parks.decorahia.org/wp-content/uploads/2022/11/Parks-Trail-Guide.pdf',
      },
      {
        label: 'Flood caution',
        value: 'Rain matters quickly',
        note: 'Fast rises and fresh wood after storms lower confidence because the high end is still not well defined.',
      },
      {
        label: 'Difficulty',
        value: 'Easy',
        note: 'Easy current at normal levels, but still a real river day rather than a guaranteed family float.',
      },
    ],
    sourceLinks: [
      {
        label: 'MilesPaddled Upper Iowa River III',
        url: 'https://milespaddled.com/upper-iowa-river-iii/',
      },
      {
        label: 'USGS 05387500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/05387500/',
      },
      {
        label: 'Winneshiek County Upper Iowa River overview',
        url: 'https://www.winneshiekwild.com/park-trail/upper-iowa-river',
      },
      {
        label: 'Iowa DNR Water Trails',
        url: 'https://www.iowadnr.gov/Places-to-Go/Water-Trails',
      },
      {
        label: 'Winneshiek County Upper Iowa paddlers guide PDF',
        url: 'https://www.winneshiekwild.com/wp-content/uploads/2019/12/Upper-Iowa-River-Paddlers-Guide-Web.pdf',
      },
      {
        label: 'Decorah parks trail guide PDF',
        url: 'https://parks.decorahia.org/wp-content/uploads/2022/11/Parks-Trail-Guide.pdf',
      },
    ],
  },
  {
    id: 'sugar-river-belleville-county-x',
    slug: 'sugar-river-belleville-county-x',
    name: 'Sugar River',
    reach: 'Belleville Community Park to County Road X',
    state: 'Wisconsin',
    region: 'South-Central Wisconsin',
    summary:
      'Mostly mellow Sugar River day trip where low water is the main thing to watch. Above that, the route is straightforward, but the high end is still fuzzy.',
      statusText:
        'Treat 60 cfs at Verona as the low end. Above that can work, but there is still not enough guidance to say where the upper end should be for this reach.',
    latitude: 42.86083,
    longitude: -89.53419,
    gaugeSource: {
      id: 'usgs-05435950',
      provider: 'usgs',
      siteId: '05435950',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Sugar River near Verona, WI',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 60,
      thresholdSource: {
        label: 'MilesPaddled Sugar River IV minimum-flow note',
        url: 'https://milespaddled.com/sugar-river-iv/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Spring through early fall is the practical window. This is more sensitive to low water than to a narrow sweet spot.',
      difficulty: 'easy',
      difficultyNotes:
        'Generally mellow current, but distance, muddy shallows, and long flat stretches still matter if you launch too low.',
      confidenceNotes:
        'The clearest number here is a low-water mark from paddler reports. The route itself is straightforward, but there is still no published upper range for this reach.',
    },
    evidenceNotes: [
      {
        label: 'Published minimum',
        value: '60 cfs',
        note: 'MilesPaddled recommends about 60 cfs minimum on the Verona gauge to avoid a shallow, frustrating day.',
        sourceUrl: 'https://milespaddled.com/sugar-river-iv/',
      },
      {
        label: 'Trip style',
        value: 'Mellow, longer day',
        note: 'This is mostly a scenic float rather than a technical run. Low water is the main quality problem.',
        sourceUrl: 'https://milespaddled.com/sugar-river-iv/',
      },
      {
        label: 'Gauge context',
        value: 'Verona gauge only',
        note: 'The Verona gauge gives a useful low-water reference, but there is still not enough high-water guidance for this exact reach.',
        sourceUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-05435950/',
      },
      {
        label: 'Official park operations',
        value: 'Belleville parks open 6 a.m. to 10 p.m.',
        note: 'Village of Belleville park rules say parks are open from 6 a.m. to 10 p.m. and restrict motor vehicles to roads, drives, and parking areas, which is useful operational context for the put-in even though it is not a dedicated launch page.',
        sourceUrl: 'https://www.bellevillewi.gov/print/pdf/node/4481',
      },
      {
        label: 'Difficulty',
        value: 'Easy',
        note: 'A good easy-day candidate once the river is clearly above its low-water mark.',
      },
    ],
    sourceLinks: [
      {
        label: 'MilesPaddled Sugar River IV',
        url: 'https://milespaddled.com/sugar-river-iv/',
      },
      {
        label: 'USGS 05435950 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05435950/',
      },
      {
        label: 'USGS 05436500 downstream monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05436500/',
      },
      {
        label: 'Village of Belleville parks FAQ PDF',
        url: 'https://www.bellevillewi.gov/print/pdf/node/4481',
      },
    ],
  },
  {
    id: 'sugar-river-county-road-x-county-road-ee',
    slug: 'sugar-river-county-road-x-county-road-ee',
    name: 'Sugar River',
    reach: 'County Road X to County Road EE',
    state: 'Wisconsin',
    region: 'South-Central Wisconsin',
    summary:
      'Longer mellow Sugar River day where the main question is still water level. Stay above the Verona low end, then treat the rest of the score with a little caution.',
    statusText:
      'Treat 60 cfs at Verona as the low end. Above that can work, but there is still not enough guidance to say where the upper end should be for this Albany reach.',
    latitude: 42.76684,
    longitude: -89.464665,
    gaugeSource: {
      id: 'usgs-05435950',
      provider: 'usgs',
      siteId: '05435950',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Sugar River near Verona, WI',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 60,
      thresholdSource: {
        label: 'MilesPaddled Sugar River V minimum-flow note',
        url: 'https://milespaddled.com/sugar-river-v/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Spring through early fall is the practical window. This is another easy river where low water matters more than finding a perfect number.',
      difficulty: 'easy',
      difficultyNotes:
        'Mostly mellow current, but 11.5 miles plus deadfall and muddy bridge landings still make the day feel bigger than the label suggests.',
      confidenceNotes:
        'The clearest number here is the same Verona low-water mark used on the upstream Sugar reach. Access points are mapped, but the route still lacks a published upper range.',
    },
    evidenceNotes: [
      {
        label: 'Published minimum',
        value: '60 cfs',
        note: 'MilesPaddled recommends avoiding very low flow on the Verona gauge so this segment does not turn into a shallow, frustrating day.',
        sourceUrl: 'https://milespaddled.com/sugar-river-v/',
      },
      {
        label: 'Trip style',
        value: 'Mellow, full day',
        note: 'County Road X to County Road EE is a scenic 11.5-mile float with low water as the primary quality problem rather than technical difficulty.',
        sourceUrl: 'https://milespaddled.com/sugar-river-v/',
      },
      {
        label: 'Access support',
        value: 'Regional trail map',
        note: 'Capitol Water Trails maps both bridge access points, but local parking authority is still lighter than a formal DNR access page.',
        sourceUrl: 'http://www.capitolwatertrails.org/maps/sugarR_6/map6_big_Color.gif',
      },
      {
        label: 'Downstream public-access corridor',
        value: 'Albany Wildlife Area has parking and a boat launch',
        note: 'Wisconsin DNR says Albany Wildlife Area offers a parking lot and a boat launch on the Sugar River corridor, which improves downstream public-access confidence near Albany even though it does not by itself prove the exact County Road EE bridge landing.',
        sourceUrl: 'https://dnr.wisconsin.gov/topic/Lands/WildlifeAreas/albany',
      },
      {
        label: 'Gauge context',
        value: 'Verona gauge only',
        note: 'The Verona gauge gives a useful low-water mark, but there is still not enough high-water guidance for this exact lower Sugar segment.',
        sourceUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-05435950/',
      },
    ],
    sourceLinks: [
      {
        label: 'MilesPaddled Sugar River V',
        url: 'https://milespaddled.com/sugar-river-v/',
      },
      {
        label: 'Capitol Water Trails Upper Sugar map',
        url: 'http://www.capitolwatertrails.org/maps/sugarR_6/map6_big_Color.gif',
      },
      {
        label: 'USGS 05435950 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05435950/',
      },
      {
        label: 'Wisconsin DNR Albany Wildlife Area',
        url: 'https://dnr.wisconsin.gov/topic/Lands/WildlifeAreas/albany',
      },
    ],
  },
  {
    id: 'black-hawk-creek-ranchero-hope-martin',
    slug: 'black-hawk-creek-ranchero-hope-martin',
    name: 'Black Hawk Creek',
    reach: 'Ranchero Road to Hope Martin Park',
    state: 'Iowa',
    region: 'Cedar Valley',
    summary:
      'Shorter Waterloo greenbelt reach with the same official Hudson gauge band as the upstream segment. Good flow is necessary, but wood and portages still decide the day.',
    statusText:
      'Only consider this when Hudson is inside the official 100 to 500 cfs band. Even in range, expect deadfalls, scoutable bends, and possible portages.',
    latitude: 42.47437,
    longitude: -92.39257,
    gaugeSource: {
      id: 'usgs-05463500',
      provider: 'usgs',
      siteId: '05463500',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Black Hawk Creek at Hudson, IA',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 100,
      idealMax: 500,
      tooLow: 100,
      tooHigh: 500,
      thresholdSource: {
        label: 'Iowa DNR Black Hawk Creek Water Trail brochure',
        url: 'https://www.iowadnr.gov/media/8882/download?inline',
      },
      thresholdSourceStrength: 'official',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Warm-season paddling only. Storm debris and fresh strainers can change this creek quickly even when the gauge is inside the official range.',
      difficulty: 'hard',
      difficultyNotes:
        'Intermediate-to-hard creek style. The Iowa DNR brochure calls out frequent deadfalls, sweepers, and two ford hazards that can behave like low-head dams.',
      confidenceNotes:
        'The 100 to 500 cfs band comes directly from Iowa DNR. Confidence is still capped by the creek itself, because new wood and tight bends can make an in-range day a bad decision.',
    },
    evidenceNotes: [
      {
        label: 'Published flow range',
        value: '100 to 500 cfs',
        note: 'Iowa DNR publishes this as the recommended Hudson-gauge range for Black Hawk Creek paddling.',
        sourceUrl: 'https://www.iowadnr.gov/media/8882/download?inline',
      },
      {
        label: 'Difficulty',
        value: 'Intermediate creek run',
        note: 'The downstream Waterloo reach still carries portages, deadfalls, and wood-hazard decisions even though the mileage is shorter.',
        sourceUrl: 'https://www.iowadnr.gov/media/8882/download?inline',
      },
      {
        label: 'Primary hazards',
        value: 'Deadfalls, sweepers, and ford hazards',
        note: 'Hope Martin is easier to stage than longer creek runs, but the water-trail brochure still treats the reach as obstruction-heavy.',
        sourceUrl: 'https://www.iowadnr.gov/media/8882/download?inline',
      },
      {
        label: 'Decision style',
        value: 'Conservative',
        note: 'A good Hudson reading does not remove the need to scout blind corners and portage around fresh wood.',
      },
    ],
    sourceLinks: [
      {
        label: 'Iowa DNR Black Hawk Creek Water Trail brochure',
        url: 'https://www.iowadnr.gov/media/8882/download?inline',
      },
      {
        label: 'USGS 05463500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05463500/',
      },
      {
        label: 'OpenStreetMap Hope Martin Park reference',
        url: 'https://nominatim.openstreetmap.org/search?format=json&q=Hope%20Martin%20Park%2C%20Waterloo%2C%20IA',
      },
    ],
  },
  {
    id: 'bark-river-highway-164-to-merton-millpond',
    slug: 'bark-river-highway-164-to-merton-millpond',
    name: 'Bark River',
    reach: 'Highway 164 to Merton Millpond',
    state: 'Wisconsin',
    region: 'Lake Country',
    summary:
      'Short upper Bark run where low water and grass-choked channels ruin the day quickly. This is mainly a low-water-floor decision rather than a broad sweet-spot river.',
    statusText:
      'Treat 55 cfs at Delafield as the low-water floor. Above that can work, but there is not yet a clear upper target or high-water cutoff for this reach.',
    latitude: 43.1642,
    longitude: -88.28469,
    gaugeSource: {
      id: 'usgs-05426067',
      provider: 'usgs',
      siteId: '05426067',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Bark River at Delafield, WI',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 55,
      thresholdSource: {
        label: 'MilesPaddled Bark River IV minimum-flow note',
        url: 'https://milespaddled.com/bark-river-iv/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6],
      seasonNotes:
        'Best in spring when flows are up and vegetation is down. By midsummer this reach often slides back toward scrapey, grassy conditions.',
      difficulty: 'moderate',
      difficultyNotes:
        'Short but not casual. Tight bends, wood, and roadside access friction matter almost as much as the gauge.',
      confidenceNotes:
        'The app only has a clear low-water floor here. That is enough to avoid obviously bad days, but not enough to promise a reliable upper range.',
    },
    evidenceNotes: [
      {
        label: 'Published minimum',
        value: '55 cfs',
        note: 'MilesPaddled treats anything below roughly 55 cfs at Delafield as too shallow for most boats.',
        sourceUrl: 'https://milespaddled.com/bark-river-iv/',
      },
      {
        label: 'Access friction',
        value: 'Highway 164 is limited',
        note: 'The put-in is functional but awkward. Safe, legal roadside access is part of the go/no-go decision.',
        sourceUrl: 'https://milespaddled.com/bark-river-iv/',
      },
      {
        label: 'Hazards',
        value: 'Grass, wood, and tight bends',
        note: 'Expect downed trees and overgrown banks even on workable-flow days.',
        sourceUrl: 'https://milespaddled.com/bark-river-iv/',
      },
      {
        label: 'Decision style',
        value: 'Minimum-only',
        note: 'Today this score mainly answers whether the river is clearly above its low-water floor.',
      },
    ],
    sourceLinks: [
      {
        label: 'MilesPaddled Bark River IV',
        url: 'https://milespaddled.com/bark-river-iv/',
      },
      {
        label: 'USGS 05426067 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/05426067/#parameterCode=00060',
      },
    ],
  },
  {
    id: 'kickapoo-river-ontario-rockton',
    slug: 'kickapoo-river-ontario-rockton',
    name: 'Kickapoo River',
    reach: 'Ontario to Rockton',
    state: 'Wisconsin',
    region: 'Driftless Wisconsin',
    summary:
      'Classic Driftless day trip where low water quickly turns the route into a scrape-and-walk slog. The score should mainly answer whether the Ontario gauge is clearly above the low-water floor.',
    statusText:
      'Treat 60 cfs at Ontario as the low-water floor. Above that can be worthwhile, but there is not yet a clear high-water cutoff for this reach.',
    latitude: 43.68004,
    longitude: -90.59497,
    gaugeSource: {
      id: 'usgs-05407468',
      provider: 'usgs',
      siteId: '05407468',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Kickapoo River at Ontario, WI',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 60,
      thresholdSource: {
        label: 'MilesPaddled Kickapoo River I minimum-flow note',
        url: 'https://milespaddled.com/kickapoo-river-i/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Late spring through early fall is the normal window. Rain spikes and flashier summer storms matter more here than shoulder-season cold alone.',
      difficulty: 'moderate',
      difficultyNotes:
        'Mostly approachable moving water, but shallow riffles, strainers, and fast-changing rain conditions make this more than a lazy float.',
      confidenceNotes:
        'The app has a clear low-water floor from trip guidance, but not a clear high-water cutoff. Treat rising water and flood context cautiously even when the river is above minimum.',
    },
    evidenceNotes: [
      {
        label: 'Published minimum',
        value: '60 cfs',
        note: 'MilesPaddled treats about 60 cfs at Ontario as the minimum before scraping and dragging become common.',
        sourceUrl: 'https://milespaddled.com/kickapoo-river-i/',
      },
      {
        label: 'Community sweet spot',
        value: 'About 70 to 100 cfs',
        note: 'Existing route notes describe this as a good range, but it is still paddler guidance rather than an official published threshold.',
        sourceUrl: 'https://milespaddled.com/kickapoo-river-i/',
      },
      {
        label: 'High-water caution',
        value: 'Avoid flood conditions',
        note: 'The route is rain-sensitive and can turn pushy quickly. Treat higher water cautiously because the upper range is still not well defined.',
        sourceUrl: 'https://waterdata.usgs.gov/nwis/uv/?site_no=05407468&PARAmeter_cd=00065,00060',
      },
      {
        label: 'Landing management',
        value: 'Landing 12 requires a KVR parking permit',
        note: 'Kickapoo Valley Reserve says vehicles parked at river access sites including Landing 12 must display a KVR day-use, annual, camping, or vehicle-parking permit.',
        sourceUrl: 'https://kvr.state.wi.us/Recreation/Hunt-Fish-Trap',
      },
      {
        label: 'Access map support',
        value: 'Official Upper Kickapoo access map available',
        note: 'Kickapoo Valley Reserve publishes an Upper Kickapoo River Access and Campsite Map, which materially strengthens Landing 12 as an official managed access rather than a vague legacy take-out.',
        sourceUrl: 'https://kvr.state.wi.us/Recreation/Maps',
      },
      {
        label: 'Difficulty',
        value: 'Moderate',
        note: 'Shallow riffles and occasional Class I current keep this from being a pure easy float even when the gauge is workable.',
      },
    ],
    sourceLinks: [
      {
        label: 'MilesPaddled Kickapoo River I',
        url: 'https://milespaddled.com/kickapoo-river-i/',
      },
      {
        label: 'USGS 05407468 monitoring location',
        url: 'https://waterdata.usgs.gov/nwis/uv/?site_no=05407468&PARAmeter_cd=00065,00060',
      },
      {
        label: 'USGS 05408000 upstream context gauge',
        url: 'https://waterdata.usgs.gov/wi/nwis/uv/?site_no=05408000&PARAmeter_cd=00065,00060',
      },
      {
        label: 'Wisconsin River Trips Ontario segment notes',
        url: 'https://www.wisconsinrivertrips.com/segments/kickapoo-river/ontario',
      },
      {
        label: 'Wisconsin DNR boat access inventory',
        url: 'https://dnr.wisconsin.gov/topic/lands/boataccess',
      },
      {
        label: 'Kickapoo Valley Reserve Hunt Fish Trap',
        url: 'https://kvr.state.wi.us/Recreation/Hunt-Fish-Trap',
      },
      {
        label: 'Kickapoo Valley Reserve Maps',
        url: 'https://kvr.state.wi.us/Recreation/Maps',
      },
      {
        label: 'Village of Ontario',
        url: 'https://ontariowi.com/',
      },
    ],
  },
  {
    id: 'zumbro-river-theilman-kruger',
    slug: 'zumbro-river-theilman-kruger',
    name: 'Zumbro River',
    reach: 'Theilman Access to Kruger Access',
    state: 'Minnesota',
    region: 'Southeast Minnesota',
    summary:
      'Lower main-stem Zumbro reach where the same Zumbro Falls gauge still matters, but isolation, storms, and access quality matter almost as much as the raw number.',
    statusText:
      'Use the same 7 to 9 ft working band as the upper main stem. It can still work below that, but flash-rain spikes and wood should lower trust quickly.',
    latitude: 44.31202,
    longitude: -92.13197,
    gaugeSource: {
      id: 'usgs-05374000',
      provider: 'usgs',
      siteId: '05374000',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Zumbro River at Zumbro Falls, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 7,
      idealMax: 9,
      tooLow: 5.5,
      tooHigh: 11.5,
      thresholdSource: {
        label: 'MilesPaddled Zumbro River IV numeric range notes',
        url: 'https://milespaddled.com/zumbro-river-iv/',
      },
      thresholdSourceStrength: 'mixed',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Spring through early fall is the normal window, but this reach should still be treated as storm-sensitive and flashier than its easy rating suggests.',
      difficulty: 'easy',
      difficultyNotes:
        'Mostly approachable moving water at normal levels, but isolation, mud, and storm-changed wood still matter.',
      confidenceNotes:
        'The same Zumbro Falls gauge context carries downriver, but the preferred range still leans partly on paddler reports. Confidence is best when the gauge is stable and recent rain is quiet.',
    },
    evidenceNotes: [
      {
        label: 'Preferred band',
        value: '7 to 9 ft',
        note: 'MilesPaddled uses the same 7 to 9 ft recommendation at Zumbro Falls for this lower main-stem segment.',
        sourceUrl: 'https://milespaddled.com/zumbro-river-iv/',
      },
      {
        label: 'Route context',
        value: 'Map 2 main stem',
        note: 'MN DNR Map 2 supports Theilman and Kruger as the relevant carry-in accesses on this stretch.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/zumbro2.pdf',
      },
      {
        label: 'Rain response',
        value: 'Flashy after storms',
        note: 'The Zumbro can rise fast after rain, so a stable trend matters almost as much as the current reading.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/zumbroriver/index.html',
      },
      {
        label: 'Camping context',
        value: 'Possible nearby, not assumed',
        note: 'Kruger and nearby Dorer units support planning context, but this app still treats the segment as a day-trip decision first.',
        sourceUrl: 'https://www.dnr.state.mn.us/state_forests/forest.html?id=sft00033#cmp00041',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR Zumbro River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/zumbroriver/segments-maps.html',
      },
      {
        label: 'MN DNR Zumbro River Map 2 PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/zumbro2.pdf',
      },
      {
        label: 'MN DNR Zumbro River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/zumbroriver/index.html',
      },
      {
        label: 'USGS 05374000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05374000/',
      },
      {
        label: 'MilesPaddled Zumbro River IV',
        url: 'https://milespaddled.com/zumbro-river-iv/',
      },
    ],
  },
  {
    id: 'zumbro-river-kruger-west-newton',
    slug: 'zumbro-river-kruger-west-newton',
    name: 'Zumbro River',
    reach: 'Kruger Access to West Newton',
    state: 'Minnesota',
    region: 'Southeast Minnesota',
    summary:
      'Finish-the-river Zumbro day where the gauge still matters, but the Mississippi take-out, wind, and motorboat context add a little more trip-day friction.',
    statusText:
      'Use the same 7 to 9 ft working band as the lower Zumbro. It can still be worthwhile below that, but the Mississippi finish and post-rain spikes make marginal calls less forgiving.',
    latitude: 44.31064,
    longitude: -92.00201,
    gaugeSource: {
      id: 'usgs-05374000',
      provider: 'usgs',
      siteId: '05374000',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Zumbro River at Zumbro Falls, MN',
    },
    profile: {
      thresholdModel: 'two-sided',
      idealMin: 7,
      idealMax: 9,
      tooLow: 5.5,
      tooHigh: 11.5,
      thresholdSource: {
        label: 'MilesPaddled Zumbro River V numeric range notes',
        url: 'https://milespaddled.com/zumbro-river-v/',
      },
      thresholdSourceStrength: 'mixed',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Spring through early fall is the main window. Wind and Mississippi conditions near the finish matter more on this reach than on the upstream Zumbro calls.',
      difficulty: 'easy',
      difficultyNotes:
        'Mostly straightforward current at normal levels, but not a blind beginner call when the river is rising or the Mississippi finish is windy.',
      confidenceNotes:
        'The same Zumbro gauge context is usable here, but the take-out environment is more complex than the mid-river stretches. Confidence should stay a little lower on windy or rising days.',
    },
    evidenceNotes: [
      {
        label: 'Preferred band',
        value: '7 to 9 ft',
        note: 'MilesPaddled ties this lower reach to the same 7 to 9 ft recommendation at Zumbro Falls.',
        sourceUrl: 'https://milespaddled.com/zumbro-river-v/',
      },
      {
        label: 'Lower-river caution',
        value: 'Mississippi finish',
        note: 'Wind chop and boat traffic near West Newton change the decision even when the Zumbro itself looks workable.',
        sourceUrl: 'https://milespaddled.com/zumbro-river-v/',
      },
      {
        label: 'Storm sensitivity',
        value: 'High',
        note: 'Treat fast-rising water as a stronger no-go signal than the raw number alone.',
        sourceUrl: 'https://www.dnr.state.mn.us/watertrails/zumbroriver/index.html',
      },
      {
        label: 'Access confidence',
        value: 'Mixed',
        note: 'Core route facts are solid, but the take-out still deserves a same-day parking and launch check.',
      },
    ],
    sourceLinks: [
      {
        label: 'MilesPaddled Zumbro River V',
        url: 'https://milespaddled.com/zumbro-river-v/',
      },
      {
        label: 'USGS 05374000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05374000/',
      },
      {
        label: 'MN DNR Zumbro River overview',
        url: 'https://www.dnr.state.mn.us/watertrails/zumbroriver/index.html',
      },
    ],
  },
  {
    id: 'upper-iowa-river-trout-run-lower-dam',
    slug: 'upper-iowa-river-trout-run-lower-dam',
    name: 'Upper Iowa River',
    reach: 'Trout Run Park to Lower Dam',
    state: 'Iowa',
    region: 'Northeast Iowa',
      summary:
      'Long Decorah-area Upper Iowa day where the main decision is still low water. This stays scenic and approachable above its floor, but the high side of the range is still not well defined.',
    statusText:
      'Treat 150 cfs near Decorah as the low-water floor. Above that can work, but there is not yet a clear upper target or high-water cutoff for this reach.',
    latitude: 43.31574,
    longitude: -91.70093,
    gaugeSource: {
      id: 'usgs-05387500',
      provider: 'usgs',
      siteId: '05387500',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Upper Iowa River near Decorah, IA',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 150,
      thresholdSource: {
        label: 'MilesPaddled Upper Iowa River VI minimum-flow note',
        url: 'https://milespaddled.com/upper-iowa-river-vi/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Late spring through early fall is the normal window. This reach stays scenic through a longer season than tiny creeks, but low water still hurts trip quality first.',
      difficulty: 'easy',
      difficultyNotes:
        'Generally beginner-friendly at workable levels, but distance, riffles, and the dam portage still make this a real day rather than a park float.',
      confidenceNotes:
        'The only clear numeric threshold here is a low-water floor from paddler reports. The route itself is friendly, but there is still no published upper target or high-water cutoff for this full Decorah reach.',
    },
    evidenceNotes: [
      {
        label: 'Published minimum',
        value: '150 cfs',
        note: 'MilesPaddled recommends at least about 150 cfs near Decorah to avoid a scrape-heavy day on this reach.',
        sourceUrl: 'https://milespaddled.com/upper-iowa-river-vi/',
      },
      {
        label: 'Trip length',
        value: '13 miles',
        note: 'This is a long day trip. Even with easy current, low water and a dam portage change the decision more than a score alone might suggest.',
        sourceUrl: 'https://milespaddled.com/upper-iowa-river-vi/',
      },
      {
        label: 'Primary hazard',
        value: 'Upper Dam portage',
        note: 'Treat the Lower Dam finish as a dam-safety route, not just a long scenic float. Never approach the dam face in current.',
        sourceUrl: 'https://milespaddled.com/upper-iowa-river-vi/',
      },
      {
        label: 'Trout Run launch support',
        value: 'Decorah park-system canoe access',
        note: 'Decorah park materials show canoe access in the Trout Run / Ice Cave corridor, which materially improves confidence in the city-side launch.',
        sourceUrl: 'https://parks.decorahia.org/wp-content/uploads/2022/11/Parks-Trail-Guide.pdf',
      },
      {
        label: 'Lower Dam access support',
        value: 'Popular public access below Decorah',
        note: 'Iowa DNR Fish Iowa treats Lower Dam as a popular public access roughly 11 miles northeast of Decorah, which is stronger endpoint support than the old route notes alone.',
        sourceUrl: 'https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RUI03',
      },
      {
        label: 'Difficulty',
        value: 'Easy',
        note: 'Comfortable for newer paddlers at workable levels if they are prepared for the mileage and portage.',
      },
    ],
    sourceLinks: [
      {
        label: 'MilesPaddled Upper Iowa River VI',
        url: 'https://milespaddled.com/upper-iowa-river-vi/',
      },
      {
        label: 'USGS 05387500 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/05387500/',
      },
      {
        label: 'Iowa DNR Fish Iowa Upper Iowa above Decorah',
        url: 'https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RUI96',
      },
      {
        label: 'Iowa DNR Fish Iowa Upper Iowa below Decorah',
        url: 'https://programs.iowadnr.gov/lakemanagement/FishIowa/RiverStreamDetails/RUI03',
      },
      {
        label: 'Decorah parks trail guide PDF',
        url: 'https://parks.decorahia.org/wp-content/uploads/2022/11/Parks-Trail-Guide.pdf',
      },
    ],
  },
  {
    id: 'cannon-river-faribault-dundas',
    slug: 'cannon-river-faribault-dundas',
    name: 'Cannon River',
    reach: 'Faribault to Dundas',
    state: 'Minnesota',
    region: 'Southern Minnesota',
    summary:
      'Classic southern-Minnesota day trip with mostly easy current, good scenery, and one clear question first: is there enough water to avoid a scrape-heavy slog without storm damage pushing the day out of bounds?',
    statusText:
      'Treat about 202 cfs at Northfield as the low-water floor. Around 1,050 cfs has a strong trip-report endorsement, but the app does not claim a tighter sweet spot yet.',
    latitude: 44.31067,
    longitude: -93.27087,
    gaugeSource: {
      id: 'usgs-05355024',
      provider: 'usgs',
      siteId: '05355024',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Cannon River at Northfield, MN',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 202,
      thresholdSource: {
        label: 'MilesPaddled Cannon River I + MN DNR medium-flow context',
        url: 'https://milespaddled.com/cannon-river-i/',
      },
      thresholdSourceStrength: 'mixed',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Late spring through early fall is the normal window. Summer still works, but low-water riffles and post-rain wood change the quality quickly.',
      difficulty: 'easy',
      difficultyNotes:
        'Mostly beginner-friendly moving water, but the long mileage, occasional riffles, and storm-changed wood still deserve respect.',
      confidenceNotes:
        'The route itself is well documented and the Northfield gauge is direct. The strongest hard number is a defensible low-water floor, not a precise preferred upper band.',
    },
    evidenceNotes: [
      {
        label: 'Published low-water floor',
        value: '202 cfs',
        note: 'MilesPaddled points to MN DNR flow context showing 202 to 2,730 cfs as Medium at Northfield, which is a defensible floor for avoiding an obviously too-thin day.',
        sourceUrl: 'https://milespaddled.com/cannon-river-i/',
      },
      {
        label: 'Strong trip-report day',
        value: '1,050 cfs',
        note: 'MilesPaddled calls 1,050 cfs at Northfield a very recommendable level for this Faribault to Dundas run.',
        sourceUrl: 'https://milespaddled.com/cannon-river-i/',
      },
      {
        label: 'Route shape',
        value: '13.75 river miles',
        note: 'MN DNR Map 1 explicitly names Two Rivers Park carry-in access and Dundas City Park as the recommended day-trip endpoints for this run.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/cannon1_straight.pdf',
      },
      {
        label: 'Supplemental high-water context',
        value: '10.5 to 12 ft sweet spot; 14+ ft gets edgy',
        note: 'A Cannon outfitter using the Northfield gauge treats roughly 10.5 to 12 feet as the preferred range, with 13 to 14 feet getting harder and 14+ feet trending toward shutdown decisions. This is useful upper-flow context, but it is still stage-based and not route-specific enough to replace the app threshold model.',
        sourceUrl: 'https://www.farmsteadoutdooradventures.com/our-company-1',
      },
      {
        label: 'Primary caution',
        value: 'Wood and post-rain debris',
        note: 'The river is usually friendly, but the route report calls out snag and log-pile evidence after higher water.',
        sourceUrl: 'https://milespaddled.com/cannon-river-i/',
      },
    ],
    sourceLinks: [
      {
        label: 'MN DNR recommended Cannon River paddling trips',
        url: 'https://www.dnr.state.mn.us/watertrails/recommended/cannon.html',
      },
      {
        label: 'MN DNR Cannon River segments and maps',
        url: 'https://www.dnr.state.mn.us/watertrails/cannonriver/segments-maps.html',
      },
      {
        label: 'City of Faribault park addresses PDF',
        url: 'https://www.ci.faribault.mn.us/DocumentCenter/View/3108/List-of-Parks',
      },
      {
        label: 'MN DNR Cannon / Straight canoe route map PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/cannon1_straight.pdf',
      },
      {
        label: 'USGS 05355024 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05355024/',
      },
      {
        label: 'Farmstead Outdoor Adventures Cannon gauge guide',
        url: 'https://www.farmsteadoutdooradventures.com/our-company-1',
      },
      {
        label: 'MilesPaddled Cannon River I',
        url: 'https://milespaddled.com/cannon-river-i/',
      },
    ],
  },
  {
    id: 'milwaukee-river-newburg-fredonia',
    slug: 'milwaukee-river-newburg-fredonia',
    name: 'Milwaukee River',
    reach: "Fireman's Park to Waubedonia Park",
    state: 'Wisconsin',
    region: 'Southeast Wisconsin',
    summary:
      'Flow-sensitive southeast-Wisconsin day trip with mostly easy current and intermittent riffles. The main product question is whether Cedarburg is clearly above the scrape line, not whether the route has a narrow perfect band.',
    statusText:
      'Treat about 390 cfs at Cedarburg as the low-water floor. Around 550 cfs was described as close to perfect, but the app still stays conservative above the minimum because the upper range is thinly sourced.',
    latitude: 43.43373,
    longitude: -88.04926,
    gaugeSource: {
      id: 'usgs-04086600',
      provider: 'usgs',
      siteId: '04086600',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Milwaukee River near Cedarburg, WI',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 390,
      thresholdSource: {
        label: 'MilesPaddled Milwaukee River I minimum-flow note',
        url: 'https://milespaddled.com/milwaukee-river-i/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7],
      seasonNotes:
        'Best from spring into early summer when the river is less likely to slip back into scrape mode. Summer can still work after rain, but the floor matters.',
      difficulty: 'easy',
      difficultyNotes:
        'Mostly straightforward current with intermittent riffles. Low water, not technical whitewater, is the main route-quality problem.',
      confidenceNotes:
        'The access points and gauge are solid, and the low-water floor is specific. The remaining gap is a well-supported upper target rather than the basic go/no-go floor.',
    },
    evidenceNotes: [
      {
        label: 'Published minimum',
        value: '390 cfs',
        note: 'MilesPaddled treats the Cedarburg gauge reading from this trip as the recommended minimum level for Newburg to Fredonia.',
        sourceUrl: 'https://milespaddled.com/milwaukee-river-i/',
      },
      {
        label: 'Better target day',
        value: '550 cfs upstream / 390 cfs Cedarburg',
        note: 'The same trip report says Waubedonia staff described those conditions as just past too low and close to perfect timing.',
        sourceUrl: 'https://milespaddled.com/milwaukee-river-i/',
      },
      {
        label: 'Trip style',
        value: '11-mile easy day',
        note: 'Expect swift current with mild riffles rather than a technical rapids run.',
        sourceUrl: 'https://milespaddled.com/milwaukee-river-i/',
      },
      {
        label: 'Supplemental upper-flow context',
        value: '400 to 600 cfs still works; 600+ gets less attractive',
        note: 'Wisconsin River Trips treats the Newburg segment as best around 200 to 400 cfs, still navigable at 400 to 600 cfs, and increasingly less appealing above 600 cfs. This improves the upper-flow story, but it remains community guidance rather than an official route standard.',
        sourceUrl: 'https://www.wisconsinrivertrips.com/segments/milwaukee-river/newburg',
      },
      {
        label: 'Adjacent downstream caution',
        value: '801+ cfs may be too high for an enjoyable day',
        note: 'On the adjacent Waubeka segment ending at Waubedonia Park, Wisconsin River Trips treats roughly 801 cfs and above at Cedarburg as potentially too high for an enjoyable paddle. This is useful cautionary context, but not a direct threshold for the Newburg to Waubedonia route.',
        sourceUrl: 'https://www.wisconsinrivertrips.com/segments/milwaukee-river/waubeka',
      },
      {
        label: 'Access quality',
        value: 'Public park put-in and county-park take-out',
        note: 'The route starts at Fireman\'s Park in Newburg and ends at Waubedonia Park, which has a public boat/canoe/kayak launch.',
        sourceUrl: 'https://www.ozaukeecounty.gov/Facilities/Facility/Details/Waubedonia-Park-9',
      },
    ],
    sourceLinks: [
      {
        label: 'Village of Newburg parks',
        url: 'https://newburgwi.gov/our-parks/',
      },
      {
        label: 'Ozaukee County Waubedonia Park',
        url: 'https://www.ozaukeecounty.gov/Facilities/Facility/Details/Waubedonia-Park-9',
      },
      {
        label: 'USGS 04086600 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-04086600/',
      },
      {
        label: 'Wisconsin River Trips Milwaukee River Newburg',
        url: 'https://www.wisconsinrivertrips.com/segments/milwaukee-river/newburg',
      },
      {
        label: 'Wisconsin River Trips Milwaukee River Waubeka',
        url: 'https://www.wisconsinrivertrips.com/segments/milwaukee-river/waubeka',
      },
      {
        label: 'MilesPaddled Milwaukee River I',
        url: 'https://milespaddled.com/milwaukee-river-i/',
      },
    ],
  },
  {
    id: 'milwaukee-river-lime-kiln-village-park',
    slug: 'milwaukee-river-lime-kiln-village-park',
    name: 'Milwaukee River',
    reach: 'Lime Kiln Park to Village Park',
    state: 'Wisconsin',
    region: 'Southeast Wisconsin',
    summary:
      'Grafton-to-Thiensville Milwaukee run with a livelier opening than most easy river shuttles. The main decision is still water level first, but this route also deserves an honest skill check because the opening island split and Class I ledge are not beginner-flatwater features.',
    statusText:
      'Treat about 260 cfs at Cedarburg as a conservative floor. That level is route-specific and recommendable, but the app stays minimum-only because there is no stronger published range for this exact Lime Kiln to Thiensville segment.',
    latitude: 43.30534,
    longitude: -87.95358,
    gaugeSource: {
      id: 'usgs-04086600',
      provider: 'usgs',
      siteId: '04086600',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Milwaukee River near Cedarburg, WI',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 260,
      thresholdSource: {
        label: 'MilesPaddled Milwaukee River III route-day gauge note',
        url: 'https://milespaddled.com/milwaukee-river-iii/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Spring through early fall is the practical window. The route is more likely to lose quality from low water and summer weediness than from a narrow official sweet spot.',
      difficulty: 'moderate',
      difficultyNotes:
        'The first mile asks for more boat control than the average easy Milwaukee route because of the island split, riffles, and a Class I ledge option. The lower half then slows down and picks up more suburban and motorboat context.',
      confidenceNotes:
        'Confidence is solid on the route, gauge, and endpoint naming. The weak point is threshold quality: the app has a route-specific recommendable day at 260 cfs, but not a stronger published minimum-to-maximum ladder for this exact reach.',
    },
    evidenceNotes: [
      {
        label: 'Route-day floor',
        value: '260 cfs',
        note: 'MilesPaddled ran this exact Lime Kiln Park to Thiensville route at 260 cfs on the Cedarburg gauge and recommended that level for the trip.',
        sourceUrl: 'https://milespaddled.com/milwaukee-river-iii/',
      },
      {
        label: 'Route shape',
        value: '8.75 river miles',
        note: 'MilesPaddled documents the route as an 8.75-mile shuttle from Lime Kiln Park in Grafton to Thiensville.',
        sourceUrl: 'https://milespaddled.com/milwaukee-river-iii/',
      },
      {
        label: 'Put-in authority',
        value: 'Village park with canoe ramp',
        note: 'Grafton officially says Lime Kiln Park includes a canoe ramp plus upper and lower parking lots, which is stronger endpoint support than the old route draft had.',
        sourceUrl: 'https://www.villageofgraftonwi.gov/387/Lime-Kiln-Park',
      },
      {
        label: 'Take-out authority',
        value: 'Village Park boat launch and trailer parking',
        note: 'Thiensville officially says Village Park has a boat launch and trailer parking on the Milwaukee River and serves as the local portage point around the dam.',
        sourceUrl: 'https://www.village.thiensville.wi.us/144/Boating',
      },
      {
        label: 'Route character',
        value: 'Riffles and Class I ledge up top; slower suburban lower half',
        note: 'MilesPaddled describes an opening island split with either riffles and a rock wall or a Class I drop, followed by a wider slower lower river with more development and powerboats.',
        sourceUrl: 'https://milespaddled.com/milwaukee-river-iii/',
      },
      {
        label: 'Operations note',
        value: 'Village Park hours 6 a.m. to 10 p.m.',
        note: 'The official Village Park page confirms a boat launch, two parking lots, and posted park hours, which strengthens the Thiensville finish logistics.',
        sourceUrl: 'https://www.village.thiensville.wi.us/Facilities/Facility/Details/Village-Park-2',
      },
    ],
    sourceLinks: [
      {
        label: 'Village of Grafton Lime Kiln Park',
        url: 'https://www.villageofgraftonwi.gov/387/Lime-Kiln-Park',
      },
      {
        label: 'Village of Thiensville boating',
        url: 'https://www.village.thiensville.wi.us/144/Boating',
      },
      {
        label: 'Village of Thiensville Village Park',
        url: 'https://www.village.thiensville.wi.us/Facilities/Facility/Details/Village-Park-2',
      },
      {
        label: 'USGS 04086600 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-04086600/',
      },
      {
        label: 'MilesPaddled Milwaukee River III',
        url: 'https://milespaddled.com/milwaukee-river-iii/',
      },
    ],
  },
  {
    id: 'milwaukee-river-waubedonia-veterans',
    slug: 'milwaukee-river-waubedonia-veterans',
    name: 'Milwaukee River',
    reach: 'Waubedonia Park to Veterans Memorial Park',
    state: 'Wisconsin',
    region: 'Southeast Wisconsin',
    summary:
      'Longer lower-Milwaukee day with mostly easy current, a few livelier upper stretches, and a simple main question first: is Cedarburg comfortably above the skinny-water floor without levels climbing high enough to turn a mellow day into a murkier faster river run?',
    statusText:
      'Treat about 390 cfs at Cedarburg as a conservative floor. This route can work below the high-water zone, but the source trail is still much stronger on the low side than on a polished ideal band.',
    latitude: 43.39525,
    longitude: -87.96133,
    gaugeSource: {
      id: 'usgs-04086600',
      provider: 'usgs',
      siteId: '04086600',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Milwaukee River near Cedarburg, WI',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 390,
      thresholdSource: {
        label: 'Conservative same-gauge floor from Milwaukee River community trip reports',
        url: 'https://milespaddled.com/milwaukee-river-i/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Spring through early fall is the main window. Summer still works, but this longer lower-river shuttle loses quality quickly when the gauge slips toward scrape range or when fresh rain muddies the river and speeds it up.',
      difficulty: 'easy',
      difficultyNotes:
        'Mostly straightforward moving water, but one longer day, intermittent riffles, and an upper ledge-like feature keep it from being a pure flatwater float.',
      confidenceNotes:
        'The access points and direct gauge are solid. The weakest part is still the threshold model: the app can defend a same-gauge low-water floor and some high-water caution, but not a clean ideal band for this exact reach yet.',
    },
    evidenceNotes: [
      {
        label: 'Route shape',
        value: '13.25 river miles',
        note: 'MilesPaddled documents Waubedonia Park to Veterans Memorial Park as a 13.25-mile downstream Milwaukee River shuttle.',
        sourceUrl: 'https://milespaddled.com/milwaukee-river-vi/',
      },
      {
        label: 'Conservative low-water floor',
        value: '390 cfs',
        note: 'The app carries forward the same Cedarburg-gauge minimum used on the immediately upstream Newburg to Waubedonia route. That same-gauge floor is a safer low-side call than pretending this lower route has its own clean published minimum.',
        sourceUrl: 'https://milespaddled.com/milwaukee-river-i/',
      },
      {
        label: 'High-water reference day',
        value: '760 cfs = high',
        note: 'MilesPaddled reports this Waubedonia-to-Grafton run at about 760 cfs on the Cedarburg gauge and describes the river as high that day.',
        sourceUrl: 'https://milespaddled.com/milwaukee-river-vi/',
      },
      {
        label: 'Supplemental downstream context',
        value: '101 to 200 cfs low side; 801+ cfs maybe too high',
        note: 'Wisconsin River Trips treats the Thiensville stretch of the same river and same gauge as low but navigable around 101 to 200 cfs, average at 201 to 300 cfs, and potentially too high for enjoyable paddling above about 801 cfs. That is useful context, but not a route-specific standard for this whole Waubedonia-to-Grafton corridor.',
        sourceUrl: 'https://www.wisconsinrivertrips.com/segments/milwaukee-river/thiensville',
      },
      {
        label: 'Route character',
        value: 'Light rapids upstream; more suburban and flowage paddling near Grafton',
        note: 'Wisconsin River Trips’ Milwaukee overview breaks this corridor into a livelier Waubedonia-to-Ehlers section and a slower Grafton Canoe Launch-to-Veterans section with only minor rapids in the upper stretch.',
        sourceUrl: 'https://www.wisconsinrivertrips.com/segments/milwaukee-river',
      },
      {
        label: 'Access quality',
        value: 'County-park launch to village canoe/kayak park',
        note: 'Waubedonia Park has a public boat/canoe/kayak launch, and Veterans Memorial Park has a village canoe/kayak launch plus adjacent parking.',
        sourceUrl: 'https://www.villageofgraftonwi.gov/267/Veterans-Memorial-Park',
      },
      {
        label: 'Official park operations',
        value: 'Waubedonia 6 a.m. to 9 p.m.; public launch at no cost',
        note: 'Ozaukee County says Waubedonia is open to day visitors from 6 a.m. to 9 p.m. and that boats, canoes, and kayaks are welcome at the public launch at no cost.',
        sourceUrl: 'https://www.ozaukeecounty.gov/670/Waubedonia-Park',
      },
    ],
    sourceLinks: [
      {
        label: 'Ozaukee County Waubedonia Park page',
        url: 'https://www.ozaukeecounty.gov/670/Waubedonia-Park',
      },
      {
        label: 'Ozaukee County Waubedonia Park',
        url: 'https://www.ozaukeecounty.gov/Facilities/Facility/Details/Waubedonia-Park-9',
      },
      {
        label: 'Village of Grafton Veterans Memorial Park',
        url: 'https://www.villageofgraftonwi.gov/267/Veterans-Memorial-Park',
      },
      {
        label: 'USGS 04086600 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-04086600/',
      },
      {
        label: 'Wisconsin River Trips Milwaukee overview',
        url: 'https://www.wisconsinrivertrips.com/segments/milwaukee-river',
      },
      {
        label: 'Wisconsin River Trips Milwaukee River Thiensville',
        url: 'https://www.wisconsinrivertrips.com/segments/milwaukee-river/thiensville',
      },
      {
        label: 'MilesPaddled Milwaukee River I',
        url: 'https://milespaddled.com/milwaukee-river-i/',
      },
      {
        label: 'MilesPaddled Milwaukee River VI',
        url: 'https://milespaddled.com/milwaukee-river-vi/',
      },
    ],
  },
  {
    id: 'wapsipinicon-river-state-park-newport-mills',
    slug: 'wapsipinicon-river-state-park-newport-mills',
    name: 'Wapsipinicon River',
    reach: 'Wapsipinicon State Park to Newport Mills',
    state: 'Iowa',
    region: 'Eastern Iowa',
    summary:
      'Scenic Jones County day trip with bluff scenery, some riffles, and a very clear quality question: is the Anamosa gauge safely above the scrape floor?',
    statusText:
      'Treat 4.77 ft at Anamosa as the bare low-water floor. Around 5.0 to 5.25 ft looks like the better target, but the app stays conservative above the minimum because a high-water ceiling is not yet well sourced.',
    latitude: 42.09819,
    longitude: -91.28755,
    gaugeSource: {
      id: 'usgs-05421740',
      provider: 'usgs',
      siteId: '05421740',
      metric: 'gage_height_ft',
      unit: 'ft',
      kind: 'direct',
      siteName: 'Wapsipinicon River at Anamosa, IA',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 4.77,
      thresholdSource: {
        label: 'MilesPaddled Wapsipinicon River minimum-flow note',
        url: 'https://milespaddled.com/wapsipinicon-river/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'medium',
      seasonMonths: [4, 5, 6, 7, 8, 9],
      seasonNotes:
        'Late spring through early fall is the practical window. This stretch stays pretty through summer, but lower water quickly turns riffles into scraping.',
      difficulty: 'easy',
      difficultyNotes:
        'Quietwater with some riffles. The route is friendly for newer paddlers when levels are workable, but it is still a 9-mile moving-water day.',
      confidenceNotes:
        'The direct gauge and public access are solid. The best numeric support today is a low-water floor plus an ideal note from one detailed trip report, not a published upper range.',
    },
    evidenceNotes: [
      {
        label: 'Published minimum',
        value: '4.77 ft',
        note: 'MilesPaddled treats the trip-day Anamosa reading as the lowest recommended level and advises against going below it.',
        sourceUrl: 'https://milespaddled.com/wapsipinicon-river/',
      },
      {
        label: 'Better target',
        value: '5.0 to 5.25 ft',
        note: 'The same source says 5.0 to 5.25 ft would be the more ideal band for avoiding frequent scraping.',
        sourceUrl: 'https://milespaddled.com/wapsipinicon-river/',
      },
      {
        label: 'Route shape',
        value: '9 miles with some riffles',
        note: 'This is an easy scenic day trip, not a flat impoundment float. Expect riffles and bluff scenery almost immediately below the park.',
        sourceUrl: 'https://milespaddled.com/wapsipinicon-river/',
      },
      {
        label: 'Public access confirmed',
        value: 'State-park put-in and county access take-out',
        note: 'Jones County maintains a dedicated Newport Mills Access page with hours and directions, and county programming explicitly uses this exact Wapsipinicon State Park to Newport Mills shuttle.',
        sourceUrl: 'https://www.mycountyparks.com/County/Jones/Park/Newport-Mills-Access',
      },
    ],
    sourceLinks: [
      {
        label: 'Iowa DNR Wapsipinicon State Park',
        url: 'https://www.iowadnr.gov/places-go/state-parks/all-parks/wapsipinicon-state-park',
      },
      {
        label: 'Jones County Newport Mills Access',
        url: 'https://www.mycountyparks.com/County/Jones/Park/Newport-Mills-Access',
      },
      {
        label: 'Jones County Wapsipinicon State Park boat ramp',
        url: 'https://www.mycountyparks.com/County/Jones/Park/Wapsipinicon-State-Park-Anamosa-Boat-Ramp',
      },
      {
        label: 'Jones County Paddling the Wapsi event route note',
        url: 'https://www.mycountyparks.com/county/jones/park/central-park/events/20918/Paddling-the-Wapsi.aspx?DisplayMode=PrinterFriendly',
      },
      {
        label: 'USGS 05421740 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/05421740/',
      },
      {
        label: 'MilesPaddled Wapsipinicon River',
        url: 'https://milespaddled.com/wapsipinicon-river/',
      },
    ],
  },
  {
    id: 'kinnickinnic-river-glen-park-state-park',
    slug: 'kinnickinnic-river-glen-park-state-park',
    name: 'Kinnickinnic River',
    reach: 'Glen Park to Kinnickinnic State Park',
    state: 'Wisconsin',
    region: 'Western Wisconsin',
    summary:
      'Clear, fast, bluff-lined Class II day paddle where the main call is whether the River Falls gauge is clearly above a scrape-heavy floor and whether your group is ready for sustained swiftwater plus a steep carry out.',
    statusText:
      'Treat about 175 cfs at River Falls as the practical low-water floor. The river was still runnable at 125 cfs, but scrape-heavy enough that the app stays conservative below 175.',
    latitude: 44.85075,
    longitude: -92.63882,
    gaugeSource: {
      id: 'usgs-05342000',
      provider: 'usgs',
      siteId: '05342000',
      metric: 'discharge_cfs',
      unit: 'cfs',
      kind: 'direct',
      siteName: 'Kinnickinnic River near River Falls, WI',
    },
    profile: {
      thresholdModel: 'minimum-only',
      tooLow: 175,
      thresholdSource: {
        label: 'MilesPaddled Kinnickinnic River minimum-flow note',
        url: 'https://milespaddled.com/kinnickinnic-river/',
      },
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'high',
      seasonMonths: [4, 5, 6, 7, 8, 9, 10],
      seasonNotes:
        'Spring through early fall is the main season. Cold water and fast post-rain changes matter more here than on the average easy float.',
      difficulty: 'hard',
      difficultyNotes:
        'Continuous swiftwater, shallow class II features, anglers, and the steep state-park carry keep this well above a casual beginner run.',
      confidenceNotes:
        'The route and direct gauge are strong, and the low-water story is specific. The main remaining gap is a reliable upper range for when fast water stops being a fun Class II day.',
    },
    evidenceNotes: [
      {
        label: 'Scrape-heavy trip day',
        value: '125 cfs',
        note: 'MilesPaddled ran the full River Falls to state-park route at 125 cfs and described it as doable but scrape-prone.',
        sourceUrl: 'https://milespaddled.com/kinnickinnic-river/',
      },
      {
        label: 'Practical minimum',
        value: '~175 cfs',
        note: 'The same source says about 175 cfs is the better minimum for a fun run that is less damaging to boats.',
        sourceUrl: 'https://milespaddled.com/kinnickinnic-river/',
      },
      {
        label: 'Difficulty',
        value: 'Class II swiftwater',
        note: 'The route stays lively for miles below River Falls before easing near the St. Croix.',
        sourceUrl: 'https://milespaddled.com/kinnickinnic-river/',
      },
      {
        label: 'Launch support',
        value: 'Official Glen Park corridor launch shown on city map',
        note: 'River Falls city mapping for the Kinni Trail System shows a canoe and kayak launch in the Glen Park corridor, which strengthens the below-dam put-in story beyond community trip notes alone.',
        sourceUrl: 'https://rfcity.org/DocumentCenter/View/63',
      },
      {
        label: 'Supplemental high-water caution',
        value: '250+ cfs may get pushy',
        note: 'Wisconsin River Trips treats roughly 250 cfs and above at River Falls as the point where this lower Kinni run may become too pushy and murky for a typical day.',
        sourceUrl: 'https://www.wisconsinrivertrips.com/segments/kinnickinnic-river',
      },
      {
        label: 'Take-out friction',
        value: 'Steep carry and park admission',
        note: 'The state-park finish uses the official concrete take-out but requires a steep carry back to the parking area and a Wisconsin state-park pass.',
        sourceUrl: 'https://milespaddled.com/kinnickinnic-river/',
      },
    ],
    sourceLinks: [
      {
        label: 'City of River Falls Glen Park',
        url: 'https://www.rfcity.org/facilities/facility/details/Glen-Park-4',
      },
      {
        label: 'City of River Falls mapping portal',
        url: 'https://rfcity.org/248/City-Mapping',
      },
      {
        label: 'City of River Falls Kinni Trail System map',
        url: 'https://rfcity.org/DocumentCenter/View/63',
      },
      {
        label: 'Wisconsin DNR Kinnickinnic State Park',
        url: 'https://dnr.wisconsin.gov/topic/parks/kinnickinnic',
      },
      {
        label: 'Wisconsin DNR Kinnickinnic State Park map',
        url: 'https://widnr.widen.net/s/dzprmf7qbw/kinnickinnic_map',
      },
      {
        label: 'Wisconsin DNR Kinnickinnic River Gorge and Delta SNA',
        url: 'https://dnr.wisconsin.gov/topic/statenaturalareas/KinnickinnicRiverGorgeandDelta',
      },
      {
        label: 'Wisconsin DNR Kinnickinnic River Fishery Area',
        url: 'https://dnr.wisconsin.gov/topic/Lands/FisheriesAreas/kinnickinnic.html',
      },
      {
        label: 'USGS 05342000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05342000/',
      },
      {
        label: 'Wisconsin River Trips Kinnickinnic segment notes',
        url: 'https://www.wisconsinrivertrips.com/segments/kinnickinnic-river',
      },
      {
        label: 'MilesPaddled Kinnickinnic River',
        url: 'https://milespaddled.com/kinnickinnic-river/',
      },
    ],
  },
];
