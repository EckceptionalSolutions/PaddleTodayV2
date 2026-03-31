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
      'Classic Driftless float with clear water, bluff scenery, and one strong rule: do not show up under the published low-water floor and expect a clean day.',
    statusText:
      'Treat 200 cfs as the low-water floor. Above that can be in play, but the app does not yet have a defendable upper target or high-water cutoff for this reach.',
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
        'The app only has a community-sourced low-water floor for this reach today. Official county and Iowa DNR sources support the segment itself, but not a published upper target band.',
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
        note: 'Fast rises and fresh wood after storms lower confidence because no defensible high-water threshold is calibrated yet.',
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
      'Mostly mellow Sugar River day trip where the main decision is simple: avoid very low water, then keep the rest of the call conservative because the upper band is not calibrated yet.',
    statusText:
      'Treat 60 cfs at Verona as the low-water floor. Above that can be workable, but the app does not yet have a defendable high-side target for this reach.',
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
        'The only defendable numeric threshold here is a community-sourced low-water minimum. The route itself is straightforward, but the app does not yet have a published upper target or high-water cutoff.',
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
        note: 'The Verona gauge provides a workable low-water reference, but the app does not yet have defensible high-side guidance for this exact reach.',
        sourceUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-05435950/',
      },
      {
        label: 'Difficulty',
        value: 'Easy',
        note: 'Good candidate for an easy day only once the river is clearly above its published minimum.',
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
      'Treat 55 cfs at Delafield as the low-water floor. Above that can be in play, but the app does not yet have a defendable upper target or high-water cutoff for this reach.',
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
        'The app only has a defendable low-water floor here. That is enough to avoid obviously bad days, but not enough to promise a clean upper-range sweet spot.',
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
        note: 'This is a low-water-floor call today, not a fully calibrated sweet-spot river.',
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
      'Treat 60 cfs at Ontario as the low-water floor. Above that can be worthwhile, but the app does not yet have a defendable high-water cutoff for this reach.',
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
        'The app has a defendable low-water floor from community trip guidance, but not a calibrated high-water cutoff. Treat rising water and flood context cautiously even when the river is above minimum.',
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
        note: 'Existing route notes describe this as a good range, but it is still community guidance rather than an official manager-published threshold.',
        sourceUrl: 'https://milespaddled.com/kickapoo-river-i/',
      },
      {
        label: 'High-water caution',
        value: 'Avoid flood conditions',
        note: 'The route is rain-sensitive and can turn pushy quickly. The app is intentionally not pretending the upper band is calibrated yet.',
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
        'The same Zumbro Falls gauge context carries downriver, but the exact sweet spot is still partly community-derived. Confidence is best when the gauge is stable and recent rain is quiet.',
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
      'Long Decorah-area Upper Iowa day where the main decision is still low water. This stays scenic and approachable above its floor, but the app is not pretending it has a calibrated high-side sweet spot yet.',
    statusText:
      'Treat 150 cfs near Decorah as the low-water floor. Above that can be in play, but the app does not yet have a defendable upper target or high-water cutoff for this reach.',
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
        'The only defendable numeric threshold here is a community-sourced low-water floor. The route itself is friendly, but the app does not yet have a published upper target or high-water cutoff for this full Decorah reach.',
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
];
