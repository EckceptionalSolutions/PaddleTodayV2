import {
  MAP_STYLE_URL,
  bindMarkerPopup,
  ensureMapLibre,
  escapeHtml,
  markerClassForRating,
} from '/scripts/map-runtime.js';

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
const selectedLink = root.querySelector('[data-group-selected-link]');
const groupMap = root.querySelector('[data-group-map]');
const groupMapStatus = root.querySelector('[data-group-map-status]');

const AUTO_REFRESH_MS = 5 * 60 * 1000;
let lastSuccessAt = null;
let currentResult = null;
let selectedSlug = null;
let mapRuntime = null;
let mapMarkers = [];

function setText(field, value) {
  const elements = Array.from(root.querySelectorAll(`[data-field="${field}"]`));
  for (const element of elements) {
    element.textContent = value;
  }
  return elements[0] ?? null;
}

function decisionLabel(rating) {
  if (rating === 'Strong' || rating === 'Good') return 'Paddle today';
  if (rating === 'Fair') return 'Watch closely';
  return 'Skip today';
}

function ratingToneKey(rating) {
  if (rating === 'Strong') return 'great';
  if (rating === 'Fair') return 'marginal';
  return String(rating).toLowerCase().replace(/[^a-z]+/g, '-');
}

function confidenceLabelText(confidence) {
  return confidence?.label ? `${confidence.label} confidence` : 'Checking confidence';
}

function routeLengthText(route) {
  return route.distanceLabel || '';
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
  return `Temp: ${Math.round(temp)}°F`;
}

function summaryLine(route) {
  return `${levelText(route)} • ${trendText(route)} • ${weatherSummary(route)}`;
}

function dataLine(route) {
  return [formatGaugeValue(route.gauge?.current, route.gaugeUnit), windData(route), temperatureData(route)].join(' • ');
}

function midpointForRoute(route) {
  if (
    typeof route.putIn?.longitude === 'number' &&
    typeof route.putIn?.latitude === 'number' &&
    typeof route.takeOut?.longitude === 'number' &&
    typeof route.takeOut?.latitude === 'number'
  ) {
    return {
      longitude: (route.putIn.longitude + route.takeOut.longitude) / 2,
      latitude: (route.putIn.latitude + route.takeOut.latitude) / 2,
    };
  }

  if (typeof route.longitude === 'number' && typeof route.latitude === 'number') {
    return {
      longitude: route.longitude,
      latitude: route.latitude,
    };
  }

  return null;
}

function routePopupMarkup(route) {
  return `
    <article class="score-map-popup">
      <p class="score-map-popup__state">${escapeHtml(route.state)} | ${escapeHtml(route.region)}</p>
      <h3>${escapeHtml(route.name)}</h3>
      <p class="score-map-popup__reach">${escapeHtml(route.reach)}</p>
      <p class="score-map-popup__summary">${escapeHtml(summaryLine(route))}</p>
      <p class="score-map-popup__meta">Score ${route.score} - ${escapeHtml(route.rating)} - ${escapeHtml(confidenceLabelText(route.confidence))}${routeLengthText(route) ? ` - ${escapeHtml(routeLengthText(route))}` : ''}</p>
    </article>
  `;
}

async function renderGroupMap(routes) {
  if (!(groupMap instanceof HTMLElement)) {
    return;
  }

  if (groupMapStatus instanceof HTMLElement) {
    groupMapStatus.textContent = 'Loading route map.';
  }

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl) {
      return;
    }

    if (!mapRuntime) {
      mapRuntime = new maplibregl.Map({
        container: groupMap,
        style: MAP_STYLE_URL,
        center: [-92.5, 44.2],
        zoom: 8,
        minZoom: 5,
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

    const features = [];
    const bounds = new maplibregl.LngLatBounds();
    let hasBounds = false;

    for (const route of routes) {
      if (
        typeof route.putIn?.longitude === 'number' &&
        typeof route.putIn?.latitude === 'number' &&
        typeof route.takeOut?.longitude === 'number' &&
        typeof route.takeOut?.latitude === 'number'
      ) {
        features.push({
          type: 'Feature',
          properties: {
            slug: route.slug,
            rating: route.rating,
            selected: route.slug === selectedSlug,
          },
          geometry: {
            type: 'LineString',
            coordinates: [
              [route.putIn.longitude, route.putIn.latitude],
              [route.takeOut.longitude, route.takeOut.latitude],
            ],
          },
        });
        bounds.extend([route.putIn.longitude, route.putIn.latitude]);
        bounds.extend([route.takeOut.longitude, route.takeOut.latitude]);
        hasBounds = true;
      }

      const midpoint = midpointForRoute(route);
      if (!midpoint) continue;

      const markerNode = document.createElement('button');
      markerNode.type = 'button';
      markerNode.className = markerClassForRating(route.rating, route.confidence.label);
      markerNode.innerHTML = `<span>${route.score}</span>`;
      markerNode.setAttribute(
        'aria-label',
        `${route.reach}: score ${route.score}, confidence ${route.confidence.label}`
      );

      const marker = new maplibregl.Marker({
        element: markerNode,
        anchor: 'center',
      })
        .setLngLat([midpoint.longitude, midpoint.latitude])
        .setPopup(
          new maplibregl.Popup({ offset: 18, closeButton: false, maxWidth: '280px' }).setHTML(routePopupMarkup(route))
        )
        .addTo(mapRuntime);

      bindMarkerPopup(marker, markerNode);
      mapMarkers.push(marker);
      bounds.extend([midpoint.longitude, midpoint.latitude]);
      hasBounds = true;
    }

    const sourceId = 'river-group-routes';
    const data = {
      type: 'FeatureCollection',
      features,
    };
    const source = mapRuntime.getSource(sourceId);

    if (source) {
      source.setData(data);
    } else {
      mapRuntime.addSource(sourceId, {
        type: 'geojson',
        data,
      });
      mapRuntime.addLayer({
        id: 'river-group-routes-base',
        type: 'line',
        source: sourceId,
        paint: {
          'line-color': [
            'match',
            ['get', 'rating'],
            'Strong',
            '#2c8a54',
            'Good',
            '#2c8a54',
            'Fair',
            '#ad752c',
            '#bb5840',
          ],
          'line-width': ['case', ['boolean', ['get', 'selected'], false], 4, 2.4],
          'line-opacity': ['case', ['boolean', ['get', 'selected'], false], 0.92, 0.55],
        },
      });
    }

    if (hasBounds) {
      mapRuntime.fitBounds(bounds, {
        padding: { top: 46, right: 46, bottom: 46, left: 46 },
        maxZoom: 10.6,
        duration: 600,
      });
      mapRuntime.resize();
      if (groupMapStatus instanceof HTMLElement) {
        groupMapStatus.textContent = `Showing ${routes.length} routes.`;
      }
      return;
    }

    if (groupMapStatus instanceof HTMLElement) {
      groupMapStatus.textContent = 'Route map unavailable for this river.';
    }
  } catch (error) {
    console.error('Failed to load river group map.', error);
    if (groupMapStatus instanceof HTMLElement) {
      groupMapStatus.textContent = 'Route map unavailable right now.';
    }
  }
}

function summaryLine(route) {
  return `${levelText(route)} - ${trendText(route)} - ${weatherSummary(route)}`;
}

function dataLine(route) {
  return [formatGaugeValue(route.gauge?.current, route.gaugeUnit), windData(route), temperatureData(route)].join(' - ');
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
    refreshButton.textContent = state === 'loading' ? 'Refreshing...' : 'Refresh river';
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

function renderSelectedRoute(route) {
  if (!route) return;

  const orb = root.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    orb.classList.remove('score-orb--great', 'score-orb--good', 'score-orb--marginal', 'score-orb--no-go');
    orb.classList.add(`score-orb--${ratingToneKey(route.rating)}`);
  }

  setText('selected-score', String(route.score));
  setText('selected-rating', route.rating);
  setText('selected-reach', route.reach);
  setText('selected-status', decisionLabel(route.rating));
  setText(
    'selected-confidence',
    routeLengthText(route)
      ? `${confidenceLabelText(route.confidence)} â€¢ ${routeLengthText(route)}`
      : confidenceLabelText(route.confidence)
  );
  setText(
    'selected-confidence',
    routeLengthText(route)
      ? `${confidenceLabelText(route.confidence)} - ${routeLengthText(route)}`
      : confidenceLabelText(route.confidence)
  );
  setText('selected-summary', summaryLine(route));
  setText('selected-signal', dataLine(route));

  if (selectedLink instanceof HTMLAnchorElement) {
    selectedLink.href = `/rivers/${route.slug}/`;
    selectedLink.textContent = 'View river';
  }
}

function renderRouteList(routes) {
  if (!(routeList instanceof HTMLElement)) return;

  routeList.innerHTML = routes
    .map((route) => {
      const active = route.slug === selectedSlug;
      return `
        <button
          class="route-choice${active ? ' route-choice--active' : ''}"
          type="button"
          data-group-route-button
          data-route-slug="${route.slug}"
        >
          <span class="route-choice__kind">Route</span>
          <span class="route-choice__eyebrow">${route.state} | ${route.region}</span>
          <strong class="route-choice__title">${route.reach}</strong>
          <span class="route-choice__score route-choice__score--${ratingToneKey(route.rating)}">
            ${route.score} • ${route.rating}
          </span>
          <span class="route-choice__meta">${confidenceLabelText(route.confidence)}${routeLengthText(route) ? ` â€¢ ${routeLengthText(route)}` : ''}</span>
          <span class="route-choice__summary">${summaryLine(route)}</span>
        </button>
      `;
    })
    .join('');

  for (const button of Array.from(routeList.querySelectorAll('[data-group-route-button]'))) {
    if (!(button instanceof HTMLButtonElement)) continue;
    button.addEventListener('click', () => {
      selectedSlug = button.dataset.routeSlug;
      if (!currentResult) return;
      const route = currentResult.routes.find((candidate) => candidate.slug === selectedSlug);
      if (!route) return;
      renderSelectedRoute(route);
      renderRouteList(currentResult.routes);
      renderGroupMap(currentResult.routes);
    });
  }
}

function renderRouteList(routes) {
  if (!(routeList instanceof HTMLElement)) return;

  routeList.innerHTML = routes
    .map((route) => {
      const active = route.slug === selectedSlug;
      const meta = routeLengthText(route)
        ? `${confidenceLabelText(route.confidence)} - ${routeLengthText(route)}`
        : confidenceLabelText(route.confidence);

      return `
        <button
          class="route-choice${active ? ' route-choice--active' : ''}"
          type="button"
          data-group-route-button
          data-route-slug="${route.slug}"
        >
          <span class="route-choice__kind">Route</span>
          <span class="route-choice__eyebrow">${route.state} | ${route.region}</span>
          <strong class="route-choice__title">${route.reach}</strong>
          <span class="route-choice__score route-choice__score--${ratingToneKey(route.rating)}">
            ${route.score} - ${route.rating}
          </span>
          <span class="route-choice__meta">${meta}</span>
          <span class="route-choice__summary">${summaryLine(route)}</span>
        </button>
      `;
    })
    .join('');

  for (const button of Array.from(routeList.querySelectorAll('[data-group-route-button]'))) {
    if (!(button instanceof HTMLButtonElement)) continue;
    button.addEventListener('click', () => {
      selectedSlug = button.dataset.routeSlug;
      if (!currentResult) return;
      const route = currentResult.routes.find((candidate) => candidate.slug === selectedSlug);
      if (!route) return;
      renderSelectedRoute(route);
      renderRouteList(currentResult.routes);
      renderGroupMap(currentResult.routes);
    });
  }
}

function normalizeRoutes(routes) {
  return routes.map((route) => ({
    slug: route.river.slug,
    name: route.river.name,
    reach: route.river.reach,
    state: route.river.state,
    region: route.river.region,
    latitude: route.river.latitude,
    longitude: route.river.longitude,
    distanceLabel: route.river.distanceLabel,
    gaugeUnit: route.river.gaugeSource?.unit,
    score: route.score,
    rating: route.rating,
    gaugeBand: route.gaugeBand,
    gaugeBandLabel: route.gaugeBandLabel,
    confidence: route.confidence,
    liveData: route.liveData,
    putIn: route.river.putIn,
    takeOut: route.river.takeOut,
    gauge: route.gauge,
    weather: route.weather,
  }));
}

async function loadGroup({ silent = false } = {}) {
  if (!silent) {
    setRefreshState('loading');
  }

  try {
    const response = await fetch(`/api/river-groups/${encodeURIComponent(riverId)}.json`, {
      headers: { accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed for river group ${riverId}: HTTP ${response.status}`);
    }

    const payload = await response.json();
    const result = payload?.result;
    const routes = Array.isArray(result?.routes) ? normalizeRoutes(result.routes) : [];

    if (!routes.length) {
      throw new Error(`River group ${riverId} returned no routes.`);
    }

    currentResult = {
      group: result.group,
      routes,
    };

    if (!selectedSlug || !routes.some((route) => route.slug === selectedSlug)) {
      selectedSlug = routes[0].slug;
    }

    const selectedRoute = routes.find((route) => route.slug === selectedSlug) ?? routes[0];
    renderSelectedRoute(selectedRoute);
    renderRouteList(routes);
    renderGroupMap(routes);

    const liveCount = routes.filter((route) => route.liveData?.overall === 'live').length;
    setBanner(
      liveCount === routes.length ? 'live' : 'degraded',
      `${routes.length} route calls are ready for ${result.group.name}.`,
      liveCount === routes.length
        ? 'All compared routes are using current enough reads right now.'
        : 'At least one route is using stale or partial reads. Open the route page before you drive.'
    );

    lastSuccessAt = Date.now();
    setRefreshState('ready');
  } catch (error) {
    console.error('Failed to load river group page.', error);
    setBanner(
      'offline',
      'Grouped route comparison is unavailable.',
      'Open an individual route page if you need a direct live call right now.'
    );
    setRefreshState('error', 'Last refresh failed. Retry now.');
  }
}

if (refreshButton instanceof HTMLButtonElement) {
  refreshButton.addEventListener('click', () => {
    loadGroup();
  });
}

loadGroup();
window.setInterval(() => {
  loadGroup({ silent: true });
}, AUTO_REFRESH_MS);
