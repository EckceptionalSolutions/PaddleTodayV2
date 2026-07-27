import type { HourlyWeatherPoint, WeatherSnapshot } from './index';

export type HourlyWeatherConditionKind = 'storm' | 'rain' | 'cold' | 'clear' | 'mixed';
export type HourlyWeatherRiskLevel = 'clear' | 'watch' | 'skip';
export type HourlyWeatherRiskKind = 'clear' | 'rain' | 'storm' | 'wind';
export type HourlyWeatherTimingTone = 'open' | 'watch' | 'skip';
export type HourlyWeatherTimingBadgeKind = 'clear' | 'clock' | 'storm' | 'alert';

export interface HourlyWeatherRisk {
  level: HourlyWeatherRiskLevel;
  kind: HourlyWeatherRiskKind;
}

export type HourlyWeatherPointViewModel = HourlyWeatherPoint & {
  displayLabel: string;
  risk: HourlyWeatherRisk;
};

export interface HourlyWeatherTimingViewModel {
  points: HourlyWeatherPointViewModel[];
  title: string;
  summary: string;
  tone: HourlyWeatherTimingTone;
  badgeLabel: string;
  badgeKind: HourlyWeatherTimingBadgeKind;
}

type HourlyWeatherConditionInput =
  | HourlyWeatherPoint
  | string
  | number
  | null
  | undefined;

export function hourlyWeatherConditionKind(
  input: HourlyWeatherConditionInput,
): HourlyWeatherConditionKind {
  const condition = typeof input === 'object' && input !== null
    ? input.conditionLabel ?? input.weatherCode
    : input;

  if (typeof condition === 'string' && condition.trim()) {
    const label = condition.trim();
    if (/storm|thunder/i.test(label)) return 'storm';
    if (/snow|flurr/i.test(label)) return 'cold';
    if (/rain|shower/i.test(label)) return 'rain';
    if (/clear|sun/i.test(label)) return 'clear';
    return 'mixed';
  }

  const code = typeof condition === 'number' && Number.isFinite(condition)
    ? condition
    : null;
  if (code === null) return 'mixed';
  if ([95, 96, 99].includes(code)) return 'storm';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'cold';
  if (code === 0) return 'clear';
  return 'mixed';
}

export function classifyHourlyWeatherRisk(point: HourlyWeatherPoint): HourlyWeatherRisk {
  const condition = point.conditionLabel ?? '';
  const rain = point.precipProbability ?? 0;
  const precipitation = point.precipitationIn ?? 0;
  const sustainedWind = point.windMph ?? 0;
  const gust = point.windGustMph ?? 0;

  if (/(storm|thunder)/i.test(condition)) {
    return { level: 'skip', kind: 'storm' };
  }
  if (rain >= 60 || precipitation >= 0.08) {
    return { level: 'skip', kind: 'rain' };
  }
  if (sustainedWind >= 22 || gust >= 30) {
    return { level: 'skip', kind: 'wind' };
  }
  if (rain >= 35 || precipitation >= 0.02 || /(rain|showers)/i.test(condition)) {
    return { level: 'watch', kind: 'rain' };
  }
  if (sustainedWind >= 16 || gust >= 24) {
    return { level: 'watch', kind: 'wind' };
  }
  return { level: 'clear', kind: 'clear' };
}

export function formatHourlyWeatherLabel(
  value: string,
  defaultLabel: string | null | undefined,
): string {
  if (defaultLabel?.trim()) {
    return normalizeHourlyLabel(defaultLabel);
  }

  const parsed = new Date(value);
  if (Number.isFinite(parsed.getTime())) {
    return parsed.toLocaleTimeString('en-US', { hour: 'numeric' });
  }

  return 'Later';
}

export function findFirstHourlyRain(
  weather: Pick<WeatherSnapshot, 'todayHourly'> | null | undefined,
): HourlyWeatherPoint | null {
  if (!weather || !Array.isArray(weather.todayHourly)) {
    return null;
  }

  return weather.todayHourly.find((point) => {
    const chance = point.precipProbability ?? 0;
    const accumulation = point.precipitationIn ?? 0;
    return chance >= 40 || accumulation >= 0.01;
  }) ?? null;
}

export function buildHourlyWeatherTimingViewModel(
  weather: WeatherSnapshot | null | undefined,
): HourlyWeatherTimingViewModel | null {
  const points = (weather?.todayHourly ?? []).slice(0, 8).map((point) => ({
    ...point,
    displayLabel: formatHourlyWeatherLabel(point.time, point.label),
    risk: classifyHourlyWeatherRisk(point),
  }));

  if (!weather || points.length === 0) {
    return null;
  }

  const firstRiskIndex = points.findIndex((point) => point.risk.level !== 'clear');
  const firstRiskPoint = firstRiskIndex >= 0 ? points[firstRiskIndex] : null;
  const firstRisk = firstRiskPoint?.risk ?? null;
  const stormRisk = weather.next12hStormRisk
    || points.some((point) => point.risk.kind === 'storm');
  const firstRiskTime = firstRiskPoint?.displayLabel ?? null;
  const riskLabel = firstRisk?.kind === 'storm'
    ? 'storm risk'
    : firstRisk?.kind === 'rain'
      ? 'rain risk'
      : 'wind';

  if (firstRiskIndex === -1) {
    return {
      points,
      title: 'Good weather window',
      summary: 'No rain, storms, or strong wind are showing in the next few hours. Still re-check conditions before launch.',
      tone: 'open',
      badgeLabel: 'Open',
      badgeKind: 'clear',
    };
  }

  if (firstRiskIndex >= 3 && firstRiskTime) {
    return {
      points,
      title: `Aim to be off before ${firstRiskTime}`,
      summary: `${riskLabel} starts later in the forecast. A short paddle may still fit if shuttle, pace, and exit timing are conservative.`,
      tone: 'watch',
      badgeLabel: stormRisk ? 'Storm later' : 'Later risk',
      badgeKind: stormRisk ? 'storm' : 'clock',
    };
  }

  return {
    points,
    title: firstRiskTime ? `Weather risk near ${firstRiskTime}` : 'Weather needs attention',
    summary: stormRisk
      ? 'Storm risk is close enough that this should be treated as a launch-time safety check, not just an afternoon forecast note.'
      : 'Rain or wind risk is early in the forecast. Confirm the latest radar and be ready to shorten or skip.',
    tone: 'skip',
    badgeLabel: stormRisk ? 'Storm watch' : 'Check now',
    badgeKind: stormRisk ? 'storm' : 'alert',
  };
}

function normalizeHourlyLabel(value: string): string {
  return value
    .replace(/â€¢/g, ' - ')
    .replace(/�+/g, ' - ')
    .replace(/Â·/g, ' - ')
    .replace(/·/g, ' - ')
    .replace(/â€¦/g, '...')
    .replace(/…/g, '...')
    .replace(/Â°F/g, '°F')
    .replace(/Â/g, '')
    .replace(/\s+-\s+-\s+/g, ' - ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
