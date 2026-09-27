import type { Trip, TripList, TripMutation, LogMutation, PaddleLog, PublicTrip } from '@paddletoday/api-contract';
export class TripApiError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) { super(message); }
}
export function createTripsClient(baseUrl: string, getToken: () => Promise<string>, fetcher: typeof fetch = fetch) {
  async function request<T>(path: string, method = 'GET', body?: unknown, publicRequest = false, queueAgeMs?: number): Promise<T> {
    const headers: Record<string, string> = { accept: 'application/json' };
    if (queueAgeMs !== undefined) headers['x-trip-queue-age-ms'] = String(Math.max(0, Math.round(queueAgeMs)));
    if (!publicRequest) headers.authorization = `Bearer ${await getToken()}`;
    if (body !== undefined) headers['content-type'] = 'application/json';
    const abort = new AbortController(), timer = setTimeout(() => abort.abort(), body && path.includes('/photos/') ? 90000 : 20000);
    try {
      const response = await fetcher(new URL(path, baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'), {
        method, headers, body: body === undefined ? undefined : JSON.stringify(body), cache: 'no-store', signal: abort.signal,
      });
      const payload = await response.json();
      if (!response.ok) throw new TripApiError(response.status, payload.error || 'request_failed', payload.message || 'Could not sync. Your changes are kept on this device.');
      return payload as T;
    } finally { clearTimeout(timer); }
  }
  return {
    list: (cursor = '') => request<TripList>('/api/trips' + (cursor ? `?cursor=${encodeURIComponent(cursor)}` : '')),
    get: (id: string) => request<{ trip: Trip }>(`/api/trips/${encodeURIComponent(id)}`),
    mutate: (id: string, value: TripMutation, queueAgeMs?: number) => request<{ trip: Trip | null }>(`/api/trips/${encodeURIComponent(id)}`, 'POST', value, false, queueAgeMs),
    log: (id: string, value: LogMutation, queueAgeMs?: number) => request<{ log: PaddleLog | null }>(`/api/paddle-logs/${encodeURIComponent(id)}`, 'POST', value, false, queueAgeMs),
    getLog: (id: string) => request<{ log: PaddleLog }>(`/api/paddle-logs/${encodeURIComponent(id)}`),
    view: (id: string, token: string) => request<{ trip: PublicTrip }>('/api/trips/view', 'POST', { id, token }, true),
    invitation: (id: string, token: string) => request<{ invitation: { title: string; date: string } }>('/api/trips/invitation', 'POST', { id, token }, true),
    migrate: () => request<{ migrated: boolean; recovery: Record<string, string> }>('/api/trips/migrate', 'POST', {}),
    export: () => request<{ trips: Trip[]; logs: PaddleLog[]; recovery: Record<string, string> }>('/api/trips/export'),
    uploadPhoto: (logId: string, id: string, data: string, caption: string, queueAgeMs?: number) => request<{ log: PaddleLog }>(`/api/paddle-logs/${logId}/photos/${id}`, 'POST', { data, caption }, false, queueAgeMs),
    removePhoto: (logId: string, id: string) => request<{ removed: boolean }>(`/api/paddle-logs/${logId}/photos/${id}`, 'DELETE'),
    async photo(logId: string, id: string) {
      const response = await fetcher(new URL(`/api/paddle-logs/${logId}/photos/${id}`, baseUrl), { headers: { authorization: `Bearer ${await getToken()}` }, cache: 'no-store' });
      if (!response.ok) throw new TripApiError(response.status, 'photo_unavailable', 'Photo unavailable.');
      return response.blob();
    },
  };
}
export type TripsClient = ReturnType<typeof createTripsClient>;
