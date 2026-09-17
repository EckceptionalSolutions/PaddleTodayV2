import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';
import { buildStarterPlanningRoute } from './starter-planning';

const georgeBlueway = { label: 'Mississippi Gulf Coast National Heritage Area Pascagoula River George County Blueway', url: 'https://msgulfcoastheritage.ms.gov/natural/blueways/pascagoula-river-george-county-blueway/', provider: 'local' as const };
const jacksonBlueway = { label: 'Mississippi Gulf Coast National Heritage Area Pascagoula River Jackson County Blueway', url: 'https://msgulfcoastheritage.ms.gov/natural/blueways/pascagoula-river-jackson-county-blueway/', provider: 'local' as const };
const cityGuide = { label: 'City of Pascagoula outdoor recreation and river access', url: 'https://cityofpascagoula.com/327/Outdoor-Recreation', provider: 'local' as const };
const accessInventory = { label: 'Mississippi Department of Marine Resources public access inventory', url: 'https://dmr.ms.gov/wp-content/uploads/2019/07/public-access-inventory.pdf', provider: 'local' as const };
const wilkersonMap = { label: 'Wilkerson Ferry public ramp map record', url: 'https://www.topozone.com/mississippi/george-ms/locale/wilkerson-ferry-boat-ramp/', provider: 'local' as const };
const bigCreekMap = { label: 'Big Creek public ramp map record', url: 'https://www.topozone.com/mississippi/george-ms/locale/big-creek-boat-ramp/', provider: 'local' as const };
const hwy26Map = { label: 'Pascagoula River Highway 26 bridge map record', url: 'https://topoquest.com/place/mississippi/bridge/pascagoula-river-mississippi-highway-26-bridge/2596944', provider: 'local' as const };
const merrillStation = { label: 'USGS Pascagoula River at Merrill station metadata', url: 'https://water.usgs.gov/nwc/NWC/sw/man/S02479000.html', provider: 'usgs' as const };
const gauge = { id: 'usgs-02479310', provider: 'usgs' as const, siteId: '02479310', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Pascagoula River at Graham Ferry, MS', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02479310/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'flash_flood', 'wildlife', 'private_banks', 'urban_water_quality', 'wind'];

const points = {
  merrill: { name: 'Merrill public Pascagoula River access (water-entry edge)', latitude: 30.9780556, longitude: -88.7269444 },
  game: { name: 'Game Management River Road public ramp (water-entry edge)', latitude: 30.91284651, longitude: -88.72919727 },
  hwy26: { name: 'Mississippi Highway 26 Pascagoula River bridge access (water-entry edge)', latitude: 30.878474, longitude: -88.772287 },
  bigCreek: { name: 'Big Creek public boat ramp (water-entry edge)', latitude: 30.8333716, longitude: -88.7355042 },
  wilkerson: { name: 'East / West Wilkerson Ferry public boat ramp (water-entry edge)', latitude: 30.8156239, longitude: -88.7470896 },
  hwy63: { name: 'Highway 63 Pascagoula River public ramp (water-entry edge)', latitude: 30.419907, longitude: -88.519702 },
  riverPark: { name: 'Pascagoula River Park municipal boat launch (water-entry edge)', latitude: 30.37574, longitude: -88.5651 },
};
type PascagoulaPoint = typeof points[keyof typeof points];

function makeRoute(spec: { id: string; start: PascagoulaPoint; end: PascagoulaPoint; miles: number; summary: string; note: string; time: string }): River {
  return buildStarterPlanningRoute({
    id: spec.id,
    name: 'Pascagoula River',
    riverId: 'pascagoula-river-mississippi',
    state: 'Mississippi',
    region: 'George and Jackson Counties / Mississippi Gulf Coast blueways',
    putIn: spec.start,
    takeOut: spec.end,
    miles: spec.miles,
    summary: spec.summary,
    difficulty: 'moderate',
    difficultyNotes: 'The Pascagoula is moving coastal plain water with strong current, changing channels, strainers, motor traffic and tidal or estuarine influence in the lower corridor. The George County blueway is intended for intermediate or experienced paddlers; lower Jackson County reaches require additional wind, water-quality and navigation checks.',
    seasonMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    seasonNotes: 'Spring through fall is the practical season. Tropical weather, thunderstorms, flash rises, heat, wind, water quality and lower-river tide can change conditions quickly.',
    gauge,
    conditionsNote: `Planning only: ${spec.id}. MSGCNHA blueway pages document public access and corridor context, while USGS ${gauge.siteId} provides direct Pascagoula telemetry; no route-specific recreational flow band is transferred in this pass.`,
    hazards,
    safetyNotes: [
      'Wear a properly fitted PFD and carry a whistle, throw line, spare paddle, communication, sun protection and offline navigation.',
      'Scout bridge current, strainers, changing channels and motor traffic; never cross a marked navigation or industrial hazard without a conservative line.',
      'Check the direct gauge, rainfall, weather, tide or wind in the lower corridor, and current water-quality or wastewater notices before departure.',
      'Wildlife including alligators is present. Keep distance, secure food, do not feed animals and keep a daylight margin for a remote shuttle.',
      'Use only named public ramps. Respect private banks and WMA rules; do not improvise a bailout, camping site or shoreline carry.',
    ],
    logistics: {
      estimatedPaddleTime: spec.time,
      shuttle: 'Stage the downstream public access first, then drive to the upstream ramp. Confirm road approach, parking, gates, carry and the actual water-entry edge before unloading.',
      permits: 'The George County blueway requires the applicable Mississippi Wildlife Management Area user or daily-use permit. Confirm current WMA, city, county and ramp rules before launch.',
      camping: 'No overnight river camping is claimed for the lower Jackson routes. The George County blueway guide identifies WMA camping context; use only a currently permitted established site and never camp at a ramp or on private banks.',
      campingClassification: 'nearby_basecamp',
      accessCaveats: [spec.note, 'The lower river can have tidal, wind, boat-traffic and water-quality effects; verify the intended take-out remains reachable.', 'Recheck current access, road, parking, permit and closure conditions before staging.'],
      watchFor: ['USGS 02479310 trend, rainfall and storm warnings', 'Strainers, bridge current, channel changes and motor traffic', 'Alligators, heat, wind, tide and water-quality notices'],
    },
    guide: georgeBlueway,
    sources: [jacksonBlueway, cityGuide, accessInventory, merrillStation, wilkersonMap, bigCreekMap, hwy26Map],
    coordinateNote: 'Coordinates are tied to named public access records: MSGCNHA blueway pages identify Merrill and Wilkerson endpoints, TopoZone/TopoQuest map the George County ramps and bridge, and the DMR or City of Pascagoula records identify lower public ramps. Verify the current road, parking and water-entry edge before departure.',
    coordinateSourceUrl: accessInventory.url,
    reviewDate: '2026-09-16',
  });
}

export const mississippiPascagoulaRoutes: River[] = [
  makeRoute({ id: 'pascagoula-river-merrill-game-management', start: points.merrill, end: points.game, miles: 7, summary: 'A short upper Pascagoula blueway reach from Merrill to the Game Management River Road public ramp.', note: 'The George County blueway identifies Merrill as the start area; the Game Management River Road point is a mapped public ramp and requires current access confirmation.', time: 'Allow 3–5 hours with current, scouting and shuttle margin' }),
  makeRoute({ id: 'pascagoula-river-merrill-hwy26', start: points.merrill, end: points.hwy26, miles: 13, summary: 'An upper Pascagoula access-chain reach from Merrill to the Highway 26 bridge access.', note: 'Use the public Merrill access and the mapped Highway 26 river-edge access; confirm bridge current and legal parking before launch.', time: 'Allow 4–7 hours with current, bridge and shuttle margin' }),
  makeRoute({ id: 'pascagoula-river-merrill-big-creek', start: points.merrill, end: points.bigCreek, miles: 18, summary: 'A longer George County blueway itinerary from Merrill through the mapped Big Creek public ramp.', note: 'Big Creek is a named mapped boat ramp in the upper corridor. Retain the Game Management and Highway 26 points as research bailouts until local signage is rechecked.', time: 'Allow 6–9 hours with current, wood scouting and shuttle margin' }),
  makeRoute({ id: 'pascagoula-river-merrill-wilkerson-ferry', start: points.merrill, end: points.wilkerson, miles: 23, summary: 'The full George County Pascagoula River blueway from Merrill to East or West Wilkerson Ferry.', note: 'MSGCNHA publishes this approximately 23-mile blueway and names Merrill and Wilkerson Ferry as the endpoints. A WMA user or daily-use permit is required; confirm ferry access and current route conditions.', time: 'Plan a full daylight day with experienced paddlers and a complete shuttle' }),
  makeRoute({ id: 'pascagoula-river-game-management-hwy26', start: points.game, end: points.hwy26, miles: 6, summary: 'A compact upper Pascagoula connector between the Game Management River Road ramp and Highway 26 access.', note: 'This card uses two mapped public water-entry edges inside the documented George County corridor; verify parking, bridge current and WMA rules.', time: 'Allow 2–4 hours with current and bridge scouting' }),
  makeRoute({ id: 'pascagoula-river-game-management-big-creek', start: points.game, end: points.bigCreek, miles: 11, summary: 'A mid-corridor Pascagoula reach from the Game Management River Road ramp to Big Creek.', note: 'Use the named public ramp points and confirm the intermediate road approaches, access signage and current WMA permit requirements.', time: 'Allow 4–6 hours with current and shuttle margin' }),
  makeRoute({ id: 'pascagoula-river-game-management-wilkerson-ferry', start: points.game, end: points.wilkerson, miles: 16, summary: 'A lower George County blueway reach from Game Management River Road to Wilkerson Ferry.', note: 'Wilkerson Ferry is the documented downstream blueway finish. Confirm ferry-ramp access, WMA permit and downstream current before committing.', time: 'Allow 5–8 hours with current, boat traffic and shuttle margin' }),
  makeRoute({ id: 'pascagoula-river-hwy26-big-creek', start: points.hwy26, end: points.bigCreek, miles: 7, summary: 'A short Highway 26-to-Big Creek public-access reach in the George County corridor.', note: 'The two mapped access points are treated as research-grade public endpoints; confirm the bridge and ramp carries before departure.', time: 'Allow 3–5 hours with bridge, wood and shuttle checks' }),
  makeRoute({ id: 'pascagoula-river-hwy26-wilkerson-ferry', start: points.hwy26, end: points.wilkerson, miles: 13, summary: 'A Highway 26-to-Wilkerson Ferry blueway reach with a documented public finish.', note: 'Use Big Creek as a possible intermediate research bailout. Confirm Wilkerson Ferry access, WMA permit and current boat traffic.', time: 'Allow 4–7 hours with current, bridge and shuttle margin' }),
  makeRoute({ id: 'pascagoula-river-big-creek-wilkerson-ferry', start: points.bigCreek, end: points.wilkerson, miles: 4, summary: 'A compact Big Creek-to-Wilkerson Ferry connector for a short George County paddle.', note: 'Both endpoints are mapped public water-entry edges; confirm the ferry landing, road approach and WMA permit before launch.', time: 'Allow 2–4 hours with current and shuttle margin' }),
  makeRoute({ id: 'pascagoula-river-hwy63-river-park', start: points.hwy63, end: points.riverPark, miles: 7, summary: 'A lower Jackson County Pascagoula blueway reach from the Highway 63 public ramp to the municipal River Park launch.', note: 'The DMR public-access inventory and City of Pascagoula identify public launches in this lower corridor. Check tide or wind, water quality, marine traffic and River Park hours.', time: 'Allow 3–5 hours with wind, tide and shuttle margin' }),
  makeRoute({ id: 'pascagoula-river-hwy26-river-park', start: points.hwy26, end: points.riverPark, miles: 55, summary: 'A staged George-to-Jackson Pascagoula itinerary linking the upper blueway to Pascagoula River Park.', note: 'This is a multi-day research candidate, not a single-day promise. Confirm every intermediate public access, WMA permit, camping reservation, tide or wind exposure and lower-river water-quality condition.', time: 'Plan a staged multi-day expedition with confirmed intermediate access and camping' }),
];
