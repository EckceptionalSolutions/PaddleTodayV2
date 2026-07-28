import {
  clearMapMarkers,
  createMapStatusController,
  createPaddleMap,
  ensureMapLibre,
  escapeHtml,
  fitMapBounds,
  markerClassForRating,
  riverNameVariants,
  scoreZoneRouteLabel,
  syncActualRiverLayer,
  syncGeoJsonOverlay,
  waitForMapReady,
} from './map-runtime.js';
import { createBoardMapMarker } from './board-map-controller.js';
import { ratingDisplayLabel } from './ui-taxonomy.js';
import { ratingToneKey, todayBoardConfidenceWeight } from '@paddletoday/api-contract';
import { canonicalRiverRouteLineFromFeature, loadCanonicalRiverGeometries } from '../lib/canonical-river-geometries.js';
import {
  coverageCenterForRoutes,
  groupRoutesByConditionScore,
} from '../lib/river-coverage.js';
import { getBrowserApiClient } from './browser-api-client.js';

const root = document.querySelector('[data-state-page]')?.closest('.state-page');

if (!(root instanceof HTMLElement)) {
  throw new Error('Missing state page root.');
}

const mapElement = root.querySelector('[data-state-map]');
const mapStatus = root.querySelector('[data-state-map-status]');
const mapStatusController = createMapStatusController(mapStatus, {
  loading: 'Loading supported river map.',
  empty: 'No route coordinates available.',
  unavailable: 'Static route starts shown. Interactive map unavailable right now.',
});
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
let stateLiveResults = [];
let selectedRouteSlug = '';
let selectedRiverKey = '';
let previewRouteSlug = '';
let activeRoutePopup = null;
let canonicalStateGeometryState = 'idle';
let canonicalStateRouteFeatures = new Map();

const emptyFeatureCollection = {
  type: 'FeatureCollection',
  features: [],
};

function setText(node, value) {
  if (node instanceof HTMLElement) {
    node.textContent = value;
  }
}

function stateName() {
  return statePageElement instanceof HTMLElement ? statePageElement.dataset.stateName || '' : '';
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

  const leftConfidence = todayBoardConfidenceWeight[left?.confidence?.label] ?? 0;
  const rightConfidence = todayBoardConfidenceWeight[right?.confidence?.label] ?? 0;
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

function stateRiverKey(item) {
  const river = item?.river ?? {};
  return river.riverId || river.name || river.slug || '';
}

function stateRiverGroups(results) {
  const groups = new Map();
  for (const item of results) {
    const key = stateRiverKey(item);
    if (!key) continue;
    const existing = groups.get(key);
    if (existing) {
      existing.routes.push(item);
      if (Number(item?.score ?? -1) > Number(existing.representative?.score ?? -1)) {
        existing.representative = item;
      }
      continue;
    }
    groups.set(key, { key, routes: [item], representative: item });
  }
  return [...groups.values()];
}

function stateScoreZonePopupMarkup(group) {
  const item = group.representative;
  const river = item?.river ?? {};
  const routeCount = group.routes.length;
  return `
    <article class="score-map-popup">
      <p class="score-map-popup__state">${escapeHtml(group.regions.join(', ') || river.region || '')}</p>
      <h3>${escapeHtml(river.name || 'River')}</h3>
      <div class="score-map-popup__scoreline">
        <span class="score-map-popup__scorebadge score-map-popup__scorebadge--${escapeHtml(ratingToneKey(group.rating))}">${escapeHtml(String(group.score ?? '--'))}</span>
        <p class="score-map-popup__verdict">${escapeHtml(scoreZoneRouteLabel(routeCount, item))}</p>
      </div>
      <p class="score-map-popup__reach">${escapeHtml(river.reach || 'Mapped coverage')}</p>
      <a class="score-map-popup__link score-map-popup__link--button" href="/rivers/${encodeURIComponent(river.slug || '')}/">View route</a>
    </article>
  `;
}

function syncStateScoreMarkers() {
  if (!stateMap || !maplibreRuntime || stateLiveResults.length === 0) return;
  const visible = visibleSlugs();
  const results = stateLiveResults.filter((item) => visible.size === 0 || visible.has(item?.river?.slug));
  const riverGroups = stateRiverGroups(results);

  markers = clearMapMarkers(markers);

  const selectedGroup = riverGroups.find((group) => group.key === selectedRiverKey);
  let zoneCount = 0;
  for (const group of riverGroups) {
    for (const zone of groupRoutesByConditionScore(group.routes)) {
      const point = coverageCenterForRoutes(zone.routes);
      const representative = zone.representative;
      const river = representative?.river;
      if (!point || !river || zone.score === null) continue;
      zoneCount += 1;

      const markerAriaLabel = `${river.name}, ${zone.regions.join(', ') || 'score zone'}: score ${zone.score}, ${zone.routes.length} ${zone.routes.length === 1 ? 'route' : 'routes'}`;

      const marker = createBoardMapMarker({
        maplibregl: maplibreRuntime,
        mapRuntime: stateMap,
        item: zone,
        point,
        markerClassFor: (mapZone) =>
          `${markerClassForRating(mapZone.rating, mapZone.confidence?.label)} score-map-marker--condition-zone`,
        markerLabel: (mapZone) => String(mapZone.score),
        markerAriaLabel: () => markerAriaLabel,
        popupMarkup: stateScoreZonePopupMarkup,
        popupOptions: { offset: 16, maxWidth: '280px' },
        configureMarkerNode: (node) => {
          node.classList.toggle('score-map-marker--river-expanded', group.key === selectedRiverKey);
          node.classList.toggle('state-map-marker--muted', Boolean(selectedRiverKey) && group.key !== selectedRiverKey);
          node.dataset.routeSlug = river.slug;
          node.dataset.stateRiverKey = group.key;
        },
        onClick: () => {
          selectRiverCoverage(group.key);
          selectRoute(river.slug, { popup: false, preserveRiver: true });
        },
      });
      markers.push(marker);
    }
  }

  updateMarkerZoomMode();
  if (selectedGroup) {
    const river = selectedGroup.representative?.river;
    mapStatusController.ready({
      message: `Showing ${selectedGroup.routes.length} mapped ${river?.name || 'river'} routes across ${groupRoutesByConditionScore(selectedGroup.routes).length} score zones.`,
    });
  } else {
    mapStatusController.ready({
      message: `Showing ${zoneCount} condition ${zoneCount === 1 ? 'zone' : 'zones'} across ${riverGroups.length} supported ${riverGroups.length === 1 ? 'river' : 'rivers'}. Select a zone to highlight its river coverage.`,
    });
  }
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
    const payload = await getBrowserApiClient().getSummary({
      cache: 'no-store',
    });
    stateLiveResults = (Array.isArray(payload?.rivers) ? payload.rivers : [])
      .filter((item) => item?.river?.state === state)
      .sort(compareLiveRoutes);
    const routes = stateLiveResults.slice(0, 4);
    syncStateScoreMarkers();

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
      ${route.routeCount > 1 ? `<p class="score-map-popup__summary">${route.routeCount} trip options share this condition zone.</p>` : ''}
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
  syncGeoJsonOverlay(stateMap, {
    sourceId,
    data,
    layers: [{
      id: 'state-supported-rivers',
      type: 'line',
      minzoom: 3.6,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#16758a',
        'line-width': ['interpolate', ['linear'], ['zoom'], 3.6, 2.8, 6, 4.2, 10, 5],
        'line-opacity': 0.62,
      },
    }],
  });
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
    selectedRiverKey = '';
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
    labelSource.setData(riverLabelData(selectedRiverKey ? routesForSelectedRiver() : visibleRoutes));
  }

  const riverCount = new Set(visibleRoutes.map((route) => route.riverId || route.name)).size;
  mapStatusController.ready({
    message: `Showing ${riverCount} supported ${riverCount === 1 ? 'river' : 'rivers'} and ${visibleRoutes.length} ${visibleRoutes.length === 1 ? 'route' : 'routes'}. Route dots are visible now; zoom in for labels or select a route to trace its reach.`,
  });

  if (stateLiveResults.length > 0) {
    syncStateScoreMarkers();
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

function routesForSelectedRiver() {
  if (!selectedRiverKey) return [];
  const slugs = new Set(
    stateLiveResults
      .filter((item) => stateRiverKey(item) === selectedRiverKey)
      .map((item) => item?.river?.slug)
      .filter(Boolean)
  );
  return mapRoutes.filter((route) => slugs.has(route.slug));
}

function riverCoverageFeatureCollection(routes) {
  return {
    type: 'FeatureCollection',
    features: routes.map((route) => canonicalStateRouteFeature(route) || riverTraceFeature(route)).filter(Boolean),
  };
}

function setRouteReachData(feature) {
  const source = stateMap?.getSource('state-route-lines');
  if (!source || typeof source.setData !== 'function') return;
  source.setData(
    feature?.type === 'FeatureCollection'
      ? feature
      : feature
        ? { type: 'FeatureCollection', features: [feature] }
        : emptyFeatureCollection
  );
}

function setSelectedRouteStatus(route, feature) {
  if (!route) return;
  mapStatusController.ready({
    message: feature?.properties?.traced
      ? `Tracing ${route.name}: ${route.reach} along the river line.`
      : `Showing ${route.name}: ${route.reach}. Detailed river geometry was not available here, so this selected reach uses access coordinates.`,
  });
}

function refreshSelectedRouteReach() {
  if (!previewRouteSlug && selectedRiverKey) {
    const routes = routesForSelectedRiver();
    setRouteReachData(riverCoverageFeatureCollection(routes));
    return;
  }
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

function routeFeaturesBounds(features) {
  if (!maplibreRuntime) return null;
  const bounds = new maplibreRuntime.LngLatBounds();
  let hasBounds = false;
  for (const feature of features) {
    for (const coordinate of flattenRiverGeometry(feature?.geometry).flat()) {
      bounds.extend(coordinate);
      hasBounds = true;
    }
  }
  return hasBounds ? bounds : null;
}

function selectRiverCoverage(key) {
  const group = stateRiverGroups(stateLiveResults).find((item) => item.key === key);
  if (!group) return;

  selectedRiverKey = key;
  selectedRouteSlug = group.representative?.river?.slug || '';
  previewRouteSlug = '';
  activeRoutePopup?.remove?.();

  const routes = routesForSelectedRiver();
  const collection = riverCoverageFeatureCollection(routes);
  setRouteReachData(collection);
  const labelSource = stateMap.getSource('state-river-labels');
  if (labelSource && typeof labelSource.setData === 'function') {
    labelSource.setData(riverLabelData(routes));
  }
  syncStateScoreMarkers();

  const bounds = routeFeaturesBounds(collection.features);
  if (bounds) {
    fitMapBounds(stateMap, bounds, {
      padding: window.matchMedia('(max-width: 760px)').matches ? 42 : 70,
      maxZoom: 9.4,
      duration: 520,
    });
  }
}

function selectRoute(slug, options = {}) {
  const route = mapRoutes.find((item) => item.slug === slug);
  if (!route) return;

  selectedRouteSlug = slug;
  if (!options.preserveRiver) selectedRiverKey = '';
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
      fitMapBounds(stateMap, bounds, {
        profile: 'stateSelectedRoute',
        compact: window.matchMedia('(max-width: 760px)').matches,
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

  mapStatusController.loading();

  try {
    const maplibregl = await ensureMapLibre();
    if (!maplibregl) return;
    maplibreRuntime = maplibregl;

    stateMap = createPaddleMap(maplibregl, {
      container: mapElement,
      center: [-93.6, 45.2],
      zoom: 5.2,
      minZoom: 4,
      maxZoom: 11.5,
    });

    await waitForMapReady(stateMap);

    mapRoutes = routes;
    const bounds = new maplibregl.LngLatBounds();
    let hasBounds = false;
    syncActualRiverLayer(stateMap, 'state-supported-rivers', routes.map((route) => route.name), {
      lineColor: '#16758a',
      lineWidth: 4.5,
      lineOpacity: 0.58,
    });

    syncGeoJsonOverlay(stateMap, {
      sourceId: 'state-route-lines',
      data: emptyFeatureCollection,
      layers: [{
        id: 'state-route-lines-halo',
        type: 'line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': 'rgba(255, 255, 255, 0.94)',
          'line-width': 8,
          'line-opacity': 0.94,
        },
      }, {
        id: 'state-route-lines-highlight',
        type: 'line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': ['match', ['get', 'difficulty'], 'easy', '#2f7185', 'moderate', '#6f7f3f', '#9d4e38'],
          'line-width': 5,
          'line-opacity': 0.96,
        },
      }],
    });

    syncGeoJsonOverlay(stateMap, {
      sourceId: 'state-river-labels',
      data: riverLabelData(routes),
      layers: [{
      id: 'state-river-labels',
      type: 'symbol',
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
      }],
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

    const displayRoutes = collapseRoutesByConditionZone(routes);
    for (const route of displayRoutes) {
      const point = routePoint(route);
      if (!point) continue;

      const marker = createBoardMapMarker({
        maplibregl,
        mapRuntime: stateMap,
        item: route,
        point,
        markerClassFor: (mapRoute) => `state-map-marker state-map-marker--${mapRoute.difficulty}`,
        markerLabel: (mapRoute) =>
          mapRoute.difficulty === 'easy' ? 'E' : mapRoute.difficulty === 'moderate' ? 'M' : 'D',
        markerAriaLabel: (mapRoute) => `${mapRoute.name}: ${mapRoute.reach}`,
        popupMarkup: routePopupMarkup,
        popupOptions: { offset: 16, maxWidth: '280px' },
        configureMarkerNode: (node, mapRoute) => {
          node.dataset.routeSlug = mapRoute.slug;
        },
        onClick: (mapRoute) => {
          selectRoute(mapRoute.slug, { popup: false });
        },
      });

      markers.push(marker);
      bounds.extend([point.longitude, point.latitude]);
      hasBounds = true;
    }

    if (stateLiveResults.length > 0) {
      syncStateScoreMarkers();
    }

    if (hasBounds) {
      fitMapBounds(stateMap, bounds, {
        profile: 'stateResults',
        compact: window.matchMedia('(max-width: 760px)').matches,
      });
      updateMarkerZoomMode();
      const riverCount = new Set(routes.map((route) => route.riverId || route.name)).size;
      mapStatusController.ready({
        message: `Showing ${riverCount} supported rivers and ${markers.length} condition zones. Select a zone to open a representative route.`,
      });
      return;
    }

    mapStatusController.empty();
  } catch (error) {
    console.error('Failed to render state map.', error);
    mapStatusController.unavailable();
  }
}

function collapseRoutesByConditionZone(routes) {
  const groups = new Map();
  for (const route of routes) {
    const key = route.continuityStatus === 'condition-family'
      ? route.conditionZoneId || route.slug
      : route.corridorId || route.conditionZoneId || route.riverId || route.name || route.slug;
    const existing = groups.get(key);
    if (existing) {
      existing.routeCount += 1;
      continue;
    }
    groups.set(key, { ...route, routeCount: 1 });
  }
  return [...groups.values()];
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
