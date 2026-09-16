import { describe, expect, it } from 'vitest';
import { applyExploreTripPreset, clearExploreFilters, defaultExploreFilters, setExploreScope, normalizeExploreConditions, countExploreTripFilters } from './explore-filters.js';
import { matchesBoardRouteFilters } from './board-domain.js';
import { exploreCatalogPoints } from './explore-catalog-map.js';

describe('Explore geography and trip preferences', () => {
  it.each(['Strong', 'Good'])('restores old %s links as Paddle today without changing geography', rating => {
    const filters = normalizeExploreConditions({ ...defaultExploreFilters, rating, scope: 'state', state: 'Arizona' });
    expect(filters).toMatchObject({ rating: '', paddleable: true, scope: 'state', state: 'Arizona' });
    expect(countExploreTripFilters(filters)).toBe(1);
    expect(matchesBoardRouteFilters({ rating: 'Strong', river: { state: 'Arizona' } }, filters)).toBe(true);
    expect(matchesBoardRouteFilters({ rating: 'Good', river: { state: 'Arizona' } }, filters)).toBe(true);
    expect(matchesBoardRouteFilters({ rating: 'Fair', river: { state: 'Arizona' } }, filters)).toBe(false);
    expect(countExploreTripFilters(clearExploreFilters(filters))).toBe(0);
  });
  it('state and national browsing discard a previous nearby radius', () => {
    const nearby = { ...defaultExploreFilters, scope: 'nearby', distance: '50', sort: 'nearest' };
    const state = { ...setExploreScope(nearby, 'state'), state: 'Arizona' };
    expect(state).toMatchObject({ scope: 'state', distance: '', sort: 'best-now' });
    expect(matchesBoardRouteFilters({ river: { state: 'Arizona' } }, state)).toBe(true);
    expect(setExploreScope(state, 'anywhere')).toMatchObject({ state: '', distance: '' });
  });
  it('trip shortcuts preserve state/search and clear conflicting trip attributes', () => {
    const state = { ...defaultExploreFilters, scope: 'state', state: 'Arizona', search: 'Verde' };
    const camping = applyExploreTripPreset(state, 'long-camping');
    const quick = applyExploreTripPreset(camping, 'quick-float');
    expect(quick).toMatchObject({ state: 'Arizona', search: 'Verde', paddleTime: 'up-to-3', paddleLength: '', camping: '' });
    expect(applyExploreTripPreset(quick, 'full-day')).toMatchObject({ difficulty: '', paddleTime: '5-to-7', state: 'Arizona' });
    expect(clearExploreFilters({ ...quick, sort: 'a-z' })).toMatchObject({ scope: 'state', state: 'Arizona', search: 'Verde', sort: 'a-z', rating: 'all', routeType: 'all' });
    expect(applyExploreTripPreset(quick, 'all-routes')).toEqual(defaultExploreFilters);
  });
  it('does not misclassify unavailable/planning routes as Skip', () => {
    const result = { rating: 'No-go', readiness: { status: 'withheld' }, river: { state: 'Arizona' } };
    expect(matchesBoardRouteFilters(result, defaultExploreFilters)).toBe(true);
    expect(matchesBoardRouteFilters(result, { ...defaultExploreFilters, rating: 'No-go' })).toBe(false);
  });
  it('keeps routes beyond the first 100 river groups in the coverage layer', () => {
    const items = Array.from({ length: 150 }, (_, i) => ({ key: String(i), matchingRoutes: [{
      river: { slug: `route-${i}`, latitude: 30 + i / 100, longitude: -112 }, readiness: { status: 'withheld' },
    }] }));
    const data = exploreCatalogPoints(items);
    expect(data.features).toHaveLength(150);
    expect(data.features[149].properties).toMatchObject({ slug: 'route-149', unavailable: true });
  });
});
