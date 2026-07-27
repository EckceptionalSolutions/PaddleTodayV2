import { describe, expect, it } from 'vitest';
import { friendlyCapReason, ratingToneKey, signedPoints } from '@paddletoday/api-contract';

describe('shared presentation policy', () => {
  it('returns semantic rating tones and signed score values', () => {
    expect(ratingToneKey('Strong')).toBe('great');
    expect(ratingToneKey('Fair')).toBe('marginal');
    expect(signedPoints(3)).toBe('+3');
    expect(signedPoints(-2)).toBe('-2');
  });

  it('normalizes technical cap reasons into user-facing copy', () => {
    expect(friendlyCapReason('High wind caps today at 75.')).toContain('Strong wind');
    expect(friendlyCapReason('Custom reason')).toBe('Custom reason');
  });
});
