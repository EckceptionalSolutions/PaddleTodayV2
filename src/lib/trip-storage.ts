import { createHash, timingSafeEqual } from 'node:crypto';
import sharp from 'sharp';
import {
  TRIP_MEMBER_LIMIT, TRIP_PHOTO_LIMIT, TRIP_PHOTO_MAX_BYTES, isTripId, isTripToken, isTripPlan, isLogInput, tripPlan,
  type Trip, type TripPlan, type TripMutation, type LogMutation, type PaddleLog, type TripList, type PublicTrip,
  type SyncedTripDraft,
} from '@paddletoday/api-contract';
import { createJsonStorage, mutateJson, type JsonStorage } from './blob-storage';

interface TripDocument {
  kind: 'trip'; trip: Trip; deleted: boolean; receipts: Record<string, string>;
  links: Partial<Record<'view' | 'invite', { hash: string; expires: string }>>;
  pendingIndex: string[];
}
interface LogDocument { kind: 'log'; uid: string; id: string; revision: number; log: PaddleLog | null; receipts: Record<string, string>; uploads?: Record<string, { state: 'pending' | 'ready' | 'removed'; startedAt: string }> }
interface PhotoDocument { kind: 'photo'; uid: string; logId: string; id: string; data: string; at: string }
interface UserIndex { kind: 'trip-index'; uid: string; trips: string[]; logs: string[]; photos: Record<string, number>; deleting: boolean; deletionComplete?: boolean; migration: Record<string, string> }
type MaintenancePrefix = 'trip-index/' | 'trips/' | 'logs/';
interface MaintenanceDocument { kind: 'trip-maintenance'; cursors: Record<MaintenancePrefix, string | null> }
type Document = TripDocument | LogDocument | PhotoDocument | UserIndex | MaintenanceDocument;
export class TripError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) { super(message); }
}
const fail = (status: number, code: string, message: string): never => { throw new TripError(status, code, message); };
const hash = (v: string) => createHash('sha256').update(v).digest('hex');
const stamp = () => new Date().toISOString();
const tripKey = (id: string) => `trips/${id}.json`;
const indexKey = (uid: string) => `trip-index/${hash(uid)}.json`;
const logKey = (uid: string, id: string) => `logs/${hash(uid)}/${id}.json`;
const photoKey = (uid: string, log: string, id: string) => `trip-photos/${hash(uid)}/${log}/${id}.json`;
const maintenanceKey = 'maintenance/trip-maintenance.json';
const maintenancePageSize = 100;
const emptyMaintenance = (): MaintenanceDocument => ({ kind: 'trip-maintenance', cursors: { 'trip-index/': null, 'trips/': null, 'logs/': null } });
const emptyIndex = (uid: string): UserIndex => ({ kind: 'trip-index', uid, trips: [], logs: [], photos: {}, deleting: false, deletionComplete: false, migration: {} });
function receipt(receipts: Record<string, string>, id: string, input: unknown) {
  const digest = hash(JSON.stringify(input));
  if (receipts[id] && receipts[id] !== digest) fail(409, 'operation_reused', 'This operation ID has already been used.');
  return { digest, applied: receipts[id] === digest };
}
function remember(receipts: Record<string, string>, id: string, digest: string) {
  receipts[id] = digest;
  while (Object.keys(receipts).length > 400) delete receipts[Object.keys(receipts)[0]!];
}
function authorized(doc: TripDocument | null, uid: string): TripDocument {
  if (!doc || doc.deleted || !doc.trip.members.some(m => m.uid === uid)) fail(404, 'trip_unavailable', 'This trip is unavailable or you no longer have access.');
  return doc!;
}
function checkLink(doc: TripDocument | null, purpose: 'view' | 'invite', token: string) {
  const link = doc?.links[purpose];
  if (!doc || doc.deleted || !isTripToken(token) || !link || Date.parse(link.expires) <= Date.now()
    || !timingSafeEqual(Buffer.from(link.hash, 'hex'), Buffer.from(hash(token), 'hex'))) {
    fail(404, 'link_unavailable', 'This link has expired or was revoked. Ask the organizer for a new one.');
  }
}
export class TripStorage {
  constructor(readonly storage: JsonStorage) {}
  private async active(uid: string) {
    if ((await this.storage.readJson<UserIndex>(indexKey(uid)))?.deleting) fail(410, 'account_deleted', 'This account is being deleted.');
  }
  private async index(uid: string, update: (value: UserIndex) => void) {
    return mutateJson({ storage: this.storage, blobName: indexKey(uid), initial: emptyIndex(uid), mutate: v => { update(v); return v; } });
  }
  private async reserve(uid: string, collection: 'trips' | 'logs', id: string) {
    await this.index(uid, index => {
      if (index.deleting) fail(410, 'account_deleted', 'This account is being deleted.');
      if (index[collection].includes(id)) return;
      if (index[collection].length >= 1000) fail(413, 'record_limit', 'This account has reached its trip or log limit. Export your data before removing older entries.');
      index[collection].push(id);
    });
  }
  async get(uid: string, id: string) { await this.active(uid); return authorized(await this.storage.readJson<TripDocument>(tripKey(id)), uid).trip; }
  async publicView(id: string, token: string): Promise<PublicTrip> {
    const doc = await this.storage.readJson<TripDocument>(tripKey(id));
    checkLink(doc, 'view', token);
    return { ...tripPlan(doc!.trip), id, revision: doc!.trip.revision, status: doc!.trip.status, updatedAt: doc!.trip.updatedAt };
  }
  async invitation(id: string, token: string) {
    const doc = await this.storage.readJson<TripDocument>(tripKey(id));
    checkLink(doc, 'invite', token);
    return { title: doc!.trip.title, date: doc!.trip.date, route: tripPlan(doc!.trip).route };
  }
  async list(uid: string, cursor = ''): Promise<TripList> {
    await this.active(uid);
    const index = await this.storage.readJson<UserIndex>(indexKey(uid)) ?? emptyIndex(uid);
    const keys = [...index.trips.map(id => `t:${id}`), ...index.logs.map(id => `l:${id}`)].sort();
    const remaining = keys.filter(k => k > cursor), page = remaining.slice(0, 40);
    const trips: Trip[] = [], logs: PaddleLog[] = [];
    await Promise.all(page.map(async key => {
      const id = key.slice(2);
      if (key.startsWith('t:')) {
        const doc = await this.storage.readJson<TripDocument>(tripKey(id));
        if (doc && !doc.deleted && doc.trip.members.some(m => m.uid === uid)) trips.push(doc.trip);
      } else {
        const doc = await this.storage.readJson<LogDocument>(logKey(uid, id));
        if (doc?.log) logs.push(doc.log);
      }
    }));
    return { trips, logs, nextCursor: remaining.length > page.length ? page.at(-1)! : null };
  }
  async mutate(uid: string, name: string, id: string, mutation: TripMutation): Promise<Trip | null> {
    await this.active(uid);
    const c = mutation.command;
    const initial: TripDocument = { kind: 'trip', deleted: false, receipts: {}, links: {}, pendingIndex: [], trip: {
      ...(c.type === 'create' ? tripPlan(c.plan) : { title: '', route: { slug: '', name: '', putInId: '', putInName: '', takeOutId: '', takeOutName: '' }, date: '', launch: '', expected: '', timeZone: 'UTC', itinerary: [] }),
      id, ownerUid: uid, revision: 0, status: 'planned', members: [], shuttle: [], updatedAt: stamp(), updatedBy: uid, activity: [],
    } };
    const doc = await mutateJson({ storage: this.storage, blobName: tripKey(id), initial, mutate: async doc => {
      await this.active(uid);
      const t = doc.trip;
      if (doc.deleted && doc.trip.ownerUid === uid && c.type === 'delete' && receipt(doc.receipts, mutation.operationId, mutation).applied) return doc;
      if (doc.deleted) fail(410, 'trip_deleted', 'This trip was removed. Your pending changes have been kept for recovery.');
      if (!t.revision && c.type !== 'create') fail(404, 'trip_unavailable', 'This trip is unavailable.');
      if (c.type === 'remove-member' && c.uid === uid && receipt(doc.receipts, mutation.operationId, mutation).applied) return doc;
      if (c.type === 'join') checkLink(doc, 'invite', c.token);
      else if (t.revision) authorized(doc, uid);
      const seen = receipt(doc.receipts, mutation.operationId, mutation);
      if (seen.applied) return doc;
      const owner = t.ownerUid === uid;
      const requireOwner = () => { if (!owner) fail(403, 'owner_required', 'Only the organizer can do that.'); };
      const requireRevision = () => { if (t.revision !== mutation.baseRevision) fail(409, 'trip_conflict', 'The trip changed. Review the latest version before applying your saved changes.'); };
      if (c.type !== 'join' && c.type !== 'plan') requireRevision();
      switch (c.type) {
        case 'create':
          if (t.revision) fail(409, 'trip_exists', 'This trip already exists.');
          await this.reserve(uid, 'trips', id);
          t.members = [{ uid, name: name.slice(0, 80) || 'Paddler', role: 'owner', rsvp: 'going' }]; break;
        case 'plan': {
          const before = tripPlan(t), desired = tripPlan(c.plan), baseline = tripPlan(c.baseline);
          for (const key of Object.keys(desired) as (keyof TripPlan)[]) {
            if (JSON.stringify(desired[key]) === JSON.stringify(baseline[key])) continue;
            if (JSON.stringify(before[key]) !== JSON.stringify(baseline[key]) && JSON.stringify(before[key]) !== JSON.stringify(desired[key])) {
              fail(409, 'trip_conflict', 'Someone changed the same trip details. Both versions have been kept for review.');
            }
            Object.assign(t, { [key]: desired[key] });
          }
          if (!isTripPlan(t)) fail(400, 'invalid_plan', 'Check the date, time, and trip details.');
          break;
        }
        case 'status': requireOwner(); t.status = c.status; break;
        case 'rsvp': t.members.find(m => m.uid === uid)!.rsvp = c.rsvp; break;
        case 'name': t.members.find(m => m.uid === uid)!.name = c.name.trim(); break;
        case 'vehicle': {
          const old = t.shuttle.find(v => v.id === c.vehicle.id);
          if (!owner && ((old && old.driverUid !== uid) || c.vehicle.driverUid !== uid)) fail(403, 'driver_required', 'Edit your own shuttle vehicle.');
          if (!t.members.some(m => m.uid === c.vehicle.driverUid) || c.vehicle.passengers.some(p => !t.members.some(m => m.uid === p))) fail(400, 'invalid_member', 'Choose people who have joined the trip.');
          if (!owner && JSON.stringify(old?.passengers ?? []) !== JSON.stringify(c.vehicle.passengers)) fail(403, 'seat_assignment', 'Participants choose their own seats.');
          t.shuttle = [...t.shuttle.filter(v => v.id !== c.vehicle.id), structuredClone(c.vehicle)];
          if (t.shuttle.length > 20) fail(400, 'vehicle_limit', 'A trip can have up to 20 vehicles.');
          const riders = t.shuttle.flatMap(v => [v.driverUid, ...v.passengers]);
          if (new Set(riders).size !== riders.length) fail(409, 'seat_conflict', 'A paddler can only be assigned to one vehicle.');
          break;
        }
        case 'remove-vehicle': {
          const v = t.shuttle.find(v => v.id === c.vehicleId);
          if (v && !owner && v.driverUid !== uid) fail(403, 'driver_required', 'Only the driver or organizer can remove this vehicle.');
          t.shuttle = t.shuttle.filter(v => v.id !== c.vehicleId); break;
        }
        case 'seat': {
          if (t.shuttle.some(v => v.driverUid === uid)) fail(409, 'already_driving', 'Remove your driver assignment before choosing a passenger seat.');
          const target = c.vehicleId ? t.shuttle.find(v => v.id === c.vehicleId) : null;
          if (c.vehicleId && !target) fail(404, 'vehicle_missing', 'This shuttle vehicle no longer exists.');
          if (target && !target.passengers.includes(uid) && target.passengers.length >= target.seats) fail(409, 'shuttle_full', 'That vehicle is full. Choose another ride.');
          t.shuttle.forEach(v => { v.passengers = v.passengers.filter(p => p !== uid); });
          target?.passengers.push(uid); break;
        }
        case 'remove-member':
          if (c.uid !== uid) requireOwner();
          if (c.uid === t.ownerUid) fail(409, 'owner_cannot_leave', 'Transfer ownership or delete the trip before leaving.');
          t.members = t.members.filter(m => m.uid !== c.uid);
          t.shuttle = t.shuttle.filter(v => v.driverUid !== c.uid).map(v => ({ ...v, passengers: v.passengers.filter(p => p !== c.uid) }));
          doc.pendingIndex.push(c.uid); break;
        case 'transfer': {
          requireOwner();
          if (!t.members.some(m => m.uid === c.uid)) fail(400, 'invalid_member', 'The new organizer must be a trip member.');
          t.ownerUid = c.uid; t.members.forEach(m => { m.role = m.uid === c.uid ? 'owner' : 'participant'; }); break;
        }
        case 'delete': requireOwner(); doc.deleted = true; doc.links = {}; break;
        case 'link': requireOwner(); doc.links[c.purpose] = { hash: hash(c.token), expires: new Date(Date.now() + (c.purpose === 'invite' ? 7 : 30) * 86400000).toISOString() }; break;
        case 'revoke': requireOwner(); delete doc.links[c.purpose]; break;
        case 'join':
          if (!t.members.some(m => m.uid === uid)) {
            if (t.members.length >= TRIP_MEMBER_LIMIT) fail(409, 'trip_full', 'This trip has reached its participant limit.');
            await this.reserve(uid, 'trips', id);
            t.members.push({ uid, name: name.slice(0, 80) || 'Paddler', role: 'participant', rsvp: 'maybe' });
          }
          break;
      }
      t.revision += 1; t.updatedAt = stamp(); t.updatedBy = uid;
      t.activity = [...t.activity, { revision: t.revision, at: t.updatedAt, actor: uid, action: c.type }].slice(-50);
      doc.pendingIndex = [...new Set([...doc.pendingIndex, ...t.members.map(m => m.uid)])];
      remember(doc.receipts, mutation.operationId, seen.digest);
      return doc;
    } });
    await this.repairTrip(id); // If repair fails, the client safely retries the same receipted mutation.
    return doc.deleted || !doc.trip.members.some(m => m.uid === uid) ? null : doc.trip;
  }
  async repairTrip(id: string) {
    await mutateJson({ storage: this.storage, blobName: tripKey(id), initial: null as TripDocument | null, mutate: async doc => {
      if (!doc) return doc;
      for (const uid of doc.pendingIndex) await this.index(uid, index => {
        index.trips = index.trips.filter(v => v !== id);
        if (!index.deleting && !doc.deleted && doc.trip.members.some(m => m.uid === uid)) index.trips.push(id);
      });
      doc.pendingIndex = [];
      return doc;
    } });
  }
  async getLog(uid: string, id: string) {
    await this.active(uid);
    const doc = await this.storage.readJson<LogDocument>(logKey(uid, id));
    if (!doc?.log) fail(404, 'log_unavailable', 'This paddle log is unavailable.');
    return doc!.log!;
  }
  async log(uid: string, id: string, mutation: LogMutation) {
    await this.active(uid);
    if (mutation.value?.sourceTripId && id !== mutation.value.sourceTripId) fail(400, 'source_identity', 'Use the trip ID for its personal log.');
    const doc = await mutateJson({ storage: this.storage, blobName: logKey(uid, id),
      initial: { kind: 'log', uid, id, revision: 0, log: null, receipts: {} } as LogDocument,
      mutate: async doc => {
        await this.active(uid);
        const seen = receipt(doc.receipts, mutation.operationId, mutation);
        if (seen.applied) return doc;
        if (doc.revision !== mutation.baseRevision) fail(409, 'log_conflict', 'This log changed on another device. Review both versions.');
        if (doc.revision && !doc.log) fail(410, 'log_deleted', 'This paddle was removed. Save a new entry to keep your recovered changes.');
        if (!doc.revision && mutation.value?.sourceTripId) await this.get(uid, mutation.value.sourceTripId);
        if (!doc.revision) await this.reserve(uid, 'logs', id);
        if (doc.log && mutation.value && doc.log.sourceTripId !== mutation.value.sourceTripId) fail(400, 'source_identity', 'A log cannot be moved to a different trip.');
        doc.revision += 1;
        doc.log = mutation.value ? { sourceTripId: mutation.value.sourceTripId, route: tripPlan({ title: '', route: mutation.value.route, date: '', launch: '', expected: '', timeZone: 'UTC', itinerary: [] }).route,
          date: mutation.value.date, time: mutation.value.time, timeZone: mutation.value.timeZone, notes: mutation.value.notes,
          paddleAgain: mutation.value.paddleAgain, water: mutation.value.water.map(w => ({ gaugeId: w.gaugeId, gaugeName: w.gaugeName, value: w.value, unit: w.unit, measuredAt: w.measuredAt, source: w.source, note: w.note })),
          id, ownerUid: uid, revision: doc.revision, updatedAt: stamp(), photos: doc.log?.photos ?? [] } : null;
        remember(doc.receipts, mutation.operationId, seen.digest); return doc;
      } });
    await this.index(uid, index => { if (!index.logs.includes(id)) index.logs.push(id); });
    if (!doc.log) await this.deleteLogPhotos(uid, id);
    return doc.log;
  }
  async photo(uid: string, logId: string, id: string, base64: string, caption: string) {
    await this.active(uid); await this.getLog(uid, logId);
    if (base64.length > Math.ceil(TRIP_PHOTO_MAX_BYTES / 3) * 4 || !/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) fail(413, 'photo_limit', 'Choose an image smaller than 10 MiB.');
    const input = Buffer.from(base64, 'base64');
    if (input.length > TRIP_PHOTO_MAX_BYTES) fail(413, 'photo_limit', 'Choose an image smaller than 10 MiB.');
    const reservation = await mutateJson({ storage: this.storage, blobName: logKey(uid, logId), initial: null as LogDocument | null, mutate: doc => {
      if (!doc?.log) fail(404, 'log_unavailable', 'This log is unavailable.');
      doc!.uploads ??= {};
      if (doc!.uploads[id]?.state === 'removed') fail(410, 'photo_removed', 'This upload was removed or expired. Select the photo again to upload a new copy.');
      if (!doc!.uploads[id]) {
        if (doc!.log!.photos.length + Object.values(doc!.uploads).filter(u => u.state === 'pending').length >= TRIP_PHOTO_LIMIT) fail(413, 'photo_limit', 'A paddle log can have up to 10 photos, including queued uploads.');
        doc!.uploads[id] = { state: 'pending', startedAt: stamp() };
      }
      return doc;
    } });
    if (reservation!.uploads![id]!.state === 'ready') return this.getLog(uid, logId);
    let data: Buffer, width: number, height: number;
    try {
      const result = await sharp(input, { limitInputPixels: 40_000_000 }).rotate().resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 80 }).toBuffer({ resolveWithObject: true });
      data = result.data; width = result.info.width; height = result.info.height;
    } catch {
      await this.removePhoto(uid, logId, id);
      return fail(400, 'invalid_photo', 'This image could not be opened. Choose a JPEG, PNG, WebP, or supported HEIC photo.');
    }
    const quotaKey = `${logId}/${id}`;
    await this.index(uid, index => {
      if (index.deleting) fail(410, 'account_deleted', 'This account is being deleted.');
      const total = Object.entries(index.photos).reduce((n, [key, bytes]) => n + (key === quotaKey ? 0 : bytes), 0);
      if (total + data.length > 100 * 1024 * 1024) fail(413, 'photo_quota', 'Your photo storage is full. Remove a photo before adding another.');
      index.photos[quotaKey] = data.length;
    });
    const name = photoKey(uid, logId, id);
    await this.storage.writeJson(name, { kind: 'photo', uid, logId, id, data: data.toString('base64'), at: stamp() } satisfies PhotoDocument);
    await mutateJson({ storage: this.storage, blobName: logKey(uid, logId), initial: null as LogDocument | null, mutate: async doc => {
      await this.active(uid);
      if (!doc?.log) fail(404, 'log_unavailable', 'This log was removed.');
      if (doc!.uploads?.[id]?.state === 'removed') fail(410, 'photo_removed', 'This photo was removed while the upload was in progress.');
      if (doc!.log!.photos.length >= TRIP_PHOTO_LIMIT && !doc!.log!.photos.some(p => p.id === id)) fail(413, 'photo_limit', 'A paddle log can have up to 10 photos.');
      doc!.log!.photos = [...doc!.log!.photos.filter(p => p.id !== id), { id, caption: caption.slice(0, 300), bytes: data.length, width, height }];
      doc!.uploads![id]!.state = 'ready';
      return doc;
    } });
    return this.getLog(uid, logId);
  }
  async readPhoto(uid: string, logId: string, id: string) {
    const log = await this.getLog(uid, logId);
    if (!log.photos.some(p => p.id === id)) fail(404, 'photo_unavailable', 'Photo unavailable.');
    const doc = await this.storage.readJson<PhotoDocument>(photoKey(uid, logId, id));
    if (!doc) fail(404, 'photo_unavailable', 'Photo unavailable.');
    return Buffer.from(doc!.data, 'base64');
  }
  async removePhoto(uid: string, logId: string, id: string) {
    await this.active(uid);
    await mutateJson({ storage: this.storage, blobName: logKey(uid, logId), initial: null as LogDocument | null, mutate: doc => {
      if (!doc) fail(404, 'log_unavailable', 'This log is unavailable.');
      if (doc!.log) doc!.log.photos = doc!.log!.photos.filter(p => p.id !== id);
      doc!.uploads ??= {}; doc!.uploads[id] = { state: 'removed', startedAt: stamp() };
      return doc;
    } });
    await this.storage.deleteJson(photoKey(uid, logId, id));
    await this.index(uid, index => { delete index.photos[`${logId}/${id}`]; });
  }
  private async deleteLogPhotos(uid: string, id: string) {
    for (const name of await this.storage.listJsonNames(`trip-photos/${hash(uid)}/${id}/`)) await this.storage.deleteJson(name);
    await this.index(uid, index => { for (const key of Object.keys(index.photos)) if (key.startsWith(id + '/')) delete index.photos[key]; });
  }
  async migrate(uid: string, name: string, drafts: SyncedTripDraft[]) {
    await this.active(uid);
    const existingIndex = await this.storage.readJson<UserIndex>(indexKey(uid));
    for (const draft of drafts) {
      const sourceKey = JSON.stringify([draft.target.routeSlug, draft.target.putInId, draft.target.takeOutId]);
      const id = hash(uid + ':' + sourceKey).slice(0, 40);
      if (existingIndex?.migration[id]) continue;
      const previous = await this.storage.readJson<TripDocument>(tripKey(id));
      if (!previous) {
        const dateMatch = /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})/.exec(draft.draft.launch);
        const plan: TripPlan = { title: draft.target.routeName || draft.target.routeSlug,
          route: { slug: draft.target.routeSlug, name: draft.target.routeName || draft.target.routeSlug, putInId: draft.target.putInId || '', putInName: draft.target.putInName || '', takeOutId: draft.target.takeOutId || '', takeOutName: draft.target.takeOutName || '' },
          date: dateMatch?.[1] || '', launch: dateMatch?.[2] || '', expected: /[ T](\d{2}:\d{2})/.exec(draft.draft.expected)?.[1] || '', timeZone: 'UTC', itinerary: [] };
        // Legacy drafts have no zone. Retain original details privately, never publish them in an itinerary.
        const valid: boolean = isTripPlan(plan);
        if (!valid) { plan.date = ''; plan.launch = ''; plan.expected = ''; }
        await this.mutate(uid, name, id, { operationId: id, baseRevision: 0, command: { type: 'create', plan } });
      }
      await this.index(uid, v => { v.migration[id] = JSON.stringify(draft); });
    }
  }
  async migrationRecovery(uid: string) { await this.active(uid); return (await this.storage.readJson<UserIndex>(indexKey(uid)))?.migration ?? {}; }
  async deleteAccount(uid: string) {
    const index = await this.storage.readJson<UserIndex>(indexKey(uid));
    if (index?.deletionComplete) return;
    await this.index(uid, v => { v.deleting = true; v.deletionComplete = false; });
    // Scan authoritative records too: a crash may have left membership indexes waiting for repair.
    for (const name of await this.storage.listJsonNames('trips/')) {
      await mutateJson({ storage: this.storage, blobName: name, initial: null as TripDocument | null, mutate: doc => {
        if (!doc) return doc;
        if (doc.trip.ownerUid !== uid && !doc.trip.members.some(m => m.uid === uid) && doc.trip.updatedBy !== uid && !doc.trip.activity.some(a => a.actor === uid)) return doc;
        if (doc.trip.ownerUid === uid) { doc.deleted = true; doc.links = {}; }
        doc.pendingIndex = [...new Set([...doc.pendingIndex, ...doc.trip.members.map(m => m.uid)])];
        doc.trip.members = doc.trip.members.filter(m => m.uid !== uid);
        doc.trip.shuttle = doc.trip.shuttle.filter(v => v.driverUid !== uid).map(v => ({ ...v, passengers: v.passengers.filter(p => p !== uid) }));
        doc.trip.activity = doc.trip.activity.map(a => ({ ...a, actor: a.actor === uid ? 'Deleted paddler' : a.actor }));
        if (doc.trip.updatedBy === uid) doc.trip.updatedBy = 'Deleted paddler';
        if (doc.deleted) { doc.trip = { ...doc.trip, ...tripPlan({ title: 'Removed trip', route: { slug: '', name: 'Removed route', putInId: '', putInName: '', takeOutId: '', takeOutName: '' }, date: '', launch: '', expected: '', timeZone: 'UTC', itinerary: [] }), ownerUid: '', members: [], shuttle: [], activity: [] }; }
        doc.trip.revision += 1;
        return doc;
      } });
    }
    for (const prefix of [`logs/${hash(uid)}/`, `trip-photos/${hash(uid)}/`]) {
      for (const name of await this.storage.listJsonNames(prefix)) await this.storage.deleteJson(name);
    }
    await this.index(uid, v => { v.trips = []; v.logs = []; v.photos = {}; v.migration = {}; v.deleting = true; v.deletionComplete = true; });
  }
  async maintenance() {
    const checkpoint = await this.storage.readJson<MaintenanceDocument>(maintenanceKey) ?? emptyMaintenance();
    const indexPage = await this.storage.listJsonPage('trip-index/', checkpoint.cursors['trip-index/'], maintenancePageSize);
    for (const name of indexPage.names) {
      const index = await this.storage.readJson<UserIndex>(name);
      if (index?.deleting && !index.deletionComplete) await this.deleteAccount(index.uid);
    }
    await this.saveMaintenanceCursor('trip-index/', indexPage.nextCursor);

    const tripPage = await this.storage.listJsonPage('trips/', checkpoint.cursors['trips/'], maintenancePageSize);
    for (const name of tripPage.names) {
      const doc = await this.storage.readJson<TripDocument>(name);
      if (doc?.pendingIndex.length) await this.repairTrip(doc.trip.id);
    }
    await this.saveMaintenanceCursor('trips/', tripPage.nextCursor);

    const logPage = await this.storage.listJsonPage('logs/', checkpoint.cursors['logs/'], maintenancePageSize);
    for (const name of logPage.names) {
      const doc = await mutateJson({ storage: this.storage, blobName: name, initial: null as LogDocument | null, mutate: doc => {
        if (doc?.uploads) for (const upload of Object.values(doc.uploads)) {
          if (upload.state === 'pending' && Date.parse(upload.startedAt) < Date.now() - 86400000) upload.state = 'removed';
        }
        return doc;
      } });
      if (doc) {
        await this.index(doc.uid, index => { if (!index.deleting && !index.logs.includes(doc.id)) index.logs.push(doc.id); });
        if (!doc.log) await this.deleteLogPhotos(doc.uid, doc.id);
        for (const [id, upload] of Object.entries(doc.uploads ?? {})) if (upload.state === 'removed') {
          await this.storage.deleteJson(photoKey(doc.uid, doc.id, id));
          await this.index(doc.uid, index => { delete index.photos[`${doc.id}/${id}`]; });
        }
      }
    }
    await this.saveMaintenanceCursor('logs/', logPage.nextCursor);
    // Photo uploads reserve a small upload record on their log before writing
    // photo bytes. Expired/removed reservations above delete their photo blob,
    // so cleanup can avoid downloading every base64 photo document to inspect it.
  }
  private async saveMaintenanceCursor(prefix: MaintenancePrefix, cursor: string | null) {
    await mutateJson({ storage: this.storage, blobName: maintenanceKey, initial: emptyMaintenance(), mutate: state => {
      state.cursors[prefix] = cursor;
      return state;
    } });
  }
}
export function isTripStorageDocument(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  const v = value as Document;
  if (v.kind === 'trip') return !!v.trip && isTripId(v.trip.id) && isTripPlan(v.trip) && Array.isArray(v.trip.members) && !!v.links && !!v.receipts;
  if (v.kind === 'log') return typeof v.uid === 'string' && isTripId(v.id) && (v.log === null || isLogInput(v.log));
  if (v.kind === 'photo') return isTripId(v.id) && typeof v.uid === 'string' && typeof v.data === 'string';
  if (v.kind === 'trip-maintenance') return !!v.cursors && ['trip-index/', 'trips/', 'logs/'].every(prefix => v.cursors[prefix as MaintenancePrefix] === null || typeof v.cursors[prefix as MaintenancePrefix] === 'string');
  return v.kind === 'trip-index' && typeof v.uid === 'string' && Array.isArray(v.trips) && Array.isArray(v.logs) && !!v.photos;
}
let instance: TripStorage | null = null;
export function tripStorage() {
  if (instance) return instance;
  const sas = process.env.TRIP_DATA_CONTAINER_SAS_URL?.trim() || process.env.ACCOUNT_DATA_CONTAINER_SAS_URL?.trim();
  if (process.env.NODE_ENV === 'production') {
    if (!sas) throw new TripError(503, 'trip_storage_unavailable', 'Trip storage is not configured.');
    const url = new URL(sas);
    if (url.protocol !== 'https:' || !url.searchParams.has('sig') || !['r', 'w', 'c', 'd', 'l'].every(p => url.searchParams.get('sp')?.includes(p))) throw new TripError(503, 'trip_storage_unavailable', 'Trip storage permissions are not configured.');
  }
  instance = new TripStorage(createJsonStorage({ containerSasUrl: sas, localDirectory: '.local/trip-data', validate: isTripStorageDocument, label: 'private trip data', space: 0, accessTier: 'Hot' }));
  return instance;
}
