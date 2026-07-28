import { describe, expect, it } from 'vitest';
import {
  buildBoardRecommendationItems,
  clampText,
  createBoardDisplayItemBuilder,
  createBoardResultFilter,
  DEFAULT_RADIUS_MILES,
  estimatedPaddleMinutesForItem,
  formatHomeChoiceSummary,
  groupResultsByRiverId,
  hasStrongerBoardCall,
  isChoiceSetAny,
  isViableRecommendationItem,
  matchesBoardRatingFilter,
  matchesBoardRouteFilters,
  normalizeBoardSortMode,
  normalizeChoiceSet,
  normalizeHomeDifficultyFilters,
  normalizeRadiusMiles,
  paginateItems,
  paddleTimeBucketForLabel,
  parseEstimatedPaddleTimeRange,
  recommendationPoolForNearby,
  sortNearbyResultsForDisplay,
  sortBoardItems,
  routeDifficultyRank,
  toggleChoiceValue,
} from './board-domain.js';

function item(rating: string | null) {
  return { cardRoute: { rating } };
}

describe('board recommendation domain', () => {
  it('treats every scored call except No-go as viable', () => {
    expect(isViableRecommendationItem(item('Strong'))).toBe(true);
    expect(isViableRecommendationItem(item('Good'))).toBe(true);
    expect(isViableRecommendationItem(item('Fair'))).toBe(true);
    expect(isViableRecommendationItem(item('No-go'))).toBe(false);
    expect(isViableRecommendationItem(item(null))).toBe(false);
  });

  it('uses viable items when available and otherwise preserves the fallback pool', () => {
    const noGo = item('No-go');
    const good = item('Good');
    expect(recommendationPoolForNearby([noGo, good])).toEqual([good]);
    expect(recommendationPoolForNearby([noGo])).toEqual([noGo]);
  });

  it('selects recommendation slots with confidence and river diversity', () => {
    const items = [
      { key: 'first', kind: 'route', cardRoute: { confidence: { label: 'Medium' }, score: 90 } },
      { key: 'high', kind: 'route', cardRoute: { confidence: { label: 'High' }, score: 80 } },
      {
        key: 'group',
        kind: 'group',
        totalRouteCount: 2,
        cardRoute: { confidence: { label: 'Medium' }, score: 70 },
      },
      { key: 'fourth', kind: 'route', cardRoute: { confidence: { label: 'High' }, score: 60 } },
    ];

    expect(buildBoardRecommendationItems([], items)).toEqual(items.slice(0, 3));
    expect(buildBoardRecommendationItems(items, [], true)).toEqual(items.slice(0, 3));
  });
});

describe('board display item domain', () => {
  const buildItems = createBoardDisplayItemBuilder({
    selectRepresentative: (routes: any[], mode: string) => ({
      route: routes[0],
      mode,
    }),
    distanceForResult: (route: any) => route.distanceMiles,
    distanceBucketForMinutes: (minutes: number) => `${minutes}-minute bucket`,
    buildGroupLink: (boardItem: any) => `/rivers/by-river/${boardItem.key}/`,
  });
  const routes = [
    {
      rating: 'Strong',
      score: 90,
      distanceMiles: 30,
      river: {
        riverId: 'rum-river',
        slug: 'rum-upper',
        name: 'Rum River',
        estimatedPaddleTime: '3 hours',
      },
    },
    {
      rating: 'Good',
      score: 80,
      distanceMiles: 35,
      river: {
        riverId: 'rum-river',
        slug: 'rum-lower',
        name: 'Rum River',
        estimatedPaddleTime: '4 hours',
      },
    },
  ];

  it('groups routes and applies page selection, distance, and link policies', () => {
    expect(buildItems(routes, routes, 'best-now')).toEqual([
      expect.objectContaining({
        key: 'rum-river',
        kind: 'group',
        cardRoute: routes[0],
        matchingRouteCount: 2,
        totalRouteCount: 2,
        paddleableRouteCount: 2,
        representativeMode: 'best-now',
        distanceMiles: 30,
        travelMinutes: 35,
        effectiveScore: 84.16666666666667,
        distanceBucket: '35-minute bucket',
        link: '/rivers/by-river/rum-river/',
      }),
    ]);
  });

  it('keeps total river counts when filters leave one matching route', () => {
    expect(buildItems(routes, [routes[1]], 'nearest')).toEqual([
      expect.objectContaining({
        kind: 'group',
        cardRoute: routes[1],
        matchingRouteCount: 1,
        totalRouteCount: 2,
        representativeMode: 'nearest',
      }),
    ]);
  });

  it('rejects an incomplete page adapter', () => {
    expect(() => createBoardDisplayItemBuilder({
      selectRepresentative: () => null,
    } as any)).toThrow('requires selection, distance, bucket, and group-link policies');
  });
});

describe('board filter domain', () => {
  const allowed = ['any', 'easy', 'moderate', 'hard'];

  it('normalizes stored choice sets and falls back to any', () => {
    expect(normalizeChoiceSet('["easy","hard","easy"]', allowed)).toEqual(['easy', 'hard']);
    expect(normalizeChoiceSet('unknown', allowed)).toEqual(['any']);
    expect(isChoiceSetAny(['any'])).toBe(true);
  });

  it('treats all as a sentinel while preserving default paddleable filtering', () => {
    expect(matchesBoardRatingFilter('Fair', { paddleable: true, rating: '' })).toBe(false);
    expect(matchesBoardRatingFilter('Good', { paddleable: true, rating: '' })).toBe(true);
    expect(matchesBoardRatingFilter('Fair', { paddleable: true, rating: 'all' })).toBe(true);
    expect(matchesBoardRatingFilter('Good', { rating: 'Strong' })).toBe(false);
    expect(matchesBoardRatingFilter('Strong', {
      rating: 'all',
      visibleRatings: new Set(['Good', 'Fair']),
    })).toBe(false);
  });

  it('applies one route filter contract across rating, route, and trip facts', () => {
    const result = {
      rating: 'Good',
      distanceMiles: 28,
      river: {
        name: 'Rum River',
        aliases: ['Watonwan test alias'],
        reach: 'Wayside to Milaca',
        state: 'Minnesota',
        region: 'Central Minnesota',
        difficulty: 'easy',
        routeType: 'recreational',
        estimatedPaddleTime: '3 hours',
        logistics: { campingClassification: 'nearby_basecamp' },
      },
    };
    const context = {
      userLocation: { latitude: 45, longitude: -93 },
      distanceForResult: (route: any) => route.distanceMiles,
    };

    expect(matchesBoardRouteFilters(result, {
      paddleable: true,
      state: 'Minnesota',
      difficulty: 'easy',
      routeType: 'non-whitewater',
      camping: 'nearby',
      distance: '30',
      search: 'watonwan',
    }, context)).toBe(true);
    expect(matchesBoardRouteFilters(result, {
      rating: 'Strong',
    }, context)).toBe(false);
    expect(matchesBoardRouteFilters(result, {
      routeType: 'whitewater',
    }, context)).toBe(false);
    expect(matchesBoardRouteFilters(result, {
      camping: 'overnight',
    }, context)).toBe(false);
    expect(matchesBoardRouteFilters(result, {
      distance: '20',
    }, context)).toBe(false);
  });

  it('creates a live predicate from page-owned filter state', () => {
    let filters = { state: 'Minnesota' };
    let userLocation: { latitude: number; longitude: number } | null = null;
    const predicate = createBoardResultFilter({
      getFilters: () => filters,
      getVisibleRatings: () => new Set(['Good']),
      getUserLocation: () => userLocation,
      distanceForResult: () => 10,
      includeAliases: false,
    });
    const result = {
      rating: 'Good',
      river: { name: 'Rum River', state: 'Minnesota' },
    };

    expect(predicate(result)).toBe(true);
    filters = { ...filters, distance: '25' };
    expect(predicate(result)).toBe(false);
    userLocation = { latitude: 45, longitude: -93 };
    expect(predicate(result)).toBe(true);
  });

  it('toggles choices without combining any with explicit values', () => {
    expect(toggleChoiceValue(['any'], 'easy', allowed.slice(1))).toEqual(['easy']);
    expect(toggleChoiceValue(['easy'], 'hard', allowed.slice(1))).toEqual(['easy', 'hard']);
    expect(toggleChoiceValue(['easy'], 'easy', allowed.slice(1))).toEqual(['any']);
    expect(toggleChoiceValue(['easy'], 'any', allowed.slice(1))).toEqual(['any']);
  });

  it('formats human-readable choice summaries', () => {
    expect(formatHomeChoiceSummary(['any'], String, 'Anything')).toBe('Anything');
    expect(formatHomeChoiceSummary(['easy', 'hard'], String, 'Anything')).toBe('easy + hard');
    expect(formatHomeChoiceSummary(['easy', 'moderate', 'hard'], String, 'Anything')).toBe(
      'easy, moderate, and hard'
    );
  });

  it('parses paddle duration ranges and assigns shared buckets', () => {
    expect(parseEstimatedPaddleTimeRange('About 2 hr 30 min to 4 hr')).toEqual({
      minMinutes: 150,
      maxMinutes: 240,
    });
    expect(paddleTimeBucketForLabel('About 2 hr')).toBe('up-to-3');
    expect(paddleTimeBucketForLabel('About 4 hr')).toBe('3-to-5');
    expect(paddleTimeBucketForLabel('About 6 hr')).toBe('5-to-7');
    expect(paddleTimeBucketForLabel('About 8 hr')).toBe('7-plus');
  });

  it('derives paddle duration and difficulty from board items', () => {
    const boardItem = {
      cardRoute: {
        river: {
          estimatedPaddleTime: '3 hr to 5 hr',
          difficulty: 'moderate',
        },
      },
    };
    expect(estimatedPaddleMinutesForItem(boardItem)).toBe(240);
    expect(routeDifficultyRank(boardItem)).toBe(1);
  });

  it('groups route results by river id with slug fallback', () => {
    const grouped = groupResultsByRiverId([
      { river: { riverId: 'cannon', slug: 'cannon-a' } },
      { river: { riverId: 'cannon', slug: 'cannon-b' } },
      { river: { slug: 'legacy-route' } },
    ]);

    expect(grouped.get('cannon')).toHaveLength(2);
    expect(grouped.get('legacy-route')).toHaveLength(1);
  });

  it('detects a stronger call outside the current river', () => {
    const current = {
      cardRoute: {
        score: 60,
        river: { riverId: 'current', slug: 'current-a' },
        liveData: { overall: 'live' },
      },
    };
    const candidates = [
      current.cardRoute,
      {
        score: 85,
        river: { riverId: 'stronger', slug: 'stronger-a' },
        liveData: { overall: 'live' },
      },
    ];

    expect(hasStrongerBoardCall(current, candidates)).toBe(true);
    expect(hasStrongerBoardCall(current, [current.cardRoute])).toBe(false);
  });

  it('normalizes shared radius and filter policy', () => {
    expect(normalizeRadiusMiles('75')).toBe(75);
    expect(normalizeRadiusMiles(70)).toBe(DEFAULT_RADIUS_MILES);
    expect(normalizeHomeDifficultyFilters(['easy', 'unknown'])).toEqual(['easy']);
  });

  it('sorts nearby cards with one mode-aware implementation', () => {
    const cards = [
      { travelMinutes: 40, cardRoute: { score: 80, river: { estimatedPaddleTime: '5 hr', difficulty: 'moderate' }, confidence: { score: 90 } } },
      { travelMinutes: 20, cardRoute: { score: 70, river: { estimatedPaddleTime: '2 hr', difficulty: 'easy' }, confidence: { score: 90 } } },
    ];
    expect(sortNearbyResultsForDisplay(cards, 'closest')[0].travelMinutes).toBe(20);
    expect(sortNearbyResultsForDisplay(cards, 'shortest-paddle')[0].travelMinutes).toBe(20);
    expect(sortNearbyResultsForDisplay(cards, 'easiest')[0].travelMinutes).toBe(20);
    expect(sortNearbyResultsForDisplay(cards, 'best-score')[0].cardRoute.score).toBe(80);
  });

  it('normalizes location-dependent board sorts and applies shared ordering', () => {
    const cards = [
      {
        effectiveScore: 70,
        travelMinutes: 20,
        cardRoute: {
          score: 90,
          rating: 'Strong',
          river: { name: 'Zulu', slug: 'zulu' },
          confidence: { label: 'High', score: 90 },
          liveData: { overall: 'live' },
        },
      },
      {
        effectiveScore: 80,
        travelMinutes: 40,
        cardRoute: {
          score: 75,
          rating: 'Good',
          river: { name: 'Alpha', slug: 'alpha' },
          confidence: { label: 'Medium', score: 70 },
          liveData: { overall: 'live' },
        },
      },
    ];

    expect(normalizeBoardSortMode('near-you', false)).toBe('best-now');
    expect(normalizeBoardSortMode('nearest', true)).toBe('nearest');
    expect(sortBoardItems(cards, 'near-you', { hasUserLocation: true })[0].effectiveScore).toBe(80);
    expect(sortBoardItems(cards, 'nearest', { hasUserLocation: true })[0].travelMinutes).toBe(20);
    expect(sortBoardItems(cards, 'a-z')[0].cardRoute.river.name).toBe('Alpha');
    expect(sortBoardItems(cards, 'best-now')[0].cardRoute.score).toBe(90);
    expect(cards[0].cardRoute.river.name).toBe('Zulu');
  });

  it('paginates and clamps shared presentation inputs', () => {
    expect(paginateItems([1, 2, 3, 4, 5], 2, 8)).toMatchObject({
      totalPages: 3,
      currentPage: 3,
      items: [5],
    });
    expect(clampText('  A   longer title!  ', 8)).toBe('A longer...');
  });
});
