import type {
  RiverScoreResult,
} from './types';
import type { RiverHistoryResult } from './history';
import type {
  RiverDetailApiResult,
  RiverGroupApiResult,
  RiverHistoryApiResult,
  RiverSummaryApiItem,
} from '@paddletoday/api-contract';
export type {
  RiverDetailApiResult,
  RiverGroupApiResult,
  RiverHistoryApiResult,
  RiverSummaryApiItem,
} from '@paddletoday/api-contract';

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
      distanceLabel: result.river.logistics?.distanceLabel ?? '',
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
      shortExplanation: shortCardExplanation(result),
      rawSignalLine: rawSignalLine(result),
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
      latitude: result.river.latitude,
      longitude: result.river.longitude,
      distanceLabel: result.river.logistics?.distanceLabel ?? '',
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
    scoreBreakdown: result.scoreBreakdown,
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

export function serializeRiverHistoryResult(args: {
  river: {
    slug: string;
    name: string;
    reach: string;
  };
  history: RiverHistoryResult;
}): RiverHistoryApiResult {
  return {
    river: {
      slug: args.river.slug,
      name: args.river.name,
      reach: args.river.reach,
    },
    latestSnapshotAt: args.history.latestSnapshotAt,
    days: args.history.days,
    todayHourly: args.history.todayHourly,
  };
}

function compactCardSummary(result: RiverScoreResult): string {
  const trendFactor = result.factors.find((factor) => factor.id === 'trend');
  const weatherFactor = result.factors.find((factor) => factor.id === 'weather');
  return `${result.gaugeBandLabel}. ${trendFactor?.value ?? 'Trend unavailable'}. ${weatherFactor?.value ?? 'Weather unavailable'}.`;
}

function shortCardExplanation(result: RiverScoreResult): string {
  return `${levelExplanation(result)} • ${trendExplanation(result)} • ${weatherExplanation(result)}`;
}

function rawSignalLine(result: RiverScoreResult): string {
  const parts = [gaugeSignal(result), windSignal(result), temperatureSignal(result)].filter(Boolean);
  return parts.join(' • ');
}

function levelExplanation(result: RiverScoreResult): string {
  switch (result.gaugeBand) {
    case 'ideal':
      return 'Perfect level';
    case 'low-shoulder':
    case 'minimum-met':
      return 'Slightly low';
    case 'too-low':
      return 'Too low';
    case 'high-shoulder':
      return 'High water';
    case 'too-high':
      return 'Too high';
    default:
      return 'Level unclear';
  }
}

function trendExplanation(result: RiverScoreResult): string {
  const trend = result.gauge?.trend ?? 'unknown';
  if (trend === 'steady') return 'Stable';
  if (trend === 'rising') return 'Rising';
  if (trend === 'falling') return 'Falling';
  return 'Trend mixed';
}

function weatherExplanation(result: RiverScoreResult): string {
  const weather = result.weather;
  if (!weather) return 'weather mixed';
  if (coldWeatherDrivenCall(result)) {
    return weather.temperatureF != null && weather.temperatureF <= 35 ? 'very cold' : 'cold';
  }
  if (weather.next12hStormRisk) {
    return 'storm risk';
  }
  if (weather.rainTimingLabel === 'Imminent' || weather.rainTimingLabel === 'Next few hours') {
    return 'rain soon';
  }
  if (weather.rainTimingLabel === 'Later today' || (weather.next12hPrecipProbabilityMax ?? 0) >= 40) {
    return 'rain later';
  }
  if ((weather.gustMph ?? 0) >= 22 || (weather.next12hWindMphMax ?? 0) >= 14) {
    return 'windy';
  }
  if (typeof weather.conditionLabel === 'string' && weather.conditionLabel.trim()) {
    return weather.conditionLabel.trim().toLowerCase();
  }
  return 'mostly dry';
}

function coldWeatherDrivenCall(result: RiverScoreResult): boolean {
  const weather = result.weather;
  const temp = weather?.temperatureF;
  const wind = weather?.next12hWindMphMax ?? weather?.windMph ?? 0;
  const rainChance = weather?.next12hPrecipProbabilityMax ?? 0;

  return (
    typeof temp === 'number' &&
    temp <= 40 &&
    ['ideal', 'minimum-met', 'low-shoulder'].includes(result.gaugeBand) &&
    !weather?.next12hStormRisk &&
    (rainChance < 70 || wind < 20)
  );
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

function gaugeSignal(result: RiverScoreResult): string {
  if (result.gauge) {
    return `Gauge: ${gaugeValueText(result)}`;
  }

  if (result.gaugeBand === 'too-low' || result.gaugeBand === 'low-shoulder' || result.gaugeBand === 'minimum-met') {
    return 'Gauge: Low';
  }

  if (result.gaugeBand === 'too-high' || result.gaugeBand === 'high-shoulder') {
    return 'Gauge: High';
  }

  return 'Gauge: Unavailable';
}

function windSignal(result: RiverScoreResult): string {
  const weather = result.weather;
  if (!weather) return 'Wind: Unknown';

  const wind = weather.windMph ?? weather.next12hWindMphMax;
  if (typeof wind === 'number' && Number.isFinite(wind)) {
    return `Wind: ${Math.round(wind)} mph`;
  }

  return 'Wind: Unknown';
}

function temperatureSignal(result: RiverScoreResult): string {
  const temp = result.weather?.temperatureF;
  if (typeof temp === 'number' && Number.isFinite(temp)) {
    return `Temp: ${Math.round(temp)}°F`;
  }

  return '';
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
