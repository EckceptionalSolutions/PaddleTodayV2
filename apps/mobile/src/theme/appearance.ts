export type AppearancePreference = 'system' | 'light' | 'dark';
export type ColorScheme = 'light' | 'dark';

export const APPEARANCE_STORAGE_KEY = 'paddletoday:appearance:v1';

export function parseAppearancePreference(value: unknown): AppearancePreference {
  return value === 'light' || value === 'dark' ? value : 'system';
}

export function resolveColorScheme(preference: AppearancePreference, systemScheme: string | null | undefined): ColorScheme {
  return preference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : preference;
}
