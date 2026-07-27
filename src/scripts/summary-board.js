import {
  bindMarkerPopup,
  clearMapMarkers,
  createPaddleMap,
  ensureMapLibre,
  escapeHtml,
  fitMapBounds,
  isMapReady,
  markerClassForRating,
  riverNameVariants,
  scoreZoneRouteLabel,
  syncActualRiverLayer,
  waitForMapReady,
} from './map-runtime.js';
import { createBoardMapModel } from './board-map-model.js';
import {
  boardMarkerClassFor as markerClassFor,
  createBoardMapController,
  createBoardMapPopupRenderer,
} from './board-map-controller.js';
import {
  createBoardFeaturedMapController,
  featuredRouteFallbackFeature,
} from './board-featured-map-controller.js';
import { createBoardLocationService } from './board-location-service.js';
import { createBoardLocationController } from './board-location-controller.js';
import { createBoardGeolocationController } from './board-geolocation-controller.js';
import { createBoardLoaderController } from './board-loader-controller.js';
import { createBoardStatusController } from './board-status-controller.js';
import { createBoardPreferenceController } from './board-preference-controller.js';
import {
  formatMixedFilterSummary,
  formatMixedPaginationSummary,
  formatMixedResultCount,
  mixedCardLinkLabel,
  mixedResultsEmptyText,
  mixedResultsNoMatchText,
  mixedResultsTitle,
} from './board-copy.js';
import { bindFavoriteButtons, decorateFavoriteButton, refreshFavoriteButtons } from './favorites-ui.js';
import { ratingDisplayLabel } from './ui-taxonomy.js';
import {
  compareTodayAlphabetically as compareAZ,
  compareTodayConfidenceStatusScore as compareConfidence,
  compareTodayLowestRisk as compareLowestRisk,
  compareTodayStatusThenScore as compareResults,
  distanceMiles,
  distancePenalty,
  estimateTravelMinutes,
} from '@paddletoday/api-contract';
import {
  buildBoardRecommendationItems,
  clampText,
  DEFAULT_RADIUS_MILES,
  difficultyPreferenceLabel,
  estimatedPaddleMinutesForItem,
  formatHomeChoiceSummary,
  groupResultsByRiverId,
  HOME_DIFFICULTY_OPTIONS,
  HOME_PADDLE_TIME_OPTIONS,
  isChoiceSetAny,
  isGroupedItem,
  isViableRecommendationItem,
  joinWithBullet,
  matchesBoardRatingFilter,
  nextRadiusSuggestionMiles,
  normalizeBoardSortMode,
  normalizeChoiceSet,
  normalizeHomeDifficultyFilters,
  normalizeHomePaddleTimeFilters,
  normalizeRadiusMiles,
  paginateItems,
  paddleTimeBucketForLabel,
  paddleTimePreferenceLabel,
  parseEstimatedPaddleTimeRange,
  radiusIndexForMiles,
  radiusMilesForIndex,
  recommendationPoolForNearby,
  routeDifficultyRank,
  sortBoardItems,
  sortNearbyResultsForDisplay,
  titleCase,
  toggleChoiceValue,
} from './board-domain.js';
import { chooseBestGeocodeCandidate } from './location-domain.js';
import {
  cardLinkLabel,
  confidenceLabel,
  distanceBucketLabel,
  exploreSortSummaryLabel,
  favoriteRecordForItem,
  formatBoardRefreshCopy,
  formatGeneratedFreshness,
  formatTravelLabel,
  liveReadWarning,
  metaLineText,
  parseTemperature,
  ratingToneKey,
  recommendationSlotLabel,
  recommendationSummaryText,
  recommendationTagLabels,
  recommendationVerdict,
  regionStateText,
  routeDifficultyLabel,
  routeEstimatedTimeLabel,
  routeLengthLabel,
  routeTypeLabel,
  shortRouteLengthLabel,
  summaryMentionsFlowShift,
  summaryMentionsWeather,
} from './board-presenters.js';
import {
  createBoardCardGridRenderer,
  createBoardFeaturedWeatherRenderer,
  createBoardRecommendationCardRenderer,
  createBoardRecommendationGridRenderer,
  createBoardRiverCardRenderer,
  featuredConditionMarkup,
  renderScoreBreakdownDisclosure,
  renderSourceBadges,
  renderTagMarkup,
  signalRowMarkup,
  weatherBadgeMarkup,
} from './board-card-markup.js';
import { createBoardPreferenceStorage } from './board-preference-storage.js';
import { loadCanonicalRiverGeometries } from '../lib/canonical-river-geometries.js';
import { endpointSnappedRiverGeometry, stitchRiverLines } from '../lib/endpoint-snapped-river-geometry.js';
import {
  coverageAnchorForRoutes,
  coverageCenterForRoutes,
  groupRoutesByConditionScore,
  routesForRiverItem,
} from '../lib/river-coverage.js';
import { classifyCamping, hasCampingSupport, hasOvernightCampingSupport } from '../lib/camping-classification.ts';
import {
  buildRoutePlannerHref,
  routeMatchesPaddleFilters,
  routeSegmentSummary,
  selectRouteSegment,
} from '../lib/route-segments.ts';

const {
  featuredRouteLabelForItem,
  mapMarkerAriaLabel,
  mapMarkerContext,
  mapMarkerLabel,
  representativeRouteLabel,
  routeCountLabel,
  routeLabelForItem,
  segmentLabelForItem,
  visibleMapMarkerLabel,
} = createBoardMapModel({
  groupRouteQualifier: 'shown',
  includeSetupRepresentative: true,
});

const STORAGE_KEY = 'paddletoday:user-location';
const STORAGE_RADIUS_KEY = 'paddletoday:recommendation-radius';
const STORAGE_HOME_DIFFICULTY_KEY = 'paddletoday:home-difficulty-filter';
const STORAGE_HOME_PADDLE_TIME_KEY = 'paddletoday:home-paddle-time-filter';
const {
  loadStoredHomeDifficultyFilter,
  loadStoredHomePaddleTimeFilter,
  loadStoredLocation,
  loadStoredRadiusMiles,
  removeStoredLocation,
  saveHomeDifficultyFilter,
  saveHomePaddleTimeFilter,
  saveLocation,
  saveRadiusMiles,
} = createBoardPreferenceStorage({
  storage: window.localStorage,
  locationKey: STORAGE_KEY,
  radiusKey: STORAGE_RADIUS_KEY,
  difficultyKey: STORAGE_HOME_DIFFICULTY_KEY,
  paddleTimeKey: STORAGE_HOME_PADDLE_TIME_KEY,
});
const GEOLOCATION_TIMEOUT_MS = 10000;
const boardLocationService = createBoardLocationService({
  fetchImpl: (...args) => fetch(...args),
  chooseCandidate: (candidates, parsed) => chooseBestGeocodeCandidate(candidates, parsed),
});
const AUTO_REFRESH_MS = 5 * 60 * 1000;
const NEARBY_TRAVEL_MINUTES = 90;
const DAY_TRIP_TRAVEL_MINUTES = 180;
const HOME_NEARBY_SORT_OPTIONS = ['best-score', 'closest', 'shortest-paddle', 'easiest'];
const recommendationGrid = document.querySelector('[data-recommendation-grid]');
const recommendationSummary = document.querySelector('[data-recommendation-summary]');
const recommendationTitle = document.querySelector('[data-recommendation-title]');
const recommendationEmpty = document.querySelector('[data-recommendation-empty]');
const recommendationCount = document.querySelector('[data-recommendation-count]');
const nearbySortSelect = document.querySelector('[data-nearby-sort-select]');
const nearbyLocationPanel = document.querySelector('[data-nearby-location-panel]');
const homeJumpButtons = Array.from(document.querySelectorAll('[data-home-jump-target]'));
const homeLocationSummary = document.querySelector('[data-home-location-summary]');
const homeLocationSortSummary = document.querySelector('[data-home-location-sort-summary]');
const homeRefineRow = document.querySelector('[data-home-refine-row]');
const homeRefineSummary = document.querySelector('[data-home-refine-summary]');
const homeRadiusPanel = document.querySelector('[data-home-radius-panel]');
const homeRadiusSummary = document.querySelector('[data-home-radius-summary]');
const homeRadiusSlider = document.querySelector('[data-home-radius-slider]');
const homeMatchCount = document.querySelector('[data-home-match-count]');
const homeLiveCount = document.querySelector('[data-home-live-count]');
const homeDifficultyButtons = Array.from(document.querySelectorAll('[data-home-difficulty-button]'));
const homePaddleTimeButtons = Array.from(document.querySelectorAll('[data-home-paddle-time-button]'));
const homePresetButtons = Array.from(document.querySelectorAll('[data-home-preset]'));
const homeResetButtons = Array.from(document.querySelectorAll('[data-home-reset-filters]'));
const homeFilterToggle = document.querySelector('[data-home-filter-toggle], [data-home-refine-toggle]');
const homeFilterToggleLabel = document.querySelector('[data-home-filter-toggle-label]');
const homeFilterToggleCount = document.querySelector('[data-home-filter-toggle-count]');
const homeFilterBackdrop = document.querySelector('[data-home-filter-backdrop]');
const homeFilterCloseButton = document.querySelector('[data-home-filter-close]');
const homeRouteMix = document.querySelector('[data-home-route-mix]');
const homeHeadline = document.querySelector('[data-home-headline]');
const homeLocationEmpty = document.querySelector('[data-home-location-empty]');
const homeNearbyMapSection = document.querySelector('[data-home-nearby-map-section]');
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
const featuredBridge = document.querySelector('[data-featured-bridge]');
const featuredLink = document.querySelector('[data-featured-link]');
const featuredJumpLink = document.querySelector('.home-featured__jump-link');
const featuredConfidence = document.querySelector('[data-field="featured-confidence"]');
const featuredDistance = document.querySelector('[data-field="featured-distance"]');
const featuredReason = document.querySelector('[data-field="featured-reason"]');
const featuredWeather = document.querySelector('[data-featured-weather]');
const featuredWeatherIcon = document.querySelector('[data-featured-weather-icon]');
const featuredSignal = document.querySelector('[data-field="featured-signal"]');
const featuredReasons = document.querySelector('[data-featured-reasons]');
const featuredDifficulty = document.querySelector('[data-field="featured-difficulty"]');
const featuredPaddleTime = document.querySelector('[data-field="featured-paddle-time"]');
const featuredMapShell = document.querySelector('[data-featured-map-shell]');
const featuredMap = document.querySelector('[data-featured-map]');
const featuredMapStatus = document.querySelector('[data-featured-map-status]');
const featuredMapCaption = document.querySelector('[data-featured-map-caption]');
const recommendationSection = document.querySelector('.decision-section--recommended');
const exploreSection = document.querySelector('.decision-section--explore');
const homeFreshnessNodes = Array.from(document.querySelectorAll('[data-home-freshness]'));
const homeFreshnessWraps = Array.from(document.querySelectorAll('[data-home-freshness-wrap]'));
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
const exploreResetButton = document.querySelector('[data-explore-reset]');

const filterSummary = document.querySelector('[data-filter-summary]');
const filterPills = document.querySelector('[data-filter-pills]');
const filterButtons = Array.from(document.querySelectorAll('[data-filter-toggle]'));
const filterSearch = document.querySelector('[data-filter-search]');
const filterState = document.querySelector('[data-filter-state]');
const filterRating = document.querySelector('[data-filter-rating]');
const filterRatingButtons = Array.from(document.querySelectorAll('[data-filter-rating-button]'));
const filterDifficulty = document.querySelector('[data-filter-difficulty]');
const filterRouteType = document.querySelector('[data-filter-route-type]');
const filterCamping = document.querySelector('[data-filter-camping]');
const filterDistance = document.querySelector('[data-filter-distance]');
const filterPaddleTime = document.querySelector('[data-filter-paddle-time]');
const filterPaddleLength = document.querySelector('[data-filter-paddle-length]');
const sortSelect = document.querySelector('[data-sort-select]');
const explorePagination = document.querySelector('[data-explore-pagination]');
const explorePaginationSummary = document.querySelector('[data-explore-pagination-summary]');
const explorePageLabel = document.querySelector('[data-explore-page]');
const explorePrevButton = document.querySelector('[data-explore-prev]');
const exploreNextButton = document.querySelector('[data-explore-next]');
const exploreResultsCount = document.querySelector('[data-explore-results-count]');
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
const summaryMapMobileSwitch = document.querySelector('[data-summary-map-mobile-switch]');
const summaryMapMobileViewButtons = Array.from(document.querySelectorAll('[data-summary-map-mobile-view]'));
const summaryMapMobileCountNodes = Array.from(document.querySelectorAll('[data-summary-map-mobile-count]'));
const summaryMapMobileBackButton = document.querySelector('[data-summary-map-mobile-back]');
const summaryMapResultsTitle = document.querySelector('[data-summary-map-results-title]');
const summaryMapResults = document.querySelector('[data-summary-map-results]');
const summaryMapResultsNote = document.querySelector('[data-summary-map-results-note]');
const phoneBreakpoint = window.matchMedia('(max-width: 760px)');
const summaryMapMode = summaryMapShell instanceof HTMLElement ? (summaryMapShell.dataset.summaryMapMode || 'explore') : 'explore';
const summaryMapMobileLayout =
  summaryMapShell instanceof HTMLElement ? (summaryMapShell.dataset.summaryMapMobileLayout || 'collapse') : 'collapse';
const summaryMapSupportsMobileViews = summaryMapMobileLayout === 'list-map';
const summaryMapItemNounSingular =
  summaryMapShell instanceof HTMLElement ? (summaryMapShell.dataset.summaryMapItemSingular || 'river') : 'river';
const summaryMapItemNounPlural =
  summaryMapShell instanceof HTMLElement ? (summaryMapShell.dataset.summaryMapItemPlural || 'rivers') : 'rivers';

const activeFilters = {
  paddleable: summaryMapMode === 'explore',
  rating: '',
  search: '',
  state: '',
  difficulty: '',
  routeType: 'non-whitewater',
  camping: '',
  distance: '',
  paddleTime: '',
  paddleLength: '',
  sort: 'best-now',
};

let latestResults = [];
let hasLoadedBoardOnce = false;
let lastBoardSuccessAt = null;
let mapRuntime = null;
let summaryMapLibre = null;
let mapMarkers = [];
let mapMarkersByKey = new Map();
let mapConditionMarkers = [];
let summaryConditionMarkerRecords = null;
let summaryConditionMarkerMode = null;
let summaryConditionMarkerInstances = { zone: [], route: [] };
let summaryMapRenderVersion = 0;
let selectedSummaryMapKey = null;
let selectedSummaryMapZoneKey = null;
let selectedSummaryMapZoneRoutes = null;
let summaryMapCardFlashTimeout = 0;

const SUMMARY_ROUTE_LINE_COLOR_SELECTED = '#2563eb';
const SUMMARY_ROUTE_LINE_WIDTH = 4.2;
const SUMMARY_ROUTE_LINE_WIDTH_SELECTED = 8;
const SUMMARY_ROUTE_LINE_CASING_WIDTH = 7.4;
const SUMMARY_ROUTE_LINE_CASING_WIDTH_SELECTED = 13;
const stitchSummaryRiverLines = stitchRiverLines;
let lastSummaryMapItems = [];
let summaryTraceSignature = '';
let summaryOverviewRiverSignature = '';
let canonicalRiverGeometryPromise = null;
let canonicalRiverGeometryByRoute = new Map();
let canonicalRiverGeometryState = 'idle';
let userLocation = null;
let userLocationState = 'idle';
let locationEditing = false;
let selectedRadiusMiles = DEFAULT_RADIUS_MILES;
let selectedHomeDifficulties = ['any'];
let selectedHomePaddleTimes = ['any'];
let nearbySortMode = 'best-score';
let homeFilterSheetOpen = false;
let currentExplorePage = 1;
let lastExploreItems = [];
let exploreLockedHeight = 0;
let exploreLayoutKey = '';
let lastBoardGeneratedAt = null;
let summaryMapCollapsed = phoneBreakpoint.matches;
let summaryMapMobileView = summaryMapSupportsMobileViews && phoneBreakpoint.matches ? 'list' : 'map';
let initialized = false;
const { renderFeaturedMap } = createBoardFeaturedMapController({
  elements: {
    shell: featuredMapShell,
    container: featuredMap,
    status: featuredMapStatus,
    caption: featuredMapCaption,
  },
  getAccessPoints: (item) => routeAccessPoints(item),
  getRouteLine: async (item, points) => {
    await ensureCanonicalRiverGeometries();
    return summaryRiverTraceFeature(item) || featuredRouteFallbackFeature(points);
  },
  getTracedCoordinates: (routeLine) =>
    routeLine?.properties?.traced
      ? flattenSummaryRiverGeometry(routeLine.geometry).flat()
      : [],
  markerClassFor,
  markerLabel: visibleMapMarkerLabel,
  statusLabel: regionStateText,
  fitOptions: {
    padding: { top: 34, right: 30, bottom: 34, left: 30 },
    maxZoom: 10.4,
  },
  resizeBeforeMarkers: true,
});
const popupMarkup = createBoardMapPopupRenderer({
  isNearbyReady: (item) =>
    userLocationState === 'ready'
    && Boolean(userLocation)
    && Number.isFinite(item.travelMinutes),
  getLatestResults: () => latestResults,
  representativeRouteLabel,
  routeLabelForItem,
  mapMarkerLabel,
  mapMarkerContext,
});
const createRecommendationCard = createBoardRecommendationCardRenderer({
  template: recommendationTemplate,
  getLatestResults: () => latestResults,
  featuredRouteLabelForItem,
  supportingReasonList,
  decorateFavoriteButton,
  includeRouteType: true,
});
const renderRecommendationGrid = createBoardRecommendationGridRenderer({
  container: recommendationGrid,
  createRecommendationCard,
  refreshFavoriteButtons,
});
const updateFeaturedWeather = createBoardFeaturedWeatherRenderer({
  featuredWeather,
  featuredWeatherIcon,
  setLabel: (label) => setText(document, 'featured-weather-label', label),
});
const createCard = createBoardRiverCardRenderer({
  template: cardTemplate,
  getLatestResults: () => latestResults,
  routeLabelForItem,
  segmentLabelForItem,
  decorateFavoriteButton,
  metaLine: () => '',
  factsMarkup: cardFactsMarkup,
  datasetKey: 'summaryMapCard',
  clearCardSlot: true,
  onCardOpen: (item) => {
    if (summaryMapMode === 'explore') {
      openSummaryMapItem(item.key, { scrollCard: false });
    }
  },
});
const renderCardGrid = createBoardCardGridRenderer({
  createCard,
  refreshFavoriteButtons,
});
const {
  setHomeDifficultyFilter,
  setHomePaddleTimeFilter,
  setNearbySortMode,
  setRadiusMiles,
  updateFilterButtonStates,
} = createBoardPreferenceController({
  getResults: () => latestResults,
  renderBoard: (results) => renderHomepage(results),
  updateLocationStatus: () => updateLocationStatus(),
  radius: {
    normalize: normalizeRadiusMiles,
    setValue: (value) => {
      selectedRadiusMiles = value;
    },
    saveValue: saveRadiusMiles,
  },
  difficulty: {
    normalize: normalizeHomeDifficultyFilters,
    setValue: (value) => {
      selectedHomeDifficulties = value;
    },
    saveValue: saveHomeDifficultyFilter,
  },
  paddleTime: {
    normalize: normalizeHomePaddleTimeFilters,
    setValue: (value) => {
      selectedHomePaddleTimes = value;
    },
    saveValue: saveHomePaddleTimeFilter,
  },
  nearbySort: {
    options: HOME_NEARBY_SORT_OPTIONS,
    fallback: 'best-score',
    setValue: (value) => {
      nearbySortMode = value;
    },
    select: nearbySortSelect,
  },
  filterButtons,
  glanceFilterButtons,
  getActiveFilters: () => activeFilters,
});
const {
  distanceForResult,
  itemWithinSelectedRadius,
  resultWithinSelectedRadius,
  setUserLocation,
  shortLocationLabel,
  submitManualLocation,
  updateLocationIndicator,
} = createBoardLocationController({
  locationService: boardLocationService,
  getDefaultStatusTarget: () => locationSelected || homeLocationSortSummary,
  getLocationState: () => userLocationState,
  indicator: locationIndicator,
  indicatorLabel: locationIndicatorLabel,
  onEmptyQuery: () => updateLocationStatus(),
  getResults: () => latestResults,
  getUserLocation: () => userLocation,
  getSelectedRadius: () => selectedRadiusMiles,
  distanceBetween: distanceMiles,
  getSortMode: () => activeFilters.sort,
  setLocationState: (location, state) => {
    userLocation = location;
    userLocationState = state;
    locationEditing = false;
  },
  setSortMode: (mode) => {
    activeFilters.sort = mode;
  },
  saveLocation,
  resetPagination: () => {
    currentExplorePage = 1;
  },
  renderBoard: (results) => renderHomepage(results),
  updateLocationStatus: () => updateLocationStatus(),
  sortSelect,
  locationInput,
});
const {
  maybeUseGrantedLocation,
  requestUserLocation,
} = createBoardGeolocationController({
  navigatorObject: navigator,
  reverseGeocodeLocation: (latitude, longitude) =>
    boardLocationService.reverseGeocodeLocation(latitude, longitude),
  timeoutMs: GEOLOCATION_TIMEOUT_MS,
  hasUserLocation: () => Boolean(userLocation),
  onUnavailable: () => {
    locationEditing = false;
    userLocationState = 'unavailable';
    updateLocationStatus();
    renderHomepage(latestResults);
  },
  onPending: () => {
    locationEditing = false;
    userLocationState = 'pending';
    updateLocationStatus();
    updateLocationIndicator();
    if (latestResults.length > 0) {
      renderHomepage(latestResults);
    }
  },
  onResolved: (location) => setUserLocation(location),
  onDenied: () => {
    userLocationState = 'denied';
    updateLocationStatus();
    if (latestResults.length > 0) {
      renderHomepage(latestResults);
    }
  },
});
const summaryMapController = createBoardMapController({
  supportsMobileViews: summaryMapSupportsMobileViews,
  isPhone: () => phoneBreakpoint.matches,
  getMobileView: () => summaryMapMobileView,
  setMobileView: (view) => {
    summaryMapMobileView = view;
  },
  getCollapsed: () => summaryMapCollapsed,
  setCollapsed: (collapsed) => {
    summaryMapCollapsed = collapsed;
  },
  getItems: () => lastSummaryMapItems,
  getSelectedKey: () => selectedSummaryMapKey,
  getMapRuntime: () => mapRuntime,
  getResultsOptions: () => ({
    itemNounSingular: summaryMapItemNounSingular,
    itemNounPlural: summaryMapItemNounPlural,
    emptyText: mixedResultsNoMatchText({ nearby: isNearbySummaryMapMode() }),
  }),
  elements: {
    shell: summaryMapShell,
    toggle: summaryMapToggle,
    mobileSwitch: summaryMapMobileSwitch,
    mobileBackButton: summaryMapMobileBackButton,
    resultsTitle: summaryMapResultsTitle,
    resultsNote: summaryMapResultsNote,
    countNodes: summaryMapMobileCountNodes,
    viewButtons: summaryMapMobileViewButtons,
  },
  defaultResultsTitle: mixedResultsTitle,
  resultsRenderer: {
    container: summaryMapResults,
    setItems: (items) => {
      lastSummaryMapItems = items;
    },
    markerClassFor,
    mapMarkerLabel,
    routeLabelForItem,
    mapMarkerContext,
    getEmptyText: () => mixedResultsEmptyText({ nearby: isNearbySummaryMapMode() }),
    onOpen: (key) => openSummaryMapItem(key),
    onSelection: (key) => updateSummaryMapSelection(key, { preserveZone: true }),
  },
});
const EXPLORE_PAGE_SIZE = 12;
const SUMMARY_CACHE_KEY = 'river-summary:v2';
const {
  setBoardFetchBannerState,
  setBoardRefreshState,
  setCachedRefreshNote,
  showInitialFailure: showBoardInitialFailure,
  updateSummaryStatus,
} = createBoardStatusController({
  getLastSuccessAt: () => lastBoardSuccessAt,
  refreshReadyLabel: 'Refresh data',
  formatRefreshCopy: formatBoardRefreshCopy,
  joinWithBullet,
  elements: {
    summaryHeadline,
    summaryDetail,
    boardStatusBanner,
    boardFetchBanner,
    boardFetchTitle,
    boardFetchDetail,
    boardRefreshButton,
    boardRefreshNote,
    recommendationSummary,
  },
});
const { hydrateBoardFromCache, loadBoard } = createBoardLoaderController({
  cacheKey: SUMMARY_CACHE_KEY,
  getState: () => ({
    hasLoadedBoardOnce,
    lastBoardGeneratedAt,
    lastBoardSuccessAt,
  }),
  setLoadedState: (nextState) => {
    latestResults = nextState.latestResults;
    lastBoardGeneratedAt = nextState.lastBoardGeneratedAt;
    hasLoadedBoardOnce = nextState.hasLoadedBoardOnce;
    lastBoardSuccessAt = nextState.lastBoardSuccessAt;
  },
  renderBoard: (results, options) => renderHomepage(results, options),
  updateFreshness: (options) => updateHomeFreshness(options),
  setFetchBannerState: (state, detail) => setBoardFetchBannerState(state, detail),
  setRefreshState: (state, note) => setBoardRefreshState(state, note),
  setCachedRefreshNote,
  showInitialFailure: showBoardInitialFailure,
});
const SUMMARY_ROUTE_MARKER_ZOOM_IN = 8.5;
const SUMMARY_ROUTE_MARKER_ZOOM_OUT = 8.1;

function setText(scope, field, value) {
  const nodes = Array.from(scope.querySelectorAll(`[data-field="${field}"]`));
  for (const node of nodes) {
    node.textContent = value;
  }
  return nodes[0] ?? null;
}

const PADDLE_TIME_BUCKET_ORDER = ['up-to-3', '3-to-5', '5-to-7', '7-plus'];
const PADDLE_TIME_BUCKET_TARGET_MINUTES = {
  'up-to-3': 120,
  '3-to-5': 240,
  '5-to-7': 360,
  '7-plus': 510,
};

function routeDifficultyRankForResult(result) {
  const difficulty = result?.river?.difficulty;
  if (difficulty === 'easy') return 0;
  if (difficulty === 'moderate') return 1;
  if (difficulty === 'hard') return 2;
  return 3;
}

function routeTypeForResult(result) {
  return result?.river?.routeType === 'whitewater' ? 'whitewater' : 'recreational';
}

function isDefaultVisibleRoute(result) {
  return routeTypeForResult(result) !== 'whitewater';
}

function representativePreferenceContext(options = {}) {
  if (!options.useHomePreferences) {
    return {
      active: false,
      preferredDifficulties: [],
      preferredPaddleTimes: [],
      preferredDifficultyRanks: [],
      preferredPaddleTargets: [],
      preferredPaddleBucketIndexes: [],
    };
  }

  const preferredDifficulties = isChoiceSetAny(selectedHomeDifficulties)
    ? []
    : selectedHomeDifficulties.filter(Boolean);
  const preferredPaddleTimes = isChoiceSetAny(selectedHomePaddleTimes)
    ? []
    : selectedHomePaddleTimes.filter(Boolean);

  return {
    active: preferredDifficulties.length > 0 || preferredPaddleTimes.length > 0,
    preferredDifficulties,
    preferredPaddleTimes,
    preferredDifficultyRanks: preferredDifficulties.map((value) => routeDifficultyRankForResult({ river: { difficulty: value } })),
    preferredPaddleTargets: preferredPaddleTimes
      .map((value) => PADDLE_TIME_BUCKET_TARGET_MINUTES[value])
      .filter((value) => Number.isFinite(value)),
    preferredPaddleBucketIndexes: preferredPaddleTimes
      .map((value) => PADDLE_TIME_BUCKET_ORDER.indexOf(value))
      .filter((value) => value >= 0),
  };
}

function representativePreferenceMetrics(route, context) {
  const estimatedRange = parseEstimatedPaddleTimeRange(route?.river?.estimatedPaddleTime ?? '');
  const routeMinutes = estimatedRange ? (estimatedRange.minMinutes + estimatedRange.maxMinutes) / 2 : Number.POSITIVE_INFINITY;
  const routeBucket = paddleTimeBucketForLabel(route?.river?.estimatedPaddleTime ?? '');
  const routeBucketIndex = PADDLE_TIME_BUCKET_ORDER.indexOf(routeBucket);
  const difficultyRank = routeDifficultyRankForResult(route);

  const difficultyPenalty = context.preferredDifficultyRanks.length
    ? Math.min(...context.preferredDifficultyRanks.map((rank) => Math.abs(rank - difficultyRank)))
    : 0;

  const paddleBucketPenalty = context.preferredPaddleBucketIndexes.length
    ? routeBucketIndex === -1
      ? 10
      : Math.min(...context.preferredPaddleBucketIndexes.map((index) => Math.abs(index - routeBucketIndex)))
    : 0;

  const paddleMinutePenalty = context.preferredPaddleTargets.length
    ? Number.isFinite(routeMinutes)
      ? Math.min(...context.preferredPaddleTargets.map((target) => Math.abs(target - routeMinutes)))
      : Number.POSITIVE_INFINITY
    : 0;

  return {
    difficultyPenalty,
    paddleBucketPenalty,
    paddleMinutePenalty,
  };
}

function homePreferenceSummaryParts() {
  const parts = [];
  if (!isChoiceSetAny(selectedHomeDifficulties)) {
    parts.push(formatHomeChoiceSummary(selectedHomeDifficulties, titleCase, 'Any difficulty'));
  }
  if (!isChoiceSetAny(selectedHomePaddleTimes)) {
    const coversFullDay = selectedHomePaddleTimes.includes('5-to-7') && selectedHomePaddleTimes.includes('7-plus');
    parts.push(
      coversFullDay
        ? '5+ hr'
        : formatHomeChoiceSummary(selectedHomePaddleTimes, paddleTimePreferenceLabel, 'No preference')
    );
  }
  return parts;
}


function homeActivePreferenceCount() {
  let count = 0;
  if (selectedRadiusMiles !== DEFAULT_RADIUS_MILES) count += 1;
  if (!isChoiceSetAny(selectedHomeDifficulties)) count += 1;
  if (!isChoiceSetAny(selectedHomePaddleTimes)) count += 1;
  return count;
}

function homePreferenceSummaryTextClean() {
  const parts = homePreferenceSummaryParts();
  return parts.length > 0 ? parts.join(' / ') : '';
}

function homeRefineSummaryMarkup() {
  const labels = [];

  if (isChoiceSetAny(selectedHomeDifficulties)) {
    labels.push('Any difficulty');
  } else {
    labels.push(formatHomeChoiceSummary(selectedHomeDifficulties, titleCase, 'Any difficulty'));
  }

  if (isChoiceSetAny(selectedHomePaddleTimes)) {
    labels.push('Any time');
  } else if (selectedHomePaddleTimes.includes('5-to-7') && selectedHomePaddleTimes.includes('7-plus')) {
    labels.push('5+ hr');
  } else {
    labels.push(formatHomeChoiceSummary(selectedHomePaddleTimes, paddleTimePreferenceLabel, 'Any time'));
  }

  return labels
    .map((label) => `<span class="home-location-bar__refine-pill">${escapeHtml(label)}</span>`)
    .join('');
}

function formatRouteCountLabel(count, { withVerb = false } = {}) {
  return formatMixedResultCount(count, { withVerb });
}

function pickRepresentativeRoute(routes, mode, options = {}) {
  const copy = [...routes];
  const preferenceContext = representativePreferenceContext(options);
  const compareWithPreferences = (left, right, fallbackCompare) => {
    if (!preferenceContext.active) {
      return fallbackCompare(left, right);
    }

    const leftMetrics = representativePreferenceMetrics(left, preferenceContext);
    const rightMetrics = representativePreferenceMetrics(right, preferenceContext);

    if (leftMetrics.difficultyPenalty !== rightMetrics.difficultyPenalty) {
      return leftMetrics.difficultyPenalty - rightMetrics.difficultyPenalty;
    }

    if (leftMetrics.paddleBucketPenalty !== rightMetrics.paddleBucketPenalty) {
      return leftMetrics.paddleBucketPenalty - rightMetrics.paddleBucketPenalty;
    }

    if (leftMetrics.paddleMinutePenalty !== rightMetrics.paddleMinutePenalty) {
      return leftMetrics.paddleMinutePenalty - rightMetrics.paddleMinutePenalty;
    }

    return fallbackCompare(left, right);
  };

  const selectionMode = preferenceContext.active ? 'setup' : mode;

  if (mode === 'near-you' && userLocation) {
    copy.sort((left, right) =>
      compareWithPreferences(left, right, (candidateLeft, candidateRight) => {
        const leftMinutes = estimateTravelMinutes(distanceForResult(candidateLeft));
        const rightMinutes = estimateTravelMinutes(distanceForResult(candidateRight));
        const leftEffective = candidateLeft.score - distancePenalty(leftMinutes);
        const rightEffective = candidateRight.score - distancePenalty(rightMinutes);
        if (leftEffective !== rightEffective) {
          return rightEffective - leftEffective;
        }
        if (leftMinutes !== rightMinutes) {
          return leftMinutes - rightMinutes;
        }
        return compareResults(candidateLeft, candidateRight);
      })
    );
    return { route: copy[0] ?? null, mode: selectionMode };
  }

  if (mode === 'nearest' && userLocation) {
    copy.sort((left, right) =>
      compareWithPreferences(left, right, (candidateLeft, candidateRight) => {
        const leftDistance = distanceForResult(candidateLeft);
        const rightDistance = distanceForResult(candidateRight);
        if (leftDistance !== rightDistance) {
          return leftDistance - rightDistance;
        }
        return compareResults(candidateLeft, candidateRight);
      })
    );
    return { route: copy[0] ?? null, mode: selectionMode === 'setup' ? 'setup' : 'nearest' };
  }

  if (mode === 'highest-confidence') {
    copy.sort((left, right) => compareWithPreferences(left, right, compareConfidence));
    return { route: copy[0] ?? null, mode: selectionMode === 'setup' ? 'setup' : 'best' };
  }

  if (mode === 'lowest-risk') {
    copy.sort((left, right) => compareWithPreferences(left, right, compareLowestRisk));
    return { route: copy[0] ?? null, mode: selectionMode === 'setup' ? 'setup' : 'best' };
  }

  if (mode === 'a-z') {
    copy.sort((left, right) => compareWithPreferences(left, right, compareAZ));
    return { route: copy[0] ?? null, mode: selectionMode === 'setup' ? 'setup' : 'best' };
  }

  copy.sort((left, right) => compareWithPreferences(left, right, compareResults));
  return { route: copy[0] ?? null, mode: selectionMode === 'setup' ? 'setup' : 'best' };
}

function buildGroupedRiverLink(item) {
  const riverId = item?.cardRoute?.river?.riverId;
  if (!riverId) {
    return `/rivers/${item.cardRoute.river.slug}/`;
  }

  const params = new URLSearchParams();
  if (item?.cardRoute?.river?.slug) {
    params.set('route', item.cardRoute.river.slug);
  }

  const query = params.toString();
  return query.length > 0
    ? `/rivers/by-river/${encodeURIComponent(riverId)}/?${query}`
    : `/rivers/by-river/${encodeURIComponent(riverId)}/`;
}

function buildDisplayItems(allResults, filteredResults, selectionMode = 'best-now', options = {}) {
  const allByRiver = groupResultsByRiverId(allResults);
  const filteredByRiver = groupResultsByRiverId(filteredResults);
  const items = [];

  for (const [riverId, routes] of filteredByRiver.entries()) {
    const representative = pickRepresentativeRoute(routes, selectionMode, options);
    const cardRoute = representative.route;
    if (!cardRoute) continue;

    const segmentFilters = options.segmentFilters ?? null;
    const selectedSegment = segmentFilters ? selectRouteSegment(cardRoute, segmentFilters) : null;
    const segmentSummary = routeSegmentSummary(cardRoute.river);

    const totalRouteCount = allByRiver.get(riverId)?.length ?? routes.length;
    const distanceMilesValue = distanceForResult(cardRoute);
    const travelMinutes = estimateTravelMinutes(distanceMilesValue);
    const effectiveScore = cardRoute.score - distancePenalty(travelMinutes);
    const paddleableRouteCount = routes.filter((result) => ['Strong', 'Good'].includes(result.rating)).length;

    items.push({
      key: cardRoute.river.riverId || cardRoute.river.slug,
      kind: totalRouteCount > 1 ? 'group' : 'route',
      cardRoute,
      matchingRoutes: routes,
      allRiverRoutes: allByRiver.get(riverId) ?? routes,
      totalRouteCount,
      matchingRouteCount: routes.length,
      paddleableRouteCount,
      representativeMode: representative.mode,
      distanceMiles: distanceMilesValue,
      travelMinutes,
      effectiveScore,
      distanceBucket: distanceBucketLabel(travelMinutes),
      segmentSummary,
      selectedSegment,
    });
  }

  for (const item of items) {
    item.link = item.selectedSegment
      ? buildRoutePlannerHref(item.cardRoute.river.slug, item.selectedSegment)
      : item.kind === 'group'
        ? buildGroupedRiverLink(item)
        : `/rivers/${item.cardRoute.river.slug}/`;
  }

  return items;
}

function buildRouteMapItems(allResults, filteredResults, options = {}) {
  const allByRiver = groupResultsByRiverId(allResults);
  const filteredByRiver = groupResultsByRiverId(filteredResults);

  return [...filteredByRiver.entries()].flatMap(([groupKey, routes]) => {
      const representativeRoute = pickRepresentativeRoute(routes, 'best-now').route;
      // A filter can include legacy routes without river coordinates. Keep the
      // group visible by falling back to its first mappable route instead of
      // dropping the entire river from the Explore list/map.
      const cardRoute = [representativeRoute, ...routes].find((route) =>
        Number.isFinite(route?.river?.latitude) && Number.isFinite(route?.river?.longitude)
      );
      if (!cardRoute) return [];
      const totalRouteCount = allByRiver.get(groupKey)?.length ?? routes.length;
      const distanceMilesValue = distanceForResult(cardRoute);
      const travelMinutes = estimateTravelMinutes(distanceMilesValue);
      const segmentFilters = options.segmentFilters ?? null;
      const selectedSegment = segmentFilters ? selectRouteSegment(cardRoute, segmentFilters) : null;

      return {
        key: groupKey,
        kind: totalRouteCount > 1 ? 'group' : 'route',
        cardRoute,
        matchingRoutes: routes,
        allRiverRoutes: allByRiver.get(groupKey) ?? routes,
        totalRouteCount,
        matchingRouteCount: routes.length,
        paddleableRouteCount: routes.filter((result) => ['Strong', 'Good'].includes(result.rating)).length,
        representativeMode: 'route',
        distanceMiles: distanceMilesValue,
        travelMinutes,
        effectiveScore: cardRoute.score - distancePenalty(travelMinutes),
        distanceBucket: distanceBucketLabel(travelMinutes),
        segmentSummary: routeSegmentSummary(cardRoute.river),
        selectedSegment,
        link: selectedSegment
          ? buildRoutePlannerHref(cardRoute.river.slug, selectedSegment)
          : totalRouteCount > 1
            ? buildGroupedRiverLink({ cardRoute })
            : `/rivers/${cardRoute.river.slug}/`,
      };
    });
}

function matchesHomeNearbyFilters(result) {
  if (!isChoiceSetAny(selectedHomeDifficulties) && !selectedHomeDifficulties.includes(result?.river?.difficulty)) {
    return false;
  }

  if (!isChoiceSetAny(selectedHomePaddleTimes)) {
    const bucket = paddleTimeBucketForLabel(result?.river?.estimatedPaddleTime ?? '');
    if (!selectedHomePaddleTimes.includes(bucket)) {
      return false;
    }
  }

  return true;
}

function updateHomeFreshness({ generatedAt = lastBoardGeneratedAt, refreshing = false, fallback = false } = {}) {
  const freshnessNodes = homeFreshnessNodes.filter((node) => node instanceof HTMLElement);
  if (freshnessNodes.length === 0) {
    return;
  }

  for (const wrap of homeFreshnessWraps) {
    if (wrap instanceof HTMLElement) {
      wrap.hidden = false;
    }
  }

  const base = formatGeneratedFreshness(generatedAt);
  if (refreshing && generatedAt) {
    for (const node of freshnessNodes) {
      node.textContent = `${base} Refreshing now...`;
    }
    return;
  }

  if (fallback && generatedAt) {
    for (const node of freshnessNodes) {
      node.textContent = `${base} Showing latest available data.`;
    }
    return;
  }

  for (const node of freshnessNodes) {
    node.textContent = base;
  }
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


function routeAccessCoordinate(point, kind = 'access') {
  if (!Number.isFinite(point?.latitude) || !Number.isFinite(point?.longitude)) {
    return null;
  }

  return {
    ...point,
    kind,
    latitude: point.latitude,
    longitude: point.longitude,
  };
}

function routeAccessPoints(item) {
  const river = item?.cardRoute?.river;
  const sortedAccessPoints = Array.isArray(river?.accessPoints)
    ? river.accessPoints
        .map((point) => ({ point, coordinate: routeAccessCoordinate(point) }))
        .filter((entry) => entry.coordinate)
        .sort((left, right) => {
          const leftMile = Number(left.point.mileFromStart);
          const rightMile = Number(right.point.mileFromStart);
          return (Number.isFinite(leftMile) ? leftMile : 0) - (Number.isFinite(rightMile) ? rightMile : 0);
        })
        .map((entry, index, points) => ({
          ...entry.coordinate,
          kind: index === 0 ? 'putIn' : index === points.length - 1 ? 'takeOut' : 'access',
        }))
    : [];

  if (sortedAccessPoints.length >= 2) {
    return sortedAccessPoints;
  }

  const putIn = river?.putIn;
  const takeOut = river?.takeOut;
  return [
    routeAccessCoordinate(putIn, 'putIn'),
    routeAccessCoordinate(takeOut, 'takeOut'),
  ].filter(Boolean);
}

function cardFactsMarkup(item, showDistance) {
  const facts = [];

  if (showDistance && Number.isFinite(item.travelMinutes)) {
    facts.push(formatTravelLabel(item.travelMinutes));
  }

  facts.push(confidenceLabel(item));

  if (isGroupedItem(item)) {
    facts.push(routeCountLabel(item));
  }

  if (routeLengthLabel(item)) {
    facts.push(routeLengthLabel(item));
  }

  if (!isGroupedItem(item) || item.representativeMode === 'setup') {
    if (routeTypeLabel(item)) {
      facts.push(routeTypeLabel(item));
    }
    if (routeDifficultyLabel(item)) {
      facts.push(routeDifficultyLabel(item));
    }
    if (routeEstimatedTimeLabel(item)) {
      facts.push(routeEstimatedTimeLabel(item));
    }
  }

  return facts
    .filter(Boolean)
    .map((fact) => `<span class="river-card__fact">${escapeHtml(fact)}</span>`)
    .join('');
}

function supportingReasonList(item, nearbyReady) {
  return [];
}

function renderExploreList(items) {
  const explorePaginationState = paginateItems(items, EXPLORE_PAGE_SIZE, currentExplorePage);
  currentExplorePage = explorePaginationState.currentPage;
  updateExplorePagination(explorePaginationState);
  renderCardGrid(exploreGrid, explorePaginationState.items, {
    showDistance: userLocationState === 'ready' && userLocation,
    compact: Boolean(exploreSection),
  });
  updateSummaryMapSelection(selectedSummaryMapKey, { preserveZone: true });
  syncExploreShellHeight();
}

function currentExploreLayoutKey() {
  if (window.innerWidth <= 760) return 'mobile';
  if (window.innerWidth <= 1100) return 'tablet';
  if (window.innerWidth >= 1480) return 'wide';
  return 'desktop';
}

function syncExploreShellHeight() {
  if (!(exploreShell instanceof HTMLElement)) {
    return;
  }
  exploreShell.style.removeProperty('min-height');
}

function updateExplorePagination(pagination) {
  if (!(explorePagination instanceof HTMLElement)) {
    return;
  }

  const shouldShow = pagination.totalItems > EXPLORE_PAGE_SIZE;
  explorePagination.hidden = !shouldShow;

  if (explorePaginationSummary instanceof HTMLElement) {
    if (pagination.totalItems === 0) {
      explorePaginationSummary.textContent = 'No results match these filters.';
    } else {
      explorePaginationSummary.textContent = formatMixedPaginationSummary(pagination);
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

  if (exploreResultsCount instanceof HTMLElement) {
    if (pagination.totalItems === 0) {
      exploreResultsCount.textContent = '0 results';
    } else if (pagination.totalItems === 1) {
      exploreResultsCount.textContent = '1 result';
    } else {
      exploreResultsCount.textContent = `${pagination.totalItems} results`;
    }
  }
}

function updateFeaturedHero(nearbyItems, overallItems) {
  const locationReady = userLocationState === 'ready' && Boolean(userLocation);
  const preferredNearbyItems = recommendationPoolForNearby(nearbyItems);
  const nearbyReady = locationReady && preferredNearbyItems.length > 0;
  const item = nearbyReady ? preferredNearbyItems[0] : locationReady ? null : overallItems[0] ?? null;
  const activePreferenceText = homePreferenceSummaryTextClean();
  if (!item) {
    renderFeaturedMap(null, { visible: false, status: '' });
    if (featuredPanel instanceof HTMLElement) {
      featuredPanel.classList.toggle('home-featured--locked', !locationReady);
      featuredPanel.classList.toggle('home-featured--empty', locationReady);
      featuredPanel.classList.remove('hero-call--great', 'hero-call--good', 'hero-call--marginal', 'hero-call--no-go');
    }
    if (featuredLabel instanceof HTMLElement) {
      featuredLabel.textContent = locationReady ? 'Best current match' : 'Best pick right now';
    }
    if (featuredState instanceof HTMLElement) {
      featuredState.hidden = locationReady;
      featuredState.textContent = 'Enter a city or ZIP to see the best nearby paddle right now.';
    }
    if (featuredName instanceof HTMLAnchorElement) {
      featuredName.textContent = locationReady ? 'No picks in range' : 'Best pick right now';
      featuredName.href = locationReady ? '#best-options' : '#home-location';
    }
    if (featuredReach instanceof HTMLElement) {
      featuredReach.textContent = locationReady
        ? `Increase drive distance above ${selectedRadiusMiles} miles to compare more results.`
        : 'Enter a city or ZIP to unlock a personalized top pick.';
    }
    if (featuredBridge instanceof HTMLElement) {
      featuredBridge.textContent = locationReady
        ? ''
        : 'Enter a city or ZIP to unlock the top pick.';
    }
    setText(document, 'featured-score', '--');
    setText(document, 'featured-rating', locationReady ? 'Out of range' : 'Locked');
    setText(document, 'featured-verdict', locationReady ? 'Nothing in range yet' : 'Enter your location');
    setText(
      document,
      'featured-reason',
      locationReady
        ? 'Paddle Today currently covers Midwest routes only.'
        : 'Add a location to see drive time and nearby ranking.'
      );
    setText(document, 'featured-facts-label', locationReady ? '' : 'Route facts');
    setText(document, 'featured-confidence', locationReady ? '' : 'Data confidence coming in');
    setText(
      document,
      'featured-distance',
      locationReady ? `Increase to ${nextRadiusSuggestionMiles(selectedRadiusMiles)} mi` : 'Add a location for drive time'
    );
    setText(
      document,
      'featured-difficulty',
      isChoiceSetAny(selectedHomeDifficulties)
        ? 'Any difficulty'
        : formatHomeChoiceSummary(selectedHomeDifficulties, titleCase, 'Any difficulty')
    );
    setText(
      document,
      'featured-paddle-time',
      isChoiceSetAny(selectedHomePaddleTimes)
        ? 'Any paddle time'
        : selectedHomePaddleTimes.includes('5-to-7') && selectedHomePaddleTimes.includes('7-plus')
          ? '5+ hr'
          : formatHomeChoiceSummary(selectedHomePaddleTimes, paddleTimePreferenceLabel, 'Any paddle time')
    );
    if (featuredConfidence instanceof HTMLElement) {
      featuredConfidence.hidden = locationReady;
    }
    if (featuredDistance instanceof HTMLElement) {
      featuredDistance.hidden = false;
    }
    if (featuredDifficulty instanceof HTMLElement) {
      featuredDifficulty.hidden = locationReady ? isChoiceSetAny(selectedHomeDifficulties) : false;
    }
    if (featuredPaddleTime instanceof HTMLElement) {
      featuredPaddleTime.hidden = locationReady ? isChoiceSetAny(selectedHomePaddleTimes) : false;
    }
    updateFeaturedWeather(null);
    setText(
      document,
      'featured-signal',
      locationReady
        ? ''
        : 'Gauge, weather, and data confidence details will show up here.'
    );
    if (featuredReasons instanceof HTMLElement) {
      featuredReasons.innerHTML = '';
      featuredReasons.hidden = true;
    }
    if (featuredLink instanceof HTMLAnchorElement) {
      featuredLink.href = locationReady ? '/explore/' : '#home-location';
      featuredLink.textContent = locationReady ? 'Browse all results' : 'Set location first';
    }
    if (featuredJumpLink instanceof HTMLElement) {
      featuredJumpLink.hidden = locationReady;
    }
    renderScoreBreakdownDisclosure(featuredPanel, null);
    return;
  }
  renderFeaturedMap(item, { visible: nearbyReady, status: regionStateText(item) });
  const ratingKey = ratingToneKey(item.cardRoute.rating);
  if (featuredPanel instanceof HTMLElement) {
    featuredPanel.classList.toggle('home-featured--locked', !locationReady);
    featuredPanel.classList.remove('home-featured--empty');
    featuredPanel.classList.remove('hero-call--great', 'hero-call--good', 'hero-call--marginal', 'hero-call--no-go');
    featuredPanel.classList.add(`hero-call--${ratingKey}`);
  }
  if (featuredLabel instanceof HTMLElement) {
    featuredLabel.textContent = activePreferenceText ? 'Best fit for your setup' : 'Best pick near you';
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
  if (featuredBridge instanceof HTMLElement) {
    featuredBridge.textContent = activePreferenceText
      ? 'Best fit for your current setup.'
      : 'Best fit based on your location.';
  }
  setText(document, 'featured-score', String(item.cardRoute.score));
  setText(document, 'featured-rating', ratingDisplayLabel(item.cardRoute.rating, { liveData: item.cardRoute.liveData, compact: true }));
  setText(document, 'featured-verdict', recommendationVerdict(item));
    setText(document, 'featured-reason', recommendationSummaryText(item, nearbyReady, latestResults));
    renderScoreBreakdownDisclosure(featuredPanel, item.cardRoute.scoreBreakdown);
  setText(document, 'featured-facts-label', isGroupedItem(item) ? 'River facts' : 'Route facts');
  setText(document, 'featured-confidence', confidenceLabel(item));
  setText(
    document,
    'featured-distance',
    nearbyReady && Number.isFinite(item.travelMinutes)
      ? formatTravelLabel(item.travelMinutes)
      : userLocationState === 'pending'
        ? 'Finding drive time'
        : 'Add a location for drive time'
  );
  setText(
    document,
    'featured-difficulty',
    routeDifficultyLabel(item)
      ? routeDifficultyLabel(item)
      : 'Difficulty varies'
  );
  setText(
    document,
    'featured-paddle-time',
    routeEstimatedTimeLabel(item)
      ? routeEstimatedTimeLabel(item)
      : 'Paddle time varies'
  );
  if (featuredDifficulty instanceof HTMLElement) {
    featuredDifficulty.hidden = false;
  }
  if (featuredPaddleTime instanceof HTMLElement) {
    featuredPaddleTime.hidden = false;
  }
  if (featuredConfidence instanceof HTMLElement) {
    featuredConfidence.hidden = false;
  }
  if (featuredDistance instanceof HTMLElement) {
    featuredDistance.hidden = false;
  }
  updateFeaturedWeather(item);
  if (featuredSignal instanceof HTMLElement) {
    featuredSignal.innerHTML = signalRowMarkup(item);
  }
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
    featuredLink.textContent = mixedCardLinkLabel(isGroupedItem(item));
  }
  if (featuredJumpLink instanceof HTMLElement) {
    featuredJumpLink.hidden = false;
  }
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
  const preferredNearbyItems = recommendationPoolForNearby(nearbyItems);
  const nearbyReady = locationReady && preferredNearbyItems.length > 0;
  const recommendationItems = buildBoardRecommendationItems(
    nearbyItems,
    overallItems,
    locationReady,
    nearbySortMode,
  );
  const activePreferenceText = homePreferenceSummaryTextClean();

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

  recommendationTitle.textContent = locationReady ? 'Compare nearby picks' : 'More good picks nearby';

  recommendationSummary.textContent = locationReady
    ? activePreferenceText
      ? `Start with the best match above, then compare nearby picks within ${selectedRadiusMiles} miles of ${shortLocationLabel()} that fit ${activePreferenceText}.`
      : `Start with the best match above, then compare nearby picks within ${selectedRadiusMiles} miles of ${shortLocationLabel()}.`
    : 'Enter a city or ZIP above to compare nearby picks.';

  if (recommendationCount instanceof HTMLElement) {
    recommendationCount.textContent = locationReady
      ? formatRouteCountLabel(preferredNearbyItems.length)
      : 'Showing 0 routes';
  }

  if (recommendationItems.length === 0) {
    recommendationEmpty.textContent = locationReady
      ? activePreferenceText
      ? `No recommended picks currently match ${activePreferenceText} within ${selectedRadiusMiles} miles.`
      : `No recommended picks are currently available within ${selectedRadiusMiles} miles.`
    : 'No recommended picks are available right now.';
    recommendationEmpty.hidden = false;
    renderRecommendationGrid([], locationReady);
    return;
  }

  recommendationEmpty.hidden = true;
  renderRecommendationGrid(recommendationItems, locationReady);
}

function matchesRouteFilters(result) {
  if (!matchesBoardRatingFilter(result.rating, activeFilters)) {
    return false;
  }

  if (activeFilters.state && result.river.state !== activeFilters.state) {
    return false;
  }

  if (activeFilters.difficulty && result.river.difficulty !== activeFilters.difficulty) {
    return false;
  }

  if (activeFilters.routeType === 'non-whitewater' && routeTypeForResult(result) === 'whitewater') {
    return false;
  }

  if (activeFilters.routeType === 'whitewater' && routeTypeForResult(result) !== 'whitewater') {
    return false;
  }

  if (activeFilters.camping) {
    const logistics = result?.river?.logistics;
    const classification = logistics?.campingClassification ?? classifyCamping(logistics?.camping);

    if (activeFilters.camping === 'any-support' && !hasCampingSupport(classification)) {
      return false;
    }
    if (activeFilters.camping === 'overnight' && !hasOvernightCampingSupport(classification)) {
      return false;
    }
    if (activeFilters.camping === 'endpoint' && classification !== 'endpoint_campground') {
      return false;
    }
    if (activeFilters.camping === 'nearby' && classification !== 'nearby_basecamp') {
      return false;
    }
  }

  if (activeFilters.distance) {
    if (!userLocation) {
      return false;
    }

    const maxDistanceMiles = Number(activeFilters.distance);
    if (!Number.isFinite(maxDistanceMiles) || distanceForResult(result) > maxDistanceMiles) {
      return false;
    }
  }

  if (activeFilters.paddleTime || activeFilters.paddleLength) {
    if (!routeMatchesPaddleFilters(result, {
      paddleTime: activeFilters.paddleTime,
      paddleLength: activeFilters.paddleLength,
    })) {
      return false;
    }
  }

  if (activeFilters.search) {
    const aliases = Array.isArray(result.river.aliases) ? result.river.aliases.join(' ') : '';
    const haystack = `${result.river.name} ${result.river.reach} ${aliases} ${result.river.state} ${result.river.region}`.toLowerCase();
    if (!haystack.includes(activeFilters.search.toLowerCase())) {
      return false;
    }
  }

  return true;
}

function getFilteredResults(results) {
  return results.filter(matchesRouteFilters);
}

function resetExploreFilters({ rerender = true } = {}) {
  activeFilters.paddleable = true;
  activeFilters.rating = '';
  activeFilters.search = '';
  activeFilters.state = '';
  activeFilters.difficulty = '';
  activeFilters.routeType = 'non-whitewater';
  activeFilters.camping = '';
  activeFilters.distance = '';
  activeFilters.paddleTime = '';
  activeFilters.paddleLength = '';
  activeFilters.sort = userLocationState === 'ready' && userLocation ? 'near-you' : 'best-now';
  currentExplorePage = 1;

  if (filterSearch instanceof HTMLInputElement) {
    filterSearch.value = '';
  }
  if (filterState instanceof HTMLSelectElement) {
    filterState.value = '';
  }
  if (filterRating instanceof HTMLSelectElement) {
    filterRating.value = '';
  }
  if (filterDifficulty instanceof HTMLSelectElement) {
    filterDifficulty.value = '';
  }
  if (filterRouteType instanceof HTMLSelectElement) {
    filterRouteType.value = activeFilters.routeType;
  }
  if (filterCamping instanceof HTMLSelectElement) {
    filterCamping.value = '';
  }
  if (filterDistance instanceof HTMLSelectElement) {
    filterDistance.value = '';
  }
  if (filterPaddleTime instanceof HTMLSelectElement) {
    filterPaddleTime.value = '';
  }
  if (filterPaddleLength instanceof HTMLSelectElement) {
    filterPaddleLength.value = '';
  }
  if (sortSelect instanceof HTMLSelectElement) {
    sortSelect.value = activeFilters.sort;
  }

  updateFilterButtonStates();
  updateRatingFilterButtons();
  updateLocationIndicator();

  if (rerender && latestResults.length > 0) {
    renderHomepage(latestResults);
  }
}

function updateLocationStatus() {
  const locationReady = Boolean(userLocation && userLocationState === 'ready');
  if (!locationReady && homeFilterSheetOpen) {
    homeFilterSheetOpen = false;
    document.body.classList.remove('home-filter-sheet-open');
  }
  const filtersOpen = locationReady && homeFilterSheetOpen;
  const mobileSheetOpen = filtersOpen && phoneBreakpoint.matches;

  if (homeLocationSummary instanceof HTMLElement) {
    if (userLocationState === 'pending') {
      homeLocationSummary.textContent = 'Finding your location...';
    } else if (locationReady) {
      homeLocationSummary.textContent = shortLocationLabel();
    } else if (userLocationState === 'denied' || userLocationState === 'unavailable') {
      homeLocationSummary.textContent = 'Enter a city or ZIP to get started';
    } else {
      homeLocationSummary.textContent = 'Enter a city or ZIP to get started';
    }
  }

  if (homeLocationSortSummary instanceof HTMLElement) {
    if (userLocationState === 'pending') {
      homeLocationSortSummary.hidden = false;
        homeLocationSortSummary.textContent = 'Finding nearby picks...';
    } else if (locationReady && locationEditing) {
      homeLocationSortSummary.hidden = false;
      homeLocationSortSummary.textContent = 'Enter a new city or ZIP to compare another area.';
    } else if (locationReady) {
      homeLocationSortSummary.hidden = true;
      homeLocationSortSummary.textContent = '';
    } else {
      homeLocationSortSummary.hidden = false;
      homeLocationSortSummary.textContent = 'Enter your location to see nearby picks and drive times.';
    }
  }

  if (homeRefineRow instanceof HTMLElement) {
    homeRefineRow.hidden = !locationReady;
  }

  if (homeRadiusPanel instanceof HTMLElement) {
    homeRadiusPanel.hidden = !filtersOpen;
    homeRadiusPanel.classList.toggle('home-radius-panel--sheet-open', mobileSheetOpen);
  }

  if (homeRadiusSummary instanceof HTMLElement) {
    homeRadiusSummary.textContent = `Showing picks within ${selectedRadiusMiles} miles`;
  }

  if (homeRefineSummary instanceof HTMLElement) {
    homeRefineSummary.innerHTML = homeRefineSummaryMarkup();
  }

  if (homeRadiusSlider instanceof HTMLInputElement) {
    homeRadiusSlider.value = String(radiusIndexForMiles(selectedRadiusMiles));
  }

  for (const button of homeDifficultyButtons) {
    if (!(button instanceof HTMLButtonElement)) {
      continue;
    }
    const value = button.dataset.value ?? 'any';
    const isActive = value === 'any'
      ? isChoiceSetAny(selectedHomeDifficulties)
      : selectedHomeDifficulties.includes(value);
    button.classList.toggle('filter-chip--active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  }

  for (const button of homePaddleTimeButtons) {
    if (!(button instanceof HTMLButtonElement)) {
      continue;
    }
    const value = button.dataset.value ?? 'any';
    const isActive = value === 'any'
      ? isChoiceSetAny(selectedHomePaddleTimes)
      : selectedHomePaddleTimes.includes(value);
    button.classList.toggle('filter-chip--active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  }

  for (const button of homePresetButtons) {
    if (!(button instanceof HTMLButtonElement)) {
      continue;
    }

    const preset = button.dataset.homePreset || button.dataset.preset;
    const isQuickFloat =
      preset === 'quick-float' &&
      selectedHomeDifficulties.length === 1 &&
      selectedHomeDifficulties[0] === 'easy' &&
      selectedHomePaddleTimes.length === 1 &&
      selectedHomePaddleTimes[0] === 'up-to-3';
    const isFullDay =
      preset === 'full-day' &&
      selectedHomeDifficulties.join(',') === 'moderate,hard' &&
      selectedHomePaddleTimes.join(',') === '5-to-7,7-plus';
    const isActive = isQuickFloat || isFullDay;
    button.classList.toggle('filter-chip--active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  }

  if (homeFilterToggle instanceof HTMLButtonElement) {
    homeFilterToggle.hidden = !locationReady;
    homeFilterToggle.setAttribute('aria-expanded', filtersOpen ? 'true' : 'false');
  }

  if (homeFilterToggleLabel instanceof HTMLElement) {
      homeFilterToggleLabel.textContent = !phoneBreakpoint.matches && filtersOpen
        ? 'Hide filters'
        : 'Show filters';
  } else if (homeFilterToggle instanceof HTMLButtonElement) {
    homeFilterToggle.textContent = filtersOpen ? 'Hide filters' : 'Show filters';
  }

  if (homeFilterToggleCount instanceof HTMLElement) {
    const activeCount = homeActivePreferenceCount();
    homeFilterToggleCount.textContent = activeCount > 0 ? `${activeCount} active` : 'Defaults';
  }

  if (homeFilterBackdrop instanceof HTMLElement) {
    homeFilterBackdrop.hidden = !mobileSheetOpen;
  }

  if (homeRouteMix instanceof HTMLElement) {
    homeRouteMix.hidden = !locationReady;
  }

  if (homeNearbyMapSection instanceof HTMLElement) {
    homeNearbyMapSection.hidden = !locationReady;
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

  if (filterDistance instanceof HTMLSelectElement) {
    filterDistance.disabled = !locationReady;
    if (!locationReady && activeFilters.distance) {
      activeFilters.distance = '';
      filterDistance.value = '';
    }
  }

  const searchField = locationInput instanceof HTMLInputElement
    ? locationInput.closest('.location-panel__search')
    : null;
  if (searchField instanceof HTMLElement) {
    searchField.hidden = locationReady && !locationEditing && locationEditTrigger instanceof HTMLButtonElement;
  }

  const submitButton = locationForm?.querySelector('button[type="submit"]');
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.hidden = true;
  }

  if (locationForm instanceof HTMLFormElement) {
    locationForm.classList.toggle('location-panel__form--compact', false);
  }

}

function setHomeFilterSheetOpen(nextOpen) {
  homeFilterSheetOpen = Boolean(nextOpen) && userLocationState === 'ready' && Boolean(userLocation);
  document.body.classList.toggle('home-filter-sheet-open', phoneBreakpoint.matches && homeFilterSheetOpen);
  updateLocationStatus();
}

function updateHomeNearbyCounters(results) {
  const count = Array.isArray(results) ? results.length : 0;
  const showingCopy = formatRouteCountLabel(count);
  const matchingCopy = count === 1 ? '1 route matches your filters' : `${count} routes match your filters`;

  if (homeMatchCount instanceof HTMLElement) {
    homeMatchCount.textContent = showingCopy;
  }
  if (homeLiveCount instanceof HTMLElement) {
    homeLiveCount.textContent = matchingCopy;
  }
}

function updateFilterSummary(exploreItems) {
  updateExploreFilterPills();

  if (!(filterSummary instanceof HTMLElement)) {
    return;
  }

  const sortLabel = exploreSortSummaryLabel(activeFilters.sort);
  if (exploreItems.length === 0) {
    filterSummary.textContent = 'No results match these filters.';
    return;
  }

  const locationLabel =
    userLocationState === 'ready' && userLocation && (activeFilters.sort === 'near-you' || activeFilters.sort === 'nearest')
      ? ` from ${shortLocationLabel()}`
      : '';
  const ratingLabel = activeFilters.rating ? ` / ${ratingDisplayLabel(activeFilters.rating)} only` : '';
  filterSummary.textContent = formatMixedFilterSummary(exploreItems.length, { sortLabel, locationLabel, ratingLabel });
}

function updateRatingFilterButtons() {
  for (const button of filterRatingButtons) {
    if (!(button instanceof HTMLButtonElement)) continue;
    const active = (button.dataset.filterRatingButton || '') === activeFilters.rating;
    button.classList.toggle('score-filter__option--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }
}

function buildExploreFilterPills() {
  const pills = [];
  const normalizedSortMode = normalizeBoardSortMode(
    activeFilters.sort,
    userLocationState === 'ready' && Boolean(userLocation)
  );

  if (normalizedSortMode === 'near-you') {
    pills.push({
      label: 'Best by drive time',
      tone: 'sort',
    });
  } else if (normalizedSortMode === 'nearest') {
    pills.push({
      label: 'Closest first',
      tone: 'sort',
    });
  } else if (normalizedSortMode === 'highest-confidence') {
    pills.push({
      label: 'Highest data confidence',
      tone: 'sort',
    });
  } else if (normalizedSortMode === 'lowest-risk') {
    pills.push({
      label: 'Lowest-risk',
      tone: 'sort',
    });
  } else if (normalizedSortMode === 'a-z') {
    pills.push({
      label: 'A-Z',
      tone: 'sort',
    });
  } else {
    pills.push({
      label: 'Top picks today',
      tone: 'sort',
    });
  }

  if (userLocationState === 'ready' && userLocation && (normalizedSortMode === 'near-you' || normalizedSortMode === 'nearest')) {
    pills.push({
      label: shortLocationLabel(),
      tone: 'location',
    });
  }

  if (activeFilters.search) {
    pills.push({
      label: `Search: ${activeFilters.search}`,
      tone: 'filter',
    });
  }

  if (activeFilters.state) {
    pills.push({
      label: activeFilters.state,
      tone: 'filter',
    });
  }

  if (activeFilters.difficulty) {
    pills.push({
      label: titleCase(activeFilters.difficulty),
      tone: 'filter',
    });
  }

  if (activeFilters.routeType === 'non-whitewater') {
    pills.push({
      label: 'Non-whitewater',
      tone: 'filter',
    });
  } else if (activeFilters.routeType === 'whitewater') {
    pills.push({
      label: 'Whitewater only',
      tone: 'filter',
    });
  } else if (activeFilters.routeType === 'all') {
    pills.push({
      label: 'All route types',
      tone: 'filter',
    });
  }

  if (activeFilters.camping) {
    const campingLabels = {
      'any-support': 'Camping available',
      overnight: 'On-route or overnight',
      endpoint: 'Endpoint campground',
      nearby: 'Nearby basecamp',
    };
    pills.push({
      label: campingLabels[activeFilters.camping] ?? 'Camping',
      tone: 'filter',
    });
  }

  if (activeFilters.distance && userLocation) {
    pills.push({
      label: `Within ${activeFilters.distance} mi`,
      tone: 'filter',
    });
  }

  if (activeFilters.paddleTime) {
    pills.push({
      label: paddleTimePreferenceLabel(activeFilters.paddleTime),
      tone: 'filter',
    });
  }

  if (activeFilters.paddleLength) {
    const labels = {
      'under-5': 'Under 5 mi',
      '5-to-10': '5–10 mi',
      '10-plus': '10+ mi',
    };
    pills.push({
      label: labels[activeFilters.paddleLength] ?? 'Paddle length',
      tone: 'filter',
    });
  }

  if (activeFilters.paddleable && !activeFilters.rating) {
    pills.push({
      label: 'Strong + Good',
      tone: 'filter',
    });
  }

  if (activeFilters.rating) {
    pills.push({
      label: activeFilters.rating === 'all' ? 'All scores' : `${activeFilters.rating} only`,
      tone: 'filter',
    });
  }

  return pills;
}

function updateExploreFilterPills() {
  if (!(filterPills instanceof HTMLElement)) {
    return;
  }

  const pills = buildExploreFilterPills();
  filterPills.innerHTML = pills
    .map(({ label, tone }) => `<span class="explore-workspace__filter-pill explore-workspace__filter-pill--${tone}">${escapeHtml(label)}</span>`)
    .join('');
}

function updateBoardStatusBanner(items) {
  if (!(boardStatusBanner instanceof HTMLElement)) {
    return;
  }

  boardStatusBanner.classList.add('status-banner--hidden');
  return;

  const liveCount = items.filter((item) => item.cardRoute.liveData.overall === 'live').length;
  const degradedCount = items.filter((item) => item.cardRoute.liveData.overall === 'degraded').length;
  const offlineCount = items.filter((item) => item.cardRoute.liveData.overall === 'offline').length;

  boardStatusBanner.classList.remove('status-banner--live', 'status-banner--degraded', 'status-banner--offline', 'status-banner--loading');

  if (offlineCount > 0) {
    boardStatusBanner.classList.remove('status-banner--hidden');
    boardStatusBanner.classList.add('status-banner--offline');
    if (boardBannerTitle instanceof HTMLElement) {
      boardBannerTitle.textContent = `${offlineCount} results have live-feed issues.`;
    }
    if (boardBannerDetail instanceof HTMLElement) {
      boardBannerDetail.textContent = 'Look for the warning icon on affected cards before you drive.';
    }
    return;
  }

  if (degradedCount > 0) {
    boardStatusBanner.classList.remove('status-banner--hidden');
    boardStatusBanner.classList.add('status-banner--degraded');
    if (boardBannerTitle instanceof HTMLElement) {
      boardBannerTitle.textContent = `${degradedCount} results have limited live reads.`;
    }
    if (boardBannerDetail instanceof HTMLElement) {
      boardBannerDetail.textContent = 'Those cards are still usable, but some live inputs are stale or partial.';
    }
    return;
  }

  boardStatusBanner.classList.add('status-banner--hidden');
}

function isSummaryMapStyleReady() {
  return isMapReady(mapRuntime);
}

async function waitForSummaryMapReady() {
  await waitForMapReady(mapRuntime);
}

function bindSummaryMapLayerRefresh() {
  if (!mapRuntime || mapRuntime.__paddleTodaySummaryLayerRefreshBound) {
    return;
  }

  const refresh = () => {
    if (!isSummaryMapStyleReady()) {
      return;
    }
    syncSummaryMapLayers(lastSummaryMapItems);
    syncSummaryRouteLine();
  };

  mapRuntime.__paddleTodaySummaryLayerRefreshBound = true;
  mapRuntime.on('styledata', refresh);
  mapRuntime.on('idle', () => {
    if (isRiverFirstExploreMap() && canonicalRiverGeometryState !== 'ready') {
      syncSummaryOverviewRiverLayer(lastSummaryMapItems);
    }
    if (selectedSummaryMapKey) {
      syncSummaryRouteLine();
    }
  });
  mapRuntime.on('moveend', () => {
    syncSummaryRouteLine();
    updateSummaryMarkerZoomMode();
  });
}

function summaryRiverName(item) {
  return String(item?.cardRoute?.river?.name || '').trim();
}

function coverageRouteItems(item, routes = null) {
  return (routes || routesForRiverItem(item)).map((cardRoute) => ({
    ...item,
    key: `${item.key}:${cardRoute.river.slug}`,
    kind: 'route',
    cardRoute,
  }));
}

function summaryCoverageAccessPoints(item, routes = null) {
  return coverageRouteItems(item, routes).flatMap((routeItem) => routeAccessPoints(routeItem));
}

function summaryRouteLineFeature(item) {
  const accessPoints = routeAccessPoints(item);
  if (accessPoints.length < 2) {
    return null;
  }

  return {
    type: 'Feature',
    properties: {
      key: item.key,
      rating: item.cardRoute.rating,
      traced: false,
    },
    geometry: {
      type: 'LineString',
      coordinates: accessPoints.map((point) => [point.longitude, point.latitude]),
    },
  };
}

function summaryRiverCoverageFeature(item, routes = null) {
  const lines = [];
  const fingerprints = new Set();

  for (const routeItem of coverageRouteItems(item, routes)) {
    const feature = summaryRiverTraceFeature(routeItem) || summaryRouteLineFeature(routeItem);
    for (const line of flattenSummaryRiverGeometry(feature?.geometry)) {
      const fingerprint = summaryLineFingerprint(line);
      if (fingerprints.has(fingerprint)) continue;
      fingerprints.add(fingerprint);
      lines.push(line);
    }
  }

  if (lines.length === 0) return null;
  return {
    type: 'Feature',
    properties: {
      key: item.key,
      rating: item.cardRoute.rating,
      traced: true,
      routeCount: (routes || routesForRiverItem(item)).length,
    },
    geometry: lines.length === 1
      ? { type: 'LineString', coordinates: lines[0] }
      : { type: 'MultiLineString', coordinates: lines },
  };
}

function flattenSummaryRiverGeometry(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'LineString') {
    return [geometry.coordinates].filter((line) => Array.isArray(line) && line.length >= 2);
  }
  if (geometry.type === 'MultiLineString') {
    return geometry.coordinates.filter((line) => Array.isArray(line) && line.length >= 2);
  }
  return [];
}

function projectedSummaryPoint(coordinate, referenceLatitude) {
  const latitudeScale = Math.cos((referenceLatitude * Math.PI) / 180);
  return { x: coordinate[0] * latitudeScale, y: coordinate[1] };
}

function summaryDistanceToSegmentSquared(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) {
    const pointDx = point.x - start.x;
    const pointDy = point.y - start.y;
    return { distanceSquared: pointDx * pointDx + pointDy * pointDy, t: 0 };
  }

  const rawT = ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared;
  const t = Math.max(0, Math.min(1, rawT));
  const closest = {
    x: start.x + dx * t,
    y: start.y + dy * t,
  };
  const closestDx = point.x - closest.x;
  const closestDy = point.y - closest.y;
  return { distanceSquared: closestDx * closestDx + closestDy * closestDy, t };
}

function summaryLineMeasurements(line) {
  const measurements = [0];
  let total = 0;
  for (let index = 1; index < line.length; index += 1) {
    const previous = line[index - 1];
    const current = line[index];
    const referenceLatitude = (previous[1] + current[1]) / 2;
    const start = projectedSummaryPoint(previous, referenceLatitude);
    const end = projectedSummaryPoint(current, referenceLatitude);
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    total += Math.sqrt(dx * dx + dy * dy);
    measurements.push(total);
  }
  return measurements;
}

function nearestSummaryMeasureOnLine(line, measurements, target) {
  let best = null;
  if (!Number.isFinite(target?.longitude) || !Number.isFinite(target?.latitude)) return null;
  const targetCoordinate = [target.longitude, target.latitude];

  for (let index = 1; index < line.length; index += 1) {
    const previous = line[index - 1];
    const current = line[index];
    const referenceLatitude = (previous[1] + current[1] + targetCoordinate[1]) / 3;
    const result = summaryDistanceToSegmentSquared(
      projectedSummaryPoint(targetCoordinate, referenceLatitude),
      projectedSummaryPoint(previous, referenceLatitude),
      projectedSummaryPoint(current, referenceLatitude)
    );
    const segmentLength = measurements[index] - measurements[index - 1];
    const measure = measurements[index - 1] + segmentLength * result.t;
    if (!best || result.distanceSquared < best.distanceSquared) {
      best = { distanceSquared: result.distanceSquared, measure };
    }
  }
  return best;
}

function summaryLineFingerprint(line) {
  return line.map((coordinate) => coordinate.map((value) => value.toFixed(6)).join(',')).join(';');
}

function clipSummarySegmentToBounds(start, end, bounds) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  let lower = 0;
  let upper = 1;
  const constraints = [
    [-dx, start[0] - bounds.minLongitude],
    [dx, bounds.maxLongitude - start[0]],
    [-dy, start[1] - bounds.minLatitude],
    [dy, bounds.maxLatitude - start[1]],
  ];

  for (const [coefficient, value] of constraints) {
    if (coefficient === 0) {
      if (value < 0) return null;
      continue;
    }
    const ratio = value / coefficient;
    if (coefficient < 0) {
      if (ratio > upper) return null;
      if (ratio > lower) lower = ratio;
    } else {
      if (ratio < lower) return null;
      if (ratio < upper) upper = ratio;
    }
  }

  const pointAt = (t) => [start[0] + dx * t, start[1] + dy * t];
  return [pointAt(lower), pointAt(upper)];
}

function clipSummaryLineToBounds(line, bounds) {
  const clipped = [];
  for (let index = 1; index < line.length; index += 1) {
    const segment = clipSummarySegmentToBounds(line[index - 1], line[index], bounds);
    if (segment) clipped.push(segment);
  }
  return clipped;
}

function summaryFeatureMatchesItem(feature, item) {
  const names = new Set(riverNameVariants(summaryRiverName(item)).map((name) => name.toLowerCase()));
  const properties = feature?.properties ?? {};
  return ['name', 'name_en', 'name:en', 'name:latin'].some((key) => {
    const value = properties[key];
    return typeof value === 'string' && names.has(value.toLowerCase());
  });
}

function canonicalRiverFeatureForItem(item) {
  const route = item?.cardRoute?.river;
  const keys = [route?.id, route?.slug].filter((value) => typeof value === 'string' && value.length > 0);
  for (const key of keys) {
    const feature = canonicalRiverGeometryByRoute.get(key);
    if (feature) return feature;
  }
  return null;
}

function ensureCanonicalRiverGeometries() {
  if (canonicalRiverGeometryState === 'ready' || canonicalRiverGeometryState === 'failed') {
    return canonicalRiverGeometryPromise;
  }
  canonicalRiverGeometryState = 'loading';
  canonicalRiverGeometryPromise = loadCanonicalRiverGeometries()
    .then((geometries) => {
      canonicalRiverGeometryByRoute = geometries;
      canonicalRiverGeometryState = canonicalRiverGeometryByRoute.size > 0 ? 'ready' : 'failed';
      if (canonicalRiverGeometryState === 'ready' && mapRuntime && isSummaryMapStyleReady()) {
        syncSummaryMapLayers(lastSummaryMapItems);
        syncSummaryRouteLine();
      }
      return canonicalRiverGeometryByRoute;
    })
    .catch((error) => {
      canonicalRiverGeometryState = 'failed';
      console.warn('Canonical river geometries unavailable; using map waterways.', error);
      return canonicalRiverGeometryByRoute;
    });
  return canonicalRiverGeometryPromise;
}

function summaryRiverLinesForItem(item) {
  const canonicalFeature = canonicalRiverFeatureForItem(item);
  if (canonicalFeature) {
    return stitchSummaryRiverLines(flattenSummaryRiverGeometry(canonicalFeature.geometry));
  }
  if (!mapRuntime?.getLayer('summary-supported-rivers')) return [];
  const rendered = typeof mapRuntime.queryRenderedFeatures === 'function'
    ? mapRuntime.queryRenderedFeatures({ layers: ['summary-supported-rivers'] }).filter((feature) => summaryFeatureMatchesItem(feature, item))
    : [];
  const source = typeof mapRuntime.querySourceFeatures === 'function'
    ? mapRuntime.querySourceFeatures('openmaptiles', { sourceLayer: 'waterway' }).filter((feature) => {
        const waterwayClass = feature?.properties?.class;
        return ['river', 'stream', 'canal'].includes(waterwayClass) && summaryFeatureMatchesItem(feature, item);
      })
    : [];
  const namedLines = stitchSummaryRiverLines([...rendered, ...source].flatMap((feature) => flattenSummaryRiverGeometry(feature.geometry)));
  if (namedLines.length > 0) return namedLines;

  // A few OpenMapTiles features use a local/alternate name. If the named
  // highlight is empty, use nearby rendered waterways as a cautious spatial
  // fallback so a real river line can still be traced without drawing a chord.
  const waterwayLayerIds = ['waterway_river', 'waterway_other'].filter((layerId) => mapRuntime.getLayer(layerId));
  const renderedWaterways = waterwayLayerIds.length > 0 && typeof mapRuntime.queryRenderedFeatures === 'function'
    ? mapRuntime.queryRenderedFeatures({ layers: waterwayLayerIds })
    : [];
  const routePoints = routeAccessPoints(item);
  const candidateLines = stitchSummaryRiverLines(
    [...renderedWaterways, ...source]
      .filter((feature) => ['river', 'stream', 'canal'].includes(feature?.properties?.class))
      .flatMap((feature) => flattenSummaryRiverGeometry(feature.geometry))
  );
  const nearbyLines = candidateLines
    .map((line) => {
      const measurements = summaryLineMeasurements(line);
      const nearest = routePoints.map((point) => nearestSummaryMeasureOnLine(line, measurements, point)).filter(Boolean);
      const score = nearest.length > 0
        ? nearest.reduce((sum, point) => sum + point.distanceSquared, 0) / nearest.length
        : Number.POSITIVE_INFINITY;
      return { line, score };
    })
    .filter((candidate) => candidate.score <= 0.035 * 0.035)
    .sort((left, right) => left.score - right.score)
    .map((candidate) => candidate.line);

  return nearbyLines;
}

function summaryRiverTraceFeature(item) {
  const routePoints = routeAccessPoints(item);
  if (routePoints.length < 2) return null;

  const canonicalFeature = canonicalRiverFeatureForItem(item);
  const lines = summaryRiverLinesForItem(item);
  let bestTraceFeature = null;
  const best = endpointSnappedRiverGeometry(lines, routePoints);
  // Canonical route geometry is already constrained to this route's river
  // corridor. Even when an access coordinate is some distance from the NHD
  // centerline, the nearest projected point is the correct visual endpoint.
  // Returning this snapped slice before the legacy corridor fallback keeps
  // the highlight from extending past the put-in/take-out.
  if (best && (canonicalFeature || best.errorSquared <= 0.012 * 0.012)) {
    bestTraceFeature = {
      type: 'Feature',
      properties: { key: item.key, rating: item.cardRoute.rating, traced: true },
      geometry: { type: 'LineString', coordinates: best.coordinates },
    };
  }

  if (bestTraceFeature) return bestTraceFeature;

  // A long river is commonly represented by several non-contiguous vector
  // tile features. When no single stitched chain contains the whole route,
  // retain every named river segment that falls inside the route corridor.
  // Canonical features use only a small tolerance here because their primary
  // path has already been endpoint-snapped above. The larger tile fallback
  // remains necessary when the live basemap splits a waterway at tile edges.
  const longitudes = routePoints.map((point) => point.longitude);
  const latitudes = routePoints.map((point) => point.latitude);
  const span = Math.max(Math.max(...longitudes) - Math.min(...longitudes), Math.max(...latitudes) - Math.min(...latitudes));
  const buffer = canonicalFeature ? 0.001 : Math.max(0.003, Math.min(0.03, span * 0.08));
  const bounds = {
    minLongitude: Math.min(...longitudes) - buffer,
    maxLongitude: Math.max(...longitudes) + buffer,
    minLatitude: Math.min(...latitudes) - buffer,
    maxLatitude: Math.max(...latitudes) + buffer,
  };
  const corridorLines = stitchSummaryRiverLines(lines.flatMap((line) => clipSummaryLineToBounds(line, bounds)));

  if (corridorLines.length > 0) {
    return {
      type: 'Feature',
      properties: { key: item.key, rating: item.cardRoute.rating, traced: true },
      geometry: corridorLines.length === 1
        ? { type: 'LineString', coordinates: corridorLines[0] }
        : { type: 'MultiLineString', coordinates: corridorLines },
    };
  }

  return bestTraceFeature;
}

function summaryRiverLabelData(items) {
  const groups = new Map();
  for (const item of items) {
    const points = summaryCoverageAccessPoints(item);
    const point = points[Math.floor((points.length - 1) / 2)] ?? item?.cardRoute?.river;
    if (!Number.isFinite(point?.longitude) || !Number.isFinite(point?.latitude)) continue;
    const river = item.cardRoute.river;
    const key = river.riverId || river.name;
    const group = groups.get(key) ?? { name: river.name, points: [], routeCount: 0 };
    group.points.push(point);
    group.routeCount += routesForRiverItem(item).length || 1;
    groups.set(key, group);
  }

  return {
    type: 'FeatureCollection',
    features: [...groups.values()].map((group) => ({
      type: 'Feature',
      properties: { name: group.name, routeCount: group.routeCount },
      geometry: {
        type: 'Point',
        coordinates: [
          group.points.reduce((sum, point) => sum + point.longitude, 0) / group.points.length,
          group.points.reduce((sum, point) => sum + point.latitude, 0) / group.points.length,
        ],
      },
    })),
  };
}

function syncSummarySupportedRivers(items) {
  if (!mapRuntime || !isSummaryMapStyleReady()) return;

  ensureCanonicalRiverGeometries();
  if (canonicalRiverGeometryState === 'ready') {
    syncActualRiverLayer(mapRuntime, 'summary-supported-rivers', [], {});
    syncCanonicalRiverLayer(items);
    if (mapRuntime.getLayer('summary-supported-rivers-overview')) {
      mapRuntime.removeLayer('summary-supported-rivers-overview');
    }
    if (mapRuntime.getSource('summary-supported-rivers-overview')) {
      mapRuntime.removeSource('summary-supported-rivers-overview');
    }
    summaryOverviewRiverSignature = '';
    return;
  }

  for (const layerId of ['summary-route-lines', 'summary-route-lines-casing']) {
    if (mapRuntime.getLayer(layerId)) mapRuntime.removeLayer(layerId);
  }
  if (mapRuntime.getSource('summary-route-lines')) mapRuntime.removeSource('summary-route-lines');

  syncActualRiverLayer(mapRuntime, 'summary-supported-rivers', items.map(summaryRiverName), {
    lineColor: '#16758a',
    lineWidth: 4.5,
    lineOpacity: 0.58,
    minZoom: 3,
  });
  syncSummaryOverviewRiverLayer(items);
}

function canonicalRiverOverviewData(items) {
  const groups = new Map();
  for (const item of items) {
    const river = item.cardRoute.river;
    const key = river.riverId || river.name;
    const group = groups.get(key) ?? { name: river.name, lines: [] };
    for (const routeItem of coverageRouteItems(item)) {
      if (!canonicalRiverFeatureForItem(routeItem)) continue;
      const routeFeature = summaryRiverTraceFeature(routeItem);
      if (!routeFeature) continue;
      for (const line of flattenSummaryRiverGeometry(routeFeature.geometry)) {
        const fingerprint = summaryLineFingerprint(line);
        if (!group.lines.some((candidate) => summaryLineFingerprint(candidate) === fingerprint)) {
          group.lines.push(line);
        }
      }
    }
    groups.set(key, group);
  }

  return {
    type: 'FeatureCollection',
    features: [...groups.values()].flatMap((group) => group.lines.map((line) => ({
      type: 'Feature',
      properties: { name: group.name },
      geometry: { type: 'LineString', coordinates: line },
    }))),
  };
}

function dataHasFeatures(data) {
  return Array.isArray(data?.features) && data.features.length > 0;
}

function syncCanonicalRiverLayer(items) {
  const sourceId = 'summary-supported-rivers-canonical';
  const data = canonicalRiverOverviewData(items);
  const source = mapRuntime.getSource(sourceId);
  if (source && typeof source.setData === 'function') {
    source.setData(data);
  } else if (!source) {
    mapRuntime.addSource(sourceId, { type: 'geojson', data });
  }

  if (!mapRuntime.getLayer('summary-supported-rivers')) {
    mapRuntime.addLayer({
      id: 'summary-supported-rivers',
      type: 'line',
      source: sourceId,
      minzoom: 3,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#16758a',
        'line-width': ['interpolate', ['linear'], ['zoom'], 3, 2.8, 6, 4.2, 10, 5],
        'line-opacity': 0.62,
      },
    });
  }
}

function summaryOverviewRiverCandidates() {
  if (!mapRuntime || typeof mapRuntime.querySourceFeatures !== 'function') return [];
  return mapRuntime
    .querySourceFeatures('openmaptiles', { sourceLayer: 'waterway' })
    .filter((feature) => ['river', 'stream', 'canal'].includes(feature?.properties?.class))
    .flatMap((feature) => flattenSummaryRiverGeometry(feature.geometry));
}

function summaryOverviewRiverData(items) {
  const candidates = stitchSummaryRiverLines(summaryOverviewRiverCandidates());
  const groups = new Map();
  for (const item of items) {
    const river = item.cardRoute.river;
    const key = river.riverId || river.name;
    const group = groups.get(key) ?? { name: river.name, lines: [] };
    for (const routeItem of coverageRouteItems(item)) {
      const routePoints = routeAccessPoints(routeItem);
      if (routePoints.length < 2 || candidates.length === 0) continue;

      let best = null;
      for (const line of candidates) {
        const measurements = summaryLineMeasurements(line);
        const nearest = routePoints.map((point) => nearestSummaryMeasureOnLine(line, measurements, point)).filter(Boolean);
        if (nearest.length < 2) continue;
        const score = nearest.reduce((sum, point) => sum + point.distanceSquared, 0) / nearest.length;
        if (!best || score < best.score) best = { line, score };
      }

      if (!best || best.score > 0.08 * 0.08) continue;
      const fingerprint = summaryLineFingerprint(best.line);
      if (!group.lines.some((line) => summaryLineFingerprint(line) === fingerprint)) {
        group.lines.push(best.line);
      }
    }
    groups.set(key, group);
  }

  return {
    type: 'FeatureCollection',
    features: [...groups.values()].flatMap((group) => group.lines.map((line) => ({
      type: 'Feature',
      properties: { name: group.name },
      geometry: { type: 'LineString', coordinates: line },
    }))),
  };
}

function syncSummaryOverviewRiverLayer(items) {
  if (!mapRuntime || !isSummaryMapStyleReady() || !isRiverFirstExploreMap()) return;
  const sourceId = 'summary-supported-rivers-overview';
  const canonicalData = canonicalRiverGeometryState === 'ready' ? canonicalRiverOverviewData(items) : null;
  const data = canonicalData && dataHasFeatures(canonicalData) ? canonicalData : summaryOverviewRiverData(items);
  const signature = `${items.map((item) => item.key).join('|')}|${canonicalRiverGeometryState}|${data.features.length}`;
  const source = mapRuntime.getSource(sourceId);
  if (source && typeof source.setData === 'function') {
    if (signature !== summaryOverviewRiverSignature) source.setData(data);
  } else {
    mapRuntime.addSource(sourceId, { type: 'geojson', data });
  }
  summaryOverviewRiverSignature = signature;

  if (!mapRuntime.getLayer(sourceId)) {
    mapRuntime.addLayer({
      id: sourceId,
      type: 'line',
      source: sourceId,
      minzoom: 3,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#16758a',
        'line-width': ['interpolate', ['linear'], ['zoom'], 3, 2.8, 6, 4.2, 10, 5],
        'line-opacity': 0.62,
      },
    });
  }
}

function isRiverFirstExploreMap() {
  return summaryMapShell instanceof HTMLElement && summaryMapShell.classList.contains('summary-map-shell--explore-workspace');
}

function syncLegacySummaryRouteLines(items) {
  if (!mapRuntime || !isSummaryMapStyleReady()) return;
  const sourceId = 'summary-route-lines';
  const casingLayerId = 'summary-route-lines-casing';
  const layerId = 'summary-route-lines';
  const data = {
    type: 'FeatureCollection',
    features: items.map(summaryRouteLineFeature).filter(Boolean),
  };

  if (mapRuntime.getSource(sourceId)) {
    mapRuntime.getSource(sourceId).setData(data);
  } else {
    mapRuntime.addSource(sourceId, { type: 'geojson', data });
  }
  if (!mapRuntime.getLayer(casingLayerId)) {
    mapRuntime.addLayer({
      id: casingLayerId,
      type: 'line',
      source: sourceId,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#ffffff', 'line-width': SUMMARY_ROUTE_LINE_CASING_WIDTH, 'line-opacity': 0.78, 'line-blur': 0.25 },
    });
  }
  if (!mapRuntime.getLayer(layerId)) {
    mapRuntime.addLayer({
      id: layerId,
      type: 'line',
      source: sourceId,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': ['match', ['get', 'rating'], 'Strong', '#2c8a54', 'Good', '#2c8a54', 'Fair', '#ad752c', '#bb5840'],
        'line-width': SUMMARY_ROUTE_LINE_WIDTH,
        'line-opacity': 0.9,
      },
    });
  }
}

function syncSummaryMapLayers(items) {
  if (isRiverFirstExploreMap()) {
    syncSummarySupportedRivers(items);
    syncSummaryRiverLabels(items);
    return;
  }
  syncLegacySummaryRouteLines(items);
}

function syncSummaryRiverLabels(items) {
  if (!mapRuntime || !isSummaryMapStyleReady()) return;
  const sourceId = 'summary-river-labels';
  const data = summaryRiverLabelData(items);
  const source = mapRuntime.getSource(sourceId);
  if (source && typeof source.setData === 'function') {
    source.setData(data);
  } else {
    mapRuntime.addSource(sourceId, { type: 'geojson', data });
  }

  if (!mapRuntime.getLayer(sourceId)) {
    mapRuntime.addLayer({
      id: sourceId,
      type: 'symbol',
      source: sourceId,
      minzoom: 3.6,
      layout: {
        'text-field': ['concat', ['get', 'name'], ' · ', ['to-string', ['get', 'routeCount']]],
        'text-font': ['Noto Sans Bold'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 3.6, 8.5, 7.5, 12.5],
        'text-padding': 8,
        'text-allow-overlap': false,
      },
      paint: {
        'text-color': '#173f4c',
        'text-halo-color': 'rgba(255, 255, 255, 0.94)',
        'text-halo-width': 2,
      },
    });
  }
}

function syncSummaryRouteLine() {
  if (!mapRuntime || !isSummaryMapStyleReady()) return;

  const sourceId = 'summary-selected-route-line';
  const casingLayerId = 'summary-selected-route-line-casing';
  const layerId = 'summary-selected-route-line';
  const selectedItem = lastSummaryMapItems.find((item) => item.key === selectedSummaryMapKey);
  const selectedZoneRoutes = selectedSummaryMapZoneKey && selectedSummaryMapZoneRoutes
    ? selectedSummaryMapZoneRoutes
    : null;
  const routeLine = selectedItem
    ? (isGroupedItem(selectedItem)
        ? summaryRiverCoverageFeature(selectedItem, selectedZoneRoutes)
        : isRiverFirstExploreMap()
          ? summaryRiverTraceFeature(selectedItem)
          : summaryRouteLineFeature(selectedItem))
    : null;

  if (routeLine) {
    const signature = `${routeLine.properties?.traced ? 'traced' : 'fallback'}:${JSON.stringify(routeLine.geometry?.coordinates || [])}`;
    if (mapRuntime.getSource(sourceId)) {
      if (signature !== summaryTraceSignature) {
        mapRuntime.getSource(sourceId).setData(routeLine);
      }
    } else {
      mapRuntime.addSource(sourceId, {
        type: 'geojson',
        data: routeLine,
      });
    }
    summaryTraceSignature = signature;
    if (!mapRuntime.getLayer(casingLayerId)) {
      mapRuntime.addLayer({
        id: casingLayerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#ffffff',
          'line-width': SUMMARY_ROUTE_LINE_CASING_WIDTH_SELECTED,
          'line-opacity': 0.9,
          'line-blur': 0.35,
        },
      });
    }
    if (!mapRuntime.getLayer(layerId)) {
      mapRuntime.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': SUMMARY_ROUTE_LINE_COLOR_SELECTED,
          'line-width': SUMMARY_ROUTE_LINE_WIDTH_SELECTED,
          'line-opacity': 0.95,
        },
      });
    }

    mapRuntime.setPaintProperty(layerId, 'line-color', SUMMARY_ROUTE_LINE_COLOR_SELECTED);
    if (isRiverFirstExploreMap() && summaryMapStatus instanceof HTMLElement && selectedItem) {
      const river = selectedItem.cardRoute.river;
      summaryMapStatus.textContent = isGroupedItem(selectedItem)
        ? `Showing ${(selectedZoneRoutes || routesForRiverItem(selectedItem)).length} mapped ${river.name} routes across ${selectedZoneRoutes ? 1 : groupRoutesByConditionScore(routesForRiverItem(selectedItem)).length} score zones.`
        : routeLine.properties?.traced
          ? `Tracing ${river.name}: ${river.reach} along the river line.`
        : `Showing ${river.name}: ${river.reach}. Detailed river geometry was not available here, so the selected reach uses access coordinates.`;
    }
    return routeLine;
  }

  if (mapRuntime.getLayer(layerId)) {
    mapRuntime.removeLayer(layerId);
  }
  if (mapRuntime.getLayer(casingLayerId)) {
    mapRuntime.removeLayer(casingLayerId);
  }
  if (mapRuntime.getSource(sourceId)) {
    mapRuntime.removeSource(sourceId);
  }
  summaryTraceSignature = '';
  if (isRiverFirstExploreMap() && summaryMapStatus instanceof HTMLElement && selectedItem) {
    const river = selectedItem.cardRoute.river;
    summaryMapStatus.textContent = `River geometry for ${river.name} is not loaded at this zoom. Zoom in or try another route to trace it along the river.`;
  }
  return null;
}

function focusSummaryMapRoute(key, routes = null) {
  if (!mapRuntime || !key) {
    return;
  }

  const item = lastSummaryMapItems.find((candidate) => candidate.key === key);
  const accessPoints = item ? summaryCoverageAccessPoints(item, routes) : [];
  if (accessPoints.length > 1) {
    const feature = isGroupedItem(item)
      ? summaryRiverCoverageFeature(item, routes)
      : isRiverFirstExploreMap()
        ? summaryRiverTraceFeature(item)
        : null;
    const tracedCoordinates = feature ? flattenSummaryRiverGeometry(feature.geometry).flat() : [];
    const focusPoints = tracedCoordinates.length > 1
      ? tracedCoordinates.map(([longitude, latitude]) => ({ longitude, latitude }))
      : accessPoints;
    const longitudes = focusPoints.map((point) => point.longitude);
    const latitudes = focusPoints.map((point) => point.latitude);
    const compact = window.matchMedia('(max-width: 720px)').matches;
    fitMapBounds(
      mapRuntime,
      [
        [Math.min(...longitudes), Math.min(...latitudes)],
        [Math.max(...longitudes), Math.max(...latitudes)],
      ],
      {
        padding: compact
          ? { top: 72, right: 72, bottom: 72, left: 72 }
          : { top: 110, right: 110, bottom: 110, left: 110 },
        maxZoom: 11.2,
        duration: 550,
      }
    );
    return;
  }

  const marker = mapMarkersByKey.get(key);
  const lngLat = marker?.getLngLat?.();
  if (lngLat) {
    mapRuntime.flyTo({
      center: [lngLat.lng, lngLat.lat],
      zoom: Math.max(mapRuntime.getZoom(), 9),
      duration: 550,
    });
  }
}

function clearSummaryConditionMarkers() {
  mapConditionMarkers = clearMapMarkers(mapConditionMarkers);
}

function conditionZonePopupMarkup(item, group) {
  const routeCount = group.routes.length;
  const regions = group.regions.length > 0 ? group.regions.join(', ') : item.cardRoute.river.region;
  if (routeCount === 1 && group.representative) {
    const routeItem = { ...item, cardRoute: group.representative };
    const nearbyReady = userLocationState === 'ready' && userLocation && Number.isFinite(item.travelMinutes);
    return `
      <article class="score-map-popup">
        <p class="score-map-popup__state">${escapeHtml(regions)}</p>
        <h3>${escapeHtml(group.representative.river.name)}</h3>
        <p class="score-map-popup__reach">${escapeHtml(group.representative.river.reach || 'Mapped river coverage')}</p>
        <div class="score-map-popup__scoreline">
          <span class="score-map-popup__scorebadge score-map-popup__scorebadge--${escapeHtml(ratingToneKey(group.rating))}">${escapeHtml(String(group.score ?? '--'))}</span>
          <p class="score-map-popup__verdict">${escapeHtml(recommendationVerdict(routeItem))}</p>
        </div>
        <p class="score-map-popup__summary">${escapeHtml(recommendationSummaryText(routeItem, nearbyReady, latestResults))}</p>
        <a class="score-map-popup__link score-map-popup__link--button" href="${item.link}">${escapeHtml(cardLinkLabel(item))}</a>
      </article>
    `;
  }
  const reachMarkup = routeCount === 1
    ? ''
    : `<p class="score-map-popup__reach">${escapeHtml(group.representative?.river?.reach || 'Mapped river coverage')}</p>`;
  const actionMarkup = routeCount > 1
    ? '<button class="score-map-popup__link score-map-popup__link--button" type="button" data-summary-zone-zoom>Zoom in to choose a route</button>'
    : `<a class="score-map-popup__link score-map-popup__link--button" href="${item.link}">${escapeHtml(cardLinkLabel(item))}</a>`;
  return `
    <article class="score-map-popup">
      <p class="score-map-popup__state">${escapeHtml(regions)}</p>
      <h3>${escapeHtml(item.cardRoute.river.name)}</h3>
      <div class="score-map-popup__scoreline">
        <span class="score-map-popup__scorebadge score-map-popup__scorebadge--${escapeHtml(ratingToneKey(group.rating))}">${escapeHtml(String(group.score ?? '--'))}</span>
        <p class="score-map-popup__verdict">${escapeHtml(scoreZoneRouteLabel(routeCount, group.representative))}</p>
      </div>
      ${reachMarkup}
      ${actionMarkup}
    </article>
  `;
}

function summaryCoverageAnchorForRoutes(item, routes) {
  const routeItems = coverageRouteItems(item, routes);
  const geometryBySlug = new Map();

  for (const routeItem of routeItems) {
    const slug = routeItem.cardRoute?.river?.slug;
    if (!slug) continue;
    geometryBySlug.set(
      slug,
      summaryRiverTraceFeature(routeItem) || summaryRouteLineFeature(routeItem)
    );
  }

  return coverageAnchorForRoutes(routes, geometryBySlug);
}

function conditionMarkerMode() {
  if (!isRiverFirstExploreMap() || !mapRuntime) return 'route';
  const zoom = mapRuntime.getZoom();
  if (summaryConditionMarkerMode === 'route') {
    return zoom >= SUMMARY_ROUTE_MARKER_ZOOM_OUT ? 'route' : 'zone';
  }
  return zoom >= SUMMARY_ROUTE_MARKER_ZOOM_IN ? 'route' : 'zone';
}

function buildSummaryConditionMarkerRecords() {
  const records = { zone: [], route: [] };
  for (const item of lastSummaryMapItems) {
    if (!isGroupedItem(item)) continue;
    for (const group of groupRoutesByConditionScore(routesForRiverItem(item))) {
      const addRecord = (route, mode) => {
        const markerGroup = route
          ? {
              ...group,
              routes: [route],
              representative: route,
              regions: [...new Set([route.cardRoute?.river?.region, route.river?.region, route.region].filter(Boolean))],
            }
          : group;
        const point = summaryCoverageAnchorForRoutes(item, route ? [route] : group.routes);
        if (!point || group.score === null) return;
        records[mode].push({ item, group: markerGroup, point, route });
      };
      addRecord(null, 'zone');
      for (const route of group.routes) addRecord(route, 'route');
    }
  }
  return records;
}

function syncSummaryConditionMarkers({ force = false } = {}) {
  for (const item of lastSummaryMapItems) {
    if (isGroupedItem(item)) {
      mapMarkersByKey.delete(item.key);
    }
  }
  if (!mapRuntime || !summaryMapLibre) return;

  const mode = conditionMarkerMode();
  if (!summaryConditionMarkerRecords || force) {
    summaryConditionMarkerRecords = buildSummaryConditionMarkerRecords();
  }
  if (!force && summaryConditionMarkerMode === mode) return;
  clearSummaryConditionMarkers();
  summaryConditionMarkerMode = mode;

  if (!force && summaryConditionMarkerInstances[mode].length > 0) {
    for (const { item, marker } of summaryConditionMarkerInstances[mode]) {
      marker.addTo(mapRuntime);
      if (!mapMarkersByKey.has(item.key)) mapMarkersByKey.set(item.key, marker);
      mapConditionMarkers.push(marker);
    }
    return;
  }

  for (const { item, group: markerGroup, point, route } of summaryConditionMarkerRecords[mode]) {
        const markerNode = document.createElement('button');
        markerNode.type = 'button';
        markerNode.className = `${markerClassForRating(markerGroup.rating, markerGroup.confidence?.label)} score-map-marker--condition-zone`;
        markerNode.classList.toggle('score-map-marker--river-expanded', item.key === selectedSummaryMapKey);
        markerNode.dataset.summaryMapRiverKey = item.key;
        markerNode.dataset.summaryMapZoneKey = `${item.key}::${markerGroup.key}::${route?.river?.slug || route?.slug || 'zone'}`;
        markerNode.classList.toggle('score-map-marker--selected', markerNode.dataset.summaryMapZoneKey === selectedSummaryMapZoneKey);
        markerNode.innerHTML = `<span>${escapeHtml(String(markerGroup.score))}</span>`;
        const markerAriaLabel = `${item.cardRoute.river.name}, ${markerGroup.regions.join(', ') || 'score zone'}: score ${markerGroup.score}, ${markerGroup.routes.length} ${markerGroup.routes.length === 1 ? 'route' : 'routes'}`;
        markerNode.setAttribute('aria-label', markerAriaLabel);

        const popup = new summaryMapLibre.Popup({ offset: 18, closeButton: true, closeOnClick: true, maxWidth: '260px' });
        popup.on('open', () => {
          if (!popup.__paddleTodayContentReady) {
            popup.setHTML(conditionZonePopupMarkup(item, markerGroup));
            popup.__paddleTodayContentReady = true;
          }
        });
        const marker = new summaryMapLibre.Marker({ element: markerNode, anchor: 'center' })
          .setLngLat([point.longitude, point.latitude])
          .setPopup(popup)
          .addTo(mapRuntime);
        markerNode.setAttribute('aria-label', markerAriaLabel);

        bindMarkerPopup(marker, markerNode, {
          map: mapRuntime,
          onSelectedChange(selected) {
            if (selected) {
              updateSummaryMapSelection(item.key, {
                zoneKey: markerNode.dataset.summaryMapZoneKey,
                zoneRoutes: markerGroup.routes,
              });
              if (markerGroup.routes.length === 1) {
                focusSummaryMapRoute(item.key, markerGroup.routes);
              }
              focusSummaryMapCard(item.key);
            }
          },
        });
        marker.getPopup()?.on('open', () => {
          const zoomButton = marker.getPopup()?.getElement()?.querySelector('[data-summary-zone-zoom]');
          if (zoomButton instanceof HTMLButtonElement && zoomButton.dataset.summaryZoneZoomBound !== 'true') {
            zoomButton.dataset.summaryZoneZoomBound = 'true';
            zoomButton.addEventListener('click', () => {
              focusSummaryMapRoute(item.key, markerGroup.routes);
              focusSummaryMapCard(item.key);
            });
          }
        });
        if (!mapMarkersByKey.has(item.key)) {
          mapMarkersByKey.set(item.key, marker);
        }
        mapConditionMarkers.push(marker);
        summaryConditionMarkerInstances[mode].push({ item, marker });
  }
}

function updateSummaryMapSelection(key, { preserveZone = false, zoneKey, zoneRoutes } = {}) {
  selectedSummaryMapKey = key || null;
  if (zoneKey !== undefined) {
    selectedSummaryMapZoneKey = zoneKey;
    selectedSummaryMapZoneRoutes = zoneRoutes || null;
  } else if (!preserveZone || !key) {
    selectedSummaryMapZoneKey = null;
    selectedSummaryMapZoneRoutes = null;
  }
  const feature = syncSummaryRouteLine();
  for (const [itemKey, marker] of mapMarkersByKey.entries()) {
    const element = marker?.getElement?.();
    if (element instanceof HTMLElement) {
      element.classList.toggle('score-map-marker--river-expanded', itemKey === selectedSummaryMapKey);
    }
  }
  for (const marker of mapConditionMarkers) {
    const element = marker?.getElement?.();
    if (element instanceof HTMLElement) {
      element.classList.toggle(
        'score-map-marker--river-expanded',
        element.dataset.summaryMapRiverKey === selectedSummaryMapKey
      );
      element.classList.toggle(
        'score-map-marker--selected',
        Boolean(selectedSummaryMapZoneKey) && element.dataset.summaryMapZoneKey === selectedSummaryMapZoneKey
      );
    }
  }

  if (isRiverFirstExploreMap() && summaryMapStatus instanceof HTMLElement) {
    const selectedItem = lastSummaryMapItems.find((item) => item.key === selectedSummaryMapKey);
    if (selectedItem) {
      const river = selectedItem.cardRoute.river;
      summaryMapStatus.textContent = isGroupedItem(selectedItem)
        ? `Showing ${routesForRiverItem(selectedItem).length} mapped ${river.name} routes across ${groupRoutesByConditionScore(routesForRiverItem(selectedItem)).length} score zones.`
        : feature?.properties?.traced
          ? `Tracing ${river.name}: ${river.reach} along the river line.`
        : `River geometry for ${river.name} is not loaded at this zoom. Zoom in or try another route to trace it along the river.`;
    } else {
      summaryMapStatus.textContent = summaryMapOverviewStatus(lastSummaryMapItems);
    }
  }

  if (summaryMapResults instanceof HTMLElement) {
    const rows = Array.from(summaryMapResults.querySelectorAll('[data-summary-map-item]'));
    for (const row of rows) {
      if (!(row instanceof HTMLButtonElement)) continue;
      const active = row.dataset.summaryMapItem === selectedSummaryMapKey;
      row.classList.toggle('summary-map-result--active', active);
      row.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  if (exploreGrid instanceof HTMLElement) {
    const cards = Array.from(exploreGrid.querySelectorAll('[data-summary-map-card]'));
    for (const card of cards) {
      if (!(card instanceof HTMLElement)) continue;
      card.classList.toggle('river-card--map-active', card.dataset.summaryMapCard === selectedSummaryMapKey);
    }
  }
}

function summaryMapOverviewStatus(items) {
  if (!isRiverFirstExploreMap()) {
    return isNearbySummaryMapMode() ? 'Nearby map is up to date.' : 'Map is up to date.';
  }
  const riverCount = new Set(items.map((item) => item.cardRoute.river.riverId || item.cardRoute.river.name)).size;
  const routeCount = items.reduce(
    (total, item) => total + (item.matchingRouteCount ?? 1),
    0
  );
  const ratingCopy = activeFilters.paddleable ? 'Good and Strong' : 'all';
  return `Showing ${routeCount} ${ratingCopy} ${routeCount === 1 ? 'route' : 'routes'} across ${riverCount} supported ${riverCount === 1 ? 'river' : 'rivers'}. Zoom in to see individual route scores.`;
}

function updateSummaryMarkerZoomMode() {
  if (!mapRuntime || !isRiverFirstExploreMap()) return;
  const overview = mapRuntime.getZoom() < 6.85;
  for (const marker of mapMarkers) {
    const element = marker.getElement?.();
    if (!(element instanceof HTMLElement)) continue;
    element.classList.toggle('score-map-marker--overview', overview);
    element.tabIndex = 0;
    element.setAttribute('aria-hidden', 'false');
  }
}

function isNearbySummaryMapMode() {
  return summaryMapMode === 'nearby';
}

function focusSummaryMapCard(key, { scroll = true } = {}) {
  if (!(exploreGrid instanceof HTMLElement)) {
    return;
  }

  const shouldScrollCard = scroll && !(summaryMapSupportsMobileViews && phoneBreakpoint.matches);
  let cards = Array.from(exploreGrid.querySelectorAll('[data-summary-map-card]'));
  const hasRenderedCard = cards.some(
    (card) => card instanceof HTMLElement && card.dataset.summaryMapCard === key
  );

  if (!hasRenderedCard && key && lastExploreItems.length > 0) {
    const itemIndex = lastExploreItems.findIndex((item) => item.key === key);
    if (itemIndex >= 0) {
      const targetPage = Math.floor(itemIndex / EXPLORE_PAGE_SIZE) + 1;
      if (targetPage !== currentExplorePage) {
        currentExplorePage = targetPage;
        renderExploreList(lastExploreItems);
        cards = Array.from(exploreGrid.querySelectorAll('[data-summary-map-card]'));
      }
    }
  }

  for (const card of cards) {
    if (!(card instanceof HTMLElement)) {
      continue;
    }

    const active = card.dataset.summaryMapCard === key;
    card.classList.toggle('river-card--map-active', active);

    if (active && shouldScrollCard) {
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
      card.classList.remove('river-card--map-jump');
      void card.offsetWidth;
      card.classList.add('river-card--map-jump');
    }
  }

  if (shouldScrollCard) {
    window.clearTimeout(summaryMapCardFlashTimeout);
    summaryMapCardFlashTimeout = window.setTimeout(() => {
      if (!(exploreGrid instanceof HTMLElement)) {
        return;
      }

      const highlightedCards = Array.from(exploreGrid.querySelectorAll('.river-card--map-jump'));
      for (const highlightedCard of highlightedCards) {
        highlightedCard.classList.remove('river-card--map-jump');
      }
    }, 1600);
  }
}

function openSummaryMapItem(key, { scrollCard = true } = {}) {
  const marker = mapMarkersByKey.get(key);
  if (!marker) {
    return;
  }

  if (summaryMapController.activeView() === 'list') {
    summaryMapController.setViewAndSync('map', { scrollIntoView: true });
  }

  updateSummaryMapSelection(key);
  focusSummaryMapRoute(key);
  focusSummaryMapCard(key, { scroll: scrollCard });
  summaryMapController.closePopups(mapMarkersByKey, key);
  const popup = marker.getPopup?.();
  if (popup && typeof popup.isOpen === 'function' && !popup.isOpen()) {
    marker.togglePopup();
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
    summaryMapController.updateView();
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

async function renderSummaryMap(items, { preserveViewport = false } = {}) {
  if (!(summaryMap instanceof HTMLElement)) {
    return;
  }

  const renderVersion = ++summaryMapRenderVersion;

  if (summaryMapStatus instanceof HTMLElement) {
    summaryMapStatus.textContent = isNearbySummaryMapMode() ? 'Loading nearby picks.' : 'Loading map markers.';
  }

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl) {
      return;
    }
    if (renderVersion !== summaryMapRenderVersion) {
      return;
    }
    summaryMapLibre = maplibregl;

    if (!mapRuntime) {
      mapRuntime = createPaddleMap(maplibregl, {
        container: summaryMap,
        center: [-93.7, 44.6],
        zoom: 5.2,
        minZoom: 3.4,
        maxZoom: 12,
      });
      bindSummaryMapLayerRefresh();
      mapRuntime.on('zoomend', () => {
        if (isRiverFirstExploreMap()) syncSummaryConditionMarkers();
      });
      await waitForSummaryMapReady();
    }
    if (renderVersion !== summaryMapRenderVersion) {
      return;
    }

    await waitForSummaryMapReady();
    if (renderVersion !== summaryMapRenderVersion) {
      return;
    }

    mapMarkers = clearMapMarkers(mapMarkers);
    clearSummaryConditionMarkers();
    summaryConditionMarkerRecords = null;
    summaryConditionMarkerMode = null;
    summaryConditionMarkerInstances = { zone: [], route: [] };
    mapMarkersByKey = new Map();

    const bounds = new maplibregl.LngLatBounds();
    let hasBounds = false;

    syncSummaryMapLayers(items);

    for (const item of items) {
      const routePoints = summaryCoverageAccessPoints(item);
      const markerPoint = summaryCoverageAnchorForRoutes(item, routesForRiverItem(item)) ?? item.cardRoute.river;
      if (!isGroupedItem(item)) {
        const markerNode = document.createElement('button');
        markerNode.type = 'button';
        markerNode.className = markerClassFor(item);
        markerNode.dataset.summaryMapMarker = item.key;
        markerNode.innerHTML = `<span>${escapeHtml(visibleMapMarkerLabel(item))}</span>`;
        markerNode.setAttribute(
          'aria-label',
          mapMarkerAriaLabel(item)
        );

        const marker = new maplibregl.Marker({
          element: markerNode,
          anchor: 'center',
        })
          .setLngLat([markerPoint.longitude, markerPoint.latitude])
          .setPopup(
            new maplibregl.Popup({ offset: 18, closeButton: true, closeOnClick: true, maxWidth: '248px' }).setHTML(popupMarkup(item))
          )
          .addTo(mapRuntime);

        bindMarkerPopup(marker, markerNode, {
          map: mapRuntime,
          onSelectedChange(selected) {
            if (selected) {
              updateSummaryMapSelection(item.key);
              focusSummaryMapRoute(item.key);
              focusSummaryMapCard(item.key);
            }
          },
        });
        markerNode.addEventListener('click', () => {
          openSummaryMapItem(item.key);
        });
        mapMarkers.push(marker);
        mapMarkersByKey.set(item.key, marker);
      }
      if (routePoints.length > 1) {
        for (const point of routePoints) {
          bounds.extend([point.longitude, point.latitude]);
        }
      } else {
        bounds.extend([markerPoint.longitude, markerPoint.latitude]);
      }
      hasBounds = true;
    }

    lastSummaryMapItems = items;
    syncSummaryConditionMarkers({ force: true });
    summaryMapController.renderResults(items);

    if (hasBounds) {
      if (renderVersion !== summaryMapRenderVersion) {
        return;
      }
      const compact = window.matchMedia('(max-width: 720px)').matches;
      fitMapBounds(mapRuntime, bounds, {
        preserveViewport,
        padding: compact
          ? { top: 22, right: 22, bottom: 22, left: 22 }
          : { top: 52, right: 52, bottom: 52, left: 52 },
        maxZoom: 8.2,
        duration: 0,
      });
      mapRuntime.resize();
      updateSummaryMarkerZoomMode();
      if (!items.some((item) => item.key === selectedSummaryMapKey)) {
        updateSummaryMapSelection(null);
        summaryMapController.closePopups(mapMarkersByKey);
      }
      if (summaryMapStatus instanceof HTMLElement) {
        summaryMapStatus.textContent = summaryMapOverviewStatus(items);
      }
      return;
    }

    if (renderVersion !== summaryMapRenderVersion) {
      return;
    }
    summaryMapController.renderResults([]);
    if (summaryMapStatus instanceof HTMLElement) {
      summaryMapStatus.textContent = isNearbySummaryMapMode()
        ? 'No nearby results match the current preferences.'
        : 'No results match the current filters.';
    }
  } catch (error) {
    console.error('Failed to load summary map.', error);
    summaryMapController.renderResults([]);
    if (summaryMapStatus instanceof HTMLElement) {
      summaryMapStatus.textContent = isNearbySummaryMapMode()
        ? 'Map unavailable right now. Use the nearby route cards above.'
        : 'Map unavailable right now. Use the route list below.';
    }
  }
}

function renderHomepage(results, { preserveMapViewport = false } = {}) {
  const locationReady = userLocationState === 'ready' && Boolean(userLocation);
  const defaultVisibleResults = results.filter(isDefaultVisibleRoute);
  const overallItems = sortBoardItems(
    buildDisplayItems(defaultVisibleResults, defaultVisibleResults, 'best-now'),
    'best-now'
  );
  const nearbyPreferenceResults = defaultVisibleResults.filter(matchesHomeNearbyFilters);
  const nearbyBaseItems = sortBoardItems(
    buildDisplayItems(nearbyPreferenceResults, nearbyPreferenceResults, 'near-you', { useHomePreferences: true }),
    'near-you',
    { hasUserLocation: Boolean(userLocation) }
  );
  const nearbyItems = locationReady
    ? nearbyBaseItems.filter(itemWithinSelectedRadius)
    : nearbyBaseItems.filter((item) => item.travelMinutes <= DAY_TRIP_TRAVEL_MINUTES);
  const summaryResults = locationReady
    ? nearbyPreferenceResults.filter(resultWithinSelectedRadius)
    : defaultVisibleResults;

  const filteredRoutes = getFilteredResults(results);
  const normalizedSortMode = normalizeBoardSortMode(
    activeFilters.sort,
    userLocationState === 'ready' && Boolean(userLocation)
  );
  const exploreItems = sortBoardItems(
    buildRouteMapItems(results, filteredRoutes, {
      segmentFilters: {
        paddleLength: activeFilters.paddleLength,
        paddleTime: activeFilters.paddleTime,
      },
    }),
    normalizedSortMode,
    { hasUserLocation: Boolean(userLocation) },
  );
  lastExploreItems = exploreItems;
  const summaryMapItems = isNearbySummaryMapMode()
    ? (locationReady ? nearbyItems : [])
    : exploreItems;

  updateHomeNearbyCounters(summaryResults);
  updateHeroCallMix(summaryResults);
  updateFeaturedHero(nearbyItems, overallItems);
  renderRecommendationSection(nearbyItems, overallItems);

  updateFilterButtonStates();
  updateRatingFilterButtons();
  updateLocationIndicator();
  updateLocationStatus();
  updateFilterSummary(exploreItems);
  updateSummaryStatus(exploreItems, results);
  updateBoardStatusBanner(exploreItems);
  renderSummaryMap(summaryMapItems, { preserveViewport: preserveMapViewport });
  renderExploreList(exploreItems);
}

function toggleHomeDifficultyFilter(value) {
  setHomeDifficultyFilter(toggleChoiceValue(selectedHomeDifficulties, value, HOME_DIFFICULTY_OPTIONS));
}

function toggleHomePaddleTimeFilter(value) {
  setHomePaddleTimeFilter(toggleChoiceValue(selectedHomePaddleTimes, value, HOME_PADDLE_TIME_OPTIONS));
}

function resetHomeFilters({ includeRadius = true, rerender = true } = {}) {
  selectedHomeDifficulties = ['any'];
  selectedHomePaddleTimes = ['any'];
  saveHomeDifficultyFilter(selectedHomeDifficulties);
  saveHomePaddleTimeFilter(selectedHomePaddleTimes);

  if (includeRadius) {
    selectedRadiusMiles = DEFAULT_RADIUS_MILES;
    saveRadiusMiles(selectedRadiusMiles);
  }

  setNearbySortMode('best-score', { rerender: false });
  updateLocationStatus();

  if (rerender && latestResults.length > 0) {
    renderHomepage(latestResults);
  }
}

function applyHomePreset(preset) {
  if (preset === 'quick-float') {
    selectedHomeDifficulties = ['easy'];
    selectedHomePaddleTimes = ['up-to-3'];
  } else if (preset === 'full-day') {
    selectedHomeDifficulties = ['moderate', 'hard'];
    selectedHomePaddleTimes = ['5-to-7', '7-plus'];
  } else {
    resetHomeFilters();
    return;
  }

  saveHomeDifficultyFilter(selectedHomeDifficulties);
  saveHomePaddleTimeFilter(selectedHomePaddleTimes);
  updateLocationStatus();

  if (latestResults.length > 0) {
    renderHomepage(latestResults);
  }
}

function clearUserLocation() {
  userLocation = null;
  userLocationState = 'idle';
  locationEditing = false;
  homeFilterSheetOpen = false;
  document.body.classList.remove('home-filter-sheet-open');
  removeStoredLocation();
  if (locationInput instanceof HTMLInputElement) {
    locationInput.value = '';
  }
  if (activeFilters.sort === 'near-you' || activeFilters.sort === 'nearest') {
    activeFilters.sort = 'best-now';
    if (sortSelect instanceof HTMLSelectElement) {
      sortSelect.value = 'best-now';
    }
  }
  currentExplorePage = 1;
  if (latestResults.length > 0) {
    renderHomepage(latestResults);
  } else {
    updateLocationStatus();
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

  if (filterRating instanceof HTMLSelectElement && filterRating.dataset.filterBound !== 'true') {
    filterRating.dataset.filterBound = 'true';
    filterRating.addEventListener('change', () => {
      activeFilters.rating = filterRating.value;
      currentExplorePage = 1;
      renderHomepage(latestResults);
    });
  }

  if (filterDifficulty instanceof HTMLSelectElement && filterDifficulty.dataset.filterBound !== 'true') {
    filterDifficulty.dataset.filterBound = 'true';
    filterDifficulty.addEventListener('change', () => {
      activeFilters.difficulty = filterDifficulty.value;
      currentExplorePage = 1;
      renderHomepage(latestResults);
    });
  }

  if (filterRouteType instanceof HTMLSelectElement && filterRouteType.dataset.filterBound !== 'true') {
    filterRouteType.dataset.filterBound = 'true';
    filterRouteType.value = activeFilters.routeType;
    filterRouteType.addEventListener('change', () => {
      activeFilters.routeType = filterRouteType.value || 'non-whitewater';
      currentExplorePage = 1;
      renderHomepage(latestResults);
    });
  }

  if (filterCamping instanceof HTMLSelectElement && filterCamping.dataset.filterBound !== 'true') {
    filterCamping.dataset.filterBound = 'true';
    filterCamping.addEventListener('change', () => {
      activeFilters.camping = filterCamping.value;
      currentExplorePage = 1;
      renderHomepage(latestResults);
    });
  }

  for (const button of filterRatingButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.filterBound === 'true') continue;
    button.dataset.filterBound = 'true';
    button.addEventListener('click', () => {
      activeFilters.rating = button.dataset.filterRatingButton || '';
      if (filterRating instanceof HTMLSelectElement) {
        filterRating.value = activeFilters.rating;
      }
      currentExplorePage = 1;
      renderHomepage(latestResults);
    });
  }

  if (filterDistance instanceof HTMLSelectElement && filterDistance.dataset.filterBound !== 'true') {
    filterDistance.dataset.filterBound = 'true';
    filterDistance.addEventListener('change', () => {
      activeFilters.distance = filterDistance.value;
      currentExplorePage = 1;
      renderHomepage(latestResults);
    });
  }

  if (filterPaddleTime instanceof HTMLSelectElement && filterPaddleTime.dataset.filterBound !== 'true') {
    filterPaddleTime.dataset.filterBound = 'true';
    filterPaddleTime.addEventListener('change', () => {
      activeFilters.paddleTime = filterPaddleTime.value;
      currentExplorePage = 1;
      renderHomepage(latestResults);
    });
  }

  if (filterPaddleLength instanceof HTMLSelectElement && filterPaddleLength.dataset.filterBound !== 'true') {
    filterPaddleLength.dataset.filterBound = 'true';
    filterPaddleLength.addEventListener('change', () => {
      activeFilters.paddleLength = filterPaddleLength.value;
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

  if (exploreResetButton instanceof HTMLButtonElement && exploreResetButton.dataset.filterBound !== 'true') {
    exploreResetButton.dataset.filterBound = 'true';
    exploreResetButton.addEventListener('click', () => {
      resetExploreFilters();
    });
  }

  if (nearbySortSelect instanceof HTMLSelectElement && nearbySortSelect.dataset.filterBound !== 'true') {
    nearbySortSelect.dataset.filterBound = 'true';
    nearbySortSelect.addEventListener('change', () => {
      setNearbySortMode(nearbySortSelect.value);
    });
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

  for (const button of homeDifficultyButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.filterBound === 'true') {
      continue;
    }
    button.dataset.filterBound = 'true';
    button.addEventListener('click', () => {
      toggleHomeDifficultyFilter(button.dataset.value ?? 'any');
    });
  }

  for (const button of homePaddleTimeButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.filterBound === 'true') {
      continue;
    }
    button.dataset.filterBound = 'true';
    button.addEventListener('click', () => {
      toggleHomePaddleTimeFilter(button.dataset.value ?? 'any');
    });
  }

  for (const button of homePresetButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.filterBound === 'true') {
      continue;
    }
    button.dataset.filterBound = 'true';
    button.addEventListener('click', () => {
      applyHomePreset(button.dataset.homePreset || button.dataset.preset || '');
    });
  }

  for (const button of homeResetButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.filterBound === 'true') {
      continue;
    }
    button.dataset.filterBound = 'true';
    button.addEventListener('click', () => {
      resetHomeFilters();
    });
  }

  if (homeFilterToggle instanceof HTMLButtonElement && homeFilterToggle.dataset.filterBound !== 'true') {
    homeFilterToggle.dataset.filterBound = 'true';
    homeFilterToggle.addEventListener('click', () => {
      setHomeFilterSheetOpen(!homeFilterSheetOpen);
    });
  }

  if (homeFilterCloseButton instanceof HTMLButtonElement && homeFilterCloseButton.dataset.filterBound !== 'true') {
    homeFilterCloseButton.dataset.filterBound = 'true';
    homeFilterCloseButton.addEventListener('click', () => {
      setHomeFilterSheetOpen(false);
    });
  }

  if (homeFilterBackdrop instanceof HTMLElement && homeFilterBackdrop.dataset.filterBound !== 'true') {
    homeFilterBackdrop.dataset.filterBound = 'true';
    homeFilterBackdrop.addEventListener('click', () => {
      setHomeFilterSheetOpen(false);
    });
  }

}

export function initSummaryBoard() {
  if (initialized) {
    return;
  }
  initialized = true;

  setupFilters();
  setupLocationControls();

  const storedLocation = loadStoredLocation();
  selectedRadiusMiles = loadStoredRadiusMiles();
  selectedHomeDifficulties = loadStoredHomeDifficultyFilter();
  selectedHomePaddleTimes = loadStoredHomePaddleTimeFilter();
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

  if (nearbySortSelect instanceof HTMLSelectElement) {
    nearbySortSelect.value = nearbySortMode;
  }

  updateLocationStatus();
  maybeUseGrantedLocation();

  if (boardRefreshButton instanceof HTMLButtonElement) {
    boardRefreshButton.addEventListener('click', () => {
      loadBoard({ preserveMapViewport: true });
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

  if (summaryMapToggle instanceof HTMLButtonElement) {
    summaryMapToggle.addEventListener('click', () => {
      summaryMapCollapsed = !summaryMapCollapsed;
      summaryMapController.updateView();
    });
  }

  for (const button of summaryMapMobileViewButtons) {
    if (!(button instanceof HTMLButtonElement)) {
      continue;
    }

    button.addEventListener('click', () => {
      summaryMapController.setViewAndSync(button.dataset.summaryMapMobileView, {
        scrollIntoView: button.dataset.summaryMapMobileView === 'map',
      });
    });
  }

  if (summaryMapMobileBackButton instanceof HTMLButtonElement) {
    summaryMapMobileBackButton.addEventListener('click', () => {
      summaryMapController.setViewAndSync('list');
    });
  }

  window.addEventListener('resize', () => {
    syncExploreShellHeight();
    summaryMapController.updateView();
  });

  phoneBreakpoint.addEventListener('change', () => {
    document.body.classList.toggle('home-filter-sheet-open', phoneBreakpoint.matches && homeFilterSheetOpen);
    updateLocationStatus();
    if (summaryMapSupportsMobileViews && phoneBreakpoint.matches) {
      summaryMapController.setView('list');
    }
    summaryMapController.updateView();
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
  summaryMapController.updateView();
  if (isRiverFirstExploreMap()) {
    // Start the static geometry request before the map style and live scores
    // finish loading so the first usable map frame can use canonical lines.
    ensureCanonicalRiverGeometries();
  }
  loadBoard({
    silent: hydratedBoard,
    preserveMapViewport: hydratedBoard,
  });
  window.setInterval(() => {
    loadBoard({
      silent: true,
      preserveMapViewport: true,
    });
  }, AUTO_REFRESH_MS);
}
