/** Account-owned outings; deliberately separate from route bookmarks and legacy drafts. */
export interface TripRoute {
  slug: string;
  name: string;
  putInId: string;
  putInName: string;
  takeOutId: string;
  takeOutName: string;
}
export interface ItineraryStop { id: string; time: string; location: string; note: string }
/** Details shared with trip members, kept out of public view-only links. */
export interface TripPreparation {
  /** Local wall-clock value (YYYY-MM-DD HH:MM), interpreted using TripPlan.timeZone. */
  checkInLocal: string;
  groupSize: number | null;
  boatDescription: string;
  vehicleDescription: string;
  note: string;
}
export interface TripPlan {
  title: string;
  route: TripRoute;
  date: string;
  launch: string;
  expected: string;
  timeZone: string;
  itinerary: ItineraryStop[];
  preparation?: TripPreparation;
}
export interface TripMember { uid: string; name: string; role: 'owner' | 'participant'; rsvp: 'going' | 'maybe' | 'not-going' }
export interface ShuttleVehicle {
  id: string; driverUid: string; label: string; seats: number; passengers: string[];
  meeting: string; time: string; parkedAt: string; note: string;
}
export interface Trip extends TripPlan {
  id: string; ownerUid: string; revision: number; status: 'planned' | 'completed' | 'cancelled';
  members: TripMember[]; shuttle: ShuttleVehicle[];
  updatedAt: string; updatedBy: string;
  activity: { revision: number; at: string; actor: string; action: string }[];
}
export interface WaterObservation {
  gaugeId: string; gaugeName: string; value: string; unit: string;
  measuredAt: string; source: string; note: string;
}
/** Private GPS summary. The encoded path is only returned with the owner's paddle log. */
export interface PaddleTrack {
  startedAt: string;
  endedAt: string;
  elapsedSeconds: number;
  distanceMeters: number;
  polylines: string[];
}
export interface PaddleLogInput {
  sourceTripId: string | null; route: TripRoute; date: string; time: string; timeZone: string;
  notes: string; paddleAgain: 'yes' | 'no' | 'unsure' | ''; water: WaterObservation[]; track?: PaddleTrack;
}
export interface TripPhoto { id: string; caption: string; bytes: number; width: number; height: number }
export interface PaddleLog extends PaddleLogInput {
  id: string; revision: number; ownerUid: string; updatedAt: string; photos: TripPhoto[];
}
export type TripCommand =
  | { type: 'create'; plan: TripPlan }
  | { type: 'plan'; plan: TripPlan; baseline: TripPlan }
  | { type: 'status'; status: Trip['status'] }
  | { type: 'rsvp'; rsvp: TripMember['rsvp'] }
  | { type: 'name'; name: string }
  | { type: 'vehicle'; vehicle: ShuttleVehicle }
  | { type: 'remove-vehicle'; vehicleId: string }
  | { type: 'seat'; vehicleId: string | null }
  | { type: 'remove-member'; uid: string }
  | { type: 'transfer'; uid: string }
  | { type: 'delete' }
  | { type: 'link'; purpose: 'view' | 'invite'; token: string }
  | { type: 'revoke'; purpose: 'view' | 'invite' }
  | { type: 'join'; token: string };
export interface TripMutation { operationId: string; baseRevision: number; command: TripCommand }
export interface LogMutation { operationId: string; baseRevision: number; value: PaddleLogInput | null }
export interface TripList { trips: Trip[]; logs: PaddleLog[]; nextCursor: string | null }
export interface PublicTrip extends Omit<TripPlan, 'preparation'> { id: string; revision: number; status: Trip['status']; updatedAt: string }
export const TRIP_PHOTO_MAX_BYTES = 10 * 1024 * 1024;
export const TRIP_PHOTO_LIMIT = 10;
export const TRIP_MEMBER_LIMIT = 20;
export const isTripId = (v: unknown): v is string => typeof v === 'string' && /^[a-zA-Z0-9_-]{16,80}$/.test(v);
export const isTripToken = (v: unknown): v is string => typeof v === 'string' && /^[a-zA-Z0-9_-]{32,128}$/.test(v);
const rec = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const text = (v: unknown, max: number): v is string => typeof v === 'string' && v.length <= max;
export function validTripDate(v: unknown, optional = true): v is string {
  if (v === '' && optional) return true;
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const date = new Date(v + 'T12:00:00Z');
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === v;
}
export const validTripTime = (v: unknown): v is string => v === '' || (typeof v === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(v));
export function validTimeZone(v: unknown): v is string {
  if (!text(v, 100) || !v) return false;
  try { new Intl.DateTimeFormat('en', { timeZone: v }).format(); return true; } catch { return false; }
}
/** Reject missing/repeated wall-clock times at daylight-saving transitions. */
export function tripTimeIssue(date: string, time: string, timeZone: string): string | null {
  if (!time || !date || !validTripDate(date, false) || !validTripTime(time) || !validTimeZone(timeZone)) return null;
  const local = Date.parse(`${date}T${time}:00Z`);
  const format = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const asLocal = (epoch: number) => {
    const p = Object.fromEntries(format.formatToParts(epoch).map(p => [p.type, p.value]));
    return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:00Z`;
  };
  const offsets = new Set([-86400000, 0, 86400000].map(delta => Date.parse(asLocal(local + delta)) - (local + delta)));
  const candidates = [...offsets].filter(offset => asLocal(local - offset) === `${date}T${time}:00Z`);
  return candidates.length === 1 ? null : 'That local time is skipped or repeated by daylight saving time. Choose a time outside the clock change, or leave the optional time blank.';
}
export function isTripRoute(v: unknown): v is TripRoute {
  return rec(v) && text(v.slug, 160) && (!v.slug || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v.slug))
    && text(v.name, 240) && !!v.name.trim()
    && ['putInId', 'takeOutId'].every(k => text(v[k], 180))
    && ['putInName', 'takeOutName'].every(k => text(v[k], 240));
}
export function isTripPlan(v: unknown): v is TripPlan {
  return rec(v) && text(v.title, 160) && !!v.title.trim() && isTripRoute(v.route)
    && validTripDate(v.date) && validTripTime(v.launch) && validTripTime(v.expected) && validTimeZone(v.timeZone)
    && (!v.launch || !!v.date) && !tripTimeIssue(v.date, v.launch, v.timeZone) && !tripTimeIssue(v.date, v.expected, v.timeZone) && Array.isArray(v.itinerary) && v.itinerary.length <= 30
    && new Set(v.itinerary.map(s => s?.id)).size === v.itinerary.length
    && v.itinerary.every(s => rec(s) && isTripId(s.id) && validTripTime(s.time) && text(s.location, 300) && text(s.note, 2000))
    && (v.preparation === undefined || (rec(v.preparation)
      && (v.preparation.checkInLocal === undefined || v.preparation.checkInLocal === '' || (text(v.preparation.checkInLocal, 16)
        && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(v.preparation.checkInLocal)
        && validTripDate(v.preparation.checkInLocal.slice(0, 10), false) && validTripTime(v.preparation.checkInLocal.slice(11, 16))
        && !tripTimeIssue(v.preparation.checkInLocal.slice(0, 10), v.preparation.checkInLocal.slice(11, 16), v.timeZone)))
      && (v.preparation.groupSize === null || (Number.isInteger(v.preparation.groupSize) && Number(v.preparation.groupSize) >= 1 && Number(v.preparation.groupSize) <= 100))
      && text(v.preparation.boatDescription, 200) && text(v.preparation.vehicleDescription, 300) && text(v.preparation.note, 2000)));
}
export function isLogInput(v: unknown): v is PaddleLogInput {
  return rec(v) && (v.sourceTripId === null || isTripId(v.sourceTripId)) && isTripRoute(v.route)
    && validTripDate(v.date, false) && validTripTime(v.time) && validTimeZone(v.timeZone)
    && text(v.notes, 10000) && ['', 'yes', 'no', 'unsure'].includes(String(v.paddleAgain))
    && (v.track === undefined || (rec(v.track) && typeof v.track.startedAt === 'string' && Number.isFinite(Date.parse(v.track.startedAt))
      && typeof v.track.endedAt === 'string' && Number.isFinite(Date.parse(v.track.endedAt)) && Date.parse(v.track.endedAt) >= Date.parse(v.track.startedAt)
      && Number.isInteger(v.track.elapsedSeconds) && Number(v.track.elapsedSeconds) >= 0 && Number(v.track.elapsedSeconds) <= 172800
      && Number.isFinite(v.track.distanceMeters) && Number(v.track.distanceMeters) >= 0 && Number(v.track.distanceMeters) <= 1000000
      && Array.isArray(v.track.polylines) && v.track.polylines.length >= 1 && v.track.polylines.length <= 100
      && v.track.polylines.every(path => text(path, 48000) && /^[\x3f-\x7e]+$/.test(path))
      && v.track.polylines.reduce((sum, path) => sum + (typeof path === 'string' ? path.length : 48001), 0) <= 48000))
    && Array.isArray(v.water) && v.water.length <= 10 && v.water.every(w => rec(w)
      && ['gaugeId', 'gaugeName', 'value', 'unit', 'measuredAt', 'source'].every(k => text(w[k], 240)) && text(w.note, 2000));
}
export function isVehicle(v: unknown): v is ShuttleVehicle {
  return rec(v) && isTripId(v.id) && text(v.driverUid, 128) && !!v.driverUid
    && text(v.label, 120) && Number.isInteger(v.seats) && Number(v.seats) >= 0 && Number(v.seats) <= 20
    && Array.isArray(v.passengers) && v.passengers.length <= Number(v.seats) && v.passengers.every(u => text(u, 128))
    && new Set(v.passengers).size === v.passengers.length && text(v.meeting, 300)
    && validTripTime(v.time) && text(v.parkedAt, 300) && text(v.note, 2000);
}
export function isTripMutation(v: unknown): v is TripMutation {
  if (!rec(v) || !isTripId(v.operationId) || !Number.isSafeInteger(v.baseRevision) || Number(v.baseRevision) < 0 || !rec(v.command)) return false;
  const c = v.command;
  switch (c.type) {
    case 'create': return isTripPlan(c.plan);
    case 'plan': return isTripPlan(c.plan) && isTripPlan(c.baseline);
    case 'status': return ['planned', 'completed', 'cancelled'].includes(String(c.status));
    case 'rsvp': return ['going', 'maybe', 'not-going'].includes(String(c.rsvp));
    case 'name': return text(c.name, 80) && !!c.name.trim();
    case 'vehicle': return isVehicle(c.vehicle);
    case 'remove-vehicle': return isTripId(c.vehicleId);
    case 'seat': return c.vehicleId === null || isTripId(c.vehicleId);
    case 'remove-member': case 'transfer': return text(c.uid, 128) && !!c.uid;
    case 'delete': return true;
    case 'link': return ['view', 'invite'].includes(String(c.purpose)) && isTripToken(c.token);
    case 'revoke': return ['view', 'invite'].includes(String(c.purpose));
    case 'join': return isTripToken(c.token);
    default: return false;
  }
}
export function isLogMutation(v: unknown): v is LogMutation {
  return rec(v) && isTripId(v.operationId) && Number.isSafeInteger(v.baseRevision) && Number(v.baseRevision) >= 0
    && (v.value === null || isLogInput(v.value));
}
/** Pick fields rather than spreading a private/shared record into a public response. */
export function tripPlan(v: TripPlan): TripPlan {
  return { title: v.title, route: { slug: v.route.slug, name: v.route.name, putInId: v.route.putInId, putInName: v.route.putInName,
    takeOutId: v.route.takeOutId, takeOutName: v.route.takeOutName }, date: v.date, launch: v.launch, expected: v.expected,
    timeZone: v.timeZone, itinerary: v.itinerary.map(s => ({ id: s.id, time: s.time, location: s.location, note: s.note })),
    ...(v.preparation ? { preparation: { checkInLocal: v.preparation.checkInLocal || '', groupSize: v.preparation.groupSize, boatDescription: v.preparation.boatDescription,
      vehicleDescription: v.preparation.vehicleDescription, note: v.preparation.note } } : {}) };
}
export function newTripPlan(route?: Partial<TripRoute>): TripPlan {
  return { title: route?.name || 'New paddle', route: { slug: '', name: '', putInId: '', putInName: '', takeOutId: '', takeOutName: '', ...route },
    date: '', launch: '', expected: '', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', itinerary: [],
    preparation: { checkInLocal: '', groupSize: null, boatDescription: '', vehicleDescription: '', note: '' } };
}
/** Project only the route and schedule fields shown on a public view-only link. */
export function publicTripPlan(v: TripPlan): Omit<TripPlan, 'preparation'> {
  const value = tripPlan(v);
  delete value.preparation;
  return value;
}
/** A captured reading is offered for review, never silently recorded as an observation. */
export function historicalWaterSuggestion(history: import('./index').RiverHistoryApiResult, date: string, timeZone: string): WaterObservation | null {
  if (!validTripDate(date, false) || !validTimeZone(timeZone)) return null;
  const format = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' });
  const samples = history.todayHourly.filter(s => {
    if (!s.gaugeNow || !Number.isFinite(Date.parse(s.capturedAt))) return false;
    const p = Object.fromEntries(format.formatToParts(new Date(s.capturedAt)).map(v => [v.type, v.value]));
    return `${p.year}-${p.month}-${p.day}` === date;
  }).sort((a, b) => b.capturedAt.localeCompare(a.capturedAt));
  const s = samples[0]; if (!s) return null;
  const match = /^(-?[\d,.]+)\s+(.+)$/.exec(s.gaugeNow!);
  return { gaugeId: '', gaugeName: history.river.name, value: match?.[1] || s.gaugeNow!, unit: match?.[2] || '', measuredAt: '',
    source: `PaddleToday archived snapshot captured ${s.capturedAt}`,
    note: 'Gauge measurement time was not supplied with this snapshot. Check whether this reading describes your paddle before saving.' };
}
