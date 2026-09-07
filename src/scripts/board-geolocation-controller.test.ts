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
  it('ignores a GPS reading or failure after the user cancels the request', async () => {
    let success;
    let failure;
    const handlers = callbacks();
    const reverseGeocodeLocation = vi.fn();
    const controller = createBoardGeolocationController({
      navigatorObject: { geolocation: { getCurrentPosition: (ok, fail) => { success = ok; failure = fail; } } },
      reverseGeocodeLocation, hasUserLocation: () => false, ...handlers,
    });
    controller.requestUserLocation();
    controller.cancelUserLocationRequest();
    await success({ coords: { latitude: 45, longitude: -92 } });
    failure({ code: 1 });
    expect(reverseGeocodeLocation).not.toHaveBeenCalled();
    expect(handlers.onResolved).not.toHaveBeenCalled();
    expect(handlers.onDenied).not.toHaveBeenCalled();
  });

  it('ignores a cancelled result even when reverse geocoding was already pending', async () => {
    let success;
    let resolveLabel;
    const handlers = callbacks();
    const controller = createBoardGeolocationController({
      navigatorObject: { geolocation: { getCurrentPosition: (ok) => { success = ok; } } },
      reverseGeocodeLocation: () => new Promise((resolve) => { resolveLabel = resolve; }),
      hasUserLocation: () => false, ...handlers,
    });
    controller.requestUserLocation();
    const pending = success({ coords: { latitude: 45, longitude: -92 } });
    controller.cancelUserLocationRequest();
    resolveLabel('Old city');
    await pending;
    expect(handlers.onResolved).not.toHaveBeenCalled();
  });

  it('reports a timeout as unavailable instead of claiming permission was denied', () => {
    let failure;
    const handlers = callbacks();
    const controller = createBoardGeolocationController({
      navigatorObject: { geolocation: { getCurrentPosition: (_ok, fail) => { failure = fail; } } },
      reverseGeocodeLocation: vi.fn(), hasUserLocation: () => false, ...handlers,
    });
    controller.requestUserLocation();
    failure({ code: 3 });
    expect(handlers.onUnavailable).toHaveBeenCalledOnce();
    expect(handlers.onDenied).not.toHaveBeenCalled();
    controller.requestUserLocation();
    failure({ code: 1 });
    expect(handlers.onDenied).toHaveBeenCalledOnce();
  });

  it('does not auto-start GPS after a cancelled permission lookup', async () => {
    let resolvePermission;
    const getCurrentPosition = vi.fn();
    const controller = createBoardGeolocationController({
      navigatorObject: {
        geolocation: { getCurrentPosition },
        permissions: { query: () => new Promise((resolve) => { resolvePermission = resolve; }) },
      }, reverseGeocodeLocation: vi.fn(), hasUserLocation: () => false, ...callbacks(),
    });
    const pending = controller.maybeUseGrantedLocation();
    controller.cancelUserLocationRequest();
    resolvePermission({ state: 'granted' });
    await pending;
    expect(getCurrentPosition).not.toHaveBeenCalled();
  });

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
