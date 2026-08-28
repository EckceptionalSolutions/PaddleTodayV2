import {
  clearMapMarkers,
  createMapMarker,
  createMapStatusController,
  createPaddleMap,
  ensureMapLibre,
  escapeHtml,
  fitMapBounds,
  removeMapOverlay,
  syncGeoJsonOverlay,
  waitForMapReady,
} from './map-runtime.js';
import { readCachedPayload, writeCachedPayload } from './client-cache.js';
import { bindFavoriteButtons } from './favorites-ui.js';
import { trackEvent } from './analytics.js';
import {
  callDisplayLabel,
  confidenceDisplayLabel,
  conditionTierDisplayLabel,
  liveDataWarning,
  ratingDisplayLabel,
} from './ui-taxonomy.js';
import { createRequestGuard, isAbortError } from './request-guard.js';
import {
  buildRiverReadinessViewModel,
  buildRiverWeatherViewModel,
  buildScoreBreakdownViewModel,
  findFirstHourlyRain,
  hourlyWeatherConditionKind,
  isColdWeatherDrivenCall,
  ratingToneKey,
  signedPoints,
  callLabelForDecision,
} from '@paddletoday/api-contract';
import { loadCanonicalRiverRouteLine } from '../lib/canonical-river-geometries.js';
import { getBrowserApiClient } from './browser-api-client.js';
import { buildFloatPlanMessage } from '@paddletoday/trip-pack';

const root = document.querySelector('[data-river-detail]');
if (!(root instanceof HTMLElement)) {
  throw new Error('Missing river detail root.');
}

const slug = root.dataset.riverSlug;
if (!slug) {
  throw new Error('Missing river slug.');
}

const detailMap = root.querySelector('[data-detail-map]');
const detailMapStatus = root.querySelector('[data-detail-map-status]');
const detailMapStatusController = createMapStatusController(detailMapStatus, {
  unavailable: 'Map unavailable right now. Use the access links above for location context.',
});
const detailMapShell = root.querySelector('[data-detail-map-shell]');
const detailMapToggle = root.querySelector('[data-detail-map-toggle]');
const detailHeroMap = root.querySelector('[data-detail-hero-map]');
const detailHeroMapStatus = root.querySelector('[data-detail-hero-map-status]');
const detailHeroMapStatusController = createMapStatusController(detailHeroMapStatus, {
  empty: 'Route snapshot unavailable because endpoint coordinates are incomplete.',
  loading: 'Loading the route snapshot. This usually takes a few seconds.',
  unavailable: 'Route snapshot unavailable right now. Use the endpoint links while the map reloads.',
});
const detailHeroMapShell = root.querySelector('[data-detail-hero-map-shell]');
const chartButtons = Array.from(root.querySelectorAll('[data-chart-window]'));
const detailStatusBanner = root.querySelector('[data-detail-status-banner]');
const detailFetchBanner = root.querySelector('[data-detail-fetch-banner]');
const detailFetchTitle = root.querySelector('[data-detail-fetch-title]');
const detailFetchDetail = root.querySelector('[data-detail-fetch-detail]');
const detailFetchActions = root.querySelector('[data-detail-fetch-actions]');
const detailFetchRetryButton = root.querySelector('[data-detail-fetch-retry]');
const detailRefreshButton = root.querySelector('[data-detail-refresh]');
const detailRefreshNote = root.querySelector('[data-detail-refresh-note]');
const readinessGrid = root.querySelector('[data-readiness-grid]');
const copyCoordButtons = Array.from(root.querySelectorAll('[data-copy-coords]'));
const accessPlanner = root.querySelector('[data-access-planner]');
const accessPointData = root.querySelector('[data-access-points]');
const accessPutInSelect = root.querySelector('[data-access-putin]');
const accessTakeOutSelect = root.querySelector('[data-access-takeout]');
const accessDistance = root.querySelector('[data-access-distance]');
const accessShape = root.querySelector('[data-access-shape]');
const accessTime = root.querySelector('[data-access-time]');
const accessStage = root.querySelector('[data-access-stage]');
const accessShuttle = root.querySelector('[data-access-shuttle]');
const accessNote = root.querySelector('[data-access-note]');
const accessSummary = root.querySelector('[data-access-summary]');
const accessPutInLink = root.querySelector('[data-access-putin-link]');
const accessTakeOutLink = root.querySelector('[data-access-takeout-link]');
const accessDirectionsGoogle = root.querySelector('[data-access-directions-google]');
const accessDirectionsApple = root.querySelector('[data-access-directions-apple]');
const accessOpenStreetMap = root.querySelector('[data-access-openstreetmap]');
const tripGpxLink = root.querySelector('[data-trip-gpx]');
const tripIcsLink = root.querySelector('[data-trip-ics]');
const tripShareButton = root.querySelector('[data-trip-share]');
const tripStatus = root.querySelector('[data-trip-status]');
const sectionNavLinks = Array.from(root.querySelectorAll('[data-detail-nav-link]'));
const detailSections = Array.from(root.querySelectorAll('[data-detail-section]'));
const detailJumpLinks = Array.from(root.querySelectorAll('[data-detail-jump]'));
const weatherHourlyGrid = root.querySelector('[data-weather-hourly]');
const weatherDayStrips = Array.from(root.querySelectorAll('[data-weather-day-strip]'));
const gaugeBandVisuals = Array.from(root.querySelectorAll('[data-gauge-band-visual]'));
const historyBars = root.querySelector('[data-history-bars]');
const historyPanel = root.querySelector('[data-history-panel]');
const alertDialog = root.querySelector('[data-alert-dialog]');
const alertOpenButtons = Array.from(root.querySelectorAll('[data-alert-open]'));
const alertForm = root.querySelector('[data-alert-form]');
const alertEmailInput = root.querySelector('[data-alert-email]');
const alertCompanyInput = root.querySelector('[data-alert-company]');
const alertStatus = root.querySelector('[data-alert-status]');
const alertSubmitButtons = Array.from(root.querySelectorAll('[data-alert-submit]'));
const alertCtaTitle = root.querySelector('[data-alert-cta-title]');
const alertCtaCopy = root.querySelector('[data-alert-cta-copy]');
const shareCopyButton = root.querySelector('[data-share-copy]');
const shareNativeButton = root.querySelector('[data-share-native]');
const shareXLink = root.querySelector('[data-share-x]');
const shareFacebookLink = root.querySelector('[data-share-facebook]');
const routeActionStatus = root.querySelector('[data-route-action-status]');
const routeActionMenus = Array.from(root.querySelectorAll('[data-route-action-menu]'));
const routeActionBar = root.querySelector('.route-action-bar');
const routeGallery = root.querySelector('[data-route-gallery]');
const routeGalleryViewer = root.querySelector('[data-route-gallery-viewer]');
const routeGalleryPending = root.querySelector('[data-route-gallery-pending]');
const routeGalleryPendingGrid = root.querySelector('[data-route-gallery-pending-grid]');
const routeGalleryPendingTitle = root.querySelector('[data-route-gallery-pending-title]');
const routeGalleryPendingNote = root.querySelector('[data-route-gallery-pending-note]');
const routeCommunity = root.querySelector('[data-route-community]');
const routeCommunityList = root.querySelector('[data-route-community-list]');
const routeCommunityStats = root.querySelector('[data-route-community-stats]');
const routeCommunityCount = root.querySelector('[data-route-community-count]');
const routeCommunityFreshness = root.querySelector('[data-route-community-freshness]');
const routePhotoForm = root.querySelector('[data-route-photo-form]');
const routePhotoFilesInput = root.querySelector('[data-route-photo-files]');
const routePhotoSelection = root.querySelector('[data-route-photo-selection]');
const routePhotoNameInput = root.querySelector('[data-route-photo-name]');
const routePhotoEmailInput = root.querySelector('[data-route-photo-email]');
const routeTripDateInput = root.querySelector('[data-route-trip-date]');
const routePhotoNotesInput = root.querySelector('[data-route-photo-notes]');
const routePhotoRightsInput = root.querySelector('[data-route-photo-rights]');
const routePhotoConsentInput = root.querySelector('[data-route-photo-consent]');
const routePhotoCompanyInput = root.querySelector('[data-route-photo-company]');
const routePhotoSubmitButton = root.querySelector('[data-route-photo-submit]');
const routePhotoStatus = root.querySelector('[data-route-photo-status]');
const routeReportForm = root.querySelector('[data-route-report-form]');
const routeReportNameInput = root.querySelector('[data-route-report-name]');
const routeReportEmailInput = root.querySelector('[data-route-report-email]');
const routeReportDateInput = root.querySelector('[data-route-report-date]');
const routeReportSentimentInput = root.querySelector('[data-route-report-sentiment]');
const routeReportWaterLevelInput = root.querySelector('[data-route-report-water-level]');
const routeReportCompletionInput = root.querySelector('[data-route-report-completion]');
const routeReportVerdictInput = root.querySelector('[data-route-report-verdict]');
const routeReportTextInput = root.querySelector('[data-route-report-text]');
const routeReportNotesInput = root.querySelector('[data-route-report-notes]');
const routeReportFilesInput = root.querySelector('[data-route-report-files]');
const routeReportSelection = root.querySelector('[data-route-report-selection]');
const routeReportRightsInput = root.querySelector('[data-route-report-rights]');
const routeReportConsentInput = root.querySelector('[data-route-report-consent]');
const routeReportCompanyInput = root.querySelector('[data-route-report-company]');
const routeReportSubmitButton = root.querySelector('[data-route-report-submit]');
const routeReportStatus = root.querySelector('[data-route-report-status]');
const routeContributeTabList = root.querySelector('[aria-label="Contribution options"]');
const routeContributeTabs = Array.from(root.querySelectorAll('[data-route-contribute-tab]'));
const routeContributePanels = Array.from(root.querySelectorAll('[data-route-contribute-panel]'));
const routeReportCtas = Array.from(root.querySelectorAll('[data-route-report-cta]'));
const routeScoreFeedbackButtons = Array.from(root.querySelectorAll('[data-score-feedback]'));
const routeScoreFeedbackStatus = root.querySelector('[data-score-feedback-status]');
const liveWarningWrap = root.querySelector('[data-live-warning-wrap]');
const confidenceExplainer = root.querySelector('[data-confidence-explainer]');
const activePutInName = root.querySelector('[data-field="active-putin-name"]');
const activeTakeOutName = root.querySelector('[data-field="active-takeout-name"]');
const activePutInNote = root.querySelector('[data-field="active-putin-note"]');
const activeTakeOutNote = root.querySelector('[data-field="active-takeout-note"]');
const activeFactPutIn = root.querySelector('[data-field="active-fact-putin"]');
const activeFactTakeOut = root.querySelector('[data-field="active-fact-takeout"]');
const activeFactDistance = root.querySelector('[data-field="active-fact-distance"]');
const activePutInCopy = root.querySelector('[data-field="active-putin-copy"]');
const activeTakeOutCopy = root.querySelector('[data-field="active-takeout-copy"]');
const riverContext = {
  slug,
  name: root.dataset.riverName ?? 'River',
  reach: root.dataset.riverReach ?? 'Reach',
  state: root.dataset.riverState ?? '',
  region: root.dataset.riverRegion ?? '',
  distanceLabel: root.dataset.riverDistance ?? '',
  paddleTimeLabel: root.dataset.riverPaddleTime ?? '',
  putIn: {
    name: root.dataset.putInName ?? 'Put-in',
    latitude: Number(root.dataset.putInLatitude),
    longitude: Number(root.dataset.putInLongitude),
  },
  takeOut: {
    name: root.dataset.takeOutName ?? 'Take-out',
    latitude: Number(root.dataset.takeOutLatitude),
    longitude: Number(root.dataset.takeOutLongitude),
  },
  defaultPutInNote: activePutInNote instanceof HTMLElement ? activePutInNote.textContent ?? '' : '',
  defaultTakeOutNote: activeTakeOutNote instanceof HTMLElement ? activeTakeOutNote.textContent ?? '' : '',
  defaultDistanceLabel: activeFactDistance instanceof HTMLElement ? activeFactDistance.textContent ?? '' : '',
};
const routeShareContext = {
  title: root.dataset.routeShareTitle || `${riverContext.name}: ${riverContext.reach} | Paddle Today`,
  fallbackText:
    root.dataset.routeShareText ||
    `Check today's Paddle Today read for ${riverContext.name} - ${riverContext.reach}.`,
  url: root.dataset.routeUrl || window.location.href,
};

let detailMapRuntime = null;
let detailMapMarkers = [];
let detailHeroMapRuntime = null;
let detailHeroMapMarkers = [];
let detailMapRenderVersion = 0;
let detailHeroMapRenderVersion = 0;
let pendingAccessMapResult = null;
let detailMapRequested = false;
let detailHeroMapRequested = false;
let approvedCommunityRequested = false;
let contributionControlsBound = false;
let currentChartWindowHours = 72;
let latestResult = null;
let plannerAccessPoints = [];
let plannerViewTracked = false;
let activeAccessContext = {
  putIn: riverContext.putIn,
  takeOut: riverContext.takeOut,
  distanceLabel: riverContext.defaultDistanceLabel || 'Check source links',
  putInNote: riverContext.defaultPutInNote || 'Check parking, launch, and access rules on the ground.',
  takeOutNote: riverContext.defaultTakeOutNote || 'Check parking, launch, and access rules on the ground.',
  mapMode: 'Stored route endpoints',
};
const bannerClasses = ['status-banner--live', 'status-banner--degraded', 'status-banner--offline', 'status-banner--loading'];
const AUTO_REFRESH_MS = 5 * 60 * 1000;
const STALE_DETAIL_BANNER_MS = 15 * 60 * 1000;
const ROUTE_PHOTO_COOLDOWN_MS = 30 * 1000;
const ROUTE_PHOTO_MAX_FILES = 4;
const ROUTE_PHOTO_MAX_BYTES = 4 * 1024 * 1024;
const ROUTE_PHOTO_ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
let lastDetailSuccessAt = null;
let hasLoadedDetailOnce = false;
const detailCacheKey = `river-detail:${slug}:v1`;
const historyCacheKey = `river-history:${slug}:7:v1`;
const routePhotoCooldownKey = `route-photo:${slug}:last-submitted`;
const phoneBreakpoint = window.matchMedia('(max-width: 760px)');
let detailMapCollapsed = phoneBreakpoint.matches;
const detailRequestGuard = createRequestGuard();
const historyRequestGuard = createRequestGuard();
let approvedRoutePhotos = parseApprovedRoutePhotos(routeGallery instanceof HTMLElement ? routeGallery.dataset.approvedPhotos : '[]');
let selectedRoutePhotoFiles = [];
let submittedRoutePhotoPreviews = [];

function routeAnalyticsProperties(extra = {}) {
  return {
    route: slug,
    river: riverContext.name,
    state: riverContext.state,
    region: riverContext.region,
    ...extra,
  };
}
const isPlanningRoute = root.dataset.routeScoreEligibility === 'planning';

function plannerAnalyticsProperties(extra = {}) {
  const distanceMatch = String(activeAccessContext.distanceLabel || '').match(/(\d+(?:\.\d+)?)/);
  return routeAnalyticsProperties({
    put_in_id: activeAccessContext.putIn?.id,
    take_out_id: activeAccessContext.takeOut?.id,
    segment_distance_miles: distanceMatch ? distanceMatch[1] : undefined,
    ...extra,
  });
}

function setText(field, value) {
  const elements = Array.from(root.querySelectorAll(`[data-field="${field}"]`));
  for (const element of elements) {
    element.textContent = value;
  }
  return elements[0] ?? null;
}

function updateAlertCtaCopy(result) {
  const rating = result?.rating;
  const isCurrentlyGood = !hasHardSkip(result) && (rating === 'Strong' || rating === 'Good');
  const title = isCurrentlyGood ? 'Stay ahead of changes' : 'Know when it improves';
  const copy = isCurrentlyGood
    ? 'Get emailed when this route newly crosses your alert threshold.'
    : 'Get emailed when this route newly reaches the threshold you choose.';

  if (alertCtaTitle instanceof HTMLElement) {
    alertCtaTitle.textContent = title;
  }
  if (alertCtaCopy instanceof HTMLElement) {
    alertCtaCopy.textContent = copy;
  }
}

function setDetailLoadingState(isLoading) {
  root.classList.toggle('river-detail--loading', isLoading);
}

function dataAgeLabel(fetchedAt) {
  if (typeof fetchedAt !== 'number' || !Number.isFinite(fetchedAt)) {
    return 'Update time unavailable';
  }

  const elapsedMs = Math.max(0, Date.now() - fetchedAt);
  const elapsedMinutes = Math.round(elapsedMs / 60000);
  if (elapsedMinutes < 1) {
    return 'Just updated';
  }
  if (elapsedMinutes < 60) {
    return `Updated ${elapsedMinutes} min ago`;
  }

  const elapsedHours = Math.round(elapsedMinutes / 60);
  if (elapsedHours < 24) {
    return `Updated ${elapsedHours}h ago`;
  }

  const elapsedDays = Math.round(elapsedHours / 24);
  return elapsedDays === 1 ? 'Updated 1 day ago' : `Updated ${elapsedDays} days ago`;
}

function shouldShowStaleDetailBanner(fetchedAt) {
  return typeof fetchedAt === 'number' && Number.isFinite(fetchedAt) && Date.now() - fetchedAt >= STALE_DETAIL_BANNER_MS;
}

function destroyMapRuntime(runtime) {
  if (runtime && typeof runtime.remove === 'function') {
    runtime.remove();
  }
  return null;
}

function setFieldGroupHidden(field, hidden) {
  const elements = Array.from(root.querySelectorAll(`[data-card-field="${field}"]`));
  for (const element of elements) {
    if (element instanceof HTMLElement) {
      element.hidden = hidden;
    }
  }
}

function setActiveDetailSection(sectionId) {
  for (const link of sectionNavLinks) {
    if (!(link instanceof HTMLElement)) continue;
    link.classList.toggle('river-detail__section-link--active', link.dataset.detailNavLink === sectionId);
    link.setAttribute('aria-current', link.dataset.detailNavLink === sectionId ? 'true' : 'false');
  }
}

function parseApprovedRoutePhotos(raw) {
  try {
    const parsed = JSON.parse(raw || '[]');
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((photo, index) => ({
        id: typeof photo?.id === 'string' ? photo.id : `photo-${index + 1}`,
        src: typeof photo?.src === 'string' ? photo.src : '',
        alt: typeof photo?.alt === 'string' ? photo.alt : '',
        caption: typeof photo?.caption === 'string' ? photo.caption : '',
        credit: typeof photo?.credit === 'string' ? photo.credit : '',
        takenLabel: typeof photo?.takenLabel === 'string' ? photo.takenLabel : '',
      }))
      .filter((photo) => photo.src);
  } catch {
    return [];
  }
}

function photoCreditLabel(value) {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) {
    return 'Approved community photo';
  }

  const normalized = raw.replace(/^photo\s+by\s+/i, '').trim();
  return normalized ? `Photo by ${normalized}` : 'Approved community photo';
}

function routeGalleryElements() {
  return {
    image: root.querySelector('[data-route-gallery-image]'),
    caption: root.querySelector('[data-route-gallery-caption]'),
    credit: root.querySelector('[data-route-gallery-credit]'),
    taken: root.querySelector('[data-route-gallery-taken]'),
    thumbs: Array.from(root.querySelectorAll('[data-route-gallery-thumb]')),
  };
}

function renderApprovedRouteGallery() {
  if (!(routeGalleryViewer instanceof HTMLElement)) {
    return;
  }

  if (approvedRoutePhotos.length === 0) {
    routeGalleryViewer.innerHTML = `
      <div class="route-gallery__empty" data-route-gallery-empty>
        <div class="route-gallery__empty-art" aria-hidden="true">
          <img src="/gallery/fallbacks/river-fallback-wide.jpg" alt="" loading="lazy" decoding="async" />
        </div>
        <div class="route-gallery__empty-copy">
          <h3 class="route-gallery__empty-title">No approved route photos yet</h3>
          <p class="muted">
            Start the gallery with shots of the access, river character, or any detail that helps paddlers know what this run actually looks like.
          </p>
          <div class="route-gallery__cta-row">
            <a class="river-link river-link--inline" href="#share-trip">Share photos or report conditions</a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const lead = approvedRoutePhotos[0];
  routeGalleryViewer.innerHTML = `
    <figure class="route-gallery__figure" data-route-gallery-figure>
      <img
        class="route-gallery__image"
        src="${escapeHtml(lead.src)}"
        alt="${escapeHtml(lead.alt || lead.caption || `${riverContext.name} route photo`)}"
        loading="lazy"
        decoding="async"
        data-route-gallery-image
      />
      <figcaption class="route-gallery__caption">
        <div class="route-gallery__caption-copy">
          <strong data-route-gallery-caption>${escapeHtml(lead.caption || 'Approved community photo')}</strong>
          <span class="muted" data-route-gallery-credit>${escapeHtml(photoCreditLabel(lead.credit))}</span>
        </div>
        <span class="route-gallery__caption-tag" data-route-gallery-taken ${lead.takenLabel ? '' : 'hidden'}>${escapeHtml(lead.takenLabel || '')}</span>
      </figcaption>
    </figure>
    ${
      approvedRoutePhotos.length > 1
        ? `
      <div class="route-gallery__thumbs" data-route-gallery-thumbs aria-label="Approved route photos">
        ${approvedRoutePhotos
          .map(
            (photo, index) => `
              <button
                class="route-gallery__thumb${index === 0 ? ' route-gallery__thumb--active' : ''}"
                type="button"
                data-route-gallery-thumb
                data-route-gallery-index="${index}"
                aria-pressed="${index === 0 ? 'true' : 'false'}"
              >
                <img src="${escapeHtml(photo.src)}" alt="" loading="lazy" />
                <span>${escapeHtml(photo.caption)}</span>
              </button>
            `
          )
          .join('')}
      </div>
    `
        : ''
    }
  `;
}

function formatReportTripDate(raw) {
  if (typeof raw !== 'string' || raw.trim().length === 0) {
    return '';
  }

  const parsed = new Date(`${raw}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return raw;
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function reportSentimentLabel(value) {
  switch ((value || '').trim().toLowerCase()) {
    case 'great':
      return 'Great day';
    case 'good':
      return 'Good day';
    case 'mixed':
      return 'Mixed day';
    case 'rough':
      return 'Rough day';
    default:
      return '';
  }
}

function updateApprovedRoutePhoto(index, options = {}) {
  const { scrollThumb = false } = options;
  const { image, caption, credit, taken, thumbs } = routeGalleryElements();
  if (!(image instanceof HTMLImageElement)) {
    return;
  }

  const photo = approvedRoutePhotos[index];
  if (!photo) {
    return;
  }

  image.src = photo.src;
  image.alt = photo.alt || photo.caption || `${riverContext.name} route photo`;

  if (caption instanceof HTMLElement) {
    caption.textContent = photo.caption || 'Approved community photo';
  }

  if (credit instanceof HTMLElement) {
    credit.textContent = photoCreditLabel(photo.credit);
  }

  if (taken instanceof HTMLElement) {
    taken.textContent = photo.takenLabel || '';
    taken.hidden = !photo.takenLabel;
  }

  for (const thumb of thumbs) {
    if (!(thumb instanceof HTMLButtonElement)) {
      continue;
    }

    const isActive = Number(thumb.dataset.routeGalleryIndex) === index;
    thumb.classList.toggle('route-gallery__thumb--active', isActive);
    thumb.setAttribute('aria-pressed', isActive ? 'true' : 'false');

    if (isActive && scrollThumb) {
      thumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }
}

function bindApprovedRouteGallery() {
  const { thumbs } = routeGalleryElements();
  if (approvedRoutePhotos.length === 0 || thumbs.length === 0) {
    return;
  }

  for (const thumb of thumbs) {
    if (!(thumb instanceof HTMLButtonElement) || thumb.dataset.galleryBound === 'true') {
      continue;
    }

    thumb.dataset.galleryBound = 'true';
    thumb.addEventListener('click', () => {
      const index = Number(thumb.dataset.routeGalleryIndex);
      if (Number.isFinite(index)) {
        updateApprovedRoutePhoto(index, { scrollThumb: true });
      }
    });
  }
}

function mergeApprovedRoutePhotos(photos) {
  const deduped = [];
  const seen = new Set();
  for (const photo of [...photos, ...approvedRoutePhotos]) {
    if (!photo?.src) continue;
    const key = photo.id || photo.src;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(photo);
  }
  approvedRoutePhotos = deduped;
  renderApprovedRouteGallery();
  bindApprovedRouteGallery();
  updateApprovedRoutePhoto(0);
}

function renderCommunityReports(reports) {
  if (!(routeCommunity instanceof HTMLElement) || !(routeCommunityList instanceof HTMLElement)) {
    return;
  }

  if (!Array.isArray(reports) || reports.length === 0) {
    routeCommunity.hidden = true;
    routeCommunityList.innerHTML = '';
    if (routeCommunityStats instanceof HTMLElement) {
      routeCommunityStats.hidden = true;
    }
    return;
  }

  const visibleReports = reports.slice(0, 3);
  const olderReports = reports.slice(3);
  const latestApprovedAt = Date.parse(reports[0]?.approvedAt || '');

  routeCommunity.hidden = false;
  if (routeCommunityStats instanceof HTMLElement) {
    routeCommunityStats.hidden = false;
  }
  if (routeCommunityCount instanceof HTMLElement) {
    routeCommunityCount.textContent = reports.length === 1 ? '1 recent report' : `${reports.length} recent reports`;
  }
  if (routeCommunityFreshness instanceof HTMLElement) {
    routeCommunityFreshness.textContent = Number.isFinite(latestApprovedAt)
      ? `Last report ${dataAgeLabel(latestApprovedAt).replace(/^Updated /, '')}`
      : 'Recent community notes';
  }

  const renderCards = (items) =>
    items
    .map((report) => {
      const metaBits = [
        formatReportTripDate(report.tripDate),
        reportSentimentLabel(report.sentiment),
        report.contributorName,
      ].filter(Boolean);
      const reportPhotos = Array.isArray(report.photos) ? report.photos.filter((photo) => photo?.src) : [];
      return `
        <article class="route-community__card">
          <div class="route-community__head">
            <strong>${escapeHtml(metaBits[0] || 'Recent paddle')}</strong>
            <span class="muted">${escapeHtml(dataAgeLabel(Date.parse(report.approvedAt)))}</span>
          </div>
          ${
            metaBits.length > 1
              ? `<p class="route-community__meta muted">${escapeHtml(metaBits.slice(1).join(' / '))}</p>`
              : ''
          }
          <p>${escapeHtml(report.report || '')}</p>
          ${
            report.notes
              ? `<p class="muted route-community__notes">${escapeHtml(report.notes)}</p>`
              : ''
          }
          ${
            reportPhotos.length > 0
              ? `
                <div class="route-community__photos" aria-label="Photos from this condition report">
                  ${reportPhotos
                    .slice(0, 3)
                    .map(
                      (photo) => `
                        <a class="route-community__photo" href="${escapeHtml(photo.src)}" target="_blank" rel="noreferrer">
                          <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || photo.caption || 'Condition report photo')}" loading="lazy" />
                        </a>
                      `
                    )
                    .join('')}
                </div>
              `
              : ''
          }
        </article>
      `;
    })
    .join('');

  routeCommunityList.innerHTML = `
    ${renderCards(visibleReports)}
    ${
      olderReports.length > 0
        ? `
          <details class="route-community__older">
            <summary class="route-community__older-summary">View ${olderReports.length} older report${olderReports.length === 1 ? '' : 's'}</summary>
            <div class="route-community__older-list">
              ${renderCards(olderReports)}
            </div>
          </details>
        `
        : ''
    }
  `;
}

async function loadApprovedCommunity() {
  try {
    const payload = await getBrowserApiClient().getRouteCommunity(slug);
    if (Array.isArray(payload.photos) && payload.photos.length > 0) {
      mergeApprovedRoutePhotos(payload.photos);
    }
    if (Array.isArray(payload.reports)) {
      renderCommunityReports(payload.reports);
    }
  } catch (error) {
    console.warn('Could not load approved community content.', error);
  }
}

function requestApprovedCommunity() {
  if (approvedCommunityRequested) {
    return;
  }

  approvedCommunityRequested = true;
  loadApprovedCommunity();
}

function initializeContributionControls() {
  if (contributionControlsBound) {
    return;
  }

  contributionControlsBound = true;
  bindRouteContributeTabs();
  bindRoutePhotoForm();
  bindRouteReportForm();
}

function setupLazyCommunityContent() {
  const lazyTargets = [routeCommunity, document.getElementById('share-trip')]
    .filter((target) => target instanceof HTMLElement);

  if (lazyTargets.length === 0) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    requestApprovedCommunity();
    initializeContributionControls();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) {
        return;
      }

      requestApprovedCommunity();
      initializeContributionControls();
      observer.disconnect();
    },
    {
      rootMargin: '720px 0px',
      threshold: 0.01,
    }
  );

  for (const target of lazyTargets) {
    observer.observe(target);
  }
}

function revokeRoutePhotoPreviews(previews) {
  for (const preview of previews) {
    if (preview?.previewUrl) {
      URL.revokeObjectURL(preview.previewUrl);
    }
  }
}

function clearRoutePhotoPreviews() {
  revokeRoutePhotoPreviews(selectedRoutePhotoFiles);
  selectedRoutePhotoFiles = [];
}

function clearSubmittedRoutePhotoPreviews() {
  revokeRoutePhotoPreviews(submittedRoutePhotoPreviews);
  submittedRoutePhotoPreviews = [];
}

function summarizeSelectedRoutePhotos() {
  if (!(routePhotoSelection instanceof HTMLElement)) {
    return;
  }

  if (selectedRoutePhotoFiles.length === 0) {
    routePhotoSelection.textContent = 'No files selected yet.';
    return;
  }

  const totalMb = selectedRoutePhotoFiles.reduce((sum, item) => sum + item.file.size, 0) / (1024 * 1024);
  routePhotoSelection.textContent = `${selectedRoutePhotoFiles.length} photo${selectedRoutePhotoFiles.length === 1 ? '' : 's'} selected • ${totalMb.toFixed(1)} MB total`;
}

function renderRoutePhotoPendingGrid(mode = 'selected') {
  if (!(routeGalleryPending instanceof HTMLElement) || !(routeGalleryPendingGrid instanceof HTMLElement)) {
    return;
  }

  const previews =
    selectedRoutePhotoFiles.length > 0
      ? selectedRoutePhotoFiles.map(({ file, previewUrl }) => ({
          name: file.name,
          size: file.size,
          previewUrl,
        }))
      : submittedRoutePhotoPreviews;
  const hasPhotos = previews.length > 0;
  routeGalleryPending.hidden = !hasPhotos;
  if (!hasPhotos) {
    routeGalleryPendingGrid.innerHTML = '';
    return;
  }

  if (routeGalleryPendingTitle instanceof HTMLElement) {
    routeGalleryPendingTitle.textContent = mode === 'submitted' ? 'Uploaded' : 'Ready to upload';
  }

  if (routeGalleryPendingNote instanceof HTMLElement) {
    routeGalleryPendingNote.textContent =
      mode === 'submitted'
        ? ''
        : 'Check these previews before you send them in.';
  }

  routeGalleryPendingGrid.innerHTML = selectedRoutePhotoFiles
    .length > 0
    ? selectedRoutePhotoFiles
    .map(
      ({ file, previewUrl }) => `
        <article class="route-gallery__pending-card">
          <div class="route-gallery__pending-media">
            <img src="${escapeHtml(previewUrl)}" alt="${escapeHtml(file.name)} preview" loading="lazy" />
          </div>
          <div class="route-gallery__pending-meta">
            <strong>${escapeHtml(file.name)}</strong>
            <span>${Math.max(1, Math.round(file.size / 1024))} KB</span>
          </div>
        </article>
      `
    )
    .join('')
    : previews
        .map(
          ({ name, size, previewUrl }) => `
            <article class="route-gallery__pending-card">
              <div class="route-gallery__pending-media">
                <img src="${escapeHtml(previewUrl)}" alt="${escapeHtml(name)} preview" loading="lazy" />
              </div>
              <div class="route-gallery__pending-meta">
                <strong>${escapeHtml(name)}</strong>
                <span>${Math.max(1, Math.round(size / 1024))} KB</span>
              </div>
            </article>
          `
        )
        .join('');
}

function setRoutePhotoStatus(message, tone = '') {
  if (!(routePhotoStatus instanceof HTMLElement)) {
    return;
  }

  routePhotoStatus.textContent = message;
  routePhotoStatus.classList.toggle('route-photo-form__status--success', tone === 'success');
  routePhotoStatus.classList.toggle('route-photo-form__status--error', tone === 'error');
}

function setRoutePhotoSubmitting(isSubmitting) {
  if (!(routePhotoSubmitButton instanceof HTMLButtonElement)) {
    return;
  }

  routePhotoSubmitButton.disabled = isSubmitting;
  routePhotoSubmitButton.textContent = isSubmitting ? 'Uploading...' : 'Upload photos';
}

function setRouteReportStatus(message, tone = '') {
  if (!(routeReportStatus instanceof HTMLElement)) {
    return;
  }

  routeReportStatus.textContent = message;
  routeReportStatus.classList.toggle('route-photo-form__status--success', tone === 'success');
  routeReportStatus.classList.toggle('route-photo-form__status--error', tone === 'error');
}

function setRouteReportSubmitting(isSubmitting) {
  if (!(routeReportSubmitButton instanceof HTMLButtonElement)) {
    return;
  }

  routeReportSubmitButton.disabled = isSubmitting;
  routeReportSubmitButton.textContent = isSubmitting ? 'Sending...' : 'Send condition report';
}

function summarizeReportPhotos(fileList) {
  if (!(routeReportSelection instanceof HTMLElement)) {
    return;
  }

  if (!Array.isArray(fileList) || fileList.length === 0) {
    routeReportSelection.textContent = 'No files selected.';
    return;
  }

  const totalMb = fileList.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);
  routeReportSelection.textContent = `${fileList.length} photo${fileList.length === 1 ? '' : 's'} selected • ${totalMb.toFixed(1)} MB total`;
}

function validateRoutePhotoSelection(fileList) {
  if (!Array.isArray(fileList) || fileList.length === 0) {
    return '';
  }

  if (fileList.length > ROUTE_PHOTO_MAX_FILES) {
    return `Upload up to ${ROUTE_PHOTO_MAX_FILES} photos at a time.`;
  }

  for (const file of fileList) {
    if (!(file instanceof File)) {
      return 'One of the selected files could not be read.';
    }

    if (!ROUTE_PHOTO_ALLOWED_TYPES.has(file.type)) {
      return 'Photos must be JPG, PNG, or WebP.';
    }

    if (file.size > ROUTE_PHOTO_MAX_BYTES) {
      return 'Each photo must be 4 MB or smaller.';
    }
  }

  return '';
}

function syncSelectedRoutePhotos() {
  if (!(routePhotoFilesInput instanceof HTMLInputElement)) {
    return;
  }

  clearRoutePhotoPreviews();
  clearSubmittedRoutePhotoPreviews();
  const files = Array.from(routePhotoFilesInput.files || []);
  const validationError = validateRoutePhotoSelection(files);
  if (validationError) {
    summarizeSelectedRoutePhotos();
    renderRoutePhotoPendingGrid('selected');
    setRoutePhotoStatus(validationError, 'error');
    return;
  }

  selectedRoutePhotoFiles = files.map((file) => ({
    file,
    previewUrl: URL.createObjectURL(file),
  }));
  summarizeSelectedRoutePhotos();
  renderRoutePhotoPendingGrid('selected');
  setRoutePhotoStatus(`${selectedRoutePhotoFiles.length} photo${selectedRoutePhotoFiles.length === 1 ? '' : 's'} ready to upload.`, '');
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

function bindRoutePhotoForm() {
  if (
    !(routePhotoForm instanceof HTMLFormElement) ||
    !(routePhotoFilesInput instanceof HTMLInputElement) ||
    !(routePhotoNameInput instanceof HTMLInputElement) ||
    !(routePhotoEmailInput instanceof HTMLInputElement) ||
    !(routePhotoRightsInput instanceof HTMLInputElement) ||
    !(routePhotoConsentInput instanceof HTMLInputElement)
  ) {
    return;
  }

  routePhotoFilesInput.addEventListener('change', () => {
    syncSelectedRoutePhotos();
  });

  routePhotoForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nowTs = Date.now();
    const lastTs = Number(window.localStorage.getItem(routePhotoCooldownKey) || '0');
    if (Number.isFinite(lastTs) && nowTs - lastTs < ROUTE_PHOTO_COOLDOWN_MS) {
      setRoutePhotoStatus('Please wait a few seconds before uploading more photos.', 'error');
      return;
    }

    const validationError = validateRoutePhotoSelection(selectedRoutePhotoFiles.map((item) => item.file));
    if (validationError) {
      setRoutePhotoStatus(validationError, 'error');
      if (routePhotoFilesInput instanceof HTMLInputElement) {
        routePhotoFilesInput.focus();
      }
      return;
    }

    const contributorName = routePhotoNameInput.value.trim();
    const contributorEmail = routePhotoEmailInput.value.trim();
    const tripDate = routeTripDateInput instanceof HTMLInputElement ? routeTripDateInput.value.trim() : '';
    const notes = routePhotoNotesInput instanceof HTMLTextAreaElement ? routePhotoNotesInput.value.trim() : '';
    const hasPhotos = selectedRoutePhotoFiles.length > 0;

    if (contributorName.length < 2) {
      setRoutePhotoStatus('Add your name.', 'error');
      routePhotoNameInput.focus();
      return;
    }

    if (!contributorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contributorEmail)) {
      setRoutePhotoStatus('Enter a valid email address.', 'error');
      routePhotoEmailInput.focus();
      return;
    }

    if (!hasPhotos) {
      setRoutePhotoStatus('Add at least one photo to upload.', 'error');
      routePhotoFilesInput.focus();
      return;
    }

    if (hasPhotos && !routePhotoRightsInput.checked) {
      setRoutePhotoStatus('Confirm you took the photos or have permission to share them.', 'error');
      routePhotoRightsInput.focus();
      return;
    }

    if (!routePhotoConsentInput.checked) {
      setRoutePhotoStatus("Confirm that it's okay for Paddle Today to contact you about this submission.", 'error');
      routePhotoConsentInput.focus();
      return;
    }

    setRoutePhotoSubmitting(true);
    setRoutePhotoStatus(`Uploading ${selectedRoutePhotoFiles.length} photo${selectedRoutePhotoFiles.length === 1 ? '' : 's'}...`);

    try {
      const files = await Promise.all(
        selectedRoutePhotoFiles.map(async ({ file }) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          dataUrl: await readFileAsDataUrl(file),
        }))
      );

      await getBrowserApiClient().createRouteContribution({
        riverSlug: slug,
        contributorName,
        contributorEmail,
        tripDate,
        tripSentiment: '',
        tripReport: '',
        notes,
        rightsConfirmed: routePhotoRightsInput.checked,
        reviewConsent: routePhotoConsentInput.checked,
        company: routePhotoCompanyInput instanceof HTMLInputElement ? routePhotoCompanyInput.value.trim() : '',
        files,
      });

      const photoCount = selectedRoutePhotoFiles.length;
      window.localStorage.setItem(routePhotoCooldownKey, String(nowTs));
      clearSubmittedRoutePhotoPreviews();
      submittedRoutePhotoPreviews = selectedRoutePhotoFiles.map(({ file, previewUrl }) => ({
        name: file.name,
        size: file.size,
        previewUrl,
      }));
      selectedRoutePhotoFiles = [];
      routePhotoForm.reset();
      summarizeSelectedRoutePhotos();
      renderRoutePhotoPendingGrid('submitted');
      setRoutePhotoStatus('Thank you for your submission.', 'success');
      setRouteActionStatus('Photo upload sent.', 'success');
      trackEvent('Submit route photos', routeAnalyticsProperties({
        label: 'photos',
        photo_count: String(photoCount),
      }));
    } catch (error) {
      console.error('Failed to submit route photos.', error);
      setRoutePhotoStatus(
        error instanceof Error ? error.message : 'Could not upload these photos right now.',
        'error'
      );
    } finally {
      setRoutePhotoSubmitting(false);
    }
  });
}

function bindRouteReportForm() {
  if (
    !(routeReportForm instanceof HTMLFormElement) ||
    !(routeReportNameInput instanceof HTMLInputElement) ||
    !(routeReportEmailInput instanceof HTMLInputElement) ||
    !(routeReportTextInput instanceof HTMLTextAreaElement) ||
    !(routeReportConsentInput instanceof HTMLInputElement)
  ) {
    return;
  }

  if (routeReportFilesInput instanceof HTMLInputElement) {
    routeReportFilesInput.addEventListener('change', () => {
      const files = Array.from(routeReportFilesInput.files || []);
      const validationError = validateRoutePhotoSelection(files);
      summarizeReportPhotos(validationError ? [] : files);
      if (validationError) {
        setRouteReportStatus(validationError, 'error');
      } else if (files.length > 0) {
        setRouteReportStatus(`${files.length} photo${files.length === 1 ? '' : 's'} ready to send with the report.`, '');
      } else {
        setRouteReportStatus('', '');
      }
    });
  }

  routeReportForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nowTs = Date.now();
    const lastTs = Number(window.localStorage.getItem(routePhotoCooldownKey) || '0');
    if (Number.isFinite(lastTs) && nowTs - lastTs < ROUTE_PHOTO_COOLDOWN_MS) {
      setRouteReportStatus('Please wait a few seconds before sending another report.', 'error');
      return;
    }

    const contributorName = routeReportNameInput.value.trim();
    const contributorEmail = routeReportEmailInput.value.trim();
    const tripDate = routeReportDateInput instanceof HTMLInputElement ? routeReportDateInput.value.trim() : '';
    const tripSentiment = routeReportSentimentInput instanceof HTMLSelectElement ? routeReportSentimentInput.value.trim() : '';
    const observedWaterLevel = routeReportWaterLevelInput instanceof HTMLSelectElement ? routeReportWaterLevelInput.value.trim() : '';
    const tripCompletion = routeReportCompletionInput instanceof HTMLSelectElement ? routeReportCompletionInput.value.trim() : '';
    const overallVerdict = routeReportVerdictInput instanceof HTMLSelectElement ? routeReportVerdictInput.value.trim() : '';
    const tripReport = routeReportTextInput.value.trim();
    const notes = routeReportNotesInput instanceof HTMLTextAreaElement ? routeReportNotesInput.value.trim() : '';
    const reportFiles = routeReportFilesInput instanceof HTMLInputElement ? Array.from(routeReportFilesInput.files || []) : [];

    if (contributorName.length < 2) {
      setRouteReportStatus('Add your name.', 'error');
      routeReportNameInput.focus();
      return;
    }

    if (!contributorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contributorEmail)) {
      setRouteReportStatus('Enter a valid email address.', 'error');
      routeReportEmailInput.focus();
      return;
    }

    if (tripReport.length < 12) {
      setRouteReportStatus('Add a little more detail to the condition report.', 'error');
      routeReportTextInput.focus();
      return;
    }

    if (!observedWaterLevel || !tripCompletion || !overallVerdict) {
      setRouteReportStatus('Choose the observed water level, trip outcome, and overall verdict.', 'error');
      if (routeReportWaterLevelInput instanceof HTMLSelectElement && !observedWaterLevel) {
        routeReportWaterLevelInput.focus();
      }
      return;
    }

    const validationError = validateRoutePhotoSelection(reportFiles);
    if (validationError) {
      setRouteReportStatus(validationError, 'error');
      if (routeReportFilesInput instanceof HTMLInputElement) {
        routeReportFilesInput.focus();
      }
      return;
    }

    if (reportFiles.length > 0 && !(routeReportRightsInput instanceof HTMLInputElement && routeReportRightsInput.checked)) {
      setRouteReportStatus('Confirm you took the photos or have permission to share them.', 'error');
      if (routeReportRightsInput instanceof HTMLInputElement) {
        routeReportRightsInput.focus();
      }
      return;
    }

    if (!routeReportConsentInput.checked) {
      setRouteReportStatus("Confirm that it's okay for Paddle Today to contact you about this report.", 'error');
      routeReportConsentInput.focus();
      return;
    }

    setRouteReportSubmitting(true);
    setRouteReportStatus(reportFiles.length > 0 ? `Sending condition report with ${reportFiles.length} photo${reportFiles.length === 1 ? '' : 's'}...` : 'Sending condition report...');

    try {
      const files = await Promise.all(
        reportFiles.map(async (file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          dataUrl: await readFileAsDataUrl(file),
        }))
      );

      await getBrowserApiClient().createRouteReport({
        riverSlug: slug,
        contributorName,
        contributorEmail,
        tripDate,
        tripSentiment,
        tripReport,
        notes,
        scoringOutcome: {
          schemaVersion: 1,
          ...(latestResult?.generatedAt ? { decisionCapturedAt: latestResult.generatedAt } : {}),
          ...(typeof latestResult?.score === 'number' ? { appScore: latestResult.score } : {}),
          ...(latestResult?.rating ? { appRating: latestResult.rating } : {}),
          ...(typeof latestResult?.confidence?.score === 'number' ? { appConfidence: latestResult.confidence.score } : {}),
          ...(latestResult?.readiness?.status ? { appReadiness: latestResult.readiness.status } : {}),
          ...(latestResult?.river?.profile?.thresholdModel ? { thresholdModel: latestResult.river.profile.thresholdModel } : {}),
          ...(latestResult?.river?.profile?.thresholdSourceStrength ? { thresholdSourceStrength: latestResult.river.profile.thresholdSourceStrength } : {}),
          ...(typeof latestResult?.gauge?.current === 'number' ? { gaugeValue: latestResult.gauge.current } : {}),
          ...(latestResult?.gauge?.unit ? { gaugeUnit: latestResult.gauge.unit } : {}),
          ...(latestResult?.gauge?.trend ? { gaugeTrend: latestResult.gauge.trend } : {}),
          observedWaterLevel,
          tripCompletion,
          overallVerdict,
        },
        rightsConfirmed: routeReportRightsInput instanceof HTMLInputElement ? routeReportRightsInput.checked : false,
        reviewConsent: routeReportConsentInput.checked,
        company: routeReportCompanyInput instanceof HTMLInputElement ? routeReportCompanyInput.value.trim() : '',
        files,
      });

      window.localStorage.setItem(routePhotoCooldownKey, String(nowTs));
      routeReportForm.reset();
      summarizeReportPhotos([]);
      setRouteReportStatus('Thank you for your submission.', 'success');
      setRouteActionStatus('Condition report sent.', 'success');
      trackEvent('Submit condition report', routeAnalyticsProperties({
        label: reportFiles.length > 0 ? 'with_photos' : 'report_only',
      }));
    } catch (error) {
      console.error('Failed to submit condition report.', error);
      setRouteReportStatus(
        error instanceof Error ? error.message : 'Could not send this condition report right now.',
        'error'
      );
    } finally {
      setRouteReportSubmitting(false);
    }
  });
}

function setActiveRouteContributeTab(tabName) {
  for (const tab of routeContributeTabs) {
    if (!(tab instanceof HTMLButtonElement)) continue;
    const isActive = tab.dataset.routeContributeTab === tabName;
    tab.classList.toggle('route-contribute__tab--active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    tab.tabIndex = isActive ? 0 : -1;
  }

  for (const panel of routeContributePanels) {
    if (!(panel instanceof HTMLElement)) continue;
    panel.hidden = panel.dataset.routeContributePanel !== tabName;
  }
}

function bindRouteContributeTabs() {
  if (!(routeContributeTabList instanceof HTMLElement) || routeContributeTabs.length === 0 || routeContributePanels.length === 0) {
    return;
  }

  if (routeContributeTabList.dataset.bound === 'true') {
    setActiveRouteContributeTab('photo');
    return;
  }
  routeContributeTabList.dataset.bound = 'true';

  routeContributeTabList.addEventListener('click', (event) => {
    const tab = event.target instanceof Element ? event.target.closest('[data-route-contribute-tab]') : null;
    if (!(tab instanceof HTMLButtonElement)) return;
    const tabName = tab.dataset.routeContributeTab;
    if (tabName) {
      setActiveRouteContributeTab(tabName);
    }
  });

  routeContributeTabList.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }
    const activeElement = document.activeElement;
    if (!(activeElement instanceof HTMLButtonElement) || !activeElement.matches('[data-route-contribute-tab]')) {
      return;
    }
    event.preventDefault();
    const buttons = routeContributeTabs.filter((item) => item instanceof HTMLButtonElement);
    const currentIndex = buttons.indexOf(activeElement);
    if (currentIndex < 0) return;
    const nextIndex =
      event.key === 'ArrowRight'
        ? (currentIndex + 1) % buttons.length
        : (currentIndex - 1 + buttons.length) % buttons.length;
    const nextTab = buttons[nextIndex];
    if (nextTab instanceof HTMLButtonElement) {
      const tabName = nextTab.dataset.routeContributeTab;
      if (tabName) {
        setActiveRouteContributeTab(tabName);
      }
      nextTab.focus();
    }
  });

  setActiveRouteContributeTab('photo');
}

function activateRouteReportPane() {
  initializeContributionControls();
  setActiveRouteContributeTab('report');
  const shareTripSection = document.getElementById('share-trip');
  if (shareTripSection instanceof HTMLElement) {
    scrollToDetailSection(shareTripSection);
  }
}

function bindRouteReportCtas() {
  for (const cta of routeReportCtas) {
    if (!(cta instanceof HTMLAnchorElement) || cta.dataset.bound === 'true') continue;
    cta.dataset.bound = 'true';
    cta.addEventListener('click', (event) => {
      event.preventDefault();
      activateRouteReportPane();
    });
  }
}

function scoreFeedbackLabel(value) {
  if (value === 'too-harsh') return 'Too harsh';
  if (value === 'about-right') return 'About right';
  if (value === 'too-generous') return 'Too generous';
  return 'Score feedback';
}

function scoreFeedbackTemplate(value) {
  const label = scoreFeedbackLabel(value);
  const scoreLine =
    latestResult && typeof latestResult.score === 'number' && latestResult.rating
      ? `Paddle Today showed ${latestResult.score} ${latestResult.rating}.`
      : 'Paddle Today score was not available when I started this note.';
  return `${label}: ${scoreLine} My on-water experience was: `;
}

function appendScoreFeedbackToReport(value) {
  if (!(routeReportTextInput instanceof HTMLTextAreaElement)) {
    return;
  }

  const template = scoreFeedbackTemplate(value);
  const current = routeReportTextInput.value.trim();
  routeReportTextInput.value = current ? `${current}\n\n${template}` : template;
  routeReportTextInput.focus();
  routeReportTextInput.setSelectionRange(routeReportTextInput.value.length, routeReportTextInput.value.length);

  if (routeReportSentimentInput instanceof HTMLSelectElement && !routeReportSentimentInput.value) {
    routeReportSentimentInput.value =
      value === 'too-generous' ? 'rough' : value === 'too-harsh' ? 'good' : 'mixed';
  }

  if (routeReportNotesInput instanceof HTMLTextAreaElement && latestResult) {
    const notes = [
      latestResult.gauge ? `Gauge: ${formatGaugeValue(latestResult.gauge.current, latestResult.gauge.unit)}` : '',
      latestResult.weather?.temperatureF != null ? `Air: ${Math.round(latestResult.weather.temperatureF)}F` : '',
      latestResult.weather?.next12hWindMphMax != null
        ? `Peak wind: ${Math.round(latestResult.weather.next12hWindMphMax)} mph`
        : '',
    ].filter(Boolean);
    if (notes.length > 0 && !routeReportNotesInput.value.trim()) {
      routeReportNotesInput.value = `Score calibration context: ${notes.join(', ')}.`;
    }
  }
}

function bindScoreFeedbackButtons() {
  for (const button of routeScoreFeedbackButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.bound === 'true') continue;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      const feedback = button.dataset.scoreFeedback || '';
      window.localStorage.setItem(
        `route-score-feedback:${slug}`,
        JSON.stringify({
          feedback,
          score: latestResult?.score ?? null,
          rating: latestResult?.rating ?? null,
          at: new Date().toISOString(),
        })
      );
      appendScoreFeedbackToReport(feedback);
      activateRouteReportPane();
      if (routeScoreFeedbackStatus instanceof HTMLElement) {
        routeScoreFeedbackStatus.textContent = `${scoreFeedbackLabel(feedback)} noted. Add a sentence about what you saw, then send the report when ready.`;
      }
      setRouteReportStatus('Score feedback started. Add your name, email, and any on-water detail before sending.', '');
    });
  }
}

function detailScrollOffset() {
  const actionBarHeight =
    routeActionBar instanceof HTMLElement && routeActionBar.getBoundingClientRect().height > 0
      ? routeActionBar.getBoundingClientRect().height
      : 0;

  return actionBarHeight + 22;
}

function scrollToDetailSection(section) {
  if (!(section instanceof HTMLElement)) {
    return;
  }

  const top = section.getBoundingClientRect().top + window.scrollY - detailScrollOffset();
  window.scrollTo({
    top: Math.max(0, top),
    behavior: 'smooth',
  });
}

function setupDetailSectionNav() {
  if (sectionNavLinks.length === 0 || detailSections.length === 0) {
    return;
  }

  for (const link of sectionNavLinks) {
    if (!(link instanceof HTMLAnchorElement) || link.dataset.navBound === 'true') continue;
    link.dataset.navBound = 'true';
    link.addEventListener('click', (event) => {
      const targetId = link.dataset.detailNavTarget || link.getAttribute('href')?.replace(/^#/, '');
      if (!targetId) return;
      const targetSection = sectionsById.get(targetId);
      if (!(targetSection instanceof HTMLElement)) return;

      event.preventDefault();
      setActiveDetailSection(targetSection.dataset.detailNavGroup || targetId);
      if (window.location.hash !== `#${targetId}`) {
        window.history.replaceState(null, '', `#${targetId}`);
      }
      scrollToDetailSection(targetSection);
    });
  }

  const sectionsById = new Map(
    detailSections
      .map((section) => [section.getAttribute('data-detail-section'), section])
      .filter(([id, section]) => typeof id === 'string' && section instanceof HTMLElement)
  );

  const hashId = window.location.hash.replace(/^#/, '');
  if (hashId && sectionsById.has(hashId)) {
    const hashSection = sectionsById.get(hashId);
    setActiveDetailSection(hashSection instanceof HTMLElement ? hashSection.dataset.detailNavGroup || hashId : hashId);
    window.setTimeout(() => {
      scrollToDetailSection(sectionsById.get(hashId));
    }, 40);
  } else {
    const firstSection = detailSections[0];
    const firstId = firstSection?.getAttribute('data-detail-section');
    if (firstId) {
      setActiveDetailSection(firstSection instanceof HTMLElement ? firstSection.dataset.detailNavGroup || firstId : firstId);
    }
  }

  const syncActiveDetailSection = () => {
    const topOffset = Math.max(detailScrollOffset(), 24) + 12;
    const orderedSections = detailSections
      .map((section) => ({ section, rect: section.getBoundingClientRect() }))
      .filter(({ rect }) => rect.height > 0)
      .sort((left, right) => left.rect.top - right.rect.top);
    const passedSections = orderedSections.filter(({ rect }) => rect.top <= topOffset);
    const activeSection = passedSections.at(-1)?.section ?? orderedSections[0]?.section;
    if (activeSection instanceof HTMLElement) {
      setActiveDetailSection(activeSection.dataset.detailNavGroup || activeSection.dataset.detailSection || '');
    }
  };

  const observer = new IntersectionObserver(
    () => syncActiveDetailSection(),
    {
      rootMargin: '-18% 0px -55% 0px',
      threshold: [0.15, 0.35, 0.6],
    }
  );

  for (const section of detailSections) {
    observer.observe(section);
  }

  window.addEventListener('scroll', syncActiveDetailSection, { passive: true });
  window.addEventListener('resize', syncActiveDetailSection);
  syncActiveDetailSection();
}

function setupDetailJumpLinks() {
  if (detailJumpLinks.length === 0 || detailSections.length === 0) {
    return;
  }

  const sectionsById = new Map(
    detailSections
      .map((section) => [section.getAttribute('data-detail-section'), section])
      .filter(([id, section]) => typeof id === 'string' && section instanceof HTMLElement)
  );

  for (const link of detailJumpLinks) {
    if (!(link instanceof HTMLAnchorElement) || link.dataset.jumpBound === 'true') continue;
    link.dataset.jumpBound = 'true';
    link.addEventListener('click', (event) => {
      const sectionId = link.dataset.detailJump;
      if (!sectionId) {
        return;
      }

      const targetSection = sectionsById.get(sectionId);
      if (!(targetSection instanceof HTMLElement)) {
        return;
      }

      event.preventDefault();

      if (link.dataset.detailExpand === 'confidence' && confidenceExplainer instanceof HTMLDetailsElement) {
        confidenceExplainer.open = true;
      }

      setActiveDetailSection(targetSection.dataset.detailNavGroup || sectionId);
      if (window.location.hash !== `#${sectionId}`) {
        window.history.replaceState(null, '', `#${sectionId}`);
      }

      window.requestAnimationFrame(() => {
        scrollToDetailSection(targetSection);
      });
    });
  }
}

function hasHardSkip(result) {
  return Boolean(
    result &&
      (result.readiness?.status === 'skip' ||
        result.liveData?.overall === 'offline' ||
        (Array.isArray(result.checklist) && result.checklist.some((item) => item.status === 'skip')))
  );
}

function firstSkipChecklistItem(result) {
  if (!Array.isArray(result?.checklist)) {
    return null;
  }

  return result.checklist.find((item) => item?.status === 'skip') ?? null;
}

function isDataLimitedNoGo(result) {
  return result?.rating === 'No-go' && result?.liveData?.overall === 'offline';
}

function decisionLabel(input) {
  const rating = typeof input === 'string' ? input : input?.rating;
  if (typeof input !== 'string') {
    const readiness = input?.readiness?.status ?? (isDataLimitedNoGo(input) ? 'withheld' : hasHardSkip(input) ? 'skip' : 'ready');
    return callLabelForDecision(rating, readiness);
  }
  return callDisplayLabel(rating, { liveData: typeof input === 'string' ? null : input?.liveData });
}

function collapseLowerScoreDetails() {
  const lowerScoreDetails = root.querySelectorAll('#why-this-call .river-accordion');
  for (const detail of lowerScoreDetails) {
    if (detail instanceof HTMLDetailsElement) {
      detail.open = false;
    }
  }
}

function liveWarningLabel(liveData) {
  return liveDataWarning(liveData, {
    offlineShort: 'Warning: live feed issue',
    degradedShort: 'Warning: live reads limited',
  });
}

function ratingLabel(resultOrRating) {
  const rating = typeof resultOrRating === 'string' ? resultOrRating : resultOrRating?.rating;
  const liveData = typeof resultOrRating === 'string' ? null : resultOrRating?.liveData;
  if (rating === 'No-go' && liveData?.overall === 'offline') return 'Manual check needed';
  return conditionTierDisplayLabel(rating);
}

function weatherSkipReason(result) {
  const weather = result?.weather;
  const cold = typeof weather?.temperatureF === 'number' && weather.temperatureF < 50;
  const stormy = Boolean(weather?.next12hStormRisk);
  const rainy = (weather?.next12hPrecipProbabilityMax ?? 0) > 60;

  if (stormy && cold) return 'storm risk and cold weather';
  if (stormy) return 'storm risk';
  if (cold) return 'cold weather';
  if (rainy) return 'heavy rain risk';
  return 'weather';
}

function decisionStatement(result) {
  const rating = result?.rating;
  const readiness = result?.readiness?.status ?? (isDataLimitedNoGo(result) ? 'withheld' : hasHardSkip(result) ? 'skip' : 'ready');
  if (readiness === 'withheld') {
    return `Call unavailable. ${result?.readiness?.reason ?? 'Live river data is missing, so verify the gauge and access sources directly.'}`;
  }
  if (readiness === 'verify') {
    return `Watch closely. ${result?.readiness?.reason ?? 'Verify the flagged conditions before launching.'}`;
  }
  if (readiness === 'skip' || hasHardSkip(result)) {
    const skipItem = firstSkipChecklistItem(result);
    if (skipItem?.label === 'Weather window') {
      return `Gauge looks good, but ${weatherSkipReason(result)} makes this a skip today.`;
    }
    if (skipItem?.label && skipItem?.detail) {
      return `${skipItem.label} is failing: ${skipItem.detail}`;
    }
    if (skipItem?.label) {
      return `${skipItem.label} is failing, so treat today as a skip until you verify it directly.`;
    }
    return 'A required trip check is failing, so treat today as a skip until you verify it directly.';
  }
  if (rating === 'Strong') return 'Conditions line up especially well right now.';
  if (rating === 'Good' && isColdWeatherDrivenCall(result?.weather, result?.gaugeBand)) {
    return 'River conditions are solid, but cold weather still matters today.';
  }
  if (rating === 'Good') return 'River and weather look workable right now.';
  if (rating === 'Fair' && isColdWeatherDrivenCall(result?.weather, result?.gaugeBand)) {
    return 'Paddleable today, but cold weather raises the bar.';
  }
  if (rating === 'Fair') return 'Paddleable today, with tradeoffs worth checking before you drive.';
  if (isColdWeatherDrivenCall(result?.weather, result?.gaugeBand)) {
    return 'River level looks usable, but weather makes it a skip for most paddlers today.';
  }
  return 'Today looks like a pass unless you have verified local information.';
}


function formatHistoryDate(dateString) {
  const parsed = new Date(`${dateString}T12:00:00`);
  if (!Number.isFinite(parsed.getTime())) {
    return dateString;
  }

  return parsed.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  });
}

function formatHistoryDayLabel(dateString) {
  const parsed = new Date(`${dateString}T12:00:00`);
  if (!Number.isFinite(parsed.getTime())) {
    return dateString;
  }

  return parsed.toLocaleDateString([], { weekday: 'short' });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatGaugeValue(value, unit) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return '--';
  }

  if (unit === 'ft') {
    return `${value.toFixed(2).replace(/\.00$/, '')} ${unit}`;
  }

  return `${Math.round(value).toLocaleString('en-US')} ${unit}`;
}

function decorateDecision(element, result) {
  if (!(element instanceof HTMLElement)) return;
  const rating = typeof result === 'string' ? result : result?.rating;

  element.classList.remove('decision-pill--paddle', 'decision-pill--maybe', 'decision-pill--skip');
  const readiness = typeof result === 'string' ? null : result?.readiness?.status;
  element.classList.add(
    readiness === 'withheld' || readiness === 'verify'
      ? 'decision-pill--maybe'
      : typeof result !== 'string' && (readiness === 'skip' || hasHardSkip(result))
      ? 'decision-pill--skip'
      : rating === 'Strong' || rating === 'Good'
      ? 'decision-pill--paddle'
      : rating === 'Fair'
        ? 'decision-pill--maybe'
        : 'decision-pill--skip'
  );
}

function decorateBanner(element, overall) {
  if (!(element instanceof HTMLElement)) return;
  element.classList.remove(...bannerClasses);
  element.classList.add(`status-banner--${overall}`);
}

function setHidden(element, hidden) {
  if (!(element instanceof HTMLElement)) return;
  element.classList.toggle('status-banner--hidden', hidden);
}

function setAlertStatus(message, tone = 'muted') {
  if (!(alertStatus instanceof HTMLElement)) {
    return;
  }

  alertStatus.textContent = message;
  alertStatus.classList.remove('river-alerts__status--success', 'river-alerts__status--error');
  if (tone === 'success') {
    alertStatus.classList.add('river-alerts__status--success');
  } else if (tone === 'error') {
    alertStatus.classList.add('river-alerts__status--error');
  }
}

function setRouteActionStatus(message, tone = 'muted') {
  if (!(routeActionStatus instanceof HTMLElement)) {
    return;
  }

  routeActionStatus.textContent = message;
  routeActionStatus.classList.remove('route-action-bar__status--success', 'route-action-bar__status--error');
  if (tone === 'success') {
    routeActionStatus.classList.add('route-action-bar__status--success');
  } else if (tone === 'error') {
    routeActionStatus.classList.add('route-action-bar__status--error');
  }
}

function closeRouteActionMenus() {
  for (const menu of routeActionMenus) {
    if (menu instanceof HTMLDetailsElement) {
      menu.open = false;
    }
  }
}

function routeShareUrl() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('utm_source', 'share_card');
    url.searchParams.set('utm_medium', 'user_share');
    return url.href;
  } catch {
    return window.location.href;
  }
}

function cleanShareText(value) {
  return String(value || '')
    .replace(/\uFFFD+/g, '-')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function conditionShareReason(result) {
  if (!result) {
    return 'Live gauge, weather, confidence, access details, and a clear paddle call.';
  }

  const parts = [];
  if (result.gauge) {
    parts.push(`${result.gaugeBandLabel || 'Gauge checked'} (${gaugePrimaryValue(result)})`);
  }

  if (result.weather) {
    const weatherParts = [];
    if (typeof result.weather.temperatureF === 'number') {
      weatherParts.push(`${Math.round(result.weather.temperatureF)}°F`);
    }
    if (typeof result.weather.windMph === 'number') {
      weatherParts.push(`${Math.round(result.weather.windMph)} mph wind`);
    }
    if (result.weather.next12hStormRisk) {
      weatherParts.push('storm risk');
    }
    if (weatherParts.length > 0) {
      parts.push(weatherParts.join(', '));
    }
  }

  const skipItem = firstSkipChecklistItem(result);
  if (skipItem?.label) {
    parts.push(`${skipItem.label}: ${skipItem.detail || 'check before you launch'}`);
  }

  return cleanShareText(parts.slice(0, 3).join(' / ') || decisionStatement(result));
}

function buildConditionShareText(result = latestResult) {
  if (!result) {
    return cleanShareText(`${routeShareContext.fallbackText}\n\n${routeShareUrl()}`);
  }

  const decision = decisionLabel(result);
  const rating = ratingLabel(result);
  const score = typeof result.score === 'number' ? `Score ${result.score}` : 'Score unavailable';
  const updated = result.generatedAt ? `Updated ${new Date(result.generatedAt).toLocaleString()}` : 'Updated time unavailable';

  return cleanShareText([
    `${riverContext.name}: ${riverContext.reach}`,
    `${decision} (${rating}; ${score})`,
    conditionShareReason(result),
    updated,
    routeShareUrl(),
  ].join('\n'));
}

function nativeSharePayload(result = latestResult) {
  return {
    title: routeShareContext.title,
    text: buildConditionShareText(result),
    url: routeShareUrl(),
  };
}

function updateShareActions(result = latestResult) {
  if (shareXLink instanceof HTMLAnchorElement) {
    shareXLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(buildConditionShareText(result))}`;
  }

  if (shareNativeButton instanceof HTMLButtonElement) {
    const payload = nativeSharePayload(result);
    shareNativeButton.hidden = !(navigator.share && (!navigator.canShare || navigator.canShare(payload)));
  }

  if (shareFacebookLink instanceof HTMLAnchorElement) {
    shareFacebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(routeShareUrl())}`;
  }
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall back to a selected textarea below.
    }
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '-9999px';
  document.body.append(textArea);
  textArea.select();

  try {
    return document.execCommand('copy');
  } finally {
    textArea.remove();
  }
}

function showManualShareCopy(text) {
  const panel = shareCopyButton instanceof HTMLElement ? shareCopyButton.closest('.route-action-menu__panel') : null;
  if (!(panel instanceof HTMLElement)) {
    return;
  }

  let field = panel.querySelector('[data-share-manual-copy]');
  if (!(field instanceof HTMLTextAreaElement)) {
    field = document.createElement('textarea');
    field.className = 'route-action-menu__manual-copy';
    field.dataset.shareManualCopy = 'true';
    field.readOnly = true;
    field.rows = 5;
    shareCopyButton.after(field);
  }

  field.value = text;
  field.hidden = false;
  field.focus();
  field.select();
}

function setDetailRefreshState(state, detail = '') {
  if (detailRefreshButton instanceof HTMLButtonElement) {
    detailRefreshButton.disabled = state === 'loading';
    detailRefreshButton.textContent = state === 'loading' ? 'Checking live data...' : 'Refresh river';
  }

  if (detailRefreshNote instanceof HTMLElement) {
    if (state === 'loading') {
      detailRefreshNote.textContent = 'Pulling the latest USGS gauge and weather. Usually under 10 seconds.';
      return;
    }

    if (state === 'error') {
      detailRefreshNote.textContent = detail || 'Last live refresh failed.';
      return;
    }

    if (lastDetailSuccessAt) {
      detailRefreshNote.textContent = `${dataAgeLabel(lastDetailSuccessAt)}. Auto-refreshes every 5 minutes.`;
      return;
    }

    detailRefreshNote.textContent = 'Auto-refreshes every 5 minutes once live data lands.';
  }
}

function setDetailFetchBannerState(kind, detail) {
  if (!(detailFetchBanner instanceof HTMLElement)) {
    return;
  }

  if (kind === 'hidden') {
    setHidden(detailFetchBanner, true);
    detailFetchBanner.hidden = true;
    if (detailStatusBanner instanceof HTMLElement) {
      setHidden(detailStatusBanner, false);
      detailStatusBanner.hidden = false;
    }
    if (detailFetchActions instanceof HTMLElement) {
      detailFetchActions.hidden = true;
    }
    return;
  }

  setHidden(detailFetchBanner, false);
  detailFetchBanner.hidden = false;
  if (detailStatusBanner instanceof HTMLElement) {
    setHidden(detailStatusBanner, true);
    detailStatusBanner.hidden = true;
  }
  decorateBanner(detailFetchBanner, kind === 'stale' ? 'degraded' : 'offline');
  if (detailFetchTitle instanceof HTMLElement) {
    detailFetchTitle.textContent =
      kind === 'initial'
        ? 'Live river inputs could not be loaded.'
        : kind === 'stale'
          ? 'Showing last known route data.'
          : 'Live river inputs could not be refreshed.';
  }
  if (detailFetchDetail instanceof HTMLElement) {
    detailFetchDetail.textContent = detail;
  }
  if (detailFetchActions instanceof HTMLElement) {
    detailFetchActions.hidden = false;
  }
}

function inputStateLabel(state, kind) {
  if (state === 'live') return `${kind} live`;
  if (state === 'stale') return `${kind} stale`;
  return `${kind} offline`;
}

function trendValue(result) {
  if (!result.gauge || result.gauge.delta24h === null) {
    return 'Trend unavailable';
  }

  const delta = `${result.gauge.delta24h >= 0 ? '+' : ''}${formatGaugeValue(result.gauge.delta24h, result.gauge.unit)}`;
  return `${result.gauge.trend} ${delta}`;
}

function scoreWeatherIconMarkup(state) {
  if (state === 'wind') {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h10a2.5 2.5 0 1 0-2.5-2.5"></path><path d="M3 13h14a2.5 2.5 0 1 1-2.5 2.5"></path><path d="M5 17h7"></path></svg>';
  }
  if (state === 'rain' || state === 'storm') {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 16a4 4 0 1 1 .9-7.9A5 5 0 0 1 18 10a3.5 3.5 0 1 1-.5 7H7Z"></path><path d="M10 18.5l-.8 2"></path><path d="M15 18.5l-.8 2"></path></svg>';
  }
  if (state === 'cold') {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18"></path><path d="M5.5 6.5 18.5 17.5"></path><path d="M5.5 17.5 18.5 6.5"></path><path d="M4 12h16"></path></svg>';
  }
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2.5v3"></path><path d="M12 18.5v3"></path><path d="M2.5 12h3"></path><path d="M18.5 12h3"></path></svg>';
}

function scoreWeatherBadgeMarkup(result) {
  const weather = buildRiverWeatherViewModel(result?.weather);
  const { state, label } = weather;

  return `
    <span class="card-weather-badge card-weather-badge--${state}">
      <span class="card-weather-badge__icon weather-indicator weather-indicator--${state}" aria-hidden="true">${scoreWeatherIconMarkup(state)}</span>
      <span class="card-weather-badge__label">${escapeHtml(label)}</span>
    </span>
  `;
}

function scoreConditionSignalMarkup(result) {
  const gaugeText = result.gauge
    ? `${gaugePrimaryValue(result)} • ${trendSummaryValue(result.gauge).toLowerCase()}`
    : 'Gauge unavailable';
  const weatherText = buildRiverWeatherViewModel(result.weather).summaryValue;

  return `
    <span class="river-card__signal-item">${escapeHtml(gaugeText)}</span>
    <span class="river-card__signal-item">${escapeHtml(weatherText)}</span>
  `;
}

function renderScoreConditions(result) {
  setText(
    'score-gauge-condition',
    result.gauge ? `Gauge: ${result.gaugeBandLabel}` : 'Gauge unavailable'
  );

  const weather = root.querySelector('[data-field="score-weather-condition"]');
  if (weather instanceof HTMLElement) {
    weather.innerHTML = scoreWeatherBadgeMarkup(result);
    weather.hidden = !result.weather;
  }

  const signal = root.querySelector('[data-field="score-condition-signal"]');
  if (signal instanceof HTMLElement) {
    signal.innerHTML = scoreConditionSignalMarkup(result);
  }
}

function renderDetailBanner(result) {
  if (!(detailStatusBanner instanceof HTMLElement)) {
    return;
  }

  const titleEl = root.querySelector('[data-detail-banner-title]');
  const detailEl = root.querySelector('[data-detail-banner-detail]');
  const railReliability = setText('rail-reliability', 'Checking reads');
  const railNextStep = setText('rail-next-step', 'Checking freshness and source quality.');
  const effectiveLiveData = buildRiverReadinessViewModel(result).effectiveLiveData;
  decorateBanner(detailStatusBanner, effectiveLiveData.overall);
  detailStatusBanner.classList.toggle('status-banner--compact', effectiveLiveData.overall === 'live');

  if (!(titleEl instanceof HTMLElement) || !(detailEl instanceof HTMLElement)) {
    return;
  }

  setText('reliability-gauge-title', inputStateLabel(effectiveLiveData.gauge.state, 'Gauge'));
  setText('reliability-gauge-detail', effectiveLiveData.gauge.detail);
  setText('reliability-weather-title', inputStateLabel(effectiveLiveData.weather.state, 'Weather'));
  setText('reliability-weather-detail', effectiveLiveData.weather.detail);

  if (effectiveLiveData.overall === 'offline') {
    titleEl.textContent = 'Live route data is offline.';
    detailEl.textContent =
      'The direct gauge could not be read. Check the source directly before deciding.';
    if (railReliability instanceof HTMLElement) {
      railReliability.textContent = 'Check source';
      railReliability.classList.add('data-status-pill--offline');
      railReliability.classList.remove('data-status-pill--live', 'data-status-pill--degraded');
    }
    if (railNextStep instanceof HTMLElement) {
      railNextStep.textContent = 'Gauge data is missing. Open the source link before you drive.';
    }
    setText('reliability-action-title', 'Recheck gauge source');
    setText(
      'reliability-action-detail',
      'Open the direct gauge source before driving.'
    );
    return;
  }

  if (effectiveLiveData.overall === 'degraded') {
    titleEl.textContent = 'Live route data is limited.';
    detailEl.textContent =
      `${effectiveLiveData.summary} Recheck the source before a longer drive.`;
    if (railReliability instanceof HTMLElement) {
      railReliability.textContent = 'Use with caution';
      railReliability.classList.add('data-status-pill--degraded');
      railReliability.classList.remove('data-status-pill--live', 'data-status-pill--offline');
    }
    const actionTitle =
      effectiveLiveData.gauge.state === 'stale'
        ? 'Refresh the gauge'
        : effectiveLiveData.weather.state !== 'live'
          ? 'Refresh weather'
          : 'Double-check these reads';
    const actionDetail =
      effectiveLiveData.gauge.state === 'stale'
        ? 'The gauge is older than the freshness target. Open the gauge source before you leave.'
        : effectiveLiveData.weather.state === 'stale'
          ? 'The weather read is stale. Recheck wind, storms, and radar before launching.'
          : 'One or more reads are partial. Recheck the source pages directly.';
    if (railNextStep instanceof HTMLElement) {
      railNextStep.textContent = actionDetail;
    }
    setText('reliability-action-title', actionTitle);
    setText('reliability-action-detail', actionDetail);
    return;
  }

  titleEl.textContent = 'Reads are current.';
  detailEl.textContent = 'Gauge and weather are fresh enough for today\'s recommendation.';
  if (railReliability instanceof HTMLElement) {
    railReliability.textContent = 'Fresh';
    railReliability.classList.add('data-status-pill--live');
    railReliability.classList.remove('data-status-pill--degraded', 'data-status-pill--offline');
  }
  if (railNextStep instanceof HTMLElement) {
    railNextStep.textContent = 'Fresh enough to decide today.';
  }
  setText('reliability-action-title', 'Move to trip checks');
  setText(
    'reliability-action-detail',
    'No extra freshness check is needed right now.'
  );
}

function renderLaunchReadiness(result) {
  if (!(readinessGrid instanceof HTMLElement)) {
    return;
  }

  const readiness = buildRiverReadinessViewModel(result);
  const { verdict } = readiness;
  const verdictEl = setText('readiness-verdict', readiness.verdictLabel);
  if (verdictEl instanceof HTMLElement) {
    verdictEl.classList.remove(
      'launch-readiness__verdict--go',
      'launch-readiness__verdict--watch',
      'launch-readiness__verdict--withheld',
      'launch-readiness__verdict--skip'
    );
    verdictEl.classList.add(`launch-readiness__verdict--${verdict}`);
  }

  setText('readiness-summary', readiness.summary);
  setText('readiness-note', readiness.note);

  const checklistByLabel = new Map(result.checklist.map((item) => [item.label, item]));
  const items = [
    {
      label: 'River score',
      value: `${decisionLabel(result)} - ${result.score}`,
      detail: decisionStatement(result),
      status: verdict,
    },
    {
      label: 'Flow window',
      value: result.gauge ? `${result.gaugeBandLabel} - ${formatGaugeValue(result.gauge.current, result.gauge.unit)}` : 'Unavailable',
      detail: checklistByLabel.get('Gauge window')?.detail ?? 'Current gauge window is unavailable.',
      status: checklistByLabel.get('Gauge window')?.status ?? 'watch',
    },
    {
      label: 'Trend',
      value: trendValue(result),
      detail: checklistByLabel.get('Trend check')?.detail ?? 'Trend guidance is unavailable.',
      status: checklistByLabel.get('Trend check')?.status ?? 'watch',
    },
    {
      label: 'Weather',
      value: readiness.weather.summaryValue,
      detail: checklistByLabel.get('Weather window')?.detail ?? 'Weather guidance is unavailable.',
      status: checklistByLabel.get('Weather window')?.status ?? 'watch',
    },
    {
      label: 'Access',
      value: readiness.accessLabel,
      detail: checklistByLabel.get('Skill and access')?.detail ?? 'Confirm put-in, take-out, and access rules.',
      status: checklistByLabel.get('Skill and access')?.status ?? 'watch',
    },
  ];

  readinessGrid.innerHTML = items
    .map(
      (item) => `
        <article class="readiness-item readiness-item--${item.status}">
          <span class="readiness-item__label">${item.label}</span>
          <strong>${item.value}</strong>
          <p class="muted">${item.detail}</p>
        </article>
      `
    )
    .join('');
}

function renderFactors(factors) {
  const list = root.querySelector('[data-factor-list]');
  if (!(list instanceof HTMLElement)) return;

  list.innerHTML = factors
    .map(
      (factor) => `
        <li class="factor-item impact-${factor.impact}">
          <div class="factor-item__head">
            <span class="factor-item__label">${factor.label}</span>
            <span class="factor-item__value">${factor.value}</span>
          </div>
          <p class="muted" style="margin: 0.55rem 0 0;">${factor.detail}</p>
        </li>
      `
    )
    .join('');
}

function renderConfidenceDetail(confidence) {
  const labelEl = setText('confidence-detail-label', confidence?.label ?? 'checking');
  if (labelEl instanceof HTMLElement) {
    labelEl.textContent = confidence?.label ? confidenceDisplayLabel(confidence.label).toLowerCase() : 'checking';
  }

  const reasonsList = root.querySelector('[data-confidence-reasons]');
  const warningsList = root.querySelector('[data-confidence-warnings]');
  const warningsGroup = root.querySelector('[data-confidence-warnings-group]');

  if (reasonsList instanceof HTMLElement) {
    const reasons = Array.isArray(confidence?.reasons) ? confidence.reasons : [];
    reasonsList.innerHTML = reasons.length
      ? reasons.map((note) => `<li>${note}</li>`).join('')
      : '<li>Evidence-strength notes are unavailable.</li>';
  }

  if (warningsList instanceof HTMLElement && warningsGroup instanceof HTMLElement) {
    const warnings = Array.isArray(confidence?.warnings) ? confidence.warnings : [];
    warningsGroup.hidden = warnings.length === 0;
    warningsList.innerHTML = warnings.length
      ? warnings.map((note) => `<li>${note}</li>`).join('')
      : '';
  }
}

function applyBreakdownTone(field, value) {
  const element = setText(field, signedPoints(value));
  if (!(element instanceof HTMLElement)) {
    return;
  }

  element.classList.remove(
    'river-score-breakdown__row-value--positive',
    'river-score-breakdown__row-value--negative',
    'river-score-breakdown__row-value--neutral'
  );
  element.classList.add(
    value > 0
      ? 'river-score-breakdown__row-value--positive'
      : value < 0
        ? 'river-score-breakdown__row-value--negative'
        : 'river-score-breakdown__row-value--neutral'
  );
}

function renderScoreBreakdown(result) {
  const breakdown = result.scoreBreakdown;
  if (!breakdown) {
    return;
  }

  const model = buildScoreBreakdownViewModel(breakdown, {
    includeZeroComfort: true,
    includeLimit: false,
  });
  const fields = {
    riverQuality: ['breakdown-river-quality', 'breakdown-river-quality-detail'],
    wind: ['breakdown-wind-adjustment', 'breakdown-wind-detail'],
    temperature: ['breakdown-temperature-adjustment', 'breakdown-temperature-detail'],
    rain: ['breakdown-rain-adjustment', 'breakdown-rain-detail'],
    comfort: ['breakdown-comfort-adjustment', 'breakdown-comfort-detail'],
  };
  for (const row of model.rows) {
    const [valueField, detailField] = fields[row.key] ?? [];
    if (valueField) applyBreakdownTone(valueField, row.value);
    if (detailField) setText(detailField, row.explanation);
  }
  setText('breakdown-final-score', `${model.finalScore}`);
  setText('breakdown-final-rating', result.rating);
  setText('breakdown-summary', model.summary);

  const otherGroup = root.querySelector('[data-breakdown-other-group]');
  if (otherGroup instanceof HTMLElement) {
    otherGroup.hidden = breakdown.comfortAdjustment === 0;
  }

  const capList = root.querySelector('[data-score-cap-reasons]');
  const capWrap = root.querySelector('[data-score-cap-wrap]');
  if (capList instanceof HTMLElement) {
    if (capWrap instanceof HTMLElement) {
      capWrap.hidden = model.capReasons.length === 0;
    }
    capList.innerHTML = model.capReasons.map((reason) => `<li>${reason}</li>`).join('');
  }
}

function renderChecklist(checklist) {
  const list = root.querySelector('[data-checklist]');
  if (!(list instanceof HTMLElement)) return;

  list.innerHTML = checklist
    .map(
      (item) => `
        <li class="decision-checklist__item decision-checklist__item--${item.status}">
          <span class="decision-checklist__status">${item.status === 'go' ? 'Go' : item.status === 'watch' ? 'Watch' : 'Skip'}</span>
          <div>
            <strong>${item.label}</strong>
            <p class="muted">${item.detail}</p>
          </div>
        </li>
      `
    )
    .join('');
}

function renderOutlooks(outlooks) {
  const list = root.querySelector('[data-outlooks]');
  if (!(list instanceof HTMLElement)) return;

  list.innerHTML = outlooks
    .map((outlook) => {
      const title =
        outlook.availability === 'available' && typeof outlook.score === 'number' && outlook.rating
          ? `${outlook.scoreRange ? `${outlook.scoreRange.min}-${outlook.scoreRange.max}` : outlook.score} - ${ratingDisplayLabel(outlook.rating)}`
          : 'Not enough data';
      return `
        <article class="outlook-card outlook-card--${outlook.availability === 'available' ? 'available' : 'withheld'}">
          <span class="outlook-card__label">${outlook.label}</span>
          <strong>${title}</strong>
          ${outlook.availability === 'available' ? `<span class="outlook-card__direction">${outlook.direction === 'improving' ? 'Trending better' : outlook.direction === 'worsening' ? 'Trending worse' : outlook.direction === 'stable' ? 'Holding steady' : 'Direction uncertain'}</span>` : ''}
          <p class="muted">${outlook.explanation}</p>
        </article>
      `;
    })
    .join('');
}

function weatherConditionLabel(condition) {
  if (typeof condition === 'string' && condition.trim()) return condition.trim();
  const code = Number.isFinite(condition) ? condition : null;
  if (code === null) return 'Condition unavailable';
  if (code === 0) return 'Clear';
  if ([1, 2].includes(code)) return 'Mostly clear';
  if (code === 3) return 'Overcast';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Mixed weather';
}

function weatherConditionShortLabel(condition) {
  if (typeof condition === 'string' && condition.trim()) {
    const label = condition.trim();
    if (/storm|thunder/i.test(label)) return 'Storm';
    if (/snow|flurr/i.test(label)) return 'Snow';
    if (/rain|shower/i.test(label)) return 'Rain';
    if (/fog/i.test(label)) return 'Fog';
    if (/cloud/i.test(label)) return 'Clouds';
    if (/sun|clear/i.test(label)) return 'Clear';
    return label;
  }
  const code = Number.isFinite(condition) ? condition : null;
  if (code === null) return 'Mixed';
  if (code === 0) return 'Clear';
  if ([1, 2, 3].includes(code)) return 'Clouds';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Storm';
  return 'Mixed';
}

function weatherConditionTone(condition) {
  if (typeof condition === 'string' && condition.trim()) {
    const label = condition.trim();
    if (/storm|thunder/i.test(label)) return 'storm';
    if (/snow|flurr/i.test(label)) return 'cold';
    if (/rain|shower/i.test(label)) return 'rain';
    if (/clear|sun/i.test(label)) return 'clear';
    return 'mixed';
  }
  const code = Number.isFinite(condition) ? condition : null;
  if (code === null) return 'mixed';
  if ([95, 96, 99].includes(code)) return 'storm';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'cold';
  if (code === 0) return 'clear';
  return 'mixed';
}

function hourlyWeatherIconMarkup(condition) {
  const label = weatherConditionShortLabel(condition);
  if (/storm/i.test(label)) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 16a4 4 0 1 1 .9-7.9A5 5 0 0 1 18 10a3.5 3.5 0 1 1-.5 7H7Z"></path><path d="m13 13-2 4h3l-2 4"></path></svg>';
  }
  if (/rain|drizzle/i.test(label)) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 16a4 4 0 1 1 .9-7.9A5 5 0 0 1 18 10a3.5 3.5 0 1 1-.5 7H7Z"></path><path d="M9 18.5 8.2 21"></path><path d="M13 18.5 12.2 21"></path><path d="M17 18.5 16.2 21"></path></svg>';
  }
  if (/snow/i.test(label)) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18"></path><path d="M5.6 6.6 18.4 17.4"></path><path d="M5.6 17.4 18.4 6.6"></path><path d="M4 12h16"></path></svg>';
  }
  if (/fog|cloud|mixed/i.test(label)) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 16a4 4 0 1 1 .9-7.9A5 5 0 0 1 18 10a3.5 3.5 0 1 1-.5 7H7Z"></path><path d="M4 20h16"></path></svg>';
  }
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2.5v3"></path><path d="M12 18.5v3"></path><path d="M2.5 12h3"></path><path d="M18.5 12h3"></path><path d="m4.9 4.9 2.1 2.1"></path><path d="m17 17 2.1 2.1"></path><path d="m19.1 4.9-2.1 2.1"></path><path d="m7 17-2.1 2.1"></path></svg>';
}

function representativeForecastPoints(weather, count = 4) {
  const points = Array.isArray(weather?.todayHourly) ? weather.todayHourly.filter(Boolean) : [];
  if (points.length <= count) {
    return points;
  }

  const indexes = Array.from({ length: count }, (_, index) =>
    Math.round((index * (points.length - 1)) / Math.max(count - 1, 1)),
  );
  return [...new Set(indexes)].map((index) => points[index]).filter(Boolean);
}

function renderWeatherDayStrips(weather) {
  const points = representativeForecastPoints(weather);

  for (const strip of weatherDayStrips) {
    if (!(strip instanceof HTMLElement)) continue;
    strip.replaceChildren();

    if (points.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'route-weather-day-strip__loading muted';
      empty.textContent = "Today's forecast icons are unavailable.";
      strip.append(empty);
      continue;
    }

    const fragment = document.createDocumentFragment();
    for (const point of points) {
      const tone = weatherConditionTone(point.conditionLabel ?? point.weatherCode);
      const article = document.createElement('article');
      article.className = `route-weather-day route-weather-day--${tone}`;

      const time = document.createElement('span');
      time.className = 'route-weather-day__time';
      time.textContent = point.label || 'Later';

      const icon = document.createElement('span');
      icon.className = 'route-weather-day__icon';
      icon.innerHTML = hourlyWeatherIconMarkup(point.conditionLabel ?? point.weatherCode);

      const temperature = document.createElement('strong');
      temperature.className = 'route-weather-day__temperature';
      temperature.textContent = formatTemperature(point.temperatureF);

      const rain = document.createElement('span');
      rain.className = 'route-weather-day__rain';
      rain.textContent = formatRainChance(point.precipProbability);

      article.setAttribute(
        'aria-label',
        `${time.textContent}, ${weatherConditionShortLabel(point.conditionLabel ?? point.weatherCode)}, ${temperature.textContent}, ${rain.textContent}`,
      );
      article.append(time, icon, temperature, rain);
      fragment.append(article);
    }

    strip.append(fragment);
  }
}

function formatTemperature(value) {
  return typeof value === 'number' ? `${Math.round(value)}\u00B0F` : '--';
}

function formatWind(value) {
  return typeof value === 'number' ? `${Math.round(value)} mph` : '--';
}

function formatRainTotal(value, fallback = 'Unavailable') {
  return typeof value === 'number' ? `${value < 0.1 ? value.toFixed(2) : value.toFixed(1)} in` : fallback;
}

function formatGaugeMetric(value, unit, fallback = 'Unavailable') {
  if (typeof value !== 'number') {
    return fallback;
  }

  if (unit === 'ft') {
    return `${value.toFixed(2).replace(/\.00$/, '')} ft`;
  }

  return `${Math.round(value).toLocaleString('en-US')} ${unit}`;
}

function gaugeBandVisualModel(result) {
  const gauge = result?.gauge;
  const profile = result?.river?.profile;
  const unit = gauge?.unit || result?.river?.gaugeSource?.unit;

  if (!gauge || typeof gauge.current !== 'number' || !profile || !unit) {
    return null;
  }

  const createScale = (rawMin, rawMax) => {
    const span = Math.max(rawMax - rawMin, unit === 'ft' ? 0.5 : 25);
    const domainMin = rawMin - span * 0.06;
    const domainMax = rawMax + span * 0.06;
    const domain = Math.max(domainMax - domainMin, unit === 'ft' ? 0.5 : 25);
    return {
      domainMin,
      domainMax,
      percent(value) {
        return clamp(((value - domainMin) / domain) * 100, 0, 100);
      },
    };
  };

  const markerTone = ['too-low', 'too-high'].includes(result.gaugeBand)
    ? 'skip'
    : ['low-shoulder', 'high-shoulder', 'minimum-met'].includes(result.gaugeBand)
      ? 'watch'
      : 'good';

  if (
    profile.thresholdModel === 'two-sided' &&
    typeof profile.idealMin === 'number' &&
    typeof profile.idealMax === 'number' &&
    profile.idealMax > profile.idealMin
  ) {
    const idealSpan = Math.max(profile.idealMax - profile.idealMin, unit === 'ft' ? 0.5 : 25);
    const lowEdge =
      typeof profile.tooLow === 'number' && profile.tooLow < profile.idealMin
        ? profile.tooLow
        : profile.idealMin - idealSpan * 0.75;
    const highEdge =
      typeof profile.tooHigh === 'number' && profile.tooHigh > profile.idealMax
        ? profile.tooHigh
        : profile.idealMax + idealSpan * 0.75;
    const scale = createScale(
      Math.min(lowEdge, profile.idealMin, gauge.current),
      Math.max(highEdge, profile.idealMax, gauge.current),
    );
    const usableStart = scale.percent(profile.idealMin);
    const usableEnd = scale.percent(profile.idealMax);

    return {
      currentPercent: scale.percent(gauge.current),
      usableStart,
      usableWidth: Math.max(usableEnd - usableStart, 8),
      currentLabel: formatGaugeMetric(gauge.current, unit),
      statusLabel: result.gaugeBandLabel || 'Current gauge band',
      lowLabel: 'Below target',
      targetLabel: `${formatGaugeMetric(profile.idealMin, unit)}–${formatGaugeMetric(profile.idealMax, unit)}`,
      highLabel: 'Above target',
      markerTone,
      ariaLabel: `Current gauge ${formatGaugeMetric(gauge.current, unit)}. Preferred band ${formatGaugeMetric(profile.idealMin, unit)} to ${formatGaugeMetric(profile.idealMax, unit)}.`,
    };
  }

  if (profile.thresholdModel === 'minimum-only' && typeof profile.tooLow === 'number') {
    const floor = profile.tooLow;
    const referenceSpan = Math.max(
      Math.abs(gauge.current - floor),
      Math.abs(floor) * 0.5,
      unit === 'ft' ? 1 : 100,
    );
    const lowEdge = Math.min(gauge.current, floor - referenceSpan * 0.55);
    const highEdge = Math.max(gauge.current, floor + referenceSpan * 1.45);
    const scale = createScale(lowEdge, highEdge);
    const usableStart = scale.percent(floor);

    return {
      currentPercent: scale.percent(gauge.current),
      usableStart,
      usableWidth: Math.max(100 - usableStart, 12),
      currentLabel: formatGaugeMetric(gauge.current, unit),
      statusLabel: result.gaugeBandLabel || 'Minimum met',
      lowLabel: 'Below floor',
      targetLabel: `Floor ${formatGaugeMetric(floor, unit)}`,
      highLabel: 'Above floor',
      markerTone,
      ariaLabel: `Current gauge ${formatGaugeMetric(gauge.current, unit)}. Minimum paddling floor ${formatGaugeMetric(floor, unit)}.`,
    };
  }

  return null;
}

function renderGaugeBandVisuals(result) {
  const model = gaugeBandVisualModel(result);

  for (const visual of gaugeBandVisuals) {
    if (!(visual instanceof HTMLElement)) continue;

    visual.hidden = !model;
    if (!model) continue;

    const usable = visual.querySelector('[data-gauge-band-usable]');
    const marker = visual.querySelector('[data-gauge-band-marker]');
    const status = visual.querySelector('[data-gauge-band-status]');
    const current = visual.querySelector('[data-gauge-band-current]');
    const low = visual.querySelector('[data-gauge-band-low]');
    const target = visual.querySelector('[data-gauge-band-target]');
    const high = visual.querySelector('[data-gauge-band-high]');

    if (usable instanceof HTMLElement) {
      usable.style.left = `${model.usableStart}%`;
      usable.style.width = `${model.usableWidth}%`;
    }
    if (marker instanceof HTMLElement) {
      marker.style.left = `${model.currentPercent}%`;
      marker.classList.remove(
        'route-gauge-band__marker--good',
        'route-gauge-band__marker--watch',
        'route-gauge-band__marker--skip',
      );
      marker.classList.add(`route-gauge-band__marker--${model.markerTone}`);
    }
    if (status instanceof HTMLElement) status.textContent = model.statusLabel;
    if (current instanceof HTMLElement) current.textContent = model.currentLabel;
    if (low instanceof HTMLElement) low.textContent = model.lowLabel;
    if (target instanceof HTMLElement) target.textContent = model.targetLabel;
    if (high instanceof HTMLElement) high.textContent = model.highLabel;

    visual.setAttribute('role', 'img');
    visual.setAttribute('aria-label', model.ariaLabel);
  }
}

function gaugeSourceDisplay(result) {
  const display = result?.river?.gaugeSource?.display;
  if (display && typeof display === 'object') {
    return display;
  }

  const provider = result?.river?.gaugeSource?.provider;
  const source = result?.river?.gaugeSource;
  const primaryMetricLabel =
    source?.display?.primaryMetricLabel ||
    (source?.metric === 'gage_height_ft' || source?.unit === 'ft' ? 'Gauge height' : 'Discharge');
  const secondaryMetricLabel =
    source?.metric === 'gage_height_ft' || source?.unit === 'ft' ? 'Discharge' : 'Gauge height';
  if (provider === 'mn_dnr') {
    return {
      provider: 'mn_dnr',
      label: 'MN DNR River Levels',
      shortLabel: 'MN DNR',
      primaryMetricLabel,
      secondaryMetricLabel,
      interpretationLabel: 'DNR interpretation',
      supportsRecentSamples: false,
      supportsHydrograph: true,
    };
  }

  return {
    provider: provider || 'usgs',
    label: 'USGS Water Data',
    shortLabel: 'USGS',
    primaryMetricLabel,
    secondaryMetricLabel,
    interpretationLabel: null,
    supportsRecentSamples: true,
    supportsHydrograph: false,
  };
}

function gaugePrimaryValue(result) {
  if (!result?.gauge) {
    return 'No reading';
  }

  const source = result.river?.gaugeSource;
  if (source?.unit === 'ft' || source?.metric === 'gage_height_ft') {
    return result.gauge.gaugeHeightNow != null
      ? formatGaugeMetric(result.gauge.gaugeHeightNow, 'ft')
      : formatGaugeMetric(result.gauge.current, result.gauge.unit);
  }

  if (source?.unit === 'cfs' || source?.metric === 'discharge_cfs') {
    return result.gauge.dischargeNow != null
      ? formatGaugeMetric(result.gauge.dischargeNow, 'cfs')
      : formatGaugeMetric(result.gauge.current, result.gauge.unit);
  }

  return formatGaugeMetric(result.gauge.current, result.gauge.unit);
}

function gaugeSecondaryValue(result) {
  if (!result?.gauge) {
    return 'No reading';
  }

  const source = result.river?.gaugeSource;
  if (source?.unit === 'ft' || source?.metric === 'gage_height_ft') {
    return formatGaugeMetric(result.gauge.dischargeNow, 'cfs', 'No reading');
  }

  return formatGaugeMetric(result.gauge.gaugeHeightNow, 'ft', 'No reading');
}

function formatRainChance(value) {
  return typeof value === 'number' ? `${Math.round(value)}% rain` : 'Rain n/a';
}

function titleCaseWord(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return '';
  }

  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}

function trendSummaryValue(gauge) {
  if (!gauge) {
    return 'No reading';
  }

  const trend = titleCaseWord(gauge.trend || 'unknown');
  if (typeof gauge.delta24h !== 'number') {
    return trend;
  }

  return `${trend} • ${gauge.delta24h >= 0 ? '+' : ''}${formatGaugeMetric(gauge.delta24h, gauge.unit)} last 24h`;
}

function temperatureSummary(weather) {
  if (typeof weather?.temperatureF === 'number') {
    return `Air: ${Math.round(weather.temperatureF)}°F`;
  }

  return 'Air: No reading';
}

function waterTemperatureSummary(gauge) {
  if (typeof gauge?.waterTempF === 'number') {
    return `Water: ${Math.round(gauge.waterTempF)}°F`;
  }

  return 'Water: No reading';
}

function windDescriptor(mph) {
  if (typeof mph !== 'number') {
    return 'Wind';
  }

  if (mph < 6) return 'Light wind';
  if (mph < 12) return 'Light wind';
  if (mph < 18) return 'Moderate wind';
  if (mph < 25) return 'Windy';
  return 'Strong wind';
}

function windSummary(weather) {
  const wind = typeof weather?.windMph === 'number' ? weather.windMph : null;
  const gust = typeof weather?.gustMph === 'number' ? weather.gustMph : null;
  const maxWind = typeof weather?.next12hWindMphMax === 'number' ? weather.next12hWindMphMax : null;
  const reference = maxWind ?? wind ?? gust;

  if (typeof reference !== 'number') {
    return 'No reading';
  }

  const label = maxWind !== null ? 'next 12h max' : wind !== null ? 'current' : 'gust';
  const gustPart = gust !== null && label !== 'gust' ? `, gusts ${Math.round(gust)} mph` : '';
  return `${windDescriptor(reference)} (${Math.round(reference)} mph ${label}${gustPart})`;
}

function renderDecisionSummary(result) {
  const summary = root.querySelector('[data-field="explanation"]');
  if (!(summary instanceof HTMLElement)) {
    return;
  }

  const sentences = String(result.explanation || '')
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const todaysCall = decisionStatement(result);
  const scoreLine =
    typeof result.score === 'number' && result.rating
      ? hasHardSkip(result)
        ? `Score ${result.score}; route inputs rate ${ratingLabel(result)}`
        : `Score ${result.score}; ${ratingLabel(result)}`
      : 'Score unavailable';
  const watchouts = sentences.filter((sentence) =>
    /wind|gust|dropping|falling|rising|cold|temperature|uncertainty|stale|re-check|check|limited|floor|minimum|low side|high side|less guidance/i.test(sentence)
  );
  const why = sentences.filter((sentence) => !watchouts.includes(sentence)).slice(1, 4);
  const whyLabel =
    hasHardSkip(result)
      ? "What is working"
      : result.rating === 'Fair'
        ? "Why it is still paddleable"
        : 'Why it works';
  const beforeCommitting = result.liveData?.overall === 'live'
    ? 'Refresh this page, scan access notes, and confirm the route still matches your skill, boat, and shuttle plan.'
    : 'Refresh this page and open the source link before relying on this route call.';
  const visibleWhy = why.slice(0, 1);
  const visibleWatchouts = watchouts.slice(0, 1);
  const additionalContext = [...why.slice(1), ...watchouts.slice(1)].slice(0, 4);
  const moreContext = additionalContext.length > 0
    ? `
      <details class="river-detail__decision-summary-more">
        <summary>More context</summary>
        <ul class="compact-list">
          ${additionalContext.map((sentence) => `<li>${escapeHtml(sentence)}</li>`).join('')}
        </ul>
      </details>
    `
    : '';

  summary.innerHTML = `
    <div class="river-detail__decision-summary">
      <p><strong>Today's call:</strong> ${escapeHtml(todaysCall)} <span class="river-detail__decision-score">${escapeHtml(scoreLine)}</span></p>
      ${visibleWhy.length > 0 ? `<p><strong>${whyLabel}:</strong> ${escapeHtml(visibleWhy.join(' '))}</p>` : ''}
      ${visibleWatchouts.length > 0 ? `<p><strong>What to watch:</strong> ${escapeHtml(visibleWatchouts.join(' '))}</p>` : ''}
      <p><strong>Before committing:</strong> ${escapeHtml(beforeCommitting)}</p>
      ${moreContext}
    </div>
  `;
}

function gustSummary(weather) {
  if (typeof weather?.gustMph === 'number') {
    return `Gusts ${Math.round(weather.gustMph)} mph`;
  }

  return 'Gusts: No reading';
}

function rainTimingLabel(weather) {
  if (!weather) {
    return 'No reading';
  }

  const firstRainHour = findFirstHourlyRain(weather);
  const chance = weather.next12hPrecipProbabilityMax;
  const timing = weather.rainTimingLabel ?? 'None';
  const rainChanceText = typeof chance === 'number' ? `${Math.round(chance)}% rain next 12h` : null;

  if (weather.next12hStormRisk) {
    return rainChanceText ? `Storm risk (${rainChanceText})` : 'Storm risk';
  }

  if (timing === 'None') {
    return rainChanceText ? `Mostly dry (${rainChanceText})` : 'Mostly dry';
  }
  if (firstRainHour) {
    if (timing === 'Imminent') {
      return rainChanceText ? `Rain now (${rainChanceText})` : 'Rain now';
    }
    if (timing === 'Next few hours') {
      return rainChanceText ? `Rain in the next few hours (${rainChanceText})` : 'Rain in the next few hours';
    }
    return rainChanceText ? `Rain later today (${rainChanceText})` : `Rain around ${firstRainHour.label}`;
  }
  if (timing === 'Imminent') {
    return rainChanceText ? `Rain now (${rainChanceText})` : 'Rain now';
  }
  if (timing === 'Next few hours') {
    return rainChanceText ? `Rain in the next few hours (${rainChanceText})` : 'Rain in the next few hours';
  }
  return rainChanceText ? `Rain later today (${rainChanceText})` : 'Rain later today';
}

function recentRainSummary(weather) {
  const recent24 = formatRainTotal(weather?.recentRain24hIn, 'No reading');
  const recent72 = formatRainTotal(weather?.recentRain72hIn, 'No reading');

  if (recent24 === 'No reading' && recent72 === 'No reading') {
    return 'Recent rain: No reading';
  }

  return `Recent rain: ${recent24} / ${recent72}`;
}

function describeHistoryBand(score) {
  const tens = Math.max(0, Math.min(90, Math.floor(score / 10) * 10));
  const ones = score - tens;

  if (tens >= 100) {
    return 'around 100';
  }

  if (ones <= 2) return `low ${tens}s`;
  if (ones <= 6) return `mid-${tens}s`;
  return `high ${tens}s`;
}

function historyTrendSummary(days) {
  const average = Math.round(days.reduce((sum, day) => sum + day.avgScore, 0) / days.length);
  const first = days[0]?.avgScore ?? average;
  const latest = days.at(-1)?.avgScore ?? average;
  const delta = latest - first;

  if (Math.abs(delta) <= 4) {
    return `Holding steady this week (${describeHistoryBand(average)}).`;
  }

  if (delta > 0) {
    return `Improving this week (${describeHistoryBand(average)}).`;
  }

  return `Sliding this week (${describeHistoryBand(average)}).`;
}

function weatherHourlyNote(weather) {
  if (!weather || !Array.isArray(weather.todayHourly) || weather.todayHourly.length === 0) {
  return "Hourly forecast isn't available right now.";
  }

  const bestWindow = pickBestShortRouteWindow(weather);
  if (bestWindow && bestWindow.score >= 6) {
    return `The best stretch looks to be ${bestWindow.start.label} to ${bestWindow.end.label}.`;
  }

  const firstRainHour = findFirstHourlyRain(weather);
  if (firstRainHour) {
    return `If you are trying to sneak in a short route, conditions look steadier before ${firstRainHour.label}.`;
  }

  return 'The next several hours look steadier than the all-day summary suggests.';
}

function scoreHourlyPoint(point) {
  let score = 5;

  if (hourlyWeatherConditionKind(point) === 'storm') {
    score -= 6;
  }

  const rainChance = point.precipProbability ?? 0;
  const precipitation = point.precipitationIn ?? 0;
  if (rainChance >= 70 || precipitation >= 0.05) {
    score -= 4;
  } else if (rainChance >= 40 || precipitation >= 0.01) {
    score -= 2;
  }

  const wind = point.windMph ?? 0;
  const gust = point.windGustMph ?? 0;
  if (wind >= 22 || gust >= 30) {
    score -= 4;
  } else if (wind >= 18 || gust >= 24) {
    score -= 2;
  } else if (wind >= 14 || gust >= 18) {
    score -= 1;
  }

  const temp = point.temperatureF;
  if (typeof temp === 'number') {
    if (temp < 35) {
      score -= 3;
    } else if (temp < 45) {
      score -= 2;
    } else if (temp < 55) {
      score -= 1;
    } else if (temp >= 65 && temp <= 82) {
      score += 1;
    }
  }

  return score;
}

function pointLocalHour(point) {
  const timeValue = point?.time;
  if (typeof timeValue !== 'string' || !timeValue) {
    return null;
  }

  const date = new Date(timeValue);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.getHours();
}

function isAfterDark(point) {
  if (point?.isDaytime === false) {
    return true;
  }

  if (point?.isDaytime === true) {
    return false;
  }

  const hour = pointLocalHour(point);
  if (hour === null) {
    return false;
  }

  // Fallback guard when the weather payload does not include a daytime flag.
  return hour >= 21 || hour < 6;
}

function pickBestShortRouteWindow(weather) {
  if (!weather || !Array.isArray(weather.todayHourly) || weather.todayHourly.length < 2) {
    return null;
  }

  const points = weather.todayHourly;
  const sunsetIndex = points.findIndex((point) => isAfterDark(point));
  const lastAllowedEndIndex = sunsetIndex >= 0 ? sunsetIndex - 1 : points.length - 1;

  if (lastAllowedEndIndex < 1) {
    return null;
  }

  let bestWindow = null;

  for (let startIndex = 0; startIndex < points.length - 1; startIndex += 1) {
    for (let length = 2; length <= 3; length += 1) {
      const endIndex = startIndex + length - 1;
      if (endIndex >= points.length || endIndex > lastAllowedEndIndex) {
        continue;
      }

      const window = points.slice(startIndex, endIndex + 1);
      let score = 0;
      let hasStorm = false;
      let hasHeavyRain = false;

      for (const point of window) {
        score += scoreHourlyPoint(point);
        hasStorm ||= hourlyWeatherConditionKind(point) === 'storm';
        hasHeavyRain ||= (point.precipProbability ?? 0) >= 70 || (point.precipitationIn ?? 0) >= 0.05;
      }

      if (hasStorm) {
        score -= 6;
      }
      if (hasHeavyRain) {
        score -= 3;
      }

      score += length === 3 ? 1 : 0;
      score -= startIndex * 0.6;

      if (!bestWindow || score > bestWindow.score) {
        bestWindow = {
          start: window[0],
          end: window[window.length - 1],
          score,
        };
      }
    }
  }

  return bestWindow;
}

function bestShortRouteWindow(weather) {
  if (!weather || !Array.isArray(weather.todayHourly) || weather.todayHourly.length === 0) {
    return 'A short-route weather window is unavailable right now.';
  }

  const bestWindow = pickBestShortRouteWindow(weather);
  if (bestWindow && bestWindow.score >= 6) {
    return `Best short-route window: ${bestWindow.start.label} to ${bestWindow.end.label}`;
  }

  const firstRainHour = findFirstHourlyRain(weather);
  if (firstRainHour) {
    return `Weather gets less friendly around ${firstRainHour.label}.`;
  }

  return 'Short-route conditions look fairly steady through the next several hours.';
}

function weatherNowSummary(weather) {
  if (!weather) {
    return 'Unavailable';
  }

  const parts = [];
  if (typeof weather.conditionLabel === 'string' && weather.conditionLabel.trim()) {
    parts.push(weather.conditionLabel.trim());
  }
  if (typeof weather.temperatureF === 'number') {
    parts.push(`${Math.round(weather.temperatureF)}\u00B0F now`);
  }

  const firstRainHour = findFirstHourlyRain(weather);
  if (firstRainHour) {
    parts.push(`rain around ${firstRainHour.label}`);
  } else if ((weather.next12hPrecipProbabilityMax ?? 0) < 25) {
    parts.push('mostly dry');
  } else {
    parts.push('rain later today');
  }

  return parts.join(' \u2022 ');
}

function renderHourlyWeather(weather) {
  if (!(weatherHourlyGrid instanceof HTMLElement)) {
    return;
  }

  weatherHourlyGrid.replaceChildren();

  if (!weather || !Array.isArray(weather.todayHourly) || weather.todayHourly.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'weather-hourly__empty muted';
    empty.textContent = "Hourly forecast isn't available right now.";
    weatherHourlyGrid.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  const bestWindow = pickBestShortRouteWindow(weather);

  for (const point of weather.todayHourly) {
    const article = document.createElement('article');
    article.className = `weather-hour weather-hour--${weatherConditionTone(point.conditionLabel ?? point.weatherCode)}`;
    const inBestWindow =
      bestWindow &&
      point.time >= bestWindow.start.time &&
      point.time <= bestWindow.end.time &&
      bestWindow.score >= 6;

    if (inBestWindow) {
      article.classList.add('weather-hour--best');
    }

    const time = document.createElement('span');
    time.className = 'weather-hour__time';
    time.textContent = point.label;

    const temp = document.createElement('strong');
    temp.className = 'weather-hour__temp';
    temp.textContent = formatTemperature(point.temperatureF);

    const icon = document.createElement('span');
    icon.className = 'weather-hour__icon';
    icon.innerHTML = hourlyWeatherIconMarkup(point.conditionLabel ?? point.weatherCode);

    const condition = document.createElement('span');
    condition.className = 'weather-hour__condition';
    condition.textContent = weatherConditionShortLabel(point.conditionLabel ?? point.weatherCode);

    const meta = document.createElement('span');
    meta.className = 'weather-hour__meta';
    meta.textContent = `${formatRainChance(point.precipProbability)} \u00B7 ${formatWind(point.windMph)}${point.windGustMph ? ` \u00B7 gust ${Math.round(point.windGustMph)} mph` : ''}`;

    article.append(time, icon, temp, condition, meta);
    fragment.append(article);
  }

  weatherHourlyGrid.append(fragment);
}

function hasCoordinates(point) {
  return Number.isFinite(point.latitude) && Number.isFinite(point.longitude);
}

function activeAccessPoints() {
  const accessContext = activeAccessContext;
  return [
    hasCoordinates(accessContext.putIn) ? { ...accessContext.putIn, kind: 'putIn' } : null,
    hasCoordinates(accessContext.takeOut) ? { ...accessContext.takeOut, kind: 'takeOut' } : null,
  ].filter(Boolean);
}

function fullRouteAccessPoints() {
  const accessPoints = Array.isArray(plannerAccessPoints)
    ? plannerAccessPoints
        .filter(hasCoordinates)
        .slice()
        .sort((left, right) => Number(left.mileFromStart) - Number(right.mileFromStart))
    : [];

  if (accessPoints.length >= 2) {
    return accessPoints;
  }

  return [
    hasCoordinates(riverContext.putIn) ? riverContext.putIn : null,
    hasCoordinates(riverContext.takeOut) ? riverContext.takeOut : null,
  ].filter(Boolean);
}

function buildAccessRouteLine(points) {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: points.map((point) => [point.longitude, point.latitude]),
    },
  };
}

function syncRouteGeoJsonLine(mapRuntime, sourceId, layerId, routeLine, result, paint = {}) {
  if (!mapRuntime) return;

  if (routeLine?.geometry?.coordinates?.length >= 2) {
    syncGeoJsonOverlay(mapRuntime, {
      sourceId,
      data: routeLine,
      layers: [{
        id: layerId,
        type: 'line',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': routeLineColor(result),
          'line-width': paint.lineWidth ?? 4,
          'line-opacity': paint.lineOpacity ?? 0.88,
        },
      }],
    });
    mapRuntime.setPaintProperty(layerId, 'line-color', routeLineColor(result));
    if (typeof paint.lineWidth === 'number') mapRuntime.setPaintProperty(layerId, 'line-width', paint.lineWidth);
    if (typeof paint.lineOpacity === 'number') mapRuntime.setPaintProperty(layerId, 'line-opacity', paint.lineOpacity);
    return;
  }

  removeMapOverlay(mapRuntime, {
    layerIds: [layerId],
    sourceIds: [sourceId],
  });
}

function syncAccessRouteLine(mapRuntime, sourceId, layerId, points, result, paint = {}) {
  syncRouteGeoJsonLine(
    mapRuntime,
    sourceId,
    layerId,
    points.length > 1 ? buildAccessRouteLine(points) : null,
    result,
    paint,
  );
}

function mapQueryUrl(point) {
  if (!hasCoordinates(point)) {
    return null;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(`${point.latitude},${point.longitude}`)}`;
}

function appleDirectionsUrl(putIn, takeOut) {
  if (!hasCoordinates(putIn) || !hasCoordinates(takeOut)) {
    return null;
  }

  return `https://maps.apple.com/?saddr=${encodeURIComponent(`${putIn.latitude},${putIn.longitude}`)}&daddr=${encodeURIComponent(`${takeOut.latitude},${takeOut.longitude}`)}&dirflg=d`;
}

function googleDirectionsUrl(putIn, takeOut) {
  if (!hasCoordinates(putIn) || !hasCoordinates(takeOut)) {
    return null;
  }

  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${putIn.latitude},${putIn.longitude}`)}&destination=${encodeURIComponent(`${takeOut.latitude},${takeOut.longitude}`)}`;
}

function openStreetMapSegmentUrl(putIn, takeOut) {
  const mappedPoints = [putIn, takeOut].filter(hasCoordinates);
  if (!mappedPoints.length) {
    return null;
  }

  const latitude =
    mappedPoints.reduce((sum, point) => sum + point.latitude, 0) / mappedPoints.length;
  const longitude =
    mappedPoints.reduce((sum, point) => sum + point.longitude, 0) / mappedPoints.length;

  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=12/${latitude}/${longitude}`;
}

function setLinkState(element, href, fallbackLabel) {
  if (!(element instanceof HTMLAnchorElement)) {
    return;
  }

  if (href) {
    element.href = href;
    element.hidden = false;
    return;
  }

  element.hidden = true;
  element.removeAttribute('href');
  if (fallbackLabel) {
    element.textContent = fallbackLabel;
  }
}

function setCopyButtonState(button, point, label) {
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const defaultLabel = button.dataset.defaultLabel || 'Copy coordinates';
  button.textContent = defaultLabel;

  if (hasCoordinates(point)) {
    button.hidden = false;
    button.disabled = false;
    button.dataset.copyValue = `${point.latitude}, ${point.longitude}`;
    button.dataset.copyLabel = label;
    return;
  }

  button.hidden = true;
  button.disabled = true;
  button.dataset.copyValue = '';
}

function renderActiveAccessContext() {
  const context = activeAccessContext;
  setElementText(activePutInName, context.putIn?.name || 'Check source links');
  setElementText(activeTakeOutName, context.takeOut?.name || 'Check source links');
  setElementText(
    activePutInNote,
    context.putInNote || 'Check parking, launch, and access rules on the ground.'
  );
  setElementText(
    activeTakeOutNote,
    context.takeOutNote || 'Check parking, launch, and access rules on the ground.'
  );
  setElementText(activeFactPutIn, context.putIn?.name || 'Check source links');
  setElementText(activeFactTakeOut, context.takeOut?.name || 'Check source links');
  setElementText(activeFactDistance, context.distanceLabel || 'Check source links');

  setCopyButtonState(activePutInCopy, context.putIn, 'Put-in');
  setCopyButtonState(activeTakeOutCopy, context.takeOut, 'Take-out');

  setLinkState(accessPutInLink, mapQueryUrl(context.putIn));
  setLinkState(accessTakeOutLink, mapQueryUrl(context.takeOut));
  setLinkState(accessDirectionsGoogle, googleDirectionsUrl(context.putIn, context.takeOut));
  setLinkState(accessDirectionsApple, appleDirectionsUrl(context.putIn, context.takeOut));
  setLinkState(accessOpenStreetMap, openStreetMapSegmentUrl(context.putIn, context.takeOut));
}

async function copyCoordinates(button) {
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const value = String(button.dataset.copyValue || '').trim();
  const label = String(button.dataset.copyLabel || 'Coordinates').trim();
  if (!value) {
    return;
  }

  const original = button.dataset.defaultLabel || button.textContent || 'Copy coordinates';

  try {
    await navigator.clipboard.writeText(value);
    button.textContent = `${label} copied`;
  } catch (error) {
    console.error('Failed to copy coordinates.', error);
    button.textContent = 'Copy failed';
  }

  window.setTimeout(() => {
    button.textContent = original;
  }, 1600);
}

function bindCopyCoordinateButtons() {
  for (const button of copyCoordButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.copyBound === 'true') continue;
    button.dataset.copyBound = 'true';
    button.addEventListener('click', () => {
      copyCoordinates(button);
    });
  }
}

function initializeAccessPlanner() {
  if (!(accessPlanner instanceof HTMLElement)) {
    return;
  }

  if (accessPointData instanceof HTMLScriptElement) {
    try {
      plannerAccessPoints = JSON.parse(accessPointData.textContent || '[]');
    } catch (error) {
      console.error('Failed to parse access planner points.', error);
      plannerAccessPoints = [];
    }
  }

  if (
    !(accessPutInSelect instanceof HTMLSelectElement) ||
    !(accessTakeOutSelect instanceof HTMLSelectElement) ||
    plannerAccessPoints.length < 2
  ) {
    return;
  }

  const initialParams = new URL(window.location.href).searchParams;
  const deepLinkPutIn = initialParams.get('putin');
  const deepLinkTakeOut = initialParams.get('takeout');
  const deepLinkPutInIndex = plannerAccessPoints.findIndex((point) => point.id === deepLinkPutIn);
  const deepLinkTakeOutIndex = plannerAccessPoints.findIndex((point) => point.id === deepLinkTakeOut);
  const hasValidDeepLink =
    deepLinkPutInIndex >= 0 &&
    deepLinkTakeOutIndex > deepLinkPutInIndex;

  if (hasValidDeepLink) {
    accessPutInSelect.value = deepLinkPutIn;
    accessTakeOutSelect.value = deepLinkTakeOut;
  }

  const syncTakeOutOptions = () => {
    const putInIndex = plannerAccessPoints.findIndex((point) => point.id === accessPutInSelect.value);
    for (const option of Array.from(accessTakeOutSelect.options)) {
      const optionIndex = plannerAccessPoints.findIndex((point) => point.id === option.value);
      option.disabled = optionIndex <= putInIndex;
    }

    const selectedTakeOutIndex = plannerAccessPoints.findIndex((point) => point.id === accessTakeOutSelect.value);
    if (selectedTakeOutIndex <= putInIndex) {
      const next = plannerAccessPoints[putInIndex + 1];
      if (next) {
        accessTakeOutSelect.value = next.id;
      }
    }
  };

  const updatePlanner = ({ source = 'manual' } = {}) => {
    const start = plannerAccessPoints.find((point) => point.id === accessPutInSelect.value);
    const end = plannerAccessPoints.find((point) => point.id === accessTakeOutSelect.value);
    if (!start || !end) {
      return;
    }

    const distance = Math.max(0.1, Number((end.mileFromStart - start.mileFromStart).toFixed(1)));
    const paceFast = Math.max(0.5, distance / 3);
    const paceEasy = Math.max(paceFast + 0.25, distance / 2.2);
    const segmentKind =
      start.segmentKind === 'lake' && end.segmentKind === 'lake'
        ? 'Lake chain'
        : start.segmentKind === 'creek' && end.segmentKind === 'creek'
          ? 'Creek-focused'
          : 'Lake to creek';
    const stageLabel =
      distance < 4
        ? 'Short option'
        : distance < 9
          ? 'Half-day option'
          : 'Full route option';
    const shuttleText =
      distance < 5
        ? 'Short self-shuttle'
        : distance < 10
          ? 'Flexible self-shuttle'
          : 'Long self-shuttle';
    const summaryText = `${start.name} to ${end.name} is about ${distance.toFixed(1)} mi. ${segmentKind === 'Lake chain' ? 'This keeps you mostly on the lake chain.' : segmentKind === 'Creek-focused' ? 'This keeps the day mostly on the narrower downstream creek.' : 'This starts on the lakes and finishes on the narrower creek.'}`;
    const noteText = [start.note, end.note].filter(Boolean).join(' ');

    setElementText(accessDistance, `${distance.toFixed(1)} mi`);
    setElementText(accessShape, segmentKind);
    setElementText(accessTime, `About ${formatDuration(paceFast)} to ${formatDuration(paceEasy)}`);
    setElementText(accessStage, stageLabel);
    setElementText(accessShuttle, shuttleText);
    setElementText(accessNote, noteText || 'Use this to shorten the day without changing the route recommendation.');
    setElementText(accessSummary, summaryText);

    activeAccessContext = {
      putIn: start,
      takeOut: end,
      distanceLabel: `${distance.toFixed(1)} mi`,
      putInNote: start.note || riverContext.defaultPutInNote,
      takeOutNote: end.note || riverContext.defaultTakeOutNote,
      mapMode: hasCoordinates(start) && hasCoordinates(end) ? 'Selected segment' : 'Selected segment (partial map)',
    };
    renderActiveAccessContext();
    renderAccessMaps(latestResult);

    const fullRoute =
      start.id === plannerAccessPoints[0]?.id &&
      end.id === plannerAccessPoints[plannerAccessPoints.length - 1]?.id;
    const nextUrl = new URL(window.location.href);
    if (fullRoute) {
      nextUrl.searchParams.delete('putin');
      nextUrl.searchParams.delete('takeout');
    } else {
      nextUrl.searchParams.set('putin', start.id);
      nextUrl.searchParams.set('takeout', end.id);
    }
    window.history.replaceState({}, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    syncTripPackLinks();

    if (!plannerViewTracked) {
      plannerViewTracked = true;
      trackEvent('Route planner view', plannerAnalyticsProperties({
        source: hasValidDeepLink ? 'deep_link' : 'default',
      }));
    } else if (source === 'manual') {
      trackEvent('Select route segment', plannerAnalyticsProperties({ source: 'manual' }));
    }
  };

  accessPutInSelect.addEventListener('change', () => {
    syncTakeOutOptions();
    updatePlanner({ source: 'manual' });
  });
  accessTakeOutSelect.addEventListener('change', () => updatePlanner({ source: 'manual' }));

  syncTakeOutOptions();
  updatePlanner({ source: hasValidDeepLink ? 'deep_link' : 'default' });
}

function setElementText(element, value) {
  if (element instanceof HTMLElement) {
    element.textContent = value;
  }
}

function formatDuration(hours) {
  if (!Number.isFinite(hours) || hours <= 0) {
    return '0 hr';
  }

  const whole = Math.floor(hours);
  const minutes = Math.round((hours - whole) * 60);
  if (whole <= 0) {
    return `${minutes} min`;
  }
  if (minutes === 0) {
    return `${whole} hr`;
  }
  return `${whole} hr ${minutes} min`;
}

function routeLineColor(result) {
  if (result?.rating === 'Strong') return '#2c8a54';
  if (result?.rating === 'Good') return '#3d9a83';
  if (result?.rating === 'Fair') return '#ad752c';
  if (result?.rating === 'No-go') return '#bb5840';
  return '#1e7397';
}

function detailMapPopupMarkup(kind, point, result) {
  const kindLabel = kind === 'putIn' ? 'Put-in' : 'Take-out';
  const summary =
    typeof result?.score === 'number' && result?.rating
      ? `Today's score is ${result.score} - ${result.rating}. Confirm parking and access rules before you launch.`
      : 'Access reference only. Confirm parking and access rules before you launch.';
  const query = encodeURIComponent(`${point.latitude},${point.longitude}`);

  return `
    <article class="score-map-popup">
      <p class="score-map-popup__state">${escapeHtml(kindLabel)} | ${escapeHtml(riverContext.state)}</p>
      <h3>${escapeHtml(point.name)}</h3>
      <p class="score-map-popup__reach">${escapeHtml(riverContext.name)} | ${escapeHtml(riverContext.reach)}</p>
      <p class="score-map-popup__summary">${escapeHtml(summary)}</p>
      <a
        class="score-map-popup__link"
        href="https://www.google.com/maps?q=${query}"
        target="_blank"
        rel="noreferrer"
      >
        Open in Google Maps
      </a>
    </article>
  `;
}

function heroMapStatusText(points) {
  const accessContext = activeAccessContext;
  const distanceLabel = accessContext.distanceLabel || 'Mapped segment';

  if (accessContext.mapMode === 'Selected segment') {
    return `${distanceLabel} between the selected put-in and take-out.`;
  }

  if (accessContext.mapMode === 'Selected segment (partial map)') {
    return points.length > 1
      ? `${distanceLabel} for the selected segment. Some intermediate landings still need confirmed coordinates.`
      : 'Selected segment map is limited because only one chosen landing has confirmed coordinates right now.';
  }

  return points.length > 1
    ? `${distanceLabel} between the stored put-in and take-out.`
    : 'One mapped access point is available for this route right now.';
}

async function renderDetailHeroMap(result = null) {
  const renderVersion = ++detailHeroMapRenderVersion;
  if (!(detailHeroMap instanceof HTMLElement) || !(detailHeroMapShell instanceof HTMLElement)) {
    return;
  }

  const points = activeAccessPoints();
  const fullRoutePoints = fullRouteAccessPoints();
  detailHeroMapShell.hidden = points.length === 0;

  if (!points.length) {
    detailHeroMapStatusController.empty();
    detailHeroMapRuntime = destroyMapRuntime(detailHeroMapRuntime);
    detailHeroMapMarkers = clearMapMarkers(detailHeroMapMarkers);
    return;
  }

  if (!detailHeroMapRuntime) {
    detailHeroMapStatusController.loading();
  }

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl) {
      detailHeroMapShell.hidden = true;
      return;
    }

    if (!detailHeroMapRuntime) {
      const startingPoint = points[0];
      detailHeroMapRuntime = createPaddleMap(maplibregl, {
        profile: 'staticPreview',
        container: detailHeroMap,
        center: [startingPoint.longitude, startingPoint.latitude],
        zoom: 10.6,
        minZoom: 5,
        maxZoom: 13,
      });

        await waitForMapReady(detailHeroMapRuntime, {
          timeoutMs: 7000,
          rejectOnError: true,
          rejectOnTimeout: true,
        });
      }

      await waitForMapReady(detailHeroMapRuntime, {
        timeoutMs: 7000,
        rejectOnError: true,
        rejectOnTimeout: true,
      });

      detailHeroMapMarkers = clearMapMarkers(detailHeroMapMarkers);
      // Keep the complete river corridor visible as context, then emphasize
      // the currently selected segment on top of it (matching the access map).
      syncAccessRouteLine(
        detailHeroMapRuntime,
        'detail-hero-full-route-line',
        'detail-hero-full-route-line',
        fullRoutePoints,
        result,
        { lineWidth: 6, lineOpacity: 0.28 },
      );
      syncAccessRouteLine(
        detailHeroMapRuntime,
        'detail-hero-route-line',
        'detail-hero-route-line',
        points,
        result,
        { lineWidth: 3, lineOpacity: 0.8 },
      );
      loadCanonicalRiverRouteLine(slug, fullRoutePoints, { stateName: riverContext.state })
        .then((routeLine) => {
          if (detailHeroMapRuntime && routeLine && renderVersion === detailHeroMapRenderVersion) {
            syncRouteGeoJsonLine(detailHeroMapRuntime, 'detail-hero-full-route-line', 'detail-hero-full-route-line', routeLine, result, {
              lineWidth: 6,
              lineOpacity: 0.28,
            });
          }
        })
        .catch((error) => console.warn('Canonical hero full-route geometry unavailable.', error));
      loadCanonicalRiverRouteLine(slug, points, { stateName: riverContext.state })
        .then((routeLine) => {
          if (detailHeroMapRuntime && routeLine && renderVersion === detailHeroMapRenderVersion) {
            syncRouteGeoJsonLine(detailHeroMapRuntime, 'detail-hero-route-line', 'detail-hero-route-line', routeLine, result, {
              lineWidth: 3,
              lineOpacity: 0.8,
            });
          }
        })
        .catch((error) => console.warn('Canonical hero selected-route geometry unavailable.', error));

    const bounds = new maplibregl.LngLatBounds();
    for (const point of points) {
      const markerNode = document.createElement('div');
      markerNode.className = `detail-access-marker detail-access-marker--${point.kind === 'putIn' ? 'putin' : 'takeout'}`;
      markerNode.innerHTML = `<span>${point.kind === 'putIn' ? 'IN' : 'OUT'}</span>`;
      markerNode.setAttribute('aria-hidden', 'true');

      const marker = createMapMarker({
        maplibregl,
        mapRuntime: detailHeroMapRuntime,
        element: markerNode,
        point,
      });

      detailHeroMapMarkers.push(marker);
      bounds.extend([point.longitude, point.latitude]);
    }

    if (points.length > 1) {
      fitMapBounds(detailHeroMapRuntime, bounds, {
        profile: 'detailHero',
      });
    } else {
      detailHeroMapRuntime.jumpTo({
        center: [points[0].longitude, points[0].latitude],
        zoom: 10.8,
      });
    }
    detailHeroMapRuntime.resize();

    detailHeroMapStatusController.ready({ message: heroMapStatusText(points) });
  } catch (error) {
    console.error('Failed to load hero detail map.', error);
    detailHeroMapRuntime = destroyMapRuntime(detailHeroMapRuntime);
    detailHeroMapMarkers = clearMapMarkers(detailHeroMapMarkers);
    detailHeroMapShell.hidden = true;
    detailHeroMapStatusController.unavailable();
  }
}

async function renderDetailMap(result = null) {
  const renderVersion = ++detailMapRenderVersion;
  if (!(detailMap instanceof HTMLElement)) {
    return;
  }

  const accessContext = activeAccessContext;
  const points = activeAccessPoints();
  const fullRoutePoints = fullRouteAccessPoints();

  if (!points.length) {
    detailMapStatusController.empty({
      message:
        accessContext.mapMode === 'Selected segment (partial map)'
          ? 'Selected segment map is limited because one or more intermediate landing coordinates still need confirmation.'
          : 'Access map unavailable because endpoint coordinates are incomplete.',
    });
    detailMapRuntime = destroyMapRuntime(detailMapRuntime);
    detailMapMarkers = clearMapMarkers(detailMapMarkers);
    return;
  }

  if (!detailMapRuntime) {
    detailMapStatusController.loading({
      message: accessContext.mapMode === 'Selected segment'
        ? 'Pulling access map tiles for the selected segment. Usually under 5 seconds.'
        : 'Pulling access map tiles for the stored access points. Usually under 5 seconds.',
    });
  }

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl) {
      return;
    }

    if (!detailMapRuntime) {
      const startingPoint = points[0];
      detailMapRuntime = createPaddleMap(maplibregl, {
        container: detailMap,
        center: [startingPoint.longitude, startingPoint.latitude],
        zoom: 10.2,
        minZoom: 5,
        maxZoom: 14,
      });
        await waitForMapReady(detailMapRuntime, {
          timeoutMs: 7000,
          rejectOnError: true,
          rejectOnTimeout: true,
        });
      }

      await waitForMapReady(detailMapRuntime, {
        timeoutMs: 7000,
        rejectOnError: true,
        rejectOnTimeout: true,
      });

      detailMapMarkers = clearMapMarkers(detailMapMarkers);
      // The canonical route line is requested below. Keep the access-point
      // fallback only while that static geometry is loading.
      syncAccessRouteLine(detailMapRuntime, 'detail-route-full-line', 'detail-route-full-line', fullRoutePoints, result, {
        lineWidth: 3,
        lineOpacity: 0.26,
      });
      syncAccessRouteLine(detailMapRuntime, 'detail-route-line', 'detail-route-line', points, result);
      loadCanonicalRiverRouteLine(slug, fullRoutePoints, { stateName: riverContext.state })
        .then((routeLine) => {
          if (detailMapRuntime && routeLine && renderVersion === detailMapRenderVersion) {
            syncRouteGeoJsonLine(detailMapRuntime, 'detail-route-full-line', 'detail-route-full-line', routeLine, result, {
              lineWidth: 6,
              lineOpacity: 0.3,
            });
          }
        })
        .catch((error) => console.warn('Canonical full-route river geometry unavailable.', error));
      loadCanonicalRiverRouteLine(slug, points, { stateName: riverContext.state })
        .then((routeLine) => {
          if (detailMapRuntime && routeLine && renderVersion === detailMapRenderVersion) {
            syncRouteGeoJsonLine(detailMapRuntime, 'detail-route-line', 'detail-route-line', routeLine, result);
          }
        })
        .catch((error) => console.warn('Canonical selected river geometry unavailable.', error));

    const bounds = new maplibregl.LngLatBounds();
    for (const point of fullRoutePoints) {
      bounds.extend([point.longitude, point.latitude]);
    }
    for (const point of points) {
      const markerNode = document.createElement('button');
      markerNode.type = 'button';
      markerNode.className = `detail-access-marker detail-access-marker--${point.kind === 'putIn' ? 'putin' : 'takeout'}`;
      markerNode.innerHTML = `<span>${point.kind === 'putIn' ? 'IN' : 'OUT'}</span>`;
      markerNode.setAttribute('aria-label', `${point.kind === 'putIn' ? 'Put-in' : 'Take-out'}: ${point.name}`);

      const marker = createMapMarker({
        maplibregl,
        mapRuntime: detailMapRuntime,
        element: markerNode,
        point,
        popupHtml: detailMapPopupMarkup(point.kind, point, result),
        popupOptions: {
          offset: 18,
          maxWidth: '280px',
        },
        bindPopup: true,
      });
      detailMapMarkers.push(marker);
      bounds.extend([point.longitude, point.latitude]);
    }

    if (points.length > 1 || fullRoutePoints.length > 1) {
      fitMapBounds(detailMapRuntime, bounds, {
        profile: 'detailAccess',
      });
    } else {
      detailMapRuntime.easeTo({
        center: [points[0].longitude, points[0].latitude],
        zoom: 10.8,
        duration: 350,
      });
    }
    detailMapRuntime.resize();

    if (accessContext.mapMode === 'Selected segment') {
      detailMapStatusController.ready({
        message: 'Selected segment map is using the chosen put-in and take-out. Confirm parking and launch rules on the ground.',
      });
    } else if (accessContext.mapMode === 'Selected segment (partial map)') {
      detailMapStatusController.ready({
        message:
          points.length > 1
            ? 'Selected segment map is partial because some intermediate landings still need confirmed coordinates.'
            : 'Selected segment map is limited because only one chosen landing has confirmed coordinates right now.',
      });
    } else {
      detailMapStatusController.ready({
        message:
          points.length > 1
            ? 'Put-in and take-out markers come from carried-over route data. Confirm launch and parking rules on the ground.'
            : 'Only one carried-over access point is available for this reach right now.',
      });
    }
  } catch (error) {
    console.error('Failed to load detail map.', error);
    detailMapRuntime = destroyMapRuntime(detailMapRuntime);
    detailMapMarkers = clearMapMarkers(detailMapMarkers);
    detailMapStatusController.unavailable();
  }
}

function renderAccessMaps(result = null) {
  pendingAccessMapResult = result;

  if (detailHeroMapRequested) {
    renderDetailHeroMap(result);
  }

  if (detailMapRequested) {
    renderDetailMap(result);
  }
}

function requestDetailHeroMapRender() {
  if (detailHeroMapRequested) {
    renderDetailHeroMap(pendingAccessMapResult);
    return;
  }

  detailHeroMapRequested = true;
  renderDetailHeroMap(pendingAccessMapResult);
}

function requestDetailMapRender() {
  if (detailMapRequested) {
    renderDetailMap(pendingAccessMapResult);
    return;
  }

  detailMapRequested = true;
  renderDetailMap(pendingAccessMapResult);
}

function setupLazyAccessMaps() {
  const lazyMapTargets = [
    { shell: detailHeroMapShell, request: requestDetailHeroMapRender },
    { shell: detailMapShell, request: requestDetailMapRender },
  ].filter(({ shell }) => shell instanceof HTMLElement);

  if (lazyMapTargets.length === 0) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    for (const target of lazyMapTargets) {
      target.request();
    }
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        const target = lazyMapTargets.find((candidate) => candidate.shell === entry.target);
        if (!target) {
          continue;
        }

        target.request();
        observer.unobserve(entry.target);
      }
    },
    {
      rootMargin: '640px 0px',
      threshold: 0.01,
    }
  );

  for (const { shell } of lazyMapTargets) {
    observer.observe(shell);
  }
}

function parseChartSamples(result) {
  return (result.gauge?.recentSamples ?? [])
    .map((sample) => ({
      t: new Date(sample.observedAt).getTime(),
      v: sample.value,
    }))
    .filter((sample) => Number.isFinite(sample.t) && Number.isFinite(sample.v))
    .sort((left, right) => left.t - right.t);
}

function windowedSamples(parsedSamples, hours) {
  if (parsedSamples.length < 2) {
    return parsedSamples;
  }

  const latestTime = parsedSamples[parsedSamples.length - 1].t;
  const cutoff = latestTime - hours * 60 * 60 * 1000;
  const filtered = parsedSamples.filter((sample) => sample.t >= cutoff);
  return filtered.length >= 2 ? filtered : parsedSamples;
}

function chartWindowLabel(hours) {
  if (hours === 24) return '24 hours';
  if (hours === 72) return '72 hours';
  return '7 days';
}

function chartTimeLabel(timestamp, hours) {
  const options =
    hours <= 24
      ? { hour: 'numeric', minute: '2-digit' }
      : hours <= 72
        ? { weekday: 'short', hour: 'numeric' }
        : { month: 'short', day: 'numeric' };
  return new Date(timestamp).toLocaleString([], options).toLowerCase();
}

function updateChartButtonStates() {
  for (const button of chartButtons) {
    if (!(button instanceof HTMLButtonElement)) continue;
    const active = Number(button.dataset.chartWindow) === currentChartWindowHours;
    button.classList.toggle('segmented-control__button--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }
}

function trendNarrative(result, firstValue, lastValue, hours) {
  const delta = lastValue - firstValue;
  const windowLabel = chartWindowLabel(hours);
  const unit = result.gauge?.unit ?? result.river.gaugeSource.unit;
  const magnitude = formatGaugeValue(Math.abs(delta), unit);
  const band = result.gaugeBand;

  if (Math.abs(delta) < (unit === 'ft' ? 0.05 : Math.max(15, lastValue * 0.03))) {
    return `Fairly steady over the last ${windowLabel}.`;
  }

  if (delta > 0) {
    if (band === 'too-low' || band === 'low-shoulder' || band === 'minimum-met') {
      return `Rising ${magnitude} over the last ${windowLabel} and moving toward a better launch window.`;
    }
    if (band === 'too-high' || band === 'high-shoulder') {
      return `Still rising ${magnitude} over the last ${windowLabel}, which pushes this reach farther from the target band.`;
    }
    return `Rising ${magnitude} over the last ${windowLabel} while still sitting in the current target zone.`;
  }

  if (band === 'too-high' || band === 'high-shoulder') {
    return `Dropping ${magnitude} over the last ${windowLabel} and trending back toward the preferred window.`;
  }
  if (band === 'too-low' || band === 'low-shoulder' || band === 'minimum-met') {
    return `Dropping ${magnitude} over the last ${windowLabel}, which increases low-water risk.`;
  }
  return `Dropping ${magnitude} over the last ${windowLabel} while still inside today's workable band.`;
}

function formatDnrHydrographDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function buildDnrHydrographUrl(rawUrl) {
  if (!rawUrl) {
    return '';
  }

  try {
    const url = new URL(rawUrl, window.location.href);
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - 7);
    url.searchParams.set('format', 'png');
    url.searchParams.set('start', formatDnrHydrographDate(start));
    url.searchParams.set('end', formatDnrHydrographDate(end));
    if (!url.searchParams.has('width')) {
      url.searchParams.set('width', '700');
    }
    if (!url.searchParams.has('height')) {
      url.searchParams.set('height', '320');
    }
    return url.toString();
  } catch {
    return rawUrl;
  }
}

function renderGaugeChart(result) {
  const parsedSamples = parseChartSamples(result);
  const activeSamples = windowedSamples(parsedSamples, currentChartWindowHours);
  const sourceDisplay = gaugeSourceDisplay(result);
  const visualBody = root.querySelector('.gauge-visual__body');
  const readoutEl = root.querySelector('.gauge-readout');
  const chartEl = root.querySelector('.gauge-visual__chart');
  const controlsEl = root.querySelector('.gauge-visual__controls');
  const currentPanelEl = root.querySelector('[data-current-gauge-panel]');
  const rangePanelEl = root.querySelector('[data-current-gauge-interpretation-ranges]');
  const rangeListEl = root.querySelector('[data-current-gauge-range-list]');
  const hydrographFigure = root.querySelector('[data-current-gauge-hydrograph-figure]');
  const hydrographImage = root.querySelector('[data-current-gauge-hydrograph-image]');
  const hydrographLink = root.querySelector('[data-current-gauge-hydrograph]');
  const detailLink = root.querySelector('[data-current-gauge-detail]');
  const lineEl = root.querySelector('[data-chart-line]');
  const dotEl = root.querySelector('[data-chart-dot]');
  const rangeEl = root.querySelector('[data-chart-range]');
  const thresholdEl = root.querySelector('[data-chart-threshold]');
  const yMaxEl = root.querySelector('[data-chart-y-max]');
  const yMidEl = root.querySelector('[data-chart-y-mid]');
  const yMinEl = root.querySelector('[data-chart-y-min]');
  const xStartEl = root.querySelector('[data-chart-x-start]');
  const xMidEl = root.querySelector('[data-chart-x-mid]');
  const xEndEl = root.querySelector('[data-chart-x-end]');

  updateChartButtonStates();

  if (
    !(lineEl instanceof SVGPathElement) ||
    !(dotEl instanceof SVGCircleElement) ||
    !(rangeEl instanceof SVGRectElement) ||
    !(thresholdEl instanceof SVGLineElement)
  ) {
    return;
  }

  const hasCurrentOnlyReading =
    result.gauge && !sourceDisplay.supportsRecentSamples && activeSamples.length < 2;
  if (hasCurrentOnlyReading) {
    if (visualBody instanceof HTMLElement) {
      visualBody.classList.add('gauge-visual__body--current-only');
    }
    if (readoutEl instanceof HTMLElement) {
      readoutEl.hidden = true;
    }
    if (chartEl instanceof SVGElement) {
      chartEl.style.display = 'none';
    }
    if (controlsEl instanceof HTMLElement) {
      controlsEl.hidden = true;
    }
    if (currentPanelEl instanceof HTMLElement) {
      currentPanelEl.hidden = false;
    }
    setText('gauge-visual-title', `Current ${sourceDisplay.shortLabel} level`);
    setText('chart-caption', `${sourceDisplay.label} publishes the current level and official hydrograph.`);
    setText('current-gauge-provider', result.gauge.gaugeSource || sourceDisplay.label);
    setText('current-gauge-value', gaugePrimaryValue(result));
    setText(
      'current-gauge-observed',
      result.gauge.observedAt ? `Observed ${new Date(result.gauge.observedAt).toLocaleString()}` : 'Observed time unavailable'
    );
    setText(
      'current-gauge-interpretation',
      sourceDisplay.interpretationLabel
        ? result.gauge.gaugeInterpretation || 'Not published'
        : 'Not provided by this source'
    );
    setText('current-gauge-band', result.gaugeBandLabel || 'Unavailable');
    renderGaugeInterpretationRanges(rangePanelEl, rangeListEl, result.gauge.gaugeInterpretationRanges);
    const hydrographUrl = sourceDisplay.supportsHydrograph
      ? buildDnrHydrographUrl(result.river?.gaugeSource?.hydrographUrl || '')
      : result.river?.gaugeSource?.hydrographUrl || '';
    if (hydrographFigure instanceof HTMLElement && hydrographImage instanceof HTMLImageElement) {
      if (hydrographUrl) {
        hydrographImage.src = hydrographUrl;
        hydrographFigure.hidden = false;
      } else {
        hydrographImage.removeAttribute('src');
        hydrographFigure.hidden = true;
      }
    }
    if (hydrographLink instanceof HTMLAnchorElement) {
      if (hydrographUrl) {
        hydrographLink.href = hydrographUrl;
        hydrographLink.hidden = false;
      } else {
        hydrographLink.hidden = true;
        hydrographLink.removeAttribute('href');
      }
    }
    if (detailLink instanceof HTMLAnchorElement) {
      const detailUrl = result.river?.gaugeSource?.detailUrl || '';
      if (detailUrl) {
        detailLink.href = detailUrl;
        detailLink.hidden = false;
      } else {
        detailLink.hidden = true;
        detailLink.removeAttribute('href');
      }
    }
    return;
  }

  if (chartEl instanceof SVGElement) {
    chartEl.style.display = '';
  }
  if (visualBody instanceof HTMLElement) {
    visualBody.classList.remove('gauge-visual__body--current-only');
  }
  if (readoutEl instanceof HTMLElement) {
    readoutEl.hidden = false;
  }
  if (controlsEl instanceof HTMLElement) {
    controlsEl.hidden = false;
  }
  if (currentPanelEl instanceof HTMLElement) {
    currentPanelEl.hidden = true;
  }
  if (hydrographFigure instanceof HTMLElement) {
    hydrographFigure.hidden = true;
  }
  if (hydrographImage instanceof HTMLImageElement) {
    hydrographImage.removeAttribute('src');
  }
  if (hydrographLink instanceof HTMLAnchorElement) {
    hydrographLink.hidden = true;
    hydrographLink.removeAttribute('href');
  }
  if (detailLink instanceof HTMLAnchorElement) {
    detailLink.hidden = true;
    detailLink.removeAttribute('href');
  }
  setText('gauge-visual-title', 'Recent trend');

  if (activeSamples.length < 2) {
    const hasGauge = Boolean(result.gauge);
    const sourceLabel = result.gauge?.gaugeSource || 'this gauge source';
    setText(
      'chart-caption',
      hasGauge
        ? `Recent chart samples are not available from ${sourceLabel}.`
        : 'Preferred range not available yet.'
    );
    setText(
      'chart-trend-note',
      hasGauge
        ? 'Trend direction is unavailable because this source did not provide a recent sample series.'
        : 'Trend direction is unavailable because the recent sample window is too thin.'
    );
    rangeEl.setAttribute('visibility', 'hidden');
    thresholdEl.setAttribute('visibility', 'hidden');
    lineEl.setAttribute('visibility', 'hidden');
    dotEl.setAttribute('visibility', 'hidden');
    for (const labelEl of [yMaxEl, yMidEl, yMinEl, xStartEl, xMidEl, xEndEl]) {
      if (labelEl instanceof SVGTextElement) {
        labelEl.textContent = '--';
      }
    }
    return;
  }

  const xLeft = 58;
  const xRight = 394;
  const yTop = 22;
  const yBottom = 176;
  lineEl.setAttribute('visibility', 'visible');
  dotEl.setAttribute('visibility', 'visible');

  const thresholdValues = [
    result.river.profile.idealMin,
    result.river.profile.idealMax,
    result.river.profile.tooLow,
    result.river.profile.tooHigh,
  ].filter((value) => typeof value === 'number' && Number.isFinite(value));

  let minValue = Math.min(
    ...activeSamples.map((sample) => sample.v),
    ...(thresholdValues.length ? thresholdValues : [Infinity])
  );
  let maxValue = Math.max(
    ...activeSamples.map((sample) => sample.v),
    ...(thresholdValues.length ? thresholdValues : [-Infinity])
  );

  if (!Number.isFinite(minValue) || !Number.isFinite(maxValue)) {
    setText('chart-caption', 'Preferred range not available right now.');
    setText('chart-trend-note', 'Trend direction is unavailable because the current gauge history could not be read.');
    return;
  }

  if (Math.abs(maxValue - minValue) < 0.0001) {
    const pad = Math.max(0.5, Math.abs(maxValue) * 0.04);
    minValue -= pad;
    maxValue += pad;
  } else {
    const pad = (maxValue - minValue) * 0.12;
    minValue -= pad;
    maxValue += pad;
  }

  const t0 = activeSamples[0].t;
  const t1 = activeSamples[activeSamples.length - 1].t;

  const x = (timestamp) => xLeft + ((timestamp - t0) / Math.max(t1 - t0, 1)) * (xRight - xLeft);
  const y = (value) => yBottom - ((value - minValue) / Math.max(maxValue - minValue, 0.0001)) * (yBottom - yTop);

  const d = activeSamples
    .map((sample, index) => `${index === 0 ? 'M' : 'L'}${x(sample.t).toFixed(2)} ${y(sample.v).toFixed(2)}`)
    .join(' ');

  lineEl.setAttribute('d', d);
  dotEl.setAttribute('cx', x(activeSamples[activeSamples.length - 1].t).toFixed(2));
  dotEl.setAttribute('cy', y(activeSamples[activeSamples.length - 1].v).toFixed(2));

  const axisFormat = (value) =>
    result.gauge?.unit === 'ft'
      ? value.toFixed(2).replace(/\.00$/, '')
      : Math.round(value).toLocaleString('en-US');

  if (yMaxEl instanceof SVGTextElement) yMaxEl.textContent = axisFormat(maxValue);
  if (yMidEl instanceof SVGTextElement) yMidEl.textContent = axisFormat((maxValue + minValue) / 2);
  if (yMinEl instanceof SVGTextElement) yMinEl.textContent = axisFormat(minValue);

  if (xStartEl instanceof SVGTextElement) xStartEl.textContent = chartTimeLabel(t0, currentChartWindowHours);
  if (xMidEl instanceof SVGTextElement) {
    xMidEl.textContent = chartTimeLabel(t0 + (t1 - t0) / 2, currentChartWindowHours);
  }
  if (xEndEl instanceof SVGTextElement) xEndEl.textContent = chartTimeLabel(t1, currentChartWindowHours);

  setText(
    'chart-trend-note',
    trendNarrative(result, activeSamples[0].v, activeSamples[activeSamples.length - 1].v, currentChartWindowHours)
  );

  if (
    result.river.profile.thresholdModel === 'two-sided' &&
    typeof result.river.profile.idealMin === 'number' &&
    typeof result.river.profile.idealMax === 'number'
  ) {
    const topValue = Math.max(result.river.profile.idealMin, result.river.profile.idealMax);
    const bottomValue = Math.min(result.river.profile.idealMin, result.river.profile.idealMax);
    const topY = Math.max(yTop, Math.min(yBottom, y(topValue)));
    const bottomY = Math.max(yTop, Math.min(yBottom, y(bottomValue)));

    rangeEl.setAttribute('x', String(xLeft));
    rangeEl.setAttribute('y', String(topY));
    rangeEl.setAttribute('width', String(xRight - xLeft));
    rangeEl.setAttribute('height', String(Math.max(1, bottomY - topY)));
    rangeEl.setAttribute('visibility', 'visible');
    thresholdEl.setAttribute('visibility', 'hidden');
    setText(
      'chart-caption',
      `Preferred range: ${formatGaugeValue(result.river.profile.idealMin, result.gauge.unit)}-${formatGaugeValue(result.river.profile.idealMax, result.gauge.unit)}`
    );
    return;
  }

  if (typeof result.river.profile.tooLow === 'number') {
    const thresholdY = Math.max(yTop, Math.min(yBottom, y(result.river.profile.tooLow)));
    thresholdEl.setAttribute('x1', String(xLeft));
    thresholdEl.setAttribute('x2', String(xRight));
    thresholdEl.setAttribute('y1', String(thresholdY));
    thresholdEl.setAttribute('y2', String(thresholdY));
    thresholdEl.setAttribute('visibility', 'visible');
    rangeEl.setAttribute('visibility', 'hidden');
    setText(
      'chart-caption',
      `Low-water floor: ${formatGaugeValue(result.river.profile.tooLow, result.gauge.unit)}`
    );
    return;
  }

  rangeEl.setAttribute('visibility', 'hidden');
  thresholdEl.setAttribute('visibility', 'hidden');
  setText('chart-caption', 'Threshold overlay not available.');
}

function renderGaugeInterpretationRanges(panelEl, listEl, ranges) {
  if (!(panelEl instanceof HTMLElement) || !(listEl instanceof HTMLUListElement)) {
    return;
  }

  listEl.replaceChildren();
  const visibleRanges = Array.isArray(ranges) ? ranges.filter(Boolean) : [];
  if (!visibleRanges.length) {
    panelEl.hidden = true;
    return;
  }

  for (const range of visibleRanges) {
    const item = document.createElement('li');
    item.textContent = range;
    listEl.append(item);
  }
  panelEl.hidden = false;
}

function bindChartControls() {
  for (const button of chartButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.chartBound === 'true') continue;
    button.dataset.chartBound = 'true';
    button.addEventListener('click', () => {
      currentChartWindowHours = Number(button.dataset.chartWindow) || 72;
      updateChartButtonStates();
      if (latestResult) {
        renderGaugeChart(latestResult);
      }
    });
  }
}

function renderWeatherVisual(weather) {
  if (!weather) {
    setText('weather-condition', 'No current weather data');
    setText('weather-air-temp-summary', 'Air: No reading');
    setText('weather-water-temp-detail', 'Water: No reading');
    setText('weather-wind-summary', 'No reading');
    setText('weather-gusts-detail', 'Gusts: No reading');
    setText('weather-rain-risk', 'No reading');
    setText('weather-rain-summary', 'Recent rain: No reading');
    setText('weather-hourly-note', "Hourly forecast isn't available right now.");
    setText('weather-window', 'Best short-route window unavailable right now.');
    setFieldGroupHidden('temperature', true);
    setFieldGroupHidden('weather-condition', true);
    setFieldGroupHidden('wind', true);
    setFieldGroupHidden('weather-wind', true);
    setFieldGroupHidden('rain', true);
    setFieldGroupHidden('weather-rain', true);
    renderWeatherDayStrips(null);
    renderHourlyWeather(null);
    return;
  }

  setText('weather-condition', weatherConditionLabel(weather.conditionLabel ?? weather.weatherCode));
  setText('weather-air-temp-summary', temperatureSummary(weather));
  setText('weather-water-temp-detail', waterTemperatureSummary(latestResult?.gauge ?? null));
  setText('weather-wind-summary', windSummary(weather));
  setText('weather-gusts-detail', gustSummary(weather));
  setText('weather-rain-risk', rainTimingLabel(weather));
  setText('weather-rain-summary', recentRainSummary(weather));
  setText('weather-hourly-note', weatherHourlyNote(weather));
  setText('weather-window', bestShortRouteWindow(weather));
  setFieldGroupHidden(
    'temperature',
    weather.temperatureF == null && latestResult?.gauge?.waterTempF == null
  );
  setFieldGroupHidden(
    'weather-condition',
    weather.temperatureF == null && latestResult?.gauge?.waterTempF == null
  );
  setFieldGroupHidden('wind', weather.windMph == null && weather.gustMph == null);
  setFieldGroupHidden('weather-wind', weather.windMph == null && weather.gustMph == null);
  setFieldGroupHidden(
    'rain',
    weather.next12hPrecipProbabilityMax == null &&
      weather.recentRain24hIn == null &&
      weather.recentRain72hIn == null
  );
  setFieldGroupHidden(
    'weather-rain',
    weather.next12hPrecipProbabilityMax == null &&
      weather.recentRain24hIn == null &&
      weather.recentRain72hIn == null
  );
  renderWeatherDayStrips(weather);
  renderHourlyWeather(weather);
}

function syncTripPackLinks() {
  const start = activeAccessContext.putIn;
  const end = activeAccessContext.takeOut;
  if (!start || !end) return;

  const apiBase = window.location.origin;
  const gpxUrl = new URL(`/api/rivers/${encodeURIComponent(slug)}/trip.gpx`, apiBase);
  if (start.id) gpxUrl.searchParams.set('putin', start.id);
  if (end.id) gpxUrl.searchParams.set('takeout', end.id);
  const launch = new Date(Date.now() + 60 * 60 * 1000);
  launch.setMinutes(0, 0, 0);
  const distance = Number.parseFloat(riverContext.distanceLabel);
  const times = (riverContext.paddleTimeLabel.match(/\d+(?:\.\d+)?/g) || []).map(Number);
  const ratio = Number.isFinite(distance) && distance > 0 && Number.isFinite(Number.parseFloat(activeAccessContext.distanceLabel))
    ? Math.min(1, Math.max(0, Number.parseFloat(activeAccessContext.distanceLabel) / distance))
    : 1;
  const expectedMinutes = Math.max(60, Math.round((times[1] || times[0] || 4) * ratio * 60) + 60);
  const expected = new Date(launch.getTime() + expectedMinutes * 60 * 1000);
  const icsUrl = new URL(`/api/rivers/${encodeURIComponent(slug)}/trip.ics`, apiBase);
  if (start.id) icsUrl.searchParams.set('putin', start.id);
  if (end.id) icsUrl.searchParams.set('takeout', end.id);
  icsUrl.searchParams.set('start', launch.toISOString());
  icsUrl.searchParams.set('end', expected.toISOString());
  if (tripGpxLink instanceof HTMLAnchorElement) tripGpxLink.href = gpxUrl.toString();
  if (tripIcsLink instanceof HTMLAnchorElement) tripIcsLink.href = icsUrl.toString();
}

function bindTripPackActions() {
  syncTripPackLinks();
  if (tripGpxLink instanceof HTMLAnchorElement) {
    tripGpxLink.addEventListener('click', async (event) => {
      event.preventDefault();
      setElementText(tripStatus, 'Checking for canonical route geometry…');
      try {
        const response = await fetch(tripGpxLink.href, { method: 'HEAD' });
        if (!response.ok) {
          setElementText(tripStatus, 'GPX is not available for this route yet.');
          return;
        }
        window.location.href = tripGpxLink.href;
      } catch {
        setElementText(tripStatus, 'GPX export is unavailable while offline.');
      }
    });
  }
  if (!(tripShareButton instanceof HTMLButtonElement)) return;
  tripShareButton.addEventListener('click', async () => {
    const start = activeAccessContext.putIn;
    const end = activeAccessContext.takeOut;
    const launch = new Date(Date.now() + 60 * 60 * 1000);
    launch.setMinutes(0, 0, 0);
    const text = buildFloatPlanMessage({
      routeSlug: slug,
      riverName: riverContext.name,
      reach: riverContext.reach,
      routeUrl: routeShareContext.url,
      putIn: { name: start?.name ?? 'Check source', latitude: Number(start?.latitude) || 0, longitude: Number(start?.longitude) || 0 },
      takeOut: { name: end?.name ?? 'Check source', latitude: Number(end?.latitude) || 0, longitude: Number(end?.longitude) || 0 },
      distanceMiles: Number.parseFloat(activeAccessContext.distanceLabel) || null,
      launchAt: launch,
      expectedTakeOutAt: new Date(launch.getTime() + 4 * 60 * 60 * 1000),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    try {
      if (navigator.share) {
        await navigator.share({ title: `Float plan - ${riverContext.name}`, text });
      } else {
        await navigator.clipboard.writeText(text);
        setElementText(tripStatus, 'Float plan copied to your clipboard.');
      }
      trackEvent('Share float plan', plannerAnalyticsProperties());
    } catch (error) {
      if (error?.name !== 'AbortError') setElementText(tripStatus, 'Could not open sharing. Copy the route link instead.');
    }
  });
}

function renderDetailResult(result) {
  latestResult = result;
  setDetailLoadingState(false);

  if (isPlanningRoute || result?.river?.scoreEligibility === 'planning') {
    renderPlanningRoute(result);
    return;
  }

  const ratingKey = ratingToneKey(result.rating);
  const decision = decisionLabel(result);

  root.classList.remove('river-detail--great', 'river-detail--good', 'river-detail--marginal', 'river-detail--no-go');
  root.classList.add(`river-detail--${ratingKey}`);

  setText('score', String(result.score));
  setText('rating', ratingLabel(result));
  renderDecisionSummary(result);
  setText('decision-line', decisionStatement(result));
  updateShareActions(result);
  updateAlertCtaCopy(result);
  renderScoreConditions(result);
  const orb = root.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    orb.classList.remove('score-orb--great', 'score-orb--good', 'score-orb--marginal', 'score-orb--no-go');
    orb.classList.add(`score-orb--${ratingKey}`);
  }

  const decisionPill = setText('decision', decision);
  decorateDecision(decisionPill, result);

  const confidence = setText('confidence', confidenceDisplayLabel(result.confidence.label));
  if (confidence instanceof HTMLElement) {
    confidence.classList.remove('confidence-pill--high', 'confidence-pill--medium', 'confidence-pill--low');
    confidence.classList.add(`confidence-pill--${result.confidence.label.toLowerCase()}`);
  }

  const effectiveLiveData = buildRiverReadinessViewModel(result).effectiveLiveData;
  const sourceDisplay = gaugeSourceDisplay(result);
  const dataStatus = setText('data-status', `Reads ${effectiveLiveData.overall}`);
  if (dataStatus instanceof HTMLElement) {
    dataStatus.classList.remove('data-status-pill--live', 'data-status-pill--degraded', 'data-status-pill--offline');
    dataStatus.classList.add(`data-status-pill--${effectiveLiveData.overall}`);
  }

  const liveWarning = liveWarningLabel(effectiveLiveData);
  const liveWarningPill = setText('live-warning', liveWarning?.short || '');
  if (liveWarningPill instanceof HTMLElement) {
    liveWarningPill.hidden = !liveWarning;
    liveWarningPill.title = liveWarning?.detail || '';
    if (liveWarning?.detail) {
      liveWarningPill.dataset.tooltip = liveWarning.detail;
      liveWarningPill.tabIndex = 0;
    } else {
      delete liveWarningPill.dataset.tooltip;
      liveWarningPill.tabIndex = -1;
    }
    liveWarningPill.setAttribute('aria-label', liveWarning?.detail || '');
  }
  if (liveWarningWrap instanceof HTMLElement) {
    liveWarningWrap.hidden = !liveWarning;
  }

  setText('flow-band', result.gaugeBandLabel);
  setText('primary-gauge-label', sourceDisplay.primaryMetricLabel || 'Current gauge');
  setText('secondary-gauge-label', sourceDisplay.secondaryMetricLabel || 'Secondary gauge metric');
  setText('top-gauge-source', sourceDisplay.shortLabel || sourceDisplay.label || 'Gauge source');
  const gaugeInterpretation = result.gauge?.gaugeInterpretation?.trim();
  const topGaugeInterpretation = setText(
    'top-gauge-interpretation',
    sourceDisplay.interpretationLabel && gaugeInterpretation
      ? `${sourceDisplay.interpretationLabel}: ${gaugeInterpretation}`
      : '',
  );
  if (topGaugeInterpretation instanceof HTMLElement) {
    topGaugeInterpretation.hidden = !(sourceDisplay.interpretationLabel && gaugeInterpretation);
  }
  setText('gauge-now', gaugePrimaryValue(result));
  setText('discharge-now', gaugeSecondaryValue(result));
  setText(
    'observed-at',
    result.gauge?.observedAt ? new Date(result.gauge.observedAt).toLocaleString() : 'No reading'
  );
  setText(
    'generated-at',
    result.generatedAt ? new Date(result.generatedAt).toLocaleString() : 'No reading'
  );
  setText('gauge-freshness', effectiveLiveData.gauge.detail);
  setText(
    'trend',
    result.gauge?.trend
      ? `${String(result.gauge.trend).slice(0, 1).toUpperCase()}${String(result.gauge.trend).slice(1)}`
      : 'No reading'
  );
  setText('trend-summary', trendSummaryValue(result.gauge));
  setText(
    'flow-change-24h',
    result.gauge?.delta24h !== null && result.gauge
      ? `${result.gauge.delta24h >= 0 ? '+' : ''}${formatGaugeMetric(result.gauge.delta24h, result.gauge.unit)}`
      : 'No reading'
  );
  setText('recent-rain-24h', formatRainTotal(result.weather?.recentRain24hIn, 'No reading'));
  setText('recent-rain-72h', formatRainTotal(result.weather?.recentRain72hIn, 'No reading'));
  setText('weather-freshness', effectiveLiveData.weather.detail);
  setText('weather-air-temp', result.weather?.temperatureF != null ? `${Math.round(result.weather.temperatureF)}°F` : 'No reading');
  setText('weather-water-temp', result.gauge?.waterTempF != null ? `${Math.round(result.gauge.waterTempF)}°F` : 'No reading');
  setText('weather-wind', result.weather?.windMph != null ? `${Math.round(result.weather.windMph)} mph` : 'No reading');
  setText('weather-gusts', result.weather?.gustMph != null ? `${Math.round(result.weather.gustMph)} mph` : 'No reading');
  setText('gauge-source', result.gauge?.gaugeSource ?? gaugeSourceDisplay(result).label ?? 'No reading');
  setText('weather-source', result.weather?.weatherSource ?? 'No reading');
  setText('rainfall-source', result.weather?.rainfallSource ?? 'No reading');
  setFieldGroupHidden('level', false);
  setFieldGroupHidden('trend', false);

  renderGaugeBandVisuals(result);
  renderDetailBanner(result);
  renderLaunchReadiness(result);
  renderGaugeChart(result);
  renderWeatherVisual(result.weather);
  renderAccessMaps(result);
  renderFactors(result.factors);
  renderChecklist(result.checklist);
  renderOutlooks(result.outlooks);
  renderConfidenceDetail(result.confidence);
  renderScoreBreakdown(result);
}

function hydrateDetailFromCache() {
  const cached = readCachedPayload(detailCacheKey);
  const result = cached?.payload?.result;
  if (!result) {
    return false;
  }

  renderDetailResult(result);
  hasLoadedDetailOnce = true;
  lastDetailSuccessAt = cached.fetchedAt;
  setDetailFetchBannerState(
    shouldShowStaleDetailBanner(cached.fetchedAt) ? 'stale' : 'hidden',
    `${dataAgeLabel(cached.fetchedAt)}. Refreshing live sources now.`
  );

  if (detailRefreshNote instanceof HTMLElement) {
    detailRefreshNote.textContent = `${dataAgeLabel(cached.fetchedAt)}. Refreshing live sources now.`;
  }

  return true;
}

function hydrateHistoryFromCache() {
  renderHistory(null);
  return false;
}

function renderHistory(history) {
  if (!(historyBars instanceof HTMLElement)) {
    return;
  }

  if (!(historyPanel instanceof HTMLElement)) {
    return;
  }

  historyPanel.hidden = true;
  historyBars.innerHTML = '';
}

function updateDetailMapToggle() {
  if (!(detailMapShell instanceof HTMLElement) || !(detailMapToggle instanceof HTMLButtonElement)) {
    return;
  }

  const compact = phoneBreakpoint.matches;
  if (!compact) {
    detailMapCollapsed = false;
  }

  detailMapToggle.hidden = !compact;
  detailMapShell.classList.toggle('river-launch-plan__map-shell--collapsed', compact && detailMapCollapsed);
  detailMapToggle.setAttribute('aria-expanded', compact && detailMapCollapsed ? 'false' : 'true');
  detailMapToggle.textContent = compact && detailMapCollapsed ? 'Show map' : 'Hide map';

  if (!(compact && detailMapCollapsed) && detailMapRuntime) {
    window.setTimeout(() => {
      detailMapRuntime?.resize();
    }, 30);
  }
}

async function loadHistory() {
  const { requestId, controller } = historyRequestGuard.begin();

  try {
    const payload = await getBrowserApiClient().getRiverHistory(slug, {
      days: 7,
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!historyRequestGuard.isCurrent(requestId)) {
      return;
    }
    writeCachedPayload(historyCacheKey, payload);
    renderHistory(payload?.result ?? null);
  } catch (error) {
    if (isAbortError(error)) {
      return;
    }

    if (!historyRequestGuard.isCurrent(requestId)) {
      return;
    }
    console.error('Failed to load river history.', error);
    if (!readCachedPayload(historyCacheKey)) {
      renderHistory(null);
    }
  } finally {
    historyRequestGuard.finish(controller);
  }
}

async function loadDetail({ silent = false } = {}) {
  const { requestId, controller } = detailRequestGuard.begin();

  if (!silent) {
    setDetailRefreshState('loading');
  }

  try {
    const payload = await getBrowserApiClient().getRiverDetail(slug, {
      cache: 'no-store',
      signal: controller.signal,
    });
    const result = payload?.result;
    if (!result) return;
    if (!detailRequestGuard.isCurrent(requestId)) {
      return;
    }
    writeCachedPayload(detailCacheKey, payload);
    renderDetailResult(result);
    lastDetailSuccessAt = Date.now();
    hasLoadedDetailOnce = true;
    setDetailFetchBannerState('hidden');
    setDetailRefreshState('ready');
  } catch (error) {
    if (isAbortError(error)) {
      return;
    }

    if (!detailRequestGuard.isCurrent(requestId)) {
      return;
    }
    console.error('Failed to load river score on detail page.', error);
    setDetailLoadingState(false);
    if (hasLoadedDetailOnce) {
      const ageLabel = dataAgeLabel(lastDetailSuccessAt);
      setDetailFetchBannerState('stale', `${ageLabel}. Showing last known values. Retry to check live data again.`);
      setDetailRefreshState(
        'error',
        `${ageLabel}. Live refresh failed.`
      );
      if (latestResult?.rating && typeof latestResult?.score === 'number') {
        setText('decision-line', `Last score: ${latestResult.score} - ${latestResult.rating}. Check the source before you go.`);
      }
      return;
    }

    setDetailFetchBannerState(
      'initial',
      "Live data isn't available right now. Try again, then check the source directly before you go."
    );
    setDetailRefreshState('error', 'Last live refresh failed. Retry now.');

    setText(
      'explanation',
      "Live reads aren't available right now. Check the source links below before you go."
    );
    setText('decision-line', 'Live data is down right now, so check the source directly.');

    const decisionPill = setText('decision', 'Check sources');
    if (decisionPill instanceof HTMLElement) {
      decisionPill.classList.add('decision-pill--skip');
    }

    const dataStatus = setText('data-status', 'Live reads unavailable');
    if (dataStatus instanceof HTMLElement) {
      dataStatus.classList.add('data-status-pill--offline');
    }
    const liveWarningPill = setText('live-warning', 'Warning: live feed issue');
    if (liveWarningPill instanceof HTMLElement) {
      liveWarningPill.hidden = false;
      liveWarningPill.title = 'Direct live reads are unavailable for this route right now.';
      liveWarningPill.dataset.tooltip = 'Direct live reads are unavailable for this route right now.';
      liveWarningPill.tabIndex = 0;
      liveWarningPill.setAttribute(
        'aria-label',
        'Direct live reads are unavailable for this route right now.'
      );
    }
    if (liveWarningWrap instanceof HTMLElement) {
      liveWarningWrap.hidden = false;
    }

    setText('flow-band', 'No reading');
    setText('top-gauge-source', 'No live source');
    const unavailableGaugeInterpretation = setText('top-gauge-interpretation', '');
    if (unavailableGaugeInterpretation instanceof HTMLElement) {
      unavailableGaugeInterpretation.hidden = true;
    }
    setText('gauge-now', 'No reading');
    setText('discharge-now', 'No reading');
    setText('observed-at', 'No reading');
    setText('generated-at', 'No reading');
    setText('gauge-freshness', 'No live gauge reading is available.');
    setText('trend', 'No reading');
    setText('trend-summary', 'No reading');
    setText('flow-change-24h', 'No reading');
    setText('recent-rain-24h', 'No reading');
    setText('recent-rain-72h', 'No reading');
    setText('weather-freshness', 'No live weather reading is available.');
    setText('chart-caption', 'Gauge chart unavailable because the live read could not be loaded.');
    setText('chart-trend-note', 'Trend direction is unavailable because the live chart data could not be loaded.');
    setText('weather-condition', 'No current weather data');
    setText('weather-air-temp', 'No reading');
    setText('weather-air-temp-summary', 'Air: No reading');
    setText('weather-water-temp', 'No reading');
    setText('weather-water-temp-detail', 'Water: No reading');
    setText('weather-wind', 'No reading');
    setText('weather-wind-summary', 'No reading');
    setText('weather-gusts', 'No reading');
    setText('weather-gusts-detail', 'Gusts: No reading');
    setText('weather-rain-risk', 'No reading');
    setText('weather-rain-summary', 'Recent rain: No reading');
    setText('weather-forecast', 'No reading');
    setText('weather-hourly-note', "Hourly forecast isn't available right now.");
    setText('weather-window', 'Best short-route window unavailable right now.');
    setText('gauge-source', 'No reading');
    setText('weather-source', 'No reading');
    setText('rainfall-source', 'No reading');
    setFieldGroupHidden('temperature', true);
    setFieldGroupHidden('weather-condition', true);
    setFieldGroupHidden('wind', true);
    setFieldGroupHidden('weather-wind', true);
    setFieldGroupHidden('rain', true);
    setFieldGroupHidden('weather-rain', true);
    renderHourlyWeather(null);
    renderHistory(null);
    if (detailStatusBanner instanceof HTMLElement) {
      renderDetailBanner({
        liveData: {
          overall: 'offline',
          summary: 'Direct gauge data is unavailable, so this river needs a direct source check.',
          gauge: {
            state: 'unavailable',
            detail: 'No live gauge reading is available.',
          },
          weather: {
            state: 'unavailable',
            detail: 'No live weather reading is available.',
          },
        },
        checklist: [
          { status: 'skip', label: 'Gauge window', detail: "We couldn't load the direct gauge." },
          { status: 'watch', label: 'Skill and access', detail: 'Use the source links and access notes below.' },
        ],
        rating: 'No-go',
        score: 0,
        gaugeBandLabel: 'Unavailable',
        gauge: null,
        weather: null,
        river: {
          profile: {
            difficulty: 'moderate',
          },
        },
      });
    }
    if (readinessGrid instanceof HTMLElement) {
      renderLaunchReadiness({
        liveData: {
          overall: 'offline',
          summary: 'Direct gauge data is unavailable, so this river needs a direct source check.',
        },
        checklist: [
          { status: 'skip', label: 'Gauge window', detail: "We couldn't load the direct gauge." },
          { status: 'watch', label: 'Trend check', detail: 'Trend direction is unavailable because the gauge is offline.' },
          { status: 'watch', label: 'Weather window', detail: 'Weather coverage should be verified separately.' },
          { status: 'watch', label: 'Skill and access', detail: 'Use the source links and access notes below.' },
        ],
        rating: 'No-go',
        score: 0,
        gaugeBandLabel: 'Unavailable',
        gauge: null,
        weather: null,
        river: {
          profile: {
            difficulty: 'moderate',
          },
        },
      });
    }
    renderAccessMaps(null);
    renderChecklist([
      {
        status: 'skip',
        label: 'Live data',
        detail: "We couldn't load the direct gauge, so treat this river as unconfirmed right now.",
      },
      {
        status: 'watch',
        label: 'Access',
        detail: 'Use the source links and map links below to confirm put-in and take-out details.',
      },
    ]);
    renderOutlooks([
      {
        label: 'Tomorrow',
        availability: 'withheld',
        score: null,
        rating: null,
        confidence: null,
        explanation: 'Tomorrow needs live river data before we show it.',
      },
      {
        label: 'Weekend',
        availability: 'withheld',
        score: null,
        rating: null,
        confidence: null,
        explanation: 'Weekend needs live river data before we show it.',
      },
    ]);
    renderConfidenceDetail({
      label: 'Low',
      reasons: [],
      warnings: ['Data confidence is unavailable because live data could not be loaded.'],
    });
  } finally {
    detailRequestGuard.finish(controller);
  }
}

function bindAlertForm() {
  if (!(alertForm instanceof HTMLFormElement) || !(alertEmailInput instanceof HTMLInputElement)) {
    return;
  }

  alertForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitter = event.submitter;
    const threshold =
      submitter instanceof HTMLButtonElement ? submitter.dataset.alertSubmit : null;

    if (threshold !== 'good' && threshold !== 'strong') {
      setAlertStatus('Choose which alert you want first.', 'error');
      return;
    }

    const email = alertEmailInput.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAlertStatus('Enter a valid email address.', 'error');
      alertEmailInput.focus();
      return;
    }

    for (const button of alertSubmitButtons) {
      if (button instanceof HTMLButtonElement) {
        button.disabled = true;
      }
    }
    setAlertStatus(`Saving your ${threshold === 'good' ? 'Good' : 'Strong'} alert...`);

    try {
      const payload = await getBrowserApiClient().createRiverAlert({
        email,
        riverSlug: slug,
        threshold,
        company:
          alertCompanyInput instanceof HTMLInputElement ? alertCompanyInput.value.trim() : '',
      });

      setAlertStatus(
        payload?.duplicate
          ? `You're already set for ${threshold === 'good' ? 'Good' : 'Strong'} alerts on this route.`
          : `We'll email you when this route reaches ${threshold === 'good' ? 'Good' : 'Strong'}. Every alert email includes an unsubscribe link.`,
        'success'
      );
      setRouteActionStatus(
        payload?.duplicate
          ? `You already have a ${threshold === 'good' ? 'Good' : 'Strong'} alert on this route.`
          : `Saved a ${threshold === 'good' ? 'Good' : 'Strong'} alert for this route.`,
        'success'
      );
      trackEvent('Submit route alert', routeAnalyticsProperties({
        label: payload?.duplicate ? 'duplicate' : 'created',
        threshold,
      }));
    } catch (error) {
      console.error('Failed to create river alert.', error);
      setAlertStatus(
        error instanceof Error ? error.message : 'Could not save this alert right now.',
        'error'
      );
      setRouteActionStatus(
        error instanceof Error ? error.message : 'Could not save this alert right now.',
        'error'
      );
    } finally {
      for (const button of alertSubmitButtons) {
        if (button instanceof HTMLButtonElement) {
          button.disabled = false;
        }
      }
    }
  });
}

function bindRouteActions() {
  if (alertDialog instanceof HTMLDialogElement) {
    for (const alertOpenButton of alertOpenButtons) {
      if (!(alertOpenButton instanceof HTMLButtonElement)) {
        continue;
      }

      alertOpenButton.addEventListener('click', () => {
        closeRouteActionMenus();
        if (!alertDialog.open) {
          alertDialog.showModal();
        }
        if (alertEmailInput instanceof HTMLInputElement) {
          window.setTimeout(() => {
            alertEmailInput.focus();
          }, 20);
        }
      });
    }

    alertDialog.addEventListener('click', (event) => {
      if (event.target === alertDialog) {
        alertDialog.close();
      }
    });
  }

  updateShareActions();

  if (shareNativeButton instanceof HTMLButtonElement) {
    shareNativeButton.addEventListener('click', async () => {
      try {
        await navigator.share(nativeSharePayload());
        setRouteActionStatus('Condition shared.', 'success');
        closeRouteActionMenus();
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.error('Failed to share route condition.', error);
        setRouteActionStatus("Couldn't open sharing right now. Copy the condition instead.", 'error');
      }
    });
  }

  if (shareCopyButton instanceof HTMLButtonElement) {
    shareCopyButton.addEventListener('click', async () => {
      const shareText = buildConditionShareText();
      try {
        const copied = await copyTextToClipboard(shareText);
        if (!copied) {
          throw new Error('Clipboard copy was not accepted.');
        }
        setRouteActionStatus('Condition summary copied.', 'success');
        closeRouteActionMenus();
      } catch (error) {
        console.error('Failed to copy route condition.', error);
        showManualShareCopy(shareText);
        setRouteActionStatus('Copy blocked. Select the summary in the share menu.', 'error');
      }
    });
  }

  if (routeActionMenus.length > 0) {
    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Node) || root.contains(target) === false) {
        closeRouteActionMenus();
        return;
      }

      const clickedInsideMenu = routeActionMenus.some((menu) => menu.contains(target));
      if (!clickedInsideMenu) {
        closeRouteActionMenus();
      }
    });

    for (const menu of routeActionMenus) {
      if (!(menu instanceof HTMLDetailsElement)) continue;
      menu.addEventListener('toggle', () => {
        if (!menu.open) {
          return;
        }
        for (const sibling of routeActionMenus) {
          if (sibling instanceof HTMLDetailsElement && sibling !== menu) {
            sibling.open = false;
          }
        }
      });
    }
  }
}

bindChartControls();
bindCopyCoordinateButtons();
initializeAccessPlanner();
bindTripPackActions();
renderActiveAccessContext();
updateChartButtonStates();
setupLazyAccessMaps();
setupLazyCommunityContent();
renderAccessMaps(null);
renderApprovedRouteGallery();
updateApprovedRoutePhoto(0);
bindApprovedRouteGallery();
setupDetailSectionNav();
setupDetailJumpLinks();
collapseLowerScoreDetails();
bindAlertForm();
bindRouteActions();
bindRouteReportCtas();
bindScoreFeedbackButtons();
trackEvent('Route view', routeAnalyticsProperties());
bindFavoriteButtons(document, {
  onToggle({ saved }) {
    setRouteActionStatus(saved ? 'Saved to Favorites.' : 'Removed from Favorites.', 'success');
  },
});
if (detailRefreshButton instanceof HTMLButtonElement) {
  detailRefreshButton.addEventListener('click', () => {
    loadDetail();
  });
}
if (detailFetchRetryButton instanceof HTMLButtonElement) {
  detailFetchRetryButton.addEventListener('click', () => {
    loadDetail();
  });
}
if (detailMapToggle instanceof HTMLButtonElement) {
  detailMapToggle.addEventListener('click', () => {
    detailMapCollapsed = !detailMapCollapsed;
    if (!detailMapCollapsed) {
      requestDetailMapRender();
    }
    updateDetailMapToggle();
  });
}

function renderPlanningRoute(result) {
  root.classList.add('river-detail--planning');
  const scorePanel = root.querySelector('.river-call-panel');
  if (scorePanel instanceof HTMLElement) scorePanel.hidden = true;
  for (const selector of [
    '[data-detail-section="river-conditions"]',
    '[data-detail-section="route-outlook"]',
    '[data-detail-section="why-this-call"]',
  ]) {
    const section = root.querySelector(selector);
    if (section instanceof HTMLElement) section.hidden = true;
  }
  setText('explanation', result?.explanation || 'This route is documented for planning, but does not receive a Paddle Today score.');
  if (result?.weather) {
    setText('planning-weather-condition', weatherConditionLabel(result.weather.conditionLabel ?? result.weather.weatherCode));
    setText('planning-weather-summary', [
      temperatureSummary(result.weather),
      windSummary(result.weather),
      rainTimingLabel(result.weather),
    ].filter(Boolean).join(' · '));
  } else {
    setText('planning-weather-condition', 'Forecast unavailable');
    setText('planning-weather-summary', 'Check the local forecast before launching.');
  }
  renderAccessMaps(result);
}

window.addEventListener('resize', () => {
  updateDetailMapToggle();
});
phoneBreakpoint.addEventListener('change', () => {
  updateDetailMapToggle();
});
window.addEventListener('beforeunload', () => {
  clearRoutePhotoPreviews();
  clearSubmittedRoutePhotoPreviews();
});
const hydratedDetail = hydrateDetailFromCache();
setDetailLoadingState(!hydratedDetail);
hydrateHistoryFromCache();
updateDetailMapToggle();
loadDetail({ silent: hydratedDetail });
window.setInterval(() => {
  loadDetail({ silent: true });
}, AUTO_REFRESH_MS);
