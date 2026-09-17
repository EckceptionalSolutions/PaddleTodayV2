import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';
import { buildStarterPlanningRoute } from './starter-planning';

const fwpAccess = { label: 'Montana FWP Fishing Access Sites', url: 'https://fwp.mt.gov/fish/fishing-access', provider: 'local' as const };
const floatRules = { label: 'Montana FWP Bitterroot floating restrictions and permits', url: 'https://fwp.mt.gov/buyandapply/specialuseriverpermits', provider: 'local' as const };
const campingGuide = { label: 'Montana FWP Fishing Access Sites with Camping guide', url: 'https://fwp.mt.gov/binaries/content/assets/fwp/fish/misc/fas-guide---2017---fullversion.pdf', provider: 'local' as const };
const hannon = { label: 'FWP Hannon Memorial FAS detail', url: 'https://myfwp.mt.gov/fishMT/fas/39754135', provider: 'local' as const };
const wally = { label: 'FWP Wally Crawford FAS detail', url: 'https://myfwp.mt.gov/fishMT/fas/39754217', provider: 'local' as const };
const bell = { label: 'FWP Bell Crossing FAS detail', url: 'https://myfwp.mt.gov/fishMT/fas/39754137', provider: 'local' as const };
const chief = { label: 'FWP Chief Looking Glass FAS detail', url: 'https://myfwp.mt.gov/fishMT/fas/39754131', provider: 'local' as const };
const gauge = { id: 'usgs-12350250', provider: 'usgs' as const, siteId: '12350250', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Bitterroot River at Bell Crossing near Victor, MT', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-12350250/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'];

const points = {
  hannon: { name: 'Hannon Memorial Fishing Access Site (water-entry edge)', latitude: 45.97282, longitude: -114.1401 },
  wally: { name: 'Wally Crawford Fishing Access Site (water-entry edge)', latitude: 46.09178, longitude: -114.17493 },
  anglers: { name: "Anglers' Roost Fishing Access (water-entry edge)", latitude: 46.19893, longitude: -114.16943 },
  tucker: { name: 'Tucker Crossing Fishing Access Site (water-entry edge)', latitude: 46.36838, longitude: -114.13737 },
  bell: { name: 'Bell Crossing Fishing Access Site (water-entry edge)', latitude: 46.44434, longitude: -114.12629 },
  poker: { name: 'Poker Joe Fishing Access Site (water-entry edge)', latitude: 46.58602, longitude: -114.06829 },
  chief: { name: 'Chief Looking Glass Fishing Access Site (water-entry edge)', latitude: 46.66165, longitude: -114.05355 },
};
type BitterrootPoint = typeof points[keyof typeof points];

function makeRoute(spec: { id: string; start: BitterrootPoint; end: BitterrootPoint; miles: number; summary: string; note: string }): River {
  return buildStarterPlanningRoute({
    id: spec.id, name: 'Bitterroot River', riverId: 'bitterroot-river-montana', state: 'Montana', region: 'Bitterroot Valley / Ravalli and Missoula counties',
    putIn: spec.start, takeOut: spec.end, miles: spec.miles, summary: spec.summary, difficulty: 'moderate',
    difficultyNotes: 'The Bitterroot is generally moving Class I water with cold-water consequences, braided channels, strainers and occasional stronger current. Upper sections have special floating-day restrictions and limited exits; scout every bend and bridge.',
    seasonMonths: [5, 6, 7, 8, 9], seasonNotes: 'Late spring through summer is the primary floating season. Snowmelt, rain, irrigation operations, wildfire smoke and FWP seasonal restrictions can change conditions quickly.',
    gauge, conditionsNote: `Planning only: ${spec.id}. Montana FWP documents the named public access sites and Bitterroot floating restrictions, but this pass does not transfer a route-specific recreational flow cutoff to USGS ${gauge.siteId}.`, hazards,
    safetyNotes: [
      'Wear a properly fitted PFD and carry a whistle, spare paddle, throw rope, communication and cold-water layers.',
      'Scout strainers, sweepers, braided channels and bridge features; turn around when wood or current removes a reliable rescue line.',
      'Check Montana FWP floating restrictions, conservation-license rules, closures and any section-specific non-commercial days before departure.',
      'Use only named FWP or authorized private access sites. Respect private banks and do not improvise shoreline bailouts.',
      'Use designated FWP campsites only for overnight travel; otherwise plan a nearby basecamp and finish in daylight.',
    ],
    logistics: {
      estimatedPaddleTime: 'Allow 4–9 hours with current, scouting and shuttle margin',
      shuttle: 'Stage the downstream FWP access first, then drive to the upstream launch. Confirm gates, parking, conservation-license requirements and the actual water-entry edge.',
      permits: 'Confirm Montana FWP access rules, conservation license requirements and Bitterroot floating restrictions before unloading.',
      camping: 'No overnight river camping is assumed. Use an established campground or lodging near Hamilton, Stevensville or Lolo; only designated FWP camping areas may be used for on-route overnights.',
      campingClassification: 'nearby_basecamp',
      accessCaveats: [spec.note, 'Do not substitute private shoreline or a closed FAS for a legal take-out.', 'Recheck current access, restrictions, weather, wood and flow trend before staging.'],
      watchFor: ['USGS 12350250 trend and snowmelt/rain rise', 'Strainers, braided channels, bridge features and cold water', 'FWP floating-day restrictions, closures and conservation-license rules'],
    },
    guide: fwpAccess, sources: [floatRules, campingGuide, hannon, wally, bell, chief], coordinateNote: 'Coordinates are taken from Montana FWP Fishing Access Site records for the named Bitterroot River facilities and identify the water-entry edge; verify current gate, parking and landing conditions before departure.', coordinateSourceUrl: fwpAccess.url, reviewDate: '2026-09-16',
  });
}

export const montanaBitterrootRoutes: River[] = [
  makeRoute({ id: 'bitterroot-river-hannon-wally', start: points.hannon, end: points.wally, miles: 11, summary: 'The upper Bitterroot section from Hannon Memorial to Wally Crawford, matching the FWP named floating section and its seasonal restriction calendar.', note: 'FWP identifies Hannon as a public launch with primitive camping and Wally Crawford as a downstream concrete-ramp access. Check the Monday non-commercial restriction and any current closure before launch.' }),
  makeRoute({ id: 'bitterroot-river-wally-anglers-roost', start: points.wally, end: points.anglers, miles: 13, summary: 'A Darby-to-Hamilton valley reach from Wally Crawford to the Anglers’ Roost access, with broad current and cold-water exposure.', note: 'Use the FWP Wally Crawford record and Anglers’ Roost access conditions; the latter is privately owned but publicly available under posted check-in rules.' }),
  makeRoute({ id: 'bitterroot-river-anglers-roost-tucker-crossing', start: points.anglers, end: points.tucker, miles: 14, summary: 'A mid-valley Bitterroot reach from Anglers’ Roost through Hamilton-area water to Tucker Crossing near Victor.', note: 'Anglers’ Roost requires check-in at the store office; Tucker Crossing is a large FWP site with divided east/west access. Confirm both water-entry edges and current parking.' }),
  makeRoute({ id: 'bitterroot-river-tucker-crossing-bell-crossing', start: points.tucker, end: points.bell, miles: 8, summary: 'A compact Victor-area float from Tucker Crossing to the Bell Crossing FWP access and direct USGS gauge corridor.', note: 'FWP identifies both endpoints as public boating access. Bell Crossing is a gravel ramp; confirm the current ramp, bridge features and downstream shuttle staging.' }),
  makeRoute({ id: 'bitterroot-river-bell-crossing-poker-joe', start: points.bell, end: points.poker, miles: 12, summary: 'A central Bitterroot Valley reach from Bell Crossing through the Stevensville corridor to Poker Joe’s walk-in access.', note: 'Poker Joe is a walk-in access with a quarter-mile carry and seasonal construction notices in the FWP record; confirm the parking project and carry before departure.' }),
  makeRoute({ id: 'bitterroot-river-poker-joe-chief-looking-glass', start: points.poker, end: points.chief, miles: 9, summary: 'A lower-valley reach from Poker Joe to Chief Looking Glass, ending at a developed FWP hand launch with camping.', note: 'Use Poker Joe only if its current closure and parking status allow; Chief Looking Glass has a hand launch, toilets, water and designated camping under FWP rules.' }),
  makeRoute({ id: 'bitterroot-river-bell-crossing-chief-looking-glass', start: points.bell, end: points.chief, miles: 21, summary: 'A longer Stevensville-to-Lolo Bitterroot itinerary linking Bell Crossing, Poker Joe and Chief Looking Glass.', note: 'Poker Joe is an intermediate bailout with a longer carry; Chief Looking Glass is the documented downstream FWP take-out. Keep a daylight and wood-scouting margin.' }),
  makeRoute({ id: 'bitterroot-river-hannon-chief-looking-glass', start: points.hannon, end: points.chief, miles: 72, summary: 'A staged upper-to-lower Bitterroot itinerary through the documented FWP access chain from Hannon Memorial to Chief Looking Glass.', note: 'This is a staged itinerary, not a single-day promise. Confirm each section’s floating-day restriction, designated campsite availability, shuttle logistics and current closures before committing.' }),
];
