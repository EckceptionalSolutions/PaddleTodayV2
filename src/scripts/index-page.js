import {
  MAP_STYLE_URL,
  bindMarkerPopup,
  ensureMapLibre,
  escapeHtml,
  markerClassForRating,
} from '/scripts/map-runtime.js';

const cards = Array.from(document.querySelectorAll('[data-board-card]'));
const grid = document.querySelector('[data-river-grid]');
const summaryHeadline = document.querySelector('[data-summary-headline]');
const summaryDetail = document.querySelector('[data-summary-detail]');
const boardStatusBanner = document.querySelector('[data-board-status-banner]');
const boardBannerTitle = document.querySelector('[data-board-banner-title]');
const boardBannerDetail = document.querySelector('[data-board-banner-detail]');
const featuredPanel = document.querySelector('.hero-call');
const featuredState = document.querySelector('[data-featured-state]');
const featuredName = document.querySelector('[data-featured-name]');
const featuredReach = document.querySelector('[data-featured-reach]');
const featuredLink = document.querySelector('[data-featured-link]');
const summaryMapShell = document.querySelector('[data-summary-map-shell]');
const summaryMap = document.querySelector('[data-summary-map]');
const summaryMapStatus = document.querySelector('[data-summary-map-status]');
const summaryMapToggle = document.querySelector('[data-map-toggle]');
const boardRefreshButton = document.querySelector('[data-board-refresh]');
const boardRefreshNote = document.querySelector('[data-board-refresh-note]');
const boardFetchBanner = document.querySelector('[data-board-fetch-banner]');
const boardFetchTitle = document.querySelector('[data-board-fetch-title]');
const boardFetchDetail = document.querySelector('[data-board-fetch-detail]');
const filterSummary = document.querySelector('[data-filter-summary]');
const filterButtons = Array.from(document.querySelectorAll('[data-filter-toggle]'));
const filterSearch = document.querySelector('[data-filter-search]');
const filterState = document.querySelector('[data-filter-state]');
const filterRegion = document.querySelector('[data-filter-region]');
const sortSelect = document.querySelector('[data-sort-select]');
const locationIndicator = document.querySelector('[data-location-indicator]');
const locationIndicatorLabel = document.querySelector('[data-location-indicator-label]');
const summaryCounts = {
  great: document.querySelector('[data-summary-great]'),
  good: document.querySelector('[data-summary-good]'),
  marginal: document.querySelector('[data-summary-marginal]'),
  noGo: document.querySelector('[data-summary-no-go]'),
};

const statusWeight = {
  live: 2,
  degraded: 1,
  offline: 0,
};

const featuredRatingClasses = ['hero-call--great', 'hero-call--good', 'hero-call--marginal', 'hero-call--no-go'];
const orbRatingClasses = ['score-orb--great', 'score-orb--good', 'score-orb--marginal', 'score-orb--no-go'];
const confidenceClasses = ['metric-value--high', 'metric-value--medium', 'metric-value--low'];
const decisionClasses = ['decision-pill--paddle', 'decision-pill--maybe', 'decision-pill--skip'];
const bannerClasses = ['status-banner--live', 'status-banner--degraded', 'status-banner--offline', 'status-banner--loading'];
const AUTO_REFRESH_MS = 5 * 60 * 1000;
const GEOLOCATION_TIMEOUT_MS = 10000;

let mapRuntime = null;
let mapMarkers = [];
let latestResults = [];
let lastBoardSuccessAt = null;
let hasLoadedBoardOnce = false;
let userLocation = null;
let userLocationState = 'idle';
const activeFilters = {
  paddleable: false,
  highConfidence: false,
  search: '',
  state: '',
  region: '',
  sort: 'best-now',
};

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

function setText(scope, field, value) {
  const elements = Array.from(scope.querySelectorAll(`[data-field="${field}"]`));
  for (const element of elements) {
    element.textContent = value;
  }
  return elements[0] ?? null;
}

function decisionLabel(rating) {
  if (rating === 'Strong' || rating === 'Good') return 'Paddle today';
  if (rating === 'Borderline') return 'Maybe today';
  return 'Skip today';
}

function ratingLabel(rating) {
  return rating;
}

function ratingToneKey(rating) {
  if (rating === 'Strong') return 'great';
  if (rating === 'Borderline') return 'marginal';
  return String(rating).toLowerCase().replace(/[^a-z]+/g, '-');
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
  if (left.confidence.score !== right.confidence.score) {
    return right.confidence.score - left.confidence.score;
  }

  return compareResults(left, right);
}

function compareLowestRisk(left, right) {
  const statusRank = { live: 0, degraded: 1, offline: 2 };
  const ratingRank = { Strong: 0, Good: 1, Borderline: 2, 'No-go': 3 };
  const leftStatus = statusRank[left.liveData.overall] ?? 3;
  const rightStatus = statusRank[right.liveData.overall] ?? 3;
  if (leftStatus !== rightStatus) {
    return leftStatus - rightStatus;
  }

  const leftRating = ratingRank[left.rating] ?? 4;
  const rightRating = ratingRank[right.rating] ?? 4;
  if (leftRating !== rightRating) {
    return leftRating - rightRating;
  }

  if (left.confidence.score !== right.confidence.score) {
    return right.confidence.score - left.confidence.score;
  }

  return right.score - left.score;
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

function formatDistanceLabel(distance) {
  if (!Number.isFinite(distance)) {
    return '';
  }

  const value = distance < 10 ? distance.toFixed(1) : Math.round(distance).toString();
  return `${value} mi away`;
}

function compareNearest(left, right) {
  const leftDistance = distanceForResult(left);
  const rightDistance = distanceForResult(right);

  if (leftDistance !== rightDistance) {
    return leftDistance - rightDistance;
  }

  return compareResults(left, right);
}

function sortRouteResults(results) {
  const copy = [...results];
  if (activeFilters.sort === 'nearest') {
    return (userLocationState === 'ready' && userLocation ? copy.sort(compareNearest) : copy.sort(compareResults));
  }

  if (activeFilters.sort === 'highest-confidence') {
    return copy.sort(compareConfidence);
  }

  if (activeFilters.sort === 'lowest-risk') {
    return copy.sort(compareLowestRisk);
  }

  if (activeFilters.sort === 'a-z') {
    return copy.sort(compareAZ);
  }

  return copy.sort(compareResults);
}

function selectRepresentativeRoute(results) {
  return sortRouteResults(results)[0] ?? null;
}

function buildDisplayItems(allResults, filteredResults) {
  const allByRiver = groupResultsByRiverId(allResults);
  const filteredByRiver = groupResultsByRiverId(filteredResults);
  const items = [];

  for (const [riverId, routes] of filteredByRiver.entries()) {
    const totalRouteCount = allByRiver.get(riverId)?.length ?? routes.length;
    const cardRoute = selectRepresentativeRoute(routes);
    if (!cardRoute) continue;

    if (totalRouteCount > 1 && cardRoute.river.riverId) {
      items.push({
        kind: 'group',
        key: cardRoute.river.riverId,
        link: `/rivers/by-river/${cardRoute.river.riverId}/`,
        riverId: cardRoute.river.riverId,
        cardRoute,
        routes,
        totalRouteCount,
      });
      continue;
    }

    items.push({
      kind: 'route',
      key: cardRoute.river.slug,
      link: `/rivers/${cardRoute.river.slug}/`,
      riverId: cardRoute.river.riverId ?? cardRoute.river.slug,
      cardRoute,
      routes: [cardRoute],
      totalRouteCount: 1,
    });
  }

  return items;
}

function compareDisplayItems(left, right) {
  if (activeFilters.sort === 'a-z') {
    const riverCompare = left.cardRoute.river.name.localeCompare(right.cardRoute.river.name);
    if (riverCompare !== 0) {
      return riverCompare;
    }

    return left.cardRoute.river.reach.localeCompare(right.cardRoute.river.reach);
  }

  return compareResults(left.cardRoute, right.cardRoute);
}

function sortDisplayItems(items) {
  const copy = [...items];
  if (activeFilters.sort === 'nearest' && userLocationState === 'ready' && userLocation) {
    return copy.sort((left, right) => {
      const leftDistance = distanceForResult(left.cardRoute);
      const rightDistance = distanceForResult(right.cardRoute);
      if (leftDistance !== rightDistance) {
        return leftDistance - rightDistance;
      }

      return compareDisplayItems(left, right);
    });
  }

  if (activeFilters.sort === 'highest-confidence') {
    return copy.sort((left, right) => compareConfidence(left.cardRoute, right.cardRoute));
  }

  if (activeFilters.sort === 'lowest-risk') {
    return copy.sort((left, right) => compareLowestRisk(left.cardRoute, right.cardRoute));
  }

  return copy.sort(compareDisplayItems);
}

function normalizeFilterKey(filterKey) {
  if (filterKey === 'high-confidence') return 'highConfidence';
  if (filterKey === 'hide-no-go') return 'hideNoGo';
  return filterKey;
}

function clearClasses(element, classNames) {
  if (!(element instanceof HTMLElement)) return;
  element.classList.remove(...classNames);
}

function decorateDecision(element, rating) {
  if (!(element instanceof HTMLElement)) return;
  clearClasses(element, decisionClasses);
  element.classList.add(
    rating === 'Strong' || rating === 'Good'
      ? 'decision-pill--paddle'
      : rating === 'Borderline'
        ? 'decision-pill--maybe'
        : 'decision-pill--skip'
  );
}

function decorateConfidence(element, confidenceLabel) {
  if (!(element instanceof HTMLElement)) return;
  clearClasses(element, confidenceClasses);
  element.classList.add(`metric-value--${confidenceLabel.toLowerCase()}`);
}

function decorateDataStatus(element, overall) {
  if (!(element instanceof HTMLElement)) return;
  element.classList.remove('data-status-pill--live', 'data-status-pill--degraded', 'data-status-pill--offline');
  element.classList.add(`data-status-pill--${overall}`);
}

function decorateBanner(element, overall) {
  if (!(element instanceof HTMLElement)) return;
  clearClasses(element, bannerClasses);
  element.classList.add(`status-banner--${overall}`);
}

function setHidden(element, hidden) {
  if (!(element instanceof HTMLElement)) return;
  element.classList.toggle('status-banner--hidden', hidden);
}

function sourceStatusLine(liveData) {
  const gaugeLabel = liveData.gaugeState === 'live' ? 'Gauge live' : liveData.gaugeState === 'stale' ? 'Gauge stale' : 'Gauge offline';
  const weatherLabel =
    liveData.weatherState === 'live' ? 'Weather live' : liveData.weatherState === 'stale' ? 'Weather stale' : 'Weather offline';
  return `${gaugeLabel} - ${weatherLabel}`;
}

function markerClassFor(item) {
  return markerClassForRating(item.cardRoute.rating, item.cardRoute.confidence.label);
}

function popupMarkup(item) {
  const result = item.cardRoute;
  const routeLabel =
    item.kind === 'group'
      ? `Showing route: ${escapeHtml(result.river.reach)}`
      : escapeHtml(result.river.reach);
  const linkLabel = item.kind === 'group' ? 'Open river page' : 'Open route';

  return `
    <article class="score-map-popup">
      <p class="score-map-popup__state">${escapeHtml(result.river.state)} | ${escapeHtml(result.river.region)}</p>
      <h3>${escapeHtml(result.river.name)}</h3>
      <p class="score-map-popup__reach">${routeLabel}</p>
      <p class="score-map-popup__summary">${escapeHtml(result.explanation)}</p>
      <p class="score-map-popup__meta">
        Score ${result.score} - ${escapeHtml(ratingLabel(result.rating))} - Confidence ${escapeHtml(result.confidence.label)}
      </p>
      <a class="score-map-popup__link" href="${item.link}">${linkLabel}</a>
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
      const result = item.cardRoute;
      const markerNode = document.createElement('button');
      markerNode.type = 'button';
      markerNode.className = markerClassFor(item);
      markerNode.innerHTML = `<span>${result.score}</span>`;
      markerNode.setAttribute(
        'aria-label',
        `${result.river.name}: score ${result.score}, confidence ${result.confidence.label}`
      );

      const marker = new maplibregl.Marker({
        element: markerNode,
        anchor: 'center',
      })
        .setLngLat([result.river.longitude, result.river.latitude])
        .setPopup(
          new maplibregl.Popup({
            offset: 18,
            closeButton: false,
            maxWidth: '280px',
          }).setHTML(popupMarkup(item))
        )
        .addTo(mapRuntime);

      bindMarkerPopup(marker, markerNode);
      mapMarkers.push(marker);
      bounds.extend([result.river.longitude, result.river.latitude]);
      hasBounds = true;
    }

    if (hasBounds) {
      mapRuntime.fitBounds(bounds, {
        padding: { top: 52, right: 52, bottom: 52, left: 52 },
        maxZoom: 8.2,
        duration: 700,
      });
      mapRuntime.resize();
      if (summaryMapStatus instanceof HTMLElement) {
        summaryMapStatus.textContent = 'Map is up to date.';
      }
      return;
    }

    mapRuntime.resize();
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

function routeLabelForItem(item) {
  const route = item.cardRoute.river.reach;
  if (item.kind === 'group') {
    const prefix =
      activeFilters.sort === 'nearest' && userLocationState === 'ready'
        ? 'Nearest route'
        : 'Best route';
    return `${item.totalRouteCount} routes - ${prefix}: ${route}`;
  }

  return route;
}

function updateCard(card, item) {
  const result = item.cardRoute;
  const ratingKey = ratingToneKey(result.rating);
  const decision = decisionLabel(result.rating);

  const title = card.querySelector('.river-card__title');
  if (title instanceof HTMLElement) {
    title.textContent = result.river.name;
  }
  const state = card.querySelector('.river-card__state');
  if (state instanceof HTMLElement) {
    state.textContent = `${result.river.state} | ${result.river.region}`;
  }
  setText(card, 'route-label', routeLabelForItem(item));
  setText(card, 'score', String(result.score));
  setText(card, 'rating', ratingLabel(result.rating));
  setText(card, 'card-summary', result.summary.cardText);
  setText(
    card,
    'freshness',
    result.liveData.overall === 'live'
      ? result.summary.freshnessText
      : `${sourceStatusLine(result.liveData)}. ${result.liveData.summary}`
  );
  setText(card, 'band-plain', result.gaugeBandLabel);
  setText(card, 'gauge-now', result.summary.gaugeNow);
  const confidenceField = setText(card, 'confidence-plain', result.summary.confidenceText);
  decorateConfidence(confidenceField, result.confidence.label);

  card.dataset.score = String(result.score);
  card.dataset.dataStatus = result.liveData.overall;
  card.dataset.rating = result.rating;
  card.dataset.confidence = result.confidence.label;
  card.classList.remove('river-card--great', 'river-card--good', 'river-card--marginal', 'river-card--no-go');
  card.classList.add(`river-card--${ratingKey}`);

  const orb = card.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    orb.classList.remove('score-orb--great', 'score-orb--good', 'score-orb--marginal', 'score-orb--no-go');
    orb.classList.add(`score-orb--${ratingKey}`);
  }

  const decisionPill = setText(card, 'decision', decision);
  decorateDecision(decisionPill, result.rating);

  const dataStatus = setText(card, 'data-status', `Reads ${result.liveData.overall}`);
  decorateDataStatus(dataStatus, result.liveData.overall);

  setText(card, 'primary-factor', result.summary.primaryFactor);
  setText(card, 'secondary-factor', result.summary.secondaryFactor);
  renderSourceBadges(card, result.sources);

  const link = card.querySelector('[data-card-link]');
  if (link instanceof HTMLAnchorElement) {
    link.href = item.link;
    link.textContent = item.kind === 'group' ? 'Open river page' : 'Open full river call';
  }
}

function renderSourceBadges(card, badges) {
  const badgesEl = card.querySelector('[data-source-badges]');
  if (!(badgesEl instanceof HTMLElement) || !Array.isArray(badges)) {
    return;
  }

  badgesEl.innerHTML = badges
    .map(
      (badge) =>
        `<span class="source-badge source-badge--${badge.tone}">${escapeHtml(badge.label)}</span>`
    )
    .join('');
}

function updateFeaturedCall(item) {
  if (!(featuredPanel instanceof HTMLElement)) {
    return;
  }

  const result = item.cardRoute;
  const ratingKey = ratingToneKey(result.rating);
  const decision = decisionLabel(result.rating);
  const confidenceText = `${result.confidence.label} confidence (${result.confidence.score}/100)`;

  clearClasses(featuredPanel, featuredRatingClasses);
  featuredPanel.classList.add(`hero-call--${ratingKey}`);

  if (featuredState instanceof HTMLElement) {
    featuredState.textContent = `${result.river.state} | ${result.river.region}`;
  }
  if (featuredName instanceof HTMLElement) {
    featuredName.textContent = result.river.name;
  }
  if (featuredReach instanceof HTMLElement) {
    const groupPrefix =
      activeFilters.sort === 'nearest' && userLocationState === 'ready'
        ? 'Nearest route'
        : 'Best route';
    featuredReach.textContent = item.kind === 'group' ? `${groupPrefix}: ${result.river.reach}` : result.river.reach;
  }
  if (featuredLink instanceof HTMLAnchorElement) {
    featuredLink.href = item.link;
    featuredLink.textContent = item.kind === 'group' ? 'Open river page' : 'Open featured river';
  }

  setText(document, 'featured-score', String(result.score));
  setText(document, 'featured-rating', ratingLabel(result.rating));
  setText(document, 'featured-explanation', result.explanation);

  const featuredDecision = setText(document, 'featured-decision', decision);
  decorateDecision(featuredDecision, result.rating);

  const featuredConfidence = setText(document, 'featured-confidence', confidenceText);
  decorateConfidence(featuredConfidence, result.confidence.label);

  const featuredBand = setText(document, 'featured-band', `Band ${result.gaugeBandLabel}`);
  decorateDecision(featuredBand, result.gaugeBandLabel.includes('Too') ? 'No-go' : result.rating);

  const orb = featuredPanel.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    clearClasses(orb, orbRatingClasses);
    orb.classList.add(`score-orb--${ratingKey}`);
  }
}

function updateSummaryStatus(items, routeResults) {
  if (!(summaryHeadline instanceof HTMLElement) || !(summaryDetail instanceof HTMLElement)) {
    return;
  }

  if (items.length === 0) {
    summaryHeadline.textContent = 'No rivers match the current filters.';
    summaryDetail.textContent = 'Clear a filter or search for a broader river name.';
    if (summaryCounts.great instanceof HTMLElement) summaryCounts.great.textContent = '0';
    if (summaryCounts.good instanceof HTMLElement) summaryCounts.good.textContent = '0';
    if (summaryCounts.marginal instanceof HTMLElement) summaryCounts.marginal.textContent = '0';
    if (summaryCounts.noGo instanceof HTMLElement) summaryCounts.noGo.textContent = '0';
    return;
  }

  const visibleRoutes = items.map((item) => item.cardRoute);
  const liveCount = visibleRoutes.filter((result) => result.liveData.overall === 'live').length;
  const degradedCount = visibleRoutes.filter((result) => result.liveData.overall === 'degraded').length;
  const offlineCount = visibleRoutes.filter((result) => result.liveData.overall === 'offline').length;
  const generatedAt = routeResults[0]?.generatedAt
    ? new Date(routeResults[0].generatedAt).toLocaleString([], {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'unknown time';

  summaryHeadline.textContent = `As of ${generatedAt}: ${liveCount} live, ${degradedCount} limited, ${offlineCount} offline.`;

  if (summaryCounts.great instanceof HTMLElement) {
    summaryCounts.great.textContent = String(visibleRoutes.filter((result) => result.rating === 'Strong').length);
  }
  if (summaryCounts.good instanceof HTMLElement) {
    summaryCounts.good.textContent = String(visibleRoutes.filter((result) => result.rating === 'Good').length);
  }
  if (summaryCounts.marginal instanceof HTMLElement) {
    summaryCounts.marginal.textContent = String(
      visibleRoutes.filter((result) => result.rating === 'Borderline').length
    );
  }
  if (summaryCounts.noGo instanceof HTMLElement) {
    summaryCounts.noGo.textContent = String(visibleRoutes.filter((result) => result.rating === 'No-go').length);
  }

  if (offlineCount > 0) {
    summaryDetail.textContent =
      'Some rivers are missing current source data. Recheck detail pages before you drive.';
    return;
  }

  if (degradedCount > 0) {
    summaryDetail.textContent =
      'At least one river is using stale or partial inputs. Give those rivers a second look.';
    return;
  }

  summaryDetail.textContent = 'All rivers are using fresh gauge and weather reads.';
}

function updateBoardStatusBanner(items) {
  if (!(boardStatusBanner instanceof HTMLElement)) {
    return;
  }

  if (items.length === 0) {
    decorateBanner(boardStatusBanner, 'live');
    if (boardBannerTitle instanceof HTMLElement) {
      boardBannerTitle.textContent = 'No rivers match the current filters.';
    }
    if (boardBannerDetail instanceof HTMLElement) {
      boardBannerDetail.textContent = 'Clear a filter to bring more rivers back into view.';
    }
    return;
  }

  const visibleRoutes = items.map((item) => item.cardRoute);
  const liveCount = visibleRoutes.filter((result) => result.liveData.overall === 'live').length;
  const degradedCount = visibleRoutes.filter((result) => result.liveData.overall === 'degraded').length;
  const offlineCount = visibleRoutes.filter((result) => result.liveData.overall === 'offline').length;
  const gaugeStaleCount = visibleRoutes.filter(
    (result) => result.liveData.gaugeState === 'stale' && result.liveData.weatherState === 'live'
  ).length;
  const weatherStaleCount = visibleRoutes.filter(
    (result) => result.liveData.gaugeState === 'live' && result.liveData.weatherState === 'stale'
  ).length;
  const bothStaleCount = visibleRoutes.filter(
    (result) => result.liveData.gaugeState === 'stale' && result.liveData.weatherState === 'stale'
  ).length;
  const gaugeOfflineCount = visibleRoutes.filter((result) => result.liveData.gaugeState === 'unavailable').length;

  if (offlineCount > 0) {
    decorateBanner(boardStatusBanner, 'offline');
    if (boardBannerTitle instanceof HTMLElement) {
      boardBannerTitle.textContent = `${offlineCount} river call${offlineCount === 1 ? '' : 's'} need another look.`;
    }
    if (boardBannerDetail instanceof HTMLElement) {
      boardBannerDetail.textContent = [
        gaugeOfflineCount > 0 ? `${gaugeOfflineCount} gauge offline` : null,
        bothStaleCount > 0 ? `${bothStaleCount} gauge + weather stale` : null,
        gaugeStaleCount > 0 ? `${gaugeStaleCount} gauge stale only` : null,
        weatherStaleCount > 0 ? `${weatherStaleCount} weather stale only` : null,
      ]
        .filter(Boolean)
        .join('. ') || 'At least one direct gauge is offline. Open the river page and verify the source.';
    }
    return;
  }

  if (degradedCount > 0) {
    decorateBanner(boardStatusBanner, 'degraded');
    if (boardBannerTitle instanceof HTMLElement) {
      boardBannerTitle.textContent = `${degradedCount} river call${degradedCount === 1 ? '' : 's'} are using older or partial inputs.`;
    }
    if (boardBannerDetail instanceof HTMLElement) {
      boardBannerDetail.textContent = [
        gaugeStaleCount > 0 ? `${gaugeStaleCount} gauge stale only` : null,
        weatherStaleCount > 0 ? `${weatherStaleCount} weather stale only` : null,
        bothStaleCount > 0 ? `${bothStaleCount} gauge + weather stale` : null,
        `${liveCount} fully live`,
      ]
        .filter(Boolean)
        .join('. ') + '. Recheck those rivers before you leave home.';
    }
    return;
  }

  decorateBanner(boardStatusBanner, 'live');
  if (boardBannerTitle instanceof HTMLElement) {
    boardBannerTitle.textContent = 'The board is up to date.';
  }
  if (boardBannerDetail instanceof HTMLElement) {
    boardBannerDetail.textContent =
      `${liveCount} river call${liveCount === 1 ? '' : 's'} are live right now. Filter the list, then open a river.`;
  }
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

function updateFilterButtonStates() {
  for (const button of filterButtons) {
    if (!(button instanceof HTMLElement)) continue;
    const filterKey = normalizeFilterKey(button.dataset.filterToggle ?? '');
    const active = Boolean(activeFilters[filterKey]);
    button.classList.toggle('filter-chip--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }
}

function updateFilterSummary(filtered, total) {
  if (!(filterSummary instanceof HTMLElement)) {
    return;
  }

  const activeCount = [
    activeFilters.paddleable,
    activeFilters.highConfidence,
    activeFilters.search,
    activeFilters.state,
    activeFilters.region,
  ].filter(Boolean).length;
  const sortLabel =
    activeFilters.sort === 'nearest'
      ? 'nearest'
      : activeFilters.sort === 'highest-confidence'
      ? 'strongest confidence'
      : activeFilters.sort === 'lowest-risk'
        ? 'lowest risk'
        : activeFilters.sort === 'a-z'
          ? 'A-Z'
          : 'best now';

  if (activeFilters.sort === 'nearest') {
    if (userLocationState === 'pending') {
      filterSummary.textContent = 'Requesting your location. Showing best now until it comes through.';
      return;
    }

    if (userLocationState === 'denied') {
      filterSummary.textContent = 'Location access was denied. Showing best now instead.';
      return;
    }

    if (userLocationState === 'unavailable') {
      filterSummary.textContent = 'Location is unavailable in this browser. Showing best now instead.';
      return;
    }
  }

  if (activeCount === 0) {
    filterSummary.textContent = `Showing all ${total} river calls, sorted by ${sortLabel}.`;
    return;
  }

  if (filtered.length === 0) {
    filterSummary.textContent =
      'No rivers match these filters. Clear one to bring more back.';
    return;
  }

  filterSummary.textContent = `Showing ${filtered.length} of ${total} river calls, sorted by ${sortLabel}.`;
}

function updateLocationIndicator() {
  if (!(locationIndicator instanceof HTMLElement)) {
    return;
  }

  if (activeFilters.sort !== 'nearest') {
    locationIndicator.hidden = true;
    locationIndicator.dataset.state = 'idle';
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

function updateDistanceLabels(items) {
  const itemsByKey = new Map(items.map((item) => [item.key, item]));

  for (const card of cards) {
    if (!(card instanceof HTMLElement)) continue;

    const distanceEl = card.querySelector('[data-field="distance"]');
    if (!(distanceEl instanceof HTMLElement)) continue;

    if (activeFilters.sort !== 'nearest' || userLocationState !== 'ready' || !userLocation) {
      distanceEl.hidden = true;
      continue;
    }

    const key = card.dataset.cardKey;
    if (!key) {
      distanceEl.hidden = true;
      continue;
    }

    const item = itemsByKey.get(key);
    if (!item) {
      distanceEl.hidden = true;
      continue;
    }

    distanceEl.textContent = formatDistanceLabel(distanceForResult(item.cardRoute));
    distanceEl.hidden = false;
  }
}

function applyBoardFilters(results) {
  const filteredRoutes = getFilteredResults(results);
  const filtered = sortDisplayItems(buildDisplayItems(results, filteredRoutes));
  const allItems = sortDisplayItems(buildDisplayItems(results, results));

  updateFilterButtonStates();
  updateFilterSummary(filtered, allItems.length);
  updateLocationIndicator();
  updateDistanceLabels(filtered);
  updateSummaryStatus(filtered, results);
  updateBoardStatusBanner(filtered);

  const featuredResult = filtered[0] ?? allItems[0] ?? null;
  if (featuredResult) {
    updateFeaturedCall(featuredResult);
  }

  renderSummaryMap(filtered);

  const orderedCards = new Map(cards.map((card) => [card.dataset.cardKey, card]));
  if (grid instanceof HTMLElement) {
    for (const item of filtered) {
      const card = orderedCards.get(item.key);
      if (card instanceof HTMLElement) {
        grid.appendChild(card);
      }
    }
  }

  for (const card of cards) {
    if (!(card instanceof HTMLElement)) continue;
    const key = card.dataset.cardKey;
    card.hidden = !filtered.some((item) => item.key === key);
  }
}

function requestUserLocation() {
  if (userLocationState === 'pending' || userLocationState === 'ready') {
    return;
  }

  if (!navigator.geolocation) {
    userLocationState = 'unavailable';
    applyBoardFilters(latestResults);
    return;
  }

  userLocationState = 'pending';
  applyBoardFilters(latestResults);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      userLocationState = 'ready';
      applyBoardFilters(latestResults);
    },
    () => {
      userLocationState = 'denied';
      applyBoardFilters(latestResults);
    },
    {
      enableHighAccuracy: false,
      timeout: GEOLOCATION_TIMEOUT_MS,
      maximumAge: 5 * 60 * 1000,
    }
  );
}

function setupFilters(results) {
  latestResults = results;
  updateFilterButtonStates();

  for (const button of filterButtons) {
    if (!(button instanceof HTMLButtonElement) || button.dataset.filterBound === 'true') continue;
    button.dataset.filterBound = 'true';
    button.addEventListener('click', () => {
      const filterKey = normalizeFilterKey(button.dataset.filterToggle ?? '');
      activeFilters[filterKey] = !activeFilters[filterKey];
      applyBoardFilters(latestResults);
    });
  }

  if (filterSearch instanceof HTMLInputElement && filterSearch.dataset.filterBound !== 'true') {
    filterSearch.dataset.filterBound = 'true';
    filterSearch.addEventListener('input', () => {
      activeFilters.search = filterSearch.value.trim();
      applyBoardFilters(latestResults);
    });
  }

  if (filterState instanceof HTMLSelectElement && filterState.dataset.filterBound !== 'true') {
    filterState.dataset.filterBound = 'true';
    filterState.addEventListener('change', () => {
      activeFilters.state = filterState.value;
      applyBoardFilters(latestResults);
    });
  }

  if (filterRegion instanceof HTMLSelectElement && filterRegion.dataset.filterBound !== 'true') {
    filterRegion.dataset.filterBound = 'true';
    filterRegion.addEventListener('change', () => {
      activeFilters.region = filterRegion.value;
      applyBoardFilters(latestResults);
    });
  }

  if (sortSelect instanceof HTMLSelectElement && sortSelect.dataset.filterBound !== 'true') {
    sortSelect.dataset.filterBound = 'true';
    sortSelect.addEventListener('change', () => {
      activeFilters.sort = sortSelect.value;
      if (activeFilters.sort === 'nearest') {
        requestUserLocation();
      }
      applyBoardFilters(latestResults);
    });
  }
}

function setBoardRefreshState(state, detail = '') {
  if (boardRefreshButton instanceof HTMLButtonElement) {
    boardRefreshButton.disabled = state === 'loading';
    boardRefreshButton.textContent = state === 'loading' ? 'Refreshing...' : 'Refresh board';
  }

  if (boardRefreshNote instanceof HTMLElement) {
    if (state === 'loading') {
      boardRefreshNote.textContent = 'Refreshing gauge and weather reads.';
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
      })}. Auto-refreshes every 5 minutes.`;
      return;
    }

    boardRefreshNote.textContent = 'Auto-refreshes every 5 minutes.';
  }
}

function setBoardFetchBannerState(kind, detail) {
  if (!(boardFetchBanner instanceof HTMLElement)) {
    return;
  }

  if (kind === 'hidden') {
    setHidden(boardFetchBanner, true);
    return;
  }

  setHidden(boardFetchBanner, false);
  decorateBanner(boardFetchBanner, 'offline');
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

function setError(card) {
  const explanation = card.querySelector('[data-field="card-summary"]');
  if (explanation) {
    explanation.textContent = 'Live reads are unavailable right now. Open the river page for the source links.';
  }

  setText(card, 'freshness', 'No current live read available.');
  setText(card, 'band-plain', 'Unavailable');
  setText(card, 'gauge-now', 'Unavailable');
  setText(card, 'confidence-plain', 'Check sources');

  const decision = setText(card, 'decision', 'Check sources');
  decorateDecision(decision, 'No-go');

  const dataStatus = setText(card, 'data-status', 'Reads offline');
  decorateDataStatus(dataStatus, 'offline');
}

async function loadBoard({ silent = false } = {}) {
  if (!silent) {
    setBoardRefreshState('loading');
  }

  try {
    const response = await fetch('/api/rivers/summary.json', {
      headers: {
        accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed for /api/rivers/summary.json: HTTP ${response.status}`);
    }

    const payload = await response.json();
    const results = Array.isArray(payload?.rivers) ? payload.rivers : [];
    const sortedResults = [...results].sort(compareResults);
    const allItems = sortDisplayItems(buildDisplayItems(sortedResults, sortedResults));
    setupFilters(sortedResults);
    const itemsByKey = new Map(allItems.map((item) => [item.key, item]));

    for (const card of cards) {
      if (!(card instanceof HTMLElement)) continue;
      const key = card.dataset.cardKey;
      if (!key) continue;
      const item = itemsByKey.get(key);
      if (!item) continue;
      updateCard(card, item);
    }

    applyBoardFilters(sortedResults);
    latestResults = sortedResults;
    lastBoardSuccessAt = Date.now();
    hasLoadedBoardOnce = true;
    setBoardFetchBannerState('hidden');
    setBoardRefreshState('ready');
  } catch (error) {
    console.error('Failed to load river scores on summary page.', error);
    if (hasLoadedBoardOnce) {
      setBoardFetchBannerState('hidden');
      setBoardRefreshState('error', 'Last refresh failed. Showing the last good board.');
      return;
    }

    setBoardFetchBannerState(
      'initial',
      'Live river reads could not load. Retry the board, then open a river page if you need to verify the sources.'
    );
    setBoardRefreshState('error', 'Last refresh failed. Retry now.');

    if (summaryHeadline instanceof HTMLElement) {
      summaryHeadline.textContent = 'Live river status is unavailable.';
    }
    if (summaryDetail instanceof HTMLElement) {
      summaryDetail.textContent = 'Current gauge and weather reads could not load. Open a river page to verify the sources directly.';
    }
    if (filterSummary instanceof HTMLElement) {
      filterSummary.textContent = 'Filters are unavailable because the river list could not load.';
    }
    if (boardStatusBanner instanceof HTMLElement) {
      decorateBanner(boardStatusBanner, 'offline');
    }
    if (boardBannerTitle instanceof HTMLElement) {
      boardBannerTitle.textContent = 'River board unavailable.';
    }
    if (boardBannerDetail instanceof HTMLElement) {
      boardBannerDetail.textContent = 'Treat every river as unconfirmed until live gauge and weather reads return.';
    }

    if (featuredState instanceof HTMLElement) {
      featuredState.textContent = 'Featured call unavailable';
    }
    if (featuredName instanceof HTMLElement) {
      featuredName.textContent = 'Check sources';
    }
    if (featuredReach instanceof HTMLElement) {
      featuredReach.textContent = 'Open a river page to verify the latest gauge and weather reads.';
    }
    setText(document, 'featured-explanation', 'A featured river call is unavailable right now.');
    setText(document, 'featured-decision', 'Check sources');
    setText(document, 'featured-confidence', 'Confidence unavailable');
    setText(document, 'featured-band', 'Flow band unavailable');

    for (const card of cards) {
      if (!(card instanceof HTMLElement)) continue;
      setError(card);
    }
  }
}

if (boardRefreshButton instanceof HTMLButtonElement) {
  boardRefreshButton.addEventListener('click', () => {
    loadBoard();
  });
}
loadBoard();
window.setInterval(() => {
  loadBoard({ silent: true });
}, AUTO_REFRESH_MS);

