import { defaultFilters, type ExploreFilters } from '../components/explore-filter-sheet';

export const EXPLORE_PREFERENCES_STORAGE_KEY = 'paddletoday:explore-preferences:v4';

export type ExploreIntentId =
  | 'best-nearby'
  | 'clean-now'
  | 'watch'
  | 'skip'
  | 'quick-float'
  | 'full-day'
  | 'camping';

const exploreIntentIds = new Set<ExploreIntentId>([
  'best-nearby',
  'clean-now',
  'watch',
  'skip',
  'quick-float',
  'full-day',
  'camping',
]);

export function isExploreIntentId(value: unknown): value is ExploreIntentId {
  return typeof value === 'string' && exploreIntentIds.has(value as ExploreIntentId);
}

export function filtersForExploreIntent(
  intent: ExploreIntentId,
  context: { locationReady: boolean },
  base: ExploreFilters = defaultFilters
): ExploreFilters {
  if (intent === 'best-nearby') {
    return {
      ...base,
      sort: 'nearest',
      distance: context.locationReady ? '100' : 'any',
      status: 'any',
      rating: 'any',
    };
  }

  if (intent === 'clean-now') {
    return {
      ...base,
      sort: context.locationReady ? 'nearest' : 'best',
      distance: context.locationReady ? '100' : 'any',
      status: 'clean',
      rating: 'any',
    };
  }

  if (intent === 'watch') {
    return {
      ...base,
      sort: context.locationReady ? 'nearest' : 'best',
      distance: context.locationReady ? '100' : 'any',
      status: 'watch',
      rating: 'any',
    };
  }

  if (intent === 'skip') {
    return {
      ...base,
      sort: context.locationReady ? 'nearest' : 'best',
      distance: context.locationReady ? '100' : 'any',
      status: 'skip',
      rating: 'any',
    };
  }

  if (intent === 'quick-float') {
    return {
      ...base,
      sort: context.locationReady ? 'nearest' : 'best',
      distance: context.locationReady ? '100' : 'any',
      difficulty: 'easy-moderate',
      routeType: 'non-whitewater',
      paddleTime: 'up-to-3',
      status: 'any',
      rating: 'any',
    };
  }

  if (intent === 'camping') {
    return {
      ...base,
      sort: context.locationReady ? 'nearest' : 'best',
      distance: context.locationReady ? '150' : 'any',
      camping: 'supported',
      status: 'any',
      rating: 'any',
    };
  }

  return {
    ...base,
    sort: 'score',
    difficulty: 'any',
    routeType: 'all',
    paddleTime: 'full-day',
    status: 'any',
    rating: 'any',
  };
}

export function labelForExploreIntent(intent: ExploreIntentId) {
  if (intent === 'best-nearby') return 'Best nearby';
  if (intent === 'clean-now') return 'Clean routes';
  if (intent === 'watch') return 'Watch routes';
  if (intent === 'skip') return 'Skip routes';
  if (intent === 'quick-float') return 'Quick floats';
  if (intent === 'camping') return 'Camping routes';
  return 'Full-day routes';
}

export function descriptionForExploreIntent(intent: ExploreIntentId, locationReady: boolean) {
  const suffix = locationReady ? ' near you' : '';
  if (intent === 'best-nearby') return `Nearby routes sorted by drive time${suffix}.`;
  if (intent === 'clean-now') return `Strong and Good route calls${suffix}.`;
  if (intent === 'watch') return `Fair calls worth monitoring${suffix}.`;
  if (intent === 'skip') return `No-go calls grouped for rechecks${suffix}.`;
  if (intent === 'quick-float') return `Easy or moderate rec routes under three hours${suffix}.`;
  if (intent === 'camping') return `Routes with camping support${suffix}.`;
  return 'Full-day single-day routes sorted by score.';
}
