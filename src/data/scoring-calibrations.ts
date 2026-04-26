import type { GaugeReading, ScoreRating, WeatherSnapshot } from '../lib/types';

export interface ScoringCalibrationCase {
  id: string;
  routeSlug: string;
  label: string;
  paddledOn: string;
  now: string;
  observedVerdict: string;
  observedNotes: string[];
  previousAppScore?: {
    score: number;
    rating: ScoreRating;
  };
  expected: {
    rating: ScoreRating;
    scoreMin: number;
    scoreMax: number;
    gaugeBand: string;
  };
  gauge: GaugeReading;
  weather: WeatherSnapshot;
}

export const scoringCalibrationCases: ScoringCalibrationCase[] = [
  {
    id: '2026-04-25-st-croix-interstate-osceola',
    routeSlug: 'st-croix-river-interstate-osceola',
    label: 'Taylors Falls to Osceola real paddle',
    paddledOn: '2026-04-25',
    now: '2026-04-25T17:23:00Z',
    observedVerdict: 'Fair to good; definitely paddleable.',
    observedNotes: [
      'Cloudy and slightly windy, but weather was not a major detractor.',
      'Water was slightly low, but the river was very passable.',
      'Higher water and sunnier or warmer weather would have improved the day.',
    ],
    previousAppScore: {
      score: 54,
      rating: 'No-go',
    },
    expected: {
      rating: 'Fair',
      scoreMin: 60,
      scoreMax: 74,
      gaugeBand: 'minimum-met',
    },
    gauge: {
      sourceId: 'usgs-05340500',
      observedAt: '2026-04-25T16:00:00Z',
      current: 5350,
      unit: 'cfs',
      trend: 'steady',
      delta24h: 200,
      changePercent24h: 4,
      recentSamples: [],
      gaugeHeightNow: 4.36,
      dischargeNow: 5350,
      waterTempF: 59,
      waterTempObservedAt: '2026-04-25T16:00:00Z',
      gaugeSource: 'USGS Water Data',
      waterTempSource: 'USGS Water Data',
    },
    weather: {
      observedAt: '2026-04-25T17:15:00Z',
      temperatureF: 56,
      windMph: 5,
      gustMph: 7,
      currentPrecipitationIn: 0,
      next12hPrecipProbabilityMax: 19,
      next12hPrecipitationIn: 0,
      next12hPrecipStartsInHours: 6,
      next12hWindMphMax: 5,
      next12hStormRisk: false,
      weatherCode: 3,
      conditionLabel: 'Clouds',
      todayHourly: [],
      tomorrow: {
        label: 'Tomorrow',
        startDate: '2026-04-26',
        endDate: '2026-04-26',
        precipProbabilityMax: 25,
        precipitationIn: 0.03,
        windMphMax: 9,
        stormRisk: false,
        weatherCode: 3,
        temperatureHighF: 60,
        temperatureLowF: 44,
      },
      weekend: null,
      recentRain24hIn: 0,
      recentRain72hIn: 0.4,
      precipitationProbabilityNow: 0,
      rainTimingLabel: 'Later today',
      weatherSource: 'Paddle Today PDF snapshot',
      rainfallSource: 'Paddle Today PDF snapshot',
      waterTempSource: 'USGS Water Data',
    },
  },
];
