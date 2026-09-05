import { describe, expect, it, vi } from 'vitest';
import { createExploreGeometryLoader } from './explore-geometry-loader.js';

const feature = (slug: string) => ({ type: 'Feature', properties: { routeId: slug }, geometry: { type: 'LineString', coordinates: [[0, 0], [1, 1]] } });
const response = (value: unknown) => ({ ok: true, json: async () => value });

describe('progressive Explore geometry', () => {
  it('loads one overview and fetches only requested routes, retaining overview bounds', async () => {
    const fetchImpl = vi.fn(async (path: string) => response(path.includes('overview')
      ? { features: [{ ...feature('a'), bbox: [0, 0, 1, 1], properties: { routeId: 'a', overview: true, anchor: [0.5, 0.5] } }] }
      : feature('a')));
    const loader = createExploreGeometryLoader({ fetchImpl });
    await loader.loadOverview();
    await loader.loadOverview();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    loader.setDetailRoutes(['a', 'a']);
    await vi.waitFor(() => expect(loader.features.get('a')?.properties.overview).toBeUndefined());
    expect(loader.features.get('a')?.bbox).toEqual([0, 0, 1, 1]);
    expect(loader.features.get('a')?.properties.anchor).toEqual([0.5, 0.5]);
    loader.setDetailRoutes(['a']);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });
  it('bounds concurrency, cancels stale requests, and drops the old viewport queue', async () => {
    const pending = new Map<string, (value: unknown) => void>();
    const fetchImpl = vi.fn((path: string, { signal }: any) => new Promise((resolve, reject) => {
      pending.set(path, resolve);
      signal.addEventListener('abort', () => reject(new Error('Aborted')));
    }));
    const onChange = vi.fn();
    const loader = createExploreGeometryLoader({ fetchImpl, concurrency: 2, onChange });
    loader.setDetailRoutes(['a', 'b', 'c', 'd']);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    loader.setDetailRoutes(['new']);
    await vi.waitFor(() => expect(fetchImpl).toHaveBeenCalledTimes(3));
    expect(fetchImpl.mock.calls.some(([path]) => path.endsWith('/c.json') || path.endsWith('/d.json'))).toBe(false);
    pending.get('/data/canonical-river-geometries/routes/new.json')?.(response(feature('new')));
    await vi.waitFor(() => expect(onChange).toHaveBeenCalledWith(['new']));
    expect(loader.features.has('a')).toBe(false);
  });
  it('keeps the overview when detail fails and does not retry on every move', async () => {
    const fetchImpl = vi.fn(async (path: string) => path.includes('overview')
      ? response({ features: [feature('a')] }) : { ok: false, status: 503 });
    const loader = createExploreGeometryLoader({ fetchImpl });
    await loader.loadOverview();
    loader.setDetailRoutes(['a']);
    await new Promise((resolve) => setTimeout(resolve, 0));
    loader.setDetailRoutes(['a']);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(loader.features.get('a')).toEqual(feature('a'));
  });
  it('merges late overview metadata without replacing already-loaded detail', async () => {
    let finishOverview: (value: unknown) => void = () => {};
    const fetchImpl = vi.fn((path: string) => path.includes('overview')
      ? new Promise((resolve) => { finishOverview = resolve; }) : Promise.resolve(response(feature('a'))));
    const loader = createExploreGeometryLoader({ fetchImpl });
    const overview = loader.loadOverview();
    loader.setDetailRoutes(['a']);
    await vi.waitFor(() => expect(loader.features.has('a')).toBe(true));
    finishOverview(response({ features: [{ ...feature('a'), bbox: [0, 0, 1, 1],
      properties: { routeId: 'a', overview: true, anchor: [0.5, 0.5] }, geometry: { type: 'LineString', coordinates: [[0, 0], [2, 2]] } }] }));
    await overview;
    expect(loader.features.get('a')?.geometry).toEqual(feature('a').geometry);
    expect(loader.features.get('a')?.properties.overview).toBeUndefined();
    expect(loader.features.get('a')?.bbox).toEqual([0, 0, 1, 1]);
  });
  it('does not spin on a successful HTTP response with missing geometry', async () => {
    const fetchImpl = vi.fn(async () => response({}));
    const loader = createExploreGeometryLoader({ fetchImpl });
    loader.setDetailRoutes(['a']);
    await new Promise((resolve) => setTimeout(resolve, 0));
    loader.setDetailRoutes(['a']);
    expect(fetchImpl).toHaveBeenCalledOnce();
  });
});
