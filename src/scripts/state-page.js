import { MAP_STYLE_URL, ensureMapLibre, escapeHtml } from './map-runtime.js';
import { ratingDisplayLabel } from './ui-taxonomy.js';

const root = document.querySelector('[data-state-page]')?.closest('.state-page');

if (!(root instanceof HTMLElement)) {
  throw new Error('Missing state page root.');
}

const mapElement = root.querySelector('[data-state-map]');
const mapStatus = root.querySelector('[data-state-map-status]');
const routeDataElement = root.querySelector('[data-state-map-routes]');
const statePageElement = root.querySelector('[data-state-page]');
const liveList = root.querySelector('[data-state-live-list]');
const liveStatus = root.querySelector('[data-state-live-status]');
const filterForm = root.querySelector('[data-state-route-filters]');
const filterStatus = root.querySelector('[data-state-filter-status]');
const routeItems = Array.from(root.querySelectorAll('[data-state-route-item]'));
const routeTriggers = Array.from(root.querySelectorAll('[data-state-map-route]'));

let stateMap = null;
let markers = [];
let routeFeatures = [];

const confidenceWeight = {
  High: 3,
  Medium: 2,
  Low: 1,
};

function setText(node, value) {
  if (node instanceof HTMLElement) {
    node.textContent = value;
  }
}

function stateName() {
  return statePageElement instanceof HTMLElement ? statePageElement.dataset.stateName || '' : '';
}

function ratingToneKey(rating) {
  if (rating === 'Strong') return 'great';
  if (rating === 'Fair') return 'marginal';
  return String(rating || 'pending').toLowerCase().replace(/[^a-z]+/g, '-');
}

function difficultyLabel(value) {
  const text = String(value || '');
  return text ? `${text.slice(0, 1).toUpperCase()}${text.slice(1)} difficulty` : '';
}

function gaugeText(item) {
  return item?.summary?.shortExplanation || item?.summary?.cardText || item?.gaugeBandLabel || '';
}

function weatherText(item) {
  return item?.summary?.rawSignalLine || item?.summary?.freshnessText || '';
}

function compareLiveRoutes(left, right) {
  if ((left?.score ?? 0) !== (right?.score ?? 0)) {
    return (right?.score ?? 0) - (left?.score ?? 0);
  }

  const leftConfidence = confidenceWeight[left?.confidence?.label] ?? 0;
  const rightConfidence = confidenceWeight[right?.confidence?.label] ?? 0;
  if (leftConfidence !== rightConfidence) {
    return rightConfidence - leftConfidence;
  }

  return String(left?.river?.name ?? '').localeCompare(String(right?.river?.name ?? ''));
}

function liveCardMarkup(item) {
  const river = item.river || {};
  const facts = [
    river.region,
    river.distanceLabel,
    difficultyLabel(river.difficulty),
    item.confidence?.label ? `${item.confidence.label} confidence` : '',
  ].filter(Boolean);
  const signals = [gaugeText(item), weatherText(item)].filter(Boolean);
  const rating = ratingDisplayLabel(item.rating, { liveData: item.liveData, compact: true });

  return `
    <article class="state-live-card">
      <div class="state-live-card__score score-orb score-orb--${escapeHtml(ratingToneKey(item.rating))}" aria-label="Current Paddle Today score">
        <span>${escapeHtml(String(item.score ?? '--'))}</span>
        <span>${escapeHtml(rating)}</span>
      </div>
      <div class="state-live-card__body">
        <span class="route-choice__eyebrow">${escapeHtml(river.region || river.state || '')}</span>
        <h3>${escapeHtml(river.name || 'Route')}</h3>
        <p>${escapeHtml(river.reach || '')}</p>
        ${facts.length ? `<span>${escapeHtml(facts.join(' | '))}</span>` : ''}
        ${signals.length ? `<small>${escapeHtml(signals.join(' | '))}</small>` : ''}
      </div>
      <a class="river-link river-link--inline route-choice__link" href="/rivers/${encodeURIComponent(river.slug || '')}/">View route</a>
    </article>
  `;
}

async function hydrateLivePicks() {
  if (!(liveList instanceof HTMLElement)) {
    return;
  }

  const state = stateName();
  if (!state) {
    setText(liveStatus, 'Open a route page for current scores.');
    return;
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
    const routes = (Array.isArray(payload?.rivers) ? payload.rivers : [])
      .filter((item) => item?.river?.state === state)
      .sort(compareLiveRoutes)
      .slice(0, 4);

    if (routes.length === 0) {
      setText(liveStatus, `Live scores are unavailable for ${state} right now.`);
      return;
    }

    liveList.innerHTML = routes.map(liveCardMarkup).join('');
    const liveCount = routes.filter((item) => item?.liveData?.overall === 'live').length;
    setText(
      liveStatus,
      liveCount === routes.length
        ? `Showing the top ${routes.length} ${state} routes from current scores.`
        : `Showing the top ${routes.length} ${state} routes; some reads may be stale or partial.`
    );
  } catch (error) {
    console.error('Failed to load state live picks.', error);
    setText(liveStatus, 'Live scores are unavailable right now. Use the route links and source pages before you go.');
  }
}

function parseRoutes() {
  if (!(routeDataElement instanceof HTMLScriptElement)) {
    return [];
  }

  try {
    const routes = JSON.parse(routeDataElement.textContent || '[]');
    return Array.isArray(routes) ? routes : [];
  } catch (error) {
    console.error('Failed to parse state route map data.', error);
    return [];
  }
}

function routePoint(route) {
  if (
    typeof route.putIn?.longitude === 'number' &&
    typeof route.putIn?.latitude === 'number' &&
    Number.isFinite(route.putIn.longitude) &&
    Number.isFinite(route.putIn.latitude)
  ) {
    return {
      longitude: route.putIn.longitude,
      latitude: route.putIn.latitude,
    };
  }

  if (
    typeof route.longitude === 'number' &&
    typeof route.latitude === 'number' &&
    Number.isFinite(route.longitude) &&
    Number.isFinite(route.latitude)
  ) {
    return {
      longitude: route.longitude,
      latitude: route.latitude,
    };
  }

  return null;
}

function routeLineFeature(route) {
  if (
    typeof route.putIn?.longitude !== 'number' ||
    typeof route.putIn?.latitude !== 'number' ||
    typeof route.takeOut?.longitude !== 'number' ||
    typeof route.takeOut?.latitude !== 'number'
  ) {
    return null;
  }

  return {
    type: 'Feature',
    properties: {
      slug: route.slug,
      difficulty: route.difficulty,
      routeType: route.routeType,
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [route.putIn.longitude, route.putIn.latitude],
        [route.takeOut.longitude, route.takeOut.latitude],
      ],
    },
  };
}

function routePopupMarkup(route) {
  const facts = [route.region, route.distanceLabel, route.difficulty].filter(Boolean).join(' | ');
  return `
    <article class="score-map-popup">
      <h3>${escapeHtml(route.name)}</h3>
      <p class="score-map-popup__reach">${escapeHtml(route.reach)}</p>
      ${facts ? `<p class="score-map-popup__summary">${escapeHtml(facts)}</p>` : ''}
      <a class="score-map-popup__link score-map-popup__link--button" href="/rivers/${encodeURIComponent(route.slug)}/">View route</a>
    </article>
  `;
}

function visibleSlugs() {
  return new Set(
    routeItems
      .filter((item) => item instanceof HTMLElement && !item.hidden)
      .map((item) => item.dataset.stateMapRoute)
      .filter(Boolean)
  );
}

function updateMapVisibility() {
  const visible = visibleSlugs();

  for (const marker of markers) {
    const element = marker.getElement?.();
    if (element instanceof HTMLElement) {
      element.classList.toggle('state-map-marker--muted', visible.size > 0 && !visible.has(element.dataset.routeSlug));
    }
  }

  if (!stateMap) return;
  const source = stateMap.getSource('state-route-lines');
  if (!source || typeof source.setData !== 'function') return;

  source.setData({
    type: 'FeatureCollection',
    features: routeFeatures.filter((feature) => visible.size === 0 || visible.has(feature.properties.slug)),
  });
}

async function renderMap(routes) {
  if (!(mapElement instanceof HTMLElement)) {
    return;
  }

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl) return;

    stateMap = new maplibregl.Map({
      container: mapElement,
      style: MAP_STYLE_URL,
      center: [-93.6, 45.2],
      zoom: 5.2,
      minZoom: 4,
      maxZoom: 11.5,
      attributionControl: true,
    });
    stateMap.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    await new Promise((resolve) => {
      if (stateMap.loaded()) {
        resolve();
        return;
      }
      stateMap.once('load', resolve);
    });

    const bounds = new maplibregl.LngLatBounds();
    let hasBounds = false;
    routeFeatures = routes.map(routeLineFeature).filter(Boolean);

    stateMap.addSource('state-route-lines', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: routeFeatures,
      },
    });
    stateMap.addLayer({
      id: 'state-route-lines-base',
      type: 'line',
      source: 'state-route-lines',
      paint: {
        'line-color': ['match', ['get', 'difficulty'], 'easy', '#2f7185', 'moderate', '#6f7f3f', '#9d4e38'],
        'line-width': 2,
        'line-opacity': 0.48,
      },
    });

    for (const route of routes) {
      const point = routePoint(route);
      if (!point) continue;

      const markerNode = document.createElement('button');
      markerNode.type = 'button';
      markerNode.className = `state-map-marker state-map-marker--${route.difficulty}`;
      markerNode.dataset.routeSlug = route.slug;
      markerNode.textContent = route.difficulty === 'easy' ? 'E' : route.difficulty === 'moderate' ? 'M' : 'D';
      markerNode.setAttribute('aria-label', `${route.name}: ${route.reach}`);

      const marker = new maplibregl.Marker({
        element: markerNode,
        anchor: 'center',
      })
        .setLngLat([point.longitude, point.latitude])
        .setPopup(new maplibregl.Popup({ offset: 16, closeButton: true, closeOnClick: true, maxWidth: '280px' }).setHTML(routePopupMarkup(route)))
        .addTo(stateMap);

      markers.push(marker);
      bounds.extend([point.longitude, point.latitude]);
      hasBounds = true;
    }

    if (hasBounds) {
      stateMap.fitBounds(bounds, {
        padding: window.matchMedia('(max-width: 760px)').matches ? 28 : 54,
        maxZoom: 8.7,
        duration: 500,
      });
      if (mapStatus instanceof HTMLElement) {
        mapStatus.textContent = `Showing ${markers.length} tracked route starts.`;
      }
      return;
    }

    if (mapStatus instanceof HTMLElement) {
      mapStatus.textContent = 'No route coordinates available.';
    }
  } catch (error) {
    console.error('Failed to render state map.', error);
    if (mapStatus instanceof HTMLElement) {
      mapStatus.textContent = 'Static route starts shown. Interactive map unavailable right now.';
    }
  }
}

function currentFilterValue(name) {
  if (!(filterForm instanceof HTMLFormElement)) {
    return '';
  }

  const field = filterForm.elements.namedItem(name);
  return field instanceof HTMLSelectElement ? field.value : '';
}

function applyFilters() {
  const filters = {
    difficulty: currentFilterValue('difficulty'),
    region: currentFilterValue('region'),
    river: currentFilterValue('river'),
    routeType: currentFilterValue('routeType'),
  };

  let visibleCount = 0;
  for (const item of routeItems) {
    if (!(item instanceof HTMLElement)) continue;

    const visible = Object.entries(filters).every(([key, value]) => !value || item.dataset[key] === value);
    item.hidden = !visible;
    if (visible) visibleCount += 1;
  }

  if (filterStatus instanceof HTMLElement) {
    filterStatus.textContent = `Showing ${visibleCount} of ${routeItems.length} routes.`;
  }

  updateMapVisibility();
}

function bindFilters() {
  if (!(filterForm instanceof HTMLFormElement)) {
    return;
  }

  filterForm.addEventListener('change', applyFilters);
  filterForm.addEventListener('reset', () => {
    window.setTimeout(applyFilters, 0);
  });
}

function bindRouteFocus() {
  for (const trigger of routeTriggers) {
    if (!(trigger instanceof HTMLElement)) continue;
    const slug = trigger.dataset.stateMapRoute;
    if (!slug) continue;

    const setHover = (active) => {
      for (const marker of markers) {
        const element = marker.getElement?.();
        if (element instanceof HTMLElement && element.dataset.routeSlug === slug) {
          element.classList.toggle('state-map-marker--highlighted', active);
        }
      }
    };

    trigger.addEventListener('mouseenter', () => setHover(true));
    trigger.addEventListener('mouseleave', () => setHover(false));
    trigger.addEventListener('focus', () => setHover(true));
    trigger.addEventListener('blur', () => setHover(false));
  }
}

function highlightHashTarget() {
  const targetId = window.location.hash ? window.location.hash.slice(1) : '';
  if (!targetId) return;

  const target = document.getElementById(targetId);
  if (!(target instanceof HTMLElement)) return;

  target.classList.add('state-directory-group--target');
  window.setTimeout(() => {
    target.classList.remove('state-directory-group--target');
  }, 1800);
}

bindFilters();
window.addEventListener('hashchange', highlightHashTarget);
highlightHashTarget();
hydrateLivePicks();
renderMap(parseRoutes()).then(() => {
  bindRouteFocus();
  applyFilters();
});
