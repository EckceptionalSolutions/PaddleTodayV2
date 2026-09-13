import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const friendsGuide = { label: 'Friends of the Locust Fork River section guide', url: 'https://www.friendsofthelocustforkriver.org/river-guide.html', provider: 'local' as const };
const awGuide = { label: 'American Whitewater Locust Fork river index', url: 'https://www.americanwhitewater.org/content/River/view/river-index/state/USA-ALB', provider: 'american_whitewater' as const };
const gauge = { id: 'usgs-02455000', provider: 'usgs' as const, siteId: '02455000', metric: 'gage_height_ft' as const, unit: 'ft' as const, kind: 'direct' as const, siteName: 'Locust Fork near Cleveland, AL', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02455000/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'whitewater', 'private_banks', 'cold_water'];
const id = 'locust-fork-five-points-hwy-79';
const putIn = { name: 'Five Points Road public put-in', latitude: 34.0436987447, longitude: -86.4938163757 };
const takeOut = { name: 'Kings Bend Scenic Overlook Park / Highway 79 public take-out', latitude: 34.0236404659, longitude: -86.5732097626 };

const fivePointsToHwy79: River = {
  id, slug: id, name: 'Locust Fork', riverId: 'locust-fork-alabama', state: 'Alabama', region: 'Blount County', routeType: 'recreational', scoreEligibility: 'scored',
  reach: 'Five Points Road public put-in to Kings Bend Scenic Overlook Park at Highway 79',
  putIn, takeOut, latitude: putIn.latitude, longitude: putIn.longitude,
  summary: 'A source-mapped 10.2-mile Locust Fork float from the Five Points Road access through wooded bends and shoals to the protected Kings Bend Scenic Overlook Park take-out.',
  statusText: 'Use the direct Cleveland gauge and confirm stage, trend, rainfall, wood and both public access sites before launch. The 1.5–2.2 ft band is a planning cue, not a safety guarantee.',
  gaugeSource: gauge,
  profile: {
    thresholdModel: 'two-sided', tooLow: 1.4, idealMin: 1.8, idealMax: 2.4, tooHigh: 3.0, thresholdSource: friendsGuide, thresholdSourceStrength: 'community',
    rainfallSensitivity: 'high', windSensitivity: 0.1, seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    seasonNotes: 'The Locust Fork responds quickly to rainfall. Low stages expose shoals; rising water increases current, bridge and strainer hazards.', difficulty: 'moderate',
    difficultyNotes: 'Friends of the Locust Fork rates this section Difficulty 2 with one waterfall and two Class II rapids. Scout the waterfall and portage if the group is not equipped for it.',
    confidenceNotes: 'The Friends of the Locust Fork guide names Five Points Road, Kings Bend Scenic Overlook Park, a 10.2-mile section, Class II character, the 1.5 ft float minimum and the 2 ft easy-float cue. Its linked public map supplies endpoint coordinates. The 1.8–2.4 ft preferred band and 3 ft review ceiling are conservative planning guards; confirm the direct USGS 02455000 stage and local reports.',
  },
  safetyProfile: { riskLevel: 'caution', reviewStatus: 'reviewed', hazards, safetyNotes: [
    'Wear a properly fitted PFD and carry offline navigation, communication, throw rope, water and weather protection.',
    'At low stages expect scraping and exposed shoals; at higher stages the waterfall, bridge debris and rapids become more consequential.',
    'Scout the named waterfall and all unfamiliar rapids from shore. Portage anything outside the group’s skill level.',
    'Use only the documented Five Points Road and Kings Bend Park accesses. Private Slick Ford and Kings Bend put-ins shown on the map are not included.',
  ] },
  sourceLinks: [friendsGuide, awGuide, { label: 'USGS 02455000 monitoring location', url: gauge.detailUrl, provider: 'usgs' as const }],
  accessPoints: [
    { ...putIn, id: `${id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: 'Friends of the Locust Fork identifies the Five Points Road dirt access as an easy public put-in. Confirm current parking and the short carry before unloading.' },
    { ...takeOut, id: `${id}-take-out`, mileFromStart: 10.2, segmentKind: 'transition', note: 'Friends of the Locust Fork identifies Kings Bend Scenic Overlook Park at Highway 79/231 as the public take-out with a built Grand Staircase. Confirm park hours and the waterline.' },
  ],
  logistics: {
    distanceLabel: 'About 10.2 river miles', estimatedPaddleTime: 'Allow 5–8 hours with the waterfall portage, scouting and shuttle',
    shuttle: 'Stage the downstream Kings Bend Scenic Overlook Park vehicle first, then shuttle to Five Points Road. Keep vehicles at the named public sites.',
    permits: 'Confirm current Blount County park rules, road access and parking before launch. Do not use private map markers without permission.',
    camping: 'This is a day-use route. No on-route overnight campsite is documented; use established lodging or campgrounds separately.', campingClassification: 'none',
    summary: 'A documented public-access Locust Fork Class II day reach with a direct Cleveland gauge.',
    accessCaveats: ['Five Points Road is a dirt access and may be muddy after rain.', 'Kings Bend is a steep but improved park take-out; allow time to carry boats up the Grand Staircase.', 'The downstream Swann whitewater corridor is outside this route and requires separate review.'],
    watchFor: ['USGS 02455000 stage and rapid rises', 'Cornelius Falls and the two Class II rapids', 'Strainers, bridge debris and low-water scraping', 'Private banks and closed or unmarked access points'],
  },
  evidenceNotes: [
    { label: 'Named reach and distance', value: 'Five Points Road to Kings Bend Scenic Overlook Park; 10.2 miles; Difficulty 2', note: 'Friends of the Locust Fork River documents the section, public endpoints, one waterfall and two Class II rapids.', sourceUrl: friendsGuide.url },
    { label: 'Scoring band', value: '1.5 ft minimum; about 2 ft easy float; 1.8–2.4 ft preferred planning band', note: 'The source publishes the minimum and easy-float cues; preferred bounds are conservative product planning guards.', sourceUrl: friendsGuide.url },
    { label: 'Direct gauge', value: 'USGS 02455000 Locust Fork near Cleveland', note: 'USGS provides direct stage telemetry for the selected corridor.', sourceUrl: gauge.detailUrl },
    { label: 'Public endpoint verification', value: 'Five Points Road and Kings Bend Scenic Overlook Park', note: 'The linked Friends of the Locust Fork map marks both public access points; private map markers are explicitly excluded.', sourceUrl: friendsGuide.url },
  ],
};

const fivePointsToTaylorFord: River = {
  ...fivePointsToHwy79,
  id: 'locust-fork-five-points-taylor-ford', slug: 'locust-fork-five-points-taylor-ford',
  reach: 'Five Points Road public put-in to Taylor Ford Road public take-out',
  takeOut: { name: 'Taylor Ford Road public take-out', latitude: 34.0475391507, longitude: -86.5275478363 },
  summary: 'A short 3-mile Locust Fork float from the documented Five Points Road access to the public Taylor Ford Road take-out, useful for a lower-commitment day on the upper section.',
  statusText: 'Use the direct Cleveland gauge and confirm stage, trend, rainfall, wood and both public access sites before launch. The 1.5–2.2 ft band is a planning cue, not a safety guarantee.',
  profile: { ...fivePointsToHwy79.profile!, difficulty: 'easy', difficultyNotes: 'The Friends of the Locust Fork map describes the Five Points/Camp Branch to Taylor Ford segment as approximately 3 miles with public put-in/take-out access; expect easy moving water and small shoals, with normal river hazards.' },
  accessPoints: [
    { ...putIn, id: 'locust-fork-five-points-taylor-ford-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Friends of the Locust Fork identifies the Five Points Road dirt access as an easy public put-in. Confirm current parking and the short carry before unloading.' },
    { name: 'Taylor Ford Road public take-out', latitude: 34.0475391507, longitude: -86.5275478363, id: 'locust-fork-five-points-taylor-ford-take-out', mileFromStart: 3, segmentKind: 'transition', note: 'The linked Friends of the Locust Fork map marks Taylor Ford Road as a public put-in/take-out. Confirm current parking and the river landing before staging.' },
  ],
  logistics: { ...fivePointsToHwy79.logistics!, distanceLabel: 'About 3 river miles', estimatedPaddleTime: 'Allow 2–3 hours with access checks and shuttle', shuttle: 'Stage at Taylor Ford Road, then shuttle to Five Points Road. Keep vehicles at the named public sites.', summary: 'A short public-access upper Locust Fork float for a lower-commitment outing.', accessCaveats: ['Five Points Road is a dirt access and may be muddy after rain.', 'Confirm Taylor Ford Road parking and water entry; do not substitute private map markers.', 'The longer downstream reach and waterfall are outside this short route.'] },
  evidenceNotes: [
    { label: 'Named reach and distance', value: 'Five Points Road to Taylor Ford Road; approximately 3 miles', note: 'The Friends of the Locust Fork linked section map labels both public access points and the 3-mile Cold Branch/Five Points to Taylor Ford segment.', sourceUrl: friendsGuide.url },
    { label: 'Scoring band', value: '1.5 ft minimum; about 2 ft easy float; 1.8–2.4 ft preferred planning band', note: 'The source publishes the minimum and easy-float cues for the connected section; preferred bounds are conservative product planning guards.', sourceUrl: friendsGuide.url },
    { label: 'Direct gauge', value: 'USGS 02455000 Locust Fork near Cleveland', note: 'USGS provides direct stage telemetry for the selected corridor.', sourceUrl: gauge.detailUrl },
    { label: 'Public endpoint verification', value: 'Five Points Road and Taylor Ford Road', note: 'The linked Friends of the Locust Fork map marks both as public put-in/take-out points.', sourceUrl: friendsGuide.url },
  ],
};

const county14ToColdBranch: River = {
  ...fivePointsToHwy79,
  id: 'locust-fork-county-14-cold-branch', slug: 'locust-fork-county-14-cold-branch',
  reach: 'County Highway 14 public put-in to Cold Branch Road public take-out',
  putIn: { name: 'County Highway 14 public put-in', latitude: 34.1142206655, longitude: -86.4388847351 },
  takeOut: { name: 'Cold Branch Road public take-out', latitude: 34.0438409851, longitude: -86.4936447144 },
  latitude: 34.1142206655, longitude: -86.4388847351,
  summary: 'A source-mapped 10-mile easy Locust Fork float from the County Highway 14 bridge to the gradual Cold Branch Road take-out, with small shoals and wooded banks.',
  profile: { ...fivePointsToHwy79.profile!, difficulty: 'easy', difficultyNotes: 'Friends of the Locust Fork describes the County Highway 14 to Cold Branch corridor as a pleasant easy run with frequent small shoals. The Cold Branch take-out has a gradual dirt bank and short carry.' },
  accessPoints: [
    { name: 'County Highway 14 public put-in', latitude: 34.1142206655, longitude: -86.4388847351, id: 'locust-fork-county-14-cold-branch-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Friends of the Locust Fork identifies the County Highway 14 bridge in Snead as a good access. Confirm river-right carry, parking and current water entry.' },
    { name: 'Cold Branch Road public take-out', latitude: 34.0438409851, longitude: -86.4936447144, id: 'locust-fork-county-14-cold-branch-take-out', mileFromStart: 10, segmentKind: 'transition', note: 'The source guide identifies Cold Branch Road as an easy take-out with a gradual dirt bank and short carry. Confirm parking and road conditions.' },
  ],
  logistics: { ...fivePointsToHwy79.logistics!, distanceLabel: 'About 10 river miles', estimatedPaddleTime: 'Allow 5–7 hours with small-shoal maneuvering and shuttle', shuttle: 'Stage at Cold Branch Road, then shuttle to County Highway 14. Keep vehicles at the named public access sites.', summary: 'An easy public-access upper Locust Fork day reach with frequent small shoals.', accessCaveats: ['County Highway 14 and Cold Branch Road are road accesses; confirm legal parking and short carries.', 'The County Highway 26 bridge is an intermediate access but is not used as the take-out.', 'The downstream Five Points and Kings Bend sections are separate routes.'] },
  evidenceNotes: [
    { label: 'Named reach and distance', value: 'County Highway 14 to Cold Branch Road; 10 miles; Difficulty 1', note: 'Friends of the Locust Fork River documents the public endpoints, 8-mile Highway 14-to-26 section plus 2 miles to Cold Branch, and easy Cold Branch carry.', sourceUrl: friendsGuide.url },
    { label: 'Scoring band', value: '1.4 ft minimum; about 2 ft easy float; 1.8–2.4 ft preferred planning band', note: 'The guide publishes the minimum and easy-float cues for this corridor; preferred bounds are conservative product planning guards.', sourceUrl: friendsGuide.url },
    { label: 'Direct gauge', value: 'USGS 02455000 Locust Fork near Cleveland', note: 'USGS provides direct stage telemetry for the connected Locust Fork corridor.', sourceUrl: gauge.detailUrl },
    { label: 'Public endpoint verification', value: 'County Highway 14 and Cold Branch Road', note: 'The linked Friends of the Locust Fork section map marks both access points and describes their water-entry carries.', sourceUrl: friendsGuide.url },
  ],
};

const swannToNectar: River = {
  ...fivePointsToHwy79,
  id: 'locust-fork-swann-nectar', slug: 'locust-fork-swann-nectar',
  reach: 'Swann Covered Bridge public put-in to Covered Bridge Road near Nectar public take-out',
  putIn: { name: 'Swann Covered Bridge public put-in', latitude: 33.9974579923, longitude: -86.6014051437 },
  takeOut: { name: 'Covered Bridge Road near Nectar public take-out', latitude: 33.9567808947, longitude: -86.6255664825 },
  latitude: 33.9974579923, longitude: -86.6014051437,
  summary: 'A source-mapped 4.1-mile Locust Fork section from the historic Swann Covered Bridge to the Covered Bridge Road take-out near Nectar, with wooded banks, bluffs and the named Powell Falls.',
  statusText: 'Use the direct Cleveland gauge and confirm stage, trend, rainfall, wood and both public access sites before launch. The 1.6–2.2 ft band is a planning cue; scout or portage Powell Falls.',
  profile: { ...fivePointsToHwy79.profile!, idealMin: 1.8, idealMax: 2.2, tooHigh: 2.8, difficulty: 'moderate', difficultyNotes: 'Friends of the Locust Fork rates this section Difficulty 1–2 and documents an 8-foot waterfall that must be run only after scouting or portaged on the safe side. Higher stages increase hydraulics and bridge or strainer risk.' },
  accessPoints: [
    { name: 'Swann Covered Bridge public put-in', latitude: 33.9974579923, longitude: -86.6014051437, id: 'locust-fork-swann-nectar-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Friends of the Locust Fork identifies easy parking and a beach at Swann Covered Bridge. Confirm the carry and current water entry.' },
    { name: 'Covered Bridge Road near Nectar public take-out', latitude: 33.9567808947, longitude: -86.6255664825, id: 'locust-fork-swann-nectar-take-out', mileFromStart: 4.1, segmentKind: 'transition', note: 'The linked section map marks Covered Bridge Road near Nectar as a public put-in/take-out with a short gradual carry. Confirm limited parking and keep the dirt road clear.' },
  ],
  logistics: { ...fivePointsToHwy79.logistics!, distanceLabel: 'About 4.1 river miles', estimatedPaddleTime: 'Allow 3–5 hours with Powell Falls scouting or portage and shuttle', shuttle: 'Stage at Covered Bridge Road near Nectar, then shuttle to Swann Covered Bridge. Keep vehicles at the named public sites.', summary: 'A scenic public-access Locust Fork day section with a mandatory waterfall scout.', accessCaveats: ['Swann Bridge parking is public but confirm the current carry and site conditions.', 'Covered Bridge Road parking is limited; do not block the dirt road.', 'Powell Falls is outside the group’s skill level unless scouted and runnable; portage on the right when needed.'] },
  evidenceNotes: [
    { label: 'Named reach and distance', value: 'Swann Covered Bridge to Covered Bridge Road near Nectar; 4.1 miles; Difficulty 1–2', note: 'Friends of the Locust Fork River documents the public endpoints, scenic bluffs, Powell Falls and the section length.', sourceUrl: friendsGuide.url },
    { label: 'Scoring band', value: '1.6 ft low-water cue; 1.8–2.2 ft preferred planning band; 2.8 ft review ceiling', note: 'The guide publishes the low-water cue and warns about higher stages; preferred bounds are conservative product planning guards.', sourceUrl: friendsGuide.url },
    { label: 'Direct gauge', value: 'USGS 02455000 Locust Fork near Cleveland', note: 'USGS provides direct stage telemetry for the connected Locust Fork corridor.', sourceUrl: gauge.detailUrl },
    { label: 'Public endpoint verification', value: 'Swann Covered Bridge and Covered Bridge Road near Nectar', note: 'The linked Friends of the Locust Fork section map marks both public access points and describes their parking and carries.', sourceUrl: friendsGuide.url },
  ],
};

const taylorFordToHwy79: River = {
  ...fivePointsToHwy79,
  id: 'locust-fork-taylor-ford-hwy-79', slug: 'locust-fork-taylor-ford-hwy-79',
  reach: 'Taylor Ford Road public put-in to Kings Bend Scenic Overlook Park at Highway 79 public take-out',
  putIn: { name: 'Taylor Ford Road public put-in', latitude: 34.0475391507, longitude: -86.5275478363 },
  takeOut: { name: 'Kings Bend Scenic Overlook Park / Highway 79 public take-out', latitude: 34.0236404659, longitude: -86.5732097626 },
  latitude: 34.0475391507, longitude: -86.5275478363,
  summary: 'A source-mapped approximately 7-mile Locust Fork section from Taylor Ford Road to Kings Bend Scenic Overlook Park, including the downstream Class II features and waterfall described for the connected guide section.',
  statusText: 'Use the direct Cleveland gauge and confirm stage, trend, rainfall, wood and both public access sites before launch. The 1.8–2.4 ft band is a planning cue; scout Powell Falls and other named features.',
  profile: { ...fivePointsToHwy79.profile!, idealMin: 1.8, idealMax: 2.4, tooHigh: 2.8, difficulty: 'moderate', difficultyNotes: 'The connected Friends of the Locust Fork guide rates the reach Difficulty 2 and documents a waterfall and Class II rapids. Scout all features and portage anything outside the group’s skill level.' },
  accessPoints: [
    { name: 'Taylor Ford Road public put-in', latitude: 34.0475391507, longitude: -86.5275478363, id: 'locust-fork-taylor-ford-hwy-79-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'The linked Friends of the Locust Fork map marks Taylor Ford Road as a public put-in/take-out. Confirm current parking and the river landing before unloading.' },
    { name: 'Kings Bend Scenic Overlook Park / Highway 79 public take-out', latitude: 34.0236404659, longitude: -86.5732097626, id: 'locust-fork-taylor-ford-hwy-79-take-out', mileFromStart: 7, segmentKind: 'transition', note: 'Friends of the Locust Fork identifies Kings Bend Scenic Overlook Park at Highway 79/231 as the public take-out with a built Grand Staircase. Confirm park hours and waterline.' },
  ],
  logistics: { ...fivePointsToHwy79.logistics!, distanceLabel: 'About 7 river miles', estimatedPaddleTime: 'Allow 4–6 hours with feature scouting, possible portage and shuttle', summary: 'A source-mapped Taylor Ford to Kings Bend public Locust Fork reach.', accessCaveats: ['Taylor Ford is a mapped public road access; confirm the current carry and parking.', 'Kings Bend is a steep but improved park take-out; allow time to carry boats up the Grand Staircase.', 'The downstream Swann whitewater corridor is outside this route and requires separate review.'] },
  evidenceNotes: [
    { label: 'Named reach and distance', value: 'Taylor Ford Road to Kings Bend Scenic Overlook Park; approximately 7 miles; Difficulty 2', note: 'Friends of the Locust Fork River section guide and linked map document Taylor Ford, Kings Bend, the connected 10.2-mile section and its waterfall/Class II features.', sourceUrl: friendsGuide.url },
    { label: 'Scoring band', value: '1.8–2.4 ft preferred planning band; 2.8 ft review ceiling', note: 'The guide publishes the connected section’s minimum and easy-float cues and warns about higher stages; these bounds are conservative planning guards.', sourceUrl: friendsGuide.url },
    { label: 'Direct gauge', value: 'USGS 02455000 Locust Fork near Cleveland', note: 'USGS provides direct stage telemetry for the connected Locust Fork corridor.', sourceUrl: gauge.detailUrl },
    { label: 'Public endpoint verification', value: 'Taylor Ford Road and Kings Bend Scenic Overlook Park', note: 'The linked Friends of the Locust Fork map marks both public access points.', sourceUrl: friendsGuide.url },
  ],
};

export const alabamaLocustForkRoutes: River[] = [fivePointsToHwy79, fivePointsToTaylorFord, county14ToColdBranch, swannToNectar, taylorFordToHwy79];
