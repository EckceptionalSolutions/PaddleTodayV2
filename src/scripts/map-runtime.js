export const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

export function preferredMapScrollBehavior() {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
}

const MAP_SCRIPT_URL = 'https://unpkg.com/maplibre-gl@5.3.0/dist/maplibre-gl.js';
const MAP_CSS_URL = 'https://unpkg.com/maplibre-gl@5.3.0/dist/maplibre-gl.css';

let maplibreLoadPromise = null;
const assetLoads = new Map();
const assetAttempts = new Map();
const activeMapPopups = new WeakMap();
const mapsWithLoadedBackground = new WeakSet();
const MAP_ASSET_TIMEOUT_MS = 15000;

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
      compact: Object.freeze({ top: 32, right: 84, bottom: 96, left: 32 }),
      wide: Object.freeze({ top: 42, right: 64, bottom: 64, left: 42 }),
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
      // Reserve wrapped attribution before source metadata arrives, as well
      // as access labels and zoom controls.
      compact: Object.freeze({ top: 56, right: 76, bottom: 108, left: 44 }),
      wide: Object.freeze({ top: 44, right: 76, bottom: 60, left: 44 }),
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
  const selector = tagName + Object.entries(attrs)
    .map(([key, value]) => `[${key}="${String(value).replace(/"/g, '\\"')}"]`)
    .join('');
  if (assetLoads.has(selector)) return assetLoads.get(selector);

  const attempt = assetAttempts.get(selector) ?? 0;
  const promise = new Promise((resolve, reject) => {
    const existing = document.head.querySelector(selector);
    if (existing && (tagName === 'link' ? existing.sheet : window.maplibregl)) {
      resolve(existing);
      return;
    }
    const element = existing ?? document.createElement(tagName);
    const cleanup = () => {
      globalThis.clearTimeout(timeout);
      element.removeEventListener('load', loaded);
      element.removeEventListener('error', failed);
    };
    const loaded = () => {
      if (tagName === 'script' && !window.maplibregl) { failed(); return; }
      cleanup();
      resolve(element);
    };
    const failed = () => {
      cleanup();
      // A failed tag will never emit another load event. Remove it so a later
      // user action can make a fresh request instead of waiting on a dead tag.
      element.remove();
      assetAttempts.set(selector, attempt + 1);
      reject(new Error(`Failed to load ${attrs.href || attrs.src || tagName}`));
    };
    const timeout = globalThis.setTimeout(failed, MAP_ASSET_TIMEOUT_MS);
    element.addEventListener('load', loaded);
    element.addEventListener('error', failed);
    if (!existing) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (attempt && (key === 'href' || key === 'src')) {
          // A removed script can keep downloading. Give retries their own URL
          // so the browser cannot attach them to that stalled request.
          const url = new URL(value, document.baseURI);
          url.searchParams.set('paddle_retry', String(attempt));
          value = url.href;
        }
        element.setAttribute(key, value);
      });
      document.head.appendChild(element);
    }
  }).catch((error) => {
    assetLoads.delete(selector);
    throw error;
  });
  assetLoads.set(selector, promise);
  return promise;
}

export async function ensureMapLibre() {
  if (window.maplibregl && assetLoads.size === 0) {
    return window.maplibregl;
  }

  if (!maplibreLoadPromise) {
    maplibreLoadPromise = Promise.all([
      ensureAsset('link', { rel: 'stylesheet', href: MAP_CSS_URL }),
      ensureAsset('script', { src: MAP_SCRIPT_URL }),
    ]).then(() => {
      if (!window.maplibregl) throw new Error('MapLibre runtime missing after download.');
      return window.maplibregl;
    }).catch((error) => {
      maplibreLoadPromise = null;
      throw error;
    });
  }

  return maplibreLoadPromise;
}

function bindMapTileRecovery(runtime) {
  if (typeof window === 'undefined' || typeof window.addEventListener !== 'function'
    || typeof runtime.on !== 'function' || typeof runtime.off !== 'function') return;
  const failedOfflineSources = new Set();
  const retryTimes = new Map();
  const retryTimers = new Map();
  let failedGlyphUrl = null;
  let hasLoaded = false;
  const markLoaded = () => {
    hasLoaded = true;
    runtime.off('load', markLoaded);
  };
  const reloadSource = (id) => {
    const specification = runtime.getStyle?.()?.sources?.[id];
    if (!['vector', 'geojson'].includes(specification?.type)) return;
    const source = runtime.getSource?.(id);
    if (failedGlyphUrl) {
      // Failed glyph promises remain cached in MapLibre 5.3. Clear that cache
      // through its public API before retrying the affected source's tiles.
      if (runtime.getGlyphs?.() === failedGlyphUrl) runtime.setGlyphs?.(failedGlyphUrl);
      failedGlyphUrl = null;
    }
    // Public source APIs reload failed tiles while retaining route overlays and camera.
    if (Array.isArray(specification.tiles) && typeof source?.setTiles === 'function') {
      source.setTiles(specification.tiles);
    } else if (typeof specification.url === 'string' && typeof source?.setUrl === 'function') {
      source.setUrl(specification.url);
    } else if (specification.type === 'geojson' && typeof source?.setData === 'function') {
      source.setData(specification.data);
    }
  };
  const rememberFailure = (event) => {
    const id = event?.sourceId;
    if (typeof id !== 'string') return;
    const type = runtime.getSource?.(id)?.type;
    if (!['vector', 'geojson'].includes(type)) return;
    const glyphUrl = runtime.getGlyphs?.();
    const prefix = typeof glyphUrl === 'string' ? glyphUrl.split('{')[0] : '';
    const isGlyphFailure = prefix && typeof event?.error?.url === 'string' && event.error.url.startsWith(prefix);
    if (type !== 'vector' && !isGlyphFailure) return;
    if (globalThis.navigator?.onLine === false) {
      if (isGlyphFailure) failedGlyphUrl = glyphUrl;
      failedOfflineSources.add(id);
      return;
    }
    const status = event?.error?.status;
    if ((!hasLoaded && !isGlyphFailure) || !(status === 0 || status === 408 || (status >= 500 && status < 600))) return;
    if (isGlyphFailure) failedGlyphUrl = glyphUrl;
    const previous = retryTimes.get(id);
    if (previous !== undefined && Date.now() - previous < 30000) return;
    // Coalesce a failed viewport's tiles into one bounded retry, without a retry loop.
    retryTimes.set(id, Date.now());
    retryTimers.set(id, setTimeout(() => {
      retryTimers.delete(id);
      if (globalThis.navigator?.onLine === false) failedOfflineSources.add(id);
      else reloadSource(id);
    }, 1500));
  };
  const recoverOnline = () => {
    if (!failedOfflineSources.size) return;
    const pending = [...failedOfflineSources];
    failedOfflineSources.clear();
    for (const id of pending) {
      clearTimeout(retryTimers.get(id));
      retryTimers.delete(id);
      retryTimes.delete(id);
      reloadSource(id);
    }
  };
  const cleanup = () => {
    window.removeEventListener('online', recoverOnline);
    runtime.off('load', markLoaded);
    runtime.off('error', rememberFailure);
    runtime.off('remove', cleanup);
    for (const timer of retryTimers.values()) clearTimeout(timer);
    retryTimers.clear();
    retryTimes.clear();
    failedOfflineSources.clear();
    failedGlyphUrl = null;
  };
  runtime.on('load', markLoaded);
  runtime.on('error', rememberFailure);
  runtime.on('remove', cleanup);
  window.addEventListener('online', recoverOnline);
}

const deferredMapStyleOperations = new WeakMap();

function bindMapGraphicsRecovery(runtime) {
  if (typeof runtime.on !== 'function' || typeof runtime.off !== 'function'
    || typeof runtime.setStyle !== 'function') return;
  const container = runtime.getContainer?.();
  const status = typeof HTMLElement !== 'undefined' && container instanceof HTMLElement
    ? document.createElement('p') : null;
  if (status) {
    status.className = 'map-graphics-status';
    status.setAttribute('role', 'status');
    container.append(status);
  }
  let contextLost = false;
  const graphicsLost = () => {
    contextLost = true;
    if (status && !status.textContent) status.textContent = 'Restoring map display…';
  };
  const idle = () => {
    if (!contextLost && !deferredMapStyleOperations.has(runtime) && status?.textContent) status.textContent = '';
  };
  const restore = () => {
    contextLost = false;
    const style = runtime.getStyle?.();
    if (!style?.layers) return;
    if (!deferredMapStyleOperations.has(runtime)) deferredMapStyleOperations.set(runtime, []);
    // MapLibre 5.3 can retain invalid GPU resources after context restoration.
    // Rebuild the current style, including route sources, without replacing the
    // map, its camera, DOM markers, or open popups.
    runtime.setStyle(style, { diff: false });
  };
  const styleLoaded = () => {
    const pending = deferredMapStyleOperations.get(runtime);
    deferredMapStyleOperations.delete(runtime);
    for (const operation of pending ?? []) operation();
  };
  const cleanup = () => {
    status?.remove();
    deferredMapStyleOperations.delete(runtime);
    runtime.off('webglcontextlost', graphicsLost);
    runtime.off('webglcontextrestored', restore);
    runtime.off('style.load', styleLoaded);
    runtime.off('idle', idle);
    runtime.off('remove', cleanup);
  };
  runtime.on('webglcontextlost', graphicsLost);
  runtime.on('webglcontextrestored', restore);
  runtime.on('style.load', styleLoaded);
  runtime.on('idle', idle);
  runtime.on('remove', cleanup);
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

  const container = typeof mapOptions.container === 'string' && typeof document !== 'undefined'
    ? document.getElementById(mapOptions.container) : mapOptions.container;
  const hasContainer = typeof HTMLElement !== 'undefined' && container instanceof HTMLElement;
  const originalChildren = hasContainer ? new Set(container.childNodes) : null;
  const hadMapClass = hasContainer && container.classList.contains('maplibregl-map');
  let runtime;
  try {
    runtime = new maplibregl.Map({
      style: MAP_STYLE_URL,
      ...profile.mapOptions,
      ...mapOptions,
    });
    const mapLabel = hasContainer && container.getAttribute('aria-label');
    if (mapLabel) runtime.getCanvas?.()?.setAttribute('aria-label', mapLabel);
    const shouldAddNavigation = navigationControl ?? profile.navigationControl;
    if (shouldAddNavigation) {
      if (typeof maplibregl.NavigationControl !== 'function' || typeof runtime.addControl !== 'function') {
        throw new Error('MapLibre navigation control missing.');
      }
      runtime.addControl(new maplibregl.NavigationControl({ showCompass: false }), navigationPosition);
    }
    if (typeof runtime.on === 'function' && typeof runtime.off === 'function') {
      const stopTracking = () => {
        runtime.off('load', backgroundLoaded);
        runtime.off('remove', stopTracking);
      };
      const backgroundLoaded = () => {
        mapsWithLoadedBackground.add(runtime);
        stopTracking();
      };
      runtime.on('load', backgroundLoaded);
      runtime.on('remove', stopTracking);
    }
    bindMapTileRecovery(runtime);
    bindMapGraphicsRecovery(runtime);
    return runtime;
  } catch (error) {
    runtime?.remove?.();
    // A constructor that fails to initialize WebGL has already inserted its
    // canvas, but provides no runtime to remove. Preserve pre-existing fallback
    // nodes and clear only the partial initialization before a later retry.
    if (hasContainer) {
      for (const child of [...container.childNodes]) {
        if (!originalChildren.has(child)) child.remove();
      }
      if (!hadMapClass) container.classList.remove('maplibregl-map');
    }
    throw error;
  }
}

export function destroyMapRuntime(runtime) {
  runtime?.remove?.();
  return null;
}

export function isMapReady(runtime) {
  if (!runtime) {
    return false;
  }

  const mapLoaded = typeof runtime.loaded !== 'function' || runtime.loaded();
  const styleLoaded = typeof runtime.isStyleLoaded !== 'function' || runtime.isStyleLoaded();
  return mapLoaded && styleLoaded;
}

export function isMapStyleReady(runtime) {
  return Boolean(runtime && (Array.isArray(runtime.getStyle?.()?.layers) || isMapReady(runtime)));
}

export function waitForMapReady(
  runtime,
  {
    timeoutMs = 2500,
    rejectOnError = false,
    rejectOnTimeout = false,
    waitForTiles = true,
  } = {}
) {
  if (!runtime) {
    return Promise.reject(new Error('Map runtime missing.'));
  }

  // getStyle() becomes available once the style can accept route overlays,
  // before its background tiles necessarily finish downloading.
  const ready = () => waitForTiles ? isMapReady(runtime) : isMapStyleReady(runtime);
  if (ready()) {
    return Promise.resolve(true);
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    let timeoutId = null;
    const events = ['load', 'style.load', 'styledata', 'idle'];

    const cleanup = () => {
      if (timeoutId !== null) {
        globalThis.clearTimeout(timeoutId);
      }
      if (typeof runtime.off === 'function') {
        for (const eventName of events) {
          runtime.off(eventName, handleProgress);
        }
        runtime.off('error', handleError);
        runtime.off('remove', handleRemove);
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
      if (ready()) {
        settle(resolve, true);
      }
    };
    const handleError = (event) => {
      if (rejectOnError) {
        settle(reject, event?.error instanceof Error ? event.error : new Error('Map failed to load.'));
      }
    };
    const handleRemove = () => settle(reject, new Error('Map removed before it became ready.'));

    if (typeof runtime.on === 'function') {
      for (const eventName of events) {
        runtime.on(eventName, handleProgress);
      }
      if (rejectOnError) {
        runtime.on('error', handleError);
      }
      runtime.on('remove', handleRemove);
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

export function captureMapResultFocus(container, keyAttribute = 'data-summary-map-item') {
  if (typeof document === 'undefined' || typeof HTMLElement === 'undefined'
    || !(container instanceof HTMLElement)) return () => {};
  const focused = document.activeElement;
  const row = focused instanceof HTMLElement && container.contains(focused)
    ? focused.closest(`[${keyAttribute}]`) : null;
  const key = row?.getAttribute(keyAttribute);
  if (!key) return () => {};
  const position = [...container.querySelectorAll(`[${keyAttribute}]`)].indexOf(row);
  const controlTag = focused === row ? null : focused.tagName.toLowerCase();
  return () => {
    // Respect focus deliberately moved elsewhere by the caller while rendering.
    if (document.activeElement !== document.body && document.activeElement !== focused) return;
    const rows = [...container.querySelectorAll(`[${keyAttribute}]`)];
    const replacement = rows.find(element => element.getAttribute(keyAttribute) === key)
      ?? rows[Math.min(Math.max(position, 0), rows.length - 1)];
    const target = controlTag ? replacement?.querySelector(controlTag) : replacement;
    if (target instanceof HTMLElement) target.focus({ preventScroll: true });
  };
}

export function createMapStatusController(element, messages = {}) {
  let backgroundCleanup = null;
  const update = (state, context = {}) => {
    backgroundCleanup?.();
    if (!element) {
      return false;
    }

    const configuredMessage = messages[state];
    let message = Object.prototype.hasOwnProperty.call(context, 'message')
      ? context.message
      : typeof configuredMessage === 'function'
        ? configuredMessage(context)
        : configuredMessage;

    const backgroundMap = context.backgroundMap;
    let backgroundLoading = false;
    if (state === 'ready' && backgroundMap && !mapsWithLoadedBackground.has(backgroundMap)
      && !isMapReady(backgroundMap) && typeof backgroundMap.on === 'function' && typeof backgroundMap.off === 'function') {
      const baseMessage = typeof message === 'string' ? message : element.textContent || '';
      const loaded = () => update('ready', { ...context, message: baseMessage, backgroundMap: null });
      const cleanup = () => {
        backgroundMap.off('load', loaded);
        backgroundMap.off('remove', cleanup);
        if (element.dataset) delete element.dataset.mapBackgroundLoading;
        if (backgroundCleanup === cleanup) backgroundCleanup = null;
      };
      backgroundCleanup = cleanup;
      backgroundMap.on('load', loaded);
      backgroundMap.on('remove', cleanup);
      backgroundLoading = true;
      message = `${baseMessage}${baseMessage ? ' ' : ''}Background map is loading.`;
    }

    if (typeof message === 'string' && 'textContent' in element && element.textContent !== message) {
      element.textContent = message;
    }
    if (element.dataset) {
      element.dataset.mapState = state;
      if (backgroundLoading) element.dataset.mapBackgroundLoading = 'true';
      else delete element.dataset.mapBackgroundLoading;
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

  const accessibleLabel = element?.getAttribute?.('aria-label');
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
  // MapLibre initializes popup markers with the generic name "Map marker".
  if (accessibleLabel != null) element.setAttribute('aria-label', accessibleLabel);
  if (bindPopup && popupHtml !== null) {
    bindMarkerPopup(marker, element, {
      map: mapRuntime,
      onSelectedChange,
    });
  }
  return marker;
}

const overlaySourceData = new WeakMap();

export function syncGeoJsonOverlay(
  runtime,
  {
    sourceId,
    data,
    layers = [],
    updateData = true,
    skipUnchangedData = false,
    updateLayerStyle = false,
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

  const deferred = deferredMapStyleOperations.get(runtime);
  if (deferred) {
    deferred.push(() => syncGeoJsonOverlay(runtime, { sourceId, data, layers, updateData, skipUnchangedData, updateLayerStyle }));
    return true;
  }

  const source = runtime.getSource(sourceId);
  if (source && updateData && typeof source.setData === 'function'
    && (!skipUnchangedData || overlaySourceData.get(source) !== data)) {
    source.setData(data);
    overlaySourceData.set(source, data);
  } else if (!source) {
    runtime.addSource(sourceId, { type: 'geojson', data });
    const addedSource = runtime.getSource(sourceId);
    if (addedSource) overlaySourceData.set(addedSource, data);
  }

  for (const layer of layers) {
    if (!layer?.id) continue;
    if (runtime.getLayer(layer.id)) {
      // Keep data, selection filters, and appearance in the same recovery queue.
      // Source-only callers retain their existing layer styling by default.
      if (updateLayerStyle) {
        for (const [property, value] of Object.entries(layer.paint ?? {})) runtime.setPaintProperty(layer.id, property, value);
        for (const [property, value] of Object.entries(layer.layout ?? {})) runtime.setLayoutProperty(layer.id, property, value);
        if (Object.prototype.hasOwnProperty.call(layer, 'filter')) runtime.setFilter(layer.id, layer.filter);
      }
    } else {
      runtime.addLayer({
        ...layer,
        source: layer.source ?? sourceId,
      });
    }
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

  const deferred = deferredMapStyleOperations.get(runtime);
  if (deferred) {
    deferred.push(() => removeMapOverlay(runtime, { layerIds, sourceIds }));
    return true;
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

export function bindMapPopup(popup, options = {}) {
  const wiredPopupElements = new WeakSet();
  const focusTarget = options.returnFocusTo ?? options.map?.getCanvas?.();
  let openPopupMap = null;
  const dismissPopup = (event) => {
    if (!popup?.isOpen?.()) return;
    event.preventDefault();
    event.stopPropagation();
    popup.remove();
    focusTarget?.focus?.({ preventScroll: true });
  };
  const ensurePopupVisible = () => {
    const map = options.map;
    if (
      !popup ||
      (typeof popup.isOpen === 'function' && !popup.isOpen()) ||
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

    const mapRect = mapElement.getBoundingClientRect();
    const padding = options.popupPadding ?? 20;
    popupElement.style.setProperty('--map-popup-max-width', `${Math.max(80, mapRect.width - padding * 2)}px`);
    const pageStyle = window.getComputedStyle(document.documentElement);
    const viewportOffset = window.visualViewport?.offsetTop ?? 0;
    const viewportTop = viewportOffset + (Number.parseFloat(pageStyle.scrollPaddingTop) || 0);
    const viewportBottom = viewportOffset + (window.visualViewport?.height ?? window.innerHeight)
      - (Number.parseFloat(pageStyle.scrollPaddingBottom) || 0);
    const visibleTop = Math.max(mapRect.top, viewportTop);
    const visibleBottom = Math.min(mapRect.bottom, viewportBottom);
    // A nearly offscreen map cannot hold a readable popup. Avoid moving its
    // camera repeatedly until the user brings more of the map into view.
    const useVisibleBounds = visibleBottom - visibleTop >= 160;
    const top = useVisibleBounds ? visibleTop : mapRect.top;
    const bottom = useVisibleBounds ? visibleBottom : mapRect.bottom;
    const tipHeight = popupElement.querySelector('.maplibregl-popup-tip')?.getBoundingClientRect().height ?? 10;
    popupElement.style.setProperty('--map-popup-max-height', `${Math.max(80, bottom - top - padding * 2 - tipHeight)}px`);
    const content = popupElement.querySelector('.maplibregl-popup-content');
    if (content instanceof HTMLElement) {
      const scrollable = content.scrollHeight > content.clientHeight;
      content.classList.toggle('maplibregl-popup-content--scrollable', scrollable);
    }
    const focused = document.activeElement;
    if (content instanceof HTMLElement && focused instanceof HTMLElement && content.contains(focused)) {
      const contentRect = content.getBoundingClientRect();
      const focusRect = focused.getBoundingClientRect();
      if (focusRect.bottom > contentRect.bottom) content.scrollTop += focusRect.bottom - contentRect.bottom + 8;
      else if (focusRect.top < contentRect.top) content.scrollTop -= contentRect.top - focusRect.top + 8;
    }
    const popupRect = popupElement.getBoundingClientRect();

    let shiftX = 0;
    let shiftY = 0;

    if (popupRect.left < mapRect.left + padding) {
      shiftX = mapRect.left + padding - popupRect.left;
    } else if (popupRect.right > mapRect.right - padding) {
      shiftX = mapRect.right - padding - popupRect.right;
    }

    if (popupRect.top < top + padding) {
      shiftY = top + padding - popupRect.top;
    } else if (popupRect.bottom > bottom - padding) {
      shiftY = bottom - padding - popupRect.bottom;
    }

    if (Math.abs(shiftX) < 1 && Math.abs(shiftY) < 1) {
      return;
    }

    // Pan from the current viewport center. Starting from the marker instead
    // recenters an edge marker and moves much farther than the clipping requires.
    const targetCenter = map.unproject([
      mapElement.clientWidth / 2 - shiftX,
      mapElement.clientHeight / 2 - shiftY,
    ]);

    map.easeTo({
      center: targetCenter,
      duration: 260,
    });
  };

  const wirePopupControls = () => {
    if (!popup || typeof popup.getElement !== 'function') {
      return;
    }

    const popupElement = popup.getElement();
    if (!(popupElement instanceof HTMLElement)) {
      return;
    }

    const heading = popupElement.querySelector('.score-map-popup h3');
    if (heading instanceof HTMLElement) {
      if (!heading.id) heading.id = `map-popup-heading-${globalThis.crypto.randomUUID()}`;
      popupElement.setAttribute('role', 'dialog');
      popupElement.setAttribute('aria-labelledby', heading.id);
    }

    if (!wiredPopupElements.has(popupElement)) {
      wiredPopupElements.add(popupElement);
      popupElement.addEventListener('click', (event) => event.stopPropagation());
      popupElement.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') dismissPopup(event);
      });
    }

    const closeButton = popupElement.querySelector('.maplibregl-popup-close-button');
    if (closeButton instanceof HTMLButtonElement) {
      const content = popupElement.querySelector('.maplibregl-popup-content');
      if (content instanceof HTMLElement) {
        // Keep native initial focus at the top, before route actions. Focusing
        // the final link can scroll the route name underneath the sticky close row.
        let closeRow = content.querySelector('.maplibregl-popup-close-row');
        if (!closeRow) {
          closeRow = document.createElement('div');
          closeRow.className = 'maplibregl-popup-close-row';
          content.prepend(closeRow);
        }
        if (closeButton.parentElement !== closeRow) {
          const hadPopupFocus = popupElement.contains(document.activeElement);
          closeRow.append(closeButton);
          if (hadPopupFocus) closeButton.focus({ preventScroll: true });
        }
      }
    }
    if (closeButton instanceof HTMLButtonElement && closeButton.dataset.popupBound !== 'true') {
      closeButton.dataset.popupBound = 'true';
      closeButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        popup.remove();
        focusTarget?.focus?.({ preventScroll: true });
      });
    }
  };

  if (popup) {
    popup.on('open', () => {
      if (options.map) {
        const previous = activeMapPopups.get(options.map);
        if (previous && previous !== popup) previous.remove();
        activeMapPopups.set(options.map, popup);
      }
      wirePopupControls();
      openPopupMap = options.map;
      openPopupMap?.on?.('resize', ensurePopupVisible);
      window.setTimeout(() => {
        ensurePopupVisible();
        window.requestAnimationFrame(() => {
          ensurePopupVisible();
        });
        window.setTimeout(() => {
          ensurePopupVisible();
        }, 180);
      }, 20);
    });
    popup.on('close', () => {
      if (options.map && activeMapPopups.get(options.map) === popup) activeMapPopups.delete(options.map);
      openPopupMap?.off?.('resize', ensurePopupVisible);
      openPopupMap = null;
    });
  }

  return { dismiss: dismissPopup };
}

export function bindMarkerPopup(marker, markerNode, options = {}) {
  const popup = marker.getPopup();
  markerNode.addEventListener('focus', () => {
    if (!markerNode.matches?.(':focus-visible')) return;
    const map = options.map ?? marker._map;
    const container = map?.getContainer?.();
    const location = marker.getLngLat?.();
    if (!location || !container?.clientWidth || !container.clientHeight
      || typeof map.project !== 'function' || typeof map.panTo !== 'function') return;
    const point = map.project(location);
    const horizontalInset = markerNode.offsetWidth / 2 + 8;
    const verticalInset = markerNode.offsetHeight / 2 + 8;
    if (point.x < horizontalInset || point.x > container.clientWidth - horizontalInset
      || point.y < verticalInset || point.y > container.clientHeight - verticalInset) {
      // Keyboard focus must remain visible after the user zooms or pans.
      map.panTo(location, { duration: 0 });
    }
  });
  const applySelectedState = (selected) => {
    markerNode.classList.toggle('score-map-marker--selected', selected);
    markerNode.setAttribute('aria-pressed', selected ? 'true' : 'false');
    if (typeof options.onSelectedChange === 'function') options.onSelectedChange(selected);
  };
  popup?.on('open', () => applySelectedState(true));
  popup?.on('close', () => applySelectedState(false));
  const { dismiss: dismissPopup } = bindMapPopup(popup, {
    ...options,
    map: options.map ?? marker._map,
    returnFocusTo: markerNode,
  });

  markerNode.addEventListener('keydown', (event) => {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }

    if (event.key === 'Escape') {
      dismissPopup(event);
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
