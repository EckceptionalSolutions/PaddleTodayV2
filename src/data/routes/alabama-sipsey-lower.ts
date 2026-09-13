import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const outdoor = { label: 'Outdoor Alabama Sipsey Fork above Smith Lake', url: 'https://www.outdooralabama.com/rivers-and-mobile-delta/sipsey-fork-above-smith-lake', provider: 'local' as const };
const trailGuide = { label: 'Alabama Recreation Trails Sipsey Upper Fork County Road B15 section', url: 'https://alabamarecreationtrails.org/trail/sipsey-upper-fork-canoe-trail-highway-33-put-in-take-out-to-county-road-b15/', provider: 'local' as const };
const awGuide = { label: 'American Whitewater Sipsey Fork reach and gauge notes', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/76/main', provider: 'american_whitewater' as const };
const gauge = { id: 'usgs-02450250', provider: 'usgs' as const, siteId: '02450250', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Sipsey Fork near Grayson, AL', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02450250/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'private_banks', 'cold_water'];
const putIn = { name: 'W.T. Mims Family Public Access / Alabama Highway 33 (water-entry edge)', latitude: 34.2176, longitude: -87.3687 };
const takeOut = { name: 'County Road B15 Sipsey Fork access (water-entry edge)', latitude: 34.218238, longitude: -87.366455 };

export const alabamaSipseyLowerRoutes: River[] = [{
  id: 'sipsey-fork-highway-33-county-road-b15',
  slug: 'sipsey-fork-highway-33-county-road-b15',
  name: 'Sipsey Fork',
  riverId: 'sipsey-fork-alabama',
  state: 'Alabama',
  region: 'Bankhead National Forest / Winston County',
  routeType: 'recreational',
  scoreEligibility: 'scored',
  reach: 'W.T. Mims Family Public Access at Alabama Highway 33 to County Road B15 access',
  putIn,
  takeOut,
  latitude: putIn.latitude,
  longitude: putIn.longitude,
  summary: 'A source-documented 4.5-mile Sipsey Fork canoe section from the Highway 33 Mims access downstream to County Road B15.',
  statusText: 'Use the direct Grayson gauge and confirm rainfall, trend, access and wood before launch. The 200–350 cfs band is a conservative planning range, not a safety guarantee.',
  gaugeSource: gauge,
  profile: {
    thresholdModel: 'two-sided',
    tooLow: 150,
    idealMin: 200,
    idealMax: 350,
    tooHigh: 600,
    thresholdSource: awGuide,
    thresholdSourceStrength: 'community',
    rainfallSensitivity: 'high',
    windSensitivity: 0.1,
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    seasonNotes: 'The upper Sipsey responds quickly to rainfall. Summer drought exposes shoals; storms can raise current and wood rapidly. Recheck the gauge and weather immediately before launch.',
    difficulty: 'moderate',
    difficultyNotes: 'Outdoor Alabama describes the Mims-to-Payne Creek and Mims-to-County Road B15 sections as short canoe or kayak trips. Shallow shoals, strainers and changing current still require active boat control.',
    confidenceNotes: 'Alabama Recreation Trails documents the public Highway 33-to-County Road B15 canoe section and 4.5-mile length; Outdoor Alabama confirms the same access sequence. American Whitewater supplies the conservative 200–350 cfs Sipsey planning band tied to direct USGS 02450250; apply it here as a nearby same-river cue and verify local conditions.',
  },
  safetyProfile: {
    riskLevel: 'caution',
    reviewStatus: 'reviewed',
    hazards,
    safetyNotes: [
      'Wear a properly fitted PFD and carry offline navigation, communication, throw rope, water and weather protection.',
      'At low levels expect exposed shoals and dragging; after rain, current and wood can increase quickly.',
      'Scout outside bends and any downed trees from a safe position and portage anything outside the group’s skill level.',
      'Use only the named public access sites; adjacent banks are not assumed public for parking, bailout or camping.',
    ],
  },
  sourceLinks: [outdoor, trailGuide, awGuide, { label: 'USGS Sipsey Fork gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
  accessPoints: [
    { ...putIn, id: 'sipsey-fork-highway-33-county-road-b15-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'Named W.T. Mims Family Public Access at Highway 33. Confirm the landing, parking, day-use rules and current water entry before unloading.' },
    { ...takeOut, id: 'sipsey-fork-highway-33-county-road-b15-take-out', mileFromStart: 4.5, segmentKind: 'transition', note: 'Alabama Recreation Trails identifies the County Road B15 take-out; confirm the road approach, parking and river landing before staging.' },
  ],
  logistics: {
    distanceLabel: 'About 4.5 river miles',
    estimatedPaddleTime: 'Allow 2–4 hours with shallow-water scouting and access stops',
    shuttle: 'Stage the downstream County Road B15 vehicle first, then drive to the Highway 33 Mims access.',
    permits: 'Confirm current Bankhead National Forest day-use, road and parking rules before unloading.',
    camping: 'This is a day-use route. Nearby Bankhead primitive camping exists in the broader Sipsey corridor, but no overnight campsite is promoted at either endpoint without current site confirmation.',
    campingClassification: 'nearby_basecamp',
    summary: 'A short public-access Sipsey Fork section with a direct gauge and a conservative same-river flow cue.',
    accessCaveats: ['Remote Forest Service and county-road approaches can change after storms.', 'Do not use private banks or unmarked pull-offs as access or camping.', 'The route ends at County Road B15; downstream water requires a separate access and hazard review.'],
    watchFor: ['Shallow shoals below the runnable band', 'Rain-driven rises and accumulating wood', 'County Road B15 parking and landing conditions'],
  },
  evidenceNotes: [
    { label: 'Named reach and distance', value: 'Highway 33 Mims access to County Road B15; 4.5 miles', note: 'Alabama Recreation Trails publishes the 4.5-mile canoe section and County Road B15 coordinate; Outdoor Alabama describes the Mims-to-B15 access sequence.', sourceUrl: trailGuide.url },
    { label: 'Scoring band', value: '200–350 cfs nearby Sipsey planning band; 150 cfs low guard; 600 cfs high guard', note: 'American Whitewater publishes 200–350 cfs as optimal for the adjacent County Route 60–Highway 33 Sipsey reach on direct USGS 02450250. This nearby same-river cue is conservative and must be verified locally.', sourceUrl: awGuide.url },
    { label: 'Direct gauge', value: 'USGS 02450250 near Grayson', note: 'USGS provides current Sipsey Fork discharge telemetry; recheck observation and trend before launch.', sourceUrl: gauge.detailUrl },
    { label: 'Safety and camping', value: 'Short Bankhead day-use section with nearby primitive camping', note: 'Outdoor Alabama and the Forest access guide document the public access sequence; carry, rainfall, shoals, strainers and private-bank rules remain explicit.', sourceUrl: outdoor.url },
  ],
}];
