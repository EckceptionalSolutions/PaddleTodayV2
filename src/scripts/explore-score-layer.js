import { syncGeoJsonOverlay } from './map-runtime.js';

/** MapLibre draws badges; static buttons retain keyboard/screen-reader access. */
export function createExploreScoreLayer(map) {
  const sourceId = 'explore-score-points';
  const dotId = `${sourceId}-dots`;
  const hitId = `${sourceId}-dot-targets`;
  const layerIds = [hitId, dotId, sourceId];
  const touchTargets = globalThis.matchMedia?.('(pointer: coarse)');
  const markers = new Map();
  let nextId = 0;
  let signature = '';
  let data = { type: 'FeatureCollection', features: [] };
  let syncing = false;
  let ordering = false;
  let destroyed = false;
  let graphicsAvailable = true;
  const badgeImages = new Map();
  const controls = document.createElement('div');
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'Map route scores');
  controls.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;';
  map.getContainer().append(controls);

  function badgeImage(color, selected, label) {
    const id = `explore-badge-${color.slice(1)}-${selected ? 'selected' : 'normal'}-${encodeURIComponent(label)}`;
    if (!map.hasImage(id)) {
      if (!badgeImages.has(id)) {
        const canvas = document.createElement('canvas');
        const size = selected ? 42 : 36;
        canvas.width = canvas.height = size * 2;
        const context = canvas.getContext('2d');
        context.scale(2, 2);
        context.beginPath();
        context.arc(size / 2, size / 2, selected ? 18.5 : 16, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = selected ? 3 : 2;
        context.strokeStyle = selected ? '#2563eb' : '#ffffff';
        context.stroke();
        // Keep scores independent of remote glyph downloads: one failed font
        // request otherwise prevents MapLibre from drawing this whole source.
        context.font = '700 12px Arial, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#ffffff';
        context.fillText(label, size / 2, size / 2 + 0.5);
        badgeImages.set(id, context.getImageData(0, 0, canvas.width, canvas.height));
      }
      map.addImage(id, badgeImages.get(id), { pixelRatio: 2 });
    }
    return id;
  }

  // Route overlays can be added after selection or a late geometry response.
  // Only move when necessary: moveLayer itself emits styledata.
  function bringToFront() {
    if (ordering || !map.getLayer(sourceId)) return;
    const order = map.getLayersOrder();
    if (layerIds.every((id, index) => order.at(index - layerIds.length) === id)) return;
    ordering = true;
    try {
      for (const id of layerIds) if (map.getLayer(id)) map.moveLayer(id);
    } finally { ordering = false; }
  }
  map.on('styledata', bringToFront);

  function sync() {
    if (destroyed || syncing || !graphicsAvailable) return;
    syncing = true;
    try {
      const values = [...markers.values()].map((marker) => {
        const element = marker.getElement();
        const color = element.classList.contains('score-map-marker--pending') ? '#64748b'
          : element.classList.contains('score-map-marker--marginal') ? '#966220'
          : element.classList.contains('score-map-marker--no-go') ? '#bb5840'
          : element.classList.contains('score-map-marker--good') ? '#1c7770' : '#277b4b';
        return [marker.id, marker.point.lng, marker.point.lat, element.textContent, color,
          element.classList.contains('score-map-marker--selected') || marker.popup?.isOpen() || document.activeElement === element,
          document.activeElement === element];
      });
      const nextSignature = JSON.stringify(values);
      // A new style discards registered images even when the scores are unchanged.
      for (const [, , , label, color, selected] of values) badgeImage(color, selected, label);
      if (nextSignature !== signature) {
        signature = nextSignature;
        data = { type: 'FeatureCollection', features: values.map(([id, lng, lat, label, color, selected, focused]) => ({
          type: 'Feature', id, properties: { label, color, selected,
            image: badgeImage(color, selected, label), priority: focused ? -2 : selected ? -1 : id,
          }, geometry: { type: 'Point', coordinates: [lng, lat] },
        })) };
      }
      syncGeoJsonOverlay(map, { sourceId, data, skipUnchangedData: true, layers: [{
        // Back every route with a dot. Opaque badges cover their own dots when
        // they fit; collision-hidden badges leave dots visible automatically.
        // This shares the source and needs no per-frame queries or uploads.
        id: hitId, type: 'circle', paint: { 'circle-radius': touchTargets?.matches ? 22 : 11, 'circle-opacity': 0 },
      }, {
        id: dotId, type: 'circle', paint: {
          'circle-radius': 4, 'circle-color': ['get', 'color'],
          'circle-stroke-width': 1.5, 'circle-stroke-color': '#ffffff',
        },
      }, {
        id: sourceId, type: 'symbol', layout: {
          'icon-image': ['get', 'image'], 'icon-padding': 3,
          'icon-allow-overlap': false, 'icon-ignore-placement': false, 'icon-optional': false,
          'symbol-sort-key': ['get', 'priority'],
          'icon-pitch-alignment': 'viewport',
        },
      }] });
      bringToFront();
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
  const interactiveLayers = [sourceId, hitId];
  map.on('click', interactiveLayers, (event) => {
    const features = event.features || [];
    // A badge wins over underlying dots. Otherwise choose the nearest dot,
    // including the larger invisible target that makes it easier to tap.
    let feature = features.find((candidate) => candidate.layer?.id === sourceId);
    if (!feature) {
      let nearest = Infinity;
      for (const candidate of features) {
        const point = map.project(candidate.geometry.coordinates);
        const distance = event.point ? Math.hypot(point.x - event.point.x, point.y - event.point.y) : 0;
        if (distance < nearest) { nearest = distance; feature = candidate; }
      }
    }
    const marker = markers.get(feature?.id);
    marker?.getElement().click();
  });
  map.on('mouseenter', interactiveLayers, () => { map.getCanvas().style.cursor = 'pointer'; });
  map.on('mouseleave', interactiveLayers, () => { map.getCanvas().style.cursor = ''; });
  function destroy() {
    destroyed = true;
    for (const marker of markers.values()) marker.getPopup()?.remove();
    markers.clear();
    badgeImages.clear();
    controls.remove();
    map.off('styledata', bringToFront);
    map.off('webglcontextlost', graphicsLost);
    map.off('style.load', styleLoaded);
  }
  function graphicsLost() { graphicsAvailable = false; }
  function styleLoaded() { graphicsAvailable = true; sync(); }
  // Re-register generated badge images when graphics recovery rebuilds style.
  map.on('webglcontextlost', graphicsLost);
  map.on('style.load', styleLoaded);
  map.on('remove', destroy);
  return { Marker, sync, destroy };
}
