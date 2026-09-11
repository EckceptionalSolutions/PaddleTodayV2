import type { River } from '../../lib/types';

const id = 'lynches-river-indigo-wicklow';
const guide = { label: 'SCDNR Lynches Scenic River Water Trail Guide', url: 'https://www.dnr.sc.gov/assets/maps/LynchesRiverGuideLowRes.pdf', provider: 'local' as const };
const access = 'https://experience.arcgis.com/experience/2352618096134f5ca6d1acc363f2592f';
const putIn = { name: 'Indigo Landing', latitude: 33.95374434, longitude: -79.67905224 };
const takeOut = { name: 'Wicklow Landing above US 378', latitude: 33.92109575, longitude: -79.65696065 };

export const southCarolinaRoutes: River[] = [{
  id, slug: id, name: 'Lynches River', riverId: 'lynches-river', state: 'South Carolina', region: 'Pee Dee / Florence County',
  reach: 'Indigo Landing to Wicklow Landing', latitude: putIn.latitude, longitude: putIn.longitude,
  summary: 'A roughly five-mile blackwater day paddle through the Lynches floodplain, ending above US 378. Tight bends, fallen trees and possible carries make this an outing for experienced moving-water paddlers.',
  statusText: 'Check the Effingham stage and current obstructions. Published travel guidance is not a guarantee of a clear channel or safe passage.',
  routeType: 'recreational', scoreEligibility: 'scored',
  gaugeSource: { id: 'usgs-02132000', provider: 'usgs', siteId: '02132000', metric: 'gage_height_ft', unit: 'ft', kind: 'direct', siteName: 'Lynches River at Effingham, SC', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02132000/' },
  profile: {
    thresholdModel: 'two-sided', tooLow: 2, idealMin: 2, idealMax: 9, tooHigh: 9,
    thresholdSource: guide, thresholdSourceStrength: 'official', rainfallSensitivity: 'high', windSensitivity: 0.4,
    seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'Flow permits year-round travel; winter and spring usually run higher. Avoid rising floodwater, lightning and cold-water exposure.',
    difficulty: 'hard', difficultyNotes: 'SCDNR recommends experienced boaters: moving current, meanders and strainers demand reliable maneuvering and possible portages. This is not a beginner flatwater rental trip.',
    confidenceNotes: 'SCDNR page 6 explicitly ties its 2–9 ft travel range to Effingham USGS 02132000 on this same river. The model uses that published runnable range with collapsed shoulders, not an invented optimal subrange. The upstream gauge does not establish local depth or clearance around wood. Use gage height, not the separate NAVD 1988 elevation series. Public access status was Active/Open in SCDNR on 2026-09-09; conditions can change.',
  },
  safetyProfile: { riskLevel: 'caution', reviewStatus: 'reviewed', hazards: ['strainers','low_water','fast_rise','private_banks'], safetyNotes: [
    'Wear a PFD. Scout blind bends and wood from a safe position; do not enter a blocked chute or paddle into floodplain trees.',
    'High water obscures the channel; low water may require carries. Turn back when a safe passage or lawful portage cannot be established.',
    'Stage the shuttle and inspect both landings before launching. Finish at Wicklow above US 378; this route does not enter the complex lower-river confluence.',
    'Banks are not assumed public camping or bailout sites. Carry offline navigation, communication and enough daylight for delays.',
  ] },
  putIn, takeOut,
  accessPoints: [{ ...putIn, id: `${id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: 'Public paddle access at the end of Indigo Landing Road; inspect the bank and parking before unloading.' }, { ...takeOut, id: `${id}-take-out`, mileFromStart: 5, segmentKind: 'transition', note: 'Use the ramp off Wicklow Road upstream of the US 378 bridge.' }],
  logistics: {
    distanceLabel: 'About 5 river miles', estimatedPaddleTime: 'Allow 2–4 hours, longer for scouting or carries',
    shuttle: 'Stage a vehicle at Wicklow Landing off Wicklow Road above US 378, then drive to the end of Indigo Landing Road. Inspect both approaches and arrange your own shuttle.',
    permits: 'SCDNR lists both accesses as public and open. Confirm posted parking and access rules on arrival; no commercial shuttle is included.',
    camping: 'Indigo is listed without camping. Treat this as a day trip; no riverside camping permission is established.', campingClassification: 'unknown',
    summary: 'A distinct five-mile reach between SCDNR river miles 39 and 34 with an upstream Effingham stage reference.',
    accessCaveats: ['Indigo is a small paddle launch; parking capacity and fees are not specified by the access inventory. Do not block the road or neighboring property.', 'Wicklow has a ramp and parking; inspect flood debris and the approach before starting.', 'An open access listing does not establish a clear river channel.'],
    watchFor: ['Strainers at bends and possible portages', 'Rising water and indistinct channels', 'Private banks and limited bailout options'],
  },
  evidenceNotes: [
    { label: 'Reach and distance', value: 'River miles 39 to 34', note: 'SCDNR identifies Indigo and the landing above US 378; the current access inventory calls the latter Wicklow Landing.', sourceUrl: guide.url },
    { label: 'Numeric scoring evidence', value: 'Effingham gage height 2–9 ft', note: 'Printed page 6 provides travel guidance, separate from the historical flow extremes table. No conversion from discharge or NAVD elevation is used.', sourceUrl: guide.url },
    { label: 'Access and coordinate review', value: '2026-09-09', note: 'SCDNR public-access records 938 (Indigo) and 431 (Wicklow) are Active/Open. Indigo uses the official mapped bank access. Wicklow is adjusted about 50 feet from the inventory pin to the visible ramp edge on imagery; imagery acquisition date is unknown.', sourceUrl: access },
    { label: 'Live provider check', value: 'USGS 02132000 / 00065', note: 'Current stage telemetry was available on 2026-09-09. The station is upstream on the same river and is the exact reference named by SCDNR.', sourceUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02132000/' },
  ],
  sourceLinks: [guide, { label: 'SCDNR current public water access map', url: access, provider: 'local' }, { label: 'SCDNR Lynches access directory', url: 'https://www.dnr.sc.gov/water/river/scenic/lynches.html', provider: 'local' }, { label: 'USGS Effingham gauge', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-02132000/', provider: 'usgs' }],
}];
