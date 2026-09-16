import type { RiverAccessPoint, RiverDetailApiResult, RiverGeometryResponse } from '@paddletoday/api-contract';
import { parseTripDraftRecord, type TripDraft, type TripDraftTarget } from './trip-drafts';
import { isRecord, parseJson } from './storage';
import { buildOfflineTripSegment, clipOfflineSegmentGeometry, type OfflineTripSegment } from './offline-trip-segment';

export interface OfflineStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  getAllKeys(): Promise<readonly string[]>;
}
export type OfflineAccess = RiverAccessPoint & { id: string; latitude: number; longitude: number; note?: string };
export interface OfflineTrip {
  version: 1 | 2;
  target: TripDraftTarget;
  savedAt: string;
  referenceGeneratedAt: string | null;
  name: string;
  reach: string;
  putIn: OfflineAccess;
  takeOut: OfflineAccess;
  draft: TripDraft;
  // Only reference facts are retained. Scores, forecasts and gauge readings never enter this store.
  facts: Array<{ label: string; text: string }>;
  geometry: { lines: number[][][]; source: string } | null;
  segment?: OfflineTripSegment;
  missing: string[];
}
const headPrefix = 'paddletoday:offline-trip:v1:';
const dataPrefix = 'paddletoday:offline-trip-data:v1:';
const queues = new WeakMap<OfflineStorage, Map<string, Promise<unknown>>>();
export const offlineTripId = (target: TripDraftTarget) => JSON.stringify([target.routeSlug, target.putInId, target.takeOutId]);
const headKey = (target: TripDraftTarget) => headPrefix + offlineTripId(target);
const revisionPrefix = (target: TripDraftTarget) => dataPrefix + offlineTripId(target) + ':';
function queued<T>(storage: OfflineStorage, target: TripDraftTarget, action: () => Promise<T>): Promise<T> {
  let queue = queues.get(storage);
  if (!queue) { queue = new Map(); queues.set(storage, queue); }
  const key = headKey(target);
  const result = (queue.get(key) ?? Promise.resolve()).catch(() => {}).then(action);
  queue.set(key, result);
  void result.finally(() => { if (queue.get(key) === result) queue.delete(key); }).catch(() => {});
  return result;
}
export function mappedAccess(point: RiverAccessPoint | undefined): point is OfflineAccess {
  return Boolean(point?.id && point.name && typeof point.latitude === 'number' && Number.isFinite(point.latitude)
    && Math.abs(point.latitude) <= 90 && typeof point.longitude === 'number' && Number.isFinite(point.longitude) && Math.abs(point.longitude) <= 180);
}
function validLines(value: unknown): value is number[][][] {
  return Array.isArray(value) && value.length > 0 && value.length <= 500 && value.every(line => Array.isArray(line) && line.length >= 2
    && line.every(point => Array.isArray(point) && point.length === 2 && point.every(n => typeof n === 'number' && Number.isFinite(n))
      && Math.abs(point[0]) <= 180 && Math.abs(point[1]) <= 90)) && value.reduce((sum, line) => sum + line.length, 0) <= 12_000;
}
export function packetGeometry(response: RiverGeometryResponse, slug: string): NonNullable<OfflineTrip['geometry']> {
  if (response.routeId !== slug || typeof response.source !== 'string') throw new Error('Unexpected route geometry');
  const geometry = response.geometry;
  const lines = geometry?.type === 'LineString' ? [geometry.coordinates] : geometry?.type === 'MultiLineString' ? geometry.coordinates : null;
  if (!validLines(lines)) throw new Error('Route geometry is missing, invalid or too large');
  return { lines, source: response.source };
}
function parsePacket(raw: string | null): OfflineTrip | null {
  const p = parseJson(raw);
  const validSegment = (value: unknown): value is OfflineTripSegment => {
    if (!isRecord(value) || !Array.isArray(value.missing) || !value.missing.every(m => typeof m === 'string')) return false;
    const duration = value.estimatedPaddleMinutes;
    const validDuration = duration === null || isRecord(duration)
      && typeof duration.min === 'number' && Number.isInteger(duration.min)
      && typeof duration.max === 'number' && Number.isInteger(duration.max)
      && duration.min > 0 && duration.max >= duration.min;
    const distance = value.distanceMiles;
    const validDistance = distance === null || typeof distance === 'number' && Number.isFinite(distance) && distance > 0;
    const segmentGeometry = value.geometry;
    const validGeometry = segmentGeometry === null || isRecord(segmentGeometry) && validLines(segmentGeometry.lines);
    return validDistance && validDuration && validGeometry;
  };
  const draftCompatible = isRecord(p) ? parseTripDraftRecord(JSON.stringify({ ...p, version: 1 })) : null;
  if (!isRecord(p) || (p.version !== 1 && p.version !== 2) || !draftCompatible
    || typeof p.name !== 'string' || typeof p.reach !== 'string'
    || !(p.referenceGeneratedAt === null || typeof p.referenceGeneratedAt === 'string' && Number.isFinite(Date.parse(p.referenceGeneratedAt)))
    || !isRecord(p.putIn) || !mappedAccess(p.putIn as unknown as RiverAccessPoint)
    || !isRecord(p.takeOut) || !mappedAccess(p.takeOut as unknown as RiverAccessPoint)
    || !Array.isArray(p.facts) || !p.facts.every(f => isRecord(f) && typeof f.label === 'string' && typeof f.text === 'string')
    || !Array.isArray(p.missing) || !p.missing.every(m => typeof m === 'string')
    || !(p.geometry === null || isRecord(p.geometry) && typeof p.geometry.source === 'string' && validLines(p.geometry.lines))
    || (p.segment !== undefined && !validSegment(p.segment))) return null;
  const packet = p as unknown as OfflineTrip;
  if (packet.target.putInId !== packet.putIn.id || packet.target.takeOutId !== packet.takeOut.id
    || packet.putIn.id === packet.takeOut.id || (!packet.geometry && !packet.missing.includes('Route geometry'))) return null;
  return packet;
}
async function read(storage: OfflineStorage, target: TripDraftTarget) {
  const raw = await storage.getItem(headKey(target));
  if (raw === null) return null;
  const head = parseJson(raw);
  if (!isRecord(head) || typeof head.revision !== 'string' || !head.revision.startsWith(revisionPrefix(target))) throw new Error('Offline trip could not be read. Nothing was removed.');
  const packet = parsePacket(await storage.getItem(head.revision));
  if (!packet || offlineTripId(packet.target) !== offlineTripId(target)) throw new Error('Offline trip could not be read. Nothing was removed.');
  return packet;
}
export function loadOfflineTrip(storage: OfflineStorage, target: TripDraftTarget) {
  return queued(storage, target, () => read(storage, target));
}
export async function listOfflineTrips(storage: OfflineStorage) {
  const keys = (await storage.getAllKeys()).filter(key => key.startsWith(headPrefix));
  const records: OfflineTrip[] = [];
  let unreadable = 0;
  await Promise.all(keys.map(async key => {
    try {
      const parts = JSON.parse(key.slice(headPrefix.length));
      if (!Array.isArray(parts) || parts.length !== 3) throw new Error('Invalid target');
      const packet = await loadOfflineTrip(storage, { routeSlug: parts[0], putInId: parts[1], takeOutId: parts[2] });
      if (packet) records.push(packet);
    } catch { unreadable++; }
  }));
  return { records: records.sort((a, b) => b.savedAt.localeCompare(a.savedAt)), unreadable };
}
export function offlineTripBytes(packet: OfflineTrip) {
  return encodeURIComponent(JSON.stringify(packet)).replace(/%[A-F\d]{2}/g, 'x').length;
}
export function removeOfflineTrip(storage: OfflineStorage, target: TripDraftTarget) {
  return queued(storage, target, async () => {
    // Remove the visible pointer first; staged revisions can never appear as trips.
    await storage.removeItem(headKey(target));
    const keys = (await storage.getAllKeys()).filter(key => key.startsWith(revisionPrefix(target)));
    await Promise.all(keys.map(key => storage.removeItem(key)));
  });
}
async function commit(storage: OfflineStorage, packet: OfflineTrip, signal: AbortSignal) {
  const target = packet.target;
  if (!parsePacket(JSON.stringify(packet)) || offlineTripBytes(packet) > 750_000) throw new Error('Offline trip could not be saved. Previous trip is unchanged.');
  const revision = revisionPrefix(target) + Date.now() + '-' + Math.random().toString(36).slice(2);
  // A crash before the pointer switch leaves the previous trip visible.
  const serialized = JSON.stringify(packet);
  await storage.setItem(revision, serialized);
  if (await storage.getItem(revision) !== serialized) throw new Error('Offline trip could not be verified. Previous trip is unchanged.');
  if (signal.aborted) throw new Error('Download cancelled. Previous offline trip is unchanged.');
  await storage.setItem(headKey(target), JSON.stringify({ revision }));
  try {
    const obsolete = (await storage.getAllKeys()).filter(key => key.startsWith(revisionPrefix(target)) && key !== revision);
    await Promise.all(obsolete.map(key => storage.removeItem(key)));
  } catch { /* Unreferenced revisions are ignored and retried on removal/update. */ }
  return packet;
}
export function retryOfflineGeometry(storage: OfflineStorage, target: TripDraftTarget,
  fetchGeometry: (slug: string, signal: AbortSignal) => Promise<RiverGeometryResponse>, signal: AbortSignal) {
  return queued(storage, target, async () => {
    const previous = await read(storage, target);
    if (!previous) throw new Error('Offline trip is no longer saved. Prepare it again from the route.');
    const geometry = packetGeometry(await fetchGeometry(target.routeSlug, signal), target.routeSlug);
    if (signal.aborted) throw new Error('Download cancelled. Previous offline trip is unchanged.');
    const segment = previous.segment
      ? { ...previous.segment, geometry: clipOfflineSegmentGeometry(geometry.lines, previous.putIn, previous.takeOut), missing: previous.segment.missing.filter(m => m !== 'Selected segment geometry') }
      : undefined;
    if (segment && !segment.geometry && !segment.missing.includes('Selected segment geometry')) segment.missing.push('Selected segment geometry');
    return commit(storage, { ...previous, geometry, segment, savedAt: new Date().toISOString(), missing: previous.missing.filter(m => m !== 'Route geometry') }, signal);
  });
}
export function downloadOfflineTrip(storage: OfflineStorage, input: {
  detail: RiverDetailApiResult; putIn: RiverAccessPoint | undefined; takeOut: RiverAccessPoint | undefined; draft: TripDraft;
}, fetchGeometry: (slug: string, signal: AbortSignal) => Promise<RiverGeometryResponse>, signal: AbortSignal) {
  // Snapshot the selected segment and personal edits at the explicit download action.
  const { detail, putIn, takeOut } = input;
  if (!mappedAccess(putIn) || !mappedAccess(takeOut) || putIn.id === takeOut.id) return Promise.reject(new Error('Choose two different mapped access points first.'));
  const river = detail.river;
  const target: TripDraftTarget = { routeSlug: river.slug, putInId: putIn.id, takeOutId: takeOut.id,
    routeName: river.name, putInName: putIn.name, takeOutName: takeOut.name };
  const logistics = river.logistics;
  const facts = [
    { label: 'Full route distance', text: river.distanceLabel }, { label: 'Full route paddle time', text: river.estimatedPaddleTime },
    { label: 'Shuttle', text: logistics?.shuttle ?? '' }, { label: 'Permits', text: logistics?.permits ?? '' },
    { label: 'Camping', text: logistics?.camping ?? '' }, { label: 'Route logistics', text: logistics?.summary ?? '' },
    { label: 'Access caveats', text: logistics?.accessCaveats?.join('\n') ?? '' },
    { label: 'Watch for', text: logistics?.watchFor?.join('\n') ?? '' },
    { label: 'Safety notes', text: river.safetyProfile?.safetyNotes.join('\n') ?? '' },
  ].filter(f => f.text);
  const access = (point: OfflineAccess): OfflineAccess => ({ id: point.id, name: point.name, latitude: point.latitude, longitude: point.longitude,
    note: river.accessPoints?.find(p => p.id === point.id)?.note });
  const packet: OfflineTrip = { version: 2, target, savedAt: new Date().toISOString(),
    referenceGeneratedAt: Number.isFinite(Date.parse(detail.generatedAt)) ? detail.generatedAt : null,
    name: river.name, reach: river.reach, putIn: access(putIn), takeOut: access(takeOut), draft: { ...input.draft }, facts,
    geometry: null, segment: undefined, missing: logistics?.shuttle ? [] : ['Shuttle logistics'] };
  return queued(storage, target, async () => {
    if (signal.aborted) throw new Error('Download cancelled. Previous offline trip is unchanged.');
    const previous = await read(storage, target); // Failed reads must never authorize replacing a saved trip.
    let geometryResponse: RiverGeometryResponse | null = null;
    try {
      geometryResponse = await fetchGeometry(river.slug, signal);
      packet.geometry = packetGeometry(geometryResponse, river.slug);
    }
    catch { packet.missing.push('Route geometry'); }
    packet.segment = buildOfflineTripSegment({ detail, putIn, takeOut, geometryResponse });
    if (signal.aborted) throw new Error('Download cancelled. Previous offline trip is unchanged.');
    if (previous && previous.missing.length === 0 && packet.missing.length > 0) throw new Error('Update incomplete. Your previous complete offline trip is still saved. Retry with a connection.');
    return commit(storage, packet, signal);
  });
}
