import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const paddleGuide = { label: 'Willimantic River Water Trail paddle guide (2013)', url: 'https://thelastgreenvalley.org/wp-content/uploads/2014/10/WilliPaddle2013web.pdf', provider: 'local' as const };
const updatedPaddleGuide = { label: 'Willimantic River Water Trail paddle guide (2016)', url: 'https://thelastgreenvalley.org/wp-content/uploads/2024/08/PaddleGuide2016xweb.pdf', provider: 'local' as const };
const trailFinder = { label: 'Connecticut Trail Finder: Willimantic River Water Trail', url: 'https://www.cttrailfinder.com/trails/trail/willimantic-river-water-trail', provider: 'local' as const };
const trailManager = { label: 'The Last Green Valley: Eagleville to Willimantic access note', url: 'https://thelastgreenvalley.org/member-directory/willimantic-river-nrt-eagleville-lake-to-route-66-columbia/', provider: 'local' as const };
const gaugeMerrow = { id: 'usgs-01119382', provider: 'usgs' as const, siteId: '01119382', metric: 'gage_height_ft' as const, unit: 'ft' as const, kind: 'direct' as const, siteName: 'Willimantic River at Merrow Road, CT', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-01119382/' };
const gaugeCoventry = { id: 'usgs-01119500', provider: 'usgs' as const, siteId: '01119500', metric: 'gage_height_ft' as const, unit: 'ft' as const, kind: 'direct' as const, siteName: 'Willimantic River near Coventry, CT', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-01119500/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'dam', 'private_banks'];

const commuter = { name: 'Route 32 Stafford Springs commuter lot river access', latitude: 41.945072, longitude: -72.304525 };
const nye = { name: 'Nye-Holman State Forest on Route 74 river access', latitude: 41.883264, longitude: -72.306808 };
const heron = { name: 'Heron Cove Park river launch', latitude: 41.877874, longitude: -72.309214 };
const pecks = { name: "Peck's Mill Landing river landing", latitude: 41.845601, longitude: -72.308954 };
const merrow = { name: 'Merrow Meadow Park river access', latitude: 41.824032, longitude: -72.313119 };
const riverPark = { name: 'River Park on Plains Road river launch', latitude: 41.797428, longitude: -72.300799 };
const eaglevilleLake = { name: 'Eagleville Lake Dam upstream river access', latitude: 41.784596, longitude: -72.2816 };
const eaglevilleDownstream = { name: 'Eagleville Preserve Trail downstream portage access', latitude: 41.783823, longitude: -72.280312 };
const route66 = { name: 'Route 66 bridge upstream-side take-out (river mile 21.4; 2016 guide)', latitude: 41.717607, longitude: -72.244654 };

// River-mile markers from The Last Green Valley's 2016 guide. The 2013 guide
// also documents the Route 66 take-out, which is an earlier exit than Air Line Trail.
const riverMileByAccess = new Map<object, number>([
  [commuter, 0.0],
  [nye, 5.9],
  [heron, 6.5],
  [pecks, 9.2],
  [merrow, 10.8],
  [riverPark, 13.7],
  [eaglevilleLake, 15.1],
  [eaglevilleDownstream, 15.2],
  [route66, 21.4],
]);

const common = {
  name: 'Willimantic River', riverId: 'willimantic-river-connecticut', state: 'Connecticut', region: 'Tolland / Windham Counties', routeType: 'recreational' as const, scoreEligibility: 'scored' as const,
  sourceLinks: [paddleGuide, updatedPaddleGuide, trailFinder, trailManager, { label: 'USGS Merrow gauge', url: gaugeMerrow.detailUrl, provider: 'usgs' as const }, { label: 'USGS Coventry gauge', url: gaugeCoventry.detailUrl, provider: 'usgs' as const }],
};

function makeRoute(spec: { id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; summary: string; time: string; note: string; gauge: typeof gaugeMerrow | typeof gaugeCoventry; threshold: number; thresholdValue: string; difficulty: 'easy' | 'moderate'; watch?: string[] }): River {
  const putInRiverMile = riverMileByAccess.get(spec.putIn!);
  const takeOutRiverMile = riverMileByAccess.get(spec.takeOut!);
  if (putInRiverMile === undefined || takeOutRiverMile === undefined) {
    throw new Error(`Missing guide river-mile marker for ${spec.id}`);
  }
  const miles = Math.round(Math.abs(takeOutRiverMile - putInRiverMile) * 10) / 10;
  const profile = {
    thresholdModel: 'minimum-only' as const, tooLow: spec.threshold, idealMin: spec.threshold,
    thresholdSource: paddleGuide, thresholdSourceStrength: 'community' as const, rainfallSensitivity: 'high' as const, windSensitivity: 0.15,
    seasonMonths: [4, 5, 6, 7, 8, 9, 10], seasonNotes: 'Rainfall and dam operations can change the Willimantic quickly. Check the named direct gauge, trend, weather and access notices immediately before launch.',
    difficulty: spec.difficulty, difficultyNotes: 'The water trail ranges from narrow quickwater and Class II features to flatwater impoundment. Scout every drop, strainer, bridge and dam boundary; stop at the documented take-out.',
    confidenceNotes: 'The Willimantic River Water Trail guide, prepared by the Willimantic River Alliance and The Last Green Valley, publishes the named access coordinates, river-mile sequence, paddling conditions and direct USGS gauge cues. The minimum is a conservative community planning floor, not a safety guarantee.',
  };
  return {
    ...common, id: spec.id, slug: spec.id, reach: spec.reach, putIn: spec.putIn, takeOut: spec.takeOut,
    latitude: spec.putIn!.latitude!, longitude: spec.putIn!.longitude!, summary: spec.summary,
    statusText: `Use direct USGS ${spec.gauge.siteId} stage and verify trend, rainfall, dam notices, wood and access conditions before launch.`, gaugeSource: spec.gauge, profile,
    safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: [
      'Wear a Coast Guard-approved PFD and carry communication, offline navigation and a spare paddle.',
      'Scout the old low-head drop, Class II quickwater, strainers, bridge debris and changing current; portage or turn around when conditions exceed your skill.',
      'Never run Eagleville Dam or any other dam; use the documented upstream or downstream portage access and stop at the named take-out.',
      'Cold water, high-flow barbed-wire strainers, low branches and muddy or awkward launch edges remain serious hazards.',
      ...(spec.takeOut === route66 ? ['The 2016 guide documents this Route 66 take-out at river mile 21.4, an earlier exit than Air Line Trail at river mile 22.5. Air Line Trail is the last public landing; if you continue downstream, leave the river there before the dangerous falls and current, with no public landing beyond it.'] : []),
    ] },
    accessPoints: [{ ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition' as const, note: spec.note }, { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: miles, segmentKind: 'transition' as const, note: 'Confirm the public water-entry edge, parking, landing footing and current notices before staging.' }],
    logistics: { distanceLabel: `About ${miles} river miles`, estimatedPaddleTime: spec.time, shuttle: 'Stage the downstream vehicle at the named public access, then drive to the upstream launch.', permits: 'Confirm weekend-only parking, state-forest, town-park and current water-trail access rules before unloading.', camping: 'No overnight camping is included; use separately permitted campgrounds and never camp on private banks.', campingClassification: 'none' as const, summary: spec.summary, accessCaveats: ['Use only the named public access points and existing paths.', 'Do not run dams or continue past the documented take-out toward Willimantic hazards.', 'Recheck water level, trend, weather, wood and temporary closures.', ...(spec.takeOut === route66 ? ['Route 66 at river mile 21.4 is the earlier exit. Air Line Trail at mile 22.5 is the last public landing before dangerous downstream falls and current.'] : [])], watchFor: spec.watch ?? ['Low-water rocks and changing current', 'Strainers, low branches and bridge debris', 'Cold water, high-flow hazards and dam boundaries'] },
    evidenceNotes: [{ label: 'Named reach and access', value: `${spec.reach}; ${miles} river miles`, note: 'The Willimantic River Water Trail guides publish the selected public access coordinates, river-mile sequence and on-water conditions.', sourceUrl: updatedPaddleGuide.url }, { label: 'Scoring band', value: spec.thresholdValue, note: `The community water-trail guide identifies the direct USGS ${spec.gauge.siteId} stage cue for this corridor. Verify live telemetry and trend before travel.`, sourceUrl: paddleGuide.url }, { label: 'Direct gauge', value: `USGS ${spec.gauge.siteId}`, note: `Direct Willimantic River stage telemetry at ${spec.gauge.siteName}.`, sourceUrl: spec.gauge.detailUrl }, ...(spec.takeOut === route66 ? [{ label: 'Route 66 access context', value: 'Earlier documented take-out at river mile 21.4', note: 'The 2016 guide identifies Air Line Trail at river mile 22.5 as the last public landing, about 1.1 river miles downstream of Route 66.', sourceUrl: updatedPaddleGuide.url }] : [])],
  };
}

export const connecticutWillimanticRoutes: River[] = [
  makeRoute({ id: 'willimantic-river-commuter-nye-holman', reach: 'Route 32 Stafford Springs commuter lot to Nye-Holman State Forest', putIn: commuter, takeOut: nye, summary: 'The upper Willimantic water-trail reach from the weekend commuter-lot launch through narrow forested quickwater to Nye-Holman State Forest.', time: 'Allow 4–6 hours with drop scouting and wood checks', note: 'The guide places the put-in 25 feet from the weekend commuter lot and warns of a two-foot old low-head drop 0.8 mile downstream; scout from river left.', gauge: gaugeMerrow, threshold: 2.1, thresholdValue: 'At least 2.1 ft on the Merrow gauge; below that the upper river becomes increasingly bony', difficulty: 'moderate', watch: ['Two-foot old low-head drop 0.8 mile below launch', 'Low branches, Rock Garden and strainers', 'Trout-management water and fast rises'] }),
  makeRoute({ id: 'willimantic-river-heron-cove-pecks-mill', reach: "Heron Cove Park to Peck's Mill Landing", putIn: heron, takeOut: pecks, summary: "A compact Willimantic reach through the guide's Class II quickwater, boulders and Pulpit Rock approach to the public Peck's Mill landing.", time: 'Allow 2–4 hours with Class II scouting and the tricky landing', note: "The guide documents Heron Cove's public launch and warns of Class II rapids, an informal rock dam, boulders and a small eddy at the Peck's Mill landing.", gauge: gaugeMerrow, threshold: 2.1, thresholdValue: 'At least 2.1 ft on the Merrow gauge; below that the river becomes increasingly bony', difficulty: 'moderate', watch: ['Class II rapids and informal rock dam', 'Pulpit Rock, submerged boulders and standing waves', "Tricky current at the no-road Peck's Mill landing"] }),
  makeRoute({ id: 'willimantic-river-river-park-eagleville-lake', reach: 'River Park on Plains Road to Eagleville Lake Dam upstream access', putIn: riverPark, takeOut: eaglevilleLake, summary: 'A short lower Willimantic reach from the novice-friendly River Park ramp to the popular Eagleville Lake upstream access at the dam boundary.', time: 'Allow 2–3 hours with dam-boundary and wind checks', note: 'River Park is immediately upstream of the Eagleville impoundment; the guide identifies Eagleville Lake as a popular flatwater destination and warns that the water edge at the dam is steep rip-rap.', gauge: gaugeCoventry, threshold: 4.2, thresholdValue: 'At least 4.2 ft on the Coventry gauge for adequate depth above and below Eagleville Dam', difficulty: 'easy', watch: ['Eagleville Dam and impoundment boundary', 'Wind on Eagleville Lake', 'Steep rip-rap at the upstream dam access'] }),
  makeRoute({ id: 'willimantic-river-eagleville-route-66', reach: 'Eagleville Preserve downstream portage access to Route 66 bridge take-out', putIn: eaglevilleDownstream, takeOut: route66, summary: 'The documented downstream Willimantic water-trail section after the Eagleville Dam portage, with deeper channel, wooded bends and the earlier Route 66 take-out.', time: 'Allow 4–7 hours after the dam portage with bridge, strainer and fence checks', note: 'The guide requires a carry around Eagleville Dam to the Preserve trail and describes the bank as rough. The 2016 guide documents Route 66 as an earlier take-out; current trail sources identify Air Line Trail at river mile 22.5 as the last public landing farther downstream.', gauge: gaugeCoventry, threshold: 4.2, thresholdValue: 'At least 4.2 ft on the Coventry gauge; lower readings make the reach scratchy', difficulty: 'moderate', watch: ['Mandatory Eagleville Dam portage and rough downstream bank', 'Barbed-wire fences become dangerous strainers at high flow', 'Route 66 is an earlier documented exit; Air Line Trail at river mile 22.5 is the last public landing.'] }),
  makeRoute({ id: 'willimantic-river-commuter-route-66', reach: 'Route 32 Stafford Springs commuter lot to Route 66 bridge take-out', putIn: commuter, takeOut: route66, summary: 'A 21.4-mile upper-to-lower itinerary to the Route 66 take-out documented in the 2016 guide; Air Line Trail at river mile 22.5 is the last public landing downstream.', time: 'Plan a full daylight day with scouting, the dam carry and shuttle margin', note: 'Use every named public access as a bailout and carry around Eagleville Dam via the Preserve trail. This route follows the older Route 66 endpoint; compare the later guide and trail-manager access note before launching.', gauge: gaugeCoventry, threshold: 4.2, thresholdValue: 'At least 4.2 ft on the Coventry gauge; lower readings make the reach scratchy', difficulty: 'moderate', watch: ['Old low-head drop and Class II quickwater', 'Mandatory Eagleville Dam portage', 'Air Line Trail at river mile 22.5 is the last public landing downstream'] }),
];
