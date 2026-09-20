import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const scdnr = { label: 'SCDNR Catawba Scenic River access and safety', url: 'https://www.dnr.sc.gov/water/river/scenic/catawba.html', provider: 'local' as const };
const parkFaq = { label: 'Landsford Canal State Park flow and safety FAQ', url: 'https://southcarolinaparks.com/landsford-canal/faqs', provider: 'local' as const };
const flowGuide = { label: 'SCDNR Catawba canoe trail guide', url: 'https://www.dnr.sc.gov/water/river/pdf/1998FavoriteSCCanoe-KayakTrails.pdf', provider: 'local' as const };
const fortMillGuide = { label: 'Fort Mill River Access', url: 'https://mapcarta.com/W549843330', provider: 'local' as const };
const rockHillGuide = { label: 'City of Rock Hill River Park access', url: 'https://www.cityofrockhill.com/Home/Components/FacilityDirectory/FacilityDirectory/102/8194', provider: 'local' as const };
const gaugeUpper = { id: 'usgs-02146000', provider: 'usgs' as const, siteId: '02146000', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Catawba River at Rock Hill, SC', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02146000/' };
const gaugeLower = { id: 'usgs-02147020', provider: 'usgs' as const, siteId: '02147020', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Catawba River below Catawba, SC', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02147020/' };

const fortMill = { name: 'Fort Mill public landing below Lake Wylie Dam', latitude: 35.02171656381242, longitude: -81.00404683440097 };
const rockHill = { name: 'River Park in Rock Hill (SCDNR paddle launch)', latitude: 34.95615028378521, longitude: -80.94933899432193 };
const landsford = { name: 'Landsford Canal State Park upper carry-in access (water-entry edge)', latitude: 34.79176, longitude: -80.88081 };
const sc9 = { name: 'SC 9 Catawba public boat landing (water-entry edge)', latitude: 34.709133, longitude: -80.866015 };
const hazards: RouteHazard[] = ['low_water', 'fast_rise', 'strainers', 'cold_water', 'dam', 'private_banks'];

const common = {
  name: 'Catawba River', riverId: 'catawba-river-south-carolina', state: 'South Carolina', region: 'York / Chester / Lancaster Counties', routeType: 'recreational' as const, scoreEligibility: 'scored' as const,
  sourceLinks: [scdnr, parkFaq, flowGuide, fortMillGuide, rockHillGuide],
};

function makeRoute(spec: { id: string; reach: string; start: River['putIn']; end: River['takeOut']; miles: number; gauge: typeof gaugeUpper | typeof gaugeLower; summary: string; notes: string; time: string; difficulty: 'easy' | 'moderate'; }): River {
  const thresholdText = '1,000 cfs minimum; 1,800–3,000 cfs practical band; review above 4,000 cfs';
  const profile = {
    thresholdModel: 'two-sided' as const, tooLow: 1000, idealMin: 1800, idealMax: 3000, tooHigh: 4000,
    thresholdSource: parkFaq, thresholdSourceStrength: 'official' as const, rainfallSensitivity: 'medium' as const, windSensitivity: 0.3,
    seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'Lake Wylie releases, rain and seasonal shoals change the river quickly. Check the direct gauge, Duke release information, weather and park notices immediately before departure.',
    difficulty: spec.difficulty, difficultyNotes: spec.difficulty === 'easy' ? 'Mostly Class I current with shoals and release-driven changes; higher flows can become Class II–III and require stronger boat control.' : 'Longer moving-water reach with shoals, current, cold water and dam-release effects; paddle within the group’s ability.',
    confidenceNotes: `SCDNR documents the public access sequence and river distances. Landsford Canal State Park publishes ${thresholdText}; use it as a conservative planning cue, not a safety guarantee.`,
  };
  return {
    ...common, id: spec.id, slug: spec.id, reach: spec.reach, latitude: spec.start!.latitude!, longitude: spec.start!.longitude!, summary: spec.summary,
    statusText: `Use USGS ${spec.gauge.siteId}, Duke release information and park notices; the flow band is a planning cue and does not clear shoals, dams, debris or access conditions.`, gaugeSource: spec.gauge, profile,
    safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: [
      'Wear a properly fitted PFD and carry communication, spare paddle, offline navigation and enough daylight for delays.',
      'Lake Wylie releases can raise the river quickly; rising water increases wave size and can turn shoals into Class II–III rapids.',
      'Scout Landsford shoals and all bridge, dam and outfall hazards from shore. Never approach Lake Wylie Dam or run an unscouted hydraulic.',
      'Use only the named public launches, respect park hours and private shoreline, and confirm the water-entry edge before unloading.',
    ] },
    putIn: spec.start, takeOut: spec.end,
    accessPoints: [{ ...spec.start!, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.notes }, { ...spec.end!, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Confirm current ramp or carry-in access, parking, park hours and water entry before staging.' }],
    logistics: { distanceLabel: `About ${spec.miles} river miles`, estimatedPaddleTime: spec.time, shuttle: 'Stage the downstream public access first, then drive to the named upstream launch. Confirm gates, fees, parking and carry paths before unloading.', permits: 'Confirm current South Carolina State Parks, county, city and Duke Energy access and release rules before launch.', camping: 'No on-route camping is documented on this scenic river section. Use nearby established campgrounds or lodging; do not camp on river-bordering land without permission.', campingClassification: 'nearby_basecamp', summary: spec.summary, accessCaveats: ['Coordinates are tied to named public access facilities and their water-entry edges.', 'Private banks and dam facilities are not assumed legal bailout or camping sites.', 'Recheck flow trend, release timing, weather, water quality and access status on launch day.'], watchFor: ['USGS discharge and Lake Wylie release changes', 'Rocky shoals, strainers and bridge debris', 'Cold water, wind and private frontage'] },
    evidenceNotes: [
      { label: 'Named reach and distance', value: `${spec.reach}; ${spec.miles} miles`, note: 'SCDNR identifies the public access sequence and published river distances.', sourceUrl: scdnr.url },
      { label: 'Numeric scoring evidence', value: thresholdText, note: 'Landsford Canal State Park publishes the practical downstream range and warns that higher releases increase difficulty; this band is a planning cue only.', sourceUrl: parkFaq.url },
      { label: 'Access coordinate review', value: '2026-09-16', note: 'Endpoint coordinates are tied to the named Fort Mill, Rock Hill, Landsford and SC 9 public facilities and refined to the water-entry edge.', sourceUrl: flowGuide.url },
      { label: 'Direct telemetry', value: `USGS ${spec.gauge.siteId}`, note: `Direct Catawba telemetry for the ${spec.gauge.siteName} corridor; pair with Duke release timing and visual checks.`, sourceUrl: spec.gauge.detailUrl },
    ],
  };
}

export const southCarolinaCatawbaRoutes: River[] = [
  makeRoute({ id: 'catawba-river-fort-mill-rock-hill', reach: 'Fort Mill River Access to Rock Hill River Park', start: fortMill, end: rockHill, miles: 7, gauge: gaugeUpper, difficulty: 'easy', time: 'Allow 3–5 hours with release and shuttle checks', summary: 'A popular Charlotte-area Catawba reach from the Fort Mill public ramp below Lake Wylie Dam to Rock Hill River Park.', notes: 'SCDNR places the Fort Mill ramp immediately downstream of Lake Wylie Dam and documents about seven river miles to Rock Hill River Park; confirm release timing before launching.' }),
  makeRoute({ id: 'catawba-river-rock-hill-landsford', reach: 'Rock Hill River Park to Landsford Canal State Park', start: rockHill, end: landsford, miles: 17, gauge: gaugeUpper, difficulty: 'moderate', time: 'Allow 6–9 hours with shoal scouting and shuttle margin', summary: 'A scenic Catawba day reach from the Rock Hill carry-in launch through the public access corridor to Landsford Canal State Park.', notes: 'SCDNR documents about 17 river miles between the Rock Hill and Landsford accesses. Use the park’s carry-in access and stop before the downstream shoal hazards if conditions rise.' }),
  makeRoute({ id: 'catawba-river-landsford-sc9', reach: 'Landsford Canal State Park to SC 9 Landing', start: landsford, end: sc9, miles: 6.3, gauge: gaugeLower, difficulty: 'moderate', time: 'Allow 3–5 hours with shoal scouting and park-hour checks', summary: 'The documented Landsford Canal to SC 9 Catawba trail through the rocky shoals and spider-lily corridor.', notes: 'SCDNR and the canoe-trail guide identify the upper and lower Landsford carry-in access and the public SC 9 landing. The shoals are shallow below the park at low water; use the published flow guidance and scout continuously.' }),
  makeRoute({ id: 'catawba-river-fort-mill-landsford', reach: 'Fort Mill River Access to Landsford Canal State Park', start: fortMill, end: landsford, miles: 24, gauge: gaugeUpper, difficulty: 'moderate', time: 'Plan a full daylight day with release, wind and shuttle margin', summary: 'A staged Catawba itinerary linking the Fort Mill, Rock Hill and Landsford public access sequence below Lake Wylie Dam.', notes: 'Use Rock Hill River Park as the documented intermediate bailout. Start only after checking Lake Wylie release timing and keep the Landsford shoals boundary in the trip plan.' }),
  makeRoute({ id: 'catawba-river-rock-hill-sc9', reach: 'Rock Hill River Park to SC 9 Landing', start: rockHill, end: sc9, miles: 23.3, gauge: gaugeLower, difficulty: 'moderate', time: 'Plan a full daylight day with shoal scouting and shuttle margin', summary: 'A longer Catawba itinerary from Rock Hill River Park through Landsford Canal State Park to the SC 9 landing.', notes: 'Use Landsford as the documented intermediate bailout and confirm park hours, carry-in access and the downstream SC 9 ramp before committing.' }),
  makeRoute({ id: 'catawba-river-fort-mill-sc9', reach: 'Fort Mill River Access to SC 9 Landing', start: fortMill, end: sc9, miles: 30.3, gauge: gaugeLower, difficulty: 'moderate', time: 'Plan a full daylight day with multiple bailouts and release margin', summary: 'The complete selected Catawba scenic-river itinerary from below Lake Wylie Dam through Rock Hill and Landsford to SC 9.', notes: 'Use Rock Hill River Park and Landsford Canal as documented bailouts. Lake Wylie release timing, rocky shoals and the SC 9 landing govern whether this long itinerary is practical.' }),
];
