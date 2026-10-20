import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';
import { buildStarterPlanningRoute } from './starter-planning';

const fwpAccess = { label: 'Montana FWP Fishing Access Sites', url: 'https://fwp.mt.gov/fish/fishing-access', provider: 'local' as const };
const floatRules = { label: 'Montana FWP Bitterroot floating restrictions and permits', url: 'https://fwp.mt.gov/buyandapply/specialuseriverpermits', provider: 'local' as const };
const accessInventory = { label: 'Montana FWP Region 2 access inventory', url: 'https://myfwp.mt.gov/fishMT/region/2', provider: 'local' as const };
const campingGuide = { label: 'FWP 2017 access/camping guide (historical context)', url: 'https://fwp.mt.gov/binaries/content/assets/fwp/fish/misc/fas-guide---2017---fullversion.pdf', provider: 'local' as const };
const upperMap = { label: 'FWP upper Bitterroot restricted sections map', url: 'https://myfwp.mt.gov/getRepositoryFile?objectID=84999', provider: 'local' as const };
const hannon = { label: 'FWP Hannon Memorial FAS detail', url: 'https://myfwp.mt.gov/fishMT/fas/39754135', provider: 'local' as const };
const wally = { label: 'FWP Wally Crawford FAS detail', url: 'https://myfwp.mt.gov/fishMT/fas/39754217', provider: 'local' as const };
const bell = { label: 'FWP Bell Crossing FAS detail', url: 'https://myfwp.mt.gov/fishMT/fas/39754137', provider: 'local' as const };
const chief = { label: 'FWP Chief Looking Glass FAS detail', url: 'https://myfwp.mt.gov/fishMT/fas/39754131', provider: 'local' as const };
const anglers = { label: 'FWP Anglers’ Roost private access detail', url: 'https://myfwp.mt.gov/fishMT/fas/39753889', provider: 'local' as const };
const tucker = { label: 'FWP Tucker Crossing FAS detail', url: 'https://myfwp.mt.gov/fishMT/fas/39754143', provider: 'local' as const };
const poker = { label: 'FWP Poker Joe walk-in access and restriction notice', url: 'https://myfwp.mt.gov/fishMT/fas/39754187', provider: 'local' as const };
const gauge = { id: 'usgs-12350250', provider: 'usgs' as const, siteId: '12350250', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Bitterroot River at Bell Crossing near Victor, MT', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-12350250/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'];

const points = {
  hannon: { name: 'Hannon Memorial Fishing Access Site (access-site anchor)', latitude: 45.97282, longitude: -114.1401 },
  wally: { name: 'Wally Crawford Fishing Access Site (water-entry edge)', latitude: 46.09178, longitude: -114.17493 },
  anglers: { name: "Anglers' Roost Fishing Access (water-entry edge)", latitude: 46.19893, longitude: -114.16943 },
  tucker: { name: 'Tucker Crossing Fishing Access Site (water-entry edge)', latitude: 46.36838, longitude: -114.13737 },
  bell: { name: 'Bell Crossing Fishing Access Site (access anchor)', latitude: 46.44434, longitude: -114.12629 },
  poker: { name: 'Poker Joe Fishing Access Site (water-entry edge)', latitude: 46.58602, longitude: -114.06829 },
  chief: { name: 'Chief Looking Glass FAS access-area anchor', latitude: 46.66165, longitude: -114.05355 },
};
type BitterrootPoint = typeof points[keyof typeof points];

function makeRoute(spec: { id: string; start: BitterrootPoint; end: BitterrootPoint; miles: number; summary: string; note: string; sources: River['sourceLinks'] }): River {
  const namedSection = spec.id === 'bitterroot-river-hannon-wally';
  const wholeValley = spec.id === 'bitterroot-river-hannon-chief-looking-glass';
  const distanceNote = namedSection
    ? 'FWP lists Section 4, Hannon Memorial to Wally Crawford, as nine miles. This is the manager’s section length, not a measured line through the current braided channel.'
    : wholeValley
      ? 'The catalog’s 72-mile estimate is unverified and does not reconcile with the six component labels, which currently total 65 miles after the Hannon–Wally correction. Neither total is a validated full itinerary. Confirm every stage and distance before planning an overnight or shuttle.'
      : 'Unverified catalog planning estimate. FWP documents the access sites, but the linked site records do not publish this endpoint-pair distance or establish continuous passage.';
  const route = buildStarterPlanningRoute({
    id: spec.id, name: 'Bitterroot River', riverId: 'bitterroot-river-montana', state: 'Montana', region: 'Bitterroot Valley / Ravalli and Missoula counties',
    putIn: spec.start, takeOut: spec.end, miles: spec.miles, summary: spec.summary, difficulty: 'moderate',
    difficultyNotes: 'The Bitterroot is generally moving Class I water with cold-water consequences, braided channels, strainers and occasional stronger current. Upper sections have special floating-day restrictions and limited exits; scout every bend and bridge.',
    seasonMonths: [5, 6, 7, 8, 9], seasonNotes: 'Late spring through summer is the primary floating season. Snowmelt, rain, irrigation operations, wildfire smoke and FWP seasonal restrictions can change conditions quickly.',
    gauge, conditionsNote: `USGS ${gauge.siteId} measures the Bitterroot at Bell Crossing near Victor. It is context for this access plan, with no calibrated recreational flow cutoff or same-day score. A reading there does not establish access, depth or passage throughout the valley.`, hazards,
    safetyNotes: [
      'Wear a properly fitted PFD and carry a whistle, spare paddle, throw rope, communication and cold-water layers.',
      'Scout strainers, sweepers, braided channels and bridge features; turn around when wood or current removes a reliable rescue line.',
      'Check Montana FWP access and conservation-license rules and current closures. Apply floating-day restrictions only to their named sections; the upper-river outfitter calendar is not a blanket recreational floating ban.',
      'Use only named FWP or authorized private access sites. Respect private banks and do not improvise shoreline bailouts.',
      'Use designated FWP campsites only for overnight travel; otherwise plan a nearby basecamp and finish in daylight.',
    ],
    logistics: {
      estimatedPaddleTime: spec.miles > 35
        ? 'Plan staged multi-day travel with confirmed intermediate take-outs, legal overnight arrangements and shuttle support'
        : 'Estimate duration locally after confirming distance, current, scouting, carries and shuttle; no verified travel time is published here',
      shuttle: 'Arrange a one-way car shuttle only after confirming both endpoint permissions and opening status. Stage the downstream landing first, then drive to the upstream launch. Check gates, parking, carries and the actual water entry.',
      permits: 'Confirm Montana FWP access rules, conservation license requirements and Bitterroot floating restrictions before unloading.',
      camping: 'No overnight river camping is assumed. Use an established campground or lodging near Hamilton, Stevensville or Lolo; only designated FWP camping areas may be used for on-route overnights.',
      campingClassification: 'nearby_basecamp',
      accessCaveats: [spec.note, 'Do not substitute private shoreline or a closed FAS for a legal take-out.', 'Recheck current access, restrictions, weather, wood and flow trend before staging.'],
      watchFor: ['USGS 12350250 trend and snowmelt/rain rise', 'Strainers, braided channels, bridge features and cold water', 'FWP floating-day restrictions, closures and conservation-license rules'],
    },
    guide: namedSection ? floatRules : fwpAccess, sources: [...new Map([accessInventory, ...spec.sources, fwpAccess, floatRules, campingGuide, hannon, wally, bell, chief].map(source => [source.url, source])).values()], coordinateNote: 'Coordinates match Montana FWP Region 2 records for the named facilities. These are facility points, not verified launch toes or proof of a continuous navigable trip. Verify the carry, current gate, parking and landing conditions before departure.', coordinateSourceUrl: accessInventory.url, reviewDate: '2026-10-20',
  });
  route.logistics!.distanceLabel = namedSection ? 'About 9 river miles (FWP Section 4)' : `About ${spec.miles} river miles (unverified planning estimate)`;
  route.evidenceNotes = route.evidenceNotes.map(note => note.label === 'Route and distance'
    ? { ...note, value: namedSection ? '9 miles — FWP Section 4' : `${spec.miles} miles — unverified estimate`, note: distanceNote, sourceUrl: namedSection ? floatRules.url : accessInventory.url }
    : note);
  if (!namedSection) route.logistics!.accessCaveats.unshift(distanceNote);
  return route;
}

export const montanaBitterrootRoutes: River[] = [
  makeRoute({ id: 'bitterroot-river-hannon-wally', start: points.hannon, end: points.wally, miles: 9, summary: 'FWP Section 4: Hannon Memorial to Wally Crawford, a nine-mile upper Bitterroot section with a distinct seasonal outfitter calendar.', note: 'Hannon’s day-use area has the concrete boat launch, separate from its camping area; Wally Crawford has a concrete ramp. FWP prohibits float outfitting on this section on Mondays from June 1 through September 15. This is not a ban on all recreational floating; public recreational users do not need the restricted-river commercial permit. Check separate access, fishing-license and current closure requirements.', sources: [hannon, wally, upperMap] }),
  makeRoute({ id: 'bitterroot-river-wally-anglers-roost', start: points.wally, end: points.anglers, miles: 13, summary: 'Compare Wally Crawford and Anglers’ Roost as access choices, subject to private landing permission and a local check of the intervening river.', note: 'Wally Crawford has a concrete ramp. Anglers’ Roost is privately owned; FWP describes public angling use with check-in at the store. Confirm permission for your intended boat landing directly with the owner before staging; the FWP listing is not blanket public boating permission.', sources: [wally, anglers] }),
  makeRoute({ id: 'bitterroot-river-anglers-roost-tucker-crossing', start: points.anglers, end: points.tucker, miles: 14, summary: 'Research a Hamilton-area start at private Anglers’ Roost and a finish at Tucker Crossing’s west-side boat launch.', note: 'Anglers’ Roost requires store check-in; confirm the owner permits your intended boat launch. FWP places Tucker Crossing’s concrete boat launch at Tucker West, not the larger east-side property. Check current wood, channel and closure reports before linking the sites.', sources: [anglers, tucker] }),
  makeRoute({ id: 'bitterroot-river-tucker-crossing-bell-crossing', start: points.tucker, end: points.bell, miles: 8, summary: 'Compare Tucker West and Bell Crossing for a Victor-area access plan near the Bell Crossing observation station.', note: 'Use the Tucker West concrete boat launch; Bell Crossing has a gravel ramp. Inspect the current landing, bridge features and channel before staging the downstream shuttle. The station near Bell does not establish passage from Tucker.', sources: [tucker, bell] }),
  makeRoute({ id: 'bitterroot-river-bell-crossing-poker-joe', start: points.bell, end: points.poker, miles: 12, summary: 'Research Bell Crossing to Poker Joe only after confirming that the walk-in finish is open and its carry is practical for your boat.', note: 'Poker Joe is walk-in only, with a quarter-mile carry to the river. FWP’s page carries a July 7 parking/latrine construction closure notice without a year or reopening date. Confirm reopening with FWP before using it as a landing; do not infer current availability from the generic season field or use a closed site.', sources: [bell, poker] }),
  makeRoute({ id: 'bitterroot-river-poker-joe-chief-looking-glass', start: points.poker, end: points.chief, miles: 9, summary: 'Research a lower-valley plan from Poker Joe’s conditional walk-in access to Chief Looking Glass’s hand launch.', note: 'Poker Joe requires a quarter-mile carry and has an undated July 7 construction-closure notice. Confirm reopening with FWP before using it as a launch. Chief Looking Glass lists a hand launch, toilets, drinking water and designated camping; check current facilities and camping terms.', sources: [poker, chief] }),
  makeRoute({ id: 'bitterroot-river-bell-crossing-chief-looking-glass', start: points.bell, end: points.chief, miles: 21, summary: 'A longer access-planning combination joining the Bell–Poker Joe and Poker Joe–Chief Looking Glass choices.', note: 'The 21-mile label is the sum of two unverified catalog estimates, not an independently published FWP itinerary. Poker Joe is not a dependable bailout until FWP confirms reopening and a practical quarter-mile carry. Arrange confirmed legal exits and inspect wood and channel conditions before committing to the longer plan.', sources: [bell, poker, chief] }),
  makeRoute({ id: 'bitterroot-river-hannon-chief-looking-glass', start: points.hannon, end: points.chief, miles: 72, summary: 'An unverified staged valley-wide planning combination; resolve stage distances, permissions and legal exits before treating it as an itinerary.', note: 'The upper Hannon–Wally section has a June 1–September 15 Monday outfitter restriction; do not extend it to all lower sections or treat it as a recreational floating ban. Confirm Anglers’ Roost boat-use permission, Tucker West access and every overnight. Poker Joe’s undated closure notice means it cannot be assumed available as an exit.', sources: [floatRules, upperMap, hannon, wally, anglers, tucker, bell, poker, chief] }),
];
