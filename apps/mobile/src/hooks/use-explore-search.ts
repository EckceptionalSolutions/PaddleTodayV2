import { useCallback, useEffect, useReducer, type SetStateAction } from 'react';
import type { ExploreFilters } from '../components/explore-filter-sheet';
import { EXPLORE_SEARCH_DELAY_MS, exploreSearchReducer } from '../lib/explore-search-state';

export function useExploreSearch(initialFilters: ExploreFilters) {
  const [state, dispatch] = useReducer(exploreSearchReducer, {
    filters: initialFilters,
    query: initialFilters.query,
  });
  useEffect(() => {
    if (state.query === state.filters.query) return;
    const timer = setTimeout(() => dispatch({ type: 'apply', query: state.query }), EXPLORE_SEARCH_DELAY_MS);
    return () => clearTimeout(timer);
  }, [state.query, state.filters.query]);

  const setFilters = useCallback((update: SetStateAction<ExploreFilters>) => dispatch({ type: 'filters', update }), []);
  const setQuery = useCallback((query: string) => dispatch({ type: 'type', query }), []);
  const applySearch = useCallback(() => dispatch({ type: 'apply', query: state.query }), [state.query]);
  return { filters: state.filters, query: state.query, setFilters, setQuery, applySearch };
}
