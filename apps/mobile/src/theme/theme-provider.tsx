import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import { Appearance, Platform, useColorScheme } from 'react-native';
import { APPEARANCE_STORAGE_KEY, parseAppearancePreference, resolveColorScheme, type AppearancePreference, type ColorScheme } from './appearance';
import { darkColors, lightColors, type AppColors } from './tokens';

type AppTheme = {
  colors: AppColors;
  colorScheme: ColorScheme;
  preference: AppearancePreference;
  ready: boolean;
  storageError: boolean;
  setPreference: (preference: AppearancePreference) => void;
};

const ThemeContext = createContext<AppTheme | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [preference, setStoredPreference] = useState<AppearancePreference>('system');
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const writes = useRef(Promise.resolve());
  const colorScheme = resolveColorScheme(preference, systemScheme);
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  useEffect(() => {
    let active = true;
    void AsyncStorage.getItem(APPEARANCE_STORAGE_KEY).then(value => {
      if (active) setStoredPreference(parseAppearancePreference(value));
    }).catch(() => {
      if (active) setStorageError(true);
    }).finally(() => {
      if (active) setReady(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    // Match native dialogs and the keyboard to an explicit app preference.
    if (Platform.OS !== 'web') Appearance.setColorScheme(preference === 'system' ? null : preference);
  }, [preference]);

  useEffect(() => {
    void import('expo-system-ui').then(SystemUI => SystemUI.setBackgroundColorAsync(colors.canvas)).catch(() => {});
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.documentElement.style.colorScheme = colorScheme;
      document.body.style.backgroundColor = colors.canvas;
    }
  }, [colorScheme, colors]);

  const value = useMemo<AppTheme>(() => ({
    colors, colorScheme, preference, ready, storageError,
    setPreference(next) {
      setStoredPreference(next);
      // Serialize rapid changes so the last choice also wins after relaunch.
      writes.current = writes.current.then(() => AsyncStorage.setItem(APPEARANCE_STORAGE_KEY, next))
        .then(() => setStorageError(false)).catch(() => setStorageError(true));
    },
  }), [colors, colorScheme, preference, ready, storageError]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const theme = useContext(ThemeContext);
  // The outer render error boundary also needs a readable fallback.
  const systemScheme = useColorScheme();
  return theme ?? {
    colors: systemScheme === 'dark' ? darkColors : lightColors,
    colorScheme: systemScheme === 'dark' ? 'dark' as const : 'light' as const,
    preference: 'system' as const, ready: false, storageError: false,
    setPreference: () => {},
  };
}

const styleCache = new WeakMap<(colors: AppColors) => unknown, Map<AppColors, unknown>>();

export function useThemedStyles<T>(factory: (colors: AppColors) => T): T {
  const { colors } = useAppTheme();
  let palettes = styleCache.get(factory);
  if (!palettes) {
    palettes = new Map();
    styleCache.set(factory, palettes);
  }
  if (!palettes.has(colors)) palettes.set(colors, factory(colors));
  return palettes.get(colors) as T;
}
