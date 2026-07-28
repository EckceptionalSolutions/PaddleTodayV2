import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  MAP_STYLE_URL,
  bindMarkerPopup,
  clearMapMarkers,
  createMapStatusController,
  createPaddleMap,
  fitMapBounds,
  isMapReady,
  syncActualRiverLayer,
  waitForMapReady,
} from './map-runtime.js';

type Listener = (event?: { error?: Error }) => void;

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
  filterCalls: Array<{ layerId: string; filter: unknown }> = [];
  paintCalls: Array<{ layerId: string; property: string; value: unknown }> = [];

  constructor(readonly options: Record<string, unknown>) {}

  addControl(control: FakeNavigationControl, position: string) {
    this.controls.push({ control, position });
  }

  fitBounds(bounds: unknown, options: Record<string, unknown>) {
    this.fitCalls.push({ bounds, options });
  }

  getSource(sourceId: string) {
    return this.sources.get(sourceId);
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

  emit(eventName: string, event?: { error?: Error }) {
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
    const popupListeners = new Map<string, () => void>();
    const popup = {
      on(eventName: string, listener: () => void) {
        popupListeners.set(eventName, listener);
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

    nodeListeners.get('click')?.(new FakeKeyboardEvent(''));
    expect(attributes.get('aria-pressed')).toBe('true');
    expect(classToggles.at(-1)).toEqual({
      className: 'score-map-marker--selected',
      selected: true,
    });

    popupListeners.get('close')?.();
    expect(attributes.get('aria-pressed')).toBe('false');
    expect(selectedChanges).toEqual([true, false]);
  });
});
