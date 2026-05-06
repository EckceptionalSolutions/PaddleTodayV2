import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { captureAppException, trackAppEvent } from '../lib/observability';
import { AlertPreferencesProvider } from './alert-preferences-provider';
import { SavedRiversProvider } from './saved-rivers-provider';

const queryPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'paddletoday-mobile-query-cache',
});

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
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: 24 * 60 * 60 * 1000,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => query.state.status === 'success',
        },
      }}
    >
      <AlertPreferencesProvider>
        <SavedRiversProvider>{children}</SavedRiversProvider>
      </AlertPreferencesProvider>
    </PersistQueryClientProvider>
  );
}
