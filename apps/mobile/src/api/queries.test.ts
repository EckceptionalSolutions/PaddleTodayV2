import { QueryClient, QueryObserver } from '@tanstack/react-query';
import type { RiverDetailResponse } from '@paddletoday/api-contract';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiClient } from './client';
import { riverDetailQueryOptions, riverQueryKeys } from './queries';

vi.mock('./client', () => ({ apiClient: { getRiverDetail: vi.fn() } }));

const clients: QueryClient[] = [];
function client() {
  const value = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  clients.push(value);
  return value;
}
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => { resolve = done; });
  return { promise, resolve };
}
const response = (slug: string) => ({ result: { river: { slug } } }) as RiverDetailResponse;

afterEach(() => {
  clients.splice(0).forEach((value) => value.clear());
  vi.resetAllMocks();
});

describe('Explore-to-detail request lifecycle', () => {
  it('joins an in-flight preview request and reuses fresh data on a second visit', async () => {
    const queryClient = client();
    const pending = deferred<RiverDetailResponse>();
    vi.mocked(apiClient.getRiverDetail).mockReturnValue(pending.promise);
    const preload = queryClient.prefetchQuery(riverDetailQueryOptions('a'));
    const opening = queryClient.fetchQuery(riverDetailQueryOptions('a'));
    expect(apiClient.getRiverDetail).toHaveBeenCalledTimes(1);
    pending.resolve(response('a'));
    await preload;
    expect(await opening).toEqual(response('a'));
    expect(await queryClient.fetchQuery(riverDetailQueryOptions('a'))).toEqual(response('a'));
    expect(apiClient.getRiverDetail).toHaveBeenCalledTimes(1);
  });

  it('keeps a late route A response out of the selected route B observer', async () => {
    const queryClient = client();
    const a = deferred<RiverDetailResponse>();
    const b = deferred<RiverDetailResponse>();
    vi.mocked(apiClient.getRiverDetail).mockImplementation((slug) => slug === 'a' ? a.promise : b.promise);
    const preload = queryClient.prefetchQuery(riverDetailQueryOptions('a'));
    const observer = new QueryObserver(queryClient, riverDetailQueryOptions('b'));
    const unsubscribe = observer.subscribe(() => {});
    b.resolve(response('b'));
    await queryClient.fetchQuery(riverDetailQueryOptions('b'));
    a.resolve(response('a'));
    await preload;
    expect(observer.getCurrentResult().data?.result.river.slug).toBe('b');
    expect(queryClient.getQueryData(riverQueryKeys.detail('a'))).toEqual(response('a'));
    unsubscribe();
  });

  it('aborts a pending detail request on back and ignores its late completion', async () => {
    const queryClient = client();
    const pending = deferred<RiverDetailResponse>();
    let signal: AbortSignal | undefined;
    vi.mocked(apiClient.getRiverDetail).mockImplementation((_slug, options) => {
      signal = options?.signal;
      return pending.promise;
    });
    const observer = new QueryObserver(queryClient, riverDetailQueryOptions('a'));
    const unsubscribe = observer.subscribe(() => {});
    unsubscribe();
    expect(signal?.aborted).toBe(true);
    pending.resolve(response('a'));
    await pending.promise;
    expect(queryClient.getQueryData(riverQueryKeys.detail('a'))).toBeUndefined();
  });

  it('revalidates stale cached conditions', async () => {
    const queryClient = client();
    queryClient.setQueryData(riverQueryKeys.detail('a'), response('a'), { updatedAt: Date.now() - 6 * 60 * 1000 });
    vi.mocked(apiClient.getRiverDetail).mockResolvedValue(response('a'));
    await queryClient.fetchQuery(riverDetailQueryOptions('a'));
    expect(apiClient.getRiverDetail).toHaveBeenCalledTimes(1);
  });
});
