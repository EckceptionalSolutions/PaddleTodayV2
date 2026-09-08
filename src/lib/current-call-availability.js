/** Whether retained measurements cannot support a current conditions call. */
export function isCurrentCallUnavailable(route) {
  if (!route) return false;
  if (route.readiness?.status === 'withheld') return true;
  const liveData = route.liveData;
  return liveData?.overall !== 'live'
    && (
      liveData?.gaugeState === 'stale'
      || liveData?.weatherState === 'stale'
      || liveData?.gauge?.state === 'stale'
      || liveData?.weather?.state === 'stale'
      || liveData?.overall === 'offline'
    );
}
