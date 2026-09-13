import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const scdnrGuide = { label: 'SCDNR Edisto River Basin Boating Guide', url: 'https://www.dnr.sc.gov/water/river/pdf/edistoboatingguide.pdf', provider: 'local' as const };
const erckAccess = { label: 'Edisto River Canoe and Kayak Trail access sites', url: 'https://ercktrail.org/access-sites-2/', provider: 'local' as const };
const erckSections = { label: 'Edisto River Canoe and Kayak Trail sections', url: 'https://ercktrail.org/trail-sections-2/', provider: 'local' as const };
const gauge = { id: 'usgs-02175000', provider: 'usgs' as const, siteId: '02175000', metric: 'gage_height_ft' as const, unit: 'ft' as const, kind: 'direct' as const, siteName: 'Edisto River near Givhans, SC', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02175000/' };
const marsOldfield = { name: 'Mars Oldfield Landing (public Colleton County ramp)', latitude: 33.0545, longitude: -80.4492 };
const givhans = { name: 'Givhans Ferry State Park river access', latitude: 33.0425, longitude: -80.386944 };
const messervy = { name: 'T.W. Messervy Landing (public SCDNR ramp)', latitude: 33.0071, longitude: -80.4062 };
const goodHope = { name: 'Good Hope Landing (public Colleton County ramp)', latitude: 32.9658, longitude: -80.4178 };
const hazards: RouteHazard[] = ['strainers', 'low_water', 'fast_rise', 'private_banks', 'cold_water'];

const common = {
  name: 'Edisto River', riverId: 'edisto-river-south-carolina', state: 'South Carolina', region: 'Colleton County', routeType: 'recreational' as const, scoreEligibility: 'scored' as const,
  gaugeSource: gauge,
  profile: {
    thresholdModel: 'two-sided' as const, tooLow: 2, idealMin: 4, idealMax: 7, tooHigh: 10,
    thresholdSource: scdnrGuide, thresholdSourceStrength: 'official' as const, rainfallSensitivity: 'high' as const, windSensitivity: 0.4,
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], seasonNotes: 'The blackwater river responds to rainfall. Low stages expose obstacles and high stages can make channels and strainers hazardous; lower reaches become tidal downstream.',
    difficulty: 'moderate' as const, difficultyNotes: 'Mostly flatwater with current, fallen trees and the challenging New Cut passage. Intermediate moving-water judgment and navigation are appropriate.',
    confidenceNotes: 'SCDNR publishes a direct 2–10 ft best-paddling envelope at Givhans gauge 02175000. ERCK describes 4–7 ft as the easier New Cut passage cue and identifies these as distinct public-access trail sections.',
  },
  safetyProfile: { riskLevel: 'caution' as const, reviewStatus: 'reviewed' as const, hazards, safetyNotes: [
    'Wear a properly fitted PFD and carry offline navigation. Check the direct Givhans gauge and weather immediately before launch.',
    'Below 2 ft, expect portages; above 10 ft, SCDNR advises against boating. Rising water can move debris and close channels quickly.',
    'New Cut contains fallen trees and strainers. ERCK identifies 4–7 ft as the easier passage range; scout and use the old-cut portage when needed.',
    'Use only the named public ramps. Banks between access points are not assumed public bailout or camping sites, and the water is cold after storms.',
  ] },
};

type Access = typeof marsOldfield;
function makeRoute(id: string, reach: string, start: Access, end: Access, miles: number, summary: string, duration: string, shuttle: string, note: string): River {
  return {
    ...common, id, slug: id, reach, latitude: start.latitude, longitude: start.longitude,
    summary, statusText: 'Check the Givhans gauge, rainfall and access notices immediately before departure. The published stage band is a planning aid, not a safety guarantee.',
    putIn: start, takeOut: end,
    accessPoints: [
      { ...start, id: `${id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note },
      { ...end, id: `${id}-take-out`, mileFromStart: miles, segmentKind: 'transition', note: 'Public landing documented by the Edisto trail access listing; confirm parking, hours and the water-entry edge before unloading.' },
    ],
    logistics: {
      distanceLabel: `About ${miles} river miles`, estimatedPaddleTime: duration, shuttle,
      permits: 'Confirm current park or county hours, fees, parking and closure notices before launching.',
      camping: 'Givhans Ferry State Park offers nearby reservable camping; no overnight camping is assumed on private banks or at landings.', campingClassification: 'nearby_basecamp',
      summary: `A distinct Edisto River Canoe and Kayak Trail section from ${start.name} to ${end.name}.`,
      accessCaveats: ['Coordinates are mapped launch anchors, not a survey of the water-entry edge.', 'Do not block ramps or assume a landing remains open during floods, construction or park closures.', 'The lower Edisto becomes tidal downstream; these routes stay above the documented tidal sections.'],
      watchFor: ['Fallen trees, strainers and New Cut', 'Rapid rises or low-water portages', 'Cold water, storms and summer traffic'],
    },
    evidenceNotes: [
      { label: 'Named reach and distance', value: `${reach}; ${miles} miles`, note: 'ERCK lists this as a distinct trail section with public access at both ends.', sourceUrl: erckSections.url },
      { label: 'Numeric scoring evidence', value: '2–10 ft at Givhans; 4–7 ft easier New Cut passage', note: 'SCDNR publishes the official 2–10 ft planning envelope; ERCK gives the narrower 4–7 ft passage cue.', sourceUrl: scdnrGuide.url },
      { label: 'Direct telemetry', value: 'USGS 02175000', note: 'Direct Edisto River near Givhans stage station used for the scored profile.', sourceUrl: gauge.detailUrl },
      { label: 'Public access review', value: 'ERCK access sites', note: 'Both endpoints are identified public ramps or state-park access points; recheck current conditions before travel.', sourceUrl: erckAccess.url },
    ],
    sourceLinks: [scdnrGuide, erckAccess, erckSections, { label: 'USGS Givhans gauge', url: gauge.detailUrl, provider: 'usgs' }],
  };
}

export const southCarolinaEdistoMainRoutes: River[] = [
  makeRoute('edisto-river-mars-oldfield-givhans', 'Mars Oldfield Landing to Givhans Ferry State Park', marsOldfield, givhans, 6.5, 'A 6.5-mile Edisto blackwater reach with wooded bluffs, the Four Holes confluence and the challenging New Cut passage.', 'Allow 3–5 hours, with time to scout New Cut and manage summer traffic.', 'Stage at Givhans Ferry State Park, then drive to Mars Oldfield. Confirm park hours, fees and both ramp approaches.', 'Mars Oldfield is a public Colleton County ramp with limited parking; keep vehicles clear of the landing.'),
  makeRoute('edisto-river-givhans-messervy', 'Givhans Ferry State Park to T.W. Messervy Landing', givhans, messervy, 3, 'A 3-mile, highly used summer tuber and floater section between two public access points, with current, bridge crossings and fallen trees.', 'Allow 1.5–3 hours, longer with summer traffic or a conservative scout.', 'Stage at T.W. Messervy, then drive to the state-park access. Confirm hours, fees, parking and the non-motorized launch approach.', 'Givhans Ferry State Park provides public access and nearby camping; summer use can make the corridor busy.'),
  makeRoute('edisto-river-messervy-good-hope', 'T.W. Messervy Landing to Good Hope Landing', messervy, goodHope, 4, 'A 4-mile Edisto section through wooded floodplain and the New Cut, with a quieter downstream take-out at Good Hope.', 'Allow 2–4 hours, including scouting and a possible old-cut portage.', 'Stage at Good Hope, then drive to T.W. Messervy. Confirm the SCDNR ramp, parking and downstream landing approach.', 'T.W. Messervy is a public SCDNR ramp with a floating dock; scout New Cut and use the easier passage or portage as conditions require.'),
  makeRoute('edisto-river-mars-oldfield-messervy', 'Mars Oldfield Landing to T.W. Messervy Landing', marsOldfield, messervy, 9.5, 'A longer 9.5-mile Edisto itinerary joining the Mars Oldfield–Givhans and Givhans–Messervy public trail sections, with Givhans as an intermediate bailout.', 'Allow 5–7 hours with New Cut scouting, summer traffic and shuttle margin.', 'Stage at T.W. Messervy, then drive to Mars Oldfield. Use Givhans Ferry State Park as the documented intermediate exit if conditions or daylight require an early take-out.', 'This combined route follows two ERCK sections; confirm both ramp approaches, park hours and a clear water entry before launch.'),
  makeRoute('edisto-river-givhans-good-hope', 'Givhans Ferry State Park to Good Hope Landing', givhans, goodHope, 7, 'A 7-mile Edisto itinerary joining the two documented lower sections from Givhans through T.W. Messervy to Good Hope.', 'Allow 4–6 hours with New Cut scouting, breaks and shuttle margin.', 'Stage at Good Hope, then drive to Givhans Ferry State Park. Use T.W. Messervy as the documented intermediate bailout and confirm park hours and fees.', 'The route crosses the New Cut corridor; use the easier passage or portage when the flow or debris makes the cut unsuitable.'),
  makeRoute('edisto-river-mars-oldfield-good-hope', 'Mars Oldfield Landing to Good Hope Landing', marsOldfield, goodHope, 13.5, 'The full 13.5-mile Edisto mainstem day itinerary across the documented Mars Oldfield, Givhans, Messervy and Good Hope access chain.', 'Allow 6–9 hours with New Cut scouting, breaks, summer traffic and shuttle margin.', 'Stage at Good Hope, then drive to Mars Oldfield. Givhans and Messervy remain documented intermediate exits; preserve daylight and a conservative return plan.', 'This full route links three ERCK sections and two intermediate public bailouts; confirm all current ramp conditions before committing.'),
];
