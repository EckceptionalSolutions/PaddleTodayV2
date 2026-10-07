import { onAuthStateChanged } from 'firebase/auth';
import { createPaddleTodayApiClient } from '@paddletoday/api-client';
import type { SyncedRoute } from '@paddletoday/api-contract';
import { getWebAuth } from './web-account-session';
import { SavedRoutesRepository } from './saved-routes-repository';
import { routePageConsolidationTarget } from '../data/route-page-consolidations';

const auth = getWebAuth();
let mode: 'loading' | 'guest' | 'account' = auth ? 'loading' : 'guest';
let repository: SavedRoutesRepository | null = null;
let failure = '', syncing = false, timer: ReturnType<typeof setTimeout> | undefined;
const api = typeof location === 'undefined' ? null : createPaddleTodayApiClient({ baseUrl: location.origin });
const notify = () => { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('paddletoday:favorites-change')); };
export const savedRoutesScope = () => mode === 'guest' ? 'guest' : repository?.uid || 'loading';
export function savedRoutesSession() {
  try { return { mode, enabled: Boolean(auth), uid: repository?.uid, ready: !!repository?.snapshot(), pending: repository?.pending().length || 0,
    conflicts: repository?.conflicts() || [], error: failure, syncing }; }
  catch (error) { return { mode, enabled: Boolean(auth), uid: repository?.uid, ready: false, pending: 0, conflicts: [], error: error instanceof Error ? error.message : 'Saved routes could not be read.', syncing }; }
}
export function accountSavedRoutes() {
  if (mode === 'guest') return null;
  if (!repository) return [];
  return repository.routes().map(route => ({ ...route, state: '', region: '', savedAt: Date.parse(route.savedAt), url: routePageConsolidationTarget(route.slug) || `/rivers/${encodeURIComponent(route.slug)}/` }));
}
export function toSyncedRoute(route: { slug: string; name?: string; reach?: string; savedAt?: number; notes?: string }): SyncedRoute {
  return { slug: route.slug, name: route.name || '', reach: route.reach || '', savedAt: new Date(route.savedAt ?? Date.now()).toISOString(), ...(route.notes ? { notes: route.notes } : {}) };
}
const sameRoute = (a?: SyncedRoute, b?: SyncedRoute) => !a || !b ? a === b : a.slug === b.slug && a.name.trim() === b.name.trim() && a.reach.trim() === b.reach.trim() && Date.parse(a.savedAt) === Date.parse(b.savedAt) && (a.notes || '').trim() === (b.notes || '').trim();
export function writeAccountSavedRoutes(routes: Parameters<typeof toSyncedRoute>[0][], baseline: Parameters<typeof toSyncedRoute>[0][]) {
  if (mode === 'guest') return false;
  if (!repository || !repository.snapshot()) throw new Error('Connect to load your saved account routes before making changes.');
  const before = baseline.map(toSyncedRoute), next = routes.map(toSyncedRoute);
  const changed = new Set([...before, ...next].filter(r => !sameRoute(before.find(v => v.slug === r.slug), next.find(v => v.slug === r.slug))).map(r => r.slug));
  for (const slug of changed) {
    const observed = repository.observe(slug), current = repository.routes().find(r => r.slug === slug);
    if (!sameRoute(current, before.find(r => r.slug === slug))) throw new Error('This route changed in another tab or device. Reopen it and review your change.');
    const value = next.find(r => r.slug === slug);
    repository.set(slug, value ? { ...value, ...(current?.riverId ? { riverId: current.riverId } : {}) } : null, undefined, false, observed);
  }
  scheduleSync(); return true;
}
export function importSavedRoutes(routes: Parameters<typeof toSyncedRoute>[0][]) {
  if (!repository) throw new Error('Sign in before importing saved routes.');
  repository.importRoutes(routes.map(toSyncedRoute)); scheduleSync();
}
export function resolveSavedRoute(slug: string, choice: 'local' | 'cloud') { repository?.resolve(slug, choice); scheduleSync(); }
export async function syncSavedRoutes() {
  const current = repository;
  if (!current || syncing) return;
  syncing = true; failure = ''; notify();
  try {
    if (navigator.locks) await navigator.locks.request(current.prefix, () => current === repository ? current.sync() : Promise.resolve());
    else await current.sync();
  } catch (error) { if (current === repository) failure = error instanceof Error ? error.message : 'Saved routes could not sync. Your changes remain on this device.'; }
  finally {
    if (current === repository) {
      syncing = false;
      try { if (!failure && current.pending().some(edit => !edit.conflict && !edit.receipt)) scheduleSync(); }
      catch { failure = 'Pending edits could not be read. Download a recovery copy before changing browser storage.'; }
      notify();
    }
  }
}
function scheduleSync() { clearTimeout(timer); timer = setTimeout(() => void syncSavedRoutes(), 250); }
if (auth && typeof window !== 'undefined') {
  onAuthStateChanged(auth, user => {
    clearTimeout(timer); repository = null; syncing = false; failure = ''; mode = user ? 'account' : 'guest';
    if (user) {
      try {
        const current: SavedRoutesRepository = new SavedRoutesRepository(user.uid, window.localStorage, {
          get: async () => { const token = await user.getIdToken(); if (auth.currentUser?.uid !== user.uid) throw new Error('Account changed.'); return (await api!.getAccountSync(token)).snapshot; },
          apply: async operation => { const token = await user.getIdToken(); if (auth.currentUser?.uid !== user.uid) throw new Error('Account changed.'); return api!.applyAccountSync(token, { version: 1, deviceId: crypto.randomUUID(), epoch: operation.epoch, operations: [operation] }); },
        }, () => repository === current && auth.currentUser?.uid === user.uid, notify);
        repository = current;
      } catch { failure = 'Browser storage is unavailable. Account saves cannot be edited safely here.'; }
    }
    window.dispatchEvent(new CustomEvent('paddletoday:favorites-scope-change'));
    notify(); void syncSavedRoutes();
  });
  window.addEventListener('online', scheduleSync);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) scheduleSync(); });
  window.addEventListener('storage', event => {
    if (repository && (event.key === null || event.key?.startsWith(repository.prefix))) { notify(); if (event.key?.includes(':edit:')) scheduleSync(); }
  });
}

export function exportSavedRoutes() { return JSON.stringify(repository?.recovery() || {}, null, 2); }
