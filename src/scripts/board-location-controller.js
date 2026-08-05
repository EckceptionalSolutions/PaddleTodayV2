function setStatusText(target, text, { reveal = true } = {}) {
  if (!target || typeof target !== 'object') {
    return;
  }

  if (reveal) {
    target.hidden = false;
  }
  target.textContent = text;
}

export function createBoardLocationController({
  locationService,
  getDefaultStatusTarget,
  getLocationState,
  indicator,
  indicatorLabel,
  onEmptyQuery,
  onLocationResolved,
  getResults = () => [],
  getUserLocation = () => null,
  getSelectedRadius = () => Number.POSITIVE_INFINITY,
  distanceBetween = () => Number.POSITIVE_INFINITY,
  getSortMode = () => '',
  setLocationState = () => {},
  setSortMode = () => {},
  saveLocation = () => {},
  removeLocation = () => {},
  resetPagination = () => {},
  renderBoard = () => {},
  updateLocationStatus = () => {},
  onLocationCleared = () => {},
  sortSelect,
  locationInput,
  logError = (error) => console.error('Manual location lookup failed.', error),
}) {
  function distanceForResult(result) {
    const userLocation = getUserLocation();
    if (!userLocation) {
      return Number.POSITIVE_INFINITY;
    }

    return distanceBetween(
      userLocation.latitude,
      userLocation.longitude,
      result.river.latitude,
      result.river.longitude,
    );
  }

  function resultWithinSelectedRadius(result) {
    if (!getUserLocation()) {
      return false;
    }
    return distanceForResult(result) <= getSelectedRadius();
  }

  function itemWithinSelectedRadius(item) {
    return Number.isFinite(item?.distanceMiles)
      && item.distanceMiles <= getSelectedRadius();
  }

  function shortLocationLabel() {
    return getUserLocation()?.label || 'your area';
  }

  function setUserLocation(location) {
    setLocationState(location, 'ready');
    saveLocation(location);
    if (getSortMode() === 'best-now') {
      setSortMode('near-you');
      if (sortSelect) {
        sortSelect.value = 'near-you';
      }
    }
    if (locationInput) {
      locationInput.value = location.label;
    }
    resetPagination();

    const results = getResults();
    if (results.length > 0) {
      renderBoard(results);
    } else {
      updateLocationStatus();
    }
  }

  function updateLocationIndicator() {
    if (!indicator || typeof indicator !== 'object') {
      return;
    }

    const locationState = getLocationState();
    if (locationState === 'pending') {
      indicator.hidden = false;
      indicator.dataset.state = 'loading';
      setStatusText(indicatorLabel, 'Finding nearest picks...', { reveal: false });
      return;
    }
    if (locationState === 'denied') {
      indicator.hidden = false;
      indicator.dataset.state = 'error';
      setStatusText(indicatorLabel, 'Location blocked', { reveal: false });
      return;
    }
    if (locationState === 'unavailable') {
      indicator.hidden = false;
      indicator.dataset.state = 'error';
      setStatusText(indicatorLabel, 'Location unavailable', { reveal: false });
      return;
    }

    indicator.hidden = true;
    indicator.dataset.state = 'idle';
  }

  function clearUserLocation() {
    setLocationState(null, 'idle');
    onLocationCleared();
    removeLocation();
    if (locationInput) {
      locationInput.value = '';
    }
    if (getSortMode() === 'near-you' || getSortMode() === 'nearest') {
      setSortMode('best-now');
      if (sortSelect) {
        sortSelect.value = 'best-now';
      }
    }
    resetPagination();

    const results = getResults();
    if (results.length > 0) {
      renderBoard(results);
    } else {
      updateLocationStatus();
    }
  }

  async function submitManualLocation(
    query,
    statusTarget = getDefaultStatusTarget(),
  ) {
    const trimmedQuery = typeof query === 'string' ? query.trim() : '';
    if (!trimmedQuery) {
      onEmptyQuery();
      return;
    }

    setStatusText(statusTarget, 'Looking up that location...');

    try {
      const match = await locationService.geocodeManualLocation(trimmedQuery);
      if (!match) {
        setStatusText(statusTarget, 'That city or ZIP was not found.');
        return;
      }

      (onLocationResolved ?? setUserLocation)(match);
    } catch (error) {
      logError(error);
      setStatusText(statusTarget, 'That place could not be looked up right now.');
    }
  }

  return {
    distanceForResult,
    itemWithinSelectedRadius,
    resultWithinSelectedRadius,
    clearUserLocation,
    setUserLocation,
    shortLocationLabel,
    submitManualLocation,
    updateLocationIndicator,
  };
}
