import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  MAP_STYLE_URL,
  bindMarkerPopup,
  clearMapMarkers,
  createMapMarker,
  createMapStatusController,
  createPaddleMap,
  fitMapBounds,
  isMapReady,
  mapViewportOptions,
  removeMapOverlay,
  syncGeoJsonOverlay,
  syncActualRiverLayer,
  waitForMapReady,
} from './map-runtime.js';

type Listener = (event?: { error?: Error & { status?: number; url?: string }; sourceId?: string }) => void;

class FakeMap {
  controls: Array<{ control: FakeNavigationControl; position: string }> = [];
  listeners = new Map<string, Set<Listener>>();
  loadedValue = false;
  styleLoadedValue = false;
  fitCalls: Array<{ bounds: unknown; options: Record<string, unknown> }> = [];
  sources = new Map<string, unknown>([['openmaptiles', {}]]);
  layers = new Map<string, Record<string, unknown>>();
  addedLayers: Array<Record<string, unknown>> = [];
  removedLayers: string[] = [];
  removedSources: string[] = [];
  filterCalls: Array<{ layerId: string; filter: unknown }> = [];
  paintCalls: Array<{ layerId: string; property: string; value: unknown }> = [];
  layoutCalls: Array<{ layerId: string; property: string; value: unknown }> = [];

  constructor(readonly options: Record<string, unknown>) {}

  addControl(control: FakeNavigationControl, position: string) {
    this.controls.push({ control, position });
  }

  fitBounds(bounds: unknown, options: Record<string, unknown>) {
    this.fitCalls.push({ bounds, options });
  }

  getStyle() {
    return { sources: Object.fromEntries(this.sources) };
  }

  getSource(sourceId: string) {
    return this.sources.get(sourceId);
  }

  addSource(sourceId: string, source: unknown) {
    this.sources.set(sourceId, source);
  }

  removeSource(sourceId: string) {
    this.removedSources.push(sourceId);
    this.sources.delete(sourceId);
  }

  getLayer(layerId: string) {
    return this.layers.get(layerId);
  }

  addLayer(layer: Record<string, unknown>) {
    this.addedLayers.push(layer);
    this.layers.set(String(layer.id), layer);
  }

  removeLayer(layerId: string) {
    this.removedLayers.push(layerId);
    this.layers.delete(layerId);
  }

  setFilter(layerId: string, filter: unknown) {
    this.filterCalls.push({ layerId, filter });
  }

  setPaintProperty(layerId: string, property: string, value: unknown) {
    this.paintCalls.push({ layerId, property, value });
  }

  setLayoutProperty(layerId: string, property: string, value: unknown) {
    this.layoutCalls.push({ layerId, property, value });
  }

  loaded() {
    return this.loadedValue;
  }

  isStyleLoaded() {
    return this.styleLoadedValue;
  }

  on(eventName: string, listener: Listener) {
    const listeners = this.listeners.get(eventName) ?? new Set<Listener>();
    listeners.add(listener);
    this.listeners.set(eventName, listeners);
  }

  off(eventName: string, listener: Listener) {
    this.listeners.get(eventName)?.delete(listener);
  }

  emit(eventName: string, event?: { error?: Error & { status?: number; url?: string }; sourceId?: string }) {
    for (const listener of this.listeners.get(eventName) ?? []) {
      listener(event);
    }
  }
}

class FakeNavigationControl {
  constructor(readonly options: Record<string, unknown>) {}
}

function fakeMapLibre() {
  return {
    Map: FakeMap,
    NavigationControl: FakeNavigationControl,
  };
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('createPaddleMap', () => {
  it('recovers initial glyph failures once without retrying unrelated or permanent errors', () => {
    vi.useFakeTimers();
    vi.stubGlobal('window', new EventTarget());
    vi.stubGlobal('navigator', { onLine: true });
    class FontMap extends FakeMap {
      getGlyphs() { return 'https://example.test/fonts/{fontstack}/{range}.pbf'; }
      setGlyphs = vi.fn();
    }
    const runtime = createPaddleMap({ ...fakeMapLibre(), Map: FontMap });
    const data = { type: 'FeatureCollection', features: [] };
    const source = { type: 'geojson', data, setData: vi.fn() };
    runtime.addSource('labels', source);
    const failure = (status: number, url = 'https://example.test/fonts/Regular/0-255.pbf') => ({
      sourceId: 'labels', error: Object.assign(new Error('Font unavailable'), { status, url }),
    });
    runtime.emit('error', failure(403));
    runtime.emit('error', failure(503, 'https://example.test/routes.json'));
    vi.advanceTimersByTime(1500);
    expect(source.setData).not.toHaveBeenCalled();
    runtime.emit('error', failure(503));
    runtime.emit('error', failure(503));
    vi.advanceTimersByTime(1500);
    expect(runtime.setGlyphs).toHaveBeenCalledExactlyOnceWith(runtime.getGlyphs());
    expect(source.setData).toHaveBeenCalledExactlyOnceWith(data);
    runtime.emit('error', failure(503));
    vi.advanceTimersByTime(30000);
    expect(source.setData).toHaveBeenCalledOnce();
  });

  it('clears failed glyph requests on reconnect before reloading a label source', () => {
    const browser = new EventTarget();
    const navigator = { onLine: false };
    vi.stubGlobal('window', browser);
    vi.stubGlobal('navigator', navigator);
    class FontMap extends FakeMap {
      getGlyphs() { return 'https://example.test/fonts/{fontstack}/{range}.pbf'; }
      setGlyphs = vi.fn();
    }
    const runtime = createPaddleMap({ ...fakeMapLibre(), Map: FontMap });
    const source = { type: 'geojson', data: {}, setData: vi.fn() };
    runtime.addSource('labels', source);
    runtime.emit('error', { sourceId: 'labels', error: Object.assign(new Error('Offline'), {
      status: 0, url: 'https://example.test/fonts/Regular/0-255.pbf',
    }) });
    navigator.onLine = true;
    browser.dispatchEvent(new Event('online'));
    browser.dispatchEvent(new Event('online'));
    expect(runtime.setGlyphs).toHaveBeenCalledExactlyOnceWith(runtime.getGlyphs());
    expect(source.setData).toHaveBeenCalledOnce();
    expect(runtime.setGlyphs.mock.invocationCallOrder[0]).toBeLessThan(source.setData.mock.invocationCallOrder[0]);
  });

  it('retains ordered overlay changes during graphics recovery and discards them on removal', () => {
    class RecoverableMap extends FakeMap {
      getStyle() { return { ...super.getStyle(), layers: [] }; }
      setStyle = vi.fn();
    }
    const runtime = createPaddleMap({ ...fakeMapLibre(), Map: RecoverableMap });
    const overlay = { sourceId: 'late-route', data: { type: 'FeatureCollection', features: [] }, layers: [{ id: 'late-line', type: 'line' }] };
    runtime.emit('webglcontextrestored');
    syncGeoJsonOverlay(runtime, overlay);
    removeMapOverlay(runtime, { layerIds: ['late-line'], sourceIds: ['late-route'] });
    expect(runtime.addedLayers).toEqual([]);
    runtime.emit('style.load');
    expect(runtime.addedLayers).toHaveLength(1);
    expect(runtime.removedLayers).toEqual(['late-line']);
    expect(runtime.getSource('late-route')).toBeUndefined();
    runtime.emit('webglcontextrestored');
    syncGeoJsonOverlay(runtime, overlay);
    runtime.emit('remove');
    runtime.emit('style.load');
    expect(runtime.addedLayers).toHaveLength(1);
  });

  it('rebuilds the current style after graphics restoration and detaches on removal', () => {
    const style = { version: 8, sources: { route: { type: 'geojson' } }, layers: [{ id: 'route' }] };
    class RecoverableMap extends FakeMap {
      getStyle() { return style; }
      setStyle = vi.fn();
    }
    const runtime = createPaddleMap({ ...fakeMapLibre(), Map: RecoverableMap });
    runtime.emit('webglcontextlost');
    expect(runtime.setStyle).not.toHaveBeenCalled();
    runtime.emit('webglcontextrestored');
    expect(runtime.setStyle).toHaveBeenCalledExactlyOnceWith(style, { diff: false });
    runtime.emit('remove');
    runtime.emit('webglcontextrestored');
    expect(runtime.setStyle).toHaveBeenCalledOnce();
    expect(runtime.listeners.get('webglcontextrestored')?.size).toBe(0);
  });

  it('retries only failed offline vector sources when connectivity returns', () => {
    const browser = new EventTarget();
    const navigator = { onLine: false };
    vi.stubGlobal('window', browser);
    vi.stubGlobal('navigator', navigator);
    const runtime = createPaddleMap(fakeMapLibre());
    const base = { type: 'vector', url: 'https://example.test/tiles.json', setUrl: vi.fn() };
    const unaffected = { type: 'vector', tiles: ['https://example.test/{z}/{x}/{y}.pbf'], setTiles: vi.fn() };
    const route = { type: 'geojson', setData: vi.fn() };
    runtime.addSource('base', base);
    runtime.addSource('unaffected', unaffected);
    runtime.addSource('route', route);
    runtime.emit('error', { sourceId: 'base' });
    runtime.emit('error', { sourceId: 'base' });
    runtime.emit('error', { sourceId: 'route' });
    navigator.onLine = true;
    browser.dispatchEvent(new Event('online'));
    browser.dispatchEvent(new Event('online'));
    expect(base.setUrl).toHaveBeenCalledExactlyOnceWith(base.url);
    expect(unaffected.setTiles).not.toHaveBeenCalled();
    expect(route.setData).not.toHaveBeenCalled();
    expect(runtime.fitCalls).toEqual([]);
    navigator.onLine = false;
    runtime.emit('error', { sourceId: 'unaffected' });
    navigator.onLine = true;
    browser.dispatchEvent(new Event('online'));
    expect(unaffected.setTiles).toHaveBeenCalledExactlyOnceWith(unaffected.tiles);
  });

  it('coalesces transient loaded-tile retries and cancels them on removal', () => {
    vi.useFakeTimers();
    vi.stubGlobal('window', new EventTarget());
    vi.stubGlobal('navigator', { onLine: true });
    const runtime = createPaddleMap(fakeMapLibre());
    const source = { type: 'vector', url: 'https://example.test/tiles.json', setUrl: vi.fn() };
    runtime.addSource('base', source);
    const failure = { sourceId: 'base', error: Object.assign(new Error('Service unavailable'), { status: 503 }) };
    runtime.emit('error', failure);
    vi.advanceTimersByTime(1500);
    expect(source.setUrl).not.toHaveBeenCalled();
    runtime.emit('load');
    runtime.emit('error', failure);
    runtime.emit('error', failure);
    vi.advanceTimersByTime(1500);
    expect(source.setUrl).toHaveBeenCalledOnce();
    runtime.emit('error', failure);
    vi.advanceTimersByTime(30000);
    expect(source.setUrl).toHaveBeenCalledOnce();
    runtime.emit('error', { sourceId: 'base', error: Object.assign(new Error('Forbidden'), { status: 403 }) });
    vi.advanceTimersByTime(1500);
    expect(source.setUrl).toHaveBeenCalledOnce();
    runtime.emit('error', failure);
    runtime.emit('remove');
    vi.runAllTimers();
    expect(source.setUrl).toHaveBeenCalledOnce();
  });

  it('does not retry online errors or retain recovery listeners after removal', () => {
    const browser = new EventTarget();
    const navigator = { onLine: true };
    vi.stubGlobal('window', browser);
    vi.stubGlobal('navigator', navigator);
    const runtime = createPaddleMap(fakeMapLibre());
    const source = { type: 'vector', tiles: ['https://example.test/{z}/{x}/{y}.pbf'], setTiles: vi.fn() };
    runtime.addSource('base', source);
    runtime.emit('error', { sourceId: 'base' });
    browser.dispatchEvent(new Event('online'));
    expect(source.setTiles).not.toHaveBeenCalled();
    navigator.onLine = false;
    runtime.emit('error', { sourceId: 'base' });
    runtime.emit('remove');
    navigator.onLine = true;
    browser.dispatchEvent(new Event('online'));
    expect(source.setTiles).not.toHaveBeenCalled();
    expect(runtime.listeners.get('error')?.size ?? 0).toBe(0);
    expect(runtime.listeners.get('remove')?.size ?? 0).toBe(0);
  });

  it('applies interactive defaults and one navigation control', () => {
    const runtime = createPaddleMap(fakeMapLibre(), {
      container: 'map',
      center: [-93.2, 45.1],
      zoom: 6,
    }) as FakeMap;

    expect(runtime.options).toMatchObject({
      style: MAP_STYLE_URL,
      attributionControl: true,
      container: 'map',
      center: [-93.2, 45.1],
      zoom: 6,
    });
    expect(runtime.controls).toHaveLength(1);
    expect(runtime.controls[0]).toMatchObject({
      position: 'top-right',
      control: {
        options: { showCompass: false },
      },
    });
  });

  it('uses a non-interactive, control-free static preview profile', () => {
    const runtime = createPaddleMap(fakeMapLibre(), {
      profile: 'staticPreview',
      container: 'preview',
    }) as FakeMap;

    expect(runtime.options).toMatchObject({
      style: MAP_STYLE_URL,
      attributionControl: false,
      interactive: false,
      container: 'preview',
    });
    expect(runtime.controls).toEqual([]);
  });

  it('allows an explicit option to override a profile default', () => {
    const runtime = createPaddleMap(fakeMapLibre(), {
      profile: 'staticPreview',
      container: 'preview',
      interactive: true,
      navigationControl: true,
      navigationPosition: 'bottom-left',
    }) as FakeMap;

    expect(runtime.options.interactive).toBe(true);
    expect(runtime.controls[0]?.position).toBe('bottom-left');
  });

  it('rejects unknown profiles and incomplete runtimes', () => {
    expect(() => createPaddleMap(fakeMapLibre(), { profile: 'missing' })).toThrow(
      'Unknown map profile'
    );
    expect(() => createPaddleMap(null)).toThrow('MapLibre runtime missing');
  });
});

describe('map readiness', () => {
  it('releases a pending readiness wait immediately when its map is removed', async () => {
    vi.useFakeTimers();
    const runtime = new FakeMap({});
    const ready = waitForMapReady(runtime, { timeoutMs: 7000 });
    const rejected = expect(ready).rejects.toThrow('Map removed before it became ready');
    runtime.emit('remove');
    await rejected;
    expect(vi.getTimerCount()).toBe(0);
    expect([...runtime.listeners.values()].every(listeners => listeners.size === 0)).toBe(true);
  });

  it('can accept a parsed style while its background tiles are pending', async () => {
    vi.useFakeTimers();
    const runtime = new FakeMap({});
    const ready = waitForMapReady(runtime, { waitForTiles: false, rejectOnTimeout: true });
    runtime.getStyle = () => ({ version: 8, layers: [], sources: {} });
    runtime.emit('style.load');
    await expect(ready).resolves.toBe(true);
    expect(isMapReady(runtime)).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    expect([...runtime.listeners.values()].every(listeners => listeners.size === 0)).toBe(true);
  });

  it('recognizes a loaded map with a loaded style', () => {
    const runtime = new FakeMap({});
    runtime.loadedValue = true;
    runtime.styleLoadedValue = true;

    expect(isMapReady(runtime)).toBe(true);
    expect(waitForMapReady(runtime)).resolves.toBe(true);
  });

  it('waits for both runtime and style readiness and removes listeners', async () => {
    vi.useFakeTimers();
    const runtime = new FakeMap({});
    const ready = waitForMapReady(runtime, { timeoutMs: 500 });

    runtime.loadedValue = true;
    runtime.emit('load');
    expect(isMapReady(runtime)).toBe(false);

    runtime.styleLoadedValue = true;
    runtime.emit('styledata');

    await expect(ready).resolves.toBe(true);
    expect([...runtime.listeners.values()].every((listeners) => listeners.size === 0)).toBe(true);
  });

  it('supports tolerant and strict timeout policies', async () => {
    vi.useFakeTimers();
    const tolerantRuntime = new FakeMap({});
    const tolerant = waitForMapReady(tolerantRuntime, { timeoutMs: 100 });
    await vi.advanceTimersByTimeAsync(100);
    await expect(tolerant).resolves.toBe(false);

    const strictRuntime = new FakeMap({});
    const strict = waitForMapReady(strictRuntime, {
      timeoutMs: 100,
      rejectOnTimeout: true,
    });
    const strictExpectation = expect(strict).rejects.toThrow('Map readiness timed out');
    await vi.advanceTimersByTimeAsync(100);
    await strictExpectation;
  });

  it('can treat MapLibre errors as fatal', async () => {
    const runtime = new FakeMap({});
    const ready = waitForMapReady(runtime, {
      timeoutMs: 500,
      rejectOnError: true,
    });
    runtime.emit('error', { error: new Error('style failed') });

    await expect(ready).rejects.toThrow('style failed');
  });
});

describe('map status', () => {
  it('clears background feedback after the initial load and ignores later tile work', () => {
    const runtime = createPaddleMap(fakeMapLibre());
    const element = { textContent: '', dataset: { mapState: '' } };
    const status = createMapStatusController(element);
    status.ready({ message: 'Showing 2 routes.', backgroundMap: runtime });
    expect(element.textContent).toBe('Showing 2 routes. Background map is loading.');
    expect(element.dataset).toHaveProperty('mapBackgroundLoading', 'true');
    runtime.emit('load');
    expect(element.textContent).toBe('Showing 2 routes.');
    expect(element.dataset).not.toHaveProperty('mapBackgroundLoading');
    status.ready({ message: 'Showing 3 routes.', backgroundMap: runtime });
    expect(element.textContent).toBe('Showing 3 routes.');
    expect([...runtime.listeners.values()].every(listeners => listeners.size === 0)).toBe(true);
  });

  it('does not let a previous background load overwrite newer map feedback', () => {
    const runtime = createPaddleMap(fakeMapLibre());
    const element = { textContent: '', dataset: { mapState: '' } };
    const status = createMapStatusController(element);
    status.ready({ message: 'Showing routes.', backgroundMap: runtime });
    status.unavailable({ message: 'Map unavailable.' });
    expect(element.dataset).not.toHaveProperty('mapBackgroundLoading');
    runtime.emit('load');
    expect(element.textContent).toBe('Map unavailable.');
    expect(element.dataset.mapState).toBe('unavailable');
  });

  it('does not repeat a text mutation when the announced message is unchanged', () => {
    let text = 'Routes are ready.';
    const write = vi.fn((value: string) => { text = value; });
    const element = {
      get textContent() { return text; },
      set textContent(value: string) { write(value); },
    };
    const status = createMapStatusController(element);
    status.ready({ message: text });
    status.ready({ message: text });
    expect(write).not.toHaveBeenCalled();
    status.unavailable({ message: 'Map unavailable.' });
    expect(write).toHaveBeenCalledExactlyOnceWith('Map unavailable.');
  });

  it('applies shared lifecycle state while allowing page-specific copy', () => {
    const attributes = new Map<string, string>();
    const element = {
      dataset: {} as Record<string, string>,
      textContent: '',
      setAttribute(name: string, value: string) {
        attributes.set(name, value);
      },
    };
    const status = createMapStatusController(element, {
      loading: ({ nearby }: { nearby?: boolean }) => nearby ? 'Loading nearby picks.' : 'Loading map.',
      unavailable: 'Map unavailable.',
    });

    expect(status.loading({ nearby: true })).toBe(true);
    expect(element).toMatchObject({
      dataset: { mapState: 'loading' },
      textContent: 'Loading nearby picks.',
    });
    expect(attributes.get('aria-busy')).toBe('true');

    expect(status.ready({ message: 'Map is up to date.' })).toBe(true);
    expect(element).toMatchObject({
      dataset: { mapState: 'ready' },
      textContent: 'Map is up to date.',
    });
    expect(attributes.get('aria-busy')).toBe('false');

    expect(status.unavailable()).toBe(true);
    expect(element).toMatchObject({
      dataset: { mapState: 'unavailable' },
      textContent: 'Map unavailable.',
    });
  });

  it('is safe when a page has no map status element', () => {
    const status = createMapStatusController(null);

    expect(status.loading()).toBe(false);
    expect(status.ready()).toBe(false);
    expect(status.empty()).toBe(false);
    expect(status.unavailable()).toBe(false);
  });
});

describe('map viewport and marker lifecycle', () => {
  it('creates generic endpoint and popup markers through one lifecycle', () => {
    const marker = {
      point: null as unknown,
      popup: null as unknown,
      map: null as unknown,
      setLngLat(point: unknown) {
        this.point = point;
        return this;
      },
      setPopup(popup: unknown) {
        this.popup = popup;
        return this;
      },
      addTo(map: unknown) {
        this.map = map;
        return this;
      },
    };
    const popup = {
      html: '',
      setHTML(html: string) {
        this.html = html;
        return this;
      },
    };
    const maplibregl = {
      Marker: class {
        constructor() {
          return marker;
        }
      },
      Popup: class {
        constructor() {
          return popup;
        }
      },
    };
    const mapRuntime = {};

    expect(createMapMarker({
      maplibregl,
      mapRuntime,
      element: {},
      point: { longitude: -93, latitude: 45 },
      popupHtml: '<p>Put-in</p>',
    })).toBe(marker);
    expect(marker).toMatchObject({
      point: [-93, 45],
      popup,
      map: mapRuntime,
    });
    expect(popup.html).toBe('<p>Put-in</p>');
  });

  it('resolves named viewport profiles for compact and wide layouts', () => {
    expect(mapViewportOptions('results')).toEqual({
      padding: { top: 52, right: 52, bottom: 52, left: 52 },
      maxZoom: 8.2,
      duration: 0,
    });
    expect(mapViewportOptions('selectedRiver', { compact: true })).toEqual({
      padding: { top: 58, right: 46, bottom: 58, left: 46 },
      maxZoom: 9.2,
      duration: 520,
    });
    expect(mapViewportOptions('selectedRoute', {
      compact: true,
      duration: 125,
    })).toEqual({
      padding: { top: 72, right: 72, bottom: 72, left: 72 },
      maxZoom: 11.2,
      duration: 125,
    });
    expect(mapViewportOptions('favorites', { compact: true })).toEqual({
      padding: { top: 32, right: 84, bottom: 96, left: 32 },
      maxZoom: 10.2,
      duration: 650,
    });
    expect(mapViewportOptions('riverGroupSelected')).toEqual({
      padding: { top: 72, right: 72, bottom: 72, left: 72 },
      maxZoom: 11.2,
      duration: 520,
    });
    expect(mapViewportOptions('weekendResults', { compact: true })).toEqual({
      padding: { top: 28, right: 28, bottom: 28, left: 28 },
      maxZoom: 8.4,
      duration: 0,
    });
    expect(mapViewportOptions('featuredHome')).toEqual({
      padding: { top: 26, right: 26, bottom: 26, left: 26 },
      maxZoom: 10.9,
      duration: 0,
    });
    expect(mapViewportOptions('featuredExplore')).toEqual({
      padding: { top: 34, right: 30, bottom: 34, left: 30 },
      maxZoom: 10.4,
      duration: 0,
    });
    expect(() => mapViewportOptions('missing')).toThrow('Unknown map viewport profile');
  });

  it('fits with a named viewport profile and honors refresh preservation', () => {
    const runtime = new FakeMap({});
    const bounds = [[-94, 44], [-92, 46]];

    expect(fitMapBounds(runtime, bounds, {
      profile: 'results',
      compact: true,
    })).toBe(true);
    expect(runtime.fitCalls[0]).toEqual({
      bounds,
      options: {
        padding: { top: 22, right: 22, bottom: 22, left: 22 },
        maxZoom: 8.2,
        duration: 0,
      },
    });

    expect(fitMapBounds(runtime, bounds, {
      profile: 'results',
      preserveViewport: true,
    })).toBe(false);
    expect(runtime.fitCalls).toHaveLength(1);
  });

  it('fits with caller policy while honoring reduced motion and viewport preservation', () => {
    const runtime = new FakeMap({});
    const bounds = [[-94, 44], [-92, 46]];

    expect(fitMapBounds(runtime, bounds, {
      padding: 40,
      maxZoom: 9,
      duration: 500,
      reducedMotion: true,
    })).toBe(true);
    expect(runtime.fitCalls[0]).toEqual({
      bounds,
      options: {
        padding: 40,
        maxZoom: 9,
        duration: 0,
      },
    });

    expect(fitMapBounds(runtime, bounds, {
      preserveViewport: true,
      duration: 500,
    })).toBe(false);
    expect(runtime.fitCalls).toHaveLength(1);
  });

  it('removes every registered marker and returns an empty replacement registry', () => {
    const markers = [
      { remove: vi.fn() },
      { remove: vi.fn() },
      null,
    ];

    expect(clearMapMarkers(markers)).toEqual([]);
    expect(markers[0]?.remove).toHaveBeenCalledOnce();
    expect(markers[1]?.remove).toHaveBeenCalledOnce();
  });
});

describe('GeoJSON overlay lifecycle', () => {
  it('updates requested layer styling with its data after graphics recovery', () => {
    class RecoverableMap extends FakeMap {
      getStyle() { return { ...super.getStyle(), layers: [...this.layers.values()] }; }
      setStyle = vi.fn();
    }
    const runtime = createPaddleMap({ ...fakeMapLibre(), Map: RecoverableMap });
    const initial = { sourceId: 'route', data: { type: 'FeatureCollection', features: [] },
      layers: [{ id: 'route-line', type: 'line', paint: { 'line-color': '#123456' } }] };
    syncGeoJsonOverlay(runtime, initial);
    const source = runtime.getSource('route');
    source.setData = vi.fn();
    const changed = { ...initial, layers: [{ ...initial.layers[0], paint: { 'line-color': '#654321' },
      layout: { visibility: 'visible' }, filter: ['==', ['get', 'slug'], 'new-selection'] }] };
    syncGeoJsonOverlay(runtime, changed);
    expect(runtime.paintCalls).toEqual([]);
    source.setData.mockClear();
    runtime.emit('webglcontextrestored');
    syncGeoJsonOverlay(runtime, { ...changed, updateLayerStyle: true });
    expect(runtime.paintCalls).toEqual([]);
    expect(source.setData).not.toHaveBeenCalled();
    runtime.emit('style.load');
    expect(source.setData).toHaveBeenCalledOnce();
    expect(runtime.paintCalls).toEqual([{ layerId: 'route-line', property: 'line-color', value: '#654321' }]);
    expect(runtime.layoutCalls).toEqual([{ layerId: 'route-line', property: 'visibility', value: 'visible' }]);
    expect(runtime.filterCalls).toEqual([{ layerId: 'route-line', filter: changed.layers[0].filter }]);
    expect(runtime.addedLayers).toHaveLength(1);
  });

  it('skips identical cached data, updates changed data, and restores a replaced source', () => {
    const runtime = new FakeMap({});
    const data = { type: 'FeatureCollection', features: [] };
    const options = { sourceId: 'cached', data, skipUnchangedData: true };
    syncGeoJsonOverlay(runtime, options);
    const source = runtime.getSource('cached') as { setData: ReturnType<typeof vi.fn> };
    source.setData = vi.fn();
    syncGeoJsonOverlay(runtime, options);
    expect(source.setData).not.toHaveBeenCalled();
    syncGeoJsonOverlay(runtime, { ...options, data: { ...data } });
    expect(source.setData).toHaveBeenCalledOnce();
    const replacement = { setData: vi.fn() };
    runtime.sources.set('cached', replacement);
    syncGeoJsonOverlay(runtime, options);
    expect(replacement.setData).toHaveBeenCalledWith(data);
    runtime.removeSource('cached');
    syncGeoJsonOverlay(runtime, options);
    expect(runtime.getSource('cached')).toEqual({ type: 'geojson', data });
  });

  it('adds a source and its layers once, then updates source data', () => {
    const runtime = new FakeMap({});
    const initialData = { type: 'FeatureCollection', features: [] };
    const updatedData = {
      type: 'FeatureCollection',
      features: [{ type: 'Feature', geometry: null, properties: {} }],
    };
    const layer = {
      id: 'routes',
      type: 'line',
      paint: { 'line-color': '#16758a' },
    };

    expect(syncGeoJsonOverlay(runtime, {
      sourceId: 'route-data',
      data: initialData,
      layers: [layer],
    })).toBe(true);
    expect(runtime.getSource('route-data')).toEqual({
      type: 'geojson',
      data: initialData,
    });
    expect(runtime.getLayer('routes')).toMatchObject({
      ...layer,
      source: 'route-data',
    });

    const setData = vi.fn();
    runtime.sources.set('route-data', { setData });
    syncGeoJsonOverlay(runtime, {
      sourceId: 'route-data',
      data: updatedData,
      layers: [layer],
    });

    expect(setData).toHaveBeenCalledWith(updatedData);
    expect(runtime.addedLayers).toHaveLength(1);
  });

  it('removes layers before their source and tolerates a missing map', () => {
    const runtime = new FakeMap({});
    runtime.sources.set('route-data', {});
    runtime.layers.set('route-casing', {});
    runtime.layers.set('routes', {});

    expect(removeMapOverlay(runtime, {
      layerIds: ['routes', 'route-casing'],
      sourceIds: ['route-data'],
    })).toBe(true);
    expect(runtime.removedLayers).toEqual(['routes', 'route-casing']);
    expect(runtime.removedSources).toEqual(['route-data']);
    expect(removeMapOverlay(null)).toBe(false);
  });
});

describe('actual river overlay lifecycle', () => {
  it('adds, updates, and removes one idempotent overlay', () => {
    const runtime = new FakeMap({});

    syncActualRiverLayer(runtime, 'selected-river', ['North Fork Crow River'], {
      lineColor: '#123456',
      lineWidth: 4,
    });

    expect(runtime.addedLayers).toHaveLength(1);
    expect(runtime.addedLayers[0]).toMatchObject({
      id: 'selected-river',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'waterway',
      paint: {
        'line-color': '#123456',
        'line-width': 4,
        'line-opacity': 0.58,
      },
    });
    expect(JSON.stringify(runtime.addedLayers[0]?.filter)).toContain('North Fork Crow River');
    expect(JSON.stringify(runtime.addedLayers[0]?.filter)).toContain('Crow River');

    syncActualRiverLayer(runtime, 'selected-river', ['Pine River'], {
      lineColor: '#abcdef',
      lineWidth: 7,
      lineOpacity: 0.8,
    });

    expect(runtime.addedLayers).toHaveLength(1);
    expect(runtime.filterCalls).toHaveLength(1);
    expect(runtime.paintCalls).toEqual([
      { layerId: 'selected-river', property: 'line-color', value: '#abcdef' },
      { layerId: 'selected-river', property: 'line-width', value: 7 },
      { layerId: 'selected-river', property: 'line-opacity', value: 0.8 },
    ]);

    syncActualRiverLayer(runtime, 'selected-river', []);

    expect(runtime.removedLayers).toEqual(['selected-river']);
    expect(runtime.getLayer('selected-river')).toBeUndefined();
  });

  it('registers style listeners once and reapplies every tracked overlay after a style reset', () => {
    const runtime = new FakeMap({});

    syncActualRiverLayer(runtime, 'river-one', ['Rum River']);
    syncActualRiverLayer(runtime, 'river-two', ['St. Croix River']);

    expect(runtime.listeners.get('load')?.size).toBe(1);
    expect(runtime.listeners.get('styledata')?.size).toBe(1);
    expect(runtime.listeners.get('idle')?.size).toBe(1);
    expect(runtime.addedLayers).toHaveLength(2);

    runtime.layers.clear();
    runtime.emit('styledata');

    expect(runtime.addedLayers).toHaveLength(4);
    expect(runtime.getLayer('river-one')).toBeDefined();
    expect(runtime.getLayer('river-two')).toBeDefined();

    runtime.emit('idle');
    expect(runtime.addedLayers).toHaveLength(4);
  });

  it('waits to add an overlay until the vector source exists', () => {
    const runtime = new FakeMap({});
    runtime.sources.delete('openmaptiles');

    syncActualRiverLayer(runtime, 'deferred-river', ['Cannon River']);
    expect(runtime.addedLayers).toHaveLength(0);

    runtime.sources.set('openmaptiles', {});
    runtime.emit('styledata');
    expect(runtime.addedLayers).toHaveLength(1);
  });
});

describe('marker popup interaction', () => {
  it('keeps selection state in sync and supports keyboard activation', () => {
    class FakeKeyboardEvent {
      defaultPrevented = false;

      constructor(readonly key: string) {}

      preventDefault() {
        this.defaultPrevented = true;
      }
    }

    vi.stubGlobal('KeyboardEvent', FakeKeyboardEvent);
    vi.stubGlobal('window', { setTimeout: vi.fn() });

    const nodeListeners = new Map<string, (event: FakeKeyboardEvent) => void>();
    const classToggles: Array<{ className: string; selected: boolean }> = [];
    const attributes = new Map<string, string>();
    const markerNode = {
      classList: {
        toggle(className: string, selected: boolean) {
          classToggles.push({ className, selected });
        },
      },
      setAttribute(name: string, value: string) {
        attributes.set(name, value);
      },
      addEventListener(eventName: string, listener: (event: FakeKeyboardEvent) => void) {
        nodeListeners.set(eventName, listener);
      },
    };
    const popupListeners = new Map<string, Array<() => void>>();
    const popup = {
      on(eventName: string, listener: () => void) {
        popupListeners.set(eventName, [...(popupListeners.get(eventName) || []), listener]);
      },
    };
    const marker = {
      getPopup: vi.fn(() => popup),
      togglePopup: vi.fn(),
    };
    const selectedChanges: boolean[] = [];

    bindMarkerPopup(marker, markerNode, {
      onSelectedChange: (selected: boolean) => selectedChanges.push(selected),
    });

    const enterEvent = new FakeKeyboardEvent('Enter');
    nodeListeners.get('keydown')?.(enterEvent);
    expect(enterEvent.defaultPrevented).toBe(true);
    expect(marker.togglePopup).toHaveBeenCalledOnce();

    popupListeners.get('open')?.forEach(listener => listener());
    expect(attributes.get('aria-pressed')).toBe('true');
    expect(classToggles.at(-1)).toEqual({
      className: 'score-map-marker--selected',
      selected: true,
    });

    popupListeners.get('close')?.forEach(listener => listener());
    // The closing pointer event must not reselect a now-closed popup.
    nodeListeners.get('click')?.(new FakeKeyboardEvent(''));
    expect(attributes.get('aria-pressed')).toBe('false');
    expect(selectedChanges).toEqual([true, false]);
  });
});
