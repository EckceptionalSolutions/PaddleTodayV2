import { describe, expect, it, vi } from 'vitest';
import { createBoardPreferenceStorage } from './board-preference-storage.js';

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    removeItem: (key: string) => values.delete(key),
    setItem: (key: string, value: string) => values.set(key, value),
  };
}

function preferenceStorage(storage = memoryStorage(), warn = vi.fn()) {
  return createBoardPreferenceStorage({
    storage,
    locationKey: 'location',
    radiusKey: 'radius',
    difficultyKey: 'difficulty',
    paddleTimeKey: 'paddle-time',
    warn,
  });
}

describe('board preference storage', () => {
  it('round-trips shared board preferences through an injected store', () => {
    const preferences = preferenceStorage();
    const location = { latitude: 44.9, longitude: -93.2, label: 'Minneapolis, MN' };

    preferences.saveLocation(location);
    preferences.saveRadiusMiles(75);
    preferences.saveHomeDifficultyFilter(['easy', 'hard']);
    preferences.saveHomePaddleTimeFilter(['3-to-5']);

    expect(preferences.loadStoredLocation()).toEqual(location);
    expect(preferences.loadStoredRadiusMiles()).toBe(75);
    expect(preferences.loadStoredHomeDifficultyFilter()).toEqual(['easy', 'hard']);
    expect(preferences.loadStoredHomePaddleTimeFilter()).toEqual(['3-to-5']);

    preferences.removeStoredLocation();
    expect(preferences.loadStoredLocation()).toBeNull();
  });

  it('normalizes invalid values and contains storage failures', () => {
    const warn = vi.fn();
    const values = new Map([
      ['location', '{bad json'],
      ['radius', 'not-supported'],
      ['difficulty', 'unknown'],
    ]);
    const preferences = preferenceStorage({
      getItem: (key: string) => values.get(key) ?? null,
      removeItem: () => true,
      setItem: () => undefined,
    }, warn);

    expect(preferences.loadStoredLocation()).toBeNull();
    expect(preferences.loadStoredRadiusMiles()).toBe(50);
    expect(preferences.loadStoredHomeDifficultyFilter()).toEqual(['any']);
    expect(preferences.loadStoredHomePaddleTimeFilter()).toEqual(['any']);
    expect(warn).toHaveBeenCalledOnce();
  });
});
