import { describe, expect, it } from 'vitest';
import { SNAPSHOT_MAX_AGE_MS, type RiverDetailResponse, type RiverGroupResponse, type RiverSummaryResponse, type WeekendSummaryResponse } from '@paddletoday/api-contract';
import fixture from '../../../../tests/mobile-web/fixtures/route-detail.json';
import { currentDetailSnapshot, currentGroupSnapshot, currentSummarySnapshot, currentWeekendSnapshot } from './cached-snapshot';

const capturedAt = Date.parse('2030-06-15T12:00:00Z');
function detail(): RiverDetailResponse {
  return { ...fixture, requestId: 'test', generatedAt: new Date(capturedAt).toISOString(), result: { ...fixture.result,
    generatedAt: new Date(capturedAt).toISOString(), score: 95, rating: 'Strong',
    readiness: { status: 'ready', label: 'Ready', reason: 'Current evidence.' },
  } } as unknown as RiverDetailResponse;
}
function summary(): RiverSummaryResponse {
  const source = detail();
  return { requestId: 'test', generatedAt: source.generatedAt, riverCount: 1, rivers: [{ ...source.result,
    summary: { gaugeNow: 'Current', shortExplanation: 'Current evidence' },
    liveData: { overall: 'live', summary: 'Current', gaugeState: 'live', weatherState: 'live', gaugeDetail: 'Current gauge', weatherDetail: 'Current weather' },
  }] } as unknown as RiverSummaryResponse;
}

describe('display freshness of cached snapshots', () => {
  it('withholds planning-only summary calls without marking fresh data old or mutating the response', () => {
    const original = summary();
    original.rivers[0].river = { ...original.rivers[0].river, scoreEligibility: 'planning' };
    const projected = currentSummarySnapshot(original, capturedAt);
    expect(projected.rivers[0].readiness.status).toBe('withheld');
    expect(projected.snapshotStatus).not.toBe('stale');
    expect(projected.rivers[0].liveData.overall).toBe('live');
    expect(original.rivers[0].readiness.status).toBe('ready');
  });
  it('retains an existing caution when gating a planning-only summary', () => {
    const original = summary();
    original.rivers[0].river = { ...original.rivers[0].river, scoreEligibility: 'planning' };
    original.rivers[0].readiness = { status: 'skip', label: 'Skip', reason: 'A route closure needs review.' };
    const projected = currentSummarySnapshot(original, capturedAt);
    expect(projected.rivers[0].readiness.status).toBe('withheld');
    expect(projected.rivers[0].readiness.reason).toBe('A route closure needs review.');
  });
  it('keeps fresh identity and applies the shared two-hour boundary without mutating stored data', () => {
    const original = summary();
    expect(currentSummarySnapshot(original, capturedAt + SNAPSHOT_MAX_AGE_MS)).toBe(original);
    const expired = currentSummarySnapshot(original, capturedAt + SNAPSHOT_MAX_AGE_MS + 1);
    expect(expired.snapshotStatus).toBe('stale');
    expect(expired.rivers[0].readiness.status).toBe('withheld');
    expect(expired.rivers[0].score).toBe(95);
    expect(original.rivers[0].readiness.status).toBe('ready');
    expect(original.rivers[0].liveData.overall).toBe('live');
    expect(currentSummarySnapshot(original, capturedAt)).toBe(original);
  });
  it('preserves stronger existing gates and offline status', () => {
    for (const status of ['verify', 'withheld', 'skip'] as const) {
      const source = detail();
      source.result.readiness.status = status;
      source.result.liveData.overall = 'offline';
      const projected = currentDetailSnapshot(source, capturedAt + SNAPSHOT_MAX_AGE_MS + 1);
      expect(projected.result.readiness.status).toBe(status);
      expect(projected.result.liveData.overall).toBe('offline');
    }
  });
  it('does not refresh an old route merely because its surrounding response is new', () => {
    const source = detail();
    source.generatedAt = new Date(capturedAt + SNAPSHOT_MAX_AGE_MS + 1).toISOString();
    expect(currentDetailSnapshot(source, capturedAt + SNAPSHOT_MAX_AGE_MS + 1).result.readiness.status).toBe('withheld');
    const group = { requestId: 'test', generatedAt: source.generatedAt, result: { group: {}, routes: [source.result] } } as RiverGroupResponse;
    expect(currentGroupSnapshot(group, capturedAt + SNAPSHOT_MAX_AGE_MS + 1).result.routes[0].readiness.status).toBe('withheld');
  });
  it('does not treat invalid or implausibly future capture times as current', () => {
    for (const generatedAt of ['invalid', new Date(capturedAt + 6 * 60 * 1000).toISOString()]) {
      const source = detail(); source.generatedAt = generatedAt;
      expect(currentDetailSnapshot(source, capturedAt).result.readiness.status).toBe('withheld');
    }
  });
  it('retains forecast fields while marking an expired weekend snapshot degraded', () => {
    const source = { requestId: 'test', generatedAt: new Date(capturedAt).toISOString(), riverCount: 1, label: 'Weekend', withheldCount: 0,
      rivers: [{ river: summary().rivers[0].river, generatedAt: new Date(capturedAt).toISOString(), current: { score: 95, rating: 'Strong' },
        weekend: { score: 80, rating: 'Good', label: 'Weekend' }, liveData: summary().rivers[0].liveData }] } as WeekendSummaryResponse;
    const projected = currentWeekendSnapshot(source, capturedAt + SNAPSHOT_MAX_AGE_MS + 1);
    expect(projected.rivers[0].liveData.overall).toBe('degraded');
    expect(projected.rivers[0].weekend).toBe(source.rivers[0].weekend);
    expect(projected.rivers[0]).not.toHaveProperty('readiness');
  });
});
