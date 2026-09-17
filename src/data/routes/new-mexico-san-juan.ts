import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const paddlerGuide = { label: 'Southwest Paddler San Juan River New Mexico access and hazards', url: 'https://southwestpaddler.com/docs/sanjuannm2.html', provider: 'local' as const };
const tourismGuide = { label: 'New Mexico Tourism San Juan River paddling overview', url: 'https://www.newmexico.org/things-to-do/outdoor-adventures/rafting-kayaking/san-juan-animas-rivers/', provider: 'local' as const };
const stateParksGuide = { label: 'New Mexico State Parks paddlesports safety guidance', url: 'https://www.emnrd.nm.gov/spd/activities/boating-2/paddle-sports/', provider: 'local' as const };
const navajoParkGuide = { label: 'Navajo Lake State Park boating and camping', url: 'https://www.emnrd.nm.gov/spd/find-a-park/navajo-lake-state-park/', provider: 'local' as const };
const farmingtonAccessMap = { label: 'City of Farmington San Juan River signage and access map', url: 'https://www.farmingtonnm.gov/DocumentCenter/View/27318/River-Signage-Penny-Lane', provider: 'local' as const };
const farmingtonFishStudy = { label: '2024 San Juan River fish tissue study sampling locations', url: 'https://nnhp.nndfw.org/docs/2024_sanjuan_river_fishtissue_study.pdf', provider: 'local' as const };
const farmingtonRiverPhoto = { label: 'San Juan River near Navajo Dam photo, Phil Slattery via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:San_Juan_River_near_Navajo_Dam,_New_Mexico.jpg', provider: 'local' as const };
const gaugeUpper = { id: 'usgs-09355500', provider: 'usgs' as const, siteId: '09355500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'San Juan River near Archuleta, NM', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-09355500/' };
const gaugeLower = { id: 'usgs-09365000', provider: 'usgs' as const, siteId: '09365000', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'San Juan River at Farmington, NM', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-09365000/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'dam', 'private_banks'];

const navajoDam = { name: 'Navajo Dam public river launch (water-entry edge)', latitude: 36.8177528, longitude: -107.6297083 };
const blanco = { name: 'Blanco public access (water-entry edge)', latitude: 36.7251083, longitude: -107.8135028 };
const vereda = { name: 'Vereda del Rio public launch (water-entry edge)', latitude: 36.6995333, longitude: -107.9794694 };
const amongWaters = { name: 'Among the Waters Park public access (water-entry edge)', latitude: 36.7214944, longitude: -108.2238722 };
const westlandPark = { name: 'Westland Park public river access (water-entry edge)', latitude: 36.7331514, longitude: -108.2494733 };
const lionsPark = { name: 'Kirtland Lions Park public river access (water-entry edge)', latitude: 36.7217139, longitude: -108.325675 };

const common = {
  name: 'San Juan River', riverId: 'san-juan-river-new-mexico', state: 'New Mexico', region: 'San Juan River / Navajo Dam to Farmington', routeType: 'recreational' as const, scoreEligibility: 'scored' as const,
  profile: { thresholdModel: 'minimum-only' as const, tooLow: 300, idealMin: 500, thresholdSource: paddlerGuide, thresholdSourceStrength: 'community' as const, rainfallSensitivity: 'medium' as const, windSensitivity: 0.3, seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'The regulated tailwater is generally runnable year-round, but release changes, winter cold, summer heat, thunderstorms and monsoon sediment can change conditions. Check the applicable gauge and current release notices immediately before launch.', difficulty: 'easy' as const, difficultyNotes: 'The Navajo Dam-to-Blanco reach is mostly Class I–II flatwater. Downstream reaches add diversion dams, fences, bridge hazards and longer remote sections requiring portage and route-finding judgment.', confidenceNotes: 'New Mexico Tourism describes the 17-mile Navajo Dam-to-Blanco float as a relaxing run that can be used any time of year. Southwest Paddler publishes named public access points, reach mileages, a 300 cfs minimum planning cue and diversion/fence hazards. USGS 09355500 and 09365000 provide direct telemetry for the upper and Farmington corridors.' },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: ['Wear a properly fitted PFD and carry a whistle, spare paddle, throw device, communication, offline navigation, sun protection and sufficient water.', 'Check the applicable direct USGS gauge and trend, dam-release notices, weather, wind and cold-water temperature before launching. Do not treat 300 cfs as a safety guarantee.', 'Scout and portage every diversion dam and fence. New Mexico State Parks warns that low-head dams can be difficult to see and deadly; never run an unscouted structure.', 'Use only named public launch and take-out sites, respect private and Navajo Nation land boundaries, and plan for limited assistance on the lower corridor.'] },
  sourceLinks: [paddlerGuide, tourismGuide, stateParksGuide, navajoParkGuide],
};

function makeRoute(spec: { id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; miles: number; distanceLabel?: string; summary: string; time: string; note: string; watch: string[]; gauge: typeof gaugeUpper; region?: string; profile?: Partial<River['profile']>; safetyProfile?: Partial<NonNullable<River['safetyProfile']>>; logistics?: Partial<NonNullable<River['logistics']>>; accessPoints?: NonNullable<River['accessPoints']>; sourceLinks?: River['sourceLinks']; extraEvidence?: River['evidenceNotes']; consolidation?: River['consolidation'] }): River {
  return {
    ...common,
    region: spec.region ?? common.region,
    id: spec.id,
    slug: spec.id,
    reach: spec.reach,
    putIn: spec.putIn,
    takeOut: spec.takeOut,
    latitude: spec.putIn!.latitude!,
    longitude: spec.putIn!.longitude!,
    gaugeSource: spec.gauge,
    profile: { ...common.profile, ...(spec.profile ?? {}) },
    safetyProfile: { ...common.safetyProfile, ...(spec.safetyProfile ?? {}) },
    sourceLinks: [...common.sourceLinks, ...(spec.sourceLinks ?? [])],
    summary: spec.summary,
    statusText: `Check USGS ${spec.gauge.siteId}, release trend, weather, wind and current access notices before launch; portage all unscouted dams and fences.`,
    accessPoints: spec.accessPoints ?? [
      { ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note },
      { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm the public water-entry edge, parking, carry, gate hours and current access status before staging.' },
    ],
    logistics: {
      distanceLabel: spec.distanceLabel ?? `About ${spec.miles} river miles`,
      estimatedPaddleTime: spec.time,
      shuttle: 'Stage the downstream vehicle at the named public access, then drive to the upstream launch. Allow extra time for carries and any diversion portage.',
      permits: 'No special private-boater permit is listed for these New Mexico reaches, but state boating law, park rules, land-boundary restrictions and any Navajo Nation access rules apply. Confirm current notices.',
      camping: 'No overnight river camping is included. Navajo Lake State Park offers developed camping near the upper reach; otherwise use established campgrounds or lodging near Farmington and do not camp on private or tribal banks.',
      campingClassification: 'nearby_basecamp',
      summary: spec.summary,
      accessCaveats: ['Use only named public launches and take-outs; several lower-river access points have limited parking or hand-carry approaches.', 'Portage diversion dams and fences on the riverbank before proceeding.', 'Respect private, state, BLM and Navajo Nation boundaries and leave no trace at access sites.'],
      watchFor: spec.watch,
      ...(spec.logistics ?? {}),
    },
    ...(spec.consolidation ? { consolidation: spec.consolidation } : {}),
    evidenceNotes: [
      { label: 'Named public access and distance', value: `${spec.reach}; ${spec.miles} miles`, note: 'Southwest Paddler lists the access coordinates and river-mile sequence; New Mexico Tourism corroborates the upper corridor as a popular relaxing float.', sourceUrl: paddlerGuide.url },
      { label: 'Scoring floor', value: '300 cfs minimum planning cue; 500 cfs target', note: 'The 300 cfs cue is reach-specific community guidance. Verify direct gauge telemetry, release trend and local conditions before travel.', sourceUrl: paddlerGuide.url },
      { label: 'Direct telemetry', value: `USGS ${spec.gauge.siteId} ${spec.gauge.siteName}`, note: 'Use the gauge nearest the selected reach and recheck current discharge and trend.', sourceUrl: spec.gauge.detailUrl },
      { label: 'Safety and camping', value: 'PFD, diversion/fence portage, public access and nearby basecamp', note: 'New Mexico State Parks identifies low-head dams and strainers as serious hazards; Navajo Lake State Park documents developed camping near the upper reach.', sourceUrl: stateParksGuide.url },
      ...(spec.extraEvidence ?? []),
    ],
  };
}

export const newMexicoSanJuanRoutes: River[] = [
  makeRoute({ id: 'san-juan-river-navajo-dam-blanco', reach: 'Navajo Dam public launch to Blanco public access', putIn: navajoDam, takeOut: blanco, miles: 17.5, summary: 'A relaxing regulated-tailwater day float from Navajo Dam through Navajo Lake State Park to the Blanco public access.', time: 'Allow 5–8 hours with shuttle, fishing traffic and wildlife stops', note: 'Southwest Paddler lists Navajo Dam and Blanco as public water-entry points; New Mexico Tourism describes this 17-mile section as a year-round paddling opportunity. Confirm the dam-release schedule and the carry from the launch.', watch: ['Cold tailwater below Navajo Dam', 'Fishing lines and changing release levels', 'Simon Canyon and downstream bridge traffic'], gauge: gaugeUpper }),
  makeRoute({ id: 'san-juan-river-blanco-vereda', reach: 'Blanco public access to Vereda del Rio public launch', putIn: blanco, takeOut: vereda, miles: 11.9, summary: 'A pastoral San Juan reach from Blanco through the lower Navajo tailwater valley to the Vereda del Rio public launch.', time: 'Allow 4–6 hours with diversion scouting and shuttle margin', note: 'Southwest Paddler places Blanco at about river mile 17.5 and Vereda del Rio at about 29.4, both on the named access chain. Prepare for the first diversion structures and limited intermediate exits.', watch: ['Diversion dams and submerged fences', 'Monsoon sediment and fast release changes', 'Limited shade and private-bank boundaries'], gauge: gaugeUpper }),
  makeRoute({ id: 'san-juan-river-vereda-among-waters', reach: 'Vereda del Rio public launch to Among the Waters Park public access', putIn: vereda, takeOut: amongWaters, miles: 16.9, summary: 'A lower San Juan day reach from Vereda del Rio through the Bloomfield and Farmington corridor to Among the Waters Park.', time: 'Allow 5–8 hours with diversion portages, bridge scouting and shuttle margin', note: 'Southwest Paddler lists Vereda del Rio at about mile 29.4 and Among the Waters Park at about mile 46.3 as public access points. Use the Farmington gauge, scout every diversion and preserve the public park take-out.', watch: ['Diversion dams and fences requiring portage', 'Warm-weather exposure and thunderstorms', 'Farmington bridges, current and park hours'], gauge: gaugeLower }),
  makeRoute({ id: 'san-juan-river-navajo-dam-vereda', reach: 'Navajo Dam public launch to Vereda del Rio public launch', putIn: navajoDam, takeOut: vereda, miles: 29.4, summary: 'A long regulated San Juan day reach combining the Navajo Dam-to-Blanco and Blanco-to-Vereda access sections.', time: 'Allow 8–12 hours with diversion scouting, fishing traffic and shuttle margin', note: 'Use Blanco as the documented intermediate bailout and timing checkpoint. Confirm dam releases, the long shuttle and every downstream diversion before launch.', watch: ['Cold tailwater and changing dam releases', 'Diversion dams, submerged fences and portages', 'Long reach, limited shade and private-bank boundaries'], gauge: gaugeUpper }),
  makeRoute({ id: 'san-juan-river-navajo-dam-among-waters', reach: 'Navajo Dam public launch to Among the Waters Park public access', putIn: navajoDam, takeOut: amongWaters, miles: 46.3, distanceLabel: 'Staged multi-day itinerary (about 46.3 river miles)', summary: 'The full documented Navajo Dam to Farmington San Juan paddle corridor through Blanco and Vereda del Rio.', time: 'Plan a full daylight expedition or split the corridor with a staged shuttle and verified bailout plan', note: 'Blanco and Vereda del Rio are named intermediate public access points. This long reach crosses multiple diversion and land-boundary zones; confirm releases, weather, shuttle and take-out hours.', watch: ['Cold tailwater and release changes', 'Multiple diversion dams and fences requiring portage', 'Long exposure, monsoon storms and limited assistance'], gauge: gaugeLower }),
  makeRoute({ id: 'san-juan-river-blanco-among-waters', reach: 'Blanco public access to Among the Waters Park public access', putIn: blanco, takeOut: amongWaters, miles: 28.8, summary: 'A combined lower San Juan reach from Blanco through Vereda del Rio to Among the Waters Park.', time: 'Allow 8–12 hours with diversion portages, bridge scouting and shuttle margin', note: 'Vereda del Rio is the documented intermediate bailout. Use the Farmington gauge for this lower corridor and confirm every diversion, bridge and park landing before departure.', watch: ['Diversion dams and submerged fences', 'Warm-weather exposure and thunderstorms', 'Farmington bridges, current and park hours'], gauge: gaugeLower }),
  makeRoute({
    id: 'san-juan-river-among-waters-westland-park',
    reach: 'Among the Waters Park public access to Westland Park public river access',
    putIn: amongWaters,
    takeOut: westlandPark,
    miles: 2.24,
    summary: 'A short Farmington San Juan float between two City-designated public river access points; Among the Waters is a walk-in launch.',
    time: 'Plan about 1–2 hours on the water, plus shuttle and access carries',
    note: 'The City of Farmington river-signage map lists this named segment at 2.24 miles. Among the Waters is marked walk-in access; Westland Park is a separate public river access.',
    watch: ['Changing water levels and unknown shallow features', 'Heat, sun exposure, wind and monsoon weather', 'Private banks and limited places to exit between public access points'],
    gauge: gaugeLower,
    region: 'San Juan River / Farmington city access chain',
    profile: { difficulty: 'easy', difficultyNotes: 'A short, generally gentle urban-edge float. Farmington says difficulty changes with water level and that hazards may exist beyond those shown on its access map; inspect conditions and your own skill limits before launching.', confidenceNotes: 'The current City of Farmington sign map names both public water accesses and the 2.24-mile segment. Southwest Paddler supplies a community 300 cfs minimum and 500 cfs target for the broader San Juan corridor. USGS 09365000 is direct same-river telemetry near this reach; its reading is a score preference, not a safety guarantee.' },
    safetyProfile: { riskLevel: 'caution', reviewStatus: 'reviewed', hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'private_banks'], safetyNotes: ['Wear a Coast Guard-approved PFD; Farmington states one is required by law for all river users.', 'Check current flow, trend, weather, wind and the City live hazard map immediately before launch. City signage says difficulty changes with water level and other hazards may exist.', 'Use only the named public river accesses. Among the Waters is walk-in only; stay on the water, respect private banks, and use the City access-hour rules.', 'Scout unfamiliar features and portage whenever a safe line is unclear. Carry water, sun protection, suitable layers and a way to call for help.'] },
    logistics: { camping: 'Day float only. No authorized on-route campsite is confirmed; do not camp at public access points or on private banks. Use separately permitted lodging or campgrounds.', campingClassification: 'none', accessCaveats: ['Among the Waters is walk-in only; carry craft and gear to the marked river entry.', 'Westland Park is a City-designated public river access; confirm the water-edge landing, parking and seasonal notices before staging.', 'City parks and river access are open 6 AM–10 PM March–October and 6 AM–6 PM November–February. Remain on the water outside launch and take-out paths.'], watchFor: ['Low or changing water and unknown shallow features', 'Wind, thunderstorms, hot-weather exposure and cold-water shock', 'Private banks and limited emergency exits between named public accesses'] },
    sourceLinks: [farmingtonAccessMap, farmingtonFishStudy, farmingtonRiverPhoto],
    extraEvidence: [
      { label: 'City access and segment distance', value: 'Among the Waters to Westland Park: 2.24 mi', note: 'Current City signage identifies both as public San Juan River access points and marks Among the Waters as walk-in only. The City also requires PFDs and directs users to check current flow, hazards and weather.', sourceUrl: farmingtonAccessMap.url },
      { label: 'Water-edge coordinate evidence', value: 'Westland Park San Juan River sampling reach: 36.7331514, -108.2494733', note: 'The 2024 New Mexico fish tissue study locates its Westland Park sampling reach in the San Juan River; the City access map independently marks the park as a public river access. Geometry and endpoint snap will be audited before publication.', sourceUrl: farmingtonFishStudy.url },
      { label: 'Gallery image and reuse rights', value: 'San Juan River near Navajo Dam, New Mexico', note: 'Phil Slattery’s Wikimedia Commons image is CC BY-SA 4.0. It is a same-river context photo, about 40 river miles upstream, not a photograph of this exact Farmington section or current conditions.', sourceUrl: farmingtonRiverPhoto.url },
    ],
    accessPoints: [
      { ...amongWaters, id: 'san-juan-river-among-waters-westland-park-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'City signage marks this public water access as walk-in only; carry craft and gear to the river.' },
      { ...westlandPark, id: 'san-juan-river-among-waters-westland-park-take-out', mileFromStart: 2.24, segmentKind: 'transition', note: 'City-designated public water access at Westland Park; confirm the landing and staging conditions.' },
    ],
    consolidation: { group: 'new-mexico-farmington-san-juan-access-chain', role: 'segment', relatedRouteIds: ['san-juan-river-among-waters-lions-park'], note: 'This 2.24-mile city access segment is part of the longer Among the Waters-to-Kirtland Lions route. It shares river miles with that longer user trip by design; count it as a distinct launch/take-out choice, not as separate river-corridor mileage.' },
  }),
  makeRoute({
    id: 'san-juan-river-westland-lions-park',
    reach: 'Westland Park public river access to Kirtland Lions Park public river access',
    putIn: westlandPark,
    takeOut: lionsPark,
    miles: 5.5,
    summary: 'The named Westland-to-Kirtland San Juan float, following the City-marked final navigable river segment to Lions Park.',
    time: 'Allow about 2 hours on the water, plus shuttle, access carry and conditions margin',
    note: 'Farmington signage lists Westland Park to Lions Park (Kirtland) as a 5.5-mile San Juan River segment and marks Lions Park as the end of navigable river segments.',
    watch: ['Changing water levels and unknown shallow features', 'Heat, sun exposure, wind and monsoon weather', 'Private banks and limited places to exit between public access points'],
    gauge: gaugeLower,
    region: 'San Juan River / Farmington to Kirtland',
    profile: { difficulty: 'easy', difficultyNotes: 'A generally gentle downstream float by local operator description, but difficulty changes with water level. Farmington warns that additional hazards may exist beyond those shown on its map.', confidenceNotes: 'The current City of Farmington sign map documents this 5.5-mile segment and marks Lions Park as the end of navigable river segments. A local outfitter markets Westland-to-Kirtland as a popular roughly two-hour float. Southwest Paddler supplies a community 300 cfs minimum and 500 cfs target for the broader San Juan corridor; USGS 09365000 is direct same-river telemetry upstream near Farmington.' },
    safetyProfile: { riskLevel: 'caution', reviewStatus: 'reviewed', hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'private_banks'], safetyNotes: ['Wear a Coast Guard-approved PFD; Farmington states one is required by law for all river users.', 'Check current flow, trend, weather, wind and the City live hazard map immediately before launch. City signage says difficulty changes with water level and that other hazards may exist.', 'Use only the named public river accesses and take out at Lions Park, the City-marked end of navigable river segments. Stay on the water between accesses and respect private banks.', 'Scout unfamiliar features and portage whenever a safe line is unclear. Carry water, sun protection, suitable layers and a way to call for help.'] },
    logistics: { camping: 'Day float only. No authorized on-route campsite is confirmed; do not camp at public access points or on private banks. Use separately permitted lodging or campgrounds.', campingClassification: 'none', accessCaveats: ['Westland Park and Kirtland Lions Park are City-designated public river accesses; verify the water-edge landing, parking and current notices before staging.', 'City parks and river access are open 6 AM–10 PM March–October and 6 AM–6 PM November–February.', 'Leave the river only at marked public access points; the City map says to respect private property and remain in your watercraft and on the water.'], watchFor: ['Low or changing water and unknown shallow features', 'Wind, thunderstorms, hot-weather exposure and cold-water shock', 'Private banks and limited emergency exits between named public accesses'] },
    sourceLinks: [farmingtonAccessMap, farmingtonFishStudy, farmingtonRiverPhoto],
    extraEvidence: [
      { label: 'City access, length and navigability', value: 'Westland Park to Lions Park: 5.5 mi; Lions Park is the end of navigable river segments', note: 'Current City signage names both public accesses and the route length, and gives PFD, flow-check, weather, hazards, access-hour and private-property rules.', sourceUrl: farmingtonAccessMap.url },
      { label: 'Water-edge coordinate evidence', value: 'Westland Park: 36.7331514, -108.2494733; Lions Park: 36.7217139, -108.325675', note: 'The 2024 New Mexico fish tissue study locates both sampling reaches on the San Juan River; the City map independently identifies both parks as public river accesses.', sourceUrl: farmingtonFishStudy.url },
      { label: 'Popular trip demand', value: 'Westland Park to Kirtland Lions Park', note: 'A local outfitter lists this as its downstream San Juan trip, supporting demand for the named access pair.', sourceUrl: 'https://desertriverguides.com/' },
      { label: 'Gallery image and reuse rights', value: 'San Juan River near Navajo Dam, New Mexico', note: 'Phil Slattery’s Wikimedia Commons image is CC BY-SA 4.0. It is a same-river context photo, about 40 river miles upstream, not a photograph of this exact Farmington section or current conditions.', sourceUrl: farmingtonRiverPhoto.url },
    ],
    consolidation: { group: 'new-mexico-farmington-san-juan-access-chain', role: 'segment', relatedRouteIds: ['san-juan-river-among-waters-lions-park'], note: 'This is the 5.5-mile lower component of the longer Among the Waters-to-Kirtland Lions option; the two cards overlap water miles intentionally for different public launch choices.' },
  }),
  makeRoute({
    id: 'san-juan-river-among-waters-lions-park',
    reach: 'Among the Waters Park public access to Kirtland Lions Park public river access',
    putIn: amongWaters,
    takeOut: lionsPark,
    miles: 7.74,
    distanceLabel: 'About 7.74 river miles via Westland Park (2.24 + 5.5 mi per City signage)',
    summary: 'A continuous Farmington-to-Kirtland San Juan float combining the City’s Among the Waters–Westland and Westland–Lions segments, with a public intermediate access at Westland Park.',
    time: 'Plan a half day for the 7.74-mile float, shuttle, access carries and conditions margin',
    note: 'Current Farmington signage lists 2.24 miles from Among the Waters to Westland and 5.5 miles from Westland to Kirtland Lions; Westland is a public intermediate access.',
    watch: ['Changing water levels and unknown shallow features', 'Heat, sun exposure, wind and monsoon weather', 'Private banks and limited places to exit between public access points'],
    gauge: gaugeLower,
    region: 'San Juan River / Farmington to Kirtland',
    profile: { difficulty: 'easy', difficultyNotes: 'A longer, generally gentle downstream float by local operator description, but difficulty changes with water level. Farmington warns that additional hazards may exist beyond those shown on its map.', confidenceNotes: 'The City of Farmington publishes both component distances and identifies Among the Waters, Westland Park and Kirtland Lions as public river accesses; Westland is a bailout along the route. The route ends at the City-marked end of navigable segments. Southwest Paddler supplies a community 300 cfs minimum and 500 cfs target for the broader San Juan corridor; USGS 09365000 is direct same-river telemetry upstream near the start.' },
    safetyProfile: { riskLevel: 'caution', reviewStatus: 'reviewed', hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'private_banks'], safetyNotes: ['Wear a Coast Guard-approved PFD; Farmington states one is required by law for all river users.', 'Check current flow, trend, weather, wind and the City live hazard map immediately before launch. City signage says difficulty changes with water level and that other hazards may exist.', 'Use only the named public river accesses. Among the Waters is walk-in only; Westland is an intermediate public access; take out at Lions Park, the City-marked end of navigable segments.', 'Stay on the water between accesses, respect private banks and portage any unfamiliar feature when a safe line is unclear. Carry water, sun protection, suitable layers and a way to call for help.'] },
    logistics: { camping: 'Day float only. No authorized on-route campsite is confirmed; do not camp at public access points or on private banks. Use separately permitted lodging or campgrounds.', campingClassification: 'none', accessCaveats: ['Among the Waters is walk-in only; carry craft and gear to the marked river entry.', 'Westland Park is a public intermediate access; verify its landing, parking and carry before relying on it as a bailout.', 'Lions Park is the City-marked end of navigable river segments. City access hours are 6 AM–10 PM March–October and 6 AM–6 PM November–February.', 'Remain on the water between designated public accesses and respect private property.'], watchFor: ['Low or changing water and unknown shallow features', 'Wind, thunderstorms, hot-weather exposure and cold-water shock', 'Private banks and limited emergency exits between named public accesses'] },
    sourceLinks: [farmingtonAccessMap, farmingtonFishStudy, farmingtonRiverPhoto],
    extraEvidence: [
      { label: 'City access chain and length', value: 'Among the Waters–Westland: 2.24 mi; Westland–Kirtland Lions: 5.5 mi; combined: 7.74 mi', note: 'Current City signage names all three public river accesses, provides the two component lengths and identifies Lions Park as the end of navigable river segments.', sourceUrl: farmingtonAccessMap.url },
      { label: 'Water-edge coordinate evidence', value: 'Among the Waters: 36.7214944, -108.2238722; Westland Park: 36.7331514, -108.2494733; Lions Park: 36.7217139, -108.325675', note: 'The 2024 New Mexico fish tissue study locates the Westland and Lions sampling reaches on the San Juan River; the City map independently identifies all three public access points. The intermediate Westland point is an on-water bailout marker.', sourceUrl: farmingtonFishStudy.url },
      { label: 'Adjacent-route consolidation', value: 'Downstream continuation of san-juan-river-vereda-among-waters', note: 'This trip starts at the existing route’s Among the Waters takeout and continues downstream without overlapping its water miles; Westland is an intermediate public bailout. The Westland–Lions card is an intentional shorter launch alternative within this route.', sourceUrl: farmingtonAccessMap.url },
      { label: 'Gallery image and reuse rights', value: 'San Juan River near Navajo Dam, New Mexico', note: 'Phil Slattery’s Wikimedia Commons image is CC BY-SA 4.0. It is a same-river context photo, about 40 river miles upstream, not a photograph of this exact Farmington section or current conditions.', sourceUrl: farmingtonRiverPhoto.url },
    ],
    accessPoints: [
      { ...amongWaters, id: 'san-juan-river-among-waters-lions-park-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'City signage marks this public water access as walk-in only; carry craft and gear to the river.' },
      { ...westlandPark, id: 'san-juan-river-among-waters-lions-park-westland-intermediate', mileFromStart: 2.24, segmentKind: 'transition', note: 'Public on-water bailout at Westland Park, 2.24 river miles below Among the Waters per the City map.' },
      { ...lionsPark, id: 'san-juan-river-among-waters-lions-park-take-out', mileFromStart: 7.74, segmentKind: 'transition', note: 'Public river access and the City-marked end of navigable segments; confirm current landing and access hours.' },
    ],
    consolidation: { group: 'new-mexico-farmington-san-juan-access-chain', role: 'macro', relatedRouteIds: ['san-juan-river-among-waters-westland-park', 'san-juan-river-westland-lions-park', 'san-juan-river-vereda-among-waters'], note: 'This long option combines the two City-mapped Farmington legs and shares the Westland-to-Lions river miles with the shorter route. It is directly adjacent to vereda-among-waters at Among the Waters, with no overlapping river miles.' },
  }),
  makeRoute({
    id: 'san-juan-river-vereda-westland-park',
    reach: 'Vereda del Rio public launch to Westland Park public river access',
    putIn: vereda,
    takeOut: westlandPark,
    miles: 19.14,
    distanceLabel: 'About 19.14 river miles via Among the Waters (16.9 + 2.24 mi from published access guides)',
    summary: 'A longer San Juan day trip from Vereda del Rio to Westland Park, extending the named upper access-chain float through Among the Waters.',
    time: 'Plan a full day for the 19.14-mile float, diversion scouting, shuttle and access carries',
    note: 'Southwest Paddler lists Vereda del Rio to Among the Waters at about 16.9 miles; City of Farmington signage adds 2.24 miles from Among the Waters to Westland Park. Among the Waters remains a public intermediate access and bailout.',
    watch: ['Diversion dams and submerged fences requiring scouting and portage', 'Warm-weather exposure, wind and monsoon storms', 'Long day, limited shade, private-bank boundaries and limited emergency exits'],
    gauge: gaugeLower,
    region: 'San Juan River / Vereda del Rio to Farmington',
    profile: { difficulty: 'moderate', difficultyNotes: 'A long day on mostly gentle river, with multiple diversion structures, fences, bridge features and limited exits. Difficulty varies with flow and paddler experience.', confidenceNotes: 'The 16.9-mile Vereda-to-Among reach is listed by Southwest Paddler; current Farmington signage gives a further 2.24 miles to Westland and names both as public water accesses. The route uses direct USGS 09365000 telemetry and the community 300 cfs minimum / 500 cfs target for the San Juan corridor as planning cues only.' },
    safetyProfile: { riskLevel: 'caution', reviewStatus: 'reviewed', hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'dam', 'private_banks'], safetyNotes: ['Wear a Coast Guard-approved PFD; Farmington states one is required by law for all river users.', 'Check direct USGS 09365000, its trend, current release notices, weather, wind and the City live hazard map immediately before launch. The 300 cfs cue is not a safety guarantee.', 'Scout and portage every diversion dam and fence; never run an unknown or unscouted structure.', 'Use only the named public water-entry points. Among the Waters is walk-in only; treat it as the planned intermediate bailout, stay on the river between marked accesses and respect private or tribal boundaries.', 'This is a long day with limited shade and exits. Carry water, sun protection, suitable layers, offline navigation and rescue/communication equipment.'] },
    logistics: { camping: 'Day trip only. No authorized on-route campsite is confirmed for this section; do not camp at public access points or private banks. Use separately permitted lodging or established campgrounds.', campingClassification: 'none', accessCaveats: ['Vereda del Rio and Westland Park are named public water-entry accesses; confirm current landing, parking, carry and closure conditions.', 'Among the Waters is a walk-in public access and the intermediate bailout; carry craft and gear from the designated parking area.', 'Farmington parks and river accesses are open 6 AM–10 PM March–October and 6 AM–6 PM November–February.', 'Remain on the water between designated public accesses and respect private property.'], watchFor: ['Low or changing water and unknown shallow features', 'Diversion dams, submerged fences, strainers and bridges', 'Heat, wind, monsoon storms, cold water and limited emergency exits'] },
    sourceLinks: [farmingtonAccessMap, farmingtonFishStudy, farmingtonRiverPhoto],
    extraEvidence: [
      { label: 'Published access-chain distances', value: 'Vereda–Among the Waters: about 16.9 mi; Among the Waters–Westland: 2.24 mi; total: about 19.14 mi', note: 'Southwest Paddler names the upper public access segment; current City of Farmington signage names the downstream public access and exact city segment distance.', sourceUrl: farmingtonAccessMap.url },
      { label: 'Water-edge endpoints and bailout', value: 'Vereda del Rio: 36.6995333, -107.9794694; Among the Waters: 36.7214944, -108.2238722; Westland Park: 36.7331514, -108.2494733', note: 'Named river-entry coordinates from the reviewed access chain. City signage marks Among the Waters walk-in only; the 2024 fish-tissue survey locates Westland sampling on the San Juan River.', sourceUrl: farmingtonFishStudy.url },
      { label: 'Direct telemetry and flow cue', value: 'USGS 09365000; 300 cfs minimum planning cue, 500 cfs target', note: 'The station is direct same-river telemetry near the route. Southwest Paddler supplies the community minimum/target cue; compare live flow and trend with local observations and do not interpret it as a safety threshold.', sourceUrl: gaugeLower.detailUrl },
      { label: 'Overlap and consolidation', value: 'Adjacent extension of san-juan-river-vereda-among-waters; contains san-juan-river-among-waters-westland-park', note: 'This route continues downstream from the existing Vereda–Among trip and includes the separately listed Among–Westland segment. It is a longer trip choice with a public bailout, not additional distinct river mileage.', sourceUrl: farmingtonAccessMap.url },
      { label: 'Gallery image and reuse rights', value: 'San Juan River near Navajo Dam, New Mexico', note: 'Phil Slattery’s CC BY-SA 4.0 photograph is an honestly captioned same-river context image, well upstream of this route; it is not a route endpoint or current-conditions image.', sourceUrl: farmingtonRiverPhoto.url },
    ],
    accessPoints: [
      { ...vereda, id: 'san-juan-river-vereda-westland-park-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Named public launch; confirm current road, parking, carry and water-entry conditions.' },
      { ...amongWaters, id: 'san-juan-river-vereda-westland-park-intermediate', mileFromStart: 16.9, segmentKind: 'transition', note: 'Public walk-in access and bailout about 16.9 river miles below Vereda del Rio; carry craft and gear.' },
      { ...westlandPark, id: 'san-juan-river-vereda-westland-park-take-out', mileFromStart: 19.14, segmentKind: 'transition', note: 'City-designated public river access and take-out; confirm current landing and staging conditions.' },
    ],
    consolidation: { group: 'new-mexico-farmington-san-juan-access-chain', role: 'macro', relatedRouteIds: ['san-juan-river-vereda-among-waters', 'san-juan-river-among-waters-westland-park', 'san-juan-river-among-waters-lions-park'], note: 'A distinct longer launch-to-take-out choice assembled from documented adjoining reaches. It overlaps both component cards and has a planned public bailout at Among the Waters; do not count its shared river miles as new corridor mileage.' },
  }),
  makeRoute({
    id: 'san-juan-river-vereda-lions-park',
    reach: 'Vereda del Rio public launch to Kirtland Lions Park public river access',
    putIn: vereda,
    takeOut: lionsPark,
    miles: 24.64,
    distanceLabel: 'About 24.64 river miles via Among the Waters and Westland Park (16.9 + 2.24 + 5.5 mi)',
    summary: 'A full-day San Juan itinerary from Vereda del Rio through the Farmington access chain to Kirtland Lions Park, the City-marked end of navigable river segments.',
    time: 'Plan a full daylight day for the 24.64-mile float, multiple diversion portages, shuttle and access carries',
    note: 'Southwest Paddler lists Vereda del Rio to Among the Waters at about 16.9 miles; Farmington signage then lists 2.24 miles to Westland and 5.5 miles from Westland to Lions Park. Westland and Among the Waters are public intermediate bailouts.',
    watch: ['Multiple diversion dams and submerged fences requiring scouting and portage', 'Long day, limited shade, heat, wind and monsoon storms', 'Private-bank boundaries, unknown shallow features and limited emergency assistance'],
    gauge: gaugeLower,
    region: 'San Juan River / Vereda del Rio to Kirtland',
    profile: { difficulty: 'moderate', difficultyNotes: 'A long, mostly gentle day float with multiple diversion structures, fences, bridge features and limited exits. This trip requires strong endurance, careful logistics and willingness to stop at the public intermediate accesses.', confidenceNotes: 'Southwest Paddler documents the Vereda-to-Among reach; the current City of Farmington access map supplies the Among–Westland and Westland–Lions segments, names all access points and marks Lions Park as the end of navigable river segments. USGS 09365000 is direct same-river telemetry. The 300 cfs minimum / 500 cfs target remain community planning cues, not safety limits.' },
    safetyProfile: { riskLevel: 'caution', reviewStatus: 'reviewed', hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'dam', 'private_banks'], safetyNotes: ['Wear a Coast Guard-approved PFD; Farmington states one is required by law for all river users.', 'Check direct USGS 09365000, its trend, current release notices, weather, wind and the City live hazard map immediately before launching; 300 cfs is not a safety guarantee.', 'Scout and portage every diversion dam and fence; do not run unknown or unscouted structures.', 'Use only the named public water-entry points. Among the Waters and Westland Park are intermediate public bailouts; Lions Park is the City-marked end of navigable river segments.', 'This 24.64-mile trip needs full-day endurance and a conservative turn-back plan. Carry water, sun protection, suitable layers, offline navigation, rescue/communication equipment and take out before park hours end.'] },
    logistics: { camping: 'Day trip only. No authorized on-route campsite is confirmed for this section; do not camp at public access points or private banks. Use separately permitted lodging or established campgrounds.', campingClassification: 'none', accessCaveats: ['Vereda del Rio, Among the Waters, Westland Park and Kirtland Lions are named public river accesses; Among the Waters is walk-in only.', 'The City marks Lions Park as the end of navigable segments; do not plan to continue downstream.', 'Farmington parks and river accesses are open 6 AM–10 PM March–October and 6 AM–6 PM November–February.', 'Remain on the water between designated public accesses and respect private property.'], watchFor: ['Low or changing water, diversion dams, submerged fences and strainers', 'Long exposure, heat, wind, monsoon storms and cold water', 'Limited shade and emergency exits; plan bailouts at Among the Waters and Westland'] },
    sourceLinks: [farmingtonAccessMap, farmingtonFishStudy, farmingtonRiverPhoto],
    extraEvidence: [
      { label: 'Published access-chain distances', value: 'Vereda–Among: about 16.9 mi; Among–Westland: 2.24 mi; Westland–Lions: 5.5 mi; total: about 24.64 mi', note: 'The route combines the published Southwest Paddler upper leg and two adjoining City of Farmington segments, with both public intermediate bailouts retained.', sourceUrl: farmingtonAccessMap.url },
      { label: 'Water-edge endpoints and intermediate access', value: 'Vereda del Rio: 36.6995333, -107.9794694; Among the Waters: 36.7214944, -108.2238722; Westland Park: 36.7331514, -108.2494733; Kirtland Lions: 36.7217139, -108.325675', note: 'Coordinates follow the existing reviewed San Juan water-entry anchors. Farmington identifies the parks as public access points and marks Lions Park as the end of navigable river segments.', sourceUrl: farmingtonFishStudy.url },
      { label: 'Direct telemetry and flow cue', value: 'USGS 09365000; 300 cfs minimum planning cue, 500 cfs target', note: 'Direct same-river telemetry near Farmington; Southwest Paddler supplies the community minimum/target cue. Recheck live conditions and do not treat it as a guarantee.', sourceUrl: gaugeLower.detailUrl },
      { label: 'Overlap and consolidation', value: 'Includes san-juan-river-vereda-among-waters, san-juan-river-among-waters-westland-park and san-juan-river-westland-lions-park', note: 'The longer route provides one continuous day-trip choice through the public access chain. Component and macro routes overlap intentionally; shared mileage is not counted as a separate corridor.', sourceUrl: farmingtonAccessMap.url },
      { label: 'Gallery image and reuse rights', value: 'San Juan River near Navajo Dam, New Mexico', note: 'Phil Slattery’s CC BY-SA 4.0 photograph is an honestly captioned same-river context image, well upstream of this route; it is not a route endpoint or current-conditions image.', sourceUrl: farmingtonRiverPhoto.url },
    ],
    accessPoints: [
      { ...vereda, id: 'san-juan-river-vereda-lions-park-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Named public launch; confirm current road, parking, carry and water-entry conditions.' },
      { ...amongWaters, id: 'san-juan-river-vereda-lions-park-among-waters-bailout', mileFromStart: 16.9, segmentKind: 'transition', note: 'Public walk-in access and bailout; carry craft and gear from the designated parking area.' },
      { ...westlandPark, id: 'san-juan-river-vereda-lions-park-westland-bailout', mileFromStart: 19.14, segmentKind: 'transition', note: 'Public intermediate landing and bailout 2.24 miles below Among the Waters per City signage.' },
      { ...lionsPark, id: 'san-juan-river-vereda-lions-park-take-out', mileFromStart: 24.64, segmentKind: 'transition', note: 'City-designated public access and marked end of navigable river segments; confirm landing and park hours.' },
    ],
    consolidation: { group: 'new-mexico-farmington-san-juan-access-chain', role: 'macro', relatedRouteIds: ['san-juan-river-vereda-among-waters', 'san-juan-river-vereda-westland-park', 'san-juan-river-among-waters-lions-park', 'san-juan-river-westland-lions-park'], note: 'This longer trip overlaps each documented component route by design and has two public bailouts. Preserve one continuous route choice but do not treat it as a new corridor.' },
  }),
];
