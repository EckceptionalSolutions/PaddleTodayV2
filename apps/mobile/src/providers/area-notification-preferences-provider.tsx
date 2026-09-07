import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { AreaNotificationSubscriptionResponse } from '@paddletoday/api-contract';
import { isRecord, parseJson } from '../lib/storage';

const STORAGE_KEY = 'paddletoday:area-notification-preferences';

export interface AreaNotificationPreferences {
  id: string;
  managementToken: string;
  locationLabel: string;
  maxTravelMinutes: number;
  todayEnabled: boolean;
  weekendEnabled: boolean;
  isActive: boolean;
}

interface AreaNotificationPreferencesContextValue {
  preferences: AreaNotificationPreferences | null;
  isHydrated: boolean;
  storageError: boolean;
  loadError: boolean;
  loadingPreferences: boolean;
  retryLoad: () => Promise<void>;
  savePreferences: (value: AreaNotificationPreferences) => Promise<void>;
  clearPreferences: () => Promise<void>;
}

const Context = createContext<AreaNotificationPreferencesContextValue | null>(null);

export function AreaNotificationPreferencesProvider({ children }: PropsWithChildren) {
  const [preferences, setPreferences] = useState<AreaNotificationPreferences | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [loadingPreferences, setLoadingPreferences] = useState(false);
  const loadInFlight = useRef(false);

  const retryLoad = useCallback(async () => {
    if (loadInFlight.current) return;
    loadInFlight.current = true;
    setLoadingPreferences(true);
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = parseJson(raw);
      if (raw !== null && !isAreaNotificationPreferences(parsed)) {
        throw new Error('Alert settings could not be read.');
      }
      setPreferences(isAreaNotificationPreferences(parsed) ? parsed : null);
      setLoadError(false);
    } catch {
      setLoadError(true);
    } finally {
      setIsHydrated(true);
      setLoadingPreferences(false);
      loadInFlight.current = false;
    }
  }, []);

  useEffect(() => { void retryLoad(); }, [retryLoad]);

  async function savePreferences(value: AreaNotificationPreferences) {
    setPreferences(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      setStorageError(false);
    } catch (error) {
      setStorageError(true);
      throw error;
    }
  }

  async function clearPreferences() {
    setPreferences(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  const value = useMemo(() => ({ preferences, isHydrated, storageError, loadError, loadingPreferences, retryLoad, savePreferences, clearPreferences }), [preferences, isHydrated, storageError, loadError, loadingPreferences, retryLoad]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAreaNotificationPreferences() {
  const context = useContext(Context);
  if (!context) throw new Error('useAreaNotificationPreferences must be used within AreaNotificationPreferencesProvider.');
  return context;
}

export function areaNotificationPreferencesFromResponse(
  response: AreaNotificationSubscriptionResponse,
): AreaNotificationPreferences {
  return response.subscription;
}

function isAreaNotificationPreferences(value: unknown): value is AreaNotificationPreferences {
  return (
    isRecord(value) &&
    typeof value.id === 'string' && value.id.trim().length > 0 &&
    typeof value.managementToken === 'string' && value.managementToken.trim().length > 0 &&
    typeof value.locationLabel === 'string' &&
    typeof value.maxTravelMinutes === 'number' &&
    typeof value.todayEnabled === 'boolean' &&
    typeof value.weekendEnabled === 'boolean' &&
    typeof value.isActive === 'boolean'
  );
}
