import { fetchJson } from './http';
import type { ForecastWindow, WeatherSnapshot } from './types';

type OpenMeteoResponse = {
  current?: {
    time?: string;
    temperature_2m?: number;
    precipitation?: number;
    wind_speed_10m?: number;
    wind_gusts_10m?: number;
    weather_code?: number;
  };
  hourly?: {
    time?: string[];
    precipitation_probability?: number[];
    precipitation?: number[];
    weather_code?: number[];
    wind_speed_10m?: number[];
  };
  daily?: {
    time?: string[];
    precipitation_probability_max?: number[];
    precipitation_sum?: number[];
    weather_code?: number[];
    wind_speed_10m_max?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
  };
};

export async function fetchWeatherSnapshot(latitude: number, longitude: number): Promise<WeatherSnapshot | null> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(latitude));
  url.searchParams.set('longitude', String(longitude));
  url.searchParams.set('current', 'temperature_2m,precipitation,wind_speed_10m,wind_gusts_10m,weather_code');
  url.searchParams.set('hourly', 'precipitation_probability,precipitation,weather_code,wind_speed_10m');
  url.searchParams.set(
    'daily',
    'precipitation_probability_max,precipitation_sum,weather_code,wind_speed_10m_max,temperature_2m_max,temperature_2m_min'
  );
  url.searchParams.set('forecast_hours', '24');
  url.searchParams.set('forecast_days', '7');
  url.searchParams.set('temperature_unit', 'fahrenheit');
  url.searchParams.set('wind_speed_unit', 'mph');
  url.searchParams.set('precipitation_unit', 'inch');
  url.searchParams.set('timezone', 'auto');

  const data = await fetchJson<OpenMeteoResponse>(url.toString(), {
    timeoutMs: 10_000,
    retries: 2,
  });

  const current = data.current;
  if (!current) {
    return null;
  }

  const precipitationProbabilities = numericSeries(data.hourly?.precipitation_probability);
  const hourlyPrecipitation = numericSeries(data.hourly?.precipitation);
  const hourlyWeatherCodes = numericSeries(data.hourly?.weather_code);
  const hourlyWind = numericSeries(data.hourly?.wind_speed_10m);
  const hourlyTimes = Array.isArray(data.hourly?.time) ? data.hourly.time : [];
  const daily = indexDaily(data.daily);
  const currentDate = current.time ? String(current.time).slice(0, 10) : null;

  return {
    observedAt: typeof current.time === 'string' ? current.time : null,
    temperatureF: toNullableNumber(current.temperature_2m),
    windMph: toNullableNumber(current.wind_speed_10m),
    gustMph: toNullableNumber(current.wind_gusts_10m),
    currentPrecipitationIn: toNullableNumber(current.precipitation),
    next12hPrecipProbabilityMax: maxValue(precipitationProbabilities),
    next12hPrecipitationIn: sumValues(hourlyPrecipitation),
    next12hPrecipStartsInHours: firstPrecipSignalHours({
      currentTime: typeof current.time === 'string' ? current.time : null,
      hourlyTimes,
      hourlyPrecipitation,
      precipitationProbabilities,
    }),
    next12hWindMphMax: maxValue(hourlyWind),
    next12hStormRisk: hourlyWeatherCodes.some((code) => isStormCode(code)),
    weatherCode: toNullableNumber(current.weather_code),
    tomorrow: currentDate ? buildTomorrowWindow(daily, currentDate) : null,
    weekend: currentDate ? buildWeekendWindow(daily, currentDate) : null,
  };
}

function numericSeries(values: number[] | undefined): number[] {
  return Array.isArray(values)
    ? values.filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
    : [];
}

function toNullableNumber(value: number | undefined): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function maxValue(values: number[]): number | null {
  return values.length > 0 ? Math.max(...values) : null;
}

function sumValues(values: number[]): number | null {
  if (values.length === 0) {
    return null;
  }

  return values.reduce((sum, value) => sum + value, 0);
}

function isStormCode(code: number): boolean {
  return code === 95 || code === 96 || code === 99;
}

function indexDaily(
  daily:
    | {
        time?: string[];
        precipitation_probability_max?: number[];
        precipitation_sum?: number[];
        weather_code?: number[];
        wind_speed_10m_max?: number[];
        temperature_2m_max?: number[];
        temperature_2m_min?: number[];
      }
    | undefined
): Map<string, ForecastWindow> {
  const dates = Array.isArray(daily?.time) ? daily.time : [];
  const map = new Map<string, ForecastWindow>();

  for (let index = 0; index < dates.length; index += 1) {
    const date = dates[index];
    if (typeof date !== 'string') continue;
    const weatherCode = nthNumber(daily?.weather_code, index);
    map.set(date, {
      label: date,
      startDate: date,
      endDate: date,
      precipProbabilityMax: nthNumber(daily?.precipitation_probability_max, index),
      precipitationIn: nthNumber(daily?.precipitation_sum, index),
      windMphMax: nthNumber(daily?.wind_speed_10m_max, index),
      stormRisk: weatherCode !== null ? isStormCode(weatherCode) : false,
      weatherCode,
      temperatureHighF: nthNumber(daily?.temperature_2m_max, index),
      temperatureLowF: nthNumber(daily?.temperature_2m_min, index),
    });
  }

  return map;
}

function buildTomorrowWindow(
  daily: Map<string, ForecastWindow>,
  currentDate: string
): ForecastWindow | null {
  const tomorrowDate = addDays(currentDate, 1);
  const window = daily.get(tomorrowDate);
  if (!window) {
    return null;
  }

  return {
    ...window,
    label: 'Tomorrow',
  };
}

function buildWeekendWindow(
  daily: Map<string, ForecastWindow>,
  currentDate: string
): ForecastWindow | null {
  const current = new Date(`${currentDate}T12:00:00`);
  if (!Number.isFinite(current.getTime())) {
    return null;
  }

  const currentDay = current.getDay();
  const saturdayOffset = ((6 - currentDay + 7) % 7) || 7;
  const saturdayDate = addDays(currentDate, saturdayOffset);
  const sundayDate = addDays(saturdayDate, 1);
  const saturday = daily.get(saturdayDate);
  const sunday = daily.get(sundayDate);

  if (!saturday && !sunday) {
    return null;
  }

  return {
    label: `Weekend (${formatMonthDay(saturdayDate)}-${formatMonthDay(sundayDate)})`,
    startDate: saturdayDate,
    endDate: sundayDate,
    precipProbabilityMax: maxValue(
      [saturday?.precipProbabilityMax, sunday?.precipProbabilityMax].filter(
        (value): value is number => typeof value === 'number'
      )
    ),
    precipitationIn: sumValues(
      [saturday?.precipitationIn, sunday?.precipitationIn].filter(
        (value): value is number => typeof value === 'number'
      )
    ),
    windMphMax: maxValue(
      [saturday?.windMphMax, sunday?.windMphMax].filter((value): value is number => typeof value === 'number')
    ),
    stormRisk: Boolean(saturday?.stormRisk || sunday?.stormRisk),
    weatherCode: saturday?.weatherCode ?? sunday?.weatherCode ?? null,
    temperatureHighF: maxValue(
      [saturday?.temperatureHighF, sunday?.temperatureHighF].filter(
        (value): value is number => typeof value === 'number'
      )
    ),
    temperatureLowF: minValue(
      [saturday?.temperatureLowF, sunday?.temperatureLowF].filter(
        (value): value is number => typeof value === 'number'
      )
    ),
  };
}

function nthNumber(values: number[] | undefined, index: number): number | null {
  const value = values?.[index];
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function addDays(date: string, days: number): string {
  const parsed = new Date(`${date}T12:00:00`);
  parsed.setDate(parsed.getDate() + days);
  return parsed.toISOString().slice(0, 10);
}

function formatMonthDay(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function minValue(values: number[]): number | null {
  return values.length > 0 ? Math.min(...values) : null;
}

function firstPrecipSignalHours(args: {
  currentTime: string | null;
  hourlyTimes: string[];
  hourlyPrecipitation: number[];
  precipitationProbabilities: number[];
}): number | null {
  if (!args.currentTime) {
    return null;
  }

  const currentTimestamp = new Date(args.currentTime).getTime();
  if (!Number.isFinite(currentTimestamp)) {
    return null;
  }

  for (let index = 0; index < args.hourlyTimes.length; index += 1) {
    const timestamp = new Date(args.hourlyTimes[index] ?? '').getTime();
    if (!Number.isFinite(timestamp)) {
      continue;
    }

    const hoursUntil = (timestamp - currentTimestamp) / 3_600_000;
    if (hoursUntil < 0 || hoursUntil > 12) {
      continue;
    }

    const precipProbability = args.precipitationProbabilities[index] ?? 0;
    const precipitation = args.hourlyPrecipitation[index] ?? 0;
    if (precipProbability >= 40 || precipitation >= 0.01) {
      return Math.round(hoursUntil * 10) / 10;
    }
  }

  return null;
}
