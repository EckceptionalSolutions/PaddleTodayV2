import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const riverGuide = { label: 'BLM Rio Grande and Red River Wild and Scenic Rivers', url: 'https://www.blm.gov/programs/national-conservation-lands/new-mexico/rio-grande-wsr', provider: 'local' as const };
const segmentGuide = { label: 'BLM Rio Grande and Rio Chama river segment descriptions', url: 'https://www.blm.gov/sites/blm.gov/files/NM_Rio_Grande_and_Rio_Chama_River_Segments.pdf', provider: 'local' as const };
const gaugeGuide = { label: 'USGS Rio Grande below Taos Junction Bridge', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-08276500', provider: 'usgs' as const };
const whitewaterGuide = { label: 'American Whitewater Rio Grande reach descriptions', url: 'https://www.americanwhitewater.org/content/River/view/river-index/state/USA-NME', provider: 'local' as const };
const flowGuide = { label: 'BoaterBeta Racecourse flow history', url: 'https://www.boaterbetaco.com/segment_detail/riog-22_rio-grande_race-course-pilar/', provider: 'local' as const };
const accessGuide = { label: 'Recreation.gov Rio Bravo access details', url: 'https://www.recreation.gov/camping/campgrounds/10382450', provider: 'local' as const };
const gauge = { id: 'usgs-08276500', provider: 'usgs' as const, siteId: '08276500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Rio Grande below Taos Junction Bridge near Taos, NM', detailUrl: gaugeGuide.url };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'];

const common = {
  name: 'Rio Grande', riverId: 'rio-grande-new-mexico', state: 'New Mexico', region: 'Taos County / Rio Grande del Norte', routeType: 'recreational' as const, scoreEligibility: 'scored' as const, gaugeSource: gauge,
  profile: { thresholdModel: 'two-sided' as const, tooLow: 200, idealMin: 400, idealMax: 1200, tooHigh: 3000, thresholdSource: flowGuide, thresholdSourceStrength: 'community' as const, rainfallSensitivity: 'medium' as const, windSensitivity: 0.45, seasonMonths: [3,4,5,6,7,8,9,10], seasonNotes: 'Snowmelt and monsoon weather can change the gorge quickly. Check the Taos Junction gauge, trend, wind, storms, BLM notices and access fees before launch.', difficulty: 'moderate' as const, difficultyNotes: 'The selected access chain includes BLM Class II Orilla Verde water and the Class III Racecourse. Bridges, hydraulics, cold water, private-bank boundaries and changing current require scouting and conservative craft selection.', confidenceNotes: 'BLM names the selected access sites and rates Orilla Verde Class II and Racecourse Class III–IV. American Whitewater and BoaterBeta tie the Racecourse to direct USGS 08276500 with a 200 cfs minimum and 3,000 cfs maximum planning range; these are planning cues, not safety guarantees.' },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: ['Wear a PFD and carry throw rope, communication, offline navigation and spare layers.', 'Scout rapids, strainers and bridge hazards; never stop on private banks or in restricted quiet zones.', 'Use only the named BLM or managed access sites, pay day-use fees where required and obey parking rules.', 'Cold water, canyon wind, limited exits and rapid flow changes can delay assistance.'] },
  sourceLinks: [riverGuide, segmentGuide, gaugeGuide, whitewaterGuide, flowGuide, accessGuide],
};

function makeRoute(spec: { id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; miles: number; summary: string; time: string; note: string; watch?: string[] }): River {
  return { ...common, id: spec.id, slug: spec.id, reach: spec.reach, putIn: spec.putIn, takeOut: spec.takeOut, latitude: spec.putIn!.latitude!, longitude: spec.putIn!.longitude!, summary: spec.summary, statusText: 'Check USGS 08276500, wind, storms, BLM notices and current access rules before launch; cold water, strainers and whitewater remain hazards.', accessPoints: [{ ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note }, { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm current BLM access, parking, water entry and take-out conditions before staging.' }], logistics: { distanceLabel: `About ${spec.miles} river miles`, estimatedPaddleTime: spec.time, shuttle: 'Stage the downstream vehicle at the named access, then drive to the upstream launch.', permits: 'Private boaters do not need a Rio Grande boating permit, but BLM day-use fees, parking rules and any segment-specific registration or closures apply.', camping: 'No overnight camping is included; use established BLM campgrounds and do not camp on private banks.', campingClassification: 'none', summary: spec.summary, accessCaveats: ['Use only named BLM or managed access points and designated parking.', 'Respect quiet zones, private property and bridge restrictions.', 'Recheck seasonal access, fees, road conditions and current river hazards.'], watchFor: spec.watch ?? ['Taos Junction gauge and fast rises', 'Cold water, wind and strainers', 'Bridge and private-bank hazards'] }, evidenceNotes: [{ label: 'BLM segment', value: spec.reach, note: 'BLM river-segment guidance names the selected launch and take-out sites and provides the difficulty context.', sourceUrl: segmentGuide.url }, { label: 'Scoring band', value: '200 cfs minimum; 400–1,200 cfs float planning range; 3,000 cfs maximum', note: 'American Whitewater/BoaterBeta tie the Racecourse guidance to USGS 08276500. Recheck live telemetry and reach-specific advice before travel.', sourceUrl: flowGuide.url }, { label: 'Gauge', value: 'USGS 08276500 below Taos Junction Bridge', note: 'Direct telemetry for the selected Orilla Verde and Racecourse corridor; verify current value and trend.', sourceUrl: gaugeGuide.url }] };
}

export const newMexicoRioGrandeRoutes: River[] = [
  makeRoute({ id: 'rio-grande-taos-junction-quartzite', reach: 'Taos Junction Bridge to Quartzite River Access', putIn: { name: 'Taos Junction Bridge Boat Launch, Orilla Verde', latitude: 36.33569, longitude: -105.73386 }, takeOut: { name: 'Quartzite River Access', latitude: 36.265419, longitude: -105.795125 }, miles: 6.6, summary: 'A named Class II Orilla Verde reach from the Taos Junction Bridge to the Quartzite access near Pilar.', time: 'Allow 3–5 hours with shuttle and scouting time', note: 'American Whitewater identifies the large Taos Junction ramp and Quartzite take-out; BLM requires designated parking and day-use fees at managed recreation areas.', watch: ['Low-flow split channels below the ramp', 'Orilla Verde quiet zone and bridge hazards', 'Quartzite hand-carry access and cold water'] }),
  makeRoute({ id: 'rio-grande-taos-junction-lone-juniper', reach: 'Taos Junction Bridge to Lone Juniper Site', putIn: { name: 'Taos Junction Bridge Boat Launch, Orilla Verde', latitude: 36.33569, longitude: -105.73386 }, takeOut: { name: 'Lone Juniper Boat Takeout', latitude: 36.29953, longitude: -105.77248 }, miles: 4.8, summary: 'A shorter Orilla Verde day reach ending at the named Lone Juniper boat take-out and campground access.', time: 'Allow 2–4 hours with shuttle and scouting time', note: 'BLM lists Lone Juniper as a designated Orilla Verde take-out. Recreation-area fees, parking limits and hand-carry access apply; confirm current site status before launch.', watch: ['Class II current and changing wind', 'Hand-carry take-out and campground traffic', 'Private banks and quiet-zone rules'] }),
  makeRoute({ id: 'rio-grande-quartzite-county-line', reach: 'Quartzite River Access to County Line River Access (Racecourse)', putIn: { name: 'Quartzite River Access', latitude: 36.265419, longitude: -105.795125 }, takeOut: { name: 'County Line River Access', latitude: 36.2301, longitude: -105.8561 }, miles: 4.4, summary: 'The popular Class III Racecourse from Quartzite to the BLM County Line ramp along NM 68.', time: 'Allow 2–4 hours with shuttle, scouting and current-dependent stops', note: 'American Whitewater calls this New Mexico’s most popular whitewater run; BoaterBeta lists 200 cfs minimum and 3,000 cfs maximum planning flows. Park only in designated areas and leave room for commercial shuttles.', watch: ['Class III rapids and Souse Hole hydraulic', 'High-water bridge hazards above 4,000 cfs', 'Quartzite hand-carry launch and County Line parking rules'] }),
  makeRoute({ id: 'rio-grande-taos-junction-county-line', reach: 'Taos Junction Bridge to County Line River Access', putIn: { name: 'Taos Junction Bridge Boat Launch, Orilla Verde', latitude: 36.33569, longitude: -105.73386 }, takeOut: { name: 'County Line River Access', latitude: 36.2301, longitude: -105.8561 }, miles: 11.0, summary: 'A full Rio Grande del Norte day reach combining the Orilla Verde valley and Racecourse to the BLM County Line ramp.', time: 'Allow 5–8 hours with shuttle, scouting and current-dependent stops', note: 'Plan for the transition from Class II to Class III water at Quartzite and preserve the County Line hard take-out.' }),
  makeRoute({ id: 'rio-grande-lone-juniper-county-line', reach: 'Lone Juniper Site to County Line River Access (Racecourse)', putIn: { name: 'Lone Juniper Boat Takeout / launch access', latitude: 36.29953, longitude: -105.77248 }, takeOut: { name: 'County Line River Access', latitude: 36.2301, longitude: -105.8561 }, miles: 8.0, summary: 'A Racecourse-area reach from the managed Lone Juniper access through Quartzite to County Line.', time: 'Allow 4–6 hours with shuttle, scouting and current-dependent stops', note: 'Confirm Lone Juniper’s hand-carry launch suitability and preserve the Class III and County Line parking controls.' }),
  makeRoute({ id: 'rio-grande-lone-juniper-quartzite', reach: 'Lone Juniper Site to Quartzite River Access', putIn: { name: 'Lone Juniper Boat Takeout / launch access', latitude: 36.29953, longitude: -105.77248 }, takeOut: { name: 'Quartzite River Access', latitude: 36.265419, longitude: -105.795125 }, miles: 2.5, summary: 'A short Racecourse approach reach from Lone Juniper to the Quartzite hand-carry access.', time: 'Allow 1–3 hours with scouting and current-dependent stops', note: 'This short reach is still Class II–III moving water; confirm the Lone Juniper launch and Quartzite carry before departure.' }),
  {
    ...common,
    id: 'rio-grande-john-dunn-taos-junction',
    slug: 'rio-grande-john-dunn-taos-junction',
    scoreEligibility: 'planning',
    reach: 'John Dunn Bridge / Cebolla Mesa access to Taos Junction Bridge (Lower Taos Box)',
    putIn: { name: 'John Dunn Bridge / Cebolla Mesa access (water-entry edge)', latitude: 36.53455, longitude: -105.70969 },
    takeOut: { name: 'Taos Junction Bridge Boat Launch (water-entry edge)', latitude: 36.33569, longitude: -105.73386 },
    latitude: 36.53455,
    longitude: -105.70969,
    summary: 'The committing 15-mile Lower Taos Box through the Rio Grande del Norte gorge, a commercial-staple Class III–IV run for experienced whitewater crews.',
    statusText: 'Check USGS 08276500, snowmelt trend, wind, heat, BLM access and rescue logistics before committing; the gorge has few exits and no easy bailout.',
    profile: {
      ...common.profile,
      tooLow: 600,
      idealMin: 700,
      idealMax: 2500,
      tooHigh: 5000,
      thresholdSource: { label: 'Wilderness Portal Lower Taos Box guide', url: 'https://www.wildernessportal.com/routes/rio-grande-lower-taos-box', provider: 'local' as const },
      thresholdSourceStrength: 'community',
      difficulty: 'hard',
      difficultyNotes: 'Wilderness Portal and American Whitewater describe continuous Class III–IV water, a 31 ft/mi gradient and a committing gorge with few escapes. Run only with experienced boaters, suitable craft and a practiced rescue plan.',
      confidenceNotes: 'Wilderness Portal documents the 15-mile John Dunn/Cebolla Mesa to Taos Junction reach, Class III–IV character and 600 minimum / 700–2,500 classic / 5,000 maximum flow cues tied to direct USGS 08276500. Treat the community band as planning guidance, not a safety guarantee.',
      seasonNotes: 'Snowmelt usually peaks May–June; the Box becomes powerful at peak runoff and technical or bony as summer flows drop. Check weather, wind and closures immediately before launch.',
    },
    safetyProfile: {
      riskLevel: 'caution',
      reviewStatus: 'reviewed',
      hazards: ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'private_banks'],
      safetyNotes: [
        'Use a fitted PFD, whitewater helmet, cold-water protection, throw bags, spare paddles, communication and a group rescue plan.',
        'Scout Ski Jump, Boat Reactor, Rock Garden and other named drops; the gorge has long swims, steep walls and few exits.',
        'Carry enough water and sun protection for an exposed desert canyon, and never rely on cell coverage or an unplanned hike-out.',
        'Use only the named BLM or managed access areas, confirm shuttle and parking logistics, and respect private-bank and quiet-zone boundaries.',
      ],
    },
    sourceLinks: [...common.sourceLinks, { label: 'Wilderness Portal Lower Taos Box guide', url: 'https://www.wildernessportal.com/routes/rio-grande-lower-taos-box', provider: 'local' as const }, { label: 'USGS Taos Junction gauge', url: gaugeGuide.url, provider: 'usgs' as const }],
    accessPoints: [
      { name: 'John Dunn Bridge / Cebolla Mesa access (water-entry edge)', latitude: 36.53455, longitude: -105.70969, id: 'rio-grande-john-dunn-taos-junction-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Wilderness Portal identifies the John Dunn/Cebolla Mesa start; confirm the steep trail, parking, BLM access and current water entry before unloading.' },
      { name: 'Taos Junction Bridge Boat Launch (water-entry edge)', latitude: 36.33569, longitude: -105.73386, id: 'rio-grande-john-dunn-taos-junction-take-out', mileFromStart: 15, segmentKind: 'transition', note: 'Large managed BLM launch at Taos Junction; stage the downstream vehicle and confirm the take-out, fees and current road conditions.' },
    ],
    logistics: {
      distanceLabel: 'About 15 river miles',
      estimatedPaddleTime: 'Allow a full 8–12 hour day with scouting, remote logistics and shuttle margin',
      shuttle: 'Stage the downstream vehicle at Taos Junction, then drive to the John Dunn Bridge / Cebolla Mesa access.',
      permits: 'Confirm BLM day-use, parking, shuttle and any current segment restrictions before departure.',
      camping: 'No overnight camping is included; use separately permitted BLM campgrounds or lodging and do not camp in the gorge without current authorization.',
      campingClassification: 'none',
      summary: 'A committing, expert-only Lower Taos Box day with no reliable mid-gorge bailout.',
      accessCaveats: ['Confirm the steep John Dunn/Cebolla Mesa trail and boat carry before committing.', 'No dependable mid-gorge road access; carry spare gear and plan self-rescue.', 'Do not extend beyond Taos Junction without a separate downstream access and hazard review.'],
      watchFor: ['USGS 08276500 and 600 cfs low guard', 'Class III–IV drops, long swims and canyon walls', 'Heat, wind, limited exits and BLM access rules'],
    },
    evidenceNotes: [
      { label: 'Named reach and distance', value: 'John Dunn Bridge / Cebolla Mesa to Taos Junction; 15 miles', note: 'Wilderness Portal documents the named Lower Taos Box reach, 31 ft/mi gradient, endpoint coordinates and Class III–IV character; American Whitewater and BLM provide the supporting corridor context.', sourceUrl: 'https://www.wildernessportal.com/routes/rio-grande-lower-taos-box' },
      { label: 'Scoring band', value: '600 cfs minimum; 700–2,500 cfs classic; 5,000 cfs maximum reference', note: 'Wilderness Portal ties these community cues to direct USGS 08276500 below Taos Junction. Verify live telemetry, trend, weather and local reports.', sourceUrl: 'https://www.wildernessportal.com/routes/rio-grande-lower-taos-box' },
      { label: 'Gauge', value: 'USGS 08276500 below Taos Junction Bridge', note: 'Direct Rio Grande telemetry for the Lower Taos Box corridor; recheck current observation and trend before launch.', sourceUrl: gaugeGuide.url },
      { label: 'Safety and access', value: 'Class III–IV committing gorge with few exits', note: 'Wilderness Portal and American Whitewater describe the technical character, remote access and need for experienced crews, suitable craft and self-rescue planning.', sourceUrl: whitewaterGuide.url },
    ],
  },
];
