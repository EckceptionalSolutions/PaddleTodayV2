import { MAP_STYLE_URL, ensureMapLibre, escapeHtml, riverNameVariants, syncActualRiverLayer } from './map-runtime.js';
import { ratingDisplayLabel } from './ui-taxonomy.js';
import { canonicalRiverRouteLineFromFeature, loadCanonicalRiverGeometries } from '../lib/canonical-river-geometries.js';

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
let maplibreRuntime = null;
let markers = [];
let mapRoutes = [];
let selectedRouteSlug = '';
let previewRouteSlug = '';
let activeRoutePopup = null;
let canonicalStateGeometryState = 'idle';
let canonicalStateRouteFeatures = new Map();

const emptyFeatureCollection = {
  type: 'FeatureCollection',
  features: [],
};

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
  const coordinates = routeCoordinates(route);
  if (coordinates.length < 2) {
    return null;
  }

  return {
    type: 'Feature',
    properties: {
      slug: route.slug,
      riverId: route.riverId,
      name: route.name,
      difficulty: route.difficulty,
      routeType: route.routeType,
    },
    geometry: {
      type: 'LineString',
      coordinates: coordinates.map((point) => [point.longitude, point.latitude]),
    },
  };
}

function canonicalStateRouteFeature(route) {
  const feature = canonicalStateRouteFeatures.get(route.slug);
  if (!feature) return null;
  return {
    ...feature,
    properties: {
      ...feature.properties,
      slug: route.slug,
      riverId: route.riverId,
      name: route.name,
      difficulty: route.difficulty,
      routeType: route.routeType,
      traced: true,
    },
  };
}

async function hydrateCanonicalStateGeometry(routes) {
  if (canonicalStateGeometryState !== 'idle') return;
  canonicalStateGeometryState = 'loading';
  try {
    const geometries = await loadCanonicalRiverGeometries({ stateName: statePageElement?.dataset.stateName });
    const entries = await Promise.all(
      routes.map(async (route) => [route.slug, canonicalRiverRouteLineFromFeature(geometries.get(route.slug), routeCoordinates(route))]),
    );
    canonicalStateRouteFeatures = new Map(entries.filter(([, feature]) => feature));
    canonicalStateGeometryState = canonicalStateRouteFeatures.size > 0 ? 'ready' : 'failed';
    if (canonicalStateGeometryState === 'ready' && stateMap) {
      updateMapVisibility();
      refreshSelectedRouteReach();
    }
  } catch (error) {
    canonicalStateGeometryState = 'failed';
    console.warn('Canonical state river geometries unavailable; using map waterways.', error);
  }
}

function finiteCoordinate(point) {
  return Boolean(
    point &&
      typeof point.longitude === 'number' &&
      Number.isFinite(point.longitude) &&
      typeof point.latitude === 'number' &&
      Number.isFinite(point.latitude)
  );
}

function routeCoordinates(route) {
  const accessPoints = (Array.isArray(route.accessPoints) ? route.accessPoints : [])
    .filter(finiteCoordinate)
    .sort((left, right) => {
      const leftMile = Number.isFinite(Number(left.mileFromStart)) ? Number(left.mileFromStart) : 0;
      const rightMile = Number.isFinite(Number(right.mileFromStart)) ? Number(right.mileFromStart) : 0;
      return leftMile - rightMile;
    });
  return [route.putIn, ...accessPoints, route.takeOut].filter(finiteCoordinate);
}

function coordinatePair(point) {
  return finiteCoordinate(point) ? [point.longitude, point.latitude] : null;
}

function flattenRiverGeometry(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'LineString') {
    return [geometry.coordinates].filter((line) => Array.isArray(line) && line.length >= 2);
  }
  if (geometry.type === 'MultiLineString') {
    return geometry.coordinates.filter((line) => Array.isArray(line) && line.length >= 2);
  }
  return [];
}

function projectedPoint(coordinate, referenceLatitude) {
  const latitudeScale = Math.cos((referenceLatitude * Math.PI) / 180);
  return {
    x: coordinate[0] * latitudeScale,
    y: coordinate[1],
  };
}

function distanceToSegmentSquared(point, start, end) {
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

function lineMeasurements(line) {
  const measurements = [0];
  let total = 0;
  for (let index = 1; index < line.length; index += 1) {
    const previous = line[index - 1];
    const current = line[index];
    const referenceLatitude = (previous[1] + current[1]) / 2;
    const start = projectedPoint(previous, referenceLatitude);
    const end = projectedPoint(current, referenceLatitude);
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    total += Math.sqrt(dx * dx + dy * dy);
    measurements.push(total);
  }
  return measurements;
}

function nearestMeasureOnLine(line, measurements, target) {
  let best = null;
  const targetCoordinate = coordinatePair(target);
  if (!targetCoordinate) return null;

  for (let index = 1; index < line.length; index += 1) {
    const previous = line[index - 1];
    const current = line[index];
    const referenceLatitude = (previous[1] + current[1] + targetCoordinate[1]) / 3;
    const result = distanceToSegmentSquared(
      projectedPoint(targetCoordinate, referenceLatitude),
      projectedPoint(previous, referenceLatitude),
      projectedPoint(current, referenceLatitude)
    );
    const segmentLength = measurements[index] - measurements[index - 1];
    const measure = measurements[index - 1] + segmentLength * result.t;
    if (!best || result.distanceSquared < best.distanceSquared) {
      best = { distanceSquared: result.distanceSquared, measure };
    }
  }

  return best;
}

function coordinateAtMeasure(line, measurements, measure) {
  if (measure <= 0) return line[0];
  const total = measurements[measurements.length - 1];
  if (measure >= total) return line[line.length - 1];

  for (let index = 1; index < measurements.length; index += 1) {
    if (measure > measurements[index]) continue;
    const startMeasure = measurements[index - 1];
    const endMeasure = measurements[index];
    const span = endMeasure - startMeasure;
    const t = span === 0 ? 0 : (measure - startMeasure) / span;
    const start = line[index - 1];
    const end = line[index];
    return [start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t];
  }

  return line[line.length - 1];
}

function sliceLineByMeasures(line, measurements, startMeasure, endMeasure) {
  const low = Math.max(0, Math.min(startMeasure, endMeasure));
  const high = Math.min(measurements[measurements.length - 1], Math.max(startMeasure, endMeasure));
  if (!Number.isFinite(low) || !Number.isFinite(high) || high <= low) return [];

  const sliced = [coordinateAtMeasure(line, measurements, low)];
  for (let index = 1; index < line.length - 1; index += 1) {
    if (measurements[index] > low && measurements[index] < high) {
      sliced.push(line[index]);
    }
  }
  sliced.push(coordinateAtMeasure(line, measurements, high));

  return sliced.filter((coordinate, index, coordinates) => {
    const previous = coordinates[index - 1];
    return !previous || previous[0] !== coordinate[0] || previous[1] !== coordinate[1];
  });
}

function featureNameMatchesRoute(feature, route) {
  const routeNames = new Set(riverNameVariants(route.name).map((name) => name.toLowerCase()));
  const properties = feature?.properties ?? {};
  return ['name', 'name_en', 'name:en', 'name:latin'].some((key) => {
    const value = properties[key];
    return typeof value === 'string' && routeNames.has(value.toLowerCase());
  });
}

function renderedRiverLinesForRoute(route) {
  if (!stateMap?.getLayer('state-supported-rivers') || typeof stateMap.queryRenderedFeatures !== 'function') {
    return [];
  }

  const renderedFeatures = stateMap
    .queryRenderedFeatures({ layers: ['state-supported-rivers'] })
    .filter((feature) => featureNameMatchesRoute(feature, route));
  const sourceFeatures =
    typeof stateMap.querySourceFeatures === 'function'
      ? stateMap
          .querySourceFeatures('openmaptiles', { sourceLayer: 'waterway' })
          .filter((feature) => {
            const waterwayClass = feature?.properties?.class;
            return ['river', 'stream', 'canal'].includes(waterwayClass) && featureNameMatchesRoute(feature, route);
          })
      : [];

  const features = [...renderedFeatures, ...sourceFeatures];
  return features.flatMap((feature) => flattenRiverGeometry(feature.geometry));
}

function riverTraceFeature(route) {
  const routePoints = routeCoordinates(route);
  if (routePoints.length < 2) return routeLineFeature(route);

  const canonicalFeature = canonicalStateRouteFeature(route);
  if (canonicalFeature) return canonicalFeature;

  let best = null;
  for (const line of renderedRiverLinesForRoute(route)) {
    const measurements = lineMeasurements(line);
    if (measurements[measurements.length - 1] <= 0) continue;
    const projectedPoints = routePoints.map((point) => nearestMeasureOnLine(line, measurements, point)).filter(Boolean);
    if (projectedPoints.length < 2) continue;

    const score = projectedPoints.reduce((sum, point) => sum + point.distanceSquared, 0) / projectedPoints.length;
    if (!best || score < best.score) {
      best = { line, measurements, points: projectedPoints, score };
    }
  }

  if (best) {
    const measures = best.points.map((point) => point.measure);
    const coordinates = sliceLineByMeasures(best.line, best.measurements, Math.min(...measures), Math.max(...measures));
    if (coordinates.length >= 2) {
      return {
        type: 'Feature',
        properties: {
          slug: route.slug,
          riverId: route.riverId,
          name: route.name,
          difficulty: route.difficulty,
          routeType: route.routeType,
          traced: true,
        },
        geometry: {
          type: 'LineString',
          coordinates,
        },
      };
    }
  }

  const fallback = routeLineFeature(route);
  if (fallback) {
    fallback.properties.traced = false;
  }
  return fallback;
}

function routeMidpoint(route) {
  const coordinates = routeCoordinates(route);
  if (coordinates.length < 2) return routePoint(route);
  const middleIndex = Math.floor((coordinates.length - 1) / 2);
  const left = coordinates[middleIndex];
  const right = coordinates[middleIndex + 1] ?? left;
  return {
    longitude: (left.longitude + right.longitude) / 2,
    latitude: (left.latitude + right.latitude) / 2,
  };
}

function riverLabelData(routes) {
  const groups = new Map();
  for (const route of routes) {
    const point = routeMidpoint(route);
    if (!point) continue;
    const key = route.riverId || route.name;
    const group = groups.get(key) ?? { name: route.name, points: [], routeCount: 0 };
    group.points.push(point);
    group.routeCount += 1;
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

function canonicalStateRiverData(routes) {
  return {
    type: 'FeatureCollection',
    features: routes
      .map((route) => canonicalStateRouteFeature(route))
      .filter(Boolean),
  };
}

function syncCanonicalStateRiverLayer(routes) {
  if (!stateMap) return;
  const sourceId = 'state-supported-rivers-canonical';
  const data = canonicalStateRiverData(routes);
  const source = stateMap.getSource(sourceId);
  if (source && typeof source.setData === 'function') {
    source.setData(data);
  } else if (!source) {
    stateMap.addSource(sourceId, { type: 'geojson', data });
  }

  if (!stateMap.getLayer('state-supported-rivers')) {
    stateMap.addLayer({
      id: 'state-supported-rivers',
      type: 'line',
      source: sourceId,
      minzoom: 3.6,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#16758a',
        'line-width': ['interpolate', ['linear'], ['zoom'], 3.6, 2.8, 6, 4.2, 10, 5],
        'line-opacity': 0.62,
      },
    });
  }
}

function updateMapVisibility() {
  const visible = visibleSlugs();
  const visibleRoutes = mapRoutes.filter((route) => visible.size === 0 || visible.has(route.slug));

  for (const marker of markers) {
    const element = marker.getElement?.();
    if (element instanceof HTMLElement) {
      element.classList.toggle('state-map-marker--muted', visible.size > 0 && !visible.has(element.dataset.routeSlug));
    }
  }

  if (!stateMap) return;
  if (selectedRouteSlug && visible.size > 0 && !visible.has(selectedRouteSlug)) {
    selectedRouteSlug = '';
    previewRouteSlug = '';
    activeRoutePopup?.remove?.();
  }
  if (canonicalStateGeometryState === 'ready') {
    syncActualRiverLayer(stateMap, 'state-supported-rivers', [], {});
    syncCanonicalStateRiverLayer(visibleRoutes);
  } else {
    syncActualRiverLayer(
      stateMap,
      'state-supported-rivers',
      visibleRoutes.map((route) => route.name),
      {
        lineColor: '#16758a',
        lineWidth: 4.5,
        lineOpacity: 0.58,
      }
    );
  }

  const labelSource = stateMap.getSource('state-river-labels');
  if (labelSource && typeof labelSource.setData === 'function') {
    labelSource.setData(riverLabelData(visibleRoutes));
  }

  if (mapStatus instanceof HTMLElement) {
    const riverCount = new Set(visibleRoutes.map((route) => route.riverId || route.name)).size;
    mapStatus.textContent = `Showing ${riverCount} supported ${riverCount === 1 ? 'river' : 'rivers'} and ${visibleRoutes.length} ${visibleRoutes.length === 1 ? 'route' : 'routes'}. Route dots are visible now; zoom in for labels or select a route to trace its reach.`;
  }

  refreshSelectedRouteReach();
}

function updateMarkerZoomMode() {
  if (!stateMap) return;
  const zoom = stateMap.getZoom();
  const overview = zoom < 6.85;
  for (const marker of markers) {
    const element = marker.getElement?.();
    if (!(element instanceof HTMLElement)) continue;
    element.classList.toggle('state-map-marker--overview', overview);
    element.tabIndex = 0;
    element.setAttribute('aria-hidden', 'false');
  }
}

function selectedRoute() {
  const slug = previewRouteSlug || selectedRouteSlug;
  return mapRoutes.find((route) => route.slug === slug) ?? null;
}

function setRouteReachData(feature) {
  const source = stateMap?.getSource('state-route-lines');
  if (!source || typeof source.setData !== 'function') return;
  source.setData(feature ? { type: 'FeatureCollection', features: [feature] } : emptyFeatureCollection);
}

function setSelectedRouteStatus(route, feature) {
  if (!(mapStatus instanceof HTMLElement) || !route) return;
  mapStatus.textContent = feature?.properties?.traced
    ? `Tracing ${route.name}: ${route.reach} along the river line.`
    : `Showing ${route.name}: ${route.reach}. Detailed river geometry was not available here, so this selected reach uses access coordinates.`;
}

function refreshSelectedRouteReach() {
  const route = selectedRoute();
  if (!route) {
    setRouteReachData(null);
    return;
  }

  const feature = riverTraceFeature(route);
  setRouteReachData(feature);
  setSelectedRouteStatus(route, feature);
}

function routeFeatureBounds(feature) {
  if (!feature?.geometry || !maplibreRuntime) return null;
  const lines = flattenRiverGeometry(feature.geometry);
  if (lines.length === 0) return null;

  const bounds = new maplibreRuntime.LngLatBounds();
  let hasBounds = false;
  for (const coordinate of lines.flat()) {
    bounds.extend(coordinate);
    hasBounds = true;
  }
  return hasBounds ? bounds : null;
}

function selectRoute(slug, options = {}) {
  const route = mapRoutes.find((item) => item.slug === slug);
  if (!route) return;

  selectedRouteSlug = slug;
  previewRouteSlug = '';

  const feature = riverTraceFeature(route);
  setRouteReachData(feature);

  for (const marker of markers) {
    const element = marker.getElement?.();
    if (element instanceof HTMLElement) {
      element.classList.toggle('state-map-marker--highlighted', element.dataset.routeSlug === slug);
    }
  }

  if (options.flyTo !== false) {
    const bounds = routeFeatureBounds(feature);
    if (bounds) {
      stateMap.fitBounds(bounds, {
        padding: window.matchMedia('(max-width: 760px)').matches ? 52 : 82,
        maxZoom: 10.5,
        duration: 520,
      });
    }
  }

  if (options.popup && maplibreRuntime) {
    const point = routeMidpoint(route) ?? routePoint(route);
    if (point) {
      activeRoutePopup?.remove?.();
      activeRoutePopup = new maplibreRuntime.Popup({ closeButton: true, closeOnClick: true, maxWidth: '280px' })
        .setLngLat([point.longitude, point.latitude])
        .setHTML(routePopupMarkup(route))
        .addTo(stateMap);
    }
  }

  setSelectedRouteStatus(route, feature);
}

async function renderMap(routes) {
  if (!(mapElement instanceof HTMLElement)) {
    return;
  }

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl) return;
    maplibreRuntime = maplibregl;

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

    mapRoutes = routes;
    const bounds = new maplibregl.LngLatBounds();
    let hasBounds = false;
    syncActualRiverLayer(stateMap, 'state-supported-rivers', routes.map((route) => route.name), {
      lineColor: '#16758a',
      lineWidth: 4.5,
      lineOpacity: 0.58,
    });

    stateMap.addSource('state-route-lines', {
      type: 'geojson',
      data: emptyFeatureCollection,
    });
    stateMap.addLayer({
      id: 'state-route-lines-halo',
      type: 'line',
      source: 'state-route-lines',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'rgba(255, 255, 255, 0.94)',
        'line-width': 8,
        'line-opacity': 0.94,
      },
    });
    stateMap.addLayer({
      id: 'state-route-lines-highlight',
      type: 'line',
      source: 'state-route-lines',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': ['match', ['get', 'difficulty'], 'easy', '#2f7185', 'moderate', '#6f7f3f', '#9d4e38'],
        'line-width': 5,
        'line-opacity': 0.96,
      },
    });

    stateMap.addSource('state-river-labels', {
      type: 'geojson',
      data: riverLabelData(routes),
    });
    stateMap.addLayer({
      id: 'state-river-labels',
      type: 'symbol',
      source: 'state-river-labels',
      minzoom: 5.2,
      layout: {
        'text-field': ['concat', ['get', 'name'], ' · ', ['to-string', ['get', 'routeCount']]],
        'text-font': ['Noto Sans Bold'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 5.2, 10, 8, 13],
        'text-padding': 8,
        'text-allow-overlap': false,
      },
      paint: {
        'text-color': '#173f4c',
        'text-halo-color': 'rgba(255, 255, 255, 0.94)',
        'text-halo-width': 2,
      },
    });

    stateMap.on('click', 'state-route-lines-highlight', (event) => {
      const slug = event.features?.[0]?.properties?.slug;
      if (slug) selectRoute(slug, { popup: true, flyTo: false });
    });
    stateMap.on('mouseenter', 'state-route-lines-highlight', () => {
      stateMap.getCanvas().style.cursor = 'pointer';
    });
    stateMap.on('mouseleave', 'state-route-lines-highlight', () => {
      stateMap.getCanvas().style.cursor = '';
    });
    stateMap.on('moveend', refreshSelectedRouteReach);
    stateMap.on('zoomend', updateMarkerZoomMode);

    // Start the canonical route geometry request as soon as the map is ready;
    // the tile highlight remains a short-lived fallback while it loads.
    hydrateCanonicalStateGeometry(routes);

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

      markerNode.addEventListener('click', () => {
        selectRoute(route.slug, { popup: false });
      });

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
      updateMarkerZoomMode();
      if (mapStatus instanceof HTMLElement) {
        const riverCount = new Set(routes.map((route) => route.riverId || route.name)).size;
        mapStatus.textContent = `Showing ${riverCount} supported rivers and ${markers.length} routes. Route dots are visible now; zoom in for labels or select a route to trace its reach.`;
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
      previewRouteSlug = active ? slug : '';
      for (const marker of markers) {
        const element = marker.getElement?.();
        if (element instanceof HTMLElement && element.dataset.routeSlug === slug) {
          element.classList.toggle('state-map-marker--highlighted', active);
        }
      }
      refreshSelectedRouteReach();
    };

    trigger.addEventListener('mouseenter', () => setHover(true));
    trigger.addEventListener('mouseleave', () => setHover(false));
    trigger.addEventListener('focus', () => setHover(true));
    trigger.addEventListener('blur', () => setHover(false));
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      selectRoute(slug, { popup: true });
    });
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
