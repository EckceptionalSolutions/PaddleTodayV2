import {
  clearMapMarkers,
  createMapMarker,
  createMapStatusController,
  createPaddleMap,
  ensureMapLibre,
  escapeHtml,
  fitMapBounds,
  waitForMapReady,
  markerClassForRating,
  scoreZoneRouteLabel,
  syncActualRiverLayer,
  syncGeoJsonOverlay,
} from './map-runtime.js';
import { createBoardMapMarker } from './board-map-controller.js';
import { favoriteButtonMarkup as buildFavoriteButtonMarkup } from './favorite-button-markup.js';
import { bindFavoriteButtons, refreshFavoriteButtons } from './favorites-ui.js';
import { confidenceDisplayLabel, ratingDisplayLabel } from './ui-taxonomy.js';
import { createRequestGuard, isAbortError } from './request-guard.js';
import { ratingToneKey, ratingVerdictLabel, todayBoardConfidenceWeight } from '@paddletoday/api-contract';
import { loadCanonicalRiverRouteLine } from '../lib/canonical-river-geometries.js';
import { coverageAnchorForRoutes, groupRoutesByConditionScore } from '../lib/river-coverage.js';
import {
  activeRiverHubFilterCount,
  defaultRiverHubFilters,
  riverHubFilterOptions,
} from '../lib/river-hub-planning.js';
import { getBrowserApiClient } from './browser-api-client.js';
import { trackEvent } from './analytics.js';
import {
  riverHubMapNotices,
  riverHubRouteStatus,
  routeGeometryMidpoint,
} from './river-hub-map-model.js';

const root = document.querySelector('[data-river-group-page]');

if (!(root instanceof HTMLElement)) {
  throw new Error('Missing river group root.');
}

const riverId = root.dataset.riverId;
if (!riverId) {
  throw new Error('Missing river group id.');
}

const routeList = root.querySelector('[data-group-route-list]');
const banner = root.querySelector('[data-group-status-banner]');
const bannerTitle = root.querySelector('[data-group-banner-title]');
const bannerDetail = root.querySelector('[data-group-banner-detail]');
const refreshButton = root.querySelector('[data-group-refresh]');
const refreshNote = root.querySelector('[data-group-refresh-note]');
const groupMap = root.querySelector('[data-group-map]');
const groupMapShell = groupMap?.closest('.river-group-page__map-shell');
const groupMapStatus = root.querySelector('[data-group-map-status]');
const groupMapStatusController = createMapStatusController(groupMapStatus, {
  loading: 'Loading route map.',
  empty: 'No routes match these filters.',
  unavailable: 'Route map unavailable right now.',
});
const groupMapToggle = root.querySelector('[data-group-map-toggle]');
const resultsSummary = root.querySelector('[data-group-results-summary]');
const distanceFilterButtons = Array.from(root.querySelectorAll('[data-group-distance-filter]'));
const regionFilterSelect = root.querySelector('[data-group-region-filter]');
const difficultyFilterSelect = root.querySelector('[data-group-difficulty-filter]');
const campingFilterSelect = root.querySelector('[data-group-camping-filter]');
const routeTypeFilterSelect = root.querySelector('[data-group-route-type-filter]');
const sortSelect = root.querySelector('[data-group-sort]');
const selectedSummary = root.querySelector('[data-group-selected-summary]');
const moreFilters = root.querySelector('[data-group-more-filters]');
const activeFilterCount = root.querySelector('[data-group-filter-count]');
const clearFiltersButton = root.querySelector('[data-group-clear-filters]');
const pickerLayout = root.querySelector('[data-group-picker-layout]');
const mobileSwitch = root.querySelector('[data-group-mobile-switch]');
const mobileViewButtons = Array.from(root.querySelectorAll('[data-group-mobile-view]'));
const mobileCountNodes = Array.from(root.querySelectorAll('[data-group-mobile-count]'));
const groupMapEmpty = root.querySelector('[data-group-map-empty]');
const groupMapEmptyReset = root.querySelector('[data-group-map-empty-reset]');
const phoneBreakpoint = window.matchMedia('(max-width: 760px)');

const AUTO_REFRESH_MS = 5 * 60 * 1000;
const BULLET = ' \u2022 ';
const DEG_F = '\u00B0F';
const initialParams = new URLSearchParams(window.location.search);
const initialSelectedSlug = initialParams.get('route');
const distanceFilterValues = new Set(['all', 'short', 'medium', 'long']);
const sortModeValues = new Set(['recommended', 'shortest', 'longest', 'easiest', 'confidence']);

let lastSuccessAt = null;
let currentResult = null;
let riverHubViewTracked = false;
let selectedSlug = initialSelectedSlug || null;
let mapRuntime = null;
let maplibreRuntime = null;
let mapReadyPromise = null;
let mapMarkers = [];
let conditionScoreMarkers = [];
let groupMapCollapsed = false;
let distanceFilter = distanceFilterValues.has(initialParams.get('distance'))
  ? initialParams.get('distance')
  : 'all';
let regionFilter = initialParams.get('area') || 'all';
let difficultyFilter = initialParams.get('difficulty') || 'all';
let campingFilter = initialParams.get('camping') || 'all';
let routeTypeFilter = initialParams.get('type') || 'all';
let sortMode = sortModeValues.has(initialParams.get('sort'))
  ? initialParams.get('sort')
  : 'recommended';
let mobileView = initialParams.get('view') === 'map' ? 'map' : 'list';
let availableFilters = {
  difficulty: false,
  camping: false,
  region: false,
  routeType: false,
};
let adaptiveFilterOptions = null;
let routeGeometryLoadVersion = 0;
const routeGeometryBySlug = new Map();
const groupRequestGuard = createRequestGuard();
document.body.classList.add('page-river-hub');

function setText(field, value) {
  const elements = Array.from(root.querySelectorAll(`[data-field="${field}"]`));
  for (const element of elements) {
    element.textContent = value;
  }
  return elements[0] ?? null;
}

function activeAdvancedFilterTotal() {
  return Number(difficultyFilter !== 'all')
    + Number(campingFilter !== 'all')
    + Number(regionFilter !== 'all')
    + Number(routeTypeFilter !== 'all');
}

function activeFilterTotal() {
  return activeRiverHubFilterCount({
    distance: distanceFilter,
    difficulty: difficultyFilter,
    camping: campingFilter,
    routeType: routeTypeFilter,
    region: regionFilter,
  });
}

function syncPickerUrl() {
  const url = new URL(window.location.href);
  const params = [
    ['route', selectedSlug],
    ['distance', distanceFilter === 'all' ? null : distanceFilter],
    ['difficulty', difficultyFilter === 'all' ? null : difficultyFilter],
    ['camping', campingFilter === 'all' ? null : campingFilter],
    ['type', routeTypeFilter === 'all' ? null : routeTypeFilter],
    ['area', regionFilter === 'all' ? null : regionFilter],
    ['sort', sortMode === 'recommended' ? null : sortMode],
    ['view', phoneBreakpoint.matches && mobileView === 'map' ? 'map' : null],
  ];

  for (const [key, value] of params) {
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  }
  window.history.replaceState({}, '', url);
}

function setMobileView(view, { persist = true } = {}) {
  mobileView = view === 'map' ? 'map' : 'list';
  const compact = phoneBreakpoint.matches;

  if (pickerLayout instanceof HTMLElement) {
    pickerLayout.classList.toggle('river-route-picker__layout--mobile-list', compact && mobileView === 'list');
    pickerLayout.classList.toggle('river-route-picker__layout--mobile-map', compact && mobileView === 'map');
    pickerLayout.dataset.mobileView = mobileView;
  }
  if (mobileSwitch instanceof HTMLElement) {
    mobileSwitch.hidden = !compact;
  }
  for (const button of mobileViewButtons) {
    if (!(button instanceof HTMLButtonElement)) continue;
    const active = button.dataset.groupMobileView === mobileView;
    button.classList.toggle('river-route-picker__mobile-switch-button--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }
  if (mobileView === 'map' && mapRuntime) {
    window.setTimeout(() => {
      mapRuntime?.resize();
      if (currentResult) {
        renderGroupMap(visiblePickerRoutes(currentResult.routes), {
          preserveViewport: false,
          focusSelected: Boolean(selectedSlug),
        });
      }
    }, 40);
  }
  if (persist) {
    syncPickerUrl();
  }
}

function resetPickerFilters({ render = true } = {}) {
  const defaults = defaultRiverHubFilters();
  distanceFilter = defaults.distance;
  regionFilter = defaults.region;
  difficultyFilter = defaults.difficulty;
  campingFilter = defaults.camping;
  routeTypeFilter = defaults.routeType;
  if (moreFilters instanceof HTMLDetailsElement) {
    moreFilters.open = false;
  }
  if (render && currentResult) {
    renderPicker({ fitMap: true });
  }
}

function decisionLabel(rating, score = null) {
  return ratingVerdictLabel(rating, Number(score), {
    strongMaxLabel: 'Strong',
    strongLabel: 'Strong',
    goodLabel: 'Good',
    fairLabel: 'Fair: tradeoffs',
    noGoLabel: 'No-go',
  });
}

function corridorKey(route) {
  return route.continuityStatus === 'condition-family'
    ? route.conditionZoneId || route.slug
    : route.corridorId || route.conditionZoneId || route.riverId || route.slug;
}

function corridorGroups(routes) {
  const groups = new Map();
  for (const route of routes) {
    const key = corridorKey(route);
    const group = groups.get(key) || { key, routes: [] };
    group.routes.push(route);
    groups.set(key, group);
  }

  return [...groups.values()].map((group) => ({
    ...group,
    routes: [...group.routes].sort(compareRoutes),
  }));
}

function compareRoutes(left, right) {
  if ((left?.score ?? 0) !== (right?.score ?? 0)) {
    return (right?.score ?? 0) - (left?.score ?? 0);
  }

  const leftConfidence = todayBoardConfidenceWeight[left?.confidence?.label] ?? 0;
  const rightConfidence = todayBoardConfidenceWeight[right?.confidence?.label] ?? 0;
  if (leftConfidence !== rightConfidence) {
    return rightConfidence - leftConfidence;
  }

  return String(left?.reach ?? '').localeCompare(String(right?.reach ?? ''));
}

function routeDistanceMiles(route) {
  const match = String(route?.distanceLabel || '').match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

function routeMatchesDistanceFilter(route) {
  const miles = routeDistanceMiles(route);
  if (distanceFilter === 'all') return true;
  if (miles === null) return false;
  if (distanceFilter === 'short') return miles < 5;
  if (distanceFilter === 'medium') return miles >= 5 && miles < 10;
  if (distanceFilter === 'long') return miles >= 10;
  return true;
}

function routeMatchesRegionFilter(route) {
  return regionFilter === 'all' || route.region === regionFilter;
}

function difficultyKey(value) {
  return String(value || '').trim().toLowerCase();
}

function routeMatchesDifficultyFilter(route) {
  return difficultyFilter === 'all' || difficultyKey(route.difficulty) === difficultyFilter;
}

function routeMatchesCampingFilter(route) {
  if (campingFilter === 'all') return true;
  const hasCamping = route.campingClassification && route.campingClassification !== 'none';
  return campingFilter === 'available' ? hasCamping : !hasCamping;
}

function routeMatchesTypeFilter(route) {
  return routeTypeFilter === 'all' || route.routeType === routeTypeFilter;
}

function isPlanningRoute(route) {
  return route?.scoreEligibility === 'planning';
}

function routeDifficultyRank(route) {
  const ranks = {
    easy: 0,
    moderate: 1,
    hard: 2,
  };
  return ranks[difficultyKey(route?.difficulty)] ?? 3;
}

function routeConfidenceScore(route) {
  if (Number.isFinite(route?.confidence?.score)) {
    return Number(route.confidence.score);
  }
  return todayBoardConfidenceWeight[route?.confidence?.label] ?? 0;
}

function comparePickerRoutes(left, right) {
  const leftMiles = routeDistanceMiles(left);
  const rightMiles = routeDistanceMiles(right);
  if (sortMode === 'shortest') {
    return (leftMiles ?? Number.POSITIVE_INFINITY) - (rightMiles ?? Number.POSITIVE_INFINITY) || compareRoutes(left, right);
  }
  if (sortMode === 'longest') {
    return (rightMiles ?? Number.NEGATIVE_INFINITY) - (leftMiles ?? Number.NEGATIVE_INFINITY) || compareRoutes(left, right);
  }
  if (sortMode === 'easiest') {
    return routeDifficultyRank(left) - routeDifficultyRank(right) || compareRoutes(left, right);
  }
  if (sortMode === 'confidence') {
    return routeConfidenceScore(right) - routeConfidenceScore(left) || compareRoutes(left, right);
  }
  return compareRoutes(left, right);
}

function visiblePickerRoutes(routes) {
  return routes
    .filter(routeMatchesDistanceFilter)
    .filter(routeMatchesRegionFilter)
    .filter(routeMatchesDifficultyFilter)
    .filter(routeMatchesCampingFilter)
    .filter(routeMatchesTypeFilter)
    .sort(comparePickerRoutes);
}

function shortTimeLabel(value) {
  if (!value) return '';
  const text = String(value).trim();
  const hourRange = text.match(/(\d+(?:\.\d+)?)\s*hr(?:\s*to\s*(\d+(?:\.\d+)?)\s*hr)?/i);
  if (hourRange) {
    return hourRange[2]
      ? `About ${hourRange[1]}–${hourRange[2]} hr`
      : `About ${hourRange[1]} hr`;
  }
  const minuteRange = text.match(/(\d+(?:\.\d+)?)\s*min(?:\s*to\s*(\d+(?:\.\d+)?)\s*min)?/i);
  if (minuteRange) {
    return minuteRange[2]
      ? `About ${minuteRange[1]}–${minuteRange[2]} min`
      : `About ${minuteRange[1]} min`;
  }
  return text.split(/[,.]/)[0].trim().slice(0, 34);
}

function difficultyLabel(value) {
  if (!value) return '';
  return `${String(value).slice(0, 1).toUpperCase()}${String(value).slice(1)} difficulty`;
}

function pickerFacts(route) {
  return [route.distanceLabel, shortTimeLabel(route.estimatedPaddleTime), difficultyLabel(route.difficulty)].filter(Boolean);
}

function hasStrongerRouteOnRiver(route) {
  const routes = currentResult?.routes;
  if (!Array.isArray(routes)) {
    return false;
  }

  return routes.some((candidate) => {
    if (!candidate || candidate.slug === route.slug) {
      return false;
    }

    return compareRoutes(candidate, route) < 0;
  });
}

function confidenceLabelText(confidence) {
  return confidence?.label ? confidenceDisplayLabel(confidence.label) : 'Loading data confidence';
}

function coldWeatherDrivenRoute(route) {
  const weather = route.weather;
  const temp = weather?.temperatureF;
  const wind = weather?.next12hWindMphMax ?? weather?.windMph ?? 0;
  const rainChance = weather?.next12hPrecipProbabilityMax ?? 0;

  return (
    typeof temp === 'number' &&
    temp <= 40 &&
    ['ideal', 'minimum-met', 'low-shoulder'].includes(route.gaugeBand) &&
    !weather?.next12hStormRisk &&
    (rainChance < 70 || wind < 20)
  );
}

function routeLengthText(route) {
  return route.distanceLabel ? `${route.distanceLabel} on-water` : '';
}

function routeDifficultyText(route) {
  return route.difficulty
    ? `${String(route.difficulty).slice(0, 1).toUpperCase()}${String(route.difficulty).slice(1)} difficulty`
    : '';
}

function favoriteButtonMarkup(route) {
  return buildFavoriteButtonMarkup(
    {
      slug: route.slug,
      name: route.name,
      reach: route.reach,
      state: route.state,
      region: route.region,
      url: `/rivers/${route.slug}/`,
    },
    {
      className: 'favorite-toggle favorite-toggle--card favorite-toggle--inline',
    }
  );
}

function conditionsLine(route) {
  return [levelText(route), trendText(route), weatherSummary(route)].filter(Boolean).join(BULLET);
}

function routeFactsMarkup(route) {
  const facts = [
    confidenceLabelText(route.confidence),
    routeLengthText(route),
    routeDifficultyText(route),
    route.estimatedPaddleTime,
  ].filter(Boolean);

  return facts
    .map((fact) => `<span class="route-choice__fact">${escapeHtml(fact)}</span>`)
    .join('');
}

function levelText(route) {
  switch (route.gaugeBand) {
    case 'ideal':
      return 'Perfect level';
    case 'low-shoulder':
    case 'minimum-met':
      return 'Slightly low';
    case 'too-low':
      return 'Too low';
    case 'high-shoulder':
      return 'High water';
    case 'too-high':
      return 'Too high';
    default:
      return route.gaugeBandLabel || 'Level unclear';
  }
}

function trendText(route) {
  switch (route.gauge?.trend) {
    case 'rising':
      return 'Rising';
    case 'falling':
      return 'Falling';
    case 'steady':
      return 'Stable';
    default:
      return 'Trend unclear';
  }
}

function weatherSummary(route) {
  const weather = route.weather;
  if (!weather) return 'Weather unclear';

  const rainChance = weather.next12hPrecipProbabilityMax;
  const precipStartsInHours = weather.next12hPrecipStartsInHours;
  const wind = weather.next12hWindMphMax ?? weather.windMph ?? null;
  if (coldWeatherDrivenRoute(route)) return 'Cold';

  if (weather.next12hStormRisk) return 'Storm risk';
  if (
    typeof rainChance === 'number' &&
    rainChance >= 60 &&
    (precipStartsInHours === null || precipStartsInHours === undefined || precipStartsInHours <= 12)
  ) {
    return 'Rain incoming';
  }
  if (typeof wind === 'number' && wind >= 15) return 'Windy';
  if (typeof rainChance === 'number' && rainChance < 30) return 'No rain';
  return 'Light wind';
}

function summaryParts(route) {
  return {
    main: `${levelText(route)}${BULLET}${trendText(route)}`,
    weather: weatherSummary(route),
  };
}

function decisionSummary(route) {
  const summary = summaryParts(route);
  const mainParts = typeof summary.main === 'string'
    ? summary.main
        .split(BULLET)
        .map((part) => part.trim().toLowerCase())
        .filter(Boolean)
    : [];
  const weather = typeof summary.weather === 'string' ? summary.weather.toLowerCase() : '';
  const hasWeatherRisk = weather.includes('rain') || weather.includes('storm') || weather.includes('wind');
  const hasColdWeather = weather.includes('cold');
  const hasStableFlow = mainParts.some((part) => part.includes('stable') || part.includes('perfect level'));
  const hasChangingFlow = mainParts.some((part) => part.includes('rising') || part.includes('falling'));

  if (route.rating === 'No-go') {
    if (coldWeatherDrivenRoute(route) || (hasStableFlow && hasColdWeather)) {
      return 'River level looks usable, but weather makes it a skip for most paddlers today.';
    }
    if (hasStableFlow && hasWeatherRisk) {
      return 'River level looks usable, but today’s weather makes it a skip.';
    }
    return 'Conditions stack up against this route today.';
  }

  if (route.rating === 'Fair') {
    if (coldWeatherDrivenRoute(route) || hasColdWeather) {
      return 'Paddleable today, but cold weather raises the bar.';
    }
    if (hasWeatherRisk) {
      return 'Paddleable today, but weather risk is the main caution.';
    }
    if (hasChangingFlow) {
      return 'Paddleable now; re-check the gauge before you launch.';
    }
    if (!hasStrongerRouteOnRiver(route)) {
      return 'This is the highest-ranked route on this river, but it still has tradeoffs.';
    }
    return 'Paddleable today, but stronger routes are available on this river.';
  }

  if (route.rating === 'Strong') {
    return 'Best-looking route on this river today.';
  }

  if (route.rating === 'Good') {
    if (hasColdWeather) {
      return 'Good river level; cold weather still deserves a re-check.';
    }
    if (hasWeatherRisk) {
      return 'Good river level; weather still deserves a re-check.';
    }
    return 'Solid conditions make this one of the better routes today.';
  }

  return 'Check the full route if you want more detail.';
}

function supportingNote(route) {
  const summary = summaryParts(route);
  const summaryText = decisionSummary(route).toLowerCase();
  const mainParts = typeof summary.main === 'string'
    ? summary.main
        .split(BULLET)
        .map((part) => part.trim())
        .filter(Boolean)
    : [];
  const weather = typeof summary.weather === 'string' ? summary.weather : '';

  if (
    weather &&
    !summaryText.includes('weather') &&
    !summaryText.includes('rain') &&
    !summaryText.includes('storm') &&
    !summaryText.includes('wind') &&
    !summaryText.includes('cold')
  ) {
    return weather;
  }

  if (mainParts[1] && !summaryText.includes('rising') && !summaryText.includes('falling') && !summaryText.includes('changing flow')) {
    return mainParts[1];
  }

  return '';
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

function signalRowMarkup(route) {
  const items = [
    { kind: 'gauge', value: formatGaugeValue(route.gauge?.current, route.gaugeUnit).replace(/^Gauge:\s*/, '') },
    { kind: 'wind', value: windData(route).replace(/^Wind:\s*/, '') },
    { kind: 'temp', value: temperatureData(route).replace(/^Temp:\s*/, '') },
  ].filter((item) => item.value && !item.value.toLowerCase().includes('unclear') && item.value !== '--');

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

function weatherVisualState(route) {
  const weather = route.weather;
  const rainChance = weather?.next12hPrecipProbabilityMax;
  const precipStartsInHours = weather?.next12hPrecipStartsInHours;
  const wind = weather?.next12hWindMphMax ?? weather?.windMph ?? null;
  const temperature = weather?.temperatureF ?? null;
  const coldSevere = typeof temperature === 'number' && temperature <= 35;
  const coldNoticeable = typeof temperature === 'number' && temperature <= 40;

  if (weather?.next12hStormRisk) return 'storm';
  if (coldSevere) return 'cold';
  if (
    typeof rainChance === 'number' &&
    rainChance >= 60 &&
    (precipStartsInHours === null || precipStartsInHours === undefined || precipStartsInHours <= 12)
  ) {
    return 'rain';
  }
  if (coldNoticeable) return 'cold';
  if (typeof wind === 'number' && wind >= 15) return 'wind';
  return 'calm';
}

function weatherVisualLabel(state) {
  switch (state) {
    case 'storm':
      return 'Storm risk';
    case 'rain':
      return 'Rain incoming';
    case 'cold':
      return 'Cold weather';
    case 'wind':
      return 'Windy';
    default:
      return 'Calm weather';
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

function weatherBadgeMarkup(route) {
  const state = weatherVisualState(route);
  const label = weatherVisualLabel(state);

  return `
    <span class="card-weather-badge card-weather-badge--${state}">
      <span class="card-weather-badge__icon weather-indicator weather-indicator--${state}" aria-hidden="true">
        ${weatherVisualMarkup(state)}
      </span>
      <span class="card-weather-badge__label">${escapeHtml(label)}</span>
    </span>
  `;
}

function formatGaugeValue(value, unit) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 'Gauge: unavailable';
  }

  if (unit === 'ft') {
    return `Gauge: ${value.toFixed(2).replace(/\.00$/, '')} ${unit}`;
  }

  return `Gauge: ${Math.round(value).toLocaleString('en-US')} ${unit}`;
}

function windData(route) {
  const wind = route.weather?.next12hWindMphMax ?? route.weather?.windMph;
  if (typeof wind !== 'number' || !Number.isFinite(wind)) return 'Wind: unclear';
  return `Wind: ${Math.round(wind)} mph`;
}

function temperatureData(route) {
  const temp = route.weather?.temperatureF;
  if (typeof temp !== 'number' || !Number.isFinite(temp)) return 'Temp: unclear';
  return `Temp: ${Math.round(temp)}${DEG_F}`;
}

function summaryLine(route) {
  return decisionSummary(route);
}

function midpointForRoute(route) {
  const coordinates = routeSpanCoordinates(route);
  if (coordinates.length >= 2) {
    const longitudes = coordinates.map((point) => point.longitude);
    const latitudes = coordinates.map((point) => point.latitude);
    return {
      longitude: (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
      latitude: (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
    };
  }

  if (typeof route.longitude === 'number' && typeof route.latitude === 'number') {
    return { longitude: route.longitude, latitude: route.latitude };
  }

  return null;
}

function accessCoordinate(point) {
  if (!point || !Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) {
    return null;
  }

  return {
    latitude: point.latitude,
    longitude: point.longitude,
  };
}

function routeSpanCoordinates(route) {
  const accessPoints = Array.isArray(route.accessPoints)
    ? route.accessPoints
        .map((point) => ({ point, coordinate: accessCoordinate(point) }))
        .filter((entry) => entry.coordinate)
        .sort((left, right) => Number(left.point.mileFromStart) - Number(right.point.mileFromStart))
        .map((entry) => entry.coordinate)
    : [];

  if (accessPoints.length > 0) {
    const routeChain = [accessCoordinate(route.putIn), ...accessPoints, accessCoordinate(route.takeOut)].filter(Boolean);
    if (routeChain.length >= 2) {
      return routeChain;
    }
  }

  return [accessCoordinate(route.putIn), accessCoordinate(route.takeOut)].filter(Boolean);
}

function routePopupMarkup(route) {
  const facts = pickerFacts(route).join(BULLET);
  return `
    <article class="score-map-popup">
      <h3>${escapeHtml(route.name)}</h3>
      <p class="score-map-popup__reach">${escapeHtml(route.reach)}</p>
      ${facts ? `<p class="score-map-popup__summary">${escapeHtml(facts)}</p>` : ''}
      ${isPlanningRoute(route)
        ? '<p class="score-map-popup__summary">Planning route · not scored because the available gauge is a proxy for this reach.</p>'
        : `<div class="score-map-popup__scoreline"><span class="score-map-popup__scorebadge">${escapeHtml(String(route.score))}</span><p class="score-map-popup__verdict">${escapeHtml(decisionLabel(route.rating, route.score))}</p></div><p class="score-map-popup__summary">${escapeHtml(decisionSummary(route))}</p>`}
      <a class="score-map-popup__link score-map-popup__link--button" href="/rivers/${encodeURIComponent(route.slug)}/">View route</a>
    </article>
  `;
}

function updateGroupMapToggle() {
  if (!(groupMap instanceof HTMLElement) || !(groupMapToggle instanceof HTMLButtonElement)) {
    return;
  }

  if (mobileSwitch instanceof HTMLElement) {
    groupMapCollapsed = false;
    groupMapToggle.hidden = true;
    const mapShell = groupMap.closest('.river-group-page__map-shell');
    mapShell?.classList.remove('river-group-page__map-shell--collapsed');
    return;
  }

  const compact = phoneBreakpoint.matches;
  if (!compact) {
    groupMapCollapsed = false;
  }

  const mapShell = groupMap.closest('.river-group-page__map-shell');
  if (!(mapShell instanceof HTMLElement)) {
    return;
  }

  groupMapToggle.hidden = !compact;
  mapShell.classList.toggle('river-group-page__map-shell--collapsed', compact && groupMapCollapsed);
  groupMapToggle.setAttribute('aria-expanded', compact && groupMapCollapsed ? 'false' : 'true');
  groupMapToggle.textContent = compact && groupMapCollapsed ? 'Show map' : 'Hide map';

  if (!(compact && groupMapCollapsed) && mapRuntime) {
    window.setTimeout(() => {
      mapRuntime?.resize();
    }, 30);
  }
}

function fallbackRouteLineFeature(route) {
  const coordinates = routeSpanCoordinates(route).map((point) => [point.longitude, point.latitude]);
  if (coordinates.length < 2) return null;
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates,
    },
  };
}

function routeLineFeature(route) {
  const stored = routeGeometryBySlug.get(route.slug);
  const feature = stored || fallbackRouteLineFeature(route);
  if (!feature?.geometry) return null;
  return {
    ...feature,
    properties: {
      ...(feature.properties || {}),
      slug: route.slug,
      reach: route.reach,
      distanceLabel: route.distanceLabel || '',
      rating: route.rating,
      routeStatus: riverHubRouteStatus(route),
      scoreEligibility: route.scoreEligibility,
      selected: route.slug === selectedSlug,
    },
  };
}

function routeLineCollection(routes) {
  return {
    type: 'FeatureCollection',
    features: routes.map(routeLineFeature).filter(Boolean),
  };
}

function routeLabelCollection(routes) {
  return {
    type: 'FeatureCollection',
    features: routes
      .filter((route) => route.slug === selectedSlug)
      .map((route) => {
        const feature = routeLineFeature(route);
        const point = routeGeometryMidpoint(feature?.geometry);
        if (!point) return null;
        return {
          type: 'Feature',
          properties: {
            slug: route.slug,
            distanceLabel: route.distanceLabel || '',
          },
          geometry: {
            type: 'Point',
            coordinates: point,
          },
        };
      })
      .filter(Boolean),
  };
}

function flattenRouteGeometry(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'LineString') return [geometry.coordinates];
  if (geometry.type === 'MultiLineString') return geometry.coordinates;
  return [];
}

function boundsForRouteFeatures(maplibregl, routes) {
  const bounds = new maplibregl.LngLatBounds();
  let hasBounds = false;
  for (const route of routes) {
    const feature = routeLineFeature(route);
    for (const coordinate of flattenRouteGeometry(feature?.geometry).flat()) {
      if (!Array.isArray(coordinate) || coordinate.length < 2) continue;
      bounds.extend(coordinate);
      hasBounds = true;
    }
  }
  return hasBounds ? bounds : null;
}

function syncRouteLayers(routes) {
  if (!mapRuntime) return;
  const sourceId = 'river-group-trip-lines';
  const labelSourceId = 'river-group-trip-labels';
  const data = routeLineCollection(routes);
  const labelData = routeLabelCollection(routes);
  const hadSource = Boolean(mapRuntime.getSource(sourceId));
  syncGeoJsonOverlay(mapRuntime, {
    sourceId,
    data,
    layers: [{
      id: 'river-group-trip-lines-base',
      type: 'line',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': [
          'match',
          ['get', 'routeStatus'],
          'strong', '#267457',
          'good', '#28798a',
          'fair', '#a36b22',
          '#a84b3c',
        ],
        'line-width': 4,
        'line-opacity': 0.34,
      },
      filter: ['!=', ['get', 'routeStatus'], 'planning'],
    }, {
      id: 'river-group-trip-lines-planning',
      type: 'line',
      filter: ['==', ['get', 'routeStatus'], 'planning'],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#657782',
        'line-width': 4,
        'line-opacity': 0.72,
        'line-dasharray': [2, 1.5],
      },
    }, {
      id: 'river-group-trip-line-halo',
      type: 'line',
      filter: ['==', ['get', 'slug'], selectedSlug || ''],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'rgba(255, 255, 255, 0.96)',
        'line-width': 11,
        'line-opacity': 0.96,
      },
    }, {
      id: 'river-group-trip-line-selected',
      type: 'line',
      filter: ['all', ['==', ['get', 'slug'], selectedSlug || ''], ['!=', ['get', 'routeStatus'], 'planning']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#116b82',
        'line-width': 6,
        'line-opacity': 1,
      },
    }, {
      id: 'river-group-trip-line-selected-planning',
      type: 'line',
      filter: ['all', ['==', ['get', 'slug'], selectedSlug || ''], ['==', ['get', 'routeStatus'], 'planning']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#657782',
        'line-width': 6,
        'line-opacity': 1,
        'line-dasharray': [1.5, 1.2],
      },
    }],
  });
  syncGeoJsonOverlay(mapRuntime, {
    sourceId: labelSourceId,
    data: labelData,
    layers: [{
      id: 'river-group-trip-distance-selected',
      type: 'symbol',
      filter: ['==', ['get', 'slug'], selectedSlug || ''],
      layout: {
        'text-field': ['get', 'distanceLabel'],
        'text-font': ['Noto Sans Bold'],
        'text-size': 15,
        'text-padding': 4,
        'text-allow-overlap': true,
        'text-ignore-placement': true,
      },
      paint: {
        'text-color': '#0f5f74',
        'text-halo-color': 'rgba(255, 255, 255, 0.99)',
        'text-halo-width': 4,
      },
    }],
  });

  if (!hadSource) {
    const selectRouteAtEvent = (event) => {
      const slug = event.features?.[0]?.properties?.slug;
      if (!slug) return;
      selectPickerRoute(slug, { focusMap: false, reveal: 'list', scrollToSelection: true });
      const route = currentResult?.routes.find((candidate) => candidate.slug === slug);
      if (route && event.lngLat && maplibreRuntime) {
        new maplibreRuntime.Popup({ closeButton: true, closeOnClick: true, maxWidth: '288px' })
          .setLngLat(event.lngLat)
          .setHTML(routePopupMarkup(route))
          .addTo(mapRuntime);
      }
    };
    for (const layerId of ['river-group-trip-lines-base', 'river-group-trip-lines-planning']) {
      mapRuntime.on('click', layerId, selectRouteAtEvent);
      mapRuntime.on('mouseenter', layerId, () => {
        mapRuntime.getCanvas().style.cursor = 'pointer';
      });
      mapRuntime.on('mouseleave', layerId, () => {
        mapRuntime.getCanvas().style.cursor = '';
      });
    }
  }

  mapRuntime.setFilter('river-group-trip-line-halo', ['==', ['get', 'slug'], selectedSlug || '']);
  mapRuntime.setFilter('river-group-trip-line-selected', ['all', ['==', ['get', 'slug'], selectedSlug || ''], ['!=', ['get', 'routeStatus'], 'planning']]);
  mapRuntime.setFilter('river-group-trip-line-selected-planning', ['all', ['==', ['get', 'slug'], selectedSlug || ''], ['==', ['get', 'routeStatus'], 'planning']]);
  mapRuntime.setFilter('river-group-trip-distance-selected', ['==', ['get', 'slug'], selectedSlug || '']);
}

function endpointMarkerNode(label, detail, kind) {
  const node = document.createElement('span');
  node.className = `river-route-endpoint river-route-endpoint--${kind}`;
  node.textContent = label;
  node.title = detail;
  node.setAttribute('aria-label', detail);
  return node;
}

function mapNoticeMarkerNode(notice) {
  const node = document.createElement('span');
  node.className = `river-route-notice river-route-notice--${notice.kind}`;
  node.textContent = notice.label;
  node.title = notice.detail;
  node.setAttribute('aria-label', notice.detail);
  return node;
}

function mapNoticePopupMarkup(notice) {
  const title = notice.kind === 'gap'
    ? 'Route coverage gap'
    : notice.kind === 'lock'
      ? 'Lock and portage'
      : 'Required portage';
  return `
    <article class="score-map-popup river-route-notice-popup">
      <p class="score-map-popup__state">Mississippi River navigation</p>
      <h3>${escapeHtml(title)}</h3>
      <p class="score-map-popup__summary">${escapeHtml(notice.detail)}</p>
    </article>
  `;
}

function syncSelectedRouteEndpoints(route, routes, maplibregl) {
  mapMarkers = clearMapMarkers(mapMarkers);
  if (!route) return;

  const endpoints = [
    { point: accessCoordinate(route.putIn), label: 'IN', detail: `Put-in: ${route.putIn?.name || route.reach}`, kind: 'put-in' },
    { point: accessCoordinate(route.takeOut), label: 'OUT', detail: `Take-out: ${route.takeOut?.name || route.reach}`, kind: 'take-out' },
  ].filter((entry) => entry.point);

  for (const endpoint of endpoints) {
    const marker = createMapMarker({
      maplibregl,
      mapRuntime,
      element: endpointMarkerNode(endpoint.label, endpoint.detail, endpoint.kind),
      point: endpoint.point,
    });
    mapMarkers.push(marker);
  }

  for (const notice of riverHubMapNotices(riverId, routes)) {
    const markerNode = mapNoticeMarkerNode(notice);
    const marker = createMapMarker({
      maplibregl,
      mapRuntime,
      element: markerNode,
      point: notice.point,
      popupHtml: mapNoticePopupMarkup(notice),
      popupOptions: { maxWidth: '286px' },
      bindPopup: true,
    });
    markerNode.setAttribute('aria-label', notice.detail);
    mapMarkers.push(marker);
  }
}

function clearConditionScoreMarkers() {
  conditionScoreMarkers = clearMapMarkers(conditionScoreMarkers);
}

function conditionScorePopupMarkup(group) {
  const representative = group.representative;
  const routeCount = group.routes.length;
  const reachMarkup = routeCount === 1
    ? ''
    : `<p class="score-map-popup__reach">${escapeHtml(representative?.reach || 'Mapped river coverage')}</p>`;
  return `
    <article class="score-map-popup">
      <p class="score-map-popup__state">${escapeHtml(group.regions.join(', ') || representative?.region || 'River score zone')}</p>
      <h3>${escapeHtml(representative?.name || currentResult?.group?.name || 'River')}</h3>
      <div class="score-map-popup__scoreline">
        <span class="score-map-popup__scorebadge score-map-popup__scorebadge--${escapeHtml(ratingToneKey(group.rating))}">${escapeHtml(String(group.score ?? '--'))}</span>
        <p class="score-map-popup__verdict">${escapeHtml(scoreZoneRouteLabel(routeCount, representative))}</p>
      </div>
      ${reachMarkup}
      <button class="score-map-popup__link score-map-popup__link--button" type="button" data-score-zone-route="${escapeHtml(representative?.slug || '')}">Select this stretch</button>
    </article>
  `;
}

function syncConditionScoreMarkers(routes, maplibregl) {
  clearConditionScoreMarkers();
  if (!mapRuntime) return;

  for (const group of groupRoutesByConditionScore(routes)) {
    for (const route of group.routes) {
      const point = coverageAnchorForRoutes([route], routeGeometryBySlug);
      if (!point || group.score === null) continue;
      const routeGroup = {
        ...group,
        routes: [route],
        representative: route,
        regions: [...new Set([route.river?.region || route.region].filter(Boolean))],
      };

      const markerAriaLabel = `${routeGroup.representative?.name || 'River'}, ${routeGroup.regions.join(', ') || 'score zone'}: score ${routeGroup.score}, 1 route`;

      const marker = createBoardMapMarker({
        maplibregl,
        mapRuntime,
        item: routeGroup,
        point,
        markerClassFor: (mapGroup) =>
          `${markerClassForRating(mapGroup.rating, mapGroup.confidence?.label)} score-map-marker--condition-zone`,
        markerLabel: (mapGroup) => String(mapGroup.score),
        markerAriaLabel: () => markerAriaLabel,
        popupMarkup: conditionScorePopupMarkup,
        popupOptions: { maxWidth: '260px' },
        onClick: (mapGroup) => {
          const slug = mapGroup.representative?.slug;
          if (slug) selectPickerRoute(slug, { focusMap: false, reveal: 'list', scrollToSelection: true });
        },
      });
      marker.getPopup()?.on('open', () => {
        const button = marker.getPopup()?.getElement()?.querySelector('[data-score-zone-route]');
        if (button instanceof HTMLButtonElement && button.dataset.scoreZoneBound !== 'true') {
          button.dataset.scoreZoneBound = 'true';
          button.addEventListener('click', () => {
            const slug = button.dataset.scoreZoneRoute;
            if (slug) selectPickerRoute(slug, { focusMap: false, reveal: 'list', scrollToSelection: true });
          });
        }
      });
      conditionScoreMarkers.push(marker);
    }
  }
}

async function hydrateRouteGeometries(routes) {
  const pending = routes
    .filter((route) => !routeGeometryBySlug.has(route.slug))
    .sort((left, right) => Number(right.slug === selectedSlug) - Number(left.slug === selectedSlug));
  if (pending.length === 0) return;
  const version = ++routeGeometryLoadVersion;
  const batchSize = 6;

  for (let index = 0; index < pending.length; index += batchSize) {
    const batch = pending.slice(index, index + batchSize);
    await Promise.all(
      batch.map(async (route) => {
        try {
          const feature = await loadCanonicalRiverRouteLine(route.slug, routeSpanCoordinates(route));
          routeGeometryBySlug.set(route.slug, feature);
        } catch (error) {
          routeGeometryBySlug.set(route.slug, null);
          console.warn(`Canonical geometry unavailable for ${route.slug}.`, error);
        }
      })
    );

    if (version !== routeGeometryLoadVersion || !currentResult) return;
    if (index === 0 || index + batchSize >= pending.length) {
      renderGroupMap(visiblePickerRoutes(currentResult.routes), { preserveViewport: true });
    }
  }
}

async function renderGroupMap(routes, { preserveViewport = false, focusSelected = false } = {}) {
  if (!(groupMap instanceof HTMLElement)) {
    return;
  }

  const empty = routes.length === 0;
  if (pickerLayout instanceof HTMLElement) {
    pickerLayout.classList.toggle('river-route-picker__layout--empty', empty);
  }
  if (groupMapShell instanceof HTMLElement) {
    groupMapShell.classList.toggle('river-group-page__map-shell--empty', empty);
  }
  if (groupMapEmpty instanceof HTMLElement) {
    groupMapEmpty.hidden = !empty;
  }

  if (empty) {
    mapMarkers = clearMapMarkers(mapMarkers);
    clearConditionScoreMarkers();
    if (mapRuntime && mapReadyPromise) {
      try {
        await mapReadyPromise;
        syncRouteLayers([]);
        syncActualRiverLayer(mapRuntime, 'river-group-actual-river-line', [], {
          lineColor: '#4f8795',
          lineWidth: 3,
          lineOpacity: 0.18,
        });
      } catch {
        // The replacement panel remains useful even if the prior map failed.
      }
    }
    groupMapStatusController.empty();
    return;
  }

  groupMapStatusController.loading();

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl) {
      return;
    }

    if (!mapRuntime) {
      mapRuntime = createPaddleMap(maplibregl, {
        container: groupMap,
        center: [-92.5, 44.2],
        zoom: 8,
        minZoom: 5,
        maxZoom: 12,
      });
      mapReadyPromise = waitForMapReady(mapRuntime);
    }
    await mapReadyPromise;

    maplibreRuntime = maplibregl;
    const selectedRoute = routes.find((route) => route.slug === selectedSlug) ?? routes[0] ?? null;
    syncActualRiverLayer(mapRuntime, 'river-group-actual-river-line', selectedRoute ? [selectedRoute.name] : [], {
      lineColor: '#4f8795',
      lineWidth: 3,
      lineOpacity: 0.18,
    });
    syncRouteLayers(routes);
    syncSelectedRouteEndpoints(selectedRoute, routes, maplibregl);
    syncConditionScoreMarkers(routes.filter((route) => !isPlanningRoute(route)), maplibregl);

    const fitRoutes = focusSelected && selectedRoute ? [selectedRoute] : routes;
    const bounds = boundsForRouteFeatures(maplibregl, fitRoutes);
    if (bounds) {
      const compact = window.matchMedia('(max-width: 720px)').matches;
      fitMapBounds(mapRuntime, bounds, {
        profile: focusSelected ? 'riverGroupSelected' : 'riverGroupResults',
        compact,
        preserveViewport: preserveViewport && !focusSelected,
      });
    }
    mapRuntime.resize();

    groupMapStatusController.ready({
      message: routes.length === 1
        ? '1 route · mileage follows the mapped reach.'
        : `${routes.length} routes · ${groupRoutesByConditionScore(routes).length} score zones · select one to zoom.`,
    });
  } catch (error) {
    console.error('Failed to load river group map.', error);
    groupMapStatusController.unavailable();
  }
}

function setBanner(kind, title, detail) {
  if (!(banner instanceof HTMLElement)) return;
  banner.classList.remove('status-banner--loading', 'status-banner--live', 'status-banner--degraded', 'status-banner--offline');
  banner.classList.add(`status-banner--${kind}`);
  if (bannerTitle instanceof HTMLElement) {
    bannerTitle.textContent = title;
  }
  if (bannerDetail instanceof HTMLElement) {
    bannerDetail.textContent = detail;
  }
}

function setRefreshState(state, detail = '') {
  if (refreshButton instanceof HTMLButtonElement) {
    refreshButton.disabled = state === 'loading';
    refreshButton.textContent = state === 'loading' ? 'Refreshing...' : 'Refresh conditions';
  }

  if (refreshNote instanceof HTMLElement) {
    if (state === 'loading') {
      refreshNote.textContent = 'Refreshing grouped route scores.';
      return;
    }

    if (state === 'error') {
      refreshNote.textContent = detail || 'Last refresh failed.';
      return;
    }

    if (lastSuccessAt) {
      refreshNote.textContent = `Last refresh ${new Date(lastSuccessAt).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })}. Auto-refreshes every 5 minutes.`;
      return;
    }

    refreshNote.textContent = 'Auto-refreshes every 5 minutes.';
  }
}

function renderRouteList(routes) {
  if (!(routeList instanceof HTMLElement)) return;

  if (routes.length === 0) {
    routeList.innerHTML = `
      <div class="river-route-picker__empty">
        <strong>No trips match these filters.</strong>
        <span>Try another filter or return to all trips.</span>
        <button class="filter-chip" type="button" data-group-reset-filters>Show all trips</button>
      </div>
    `;
    const resetButton = routeList.querySelector('[data-group-reset-filters]');
    if (resetButton instanceof HTMLButtonElement) {
      resetButton.addEventListener('click', () => resetPickerFilters());
    }
    return;
  }

  routeList.innerHTML = routes
    .map((route) => {
      const active = route.slug === selectedSlug;
      const facts = pickerFacts(route)
        .filter(Boolean)
        .map((fact, factIndex) => `<span class="route-choice__fact${factIndex === 0 ? ' route-choice__fact--distance' : ''}">${escapeHtml(fact)}</span>`)
        .join('');
      const bestMatch = !isPlanningRoute(route) && sortMode === 'recommended'
        && distanceFilter === 'all'
        && regionFilter === 'all'
        && difficultyFilter === 'all'
        && campingFilter === 'all'
        && routeTypeFilter === 'all'
        && route.slug === currentResult?.routes[0]?.slug;
      const rowLabel = active
        ? '<span class="route-choice__on-map">On map</span>'
        : bestMatch
          ? `Best match today · ${escapeHtml(route.state)} · ${escapeHtml(route.region)}`
          : `${escapeHtml(route.state)} · ${escapeHtml(route.region)}`;

      return `
        <article
          class="route-choice${active ? ' route-choice--active' : ''}"
          data-group-route-card
          data-route-slug="${route.slug}"
        >
          ${favoriteButtonMarkup(route).replace('favorite-toggle--inline', 'favorite-toggle--inline route-choice__save')}
          <button
            class="route-choice__select"
            type="button"
            data-group-route-select
            aria-pressed="${active ? 'true' : 'false'}"
            aria-label="Show ${escapeHtml(route.reach)} on the map"
            data-analytics-event="corridor_trip_selected"
            data-analytics-route="${escapeHtml(route.slug)}"
            data-analytics-corridor="${escapeHtml(corridorKey(route))}"
            data-analytics-source="river_hub"
          >
            <span class="route-choice__copy">
              <span class="route-choice__eyebrow">${rowLabel}</span>
              <strong class="route-choice__title">${escapeHtml(route.reach)}</strong>
              <span class="route-choice__facts">${facts}</span>
            </span>
            ${isPlanningRoute(route)
              ? '<span class="route-choice__score-compact route-choice__score-compact--planning"><strong>—</strong><span>Planning route</span></span>'
              : `<span class="route-choice__score-compact route-choice__score-compact--${ratingToneKey(route.rating)}"><strong>${escapeHtml(String(route.score))}</strong><span>${escapeHtml(decisionLabel(route.rating, route.score))}</span></span>`}
          </button>
          <a class="river-link river-link--inline route-choice__details-link" href="/rivers/${encodeURIComponent(route.slug)}/">View route</a>
        </article>
      `;
    })
    .join('');

  for (const button of Array.from(routeList.querySelectorAll('[data-group-route-select]'))) {
    if (!(button instanceof HTMLButtonElement)) continue;
    button.addEventListener('click', () => {
      const card = button.closest('[data-group-route-card]');
      if (!(card instanceof HTMLElement) || !card.dataset.routeSlug) return;
      selectPickerRoute(card.dataset.routeSlug, { reveal: 'map' });
    });
  }
}

function nearbyPickerRoutes(route) {
  if (!currentResult || !route) return [];
  const origin = midpointForRoute(route);
  return currentResult.routes
    .filter((candidate) => candidate.slug !== route.slug)
    .map((candidate) => {
      const point = midpointForRoute(candidate);
      const distance = origin && point
        ? ((origin.longitude - point.longitude) ** 2) + ((origin.latitude - point.latitude) ** 2)
        : Number.POSITIVE_INFINITY;
      const relationship = candidate.conditionZoneId === route.conditionZoneId
        ? 0
        : candidate.region === route.region
          ? 1
          : 2;
      return { route: candidate, relationship, distance };
    })
    .sort((left, right) => left.relationship - right.relationship || left.distance - right.distance || compareRoutes(left.route, right.route))
    .slice(0, 2)
    .map((entry) => entry.route);
}

function renderSelectedSummary(route) {
  if (!(selectedSummary instanceof HTMLElement)) return;
  if (!route) {
    selectedSummary.innerHTML = `
      <div class="river-route-picker__selected-copy">
        <span class="eyebrow">No matching trip</span>
        <strong>Change a filter to continue</strong>
      </div>
    `;
    return;
  }
  const nearby = nearbyPickerRoutes(route);
  const nearbyMarkup = nearby.length > 0
    ? `
      <div class="river-route-picker__nearby">
        <span>Nearby trips</span>
        <div>
          ${nearby.map((candidate) => `
            <button type="button" data-group-nearby-route="${escapeHtml(candidate.slug)}">
              <span>${escapeHtml(candidate.reach)}</span>
              <strong>${escapeHtml(candidate.distanceLabel || '')}</strong>
            </button>
          `).join('')}
        </div>
      </div>
    `
    : '';

  selectedSummary.innerHTML = `
    <div class="river-route-picker__selected-copy">
      <span class="eyebrow">Your trip</span>
      <strong>${escapeHtml(route.reach)}</strong>
      <span>${escapeHtml(pickerFacts(route).join(BULLET))}</span>
    <small>${escapeHtml(isPlanningRoute(route) ? 'Planning route · verify local conditions before launching' : conditionsLine(route))}</small>
    </div>
    ${favoriteButtonMarkup(route).replace('favorite-toggle--inline', 'favorite-toggle--inline river-route-picker__selected-save')}
    ${isPlanningRoute(route)
      ? '<div class="river-route-picker__selected-decision river-route-picker__selected-decision--planning"><strong>—</strong><span>Planning route · not scored</span></div>'
      : `<div class="river-route-picker__selected-decision river-route-picker__selected-decision--${ratingToneKey(route.rating)}"><strong>${escapeHtml(String(route.score))}</strong><span>${escapeHtml(decisionLabel(route.rating, route.score))}</span></div>`}
    <div class="river-route-picker__selected-actions">
      <a class="river-link river-link--inline" href="/rivers/${encodeURIComponent(route.slug)}/">View route details</a>
    </div>
    ${nearbyMarkup}
  `;

  for (const button of Array.from(selectedSummary.querySelectorAll('[data-group-nearby-route]'))) {
    if (!(button instanceof HTMLButtonElement)) continue;
    button.addEventListener('click', () => {
      const slug = button.dataset.groupNearbyRoute;
      if (slug) selectPickerRoute(slug);
    });
  }
  refreshFavoriteButtons(selectedSummary);
}

function setFilterFieldVisibility(name, visible) {
  const field = root.querySelector(`[data-group-filter-field="${name}"]`);
  if (field instanceof HTMLElement) {
    field.hidden = !visible;
  }
}

function renderRegionFilters(routes) {
  if (!(regionFilterSelect instanceof HTMLSelectElement)) return;
  const regions = adaptiveFilterOptions?.regions
    ?? [...new Set(routes.map((route) => route.region).filter(Boolean))].sort();
  regionFilterSelect.innerHTML = ['<option value="all">All areas</option>', ...regions.map((region) => `<option value="${escapeHtml(region)}">${escapeHtml(region)}</option>`)].join('');
  availableFilters.region = adaptiveFilterOptions?.availability.region ?? regions.length > 1;
  if (!availableFilters.region || (regionFilter !== 'all' && !regions.includes(regionFilter))) {
    regionFilter = 'all';
  }
  setFilterFieldVisibility('region', availableFilters.region);
}

function renderDifficultyFilters(routes) {
  if (!(difficultyFilterSelect instanceof HTMLSelectElement)) return;
  const difficulties = adaptiveFilterOptions?.difficulties
    ?? [...new Set(routes.map((route) => difficultyKey(route.difficulty)).filter(Boolean))];
  difficultyFilterSelect.innerHTML = [
    '<option value="all">Any difficulty</option>',
    ...difficulties.map((difficulty) => {
      const label = `${difficulty.slice(0, 1).toUpperCase()}${difficulty.slice(1)}`;
      return `<option value="${escapeHtml(difficulty)}">${escapeHtml(label)}</option>`;
    }),
  ].join('');
  availableFilters.difficulty = adaptiveFilterOptions?.availability.difficulty ?? difficulties.length > 1;
  if (!availableFilters.difficulty || (difficultyFilter !== 'all' && !difficulties.includes(difficultyFilter))) {
    difficultyFilter = 'all';
  }
  setFilterFieldVisibility('difficulty', availableFilters.difficulty);
}

function renderCampingFilters(routes) {
  if (!(campingFilterSelect instanceof HTMLSelectElement)) return;
  const options = adaptiveFilterOptions?.camping ?? [...new Set(routes.map((route) => (
    route.campingClassification && route.campingClassification !== 'none' ? 'available' : 'none'
  )))];
  availableFilters.camping = adaptiveFilterOptions?.availability.camping ?? options.length > 1;
  if (!availableFilters.camping || (campingFilter !== 'all' && !options.includes(campingFilter))) {
    campingFilter = 'all';
  }
  campingFilterSelect.innerHTML = [
    '<option value="all">Any camping</option>',
    ...(options.includes('available') ? ['<option value="available">Camping available</option>'] : []),
    ...(options.includes('none') ? ['<option value="none">No camping</option>'] : []),
  ].join('');
  setFilterFieldVisibility('camping', availableFilters.camping);
}

function renderRouteTypeFilters(routes) {
  if (!(routeTypeFilterSelect instanceof HTMLSelectElement)) return;
  const routeTypes = adaptiveFilterOptions?.routeTypes
    ?? [...new Set(routes.map((route) => route.routeType).filter(Boolean))].sort();
  availableFilters.routeType = adaptiveFilterOptions?.availability.routeType ?? false;
  if (!availableFilters.routeType || (routeTypeFilter !== 'all' && !routeTypes.includes(routeTypeFilter))) {
    routeTypeFilter = 'all';
  }
  const labels = {
    recreational: 'Recreation',
    whitewater: 'Whitewater',
  };
  routeTypeFilterSelect.innerHTML = [
    '<option value="all">All types</option>',
    ...routeTypes.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(labels[type] || type)}</option>`),
  ].join('');
  setFilterFieldVisibility('route-type', availableFilters.routeType);
}

function updateMoreFiltersVisibility() {
  const hasAdaptiveFilters = Object.values(availableFilters).some(Boolean);
  if (moreFilters instanceof HTMLDetailsElement) {
    moreFilters.hidden = !hasAdaptiveFilters;
    if (!hasAdaptiveFilters) {
      moreFilters.open = false;
    }
  }
}

for (const [select, onChange] of [
  [regionFilterSelect, (value) => { regionFilter = value; }],
  [difficultyFilterSelect, (value) => { difficultyFilter = value; }],
  [campingFilterSelect, (value) => { campingFilter = value; }],
  [routeTypeFilterSelect, (value) => { routeTypeFilter = value; }],
]) {
  if (!(select instanceof HTMLSelectElement)) continue;
  select.addEventListener('change', () => {
    onChange(select.value || 'all');
    renderPicker({ fitMap: true });
  });
}

function updatePickerControls(visibleCount, totalCount) {
  for (const button of distanceFilterButtons) {
    if (!(button instanceof HTMLButtonElement)) continue;
    const active = button.dataset.groupDistanceFilter === distanceFilter;
    button.classList.toggle('filter-chip--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }

  if (regionFilterSelect instanceof HTMLSelectElement) regionFilterSelect.value = regionFilter;
  if (difficultyFilterSelect instanceof HTMLSelectElement) difficultyFilterSelect.value = difficultyFilter;
  if (campingFilterSelect instanceof HTMLSelectElement) campingFilterSelect.value = campingFilter;
  if (routeTypeFilterSelect instanceof HTMLSelectElement) routeTypeFilterSelect.value = routeTypeFilter;
  if (sortSelect instanceof HTMLSelectElement) sortSelect.value = sortMode;

  const advancedCount = activeAdvancedFilterTotal();
  const totalActive = activeFilterTotal();
  if (activeFilterCount instanceof HTMLElement) {
    activeFilterCount.textContent = String(advancedCount);
    activeFilterCount.hidden = advancedCount === 0;
  }
  if (moreFilters instanceof HTMLElement) {
    moreFilters.classList.toggle('river-route-picker__more-filters--active', advancedCount > 0);
  }
  if (clearFiltersButton instanceof HTMLButtonElement) {
    clearFiltersButton.hidden = totalActive === 0;
  }
  for (const countNode of mobileCountNodes) {
    if (countNode instanceof HTMLElement) {
      countNode.textContent = String(visibleCount);
      countNode.hidden = visibleCount === 0;
    }
  }

  if (resultsSummary instanceof HTMLElement) {
    const filterLabels = {
      all: 'all distances',
      short: 'under 5 miles',
      medium: 'from 5 to 10 miles',
      long: '10 miles or longer',
    };
    const areaLabel = regionFilter === 'all' ? 'all areas' : regionFilter;
    const difficultyLabelText = difficultyFilter === 'all'
      ? 'any difficulty'
      : `${difficultyFilter.slice(0, 1).toUpperCase()}${difficultyFilter.slice(1)}`;
    const sortLabel = sortMode === 'recommended'
      ? 'ranked by today’s conditions'
      : sortMode === 'shortest'
        ? 'shortest first'
        : sortMode === 'longest'
          ? 'longest first'
          : sortMode === 'easiest'
            ? 'easiest first'
            : 'highest confidence';
    const campingLabel = campingFilter === 'all' ? '' : campingFilter === 'available' ? 'camping available' : 'no camping';
    const routeTypeLabel = routeTypeFilter === 'all' ? '' : routeTypeFilter === 'recreational' ? 'recreation' : 'whitewater';
    const secondaryLabels = [
      difficultyFilter === 'all' ? '' : difficultyLabelText,
      regionFilter === 'all' ? '' : areaLabel,
      campingLabel,
      routeTypeLabel,
    ].filter(Boolean);
    resultsSummary.textContent = [
      `Showing ${visibleCount} of ${totalCount} trips`,
      filterLabels[distanceFilter],
      ...secondaryLabels,
      sortLabel,
    ].join(BULLET) + '.';
  }
}

function renderPicker({ fitMap = false, focusSelected = false } = {}) {
  if (!currentResult) return;
  const routes = visiblePickerRoutes(currentResult.routes);
  if (!routes.some((route) => route.slug === selectedSlug)) {
    selectedSlug = routes[0]?.slug || null;
  }
  renderRouteList(routes);
  renderSelectedSummary(routes.find((route) => route.slug === selectedSlug) || routes[0]);
  updatePickerControls(routes.length, currentResult.routes.length);
  renderGroupMap(routes, { preserveViewport: !fitMap, focusSelected });
  syncPickerUrl();
}

function selectPickerRoute(slug, { focusMap = true, reveal = null, scrollToSelection = false } = {}) {
  if (!currentResult) return;
  const selectedRoute = currentResult.routes.find((route) => route.slug === slug);
  if (!selectedRoute) return;
  selectedSlug = slug;
  if (!routeMatchesDistanceFilter(selectedRoute)) distanceFilter = 'all';
  if (!routeMatchesRegionFilter(selectedRoute)) regionFilter = 'all';
  if (!routeMatchesDifficultyFilter(selectedRoute)) difficultyFilter = 'all';
  if (!routeMatchesCampingFilter(selectedRoute)) campingFilter = 'all';
  if (!routeMatchesTypeFilter(selectedRoute)) routeTypeFilter = 'all';
  const routes = visiblePickerRoutes(currentResult.routes);
  renderRouteList(routes);
  renderSelectedSummary(selectedRoute);
  updatePickerControls(routes.length, currentResult.routes.length);
  renderGroupMap(routes, { preserveViewport: !focusMap, focusSelected: focusMap });
  if (reveal) {
    setMobileView(reveal);
  } else {
    syncPickerUrl();
  }
  if (scrollToSelection && phoneBreakpoint.matches) {
    window.setTimeout(() => {
      routeList?.querySelector(`[data-route-slug="${CSS.escape(slug)}"]`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 40);
  }
}

function normalizeRoutes(routes) {
  return routes.map((route) => ({
    slug: route.river.slug,
    riverId: route.river.riverId,
    scoreEligibility: route.river.scoreEligibility,
    scoreEligibilityReason: route.river.scoreEligibilityReason,
    conditionZoneId: route.river.conditionZoneId,
    corridorId: route.river.corridorId,
    corridorLabel: route.river.corridorLabel,
    continuityStatus: route.river.continuityStatus,
    name: route.river.name,
    reach: route.river.reach,
    state: route.river.state,
    region: route.river.region,
    latitude: route.river.latitude,
    longitude: route.river.longitude,
    distanceLabel: route.river.distanceLabel,
    estimatedPaddleTime: route.river.estimatedPaddleTime,
    difficulty: route.river.profile.difficulty,
    routeType: route.river.routeType,
    campingClassification: route.river.logistics?.campingClassification,
    gaugeUnit: route.river.gaugeSource?.unit,
    score: route.score,
    rating: route.rating,
    gaugeBand: route.gaugeBand,
    gaugeBandLabel: route.gaugeBandLabel,
    confidence: route.confidence,
    liveData: route.liveData,
    putIn: route.river.putIn,
    takeOut: route.river.takeOut,
    accessPoints: route.river.accessPoints,
    segmentEdges: route.river.segmentEdges,
    gauge: route.gauge,
    weather: route.weather,
  }));
}

async function loadGroup({ silent = false } = {}) {
  const { requestId, controller } = groupRequestGuard.begin();

  if (!silent) {
    setRefreshState('loading');
  }

  try {
    const payload = await getBrowserApiClient().getRiverGroup(riverId, {
      cache: 'no-store',
      signal: controller.signal,
    });
    const result = payload?.result;
    const routes = Array.isArray(result?.routes) ? normalizeRoutes(result.routes).sort(compareRoutes) : [];
    if (!groupRequestGuard.isCurrent(requestId)) {
      return;
    }

    if (!routes.length) {
      throw new Error(`River group ${riverId} returned no routes.`);
    }

    currentResult = {
      group: result.group,
      routes,
    };

    if (!riverHubViewTracked) {
      riverHubViewTracked = true;
      trackEvent('river_hub_viewed', {
        river_id: riverId,
        trip_option_count: routes.length,
      });
    }

    if (!selectedSlug || !routes.some((route) => route.slug === selectedSlug)) {
      selectedSlug = routes[0].slug;
    }

    adaptiveFilterOptions = riverHubFilterOptions(routes);
    renderRegionFilters(routes);
    renderDifficultyFilters(routes);
    renderCampingFilters(routes);
    renderRouteTypeFilters(routes);
    updateMoreFiltersVisibility();
    setMobileView(mobileView, { persist: false });
    renderPicker({ fitMap: true, focusSelected: Boolean(initialSelectedSlug) });
    hydrateRouteGeometries(routes);

    const scoredRoutes = routes.filter((route) => !isPlanningRoute(route));
    const planningCount = routes.length - scoredRoutes.length;
    const liveCount = scoredRoutes.filter((route) => route.liveData?.overall === 'live').length;
    const readyCount = scoredRoutes.filter((route) => route.rating === 'Strong' || route.rating === 'Good').length;
    setBanner(
      liveCount === routes.length ? 'live' : 'degraded',
      planningCount > 0 ? `${readyCount} scored routes ready today · ${planningCount} planning routes` : `${readyCount} of ${routes.length} routes look ready today.`,
      planningCount > 0
        ? 'Planning routes have access details but are not included in same-day scoring.'
        : liveCount === routes.length
          ? 'Gauge and weather reads are current enough to compare.'
          : 'At least one route is using stale or partial reads. Open the route page before you drive.'
    );

    lastSuccessAt = Date.now();
    setRefreshState('ready');
  } catch (error) {
    if (isAbortError(error)) {
      return;
    }

    if (!groupRequestGuard.isCurrent(requestId)) {
      return;
    }
    console.error('Failed to load river group page.', error);
    setBanner(
      'offline',
      'Route comparison is unavailable right now.',
      'Open an individual route page if you need direct live route data right now.'
    );
    setRefreshState('error', 'Last refresh failed. Retry now.');
  } finally {
    groupRequestGuard.finish(controller);
  }
}

if (refreshButton instanceof HTMLButtonElement) {
  refreshButton.addEventListener('click', () => {
    loadGroup();
  });
}

for (const button of distanceFilterButtons) {
  if (!(button instanceof HTMLButtonElement)) continue;
  button.addEventListener('click', () => {
    distanceFilter = button.dataset.groupDistanceFilter || 'all';
    renderPicker({ fitMap: true });
  });
}

if (sortSelect instanceof HTMLSelectElement) {
  sortSelect.addEventListener('change', () => {
    sortMode = sortSelect.value || 'recommended';
    renderPicker();
  });
}

if (clearFiltersButton instanceof HTMLButtonElement) {
  clearFiltersButton.addEventListener('click', () => resetPickerFilters());
}

if (groupMapEmptyReset instanceof HTMLButtonElement) {
  groupMapEmptyReset.addEventListener('click', () => {
    resetPickerFilters();
    setMobileView('list');
  });
}

for (const button of mobileViewButtons) {
  if (!(button instanceof HTMLButtonElement)) continue;
  button.addEventListener('click', () => {
    setMobileView(button.dataset.groupMobileView);
  });
}

if (groupMapToggle instanceof HTMLButtonElement) {
  groupMapToggle.addEventListener('click', () => {
    groupMapCollapsed = !groupMapCollapsed;
    updateGroupMapToggle();
  });
}

phoneBreakpoint.addEventListener('change', () => {
  updateGroupMapToggle();
  setMobileView(mobileView);
});

bindFavoriteButtons(document);
updateGroupMapToggle();
setMobileView(mobileView, { persist: false });
loadGroup();
window.setInterval(() => {
  if (!document.hidden) {
    loadGroup({ silent: true });
  }
}, AUTO_REFRESH_MS);
