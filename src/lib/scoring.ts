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
  const weatherAssessment = assessWeatherAdjustment(args.river, args.weather);
  const temperatureAssessment = assessTemperatureAdjustment(args.river, args.gauge, args.weather, now);
  const comfortAssessment = assessComfortAdjustment(args.river, args.weather, now);
  const riverQuality = computeRiverQuality(args.river, gaugeAssessment, trendAssessment);
  const rawTripScore =
    riverQuality +
    weatherAssessment.points +
    temperatureAssessment.points +
    comfortAssessment.points;
  const scoreBreakdown = buildScoreBreakdown({
    river: args.river,
    weather: args.weather,
    riverQuality,
    riverQualityExplanation: `${gaugeAssessment.detail} ${trendAssessment.detail}`.trim(),
    windAdjustment: weatherAssessment.windPoints,
    temperatureAdjustment: temperatureAssessment.points,
    rainAdjustment: weatherAssessment.rainPoints,
    comfortAdjustment: comfortAssessment.points,
    windExplanation: weatherAssessment.windDetail,
    temperatureExplanation: temperatureAssessment.detail,
    rainExplanation: weatherAssessment.rainDetail,
    comfortExplanation: comfortAssessment.detail,
    rawTripScore,
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
      value: sourceStrengthLabel(args.river.profile.thresholdSourceStrength),
      detail: sourceStrengthDetail(args.river),
      impact: sourceStrengthImpact(args.river.profile.thresholdSourceStrength),
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
        value: sourceStrengthLabel(args.river.profile.thresholdSourceStrength),
        detail: sourceStrengthDetail(args.river),
        impact: sourceStrengthImpact(args.river.profile.thresholdSourceStrength),
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
      const points = clamp(18 - ((minimum - current) / Math.max(minimum, 1)) * 34, 0, 18);
      return {
        points,
        impact: 'negative',
        detail: `Below the known low-water mark of ${formatGauge(minimum, gauge.unit)} ${gauge.unit}. Expect scraping, dragging, or a very thin run.`,
        band: 'too-low',
        bandDetail: 'Below the known low-water mark. This is outside the usual paddling range.',
      };
    }

    return {
      points: 60,
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
      points: 58 - clamp(ratio, 0, 1) * 28,
      impact: 'warning',
      detail: 'Above the preferred window, but still below the hard high threshold. The current is starting to get pushier than the sweet spot.',
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
        detail: `${formattedDelta}. It's holding steady in the target range, which is a good sign.`,
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
        detail: `${formattedDelta}. The river is above its low-water mark and not changing sharply.`,
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
    detail: formattedDelta,
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
  trendAssessment: { points: number }
): number {
  const scoreCap = river.profile.thresholdModel === 'minimum-only' ? 74 : 100;
  return clamp(Math.round(gaugeAssessment.points + trendAssessment.points), 0, scoreCap);
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

  const precipTimingPenalty =
    weather.rainTimingLabel === 'Imminent'
      ? -5
      : weather.rainTimingLabel === 'Next few hours'
        ? -4
        : weather.rainTimingLabel === 'Later today'
          ? -2
          : typeof weather.next12hPrecipStartsInHours === 'number'
            ? weather.next12hPrecipStartsInHours <= 3
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
    temp < 35 ? -12 : temp < 50 ? -6 : temp < 65 ? -2 : temp <= 85 ? 0 : temp <= 92 ? -4 : -8;
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
    detail:
      points < 0
        ? temp < 35
          ? `Air temperature is near freezing at ${Math.round(temp)} degrees F, which makes this a tougher same-day call${coldSeasonMultiplier > 1 ? ' in shoulder season' : ''}.`
          : `Air temperature is ${Math.round(temp)} degrees F, which makes this a weaker same-day call${coldSeasonMultiplier > 1 ? ' in shoulder season' : ''}.`
        : `Air temperature is ${Math.round(temp)} degrees F and isn't a big problem for today.`,
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
}): RiverScoreResult['scoreBreakdown'] {
  let finalScore = Math.round(args.rawTripScore);
  const capReasons: string[] = [];

  if (typeof args.weather?.temperatureF === 'number' && args.weather.temperatureF < 35) {
    finalScore = Math.min(finalScore, 70);
    capReasons.push('Near-freezing air caps today at 70.');
  }

  if ((args.weather?.gustMph ?? 0) >= 30 || (args.weather?.next12hWindMphMax ?? 0) > 20) {
    finalScore = Math.min(finalScore, 75);
    capReasons.push('High wind caps today at 75.');
  }

  if (
    ((args.weather?.next12hPrecipProbabilityMax ?? 0) > 60 &&
      typeof args.weather?.next12hPrecipStartsInHours === 'number' &&
      args.weather.next12hPrecipStartsInHours <= 3) ||
    args.weather?.rainTimingLabel === 'Imminent'
  ) {
    finalScore = Math.min(finalScore, 65);
    capReasons.push('Imminent heavy rain caps today at 65.');
  }

  if (args.river.profile.thresholdModel === 'minimum-only') {
    finalScore = Math.min(finalScore, 74);
    capReasons.push('Minimum-only guidance caps the trip score at 74.');
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

  if (args.gauge && args.river.gaugeSource.kind === 'direct') {
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
    reasons.push('A low-water mark is defined.');
    score -= 0.03;
    warnings.push('Upper range is still estimated.');
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
      explanation: 'Tomorrow is hidden because the direct gauge is unavailable right now.',
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
      explanation: `${label} is hidden because forecast coverage for that window is unavailable.`,
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
      explanation: `${label} is hidden because the live river read is offline.`,
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
      explanation: `${label} is hidden because today's confidence is only ${args.confidence.score}/100.`,
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

  return `${trendText} ${weatherText} ${windowId === 'weekend' ? 'Weekend outlooks stay a little more conservative.' : 'Tomorrow is an early read, not a promise.'}`;
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
      ? `${args.river.name} is in shape, but harsh weather makes it a harder sell today.`
      : args.rating === 'Strong'
      ? `${args.river.name} looks good today.`
      : args.rating === 'Good'
        ? `${args.river.name} is workable today.`
        : args.rating === 'Fair'
          ? `${args.river.name} is fair today.`
          : `${args.river.name} looks like a skip today.`;

  const gaugeSentence =
    args.gaugeAssessment.band === 'ideal'
      ? `The gauge is inside the preferred window at ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}.`
      : args.gaugeAssessment.band === 'minimum-met'
        ? `The gauge is above the low-water mark at ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}, but the upper end is still uncertain.`
      : args.gaugeAssessment.band === 'low-shoulder' || args.gaugeAssessment.band === 'too-low'
        ? `The gauge is still on the low side at ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}.`
        : args.gaugeAssessment.band === 'high-shoulder' || args.gaugeAssessment.band === 'too-high'
          ? `The gauge is on the high side at ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}.`
          : `The gauge reading is ${formatGauge(args.gauge.current, args.gauge.unit)} ${args.gauge.unit}, but the flow band still needs manual interpretation.`;

  const confidenceSentence = args.river.profile.confidenceNotes
    ? `Confidence in today's call is ${args.confidence.label.toLowerCase()}. ${args.river.profile.confidenceNotes}`
    : `Confidence in today's call is ${args.confidence.label.toLowerCase()} because the available source quality and live data coverage are only moderate.`;

  const freshnessSentence =
    args.liveData.overall === 'live' ? '' : ` ${args.liveData.summary}`;
  const comfortSentence =
    args.comfortAssessment.points < 0
      ? ` ${args.comfortAssessment.detail}`
      : '';

  return `${lead} ${gaugeSentence} ${args.trendAssessment.detail} ${args.weatherAssessment.detail} ${args.temperatureAssessment.detail}${freshnessSentence}${comfortSentence} ${confidenceSentence}`.replace(
    /\s+/g,
    ' '
  ).trim();
}

function ratingFromScore(score: number): ScoreRating {
  if (score >= 90) return 'Strong';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Fair';
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
    return 'This reach has a known low-water mark, but not a full working range yet.';
  }

  return 'This reach has a preferred range plus low and high bounds.';
}

function sourceStrengthDetail(river: River): string {
  const sourceLabel = river.profile.thresholdSource.label;

  switch (river.profile.thresholdSourceStrength) {
    case 'official':
      return `Threshold guidance comes from an official published source. Current numeric thresholds are anchored by ${sourceLabel}.`;
    case 'mixed':
      return `Thresholds are built from multiple source types rather than one official range. Current guidance is anchored by ${sourceLabel} and supporting notes.`;
    case 'community':
      return `Thresholds currently lean on community trip reports. Current guidance is anchored by ${sourceLabel}, so leave yourself extra margin.`;
    default:
      return `Thresholds are built from partial evidence rather than a published range. Current guidance is anchored by ${sourceLabel}.`;
  }
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
