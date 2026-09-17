import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';
import { buildStarterPlanningRoute } from './starter-planning';

const accessDirectory = { label: 'New Hampshire public boating and fishing access directory', url: 'https://www.visit-newhampshire.com/state/boat-ramps/', provider: 'local' as const };
const lowerPlan = { label: 'New Hampshire Lower Merrimack River Corridor Management Plan', url: 'https://www.des.nh.gov/sites/g/files/ehbemt341/files/documents/merr-low-plan.pdf', provider: 'local' as const };
const concordGuide = { label: 'City of Concord Sewalls Falls Park access guide', url: 'https://www.concordnh.gov/DocumentCenter/View/25024/10-TrailGuideBook_Sewalls-Falls-Park-Trail', provider: 'local' as const };
const bowGuide = { label: 'Town of Bow Merrimack River boat ramp', url: 'https://www.bownh.gov/604/Merrimack-River-Boat-Ramp', provider: 'local' as const };
const allenstownGuide = { label: 'Town of Allenstown Ferry Street boat-launch ordinance', url: 'https://allenstownnh.gov/DocumentCenter/View/482/pelissier_boat_launch_ordinance_approved_and_signed_march_2024', provider: 'local' as const };
const concordRampMap = { label: 'Concord Merrimack River public ramp coordinate record', url: 'https://www.boatlaunchmap.com/ramps/merrimack-river-concord-new-hampshire-boat-launch-5646', provider: 'local' as const };
const gauge = { id: 'usgs-01081500', provider: 'usgs' as const, siteId: '01081500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Merrimack River at Franklin Junction, NH', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-01081500/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'dam', 'private_banks', 'urban_water_quality'];

const sewall = { name: 'Sewalls Falls public boat ramp (water-entry edge)', latitude: 43.22954, longitude: -71.53805 };
const everett = { name: 'Everett Arena public boat ramp (water-entry edge)', latitude: 43.2096002, longitude: -71.5287135 };
const ferry = { name: 'Ferry Street / Exchange Street public boat ramp, Allenstown (water-entry edge)', latitude: 43.1282927, longitude: -71.4626393 };
const lambert = { name: 'Lambert Park public boat ramp, Hooksett (water-entry edge)', latitude: 43.100449, longitude: -71.463060 };
type MerrimackPoint = typeof sewall | typeof everett | typeof ferry | typeof lambert;

function makeRoute(spec: { id: string; reach: string; start: MerrimackPoint; end: MerrimackPoint; miles: number; summary: string; note: string; time: string }): River {
  return buildStarterPlanningRoute({
    id: spec.id,
    name: 'Merrimack River',
    riverId: 'merrimack-river-new-hampshire',
    state: 'New Hampshire',
    region: 'Merrimack Valley / Concord and Allenstown',
    putIn: spec.start,
    takeOut: spec.end,
    miles: spec.miles,
    summary: spec.summary,
    difficulty: 'moderate',
    difficultyNotes: 'The Lower Merrimack is broad moving water with wind, boat traffic, strainers, bridge current and multiple hydroelectric or low-head dam boundaries. These cards remain planning-only until a route-specific recreational flow band and current manager review are established.',
    seasonMonths: [5, 6, 7, 8, 9, 10],
    seasonNotes: 'Late spring through fall is the practical paddling season. Snowmelt, rain, utility operations, wind, cold water and water-quality advisories can change conditions quickly.',
    gauge,
    conditionsNote: `Planning only: ${spec.reach}. The Lower Merrimack corridor plan and named municipal/state access records support public endpoints, but this pass does not transfer a numeric recreational cutoff to USGS ${gauge.siteId}.`,
    hazards,
    safetyNotes: [
      'Wear a properly fitted PFD and carry a whistle, spare paddle, throw line, communication and offline navigation.',
      'Scout bridge current, strainers, changing channels and all dam or hydroelectric boundaries. Portage only from a legal public approach and never approach a dam in current.',
      'Check the direct gauge, weather, wind and current water-quality or wastewater notices before departure; do not launch after a posted contamination advisory.',
      'Use only named public ramps, respect private shorelines and boat traffic, and keep a conservative daylight and shuttle margin.',
    ],
    logistics: {
      estimatedPaddleTime: spec.time,
      shuttle: 'Stage the downstream public access first, then drive to the upstream ramp. Confirm parking, carry paths, gates and trailer congestion before unloading.',
      permits: 'Confirm New Hampshire boating rules, town access rules, parking limits and any utility or water-quality notices before launch.',
      camping: 'No overnight river camping is included. Use an established campground or lodging near Concord or Allenstown; do not camp at access sites or on private banks.',
      campingClassification: 'nearby_basecamp',
      accessCaveats: [spec.note, 'The Lower Merrimack includes dams, industrial shoreline and limited legal bailouts; do not improvise a take-out.', 'Recheck current access, road, parking and water-quality conditions before staging.'],
      watchFor: ['USGS 01081500 trend and weather', 'Strainers, bridge current, boat traffic and cold water', 'Sewalls Falls, Hooksett and downstream dam boundaries'],
    },
    guide: lowerPlan,
    sources: [accessDirectory, concordGuide, bowGuide, allenstownGuide, concordRampMap],
    coordinateNote: 'Coordinates are tied to named public Merrimack River ramps in the New Hampshire access directory, municipal access pages and the coordinate-backed Concord ramp record.',
    coordinateSourceUrl: accessDirectory.url,
    reviewDate: '2026-09-16',
  });
}

export const newHampshireMerrimackRoutes: River[] = [
  makeRoute({ id: 'merrimack-river-sewalls-falls-everett-arena', reach: 'Sewalls Falls public ramp to Everett Arena public ramp', start: sewall, end: everett, miles: 2.5, summary: 'A short Concord Merrimack reach between two documented public ramps, useful for a compact urban paddle when dam and water-quality checks are clear.', time: 'Allow 2–4 hours with wind, current and shuttle margin', note: 'Concord’s Sewalls Falls park guide and the state access directory identify the public ramp context; launch below any marked falls or dam hazard and confirm the Everett landing.' }),
  makeRoute({ id: 'merrimack-river-sewalls-falls-ferry-street', reach: 'Sewalls Falls public ramp to Ferry Street / Exchange Street public ramp', start: sewall, end: ferry, miles: 13.5, summary: 'A longer Concord-to-Allenstown Merrimack itinerary linking Sewalls Falls, Everett Arena and the Ferry Street public take-out.', time: 'Allow 5–8 hours with wind, current, bridge and shuttle margin', note: 'This access-chain route keeps Everett Arena as an intermediate bailout and ends at Allenstown’s regulated public Ferry Street ramp. Confirm the take-out ordinance, parking, current and any dam boundary before departure.' }),
  makeRoute({ id: 'merrimack-river-everett-arena-ferry-street', reach: 'Everett Arena public ramp to Ferry Street / Exchange Street public ramp', start: everett, end: ferry, miles: 11, summary: 'A central Merrimack Valley day reach from Concord’s Everett Arena ramp to Allenstown’s public Ferry Street take-out.', time: 'Allow 4–7 hours with wind, current, bridge and shuttle margin', note: 'The state access directory documents the Everett and Ferry Street ramp facilities. Confirm the Allenstown launch ordinance, river-entry edges, bridge current and downstream dam restrictions before staging.' }),
  makeRoute({ id: 'merrimack-river-ferry-street-lambert-park', reach: 'Ferry Street / Exchange Street public ramp to Lambert Park public ramp', start: ferry, end: lambert, miles: 3, summary: 'A short Hooksett-area Merrimack connector between two state-documented public ramps, useful when a compact day is preferred.', time: 'Allow 2–4 hours with current, bridge and access checks', note: 'The New Hampshire access directory identifies Ferry Street / Exchange Street and Lambert Park as public Merrimack ramps. Confirm the Hooksett Power Plant and dam boundary, parking, headway-speed rule and the actual water-entry edges before launch.' }),
];
