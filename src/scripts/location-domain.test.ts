import { describe, expect, it } from 'vitest';
import {
  chooseBestGeocodeCandidate,
  formatLocationLabel,
  levenshteinDistance,
  parseManualLocationQuery,
} from './location-domain.js';

describe('location domain', () => {
  it('parses state names and abbreviations from manual searches', () => {
    expect(parseManualLocationQuery('Duluth, MN')).toEqual({
      raw: 'Duluth, MN',
      city: 'Duluth',
      state: { name: 'Minnesota', abbreviation: 'MN' },
    });
    expect(parseManualLocationQuery('Sioux Falls South Dakota').state).toEqual({
      name: 'South Dakota',
      abbreviation: 'SD',
    });
  });

  it('formats compact US location labels', () => {
    expect(formatLocationLabel('Duluth', 'Minnesota', 'United States')).toBe('Duluth, MN');
  });

  it('keeps typo tolerance narrow and deterministic', () => {
    expect(levenshteinDistance('duluth', 'duluht')).toBe(2);
    expect(levenshteinDistance('duluth', 'dulut')).toBe(1);
  });

  it('prefers an explicit state match over population', () => {
    const parsed = parseManualLocationQuery('Springfield, IL');
    const winner = chooseBestGeocodeCandidate([
      { name: 'Springfield', admin1: 'Missouri', population: 170_000 },
      { name: 'Springfield', admin1: 'Illinois', population: 110_000 },
    ], parsed);
    expect(winner?.admin1).toBe('Illinois');
  });
});
