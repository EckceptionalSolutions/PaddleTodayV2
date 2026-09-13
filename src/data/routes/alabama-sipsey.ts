import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const wildScenic = { label: 'National Wild and Scenic Rivers System: Sipsey Fork', url: 'https://www.rivers.gov/rivers/apps/river/sipsey-fork-west-fork', provider: 'local' as const };
const outdoor = { label: 'Outdoor Alabama Sipsey Fork above Smith Lake', url: 'https://www.outdooralabama.com/rivers-and-mobile-delta/sipsey-fork-above-smith-lake', provider: 'local' as const };
const awGuide = { label: 'American Whitewater Sipsey Fork reach and gauge notes', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/76/main', provider: 'american_whitewater' as const };
const mapGuide = { label: 'Alabama Recreation Trails Sipsey Upper Fork access', url: 'https://alabamarecreationtrails.org/trail/sipsey-upper-fork-canoe-trail-highway-33-put-in-take-out-to-county-road-b15/', provider: 'local' as const };
const gauge = { id: 'usgs-02450250', provider: 'usgs' as const, siteId: '02450250', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Sipsey Fork near Grayson, AL', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02450250/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'private_banks', 'cold_water'];

const putIn = { name: 'Sipsey River Recreational Area / County Route 60', latitude: 34.2849, longitude: -87.39891 };
const takeOut = { name: 'W.T. Mims Family Public Access / Alabama Highway 33', latitude: 34.2176, longitude: -87.3687 };
const id = 'sipsey-fork-county-route-60-highway-33';

export const alabamaSipseyRoutes: River[] = [{
  id,
  slug: id,
  name: 'Sipsey Fork',
  riverId: 'sipsey-fork-alabama',
  state: 'Alabama',
  region: 'Bankhead National Forest / Winston County',
  reach: 'County Route 60 (Sipsey Recreational Area) to W.T. Mims Family Public Access at Alabama Highway 33',
  latitude: putIn.latitude,
  longitude: putIn.longitude,
  summary: 'A 9.5-mile Sipsey Fork float through Alabama’s only federally designated Wild and Scenic River corridor, with wooded canyon scenery, shoals and the named 100 Yard Dash feature.',
  statusText: 'Use the direct Grayson gauge and confirm rainfall, trend, access and wood before launch. The 200–350 cfs band is a conservative planning range, not a safety guarantee.',
  routeType: 'recreational',
  scoreEligibility: 'scored',
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
    seasonNotes: 'Sipsey levels depend heavily on rainfall. Summer drought can leave shallow rock and gravel; fall, winter and spring storms can raise the river rapidly and then recede quickly.',
    difficulty: 'moderate',
    difficultyNotes: 'American Whitewater rates the reach Class II with mostly calm moving water, shoals and the named 100 Yard Dash. Downed trees and changing current require scouting and dependable boat control.',
    confidenceNotes: 'American Whitewater names the exact County Route 60 to State Route 33 reach, direct USGS 02450250 gauge and 200–350 cfs optimal band. Outdoor Alabama and Alabama Recreation Trails corroborate the public access sequence and warn about low water, rainfall and remote conditions. The 150/600 cfs outer bounds are conservative planning guards rather than published safety limits.',
  },
  safetyProfile: {
    riskLevel: 'caution',
    reviewStatus: 'reviewed',
    hazards,
    safetyNotes: [
      'Wear a properly fitted PFD and carry offline navigation, communication, throw rope, water and weather protection.',
      'At low levels expect exposed shoals, dragging and boat damage; after intense rain the river can rise quickly and carry wood.',
      'Scout the 100 Yard Dash and any downed trees from shore when possible. Portage anything outside the group’s skill level.',
      'Use only the named Forest Service or public-road access sites. Adjacent banks are not assumed public for parking, bailout or camping.',
    ],
  },
  sourceLinks: [wildScenic, outdoor, awGuide, mapGuide, { label: 'USGS Sipsey Fork gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
  putIn,
  takeOut,
  accessPoints: [
    { ...putIn, id: `${id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: 'Named Sipsey River Recreational Area at County Route 60 / Cranal Road. Confirm the gravel approach, parking, day-use rules and current water entry.' },
    { ...takeOut, id: `${id}-take-out`, mileFromStart: 9.5, segmentKind: 'transition', note: 'Named W.T. Mims Family Public Access at Highway 33. Confirm the landing, parking and any current road or Forest Service notices.' },
  ],
  logistics: {
    distanceLabel: 'About 9.5 river miles',
    estimatedPaddleTime: 'Allow 4–6 hours; the official fisheries guidance notes that fishing the full reach can take about nine hours.',
    shuttle: 'Stage the downstream Highway 33 vehicle first, then drive to the County Route 60 recreation area. Verify the remote-road approach before unloading.',
    permits: 'Confirm current Bankhead National Forest day-use, parking and road conditions. Use only the named access sites and comply with posted rules.',
    camping: 'This selected reach is treated as a day trip. Nearby Bankhead primitive camping exists in the broader Sipsey corridor, but no overnight campsite is promoted on this route without current site and land-status confirmation.',
    campingClassification: 'nearby_basecamp',
    summary: 'A scenic Wild and Scenic Sipsey Fork day float with a direct gauge and a source-backed runnable band.',
    accessCaveats: ['Remote Forest Service roads and access conditions can change after storms.', 'Do not use private banks or unmarked pull-offs as access or camping.', 'The downstream Smith Lake transition is outside this route; take out at Highway 33.'],
    watchFor: ['Shallow shoals below the runnable band', 'Rapid rain-driven rises and accumulating wood', '100 Yard Dash and other current features', 'Remote roads and limited bailout options'],
  },
  evidenceNotes: [
    { label: 'Named reach and access', value: 'County Route 60 to State Route 33; 9.5 miles', note: 'American Whitewater names the exact reach and Riverfacts publishes both endpoint coordinates. Outdoor Alabama identifies County Route 60 and W.T. Mims at Highway 33 as the most popular upper-Sipsey float access chain.', sourceUrl: awGuide.url },
    { label: 'Scoring band', value: '200–350 cfs optimal; 150 cfs low guard; 600 cfs high guard', note: 'American Whitewater publishes 200–350 cfs as optimal for this exact reach. The outer guards are conservative product planning bounds and should be rechecked against current local reports.', sourceUrl: awGuide.url },
    { label: 'Direct gauge', value: 'USGS 02450250 near Grayson', note: 'USGS provides current discharge, stage and temperature telemetry for the Sipsey Fork corridor.', sourceUrl: gauge.detailUrl },
    { label: 'Safety and camping', value: 'Wild and Scenic river; day-use route with nearby Forest camping', note: 'Rivers.gov documents rapid rain response, low-water drought conditions and the designated corridor. Outdoor Alabama documents primitive camping and the named upper-Sipsey access sequence.', sourceUrl: wildScenic.url },
  ],
}];

