import {
  bindMarkerPopup,
  clearMapMarkers,
  createMapStatusController,
  createPaddleMap,
  ensureMapLibre,
  escapeHtml,
  fitMapBounds,
  isMapReady,
  markerClassForRating,
  scoreZoneRouteLabel,
  syncGeoJsonOverlay,
  waitForMapReady,
} from './map-runtime.js';
import { createBoardMapModel } from './board-map-model.js';
import {
  boardMarkerClassFor as markerClassFor,
  createBoardMapMarker,
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
  createBoardDisplayItemBuilder,
  createBoardResultFilter,
  DEFAULT_RADIUS_MILES,
  difficultyPreferenceLabel,
  estimatedPaddleMinutesForItem,
  formatHomeChoiceSummary,
  HOME_DIFFICULTY_OPTIONS,
  HOME_PADDLE_TIME_OPTIONS,
  isChoiceSetAny,
  isGroupedItem,
  isViableRecommendationItem,
  joinWithBullet,
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
  simpleSentence,
  sortBoardItems,
  sortNearbyResultsForDisplay,
  titleCase,
  toggleChoiceValue,
} from './board-domain.js';
import {
  matchesStateForGeocodeResult,
} from './location-domain.js';
import {
  cardLinkLabel,
  cardSummary,
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
  shortRouteLengthLabel,
  summaryMentionsFlowShift,
  summaryMentionsWeather,
  summaryParts,
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
import { loadCanonicalRiverRouteLine } from '../lib/canonical-river-geometries.js';
import { getRoutePreviewPhoto } from '../data/route-gallery.ts';
import {
  coverageCenterForRoutes,
  groupRoutesByConditionScore,
  routesForRiverItem,
} from '../lib/river-coverage.js';
import {
  routeMatchesPaddleFilters,
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
  groupRouteQualifier: 'matching',
});

const STORAGE_KEY = 'paddletoday:user-location';
const STORAGE_RADIUS_KEY = 'paddletoday:recommendation-radius';
const STORAGE_HOME_DIFFICULTY_KEY = 'paddletoday:home-difficulty-filter';
const STORAGE_HOME_PADDLE_TIME_KEY = 'paddletoday:home-paddle-time-filter';
const STORAGE_HOME_PADDLE_LENGTH_KEY = 'paddletoday:home-paddle-length-filter';
const STORAGE_HOME_CAMPING_KEY = 'paddletoday:home-camping-filter';
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
  chooseCandidate: (candidates, parsed) =>
    parsed.state
      ? candidates.find((result) => matchesStateForGeocodeResult(result, parsed.state)) ?? candidates[0]
      : candidates[0],
});
const AUTO_REFRESH_MS = 5 * 60 * 1000;
const NEARBY_TRAVEL_MINUTES = 90;
const DAY_TRIP_TRAVEL_MINUTES = 180;
const HOME_PADDLE_LENGTH_OPTIONS = ['under-5', '5-to-10', '10-plus'];
const HOME_CAMPING_OPTIONS = ['overnight', 'nearby'];
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
const homeLiveCounts = Array.from(document.querySelectorAll('[data-home-live-count]'));
const homeDifficultySelect = document.querySelector('[data-home-difficulty-select]');
const homePaddleTimeSelect = document.querySelector('[data-home-paddle-time-select]');
const homePaddleLengthSelect = document.querySelector('[data-home-paddle-length-select]');
const homeCampingSelect = document.querySelector('[data-home-camping-select]');
const homePresetButtons = Array.from(document.querySelectorAll('[data-home-preset]'));
const homeResetButtons = Array.from(document.querySelectorAll('[data-home-reset-filters]'));
const homeRouteMix = document.querySelector('[data-home-route-mix]');
const homeHeadline = document.querySelector('[data-home-headline]');
const homeLocationEmpty = document.querySelector('[data-home-location-empty]');
const homeNearbyMapSection = document.querySelector('[data-home-nearby-map-section]');
const homeResultsRail = document.querySelector('[data-home-results-rail]');
const homeResultsEmpty = document.querySelector('[data-home-results-empty]');
const homeSetupNote = document.querySelector('[data-home-setup-note]');
const homeSetupPills = document.querySelector('[data-home-setup-pills]');
const homeRecommendationsMapBlock = document.querySelector('.home-recommendations__map-block');
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
const featuredSegment = document.querySelector('[data-field="featured-segment"]');
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
const featuredGallery = document.querySelector('[data-featured-gallery]');
const featuredGalleryImage = document.querySelector('[data-featured-gallery-image]');
const featuredGalleryPlaceholder = document.querySelector('[data-featured-gallery-placeholder]');
const featuredGalleryContribute = document.querySelector('[data-featured-gallery-contribute]');
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
const exploreResetButton = document.querySelector('[data-explore-reset]');

const filterSummary = document.querySelector('[data-filter-summary]');
const filterPills = document.querySelector('[data-filter-pills]');
const filterButtons = Array.from(document.querySelectorAll('[data-filter-toggle]'));
const filterSearch = document.querySelector('[data-filter-search]');
const filterState = document.querySelector('[data-filter-state]');
const filterDifficulty = document.querySelector('[data-filter-difficulty]');
const filterDistance = document.querySelector('[data-filter-distance]');
const filterPaddleTime = document.querySelector('[data-filter-paddle-time]');
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
const summaryMapStatusController = createMapStatusController(summaryMapStatus, {
  loading: ({ nearby }) => nearby ? 'Loading nearby picks.' : 'Loading map markers.',
  empty: ({ nearby }) => nearby
    ? 'No nearby results match the current preferences.'
    : 'No results match the current filters.',
  unavailable: ({ nearby }) => nearby
    ? 'Map unavailable right now. Use the nearby route cards above.'
    : 'Map unavailable right now. Use the route list below.',
});
const summaryMapShell = document.querySelector('[data-summary-map-shell]');
const summaryMapToggle = document.querySelector('[data-summary-map-toggle]');
const summaryMapMobileSwitch = document.querySelector('[data-summary-map-mobile-switch]');
const summaryMapMobileViewButtons = Array.from(document.querySelectorAll('[data-summary-map-mobile-view]'));
const summaryMapMobileCountNodes = Array.from(document.querySelectorAll('[data-summary-map-mobile-count]'));
const summaryMapMobileBackButton = document.querySelector('[data-summary-map-mobile-back]');
const summaryMapResultsTitle = document.querySelector('[data-summary-map-results-title]');
const summaryMapResults = document.querySelector('[data-summary-map-results]');
const summaryMapResultsNote = document.querySelector('[data-summary-map-results-note]');
const summaryScoreFilterButtons = Array.from(document.querySelectorAll('[data-summary-score-toggle]'));
const phoneBreakpoint = window.matchMedia('(max-width: 760px)');
const summaryMapMode = summaryMapShell instanceof HTMLElement ? (summaryMapShell.dataset.summaryMapMode || 'explore') : 'explore';
const summaryMapMobileLayout =
  summaryMapShell instanceof HTMLElement ? (summaryMapShell.dataset.summaryMapMobileLayout || 'collapse') : 'collapse';
const summaryMapSupportsMobileViews = summaryMapMobileLayout === 'list-map';
const homeSummaryMapMode = summaryMapShell instanceof HTMLElement && summaryMapShell.classList.contains('summary-map-shell--home');
const summaryMapItemNounSingular =
  summaryMapShell instanceof HTMLElement ? (summaryMapShell.dataset.summaryMapItemSingular || 'river') : 'river';
const summaryMapItemNounPlural =
  summaryMapShell instanceof HTMLElement ? (summaryMapShell.dataset.summaryMapItemPlural || 'rivers') : 'rivers';
const featuredMapAlwaysVisible =
  featuredPanel instanceof HTMLElement && featuredPanel.dataset.featuredMapAlwaysVisible === 'true';
const featuredUnlockedWithoutLocation =
  featuredPanel instanceof HTMLElement && featuredPanel.dataset.featuredUnlocked === 'true';

const DEFAULT_VISIBLE_RATINGS = ['Strong', 'Good', 'Fair'];
let visibleRatings = new Set(DEFAULT_VISIBLE_RATINGS);

const activeFilters = {
  paddleable: false,
  rating: '',
  search: '',
  state: '',
  difficulty: '',
  distance: '',
  paddleTime: '',
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
let summaryMapRenderVersion = 0;
let selectedSummaryMapKey = null;
let lastSummaryMapItems = [];
let pendingSummaryMapItems = [];
let pendingSummaryMapPreserveViewport = false;
let summaryMapRequested = false;
let lastFeaturedHeroKey;
let featuredHeroAnimationTimeout = 0;
let userLocation = null;
let userLocationState = 'idle';
let locationEditing = false;
let selectedRadiusMiles = DEFAULT_RADIUS_MILES;
let selectedHomeDifficulties = ['any'];
let selectedHomePaddleTimes = ['any'];
let selectedHomePaddleLengths = ['any'];
let selectedHomeCamping = 'any';
let nearbySortMode = 'best-score';
let currentExplorePage = 1;
let exploreLockedHeight = 0;
let exploreLayoutKey = '';
  let lastBoardGeneratedAt = null;
  let summaryMapCollapsed = phoneBreakpoint.matches;
  let summaryMapMobileView = summaryMapSupportsMobileViews && phoneBreakpoint.matches
    ? homeSummaryMapMode
      ? 'map'
      : 'list'
    : 'map';
  let initialized = false;
let homeMapRefreshClassTimeout = 0;
let hoveredSummaryMapKey = null;
const { renderFeaturedMap } = createBoardFeaturedMapController({
  elements: {
    shell: featuredMapShell,
    container: featuredMap,
    status: featuredMapStatus,
    caption: featuredMapCaption,
  },
  getAccessPoints: (item) => {
    const putIn = item?.cardRoute?.river?.putIn;
    const takeOut = item?.cardRoute?.river?.takeOut;
    return [
      Number.isFinite(putIn?.latitude) && Number.isFinite(putIn?.longitude)
        ? { ...putIn, kind: 'putIn' }
        : null,
      Number.isFinite(takeOut?.latitude) && Number.isFinite(takeOut?.longitude)
        ? { ...takeOut, kind: 'takeOut' }
        : null,
    ].filter(Boolean);
  },
  getRouteLine: (item, points) => featuredRouteLineFeature(item, points),
  getTracedCoordinates: (routeLine) =>
    routeLine?.properties?.traced && routeLine.geometry?.type === 'LineString'
      ? routeLine.geometry.coordinates
      : [],
  markerClassFor,
  markerLabel: visibleMapMarkerLabel,
  statusLabel: regionStateText,
  fitOptions: {
    padding: { top: 26, right: 26, bottom: 26, left: 26 },
    maxZoom: 10.9,
  },
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
  datasetKey: 'summaryKey',
});
const renderCardGrid = createBoardCardGridRenderer({
  createCard,
  refreshFavoriteButtons,
  onRendered: (container, options) => {
    if (!options.syncMap || container !== homeResultsRail) {
      return;
    }

    const cards = Array.from(container.querySelectorAll('[data-summary-key]'));
    for (const card of cards) {
      if (!(card instanceof HTMLElement)) continue;

      card.addEventListener('click', (event) => {
        const target = event.target;
        if (
          target instanceof Element
          && target.closest('a, button, summary, input, select, textarea, label')
        ) {
          return;
        }

        const key = card.dataset.summaryKey;
        if (key) {
          openSummaryMapItem(key);
        }
      });
      card.addEventListener('focusin', () => {
        const key = card.dataset.summaryKey;
        if (key) {
          updateSummaryMapSelection(key);
        }
      });
      card.addEventListener('mouseenter', () => {
        const key = card.dataset.summaryKey;
        if (key) {
          setSummaryMapHover(key);
        }
      });
      card.addEventListener('mouseleave', () => {
        setSummaryMapHover(null);
      });
    }
  },
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
  onMapViewActivated: () => requestSummaryMapRender(),
  getResultsOptions: () => ({
    countMode: 'routes',
    emptyText: isNearbySummaryMapMode()
      ? 'No results match your current preferences.'
      : 'No results match these filters.',
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
    onHover: (key) => setSummaryMapHover(key),
    onSelection: (key) => updateSummaryMapSelection(key),
    selectionFallback: 'first',
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
  refreshReadyLabel: 'Refresh board',
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

function setText(scope, field, value) {
  const nodes = Array.from(scope.querySelectorAll(`[data-field="${field}"]`));
  for (const node of nodes) {
    node.textContent = value;
  }
  return nodes[0] ?? null;
}

function syncAppMobileViewportHeight() {
  if (!(document.documentElement instanceof HTMLElement)) {
    return;
  }

  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
  if (!Number.isFinite(viewportHeight) || viewportHeight <= 0) {
    return;
  }

  document.documentElement.style.setProperty('--app-mobile-vh', `${Math.round(viewportHeight)}px`);
}

function normalizeHomePaddleLengthFilters(value) {
  return normalizeChoiceSet(value, ['any', ...HOME_PADDLE_LENGTH_OPTIONS]);
}

function normalizeHomeCampingFilter(value) {
  return HOME_CAMPING_OPTIONS.includes(value) ? value : 'any';
}

function campingPreferenceLabel(value) {
  if (value === 'overnight') return 'Overnight-friendly';
  if (value === 'nearby') return 'Camp nearby';
  return 'Any camping';
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
  if (!isChoiceSetAny(selectedHomePaddleLengths)) {
    const labels = { 'under-5': 'Under 5 mi', '5-to-10': '5–10 mi', '10-plus': '10+ mi' };
    parts.push(formatHomeChoiceSummary(selectedHomePaddleLengths, (value) => labels[value] ?? value, 'Any length'));
  }
  if (selectedHomeCamping !== 'any') {
    parts.push(campingPreferenceLabel(selectedHomeCamping));
  }
  return parts;
}


function homeActivePreferenceCount() {
  let count = 0;
  if (selectedRadiusMiles !== DEFAULT_RADIUS_MILES) count += 1;
  if (!isChoiceSetAny(selectedHomeDifficulties)) count += 1;
  if (!isChoiceSetAny(selectedHomePaddleTimes)) count += 1;
  if (!isChoiceSetAny(selectedHomePaddleLengths)) count += 1;
  if (selectedHomeCamping !== 'any') count += 1;
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

  if (isChoiceSetAny(selectedHomePaddleLengths)) {
    labels.push('Any paddle length');
  } else {
    const lengthLabels = { 'under-5': 'Under 5 mi', '5-to-10': '5–10 mi', '10-plus': '10+ mi' };
    labels.push(formatHomeChoiceSummary(selectedHomePaddleLengths, (value) => lengthLabels[value] ?? value, 'Any paddle length'));
  }

  labels.push(campingPreferenceLabel(selectedHomeCamping));

  return labels
      .map((label) => `<span class="home-location-bar__refine-pill">${escapeHtml(label)}</span>`)
      .join('');
  }

  function syncHomePreferencesVisibility() {
    if (homeRefineRow instanceof HTMLElement) {
      homeRefineRow.dataset.expanded = 'true';
    }

    if (homeRadiusPanel instanceof HTMLElement) {
      homeRadiusPanel.hidden = false;
    }

    if (homeRadiusSummary instanceof HTMLElement) {
      homeRadiusSummary.classList.add('sr-only');
    }

    if (homeRefineSummary instanceof HTMLElement) {
      homeRefineSummary.classList.add('sr-only');
    }
  }

function homeSetupSummaryLabels() {
  const labels = [];
  const locationReady = userLocationState === 'ready' && Boolean(userLocation);

  if (locationReady) {
    labels.push(shortLocationLabel());
    labels.push(`Within ${selectedRadiusMiles} mi`);
  } else {
    labels.push('All routes');
    labels.push('Best score first');
  }

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

  if (isChoiceSetAny(selectedHomePaddleLengths)) {
    labels.push('Any paddle length');
  } else {
    labels.push(formatHomeChoiceSummary(
      selectedHomePaddleLengths,
      (value) => ({ 'under-5': 'Under 5 mi', '5-to-10': '5–10 mi', '10-plus': '10+ mi' }[value] ?? value),
      'Any paddle length',
    ));
  }

  labels.push(campingPreferenceLabel(selectedHomeCamping));

  return labels;
}

function renderHomeSetupBar() {
  const locationReady = userLocationState === 'ready' && Boolean(userLocation);

  if (homeSetupNote instanceof HTMLElement) {
    homeSetupNote.textContent = locationReady
      ? "Your location and preferences shape today's best pick and the routes below."
      : 'You are seeing the full board. Add your location to personalize the map and route order.';
  }

  if (homeSetupPills instanceof HTMLElement) {
    homeSetupPills.innerHTML = homeSetupSummaryLabels()
      .map((label) => `<span class="home-recommendations__setup-pill">${escapeHtml(label)}</span>`)
      .join('');
  }
}

function pulseHomeResultsSurface() {
  if (!(homeRecommendationsMapBlock instanceof HTMLElement)) {
    return;
  }

  homeRecommendationsMapBlock.classList.remove('home-recommendations__map-block--refreshing');
  void homeRecommendationsMapBlock.offsetWidth;
  homeRecommendationsMapBlock.classList.add('home-recommendations__map-block--refreshing');

  window.clearTimeout(homeMapRefreshClassTimeout);
  homeMapRefreshClassTimeout = window.setTimeout(() => {
    homeRecommendationsMapBlock.classList.remove('home-recommendations__map-block--refreshing');
  }, 260);
}

function isHomepageResultsRailActive() {
  return homeResultsRail instanceof HTMLElement;
}

function updateHomeRailSelection(key) {
  if (!(homeResultsRail instanceof HTMLElement)) {
    return;
  }

  const cards = Array.from(homeResultsRail.querySelectorAll('[data-summary-key]'));
  for (const card of cards) {
    if (!(card instanceof HTMLElement)) continue;
    const active = Boolean(key) && card.dataset.summaryKey === key;
    card.classList.toggle('river-card--map-active', active);
  }
}

function setSummaryMapHover(key) {
  hoveredSummaryMapKey = key || null;

  for (const [markerKey, marker] of mapMarkersByKey.entries()) {
    const markerElement = marker?.getElement?.();
    if (!(markerElement instanceof HTMLElement)) {
      continue;
    }

    markerElement.classList.toggle('score-map-marker--hovered', Boolean(hoveredSummaryMapKey) && markerKey === hoveredSummaryMapKey);
  }
}

function scrollHomeResultsRailToKey(key) {
  if (!(homeResultsRail instanceof HTMLElement) || !key) {
    return;
  }

  const card = homeResultsRail.querySelector(`[data-summary-key="${CSS.escape(key)}"]`);
  if (!(card instanceof HTMLElement)) {
    return;
  }

  card.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center',
  });
}

function formatRouteCountLabel(count, { withVerb = false } = {}) {
  return formatMixedResultCount(count, { withVerb });
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

const buildDisplayItems = createBoardDisplayItemBuilder({
  selectRepresentative: (routes, selectionMode) =>
    pickRepresentativeRoute(routes, selectionMode),
  distanceForResult,
  distanceBucketForMinutes: distanceBucketLabel,
  buildGroupLink: (item) => `/rivers/by-river/${item.cardRoute.river.riverId}/`,
});

function campingClassificationForResult(result) {
  return result?.river?.logistics?.campingClassification ?? 'unknown';
}

function isOvernightCampingClassification(classification) {
  return (
    classification === 'overnight_capable' ||
    classification === 'on_route_campsite' ||
    classification === 'sandbar_or_gravel_bar'
  );
}

function matchesHomeCampingFilter(result) {
  if (selectedHomeCamping === 'any') {
    return true;
  }

  const classification = campingClassificationForResult(result);
  if (selectedHomeCamping === 'overnight') {
    return isOvernightCampingClassification(classification);
  }

  if (selectedHomeCamping === 'nearby') {
    return (
      isOvernightCampingClassification(classification) ||
      classification === 'endpoint_campground' ||
      classification === 'nearby_basecamp'
    );
  }

  return true;
}

function matchesHomeNearbyFilters(result) {
  if (!isChoiceSetAny(selectedHomeDifficulties) && !selectedHomeDifficulties.includes(result?.river?.difficulty)) {
    return false;
  }

  if (!isChoiceSetAny(selectedHomePaddleTimes) || !isChoiceSetAny(selectedHomePaddleLengths)) {
    if (!routeMatchesPaddleFilters(result, {
      paddleTime: isChoiceSetAny(selectedHomePaddleTimes) ? '' : selectedHomePaddleTimes,
      paddleLength: isChoiceSetAny(selectedHomePaddleLengths) ? '' : selectedHomePaddleLengths[0],
    })) {
      return false;
    }
  }

  if (!matchesHomeCampingFilter(result)) {
    return false;
  }

  return true;
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
    homeFreshness.textContent = `${base} Refreshing now...`;
    return;
  }

  if (fallback && generatedAt) {
    homeFreshness.textContent = `${base} Showing latest available data.`;
    return;
  }

  homeFreshness.textContent = base;
}

function updateSummaryScoreFilterButtons(counts = {}) {
  for (const button of summaryScoreFilterButtons) {
    if (!(button instanceof HTMLButtonElement)) continue;
    const rating = button.dataset.summaryScoreToggle || '';
    const count = Number(counts[rating] ?? 0);
    const active = visibleRatings.has(rating);
    const label = rating === 'Fair' ? 'Fair: tradeoffs' : rating;
    button.disabled = false;
    button.classList.toggle('summary-map-legend__toggle--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
    button.setAttribute(
      'aria-label',
      `${active ? 'Hide' : 'Show'} ${count} ${label} ${count === 1 ? 'route' : 'routes'}`,
    );
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

  updateSummaryScoreFilterButtons({
    Strong: strongCount,
    Good: goodCount,
    Fair: mixedCount,
    'No-go': noGoCount,
  });

  for (const countNode of homeTrackedCounts) {
    if (!(countNode instanceof HTMLElement)) continue;
    countNode.textContent = `${totalCount} routes tracked`;
  }
}


function summaryMapRoutePoints(item) {
  const river = item?.cardRoute?.river;
  const putIn = river?.putIn;
  const takeOut = river?.takeOut;
  const points = [
    Number.isFinite(putIn?.latitude) && Number.isFinite(putIn?.longitude)
      ? { ...putIn, kind: 'putIn' }
      : null,
    Number.isFinite(takeOut?.latitude) && Number.isFinite(takeOut?.longitude)
      ? { ...takeOut, kind: 'takeOut' }
      : null,
  ].filter(Boolean);

  if (points.length >= 2 && (points[0].longitude !== points[1].longitude || points[0].latitude !== points[1].latitude)) {
    return points;
  }

  return (Array.isArray(river?.accessPoints) ? river.accessPoints : [])
    .map((point, index, accessPoints) => {
      if (!Number.isFinite(point?.latitude) || !Number.isFinite(point?.longitude)) {
        return null;
      }

      return {
        ...point,
        kind: index === 0 ? 'putIn' : index === accessPoints.length - 1 ? 'takeOut' : 'access',
      };
    })
    .filter(Boolean)
    .sort((left, right) => {
      const leftMile = Number(left.mileFromStart);
      const rightMile = Number(right.mileFromStart);
      return (Number.isFinite(leftMile) ? leftMile : 0) - (Number.isFinite(rightMile) ? rightMile : 0);
    });
}

function homeCoverageRouteItems(item) {
  return routesForRiverItem(item).map((cardRoute) => ({
    ...item,
    key: `${item.key}:${cardRoute.river.slug}`,
    kind: 'route',
    cardRoute,
  }));
}

function homeCoveragePoints(item) {
  return homeCoverageRouteItems(item).flatMap((routeItem) => summaryMapRoutePoints(routeItem));
}

function summaryMapFallbackRouteLine(item, points) {
  if (points.length < 2) {
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
      coordinates: points.map((point) => [point.longitude, point.latitude]),
    },
  };
}

async function summaryMapRouteLine(item) {
  const points = summaryMapRoutePoints(item);
  if (points.length < 2) {
    return null;
  }

  const route = item?.cardRoute?.river;
  const routeId = route?.slug || route?.id;
  if (routeId) {
    try {
      const routeLine = await loadCanonicalRiverRouteLine(routeId, points, { stateName: route.state });
      if (routeLine) {
        return {
          ...routeLine,
          properties: {
            ...routeLine.properties,
            key: item.key,
            rating: item.cardRoute.rating,
          },
        };
      }
    } catch (error) {
      console.warn('Canonical river geometry unavailable for home result route; using access coordinates.', error);
    }
  }

  return summaryMapFallbackRouteLine(item, points);
}

function isSummaryMapStyleReady() {
  return isMapReady(mapRuntime);
}

function syncSummaryMapRouteLines(data) {
  if (!mapRuntime || !isSummaryMapStyleReady()) {
    return;
  }

  const sourceId = 'home-summary-route-lines';
  const casingLayerId = 'home-summary-route-lines-casing';
  const layerId = 'home-summary-route-lines';

  syncGeoJsonOverlay(mapRuntime, {
    sourceId,
    data,
    layers: [{
      id: casingLayerId,
      type: 'line',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#ffffff',
        'line-width': ['interpolate', ['linear'], ['zoom'], 3, 3.8, 8, 6.2, 12, 8],
        'line-opacity': 0.72,
      },
    }, {
      id: layerId,
      type: 'line',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#16758a',
        'line-width': ['interpolate', ['linear'], ['zoom'], 3, 1.8, 8, 3.4, 12, 4.8],
        'line-opacity': 0.72,
      },
    }],
  });
}

async function renderSummaryMapRouteLines(items, renderVersion) {
  const routeItems = items.flatMap((item) => homeCoverageRouteItems(item));
  const features = (await Promise.all(routeItems.map((item) => summaryMapRouteLine(item)))).filter(Boolean);
  if (renderVersion !== summaryMapRenderVersion || !mapRuntime) {
    return;
  }

  syncSummaryMapRouteLines({
    type: 'FeatureCollection',
    features,
  });
}

async function featuredRouteLineFeature(item, points) {
  const route = item?.cardRoute?.river;
  const routeId = route?.slug || route?.id;
  if (routeId && points.length > 1) {
    try {
      const routeLine = await loadCanonicalRiverRouteLine(routeId, points, { stateName: route.state });
      if (routeLine) {
        return routeLine;
      }
    } catch (error) {
      console.warn('Canonical river geometry unavailable for featured route; using access coordinates.', error);
    }
  }

  return featuredRouteFallbackFeature(points);
}

function supportingReasonList(item, nearbyReady) {
  const summary = summaryParts(cardSummary(item));
  const reasons = [];
  const locationReady = userLocationState === 'ready' && Boolean(userLocation);

  if (summary.main) {
    const mainParts = summary.main
      .split(/\s*(?:\u2022|\/)\s*/g)
      .map((part) => part.trim())
      .filter(Boolean);

    for (const part of mainParts) {
      reasons.push(simpleSentence(part, 'Conditions look workable right now.'));
    }
  }

  if (summary.weather) {
    reasons.push(simpleSentence(summary.weather, 'Weather needs a closer look today.'));
  }

  if (nearbyReady && locationReady && Number.isFinite(item.travelMinutes)) {
    reasons.push(`About ${formatTravelLabel(item.travelMinutes)} from ${shortLocationLabel()}.`);
  }

  return Array.from(new Set(reasons)).slice(0, 2);
}

function updateFeaturedGallery(item) {
  if (!(featuredGallery instanceof HTMLElement) || !(featuredGalleryImage instanceof HTMLImageElement)) {
    return;
  }

  const river = item?.cardRoute?.river;
  if (!river?.slug) {
    featuredGallery.hidden = true;
    featuredGalleryImage.removeAttribute('src');
    featuredGalleryImage.alt = '';
    if (featuredGalleryPlaceholder instanceof HTMLElement) {
      featuredGalleryPlaceholder.hidden = true;
    }
    return;
  }

  const photo = getRoutePreviewPhoto(river);
  featuredGallery.hidden = false;
  featuredGalleryImage.src = photo.src;
  featuredGalleryImage.alt = photo.alt || `${river.name} route photo`;
  if (featuredGalleryPlaceholder instanceof HTMLElement) {
    featuredGalleryPlaceholder.hidden = !photo.isPlaceholder;
  }
  if (featuredGalleryContribute instanceof HTMLAnchorElement) {
    featuredGalleryContribute.href = `/contribute/?riverSlug=${encodeURIComponent(river.slug)}`;
  }
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
}

function updateFeaturedHeroAnimation(nextKey) {
  if (!(featuredPanel instanceof HTMLElement)) {
    return;
  }

  const normalizedKey = nextKey || 'none';
  const shouldAnimate = lastFeaturedHeroKey !== undefined && lastFeaturedHeroKey !== normalizedKey;
  lastFeaturedHeroKey = normalizedKey;

  if (!shouldAnimate) {
    return;
  }

  window.clearTimeout(featuredHeroAnimationTimeout);
  featuredPanel.classList.remove('home-featured--updated');
  void featuredPanel.offsetWidth;
  featuredPanel.classList.add('home-featured--updated');
  featuredHeroAnimationTimeout = window.setTimeout(() => {
    featuredPanel.classList.remove('home-featured--updated');
  }, 720);
}

function updateFeaturedHero(nearbyItems, overallItems) {
  const locationReady = userLocationState === 'ready' && Boolean(userLocation);
  const preferredNearbyItems = recommendationPoolForNearby(nearbyItems);
  const nearbyReady = locationReady && preferredNearbyItems.length > 0;
  const item = nearbyReady ? preferredNearbyItems[0] : locationReady ? null : overallItems[0] ?? null;
  const activePreferenceText = homePreferenceSummaryTextClean();
  updateFeaturedHeroAnimation(item?.key || (locationReady ? 'empty' : 'locked'));
  if (!item) {
    renderFeaturedMap(null, { visible: false, status: '' });
    if (featuredPanel instanceof HTMLElement) {
      featuredPanel.classList.toggle('home-featured--locked', !locationReady && !featuredUnlockedWithoutLocation);
      featuredPanel.classList.toggle('home-featured--empty', locationReady);
      featuredPanel.classList.remove('hero-call--great', 'hero-call--good', 'hero-call--marginal', 'hero-call--no-go');
    }
    if (featuredLabel instanceof HTMLElement) {
      featuredLabel.textContent = 'Today\'s Best';
    }
    if (featuredState instanceof HTMLElement) {
      featuredState.hidden = locationReady;
      featuredState.textContent = 'Set your location to see the best nearby paddle right now.';
    }
    if (featuredName instanceof HTMLAnchorElement) {
        featuredName.textContent = locationReady ? 'No picks in range' : 'Today\'s Best';
      featuredName.href = locationReady ? '#best-options' : '#home-location';
    }
    if (featuredReach instanceof HTMLElement) {
      featuredReach.textContent = locationReady
        ? `Increase drive distance above ${selectedRadiusMiles} miles to compare more routes.`
        : 'Set your location to unlock today\'s best nearby pick.';
    }
    if (featuredBridge instanceof HTMLElement) {
      featuredBridge.textContent = locationReady
        ? ''
        : 'Set your location to unlock today\'s best.';
    }
    setText(document, 'featured-score', '--');
    setText(document, 'featured-rating', locationReady ? 'Out of range' : 'Locked');
    setText(document, 'featured-verdict', locationReady ? 'Nothing in range yet' : 'Set your location');
    setText(
      document,
      'featured-reason',
      locationReady
        ? 'Paddle Today currently covers Midwest routes only.'
        : 'Add a location to see drive time and nearby ranking.'
    );
    setText(document, 'featured-facts-label', locationReady ? '' : 'Route facts');
    setText(document, 'featured-confidence', locationReady ? '' : 'Data confidence coming in');
    setText(document, 'featured-segment', '');
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
    if (featuredSegment instanceof HTMLElement) {
      featuredSegment.hidden = true;
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
    updateFeaturedGallery(null);
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
  renderFeaturedMap(item, { visible: nearbyReady || featuredMapAlwaysVisible, status: regionStateText(item) });
  const ratingKey = ratingToneKey(item.cardRoute.rating);
  if (featuredPanel instanceof HTMLElement) {
    featuredPanel.classList.toggle('home-featured--locked', !locationReady && !featuredUnlockedWithoutLocation);
    featuredPanel.classList.remove('home-featured--empty');
    featuredPanel.classList.remove('hero-call--great', 'hero-call--good', 'hero-call--marginal', 'hero-call--no-go');
    featuredPanel.classList.add(`hero-call--${ratingKey}`);
  }
  if (featuredLabel instanceof HTMLElement) {
    featuredLabel.textContent = activePreferenceText ? 'Today\'s Best for your setup' : 'Today\'s Best near you';
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
  const featuredSegmentLabel = segmentLabelForItem(item);
  setText(document, 'featured-segment', featuredSegmentLabel);
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
    !isGroupedItem(item) && routeDifficultyLabel(item)
      ? routeDifficultyLabel(item)
      : 'Difficulty varies'
  );
  setText(
    document,
    'featured-paddle-time',
    !isGroupedItem(item) && routeEstimatedTimeLabel(item)
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
  if (featuredSegment instanceof HTMLElement) {
    featuredSegment.hidden = !featuredSegmentLabel;
  }
  if (featuredDistance instanceof HTMLElement) {
    featuredDistance.hidden = false;
  }
  updateFeaturedWeather(item);
  updateFeaturedGallery(item);
  if (featuredSignal instanceof HTMLElement) {
    featuredSignal.innerHTML = signalRowMarkup(item);
  }
  if (featuredReasons instanceof HTMLElement) {
    const reasons = supportingReasonList(item, nearbyReady);
    featuredReasons.innerHTML = reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join('');
    featuredReasons.hidden = reasons.length === 0;
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

  const readyTitle = recommendationTitle.dataset.readyTitle || 'Compare nearby picks';
  const defaultTitle = recommendationTitle.dataset.defaultTitle || 'More good picks nearby';
  const defaultSummary =
    recommendationSummary.dataset.defaultSummary || 'Set your location above to compare nearby picks.';
  const readySummaryTemplate = recommendationSummary.dataset.readySummary || '';

  recommendationTitle.textContent = locationReady ? readyTitle : defaultTitle;

  recommendationSummary.textContent = locationReady
    ? readySummaryTemplate
      ? readySummaryTemplate
        .replace('{radius}', String(selectedRadiusMiles))
        .replace('{location}', shortLocationLabel())
        .replace('{preferences}', activePreferenceText || 'your current filters')
      : activePreferenceText
        ? `Start with the best match above, then compare nearby picks within ${selectedRadiusMiles} miles of ${shortLocationLabel()} that fit ${activePreferenceText}.`
        : `Start with the best match above, then compare nearby picks within ${selectedRadiusMiles} miles of ${shortLocationLabel()}.`
    : defaultSummary;

  if (recommendationCount instanceof HTMLElement) {
    recommendationCount.textContent = locationReady
      ? formatRouteCountLabel(preferredNearbyItems.length)
      : 'Showing 0 results';
  }

  if (recommendationItems.length === 0) {
    recommendationEmpty.textContent = locationReady
      ? activePreferenceText
        ? `No recommended routes currently match ${activePreferenceText} within ${selectedRadiusMiles} miles.`
        : `No recommended routes are currently available within ${selectedRadiusMiles} miles.`
      : 'No recommended routes are available right now.';
    recommendationEmpty.hidden = false;
    renderRecommendationGrid([], locationReady);
    return;
  }

  recommendationEmpty.hidden = true;
  renderRecommendationGrid(recommendationItems, locationReady);
}

const matchesRouteFilters = createBoardResultFilter({
  getFilters: () => activeFilters,
  getVisibleRatings: () => visibleRatings,
  getUserLocation: () => userLocation,
  distanceForResult,
  includeAliases: false,
  matchesPaddleFilters: (result, filters) =>
    !filters.paddleTime
    || paddleTimeBucketForLabel(result?.river?.estimatedPaddleTime ?? '') === filters.paddleTime,
});

function getFilteredResults(results) {
  return results.filter(matchesRouteFilters);
}

function resetExploreFilters({ rerender = true } = {}) {
  activeFilters.paddleable = false;
  visibleRatings = new Set(DEFAULT_VISIBLE_RATINGS);
  activeFilters.rating = '';
  activeFilters.search = '';
  activeFilters.state = '';
  activeFilters.difficulty = '';
  activeFilters.distance = '';
  activeFilters.paddleTime = '';
  activeFilters.sort = userLocationState === 'ready' && userLocation ? 'near-you' : 'best-now';
  currentExplorePage = 1;

  if (filterSearch instanceof HTMLInputElement) {
    filterSearch.value = '';
  }
  if (filterState instanceof HTMLSelectElement) {
    filterState.value = '';
  }
  if (filterDifficulty instanceof HTMLSelectElement) {
    filterDifficulty.value = '';
  }
  if (filterDistance instanceof HTMLSelectElement) {
    filterDistance.value = '';
  }
  if (filterPaddleTime instanceof HTMLSelectElement) {
    filterPaddleTime.value = '';
  }
  if (sortSelect instanceof HTMLSelectElement) {
    sortSelect.value = activeFilters.sort;
  }

  updateFilterButtonStates();
  updateLocationIndicator();

  if (rerender && latestResults.length > 0) {
    renderHomepage(latestResults);
  }
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
        homeLocationSortSummary.textContent = 'Finding nearby picks...';
    } else if (locationReady && locationEditing) {
      homeLocationSortSummary.hidden = false;
      homeLocationSortSummary.textContent = 'Enter a new city or ZIP to compare another area.';
    } else if (locationReady) {
      homeLocationSortSummary.hidden = true;
      homeLocationSortSummary.textContent = '';
    } else {
      homeLocationSortSummary.hidden = false;
      homeLocationSortSummary.textContent = 'Choose a location to see nearby picks and drive times.';
    }
  }

    if (homeRefineRow instanceof HTMLElement) {
      homeRefineRow.hidden = false;
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

  if (homeDifficultySelect instanceof HTMLSelectElement) {
    homeDifficultySelect.value = isChoiceSetAny(selectedHomeDifficulties)
      ? 'any'
      : (selectedHomeDifficulties[0] || 'any');
  }

    if (homePaddleTimeSelect instanceof HTMLSelectElement) {
      homePaddleTimeSelect.value = isChoiceSetAny(selectedHomePaddleTimes)
        ? 'any'
        : (selectedHomePaddleTimes[0] || 'any');
    }

  if (homePaddleLengthSelect instanceof HTMLSelectElement) {
    homePaddleLengthSelect.value = isChoiceSetAny(selectedHomePaddleLengths)
      ? 'any'
      : (selectedHomePaddleLengths[0] || 'any');
  }

  if (homeCampingSelect instanceof HTMLSelectElement) {
    homeCampingSelect.value = selectedHomeCamping;
  }

    syncHomePreferencesVisibility();

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
      selectedHomeDifficulties.length === 1 &&
      selectedHomeDifficulties[0] === 'moderate' &&
      selectedHomePaddleTimes.length === 1 &&
      selectedHomePaddleTimes[0] === '5-to-7';
    const isActive = isQuickFloat || isFullDay;
    button.classList.toggle('filter-chip--active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  }

  if (homeRouteMix instanceof HTMLElement) {
    homeRouteMix.hidden = false;
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

function updateHomeNearbyCounters(results) {
  const count = Array.isArray(results) ? results.length : 0;
  const showingCopy = formatRouteCountLabel(count);
  const matchingCopy = count === 1 ? '1 route matches your filters' : `${count} routes match your filters`;

  if (homeMatchCount instanceof HTMLElement) {
    homeMatchCount.textContent = showingCopy;
  }
  for (const node of homeLiveCounts) {
    if (!(node instanceof HTMLElement)) continue;
    node.textContent = matchingCopy;
  }
}

function updateFilterSummary(exploreItems) {
  if (!(filterSummary instanceof HTMLElement)) {
    return;
  }

  const sortLabel = exploreSortSummaryLabel(activeFilters.sort);
  if (exploreItems.length === 0) {
    filterSummary.textContent = 'No results match these filters.';
    updateExploreFilterPills();
    return;
  }

  const locationLabel =
    userLocationState === 'ready' && userLocation && (activeFilters.sort === 'near-you' || activeFilters.sort === 'nearest')
      ? ` from ${shortLocationLabel()}`
      : '';
  const ratingLabel = activeFilters.rating ? ` / ${ratingDisplayLabel(activeFilters.rating)} only` : '';
  filterSummary.textContent = formatMixedFilterSummary(exploreItems.length, { sortLabel, locationLabel, ratingLabel });
  updateExploreFilterPills();
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

  if (activeFilters.paddleable) {
    pills.push({
      label: 'Strong + Good',
      tone: 'filter',
    });
  }

  if (activeFilters.rating) {
    pills.push({
      label: `${activeFilters.rating} only`,
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

function clearHomeConditionMarkers() {
  mapConditionMarkers = clearMapMarkers(mapConditionMarkers);
}

function homeConditionZonePopupMarkup(item, group) {
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
          <p class="score-map-popup__verdict">${escapeHtml(scoreZoneRouteLabel(routeCount, group.representative))}</p>
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

function syncHomeConditionMarkers() {
  for (const item of lastSummaryMapItems) {
    if (isGroupedItem(item)) {
      mapMarkersByKey.delete(item.key);
    }
  }
  clearHomeConditionMarkers();
  if (!mapRuntime || !summaryMapLibre) return;

  for (const item of lastSummaryMapItems) {
    if (!isGroupedItem(item)) continue;
    for (const group of groupRoutesByConditionScore(routesForRiverItem(item))) {
      const point = coverageCenterForRoutes(group.routes);
      if (!point || group.score === null) continue;
      const markerNode = document.createElement('button');
      markerNode.type = 'button';
      markerNode.className = `${markerClassForRating(group.rating, group.confidence?.label)} score-map-marker--condition-zone`;
      markerNode.classList.toggle('score-map-marker--river-expanded', item.key === selectedSummaryMapKey);
      markerNode.dataset.summaryMapRiverKey = item.key;
      markerNode.innerHTML = `<span>${escapeHtml(String(group.score))}</span>`;
      const markerAriaLabel = `${item.cardRoute.river.name}, ${group.regions.join(', ') || 'score zone'}: score ${group.score}, ${group.routes.length} ${group.routes.length === 1 ? 'route' : 'routes'}`;
      markerNode.setAttribute('aria-label', markerAriaLabel);

      const marker = new summaryMapLibre.Marker({ element: markerNode, anchor: 'center' })
        .setLngLat([point.longitude, point.latitude])
        .setPopup(
          new summaryMapLibre.Popup({ offset: 18, closeButton: true, closeOnClick: true, maxWidth: '260px' })
            .setHTML(homeConditionZonePopupMarkup(item, group))
        )
        .addTo(mapRuntime);
      markerNode.setAttribute('aria-label', markerAriaLabel);
      bindMarkerPopup(marker, markerNode, {
        map: mapRuntime,
        onSelectedChange(selected) {
          if (selected) {
            updateSummaryMapSelection(item.key);
            focusHomeRiverCoverage(item);
            scrollHomeResultsRailToKey(item.key);
          }
        },
      });
      marker.getPopup()?.on('open', () => {
        const zoomButton = marker.getPopup()?.getElement()?.querySelector('[data-summary-zone-zoom]');
        if (zoomButton instanceof HTMLButtonElement && zoomButton.dataset.summaryZoneZoomBound !== 'true') {
          zoomButton.dataset.summaryZoneZoomBound = 'true';
          zoomButton.addEventListener('click', () => {
            focusHomeRiverCoverage(item);
            scrollHomeResultsRailToKey(item.key);
          });
        }
      });
      if (!mapMarkersByKey.has(item.key)) {
        mapMarkersByKey.set(item.key, marker);
      }
      mapConditionMarkers.push(marker);
    }
  }
}

function focusHomeRiverCoverage(item) {
  if (!mapRuntime || !summaryMapLibre || !item) return;
  const points = homeCoveragePoints(item);
  if (points.length < 2) return;
  const bounds = new summaryMapLibre.LngLatBounds();
  for (const point of points) {
    bounds.extend([point.longitude, point.latitude]);
  }
  const compact = window.matchMedia('(max-width: 720px)').matches;
  fitMapBounds(mapRuntime, bounds, {
    profile: 'selectedRiver',
    compact,
  });
}

function updateSummaryMapSelection(key, { scrollResult = false } = {}) {
  selectedSummaryMapKey = key || null;
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
    }
  }

  if (summaryMapResults instanceof HTMLElement) {
    const rows = Array.from(summaryMapResults.querySelectorAll('[data-summary-map-item]'));
    let activeRow = null;
    for (const row of rows) {
      if (!(row instanceof HTMLButtonElement)) continue;
      const active = row.dataset.summaryMapItem === selectedSummaryMapKey;
      row.classList.toggle('summary-map-result--active', active);
      row.setAttribute('aria-pressed', active ? 'true' : 'false');
      if (active) {
        activeRow = row;
      }
    }

    if (scrollResult && activeRow instanceof HTMLElement) {
      activeRow.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }

  for (const [markerKey, marker] of mapMarkersByKey.entries()) {
    const markerElement = marker?.getElement?.();
    if (!(markerElement instanceof HTMLElement)) {
      continue;
    }

    markerElement.classList.toggle('score-map-marker--selected', Boolean(selectedSummaryMapKey) && markerKey === selectedSummaryMapKey);
    markerElement.classList.toggle('score-map-marker--hovered', Boolean(hoveredSummaryMapKey) && markerKey === hoveredSummaryMapKey);
  }

  summaryMapController.updateResultsContext();
  updateHomeRailSelection(selectedSummaryMapKey);
}

function isNearbySummaryMapMode() {
  return summaryMapMode === 'nearby';
}

function openSummaryMapItem(key) {
  const marker = mapMarkersByKey.get(key);
  if (!marker) {
    updateSummaryMapSelection(key, { scrollResult: true });
    if (summaryMapController.activeView() === 'list') {
      summaryMapController.setViewAndSync('map', { scrollIntoView: true });
    } else {
      requestSummaryMapRender();
    }
    return;
  }

  if (summaryMapController.activeView() === 'list') {
    summaryMapController.setViewAndSync('map', { scrollIntoView: true });
  }

  updateSummaryMapSelection(key, { scrollResult: true });
  focusHomeRiverCoverage(lastSummaryMapItems.find((item) => item.key === key));
  summaryMapController.closePopups(mapMarkersByKey, key);
  const popup = marker.getPopup?.();
  if (popup && typeof popup.isOpen === 'function' && !popup.isOpen()) {
    marker.togglePopup();
  }
  scrollHomeResultsRailToKey(key);
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
    requestSummaryMapRender();
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

function renderSummaryMap(items, { preserveViewport = false } = {}) {
  pendingSummaryMapItems = Array.isArray(items) ? items : [];
  pendingSummaryMapPreserveViewport = preserveViewport;
  summaryMapController.renderResults(pendingSummaryMapItems);

  if (summaryMapRequested) {
    renderRequestedSummaryMap(pendingSummaryMapItems, {
      preserveViewport: pendingSummaryMapPreserveViewport,
    });
  }
}

function requestSummaryMapRender() {
  if (summaryMapRequested) {
    renderRequestedSummaryMap(pendingSummaryMapItems, {
      preserveViewport: pendingSummaryMapPreserveViewport,
    });
    return;
  }

  summaryMapRequested = true;
  renderRequestedSummaryMap(pendingSummaryMapItems, {
    preserveViewport: pendingSummaryMapPreserveViewport,
  });
}

function setupLazySummaryMap() {
  if (!(summaryMapShell instanceof HTMLElement)) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    requestSummaryMapRender();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        requestSummaryMapRender();
        observer.disconnect();
      }
    },
    {
      rootMargin: '720px 0px',
      threshold: 0.01,
    }
  );

  observer.observe(summaryMapShell);
}

async function renderRequestedSummaryMap(items, { preserveViewport = false } = {}) {
  if (!(summaryMap instanceof HTMLElement)) {
    return;
  }

  const renderVersion = ++summaryMapRenderVersion;

  summaryMapStatusController.loading({ nearby: isNearbySummaryMapMode() });

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
    }

    await waitForMapReady(mapRuntime);
    if (renderVersion !== summaryMapRenderVersion) {
      return;
    }

    mapMarkers = clearMapMarkers(mapMarkers);
    clearHomeConditionMarkers();
    mapMarkersByKey = new Map();

    const bounds = new maplibregl.LngLatBounds();
    let hasBounds = false;

    for (const item of items) {
      const markerPoint = coverageCenterForRoutes(routesForRiverItem(item)) ?? item.cardRoute.river;
      const coveragePoints = homeCoveragePoints(item);
      if (!isGroupedItem(item)) {
        const marker = createBoardMapMarker({
          maplibregl,
          mapRuntime,
          item,
          point: markerPoint,
          markerClassFor,
          markerLabel: visibleMapMarkerLabel,
          markerAriaLabel: mapMarkerAriaLabel,
          popupMarkup,
          onSelectedChange(selected, selectedItem) {
            if (!selected) return;
            updateSummaryMapSelection(selectedItem.key);
            focusHomeRiverCoverage(selectedItem);
            scrollHomeResultsRailToKey(selectedItem.key);
          },
        });
        mapMarkers.push(marker);
        mapMarkersByKey.set(item.key, marker);
      }
      if (coveragePoints.length > 0) {
        for (const point of coveragePoints) {
          bounds.extend([point.longitude, point.latitude]);
        }
      } else {
        bounds.extend([markerPoint.longitude, markerPoint.latitude]);
      }
      hasBounds = true;
    }

    await renderSummaryMapRouteLines(items, renderVersion);
    if (renderVersion !== summaryMapRenderVersion) {
      return;
    }
    lastSummaryMapItems = items;
    syncHomeConditionMarkers();

    if (hasBounds) {
      if (renderVersion !== summaryMapRenderVersion) {
        return;
      }
      const compact = window.matchMedia('(max-width: 720px)').matches;
      fitMapBounds(mapRuntime, bounds, {
        profile: 'results',
        compact,
        preserveViewport,
      });
      mapRuntime.resize();
      if (!items.some((item) => item.key === selectedSummaryMapKey) && items[0]) {
        updateSummaryMapSelection(items[0].key);
      }
      const selectedItem = items.find((item) => item.key === selectedSummaryMapKey);
      summaryMapStatusController.ready({
        message: selectedItem && isGroupedItem(selectedItem)
          ? `Showing ${routesForRiverItem(selectedItem).length} mapped ${selectedItem.cardRoute.river.name} routes across ${groupRoutesByConditionScore(routesForRiverItem(selectedItem)).length} score zones.`
          : isNearbySummaryMapMode()
            ? 'Nearby map is up to date.'
            : 'Map is up to date.',
      });
      return;
    }

    if (renderVersion !== summaryMapRenderVersion) {
      return;
    }
    summaryMapController.renderResults([]);
    summaryMapStatusController.empty({ nearby: isNearbySummaryMapMode() });
  } catch (error) {
    console.error('Failed to load summary map.', error);
    summaryMapController.renderResults([]);
    summaryMapStatusController.unavailable({ nearby: isNearbySummaryMapMode() });
  }
}

function renderHomepage(results, { preserveMapViewport = false, animateResults = true } = {}) {
  const locationReady = userLocationState === 'ready' && Boolean(userLocation);
  const overallItems = sortBoardItems(
    buildDisplayItems(results, results, 'best-now'),
    'best-now'
  );
  const nearbyPreferenceResults = results.filter(matchesHomeNearbyFilters);
  const matchingPreferenceResults = locationReady
    ? nearbyPreferenceResults.filter(resultWithinSelectedRadius)
    : nearbyPreferenceResults;
  const summaryResults = matchingPreferenceResults.filter(
    (result) => visibleRatings.has(result.rating),
  );
  const homeSegmentFilters = {
    paddleTime: isChoiceSetAny(selectedHomePaddleTimes) ? '' : selectedHomePaddleTimes,
    paddleLength: isChoiceSetAny(selectedHomePaddleLengths) ? '' : selectedHomePaddleLengths[0],
  };
  const nearbyItems = sortNearbyResultsForDisplay(
    buildDisplayItems(summaryResults, summaryResults, locationReady ? 'near-you' : 'best-now', {
      segmentFilters: homeSegmentFilters,
    }),
    nearbySortMode,
  );
  const summaryItems = sortNearbyResultsForDisplay(
    buildDisplayItems(summaryResults, summaryResults, locationReady ? 'near-you' : 'best-now', {
      segmentFilters: homeSegmentFilters,
    }),
    nearbySortMode,
  );

  updateHomeNearbyCounters(summaryResults);
  updateHeroCallMix(matchingPreferenceResults);
  updateFeaturedHero(nearbyItems, overallItems);

  if (recommendationTitle instanceof HTMLElement) {
    recommendationTitle.textContent = 'Compare every route that fits your preferences';
  }

  if (recommendationSummary instanceof HTMLElement) {
    recommendationSummary.textContent = locationReady
      ? `Same setup, broader view of every route below.`
      : `Full board view. Add your location to personalize the map and route order.`;
  }

  const filteredRoutes = getFilteredResults(results);
  const normalizedSortMode = normalizeBoardSortMode(
    activeFilters.sort,
    userLocationState === 'ready' && Boolean(userLocation)
  );
  const exploreItems = sortBoardItems(
    buildDisplayItems(results, filteredRoutes, normalizedSortMode),
    normalizedSortMode,
    { hasUserLocation: Boolean(userLocation) }
  );
  const summaryMapItems = summaryItems;

  updateFilterButtonStates();
  updateLocationIndicator();
  updateLocationStatus();
  updateFilterSummary(exploreItems);
  updateSummaryStatus(exploreItems, results);
  updateBoardStatusBanner(exploreItems);
  renderHomeSetupBar();
  renderSummaryMap(summaryMapItems, { preserveViewport: preserveMapViewport });
  if (animateResults) {
    pulseHomeResultsSurface();
  }

  if (homeResultsEmpty instanceof HTMLElement) {
    homeResultsEmpty.hidden = summaryItems.length > 0;
  }
  renderCardGrid(homeResultsRail, summaryItems, {
    showDistance: locationReady,
    compact: true,
    syncMap: true,
  });
  updateHomeRailSelection(selectedSummaryMapKey);

  const explorePaginationState = paginateItems(exploreItems, EXPLORE_PAGE_SIZE, currentExplorePage);
  currentExplorePage = explorePaginationState.currentPage;
  updateExplorePagination(explorePaginationState);
  renderCardGrid(exploreGrid, explorePaginationState.items, {
    showDistance: userLocationState === 'ready' && userLocation,
  });
  syncExploreShellHeight();
}

function saveHomePaddleLengthFilter(value) {
  localStorage.setItem(STORAGE_HOME_PADDLE_LENGTH_KEY, JSON.stringify(normalizeHomePaddleLengthFilters(value)));
}

function saveHomeCampingFilter(value) {
  localStorage.setItem(STORAGE_HOME_CAMPING_KEY, normalizeHomeCampingFilter(value));
}

function loadStoredHomePaddleLengthFilter() {
  try {
    const raw = localStorage.getItem(STORAGE_HOME_PADDLE_LENGTH_KEY);
    return normalizeHomePaddleLengthFilters(raw || 'any');
  } catch (error) {
    console.warn('Failed to parse stored home paddle-length filter.', error);
    return ['any'];
  }
}

function loadStoredHomeCampingFilter() {
  try {
    const raw = localStorage.getItem(STORAGE_HOME_CAMPING_KEY);
    return normalizeHomeCampingFilter(raw || 'any');
  } catch (error) {
    console.warn('Failed to parse stored home camping filter.', error);
    return 'any';
  }
}

function setHomePaddleLengthFilter(value, { persist = true, rerender = true } = {}) {
  selectedHomePaddleLengths = normalizeHomePaddleLengthFilters(value);

  if (persist) {
    saveHomePaddleLengthFilter(selectedHomePaddleLengths);
  }

  updateLocationStatus();

  if (rerender && latestResults.length > 0) {
    renderHomepage(latestResults);
  }
}

function setHomeCampingFilter(value, { persist = true, rerender = true } = {}) {
  selectedHomeCamping = normalizeHomeCampingFilter(value);

  if (persist) {
    saveHomeCampingFilter(selectedHomeCamping);
  }

  updateLocationStatus();

  if (rerender && latestResults.length > 0) {
    renderHomepage(latestResults);
  }
}

function resetHomeFilters({ includeRadius = true, rerender = true } = {}) {
  visibleRatings = new Set(DEFAULT_VISIBLE_RATINGS);
  selectedHomeDifficulties = ['any'];
  selectedHomePaddleTimes = ['any'];
  selectedHomePaddleLengths = ['any'];
  selectedHomeCamping = 'any';
  saveHomeDifficultyFilter(selectedHomeDifficulties);
  saveHomePaddleTimeFilter(selectedHomePaddleTimes);
  saveHomePaddleLengthFilter(selectedHomePaddleLengths);
  saveHomeCampingFilter(selectedHomeCamping);

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
    selectedHomePaddleLengths = ['any'];
    selectedHomeCamping = 'any';
  } else if (preset === 'full-day') {
    selectedHomeDifficulties = ['moderate'];
    selectedHomePaddleTimes = ['5-to-7'];
    selectedHomePaddleLengths = ['any'];
    selectedHomeCamping = 'any';
  } else {
    resetHomeFilters();
    return;
  }

  saveHomeDifficultyFilter(selectedHomeDifficulties);
  saveHomePaddleTimeFilter(selectedHomePaddleTimes);
  saveHomePaddleLengthFilter(selectedHomePaddleLengths);
  saveHomeCampingFilter(selectedHomeCamping);
  updateLocationStatus();

  if (latestResults.length > 0) {
    renderHomepage(latestResults);
  }
}

function clearUserLocation() {
  userLocation = null;
  userLocationState = 'idle';
  locationEditing = false;
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
  for (const button of summaryScoreFilterButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.filterBound === 'true') continue;
    button.dataset.filterBound = 'true';
    button.addEventListener('click', () => {
      const rating = button.dataset.summaryScoreToggle || '';
      if (!rating) return;
      const buttonTopBeforeRender = button.getBoundingClientRect().top;
      if (visibleRatings.has(rating)) {
        visibleRatings.delete(rating);
      } else {
        visibleRatings.add(rating);
      }
      currentExplorePage = 1;
      renderHomepage(latestResults, {
        preserveMapViewport: true,
        animateResults: false,
      });
      window.requestAnimationFrame(() => {
        const buttonTopAfterRender = button.getBoundingClientRect().top;
        const offset = buttonTopAfterRender - buttonTopBeforeRender;
        if (Math.abs(offset) > 0.5) {
          window.scrollBy(0, offset);
        }
      });
    });
  }

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

  if (filterDifficulty instanceof HTMLSelectElement && filterDifficulty.dataset.filterBound !== 'true') {
    filterDifficulty.dataset.filterBound = 'true';
    filterDifficulty.addEventListener('change', () => {
      activeFilters.difficulty = filterDifficulty.value;
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

  if (homeDifficultySelect instanceof HTMLSelectElement && homeDifficultySelect.dataset.filterBound !== 'true') {
    homeDifficultySelect.dataset.filterBound = 'true';
    homeDifficultySelect.addEventListener('change', () => {
      setHomeDifficultyFilter(homeDifficultySelect.value);
    });
  }

  if (homePaddleTimeSelect instanceof HTMLSelectElement && homePaddleTimeSelect.dataset.filterBound !== 'true') {
    homePaddleTimeSelect.dataset.filterBound = 'true';
    homePaddleTimeSelect.addEventListener('change', () => {
      setHomePaddleTimeFilter(homePaddleTimeSelect.value);
    });
  }

  if (homePaddleLengthSelect instanceof HTMLSelectElement && homePaddleLengthSelect.dataset.filterBound !== 'true') {
    homePaddleLengthSelect.dataset.filterBound = 'true';
    homePaddleLengthSelect.addEventListener('change', () => {
      setHomePaddleLengthFilter(homePaddleLengthSelect.value);
    });
  }

  if (homeCampingSelect instanceof HTMLSelectElement && homeCampingSelect.dataset.filterBound !== 'true') {
    homeCampingSelect.dataset.filterBound = 'true';
    homeCampingSelect.addEventListener('change', () => {
      setHomeCampingFilter(homeCampingSelect.value);
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
  selectedHomePaddleLengths = loadStoredHomePaddleLengthFilter();
  selectedHomeCamping = loadStoredHomeCampingFilter();
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
      if (!summaryMapCollapsed) {
        requestSummaryMapRender();
      }
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
      recommendationSection?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  syncAppMobileViewportHeight();

  window.addEventListener('resize', () => {
    syncAppMobileViewportHeight();
    syncExploreShellHeight();
    summaryMapController.updateView();
  });

  phoneBreakpoint.addEventListener('change', () => {
    if (summaryMapSupportsMobileViews && phoneBreakpoint.matches) {
      summaryMapController.setView(homeSummaryMapMode ? 'map' : 'list');
    }
    syncAppMobileViewportHeight();
    updateLocationStatus();
    summaryMapController.updateView();
    syncExploreShellHeight();
  });

  window.visualViewport?.addEventListener('resize', () => {
    syncAppMobileViewportHeight();
    summaryMapController.updateView();
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
  setupLazySummaryMap();
  summaryMapController.updateView();
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
