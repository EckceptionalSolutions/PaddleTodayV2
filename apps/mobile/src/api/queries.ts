import type { CreateRiverAlertRequest } from '@paddletoday/api-contract';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from './client';

export const riverQueryKeys = {
  summary: ['river-summary'] as const,
  weekend: ['weekend-summary'] as const,
  detail: (slug: string) => ['river-detail', slug] as const,
  history: (slug: string, days: number) => ['river-history', slug, days] as const,
  community: (slug: string) => ['river-community', slug] as const,
};

export function useRiverSummaryQuery() {
  return useQuery({
    queryKey: riverQueryKeys.summary,
    queryFn: ({ signal }) => apiClient.getSummary({ signal }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRiverDetailQuery(slug: string) {
  return useQuery({
    queryKey: riverQueryKeys.detail(slug),
    enabled: Boolean(slug),
    queryFn: ({ signal }) => apiClient.getRiverDetail(slug, { signal }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRiverHistoryQuery(slug: string, days = 7) {
  return useQuery({
    queryKey: riverQueryKeys.history(slug, days),
    enabled: Boolean(slug),
    queryFn: ({ signal }) => apiClient.getRiverHistory(slug, { days, signal }),
    staleTime: 30 * 60 * 1000,
  });
}

export function useWeekendSummaryQuery() {
  return useQuery({
    queryKey: riverQueryKeys.weekend,
    queryFn: ({ signal }) => apiClient.getWeekendSummary({ signal }),
    staleTime: 15 * 60 * 1000,
  });
}

export function useRouteCommunityQuery(slug: string) {
  return useQuery({
    queryKey: riverQueryKeys.community(slug),
    enabled: Boolean(slug),
    queryFn: ({ signal }) => apiClient.getRouteCommunity(slug, { signal }),
    staleTime: 15 * 60 * 1000,
  });
}

export function useCreateRiverAlertMutation() {
  return useMutation({
    mutationFn: (input: CreateRiverAlertRequest) => apiClient.createRiverAlert(input),
  });
}
