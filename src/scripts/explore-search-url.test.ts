import { describe, expect, it } from 'vitest';
import { readExploreSearch, writeExploreSearch } from './explore-search-url.js';

describe('Explore search links', () => {
  it('round trips all filters and location while retaining unrelated URL context', () => {
    const state = readExploreSearch('https://paddle.test/explore/?searchVersion=1')!;
    const filters = { ...state.filters, search: 'River & creek', state: 'Minnesota', paddleable: false, rating: 'all', routeType: 'whitewater', difficulty: 'moderate', camping: 'nearby', distance: '100', paddleTime: '3-to-5', paddleLength: '5-to-10', sort: 'nearest' };
    const location = { latitude: 45.123456, longitude: -93.234567, label: 'City & town' };
    const link = writeExploreSearch('https://paddle.test/explore/?ref=friend#results', filters, location);
    expect(readExploreSearch(link)).toEqual({ filters, location });
    expect(new URL(link).searchParams.get('ref')).toBe('friend');
    expect(new URL(link).hash).toBe('#results');
  });
  it('validates parameters and distinguishes a bare page from an explicit search', () => {
    expect(readExploreSearch('https://paddle.test/explore/')).toBeNull();
    const state = readExploreSearch('https://paddle.test/explore/?searchVersion=1&lat=99&lng=-92&sort=invalid&distance=999&routeType=invalid')!;
    expect(state.location).toBeNull();
    expect(state.filters).toMatchObject({ sort: 'best-now', routeType: 'non-whitewater', distance: '' });
    expect(readExploreSearch('https://paddle.test/explore/?searchVersion=1&lat=&lng=')?.location).toBeNull();
  });
  it('removes cleared location and search from a previously shared link', () => {
    const initial = 'https://paddle.test/explore/?searchVersion=1&lat=45&lng=-93&place=Milaca&search=river';
    const filters = { ...readExploreSearch(initial)!.filters, search: '' };
    const link = writeExploreSearch(initial, filters, null);
    expect(readExploreSearch(link)?.location).toBeNull();
    expect(new URL(link).searchParams.has('place')).toBe(false);
    expect(new URL(link).searchParams.has('search')).toBe(false);
  });
});
