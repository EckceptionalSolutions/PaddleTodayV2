const DEFAULT_CENTER = Object.freeze([-98.5, 39.5]);
const RASTER_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const RASTER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function toLeafletLatLng(value) {
  if (Array.isArray(value)) return [Number(value[1]), Number(value[0])];
  return [Number(value?.lat ?? value?.latitude), Number(value?.lng ?? value?.lon ?? value?.longitude)];
}

function toCompatLngLat(value) {
  const lat = Number(value?.lat ?? value?.latitude ?? value?.[1]);
  const lng = Number(value?.lng ?? value?.lon ?? value?.longitude ?? value?.[0]);
  return { lng, lat };
}

function expressionValue(expression, feature, zoom = 7) {
  if (!Array.isArray(expression)) return expression;
  const [operator, ...args] = expression;
  if (operator === 'get') return feature?.properties?.[args[0]];
  if (operator === 'geometry-type') return feature?.geometry?.type;
  if (operator === 'zoom') return zoom;
  if (operator === 'to-string') return String(expressionValue(args[0], feature, zoom) ?? '');
  if (operator === 'concat') return args.map((part) => expressionValue(part, feature, zoom)).join('');
  if (operator === 'match') {
    const input = expressionValue(args[0], feature, zoom);
    for (let index = 1; index < args.length - 1; index += 2) {
      const candidate = args[index];
      if (Array.isArray(candidate) ? candidate.includes(input) : candidate === input) {
        return expressionValue(args[index + 1], feature, zoom);
      }
    }
    return expressionValue(args.at(-1), feature, zoom);
  }
  if (operator === 'interpolate') {
    const input = Number(expressionValue(args[1], feature, zoom));
    const stops = args.slice(2);
    for (let index = 0; index < stops.length - 2; index += 2) {
      const start = Number(stops[index]);
      const end = Number(stops[index + 2]);
      if (input <= end) {
        const startValue = Number(expressionValue(stops[index + 1], feature, zoom));
        const endValue = Number(expressionValue(stops[index + 3], feature, zoom));
        const ratio = Math.max(0, Math.min(1, (input - start) / (end - start || 1)));
        return startValue + (endValue - startValue) * ratio;
      }
    }
    return expressionValue(stops.at(-1), feature, zoom);
  }
  return expression;
}

function matchesFilter(filter, feature, zoom) {
  if (!Array.isArray(filter) || filter.length === 0) return true;
  const [operator, ...args] = filter;
  if (operator === 'all') return args.every((entry) => matchesFilter(entry, feature, zoom));
  if (operator === 'any') return args.some((entry) => matchesFilter(entry, feature, zoom));
  if (operator === '!') return !matchesFilter(args[0], feature, zoom);
  const left = expressionValue(args[0], feature, zoom);
  const right = expressionValue(args[1], feature, zoom);
  if (operator === '==') return left === right;
  if (operator === '!=') return left !== right;
  if (operator === 'in') return args.slice(1).some((entry) => expressionValue(entry, feature, zoom) === left);
  if (operator === 'match') return Boolean(expressionValue(filter, feature, zoom));
  return true;
}

function normalizePadding(padding) {
  if (typeof padding === 'number') return {
    paddingTopLeft: [padding, padding],
    paddingBottomRight: [padding, padding],
  };
  if (!padding) return {};
  return {
    paddingTopLeft: [Number(padding.left) || 0, Number(padding.top) || 0],
    paddingBottomRight: [Number(padding.right) || 0, Number(padding.bottom) || 0],
  };
}

export function createLeafletMapRuntime(L) {
  if (!L || typeof L.map !== 'function') throw new Error('Leaflet runtime missing.');

  class LngLatBounds {
    constructor(sw, ne) {
      this.west = Infinity;
      this.south = Infinity;
      this.east = -Infinity;
      this.north = -Infinity;
      if (sw) this.extend(sw);
      if (ne) this.extend(ne);
    }

    extend(value) {
      if (value instanceof LngLatBounds) {
        if (Number.isFinite(value.west)) {
          this.extend([value.west, value.south]);
          this.extend([value.east, value.north]);
        }
        return this;
      }
      const { lng, lat } = toCompatLngLat(value);
      if (Number.isFinite(lng) && Number.isFinite(lat)) {
        this.west = Math.min(this.west, lng);
        this.south = Math.min(this.south, lat);
        this.east = Math.max(this.east, lng);
        this.north = Math.max(this.north, lat);
      }
      return this;
    }

    toLeafletBounds() {
      return [[this.south, this.west], [this.north, this.east]];
    }
  }

  class Popup {
    constructor(options = {}) {
      this.options = options;
      this.listeners = new Map();
      const maxWidth = Number.parseFloat(options.maxWidth) || 320;
      this.popup = L.popup({
        closeButton: options.closeButton !== false,
        closeOnClick: false,
        className: 'maplibregl-popup leaflet-map-fallback-popup',
        maxWidth,
        minWidth: Math.min(maxWidth, 220),
        autoPanPadding: [24, 24],
        keepInView: true,
      });
    }

    setHTML(html) { this.popup.setContent(html); return this; }
    setDOMContent(node) { this.popup.setContent(node); return this; }
    setLngLat(value) { this.lngLat = toCompatLngLat(value); this.popup.setLatLng(toLeafletLatLng(value)); return this; }
    getElement() { return this.popup.getElement?.() ?? null; }
    isOpen() { return Boolean(this.popup.isOpen?.() || (this.map && this.map.__leafletMap.hasLayer(this.popup))); }
    on(name, handler) {
      if (!this.listeners.has(name)) this.listeners.set(name, new Set());
      this.listeners.get(name).add(handler);
      return this;
    }
    off(name, handler) { this.listeners.get(name)?.delete(handler); return this; }
    emit(name) { for (const handler of this.listeners.get(name) ?? []) handler({ target: this }); }
    attach(map) {
      if (this.map === map) return this;
      this.map = map;
      this.handleOpen = (event) => { if (event.popup === this.popup) this.emit('open'); };
      this.handleClose = (event) => { if (event.popup === this.popup) this.emit('close'); };
      map.__leafletMap.on('popupopen', this.handleOpen);
      map.__leafletMap.on('popupclose', this.handleClose);
      return this;
    }
    addTo(map) { this.attach(map); this.popup.openOn(map.__leafletMap); return this; }
    remove() { this.map?.__leafletMap.closePopup(this.popup); return this; }
  }

  class Marker {
    constructor(options = {}) {
      this.options = options;
      this.element = options.element;
      if (!this.element) {
        this.element = document.createElement('div');
        this.element.className = 'maplibregl-marker';
      }
      this.element.classList.add('maplibregl-marker', 'leaflet-map-fallback-marker');
    }

    setLngLat(value) { this.lngLat = toCompatLngLat(value); return this; }
    getLngLat() { return this.lngLat; }
    getElement() { return this.element; }
    setPopup(popup) {
      this.popup = popup;
      if (this.lngLat) this.popup.setLngLat(this.lngLat);
      return this;
    }
    getPopup() { return this.popup ?? null; }
    addTo(map) {
      this._map = map;
      const element = this.element;
      const icon = {
        options: {
          className: '',
          iconAnchor: [0, 0],
          popupAnchor: [0, 0],
          tooltipAnchor: [0, 0],
        },
        createIcon() { return element; },
        createShadow() { return null; },
      };
      this.marker = L.marker(toLeafletLatLng(this.lngLat), {
        icon,
        keyboard: false,
        riseOnHover: true,
      }).addTo(map.__leafletMap);
      L.DomEvent?.disableClickPropagation?.(element);
      if (this.popup) {
        this.popup.attach(map);
        this.marker.bindPopup(this.popup.popup);
        this.handlePopupClick = (event) => {
          event.stopPropagation();
          if (!this.popup.isOpen()) this.popup.addTo(map);
        };
        this.element.addEventListener('click', this.handlePopupClick);
      }
      return this;
    }
    togglePopup() {
      if (!this.popup || !this._map) return this;
      if (this.popup.isOpen()) this.popup.remove();
      else this.popup.addTo(this._map);
      return this;
    }
    remove() {
      if (this.handlePopupClick) this.element.removeEventListener('click', this.handlePopupClick);
      this.marker?.remove();
      this.popup?.remove();
      this._map = null;
      return this;
    }
  }

  class NavigationControl {
    constructor(options = {}) { this.options = options; }
  }

  class MapRuntime {
    constructor(options = {}) {
      const interactive = options.interactive !== false;
      const center = options.center ?? DEFAULT_CENTER;
      this.__paddleTodayRasterFallback = true;
      this.container = typeof options.container === 'string'
        ? document.getElementById(options.container)
        : options.container;
      if (!this.container) throw new Error('Map container missing.');
      this.sources = new Map();
      this.layers = new Map();
      this.layerListeners = [];
      this.eventListeners = new Map();
      this.__leafletMap = L.map(this.container, {
        attributionControl: options.attributionControl !== false,
        zoomControl: false,
        closePopupOnClick: false,
        dragging: interactive,
        touchZoom: interactive,
        scrollWheelZoom: interactive,
        doubleClickZoom: interactive,
        boxZoom: interactive,
        keyboard: interactive,
      }).setView(toLeafletLatLng(center), options.zoom ?? 4);
      L.tileLayer(RASTER_TILE_URL, {
        attribution: RASTER_ATTRIBUTION,
        maxZoom: 19,
        crossOrigin: true,
      }).addTo(this.__leafletMap);
    }

    loaded() { return true; }
    isStyleLoaded() { return true; }
    getContainer() { return this.container; }
    getCanvas() { return this.container; }
    getZoom() { return this.__leafletMap.getZoom(); }
    resize() { this.__leafletMap.invalidateSize(false); return this; }
    remove() { this.__leafletMap.remove(); }
    addControl(_control, position = 'top-right') {
      const leafletPosition = position.replace('-', '');
      L.control.zoom({ position: leafletPosition }).addTo(this.__leafletMap);
      return this;
    }
    project(value) {
      const point = this.__leafletMap.latLngToContainerPoint(toLeafletLatLng(value));
      return { x: point.x, y: point.y };
    }
    unproject(value) {
      const point = Array.isArray(value) ? value : [value.x, value.y];
      return toCompatLngLat(this.__leafletMap.containerPointToLatLng(point));
    }
    jumpTo(options = {}) { return this.setView(options, false); }
    easeTo(options = {}) { return this.setView(options, options.duration !== 0); }
    flyTo(options = {}) { return this.setView(options, options.duration !== 0); }
    setView(options, animate) {
      const center = options.center ? toLeafletLatLng(options.center) : this.__leafletMap.getCenter();
      const zoom = options.zoom ?? this.__leafletMap.getZoom();
      this.__leafletMap.setView(center, zoom, { animate });
      return this;
    }
    fitBounds(bounds, options = {}) {
      const leafletBounds = bounds instanceof LngLatBounds ? bounds.toLeafletBounds() : bounds;
      this.__leafletMap.fitBounds(leafletBounds, {
        ...normalizePadding(options.padding),
        maxZoom: options.maxZoom,
        animate: options.duration !== 0,
      });
      return this;
    }
    on(name, layerOrHandler, maybeHandler) {
      if (typeof layerOrHandler === 'string') {
        this.layerListeners.push({ name, layerId: layerOrHandler, handler: maybeHandler });
        this.bindLayerListeners(layerOrHandler);
        return this;
      }
      const handler = layerOrHandler;
      const wrapped = (event) => handler(event);
      if (!this.eventListeners.has(name)) this.eventListeners.set(name, new Map());
      this.eventListeners.get(name).set(handler, wrapped);
      this.__leafletMap.on(name, wrapped);
      return this;
    }
    off(name, layerOrHandler, maybeHandler) {
      if (typeof layerOrHandler === 'string') {
        this.layerListeners = this.layerListeners.filter((entry) => !(
          entry.name === name && entry.layerId === layerOrHandler && entry.handler === maybeHandler
        ));
        return this;
      }
      const wrapped = this.eventListeners.get(name)?.get(layerOrHandler);
      if (wrapped) this.__leafletMap.off(name, wrapped);
      this.eventListeners.get(name)?.delete(layerOrHandler);
      return this;
    }
    addSource(id, config) {
      const source = {
        ...config,
        setData: (data) => {
          source.data = data;
          for (const [layerId, layer] of this.layers) {
            if (layer.config.source === id) this.renderLayer(layerId);
          }
        },
      };
      this.sources.set(id, source);
      return this;
    }
    getSource(id) { return this.sources.get(id); }
    removeSource(id) { this.sources.delete(id); return this; }
    addLayer(config) {
      if (!this.sources.has(config.source)) return this;
      this.layers.set(config.id, { config: structuredClone(config), leafletLayer: null });
      this.renderLayer(config.id);
      return this;
    }
    getLayer(id) { return this.layers.get(id)?.config; }
    removeLayer(id) {
      const layer = this.layers.get(id);
      if (layer?.leafletLayer) this.__leafletMap.removeLayer(layer.leafletLayer);
      this.layers.delete(id);
      return this;
    }
    setFilter(id, filter) {
      const layer = this.layers.get(id);
      if (layer) { layer.config.filter = structuredClone(filter); this.renderLayer(id); }
      return this;
    }
    setPaintProperty(id, key, value) {
      const layer = this.layers.get(id);
      if (layer) {
        layer.config.paint ||= {};
        layer.config.paint[key] = structuredClone(value);
        this.renderLayer(id);
      }
      return this;
    }
    queryRenderedFeatures() { return []; }
    querySourceFeatures() { return []; }
    styleFor(config, feature) {
      const paint = config.paint ?? {};
      const zoom = this.getZoom();
      const value = (name, fallback) => expressionValue(paint[name] ?? fallback, feature, zoom);
      if (config.type === 'fill') return {
        color: value('fill-color', '#16758a'),
        fillColor: value('fill-color', '#16758a'),
        fillOpacity: Number(value('fill-opacity', 0.25)),
        opacity: Number(value('fill-outline-opacity', 0.7)),
        weight: 1,
      };
      if (config.type === 'circle') return {
        radius: Number(value('circle-radius', 5)),
        color: value('circle-stroke-color', '#fff'),
        weight: Number(value('circle-stroke-width', 1)),
        fillColor: value('circle-color', '#16758a'),
        fillOpacity: Number(value('circle-opacity', 0.9)),
      };
      return {
        color: value('line-color', '#16758a'),
        weight: Number(value('line-width', 4)),
        opacity: Number(value('line-opacity', 0.8)),
        dashArray: Array.isArray(paint['line-dasharray']) ? paint['line-dasharray'].join(' ') : undefined,
        lineCap: config.layout?.['line-cap'] ?? 'round',
        lineJoin: config.layout?.['line-join'] ?? 'round',
      };
    }
    renderLayer(id) {
      const layer = this.layers.get(id);
      if (!layer) return;
      if (layer.leafletLayer) this.__leafletMap.removeLayer(layer.leafletLayer);
      const source = this.sources.get(layer.config.source);
      if (!source?.data) return;
      const config = layer.config;
      const zoom = this.getZoom();
      layer.leafletLayer = L.geoJSON(source.data, {
        filter: (feature) => matchesFilter(config.filter, feature, zoom),
        style: (feature) => this.styleFor(config, feature),
        pointToLayer: (feature, latlng) => L.circleMarker(latlng, this.styleFor(config, feature)),
        onEachFeature: (feature, leafletFeature) => {
          if (config.type === 'symbol') {
            const label = expressionValue(config.layout?.['text-field'], feature, zoom);
            if (label) leafletFeature.bindTooltip(String(label), {
              permanent: true,
              direction: 'center',
              className: 'leaflet-map-fallback-label',
            });
          }
        },
      }).addTo(this.__leafletMap);
      this.bindLayerListeners(id);
    }
    bindLayerListeners(id) {
      const layer = this.layers.get(id)?.leafletLayer;
      if (!layer) return;
      for (const entry of this.layerListeners.filter((candidate) => candidate.layerId === id)) {
        layer.eachLayer((featureLayer) => {
          const key = `__paddle_${entry.name}_${this.layerListeners.indexOf(entry)}`;
          if (featureLayer[key]) return;
          featureLayer[key] = true;
          featureLayer.on(entry.name, (event) => entry.handler({
            ...event,
            lngLat: toCompatLngLat(event.latlng),
            features: [featureLayer.feature].filter(Boolean),
          }));
        });
      }
    }
  }

  return Object.freeze({
    Map: MapRuntime,
    Marker,
    Popup,
    NavigationControl,
    LngLatBounds,
    __paddleTodayRasterFallback: true,
  });
}
