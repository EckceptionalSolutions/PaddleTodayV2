import { expect, it } from 'vitest';
import { gaugeBandDisplayLabel } from './presentation';
import { formatPaddleTimeLabel } from './paddle-duration';

it('replaces saved technical labels using the unchanged water-level category', () => {
  expect(gaugeBandDisplayLabel('low-shoulder', 'Low shoulder')).toBe('Below preferred range');
  expect(gaugeBandDisplayLabel('high-shoulder', 'High shoulder')).toBe('Above preferred range');
  expect(gaugeBandDisplayLabel('ideal', 'Ideal window')).toBe('Within preferred range');
  expect(gaugeBandDisplayLabel('minimum-met')).toBe('Above minimum');
});
it('preserves unavailable and unscored states instead of inventing a range', () => {
  expect(gaugeBandDisplayLabel('unknown', 'Not scored')).toBe('Not scored');
  expect(gaugeBandDisplayLabel(undefined, 'Unavailable')).toBe('Unavailable');
});

it('formats the same compact duration for initial and loaded trip cards', () => {
  expect(formatPaddleTimeLabel('Allow 4-6 hours with shoal scouting and shuttle time')).toBe('About 4–6 hr');
  expect(formatPaddleTimeLabel('2 hr 30 min to 4 hr')).toBe('About 2.5–4 hr');
  expect(formatPaddleTimeLabel('30 to 45 minutes')).toBe('About 30–45 min');
  expect(formatPaddleTimeLabel('At least 4 hours')).toBe('At least 4 hours');
});
