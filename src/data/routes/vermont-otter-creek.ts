import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';
import { buildStarterPlanningRoute } from './starter-planning';

const accessGuide = { label: 'Vermont Fish & Wildlife fishing access areas', url: 'https://www.vtfishandwildlife.com/fish/boating-in-vermont/fishing-access-areas', provider: 'local' as const };
const basinPlan = { label: 'Vermont Otter Creek tactical basin plan', url: 'https://dec.vermont.gov/sites/dec/files/wsm/mapp/docs/B3_TBP_FINAL_ARA.pdf', provider: 'local' as const };
const paddleMap = { label: 'Boston Kayaker Otter Creek Middlebury to Vergennes map', url: 'https://www.bostonkayaker.com/publishmap/ottercreekmiddleburypublishpdf.pdf', provider: 'local' as const };
const paddleGuide = { label: 'Paddle Guide Otter Creek access and safety overview', url: 'https://www.paddleguide.com/united-states/vermont/rivers/otter-creek--8932320674411820', provider: 'local' as const };
const waterQuality = { label: 'Otter Creek Natural Resources Conservation District', url: 'https://ottercreekconservation.org/otter-creek/', provider: 'local' as const };
const gauge = { id: 'usgs-04282500', provider: 'usgs' as const, siteId: '04282500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Otter Creek at Middlebury, VT', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-04282500/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'dam', 'private_banks', 'urban_water_quality'];

const centerRutland = { name: 'Center Rutland state fishing access (water-entry edge)', latitude: 43.6105, longitude: -73.0005 };
const middlebury = { name: 'Middlebury Otter Creek wayside access below falls (water-entry edge)', latitude: 43.9934, longitude: -73.1647 };
const quaker = { name: 'Quaker Village Road access, Middlebury (water-entry edge)', latitude: 44.0195, longitude: -73.1435 };
const weybridge = { name: 'Otter Creek–Kwonumosk public access area', latitude: 44.086, longitude: -73.2472 };
const vergennes = { name: 'Vergennes Main Street town dock below falls (water-entry edge)', latitude: 44.1662, longitude: -73.2518 };
const fortCassin = { name: 'Fort Cassin state fishing access, Ferrisburgh (water-entry edge)', latitude: 44.2185, longitude: -73.3375 };
type OtterPoint = typeof centerRutland | typeof middlebury | typeof quaker | typeof weybridge | typeof vergennes | typeof fortCassin;

function makeRoute(spec: { id: string; start: OtterPoint; end: OtterPoint; miles: number; summary: string; note: string }): River {
  return buildStarterPlanningRoute({
    id: spec.id, name: 'Otter Creek', riverId: 'otter-creek-vermont', state: 'Vermont', region: 'Rutland and Addison counties',
    putIn: spec.start, takeOut: spec.end, miles: spec.miles, summary: spec.summary, difficulty: 'moderate',
    difficultyNotes: 'Otter Creek changes from moving water and falls in the upper corridor to broad flatwater downstream. Dams, falls, strainers, motor traffic, cold water and limited legal exits require conservative scouting and portage planning.',
    seasonMonths: [5, 6, 7, 8, 9, 10], seasonNotes: 'Late spring through fall is the practical paddling season. Rain can raise the creek quickly; lower sections may be windy and motorboat-affected.',
    gauge, conditionsNote: `Planning only: ${spec.id}. Public access records and the Otter Creek paddling map support the named endpoints, but this pass does not transfer a route-specific recreational flow cutoff to USGS ${gauge.siteId}.`, hazards,
    safetyNotes: [
      'Wear a properly fitted PFD and carry a whistle, spare paddle, communication and offline navigation.',
      'Scout and portage every dam and falls boundary from a legal public approach; never approach a hydraulic structure in current.',
      'Watch for strainers, low-water rock, fast rain rises, cold water, wind and motorboat traffic.',
      'The basin plan and watershed district identify impaired or wastewater-influenced reaches; check current advisories and avoid contact after heavy rain.',
      'Use only named public access areas and do not use private banks as informal bailouts or campsites.',
    ],
    logistics: {
      estimatedPaddleTime: 'Allow 3–8 hours with current, scouting and shuttle margin',
      shuttle: 'Stage the downstream public access first, then drive to the upstream launch. Confirm parking, gates and the actual water-entry edge before unloading.',
      permits: 'Confirm Vermont Fish & Wildlife access rules, town parking limits and any dam or water-quality notices before launch.',
      camping: 'No overnight river camping is included. Use established campgrounds or lodging near Rutland, Middlebury or Vergennes; never camp at access sites or on private banks.',
      campingClassification: 'nearby_basecamp',
      accessCaveats: [spec.note, 'Portage around all dams and falls; do not improvise a shoreline exit.', 'Recheck access, water-quality, weather, wind and flow conditions before staging.'],
      watchFor: ['USGS 04282500 trend and rainfall', 'Dams, falls, strainers and low-water rock', 'Cold water, wind, motor traffic and water-quality advisories'],
    },
    guide: paddleMap, sources: [accessGuide, basinPlan, paddleGuide, waterQuality], coordinateNote: 'Coordinates are tied to named Vermont Fish & Wildlife, municipal and paddling-map access locations on Otter Creek; verify the water-entry edge and current parking before departure.', coordinateSourceUrl: accessGuide.url, reviewDate: '2026-09-16',
  });
}

export const vermontOtterCreekRoutes: River[] = [
  makeRoute({ id: 'otter-creek-center-rutland-middlebury', start: centerRutland, end: middlebury, miles: 34, summary: 'A staged upper Otter Creek itinerary from Center Rutland through the Proctor and Brandon corridor to Middlebury, using established access and mandatory portage checks.', note: 'The basin plan and state access inventory identify upper Otter Creek access and multiple hydropower boundaries; confirm every intermediate portage before treating this as a single-day route.' }),
  makeRoute({ id: 'otter-creek-middlebury-quaker-village', start: middlebury, end: quaker, miles: 3, summary: 'A short Middlebury reach below the downtown falls to the Quaker Village Road access, ending before the Weybridge dam sequence.', note: 'The Middlebury below-falls access and Quaker Village Road are named in the Otter Creek paddling map; do not approach the downtown falls from upstream.' }),
  makeRoute({ id: 'otter-creek-quaker-village-weybridge', start: quaker, end: weybridge, miles: 5, summary: 'A Middlebury-to-Weybridge reach through the lower Middlebury corridor with the Weybridge State Fishing Access take-out.', note: 'The paddling map identifies Quaker Village Road and Weybridge/Route 23 access; the Weybridge dam boundary requires a planned take-out and legal portage.' }),
  makeRoute({ id: 'otter-creek-weybridge-vergennes', start: weybridge, end: vergennes, miles: 7, summary: 'A popular lower Otter Creek flatwater reach from Weybridge State Fishing Access to the Vergennes town dock below the falls.', note: 'The Boston Kayaker map identifies the Weybridge alternate start and Main Street Vergennes stop. Treat Weybridge and Vergennes falls as hard boundaries and confirm town-dock landing conditions.' }),
  makeRoute({ id: 'otter-creek-quaker-village-vergennes', start: quaker, end: vergennes, miles: 10.5, summary: 'The documented Middlebury-to-Vergennes day paddle, linking Quaker Village Road through Weybridge to the Main Street town dock.', note: 'The paddling map gives this 10.5-mile itinerary and names Weybridge and No. 9 dams; stage a shuttle and portage plan before launch.' }),
  makeRoute({ id: 'otter-creek-vergennes-fort-cassin', start: vergennes, end: fortCassin, miles: 8, summary: 'A lower Otter Creek reach below Vergennes Falls toward Fort Cassin, with broad water, wind exposure and Lake Champlain influence.', note: 'The state basin plan identifies Fort Cassin as a designated trailer access. Launch only below the Vergennes falls boundary and check wind, boat traffic and lake conditions.' }),
  makeRoute({ id: 'otter-creek-weybridge-fort-cassin', start: weybridge, end: fortCassin, miles: 15, summary: 'A staged lower Otter Creek itinerary from Weybridge through Vergennes to Fort Cassin at the Lake Champlain end of the corridor.', note: 'Use the documented Weybridge and Fort Cassin state access points, with Vergennes as an intermediate bailout. Portage the Weybridge and Vergennes dam/falls boundaries.' }),
];
