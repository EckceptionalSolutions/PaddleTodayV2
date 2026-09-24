import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCOUNT_SYNC_VERSION, isAccountSyncRequest, isSyncedRoute, isSyncedTripDraft, type AccountSyncOperation, type AccountSyncSnapshot, type SyncedRoute, type SyncedTripDraft } from '@paddletoday/api-contract';
import * as Crypto from 'expo-crypto';
import { AppState, Platform } from 'react-native';
import { notifySavedRoutesChanged } from './account-storage-events';
import { activateAccountLocalState, deactivateAccountLocalState, markGuestMigrationRecoveryAcknowledged } from './account-local-state';
import { listTripDrafts, tripDraftKey } from './trip-drafts';
import { apiClient } from '../api/client';

export const SAVED_ROUTES_KEY = 'paddletoday:saved-rivers';
const pendingKey = (uid: string) => 'paddletoday:account-pending:' + uid;
const baselineKey = (uid: string) => 'paddletoday:account-baseline:' + uid;
export const accountOutboxKey = (uid: string) => 'paddletoday:account-outbox:' + uid;
const routeConflictPrefix = (uid: string) => 'paddletoday:account-conflict:' + uid + ':route:';
const draftConflictPrefix = (uid: string) => 'paddletoday:account-conflict:' + uid + ':draft:';
const DRAFT_PREFIX = 'paddletoday:trip-draft:v1:';

export interface AccountBackupSummary {
  routes: number;
  drafts: number;
  conflicts: number;
  updatedAt: string | null;
  pending: boolean;
}

let pendingTimer: ReturnType<typeof setTimeout> | null = null;
let running: Promise<AccountBackupSummary | null> | null = null;
let syncQueue: Promise<void> = Promise.resolve();
let backupPaused = false;
let currentUserProvider: (() => { uid: string; getIdToken(): Promise<string> } | null) | null = null;

export function registerAccountBackupAuthProvider(provider: (() => { uid: string; getIdToken(): Promise<string> } | null) | null) {
  currentUserProvider = provider;
}

export function requestAccountBackup() {
  if (Platform.OS === 'web' || backupPaused) return;
  const user = currentUserProvider?.() ?? null;
  if (!user) return;
  void AsyncStorage.setItem(pendingKey(user.uid), '1').catch(() => {});
  if (pendingTimer) clearTimeout(pendingTimer);
  pendingTimer = setTimeout(() => { pendingTimer = null; void flushAccountBackup(); }, 900);
}

export async function flushAccountBackup(): Promise<AccountBackupSummary | null> {
  if (Platform.OS === 'web' || backupPaused || AppState.currentState !== 'active') return null;
  if (running) return running;
  const user = currentUserProvider?.() ?? null;
  if (!user) return null;
  running = (async () => {
    const token = await user.getIdToken();
    await apiClient.registerAccount(token);
    const summary = await syncAccountBackup(token, user.uid);
    if (summary.pending) await AsyncStorage.setItem(pendingKey(user.uid), '1');
    else await AsyncStorage.removeItem(pendingKey(user.uid));
    return summary;
  })().catch(() => null).finally(() => { running = null; });
  return running;
}

export async function hasPendingAccountBackup(uid: string) {
  return (await AsyncStorage.getItem(pendingKey(uid))) === '1';
}

export function syncAccountBackup(idToken: string, uid: string): Promise<AccountBackupSummary> {
  if (backupPaused) return Promise.reject(new Error('Account backup is paused.'));
  const next = syncQueue.then(() => syncAccountBackupNow(idToken, uid));
  syncQueue = next.then(() => undefined, () => undefined);
  return next;
}

export async function pauseAccountBackup() {
  backupPaused = true;
  await syncQueue;
}

export function deactivateAccountLocalData() {
  const next = syncQueue.then(() => deactivateAccountLocalState());
  syncQueue = next.then(() => undefined, () => undefined);
  return next;
}

export function resumeAccountBackup() {
  backupPaused = false;
  requestAccountBackup();
}

async function syncAccountBackupNow(idToken: string, uid: string): Promise<AccountBackupSummary> {
  assertBackupOwner(uid);
  await activateAccountLocalState(uid);
  assertBackupOwner(uid);
  const raw = await AsyncStorage.getItem(SAVED_ROUTES_KEY);
  let localRoutes: SyncedRoute[] = [];
  if (raw !== null) {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isSyncedRoute)) throw new Error('Saved routes could not be read; no cloud changes were made.');
    localRoutes = parsed;
  }
  const draftRead = await listTripDrafts(AsyncStorage);
  if (draftRead.unreadable > 0) throw new Error('Some trip drafts could not be read. They have not been replaced.');
  const localDrafts = draftRead.records.filter(isSyncedTripDraft);
  const baselineRaw = await AsyncStorage.getItem(baselineKey(uid));
  const baseline = baselineRaw ? JSON.parse(baselineRaw) as AccountSyncSnapshot : null;
  const remote = (await apiClient.getAccountSync(idToken)).snapshot;
  assertBackupOwner(uid);
  const operations: AccountSyncOperation[] = [];
  let stagedOperations = await loadOutbox(uid);
  const conflictRecords = new Map((await listAccountConflicts(uid)).map((item) => [
    item.key,
    JSON.stringify({ kind: item.kind, local: item.local, cloud: item.cloud }),
  ]));
  const expiredOperations = stagedOperations.filter((operation) => operation.epoch !== remote.epoch);
  if (expiredOperations.length) {
    for (const operation of expiredOperations) {
      const conflict = preserveExpiredOperation(uid, operation, localRoutes, localDrafts, remote);
      if (conflict) conflictRecords.set(conflict[0], conflict[1]);
    }
    // Persist recoverable conflicts before removing old-epoch work from the
    // outbox. A crash between these writes can only repeat the same conflict.
    if (conflictRecords.size) await AsyncStorage.multiSet([...conflictRecords.entries()]);
    stagedOperations = stagedOperations.filter((operation) => operation.epoch === remote.epoch);
    await saveOutbox(uid, stagedOperations);
  }
  const pendingRouteSlugs = new Set(stagedOperations.flatMap((operation) => operation.type === 'put-route'
    ? [operation.value.slug] : operation.type === 'delete-route' ? [operation.slug] : []));
  const pendingDraftKeys = new Set(stagedOperations.flatMap((operation) => operation.type === 'put-draft'
    ? [tripDraftKey(operation.value.target)] : operation.type === 'delete-draft' ? [tripDraftKey(operation.target)] : []));

  for (const route of localRoutes) {
    if (pendingRouteSlugs.has(route.slug)) continue;
    if (conflictRecords.has(routeConflictPrefix(uid) + encodeURIComponent(route.slug))) continue;
    const cloud = remote.routes.find((item) => item.slug === route.slug) ?? null;
    const old = baseline?.routes.find((item) => item.slug === route.slug) ?? null;
    const localChanged = !same(old, route);
    const remoteChanged = baseline ? entityChanged(remote.entityRevisions.routes[route.slug], baseline.entityRevisions.routes[route.slug], !same(old, cloud)) : false;
    if (localChanged && !same(route, cloud) && ((remoteChanged) || (!baseline && cloud))) {
      conflictRecords.set(routeConflictPrefix(uid) + encodeURIComponent(route.slug), JSON.stringify({ kind: 'route', local: route, cloud }));
    } else if (localChanged && !same(route, cloud) && !remoteChanged) {
      const baseRevision = remote.entityRevisions.routes[route.slug] ?? 0;
      const operation = { epoch: remote.epoch, baseRevision, type: 'put-route' as const, value: route };
      operations.push({ ...operation, operationId: await deterministicOperationId(uid, operation) });
    }
  }

  for (const draft of localDrafts) {
    const key = tripDraftKey(draft.target);
    if (pendingDraftKeys.has(key)) continue;
    const revisionKey = key.slice(DRAFT_PREFIX.length);
    if (conflictRecords.has(draftConflictPrefix(uid) + hash(key))) continue;
    const cloud = remote.drafts.find((item) => tripDraftKey(item.target) === key) ?? null;
    const old = baseline?.drafts.find((item) => tripDraftKey(item.target) === key) ?? null;
    const localChanged = !same(old, draft);
    const remoteChanged = baseline ? entityChanged(remote.entityRevisions.drafts[revisionKey], baseline.entityRevisions.drafts[revisionKey], !same(old, cloud)) : false;
    if (localChanged && !same(draft, cloud) && ((remoteChanged) || (!baseline && cloud))) {
      conflictRecords.set(draftConflictPrefix(uid) + hash(key), JSON.stringify({ kind: 'draft', local: draft, cloud }));
    } else if (localChanged && !same(draft, cloud) && !remoteChanged) {
      const baseRevision = remote.entityRevisions.drafts[revisionKey] ?? 0;
      const operation = { epoch: remote.epoch, baseRevision, type: 'put-draft' as const, value: draft };
      operations.push({ ...operation, operationId: await deterministicOperationId(uid, operation) });
    }
  }

  if (baseline) {
    for (const route of baseline.routes) {
      if (localRoutes.some((item) => item.slug === route.slug)) continue;
      if (pendingRouteSlugs.has(route.slug)) continue;
      if (conflictRecords.has(routeConflictPrefix(uid) + encodeURIComponent(route.slug))) continue;
      const revision = remote.entityRevisions.routes[route.slug];
      if (revision !== undefined && revision !== baseline.entityRevisions.routes[route.slug]) {
        const cloud = remote.routes.find((item) => item.slug === route.slug);
        if (cloud) conflictRecords.set(routeConflictPrefix(uid) + encodeURIComponent(route.slug), JSON.stringify({ kind: 'route-delete', local: null, cloud }));
      } else if (revision !== undefined && remote.routes.some((item) => item.slug === route.slug)) {
        const operation = { epoch: remote.epoch, baseRevision: revision, type: 'delete-route' as const, slug: route.slug };
        operations.push({ ...operation, operationId: await deterministicOperationId(uid, operation) });
      }
    }
    for (const draft of baseline.drafts) {
      const key = tripDraftKey(draft.target);
      const revisionKey = key.slice(DRAFT_PREFIX.length);
      if (pendingDraftKeys.has(key)) continue;
      if (localDrafts.some((item) => tripDraftKey(item.target) === key)) continue;
      if (conflictRecords.has(draftConflictPrefix(uid) + hash(key))) continue;
      const revision = remote.entityRevisions.drafts[revisionKey];
      if (revision !== undefined && revision !== baseline.entityRevisions.drafts[revisionKey]) {
        const cloud = remote.drafts.find((item) => tripDraftKey(item.target) === key);
        if (cloud) conflictRecords.set(draftConflictPrefix(uid) + hash(key), JSON.stringify({ kind: 'draft-delete', local: null, cloud }));
      } else if (revision !== undefined && remote.drafts.some((item) => tripDraftKey(item.target) === key)) {
        const operation = { epoch: remote.epoch, baseRevision: revision, type: 'delete-draft' as const, target: draft.target };
        operations.push({ ...operation, operationId: await deterministicOperationId(uid, operation) });
      }
    }
  }

  const allOperations = [...stagedOperations, ...operations];
  await saveOutbox(uid, allOperations);
  let snapshot = remote;
  for (let offset = 0; offset < allOperations.length; offset += 10) {
    const batch = allOperations.slice(offset, offset + 10);
    const applied = await apiClient.applyAccountSync(idToken, {
      version: ACCOUNT_SYNC_VERSION, deviceId: await operationId(), epoch: remote.epoch, operations: batch,
    });
    snapshot = applied.snapshot;
    const acknowledged = new Set(applied.receipts.map((receipt) => receipt.operationId));
    const remaining = allOperations.filter((item) => !acknowledged.has(item.operationId));
    await saveOutbox(uid, remaining);
    for (const receipt of applied.receipts) {
      if (receipt.status !== 'conflict') continue;
      const operation = batch.find((item) => item.operationId === receipt.operationId);
      if (operation?.type === 'put-route') conflictRecords.set(routeConflictPrefix(uid) + encodeURIComponent(operation.value.slug), JSON.stringify({ kind: 'route', local: operation.value, cloud: receipt.entity }));
      if (operation?.type === 'put-draft') conflictRecords.set(draftConflictPrefix(uid) + hash(tripDraftKey(operation.value.target)), JSON.stringify({ kind: 'draft', local: operation.value, cloud: receipt.entity }));
      if (operation?.type === 'delete-route') conflictRecords.set(routeConflictPrefix(uid) + encodeURIComponent(operation.slug), JSON.stringify({ kind: 'route-delete', local: null, cloud: receipt.entity }));
      if (operation?.type === 'delete-draft') conflictRecords.set(draftConflictPrefix(uid) + hash(tripDraftKey(operation.target)), JSON.stringify({ kind: 'draft-delete', local: null, cloud: receipt.entity }));
    }
  }

  assertBackupOwner(uid);
  const existingConflictKeys = (await AsyncStorage.getAllKeys()).filter((key) =>
    key.startsWith(routeConflictPrefix(uid)) || key.startsWith(draftConflictPrefix(uid)));
  if (existingConflictKeys.length) await AsyncStorage.multiRemove(existingConflictKeys);
  if (conflictRecords.size) await AsyncStorage.multiSet([...conflictRecords.entries()]);
  const routeConflicts = new Set([...conflictRecords.keys()].filter((key) => key.startsWith(routeConflictPrefix(uid))).map((key) => decodeURIComponent(key.slice(routeConflictPrefix(uid).length))));
  const keptRoutes = new Map(snapshot.routes.map((item) => [item.slug, item]));
  const latestRaw = await AsyncStorage.getItem(SAVED_ROUTES_KEY);
  const latestRoutes: SyncedRoute[] = latestRaw ? JSON.parse(latestRaw) as SyncedRoute[] : [];
  const initialRoutes = new Map(localRoutes.map((item) => [item.slug, item]));
  for (const local of latestRoutes) {
    const initial = initialRoutes.get(local.slug);
    if (!same(initial, local) || routeConflicts.has(local.slug) || pendingRouteSlugs.has(local.slug)) keptRoutes.set(local.slug, local);
  }

  const draftConflicts = new Set([...conflictRecords.keys()].filter((key) => key.startsWith(draftConflictPrefix(uid))).map((key) => key.slice(draftConflictPrefix(uid).length)));
  const cloudDrafts = new Map(snapshot.drafts.map((item) => [tripDraftKey(item.target), item]));
  const latestDrafts = (await listTripDrafts(AsyncStorage)).records.filter(isSyncedTripDraft);
  const initialDrafts = new Map(localDrafts.map((item) => [tripDraftKey(item.target), item]));
  const latestDraftIds = new Set(latestDrafts.map((item) => tripDraftKey(item.target)));
  for (const old of localDrafts) {
    const key = tripDraftKey(old.target);
    if (!latestDraftIds.has(key) && !draftConflicts.has(hash(key))) cloudDrafts.delete(key);
  }
  for (const local of latestDrafts) {
    const key = tripDraftKey(local.target);
    if (!same(initialDrafts.get(key), local) || draftConflicts.has(hash(key)) || pendingDraftKeys.has(key)) cloudDrafts.set(key, local);
  }
  const latestRouteIds = new Set(latestRoutes.map((item) => item.slug));
  for (const old of localRoutes) if (!latestRouteIds.has(old.slug) && !routeConflicts.has(old.slug)) keptRoutes.delete(old.slug);
  await AsyncStorage.setItem(SAVED_ROUTES_KEY, JSON.stringify([...keptRoutes.values()]));
  notifySavedRoutesChanged();
  const storedKeys = (await AsyncStorage.getAllKeys()).filter((key) => key.startsWith(DRAFT_PREFIX));
  const nextKeys = new Set([...cloudDrafts.keys()].map((key) => DRAFT_PREFIX + key));
  await AsyncStorage.multiRemove(storedKeys.filter((key) => {
    const target = parseStoredDraftKey(key);
    return target !== null && !nextKeys.has(key) && !draftConflicts.has(hash(target));
  }));
  await AsyncStorage.multiSet([...cloudDrafts.values()].map((item) => [
    DRAFT_PREFIX + JSON.stringify([item.target.routeSlug, item.target.putInId, item.target.takeOutId]),
    JSON.stringify({ version: 1, ...item }),
  ]));
  await AsyncStorage.setItem(baselineKey(uid), JSON.stringify(snapshot));
  const pending = (await loadOutbox(uid)).length > 0;
  if (!pending && conflictRecords.size === 0) await markGuestMigrationRecoveryAcknowledged(uid);
  return { routes: keptRoutes.size, drafts: cloudDrafts.size, conflicts: conflictRecords.size, updatedAt: snapshot.updatedAt, pending };
}

async function loadOutbox(uid: string): Promise<AccountSyncOperation[]> {
  const raw = await AsyncStorage.getItem(accountOutboxKey(uid));
  if (raw === null) return [];
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { throw new Error('The pending sync queue could not be read. It was kept for recovery.'); }
  if (!Array.isArray(parsed) || !parsed.every((operation) => isAccountSyncRequest({
    version: ACCOUNT_SYNC_VERSION,
    deviceId: '00000000-0000-4000-8000-000000000000',
    epoch: operation && typeof operation === 'object' && 'epoch' in operation ? operation.epoch : 0,
    operations: [operation],
  }))) throw new Error('The pending sync queue is invalid. It was kept for recovery.');
  return parsed as AccountSyncOperation[];
}

async function saveOutbox(uid: string, operations: AccountSyncOperation[]) {
  const key = accountOutboxKey(uid);
  if (operations.length) await AsyncStorage.setItem(key, JSON.stringify(operations));
  else await AsyncStorage.removeItem(key);
}

function preserveExpiredOperation(
  uid: string,
  operation: AccountSyncOperation,
  localRoutes: SyncedRoute[],
  localDrafts: SyncedTripDraft[],
  remote: AccountSyncSnapshot,
): [string, string] | null {
  if (operation.type === 'put-route' || operation.type === 'delete-route') {
    const slug = operation.type === 'put-route' ? operation.value.slug : operation.slug;
    const local = localRoutes.find((item) => item.slug === slug)
      ?? (operation.type === 'put-route' ? operation.value : null);
    const cloud = remote.routes.find((item) => item.slug === slug) ?? null;
    if (same(local, cloud)) return null;
    const kind: AccountConflict['kind'] = local ? 'route' : 'route-delete';
    return [routeConflictPrefix(uid) + encodeURIComponent(slug), JSON.stringify({ kind, local, cloud })];
  }

  const target = operation.type === 'put-draft' ? operation.value.target : operation.target;
  const key = tripDraftKey(target);
  const local = localDrafts.find((item) => tripDraftKey(item.target) === key)
    ?? (operation.type === 'put-draft' ? operation.value : null);
  const cloud = remote.drafts.find((item) => tripDraftKey(item.target) === key) ?? null;
  if (same(local, cloud)) return null;
  const kind: AccountConflict['kind'] = local ? 'draft' : 'draft-delete';
  return [draftConflictPrefix(uid) + hash(key), JSON.stringify({ kind, local, cloud })];
}

export interface AccountConflict {
  key: string;
  kind: 'route' | 'draft' | 'route-delete' | 'draft-delete';
  local: SyncedRoute | SyncedTripDraft | null;
  cloud: SyncedRoute | SyncedTripDraft | null;
}

export async function listAccountConflicts(uid: string): Promise<AccountConflict[]> {
  const keys = (await AsyncStorage.getAllKeys()).filter((key) => key.startsWith(routeConflictPrefix(uid)) || key.startsWith(draftConflictPrefix(uid)));
  const entries = await AsyncStorage.multiGet(keys);
  const result: AccountConflict[] = [];
  for (const [key, raw] of entries) {
    try {
      const value: unknown = JSON.parse(raw ?? '');
      if (typeof value === 'object' && value !== null && 'kind' in value && 'local' in value && 'cloud' in value
        && ['route', 'draft', 'route-delete', 'draft-delete'].includes(String(value.kind))) {
        result.push({ key, kind: value.kind as AccountConflict['kind'], local: value.local as AccountConflict['local'], cloud: value.cloud as AccountConflict['cloud'] });
      }
    } catch { /* Keep an unreadable conflict untouched for recovery. */ }
  }
  return result;
}

export async function resolveAccountConflict(uid: string, conflict: AccountConflict, choice: 'local' | 'cloud') {
  if (conflict.kind.startsWith('route')) {
    const raw = await AsyncStorage.getItem(SAVED_ROUTES_KEY);
    const current: SyncedRoute[] = raw ? JSON.parse(raw) as SyncedRoute[] : [];
    const chosen = choice === 'local' ? conflict.local as SyncedRoute | null : conflict.cloud as SyncedRoute | null;
    const identity = (chosen ?? conflict.local ?? conflict.cloud) as SyncedRoute | null;
    if (identity) {
      const next = current.filter((item) => item.slug !== identity.slug);
      if (chosen) next.push(chosen);
      await AsyncStorage.setItem(SAVED_ROUTES_KEY, JSON.stringify(next));
      notifySavedRoutesChanged();
    }
  } else {
    const chosen = choice === 'local' ? conflict.local as SyncedTripDraft | null : conflict.cloud as SyncedTripDraft | null;
    const identity = (chosen ?? conflict.local ?? conflict.cloud) as SyncedTripDraft | null;
    if (identity) {
      const key = tripDraftKey(identity.target);
      if (chosen) await AsyncStorage.setItem(key, JSON.stringify({ version: 1, ...chosen }));
      else await AsyncStorage.removeItem(key);
    }
  }
  await AsyncStorage.setItem(pendingKey(uid), '1');
  await AsyncStorage.removeItem(conflict.key);
  requestAccountBackup();
}

function entityChanged(revision: number | undefined, baselineRevision: number | undefined, contentChanged: boolean) {
  if (revision !== undefined && baselineRevision !== undefined) return revision !== baselineRevision;
  return contentChanged;
}
function assertBackupOwner(uid: string) {
  if (!currentUserProvider) return;
  const current = currentUserProvider();
  if (!current || current.uid !== uid) throw new Error('Account changed during backup.');
}
function same(left: unknown, right: unknown) {
  return JSON.stringify(left) === JSON.stringify(right);
}
function parseStoredDraftKey(key: string) {
  try {
    const target: unknown = JSON.parse(key.slice(DRAFT_PREFIX.length));
    return Array.isArray(target) && target.length === 3 ? JSON.stringify(target) : null;
  } catch { return null; }
}
async function operationId() { return Crypto.randomUUID(); }
async function deterministicOperationId(uid: string, operation: unknown) {
  const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, JSON.stringify([uid, operation]));
  const hex = digest.slice(0, 32).split('');
  hex[12] = '5';
  hex[16] = ((Number.parseInt(hex[16]!, 16) & 0x3) | 0x8).toString(16);
  const value = hex.join('');
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
}
function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) result = Math.imul(result ^ value.charCodeAt(index), 16777619);
  return (result >>> 0).toString(36);
}
