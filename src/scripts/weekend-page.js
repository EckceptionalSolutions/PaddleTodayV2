import {
  bindMarkerPopup,
  clearMapMarkers,
  createMapMarker,
  createMapStatusController,
  createPaddleMap,
  ensureMapLibre,
  escapeHtml,
  fitMapBounds,
  markerClassForRating,
  syncGeoJsonOverlay,
  waitForMapReady,
} from './map-runtime.js';
import { freshnessLabel, readCachedPayload, writeCachedPayload } from './client-cache.js';
import { bindFavoriteButtons, decorateFavoriteButton, refreshFavoriteButtons } from './favorites-ui.js';
import {
  callDisplayLabel,
  confidenceDisplayLabel,
  conditionTierDisplayLabel,
  ratingDisplayLabel,
} from './ui-taxonomy.js';
import { createRequestGuard, isAbortError } from './request-guard.js';
import { createBoardLocationService } from './board-location-service.js';
import { formatRouteSegmentLabel, routeSegmentSummary } from '../lib/route-segments.ts';
import { loadCanonicalRiverRouteLine } from '../lib/canonical-river-geometries.js';
import {
  buildWeekendPlan,
  DEFAULT_WEEKEND_DISTANCE_LIMIT,
  parseWeekendDistanceLimit,
  weekendFilterLabel,
  weekendRouteMapPoints,
} from '../lib/weekend-planning.ts';
import { ratingToneKey } from '@paddletoday/api-contract';
import { getBrowserApiClient } from './browser-api-client.js';

const AUTO_REFRESH_MS = 5 * 60 * 1000;
const WEEKEND_CACHE_KEY = 'weekend-summary:v1';
const WEEKEND_DISTANCE_STORAGE_KEY = 'paddletoday:weekend-distance-limit:v1';
const LOCATION_STORAGE_KEY = 'paddletoday:user-location';
const FALLBACK_ROUTE_PHOTOS = [
  {
    src: '/gallery/fallbacks/river-fallback-stream.jpg',
    alt: 'A representative river scene used as a placeholder until a route photo is available.',
  },
  {
    src: '/gallery/fallbacks/river-fallback-wide.jpg',
    alt: 'A representative wide river scene used as a placeholder until a route photo is available.',
  },
];

const snapshotLine = document.querySelector('[data-weekend-snapshot]');
const weekendDates = document.querySelector('[data-weekend-dates]');
const homeFreshness = document.querySelector('[data-home-freshness]');
const homeFreshnessWrap = document.querySelector('[data-home-freshness-wrap]');
const cardTemplate = document.querySelector('[data-river-card-template]');
const weekendGrid = document.querySelector('[data-weekend-grid]');
const weekendEmpty = document.querySelector('[data-weekend-empty]');
const weekendEmptyTitle = document.querySelector('[data-weekend-empty-title]');
const weekendEmptyCopy = document.querySelector('[data-weekend-empty-copy]');
const weekendWatchSection = document.querySelector('[data-weekend-watch-section]');
const weekendWatchGrid = document.querySelector('[data-weekend-watch-grid]');
const weekendWatchEmpty = document.querySelector('[data-weekend-watch-empty]');
const weekendPrimarySection = document.querySelector('[data-weekend-primary-section]');
const weekendPrimaryTitle = document.querySelector('[data-weekend-primary-title]');
const weekendPrimaryNote = document.querySelector('[data-weekend-primary-note]');
const weekendCampingSection = document.querySelector('[data-weekend-camping-section]');
const weekendCampingGrid = document.querySelector('[data-weekend-camping-grid]');
const weekendCampingEmpty = document.querySelector('[data-weekend-camping-empty]');
const weekendFilterSummary = document.querySelector('[data-weekend-filter-summary]');
const weekendPlanner = document.querySelector('.weekend-planner');
const weekendFilterButtons = Array.from(document.querySelectorAll('[data-weekend-filter]'));
const weekendFilterCountNodes = Array.from(document.querySelectorAll('[data-weekend-filter-count]'));
const weekendDistance = document.querySelector('[data-weekend-distance]');
const weekendDistanceButtons = Array.from(document.querySelectorAll('[data-weekend-distance-option]'));
const weekendLocationLabel = document.querySelector('[data-weekend-location-label]');
const weekendLocationHint = document.querySelector('[data-weekend-location-hint]');
const weekendLocationUse = document.querySelector('[data-weekend-location-use]');
const weekendLocationClear = document.querySelector('[data-weekend-location-clear]');
const weekendMapSection = document.querySelector('[data-weekend-map-section]');
const weekendMap = document.querySelector('[data-summary-map]');
const weekendMapStatus = document.querySelector('[data-summary-map-status]');
const weekendMapShell = document.querySelector('[data-summary-map-shell]');
const weekendResults = document.querySelector('[data-summary-map-results]');
const weekendResultsTitle = document.querySelector('[data-summary-map-results-title]');
const weekendResultsNote = document.querySelector('[data-summary-map-results-note]');
const weekendMobileSwitch = document.querySelector('[data-summary-map-mobile-switch]');
const weekendMobileViewButtons = Array.from(document.querySelectorAll('[data-summary-map-mobile-view]'));
const weekendMobileCountNodes = Array.from(document.querySelectorAll('[data-summary-map-mobile-count]'));
const weekendMapEmpty = document.querySelector('[data-weekend-map-empty]');
const weekendMapEmptyTitle = document.querySelector('[data-weekend-map-empty-title]');
const weekendMapEmptyCopy = document.querySelector('[data-weekend-map-empty-copy]');
const weekendMapEmptyReset = document.querySelector('[data-weekend-map-empty-reset]');
const weekendMapStatusController = createMapStatusController(weekendMapStatus, {
  loading: 'Loading filtered weekend routes.',
  empty: 'No routes match the selected filters.',
  unavailable: 'Map unavailable right now. Use the route lists below.',
  ready: ({ count, label }) =>
    `${count} ${label} ${count === 1 ? 'route' : 'routes'} shown. Select a score to open the route.`,
});
let weekendMobileView = 'list';
let selectedWeekendMapKey = null;
let weekendMapMarkersByKey = new Map();

const featuredPanel = document.querySelector('.weekend-hero__featured');
const featuredLabel = document.querySelector('[data-weekend-featured-label]');
const featuredState = document.querySelector('[data-weekend-featured-state]');
const featuredName = document.querySelector('[data-weekend-featured-name]');
const featuredReach = document.querySelector('[data-weekend-featured-reach]');
const featuredVerdict = document.querySelector('[data-weekend-featured-verdict]');
const featuredScore = document.querySelector('[data-weekend-featured-score]');
const featuredRating = document.querySelector('[data-weekend-featured-rating]');
const featuredConfidence = document.querySelector('[data-weekend-featured-confidence]');
const featuredCurrent = document.querySelector('[data-weekend-featured-current]');
const featuredWeather = document.querySelector('[data-weekend-featured-weather]');
const featuredReason = document.querySelector('[data-weekend-featured-reason]');
const featuredSignal = document.querySelector('[data-weekend-featured-signal]');
const featuredReasons = document.querySelector('[data-weekend-featured-reasons]');
const featuredExplanation = document.querySelector('[data-weekend-featured-explanation]');
const featuredToggle = document.querySelector('[data-weekend-featured-toggle]');
const featuredLink = document.querySelector('[data-weekend-featured-link]');
const featuredFactsSection = document.querySelector('[data-weekend-featured-facts-section]');
const featuredFacts = document.querySelector('[data-weekend-featured-facts]');
const featuredGallery = document.querySelector('[data-weekend-featured-gallery]');
const featuredGalleryImage = document.querySelector('[data-weekend-featured-gallery-image]');
const featuredGalleryPlaceholder = document.querySelector('[data-weekend-featured-gallery-placeholder]');
const featuredGalleryContribute = document.querySelector('[data-weekend-featured-gallery-contribute]');

const strongCount = document.querySelector('[data-weekend-strong-count]');
const goodCount = document.querySelector('[data-weekend-good-count]');
const fairCount = document.querySelector('[data-weekend-fair-count]');
const withheldCount = document.querySelector('[data-weekend-withheld-count]');

let lastGeneratedAt = null;
let latestWeekendItems = [];
let latestWeekendPayload = null;
let selectedWeekendFilter = 'all';
let selectedWeekendDistance = loadStoredWeekendDistance();
let userLocation = loadStoredWeekendLocation();
let weekendMapRuntime = null;
let weekendMapMarkers = [];
let weekendMapRenderVersion = 0;
const weekendRequestGuard = createRequestGuard();
const weekendLocationService = createBoardLocationService({
  fetchImpl: (...args) => fetch(...args),
  chooseCandidate: (candidates) => candidates[0],
});

function splitWeekendItems(items) {
  return {
    bestBets: items.filter((item) => item.weekend.rating === 'Strong' || item.weekend.rating === 'Good'),
    worthWatching: items.filter((item) => item.weekend.rating === 'Fair'),
  };
}

function loadStoredWeekendLocation() {
  try {
    const raw = window.localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (
      parsed
      && Number.isFinite(parsed.latitude)
      && Number.isFinite(parsed.longitude)
      && typeof parsed.label === 'string'
    ) {
      return parsed;
    }
  } catch (error) {
    console.warn('Failed to load the saved weekend location.', error);
  }

  return null;
}

function loadStoredWeekendDistance() {
  try {
    const parsed = parseWeekendDistanceLimit(
      window.localStorage.getItem(WEEKEND_DISTANCE_STORAGE_KEY),
    );
    return parsed === undefined ? DEFAULT_WEEKEND_DISTANCE_LIMIT : parsed;
  } catch (error) {
    console.warn('Failed to load the saved weekend range.', error);
    return DEFAULT_WEEKEND_DISTANCE_LIMIT;
  }
}

function saveWeekendLocation(location) {
  try {
    if (location) {
      window.localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
    } else {
      window.localStorage.removeItem(LOCATION_STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to save the weekend location.', error);
  }
}

function saveWeekendDistance(distance) {
  try {
    window.localStorage.setItem(WEEKEND_DISTANCE_STORAGE_KEY, JSON.stringify(distance));
  } catch (error) {
    console.warn('Failed to save the weekend range.', error);
  }
}

function weekendDistanceLabel(distance = selectedWeekendDistance) {
  return distance === null ? 'all distances' : `${distance} miles`;
}

function updateWeekendControls(plan) {
  if (weekendPlanner instanceof HTMLElement) {
    weekendPlanner.hidden = !latestWeekendPayload;
  }
  if (weekendPlanner instanceof HTMLElement) {
    weekendPlanner.classList.toggle('weekend-planner--without-location', !userLocation);
  }
  if (weekendLocationLabel instanceof HTMLElement) {
    weekendLocationLabel.textContent = userLocation
      ? `Planning from ${userLocation.label}`
      : 'Plan from your location';
  }
  if (weekendLocationHint instanceof HTMLElement) {
    weekendLocationHint.textContent = userLocation
      ? 'Drive time is included in the weekend ranking.'
      : 'Use your location to include drive time in the weekend ranking.';
  }
  if (weekendLocationUse instanceof HTMLButtonElement) {
    weekendLocationUse.hidden = Boolean(userLocation);
    weekendLocationUse.disabled = false;
    weekendLocationUse.textContent = 'Use my location';
  }
  if (weekendLocationClear instanceof HTMLButtonElement) {
    weekendLocationClear.hidden = !userLocation;
  }
  if (weekendDistance instanceof HTMLElement) {
    weekendDistance.hidden = !userLocation;
  }

  for (const button of weekendDistanceButtons) {
    if (!(button instanceof HTMLButtonElement)) {
      continue;
    }
    const value = button.dataset.weekendDistanceOption === 'any'
      ? null
      : Number(button.dataset.weekendDistanceOption);
    const active = value === selectedWeekendDistance;
    button.classList.toggle('filter-chip--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }

  const counts = {
    all: new Set(
      [...plan.dayTrips, ...plan.campingRoutes, ...plan.rechecks]
        .map((route) => route.river.slug),
    ).size,
    'day-trips': plan.dayTrips.length,
    camping: plan.campingRoutes.length,
    rechecks: plan.rechecks.length,
  };
  for (const node of weekendFilterCountNodes) {
    if (!(node instanceof HTMLElement)) {
      continue;
    }
    node.textContent = String(counts[node.dataset.weekendFilterCount] ?? 0);
  }
  for (const button of weekendFilterButtons) {
    if (!(button instanceof HTMLButtonElement)) {
      continue;
    }
    const active = button.dataset.weekendFilter === selectedWeekendFilter;
    button.classList.toggle('weekend-plan-lane--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }

  if (weekendFilterSummary instanceof HTMLElement) {
    const routeCount = plan.mapRoutes.length;
    const scoredCount = plan.inRangeRoutes.length;
    const typeLabel = weekendFilterLabel(selectedWeekendFilter);
    const rangeLabel = userLocation ? ` within ${weekendDistanceLabel()}` : '';
    weekendFilterSummary.textContent = routeCount > 0
      ? `Showing ${routeCount} curated ${typeLabel} ${routeCount === 1 ? 'route' : 'routes'}${scoredCount > routeCount ? ` from ${scoredCount} board routes` : ''}${rangeLabel}.`
      : `No ${typeLabel} routes match${rangeLabel || ' right now'}.`;
  }
}

function setText(node, value) {
  if (node instanceof HTMLElement) {
    node.textContent = value;
  }
}

function splitBulletParts(text) {
  if (typeof text !== 'string') {
    return [];
  }

  return text
    .split(/\s+(?:\u2022|\/)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseWeekendSignalLine(rawSignal) {
  if (typeof rawSignal !== 'string' || !rawSignal.trim()) {
    return [];
  }

  return splitBulletParts(rawSignal)
    .map((part) => {
      if (/^Gauge:/i.test(part)) {
        return { kind: 'gauge', value: part.replace(/^Gauge:\s*/i, '') };
      }
      if (/^Wind:/i.test(part)) {
        return { kind: 'wind', value: part.replace(/^Wind:\s*/i, '') };
      }
      if (/^Temps?:/i.test(part)) {
        return { kind: 'temp', value: part.replace(/^Temps?:\s*/i, '') };
      }
      if (/^High:/i.test(part)) {
        return { kind: 'temp', value: part.replace(/^High:\s*/i, '') };
      }
      if (/^Low:/i.test(part)) {
        return { kind: 'temp', value: part.replace(/^Low:\s*/i, '') };
      }
      return null;
    })
    .filter(Boolean);
}

function parseWeekendTemperature(rawSignal) {
  const match =
    typeof rawSignal === 'string'
      ? rawSignal.match(/Temps?:\s*(-?\d+)(?:\u00B0)?(?:\s*-\s*|-)(-?\d+)(?:\u00B0)?F/i) ||
        rawSignal.match(/High:\s*(-?\d+)(?:\u00B0)?F/i) ||
        rawSignal.match(/Low:\s*(-?\d+)(?:\u00B0)?F/i)
      : null;
  if (!match) {
    return null;
  }

  const values = match.slice(1).filter(Boolean).map((value) => Number.parseInt(value, 10)).filter(Number.isFinite);
  if (values.length === 0) {
    return null;
  }

  return Math.min(...values);
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

function weekendSignalRowMarkup(item) {
  const items = parseWeekendSignalLine(item?.weekend?.signalLine);
  if (items.length === 0) {
    return '<span class="river-card__signal-empty">Weekend forecast still settling.</span>';
  }

  return items
    .map(
      (entry) => `
        <span class="river-card__signal-item">
          <span class="river-card__signal-icon river-card__signal-icon--${entry.kind}">
            ${signalIconMarkup(entry.kind)}
          </span>
          <span>${escapeHtml(entry.value)}</span>
        </span>
      `
    )
    .join('');
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

function weekendWeatherVisualState(item) {
  const combined = `${item?.weekend?.summary || ''} ${item?.weekend?.explanation || ''} ${item?.weekend?.signalLine || ''}`.toLowerCase();
  const temperature = parseWeekendTemperature(item?.weekend?.signalLine);
  const coldSevere = typeof temperature === 'number' && temperature <= 35;
  const coldNoticeable = typeof temperature === 'number' && temperature <= 40;

  if (combined.includes('storm')) {
    return 'storm';
  }
  if (coldSevere) {
    return 'cold';
  }
  if (combined.includes('rain')) {
    return 'rain';
  }
  if (coldNoticeable) {
    return 'cold';
  }
  if (combined.includes('wind')) {
    return 'wind';
  }
  return 'calm';
}

function weekendWeatherBadgeMarkup(item) {
  const state = weekendWeatherVisualState(item);
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

function weekendVerdict(item) {
  return callDisplayLabel(item.weekend.rating, { context: 'weekend' });
}

function regionStateText(item) {
  return `${item.river.state} \u2022 ${item.river.region}`.toUpperCase();
}

function difficultyLabel(item) {
  const difficulty = item?.river?.difficulty;
  if (!difficulty) {
    return '';
  }

  return `${String(difficulty).slice(0, 1).toUpperCase()}${String(difficulty).slice(1)} difficulty`;
}

function campingFactLabel(item) {
  const classification = item?.river?.logistics?.campingClassification;
  if (classification === 'nearby_basecamp') return 'Camp nearby';
  if (classification === 'endpoint_campground') return 'Campground access';
  if (classification === 'sandbar_or_gravel_bar') return 'Sandbar camping';
  if (classification === 'on_route_campsite' || classification === 'overnight_capable') return 'Overnight-friendly';
  return '';
}

function favoriteRecord(item) {
  if (!item?.river?.slug) {
    return null;
  }

  return {
    slug: item.river.slug,
    name: item.river.name,
    reach: item.river.reach,
    state: item.river.state,
    region: item.river.region,
    url: `/rivers/${encodeURIComponent(item.river.slug)}/`,
  };
}

function weekendMetaText(item) {
  const parts = [
    item.travelLabel,
    confidenceDisplayLabel(item.weekend.confidence),
    `Today: ${ratingDisplayLabel(item.current.rating, { liveData: item.current.liveData })}`,
  ].filter(Boolean);

  if (difficultyLabel(item)) {
    parts.push(difficultyLabel(item));
  }
  if (item?.river?.estimatedPaddleTime) {
    parts.push(item.river.estimatedPaddleTime);
  }
  if (campingFactLabel(item)) {
    parts.push(campingFactLabel(item));
  }

  return parts.join(' \u2022 ');
}

function weekendFactsMarkup(item) {
  const facts = [
    item.travelLabel,
    confidenceDisplayLabel(item.weekend.confidence),
    `Today: ${ratingDisplayLabel(item.current.rating, { liveData: item.current.liveData })}`,
  ].filter(Boolean);

  if (difficultyLabel(item)) {
    facts.push(difficultyLabel(item));
  }

  if (item?.river?.estimatedPaddleTime) {
    facts.push(item.river.estimatedPaddleTime);
  }
  if (campingFactLabel(item)) {
    facts.push(campingFactLabel(item));
  }

  return facts
    .filter(Boolean)
    .map((fact) => `<span class="river-card__fact">${escapeHtml(fact)}</span>`)
    .join('');
}

function supportingReason(item) {
  if (item.current.rating !== item.weekend.rating) {
    return `Today is ${ratingDisplayLabel(item.current.rating, { liveData: item.current.liveData }).toLowerCase()}, but the weekend projection improves to ${ratingDisplayLabel(item.weekend.rating).toLowerCase()}.`;
  }

  const lowered = item.weekend.explanation.toLowerCase();
  if (lowered.includes('conservative')) {
    return '';
  }

  return '';
}

function weekendExplanationText(item) {
  return String(item?.weekend?.explanation || '')
    .replace(/\bWeekend outlooks stay a little more conservative\.\s*/gi, '')
    .replace(/\bWeekend picks stay a little more conservative than today\.\s*/gi, '')
    .trim();
}

function slotLabel(index) {
  if (index === 0) return 'Paddle this weekend';
  if (index === 1) return 'Another Paddle option';
  if (index === 2) return 'Paddle backup';
  return 'Paddle option';
}

function watchSlotLabel(index) {
  if (index === 0) return 'Watch closely';
  return 'Also worth watching';
}

function weekendDateRangeText(label) {
  if (typeof label !== 'string') {
    return 'This weekend';
  }

  const trimmed = label.trim();
  const match = trimmed.match(/\(([^)]+)\)/);
  if (match?.[1]) {
    return match[1];
  }

  return trimmed.replace(/^weekend\s*/i, '').trim() || 'This weekend';
}

function updateFreshness({ generatedAt = lastGeneratedAt, refreshing = false, fallback = false } = {}) {
  if (!(homeFreshness instanceof HTMLElement)) {
    return;
  }

  if (homeFreshnessWrap instanceof HTMLElement) {
    homeFreshnessWrap.hidden = false;
  }

  const base =
    typeof generatedAt === 'string' && generatedAt
      ? freshnessLabel(new Date(generatedAt).getTime())
      : 'Updated recently';

  if (refreshing && generatedAt) {
    homeFreshness.textContent = `${base}. Refreshing now...`;
    return;
  }

  if (fallback && generatedAt) {
    homeFreshness.textContent = `${base}. Showing latest available data.`;
    return;
  }

  homeFreshness.textContent = `${base}.`;
}

function updateSnapshotLine(payload, visibleRivers = payload?.rivers) {
  if (!(snapshotLine instanceof HTMLElement)) {
    return;
  }

  const items = Array.isArray(visibleRivers) ? visibleRivers : [];
  const { bestBets, worthWatching } = splitWeekendItems(items);
  const count = bestBets.length;
  const scopeLabel = userLocation && selectedWeekendDistance !== null
    ? `within ${weekendDistanceLabel()}` : 'across all locations';

  if (count <= 0) {
    if (worthWatching.length > 0) {
      const watchLabel =
        worthWatching.length === 1
          ? '1 tradeoff route worth re-checking'
          : `${worthWatching.length} tradeoff routes worth re-checking`;
      snapshotLine.textContent = `No weekend picks yet ${scopeLabel} / ${watchLabel}`;
      return;
    }

    snapshotLine.textContent = `No weekend picks yet ${scopeLabel}. Try a wider range or check back after the next refresh.`;
    return;
  }

  const countLabel = count === 1 ? '1 weekend pick' : `${count} weekend picks`;
  snapshotLine.textContent = `${countLabel} ${scopeLabel}`;
}

function updateOverviewCounts(payload, visibleRivers = payload?.rivers) {
  setText(document.querySelector('[data-weekend-overview-label]'),
    userLocation && selectedWeekendDistance !== null
      ? `Weekend overview · ${weekendDistanceLabel()}` : 'Weekend overview · All locations');
  const rivers = Array.isArray(visibleRivers) ? visibleRivers : [];
  const strong = rivers.filter((item) => item.weekend.rating === 'Strong').length;
  const good = rivers.filter((item) => item.weekend.rating === 'Good').length;
  const fair = rivers.filter((item) => item.weekend.rating === 'Fair').length;
  setText(strongCount, String(strong));
  setText(goodCount, String(good));
  setText(fairCount, String(fair));
  setText(withheldCount, String(payload?.withheldCount ?? 0));
}

function updateFeaturedSummaryToggle(text) {
  if (!(featuredToggle instanceof HTMLButtonElement) || !(featuredExplanation instanceof HTMLElement)) {
    return;
  }

  const normalized = typeof text === 'string' ? text.trim() : '';
  const shouldShow = normalized.length > 0;
  featuredToggle.hidden = !shouldShow;

  if (!shouldShow) {
    featuredExplanation.classList.remove('hero-call__summary--expanded');
    featuredToggle.setAttribute('aria-expanded', 'false');
    return;
  }

  featuredToggle.textContent = featuredExplanation.classList.contains('hero-call__summary--expanded')
    ? 'Less'
    : 'Details';
}

function fallbackRoutePhotoForSlug(slug = '') {
  const index = Array.from(slug).reduce((sum, char) => sum + char.charCodeAt(0), 0) % FALLBACK_ROUTE_PHOTOS.length;
  return FALLBACK_ROUTE_PHOTOS[index] || FALLBACK_ROUTE_PHOTOS[0];
}

function updateFeaturedGallery(item) {
  if (!(featuredGallery instanceof HTMLElement) || !(featuredGalleryImage instanceof HTMLImageElement)) {
    return;
  }

  const river = item?.river;
  if (!river?.slug) {
    featuredGallery.hidden = true;
    featuredGalleryImage.removeAttribute('src');
    featuredGalleryImage.alt = '';
    if (featuredGalleryPlaceholder instanceof HTMLElement) {
      featuredGalleryPlaceholder.hidden = true;
    }
    return;
  }

  const photo = fallbackRoutePhotoForSlug(river.slug);
  featuredGallery.hidden = false;
  featuredGalleryImage.src = photo.src;
  featuredGalleryImage.alt = photo.alt || `${river.name} route photo`;
  if (featuredGalleryPlaceholder instanceof HTMLElement) {
    featuredGalleryPlaceholder.hidden = false;
  }
  if (featuredGalleryContribute instanceof HTMLAnchorElement) {
    featuredGalleryContribute.href = `/contribute/?riverSlug=${encodeURIComponent(river.slug)}`;
  }
}

function renderFeatured(
  item,
  {
    worthWatchingCount = 0,
    hasWeekendPlan = true,
    hasExpandedPicks = false,
  } = {},
) {
  if (!item) {
    updateFeaturedGallery(null);
    setText(featuredLabel, 'Paddle this weekend');
    setText(featuredState, 'Conservative planning mode');
    setText(
      featuredName,
      worthWatchingCount > 0 ? 'No weekend picks yet' : 'No reliable weekend picks yet'
    );
    setText(
      featuredReach,
      worthWatchingCount > 0
        ? 'A few tradeoff routes are worth re-checking, but none are strong enough to recommend yet.'
        : 'Forecast evidence is still too weak to surface a reliable shortlist.'
    );
    setText(featuredVerdict, worthWatchingCount > 0 ? 'Watch closely before committing' : 'Not shaping up yet');
    setText(featuredScore, '--');
    setText(featuredRating, 'Not enough data');
    setText(featuredConfidence, 'Forecast evidence building');
    setText(featuredCurrent, 'Check again later');
    if (featuredWeather instanceof HTMLElement) {
      featuredWeather.hidden = true;
      featuredWeather.innerHTML = '';
    }
    setText(
      featuredReason,
      worthWatchingCount > 0
        ? 'The forecast is warm enough to watch, but still too risky to recommend a route yet.'
        : 'Nothing is lining up well enough for a confident weekend pick yet.'
    );
    setText(
      featuredSignal,
      worthWatchingCount > 0
        ? `${worthWatchingCount} ${worthWatchingCount === 1 ? 'tradeoff route is' : 'tradeoff routes are'} worth re-checking`
        : 'Forecast evidence still building'
    );
    setText(
      featuredExplanation,
      worthWatchingCount > 0
        ? 'Warm temperatures alone are not enough for a weekend recommendation when rain, storms, or wind are still a concern.'
        : 'Weekend picks only show up when the current gauge and forecast both look solid.'
    );

    if (featuredReasons instanceof HTMLElement) {
      featuredReasons.innerHTML = '';
      featuredReasons.hidden = true;
    }
    if (featuredFacts instanceof HTMLElement) {
      featuredFacts.innerHTML = '';
    }
    if (featuredFactsSection instanceof HTMLElement) {
      featuredFactsSection.hidden = true;
    }

    updateFeaturedSummaryToggle(featuredExplanation.textContent || '');

    if (featuredLink instanceof HTMLAnchorElement) {
      featuredLink.href = '/';
      featuredLink.textContent = "Today's board";
    }

    return;
  }

  const tone = ratingToneKey(item.weekend.rating);
  if (featuredPanel instanceof HTMLElement) {
    featuredPanel.classList.remove('hero-call--great', 'hero-call--good', 'hero-call--marginal', 'hero-call--no-go');
    featuredPanel.classList.add(`hero-call--${tone}`);
  }

  setText(
    featuredLabel,
    hasWeekendPlan
      ? userLocation
        ? 'Best nearby'
        : 'Paddle this weekend'
      : hasExpandedPicks
        ? 'Next closest option'
        : 'No Paddle plan yet',
  );
  updateFeaturedGallery(item);
  setText(featuredState, userLocation ? `Near ${userLocation.label}` : item.weekend.label);
  setText(featuredName, item.river.name);
  setText(featuredReach, item.river.reach);
  setText(
    featuredVerdict,
    hasWeekendPlan ? weekendVerdict(item) : 'Recheck before planning',
  );
  setText(featuredScore, String(item.weekend.score));
  setText(featuredRating, conditionTierDisplayLabel(item.weekend.rating));
  setText(featuredConfidence, confidenceDisplayLabel(item.weekend.confidence));
  setText(featuredCurrent, `Today: ${ratingDisplayLabel(item.current.rating, { liveData: item.current.liveData })}`);
  if (featuredWeather instanceof HTMLElement) {
    featuredWeather.innerHTML = weekendWeatherBadgeMarkup(item);
    featuredWeather.hidden = false;
  }
  setText(featuredReason, item.weekend.summary);
  setText(featuredSignal, item.weekend.signalLine);
  setText(featuredExplanation, weekendExplanationText(item));
  if (featuredFacts instanceof HTMLElement) {
    const factsMarkup = weekendFactsMarkup(item);
    featuredFacts.innerHTML = factsMarkup;
    if (featuredFactsSection instanceof HTMLElement) {
      featuredFactsSection.hidden = !factsMarkup;
    }
  }

  if (featuredReasons instanceof HTMLElement) {
    const reason = supportingReason(item);
    featuredReasons.innerHTML = reason ? `<li>${escapeHtml(reason)}</li>` : '';
    featuredReasons.hidden = !reason;
  }

  updateFeaturedSummaryToggle(featuredExplanation?.textContent || '');
  if (featuredLink instanceof HTMLAnchorElement) {
    featuredLink.href = `/rivers/${item.river.slug}/`;
    featuredLink.textContent = 'View route';
  }
}

function createWeekendCard(item, index, options = {}) {
  if (!(cardTemplate instanceof HTMLTemplateElement)) {
    return document.createElement('div');
  }

  const fragment = cardTemplate.content.cloneNode(true);
  const card = fragment.querySelector('.river-card');
  if (!(card instanceof HTMLElement)) {
    return document.createElement('div');
  }

  const tone = ratingToneKey(item.weekend.rating);
  card.classList.add(`river-card--${tone}`, 'river-card--route', 'river-card--weekend');
  if (options.watchCard) {
    card.classList.add('river-card--weekend-watch');
  }

  const slotText = typeof options.slotLabel === 'string' ? options.slotLabel : slotLabel(index);
  const cardKind = card.querySelector('[data-field="card-kind"]');
  setText(cardKind, '');
  if (cardKind instanceof HTMLElement) {
    cardKind.hidden = true;
  }
  setText(card.querySelector('[data-field="card-slot"]'), slotText);
  setText(card.querySelector('[data-field="state"]'), regionStateText(item));
  setText(card.querySelector('[data-field="route-label"]'), item.river.reach);
  const segmentLabel = formatRouteSegmentLabel(routeSegmentSummary(item.river), null);
  const segmentField = card.querySelector('[data-field="segment-label"]');
  setText(segmentField, segmentLabel);
  if (segmentField instanceof HTMLElement) {
    segmentField.hidden = !segmentLabel;
  }
  setText(card.querySelector('[data-field="card-verdict"]'), weekendVerdict(item));
  setText(card.querySelector('[data-field="score"]'), String(item.weekend.score));
  setText(card.querySelector('[data-field="rating"]'), conditionTierDisplayLabel(item.weekend.rating));
  setText(card.querySelector('[data-field="meta-line"]'), '');
  setText(card.querySelector('[data-field="card-summary-main"]'), item.weekend.summary);

  const signal = card.querySelector('[data-field="raw-signal"]');
  if (signal instanceof HTMLElement) {
    signal.innerHTML = weekendSignalRowMarkup(item);
  }

  const facts = card.querySelector('[data-field="card-facts"]');
  const factsSection = card.querySelector('[data-field="card-facts-section"]');
  if (facts instanceof HTMLElement) {
    const factsMarkup = weekendFactsMarkup(item);
    facts.innerHTML = factsMarkup;
    facts.hidden = !factsMarkup;
    if (factsSection instanceof HTMLElement) {
      factsSection.hidden = !factsMarkup;
    }
  }

  const weather = card.querySelector('[data-field="card-weather"]');
  if (weather instanceof HTMLElement) {
    weather.hidden = false;
    weather.innerHTML = weekendWeatherBadgeMarkup(item);
  }

  const orb = card.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    orb.classList.add(`score-orb--${tone}`);
  }

  const titleLink = card.querySelector('[data-field="card-title-link"]');
  if (titleLink instanceof HTMLAnchorElement) {
    titleLink.href = `/rivers/${item.river.slug}/`;
    titleLink.textContent = item.river.name;
  }

  const link = card.querySelector('[data-card-link]');
  if (link instanceof HTMLAnchorElement) {
    link.href = `/rivers/${item.river.slug}/`;
    link.textContent = 'View route';
  }

  decorateFavoriteButton(card.querySelector('[data-favorite-button]'), favoriteRecord(item));

  return card;
}

function renderCardGrid(container, items, { watchCards = false, limit = 8 } = {}) {
  if (!(container instanceof HTMLElement)) {
    return;
  }

  container.innerHTML = '';
  const fragment = document.createDocumentFragment();
  items.slice(0, limit).forEach((item, index) => {
    fragment.appendChild(
      createWeekendCard(
        item,
        index,
        watchCards
          ? { slotLabel: watchSlotLabel(index), watchCard: true }
          : {},
      ),
    );
  });
  container.appendChild(fragment);
  refreshFavoriteButtons(container);
}

function renderGrid(items) {
  renderCardGrid(weekendGrid, items);
  if (weekendEmpty instanceof HTMLElement) {
    weekendEmpty.hidden = items.length > 0;
  }
}

function weekendResultMeta(item) {
  return [
    item.travelLabel,
    confidenceDisplayLabel(item.weekend.confidence),
    campingFactLabel(item),
  ].filter(Boolean).join(' • ');
}

function updateWeekendMapSelection(key) {
  selectedWeekendMapKey = key || null;

  for (const [markerKey, marker] of weekendMapMarkersByKey.entries()) {
    const markerElement = marker?.getElement?.();
    if (markerElement instanceof HTMLElement) {
      markerElement.classList.toggle('score-map-marker--selected', markerKey === selectedWeekendMapKey);
      markerElement.classList.toggle('score-map-marker--river-expanded', markerKey === selectedWeekendMapKey);
    }
  }

  if (weekendResults instanceof HTMLElement) {
    for (const row of weekendResults.querySelectorAll('[data-weekend-result-key]')) {
      if (!(row instanceof HTMLElement)) continue;
      const active = row.dataset.weekendResultKey === selectedWeekendMapKey;
      row.classList.toggle('weekend-result-row--active', active);
      const button = row.querySelector('[data-weekend-result-select]');
      if (button instanceof HTMLButtonElement) {
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      }
    }
  }
}

function setWeekendMobileView(view) {
  weekendMobileView = view === 'map' ? 'map' : 'list';
  if (!(weekendMapShell instanceof HTMLElement)) {
    return;
  }

  const compact = window.matchMedia('(max-width: 760px)').matches;
  weekendMapShell.classList.toggle('summary-map-shell--mobile-list', compact && weekendMobileView === 'list');
  weekendMapShell.classList.toggle('summary-map-shell--mobile-map', compact && weekendMobileView === 'map');
  weekendMapShell.dataset.summaryMapView = weekendMobileView;
  if (weekendMobileSwitch instanceof HTMLElement) {
    weekendMobileSwitch.hidden = !compact;
  }
  for (const button of weekendMobileViewButtons) {
    if (!(button instanceof HTMLButtonElement)) continue;
    const active = button.dataset.summaryMapMobileView === weekendMobileView;
    button.classList.toggle('summary-map-mobile-switch__button--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }
  if (weekendMobileView === 'map' && weekendMapRuntime) {
    window.setTimeout(() => weekendMapRuntime.resize(), 40);
  }
}

function createWeekendResultRow(item) {
  const row = document.createElement('article');
  const tone = ratingToneKey(item.weekend.rating);
  row.className = `weekend-result-row weekend-result-row--${tone}`;
  row.dataset.weekendResultKey = item.river.slug;

  const select = document.createElement('button');
  select.type = 'button';
  select.className = 'weekend-result-row__select';
  select.dataset.weekendResultSelect = 'true';
  select.setAttribute('aria-pressed', 'false');
  select.setAttribute('aria-label', `Show ${item.river.name} on the map`);
  select.innerHTML = `
    <span class="weekend-result-row__score score-map-marker score-map-marker--${tone}">${escapeHtml(String(item.weekend.score))}</span>
    <span class="weekend-result-row__body">
      <strong class="weekend-result-row__name">${escapeHtml(item.river.name)}</strong>
      <span class="weekend-result-row__reach">${escapeHtml(item.river.reach)}</span>
      <span class="weekend-result-row__meta">${escapeHtml(weekendResultMeta(item) || 'Weekend route')}</span>
    </span>
    <span class="weekend-result-row__rating">${escapeHtml(conditionTierDisplayLabel(item.weekend.rating))}</span>
  `;
  select.addEventListener('click', () => {
    updateWeekendMapSelection(item.river.slug);
    if (window.matchMedia('(max-width: 760px)').matches) {
      setWeekendMobileView('map');
    }
  });

  const link = document.createElement('a');
  link.className = 'weekend-result-row__link';
  link.href = `/rivers/${encodeURIComponent(item.river.slug)}/`;
  link.textContent = 'View route';

  row.append(select, link);
  return row;
}

function renderWeekendResults(routes) {
  if (!(weekendResults instanceof HTMLElement)) {
    return;
  }

  weekendResults.innerHTML = '';
  if (weekendResultsTitle instanceof HTMLElement) {
    weekendResultsTitle.textContent = `${routes.length} ${routes.length === 1 ? 'route' : 'routes'} in this view`;
  }
  if (weekendResultsNote instanceof HTMLElement) {
    weekendResultsNote.textContent = routes.length > 0
      ? 'Select a route to highlight it on the map.'
      : 'Try another route type or widen your weekend range.';
  }
  for (const countNode of weekendMobileCountNodes) {
    if (countNode instanceof HTMLElement) {
      countNode.textContent = String(routes.length);
      countNode.hidden = routes.length === 0;
    }
  }

  if (routes.length === 0) {
    weekendResults.innerHTML = `
      <div class="weekend-results-empty">
        <strong>No routes match this view</strong>
        <p class="muted">Try another route type or widen your weekend range.</p>
        <button class="river-link river-link--inline" type="button" data-weekend-results-empty-reset>Show all routes</button>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const item of routes) {
    fragment.appendChild(createWeekendResultRow(item));
  }
  weekendResults.appendChild(fragment);
  const selected = routes.some((item) => item.river.slug === selectedWeekendMapKey)
    ? selectedWeekendMapKey
    : routes[0]?.river.slug;
  updateWeekendMapSelection(selected);
}

function updateWeekendEmptyState({ worthWatchingCount = 0, hasWithheld = false } = {}) {
  if (!(weekendEmpty instanceof HTMLElement)) {
    return;
  }

  if (worthWatchingCount > 0) {
    weekendEmpty.hidden = false;
      setText(weekendEmptyTitle, 'No weekend picks yet');
      setText(
        weekendEmptyCopy,
        worthWatchingCount === 1
          ? '1 tradeoff route is worth re-checking if the forecast improves, but none are strong enough to recommend yet.'
        : `${worthWatchingCount} tradeoff routes are worth re-checking if the forecast improves, but none are strong enough to recommend yet.`
    );
    return;
  }

  weekendEmpty.hidden = false;
  setText(weekendEmptyTitle, hasWithheld ? 'No weekend picks yet' : 'No reliable weekend picks yet');
  setText(
    weekendEmptyCopy,
    hasWithheld
      ? 'Current river shape and forecast confidence are still too low to surface a confident weekend pick.'
      : 'Forecast evidence is still too weak to recommend weekend picks.'
  );
}

function renderWatchGrid(items, { forceVisible = false } = {}) {
  if (!(weekendWatchSection instanceof HTMLElement) || !(weekendWatchGrid instanceof HTMLElement)) {
    return;
  }

  weekendWatchSection.hidden = items.length <= 0 && !forceVisible;
  renderCardGrid(weekendWatchGrid, items, { watchCards: true, limit: 10 });
  if (weekendWatchEmpty instanceof HTMLElement) {
    weekendWatchEmpty.hidden = items.length > 0 || !forceVisible;
  }
}

function renderCampingGrid(items, { forceVisible = false } = {}) {
  if (!(weekendCampingSection instanceof HTMLElement)) {
    return;
  }

  weekendCampingSection.hidden = items.length <= 0 && !forceVisible;
  renderCardGrid(weekendCampingGrid, items);
  if (weekendCampingEmpty instanceof HTMLElement) {
    weekendCampingEmpty.hidden = items.length > 0 || !forceVisible;
  }
}

function weekendFallbackRouteLine(point) {
  if (point.span.length < 2) {
    return null;
  }

  return {
    type: 'Feature',
    properties: {
      slug: point.id,
      rating: point.rating,
      traced: false,
    },
    geometry: {
      type: 'LineString',
      coordinates: point.span.map((coordinate) => [
        coordinate.longitude,
        coordinate.latitude,
      ]),
    },
  };
}

async function weekendRouteLine(item, point) {
  if (point.span.length < 2) {
    return null;
  }

  try {
    const routeLine = await loadCanonicalRiverRouteLine(point.id, point.span, {
      stateName: item.river.state,
    });
    if (routeLine) {
      return {
        ...routeLine,
        properties: {
          ...routeLine.properties,
          slug: point.id,
          rating: point.rating,
        },
      };
    }
  } catch (error) {
    console.warn(`Canonical river geometry unavailable for weekend route ${point.id}; using access coordinates.`, error);
  }

  return weekendFallbackRouteLine(point);
}

function syncWeekendRouteLines(features) {
  if (!weekendMapRuntime) {
    return;
  }

  const sourceId = 'weekend-route-spans';
  const casingLayerId = 'weekend-route-spans-casing';
  const layerId = 'weekend-route-spans';
  const data = {
    type: 'FeatureCollection',
    features,
  };

  syncGeoJsonOverlay(weekendMapRuntime, {
    sourceId,
    data,
    layers: [{
      id: casingLayerId,
      type: 'line',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#ffffff',
        'line-width': ['interpolate', ['linear'], ['zoom'], 3, 3.8, 8, 6.2, 12, 8],
        'line-opacity': 0.76,
      },
    }, {
      id: layerId,
      type: 'line',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': [
          'match',
          ['get', 'rating'],
          'Strong',
          '#2c8a54',
          'Good',
          '#1c7770',
          'Fair',
          '#ad752c',
          '#1e7397',
        ],
        'line-width': ['interpolate', ['linear'], ['zoom'], 3, 1.8, 8, 3.4, 12, 4.8],
        'line-opacity': 0.82,
      },
    }],
  });
}

function weekendMapPopupMarkup(item, point) {
  const tone = ratingToneKey(item.weekend.rating);
  const meta = [
    item.river.distanceLabel,
    item.travelLabel,
    confidenceDisplayLabel(item.weekend.confidence),
  ].filter(Boolean).join(' \u2022 ');

  return `
    <article class="score-map-popup">
      <h3>${escapeHtml(item.river.name)}</h3>
      <p class="score-map-popup__reach">${escapeHtml(item.river.reach)}</p>
      ${meta ? `<p class="score-map-popup__meta">${escapeHtml(meta)}</p>` : ''}
      <div class="score-map-popup__scoreline">
        <span class="score-map-popup__scorebadge score-map-popup__scorebadge--${escapeHtml(tone)}">${escapeHtml(point.score)}</span>
        <p class="score-map-popup__verdict">${escapeHtml(weekendVerdict(item))}</p>
      </div>
      <p class="score-map-popup__summary">${escapeHtml(item.weekend.summary)}</p>
      <a class="score-map-popup__link score-map-popup__link--button" href="/rivers/${encodeURIComponent(item.river.slug)}/">View route</a>
    </article>
  `;
}

async function renderWeekendMap(routes) {
  if (!(weekendMap instanceof HTMLElement)) {
    return;
  }

  const points = weekendRouteMapPoints(routes);
  const renderVersion = ++weekendMapRenderVersion;
  renderWeekendResults(routes);
  if (weekendMapEmpty instanceof HTMLElement) {
    weekendMapEmpty.hidden = points.length > 0;
  }
  if (weekendMapShell instanceof HTMLElement) {
    weekendMapShell.classList.toggle('weekend-map-shell--empty', points.length === 0);
  }

  if (points.length === 0) {
    setWeekendMobileView('map');
    weekendMapMarkers = clearMapMarkers(weekendMapMarkers);
    weekendMapMarkersByKey = new Map();
    updateWeekendMapSelection(null);
    if (weekendMapRuntime) {
      syncWeekendRouteLines([]);
    }
    weekendMapStatusController.empty();
    const emptyLabels = {
      all: 'No shortlist routes are available',
      'day-trips': 'No best bets match this range',
      camping: 'No camping-friendly routes match this range',
      rechecks: 'No routes worth watching match this range',
    };
    const emptyTypeLabels = {
      all: 'shortlist routes',
      'day-trips': 'best bets',
      camping: 'camping-friendly routes',
      rechecks: 'routes worth watching',
    };
    setText(
      weekendMapEmptyTitle,
      emptyLabels[selectedWeekendFilter] || 'No routes match this filter',
    );
    setText(
      weekendMapEmptyCopy,
      userLocation
        ? `No ${emptyTypeLabels[selectedWeekendFilter] || 'routes'} are within ${weekendDistanceLabel()}. Try another route type or show all routes.`
        : 'Try another route type or show all weekend routes.',
    );
    return;
  }

  weekendMapStatusController.loading();

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl || renderVersion !== weekendMapRenderVersion) {
      return;
    }

    if (!weekendMapRuntime) {
      weekendMapRuntime = createPaddleMap(maplibregl, {
        container: weekendMap,
        center: [-93.7, 44.6],
        zoom: 5.2,
        minZoom: 3.4,
        maxZoom: 12,
      });
    }

    await waitForMapReady(weekendMapRuntime);
    if (renderVersion !== weekendMapRenderVersion) {
      return;
    }

    weekendMapMarkers = clearMapMarkers(weekendMapMarkers);
    weekendMapMarkersByKey = new Map();
    const routesBySlug = new Map(routes.map((item) => [item.river.slug, item]));
    const routeLines = (await Promise.all(points.map((point) => {
      const item = routesBySlug.get(point.id);
      return item ? weekendRouteLine(item, point) : null;
    }))).filter(Boolean);
    if (renderVersion !== weekendMapRenderVersion) {
      return;
    }
    syncWeekendRouteLines(routeLines);
    const bounds = new maplibregl.LngLatBounds();

    for (const point of points) {
      const item = routesBySlug.get(point.id);
      if (!item) {
        continue;
      }
      const markerNode = document.createElement('button');
      markerNode.type = 'button';
      markerNode.className = markerClassForRating(point.rating, point.confidence);
      markerNode.innerHTML = `<span>${escapeHtml(point.score)}</span>`;
      markerNode.setAttribute(
        'aria-label',
        `${point.label}, ${point.reach}, weekend score ${point.score}. Show route details.`,
      );

      const marker = createMapMarker({
        maplibregl,
        mapRuntime: weekendMapRuntime,
        element: markerNode,
        point,
        popupHtml: weekendMapPopupMarkup(item, point),
        popupOptions: {
          offset: 18,
          maxWidth: '260px',
        },
      });
      bindMarkerPopup(marker, markerNode, {
        map: weekendMapRuntime,
        onSelectedChange(selected) {
          if (selected) {
            updateWeekendMapSelection(point.id);
          }
        },
      });
      weekendMapMarkers.push(marker);
      weekendMapMarkersByKey.set(point.id, marker);

      if (point.span.length >= 2) {
        for (const coordinate of point.span) {
          bounds.extend([coordinate.longitude, coordinate.latitude]);
        }
      } else {
        bounds.extend([point.longitude, point.latitude]);
      }
    }

    fitMapBounds(weekendMapRuntime, bounds, {
      profile: 'weekendResults',
      compact: window.matchMedia('(max-width: 720px)').matches,
    });
    weekendMapRuntime.resize();
    updateWeekendMapSelection(
      points.some((point) => point.id === selectedWeekendMapKey)
        ? selectedWeekendMapKey
        : points[0]?.id,
    );

    weekendMapStatusController.ready({
      count: points.length,
      label: weekendFilterLabel(selectedWeekendFilter),
    });
  } catch (error) {
    console.error('Failed to load the weekend route map.', error);
    weekendMapStatusController.unavailable();
  }
}

function renderWeekend(payload) {
  const items = Array.isArray(payload?.rivers) ? payload.rivers : [];
  const plan = buildWeekendPlan(items, {
    location: userLocation,
    distanceLimit: selectedWeekendDistance,
    filter: selectedWeekendFilter,
  });
  latestWeekendItems = items;
  latestWeekendPayload = payload;
  lastGeneratedAt = typeof payload?.generatedAt === 'string' ? payload.generatedAt : null;
  setText(weekendDates, weekendDateRangeText(payload?.label));
  updateFreshness({
    generatedAt: lastGeneratedAt,
    fallback: payload?.snapshotStatus === 'stale',
  });
  updateSnapshotLine(payload, plan.inRangeRoutes);
  updateOverviewCounts(payload, plan.inRangeRoutes);
  updateWeekendControls(plan);
  renderFeatured(plan.featured, {
    worthWatchingCount: plan.rechecks.length,
    hasWeekendPlan: plan.hasWeekendPlan,
    hasExpandedPicks: plan.expandedPicks.length > 0,
  });

  void renderWeekendMap(plan.mapRoutes);
}

function hydrateFromCache() {
  const cached = readCachedPayload(WEEKEND_CACHE_KEY);
  if (!cached?.payload || !Array.isArray(cached.payload.rivers)) {
    return false;
  }

  renderWeekend(cached.payload);
  updateFreshness({ generatedAt: cached.payload.generatedAt, refreshing: true });
  return true;
}

async function loadWeekend({ silent = false } = {}) {
  const { requestId, controller } = weekendRequestGuard.begin();

  try {
    if (silent && lastGeneratedAt) {
      updateFreshness({ generatedAt: lastGeneratedAt, refreshing: true });
    }

    const payload = await getBrowserApiClient().getWeekendSummary({
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!weekendRequestGuard.isCurrent(requestId)) {
      return;
    }
    writeCachedPayload(WEEKEND_CACHE_KEY, payload);
    renderWeekend(payload);
  } catch (error) {
    if (isAbortError(error)) {
      return;
    }

    if (!weekendRequestGuard.isCurrent(requestId)) {
      return;
    }
    console.error('Failed to load weekend river scores.', error);

    if (latestWeekendItems.length > 0) {
      updateFreshness({ generatedAt: lastGeneratedAt, fallback: true });
      return;
    }

    updateSnapshotLine({ riverCount: 0, withheldCount: 0 });
    renderFeatured(null);
    renderGrid([]);
    if (weekendPlanner instanceof HTMLElement) {
      weekendPlanner.hidden = false;
    }
    renderWeekendResults([]);
    if (weekendMapEmpty instanceof HTMLElement) {
      weekendMapEmpty.hidden = false;
    }
  } finally {
    weekendRequestGuard.finish(controller);
  }
}

if (featuredToggle instanceof HTMLButtonElement && featuredExplanation instanceof HTMLElement) {
  featuredToggle.addEventListener('click', () => {
    const expanded = featuredExplanation.classList.toggle('hero-call__summary--expanded');
    featuredToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    featuredToggle.textContent = expanded ? 'Less' : 'Details';
  });
}

for (const button of weekendFilterButtons) {
  if (!(button instanceof HTMLButtonElement)) {
    continue;
  }
  button.addEventListener('click', () => {
    const nextFilter = button.dataset.weekendFilter;
    if (!['all', 'day-trips', 'camping', 'rechecks'].includes(nextFilter)) {
      return;
    }
    selectedWeekendFilter = nextFilter;
    if (latestWeekendPayload) {
      renderWeekend(latestWeekendPayload);
    }
  });
}

for (const button of weekendDistanceButtons) {
  if (!(button instanceof HTMLButtonElement)) {
    continue;
  }
  button.addEventListener('click', () => {
    selectedWeekendDistance = button.dataset.weekendDistanceOption === 'any'
      ? null
      : Number(button.dataset.weekendDistanceOption);
    saveWeekendDistance(selectedWeekendDistance);
    if (latestWeekendPayload) {
      renderWeekend(latestWeekendPayload);
    }
  });
}

if (weekendLocationUse instanceof HTMLButtonElement) {
  weekendLocationUse.addEventListener('click', () => {
    if (!navigator.geolocation) {
      setText(weekendLocationHint, 'Location is not available in this browser.');
      return;
    }

    weekendLocationUse.disabled = true;
    weekendLocationUse.textContent = 'Finding...';
    setText(weekendLocationHint, 'Finding your location...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let label = 'Current location';
        try {
          label = await weekendLocationService.reverseGeocodeLocation(latitude, longitude)
            || label;
        } catch (error) {
          console.warn('Reverse geocoding the weekend location failed.', error);
        }

        userLocation = {
          latitude,
          longitude,
          label,
          source: 'device',
        };
        saveWeekendLocation(userLocation);
        if (latestWeekendPayload) {
          renderWeekend(latestWeekendPayload);
        }
      },
      (error) => {
        weekendLocationUse.disabled = false;
        weekendLocationUse.textContent = 'Use my location';
        setText(
          weekendLocationHint,
          error.code === error.PERMISSION_DENIED
            ? 'Location access was blocked. You can set a city or ZIP on the Today page.'
            : 'Your location could not be found. Try again or set it on the Today page.',
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000,
      },
    );
  });
}

if (weekendLocationClear instanceof HTMLButtonElement) {
  weekendLocationClear.addEventListener('click', () => {
    userLocation = null;
    saveWeekendLocation(null);
    if (latestWeekendPayload) {
      renderWeekend(latestWeekendPayload);
    }
  });
}

function resetWeekendFilters() {
  selectedWeekendFilter = 'all';
  selectedWeekendDistance = null;
  saveWeekendDistance(selectedWeekendDistance);
  if (latestWeekendPayload) {
    renderWeekend(latestWeekendPayload);
  }
}

if (weekendMapEmptyReset instanceof HTMLButtonElement) {
  weekendMapEmptyReset.addEventListener('click', resetWeekendFilters);
}

if (weekendResults instanceof HTMLElement) {
  weekendResults.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest('[data-weekend-results-empty-reset]')) {
      resetWeekendFilters();
    }
  });
}

for (const button of weekendMobileViewButtons) {
  if (!(button instanceof HTMLButtonElement)) continue;
  button.addEventListener('click', () => {
    setWeekendMobileView(button.dataset.summaryMapMobileView);
  });
}

bindFavoriteButtons(document);
setWeekendMobileView('list');
window.addEventListener('resize', () => setWeekendMobileView(weekendMobileView));
updateWeekendControls(buildWeekendPlan([], {
  location: userLocation,
  distanceLimit: selectedWeekendDistance,
  filter: selectedWeekendFilter,
}));
const hydrated = hydrateFromCache();
loadWeekend({ silent: hydrated });
window.setInterval(() => {
  loadWeekend({ silent: true });
}, AUTO_REFRESH_MS);
