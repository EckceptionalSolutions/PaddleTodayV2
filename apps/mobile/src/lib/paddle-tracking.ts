import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';
import type { PaddleTrack, TripRoute } from '@paddletoday/api-contract';

export const PADDLE_TRACK_TASK = 'paddletoday-paddle-track-v1';
export const PADDLE_TRACK_STORAGE_KEY = 'paddletoday:paddle-track:v1';
const MAX_TRACKED_POINTS = 6000;
const MAX_TRACK_SEGMENTS = 100;
const MAX_ENCODED_PATH_LENGTH = 48000;

export interface RecordedTrackPoint { latitude: number; longitude: number; timestamp: number }
export interface PaddleTrackingSession {
  status: 'recording' | 'paused' | 'finished';
  route: TripRoute;
  ownerUid: string;
  sourceTripId: string | null;
  logId: string;
  startedAt: number;
  endedAt: number | null;
  pausedAt: number | null;
  interruptedAt?: number | null;
  lastRecordedAt?: number;
  pausedDurationMs: number;
  distanceMeters: number;
  segments: RecordedTrackPoint[][];
  lastPoint: RecordedTrackPoint | null;
  track?: PaddleTrack;
}

let sessionWrites = Promise.resolve();
// Android can retain task registration after killing its recording service.
// Only a recording started in this runtime can be treated as still running.
let activeRecordingId: string | null = null;

export function decodePaddlePolyline(value: string) {
  const result: Array<{ latitude: number; longitude: number }> = [];
  let index = 0, latitude = 0, longitude = 0;
  while (index < value.length) {
    let shift = 0, accumulated = 0, byte: number;
    do {
      if (index >= value.length) return [];
      byte = value.charCodeAt(index++) - 63;
      if (byte < 0 || byte > 63 || shift > 30) return [];
      accumulated |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    latitude += (accumulated & 1) ? ~(accumulated >> 1) : (accumulated >> 1);

    shift = 0; accumulated = 0;
    do {
      if (index >= value.length) return [];
      byte = value.charCodeAt(index++) - 63;
      if (byte < 0 || byte > 63 || shift > 30) return [];
      accumulated |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    longitude += (accumulated & 1) ? ~(accumulated >> 1) : (accumulated >> 1);
    result.push({ latitude: latitude / 1e5, longitude: longitude / 1e5 });
  }
  return result;
}

export function decodePaddleTrackPolylines(track: PaddleTrack) {
  return track.polylines.map(decodePaddlePolyline).filter(segment => segment.length > 0);
}

export async function readPaddleTrackingSession() {
  await sessionWrites.catch(() => {});
  try {
    const raw = await AsyncStorage.getItem(PADDLE_TRACK_STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as PaddleTrackingSession;
    if (!value || !['recording', 'paused', 'finished'].includes(value.status) || !Array.isArray(value.segments)) return null;
    return value;
  } catch { return null; }
}

export async function recoverPaddleTrackingSession() {
  const session = await readPaddleTrackingSession();
  if (!session || session.status !== 'recording') return session;
  let taskStarted = false;
  try { taskStarted = await Location.hasStartedLocationUpdatesAsync(PADDLE_TRACK_TASK); } catch { /* Treat unavailable state as interrupted. */ }
  if (taskStarted && activeRecordingId === session.logId) return session;
  await stopLocationUpdates();
  const now = Date.now();
  return mutateSession(latest => latest?.status === 'recording'
    ? { ...latest, status: 'paused', pausedAt: Math.max(latest.startedAt, Math.min(now, latest.lastRecordedAt ?? latest.lastPoint?.timestamp ?? latest.startedAt)), interruptedAt: now, lastPoint: null }
    : latest);
}

/** Save live elapsed time even when stationary GPS points are filtered out. */
export async function checkpointPaddleTrackingSession() {
  if (!activeRecordingId) return readPaddleTrackingSession();
  return mutateSession(session => session?.status === 'recording' && session.logId === activeRecordingId
    ? { ...session, lastRecordedAt: Date.now() } : session);
}

export async function startPaddleTracking(route: TripRoute, sourceTripId: string | null, ownerUid: string, existingLogId?: string) {
  if (Platform.OS === 'web') throw new Error('GPS recording is available in the mobile app.');
  if (!await TaskManager.isAvailableAsync()) throw new Error('GPS recording needs an installed PaddleToday app build.');
  const previous = await readPaddleTrackingSession();
  if (previous) throw new Error(previous.ownerUid === ownerUid
    ? 'Finish or save the current GPS recording before starting another.'
    : 'A GPS recording is saved on this device for another account. Switch to that account to finish or discard it.');
  await ensureRecordingLocation();

  const initial = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
  const firstPoint = toRecordedPoint(initial);
  if (!firstPoint) throw new Error('Could not get an accurate location. Move to an open area and try again.');
  const now = Date.now();
  const session: PaddleTrackingSession = {
    status: 'recording', route, ownerUid, sourceTripId, logId: existingLogId || Crypto.randomUUID(), startedAt: now, endedAt: null, pausedAt: null, interruptedAt: null,
    lastRecordedAt: now, pausedDurationMs: 0, distanceMeters: 0, segments: [[firstPoint]], lastPoint: firstPoint,
  };
  await writeSession(session);
  try { await Location.startLocationUpdatesAsync(PADDLE_TRACK_TASK, locationOptions()); activeRecordingId = session.logId; }
  catch (error) { await removeStoredSession(); throw error; }
  return session;
}

async function ensureRecordingLocation() {
  const currentPermission = await Location.getForegroundPermissionsAsync();
  let permission = currentPermission.granted ? currentPermission : await Location.requestForegroundPermissionsAsync();
  if (Platform.OS === 'android' && permission.granted && permission.android?.accuracy !== 'fine') {
    permission = await Location.requestForegroundPermissionsAsync();
  }
  if (!permission.granted) throw new Error('Allow location while using PaddleToday to record a paddle.');
  if (Platform.OS === 'android' && permission.android?.accuracy !== 'fine') throw new Error('Choose Precise location to record a reliable paddle route.');
  if (Platform.OS === 'ios') {
    const currentBackgroundPermission = await Location.getBackgroundPermissionsAsync();
    const backgroundPermission = currentBackgroundPermission.granted ? currentBackgroundPermission : await Location.requestBackgroundPermissionsAsync();
    if (!backgroundPermission.granted) throw new Error('Allow location access in the background to keep recording while your screen is locked.');
  }
  if (!await Location.hasServicesEnabledAsync()) throw new Error('Turn on device location to record a paddle.');

}

export async function pausePaddleTracking() {
  await stopLocationUpdates();
  return mutateSession(session => session && session.status === 'recording'
    ? { ...session, status: 'paused', pausedAt: Date.now(), lastPoint: null }
    : session);
}

export async function resumePaddleTracking() {
  const session = await readPaddleTrackingSession();
  if (!session || session.status !== 'paused') throw new Error('There is no paused paddle recording to resume.');
  if (session.segments.length >= MAX_TRACK_SEGMENTS) throw new Error('This recording has reached its pause limit. Finish and save it before starting another paddle.');
  await ensureRecordingLocation();
  const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
  const point = toRecordedPoint(current);
  if (!point) throw new Error('Could not get an accurate location. Move to an open area and try again.');
  const now = Date.now();
  const resumed = await mutateSession(latest => {
    if (!latest || latest.status !== 'paused') throw new Error('This paddle recording changed. Reopen it and try again.');
    return { ...latest, status: 'recording', pausedDurationMs: latest.pausedDurationMs + Math.max(0, now - (latest.pausedAt ?? now)), pausedAt: null,
      interruptedAt: null, lastRecordedAt: now, segments: [...latest.segments, [point]], lastPoint: point };
  });
  try { await Location.startLocationUpdatesAsync(PADDLE_TRACK_TASK, locationOptions()); activeRecordingId = session.logId; }
  catch (error) {
    await mutateSession(latest => latest ? { ...latest, status: 'paused', pausedAt: Date.now(), lastPoint: null } : latest);
    throw error;
  }
  return resumed;
}

export async function finishPaddleTracking() {
  await stopLocationUpdates();
  return mutateSession(session => {
    if (!session || session.status === 'finished') return session;
    const now = Date.now();
    const pausedDurationMs = session.pausedDurationMs + (session.pausedAt === null ? 0 : Math.max(0, now - session.pausedAt));
    const path = encodeSegments(session.segments);
    const track: PaddleTrack = {
      startedAt: new Date(session.startedAt).toISOString(), endedAt: new Date(now).toISOString(),
      elapsedSeconds: Math.max(0, Math.round((now - session.startedAt - pausedDurationMs) / 1000)),
      distanceMeters: Math.round(session.distanceMeters), polylines: path,
    };
    return { ...session, status: 'finished', endedAt: now, pausedAt: null, pausedDurationMs, lastPoint: null, track };
  });
}

export async function clearPaddleTrackingSession() {
  await stopLocationUpdates();
  await removeStoredSession();
}

function locationOptions(): Location.LocationTaskOptions {
  return {
    accuracy: Location.Accuracy.High,
    timeInterval: 10000,
    distanceInterval: 8,
    activityType: Location.ActivityType.Fitness,
    pausesUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: true,
    foregroundService: Platform.OS === 'android' ? {
      notificationTitle: 'PaddleToday is recording',
      notificationBody: 'Your private paddle track is recording. Open the app to pause or finish.',
      notificationColor: '#176B57',
      killServiceOnDestroy: false,
    } : undefined,
  };
}

async function stopLocationUpdates() {
  activeRecordingId = null;
  try {
    if (await Location.hasStartedLocationUpdatesAsync(PADDLE_TRACK_TASK)) await Location.stopLocationUpdatesAsync(PADDLE_TRACK_TASK);
  } catch { /* The active session remains available for recovery. */ }
}

function toRecordedPoint(location: Location.LocationObject): RecordedTrackPoint | null {
  const { latitude, longitude, accuracy } = location.coords;
  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180
    || (accuracy !== null && accuracy !== undefined && (!Number.isFinite(accuracy) || accuracy > 60))) return null;
  return { latitude, longitude, timestamp: Number.isFinite(location.timestamp) ? location.timestamp : Date.now() };
}

function appendLocations(session: PaddleTrackingSession, locations: Location.LocationObject[]) {
  for (const location of locations.sort((a, b) => a.timestamp - b.timestamp)) {
    const point = toRecordedPoint(location);
    if (!point) continue;
    session.lastRecordedAt = Math.max(session.lastRecordedAt ?? session.startedAt, point.timestamp);
    const previous = session.lastPoint;
    if (!previous || point.timestamp <= previous.timestamp) continue;
    const distance = distanceMeters(previous, point);
    const elapsedSeconds = (point.timestamp - previous.timestamp) / 1000;
    if (distance < 4 || elapsedSeconds <= 0 || distance / elapsedSeconds > 15) continue;
    session.distanceMeters += distance;
    const lastSegment = session.segments[session.segments.length - 1];
    if (lastSegment) lastSegment.push(point);
    else session.segments.push([point]);
    session.lastPoint = point;
    compactTrackPoints(session.segments);
  }
}

function compactTrackPoints(segments: RecordedTrackPoint[][]) {
  const count = (groups: RecordedTrackPoint[][]) => groups.reduce((sum, group) => sum + group.length, 0);
  if (count(segments) <= MAX_TRACKED_POINTS) return;
  let stride = 2;
  let compacted = segments;
  while (count(compacted) > MAX_TRACKED_POINTS) {
    compacted = compacted.map(segment => segment.filter((_, index) => index === 0 || index === segment.length - 1 || index % stride === 0));
    stride *= 2;
  }
  segments.splice(0, segments.length, ...compacted);
}

function distanceMeters(left: Pick<RecordedTrackPoint, 'latitude' | 'longitude'>, right: Pick<RecordedTrackPoint, 'latitude' | 'longitude'>) {
  const radians = (degrees: number) => degrees * Math.PI / 180;
  const dLat = radians(right.latitude - left.latitude), dLon = radians(right.longitude - left.longitude);
  const lat1 = radians(left.latitude), lat2 = radians(right.latitude);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function encodeSegments(segments: RecordedTrackPoint[][]) {
  let selected = segments.map(segment => segment.filter((_, index) => index === 0 || index === segment.length - 1 || index % Math.max(1, Math.ceil(segment.length / 1200)) === 0));
  let encoded = selected.map(encodePolyline).filter(Boolean);
  while (encoded.reduce((sum, value) => sum + value.length, 0) > MAX_ENCODED_PATH_LENGTH) {
    selected = selected.map(segment => segment.filter((_, index) => index === 0 || index === segment.length - 1 || index % 2 === 0));
    encoded = selected.map(encodePolyline).filter(Boolean);
    if (selected.every(segment => segment.length <= 2)) break;
  }
  return encoded.length ? encoded : [encodePolyline(segments[0] ?? [])];
}

function encodePolyline(points: RecordedTrackPoint[]) {
  let previousLatitude = 0, previousLongitude = 0, output = '';
  const append = (value: number) => {
    let encoded = value < 0 ? ~(value << 1) : value << 1;
    while (encoded >= 0x20) { output += String.fromCharCode((0x20 | (encoded & 0x1f)) + 63); encoded >>= 5; }
    output += String.fromCharCode(encoded + 63);
  };
  for (const point of points) {
    const latitude = Math.round(point.latitude * 1e5), longitude = Math.round(point.longitude * 1e5);
    append(latitude - previousLatitude); append(longitude - previousLongitude);
    previousLatitude = latitude; previousLongitude = longitude;
  }
  return output;
}

async function mutateSession(change: (session: PaddleTrackingSession | null) => PaddleTrackingSession | null) {
  const operation = sessionWrites.then(async () => {
    const session = await readStoredSession();
    const next = change(session);
    if (next) await AsyncStorage.setItem(PADDLE_TRACK_STORAGE_KEY, JSON.stringify(next));
    else await AsyncStorage.removeItem(PADDLE_TRACK_STORAGE_KEY);
    return next;
  });
  sessionWrites = operation.then(() => {}, () => {});
  return operation;
}

async function writeSession(session: PaddleTrackingSession) {
  await mutateSession(() => session);
}
async function removeStoredSession() { await mutateSession(() => null); }
async function readStoredSession(): Promise<PaddleTrackingSession | null> {
  try {
    const raw = await AsyncStorage.getItem(PADDLE_TRACK_STORAGE_KEY);
    return raw ? JSON.parse(raw) as PaddleTrackingSession : null;
  } catch { return null; }
}

TaskManager.defineTask<{ locations?: Location.LocationObject[] }>(PADDLE_TRACK_TASK, async ({ data, error }) => {
  if (error || !data?.locations?.length) return;
  await mutateSession(session => {
    if (!session || session.status !== 'recording') return session;
    appendLocations(session, data.locations!);
    return session;
  });
});
