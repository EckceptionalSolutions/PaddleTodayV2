import { describe, expect, it } from 'vitest';
import { isValidEmailAddress, normalizeEmailAddress } from '@paddletoday/api-contract';

describe('shared request validation', () => {
  it('normalizes and validates email addresses consistently', () => {
    expect(normalizeEmailAddress('  Person@Example.COM ')).toBe('person@example.com');
    expect(isValidEmailAddress(' person@example.com ')).toBe(true);
    expect(isValidEmailAddress('person@example')).toBe(false);
    expect(isValidEmailAddress(null)).toBe(false);
  });
});
