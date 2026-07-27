import type { Page } from '@playwright/test';

export async function installMapLibreHarness(page: Page) {
  await page.addInitScript(() => {
    const harness = {
      maps: [] as Array<{ label: string }>,
      fitCalls: [] as Array<{ label: string; options: Record<string, unknown>; at: number }>,
      cameraCalls: [] as Array<{ label: string; method: string }>,
      markersAdded: 0,
      markersRemoved: 0,
    };

    class FakeEvented {
      listeners = new Map<string, Set<(...args: any[]) => void>>();

      on(eventName: string, layerOrListener: string | ((...args: any[]) => void), maybeListener?: (...args: any[]) => void) {
        const listener = typeof layerOrListener === 'function' ? layerOrListener : maybeListener;
        if (!listener) return this;
        const listeners = this.listeners.get(eventName) ?? new Set();
        listeners.add(listener);
        this.listeners.set(eventName, listeners);
        return this;
      }

      off(eventName: string, layerOrListener: string | ((...args: any[]) => void), maybeListener?: (...args: any[]) => void) {
        const listener = typeof layerOrListener === 'function' ? layerOrListener : maybeListener;
        if (listener) this.listeners.get(eventName)?.delete(listener);
        return this;
      }

      emit(eventName: string, ...args: any[]) {
        for (const listener of this.listeners.get(eventName) ?? []) listener(...args);
      }
    }

    class FakeBounds {
      points: Array<[number, number]> = [];

      constructor(initial?: Array<[number, number]>) {
        for (const point of initial ?? []) this.extend(point);
      }

      extend(input: any) {
        if (Array.isArray(input) && input.length >= 2 && Number.isFinite(Number(input[0]))) {
          this.points.push([Number(input[0]), Number(input[1])]);
        } else if (input && Number.isFinite(Number(input.lng)) && Number.isFinite(Number(input.lat))) {
          this.points.push([Number(input.lng), Number(input.lat)]);
        } else if (input?.points) {
          this.points.push(...input.points);
        }
        return this;
      }

      isEmpty() {
        return this.points.length === 0;
      }

      toArray() {
        if (this.points.length === 0) return [[0, 0], [0, 0]];
        const lngs = this.points.map(([lng]) => lng);
        const lats = this.points.map(([, lat]) => lat);
        return [
          [Math.min(...lngs), Math.min(...lats)],
          [Math.max(...lngs), Math.max(...lats)],
        ];
      }
    }

    class FakePopup extends FakeEvented {
      element = document.createElement('div');
      open = false;

      constructor(readonly options: Record<string, unknown> = {}) {
        super();
        this.element.className = 'maplibregl-popup';
        const close = document.createElement('button');
        close.type = 'button';
        close.className = 'maplibregl-popup-close-button';
        close.textContent = '×';
        this.element.append(close);
      }

      setHTML(html: string) {
        const close = this.element.querySelector('.maplibregl-popup-close-button');
        this.element.innerHTML = html;
        if (close) this.element.prepend(close);
        return this;
      }

      setDOMContent(node: Node) {
        this.element.replaceChildren(node);
        return this;
      }

      getElement() {
        return this.element;
      }

      isOpen() {
        return this.open;
      }

      remove() {
        if (!this.open) return this;
        this.open = false;
        this.element.remove();
        this.emit('close');
        return this;
      }
    }

    class FakeMap extends FakeEvented {
      container: HTMLElement;
      canvas: HTMLCanvasElement;
      sources = new Map<string, any>([['openmaptiles', {}]]);
      layers = new Map<string, any>();
      zoom: number;
      label: string;

      constructor(readonly options: Record<string, any>) {
        super();
        const configured = options.container;
        const container = typeof configured === 'string'
          ? document.getElementById(configured)
          : configured;
        if (!(container instanceof HTMLElement)) throw new Error('Fake MapLibre container missing');
        this.container = container;
        this.container.classList.add('maplibregl-map');
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'maplibregl-canvas';
        this.container.append(this.canvas);
        this.zoom = Number(options.zoom ?? 7);
        this.label = container.getAttribute('aria-label')
          || Object.keys(container.dataset).find((key) => key.toLowerCase().includes('map'))
          || 'map';
        harness.maps.push({ label: this.label });
      }

      loaded() { return true; }
      isStyleLoaded() { return true; }
      addControl() { return this; }
      getContainer() { return this.container; }
      getCanvas() { return this.canvas; }
      getZoom() { return this.zoom; }
      resize() { return this; }
      remove() {
        this.container.classList.remove('maplibregl-map');
        this.canvas.remove();
      }

      addSource(sourceId: string, source: any) {
        const state = {
          ...source,
          setData(data: unknown) { state.data = data; },
        };
        this.sources.set(sourceId, state);
      }

      getSource(sourceId: string) { return this.sources.get(sourceId); }
      removeSource(sourceId: string) { this.sources.delete(sourceId); }
      addLayer(layer: any) { this.layers.set(layer.id, layer); }
      getLayer(layerId: string) { return this.layers.get(layerId); }
      removeLayer(layerId: string) { this.layers.delete(layerId); }
      setFilter(layerId: string, filter: unknown) {
        const layer = this.layers.get(layerId);
        if (layer) layer.filter = filter;
      }
      setPaintProperty(layerId: string, property: string, value: unknown) {
        const layer = this.layers.get(layerId);
        if (layer) layer.paint = { ...(layer.paint ?? {}), [property]: value };
      }
      setLayoutProperty() {}
      queryRenderedFeatures() { return []; }
      querySourceFeatures() { return []; }

      fitBounds(_bounds: unknown, options: Record<string, unknown> = {}) {
        harness.fitCalls.push({ label: this.label, options, at: Date.now() });
        return this;
      }

      jumpTo() {
        harness.cameraCalls.push({ label: this.label, method: 'jumpTo' });
        return this;
      }

      easeTo() {
        harness.cameraCalls.push({ label: this.label, method: 'easeTo' });
        return this;
      }

      flyTo() {
        harness.cameraCalls.push({ label: this.label, method: 'flyTo' });
        return this;
      }

      project(value: any) {
        const lng = Array.isArray(value) ? value[0] : value?.lng ?? value?.longitude ?? 0;
        const lat = Array.isArray(value) ? value[1] : value?.lat ?? value?.latitude ?? 0;
        return { x: Number(lng), y: Number(lat) };
      }

      unproject(value: any) {
        return { lng: Number(value?.[0] ?? value?.x ?? 0), lat: Number(value?.[1] ?? value?.y ?? 0) };
      }
    }

    class FakeMarker {
      element: HTMLElement;
      popup: FakePopup | null = null;
      map: FakeMap | null = null;
      lngLat = { lng: 0, lat: 0 };
      clickHandler = () => this.togglePopup();

      constructor(options: Record<string, any> = {}) {
        this.element = options.element instanceof HTMLElement ? options.element : document.createElement('div');
      }

      setLngLat(value: any) {
        this.lngLat = {
          lng: Number(Array.isArray(value) ? value[0] : value?.lng ?? value?.longitude ?? 0),
          lat: Number(Array.isArray(value) ? value[1] : value?.lat ?? value?.latitude ?? 0),
        };
        return this;
      }

      getLngLat() { return this.lngLat; }
      getElement() { return this.element; }
      setPopup(popup: FakePopup) { this.popup = popup; return this; }
      getPopup() { return this.popup; }

      addTo(map: FakeMap) {
        this.map = map;
        (this as any)._map = map;
        map.container.append(this.element);
        this.element.addEventListener('click', this.clickHandler);
        harness.markersAdded += 1;
        return this;
      }

      togglePopup() {
        if (!this.popup || !this.map) return this;
        if (this.popup.isOpen()) {
          this.popup.remove();
        } else {
          this.popup.open = true;
          this.map.container.append(this.popup.element);
          this.popup.emit('open');
        }
        return this;
      }

      remove() {
        this.element.removeEventListener('click', this.clickHandler);
        this.popup?.remove();
        this.element.remove();
        harness.markersRemoved += 1;
        return this;
      }
    }

    class FakeNavigationControl {
      constructor(readonly options: Record<string, unknown> = {}) {}
    }

    (window as any).__paddleMapHarness = harness;
    (window as any).maplibregl = {
      Map: FakeMap,
      Marker: FakeMarker,
      Popup: FakePopup,
      LngLatBounds: FakeBounds,
      NavigationControl: FakeNavigationControl,
    };
  });
}

export async function mapHarnessState(page: Page) {
  return page.evaluate(() => (window as any).__paddleMapHarness);
}
