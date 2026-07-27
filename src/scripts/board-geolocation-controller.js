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
  function requestUserLocation() {
    if (!navigatorObject.geolocation) {
      onUnavailable();
      return;
    }

    onPending();
    navigatorObject.geolocation.getCurrentPosition(
      async (position) => {
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
          onReverseError(error);
        }

        onResolved({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          label,
          source: 'geolocation',
        });
      },
      () => onDenied(),
      {
        enableHighAccuracy: false,
        timeout: timeoutMs,
        maximumAge: 5 * 60 * 1000,
      },
    );
  }

  async function maybeUseGrantedLocation() {
    if (
      !navigatorObject.permissions
      || typeof navigatorObject.permissions.query !== 'function'
    ) {
      return;
    }

    try {
      const result = await navigatorObject.permissions.query({ name: 'geolocation' });
      if (result.state === 'granted' && !hasUserLocation()) {
        requestUserLocation();
      }
    } catch (error) {
      onPermissionError(error);
    }
  }

  return {
    maybeUseGrantedLocation,
    requestUserLocation,
  };
}
