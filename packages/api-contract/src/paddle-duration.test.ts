import { expect, it } from 'vitest';
import { parsePaddleTimeHours } from './paddle-duration';
import { paddleTimeBucketForRoute } from './route-planning';

it.each([
  ['About 2 hr 30 min to 4 hr', { min: 2.5, max: 4 }],
  ['About 30–90 minutes including scouting', { min: 0.5, max: 1.5 }],
  ['45 minutes to 1 hour 30 minutes', { min: 0.75, max: 1.5 }],
  ['About 4 to 6 hr', { min: 4, max: 6 }],
  ['Plan 4–6 daylight hours for scouting', { min: 4, max: 6 }],
  ['About 6 to 9 on-water hours, plus one portage', { min: 6, max: 9 }],
  ['About 3-4 on-water hours, longer with stops', { min: 3, max: 4 }],
  ['About 8 hr to 10+ hr depending on level', null],
  ['1h 30m', { min: 1.5, max: 1.5 }],
  ['2.5–3.5 hours', { min: 2.5, max: 3.5 }],
  ['4 hr to 6', { min: 4, max: 6 }],
  ['12 mile route taking 2 hours', { min: 2, max: 2 }],
  ['2 to 3', { min: 2, max: 3 }],
  ['Plan a full daylight window for 12 miles', null],
  ['2 days', null],
  ['0 minutes', null],
  ['', null],
])('parses %s', (label, expected) => {
  expect(parsePaddleTimeHours(label as string)).toEqual(expected);
});

it('classifies minute-based route labels as short paddles', () => {
  expect(paddleTimeBucketForRoute({ estimatedPaddleTime: 'About 30–90 minutes including scouting' })).toBe('up-to-3');
  expect(paddleTimeBucketForRoute({ estimatedPaddleTime: 'About 2 hr 30 min to 4 hr' })).toBe('3-to-5');
});
