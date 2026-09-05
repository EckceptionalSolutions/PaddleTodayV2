import { syncGeoJsonOverlay } from './map-runtime.js';

/** MapLibre draws badges; static buttons retain keyboard/screen-reader access. */
export function createExploreScoreLayer(map) {
  const sourceId = 'explore-score-points';
  const markers = new Map();
  let nextId = 0;
  let signature = '';
  let data = { type: 'FeatureCollection', features: [] };
  let syncing = false;
  const controls = document.createElement('div');
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'Map route scores');
  controls.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;';
  map.getContainer().append(controls);

  function sync() {
    if (syncing) return;
    syncing = true;
    try {
      const values = [...markers.values()].map((marker) => {
        const element = marker.getElement();
        const color = element.classList.contains('score-map-marker--pending') ? '#64748b'
          : element.classList.contains('score-map-marker--marginal') ? '#ad752c'
          : element.classList.contains('score-map-marker--no-go') ? '#bb5840' : '#2c8a54';
        return [marker.id, marker.point.lng, marker.point.lat, element.textContent, color,
          element.classList.contains('score-map-marker--selected') || document.activeElement === element];
      });
      const nextSignature = JSON.stringify(values);
      if (nextSignature !== signature) {
        signature = nextSignature;
        data = { type: 'FeatureCollection', features: values.map(([id, lng, lat, label, color, selected]) => ({
          type: 'Feature', id, properties: { label, color, selected }, geometry: { type: 'Point', coordinates: [lng, lat] },
        })) };
      }
      syncGeoJsonOverlay(map, { sourceId, data, skipUnchangedData: true, layers: [{
        id: sourceId, type: 'circle', paint: {
          'circle-radius': ['case', ['get', 'selected'], 17, 15],
          'circle-color': ['get', 'color'],
          'circle-stroke-width': ['case', ['get', 'selected'], 3, 2],
          'circle-stroke-color': ['case', ['get', 'selected'], '#2563eb', '#ffffff'],
        },
      }, {
        id: `${sourceId}-labels`, type: 'symbol', layout: {
          'text-field': ['get', 'label'], 'text-font': ['Noto Sans Bold'], 'text-size': 12,
          'text-allow-overlap': true, 'text-ignore-placement': true,
        }, paint: { 'text-color': '#ffffff' },
      }] });
    } finally { syncing = false; }
  }

  class Marker {
    constructor({ element }) {
      this.id = ++nextId;
      this.element = element;
      this.point = { lng: 0, lat: 0 };
      this.popup = null;
      element.addEventListener('click', () => this.togglePopup());
      element.addEventListener('focus', () => {
        if (map.getBounds()?.contains && !map.getBounds().contains([this.point.lng, this.point.lat])) {
          map.easeTo({ center: [this.point.lng, this.point.lat], duration: 200 });
        }
        sync();
      });
      element.addEventListener('blur', sync);
    }
    setLngLat([lng, lat]) {
      this.point = { lng, lat };
      this.popup?.setLngLat(this.point);
      return this;
    }
    getLngLat() { return this.point; }
    getElement() { return this.element; }
    setPopup(popup) { this.popup = popup; popup.on('close', () => queueMicrotask(sync)); return this; }
    getPopup() { return this.popup; }
    addTo() { markers.set(this.id, this); controls.append(this.element); return this; }
    remove() { markers.delete(this.id); this.popup?.remove(); this.element.remove(); return this; }
    togglePopup() {
      if (!this.popup) return this;
      if (this.popup.isOpen()) this.popup.remove();
      else {
        for (const marker of markers.values()) {
          if (marker !== this && marker.popup?.isOpen()) marker.popup.remove();
        }
        this.popup.setLngLat(this.point).addTo(map);
      }
      sync();
      return this;
    }
  }
  map.on('click', sourceId, (event) => {
    const marker = markers.get(event.features?.[0]?.id);
    marker?.getElement().click();
  });
  map.on('mouseenter', sourceId, () => { map.getCanvas().style.cursor = 'pointer'; });
  map.on('mouseleave', sourceId, () => { map.getCanvas().style.cursor = ''; });
  return { Marker, sync };
}
