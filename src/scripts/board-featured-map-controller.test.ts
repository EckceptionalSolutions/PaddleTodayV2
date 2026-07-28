import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createBoardFeaturedMapController,
  featuredRouteFallbackFeature,
  featuredRouteLineColor,
} from './board-featured-map-controller.js';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('board featured map controller', () => {
  it('owns shared rating colors and access-point fallback geometry', () => {
    expect(featuredRouteLineColor('Strong')).toBe('#2c8a54');
    expect(featuredRouteLineColor('Fair')).toBe('#ad752c');
    expect(featuredRouteLineColor('No-go')).toBe('#bb5840');
    expect(featuredRouteFallbackFeature([{ longitude: -93, latitude: 45 }])).toBeNull();
    expect(featuredRouteFallbackFeature([
      { longitude: -93, latitude: 45 },
      { longitude: -92, latitude: 46 },
    ])).toMatchObject({
      geometry: {
        type: 'LineString',
        coordinates: [[-93, 45], [-92, 46]],
      },
    });
  });

  it('renders access markers, route line, fit policy, and status through one lifecycle', async () => {
    class FakeElement {
      hidden = false;
      textContent = '';
      className = '';
      innerHTML = '';
      attributes = new Map<string, string>();
      setAttribute(name: string, value: string) {
        this.attributes.set(name, value);
      }
    }
    vi.stubGlobal('HTMLElement', FakeElement);

    const runtime = {
      sources: new Map<string, { setData: ReturnType<typeof vi.fn> }>(),
      layers: new Map<string, unknown>(),
      addSource: vi.fn(function (sourceId, options) {
        this.sources.set(sourceId, { setData: vi.fn(), ...options });
      }),
      getSource: vi.fn(function (sourceId) {
        return this.sources.get(sourceId);
      }),
      addLayer: vi.fn(function (layer) {
        this.layers.set(layer.id, layer);
      }),
      getLayer: vi.fn(function (layerId) {
        return this.layers.get(layerId);
      }),
      removeLayer: vi.fn(),
      removeSource: vi.fn(),
      setPaintProperty: vi.fn(),
      resize: vi.fn(),
      jumpTo: vi.fn(),
    };
    class FakeMarker {
      setLngLat = vi.fn(() => this);
      addTo = vi.fn(() => this);
    }
    class FakeBounds {
      points: unknown[] = [];
      extend(point) {
        this.points.push(point);
      }
    }
    const maplibregl = { Marker: FakeMarker, LngLatBounds: FakeBounds };
    const shell = new FakeElement();
    const container = new FakeElement();
    const status = new FakeElement();
    const caption = new FakeElement();
    const routeLine = featuredRouteFallbackFeature([
      { longitude: -93, latitude: 45 },
      { longitude: -92, latitude: 46 },
    ]);
    const fitBounds = vi.fn();
    const controller = createBoardFeaturedMapController({
      elements: { shell, container, status, caption },
      getAccessPoints: () => [
        { longitude: -93, latitude: 45, kind: 'putIn' },
        { longitude: -92, latitude: 46, kind: 'takeOut' },
      ],
      getRouteLine: vi.fn().mockResolvedValue(routeLine),
      getTracedCoordinates: () => [],
      markerClassFor: () => 'score-marker',
      markerLabel: () => '87',
      statusLabel: () => 'Minnesota',
      viewportProfile: 'featuredHome',
      ensureMapLibreImpl: vi.fn().mockResolvedValue(maplibregl),
      createMap: vi.fn(() => runtime),
      clearMarkers: vi.fn(() => []),
      fitBounds,
      isReady: () => true,
      waitUntilReady: vi.fn().mockResolvedValue(true),
      documentObject: { createElement: () => new FakeElement() },
    });
    const item = {
      cardRoute: {
        rating: 'Strong',
        river: { latitude: 45.5, longitude: -92.5 },
      },
    };

    await controller.renderFeaturedMap(item, { visible: true, status: 'Loading map' });

    expect(runtime.addSource).toHaveBeenCalledWith(
      'featured-route-line',
      { type: 'geojson', data: routeLine },
    );
    expect(runtime.setPaintProperty).toHaveBeenCalledWith(
      'featured-route-line',
      'line-color',
      '#2c8a54',
    );
    expect(fitBounds).toHaveBeenCalledWith(
      runtime,
      expect.any(FakeBounds),
      {
        profile: 'featuredHome',
      },
    );
    expect(runtime.resize).toHaveBeenCalledOnce();
    expect(status.textContent).toBe('Minnesota');
    expect(status.hidden).toBe(false);
    expect(controller.getRuntime()).toBe(runtime);
  });
});
