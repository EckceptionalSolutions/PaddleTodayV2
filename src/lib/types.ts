export type GaugeMetric = 'discharge_cfs' | 'gage_height_ft';
export type GaugeUnit = 'cfs' | 'ft';
export type GaugeKind = 'direct' | 'proxy';
export type SourceStrength = 'official' | 'mixed' | 'community' | 'derived';
export type RainfallSensitivity = 'low' | 'medium' | 'high';
export type ThresholdModel = 'two-sided' | 'minimum-only';
export type TrendDirection = 'rising' | 'steady' | 'falling' | 'unknown';
export type ScoreImpact = 'positive' | 'neutral' | 'negative' | 'warning';
export type ScoreRating = 'Strong' | 'Good' | 'Borderline' | 'No-go';
export type ConfidenceLabel = 'Low' | 'Medium' | 'High';
export type ChecklistStatus = 'go' | 'watch' | 'skip';
export type OutlookAvailability = 'available' | 'withheld';
export type LiveDataState = 'live' | 'stale' | 'unavailable';
export type LiveDataOverall = 'live' | 'degraded' | 'offline';
export type GaugeBand =
  | 'ideal'
  | 'low-shoulder'
  | 'high-shoulder'
  | 'minimum-met'
  | 'too-low'
  | 'too-high'
  | 'unknown';

export interface SourceLink {
  label: string;
  url: string;
}

export interface RiverGaugeSource {
  id: string;
  provider: 'usgs';
  siteId: string;
  metric: GaugeMetric;
  unit: GaugeUnit;
  kind: GaugeKind;
  siteName: string;
}

export interface RiverEvidenceNote {
  label: string;
  value: string;
  note?: string;
  sourceUrl?: string;
}

export interface RiverScoringProfile {
  thresholdModel: ThresholdModel;
  idealMin?: number;
  idealMax?: number;
  tooLow?: number;
  tooHigh?: number;
  thresholdSource: SourceLink;
  thresholdSourceStrength: SourceStrength;
  rainfallSensitivity: RainfallSensitivity;
  seasonMonths: number[];
  seasonNotes: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  difficultyNotes: string;
  confidenceNotes: string;
}

export interface RiverAccessPoint {
  id?: string;
  name: string;
  latitude?: number;
  longitude?: number;
}

export interface RiverRouteAccessPoint extends RiverAccessPoint {
  id: string;
  mileFromStart: number;
  segmentKind: 'lake' | 'transition' | 'creek';
  note?: string;
}

export interface RiverTripLogistics {
  distanceLabel: string;
  shuttle: string;
  permits: string;
  camping: string;
  summary: string;
  accessCaveats: string[];
  watchFor: string[];
}

export interface RiverTripDetails {
  putIn: RiverAccessPoint;
  takeOut: RiverAccessPoint;
  logistics: RiverTripLogistics;
  accessPoints?: RiverRouteAccessPoint[];
}

export interface River {
  id: string;
  riverId?: string;
  slug: string;
  name: string;
  reach: string;
  state: string;
  region: string;
  summary: string;
  statusText: string;
  latitude: number;
  longitude: number;
  gaugeSource: RiverGaugeSource;
  profile: RiverScoringProfile;
  putIn?: RiverAccessPoint;
  takeOut?: RiverAccessPoint;
  logistics?: RiverTripLogistics;
  accessPoints?: RiverRouteAccessPoint[];
  evidenceNotes: RiverEvidenceNote[];
  sourceLinks: SourceLink[];
}

export interface GaugeSample {
  observedAt: string;
  value: number;
}

export interface GaugeReading {
  sourceId: string;
  observedAt: string;
  current: number;
  unit: GaugeUnit;
  trend: TrendDirection;
  delta24h: number | null;
  changePercent24h: number | null;
  recentSamples: GaugeSample[];
}

export interface ForecastWindow {
  label: string;
  startDate: string | null;
  endDate: string | null;
  precipProbabilityMax: number | null;
  precipitationIn: number | null;
  windMphMax: number | null;
  stormRisk: boolean;
  weatherCode: number | null;
  temperatureHighF: number | null;
  temperatureLowF: number | null;
}

export interface WeatherSnapshot {
  observedAt: string | null;
  temperatureF: number | null;
  windMph: number | null;
  gustMph: number | null;
  currentPrecipitationIn: number | null;
  next12hPrecipProbabilityMax: number | null;
  next12hPrecipitationIn: number | null;
  next12hWindMphMax: number | null;
  next12hStormRisk: boolean;
  weatherCode: number | null;
  tomorrow: ForecastWindow | null;
  weekend: ForecastWindow | null;
}

export interface ScoreFactor {
  id: string;
  label: string;
  value: string;
  detail: string;
  impact: ScoreImpact;
}

export interface ConfidenceResult {
  score: number;
  label: ConfidenceLabel;
  rationale: string[];
}

export interface DecisionChecklistItem {
  status: ChecklistStatus;
  label: string;
  detail: string;
}

export interface RiverOutlook {
  id: 'tomorrow' | 'weekend';
  label: string;
  availability: OutlookAvailability;
  score: number | null;
  rating: ScoreRating | null;
  confidence: ConfidenceLabel | null;
  explanation: string;
}

export interface DataFreshness {
  state: LiveDataState;
  ageMinutes: number | null;
  detail: string;
}

export interface LiveDataStatus {
  overall: LiveDataOverall;
  summary: string;
  gauge: DataFreshness;
  weather: DataFreshness;
}

export interface RiverScoreResult {
  river: River;
  score: number;
  rating: ScoreRating;
  gaugeBand: GaugeBand | 'unavailable';
  gaugeBandLabel: string;
  explanation: string;
  confidence: ConfidenceResult;
  liveData: LiveDataStatus;
  factors: ScoreFactor[];
  checklist: DecisionChecklistItem[];
  outlooks: RiverOutlook[];
  gauge: GaugeReading | null;
  weather: WeatherSnapshot | null;
  generatedAt: string;
}
