import { expect, it } from 'vitest';
import { formatPaddleTimeRange } from './format';

it('does not turn invalid paddle durations into a short trip estimate', () => {
  for (const [min, max] of [[NaN, 2], [1, Infinity], [0, 2], [-1, 2], [4, 2]]) {
    expect(formatPaddleTimeRange(min, max)).toBe('Paddle time unavailable');
  }
});

it('retains usable duration labels for valid estimates', () => {
  expect(formatPaddleTimeRange(0.25, 0.5)).toBe('About 30 min');
  expect(formatPaddleTimeRange(2, 2)).toBe('About 2 hr');
  expect(formatPaddleTimeRange(2.5, 4)).toBe('About 2.5 hr to 4 hr');
});
