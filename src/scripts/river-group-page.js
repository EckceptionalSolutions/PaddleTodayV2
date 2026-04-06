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
const groupMap = root.querySelector('[data-group-map]');
const groupMapStatus = root.querySelector('[data-group-map-status]');
const groupMapToggle = root.querySelector('[data-group-map-toggle]');
const phoneBreakpoint = window.matchMedia('(max-width: 760px)');

const AUTO_REFRESH_MS = 5 * 60 * 1000;
const BULLET = ' \u2022 ';
const DEG_F = '\u00B0F';

let lastSuccessAt = null;
let currentResult = null;
let selectedSlug = null;
let mapRuntime = null;
let mapMarkers = [];
let groupMapCollapsed = phoneBreakpoint.matches;

function setText(field, value) {
  const elements = Array.from(root.querySelectorAll(`[data-field="${field}"]`));
  for (const element of elements) {
    element.textContent = value;
  }
  return elements[0] ?? null;
}

function decisionLabel(rating) {
  if (rating === 'Strong') return 'Great today';
  if (rating === 'Good') return 'Solid option';
  if (rating === 'Fair') return 'Mixed call';
  return 'Skip today';
}

function confidenceDisplayLabel(label) {
  if (label === 'High') return 'Well-supported';
  if (label === 'Medium') return 'Some uncertainty';
  if (label === 'Low') return 'Cautious call';
  return 'Support unclear';
}

function ratingToneKey(rating) {
  if (rating === 'Strong') return 'great';
  if (rating === 'Fair') return 'marginal';
  return String(rating).toLowerCase().replace(/[^a-z]+/g, '-');
}

function confidenceLabelText(confidence) {
  return confidence?.label ? confidenceDisplayLabel(confidence.label) : 'Loading support';
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
  return route.distanceLabel || '';
}

function metaLine(route) {
  const parts = [confidenceLabelText(route.confidence)];
  if (routeLengthText(route)) {
    parts.push(routeLengthText(route));
  }
  return parts.join(BULLET);
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
      return 'River is in shape, but harsh weather lowers today’s call.';
    }
    if (hasStableFlow && hasWeatherRisk) {
      return 'Good flow, but weather lowers today’s call.';
    }
    return 'Conditions stack up against this route today.';
  }

  if (route.rating === 'Fair') {
    if (coldWeatherDrivenRoute(route) || hasColdWeather) {
      return 'Runnable, but harsh weather makes this a tougher trip today.';
    }
    if (hasWeatherRisk) {
      return 'Workable flow, but weather makes this less reliable today.';
    }
    if (hasChangingFlow) {
      return 'Usable now, but changing flow makes this a weaker pick.';
    }
    return 'Possible today, but cleaner calls are on this river.';
  }

  if (route.rating === 'Strong') {
    return 'Strong conditions make this the clearest route today.';
  }

  if (route.rating === 'Good') {
    if (hasColdWeather) {
      return 'Solid river conditions, but cold weather still matters today.';
    }
    if (hasWeatherRisk) {
      return 'Solid flow, but weather adds some caution later today.';
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
  const meta = [confidenceLabelText(route.confidence), `Score ${route.score}`];
  if (routeLengthText(route)) {
    meta.push(routeLengthText(route));
  }

  return `
    <article class="score-map-popup">
      <p class="score-map-popup__state">${escapeHtml(route.state)} | ${escapeHtml(route.region)}</p>
      <h3>${escapeHtml(route.name)}</h3>
      <p class="score-map-popup__reach">${escapeHtml(route.reach)}</p>
      <p class="score-map-popup__verdict">${escapeHtml(decisionLabel(route.rating))}</p>
      <p class="score-map-popup__summary">${escapeHtml(decisionSummary(route))}</p>
      <p class="score-map-popup__meta">${escapeHtml(meta.join(' • '))}</p>
      <a class="score-map-popup__link score-map-popup__link--button" href="/rivers/${encodeURIComponent(route.slug)}/">View route</a>
    </article>
  `;
}

function updateGroupMapToggle() {
  if (!(groupMap instanceof HTMLElement) || !(groupMapToggle instanceof HTMLButtonElement)) {
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
      if (route.slug === selectedSlug) {
        markerNode.classList.add('score-map-marker--selected');
      }
      markerNode.innerHTML = `<span>${route.score}</span>`;
      markerNode.setAttribute(
        'aria-label',
        `${route.reach}: score ${route.score}, ${confidenceDisplayLabel(route.confidence.label).toLowerCase()}`
      );

      const marker = new maplibregl.Marker({
        element: markerNode,
        anchor: 'center',
      })
        .setLngLat([midpoint.longitude, midpoint.latitude])
        .setPopup(
          new maplibregl.Popup({ offset: 18, closeButton: true, closeOnClick: true, maxWidth: '288px' }).setHTML(routePopupMarkup(route))
        )
        .addTo(mapRuntime);

      bindMarkerPopup(marker, markerNode, {
        map: mapRuntime,
        onSelectedChange(selected) {
          if (!selected || route.slug === selectedSlug || !currentResult) {
            return;
          }
          selectedSlug = route.slug;
          renderRouteList(currentResult.routes);
        },
      });
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

    if (source && typeof source.setData === 'function') {
      source.setData(data);
    } else if (!source) {
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
      const compact = window.matchMedia('(max-width: 720px)').matches;
      mapRuntime.fitBounds(bounds, {
        padding: compact
          ? { top: 22, right: 22, bottom: 22, left: 22 }
          : { top: 46, right: 46, bottom: 46, left: 46 },
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

function renderRouteList(routes) {
  if (!(routeList instanceof HTMLElement)) return;

  routeList.innerHTML = routes
    .map((route) => {
      const active = route.slug === selectedSlug;

      return `
        <article
          class="route-choice${active ? ' route-choice--active' : ''}"
          tabindex="0"
          role="button"
          data-group-route-card
          data-route-slug="${route.slug}"
        >
          <span class="route-choice__kind">Route</span>
          <span class="route-choice__eyebrow">${route.state} | ${route.region}</span>
          <strong class="route-choice__title">${route.reach}</strong>
          <span class="route-choice__verdict">${decisionLabel(route.rating)}</span>
          <div class="route-choice__scoreline">
            <span class="route-choice__score route-choice__score--${ratingToneKey(route.rating)}">
              ${route.score}
            </span>
            <span class="route-choice__meta">${metaLine(route)}</span>
          </div>
          <span class="route-choice__summary">${decisionSummary(route)}</span>
          <span class="route-choice__signal">
            ${signalRowMarkup(route)}
          </span>
          ${supportingNote(route) ? `<span class="route-choice__note">${escapeHtml(supportingNote(route))}</span>` : ''}
          <div class="route-choice__footer">
            <span class="route-choice__selection">${active ? 'Shown on map' : 'Show on map'}</span>
            <a class="river-link river-link--inline route-choice__link" href="/rivers/${encodeURIComponent(route.slug)}/">View route</a>
          </div>
        </article>
      `;
    })
    .join('');

  for (const card of Array.from(routeList.querySelectorAll('[data-group-route-card]'))) {
    if (!(card instanceof HTMLElement)) continue;

    const selectRoute = () => {
      selectedSlug = card.dataset.routeSlug;
      if (!currentResult) return;
      const route = currentResult.routes.find((candidate) => candidate.slug === selectedSlug);
      if (!route) return;
      renderRouteList(currentResult.routes);
      renderGroupMap(currentResult.routes);
    };

    card.addEventListener('click', (event) => {
      if ((event.target instanceof HTMLElement) && event.target.closest('a')) {
        return;
      }
      selectRoute();
    });

    card.addEventListener('keydown', (event) => {
      if (!(event instanceof KeyboardEvent)) {
        return;
      }

      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      event.preventDefault();
      selectRoute();
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
      'Route comparison is unavailable right now.',
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

if (groupMapToggle instanceof HTMLButtonElement) {
  groupMapToggle.addEventListener('click', () => {
    groupMapCollapsed = !groupMapCollapsed;
    updateGroupMapToggle();
  });
}

phoneBreakpoint.addEventListener('change', () => {
  updateGroupMapToggle();
});

updateGroupMapToggle();
loadGroup();
window.setInterval(() => {
  loadGroup({ silent: true });
}, AUTO_REFRESH_MS);
