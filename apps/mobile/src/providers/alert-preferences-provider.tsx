import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { createAlertPreferenceStore, type AlertPreferenceState, type SavedRouteAlertRecord } from '../lib/alert-preference-store';
export type { SavedRouteAlertRecord } from '../lib/alert-preference-store';

interface AlertPreferencesContextValue extends AlertPreferenceState {
  setEmail: (value: string) => Promise<void>;
  recordRouteAlert: (alert: Omit<SavedRouteAlertRecord, 'updatedAt'>) => Promise<void>;
  alertForRiver: (riverSlug: string) => SavedRouteAlertRecord | undefined;
  retryStorage: () => Promise<void>;
}
const AlertPreferencesContext = createContext<AlertPreferencesContextValue | null>(null);

export function AlertPreferencesProvider({ children }: PropsWithChildren) {
  const [store] = useState(() => createAlertPreferenceStore(AsyncStorage));
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  useEffect(() => { void store.load(); }, [store]);
  const value = useMemo<AlertPreferencesContextValue>(() => ({ ...state,
    setEmail: store.setEmail, recordRouteAlert: store.recordRouteAlert, retryStorage: store.retry,
    alertForRiver: riverSlug => state.routeAlerts.find(alert => alert.riverSlug === riverSlug),
  }), [state, store]);
  return <AlertPreferencesContext.Provider value={value}>{children}</AlertPreferencesContext.Provider>;
}

export function useAlertPreferences() {
  const context = useContext(AlertPreferencesContext);
  if (!context) throw new Error('useAlertPreferences must be used within AlertPreferencesProvider.');
  return context;
}
