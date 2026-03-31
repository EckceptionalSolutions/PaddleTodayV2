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
  RiverScoreResult,
  ScoreFactor,
  ScoreImpact,
  ScoreRating,
  WeatherSnapshot,
} from './types';

const GAUGE_STALE_MINUTES = 180;
const WEATHER_STALE_MINUTES = 180;

export function scoreRiverCondition(args: {
  river: River;
  gauge: GaugeReading | null;
  weather: WeatherSnapshot | null;
  now?: Date;
}): RiverScoreResult {
  const now = args.now ?? new Date();
  const liveData = buildLiveDataStatus({
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
  const weatherAssessment = assessWeather(args.weather);
  const seasonAssessment = assessSeason(args.river, now);
  const difficultyAssessment = assessDifficulty(args.river);

  const rawScore =
    gaugeAssessment.points +
    trendAssessment.points +
    weatherAssessment.points +
    seasonAssessment.points +
    difficultyAssessment.points;

  const scoreCap = args.river.profile.thresholdModel === 'minimum-only' ? 74 : 100;
  const score = clamp(Math.round(rawScore), 0, scoreCap);
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
  const outlooks = buildOutlooks({
    river: args.river,
    gauge: args.gauge,
    weather: args.weather,
    confidence,
    liveData,
    currentScore: score,
    gaugeBand: gaugeAssessment.band,
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
    {
      id: 'weather',
      label: 'Weather',
      value: weatherLabel(args.weather),
      detail: weatherAssessment.detail,
      impact: weatherAssessment.impact,
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
      value: sourceStrengthLabel(args.river.profile.thresholdSourceStrength),
      detail: sourceStrengthDetail(args.river),
      impact: sourceStrengthImpact(args.river.profile.thresholdSourceStrength),
    },
    {
      id: 'difficulty',
      label: 'Difficulty',
      value: titleCase(args.river.profile.difficulty),
      detail: args.river.profile.difficultyNotes,
      impact: difficultyAssessment.impact,
    },
    {
      id: 'seasonality',
      label: 'Seasonality',
      value: seasonAssessment.value,
      detail: seasonAssessment.detail,
      impact: seasonAssessment.impact,
    },
  ];

  return {
    river: args.river,
    score,
    rating,
    gaugeBand: gaugeAssessment.band,
    gaugeBandLabel: gaugeBandLabel(gaugeAssessment.band),
    explanation: buildExplanation({
      river: args.river,
      rating,
      gauge: args.gauge,
      gaugeAssessment,
      trendAssessment,
      weatherAssessment,
      difficultyAssessment,
      confidence,
      liveData,
    }),
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
  const weatherAssessment = assessWeather(args.weather);
  const seasonAssessment = assessSeason(args.river, args.now);
  const score = clamp(Math.round(30 + weatherAssessment.points + seasonAssessment.points), 0, 100);
  const confidence = computeConfidence({
    river: args.river,
    gauge: null,
    weather: args.weather,
    liveData: args.liveData,
  });

  return {
    river: args.river,
    score,
    rating: 'Borderline',
    gaugeBand: 'unavailable',
    gaugeBandLabel: 'Unavailable',
    explanation: `${args.river.name} cannot be scored confidently right now. ${args.liveData.summary}`,
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
        detail: weatherAssessment.detail,
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
        value: sourceStrengthLabel(args.river.profile.thresholdSourceStrength),
        detail: sourceStrengthDetail(args.river),
        impact: sourceStrengthImpact(args.river.profile.thresholdSourceStrength),
      },
      {
        id: 'seasonality',
        label: 'Seasonality',
        value: seasonAssessment.value,
        detail: seasonAssessment.detail,
        impact: seasonAssessment.impact,
      },
    ],
    checklist: [
      {
        status: 'skip',
        label: 'Gauge check',
        detail: 'The direct gauge is unavailable right now, so this should be treated as a manual-check river rather than a trusted launch call.',
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
      const points = clamp(18 - ((minimum - current) / Math.max(minimum, 1)) * 34, 0, 18);
      return {
        points,
        impact: 'negative',
        detail: `Below the published minimum of ${formatGauge(minimum, gauge.unit)} ${gauge.unit}. Expect scraping, dragging, or not enough water for a worthwhile run.`,
        band: 'too-low',
        bandDetail: 'Below the published minimum. This is outside the known workable band.',
      };
    }

    return {
      points: 54,
      impact: 'warning',
      detail: `Above the published minimum of ${formatGauge(minimum, gauge.unit)} ${gauge.unit}, but the app does not yet have a defendable upper target or high-water threshold for this reach.`,
      band: 'minimum-met',
      bandDetail: 'Above the published minimum, but upper-range guidance is still incomplete.',
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
    const points = clamp(18 - ((tooLow - current) / Math.max(tooLow, 1)) * 34, 0, 18);
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
      points: 30 + clamp(ratio, 0, 1) * 28,
      impact: 'warning',
      detail: `Below the ideal window but still above the hard low mark. The river is likely paddleable, but not yet in its best band of ${formatGauge(idealMin, gauge.unit)} to ${formatGauge(idealMax, gauge.unit)} ${gauge.unit}.`,
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
          ? `Inside the target window of ${formatGauge(idealMin, gauge.unit)} to ${formatGauge(idealMax, gauge.unit)} ${gauge.unit}, near the middle of the preferred band.`
          : `Inside the target window of ${formatGauge(idealMin, gauge.unit)} to ${formatGauge(idealMax, gauge.unit)} ${gauge.unit}, but closer to the ${edgeBias}.`,
      band: 'ideal',
      bandDetail:
        edgeBias === 'sweet spot'
          ? 'Ideal window, near the middle of the preferred band.'
          : `Ideal window, but closer to the ${edgeBias}.`,
    };
  }

  if (current <= tooHigh) {
    const ratio = (current - idealMax) / Math.max(tooHigh - idealMax, 0.01);
    return {
      points: 58 - clamp(ratio, 0, 1) * 28,
      impact: 'warning',
      detail: 'Above the ideal window but still below the hard high threshold. The river is getting pushier than the preferred band.',
      band: 'high-shoulder',
      bandDetail: 'High shoulder. Still below the hard high threshold, but pushier than the preferred band.',
    };
  }

  const points = clamp(18 - ((current - tooHigh) / Math.max(tooHigh, 1)) * 30, 0, 18);
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

  if (band === 'ideal') {
    if (gauge.trend === 'steady') {
      return {
        points: 8,
        impact: 'positive',
        detail: `${formattedDelta}. Stable flow inside the ideal window is what we want.`,
      };
    }

    if (gauge.trend === 'rising' && river.profile.rainfallSensitivity === 'high') {
      return {
        points: -2,
        impact: 'warning',
        detail: `${formattedDelta}. The river is still in range, but a quick rise lowers confidence on a rain-sensitive reach.`,
      };
    }

    if (gauge.trend === 'falling') {
      return {
        points: 3,
        impact: 'neutral',
        detail: `${formattedDelta}. Still in range, but keep an eye on whether it keeps dropping.`,
      };
    }

    return {
      points: 4,
      impact: 'neutral',
      detail: `${formattedDelta}. The trend is noticeable but not yet a strong problem.`,
    };
  }

  if (band === 'minimum-met') {
    if (gauge.trend === 'steady') {
      return {
        points: 2,
        impact: 'neutral',
        detail: `${formattedDelta}. The river is above its published minimum and not moving sharply.`,
      };
    }

    if (gauge.trend === 'rising' && river.profile.rainfallSensitivity === 'high') {
      return {
        points: -4,
        impact: 'warning',
        detail: `${formattedDelta}. The river is above its minimum, but rising water lowers confidence because upper-range guidance is still incomplete.`,
      };
    }

    if (gauge.trend === 'falling') {
      return {
        points: -3,
        impact: 'warning',
        detail: `${formattedDelta}. The river is above its minimum for now, but falling water can quickly turn a minimum-only reach into a scrapy day.`,
      };
    }

    return {
      points: 0,
      impact: 'neutral',
      detail: `${formattedDelta}. The trend is visible, but incomplete upper guidance keeps this call conservative.`,
    };
  }

  if (band === 'low-shoulder' || band === 'too-low') {
    if (gauge.trend === 'rising') {
      return {
        points: 7,
        impact: 'positive',
        detail: `${formattedDelta}. Rising water helps when the river is still on the low side.`,
      };
    }

    if (gauge.trend === 'falling') {
      return {
        points: -8,
        impact: 'negative',
        detail: `${formattedDelta}. Falling from an already low position pushes this farther from the target band.`,
      };
    }
  }

  if (band === 'high-shoulder' || band === 'too-high') {
    if (gauge.trend === 'falling') {
      return {
        points: 7,
        impact: 'positive',
        detail: `${formattedDelta}. Falling water helps when the river is above its preferred band.`,
      };
    }

    if (gauge.trend === 'rising') {
      return {
        points: -8,
        impact: 'negative',
        detail: `${formattedDelta}. Rising from an already high position is a bad sign.`,
      };
    }
  }

  return {
    points: 0,
    impact: 'neutral',
    detail: `${formattedDelta}. The trend is not strong enough to move the call by itself.`,
  };
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

  let points = 15;
  const notes: string[] = [];
  let impact: ScoreImpact = 'positive';

  if (weather.next12hStormRisk) {
    points -= 7;
    impact = 'negative';
    notes.push('Thunderstorm risk shows up in the next 12 hours.');
  }

  if ((weather.next12hWindMphMax ?? 0) >= 20) {
    points -= 4;
    impact = impact === 'negative' ? 'negative' : 'warning';
    notes.push(`Winds may gust into the ${Math.round(weather.next12hWindMphMax ?? 0)} mph range.`);
  } else if ((weather.next12hWindMphMax ?? 0) >= 14) {
    points -= 2;
    impact = impact === 'negative' ? 'negative' : 'warning';
    notes.push('Wind is noticeable but not automatically a deal-breaker.');
  } else {
    notes.push('Wind looks manageable.');
  }

  if ((weather.next12hPrecipProbabilityMax ?? 0) >= 70 || (weather.next12hPrecipitationIn ?? 0) >= 0.3) {
    points -= 4;
    impact = impact === 'negative' ? 'negative' : 'warning';
    notes.push('Rain odds are high enough to add uncertainty.');
  } else if ((weather.next12hPrecipProbabilityMax ?? 0) >= 40) {
    points -= 2;
    impact = impact === 'negative' ? 'negative' : 'warning';
    notes.push('Some rain is possible, but it does not dominate the call.');
  } else {
    notes.push('No major rain signal is showing up right now.');
  }

  return {
    points: clamp(points, 0, 15),
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

function computeConfidence(args: {
  river: River;
  gauge: GaugeReading | null;
  weather: WeatherSnapshot | null;
  liveData: LiveDataStatus;
}): ConfidenceResult {
  let score = 0.2;
  const rationale: string[] = [];

  if (args.gauge && args.river.gaugeSource.kind === 'direct') {
    score += 0.25;
    rationale.push('Direct USGS gauge for the reach.');
  } else if (args.gauge) {
    score += 0.08;
    rationale.push('Uses a proxy gauge.');
  } else {
    rationale.push('No live gauge reading is available.');
  }

  if (
    args.river.profile.thresholdModel === 'two-sided' &&
    typeof args.river.profile.idealMin === 'number' &&
    typeof args.river.profile.idealMax === 'number'
  ) {
    score += 0.1;
    rationale.push('The river profile has a two-sided ideal window.');
  } else if (
    args.river.profile.thresholdModel === 'minimum-only' &&
    (typeof args.river.profile.tooLow === 'number' || typeof args.river.profile.idealMin === 'number')
  ) {
    score += 0.08;
    rationale.push('A published low-water minimum is defined.');
    score -= 0.03;
    rationale.push('Upper-band and high-water guidance are still incomplete.');
  }

  if (
    args.river.profile.thresholdModel === 'two-sided' &&
    typeof args.river.profile.tooLow === 'number' &&
    typeof args.river.profile.tooHigh === 'number'
  ) {
    score += 0.08;
    rationale.push('Hard low and high bounds are defined.');
  }

  if (args.river.profile.thresholdSourceStrength === 'official') {
    score += 0.14;
    rationale.push('Thresholds come from an official manager or watershed source.');
  } else if (args.river.profile.thresholdSourceStrength === 'mixed') {
    score += 0.08;
    rationale.push('Thresholds are backed by a mix of source types.');
  } else if (args.river.profile.thresholdSourceStrength === 'community') {
    score += 0.03;
    rationale.push('Thresholds are community-sourced rather than manager-published.');
  } else {
    score -= 0.08;
    rationale.push('Thresholds are derived or weakly sourced.');
  }

  if (args.gauge?.trend !== 'unknown') {
    score += 0.05;
    rationale.push('Recent gauge trend is available.');
  }

  if (args.weather?.observedAt && args.liveData.weather.state === 'live') {
    score += 0.05;
    rationale.push('Live weather and short forecast are available.');
  }

  if (args.river.profile.rainfallSensitivity === 'high') {
    score -= 0.05;
    rationale.push('This river changes quickly after rain.');
  }

  if (args.liveData.gauge.state === 'stale') {
    score -= 0.22;
    rationale.push('The latest gauge reading is older than the freshness target.');
  } else if (args.liveData.gauge.state === 'unavailable') {
    score -= 0.28;
    rationale.push('The gauge feed is currently unavailable.');
  }

  if (args.liveData.weather.state === 'stale') {
    score -= 0.08;
    rationale.push('Weather coverage is older than the freshness target.');
  } else if (args.liveData.weather.state === 'unavailable') {
    score -= 0.04;
    rationale.push('Weather coverage is unavailable.');
  }

  score = clamp(score, 0.05, 0.95);

  const label: ConfidenceLabel = score >= 0.78 ? 'High' : score >= 0.58 ? 'Medium' : 'Low';

  return {
    score: Math.round(score * 100),
    label,
    rationale,
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
  currentScore: number;
  gaugeBand: GaugeBand;
}): RiverOutlook[] {
  return [
    buildOutlook({
      id: 'tomorrow',
      window: args.weather?.tomorrow ?? null,
      river: args.river,
      gauge: args.gauge,
      confidence: args.confidence,
      liveData: args.liveData,
      currentScore: args.currentScore,
      gaugeBand: args.gaugeBand,
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
      currentScore: args.currentScore,
      gaugeBand: args.gaugeBand,
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
      explanation: 'Tomorrow is withheld because the direct gauge is unavailable right now.',
    },
    {
      id: 'weekend',
      label: 'Weekend',
      availability: 'withheld',
      score: null,
      rating: null,
      confidence: null,
      explanation: 'Weekend is withheld until the app has a current gauge read and enough confidence to extend the call.',
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
  currentScore: number;
  gaugeBand: GaugeBand;
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
      explanation: `${label} is withheld because forecast coverage for that window is unavailable.`,
    };
  }

  if (args.liveData.overall === 'offline') {
    return {
      id: args.id,
      label,
      availability: 'withheld',
      score: null,
      rating: null,
      confidence: null,
      explanation: `${label} is withheld because the live river read is offline.`,
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
      explanation: `${label} is withheld because this reach only has a defendable low-water floor, not a calibrated two-sided band.`,
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
      explanation: `${label} is withheld because today's confidence is only ${args.confidence.score}/100.`,
    };
  }

  let projectedScore = args.currentScore;
  projectedScore += trendAdjustmentForOutlook(args.gaugeBand, args.gauge, args.id);
  projectedScore += weatherAdjustmentForWindow(args.window, args.id);

  const scoreCap = args.river.profile.thresholdModel === 'minimum-only' ? 74 : 100;
  projectedScore = clamp(Math.round(projectedScore), 0, scoreCap);

  return {
    id: args.id,
    label,
    availability: 'available',
    score: projectedScore,
    rating: ratingFromScore(projectedScore),
    confidence: args.id === 'weekend' && args.confidence.label === 'High' ? 'Medium' : args.confidence.label,
    explanation: outlookExplanation(args.window, args.gaugeBand, args.gauge, args.id),
  };
}

function trendAdjustmentForOutlook(
  band: GaugeBand,
  gauge: GaugeReading,
  windowId: 'tomorrow' | 'weekend'
): number {
  const multiplier = windowId === 'weekend' ? 1.5 : 1;

  if (gauge.trend === 'rising') {
    if (band === 'too-low' || band === 'low-shoulder' || band === 'minimum-met') {
      return Math.round(6 * multiplier);
    }
    if (band === 'high-shoulder' || band === 'too-high') {
      return Math.round(-8 * multiplier);
    }
    return Math.round(-2 * multiplier);
  }

  if (gauge.trend === 'falling') {
    if (band === 'high-shoulder' || band === 'too-high') {
      return Math.round(6 * multiplier);
    }
    if (band === 'too-low' || band === 'low-shoulder' || band === 'minimum-met') {
      return Math.round(-6 * multiplier);
    }
    return Math.round(-2 * multiplier);
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

  return `${trendText} ${weatherText} ${windowId === 'weekend' ? 'Weekend calls stay more conservative than same-day calls.' : 'Tomorrow is a directional read, not a guaranteed launch promise.'}`;
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

  if (weather.next12hStormRisk || (weather.next12hWindMphMax ?? 0) >= 20) {
    return 'skip';
  }

  if ((weather.next12hPrecipProbabilityMax ?? 0) >= 40 || (weather.next12hWindMphMax ?? 0) >= 14) {
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
  if (typeof weather.next12hWindMphMax === 'number') {
    parts.push(`Peak wind looks near ${Math.round(weather.next12hWindMphMax)} mph.`);
  }
  if (typeof weather.next12hPrecipProbabilityMax === 'number') {
    parts.push(`Rain risk peaks around ${Math.round(weather.next12hPrecipProbabilityMax)}%.`);
  }
  return parts.join(' ');
}

function buildExplanation(args: {
  river: River;
  rating: ScoreRating;
  gauge: GaugeReading;
  gaugeAssessment: { band: string };
  trendAssessment: { detail: string };
  weatherAssessment: { detail: string };
  difficultyAssessment: { points: number; detail: string };
  confidence: ConfidenceResult;
  liveData: LiveDataStatus;
}): string {
  const lead =
    args.rating === 'Strong'
      ? `${args.river.name} looks good today.`
      : args.rating === 'Good'
        ? `${args.river.name} is workable today.`
        : args.rating === 'Borderline'
          ? `${args.river.name} is borderline today.`
          : `${args.river.name} looks like a skip today.`;

  const gaugeSentence =
    args.gaugeAssessment.band === 'ideal'
      ? `The gauge is inside the preferred window at ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}.`
      : args.gaugeAssessment.band === 'minimum-met'
        ? `The gauge is above the published minimum at ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}, but high-side guidance is still incomplete.`
      : args.gaugeAssessment.band === 'low-shoulder' || args.gaugeAssessment.band === 'too-low'
        ? `The gauge is still on the low side at ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}.`
        : args.gaugeAssessment.band === 'high-shoulder' || args.gaugeAssessment.band === 'too-high'
          ? `The gauge is on the high side at ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}.`
          : `The gauge reading is ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}, but the flow band still needs manual interpretation.`;

  const confidenceSentence = args.river.profile.confidenceNotes
    ? `Confidence is ${args.confidence.label.toLowerCase()}. ${args.river.profile.confidenceNotes}`
    : `Confidence is ${args.confidence.label.toLowerCase()} because the available source quality and live data coverage are only moderate.`;

  const freshnessSentence =
    args.liveData.overall === 'live' ? '' : ` ${args.liveData.summary}`;
  const difficultySentence =
    args.difficultyAssessment.points < 0
      ? ` ${args.difficultyAssessment.detail}`
      : '';

  return `${lead} ${gaugeSentence} ${args.trendAssessment.detail} ${args.weatherAssessment.detail}${freshnessSentence}${difficultySentence} ${confidenceSentence}`.replace(
    /\s+/g,
    ' '
  ).trim();
}

function ratingFromScore(score: number): ScoreRating {
  if (score >= 80) return 'Strong';
  if (score >= 65) return 'Good';
  if (score >= 45) return 'Borderline';
  return 'No-go';
}

function weatherLabel(weather: WeatherSnapshot | null): string {
  if (!weather) {
    return 'Unavailable';
  }

  const parts: string[] = [];

  if (typeof weather.windMph === 'number') {
    parts.push(`${Math.round(weather.windMph)} mph wind`);
  }

  if (typeof weather.next12hPrecipProbabilityMax === 'number') {
    parts.push(`${Math.round(weather.next12hPrecipProbabilityMax)}% rain risk`);
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

function sourceStrengthLabel(strength: River['profile']['thresholdSourceStrength']): string {
  switch (strength) {
    case 'official':
      return 'Official numeric guidance';
    case 'mixed':
      return 'Mixed-source numeric guidance';
    case 'community':
      return 'Community numeric guidance';
    default:
      return 'Derived numeric guidance';
  }
}

function sourceStrengthImpact(strength: River['profile']['thresholdSourceStrength']): ScoreImpact {
  switch (strength) {
    case 'official':
      return 'positive';
    case 'mixed':
      return 'neutral';
    case 'community':
      return 'warning';
    default:
      return 'warning';
  }
}

function thresholdModelLabel(model: River['profile']['thresholdModel']): string {
  return model === 'minimum-only' ? 'Minimum-only guidance' : 'Two-sided range';
}

function thresholdModelImpact(model: River['profile']['thresholdModel']): ScoreImpact {
  return model === 'minimum-only' ? 'warning' : 'positive';
}

function thresholdModelDetail(river: River): string {
  if (river.profile.thresholdModel === 'minimum-only') {
    return 'This reach currently has a defendable low-water floor, but not a calibrated upper target or high-water cutoff yet.';
  }

  return 'This reach has a calibrated preferred band plus hard low and high bounds.';
}

function sourceStrengthDetail(river: River): string {
  const sourceLabel = river.profile.thresholdSource.label;

  switch (river.profile.thresholdSourceStrength) {
    case 'official':
      return `Threshold guidance comes from an official published source. Current numeric thresholds are anchored by ${sourceLabel}.`;
    case 'mixed':
      return `Thresholds are calibrated from multiple source types rather than a single official range. Current threshold guidance is anchored by ${sourceLabel} and supporting evidence notes.`;
    case 'community':
      return `Thresholds currently lean on community trip reports. Current threshold guidance is anchored by ${sourceLabel}, so keep more margin than the raw score alone implies.`;
    default:
      return `Thresholds are derived from partial evidence rather than a published range. Current threshold guidance is anchored by ${sourceLabel}.`;
  }
}

function formatGauge(value: number, unit: GaugeUnit): string {
  if (unit === 'cfs') {
    return Math.round(value).toLocaleString('en-US');
  }

  return value.toFixed(2).replace(/\.00$/, '');
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
  gauge: GaugeReading | null;
  weather: WeatherSnapshot | null;
  now: Date;
}): LiveDataStatus {
  const gauge = freshnessFromObservedAt(args.gauge?.observedAt ?? null, args.now, GAUGE_STALE_MINUTES, 'gauge');
  const weather = freshnessFromObservedAt(
    args.weather?.observedAt ?? null,
    args.now,
    WEATHER_STALE_MINUTES,
    'weather'
  );

  if (gauge.state === 'unavailable') {
    return {
      overall: 'offline',
      summary: 'Direct gauge data is unavailable, so this is a placeholder rather than a real live river call.',
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
    summary: 'Gauge and weather reads are current enough for a same-day launch call.',
    gauge,
    weather,
  };
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
