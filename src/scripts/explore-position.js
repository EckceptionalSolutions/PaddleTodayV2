const STATE_KEY = 'paddletodayExplorePosition';
const nonnegative = (value) => typeof value === 'number' && Number.isFinite(value) && value >= 0;

export function readExplorePosition(state, url) {
  const value = state?.[STATE_KEY];
  if (value?.version !== 1 || value.url !== url || !Number.isInteger(value.page) || value.page < 1 || value.page > 10000) return null;
  if (!nonnegative(value.scrollY) || !Array.isArray(value.scrolls) || !value.scrolls.every(nonnegative)) return null;
  const camera = value.camera;
  if (camera && (!Array.isArray(camera.center) || camera.center.length !== 2 || !camera.center.every(Number.isFinite)
    || Math.abs(camera.center[1]) > 90 || !Number.isFinite(camera.zoom) || camera.zoom < 3.4 || camera.zoom > 12
    || !Number.isFinite(camera.bearing) || !Number.isFinite(camera.pitch) || camera.pitch < 0 || camera.pitch > 85)) return null;
  return { ...value, view: value.view === 'map' ? 'map' : 'list', advanced: value.advanced === true, collapsed: value.collapsed === true };
}

export function writeExplorePosition(history, url, position) {
  try {
    history.replaceState({ ...history.state, [STATE_KEY]: { ...position, version: 1, url } }, '', url);
  } catch { /* Navigation remains available when history storage is unavailable. */ }
}
