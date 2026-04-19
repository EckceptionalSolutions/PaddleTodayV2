import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { isRecord, parseJson } from '../lib/storage';

const STORAGE_KEY = 'paddletoday:alert-preferences';

interface AlertPreferencesContextValue {
  email: string;
  isHydrated: boolean;
  setEmail: (value: string) => Promise<void>;
}

const AlertPreferencesContext = createContext<AlertPreferencesContextValue | null>(null);

export function AlertPreferencesProvider({ children }: PropsWithChildren) {
  const [email, setStoredEmail] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    void hydratePreferences();
  }, []);

  async function hydratePreferences() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = parseJson(raw);
      if (isAlertPreferences(parsed)) {
        setStoredEmail(parsed.email.trim());
      }
    } catch {
      // Ignore corrupt local preferences and continue with a clean state.
    } finally {
      setIsHydrated(true);
    }
  }

  async function setEmail(value: string) {
    const next = value.trim();
    setStoredEmail(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ email: next }));
  }

  const value = useMemo<AlertPreferencesContextValue>(
    () => ({
      email,
      isHydrated,
      setEmail,
    }),
    [email, isHydrated]
  );

  return <AlertPreferencesContext.Provider value={value}>{children}</AlertPreferencesContext.Provider>;
}

export function useAlertPreferences() {
  const context = useContext(AlertPreferencesContext);
  if (!context) {
    throw new Error('useAlertPreferences must be used within AlertPreferencesProvider.');
  }

  return context;
}

function isAlertPreferences(value: unknown): value is { email: string } {
  return isRecord(value) && typeof value.email === 'string';
}
