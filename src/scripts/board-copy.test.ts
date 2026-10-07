import { describe, expect, it } from 'vitest';
import { exploreEmptyState } from './board-copy.js';

describe('Explore recovery copy', () => {
  it('does not offer no-results recovery before the board loads', () => {
    expect(exploreEmptyState({ loaded: false, query: 'missing river' })).toEqual({
      message: 'Loading routes…', clearSearch: false,
    });
  });

  it('offers query-specific recovery and explains that the area stays selected', () => {
    const state = exploreEmptyState({ loaded: true, query: 'missing river', areaCount: 20 });
    expect(state.message).toContain('“missing river”');
    expect(state.message).toContain('current area and trip filters');
    expect(state.message).toContain('keep browsing this area');
    expect(state.clearSearch).toBe(true);
  });

  it('distinguishes a missing nearby location from an empty area or restrictive trip filters', () => {
    expect(exploreEmptyState({ loaded: true, needsLocation: true, query: 'rum' })).toEqual({
      message: 'Choose a city or use GPS to search nearby.', clearSearch: false,
    });
    expect(exploreEmptyState({ loaded: true, areaCount: 0 }).message).toContain('No published routes');
    expect(exploreEmptyState({ loaded: true, areaCount: 20 }).message).toContain('Clear trip filters');
  });
});
