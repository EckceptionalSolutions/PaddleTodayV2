import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const paddlingGuide = { label: 'Hoosic River Watershed Association paddling access guide', url: 'https://hoorwa.org/recreation/paddling-the-hoosic/', provider: 'local' as const };
const flowGuide = { label: 'HooRWA Williamstown gauge and safe paddling range', url: 'https://hoorwa.org/water-level/', provider: 'local' as const };
const accessGuide = { label: 'Massachusetts Office of Fishing and Boating Access Sites', url: 'https://www.mass.gov/info-details/massgis-data-office-of-fishing-and-boating-access-sites', provider: 'local' as const };
const launchAssessment = { label: 'Williamstown ADA Self-Evaluation: Lauren’s Launch water access', url: 'https://berkshireplanning.org/wp-content/uploads/2025/07/Williamstown-ADA-Self-Evaluation-and-Transition-Plan-2025.pdf', provider: 'local' as const };
const conditionReport = { label: 'Hoosic River Revival Ashton-to-Lauren’s Launch low-water scout', url: 'https://www.hoosicriverrevival.org/events/hoosic-river-float', provider: 'local' as const };
const gauge = { id: 'usgs-01332500', provider: 'usgs' as const, siteId: '01332500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Hoosic River near Williamstown, MA', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-01332500/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'urban_water_quality', 'private_banks'];

const putIn = { name: 'Ashton Avenue public canoe access / Joe Girardi Park water-entry edge', latitude: 42.702950235, longitude: -73.168150533 };
const takeOut = { name: 'Lauren’s Launch sandy beach water-entry edge', latitude: 42.729246, longitude: -73.209008 };

const route: River = {
  id: 'hoosic-river-ashton-laurens-launch',
  slug: 'hoosic-river-ashton-laurens-launch',
  name: 'Hoosic River',
  riverId: 'hoosic-river',
  state: 'Massachusetts',
  region: 'Berkshire County / North Adams–Williamstown',
  routeType: 'whitewater',
  scoreEligibility: 'scored',
  gaugeSource: gauge,
  reach: 'Ashton Avenue Canoe Access to Lauren’s Launch',
  putIn,
  takeOut,
  latitude: putIn.latitude,
  longitude: putIn.longitude,
  summary: 'A 3.4-mile Hoosic day run from North Adams’s public Ashton Avenue canoe access to the town-developed Lauren’s Launch in Williamstown.',
  statusText: 'Use the HooRWA safe-flow guidance of 200–700 cfs at USGS 01332500 as a planning screen, then check the live trend, recent rain, current water-quality notices, shallow riffles, wood and both steep river entries before committing.',
  profile: {
    thresholdModel: 'two-sided',
    tooLow: 200,
    idealMin: 200,
    idealMax: 700,
    tooHigh: 700,
    thresholdSource: flowGuide,
    thresholdSourceStrength: 'community',
    rainfallSensitivity: 'high',
    windSensitivity: 0.05,
    seasonMonths: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    seasonNotes: 'The Hoosic drains quickly and responds to rainfall. HooRWA’s 200–700 cfs guidance is the local planning range; check live discharge, trend, weather and water-quality notices immediately before launching.',
    difficulty: 'moderate',
    difficultyNotes: 'American Whitewater rates the North Adams–North Pownal Hoosic corridor Class I–II. HooRWA describes this 3.4-mile segment as occasionally deep and swift; shallow riffles, wood and short carries still demand moving-water judgment.',
    confidenceNotes: 'HooRWA documents the Ashton Avenue-to-Lauren’s Launch segment at 3.4 miles and publishes a 200–700 cfs safest-range cue for paddling between North Adams and Pownal against the Williamstown USGS gauge. The route stays within Massachusetts and uses HooRWA’s public canoe access and its town-developed sandy-beach launch. The numeric range is a planning screen, not a safety guarantee.',
  },
  safetyProfile: {
    riskLevel: 'caution',
    reviewStatus: 'reviewed',
    hazards,
    safetyNotes: [
      'Wear a properly fitted PFD; use a helmet, cold-water protection and throw-rope/rescue equipment appropriate for swift rocky water. Paddle with a capable group and keep a shuttle and communication plan.',
      'Stay within HooRWA’s 200–700 cfs local planning range unless current local expertise supports another decision. The river rises quickly after rain; recheck gauge trend and forecast before committing.',
      'Scout the shallow riffles and wood. A 2024 low-water scout of this exact reach reported six short portages and narrow shallow lines; below the published range, expect scraping, lining or portaging and do not assume continuous floatability.',
      'Lauren’s Launch has a steep, uneven path and roughly four-foot drop to a rocky beach; inspect the landing, carry boats carefully and use only the documented roadside shoulder. Ashton access parking is limited.',
      'Check current HooRWA bacteria and water-quality notices, especially after heavy rain; avoid swallowing river water, cover open cuts and do not launch during a relevant advisory. Do not use private banks for bailout or camping.',
    ],
  },
  sourceLinks: [paddlingGuide, flowGuide, accessGuide, launchAssessment, conditionReport, { label: 'USGS Hoosic River near Williamstown gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
  accessPoints: [
    { ...putIn, id: 'hoosic-river-ashton-laurens-launch-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'HooRWA identifies the Ashton Avenue canoe access area; Massachusetts Office of Fishing and Boating Access maps the public canoe site at this river-edge coordinate. Older local access directions report parking for only a few vehicles; confirm space and the carry to the water before unloading.' },
    { ...takeOut, id: 'hoosic-river-ashton-laurens-launch-take-out', mileFromStart: 3.4, segmentKind: 'transition', note: 'HooRWA and the Town-developed launch identify Lauren’s Launch as a canoe/kayak take-out. The water-entry beach is reached by a short, steep path with a substantial drop; there is no designated lot, so use only the small roadside shoulder identified by the town assessment.' },
  ],
  logistics: {
    distanceLabel: 'About 3.4 river miles',
    estimatedPaddleTime: 'Allow 2–3 hours, including scouting and possible short portages',
    shuttle: 'Stage the downstream vehicle at Lauren’s Launch, then drive to the Ashton Avenue public canoe access. Lauren’s parking is a small roadside shoulder; keep the transfer-station road clear.',
    permits: 'No route-specific day-use permit is listed by HooRWA. Follow posted parking and access rules at Joe Girardi Park/Ashton Avenue and Lauren’s Launch; do not block the Town transfer-station road.',
    camping: 'Day trip; no public on-route campsite is documented between these accesses. Do not camp at either launch or on private banks. Arrange separately permitted lodging or a campground if staying overnight in the area.',
    campingClassification: 'none',
    summary: 'A short, local-access Hoosic float with a direct Williamstown gauge and a source-backed safe-flow range.',
    accessCaveats: ['Ashton Avenue is a public canoe access with limited parking; confirm the landing and space before unloading.', 'Lauren’s Launch is a real water-entry beach reached by a steep path and roughly four-foot drop; it is not an accessible launch and has no designated parking lot.', 'Use the water-edge access only; do not stop on private banks or block the transfer-station road.'],
    watchFor: ['USGS 01332500 discharge and the HooRWA 200–700 cfs guidance', 'Rapid rainfall response, shallow riffles, exposed rocks and wood', 'Steep rocky Lauren’s Launch landing and current HooRWA water-quality notices'],
  },
  evidenceNotes: [
    { label: 'Named reach and distance', value: 'Ashton Avenue Canoe Access to Lauren’s Launch; 3.4 miles', note: 'HooRWA identifies the numbered North Adams-to-Williamstown segment, its public access pair, Green River confluence and route character.', sourceUrl: paddlingGuide.url },
    { label: 'Scored local flow range', value: '200–700 cfs usually safest', note: 'HooRWA directs paddlers between North Adams and Pownal to the Williamstown gauge and publishes this local range. Treat it as planning guidance, not a guarantee of safety.', sourceUrl: flowGuide.url },
    { label: 'Direct gauge', value: 'USGS 01332500 Hoosic River near Williamstown, MA', note: 'USGS identifies this active Hoosic River monitoring station; HooRWA links its local paddling range to the same gauge.', sourceUrl: gauge.detailUrl },
    { label: 'Public on-water endpoints', value: 'Ashton Avenue canoe access and Lauren’s Launch sandy beach', note: 'Massachusetts OFBA maps the Ashton canoe access; HooRWA documents both launch sites, and the Williamstown town assessment confirms the Lauren’s Launch trail-to-beach entry and parking limits.', sourceUrl: launchAssessment.url },
    { label: 'Low-water route conditions', value: 'Six short portages reported on a 2024 low-water scout', note: 'Hoosic River Revival describes the exact Ashton-to-Lauren reach as shallow and rocky at low flow, with short portages and narrow floatable lines.', sourceUrl: conditionReport.url },
    { label: 'Camping', value: 'Day trip; no on-route camping documented', note: 'The official segment and access sources identify launch sites only; do not infer overnight rights on park property or private riverbanks.', sourceUrl: paddlingGuide.url },
  ],
};

export const massachusettsHoosicRoutes: River[] = [route];
