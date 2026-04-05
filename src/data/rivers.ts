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
        label: 'MilesPaddled Straight River',
        url: 'https://milespaddled.com/straight-river/',
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
        label: 'USGS 05384000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05384000/',
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
        'The route and gauge are both officially supported, and the DNR river-level page provides a real paddling ladder for the St. Francis gauge. Confidence is still not absolute because DNR flags these interpretations as human-reviewed guidance rather than infallible route-specific truth.',
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
        'The route itself is a Minnesota DNR recommended day trip and the DNR river-level system publishes a real interpreted ladder for the matching Sauk gauge. Confidence stays a bit below absolute because the ladder is a broad paddling interpretation, not a custom route-only score model.',
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
        'The official DNR ladder gives this route a defendable numeric band on the Pine City gauge, but the Mora segment still leans more on local knowledge than a state-water-trail park-to-park float. Confidence is tempered by route length, wood, and the fact that the access pair comes from local route knowledge rather than an official DNR segment page.',
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
        'This route now has both official access support and an official DNR paddling ladder for the lower North Fork Crow corridor. Confidence stays below absolute because the DNR ladder is broad and the route is long enough that strainers, fatigue, and storm debris still matter beyond the raw number.',
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
        'MCWD publishes an official paddling band and explicitly ties it to the live USGS Hiawatha gauge, which makes this a stronger route than most old-repo candidates. Confidence is still capped by the creek itself, because bridge clearance, wood, and urban obstacles can change the day even inside the official flow range.',
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
    latitude: 45.9529653,
    longitude: -92.7380752,
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
        note: 'This is a full but approachable day with easy current, limestone scenery, and a riffly finish near Dundas.',
        sourceUrl: 'https://files.dnr.state.mn.us/maps/canoe_routes/cannon1_straight.pdf',
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
        label: 'MN DNR Cannon / Straight canoe route map PDF',
        url: 'https://files.dnr.state.mn.us/maps/canoe_routes/cannon1_straight.pdf',
      },
      {
        label: 'USGS 05355024 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05355024/',
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
        label: 'MilesPaddled Milwaukee River I',
        url: 'https://milespaddled.com/milwaukee-river-i/',
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
        note: 'Jones County conservation programming explicitly stages this route from Wapsipinicon State Park to Newport Mills Access when river levels are suitable.',
        sourceUrl: 'https://www.mycountyparks.com/county/jones/park/central-park/events/20918/Paddling-the-Wapsi.aspx?DisplayMode=PrinterFriendly',
      },
    ],
    sourceLinks: [
      {
        label: 'Iowa DNR Wapsipinicon State Park',
        url: 'https://www.iowadnr.gov/places-go/state-parks/all-parks/wapsipinicon-state-park',
      },
      {
        label: 'Jones County parks listing',
        url: 'https://www.mycountyparks.com/County/Jones/Parks',
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
        label: 'Wisconsin DNR Kinnickinnic State Park',
        url: 'https://dnr.wisconsin.gov/topic/parks/kinnickinnic',
      },
      {
        label: 'Wisconsin DNR Kinnickinnic River Gorge and Delta SNA',
        url: 'https://dnr.wisconsin.gov/topic/statenaturalareas/KinnickinnicRiverGorgeandDelta',
      },
      {
        label: 'USGS 05342000 monitoring location',
        url: 'https://waterdata.usgs.gov/monitoring-location/USGS-05342000/',
      },
      {
        label: 'MilesPaddled Kinnickinnic River',
        url: 'https://milespaddled.com/kinnickinnic-river/',
      },
    ],
  },
];
