import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PersistedClient, Persister } from '@tanstack/react-query-persist-client';
import * as Files from 'expo-file-system/legacy';
import { Platform } from 'react-native';
import { QUERY_CACHE_FILE_NAME, QUERY_CACHE_STORAGE_KEY } from './query-cache';
import { captureAppException } from './observability';

import { createRouteCacheSerializer, MAX_CACHE_BYTES, shouldPersistRouteQuery } from './query-cache-serializer';
export { createRouteCacheSerializer, serializeRouteCache, shouldPersistRouteQuery } from './query-cache-serializer';

export function createRouteQueryPersister(): Persister {
  const serialize = createRouteCacheSerializer();
  const file = Files.cacheDirectory ? Files.cacheDirectory + QUERY_CACHE_FILE_NAME : null;
  let queue: Promise<unknown> = Promise.resolve();
  let reportedFailure = false;
  let pending: PersistedClient | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  function serial<T>(action: () => Promise<T>): Promise<T> {
    const work = queue.catch(() => {}).then(action);
    queue = work;
    return work;
  }
  function report(error: unknown) {
    if (!reportedFailure) captureAppException(error, { name: 'route_cache_storage_error' });
    reportedFailure = true;
  }
  async function write(client: PersistedClient) {
    try {
      const value = serialize(client);
      if (Platform.OS === 'web') await AsyncStorage.setItem(QUERY_CACHE_STORAGE_KEY, value);
      else {
        if (!file) throw new Error('Route cache directory is unavailable.');
        const temporary = file + '.tmp';
        await Files.writeAsStringAsync(temporary, value);
        await Files.moveAsync({ from: temporary, to: file });
      }
      reportedFailure = false;
    } catch (error) { report(error); }
  }
  return {
    persistClient(client) {
      pending = client;
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        const latest = pending;
        pending = null;
        if (latest) void serial(() => write(latest));
      }, 1000);
    },
    restoreClient() {
      return serial(async () => {
        try {
          // Remove only the obsolete, expendable query-cache row. It can fill
          // AsyncStorage's Android database or exceed its readable row limit.
          // Saved routes, drafts, offline packets, and account keys are kept.
          if (Platform.OS !== 'web') await AsyncStorage.removeItem(QUERY_CACHE_STORAGE_KEY);
          let raw: string | null = null;
          if (Platform.OS === 'web') raw = await AsyncStorage.getItem(QUERY_CACHE_STORAGE_KEY);
          else if (file) {
            const info = await Files.getInfoAsync(file);
            if (info.exists && info.size <= MAX_CACHE_BYTES) raw = await Files.readAsStringAsync(file);
            else if (info.exists) await Files.deleteAsync(file, { idempotent: true });
          }
          if (!raw) return undefined;
          const client = JSON.parse(raw) as PersistedClient;
          if (!Number.isFinite(client.timestamp) || typeof client.buster !== 'string'
            || !Array.isArray(client.clientState?.queries)) throw new Error('Route cache is invalid.');
          return { ...client, clientState: { mutations: [], queries: client.clientState.queries.filter(shouldPersistRouteQuery) } };
        } catch (error) { report(error); return undefined; }
      });
    },
    removeClient() {
      if (timer) clearTimeout(timer);
      timer = null;
      pending = null;
      return serial(async () => {
        try {
          if (Platform.OS === 'web') await AsyncStorage.removeItem(QUERY_CACHE_STORAGE_KEY);
          else if (file) {
            await Files.deleteAsync(file, { idempotent: true });
            await Files.deleteAsync(file + '.tmp', { idempotent: true });
          }
        } catch (error) { report(error); }
      });
    },
  };
}
