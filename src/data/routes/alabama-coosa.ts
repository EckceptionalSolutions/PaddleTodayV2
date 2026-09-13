import type { River } from '../../lib/types';
import type { RouteHazard } from '@paddletoday/api-contract';

const cityMap = { label: 'City of Wetumpka Coosa River Whitewater Map', url: 'https://www.wetumpkaal.gov/DocumentCenter/View/722/Coosa-River-Whitewater-Map-PDF?bidId=', provider: 'local' as const };
const outfitterGuide = { label: 'Coosa River Adventures Wetumpka features and flow guide', url: 'https://www.coosariveradventures.com/features.html', provider: 'local' as const };
const trailGuide = { label: 'Alabama Recreation Trails Coosa River Whitewater', url: 'https://alabamarecreationtrails.org/trail/coosa-river-whitewater-moccasin-gap/', provider: 'local' as const };
const cityAccess = { label: 'City of Wetumpka kayaking and paddle sports', url: 'https://www.wetumpkaal.gov/396/Kayaking-Paddle-Sports', provider: 'local' as const };
const gauge = { id: 'usgs-02411600', provider: 'usgs' as const, siteId: '02411600', metric: 'gage_height_ft' as const, unit: 'ft' as const, kind: 'direct' as const, siteName: 'Coosa River at Wetumpka, AL', detailUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-02411600/' };
const hazards: RouteHazard[] = ['low_water', 'strainers', 'fast_rise', 'cold_water', 'whitewater', 'dam', 'private_banks'];

const jordan = { name: 'Jordan Dam tailwater public put-in (US 231 water-entry edge)', latitude: 32.6167538, longitude: -86.2560907 };
const cornCreek = { name: 'Corn Creek Park public river access (water-entry edge)', latitude: 32.5576306, longitude: -86.2002085 };
const goldStar = { name: 'Gold Star Park public river access (water-entry edge)', latitude: 32.5361981, longitude: -86.2088511 };

const common: Omit<River, 'id' | 'slug' | 'reach' | 'putIn' | 'takeOut' | 'latitude' | 'longitude' | 'summary' | 'accessPoints' | 'logistics' | 'evidenceNotes'> = {
  name: 'Coosa River', riverId: 'coosa-river-alabama', state: 'Alabama', region: 'Wetumpka / Jordan Dam tailwater', routeType: 'whitewater', scoreEligibility: 'scored', gaugeSource: gauge,
  statusText: 'Check USGS 02411600 stage, Alabama Power release information, weather, water temperature and both public access sites immediately before launch. The 2,000–10,000 cfs flow cues are planning references, not a safety guarantee.',
  profile: {
    thresholdModel: 'two-sided', tooLow: 2000, idealMin: 4000, idealMax: 6000, tooHigh: 10000, thresholdSource: cityMap, thresholdSourceStrength: 'official',
    rainfallSensitivity: 'high', windSensitivity: 0.2, seasonMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    seasonNotes: 'Jordan Dam releases can change quickly. Alabama Power generation, rain and downstream dam operations alter current and rapid character; check same-day release information and the direct Wetumpka gauge.',
    difficulty: 'moderate', difficultyNotes: 'The city and outfitter describe mostly flatwater punctuated by Class II–III River Falls, Moccasin Gap, Pipeline and Wetumpka Falls features. Portage or use the easier channel when the group is not trained for a feature.',
    confidenceNotes: 'The City of Wetumpka map documents the seven-mile Jordan Dam-to-Fort Toulouse whitewater corridor, public Corn Creek and Gold Star exits, and 2,000, 4,000, 6,000 and 10,000 cfs flow cues. Coosa River Adventures describes the same 7-mile trip, 3–4 hour duration and Class II–III features. USGS 02411600 is the direct Wetumpka stage station. The selected 4,000–6,000 cfs preferred band is a conservative interpretation of the official flow cues.',
  },
  safetyProfile: { riskLevel: 'caution', reviewStatus: 'reviewed', hazards, safetyNotes: [
    'Wear a properly fitted PFD and carry a helmet for whitewater, throw rope, spare paddle, communication, offline navigation and first-aid supplies.',
    'Scout River Falls, Moccasin Gap, Pipeline, Big House, Corn Creek and Wetumpka Falls from shore. The right channel at Moccasin Gap is Class III; the left channel is easier but still requires judgment.',
    'Never approach Jordan Dam, diversion structures or hydraulic features. Corn Creek and Gold Star are the documented public exits; commercial outfitters are not assumed to be public without permission.',
    'Cold water, sudden releases, thunderstorms, strainers and private banks remain hazards even when the flow is inside the planning band.',
  ] },
  sourceLinks: [cityMap, outfitterGuide, trailGuide, cityAccess, { label: 'USGS Wetumpka Coosa gauge', url: gauge.detailUrl, provider: 'usgs' as const }],
};

type Spec = { id: string; reach: string; putIn: typeof jordan; takeOut: typeof cornCreek; miles: number; summary: string; time: string; note: string; difficulty: 'easy' | 'moderate' };

function makeRoute(spec: Spec): River {
  return {
    ...common, id: spec.id, slug: spec.id, reach: spec.reach, putIn: spec.putIn, takeOut: spec.takeOut, latitude: spec.putIn.latitude, longitude: spec.putIn.longitude, summary: spec.summary,
    profile: { ...common.profile!, difficulty: spec.difficulty, difficultyNotes: spec.difficulty === 'easy' ? 'The selected lower tailwater slice is mostly moving flatwater with smaller shoals; keep a conservative line and use the public exit before the larger downstream features.' : common.profile!.difficultyNotes },
    accessPoints: [
      { ...spec.putIn, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: spec.note },
      { ...spec.takeOut, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'The city map marks this as a public river exit. Confirm the visible water-entry edge, parking, river level and any posted closure before staging.' },
    ],
    logistics: {
      distanceLabel: `About ${spec.miles} river miles`, estimatedPaddleTime: spec.time,
      shuttle: 'Stage the downstream vehicle at the named public park, then use the documented road shuttle to the Jordan Dam or Corn Creek access. Do not substitute commercial properties without permission.',
      permits: 'Confirm Alabama Power release information, City of Wetumpka park rules, parking and any event or construction closure before launch.',
      camping: 'This is a high-use day route. No on-route campsite is claimed; use established campgrounds or lodging away from the river and never camp at a public landing without current authorization.', campingClassification: 'none',
      summary: spec.summary,
      accessCaveats: ['Jordan Dam tailwater access is below the dam; never enter the dam exclusion area.', 'Corn Creek and Gold Star are public exits shown on the city map; verify current parking and carry to water.', 'Commercial outfitter landings require permission and are not included as public access.'],
      watchFor: ['USGS 02411600 stage and Alabama Power releases', 'River Falls, Moccasin Gap, Pipeline and Wetumpka Falls', 'Cold water, strainers, private banks and thunderstorms'],
    },
    evidenceNotes: [
      { label: 'Named reach and access', value: `${spec.reach}; approximately ${spec.miles} miles`, note: 'The City of Wetumpka whitewater map identifies the Jordan Dam tailwater, Corn Creek Park and Gold Star Park as the public access chain. Coosa River Adventures corroborates the popular Wetumpka corridor and feature sequence.', sourceUrl: cityMap.url },
      { label: 'Flow scoring cues', value: '2,000 cfs low operational cue; 4,000–6,000 cfs preferred planning band; 10,000 cfs upper review cue', note: 'The city map publishes the flow descriptions; use the conservative band only as a trip-planning aid and verify same-day release and stage.', sourceUrl: cityMap.url },
      { label: 'Direct gauge', value: 'USGS 02411600 Coosa River at Wetumpka', note: 'Direct stage telemetry for the selected tailwater and downtown corridor.', sourceUrl: gauge.detailUrl },
      { label: 'Safety and camping', value: 'Class II–III features, public exits, day-use only', note: 'The city, outfitter and Alabama Recreation Trails sources identify the feature hazards, public exits and popular 3–4 hour day-trip character.', sourceUrl: outfitterGuide.url },
    ],
  };
}

export const alabamaCoosaRoutes: River[] = [
  makeRoute({ id: 'coosa-river-jordan-dam-corn-creek', reach: 'Jordan Dam tailwater public put-in to Corn Creek Park public exit', putIn: jordan, takeOut: cornCreek, miles: 5.2, summary: 'A popular upper Coosa tailwater reach from below Jordan Dam to the first documented public exit at Corn Creek Park, with River Falls and Moccasin Gap features.', time: 'Allow 3–5 hours with scouting, release checks and shuttle time', note: 'Use the public tailwater access below Jordan Dam shown by the city map and Alabama Recreation Trails. Keep clear of the dam exclusion area and confirm the carry to the river.', difficulty: 'moderate' }),
  makeRoute({ id: 'coosa-river-corn-creek-gold-star', reach: 'Corn Creek Park public access to Gold Star Park public exit', putIn: cornCreek, takeOut: goldStar, miles: 2.1, summary: 'A short lower Coosa tailwater option from Corn Creek Park through Pipeline and Wetumpka Falls to Gold Star Park.', time: 'Allow 2–4 hours with feature scouting, release checks and shuttle time', note: 'Corn Creek Park is the public intermediate exit shown on the city map. Confirm the water-entry edge and parking before launching; Pipeline, Big House and Wetumpka Falls lie downstream.', difficulty: 'moderate' }),
  makeRoute({ id: 'coosa-river-jordan-dam-gold-star', reach: 'Jordan Dam tailwater public put-in to Gold Star Park public exit', putIn: jordan, takeOut: goldStar, miles: 7.3, summary: 'The documented full Wetumpka Coosa whitewater day run from below Jordan Dam through River Falls, Moccasin Gap, Pipeline and Wetumpka Falls to public Gold Star Park.', time: 'Allow 3–6 hours with scouting, release checks, shuttle and rescue margin', note: 'The city and outfitter describe the Jordan Dam-to-downtown Wetumpka run as the popular seven-mile trip. Corn Creek Park is an intermediate public exit; use it if conditions or group skill require an early take-out.', difficulty: 'moderate' }),
];
