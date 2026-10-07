import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const guide = { label: 'SCDNR Lower Saluda Scenic River access and safety guide', url: 'https://www.dnr.sc.gov/water/river/pdf/LowerSaludaAccess.pdf', provider: 'local' as const };
const overview = 'https://www.dnr.sc.gov/water/river/scenic/saluda.html';
const gauge = { id: 'usgs-02168504', provider: 'usgs' as const, siteId: '02168504', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Saluda River below Lake Murray near Columbia, SC', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02168504/' };
const putIn = { name: 'Saluda Shoals Park', latitude: 34.048205, longitude: -81.194898 };
const hopeFerry = { name: 'Hope Ferry Landing', latitude: 34.04583, longitude: -81.19083 };
const gardendale = { name: 'Gardendale / SCE&G carry-in access', latitude: 34.033049, longitude: -81.151018 };
const hazards: RouteHazard[] = ['fast_rise','cold_water','whitewater','dam','strainers','private_banks'];

const common = {
  name: 'Lower Saluda River', riverId: 'saluda-river', state: 'South Carolina', region: 'Lexington and Richland counties', routeType: 'recreational' as const, scoreEligibility: 'planning' as const,
  gaugeSource: gauge,
  profile: {
    thresholdModel: 'two-sided' as const,
    thresholdSource: { label: 'SCDNR Lower Saluda overview', url: overview, provider: 'local' as const }, thresholdSourceStrength: 'official' as const, rainfallSensitivity: 'high' as const, windSensitivity: 0.35,
    seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'Dam releases can change flow quickly in every season. The river stays cold year-round; avoid storms, rapidly rising water and cold-water exposure.',
    difficulty: 'moderate' as const, difficultyNotes: 'This upper reach is mainly flatwater, but current is strong. SCDNR says major rapids begin downstream of I-26; the bridge is a hazard boundary, not a documented public take-out.',
    confidenceNotes: 'SCDNR says daily Lower Saluda flows may range from 400 to 20,000 cfs and warns of rapid changes, strong currents, cold water and dangerous rapids. That broad daily range is not a route-specific paddling target, so this reach is planning-only. USGS 02168504 is direct below-dam telemetry.',
  },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: [
    'Wear a properly fitted PFD. Dam releases can raise current and water level rapidly; check the live gauge and release notices immediately before launch.',
    'SCDNR says major rapids, up to Class IV, begin downstream of the I-26 bridge. The bridge is not listed as a public river landing; do not plan an assumed I-26 take-out.',
    'SCDNR identifies Saluda Shoals Park and Hope Ferry as the public ramps for trailered boats. Gardendale is carry-in access; inspect the bank, parking and take-out before committing.',
    'The water is cold year-round. Carry communication, offline navigation and enough daylight for a turn-around or delayed shuttle.',
  ] },
};

function makeRoute(id: string, reach: string, start: typeof putIn, end: typeof gardendale, miles: number, duration: string, shuttle: string, alternatePutIn?: typeof hopeFerry): River {
  return {
    ...common, id, slug: id, reach, latitude: start.latitude, longitude: start.longitude,
    summary: `A ${miles}-mile upper Lower Saluda day paddle from ${start.name}${alternatePutIn ? ` or ${alternatePutIn.name}` : ''} to ${end.name}, with current, cold water and changing release conditions.`,
    statusText: 'Check the below-dam flow trend and release notices immediately before departure. SCDNR’s published daily flow range is context, not a route-specific paddling target or safety guarantee.',
    putIn: start, takeOut: end,
    accessPoints: [
      { ...start, id: `${id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: 'Public access named by SCDNR; inspect the ramp or carry-in approach and current parking rules.' },
      ...(alternatePutIn ? [{ ...alternatePutIn, id: `${id}-alternate-put-in`, mileFromStart: 0, segmentKind: 'transition' as const, accessPointRole: 'public-access' as const, note: 'Alternative public ramp for this same reach; confirm current access and parking rules.' }] : []),
      { ...end, id: `${id}-take-out`, mileFromStart: miles, segmentKind: 'transition', note: 'Gardendale is a named SCDNR carry-in access; verify the bank and vehicle approach before launch.' },
    ],
    logistics: { distanceLabel: `About ${miles} river miles`, estimatedPaddleTime: duration, shuttle, permits: 'SCDNR lists the access points; confirm park hours, fees, parking and any release or closure notice at the time of travel.', camping: 'No overnight camping is established for this urban day trip.', campingClassification: 'none', summary: `Choose Saluda Shoals Park or Hope Ferry Landing for the same upper reach to ${end.name}.`, accessCaveats: ['Access coordinates are mapped launch anchors, not a survey of water-entry edges.', 'Saluda Shoals Park and Hope Ferry are the public ramps for trailered boats; choose either launch for this reach. Gardendale is carry-in access.', 'Do not treat an open access listing or an in-range gauge as an all-clear.'], watchFor: ['Rapidly changing releases', 'Cold water and strong current', 'Major rapids begin downstream of I-26'] },
    evidenceNotes: [
      { label: 'Access and reach', value: `${start.name}${alternatePutIn ? ` or ${alternatePutIn.name}` : ''} to ${end.name}`, note: 'SCDNR places Gardendale 3.5 river miles downstream from Hope Ferry and the upstream ramp at Saluda Shoals Park. Gardendale is carry-in access.', sourceUrl: overview },
      { label: 'Published daily flow range', value: '400–20,000 cfs', note: 'SCDNR warns that releases and conditions can change rapidly. This broad daily range is not used as a route-specific scoring threshold.', sourceUrl: overview },
      { label: 'Direct telemetry', value: 'USGS 02168504', note: 'Below Lake Murray dam station used for the release-sensitive upper reach.', sourceUrl: gauge.detailUrl },
    ],
    sourceLinks: [guide, { label: 'SCDNR Lower Saluda overview', url: overview, provider: 'local' }, { label: 'USGS below-dam gauge', url: gauge.detailUrl, provider: 'usgs' }],
  };
}

export const southCarolinaSaludaRoutes: River[] = [
  makeRoute('saluda-river-saluda-shoals-gardendale', 'Saluda Shoals Park or Hope Ferry Landing to Gardendale', putIn, gardendale, 3.5, 'Allow 2–3 hours, longer for scouting and release changes.', 'Stage at Gardendale, then drive to either Saluda Shoals Park or Hope Ferry Landing. Gardendale is carry-in access; inspect both approaches.', hopeFerry),
];
