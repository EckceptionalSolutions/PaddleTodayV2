import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const blmSegments = { label: 'BLM Rio Grande and Rio Chama river segment descriptions', url: 'https://www.blm.gov/sites/blm.gov/files/NM_Rio_Grande_and_Rio_Chama_River_Segments.pdf', provider: 'local' as const };
const blmRiver = { label: 'BLM Rio Grande Wild and Scenic River', url: 'https://www.blm.gov/programs/national-conservation-lands/new-mexico/rio-grande-wsr', provider: 'local' as const };
const paddlerGuide = { label: 'Southwest Paddler Rio Grande Bosque reach description', url: 'https://southwestpaddler.com/docs/riograndenm9.html', provider: 'local' as const };
const gauge = { id: 'usgs-08279500', provider: 'usgs' as const, siteId: '08279500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Rio Grande at Embudo, NM', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-08279500/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'private_banks', 'dam'];

const countyLine = { name: 'County Line BLM boat launch (water-entry edge)', latitude: 36.2301, longitude: -105.8561 };
const embudoGauge = { name: 'Embudo gauging station public access below bridge (water-entry edge)', latitude: 36.2055555555556, longitude: -105.963972222222 };

const common = {
  name: 'Rio Grande', riverId: 'rio-grande-new-mexico', state: 'New Mexico', region: 'Rio Grande Bosque / Embudo', routeType: 'recreational' as const, scoreEligibility: 'scored' as const, gaugeSource: gauge,
  profile: { thresholdModel: 'minimum-only' as const, tooLow: 300, idealMin: 500, thresholdSource: paddlerGuide, thresholdSourceStrength: 'community' as const, rainfallSensitivity: 'medium' as const, windSensitivity: 0.35, seasonMonths: [3,4,5,6,7,8,9,10], seasonNotes: 'Snowmelt and summer flows are the most reliable windows. Check the Embudo gauge, trend, weather, wind and current BLM notices before launching.', difficulty: 'easy' as const, difficultyNotes: 'BLM rates the Bosque as Class II, but shallow channels, strainers, cold water, private banks, quiet-zone rules and the Velarde diversion downstream still require conservative judgment.', confidenceNotes: 'BLM identifies the Bosque as a 6.5-mile Class II reach to Embudo Station and names County Line, BLM Beach and Embudo Station as designated sites. Southwest Paddler identifies the public access below the Embudo gauging bridge and a 300 cfs minimum planning cue. The route uses only the County Line and gauging-station public water-entry edges.' },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: ['Wear a fitted PFD and carry a whistle, spare paddle, throw device, communication and offline navigation.', 'Check direct USGS 08279500 discharge and trend, wind, storms and cold-water conditions. Do not treat 300 cfs as a safety guarantee.', 'Scout shallow channels, strainers, bridge turbulence and changing sandbars. The Velarde diversion downstream is a hard hazard; do not continue beyond the reviewed take-out.', 'The Bosque is primarily private land. Stay in the channel except for emergencies, respect the quiet zone, and use only designated public access points.'] },
  sourceLinks: [blmSegments, blmRiver, paddlerGuide, { label: 'USGS Embudo gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
};

function makeRoute(spec: { id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; miles: number; summary: string; time: string; note: string; watch: string[] }): River {
  return {
    ...common,
    id: spec.id,
    slug: spec.id,
    reach: spec.reach,
    putIn: spec.putIn,
    takeOut: spec.takeOut,
    latitude: spec.putIn!.latitude!,
    longitude: spec.putIn!.longitude!,
    summary: spec.summary,
    statusText: 'Check USGS 08279500 at Embudo, flow trend, weather, wind, BLM notices and current access rules before launch; stop at the reviewed public take-out before the Velarde diversion.',
    accessPoints: [
      { ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note },
      { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Use the public water-entry edge below the Embudo bridge only after confirming parking, carry, river level and current access conditions.' },
    ],
    logistics: {
      distanceLabel: `About ${spec.miles} river miles`,
      estimatedPaddleTime: spec.time,
      shuttle: 'Stage the downstream vehicle at the public Embudo gauging-station access, then drive to the upstream BLM launch.',
      permits: 'Private boaters do not need a Rio Grande boating permit, but BLM day-use, parking and access rules apply. Confirm current site status before departure.',
      camping: 'No overnight camping is included on this reach. Use established campgrounds or lodging near the Rio Grande; do not camp within the Bosque river corridor or on private banks.',
      campingClassification: 'nearby_basecamp',
      summary: spec.summary,
      accessCaveats: ['Use only the designated County Line or Quartzite launch and the documented public gauging-station access below Embudo bridge.', 'The Bosque is primarily private land and has a quiet zone; no landing or stopping on private property.', 'Do not continue downstream toward the Velarde diversion without a separate hazard and access review.'],
      watchFor: spec.watch,
    },
    evidenceNotes: [
      { label: 'BLM segment', value: spec.reach, note: 'BLM rates the Bosque Class II and names the designated access chain; bridges become hazards at high water above 6,000 cfs.', sourceUrl: blmSegments.url },
      { label: 'Scoring floor', value: '300 cfs minimum planning cue', note: 'Southwest Paddler documents a 300 cfs minimum for the Bosque reach. Verify live telemetry, trend and local conditions; this is not a safety guarantee.', sourceUrl: paddlerGuide.url },
      { label: 'Direct telemetry', value: 'USGS 08279500 Rio Grande at Embudo', note: 'The gauge is at the reviewed downstream public access below the bridge.', sourceUrl: gauge.detailUrl },
      { label: 'Access and camping posture', value: 'Designated BLM launch plus public gauging-station access; nearby basecamp only', note: 'The route stops before the Velarde diversion and avoids private or owner-permission-only landings.', sourceUrl: blmRiver.url },
    ],
  };
}

export const newMexicoBosqueRioGrandeRoutes: River[] = [
  makeRoute({ id: 'rio-grande-county-line-embudo-gauge', reach: 'County Line BLM Site to Embudo gauging-station public access', putIn: countyLine, takeOut: embudoGauge, miles: 6.5, summary: 'The documented Class II Bosque day reach from County Line to the public access below the Embudo gauging bridge.', time: 'Allow 3–5 hours with shuttle, scouting and quiet-zone margin', note: 'BLM names County Line as a designated Bosque launch/take-out, and Southwest Paddler identifies public access below the Embudo gauging bridge at the downstream end. Confirm the carry and parking before unloading.', watch: ['Shallow channels and strainers', 'Private-bank boundaries and quiet zone', 'Bridge hazards above 6,000 cfs and Velarde diversion downstream'] }),
];
