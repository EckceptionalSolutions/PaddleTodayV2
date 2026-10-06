import { expect, it } from 'vitest';
import { newTripPlan } from '@paddletoday/api-contract';
import { mergeReviewed, reviewText } from './trip-recovery';

it('keeps remote changes except for fields explicitly selected from the local version', () => {
  const latest = { ...newTripPlan({ name: 'River' }), title: 'Latest title', date: '2026-10-10' };
  const mine = { ...latest, title: 'My title', date: '2026-11-11' };
  expect(mergeReviewed(latest, mine, ['title'])).toEqual({ ...latest, title: 'My title' });
  expect(latest.title).toBe('Latest title');
  expect(reviewText([{ id: 'hidden-id', location: 'Landing', time: '09:00', note: 'Meet here' }])).toBe('Landing · 09:00 · Meet here');
});
