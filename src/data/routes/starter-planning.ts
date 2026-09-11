import type { River, RiverAccessPoint, RiverTripLogistics, RouteSafetyProfile, SourceLink } from '../../lib/types';

export interface StarterPlanningSpec {
  id: string;
  name: string;
  riverId: string;
  state: string;
  region: string;
  putIn: RiverAccessPoint & { latitude: number; longitude: number };
  takeOut: RiverAccessPoint & { latitude: number; longitude: number };
  miles: number;
  summary: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  difficultyNotes: string;
  seasonMonths: number[];
  seasonNotes: string;
  gauge: River['gaugeSource'];
  conditionsNote: string;
  hazards: RouteSafetyProfile['hazards'];
  safetyNotes: string[];
  logistics: Omit<RiverTripLogistics, 'distanceLabel' | 'summary'>;
  guide: SourceLink;
  sources: SourceLink[];
  coordinateNote: string;
  coordinateSourceUrl?: string;
  reviewDate: string;
}

/** Explicit reviewed planning publication; no fabricated scoring thresholds. */
export function buildStarterPlanningRoute(spec: StarterPlanningSpec): River {
  return {
    id: spec.id, slug: spec.id, name: spec.name, riverId: spec.riverId,
    state: spec.state, region: spec.region,
    reach: `${spec.putIn.name} to ${spec.takeOut.name}`,
    latitude: spec.putIn.latitude, longitude: spec.putIn.longitude,
    summary: spec.summary,
    statusText: `Planning only; no live route score. ${spec.conditionsNote}`,
    routeType: 'recreational', scoreEligibility: 'planning',
    ...(spec.gauge.kind === 'proxy' ? { scoreEligibilityReason: 'proxy_gauge' as const } : {}),
    gaugeSource: spec.gauge,
    profile: {
      thresholdModel: 'minimum-only', thresholdSource: spec.guide, thresholdSourceStrength: 'official',
      rainfallSensitivity: 'high', windSensitivity: 1,
      seasonMonths: spec.seasonMonths, seasonNotes: spec.seasonNotes,
      difficulty: spec.difficulty, difficultyNotes: spec.difficultyNotes,
      confidenceNotes: spec.conditionsNote,
    },
    safetyProfile: { riskLevel: 'caution', reviewStatus: 'reviewed', hazards: spec.hazards, safetyNotes: spec.safetyNotes },
    putIn: spec.putIn, takeOut: spec.takeOut,
    accessPoints: [
      { ...spec.putIn, id: `${spec.id}-put-in`, mileFromStart: 0, segmentKind: 'transition', note: 'Use the named managed launch; check posted access conditions.' },
      { ...spec.takeOut, id: `${spec.id}-take-out`, mileFromStart: spec.miles, segmentKind: 'transition', note: 'Stage the shuttle and identify the landing before departure.' },
    ],
    logistics: { ...spec.logistics, distanceLabel: `About ${spec.miles} river miles`, summary: spec.summary },
    evidenceNotes: [
      { label: 'Route and distance', value: `${spec.miles} miles`, note: 'Distance between the named access points in the linked manager guide.', sourceUrl: spec.guide.url },
      { label: 'Launch coordinate provenance', value: 'Mapped launch and landing', note: spec.coordinateNote, sourceUrl: spec.coordinateSourceUrl ?? spec.guide.url },
      { label: 'Conditions posture', value: 'Planning only', note: spec.conditionsNote, sourceUrl: spec.gauge.detailUrl },
      { label: 'Access and safety review', value: spec.reviewDate, note: 'Guide and current manager pages checked. Verify notices again before travel; a past review is not a statement of current paddling suitability.' },
      { label: 'Camping', value: spec.logistics.campingClassification ?? 'unknown', note: spec.logistics.camping },
    ],
    sourceLinks: [spec.guide, ...spec.sources, { label: `USGS ${spec.gauge.siteId} station`, url: spec.gauge.detailUrl!, provider: 'usgs' }],
  };
}
