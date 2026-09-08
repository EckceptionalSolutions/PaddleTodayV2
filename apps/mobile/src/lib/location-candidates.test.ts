import { describe, expect, it } from 'vitest';
import { locationCandidates } from './location-candidates';

describe('location choices', () => {
  it('keeps different cities while removing invalid and duplicate coordinates', () => {
    expect(locationCandidates({ results: [
      { name: 'Springfield', admin1: 'Illinois', latitude: 39.8, longitude: -89.6, population: 100 },
      { name: 'Springfield', admin1: 'Minnesota', latitude: 44.2, longitude: -95, population: 20 },
      { name: 'Duplicate', latitude: 39.8, longitude: -89.6 },
      { name: 'Invalid', latitude: 145, longitude: -93 }, null,
    ] }).map(value => value.label)).toEqual(['Springfield, Illinois', 'Springfield, Minnesota']);
  });
  it('distinguishes places with the same city and state using county or coordinates', () => {
    expect(locationCandidates({ results: [
      { name: 'Lake', admin1: 'State', admin2: 'North County', latitude: 40, longitude: -90 },
      { name: 'Lake', admin1: 'State', latitude: 41, longitude: -90 },
    ] }).map(value => value.label)).toEqual(['Lake, State · North County', 'Lake, State · 41,-90']);
  });
  it('handles absent and malformed provider fields without exposing objects in labels', () => {
    expect(locationCandidates(null)).toEqual([]);
    expect(locationCandidates({ results: [{ name: 'City', admin1: {}, population: 'large', latitude: 40, longitude: -90 }] }))
      .toEqual([{ label: 'City', latitude: 40, longitude: -90, source: 'search' }]);
  });
});
