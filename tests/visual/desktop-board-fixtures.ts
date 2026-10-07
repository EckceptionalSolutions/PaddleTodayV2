import type { RiverSummaryResponse, WeekendSummaryResponse } from '../../packages/api-contract/src/index';
import detail from '../mobile-web/fixtures/route-detail.json' with { type: 'json' };

export type WeekendScenario = 'fresh' | 'cautious' | 'unavailable' | 'stale' | 'empty';
export const FIXTURE_NOW = new Date('2030-06-15T17:00:00Z');

export function desktopBoardFixture(scenario: WeekendScenario, now = FIXTURE_NOW): RiverSummaryResponse {
  const weekend = desktopWeekendFixture(scenario, now);
  const stale = scenario === 'stale';
  const cautious = scenario === 'cautious';
  return { requestId: weekend.requestId, generatedAt: weekend.generatedAt, snapshotStatus: weekend.snapshotStatus,
    riverCount: weekend.riverCount, rivers: weekend.rivers.map(item => ({
      river: item.river, sources: [{ label: 'Synthetic QA data', tone: 'derived' }],
      score: item.current.score, rating: item.current.rating, gaugeBandLabel: item.current.gaugeBandLabel,
      explanation: item.weekend.summary, confidence: { score: 75, label: 'Medium' },
      readiness: { status: stale ? 'withheld' : cautious ? 'verify' : 'ready',
        label: stale ? 'Withheld' : cautious ? 'Verify' : 'Ready',
        reason: stale ? 'Stored readings are stale. Verify conditions before launching.'
          : cautious ? 'Storms and wind need a fresh check before committing.' : 'Current readings support a paddle.' },
      liveData: { ...item.liveData, ...(stale ? { overall: 'degraded', gaugeState: 'stale', weatherState: 'stale' } as const : {}) },
      summary: { cardText: item.weekend.summary, shortExplanation: item.weekend.summary,
        rawSignalLine: 'Gauge: 6.31 ft • Wind: 9 mph • Temp: 72°F', gaugeNow: '6.31 ft',
        confidenceText: 'Some uncertainty', freshnessText: stale ? 'Stale readings' : 'Current readings',
        primaryFactor: 'River level', secondaryFactor: 'Weather' }, generatedAt: item.generatedAt,
    })) };
}

// Shared by browser regression tests and the loopback-only fixture preview.
export function desktopWeekendFixture(scenario: WeekendScenario, now = FIXTURE_NOW): WeekendSummaryResponse {
  const generatedAt = new Date(now.getTime() - (scenario === 'stale' ? 3 * 60 * 60 * 1000 : 0)).toISOString();
  const cautious = scenario === 'cautious';
  const end = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const rating = cautious ? 'Fair' as const : 'Strong' as const;
  return {
    requestId: `desktop-fixture-${scenario}`, generatedAt, label: 'This weekend',
    riverCount: scenario === 'empty' ? 0 : 1, withheldCount: 2,
    snapshotStatus: scenario === 'stale' ? 'stale' : 'fresh',
    rivers: scenario === 'empty' ? [] : [{
      river: { ...structuredClone(detail.result.river), difficulty: 'moderate' } as WeekendSummaryResponse['rivers'][number]['river'],
      current: { score: cautious ? 54 : 90, rating, gaugeBandLabel: cautious ? 'Low runnable' : 'Ideal' },
      weekend: { label: 'This weekend', forecastStartDate: now.toISOString().slice(0, 10), forecastEndDate: end,
        score: cautious ? 54 : 90, rating, confidence: 'Medium',
        summary: cautious ? 'Rain and wind could complicate the trip. Re-check before driving.' : 'Current river shape and forecast both line up well.',
        explanation: cautious ? 'Weekend: Storm signal is present, 65% rain chance, winds up to 18 mph.' : 'Weekend: No thunderstorm signal is showing, 13% rain chance, winds up to 9 mph.',
        signalLine: cautious ? 'Weekend rain: 65% max • Wind: up to 18 mph • Temps: 62°-85°F' : 'Weekend rain: 13% max • Wind: up to 9 mph • Temps: 62°-85°F',
      },
      liveData: { overall: 'live', summary: 'Current readings available.', gaugeState: 'live', gaugeDetail: 'Current reading',
        weatherState: 'live', weatherDetail: 'Current forecast' }, generatedAt,
    }],
  };
}
