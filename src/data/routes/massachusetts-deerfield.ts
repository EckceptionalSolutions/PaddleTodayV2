import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const releaseGuide = { label: 'SafeWaters Fife Brook release schedule and live flow', url: 'https://www.safewaters.com/facility/fife-brook/', provider: 'local' as const };
const recreationGuide = { label: 'Deerfield River Watershed Association boating and tubing guidance', url: 'https://deerfieldriver.org/boating', provider: 'local' as const };
const accessGuide = { label: 'American Whitewater Deerfield access and reach guide', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/10162/main', provider: 'local' as const };
const gauge = { id: 'usgs-01168500', provider: 'usgs' as const, siteId: '01168500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Deerfield River at Charlemont, MA', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-01168500/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'dam', 'private_banks'];

const common = {
  name: 'Deerfield River', riverId: 'deerfield-river-massachusetts', state: 'Massachusetts', region: 'Franklin County / western Massachusetts', routeType: 'recreational' as const, scoreEligibility: 'scored' as const, gaugeSource: gauge,
  profile: { thresholdModel: 'two-sided' as const, tooLow: 125, idealMin: 800, idealMax: 1000, tooHigh: 1500, thresholdSource: releaseGuide, thresholdSourceStrength: 'community' as const, rainfallSensitivity: 'high' as const, windSensitivity: 0.05, seasonMonths: [4,5,6,7,8,9,10], seasonNotes: 'Fife Brook releases and storms can change the river quickly. Check the Charlemont gauge, SafeWaters schedule, dam notices and weather immediately before launch.', difficulty: 'moderate' as const, difficultyNotes: 'The selected reaches are popular moving-water runs with mostly Class I–II features and a Class III hazard at Zoar Gap. Routes end at named access points and do not include the Dryway or dam structures.', confidenceNotes: 'Deerfield River Watershed Association and American Whitewater identify the public access chain and popular reaches. SafeWaters publishes a 125 cfs base flow and scheduled 800 cfs releases; use the 800–1,000 cfs band as a community planning cue, never as a safety guarantee.' },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: ['Wear a Coast Guard-approved PFD and carry communication, throw rope and offline navigation.', 'Scout strainers, rocks and fast water; only experienced whitewater boaters should run Zoar Gap, and open boats or tubes should portage it.', 'Stay clear of Fife Brook and other dams; obey posted release warnings and use only named public access points.', 'Cold water and rapidly rising releases remain hazards even inside the published flow band.'] },
  sourceLinks: [releaseGuide, recreationGuide, accessGuide, { label: 'USGS Charlemont gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
};

function makeRoute(spec: { id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; miles: number; summary: string; time: string; note: string; watch?: string[] }): River {
  return { ...common, id: spec.id, slug: spec.id, reach: spec.reach, putIn: spec.putIn, takeOut: spec.takeOut, latitude: spec.putIn!.latitude!, longitude: spec.putIn!.longitude!, summary: spec.summary, statusText: 'Check the Charlemont gauge, Fife Brook release schedule and weather before launch; current, cold water and whitewater remain hazards.', accessPoints: [{ ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note }, { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm public parking, water entry and current access notices before staging.' }], logistics: { distanceLabel: `About ${spec.miles} river miles`, estimatedPaddleTime: spec.time, shuttle: 'Stage the downstream vehicle at the named public access, then drive to the upstream launch.', permits: 'Confirm current town, state, utility and day-use access rules before unloading.', camping: 'No overnight camping is included; use separately permitted campgrounds and never camp on private banks.', campingClassification: 'none', summary: spec.summary, accessCaveats: ['Use only the named public access points and existing paths.', 'Do not approach Fife Brook, Zoar or other dam structures.', 'Respect parking limits and private property along the corridor.'], watchFor: spec.watch ?? ['Scheduled releases and fast rises', 'Strainers, rocks and cold water', 'Whitewater features and limited exits'] }, evidenceNotes: [{ label: 'Access and reach', value: `${spec.reach}; ${spec.miles} miles`, note: 'Deerfield River Watershed Association and American Whitewater identify the named public access chain and popular reaches.', sourceUrl: recreationGuide.url }, { label: 'Scoring band', value: '125 cfs base flow; 800 cfs scheduled releases; 800–1,000 cfs community planning band', note: 'SafeWaters publishes the live Fife Brook flow and release schedule. Recheck the direct Charlemont gauge and local warnings before travel.', sourceUrl: releaseGuide.url }, { label: 'Gauge', value: 'USGS 01168500 Charlemont', note: 'Direct Deerfield gauge for the selected Charlemont corridor; verify telemetry and trend before launch.', sourceUrl: gauge.detailUrl }] };
}

export const massachusettsDeerfieldRoutes: River[] = [
  makeRoute({ id: 'deerfield-river-fife-brook-zoar-picnic', reach: 'Fife Brook Dam access to Zoar Picnic Area', putIn: { name: 'Fife Brook access below Fife Brook Dam, Florida (water-entry edge)', latitude: 42.68141, longitude: -72.97614 }, takeOut: { name: 'Zoar Picnic Area public access, Charlemont (refined water-entry edge)', latitude: 42.651505, longitude: -72.948609 }, miles: 7.0, summary: 'A popular upper Deerfield moving-water run from the Fife Brook access to the Zoar Picnic Area, ending above the Zoar Gap hazard.', time: 'Allow 3–5 hours with release timing and feature scouting', note: 'MassDFW and utility recreation materials identify the Fife Brook access; the coordinate is refined from the picnic-area anchor to the mapped river edge. Confirm the dam exclusion and launch stairs before unloading.', watch: ['Fife Brook release timing and dam exclusion', 'Class I–II rapids and strainers', 'Zoar Gap immediately downstream of the take-out'] }),
  makeRoute({ id: 'deerfield-river-zoar-picnic-shunpike', reach: 'Zoar Picnic Area to Route 2 Shunpike Rest Area', putIn: { name: 'Zoar Picnic Area public access, Charlemont (refined water-entry edge)', latitude: 42.651505, longitude: -72.948609 }, takeOut: { name: 'Route 2 Shunpike Rest Area, Charlemont (water-entry edge)', latitude: 42.63574, longitude: -72.90638 }, miles: 4.0, summary: 'The best-known Deerfield tubing and paddling reach from Zoar Picnic Area to the Route 2 Shunpike Rest Area, with a mandatory Zoar Gap skill check or portage.', time: 'Allow 2–4 hours with scouting, parking and shuttle time', note: 'Deerfield River Watershed Association identifies this as a popular section; the coordinate is refined from the picnic-area anchor to the mapped river edge. Zoar Gap is a distinct Class III hazard.', watch: ['Zoar Gap Class III: portage unless trained', 'Limited parking and seasonal toilets', 'Strainers, rocks and cold releases'] }),
  makeRoute({ id: 'deerfield-river-shunpike-east-charlemont', reach: 'Route 2 Shunpike Rest Area to East Charlemont Boat Ramp', putIn: { name: 'Route 2 Shunpike Rest Area, Charlemont (water-entry edge)', latitude: 42.63574, longitude: -72.90638 }, takeOut: { name: 'East Charlemont Boat Ramp (river-left public access)', latitude: 42.6188, longitude: -72.8220 }, miles: 12.0, summary: 'A longer lower Deerfield reach linking the Shunpike Rest Area with the documented East Charlemont public boat ramp.', time: 'Allow 4–7 hours with current, scouting and shuttle time', note: 'American Whitewater lists Shunpike as an intermediate access and East Charlemont as a public take-out; verify parking and water entry on arrival.', watch: ['Long reach with limited intermediate exits', 'Fast rises, strainers and private banks', 'Route 2 and East Charlemont access traffic'] }),
  makeRoute({ id: 'deerfield-river-fife-brook-shunpike', reach: 'Fife Brook Dam access to Route 2 Shunpike Rest Area', putIn: { name: 'Fife Brook access below Fife Brook Dam, Florida (water-entry edge)', latitude: 42.68141, longitude: -72.97614 }, takeOut: { name: 'Route 2 Shunpike Rest Area, Charlemont (water-entry edge)', latitude: 42.63574, longitude: -72.90638 }, miles: 11.0, summary: 'A full upper Deerfield day reach from the Fife Brook access to Shunpike, combining the popular release corridor above the Zoar Gap take-out.', time: 'Allow 5–8 hours with release timing and feature scouting', note: 'Use the Fife Brook access below the dam and end at Shunpike above the lower corridor; Zoar Gap requires a trained portage decision.', watch: ['Fife Brook release timing and dam exclusion', 'Zoar Gap Class III: portage unless trained', 'Long reach with limited exits'] }),
  makeRoute({ id: 'deerfield-river-zoar-picnic-east-charlemont', reach: 'Zoar Picnic Area to East Charlemont Boat Ramp', putIn: { name: 'Zoar Picnic Area public access, Charlemont (refined water-entry edge)', latitude: 42.651505, longitude: -72.948609 }, takeOut: { name: 'East Charlemont Boat Ramp (river-left public access)', latitude: 42.6188, longitude: -72.8220 }, miles: 16.0, summary: 'A longer lower Deerfield reach from Zoar Picnic through the Shunpike corridor to East Charlemont.', time: 'Allow 5–8 hours with current, scouting and shuttle time', note: 'The reach links two documented public accesses; confirm the Zoar-area launch, parking and East Charlemont landing before staging.', watch: ['Zoar Gap Class III: portage unless trained', 'Fast rises, strainers and private banks', 'Limited intermediate exits'] }),
  makeRoute({ id: 'deerfield-river-fife-brook-east-charlemont', reach: 'Fife Brook Dam access to East Charlemont Boat Ramp', putIn: { name: 'Fife Brook access below Fife Brook Dam, Florida (water-entry edge)', latitude: 42.68141, longitude: -72.97614 }, takeOut: { name: 'East Charlemont Boat Ramp (river-left public access)', latitude: 42.6188, longitude: -72.8220 }, miles: 23.0, summary: 'The longest selected Deerfield starter route, running from the Fife Brook release corridor to East Charlemont.', time: 'Allow 7–10 hours with release timing, scouting and shuttle time', note: 'Plan a full-day shuttle and keep the Fife Brook dam and Zoar Gap boundaries explicit; the route is for experienced moving-water paddlers.', watch: ['Fife Brook release timing and dam exclusion', 'Zoar Gap Class III: portage unless trained', 'Long reach and limited exits'] }),
];

const drywayReleaseGuide = { label: 'American Whitewater Dryway reach and release context', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/681/main', provider: 'american_whitewater' as const };
const drywayFlowGuide = { label: 'American Whitewater Deerfield whitewater release agreement', url: 'https://site-media.americanwhitewater.org/Document_523.pdf', provider: 'american_whitewater' as const };

export const massachusettsDeerfieldDrywayRoutes: River[] = [{
  ...common,
  id: 'deerfield-river-monroe-bridge-dunbar',
  slug: 'deerfield-river-monroe-bridge-dunbar',
  routeType: 'whitewater',
  reach: 'Deerfield Station No. 5 / Monroe Bridge launch to Dunbar Brook Picnic Area',
  putIn: { name: 'Deerfield Station No. 5 / Monroe Bridge launch (water-entry edge)', latitude: 42.721936, longitude: -72.938817 },
  takeOut: { name: 'Dunbar Brook Picnic Area whitewater take-out (water-entry edge)', latitude: 42.696041, longitude: -72.95311 },
  latitude: 42.721936,
  longitude: -72.938817,
  summary: 'A 2.5-mile upper Deerfield Dryway run from the Monroe Bridge release launch to the Dunbar Brook Picnic Area take-out.',
  statusText: 'Run only during a confirmed Monroe Bridge whitewater release. Check the Charlemont gauge, release notice, weather and local hazard reports; this Class III–IV reach has sieves, ledges and cold dam water.',
  profile: {
    thresholdModel: 'two-sided', tooLow: 700, idealMin: 900, idealMax: 1100, tooHigh: 1300,
    thresholdSource: drywayFlowGuide, thresholdSourceStrength: 'official', rainfallSensitivity: 'high', windSensitivity: 0.05,
    seasonMonths: [4,5,6,7,8,9,10], seasonNotes: 'The bypassed Dryway is generally too low between scheduled releases. Confirm the specific release date and arrival time before traveling.',
    difficulty: 'hard', difficultyNotes: 'American Whitewater rates Monroe Bridge to Bear Swamp Class III–IV. The route includes technical ledges, pin hazards and sieve risk; it is for trained whitewater paddlers with rescue leadership.',
    confidenceNotes: 'American Whitewater documents the 2.5-mile Monroe Bridge to Bear Swamp reach and the Monroe Bridge launch and Dunbar take-out. The American Whitewater release agreement documents 900–1,100 cfs releases for this Class IV section. The Charlemont USGS gauge is downstream and a timing/trend reference, not a local all-clear.',
  },
  safetyProfile: {
    riskLevel: 'caution', reviewStatus: 'reviewed', hazards: ['whitewater','cold_water','dam','strainers','fast_rise','private_banks'],
    safetyNotes: [
      'Wear a whitewater helmet, properly fitted PFD and cold-water protection; carry throw bags, rescue equipment, communication and offline navigation.',
      'Launch only after confirming the scheduled Monroe Bridge release and scouting the access. Never approach the dam, diversion works or fenced utility areas.',
      'Scout or portage Dragon’s Tooth, Labyrinth and every sieve, ledge or wood hazard outside the group’s skill. Keep the Dunbar take-out boundary explicit.',
      'The reach has limited exits and cold dam water. Do not rely on private banks for bailout or camping, and leave a daylight margin for rescue or a delayed shuttle.',
    ],
  },
  accessPoints: [
    { name: 'Deerfield Station No. 5 / Monroe Bridge launch (water-entry edge)', latitude: 42.721936, longitude: -72.938817, id: 'deerfield-river-monroe-bridge-dunbar-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'American Whitewater identifies the concrete launch below Station No. 5 Dam. Confirm the release, stair or slide condition and utility restrictions before unloading.' },
    { name: 'Dunbar Brook Picnic Area whitewater take-out (water-entry edge)', latitude: 42.696041, longitude: -72.95311, id: 'deerfield-river-monroe-bridge-dunbar-take-out', mileFromStart: 2.5, segmentKind: 'transition', note: 'American Whitewater identifies the take-out below Labyrinth where the access road reaches the river. Confirm the river-right landing, parking and current shuttle rules before launch.' },
  ],
  logistics: {
    distanceLabel: 'About 2.5 river miles', estimatedPaddleTime: 'Allow 2–4 hours with scouting, release timing and rescue margin',
    shuttle: 'Stage the vehicle at Dunbar Brook Picnic Area, then drive to the Monroe Bridge launch. Confirm the road, parking and release timing before committing.',
    permits: 'Confirm current utility, town and access rules; scheduled release access does not waive posted closures or dam exclusion zones.',
    camping: 'No overnight camping is included. Use separately permitted campgrounds or lodging; do not camp at the launch, take-out or on private utility land.', campingClassification: 'none',
    summary: 'A short, release-dependent Dryway segment with documented public launch and take-out.',
    accessCaveats: ['The Monroe Bridge launch is below a dam and may use a steep stair or boat slide; inspect it in daylight.', 'Dunbar is a shuttle parking and take-out area, not an invitation to continue below the authorized reach.', 'The Dryway is technical Class III–IV water with limited bailout options.'],
    watchFor: ['Confirmed 900–1,100 cfs release and Charlemont gauge trend', 'Ledges, sieves, pin hazards and wood', 'Cold dam water, utility boundaries and limited exits'],
  },
  evidenceNotes: [
    { label: 'Reach and public access', value: 'Monroe Bridge to Dunbar Brook; 2.5 miles', note: 'American Whitewater identifies the Monroe Bridge launch, Dunbar take-out and the 2.5-mile Dryway reach.', sourceUrl: drywayReleaseGuide.url },
    { label: 'Numeric release evidence', value: '900–1,100 cfs scheduled whitewater releases', note: 'American Whitewater’s release-agreement summary documents the Class IV Monroe Bridge release range. Use the published schedule and local warnings rather than treating the band as a safety guarantee.', sourceUrl: drywayFlowGuide.url },
    { label: 'Direct gauge reference', value: 'USGS 01168500 Charlemont', note: 'The direct Deerfield gauge is downstream of the Dryway; verify telemetry, trend and release timing before launch.', sourceUrl: gauge.detailUrl },
    { label: 'Take-out boundary', value: 'Dunbar Brook Picnic Area below Labyrinth', note: 'The take-out is the documented endpoint; utility fencing and unauthorized access continue downstream.', sourceUrl: 'https://massachusettspaddler.com/df8-sherman-dam-to-fife-brook-dam' },
  ],
  sourceLinks: [drywayReleaseGuide, drywayFlowGuide, { label: 'USGS Charlemont gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
}];

const lowerDeerfieldGauge = { id: 'usgs-01170000', provider: 'usgs' as const, siteId: '01170000', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Deerfield River near West Deerfield, MA', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-01170000/' };
const lowerDeerfieldGuide = { label: 'American Whitewater Wilcox Hollow to Stillwater Bridge reach', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/3812/main', provider: 'american_whitewater' as const };

export const massachusettsDeerfieldLowerRoutes: River[] = [{
  ...common,
  id: 'deerfield-river-wilcox-hollow-stillwater',
  slug: 'deerfield-river-wilcox-hollow-stillwater',
  gaugeSource: lowerDeerfieldGauge,
  reach: 'Wilcox Hollow to Stillwater Bridge (#2 Dam Section)',
  putIn: { name: 'Wilcox Hollow public access (water-entry edge)', latitude: 42.591012, longitude: -72.730603 },
  takeOut: { name: 'Stillwater Bridge public access (water-entry edge)', latitude: 42.52660077, longitude: -72.63244013 },
  latitude: 42.591012,
  longitude: -72.730603,
  summary: 'An eight-mile Class I–II Deerfield reach from Wilcox Hollow through the documented No. 2 station portage to Stillwater Bridge.',
  statusText: 'Check USGS 01170000, recent rain, wood and utility notices before launch. Take out above the No. 2 station dam and complete the documented portage; never run the facility.',
  profile: {
    thresholdModel: 'two-sided', tooLow: 400, idealMin: 400, idealMax: 20000, tooHigh: 20000,
    thresholdSource: lowerDeerfieldGuide, thresholdSourceStrength: 'community', rainfallSensitivity: 'high', windSensitivity: 0.05,
    seasonMonths: [4,5,6,7,8,9,10,11], seasonNotes: 'Spring and rain events raise the unregulated lower reach. Check the direct West Deerfield gauge, trend and weather before committing.',
    difficulty: 'moderate', difficultyNotes: 'American Whitewater rates the section Class I–II, with a strong Class II No. 2 Station rapid and a mandatory portage around the dam.',
    confidenceNotes: 'American Whitewater documents the 8-mile Wilcox Hollow to Stillwater Bridge reach, public endpoints, Class I–II difficulty and a 400 cfs low-runnable threshold at USGS 01170000. The 20,000 cfs upper bound is the published end-high-runnable value; local wood, bridge and dam conditions still control the decision.',
  },
  safetyProfile: {
    riskLevel: 'caution', reviewStatus: 'reviewed', hazards: ['low_water','fast_rise','cold_water','dam','strainers','private_banks'],
    safetyNotes: [
      'Wear a properly fitted PFD and carry communication, offline navigation and cold-water protection during spring or high-flow trips.',
      'Take out before the No. 2 station dam, follow the documented land portage and relaunch only at the established below-dam entry. Never approach the facility or ropes across the river.',
      'Scout the waterfall, No. 2 Station rapid, bridge debris and wood; portage any feature outside the group’s skill.',
      'Use only the named public accesses. Do not rely on railroad property, private banks or utility roads for bailout or camping.',
    ],
  },
  accessPoints: [
    { name: 'Wilcox Hollow public access (water-entry edge)', latitude: 42.591012, longitude: -72.730603, id: 'deerfield-river-wilcox-hollow-stillwater-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'American Whitewater identifies the Wilcox Hollow launch. Confirm the carry, parking and water entry before unloading.' },
    { name: 'No. 2 Station dam portage take-out', latitude: 42.56335, longitude: -72.68765, id: 'deerfield-river-wilcox-hollow-stillwater-portage', mileFromStart: 1.7, segmentKind: 'transition', note: 'Take out before the No. 2 station ropes and complete the documented 800-foot land portage around the facility.' },
    { name: 'Stillwater Bridge public access (water-entry edge)', latitude: 42.52660077, longitude: -72.63244013, id: 'deerfield-river-wilcox-hollow-stillwater-take-out', mileFromStart: 8, segmentKind: 'transition', note: 'American Whitewater identifies Stillwater Bridge as the eight-mile take-out. Confirm the landing and parking before staging.' },
  ],
  logistics: {
    distanceLabel: 'About 8 river miles plus one mandatory dam portage', estimatedPaddleTime: 'Allow 4–7 hours with the portage, scouting and shuttle time',
    shuttle: 'Stage the downstream vehicle at Stillwater Bridge, then drive to Wilcox Hollow. Allow daylight and extra time for the No. 2 Station portage.',
    permits: 'Confirm current town, utility and access rules. The documented portage does not authorize entry onto restricted facility property.',
    camping: 'No overnight camping is included. Use separately permitted campgrounds or lodging; do not camp at access points, portage areas or private banks.', campingClassification: 'none',
    summary: 'A direct-gauge lower Deerfield day run with a documented public access chain and mandatory No. 2 Station portage.',
    accessCaveats: ['Wilcox Hollow and Stillwater Bridge are mapped public access anchors; inspect the actual water-entry edge.', 'The No. 2 Station portage is mandatory and includes a steep, uneven carry; do not enter the power facility.', 'The river corridor includes railroad and private property; remain on lawful access paths.'],
    watchFor: ['USGS 01170000 trend and 400 cfs low-runnable threshold', 'No. 2 Station dam, ropes and portage', 'Waterfalls, Class II waves, strainers and cold water'],
  },
  evidenceNotes: [
    { label: 'Reach and access', value: 'Wilcox Hollow to Stillwater Bridge; 8 miles', note: 'American Whitewater documents the reach, public endpoints, Class I–II character and the No. 2 Station portage boundary.', sourceUrl: lowerDeerfieldGuide.url },
    { label: 'Numeric scoring evidence', value: '400 cfs low-runnable; 20,000 cfs end-high-runnable', note: 'American Whitewater’s live reach correlation publishes these bounds for USGS 01170000. Treat them as screening thresholds and verify local conditions.', sourceUrl: lowerDeerfieldGuide.url },
    { label: 'Direct telemetry', value: 'USGS 01170000 near West Deerfield', note: 'The direct gauge named by American Whitewater supplies the configured flow series for the lower Deerfield reach.', sourceUrl: lowerDeerfieldGauge.detailUrl },
    { label: 'Dam portage', value: 'No. 2 Station mandatory land portage', note: 'The published reach description requires a take-out before the facility and an approximately 800-foot portage before relaunching.', sourceUrl: lowerDeerfieldGuide.url },
  ],
  sourceLinks: [lowerDeerfieldGuide, { label: 'USGS West Deerfield gauge', url: lowerDeerfieldGauge.detailUrl, provider: 'usgs' as const }],
}];
