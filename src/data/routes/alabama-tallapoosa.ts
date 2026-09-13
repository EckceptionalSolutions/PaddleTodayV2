import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const acesGuide = { label: 'Alabama Extension Harold Banks Canoe Trail guide', url: 'https://www.aces.edu/blog/topics/tallapoosa/canoe-trail-tallapoosa-river/', provider: 'local' as const };
const mapGuide = { label: 'Harold Banks Canoe Trail map PDF', url: 'https://www.aces.edu/wp-content/uploads/2020/02/ANR-2229_HaroldBanksCanoeTrailMap_021920L-G-copy.pdf', provider: 'local' as const };
const wadleyGauge = { id: 'usgs-02414500', provider: 'usgs' as const, siteId: '02414500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Tallapoosa River at Wadley, AL', detailUrl: 'https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=02414500' };
const horseshoeGauge = { id: 'usgs-02414715', provider: 'usgs' as const, siteId: '02414715', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Tallapoosa River near New Site (Horseshoe Bend), AL', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02414715/' };
const hazards: RouteHazard[] = ['low_water', 'fast_rise', 'strainers', 'private_banks', 'cold_water'];

const bibbys = { name: "Bibby's Ferry public access (Bibbys Ferry Road water edge)", latitude: 33.0311655, longitude: -85.5850543 };
const germanys = { name: "Germany's Ferry public access (County Road 80 bridge water edge)", latitude: 32.9649966, longitude: -85.6475521 };
const horseshoe = { name: 'Horseshoe Bend public access (AL 49 bridge water edge)', latitude: 32.9869987, longitude: -85.753679 };
const petersIsland = { name: 'Peters Island public access (river water edge)', latitude: 32.9873143, longitude: -85.7549147 };
const jayBird = { name: 'Jay Bird Creek public access (Boone Valley Road water edge)', latitude: 32.9568945, longitude: -85.8112029 };

const common = {
  name: 'Tallapoosa River', riverId: 'tallapoosa-river-alabama', state: 'Alabama', region: 'Tallapoosa / Chambers Counties', routeType: 'recreational' as const, scoreEligibility: 'scored' as const,
  statusText: 'Check the direct USGS Tallapoosa gauge, Alabama Power release conditions, weather, wood and both public access sites before launch. The 1,500–10,000 cfs band is a planning reference, not a safety guarantee.',
  profile: {
    thresholdModel: 'two-sided' as const, tooLow: 1500, idealMin: 1500, idealMax: 10000, tooHigh: 10000, thresholdSource: acesGuide, thresholdSourceStrength: 'official' as const,
    rainfallSensitivity: 'medium' as const, windSensitivity: 0.2, seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    seasonNotes: 'The Tallapoosa may be floated year-round, with spring and summer generally preferred. Harris Dam and Alabama Power operations can change level and current; check same-day telemetry and release information.',
    difficulty: 'easy' as const, difficultyNotes: 'Alabama Extension describes the Harold Banks trail as family-friendly flatwater and shoals rarely above Class I. Scout the Fish Trap, Griffin Shoals, side chutes and wood before committing.',
    confidenceNotes: 'Alabama Extension documents the three public sections, five public access points, mileage, float times, Class I character, direct USGS gauge locations, and the favorable 1,500–10,000 cfs range. Coordinates are placed on the mapped river crossings or water-edge access points. Camping is only by landowner permission at designated private sites.',
  },
  gaugeSource: wadleyGauge,
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: [
    'Wear a properly fitted PFD and carry communication, offline navigation, water, sun protection and a basic repair/first-aid kit.',
    'At low flow expect exposed shoals and dragging; rising or release-driven water increases current and strainer risk. Scout the Fish Trap, Griffin Shoals and side chutes.',
    'Use only the named public access sites. Private land adjoining the trail is posted; do not use private banks for parking, bailout or camping without permission.',
    'Keep clear of Horseshoe Bend National Military Park restrictions and confirm park, bridge and landowner access rules before unloading.',
  ] },
  sourceLinks: [acesGuide, mapGuide, { label: 'USGS Wadley Tallapoosa gauge', url: wadleyGauge.detailUrl, provider: 'usgs' as const }, { label: 'USGS Horseshoe Bend Tallapoosa gauge', url: horseshoeGauge.detailUrl, provider: 'usgs' as const }],
};

type Access = typeof bibbys | typeof germanys | typeof horseshoe | typeof petersIsland | typeof jayBird;
type Spec = { id: string; reach: string; putIn: Access; takeOut: Access; miles: number; time: string; summary: string; note: string; gauge: typeof wadleyGauge | typeof horseshoeGauge };

function makeRoute(spec: Spec): River {
  return {
    ...common, id: spec.id, slug: spec.id, reach: spec.reach, putIn: spec.putIn, takeOut: spec.takeOut, latitude: spec.putIn.latitude, longitude: spec.putIn.longitude, summary: spec.summary, gaugeSource: spec.gauge,
    accessPoints: [
      { ...spec.putIn, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note },
      { ...spec.takeOut, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm the visible river edge, parking, carry and any closure before launching or taking out.' },
    ],
    logistics: {
      distanceLabel: `About ${spec.miles} river miles`, estimatedPaddleTime: spec.time,
      shuttle: 'Stage the downstream vehicle at the named public access, then shuttle to the upstream bridge or ferry access. Keep vehicles at public sites only.',
      permits: 'Confirm current county-road, bridge, park and landowner rules. Designated private campsites require permission.',
      camping: 'Designated campsites exist along the trail on private property by permission only. No campsite is assumed for this route; arrange permission in advance or use off-river lodging.', campingClassification: 'on_route_campsite',
      summary: spec.summary,
      accessCaveats: ['Use the public access points named by Alabama Extension and shown on the trail map.', 'Check same-day gauge, trend, Alabama Power operations, weather and wood.', 'All private adjoining land is posted; respect landowner permissions and leave designated campsites clean.'],
      watchFor: ['USGS Tallapoosa discharge and Harris Dam releases', 'Low-water shoals, Fish Trap, Griffin Shoals and side chutes', 'Strainers, private banks, cold water and thunderstorms'],
    },
    evidenceNotes: [
      { label: 'Named reach and access', value: `${spec.reach}; approximately ${spec.miles} miles`, note: 'The Alabama Extension Harold Banks guide and map identify the public access chain and the three manageable float sections.', sourceUrl: acesGuide.url },
      { label: 'Flow scoring cues', value: '1,500 cfs lower planning cue; 1,500–10,000 cfs favorable range; above 10,000 cfs dangerous review cue', note: 'The Extension guide publishes these discharge cues; verify current telemetry and local conditions before launch.', sourceUrl: acesGuide.url },
      { label: 'Direct gauge', value: `${spec.gauge.siteName} (${spec.gauge.siteId})`, note: 'Direct Tallapoosa River discharge telemetry for the selected section.', sourceUrl: spec.gauge.detailUrl },
      { label: 'Camping and stewardship', value: 'Designated private campsites by permission only', note: 'The Extension guide states that campsites are on private property and available only by landowner permission.', sourceUrl: acesGuide.url },
    ],
  };
}

export const alabamaTallapoosaRoutes: River[] = [
  makeRoute({ id: 'tallapoosa-river-bibbys-germanys-ferry', reach: "Bibby's Ferry to Germany's Ferry", putIn: bibbys, takeOut: germanys, miles: 8.25, time: 'Allow about 5 hours plus shuttle and scouting time', summary: "The upper Harold Banks Canoe Trail section from Bibby's Ferry through the Fish Trap and brisk shoals to Germany's Ferry Bridge.", note: "Bibby's Ferry at County Road 62 and Germany's Ferry Bridge are the public endpoints named by Alabama Extension. Confirm the ferry approach and water-entry edge before unloading.", gauge: wadleyGauge }),
  makeRoute({ id: 'tallapoosa-river-germanys-horseshoe-bend', reach: "Germany's Ferry to Horseshoe Bend", putIn: germanys, takeOut: horseshoe, miles: 9.75, time: 'Allow about 6 hours plus shuttle and scouting time', summary: "The middle Harold Banks section from Germany's Ferry through Griffin Shoals to Horseshoe Bend National Military Park.", note: "Germany's Ferry Bridge and the AL 49 Horseshoe Bend access are the public endpoints named by Alabama Extension. Confirm bridge parking and park access rules before launch.", gauge: horseshoeGauge }),
  makeRoute({ id: 'tallapoosa-river-horseshoe-bend-jay-bird', reach: 'Horseshoe Bend to Jay Bird Creek', putIn: horseshoe, takeOut: jayBird, miles: 6, time: 'Allow about 4 hours plus shuttle and scouting time', summary: 'The most popular and scenic lower Harold Banks section from Horseshoe Bend past Peters Island, shoal lilies and side chutes to Jay Bird Creek.', note: 'Horseshoe Bend and Jay Bird Creek are the public endpoints named by Alabama Extension. Confirm the park-side launch, Boone Valley Road carry and water entry before committing.', gauge: horseshoeGauge }),
  { ...makeRoute({ id: 'tallapoosa-river-peters-island-jay-bird', reach: 'Peters Island to Jay Bird Creek', putIn: petersIsland, takeOut: jayBird, miles: 5.5, time: 'Allow about 4 hours plus shuttle and scouting time', summary: 'A lower Harold Banks scenic section from the documented Peters Island access through shoal-lily and side-chute habitat to Jay Bird Creek.', note: 'Alabama Extension lists Peters Island and Jay Bird Creek as public access points on Section 3. Confirm the island carry, water entry, daylight and downstream shuttle before launch.', gauge: horseshoeGauge }), consolidation: { group: 'tallapoosa-lower-jay-bird-access-choice', role: 'alternative' as const, relatedRouteIds: ['tallapoosa-river-horseshoe-bend-jay-bird'], note: 'Retain Peters Island as a distinct island carry and shorter launch option; its endpoint is within 0.08 miles of Horseshoe Bend, so the two cards should be presented as access choices rather than unrelated trips.' } },
  makeRoute({ id: 'tallapoosa-river-bibbys-horseshoe-bend', reach: "Bibby's Ferry to Horseshoe Bend", putIn: bibbys, takeOut: horseshoe, miles: 18, time: 'Plan a long day with an early start, scouting and shuttle margin', summary: "A combined upper and middle Harold Banks itinerary from Bibby's Ferry through Germany's Ferry and Griffin Shoals to Horseshoe Bend.", note: "This longer itinerary joins the Extension's documented Sections 1 and 2. Use Germany's Ferry as an intermediate public bailout and confirm daylight, flow and shuttle logistics before committing.", gauge: horseshoeGauge }),
  makeRoute({ id: 'tallapoosa-river-germanys-jay-bird', reach: "Germany's Ferry to Jay Bird Creek", putIn: germanys, takeOut: jayBird, miles: 15.75, time: 'Plan a long day with shoal scouting and shuttle margin', summary: "A combined middle and lower Harold Banks itinerary from Germany's Ferry through Horseshoe Bend and Peters Island to Jay Bird Creek.", note: "This itinerary joins the Extension's documented Sections 2 and 3. Horseshoe Bend is an intermediate public bailout; confirm park access, daylight and current before launch.", gauge: horseshoeGauge }),
  makeRoute({ id: 'tallapoosa-river-bibbys-jay-bird', reach: "Bibby's Ferry to Jay Bird Creek", putIn: bibbys, takeOut: jayBird, miles: 24, time: 'Plan a full-day or permitted overnight expedition with substantial shuttle margin', summary: "The full Harold Banks Canoe Trail itinerary across the documented 25-mile Tallapoosa corridor from Bibby's Ferry to Jay Bird Creek.", note: "Alabama Extension describes the three sections as a roughly 25-mile trail with designated private campsites. Treat this as a full-day or permission-based overnight plan, use Germany's Ferry and Horseshoe Bend as bailouts, and do not camp without landowner permission.", gauge: horseshoeGauge }),
];
