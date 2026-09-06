// Maine's first statewide expansion batch. Routes are intentionally planning-only
// until Maine-specific recreational threshold ladders are independently verified.
import type { River, RiverConsolidation, RouteSafetyProfile, SourceProvider } from '../../lib/types';

export type MaineRouteSpec = {
  id: string;
  name: string;
  riverId: string;
  reach: string;
  region: string;
  distance: number;
  time: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  routeType?: 'recreational' | 'whitewater';
  risk: RouteSafetyProfile['riskLevel'];
  gauge: string;
  gaugeName: string;
  gaugeKind: 'direct' | 'proxy';
  gaugeMetric?: 'discharge_cfs' | 'gage_height_ft';
  putIn: { name: string; latitude: number; longitude: number };
  takeOut: { name: string; latitude: number; longitude: number };
  accessPoints?: Array<{
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    mileFromStart: number;
    note: string;
  }>;
  summary: string;
  status: string;
  seasonNotes: string;
  difficultyNotes: string;
  hazards: RouteSafetyProfile['hazards'];
  safety: string[];
  camping: string;
  campingClassification: 'none' | 'nearby_basecamp' | 'endpoint_campground' | 'on_route_campsite';
  shuttle: string;
  permits: string;
  accessCaveats: string[];
  watchFor: string[];
  routeUrl: string;
  routeSourceLabel: string;
  routeSourceProvider: SourceProvider;
  thresholdUrl: string;
  thresholdLabel: string;
  thresholdProvider: SourceProvider;
  evidence: string;
  imageUrl: string;
  imageLabel: string;
  imageCredit: string;
  imageTaken: string;
  consolidation?: RiverConsolidation;
};

export const boatingSitesUrl = 'https://www.maine.gov/dacf/parks/water_activities/boating/public_boat_launches/boat_sites.shtml';
const publicationsUrl = 'https://www1.maine.gov/dacf/parks/publications_maps/index.shtml';
export const allagashGuideUrl = 'https://www.maine.gov/dacf/parksearch/PropertyGuides/PDF_GUIDE/aww-guide.pdf?20239131=';
const allagashRulesUrl = 'https://www.maine.gov/dacf/parks/park_passes_fees_rules/aww_rules.shtml';
const allagashConditionsUrl = 'https://www.maine.gov/dacf/parks/water_activities/aww-river-conditions.shtml';
const penobscotGuideUrl = 'https://www.maine.gov/dacf/parksearch/PropertyGuides/PDF_GUIDE/prc-seboomook-guide.pdf';
const usgsUrl = (siteId: string) => `https://waterdata.usgs.gov/monitoring-location/USGS-${siteId}/`;
const usgsCurrentUrl = (siteId: string) => `https://waterdata.usgs.gov/nwis/uv/?referred_module=sw&site_no=${siteId}`;

export function buildMaineRoute(spec: MaineRouteSpec): River {
  const slug = spec.id;
  const accessPoints = spec.accessPoints ?? [
    { id: `${slug}-put-in`, ...spec.putIn, mileFromStart: 0, note: 'Named public or managed access anchor; confirm the carry, parking, and shoreline condition on arrival.' },
    { id: `${slug}-take-out`, ...spec.takeOut, mileFromStart: spec.distance, note: 'Named public or managed access anchor; confirm the landing and vehicle staging before launch.' },
  ];
  const gaugeMetric = spec.gaugeMetric ?? 'discharge_cfs';
  const gaugeUrl = usgsUrl(spec.gauge);
  const currentUrl = usgsCurrentUrl(spec.gauge);
  const sourceLinks = [
    { label: spec.routeSourceLabel, url: spec.routeUrl, provider: spec.routeSourceProvider },
    { label: 'Maine public boat-launch inventory', url: boatingSitesUrl, provider: 'local' as const },
    { label: `USGS ${spec.gauge} monitoring location`, url: gaugeUrl, provider: 'usgs' as const },
    { label: `USGS ${spec.gauge} current conditions`, url: currentUrl, provider: 'usgs' as const },
    { label: 'Maine public-land publications and maps', url: publicationsUrl, provider: 'local' as const },
    { label: 'Approved route-context image', url: spec.imageUrl, provider: 'manual' as const },
  ];

  return {
    id: spec.id,
    riverId: spec.riverId,
    slug,
    name: spec.name,
    reach: spec.reach,
    aliases: [`${spec.name} ${spec.reach}`, `${spec.name} Maine paddle`],
    state: 'Maine',
    region: spec.region,
    routeType: spec.routeType ?? 'recreational',
    summary: spec.summary,
    statusText: spec.status,
    latitude: spec.putIn.latitude,
    longitude: spec.putIn.longitude,
    safetyProfile: {
      riskLevel: spec.risk,
      hazards: spec.hazards,
      safetyNotes: spec.safety,
      reviewStatus: 'reviewed',
    },
    gaugeSource: {
      id: `usgs-${spec.gauge}`,
      provider: 'usgs',
      siteId: spec.gauge,
      metric: gaugeMetric,
      unit: gaugeMetric === 'discharge_cfs' ? 'cfs' : 'ft',
      kind: spec.gaugeKind,
      siteName: spec.gaugeName,
      detailUrl: gaugeUrl,
      hydrographUrl: currentUrl,
    },
    profile: {
      thresholdModel: 'minimum-only',
      thresholdSource: { label: spec.thresholdLabel, url: spec.thresholdUrl, provider: spec.thresholdProvider },
      thresholdSourceStrength: 'mixed',
      rainfallSensitivity: 'high',
      windSensitivity: 1,
      seasonMonths: [5, 6, 7, 8, 9, 10],
      seasonNotes: spec.seasonNotes,
      difficulty: spec.difficulty,
      difficultyNotes: spec.difficultyNotes,
      confidenceNotes: `${spec.evidence} The route remains planning-only: a live USGS station is linked as ${spec.gaugeKind === 'direct' ? 'direct corridor telemetry' : 'same-river proxy context'}, but no numeric safe-flow threshold is transferred by inference.`,
    },
    putIn: spec.putIn,
    takeOut: spec.takeOut,
    accessPoints: accessPoints.map((point) => ({ ...point, segmentKind: 'transition' as const })),
    logistics: {
      distanceLabel: `About ${spec.distance} river miles`,
      estimatedPaddleTime: spec.time,
      shuttle: spec.shuttle,
      permits: spec.permits,
      camping: spec.camping,
      campingClassification: spec.campingClassification,
      summary: spec.summary,
      accessCaveats: spec.accessCaveats,
      watchFor: spec.watchFor,
    },
    evidenceNotes: [
      { label: 'Named route and endpoints', value: `${spec.reach}; about ${spec.distance} miles`, note: spec.evidence, sourceUrl: spec.routeUrl },
      { label: 'Live gauge posture', value: `USGS ${spec.gauge}, ${spec.gaugeName}`, note: spec.gaugeKind === 'direct' ? 'Direct corridor telemetry is available for planning context; inspect local conditions and do not treat the station as a safety certification.' : 'This is a clearly labeled same-river proxy; local tributaries, releases, ice effects, and reach-specific hydraulics can differ materially.', sourceUrl: currentUrl },
      { label: 'Access controls', value: 'Named public, state, municipal, or managed access only', note: 'Maine launch records provide the access inventory; exact carry paths, parking, fees, closures, and shoreline condition must be rechecked before launch.', sourceUrl: boatingSitesUrl },
      { label: 'Camping classification', value: spec.campingClassification, note: spec.camping, sourceUrl: spec.routeUrl },
      { label: 'Safety posture', value: spec.risk === 'advanced' ? 'Advanced planning route' : 'Reviewed planning route', note: spec.safety.join(' ') },
      { label: 'Image decision', value: spec.imageLabel, note: `${spec.imageCredit}; ${spec.imageTaken}. The gallery caption identifies this as route, same-river, or regional context rather than claiming exact-reach photography.`, sourceUrl: spec.imageUrl },
      { label: 'Overlap decision', value: spec.consolidation ? `${spec.consolidation.role} route retained in ${spec.consolidation.group}` : 'Distinct access-to-access itinerary retained', note: spec.consolidation?.note ?? 'The endpoint pair, trip length, or operational setting is materially different from the other Maine routes in this batch.' },
    ],
    sourceLinks,
    consolidation: spec.consolidation,
    scoreEligibility: 'planning',
    scoreEligibilityReason: spec.gaugeKind === 'proxy' ? 'proxy_gauge' : undefined,
  };
}

export const allagashImage = 'https://www.maine.gov/dacf/parks/publications_maps/AWWBroc/Images/1.jpg';
const androscogginImage = 'https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/full_width/public/thumbnails/image/RiverPHOTO_web.jpg?itok=rBBzFvFf';
const maineRegionalImage = allagashImage;
const sacoImage = maineRegionalImage;
const kennebecImage = maineRegionalImage;
const presumpscotImage = maineRegionalImage;
const stCroixImage = 'https://www.fws.gov/sites/default/files/2022-06/st.%20croix%20river_keith%20ramos%20_usfws.jpg';
const aroostookImage = maineRegionalImage;

const commonRiverSafety = [
  'Wear a properly fitted PFD continuously, file a float plan, and carry communication and rescue equipment appropriate to the remoteness of the reach.',
  'Check current USGS trend, weather, water temperature, debris, ice effects, and same-day access notices. A favorable gauge number never overrides visual conditions.',
];

export const maineRoutes: River[] = [
  buildMaineRoute({
    id: 'allagash-river-churchill-dam-umsaskis', name: 'Allagash River', riverId: 'allagash-river', reach: 'Churchill Dam to Umsaskis Lake', region: 'North Maine Woods / Allagash Wilderness Waterway', distance: 9, time: 'About 5–8 hours; allow extra time for scouting and a portage', difficulty: 'hard', routeType: 'whitewater', risk: 'advanced', gauge: '01011000', gaugeName: 'Allagash River near Allagash, ME', gaugeKind: 'proxy',
    putIn: { name: 'Churchill Dam designated access', latitude: 46.53624, longitude: -69.31511 }, takeOut: { name: 'Umsaskis Lake / T13 R12 designated access', latitude: 46.76364, longitude: -69.30524 },
    summary: 'A remote 9-mile Allagash Wilderness Waterway section from Churchill Dam toward Umsaskis Lake, including the Chase Rapids portage decision and designated waterway camping.',
    status: 'Planning-only wilderness whitewater route. The AWW guide lists Churchill Dam to Umsaskis Lake as 9 miles and warns that Chase Rapids may require a paid portage. Confirm alerts, road conditions, registration, campsite status, and local water conditions before committing.',
    seasonNotes: 'The AWW guide advises against canoe trips before May 15 because ice-out may not occur until early to mid-May. Late summer can be low; fall brings cold water and shorter daylight.',
    difficultyNotes: 'Remote wilderness moving water with rapids, cold water, wood, limited rescue access, and a mandatory portage/scouting decision around the most difficult section of Chase Rapids.',
    hazards: ['whitewater', 'portage', 'cold_water', 'remote', 'fast_rise', 'strainers', 'access_uncertain', 'wildlife'], safety: [...commonRiverSafety, 'Do not assume Chase Rapids is runnable: the AWW guide identifies portage service and requires conservative scouting. Keep the group and gear together at the portage.', 'Logging trucks have right of way on the private roads into the Waterway; expect limited cell coverage and delayed emergency response.'],
    camping: 'Camp only at authorized AWW campsites. Sites have fireplaces, tables, tarp poles, and outhouses; carry out waste and confirm closures.', campingClassification: 'on_route_campsite', shuttle: 'Arrange a remote shuttle or outfitter before launch. North Maine Woods roads are private logging roads with checkpoints, fees, changing conditions, and truck traffic.', permits: 'Register with North Maine Woods, an AWW ranger station, or a ranger; pay current AWW/North Maine Woods fees; follow AWW watercraft, camping, PFD, fire, and carry-in/carry-out rules.', accessCaveats: ['Churchill Dam is a designated AWW access anchor in the state guide.', 'The T13 R12/Umsaskis access is a managed waterway access area, not a casual roadside pull-off; confirm the exact landing and parking location with the current AWW packet.', 'Do not use private logging-road pull-offs or undocumented shoreline exits.'], watchFor: ['Chase Rapids and other named rapids', 'cold water, rising water, strainers, and wet-foot portages', 'road checkpoints, logging traffic, fires, bears, and no-cell-service rescue delay'], routeUrl: allagashGuideUrl, routeSourceLabel: 'Maine DACF Allagash guide and map', routeSourceProvider: 'local', thresholdUrl: allagashConditionsUrl, thresholdLabel: 'AWW current conditions and alerts; no numeric recreational cutoff transferred', thresholdProvider: 'local', evidence: 'Maine DACF identifies this exact 9-mile segment, designated access areas, authorized campsites, Chase Rapids portage service, registration, road, and emergency guidance.', imageUrl: allagashImage, imageLabel: 'Lower Allagash River regional context photograph', imageCredit: 'Maine DACF Natural History Guide', imageTaken: 'Official state image; exact reach not claimed',
  }),
  buildMaineRoute({
    id: 'allagash-river-michaud-farm-allagash-falls', name: 'Allagash River', riverId: 'allagash-river', reach: 'Michaud Farm to Allagash Falls', region: 'North Maine Woods / Allagash Wilderness Waterway', distance: 3, time: 'About 2–4 hours including the falls portage/scout', difficulty: 'hard', routeType: 'whitewater', risk: 'advanced', gauge: '01011000', gaugeName: 'Allagash River near Allagash, ME', gaugeKind: 'direct',
    putIn: { name: 'Michaud Farm designated access', latitude: 46.95184, longitude: -69.19626 }, takeOut: { name: 'Allagash Falls access / portage area', latitude: 46.95452, longitude: -69.17923 },
    summary: 'A short but consequential 3-mile lower-Allagash section from Michaud Farm to the Allagash Falls area, retained as its own trip because the falls create a non-negotiable operational boundary.',
    status: 'Planning-only. Treat Allagash Falls as a mandatory portage and end boundary; do not continue downstream over the falls. Confirm current AWW alerts, portage condition, access, and water level before launch.',
    seasonNotes: 'May 15 through October is the practical window after ice-out. Cold water, spring rise, late-summer low water, and autumn daylight loss materially change the trip.',
    difficultyNotes: 'Advanced because of the falls boundary, remote access, cold water, rapids, and limited rescue options even though the mileage is short.',
    hazards: ['waterfall', 'mandatory_takeout', 'whitewater', 'portage', 'cold_water', 'remote', 'strainers', 'access_uncertain', 'wildlife'], safety: [...commonRiverSafety, 'The falls are not a paddle-through feature. Land above the falls at the designated area, secure the boat, and do not scout or launch below the falls as part of this route.', 'Carry footwear and rope suitable for a wet, uneven portage; never separate paddler and boat in the current.'],
    camping: 'Authorized AWW campsites only; no camping at the falls landing or an informal riverbank.', campingClassification: 'on_route_campsite', shuttle: 'Remote one-way shuttle between North Maine Woods road accesses; arrange retrieval before launch and allow for logging traffic.', permits: 'AWW registration and current fees; follow North Maine Woods road, parking, camping, PFD, fire, and carry-out rules.', accessCaveats: ['Michaud Farm and the Allagash Falls area are identified managed access anchors in the AWW guide and boat-site inventory.', 'The falls landing is a mandatory boundary, not a substitute for a downstream take-out.'], watchFor: ['Allagash Falls, rapids, rocks, and steep or slippery banks', 'cold water and fast spring rise', 'remote road access, wildlife, and delayed rescue'], routeUrl: allagashGuideUrl, routeSourceLabel: 'Maine DACF Allagash guide and map', routeSourceProvider: 'local', thresholdUrl: allagashConditionsUrl, thresholdLabel: 'AWW current conditions and alerts; no numeric recreational cutoff transferred', thresholdProvider: 'local', evidence: 'The official AWW mileage chart lists Michaud Farm to Allagash Falls as 3 miles; DACF materials identify the managed access areas, falls boundary, authorized camping, and wilderness logistics.', imageUrl: allagashImage, imageLabel: 'Allagash River same-river context photograph', imageCredit: 'Maine DACF Natural History Guide', imageTaken: 'Official state image; exact reach not claimed',
  }),
  buildMaineRoute({
    id: 'allagash-river-allagash-falls-twin-brook', name: 'Allagash River', riverId: 'allagash-river', reach: 'Allagash Falls to Twin Brook / Allagash Village', region: 'North Maine Woods / Allagash Wilderness Waterway', distance: 14, time: 'Full day; allow extra time for rapids, scouting, and shuttle logistics', difficulty: 'hard', routeType: 'whitewater', risk: 'advanced', gauge: '01011000', gaugeName: 'Allagash River near Allagash, ME', gaugeKind: 'direct',
    putIn: { name: 'Allagash Falls access / downstream boundary', latitude: 46.95452, longitude: -69.17923 }, takeOut: { name: 'Twin Brook / Allagash Village public access', latitude: 47.07040, longitude: -69.07670 },
    summary: 'A 14-mile lower-Allagash planning itinerary from the Allagash Falls area toward the Twin Brook access at Allagash Village, covering the downstream wilderness-to-community transition.',
    status: 'Planning-only. The AWW mileage chart lists 8 miles from Allagash Falls to Twin Brook and 6 miles from Twin Brook to Allagash Village; this card combines the contiguous downstream access chain and uses Twin Brook/Village as the operational boundary.',
    seasonNotes: 'Use the AWW May 15–October planning window. Spring water can be powerful; late summer can be shallow; autumn cold and daylight are serious constraints.',
    difficultyNotes: 'Remote moving-water route with named rapids, cold water, strainers, wildlife, and a long shuttle; not a casual float despite the downstream gradient.',
    hazards: ['whitewater', 'cold_water', 'remote', 'fast_rise', 'strainers', 'mandatory_takeout', 'access_uncertain', 'wildlife'], safety: [...commonRiverSafety, 'Scout every rapid that is unfamiliar or out of character. Keep a conservative turnaround plan because road and rescue access are limited.', 'End at the named Twin Brook/Village access; do not improvise a landing on private frontage or continue into unplanned downstream water.'],
    camping: 'Authorized AWW campsites only; a same-day trip may be possible for strong groups, but overnight travel requires campsite planning and registration.', campingClassification: 'on_route_campsite', shuttle: 'Arrange a one-way shuttle from the Allagash Falls access to Twin Brook/Village before launch; confirm North Maine Woods road condition and vehicle staging.', permits: 'AWW/North Maine Woods registration and fees; current watercraft, camping, fire, PFD, and carry-out rules apply.', accessCaveats: ['Allagash Falls, Twin Brook, and Allagash Village are managed or listed access anchors in DACF material.', 'The 14-mile card is a deliberate consolidation of two adjacent official mileage-chart legs; it avoids creating a duplicate short card for the same operational trip.'], watchFor: ['rapids, shallow rocks, wood, and cold water', 'remote rescue, wildlife, and no-cell-service sections', 'mandatory end boundary and changing access/road conditions'], routeUrl: allagashGuideUrl, routeSourceLabel: 'Maine DACF Allagash guide and map', routeSourceProvider: 'local', thresholdUrl: allagashConditionsUrl, thresholdLabel: 'AWW current conditions and alerts; no numeric recreational cutoff transferred', thresholdProvider: 'local', evidence: 'The official AWW mileage chart separately lists Allagash Falls to Twin Brook (8 miles) and Twin Brook to Allagash Village (6 miles); the combined card preserves the complete access-to-access day value without duplicate nesting.', imageUrl: allagashImage, imageLabel: 'Allagash River same-river context photograph', imageCredit: 'Maine DACF Natural History Guide', imageTaken: 'Official state image; exact reach not claimed',
  }),
  buildMaineRoute({
    id: 'saco-river-fryeburg-route-302-route-160', name: 'Saco River', riverId: 'saco-river', reach: 'Route 302 crossing to Route 160 crossing', region: 'Western Maine / Fryeburg and Denmark', distance: 4, time: 'About 2–4 hours', difficulty: 'moderate', risk: 'caution', gauge: '01066000', gaugeName: 'Saco River at Cornish, ME', gaugeKind: 'proxy',
    putIn: { name: 'Route 302 public river crossing / Fryeburg', latitude: 44.06460, longitude: -70.94790 }, takeOut: { name: 'Route 160 public river crossing / Denmark', latitude: 44.03800, longitude: -70.98170 },
    summary: 'A short public Saco River section through the Major Gregory Sanborn Wildlife Management Area, using the Route 302 and Route 160 access sequence described by Maine IFW.',
    status: 'Planning-only. Maine IFW confirms the public launch and take-out sequence; use the Cornish gauge only as downstream watershed context and do not transfer a numeric runnable cutoff.',
    seasonNotes: 'Late spring through early fall is the practical window. Cold water, thunderstorms, wood, and low-water shallows remain possible.', difficultyNotes: 'Moderate moving water with current, bends, shallows, possible wood, and an access/shuttle requirement; the exact channel should be visually checked.',
    hazards: ['low_water', 'fast_rise', 'strainers', 'cold_water', 'private_banks', 'access_uncertain', 'wildlife'], safety: [...commonRiverSafety, 'Maine IFW identifies the route as popular for canoeing and rafting; that recreation context does not remove current, wood, cold-water, or private-property hazards.', 'Use only the documented crossings and public WMA access; do not land in fields, yards, or unmarked frontage.'],
    camping: 'The Sanborn WMA identifies a primitive Walker’s Island camping area accessible from the Saco; confirm current rules and whether the campsite is appropriate for this short route.', campingClassification: 'on_route_campsite', shuttle: 'Stage the Route 160 vehicle before launching at Route 302; verify parking and crossing visibility because these are not full-service paddling parks.', permits: 'Follow Maine boating/PFD rules, WMA parking and hunting-season controls, posted access rules, and current local notices.', accessCaveats: ['Maine IFW names both the Route 302 launch and Route 160 take-out in its WMA description.', 'Route crossings are public access anchors, not permission to use adjacent private banks.'], watchFor: ['current, shallow gravel, wood, and cold water', 'private frontage and hunting/WMA activity', 'storm rise and safe highway-side staging'], routeUrl: 'https://www.maine.gov/ifw/blogs/mdifw-blog/major-gregory-sanborn-wildlife-management-area-regional-wildlife-biologist-cory-stearns', routeSourceLabel: 'Maine IFW Sanborn Wildlife Management Area access guidance', routeSourceProvider: 'local', thresholdUrl: usgsCurrentUrl('01066000'), thresholdLabel: 'USGS Saco River at Cornish proxy context; no route-specific recreational cutoff transferred', thresholdProvider: 'usgs', evidence: 'Maine IFW names the Route 302 launch, Route 160 take-out, and Walker’s Island primitive camping context; DACF’s launch inventory independently lists the Fryeburg access coordinates.', imageUrl: sacoImage, imageLabel: 'Maine river regional context photograph', imageCredit: 'Maine Department of Agriculture, Conservation and Forestry', imageTaken: 'Official Maine state image; exact reach not claimed',
  }),
  buildMaineRoute({
    id: 'saco-river-route-160-brownfield', name: 'Saco River', riverId: 'saco-river', reach: 'Route 160 crossing to Brownfield public carry-in', region: 'Western Maine / Denmark and Brownfield', distance: 10, time: 'About 4–7 hours', difficulty: 'moderate', risk: 'caution', gauge: '01066000', gaugeName: 'Saco River at Cornish, ME', gaugeKind: 'proxy',
    putIn: { name: 'Route 160 public river crossing / Denmark', latitude: 44.03800, longitude: -70.98170 }, takeOut: { name: 'Brownfield DACF public carry-in', latitude: 43.95550, longitude: -70.88260 },
    summary: 'A longer Saco River access-to-access itinerary from the Route 160 crossing to the Brownfield DACF carry-in, extending the Sanborn WMA corridor toward the lower Saco access network.',
    status: 'Planning-only. The named public endpoints are in Maine’s launch inventory, but the route needs a same-day visual inspection for wood, shallow water, and private-bank constraints. Cornish USGS data is proxy context for this upstream reach.',
    seasonNotes: 'Late spring through early fall; avoid high or rapidly rising water, thunderstorms, and cold-water conditions.', difficultyNotes: 'Moderate moving water and a full-day logistics commitment. Paddlers must be comfortable with current, shallow sections, wood, and limited informal exits.',
    hazards: ['low_water', 'fast_rise', 'strainers', 'cold_water', 'private_banks', 'access_uncertain', 'wildlife'], safety: [...commonRiverSafety, 'The distance and limited legal exits make an early launch and daylight margin important.', 'Use the named public access anchors and respect WMA, municipal, and private-bank boundaries throughout the reach.'],
    camping: 'Use designated nearby campgrounds or lodging; do not infer on-route camping from a carry-in launch or WMA shoreline.', campingClassification: 'nearby_basecamp', shuttle: 'Stage at Brownfield and return to the Route 160 crossing. Allow time for rural roads and verify the carry-in parking area.', permits: 'Maine boating/PFD rules and all current DACF, municipal, WMA, parking, and posted access restrictions apply.', accessCaveats: ['DACF lists both the Brownfield and Fryeburg/Route 160 access anchors.', 'No unmarked shoreline, private field, or bridge approach is treated as an alternate take-out.'], watchFor: ['shallow gravel, wood, current, and cold water', 'private frontage and changing WMA/parking controls', 'weather, daylight, and rural shuttle delays'], routeUrl: boatingSitesUrl, routeSourceLabel: 'Maine DACF public boat-launch inventory', routeSourceProvider: 'local', thresholdUrl: usgsCurrentUrl('01066000'), thresholdLabel: 'USGS Saco River at Cornish proxy context; no route-specific recreational cutoff transferred', thresholdProvider: 'usgs', evidence: 'DACF’s searchable state launch inventory lists the Route 160/Fryeburg and Brownfield Saco River accesses with coordinates; the route is kept separate from the short Route 302–Route 160 run because it is a materially longer shuttle and trip type.', imageUrl: sacoImage, imageLabel: 'Maine river regional context photograph', imageCredit: 'Maine Department of Agriculture, Conservation and Forestry', imageTaken: 'Official Maine state image; exact reach not claimed',
  }),
  buildMaineRoute({
    id: 'androscoggin-river-hanover-bethel', name: 'Androscoggin River', riverId: 'androscoggin-river', reach: 'Hanover public access to Bethel / Mahoosuc Land Trust access', region: 'Western Maine / Oxford County', distance: 14, time: 'About 5–8 hours', difficulty: 'moderate', risk: 'caution', gauge: '01054500', gaugeName: 'Androscoggin River at Rumford, ME', gaugeKind: 'proxy',
    putIn: { name: 'Hanover public access', latitude: 44.49390, longitude: -70.69420 }, takeOut: { name: 'Bethel Mahoosuc Land Trust carry-in', latitude: 44.40650, longitude: -70.86130 },
    summary: 'A 14-mile upper-Androscoggin itinerary between named public/carry-in access points in Hanover and Bethel, offering a western Maine day trip with a long shuttle.',
    status: 'Planning-only. DACF lists both public access anchors. The Rumford USGS station is downstream proxy context; no station-specific recreational band is inferred.',
    seasonNotes: 'Late spring through early fall; high water, cold water, thunderstorms, and autumn daylight loss are significant.', difficultyNotes: 'Moderate moving-water day trip with possible riffles, rocks, wood, and limited legal exits. Confirm local river character before attempting the full distance.',
    hazards: ['low_water', 'fast_rise', 'strainers', 'cold_water', 'private_banks', 'access_uncertain', 'wildlife'], safety: [...commonRiverSafety, 'Plan the full shuttle and carry margin before launch; do not rely on informal road crossings as exits.', 'Respect conservation-property, municipal, and private-bank rules at all intermediate points.'],
    camping: 'No on-route camping is assumed; use designated nearby campgrounds or a Bethel/Rumford-area basecamp.', campingClassification: 'nearby_basecamp', shuttle: 'Stage the Bethel vehicle first, then return to Hanover. Rural roads and conservation-property parking may require extra time.', permits: 'Follow Maine boating/PFD rules and all municipal, land-trust, parking, and posted access requirements.', accessCaveats: ['DACF’s launch inventory identifies both the Hanover and Bethel access anchors.', 'The access records do not authorize bank travel away from the launch; confirm carry paths and parking before launch.'], watchFor: ['wood, shallow rock, current, and cold water', 'private banks and conservation-property rules', 'long shuttle, weather, and limited early exits'], routeUrl: boatingSitesUrl, routeSourceLabel: 'Maine DACF public boat-launch inventory', routeSourceProvider: 'local', thresholdUrl: usgsCurrentUrl('01054500'), thresholdLabel: 'USGS Androscoggin River at Rumford proxy context; no route-specific recreational cutoff transferred', thresholdProvider: 'usgs', evidence: 'DACF lists named public access sites at Hanover and Bethel with coordinates; USGS 01054500 supplies continuous Androscoggin telemetry farther downstream, so the route stays planning-only.', imageUrl: androscogginImage, imageLabel: 'Androscoggin River same-river context photograph', imageCredit: 'U.S. Geological Survey', imageTaken: 'Official USGS image; exact reach not claimed',
  }),
  buildMaineRoute({
    id: 'androscoggin-river-mexico-rumford', name: 'Androscoggin River', riverId: 'androscoggin-river', reach: 'Mexico public access to Rumford public access', region: 'Western Maine / Rumford Falls corridor', distance: 6, time: 'About 3–5 hours', difficulty: 'moderate', risk: 'caution', gauge: '01054500', gaugeName: 'Androscoggin River at Rumford, ME', gaugeKind: 'direct',
    putIn: { name: 'Mexico public boat access', latitude: 44.55536, longitude: -70.54256 }, takeOut: { name: 'Rumford public access', latitude: 44.51516, longitude: -70.55952 },
    summary: 'A 6-mile Androscoggin corridor between the DACF-listed Mexico and Rumford public accesses, with direct telemetry at Rumford and a managed shuttle boundary around the mill-town corridor.',
    status: 'Planning-only. USGS 01054500 is direct corridor telemetry, but no numeric recreational cutoff is transferred. Check local flow, dam operations, wood, water temperature, and access before launch.',
    seasonNotes: 'Late spring through early fall; water temperature, high releases, storms, and low-water rocks can change the character quickly.', difficultyNotes: 'Moderate moving water near a developed river corridor. Current, structures, wood, and dam-related hazards require continuous attention.',
    hazards: ['dam', 'dam_release', 'low_water', 'fast_rise', 'strainers', 'cold_water', 'private_banks', 'access_uncertain'], safety: [...commonRiverSafety, 'Confirm the current dam and flow-operation context around Rumford Falls; never approach a dam, powerhouse, or restricted structure.', 'Use only the named Mexico and Rumford access points and leave a generous take-out margin.'],
    camping: 'No on-route camping assumed; use a designated nearby campground or Rumford-area basecamp.', campingClassification: 'nearby_basecamp', shuttle: 'Short rural shuttle between the Mexico and Rumford access points; confirm parking and vehicle security before launching.', permits: 'Maine boating/PFD requirements, municipal and utility access rules, and any current dam or river advisories apply.', accessCaveats: ['DACF lists both Mexico and Rumford public access anchors.', 'Industrial or utility shoreline is not a public landing unless explicitly signed.'], watchFor: ['Rumford Falls/dam-release context', 'current, rocks, wood, cold water, and private/industrial banks', 'take-out visibility and changing parking rules'], routeUrl: boatingSitesUrl, routeSourceLabel: 'Maine DACF public boat-launch inventory', routeSourceProvider: 'local', thresholdUrl: usgsCurrentUrl('01054500'), thresholdLabel: 'USGS Androscoggin River at Rumford direct telemetry; no route-specific recreational cutoff transferred', thresholdProvider: 'usgs', evidence: 'DACF lists Mexico and Rumford public access sites; USGS identifies 01054500 at Rumford with current discharge and gage-height data, but this pass found no authoritative numeric paddling band.', imageUrl: androscogginImage, imageLabel: 'Androscoggin River same-river context photograph', imageCredit: 'U.S. Geological Survey', imageTaken: 'Official USGS image; exact reach not claimed',
  }),
  buildMaineRoute({
    id: 'kennebec-river-skowhegan-norridgewock', name: 'Kennebec River', riverId: 'kennebec-river', reach: 'Skowhegan public access to Norridgewock public access', region: 'Central Maine / Somerset County', distance: 8, time: 'About 3–5 hours', difficulty: 'moderate', risk: 'caution', gauge: '01049265', gaugeName: 'Kennebec River at North Sidney, ME', gaugeKind: 'proxy',
    putIn: { name: 'Skowhegan Somerset Woods public access', latitude: 44.76840, longitude: -69.68150 }, takeOut: { name: 'Norridgewock public access', latitude: 44.71630, longitude: -69.78990 },
    summary: 'An 8-mile central-Kennebec access-to-access day trip from Skowhegan to Norridgewock, using two DACF-listed public access anchors and a clearly labeled downstream gauge proxy.',
    status: 'Planning-only. The Kennebec is regulated and dam-influenced; use North Sidney USGS data as broad watershed context only and confirm releases, current, structures, and take-out conditions locally.',
    seasonNotes: 'Late spring through early fall. Regulated releases, storms, cold water, and low-water shoals can all control the decision.', difficultyNotes: 'Moderate moving water with potential current, structures, submerged hazards, and developed/industrial banks; do not approach hydroelectric facilities.',
    hazards: ['dam', 'dam_release', 'fast_rise', 'low_water', 'strainers', 'cold_water', 'private_banks', 'access_uncertain'], safety: [...commonRiverSafety, 'Check current hydroelectric-release information and keep well clear of dams, powerhouses, booms, and restricted water.', 'The public launch record does not create a right to land elsewhere; plan a complete access chain before departure.'],
    camping: 'No on-route camping assumed; use designated nearby campgrounds or central-Maine lodging.', campingClassification: 'nearby_basecamp', shuttle: 'Stage the Norridgewock vehicle, then return to Skowhegan. Confirm seasonal access, parking, and any local fee or closure.', permits: 'Maine boating/PFD rules plus current utility, municipal, parking, and posted access rules apply.', accessCaveats: ['DACF lists the Skowhegan and Norridgewock public access anchors.', 'Hydroelectric and industrial shorelines are not alternate landings.'], watchFor: ['dam releases, booms, structures, and rapidly changing current', 'cold water, wood, and submerged rocks', 'private/industrial banks and seasonal parking'], routeUrl: boatingSitesUrl, routeSourceLabel: 'Maine DACF public boat-launch inventory', routeSourceProvider: 'local', thresholdUrl: usgsCurrentUrl('01049265'), thresholdLabel: 'USGS Kennebec River at North Sidney proxy context; no route-specific recreational cutoff transferred', thresholdProvider: 'usgs', evidence: 'DACF lists Skowhegan and Norridgewock public Kennebec accesses; USGS 01049265 is an active long-record Kennebec station downstream of this reach, so it is used only as proxy context.', imageUrl: kennebecImage, imageLabel: 'Maine river regional context photograph', imageCredit: 'Maine Department of Agriculture, Conservation and Forestry', imageTaken: 'Official Maine state image; exact reach not claimed',
  }),
  buildMaineRoute({
    id: 'presumpscot-river-gorham-falmouth', name: 'Presumpscot River', riverId: 'presumpscot-river', reach: 'Gorham DACF carry-in to Falmouth landing facility', region: 'Southern Maine / Greater Portland', distance: 11, time: 'About 4–7 hours with tide and dam planning', difficulty: 'moderate', risk: 'caution', gauge: '01064140', gaugeName: 'Presumpscot River near West Falmouth, ME', gaugeKind: 'direct', gaugeMetric: 'gage_height_ft',
    putIn: { name: 'Gorham DACF carry-in access', latitude: 43.73660, longitude: -70.42790 }, takeOut: { name: 'Falmouth Presumpscot landing facility', latitude: 43.71702, longitude: -70.26388 },
    summary: 'An 11-mile Greater Portland Presumpscot corridor from the state-listed Gorham carry-in to the Falmouth landing facility, with direct lower-river stage context and dam/tide boundaries.',
    status: 'Planning-only. Use the West Falmouth stage station as direct lower-corridor context, but verify dam operations, tide/wind effects, water quality, and the exact take-out before departure.',
    seasonNotes: 'Late spring through fall. Wind, tide, heat, thunderstorms, and changing dam operations matter more downstream; cold water remains a risk in spring and fall.', difficultyNotes: 'Moderate developed-river itinerary with current, dam/structure hazards, possible tidal influence, and limited safe informal exits.',
    hazards: ['dam', 'dam_release', 'wind', 'cold_water', 'urban_water_quality', 'private_banks', 'access_uncertain', 'mandatory_takeout'], safety: [...commonRiverSafety, 'Identify and respect all dam, boom, powerhouse, and mandatory-takeout boundaries before launch; never run an unscouted structure.', 'Check tide and wind conditions near Falmouth and leave enough daylight to reach the landing facility.'],
    camping: 'No on-route camping assumed; use nearby Greater Portland lodging or designated campgrounds.', campingClassification: 'nearby_basecamp', shuttle: 'Stage at Falmouth and return to Gorham. Urban traffic, parking restrictions, and tide timing can lengthen the shuttle.', permits: 'Maine boating/PFD rules, municipal/park parking rules, utility restrictions, and current water-quality or closure notices apply.', accessCaveats: ['DACF lists the Gorham carry-in and Falmouth landing facility as access anchors.', 'The Falmouth endpoint is a managed landing facility; confirm current hours, tide, dock condition, and any event restrictions.'], watchFor: ['dams, power facilities, booms, and changing releases', 'tide, wind, water quality, and urban traffic', 'cold water, private banks, and mandatory take-out timing'], routeUrl: boatingSitesUrl, routeSourceLabel: 'Maine DACF public boat-launch inventory', routeSourceProvider: 'local', thresholdUrl: usgsCurrentUrl('01064140'), thresholdLabel: 'USGS Presumpscot River near West Falmouth direct stage context; no route-specific recreational cutoff transferred', thresholdProvider: 'usgs', evidence: 'DACF lists named Gorham and Falmouth Presumpscot access sites; USGS station 01064140 is a direct lower-river stage reference, while this pass found no numeric recreational threshold.', imageUrl: presumpscotImage, imageLabel: 'Maine river regional context photograph', imageCredit: 'Maine Department of Agriculture, Conservation and Forestry', imageTaken: 'Official Maine state image; exact reach not claimed',
  }),
  buildMaineRoute({
    id: 'saint-croix-river-baileyville-calais', name: 'Saint Croix River', riverId: 'saint-croix-river', reach: 'Baileyville public access to Calais public ramp', region: 'Downeast Maine / International St. Croix Waterway', distance: 8, time: 'About 3–5 hours; allow time for border-waterway logistics', difficulty: 'moderate', risk: 'caution', gauge: '01021060', gaugeName: 'St. Croix River at Calais, ME', gaugeKind: 'direct',
    putIn: { name: 'Baileyville public access', latitude: 45.18918, longitude: -67.43163 }, takeOut: { name: 'Calais public part-tide ramp', latitude: 45.19021, longitude: -67.27631 },
    summary: 'An 8-mile St. Croix access-to-access route from Baileyville to Calais, connecting the International St. Croix Waterway with a direct Calais-area gauge and tidal-transition planning.',
    status: 'Planning-only. USGS 01021060 provides direct Calais-area context, but local current, border-waterway rules, tide, wind, and mill/utility structures require same-day review.',
    seasonNotes: 'Late spring through fall. Cold water, wind, storms, and shoulder-season daylight are significant; confirm any waterfowl or seasonal access controls.', difficultyNotes: 'Moderate moving water with current, possible wind exposure, structures, and a downstream transition toward tidal water.',
    hazards: ['dam', 'dam_release', 'wind', 'cold_water', 'private_banks', 'access_uncertain', 'urban_water_quality', 'wildlife'], safety: [...commonRiverSafety, 'The St. Croix is an international waterway; carry identification and confirm current U.S./Canadian boating and border guidance before crossing or landing.', 'Do not approach utility structures, dams, or restricted industrial shorelines.'],
    camping: 'Use designated nearby campgrounds or Calais/Baileyville lodging; no informal riverbank camping is assumed.', campingClassification: 'nearby_basecamp', shuttle: 'Stage the Calais vehicle first and return to Baileyville. Confirm parking, ramp condition, and any border or event restrictions.', permits: 'Maine boating/PFD and AIS requirements, municipal ramp rules, and current international-waterway/border guidance apply.', accessCaveats: ['DACF lists both Baileyville and Calais access anchors.', 'A part-tide ramp is not guaranteed to be usable at every tide or water level; confirm the landing window.'], watchFor: ['wind, tide transition, current, cold water, and structures', 'border-waterway rules and identification requirements', 'private/industrial banks and ramp timing'], routeUrl: boatingSitesUrl, routeSourceLabel: 'Maine DACF public boat-launch inventory', routeSourceProvider: 'local', thresholdUrl: usgsCurrentUrl('01021060'), thresholdLabel: 'USGS St. Croix River at Calais direct context; no route-specific recreational cutoff transferred', thresholdProvider: 'usgs', evidence: 'DACF lists public access at Baileyville and Calais; USGS identifies the Calais-area St. Croix station and the International Joint Commission as a cooperating context.', imageUrl: stCroixImage, imageLabel: 'St. Croix River same-river context photograph', imageCredit: 'U.S. Fish and Wildlife Service', imageTaken: 'Official USFWS image; exact reach not claimed',
  }),
  buildMaineRoute({
    id: 'aroostook-river-washburn-fort-fairfield', name: 'Aroostook River', riverId: 'aroostook-river', reach: 'Washburn public access to Fort Fairfield public access', region: 'Northern Maine / Aroostook County', distance: 18, time: 'Full day; allow a generous shuttle and daylight margin', difficulty: 'moderate', risk: 'caution', gauge: '01017000', gaugeName: 'Aroostook River at Washburn, ME', gaugeKind: 'direct',
    putIn: { name: 'Washburn public access', latitude: 46.77600, longitude: -68.15530 }, takeOut: { name: 'Fort Fairfield public access', latitude: 46.77305, longitude: -67.82794 },
    summary: 'An 18-mile northern Maine Aroostook River itinerary linking the state-listed Washburn and Fort Fairfield public accesses, with a long-record direct gauge at the put-in area.',
    status: 'Planning-only. USGS 01017000 is direct at Washburn, but the long downstream reach can diverge with tributary inflow, ice effects, local wood, and access conditions. Inspect the entire route plan before launch.',
    seasonNotes: 'Late spring through early fall. Ice-affected readings and spring rise require extra caution; cold water and shoulder-season weather remain material.', difficultyNotes: 'Moderate full-day moving water with long distance, current, wood, cold water, and limited legal exits between named accesses.',
    hazards: ['low_water', 'fast_rise', 'strainers', 'cold_water', 'private_banks', 'access_uncertain', 'wildlife'], safety: [...commonRiverSafety, 'Use a full-day float plan with a hard turnaround and daylight boundary; the distance leaves little room for a late launch or slow progress.', 'USGS notes ice effects at the Washburn record; do not interpret winter or ice-affected values as summer paddling guidance.'],
    camping: 'No on-route camping assumed; use designated nearby campgrounds or Aroostook County lodging.', campingClassification: 'nearby_basecamp', shuttle: 'Stage at Fort Fairfield and return to Washburn. Confirm parking, vehicle security, road conditions, and take-out visibility.', permits: 'Maine boating/PFD and AIS requirements plus current municipal, parking, land-management, and posted access rules apply.', accessCaveats: ['DACF lists public access at Washburn and Fort Fairfield.', 'Do not treat agricultural or private bank as emergency access without permission; carry communication and rescue options.'], watchFor: ['ice-affected or rapidly rising water', 'wood, shallow sections, cold water, and long distance', 'private banks, weather, and rural shuttle delay'], routeUrl: boatingSitesUrl, routeSourceLabel: 'Maine DACF public boat-launch inventory', routeSourceProvider: 'local', thresholdUrl: usgsCurrentUrl('01017000'), thresholdLabel: 'USGS Aroostook River at Washburn direct telemetry; no route-specific recreational cutoff transferred', thresholdProvider: 'usgs', evidence: 'DACF lists named Washburn and Fort Fairfield Aroostook access sites; USGS 01017000 provides a long, active direct record at Washburn, but no route-specific numeric paddling band was established in this pass.', imageUrl: aroostookImage, imageLabel: 'Maine river regional context photograph', imageCredit: 'Maine Department of Agriculture, Conservation and Forestry', imageTaken: 'Official Maine state image; exact reach not claimed',
  }),
];
