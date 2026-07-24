import type { RiverDetailApiResult } from '@paddletoday/api-contract';

export type HubDistanceFilter = 'all' | 'under-5' | '5-10' | '10-plus';
export type HubDifficultyFilter = 'all' | 'easy' | 'moderate' | 'hard';

export interface RiverHubFilters {
  distance: HubDistanceFilter;
  difficulty: HubDifficultyFilter;
  region: string | null;
}

export function filterRiverHubRoutes(
  routes: RiverDetailApiResult[],
  filters: RiverHubFilters
) {
  return routes.filter((route) => {
    if (filters.difficulty !== 'all' && route.river.profile.difficulty !== filters.difficulty) {
      return false;
    }

    if (filters.region && route.river.region !== filters.region) {
      return false;
    }

    const distance = routeDistanceMiles(route);
    if (filters.distance === 'under-5') return distance !== null && distance < 5;
    if (filters.distance === '5-10') return distance !== null && distance >= 5 && distance < 10;
    if (filters.distance === '10-plus') return distance !== null && distance >= 10;
    return true;
  });
}

export function routeDistanceMiles(route: RiverDetailApiResult) {
  const match = route.river.distanceLabel.match(/(\d+(?:\.\d+)?)/);
  if (!match) {
    return null;
  }

  const distance = Number(match[1]);
  return Number.isFinite(distance) ? distance : null;
}

export function activeRiverHubFilterCount(filters: RiverHubFilters) {
  return Number(filters.distance !== 'all')
    + Number(filters.difficulty !== 'all')
    + Number(Boolean(filters.region));
}
