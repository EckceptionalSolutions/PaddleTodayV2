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
      { headers: { accept: 'application/json' } },
    );
    expect(fetchImpl).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('name=Duluth%2C%20MN'),
      { headers: { accept: 'application/json' } },
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
