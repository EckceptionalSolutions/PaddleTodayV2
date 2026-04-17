import type {
  ConfidenceResult,
  DecisionChecklistItem,
  GaugeReading,
  GaugeSample,
  GaugeUnit,
  LiveDataStatus,
  RiverAccessPoint,
  RiverOutlook,
  ScoreBreakdown,
  ScoreFactor,
  ScoreImpact,
  ScoreRating,
  WeatherSnapshot,
} from '@paddletoday/api-contract';
export type {
  ApiErrorResponse,
  ChecklistStatus,
  ConfidenceLabel,
  ConfidenceResult,
  DataFreshness,
  DecisionChecklistItem,
  ForecastWindow,
  GaugeReading,
  GaugeSample,
  GaugeUnit,
  HourlyWeatherPoint,
  LiveDataOverall,
  LiveDataState,
  LiveDataStatus,
  OutlookAvailability,
  RiverAccessPoint,
  RiverHistoryApiResult,
  RiverHistoryDaySummary,
  RiverHistoryResponse,
  RiverHistorySnapshot,
  RiverOutlook,
  ScoreBreakdown,
  ScoreFactor,
  ScoreImpact,
  ScoreRating,
  WeatherSnapshot,
} from '@paddletoday/api-contract';

export type GaugeMetric = 'discharge_cfs' | 'gage_height_ft';
export type GaugeBand =
  | 'ideal'
  | 'low-shoulder'
  | 'high-shoulder'
  | 'minimum-met'
  | 'too-low'
  | 'too-high'
  | 'unknown';
export type GaugeKind = 'direct' | 'proxy';
export type SourceStrength = 'official' | 'mixed' | 'community' | 'derived';
export type RainfallSensitivity = 'low' | 'medium' | 'high';
export type ThresholdModel = 'two-sided' | 'minimum-only';
export type TrendDirection = 'rising' | 'steady' | 'falling' | 'unknown';

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
  windSensitivity?: number;
  rainSensitivity?: number;
  tempSensitivity?: number;
  seasonMonths: number[];
  seasonNotes: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  difficultyNotes: string;
  confidenceNotes: string;
}

export interface RiverRouteAccessPoint extends RiverAccessPoint {
  id: string;
  mileFromStart: number;
  segmentKind: 'lake' | 'transition' | 'creek';
  note?: string;
}

export interface RiverTripLogistics {
  distanceLabel: string;
  estimatedPaddleTime: string;
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

export interface GaugeReading {
  sourceId: string;
  observedAt: string;
  current: number;
  unit: GaugeUnit;
  trend: TrendDirection;
  delta24h: number | null;
  changePercent24h: number | null;
  recentSamples: GaugeSample[];
  gaugeHeightNow: number | null;
  dischargeNow: number | null;
  waterTempF: number | null;
  waterTempObservedAt: string | null;
  gaugeSource: string;
  waterTempSource: string | null;
}

export interface RiverScoreResult {
  river: River;
  riverQuality: number;
  score: number;
  rating: ScoreRating;
  gaugeBand: GaugeBand | 'unavailable';
  gaugeBandLabel: string;
  explanation: string;
  scoreBreakdown: ScoreBreakdown;
  confidence: ConfidenceResult;
  liveData: LiveDataStatus;
  factors: ScoreFactor[];
  checklist: DecisionChecklistItem[];
  outlooks: RiverOutlook[];
  gauge: GaugeReading | null;
  weather: WeatherSnapshot | null;
  generatedAt: string;
}
