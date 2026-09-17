import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const blueTrailGuide = { label: 'Chicopee 4Rivers Ware River Blue Trail upper guide', url: 'https://c4rivers.org/wp-content/uploads/2022/12/wrbt-upper-11-14-22.pdf', provider: 'local' as const };
const accessGuide = { label: 'Town of Hardwick Ware River public access inventory', url: 'https://www.hardwick-ma.gov/media/6631', provider: 'local' as const };
const blueTrailPage = { label: 'Chicopee 4Rivers Blue Trails and current Ware River notices', url: 'https://c4rivers.org/blue-trails/', provider: 'local' as const };
const americanWhitewater = { label: 'American Whitewater Ware–Gilbertville reach', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/10164/main', provider: 'american_whitewater' as const };
const gauge = { id: 'usgs-01173500', provider: 'usgs' as const, siteId: '01173500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Ware River at Gibbs Crossing, MA', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-01173500/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater'];

const putIn = { name: 'Hardwick–Ware River Park access, river-right water entry', latitude: 42.3093856, longitude: -72.1944061 };
const takeOut = { name: 'Gilbertville/New Furnace public boat launch, river-right water entry', latitude: 42.31152, longitude: -72.2068191 };

const wareRiverParkToNewFurnace: River = {
  id: 'ware-river-park-new-furnace',
  slug: 'ware-river-park-new-furnace',
  name: 'Ware River',
  riverId: 'ware-river-massachusetts',
  state: 'Massachusetts',
  region: 'Worcester County / Hardwick–Gilbertville',
  routeType: 'whitewater',
  scoreEligibility: 'scored',
  gaugeSource: gauge,
  reach: 'Hardwick–Ware River Park to Gilbertville/New Furnace',
  putIn,
  takeOut,
  latitude: putIn.latitude,
  longitude: putIn.longitude,
  summary: 'A short, technical Ware River Blue Trail run from the public park just above the rapids to the town-listed New Furnace launch in Gilbertville.',
  statusText: 'Use the direct USGS 01173500 gauge and C4Rivers’ route-specific flow notes, then inspect current dam-removal, river, access and parking notices before committing. The Class II–III section requires appropriate skills, a whitewater-capable boat, scouting and rescue readiness.',
  profile: {
    thresholdModel: 'minimum-only',
    tooLow: 400,
    idealMin: 500,
    idealMax: 1500,
    thresholdSource: blueTrailGuide,
    thresholdSourceStrength: 'community',
    rainfallSensitivity: 'medium',
    windSensitivity: 0.05,
    seasonMonths: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    seasonNotes: 'C4Rivers ties the guide’s runnable-flow cues to the Gibbs Crossing gauge. Cold water, rain, reservoir operations and the active Wheelwright Dam removal upstream can affect current conditions; verify the live trend and current local notices.',
    difficulty: 'hard',
    difficultyNotes: 'C4Rivers identifies large boulders and Class II–III whitewater below the park and says suitable boats, skills and experience are needed. Flows over 1,500 cfs are identified for more experienced paddlers, not as a general-user target.',
    confidenceNotes: 'C4Rivers’ upper Ware Blue Trail guide identifies both public access points, the whitewater section, and >400 cfs acceptable / 500–1,500 cfs good guidance at USGS Gibbs Crossing. Town of Hardwick lists recreational boating access at New Furnace and Ware River Park. The 0.7-mile distance is measured along the mapped Ware River channel between the published access markers; the minimum-only score uses 400 cfs as a navigability cue, never a safety guarantee.',
  },
  safetyProfile: {
    riskLevel: 'caution',
    reviewStatus: 'reviewed',
    hazards,
    safetyNotes: [
      'Wear a properly fitted PFD and whitewater helmet; carry cold-water protection, throw rope, communication and offline navigation. Massachusetts requires a PFD from September through May.',
      'This short Class II–III run has large boulders and standing waves. Scout before launch, use a suitable whitewater boat, and portage any feature beyond the group’s training or conditions.',
      'The park access is the last convenient exit before the rapids. Do not continue into the whitewater unless every paddler is equipped and prepared; use the public New Furnace launch at the finish.',
      'Check live USGS 01173500 discharge and trend, recent rain, water quality, strainers, dam-removal updates, parking and access notices. A published flow cue is not an all-clear.',
      'Respect private property and stay on the designated public paths and landings. Do not use the posted Church Street field or unverified bank access as a bailout.',
    ],
  },
  sourceLinks: [blueTrailGuide, accessGuide, blueTrailPage, americanWhitewater, { label: 'USGS Ware River at Gibbs Crossing', url: gauge.detailUrl, provider: 'usgs' as const }],
  accessPoints: [
    { ...putIn, id: 'ware-river-park-new-furnace-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'C4Rivers marks this as the Hardwick–Ware River Park public access, on river right just above the whitewater. The town conservation park is the safe exit for paddlers who do not intend to run the rapids.' },
    { ...takeOut, id: 'ware-river-park-new-furnace-take-out', mileFromStart: 0.7, segmentKind: 'transition', note: 'C4Rivers marks Gilbertville/New Furnace on river right where the current becomes calm above the Route 32 bridge, with the gazebo visible and Danforth Brook entering beside the access. The Town of Hardwick lists it as recreational boating access.' },
  ],
  logistics: {
    distanceLabel: 'About 0.7 river miles',
    estimatedPaddleTime: 'Plan 1–3 hours including scouting, shuttle and rescue margin',
    shuttle: 'Stage the downstream vehicle at the town-listed New Furnace launch, then drive to the upstream Ware River Park access.',
    permits: 'Confirm Town of Hardwick parking and launch notices, current river access paths, water quality and project updates before unloading.',
    camping: 'No overnight camping is included or documented at either day-use launch. Use separately permitted lodging or campgrounds and never camp on private riverbanks.',
    campingClassification: 'none',
    summary: 'A brief but technical town-to-town whitewater run; the public park immediately above the rapids is the exit for paddlers who do not meet the skill and flow conditions.',
    accessCaveats: [
      'Use the Hardwick–Ware River Park launch above the rapids and the Gilbertville/New Furnace public boat launch below them; both locations are named on the C4Rivers map and the town inventory.',
      'New Furnace is near the Route 32 bridge and Danforth Brook mouth. Confirm the exact landing, path and parking on arrival; do not use Church Street as an alternate take-out.',
      'The Wheelwright Pond Dam removal is active upstream in 2026. Review C4Rivers and project-manager notices for current construction, sediment, flow and access impacts.',
    ],
    watchFor: ['Class II–III boulder rapids and standing waves', 'Downed trees, strainers and shallow rocks', 'Cold water, fast rises and dam-removal notices'],
  },
  evidenceNotes: [
    { label: 'Water-trail segment and public launches', value: 'Hardwick–Ware River Park to Gilbertville/New Furnace', note: 'C4Rivers’ upper Ware map marks the park as access #10 immediately above the rapids and Gilbertville/New Furnace as access #13 on river right above Route 32. Hardwick’s inventory identifies New Furnace as recreational boating access.', sourceUrl: blueTrailGuide.url },
    { label: 'Route-specific flow guidance', value: '>400 cfs acceptable; 500–1,500 cfs good; above 1,500 cfs for more experienced paddlers', note: 'This is the blue-trail guide’s community guidance for the Ware River whitewater section at the Gibbs gauge. The scored threshold uses only the 400 cfs minimum cue; high flows are not encoded as a universal cutoff.', sourceUrl: blueTrailGuide.url },
    { label: 'Difficulty and hazards', value: 'Class II–III; large boulders; scouting and experience required', note: 'C4Rivers maps the Class II–III whitewater section. American Whitewater independently describes the Ware–Gilbertville run and connects the reach to the Gibbs gauge.', sourceUrl: americanWhitewater.url },
    { label: 'Direct gauge', value: 'USGS 01173500 Ware River at Gibbs Crossing', note: 'Same-river real-time discharge; the blue-trail guide names this gauge for its flow cues.', sourceUrl: gauge.detailUrl },
    { label: 'Dam-removal status', value: 'Wheelwright Pond Dam work remains active upstream in 2026', note: 'Massachusetts DER reports phase-two construction funding; check project-manager and C4Rivers notices for current downstream conditions before launch.', sourceUrl: 'https://www.mass.gov/news/healey-driscoll-administration-awards-14-million-to-support-priority-restoration-projects' },
    { label: 'Camping', value: 'Day-use route; no route-side overnight camping documented', note: 'Neither named town access is listed as a campground; the route is classified as no camping.', sourceUrl: accessGuide.url },
  ],
};

export const massachusettsWareExpansionRoutes: River[] = [wareRiverParkToNewFurnace];
