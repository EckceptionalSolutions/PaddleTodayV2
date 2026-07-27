import type {
  ChecklistStatus,
  LiveDataStatus,
  RiverDetailApiResult,
  WeatherSnapshot,
} from './index';

export type RiverWeatherRiskState = 'calm' | 'wind' | 'rain' | 'cold' | 'storm';

export interface RiverWeatherViewModel {
  state: RiverWeatherRiskState;
  label: string;
  summaryValue: string;
  compactValue: string;
  conditionLabel: string;
  rainChancePercent: number | null;
  windMph: number | null;
  temperatureF: number | null;
}

export interface RiverReadinessViewModel {
  verdict: ChecklistStatus;
  verdictLabel: 'Go' | 'Watch' | 'Skip';
  summary: string;
  note: string;
  effectiveLiveData: LiveDataStatus;
  weather: RiverWeatherViewModel;
  accessLabel: string;
}

export interface RiverReadinessViewModelOptions {
  now?: number;
  staleAfterHours?: number;
}

function roundedFinite(value: number | null | undefined) {
  return typeof value === 'number' && Number.isFinite(value) ? Math.round(value) : null;
}

function weatherRiskState(weather: WeatherSnapshot | null | undefined): RiverWeatherRiskState {
  if (!weather) return 'calm';

  const rainChance = weather.next12hPrecipProbabilityMax;
  const wind = weather.next12hWindMphMax ?? weather.windMph;
  const temperature = weather.temperatureF;

  if (weather.next12hStormRisk) return 'storm';
  if (typeof temperature === 'number' && temperature <= 40) return 'cold';
  if (typeof rainChance === 'number' && rainChance >= 45) return 'rain';
  if (typeof wind === 'number' && wind >= 14) return 'wind';
  return 'calm';
}

function weatherRiskLabel(state: RiverWeatherRiskState) {
  switch (state) {
    case 'storm':
      return 'Storm risk';
    case 'rain':
      return 'Rain possible';
    case 'cold':
      return 'Cold weather';
    case 'wind':
      return 'Wind watch';
    default:
      return 'Calm weather';
  }
}

export function buildRiverWeatherViewModel(
  weather: WeatherSnapshot | null | undefined
): RiverWeatherViewModel {
  if (!weather) {
    return {
      state: 'calm',
      label: 'Weather unavailable',
      summaryValue: 'Weather unavailable',
      compactValue: 'Unknown',
      conditionLabel: 'No forecast',
      rainChancePercent: null,
      windMph: null,
      temperatureF: null,
    };
  }

  const state = weatherRiskState(weather);
  const rainChancePercent = roundedFinite(weather.next12hPrecipProbabilityMax) ?? 0;
  const windMph = roundedFinite(weather.next12hWindMphMax ?? weather.windMph) ?? 0;
  const temperatureF = roundedFinite(weather.temperatureF);

  return {
    state,
    label: weatherRiskLabel(state),
    summaryValue: `${rainChancePercent}% rain • ${windMph} mph wind`,
    compactValue: `${temperatureF === null ? '--' : `${temperatureF}°F`} / ${windMph} mph / ${rainChancePercent}%`,
    conditionLabel: weather.conditionLabel?.trim() || weather.rainTimingLabel || 'Today',
    rainChancePercent,
    windMph,
    temperatureF,
  };
}

function ageHours(value: string | null | undefined, now: number) {
  const timestamp = Date.parse(value || '');
  return Number.isFinite(timestamp) ? Math.max(0, (now - timestamp) / (1000 * 60 * 60)) : null;
}

export function effectiveRiverLiveData(
  result: Pick<RiverDetailApiResult, 'generatedAt' | 'gauge' | 'liveData'>,
  {
    now = Date.now(),
    staleAfterHours = 6,
  }: RiverReadinessViewModelOptions = {}
): LiveDataStatus {
  const observedAgeHours = ageHours(result.gauge?.observedAt, now);
  const generatedAgeHours = ageHours(result.generatedAt, now);
  const isGaugeStale = typeof observedAgeHours === 'number' && observedAgeHours > staleAfterHours;
  const isGeneratedStale = typeof generatedAgeHours === 'number' && generatedAgeHours > staleAfterHours;

  if (!isGaugeStale && !isGeneratedStale) {
    return result.liveData;
  }

  const staleParts: string[] = [];
  if (isGaugeStale) {
    staleParts.push(`Gauge read is ${Math.round(observedAgeHours)}h old`);
  }
  if (isGeneratedStale) {
    staleParts.push(`Paddle Today update is ${Math.round(generatedAgeHours)}h old`);
  }

  return {
    ...result.liveData,
    overall: result.liveData.overall === 'offline' ? 'offline' : 'degraded',
    summary: `${staleParts.join('. ')}. Treat this route as stale until refresh succeeds.`,
    gauge: {
      ...result.liveData.gauge,
      state: isGaugeStale && result.liveData.gauge.state === 'live'
        ? 'stale'
        : result.liveData.gauge.state,
      detail: isGaugeStale
        ? `Gauge read is ${Math.round(observedAgeHours)}h old. Recheck the source before you drive.`
        : result.liveData.gauge.detail,
    },
    weather: {
      ...result.liveData.weather,
      state: isGeneratedStale && result.liveData.weather.state === 'live'
        ? 'stale'
        : result.liveData.weather.state,
      detail: isGeneratedStale
        ? `Weather and score update is ${Math.round(generatedAgeHours)}h old. Refresh before relying on the call.`
        : result.liveData.weather.detail,
    },
  };
}

function readinessVerdict(result: Pick<RiverDetailApiResult, 'checklist'>, liveData: LiveDataStatus) {
  if (liveData.overall === 'offline') return 'skip';
  if (result.checklist.some((item) => item.status === 'skip')) return 'skip';
  if (liveData.overall === 'degraded') return 'watch';
  if (result.checklist.some((item) => item.status === 'watch')) return 'watch';
  return 'go';
}

function readinessSummary(verdict: ChecklistStatus) {
  if (verdict === 'go') return 'Conditions look good right now.';
  if (verdict === 'watch') return 'Conditions are workable, but something still needs a second look.';
  return 'Today does not look like a clean go.';
}

function accessLabel(result: Pick<RiverDetailApiResult, 'river'>) {
  const hasCoordinates = (point: { latitude?: number; longitude?: number } | null | undefined) =>
    Number.isFinite(point?.latitude) && Number.isFinite(point?.longitude);
  const hasPutIn = hasCoordinates(result.river.putIn);
  const hasTakeOut = hasCoordinates(result.river.takeOut);

  if (hasPutIn && hasTakeOut) {
    return result.river.profile.difficulty === 'hard'
      ? 'Mapped, technical reach'
      : 'Mapped put-in and take-out';
  }
  if (hasPutIn || hasTakeOut) return 'Partial access map';
  return 'Check access details';
}

export function buildRiverReadinessViewModel(
  result: RiverDetailApiResult,
  options: RiverReadinessViewModelOptions = {}
): RiverReadinessViewModel {
  const effectiveLiveData = effectiveRiverLiveData(result, options);
  const verdict = readinessVerdict(result, effectiveLiveData);

  return {
    verdict,
    verdictLabel: verdict === 'go' ? 'Go' : verdict === 'watch' ? 'Watch' : 'Skip',
    summary: readinessSummary(verdict),
    note: result.checklist.find((item) => item.status !== 'go')?.detail ?? effectiveLiveData.summary,
    effectiveLiveData,
    weather: buildRiverWeatherViewModel(result.weather),
    accessLabel: accessLabel(result),
  };
}
