import { describe, expect, it, vi } from 'vitest';
import { createCanonicalRouteMemo, createConditionMarkerCache } from './board-map-cache.js';

describe('canonical route memo', () => {
  it('reuses traces across callers but recomputes for changed access points or geometry', () => {
    const memo = createCanonicalRouteMemo();
    const feature = {};
    const points = [{ longitude: -93, latitude: 45 }, { longitude: -92, latitude: 46 }];
    const compute = vi.fn(() => ({ geometry: {} }));
    const first = memo(feature, points, compute);
    expect(memo(feature, points.map((point) => ({ ...point })), compute)).toBe(first);
    expect(compute).toHaveBeenCalledOnce();
    memo(feature, [...points, { longitude: -91, latitude: 46 }], compute);
    memo({}, points, compute);
    expect(compute).toHaveBeenCalledTimes(3);
  });

  it('caches missing canonical traces but never freezes tile-derived fallback geometry', () => {
    const memo = createCanonicalRouteMemo();
    const feature = {};
    const compute = vi.fn(() => null);
    memo(feature, [], compute);
    memo(feature, [], compute);
    expect(compute).toHaveBeenCalledOnce();
    memo(null, [], compute);
    memo(null, [], compute);
    expect(compute).toHaveBeenCalledTimes(3);
  });
});

describe('condition marker reconciliation', () => {
  function setup() {
    const reconcile = createConditionMarkerCache();
    const createMarker = vi.fn(() => ({ remove: vi.fn() }));
    const addMarker = vi.fn();
    const item = { key: 'river' };
    const zone = { item };
    const route = { item };
    const render = (mode: string, records: object[], items: object[] = [item]) =>
      reconcile({ mode, records, items, createMarker, addMarker });
    return { render, createMarker, addMarker, item, zone, route };
  }

  it('does no marker work for repeated movement and only adds/removes changed results', () => {
    const { render, createMarker, addMarker, item, zone } = setup();
    const [first] = render('zone', [zone]);
    render('zone', [zone]);
    expect(createMarker).toHaveBeenCalledOnce();
    expect(addMarker).toHaveBeenCalledOnce();
    expect(first.marker.remove).not.toHaveBeenCalled();

    const other = { item: { key: 'other' } };
    render('zone', [zone, other], [item, other.item]);
    expect(createMarker).toHaveBeenCalledTimes(2);
    expect(first.marker.remove).not.toHaveBeenCalled();
    render('zone', [other], [other.item]);
    expect(first.marker.remove).toHaveBeenCalledOnce();
    expect(addMarker).toHaveBeenCalledTimes(2);
  });

  it('creates the other zoom mode lazily and reattaches cached markers on return', () => {
    const { render, createMarker, zone, route } = setup();
    const [first] = render('zone', [zone]);
    expect(createMarker).toHaveBeenCalledOnce();
    const [detail] = render('route', [route]);
    expect(first.marker.remove).toHaveBeenCalledOnce();
    expect(render('zone', [zone])[0].marker).toBe(first.marker);
    expect(detail.marker.remove).toHaveBeenCalledOnce();
    expect(createMarker).toHaveBeenCalledTimes(2);
  });

  it('invalidates changed scores/items and changed geometry records without retaining stale modes', () => {
    const { render, createMarker, item, zone, route } = setup();
    const [first] = render('zone', [zone]);
    render('route', [route]);
    const refreshed = { key: 'river' };
    render('route', [{ item: refreshed }], [refreshed]);
    const [newZone] = render('zone', [{ item: refreshed }], [refreshed]);
    expect(newZone.marker).not.toBe(first.marker);
    const [geometryChange] = render('zone', [{ item: refreshed }], [refreshed]);
    expect(geometryChange.marker).not.toBe(newZone.marker);
    expect(newZone.marker.remove).toHaveBeenCalledOnce();
    render('zone', [], []);
    expect(geometryChange.marker.remove).toHaveBeenCalledOnce();
    expect(createMarker).toHaveBeenCalledTimes(5);
  });
});
