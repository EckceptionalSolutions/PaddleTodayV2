import { tripPlan, tripTimeIssue, isTripPlan, isLogInput, type Trip, type TripPlan, type TripMutation, type TripCommand, type PaddleLog, type PaddleLogInput, type LogMutation } from '@paddletoday/api-contract';
import { TripApiError, type TripsClient } from './trips';
export interface TripLocalStorage { getItem(key: string): Promise<string | null>; setItem(key: string, value: string): Promise<void>; removeItem?(key: string): Promise<void> }
export type PendingTripWork = ({ key: string; id: string; kind: 'trip'; input: TripMutation; error?: string; errorStatus?: number }
  | { key: string; id: string; kind: 'log'; input: LogMutation; error?: string; errorStatus?: number }
  | { key: string; id: string; kind: 'photo'; photoId: string; parts: number; caption: string; error?: string; errorStatus?: number })
  & { queuedAt?: number; latest?: Trip | PaddleLog | null };
export interface TripRepositoryState {
  version: 1; uid: string; trips: Record<string, Trip>; logs: Record<string, PaddleLog>;
  pending: PendingTripWork[]; viewed: Record<string, number>; recovery: Record<string, string>; migrated: boolean;
  lastSync: string | null;
}
function mergeTripPlan(baseline: TripPlan, saved: TripPlan, latest: TripPlan): TripPlan {
  const merged = tripPlan(latest);
  for (const key of Object.keys(saved) as (keyof TripPlan)[]) {
    if (JSON.stringify(saved[key]) !== JSON.stringify(baseline[key])) Object.assign(merged, { [key]: saved[key] });
  }
  return merged;
}
/** One durable per-user transaction contains both optimistic state and queued operations. */
export class TripRepository {
  private state: TripRepositoryState;
  private listeners = new Set<() => void>();
  private writes = Promise.resolve();
  private syncing: Promise<void> | null = null;
  private disposed = false;
  private ready = false;
  readonly storageKey: string;
  constructor(readonly uid: string, readonly client: TripsClient, private storage: TripLocalStorage, private uuid: () => string) {
    this.storageKey = `paddletoday:trips:v1:${uid}`;
    this.state = { version: 1, uid, trips: {}, logs: {}, pending: [], viewed: {}, recovery: {}, migrated: false, lastSync: null };
  }
  getSnapshot = () => this.state;
  subscribe = (fn: () => void) => { this.listeners.add(fn); return () => { this.listeners.delete(fn); }; };
  dispose() { this.disposed = true; this.listeners.clear(); }
  async settle() { await this.writes; }
  async load() {
    const raw = await this.storage.getItem(this.storageKey);
    if (raw) {
      const value = JSON.parse(raw) as TripRepositoryState;
      if (value.version !== 1 || value.uid !== this.uid || !value.trips || !value.logs || !Array.isArray(value.pending)) throw new Error('Saved trips could not be read. Nothing was overwritten.');
      this.state = value;
    }
    this.ready = true; this.publish();
  }
  private publish() { if (!this.disposed) this.listeners.forEach(fn => fn()); }
  private change(update: (v: TripRepositoryState) => void | Promise<void>) {
    const work = this.writes.then(async () => {
      if (!this.ready || this.disposed) throw new Error('This account session has ended.');
      const next = JSON.parse(JSON.stringify(this.state)) as TripRepositoryState;
      await update(next);
      if (this.disposed) throw new Error('This account session has ended.');
      await this.storage.setItem(this.storageKey, JSON.stringify(next));
      if (this.disposed) return;
      this.state = next; this.publish();
    });
    this.writes = work.catch(() => {}); return work;
  }
  async savePlan(plan: TripPlan, id = this.uuid(), baseline?: TripPlan) {
    const issue = tripTimeIssue(plan.date, plan.launch, plan.timeZone) || tripTimeIssue(plan.date, plan.expected, plan.timeZone);
    if (issue) throw new Error(issue);
    if (!isTripPlan(plan)) throw new Error('Enter a title and location, and check the date, time, and time zone.');
    const existing = this.state.trips[id];
    await this.command(id, existing ? { type: 'plan', plan: tripPlan(plan), baseline: tripPlan(baseline ?? existing) } : { type: 'create', plan: tripPlan(plan) });
    return id;
  }
  async command(id: string, command: TripCommand, baseRevision?: number) {
    await this.change(v => {
      const current = v.trips[id], operationId = this.uuid();
      const input: TripMutation = { operationId, baseRevision: baseRevision ?? current?.revision ?? 0, command };
      v.pending.push({ queuedAt: Date.now(), kind: 'trip', id, key: operationId, input });
      if (command.type === 'create') v.trips[id] = { ...tripPlan(command.plan), id, ownerUid: this.uid, members: [{ uid: this.uid, name: 'You', role: 'owner', rsvp: 'going' }], shuttle: [], revision: 1, status: 'planned', updatedAt: new Date().toISOString(), updatedBy: this.uid, activity: [] };
      if (current && command.type === 'plan') v.trips[id] = { ...current, ...tripPlan(command.plan), revision: current.revision + 1 };
      if (current && command.type === 'status') v.trips[id] = { ...current, status: command.status, revision: current.revision + 1 };
      if (command.type === 'delete') delete v.trips[id];
    });
  }
  async saveLog(value: PaddleLogInput, id = value.sourceTripId || this.uuid(), baseRevision?: number) {
    if (!isLogInput(value)) throw new Error('Enter a location and valid date for your paddle.');
    await this.change(v => {
      const current = v.logs[id], key = this.uuid();
      v.pending.push({ queuedAt: Date.now(), kind: 'log', id, key, input: { operationId: key, baseRevision: baseRevision ?? current?.revision ?? 0, value } });
      v.logs[id] = { ...value, id, ownerUid: this.uid, revision: (current?.revision ?? 0) + 1, updatedAt: new Date().toISOString(), photos: current?.photos ?? [] };
    });
    return id;
  }
  async deleteLog(id: string) {
    await this.change(v => { const key = this.uuid(); v.pending.push({ queuedAt: Date.now(), kind: 'log', id, key, input: { operationId: key, baseRevision: v.logs[id]?.revision ?? 0, value: null } }); delete v.logs[id]; });
  }
  async photo(id: string, data: string, caption = '') {
    const key = this.uuid(), parts = Math.ceil(data.length / 131072);
    await this.change(async v => {
      for (let i = 0; i < parts; i++) {
        if (this.disposed) throw new Error('This account session has ended.');
        await this.storage.setItem(`${this.storageKey}:photo:${key}:${i}`, data.slice(i * 131072, (i + 1) * 131072));
      }
      v.pending.push({ queuedAt: Date.now(), kind: 'photo', id, key, photoId: key, parts, caption });
    });
  }
  markViewed(id: string) { return this.change(v => { v.viewed[id] = v.trips[id]?.revision ?? 0; }); }
  /** Recovery remains durable until the user explicitly selects which version to keep. */
  async discard(key: string) { const pending = this.state.pending.find(p => p.key === key); await this.change(v => { v.pending = v.pending.filter(p => p.key !== key); }); if (pending?.kind === 'photo') await this.clearPhoto(pending); await this.sync(); }
  private async clearPhoto(p: Extract<PendingTripWork, { kind: 'photo' }>) {
    for (let i = 0; i < p.parts; i++) await this.storage.removeItem?.(`${this.storageKey}:photo:${p.key}:${i}`);
  }
  private rebaseTripQueue(items: Extract<PendingTripWork, { kind: 'trip' }>[], latest: Trip) {
    let current = tripPlan(latest), revision = latest.revision;
    for (const next of items) {
      const operationId = this.uuid(), command = next.input.command;
      if (command.type === 'create') throw new Error('A trip with this saved ID already exists. Copy your plan and create it as a separate trip.');
      const rebased = command.type === 'plan'
        ? { ...command, baseline: current, plan: mergeTripPlan(command.baseline, command.plan, current) }
        : command;
      next.input = { ...next.input, operationId, baseRevision: revision, command: rebased };
      if (rebased.type === 'plan') current = rebased.plan;
      next.key = operationId;
      delete next.error;
      delete next.errorStatus;
      delete next.latest;
      revision++;
    }
  }
  private rebaseLogQueue(items: Extract<PendingTripWork, { kind: 'log' }>[], latest: PaddleLog) {
    let revision = latest.revision;
    for (const next of items) {
      const operationId = this.uuid();
      next.input = { ...next.input, operationId, baseRevision: revision++ };
      next.key = operationId;
      delete next.error;
      delete next.errorStatus;
      delete next.latest;
    }
  }
  async retry(key: string) {
    const pending = this.state.pending.find(p => p.key === key);
    if (!pending) return;
    let latest = pending.latest;
    if (latest === undefined) {
      try {
        latest = pending.kind === 'trip' ? (await this.client.get(pending.id)).trip : (await this.client.getLog(pending.id)).log;
      } catch { latest = null; }
    }
    if (!latest) throw new Error('The saved account copy is unavailable. Copy your change before removing it.');
    await this.change(v => {
      const index = v.pending.findIndex(p => p.key === key), item = v.pending[index];
      if (!item) return;
      if (item.kind === 'trip') {
        if (!('ownerUid' in latest)) throw new Error('The latest trip is unavailable. Keep or copy your saved change before removing it.');
        const queued = v.pending.slice(index).filter((p): p is Extract<PendingTripWork, { kind: 'trip' }> => p.kind === 'trip' && p.id === item.id);
        this.rebaseTripQueue(queued, latest);
      } else if (item.kind === 'log') {
        if (!('photos' in latest)) throw new Error('The latest paddle log is unavailable. Keep or copy your saved change before removing it.');
        const queued = v.pending.slice(index).filter((p): p is Extract<PendingTripWork, { kind: 'log' }> => p.kind === 'log' && p.id === item.id);
        this.rebaseLogQueue(queued, latest);
      } else {
        // Photo bytes are stored under the original key, and the server uses
        // photoId as its idempotency identity. Keep both stable for retries.
        delete item.error;
        delete item.errorStatus;
        delete item.latest;
      }
    });
    await this.sync();
  }

  async keepLatest(key: string) {
    const pending = this.state.pending.find(p => p.key === key);
    if (!pending) return;
    let latest = pending.latest;
    if (latest === undefined) {
      try {
        latest = pending.kind === 'trip' ? (await this.client.get(pending.id)).trip : (await this.client.getLog(pending.id)).log;
      } catch { latest = null; }
    }
    const discardedPhotos: Extract<PendingTripWork, { kind: 'photo' }>[] = [];
    await this.change(v => {
      const index = v.pending.findIndex(p => p.key === key), item = v.pending[index];
      if (!item) return;
      const later = v.pending.slice(index + 1);
      v.pending = v.pending.filter(p => p.key !== key);
      if (item.kind === 'trip') {
        if (latest && 'ownerUid' in latest) {
          v.trips[item.id] = latest;
          this.rebaseTripQueue(later.filter((p): p is Extract<PendingTripWork, { kind: 'trip' }> => p.kind === 'trip' && p.id === item.id), latest);
        } else {
          delete v.trips[item.id];
          v.pending = v.pending.filter(p => p.kind !== 'trip' || p.id !== item.id);
        }
      } else if (item.kind === 'log') {
        if (latest && 'photos' in latest) {
          v.logs[item.id] = latest;
          this.rebaseLogQueue(later.filter((p): p is Extract<PendingTripWork, { kind: 'log' }> => p.kind === 'log' && p.id === item.id), latest);
        } else {
          delete v.logs[item.id];
          v.pending = v.pending.filter(p => {
            if (p.id !== item.id || (p.kind !== 'log' && p.kind !== 'photo')) return true;
            if (p.kind === 'photo') discardedPhotos.push(p);
            return false;
          });
        }
      }
    });
    if (pending.kind === 'photo') await this.clearPhoto(pending);
    for (const photo of discardedPhotos) await this.clearPhoto(photo);
    await this.sync();
  }
  sync() {
    if (this.disposed) return Promise.resolve();
    if (this.syncing) return this.syncing;
    this.syncing = this.syncNow().finally(() => { this.syncing = null; }); return this.syncing;
  }
  private async syncNow() {
    await this.writes;
    if (!this.ready || this.disposed) return;
    {
      const { recovery } = await this.client.migrate();
      if (JSON.stringify(recovery) !== JSON.stringify(this.state.recovery) || !this.state.migrated) await this.change(v => { v.recovery = recovery; v.migrated = true; });
    }
    for (const queued of [...this.state.pending]) {
      const pending = this.state.pending.find(p => p.key === queued.key);
      if (!pending) continue;
      if (this.disposed) return;
      if (pending.error || this.state.pending.some(p => p.id === pending.id && p.error &&
        (p.kind === pending.kind && p.kind !== 'photo' || pending.kind === 'photo' && p.kind === 'log'))) continue;
      try {
        let trip: Trip | null | undefined, log: PaddleLog | null | undefined;
        const age = pending.queuedAt ? Date.now() - pending.queuedAt : 0;
        if (pending.kind === 'trip') trip = (await this.client.mutate(pending.id, pending.input, age)).trip;
        if (pending.kind === 'log') log = (await this.client.log(pending.id, pending.input, age)).log;
        if (pending.kind === 'photo') {
          const chunks: string[] = [];
          for (let i = 0; i < pending.parts; i++) {
            const chunk = await this.storage.getItem(`${this.storageKey}:photo:${pending.key}:${i}`);
            if (chunk === null) throw new TripApiError(400, 'photo_missing', 'This photo is no longer available on the device. Remove the queued upload and select the photo again.');
            chunks.push(chunk);
          }
          log = (await this.client.uploadPhoto(pending.id, pending.photoId, chunks.join(''), pending.caption, age)).log;
        }
        await this.change(v => {
          v.pending = v.pending.filter(p => p.key !== pending.key);
          if (!v.pending.some(p => p.id === pending.id)) {
            if (trip === null) delete v.trips[pending.id]; else if (trip) v.trips[pending.id] = trip;
            if (log === null) delete v.logs[pending.id]; else if (log) v.logs[pending.id] = log;
          }
        });
        if (pending.kind === 'photo') await this.clearPhoto(pending);
      } catch (error) {
        if (error instanceof TripApiError && [400, 403, 404, 409, 410, 413].includes(error.status)) {
          let latest: Trip | PaddleLog | null | undefined;
          if (error.status === 409) {
            try {
              latest = pending.kind === 'trip' ? (await this.client.get(pending.id)).trip : (await this.client.getLog(pending.id)).log;
            } catch { latest = null; }
          }
          await this.change(v => { const p = v.pending.find(p => p.key === pending.key); if (p) { p.error = error.message; p.errorStatus = error.status; if (latest !== undefined) p.latest = latest; }
            if (pending.kind === 'trip' && [403, 404, 410].includes(error.status)) delete v.trips[pending.id];
          });
        } else throw error;
      }
    }
    const trips: Record<string, Trip> = {}, logs: Record<string, PaddleLog> = {};
    let cursor = '';
    do {
      if (this.disposed) return;
      const page = await this.client.list(cursor);
      page.trips.forEach(t => { trips[t.id] = t; }); page.logs.forEach(l => { logs[l.id] = l; }); cursor = page.nextCursor || '';
    } while (cursor);
    await this.change(v => {
      for (const pending of v.pending) {
        if (pending.kind === 'trip') {
          if (pending.input.command.type === 'delete') delete trips[pending.id];
          else if (v.trips[pending.id]) trips[pending.id] = v.trips[pending.id]!;
        } else if (pending.kind === 'log' && pending.input.value === null) delete logs[pending.id];
        else if (v.logs[pending.id]) logs[pending.id] = v.logs[pending.id]!;
      }
      v.trips = trips; v.logs = logs; v.lastSync = new Date().toISOString();
    });
  }
}
