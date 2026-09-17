import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const awGuide = { label: 'American Whitewater Turners Falls Dam Bypass Reach', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/10911/main', provider: 'american_whitewater' as const };
const flowStudy = { label: 'FirstLight Turners Falls boating demonstration flow study', url: 'https://www.northfield-relicensing.com/content/Documents/401-wqc/20211109_Turners_Falls_Boating_Flow_Final_Study_Plan.pdf', provider: 'local' as const };
const recreationPlan = { label: 'Turners Falls Recreation Management Plan and access improvements', url: 'https://montague-ma.gov/files/2022-02-07_Selectboard_Meeting_Recreation_AIP.pdf', provider: 'local' as const };
const settlement = { label: 'Turners Falls Recreation Settlement Agreement site coordinates', url: 'https://www.gillmass.org/files/2023-0428_Final_Recreation_Settlement_Agreement.pdf', provider: 'local' as const };
const gauge = { id: 'usgs-01170500', provider: 'usgs' as const, siteId: '01170500', metric: 'discharge_cfs' as const, unit: 'cfs' as const, kind: 'direct' as const, siteName: 'Connecticut River at Montague City, MA', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-01170500/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'dam', 'private_banks'];

const fishway = { name: 'Gatehouse Fishway / Discovery Center carry put-in (water-entry edge)', latitude: 42.6088, longitude: -72.5532 };
const poplar = { name: 'Poplar Street canoe portage take-out (water-entry edge)', latitude: 42.5802, longitude: -72.5752 };

export const massachusettsConnecticutTurnersRoutes: River[] = [{
  id: 'connecticut-river-turners-falls-bypass',
  slug: 'connecticut-river-turners-falls-bypass',
  name: 'Connecticut River',
  riverId: 'connecticut-river-massachusetts',
  state: 'Massachusetts',
  region: 'Franklin County / Turners Falls bypass',
  routeType: 'whitewater',
  scoreEligibility: 'scored',
  gaugeSource: gauge,
  reach: 'Gatehouse Fishway / Discovery Center carry to Poplar Street access',
  putIn: fishway,
  takeOut: poplar,
  latitude: fishway.latitude,
  longitude: fishway.longitude,
  summary: 'The documented 3.3-mile Turners Falls bypass reach from the fishway/Discovery Center carry to the Poplar Street take-out below the hydropower project.',
  statusText: 'Use direct USGS 01170500 at Montague City and confirm the boating demonstration/release conditions, trend, dam notices, weather and current access before launch. This Class II–III reach has ledges, power-project hazards and cold water.',
  profile: {
    thresholdModel: 'minimum-only',
    tooLow: 1500,
    idealMin: 2500,
    idealMax: 8000,
    tooHigh: 10000,
    thresholdSource: awGuide,
    thresholdSourceStrength: 'mixed',
    rainfallSensitivity: 'medium',
    windSensitivity: 0.15,
    seasonMonths: [4, 5, 6, 7, 8, 9, 10],
    seasonNotes: 'Turners Falls flow is affected by hydropower operations and spill events. Confirm the current boating-day/release status and direct Montague City gauge before travel.',
    difficulty: 'hard',
    difficultyNotes: 'American Whitewater rates the bypass Class II–III. Opening Ledges, Rock Dam, bridge current and hydropower structures require experienced whitewater judgment and a conservative portage decision.',
    confidenceNotes: 'American Whitewater documents the fishway/Discovery Center carry, Poplar Street take-out, 3.3-mile reach and runnable flow context. FirstLight relicensing studies identify the fishway, Station No. 1 and Poplar access areas and evaluate 2,500–13,000 cfs boating flows. The configured 1,500 cfs floor and 2,500–8,000 cfs preferred band are screening cues, not a safety guarantee.',
  },
  safetyProfile: {
    riskLevel: 'caution',
    reviewStatus: 'reviewed',
    hazards,
    safetyNotes: [
      'Wear a whitewater helmet, properly fitted PFD and cold-water protection; carry throw bags, communication and offline navigation.',
      'Carry from the Discovery Center past the power canal and IP Bridge as directed by American Whitewater; never approach Turners Falls Dam, the canal or restricted utility structures.',
      'Scout Opening Ledges and Rock Dam; portage any feature outside the group’s training. Keep the Poplar Street take-out boundary explicit.',
      'The Poplar Street landing is steep and eroding in places. Confirm the carry, parking, bridge traffic, water quality and current project notices before unloading.',
    ],
  },
  sourceLinks: [awGuide, flowStudy, recreationPlan, settlement, { label: 'USGS Montague City gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
  accessPoints: [
    { ...fishway, id: 'connecticut-river-turners-falls-bypass-put-in', mileFromStart: 0, segmentKind: 'transition', note: 'FirstLight’s recreation studies identify the fishway put-in as an access area for skilled boaters; American Whitewater describes the carry past the Discovery Center and across the IP Bridge to the river.' },
    { ...poplar, id: 'connecticut-river-turners-falls-bypass-take-out', mileFromStart: 3.3, segmentKind: 'transition', note: 'FirstLight and the settlement agreement identify Poplar Street as the canoe-portage put-in/take-out site below the bypass. Confirm the steep landing and current parking before staging.' },
  ],
  logistics: {
    distanceLabel: 'About 3.3 river miles',
    estimatedPaddleTime: 'Allow 3–6 hours with carry, scouting, release timing and rescue margin',
    shuttle: 'Stage the vehicle at Poplar Street, then carry boats from the Discovery Center/Fishway area to the bypass put-in.',
    permits: 'Confirm FirstLight boating-day/release procedures, Montague parking rules and all posted utility restrictions before launch.',
    camping: 'Barton Cove Nature Area and Campground is the established nearby basecamp; reserve through the current manager and do not camp at the bypass or Poplar access.',
    campingClassification: 'nearby_basecamp',
    summary: 'A short, release-dependent Turners Falls bypass run with a mandatory land carry at the start and a steep Poplar Street take-out.',
    accessCaveats: ['The fishway/Discovery Center start is a carry route, not a drive-up boat ramp.', 'Do not use Cabot Woods as a bypass put-in; FirstLight’s study says its steep slope is unsuitable for bypass access.', 'Stop at Poplar Street and do not continue into downstream Connecticut River water without a separate route and hazard review.'],
    watchFor: ['USGS 01170500 trend and confirmed boating/release status', 'Opening Ledges, Rock Dam and hydropower structures', 'Cold water, steep Poplar landing and bridge/utility hazards'],
  },
  evidenceNotes: [
    { label: 'Reach and flow', value: '3.3 miles; 1,500 cfs floor; 2,500–8,000 cfs preferred screening band', note: 'American Whitewater publishes the reach and runnable context; FirstLight’s boating study evaluates 2,500–13,000 cfs flows. Verify the live gauge and project release notice.', sourceUrl: awGuide.url },
    { label: 'Direct telemetry', value: 'USGS 01170500 Connecticut River at Montague City', note: 'Direct Connecticut River discharge telemetry used for the Turners Falls corridor.', sourceUrl: gauge.detailUrl },
    { label: 'Access sequence', value: 'Fishway/Discovery Center carry to Poplar Street', note: 'American Whitewater and FirstLight identify the fishway and Poplar access areas; the settlement agreement supplies the Poplar coordinate.', sourceUrl: flowStudy.url },
    { label: 'Safety boundary', value: 'Opening Ledges, Rock Dam and utility/dam exclusion zones', note: 'Scout or portage technical features and remain outside restricted hydropower structures.', sourceUrl: recreationPlan.url },
    { label: 'Camping', value: 'nearby_basecamp', note: 'Use the established Barton Cove campground; no riverbank camping is included.', sourceUrl: recreationPlan.url },
  ],
}];
