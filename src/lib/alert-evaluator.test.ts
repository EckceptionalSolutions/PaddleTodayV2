import { describe, expect, it } from 'vitest';
import { evaluateAlertSnapshot } from './alert-evaluator';
import type { RiverDetailSnapshot } from './river-snapshots';
import type { RiverThresholdAlert } from './alerts';

function buildSnapshot(args: {
  rating?: 'Strong' | 'Good' | 'Fair' | 'No-go';
  confidence?: 'High' | 'Medium' | 'Low';
  overall?: 'live' | 'degraded' | 'offline';
  generatedAt?: string;
} = {}): RiverDetailSnapshot {
  return {
    generatedAt: args.generatedAt ?? '2026-04-04T12:00:00.000Z',
    result: {
      generatedAt: args.generatedAt ?? '2026-04-04T12:00:00.000Z',
      score: 72,
      rating: args.rating ?? 'Good',
      explanation: 'Stable flow and a clean window make this a workable trip today.',
      confidence: {
        label: args.confidence ?? 'High',
      },
      liveData: {
        overall: args.overall ?? 'live',
      },
      river: {
        slug: 'rice-creek-peltier-to-long-lake',
        name: 'Rice Creek',
        reach: 'Peltier Lake to Long Lake',
      },
    },
  } as unknown as RiverDetailSnapshot;
}

function buildAlert(args: {
  threshold?: 'good' | 'strong';
  lastState?: RiverThresholdAlert['lastState'];
  lastTriggeredAt?: string | null;
} = {}): Pick<RiverThresholdAlert, 'threshold' | 'lastState' | 'lastTriggeredAt'> {
  return {
    threshold: args.threshold ?? 'good',
    lastState: args.lastState ?? 'below_threshold',
    lastTriggeredAt: args.lastTriggeredAt ?? null,
  };
}

describe('evaluateAlertSnapshot', () => {
  it('triggers when a river crosses up to the selected threshold', () => {
    const result = evaluateAlertSnapshot(
      buildAlert({ threshold: 'good', lastState: 'below_threshold' }),
      buildSnapshot({ rating: 'Good', confidence: 'Medium' }),
      new Date('2026-04-04T12:30:00.000Z')
    );

    expect(result.status).toBe('trigger');
  });

  it('does not trigger again while the river stays above threshold', () => {
    const result = evaluateAlertSnapshot(
      buildAlert({ threshold: 'good', lastState: 'at_or_above_threshold' }),
      buildSnapshot({ rating: 'Strong' }),
      new Date('2026-04-04T12:30:00.000Z')
    );

    expect(result.status).toBe('stay_above');
  });

  it('resets to below when the river falls back under the threshold', () => {
    const result = evaluateAlertSnapshot(
      buildAlert({ threshold: 'good', lastState: 'at_or_above_threshold' }),
      buildSnapshot({ rating: 'Fair' }),
      new Date('2026-04-04T12:30:00.000Z')
    );

    expect(result.status).toBe('reset_below');
  });

  it('skips low-confidence snapshots', () => {
    const result = evaluateAlertSnapshot(
      buildAlert({ threshold: 'good', lastState: 'below_threshold' }),
      buildSnapshot({ rating: 'Good', confidence: 'Low' }),
      new Date('2026-04-04T12:30:00.000Z')
    );

    expect(result.status).toBe('skip');
    if (result.status === 'skip') {
      expect(result.reason).toBe('low_confidence');
    }
  });

  it('honors the resend cooldown after a recent trigger', () => {
    const result = evaluateAlertSnapshot(
      buildAlert({
        threshold: 'good',
        lastState: 'below_threshold',
        lastTriggeredAt: '2026-04-04T09:00:00.000Z',
      }),
      buildSnapshot({ rating: 'Good' }),
      new Date('2026-04-04T12:30:00.000Z')
    );

    expect(result.status).toBe('cooldown');
  });
});
