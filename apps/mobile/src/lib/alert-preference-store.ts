import { isRecord } from './storage';

export const ALERT_PREFERENCES_KEY = 'paddletoday:alert-preferences';
export interface SavedRouteAlertRecord {
  riverSlug: string;
  threshold: 'good' | 'strong';
  deliveryMethod: 'email' | 'push';
  updatedAt: string;
}
interface Preferences { email: string; routeAlerts: SavedRouteAlertRecord[] }
interface Storage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<unknown>;
}
export interface AlertPreferenceState extends Preferences {
  isHydrated: boolean; loadError: boolean; saveError: boolean; busy: boolean;
}

function parse(raw: string | null): Preferences {
  if (raw === null) return { email: '', routeAlerts: [] };
  const value: unknown = JSON.parse(raw);
  if (!isRecord(value) || typeof value.email !== 'string'
    || (value.routeAlerts !== undefined && !Array.isArray(value.routeAlerts))) throw new Error('Unreadable alert preferences');
  const routeAlerts = value.routeAlerts ?? [];
  for (const alert of routeAlerts) {
    if (!isRecord(alert) || typeof alert.riverSlug !== 'string' || !alert.riverSlug.trim()
      || !['good', 'strong'].includes(String(alert.threshold))
      || !['email', 'push'].includes(String(alert.deliveryMethod))
      || typeof alert.updatedAt !== 'string') throw new Error('Unreadable alert record');
  }
  return { email: value.email.trim(), routeAlerts: routeAlerts as SavedRouteAlertRecord[] };
}
function sameAlert(a: SavedRouteAlertRecord, b: SavedRouteAlertRecord) {
  return a.riverSlug === b.riverSlug && a.threshold === b.threshold && a.deliveryMethod === b.deliveryMethod;
}
function mergeAlerts(newer: SavedRouteAlertRecord[], older: SavedRouteAlertRecord[]) {
  return [...newer, ...older.filter(old => !newer.some(next => sameAlert(old, next)))];
}

// Keep successful remote submissions separate from their optional local record.
// A read failure must never authorize replacing the unreadable stored document.
export function createAlertPreferenceStore(storage: Storage) {
  let state: AlertPreferenceState = { email: '', routeAlerts: [], isHydrated: false, loadError: false, saveError: false, busy: false };
  let loaded = false;
  let pendingEmail: string | undefined;
  let pendingAlerts: SavedRouteAlertRecord[] = [];
  let revision = 0;
  let queue: Promise<void> = Promise.resolve();
  const listeners = new Set<() => void>();
  const publish = (patch: Partial<AlertPreferenceState>) => {
    state = { ...state, ...patch };
    listeners.forEach(listener => listener());
  };
  const enqueue = (action: () => Promise<void>) => {
    queue = queue.then(action);
    return queue;
  };
  async function flush() {
    if (!loaded || (pendingEmail === undefined && pendingAlerts.length === 0)) return;
    const savingRevision = revision;
    const record = { email: state.email, routeAlerts: state.routeAlerts };
    publish({ busy: true });
    try {
      await storage.setItem(ALERT_PREFERENCES_KEY, JSON.stringify(record));
      if (revision === savingRevision) { pendingEmail = undefined; pendingAlerts = []; }
      publish({ saveError: false });
    } catch {
      publish({ saveError: true });
    } finally {
      publish({ busy: false });
    }
  }
  async function hydrate() {
    if (loaded) { await flush(); return; }
    publish({ busy: true });
    try {
      const previous = parse(await storage.getItem(ALERT_PREFERENCES_KEY));
      loaded = true;
      publish({ email: pendingEmail ?? previous.email, routeAlerts: mergeAlerts(pendingAlerts, previous.routeAlerts), loadError: false });
    } catch {
      publish({ loadError: true });
    } finally {
      publish({ isHydrated: true, busy: false });
    }
    await flush();
  }
  return {
    getSnapshot: () => state,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    load: () => enqueue(hydrate),
    retry: () => enqueue(hydrate),
    setEmail: (email: string) => {
      pendingEmail = email.trim(); revision++;
      publish({ email: pendingEmail });
      return enqueue(flush);
    },
    recordRouteAlert: (alert: Omit<SavedRouteAlertRecord, 'updatedAt'>) => {
      const entry = { ...alert, updatedAt: new Date().toISOString() };
      pendingAlerts = mergeAlerts([entry], pendingAlerts); revision++;
      publish({ routeAlerts: mergeAlerts([entry], state.routeAlerts) });
      return enqueue(flush);
    },
  };
}
