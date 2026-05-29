import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { isRecord, parseJson } from '../lib/storage';

const STORAGE_KEY = 'paddletoday:alert-preferences';

export interface SavedRouteAlertRecord {
  riverSlug: string;
  threshold: 'good' | 'strong';
  deliveryMethod: 'email' | 'push';
  updatedAt: string;
}

interface AlertPreferencesContextValue {
  email: string;
  routeAlerts: SavedRouteAlertRecord[];
  isHydrated: boolean;
  setEmail: (value: string) => Promise<void>;
  recordRouteAlert: (alert: Omit<SavedRouteAlertRecord, 'updatedAt'>) => Promise<void>;
  alertForRiver: (riverSlug: string) => SavedRouteAlertRecord | undefined;
}

const AlertPreferencesContext = createContext<AlertPreferencesContextValue | null>(null);

export function AlertPreferencesProvider({ children }: PropsWithChildren) {
  const [email, setStoredEmail] = useState('');
  const [routeAlerts, setRouteAlerts] = useState<SavedRouteAlertRecord[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const emailRef = useRef('');

  useEffect(() => {
    void hydratePreferences();
  }, []);

  async function hydratePreferences() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = parseJson(raw);
      if (isAlertPreferences(parsed)) {
        const nextEmail = parsed.email.trim();
        emailRef.current = nextEmail;
        setStoredEmail(nextEmail);
        setRouteAlerts(parsed.routeAlerts?.filter(isSavedRouteAlertRecord) ?? []);
      }
    } catch {
      // Ignore corrupt local preferences and continue with a clean state.
    } finally {
      setIsHydrated(true);
    }
  }

  async function setEmail(value: string) {
    const next = value.trim();
    emailRef.current = next;
    setStoredEmail(next);
    await persistPreferences(next, routeAlerts);
  }

  async function recordRouteAlert(alert: Omit<SavedRouteAlertRecord, 'updatedAt'>) {
    const nextAlert: SavedRouteAlertRecord = {
      ...alert,
      updatedAt: new Date().toISOString(),
    };
    const nextAlerts = [
      nextAlert,
      ...routeAlerts.filter(
        (item) =>
          item.riverSlug !== alert.riverSlug ||
          item.threshold !== alert.threshold ||
          item.deliveryMethod !== alert.deliveryMethod
      ),
    ];
    setRouteAlerts(nextAlerts);
    await persistPreferences(emailRef.current, nextAlerts);
  }

  const value = useMemo<AlertPreferencesContextValue>(
    () => ({
      email,
      routeAlerts,
      isHydrated,
      setEmail,
      recordRouteAlert,
      alertForRiver: (riverSlug) => routeAlerts.find((alert) => alert.riverSlug === riverSlug),
    }),
    [email, isHydrated, routeAlerts]
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

async function persistPreferences(email: string, routeAlerts: SavedRouteAlertRecord[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ email, routeAlerts }));
}

function isAlertPreferences(value: unknown): value is { email: string; routeAlerts: unknown[] } {
  return (
    isRecord(value) &&
    typeof value.email === 'string' &&
    (value.routeAlerts === undefined || Array.isArray(value.routeAlerts))
  );
}

function isSavedRouteAlertRecord(value: unknown): value is SavedRouteAlertRecord {
  return (
    isRecord(value) &&
    typeof value.riverSlug === 'string' &&
    (value.threshold === 'good' || value.threshold === 'strong') &&
    (value.deliveryMethod === 'email' || value.deliveryMethod === 'push') &&
    typeof value.updatedAt === 'string'
  );
}
