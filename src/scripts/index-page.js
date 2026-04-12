import {
  MAP_STYLE_URL,
  bindMarkerPopup,
  ensureMapLibre,
  escapeHtml,
  markerClassForRating,
} from './map-runtime.js';
import { freshnessLabel, readCachedPayload, writeCachedPayload } from './client-cache.js';
import { bindFavoriteButtons, decorateFavoriteButton, refreshFavoriteButtons } from './favorites-ui.js';
import { confidenceDisplayLabel, liveDataWarning } from './ui-taxonomy.js';
import { createRequestGuard, isAbortError } from './request-guard.js';

const STORAGE_KEY = 'paddletoday:user-location';
const STORAGE_RADIUS_KEY = 'paddletoday:recommendation-radius';
const GEOLOCATION_TIMEOUT_MS = 10000;
const AUTO_REFRESH_MS = 5 * 60 * 1000;
const NEARBY_TRAVEL_MINUTES = 90;
const DAY_TRIP_TRAVEL_MINUTES = 180;
const AVERAGE_DRIVE_MPH = 50;
const DEFAULT_RADIUS_MILES = 100;
const RADIUS_OPTIONS = [25, 50, 75, 100, 150, 200];
const US_STATE_ABBREVIATIONS = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
};

const recommendationGrid = document.querySelector('[data-recommendation-grid]');
const recommendationSummary = document.querySelector('[data-recommendation-summary]');
const recommendationTitle = document.querySelector('[data-recommendation-title]');
const recommendationEmpty = document.querySelector('[data-recommendation-empty]');
const nearbyLocationPanel = document.querySelector('[data-nearby-location-panel]');
const homeJumpButtons = Array.from(document.querySelectorAll('[data-home-jump-target]'));
const homeLocationSummary = document.querySelector('[data-home-location-summary]');
const homeLocationSortSummary = document.querySelector('[data-home-location-sort-summary]');
const homeRadiusPanel = document.querySelector('[data-home-radius-panel]');
const homeRadiusSummary = document.querySelector('[data-home-radius-summary]');
const homeRadiusSlider = document.querySelector('[data-home-radius-slider]');
const homeHeadline = document.querySelector('[data-home-headline]');
const homeLocationEmpty = document.querySelector('[data-home-location-empty]');
const glanceFilterButtons = Array.from(document.querySelectorAll('[data-glance-filter]'));
const exploreGrid = document.querySelector('[data-explore-grid]');
const exploreShell = document.querySelector('[data-explore-shell]');
const exploreContent = document.querySelector('[data-explore-content]');
const cardTemplate = document.querySelector('[data-river-card-template]');
const recommendationTemplate = document.querySelector('[data-recommendation-card-template]');

const featuredPanel = document.querySelector('.hero-call');
const featuredLabel = document.querySelector('[data-best-near-label]');
const featuredState = document.querySelector('[data-featured-state]');
const featuredName = document.querySelector('[data-field="featured-title-link"]');
const featuredReach = document.querySelector('[data-featured-reach]');
const featuredLink = document.querySelector('[data-featured-link]');
const featuredSummary = document.querySelector('[data-field="featured-explanation"]');
const featuredToggle = document.querySelector('[data-featured-toggle]');
const featuredReason = document.querySelector('[data-field="featured-reason"]');
const featuredSignal = document.querySelector('[data-field="featured-signal"]');
const featuredReasons = document.querySelector('[data-featured-reasons]');
const featuredMapShell = document.querySelector('[data-featured-map-shell]');
const featuredMap = document.querySelector('[data-featured-map]');
const featuredMapStatus = document.querySelector('[data-featured-map-status]');
const recommendationSection = document.querySelector('.decision-section--recommended');
const exploreSection = document.querySelector('.decision-section--explore');
const homeFreshness = document.querySelector('[data-home-freshness]');
const homeFreshnessWrap = document.querySelector('[data-home-freshness-wrap]');
const homeStrongCount = document.querySelector('[data-home-strong-count]');
const homeGoodCount = document.querySelector('[data-home-good-count]');
const homeMixedCount = document.querySelector('[data-home-mixed-count]');
const homeNoGoCount = document.querySelector('[data-home-no-go-count]');
const homeTrackedCounts = Array.from(document.querySelectorAll('[data-home-tracked-count]'));

const summaryHeadline = document.querySelector('[data-summary-headline]');
const summaryDetail = document.querySelector('[data-summary-detail]');
const boardStatusBanner = document.querySelector('[data-board-status-banner]');
const boardBannerTitle = document.querySelector('[data-board-banner-title]');
const boardBannerDetail = document.querySelector('[data-board-banner-detail]');
const boardFetchBanner = document.querySelector('[data-board-fetch-banner]');
const boardFetchTitle = document.querySelector('[data-board-fetch-title]');
const boardFetchDetail = document.querySelector('[data-board-fetch-detail]');
const boardRefreshButton = document.querySelector('[data-board-refresh]');
const boardRefreshNote = document.querySelector('[data-board-refresh-note]');

const filterSummary = document.querySelector('[data-filter-summary]');
const filterButtons = Array.from(document.querySelectorAll('[data-filter-toggle]'));
const filterSearch = document.querySelector('[data-filter-search]');
const filterState = document.querySelector('[data-filter-state]');
const filterRegion = document.querySelector('[data-filter-region]');
const sortSelect = document.querySelector('[data-sort-select]');
const explorePagination = document.querySelector('[data-explore-pagination]');
const explorePaginationSummary = document.querySelector('[data-explore-pagination-summary]');
const explorePageLabel = document.querySelector('[data-explore-page]');
const explorePrevButton = document.querySelector('[data-explore-prev]');
const exploreNextButton = document.querySelector('[data-explore-next]');
const locationIndicator = document.querySelector('[data-location-indicator]');
const locationIndicatorLabel = document.querySelector('[data-location-indicator-label]');

const locationUseButtons = Array.from(document.querySelectorAll('[data-location-use]'));
const locationForm = document.querySelector('[data-location-form]');
const locationInput = document.querySelector('[data-location-input]');
const locationClearButton = document.querySelector('[data-location-clear]');
const locationEditTrigger = document.querySelector('[data-location-edit-trigger]');
const locationSelected = document.querySelector('[data-location-selected]');
const locationStatus = null;

const summaryMap = document.querySelector('[data-summary-map]');
const summaryMapStatus = document.querySelector('[data-summary-map-status]');
const summaryMapShell = document.querySelector('[data-summary-map-shell]');
const summaryMapToggle = document.querySelector('[data-summary-map-toggle]');
const summaryMapResults = document.querySelector('[data-summary-map-results]');
const summaryMapResultsNote = document.querySelector('[data-summary-map-results-note]');
const phoneBreakpoint = window.matchMedia('(max-width: 760px)');

const statusWeight = {
  live: 2,
  degraded: 1,
  offline: 0,
};

const confidenceWeight = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const activeFilters = {
  paddleable: false,
  highConfidence: false,
  rating: '',
  search: '',
  state: '',
  region: '',
  sort: 'best-now',
};

let latestResults = [];
let hasLoadedBoardOnce = false;
let lastBoardSuccessAt = null;
let mapRuntime = null;
let mapMarkers = [];
let mapMarkersByKey = new Map();
let summaryMapRenderVersion = 0;
let selectedSummaryMapKey = null;
let lastSummaryMapItems = [];
let featuredMapRuntime = null;
let featuredMapMarker = null;
let featuredMapRenderVersion = 0;
let userLocation = null;
let userLocationState = 'idle';
let locationEditing = false;
let selectedRadiusMiles = DEFAULT_RADIUS_MILES;
let currentExplorePage = 1;
let exploreLockedHeight = 0;
let exploreLayoutKey = '';
let lastBoardGeneratedAt = null;
let summaryMapCollapsed = phoneBreakpoint.matches;
const boardRequestGuard = createRequestGuard();

const EXPLORE_PAGE_SIZE = 12;
const SUMMARY_CACHE_KEY = 'river-summary:v2';

function setText(scope, field, value) {
  const nodes = Array.from(scope.querySelectorAll(`[data-field="${field}"]`));
  for (const node of nodes) {
    node.textContent = value;
  }
  return nodes[0] ?? null;
}

function normalizeRadiusMiles(value) {
  const numeric = Number(value);
  return RADIUS_OPTIONS.includes(numeric) ? numeric : DEFAULT_RADIUS_MILES;
}

function radiusIndexForMiles(value) {
  const normalized = normalizeRadiusMiles(value);
  const index = RADIUS_OPTIONS.indexOf(normalized);
  return index >= 0 ? index : RADIUS_OPTIONS.indexOf(DEFAULT_RADIUS_MILES);
}

function radiusMilesForIndex(value) {
  const index = Number(value);
  return RADIUS_OPTIONS[index] ?? DEFAULT_RADIUS_MILES;
}

function ratingToneKey(rating) {
  if (rating === 'Strong') return 'great';
  if (rating === 'Fair') return 'marginal';
  return String(rating).toLowerCase().replace(/[^a-z]+/g, '-');
}

function groupResultsByRiverId(results) {
  const grouped = new Map();

  for (const result of results) {
    const key = result.river.riverId || result.river.slug;
    const bucket = grouped.get(key) ?? [];
    bucket.push(result);
    grouped.set(key, bucket);
  }

  return grouped;
}

function compareResults(left, right) {
  const leftStatus = statusWeight[left.liveData.overall] ?? 0;
  const rightStatus = statusWeight[right.liveData.overall] ?? 0;
  if (leftStatus !== rightStatus) {
    return rightStatus - leftStatus;
  }

  return right.score - left.score;
}

function compareConfidence(left, right) {
  const leftConfidence = confidenceWeight[left.confidence.label] ?? 0;
  const rightConfidence = confidenceWeight[right.confidence.label] ?? 0;
  if (leftConfidence !== rightConfidence) {
    return rightConfidence - leftConfidence;
  }

  return compareResults(left, right);
}

function compareLowestRisk(left, right) {
  const ratingRank = { Strong: 0, Good: 1, Fair: 2, 'No-go': 3 };
  const leftRating = ratingRank[left.rating] ?? 4;
  const rightRating = ratingRank[right.rating] ?? 4;
  if (leftRating !== rightRating) {
    return leftRating - rightRating;
  }

  return compareConfidence(left, right);
}

function compareAZ(left, right) {
  const riverCompare = left.river.name.localeCompare(right.river.name);
  if (riverCompare !== 0) {
    return riverCompare;
  }

  return left.river.reach.localeCompare(right.river.reach);
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function distanceMiles(latitudeA, longitudeA, latitudeB, longitudeB) {
  const earthRadiusMiles = 3958.8;
  const dLat = toRadians(latitudeB - latitudeA);
  const dLon = toRadians(longitudeB - longitudeA);
  const latA = toRadians(latitudeA);
  const latB = toRadians(latitudeB);

  const haversine =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(latA) * Math.cos(latB) * Math.sin(dLon / 2) ** 2;

  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(haversine));
}

function distanceForResult(result) {
  if (!userLocation) {
    return Number.POSITIVE_INFINITY;
  }

  return distanceMiles(
    userLocation.latitude,
    userLocation.longitude,
    result.river.latitude,
    result.river.longitude
  );
}

function resultWithinSelectedRadius(result) {
  if (!userLocation) {
    return false;
  }

  return distanceForResult(result) <= selectedRadiusMiles;
}

function itemWithinSelectedRadius(item) {
  return Number.isFinite(item?.distanceMiles) && item.distanceMiles <= selectedRadiusMiles;
}

function estimateTravelMinutes(distance) {
  if (!Number.isFinite(distance)) {
    return Number.POSITIVE_INFINITY;
  }

  return Math.max(5, Math.round((distance / AVERAGE_DRIVE_MPH) * 60 / 5) * 5);
}

function distancePenalty(minutes) {
  if (!Number.isFinite(minutes)) {
    return 0;
  }

  return Math.min(minutes / 6, 30);
}

function formatTravelLabel(minutes) {
  if (!Number.isFinite(minutes)) {
    return '';
  }

  if (minutes < 60) {
    return `${minutes} min drive`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h drive`;
  }

  return `${hours}h ${remainingMinutes}m drive`;
}

function distanceBucketLabel(minutes) {
  if (!Number.isFinite(minutes)) {
    return 'Distance unavailable';
  }

  if (minutes <= 30) return 'Within 30 minutes';
  if (minutes <= 90) return 'Within 90 minutes';
  return 'Day trip';
}

function isViableRecommendationItem(item) {
  return item?.cardRoute?.rating && item.cardRoute.rating !== 'No-go';
}

function recommendationPoolForNearby(items) {
  const viableItems = items.filter(isViableRecommendationItem);
  return viableItems.length > 0 ? viableItems : items;
}

function pickRepresentativeRoute(routes, mode) {
  const copy = [...routes];

  if (mode === 'near-you' && userLocation) {
    copy.sort((left, right) => {
      const leftMinutes = estimateTravelMinutes(distanceForResult(left));
      const rightMinutes = estimateTravelMinutes(distanceForResult(right));
      const leftEffective = left.score - distancePenalty(leftMinutes);
      const rightEffective = right.score - distancePenalty(rightMinutes);
      if (leftEffective !== rightEffective) {
        return rightEffective - leftEffective;
      }
      if (leftMinutes !== rightMinutes) {
        return leftMinutes - rightMinutes;
      }
      return compareResults(left, right);
    });
    return { route: copy[0] ?? null, mode: 'near-you' };
  }

  if (mode === 'nearest' && userLocation) {
    copy.sort((left, right) => {
      const leftDistance = distanceForResult(left);
      const rightDistance = distanceForResult(right);
      if (leftDistance !== rightDistance) {
        return leftDistance - rightDistance;
      }
      return compareResults(left, right);
    });
    return { route: copy[0] ?? null, mode: 'nearest' };
  }

  if (mode === 'highest-confidence') {
    copy.sort(compareConfidence);
    return { route: copy[0] ?? null, mode: 'best' };
  }

  if (mode === 'lowest-risk') {
    copy.sort(compareLowestRisk);
    return { route: copy[0] ?? null, mode: 'best' };
  }

  if (mode === 'a-z') {
    copy.sort(compareAZ);
    return { route: copy[0] ?? null, mode: 'best' };
  }

  copy.sort(compareResults);
  return { route: copy[0] ?? null, mode: 'best' };
}

function buildDisplayItems(allResults, filteredResults, selectionMode = 'best-now') {
  const allByRiver = groupResultsByRiverId(allResults);
  const filteredByRiver = groupResultsByRiverId(filteredResults);
  const items = [];

  for (const [riverId, routes] of filteredByRiver.entries()) {
    const representative = pickRepresentativeRoute(routes, selectionMode);
    const cardRoute = representative.route;
    if (!cardRoute) continue;

    const totalRouteCount = allByRiver.get(riverId)?.length ?? routes.length;
    const distanceMilesValue = distanceForResult(cardRoute);
    const travelMinutes = estimateTravelMinutes(distanceMilesValue);
    const effectiveScore = cardRoute.score - distancePenalty(travelMinutes);
    const paddleableRouteCount = routes.filter((result) => ['Strong', 'Good'].includes(result.rating)).length;

    items.push({
      key: cardRoute.river.riverId || cardRoute.river.slug,
      kind: totalRouteCount > 1 ? 'group' : 'route',
      link:
        totalRouteCount > 1 && cardRoute.river.riverId
          ? `/rivers/by-river/${cardRoute.river.riverId}/`
          : `/rivers/${cardRoute.river.slug}/`,
      cardRoute,
      totalRouteCount,
      paddleableRouteCount,
      representativeMode: representative.mode,
      distanceMiles: distanceMilesValue,
      travelMinutes,
      effectiveScore,
      distanceBucket: distanceBucketLabel(travelMinutes),
    });
  }

  return items;
}

function sortItems(items, mode) {
  const copy = [...items];

  if (mode === 'near-you' && userLocation) {
    return copy.sort((left, right) => {
      if (left.effectiveScore !== right.effectiveScore) {
        return right.effectiveScore - left.effectiveScore;
      }
      if (left.travelMinutes !== right.travelMinutes) {
        return left.travelMinutes - right.travelMinutes;
      }
      return compareResults(left.cardRoute, right.cardRoute);
    });
  }

  if (mode === 'nearest' && userLocation) {
    return copy.sort((left, right) => {
      if (left.travelMinutes !== right.travelMinutes) {
        return left.travelMinutes - right.travelMinutes;
      }
      return compareResults(left.cardRoute, right.cardRoute);
    });
  }

  if (mode === 'highest-confidence') {
    return copy.sort((left, right) => compareConfidence(left.cardRoute, right.cardRoute));
  }

  if (mode === 'lowest-risk') {
    return copy.sort((left, right) => compareLowestRisk(left.cardRoute, right.cardRoute));
  }

  if (mode === 'a-z') {
    return copy.sort((left, right) => compareAZ(left.cardRoute, right.cardRoute));
  }

  return copy.sort((left, right) => compareResults(left.cardRoute, right.cardRoute));
}

function isGroupedItem(item) {
  return item.kind === 'group' && item.totalRouteCount > 1;
}

function routeCountLabel(item) {
  return `${item.totalRouteCount} routes on this river`;
}

function representativeRouteLabel(item) {
  const prefix = item.representativeMode === 'nearest' ? 'Nearest route' : 'Best route';
  return `${prefix}: ${item.cardRoute.river.reach}`;
}

function routeLabelForItem(item) {
  if (isGroupedItem(item)) {
    return routeCountLabel(item);
  }

  return item.cardRoute.river.reach;
}

function featuredRouteLabelForItem(item) {
  if (isGroupedItem(item)) {
    return `${routeCountLabel(item)} • ${representativeRouteLabel(item)}`;
  }

  return routeLabelForItem(item);
}

function shortLocationLabel() {
  if (!userLocation?.label) {
    return 'your area';
  }

  return userLocation.label;
}

function routeLengthLabel(item) {
  const distanceLabel = item.cardRoute.river.distanceLabel;
  if (!distanceLabel) {
    return '';
  }

  return `${distanceLabel} on-water`;
}

function shortRouteLengthLabel(item) {
  const distanceValue = item.cardRoute.river.distanceMiles;
  if (Number.isFinite(distanceValue)) {
    return `${distanceValue.toFixed(1)} mi route`;
  }

  const distanceLabel = item.cardRoute.river.distanceLabel;
  if (!distanceLabel) {
    return '';
  }

  return `${distanceLabel} route`;
}

function routeDifficultyLabel(item) {
  const difficulty = item?.cardRoute?.river?.difficulty;
  if (!difficulty) {
    return '';
  }

  return `${String(difficulty).slice(0, 1).toUpperCase()}${String(difficulty).slice(1)} difficulty`;
}

function routeEstimatedTimeLabel(item) {
  return item?.cardRoute?.river?.estimatedPaddleTime ?? '';
}

function favoriteRecordForItem(item) {
  if (!item?.cardRoute || isGroupedItem(item)) {
    return null;
  }

  return {
    slug: item.cardRoute.river.slug,
    name: item.cardRoute.river.name,
    reach: item.cardRoute.river.reach,
    state: item.cardRoute.river.state,
    region: item.cardRoute.river.region,
    url: `/rivers/${encodeURIComponent(item.cardRoute.river.slug)}/`,
  };
}

function queryWithin(scope, selector) {
  if (!scope || typeof scope.querySelector !== 'function') {
    return null;
  }

  return scope.querySelector(selector);
}

function setScopedText(scope, selector, value) {
  const element = queryWithin(scope, selector);
  if (element instanceof HTMLElement) {
    element.textContent = value;
    return element;
  }

  return null;
}

function signedPoints(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 'Unavailable';
  }

  return value > 0 ? `+${value}` : `${value}`;
}

function breakdownValueToneClass(value) {
  if (value > 0) return 'river-score-breakdown__row-value--positive';
  if (value < 0) return 'river-score-breakdown__row-value--negative';
  return 'river-score-breakdown__row-value--neutral';
}

function friendlyCapReason(reason) {
  const normalized = String(reason || '').trim();

  if (/Near-freezing air caps today at 70\./i.test(normalized)) {
    return 'Cold air keeps today from scoring higher, even if the river itself looks good.';
  }

  if (/High wind caps today at 75\./i.test(normalized)) {
    return 'Strong wind puts a ceiling on today, even if the gauge is in range.';
  }

  if (/Imminent heavy rain caps today at 65\./i.test(normalized)) {
    return 'Rain is expected soon, so today stays in the cautious range.';
  }

  if (/Minimum-only guidance caps the trip score at 74\./i.test(normalized)) {
    return 'This route only has a reliable low-water floor, so the score stops short of the top range.';
  }

  return normalized;
}

function renderScoreBreakdownDisclosure(scope, breakdown) {
  const disclosure = queryWithin(scope, '[data-score-breakdown]');
  if (!(disclosure instanceof HTMLElement)) {
    return;
  }

  const rows = queryWithin(scope, '[data-score-breakdown-rows]');
  const capsWrap = queryWithin(scope, '[data-score-breakdown-caps-wrap]');
  const caps = queryWithin(scope, '[data-score-breakdown-caps]');

  if (!breakdown) {
    disclosure.hidden = true;
    if (disclosure instanceof HTMLDetailsElement) {
      disclosure.open = false;
    }
    if (rows instanceof HTMLElement) {
      rows.innerHTML = '';
    }
    if (caps instanceof HTMLElement) {
      caps.innerHTML = '';
    }
    if (capsWrap instanceof HTMLElement) {
      capsWrap.hidden = true;
    }
    return;
  }

  disclosure.hidden = false;
  setScopedText(
    scope,
    '[data-score-breakdown-summary]',
    `River quality starts at ${breakdown.riverQuality}. Weather shifts it to ${breakdown.finalScore} today.`
  );

  if (rows instanceof HTMLElement) {
    const rowItems = [
      { label: 'River quality', value: breakdown.riverQuality },
      { label: 'Wind', value: breakdown.windAdjustment },
      { label: 'Temperature', value: breakdown.temperatureAdjustment },
      { label: 'Rain timing', value: breakdown.rainAdjustment },
    ];

    if (breakdown.comfortAdjustment !== 0) {
      rowItems.push({ label: 'Other', value: breakdown.comfortAdjustment });
    }

    rows.innerHTML = rowItems
      .map(
        (row) => `
          <article class="river-score-tooltip__row">
            <span class="river-score-tooltip__label">${escapeHtml(row.label)}</span>
            <strong class="river-score-tooltip__value ${breakdownValueToneClass(row.value)}">${escapeHtml(signedPoints(row.value))}</strong>
          </article>
        `
      )
      .join('');
  }

  const reasons = Array.isArray(breakdown.capReasons) ? breakdown.capReasons : [];
  if (caps instanceof HTMLElement) {
    caps.innerHTML = reasons.map((reason) => `<li>${escapeHtml(friendlyCapReason(reason))}</li>`).join('');
  }
  if (capsWrap instanceof HTMLElement) {
    capsWrap.hidden = reasons.length === 0;
  }
}

function rawSignalLine(item) {
  return item.cardRoute.summary?.rawSignalLine ?? item.cardRoute.summary?.gaugeNow ?? '';
}

function parseRawSignalLine(rawSignal) {
  if (typeof rawSignal !== 'string' || !rawSignal.trim()) {
    return [];
  }

  return rawSignal
    .split('•')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      if (/^Gauge:/i.test(part)) {
        return { kind: 'gauge', value: part.replace(/^Gauge:\s*/i, '') };
      }
      if (/^Wind:/i.test(part)) {
        return { kind: 'wind', value: part.replace(/^Wind:\s*/i, '') };
      }
      if (/^Temp:/i.test(part)) {
        return { kind: 'temp', value: part.replace(/^Temp:\s*/i, '') };
      }
      return null;
    })
    .filter(Boolean);
}

function parseTemperature(rawSignal) {
  const match = typeof rawSignal === 'string' ? rawSignal.match(/Temp:\s*(-?\d+)\u00B0F/i) : null;
  if (!match) {
    return null;
  }

  const value = Number.parseInt(match[1], 10);
  return Number.isFinite(value) ? value : null;
}

function signalIconMarkup(kind) {
  switch (kind) {
    case 'gauge':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 15c2.2 0 2.2-3 4.4-3s2.2 3 4.4 3 2.2-3 4.4-3 2.2 3 4.4 3"></path>
          <path d="M3 19c2.2 0 2.2-3 4.4-3s2.2 3 4.4 3 2.2-3 4.4-3 2.2 3 4.4 3"></path>
        </svg>
      `;
    case 'wind':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 9h10a2.5 2.5 0 1 0-2.5-2.5"></path>
          <path d="M3 13h14a2.5 2.5 0 1 1-2.5 2.5"></path>
          <path d="M5 17h7"></path>
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0Z"></path>
          <path d="M12 9v8"></path>
        </svg>
      `;
  }
}

function signalRowMarkup(item) {
  const items = parseRawSignalLine(rawSignalLine(item));

  if (items.length === 0) {
    return '<span class="river-card__signal-empty">Conditions loading</span>';
  }

  return items
    .map(
      (item) => `
        <span class="river-card__signal-item">
          <span class="river-card__signal-icon river-card__signal-icon--${item.kind}">
            ${signalIconMarkup(item.kind)}
          </span>
          <span>${item.value}</span>
        </span>
      `
    )
    .join('');
}

function summaryParts(text) {
  const parts = typeof text === 'string'
    ? text
        .split('•')
        .map((part) => part.trim())
        .filter(Boolean)
    : [];

  if (parts.length >= 3) {
    return {
      main: `${parts[0]} • ${parts[1]}`,
      weather: parts.slice(2).join(' • '),
    };
  }

  return {
    main: parts.join(' • '),
    weather: '',
  };
}

function hasStrongerBoardCall(item) {
  if (!item?.cardRoute) {
    return false;
  }

  return latestResults.some((candidate) => {
    if (
      !candidate ||
      candidate.river.slug === item.cardRoute.river.slug ||
      candidate.river.riverId === item.cardRoute.river.riverId
    ) {
      return false;
    }

    return compareResults(candidate, item.cardRoute) < 0;
  });
}

function weatherVisualState(item) {
  const summary = cardSummary(item).toLowerCase();
  const temperature = parseTemperature(rawSignalLine(item));
  const coldSevere = typeof temperature === 'number' && temperature <= 35;
  const coldNoticeable = typeof temperature === 'number' && temperature <= 40;

  if (summary.includes('storm')) {
    return 'storm';
  }

  if (coldSevere) {
    return 'cold';
  }

  if (summary.includes('rain')) {
    return 'rain';
  }

  if (coldNoticeable) {
    return 'cold';
  }

  if (summary.includes('windy')) {
    return 'wind';
  }

  return 'calm';
}

function weatherVisualLabel(state) {
  switch (state) {
    case 'storm':
      return 'Storm risk';
    case 'rain':
      return 'Rain later';
    case 'cold':
      return 'Cold weather';
    case 'wind':
      return 'Windy';
    default:
      return 'Mostly dry';
  }
}

function weatherVisualMarkup(state) {
  const label = weatherVisualLabel(state);

  switch (state) {
    case 'storm':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <path d="M7 15.5a4 4 0 1 1 .9-7.9A5 5 0 0 1 18 9.5a3.5 3.5 0 1 1-.5 7H7Z"></path>
          <path d="m12 15 2 0-1.4 3H15l-3 4 1-3h-2Z"></path>
        </svg>
      `;
    case 'rain':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <path d="M7 16a4 4 0 1 1 .9-7.9A5 5 0 0 1 18 10a3.5 3.5 0 1 1-.5 7H7Z"></path>
          <path d="M9 18.5l-.8 2"></path>
          <path d="M13 18.5l-.8 2"></path>
          <path d="M17 18.5l-.8 2"></path>
        </svg>
      `;
    case 'cold':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <path d="M12 3v18"></path>
          <path d="M5.5 6.5 18.5 17.5"></path>
          <path d="M5.5 17.5 18.5 6.5"></path>
          <path d="M4 12h16"></path>
        </svg>
      `;
    case 'wind':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <path d="M4 9h10a2.5 2.5 0 1 0-2.5-2.5"></path>
          <path d="M3 13h14a2.5 2.5 0 1 1-2.5 2.5"></path>
          <path d="M5 17h7"></path>
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2.5v3"></path>
          <path d="M12 18.5v3"></path>
          <path d="m4.9 4.9 2.1 2.1"></path>
          <path d="m17 17 2.1 2.1"></path>
          <path d="M2.5 12h3"></path>
          <path d="M18.5 12h3"></path>
          <path d="m4.9 19.1 2.1-2.1"></path>
          <path d="m17 7 2.1-2.1"></path>
        </svg>
      `;
  }
}

function clampText(text, maxLength) {
  if (typeof text !== 'string') {
    return '';
  }

  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).replace(/[ ,;:.!?-]+$/, '')}…`;
}

function formatGeneratedFreshness(isoString) {
  if (typeof isoString !== 'string' || !isoString) {
    return 'Checking latest refresh…';
  }

  const timestamp = new Date(isoString).getTime();
  if (!Number.isFinite(timestamp)) {
    return 'Checking latest refresh…';
  }

  return `${freshnessLabel(timestamp)}.`;
}

function updateHomeFreshness({ generatedAt = lastBoardGeneratedAt, refreshing = false, fallback = false } = {}) {
  if (!(homeFreshness instanceof HTMLElement)) {
    return;
  }

  if (homeFreshnessWrap instanceof HTMLElement) {
    homeFreshnessWrap.hidden = false;
  }

  const base = formatGeneratedFreshness(generatedAt);
  if (refreshing && generatedAt) {
    homeFreshness.textContent = `${base} Refreshing now…`;
    return;
  }

  if (fallback && generatedAt) {
    homeFreshness.textContent = `${base} Showing latest available data.`;
    return;
  }

  homeFreshness.textContent = base;
}

function formatBoardRefreshCopy(timestamp) {
  if (typeof timestamp === 'number' && Number.isFinite(timestamp)) {
    return `Snapshot refreshes every 30 minutes. ${freshnessLabel(timestamp)}.`;
  }

  return 'Snapshot refreshes every 30 minutes.';
}

function updateHomeSnapshot(overallItems) {
  if (!(homeSnapshot instanceof HTMLElement)) {
    return;
  }

  const goodItems = overallItems.filter((item) => ['Strong', 'Good'].includes(item.cardRoute.rating));
  const countLabel = formatOptionCount(goodItems.length);
  const insight = chooseDailySnapshotInsight(overallItems);
  homeSnapshot.textContent = `${countLabel} • ${insight}`;
}

function updateHeroCallMix(results) {
  const totalCount = Array.isArray(results) ? results.length : 0;
  const strongCount = results.filter((result) => result.rating === 'Strong').length;
  const goodCount = results.filter((result) => result.rating === 'Good').length;
  const noGoCount = results.filter((result) => result.rating === 'No-go').length;
  const mixedCount = Math.max(0, totalCount - strongCount - goodCount - noGoCount);

  if (homeStrongCount instanceof HTMLElement) {
    homeStrongCount.textContent = String(strongCount);
  }

  if (homeGoodCount instanceof HTMLElement) {
    homeGoodCount.textContent = String(goodCount);
  }

  if (homeMixedCount instanceof HTMLElement) {
    homeMixedCount.textContent = String(mixedCount);
  }

  if (homeNoGoCount instanceof HTMLElement) {
    homeNoGoCount.textContent = String(noGoCount);
  }

  for (const countNode of homeTrackedCounts) {
    if (!(countNode instanceof HTMLElement)) continue;
    countNode.textContent = `${totalCount} routes tracked`;
  }
}

function updateFeaturedSummaryToggle(text) {
  if (!(featuredSummary instanceof HTMLElement) || !(featuredToggle instanceof HTMLButtonElement)) {
    return;
  }

  const normalized = typeof text === 'string' ? text.replace(/\s+/g, ' ').trim() : '';
  const shouldShow = normalized.length > 165;

  featuredSummary.classList.remove('hero-call__summary--expanded');
  featuredToggle.hidden = !shouldShow;
  featuredToggle.setAttribute('aria-expanded', 'false');
  featuredToggle.textContent = 'Details';
}

async function renderFeaturedMap(item, { visible = false, status = '' } = {}) {
  if (!(featuredMapShell instanceof HTMLElement) || !(featuredMap instanceof HTMLElement)) {
    return;
  }

  const renderVersion = ++featuredMapRenderVersion;
  featuredMapShell.hidden = !visible;

  if (featuredMapStatus instanceof HTMLElement) {
    featuredMapStatus.textContent = status;
  }

  if (
    !visible ||
    !item ||
    !Number.isFinite(item.cardRoute.river.latitude) ||
    !Number.isFinite(item.cardRoute.river.longitude)
  ) {
    if (featuredMapMarker) {
      featuredMapMarker.remove();
      featuredMapMarker = null;
    }
    return;
  }

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl || renderVersion !== featuredMapRenderVersion) {
      return;
    }

    if (!featuredMapRuntime) {
      featuredMapRuntime = new maplibregl.Map({
        container: featuredMap,
        style: MAP_STYLE_URL,
        center: [item.cardRoute.river.longitude, item.cardRoute.river.latitude],
        zoom: 8.8,
        minZoom: 3.4,
        maxZoom: 12,
        attributionControl: false,
        interactive: false,
      });

      await new Promise((resolve) => {
        if (featuredMapRuntime.loaded()) {
          resolve();
          return;
        }
        featuredMapRuntime.once('load', resolve);
      });
    }

    if (renderVersion !== featuredMapRenderVersion) {
      return;
    }

    if (featuredMapMarker) {
      featuredMapMarker.remove();
      featuredMapMarker = null;
    }

    const markerNode = document.createElement('div');
    markerNode.className = markerClassFor(item);
    markerNode.innerHTML = `<span>${item.cardRoute.score}</span>`;
    markerNode.setAttribute('aria-hidden', 'true');

    featuredMapMarker = new maplibregl.Marker({
      element: markerNode,
      anchor: 'center',
    })
      .setLngLat([item.cardRoute.river.longitude, item.cardRoute.river.latitude])
      .addTo(featuredMapRuntime);

    featuredMapRuntime.jumpTo({
      center: [item.cardRoute.river.longitude, item.cardRoute.river.latitude],
      zoom: 8.8,
    });
    featuredMapRuntime.resize();

    if (featuredMapStatus instanceof HTMLElement) {
      featuredMapStatus.textContent = regionStateText(item);
    }
  } catch (error) {
    console.error('Failed to load featured map.', error);
    if (featuredMapStatus instanceof HTMLElement) {
      featuredMapStatus.textContent = 'Map unavailable right now.';
    }
  }
}

function featuredConditionMarkup(item) {
  const summary = summaryParts(cardSummary(item));
  const conditionText = [summary.main, summary.weather].filter(Boolean).join(' • ');
  if (!conditionText) {
    return '';
  }

  const state = weatherVisualState(item);
  return `
    <span class="hero-call__condition-icon weather-indicator weather-indicator--${state}">
      ${weatherVisualMarkup(state)}
    </span>
    <span class="hero-call__condition-text">${escapeHtml(conditionText)}</span>
  `;
}

function regionStateText(item) {
  return `${item.cardRoute.river.state} • ${item.cardRoute.river.region}`.toUpperCase();
}
function confidenceLabel(item) {
  return confidenceDisplayLabel(item.cardRoute.confidence.label);
}
function coldWeatherDrivenCall(item) {
  const weather = item.cardRoute.weather;
  const temp = weather?.temperatureF;
  const wind = weather?.next12hWindMphMax ?? weather?.windMph ?? 0;
  const rainChance = weather?.next12hPrecipProbabilityMax ?? 0;

  return (
    typeof temp === 'number' &&
    temp <= 40 &&
    ['ideal', 'minimum-met', 'low-shoulder'].includes(item.cardRoute.gaugeBand) &&
    !weather?.next12hStormRisk &&
    (rainChance < 70 || wind < 20)
  );
}
function metaLineText(item, showDistance) {
  const parts = [];
  if (showDistance && Number.isFinite(item.travelMinutes)) {
    parts.push(formatTravelLabel(item.travelMinutes));
  }
  if (routeLengthLabel(item)) {
    parts.push(routeLengthLabel(item));
  }
  if (!isGroupedItem(item) && routeDifficultyLabel(item)) {
    parts.push(routeDifficultyLabel(item));
  }
  if (!isGroupedItem(item) && routeEstimatedTimeLabel(item)) {
    parts.push(routeEstimatedTimeLabel(item));
  }
  parts.push(confidenceLabel(item));
  return parts.join(' \u2022 ');
}

function liveReadWarning(result) {
  return liveDataWarning(result?.liveData, {
    offlineShort: 'Feed issue',
    degradedShort: 'Limited reads',
  });
}
function cardSummary(item) {
  return item.cardRoute.summary?.shortExplanation ?? item.cardRoute.explanation;
}

function cardLinkLabel(item) {
  return isGroupedItem(item) ? 'Compare routes' : 'View river';
}

function summaryMentionsWeather(text) {
  const lowered = typeof text === 'string' ? text.toLowerCase() : '';
  return lowered.includes('rain') || lowered.includes('storm') || lowered.includes('wind') || lowered.includes('cold');
}

function summaryMentionsFlowShift(text) {
  const lowered = typeof text === 'string' ? text.toLowerCase() : '';
  return lowered.includes('rising') || lowered.includes('falling') || lowered.includes('changing flow');
}

function recommendationSlotLabel(index, nearbyReady) {
  if (nearbyReady) {
    if (index === 0) return 'Top pick';
    if (index === 1) return 'Nearby pick';
    return 'Worth the drive';
  }

  if (index === 0) return 'Top pick';
  if (index === 1) return 'Steady pick';
  return 'Also consider';
}

function simpleSentence(text, fallback) {
  const normalized = typeof text === 'string' ? text.trim() : '';
  if (!normalized) {
    return fallback;
  }

  const lowered = normalized.toLowerCase();
  if (lowered.includes('perfect level')) return 'Flow is in the preferred range.';
  if (lowered.includes('slightly low')) return 'Flow is a little low but still workable.';
  if (lowered.includes('too low')) return 'Flow looks too low to be worth the drive.';
  if (lowered.includes('stable')) return 'Flow looks steady right now.';
  if (lowered.includes('rising')) return 'Flow is rising; re-check the gauge before you launch.';
  if (lowered.includes('falling')) return 'Flow is dropping; re-check the gauge before you launch.';
  if (lowered.includes('rain soon') || lowered.includes('rain incoming') || lowered.includes('rain later')) {
    return 'Rain may change conditions later today.';
  }
  if (lowered.includes('mostly dry')) return 'Weather looks mostly cooperative.';
  if (lowered.includes('windy')) return 'Wind will be part of the trip today.';
  if (lowered.includes('cold')) return 'Cold air keeps the day less comfortable.';

  const sentence = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  return sentence.endsWith('.') ? sentence : `${sentence}.`;
}

function recommendationReasons(item) {
  const summary = summaryParts(cardSummary(item));
  const reasons = [];

  if (summary.main) {
    const mainParts = summary.main
      .split('â€¢')
      .map((part) => part.trim())
      .filter(Boolean);
    for (const part of mainParts.slice(1)) {
      reasons.push(simpleSentence(part, 'Conditions look workable right now.'));
    }
  }

  if (summary.weather) {
    reasons.push(simpleSentence(summary.weather, 'Weather needs a closer look today.'));
  }

  return Array.from(new Set(reasons)).slice(0, 2);
}

function recommendationVerdict(item) {
  if (item.cardRoute.rating === 'Strong') return 'Great today';
  if (item.cardRoute.rating === 'Good') return 'Solid option';
  if (item.cardRoute.rating === 'Fair') return 'Possible';
  return 'Consider with caution';
}

function recommendationTagLabels(item, index, nearbyReady) {
  const tags = [];
  const summary = cardSummary(item).toLowerCase();

  if (item.cardRoute.confidence.label === 'High') {
    tags.push('Well-supported');
  }

  if (nearbyReady && Number.isFinite(item.travelMinutes)) {
    if (item.travelMinutes <= 30) tags.push('Short drive');
    else if (item.travelMinutes <= 90) tags.push('Nearby');
    else tags.push('Worth the drive');
  }

  if (summary.includes('stable')) {
    tags.push('Stable flow');
  } else if (summary.includes('rising')) {
    tags.push('Rising flow');
  }

  if (summary.includes('rain') || summary.includes('storm') || summary.includes('windy')) {
    tags.push('Weather watch');
  } else if (coldWeatherDrivenCall(item)) {
    tags.push('Cold-weather only');
  }

  return Array.from(new Set(tags)).slice(0, 2);
}

function recommendationSummaryText(item, nearbyReady) {
  const summary = summaryParts(cardSummary(item));
  const mainParts = typeof summary.main === 'string'
    ? summary.main
        .split('â€¢')
        .map((part) => part.trim().toLowerCase())
        .filter(Boolean)
    : [];
  const weather = typeof summary.weather === 'string' ? summary.weather.toLowerCase() : '';
  const hasWeatherRisk = weather.includes('rain') || weather.includes('storm') || weather.includes('wind');
  const hasColdWeather = weather.includes('cold');
  const hasStableFlow = mainParts.some((part) => part.includes('stable') || part.includes('perfect level'));
  const hasChangingFlow = mainParts.some((part) => part.includes('rising') || part.includes('falling'));
  const shortDrive = nearbyReady && Number.isFinite(item.travelMinutes) && item.travelMinutes <= 30;

  if (item.cardRoute.rating === 'No-go') {
    if (coldWeatherDrivenCall(item) || (hasStableFlow && hasColdWeather)) {
      return 'River level looks usable, but weather makes it a skip for most paddlers today.';
    }
    if (hasStableFlow && hasWeatherRisk) {
      return 'River level looks usable, but today’s weather makes it a skip.';
    }
    if (shortDrive) {
      return 'Close by, but conditions are too uncertain right now.';
    }
    return 'Conditions stack up against this one today.';
  }

  if (item.cardRoute.rating === 'Fair') {
    if (coldWeatherDrivenCall(item) || hasColdWeather) {
      return 'Possible today, but cold weather raises the bar.';
    }
    if (hasWeatherRisk) {
      return 'Possible today, but weather risk is the main caution.';
    }
    if (hasChangingFlow) {
      return 'Possible now; re-check the gauge before you launch.';
    }
    if (!hasStrongerBoardCall(item)) {
      return 'This is the highest-ranked route on the board, but it is still only Fair.';
    }
    return 'Possible today, but stronger routes are available.';
  }

  if (shortDrive && hasStableFlow) {
    return 'Stable flow and a short drive make this one of the clearest nearby picks.';
  }

  if (!shortDrive && nearbyReady && (item.cardRoute.rating === 'Strong' || item.cardRoute.rating === 'Good')) {
    return 'Worth the drive if you want the strongest nearby conditions.';
  }

  if (item.cardRoute.rating === 'Strong') {
    return 'Best-looking route on the board today.';
  }

  if (item.cardRoute.rating === 'Good') {
    if (hasColdWeather) {
      return 'Good river level; cold weather still deserves a re-check.';
    }
    return 'Solid conditions put this near the top today.';
  }

  return 'This is worth checking, but stronger routes are ahead of it.';
}

function supportingReasonList(item, nearbyReady) {
  return [];
}

function renderTagMarkup(labels) {
  return labels
    .map((label) => {
      const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<span class="recommendation-tag recommendation-tag--${escapeHtml(slug)}">${escapeHtml(label)}</span>`;
    })
    .join('');
}

function renderSourceBadges(item) {
  const sources = Array.isArray(item.cardRoute.sources) ? item.cardRoute.sources : [];
  return sources
    .map((source) => `<span class="recommendation-source recommendation-source--${source.tone}">${escapeHtml(source.label)}</span>`)
    .join('');
}

function createRecommendationCard(item, index, nearbyReady) {
  if (!(recommendationTemplate instanceof HTMLTemplateElement)) {
    return document.createElement('div');
  }

  const fragment = recommendationTemplate.content.cloneNode(true);
  const card = fragment.querySelector('.recommendation-card');
  if (!(card instanceof HTMLElement)) {
    return document.createElement('div');
  }

  const ratingKey = ratingToneKey(item.cardRoute.rating);
  card.classList.add(`recommendation-card--${ratingKey}`);
  card.classList.add(item.kind === 'group' ? 'recommendation-card--group' : 'recommendation-card--route');
  if (index === 0) {
    card.classList.add('recommendation-card--featured');
  }

  setText(card, 'recommendation-slot', index === 0 ? "Today's Best" : recommendationSlotLabel(index, nearbyReady));
  setText(card, 'recommendation-kind', item.kind === 'group' ? 'River' : 'Route');
  setText(card, 'recommendation-state', regionStateText(item));
  setText(card, 'recommendation-route', routeLabelForItem(item));
  setText(card, 'recommendation-summary', recommendationSummaryText(item, nearbyReady));
  setText(card, 'recommendation-score', String(item.cardRoute.score));
  setText(card, 'recommendation-rating', item.cardRoute.rating);
  setText(card, 'recommendation-verdict', recommendationVerdict(item, index, nearbyReady));
  setText(card, 'recommendation-meta', metaLineText(item, nearbyReady));
  setText(card, 'recommendation-live-label', index === 0 ? 'Live conditions right now' : '');
  renderScoreBreakdownDisclosure(card, item.cardRoute.scoreBreakdown);

  const reasons = card.querySelector('[data-field="recommendation-reasons"]');
  if (reasons instanceof HTMLElement) {
    reasons.innerHTML = supportingReasonList(item, nearbyReady)
      .map((reason) => `<li>${escapeHtml(reason)}</li>`)
      .join('');
    reasons.hidden = reasons.innerHTML === '';
  }

  const orb = card.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    orb.classList.add(`score-orb--${ratingKey}`);
  }

  const signal = card.querySelector('[data-field="recommendation-signal"]');
  if (signal instanceof HTMLElement) {
    signal.innerHTML = signalRowMarkup(item);
  }

  const tags = card.querySelector('[data-field="recommendation-tags"]');
  if (tags instanceof HTMLElement) {
    tags.innerHTML = renderTagMarkup(recommendationTagLabels(item, index, nearbyReady));
    tags.hidden = tags.innerHTML.trim().length === 0;
  }

  const liveLabel = card.querySelector('[data-field="recommendation-live-label"]');
  if (liveLabel instanceof HTMLElement) {
    liveLabel.hidden = index !== 0;
  }

  const detailCopy = card.querySelector('[data-field="recommendation-full"]');
  if (detailCopy instanceof HTMLElement) {
    detailCopy.textContent = item.cardRoute.explanation || item.cardRoute.summary?.shortExplanation || '';
  }

  const sources = card.querySelector('[data-field="recommendation-sources"]');
  if (sources instanceof HTMLElement) {
    sources.innerHTML = renderSourceBadges(item);
  }

  const details = card.querySelector('.recommendation-card__details');
  if (details instanceof HTMLElement) {
    const hasDetailCopy = (detailCopy instanceof HTMLElement) && detailCopy.textContent.trim().length > 0;
    const hasSources = (sources instanceof HTMLElement) && sources.innerHTML.trim().length > 0;
    details.hidden = !hasDetailCopy && !hasSources;
  }

  const link = card.querySelector('[data-field="recommendation-link"]');
  if (link instanceof HTMLAnchorElement) {
    link.href = item.link;
    link.textContent = cardLinkLabel(item);
  }

  const titleLink = card.querySelector('[data-field="recommendation-title-link"]');
  if (titleLink instanceof HTMLAnchorElement) {
    titleLink.href = item.link;
    titleLink.textContent = item.cardRoute.river.name;
  }

  decorateFavoriteButton(card.querySelector('[data-favorite-button]'), favoriteRecordForItem(item));

  return card;
}

function renderRecommendationGrid(items, nearbyReady) {
  if (!(recommendationGrid instanceof HTMLElement)) {
    return;
  }

  recommendationGrid.innerHTML = '';
  const fragment = document.createDocumentFragment();
  items.forEach((item, index) => {
    fragment.appendChild(createRecommendationCard(item, index, nearbyReady));
  });
  recommendationGrid.appendChild(fragment);
  refreshFavoriteButtons(recommendationGrid);
}

function createCard(item, { showDistance = false, compact = false } = {}) {
  if (!(cardTemplate instanceof HTMLTemplateElement)) {
    return document.createElement('div');
  }

  const fragment = cardTemplate.content.cloneNode(true);
  const card = fragment.querySelector('.river-card');
  if (!(card instanceof HTMLElement)) {
    return document.createElement('div');
  }

  const ratingKey = ratingToneKey(item.cardRoute.rating);
  card.classList.add(`river-card--${ratingKey}`);
  if (compact) {
    card.classList.add('river-card--compact');
  }
  card.classList.add(item.kind === 'group' ? 'river-card--group' : 'river-card--route');

  setText(card, 'card-kind', item.kind === 'group' ? 'River' : 'Route');
  setText(card, 'state', regionStateText(item));
  setText(card, 'route-label', routeLabelForItem(item));
  setText(card, 'score', String(item.cardRoute.score));
  setText(card, 'rating', item.cardRoute.rating);
  setText(card, 'card-verdict', recommendationVerdict(item));
  setText(card, 'meta-line', metaLineText(item, showDistance));
  setText(card, 'card-summary-main', recommendationSummaryText(item, showDistance));

  const warning = card.querySelector('[data-field="card-warning"]');
  const liveWarning = liveReadWarning(item.cardRoute);
  if (warning instanceof HTMLElement) {
    warning.hidden = !liveWarning;
    warning.textContent = liveWarning?.short || '';
    warning.title = liveWarning?.detail || '';
    if (liveWarning?.detail) {
      warning.dataset.tooltip = liveWarning.detail;
      warning.tabIndex = 0;
    } else {
      delete warning.dataset.tooltip;
      warning.tabIndex = -1;
    }
    warning.setAttribute('aria-label', liveWarning?.detail || '');
  }

  const signalRow = card.querySelector('[data-field="raw-signal"]');
  if (signalRow instanceof HTMLElement) {
    signalRow.innerHTML = signalRowMarkup(item);
  }

  const orb = card.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    orb.classList.add(`score-orb--${ratingKey}`);
  }

  const link = card.querySelector('[data-card-link]');
  if (link instanceof HTMLAnchorElement) {
    link.href = item.link;
    link.textContent = cardLinkLabel(item);
  }

  const titleLink = card.querySelector('[data-field="card-title-link"]');
  if (titleLink instanceof HTMLAnchorElement) {
    titleLink.href = item.link;
    titleLink.textContent = item.cardRoute.river.name;
  }

  decorateFavoriteButton(card.querySelector('[data-favorite-button]'), favoriteRecordForItem(item));

  return card;
}

function renderCardGrid(container, items, options = {}) {
  if (!(container instanceof HTMLElement)) {
    return;
  }

  container.innerHTML = '';
  const fragment = document.createDocumentFragment();
  for (const item of items) {
    fragment.appendChild(createCard(item, options));
  }
  container.appendChild(fragment);
  refreshFavoriteButtons(container);
}

function currentExploreLayoutKey() {
  if (window.innerWidth <= 760) return 'mobile';
  if (window.innerWidth <= 1100) return 'tablet';
  if (window.innerWidth >= 1480) return 'wide';
  return 'desktop';
}

function syncExploreShellHeight() {
  if (!(exploreShell instanceof HTMLElement) || !(exploreGrid instanceof HTMLElement)) {
    return;
  }

  const layoutKey = currentExploreLayoutKey();
  if (layoutKey !== exploreLayoutKey) {
    exploreLayoutKey = layoutKey;
    exploreLockedHeight = 0;
  }

  const cards = Array.from(exploreGrid.children).filter((node) => node instanceof HTMLElement);
  if (cards.length === 0) {
    if (exploreLockedHeight > 0) {
      exploreShell.style.minHeight = `${Math.ceil(exploreLockedHeight)}px`;
    } else {
      exploreShell.style.removeProperty('min-height');
    }
    return;
  }

  const styles = getComputedStyle(exploreGrid);
  const rowGap = Number.parseFloat(styles.rowGap || styles.gap || '0') || 0;
  const rows = new Map();

  for (const card of cards) {
    const top = Math.round(card.offsetTop);
    const height = card.getBoundingClientRect().height;
    rows.set(top, Math.max(rows.get(top) ?? 0, height));
  }

  const rowHeights = Array.from(rows.values());
  const measuredHeight =
    rowHeights.reduce((total, height) => total + height, 0) + Math.max(0, rowHeights.length - 1) * rowGap;

  exploreLockedHeight = Math.max(exploreLockedHeight, measuredHeight);
  exploreShell.style.minHeight = `${Math.ceil(exploreLockedHeight)}px`;
}

function paginateItems(items, pageSize, page) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = totalItems === 0 ? 0 : (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    totalItems,
    totalPages,
    currentPage: safePage,
    startIndex,
    endIndex,
    items: items.slice(startIndex, endIndex),
  };
}

function updateExplorePagination(pagination) {
  if (!(explorePagination instanceof HTMLElement)) {
    return;
  }

  const shouldShow = pagination.totalItems > EXPLORE_PAGE_SIZE;
  explorePagination.hidden = !shouldShow;

  if (explorePaginationSummary instanceof HTMLElement) {
    if (pagination.totalItems === 0) {
      explorePaginationSummary.textContent = 'No rivers match these filters.';
    } else {
      explorePaginationSummary.textContent = `Showing ${pagination.startIndex + 1}-${pagination.endIndex} of ${pagination.totalItems} rivers`;
    }
  }

  if (explorePageLabel instanceof HTMLElement) {
    explorePageLabel.textContent = `Page ${pagination.currentPage} of ${pagination.totalPages}`;
  }

  if (explorePrevButton instanceof HTMLButtonElement) {
    explorePrevButton.disabled = pagination.currentPage <= 1;
  }

  if (exploreNextButton instanceof HTMLButtonElement) {
    exploreNextButton.disabled = pagination.currentPage >= pagination.totalPages;
  }
}

function updateFeaturedHero(nearbyItems, overallItems) {
  const locationReady = userLocationState === 'ready' && Boolean(userLocation);
  const preferredNearbyItems = recommendationPoolForNearby(nearbyItems);
  const nearbyReady = locationReady && preferredNearbyItems.length > 0;
  const item = nearbyReady ? preferredNearbyItems[0] : locationReady ? null : overallItems[0] ?? null;
  if (!item) {
    renderFeaturedMap(null, { visible: false, status: '' });
    if (featuredPanel instanceof HTMLElement) {
      featuredPanel.classList.toggle('home-featured--locked', !locationReady);
      featuredPanel.classList.remove('hero-call--great', 'hero-call--good', 'hero-call--marginal', 'hero-call--no-go');
    }
    if (featuredLabel instanceof HTMLElement) featuredLabel.textContent = 'Today\'s best';
    if (featuredState instanceof HTMLElement) {
      featuredState.hidden = locationReady;
      featuredState.textContent = 'Set your location to reveal the strongest paddle near you.';
    }
    if (featuredName instanceof HTMLAnchorElement) {
      featuredName.textContent = locationReady ? 'No routes in range' : 'Today\'s best';
      featuredName.href = locationReady ? '#best-options' : '#home-location';
    }
    if (featuredReach instanceof HTMLElement) {
      featuredReach.textContent = locationReady
        ? `No tracked routes currently land inside ${selectedRadiusMiles} miles.`
        : 'Set your location to unlock a personalized top pick.';
    }
    setText(document, 'featured-score', '--');
    setText(document, 'featured-rating', locationReady ? 'Out of range' : 'Locked');
    setText(document, 'featured-verdict', locationReady ? 'Nothing in range yet' : 'Set your location');
    setText(
      document,
      'featured-reason',
      locationReady
        ? `Try widening the radius above ${selectedRadiusMiles} miles to compare more routes.`
        : 'Drive times and route ranking appear after you choose a location.'
    );
    setText(document, 'featured-confidence', locationReady ? 'Radius limited' : 'Support pending');
    setText(document, 'featured-distance', locationReady ? `Try ${Math.min(200, selectedRadiusMiles + 50)} mi` : 'Add location for drive time');
    setText(
      document,
      'featured-signal',
      locationReady
        ? 'Widen the radius slider to reveal more nearby options.'
        : 'Gauge, weather, and support details will appear here.'
    );
    setText(
      document,
      'featured-explanation',
      locationReady
        ? `There are no tracked routes inside ${selectedRadiusMiles} miles right now. Increase the radius or browse the full board below.`
        : 'Set your location to unlock the full summary and drive-time-aware recommendation.'
    );
    updateFeaturedSummaryToggle(
      locationReady
        ? `There are no tracked routes inside ${selectedRadiusMiles} miles right now. Increase the radius or browse the full board below.`
        : 'Set your location to unlock the full summary and drive-time-aware recommendation.'
    );
    if (featuredReasons instanceof HTMLElement) {
      featuredReasons.innerHTML = '';
      featuredReasons.hidden = true;
    }
    if (featuredLink instanceof HTMLAnchorElement) {
      featuredLink.href = locationReady ? '#explore' : '#home-location';
      featuredLink.textContent = locationReady ? 'Browse full board' : 'Set location first';
    }
    renderScoreBreakdownDisclosure(featuredPanel, null);
    return;
  }
  renderFeaturedMap(item, { visible: nearbyReady, status: regionStateText(item) });
  const ratingKey = ratingToneKey(item.cardRoute.rating);
  if (featuredPanel instanceof HTMLElement) {
    featuredPanel.classList.toggle('home-featured--locked', !locationReady);
    featuredPanel.classList.remove('hero-call--great', 'hero-call--good', 'hero-call--marginal', 'hero-call--no-go');
    featuredPanel.classList.add(`hero-call--${ratingKey}`);
  }
  if (featuredLabel instanceof HTMLElement) {
    featuredLabel.textContent = 'Today\'s best';
  }
  if (featuredState instanceof HTMLElement) {
    featuredState.hidden = true;
    featuredState.textContent = '';
  }
  if (featuredName instanceof HTMLAnchorElement) {
    featuredName.textContent = item.cardRoute.river.name;
    featuredName.href = item.link;
  }
  if (featuredReach instanceof HTMLElement) {
    featuredReach.textContent = featuredRouteLabelForItem(item);
  }
  setText(document, 'featured-score', String(item.cardRoute.score));
  setText(document, 'featured-rating', item.cardRoute.rating);
  setText(document, 'featured-verdict', recommendationVerdict(item));
  setText(document, 'featured-reason', recommendationSummaryText(item, nearbyReady));
  renderScoreBreakdownDisclosure(featuredPanel, item.cardRoute.scoreBreakdown);
  setText(document, 'featured-confidence', confidenceLabel(item));
  setText(
    document,
    'featured-distance',
    nearbyReady && Number.isFinite(item.travelMinutes)
      ? formatTravelLabel(item.travelMinutes)
      : userLocationState === 'pending'
        ? 'Finding drive time'
        : 'Add location for drive time'
  );
  if (featuredSignal instanceof HTMLElement) {
    featuredSignal.innerHTML = signalRowMarkup(item);
  }
  const featuredExplanation = item.cardRoute.explanation || item.cardRoute.summary?.shortExplanation || '';
  setText(document, 'featured-explanation', featuredExplanation);
  updateFeaturedSummaryToggle(featuredExplanation);
  if (featuredReasons instanceof HTMLElement) {
    featuredReasons.innerHTML = '';
    featuredReasons.hidden = true;
  }
  const orb = featuredPanel?.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    orb.classList.remove('score-orb--great', 'score-orb--good', 'score-orb--marginal', 'score-orb--no-go');
    orb.classList.add(`score-orb--${ratingKey}`);
  }
  if (featuredLink instanceof HTMLAnchorElement) {
    featuredLink.href = item.link;
    featuredLink.textContent = 'View river';
  }
}
function buildRecommendationItems(nearbyItems, overallItems, locationReady = false) {
  const picks = [];
  const seen = new Set();
  const preferredNearbyItems = recommendationPoolForNearby(nearbyItems);
  const nearbyReady = locationReady && preferredNearbyItems.length > 0;

  const addPick = (item) => {
    if (!item || seen.has(item.key) || picks.length >= 3) {
      return;
    }
    seen.add(item.key);
    picks.push(item);
  };

  if (nearbyReady) {
    const nearbyPool = preferredNearbyItems;
    addPick(nearbyPool[0]);
    addPick(nearbyPool.find((item) => item.cardRoute.rating !== 'No-go' && !seen.has(item.key)) || nearbyPool[1]);
    addPick(
      nearbyPool.find(
        (item) =>
          !seen.has(item.key) &&
          (item.cardRoute.rating === 'Strong' || item.cardRoute.rating === 'Good')
      ) || nearbyPool.find((item) => !seen.has(item.key))
    );
  } else {
    addPick(overallItems[0]);
    addPick(
      overallItems.find((item) => !seen.has(item.key) && item.cardRoute.confidence.label === 'High') ||
        overallItems[1]
    );
    addPick(
      overallItems.find((item) => !seen.has(item.key) && isGroupedItem(item)) ||
        overallItems.find((item) => !seen.has(item.key))
    );
  }

  const fallbackPool = nearbyReady ? nearbyItems : [...overallItems, ...nearbyItems];

  for (const item of fallbackPool) {
    addPick(item);
  }

  return picks;
}

function renderRecommendationSection(nearbyItems, overallItems) {
  if (
    !(recommendationSummary instanceof HTMLElement) ||
    !(recommendationTitle instanceof HTMLElement) ||
    !(recommendationEmpty instanceof HTMLElement)
  ) {
    return;
  }

  const locationReady = userLocationState === 'ready' && Boolean(userLocation);
  const nearbyReady = locationReady && nearbyItems.length > 0;
  const recommendationItems = buildRecommendationItems(nearbyItems, overallItems, locationReady);

  if (nearbyLocationPanel instanceof HTMLElement) {
    nearbyLocationPanel.hidden = false;
  }

  if (recommendationSection instanceof HTMLElement) {
    recommendationSection.classList.toggle('decision-section--active', locationReady);
    recommendationSection.classList.toggle('home-recommendations--needs-location', !locationReady);
  }

  if (homeHeadline instanceof HTMLElement) {
    homeHeadline.textContent = 'Find the best paddle near you today';
  }

  if (homeLocationEmpty instanceof HTMLElement) {
    homeLocationEmpty.hidden = locationReady;
  }

  recommendationTitle.textContent = nearbyReady
    ? 'Best routes near you'
    : 'Best routes near you';

  recommendationSummary.textContent = locationReady
    ? `Ranked by drive time within ${selectedRadiusMiles} miles of ${shortLocationLabel()}.`
    : 'Set your location above to personalize these picks and add drive times.';

  if (recommendationItems.length === 0) {
    recommendationEmpty.textContent = locationReady
      ? `No recommended routes are currently available within ${selectedRadiusMiles} miles.`
      : 'No recommended rivers are available right now.';
    recommendationEmpty.hidden = false;
    renderRecommendationGrid([], locationReady);
    return;
  }

  recommendationEmpty.hidden = true;
  renderRecommendationGrid(recommendationItems, locationReady);
}

function matchesRouteFilters(result) {
  if (activeFilters.paddleable && !['Strong', 'Good'].includes(result.rating)) {
    return false;
  }

  if (activeFilters.rating && result.rating !== activeFilters.rating) {
    return false;
  }

  if (activeFilters.highConfidence && result.confidence.label !== 'High') {
    return false;
  }

  if (activeFilters.state && result.river.state !== activeFilters.state) {
    return false;
  }

  if (activeFilters.region && result.river.region !== activeFilters.region) {
    return false;
  }

  if (activeFilters.search) {
    const haystack = `${result.river.name} ${result.river.reach} ${result.river.state} ${result.river.region}`.toLowerCase();
    if (!haystack.includes(activeFilters.search.toLowerCase())) {
      return false;
    }
  }

  return true;
}

function getFilteredResults(results) {
  return results.filter(matchesRouteFilters);
}

function normalizeSortMode() {
  if (activeFilters.sort === 'near-you') {
    return userLocationState === 'ready' && userLocation ? 'near-you' : 'best-now';
  }

  if (activeFilters.sort === 'nearest') {
    return userLocationState === 'ready' && userLocation ? 'nearest' : 'best-now';
  }

  return activeFilters.sort;
}

function updateFilterButtonStates() {
  for (const button of filterButtons) {
    if (!(button instanceof HTMLElement)) continue;
    const key = button.dataset.filterToggle;
    const active = key ? Boolean(activeFilters[key]) : false;
    button.classList.toggle('filter-chip--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }

  for (const button of glanceFilterButtons) {
    if (!(button instanceof HTMLElement)) continue;
    const rating = button.dataset.glanceFilter || '';
    const active = activeFilters.rating === rating;
    button.classList.toggle('hero__call-mix-button--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }
}

function updateLocationIndicator() {
  if (!(locationIndicator instanceof HTMLElement)) {
    return;
  }

  if (userLocationState === 'pending') {
    locationIndicator.hidden = false;
    locationIndicator.dataset.state = 'loading';
    if (locationIndicatorLabel instanceof HTMLElement) {
      locationIndicatorLabel.textContent = 'Finding nearest rivers...';
    }
    return;
  }

  if (userLocationState === 'denied') {
    locationIndicator.hidden = false;
    locationIndicator.dataset.state = 'error';
    if (locationIndicatorLabel instanceof HTMLElement) {
      locationIndicatorLabel.textContent = 'Location blocked';
    }
    return;
  }

  if (userLocationState === 'unavailable') {
    locationIndicator.hidden = false;
    locationIndicator.dataset.state = 'error';
    if (locationIndicatorLabel instanceof HTMLElement) {
      locationIndicatorLabel.textContent = 'Location unavailable';
    }
    return;
  }

  locationIndicator.hidden = true;
  locationIndicator.dataset.state = 'idle';
}

function legacyUpdateLocationStatus() {
  if (!(locationStatus instanceof HTMLElement)) {
    return;
  }

  if (userLocationState === 'pending') {
    locationStatus.textContent = 'Finding drive times.';
    return;
  }

  if (userLocation) {
    locationStatus.textContent = 'Drive-time ranking is on.';
    if (locationClearButton instanceof HTMLButtonElement) {
      locationClearButton.hidden = false;
    }
    return;
  }

  if (locationClearButton instanceof HTMLButtonElement) {
    locationClearButton.hidden = true;
  }

  if (userLocationState === 'denied') {
    locationStatus.textContent = 'Enter a city or ZIP code to rank nearby picks.';
    return;
  }

  if (userLocationState === 'unavailable') {
    locationStatus.textContent = 'Enter a city or ZIP code to rank nearby picks.';
    return;
  }

  locationStatus.textContent = 'Add your city to move nearby picks higher.';
}

function updateLocationStatus() {
  const locationReady = Boolean(userLocation && userLocationState === 'ready');

  if (homeLocationSummary instanceof HTMLElement) {
    if (userLocationState === 'pending') {
      homeLocationSummary.textContent = 'Finding your location...';
    } else if (locationReady) {
      homeLocationSummary.textContent = shortLocationLabel();
    } else if (userLocationState === 'denied' || userLocationState === 'unavailable') {
      homeLocationSummary.textContent = 'Set your location';
    } else {
      homeLocationSummary.textContent = 'Set your location';
    }
  }

  if (homeLocationSortSummary instanceof HTMLElement) {
    if (userLocationState === 'pending') {
      homeLocationSortSummary.hidden = false;
      homeLocationSortSummary.textContent = 'Finding nearby routes...';
    } else if (locationReady && locationEditing) {
      homeLocationSortSummary.hidden = false;
      homeLocationSortSummary.textContent = 'Enter a new city or ZIP to compare another area.';
    } else if (locationReady) {
      homeLocationSortSummary.hidden = true;
      homeLocationSortSummary.textContent = '';
    } else {
      homeLocationSortSummary.hidden = false;
      homeLocationSortSummary.textContent = 'Use GPS or enter a city to personalize nearby routes.';
    }
  }

  if (homeRadiusPanel instanceof HTMLElement) {
    homeRadiusPanel.hidden = !locationReady;
  }

  if (homeRadiusSummary instanceof HTMLElement) {
    homeRadiusSummary.textContent = `Showing routes within ${selectedRadiusMiles} miles`;
  }

  if (homeRadiusSlider instanceof HTMLInputElement) {
    homeRadiusSlider.value = String(radiusIndexForMiles(selectedRadiusMiles));
  }

  if (nearbyLocationPanel instanceof HTMLElement) {
    nearbyLocationPanel.classList.toggle('home-location-bar--set', locationReady);
    nearbyLocationPanel.classList.toggle('home-location-bar--editing', locationEditing);
    nearbyLocationPanel.classList.toggle('home-location-bar--pending', userLocationState === 'pending');
  }

  if (locationEditTrigger instanceof HTMLButtonElement) {
    locationEditTrigger.setAttribute(
      'aria-label',
      locationReady ? `Change location from ${shortLocationLabel()}` : 'Set your location'
    );
    locationEditTrigger.setAttribute('aria-expanded', locationReady && locationEditing ? 'true' : 'false');
  }

  if (locationSelected instanceof HTMLElement) {
    if (userLocationState === 'pending') {
      locationSelected.hidden = false;
      locationSelected.textContent = 'Finding your current location...';
    } else if (locationReady) {
      locationSelected.hidden = false;
      locationSelected.textContent = `Drive times active \u2022 ${selectedRadiusMiles} mi radius`;
    } else if (userLocationState === 'denied') {
      locationSelected.hidden = false;
      locationSelected.textContent = 'Location access was blocked. Enter a city or ZIP code instead.';
    } else if (userLocationState === 'unavailable') {
      locationSelected.hidden = false;
      locationSelected.textContent = 'Location lookup is unavailable. Enter a city or ZIP code instead.';
    } else {
      locationSelected.hidden = false;
      locationSelected.textContent = 'Search or use GPS for personalized recommendations.';
    }
  }

  if (locationClearButton instanceof HTMLButtonElement) {
    locationClearButton.hidden = !userLocation;
  }

  const searchField = locationInput instanceof HTMLInputElement
    ? locationInput.closest('.location-panel__search')
    : null;
  if (searchField instanceof HTMLElement) {
    searchField.hidden = locationReady && !locationEditing;
  }

  const submitButton = locationForm?.querySelector('button[type="submit"]');
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.hidden = true;
  }

  if (locationForm instanceof HTMLFormElement) {
    locationForm.classList.toggle('location-panel__form--compact', false);
  }
}

function updateFilterSummary(exploreItems) {
  if (!(filterSummary instanceof HTMLElement)) {
    return;
  }

  const sortLabel =
    activeFilters.sort === 'near-you'
      ? 'best by drive time'
      : activeFilters.sort === 'nearest'
        ? 'closest first'
        : activeFilters.sort === 'highest-confidence'
        ? 'highest support'
          : activeFilters.sort === 'lowest-risk'
            ? 'lowest-risk routes'
            : activeFilters.sort === 'a-z'
              ? 'A-Z'
              : 'top picks today';

  if (exploreItems.length === 0) {
    filterSummary.textContent = 'No rivers match these filters.';
    return;
  }

  const ratingLabel = activeFilters.rating ? ` • ${activeFilters.rating} only` : '';
  filterSummary.textContent = `Showing ${exploreItems.length} rivers • ${sortLabel}${ratingLabel}`;
}

function updateSummaryStatus(items, routeResults) {
  if (!(summaryHeadline instanceof HTMLElement) || !(summaryDetail instanceof HTMLElement)) {
    return;
  }

  if (items.length === 0) {
    summaryHeadline.textContent = 'No rivers match the current filters.';
    summaryDetail.textContent = 'Clear a filter to bring rivers back.';
    return;
  }

  const visibleRoutes = items.map((item) => item.cardRoute);
  const liveCount = visibleRoutes.filter((result) => result.liveData.overall === 'live').length;
  const degradedCount = visibleRoutes.filter((result) => result.liveData.overall === 'degraded').length;
  const offlineCount = visibleRoutes.filter((result) => result.liveData.overall === 'offline').length;
  const generatedAt = routeResults[0]?.generatedAt
    ? new Date(routeResults[0].generatedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
    : 'unknown time';

  summaryHeadline.textContent = `Updated ${generatedAt}`;

  if (offlineCount > 0) {
    summaryDetail.textContent = `${offlineCount} offline • ${degradedCount} limited • ${liveCount} live`;
    return;
  }

  if (degradedCount > 0) {
    summaryDetail.textContent = `${degradedCount} limited • ${liveCount} live`;
    return;
  }

  summaryDetail.textContent = `${liveCount} rivers live`;
}

function updateBoardStatusBanner(items) {
  if (!(boardStatusBanner instanceof HTMLElement)) {
    return;
  }

  const liveCount = items.filter((item) => item.cardRoute.liveData.overall === 'live').length;
  const degradedCount = items.filter((item) => item.cardRoute.liveData.overall === 'degraded').length;
  const offlineCount = items.filter((item) => item.cardRoute.liveData.overall === 'offline').length;

  boardStatusBanner.classList.remove('status-banner--live', 'status-banner--degraded', 'status-banner--offline', 'status-banner--loading');

  if (offlineCount > 0) {
    boardStatusBanner.classList.add('status-banner--offline');
    if (boardBannerTitle instanceof HTMLElement) {
      boardBannerTitle.textContent = `${offlineCount} rivers have live-feed issues.`;
    }
    if (boardBannerDetail instanceof HTMLElement) {
      boardBannerDetail.textContent = 'Look for the warning icon on affected cards before you drive.';
    }
    return;
  }

  if (degradedCount > 0) {
    boardStatusBanner.classList.add('status-banner--degraded');
    if (boardBannerTitle instanceof HTMLElement) {
      boardBannerTitle.textContent = `${degradedCount} rivers have limited live reads.`;
    }
    if (boardBannerDetail instanceof HTMLElement) {
      boardBannerDetail.textContent = 'Those cards are still usable, but some live inputs are stale or partial.';
    }
    return;
  }

  boardStatusBanner.classList.add('status-banner--live');
  if (boardBannerTitle instanceof HTMLElement) {
    boardBannerTitle.textContent = 'Live reads are healthy across the board.';
  }
  if (boardBannerDetail instanceof HTMLElement) {
    boardBannerDetail.textContent = `${liveCount} rivers are fully live`;
  }
}

function markerClassFor(item) {
  return markerClassForRating(item.cardRoute.rating, item.cardRoute.confidence.label);
}

function popupMarkup(item) {
  const nearbyReady = userLocationState === 'ready' && userLocation && Number.isFinite(item.travelMinutes);
  const reachMarkup = isGroupedItem(item)
    ? `<p class="score-map-popup__reach">${escapeHtml(routeCountLabel(item))}</p>
      <p class="score-map-popup__support">${escapeHtml(representativeRouteLabel(item))}</p>`
    : `<p class="score-map-popup__reach">${escapeHtml(routeLabelForItem(item))}</p>`;

  return `
    <article class="score-map-popup">
      <p class="score-map-popup__state">${escapeHtml(item.cardRoute.river.state)} | ${escapeHtml(item.cardRoute.river.region)}</p>
      <h3>${escapeHtml(item.cardRoute.river.name)}</h3>
      ${reachMarkup}
      <p class="score-map-popup__verdict">${escapeHtml(recommendationVerdict(item))}</p>
      <p class="score-map-popup__summary">${escapeHtml(recommendationSummaryText(item, nearbyReady))}</p>
      <p class="score-map-popup__meta">${escapeHtml(metaLineText(item, nearbyReady))} • Score ${item.cardRoute.score}</p>
      <a class="score-map-popup__link score-map-popup__link--button" href="${item.link}">${cardLinkLabel(item)}</a>
    </article>
  `;
}

function updateSummaryMapSelection(key) {
  selectedSummaryMapKey = key || null;

  if (summaryMapResults instanceof HTMLElement) {
    const rows = Array.from(summaryMapResults.querySelectorAll('[data-summary-map-item]'));
    for (const row of rows) {
      if (!(row instanceof HTMLButtonElement)) continue;
      const active = row.dataset.summaryMapItem === selectedSummaryMapKey;
      row.classList.toggle('summary-map-result--active', active);
      row.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }
}

function closeSummaryMapPopups(exceptKey = null) {
  for (const [key, marker] of mapMarkersByKey.entries()) {
    if (!marker || key === exceptKey) {
      continue;
    }

    const popup = marker.getPopup?.();
    if (popup && typeof popup.isOpen === 'function' && popup.isOpen()) {
      popup.remove();
    }
  }
}

function openSummaryMapItem(key) {
  const marker = mapMarkersByKey.get(key);
  if (!marker) {
    return;
  }

  updateSummaryMapSelection(key);
  closeSummaryMapPopups(key);
  const popup = marker.getPopup?.();
  if (popup && typeof popup.isOpen === 'function' && !popup.isOpen()) {
    marker.togglePopup();
  }
}

function renderSummaryMapResults(items) {
  if (!(summaryMapResults instanceof HTMLElement)) {
    return;
  }

  lastSummaryMapItems = items;

  if (summaryMapResultsNote instanceof HTMLElement) {
    if (items.length === 0) {
      summaryMapResultsNote.textContent = 'No rivers match these filters.';
    } else if (items.length === 1) {
      summaryMapResultsNote.textContent = '1 river on the map';
    } else {
      summaryMapResultsNote.textContent = `${items.length} rivers on the map`;
    }
  }

  summaryMapResults.innerHTML = '';

  if (items.length === 0) {
    summaryMapResults.innerHTML = '<p class="muted summary-map-results__empty">Adjust the filters to bring rivers back onto the map.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const item of items) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'summary-map-result';
    button.dataset.summaryMapItem = item.key;
    button.setAttribute('aria-pressed', selectedSummaryMapKey === item.key ? 'true' : 'false');
    button.innerHTML = `
      <span class="summary-map-result__score score-map-marker ${markerClassFor(item)}"><span>${item.cardRoute.score}</span></span>
      <span class="summary-map-result__body">
        <strong class="summary-map-result__name">${escapeHtml(item.cardRoute.river.name)}</strong>
        <span class="summary-map-result__route">${escapeHtml(routeLabelForItem(item))}</span>
        <span class="summary-map-result__meta">${escapeHtml(confidenceLabel(item))} • ${escapeHtml(shortRouteLengthLabel(item))}</span>
      </span>
    `;
    button.addEventListener('click', () => {
      openSummaryMapItem(item.key);
    });
    fragment.appendChild(button);
  }

  summaryMapResults.appendChild(fragment);
  const activeKey = items.some((item) => item.key === selectedSummaryMapKey)
    ? selectedSummaryMapKey
    : (items[0]?.key || null);
  updateSummaryMapSelection(activeKey);
}

function updateSummaryMapToggle() {
  if (!(summaryMapShell instanceof HTMLElement) || !(summaryMapToggle instanceof HTMLButtonElement)) {
    return;
  }

  const compact = phoneBreakpoint.matches;
  if (!compact) {
    summaryMapCollapsed = false;
  }

  summaryMapToggle.hidden = !compact;
  summaryMapShell.classList.toggle('summary-map-shell--collapsed', compact && summaryMapCollapsed);
  summaryMapToggle.setAttribute('aria-expanded', compact && summaryMapCollapsed ? 'false' : 'true');
  summaryMapToggle.textContent = compact && summaryMapCollapsed ? 'Show map' : 'Hide map';

  if (!(compact && summaryMapCollapsed) && mapRuntime) {
    window.setTimeout(() => {
      mapRuntime?.resize();
    }, 30);
  }
}

function expandMobileSectionsForTarget(targetId) {
  if (!phoneBreakpoint.matches) {
    return;
  }

  if (targetId === 'explore' || targetId === 'explore-map') {
    if (exploreContent instanceof HTMLElement) {
      exploreContent.hidden = false;
    }
  }

  if (targetId === 'explore-map') {
    summaryMapCollapsed = false;
    updateSummaryMapToggle();
  }
}

function scrollToHomeTarget(targetId) {
  const target = document.getElementById(targetId);
  if (!(target instanceof HTMLElement)) {
    return;
  }

  expandMobileSectionsForTarget(targetId);
  window.setTimeout(() => {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 45);
}

async function renderSummaryMap(items) {
  if (!(summaryMap instanceof HTMLElement)) {
    return;
  }

  const renderVersion = ++summaryMapRenderVersion;

  if (summaryMapStatus instanceof HTMLElement) {
    summaryMapStatus.textContent = 'Loading map markers.';
  }

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl) {
      return;
    }
    if (renderVersion !== summaryMapRenderVersion) {
      return;
    }

    if (!mapRuntime) {
      mapRuntime = new maplibregl.Map({
        container: summaryMap,
        style: MAP_STYLE_URL,
        center: [-93.7, 44.6],
        zoom: 5.2,
        minZoom: 3.4,
        maxZoom: 12,
        attributionControl: true,
      });

      mapRuntime.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      await new Promise((resolve) => {
        if (mapRuntime.loaded()) {
          resolve();
          return;
        }
        mapRuntime.once('load', resolve);
      });
    }
    if (renderVersion !== summaryMapRenderVersion) {
      return;
    }

    for (const marker of mapMarkers) {
      marker.remove();
    }
    mapMarkers = [];
    mapMarkersByKey = new Map();

    const bounds = new maplibregl.LngLatBounds();
    let hasBounds = false;

    for (const item of items) {
      const markerNode = document.createElement('button');
      markerNode.type = 'button';
      markerNode.className = markerClassFor(item);
      markerNode.innerHTML = `<span>${item.cardRoute.score}</span>`;
      markerNode.setAttribute(
        'aria-label',
        `${item.cardRoute.river.name}: score ${item.cardRoute.score}, ${confidenceDisplayLabel(item.cardRoute.confidence.label).toLowerCase()}`
      );

      const marker = new maplibregl.Marker({
        element: markerNode,
        anchor: 'center',
      })
        .setLngLat([item.cardRoute.river.longitude, item.cardRoute.river.latitude])
        .setPopup(
          new maplibregl.Popup({ offset: 18, closeButton: true, closeOnClick: true, maxWidth: '280px' }).setHTML(popupMarkup(item))
        )
        .addTo(mapRuntime);

      bindMarkerPopup(marker, markerNode, {
        map: mapRuntime,
        onSelectedChange(selected) {
          if (selected) {
            updateSummaryMapSelection(item.key);
          } else if (selectedSummaryMapKey === item.key) {
            updateSummaryMapSelection(null);
          }
        },
      });
      mapMarkers.push(marker);
      mapMarkersByKey.set(item.key, marker);
      bounds.extend([item.cardRoute.river.longitude, item.cardRoute.river.latitude]);
      hasBounds = true;
    }

    renderSummaryMapResults(items);

    if (hasBounds) {
      if (renderVersion !== summaryMapRenderVersion) {
        return;
      }
      const compact = window.matchMedia('(max-width: 720px)').matches;
      mapRuntime.fitBounds(bounds, {
        padding: compact
          ? { top: 22, right: 22, bottom: 22, left: 22 }
          : { top: 52, right: 52, bottom: 52, left: 52 },
        maxZoom: 8.2,
        duration: 700,
      });
      mapRuntime.resize();
      if (!selectedSummaryMapKey && items[0]) {
        updateSummaryMapSelection(items[0].key);
      }
      if (summaryMapStatus instanceof HTMLElement) {
        summaryMapStatus.textContent = 'Map is up to date.';
      }
      return;
    }

    if (renderVersion !== summaryMapRenderVersion) {
      return;
    }
    renderSummaryMapResults([]);
    if (summaryMapStatus instanceof HTMLElement) {
      summaryMapStatus.textContent = 'No rivers match the current filters.';
    }
  } catch (error) {
    console.error('Failed to load summary map.', error);
    renderSummaryMapResults([]);
    if (summaryMapStatus instanceof HTMLElement) {
      summaryMapStatus.textContent = 'Map unavailable right now. Use the river list below.';
    }
  }
}

function setBoardRefreshState(state, detail = '') {
  if (boardRefreshButton instanceof HTMLButtonElement) {
    boardRefreshButton.disabled = state === 'loading';
    boardRefreshButton.textContent = state === 'loading' ? 'Refreshing...' : 'Refresh board';
  }

  if (boardRefreshNote instanceof HTMLElement) {
    if (state === 'loading') {
      boardRefreshNote.textContent = 'Snapshot refreshes every 30 minutes. Checking for a newer board.';
      return;
    }

    if (state === 'error') {
      boardRefreshNote.textContent = detail || 'Last refresh failed.';
      return;
    }

    if (lastBoardSuccessAt) {
      boardRefreshNote.textContent = formatBoardRefreshCopy(lastBoardSuccessAt);
      return;
    }

    boardRefreshNote.textContent = formatBoardRefreshCopy();
  }
}

function setBoardFetchBannerState(kind, detail) {
  if (!(boardFetchBanner instanceof HTMLElement)) {
    return;
  }

  boardFetchBanner.classList.toggle('status-banner--hidden', kind === 'hidden');
  if (kind === 'hidden') {
    return;
  }

  boardFetchBanner.classList.remove('status-banner--live', 'status-banner--degraded', 'status-banner--loading');
  boardFetchBanner.classList.add('status-banner--offline');
  if (boardFetchTitle instanceof HTMLElement) {
    boardFetchTitle.textContent =
      kind === 'initial'
        ? 'Live board could not be loaded.'
        : 'Live board could not be refreshed.';
  }
  if (boardFetchDetail instanceof HTMLElement) {
    boardFetchDetail.textContent = detail;
  }
}

function hydrateBoardFromCache() {
  const cached = readCachedPayload(SUMMARY_CACHE_KEY);
  const rivers = Array.isArray(cached?.payload?.rivers) ? cached.payload.rivers : null;
  if (!rivers || rivers.length === 0) {
    return false;
  }

  latestResults = rivers;
  hasLoadedBoardOnce = true;
  lastBoardSuccessAt = cached.fetchedAt;
  lastBoardGeneratedAt = typeof cached.payload?.generatedAt === 'string' ? cached.payload.generatedAt : null;
  setBoardFetchBannerState('hidden');
  renderHomepage(latestResults);
  updateHomeFreshness({ generatedAt: lastBoardGeneratedAt, refreshing: true });

  if (boardRefreshNote instanceof HTMLElement) {
    boardRefreshNote.textContent = `${formatBoardRefreshCopy(cached.fetchedAt)} Refreshing now...`;
  }

  return true;
}

function renderHomepage(results) {
  const locationReady = userLocationState === 'ready' && Boolean(userLocation);
  const overallItems = sortItems(buildDisplayItems(results, results, 'best-now'), 'best-now');
  const nearbyBaseItems = sortItems(buildDisplayItems(results, results, 'near-you'), 'near-you');
  const nearbyItems = locationReady
    ? nearbyBaseItems.filter(itemWithinSelectedRadius)
    : nearbyBaseItems.filter((item) => item.travelMinutes <= DAY_TRIP_TRAVEL_MINUTES);
  const summaryResults = locationReady ? results.filter(resultWithinSelectedRadius) : results;

  updateHeroCallMix(summaryResults);
  updateFeaturedHero(nearbyItems, overallItems);
  renderRecommendationSection(nearbyItems, overallItems);

  const filteredRoutes = getFilteredResults(results);
  const normalizedSortMode = normalizeSortMode();
  const exploreItems = sortItems(buildDisplayItems(results, filteredRoutes, normalizedSortMode), normalizedSortMode);

  updateFilterButtonStates();
  updateLocationIndicator();
  updateLocationStatus();
  updateFilterSummary(exploreItems);
  updateSummaryStatus(exploreItems, results);
  updateBoardStatusBanner(exploreItems);
  renderSummaryMap(exploreItems);
  const explorePaginationState = paginateItems(exploreItems, EXPLORE_PAGE_SIZE, currentExplorePage);
  currentExplorePage = explorePaginationState.currentPage;
  updateExplorePagination(explorePaginationState);
  renderCardGrid(exploreGrid, explorePaginationState.items, {
    showDistance: userLocationState === 'ready' && userLocation,
  });
  syncExploreShellHeight();
}

function saveLocation(location) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
}

function saveRadiusMiles(radiusMiles) {
  localStorage.setItem(STORAGE_RADIUS_KEY, String(normalizeRadiusMiles(radiusMiles)));
}

function loadStoredLocation() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.latitude === 'number' &&
      typeof parsed.longitude === 'number' &&
      typeof parsed.label === 'string'
    ) {
      return parsed;
    }
  } catch (error) {
    console.warn('Failed to parse stored location.', error);
  }

  return null;
}

function loadStoredRadiusMiles() {
  try {
    const raw = localStorage.getItem(STORAGE_RADIUS_KEY);
    if (!raw) {
      return DEFAULT_RADIUS_MILES;
    }

    return normalizeRadiusMiles(Number(raw));
  } catch (error) {
    console.warn('Failed to parse stored radius.', error);
    return DEFAULT_RADIUS_MILES;
  }
}

function setUserLocation(location) {
  userLocation = location;
  userLocationState = 'ready';
  locationEditing = false;
  saveLocation(location);
  if (activeFilters.sort === 'best-now') {
    activeFilters.sort = 'near-you';
    if (sortSelect instanceof HTMLSelectElement) {
      sortSelect.value = 'near-you';
    }
  }
  if (locationInput instanceof HTMLInputElement) {
    locationInput.value = location.label;
  }
  currentExplorePage = 1;
  if (latestResults.length > 0) {
    renderHomepage(latestResults);
  } else {
    updateLocationStatus();
  }
}

function setRadiusMiles(radiusMiles, { persist = true, rerender = true } = {}) {
  selectedRadiusMiles = normalizeRadiusMiles(radiusMiles);

  if (persist) {
    saveRadiusMiles(selectedRadiusMiles);
  }

  updateLocationStatus();

  if (rerender && latestResults.length > 0) {
    renderHomepage(latestResults);
  }
}

function clearUserLocation() {
  userLocation = null;
  userLocationState = 'idle';
  locationEditing = false;
  localStorage.removeItem(STORAGE_KEY);
  if (locationInput instanceof HTMLInputElement) {
    locationInput.value = '';
  }
  currentExplorePage = 1;
  if (latestResults.length > 0) {
    renderHomepage(latestResults);
  } else {
    updateLocationStatus();
  }
}

function formatLocationLabel(name, admin1, country = '') {
  const labelName = typeof name === 'string' ? name.trim() : '';
  if (!labelName) {
    return country || 'your current location';
  }

  const admin = US_STATE_ABBREVIATIONS[admin1] || admin1 || country || '';
  return admin ? `${labelName}, ${admin}` : labelName;
}

async function geocodeManualLocation(query) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json&countryCode=US`,
    {
      headers: { accept: 'application/json' },
    }
  );

  if (!response.ok) {
    throw new Error(`Geocoding failed: HTTP ${response.status}`);
  }

  const payload = await response.json();
  const match = Array.isArray(payload?.results) ? payload.results[0] : null;
  if (!match || typeof match.latitude !== 'number' || typeof match.longitude !== 'number') {
    return null;
  }

  return {
    latitude: match.latitude,
    longitude: match.longitude,
    label: formatLocationLabel(match.name, match.admin1, match.country),
    source: 'manual',
  };
}

async function reverseGeocodeLocation(latitude, longitude) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&language=en&format=json&count=1`,
    {
      headers: { accept: 'application/json' },
    }
  );

  if (!response.ok) {
    throw new Error(`Reverse geocoding failed: HTTP ${response.status}`);
  }

  const payload = await response.json();
  const match = Array.isArray(payload?.results) ? payload.results[0] : null;
  if (!match) {
    return null;
  }

  return formatLocationLabel(match.name, match.admin1, match.country);
}

function requestUserLocation() {
  if (!navigator.geolocation) {
    locationEditing = false;
    userLocationState = 'unavailable';
    updateLocationStatus();
    renderHomepage(latestResults);
    return;
  }

  locationEditing = false;
  userLocationState = 'pending';
  updateLocationStatus();
  updateLocationIndicator();
  if (latestResults.length > 0) {
    renderHomepage(latestResults);
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      let label = 'your current location';

      try {
        const geocodedLabel = await reverseGeocodeLocation(position.coords.latitude, position.coords.longitude);
        if (geocodedLabel) {
          label = geocodedLabel;
        }
      } catch (error) {
        console.warn('Reverse geocoding current location failed.', error);
      }

      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        label,
        source: 'geolocation',
      });
    },
    () => {
      userLocationState = 'denied';
      updateLocationStatus();
      if (latestResults.length > 0) {
        renderHomepage(latestResults);
      }
    },
    {
      enableHighAccuracy: false,
      timeout: GEOLOCATION_TIMEOUT_MS,
      maximumAge: 5 * 60 * 1000,
    }
  );
}

async function maybeUseGrantedLocation() {
  if (!('permissions' in navigator) || typeof navigator.permissions.query !== 'function') {
    return;
  }

  try {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    if (result.state === 'granted' && !userLocation) {
      requestUserLocation();
    }
  } catch (error) {
    console.warn('Could not check geolocation permission.', error);
  }
}

function setupFilters() {
  for (const button of glanceFilterButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.filterBound === 'true') continue;
    button.dataset.filterBound = 'true';
    button.addEventListener('click', () => {
      const rating = button.dataset.glanceFilter || '';
      activeFilters.rating = activeFilters.rating === rating ? '' : rating;
      currentExplorePage = 1;
      renderHomepage(latestResults);
      scrollToHomeTarget('explore-map');
    });
  }

  for (const button of filterButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.filterBound === 'true') continue;
    button.dataset.filterBound = 'true';
    button.addEventListener('click', () => {
      const key = button.dataset.filterToggle;
      if (!key) return;
      activeFilters[key] = !activeFilters[key];
      currentExplorePage = 1;
      renderHomepage(latestResults);
    });
  }

  if (filterSearch instanceof HTMLInputElement && filterSearch.dataset.filterBound !== 'true') {
    filterSearch.dataset.filterBound = 'true';
    filterSearch.addEventListener('input', () => {
      activeFilters.search = filterSearch.value.trim();
      currentExplorePage = 1;
      renderHomepage(latestResults);
    });
  }

  if (filterState instanceof HTMLSelectElement && filterState.dataset.filterBound !== 'true') {
    filterState.dataset.filterBound = 'true';
    filterState.addEventListener('change', () => {
      activeFilters.state = filterState.value;
      currentExplorePage = 1;
      renderHomepage(latestResults);
    });
  }

  if (filterRegion instanceof HTMLSelectElement && filterRegion.dataset.filterBound !== 'true') {
    filterRegion.dataset.filterBound = 'true';
    filterRegion.addEventListener('change', () => {
      activeFilters.region = filterRegion.value;
      currentExplorePage = 1;
      renderHomepage(latestResults);
    });
  }

  if (sortSelect instanceof HTMLSelectElement && sortSelect.dataset.filterBound !== 'true') {
    sortSelect.dataset.filterBound = 'true';
    sortSelect.addEventListener('change', () => {
      activeFilters.sort = sortSelect.value;
      currentExplorePage = 1;
      if ((activeFilters.sort === 'near-you' || activeFilters.sort === 'nearest') && !userLocation) {
        requestUserLocation();
      } else {
        renderHomepage(latestResults);
      }
    });
  }
}

async function submitManualLocation(query, statusTarget = locationSelected || homeLocationSortSummary) {
  const trimmedQuery = typeof query === 'string' ? query.trim() : '';
  if (!trimmedQuery) {
    updateLocationStatus();
    return;
  }

  if (statusTarget instanceof HTMLElement) {
    statusTarget.hidden = false;
    statusTarget.textContent = 'Looking up that location...';
  }

  try {
    const match = await geocodeManualLocation(trimmedQuery);
    if (!match) {
      if (statusTarget instanceof HTMLElement) {
        statusTarget.hidden = false;
        statusTarget.textContent = 'That city or ZIP was not found.';
      }
      return;
    }

    setUserLocation(match);
  } catch (error) {
    console.error('Manual location lookup failed.', error);
    if (statusTarget instanceof HTMLElement) {
      statusTarget.hidden = false;
      statusTarget.textContent = 'That place could not be looked up right now.';
    }
  }
}

function setupLocationControls() {
  for (const button of locationUseButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.locationBound === 'true') {
      continue;
    }
    button.dataset.locationBound = 'true';
    button.addEventListener('click', () => {
      requestUserLocation();
    });
  }

  if (locationClearButton instanceof HTMLButtonElement) {
    locationClearButton.addEventListener('click', () => {
      clearUserLocation();
    });
  }

  if (locationEditTrigger instanceof HTMLButtonElement) {
    locationEditTrigger.addEventListener('click', () => {
      if (userLocationState === 'pending') {
        return;
      }

      const locationReady = Boolean(userLocation && userLocationState === 'ready');
      if (!locationReady) {
        locationInput?.focus();
        return;
      }

      locationEditing = !locationEditing;
      updateLocationStatus();

      if (locationEditing) {
        locationInput?.focus();
        locationInput?.select();
      }
    });
  }

  if (locationForm instanceof HTMLFormElement) {
    locationForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const query = locationInput instanceof HTMLInputElement ? locationInput.value.trim() : '';
      await submitManualLocation(query);
    });
  }

  if (homeRadiusSlider instanceof HTMLInputElement && homeRadiusSlider.dataset.radiusBound !== 'true') {
    homeRadiusSlider.dataset.radiusBound = 'true';
    homeRadiusSlider.addEventListener('input', () => {
      setRadiusMiles(radiusMilesForIndex(homeRadiusSlider.value));
    });
  }

}

async function loadBoard({ silent = false } = {}) {
  const { requestId, controller } = boardRequestGuard.begin();

  if (!silent) {
    setBoardRefreshState('loading');
  }

  try {
    if (silent && (lastBoardGeneratedAt || hasLoadedBoardOnce)) {
      updateHomeFreshness({ generatedAt: lastBoardGeneratedAt, refreshing: true });
    }

    const response = await fetch('/api/rivers/summary.json', {
      headers: { accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API request failed for /api/rivers/summary.json: HTTP ${response.status}`);
    }

    const payload = await response.json();
    if (!boardRequestGuard.isCurrent(requestId)) {
      return;
    }
    latestResults = Array.isArray(payload?.rivers) ? payload.rivers : [];
    lastBoardGeneratedAt = typeof payload?.generatedAt === 'string' ? payload.generatedAt : null;
    writeCachedPayload(SUMMARY_CACHE_KEY, payload);
    hasLoadedBoardOnce = true;
    lastBoardSuccessAt = Date.now();
    setBoardFetchBannerState('hidden');
    setBoardRefreshState('ready');
    renderHomepage(latestResults);
    updateHomeFreshness({ generatedAt: lastBoardGeneratedAt });
  } catch (error) {
    if (isAbortError(error)) {
      return;
    }

    if (!boardRequestGuard.isCurrent(requestId)) {
      return;
    }
    console.error('Failed to load river scores on summary page.', error);

    if (hasLoadedBoardOnce) {
      setBoardFetchBannerState('hidden');
      setBoardRefreshState(
        'error',
        `${freshnessLabel(lastBoardSuccessAt)}. Showing latest available data.`
      );
      updateHomeFreshness({ generatedAt: lastBoardGeneratedAt, fallback: true });
      return;
    }

    setBoardFetchBannerState(
      'initial',
      'Live board could not load. Retry the board, then open a river page if you need to verify the sources.'
    );
    setBoardRefreshState('error', 'Last refresh failed. Retry now.');

    if (summaryHeadline instanceof HTMLElement) {
      summaryHeadline.textContent = 'Live river status is unavailable.';
    }
    if (summaryDetail instanceof HTMLElement) {
      summaryDetail.textContent = 'Current gauge and weather reads could not load.';
    }
    if (recommendationSummary instanceof HTMLElement) {
      recommendationSummary.textContent = 'Recommendations are unavailable until the board loads again.';
    }
    updateHomeFreshness();
  } finally {
    boardRequestGuard.finish(controller);
  }
}

setupFilters();
setupLocationControls();

const storedLocation = loadStoredLocation();
selectedRadiusMiles = loadStoredRadiusMiles();
if (storedLocation) {
  userLocation = storedLocation;
  userLocationState = 'ready';
  activeFilters.sort = 'near-you';
  if (locationInput instanceof HTMLInputElement) {
    locationInput.value = storedLocation.label;
  }
  if (sortSelect instanceof HTMLSelectElement) {
    sortSelect.value = 'near-you';
  }
}

updateLocationStatus();
maybeUseGrantedLocation();

if (boardRefreshButton instanceof HTMLButtonElement) {
  boardRefreshButton.addEventListener('click', () => {
    loadBoard();
  });
}

if (explorePrevButton instanceof HTMLButtonElement) {
  explorePrevButton.addEventListener('click', () => {
    currentExplorePage = Math.max(1, currentExplorePage - 1);
    renderHomepage(latestResults);
  });
}

if (exploreNextButton instanceof HTMLButtonElement) {
  exploreNextButton.addEventListener('click', () => {
    currentExplorePage += 1;
    renderHomepage(latestResults);
  });
}

if (featuredToggle instanceof HTMLButtonElement && featuredSummary instanceof HTMLElement) {
  featuredToggle.addEventListener('click', () => {
    const expanded = featuredSummary.classList.toggle('hero-call__summary--expanded');
    featuredToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    featuredToggle.textContent = expanded ? 'Less' : 'Details';
  });
}

if (summaryMapToggle instanceof HTMLButtonElement) {
  summaryMapToggle.addEventListener('click', () => {
    summaryMapCollapsed = !summaryMapCollapsed;
    updateSummaryMapToggle();
  });
}

window.addEventListener('resize', () => {
  syncExploreShellHeight();
  updateSummaryMapToggle();
});

phoneBreakpoint.addEventListener('change', () => {
  updateSummaryMapToggle();
  syncExploreShellHeight();
});

for (const button of homeJumpButtons) {
  if (!(button instanceof HTMLButtonElement)) {
    continue;
  }

  button.addEventListener('click', () => {
    const targetId = button.dataset.homeJumpTarget;
    if (targetId) {
      scrollToHomeTarget(targetId);
    }
  });
}

const hydratedBoard = hydrateBoardFromCache();
bindFavoriteButtons(document);
updateSummaryMapToggle();
loadBoard({ silent: hydratedBoard });
window.setInterval(() => {
  loadBoard({ silent: true });
}, AUTO_REFRESH_MS);

