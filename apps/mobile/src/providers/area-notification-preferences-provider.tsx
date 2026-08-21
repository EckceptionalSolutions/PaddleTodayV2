import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
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
  savePreferences: (value: AreaNotificationPreferences) => Promise<void>;
  clearPreferences: () => Promise<void>;
}

const Context = createContext<AreaNotificationPreferencesContextValue | null>(null);

export function AreaNotificationPreferencesProvider({ children }: PropsWithChildren) {
  const [preferences, setPreferences] = useState<AreaNotificationPreferences | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    void AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        const parsed = parseJson(raw);
        if (isAreaNotificationPreferences(parsed)) setPreferences(parsed);
      })
      .catch(() => undefined)
      .finally(() => setIsHydrated(true));
  }, []);

  async function savePreferences(value: AreaNotificationPreferences) {
    setPreferences(value);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }

  async function clearPreferences() {
    setPreferences(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  const value = useMemo(() => ({ preferences, isHydrated, savePreferences, clearPreferences }), [preferences, isHydrated]);
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
    typeof value.id === 'string' &&
    typeof value.managementToken === 'string' &&
    typeof value.locationLabel === 'string' &&
    typeof value.maxTravelMinutes === 'number' &&
    typeof value.todayEnabled === 'boolean' &&
    typeof value.weekendEnabled === 'boolean' &&
    typeof value.isActive === 'boolean'
  );
}
