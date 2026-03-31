import type {
  ConfidenceLabel,
  GaugeReading,
  LiveDataOverall,
  RiverAccessPoint,
  RiverOutlook,
  RiverScoreResult,
  ScoreFactor,
  ScoreRating,
  WeatherSnapshot,
} from './types';

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
  };
  sources: Array<{
    label: string;
    tone: 'usgs' | 'official' | 'mixed' | 'community' | 'derived' | 'minimum';
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
    gaugeState: RiverScoreResult['liveData']['gauge']['state'];
    gaugeDetail: string;
    weatherState: RiverScoreResult['liveData']['weather']['state'];
    weatherDetail: string;
  };
  summary: {
    cardText: string;
    gaugeNow: string;
    confidenceText: string;
    freshnessText: string;
    primaryFactor: string;
    secondaryFactor: string;
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
    gaugeSource: {
      unit: RiverScoreResult['river']['gaugeSource']['unit'];
    };
    profile: {
      thresholdModel: RiverScoreResult['river']['profile']['thresholdModel'];
      thresholdSourceStrength: RiverScoreResult['river']['profile']['thresholdSourceStrength'];
      idealMin?: number;
      idealMax?: number;
      tooLow?: number;
      tooHigh?: number;
      difficulty: RiverScoreResult['river']['profile']['difficulty'];
    };
    putIn?: RiverAccessPoint;
    takeOut?: RiverAccessPoint;
  };
  score: number;
  rating: ScoreRating;
  gaugeBand: RiverScoreResult['gaugeBand'];
  gaugeBandLabel: string;
  explanation: string;
  confidence: RiverScoreResult['confidence'];
  liveData: RiverScoreResult['liveData'];
  factors: ScoreFactor[];
  checklist: RiverScoreResult['checklist'];
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

export function serializeSummaryResult(result: RiverScoreResult): RiverSummaryApiItem {
  const thresholdModelFactor = result.factors.find((factor) => factor.id === 'threshold-model');
  const thresholdEvidenceFactor = result.factors.find((factor) => factor.id === 'threshold-quality');
  const difficultyFactor = result.factors.find((factor) => factor.id === 'difficulty');

  return {
    river: {
      riverId: result.river.riverId,
      slug: result.river.slug,
      name: result.river.name,
      reach: result.river.reach,
      state: result.river.state,
      region: result.river.region,
      latitude: result.river.latitude,
      longitude: result.river.longitude,
    },
    sources: summarySourceBadges(result),
    score: result.score,
    rating: result.rating,
    gaugeBandLabel: result.gaugeBandLabel,
    explanation: result.explanation,
    confidence: {
      score: result.confidence.score,
      label: result.confidence.label,
    },
    liveData: {
      overall: result.liveData.overall,
      summary: result.liveData.summary,
      gaugeState: result.liveData.gauge.state,
      gaugeDetail: result.liveData.gauge.detail,
      weatherState: result.liveData.weather.state,
      weatherDetail: result.liveData.weather.detail,
    },
    summary: {
      cardText: compactCardSummary(result),
      gaugeNow: gaugeValueText(result),
      confidenceText: `${result.confidence.label} (${result.confidence.score}/100)`,
      freshnessText: compactFreshnessText(result),
      primaryFactor: thresholdModelFactor?.value ?? thresholdEvidenceFactor?.value ?? 'Evidence unavailable',
      secondaryFactor:
        difficultyFactor?.value === 'Hard'
          ? 'Hard difficulty'
          : thresholdEvidenceFactor?.value ?? 'Evidence unavailable',
    },
    generatedAt: result.generatedAt,
  };
}

function summarySourceBadges(result: RiverScoreResult): RiverSummaryApiItem['sources'] {
  const badges: RiverSummaryApiItem['sources'] = [
    { label: 'USGS', tone: 'usgs' },
    {
      label: thresholdBadgeLabel(result),
      tone: result.river.profile.thresholdSourceStrength,
    },
  ];

  if (result.river.profile.thresholdModel === 'minimum-only') {
    badges.push({ label: 'Low floor', tone: 'minimum' });
  }

  return badges;
}

function thresholdBadgeLabel(result: RiverScoreResult): string {
  if (result.river.profile.thresholdSourceStrength === 'official') {
    return 'Official';
  }

  if (result.river.profile.thresholdSourceStrength === 'mixed') {
    return 'Mixed';
  }

  if (result.river.profile.thresholdModel === 'minimum-only') {
    return 'Minimum';
  }

  return 'Community';
}

export function serializeDetailResult(result: RiverScoreResult): RiverDetailApiResult {
  return {
    river: {
      riverId: result.river.riverId,
      slug: result.river.slug,
      name: result.river.name,
      reach: result.river.reach,
      state: result.river.state,
      region: result.river.region,
      gaugeSource: {
        unit: result.river.gaugeSource.unit,
      },
      profile: {
        thresholdModel: result.river.profile.thresholdModel,
        thresholdSourceStrength: result.river.profile.thresholdSourceStrength,
        idealMin: result.river.profile.idealMin,
        idealMax: result.river.profile.idealMax,
        tooLow: result.river.profile.tooLow,
        tooHigh: result.river.profile.tooHigh,
        difficulty: result.river.profile.difficulty,
      },
      putIn: result.river.putIn,
      takeOut: result.river.takeOut,
    },
    score: result.score,
    rating: result.rating,
    gaugeBand: result.gaugeBand,
    gaugeBandLabel: result.gaugeBandLabel,
    explanation: result.explanation,
    confidence: result.confidence,
    liveData: result.liveData,
    factors: result.factors,
    checklist: result.checklist,
    outlooks: result.outlooks,
    gauge: result.gauge,
    weather: result.weather,
    generatedAt: result.generatedAt,
  };
}

export function serializeRiverGroupResult(args: {
  riverId: string;
  routes: RiverScoreResult[];
}): RiverGroupApiResult {
  const first = args.routes[0]?.river;
  const states = [...new Set(args.routes.map((result) => result.river.state))].sort();
  const regions = [...new Set(args.routes.map((result) => result.river.region))].sort();

  return {
    group: {
      riverId: args.riverId,
      name: first?.name ?? args.riverId,
      routeCount: args.routes.length,
      stateSummary: states.join(', '),
      regionSummary: regions.join(', '),
    },
    routes: args.routes.map(serializeDetailResult),
  };
}

function compactCardSummary(result: RiverScoreResult): string {
  const trendFactor = result.factors.find((factor) => factor.id === 'trend');
  const weatherFactor = result.factors.find((factor) => factor.id === 'weather');
  return `${result.gaugeBandLabel}. ${trendFactor?.value ?? 'Trend unavailable'}. ${weatherFactor?.value ?? 'Weather unavailable'}.`;
}

function decisionLabel(rating: ScoreRating): string {
  if (rating === 'Strong' || rating === 'Good') return 'Paddle today';
  if (rating === 'Borderline') return 'Maybe today';
  return 'Skip today';
}

function gaugeValueText(result: RiverScoreResult): string {
  if (!result.gauge) {
    return 'Unavailable';
  }

  const value =
    result.gauge.unit === 'ft'
      ? result.gauge.current.toFixed(2).replace(/\.00$/, '')
      : Math.round(result.gauge.current).toLocaleString('en-US');

  return `${value} ${result.gauge.unit}`;
}

function compactFreshnessText(result: RiverScoreResult): string {
  if (result.liveData.overall === 'live') {
    return result.liveData.gauge.detail.replace('Latest gauge reading is ', 'Gauge ').replace(/\.$/, '.');
  }

  const gaugeState =
    result.liveData.gauge.state === 'live'
      ? 'Gauge live'
      : result.liveData.gauge.state === 'stale'
        ? 'Gauge stale'
        : 'Gauge offline';
  const weatherState =
    result.liveData.weather.state === 'live'
      ? 'Weather live'
      : result.liveData.weather.state === 'stale'
        ? 'Weather stale'
        : 'Weather offline';

  return `${gaugeState}. ${weatherState}.`;
}
