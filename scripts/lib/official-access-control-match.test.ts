import { describe, expect, it } from 'vitest';
import { officialAccessControlMatchesRoute } from './official-access-control-match';

describe('official access-control route scoping', () => {
  const oregonSiteUsedByIdahoRoutes = {
    state: 'Oregon',
    routeIds: ['north-fork-owyhee-campground-three-forks', 'owyhee-river-three-forks-rome'],
  };

  it('allows an explicitly scoped access point across a route-state boundary', () => {
    expect(officialAccessControlMatchesRoute(oregonSiteUsedByIdahoRoutes, {
      id: 'north-fork-owyhee-campground-three-forks',
      state: 'Idaho',
    })).toBe(true);
  });

  it('does not apply a route-scoped control to other routes', () => {
    expect(officialAccessControlMatchesRoute(oregonSiteUsedByIdahoRoutes, {
      id: 'unrelated-owyhee-route',
      state: 'Oregon',
    })).toBe(false);
  });

  it('keeps state matching as the default for controls without route IDs', () => {
    expect(officialAccessControlMatchesRoute({ state: 'Washington' }, {
      id: 'unrelated-route',
      state: 'Washington',
    })).toBe(true);
  });
});
