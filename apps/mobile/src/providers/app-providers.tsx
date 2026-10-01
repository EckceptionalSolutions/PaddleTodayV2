import AsyncStorage from '@react-native-async-storage/async-storage';
import { SNAPSHOT_MAX_AGE_MS } from '@paddletoday/api-contract';
import Constants from 'expo-constants';
import { focusManager, MutationCache, onlineManager, QueryCache, QueryClient } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import type { PropsWithChildren } from 'react';
import { AppState, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { captureAppException, trackAppEvent } from '../lib/observability';
import { AlertPreferencesProvider } from './alert-preferences-provider';
import { AreaNotificationPreferencesProvider } from './area-notification-preferences-provider';
import { SavedRiversProvider } from './saved-rivers-provider';
import { StoredLocationProvider } from '../hooks/use-stored-location';
import { queryCacheBuster } from '../lib/query-cache';
import { createRouteQueryPersister, shouldPersistRouteQuery } from '../lib/query-persister';
import { refreshFreshnessClock } from '../hooks/use-freshness-clock';
import { createConnectivityMonitor } from '../lib/connectivity';
import { deactivateAccountLocalData, flushAccountBackup, registerAccountBackupAuthProvider } from '../lib/account-backup';
import { restoreGuestLocalState } from '../lib/account-local-state';
import { AccountBackupInvitation } from '../components/account-backup-invitation';
import { activateTripSession, syncTrips, TRIP_RETURN_KEY } from '../lib/trip-session';
import { router } from 'expo-router';
import { WELCOME_COMPLETED_STORAGE_KEY } from '../lib/onboarding';
import { setAccountUnavailable, setAccountUser } from '../lib/account-status';

const queryPersister = createRouteQueryPersister();

const QUERY_CACHE_BUSTER = queryCacheBuster(
  Constants.nativeAppVersion ?? Constants.expoConfig?.version,
  Constants.nativeBuildVersion
);

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError(error, query) {
            captureAppException(error, {
              name: 'query_error',
              extra: {
                queryKey: JSON.stringify(query.queryKey),
              },
            });
          },
        }),
        mutationCache: new MutationCache({
          onError(error, _variables, _context, mutation) {
            captureAppException(error, {
              name: 'mutation_error',
              extra: {
                mutationKey: mutation.options.mutationKey ? JSON.stringify(mutation.options.mutationKey) : 'unkeyed',
              },
            });
          },
        }),
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 5 * 60 * 1000,
            gcTime: 24 * 60 * 60 * 1000,
          },
        },
      })
  );

  useEffect(() => {
    trackAppEvent('app_opened');

    const authEnabled = process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED === '1';
    let active = true;
    let authUnsubscribe: (() => void) | null = null;
    if (authEnabled && Platform.OS !== 'web') {
      void import('@react-native-firebase/auth').then(({ getAuth, onAuthStateChanged }) => {
        if (!active) return;
        registerAccountBackupAuthProvider(() => {
          const user = getAuth().currentUser;
          return user ? { uid: user.uid, getIdToken: () => user.getIdToken() } : null;
        });
        authUnsubscribe = onAuthStateChanged(getAuth(), (user) => {
          setAccountUser(user?.uid ?? null);
          void activateTripSession(user).then(async () => {
            if (!user) return;
            void flushAccountBackup().then(() => syncTrips()).catch(() => {});
            const target = await AsyncStorage.getItem(TRIP_RETURN_KEY);
            if (target?.startsWith('/trips?') && await AsyncStorage.getItem(WELCOME_COMPLETED_STORAGE_KEY) === '1') { await AsyncStorage.removeItem(TRIP_RETURN_KEY); router.replace(target as '/trips'); }
          }).catch(() => {});
          if (!user) void deactivateAccountLocalData().then(() => restoreGuestLocalState()).catch(() => {});
        });
        void flushAccountBackup();
      }).catch(() => { if (active) setAccountUnavailable(); });
    } else setAccountUnavailable();

    const connectivity = createConnectivityMonitor({
      subscribe: listener => NetInfo.addEventListener(listener),
      refresh: () => NetInfo.refresh(),
      onChange: online => {
        onlineManager.setOnline(online);
        refreshFreshnessClock();
        if (online) {
          void syncTrips().catch(() => {});
          void flushAccountBackup();
          void queryClient.refetchQueries({ type: 'active' }, { cancelRefetch: false });
        }
      },
    });

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') { refreshFreshnessClock(); void connectivity.refresh(); void flushAccountBackup(); }
      focusManager.setFocused(state === 'active');
    });
    const accountSyncTimer = setInterval(() => {
      if (AppState.currentState === 'active') {
        if (!onlineManager.isOnline()) void connectivity.refresh();
        else { void flushAccountBackup(); void syncTrips().catch(() => {}); }
      }
    }, 15_000);

    return () => { active = false; authUnsubscribe?.(); clearInterval(accountSyncTimer); registerAccountBackupAuthProvider(null); subscription.remove(); connectivity.unsubscribe(); };
  }, [queryClient]);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        buster: QUERY_CACHE_BUSTER,
        // Persisted route and board responses must not look current after a
        // full day offline; the API snapshot SLA is two hours.
        maxAge: SNAPSHOT_MAX_AGE_MS,
        dehydrateOptions: {
          shouldDehydrateQuery: shouldPersistRouteQuery,
          shouldDehydrateMutation: () => false,
        },
      }}
    >
      <AlertPreferencesProvider>
        <AreaNotificationPreferencesProvider>
          <StoredLocationProvider>
            <SavedRiversProvider>{children}<AccountBackupInvitation /></SavedRiversProvider>
          </StoredLocationProvider>
        </AreaNotificationPreferencesProvider>
      </AlertPreferencesProvider>
    </PersistQueryClientProvider>
  );
}
