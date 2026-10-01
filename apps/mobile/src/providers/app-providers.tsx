import AsyncStorage from '@react-native-async-storage/async-storage';
import { SNAPSHOT_MAX_AGE_MS } from '@paddletoday/api-contract';
import Constants from 'expo-constants';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { focusManager, MutationCache, onlineManager, QueryCache, QueryClient } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { PersistQueryClientProvider, type PersistedClient } from '@tanstack/react-query-persist-client';
import type { PropsWithChildren } from 'react';
import { AppState, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { captureAppException, trackAppEvent } from '../lib/observability';
import { AlertPreferencesProvider } from './alert-preferences-provider';
import { AreaNotificationPreferencesProvider } from './area-notification-preferences-provider';
import { SavedRiversProvider } from './saved-rivers-provider';
import { StoredLocationProvider } from '../hooks/use-stored-location';
import { QUERY_CACHE_STORAGE_KEY, queryCacheBuster } from '../lib/query-cache';
import { refreshFreshnessClock } from '../hooks/use-freshness-clock';
import { createConnectivityMonitor } from '../lib/connectivity';
import { deactivateAccountLocalData, flushAccountBackup, registerAccountBackupAuthProvider } from '../lib/account-backup';
import { restoreGuestLocalState } from '../lib/account-local-state';
import { AccountBackupInvitation } from '../components/account-backup-invitation';
import { activateTripSession, syncTrips, TRIP_RETURN_KEY } from '../lib/trip-session';
import { router } from 'expo-router';
import { WELCOME_COMPLETED_STORAGE_KEY } from '../lib/onboarding';

const MAX_PERSISTED_QUERY_CACHE_CHARS = 4 * 1024 * 1024;

const queryPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: QUERY_CACHE_STORAGE_KEY,
  serialize: serializeBoundedQueryCache,
});

const QUERY_CACHE_BUSTER = queryCacheBuster(
  Constants.nativeAppVersion ?? Constants.expoConfig?.version,
  Constants.nativeBuildVersion
);

function serializeBoundedQueryCache(client: PersistedClient) {
  const emptyClient: PersistedClient = {
    ...client,
    clientState: { ...client.clientState, mutations: [], queries: [] },
  };
  const emptySerialized = JSON.stringify(emptyClient);
  const cacheBudget = MAX_PERSISTED_QUERY_CACHE_CHARS - emptySerialized.length + 4;
  const mutations: PersistedClient['clientState']['mutations'] = [];
  let mutationCharacters = 0;

  // Preserve resumable work first, then use the remaining space for recent
  // successful queries.
  const mutationCandidates = [...client.clientState.mutations]
    .sort((left, right) => right.state.submittedAt - left.state.submittedAt);
  for (const mutation of mutationCandidates) {
    const separatorCharacters = mutations.length > 0 ? 1 : 0;
    const remainingCharacters = cacheBudget - mutationCharacters - separatorCharacters;
    if (remainingCharacters <= 0) break;

    const estimatedCharacters = estimateJsonCharacters(mutation, remainingCharacters);
    if (estimatedCharacters > remainingCharacters) continue;

    mutations.push(mutation);
    mutationCharacters += estimatedCharacters + separatorCharacters;
  }

  const candidates = [...client.clientState.queries]
    // Route geometry is fetched on demand and can add large coordinate arrays
    // to every whole-cache write without improving offline route selection.
    .filter((query) => query.queryKey[0] !== 'river-geometry')
    .sort((left, right) => right.state.dataUpdatedAt - left.state.dataUpdatedAt);
  const queries: PersistedClient['clientState']['queries'] = [];
  let queryCharacters = 0;

  for (const query of candidates) {
    const separatorCharacters = queries.length > 0 ? 1 : 0;
    const remainingCharacters = cacheBudget - mutationCharacters - queryCharacters
      - (mutations.length > 0 ? 1 : 0) - separatorCharacters;
    if (remainingCharacters <= 0) break;

    const estimatedCharacters = estimateJsonCharacters(query, remainingCharacters);
    if (estimatedCharacters > remainingCharacters) continue;

    queries.push(query);
    queryCharacters += estimatedCharacters + separatorCharacters;
  }

  const serialized = JSON.stringify({
    ...emptyClient,
    clientState: { ...emptyClient.clientState, mutations, queries },
  });

  // Keep a final exact check in case a dehydrated value has custom JSON
  // serialization behavior that the conservative size estimate cannot model.
  return serialized.length <= MAX_PERSISTED_QUERY_CACHE_CHARS ? serialized : emptySerialized;
}

function estimateJsonCharacters(value: unknown, limit: number) {
  let characters = 0;

  function add(amount: number) {
    characters += amount;
    return characters <= limit;
  }

  function visit(current: unknown): boolean {
    if (current === null) return add(4);

    switch (typeof current) {
      case 'string':
        return add(estimateJsonStringCharacters(current, limit - characters));
      case 'boolean':
        return add(current ? 4 : 5);
      case 'number':
        return add(Number.isFinite(current) ? String(current).length : 4);
      case 'object': {
        if (Array.isArray(current)) {
          if (!add(2)) return false;
          let first = true;
          for (const item of current) {
            if (!first && !add(1)) return false;
            first = false;
            if (item === undefined || typeof item === 'function' || typeof item === 'symbol') {
              if (!add(4)) return false;
            } else if (!visit(item)) {
              return false;
            }
          }
          return true;
        }

        if (!add(2)) return false;
        let first = true;
        for (const key in current) {
          if (!Object.prototype.hasOwnProperty.call(current, key)) continue;
          const item = (current as Record<string, unknown>)[key];
          if (item === undefined || typeof item === 'function' || typeof item === 'symbol') continue;
          if (!first && !add(1)) return false;
          first = false;
          if (!add(estimateJsonStringCharacters(key, limit - characters)) || !add(1) || !visit(item)) return false;
        }
        return add(0);
      }
      default:
        return add(4);
    }
  }

  visit(value);
  return characters;
}

function estimateJsonStringCharacters(value: string, limit: number) {
  let characters = 2;
  for (const character of value) {
    const code = character.charCodeAt(0);
    characters += character === '"' || character === '\\'
      ? 2
      : code < 0x20 || (code >= 0xd800 && code <= 0xdfff && character.length === 1)
        ? 6
        : character.length;
    if (characters > limit) return limit + 1;
  }
  return characters;
}

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
          void activateTripSession(user).then(async () => {
            if (!user) return;
            void flushAccountBackup().then(() => syncTrips()).catch(() => {});
            const target = await AsyncStorage.getItem(TRIP_RETURN_KEY);
            if (target?.startsWith('/trips?') && await AsyncStorage.getItem(WELCOME_COMPLETED_STORAGE_KEY) === '1') { await AsyncStorage.removeItem(TRIP_RETURN_KEY); router.replace(target as '/trips'); }
          }).catch(() => {});
          if (!user) void deactivateAccountLocalData().then(() => restoreGuestLocalState()).catch(() => {});
        });
        void flushAccountBackup();
      }).catch(() => {});
    }

    const connectivity = createConnectivityMonitor({
      subscribe: listener => NetInfo.addEventListener(listener),
      refresh: () => NetInfo.refresh(),
      onChange: online => {
        onlineManager.setOnline(online);
        if (online) {
          void syncTrips().catch(() => {});
          void flushAccountBackup();
          refreshFreshnessClock();
          void queryClient.refetchQueries({ type: 'active', stale: true });
        }
      },
    });

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') { refreshFreshnessClock(); void connectivity.refresh(); void flushAccountBackup(); }
      focusManager.setFocused(state === 'active');
    });
    const accountSyncTimer = setInterval(() => {
      if (AppState.currentState === 'active') { void flushAccountBackup(); void syncTrips().catch(() => {}); }
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
          shouldDehydrateQuery: (query) => query.state.status === 'success',
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
