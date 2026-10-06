import type { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

type BoardQueryKeys = 'data' | 'dataUpdatedAt' | 'error' | 'isError' | 'isFetching'
  | 'isPending' | 'isRefetchError' | 'isRefetching' | 'refetch';

// Focus changes the observer subscription, but need not rebuild a cached board.
// Keep every field used by its view reactive, including refresh/error notices.
export function useBoardQueryState<T extends Pick<UseQueryResult, BoardQueryKeys>>(query: T): Pick<T, BoardQueryKeys> {
  const { data, dataUpdatedAt, error, isError, isFetching, isPending, isRefetchError, isRefetching, refetch } = query;
  return useMemo(() => ({ data, dataUpdatedAt, error, isError, isFetching, isPending, isRefetchError, isRefetching, refetch }),
    [data, dataUpdatedAt, error, isError, isFetching, isPending, isRefetchError, isRefetching, refetch]) as Pick<T, BoardQueryKeys>;
}
