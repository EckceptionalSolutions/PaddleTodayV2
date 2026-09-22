import { describe, expect, it } from 'vitest';
import type { RiverDetailApiResult } from '@paddletoday/api-contract';
import { captureOfflineConditions, validOfflineConditions } from './offline-conditions';

const generatedAt = '2026-09-16T12:00:00Z';
const downloadedAt = '2026-09-16T14:00:00Z';
const detail = {
  generatedAt, river: {}, score: 88, rating: 'Good', readiness: { status: 'ready' }, confidence: { label: 'High' },
  liveData: { summary: 'Gauge and weather readings were available.' },
  gauge: { current: 6.31, unit: 'ft', observedAt: '2026-09-16T11:00:00Z', gaugeSource: 'USGS', trend: 'steady' },
  weather: { temperatureF: 0, windMph: 0, gustMph: null, conditionLabel: 'Clear', next12hPrecipProbabilityMax: 0,
    observedAt: '2026-09-16T11:30:00Z', weatherSource: 'NWS' },
} as unknown as RiverDetailApiResult;

describe('downloaded conditions', () => {
  it('retains original data times and sources separately from download time, including zero measurements', () => {
    const snapshot = captureOfflineConditions(detail, downloadedAt);
    expect(snapshot).toMatchObject({ downloadedAt, generatedAt });
    expect(snapshot.facts).toContainEqual({ label: 'Gauge reading', text: '6.31 ft', observedAt: '2026-09-16T11:00:00Z', source: 'USGS' });
    expect(snapshot.facts.find(fact => fact.label === 'Wind')?.text).toBe('0 mph');
    expect(snapshot.facts.find(fact => fact.label === 'Wind gusts')?.text).toBe('Unavailable');
    expect(validOfflineConditions(JSON.parse(JSON.stringify(snapshot)))).toBe(true);
    expect(validOfflineConditions({ ...snapshot, generatedAt: 'bad-date' })).toBe(false);
    expect(validOfflineConditions({ ...snapshot, facts: [{ label: 'Gauge', text: 123 }] })).toBe(false);
  });

  it('keeps withheld and planning scores unavailable and never invents missing readings', () => {
    for (const override of [{ readiness: { status: 'withheld' } }, { river: { scoreEligibility: 'planning' } }]) {
      const snapshot = captureOfflineConditions({ ...detail, ...override, gauge: undefined, weather: undefined } as unknown as RiverDetailApiResult, downloadedAt);
      expect(snapshot.facts.find(fact => fact.label === 'Score shown at download')?.text).toBe('Unavailable');
      expect(snapshot.facts.find(fact => fact.label === 'Gauge reading')?.text).toBe('Unavailable');
      expect(snapshot.facts.find(fact => fact.label === 'Weather')?.observedAt).toBeNull();
    }
  });
});
