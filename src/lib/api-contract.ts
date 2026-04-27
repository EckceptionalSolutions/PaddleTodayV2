import type {
  RiverScoreResult,
  ForecastWindow,
} from './types';
import type { RiverHistoryResult } from './history';
import type {
  RiverDetailApiResult,
  RiverGroupApiResult,
  RiverHistoryApiResult,
  RiverSummaryApiItem,
  WeekendSummaryApiItem,
} from '@paddletoday/api-contract';
import { gaugeDisplayForSource, thresholdAdapterForSource } from './source-adapters';
export type {
  RiverDetailApiResult,
  RiverGroupApiResult,
  RiverHistoryApiResult,
  RiverSummaryApiItem,
  WeekendSummaryApiItem,
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
      estimatedPaddleTime: result.river.logistics?.estimatedPaddleTime ?? '',
      difficulty: result.river.profile.difficulty,
      putIn: result.river.putIn,
      takeOut: result.river.takeOut,
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
    scoreBreakdown: result.scoreBreakdown,
    generatedAt: result.generatedAt,
  };
}

export function serializeWeekendSummaryResult(result: RiverScoreResult): WeekendSummaryApiItem | null {
  const weekend = result.outlooks.find((outlook) => outlook.id === 'weekend');
  if (!weekend || weekend.availability !== 'available' || weekend.score == null || weekend.rating == null || !weekend.confidence) {
    return null;
  }

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
      estimatedPaddleTime: result.river.logistics?.estimatedPaddleTime ?? '',
      difficulty: result.river.profile.difficulty,
    },
    current: {
      score: result.score,
      rating: result.rating,
      gaugeBandLabel: result.gaugeBandLabel,
    },
    weekend: {
      label: weekend.label,
      score: weekend.score,
      rating: weekend.rating,
      confidence: weekend.confidence,
      explanation: weekend.explanation,
      summary: weekendSummaryText(result, weekend.rating),
      signalLine: weekendSignalLine(result),
    },
    liveData: {
      overall: result.liveData.overall,
      summary: result.liveData.summary,
      gaugeState: result.liveData.gauge.state,
      gaugeDetail: result.liveData.gauge.detail,
      weatherState: result.liveData.weather.state,
      weatherDetail: result.liveData.weather.detail,
    },
    generatedAt: result.generatedAt,
  };
}

function summarySourceBadges(result: RiverScoreResult): RiverSummaryApiItem['sources'] {
  const thresholdAdapter = thresholdAdapterForSource(result.river.profile.thresholdSource);
  const badges: RiverSummaryApiItem['sources'] = [
    gaugeProviderBadge(result),
    {
      label: thresholdBadgeLabel(result),
      tone: thresholdAdapter?.sourceBadgeTone ?? result.river.profile.thresholdSourceStrength,
    },
  ];

  if (result.river.profile.thresholdModel === 'minimum-only') {
    badges.push({ label: 'Low floor', tone: 'minimum' });
  }

  return badges;
}

function gaugeProviderBadge(result: RiverScoreResult): RiverSummaryApiItem['sources'][number] {
  const display = gaugeDisplayForSource(result.river.gaugeSource);
  return {
    label: display.shortLabel,
    tone: result.river.gaugeSource.provider === 'usgs' ? 'usgs' : 'official',
  };
}

function thresholdBadgeLabel(result: RiverScoreResult): string {
  const adapter = thresholdAdapterForSource(result.river.profile.thresholdSource);
  if (adapter) {
    return adapter.shortLabel;
  }

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
      estimatedPaddleTime: result.river.logistics?.estimatedPaddleTime ?? '',
      gaugeSource: {
        provider: result.river.gaugeSource.provider,
        unit: result.river.gaugeSource.unit,
        detailUrl: result.river.gaugeSource.detailUrl,
        hydrographUrl: result.river.gaugeSource.hydrographUrl,
        display: gaugeDisplayForSource(result.river.gaugeSource),
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

function weekendSummaryText(result: RiverScoreResult, rating: WeekendSummaryApiItem['weekend']['rating']): string {
  const weekendWindow = result.weather?.weekend;
  const weatherRisk = weekendWeatherRisk(weekendWindow);
  const favorableTrend =
    (result.gauge?.trend === 'rising' && ['too-low', 'low-shoulder', 'minimum-met'].includes(result.gaugeBand)) ||
    (result.gauge?.trend === 'falling' && ['too-high', 'high-shoulder'].includes(result.gaugeBand));
  const poorFlow = result.gaugeBand === 'too-low' || result.gaugeBand === 'too-high';

  if (rating === 'Strong') {
    if (favorableTrend) {
      return 'Flow trend and forecast both line up well for the weekend.';
    }
    if (!weatherRisk) {
      return 'Current river shape and forecast both line up well.';
    }
    return 'River shape is strong enough, but keep an eye on the forecast.';
  }

  if (rating === 'Good') {
    if (favorableTrend) {
      return 'Flow could improve by the weekend if the trend holds.';
    }
    if (weatherRisk) {
      return 'River shape is workable, but forecast risk still matters.';
    }
    return 'Worth keeping on the shortlist if the forecast holds.';
  }

  if (rating === 'Fair') {
    if (poorFlow) {
      return 'Needs more gauge movement before this becomes a cleaner weekend call.';
    }
    if (weatherRisk) {
      return 'Paddleable with tradeoffs, but weather could still spoil this weekend call.';
    }
    return 'Paddleable with tradeoffs, but this still looks shaky for the weekend.';
  }

  if (poorFlow) {
    return 'Flow still looks out of range for a confident weekend call.';
  }
  if (weatherRisk) {
    return 'Forecast risk is too high for a strong weekend recommendation.';
  }
  return 'Not shaping up as a strong weekend bet yet.';
}

function weekendSignalLine(result: RiverScoreResult): string {
  const weekend = result.weather?.weekend;
  const parts = [`Gauge: ${gaugeValueText(result)}`];

  if (typeof weekend?.precipProbabilityMax === 'number') {
    parts.push(`Weekend rain: ${Math.round(weekend.precipProbabilityMax)}% max`);
  }

  if (typeof weekend?.windMphMax === 'number') {
    parts.push(`Wind: up to ${Math.round(weekend.windMphMax)} mph`);
  }

  if (typeof weekend?.temperatureHighF === 'number' || typeof weekend?.temperatureLowF === 'number') {
    const high = typeof weekend.temperatureHighF === 'number' ? Math.round(weekend.temperatureHighF) : null;
    const low = typeof weekend.temperatureLowF === 'number' ? Math.round(weekend.temperatureLowF) : null;
    if (high != null && low != null) {
      parts.push(`Temps: ${low}°-${high}°F`);
    } else if (high != null) {
      parts.push(`High: ${high}°F`);
    } else if (low != null) {
      parts.push(`Low: ${low}°F`);
    }
  }

  return parts.join(' • ');
}

function weekendWeatherRisk(window: ForecastWindow | null | undefined): boolean {
  return Boolean(
    window &&
      (window.stormRisk ||
        (window.precipProbabilityMax ?? 0) >= 60 ||
        (window.windMphMax ?? 0) >= 18)
  );
}
