// Georgia route coverage. Keep routes ordered by river and downstream direction.
import type { River, SourceProvider } from '../../lib/types';

type GeorgiaRouteSpec = {
  id: string;
  name: string;
  riverId: string;
  reach: string;
  region: string;
  distance: number;
  time: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  risk: 'standard' | 'caution' | 'advanced';
  gauge: string;
  metric: 'discharge_cfs' | 'gage_height_ft';
  siteName: string;
  putIn: { name: string; latitude: number; longitude: number };
  takeOut: { name: string; latitude: number; longitude: number };
  idealMin?: number;
  idealMax?: number;
  tooLow: number;
  tooHigh?: number;
  thresholdLabel: string;
  thresholdUrl: string;
  thresholdProvider?: SourceProvider;
  thresholdStrength: 'official' | 'mixed' | 'community';
  routeUrl: string;
  routeSourceLabel?: string;
  routeSourceProvider?: SourceProvider;
  summary: string;
  status: string;
  seasonNotes: string;
  difficultyNotes: string;
  hazards: string[];
  safety: string[];
  camping: string;
  campingClassification: 'none' | 'nearby_basecamp' | 'endpoint_campground' | 'on_route_campsite';
  shuttle: string;
  permits: string;
  accessCaveats: string[];
  watchFor: string[];
  evidence: string;
};

const aw = 'https://www.americanwhitewater.org/content/River/view/river-detail';

function buildGeorgiaRoute(spec: GeorgiaRouteSpec): River {
  const gaugeUrl = `https://waterdata.usgs.gov/monitoring-location/USGS-${spec.gauge}/`;
  const currentUrl = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${spec.gauge}&parameterCd=00060,00065&siteStatus=all`;
  const slug = spec.id;
  const accessPoints = [
    { id: `${slug}-put-in`, ...spec.putIn, mileFromStart: 0, segmentKind: 'transition' as const },
    { id: `${slug}-take-out`, ...spec.takeOut, mileFromStart: spec.distance, segmentKind: 'transition' as const },
  ];
  return {
    id: spec.id,
    slug,
    riverId: spec.riverId,
    name: spec.name,
    reach: spec.reach,
    aliases: [`${spec.name} ${spec.reach}`, `${spec.name} Georgia fall paddle`],
    state: 'Georgia',
    region: spec.region,
    routeType: spec.difficulty === 'hard' ? 'whitewater' : 'recreational',
    summary: spec.summary,
    statusText: spec.status,
    latitude: spec.putIn.latitude,
    longitude: spec.putIn.longitude,
    gaugeSource: {
      id: `usgs-${spec.gauge}`,
      provider: 'usgs',
      siteId: spec.gauge,
      metric: spec.metric,
      unit: spec.metric === 'discharge_cfs' ? 'cfs' : 'ft',
      kind: 'direct',
      siteName: spec.siteName,
      detailUrl: gaugeUrl,
      hydrographUrl: `https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=${spec.gauge}`,
    },
    safetyProfile: {
      riskLevel: spec.risk,
      hazards: spec.hazards as any,
      safetyNotes: spec.safety,
      reviewStatus: 'reviewed',
    },
    profile: {
      thresholdModel: spec.idealMin !== undefined && spec.idealMax !== undefined ? 'two-sided' : 'minimum-only',
      ...(spec.idealMin !== undefined ? { idealMin: spec.idealMin } : {}),
      ...(spec.idealMax !== undefined ? { idealMax: spec.idealMax } : {}),
      tooLow: spec.tooLow,
      ...(spec.tooHigh !== undefined ? { tooHigh: spec.tooHigh } : {}),
      thresholdSource: { label: spec.thresholdLabel, url: spec.thresholdUrl, provider: spec.thresholdProvider ?? 'american_whitewater' },
      thresholdSourceStrength: spec.thresholdStrength,
      rainfallSensitivity: 'medium',
      seasonMonths: [3, 4, 5, 6, 7, 8, 9, 10, 11],
      seasonNotes: spec.seasonNotes,
      difficulty: spec.difficulty,
      difficultyNotes: spec.difficultyNotes,
      confidenceNotes: `The named reach, direct USGS gauge, public endpoint pair, and route-specific flow guidance are documented by American Whitewater and agency or park sources. ${spec.evidence}`,
    },
    putIn: spec.putIn,
    takeOut: spec.takeOut,
    logistics: {
      distanceLabel: `About ${spec.distance} river miles`,
      estimatedPaddleTime: spec.time,
      shuttle: spec.shuttle,
      permits: spec.permits,
      camping: spec.camping,
      campingClassification: spec.campingClassification,
      summary: `Plan a same-day ${spec.distance}-mile Georgia river trip with a staged shuttle, PFDs, current gauge check, and daylight margin.`,
      accessCaveats: spec.accessCaveats,
      watchFor: spec.watchFor,
    },
    accessPoints,
    evidenceNotes: [
      { label: 'Named route and public endpoints', value: `${spec.reach}, about ${spec.distance} miles`, note: spec.evidence, sourceUrl: spec.routeUrl },
      { label: 'Direct live gauge', value: `USGS ${spec.gauge}`, note: 'The route uses direct USGS telemetry for same-day discharge or stage checks.', sourceUrl: currentUrl },
      { label: 'Numeric flow guidance', value: spec.thresholdLabel, note: 'Use this as conservative planning guidance, not a guarantee of safe conditions; rising water, debris, weather, and local notices override it.', sourceUrl: spec.thresholdUrl },
      { label: 'Access and safety posture', value: 'Named public or managed endpoint pair', note: 'Confirm current hours, parking, closures, launch fees, and take-out conditions before committing.', sourceUrl: gaugeUrl },
      { label: 'Camping classification', value: spec.campingClassification, note: spec.camping },
      { label: 'Public access control', value: 'Use only named public or managed access points', note: 'No private-bank, roadside, or inferred access is included in the route plan.' },
      { label: 'Seasonality', value: 'March–November planning window', note: spec.seasonNotes },
      { label: 'Image decision', value: 'Approved same-river Wikimedia Commons context photo', note: 'The route gallery labels the image as same-river context rather than exact-reach photography.' },
      { label: 'Overlap decision', value: 'Distinct access-to-access itinerary', note: 'The route is retained because its endpoint pair and trip purpose are materially distinct from other Georgia candidates.' },
    ],
    sourceLinks: [
      { label: spec.routeSourceLabel ?? 'American Whitewater route page', url: spec.routeUrl, provider: spec.routeSourceProvider ?? 'american_whitewater' },
      { label: `USGS ${spec.gauge} monitoring location`, url: gaugeUrl, provider: 'usgs' },
      { label: `USGS ${spec.gauge} current values`, url: currentUrl, provider: 'usgs' },
      { label: 'Georgia Rivers water-trail network', url: 'https://garivers.org/explore/', provider: 'local' },
    ],
  };
}

const npsChattahoocheeAccess = [
  ['Bowmans Island', 34.15666, -84.07992], ['McGinnis Ferry', 34.05089722, -84.0990389], ['Medlock Bridge', 33.995425, -84.202523],
  ['Jones Bridge', 33.999, -84.2479], ['Island Ford', 33.9869, -84.3235], ['Johnson Ferry South', 33.937567, -84.413261],
  ['Powers Island', 33.904079, -84.442122], ['Paces Mill', 33.870198, -84.453659],
] as const;
const npsChattahoocheeRoutes: River[] = (() => {
  const miles = [12.5, 8.5, 4, 8, 7, 6, 5];
  const out: River[] = [];
  const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  for (let start = 0; start < npsChattahoocheeAccess.length - 1; start += 1) {
    for (const span of [1, 2, 3, 4]) {
      const end = start + span;
      if (end >= npsChattahoocheeAccess.length) continue;
      const [from, fromLat, fromLon] = npsChattahoocheeAccess[start]; const [to, toLat, toLon] = npsChattahoocheeAccess[end];
      if (from === 'Powers Island' && to === 'Paces Mill') continue;
      const distance = miles.slice(start, end).reduce((sum, value) => sum + value, 0);
      const gauge = end <= 2 ? '02334430' : end <= 4 ? '02334653' : end <= 6 ? '02335000' : '02335815';
      const siteName = end <= 2 ? 'Chattahoochee River below Buford Dam, GA' : end <= 4 ? 'Chattahoochee River at McGinnis Ferry, GA' : end <= 6 ? 'Chattahoochee River at Norcross, GA' : 'Chattahoochee River below Morgan Falls Dam, GA';
      out.push(buildGeorgiaRoute({
        id: `chattahoochee-river-${slug(from)}-${slug(to)}`, name: 'Chattahoochee River', riverId: 'chattahoochee-river', reach: `${from} to ${to}`,
        region: 'Chattahoochee River National Recreation Area', distance, time: distance > 12 ? 'About 5–8 hours' : 'About 2–5 hours', difficulty: 'moderate', risk: 'caution', gauge, metric: 'discharge_cfs', siteName,
        putIn: { name: `${from} public launch`, latitude: fromLat, longitude: fromLon }, takeOut: { name: `${to} public launch`, latitude: toLat, longitude: toLon },
        tooLow: 500, idealMin: 800, idealMax: 3000, tooHigh: 4000,
        thresholdLabel: 'NPS Chattahoochee guidance: canoeing and kayaking below 4,000 cfs; cancel for high or rising flow and account for Buford/Morgan Falls releases', thresholdUrl: 'https://www.nps.gov/chat/planyourvisit/river-flow-rate.htm', thresholdProvider: 'nps', thresholdStrength: 'official',
        routeUrl: 'https://www.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS Chattahoochee boating access', routeSourceProvider: 'nps',
        summary: `A managed-access Chattahoochee day trip from ${from} to ${to}, using the NPS launch chain and a direct USGS corridor gauge.`,
        status: `Use USGS ${gauge} and the NPS flow table before launching. This route is open only during daylight and must be cancelled for high or rising release-driven flow.`,
        seasonNotes: 'The NPS corridor is open for boating year-round; fall foliage is attractive, but release timing, weather, water quality, and daylight control the decision.',
        difficultyNotes: 'Mostly flatwater to Class I–II shoals with submerged rocks, snags, and release-driven current; competent boat handling and continuous PFD use are required.',
        hazards: ['dam_release', 'strainers', 'fast_rise', 'cold_water', 'urban_water_quality', 'private_banks'],
        safety: ['Wear a PFD continuously and use only the named NPS or partner launch ramps.', 'Check the relevant USGS gauge and Buford/Morgan Falls release context; water can rise rapidly.', 'Respect the named take-out and do not improvise a private-bank exit after daylight fades.'],
        camping: 'NPS units are day-use; use nearby Atlanta, Roswell, or Buford lodging and established campgrounds.', campingClassification: 'nearby_basecamp',
        shuttle: `Stage the ${to} vehicle first, then return to the signed ${from} access. Expect paid passes, busy fall weekends, and limited parking at some units.`, permits: 'NPS daily or annual park pass may be required; confirm current access hours, closures, and parking rules.',
        accessCaveats: ['NPS identifies this endpoint pair as public launch access; confirm current ramp, parking, pass, and closure status on arrival.', 'Do not use private frontage, deteriorated bridge approaches, or informal pull-offs as substitute access.'],
        watchFor: ['USGS flow above 4,000 cfs or rising rapidly', 'Buford/Morgan Falls release changes', 'strainers, submerged rocks, water-quality notices, and daylight loss'], evidence: 'NPS boating guidance names both endpoints in the Chattahoochee public launch chain and publishes corridor flow-rate limits and release warnings.'
      }));
    }
  }
  return out;
})();

type NpsDocumentedFloat = {
  id: string;
  from: string;
  to: string;
  distance: number;
  gauge: string;
  siteName: string;
  routeUrl: string;
  routeSourceLabel: string;
  fromPoint: { latitude: number; longitude: number };
  toPoint: { latitude: number; longitude: number };
};

const npsDocumentedFloatRoutes: River[] = [
  {
    id: 'chattahoochee-river-chattahoochee-pointe-mcginnis-ferry', from: 'Chattahoochee Pointe', to: 'McGinnis Ferry', distance: 2, gauge: '02334653', siteName: 'Chattahoochee River at McGinnis Ferry, GA', routeUrl: 'https://www.forsythco.com/News/improvements-completed-at-forsyth-countys-chattahoochee-pointe2', routeSourceLabel: 'Forsyth County Chattahoochee Pointe canoe launch',
    fromPoint: { latitude: 34.067, longitude: -84.118 }, toPoint: { latitude: 34.05089722, longitude: -84.0990389 },
  },
  {
    id: 'chattahoochee-river-chattahoochee-pointe-abbotts-bridge', from: 'Chattahoochee Pointe', to: 'Abbotts Bridge', distance: 7, gauge: '02334653', siteName: 'Chattahoochee River at McGinnis Ferry, GA', routeUrl: 'https://www.forsythco.com/News/improvements-completed-at-forsyth-countys-chattahoochee-pointe2', routeSourceLabel: 'Forsyth County Chattahoochee Pointe canoe launch',
    fromPoint: { latitude: 34.067, longitude: -84.118 }, toPoint: { latitude: 34.025, longitude: -84.172 },
  },
  {
    id: 'chattahoochee-river-chattahoochee-pointe-medlock-bridge', from: 'Chattahoochee Pointe', to: 'Medlock Bridge', distance: 11, gauge: '02334653', siteName: 'Chattahoochee River at McGinnis Ferry, GA', routeUrl: 'https://www.forsythco.com/News/improvements-completed-at-forsyth-countys-chattahoochee-pointe2', routeSourceLabel: 'Forsyth County Chattahoochee Pointe canoe launch',
    fromPoint: { latitude: 34.067, longitude: -84.118 }, toPoint: { latitude: 33.995425, longitude: -84.202523 },
  },
  {
    id: 'chattahoochee-river-chattahoochee-pointe-jones-bridge', from: 'Chattahoochee Pointe', to: 'Jones Bridge', distance: 14, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://www.forsythco.com/News/improvements-completed-at-forsyth-countys-chattahoochee-pointe2', routeSourceLabel: 'Forsyth County Chattahoochee Pointe canoe launch',
    fromPoint: { latitude: 34.067, longitude: -84.118 }, toPoint: { latitude: 33.999, longitude: -84.2479 },
  },
  {
    id: 'chattahoochee-river-mcginnis-ferry-abbotts-bridge', from: 'McGinnis Ferry', to: 'Abbotts Bridge', distance: 4.5, gauge: '02334653', siteName: 'Chattahoochee River at McGinnis Ferry, GA', routeUrl: 'https://www.nps.gov/places/abbotts-bridge-launch.htm', routeSourceLabel: 'NPS Abbotts Bridge launch float options',
    fromPoint: { latitude: 34.05089722, longitude: -84.0990389 }, toPoint: { latitude: 34.025, longitude: -84.172 },
  },
  {
    id: 'chattahoochee-river-abbotts-bridge-medlock-bridge', from: 'Abbotts Bridge', to: 'Medlock Bridge', distance: 4.5, gauge: '02334653', siteName: 'Chattahoochee River at McGinnis Ferry, GA', routeUrl: 'https://www.nps.gov/places/abbotts-bridge-launch.htm', routeSourceLabel: 'NPS Abbotts Bridge launch float options',
    fromPoint: { latitude: 34.025, longitude: -84.172 }, toPoint: { latitude: 33.995425, longitude: -84.202523 },
  },
  {
    id: 'chattahoochee-river-abbotts-bridge-jones-bridge', from: 'Abbotts Bridge', to: 'Jones Bridge', distance: 6.7, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://www.nps.gov/places/jones-bridge-boat-launch.htm', routeSourceLabel: 'NPS Jones Bridge launch float options',
    fromPoint: { latitude: 34.025, longitude: -84.172 }, toPoint: { latitude: 33.999, longitude: -84.2479 },
  },
  {
    id: 'chattahoochee-river-jones-bridge-chattahoochee-river-park', from: 'Jones Bridge', to: 'Chattahoochee River Park', distance: 12, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/park-brochure.htm', routeSourceLabel: 'NPS Chattahoochee park brochure float options',
    fromPoint: { latitude: 33.999, longitude: -84.2479 }, toPoint: { latitude: 34.0014, longitude: -84.3752 },
  },
  {
    id: 'chattahoochee-river-medlock-bridge-garrard-landing', from: 'Medlock Bridge', to: 'Garrard Landing', distance: 5.4, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://www.nps.gov/places/garrard-landing-park-launch.htm', routeSourceLabel: 'NPS Garrard Landing launch float options',
    fromPoint: { latitude: 33.995425, longitude: -84.202523 }, toPoint: { latitude: 33.973, longitude: -84.264 },
  },
  {
    id: 'chattahoochee-river-jones-bridge-garrard-landing', from: 'Jones Bridge', to: 'Garrard Landing', distance: 3, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://www.nps.gov/places/garrard-landing-park-launch.htm', routeSourceLabel: 'NPS Garrard Landing launch float options',
    fromPoint: { latitude: 33.999, longitude: -84.2479 }, toPoint: { latitude: 33.973, longitude: -84.264 },
  },
  {
    id: 'chattahoochee-river-garrard-landing-island-ford', from: 'Garrard Landing', to: 'Island Ford', distance: 4.8, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://www.nps.gov/places/garrard-landing-park-launch.htm', routeSourceLabel: 'NPS Garrard Landing launch float options',
    fromPoint: { latitude: 33.973, longitude: -84.264 }, toPoint: { latitude: 33.9869, longitude: -84.3235 },
  },
  {
    id: 'chattahoochee-river-garrard-landing-don-white', from: 'Garrard Landing', to: 'Don White Park', distance: 7.1, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://www.nps.gov/places/garrard-landing-park-launch.htm', routeSourceLabel: 'NPS Garrard Landing launch float options',
    fromPoint: { latitude: 33.973, longitude: -84.264 }, toPoint: { latitude: 34.01056, longitude: -84.33723 },
  },
  {
    id: 'chattahoochee-river-island-ford-don-white', from: 'Island Ford', to: 'Don White Park', distance: 2.3, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://www.nps.gov/places/island-ford-launch.htm', routeSourceLabel: 'NPS Island Ford launch float options',
    fromPoint: { latitude: 33.9869, longitude: -84.3235 }, toPoint: { latitude: 34.01056, longitude: -84.33723 },
  },
  {
    id: 'chattahoochee-river-island-ford-azalea-park', from: 'Island Ford', to: 'Azalea Park', distance: 4, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://www.nps.gov/places/island-ford-launch.htm', routeSourceLabel: 'NPS Island Ford launch float options',
    fromPoint: { latitude: 33.9869, longitude: -84.3235 }, toPoint: { latitude: 34.002, longitude: -84.363 },
  },
  {
    id: 'chattahoochee-river-island-ford-overlook-park', from: 'Island Ford', to: 'Overlook Park', distance: 7, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS Chattahoochee boating access',
    fromPoint: { latitude: 33.9869, longitude: -84.3235 }, toPoint: { latitude: 33.972, longitude: -84.379 },
  },
  {
    id: 'chattahoochee-river-don-white-overlook-park', from: 'Don White Park', to: 'Overlook Park', distance: 5, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS Chattahoochee boating access',
    fromPoint: { latitude: 34.01056, longitude: -84.33723 }, toPoint: { latitude: 33.972, longitude: -84.379 },
  },
  {
    id: 'chattahoochee-river-azalea-park-overlook-park', from: 'Azalea Park', to: 'Overlook Park', distance: 4, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS Chattahoochee boating access',
    fromPoint: { latitude: 34.002, longitude: -84.363 }, toPoint: { latitude: 33.972, longitude: -84.379 },
  },
  {
    id: 'chattahoochee-river-overlook-park-johnson-ferry', from: 'Overlook Park', to: 'Johnson Ferry', distance: 2.8, gauge: '02335815', siteName: 'Chattahoochee River below Morgan Falls Dam, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS Chattahoochee boating access',
    fromPoint: { latitude: 33.972, longitude: -84.379 }, toPoint: { latitude: 33.945, longitude: -84.404 },
  },
  {
    id: 'chattahoochee-river-johnson-ferry-powers-island', from: 'Johnson Ferry', to: 'Powers Island', distance: 3.5, gauge: '02335815', siteName: 'Chattahoochee River below Morgan Falls Dam, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/park-brochure.htm', routeSourceLabel: 'NPS Chattahoochee park brochure float options',
    fromPoint: { latitude: 33.945, longitude: -84.404 }, toPoint: { latitude: 33.904079, longitude: -84.442122 },
  },
  {
    id: 'chattahoochee-river-overlook-park-powers-island', from: 'Overlook Park', to: 'Powers Island', distance: 6, gauge: '02335815', siteName: 'Chattahoochee River below Morgan Falls Dam, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS Chattahoochee boating access',
    fromPoint: { latitude: 33.972, longitude: -84.379 }, toPoint: { latitude: 33.904079, longitude: -84.442122 },
  },
  {
    id: 'chattahoochee-river-overlook-park-paces-mill', from: 'Overlook Park', to: 'Paces Mill', distance: 8.8, gauge: '02335815', siteName: 'Chattahoochee River below Morgan Falls Dam, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS Chattahoochee boating access',
    fromPoint: { latitude: 33.972, longitude: -84.379 }, toPoint: { latitude: 33.870198, longitude: -84.453659 },
  },
  {
    id: 'chattahoochee-river-morgan-falls-park-johnson-ferry', from: 'Morgan Falls Park', to: 'Johnson Ferry', distance: 1.8, gauge: '02335815', siteName: 'Chattahoochee River below Morgan Falls Dam, GA', routeUrl: 'https://www.nps.gov/places/morgan-falls-river-park-launch.htm', routeSourceLabel: 'NPS Morgan Falls River Park launch float options',
    fromPoint: { latitude: 33.965, longitude: -84.382 }, toPoint: { latitude: 33.945, longitude: -84.404 },
  },
  {
    id: 'chattahoochee-river-morgan-falls-park-powers-island', from: 'Morgan Falls Park', to: 'Powers Island', distance: 6, gauge: '02335815', siteName: 'Chattahoochee River below Morgan Falls Dam, GA', routeUrl: 'https://www.nps.gov/places/morgan-falls-river-park-launch.htm', routeSourceLabel: 'NPS Morgan Falls River Park launch float options',
    fromPoint: { latitude: 33.965, longitude: -84.382 }, toPoint: { latitude: 33.904079, longitude: -84.442122 },
  },
  {
    id: 'chattahoochee-river-morgan-falls-park-paces-mill', from: 'Morgan Falls Park', to: 'Paces Mill', distance: 8.8, gauge: '02335815', siteName: 'Chattahoochee River below Morgan Falls Dam, GA', routeUrl: 'https://www.nps.gov/places/morgan-falls-river-park-launch.htm', routeSourceLabel: 'NPS Morgan Falls River Park launch float options',
    fromPoint: { latitude: 33.965, longitude: -84.382 }, toPoint: { latitude: 33.870198, longitude: -84.453659 },
  },
  {
    id: 'chattahoochee-river-morgan-falls-park-whitewater-creek', from: 'Morgan Falls Park', to: 'Whitewater Creek', distance: 7.8, gauge: '02335815', siteName: 'Chattahoochee River below Morgan Falls Dam, GA', routeUrl: 'https://www.nps.gov/places/morgan-falls-river-park-launch.htm', routeSourceLabel: 'NPS Morgan Falls River Park launch float options',
    fromPoint: { latitude: 33.965, longitude: -84.382 }, toPoint: { latitude: 33.878, longitude: -84.443 },
  },
  {
    id: 'chattahoochee-river-powers-island-whitewater-creek', from: 'Powers Island', to: 'Whitewater Creek', distance: 1.8, gauge: '02335815', siteName: 'Chattahoochee River below Morgan Falls Dam, GA', routeUrl: 'https://www.nps.gov/places/powers-island-launch.htm', routeSourceLabel: 'NPS Powers Island launch float options',
    fromPoint: { latitude: 33.904079, longitude: -84.442122 }, toPoint: { latitude: 33.878, longitude: -84.443 },
  },
  {
    id: 'chattahoochee-river-whitewater-creek-paces-mill', from: 'Whitewater Creek', to: 'Paces Mill', distance: 0.8, gauge: '02335815', siteName: 'Chattahoochee River below Morgan Falls Dam, GA', routeUrl: 'https://home.nps.gov/places/paces-mill-launch-no1.htm', routeSourceLabel: 'NPS Paces Mill launch float options',
    fromPoint: { latitude: 33.878, longitude: -84.443 }, toPoint: { latitude: 33.870198, longitude: -84.453659 },
  },
  {
    id: 'chattahoochee-river-johnson-ferry-paces-mill', from: 'Johnson Ferry', to: 'Paces Mill', distance: 6.8, gauge: '02335815', siteName: 'Chattahoochee River below Morgan Falls Dam, GA', routeUrl: 'https://home.nps.gov/places/paces-mill-launch-no1.htm', routeSourceLabel: 'NPS Paces Mill launch float options',
    fromPoint: { latitude: 33.945, longitude: -84.404 }, toPoint: { latitude: 33.870198, longitude: -84.453659 },
  },
  {
    id: 'chattahoochee-river-chattahoochee-pointe-garrard-landing', from: 'Chattahoochee Pointe', to: 'Garrard Landing', distance: 16.3, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.067, longitude: -84.118 }, toPoint: { latitude: 33.973, longitude: -84.264 },
  },
  {
    id: 'chattahoochee-river-chattahoochee-pointe-island-ford', from: 'Chattahoochee Pointe', to: 'Island Ford', distance: 21.4, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.067, longitude: -84.118 }, toPoint: { latitude: 33.9869, longitude: -84.3235 },
  },
  {
    id: 'chattahoochee-river-chattahoochee-pointe-don-white', from: 'Chattahoochee Pointe', to: 'Don White Park', distance: 23.3, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.067, longitude: -84.118 }, toPoint: { latitude: 34.01056, longitude: -84.33723 },
  },
  {
    id: 'chattahoochee-river-chattahoochee-pointe-azalea-park', from: 'Chattahoochee Pointe', to: 'Azalea Park', distance: 25, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.067, longitude: -84.118 }, toPoint: { latitude: 34.002, longitude: -84.363 },
  },
  {
    id: 'chattahoochee-river-mcginnis-ferry-garrard-landing', from: 'McGinnis Ferry', to: 'Garrard Landing', distance: 14.7, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.05089722, longitude: -84.0990389 }, toPoint: { latitude: 33.973, longitude: -84.264 },
  },
  {
    id: 'chattahoochee-river-mcginnis-ferry-don-white', from: 'McGinnis Ferry', to: 'Don White Park', distance: 21.7, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.05089722, longitude: -84.0990389 }, toPoint: { latitude: 34.01056, longitude: -84.33723 },
  },
  {
    id: 'chattahoochee-river-mcginnis-ferry-azalea-park', from: 'McGinnis Ferry', to: 'Azalea Park', distance: 23.4, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.05089722, longitude: -84.0990389 }, toPoint: { latitude: 34.002, longitude: -84.363 },
  },
  {
    id: 'chattahoochee-river-abbotts-bridge-garrard-landing', from: 'Abbotts Bridge', to: 'Garrard Landing', distance: 9.5, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.025, longitude: -84.172 }, toPoint: { latitude: 33.973, longitude: -84.264 },
  },
  {
    id: 'chattahoochee-river-abbotts-bridge-island-ford', from: 'Abbotts Bridge', to: 'Island Ford', distance: 14.6, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.025, longitude: -84.172 }, toPoint: { latitude: 33.9869, longitude: -84.3235 },
  },
  {
    id: 'chattahoochee-river-abbotts-bridge-don-white', from: 'Abbotts Bridge', to: 'Don White Park', distance: 16.5, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.025, longitude: -84.172 }, toPoint: { latitude: 34.01056, longitude: -84.33723 },
  },
  {
    id: 'chattahoochee-river-abbotts-bridge-azalea-park', from: 'Abbotts Bridge', to: 'Azalea Park', distance: 18.3, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.025, longitude: -84.172 }, toPoint: { latitude: 34.002, longitude: -84.363 },
  },
  {
    id: 'chattahoochee-river-medlock-bridge-don-white', from: 'Medlock Bridge', to: 'Don White Park', distance: 12.5, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 33.995425, longitude: -84.202523 }, toPoint: { latitude: 34.01056, longitude: -84.33723 },
  },
  {
    id: 'chattahoochee-river-medlock-bridge-azalea-park', from: 'Medlock Bridge', to: 'Azalea Park', distance: 14.3, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 33.995425, longitude: -84.202523 }, toPoint: { latitude: 34.002, longitude: -84.363 },
  },
  {
    id: 'chattahoochee-river-jones-bridge-don-white', from: 'Jones Bridge', to: 'Don White Park', distance: 9.6, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 33.999, longitude: -84.2479 }, toPoint: { latitude: 34.01056, longitude: -84.33723 },
  },
  {
    id: 'chattahoochee-river-jones-bridge-azalea-park', from: 'Jones Bridge', to: 'Azalea Park', distance: 11.3, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 33.999, longitude: -84.2479 }, toPoint: { latitude: 34.002, longitude: -84.363 },
  },
  {
    id: 'chattahoochee-river-garrard-landing-azalea-park', from: 'Garrard Landing', to: 'Azalea Park', distance: 8.7, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 33.973, longitude: -84.264 }, toPoint: { latitude: 34.002, longitude: -84.363 },
  },
  {
    id: 'chattahoochee-river-don-white-azalea-park', from: 'Don White Park', to: 'Azalea Park', distance: 1.7, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/planyourvisit/boating.htm', routeSourceLabel: 'NPS public launch chain + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.01056, longitude: -84.33723 }, toPoint: { latitude: 34.002, longitude: -84.363 },
  },
  {
    id: 'chattahoochee-river-chattahoochee-pointe-rogers-bridge', from: 'Chattahoochee Pointe', to: 'Rogers Bridge Park', distance: 4.8, gauge: '02334653', siteName: 'Chattahoochee River at McGinnis Ferry, GA', routeUrl: 'https://home.nps.gov/chat/learn/management/superintendents-compendium-2025.htm', routeSourceLabel: 'NPS 2026 compendium public launch list + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.067, longitude: -84.118 }, toPoint: { latitude: 34.029, longitude: -84.142 },
  },
  {
    id: 'chattahoochee-river-mcginnis-ferry-rogers-bridge', from: 'McGinnis Ferry', to: 'Rogers Bridge Park', distance: 3.2, gauge: '02334653', siteName: 'Chattahoochee River at McGinnis Ferry, GA', routeUrl: 'https://home.nps.gov/chat/learn/management/superintendents-compendium-2025.htm', routeSourceLabel: 'NPS 2026 compendium public launch list + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.05089722, longitude: -84.0990389 }, toPoint: { latitude: 34.029, longitude: -84.142 },
  },
  {
    id: 'chattahoochee-river-rogers-bridge-abbotts-bridge', from: 'Rogers Bridge Park', to: 'Abbotts Bridge', distance: 2, gauge: '02334653', siteName: 'Chattahoochee River at McGinnis Ferry, GA', routeUrl: 'https://home.nps.gov/chat/learn/management/superintendents-compendium-2025.htm', routeSourceLabel: 'NPS 2026 compendium public launch list + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.029, longitude: -84.142 }, toPoint: { latitude: 34.025, longitude: -84.172 },
  },
  {
    id: 'chattahoochee-river-rogers-bridge-medlock-bridge', from: 'Rogers Bridge Park', to: 'Medlock Bridge', distance: 6, gauge: '02334653', siteName: 'Chattahoochee River at McGinnis Ferry, GA', routeUrl: 'https://home.nps.gov/chat/learn/management/superintendents-compendium-2025.htm', routeSourceLabel: 'NPS 2026 compendium public launch list + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.029, longitude: -84.142 }, toPoint: { latitude: 33.995425, longitude: -84.202523 },
  },
  {
    id: 'chattahoochee-river-rogers-bridge-jones-bridge', from: 'Rogers Bridge Park', to: 'Jones Bridge', distance: 8.9, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/learn/management/superintendents-compendium-2025.htm', routeSourceLabel: 'NPS 2026 compendium public launch list + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.029, longitude: -84.142 }, toPoint: { latitude: 33.999, longitude: -84.2479 },
  },
  {
    id: 'chattahoochee-river-rogers-bridge-garrard-landing', from: 'Rogers Bridge Park', to: 'Garrard Landing', distance: 11.5, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/learn/management/superintendents-compendium-2025.htm', routeSourceLabel: 'NPS 2026 compendium public launch list + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.029, longitude: -84.142 }, toPoint: { latitude: 33.973, longitude: -84.264 },
  },
  {
    id: 'chattahoochee-river-rogers-bridge-island-ford', from: 'Rogers Bridge Park', to: 'Island Ford', distance: 16.6, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/learn/management/superintendents-compendium-2025.htm', routeSourceLabel: 'NPS 2026 compendium public launch list + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.029, longitude: -84.142 }, toPoint: { latitude: 33.9869, longitude: -84.3235 },
  },
  {
    id: 'chattahoochee-river-rogers-bridge-don-white', from: 'Rogers Bridge Park', to: 'Don White Park', distance: 18.5, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/learn/management/superintendents-compendium-2025.htm', routeSourceLabel: 'NPS 2026 compendium public launch list + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.029, longitude: -84.142 }, toPoint: { latitude: 34.01056, longitude: -84.33723 },
  },
  {
    id: 'chattahoochee-river-rogers-bridge-azalea-park', from: 'Rogers Bridge Park', to: 'Azalea Park', distance: 20.2, gauge: '02335000', siteName: 'Chattahoochee River at Norcross, GA', routeUrl: 'https://home.nps.gov/chat/learn/management/superintendents-compendium-2025.htm', routeSourceLabel: 'NPS 2026 compendium public launch list + Chattahoochee RiverLands mileage matrix',
    fromPoint: { latitude: 34.029, longitude: -84.142 }, toPoint: { latitude: 34.002, longitude: -84.363 },
  },
  {
    id: 'chattahoochee-river-lower-pool-abbotts-bridge', from: 'Lower Pool Park', to: 'Abbotts Bridge', distance: 12.8, gauge: '02334430', siteName: 'Chattahoochee River below Buford Dam, GA', routeUrl: 'https://www.nps.gov/places/lower-pool-park-launch.htm', routeSourceLabel: 'NPS Lower Pool Park launch float options',
    fromPoint: { latitude: 34.15666, longitude: -84.07992 }, toPoint: { latitude: 34.025, longitude: -84.172 },
  },
].map((float: NpsDocumentedFloat) => buildGeorgiaRoute({
  id: float.id, name: 'Chattahoochee River', riverId: 'chattahoochee-river', reach: `${float.from} to ${float.to}`, region: 'Chattahoochee River National Recreation Area', distance: float.distance, time: float.distance > 10 ? 'About 6–10 hours' : float.distance > 6 ? 'About 4–7 hours' : 'About 1–4 hours', difficulty: 'moderate', risk: 'caution', gauge: float.gauge, metric: 'discharge_cfs', siteName: float.siteName,
  putIn: { name: `${float.from} public launch`, ...float.fromPoint }, takeOut: { name: `${float.to} public launch`, ...float.toPoint },
  tooLow: 500, idealMin: 800, idealMax: 3000, tooHigh: 4000,
  thresholdLabel: 'NPS Chattahoochee guidance: canoeing and kayaking below 4,000 cfs; cancel for high or rising flow and account for Buford/Morgan Falls releases', thresholdUrl: 'https://www.nps.gov/chat/planyourvisit/river-flow-rate.htm', thresholdProvider: 'nps', thresholdStrength: 'official', routeUrl: float.routeUrl, routeSourceLabel: float.routeSourceLabel, routeSourceProvider: 'nps',
  summary: `A documented Chattahoochee day float from ${float.from} to ${float.to}, using an NPS launch pair and direct USGS corridor gauge.`, status: `Use USGS ${float.gauge} and the NPS flow table before launching. Cancel for high or rising release-driven flow.`, seasonNotes: 'The NPS corridor is open for boating year-round; fall foliage is attractive, but release timing, weather, water quality, and daylight control the decision.', difficultyNotes: 'Mostly flatwater to Class I–II shoals with submerged rocks, snags, and release-driven current; competent boat handling and continuous PFD use are required.', hazards: ['dam_release', 'strainers', 'fast_rise', 'cold_water', 'urban_water_quality', 'private_banks'], safety: ['Wear a PFD continuously and use only the named NPS or partner launch ramps.', 'Check the relevant USGS gauge and dam release context; water can rise rapidly.', 'Respect the named take-out and do not improvise a private-bank exit after daylight fades.'], camping: 'NPS units are day-use; use nearby Atlanta, Roswell, or Buford lodging and established campgrounds.', campingClassification: 'nearby_basecamp', shuttle: `Stage the ${float.to} vehicle first, then return to the signed ${float.from} access. Expect paid passes, busy fall weekends, and limited parking at some units.`, permits: 'NPS daily or annual park pass may be required; confirm current access hours, closures, and parking rules.', accessCaveats: ['NPS identifies this endpoint pair as public launch access; confirm current ramp, parking, pass, and closure status on arrival.', 'Do not use private frontage, deteriorated bridge approaches, or informal pull-offs as substitute access.'], watchFor: ['USGS flow above 4,000 cfs or rising rapidly', 'Buford/Morgan Falls release changes', 'strainers, submerged rocks, water-quality notices, and daylight loss'], evidence: `NPS documents the ${float.from} and ${float.to} launch context and publishes corridor flow-rate limits and release warnings.`
}));

export const georgiaRoutes: River[] = [
  buildGeorgiaRoute({
    id: 'chattahoochee-river-ga115-duncan-bridge', name: 'Chattahoochee River', riverId: 'chattahoochee-river',
    reach: 'Georgia Route 115 to Duncan Bridge Road', region: 'Northeast Georgia / Upper Chattahoochee', distance: 4.1, time: 'About 3–5 hours with scouting', difficulty: 'hard', risk: 'advanced',
    gauge: '02331000', metric: 'gage_height_ft', siteName: 'Chattahoochee River near Leaf, GA',
    putIn: { name: 'Georgia Route 115 public access', latitude: 34.5745, longitude: -83.6345 }, takeOut: { name: 'Duncan Bridge Road public access', latitude: 34.5409, longitude: -83.6224 },
    tooLow: 2.5, idealMin: 3.5, idealMax: 4.7, tooHigh: 4.7,
    thresholdLabel: 'American Whitewater Leaf gauge bands: below 2.5 ft very low; 2.5–3.5 runnable; 3.5–4.7 good; the Leaf gauge clips above 4.7 ft, so verify the Cornelia gauge for high water', thresholdUrl: `${aw}/471/main`, thresholdStrength: 'community', routeUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/471/main',
    summary: 'A compact Upper Chattahoochee whitewater reach with named Georgia State Park access, fall scenery, and direct Leaf-gauge stage guidance.',
    status: 'This is an advanced scored route. Use USGS 02331000 only through its reliable range: 3.5–4.7 ft is the broad target band, while high-water decisions require the Cornelia gauge because the Leaf sensor can clip above 4.7 ft.',
    seasonNotes: 'The Upper Chattahoochee is a strong fall option when stage, weather, and park access cooperate. Cold water, rain-driven rises, and limited daylight require a conservative turnaround plan.',
    difficultyNotes: 'American Whitewater rates the reach Class II–III with stronger features above the normal band. Rescue skills, helmet/PFD, and whitewater boat control are required.',
    hazards: ['whitewater', 'strainers', 'fast_rise', 'cold_water', 'remote', 'wind'],
    safety: ['Wear a PFD and helmet continuously and carry rescue equipment; this is not a casual beginner float.', 'Treat 4.7 ft on the Leaf gauge as a sensor ceiling, not a safe upper limit; cross-check the Cornelia gauge and recent trend before launching.', 'Scout named rapids and portage anything beyond the group’s ability. Do not continue downstream past Duncan Bridge Road seeking an improvised exit.'],
    camping: 'Use nearby Helen or northeast Georgia lodging and established campgrounds; no on-route camping is assumed.', campingClassification: 'nearby_basecamp',
    shuttle: 'Stage the Duncan Bridge Road vehicle first. Georgia State Park access requires a current parking/entrance pass and the put-in has limited parking.', permits: 'Georgia State Park daily or annual pass is required for the documented access; confirm current hours, parking, and closures.',
    accessCaveats: ['Both endpoints are identified public Georgia State Park access areas; verify the current pass, hours, carry, and parking limits before launch.', 'Do not use private frontage or unmarked roadside pull-offs as substitute access.'],
    watchFor: ['Leaf gauge below 2.5 ft, above 4.7 ft, or clipping during a rise', 'Cornelia gauge confirmation for high water', 'strainers, stronger rapids, cold water, and limited parking'], evidence: 'American Whitewater documents the 4.1-mile GA 115-to-Duncan Bridge reach, direct Leaf gauge, stage bands, high-water sensor limitation, and Georgia State Park access requirement.'
  }),
  buildGeorgiaRoute({
    id: 'chattahoochee-river-powers-island-paces-mill', name: 'Chattahoochee River', riverId: 'chattahoochee-river',
    reach: 'Powers Island to Paces Mill', region: 'Atlanta / Chattahoochee River National Recreation Area', distance: 2.6, time: 'About 1–2 hours', difficulty: 'moderate', risk: 'caution',
    gauge: '02336000', metric: 'discharge_cfs', siteName: 'Chattahoochee River at Atlanta, GA',
    putIn: { name: 'Powers Island public river access', latitude: 33.902517, longitude: -84.443422 }, takeOut: { name: 'Paces Mill Canoe and Raft Launch', latitude: 33.870228, longitude: -84.45184 },
    tooLow: 1000, idealMin: 2500,
    thresholdLabel: 'American Whitewater: runnable around 1,000 cfs; optimal 2,500 cfs and up', thresholdUrl: `${aw}/474/main`, thresholdStrength: 'community', routeUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/474/main',
    summary: 'A short, high-value Atlanta float through the Chattahoochee River National Recreation Area, with a managed Powers Island launch and Paces Mill take-out.',
    status: 'Use USGS 02336000 and check the Morgan Falls release context. Around 1,000 cfs is a conservative runnable floor; American Whitewater calls 2,500 cfs and up optimal. Paces Mill is the last park take-out.',
    seasonNotes: 'The NPS corridor is open for boating year-round. Fall is especially attractive in the wooded Atlanta corridor, but daylight, water quality, and dam-release conditions still control the decision.',
    difficultyNotes: 'Mostly moving Class I–II water, but current around submerged rocks, strainers, releases, and crowded launch areas requires competent boat handling.',
    hazards: ['dam_release', 'strainers', 'fast_rise', 'cold_water', 'urban_water_quality', 'private_banks'],
    safety: ['Wear a PFD continuously and use only designated NPS or partner launch ramps.', 'Morgan Falls releases can change current and water level quickly; check the release context and trend before launching.', 'Paces Mill is the last park take-out. Do not continue downstream looking for an improvised exit.', 'NPS warns about submerged rocks, jagged snags, broken glass, and changing water quality; check the current E. coli notice.'],
    camping: 'Chattahoochee River NRA is day-use only; use nearby Atlanta-area lodging or campgrounds outside the route.', campingClassification: 'nearby_basecamp',
    shuttle: 'Stage the Paces Mill vehicle first, then use the signed Powers Island access. Expect busy fall weekends and paid park parking.', permits: 'NPS daily or annual park pass may be required; no special paddle permit is assumed.',
    accessCaveats: ['Powers Island and Paces Mill are managed access points; confirm hours, parking, closures, and launch conditions.', 'Do not use private banks, informal pull-offs, or the downstream river as a substitute take-out.'],
    watchFor: ['Morgan Falls release or rapidly rising USGS trend', 'E. coli or stormwater notices', 'crowding, strainers, submerged rocks, and daylight loss'], evidence: 'NPS documents the 48-mile year-round boating corridor, named public ramps, and Paces Mill as the last canoe/kayak exit.'
  }),
  buildGeorgiaRoute({
    id: 'chattahoochee-river-columbus-whitewater-park', name: 'Chattahoochee River', riverId: 'chattahoochee-river',
    reach: 'Columbus Whitewater Park', region: 'Columbus / Chattahoochee River', distance: 1.9, time: 'About 1–3 hours depending on play and scouting', difficulty: 'hard', risk: 'advanced',
    gauge: '02341460', metric: 'discharge_cfs', siteName: 'Chattahoochee River at 14th St, at Columbus, GA',
    putIn: { name: 'Columbus Whitewater Park upstream access', latitude: 32.49487278, longitude: -84.99543883 }, takeOut: { name: 'Columbus Whitewater Park downstream access', latitude: 32.46850825, longitude: -84.99648155 },
    tooLow: 800, idealMin: 800, idealMax: 3000, tooHigh: 5000,
    thresholdLabel: 'American Whitewater: below 3 units favors river running; higher releases increase play-wave difficulty', thresholdUrl: `${aw}/3659/main`, thresholdStrength: 'community', routeUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/3659/main',
    summary: 'A compact, engineered whitewater reach at the Columbus Whitewater Park with public park access and direct Columbus USGS telemetry.',
    status: 'This is an advanced scored route, not a casual float. Check USGS 02341460, the park release schedule, and current feature conditions; use the lower-flow river-running posture unless your group is prepared for stronger release features.',
    seasonNotes: 'The park can be paddled outside peak summer when water and weather cooperate. Fall releases may be scheduled or event-driven; verify the current calendar before traveling.',
    difficultyNotes: 'American Whitewater rates the course Class II–III+ with stronger features at higher releases. Rescue planning, helmet/PFD, and whitewater boat control are required.',
    hazards: ['dam_release', 'whitewater', 'strainers', 'fast_rise', 'cold_water', 'urban_water_quality'],
    safety: ['Treat release units and feature size as dynamic; scout the course and do not infer safety from the discharge number alone.', 'Wear a PFD and helmet, carry rescue equipment, and keep below the dam and park boundaries described by the venue.', 'Confirm public parking, event closures, and downstream take-out before launching.'],
    camping: 'Use Columbus lodging or established campgrounds; the whitewater park is day-use.', campingClassification: 'nearby_basecamp',
    shuttle: 'Short urban shuttle between park access areas; stage vehicles only in signed public parking and account for event congestion.', permits: 'Check current park rules, release/event notices, and any local parking requirements.',
    accessCaveats: ['Use only the whitewater park access points; do not launch from the riverbank or dam infrastructure.', 'The Georgia–Alabama border corridor has separate land and water rules; remain on the documented park reach.'],
    watchFor: ['release schedule and rising USGS 02341460', 'feature changes, strainers, and commercial or event traffic', 'heat/cold exposure and urban water-quality notices'], evidence: 'American Whitewater documents the 1.9-mile Columbus course, direct gauge, public whitewater park context, and changing feature character by release.'
  }),
  buildGeorgiaRoute({
    id: 'broad-river-us281-us172', name: 'Broad River', riverId: 'broad-river', reach: 'U.S. Route 281 to U.S. Route 172', region: 'Northeast Georgia / Broad River', distance: 5.8, time: 'About 3–5 hours', difficulty: 'moderate', risk: 'caution',
    gauge: '02191300', metric: 'gage_height_ft', siteName: 'Broad River above Carlton, GA',
    putIn: { name: 'U.S. Route 281 Broad River access', latitude: 34.181834421871585, longitude: -83.14652526139137 }, takeOut: { name: 'U.S. Route 172 Broad River access', latitude: 34.155695707056005, longitude: -83.08026939618452 },
    tooLow: 2, idealMin: 3, idealMax: 4, tooHigh: 6,
    thresholdLabel: 'American Whitewater: 2 ft minimum; 3–4 ft optimal for beginners; above 6 ft changes river character', thresholdUrl: `${aw}/469/main`, thresholdStrength: 'community', routeUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/469/main',
    summary: 'A short Broad River shoal run with a clean stage-based planning model and a scenic northeast Georgia fall setting.',
    status: 'Use the Broad River above Carlton gauge. Two feet is the conservative minimum; 3–4 feet is the beginner-friendly target. Above 6 feet, the river becomes materially stronger and should not be treated as a standard recommendation.',
    seasonNotes: 'Spring through fall is the practical window. Autumn foliage and moderate temperatures make this a strong October–November option, subject to rain and stage trend.',
    difficultyNotes: 'Mostly Class I–II with stronger shoals as stage rises. Expect current, rocks, strainers, and limited choices around higher-water features.',
    hazards: ['low_water', 'fast_rise', 'strainers', 'whitewater', 'private_banks', 'cold_water'],
    safety: ['Use the stage band as a planning aid, not a guarantee; rising water, debris, and local scouting override it.', 'Wear PFDs, scout shoals, and stay clear of any bridge, low-head, or obstruction hazard.', 'Confirm that both bridge-area endpoint approaches permit parking and carry; do not assume an unmarked roadside bank is public.'],
    camping: 'Use nearby Athens or northeast Georgia lodging/campgrounds; no on-route camping is assumed.', campingClassification: 'nearby_basecamp',
    shuttle: 'Stage the downstream U.S. 172 vehicle first. The corridor is short, but bridge approaches and muddy access can complicate the carry.', permits: 'Confirm county/landowner access, parking, and any seasonal restrictions before launch.',
    accessCaveats: ['American Whitewater names the route endpoints, but verify current public-use status and parking at both bridge areas.', 'Private banks line portions of the Broad; use only confirmed public access.'],
    watchFor: ['USGS stage below 2 ft, above 6 ft, or rising quickly', 'bridge hazards, strainers, exposed rocks, and muddy carries', 'private-bank and parking restrictions'], evidence: 'American Whitewater names the exact 5.8-mile reach, Broad River above Carlton gauge, and numeric stage bands.'
  }),
  buildGeorgiaRoute({
    id: 'etowah-river-highway136-kelly-bridge', name: 'Etowah River', riverId: 'etowah-river', reach: 'Highway 136 to Kelly Bridge Road', region: 'North Georgia / Dawson Forest', distance: 18.2, time: 'About 6–9 hours; plan a full day', difficulty: 'easy', risk: 'caution',
    gauge: '02389150', metric: 'discharge_cfs', siteName: 'Etowah River at GA 9, near Dawsonville, GA',
    putIn: { name: 'Highway 136 Etowah access', latitude: 34.412830769296086, longitude: -84.01769461161784 }, takeOut: { name: 'Kelly Bridge Road access', latitude: 34.353033213343906, longitude: -84.20737777973363 },
    tooLow: 100, idealMin: 150, idealMax: 500, tooHigh: 900,
    thresholdLabel: 'American Whitewater and Georgia paddling sources: low-flow scraping below roughly 100–150 cfs; current and wood increase rapidly above the normal band', thresholdUrl: `${aw}/4644/main`, thresholdStrength: 'community', routeUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/4644/main',
    summary: 'A long, mostly Class I Etowah reach through wooded and agricultural North Georgia, with a direct Dawsonville-area gauge and distinct Highway 136 and Kelly Bridge endpoints.',
    status: 'Use USGS 02389150 conservatively: below roughly 100–150 cfs expect scraping; around 150–500 cfs is the practical planning band. Higher or rapidly rising water can make wood and current substantially more consequential.',
    seasonNotes: 'American Whitewater describes the reach as available year-round, with fall offering a particularly good combination of foliage and comfortable temperatures.',
    difficultyNotes: 'The rapids are generally Class I–I+, but the 18.2-mile length, strainers, private banks, and limited exit choices make this a full-day route for prepared paddlers.',
    hazards: ['low_water', 'strainers', 'fast_rise', 'private_banks', 'cold_water', 'remote'],
    safety: ['Treat the published flow cues as conservative planning guidance; wood, weather, and recent storm damage override them.', 'Carry enough water, communication, repair gear, and daylight margin for an 18-mile route.', 'Do not use private driveways, banks, or informal bridge pull-offs for access or bailout.'],
    camping: 'Use nearby Dawsonville/Canton lodging or established campgrounds; no legal on-route camping is assumed.', campingClassification: 'nearby_basecamp',
    shuttle: 'Stage Kelly Bridge Road first. The long shuttle and limited intermediate exits require a reliable vehicle and a hard turnaround time.', permits: 'Confirm current public access, parking, and any road or gate restrictions at both endpoints.',
    accessCaveats: ['Endpoint names are established in the paddling literature, but verify the current carry and parking conditions before launch.', 'The corridor contains private frontage; intermediate exits are not assumed unless explicitly public.'],
    watchFor: ['USGS discharge below 100–150 cfs or rising rapidly', 'river-wide strainers, downed trees, and fatigue late in the day', 'private frontage, road access, and daylight loss'], evidence: 'American Whitewater names the 18.2-mile Highway 136-to-Kelly Bridge reach, direct Etowah gauge, year-round character, and Class I–I+ profile.'
  }),
  buildGeorgiaRoute({
    id: 'toccoa-river-deep-hole-sandy-bottoms', name: 'Toccoa River', riverId: 'toccoa-river', reach: 'Deep Hole Recreation Area to Sandy Bottoms', region: 'North Georgia / Chattahoochee-Oconee National Forest', distance: 7, time: 'About 4–7 hours with scouting and portages', difficulty: 'moderate', risk: 'caution',
    gauge: '03558000', metric: 'discharge_cfs', siteName: 'Toccoa River near Dial, GA',
    putIn: { name: 'Deep Hole Recreation Area', latitude: 34.78741474558797, longitude: -84.23957821418104 }, takeOut: { name: 'Sandy Bottoms Recreation Area', latitude: 34.80035413415488, longitude: -84.24947370309233 },
    tooLow: 250, idealMin: 300, idealMax: 600, tooHigh: 1200,
    thresholdLabel: 'American Whitewater planning reports: around 300 cfs is runnable but challenging; the lower Toccoa guidance favors about 350 cfs or more', thresholdUrl: `${aw}/509/main`, thresholdStrength: 'community', routeUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/509/main',
    summary: 'A forested Blue Ridge Toccoa canoe-trail section linking two named Forest Service recreation areas, with fall scenery and direct Dial gauge context.',
    status: 'Use USGS 03558000 near Dial with a conservative 250 cfs floor and 300–600 cfs target. Around 300 cfs can still be demanding; higher water, wood, and rapids require whitewater judgment.',
    seasonNotes: 'The National Forest canoe-trail corridor is a premier North Georgia fall setting. Water is cold and rain-sensitive; verify weather, stage trend, and Forest Service notices.',
    difficultyNotes: 'Class I–II moving water with shoals, strainers, and portage decisions. American Whitewater reports that even 300 cfs is not a casual beginner level on this section.',
    hazards: ['whitewater', 'strainers', 'fast_rise', 'cold_water', 'remote', 'portage'],
    safety: ['Wear a PFD and cold-water protection; do not treat the canoe trail label as a flatwater guarantee.', 'Scout shoals and wood from legal access, portage anything outside the group’s ability, and carry rescue/repair equipment.', 'Confirm Deep Hole and Sandy Bottoms parking, fees, toilets, and road conditions before launch.'],
    camping: 'Deep Hole Campground provides an established Forest Service basecamp near the canoe trail; confirm current reservations and seasonal operations.', campingClassification: 'endpoint_campground',
    shuttle: 'Stage Sandy Bottoms first, then drive the Forest Service access road to Deep Hole. Road and parking conditions can change seasonally.', permits: 'Forest Service recreation fees or campground reservations may apply; confirm current Chattahoochee-Oconee National Forest rules.',
    accessCaveats: ['Use the named Forest Service recreation areas only; do not infer public access from an unnamed roadside bank.', 'Expect limited emergency exits and changing road conditions in the forest corridor.'],
    watchFor: ['USGS discharge below 250 cfs or rising sharply', 'cold-water exposure, shoals, strainers, and portage needs', 'Forest Service road, fee, campground, and closure notices'], evidence: 'American Whitewater names the Deep Hole-to-Sandy Bottoms section and the Forest Service documents the Toccoa River Canoe Trail and Deep Hole access/camping context.'
  }),
  buildGeorgiaRoute({
    id: 'flint-river-sprewell-bluff-po-biddy', name: 'Flint River', riverId: 'flint-river', reach: 'Sprewell Bluff State Park to Po Biddy Road', region: 'Middle Georgia / Flint River', distance: 20, time: 'About 5–8 hours', difficulty: 'moderate', risk: 'caution',
    gauge: '02347500', metric: 'discharge_cfs', siteName: 'Flint River at U.S. 19, near Carsonville, GA',
    putIn: { name: 'Sprewell Bluff State Park river access', latitude: 32.98913384825225, longitude: -84.5289281692553 }, takeOut: { name: 'Po Biddy Road access', latitude: 32.838508639696045, longitude: -84.42429681053416 },
    tooLow: 800, idealMin: 1000, idealMax: 2200, tooHigh: 5000,
    thresholdLabel: 'American Whitewater reports the reach is generally worth running above about 1,000 cfs; lower levels can require extensive dragging', thresholdUrl: `${aw}/485/main`, thresholdStrength: 'community', routeUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/485/main',
    summary: 'A scenic 20-mile Flint River shoal run from Sprewell Bluff State Park through limestone and wildlife habitat to the Po Biddy Road finish.',
    status: 'Use USGS 02347500 near Carsonville. Treat roughly 800 cfs as a conservative low-water warning and 1,000–2,200 cfs as the useful planning band; below that, expect dragging and exposed shoals.',
    seasonNotes: 'The lower Flint’s long fall season, shoals, limestone bluffs, and blue-hole springs make it a strong October route. Rain can change the river quickly and high water can hide hazards.',
    difficultyNotes: 'Mostly Class I–II with shoals and occasional stronger features. The 20-mile distance, natural dams, strainers, and limited roadside exits require a full-day plan.',
    hazards: ['low_water', 'fast_rise', 'strainers', 'whitewater', 'private_banks', 'remote'],
    safety: ['Scout Natural Dam and other shoals; portage anything that is not clearly within the group’s ability.', 'Carry water, repair gear, and communication. Late-route flatwater and fatigue can consume daylight.', 'Use only confirmed state-park or public access areas; do not take out at private banks or unmarked road edges.'],
    camping: 'Use Sprewell Bluff State Park or a nearby Flint River basecamp; no informal riverbank camping is assumed on this day route.', campingClassification: 'nearby_basecamp',
    shuttle: 'Stage Po Biddy Road first and verify the final road approach, especially after rain. The shuttle is long and some access roads can be muddy.', permits: 'Confirm Sprewell Bluff State Park hours, parking/launch rules, fees, and any current river or road closures.',
    accessCaveats: ['Po Biddy Road access can be road-condition sensitive; verify a legal vehicle staging point before launch.', 'The river corridor includes private frontage and natural obstacles; intermediate bailout access is not assumed.'],
    watchFor: ['USGS discharge below 800–1,000 cfs or rapid storm rise', 'Natural Dam, shoals, strainers, and low-water dragging', 'muddy roads, private banks, and daylight loss'], evidence: 'American Whitewater documents the exact 20-mile Sprewell Bluff-to-Po Biddy reach, Carsonville gauge, and repeated reports that about 1,000 cfs is the useful low-water threshold; Georgia Rivers also promotes fall Flint trips.'
  }),
  buildGeorgiaRoute({
    id: 'ocmulgee-river-lloyd-shoals-wise-creek', name: 'Ocmulgee River', riverId: 'ocmulgee-river', reach: 'Lloyd Shoals Dam to Wise Creek (Seven Islands)', region: 'Middle Georgia / Upper Ocmulgee', distance: 6, time: 'About 3–5 hours with scouting', difficulty: 'moderate', risk: 'caution',
    gauge: '02210500', metric: 'discharge_cfs', siteName: 'Ocmulgee River near Jackson, GA',
    putIn: { name: 'Georgia Power public ramp below Lloyd Shoals Dam', latitude: 33.31597, longitude: -83.83958 }, takeOut: { name: 'Wise Creek public takeout', latitude: 33.24341, longitude: -83.81373 },
    tooLow: 500, idealMin: 1000, idealMax: 4000, tooHigh: 8000,
    thresholdLabel: 'American Whitewater Seven Islands guidance: about 570 cfs is below recommended; 1,000–4,000 cfs is the practical play-and-paddle band, with dam releases changing the river quickly', thresholdUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/4579/main', thresholdStrength: 'community', routeUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/4579/main',
    summary: 'A forested, dam-controlled Ocmulgee reach through the Seven Islands corridor, with named Georgia Power and Wise Creek access and direct Jackson gauge context.',
    status: 'Use USGS 02210500 near Jackson and confirm Lloyd Shoals release conditions. Treat sub-570 cfs as below the published runnable context; rising or high release flow requires whitewater judgment and scouting.',
    seasonNotes: 'The shaded Upper Ocmulgee is attractive in fall, but release timing, cold water, and changing shoals control the trip. Verify Georgia Power generation information before launch.',
    difficultyNotes: 'American Whitewater rates the reach Class I–II (III), with flatwater first and stronger ledges and shoals in the Seven Islands section. This is not a casual beginner float at higher releases.',
    hazards: ['dam_release', 'whitewater', 'strainers', 'fast_rise', 'cold_water', 'remote'],
    safety: ['Check USGS 02210500 and the Lloyd Shoals release schedule immediately before launching.', 'Wear a PFD, scout ledges and Smiths Shoals, and carry rescue gear appropriate for moving water.', 'Use only the documented Georgia Power and Wise Creek access points; do not substitute private or informal banks.'],
    camping: 'Use nearby Jackson lodging or established campgrounds; no on-route camping is assumed.', campingClassification: 'nearby_basecamp',
    shuttle: 'Stage the Wise Creek vehicle first, then use the Georgia Power ramp below the dam. Confirm gate, road, and parking conditions.', permits: 'Confirm current Georgia Power and Forest Service access rules, release notices, and parking restrictions.',
    accessCaveats: ['The Georgia Power ramp is public but sits below a regulated dam; verify current hours and release warnings.', 'Wise Creek has submerged concrete hazards near the takeout; follow the American Whitewater access description.'],
    watchFor: ['USGS discharge below about 570 cfs or rapidly rising', 'Lloyd Shoals generation changes, ledges, and submerged concrete', 'strainers, cold water, and limited emergency exits'], evidence: 'American Whitewater documents the 6-mile Seven Islands reach, direct 02210500 gauge, public Georgia Power ramp, Wise Creek takeout, and flow-dependent feature guidance.'
  }),
  buildGeorgiaRoute({
    id: 'ocmulgee-river-popes-ferry-amerson', name: 'Ocmulgee River', riverId: 'ocmulgee-river', reach: 'Popes Ferry to Amerson Water Park', region: 'Middle Georgia / Ocmulgee', distance: 10, time: 'About 4–7 hours', difficulty: 'moderate', risk: 'caution',
    gauge: '02212735', metric: 'discharge_cfs', siteName: 'Ocmulgee River at GA 18, at Dames Ferry, GA',
    putIn: { name: 'Popes Ferry public ramp', latitude: 32.994, longitude: -83.725 }, takeOut: { name: 'Amerson Water Park canoe ramp', latitude: 32.882, longitude: -83.658 },
    tooLow: 500, idealMin: 700, idealMax: 3000, tooHigh: 6000,
    thresholdLabel: 'American Whitewater Dames Ferry guidance: roughly 450–1,500 cfs keeps the shoals technical; 3,000–4,500 cfs changes features and current substantially', thresholdUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/10714/main', thresholdStrength: 'community', routeUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/10714/main',
    summary: 'A 10-mile Ocmulgee day run from the Popes Ferry ramp through Arkwright Shoal to the Amerson Water Park canoe takeout.',
    status: 'Use USGS 02212735 at Dames Ferry. Around 700–3,000 cfs is the conservative planning band; lower water exposes shoals and higher releases make the current and waves materially stronger.',
    seasonNotes: 'Fall is a practical shoulder-season window for the middle Ocmulgee. Check rainfall, release context, water quality, and daylight before committing to the urban finish.',
    difficultyNotes: 'American Whitewater rates the reach Class I–II, with repeated shoals, strainers, and current-management features. The route is moderate because of changing lines and limited bailout choices.',
    hazards: ['dam_release', 'whitewater', 'low_water', 'strainers', 'fast_rise', 'urban_water_quality'],
    safety: ['Check the Dames Ferry gauge and recent release/rain trend before launch; do not infer safety from a single reading.', 'Scout River Mist and Arkwright shoals, keep a conservative line, and wear a PFD continuously.', 'Use the Popes Ferry and Amerson ramps only; confirm park gates and the final takeout before starting.'],
    camping: 'Use Macon lodging or established campgrounds; Amerson Water Park is day-use with no overnight parking.', campingClassification: 'nearby_basecamp',
    shuttle: 'Stage the Amerson vehicle first, then return to Popes Ferry. Allow extra time for urban traffic and park closing hours.', permits: 'Confirm current city/park access, parking, and gate hours at both ramps.',
    accessCaveats: ['American Whitewater notes silt can cover the Popes Ferry ramp after high flow; inspect the carry before launching.', 'Amerson gates close in the evening; do not plan a dusk arrival.'],
    watchFor: ['USGS discharge below 500–700 cfs or above 3,000–4,500 cfs', 'River Mist and Arkwright shoals, submerged rocks, and strainers', 'urban water quality, gate hours, and daylight loss'], evidence: 'American Whitewater documents the exact Popes Ferry-to-Macon reach, Dames Ferry gauge, named Popes Ferry and Amerson access points, and flow-dependent shoal behavior; Georgia Rivers provides current Amerson access details.'
  }),
  buildGeorgiaRoute({
    id: 'ocmulgee-river-amerson-spring-street', name: 'Ocmulgee River', riverId: 'ocmulgee-river', reach: 'Amerson Water Park to Spring Street Landing', region: 'Middle Georgia / Macon', distance: 4, time: 'About 2–4 hours', difficulty: 'easy', risk: 'caution',
    gauge: '02213000', metric: 'discharge_cfs', siteName: 'Ocmulgee River at Macon, GA',
    putIn: { name: 'Amerson Water Park canoe ramp', latitude: 32.882, longitude: -83.658 }, takeOut: { name: 'Spring Street public landing', latitude: 32.846, longitude: -83.628 },
    tooLow: 500, idealMin: 600, idealMax: 3000, tooHigh: 6000,
    thresholdLabel: 'American Whitewater Amerson-to-Spring Street guidance: flatwater segment reported runnable around 642 cfs; use a conservative 600 cfs low-water floor and cancel for rapid rises', thresholdUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/10755/main', thresholdStrength: 'community', routeUrl: 'https://www.americanwhitewater.org/content/River/view/river-detail/10755/main',
    summary: 'A relaxed 4-mile Macon flatwater paddle linking the Amerson Water Park canoe ramp and Spring Street public landing.',
    status: 'Use USGS 02213000 at Macon. Around 600 cfs or higher is the practical low-water target; postpone for rapid rises, storm debris, or unsafe water-quality notices.',
    seasonNotes: 'The short urban reach is well suited to mild fall days. Plan around daylight, park hours, and post-rain water-quality advisories.',
    difficultyNotes: 'American Whitewater describes this as flatwater and family-friendly, but current, strainers, and an urban takeout still require basic moving-water skills.',
    hazards: ['low_water', 'fast_rise', 'strainers', 'urban_water_quality', 'cold_water'],
    safety: ['Check USGS 02213000 and local water-quality notices before launching.', 'Wear a PFD, keep clear of bridge and bank hazards, and maintain a conservative downstream pace.', 'Use the signed Amerson and Spring Street landings only and finish before park closing.'],
    camping: 'Use Macon lodging or established campgrounds; both endpoints are day-use urban parks.', campingClassification: 'nearby_basecamp',
    shuttle: 'Stage the Spring Street vehicle first, then return to Amerson. The short shuttle is straightforward but urban traffic can be slow.', permits: 'Confirm current city park hours, parking, launch access, and any event closures.',
    accessCaveats: ['Amerson Water Park and Spring Street are public landings documented by the route source and Georgia Rivers water-trail material.', 'Do not use informal downtown shoreline exits as substitutes for the Spring Street landing.'],
    watchFor: ['USGS discharge below 600 cfs or rising rapidly', 'strainers, bridge traffic, and urban debris', 'water-quality notices, park gates, and daylight loss'], evidence: 'American Whitewater documents the 4-mile Amerson-to-Spring Street flatwater reach, direct 02213000 Macon gauge, runnable context, and both public canoe landings.'
  }),
  ...npsDocumentedFloatRoutes,
  ...npsChattahoocheeRoutes,
];
