import {
  compareTodayAlphabetically,
  compareTodayConfidenceStatusScore,
  compareTodayLowestRisk,
  compareTodayStatusThenScore,
} from '@paddletoday/api-contract';

export const DEFAULT_RADIUS_MILES = 50;
export const RADIUS_OPTIONS = Object.freeze([25, 50, 75, 100, 150, 200]);
export const HOME_DIFFICULTY_OPTIONS = Object.freeze(['easy', 'moderate', 'hard']);
export const HOME_PADDLE_TIME_OPTIONS = Object.freeze(['up-to-3', '3-to-5', '5-to-7', '7-plus']);

export function normalizeRadiusMiles(value) {
  const numeric = Number(value);
  return RADIUS_OPTIONS.includes(numeric) ? numeric : DEFAULT_RADIUS_MILES;
}

export function radiusIndexForMiles(value) {
  const index = RADIUS_OPTIONS.indexOf(normalizeRadiusMiles(value));
  return index >= 0 ? index : RADIUS_OPTIONS.indexOf(DEFAULT_RADIUS_MILES);
}

export function radiusMilesForIndex(value) {
  return RADIUS_OPTIONS[Number(value)] ?? DEFAULT_RADIUS_MILES;
}

export function nextRadiusSuggestionMiles(radiusMiles) {
  return RADIUS_OPTIONS.find((option) => option > radiusMiles) ?? radiusMiles;
}

export function normalizeHomeDifficultyFilters(value) {
  return normalizeChoiceSet(value, ['any', ...HOME_DIFFICULTY_OPTIONS]);
}

export function normalizeHomePaddleTimeFilters(value) {
  return normalizeChoiceSet(value, ['any', ...HOME_PADDLE_TIME_OPTIONS]);
}

export function isViableRecommendationItem(item) {
  return Boolean(item?.cardRoute?.rating && item.cardRoute.rating !== 'No-go');
}

export function isGroupedItem(item) {
  return item?.kind === 'group' && item?.totalRouteCount > 1;
}

export function recommendationPoolForNearby(items) {
  const viableItems = items.filter(isViableRecommendationItem);
  return viableItems.length > 0 ? viableItems : items;
}

export function buildBoardRecommendationItems(
  nearbyItems,
  overallItems,
  locationReady = false,
  nearbySortMode = 'best-score',
) {
  const preferredNearbyItems = recommendationPoolForNearby(nearbyItems);
  const nearbyReady = locationReady && preferredNearbyItems.length > 0;

  if (nearbyReady) {
    return sortNearbyResultsForDisplay(preferredNearbyItems, nearbySortMode).slice(0, 3);
  }

  const picks = [];
  const seen = new Set();
  const addPick = (item) => {
    if (!item || seen.has(item.key) || picks.length >= 3) {
      return;
    }
    seen.add(item.key);
    picks.push(item);
  };

  addPick(overallItems[0]);
  addPick(
    overallItems.find(
      (item) => !seen.has(item.key) && item.cardRoute.confidence.label === 'High',
    ) || overallItems[1],
  );
  addPick(
    overallItems.find((item) => !seen.has(item.key) && isGroupedItem(item))
      || overallItems.find((item) => !seen.has(item.key)),
  );

  for (const item of overallItems) {
    addPick(item);
  }

  return picks;
}

export function matchesBoardRatingFilter(
  resultRating,
  {
    paddleable = false,
    rating = '',
    visibleRatings = null,
  } = {},
) {
  if (visibleRatings && !visibleRatings.has(resultRating)) {
    return false;
  }
  if (
    paddleable
    && rating !== 'all'
    && !rating
    && !['Strong', 'Good'].includes(resultRating)
  ) {
    return false;
  }
  if (rating && rating !== 'all' && resultRating !== rating) {
    return false;
  }
  return true;
}

export function groupResultsByRiverId(results) {
  const grouped = new Map();

  for (const result of results) {
    const key = result.river.riverId || result.river.slug;
    const bucket = grouped.get(key) ?? [];
    bucket.push(result);
    grouped.set(key, bucket);
  }

  return grouped;
}

export function hasStrongerBoardCall(item, candidates) {
  if (!item?.cardRoute || !Array.isArray(candidates)) {
    return false;
  }

  return candidates.some((candidate) => {
    if (
      !candidate
      || candidate.river.slug === item.cardRoute.river.slug
      || candidate.river.riverId === item.cardRoute.river.riverId
    ) {
      return false;
    }

    return compareTodayStatusThenScore(candidate, item.cardRoute) < 0;
  });
}

export function titleCase(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return '';
  }

  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}

export function normalizeChoiceSet(value, allowedValues) {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? (() => {
          try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [value];
          } catch {
            return [value];
          }
        })()
      : [];

  const normalized = [...new Set(rawValues.filter((entry) => allowedValues.includes(entry)))];
  return normalized.length > 0 ? normalized : ['any'];
}

export function isChoiceSetAny(values) {
  return values.includes('any');
}

export function toggleChoiceValue(values, value, allowedValues) {
  const normalized = normalizeChoiceSet(values, ['any', ...allowedValues]);

  if (value === 'any') {
    return ['any'];
  }

  const next = normalized.filter((entry) => entry !== 'any');
  const exists = next.includes(value);
  const updated = exists ? next.filter((entry) => entry !== value) : [...next, value];

  if (updated.length === 0) {
    return ['any'];
  }

  return allowedValues.filter((entry) => updated.includes(entry));
}

export function paddleTimePreferenceLabel(value) {
  if (value === 'up-to-3') return 'up to 3 hr';
  if (value === '3-to-5') return '3 to 5 hr';
  if (value === '5-to-7') return '5 to 7 hr';
  if (value === '7-plus') return '7+ hr';
  return 'no preference';
}

export function difficultyPreferenceLabel(value) {
  if (value === 'easy') return 'easy only';
  if (value === 'moderate') return 'moderate only';
  if (value === 'hard') return 'hard only';
  return 'any difficulty';
}

export function formatHomeChoiceSummary(values, formatter, fallbackLabel) {
  if (isChoiceSetAny(values)) {
    return fallbackLabel;
  }

  const labels = values.map(formatter).filter(Boolean);
  if (labels.length === 0) {
    return fallbackLabel;
  }
  if (labels.length === 1) {
    return labels[0];
  }
  if (labels.length === 2) {
    return `${labels[0]} + ${labels[1]}`;
  }
  return `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`;
}

export function parseEstimatedPaddleTimeRange(label) {
  if (typeof label !== 'string' || label.trim().length === 0) {
    return null;
  }

  const matches = Array.from(label.matchAll(/(\d+)\s*hr(?:\s*(\d+)\s*min)?/gi))
    .map((match) => Number(match[1]) * 60 + Number(match[2] || 0))
    .filter((value) => Number.isFinite(value));

  if (matches.length === 0) {
    return null;
  }

  return {
    minMinutes: matches[0],
    maxMinutes: matches[matches.length - 1],
  };
}

export function paddleTimeBucketForLabel(label) {
  const range = parseEstimatedPaddleTimeRange(label);
  if (!range) {
    return 'unknown';
  }

  const midpointMinutes = (range.minMinutes + range.maxMinutes) / 2;
  if (midpointMinutes < 180) return 'up-to-3';
  if (midpointMinutes < 300) return '3-to-5';
  if (midpointMinutes < 420) return '5-to-7';
  return '7-plus';
}

export function estimatedPaddleMinutesForItem(item) {
  const range = parseEstimatedPaddleTimeRange(item?.cardRoute?.river?.estimatedPaddleTime ?? '');
  return range ? (range.minMinutes + range.maxMinutes) / 2 : Number.POSITIVE_INFINITY;
}

export function routeDifficultyRank(item) {
  const difficulty = item?.cardRoute?.river?.difficulty;
  if (difficulty === 'easy') return 0;
  if (difficulty === 'moderate') return 1;
  if (difficulty === 'hard') return 2;
  return 3;
}

export function sortNearbyResultsForDisplay(items, mode = 'best-score') {
  const copy = [...items];

  if (mode === 'closest') {
    return copy.sort((left, right) =>
      left.travelMinutes - right.travelMinutes
      || right.cardRoute.score - left.cardRoute.score
    );
  }

  if (mode === 'shortest-paddle') {
    return copy.sort((left, right) =>
      estimatedPaddleMinutesForItem(left) - estimatedPaddleMinutesForItem(right)
      || right.cardRoute.score - left.cardRoute.score
    );
  }

  if (mode === 'easiest') {
    return copy.sort((left, right) =>
      routeDifficultyRank(left) - routeDifficultyRank(right)
      || right.cardRoute.score - left.cardRoute.score
      || left.travelMinutes - right.travelMinutes
    );
  }

  return copy.sort((left, right) =>
    right.cardRoute.score - left.cardRoute.score
    || left.travelMinutes - right.travelMinutes
    || compareTodayConfidenceStatusScore(left.cardRoute, right.cardRoute)
  );
}

export function normalizeBoardSortMode(mode, hasReadyLocation) {
  if ((mode === 'near-you' || mode === 'nearest') && !hasReadyLocation) {
    return 'best-now';
  }

  return mode;
}

export function sortBoardItems(items, mode, { hasUserLocation = false } = {}) {
  const copy = [...items];

  if (mode === 'near-you' && hasUserLocation) {
    return copy.sort((left, right) =>
      right.effectiveScore - left.effectiveScore
      || left.travelMinutes - right.travelMinutes
      || compareTodayStatusThenScore(left.cardRoute, right.cardRoute)
    );
  }

  if (mode === 'nearest' && hasUserLocation) {
    return copy.sort((left, right) =>
      left.travelMinutes - right.travelMinutes
      || compareTodayStatusThenScore(left.cardRoute, right.cardRoute)
    );
  }

  if (mode === 'highest-confidence') {
    return copy.sort((left, right) =>
      compareTodayConfidenceStatusScore(left.cardRoute, right.cardRoute)
    );
  }

  if (mode === 'lowest-risk') {
    return copy.sort((left, right) =>
      compareTodayLowestRisk(left.cardRoute, right.cardRoute)
    );
  }

  if (mode === 'a-z') {
    return copy.sort((left, right) =>
      compareTodayAlphabetically(left.cardRoute, right.cardRoute)
    );
  }

  return copy.sort((left, right) =>
    compareTodayStatusThenScore(left.cardRoute, right.cardRoute)
  );
}

export function paginateItems(items, pageSize, page) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    items: items.slice(startIndex, endIndex),
  };
}

export function clampText(text, maxLength) {
  if (typeof text !== 'string') return '';
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).replace(/[ ,;:.!?-]+$/, '')}...`;
}

export function simpleSentence(text, fallback) {
  const normalized = typeof text === 'string' ? text.trim() : '';
  if (!normalized) return fallback;

  const lowered = normalized.toLowerCase();
  if (lowered.includes('perfect level')) return 'Water level is in the preferred range.';
  if (lowered.includes('slightly low')) return 'Water level is a little low but still workable.';
  if (lowered.includes('too low')) return 'Water level looks too low to be worth the drive.';
  if (lowered.includes('stable')) return 'The gauge looks steady right now.';
  if (lowered.includes('rising')) return 'The gauge is rising; re-check before you launch.';
  if (lowered.includes('falling')) return 'The gauge is dropping; re-check before you launch.';
  if (lowered.includes('rain soon') || lowered.includes('rain incoming') || lowered.includes('rain later')) {
    return 'Rain may change conditions later today.';
  }
  if (lowered.includes('mostly dry')) return 'Weather looks mostly cooperative.';
  if (lowered.includes('windy')) return 'Wind will be part of the trip today.';
  if (lowered.includes('cold')) return 'Cold air keeps the day less comfortable.';

  const sentence = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  return sentence.endsWith('.') ? sentence : `${sentence}.`;
}

export function joinWithBullet(parts) {
  return parts.filter(Boolean).join(' / ');
}

export function splitBulletParts(text) {
  if (typeof text !== 'string') {
    return [];
  }

  return text
    .split(/\s+(?:\/|[^\w\s]{1,4})\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}
