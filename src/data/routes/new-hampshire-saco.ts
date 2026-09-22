import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const wildernessGuide = { label: 'Wilderness Portal Saco River Bartlett to Cooks Crossing guide', url: 'https://www.wildernessportal.com/routes/saco-river-bartlett-to-cooks-crossing', provider: 'local' as const };
const accessGuide = { label: 'New Hampshire Saco-Swift River corridor management plan', url: 'https://www.des.nh.gov/sites/g/files/ehbemt341/files/documents/saco-swift-plan.pdf', provider: 'local' as const };
const whitewaterGuide = { label: 'American Whitewater Saco River Bartlett reach', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/1182/main', provider: 'local' as const };
const amcDayPaddles = { label: 'Appalachian Mountain Club Saco River day-paddle guide', url: 'https://www.outdoors.org/resources/amc-outdoors/destinations-travel/5-easy-day-paddles-on-the-saco-river/', provider: 'local' as const };
const townAccessRules = { label: 'Town of Conway public-use rules for Saco access parks', url: 'https://ecode360.com/29475968', provider: 'local' as const };
const gauge = { id: 'usgs-01064500', provider: 'usgs' as const, siteId: '01064500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Saco River near Conway, NH', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-01064500/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'];

export const newHampshireSacoRoutes: River[] = [{
  id: 'saco-river-bartlett-cooks-crossing',
  slug: 'saco-river-bartlett-cooks-crossing',
  name: 'Saco River',
  riverId: 'saco-river-new-hampshire',
  state: 'New Hampshire',
  region: 'Mount Washington Valley / Bartlett',
  routeType: 'recreational',
  scoreEligibility: 'scored',
  reach: 'Bartlett River Street access to Cooks Crossing access',
  putIn: { name: 'Bartlett River Street access (water-entry edge)', latitude: 44.08372, longitude: -71.28521 },
  takeOut: { name: 'Cooks Crossing area (exact public launch unverified)', latitude: 44.08979, longitude: -71.20563 },
  latitude: 44.08372,
  longitude: -71.28521,
  summary: 'A 5.3-mile White Mountain Saco River float through gentle Class I–II water, with sandy beaches, riffles and mountain scenery.',
  statusText: 'Check the Conway gauge, rainfall trend, weather and current Bartlett/Cooks Crossing access conditions before launch; strainers and cold water remain hazards.',
  gaugeSource: gauge,
  profile: {
    thresholdModel: 'two-sided',
    tooLow: 200,
    idealMin: 200,
    idealMax: 1000,
    tooHigh: 2000,
    thresholdSource: wildernessGuide,
    thresholdSourceStrength: 'community',
    rainfallSensitivity: 'high',
    windSensitivity: 0.05,
    seasonMonths: [5, 6, 7, 8, 9, 10],
    seasonNotes: 'The natural, rain-fed Saco responds quickly to mountain storms and drops through midsummer. Recheck the Conway gauge, trend and weather before departure.',
    difficulty: 'easy',
    difficultyNotes: 'Wilderness Portal and American Whitewater describe this as a gentle Class I–II canoe, kayak and raft reach. Shallow bends, sweepers and cold water still require active boat control.',
    confidenceNotes: 'Wilderness Portal documents the 5.3-mile Bartlett-to-Cooks Crossing reach, public route coordinates, Class I–II character and a 200–1,000 cfs float band with 2,000 cfs maximum reference tied to USGS 01064500 near Conway. Treat the community band as a planning cue, not a safety guarantee.',
  },
  safetyProfile: {
    riskLevel: 'caution',
    reviewStatus: 'reviewed',
    hazards,
    safetyNotes: [
      'Wear a properly fitted PFD and carry communication, offline navigation, spare layers and a throw rope.',
      'Scout outside bends for sweepers and strainers; channels shift after storms and wood can appear between trips.',
      'Cold mountain water and rain-driven rises can overwhelm casual swimmers even on easy water.',
      'Use only the named access areas, respect private shoreline and keep groups clear of swimmers and commercial traffic.',
    ],
  },
  sourceLinks: [wildernessGuide, accessGuide, whitewaterGuide, { label: 'USGS Conway Saco gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
  accessPoints: [
    { name: 'Bartlett River Street access (water-entry edge)', latitude: 44.08372, longitude: -71.28521, id: 'saco-river-bartlett-cooks-crossing-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Wilderness Portal identifies the Bartlett start; confirm public parking, carry and current water entry before unloading.' },
    { name: 'Cooks Crossing area (exact public launch unverified)', latitude: 44.08979, longitude: -71.20563, id: 'saco-river-bartlett-cooks-crossing-take-out', mileFromStart: 5.3, segmentKind: 'transition', note: 'The coordinate identifies the Cooks Crossing area, not a verified public launch. Confirm a lawful public landing, parking, and safe water-entry carry before use.' },
  ],
  logistics: {
    distanceLabel: 'About 5.3 river miles',
    estimatedPaddleTime: 'Allow 2–4 hours with current, breaks and access checks',
    shuttle: 'Stage the downstream vehicle at Cooks Crossing, then drive to the Bartlett River Street access.',
    permits: 'No permit is listed for this day reach; confirm local parking and access rules before unloading.',
    camping: 'No overnight camping is included; use established campgrounds and never camp on private banks or at an access landing.',
    campingClassification: 'none',
    summary: 'A short, scenic and popular White Mountain day float with a direct gauge and straightforward shuttle.',
    accessCaveats: ['Confirm both access areas and parking before launch; river-edge conditions change with storms.', 'Keep the group together around sweepers and shallow outside bends.', 'Respect private shoreline, swimmers and commercial users.'],
    watchFor: ['USGS 01064500 trend and 200 cfs low cue', 'Rain-driven rises and shifting sweepers', 'Cold water and access parking'],
  },
  evidenceNotes: [
    { label: 'Named reach and distance', value: 'Bartlett to Cooks Crossing; 5.3 miles', note: 'Wilderness Portal documents the route, distance, Class I–II character and endpoint coordinates; NH DES identifies the Saco as a managed public paddling corridor.', sourceUrl: wildernessGuide.url },
    { label: 'Scoring band', value: '200 cfs minimum; 200–1,000 cfs float band; 2,000 cfs maximum reference', note: 'Wilderness Portal ties these community cues to USGS 01064500 near Conway. Verify live telemetry, trend and storm conditions.', sourceUrl: wildernessGuide.url },
    { label: 'Gauge', value: 'USGS 01064500 Saco River near Conway', note: 'Direct Saco River telemetry for this Mount Washington Valley reach; recheck before travel.', sourceUrl: gauge.detailUrl },
    { label: 'Safety and access', value: 'Class I–II; sweepers, cold water and rain-driven rises', note: 'American Whitewater and Wilderness Portal describe the gentle reach and its real strainer/cold-water hazards; confirm public access and parking at both named areas.', sourceUrl: whitewaterGuide.url },
  ],
}];

const makeSacoExpansionRoute = (spec: {
  id: string;
  reach: string;
  putIn: NonNullable<River['putIn']>;
  takeOut: NonNullable<River['takeOut']>;
  miles: number;
  difficulty: 'easy' | 'moderate';
  summary: string;
  time: string;
  note: string;
  hazards: RouteHazard[];
}): River => {
  const base = newHampshireSacoRoutes[0];
  return {
    ...base,
    id: spec.id,
    slug: spec.id,
    reach: spec.reach,
    putIn: spec.putIn,
    takeOut: spec.takeOut,
    latitude: spec.putIn.latitude!,
    longitude: spec.putIn.longitude!,
    summary: spec.summary,
    statusText: 'Check USGS 01064500 discharge, trend, weather and current Conway access rules before launch; current, cold water, sweepers and crowding remain hazards.',
    profile: {
      ...base.profile!,
      difficulty: spec.difficulty,
      difficultyNotes: spec.difficulty === 'easy'
        ? 'AMC describes First Bridge to Davis Park as a popular Class I day paddle. Shallow water, current and cold mountain water still require active boat control.'
        : 'AMC describes Davis Park to Smith-Eastman as a short Class II reach with Conway Rips and Powerline Rapid. Take out before Powerline unless the group is comfortable with whitewater.',
      confidenceNotes: 'AMC documents the named endpoints, one-way distance and difficulty. The Town of Conway and NH public-access directory document the municipal water-entry sites; treat the community flow band as a planning cue, not a safety guarantee.',
    },
    safetyProfile: {
      ...base.safetyProfile!,
      hazards: spec.hazards,
      safetyNotes: [
        'Wear a properly fitted PFD and carry communication, offline navigation, spare layers and a throw rope.',
        spec.difficulty === 'moderate' ? 'Scout Conway Rips and Powerline Rapid; take out before Powerline unless the group is trained and equipped for Class II current.' : 'Expect shallow water and stronger current at high flow; do not rely on the route for upstream travel.',
        'Cold water, rain-driven rises and shifting sweepers can overwhelm swimmers even on a short reach.',
        'Use only the named municipal access parks, obey posted hours and parking rules, and respect private shoreline and swimmers.',
      ],
    },
    sourceLinks: [...(base.sourceLinks ?? []), amcDayPaddles, townAccessRules, { label: 'NH public-access boating directory', url: 'https://www.merrimackvalleypaddlers.com/access/public-access-2015.html', provider: 'local' as const }],
    accessPoints: [
      { ...spec.putIn, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition' as const, note: spec.note },
      { ...spec.takeOut, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition' as const, note: 'Confirm public parking, water entry, posted hours and a safe river landing before staging.' },
    ],
    logistics: {
      ...base.logistics!,
      distanceLabel: `About ${spec.miles} river miles`,
      estimatedPaddleTime: spec.time,
      shuttle: 'Stage the downstream vehicle at the named Conway public access, then drive to the upstream launch.',
      camping: 'No overnight camping is included; use established campgrounds and never camp on private banks or at an access landing.',
      campingClassification: 'none',
      summary: spec.summary,
      accessCaveats: ['Confirm posted municipal hours, parking and current water entry at both parks.', 'Respect private shoreline and never use a closed or unmarked landing.', 'Recheck the Conway gauge, rainfall trend and weather before departure.'],
      watchFor: spec.difficulty === 'moderate' ? ['USGS 01064500 trend and rain-driven rises', 'Conway Rips and Powerline Rapid', 'Cold water, swimmers and crowded access'] : ['USGS 01064500 trend and shallow bends', 'Rain-driven rises and shifting sweepers', 'Cold water, swimmers and crowded access'],
    },
    evidenceNotes: [
      { label: 'Named reach and distance', value: `${spec.reach}; ${spec.miles} miles`, note: 'Appalachian Mountain Club documents the named Saco itinerary, one-way distance and difficulty.', sourceUrl: amcDayPaddles.url },
      { label: 'Public water access', value: `${spec.putIn.name} to ${spec.takeOut.name}`, note: 'The Town of Conway lists both parks as public-use properties; the NH access directory supplies canoe-access and coordinate details for the municipal sites.', sourceUrl: townAccessRules.url },
      { label: 'Gauge and planning band', value: 'USGS 01064500; 200–1,000 cfs float band with 2,000 cfs upper reference', note: 'The direct Conway gauge and the existing Saco reach guide provide a conservative planning cue; verify live telemetry and trend before travel.', sourceUrl: gauge.detailUrl },
      { label: 'Safety and camping', value: spec.difficulty === 'moderate' ? 'Class II with Conway Rips and Powerline Rapid; day-use only' : 'Class I popular day paddle; day-use only', note: 'Follow AMC’s rapid and crowding guidance, wear PFDs, and use established campgrounds rather than private banks or access landings.', sourceUrl: amcDayPaddles.url },
    ],
  };
};

newHampshireSacoRoutes.push(
  makeSacoExpansionRoute({
    id: 'saco-river-first-bridge-davis-park',
    reach: 'First Bridge River Access Conservation Area to Davis Park',
    putIn: { name: 'First Bridge River Access Conservation Area, North Conway (water-entry edge)', latitude: 44.05704, longitude: -71.13699 },
    takeOut: { name: 'Davis Park public access, Conway (access-area anchor)', latitude: 43.98290003852706, longitude: -71.11596852920452 },
    miles: 8.5,
    difficulty: 'easy',
    summary: 'The popular 8.5-mile Class I Saco River day paddle from North Conway’s First Bridge to Davis Park.',
    time: 'Allow 4–6 hours with current, breaks, crowding and shuttle time',
    note: 'The Town of Conway identifies First Bridge as a public River Access Conservation Area; use the River Road parking lot and confirm the current carry to water before unloading.',
    hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'private_banks'],
  }),
  makeSacoExpansionRoute({
    id: 'saco-river-davis-park-smith-eastman',
    reach: 'Davis Park and Beach to Smith-Eastman Recreation Area',
    putIn: { name: 'Davis Park public access, Conway (access-area anchor)', latitude: 43.98290003852706, longitude: -71.11596852920452 },
    takeOut: { name: 'Smith-Eastman Recreation Area, Redstone Village (water-entry edge)', latitude: 44.000982, longitude: -71.083071 },
    miles: 2.5,
    difficulty: 'moderate',
    summary: 'A short 2.5-mile Class II Saco River reach linking Conway’s Davis Park and Smith-Eastman canoe launch.',
    time: 'Allow 1.5–3 hours with rapid scouting, access checks and shuttle time',
    note: 'Conway lists a canoe launch at this public town park. The NH public-water inventory point anchors the access site, not a surveyed water-entry edge; verify the signed launch path, hours and parking on arrival.',
    hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'],
  }),
  makeSacoExpansionRoute({
    id: 'saco-river-first-bridge-smith-eastman',
    reach: 'First Bridge River Access Conservation Area to Smith-Eastman Recreation Area',
    putIn: { name: 'First Bridge River Access Conservation Area, North Conway (water-entry edge)', latitude: 44.05704, longitude: -71.13699 },
    takeOut: { name: 'Smith-Eastman Recreation Area, Redstone Village (water-entry edge)', latitude: 44.000982, longitude: -71.083071 },
    miles: 11.0,
    difficulty: 'moderate',
    summary: 'A longer 11-mile Saco itinerary combining AMC’s First Bridge–Davis Park and Davis Park–Smith-Eastman day reaches, with Davis Park as an intermediate bailout.',
    time: 'Allow 6–9 hours with current, rapid scouting, crowding and shuttle time',
    note: 'The Town of Conway identifies First Bridge as a public River Access Conservation Area; use the River Road parking lot and confirm the current carry to water before unloading.',
    hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'],
  }),
  makeSacoExpansionRoute({
    id: 'saco-river-bartlett-davis-park',
    reach: 'Bartlett River Street access to Davis Park',
    putIn: { name: 'Bartlett River Street access (water-entry edge)', latitude: 44.08372, longitude: -71.28521 },
    takeOut: { name: 'Davis Park public access, Conway (access-area anchor)', latitude: 43.98290003852706, longitude: -71.11596852920452 },
    miles: 12.5,
    difficulty: 'easy',
    summary: 'A longer 12.5-mile Saco day trip from Bartlett through the Cooks Crossing corridor to Davis Park, with a documented intermediate bailout.',
    time: 'Allow 6–9 hours with current, breaks, crowding and shuttle time',
    note: 'This itinerary links the documented Bartlett-to-Cooks Crossing and First Bridge-to-Davis corridors. Use Cooks Crossing as an intermediate exit only if current access and parking are confirmed.',
    hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'private_banks'],
  }),
  makeSacoExpansionRoute({
    id: 'saco-river-bartlett-smith-eastman',
    reach: 'Bartlett River Street access to Smith-Eastman Recreation Area',
    putIn: { name: 'Bartlett River Street access (water-entry edge)', latitude: 44.08372, longitude: -71.28521 },
    takeOut: { name: 'Smith-Eastman Recreation Area, Redstone Village (water-entry edge)', latitude: 44.000982, longitude: -71.083071 },
    miles: 14.5,
    difficulty: 'moderate',
    summary: 'A 14.5-mile Saco itinerary linking the scenic Bartlett reach with the Conway Rips and Smith-Eastman take-out.',
    time: 'Allow 7–10 hours with current, rapid scouting, breaks and shuttle time',
    note: 'Use Cooks Crossing and Davis Park as documented intermediate exits; take out at Smith-Eastman before Powerline Rapid unless the group is trained and equipped for the feature.',
    hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'],
  }),
  makeSacoExpansionRoute({
    id: 'saco-river-cooks-crossing-davis-park',
    reach: 'Cooks Crossing access to Davis Park',
    putIn: { name: 'Cooks Crossing area (exact public launch unverified)', latitude: 44.08979, longitude: -71.20563 },
    takeOut: { name: 'Davis Park and Beach, Conway (water-entry edge)', latitude: 43.982113, longitude: -71.113689 },
    miles: 8.5,
    difficulty: 'easy',
    summary: 'An 8.5-mile Saco day reach from Cooks Crossing to Davis Park through the documented Conway access chain.',
    time: 'Allow 4–6 hours with current, breaks, crowding and shuttle time',
    note: 'This itinerary uses the documented Cooks Crossing and Davis Park public access areas; confirm a clear water entry and current parking at both sites before launch.',
    hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'private_banks'],
  }),
  makeSacoExpansionRoute({
    id: 'saco-river-cooks-crossing-smith-eastman',
    reach: 'Cooks Crossing access to Smith-Eastman Recreation Area',
    putIn: { name: 'Cooks Crossing area (exact public launch unverified)', latitude: 44.08979, longitude: -71.20563 },
    takeOut: { name: 'Smith-Eastman Recreation Area, Redstone Village (water-entry edge)', latitude: 44.000982, longitude: -71.083071 },
    miles: 10.5,
    difficulty: 'moderate',
    summary: 'A 10.5-mile Saco itinerary from Cooks Crossing to Smith-Eastman with Davis Park as an intermediate bailout before the Conway Rips.',
    time: 'Allow 5–8 hours with current, rapid scouting, breaks and shuttle time',
    note: 'Use Davis Park as the documented intermediate exit and take out before Powerline Rapid unless the group is trained and equipped for Class II current.',
    hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'],
  }),
  makeSacoExpansionRoute({
    id: 'saco-river-bartlett-first-bridge',
    reach: 'Bartlett River Street access to First Bridge River Access Conservation Area',
    putIn: { name: 'Bartlett River Street access (water-entry edge)', latitude: 44.08372, longitude: -71.28521 },
    takeOut: { name: 'First Bridge River Access Conservation Area, North Conway (water-entry edge)', latitude: 44.05704, longitude: -71.13699 },
    miles: 9.0,
    difficulty: 'easy',
    summary: 'A longer Saco River day reach linking the documented Bartlett access with the popular First Bridge public access near North Conway.',
    time: 'Allow 4–7 hours with current, breaks, crowding and shuttle time',
    note: 'Use Cooks Crossing as an intermediate public bailout, then continue to First Bridge only after confirming the River Road parking lot and water-entry carry.',
    hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'private_banks'],
  }),
  makeSacoExpansionRoute({
    id: 'saco-river-cooks-crossing-first-bridge',
    reach: 'Cooks Crossing access to First Bridge River Access Conservation Area',
    putIn: { name: 'Cooks Crossing area (exact public launch unverified)', latitude: 44.08979, longitude: -71.20563 },
    takeOut: { name: 'First Bridge River Access Conservation Area, North Conway (water-entry edge)', latitude: 44.05704, longitude: -71.13699 },
    miles: 4.0,
    difficulty: 'easy',
    summary: 'A compact Saco River day reach from Cooks Crossing to the popular First Bridge public access near North Conway.',
    time: 'Allow 2–4 hours with current, breaks, crowding and shuttle time',
    note: 'Confirm a clear Cooks Crossing carry and the River Road parking lot and water-entry path at First Bridge before launch; use only the named public accesses.',
    hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'private_banks'],
  }),
);
