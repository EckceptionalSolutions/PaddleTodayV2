import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PersistedClient, Persister } from '@tanstack/react-query-persist-client';
import * as Files from 'expo-file-system/legacy';
import { Platform } from 'react-native';
import { QUERY_CACHE_FILE_NAME, QUERY_CACHE_STORAGE_KEY } from './query-cache';
import { captureAppException } from './observability';

const MAX_CACHE_BYTES = 8 * 1024 * 1024;
const MAX_CACHED_QUERIES = 20;
const publicQueryKeys = new Set([
  'river-summary', 'weekend-summary', 'river-detail', 'river-group',
  'river-geometry', 'river-history', 'river-community',
]);

export function shouldPersistRouteQuery(query: { queryKey: readonly unknown[]; state: { status: string } }) {
  return query.state.status === 'success' && publicQueryKeys.has(String(query.queryKey[0]));
}

function utf8Bytes(value: string) {
  let bytes = 0;
  for (let index = 0; index < value.length; index++) {
    const code = value.charCodeAt(index);
    if (code < 0x80) bytes++;
    else if (code < 0x800) bytes += 2;
    else if (code >= 0xd800 && code <= 0xdbff && index + 1 < value.length
      && value.charCodeAt(index + 1) >= 0xdc00 && value.charCodeAt(index + 1) <= 0xdfff) {
      bytes += 4; index++;
    } else bytes += 3;
  }
  return bytes;
}

// Keep recently fetched public snapshots only. Catalog discovery can be
// fetched again; it must not crowd out saved routes or account/trip outboxes.
export function serializeRouteCache(client: PersistedClient) {
  const empty = { ...client, clientState: { mutations: [], queries: [] } };
  let remaining = MAX_CACHE_BYTES - utf8Bytes(JSON.stringify(empty));
  const queries = [...client.clientState.queries]
    .filter(shouldPersistRouteQuery)
    .sort((left, right) => right.state.dataUpdatedAt - left.state.dataUpdatedAt);
  const selected: typeof queries = [];
  for (const query of queries) {
    if (selected.length >= MAX_CACHED_QUERIES) break;
    const bytes = utf8Bytes(JSON.stringify(query)) + 1;
    if (bytes > remaining) continue;
    remaining -= bytes;
    selected.push(query);
  }
  return JSON.stringify({ ...empty, clientState: { ...empty.clientState, queries: selected } });
}

export function createRouteQueryPersister(): Persister {
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
      const value = serializeRouteCache(client);
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
