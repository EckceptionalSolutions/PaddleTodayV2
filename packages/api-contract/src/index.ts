export type ScoreRating = 'Strong' | 'Good' | 'Fair' | 'No-go';
export type ConfidenceLabel = 'Low' | 'Medium' | 'High';
export type LiveDataState = 'live' | 'stale' | 'unavailable';
export type LiveDataOverall = 'live' | 'degraded' | 'offline';
export type GaugeUnit = 'cfs' | 'ft';
export type RiverAlertThreshold = 'good' | 'strong';
export type RiverAlertState = 'below_threshold' | 'at_or_above_threshold';
export type GaugeBand =
  | 'ideal'
  | 'low-shoulder'
  | 'high-shoulder'
  | 'minimum-met'
  | 'too-low'
  | 'too-high'
  | 'unknown'
  | 'unavailable';
export type ScoreImpact = 'positive' | 'neutral' | 'negative' | 'warning';
export type ChecklistStatus = 'go' | 'watch' | 'skip';
export type OutlookAvailability = 'available' | 'withheld';
export type SourceTone = 'usgs' | 'official' | 'mixed' | 'community' | 'derived' | 'minimum';

export interface RiverAccessPoint {
  id?: string;
  name: string;
  latitude?: number;
  longitude?: number;
}

export interface ApprovedCommunityPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  takenLabel?: string;
  approvedAt: string;
  sourceSubmissionId: string;
}

export interface ApprovedTripReport {
  id: string;
  approvedAt: string;
  sourceSubmissionId: string;
  contributorName: string;
  tripDate: string;
  sentiment: 'great' | 'good' | 'mixed' | 'rough' | string;
  report: string;
  notes: string;
  photos?: ApprovedCommunityPhoto[];
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
  trend: 'rising' | 'steady' | 'falling' | 'unknown';
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

export interface HourlyWeatherPoint {
  time: string;
  label: string;
  temperatureF: number | null;
  windMph: number | null;
  windGustMph: number | null;
  precipProbability: number | null;
  precipitationIn: number | null;
  weatherCode: number | null;
  conditionLabel: string | null;
}

export interface WeatherSnapshot {
  observedAt: string | null;
  temperatureF: number | null;
  windMph: number | null;
  gustMph: number | null;
  currentPrecipitationIn: number | null;
  next12hPrecipProbabilityMax: number | null;
  next12hPrecipitationIn: number | null;
  next12hPrecipStartsInHours: number | null;
  next12hWindMphMax: number | null;
  next12hStormRisk: boolean;
  weatherCode: number | null;
  conditionLabel: string | null;
  todayHourly: HourlyWeatherPoint[];
  tomorrow: ForecastWindow | null;
  weekend: ForecastWindow | null;
  recentRain24hIn: number | null;
  recentRain72hIn: number | null;
  precipitationProbabilityNow: number | null;
  rainTimingLabel: 'None' | 'Later today' | 'Next few hours' | 'Imminent';
  weatherSource: string;
  rainfallSource: string | null;
  waterTempSource: string | null;
}

export interface ScoreBreakdown {
  riverQuality: number;
  windAdjustment: number;
  temperatureAdjustment: number;
  rainAdjustment: number;
  comfortAdjustment: number;
  rawTripScore: number;
  finalScore: number;
  capReasons: string[];
  riverQualityExplanation: string;
  windExplanation: string;
  temperatureExplanation: string;
  rainExplanation: string;
  comfortExplanation: string;
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
  level: 'high' | 'medium' | 'low';
  reasons: string[];
  warnings: string[];
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

export interface RiverSummaryApiItem {
  river: {
    riverId?: string;
    slug: string;
    name: string;
    reach: string;
    state: string;
    region: string;
    latitude: number;
    longitude: number;
    distanceLabel: string;
    estimatedPaddleTime: string;
    difficulty: 'easy' | 'moderate' | 'hard';
    putIn?: RiverAccessPoint;
    takeOut?: RiverAccessPoint;
  };
  sources: Array<{
    label: string;
    tone: SourceTone;
  }>;
  score: number;
  rating: ScoreRating;
  gaugeBandLabel: string;
  explanation: string;
  confidence: {
    score: number;
    label: ConfidenceLabel;
  };
  liveData: {
    overall: LiveDataOverall;
    summary: string;
    gaugeState: LiveDataState;
    gaugeDetail: string;
    weatherState: LiveDataState;
    weatherDetail: string;
  };
  summary: {
    cardText: string;
    shortExplanation: string;
    rawSignalLine: string;
    gaugeNow: string;
    confidenceText: string;
    freshnessText: string;
    primaryFactor: string;
    secondaryFactor: string;
  };
  scoreBreakdown?: ScoreBreakdown;
  generatedAt: string;
}

export interface WeekendSummaryApiItem {
  river: {
    riverId?: string;
    slug: string;
    name: string;
    reach: string;
    state: string;
    region: string;
    latitude: number;
    longitude: number;
    distanceLabel: string;
    estimatedPaddleTime: string;
    difficulty: 'easy' | 'moderate' | 'hard';
  };
  current: {
    score: number;
    rating: ScoreRating;
    gaugeBandLabel: string;
  };
  weekend: {
    label: string;
    score: number;
    rating: ScoreRating;
    confidence: ConfidenceLabel;
    explanation: string;
    summary: string;
    signalLine: string;
  };
  liveData: {
    overall: LiveDataOverall;
    summary: string;
    gaugeState: LiveDataState;
    gaugeDetail: string;
    weatherState: LiveDataState;
    weatherDetail: string;
  };
  generatedAt: string;
}

export interface RiverDetailApiResult {
  river: {
    riverId?: string;
    slug: string;
    name: string;
    reach: string;
    state: string;
    region: string;
    latitude: number;
    longitude: number;
    distanceLabel: string;
    estimatedPaddleTime: string;
    gaugeSource: {
      unit: GaugeUnit;
    };
    profile: {
      thresholdModel: 'two-sided' | 'minimum-only';
      thresholdSourceStrength: 'official' | 'mixed' | 'community' | 'derived';
      idealMin?: number;
      idealMax?: number;
      tooLow?: number;
      tooHigh?: number;
      difficulty: 'easy' | 'moderate' | 'hard';
    };
    putIn?: RiverAccessPoint;
    takeOut?: RiverAccessPoint;
  };
  score: number;
  rating: ScoreRating;
  gaugeBand: GaugeBand;
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

export interface RiverGroupApiResult {
  group: {
    riverId: string;
    name: string;
    routeCount: number;
    stateSummary: string;
    regionSummary: string;
  };
  routes: RiverDetailApiResult[];
}

export interface RiverHistorySnapshot {
  slug: string;
  capturedAt: string;
  localDate: string;
  localHour: string;
  score: number;
  rating: ScoreRating;
  riverQuality: number;
  windAdjustment: number;
  temperatureAdjustment: number;
  rainAdjustment: number;
  comfortAdjustment: number;
  gaugeBandLabel: string;
  gaugeNow: string | null;
  temperatureF: number | null;
  windMph: number | null;
  rainChance: number | null;
}

export interface RiverHistoryDaySummary {
  date: string;
  avgScore: number;
  minScore: number;
  maxScore: number;
  latestScore: number;
  latestRating: ScoreRating;
  sampleCount: number;
  morningScore: number | null;
  afternoonScore: number | null;
}

export interface RiverHistoryApiResult {
  river: {
    slug: string;
    name: string;
    reach: string;
  };
  latestSnapshotAt: string | null;
  days: RiverHistoryDaySummary[];
  todayHourly: RiverHistorySnapshot[];
}

export interface RiverSummaryResponse {
  requestId: string;
  generatedAt: string;
  riverCount: number;
  rivers: RiverSummaryApiItem[];
}

export interface WeekendSummaryResponse {
  requestId: string;
  generatedAt: string;
  label: string;
  riverCount: number;
  withheldCount: number;
  rivers: WeekendSummaryApiItem[];
}

export interface RiverDetailResponse {
  requestId: string;
  generatedAt: string;
  result: RiverDetailApiResult;
}

export interface RiverGroupResponse {
  requestId: string;
  generatedAt: string;
  result: RiverGroupApiResult;
}

export interface RiverHistoryResponse {
  requestId: string;
  generatedAt: string;
  result: RiverHistoryApiResult;
}

export interface ApiErrorResponse {
  requestId?: string;
  error: string;
  message?: string;
}

export interface RouteCommunityResponse {
  requestId: string;
  riverSlug: string;
  photos: ApprovedCommunityPhoto[];
  reports: ApprovedTripReport[];
}

export interface CreateRiverAlertRequest {
  email: string;
  riverSlug: string;
  threshold: RiverAlertThreshold;
  company?: string;
}

export interface CreateRiverAlertResponse {
  requestId: string;
  ok: true;
  duplicate: boolean;
  reactivated: boolean;
  alert: {
    id: string;
    threshold: RiverAlertThreshold;
    riverSlug: string;
    lastState: RiverAlertState;
  };
}
