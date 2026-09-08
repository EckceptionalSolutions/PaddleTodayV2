import type { SetStateAction } from 'react';
import type { ExploreFilters } from '../components/explore-filter-sheet';

export const EXPLORE_SEARCH_DELAY_MS = 250;

export interface ExploreSearchState {
  filters: ExploreFilters;
  query: string;
}

export type ExploreSearchAction =
  | { type: 'type'; query: string }
  | { type: 'apply'; query: string }
  | { type: 'filters'; update: SetStateAction<ExploreFilters> };

export function exploreSearchReducer(state: ExploreSearchState, action: ExploreSearchAction): ExploreSearchState {
  if (action.type === 'filters') {
    // Explicit presets/reset replace the query. An adjustment such as nearest
    // sorting keeps, and applies, what the user has already typed.
    const filters = typeof action.update === 'function'
      ? action.update(state.query === state.filters.query ? state.filters : { ...state.filters, query: state.query })
      : action.update;
    return { filters, query: filters.query };
  }
  if (action.type === 'apply') {
    // A cancelled timer may already have queued its callback. Never resurrect
    // an older query after typing, clearing, or applying an external preset.
    if (action.query !== state.query || state.filters.query === action.query) return state;
    return { ...state, filters: { ...state.filters, query: action.query } };
  }
  if (action.query === state.query) return state;
  return {
    query: action.query,
    filters: action.query === '' ? { ...state.filters, query: '' } : state.filters,
  };
}
