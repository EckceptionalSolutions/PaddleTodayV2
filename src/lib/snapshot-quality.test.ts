import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { assertSnapshotQuality } from './snapshot-quality';
import type { LiveDataState, LiveDataStatus } from './types';

function result(weather: LiveDataState, gauge: LiveDataState = 'live'): { liveData: LiveDataStatus } {
  return { liveData: {
    overall: 'degraded', summary: '',
    gauge: { state: gauge, ageMinutes: null, detail: '' },
    weather: { state: weather, ageMinutes: null, detail: '' },
  } };
}

describe('snapshot quality gate', () => {
  beforeEach(() => { vi.spyOn(console, 'log').mockImplementation(() => {}); });
  afterEach(() => { vi.restoreAllMocks(); });

  it('rejects the production incident despite nearly complete weather coverage', () => {
    const results = [
      ...Array.from({ length: 1380 }, () => result('stale')),
      ...Array.from({ length: 5 }, () => result('unavailable')),
      ...Array.from({ length: 7 }, () => result('live')),
    ];
    expect(() => assertSnapshotQuality(results)).toThrow('fresh weather 0.5%');
  });

  it('accepts 85% fresh weather and tolerates isolated missing readings', () => {
    const results = [
      ...Array.from({ length: 17 }, () => result('live')),
      result('stale'), result('unavailable'), result('stale'),
    ];
    expect(() => assertSnapshotQuality(results)).not.toThrow();
  });

  it('still protects gauge coverage and rejects empty captures', () => {
    expect(() => assertSnapshotQuality([result('live', 'unavailable')])).toThrow('usable gauge 0%');
    expect(() => assertSnapshotQuality([])).toThrow('no river scores');
  });
});
