import { snapshotFreshnessMetadata, staleSnapshotReadiness, type ExploreCatalogResponse, type RiverDetailApiResult, type RiverDetailResponse,
  type RiverGroupResponse, type RiverSummaryApiItem, type RiverSummaryResponse, type SnapshotResponseMetadata,
  type WeekendSummaryApiItem, type WeekendSummaryResponse, type DataFreshness } from '@paddletoday/api-contract';

const staleMessage = 'Cached conditions need a fresh update. Verify current sources before driving or launching.';
const offlineMessage = 'You are offline. Showing saved conditions; reconnect to check current conditions before driving or launching.';
function formatAge(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return minutes % 60 ? `${hours}h ${minutes % 60}m` : `${hours}h`;
}
function currentFreshness(value: DataFreshness, observedAt: string | null | undefined, now: number): DataFreshness {
  const timestamp = observedAt ? Date.parse(observedAt) : NaN;
  if (!Number.isFinite(timestamp) || value.state === 'unavailable') return value;
  const ageMinutes = Math.max(0, Math.round((now - timestamp) / 60000));
  // Replace only the server's age phrase, preserving source-specific cautions.
  const detail = value.detail.replace(/\d+(?:d(?: \d+h)?|h(?: \d+m)?|m) old\b/, `${formatAge(ageMinutes)} old`);
  return ageMinutes === value.ageMinutes && detail === value.detail ? value : { ...value, ageMinutes, detail };
}
function currentDetail(item: RiverDetailApiResult, now: number): RiverDetailApiResult {
  const gauge = currentFreshness(item.liveData.gauge, item.gauge?.observedAt, now);
  const weather = currentFreshness(item.liveData.weather, item.weather?.observedAt, now);
  let summary = item.liveData.summary;
  if (gauge.ageMinutes !== null) summary = summary.replace(/(gauge reading is )\d+(?:d(?: \d+h)?|h(?: \d+m)?|m) old\b/, (_match, prefix: string) => `${prefix}${formatAge(gauge.ageMinutes!)} old`);
  if (weather.ageMinutes !== null) summary = summary.replace(/(weather read is )\d+(?:d(?: \d+h)?|h(?: \d+m)?|m) old\b/, (_match, prefix: string) => `${prefix}${formatAge(weather.ageMinutes!)} old`);
  return gauge === item.liveData.gauge && weather === item.liveData.weather && summary === item.liveData.summary
    ? item : { ...item, liveData: { ...item.liveData, gauge, weather, summary } };
}
type Snapshot = SnapshotResponseMetadata & { generatedAt: string };
function expired(snapshot: Snapshot, now: number) {
  return snapshot.snapshotStatus === 'stale' || snapshotFreshnessMetadata(snapshot, now)?.snapshotStatus !== 'fresh';
}
function metadata(snapshot: Snapshot, now: number) {
  return { snapshotStatus: 'stale' as const, snapshotAgeSeconds: snapshotFreshnessMetadata(snapshot, now)?.snapshotAgeSeconds };
}
function unavailableReadiness<T extends RiverSummaryApiItem['readiness']>(readiness: T, online: boolean): T {
  if (online) return staleSnapshotReadiness(readiness);
  if (readiness.status !== 'ready') return readiness;
  return { ...readiness, status: 'withheld', label: 'Withheld',
    reason: `${readiness.reason} You are offline, so current conditions cannot be confirmed. Reconnect to refresh this route.` };
}
function markSummary<T extends RiverSummaryApiItem | WeekendSummaryApiItem>(item: T, online: boolean): T {
  const message = online ? staleMessage : offlineMessage;
  return { ...item,
    ...('readiness' in item ? { readiness: unavailableReadiness(item.readiness, online) } : {}),
    liveData: { ...item.liveData, overall: !online || item.liveData.overall === 'offline' ? 'offline' : 'degraded', summary: message,
      gaugeState: item.liveData.gaugeState === 'unavailable' ? 'unavailable' : 'stale',
      weatherState: item.liveData.weatherState === 'unavailable' ? 'unavailable' : 'stale',
      gaugeDetail: message, weatherDetail: message } };
}
function markDetail(item: RiverDetailApiResult, online: boolean): RiverDetailApiResult {
  const message = online ? staleMessage : offlineMessage;
  return { ...item, readiness: unavailableReadiness(item.readiness, online),
    liveData: { ...item.liveData, overall: !online || item.liveData.overall === 'offline' ? 'offline' : 'degraded', summary: message,
      gauge: { ...item.liveData.gauge, state: item.liveData.gauge.state === 'unavailable' ? 'unavailable' : 'stale', detail: `${item.liveData.gauge.detail} ${message}` },
      weather: { ...item.liveData.weather, state: item.liveData.weather.state === 'unavailable' ? 'unavailable' : 'stale', detail: `${item.liveData.weather.detail} ${message}` } } };
}

// These are presentation copies. Never mutate or persist the query's original
// response, so a successful refresh can restore the server's current decision.
export function currentSummarySnapshot(response: RiverSummaryResponse, now: number, online = true): RiverSummaryResponse {
  if (!response.rivers.length) return response;
  const allExpired = !online || expired(response, now);
  let anyExpired = allExpired;
  const rivers = response.rivers.map(item => {
    const stale = allExpired || expired(item, now);
    anyExpired ||= stale;
    const current = stale ? markSummary(item, online) : item;
    if (current.river.scoreEligibility !== 'planning' || current.readiness.status === 'withheld') return current;
    return { ...current, readiness: { ...current.readiness, status: 'withheld' as const, label: 'Withheld' as const,
      reason: current.readiness.status === 'ready' ? 'This route is a planning reference. A current paddling call is unavailable.' : current.readiness.reason } };
  });
  return rivers.some((item, index) => item !== response.rivers[index])
    ? { ...response, ...(anyExpired ? metadata(response, now) : {}), rivers } : response;
}

// Catalog availability does not imply fresh conditions. A catalog can arrive
// without a score snapshot and must still expose its planning routes.
export function currentExploreSnapshot(response: ExploreCatalogResponse, now: number, online = true): ExploreCatalogResponse {
  const projected = currentSummarySnapshot({
    ...response,
    generatedAt: response.generatedAt ?? '',
    snapshotStatus: response.snapshotStatus === 'stale' ? 'stale' : undefined,
  }, now, online);
  return {
    ...response,
    snapshotStatus: response.generatedAt && projected.snapshotStatus === 'stale' ? 'stale' : response.snapshotStatus,
    rivers: projected.rivers.map((item, index) => {
      const original = response.rivers[index];
      if (original.river.scoreEligibility !== 'planning') return item;
      // Planning records have no score timestamp to expire. Preserve their
      // explanation while keeping them out of current-condition calls.
      return { ...(online ? original : item), readiness: { ...original.readiness, status: 'withheld', label: 'Withheld' } };
    }),
  };
}
export function currentWeekendSnapshot(response: WeekendSummaryResponse, now: number, online = true): WeekendSummaryResponse {
  if (!response.rivers.length) return response;
  const allExpired = !online || expired(response, now);
  const rivers = response.rivers.map(item => allExpired || expired(item, now) ? markSummary(item, online) : item);
  return allExpired || rivers.some((item, index) => item !== response.rivers[index]) ? { ...response, ...metadata(response, now), rivers } : response;
}
export function currentDetailSnapshot(response: RiverDetailResponse, now: number, online = true): RiverDetailResponse {
  const item = currentDetail(response.result, now);
  if (online && !expired(response, now) && !expired(item, now)) return item === response.result ? response : { ...response, result: item };
  return { ...response, ...metadata(response, now), result: markDetail(item, online) };
}
export function currentGroupSnapshot(response: RiverGroupResponse, now: number, online = true): RiverGroupResponse {
  if (!response.result.routes.length) return response;
  const allExpired = !online || expired(response, now);
  let anyExpired = allExpired;
  const routes = response.result.routes.map(item => {
    const current = currentDetail(item, now);
    const stale = allExpired || expired(item, now);
    anyExpired ||= stale;
    return stale ? markDetail(current, online) : current;
  });
  return allExpired || routes.some((item, index) => item !== response.result.routes[index])
    ? { ...response, ...(anyExpired ? metadata(response, now) : {}), result: { ...response.result, routes } } : response;
}
