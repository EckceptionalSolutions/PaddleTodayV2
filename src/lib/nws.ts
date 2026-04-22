import { fetchJson } from './http';
import type { ForecastWindow, HourlyWeatherPoint, WeatherSnapshot } from './types';

const NWS_HEADERS = {
  'User-Agent': 'PaddleToday/1.0 (hello@paddletoday.com)',
  Accept: 'application/geo+json',
};

type NwsPointResponse = {
  properties?: {
    forecastHourly?: string;
    forecastGridData?: string;
    observationStations?: string;
    timeZone?: string;
  };
};

type NwsPeriod = {
  startTime?: string;
  endTime?: string;
  temperature?: number;
  temperatureUnit?: string;
  probabilityOfPrecipitation?: {
    value?: number | null;
  };
  windSpeed?: string;
  windDirection?: string;
  icon?: string;
  shortForecast?: string;
  isDaytime?: boolean;
};

type NwsHourlyResponse = {
  properties?: {
    periods?: NwsPeriod[];
  };
};

type NwsGridValue = {
  validTime?: string;
  value?: number | null;
};

type NwsGridDataResponse = {
  properties?: {
    probabilityOfPrecipitation?: {
      values?: NwsGridValue[];
    };
    quantitativePrecipitation?: {
      values?: NwsGridValue[];
    };
    windGust?: {
      values?: NwsGridValue[];
    };
  };
};

type NwsStationCollection = {
  features?: Array<{
    properties?: {
      stationIdentifier?: string;
    };
  }>;
};

type NwsObservationResponse = {
  properties?: {
    timestamp?: string;
    textDescription?: string;
    temperature?: { value?: number | null; unitCode?: string };
    windSpeed?: { value?: number | null; unitCode?: string };
    windGust?: { value?: number | null; unitCode?: string };
  };
};

export async function fetchNwsWeatherSnapshot(
  latitude: number,
  longitude: number
): Promise<WeatherSnapshot | null> {
  const point = await fetchJson<NwsPointResponse>(`https://api.weather.gov/points/${latitude},${longitude}`, {
    timeoutMs: 10_000,
    retries: 2,
    headers: NWS_HEADERS,
  });

  const forecastHourlyUrl = point.properties?.forecastHourly;
  const forecastGridDataUrl = point.properties?.forecastGridData;
  const observationStationsUrl = point.properties?.observationStations;
  if (!forecastHourlyUrl || !forecastGridDataUrl) {
    return null;
  }

  const [hourly, gridData, latestObservation] = await Promise.all([
    fetchJson<NwsHourlyResponse>(forecastHourlyUrl, {
      timeoutMs: 10_000,
      retries: 2,
      headers: NWS_HEADERS,
    }),
    fetchJson<NwsGridDataResponse>(forecastGridDataUrl, {
      timeoutMs: 10_000,
      retries: 2,
      headers: NWS_HEADERS,
    }),
    fetchLatestObservation(observationStationsUrl),
  ]);

  const periods = Array.isArray(hourly.properties?.periods) ? hourly.properties.periods : [];
  if (periods.length === 0) {
    return null;
  }

  const nowPeriod = periods[0];
  const observationProps = latestObservation?.properties;
  const observedAt =
    typeof observationProps?.timestamp === 'string' ? observationProps.timestamp : nowPeriod.startTime ?? null;
  const observationTempF = convertTemperatureToF(
    observationProps?.temperature?.value ?? null,
    observationProps?.temperature?.unitCode ?? null
  );
  const observationWindMph = convertSpeedToMph(
    observationProps?.windSpeed?.value ?? null,
    observationProps?.windSpeed?.unitCode ?? null
  );
  const observationGustMph = convertSpeedToMph(
    observationProps?.windGust?.value ?? null,
    observationProps?.windGust?.unitCode ?? null
  );
  const weatherSource = observationProps?.timestamp
    ? 'NWS forecast + station observation'
    : 'NWS forecast';

  const hourlyPoints = buildHourlyForecastPoints({
    periods,
    precipitationValues: Array.isArray(gridData.properties?.probabilityOfPrecipitation?.values)
      ? gridData.properties?.probabilityOfPrecipitation?.values ?? []
      : [],
    precipitationAmounts: Array.isArray(gridData.properties?.quantitativePrecipitation?.values)
      ? gridData.properties?.quantitativePrecipitation?.values ?? []
      : [],
    gustValues: Array.isArray(gridData.properties?.windGust?.values)
      ? gridData.properties?.windGust?.values ?? []
      : [],
  });

  const next12h = hourlyPoints.slice(0, 12);
  const precipProbabilities = next12h
    .map((point) => point.precipProbability)
    .filter((value): value is number => typeof value === 'number');
  const precipAmounts = next12h
    .map((point) => point.precipitationIn)
    .filter((value): value is number => typeof value === 'number');
  const windValues = next12h
    .map((point) => point.windMph)
    .filter((value): value is number => typeof value === 'number');
  const gustValues = next12h
    .map((point) => point.windGustMph)
    .filter((value): value is number => typeof value === 'number');

  const firstRainHour =
    next12h.find((point) => {
      const probability = point.precipProbability ?? 0;
      const amount = point.precipitationIn ?? 0;
      return probability >= 40 || amount >= 0.01 || /(rain|showers|storm|snow)/i.test(point.conditionLabel ?? '');
    }) ?? null;

  const nowTempF =
    observationTempF ??
    (typeof nowPeriod.temperature === 'number' && nowPeriod.temperatureUnit === 'F'
      ? nowPeriod.temperature
      : null);
  const nowWindMph = observationWindMph ?? parseWindSpeedMph(nowPeriod.windSpeed);

  const nowPrecipitationProbability =
    typeof nowPeriod.probabilityOfPrecipitation?.value === 'number'
      ? nowPeriod.probabilityOfPrecipitation.value
      : next12h[0]?.precipProbability ?? null;

  return {
    observedAt,
    temperatureF: nowTempF,
    windMph: nowWindMph,
    gustMph: observationGustMph ?? next12h[0]?.windGustMph ?? null,
    currentPrecipitationIn: null,
    next12hPrecipProbabilityMax: precipProbabilities.length > 0 ? Math.max(...precipProbabilities) : null,
    next12hPrecipitationIn: precipAmounts.length > 0 ? sum(precipAmounts) : null,
    next12hPrecipStartsInHours: firstRainHour
      ? Math.max(0, Math.round((new Date(firstRainHour.time).getTime() - new Date(observedAt ?? firstRainHour.time).getTime()) / 3_600_000))
      : null,
    next12hWindMphMax: windValues.length > 0 ? Math.max(...windValues) : nowWindMph,
    next12hStormRisk: next12h.some((point) => /(storm|thunder)/i.test(point.conditionLabel ?? '')),
    weatherCode: null,
    conditionLabel: observationProps?.textDescription ?? nowPeriod.shortForecast ?? null,
    todayHourly: hourlyPoints.slice(0, 8),
    tomorrow: buildTomorrowWindow(periods),
    weekend: buildWeekendWindow(periods),
    recentRain24hIn: null,
    recentRain72hIn: null,
    precipitationProbabilityNow: nowPrecipitationProbability,
    rainTimingLabel: computeRainTimingLabel(firstRainHour, nowPeriod),
    weatherSource,
    rainfallSource: null,
    waterTempSource: null,
  };
}

async function fetchLatestObservation(observationStationsUrl: string | undefined) {
  if (!observationStationsUrl) {
    return null;
  }

  const stations = await fetchJson<NwsStationCollection>(observationStationsUrl, {
    timeoutMs: 10_000,
    retries: 2,
    headers: NWS_HEADERS,
  });
  const stationId = stations.features?.[0]?.properties?.stationIdentifier;
  if (!stationId) {
    return null;
  }

  return fetchJson<NwsObservationResponse>(
    `https://api.weather.gov/stations/${stationId}/observations/latest`,
    {
      timeoutMs: 10_000,
      retries: 2,
      headers: NWS_HEADERS,
    }
  ).catch(() => null);
}

function buildHourlyForecastPoints(args: {
  periods: NwsPeriod[];
  precipitationValues: NwsGridValue[];
  precipitationAmounts: NwsGridValue[];
  gustValues: NwsGridValue[];
}): HourlyWeatherPoint[] {
  return args.periods
    .filter((period): period is NwsPeriod & { startTime: string } => typeof period.startTime === 'string')
    .slice(0, 12)
    .map((period) => {
      const timestamp = period.startTime;
      return {
        time: timestamp,
        label: new Date(timestamp).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        }),
        isDaytime: typeof period.isDaytime === 'boolean' ? period.isDaytime : null,
        temperatureF:
          typeof period.temperature === 'number' && period.temperatureUnit === 'F' ? period.temperature : null,
        windMph: parseWindSpeedMph(period.windSpeed),
        windGustMph: valueAtTime(args.gustValues, timestamp, convertKmToMph),
        precipProbability:
          typeof period.probabilityOfPrecipitation?.value === 'number'
            ? period.probabilityOfPrecipitation.value
            : valueAtTime(args.precipitationValues, timestamp),
        precipitationIn: valueAtTime(args.precipitationAmounts, timestamp, convertMmToInches),
        weatherCode: null,
        conditionLabel: period.shortForecast ?? null,
      };
    });
}

function buildTomorrowWindow(periods: NwsPeriod[]): ForecastWindow | null {
  const tomorrowDate = addDays(new Date(), 1);
  const tomorrowPeriods = periods.filter((period) => {
    const start = typeof period.startTime === 'string' ? new Date(period.startTime) : null;
    return start && sameDate(start, tomorrowDate);
  });

  return buildForecastWindow('Tomorrow', tomorrowPeriods);
}

function buildWeekendWindow(periods: NwsPeriod[]): ForecastWindow | null {
  const now = new Date();
  const saturday = nextWeekday(now, 6);
  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);
  const weekendPeriods = periods.filter((period) => {
    const start = typeof period.startTime === 'string' ? new Date(period.startTime) : null;
    return start && (sameDate(start, saturday) || sameDate(start, sunday));
  });

  return buildForecastWindow(
    `Weekend (${saturday.toLocaleDateString([], { month: 'short', day: 'numeric' })}-${sunday.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
    })})`,
    weekendPeriods
  );
}

function buildForecastWindow(label: string, periods: NwsPeriod[]): ForecastWindow | null {
  if (periods.length === 0) {
    return null;
  }

  const precip = periods
    .map((period) => period.probabilityOfPrecipitation?.value)
    .filter((value): value is number => typeof value === 'number');
  const temperatures = periods
    .map((period) => (typeof period.temperature === 'number' && period.temperatureUnit === 'F' ? period.temperature : null))
    .filter((value): value is number => typeof value === 'number');
  const winds = periods
    .map((period) => parseWindSpeedMph(period.windSpeed))
    .filter((value): value is number => typeof value === 'number');

  return {
    label,
    startDate: periods[0]?.startTime?.slice(0, 10) ?? null,
    endDate: periods.at(-1)?.endTime?.slice(0, 10) ?? periods.at(-1)?.startTime?.slice(0, 10) ?? null,
    precipProbabilityMax: precip.length > 0 ? Math.max(...precip) : null,
    precipitationIn: null,
    windMphMax: winds.length > 0 ? Math.max(...winds) : null,
    stormRisk: periods.some((period) => /(storm|thunder)/i.test(period.shortForecast ?? '')),
    weatherCode: null,
    temperatureHighF: temperatures.length > 0 ? Math.max(...temperatures) : null,
    temperatureLowF: temperatures.length > 0 ? Math.min(...temperatures) : null,
  };
}

function valueAtTime(
  values: NwsGridValue[],
  timestamp: string,
  transform: (value: number) => number = (value) => value
): number | null {
  const target = new Date(timestamp).getTime();
  for (const entry of values) {
    const bounds = parseValidTime(entry.validTime);
    if (!bounds || bounds.start > target || bounds.end <= target) {
      continue;
    }

    if (typeof entry.value === 'number' && Number.isFinite(entry.value)) {
      return transform(entry.value);
    }
  }

  return null;
}

function parseValidTime(value: string | undefined): { start: number; end: number } | null {
  if (!value) {
    return null;
  }

  const [startRaw, durationRaw] = value.split('/');
  const start = new Date(startRaw).getTime();
  if (!Number.isFinite(start)) {
    return null;
  }

  const hoursMatch = durationRaw?.match(/PT(?:(\d+)H)?(?:(\d+)M)?/i);
  const daysMatch = durationRaw?.match(/P(?:(\d+)D)?(?:T(?:(\d+)H)?)?/i);
  if (!hoursMatch && !daysMatch) {
    return null;
  }

  const days = Number(daysMatch?.[1] ?? 0);
  const hours = Number(hoursMatch?.[1] ?? daysMatch?.[2] ?? 0);
  const minutes = Number(hoursMatch?.[2] ?? 0);
  const durationMs = (((days * 24) + hours) * 60 + minutes) * 60 * 1000;
  if (!Number.isFinite(durationMs) || durationMs <= 0) {
    return null;
  }

  return {
    start,
    end: start + durationMs,
  };
}

function parseWindSpeedMph(raw: string | undefined): number | null {
  if (!raw) {
    return null;
  }

  const matches = [...raw.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) => Number(match[1]));
  if (matches.length === 0) {
    return null;
  }

  return Math.max(...matches);
}

function computeRainTimingLabel(firstRainHour: HourlyWeatherPoint | null, nowPeriod: NwsPeriod): WeatherSnapshot['rainTimingLabel'] {
  if (!firstRainHour) {
    return 'None';
  }

  const hoursUntil = Math.max(
    0,
    Math.round((new Date(firstRainHour.time).getTime() - new Date(nowPeriod.startTime ?? firstRainHour.time).getTime()) / 3_600_000)
  );

  if (hoursUntil <= 1) return 'Imminent';
  if (hoursUntil <= 4) return 'Next few hours';
  return 'Later today';
}

function convertTemperatureToF(value: number | null, unitCode: string | null): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }
  if (unitCode?.includes('degC')) {
    return (value * 9) / 5 + 32;
  }
  if (unitCode?.includes('degF')) {
    return value;
  }
  return null;
}

function convertSpeedToMph(value: number | null, unitCode: string | null): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }

  if (unitCode?.includes('km_h-1')) {
    return convertKmToMph(value);
  }
  if (unitCode?.includes('m_s-1')) {
    return value * 2.23694;
  }
  return value;
}

function convertMmToInches(value: number): number {
  return value / 25.4;
}

function convertKmToMph(value: number): number {
  return value * 0.621371;
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function sameDate(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function nextWeekday(date: Date, weekday: number) {
  const current = date.getDay();
  const delta = ((weekday - current + 7) % 7) || 7;
  return addDays(date, delta);
}
