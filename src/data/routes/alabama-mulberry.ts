import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const awGuide = { label: 'American Whitewater Upper Mulberry reach and gauge guidance', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/72/main', provider: 'american_whitewater' as const };
const accessGuide = { label: 'Outdoor Alabama Garden City River Park Mulberry Fork access', url: 'https://www.outdooralabama.com/articles/mulberry-fork-access-upgraded-garden-city-river-park', provider: 'local' as const };
const gauge = { id: 'usgs-02450000', provider: 'usgs' as const, siteId: '02450000', metric: 'gage_height_ft' as const, unit: 'ft' as const, kind: 'direct' as const, siteName: 'Mulberry Fork near Garden City, AL', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02450000' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'];

const cr10GardenCityRoute: River = {
  id: 'mulberry-fork-cr10-garden-city', slug: 'mulberry-fork-cr10-garden-city', name: 'Mulberry Fork', riverId: 'mulberry-fork-alabama', state: 'Alabama', region: 'Blount County / Garden City', routeType: 'recreational', scoreEligibility: 'scored', gaugeSource: gauge,
  reach: 'County Road 10 access to Garden City River Park / Old U.S. Highway 31',
  putIn: { name: 'County Road 10 Mulberry Fork access', latitude: 34.05430, longitude: -86.70646 },
  takeOut: { name: 'Garden City River Park kayak launch', latitude: 33.99667, longitude: -86.74964 },
  latitude: 34.05430, longitude: -86.70646,
  summary: 'A popular Upper Mulberry Fork Class I–II run from the County Road 10 access to the improved Garden City River Park launch.',
  statusText: 'American Whitewater says the Upper Mulberry becomes an option above 2 ft on the direct Garden City gauge. Community guidance treats about 4.5–6 ft as a stronger floating band; check stage, trend, rain, wood and access before launch.',
  profile: { thresholdModel: 'two-sided', tooLow: 2, idealMin: 4.5, idealMax: 6, tooHigh: 8, thresholdSource: awGuide, thresholdSourceStrength: 'community', rainfallSensitivity: 'high', windSensitivity: 0.1, seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'Rain-sensitive winter and spring whitewater; check the Garden City stage and trend immediately before committing.', difficulty: 'moderate', difficultyNotes: 'Class I–II wave trains with straightforward rapids, but low water scrapes and high or rising water magnifies strainers and hydraulics.', confidenceNotes: 'American Whitewater names the exact CR 10 to Garden City reach, Class I–II character, 19.8-mile full corridor and a direct gauge cue above 2 ft. The 4.5–6 ft preferred band is a conservative community reference for enjoyable floating; 8 ft is a review ceiling, not a safety guarantee.' },
  safetyProfile: { riskLevel: 'caution', reviewStatus: 'reviewed', hazards, safetyNotes: ['Wear a fitted PFD and carry communication, throw rope and offline navigation.', 'Scout wave trains, strainers and bridge debris; the Mulberry rises quickly after storms.', 'The CR 10 access has reported vehicle break-ins; secure vehicles and confirm current parking and carry conditions.', 'Use only the named access points and stay off private banks; take out at Garden City before continuing into the lower whitewater reach unless separately reviewed.'] },
  sourceLinks: [awGuide, accessGuide, { label: 'USGS 02450000 monitoring location', url: gauge.detailUrl, provider: 'usgs' as const }],
  accessPoints: [
    { id: 'mulberry-fork-cr10-garden-city-put-in', name: 'County Road 10 Mulberry Fork access', latitude: 34.05430, longitude: -86.70646, mileFromStart: 0, segmentKind: 'transition', note: 'American Whitewater identifies CR 10 as the usual Upper Mulberry start. Confirm current public carry, parking and security before unloading.' },
    { id: 'mulberry-fork-cr10-garden-city-take-out', name: 'Garden City River Park kayak launch', latitude: 33.99667, longitude: -86.74964, mileFromStart: 6.5, segmentKind: 'transition', note: 'Outdoor Alabama documents the improved park with paved parking, stairs and a kayak launch at the Mulberry Fork. Confirm hours and current waterline.' },
  ],
  logistics: { distanceLabel: 'Approximately 6.5 river miles', estimatedPaddleTime: 'Allow 3–6 hours with scouting and shuttle time', shuttle: 'Stage at Garden City River Park, then shuttle to CR 10; do not leave vehicles at unverified roadside pull-offs.', permits: 'Confirm current county-road access, park hours, parking and any local restrictions before launch.', camping: 'No river-bank camping is included. Use established campgrounds or lodging separately; the Garden City launch is day-use access.', campingClassification: 'none', summary: 'A popular Upper Mulberry day run with a direct stage gauge and public Garden City endpoint.', accessCaveats: ['Verify CR 10 public access and vehicle security on launch day.', 'Garden City River Park is the documented improved endpoint; do not substitute private banks.', 'Recheck gauge trend, rain, debris and daylight before committing.'], watchFor: ['USGS 02450000 stage and rapid rises', 'Low-water scraping, strainers and bridge debris', 'CR 10 parking security and Garden City park hours'] },
  evidenceNotes: [
    { label: 'Named reach', value: 'CR 10 to Garden City River Park, Upper Mulberry Fork, Class I–II', note: 'American Whitewater names the corridor and identifies CR 10 as the usual start and Garden City as the downstream endpoint.', sourceUrl: awGuide.url },
    { label: 'Scoring band', value: 'Above 2 ft runnable cue; 4.5–6 ft preferred; 8 ft review ceiling', note: 'The minimum cue is published by American Whitewater; the preferred band is conservative community guidance and must be checked against live conditions.', sourceUrl: awGuide.url },
    { label: 'Direct gauge', value: 'USGS 02450000 Mulberry Fork near Garden City', note: 'Direct stage telemetry at the downstream end of the selected reach.', sourceUrl: gauge.detailUrl },
    { label: 'Public endpoint', value: 'Garden City River Park kayak launch', note: 'Outdoor Alabama documents the upgraded park, paved parking, stairs and kayak launch.', sourceUrl: accessGuide.url },
  ],
};

export const alabamaMulberryRoutes: River[] = [cr10GardenCityRoute, {
  ...cr10GardenCityRoute,
  id: 'mulberry-fork-blountville-cr10', slug: 'mulberry-fork-blountville-cr10',
  reach: 'Blountville Road access to County Road 10 access',
  putIn: { name: 'Blountville Road Mulberry Fork access', latitude: 34.11636, longitude: -86.61509 },
  takeOut: { name: 'County Road 10 Mulberry Fork access', latitude: 34.05430, longitude: -86.70646 },
  latitude: 34.11636, longitude: -86.61509,
  summary: 'The upstream Upper Mulberry Fork section from Blountville Road to County Road 10, linking the documented public access sequence before the Garden City run.',
  statusText: 'American Whitewater says the Upper Mulberry becomes an option above 2 ft on the direct Garden City gauge. Check stage, trend, rain, wood and both access sites before launch.',
  accessPoints: [
    { name: 'Blountville Road Mulberry Fork access', latitude: 34.11636, longitude: -86.61509, id: 'mulberry-fork-blountville-cr10-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Riverfacts maps the Blountville Road access at the head of the Upper Mulberry reach. Confirm legal public carry, parking and current water entry.' },
    { name: 'County Road 10 Mulberry Fork access', latitude: 34.05430, longitude: -86.70646, id: 'mulberry-fork-blountville-cr10-take-out', mileFromStart: 12.5, segmentKind: 'transition', note: 'American Whitewater identifies CR 10 as the usual downstream access for the Upper Mulberry. Confirm parking and security before staging.' },
  ],
  logistics: { ...cr10GardenCityRoute.logistics!, distanceLabel: 'Approximately 12.5 river miles', estimatedPaddleTime: 'Allow 5–8 hours with scouting and shuttle time', summary: 'A longer Upper Mulberry day run from Blountville Road to CR 10.', accessCaveats: ['Verify both access sites and legal parking before unloading.', 'Take out at CR 10; the downstream Garden City reach is a separate reviewed route.', 'Recheck gauge trend, rain, debris and daylight.'] },
  evidenceNotes: [
    { label: 'Named reach', value: 'Blountville Road to CR 10, Upper Mulberry Fork, Class I–II', note: 'American Whitewater names the full Upper Mulberry corridor; Riverfacts maps the Blountville Road endpoint and the Alabama surface-water record identifies CR 10.', sourceUrl: awGuide.url },
    { label: 'Scoring band', value: 'Above 2 ft runnable cue; 4.5–6 ft preferred; 8 ft review ceiling', note: 'The gauge cue is published by American Whitewater; preferred bounds remain conservative planning references.', sourceUrl: awGuide.url },
    { label: 'Direct gauge', value: 'USGS 02450000 Mulberry Fork near Garden City', note: 'Direct stage telemetry for the connected Upper Mulberry corridor.', sourceUrl: gauge.detailUrl },
  ],
}, {
  ...cr10GardenCityRoute,
  id: 'mulberry-fork-blountville-garden-city', slug: 'mulberry-fork-blountville-garden-city',
  reach: 'Blountville Road access to Garden City River Park',
  putIn: { name: 'Blountville Road Mulberry Fork access', latitude: 34.11636, longitude: -86.61509 },
  takeOut: { name: 'Garden City River Park kayak launch', latitude: 33.99667, longitude: -86.74964 },
  latitude: 34.11636, longitude: -86.61509,
  summary: 'The full Upper Mulberry Fork day reach from Blountville Road through County Road 10 to the improved Garden City River Park launch.',
  statusText: 'American Whitewater says the Upper Mulberry becomes an option above 2 ft on the direct Garden City gauge. Check stage, trend, rain, wood and both public endpoints before launch.',
  accessPoints: [
    { name: 'Blountville Road Mulberry Fork access', latitude: 34.11636, longitude: -86.61509, id: 'mulberry-fork-blountville-garden-city-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Riverfacts maps the Blountville Road access at the head of the Upper Mulberry reach. Confirm legal public carry, parking and current water entry.' },
    { name: 'County Road 10 Mulberry Fork access', latitude: 34.05430, longitude: -86.70646, id: 'mulberry-fork-blountville-garden-city-intermediate', mileFromStart: 12.5, segmentKind: 'transition', note: 'American Whitewater identifies CR 10 as the usual intermediate access; use it as a bail-out only after confirming parking and security.' },
    { name: 'Garden City River Park kayak launch', latitude: 33.99667, longitude: -86.74964, id: 'mulberry-fork-blountville-garden-city-take-out', mileFromStart: 19, segmentKind: 'transition', note: 'Outdoor Alabama documents the improved park with paved parking, stairs and a kayak launch at the Mulberry Fork. Confirm hours and current waterline.' },
  ],
  logistics: { ...cr10GardenCityRoute.logistics!, distanceLabel: 'Approximately 19 river miles', estimatedPaddleTime: 'Allow 7–10 hours with scouting, breaks and shuttle time', summary: 'A full Upper Mulberry day reach linking Blountville Road, County Road 10 and Garden City River Park.', accessCaveats: ['Verify both endpoints and the CR 10 intermediate access before unloading.', 'Take out at Garden City before the separate lower whitewater corridor.', 'Recheck gauge trend, rain, debris and daylight.'] },
  evidenceNotes: [
    { label: 'Named reach', value: 'Blountville Road to Garden City River Park via CR 10, Upper Mulberry Fork, Class I–II', note: 'American Whitewater names the full Upper Mulberry corridor; Riverfacts maps Blountville Road and Outdoor Alabama documents the Garden City endpoint.', sourceUrl: awGuide.url },
    { label: 'Scoring band', value: 'Above 2 ft runnable cue; 4.5–6 ft preferred; 8 ft review ceiling', note: 'The gauge cue is published by American Whitewater; preferred bounds remain conservative planning references.', sourceUrl: awGuide.url },
    { label: 'Direct gauge', value: 'USGS 02450000 Mulberry Fork near Garden City', note: 'Direct stage telemetry for the connected Upper Mulberry corridor.', sourceUrl: gauge.detailUrl },
  ],
}];
