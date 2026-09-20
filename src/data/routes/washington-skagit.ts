import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const flowStudy = { label: 'Seattle City Light Skagit recreation flow study', url: 'https://www.seattle.gov/light/skagit/relicensing/cs/groups/secure/%40scl.skagit.team/documents/document/cm9k/nzq5/~edisp/prod749541.pdf', provider: 'local' as const };
const npsBoating = { label: 'North Cascades National Park boating and fishing', url: 'https://www.nps.gov/noca/planyourvisit/boating-and-fishing.htm?fullweb=1', provider: 'nps' as const };
const npsCompendium = { label: 'North Cascades National Park superintendent compendium', url: 'https://home.nps.gov/noca/learn/management/superintendent-compendium.htm', provider: 'nps' as const };
const awGuide = { label: 'American Whitewater Skagit River recreation flow survey', url: 'https://hydroreform.org/2022/08/skagit-river-recreation-flow-survey-wa-2/', provider: 'american_whitewater' as const };
const mountaineersGuide = { label: 'Mountaineers Copper Creek to Rockport route', url: 'https://www.mountaineers.org/activities/routes-places/skagit-river-copper-creek-to-rockport', provider: 'local' as const };
const upperGauge = { id: 'usgs-12178000', provider: 'usgs' as const, siteId: '12178000', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Skagit River near Newhalem, WA', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-12178000/' };
const lowerGauge = { id: 'usgs-12181000', provider: 'usgs' as const, siteId: '12181000', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Skagit River near Mount Vernon / Marblemount, WA', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-12181000/' };

const upperHazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'dam', 'private_banks'];
const lowerHazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'];

const goodell = { name: 'Goodell Creek Boat Launch, North Cascades National Park', latitude: 48.6718, longitude: -121.2690 };
const copper = { name: 'Copper Creek Boat Access, NPS Road 213', latitude: 48.591100, longitude: -121.373204 };
const marblemount = { name: 'Marblemount Boat Launch', latitude: 48.5265842, longitude: -121.4286361 };
const howardMiller = { name: 'Howard Miller Steelhead Park river takeout', latitude: 48.48453, longitude: -121.59480 };

const common = {
  name: 'Skagit River', riverId: 'skagit-river-washington', state: 'Washington', region: 'North Cascades / Skagit Valley', routeType: 'recreational' as const, scoreEligibility: 'scored' as const,
  sourceLinks: [flowStudy, npsBoating, npsCompendium, awGuide, mountaineersGuide, { label: 'USGS Newhalem gauge', url: upperGauge.detailUrl, provider: 'usgs' as const }, { label: 'USGS Marblemount gauge', url: lowerGauge.detailUrl, provider: 'usgs' as const }],
};

function makeRoute(spec: {
  id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; miles: number; summary: string; time: string; note: string;
  gauge: typeof upperGauge | typeof lowerGauge; tooLow: number; idealMin: number; idealMax: number; tooHigh: number; difficulty: 'easy' | 'moderate'; difficultyNotes: string; hazards: RouteHazard[]; thresholdText: string; camping: string; campingClassification: 'none' | 'nearby_basecamp';
}): River {
  return {
    ...common,
    id: spec.id,
    slug: spec.id,
    gaugeSource: spec.gauge,
    reach: spec.reach,
    putIn: spec.putIn,
    takeOut: spec.takeOut,
    latitude: spec.putIn!.latitude!,
    longitude: spec.putIn!.longitude!,
    summary: spec.summary,
    statusText: `Check USGS ${spec.gauge.siteId}, trend, weather, wood and current NPS or park notices before launch; cold water and fast current remain serious hazards.`,
    profile: {
      thresholdModel: 'two-sided' as const,
      tooLow: spec.tooLow,
      idealMin: spec.idealMin,
      idealMax: spec.idealMax,
      tooHigh: spec.tooHigh,
      thresholdSource: flowStudy,
      thresholdSourceStrength: 'official' as const,
      rainfallSensitivity: 'medium' as const,
      windSensitivity: 0.3,
      seasonMonths: [5, 6, 7, 8, 9],
      seasonNotes: 'Late spring through early fall is the practical season. Dam-regulated cold water, mountain weather, changing wood and limited bailout options require a live flow and conditions check.',
      difficulty: spec.difficulty,
      difficultyNotes: spec.difficultyNotes,
      confidenceNotes: `The Seattle City Light recreation-flow study names this segment and its endpoints. ${spec.thresholdText} Treat the band as a planning cue, verify the live gauge and inspect current hazards before committing.`
    },
    safetyProfile: {
      riskLevel: 'caution' as const,
      reviewStatus: 'reviewed' as const,
      hazards: spec.hazards,
      safetyNotes: [
        'Wear a properly fitted PFD and carry cold-water layers, communication, offline navigation and a shuttle plan.',
        'Scout strainers, sweepers and changing channels; the Skagit remains cold and powerful even on lower-class reaches.',
        'Use only the named public access areas, confirm NPS or park rules and never trespass on private banks.',
        'Check current NPS notices, weather, wildfire smoke, road conditions and the live gauge trend before launching.'
      ]
    },
    accessPoints: [
      { ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note },
      { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm the current water-entry edge, parking, shuttle staging and any seasonal closure before unloading.' }
    ],
    logistics: {
      distanceLabel: `About ${spec.miles} river miles`,
      estimatedPaddleTime: spec.time,
      shuttle: 'Stage the downstream vehicle at the named public takeout, then drive to the upstream launch.',
      permits: 'Goodell launches require the current NPS permit or self-registration process; confirm all NPS, park and parking rules before launch.',
      camping: spec.camping,
      campingClassification: spec.campingClassification,
      summary: spec.summary,
      accessCaveats: ['Use the documented public launch and takeout only.', 'Copper Creek access has limited parking; keep the access road clear and follow NPS signs.', 'Recheck gauge, trend, weather, wood, road conditions and closures on launch day.'],
      watchFor: [`USGS ${spec.gauge.siteId} trend and dam-regulated cold water`, 'Strainers, fast current and changing channels', 'Limited takeouts, private banks and seasonal access restrictions']
    },
    evidenceNotes: [
      { label: 'Named reach and endpoints', value: spec.reach, note: 'Seattle City Light, NPS and Mountaineers sources document the public access sequence and reach length.', sourceUrl: flowStudy.url },
      { label: 'Scoring band', value: spec.thresholdText, note: 'Flow ranges are route-planning thresholds from the official recreation-flow study and corroborating local whitewater guidance; verify live conditions before travel.', sourceUrl: flowStudy.url },
      { label: 'Direct gauge', value: `USGS ${spec.gauge.siteId}`, note: `Direct Skagit River discharge telemetry for the ${spec.gauge.siteName} corridor.`, sourceUrl: spec.gauge.detailUrl }
    ]
  };
}

export const washingtonSkagitRoutes: River[] = [
  makeRoute({
    id: 'skagit-river-goodell-copper', reach: 'Goodell Creek Boat Launch to Copper Creek Boat Access', putIn: goodell, takeOut: copper, miles: 8.7,
    summary: 'A North Cascades Skagit reach with the S-Bends Class II–III feature, limited bailout options and a required cold-water and wood check.', time: 'Allow 4–7 hours with scouting, permit steps and shuttle time',
    note: 'NPS identifies Goodell as a public boat launch near MP 119 with parking, restrooms and a cartop carry; self-register or obtain the current NPS permit before launching.', gauge: upperGauge, tooLow: 1500, idealMin: 2500, idealMax: 5000, tooHigh: 6000,
    difficulty: 'moderate', difficultyNotes: 'NPS and American Whitewater describe a Class II–III reach with the S-Bends feature and few takeouts. Paddle within your group’s ability and scout at current flow.', hazards: upperHazards,
    thresholdText: '1,500 cfs minimum cue; 2,500–5,000 cfs preferred planning band; review above 6,000 cfs', camping: 'No overnight camping is included between Goodell and Copper. Use established campgrounds outside the route only and follow NPS rules.', campingClassification: 'none'
  }),
  makeRoute({
    id: 'skagit-river-copper-marblemount', reach: 'Copper Creek Boat Access to Marblemount Boat Launch', putIn: copper, takeOut: marblemount, miles: 5.9,
    summary: 'A shorter Skagit Valley reach from the limited-parking Copper Creek access to the Marblemount public launch, with Class I–II current and cold-water exposure.', time: 'Allow 3–5 hours with scouting and shuttle time',
    note: 'NPS documents Copper Creek as a public boat access near MP 112 with a gravel ramp and restroom; parking is limited and the access road must remain clear.', gauge: lowerGauge, tooLow: 1500, idealMin: 3000, idealMax: 8000, tooHigh: 12000,
    difficulty: 'easy', difficultyNotes: 'Mountaineers describes this lower corridor as Class I–II at runnable flows, but strainers, cold water and changing channels still require active scouting.', hazards: lowerHazards,
    thresholdText: '1,500 cfs minimum cue; 3,000–8,000 cfs preferred planning band; review above 12,000 cfs', camping: 'No overnight camping is included on this short reach; use established public campgrounds and verify current reservations and rules.', campingClassification: 'none'
  }),
  makeRoute({
    id: 'skagit-river-marblemount-howard-miller', reach: 'Marblemount Boat Launch to Howard Miller Steelhead Park', putIn: marblemount, takeOut: howardMiller, miles: 10.6,
    summary: 'The popular Marblemount-to-Howard Miller Skagit float through the broad Skagit Valley, ending at a public park with camping nearby.', time: 'Allow 4–7 hours with current, wildlife, scouting and shuttle time',
    note: 'Mountaineers identifies Marblemount as a public launch with parking and Howard Miller Steelhead Park as the downstream takeout; confirm the current water-entry edge before launch.', gauge: lowerGauge, tooLow: 1500, idealMin: 3000, idealMax: 8000, tooHigh: 10000,
    difficulty: 'easy', difficultyNotes: 'The official flow study identifies this 10.6-mile segment as a popular open-canoe reach. Current wood, cold water, wind and private-bank boundaries remain active hazards.', hazards: lowerHazards,
    thresholdText: '1,500 cfs minimum cue; 3,000–8,000 cfs preferred planning band; review above 10,000 cfs', camping: 'Howard Miller Steelhead Park has established camping nearby; reserve through Skagit County and follow current park rules. Do not camp on river banks.', campingClassification: 'nearby_basecamp'
  }),
  makeRoute({
    id: 'skagit-river-goodell-marblemount', reach: 'Goodell Creek Boat Launch to Marblemount Boat Launch', putIn: goodell, takeOut: marblemount, miles: 14.6,
    summary: 'A longer North Cascades-to-Skagit Valley itinerary combining the documented Goodell–Copper and Copper–Marblemount reaches.', time: 'Allow 7–10 hours with scouting, permit steps and shuttle time',
    note: 'Goodell is an NPS public launch; Copper Creek is the intermediate documented access and bailout. Confirm both NPS access procedures and Marblemount parking before departure.', gauge: lowerGauge, tooLow: 1500, idealMin: 3000, idealMax: 8000, tooHigh: 10000,
    difficulty: 'moderate', difficultyNotes: 'The combined reach adds distance and limited bailout to the Class II–III upper section; use the lowest applicable live gauge and scout current wood and S-Bends conditions.', hazards: lowerHazards,
    thresholdText: '1,500 cfs minimum cue; 3,000–8,000 cfs preferred planning band; review above 10,000 cfs', camping: 'No overnight camping is included on this itinerary; use established campgrounds and verify current reservations and rules.', campingClassification: 'nearby_basecamp'
  }),
  makeRoute({
    id: 'skagit-river-copper-howard-miller', reach: 'Copper Creek Boat Access to Howard Miller Steelhead Park', putIn: copper, takeOut: howardMiller, miles: 16.5,
    summary: 'A longer Skagit Valley itinerary combining the documented Copper–Marblemount and Marblemount–Howard Miller public-access reaches.', time: 'Allow 7–10 hours with scouting and shuttle time',
    note: 'Copper Creek has limited parking and a gravel ramp; Marblemount is the intermediate public access and bailout. Keep the access road clear and verify Howard Miller park rules.', gauge: lowerGauge, tooLow: 1500, idealMin: 3000, idealMax: 8000, tooHigh: 10000,
    difficulty: 'moderate', difficultyNotes: 'Longer moving-water day with cold water, changing channels, strainers and limited intermediate exits; keep a daylight margin.', hazards: lowerHazards,
    thresholdText: '1,500 cfs minimum cue; 3,000–8,000 cfs preferred planning band; review above 10,000 cfs', camping: 'Howard Miller Steelhead Park has established camping nearby; reserve through Skagit County and follow current park rules. Do not camp on river banks.', campingClassification: 'nearby_basecamp'
  }),
  makeRoute({
    id: 'skagit-river-goodell-howard-miller', reach: 'Goodell Creek Boat Launch to Howard Miller Steelhead Park', putIn: goodell, takeOut: howardMiller, miles: 25.2,
    summary: 'A full Skagit itinerary linking the North Cascades Goodell launch through Copper Creek and Marblemount to Howard Miller Steelhead Park.', time: 'Plan a full daylight day with permit steps, intermediate bailout checks and shuttle margin',
    note: 'Use Copper Creek and Marblemount as documented intermediate public bailouts. Goodell requires current NPS permit or self-registration; confirm the Howard Miller landing and nearby camping before launch.', gauge: lowerGauge, tooLow: 1500, idealMin: 3000, idealMax: 8000, tooHigh: 10000,
    difficulty: 'moderate', difficultyNotes: 'This long combined reach includes the upper S-Bends Class II–III section and the broad lower valley. Keep the lowest applicable flow check, scout wood and preserve a daylight margin.', hazards: lowerHazards,
    thresholdText: '1,500 cfs minimum cue; 3,000–8,000 cfs preferred planning band; review above 10,000 cfs', camping: 'Howard Miller Steelhead Park has established camping nearby; reserve through Skagit County and follow current park rules. Do not camp on river banks.', campingClassification: 'nearby_basecamp'
  })
];
