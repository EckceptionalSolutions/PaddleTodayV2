export function createBoardGeolocationController({
  navigatorObject = navigator,
  reverseGeocodeLocation,
  timeoutMs,
  hasUserLocation,
  onUnavailable,
  onPending,
  onResolved,
  onDenied,
  onReverseError = (error) => console.warn('Reverse geocoding current location failed.', error),
  onPermissionError = (error) => console.warn('Could not check geolocation permission.', error),
}) {
  let requestId = 0;
  function cancelUserLocationRequest() {
    requestId += 1;
  }

  function requestUserLocation() {
    const currentRequest = ++requestId;
    if (!navigatorObject.geolocation) {
      onUnavailable();
      return;
    }

    onPending();
    navigatorObject.geolocation.getCurrentPosition(
      async (position) => {
        if (currentRequest !== requestId) return;
        let label = 'your current location';

        try {
          const geocodedLabel = await reverseGeocodeLocation(
            position.coords.latitude,
            position.coords.longitude,
          );
          if (geocodedLabel) {
            label = geocodedLabel;
          }
        } catch (error) {
          if (currentRequest === requestId) onReverseError(error);
        }

        if (currentRequest !== requestId) return;
        onResolved({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          label,
          source: 'geolocation',
        });
      },
      (error) => {
        if (currentRequest !== requestId) return;
        if (error?.code === 1) onDenied();
        else onUnavailable();
      },
      {
        enableHighAccuracy: false,
        timeout: timeoutMs,
        maximumAge: 5 * 60 * 1000,
      },
    );
  }

  async function maybeUseGrantedLocation() {
    const currentRequest = requestId;
    if (
      !navigatorObject.permissions
      || typeof navigatorObject.permissions.query !== 'function'
    ) {
      return;
    }

    try {
      const result = await navigatorObject.permissions.query({ name: 'geolocation' });
      if (currentRequest === requestId && result.state === 'granted' && !hasUserLocation()) {
        requestUserLocation();
      }
    } catch (error) {
      onPermissionError(error);
    }
  }

  return {
    cancelUserLocationRequest,
    maybeUseGrantedLocation,
    requestUserLocation,
  };
}
