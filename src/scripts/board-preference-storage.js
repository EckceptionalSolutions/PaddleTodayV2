import {
  DEFAULT_RADIUS_MILES,
  normalizeHomeDifficultyFilters,
  normalizeHomePaddleTimeFilters,
  normalizeRadiusMiles,
} from './board-domain.js';

export function createBoardPreferenceStorage({
  storage,
  locationKey,
  radiusKey,
  difficultyKey,
  paddleTimeKey,
  warn = (...args) => console.warn(...args),
}) {
  function saveLocation(location) {
    storage.setItem(locationKey, JSON.stringify(location));
  }

  function saveRadiusMiles(radiusMiles) {
    storage.setItem(radiusKey, String(normalizeRadiusMiles(radiusMiles)));
  }

  function saveHomeDifficultyFilter(value) {
    storage.setItem(difficultyKey, JSON.stringify(normalizeHomeDifficultyFilters(value)));
  }

  function saveHomePaddleTimeFilter(value) {
    storage.setItem(paddleTimeKey, JSON.stringify(normalizeHomePaddleTimeFilters(value)));
  }

  function loadStoredLocation() {
    try {
      const raw = storage.getItem(locationKey);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (
        parsed
        && typeof parsed.latitude === 'number'
        && typeof parsed.longitude === 'number'
        && typeof parsed.label === 'string'
      ) {
        return parsed;
      }
    } catch (error) {
      warn('Failed to parse stored location.', error);
    }

    return null;
  }

  function loadStoredRadiusMiles() {
    try {
      const raw = storage.getItem(radiusKey);
      if (!raw) {
        return DEFAULT_RADIUS_MILES;
      }

      return normalizeRadiusMiles(Number(raw));
    } catch (error) {
      warn('Failed to parse stored radius.', error);
      return DEFAULT_RADIUS_MILES;
    }
  }

  function loadStoredHomeDifficultyFilter() {
    try {
      const raw = storage.getItem(difficultyKey);
      return normalizeHomeDifficultyFilters(raw || 'any');
    } catch (error) {
      warn('Failed to parse stored home difficulty filter.', error);
      return ['any'];
    }
  }

  function loadStoredHomePaddleTimeFilter() {
    try {
      const raw = storage.getItem(paddleTimeKey);
      return normalizeHomePaddleTimeFilters(raw || 'any');
    } catch (error) {
      warn('Failed to parse stored home paddle-time filter.', error);
      return ['any'];
    }
  }

  function removeStoredLocation() {
    storage.removeItem(locationKey);
  }

  return {
    loadStoredHomeDifficultyFilter,
    loadStoredHomePaddleTimeFilter,
    loadStoredLocation,
    loadStoredRadiusMiles,
    removeStoredLocation,
    saveHomeDifficultyFilter,
    saveHomePaddleTimeFilter,
    saveLocation,
    saveRadiusMiles,
  };
}
