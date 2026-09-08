import { afterEach, describe, expect, it, vi } from 'vitest';
import { loadCanonicalRiverGeometries, loadCanonicalRiverRouteLine } from './canonical-river-geometries.js';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const feature = { type: 'Feature', properties: { routeId: 'retry-route' },
  geometry: { type: 'LineString', coordinates: [[-93, 45], [-92, 45]] } };
const points = [{ longitude: -93, latitude: 45 }, { longitude: -92, latitude: 45 }];

describe('canonical geometry request recovery', () => {
  for (const scope of ['manifest', 'state', 'route']) {
    it(`aborts a stalled ${scope} request and allows the next load to retry`, async () => {
      const controller = new AbortController();
      vi.spyOn(AbortSignal, 'timeout').mockReturnValueOnce(controller.signal);
      const fetchMock = vi.fn().mockImplementationOnce((_url, options) => new Promise((_resolve, reject) => {
        if (!options.signal) { reject(new Error('Request has no deadline')); return; }
        options.signal.addEventListener('abort', () => reject(options.signal.reason), { once: true });
      })).mockResolvedValueOnce(Response.json(scope === 'manifest' ? { states: [] } : scope === 'state' ? { features: [feature] } : feature));
      vi.stubGlobal('fetch', fetchMock);
      const load = () => scope === 'manifest'
        ? loadCanonicalRiverGeometries()
        : scope === 'state'
        ? loadCanonicalRiverGeometries({ stateName: 'Timeout State' })
        : loadCanonicalRiverRouteLine('timeout-route', points);
      const initial = load();
      expect(AbortSignal.timeout).toHaveBeenCalledWith(15_000);
      const failed = expect(initial).rejects.toMatchObject({ name: 'TimeoutError' });
      controller.abort(new DOMException('Geometry request timed out', 'TimeoutError'));
      await failed;
      expect(await load()).toBeTruthy();
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  }

  it('shares a state request, then retries a failed request and retains the success', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response('', { status: 503 }))
      .mockResolvedValueOnce(Response.json({ features: [feature] }));
    vi.stubGlobal('fetch', fetchMock);
    const initial = loadCanonicalRiverGeometries({ stateName: 'Retry State' });
    expect(loadCanonicalRiverGeometries({ stateName: 'Retry State' })).toBe(initial);
    await expect(initial).rejects.toThrow('503');
    const recovered = await loadCanonicalRiverGeometries({ stateName: 'Retry State' });
    expect(recovered.get('retry-route')).toEqual(feature);
    expect(await loadCanonicalRiverGeometries({ stateName: 'Retry State' })).toBe(recovered);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('retries a rejected route request while preserving successful geometry reuse', async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new TypeError('Network unavailable'))
      .mockResolvedValueOnce(Response.json(feature));
    vi.stubGlobal('fetch', fetchMock);
    await expect(loadCanonicalRiverRouteLine('retry-route', points)).rejects.toThrow('Network unavailable');
    const recovered = await loadCanonicalRiverRouteLine('retry-route', points);
    expect(recovered?.geometry.coordinates).toEqual([[-93, 45], [-92, 45]]);
    expect(await loadCanonicalRiverRouteLine('retry-route', points)).toEqual(recovered);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('retains a confirmed missing route instead of repeatedly requesting it', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('', { status: 404 }));
    vi.stubGlobal('fetch', fetchMock);
    expect(await loadCanonicalRiverRouteLine('missing-route', points)).toBeNull();
    expect(await loadCanonicalRiverRouteLine('missing-route', points)).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
