import { describe, expect, it, vi } from 'vitest';
import { createBoardLocationController } from './board-location-controller.js';

function harness({
  locationState = 'idle',
  geocodeResult = null,
  geocodeError = null,
} = {}) {
  const indicator = { hidden: true, dataset: { state: '' } };
  const indicatorLabel = { hidden: true, textContent: '' };
  const statusTarget = { hidden: true, textContent: '' };
  const geocodeManualLocation = geocodeError
    ? vi.fn().mockRejectedValue(geocodeError)
    : vi.fn().mockResolvedValue(geocodeResult);
  const callbacks = {
    onEmptyQuery: vi.fn(),
    onLocationResolved: vi.fn(),
    logError: vi.fn(),
  };
  const controller = createBoardLocationController({
    locationService: { geocodeManualLocation },
    getDefaultStatusTarget: () => statusTarget,
    getLocationState: () => locationState,
    indicator,
    indicatorLabel,
    ...callbacks,
  });
  return {
    controller,
    indicator,
    indicatorLabel,
    statusTarget,
    geocodeManualLocation,
    callbacks,
  };
}

describe('board location controller', () => {
  it.each([
    ['pending', false, 'loading', 'Finding nearest picks...'],
    ['denied', false, 'error', 'Location blocked'],
    ['unavailable', false, 'error', 'Location unavailable'],
    ['ready', true, 'idle', ''],
  ])('renders the %s indicator state', (locationState, hidden, state, label) => {
    const { controller, indicator, indicatorLabel } = harness({ locationState });

    controller.updateLocationIndicator();

    expect(indicator.hidden).toBe(hidden);
    expect(indicator.dataset.state).toBe(state);
    if (label) {
      expect(indicatorLabel.textContent).toBe(label);
    }
  });

  it('trims and resolves manual location searches', async () => {
    const match = {
      latitude: 46.78,
      longitude: -92.1,
      label: 'Duluth, MN',
      source: 'manual',
    };
    const {
      controller,
      statusTarget,
      geocodeManualLocation,
      callbacks,
    } = harness({ geocodeResult: match });

    await controller.submitManualLocation('  Duluth  ');

    expect(statusTarget.textContent).toBe('Looking up that location...');
    expect(geocodeManualLocation).toHaveBeenCalledWith('Duluth');
    expect(callbacks.onLocationResolved).toHaveBeenCalledWith(match);
  });

  it('owns empty, not-found, and error transitions', async () => {
    const empty = harness();
    await empty.controller.submitManualLocation(' ');
    expect(empty.callbacks.onEmptyQuery).toHaveBeenCalledOnce();

    await empty.controller.submitManualLocation('Missing');
    expect(empty.statusTarget.textContent).toBe('That city or ZIP was not found.');

    const error = new Error('offline');
    const failed = harness({ geocodeError: error });
    await failed.controller.submitManualLocation('Duluth');
    expect(failed.callbacks.logError).toHaveBeenCalledWith(error);
    expect(failed.statusTarget.textContent).toBe(
      'That place could not be looked up right now.',
    );
  });

  it('accepts a resolved location and applies the shared board transition', () => {
    let locationState = {};
    let sortMode = 'best-now';
    const sortSelect = { value: 'best-now' };
    const locationInput = { value: '' };
    const saveLocation = vi.fn();
    const resetPagination = vi.fn();
    const renderBoard = vi.fn();
    const updateLocationStatus = vi.fn();
    const results = [{ id: 'rum' }];
    const controller = createBoardLocationController({
      locationService: { geocodeManualLocation: vi.fn() },
      getDefaultStatusTarget: () => null,
      getLocationState: () => 'idle',
      onEmptyQuery: vi.fn(),
      getResults: () => results,
      getSortMode: () => sortMode,
      setLocationState: (location, state) => {
        locationState = { location, state };
      },
      setSortMode: (value) => {
        sortMode = value;
      },
      saveLocation,
      resetPagination,
      renderBoard,
      updateLocationStatus,
      sortSelect,
      locationInput,
    });
    const location = { label: 'Milaca, MN' };

    controller.setUserLocation(location);

    expect(locationState).toEqual({ location, state: 'ready' });
    expect(saveLocation).toHaveBeenCalledWith(location);
    expect(sortMode).toBe('near-you');
    expect(sortSelect.value).toBe('near-you');
    expect(locationInput.value).toBe('Milaca, MN');
    expect(resetPagination).toHaveBeenCalledOnce();
    expect(renderBoard).toHaveBeenCalledWith(results);
    expect(updateLocationStatus).not.toHaveBeenCalled();
  });

  it('owns location-bound distance and radius selectors', () => {
    const controller = createBoardLocationController({
      locationService: { geocodeManualLocation: vi.fn() },
      getDefaultStatusTarget: () => null,
      getLocationState: () => 'ready',
      onEmptyQuery: vi.fn(),
      getUserLocation: () => ({
        latitude: 45.75,
        longitude: -93.65,
        label: 'Milaca, MN',
      }),
      getSelectedRadius: () => 30,
      distanceBetween: vi.fn(() => 25),
    });

    expect(controller.distanceForResult({
      river: { latitude: 45.8, longitude: -93.6 },
    })).toBe(25);
    expect(controller.resultWithinSelectedRadius({
      river: { latitude: 45.8, longitude: -93.6 },
    })).toBe(true);
    expect(controller.itemWithinSelectedRadius({ distanceMiles: 31 })).toBe(false);
    expect(controller.shortLocationLabel()).toBe('Milaca, MN');
  });
});
