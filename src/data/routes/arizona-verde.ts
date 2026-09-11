import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const paddleGuide = { label: 'Friends of the Verde River access points', url: 'https://verderiver.org/wp-content/uploads/2022/03/river-access-points.pdf', provider: 'local' as const };
const forestGuide = { label: 'USFS Verde River Paddle Trail guide', url: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprd3818300.pdf', provider: 'local' as const };
const flowGuide = { label: 'RiverScout Verde River conditions summary', url: 'https://riverscout.app/rivers/arizona/verde-river', provider: 'local' as const };
const lowerFlowGuide = { label: 'RiverBrain White Bridge to Beasley Flat flow guidance', url: 'https://www.riverbrain.com/runs/483', provider: 'local' as const };
const accessMap = { label: 'Friends of the Verde River access points map', url: 'https://verderiver.org/wp-content/uploads/2022/03/river-access-points.pdf', provider: 'local' as const };
const lowerForestGuide = { label: 'USFS Verde River Paddle Trail Highway 89A to Beasley Flat', url: 'https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprd3818300.pdf', provider: 'local' as const };
const gauge = { id: 'usgs-09504000', provider: 'usgs' as const, siteId: '09504000', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Verde River near Clarkdale, AZ', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-09504000/' };
const lowerGauge = { id: 'usgs-09506000', provider: 'usgs' as const, siteId: '09506000', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Verde River near Camp Verde, AZ', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-09506000' };

const common = {
  name: 'Verde River', riverId: 'verde-river-arizona', state: 'Arizona', region: 'Verde Valley / Yavapai County', routeType: 'recreational' as const, scoreEligibility: 'scored' as const,
  gaugeSource: gauge,
  profile: { thresholdModel: 'two-sided' as const, tooLow: 300, idealMin: 300, idealMax: 2000, tooHigh: 2000, thresholdSource: flowGuide, thresholdSourceStrength: 'community' as const, rainfallSensitivity: 'medium' as const, windSensitivity: 0.2, seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'Check current flow, thunderstorms, flash-flood forecasts and access notices. The Verde is dynamic and obstructions can change quickly.', difficulty: 'moderate' as const, difficultyNotes: 'Moving water with shallow riffles, diversion structures and occasional Class II features; comfortable boat control and scouting are required.', confidenceNotes: 'Friends of the Verde and the USFS guide publish named access points and waypoint coordinates. RiverScout supplies a same-gauge community optimal window of 300–2,000 cfs; this is a conservative planning band, not a guarantee of safe passage.' },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards: ['low_water','strainers','fast_rise','private_banks','dam'] as RouteHazard[], safetyNotes: ['Wear a PFD and carry offline navigation, throw rope and communication equipment.', 'Scout shallow riffles and diversion structures; portage where the guide marks a portage or caution location.', 'Private property borders much of the river. Leave the river only at named public access points.', 'Avoid flash floods and thunderstorms; recheck current conditions before launch.'] },
  sourceLinks: [forestGuide, paddleGuide, flowGuide, { label: 'USGS Verde River gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
};

function makeRoute(spec: { id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; miles: number; summary: string; time: string; note: string }): River {
  return { ...common, id: spec.id, slug: spec.id, reach: spec.reach, putIn: spec.putIn, takeOut: spec.takeOut, latitude: spec.putIn!.latitude!, longitude: spec.putIn!.longitude!, summary: spec.summary, statusText: 'Use the Clarkdale gauge and inspect the marked riffles, diversions and private-bank constraints before launch.', accessPoints: [{ ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note }, { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Use the named public access only; confirm parking and river access on arrival.' }], logistics: { distanceLabel: `About ${spec.miles} river miles`, estimatedPaddleTime: spec.time, shuttle: 'Stage the downstream vehicle first, then drive to the named upstream access.', permits: 'Confirm current park, trail or roadside access rules before unloading.', camping: 'No overnight camping is included; use separately permitted campgrounds and never camp on private banks.', campingClassification: 'none', summary: spec.summary, accessCaveats: ['Use only named public access points.'], watchFor: ['Low-water riffles', 'Diversion structures and marked portages', 'Strainers and flash-flood rises'] }, evidenceNotes: [{ label: 'Access and distance', value: `${spec.reach}; ${spec.miles} miles`, note: 'Friends of the Verde River and the USFS paddle guide publish the access coordinates and river-mile sequence.', sourceUrl: paddleGuide.url }, { label: 'Scoring band', value: '300–2,000 cfs community planning band', note: 'RiverScout reports this same Clarkdale gauge window; treat it as a conservative planning cue and verify current conditions locally.', sourceUrl: flowGuide.url }, { label: 'Gauge', value: 'USGS 09504000', note: 'Direct Verde River gauge near Clarkdale; recheck current telemetry and trend.', sourceUrl: gauge.detailUrl }] };
}

function makeLowerRoute(spec: { id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; miles: number; summary: string; time: string; note: string }): River {
  const thresholdSource = lowerFlowGuide;
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
    gaugeSource: lowerGauge,
    profile: {
      thresholdModel: 'two-sided',
      tooLow: 150,
      idealMin: 150,
      idealMax: 1000,
      tooHigh: 1000,
      thresholdSource,
      thresholdSourceStrength: 'community',
      rainfallSensitivity: 'high',
      windSensitivity: 0.2,
      seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      seasonNotes: 'The lower Verde is most reliable in the seasonal 150–1,000 cfs band; check current Camp Verde telemetry, thunderstorms and access notices before launch.',
      difficulty: 'moderate',
      difficultyNotes: 'The White Bridge–Beasley Flat paddle-trail corridor is generally Class II, with shallow riffles, diversion structures, strainers and changing desert access conditions.',
      confidenceNotes: 'Friends of the Verde and the USFS guide publish the named RAP sequence and coordinates. RiverBrain supplies a route-specific 150–1,000 cfs planning band tied to USGS 09506000 near Camp Verde; treat it as a conservative cue and verify conditions locally.',
    },
    safetyProfile: {
      riskLevel: 'caution',
      reviewStatus: 'reviewed',
      hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'dam', 'private_banks'] as RouteHazard[],
      safetyNotes: ['Wear a PFD and carry offline navigation, throw rope and communication equipment.', 'Scout shallow riffles, diversion structures and marked caution locations; portage anything that is not clearly runnable.', 'Private property borders parts of the corridor. Leave the river only at named public access points.', 'Avoid flash floods and thunderstorms; recheck Camp Verde telemetry, trend and local access conditions before launch.'],
    },
    sourceLinks: [lowerForestGuide, accessMap, lowerFlowGuide, { label: 'USGS Verde River near Camp Verde gauge', url: lowerGauge.detailUrl, provider: 'usgs' as const }],
    statusText: 'Use the Camp Verde gauge and inspect the marked riffles, diversions, strainers and private-bank constraints before launch.',
    accessPoints: [{ ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note }, { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Use the named public access only; confirm parking, carry and river access on arrival.' }],
    logistics: { distanceLabel: `About ${spec.miles} river miles`, estimatedPaddleTime: spec.time, shuttle: 'Stage the downstream vehicle first, then drive to the named upstream access. Confirm the Forest Service road and carry condition before unloading.', permits: 'Confirm current Forest Service, park, roadside and private-property access rules before unloading.', camping: 'No overnight camping is included; use separately permitted campgrounds and never camp on private banks.', campingClassification: 'none', summary: spec.summary, accessCaveats: ['Use only the named public RAPs and obey posted parking, carry and closure notices.'], watchFor: ['Low-water riffles and shallow gravel bars', 'Diversion structures and marked portages', 'Strainers, private banks and flash-flood rises'] },
    evidenceNotes: [{ label: 'Access and distance', value: `${spec.reach}; ${spec.miles} miles`, note: 'Friends of the Verde access map and the USFS paddle guide publish the named access sequence, river miles and waypoint coordinates.', sourceUrl: accessMap.url }, { label: 'Scoring band', value: '150–1,000 cfs route-specific planning band', note: 'RiverBrain reports this White Bridge to Beasley Flat band against the Verde River near Camp Verde gauge; use it as a conservative cue and verify current conditions locally.', sourceUrl: lowerFlowGuide.url }, { label: 'Gauge', value: 'USGS 09506000', note: 'Direct Verde River gauge near Camp Verde; recheck current telemetry and trend before launch.', sourceUrl: lowerGauge.detailUrl }],
  };
}

export const arizonaVerdeRoutes: River[] = [
  makeRoute({ id: 'verde-river-lower-tapco-tuzigoot', reach: 'Lower TAPCO RAP to Tuzigoot Bridge', putIn: { name: 'Lower TAPCO RAP', latitude: 34.796181, longitude: -112.041017 }, takeOut: { name: 'Tuzigoot Bridge', latitude: 34.7672379, longitude: -112.0398467 }, miles: 3.3, summary: 'A short Verde River access section through the Clarkdale corridor from Lower TAPCO to Tuzigoot Bridge.', time: 'Allow 2–4 hours with scouting and access stops', note: 'Named Lower TAPCO access; stored point refined to the NHD water-entry edge. Confirm the current roadside pull-off.' }),
  makeRoute({ id: 'verde-river-tuzigoot-89a-bridge', reach: 'Tuzigoot Bridge to Highway 89A Bridge', putIn: { name: 'Tuzigoot Bridge', latitude: 34.7672379, longitude: -112.0398467 }, takeOut: { name: 'Highway 89A Bridge', latitude: 34.7224176, longitude: -111.9915453 }, miles: 6.5, summary: 'A six-and-a-half-mile Verde River run from Tuzigoot Bridge to the Highway 89A Bridgeport access.', time: 'Allow 3–5 hours with scouting and diversion checks', note: 'Named Tuzigoot Bridge access; stored point refined to the NHD water-entry edge. Confirm the current public launch and parking.' }),
  makeRoute({ id: 'verde-river-89a-skidmore', reach: 'Highway 89A Bridge to Skidmore RAP', putIn: { name: 'Highway 89A Bridge', latitude: 34.7224176, longitude: -111.9915453 }, takeOut: { name: 'Skidmore RAP', latitude: 34.69268085, longitude: -111.96223986 }, miles: 4, summary: 'A four-mile Verde River outing from the Highway 89A Bridge to Skidmore access in the Verde Valley.', time: 'Allow 2–4 hours with shallow-riffle scouting', note: 'Named Highway 89A access; verify the bridge-side launch and legal parking. Stored point refined to the NHD water-entry edge.' }),
  makeRoute({ id: 'verde-river-lower-tapco-89a-bridge', reach: 'Lower TAPCO RAP to Highway 89A Bridge', putIn: { name: 'Lower TAPCO RAP', latitude: 34.796181, longitude: -112.041017 }, takeOut: { name: 'Highway 89A Bridge', latitude: 34.7224176, longitude: -111.9915453 }, miles: 9.8, summary: 'A longer Verde Valley day reach combining the documented Lower TAPCO, Tuzigoot and Highway 89A access sequence.', time: 'Allow 5–8 hours with scouting, riffle checks and shuttle time', note: 'The Friends of the Verde and USFS access sequence places Lower TAPCO upstream of Tuzigoot and Highway 89A; use Tuzigoot as an intermediate bail-out and confirm roadside access before launch.' }),
  makeLowerRoute({ id: 'verde-river-white-bridge-clear-creek', reach: 'White Bridge RAP to Clear Creek RAP', putIn: { name: 'White Bridge RAP', latitude: 34.5496, longitude: -111.8508 }, takeOut: { name: 'Clear Creek RAP', latitude: 34.5057, longitude: -111.8378 }, miles: 5.5, summary: 'A named 5.5-mile Verde River paddle-trail section from White Bridge to the popular Clear Creek access below Camp Verde.', time: 'Allow 3–5 hours with scouting, portage and carry checks', note: 'Friends of the Verde and the USFS guide identify White Bridge as a RAP and publish the river-mile coordinate. Confirm the picnic-area parking, carry trail and current water entry.' }),
  makeLowerRoute({ id: 'verde-river-clear-creek-beasley-flat', reach: 'Clear Creek RAP to Beasley Flat RAP', putIn: { name: 'Clear Creek RAP', latitude: 34.5057, longitude: -111.8378 }, takeOut: { name: 'Beasley Flat RAP', latitude: 34.4734, longitude: -111.802 }, miles: 4.3, summary: 'A 4.3-mile Verde River paddle-trail section from Clear Creek to Beasley Flat, the gateway to the Wild and Scenic reach.', time: 'Allow 3–5 hours with scouting, diversion and take-out checks', note: 'The USFS guide and Friends of the Verde map identify Clear Creek and Beasley Flat as named RAPs. Clear Creek has a short steep carry below the diversion; confirm the Forest Service parking and landing.' }),
  makeLowerRoute({ id: 'verde-river-white-bridge-beasley-flat', reach: 'White Bridge RAP to Beasley Flat RAP', putIn: { name: 'White Bridge RAP', latitude: 34.5496, longitude: -111.8508 }, takeOut: { name: 'Beasley Flat RAP', latitude: 34.4734, longitude: -111.802 }, miles: 9, summary: 'The full 9-mile White Bridge to Beasley Flat Verde River paddle-trail day, combining the two named Class II sections below Camp Verde.', time: 'Allow 5–8 hours with scouting, portage, breaks and shuttle margin', note: 'The USFS guide lists White Bridge, Clear Creek and Beasley Flat at river miles 39.5, 45.0 and 49.3; use the intermediate Clear Creek RAP as a bail-out and timing checkpoint.' }),
];
