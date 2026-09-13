import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const farmingtonGuide = { label: 'Farmington Animas and San Juan paddle trails', url: 'https://farmingtonnm.org/listings/paddle-trails', provider: 'local' as const };
const aztecGuide = { label: 'Aztec Animas River access, mileage and hazard guide', url: 'https://www.aztecnm.com/recreation/animasriver.html', provider: 'local' as const };
const stateParksGuide = { label: 'New Mexico State Parks paddlesports safety guidance', url: 'https://www.emnrd.nm.gov/spd/activities/boating-2/paddle-sports/', provider: 'local' as const };
const gauge = { id: 'usgs-09364200', provider: 'usgs' as const, siteId: '09364200', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Animas River at Penny Lane near Flora Vista, NM', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/09364200/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'dam', 'private_banks'];

const aztecRiverside = { name: 'Aztec Riverside Park public landing (water-entry edge)', latitude: 36.820633, longitude: -108.008483 };
const pennyLane = { name: 'Penny Lane public boat ramp (water-entry edge)', latitude: 36.782974, longitude: -108.102465 };
const animasPark = { name: 'Animas Park public landing (water-entry edge)', latitude: 36.743403, longitude: -108.16304 };
const boydPark = { name: 'Boyd Park public landing (water-entry edge)', latitude: 36.720367, longitude: -108.204597 };

const common = {
  name: 'Animas River', riverId: 'animas-river-new-mexico', state: 'New Mexico', region: 'Aztec / Farmington', routeType: 'recreational' as const, scoreEligibility: 'scored' as const, gaugeSource: gauge,
  profile: { thresholdModel: 'minimum-only' as const, tooLow: 600, idealMin: 900, thresholdSource: farmingtonGuide, thresholdSourceStrength: 'official' as const, rainfallSensitivity: 'high' as const, windSensitivity: 0.3, seasonMonths: [3,4,5,6,7,8,9,10], seasonNotes: 'Spring runoff and managed releases are the best windows. Check the Penny Lane gauge, release trend, weather, sediment and current park notices before launching.', difficulty: 'moderate' as const, difficultyNotes: 'Farmington describes these as recreational paddle trails, but the Animas includes moving water, a modified Penny Lane diversion, additional diversion structures, cold water and changing debris. Scout every feature.', confidenceNotes: 'Farmington publishes the exact landing distances and says the Animas is too low for rafting below 600 cfs. The Aztec guide identifies public landings, coordinates, ramps and diversion hazards. USGS 09364200 at Penny Lane provides direct telemetry for the selected corridor.' },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: ['Wear a properly fitted PFD and carry a whistle, throw device, spare paddle, communication, offline navigation and sun/cold-water protection.', 'Check direct USGS 09364200 discharge and trend, release notices, weather and sediment. The 600 cfs floor is a rafting planning cue, not a safety guarantee for every craft.', 'Scout Penny Lane and every downstream diversion, fence and bridge. Portage whenever the line is unclear; low-head dams can trap paddlers and hidden fences may require a carry.', 'Use only the named city or park landings, respect private and tribal boundaries, and plan a shuttle because cell coverage and emergency access vary.'] },
  sourceLinks: [farmingtonGuide, aztecGuide, stateParksGuide, { label: 'USGS Penny Lane gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
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
    statusText: 'Check USGS 09364200, release trend, weather, sediment and park notices before launch; scout and portage every diversion or fence.',
    accessPoints: [
      { ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note },
      { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm public parking, water-entry edge, carry, gate hours and current landing condition before staging.' },
    ],
    logistics: {
      distanceLabel: `About ${spec.miles} river miles`,
      estimatedPaddleTime: spec.time,
      shuttle: 'Stage the downstream vehicle at the named public landing, then drive to the upstream landing. Allow extra time for scouting and diversion portages.',
      permits: 'No special private-boater permit is listed for these city and county landings, but New Mexico boating law, park rules and land-boundary restrictions apply. Confirm current notices.',
      camping: 'No overnight river camping is included. Use established campgrounds or lodging near Aztec or Farmington; do not camp on private or tribal banks.',
      campingClassification: 'nearby_basecamp',
      summary: spec.summary,
      accessCaveats: ['Use only the named public landings and keep vehicles in designated parking.', 'Penny Lane and other diversion structures require a current visual scout and may require a portage.', 'Respect private property, bridges, fishing areas and city park hours.'],
      watchFor: spec.watch,
    },
    evidenceNotes: [
      { label: 'Named landing and distance', value: `${spec.reach}; ${spec.miles} miles`, note: 'Farmington publishes the landing-to-landing distance; the Aztec guide supplies the public water-entry coordinates and feature sequence.', sourceUrl: farmingtonGuide.url },
      { label: 'Scoring floor', value: '600 cfs minimum planning cue; 900 cfs target', note: 'Farmington says the Animas is too low for rafting below 600 cfs. Verify current gauge, craft suitability and local conditions.', sourceUrl: farmingtonGuide.url },
      { label: 'Direct telemetry', value: 'USGS 09364200 Animas River at Penny Lane', note: 'Direct gauge near the selected corridor; recheck discharge and trend before departure.', sourceUrl: gauge.detailUrl },
      { label: 'Safety and camping', value: 'PFD, diversion/fence portage, public landings and nearby basecamp', note: 'New Mexico State Parks warns of low-head dams and strainers; this catalog does not assume riverbank camping.', sourceUrl: stateParksGuide.url },
    ],
  };
}

export const newMexicoAnimasRoutes: River[] = [
  makeRoute({ id: 'animas-river-aztec-riverside-penny-lane', reach: 'Aztec Riverside Park to Penny Lane landing', putIn: aztecRiverside, takeOut: pennyLane, miles: 7.3, summary: 'A public Aztec-to-Penny Lane Animas paddle trail with moving water, a named ramp and a documented 600 cfs rafting floor.', time: 'Allow 3–5 hours with diversion scouting and shuttle margin', note: 'Aztec identifies Riverside Park as a public carry or trailer access and Penny Lane as an easy trailer-friendly ramp. Confirm the river edge and parking before unloading.', watch: ['Cold water and changing release levels', 'Penny Lane diversion and downstream features', 'Strainers, fences and bridge clearance'] }),
  makeRoute({ id: 'animas-river-penny-lane-animas-park', reach: 'Penny Lane landing to Animas Park landing', putIn: pennyLane, takeOut: animasPark, miles: 5.5, summary: 'A Farmington paddle-trail reach from the Penny Lane ramp through the Animas Park corridor.', time: 'Allow 2–4 hours with feature scouting and shuttle margin', note: 'Farmington publishes the Penny Lane-to-Animas Park distance; the Aztec guide places the Animas Park landing in the public park corridor. Scout the modified Penny Lane feature before proceeding.', watch: ['Penny Lane hydraulic and bridge approaches', 'Urban current, strainers and fishing traffic', 'Animas Park landing and park hours'] }),
  makeRoute({ id: 'animas-river-animas-park-boyd', reach: 'Animas Park landing to Boyd Park landing', putIn: animasPark, takeOut: boydPark, miles: 5.5, summary: 'A city-access Animas float from Animas Park to the documented Boyd Park trailer landing in Farmington.', time: 'Allow 2–4 hours with bridge and current scouting', note: 'Farmington publishes the Animas Park-to-Boyd distance, and the Aztec guide identifies Boyd Park as a possible trailer access. Use the mapped park water-entry edges and confirm hours before staging.', watch: ['Urban bridges and moving current', 'Strainers and submerged objects', 'Boyd Park parking, landing and park hours'] }),
  makeRoute({ id: 'animas-river-aztec-riverside-animas-park', reach: 'Aztec Riverside Park to Animas Park landing', putIn: aztecRiverside, takeOut: animasPark, miles: 12.8, summary: 'A longer Animas paddle trail combining the Riverside Park to Penny Lane and Penny Lane to Animas Park sections.', time: 'Allow 5–8 hours with diversion scouting and shuttle margin', note: 'Use Penny Lane as the documented intermediate bailout and scout the modified feature before continuing downstream. Confirm both city landing conditions and parking.' , watch: ['Penny Lane diversion and bridge approaches', 'Cold water, strainers and fishing traffic', 'Animas Park landing and park hours'] }),
  makeRoute({ id: 'animas-river-aztec-riverside-boyd', reach: 'Aztec Riverside Park to Boyd Park landing', putIn: aztecRiverside, takeOut: boydPark, miles: 18.3, summary: 'The full documented Aztec-to-Farmington Animas paddle trail from Riverside Park to Boyd Park.', time: 'Allow 7–10 hours with scouting, diversion portages and shuttle margin', note: 'Use Penny Lane and Animas Park as named intermediate bailouts. Confirm the long shuttle, park hours and every diversion or fence before launch.', watch: ['Penny Lane and downstream diversion structures', 'Long urban reach with limited assistance', 'Boyd Park parking, landing and park hours'] }),
  makeRoute({ id: 'animas-river-penny-lane-boyd', reach: 'Penny Lane landing to Boyd Park landing', putIn: pennyLane, takeOut: boydPark, miles: 11.0, summary: 'A combined Farmington Animas reach from Penny Lane through Animas Park to Boyd Park.', time: 'Allow 4–6 hours with bridge, current and landing scouting', note: 'Animas Park is the documented intermediate bailout. Scout the Penny Lane feature, downstream structures and the Boyd Park landing before committing.', watch: ['Penny Lane hydraulic and bridge approaches', 'Urban current, strainers and submerged objects', 'Boyd Park parking, landing and park hours'] }),
];
