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

  return [
    'score-map-marker',
    `score-map-marker--${String(rating).toLowerCase().replace(/[^a-z]+/g, '-')}`,
    `score-map-marker--confidence-${String(confidenceLabel).toLowerCase()}`,
  ].join(' ');
}

export function bindMarkerPopup(marker, markerNode) {
  const open = () => {
    const popup = marker.getPopup();
    if (popup && !popup.isOpen()) {
      marker.togglePopup();
    }
  };

  const close = () => {
    const popup = marker.getPopup();
    if (popup && popup.isOpen()) {
      marker.togglePopup();
    }
  };

  markerNode.addEventListener('mouseenter', open);
  markerNode.addEventListener('focus', open);
  markerNode.addEventListener('mouseleave', close);
  markerNode.addEventListener('blur', close);
}
