import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const americanWhitewater = {
  label: 'American Whitewater Hangman’s Bridge to Highway 395 reach',
  url: 'https://www.americanwhitewater.org/content/River/view/river-detail/162/main',
  provider: 'local' as const,
};
const ndow = {
  label: 'Nevada Department of Wildlife East Fork Carson River access and land guidance',
  url: 'https://www.ndow.org/waters/carson-river-east-fork/',
  provider: 'local' as const,
};
const carsonDistrict = {
  label: 'Carson Water Subconservancy District access and take-out review',
  url: 'https://www.cwsd.org/wp-content/uploads/2021/08/8-18-21-CWSD-Board-Meeting-Agenda-Package.pdf',
  provider: 'local' as const,
};
const forestService = {
  label: 'Humboldt-Toiyabe National Forest Carson River Takeout',
  url: 'https://www.fs.usda.gov/r04/humboldt-toiyabe/recreation/carson-river-takeout',
  provider: 'local' as const,
};
const ndepPullout = {
  label: 'Nevada Division of Environmental Protection Carson River monitoring locations',
  url: 'https://ndep.nv.gov/uploads/documents/Carson_Ground_Temp_8dec11_final.pdf',
  provider: 'local' as const,
};
const dreamflows = {
  label: 'Dreamflows East Fork Carson River community flow triggers',
  url: 'https://www.dreamflows.com/triggerLevels.php',
  provider: 'local' as const,
};
const photoSource = {
  label: 'Rafting the East Fork of the Carson River photograph and CC BY-SA 4.0 license',
  url: 'https://commons.wikimedia.org/wiki/File:Rafting_the_East_Fork_of_the_Carson_River.jpg',
  provider: 'local' as const,
};
const gauge = {
  id: 'usgs-10309000',
  provider: 'usgs' as const,
  siteId: '10309000',
  metric: 'discharge_cfs' as const,
  unit: 'cfs' as const,
  kind: 'direct' as const,
  siteName: 'East Fork Carson River near Gardnerville, NV',
  detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-10309000/',
};
const hangmanBridge = {
  name: 'Hangman’s Bridge public put-in (river-right water edge)',
  latitude: 38.6898,
  longitude: -119.76551,
};
const washoeRoad = {
  name: 'Washoe Road / East Fork raft pullout (river-right water edge)',
  latitude: 38.86955,
  longitude: -119.69331,
};
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'dam', 'private_banks'];

export const nevadaEastForkCarsonRoutes: River[] = [
  {
    id: 'east-fork-carson-hangmans-bridge-washoe-road',
    slug: 'east-fork-carson-hangmans-bridge-washoe-road',
    name: 'East Fork Carson River',
    riverId: 'east-fork-carson-river-nevada',
    state: 'Nevada',
    region: 'East Fork Carson River / Markleeville to Gardnerville',
    reach: 'Hangman’s Bridge public put-in to Washoe Road River Access, above Ruhenstroth Dam',
    routeType: 'recreational',
    scoreEligibility: 'scored',
    latitude: hangmanBridge.latitude,
    longitude: hangmanBridge.longitude,
    putIn: hangmanBridge,
    takeOut: washoeRoad,
    gaugeSource: gauge,
    profile: {
      thresholdModel: 'two-sided',
      tooLow: 600,
      idealMin: 1275,
      idealMax: 1725,
      tooHigh: 5000,
      thresholdSource: dreamflows,
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'low',
      windSensitivity: 0.1,
      seasonMonths: [4, 5, 6],
      seasonNotes: 'A spring snowmelt run. The named flow range is a community-derived planning cue; season length varies with snowpack and current. Verify direct USGS 10309000 discharge and trend, weather and all access notices before launch.',
      difficulty: 'moderate',
      difficultyNotes: 'American Whitewater rates the 19.1-mile reach II+(III). The current is continuous through the opening miles, with occasional Class III features, very cold water and limited exits. The Washoe Road take-out is mandatory before Ruhenstroth Dam.',
      confidenceNotes: 'American Whitewater documents the 19.1-mile Hangman’s Bridge–Highway 395 run and the Washoe Road take-out at mile 19.12, with Ruhenstroth Dam at mile 19.6. Dreamflows provides two-sided community planning bands against the direct same-river USGS 10309000 gauge near Gardnerville. Thresholds are not safety guarantees.',
    },
    safetyProfile: {
      riskLevel: 'caution',
      reviewStatus: 'reviewed',
      hazards,
      safetyNotes: [
        'This long whitewater day is appropriate only for paddlers equipped and skilled for continuous Class II with occasional Class III features at the selected flow. Scout features and do not launch beyond your group’s ability.',
        'The water is extremely cold and the first miles have continuous rapids beside steep, eroded banks. Wear a properly fitted PFD, helmet and suitable cold-water protection; plan for swimmer recovery and hypothermia prevention.',
        'Take out at the Washoe Road river-right pullout before Ruhenstroth Dam. American Whitewater places the take-out at about mile 19.12 and the dam hazard at mile 19.6; do not continue downstream or attempt the dam.',
        'There are few practical exits between Hangman’s Bridge and Washoe Road. Stage the shuttle in advance, carry offline navigation and emergency communication, and do not rely on cell service or roadside access through the canyon.',
        'Nevada owns the river channel, but adjacent banks include private and Washoe Tribal land. Stay in the channel except at the named public accesses and do not trespass for scouting, camping or an emergency exit unless necessary to protect life.',
        'Check direct USGS 10309000, the community flow cue, weather and road conditions. Flow can rise rapidly during snowmelt or storms; confirm the Washoe Road take-out remains accessible before launching.',
      ],
    },
    sourceLinks: [americanWhitewater, ndow, carsonDistrict, forestService, ndepPullout, dreamflows, photoSource, {
      label: 'USGS East Fork Carson River near Gardnerville, station 10309000',
      url: gauge.detailUrl,
      provider: 'usgs',
    }],
    summary: 'A popular spring-snowmelt whitewater trip from Hangman’s Bridge into Nevada’s Carson Valley, with a mandatory public take-out above Ruhenstroth Dam.',
    statusText: 'Check USGS 10309000 discharge and trend, weather, shuttle roads and current public access before launching; exit at Washoe Road before Ruhenstroth Dam.',
    accessPoints: [
      {
        ...hangmanBridge,
        id: 'east-fork-carson-hangmans-bridge-washoe-road-put-in',
        mileFromStart: 0,
        segmentKind: 'transition',
        note: 'American Whitewater describes a small, marginal public entry area on river right immediately downstream of the bridge. Verify the landing and legal parking before unloading.',
      },
      {
        ...washoeRoad,
        id: 'east-fork-carson-hangmans-bridge-washoe-road-take-out',
        mileFromStart: 19.12,
        segmentKind: 'transition',
        note: 'Documented river-right Washoe Road raft pullout and mandatory exit above Ruhenstroth Dam. The public parking/bathroom access is at the end of Washoe Road; confirm the current landing and road condition.',
      },
    ],
    logistics: {
      distanceLabel: 'About 19.1 river miles',
      estimatedPaddleTime: 'Plan a full daylight day; allow extra time for scouting, shuttle staging and the mandatory take-out before the dam',
      shuttle: 'Use two vehicles and stage the downstream vehicle at the end of Washoe Road before driving to Hangman’s Bridge. The long canyon has limited practical exits.',
      permits: 'Confirm current California/Nevada boating rules, Forest Service take-out status and road conditions. Stay at designated public accesses, remain in the river channel except in an emergency, and respect private and Washoe Tribal land.',
      camping: 'Treat this as a long day trip. East Fork Resort above Hangman’s Bridge has campsites, but boaters must contact the operator in advance for permission to camp or use its river frontage. No on-route campsite is included; do not assume hot-spring or private/tribal banks are legal campsites.',
      campingClassification: 'nearby_basecamp',
      summary: 'A 19.1-mile spring whitewater run with a mandatory take-out above Ruhenstroth Dam.',
      accessCaveats: [
        'Hangman’s Bridge water access is described as marginal; verify parking and the small river-right landing before launch.',
        'Washoe Road is the signed-by-source river-right exit above Ruhenstroth Dam. Do not continue to the dam or rely on the dam site as a take-out.',
        'NDOW says Nevada owns the channel but warns against trespass on private land; parts of the surrounding valley are Washoe Tribal land.',
      ],
      watchFor: [
        'Continuous Class II and occasional Class III whitewater, especially through the first miles',
        'Extremely cold water, undercut/eroded banks and strainers',
        'Ruhenstroth Dam immediately downstream of the mandatory Washoe Road take-out',
        'Limited exits, snowmelt changes, private shoreline and Washoe Tribal boundaries',
      ],
    },
    evidenceNotes: [
      {
        label: 'Named popular reach and mandatory take-out',
        value: 'Hangman’s Bridge to Washoe Road River Access: 19.12 mi; Ruhenstroth Dam: 19.6 mi',
        note: 'American Whitewater describes the reach as popular, rates it II+(III), identifies one-day trips as viable and marks the Washoe Road take-out before the dam. NDOW independently says boaters must exit above Ruhenstroth Dam.',
        sourceUrl: americanWhitewater.url,
      },
      {
        label: 'Public water-entry markers',
        value: 'Hangman’s Bridge downstream river-right entry: 38.6898, -119.76551; East Fork raft pullout near Washoe Bridge: 38.86955, -119.69331',
        note: 'The bridge entry follows the published Hangman’s Bridge access coordinate and American Whitewater’s river-right downstream entry description. NDEP identifies the Washoe-area point as the East Fork raft pullout; the Carson Water Subconservancy District places the public parking/bathroom access at the end of Washoe Road about ¼ mile above Ruhenstroth Dam.',
        sourceUrl: ndepPullout.url,
      },
      {
        label: 'Reach-specific flow planning range',
        value: 'USGS 10309000 near Gardnerville: 600 cfs minimum good; 1,275–1,725 cfs preferred; 5,000 cfs upper good boundary',
        note: 'Dreamflows publishes this two-sided community-derived range for Hangman’s Bridge to Route 395 against the near-Gardnerville gauge. Use it only as a trip-planning input; current gauge trend, skill, boat type and observed conditions control the decision to launch.',
        sourceUrl: dreamflows.url,
      },
      {
        label: 'Safety and land boundaries',
        value: 'Cold water, continuous early rapids, few exits, dam take-out, private and Washoe Tribal banks',
        note: 'American Whitewater describes cold water, constant early rapids and eroded banks. NDOW says the river channel is public but warns against trespassing on adjacent private property; exit above Ruhenstroth Dam.',
        sourceUrl: ndow.url,
      },
      {
        label: 'Camping',
        value: 'Long day trip; nearby reservation-based campground only',
        note: 'American Whitewater says the East Fork Resort just above Hangman’s Bridge has campsites and requires advance contact for camping or river-frontage use. No overnight stop is assumed within the route corridor.',
        sourceUrl: americanWhitewater.url,
      },
      {
        label: 'Gallery image and reuse rights',
        value: 'Rafting the East Fork of the Carson River, 30 May 2010',
        note: 'Local route-specific image by Matkatamiba, reused under CC BY-SA 4.0 with author credit. It shows rafting on the named river, not a current condition or access-point view.',
        sourceUrl: photoSource.url,
      },
      {
        label: 'Consolidation and overlap review',
        value: 'Distinct cross-border East Fork route; no existing Hangman’s Bridge–Washoe Road card',
        note: 'Search of the Nevada route catalog found no duplicate identifier or card for this reach. Existing Nevada Carson River Aquatic Trail cards begin around Carson City, well downstream; this East Fork run ends at a separately documented Washoe Road access above Ruhenstroth Dam.',
        sourceUrl: forestService.url,
      },
    ],
  },
];
