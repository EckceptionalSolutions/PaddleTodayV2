import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { PersistedClient } from '@tanstack/react-query-persist-client';

const storage = vi.hoisted(() => ({ removeItem: vi.fn(), getItem: vi.fn(), setItem: vi.fn() }));
const files = vi.hoisted(() => ({
  cacheDirectory: 'cache/', getInfoAsync: vi.fn(), readAsStringAsync: vi.fn(),
  writeAsStringAsync: vi.fn(), moveAsync: vi.fn(), deleteAsync: vi.fn(),
}));
vi.mock('@react-native-async-storage/async-storage', () => ({ default: storage }));
vi.mock('expo-file-system/legacy', () => files);
vi.mock('react-native', () => ({ Platform: { OS: 'android' } }));
vi.mock('./observability', () => ({ captureAppException: vi.fn() }));
import { createRouteCacheSerializer, createRouteQueryPersister, serializeRouteCache } from './query-persister';
import { QUERY_CACHE_FILE_NAME, QUERY_CACHE_STORAGE_KEY } from './query-cache';

function client(queries: { key: string; timestamp: number; data?: unknown }[]): PersistedClient {
  return { timestamp: 1, buster: 'test', clientState: { mutations: [], queries: queries.map((query, index) => ({
    queryKey: [query.key, index], queryHash: String(index),
    state: {
      status: 'success', dataUpdatedAt: query.timestamp, data: query.data ?? 'small', dataUpdateCount: 1,
      error: null, errorUpdateCount: 0, errorUpdatedAt: 0, fetchFailureCount: 0,
      fetchFailureReason: null, fetchMeta: null, isInvalidated: false, fetchStatus: 'idle',
    },
  })) } } as PersistedClient;
}
beforeEach(() => { vi.resetAllMocks(); vi.useFakeTimers(); });
afterEach(() => vi.useRealTimers());

describe('bounded file query persistence', () => {
  it('does not repeatedly serialize unchanged metadata that cannot fit alongside the boards', () => {
    let visits = 0;
    const metadata = { toJSON: () => { visits++; return 'c'.repeat(6_000_000); } };
    const source = client([
      { key: 'river-summary', timestamp: 1, data: 'a'.repeat(2_000_000) },
      { key: 'weekend-summary', timestamp: 2, data: 'b'.repeat(2_000_000) },
      { key: 'mobile-route-catalog', timestamp: 3, data: metadata },
    ]);
    const serialize = createRouteCacheSerializer();
    serialize(source);
    serialize(source);
    expect(visits).toBe(1);
    source.clientState.queries = source.clientState.queries.filter(query => query.queryKey[0] === 'mobile-route-catalog');
    const next = JSON.parse(serialize(source));
    expect(next.clientState.queries[0].state.data).toHaveLength(6_000_000);
    expect(visits).toBe(2);
  });
  it('prioritizes both current boards when a newer catalog would crowd them out', () => {
    const result = serializeRouteCache(client([
      { key: 'river-summary', timestamp: 1, data: 'a'.repeat(2_000_000) },
      { key: 'weekend-summary', timestamp: 2, data: 'b'.repeat(2_000_000) },
      { key: 'mobile-route-catalog', timestamp: 3, data: 'c'.repeat(6_000_000) },
    ]));
    expect(JSON.parse(result).clientState.queries.map((query: { queryKey: string[] }) => query.queryKey[0])).toEqual(['weekend-summary', 'river-summary']);
    expect(Buffer.byteLength(result, 'utf8')).toBeLessThanOrEqual(8 * 1024 * 1024);
  });
  it('retains updated query state while reusing an unchanged snapshot', () => {
    const serialize = createRouteCacheSerializer();
    const source = client([{ key: 'river-summary', timestamp: 1, data: '🌊"\\\n' }]);
    const first = JSON.parse(serialize(source));
    source.timestamp = 2;
    source.clientState.queries[0].state.fetchStatus = 'fetching';
    const next = JSON.parse(serialize(source));
    expect(next.timestamp).toBe(2);
    expect(next.clientState.queries[0].state.fetchStatus).toBe('fetching');
    expect(next.clientState.queries[0].state.data).toEqual(first.clientState.queries[0].state.data);
    source.clientState.queries[0].state.data = { corrected: true };
    expect(JSON.parse(serialize(source)).clientState.queries[0].state.data).toEqual({ corrected: true });
  });
  it('stores both mobile boards and reusable metadata within the same byte budget', () => {
    const result = serializeRouteCache(client([
      { key: 'river-summary', timestamp: 1, data: 'a'.repeat(2_000_000) },
      { key: 'weekend-summary', timestamp: 2, data: 'b'.repeat(2_000_000) },
      { key: 'mobile-route-catalog', timestamp: 3, data: 'c'.repeat(1_000_000) },
    ]));
    expect(Buffer.byteLength(result, 'utf8')).toBeLessThanOrEqual(8 * 1024 * 1024);
    expect(JSON.parse(result).clientState.queries).toHaveLength(3);
  });
  it('limits recent public queries and excludes private records', () => {
    const source = client(Array.from({ length: 25 }, (_, timestamp) => ({ key: 'river-detail', timestamp })));
    source.clientState.queries.push(...client([{ key: 'account', timestamp: 30 }]).clientState.queries);
    const result = JSON.parse(serializeRouteCache(source)) as PersistedClient;
    expect(result.clientState.queries).toHaveLength(20);
    expect(result.clientState.queries[0].state.dataUpdatedAt).toBe(24);
    expect(result.clientState.queries.every(query => query.queryKey[0] === 'river-detail')).toBe(true);
    expect(source.clientState.queries).toHaveLength(26);
  });
  it('bounds UTF-8 bytes, retaining smaller snapshots when one exceeds the budget', () => {
    const result = serializeRouteCache(client([
      { key: 'river-detail', timestamp: 2, data: '🌊'.repeat(2_100_000) },
      { key: 'river-detail', timestamp: 1 },
    ]));
    expect(Buffer.byteLength(result, 'utf8')).toBeLessThanOrEqual(8 * 1024 * 1024);
    expect(JSON.parse(result).clientState.queries).toHaveLength(1);
  });
  it('migrates only the expendable legacy cache key, preserving user records', async () => {
    files.getInfoAsync.mockResolvedValue({ exists: false });
    expect(await createRouteQueryPersister().restoreClient()).toBeUndefined();
    expect(storage.removeItem).toHaveBeenCalledExactlyOnceWith(QUERY_CACHE_STORAGE_KEY);
  });
  it('writes the native cache through a temporary file instead of AsyncStorage', async () => {
    const persister = createRouteQueryPersister();
    await persister.persistClient(client([{ key: 'river-detail', timestamp: 1 }]));
    await vi.advanceTimersByTimeAsync(1000);
    expect(files.moveAsync).toHaveBeenCalledWith({ from: `cache/${QUERY_CACHE_FILE_NAME}.tmp`, to: `cache/${QUERY_CACHE_FILE_NAME}` });
    expect(storage.setItem).not.toHaveBeenCalled();
  });
  it('cancels a scheduled write when the cache is reset', async () => {
    const persister = createRouteQueryPersister();
    await persister.persistClient(client([{ key: 'river-detail', timestamp: 1 }]));
    await persister.removeClient();
    await vi.advanceTimersByTimeAsync(1000);
    expect(files.writeAsStringAsync).not.toHaveBeenCalled();
  });
});
