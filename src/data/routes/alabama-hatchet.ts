import type { River } from '../../lib/types';

const id = 'hatchet-creek-highway-280-highway-231';
const guide = { label: 'Outdoor Alabama Hatchet Creek guide', url: 'https://www.outdooralabama.com/rivers-and-mobile-delta/hatchet-creek', provider: 'local' as const };
const trail = { label: 'Alabama Scenic River Trail Hatchet Creek trip', url: 'https://www.alabamascenicrivertrail.com/52-weekends-on-the-water/hatchet-creek-paddle-camp/', provider: 'local' as const };
const putIn = { name: 'Highway 280 Bridge access', latitude: 33.03596, longitude: -86.12289 };
const takeOut = { name: 'Highway 231 Bridge access', latitude: 32.94369, longitude: -86.20339 };

const hatchetDayRoute: River = {
  id, slug: id, name: 'Hatchet Creek', riverId: 'hatchet-creek', state: 'Alabama', region: 'Coosa County / Central Alabama', reach: 'Highway 280 Bridge to Highway 231 Bridge', latitude: putIn.latitude, longitude: putIn.longitude,
  summary: 'A 12.8-mile Hatchet Creek day run through wooded central Alabama, with brisk current, shoals and one stronger Class II feature.',
  statusText: 'Use the Rockford gauge and plan for shallow rocks, private banks and changing shoals. The low-water floor is a conservative cue, not a promise of passage.', routeType: 'recreational', scoreEligibility: 'scored',
  gaugeSource: { id: 'usgs-02408540', provider: 'usgs', siteId: '02408540', metric: 'discharge_cfs', unit: 'cfs', kind: 'direct', siteName: 'Hatchet Creek below Rockford, AL', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02408540/' },
  profile: { thresholdModel: 'minimum-only', tooLow: 400, idealMin: 400, thresholdSource: guide, thresholdSourceStrength: 'official', rainfallSensitivity: 'high', windSensitivity: 0.25, seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12], seasonNotes: 'Outdoor Alabama says flows below around 400 cfs require dragging over rocks and shallow flats; the trail source describes spring as best and notes 600 cfs as ideal. Floods and storms can make the creek swift and hazardous.', difficulty: 'hard', difficultyNotes: 'The day section is mostly Class I with a Class II feature, numerous shoals and remoteness. It requires reliable boat control, scouting and self-rescue judgment; it is not a beginner flatwater route.', confidenceNotes: 'Outdoor Alabama identifies the Highway 280–Highway 231 section as an easy one-day short stretch and warns that below around 400 cfs boaters should expect dragging. Alabama Scenic River Trail supplies the 12.8-mile segment, endpoint coordinates and a 600 cfs ideal reference. USGS 02408540 is a direct continuous gauge below Rockford near the lower end of this reach. The score uses only the conservative official 400 cfs low-water floor; it does not treat the 600 cfs trail note as a hard upper or ideal threshold.' },
  safetyProfile: { riskLevel: 'caution', reviewStatus: 'reviewed', hazards: ['low_water','strainers','fast_rise','private_banks'], safetyNotes: ['Wear a PFD and carry a throw rope, offline navigation and communication. Scout every shoal and the stronger Class II feature.', 'Below 400 cfs, expect dragging and exposed rocks. High water can increase current and reduce visibility of the channel; avoid floodwater and thunderstorms.', 'Outdoor Alabama notes adjacent land may be privately owned. Use only the named bridge right-of-way access and do not cross or wade private property without permission.', 'This is a remote run with limited bailout options. Arrange a shuttle, carry daylight margin and turn back when a safe passage cannot be identified.'] },
  putIn, takeOut,
  accessPoints: [{ ...putIn, id: `${id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: 'Limited access from the Highway 280 bridge right-of-way; the trail source describes a small field and a downhill carry.' }, { ...takeOut, id: `${id}-take-out`, mileFromStart: 12.8, segmentKind: 'transition', note: 'Highway 231 bridge access; confirm the legal pull-off and downstream landing before launch.' }],
  logistics: { distanceLabel: 'About 12.8 river miles', estimatedPaddleTime: 'Plan a full daylight day; allow 6–9 hours with shoal scouting', shuttle: 'Stage at Highway 231 and drive to Highway 280. The trail source describes a small field and a roughly 500-foot downhill carry at the put-in.', permits: 'Outdoor Alabama says county-road bridge right-of-ways provide limited access while adjacent land may be private. Verify parking and legal access on arrival.', camping: 'Primitive camps exist on the longer Hatchet trail, but this selected day section is treated as a day trip; no overnight site is included.', campingClassification: 'unknown', summary: 'A full-day central Alabama creek run with shoals and limited access.', accessCaveats: ['Highway 280 access is a limited roadside launch and may require a long carry.', 'Do not cross private land or wade outside the bridge right-of-way without permission.', 'Confirm the Highway 231 take-out and parking before committing to the day.'], watchFor: ['Exposed rocks below 400 cfs', 'Class II drop and shoals', 'Strainers and fast rises'] },
  evidenceNotes: [
    { label: 'Reach and distance', value: 'Highway 280 to Highway 231; 12.8 miles', note: 'Alabama Scenic River Trail identifies this as a one-day section and publishes endpoint coordinates.', sourceUrl: trail.url },
    { label: 'Numeric scoring evidence', value: '400 cfs minimum-only floor', note: 'Outdoor Alabama says below around 400 cfs boaters should be prepared to drag over rocks and shallow flats. The trail source separately calls 600 cfs ideal; no high-water threshold is claimed.', sourceUrl: guide.url },
    { label: 'Gauge relationship', value: 'USGS 02408540 below Rockford', note: 'Direct continuous discharge station near the lower end of the selected creek corridor. Recheck current telemetry and trend before travel.', sourceUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02408540/' },
    { label: 'Access review', value: '2026-09-09', note: 'Outdoor Alabama confirms bridge right-of-way access is limited and adjacent land may be private. Trail coordinates and logistics require field-side parking/legal-access confirmation at release.', sourceUrl: guide.url },
  ],
  sourceLinks: [guide, trail, { label: 'USGS Hatchet Creek gauge', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-02408540/', provider: 'usgs' }],
};

const hatchetOvernightRoute: River = {
  ...hatchetDayRoute,
  id: 'hatchet-creek-highway-280-kings-bridge',
  slug: 'hatchet-creek-highway-280-kings-bridge',
  reach: 'Highway 280 Bridge to Kings Bridge take-out',
  summary: 'A 24-mile Hatchet Creek overnight through a secluded, shoal-filled central Alabama corridor with primitive campsites and a breached dam.',
  statusText: 'Use the Rockford gauge and plan for a remote overnight with shoals, a breached dam and private banks. The longer route requires daylight, camping preparation and a confirmed legal take-out.',
  takeOut: { name: 'Kings Bridge take-out above Coosa County Road 18', latitude: 32.92, longitude: -86.2714 },
  profile: { ...hatchetDayRoute.profile!, confidenceNotes: 'Alabama Scenic River Trail publishes this 24-mile overnight from Highway 280 to a Kings Bridge take-out and identifies primitive campsites, numerous shoals, a breached dam and remoteness. Outdoor Alabama provides the same 400 cfs low-water warning and bridge right-of-way/private-bank caveat. The score uses only the conservative minimum-only 400 cfs floor.' },
  accessPoints: [
    { ...hatchetDayRoute.putIn!, id: 'hatchet-creek-highway-280-kings-bridge-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Limited access from the Highway 280 bridge right-of-way; the trail source describes a small field and a downhill carry.' },
    { name: 'Kings Bridge take-out above Coosa County Road 18', latitude: 32.92, longitude: -86.2714, id: 'hatchet-creek-highway-280-kings-bridge-take-out', mileFromStart: 24, segmentKind: 'transition', note: 'River-right take-out just above Kings Bridge; confirm the legal pull-off, landing and downstream conditions before committing to an overnight.' },
  ],
  logistics: { distanceLabel: 'About 24 river miles', estimatedPaddleTime: 'Plan a 2-day overnight with daylight margin and time to scout shoals', shuttle: 'Stage at the Kings Bridge take-out and drive to Highway 280. The trail source describes primitive campsites along the route.', permits: 'Outdoor Alabama says bridge right-of-ways provide limited access while adjacent land may be private. Verify both bridge pull-offs and the Kings Bridge take-out before launch.', camping: 'Primitive campsites are documented along the overnight route; confirm current site condition and land status before relying on one.', campingClassification: 'on_route_campsite', summary: 'A remote overnight Hatchet Creek route with campsites, shoals and a breached dam.', accessCaveats: ['Highway 280 access is a limited roadside launch and may require a long carry.', 'Kings Bridge take-out is above County Road 18; confirm legal roadside access and landing.', 'Do not cross private land or wade outside bridge right-of-ways without permission.', 'Carry water, offline navigation and a conservative daylight plan.'], watchFor: ['Exposed rocks below 400 cfs', 'Breached concrete dam near Highway 231', 'Strainers and fast rises', 'Private banks and limited bailout options'] },
  evidenceNotes: [
    { label: 'Reach and distance', value: 'Highway 280 to Kings Bridge; 24 miles', note: 'Alabama Scenic River Trail publishes the overnight distance and Kings Bridge endpoint coordinate.', sourceUrl: trail.url },
    { label: 'Numeric scoring evidence', value: '400 cfs minimum-only floor', note: 'Outdoor Alabama warns of dragging below around 400 cfs; the trail source calls 600 cfs ideal without establishing a high-water ceiling.', sourceUrl: guide.url },
    { label: 'Overnight hazards', value: 'Shoals, breached dam and remoteness', note: 'The trail source identifies numerous shoals, a breached concrete dam and primitive campsites; scout and portage as needed.', sourceUrl: trail.url },
    { label: 'Access review', value: '2026-09-09', note: 'Bridge right-of-way access is limited and adjacent land may be private. Confirm the Kings Bridge take-out and camping land status at release.', sourceUrl: guide.url },
  ],
};

const hatchetLowerRoute: River = {
  ...hatchetOvernightRoute,
  id: 'hatchet-creek-highway-231-kings-bridge',
  slug: 'hatchet-creek-highway-231-kings-bridge',
  reach: 'Highway 231 Bridge to Kings Bridge take-out',
  summary: 'An approximately 11.3-mile lower Hatchet Creek day run with a breached dam, primitive campsites and fewer challenging rapids below the old dam.',
  statusText: 'Use the Rockford gauge and scout the breached dam near Highway 231. The lower reach remains remote, has private banks and requires a confirmed Kings Bridge take-out.',
  putIn: { name: 'Highway 231 Bridge access', latitude: 32.94369, longitude: -86.20339 },
  accessPoints: [
    { name: 'Highway 231 Bridge access', latitude: 32.94369, longitude: -86.20339, id: 'hatchet-creek-highway-231-kings-bridge-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Limited access from the Highway 231 bridge right-of-way; confirm the legal pull-off and carry.' },
    { name: 'Kings Bridge take-out above Coosa County Road 18', latitude: 32.92, longitude: -86.2714, id: 'hatchet-creek-highway-231-kings-bridge-take-out', mileFromStart: 11.3, segmentKind: 'transition', note: 'River-right take-out just above Kings Bridge; confirm the legal pull-off, landing and downstream conditions.' },
  ],
  logistics: { ...hatchetOvernightRoute.logistics!, distanceLabel: 'About 11.3 river miles', estimatedPaddleTime: 'Plan a full daylight day with time to scout and portage the breached dam', camping: 'Primitive campsites are documented near this lower corridor; this selected reach is treated as a day trip unless a lawful overnight plan is confirmed.', campingClassification: 'on_route_campsite', summary: 'A lower Hatchet Creek day run with a breached dam, shoals and primitive campsites.' },
  evidenceNotes: [
    { label: 'Reach and distance', value: 'Highway 231 to Kings Bridge; approximately 11.3 miles', note: 'Alabama Scenic River Trail lists the Highway 231 stop, breached dam, campsite and 5.34-mile continuation to Kings Bridge.', sourceUrl: trail.url },
    { label: 'Numeric scoring evidence', value: '400 cfs minimum-only floor', note: 'Outdoor Alabama warns of dragging below around 400 cfs; no high-water ceiling is claimed.', sourceUrl: guide.url },
    { label: 'Hazard review', value: 'Breached concrete dam near Highway 231', note: 'The trail source identifies a breached dam immediately downstream of the Highway 231 stop; scout and portage as needed.', sourceUrl: trail.url },
    { label: 'Access review', value: '2026-09-09', note: 'Bridge right-of-way access is limited and adjacent land may be private. Confirm both access points and any campsite land status at release.', sourceUrl: guide.url },
  ],
};

export const alabamaHatchetRoutes: River[] = [hatchetDayRoute, hatchetOvernightRoute, hatchetLowerRoute];
