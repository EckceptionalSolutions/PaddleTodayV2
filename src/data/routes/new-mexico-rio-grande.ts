import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const riverGuide = { label: 'BLM Rio Grande and Red River Wild and Scenic Rivers', url: 'https://www.blm.gov/programs/national-conservation-lands/new-mexico/rio-grande-wsr', provider: 'local' as const };
const segmentGuide = { label: 'BLM Rio Grande and Rio Chama river segment descriptions', url: 'https://www.blm.gov/sites/blm.gov/files/NM_Rio_Grande_and_Rio_Chama_River_Segments.pdf', provider: 'local' as const };
const gaugeGuide = { label: 'USGS Rio Grande below Taos Junction Bridge', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-08276500', provider: 'usgs' as const };
const lobatosGaugeGuide = { label: 'USGS Rio Grande near Lobatos, Colorado', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-08251500/', provider: 'usgs' as const };
const lobatosRampGuide = { label: 'BLM Colorado Lobatos Bridge boat ramp', url: 'https://www.blm.gov/announcement/public-invited-lobatos-bridge-celebration-along-rio-grande-river', provider: 'local' as const };
const americanWhitewaterUte = { label: 'American Whitewater Ute Mountain reach and access points', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/1222/main', provider: 'local' as const };
const whitewaterGuide = { label: 'American Whitewater Rio Grande reach descriptions', url: 'https://www.americanwhitewater.org/content/River/view/river-index/state/USA-NME', provider: 'local' as const };
const uteFlowStudy = { label: 'American Whitewater Rio Grande recreational flow assessment, Lobatos Bridge to Lee Trail', url: 'https://site-media.americanwhitewater.org/Document_2211.pdf', provider: 'local' as const };
const uteRouteGuide = { label: 'Southwest Paddler Ute Mountain Run access and conditions', url: 'https://southwestpaddler.com/docs/riograndenm2.html', provider: 'local' as const };
const flowGuide = { label: 'BoaterBeta Racecourse flow history', url: 'https://www.boaterbetaco.com/segment_detail/riog-22_rio-grande_race-course-pilar/', provider: 'local' as const };
const accessGuide = { label: 'Recreation.gov Rio Bravo access details', url: 'https://www.recreation.gov/camping/campgrounds/10382450', provider: 'local' as const };
const laJuntaGuide = { label: 'BLM Red River Wild and Scenic River access and current trail notice', url: 'https://www.blm.gov/visit/red-river-wild-and-scenic-river', provider: 'local' as const };
const laJuntaSegments = { label: 'BLM Rio Grande and Rio Chama river segment descriptions', url: 'https://www.blm.gov/sites/blm.gov/files/NM_Rio_Grande_and_Rio_Chama_River_Segments.pdf', provider: 'local' as const };
const laJuntaAmericanWhitewater = { label: 'American Whitewater Red River confluence to John Dunn Bridge (La Junta)', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/1226/main', provider: 'local' as const };
const laJuntaFlowGuide = { label: 'American Whitewater La Junta reach-specific USGS flow range', url: laJuntaAmericanWhitewater.url, provider: 'local' as const };
const laJuntaTourism = { label: 'New Mexico Tourism Rio Grande route description', url: 'https://www.newmexico.org/things-to-do/outdoor-adventures/rafting-kayaking/rio-grande-rio-chama/', provider: 'local' as const };
const laJuntaGaugeGuide = { label: 'USGS Rio Grande near Cerro, New Mexico', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-08263500', provider: 'usgs' as const };
const gauge = { id: 'usgs-08276500', provider: 'usgs' as const, siteId: '08276500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Rio Grande below Taos Junction Bridge near Taos, NM', detailUrl: gaugeGuide.url };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'];

const common = {
  name: 'Rio Grande', riverId: 'rio-grande-new-mexico', state: 'New Mexico', region: 'Taos County / Rio Grande del Norte', routeType: 'recreational' as const, scoreEligibility: 'scored' as const, gaugeSource: gauge,
  profile: { thresholdModel: 'two-sided' as const, tooLow: 200, idealMin: 400, idealMax: 1200, tooHigh: 3000, thresholdSource: flowGuide, thresholdSourceStrength: 'community' as const, rainfallSensitivity: 'medium' as const, windSensitivity: 0.45, seasonMonths: [3,4,5,6,7,8,9,10], seasonNotes: 'Snowmelt and monsoon weather can change the gorge quickly. Check the Taos Junction gauge, trend, wind, storms, BLM notices and access fees before launch.', difficulty: 'moderate' as const, difficultyNotes: 'The selected access chain includes BLM Class II Orilla Verde water and the Class III Racecourse. Bridges, hydraulics, cold water, private-bank boundaries and changing current require scouting and conservative craft selection.', confidenceNotes: 'BLM names the selected access sites and rates Orilla Verde Class II and Racecourse Class III–IV. American Whitewater and BoaterBeta tie the Racecourse to direct USGS 08276500 with a 200 cfs minimum and 3,000 cfs maximum planning range; these are planning cues, not safety guarantees.' },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: ['Wear a PFD and carry throw rope, communication, offline navigation and spare layers.', 'Scout rapids, strainers and bridge hazards; never stop on private banks or in restricted quiet zones.', 'Use only the named BLM or managed access sites, pay day-use fees where required and obey parking rules.', 'Cold water, canyon wind, limited exits and rapid flow changes can delay assistance.'] },
  sourceLinks: [riverGuide, segmentGuide, gaugeGuide, whitewaterGuide, flowGuide, accessGuide],
};

function makeRoute(spec: { id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; miles: number; summary: string; time: string; note: string; watch?: string[] }): River {
  return { ...common, id: spec.id, slug: spec.id, reach: spec.reach, putIn: spec.putIn, takeOut: spec.takeOut, latitude: spec.putIn!.latitude!, longitude: spec.putIn!.longitude!, summary: spec.summary, statusText: 'Check USGS 08276500, wind, storms, BLM notices and current access rules before launch; cold water, strainers and whitewater remain hazards.', accessPoints: [{ ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note }, { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm current BLM access, parking, water entry and take-out conditions before staging.' }], logistics: { distanceLabel: `About ${spec.miles} river miles`, estimatedPaddleTime: spec.time, shuttle: 'Stage the downstream vehicle at the named access, then drive to the upstream launch.', permits: 'Private boaters do not need a Rio Grande boating permit, but BLM day-use fees, parking rules and any segment-specific registration or closures apply.', camping: 'No overnight camping is included; use established BLM campgrounds and do not camp on private banks.', campingClassification: 'none', summary: spec.summary, accessCaveats: ['Use only named BLM or managed access points and designated parking.', 'Respect quiet zones, private property and bridge restrictions.', 'Recheck seasonal access, fees, road conditions and current river hazards.'], watchFor: spec.watch ?? ['Taos Junction gauge and fast rises', 'Cold water, wind and strainers', 'Bridge and private-bank hazards'] }, evidenceNotes: [{ label: 'BLM segment', value: spec.reach, note: 'BLM river-segment guidance names the selected launch and take-out sites and provides the difficulty context.', sourceUrl: segmentGuide.url }, { label: 'Scoring band', value: '200 cfs minimum; 400–1,200 cfs float planning range; 3,000 cfs maximum', note: 'American Whitewater/BoaterBeta tie the Racecourse guidance to USGS 08276500. Recheck live telemetry and reach-specific advice before travel.', sourceUrl: flowGuide.url }, { label: 'Gauge', value: 'USGS 08276500 below Taos Junction Bridge', note: 'Direct telemetry for the selected Orilla Verde and Racecourse corridor; verify current value and trend.', sourceUrl: gaugeGuide.url }] };
}

const uteMountainRoute: River = {
  ...common,
  id: 'rio-grande-ute-mountain',
  slug: 'rio-grande-ute-mountain',
  state: 'New Mexico',
  region: 'Taos County / Ute Mountain Run',
  reach: 'Lobatos Bridge, Colorado to Lee Trail, New Mexico',
  scoreEligibility: 'scored',
  putIn: { name: 'Lobatos Bridge BLM boat ramp (water entry)', latitude: 37.078611, longitude: -105.756389 },
  takeOut: { name: 'Lee Trail river landing (in-channel marker before steep carry)', latitude: 36.864295, longitude: -105.706712 },
  latitude: 37.078611,
  longitude: -105.756389,
  summary: 'A full-day, 24-mile Class II Rio Grande float from the Lobatos Bridge launch in Colorado through the New Mexico Ute Mountain reach to Lee Trail.',
  statusText: 'Check USGS 08251500, wind, cold water and BLM notices. The New Mexico segment is closed April–May; reserve a launch, expect a steep quarter-mile gear carry at Lee Trail and plan for very limited camping.',
  gaugeSource: { id: 'usgs-08251500', provider: 'usgs', siteId: '08251500', metric: 'discharge_cfs', unit: 'cfs', kind: 'direct', siteName: 'Rio Grande near Lobatos, CO', detailUrl: lobatosGaugeGuide.url },
  profile: {
    thresholdModel: 'two-sided',
    tooLow: 300,
    idealMin: 600,
    idealMax: 1500,
    tooHigh: 2000,
    thresholdSource: uteFlowStudy,
    thresholdSourceStrength: 'community',
    rainfallSensitivity: 'medium',
    windSensitivity: 0.8,
    seasonMonths: [1, 2, 3, 6, 7, 8, 9, 10, 11, 12],
    seasonNotes: 'BLM closes the New Mexico segment in April and May for raptor breeding protection. The reach is most useful during spring runoff; outside the closure, launch only when the direct Lobatos gauge and current local conditions support a full-day trip.',
    difficulty: 'moderate',
    difficultyNotes: 'BLM rates Ute Mountain Class II but warns that erratic canyon winds can make the long trip difficult. It has sparse camps, no mid-run road access and a steep primitive gear carry at Lee Trail; strong intermediate moving-water skills and self-rescue judgment are appropriate.',
    confidenceNotes: 'BLM names the Lobatos Bridge, Stateline and Lee Trail access sequence and recommends at least 300 cfs. American Whitewater links this reach to the Rio Grande near Lobatos gauge and its recreational-flow assessment places 600–2,000 cfs in the optimal user-preference band. This card uses a conservative preferred band ending at 1,500 cfs because Southwest Paddler advises that higher flows call for advanced-to-expert boaters. Flow scores are planning guidance, not a safety guarantee.',
  },
  safetyProfile: {
    riskLevel: 'caution',
    reviewStatus: 'reviewed',
    hazards: ['low_water', 'fast_rise', 'cold_water', 'whitewater', 'wind', 'remote'],
    safetyNotes: [
      'Wear a properly fitted PFD and carry a spare paddle, throw rope, communication, offline navigation, cold-water layers, sun protection and enough water for a remote full-day trip.',
      'BLM rates the reach Class II but warns that erratic winds can make it very difficult and unpredictable. Scout blind drops and portage any hazard without a clear line.',
      'Use the Lobatos gauge as a route-specific planning cue and check weather, wind, trend and current BLM conditions; above about 1,500 cfs the route guide recommends advanced-to-expert boaters.',
      'The New Mexico segment is closed to boating April–May and requires an advance BLM reservation. Confirm the current launch limit, registration and access rules before travel.',
      'There are few exit options. At Lee Trail, carry boats and gear up a steep, primitive quarter-mile trail; do not count on cell service or a quick rescue.',
    ],
  },
  sourceLinks: [riverGuide, segmentGuide, lobatosRampGuide, lobatosGaugeGuide, americanWhitewaterUte, uteFlowStudy, uteRouteGuide, whitewaterGuide],
  accessPoints: [
    { name: 'Lobatos Bridge BLM boat ramp (water entry)', latitude: 37.078611, longitude: -105.756389, id: 'rio-grande-ute-mountain-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'The upstream public boat ramp is just over the Colorado line. BLM Colorado confirms the ramp; the route guide publishes the bridge coordinates. Confirm parking and current ramp conditions before unloading.' },
    { name: 'Lee Trail river landing (in-channel marker before steep carry)', latitude: 36.864295, longitude: -105.706712, id: 'rio-grande-ute-mountain-take-out', mileFromStart: 24, segmentKind: 'transition', note: 'The map marker is on the mapped Rio Grande channel at the BLM-designated Lee Trail take-out. Carry boats and gear up the steep primitive quarter-mile trail to the rim; stage the vehicle at the Lee Trail parking area, not at this in-channel coordinate.' },
  ],
  logistics: {
    distanceLabel: 'About 24 river miles',
    estimatedPaddleTime: 'Plan a full 6–10 hour day with scouting, wind delays and the steep take-out carry',
    shuttle: 'Stage the take-out vehicle at Lee Trail, then drive north to the Lobatos Bridge boat ramp in Colorado. Confirm road conditions and shuttle time before launching.',
    permits: 'BLM requires advance reservations for private boaters on the Ute Mountain segment and self-registration at the access station. The New Mexico reach is closed April–May; verify current daily launch limits and rules with the Taos Field Office.',
    camping: 'No overnight camp is assumed for this day route. BLM says there are very few camping opportunities on the reach and rim camping requires climbing steep canyon walls; use established campgrounds outside the route and confirm current access separately.',
    campingClassification: 'none',
    summary: 'A remote, reservation-controlled day float with limited camps and a steep boat-and-gear carry at Lee Trail.',
    accessCaveats: ['The launch is in Colorado; the route crosses into New Mexico before the Lee Trail take-out.', 'Use only the BLM-designated launches, reserve in advance, and obey the April–May New Mexico closure.', 'Lee Trail landing is followed by a steep primitive quarter-mile carry; verify trail and parking conditions.', 'No reliable mid-run road exits; arrange the shuttle and carry a conservative daylight and rescue plan.'],
    watchFor: ['At least 300 cfs planning minimum; compare the live Lobatos gauge with the route-specific flow notes', 'Erratic canyon wind, cold water and blind drops', 'Raptor closure, BLM reservation and limited camping', 'Steep Lee Trail gear carry and remote rescue delays'],
  },
  evidenceNotes: [
    { label: 'Named reach, public access and hazards', value: 'Lobatos Bridge to Lee Trail; 24 miles; Class II', note: 'BLM identifies the launch/take-out sequence, 300 cfs recommended minimum, wind hazard, April–May closure, advance reservation, sparse camps and steep quarter-mile gear carry. Southwest Paddler supplies the named route and Lobatos coordinates.', sourceUrl: segmentGuide.url },
    { label: 'Scored flow band', value: '300 cfs lower guard; 600–1,500 cfs preferred; 2,000 cfs upper scoring guard', note: 'American Whitewater’s reach-specific recreational assessment reports 600–2,000 cfs as the optimal user-preference range for Lobatos Bridge–Lee Trail. The preferred band is conservatively capped at 1,500 cfs using the route guide’s advanced/expert caution; these values do not guarantee safety.', sourceUrl: uteFlowStudy.url },
    { label: 'Direct gauge and launch', value: 'USGS 08251500 Rio Grande near Lobatos, Colorado', note: 'The gauge is on the same river at the published upstream launch; American Whitewater also associates the Ute Mountain reach with direct Rio Grande gauge telemetry.', sourceUrl: lobatosGaugeGuide.url },
    { label: 'Water-entry endpoints', value: 'Lobatos Bridge BLM boat ramp to Lee Trail river landing', note: 'BLM Colorado confirms the improved public boat ramp at Lobatos Bridge and BLM New Mexico lists Lee Trail as the designated take-out. The Lee pin is snapped to the Rio Grande NHD channel at the designated access; the separate trail/parking point is on the rim after the steep gear carry.', sourceUrl: segmentGuide.url },
  ],
};

const uteStatelineLeeRoute: River = {
  ...uteMountainRoute,
  id: 'rio-grande-ute-mountain-stateline-lee',
  slug: 'rio-grande-ute-mountain-stateline-lee',
  region: 'Taos County / Ute Mountain Run',
  reach: 'Stateline BLM access to Lee Trail, New Mexico',
  putIn: { name: 'Stateline BLM launch (in-channel marker at the state line)', latitude: 37, longitude: -105.71904882432432 },
  takeOut: uteMountainRoute.takeOut,
  latitude: 37,
  longitude: -105.71904882432432,
  summary: 'A shorter, 13-mile all-New Mexico Class II option on the Ute Mountain reach from the Stateline BLM access to Lee Trail.',
  statusText: 'Check USGS 08251500, wind, cold water and BLM notices. This Ute Mountain segment is closed April–May, requires an advance reservation and ends at the steep Lee Trail gear carry.',
  profile: {
    ...uteMountainRoute.profile!,
    confidenceNotes: 'BLM designates Stateline and Lee Trail as Ute Mountain launches/take-outs, and Southwest Paddler describes Stateline as the public west-bank access for a shorter 13-mile trip. BLM recommends at least 300 cfs; American Whitewater assesses 600–2,000 cfs as the optimal user-preference range for the full Lobatos–Lee reach. USGS 08251500 at Lobatos is the direct same-river gauge upstream of this access pair. The app uses a conservative preferred band ending at 1,500 cfs; flow scores are planning guidance, not a safety guarantee.',
  },
  accessPoints: [
    { name: 'Stateline BLM launch (in-channel marker at the state line)', latitude: 37, longitude: -105.71904882432432, id: 'rio-grande-ute-mountain-stateline-lee-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'BLM designates Stateline as an Ute Mountain launch/take-out; Southwest Paddler describes a public west-bank access trail here. The map pin is interpolated on the Rio Grande channel at the state boundary; locate the trail landing and parking separately before launching.' },
    { name: 'Lee Trail river landing (in-channel marker before steep carry)', latitude: 36.864295, longitude: -105.706712, id: 'rio-grande-ute-mountain-stateline-lee-take-out', mileFromStart: 13, segmentKind: 'transition', note: 'The map marker is on the mapped Rio Grande channel at the BLM-designated Lee Trail take-out. Carry boats and gear up the steep primitive quarter-mile trail to the rim; stage the vehicle at the Lee Trail parking area.' },
  ],
  logistics: {
    distanceLabel: 'About 13 river miles',
    estimatedPaddleTime: 'Plan a full 4–7 hour day with scouting, wind delays and the steep take-out carry',
    shuttle: 'Stage the take-out vehicle at Lee Trail, then drive north to the Stateline west-bank access. Confirm the primitive access approach and current road conditions before launching.',
    permits: 'BLM requires advance reservations for private boaters on the Ute Mountain segment and self-registration at the access station. The New Mexico reach is closed April–May; verify current launch limits and rules with the Taos Field Office.',
    camping: 'No overnight camp is assumed. BLM reports very few camping opportunities on the Ute Mountain reach and steep climbs to rim camps; use established campgrounds outside the route and verify access separately.',
    campingClassification: 'none',
    summary: 'A shorter New Mexico-only trip option within the Ute Mountain corridor; it shares the downstream section with the full Lobatos-to-Lee route.',
    accessCaveats: ['The Stateline pin is on the Rio Grande at the state line; the access trail and parking are on the west bank and must be located separately.', 'Use only BLM-designated launches, reserve in advance, and obey the April–May closure.', 'Lee Trail landing is followed by a steep primitive quarter-mile carry; verify trail and parking conditions.', 'No reliable mid-run road exits; arrange the shuttle and carry a conservative daylight and rescue plan.'],
    watchFor: ['At least 300 cfs planning minimum; compare the live Lobatos gauge with the route-specific flow notes', 'Erratic canyon wind, cold water and blind drops', 'Raptor closure, BLM reservation and limited camping', 'Steep Lee Trail gear carry and remote rescue delays'],
  },
  evidenceNotes: [
    { label: 'Named reach and public access', value: 'Stateline to Lee Trail; about 13 miles; Class II', note: 'BLM designates Stateline and Lee Trail on the Ute Mountain reach. Southwest Paddler describes a public west-bank Stateline access and the shorter 13-mile trip to Lee.', sourceUrl: segmentGuide.url },
    { label: 'Scored flow band', value: '300 cfs lower guard; 600–1,500 cfs preferred; 2,000 cfs upper scoring guard', note: 'The BLM 300 cfs minimum and American Whitewater reach-specific 600–2,000 cfs optimal user-preference assessment apply to the parent Ute Mountain reach. The preferred band is conservatively capped at 1,500 cfs using the route guide advanced/expert caution; not a safety guarantee.', sourceUrl: uteFlowStudy.url },
    { label: 'Direct same-river gauge', value: 'USGS 08251500 Rio Grande near Lobatos, Colorado', note: 'This station is upstream at the Lobatos launch on the same Ute Mountain flow corridor; recheck trend and BLM advice before the Stateline trip.', sourceUrl: lobatosGaugeGuide.url },
    { label: 'Water-entry anchors', value: 'Stateline channel marker to Lee Trail river landing', note: 'BLM names both as designated water access sites. The Stateline marker is interpolated on the Rio Grande NHD line at the state boundary, not on the west-bank trailhead; the Lee marker is on the Rio Grande channel before the required carry.', sourceUrl: segmentGuide.url },
  ],
};

const laJuntaRoute: River = {
  ...common,
  id: 'rio-grande-red-river-confluence-john-dunn',
  slug: 'rio-grande-red-river-confluence-john-dunn',
  state: 'New Mexico',
  region: 'Taos County / La Junta',
  reach: 'Red River confluence to John Dunn Bridge (La Junta)',
  scoreEligibility: 'scored',
  putIn: { name: 'Rio Grande at Red River confluence (water entry; carry from Little or Big Arsenic Trail)', latitude: 36.64794388, longitude: -105.69401268 },
  takeOut: { name: 'John Dunn Bridge river landing (water entry)', latitude: 36.5344718, longitude: -105.70955232 },
  latitude: 36.64794388,
  longitude: -105.69401268,
  summary: 'An 8.5-mile advanced Class II–III gorge run from the Red River confluence to John Dunn Bridge. Reach the water by carrying from an open Little or Big Arsenic trail; La Junta Trail remains closed.',
  statusText: 'This is an extremely hazardous, remote gorge trip for superior whitewater skills only. Register with BLM before launching, carry boats and gear down an open Arsenic trail, and check USGS 08263500, weather and current closures.',
  gaugeSource: { id: 'usgs-08263500', provider: 'usgs', siteId: '08263500', metric: 'discharge_cfs', unit: 'cfs', kind: 'direct', siteName: 'Rio Grande near Cerro, NM', detailUrl: laJuntaGaugeGuide.url },
  profile: {
    thresholdModel: 'two-sided',
    tooLow: 300,
    idealMin: 300,
    idealMax: 3000,
    tooHigh: 3000,
    thresholdSource: laJuntaFlowGuide,
    thresholdSourceStrength: 'community',
    rainfallSensitivity: 'medium',
    windSensitivity: 0.35,
    seasonMonths: [3, 4, 5, 6],
    seasonNotes: 'The best-known season is spring snowmelt, usually April–June. The river can be extremely cold, and flows can rise quickly; check the Cerro gauge, trend, weather and BLM notices immediately before departure.',
    difficulty: 'hard',
    difficultyNotes: 'BLM describes boating here as extremely hazardous and requiring superior skills, endurance and specialized equipment. The reach contains stout Class III drops, steep remote canyon walls and no dependable road exits; it is for experienced whitewater crews with rescue capability.',
    confidenceNotes: 'American Whitewater rates the exact Red River confluence–John Dunn reach Class II–III, 8.5 miles, and publishes a 300–3,000 cfs runnable band correlated to direct USGS 08263500. BLM documents the named La Junta reach and its hazards. The scored band is a route-planning cue, not a safety guarantee.',
  },
  safetyProfile: {
    riskLevel: 'advanced',
    reviewStatus: 'reviewed',
    hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'remote'],
    safetyNotes: [
      'BLM calls boating in this gorge extremely hazardous and requires superior whitewater skills and specialized equipment. This is not a beginner or casual float.',
      'Register with the Taos Field Office before launching. La Junta Trail is closed until further notice; use only an open Little or Big Arsenic trail to reach the confluence, and confirm current access before carrying boats and gear.',
      'The access carry is about one mile and steep (Little Arsenic drops about 760 feet; Big Arsenic about 680 feet). Carry sufficient water, footwear and gear for the return logistics; do not treat a rim overlook as river access.',
      'Scout the La Junta and Garapata rapids before committing. They include stout Class III drops, blind approaches and powerful hydraulics; portage whenever the team lacks a clear, safe line.',
      'Use fitted PFDs, helmets, cold-water protection, throw ropes, spare paddles, communication and a practiced group rescue plan. Cold water, long swims, canyon walls and limited exits can make small errors life-threatening.',
      'Check USGS 08263500, rising/falling trend, snowmelt, storms and BLM closures. AW’s 300–3,000 cfs range is not a guarantee that conditions are safe for a particular crew.',
    ],
  },
  sourceLinks: [laJuntaGuide, laJuntaSegments, laJuntaAmericanWhitewater, laJuntaTourism, laJuntaGaugeGuide],
  accessPoints: [
    { name: 'Rio Grande at Red River confluence (water entry; carry from Little or Big Arsenic Trail)', latitude: 36.64794388, longitude: -105.69401268, id: 'rio-grande-red-river-confluence-john-dunn-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'American Whitewater maps the route start on the Rio Grande at the Red River confluence. BLM says access to the confluence is currently available by hiking down Little or Big Arsenic Trails; La Junta Trail is closed. These trails are steep, one-mile carries, so stage at a currently open legal trailhead and carry all boats and gear to this on-water point.' },
    { name: 'John Dunn Bridge river landing (water entry)', latitude: 36.5344718, longitude: -105.70955232, id: 'rio-grande-red-river-confluence-john-dunn-take-out', mileFromStart: 8.5, segmentKind: 'transition', note: 'American Whitewater maps the takeout on the river at John Dunn Bridge, which BLM identifies as the La Junta takeout. Use the established landing and confirm current parking and river entry; this is also the upstream put-in for the separate Lower Taos Box route.' },
  ],
  logistics: {
    distanceLabel: 'About 8.5 river miles',
    estimatedPaddleTime: 'Plan a full daylight window for the access carry, scouting, rescue margin and shuttle',
    shuttle: 'Stage the take-out vehicle at John Dunn Bridge, then drive to an open Little or Big Arsenic trailhead and carry boats and gear about one mile to the confluence. Do not use the closed La Junta Trail.',
    permits: 'BLM requires all boaters to register with the Taos Field Office before launching. Confirm current trail access, registration, day-use fees and parking rules before travel.',
    camping: 'No overnight itinerary is assumed. BLM has established Wild Rivers campgrounds and primitive inner-gorge campsites near the access area; confirm site availability, reservations, fees and rules. Do not camp at unapproved river or rim locations.',
    campingClassification: 'nearby_basecamp',
    summary: 'Advanced day run with a steep boat carry and no dependable mid-gorge road exits; nearby BLM campsites require separate verification.',
    accessCaveats: ['La Junta Trail is closed until further notice; only use an open Little or Big Arsenic trail to reach the confluence.', 'The launch and takeout are on the river, separate from rim parking and overlooks.', 'Both access and rescue are strenuous; bring a team prepared for steep carries, cold water and remote self-rescue.', 'Check Cebolla Mesa and Miners Trail road conditions if considering any other designated access; roads may be impassable in rain.'],
    watchFor: ['USGS 08263500 and American Whitewater 300–3,000 cfs runnable reference', 'La Junta and Garapata Class III drops; scout and portage as needed', 'Cold water, rising snowmelt, storms and canyon wind', 'Closed trail, mandatory BLM registration, steep access carry and limited exits'],
  },
  evidenceNotes: [
    { label: 'Named reach and demand', value: 'Red River confluence to John Dunn Bridge; 8.5 miles; Class II–III', note: 'American Whitewater maps this exact run. New Mexico Tourism identifies the confluence-to-John Dunn segment as an eight-mile wilderness float and describes the public trail carry to the confluence.', sourceUrl: laJuntaAmericanWhitewater.url },
    { label: 'Scored flow range', value: '300–3,000 cfs runnable reference', note: 'American Whitewater’s current reach correlation uses USGS 08263500 and defines 300 cfs as the low runnable threshold and 3,000 cfs as the high runnable threshold. This is a planning cue, not a safety guarantee.', sourceUrl: laJuntaAmericanWhitewater.url },
    { label: 'Access and current closure', value: 'On-water confluence start; John Dunn Bridge takeout; La Junta Trail closed', note: 'BLM directs visitors to Little or Big Arsenic Trails for confluence access, describes the steep one-mile carries, requires boater registration, and warns that boating is extremely hazardous.', sourceUrl: laJuntaGuide.url },
    { label: 'Gauge', value: 'USGS 08263500 Rio Grande near Cerro, NM', note: 'American Whitewater correlates the reach-specific runnable thresholds with this live same-river gauge.', sourceUrl: laJuntaGaugeGuide.url },
  ],
};

export const newMexicoRioGrandeRoutes: River[] = [
  makeRoute({ id: 'rio-grande-taos-junction-quartzite', reach: 'Taos Junction Bridge to Quartzite River Access', putIn: { name: 'Taos Junction Bridge Boat Launch, Orilla Verde', latitude: 36.33569, longitude: -105.73386 }, takeOut: { name: 'Quartzite River Access', latitude: 36.265419, longitude: -105.795125 }, miles: 6.6, summary: 'A named Class II Orilla Verde reach from the Taos Junction Bridge to the Quartzite access near Pilar.', time: 'Allow 3–5 hours with shuttle and scouting time', note: 'American Whitewater identifies the large Taos Junction ramp and Quartzite take-out; BLM requires designated parking and day-use fees at managed recreation areas.', watch: ['Low-flow split channels below the ramp', 'Orilla Verde quiet zone and bridge hazards', 'Quartzite hand-carry access and cold water'] }),
  makeRoute({ id: 'rio-grande-taos-junction-lone-juniper', reach: 'Taos Junction Bridge to Lone Juniper Site', putIn: { name: 'Taos Junction Bridge Boat Launch, Orilla Verde', latitude: 36.33569, longitude: -105.73386 }, takeOut: { name: 'Lone Juniper Boat Takeout', latitude: 36.29953, longitude: -105.77248 }, miles: 4.8, summary: 'A shorter Orilla Verde day reach ending at the named Lone Juniper boat take-out and campground access.', time: 'Allow 2–4 hours with shuttle and scouting time', note: 'BLM lists Lone Juniper as a designated Orilla Verde take-out. Recreation-area fees, parking limits and hand-carry access apply; confirm current site status before launch.', watch: ['Class II current and changing wind', 'Hand-carry take-out and campground traffic', 'Private banks and quiet-zone rules'] }),
  makeRoute({ id: 'rio-grande-quartzite-county-line', reach: 'Quartzite River Access to County Line River Access (Racecourse)', putIn: { name: 'Quartzite River Access', latitude: 36.265419, longitude: -105.795125 }, takeOut: { name: 'County Line River Access', latitude: 36.2301, longitude: -105.8561 }, miles: 4.4, summary: 'The popular Class III Racecourse from Quartzite to the BLM County Line ramp along NM 68.', time: 'Allow 2–4 hours with shuttle, scouting and current-dependent stops', note: 'American Whitewater calls this New Mexico’s most popular whitewater run; BoaterBeta lists 200 cfs minimum and 3,000 cfs maximum planning flows. Park only in designated areas and leave room for commercial shuttles.', watch: ['Class III rapids and Souse Hole hydraulic', 'High-water bridge hazards above 4,000 cfs', 'Quartzite hand-carry launch and County Line parking rules'] }),
  makeRoute({ id: 'rio-grande-taos-junction-county-line', reach: 'Taos Junction Bridge to County Line River Access', putIn: { name: 'Taos Junction Bridge Boat Launch, Orilla Verde', latitude: 36.33569, longitude: -105.73386 }, takeOut: { name: 'County Line River Access', latitude: 36.2301, longitude: -105.8561 }, miles: 11.0, summary: 'A full Rio Grande del Norte day reach combining the Orilla Verde valley and Racecourse to the BLM County Line ramp.', time: 'Allow 5–8 hours with shuttle, scouting and current-dependent stops', note: 'Plan for the transition from Class II to Class III water at Quartzite and preserve the County Line hard take-out.' }),
  makeRoute({ id: 'rio-grande-lone-juniper-county-line', reach: 'Lone Juniper Site to County Line River Access (Racecourse)', putIn: { name: 'Lone Juniper Boat Takeout / launch access', latitude: 36.29953, longitude: -105.77248 }, takeOut: { name: 'County Line River Access', latitude: 36.2301, longitude: -105.8561 }, miles: 8.0, summary: 'A Racecourse-area reach from the managed Lone Juniper access through Quartzite to County Line.', time: 'Allow 4–6 hours with shuttle, scouting and current-dependent stops', note: 'Confirm Lone Juniper’s hand-carry launch suitability and preserve the Class III and County Line parking controls.' }),
  makeRoute({ id: 'rio-grande-lone-juniper-quartzite', reach: 'Lone Juniper Site to Quartzite River Access', putIn: { name: 'Lone Juniper Boat Takeout / launch access', latitude: 36.29953, longitude: -105.77248 }, takeOut: { name: 'Quartzite River Access', latitude: 36.265419, longitude: -105.795125 }, miles: 2.5, summary: 'A short Racecourse approach reach from Lone Juniper to the Quartzite hand-carry access.', time: 'Allow 1–3 hours with scouting and current-dependent stops', note: 'This short reach is still Class II–III moving water; confirm the Lone Juniper launch and Quartzite carry before departure.' }),
  {
    ...common,
    id: 'rio-grande-john-dunn-taos-junction',
    slug: 'rio-grande-john-dunn-taos-junction',
    scoreEligibility: 'planning',
    reach: 'John Dunn Bridge / Cebolla Mesa access to Taos Junction Bridge (Lower Taos Box)',
    putIn: { name: 'John Dunn Bridge / Cebolla Mesa access (water-entry edge)', latitude: 36.53455, longitude: -105.70969 },
    takeOut: { name: 'Taos Junction Bridge Boat Launch (water-entry edge)', latitude: 36.33569, longitude: -105.73386 },
    latitude: 36.53455,
    longitude: -105.70969,
    summary: 'The committing 15-mile Lower Taos Box through the Rio Grande del Norte gorge, a commercial-staple Class III–IV run for experienced whitewater crews.',
    statusText: 'Check USGS 08276500, snowmelt trend, wind, heat, BLM access and rescue logistics before committing; the gorge has few exits and no easy bailout.',
    profile: {
      ...common.profile,
      tooLow: 600,
      idealMin: 700,
      idealMax: 2500,
      tooHigh: 5000,
      thresholdSource: { label: 'Wilderness Portal Lower Taos Box guide', url: 'https://www.wildernessportal.com/routes/rio-grande-lower-taos-box', provider: 'local' as const },
      thresholdSourceStrength: 'community',
      difficulty: 'hard',
      difficultyNotes: 'Wilderness Portal and American Whitewater describe continuous Class III–IV water, a 31 ft/mi gradient and a committing gorge with few escapes. Run only with experienced boaters, suitable craft and a practiced rescue plan.',
      confidenceNotes: 'Wilderness Portal documents the 15-mile John Dunn/Cebolla Mesa to Taos Junction reach, Class III–IV character and 600 minimum / 700–2,500 classic / 5,000 maximum flow cues tied to direct USGS 08276500. Treat the community band as planning guidance, not a safety guarantee.',
      seasonNotes: 'Snowmelt usually peaks May–June; the Box becomes powerful at peak runoff and technical or bony as summer flows drop. Check weather, wind and closures immediately before launch.',
    },
    safetyProfile: {
      riskLevel: 'caution',
      reviewStatus: 'reviewed',
      hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'],
      safetyNotes: [
        'Use a fitted PFD, whitewater helmet, cold-water protection, throw bags, spare paddles, communication and a group rescue plan.',
        'Scout Ski Jump, Boat Reactor, Rock Garden and other named drops; the gorge has long swims, steep walls and few exits.',
        'Carry enough water and sun protection for an exposed desert canyon, and never rely on cell coverage or an unplanned hike-out.',
        'Use only the named BLM or managed access areas, confirm shuttle and parking logistics, and respect private-bank and quiet-zone boundaries.',
      ],
    },
    sourceLinks: [...common.sourceLinks, { label: 'Wilderness Portal Lower Taos Box guide', url: 'https://www.wildernessportal.com/routes/rio-grande-lower-taos-box', provider: 'local' as const }, { label: 'USGS Taos Junction gauge', url: gaugeGuide.url, provider: 'usgs' as const }],
    accessPoints: [
      { name: 'John Dunn Bridge / Cebolla Mesa access (water-entry edge)', latitude: 36.53455, longitude: -105.70969, id: 'rio-grande-john-dunn-taos-junction-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Wilderness Portal identifies the John Dunn/Cebolla Mesa start; confirm the steep trail, parking, BLM access and current water entry before unloading.' },
      { name: 'Taos Junction Bridge Boat Launch (water-entry edge)', latitude: 36.33569, longitude: -105.73386, id: 'rio-grande-john-dunn-taos-junction-take-out', mileFromStart: 15, segmentKind: 'transition', note: 'Large managed BLM launch at Taos Junction; stage the downstream vehicle and confirm the take-out, fees and current road conditions.' },
    ],
    logistics: {
      distanceLabel: 'About 15 river miles',
      estimatedPaddleTime: 'Allow a full 8–12 hour day with scouting, remote logistics and shuttle margin',
      shuttle: 'Stage the downstream vehicle at Taos Junction, then drive to the John Dunn Bridge / Cebolla Mesa access.',
      permits: 'Confirm BLM day-use, parking, shuttle and any current segment restrictions before departure.',
      camping: 'No overnight camping is included; use separately permitted BLM campgrounds or lodging and do not camp in the gorge without current authorization.',
      campingClassification: 'none',
      summary: 'A committing, expert-only Lower Taos Box day with no reliable mid-gorge bailout.',
      accessCaveats: ['Confirm the steep John Dunn/Cebolla Mesa trail and boat carry before committing.', 'No dependable mid-gorge road access; carry spare gear and plan self-rescue.', 'Do not extend beyond Taos Junction without a separate downstream access and hazard review.'],
      watchFor: ['USGS 08276500 and 600 cfs low guard', 'Class III–IV drops, long swims and canyon walls', 'Heat, wind, limited exits and BLM access rules'],
    },
    evidenceNotes: [
      { label: 'Named reach and distance', value: 'John Dunn Bridge / Cebolla Mesa to Taos Junction; 15 miles', note: 'Wilderness Portal documents the named Lower Taos Box reach, 31 ft/mi gradient, endpoint coordinates and Class III–IV character; American Whitewater and BLM provide the supporting corridor context.', sourceUrl: 'https://www.wildernessportal.com/routes/rio-grande-lower-taos-box' },
      { label: 'Scoring band', value: '600 cfs minimum; 700–2,500 cfs classic; 5,000 cfs maximum reference', note: 'Wilderness Portal ties these community cues to direct USGS 08276500 below Taos Junction. Verify live telemetry, trend, weather and local reports.', sourceUrl: 'https://www.wildernessportal.com/routes/rio-grande-lower-taos-box' },
      { label: 'Gauge', value: 'USGS 08276500 below Taos Junction Bridge', note: 'Direct Rio Grande telemetry for the Lower Taos Box corridor; recheck current observation and trend before launch.', sourceUrl: gaugeGuide.url },
      { label: 'Safety and access', value: 'Class III–IV committing gorge with few exits', note: 'Wilderness Portal and American Whitewater describe the technical character, remote access and need for experienced crews, suitable craft and self-rescue planning.', sourceUrl: whitewaterGuide.url },
    ],
  },
  uteMountainRoute,
  uteStatelineLeeRoute,
  laJuntaRoute,
];
