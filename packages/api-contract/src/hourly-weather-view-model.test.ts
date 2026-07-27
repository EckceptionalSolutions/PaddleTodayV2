import { describe, expect, it } from 'vitest';
import type { HourlyWeatherPoint, WeatherSnapshot } from './index';
import {
  buildHourlyWeatherTimingViewModel,
  classifyHourlyWeatherRisk,
  findFirstHourlyRain,
  formatHourlyWeatherLabel,
  hourlyWeatherConditionKind,
} from './hourly-weather-view-model';

function point(overrides: Partial<HourlyWeatherPoint> = {}): HourlyWeatherPoint {
  return {
    time: '2026-07-27T09:00:00-05:00',
    label: '9 AM',
    isDaytime: true,
    temperatureF: 72,
    windMph: 6,
    windGustMph: 9,
    precipProbability: 5,
    precipitationIn: 0,
    weatherCode: 0,
    conditionLabel: 'Clear',
    ...overrides,
  };
}

function weather(
  points: HourlyWeatherPoint[],
  overrides: Partial<WeatherSnapshot> = {},
): WeatherSnapshot {
  return {
    observedAt: '2026-07-27T08:00:00-05:00',
    temperatureF: 70,
    windMph: 6,
    gustMph: 9,
    currentPrecipitationIn: 0,
    next12hPrecipProbabilityMax: 5,
    next12hPrecipitationIn: 0,
    next12hPrecipStartsInHours: null,
    next12hWindMphMax: 9,
    next12hStormRisk: false,
    weatherCode: 0,
    conditionLabel: 'Clear',
    todayHourly: points,
    tomorrow: null,
    weekend: null,
    recentRain24hIn: 0,
    recentRain72hIn: 0,
    precipitationProbabilityNow: 5,
    rainTimingLabel: 'None',
    weatherSource: 'test',
    rainfallSource: null,
    waterTempSource: null,
    ...overrides,
  };
}

describe('hourly weather view models', () => {
  it('classifies condition codes and mobile weather-risk thresholds', () => {
    expect(hourlyWeatherConditionKind(95)).toBe('storm');
    expect(hourlyWeatherConditionKind('Snow flurries')).toBe('cold');
    expect(classifyHourlyWeatherRisk(point({ conditionLabel: 'Thunderstorms' }))).toEqual({
      level: 'skip',
      kind: 'storm',
    });
    expect(classifyHourlyWeatherRisk(point({ precipProbability: 35 }))).toEqual({
      level: 'watch',
      kind: 'rain',
    });
    expect(classifyHourlyWeatherRisk(point({ windGustMph: 30 }))).toEqual({
      level: 'skip',
      kind: 'wind',
    });
  });

  it('builds open, later-risk, and early-risk timing decisions', () => {
    const clearPoints = [point(), point({ time: '2026-07-27T10:00:00-05:00', label: '10 AM' })];
    expect(buildHourlyWeatherTimingViewModel(weather(clearPoints))).toMatchObject({
      title: 'Good weather window',
      tone: 'open',
      badgeLabel: 'Open',
      badgeKind: 'clear',
    });

    const laterStorm = [
      point(),
      point({ label: '10 AM' }),
      point({ label: '11 AM' }),
      point({ label: 'Noon', conditionLabel: 'Thunderstorms' }),
    ];
    expect(buildHourlyWeatherTimingViewModel(weather(laterStorm))).toMatchObject({
      title: 'Aim to be off before Noon',
      tone: 'watch',
      badgeLabel: 'Storm later',
      badgeKind: 'storm',
    });

    const earlyWind = [point({ label: 'Now', windMph: 22 })];
    expect(buildHourlyWeatherTimingViewModel(weather(earlyWind))).toMatchObject({
      title: 'Weather risk near Now',
      tone: 'skip',
      badgeLabel: 'Check now',
      badgeKind: 'alert',
    });
  });

  it('finds first meaningful rain and formats fallback hour labels', () => {
    const firstRain = point({ label: '2 PM', precipProbability: 40 });
    expect(findFirstHourlyRain(weather([point(), firstRain]))).toBe(firstRain);
    expect(formatHourlyWeatherLabel('not-a-date', '')).toBe('Later');
    expect(formatHourlyWeatherLabel('not-a-date', '  2 PM  ')).toBe('2 PM');
    expect(buildHourlyWeatherTimingViewModel(null)).toBeNull();
  });
});
