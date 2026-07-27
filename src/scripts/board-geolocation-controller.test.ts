import { describe, expect, it, vi } from 'vitest';
import { createBoardGeolocationController } from './board-geolocation-controller.js';

function callbacks() {
  return {
    onUnavailable: vi.fn(),
    onPending: vi.fn(),
    onResolved: vi.fn(),
    onDenied: vi.fn(),
    onReverseError: vi.fn(),
    onPermissionError: vi.fn(),
  };
}

describe('board geolocation controller', () => {
  it('reports unavailable geolocation without starting a request', () => {
    const handlers = callbacks();
    const controller = createBoardGeolocationController({
      navigatorObject: {},
      reverseGeocodeLocation: vi.fn(),
      timeoutMs: 10_000,
      hasUserLocation: () => false,
      ...handlers,
    });

    controller.requestUserLocation();

    expect(handlers.onUnavailable).toHaveBeenCalledOnce();
    expect(handlers.onPending).not.toHaveBeenCalled();
  });

  it('uses shared request options and resolves a reverse-geocoded location', async () => {
    let resolvePosition;
    const getCurrentPosition = vi.fn((onSuccess) => {
      resolvePosition = onSuccess;
    });
    const handlers = callbacks();
    const reverseGeocodeLocation = vi.fn().mockResolvedValue('Stillwater, MN');
    const controller = createBoardGeolocationController({
      navigatorObject: { geolocation: { getCurrentPosition } },
      reverseGeocodeLocation,
      timeoutMs: 10_000,
      hasUserLocation: () => false,
      ...handlers,
    });

    controller.requestUserLocation();
    await resolvePosition({ coords: { latitude: 45.05, longitude: -92.8 } });

    expect(handlers.onPending).toHaveBeenCalledOnce();
    expect(getCurrentPosition.mock.calls[0][2]).toEqual({
      enableHighAccuracy: false,
      timeout: 10_000,
      maximumAge: 300_000,
    });
    expect(handlers.onResolved).toHaveBeenCalledWith({
      latitude: 45.05,
      longitude: -92.8,
      label: 'Stillwater, MN',
      source: 'geolocation',
    });
  });

  it('starts a location request only when permission is granted and no location exists', async () => {
    const getCurrentPosition = vi.fn();
    const permissionQuery = vi.fn().mockResolvedValue({ state: 'granted' });
    const handlers = callbacks();
    const controller = createBoardGeolocationController({
      navigatorObject: {
        geolocation: { getCurrentPosition },
        permissions: { query: permissionQuery },
      },
      reverseGeocodeLocation: vi.fn(),
      timeoutMs: 10_000,
      hasUserLocation: () => false,
      ...handlers,
    });

    await controller.maybeUseGrantedLocation();

    expect(permissionQuery).toHaveBeenCalledWith({ name: 'geolocation' });
    expect(getCurrentPosition).toHaveBeenCalledOnce();
    expect(handlers.onPending).toHaveBeenCalledOnce();
  });
});
