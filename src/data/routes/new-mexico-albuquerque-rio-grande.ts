import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const cityGuide = { label: 'City of Albuquerque Rio Grande boating and access guidance', url: 'https://www.cabq.gov/parksandrecreation/open-space/enjoying-the-rio-grande', provider: 'local' as const };
const parkGuide = { label: 'Rio Grande Valley State Park access and facilities', url: 'https://www.cabq.gov/parksandrecreation/open-space/lands/rio-grande-valley-state-park', provider: 'local' as const };
const accessGuide = { label: 'Quiet Waters Middle Rio Grande public access notes', url: 'https://www.quietwaterspaddling.com/middle-rio-grande-public-access-information', provider: 'local' as const };
const outingGuide = { label: 'Quiet Waters Albuquerque Rio Grande outing descriptions', url: 'https://www.quietwaterspaddling.com/tourdescriptions', provider: 'local' as const };
const gauge = { id: 'usgs-08329918', provider: 'usgs' as const, siteId: '08329918', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Rio Grande at Alameda Bridge at Alameda, NM', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-08329918/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'dam', 'private_banks'];

const calabacillas = { name: 'Calabacillas Arroyo public river access (water-entry edge)', latitude: 35.187115971800154, longitude: -106.65177189116153 };
const central = { name: 'Central Avenue public river access (water-entry edge)', latitude: 35.08728077195977, longitude: -106.68221819147834 };
const rioBravo = { name: 'Rio Bravo Boulevard public river access (water-entry edge)', latitude: 35.0274595846295, longitude: -106.67462218892496 };

const common = {
  name: 'Rio Grande', riverId: 'rio-grande-new-mexico', state: 'New Mexico', region: 'Albuquerque / Rio Grande Valley State Park', routeType: 'recreational' as const, scoreEligibility: 'scored' as const, gaugeSource: gauge,
  profile: { thresholdModel: 'minimum-only' as const, tooLow: 400, idealMin: 500, thresholdSource: cityGuide, thresholdSourceStrength: 'official' as const, rainfallSensitivity: 'high' as const, windSensitivity: 0.35, seasonMonths: [3,4,5,6,7,8,9,10], seasonNotes: 'Spring runoff and early summer are the most reliable windows. Check the Alameda gauge, trend, weather, wind and current city or park notices immediately before launching.', difficulty: 'easy' as const, difficultyNotes: 'The Albuquerque reach generally has calm water and no technical rapids, but shallow braided channels, strainers, cold water, wind and the San Juan-Chama Diversion Dam require route-specific judgment.', confidenceNotes: 'The City of Albuquerque identifies this reach as calm, nontechnical water, names the public Calabacillas, Central Avenue and Rio Bravo access points, and says flows above roughly 400–500 cfs generally make the North RGVSP-to-southern-boundary corridor feasible. Quiet Waters supplies mapped water-entry coordinates and route-specific access cautions. The 400 cfs floor is a conservative planning cue, not a safety guarantee.' },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: ['Wear a properly fitted PFD at all times and carry a whistle or horn, spare paddle, throw line, communication and offline navigation.', 'Check the direct Alameda gauge, flow trend, weather and wind. Sustained winds around 25 mph or more can make the broad channel difficult, and cold water remains a serious immersion hazard.', 'Scout shallow braided channels, strainers, bridge turbulence and changing sandbars. The San Juan-Chama Diversion Dam is immediately downstream of the Alameda bridge and requires a portage; these routes begin below that hazard.', 'Use only the named public access areas, stay out of private banks and quiet zones, and leave before park gates close. Do not rely on the riverbank for camping or emergency vehicle access.'] },
  sourceLinks: [cityGuide, parkGuide, accessGuide, outingGuide, { label: 'USGS Alameda Bridge gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
};

function makeRoute(spec: { id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; miles: number; summary: string; time: string; note: string; watch?: string[] }): River {
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
    statusText: 'Check USGS 08329918 at Alameda, flow trend, wind, cold-water conditions, weather and park access before launch; use 400 cfs only as a conservative minimum planning cue.',
    accessPoints: [
      { ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note },
      { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm the public water-entry edge, carry, parking, gate hours and current access notices before staging.' },
    ],
    logistics: {
      distanceLabel: `About ${spec.miles} river miles`,
      estimatedPaddleTime: spec.time,
      shuttle: 'Stage the downstream vehicle at the named public access, then drive to the upstream access. Allow extra time for the carry from parking to the water.',
      permits: 'No special private-boater river permit is listed by the City, but follow New Mexico boating regulations and all City, MRGCD and park access rules. Confirm current closures and parking restrictions.',
      camping: 'No overnight camping is included on the river or at the access points. Use a separately permitted campground or lodging near Albuquerque; do not camp on private banks or in the bosque.',
      campingClassification: 'nearby_basecamp',
      summary: spec.summary,
      accessCaveats: ['The city access points commonly require a walk or carry from parking to the river; use a cart where appropriate and keep the channel clear.', 'RGVSP is open sunrise to sunset; confirm gates and seasonal notices before staging.', 'Do not use bridge, diversion or private-bank areas as an unplanned take-out.'],
      watchFor: spec.watch ?? ['USGS 08329918 and 400 cfs low-water cue', 'Cold water, wind and shallow braided channels', 'Strainers, bridges, private banks and park hours'],
    },
    evidenceNotes: [
      { label: 'Public access chain', value: spec.reach, note: 'The City of Albuquerque names the access points and describes legal non-motorized boating in the Albuquerque reach. Quiet Waters supplies water-entry coordinate references and carry cautions.', sourceUrl: cityGuide.url },
      { label: 'Scoring floor', value: '400 cfs conservative minimum; 500 cfs practical target', note: 'City guidance says roughly 400–500 cfs generally provides feasible paddling conditions in the Rio Grande Valley State Park corridor. Verify live conditions and trend; this is not a safety guarantee.', sourceUrl: cityGuide.url },
      { label: 'Direct telemetry', value: 'USGS 08329918 Rio Grande at Alameda Bridge', note: 'The direct station is at the north end of the selected Albuquerque corridor. Recheck the live discharge and trend before departure.', sourceUrl: gauge.detailUrl },
      { label: 'Access and camping posture', value: 'Public park and bridge access; nearby basecamp only', note: 'City and park materials identify public access, sunrise-to-sunset facilities and bosque recreation. Overnight riverbank camping is not assumed.', sourceUrl: parkGuide.url },
    ],
  };
}

export const newMexicoAlbuquerqueRioGrandeRoutes: River[] = [
  makeRoute({ id: 'rio-grande-calabacillas-central', reach: 'Calabacillas Arroyo access to Central Avenue access', putIn: calabacillas, takeOut: central, miles: 7.5, summary: 'A popular northern Rio Grande Valley State Park day reach from the Calabacillas access to Central Avenue, below the San Juan-Chama diversion hazard.', time: 'Allow 2–3 hours of river time plus carries, scouting and shuttle margin', note: 'Quiet Waters identifies Calabacillas as the preferred departure below the Alameda diversion. The City confirms the access and the calm-water character; inspect the unimproved carry and river edge before unloading.', watch: ['Shallow braided channels and sandbars', 'Cold water and 25 mph wind threshold', 'Central Avenue bridge turbulence and limited parking'] }),
  makeRoute({ id: 'rio-grande-central-rio-bravo', reach: 'Central Avenue access to Rio Bravo Boulevard access', putIn: central, takeOut: rioBravo, miles: 5.5, summary: 'A southern Rio Grande Valley State Park float from Central Avenue through the Albuquerque bosque to the Rio Bravo public access.', time: 'Allow 1–2 hours of river time plus carries, scouting and shuttle margin', note: 'The City names both Central Avenue and Rio Bravo as public boating access points. Confirm the Sunset Road carry, the Rio Bravo gate, parking and the accessible river edge before launching.', watch: ['Shallow water, wood and changing sandbars', 'Bridge turbulence and private-bank boundaries', 'Rio Bravo park hours and take-out carry'] }),
  makeRoute({ id: 'rio-grande-calabacillas-rio-bravo', reach: 'Calabacillas Arroyo access to Rio Bravo Boulevard access', putIn: calabacillas, takeOut: rioBravo, miles: 13, summary: 'The full Albuquerque Rio Grande Valley State Park day reach linking the Calabacillas, Central Avenue and Rio Bravo access chain.', time: 'Allow 3.5–5 hours of river time plus carries, breaks, scouting and shuttle margin', note: 'Quiet Waters describes the Calabacillas-to-Rio Bravo full run as a higher-flow option, while the City confirms the public access chain and the 400–500 cfs feasibility cue. Use Central Avenue as a contingency only after confirming the landing.', watch: ['Long carry and limited emergency vehicle access', 'Shallow braided channels, strainers and cold water', 'Rio Bravo park hours, wind and southern boundary conditions'] }),
];
