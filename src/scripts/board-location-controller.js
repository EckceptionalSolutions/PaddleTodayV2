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
  useNearbySort = () => true,
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
  let locationRequestId = 0;
  let locationLookup = null;
  let lookupStatusTarget = null;
  let validationStatusTarget = null;

  function clearLocationValidation() {
    locationInput?.removeAttribute?.('aria-invalid');
    if (validationStatusTarget) {
      const descriptions = (locationInput?.getAttribute?.('aria-describedby') || '').split(/\s+/)
        .filter((id) => id && id !== validationStatusTarget.id);
      if (descriptions.length) locationInput?.setAttribute?.('aria-describedby', descriptions.join(' '));
      else locationInput?.removeAttribute?.('aria-describedby');
      if (validationStatusTarget.dataset) delete validationStatusTarget.dataset.locationError;
      validationStatusTarget.textContent = '';
      validationStatusTarget.hidden = true;
      validationStatusTarget = null;
    }
  }

  function reportLocationError(statusTarget, message, { invalid = true } = {}) {
    setStatusText(statusTarget, message);
    if (!statusTarget) return;
    validationStatusTarget = statusTarget;
    if (statusTarget.dataset) statusTarget.dataset.locationError = 'true';
    if (!statusTarget.id) statusTarget.id = 'location-search-feedback';
    statusTarget.setAttribute?.('role', 'status');
    const descriptions = new Set((locationInput?.getAttribute?.('aria-describedby') || '').split(/\s+/).filter(Boolean));
    descriptions.add(statusTarget.id);
    locationInput?.setAttribute?.('aria-describedby', [...descriptions].join(' '));
    if (invalid) locationInput?.setAttribute?.('aria-invalid', 'true');
  }

  locationInput?.addEventListener?.('input', () => {
    cancelLocationLookup();
    clearLocationValidation();
  });

  function cancelLocationLookup() {
    locationRequestId += 1;
    locationLookup?.abort();
    locationLookup = null;
    if (lookupStatusTarget?.textContent === 'Looking up that location...') {
      lookupStatusTarget.textContent = '';
      lookupStatusTarget.hidden = true;
    }
    lookupStatusTarget = null;
  }

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
    cancelLocationLookup();
    clearLocationValidation();
    setLocationState(location, 'ready');
    saveLocation(location);
    if (useNearbySort() && getSortMode() === 'best-now') {
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
    cancelLocationLookup();
    clearLocationValidation();
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
    cancelLocationLookup();
    clearLocationValidation();
    const requestId = locationRequestId;
    const trimmedQuery = typeof query === 'string' ? query.trim() : '';
    if (!trimmedQuery) {
      onEmptyQuery();
      reportLocationError(statusTarget, 'Enter a city or ZIP code to find nearby routes.');
      locationInput?.focus?.({ preventScroll: true });
      return;
    }

    setStatusText(statusTarget, 'Looking up that location...');
    lookupStatusTarget = statusTarget;
    locationLookup = new AbortController();

    try {
      const match = await locationService.geocodeManualLocation(trimmedQuery, { signal: locationLookup.signal });
      if (requestId !== locationRequestId) return;
      if (!match) {
        reportLocationError(statusTarget, 'That city or ZIP was not found.');
        return;
      }

      (onLocationResolved ?? setUserLocation)(match);
    } catch (error) {
      if (requestId !== locationRequestId) return;
      logError(error);
      reportLocationError(statusTarget, 'That place could not be looked up right now.', { invalid: false });
    } finally {
      if (requestId === locationRequestId) {
        locationLookup = null;
        lookupStatusTarget = null;
      }
    }
  }

  return {
    cancelLocationLookup,
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
