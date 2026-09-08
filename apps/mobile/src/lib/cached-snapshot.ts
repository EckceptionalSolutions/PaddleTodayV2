import { snapshotFreshnessMetadata, staleSnapshotReadiness, type RiverDetailApiResult, type RiverDetailResponse,
  type RiverGroupResponse, type RiverSummaryApiItem, type RiverSummaryResponse, type SnapshotResponseMetadata,
  type WeekendSummaryApiItem, type WeekendSummaryResponse } from '@paddletoday/api-contract';

const staleMessage = 'Cached conditions need a fresh update. Verify current sources before driving or launching.';
type Snapshot = SnapshotResponseMetadata & { generatedAt: string };
function expired(snapshot: Snapshot, now: number) {
  return snapshot.snapshotStatus === 'stale' || snapshotFreshnessMetadata(snapshot, now)?.snapshotStatus !== 'fresh';
}
function metadata(snapshot: Snapshot, now: number) {
  return { snapshotStatus: 'stale' as const, snapshotAgeSeconds: snapshotFreshnessMetadata(snapshot, now)?.snapshotAgeSeconds };
}
function markSummary<T extends RiverSummaryApiItem | WeekendSummaryApiItem>(item: T): T {
  return { ...item,
    ...('readiness' in item ? { readiness: staleSnapshotReadiness(item.readiness) } : {}),
    liveData: { ...item.liveData, overall: item.liveData.overall === 'offline' ? 'offline' : 'degraded', summary: staleMessage,
      gaugeState: item.liveData.gaugeState === 'unavailable' ? 'unavailable' : 'stale',
      weatherState: item.liveData.weatherState === 'unavailable' ? 'unavailable' : 'stale',
      gaugeDetail: staleMessage, weatherDetail: staleMessage } };
}
function markDetail(item: RiverDetailApiResult): RiverDetailApiResult {
  return { ...item, readiness: staleSnapshotReadiness(item.readiness),
    liveData: { ...item.liveData, overall: item.liveData.overall === 'offline' ? 'offline' : 'degraded', summary: staleMessage,
      gauge: { ...item.liveData.gauge, state: item.liveData.gauge.state === 'unavailable' ? 'unavailable' : 'stale', detail: staleMessage },
      weather: { ...item.liveData.weather, state: item.liveData.weather.state === 'unavailable' ? 'unavailable' : 'stale', detail: staleMessage } } };
}

// These are presentation copies. Never mutate or persist the query's original
// response, so a successful refresh can restore the server's current decision.
export function currentSummarySnapshot(response: RiverSummaryResponse, now: number): RiverSummaryResponse {
  if (!response.rivers.length) return response;
  const allExpired = expired(response, now);
  let anyExpired = allExpired;
  const rivers = response.rivers.map(item => {
    const stale = allExpired || expired(item, now);
    anyExpired ||= stale;
    const current = stale ? markSummary(item) : item;
    if (current.river.scoreEligibility !== 'planning' || current.readiness.status === 'withheld') return current;
    return { ...current, readiness: { ...current.readiness, status: 'withheld' as const, label: 'Withheld' as const,
      reason: current.readiness.status === 'ready' ? 'This route is a planning reference. A current paddling call is unavailable.' : current.readiness.reason } };
  });
  return rivers.some((item, index) => item !== response.rivers[index])
    ? { ...response, ...(anyExpired ? metadata(response, now) : {}), rivers } : response;
}
export function currentWeekendSnapshot(response: WeekendSummaryResponse, now: number): WeekendSummaryResponse {
  if (!response.rivers.length) return response;
  const allExpired = expired(response, now);
  const rivers = response.rivers.map(item => allExpired || expired(item, now) ? markSummary(item) : item);
  return allExpired || rivers.some((item, index) => item !== response.rivers[index]) ? { ...response, ...metadata(response, now), rivers } : response;
}
export function currentDetailSnapshot(response: RiverDetailResponse, now: number): RiverDetailResponse {
  if (!expired(response, now) && !expired(response.result, now)) return response;
  return { ...response, ...metadata(response, now), result: markDetail(response.result) };
}
export function currentGroupSnapshot(response: RiverGroupResponse, now: number): RiverGroupResponse {
  if (!response.result.routes.length) return response;
  const allExpired = expired(response, now);
  const routes = response.result.routes.map(item => allExpired || expired(item, now) ? markDetail(item) : item);
  return allExpired || routes.some((item, index) => item !== response.result.routes[index])
    ? { ...response, ...metadata(response, now), result: { ...response.result, routes } } : response;
}
