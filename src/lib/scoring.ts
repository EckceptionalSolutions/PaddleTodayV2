import type {
  ChecklistStatus,
  ConfidenceLabel,
  ConfidenceResult,
  DataFreshness,
  DecisionChecklistItem,
  ForecastWindow,
  GaugeBand,
  GaugeReading,
  GaugeUnit,
  LiveDataStatus,
  River,
  RiverOutlook,
  RiverReadinessResult,
  RiverScoreResult,
  ScoreFactor,
  ScoreImpact,
  ScoreRating,
  WeatherSnapshot,
} from './types';
import { buildSourceStrengthViewModel } from '@paddletoday/api-contract';
import { staleMinutesForGaugeProvider } from './source-adapters';

const WEATHER_STALE_MINUTES = 180;
const MINIMUM_ONLY_SCORE_CAP = 74;

interface ScoreLimit {
  limit: number;
  reason: string;
}

export function scoreRiverCondition(args: {
  river: River;
  gauge: GaugeReading | null;
  weather: WeatherSnapshot | null;
  now?: Date;
}): RiverScoreResult {
  const now = args.now ?? new Date();
  const liveData = buildLiveDataStatus({
    river: args.river,
    gauge: args.gauge,
    weather: args.weather,
    now,
  });

  if (!args.gauge) {
    return scoreWithoutGauge({
      river: args.river,
      weather: args.weather,
      liveData,
      now,
    });
  }

  const gaugeAssessment = assessGauge(args.river, args.gauge);
  const trendAssessment = assessTrend(args.river, args.gauge, gaugeAssessment.band);
  const dnrInterpretationAssessment = assessDnrInterpretation(args.river, args.gauge);
  const weatherAssessment = assessWeatherAdjustment(args.river, args.weather);
  const temperatureAssessment = assessTemperatureAdjustment(args.river, args.gauge, args.weather, now);
  const comfortAssessment = assessComfortAdjustment(args.river, args.weather, now);
  const riverQuality = computeRiverQuality(
    args.river,
    gaugeAssessment,
    trendAssessment,
    dnrInterpretationAssessment
  );
  const rawTripScore =
    riverQuality +
    weatherAssessment.points +
    temperatureAssessment.points +
    comfortAssessment.points;
  const safetyScoreLimits = buildSafetyScoreLimits({
    river: args.river,
    gauge: args.gauge,
    liveData,
    dnrInterpretation: dnrInterpretationAssessment.value,
    hasDnrInterpretation: dnrInterpretationAssessment.hasInterpretation,
  });
  const scoreBreakdown = buildScoreBreakdown({
    river: args.river,
    weather: args.weather,
    riverQuality,
    riverQualityExplanation: `${gaugeAssessment.detail} ${trendAssessment.detail} ${dnrInterpretationAssessment.detail}`.trim(),
    windAdjustment: weatherAssessment.windPoints,
    temperatureAdjustment: temperatureAssessment.points,
    rainAdjustment: weatherAssessment.rainPoints,
    comfortAdjustment: comfortAssessment.points,
    windExplanation: weatherAssessment.windDetail,
    temperatureExplanation: temperatureAssessment.detail,
    rainExplanation: weatherAssessment.rainDetail,
    comfortExplanation: comfortAssessment.detail,
    rawTripScore,
    additionalScoreLimits: safetyScoreLimits,
  });
  const score = scoreBreakdown.finalScore;
  const rating = ratingFromScore(score);
  const confidence = computeConfidence({
    river: args.river,
    gauge: args.gauge,
    weather: args.weather,
    liveData,
  });
  const checklist = buildDecisionChecklist({
    river: args.river,
    gauge: args.gauge,
    weather: args.weather,
    gaugeAssessment,
    trendAssessment,
    liveData,
  });
  const readiness = computeReadiness({
    river: args.river,
    gauge: args.gauge,
    gaugeBand: gaugeAssessment.band,
    liveData,
    checklist,
    safetyScoreLimits,
    dnrInterpretation: dnrInterpretationAssessment.value,
    hasDnrInterpretation: dnrInterpretationAssessment.hasInterpretation,
  });
  const outlooks = buildOutlooks({
    river: args.river,
    gauge: args.gauge,
    weather: args.weather,
    confidence,
    liveData,
    currentRiverQuality: riverQuality,
    gaugeBand: gaugeAssessment.band,
    safetyScoreCap: forecastSafetyScoreCap({
      river: args.river,
      gauge: args.gauge,
      dnrInterpretation: dnrInterpretationAssessment.value,
      hasDnrInterpretation: dnrInterpretationAssessment.hasInterpretation,
    }),
  });

  const factors: ScoreFactor[] = [
    {
      id: 'flow-band',
      label: 'Flow band',
      value: gaugeBandLabel(gaugeAssessment.band),
      detail: gaugeAssessment.bandDetail,
      impact: gaugeAssessment.impact,
    },
    {
      id: 'gauge',
      label: 'Gauge now',
      value: `${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}`,
      detail: gaugeAssessment.detail,
      impact: gaugeAssessment.impact,
    },
    {
      id: 'trend',
      label: 'Level trend',
      value: trendLabel(args.gauge),
      detail: trendAssessment.detail,
      impact: trendAssessment.impact,
    },
    ...(dnrInterpretationAssessment.hasInterpretation
      ? [
          {
            id: 'dnr-interpretation',
            label: 'DNR interpretation',
            value: dnrInterpretationAssessment.value,
            detail: dnrInterpretationAssessment.detail,
            impact: dnrInterpretationAssessment.impact,
          } satisfies ScoreFactor,
        ]
      : []),
    {
      id: 'weather',
      label: 'Weather',
      value: weatherLabel(args.weather),
      detail: [weatherAssessment.detail, temperatureAssessment.detail].filter(Boolean).join(' '),
      impact: combinedImpact(weatherAssessment.impact, temperatureAssessment.impact),
    },
    {
      id: 'live-data',
      label: 'Live data',
      value: titleCase(liveData.overall),
      detail: liveData.summary,
      impact:
        liveData.overall === 'live'
          ? 'positive'
          : liveData.overall === 'offline'
            ? 'negative'
            : 'warning',
    },
    {
      id: 'threshold-model',
      label: 'Threshold model',
      value: thresholdModelLabel(args.river.profile.thresholdModel),
      detail: thresholdModelDetail(args.river),
      impact: thresholdModelImpact(args.river.profile.thresholdModel),
    },
    {
      id: 'threshold-quality',
      label: 'Threshold evidence',
      value: sourceStrengthViewModel(args.river).guidanceLabel,
      detail: sourceStrengthViewModel(args.river).detail ?? '',
      impact: sourceStrengthViewModel(args.river).impact,
    },
    {
      id: 'difficulty',
      label: 'Difficulty',
      value: titleCase(args.river.profile.difficulty),
      detail: args.river.profile.difficultyNotes,
      impact: comfortAssessment.difficultyImpact,
    },
    {
      id: 'seasonality',
      label: 'Seasonality',
      value: comfortAssessment.seasonValue,
      detail: comfortAssessment.seasonDetail,
      impact: comfortAssessment.seasonImpact,
    },
  ];

  return {
    river: args.river,
    riverQuality,
    score,
    rating,
    readiness,
    gaugeBand: gaugeAssessment.band,
    gaugeBandLabel: gaugeBandLabel(gaugeAssessment.band),
    explanation: buildExplanation({
      river: args.river,
      rating,
      gauge: args.gauge,
      weather: args.weather,
      gaugeAssessment,
      trendAssessment,
      weatherAssessment,
      temperatureAssessment,
      comfortAssessment,
      confidence,
      liveData,
    }),
    scoreBreakdown,
    confidence,
    liveData,
    factors,
    checklist,
    outlooks,
    gauge: args.gauge,
    weather: args.weather,
    generatedAt: now.toISOString(),
  };
}

function scoreWithoutGauge(args: {
  river: River;
  weather: WeatherSnapshot | null;
  liveData: LiveDataStatus;
  now: Date;
}): RiverScoreResult {
  const weatherAssessment = assessWeatherAdjustment(args.river, args.weather);
  const temperatureAssessment = assessTemperatureAdjustment(args.river, null, args.weather, args.now);
  const comfortAssessment = assessComfortAdjustment(args.river, args.weather, args.now);
  const riverQuality = 30;
  const rawTripScore =
    riverQuality +
    weatherAssessment.points +
    temperatureAssessment.points +
    comfortAssessment.points;
  const scoreBreakdown = buildScoreBreakdown({
    river: args.river,
    weather: args.weather,
    riverQuality,
    riverQualityExplanation: 'River quality is held down because the direct gauge is unavailable.',
    windAdjustment: weatherAssessment.windPoints,
    temperatureAdjustment: temperatureAssessment.points,
    rainAdjustment: weatherAssessment.rainPoints,
    comfortAdjustment: comfortAssessment.points,
    windExplanation: weatherAssessment.windDetail,
    temperatureExplanation: temperatureAssessment.detail,
    rainExplanation: weatherAssessment.rainDetail,
    comfortExplanation: comfortAssessment.detail,
    rawTripScore,
    additionalScoreLimits: [],
  });
  const score = scoreBreakdown.finalScore;
  const confidence = computeConfidence({
    river: args.river,
    gauge: null,
    weather: args.weather,
    liveData: args.liveData,
  });

  return {
    river: args.river,
    riverQuality,
    score,
    rating: ratingFromScore(score),
    readiness: {
      status: 'withheld',
      label: 'Withheld',
      reason: 'A current gauge reading is required before Paddle Today issues launch readiness.',
    },
    gaugeBand: 'unavailable',
    gaugeBandLabel: 'Unavailable',
    explanation: `${args.river.name} cannot be scored confidently right now. ${args.liveData.summary}`,
    scoreBreakdown,
    confidence,
    liveData: args.liveData,
    factors: [
      {
        id: 'gauge',
        label: 'Gauge now',
        value: 'Unavailable',
        detail: 'The direct gauge could not be read, so the product cannot make a strong river-quality decision.',
        impact: 'warning',
      },
      {
        id: 'weather',
        label: 'Weather',
        value: weatherLabel(args.weather),
        detail: [weatherAssessment.detail, temperatureAssessment.detail].filter(Boolean).join(' '),
        impact: weatherAssessment.impact,
      },
      {
        id: 'live-data',
        label: 'Live data',
        value: titleCase(args.liveData.overall),
        detail: args.liveData.summary,
        impact: args.liveData.overall === 'offline' ? 'negative' : 'warning',
      },
      {
        id: 'threshold-model',
        label: 'Threshold model',
        value: thresholdModelLabel(args.river.profile.thresholdModel),
        detail: thresholdModelDetail(args.river),
        impact: thresholdModelImpact(args.river.profile.thresholdModel),
      },
      {
        id: 'threshold-quality',
        label: 'Threshold evidence',
        value: sourceStrengthViewModel(args.river).guidanceLabel,
        detail: sourceStrengthViewModel(args.river).detail ?? '',
        impact: sourceStrengthViewModel(args.river).impact,
      },
      {
        id: 'seasonality',
        label: 'Seasonality',
        value: comfortAssessment.seasonValue,
        detail: comfortAssessment.seasonDetail,
        impact: comfortAssessment.seasonImpact,
      },
    ],
    checklist: [
      {
        status: 'skip',
        label: 'Gauge check',
        detail: 'The direct gauge is unavailable right now, so double-check this river before you drive.',
      },
      {
        status: 'watch',
        label: 'Weather check',
        detail: weatherAssessment.detail,
      },
      {
        status: 'watch',
        label: 'Access check',
        detail: 'Confirm put-in, take-out, and any local launch rules directly from the source links before you drive.',
      },
    ],
    outlooks: buildOfflineOutlooks(),
    gauge: null,
    weather: args.weather,
    generatedAt: args.now.toISOString(),
  };
}

function assessGauge(river: River, gauge: GaugeReading): {
  points: number;
  impact: ScoreImpact;
  detail: string;
  band: GaugeBand;
  bandDetail: string;
} {
  const { thresholdModel, idealMin, idealMax, tooLow, tooHigh } = river.profile;
  const current = gauge.current;

  if (thresholdModel === 'minimum-only') {
    const minimum = typeof tooLow === 'number' ? tooLow : idealMin;
    if (typeof minimum !== 'number') {
      return {
        points: 45,
        impact: 'warning',
        detail: 'The river profile does not have a usable low-water threshold yet, so this score is conservative.',
        band: 'unknown',
        bandDetail: 'Thresholds are incomplete, so the app cannot place this river into a reliable flow band yet.',
      };
    }

    if (current < minimum) {
      const points = clamp(45 - ((minimum - current) / Math.max(Math.abs(minimum), 1)) * 45, 0, 45);
      return {
        points,
        impact: 'negative',
        detail: `Below the known low-water mark of ${formatGauge(minimum, gauge.unit)} ${gauge.unit}. Expect scraping, dragging, or a very thin run.`,
        band: 'too-low',
        bandDetail: 'Below the known low-water mark. This is outside the usual paddling range.',
      };
    }

    const marginAboveMinimum = (current - minimum) / Math.max(minimum, 1);
    const marginBonus = clamp(marginAboveMinimum * 27, 0, 27);

    return {
      points: 45 + marginBonus,
      impact: 'warning',
      detail: `Above the known low-water mark of ${formatGauge(minimum, gauge.unit)} ${gauge.unit}, but there is not enough guidance yet to say what the upper end should be for this reach.`,
      band: 'minimum-met',
      bandDetail: 'Above the low-water mark, but the upper end is still uncertain.',
    };
  }

  if (
    typeof idealMin !== 'number' ||
    typeof idealMax !== 'number' ||
    typeof tooLow !== 'number' ||
    typeof tooHigh !== 'number'
  ) {
    return {
      points: 45,
      impact: 'warning',
      detail: 'The river profile does not have a complete threshold set yet, so this score is conservative.',
      band: 'unknown',
      bandDetail: 'Thresholds are incomplete, so the app cannot place this river into a reliable flow band yet.',
    };
  }

  if (current < tooLow) {
    const collapsedLowShoulder = tooLow === idealMin;
    const lowAnchor = collapsedLowShoulder ? 72 : 30;
    const lowScale = Math.max(
      (idealMax - idealMin) * (collapsedLowShoulder ? 0.25 : 1),
      gauge.unit === 'ft' ? 0.1 : 10,
    );
    const points = clamp(lowAnchor - ((tooLow - current) / lowScale) * lowAnchor, 0, lowAnchor);
    return {
      points,
      impact: 'negative',
      detail: `Below the practical low-water threshold of ${formatGauge(tooLow, gauge.unit)} ${gauge.unit}. Expect scraping or too little water.`,
      band: 'too-low',
      bandDetail: 'Below the hard low threshold. This is outside the workable paddling band.',
    };
  }

  if (current < idealMin) {
    const ratio = (current - tooLow) / Math.max(idealMin - tooLow, 0.01);
    return {
      points: 30 + clamp(ratio, 0, 1) * 42,
      impact: 'warning',
      detail: `Below the preferred range, but still above the hard low mark. It's probably still paddleable, just not in its best band of ${formatGauge(idealMin, gauge.unit)} to ${formatGauge(idealMax, gauge.unit)} ${gauge.unit}.`,
      band: 'low-shoulder',
      bandDetail: 'Low shoulder. Likely paddleable, but still below the preferred target window.',
    };
  }

  if (current <= idealMax) {
    const center = (idealMin + idealMax) / 2;
    const halfWidth = Math.max((idealMax - idealMin) / 2, 0.01);
    const normalizedDistance = clamp(Math.abs(current - center) / halfWidth, 0, 1);
    const points = 84 - normalizedDistance * 12;
    const edgeBias =
      current <= center - halfWidth * 0.55
        ? 'lower edge'
        : current >= center + halfWidth * 0.55
          ? 'upper edge'
          : 'sweet spot';

    return {
      points,
      impact: 'positive',
      detail:
        edgeBias === 'sweet spot'
          ? `Inside the target window of ${formatGauge(idealMin, gauge.unit)} to ${formatGauge(idealMax, gauge.unit)} ${gauge.unit}, right near the middle.`
          : `Inside the target window of ${formatGauge(idealMin, gauge.unit)} to ${formatGauge(idealMax, gauge.unit)} ${gauge.unit}, but sitting closer to the ${edgeBias}.`,
      band: 'ideal',
      bandDetail:
        edgeBias === 'sweet spot'
          ? 'Ideal window, right near the middle.'
          : `Ideal window, but closer to the ${edgeBias}.`,
    };
  }

  if (current <= tooHigh) {
    const ratio = (current - idealMax) / Math.max(tooHigh - idealMax, 0.01);
    return {
      points: 72 - clamp(ratio, 0, 1) * 42,
      impact: 'warning',
      detail: 'Above the preferred window, but still below the hard high threshold. The current is starting to get pushier than the sweet spot.',
      band: 'high-shoulder',
      bandDetail: 'High shoulder. Still below the hard high threshold, but pushier than the preferred band.',
    };
  }

  const collapsedHighShoulder = tooHigh === idealMax;
  const highAnchor = collapsedHighShoulder ? 72 : 30;
  const highScale = Math.max(
    (idealMax - idealMin) * (collapsedHighShoulder ? 0.25 : 1),
    gauge.unit === 'ft' ? 0.1 : 10,
  );
  const points = clamp(highAnchor - ((current - tooHigh) / highScale) * highAnchor, 0, highAnchor);
  return {
    points,
    impact: 'negative',
    detail: `Above the high-water threshold of ${formatGauge(tooHigh, gauge.unit)} ${gauge.unit}. Expect faster current and less margin.`,
    band: 'too-high',
    bandDetail: 'Above the hard high threshold. This is outside the workable paddling band.',
  };
}

function assessTrend(
  river: River,
  gauge: GaugeReading,
  band: GaugeBand
): {
  points: number;
  impact: ScoreImpact;
  detail: string;
} {
  if (gauge.delta24h === null) {
    return {
      points: 0,
      impact: 'neutral',
      detail: 'Not enough recent gauge history to read the trend.',
    };
  }

  const delta = gauge.delta24h;
  const formattedDelta = `${delta >= 0 ? '+' : ''}${formatGauge(delta, gauge.unit)} ${gauge.unit} over the last 24h`;
  const magnitude = trendMagnitudeForRiver(river, gauge);
  const magnitudeDetail =
    magnitude === 'rapid'
      ? 'This is a rapid change relative to the configured river range.'
      : magnitude === 'notable'
        ? 'This is a meaningful change relative to the configured river range.'
        : '';
  const finish = (points: number, impact: ScoreImpact, detail: string) => ({
    points,
    impact,
    detail: `${detail} ${magnitudeDetail}`.trim(),
  });

  if (gauge.trend === 'steady') {
    const points = steadyTrendPoints(river, gauge, band);
    return finish(
      points,
      points >= 6 ? 'positive' : 'neutral',
      `${formattedDelta}. The river is holding steady${band === 'ideal' ? ' in the target range' : ''}.`,
    );
  }

  if (band === 'ideal') {
    if (gauge.trend === 'rising') {
      const points = magnitude === 'rapid'
        ? -6
        : magnitude === 'notable'
          ? river.profile.rainfallSensitivity === 'high' ? -4 : -2
          : river.profile.rainfallSensitivity === 'high' ? -2 : 4;
      return finish(
        points,
        points < 0 ? 'warning' : 'neutral',
        `${formattedDelta}. The river is still in range, but rising water deserves more caution as the change accelerates.`,
      );
    }

    if (gauge.trend === 'falling') {
      const points = magnitude === 'rapid' ? -2 : magnitude === 'notable' ? 1 : 3;
      return finish(points, points < 0 ? 'warning' : 'neutral', `${formattedDelta}. Still in range, but keep an eye on whether it keeps dropping.`);
    }

    return finish(0, 'neutral', `${formattedDelta}. The trend direction is not reliable enough to adjust the score.`);
  }

  if (band === 'minimum-met') {
    if (gauge.trend === 'rising') {
      const points = magnitude === 'rapid'
        ? -10
        : magnitude === 'notable'
          ? -5
          : river.profile.rainfallSensitivity === 'high' ? -4 : 0;
      return finish(points, points < 0 ? 'warning' : 'neutral', `${formattedDelta}. The river is above the minimum level, but rising water adds uncertainty because we have less guidance on the high side.`);
    }

    if (gauge.trend === 'falling') {
      const points = magnitude === 'rapid' ? -10 : magnitude === 'notable' ? -6 : -3;
      return finish(points, 'warning', `${formattedDelta}. The river is above the minimum for now, but falling water can quickly turn this into a scrape-heavy day.`);
    }

    return finish(0, 'neutral', `${formattedDelta}. The river is above the minimum level, but we still have less guidance on the high side.`);
  }

  if (band === 'low-shoulder' || band === 'too-low') {
    if (gauge.trend === 'rising') {
      const rapidPoints = river.profile.rainfallSensitivity === 'high' ? -6 : -2;
      const points = magnitude === 'rapid' ? rapidPoints : magnitude === 'notable' ? 3 : 7;
      return finish(points, points < 0 ? 'warning' : 'positive', `${formattedDelta}. Rising water helps a low river only while the rate of change remains manageable.`);
    }

    if (gauge.trend === 'falling') {
      const points = magnitude === 'rapid' ? -16 : magnitude === 'notable' ? -11 : -8;
      return finish(points, 'negative', `${formattedDelta}. Falling from an already low position pushes this farther from the target band.`);
    }
  }

  if (band === 'high-shoulder' || band === 'too-high') {
    if (gauge.trend === 'falling') {
      const points = magnitude === 'rapid' ? 1 : magnitude === 'notable' ? 4 : 7;
      return finish(points, 'positive', `${formattedDelta}. Falling water helps a high river, although a rapid change still adds uncertainty.`);
    }

    if (gauge.trend === 'rising') {
      const points = magnitude === 'rapid' ? -16 : magnitude === 'notable' ? -11 : -8;
      return finish(points, 'negative', `${formattedDelta}. Rising from an already high position is a bad sign.`);
    }
  }

  return finish(0, 'neutral', formattedDelta);
}

function steadyTrendPoints(river: River, gauge: GaugeReading, band: GaugeBand): number {
  if (band === 'ideal') return 8;
  if (band === 'minimum-met') return 2;

  const { thresholdModel, tooLow, idealMin, idealMax, tooHigh } = river.profile;
  if (thresholdModel === 'minimum-only') {
    const minimum = typeof tooLow === 'number' ? tooLow : idealMin;
    if (band === 'too-low' && typeof minimum === 'number') {
      return Math.round(clamp(2 - ((minimum - gauge.current) / Math.max(Math.abs(minimum), 1)) * 2, 0, 2));
    }
    return 0;
  }

  if (
    typeof tooLow !== 'number' ||
    typeof idealMin !== 'number' ||
    typeof idealMax !== 'number' ||
    typeof tooHigh !== 'number'
  ) {
    return 0;
  }

  if (band === 'low-shoulder') {
    return Math.round(clamp((gauge.current - tooLow) / Math.max(idealMin - tooLow, 0.01), 0, 1) * 8);
  }
  if (band === 'high-shoulder') {
    return Math.round(clamp((tooHigh - gauge.current) / Math.max(tooHigh - idealMax, 0.01), 0, 1) * 8);
  }

  const idealWidth = idealMax - idealMin;
  if (band === 'too-low' && tooLow === idealMin) {
    const scale = Math.max(idealWidth * 0.25, gauge.unit === 'ft' ? 0.1 : 10);
    return Math.round(clamp(1 - (tooLow - gauge.current) / scale, 0, 1) * 8);
  }
  if (band === 'too-high' && tooHigh === idealMax) {
    const scale = Math.max(idealWidth * 0.25, gauge.unit === 'ft' ? 0.1 : 10);
    return Math.round(clamp(1 - (gauge.current - tooHigh) / scale, 0, 1) * 8);
  }

  return 0;
}

function trendMagnitudeForRiver(river: River, gauge: GaugeReading): 'mild' | 'notable' | 'rapid' {
  const absoluteDelta = Math.abs(gauge.delta24h ?? 0);
  const percentChange = typeof gauge.changePercent24h === 'number' && Number.isFinite(gauge.changePercent24h)
    ? Math.abs(gauge.changePercent24h) / 100
    : 0;
  const rangeWidth =
    river.profile.thresholdModel === 'two-sided' &&
    typeof river.profile.idealMin === 'number' &&
    typeof river.profile.idealMax === 'number'
      ? Math.abs(river.profile.idealMax - river.profile.idealMin)
      : typeof river.profile.tooLow === 'number'
        ? Math.max(Math.abs(river.profile.tooLow), 1)
        : Math.max(Math.abs(gauge.current), 1);
  const rangeFraction = absoluteDelta / Math.max(rangeWidth, 0.01);

  if (percentChange >= 0.25 || rangeFraction >= 0.35) return 'rapid';
  if (percentChange >= 0.12 || rangeFraction >= 0.15) return 'notable';
  return 'mild';
}

function assessDnrInterpretation(
  river: River,
  gauge: GaugeReading
): {
  points: number;
  impact: ScoreImpact;
  detail: string;
  value: string;
  hasInterpretation: boolean;
} {
  const label = normalizeDnrInterpretation(gauge.gaugeInterpretation);
  const activeGaugeSource = [river.gaugeSource, ...(river.fallbackGaugeSources ?? [])]
    .find((source) => source.id === gauge.sourceId);
  const isDnrGauge = activeGaugeSource?.provider === 'mn_dnr' || gauge.sourceId.startsWith('mn-dnr-');

  if (!isDnrGauge || !label) {
    return {
      points: 0,
      impact: 'neutral',
      detail: '',
      value: 'Not published',
      hasInterpretation: false,
    };
  }

  switch (label) {
    case 'scrapable':
      return {
        points: -12,
        impact: 'negative',
        value: 'Scrapable',
        detail: 'MN DNR classifies this gauge as Scrapable, so the river-quality score applies an extra low-water penalty.',
        hasInterpretation: true,
      };
    case 'low':
      return {
        points: -5,
        impact: 'warning',
        value: 'Low',
        detail: 'MN DNR classifies this gauge as Low, so the river-quality score treats low-water risk as an added caution.',
        hasInterpretation: true,
      };
    case 'medium':
      return {
        points: 4,
        impact: 'positive',
        value: 'Medium',
        detail: 'MN DNR classifies this gauge as Medium, which modestly supports the river-quality score.',
        hasInterpretation: true,
      };
    case 'high':
      return {
        points: -6,
        impact: 'warning',
        value: 'High',
        detail: 'MN DNR classifies this gauge as High, so the river-quality score adds high-water caution.',
        hasInterpretation: true,
      };
    case 'very high':
      return {
        points: -18,
        impact: 'negative',
        value: 'Very High',
        detail: 'MN DNR classifies this gauge as Very High, so the river-quality score applies a strong high-water penalty.',
        hasInterpretation: true,
      };
    default:
      return {
        points: 0,
        impact: 'neutral',
        value: titleCase(label),
        detail: `MN DNR publishes this gauge as ${titleCase(label)}, but that label is not treated as a scoring adjustment.`,
        hasInterpretation: true,
      };
  }
}

function normalizeDnrInterpretation(value: string | null | undefined): string | null {
  const normalized = value?.trim().toLowerCase().replace(/\s+/g, ' ');
  return normalized || null;
}

function assessWeather(weather: WeatherSnapshot | null): {
  points: number;
  impact: ScoreImpact;
  detail: string;
} {
  if (!weather) {
    return {
      points: 0,
      impact: 'warning',
      detail: 'Weather data is unavailable, so the score leans more heavily on the river reading.',
    };
  }

  let points = 8;
  const notes: string[] = [];
  let impact: ScoreImpact = 'positive';

  if (typeof weather.temperatureF === 'number') {
    if (weather.temperatureF < 35) {
      points -= 12;
      impact = 'negative';
      notes.push(`Air temperature is near freezing at ${Math.round(weather.temperatureF)}°F.`);
    } else if (weather.temperatureF < 40) {
      points -= 8;
      impact = 'warning';
      notes.push(`Air temperature is cold at ${Math.round(weather.temperatureF)}°F.`);
    } else if (weather.temperatureF < 50) {
      points -= 3;
      impact = impact === 'negative' ? 'negative' : 'warning';
      notes.push(`Air temperature is cool at ${Math.round(weather.temperatureF)}°F.`);
    } else if (weather.temperatureF <= 80) {
      points += 4;
      notes.push(`Air temperature looks comfortable at ${Math.round(weather.temperatureF)}°F.`);
    } else if (weather.temperatureF <= 88) {
      points += 1;
      notes.push(`Air temperature is warm at ${Math.round(weather.temperatureF)}°F.`);
    } else {
      points -= 3;
      impact = impact === 'negative' ? 'negative' : 'warning';
      notes.push(`Air temperature is hot at ${Math.round(weather.temperatureF)}°F.`);
    }
  }

  if (weather.next12hStormRisk) {
    points -= 8;
    impact = 'negative';
    notes.push('Thunderstorm risk shows up in the next 12 hours.');
  }

  if ((weather.next12hWindMphMax ?? 0) >= 20) {
    points -= 5;
    impact = impact === 'negative' ? 'negative' : 'warning';
    notes.push(`Winds may gust into the ${Math.round(weather.next12hWindMphMax ?? 0)} mph range.`);
  } else if ((weather.next12hWindMphMax ?? 0) >= 14) {
    points -= 3;
    impact = impact === 'negative' ? 'negative' : 'warning';
    notes.push('Wind is noticeable but not automatically a deal-breaker.');
  } else {
    points += 2;
    notes.push('Wind looks manageable.');
  }

  if ((weather.next12hPrecipProbabilityMax ?? 0) >= 70 || (weather.next12hPrecipitationIn ?? 0) >= 0.3) {
    points -= 7;
    impact = impact === 'negative' ? 'negative' : 'warning';
    notes.push('Rain odds are high enough to add uncertainty.');
  } else if ((weather.next12hPrecipProbabilityMax ?? 0) >= 40) {
    points -= 3;
    impact = impact === 'negative' ? 'negative' : 'warning';
    notes.push('Some rain is possible, but it does not dominate the call.');
  } else {
    points += 1;
    notes.push('No major rain signal is showing up right now.');
  }

  return {
    points: clamp(points, -18, 15),
    impact,
    detail: notes.join(' '),
  };
}

function assessSeason(river: River, now: Date): {
  points: number;
  impact: ScoreImpact;
  detail: string;
  value: string;
} {
  const month = now.getMonth() + 1;
  const inSeason = river.profile.seasonMonths.includes(month);

  if (inSeason) {
    return {
      points: 0,
      impact: 'neutral',
      detail: river.profile.seasonNotes,
      value: 'Normal window',
    };
  }

  return {
    points: -5,
    impact: 'warning',
    detail: `Outside the usual season. ${river.profile.seasonNotes}`,
    value: 'Outside core window',
  };
}

function assessDifficulty(river: River): {
  points: number;
  impact: ScoreImpact;
  detail: string;
} {
  if (river.profile.difficulty === 'hard') {
    return {
      points: -8,
      impact: 'warning',
      detail: `${river.profile.difficultyNotes} A hard reach needs more margin than an easy family float, even when the gauge is in range.`,
    };
  }

  return {
    points: 0,
    impact: 'neutral',
    detail: river.profile.difficultyNotes,
  };
}

function computeRiverQuality(
  river: River,
  gaugeAssessment: { points: number },
  trendAssessment: { points: number },
  dnrInterpretationAssessment: { points: number }
): number {
  const scoreCap = river.profile.thresholdModel === 'minimum-only' ? MINIMUM_ONLY_SCORE_CAP : 100;
  return clamp(
    Math.round(gaugeAssessment.points + trendAssessment.points + dnrInterpretationAssessment.points),
    0,
    scoreCap
  );
}

function assessWeatherAdjustment(river: River, weather: WeatherSnapshot | null): {
  points: number;
  windPoints: number;
  rainPoints: number;
  impact: ScoreImpact;
  detail: string;
  windDetail: string;
  rainDetail: string;
} {
  if (!weather) {
    return {
      points: 0,
      windPoints: 0,
      rainPoints: 0,
      impact: 'warning',
      detail: 'Weather data is unavailable, so the score leans more heavily on the river reading.',
      windDetail: 'Wind data is unavailable.',
      rainDetail: 'Rain timing and storm risk are unavailable.',
    };
  }

  let rawWindPoints = 0;
  let rawRainPoints = 0;
  const windNotes: string[] = [];
  const rainNotes: string[] = [];
  let impact: ScoreImpact = 'neutral';
  const windSensitivity = windSensitivityForRiver(river);
  const rainSensitivity = rainSensitivityForRiver(river);

  if (weather.next12hStormRisk) {
    rawRainPoints -= Math.round(8 * rainSensitivity);
    impact = 'negative';
    rainNotes.push('Storm risk is showing up in the next 12 hours.');
  }

  const sustainedWind = weather.next12hWindMphMax ?? weather.windMph ?? 0;
  const gustWind = weather.gustMph ?? weather.todayHourly[0]?.windGustMph ?? null;
  const windPenalty =
    sustainedWind > 20 || (gustWind ?? 0) >= 30
      ? -10
      : sustainedWind >= 15 || (gustWind ?? 0) >= 24
        ? -6
        : sustainedWind > 10 || (gustWind ?? 0) >= 16
          ? -3
          : 0;
  rawWindPoints += Math.round(windPenalty * windSensitivity);
  if (windPenalty <= -10) {
    impact = impact === 'negative' ? 'negative' : 'warning';
    windNotes.push(
      gustWind
        ? `Strong wind is expected, around ${Math.round(sustainedWind)} mph with gusts near ${Math.round(gustWind)} mph.`
        : `Strong wind is expected, around ${Math.round(sustainedWind)} mph.`
    );
  } else if (windPenalty < 0) {
    impact = impact === 'negative' ? 'negative' : 'warning';
    windNotes.push(
      gustWind
        ? `Wind looks noticeable at about ${Math.round(sustainedWind)} mph, with gusts near ${Math.round(gustWind)} mph.`
        : `Wind looks noticeable at about ${Math.round(sustainedWind)} mph.`
    );
  } else {
    windNotes.push('Wind looks manageable.');
  }

  const precipProbability = weather.next12hPrecipProbabilityMax ?? 0;
  const precipAmount = weather.next12hPrecipitationIn ?? 0;
  const rainPenalty = precipProbability > 60 ? -6 : precipProbability >= 30 ? -3 : 0;
  rawRainPoints += Math.round(rainPenalty * rainSensitivity);
  if (rainPenalty <= -6) {
    impact = impact === 'negative' ? 'negative' : 'warning';
    rainNotes.push('Rain odds are high enough to change the trip call.');
  } else if (rainPenalty < 0) {
    impact = impact === 'negative' ? 'negative' : 'warning';
    rainNotes.push('Some rain is possible later today.');
  } else {
    rainNotes.push('No major rain signal is showing up right now.');
  }

  const meaningfulRainSignal = precipProbability >= 30 || precipAmount >= 0.03 || weather.next12hStormRisk;
  const precipTimingPenalty =
    weather.rainTimingLabel === 'Imminent'
      ? -5
      : weather.rainTimingLabel === 'Next few hours'
        ? -4
        : weather.rainTimingLabel === 'Later today'
          ? meaningfulRainSignal
            ? -2
            : 0
          : typeof weather.next12hPrecipStartsInHours === 'number'
            ? !meaningfulRainSignal
              ? 0
              : weather.next12hPrecipStartsInHours <= 3
              ? -5
              : weather.next12hPrecipStartsInHours <= 12
                ? -2
                : 0
            : 0;
  rawRainPoints += Math.round(precipTimingPenalty * rainSensitivity);
  if (precipTimingPenalty <= -5) {
    impact = 'negative';
    rainNotes.push('Rain looks imminent in the next few hours.');
  } else if (precipTimingPenalty < 0) {
    impact = impact === 'negative' ? 'negative' : 'warning';
    rainNotes.push('Rain is likely later today.');
  } else if (weather.rainTimingLabel === 'Later today' && precipProbability > 0) {
    rainNotes.push('Low rain odds later today are not treated as a major trip limiter.');
  }

  const recentRain24h = weather.recentRain24hIn ?? 0;
  const recentRain72h = weather.recentRain72hIn ?? 0;
  const recentRainPenalty =
    recentRain24h >= 1
      ? -6
      : recentRain24h >= 0.5
        ? -4
        : recentRain24h >= 0.2
          ? -2
          : recentRain72h >= 2
            ? -4
            : recentRain72h >= 1
              ? -2
              : 0;
  rawRainPoints += Math.round(recentRainPenalty * rainSensitivity);
  if (recentRainPenalty <= -4) {
    impact = impact === 'negative' ? 'negative' : 'warning';
    rainNotes.push(
      `Recent rainfall is still running through this watershed (${formatRainInches(recentRain24h)} in the last 24h, ${formatRainInches(recentRain72h)} in the last 72h).`
    );
  } else if (recentRainPenalty < 0) {
    impact = impact === 'negative' ? 'negative' : 'warning';
    rainNotes.push(`Some recent rainfall is still in play (${formatRainInches(recentRain24h)} in the last 24h).`);
  }

  const normalized = normalizeWeatherBreakdown(rawWindPoints, rawRainPoints);

  return {
    points: normalized.total,
    windPoints: normalized.windPoints,
    rainPoints: normalized.rainPoints,
    impact,
    detail: `${windNotes.join(' ')} ${rainNotes.join(' ')}`.trim(),
    windDetail: windNotes.join(' '),
    rainDetail: rainNotes.join(' '),
  };
}

function assessTemperatureAdjustment(
  river: River,
  gauge: GaugeReading | null,
  weather: WeatherSnapshot | null,
  now: Date
): {
  points: number;
  impact: ScoreImpact;
  detail: string;
} {
  if (!weather || typeof weather.temperatureF !== 'number') {
    return {
      points: 0,
      impact: 'warning',
      detail: 'Air temperature is unavailable, so the trip-day score leans more heavily on other signals.',
    };
  }

  const month = now.getMonth() + 1;
  const coldSeasonMultiplier = [4, 5, 10, 11].includes(month) ? 1.25 : 1;
  const tempSensitivity = tempSensitivityForRiver(river);
  const temp = weather.temperatureF;
  const airPenalty =
    temp < 35 ? -12 : temp < 50 ? -6 : temp < 65 ? -1 : temp <= 85 ? 0 : temp <= 92 ? -4 : -8;
  const waterTemp = gauge?.waterTempF ?? null;
  const waterPenalty = typeof waterTemp === 'number' ? (waterTemp < 45 ? -4 : waterTemp < 55 ? -2 : 0) : 0;
  const points = Math.round((airPenalty + waterPenalty) * coldSeasonMultiplier * tempSensitivity);
  const waterDetail =
    typeof waterTemp === 'number'
      ? ` Water temperature is about ${Math.round(waterTemp)} degrees F.`
      : '';

  return {
    points,
    impact: points <= -8 ? 'negative' : points < 0 ? 'warning' : 'neutral',
    detail: `${
      points < 0
        ? temp < 35
          ? `Air temperature is near freezing at ${Math.round(temp)} degrees F, which makes today a much tougher call${coldSeasonMultiplier > 1 ? ' in shoulder season' : ''}.`
          : temp >= 50 && temp < 65
            ? `Air temperature is ${Math.round(temp)} degrees F, which is cool but still workable${coldSeasonMultiplier > 1 ? ' in shoulder season' : ''}.`
            : `Air temperature is ${Math.round(temp)} degrees F, which makes today less appealing${coldSeasonMultiplier > 1 ? ' in shoulder season' : ''}.`
        : `Air temperature is ${Math.round(temp)} degrees F and looks fine for today.`
    }${waterDetail}`.trim(),
  };
}

function assessComfortAdjustment(
  river: River,
  weather: WeatherSnapshot | null,
  now: Date
): {
  points: number;
  impact: ScoreImpact;
  detail: string;
  seasonValue: string;
  seasonDetail: string;
  seasonImpact: ScoreImpact;
  difficultyImpact: ScoreImpact;
} {
  const month = now.getMonth() + 1;
  const inSeason = river.profile.seasonMonths.includes(month);
  let points = 0;

  const seasonValue = inSeason ? 'Normal window' : 'Outside core window';
  const seasonImpact: ScoreImpact = inSeason ? 'neutral' : 'warning';
  const seasonDetail = inSeason
    ? river.profile.seasonNotes
    : `Outside the usual season. ${river.profile.seasonNotes}`;

  if (!inSeason) {
    points -= 4;
  }

  let difficultyImpact: ScoreImpact = 'neutral';
  if (river.profile.difficulty === 'hard') {
    points -= 6;
    difficultyImpact = 'warning';
  }

  return {
    points: points + pleasantDayBonus({ river, weather, inSeason }),
    impact: points > 0 ? 'positive' : points < 0 ? 'warning' : 'neutral',
    detail:
      river.profile.difficulty === 'hard'
        ? `${river.profile.difficultyNotes} This kind of reach needs more margin, even when the gauge is in range.`
        : inSeason
          ? 'No extra comfort penalty beyond the weather and flow.'
          : 'Outside the usual season knocks the trip quality down a bit, even if the gauge is workable.',
    seasonValue,
    seasonDetail,
    seasonImpact,
    difficultyImpact,
  };
}

function buildSafetyScoreLimits(args: {
  river: River;
  gauge: GaugeReading;
  liveData: LiveDataStatus;
  dnrInterpretation: string;
  hasDnrInterpretation: boolean;
}): ScoreLimit[] {
  const limits: ScoreLimit[] = [];
  const dnrInterpretation = args.hasDnrInterpretation ? args.dnrInterpretation.toLowerCase() : '';

  if (args.river.profile.thresholdModel === 'minimum-only') {
    limits.push({
      limit: MINIMUM_ONLY_SCORE_CAP,
      reason: `This route has minimum-only gauge guidance, so today's score is limited to ${MINIMUM_ONLY_SCORE_CAP} or lower.`,
    });
  }

  if (dnrInterpretation === 'scrapable' || dnrInterpretation === 'very high') {
    limits.push({
      limit: 49,
      reason: `The current MN DNR ${args.dnrInterpretation} interpretation limits today's score to 49 until conditions are verified.`,
    });
  }

  if (args.liveData.gauge.state === 'stale') {
    limits.push({
      limit: 49,
      reason: "Stale gauge data limits today's score to 49 until a current river reading is available.",
    });
  }

  if (args.liveData.weather.state === 'stale' || args.liveData.weather.state === 'unavailable') {
    limits.push({
      limit: 74,
      reason: `Weather data is ${args.liveData.weather.state}, so today's score is limited to 74 or lower.`,
    });
  }

  if (typeof args.gauge.waterTempF === 'number' && args.gauge.waterTempF < 45) {
    limits.push({
      limit: 74,
      reason: `Water temperature below 45 degrees F limits today's score to 74 or lower.`,
    });
  }

  return limits;
}

function forecastSafetyScoreCap(args: {
  river: River;
  gauge: GaugeReading;
  dnrInterpretation: string;
  hasDnrInterpretation: boolean;
}): number {
  let cap = args.river.profile.thresholdModel === 'minimum-only' ? MINIMUM_ONLY_SCORE_CAP : 100;
  const dnrInterpretation = args.hasDnrInterpretation ? args.dnrInterpretation.toLowerCase() : '';

  if (dnrInterpretation === 'scrapable' || dnrInterpretation === 'very high') {
    cap = Math.min(cap, 49);
  }

  if (typeof args.gauge.waterTempF === 'number' && args.gauge.waterTempF < 45) {
    cap = Math.min(cap, 74);
  }

  return cap;
}

function pleasantDayBonus(args: {
  river: River;
  weather: WeatherSnapshot | null;
  inSeason: boolean;
}): number {
  if (!args.inSeason || !args.weather || args.river.profile.difficulty === 'hard') {
    return 0;
  }

  const comfortableTemp =
    typeof args.weather.temperatureF === 'number' &&
    args.weather.temperatureF >= 65 &&
    args.weather.temperatureF <= 82;
  const calmWind = (args.weather.next12hWindMphMax ?? args.weather.windMph ?? Infinity) <= 10;
  const dry = (args.weather.next12hPrecipProbabilityMax ?? Infinity) < 20;
  const noStorms = !args.weather.next12hStormRisk;
  const fairSky =
    (args.weather.weatherCode !== null && [0, 1, 2].includes(args.weather.weatherCode)) ||
    (typeof args.weather.conditionLabel === 'string' &&
      !/(rain|storm|snow|showers|thunder)/i.test(args.weather.conditionLabel));

  return comfortableTemp && calmWind && dry && noStorms && fairSky ? 8 : 0;
}

function buildScoreBreakdown(args: {
  river: River;
  weather: WeatherSnapshot | null;
  riverQuality: number;
  riverQualityExplanation: string;
  windAdjustment: number;
  temperatureAdjustment: number;
  rainAdjustment: number;
  comfortAdjustment: number;
  windExplanation: string;
  temperatureExplanation: string;
  rainExplanation: string;
  comfortExplanation: string;
  rawTripScore: number;
  additionalScoreLimits: ScoreLimit[];
}): RiverScoreResult['scoreBreakdown'] {
  let finalScore = Math.round(args.rawTripScore);
  const capReasons: string[] = [];

  const applyScoreLimit = (limit: number, reason: string) => {
    if (finalScore <= limit) {
      return;
    }
    finalScore = limit;
    capReasons.push(reason);
  };

  if (typeof args.weather?.temperatureF === 'number' && args.weather.temperatureF < 35) {
    applyScoreLimit(70, "Cold air limits today's score to 70 or lower.");
  }

  if ((args.weather?.gustMph ?? 0) >= 30 || (args.weather?.next12hWindMphMax ?? 0) > 20) {
    applyScoreLimit(75, "Strong wind limits today's score to 75 or lower.");
  }

  const rainOrStormsSoon =
    (typeof args.weather?.next12hPrecipStartsInHours === 'number' &&
      args.weather.next12hPrecipStartsInHours <= 3) ||
    args.weather?.rainTimingLabel === 'Imminent';
  const strongRainOrStormSignal =
    (args.weather?.next12hPrecipProbabilityMax ?? 0) > 60 ||
    (args.weather?.next12hPrecipitationIn ?? 0) >= 0.3 ||
    args.weather?.next12hStormRisk === true;

  if (rainOrStormsSoon && strongRainOrStormSignal) {
    applyScoreLimit(65, "Heavy rain or storms likely soon limit today's score to 65 or lower.");
  }

  for (const scoreLimit of args.additionalScoreLimits) {
    applyScoreLimit(scoreLimit.limit, scoreLimit.reason);
  }

  finalScore = clamp(finalScore, 0, 100);

  return {
    riverQuality: args.riverQuality,
    windAdjustment: args.windAdjustment,
    temperatureAdjustment: args.temperatureAdjustment,
    rainAdjustment: args.rainAdjustment,
    comfortAdjustment: args.comfortAdjustment,
    rawTripScore: Math.round(args.rawTripScore),
    finalScore,
    capReasons,
    riverQualityExplanation: args.riverQualityExplanation,
    windExplanation: args.windExplanation,
    temperatureExplanation: args.temperatureExplanation,
    rainExplanation: args.rainExplanation,
    comfortExplanation: args.comfortExplanation,
  };
}

function normalizeWeatherBreakdown(windPoints: number, rainPoints: number): {
  windPoints: number;
  rainPoints: number;
  total: number;
} {
  const total = windPoints + rainPoints;
  if (total >= -25) {
    return {
      windPoints,
      rainPoints,
      total,
    };
  }

  const scale = -25 / total;
  const scaledWindPoints = Math.round(windPoints * scale);

  return {
    windPoints: scaledWindPoints,
    rainPoints: -25 - scaledWindPoints,
    total: -25,
  };
}

function windSensitivityForRiver(river: River): number {
  if (typeof river.profile.windSensitivity === 'number') {
    return river.profile.windSensitivity;
  }

  return river.name === 'Rice Creek' ? 1.15 : 1;
}

function rainSensitivityForRiver(river: River): number {
  if (typeof river.profile.rainSensitivity === 'number') {
    return river.profile.rainSensitivity;
  }

  if (river.profile.rainfallSensitivity === 'high') {
    return 1.3;
  }

  if (river.profile.rainfallSensitivity === 'low') {
    return 0.8;
  }

  return 1;
}

function tempSensitivityForRiver(river: River): number {
  if (typeof river.profile.tempSensitivity === 'number') {
    return river.profile.tempSensitivity;
  }

  return 1;
}

function computeConfidence(args: {
  river: River;
  gauge: GaugeReading | null;
  weather: WeatherSnapshot | null;
  liveData: LiveDataStatus;
}): ConfidenceResult {
  let score = 0.2;
  const reasons: string[] = [];
  const warnings: string[] = [];

  const activeGaugeSource = args.gauge
    ? [args.river.gaugeSource, ...(args.river.fallbackGaugeSources ?? [])].find((source) => source.id === args.gauge?.sourceId)
    : undefined;

  if (args.gauge && activeGaugeSource?.kind === 'direct') {
    score += 0.25;
    reasons.push('Direct gauge available.');
  } else if (args.gauge) {
    score += 0.08;
    warnings.push('Using a nearby gauge instead of one on this reach.');
  } else {
    warnings.push('No live gauge is available right now.');
  }

  if (
    args.river.profile.thresholdModel === 'two-sided' &&
    typeof args.river.profile.idealMin === 'number' &&
    typeof args.river.profile.idealMax === 'number'
  ) {
    score += 0.1;
    reasons.push('Ideal range is well defined.');
  } else if (
    args.river.profile.thresholdModel === 'minimum-only' &&
    (typeof args.river.profile.tooLow === 'number' || typeof args.river.profile.idealMin === 'number')
  ) {
    score += 0.08;
    reasons.push('A low-water floor is defined.');
    score -= 0.03;
    warnings.push('We know the low-water floor, but not the ideal range.');
  }

  if (
    args.river.profile.thresholdModel === 'two-sided' &&
    typeof args.river.profile.tooLow === 'number' &&
    typeof args.river.profile.tooHigh === 'number'
  ) {
    score += 0.08;
    reasons.push('Low and high bounds are defined.');
  }

  if (args.river.profile.thresholdSourceStrength === 'official') {
    score += 0.14;
    reasons.push('Range comes from an official source.');
  } else if (args.river.profile.thresholdSourceStrength === 'mixed') {
    score += 0.08;
    reasons.push('Range is backed by more than one source.');
  } else if (args.river.profile.thresholdSourceStrength === 'community') {
    score += 0.03;
    warnings.push('Range is based on community guidance.');
  } else {
    score -= 0.08;
    warnings.push('Range is estimated from limited source material.');
  }

  if (args.gauge?.trend !== 'unknown') {
    score += 0.05;
    reasons.push('Recent gauge trend is available.');
  }

  if (args.weather?.observedAt && args.liveData.weather.state === 'live') {
    score += 0.05;
    reasons.push('Weather data is recent.');
  }

  if (args.river.profile.rainfallSensitivity === 'high') {
    score -= 0.05;
    warnings.push('This river changes quickly after rain.');
  }

  if (args.liveData.gauge.state === 'stale') {
    score -= 0.22;
    warnings.push('Gauge data is older than the freshness target.');
  } else if (args.liveData.gauge.state === 'unavailable') {
    score -= 0.28;
    warnings.push('Gauge data is unavailable.');
  }

  if (args.liveData.weather.state === 'stale') {
    score -= 0.08;
    warnings.push('Weather data is older than the freshness target.');
  } else if (args.liveData.weather.state === 'unavailable') {
    score -= 0.04;
    warnings.push('Weather data is unavailable.');
  }

  score = clamp(score, 0.05, 0.95);

  const label: ConfidenceLabel = score >= 0.78 ? 'High' : score >= 0.58 ? 'Medium' : 'Low';
  const level: ConfidenceResult['level'] = label.toLowerCase() as ConfidenceResult['level'];
  const rationale = [...reasons, ...warnings].slice(0, 6);

  return {
    score: Math.round(score * 100),
    label,
    level,
    reasons: reasons.slice(0, 4),
    warnings: warnings.slice(0, 4),
    rationale,
  };
}

function computeReadiness(args: {
  river: River;
  gauge: GaugeReading;
  gaugeBand: GaugeBand;
  liveData: LiveDataStatus;
  checklist: DecisionChecklistItem[];
  safetyScoreLimits: ScoreLimit[];
  dnrInterpretation: string;
  hasDnrInterpretation: boolean;
}): RiverReadinessResult {
  if (args.liveData.gauge.state !== 'live') {
    return {
      status: 'withheld',
      label: 'Withheld',
      reason: 'The gauge is missing or stale, so launch readiness is withheld until it is refreshed.',
    };
  }

  const dnrInterpretation = args.hasDnrInterpretation ? args.dnrInterpretation.toLowerCase() : '';
  const activeGaugeSource = [args.river.gaugeSource, ...(args.river.fallbackGaugeSources ?? [])]
    .find((source) => source.id === args.gauge.sourceId);
  if (
    args.gaugeBand === 'too-high' ||
    args.gaugeBand === 'too-low' ||
    dnrInterpretation === 'very high' ||
    dnrInterpretation === 'scrapable' ||
    args.checklist.some((item) => item.status === 'skip')
  ) {
    return {
      status: 'skip',
      label: 'Skip',
      reason: args.checklist.find((item) => item.status === 'skip')?.detail ?? 'A current safety or flow signal is outside the runnable window.',
    };
  }

  if (
    args.river.profile.thresholdModel === 'minimum-only' ||
    activeGaugeSource?.kind === 'proxy' ||
    args.liveData.weather.state !== 'live' ||
    args.safetyScoreLimits.length > 0 ||
    args.checklist.some((item) => item.status === 'watch')
  ) {
    return {
      status: 'verify',
      label: 'Verify',
      reason: args.safetyScoreLimits[0]?.reason ?? args.checklist.find((item) => item.status === 'watch')?.detail ?? 'One or more conditions need a direct check before launch.',
    };
  }

  return {
    status: 'ready',
    label: 'Ready',
    reason: 'Current gauge, weather, and route checks support launch readiness.',
  };
}

function buildDecisionChecklist(args: {
  river: River;
  gauge: GaugeReading;
  weather: WeatherSnapshot | null;
  gaugeAssessment: { band: GaugeBand; detail: string };
  trendAssessment: { detail: string };
  liveData: LiveDataStatus;
}): DecisionChecklistItem[] {
  const items: DecisionChecklistItem[] = [];
  const bandStatus = checklistStatusForBand(args.gaugeAssessment.band);

  items.push({
    status: bandStatus,
    label: 'Gauge window',
    detail: args.gaugeAssessment.detail,
  });

  items.push({
    status:
      args.gauge.trend === 'rising' && (args.gaugeAssessment.band === 'too-high' || args.gaugeAssessment.band === 'high-shoulder')
        ? 'skip'
        : args.gauge.trend === 'falling' && (args.gaugeAssessment.band === 'too-low' || args.gaugeAssessment.band === 'low-shoulder')
          ? 'skip'
          : args.gauge.trend === 'steady'
            ? 'go'
            : 'watch',
    label: 'Trend check',
    detail: args.trendAssessment.detail,
  });

  items.push({
    status: checklistStatusForWeather(args.weather),
    label: 'Weather window',
    detail: weatherChecklistDetail(args.weather),
  });

  items.push({
    status:
      args.river.profile.difficulty === 'hard'
        ? 'watch'
        : args.liveData.overall === 'live'
          ? 'go'
          : 'watch',
    label: 'Skill and access',
    detail:
      args.river.profile.difficulty === 'hard'
        ? `${args.river.profile.difficultyNotes} Confirm access, scout wood, and keep extra margin on this reach.`
        : 'Confirm put-in, take-out, and any posted launch or parking rules before you leave a vehicle.',
  });

  if (args.liveData.overall !== 'live') {
    items.push({
      status: 'watch',
      label: 'Freshness check',
      detail: args.liveData.summary,
    });
  }

  return items.slice(0, 5);
}

function buildOutlooks(args: {
  river: River;
  gauge: GaugeReading;
  weather: WeatherSnapshot | null;
  confidence: ConfidenceResult;
  liveData: LiveDataStatus;
  currentRiverQuality: number;
  gaugeBand: GaugeBand;
  safetyScoreCap: number;
}): RiverOutlook[] {
  return [
    buildOutlook({
      id: 'tomorrow',
      window: args.weather?.tomorrow ?? null,
      river: args.river,
      gauge: args.gauge,
      confidence: args.confidence,
      liveData: args.liveData,
      currentRiverQuality: args.currentRiverQuality,
      gaugeBand: args.gaugeBand,
      safetyScoreCap: args.safetyScoreCap,
      minConfidence: 55,
      requireTwoSided: false,
    }),
    buildOutlook({
      id: 'weekend',
      window: args.weather?.weekend ?? null,
      river: args.river,
      gauge: args.gauge,
      confidence: args.confidence,
      liveData: args.liveData,
      currentRiverQuality: args.currentRiverQuality,
      gaugeBand: args.gaugeBand,
      safetyScoreCap: args.safetyScoreCap,
      minConfidence: 68,
      requireTwoSided: true,
    }),
  ];
}

function buildOfflineOutlooks(): RiverOutlook[] {
  return [
    {
      id: 'tomorrow',
      label: 'Tomorrow',
      availability: 'withheld',
      score: null,
      rating: null,
      confidence: null,
      direction: 'uncertain',
      scoreRange: null,
      explanation: 'Tomorrow is hidden because the direct gauge is unavailable right now.',
    },
    {
      id: 'weekend',
      label: 'Weekend',
      availability: 'withheld',
      score: null,
      rating: null,
      confidence: null,
      direction: 'uncertain',
      scoreRange: null,
      explanation: 'Weekend needs a current gauge read and enough confidence before the app extends the call.',
    },
  ];
}

function buildOutlook(args: {
  id: 'tomorrow' | 'weekend';
  window: ForecastWindow | null;
  river: River;
  gauge: GaugeReading;
  confidence: ConfidenceResult;
  liveData: LiveDataStatus;
  currentRiverQuality: number;
  gaugeBand: GaugeBand;
  safetyScoreCap: number;
  minConfidence: number;
  requireTwoSided: boolean;
}): RiverOutlook {
  const label = args.window?.label ?? (args.id === 'tomorrow' ? 'Tomorrow' : 'Weekend');

  if (!args.window) {
    return {
      id: args.id,
      label,
      availability: 'withheld',
      score: null,
      rating: null,
      confidence: null,
      direction: 'uncertain',
      scoreRange: null,
      explanation: `${label} is hidden because forecast coverage for that window is unavailable.`,
    };
  }

  if (args.liveData.gauge.state !== 'live') {
    return {
      id: args.id,
      label,
      availability: 'withheld',
      score: null,
      rating: null,
      confidence: null,
      direction: 'uncertain',
      scoreRange: null,
      explanation: `${label} is hidden because a current river reading is unavailable.`,
    };
  }

  if (args.requireTwoSided && args.river.profile.thresholdModel !== 'two-sided') {
    return {
      id: args.id,
      label,
      availability: 'withheld',
      score: null,
      rating: null,
      confidence: null,
      direction: 'uncertain',
      scoreRange: null,
      explanation: `${label} is hidden because this reach only has a low-water mark, not a full working range.`,
    };
  }

  if (args.confidence.score < args.minConfidence) {
    return {
      id: args.id,
      label,
      availability: 'withheld',
      score: null,
      rating: null,
      confidence: null,
      direction: 'uncertain',
      scoreRange: null,
      explanation: `${label} is hidden because today's evidence strength is only ${args.confidence.score}/100.`,
    };
  }

  let projectedScore = args.currentRiverQuality;
  projectedScore += trendAdjustmentForOutlook(args.river, args.gaugeBand, args.gauge, args.id);
  projectedScore += weatherAdjustmentForWindow(args.window, args.id);
  projectedScore += temperatureAdjustmentForWindow(args.window);
  projectedScore += routeAdjustmentForWindow(args.river, args.window);

  const scoreCap = Math.min(
    args.river.profile.thresholdModel === 'minimum-only' ? MINIMUM_ONLY_SCORE_CAP : 100,
    args.safetyScoreCap
  );
  projectedScore = clamp(Math.round(projectedScore), 0, scoreCap);
  const directionDelta = projectedScore - args.currentRiverQuality;
  const direction: RiverOutlook['direction'] =
    args.confidence.label === 'Low'
      ? 'uncertain'
      : directionDelta >= 5
        ? 'improving'
        : directionDelta <= -5
          ? 'worsening'
          : 'stable';
  const uncertainty = outlookUncertainty(args.id, args.confidence.label, args.river, args.gauge);

  return {
    id: args.id,
    label,
    availability: 'available',
    score: projectedScore,
    rating: ratingFromScore(projectedScore),
    confidence: args.id === 'weekend' && args.confidence.label === 'High' ? 'Medium' : args.confidence.label,
    direction,
    scoreRange: {
      min: clamp(projectedScore - uncertainty, 0, scoreCap),
      max: clamp(projectedScore + uncertainty, 0, scoreCap),
    },
    explanation: outlookExplanation(args.window, args.gaugeBand, args.gauge, args.id),
  };
}

function outlookUncertainty(
  id: 'tomorrow' | 'weekend',
  evidence: ConfidenceLabel,
  river: River,
  gauge: GaugeReading
): number {
  const horizon = id === 'weekend' ? 10 : 6;
  const evidencePenalty = evidence === 'Low' ? 8 : evidence === 'Medium' ? 4 : 0;
  const trendPenalty = gauge.trend === 'unknown' ? 4 : trendMagnitudeForRiver(river, gauge) === 'rapid' ? 3 : 0;
  return horizon + evidencePenalty + trendPenalty;
}

function trendAdjustmentForOutlook(
  river: River,
  band: GaugeBand,
  gauge: GaugeReading,
  windowId: 'tomorrow' | 'weekend'
): number {
  const multiplier = windowId === 'weekend' ? 1.5 : 1;
  const magnitude = trendMagnitudeForRiver(river, gauge);
  const harmfulMultiplier = magnitude === 'rapid' ? 2 : magnitude === 'notable' ? 1.4 : 1;
  const helpfulMultiplier = magnitude === 'rapid' ? 0.25 : magnitude === 'notable' ? 0.65 : 1;

  if (gauge.trend === 'rising') {
    if (band === 'too-low' || band === 'low-shoulder' || band === 'minimum-met') {
      if (magnitude === 'rapid') {
        return river.profile.rainfallSensitivity === 'high' ? Math.round(-6 * multiplier) : Math.round(-2 * multiplier);
      }
      return Math.round(6 * multiplier * helpfulMultiplier);
    }
    if (band === 'high-shoulder' || band === 'too-high') {
      return Math.round(-8 * multiplier * harmfulMultiplier);
    }
    return Math.round(-2 * multiplier * harmfulMultiplier);
  }

  if (gauge.trend === 'falling') {
    if (band === 'high-shoulder' || band === 'too-high') {
      return Math.round(6 * multiplier * helpfulMultiplier);
    }
    if (band === 'too-low' || band === 'low-shoulder' || band === 'minimum-met') {
      return Math.round(-6 * multiplier * harmfulMultiplier);
    }
    return Math.round(-2 * multiplier * harmfulMultiplier);
  }

  return band === 'ideal' ? 2 : 0;
}

function weatherAdjustmentForWindow(window: ForecastWindow, windowId: 'tomorrow' | 'weekend'): number {
  let points = 0;
  const rainPenalty = windowId === 'weekend' ? 8 : 6;
  const windPenalty = windowId === 'weekend' ? 6 : 5;

  if (window.stormRisk) {
    points -= windowId === 'weekend' ? 12 : 10;
  }

  if ((window.precipProbabilityMax ?? 0) >= 70 || (window.precipitationIn ?? 0) >= 0.4) {
    points -= rainPenalty;
  } else if ((window.precipProbabilityMax ?? 0) >= 40 || (window.precipitationIn ?? 0) >= 0.15) {
    points -= Math.round(rainPenalty / 2);
  }

  if ((window.windMphMax ?? 0) >= 20) {
    points -= windPenalty;
  } else if ((window.windMphMax ?? 0) >= 14) {
    points -= Math.round(windPenalty / 2);
  }

  return points;
}

function temperatureAdjustmentForWindow(window: ForecastWindow): number {
  const temperature = window.temperatureHighF;
  if (typeof temperature !== 'number') {
    return 0;
  }

  return temperature < 35
    ? -12
    : temperature < 50
      ? -6
      : temperature < 65
        ? -1
        : temperature <= 85
          ? 0
          : temperature <= 92
            ? -4
            : -8;
}

function routeAdjustmentForWindow(river: River, window: ForecastWindow): number {
  const startMonth = Number(window.startDate.slice(5, 7));
  const inSeason = Number.isInteger(startMonth) && river.profile.seasonMonths.includes(startMonth);
  let points = inSeason ? 0 : -4;

  if (river.profile.difficulty === 'hard') {
    points -= 6;
  }

  const pleasant =
    inSeason &&
    river.profile.difficulty !== 'hard' &&
    typeof window.temperatureHighF === 'number' &&
    window.temperatureHighF >= 65 &&
    window.temperatureHighF <= 82 &&
    (window.windMphMax ?? Infinity) <= 10 &&
    (window.precipProbabilityMax ?? Infinity) < 20 &&
    !window.stormRisk &&
    window.weatherCode !== null &&
    [0, 1, 2].includes(window.weatherCode);

  return points + (pleasant ? 8 : 0);
}

function outlookExplanation(
  window: ForecastWindow,
  band: GaugeBand,
  gauge: GaugeReading,
  windowId: 'tomorrow' | 'weekend'
): string {
  const weatherText = weatherWindowSummary(window);
  const trendText =
    gauge.trend === 'steady'
      ? `Gauge is steady enough that today's ${gaugeBandLabel(band).toLowerCase()} call should not shift much on its own.`
      : gauge.trend === 'rising'
        ? `Gauge is still rising, which tends to improve low days and worsen high days.`
        : `Gauge is falling, which tends to improve high days and worsen low days.`;

  return `${trendText} ${weatherText} ${windowId === 'weekend' ? 'Re-check this before you commit to the drive.' : 'Tomorrow is an early read, not a promise.'}`;
}

function weatherWindowSummary(window: ForecastWindow): string {
  const notes: string[] = [];

  if (window.stormRisk) {
    notes.push('Storm signal is present');
  } else {
    notes.push('No thunderstorm signal is showing');
  }

  if (typeof window.precipProbabilityMax === 'number') {
    notes.push(`${Math.round(window.precipProbabilityMax)}% rain chance`);
  }

  if (typeof window.windMphMax === 'number') {
    notes.push(`winds up to ${Math.round(window.windMphMax)} mph`);
  }

  return `${window.label}: ${notes.join(', ')}.`;
}

function checklistStatusForBand(band: GaugeBand): ChecklistStatus {
  if (band === 'too-low' || band === 'too-high') return 'skip';
  if (band === 'low-shoulder' || band === 'high-shoulder' || band === 'minimum-met') return 'watch';
  return 'go';
}

function checklistStatusForWeather(weather: WeatherSnapshot | null): ChecklistStatus {
  if (!weather) {
    return 'watch';
  }

  if ((weather.temperatureF ?? 999) < 35) {
    return 'watch';
  }

  if (weather.next12hStormRisk || (weather.gustMph ?? 0) >= 30 || (weather.next12hWindMphMax ?? 0) >= 20) {
    return 'skip';
  }

  if (
    weather.rainTimingLabel === 'Imminent' ||
    weather.rainTimingLabel === 'Next few hours' ||
    (weather.recentRain24hIn ?? 0) >= 0.5 ||
    (weather.next12hPrecipProbabilityMax ?? 0) >= 40 ||
    (weather.gustMph ?? 0) >= 20 ||
    (weather.next12hWindMphMax ?? 0) >= 14
  ) {
    return 'watch';
  }

  return 'go';
}

function weatherChecklistDetail(weather: WeatherSnapshot | null): string {
  if (!weather) {
    return 'Weather coverage is unavailable, so confirm storms, wind, and rain before you commit to the drive.';
  }

  const parts: string[] = [];
  parts.push(weather.next12hStormRisk ? 'Storm signal is present in the next 12 hours.' : 'No storm signal is showing in the next 12 hours.');
  if (typeof weather.temperatureF === 'number') {
    parts.push(`Air temperature is around ${Math.round(weather.temperatureF)}°F.`);
  }
  if (typeof weather.next12hWindMphMax === 'number') {
    parts.push(`Peak wind looks near ${Math.round(weather.next12hWindMphMax)} mph.`);
  }
  if (typeof weather.next12hPrecipProbabilityMax === 'number') {
    parts.push(`Rain risk peaks around ${Math.round(weather.next12hPrecipProbabilityMax)}%.`);
  }
  return parts.join(' ');
}

function combinedImpact(left: ScoreImpact, right: ScoreImpact): ScoreImpact {
  if (left === 'negative' || right === 'negative') return 'negative';
  if (left === 'warning' || right === 'warning') return 'warning';
  if (left === 'positive' || right === 'positive') return 'positive';
  return 'neutral';
}

function buildExplanation(args: {
  river: River;
  rating: ScoreRating;
  gauge: GaugeReading;
  weather: WeatherSnapshot | null;
  gaugeAssessment: { band: string };
  trendAssessment: { detail: string };
  weatherAssessment: { detail: string };
  temperatureAssessment: { detail: string; points: number };
  comfortAssessment: { detail: string; points: number };
  confidence: ConfidenceResult;
  liveData: LiveDataStatus;
}): string {
  const normalizedConfidenceNotes = args.river.profile.confidenceNotes
    .replace(/^Confidence\b[^.]*because\s+/i, '')
    .replace(/^Confidence\b[^.]*\.\s*/i, '')
    .replace(/\bConfidence is still slightly tempered because\b/gi, 'Remaining uncertainty comes from')
    .replace(/\bConfidence is still a little tempered by\b/gi, 'Remaining uncertainty comes from')
    .replace(/\bConfidence is still tempered because\b/gi, 'Remaining uncertainty comes from')
    .replace(/\bConfidence is tempered by\b/gi, 'Remaining uncertainty comes from')
    .replace(/\bConfidence stays a bit below absolute because\b/gi, 'Remaining uncertainty comes from')
    .replace(/\bConfidence stays below absolute because\b/gi, 'Remaining uncertainty comes from')
    .replace(/\bConfidence is still capped because\b/gi, 'Remaining uncertainty comes from')
    .replace(/\bConfidence is still capped by\b/gi, 'Remaining uncertainty comes from')
    .replace(/\bConfidence is capped mainly by\b/gi, 'The main limitation is')
    .replace(/\bConfidence is capped by\b/gi, 'The main limitation is')
    .replace(/\bConfidence is reduced because\b/gi, 'Confidence is lower because')
    .replace(/\bConfidence is still\b/g, 'It is still')
    .replace(/\bIt is still slightly tempered because\b/gi, 'Remaining uncertainty comes from')
    .replace(/\bIt is still a little tempered by\b/gi, 'Remaining uncertainty comes from')
    .replace(/\bIt is still tempered because\b/gi, 'Remaining uncertainty comes from')
    .replace(/\bIt is still capped by\b/gi, 'The main limitation is')
    .replace(/\bConfidence stays\b/g, 'It stays')
    .replace(/\bConfidence is reduced\b/g, 'It is reduced')
    .trim();

  const coldWeatherDriven =
    args.rating === 'No-go' &&
    typeof args.weather?.temperatureF === 'number' &&
    args.weather.temperatureF <= 40 &&
    ['ideal', 'minimum-met', 'low-shoulder'].includes(args.gaugeAssessment.band) &&
    !args.weather?.next12hStormRisk &&
    (
      (args.weather?.next12hPrecipProbabilityMax ?? 0) < 70 ||
      (args.weather?.next12hWindMphMax ?? args.weather?.windMph ?? 0) < 20
    );

  const lead =
    coldWeatherDriven
      ? `${args.river.name} is in shape, but rough weather makes it a tougher call today.`
      : riceCreekWindTradeoff(args)
        ? `${args.river.name} is paddleable today, but wind makes the full lake-and-creek route a bigger commitment.`
      : args.rating === 'Strong'
      ? `${args.river.name} looks good today.`
      : args.rating === 'Good'
        ? `${args.river.name} is workable today.`
        : args.rating === 'Fair'
          ? `${args.river.name} is fair today.`
          : `${args.river.name} looks like a skip today.`;

  const gaugeSentence =
    args.gaugeAssessment.band === 'ideal'
      ? `The gauge is in the recommended range at ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}.`
      : args.gaugeAssessment.band === 'minimum-met'
        ? `The gauge is above the minimum level at ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}, but we have less guidance on the high side.`
      : args.gaugeAssessment.band === 'low-shoulder' || args.gaugeAssessment.band === 'too-low'
        ? `The gauge is still on the low side at ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}.`
        : args.gaugeAssessment.band === 'high-shoulder' || args.gaugeAssessment.band === 'too-high'
          ? `The gauge is on the high side at ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}.`
          : `The gauge reads ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}, but this route still needs a manual level check.`;

  const confidenceSentence = normalizedConfidenceNotes
    ? `Evidence strength for today's call is ${args.confidence.label.toLowerCase()}. ${normalizedConfidenceNotes}`
    : `Evidence strength for today's call is ${args.confidence.label.toLowerCase()} because the available source quality and live data coverage are only moderate.`;
  const trendSentence = /[.!?]$/.test(args.trendAssessment.detail)
    ? args.trendAssessment.detail
    : `${args.trendAssessment.detail}.`;

  const freshnessSentence =
    args.liveData.overall === 'live' ? '' : ` ${args.liveData.summary}`;
  const comfortSentence =
    args.comfortAssessment.points < 0
      ? ` ${args.comfortAssessment.detail}`
      : '';
  const routeTradeoffSentence = riceCreekWindTradeoff(args)
    ? ' Consider starting at Baldwin Lake or another downstream access to skip the most exposed upper lake miles, and check the lake crossings before launch.'
    : '';

  return `${lead} ${gaugeSentence} ${trendSentence} ${args.weatherAssessment.detail} ${args.temperatureAssessment.detail}${freshnessSentence}${comfortSentence}${routeTradeoffSentence} ${confidenceSentence}`.replace(
    /\s+/g,
    ' '
  ).trim();
}

function riceCreekWindTradeoff(args: {
  river: River;
  rating: ScoreRating;
  weather: WeatherSnapshot | null;
}) {
  if (args.river.slug !== 'rice-creek-peltier-to-long-lake' || args.rating !== 'Fair' || !args.weather) {
    return false;
  }

  const sustainedWind = args.weather.next12hWindMphMax ?? args.weather.windMph ?? 0;
  const gustWind = args.weather.gustMph ?? 0;
  return sustainedWind >= 14 || gustWind >= 24;
}

function ratingFromScore(score: number): ScoreRating {
  if (score >= 90) return 'Strong';
  if (score >= 75) return 'Good';
  if (score >= 50) return 'Fair';
  return 'No-go';
}

function weatherLabel(weather: WeatherSnapshot | null): string {
  if (!weather) {
    return 'Unavailable';
  }

  const parts: string[] = [];

  if (typeof weather.conditionLabel === 'string' && weather.conditionLabel.trim()) {
    parts.push(weather.conditionLabel.trim());
  }

  if (typeof weather.windMph === 'number') {
    parts.push(`${Math.round(weather.windMph)} mph wind`);
  }

  if (typeof weather.gustMph === 'number' && weather.gustMph >= 18) {
    parts.push(`gusts ${Math.round(weather.gustMph)} mph`);
  }

  if (typeof weather.next12hPrecipProbabilityMax === 'number' && weather.next12hPrecipProbabilityMax > 0) {
    parts.push(`${Math.round(weather.next12hPrecipProbabilityMax)}% rain risk`);
  }

  if (typeof weather.recentRain24hIn === 'number' && weather.recentRain24hIn >= 0.2) {
    parts.push(`${formatRainInches(weather.recentRain24hIn)} recent rain`);
  }

  if (weather.next12hStormRisk) {
    parts.push('storm signal');
  }

  return parts.length > 0 ? parts.join(', ') : 'Calm';
}

function trendLabel(gauge: GaugeReading): string {
  if (gauge.delta24h === null) {
    return 'Unknown';
  }

  const delta = `${gauge.delta24h >= 0 ? '+' : ''}${formatGauge(gauge.delta24h, gauge.unit)} ${gauge.unit}`;
  return `${titleCase(gauge.trend)} (${delta})`;
}

function titleCase(value: string): string {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

function sourceStrengthViewModel(river: River) {
  return buildSourceStrengthViewModel(river.profile.thresholdSourceStrength, {
    thresholdModel: river.profile.thresholdModel,
    sourceLabel: river.profile.thresholdSource.label,
  });
}

function thresholdModelLabel(model: River['profile']['thresholdModel']): string {
  return model === 'minimum-only' ? 'Minimum-only guidance' : 'Two-sided range';
}

function thresholdModelImpact(model: River['profile']['thresholdModel']): ScoreImpact {
  return model === 'minimum-only' ? 'warning' : 'positive';
}

function thresholdModelDetail(river: River): string {
  if (river.profile.thresholdModel === 'minimum-only') {
    return 'This reach has a known low-water mark, but not a full working range yet.';
  }

  return 'This reach has a preferred range plus low and high bounds.';
}

function formatGauge(value: number, unit: GaugeUnit): string {
  if (unit === 'cfs') {
    return Math.round(value).toLocaleString('en-US');
  }

  return value.toFixed(2).replace(/\.00$/, '');
}

function formatRainInches(value: number | null): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return '--';
  }

  return value < 0.1 ? value.toFixed(2) : value.toFixed(1);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function gaugeBandLabel(band: GaugeBand): string {
  switch (band) {
    case 'ideal':
      return 'Ideal window';
    case 'low-shoulder':
      return 'Low shoulder';
    case 'high-shoulder':
      return 'High shoulder';
    case 'minimum-met':
      return 'Above minimum';
    case 'too-low':
      return 'Too low';
    case 'too-high':
      return 'Too high';
    default:
      return 'Unknown';
  }
}

function buildLiveDataStatus(args: {
  river: River;
  gauge: GaugeReading | null;
  weather: WeatherSnapshot | null;
  now: Date;
}): LiveDataStatus {
  const gaugeStaleMinutes = staleMinutesForGauge(args.river, args.gauge);
  const gauge = freshnessFromObservedAt(args.gauge?.observedAt ?? null, args.now, gaugeStaleMinutes, 'gauge');
  const weather = freshnessFromObservedAt(
    args.weather?.observedAt ?? null,
    args.now,
    WEATHER_STALE_MINUTES,
    'weather'
  );

  if (gauge.state === 'unavailable') {
    return {
      overall: 'offline',
      summary: 'Direct gauge data is unavailable, so this river needs a manual check today.',
      gauge,
      weather,
    };
  }

  if (gauge.state === 'stale' && weather.state === 'stale') {
    return {
      overall: 'degraded',
      summary: `Both the gauge and weather reads are older than the freshness target. Treat this score as a cautious estimate.`,
      gauge,
      weather,
    };
  }

  if (gauge.state === 'stale') {
    return {
      overall: 'degraded',
      summary: `The latest gauge reading is ${formatAge(gauge.ageMinutes)} old, so treat this score as a cautious estimate.`,
      gauge,
      weather,
    };
  }

  if (weather.state === 'stale') {
    return {
      overall: 'degraded',
      summary: `Gauge data is current enough, but the latest weather read is ${formatAge(weather.ageMinutes)} old.`,
      gauge,
      weather,
    };
  }

  if (weather.state === 'unavailable') {
    return {
      overall: 'degraded',
      summary: 'Gauge data is current enough, but weather coverage is unavailable right now.',
      gauge,
      weather,
    };
  }

  return {
    overall: 'live',
    summary: 'Gauge and weather reads are current enough for a solid trip-day read.',
    gauge,
    weather,
  };
}

function staleMinutesForGauge(river: River, gauge: GaugeReading | null): number {
  const matchingSource = [river.gaugeSource, ...(river.fallbackGaugeSources ?? [])].find(
    (source) => source.id === gauge?.sourceId
  );
  if (matchingSource) {
    return staleMinutesForGaugeProvider(matchingSource.provider);
  }

  return staleMinutesForGaugeProvider(river.gaugeSource.provider);
}

function freshnessFromObservedAt(
  observedAt: string | null,
  now: Date,
  staleMinutes: number,
  kind: 'gauge' | 'weather'
): DataFreshness {
  if (!observedAt) {
    return {
      state: 'unavailable',
      ageMinutes: null,
      detail: `No live ${kind} reading is available.`,
    };
  }

  const observedTime = new Date(observedAt).getTime();
  if (!Number.isFinite(observedTime)) {
    return {
      state: 'stale',
      ageMinutes: null,
      detail: `The latest ${kind} timestamp could not be parsed.`,
    };
  }

  const ageMinutes = Math.max(0, Math.round((now.getTime() - observedTime) / 60000));
  if (ageMinutes <= staleMinutes) {
    return {
      state: 'live',
      ageMinutes,
      detail: `Latest ${kind} reading is ${formatAge(ageMinutes)} old.`,
    };
  }

  return {
    state: 'stale',
    ageMinutes,
    detail: `Latest ${kind} reading is ${formatAge(ageMinutes)} old.`,
  };
}

function formatAge(ageMinutes: number | null): string {
  if (ageMinutes === null) {
    return 'unknown';
  }

  if (ageMinutes < 60) {
    return `${ageMinutes}m`;
  }

  const hours = Math.floor(ageMinutes / 60);
  const minutes = ageMinutes % 60;
  if (hours < 24) {
    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return remainingHours === 0 ? `${days}d` : `${days}d ${remainingHours}h`;
}
