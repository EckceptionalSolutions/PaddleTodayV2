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
      resolve(existing);
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
    if (!popup || !map || typeof popup.getElement !== 'function' || typeof map.project !== 'function' || typeof map.unproject !== 'function') {
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
      shiftX = (mapRect.right - padding) - popupRect.right;
    }

    if (popupRect.top < mapRect.top + padding) {
      shiftY = mapRect.top + padding - popupRect.top;
    } else if (popupRect.bottom > mapRect.bottom - padding) {
      shiftY = (mapRect.bottom - padding) - popupRect.bottom;
    }

    if (Math.abs(shiftX) < 1 && Math.abs(shiftY) < 1) {
      return;
    }

    const markerPoint = map.project(marker.getLngLat());
    const targetCenter = map.unproject([
      markerPoint.x - shiftX,
      markerPoint.y - shiftY,
    ]);

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
