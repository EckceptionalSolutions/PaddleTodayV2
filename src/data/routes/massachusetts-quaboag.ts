import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const awGuide = { label: 'American Whitewater Quaboag Lucy Stone to Route 67', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/697/main', provider: 'american_whitewater' as const };
const paddlerGuide = { label: 'Massachusetts Paddler Quaboag Lucy Stone to Route 67', url: 'https://massachusettspaddler.com/q2-lucy-stone-park-to-whitewater-rt-67-take-out', provider: 'local' as const };
const townGuide = { label: 'Town of Warren Lucy Stone Park', url: 'https://warren-ma.gov/405/Lucy-Stone-Park', provider: 'local' as const };
const campingGuide = { label: 'Quinebaug Cove Campground tent and camper sites', url: 'https://quinebaugcove.com/ways-to-stay/', provider: 'local' as const };
const flowGuide = { label: 'Old Paddlers Almanac Quaboag runnable level', url: 'https://www.mvpclub.org/news/OldPaddlersAlmanac2007.pdf', provider: 'local' as const };
const floodGuide = { label: 'USACE Quaboag West Brimfield gauge page', url: 'https://reservoircontrol.usace.army.mil/nae_ords/cwmsweb/cwms_realtime.riverpage?gagecode=WBF', provider: 'local' as const };
const gauge = { id: 'usgs-01176000', provider: 'usgs' as const, siteId: '01176000', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Quaboag River at West Brimfield, MA', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-01176000/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'dam', 'private_banks'];

const putIn = { name: 'Lucy Stone Park paddling beach (water-entry edge)', latitude: 42.2175, longitude: -72.1931667 };
const takeOut = { name: 'Route 67 Whitewater take-out (circular pull-off, water-entry edge)', latitude: 42.2035, longitude: -72.263 };

const lucyStoneRoute: River = {
  id: 'quaboag-river-lucy-stone-route-67',
  slug: 'quaboag-river-lucy-stone-route-67',
  name: 'Quaboag River',
  riverId: 'quaboag-river-massachusetts',
  state: 'Massachusetts',
  region: 'Worcester County / Warren–Brimfield',
  routeType: 'whitewater',
  scoreEligibility: 'scored',
  gaugeSource: gauge,
  reach: 'Lucy Stone Park in Warren to Route 67 Whitewater take-out',
  putIn,
  takeOut,
  latitude: putIn.latitude,
  longitude: putIn.longitude,
  summary: 'The documented 5.3-mile Quaboag Class II–III run from Lucy Stone Park to the Route 67 circular pull-off, including the mandatory portage around the unrunnable factory dam.',
  statusText: 'Check direct USGS 01176000 stage and discharge, recent rain, wood, water quality, dam notices and the Route 67 landing before launch. The route has exposed strainers, Mouse Hole, Broken Dam and Devil’s Gorge.',
  profile: {
    thresholdModel: 'minimum-only',
    tooLow: 260,
    idealMin: 260,
    idealMax: 1250,
    tooHigh: 1840,
    thresholdSource: flowGuide,
    thresholdSourceStrength: 'community',
    rainfallSensitivity: 'high',
    windSensitivity: 0.05,
    seasonMonths: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    seasonNotes: 'The Quaboag is rain and spring-flow dependent. Check the live West Brimfield gauge and trend immediately before committing; flood thresholds are not runnable recommendations.',
    difficulty: 'hard',
    difficultyNotes: 'American Whitewater rates Lucy Stone to Route 67 Class II–III. Mouse Hole, Broken Dam, Devil’s Gorge, strainers and the mandatory dam portage require experienced moving-water judgment.',
    confidenceNotes: 'American Whitewater and Massachusetts Paddler document the 5.2–5.3-mile reach, endpoints, named hazards and mandatory dam portage. The Old Paddlers Almanac gives a 3.8-foot/260 cfs minimum runnable cue; USACE publishes 1,250 cfs warning and 1,840 cfs flood flows. The numeric band is a conservative screening aid, never a safety guarantee.',
  },
  safetyProfile: {
    riskLevel: 'caution',
    reviewStatus: 'reviewed',
    hazards,
    safetyNotes: [
      'Wear a properly fitted PFD and whitewater helmet with cold-water protection; carry throw rope, communication and offline navigation.',
      'Scout Mouse Hole, the full-river strainers and Devil’s Gorge. At the Wrights Complex lower dam, take out on river right, carry about 0.1 mile toward the railroad corridor, and relaunch below the dam. Never enter active railroad tracks or approach the dam or mill structures.',
      'Use only the Lucy Stone Park beach and Route 67 circular pull-off access. Confirm parking, water quality, landing conditions and no-cell-service margin before staging.',
      'Do not use private banks for bailout or camping; rising rain flows can change the reach quickly and can hide wood hazards.',
    ],
  },
  sourceLinks: [awGuide, paddlerGuide, townGuide, campingGuide, flowGuide, floodGuide, { label: 'USGS West Brimfield gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
  accessPoints: [
    { ...putIn, id: 'quaboag-river-lucy-stone-route-67-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'The Town of Warren identifies Lucy Stone Park as a riverside paddling beach. Massachusetts Paddler supplies the river-edge coordinate; confirm parking, beach condition and water quality.' },
    { name: 'Wrights Complex lower dam upstream portage take-out (water-entry edge)', latitude: 42.212, longitude: -72.2325, id: 'quaboag-river-lucy-stone-route-67-portage-take-out', mileFromStart: 2.55, segmentKind: 'transition', note: 'Massachusetts Paddler places the upstream water exit at river mile 14.25, 42°12.72′ N, 72°13.95′ W. This is the river-right take-out before the mandatory carry; scout the landing in daylight and stay out of mill property.' },
    { name: 'Wrights Complex lower dam downstream relaunch (water-entry edge)', latitude: 42.211833, longitude: -72.233667, id: 'quaboag-river-lucy-stone-route-67-portage-relaunch', mileFromStart: 2.65, segmentKind: 'transition', note: 'Massachusetts Paddler places the downstream water entry at river mile 14.15, 42°12.71′ N, 72°14.02′ W. Carry about 0.1 mile on the documented river-right route toward the railroad corridor; do not walk on active tracks or enter mill/private property.' },
    { ...takeOut, id: 'quaboag-river-lucy-stone-route-67-take-out', mileFromStart: 5.3, segmentKind: 'transition', note: 'Massachusetts Paddler and American Whitewater identify the Route 67 circular pull-off. The reach has no cell service; confirm the eddy, landing and parking before launch.' },
  ],
  logistics: {
    distanceLabel: 'About 5.3 river miles plus one mandatory dam portage',
    estimatedPaddleTime: 'Allow 4–7 hours with scouting, portage and rescue margin',
    shuttle: 'Stage the downstream vehicle at the Route 67 circular pull-off, then drive to Lucy Stone Park. Confirm the road and parking before unloading.',
    permits: 'Confirm Warren and Route 67 parking rules, current landowner notices and any posted water-quality advisories before launch.',
    camping: 'Quinebaug Cove Campground in Brimfield offers reservable tent and camper sites as a nearby private basecamp; check current availability and policies directly. It is separate from the river route. Never camp at the park beach, dam portage, Route 67 pull-off or private riverbanks.',
    campingClassification: 'nearby_basecamp',
    summary: 'A short, rain-dependent Class II–III Quaboag run with a documented factory-dam portage and a no-cell-service Route 67 take-out.',
    accessCaveats: ['Lucy Stone is a paddling beach and the coordinate marks the water-entry edge, not a promise of unrestricted parking.', 'The Wrights Complex lower dam carry is mandatory: exit on river right at mile 14.25, carry roughly 0.1 mile, and relaunch below at mile 14.15. Stay off active railroad tracks and out of mill/private property.', 'The Route 67 pull-off is the published endpoint; confirm the eddy and landing in daylight.'],
    watchFor: ['USGS 01176000 stage/discharge and rapid rain rises', 'Mouse Hole, full-river strainers, Broken Dam and Devil’s Gorge', 'Mandatory factory-dam portage, cold water and no-cell-service take-out'],
  },
  evidenceNotes: [
    { label: 'Reach and difficulty', value: 'Lucy Stone Park to Route 67; 5.2–5.3 miles; Class II–III', note: 'American Whitewater and Massachusetts Paddler document the named reach, endpoint access, rapids and mandatory dam portage.', sourceUrl: awGuide.url },
    { label: 'Runnable level cue', value: 'Minimum about 3.8 ft / 260 cfs', note: 'Old Paddlers Almanac gives the 3.8-foot/260 cfs minimum cue; verify current stage, discharge and local hazards rather than treating it as an all-clear.', sourceUrl: flowGuide.url },
    { label: 'Flood reference', value: 'USACE warning 1,250 cfs / 6.0 ft; flood 1,840 cfs / 7.0 ft', note: 'USACE publishes warning and flood thresholds for West Brimfield. These are hazard references, not recommended boating levels.', sourceUrl: floodGuide.url },
    { label: 'Direct telemetry', value: 'USGS 01176000 Quaboag River at West Brimfield', note: 'Direct stage and discharge telemetry for the documented route corridor.', sourceUrl: gauge.detailUrl },
    { label: 'Public access and dam carry', value: 'Lucy Stone Park beach; Wrights Complex lower dam river-right take-out/relaunch; Route 67 circular pull-off', note: 'Town of Warren confirms the paddling beach. Massachusetts Paddler lists the separate upstream and downstream dam edges at river miles 14.25 and 14.15 and describes the river-right portage; confirm on site and stay off active railroad tracks.', sourceUrl: paddlerGuide.url },
    { label: 'Nearby camping', value: 'Quinebaug Cove Campground, Brimfield', note: 'Private campground lists reservable tent and camper sites; it is a separate nearby basecamp and requires its own reservation.', sourceUrl: campingGuide.url },
  ],
};

const westWarrenRoute: River = {
  ...lucyStoneRoute,
  id: 'quaboag-river-west-warren-route-67',
  slug: 'quaboag-river-west-warren-route-67',
  region: 'Worcester County / West Warren–Brimfield',
  reach: 'West Warren below the Wrights Complex lower dam to Route 67 Whitewater take-out',
  putIn: { name: 'West Warren South Street seal launch below the Wrights Complex lower dam (water-entry edge)', latitude: 42.211833, longitude: -72.233667 },
  latitude: 42.211833,
  longitude: -72.233667,
  summary: 'A 2.6-mile Quaboag Class II–III run from the West Warren seal launch below the Wrights Complex dam to the Route 67 pull-off, with no dam carry on this reach.',
  statusText: 'Check direct USGS 01176000 stage and discharge, recent rain, wood, water quality and the Route 67 landing before launch. This short reach still includes Broken Dam, Angel’s Field and Devil’s Gorge.',
  profile: {
    ...lucyStoneRoute.profile!,
    difficultyNotes: 'American Whitewater lists the West Warren below-dam alternate put-in 2.73 miles into the Lucy Stone reach. From the below-dam seal launch, scout Broken Dam, Angel’s Field, Devil’s Gorge and all strainers; this remains experienced Class II–III moving water.',
    confidenceNotes: 'American Whitewater identifies the West Warren below-dam alternate put-in and the Route 67 endpoint. Massachusetts Paddler places the same downstream dam water-entry at river mile 14.15; the route uses direct USGS 01176000 and the published 3.8-foot/260 cfs minimum cue. The numeric band is a conservative screen, never a safety guarantee.',
  },
  safetyProfile: {
    ...lucyStoneRoute.safetyProfile!,
    safetyNotes: [
      'Wear a properly fitted PFD and whitewater helmet with cold-water protection; carry throw rope, communication and offline navigation.',
      'This route starts below the Wrights Complex lower dam and does not include its portage. Scout Broken Dam, Angel’s Field, Devil’s Gorge and every strainer; portage any feature beyond the group’s skill.',
      'The South Street launch is a steep seal launch beside a small building. Use the separately identified South Street/Main Street parking area; do not park in the marked tow-away lot, and inspect the landing before unloading.',
      'Use only the Route 67 circular pull-off at the finish. Confirm water quality, landing conditions and the no-cell-service margin before staging; do not camp on private banks.',
    ],
  },
  accessPoints: [
    { name: 'West Warren South Street seal launch below the Wrights Complex lower dam (water-entry edge)', latitude: 42.211833, longitude: -72.233667, id: 'quaboag-river-west-warren-route-67-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'American Whitewater identifies the alternate seal launch below the mill dam. Massachusetts Paddler documents the downstream dam water-entry near river mile 14.15; park only at the separately identified South Street/Main Street intersection, not the tow-away lot by the launch.' },
    { ...takeOut, id: 'quaboag-river-west-warren-route-67-take-out', mileFromStart: 2.65, segmentKind: 'transition', note: 'Massachusetts Paddler and American Whitewater identify the Route 67 circular pull-off. Confirm the eddy, landing and parking in daylight; this corridor has no cell service.' },
  ],
  logistics: {
    ...lucyStoneRoute.logistics!,
    distanceLabel: 'About 2.6 river miles',
    estimatedPaddleTime: 'Allow 2–4 hours with scouting and rescue margin',
    shuttle: 'Stage the downstream vehicle at the Route 67 circular pull-off. Park at the South Street/Main Street intersection before walking to the West Warren seal launch; do not use the tow-away lot.',
    summary: 'A short, rain-dependent Class II–III Quaboag run from the alternate launch below the factory dam to Route 67.',
    camping: 'Quinebaug Cove Campground in Brimfield offers reservable tent and camper sites as a nearby private basecamp; check current availability and policies directly. Never camp at the seal launch, Route 67 pull-off or private riverbanks.',
    accessCaveats: ['The West Warren launch is a steep seal launch below the mill dam; scout the landing before unloading.', 'American Whitewater directs paddlers to park at South Street and Main Street rather than the tow-away lot beside the put-in.', 'The Route 67 pull-off is the published endpoint; confirm the eddy and landing in daylight.'],
    watchFor: ['USGS 01176000 stage/discharge and rapid rain rises', 'Broken Dam, Angel’s Field, Devil’s Gorge and full-river strainers', 'Cold water, steep seal launch and no-cell-service take-out'],
  },
  evidenceNotes: [
    { label: 'Reach and alternate access', value: 'West Warren South Street seal launch to Route 67; about 2.6 miles; Class II–III', note: 'American Whitewater lists the below-dam alternate put-in and Route 67 endpoint; Massachusetts Paddler identifies the corresponding downstream water-entry edge.', sourceUrl: awGuide.url },
    { label: 'Runnable level cue', value: 'Minimum about 3.8 ft / 260 cfs', note: 'Old Paddlers Almanac gives the Quaboag minimum cue; verify current stage, discharge, trend, wood and local hazards rather than treating it as an all-clear.', sourceUrl: flowGuide.url },
    { label: 'Direct telemetry', value: 'USGS 01176000 Quaboag River at West Brimfield', note: 'Direct stage and discharge telemetry for the documented corridor.', sourceUrl: gauge.detailUrl },
    { label: 'Launch and parking', value: 'South Street seal launch; stage at South Street/Main Street intersection', note: 'American Whitewater describes the water-entry edge and specifically warns against using the marked tow-away lot.', sourceUrl: awGuide.url },
    { label: 'Nearby camping', value: 'Quinebaug Cove Campground, Brimfield', note: 'Private campground lists reservable tent and camper sites as a separate nearby basecamp.', sourceUrl: campingGuide.url },
  ],
};

export const massachusettsQuaboagRoutes: River[] = [lucyStoneRoute, westWarrenRoute];
