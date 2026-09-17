import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const scenic = { label: 'SCDNR Black Scenic River access sequence', url: 'https://www.dnr.sc.gov/water/river/scenic/black.html', provider: 'local' as const };
const plan = { label: 'SCDNR Black Scenic River Management Plan and streamflow statistics', url: 'https://www.dnr.sc.gov/water/river/pdf/blackriverplan_final.pdf', provider: 'local' as const };
const trails = { label: 'South Carolina Trails Gilland Memorial Park water launch', url: 'https://www.sctrails.net/trails/trail/gilland-memorial-park', provider: 'local' as const };
const gauge = { id: 'usgs-02136000', provider: 'usgs' as const, siteId: '02136000', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Black River at Kingstree, SC', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02136000/' };

const gilland = { name: 'Gilland Memorial Park Black River boat ramp (water-entry edge)', latitude: 33.66708625682559, longitude: -79.84695192844457 };
const mill = { name: 'Mill Street Landing Black River boat ramp (water-entry edge)', latitude: 33.66384, longitude: -79.83685 };
const pine = { name: 'Pine Tree Landing Black River dock and ramp (water-entry edge)', latitude: 33.4736306, longitude: -79.4990275 };
const pea = { name: 'Pea House Landing Black River dock and ramp (water-entry edge)', latitude: 33.4826303, longitude: -79.4562100 };
const pump = { name: 'Pump House Landing at Reds Landing Road (water-entry edge)', latitude: 33.4897, longitude: -79.5455 };
const hazards: RouteHazard[] = ['low_water', 'fast_rise', 'strainers', 'cold_water', 'private_banks'];

const common = {
  name: 'Black River', riverId: 'black-river-south-carolina', state: 'South Carolina', region: 'Clarendon / Williamsburg / Georgetown Counties', routeType: 'recreational' as const, scoreEligibility: 'scored' as const,
  sourceLinks: [scenic, plan, trails], gaugeSource: gauge,
};

function makeRoute(spec: { id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; miles: number; summary: string; note: string; time: string }): River {
  const profile = {
    thresholdModel: 'two-sided' as const, tooLow: 48, idealMin: 200, idealMax: 1500, tooHigh: 10000,
    thresholdSource: plan, thresholdSourceStrength: 'official' as const, rainfallSensitivity: 'high' as const, windSensitivity: 0.35,
    seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'Rainfall drives the free-flowing Coastal Plain river. Check the Kingstree gauge, forecast, recent rain, water quality and channel conditions immediately before departure.',
    difficulty: 'easy' as const, difficultyNotes: 'Slow, broad blackwater with narrow channels, sandbars, strainers, limited exits and changing current. High water can be swift and obscure hazards.',
    confidenceNotes: 'SCDNR documents the public access sequence and published distances. Its management plan reports 48 cfs exceeded 90% of the time at Kingstree; use 48 cfs as a conservative navigation floor and the 200–1,500 cfs band as a planning cue, not a safety guarantee.',
  };
  return {
    ...common, id: spec.id, slug: spec.id, reach: spec.reach, latitude: spec.putIn!.latitude!, longitude: spec.putIn!.longitude!, summary: spec.summary,
    statusText: `Use USGS ${gauge.siteId}, recent rainfall and local visual checks; blackwater channels, strainers and private banks can change independently of the reading.`, profile,
    safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: [
      'Wear a properly fitted PFD and carry communication, offline navigation, spare paddle and enough daylight for a long swamp shuttle.',
      'Low water exposes sandbars and submerged wood; high water can create swift current, floating debris and difficult landings after rain.',
      'The channel alternates between open lake-like water and narrow cypress corridors. Scout bends, strainers and side channels from shore and never force a blocked passage.',
      'Use only the named public landings, respect private banks and check water-quality, weather, hunting and access notices before unloading.',
    ] },
    putIn: spec.putIn, takeOut: spec.takeOut,
    accessPoints: [{ ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note }, { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm current ramp, dock or carry-in water entry, parking, hours and downstream boundary before staging.' }],
    logistics: { distanceLabel: `About ${spec.miles} river miles`, estimatedPaddleTime: spec.time, shuttle: 'Stage the downstream public landing first, then drive to the upstream access. Carry boats over sand or uneven banks where required.', permits: 'Confirm SCDNR, county, town and landowner access rules, seasonal gates and current water-quality notices before launch.', camping: 'No on-route camping is documented for these access-bounded day reaches. Use established nearby campgrounds or lodging and do not camp on private river frontage.', campingClassification: 'nearby_basecamp', summary: spec.summary, accessCaveats: ['Coordinates are tied to named public landing facilities or documented bridge access and should be rechecked against the waterline.', 'The free-flowing channel can split into side channels; stay on the documented main route and avoid trespass.', 'Recheck Kingstree flow trend, rainfall, wind, water quality and storm debris on launch day.'], watchFor: ['USGS 02136000 trend and rapid rain response', 'Cypress strainers, sandbars and side channels', 'Private frontage, heat and limited legal exits'] },
    evidenceNotes: [
      { label: 'Named access sequence and distance', value: `${spec.reach}; ${spec.miles} miles`, note: 'SCDNR lists the named public landings and approximate upstream-to-downstream distances on the Black Scenic River.', sourceUrl: scenic.url },
      { label: 'Numeric scoring evidence', value: '48 cfs 90%-exceedance floor; 200–1,500 cfs planning band', note: 'The SCDNR management plan reports Kingstree flow statistics; the floor is a conservative navigation screen, not a clearance.', sourceUrl: plan.url },
      { label: 'Direct telemetry', value: 'USGS 02136000 Black River at Kingstree', note: 'Direct Kingstree discharge and stage for the central access corridor.', sourceUrl: gauge.detailUrl },
      { label: 'Public water entry', value: 'SCDNR and SC Trails named boat ramp or dock', note: 'Endpoint is a named public landing with a water-entry edge; verify current bank and ramp condition before launch.', sourceUrl: trails.url },
    ],
  };
}

export const southCarolinaBlackRoutes: River[] = [
  makeRoute({ id: 'black-river-gilland-mill', reach: 'Gilland Memorial Park to Mill Street Landing', putIn: gilland, takeOut: mill, miles: 1, summary: 'A short Kingstree Black River connector between the Gilland Memorial Park ramp and the public Mill Street Landing.', time: 'Allow 1–3 hours with current, landing and shuttle checks', note: 'SCDNR identifies both Gilland Memorial Park and Mill Street as public Black River ramps in Kingstree; confirm the water-entry edge and avoid nearby swamp-channel dead ends.' }),
  makeRoute({ id: 'black-river-pump-house-pine', reach: 'Pump House Landing to Pine Tree Landing', putIn: pump, takeOut: pine, miles: 5, summary: 'A popular Black River Swamp introduction from Pump House Landing near Andrews to the Pine Tree side-channel landing.', time: 'Allow 3–5 hours with tide, side-channel navigation and heat margin', note: 'SCDNR and Paddle SC identify Pump House as a public ramp just downstream of SC 41 and Pine Tree as a public dock and ramp about five miles downstream. Check the tide delay and confirm Pine Tree’s side-channel water entry.' }),
  makeRoute({ id: 'black-river-pine-pea-house', reach: 'Pine Tree Landing to Pea House Landing', putIn: pine, takeOut: pea, miles: 5, summary: 'A lower Georgetown County Black River day reach between the side-channel Pine Tree dock and the Pea House public landing.', time: 'Allow 3–5 hours with side-channel navigation and heat margin', note: 'SCDNR identifies Pine Tree and Pea House as public dock and ramp landings about five river miles apart; Pine Tree is on a side channel and may be hard to see from the main river.' }),
  makeRoute({ id: 'black-river-pump-house-pea-house', reach: 'Pump House Landing to Pea House Landing', putIn: pump, takeOut: pea, miles: 10.3, summary: 'A documented Black River East day trip through the cypress narrows from Pump House Landing to Pea House Landing.', time: 'Allow 4–6 hours with tide, side-channel navigation and wildlife stops', note: 'Paddle SC and the South Carolina canoe-trail guide publish this approximately 10-mile public-access trip. Pine Tree is the documented five-mile intermediate bailout; check the tide delay and do not confuse Pea House with a similarly named downstream landing.' }),
];
