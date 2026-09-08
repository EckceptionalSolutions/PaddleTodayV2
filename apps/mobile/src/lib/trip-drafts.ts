import { isRecord, parseJson } from './storage';

export interface TripDraft {
  launch: string;
  expected: string;
  checkIn: string;
  groupSize: string;
  boat: string;
  vehicle: string;
  note: string;
}

export interface TripDraftTarget {
  routeSlug: string;
  putInId: string | null;
  takeOutId: string | null;
  routeName?: string;
  putInName?: string;
  takeOutName?: string;
}

export interface TripDraftRecord { target: TripDraftTarget; draft: TripDraft; savedAt: string }

interface DraftStorage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
}

export interface TripDraftState {
  phase: 'loading' | 'ready' | 'load-error';
  draft: TripDraft;
  dirty: boolean;
  saving: boolean;
  saveError: boolean;
  savedAt: string | null;
}

const writes = new WeakMap<DraftStorage, Map<string, Promise<void>>>();
const fields: Array<keyof TripDraft> = ['launch', 'expected', 'checkIn', 'groupSize', 'boat', 'vehicle', 'note'];
const draftPrefix = 'paddletoday:trip-draft:v1:';

export function tripDraftKey(target: TripDraftTarget) {
  return `${draftPrefix}${JSON.stringify([target.routeSlug, target.putInId, target.takeOutId])}`;
}

export function parseTripDraftRecord(raw: string | null): TripDraftRecord | null {
  const record = parseJson(raw);
  if (!isRecord(record) || record.version !== 1 || !isRecord(record.target) || !isRecord(record.draft)
    || typeof record.target.routeSlug !== 'string' || !record.target.routeSlug
    || !(record.target.putInId === null || typeof record.target.putInId === 'string')
    || !(record.target.takeOutId === null || typeof record.target.takeOutId === 'string')
    || typeof record.savedAt !== 'string' || !Number.isFinite(Date.parse(record.savedAt))) return null;
  const draft = record.draft;
  if (!fields.every(field => typeof draft[field] === 'string')) return null;
  return {
    target: { routeSlug: record.target.routeSlug, putInId: record.target.putInId, takeOutId: record.target.takeOutId,
      routeName: typeof record.target.routeName === 'string' ? record.target.routeName : undefined,
      putInName: typeof record.target.putInName === 'string' ? record.target.putInName : undefined,
      takeOutName: typeof record.target.takeOutName === 'string' ? record.target.takeOutName : undefined },
    draft: Object.fromEntries(fields.map(field => [field, draft[field]])) as unknown as TripDraft,
    savedAt: record.savedAt,
  };
}

function writeQueue(storage: DraftStorage) {
  let queue = writes.get(storage);
  if (!queue) { queue = new Map(); writes.set(storage, queue); }
  return queue;
}

function enqueueWrite(storage: DraftStorage, key: string, operation: () => Promise<void>) {
  const queue = writeQueue(storage);
  const request = (queue.get(key) ?? Promise.resolve()).catch(() => {}).then(operation);
  queue.set(key, request);
  void request.finally(() => { if (queue.get(key) === request) queue.delete(key); }).catch(() => {});
  return request;
}

export async function listTripDrafts(storage: DraftStorage & { getAllKeys: () => Promise<readonly string[]> }) {
  await Promise.all([...writeQueue(storage).values()].map(request => request.catch(() => {})));
  const keys = (await storage.getAllKeys()).filter(key => key.startsWith(draftPrefix));
  const records: TripDraftRecord[] = [];
  let unreadable = 0;
  await Promise.all(keys.map(async key => {
    try {
      const raw = await storage.getItem(key);
      if (raw === null) return; // A concurrent removal is not a damaged record.
      const record = parseTripDraftRecord(raw);
      if (!record || tripDraftKey(record.target) !== key) { unreadable += 1; return; }
      records.push(record);
    } catch { unreadable += 1; }
  }));
  records.sort((a, b) => Date.parse(b.savedAt) - Date.parse(a.savedAt));
  return { records, unreadable };
}

export function removeTripDraft(storage: DraftStorage & { removeItem: (key: string) => Promise<void> }, target: TripDraftTarget) {
  const key = tripDraftKey(target);
  return enqueueWrite(storage, key, () => storage.removeItem(key));
}

// A session owns one route/access pair. Old saves cannot overwrite a newly opened
// session's newer edit, and loading waits for a closing session's pending write.
export function createTripDraftSession(storage: DraftStorage, target: TripDraftTarget, defaults: TripDraft) {
  const key = tripDraftKey(target);
  let state: TripDraftState = { phase: 'loading', draft: { ...defaults }, dirty: false, saving: false, saveError: false, savedAt: null };
  let revision = 0;
  let loadRequest: Promise<boolean> | null = null;
  const pending = new Map<number, Promise<boolean>>();
  const listeners = new Set<() => void>();
  const publish = (patch: Partial<TripDraftState>) => {
    state = { ...state, ...patch };
    listeners.forEach(listener => listener());
  };

  function load() {
    if (state.phase === 'ready') return Promise.resolve(true);
    if (loadRequest) return loadRequest;
    publish({ phase: 'loading' });
    loadRequest = (async () => {
      try {
        await writeQueue(storage).get(key)?.catch(() => {});
        const raw = await storage.getItem(key);
        if (raw === null) { publish({ phase: 'ready' }); return true; }
        const record = parseTripDraftRecord(raw);
        if (!record || tripDraftKey(record.target) !== key) {
          throw new Error('Unreadable trip draft');
        }
        publish({ phase: 'ready', draft: record.draft, savedAt: record.savedAt });
        return true;
      } catch {
        // A failed read never grants permission to overwrite a stored draft.
        publish({ phase: 'load-error' });
        return false;
      } finally { loadRequest = null; }
    })();
    return loadRequest;
  }

  function update(patch: Partial<TripDraft>) {
    if (state.phase !== 'ready') return;
    const next = { ...state.draft, ...patch };
    if (fields.every(field => next[field] === state.draft[field])) return;
    revision += 1;
    publish({ draft: next, dirty: true, saveError: false });
  }

  function save() {
    if (state.phase !== 'ready') return Promise.resolve(false);
    if (!state.dirty) return Promise.resolve(true);
    const savedRevision = revision;
    const existing = pending.get(savedRevision);
    if (existing) return existing;
    const savedAt = new Date().toISOString();
    const value = JSON.stringify({ version: 1, target, draft: state.draft, savedAt });
    publish({ saving: true, saveError: false });
    const request = enqueueWrite(storage, key, () => storage.setItem(key, value)).then(() => {
      if (revision === savedRevision) publish({ dirty: false, savedAt, saveError: false });
      return true;
    }, () => {
      if (revision === savedRevision) publish({ saveError: true });
      return false;
    }).finally(() => {
      pending.delete(savedRevision);
      publish({ saving: pending.size > 0 });
    });
    pending.set(savedRevision, request);
    return request;
  }

  return {
    key, load, update, save,
    getSnapshot: () => state,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    // Only call after an explicit "Start fresh" choice. This also provides a
    // recovery path for a malformed record without silently deleting it on read.
    startFresh(draft: TripDraft) {
      revision += 1;
      publish({ phase: 'ready', draft: { ...draft }, dirty: true, saveError: false, savedAt: null });
    },
    discardUnsaved() {
      if (state.saving) return;
      revision += 1;
      publish({ dirty: false, saveError: false });
    },
  };
}
