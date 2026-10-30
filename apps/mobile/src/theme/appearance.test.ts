import { describe, expect, it } from 'vitest';
import { parseAppearancePreference, resolveColorScheme } from './appearance';

describe('appearance preferences', () => {
  it('uses the device setting for missing, obsolete, or corrupt storage', () => {
    for (const value of [null, undefined, '', 'sepia', '{broken', 1]) {
      const preference = parseAppearancePreference(value);
      expect(preference).toBe('system');
      expect(resolveColorScheme(preference, 'dark')).toBe('dark');
      expect(resolveColorScheme(preference, null)).toBe('light');
    }
  });

  it('keeps explicit choices independent of the device setting', () => {
    expect(resolveColorScheme(parseAppearancePreference('light'), 'dark')).toBe('light');
    expect(resolveColorScheme(parseAppearancePreference('dark'), 'light')).toBe('dark');
  });
});
