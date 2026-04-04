import {
  MAP_STYLE_URL,
  bindMarkerPopup,
  ensureMapLibre,
  escapeHtml,
  markerClassForRating,
} from '/scripts/map-runtime.js';

const STORAGE_KEY = 'paddletoday:user-location';
const GEOLOCATION_TIMEOUT_MS = 10000;
const AUTO_REFRESH_MS = 5 * 60 * 1000;
const NEARBY_TRAVEL_MINUTES = 90;
const DAY_TRIP_TRAVEL_MINUTES = 180;
const AVERAGE_DRIVE_MPH = 50;

const nearbyGrid = document.querySelector('[data-nearby-grid]');
const nearbySummary = document.querySelector('[data-nearby-summary]');
const nearbyEmpty = document.querySelector('[data-nearby-empty]');
const nearbyLocationPanel = document.querySelector('[data-nearby-location-panel]');
const overallGrid = document.querySelector('[data-overall-grid]');
const overallSummary = document.querySelector('[data-overall-summary]');
const exploreGrid = document.querySelector('[data-explore-grid]');
const exploreShell = document.querySelector('[data-explore-shell]');
const cardTemplate = document.querySelector('[data-river-card-template]');

const featuredPanel = document.querySelector('.hero-call');
const featuredLabel = document.querySelector('[data-best-near-label]');
const featuredState = document.querySelector('[data-featured-state]');
const featuredName = document.querySelector('[data-featured-name]');
const featuredReach = document.querySelector('[data-featured-reach]');
const featuredLink = document.querySelector('[data-featured-link]');
const featuredSummary = document.querySelector('[data-field="featured-explanation"]');
const featuredToggle = document.querySelector('[data-featured-toggle]');
const featuredCondition = document.querySelector('[data-featured-condition]');
const nearbySection = document.querySelector('.decision-section--nearby');

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

const locationUseButton = document.querySelector('[data-location-use]');
const locationForm = document.querySelector('[data-location-form]');
const locationInput = document.querySelector('[data-location-input]');
const locationClearButton = document.querySelector('[data-location-clear]');
const locationStatus = document.querySelector('[data-location-status]');

const summaryMap = document.querySelector('[data-summary-map]');
const summaryMapStatus = document.querySelector('[data-summary-map-status]');

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
let userLocation = null;
let userLocationState = 'idle';
let currentExplorePage = 1;
let exploreLockedHeight = 0;
let exploreLayoutKey = '';

const EXPLORE_PAGE_SIZE = 9;

function setText(scope, field, value) {
  const nodes = Array.from(scope.querySelectorAll(`[data-field="${field}"]`));
  for (const node of nodes) {
    node.textContent = value;
  }
  return nodes[0] ?? null;
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
    return `${minutes} min away`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h away`;
  }

  return `${hours}h ${remainingMinutes}m away`;
}

function distanceBucketLabel(minutes) {
  if (!Number.isFinite(minutes)) {
    return 'Distance unavailable';
  }

  if (minutes <= 30) return 'Within 30 minutes';
  if (minutes <= 90) return 'Within 90 minutes';
  return 'Day trip';
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
    return `${routeCountLabel(item)} - ${representativeRouteLabel(item)}`;
  }

  return routeLabelForItem(item);
}

function routeLengthLabel(item) {
  return item.cardRoute.river.distanceLabel || '';
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

function updateFeaturedSummaryToggle(text) {
  if (!(featuredSummary instanceof HTMLElement) || !(featuredToggle instanceof HTMLButtonElement)) {
    return;
  }

  const normalized = typeof text === 'string' ? text.replace(/\s+/g, ' ').trim() : '';
  const shouldShow = normalized.length > 165;

  featuredSummary.classList.remove('hero-call__summary--expanded');
  featuredToggle.hidden = !shouldShow;
  featuredToggle.setAttribute('aria-expanded', 'false');
  featuredToggle.textContent = 'More';
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
  return `${item.cardRoute.confidence.label} confidence`;
}
function metaLineText(item, showDistance) {
  const parts = [confidenceLabel(item)];
  if (showDistance && Number.isFinite(item.travelMinutes)) {
    parts.push(formatTravelLabel(item.travelMinutes));
  }
  if (routeLengthLabel(item)) {
    parts.push(routeLengthLabel(item));
  }
  return parts.join(' • ');
}
function cardSummary(item) {
  return item.cardRoute.summary?.shortExplanation ?? item.cardRoute.explanation;
}

function cardLinkLabel(item) {
  return isGroupedItem(item) ? 'Compare routes' : 'View river';
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
  setText(card, 'name', item.cardRoute.river.name);
  setText(card, 'route-label', routeLabelForItem(item));
  setText(card, 'score', String(item.cardRoute.score));
  setText(card, 'rating', item.cardRoute.rating);
  setText(card, 'meta-line', metaLineText(item, showDistance));
  const summary = summaryParts(cardSummary(item));
  setText(card, 'card-summary-main', summary.main);
  setText(card, 'card-summary-weather', summary.weather);

  const weatherRow = card.querySelector('[data-field="card-summary-weather-row"]');
  if (weatherRow instanceof HTMLElement) {
    weatherRow.hidden = !summary.weather;
  }

  const signalRow = card.querySelector('[data-field="raw-signal"]');
  if (signalRow instanceof HTMLElement) {
    signalRow.innerHTML = signalRowMarkup(item);
  }

  const weatherIcon = card.querySelector('[data-field="weather-icon"]');
  if (weatherIcon instanceof HTMLElement) {
    const state = weatherVisualState(item);
    weatherIcon.className = `weather-indicator weather-indicator--${state}`;
    weatherIcon.innerHTML = weatherVisualMarkup(state);
    weatherIcon.setAttribute('title', weatherVisualLabel(state));
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
  const nearbyReady = userLocationState === 'ready' && nearbyItems.length > 0;
  const item = nearbyReady ? nearbyItems[0] : overallItems[0] ?? null;

  if (!item) {
    if (featuredLabel instanceof HTMLElement) featuredLabel.textContent = 'Best river right now';
    if (featuredState instanceof HTMLElement) featuredState.textContent = 'Live river calls unavailable';
    if (featuredName instanceof HTMLElement) featuredName.textContent = 'Check sources';
    if (featuredReach instanceof HTMLElement) featuredReach.textContent = 'Live calls could not be loaded.';
    setText(document, 'featured-score', '--');
    setText(document, 'featured-rating', 'Unavailable');
    setText(document, 'featured-confidence', 'Confidence unavailable');
    setText(document, 'featured-distance', 'Distance unavailable');
    setText(document, 'featured-explanation', 'Reload the board or open a river page to verify the latest sources.');
    updateFeaturedSummaryToggle('Reload the board or open a river page to verify the latest sources.');
    if (featuredCondition instanceof HTMLElement) {
      featuredCondition.hidden = true;
      featuredCondition.innerHTML = '';
    }
    if (featuredLink instanceof HTMLAnchorElement) {
      featuredLink.href = '#top-rivers-today';
    }
    return;
  }

  const ratingKey = ratingToneKey(item.cardRoute.rating);
  if (featuredPanel instanceof HTMLElement) {
    featuredPanel.classList.remove('hero-call--great', 'hero-call--good', 'hero-call--marginal', 'hero-call--no-go');
    featuredPanel.classList.add(`hero-call--${ratingKey}`);
  }

  if (featuredLabel instanceof HTMLElement) {
    featuredLabel.textContent = nearbyReady ? 'Best river near you today' : 'Best river right now';
  }
  if (featuredState instanceof HTMLElement) {
    featuredState.textContent = nearbyReady
      ? `${item.distanceBucket} • ${item.cardRoute.river.state}`
      : `${item.cardRoute.river.state} • ${item.cardRoute.river.region}`;
  }
  if (featuredName instanceof HTMLElement) {
    featuredName.textContent = item.cardRoute.river.name;
  }
  if (featuredReach instanceof HTMLElement) {
    featuredReach.textContent = featuredRouteLabelForItem(item);
  }

  setText(document, 'featured-score', String(item.cardRoute.score));
  setText(document, 'featured-rating', item.cardRoute.rating);
  setText(document, 'featured-confidence', confidenceLabel(item));
  setText(
    document,
    'featured-distance',
    nearbyReady && Number.isFinite(item.travelMinutes) ? formatTravelLabel(item.travelMinutes) : 'Best overall'
  );
  const featuredExplanation = item.cardRoute.explanation || item.cardRoute.summary?.shortExplanation || '';
  setText(document, 'featured-explanation', featuredExplanation);
  updateFeaturedSummaryToggle(featuredExplanation);
  if (featuredCondition instanceof HTMLElement) {
    const markup = featuredConditionMarkup(item);
    featuredCondition.hidden = !markup;
    featuredCondition.innerHTML = markup;
  }

  const orb = featuredPanel?.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    orb.classList.remove('score-orb--great', 'score-orb--good', 'score-orb--marginal', 'score-orb--no-go');
    orb.classList.add(`score-orb--${ratingKey}`);
  }

  if (featuredLink instanceof HTMLAnchorElement) {
    featuredLink.href = item.link;
    featuredLink.textContent = cardLinkLabel(item);
  }
}

function renderNearbySection(nearbyItems, overallItems) {
  if (!(nearbySummary instanceof HTMLElement) || !(nearbyEmpty instanceof HTMLElement)) {
    return;
  }

  if (nearbySection instanceof HTMLElement) {
    nearbySection.classList.remove('decision-section--active');
  }

  if (userLocationState !== 'ready' || !userLocation) {
    nearbySummary.textContent = 'Set your location to unlock distance-based ranking.';
    if (nearbyLocationPanel instanceof HTMLElement) {
      nearbyLocationPanel.hidden = false;
    }
    if (nearbyGrid instanceof HTMLElement) {
      nearbyGrid.innerHTML = '';
    }
    nearbyEmpty.hidden = true;
    return;
  }

  if (nearbyLocationPanel instanceof HTMLElement) {
    nearbyLocationPanel.hidden = true;
  }

  if (nearbySection instanceof HTMLElement) {
    nearbySection.classList.add('decision-section--active');
  }

  if (nearbyItems.length === 0) {
    nearbySummary.textContent = 'No rivers landed inside the nearby travel window. Try the overall list or widen your search below.';
    if (nearbyGrid instanceof HTMLElement) nearbyGrid.innerHTML = '';
    nearbyEmpty.hidden = false;
    return;
  }

  const withinWindow = nearbyItems.filter((item) => item.travelMinutes <= NEARBY_TRAVEL_MINUTES);
  const nearbyDisplay = (withinWindow.length ? withinWindow : nearbyItems).slice(0, 4);
  nearbySummary.textContent =
    withinWindow.length > 0
      ? `Ranked by score with a distance penalty. Rivers within about ${NEARBY_TRAVEL_MINUTES} minutes rise to the top.`
      : 'No rivers landed within about 90 minutes, so this shows the strongest day-trip options instead.';

  nearbyEmpty.hidden = true;
  renderCardGrid(nearbyGrid, nearbyDisplay, { compact: true, showDistance: true });
}

function renderOverallSection(items) {
  if (overallSummary instanceof HTMLElement) {
    overallSummary.textContent = 'The strongest live river calls overall, sorted by raw score.';
  }

  renderCardGrid(overallGrid, items.slice(0, 6), { compact: true, showDistance: userLocationState === 'ready' });
}

function matchesRouteFilters(result) {
  if (activeFilters.paddleable && !['Strong', 'Good'].includes(result.rating)) {
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

function updateLocationStatus() {
  if (!(locationStatus instanceof HTMLElement)) {
    return;
  }

  if (userLocationState === 'pending') {
    locationStatus.textContent = 'Finding your location so nearby rivers can rank better.';
    return;
  }

  if (userLocation) {
    locationStatus.textContent = `Using ${userLocation.label}. Nearby rivers now rank by score and drive time.`;
    if (locationClearButton instanceof HTMLButtonElement) {
      locationClearButton.hidden = false;
    }
    return;
  }

  if (locationClearButton instanceof HTMLButtonElement) {
    locationClearButton.hidden = true;
  }

  if (userLocationState === 'denied') {
    locationStatus.textContent = 'Location access was denied. Enter a city or ZIP code to improve the ranking.';
    return;
  }

  if (userLocationState === 'unavailable') {
    locationStatus.textContent = 'Location is unavailable in this browser. Enter a city or ZIP code to improve the ranking.';
    return;
  }

  locationStatus.textContent = "Use your location or enter a city or ZIP code to get better river recommendations.";
}

function updateFilterSummary(exploreItems) {
  if (!(filterSummary instanceof HTMLElement)) {
    return;
  }

  const sortLabel =
    activeFilters.sort === 'near-you'
      ? 'best near you'
      : activeFilters.sort === 'nearest'
        ? 'nearest route'
        : activeFilters.sort === 'highest-confidence'
          ? 'highest confidence'
          : activeFilters.sort === 'lowest-risk'
            ? 'lowest risk'
            : activeFilters.sort === 'a-z'
              ? 'A-Z'
              : 'best overall';

  if (exploreItems.length === 0) {
    filterSummary.textContent = 'No rivers match these filters.';
    return;
  }

  filterSummary.textContent = `Showing ${exploreItems.length} rivers • ${sortLabel}`;
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
      boardBannerTitle.textContent = `${offlineCount} rivers need another look.`;
    }
    if (boardBannerDetail instanceof HTMLElement) {
      boardBannerDetail.textContent = `${degradedCount} limited • ${liveCount} live`;
    }
    return;
  }

  if (degradedCount > 0) {
    boardStatusBanner.classList.add('status-banner--degraded');
    if (boardBannerTitle instanceof HTMLElement) {
      boardBannerTitle.textContent = `${degradedCount} rivers are limited.`;
    }
    if (boardBannerDetail instanceof HTMLElement) {
      boardBannerDetail.textContent = `${liveCount} rivers are fully live`;
    }
    return;
  }

  boardStatusBanner.classList.add('status-banner--live');
  if (boardBannerTitle instanceof HTMLElement) {
    boardBannerTitle.textContent = 'The board is up to date.';
  }
  if (boardBannerDetail instanceof HTMLElement) {
    boardBannerDetail.textContent = `${liveCount} rivers are live`;
  }
}

function markerClassFor(item) {
  return markerClassForRating(item.cardRoute.rating, item.cardRoute.confidence.label);
}

function popupMarkup(item) {
  const reachMarkup = isGroupedItem(item)
    ? `<p class="score-map-popup__reach">${escapeHtml(routeCountLabel(item))}</p>
      <p class="score-map-popup__meta">${escapeHtml(representativeRouteLabel(item))}</p>`
    : `<p class="score-map-popup__reach">${escapeHtml(routeLabelForItem(item))}</p>`;

  return `
    <article class="score-map-popup">
      <p class="score-map-popup__state">${escapeHtml(item.cardRoute.river.state)} | ${escapeHtml(item.cardRoute.river.region)}</p>
      <h3>${escapeHtml(item.cardRoute.river.name)}</h3>
      ${reachMarkup}
      <p class="score-map-popup__summary">${escapeHtml(item.cardRoute.explanation)}</p>
      <p class="score-map-popup__meta">Score ${item.cardRoute.score} • ${escapeHtml(item.cardRoute.rating)} • ${escapeHtml(confidenceLabel(item))}</p>
      <a class="score-map-popup__link score-map-popup__link--button" href="${item.link}">${cardLinkLabel(item)}</a>
    </article>
  `;
}

async function renderSummaryMap(items) {
  if (!(summaryMap instanceof HTMLElement)) {
    return;
  }

  if (summaryMapStatus instanceof HTMLElement) {
    summaryMapStatus.textContent = 'Loading map markers.';
  }

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl) {
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

    for (const marker of mapMarkers) {
      marker.remove();
    }
    mapMarkers = [];

    const bounds = new maplibregl.LngLatBounds();
    let hasBounds = false;

    for (const item of items) {
      const markerNode = document.createElement('button');
      markerNode.type = 'button';
      markerNode.className = markerClassFor(item);
      markerNode.innerHTML = `<span>${item.cardRoute.score}</span>`;
      markerNode.setAttribute(
        'aria-label',
        `${item.cardRoute.river.name}: score ${item.cardRoute.score}, confidence ${item.cardRoute.confidence.label}`
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

      bindMarkerPopup(marker, markerNode);
      mapMarkers.push(marker);
      bounds.extend([item.cardRoute.river.longitude, item.cardRoute.river.latitude]);
      hasBounds = true;
    }

    if (hasBounds) {
      const compact = window.matchMedia('(max-width: 720px)').matches;
      mapRuntime.fitBounds(bounds, {
        padding: compact
          ? { top: 22, right: 22, bottom: 22, left: 22 }
          : { top: 52, right: 52, bottom: 52, left: 52 },
        maxZoom: 8.2,
        duration: 700,
      });
      mapRuntime.resize();
      if (summaryMapStatus instanceof HTMLElement) {
        summaryMapStatus.textContent = 'Map is up to date.';
      }
      return;
    }

    if (summaryMapStatus instanceof HTMLElement) {
      summaryMapStatus.textContent = 'No rivers match the current filters.';
    }
  } catch (error) {
    console.error('Failed to load summary map.', error);
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
      boardRefreshNote.textContent = 'Refreshing live reads.';
      return;
    }

    if (state === 'error') {
      boardRefreshNote.textContent = detail || 'Last refresh failed.';
      return;
    }

    if (lastBoardSuccessAt) {
      boardRefreshNote.textContent = `Last refresh ${new Date(lastBoardSuccessAt).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })} • Auto-refreshes every 5 minutes`;
      return;
    }

    boardRefreshNote.textContent = 'Auto-refreshes every 5 minutes.';
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
        ? 'Live river calls could not be loaded.'
        : 'Live river calls could not be refreshed.';
  }
  if (boardFetchDetail instanceof HTMLElement) {
    boardFetchDetail.textContent = detail;
  }
}

function renderHomepage(results) {
  const overallItems = sortItems(buildDisplayItems(results, results, 'best-now'), 'best-now');
  const nearbyBaseItems = sortItems(buildDisplayItems(results, results, 'near-you'), 'near-you');
  const nearbyItems = nearbyBaseItems.filter((item) => item.travelMinutes <= DAY_TRIP_TRAVEL_MINUTES);

  updateFeaturedHero(nearbyItems, overallItems);
  renderNearbySection(nearbyItems, overallItems);
  renderOverallSection(overallItems);

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

function setUserLocation(location) {
  userLocation = location;
  userLocationState = 'ready';
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

function clearUserLocation() {
  userLocation = null;
  userLocationState = 'idle';
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

  const admin = match.admin1 || match.country || '';
  return {
    latitude: match.latitude,
    longitude: match.longitude,
    label: admin ? `${match.name}, ${admin}` : match.name,
    source: 'manual',
  };
}

function requestUserLocation() {
  if (!navigator.geolocation) {
    userLocationState = 'unavailable';
    updateLocationStatus();
    renderHomepage(latestResults);
    return;
  }

  userLocationState = 'pending';
  updateLocationStatus();
  updateLocationIndicator();
  if (latestResults.length > 0) {
    renderHomepage(latestResults);
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        label: 'your current location',
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

function setupLocationControls() {
  if (locationUseButton instanceof HTMLButtonElement) {
    locationUseButton.addEventListener('click', () => {
      requestUserLocation();
    });
  }

  if (locationClearButton instanceof HTMLButtonElement) {
    locationClearButton.addEventListener('click', () => {
      clearUserLocation();
    });
  }

  if (locationForm instanceof HTMLFormElement) {
    locationForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const query = locationInput instanceof HTMLInputElement ? locationInput.value.trim() : '';
      if (!query) {
        updateLocationStatus();
        return;
      }

      if (locationStatus instanceof HTMLElement) {
        locationStatus.textContent = 'Looking up that location.';
      }

      try {
        const match = await geocodeManualLocation(query);
        if (!match) {
          if (locationStatus instanceof HTMLElement) {
            locationStatus.textContent = 'That city or ZIP was not found. Try a nearby town or a different ZIP code.';
          }
          return;
        }

        setUserLocation(match);
      } catch (error) {
        console.error('Manual location lookup failed.', error);
        if (locationStatus instanceof HTMLElement) {
          locationStatus.textContent = 'That location could not be looked up right now. Try again.';
        }
      }
    });
  }
}

async function loadBoard({ silent = false } = {}) {
  if (!silent) {
    setBoardRefreshState('loading');
  }

  try {
    const response = await fetch('/api/rivers/summary.json', {
      headers: { accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed for /api/rivers/summary.json: HTTP ${response.status}`);
    }

    const payload = await response.json();
    latestResults = Array.isArray(payload?.rivers) ? payload.rivers : [];
    hasLoadedBoardOnce = true;
    lastBoardSuccessAt = Date.now();
    setBoardFetchBannerState('hidden');
    setBoardRefreshState('ready');
    renderHomepage(latestResults);
  } catch (error) {
    console.error('Failed to load river scores on summary page.', error);

    if (hasLoadedBoardOnce) {
      setBoardFetchBannerState('hidden');
      setBoardRefreshState('error', 'Last refresh failed. Showing the last good board.');
      return;
    }

    setBoardFetchBannerState(
      'initial',
      'Live river calls could not load. Retry the board, then open a river page if you need to verify the sources.'
    );
    setBoardRefreshState('error', 'Last refresh failed. Retry now.');

    if (summaryHeadline instanceof HTMLElement) {
      summaryHeadline.textContent = 'Live river status is unavailable.';
    }
    if (summaryDetail instanceof HTMLElement) {
      summaryDetail.textContent = 'Current gauge and weather reads could not load.';
    }
    if (nearbySummary instanceof HTMLElement) {
      nearbySummary.textContent = 'Nearby calls are unavailable until the river board loads.';
    }
    if (overallSummary instanceof HTMLElement) {
      overallSummary.textContent = 'Top river calls are unavailable until the river board loads.';
    }
  }
}

setupFilters();
setupLocationControls();

const storedLocation = loadStoredLocation();
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
    featuredToggle.textContent = expanded ? 'Less' : 'More';
  });
}

window.addEventListener('resize', () => {
  syncExploreShellHeight();
});

loadBoard();
window.setInterval(() => {
  loadBoard({ silent: true });
}, AUTO_REFRESH_MS);
