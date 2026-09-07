import { describe, expect, it, vi } from 'vitest';
import { createBoardLocationService } from './board-location-service.js';

function response(results: unknown[], ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => ({ results }),
  };
}

describe('board location service', () => {
  it('keeps searching when a named state does not match the first results', async () => {
    const wrongState = { name: 'Springfield', admin1: 'Missouri', latitude: 37.2, longitude: -93.3 };
    const rightState = { name: 'Springfield', admin1: 'Illinois', latitude: 39.8, longitude: -89.6 };
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce(response([wrongState]))
      .mockResolvedValueOnce(response([wrongState, rightState]));
    const service = createBoardLocationService({ fetchImpl, chooseCandidate: (items) => items[0] });
    await expect(service.geocodeManualLocation('Springfield, IL')).resolves.toMatchObject({ label: 'Springfield, IL' });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it('returns no match instead of silently substituting another state', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(response([
      { name: 'Springfield', admin1: 'Missouri', latitude: 37.2, longitude: -93.3 },
    ]));
    const chooseCandidate = vi.fn((items) => items[0]);
    const service = createBoardLocationService({ fetchImpl, chooseCandidate });
    await expect(service.geocodeManualLocation('Springfield, IL')).resolves.toBeNull();
    expect(chooseCandidate).not.toHaveBeenCalled();
  });

  it('bounds a stalled lookup and forwards cancellation', async () => {
    const fetchImpl = vi.fn((_url, { signal }) => new Promise((_, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason), { once: true });
    }));
    const service = createBoardLocationService({ fetchImpl, timeoutMs: 20, chooseCandidate: (items) => items[0] });
    await expect(service.geocodeManualLocation('Duluth')).rejects.toMatchObject({ name: 'TimeoutError' });
    const controller = new AbortController();
    const request = service.geocodeManualLocation('Stillwater', { signal: controller.signal });
    controller.abort();
    await expect(request).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('never passes invalid coordinates into route-distance calculations', async () => {
    const chooseCandidate = vi.fn((items) => items[0]);
    const fetchImpl = vi.fn().mockResolvedValue(response([
      { latitude: 100, longitude: -92 },
      { latitude: 45, longitude: Infinity },
      { latitude: NaN, longitude: -92 },
      { latitude: 45, longitude: -92, name: 'Valid town', admin1: 'Minnesota' },
    ]));
    const service = createBoardLocationService({ fetchImpl, chooseCandidate });
    await expect(service.geocodeManualLocation('Valid town')).resolves.toMatchObject({ latitude: 45, longitude: -92 });
    expect(chooseCandidate.mock.calls[0][0]).toHaveLength(1);
  });

  it('tries parsed query variants and shapes the selected candidate', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(response([]))
      .mockResolvedValueOnce(response([{
        name: 'Duluth',
        admin1: 'Minnesota',
        country: 'United States',
        latitude: 46.78,
        longitude: -92.1,
      }]));
    const chooseCandidate = vi.fn((candidates) => candidates[0]);
    const service = createBoardLocationService({ fetchImpl, chooseCandidate });

    await expect(service.geocodeManualLocation('Duluth, MN')).resolves.toEqual({
      latitude: 46.78,
      longitude: -92.1,
      label: 'Duluth, MN',
      source: 'manual',
    });
    expect(fetchImpl).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('name=Duluth%2C%20Minnesota'),
      { headers: { accept: 'application/json' }, signal: expect.any(AbortSignal) },
    );
    expect(fetchImpl).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('name=Duluth%2C%20MN'),
      { headers: { accept: 'application/json' }, signal: expect.any(AbortSignal) },
    );
  });

  it('reverse geocodes labels and normalizes upstream errors', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(response([{
        name: 'Stillwater',
        admin1: 'Minnesota',
        country: 'United States',
      }]))
      .mockResolvedValueOnce(response([], false, 503));
    const service = createBoardLocationService({
      fetchImpl,
      chooseCandidate: (candidates) => candidates[0],
    });

    await expect(service.reverseGeocodeLocation(45.05, -92.8)).resolves.toBe(
      'Stillwater, MN',
    );
    await expect(service.searchManualLocation('Stillwater')).rejects.toThrow(
      'Geocoding failed: HTTP 503',
    );
  });
});
