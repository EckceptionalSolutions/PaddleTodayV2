import { describe, expect, it } from 'vitest';
import {
  compareTodayAlphabetically,
  compareTodayConfidenceStatusScore,
  compareTodayLowestRisk,
  compareTodayStatusThenScore,
  type TodayBoardItem,
} from '@paddletoday/api-contract';

function boardItem(overrides: Partial<TodayBoardItem> & { name: string }): TodayBoardItem {
  return {
    river: {
      name: overrides.name,
      reach: overrides.river?.reach,
    },
    score: overrides.score ?? 70,
    rating: overrides.rating ?? 'Good',
    confidence: overrides.confidence ?? { label: 'Medium' },
    liveData: overrides.liveData ?? { overall: 'live' },
  };
}

describe('shared today-board ordering', () => {
  it('orders status before score for the main board', () => {
    const live = boardItem({ name: 'Live', score: 60, liveData: { overall: 'live' } });
    const offline = boardItem({ name: 'Offline', score: 100, liveData: { overall: 'offline' } });

    expect(compareTodayStatusThenScore(live, offline)).toBeLessThan(0);
  });

  it('orders confidence before status and score when certainty is requested', () => {
    const high = boardItem({
      name: 'High',
      score: 50,
      confidence: { label: 'High' },
      liveData: { overall: 'offline' },
    });
    const low = boardItem({
      name: 'Low',
      score: 100,
      confidence: { label: 'Low' },
      liveData: { overall: 'live' },
    });

    expect(compareTodayConfidenceStatusScore(high, low)).toBeLessThan(0);
  });

  it('orders lower-risk ratings before other quality signals', () => {
    const good = boardItem({ name: 'Good', rating: 'Good', score: 40 });
    const fair = boardItem({
      name: 'Fair',
      rating: 'Fair',
      score: 100,
      confidence: { label: 'High' },
    });

    expect(compareTodayLowestRisk(good, fair)).toBeLessThan(0);
  });

  it('uses river name and then reach for alphabetical order', () => {
    const upstream = boardItem({ name: 'Cannon', river: { name: 'Cannon', reach: 'A to B' } });
    const downstream = boardItem({ name: 'Cannon', river: { name: 'Cannon', reach: 'B to C' } });
    const zumbro = boardItem({ name: 'Zumbro' });

    expect(compareTodayAlphabetically(upstream, downstream)).toBeLessThan(0);
    expect(compareTodayAlphabetically(upstream, zumbro)).toBeLessThan(0);
  });
});
