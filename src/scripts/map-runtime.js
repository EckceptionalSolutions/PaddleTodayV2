export const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

const MAP_SCRIPT_URL = 'https://unpkg.com/maplibre-gl@5.3.0/dist/maplibre-gl.js';
const MAP_CSS_URL = 'https://unpkg.com/maplibre-gl@5.3.0/dist/maplibre-gl.css';

let maplibreLoadPromise = null;

export const MAP_PROFILES = Object.freeze({
  interactive: Object.freeze({
    mapOptions: Object.freeze({
      attributionControl: true,
    }),
    navigationControl: true,
  }),
  staticPreview: Object.freeze({
    mapOptions: Object.freeze({
      attributionControl: false,
      interactive: false,
    }),
    navigationControl: false,
  }),
});

export const MAP_VIEWPORT_PROFILES = Object.freeze({
  results: Object.freeze({
    padding: Object.freeze({
      compact: Object.freeze({ top: 22, right: 22, bottom: 22, left: 22 }),
      wide: Object.freeze({ top: 52, right: 52, bottom: 52, left: 52 }),
    }),
    maxZoom: 8.2,
    duration: 0,
  }),
  selectedRiver: Object.freeze({
    padding: Object.freeze({
      compact: Object.freeze({ top: 58, right: 46, bottom: 58, left: 46 }),
      wide: Object.freeze({ top: 86, right: 86, bottom: 86, left: 86 }),
    }),
    maxZoom: 9.2,
    duration: 520,
  }),
  selectedRoute: Object.freeze({
    padding: Object.freeze({
      compact: Object.freeze({ top: 72, right: 72, bottom: 72, left: 72 }),
      wide: Object.freeze({ top: 110, right: 110, bottom: 110, left: 110 }),
    }),
    maxZoom: 11.2,
    duration: 550,
  }),
  stateResults: Object.freeze({
    padding: Object.freeze({
      compact: 28,
      wide: 54,
    }),
    maxZoom: 8.7,
    duration: 500,
  }),
  stateSelectedRoute: Object.freeze({
    padding: Object.freeze({
      compact: 52,
      wide: 82,
    }),
    maxZoom: 10.5,
    duration: 520,
  }),
  favorites: Object.freeze({
    padding: Object.freeze({
      compact: Object.freeze({ top: 24, right: 24, bottom: 24, left: 24 }),
      wide: Object.freeze({ top: 42, right: 42, bottom: 42, left: 42 }),
    }),
    maxZoom: 10.2,
    duration: 650,
  }),
  riverGroupResults: Object.freeze({
    padding: Object.freeze({
      compact: Object.freeze({ top: 42, right: 34, bottom: 42, left: 34 }),
      wide: Object.freeze({ top: 72, right: 72, bottom: 72, left: 72 }),
    }),
    maxZoom: 9.4,
    duration: 520,
  }),
  riverGroupSelected: Object.freeze({
    padding: Object.freeze({
      compact: Object.freeze({ top: 42, right: 34, bottom: 42, left: 34 }),
      wide: Object.freeze({ top: 72, right: 72, bottom: 72, left: 72 }),
    }),
    maxZoom: 11.2,
    duration: 520,
  }),
  detailHero: Object.freeze({
    padding: Object.freeze({
      compact: Object.freeze({ top: 46, right: 46, bottom: 46, left: 46 }),
      wide: Object.freeze({ top: 46, right: 46, bottom: 46, left: 46 }),
    }),
    maxZoom: 9.8,
    duration: 0,
  }),
  detailAccess: Object.freeze({
    padding: Object.freeze({
      compact: Object.freeze({ top: 44, right: 44, bottom: 44, left: 44 }),
      wide: Object.freeze({ top: 44, right: 44, bottom: 44, left: 44 }),
    }),
    maxZoom: 11.6,
    duration: 450,
  }),
  weekendResults: Object.freeze({
    padding: Object.freeze({
      compact: Object.freeze({ top: 28, right: 28, bottom: 28, left: 28 }),
      wide: Object.freeze({ top: 52, right: 52, bottom: 52, left: 52 }),
    }),
    maxZoom: 8.4,
    duration: 0,
  }),
  featuredHome: Object.freeze({
    padding: Object.freeze({
      compact: Object.freeze({ top: 26, right: 26, bottom: 26, left: 26 }),
      wide: Object.freeze({ top: 26, right: 26, bottom: 26, left: 26 }),
    }),
    maxZoom: 10.9,
    duration: 0,
  }),
  featuredExplore: Object.freeze({
    padding: Object.freeze({
      compact: Object.freeze({ top: 34, right: 30, bottom: 34, left: 30 }),
      wide: Object.freeze({ top: 34, right: 30, bottom: 34, left: 30 }),
    }),
    maxZoom: 10.4,
    duration: 0,
  }),
});

function ensureAsset(tagName, attrs) {
  return new Promise((resolve, reject) => {
    const selector = Object.entries(attrs)
      .map(([key, value]) => `[${key}="${String(value).replace(/"/g, '\\"')}"]`)
      .join('');
    const existing = document.head.querySelector(`${tagName}${selector}`);
    if (existing) {
      if (tagName.toLowerCase() !== 'script' || window.maplibregl) {
        resolve(existing);
        return;
      }

      existing.addEventListener('load', () => resolve(existing), { once: true });
      existing.addEventListener(
        'error',
        () => reject(new Error(`Failed to load ${attrs.href || attrs.src || tagName}`)),
        {
          once: true,
        }
      );
      return;
    }

    const element = document.createElement(tagName);
    Object.entries(attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    element.addEventListener('load', () => resolve(element), { once: true });
    element.addEventListener(
      'error',
      () => reject(new Error(`Failed to load ${attrs.href || attrs.src || tagName}`)),
      {
        once: true,
      }
    );
    document.head.appendChild(element);
  });
}

export async function ensureMapLibre() {
  if (window.maplibregl) {
    return window.maplibregl;
  }

  if (!maplibreLoadPromise) {
    maplibreLoadPromise = Promise.all([
      ensureAsset('link', { rel: 'stylesheet', href: MAP_CSS_URL }),
      ensureAsset('script', { src: MAP_SCRIPT_URL }),
    ]).then(() => window.maplibregl);
  }

  return maplibreLoadPromise;
}

export function createPaddleMap(maplibregl, options = {}) {
  if (!maplibregl || typeof maplibregl.Map !== 'function') {
    throw new Error('MapLibre runtime missing.');
  }

  const {
    profile: profileName = 'interactive',
    navigationControl,
    navigationPosition = 'top-right',
    ...mapOptions
  } = options;
  const profile = MAP_PROFILES[profileName];
  if (!profile) {
    throw new Error(`Unknown map profile: ${profileName}`);
  }

  const runtime = new maplibregl.Map({
    style: MAP_STYLE_URL,
    ...profile.mapOptions,
    ...mapOptions,
  });
  const shouldAddNavigation = navigationControl ?? profile.navigationControl;
  if (shouldAddNavigation) {
    if (typeof maplibregl.NavigationControl !== 'function' || typeof runtime.addControl !== 'function') {
      throw new Error('MapLibre navigation control missing.');
    }
    runtime.addControl(new maplibregl.NavigationControl({ showCompass: false }), navigationPosition);
  }

  return runtime;
}

export function isMapReady(runtime) {
  if (!runtime) {
    return false;
  }

  const mapLoaded = typeof runtime.loaded !== 'function' || runtime.loaded();
  const styleLoaded = typeof runtime.isStyleLoaded !== 'function' || runtime.isStyleLoaded();
  return mapLoaded && styleLoaded;
}

export function waitForMapReady(
  runtime,
  {
    timeoutMs = 2500,
    rejectOnError = false,
    rejectOnTimeout = false,
  } = {}
) {
  if (!runtime) {
    return Promise.reject(new Error('Map runtime missing.'));
  }

  if (isMapReady(runtime)) {
    return Promise.resolve(true);
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    let timeoutId = null;
    const events = ['load', 'styledata', 'idle'];

    const cleanup = () => {
      if (timeoutId !== null) {
        globalThis.clearTimeout(timeoutId);
      }
      if (typeof runtime.off === 'function') {
        for (const eventName of events) {
          runtime.off(eventName, handleProgress);
        }
        runtime.off('error', handleError);
      }
    };
    const settle = (callback, value) => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      callback(value);
    };
    const handleProgress = () => {
      if (isMapReady(runtime)) {
        settle(resolve, true);
      }
    };
    const handleError = (event) => {
      if (rejectOnError) {
        settle(reject, event?.error instanceof Error ? event.error : new Error('Map failed to load.'));
      }
    };

    if (typeof runtime.on === 'function') {
      for (const eventName of events) {
        runtime.on(eventName, handleProgress);
      }
      if (rejectOnError) {
        runtime.on('error', handleError);
      }
    }

    timeoutId = globalThis.setTimeout(() => {
      if (rejectOnTimeout) {
        settle(reject, new Error(`Map readiness timed out after ${Math.round(timeoutMs / 1000)} seconds.`));
        return;
      }
      settle(resolve, false);
    }, timeoutMs);
  });
}

export function createMapStatusController(element, messages = {}) {
  const update = (state, context = {}) => {
    if (!element) {
      return false;
    }

    const configuredMessage = messages[state];
    const message = Object.prototype.hasOwnProperty.call(context, 'message')
      ? context.message
      : typeof configuredMessage === 'function'
        ? configuredMessage(context)
        : configuredMessage;

    if (typeof message === 'string' && 'textContent' in element) {
      element.textContent = message;
    }
    if (element.dataset) {
      element.dataset.mapState = state;
    }
    if (typeof element.setAttribute === 'function') {
      element.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
    }

    return true;
  };

  return Object.freeze({
    loading: (context) => update('loading', context),
    ready: (context) => update('ready', context),
    empty: (context) => update('empty', context),
    unavailable: (context) => update('unavailable', context),
  });
}

export function mapViewportOptions(profileName, { compact = false, ...overrides } = {}) {
  const profile = MAP_VIEWPORT_PROFILES[profileName];
  if (!profile) {
    throw new Error(`Unknown map viewport profile: ${profileName}`);
  }

  const { padding, ...profileOptions } = profile;
  return {
    ...profileOptions,
    padding: compact ? padding.compact : padding.wide,
    ...overrides,
  };
}

export function fitMapBounds(
  runtime,
  bounds,
  {
    profile,
    compact = false,
    preserveViewport = false,
    reducedMotion = typeof globalThis.matchMedia === 'function'
      && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches,
    ...options
  } = {}
) {
  if (
    preserveViewport
    || !runtime
    || !bounds
    || typeof runtime.fitBounds !== 'function'
  ) {
    return false;
  }

  const fitOptions = profile
    ? mapViewportOptions(profile, { compact, ...options })
    : { ...options };
  if (reducedMotion) {
    fitOptions.duration = 0;
  }
  runtime.fitBounds(bounds, fitOptions);
  return true;
}

export function clearMapMarkers(markers) {
  for (const marker of Array.isArray(markers) ? markers : []) {
    if (marker && typeof marker.remove === 'function') {
      marker.remove();
    }
  }
  return [];
}

export function createMapMarker({
  maplibregl,
  mapRuntime,
  element,
  point,
  popupHtml = null,
  popupOptions = {},
  bindPopup = false,
  onSelectedChange,
}) {
  if (!maplibregl || typeof maplibregl.Marker !== 'function' || !mapRuntime) {
    throw new Error('Map marker requires MapLibre and an active map.');
  }

  let marker = new maplibregl.Marker({
    element,
    anchor: 'center',
  }).setLngLat([point.longitude, point.latitude]);

  if (popupHtml !== null) {
    if (typeof maplibregl.Popup !== 'function') {
      throw new Error('Map marker popup requires MapLibre Popup support.');
    }
    marker = marker.setPopup(
      new maplibregl.Popup({
        closeButton: true,
        closeOnClick: true,
        ...popupOptions,
      }).setHTML(popupHtml),
    );
  }

  marker = marker.addTo(mapRuntime);
  if (bindPopup && popupHtml !== null) {
    bindMarkerPopup(marker, element, {
      map: mapRuntime,
      onSelectedChange,
    });
  }
  return marker;
}

export function syncGeoJsonOverlay(
  runtime,
  {
    sourceId,
    data,
    layers = [],
    updateData = true,
  },
) {
  if (
    !runtime
    || typeof runtime.getSource !== 'function'
    || typeof runtime.addSource !== 'function'
    || typeof runtime.getLayer !== 'function'
    || typeof runtime.addLayer !== 'function'
  ) {
    throw new Error('GeoJSON overlay requires an active map with source and layer support.');
  }
  if (!sourceId) {
    throw new Error('GeoJSON overlay requires a source id.');
  }

  const source = runtime.getSource(sourceId);
  if (source && updateData && typeof source.setData === 'function') {
    source.setData(data);
  } else if (!source) {
    runtime.addSource(sourceId, { type: 'geojson', data });
  }

  for (const layer of layers) {
    if (!layer?.id || runtime.getLayer(layer.id)) {
      continue;
    }
    runtime.addLayer({
      ...layer,
      source: layer.source ?? sourceId,
    });
  }

  return true;
}

export function removeMapOverlay(
  runtime,
  {
    layerIds = [],
    sourceIds = [],
  } = {},
) {
  if (!runtime) {
    return false;
  }

  for (const layerId of layerIds) {
    if (
      typeof runtime.getLayer === 'function'
      && runtime.getLayer(layerId)
      && typeof runtime.removeLayer === 'function'
    ) {
      runtime.removeLayer(layerId);
    }
  }
  for (const sourceId of sourceIds) {
    if (
      typeof runtime.getSource === 'function'
      && runtime.getSource(sourceId)
      && typeof runtime.removeSource === 'function'
    ) {
      runtime.removeSource(sourceId);
    }
  }

  return true;
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function markerClassForRating(rating, confidenceLabel) {
  if (!rating || !confidenceLabel) {
    return 'score-map-marker score-map-marker--pending';
  }

  const tone =
    rating === 'Strong'
      ? 'great'
      : rating === 'Fair'
        ? 'marginal'
        : String(rating).toLowerCase().replace(/[^a-z]+/g, '-');

  return [
    'score-map-marker',
    `score-map-marker--${tone}`,
    `score-map-marker--confidence-${String(confidenceLabel).toLowerCase()}`,
  ].join(' ');
}

// Map tooltips describe the score tier itself. Readiness warnings remain visible
// in route cards and detail pages, but a Fair score should not be relabeled as
// Skip merely because a separate launch-readiness gate is active.
export function mapCallLabelForRating(rating, context = 'today') {
  if (rating === 'Fair') return 'Watch closely';
  if (rating === 'No-go') return context === 'weekend' ? 'Skip this weekend' : 'Skip today';
  return context === 'weekend' ? 'Paddle this weekend' : 'Paddle today';
}

export function scoreZoneRouteLabel(routeCount, route) {
  if (routeCount !== 1) {
    return `${routeCount} routes in this score zone`;
  }

  const river = route?.river ?? route ?? {};
  const putIn = river.putIn?.name || river.putIn?.id || 'Put-in unavailable';
  const takeOut = river.takeOut?.name || river.takeOut?.id || 'Take-out unavailable';
  return `IN: ${putIn} · OUT: ${takeOut}`;
}

export function bindMarkerPopup(marker, markerNode, options = {}) {
  const ensurePopupVisible = () => {
    const popup = marker.getPopup();
    const map = options.map ?? marker._map;
    if (
      !popup ||
      !map ||
      typeof popup.getElement !== 'function' ||
      typeof map.project !== 'function' ||
      typeof map.unproject !== 'function'
    ) {
      return;
    }

    const popupElement = popup.getElement();
    const mapElement = typeof map.getContainer === 'function' ? map.getContainer() : null;
    if (!(popupElement instanceof HTMLElement) || !(mapElement instanceof HTMLElement)) {
      return;
    }

    const popupRect = popupElement.getBoundingClientRect();
    const mapRect = mapElement.getBoundingClientRect();
    const padding = options.popupPadding ?? 20;

    let shiftX = 0;
    let shiftY = 0;

    if (popupRect.left < mapRect.left + padding) {
      shiftX = mapRect.left + padding - popupRect.left;
    } else if (popupRect.right > mapRect.right - padding) {
      shiftX = mapRect.right - padding - popupRect.right;
    }

    if (popupRect.top < mapRect.top + padding) {
      shiftY = mapRect.top + padding - popupRect.top;
    } else if (popupRect.bottom > mapRect.bottom - padding) {
      shiftY = mapRect.bottom - padding - popupRect.bottom;
    }

    if (Math.abs(shiftX) < 1 && Math.abs(shiftY) < 1) {
      return;
    }

    const markerPoint = map.project(marker.getLngLat());
    const targetCenter = map.unproject([markerPoint.x - shiftX, markerPoint.y - shiftY]);

    map.easeTo({
      center: targetCenter,
      duration: 260,
    });
  };

  const wirePopupControls = () => {
    const popup = marker.getPopup();
    if (!popup || typeof popup.getElement !== 'function') {
      return;
    }

    const popupElement = popup.getElement();
    if (!(popupElement instanceof HTMLElement)) {
      return;
    }

    popupElement.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    const closeButton = popupElement.querySelector('.maplibregl-popup-close-button');
    if (closeButton instanceof HTMLButtonElement && closeButton.dataset.popupBound !== 'true') {
      closeButton.dataset.popupBound = 'true';
      closeButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        popup.remove();
      });
    }
  };

  const applySelectedState = (selected) => {
    markerNode.classList.toggle('score-map-marker--selected', selected);
    markerNode.setAttribute('aria-pressed', selected ? 'true' : 'false');
    if (typeof options.onSelectedChange === 'function') {
      options.onSelectedChange(selected);
    }
  };

  const popup = marker.getPopup();
  if (popup) {
    popup.on('open', () => {
      applySelectedState(true);
      window.setTimeout(() => {
        wirePopupControls();
        ensurePopupVisible();
        window.requestAnimationFrame(() => {
          ensurePopupVisible();
        });
        window.setTimeout(() => {
          ensurePopupVisible();
        }, 180);
      }, 20);
    });
    popup.on('close', () => applySelectedState(false));
  }

  markerNode.addEventListener('keydown', (event) => {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    const currentPopup = marker.getPopup();
    if (!currentPopup) {
      return;
    }

    marker.togglePopup();
  });

  markerNode.addEventListener('click', () => {
    applySelectedState(true);
  });
}

export function riverNameVariants(name) {
  const cleanName = String(name || '').trim();
  if (!cleanName) {
    return [];
  }

  const variants = new Set([cleanName]);
  const withoutParenthetical = cleanName.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  if (withoutParenthetical) {
    variants.add(withoutParenthetical);
  }

  const withoutForkPrefix = cleanName.replace(/^(?:North|South|East|West|Middle|Little|Big)\s+Fork\s+/i, '');
  if (withoutForkPrefix && withoutForkPrefix !== cleanName) {
    variants.add(withoutForkPrefix);
  }

  // OpenMapTiles sometimes omits the generic waterbody suffix from a feature
  // name (for example, "Mississippi" instead of "Mississippi River"). Keep
  // the full name for precise matching, while also accepting that safe alias.
  const withoutWaterbodySuffix = cleanName
    .replace(/\s+(?:River|Creek|Stream|Run|Branch|Lake)\b.*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (withoutWaterbodySuffix && withoutWaterbodySuffix !== cleanName) {
    variants.add(withoutWaterbodySuffix);
  }

  return [...variants];
}

function actualRiverLayerRegistry(mapRuntime) {
  if (!mapRuntime.__paddleTodayActualRiverLayers) {
    mapRuntime.__paddleTodayActualRiverLayers = new Map();
  }

  if (!mapRuntime.__paddleTodayActualRiverLayerListeners) {
    const reapply = () => {
      for (const [layerId, config] of mapRuntime.__paddleTodayActualRiverLayers.entries()) {
        applyActualRiverLayer(mapRuntime, layerId, config.names, config.options);
      }
    };

    mapRuntime.__paddleTodayActualRiverLayerListeners = true;
    if (typeof mapRuntime.on === 'function') {
      mapRuntime.on('load', reapply);
      mapRuntime.on('styledata', reapply);
      mapRuntime.on('idle', reapply);
    }
  }

  return mapRuntime.__paddleTodayActualRiverLayers;
}

function applyActualRiverLayer(mapRuntime, layerId, names, options = {}) {
  if (typeof mapRuntime.getSource === 'function' && !mapRuntime.getSource('openmaptiles')) {
    return;
  }

  const filter = [
    'all',
    ['match', ['geometry-type'], ['LineString', 'MultiLineString'], true, false],
    ['match', ['get', 'class'], ['river', 'stream', 'canal'], true, false],
    [
      'any',
      ['match', ['get', 'name'], names, true, false],
      ['match', ['get', 'name_en'], names, true, false],
      ['match', ['get', 'name:en'], names, true, false],
      ['match', ['get', 'name:latin'], names, true, false],
    ],
  ];

  if (mapRuntime.getLayer(layerId)) {
    mapRuntime.setFilter(layerId, filter);
    mapRuntime.setPaintProperty(layerId, 'line-color', options.lineColor ?? '#2563eb');
    mapRuntime.setPaintProperty(layerId, 'line-width', options.lineWidth ?? 5);
    mapRuntime.setPaintProperty(layerId, 'line-opacity', options.lineOpacity ?? 0.58);
    return;
  }

  mapRuntime.addLayer({
    id: layerId,
    type: 'line',
    source: 'openmaptiles',
    'source-layer': 'waterway',
    filter,
    minzoom: options.minZoom ?? 3.4,
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': options.lineColor ?? '#2563eb',
      'line-width': options.lineWidth ?? 5,
      'line-opacity': options.lineOpacity ?? 0.58,
    },
  });
}

export function syncActualRiverLayer(mapRuntime, layerId, riverNames, options = {}) {
  if (!mapRuntime || typeof mapRuntime.addLayer !== 'function' || typeof mapRuntime.getLayer !== 'function') {
    return;
  }

  const names = [...new Set((riverNames || []).flatMap(riverNameVariants))];
  const registry = actualRiverLayerRegistry(mapRuntime);

  if (names.length === 0) {
    registry.delete(layerId);
    if (mapRuntime.getLayer(layerId)) {
      mapRuntime.removeLayer(layerId);
    }
    return;
  }

  registry.set(layerId, { names, options: { ...options } });
  applyActualRiverLayer(mapRuntime, layerId, names, options);
}
