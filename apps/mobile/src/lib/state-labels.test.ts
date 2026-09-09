import { describe, expect, it } from 'vitest';
import { stateAbbreviation } from './state-labels';

describe('state search aliases', () => {
  it('handles states beyond the original Midwest footprint and existing postal codes', () => {
    expect(stateAbbreviation('New Jersey')).toBe('NJ');
    expect(stateAbbreviation(' West   Virginia ')).toBe('WV');
    expect(stateAbbreviation('nj')).toBe('NJ');
    expect(stateAbbreviation('District of Columbia')).toBe('DC');
    expect(stateAbbreviation('minnesota')).toBe('MN');
  });
  it('preserves an unknown area instead of inventing a code', () => {
    expect(stateAbbreviation(' Ontario ')).toBe('Ontario');
    expect(stateAbbreviation('')).toBe('');
  });
});
