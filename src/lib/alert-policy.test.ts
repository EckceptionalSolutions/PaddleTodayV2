import { describe, expect, it } from 'vitest';

import { alertSnapshotIneligibility, initialAlertStateForSnapshot } from './alert-policy';
import type { RiverDetailSnapshot } from './river-snapshots';

const NOW = new Date('2026-07-27T04:00:00.000Z');

function snapshot(args: {
  rating?: 'Strong' | 'Good' | 'Fair' | 'No-go';
  confidence?: 'High' | 'Medium' | 'Low';
  overall?: 'live' | 'degraded' | 'offline';
  generatedAt?: string;
} = {}): RiverDetailSnapshot {
  const generatedAt = args.generatedAt ?? '2026-07-27T03:30:00.000Z';
  return {
    generatedAt,
    result: {
      generatedAt,
      rating: args.rating ?? 'Good',
      confidence: { label: args.confidence ?? 'High' },
      liveData: { overall: args.overall ?? 'live' },
    },
  } as RiverDetailSnapshot;
}

describe('alert snapshot policy', () => {
  it('starts below threshold when a fresh route is not yet Good', () => {
    expect(initialAlertStateForSnapshot(snapshot({ rating: 'No-go' }), 'good', NOW)).toBe('below_threshold');
    expect(initialAlertStateForSnapshot(snapshot({ rating: 'Fair' }), 'good', NOW)).toBe('below_threshold');
  });

  it('starts above threshold only for an eligible snapshot that already meets the requested level', () => {
    expect(initialAlertStateForSnapshot(snapshot({ rating: 'Good' }), 'good', NOW)).toBe('at_or_above_threshold');
    expect(initialAlertStateForSnapshot(snapshot({ rating: 'Good' }), 'strong', NOW)).toBe('below_threshold');
    expect(initialAlertStateForSnapshot(snapshot({ rating: 'Strong' }), 'strong', NOW)).toBe('at_or_above_threshold');
  });

  it('starts below threshold when current evidence is not safe to alert from', () => {
    expect(initialAlertStateForSnapshot(snapshot({ overall: 'degraded' }), 'good', NOW)).toBe('below_threshold');
    expect(initialAlertStateForSnapshot(snapshot({ confidence: 'Low' }), 'good', NOW)).toBe('below_threshold');
    expect(
      initialAlertStateForSnapshot(
        snapshot({ generatedAt: '2026-07-27T01:00:00.000Z' }),
        'good',
        NOW,
      ),
    ).toBe('below_threshold');
  });

  it('rejects snapshots whose timestamps are implausibly far in the future', () => {
    expect(
      alertSnapshotIneligibility(
        snapshot({ generatedAt: '2026-07-27T04:30:00.000Z' }),
        NOW,
      ),
    ).toBe('stale_snapshot');
  });
});
