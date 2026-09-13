import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const paddlerGuide = { label: 'Southwest Paddler San Juan River New Mexico access and hazards', url: 'https://southwestpaddler.com/docs/sanjuannm2.html', provider: 'local' as const };
const tourismGuide = { label: 'New Mexico Tourism San Juan River paddling overview', url: 'https://www.newmexico.org/things-to-do/outdoor-adventures/rafting-kayaking/san-juan-animas-rivers/', provider: 'local' as const };
const stateParksGuide = { label: 'New Mexico State Parks paddlesports safety guidance', url: 'https://www.emnrd.nm.gov/spd/activities/boating-2/paddle-sports/', provider: 'local' as const };
const navajoParkGuide = { label: 'Navajo Lake State Park boating and camping', url: 'https://www.emnrd.nm.gov/spd/find-a-park/navajo-lake-state-park/', provider: 'local' as const };
const gaugeUpper = { id: 'usgs-09355500', provider: 'usgs' as const, siteId: '09355500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'San Juan River near Archuleta, NM', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-09355500/' };
const gaugeLower = { id: 'usgs-09365000', provider: 'usgs' as const, siteId: '09365000', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'San Juan River at Farmington, NM', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-09365000/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'dam', 'private_banks'];

const navajoDam = { name: 'Navajo Dam public river launch (water-entry edge)', latitude: 36.8177528, longitude: -107.6297083 };
const blanco = { name: 'Blanco public access (water-entry edge)', latitude: 36.7251083, longitude: -107.8135028 };
const vereda = { name: 'Vereda del Rio public launch (water-entry edge)', latitude: 36.6995333, longitude: -107.9794694 };
const amongWaters = { name: 'Among the Waters Park public access (water-entry edge)', latitude: 36.7214944, longitude: -108.2238722 };

const common = {
  name: 'San Juan River', riverId: 'san-juan-river-new-mexico', state: 'New Mexico', region: 'San Juan River / Navajo Dam to Farmington', routeType: 'recreational' as const, scoreEligibility: 'scored' as const,
  profile: { thresholdModel: 'minimum-only' as const, tooLow: 300, idealMin: 500, thresholdSource: paddlerGuide, thresholdSourceStrength: 'community' as const, rainfallSensitivity: 'medium' as const, windSensitivity: 0.3, seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'The regulated tailwater is generally runnable year-round, but release changes, winter cold, summer heat, thunderstorms and monsoon sediment can change conditions. Check the applicable gauge and current release notices immediately before launch.', difficulty: 'easy' as const, difficultyNotes: 'The Navajo Dam-to-Blanco reach is mostly Class I–II flatwater. Downstream reaches add diversion dams, fences, bridge hazards and longer remote sections requiring portage and route-finding judgment.', confidenceNotes: 'New Mexico Tourism describes the 17-mile Navajo Dam-to-Blanco float as a relaxing run that can be used any time of year. Southwest Paddler publishes named public access points, reach mileages, a 300 cfs minimum planning cue and diversion/fence hazards. USGS 09355500 and 09365000 provide direct telemetry for the upper and Farmington corridors.' },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: ['Wear a properly fitted PFD and carry a whistle, spare paddle, throw device, communication, offline navigation, sun protection and sufficient water.', 'Check the applicable direct USGS gauge and trend, dam-release notices, weather, wind and cold-water temperature before launching. Do not treat 300 cfs as a safety guarantee.', 'Scout and portage every diversion dam and fence. New Mexico State Parks warns that low-head dams can be difficult to see and deadly; never run an unscouted structure.', 'Use only named public launch and take-out sites, respect private and Navajo Nation land boundaries, and plan for limited assistance on the lower corridor.'] },
  sourceLinks: [paddlerGuide, tourismGuide, stateParksGuide, navajoParkGuide],
};

function makeRoute(spec: { id: string; reach: string; putIn: River['putIn']; takeOut: River['takeOut']; miles: number; distanceLabel?: string; summary: string; time: string; note: string; watch: string[]; gauge: typeof gaugeUpper }): River {
  return {
    ...common,
    id: spec.id,
    slug: spec.id,
    reach: spec.reach,
    putIn: spec.putIn,
    takeOut: spec.takeOut,
    latitude: spec.putIn!.latitude!,
    longitude: spec.putIn!.longitude!,
    gaugeSource: spec.gauge,
    summary: spec.summary,
    statusText: `Check USGS ${spec.gauge.siteId}, release trend, weather, wind and current access notices before launch; portage all unscouted dams and fences.`,
    accessPoints: [
      { ...spec.putIn!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note },
      { ...spec.takeOut!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm the public water-entry edge, parking, carry, gate hours and current access status before staging.' },
    ],
    logistics: {
      distanceLabel: spec.distanceLabel ?? `About ${spec.miles} river miles`,
      estimatedPaddleTime: spec.time,
      shuttle: 'Stage the downstream vehicle at the named public access, then drive to the upstream launch. Allow extra time for carries and any diversion portage.',
      permits: 'No special private-boater permit is listed for these New Mexico reaches, but state boating law, park rules, land-boundary restrictions and any Navajo Nation access rules apply. Confirm current notices.',
      camping: 'No overnight river camping is included. Navajo Lake State Park offers developed camping near the upper reach; otherwise use established campgrounds or lodging near Farmington and do not camp on private or tribal banks.',
      campingClassification: 'nearby_basecamp',
      summary: spec.summary,
      accessCaveats: ['Use only named public launches and take-outs; several lower-river access points have limited parking or hand-carry approaches.', 'Portage diversion dams and fences on the riverbank before proceeding.', 'Respect private, state, BLM and Navajo Nation boundaries and leave no trace at access sites.'],
      watchFor: spec.watch,
    },
    evidenceNotes: [
      { label: 'Named public access and distance', value: `${spec.reach}; ${spec.miles} miles`, note: 'Southwest Paddler lists the access coordinates and river-mile sequence; New Mexico Tourism corroborates the upper corridor as a popular relaxing float.', sourceUrl: paddlerGuide.url },
      { label: 'Scoring floor', value: '300 cfs minimum planning cue; 500 cfs target', note: 'The 300 cfs cue is reach-specific community guidance. Verify direct gauge telemetry, release trend and local conditions before travel.', sourceUrl: paddlerGuide.url },
      { label: 'Direct telemetry', value: `USGS ${spec.gauge.siteId} ${spec.gauge.siteName}`, note: 'Use the gauge nearest the selected reach and recheck current discharge and trend.', sourceUrl: spec.gauge.detailUrl },
      { label: 'Safety and camping', value: 'PFD, diversion/fence portage, public access and nearby basecamp', note: 'New Mexico State Parks identifies low-head dams and strainers as serious hazards; Navajo Lake State Park documents developed camping near the upper reach.', sourceUrl: stateParksGuide.url },
    ],
  };
}

export const newMexicoSanJuanRoutes: River[] = [
  makeRoute({ id: 'san-juan-river-navajo-dam-blanco', reach: 'Navajo Dam public launch to Blanco public access', putIn: navajoDam, takeOut: blanco, miles: 17.5, summary: 'A relaxing regulated-tailwater day float from Navajo Dam through Navajo Lake State Park to the Blanco public access.', time: 'Allow 5–8 hours with shuttle, fishing traffic and wildlife stops', note: 'Southwest Paddler lists Navajo Dam and Blanco as public water-entry points; New Mexico Tourism describes this 17-mile section as a year-round paddling opportunity. Confirm the dam-release schedule and the carry from the launch.', watch: ['Cold tailwater below Navajo Dam', 'Fishing lines and changing release levels', 'Simon Canyon and downstream bridge traffic'], gauge: gaugeUpper }),
  makeRoute({ id: 'san-juan-river-blanco-vereda', reach: 'Blanco public access to Vereda del Rio public launch', putIn: blanco, takeOut: vereda, miles: 11.9, summary: 'A pastoral San Juan reach from Blanco through the lower Navajo tailwater valley to the Vereda del Rio public launch.', time: 'Allow 4–6 hours with diversion scouting and shuttle margin', note: 'Southwest Paddler places Blanco at about river mile 17.5 and Vereda del Rio at about 29.4, both on the named access chain. Prepare for the first diversion structures and limited intermediate exits.', watch: ['Diversion dams and submerged fences', 'Monsoon sediment and fast release changes', 'Limited shade and private-bank boundaries'], gauge: gaugeUpper }),
  makeRoute({ id: 'san-juan-river-vereda-among-waters', reach: 'Vereda del Rio public launch to Among the Waters Park public access', putIn: vereda, takeOut: amongWaters, miles: 16.9, summary: 'A lower San Juan day reach from Vereda del Rio through the Bloomfield and Farmington corridor to Among the Waters Park.', time: 'Allow 5–8 hours with diversion portages, bridge scouting and shuttle margin', note: 'Southwest Paddler lists Vereda del Rio at about mile 29.4 and Among the Waters Park at about mile 46.3 as public access points. Use the Farmington gauge, scout every diversion and preserve the public park take-out.', watch: ['Diversion dams and fences requiring portage', 'Warm-weather exposure and thunderstorms', 'Farmington bridges, current and park hours'], gauge: gaugeLower }),
  makeRoute({ id: 'san-juan-river-navajo-dam-vereda', reach: 'Navajo Dam public launch to Vereda del Rio public launch', putIn: navajoDam, takeOut: vereda, miles: 29.4, summary: 'A long regulated San Juan day reach combining the Navajo Dam-to-Blanco and Blanco-to-Vereda access sections.', time: 'Allow 8–12 hours with diversion scouting, fishing traffic and shuttle margin', note: 'Use Blanco as the documented intermediate bailout and timing checkpoint. Confirm dam releases, the long shuttle and every downstream diversion before launch.', watch: ['Cold tailwater and changing dam releases', 'Diversion dams, submerged fences and portages', 'Long reach, limited shade and private-bank boundaries'], gauge: gaugeUpper }),
  makeRoute({ id: 'san-juan-river-navajo-dam-among-waters', reach: 'Navajo Dam public launch to Among the Waters Park public access', putIn: navajoDam, takeOut: amongWaters, miles: 46.3, distanceLabel: 'Staged multi-day itinerary (about 46.3 river miles)', summary: 'The full documented Navajo Dam to Farmington San Juan paddle corridor through Blanco and Vereda del Rio.', time: 'Plan a full daylight expedition or split the corridor with a staged shuttle and verified bailout plan', note: 'Blanco and Vereda del Rio are named intermediate public access points. This long reach crosses multiple diversion and land-boundary zones; confirm releases, weather, shuttle and take-out hours.', watch: ['Cold tailwater and release changes', 'Multiple diversion dams and fences requiring portage', 'Long exposure, monsoon storms and limited assistance'], gauge: gaugeLower }),
  makeRoute({ id: 'san-juan-river-blanco-among-waters', reach: 'Blanco public access to Among the Waters Park public access', putIn: blanco, takeOut: amongWaters, miles: 28.8, summary: 'A combined lower San Juan reach from Blanco through Vereda del Rio to Among the Waters Park.', time: 'Allow 8–12 hours with diversion portages, bridge scouting and shuttle margin', note: 'Vereda del Rio is the documented intermediate bailout. Use the Farmington gauge for this lower corridor and confirm every diversion, bridge and park landing before departure.', watch: ['Diversion dams and submerged fences', 'Warm-weather exposure and thunderstorms', 'Farmington bridges, current and park hours'], gauge: gaugeLower }),
];
