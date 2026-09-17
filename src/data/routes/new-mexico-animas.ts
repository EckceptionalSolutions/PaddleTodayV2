import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const farmingtonGuide = { label: 'Farmington Animas and San Juan paddle trails', url: 'https://farmingtonnm.org/listings/paddle-trails', provider: 'local' as const };
const aztecGuide = { label: 'Aztec Animas River access, mileage and hazard guide', url: 'https://www.aztecnm.com/recreation/animasriver.html', provider: 'local' as const };
const stateParksGuide = { label: 'New Mexico State Parks paddlesports safety guidance', url: 'https://www.emnrd.nm.gov/spd/activities/boating-2/paddle-sports/', provider: 'local' as const };
const gauge = { id: 'usgs-09364200', provider: 'usgs' as const, siteId: '09364200', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Animas River at Penny Lane near Flora Vista, NM', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/09364200/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'dam', 'private_banks'];

const aztecRiverside = { name: 'Aztec Riverside Park public landing (water-entry edge)', latitude: 36.820633, longitude: -108.008483 };
const cedarHillRamp = { name: 'Cedar Hill 550 Bridge County Boat Ramp (water-entry edge)', latitude: 36.933222, longitude: -107.893921 };
const pennyLane = { name: 'Penny Lane public boat ramp (water-entry edge)', latitude: 36.782974, longitude: -108.102465 };
const animasPark = { name: 'Animas Park public landing (water-entry edge)', latitude: 36.743403, longitude: -108.16304 };
const boydPark = { name: 'Boyd Park public landing (water-entry edge)', latitude: 36.720367, longitude: -108.204597 };
const cedarHillGauge = { id: 'usgs-09364010', provider: 'usgs' as const, siteId: '09364010', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Animas River below Aztec, NM', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-09364010/' };
const pennyLaneGauge = { id: 'usgs-09364200', provider: 'usgs' as const, siteId: '09364200', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Animas River at Penny Lane near Flora Vista, NM', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-09364200/' };
const farmingtonGauge = { id: 'usgs-09364500', provider: 'usgs' as const, siteId: '09364500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Animas River at Farmington, NM', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-09364500/' };
const cedarHillThresholdSource = { label: 'American Whitewater Cedar Hill to Farmington trip report', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/1203/main', provider: 'local' as const };
const cedarHillProfile: NonNullable<River['profile']> = {
  thresholdModel: 'minimum-only', tooLow: 700, idealMin: 900,
  thresholdSource: cedarHillThresholdSource, thresholdSourceStrength: 'community',
  rainfallSensitivity: 'medium', windSensitivity: 0.2, seasonMonths: [4, 5, 6, 7],
  seasonNotes: 'Spring runoff is the best documented window. Check the selected direct USGS station and trend, rainfall, weather, sediment and access notices before launch.',
  difficulty: 'moderate',
  difficultyNotes: 'American Whitewater describes the broader Cedar Hill to Farmington run as Class I–II. The longer trips still require a full daylight plan, diversion scouting and readiness to portage.',
  confidenceNotes: 'American Whitewater documents the Class I–II Cedar Hill–Farmington corridor and a May trip from 900 down to 700 cfs, with the paddler advising against lower flows. The Aztec guide provides mapped public landing coordinates, river-mile markers, diversion hazards and the Animas 8 BLM campsite. The selected USGS station is direct telemetry on the same Animas reach near the route takeout.'
};
const cedarHillSafetyProfile: NonNullable<River['safetyProfile']> = {
  riskLevel: 'caution', reviewStatus: 'reviewed', hazards: [...hazards, 'portage'],
  safetyNotes: [
    'Wear a properly fitted PFD; carry a whistle, throw device, spare paddle, communication, offline navigation and sun/cold-water protection.',
    'Use 700 cfs only as a community-derived planning floor and 900 cfs as an observed trip reference at the selected direct USGS station. Check the live reading, trend, rainfall, weather and sediment; the score is not a safety guarantee.',
    'Scout the Animas Ditch diversion near guide mile 28.6 for exposed rebar. The Farmers Ditch diversion near mile 34.6 is documented as scrapey below 1,000 cfs. Portage whenever the line is unclear.',
    'These are long trips with limited convenient exits. Treat Riverside Park, Penny Lane and Animas Park as named bailouts only after confirming the landing, parking and access are open; stay off private banks and finish in daylight.',
    'Animas 8 is a BLM campsite listed on the reach. Verify current BLM site and fire rules; no fire is assumed or permitted by this route description.'
  ]
};

const common = {
  name: 'Animas River', riverId: 'animas-river-new-mexico', state: 'New Mexico', region: 'Aztec / Farmington', routeType: 'recreational' as const, scoreEligibility: 'scored' as const, gaugeSource: gauge,
  profile: { thresholdModel: 'minimum-only' as const, tooLow: 600, idealMin: 900, thresholdSource: farmingtonGuide, thresholdSourceStrength: 'official' as const, rainfallSensitivity: 'high' as const, windSensitivity: 0.3, seasonMonths: [3,4,5,6,7,8,9,10], seasonNotes: 'Spring runoff and managed releases are the best windows. Check the Penny Lane gauge, release trend, weather, sediment and current park notices before launching.', difficulty: 'moderate' as const, difficultyNotes: 'Farmington describes these as recreational paddle trails, but the Animas includes moving water, a modified Penny Lane diversion, additional diversion structures, cold water and changing debris. Scout every feature.', confidenceNotes: 'Farmington publishes the exact landing distances and says the Animas is too low for rafting below 600 cfs. The Aztec guide identifies public landings, coordinates, ramps and diversion hazards. USGS 09364200 at Penny Lane provides direct telemetry for the selected corridor.' },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: ['Wear a properly fitted PFD and carry a whistle, throw device, spare paddle, communication, offline navigation and sun/cold-water protection.', 'Check direct USGS 09364200 discharge and trend, release notices, weather and sediment. The 600 cfs floor is a rafting planning cue, not a safety guarantee for every craft.', 'Scout Penny Lane and every downstream diversion, fence and bridge. Portage whenever the line is unclear; low-head dams can trap paddlers and hidden fences may require a carry.', 'Use only the named city or park landings, respect private and tribal boundaries, and plan a shuttle because cell coverage and emergency access vary.'] },
  sourceLinks: [farmingtonGuide, aztecGuide, stateParksGuide, { label: 'USGS Penny Lane gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
};

function makeRoute(spec: {
  id: string;
  reach: string;
  putIn: River['putIn'];
  takeOut: River['takeOut'];
  miles: number;
  summary: string;
  time: string;
  note: string;
  watch: string[];
  intermediateAccessPoints?: NonNullable<River['accessPoints']>;
  gaugeSource?: River['gaugeSource'];
  profile?: River['profile'];
  safetyProfile?: River['safetyProfile'];
  sourceLinks?: River['sourceLinks'];
  statusText?: string;
  logistics?: River['logistics'];
  evidenceNotes?: River['evidenceNotes'];
}): River {
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
    statusText: spec.statusText ?? 'Check USGS 09364200, release trend, weather, sediment and park notices before launch; scout and portage every diversion or fence.',
    gaugeSource: spec.gaugeSource ?? common.gaugeSource,
    profile: spec.profile ?? common.profile,
    safetyProfile: spec.safetyProfile ?? common.safetyProfile,
    sourceLinks: spec.sourceLinks ?? common.sourceLinks,
    accessPoints: [
      { ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note },
      ...(spec.intermediateAccessPoints ?? []),
      { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm public parking, water-entry edge, carry, gate hours and current landing condition before staging.' },
    ],
    logistics: spec.logistics ?? {
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
    evidenceNotes: spec.evidenceNotes ?? [
      { label: 'Named landing and distance', value: `${spec.reach}; ${spec.miles} miles`, note: 'Farmington publishes the landing-to-landing distance; the Aztec guide supplies the public water-entry coordinates and feature sequence.', sourceUrl: farmingtonGuide.url },
      { label: 'Scoring floor', value: '600 cfs minimum planning cue; 900 cfs target', note: 'Farmington says the Animas is too low for rafting below 600 cfs. Verify current gauge, craft suitability and local conditions.', sourceUrl: farmingtonGuide.url },
      { label: 'Direct telemetry', value: 'USGS 09364200 Animas River at Penny Lane', note: 'Direct gauge near the selected corridor; recheck discharge and trend before departure.', sourceUrl: gauge.detailUrl },
      { label: 'Safety and camping', value: 'PFD, diversion/fence portage, public landings and nearby basecamp', note: 'New Mexico State Parks warns of low-head dams and strainers; this catalog does not assume riverbank camping.', sourceUrl: stateParksGuide.url },
    ],
  };
}

export const newMexicoAnimasRoutes: River[] = [
  makeRoute({
    id: 'animas-river-cedar-hill-aztec-riverside',
    reach: 'Cedar Hill 550 Bridge County Boat Ramp to Aztec Riverside Park',
    putIn: cedarHillRamp,
    takeOut: aztecRiverside,
    miles: 12.5,
    summary: 'A documented 12.5-mile Animas day run from the new public Cedar Hill ramp to Aztec Riverside Park, with Class I–II water and two diversion structures to scout or portage.',
    time: 'Allow 5–8 hours for a full daylight trip, diversion scouting and shuttle margin',
    note: 'San Juan County opened the Cedar Hill Boat Ramp in 2023; Aztec’s river guide marks the Cedar Hill 550 Bridge access and Riverside Park water entry. Use only the signed ramp and public park landing.',
    watch: ['Animas Ditch diversion and exposed rebar near guide mile 28.6', 'Farmers Ditch diversion, which is documented as scrapey below 1,000 cfs', 'Cold water, changing debris, public-ramp gate notices and private riverbanks'],
    gaugeSource: cedarHillGauge,
    profile: cedarHillProfile,
    safetyProfile: cedarHillSafetyProfile,
    sourceLinks: [
      { label: 'San Juan County Cedar Hill Boat Ramp completion / public access', url: 'https://onrt.env.nm.gov/blog/2023/06/07/office-of-natural-resources-trustee-celebrates-completion-of-first-restoration-project-funded-with-gold-king-mine-settlement-dollars/', provider: 'local' },
      { label: 'Aztec Animas River access, mileage, camping and hazard guide', url: 'https://www.aztecnm.com/recreation/animasriver.html', provider: 'local' },
      { label: 'American Whitewater Cedar Hill to Farmington reach and flow report', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/1203/main', provider: 'local' },
      { label: 'USGS Animas River below Aztec gauge', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-09364010/', provider: 'usgs' },
      stateParksGuide,
    ],
    statusText: 'Check direct USGS 09364010 discharge and trend, weather, sediment and county access notices before launch. Scout both named diversion structures and portage whenever the route is unclear.',
    logistics: {
      distanceLabel: 'About 12.5 river miles',
      estimatedPaddleTime: 'Allow 5–8 hours in daylight, including diversion scouting and any portage.',
      shuttle: 'Stage at Aztec Riverside Park, then shuttle to the signed Cedar Hill 550 Bridge County Boat Ramp. Confirm current ramp and park hours and use the marked water-entry edges.',
      permits: 'The county ramp and Aztec Riverside Park are public access facilities. Follow posted site rules, New Mexico boating law and any current county or city notices; no private-bank entry is included.',
      camping: 'Aztec’s river guide labels Animas 8 on BLM land at guide mile 33.7 as a camping location within this reach. Confirm current BLM camping and fire rules before using it; no other riverbank camping is claimed.',
      campingClassification: 'on_route_campsite',
      summary: 'A full daylight day trip between a county boat ramp and a city park, with a named BLM camping location available along the reach.',
      accessCaveats: ['Use the new Cedar Hill County Boat Ramp by the 550 Bridge, not informal bank pullouts or adjacent private parcels.', 'Use the water-entry edge at Aztec Riverside Park and confirm the posted gate or park hours before staging.', 'The access guide lists two diversion structures and a BLM camping site inside the reach; verify conditions and rules locally.'],
      watchFor: ['Animas Ditch diversion and exposed rebar near mile 28.6', 'Farmers Ditch diversion near mile 34.6; scrapey below 1,000 cfs', 'Cold water, fast rises, changing debris, private banks and reduced daylight'],
    },
    evidenceNotes: [
      { label: 'Public on-water endpoints and mileage', value: 'Cedar Hill 550 Bridge ramp to Aztec Riverside Park; about 12.5 river miles', note: 'San Juan County confirms the completed public boat ramp; Aztec’s river guide marks the Cedar Hill access and Riverside Park water-entry coordinates.', sourceUrl: 'https://www.aztecnm.com/recreation/animasriver.html' },
      { label: 'Scored flow floor', value: '700 cfs minimum planning cue; 900 cfs observed on the trip', note: 'American Whitewater reports a May trip with flow falling from 900 to 700 cfs and the paddler recommends against lower flows; direct USGS telemetry is at station 09364010 below Aztec.', sourceUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/1203/main' },
      { label: 'Access hazards and camping', value: 'Two diversion structures and BLM Animas 8 campsite', note: 'Aztec’s access guide identifies the Animas Ditch rebar hazard, the Farmers Ditch low-water scrape and an Animas 8 campsite on BLM land.', sourceUrl: 'https://www.aztecnm.com/recreation/animasriver.html' },
      { label: 'Safety and telemetry', value: 'PFD, current flow, portage, cold-water and private-bank controls', note: 'Review current USGS flow, county access notices and state paddlesports safety guidance before departure.', sourceUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-09364010/' },
    ],
  }),
  makeRoute({
    id: 'animas-river-cedar-hill-penny-lane',
    reach: 'Cedar Hill 550 Bridge County Boat Ramp to Penny Lane landing',
    putIn: cedarHillRamp,
    takeOut: pennyLane,
    miles: 19.8,
    summary: 'A long Class I–II Animas day trip from the Cedar Hill county ramp to the Penny Lane boat ramp, with Aztec Riverside Park as a documented intermediate bailout.',
    time: 'Plan 7–10 hours in daylight, including scouting and any diversion portages',
    note: 'Use the signed Cedar Hill 550 Bridge County Boat Ramp and mapped Penny Lane boat ramp. The Aztec guide river-mile markers place both points on the public access chain.',
    watch: ['Animas Ditch exposed rebar near guide mile 28.6', 'Farmers Ditch diversion; documented scrapey below 1,000 cfs', 'Long distance, cold water, changing debris and limited exits'],
    gaugeSource: pennyLaneGauge,
    profile: cedarHillProfile,
    safetyProfile: cedarHillSafetyProfile,
    intermediateAccessPoints: [
      { ...aztecRiverside, id: 'animas-river-cedar-hill-penny-lane-bailout-riverside', mileFromStart: 12.5, segmentKind: 'transition', note: 'Named Aztec public landing and bailout; confirm current water entry, parking and park hours.' },
    ],
    sourceLinks: [farmingtonGuide, aztecGuide, stateParksGuide, cedarHillThresholdSource, { label: 'USGS Penny Lane gauge', url: pennyLaneGauge.detailUrl, provider: 'usgs' }],
    statusText: 'Before launching, check direct USGS 09364200 at Penny Lane, trend, weather, sediment and access notices. This is a long trip; scout and portage both named diversions and confirm the Riverside Park bailout is open.',
    logistics: {
      distanceLabel: 'About 19.8 river miles by Aztec guide mile markers', estimatedPaddleTime: 'Plan 7–10 daylight hours, including diversion scouting and any portage.',
      shuttle: 'Stage at Penny Lane landing and shuttle to the signed Cedar Hill County Boat Ramp. Confirm both sites are open and use the published on-water entries.',
      permits: 'Follow county and city landing rules, New Mexico boating law and posted notices. Do not enter from private banks.',
      camping: 'The Aztec guide lists Animas 8 on BLM land at guide mile 33.7, about 6.8 river miles below Cedar Hill. Verify current BLM availability, camping and fire rules before relying on this primitive site; do not light fires. It is not a balanced midpoint for this route.',
      campingClassification: 'on_route_campsite', summary: 'A long day trip with a named mid-route public bailout and a listed BLM primitive campsite.',
      accessCaveats: ['Use only the signed Cedar Hill County Boat Ramp, Aztec Riverside Park and Penny Lane public water-entry edges.', 'Riverside Park is about 12.5 river miles below Cedar Hill and is the named bailout; confirm its current access and parking before launch.', 'Scout the Animas Ditch and Farmers Ditch structures; respect private banks and posted access boundaries.'],
      watchFor: ['Exposed rebar at Animas Ditch near mile 28.6', 'Farmers Ditch near mile 34.6; scrapey below 1,000 cfs', 'Long distance, cold water, rising flow and limited exits'],
    },
    evidenceNotes: [
      { label: 'Public access and distance', value: 'Cedar Hill (guide mile 26.9) to Penny Lane (mile 46.7): about 19.8 miles', note: 'Aztec provides coordinates and cumulative river-mile markers for both water-entry access points; Riverside Park is a mapped intermediate landing at mile 39.4.', sourceUrl: aztecGuide.url },
      { label: 'Flow scoring cue', value: '700 cfs community planning floor; 900 cfs observed trip reference', note: 'American Whitewater describes a Class I–II Cedar Hill–Farmington reach and a trip run from 900 to 700 cfs. USGS 09364200 is a direct gauge at Penny Lane; confirm live trend and do not treat the threshold as a guarantee.', sourceUrl: cedarHillThresholdSource.url },
      { label: 'Camping and hazards', value: 'BLM Animas 8 campsite; two diversion hazards', note: 'Aztec lists Animas 8 on BLM land and identifies exposed rebar at Animas Ditch and low-water scraping at Farmers Ditch.', sourceUrl: aztecGuide.url },
      { label: 'Route overlap review', value: 'Longer access-pair option with Riverside Park bailout', note: 'This route contains the Cedar Hill–Riverside segment and continues to the independently mapped Penny Lane landing; it is presented as a longer trip choice, not separate new corridor mileage.', sourceUrl: farmingtonGuide.url },
    ],
  }),
  makeRoute({
    id: 'animas-river-cedar-hill-animas-park',
    reach: 'Cedar Hill 550 Bridge County Boat Ramp to Animas Park landing',
    putIn: cedarHillRamp,
    takeOut: animasPark,
    miles: 24.7,
    summary: 'An approximately 24.7-mile Class I–II Animas trip from Cedar Hill to the Animas Park landing, with Riverside Park and Penny Lane as documented intermediate bailouts.',
    time: 'Plan 9–12 hours in daylight; many paddlers should split or shorten this trip',
    note: 'The Aztec guide places the Cedar Hill ramp at river mile 26.9 and Animas Park at 51.6. Use the public landing at Animas Park and confirm the marked access and park rules.',
    watch: ['Long distance with limited convenient exits', 'Animas Ditch exposed rebar and Farmers Ditch low-water scrape', 'Urban landing and bridge approaches near Farmington'],
    gaugeSource: farmingtonGauge,
    profile: cedarHillProfile,
    safetyProfile: cedarHillSafetyProfile,
    intermediateAccessPoints: [
      { ...aztecRiverside, id: 'animas-river-cedar-hill-animas-park-bailout-riverside', mileFromStart: 12.5, segmentKind: 'transition', note: 'Named Aztec public landing and bailout; confirm current water entry, parking and park hours.' },
      { ...pennyLane, id: 'animas-river-cedar-hill-animas-park-bailout-penny-lane', mileFromStart: 19.8, segmentKind: 'transition', note: 'Named public trailer ramp and bailout; inspect the diversion and confirm current ramp access.' },
    ],
    sourceLinks: [farmingtonGuide, aztecGuide, stateParksGuide, cedarHillThresholdSource, { label: 'USGS Animas River at Farmington gauge', url: farmingtonGauge.detailUrl, provider: 'usgs' }],
    statusText: 'Check direct USGS 09364500 at Farmington, its trend, weather, sediment and current landing notices. This is an exceptionally long day; confirm daylight, use Riverside Park or Penny Lane as bailouts, and portage both diversions when uncertain.',
    logistics: {
      distanceLabel: 'About 24.7 river miles from Aztec guide river-mile markers', estimatedPaddleTime: 'Plan 9–12 daylight hours; many paddlers should split or shorten the trip.',
      shuttle: 'Stage at Animas Park landing and shuttle to Cedar Hill County Boat Ramp. Confirm public parking and the Animas Park water-entry before departure.',
      permits: 'Follow county and city landing rules, New Mexico boating law and posted notices. Do not enter from private banks.',
      camping: 'The Aztec guide lists Animas 8 on BLM land at guide mile 33.7, about 6.8 river miles below Cedar Hill. Verify current BLM availability, camping and fire rules; do not light fires. It is not a balanced midpoint for this exceptionally long route.',
      campingClassification: 'on_route_campsite', summary: 'An exceptionally long access-pair option with two mapped public bailouts and a listed BLM primitive campsite.',
      accessCaveats: ['Riverside Park and Penny Lane are named intermediate bailouts, not guaranteed emergency exits; verify both remain open and usable.', 'Use only signed public launch and takeout edges; respect private banks and posted park hours.', 'A 24.7-mile moving-water day can exceed available daylight; shorten at either named bailout when pace, flow or conditions warrant.'],
      watchFor: ['Animas Ditch exposed rebar and Farmers Ditch low-water scrape', 'Cold water, fast rises, strainers and bridge approaches', 'Long distance, limited roadside assistance and reduced daylight'],
    },
    evidenceNotes: [
      { label: 'Public access and distance', value: 'Cedar Hill (guide mile 26.9) to Animas Park (mile 51.6): about 24.7 miles', note: 'Aztec publishes the river-mile markers and landing coordinates; Riverside Park at mile 39.4 and Penny Lane at mile 46.7 are named intermediate access points.', sourceUrl: aztecGuide.url },
      { label: 'Flow scoring cue', value: '700 cfs community planning floor; 900 cfs observed trip reference', note: 'American Whitewater describes a Class I–II Cedar Hill–Farmington reach and a trip run from 900 to 700 cfs. USGS 09364500 is direct telemetry at Farmington near the route end; verify the live trend and treat the threshold only as a planning cue.', sourceUrl: cedarHillThresholdSource.url },
      { label: 'Camping and hazards', value: 'BLM Animas 8 campsite; two diversion hazards', note: 'Aztec lists Animas 8 on BLM land and identifies exposed rebar at Animas Ditch and low-water scraping at Farmers Ditch.', sourceUrl: aztecGuide.url },
      { label: 'Route overlap review', value: 'Longer access-pair option with Riverside Park and Penny Lane bailouts', note: 'The route combines documented shorter access pairs and ends at the independently mapped Animas Park landing; it is offered as a long trip choice and adds no distinct corridor mileage.', sourceUrl: farmingtonGuide.url },
    ],
  }),
  makeRoute({
    id: 'animas-river-cedar-hill-boyd-park',
    reach: 'Cedar Hill 550 Bridge County Boat Ramp to Boyd Park landing',
    putIn: cedarHillRamp,
    takeOut: boydPark,
    miles: 28.1,
    summary: 'The full American Whitewater Class I–II Cedar Hill–Farmington run to Boyd Park, about 28 miles with three named public bailouts along the access chain.',
    time: 'Plan 10–13 daylight hours; shorten at an intermediate landing if your pace, flow or conditions require it',
    note: 'The Aztec guide marks Cedar Hill at river mile 26.9 and Boyd Park at 55.0; American Whitewater lists the broader Cedar Hill–Farmington City Park run at 28.4 miles. Confirm the Boyd Park water entry and vehicle access.',
    watch: ['Full-day distance and daylight exposure', 'Animas Ditch exposed rebar and Farmers Ditch low-water scrape', 'Changing debris, cold water, urban bridges and private banks'],
    gaugeSource: farmingtonGauge,
    profile: cedarHillProfile,
    safetyProfile: cedarHillSafetyProfile,
    intermediateAccessPoints: [
      { ...aztecRiverside, id: 'animas-river-cedar-hill-boyd-park-bailout-riverside', mileFromStart: 12.5, segmentKind: 'transition', note: 'Named Aztec public landing and bailout; confirm current water entry, parking and park hours.' },
      { ...pennyLane, id: 'animas-river-cedar-hill-boyd-park-bailout-penny-lane', mileFromStart: 19.8, segmentKind: 'transition', note: 'Named public trailer ramp and bailout; inspect the diversion and confirm current ramp access.' },
      { ...animasPark, id: 'animas-river-cedar-hill-boyd-park-bailout-animas-park', mileFromStart: 24.7, segmentKind: 'transition', note: 'Named public park landing and bailout; confirm current water entry, parking and park hours.' },
    ],
    sourceLinks: [farmingtonGuide, aztecGuide, stateParksGuide, cedarHillThresholdSource, { label: 'USGS Animas River at Farmington gauge', url: farmingtonGauge.detailUrl, provider: 'usgs' }],
    statusText: 'Check direct USGS 09364500 at Farmington, its trend, weather, sediment and current landing notices. The 28-mile trip requires a realistic daylight or two-day plan; Riverside Park, Penny Lane and Animas Park are named bailouts, and both diversions require scouting.',
    logistics: {
      distanceLabel: 'About 28.1 river miles by Aztec guide markers; American Whitewater lists 28.4 miles', estimatedPaddleTime: 'Plan 10–13 daylight hours and a very early start; take out at an intermediate public landing if pace, flow, daylight or conditions require it.',
      shuttle: 'Stage at Boyd Park landing and shuttle to Cedar Hill County Boat Ramp. Verify both vehicle access and water-entry locations before departure.',
      permits: 'Follow county and city landing rules, New Mexico boating law and posted notices. Do not enter from private banks.',
      camping: 'The Aztec guide lists Animas 8 on BLM land at guide mile 33.7, about 6.8 river miles below Cedar Hill. Verify current BLM availability, primitive-camping and fire rules; do not light fires. This is not a balanced midpoint for a two-day itinerary.',
      campingClassification: 'on_route_campsite', summary: 'A documented long corridor trip with three public bailouts and one listed BLM primitive campsite.',
      accessCaveats: ['Use only signed public water-entry edges at Cedar Hill, Aztec Riverside Park, Penny Lane, Animas Park and Boyd Park.', 'The three intermediate landings are route shortening options; verify their current access and parking before launch.', 'This 28-mile route can exceed daylight for some craft and parties. Split the trip or take out early if pace, weather, flow or fatigue changes.'],
      watchFor: ['Exposed rebar at Animas Ditch near mile 28.6', 'Farmers Ditch near mile 34.6; scrapey below 1,000 cfs', 'Long distance, cold water, fast rises, strainers and private-bank boundaries'],
    },
    evidenceNotes: [
      { label: 'Public access and distance', value: 'Cedar Hill (guide mile 26.9) to Boyd Park (mile 55.0): about 28.1 miles; American Whitewater reports 28.4 miles', note: 'Aztec publishes the public endpoint coordinates and river-mile markers; Riverside Park, Penny Lane and Animas Park are named intermediate landings. American Whitewater independently describes this as the Cedar Hill–Farmington City Park Class I–II run.', sourceUrl: aztecGuide.url },
      { label: 'Flow scoring cue', value: '700 cfs community planning floor; 900 cfs observed trip reference', note: 'American Whitewater reports the Cedar Hill–Farmington reach run from 900 down to 700 cfs. USGS 09364500 at Farmington provides direct same-river telemetry near the downstream route end; this is not a safety guarantee.', sourceUrl: cedarHillThresholdSource.url },
      { label: 'Camping and hazards', value: 'BLM Animas 8 campsite; Animas Ditch and Farmers Ditch hazards', note: 'Aztec lists the BLM site and the exposed-rebar and low-water diversion hazards. Follow current BLM rules and scout/portage.', sourceUrl: aztecGuide.url },
      { label: 'Route overlap review', value: 'Full Cedar Hill–Farmington public access-chain option', note: 'The longer route includes the Cedar Hill–Riverside trip and all the public access pairs to Boyd Park. It matches American Whitewater’s documented 28.4-mile corridor and preserves three intermediate bailouts as a distinct full-trip choice.', sourceUrl: cedarHillThresholdSource.url },
    ],
  }),
  makeRoute({ id: 'animas-river-aztec-riverside-penny-lane', reach: 'Aztec Riverside Park to Penny Lane landing', putIn: aztecRiverside, takeOut: pennyLane, miles: 7.3, summary: 'A public Aztec-to-Penny Lane Animas paddle trail with moving water, a named ramp and a documented 600 cfs rafting floor.', time: 'Allow 3–5 hours with diversion scouting and shuttle margin', note: 'Aztec identifies Riverside Park as a public carry or trailer access and Penny Lane as an easy trailer-friendly ramp. Confirm the river edge and parking before unloading.', watch: ['Cold water and changing release levels', 'Penny Lane diversion and downstream features', 'Strainers, fences and bridge clearance'] }),
  makeRoute({ id: 'animas-river-penny-lane-animas-park', reach: 'Penny Lane landing to Animas Park landing', putIn: pennyLane, takeOut: animasPark, miles: 5.5, summary: 'A Farmington paddle-trail reach from the Penny Lane ramp through the Animas Park corridor.', time: 'Allow 2–4 hours with feature scouting and shuttle margin', note: 'Farmington publishes the Penny Lane-to-Animas Park distance; the Aztec guide places the Animas Park landing in the public park corridor. Scout the modified Penny Lane feature before proceeding.', watch: ['Penny Lane hydraulic and bridge approaches', 'Urban current, strainers and fishing traffic', 'Animas Park landing and park hours'] }),
  makeRoute({ id: 'animas-river-animas-park-boyd', reach: 'Animas Park landing to Boyd Park landing', putIn: animasPark, takeOut: boydPark, miles: 5.5, summary: 'A city-access Animas float from Animas Park to the documented Boyd Park trailer landing in Farmington.', time: 'Allow 2–4 hours with bridge and current scouting', note: 'Farmington publishes the Animas Park-to-Boyd distance, and the Aztec guide identifies Boyd Park as a possible trailer access. Use the mapped park water-entry edges and confirm hours before staging.', watch: ['Urban bridges and moving current', 'Strainers and submerged objects', 'Boyd Park parking, landing and park hours'] }),
  makeRoute({ id: 'animas-river-aztec-riverside-animas-park', reach: 'Aztec Riverside Park to Animas Park landing', putIn: aztecRiverside, takeOut: animasPark, miles: 12.8, summary: 'A longer Animas paddle trail combining the Riverside Park to Penny Lane and Penny Lane to Animas Park sections.', time: 'Allow 5–8 hours with diversion scouting and shuttle margin', note: 'Use Penny Lane as the documented intermediate bailout and scout the modified feature before continuing downstream. Confirm both city landing conditions and parking.' , watch: ['Penny Lane diversion and bridge approaches', 'Cold water, strainers and fishing traffic', 'Animas Park landing and park hours'] }),
  makeRoute({ id: 'animas-river-aztec-riverside-boyd', reach: 'Aztec Riverside Park to Boyd Park landing', putIn: aztecRiverside, takeOut: boydPark, miles: 18.3, summary: 'The full documented Aztec-to-Farmington Animas paddle trail from Riverside Park to Boyd Park.', time: 'Allow 7–10 hours with scouting, diversion portages and shuttle margin', note: 'Use Penny Lane and Animas Park as named intermediate bailouts. Confirm the long shuttle, park hours and every diversion or fence before launch.', watch: ['Penny Lane and downstream diversion structures', 'Long urban reach with limited assistance', 'Boyd Park parking, landing and park hours'] }),
  makeRoute({ id: 'animas-river-penny-lane-boyd', reach: 'Penny Lane landing to Boyd Park landing', putIn: pennyLane, takeOut: boydPark, miles: 11.0, summary: 'A combined Farmington Animas reach from Penny Lane through Animas Park to Boyd Park.', time: 'Allow 4–6 hours with bridge, current and landing scouting', note: 'Animas Park is the documented intermediate bailout. Scout the Penny Lane feature, downstream structures and the Boyd Park landing before committing.', watch: ['Penny Lane hydraulic and bridge approaches', 'Urban current, strainers and submerged objects', 'Boyd Park parking, landing and park hours'] }),
];
