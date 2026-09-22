import type { RiverDetailApiResult } from '@paddletoday/api-contract';
import { routeDecisionPresentation } from './map-decision';
import { isRecord } from './storage';

export interface OfflineConditions {
  downloadedAt: string;
  generatedAt: string | null;
  facts: Array<{ label: string; text: string; observedAt: string | null; source: string | null }>;
}

const timestamp = (value: unknown): string | null => typeof value === 'string' && Number.isFinite(Date.parse(value)) ? value : null;
const measurement = (value: number | null | undefined, unit: string) => typeof value === 'number' && Number.isFinite(value) ? `${Number(value.toFixed(2))} ${unit}` : 'Unavailable';

// Keep a small historical snapshot, separate from route reference and draft data.
export function captureOfflineConditions(detail: RiverDetailApiResult, downloadedAt: string): OfflineConditions {
  const decision = routeDecisionPresentation(detail);
  const gauge = detail.gauge, weather = detail.weather;
  const fact = (label: string, text: string, observedAt: unknown = null, source: string | null = null) => ({ label, text, observedAt: timestamp(observedAt), source });
  return {
    downloadedAt,
    generatedAt: timestamp(detail.generatedAt),
    facts: [
      fact('Call shown at download', decision.label),
      fact('Score shown at download', decision.score === null || !Number.isFinite(decision.score) ? 'Unavailable' : String(decision.score)),
      fact('Confidence shown at download', decision.call === 'unavailable' ? 'Unavailable' : detail.confidence?.label ?? 'Unavailable'),
      fact('Data status at download', detail.liveData?.summary ?? 'Unavailable'),
      fact('Gauge reading', measurement(gauge?.current, gauge?.unit ?? ''), gauge?.observedAt, gauge?.gaugeSource ?? null),
      fact('Gauge trend', gauge?.trend ?? 'Unavailable', gauge?.observedAt, gauge?.gaugeSource ?? null),
      fact('Weather', weather?.conditionLabel ?? 'Unavailable', weather?.observedAt, weather?.weatherSource ?? null),
      fact('Air temperature', measurement(weather?.temperatureF, '°F'), weather?.observedAt, weather?.weatherSource ?? null),
      fact('Wind', measurement(weather?.windMph, 'mph'), weather?.observedAt, weather?.weatherSource ?? null),
      fact('Wind gusts', measurement(weather?.gustMph, 'mph'), weather?.observedAt, weather?.weatherSource ?? null),
      fact('12-hour rain forecast at download', measurement(weather?.next12hPrecipProbabilityMax, '%'), weather?.observedAt, weather?.weatherSource ?? null),
    ],
  };
}

export function validOfflineConditions(value: unknown): value is OfflineConditions {
  return isRecord(value) && timestamp(value.downloadedAt) !== null
    && (value.generatedAt === null || timestamp(value.generatedAt) !== null)
    && Array.isArray(value.facts) && value.facts.length <= 20
    && value.facts.every(fact => isRecord(fact) && typeof fact.label === 'string' && typeof fact.text === 'string'
      && (fact.observedAt === null || timestamp(fact.observedAt) !== null)
      && (fact.source === null || typeof fact.source === 'string'));
}
