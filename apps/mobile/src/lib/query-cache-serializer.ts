import type { PersistedClient } from '@tanstack/react-query-persist-client';

export const MAX_CACHE_BYTES = 8 * 1024 * 1024;
const MAX_CACHED_QUERIES = 20;
const publicQueryKeys = new Set([
  'mobile-route-catalog',
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

// Retain the latest Today and Weekend boards before other public snapshots.
// Account records, saved routes and trip outboxes use separate storage.
export function serializeRouteCache(client: PersistedClient) {
  return createRouteCacheSerializer()(client);
}

/** Bound cached JSON as well as the file; unchanged query updates reuse it. */
export function createRouteCacheSerializer() {
  const cached = new Map<string, { data: unknown; json: string; bytes: number }>();
  const skipped = new Map<string, { data: unknown; bytes: number }>();
  let cachedBytes = 0;
  return (client: PersistedClient) => {
    const empty = { ...client, clientState: { mutations: [], queries: [] } };
    const envelope = JSON.stringify(empty);
    let remaining = MAX_CACHE_BYTES - utf8Bytes(envelope);
    const queries = [...client.clientState.queries]
      .filter(shouldPersistRouteQuery)
      .sort((left, right) => right.state.dataUpdatedAt - left.state.dataUpdatedAt);
    const latestBoards = new Set(['river-summary', 'weekend-summary'].map(key =>
      queries.find(query => query.queryKey[0] === key)).filter(Boolean));
    queries.sort((left, right) => Number(latestBoards.has(right)) - Number(latestBoards.has(left)));
    const selected: string[] = [];
    const retained = new Set<string>();
    const skippedThisWrite = new Set<string>();
    for (const query of queries) {
      if (selected.length >= MAX_CACHED_QUERIES) break;
      const previous = cached.get(query.queryHash);
      const data = query.state.data;
      const queryEnvelope = JSON.stringify({ ...query, state: undefined });
      const stateEnvelope = JSON.stringify({ ...query.state, data: undefined });
      const prefix = `${queryEnvelope.slice(0, -1)},"state":${stateEnvelope.slice(0, -1)}`;
      const prefixBytes = utf8Bytes(prefix);
      const tooLarge = skipped.get(query.queryHash);
      if (tooLarge && tooLarge.data === data && prefixBytes + tooLarge.bytes + 11 > remaining) {
        skippedThisWrite.add(query.queryHash);
        continue;
      }
      const serialized = previous?.data === data ? previous : (() => {
        const json = JSON.stringify(data);
        return json === undefined ? undefined : { data, json, bytes: utf8Bytes(json) };
      })();
      // State metadata can change without changing the snapshot. Serialize that
      // small envelope each time, and insert the already serialized data once.
      const value = serialized ? `${prefix},"data":${serialized.json}}}` : `${prefix}}}`;
      const bytes = prefixBytes + (serialized ? 10 + serialized.bytes : 2) + 1;
      if (bytes > remaining) {
        if (serialized) {
          skipped.set(query.queryHash, { data, bytes: serialized.bytes });
          skippedThisWrite.add(query.queryHash);
        }
        continue;
      }
      skipped.delete(query.queryHash);
      remaining -= bytes;
      selected.push(value);
      retained.add(query.queryHash);
      if (serialized && previous !== serialized) {
        if (previous) cachedBytes -= previous.bytes;
        cached.set(query.queryHash, serialized);
        cachedBytes += serialized.bytes;
      }
    }
    for (const [key, value] of cached) {
      if (!retained.has(key) || cachedBytes > MAX_CACHE_BYTES) {
        cached.delete(key);
        cachedBytes -= value.bytes;
      }
    }
    for (const key of skipped.keys()) {
      if (!skippedThisWrite.has(key) || skipped.size > MAX_CACHED_QUERIES) skipped.delete(key);
    }
    return envelope.replace('"queries":[]', `"queries":[${selected.join(',')}]`);
  };
}
