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
import { createRouteQueryPersister, serializeRouteCache } from './query-persister';
import { QUERY_CACHE_FILE_NAME, QUERY_CACHE_STORAGE_KEY } from './query-cache';

function client(queries: { key: string; timestamp: number; data?: string }[]): PersistedClient {
  return { timestamp: 1, buster: 'test', clientState: { mutations: [], queries: queries.map((query, index) => ({
    queryKey: [query.key, index], queryHash: String(index),
    state: { status: 'success', dataUpdatedAt: query.timestamp, data: query.data ?? 'small' },
  })) } } as PersistedClient;
}
beforeEach(() => { vi.resetAllMocks(); vi.useFakeTimers(); });
afterEach(() => vi.useRealTimers());

describe('bounded file query persistence', () => {
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
