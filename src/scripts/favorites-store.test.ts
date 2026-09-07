import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFavorites, restoreFavorite, toggleFavorite, updateFavoriteNotes } from './favorites-store.js';

describe('personal saved-route notes', () => {
  let stored: Map<string, string>;
  beforeEach(() => {
    stored = new Map();
    vi.stubGlobal('window', { localStorage: { getItem: (key: string) => stored.get(key) ?? null, setItem: (key: string, value: string) => stored.set(key, value) }, dispatchEvent: vi.fn() });
    toggleFavorite({ slug: 'river', name: 'River', savedAt: 123, url: '/rivers/river/?putin=a&takeout=b' });
  });
  afterEach(() => vi.unstubAllGlobals());
  it.each(['{"unfinished":', '{"version":2,"items":[]}', '[{}]'])('preserves unreadable data during every update: %s', (raw) => {
    stored.set('paddletoday:favorites:v1', raw);
    expect(readFavorites()).toEqual([]);
    for (const update of [() => toggleFavorite({ slug: 'river' }), () => restoreFavorite({ slug: 'river' }), () => updateFavoriteNotes('river', 'Draft')]) {
      expect(update).toThrow();
      expect(stored.get('paddletoday:favorites:v1')).toBe(raw);
    }
  });
  it('does not overwrite saved routes when reads fail but writes are available', () => {
    const original = stored.get('paddletoday:favorites:v1');
    window.localStorage.getItem = () => { throw new Error('Read failed'); };
    expect(() => toggleFavorite({ slug: 'another' })).toThrow('Read failed');
    expect(stored.get('paddletoday:favorites:v1')).toBe(original);
  });
  it('preserves route details, notes, and order through removal and Undo', () => {
    const original = readFavorites()[0];
    updateFavoriteNotes('river', '  Parking at the bridge.\nBring a shuttle bike.  ');
    const noted = readFavorites()[0];
    expect(noted).toEqual({ ...original, notes: 'Parking at the bridge.\nBring a shuttle bike.' });
    toggleFavorite(original);
    restoreFavorite(noted);
    expect(readFavorites()[0]).toEqual(noted);
    updateFavoriteNotes('river', '');
    expect(readFavorites()[0]).toEqual(original);
  });
  it('does not resurrect removed routes or accept oversized notes', () => {
    expect(() => updateFavoriteNotes('river', 'x'.repeat(2001))).toThrow();
    toggleFavorite({ slug: 'river' });
    expect(() => updateFavoriteNotes('river', 'A note')).toThrow('no longer saved');
    expect(readFavorites()).toEqual([]);
  });
  it('leaves the existing note intact when storage fails', () => {
    updateFavoriteNotes('river', 'Original');
    window.localStorage.setItem = () => { throw new Error('Full'); };
    expect(() => updateFavoriteNotes('river', 'Draft')).toThrow('Full');
    expect(readFavorites()[0].notes).toBe('Original');
  });
});
