import { describe, expect, it } from 'vitest';
import { compactPaddleTime } from './route-facts';

describe('paddle-time chip summaries', () => {
  it('keeps ranges compact while supporting hours and minutes', () => {
    expect(compactPaddleTime('About 2 hr 30 min to 4 hr depending on wind')).toBe('2h 30m–4h');
    expect(compactPaddleTime('About 30–90 minutes including scouting')).toBe('30m–1h 30m');
  });
  it('does not invent a duration for prose or missing values', () => {
    expect(compactPaddleTime('Overnight trip with portages')).toBe('Overnight trip with portages');
    expect(compactPaddleTime(undefined)).toBe('');
  });
});
