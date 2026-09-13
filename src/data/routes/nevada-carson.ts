import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const trailFinder = { label: 'Nevada Trail Finder Carson River Aquatic Trail', url: 'https://www.nvtrailfinder.com/trails/trail/carson-river-aquatic-trail', provider: 'local' as const };
const americanWhitewater = { label: 'American Whitewater Carson River Silver Saddle Ranch to Santa Maria Ranch', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/4145/main', provider: 'local' as const };
const wildlifeGuide = { label: 'Nevada Department of Wildlife Carson River access and navigation', url: 'https://www.ndow.org/waters/carson-river/', provider: 'local' as const };
const cityGuide = { label: 'Carson City Carson River Aquatic Trail plan', url: 'https://www.carsoncity.gov/home/showpublisheddocument/60711/636621418739370000', provider: 'local' as const };
const kmlGuide = { label: 'Nevada Trail Finder public access and hazard points KML', url: 'https://www.nvtrailfinder.com/docs/kml/TrailPoints75.kml', provider: 'local' as const };
const gauge = { id: 'usgs-10311000', provider: 'usgs' as const, siteId: '10311000', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Carson River near Carson City, NV', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-10311000/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'dam', 'private_banks'];

const eastSilver = { name: 'East Silver Saddle Ranch boat launch (water-entry edge)', latitude: 39.1292505097247, longitude: -119.705279696119 };
const carsonPark = { name: 'Carson River Park boat launch (water-entry edge)', latitude: 39.1419915486368, longitude: -119.705909226714 };
const morganMill = { name: 'Morgan Mill Preserve boat launch (water-entry edge)', latitude: 39.1823453486079, longitude: -119.705736033457 };
const santaMaria = { name: 'Santa Maria River Park boat launch (water-entry edge)', latitude: 39.2193323556583, longitude: -119.598252013661 };

const base = {
  name: 'Carson River', riverId: 'carson-river-nevada', state: 'Nevada', region: 'Carson City / Lyon County', routeType: 'recreational' as const, scoreEligibility: 'scored' as const, gaugeSource: gauge,
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: ['Wear a properly fitted PFD; cold water, changing releases and moving current remain serious risks.', 'Check direct USGS 10311000 discharge and trend, weather and the Nevada Trail Finder flow guidance before launching. Scout the channel at the current level.', 'Portage and stay well clear of Ophir Dam, Mexican Ditch Dam and any train-wreck, bridge or debris feature. American Whitewater rates the reach Class II with a short Class III rapid.', 'Use only named public park or ranch access points, respect private shoreline and BLM boundaries, and keep a shuttle and emergency plan for limited exits.'] },
  sourceLinks: [trailFinder, americanWhitewater, wildlifeGuide, cityGuide, kmlGuide, { label: 'USGS Carson River near Carson City gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
};

function makeRoute(spec: { id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; miles: number; summary: string; time: string; note: string; lower?: boolean; distanceLabel?: string; watch: string[] }): River {
  const profile = spec.lower
    ? { thresholdModel: 'two-sided' as const, tooLow: 1000, idealMin: 1000, idealMax: 1500, tooHigh: 3000, thresholdSource: trailFinder, thresholdSourceStrength: 'official' as const, rainfallSensitivity: 'medium' as const, windSensitivity: 0.2, seasonMonths: [4,5,6,7,8,9,10], seasonNotes: 'The lower Carson reach needs substantially more water than the upper Class I–II section. Nevada Trail Finder calls for at least 1000 cfs from Morgan Mill toward Santa Maria; releases, storms and cold water can change conditions quickly.', difficulty: 'moderate' as const, difficultyNotes: 'American Whitewater rates the full corridor Class II with a short Class III rapid and a dam hazard. Scout Train Wreck, White Cliff, Rock Garden, Ophir Dam and every bridge or strainer.', confidenceNotes: 'Nevada Trail Finder provides the reach-specific 1000 cfs minimum and access sequence; American Whitewater documents the 14.5-mile Class II(III) corridor and direct Carson gauge. Use 1000 cfs as a conservative planning floor, not a safety guarantee.' }
    : { thresholdModel: 'two-sided' as const, tooLow: 250, idealMin: 400, idealMax: 1000, tooHigh: 1800, thresholdSource: trailFinder, thresholdSourceStrength: 'official' as const, rainfallSensitivity: 'medium' as const, windSensitivity: 0.2, seasonMonths: [4,5,6,7,8,9,10], seasonNotes: 'The upper Carson River Park to Morgan Mill section is a short Class I–II reach. Nevada Trail Finder identifies about 400 cfs as the ideal flow; verify release trend, weather and cold water before launch.', difficulty: 'easy' as const, difficultyNotes: 'The upper aquatic-trail section is Class I–II at suitable flow but can become shallow, technical or obstructed. Scout the Mexican Ditch area and all bridge and debris features.', confidenceNotes: 'Nevada Trail Finder documents the 3.3-mile Carson River Park to Morgan Mill section and its ideal 400 cfs cue. NDOW and the Carson City plan support public access; USGS 10311000 provides direct telemetry.' };
  return {
    ...base,
    id: spec.id,
    slug: spec.id,
    reach: spec.reach,
    putIn: spec.putIn,
    takeOut: spec.takeOut,
    latitude: spec.putIn!.latitude!,
    longitude: spec.putIn!.longitude!,
    profile,
    summary: spec.summary,
    statusText: 'Use direct USGS 10311000 discharge and trend. Confirm access, weather, private-bank boundaries and visual conditions before launch; portage all dams and unscouted features.',
    accessPoints: [
      { ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note },
      { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm the public water-entry edge, carry, parking and current access status before staging.' },
    ],
    logistics: {
      distanceLabel: spec.distanceLabel ?? `About ${spec.miles} river miles`,
      estimatedPaddleTime: spec.time,
      shuttle: 'Stage the downstream vehicle at the named public park or preserve, then drive to the upstream launch. Build in time for scouting and any dam portage.',
      permits: 'Confirm current Carson City, Lyon County, BLM and park access rules before unloading; respect private shoreline and posted closures.',
      camping: 'No overnight river camping is included. Use established campgrounds or lodging near Carson City and Dayton; do not camp on private banks or at informal access points.',
      campingClassification: 'nearby_basecamp',
      summary: spec.summary,
      accessCaveats: ['Use only the named public water-entry edges and existing paths.', 'Morgan Mill, Carson River Park and Silver Saddle Ranch may require a hand-carry from parking; verify current conditions.', 'Portage Ophir Dam and Mexican Ditch Dam and never approach marked hazard structures.', 'Public water does not grant permission to land on private shoreline; keep intermediate exits to named public parks or legal crossings.'],
      watchFor: spec.watch,
    },
    evidenceNotes: [
      { label: 'Named access and distance', value: `${spec.reach}; ${spec.miles} miles`, note: 'Nevada Trail Finder and the Carson River access KML identify the public water-entry sequence; American Whitewater corroborates the full corridor.', sourceUrl: trailFinder.url },
      { label: 'Scoring band', value: spec.lower ? '1000 cfs minimum; 1000–1500 cfs planning band for the lower reach' : '400 cfs ideal cue; 250 cfs conservative low-water review floor for the upper reach', note: 'Flow values are reach-specific planning cues. Verify direct gauge telemetry, trend, craft suitability and local conditions.', sourceUrl: trailFinder.url },
      { label: 'Direct telemetry', value: 'USGS 10311000 Carson River near Carson City', note: 'Direct Carson River discharge telemetry for the selected corridor; recheck live value and trend before departure.', sourceUrl: gauge.detailUrl },
      { label: 'Safety and camping', value: 'PFD, dam portage, public water entry and nearby basecamp', note: 'Nevada Trail Finder and American Whitewater document the dam, rapid and access hazards. No riverbank camping is assumed.', sourceUrl: americanWhitewater.url },
    ],
  };
}

export const nevadaCarsonRoutes: River[] = [
  makeRoute({ id: 'carson-river-east-silver-saddle-carson-river-park', reach: 'East Silver Saddle Ranch to Carson River Park', putIn: eastSilver, takeOut: carsonPark, miles: 1.5, summary: 'A short upper Carson River Aquatic Trail warm-up from the East Silver Saddle Ranch hand-carry launch to Carson River Park.', time: 'Allow 1–2 hours with carry and channel scouting', note: 'Nevada Trail Finder lists both public access points in the upper Eagle Valley section. Confirm the hand-carry launch, shallow channel and Mexican Ditch hazard before departure.', watch: ['400 cfs target and shallow riffles', 'Mexican Ditch Dam and bridge debris', 'Cold water and private shoreline'] }),
  makeRoute({ id: 'carson-river-east-silver-saddle-morgan-mill', reach: 'East Silver Saddle Ranch to Morgan Mill Preserve', putIn: eastSilver, takeOut: morganMill, miles: 4.8, summary: 'A short upper Carson River Aquatic Trail reach combining the East Silver Saddle Ranch and Carson River Park access sequence to Morgan Mill.', time: 'Allow 3–5 hours with access carries and feature scouting', note: 'Nevada Trail Finder identifies East Silver Saddle Ranch, Carson River Park and Morgan Mill as public access points. Confirm the hand-carry launch and scout the Mexican Ditch and bridge corridor.', watch: ['400 cfs target and shallow riffles', 'Mexican Ditch Dam and bridge debris', 'Cold water, strainers and private shoreline'] }),
  makeRoute({ id: 'carson-river-carson-river-park-morgan-mill', reach: 'Carson River Park to Morgan Mill Preserve', putIn: carsonPark, takeOut: morganMill, miles: 3.3, summary: 'The documented upper Carson River Aquatic Trail section from Carson River Park to Morgan Mill, an approachable Class I–II reach at suitable flow.', time: 'Allow 2–4 hours with scouting and shuttle margin', note: 'Nevada Trail Finder calls this approximately 3.3 miles and identifies about 400 cfs as the ideal flow. Use the park water-entry edge and confirm the portage and bridge sequence.', watch: ['400 cfs target and shallow riffles', 'Mexican Ditch Dam and bridge debris', 'Cold water and changing releases'] }),
  makeRoute({ id: 'carson-river-carson-river-park-santa-maria', reach: 'Carson River Park to Santa Maria River Park', putIn: carsonPark, takeOut: santaMaria, miles: 14.0, lower: true, distanceLabel: 'About 14 river miles', summary: 'A long Carson River Aquatic Trail itinerary from Carson River Park through Morgan Mill to Santa Maria River Park.', time: 'Plan a full daylight run with intermediate bailout and dam portage margin', note: 'Morgan Mill is the documented intermediate public bailout. The lower section requires the 1000 cfs planning floor and includes the American Whitewater dam and Class III feature sequence.', watch: ['1000 cfs minimum planning cue below Morgan Mill', 'Train Wreck, White Cliff, Rock Garden and Ophir Dam', 'Long exposure, private shoreline and limited exits'] }),
  makeRoute({ id: 'carson-river-morgan-mill-santa-maria', reach: 'Morgan Mill Preserve to Santa Maria River Park', putIn: morganMill, takeOut: santaMaria, miles: 10.7, lower: true, summary: 'The lower Carson River Aquatic Trail from Morgan Mill through the documented Class II–III corridor to Santa Maria River Park.', time: 'Allow 6–9 hours with rapid scouting, dam portage and shuttle margin', note: 'Nevada Trail Finder calls for at least 1000 cfs below Morgan Mill and notes a dam and increasing difficulty. American Whitewater documents Train Wreck, Rock Garden and the dam hazard; scout and portage.', watch: ['1000 cfs minimum planning cue', 'Train Wreck, White Cliff and Rock Garden features', 'Ophir Dam, private shoreline and bridge debris'] }),
  makeRoute({ id: 'carson-river-east-silver-saddle-santa-maria', reach: 'East Silver Saddle Ranch to Santa Maria River Park', putIn: eastSilver, takeOut: santaMaria, miles: 14.5, lower: true, distanceLabel: 'About 14.5 river miles', summary: 'The full Carson River Aquatic Trail corridor from East Silver Saddle Ranch through Carson River Park and Morgan Mill to Santa Maria River Park.', time: 'Plan a full daylight run with a staged shuttle, intermediate bailouts and dam portage margin', note: 'Use Carson River Park and Morgan Mill as documented intermediate public bailouts. The lower section requires the 1000 cfs planning floor and includes a dam and short Class III feature; verify every access and hazard before launch.', watch: ['1000 cfs minimum for the lower reach', 'Mexican Ditch Dam, Train Wreck and Ophir Dam', 'Long exposure, private shoreline and limited exits'] }),
];
