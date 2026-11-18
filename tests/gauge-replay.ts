import { getRiverBySlug } from '../src/lib/rivers';
import { scoreRiverCondition } from '../src/lib/scoring';
import { serializeDetailResult, serializeSummaryResult } from '../src/lib/api-contract';
import type { GaugeReading, WeatherSnapshot } from '../src/lib/types';
import fixture from './mobile-web/fixtures/route-detail.json' with { type: 'json' };

export const replayTime = new Date('2026-07-27T14:00:00Z');
export const gaugeCases = [
  { name: 'fresh', value: '6.31 ft', freshness: 'Current', time: '1:45 PM' },
  { name: 'delayed', value: '6.31 ft', freshness: 'Delayed', time: '7:45 AM' },
  { name: 'missing', value: 'No reading', freshness: '', time: '' },
  { name: 'changed unit', value: '1,235 cfs', freshness: 'Current', time: '1:45 PM' },
] as const;

export function gaugeReplay(scenario: typeof gaugeCases[number]['name']) {
  const river = getRiverBySlug(fixture.result.river.slug)!;
  const gauge: GaugeReading | null = scenario === 'missing' ? null : {
    ...fixture.result.gauge as GaugeReading,
    sourceId: river.gaugeSource.id,
    observedAt: scenario === 'delayed' ? '2026-07-27T07:45:00Z' : '2026-07-27T13:45:00Z',
    ...(scenario === 'changed unit' ? { current: 1234.6, unit: 'cfs', dischargeNow: 1234.6, recentSamples: [] } : {}),
  };
  const weather = { ...fixture.result.weather, observedAt: replayTime.toISOString() } as WeatherSnapshot;
  const result = scoreRiverCondition({ river, gauge, weather, now: replayTime });
  const summary = serializeSummaryResult(result);
  return { slug: river.slug, detail: { requestId: 'gauge-replay-detail', generatedAt: result.generatedAt, result: serializeDetailResult(result) },
    board: { requestId: 'gauge-replay-summary', generatedAt: result.generatedAt, snapshotStatus: 'fresh', riverCount: 1, rivers: [summary] } };
}
