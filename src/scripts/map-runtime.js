export const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

const MAP_SCRIPT_URL = 'https://unpkg.com/maplibre-gl@5.3.0/dist/maplibre-gl.js';
const MAP_CSS_URL = 'https://unpkg.com/maplibre-gl@5.3.0/dist/maplibre-gl.css';

let maplibreLoadPromise = null;

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
