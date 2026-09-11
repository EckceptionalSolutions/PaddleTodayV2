import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const guide = { label: 'SCDNR Lower Saluda Scenic River access and safety guide', url: 'https://www.dnr.sc.gov/water/river/pdf/LowerSaludaAccess.pdf', provider: 'local' as const };
const overview = 'https://www.dnr.sc.gov/water/river/scenic/saluda.html';
const gauge = { id: 'usgs-02168504', provider: 'usgs' as const, siteId: '02168504', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Saluda River below Lake Murray near Columbia, SC', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02168504/' };
const putIn = { name: 'Saluda Shoals Park', latitude: 34.048205, longitude: -81.194898 };
const hopeFerry = { name: 'Hope Ferry Landing', latitude: 34.04583, longitude: -81.19083 };
const gardendale = { name: 'Gardendale / SCE&G carry-in access', latitude: 34.033049, longitude: -81.151018 };
const i26 = { name: 'I-26 overpass turn-around', latitude: 34.012019, longitude: -81.081684 };
const hazards: RouteHazard[] = ['fast_rise','cold_water','whitewater','dam','strainers','private_banks'];

const common = {
  name: 'Lower Saluda River', riverId: 'saluda-river', state: 'South Carolina', region: 'Lexington and Richland counties', routeType: 'recreational' as const, scoreEligibility: 'scored' as const,
  gaugeSource: gauge,
  profile: {
    thresholdModel: 'two-sided' as const, tooLow: 400, idealMin: 400, idealMax: 18000, tooHigh: 18000,
    thresholdSource: guide, thresholdSourceStrength: 'official' as const, rainfallSensitivity: 'high' as const, windSensitivity: 0.35,
    seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'Dam releases can change flow quickly in every season. The river stays cold year-round; avoid storms, rapidly rising water and cold-water exposure.',
    difficulty: 'moderate' as const, difficultyNotes: 'The upper reach is mainly flatwater, but current is strong and the Lower Saluda contains large rapids downstream. The I-26 overpass is the conservative turn-around for less experienced paddlers.',
    confidenceNotes: 'SCDNR states Lower Saluda flows can range from 400 to 18,000 cfs and warns of rapidly changing levels, strong currents, cold water and large rapids. USGS 02168504 is the direct below-dam station. No narrower optimum is inferred; the published flow envelope is used as a planning range only.',
  },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: [
    'Wear a properly fitted PFD. Dam releases can raise current and water level rapidly; check the live gauge and release notices immediately before launch.',
    'This batch ends upstream of the major downstream rapids. Do not continue below the I-26 overpass without whitewater skills, a current reconnaissance and a plan for the Mill Race portage.',
    'Use only the named public access approaches. Gardendale is carry-in access; inspect the bank, parking and take-out before committing.',
    'The water is cold year-round. Carry communication, offline navigation and enough daylight for a turn-around or delayed shuttle.',
  ] },
};

function makeRoute(id: string, reach: string, start: typeof putIn, end: typeof gardendale, miles: number, duration: string, shuttle: string): River {
  return {
    ...common, id, slug: id, reach, latitude: start.latitude, longitude: start.longitude,
    summary: `A ${miles}-mile upper Lower Saluda day paddle from ${start.name} to ${end.name}, with current, cold water and changing release conditions.`,
    statusText: 'Check the below-dam flow and release notices immediately before departure. The published flow range is a planning aid, not a safety guarantee.',
    putIn: start, takeOut: end,
    accessPoints: [
      { ...start, id: `${id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: 'Public access named by SCDNR; inspect the ramp or carry-in approach and current parking rules.' },
      { ...end, id: `${id}-take-out`, mileFromStart: miles, segmentKind: 'transition', note: 'Named SCDNR access or conservative turn-around; verify the bank and vehicle approach before launch.' },
    ],
    logistics: { distanceLabel: `About ${miles} river miles`, estimatedPaddleTime: duration, shuttle, permits: 'SCDNR lists the access points; confirm park hours, fees, parking and any release or closure notice at the time of travel.', camping: 'No overnight camping is established for these urban day-trip access pairs.', campingClassification: 'unknown', summary: `Upper Lower Saluda reach between ${start.name} and ${end.name}.`, accessCaveats: ['Access coordinates are mapped launch anchors, not a survey of water-entry edges.', 'Gardendale is carry-in access and is not suitable for larger trailered boats.', 'Do not treat an open access listing or an in-range gauge as an all-clear.'], watchFor: ['Rapidly changing releases', 'Cold water and strong current', 'Downstream rapids and portage decisions'] },
    evidenceNotes: [
      { label: 'Access and reach', value: `${start.name} to ${end.name}`, note: 'SCDNR identifies these public access points and the I-26 overpass as the conservative upper-reach turn-around.', sourceUrl: guide.url },
      { label: 'Numeric scoring evidence', value: '400–18,000 cfs', note: 'SCDNR publishes this Lower Saluda flow range and warns that releases can change conditions rapidly; no narrower optimum is asserted.', sourceUrl: guide.url },
      { label: 'Direct telemetry', value: 'USGS 02168504', note: 'Below Lake Murray dam station used for the release-sensitive upper reach.', sourceUrl: gauge.detailUrl },
    ],
    sourceLinks: [guide, { label: 'SCDNR Lower Saluda overview', url: overview, provider: 'local' }, { label: 'USGS below-dam gauge', url: gauge.detailUrl, provider: 'usgs' }],
  };
}

export const southCarolinaSaludaRoutes: River[] = [
  makeRoute('saluda-river-saluda-shoals-gardendale', 'Saluda Shoals Park to Gardendale', putIn, gardendale, 3.5, 'Allow 2–3 hours, longer for scouting and release changes.', 'Stage at Gardendale, then drive to Saluda Shoals Park. Gardendale is carry-in access; inspect both approaches.'),
  makeRoute('saluda-river-saluda-shoals-i26', 'Saluda Shoals Park to I-26 overpass turn-around', putIn, i26, 7.7, 'Allow 3–4 hours, with a conservative turn-around before downstream rapids.', 'Stage a vehicle near the selected legal take-out or arrange a shuttle. Treat I-26 as a turn-around if the landing is not usable.'),
  makeRoute('saluda-river-gardendale-i26', 'Gardendale to I-26 overpass turn-around', gardendale, i26, 4, 'Allow 1–2 hours, plus time to inspect the carry-in launch.', 'Stage at the I-26-area take-out and carry boats into Gardendale. Confirm the downstream approach and parking before committing.'),
  makeRoute('saluda-river-saluda-shoals-hope-ferry', 'Saluda Shoals Park to Hope Ferry Landing', putIn, hopeFerry, 0.35, 'Allow 1–2 hours, plus time to inspect both ramps and release conditions.', 'Stage at Hope Ferry, then drive to Saluda Shoals Park. Confirm ramp access, parking and any posted release notice.'),
  makeRoute('saluda-river-hope-ferry-gardendale', 'Hope Ferry Landing to Gardendale', hopeFerry, gardendale, 2.3, 'Allow 1–2 hours, plus time to inspect the Gardendale carry-in take-out.', 'Stage at Gardendale, then drive to Hope Ferry. Treat Gardendale as a carry-in access and stop before downstream rapids.'),
  makeRoute('saluda-river-hope-ferry-i26', 'Hope Ferry Landing to I-26 overpass turn-around', hopeFerry, i26, 6.5, 'Allow 3–4 hours with a conservative turn-around before downstream rapids.', 'Stage near the I-26-area turn-around, then drive to Hope Ferry. Confirm the downstream approach and parking before committing.'),
];
