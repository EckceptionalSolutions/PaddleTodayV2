import AsyncStorage from '@react-native-async-storage/async-storage';
import { notifySavedRoutesChanged } from './account-storage-events';

const SAVED_ROUTES_KEY = 'paddletoday:saved-rivers';
const DRAFT_PREFIX = 'paddletoday:trip-draft:v1:';
const OFFLINE_PREFIXES = ['paddletoday:offline-trip:v1:', 'paddletoday:offline-trip-data:v1:'];
const OWNER_KEY = 'paddletoday:account-local-owner';
const IMPORT_CONSENT_KEY = 'paddletoday:guest-import-consent';
const LOCAL_STATE_PREFIX = 'paddletoday:account-local:v1:';
const TRANSITION_KEY = 'paddletoday:account-local-transition';
const MIGRATION_RECOVERY_OWNER_PREFIX = '@migration-recovery:';
const MIGRATION_RECOVERY_TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface LocalStateTransition {
  from: string | null;
  to: string | null;
  phase: 'archiving' | 'activating' | 'merging' | 'clearing';
}

export async function grantGuestImportConsent() {
  await setGuestChoice('import');
}

export async function grantGuestKeepSeparateConsent() {
  await setGuestChoice('separate');
}

async function setGuestChoice(choice: 'import' | 'separate') {
  await AsyncStorage.setItem(IMPORT_CONSENT_KEY, JSON.stringify({ choice, expiresAt: Date.now() + 24 * 60 * 60 * 1000 }));
}

export async function clearGuestImportConsent() {
  await AsyncStorage.removeItem(IMPORT_CONSENT_KEY);
}

export async function markGuestMigrationRecoveryAcknowledged(uid: string) {
  const recoveryPrefix = namespacePrefix(MIGRATION_RECOVERY_OWNER_PREFIX + uid);
  const retainedAt = Number(await AsyncStorage.getItem(recoveryPrefix + 'retained-at'));
  if (!Number.isFinite(retainedAt) || retainedAt <= 0) return;
  const acknowledgedAtKey = recoveryPrefix + 'acknowledged-at';
  if (await AsyncStorage.getItem(acknowledgedAtKey) === null) {
    await AsyncStorage.setItem(acknowledgedAtKey, String(Date.now()));
  }
}

export async function activateAccountLocalState(uid: string) {
  await finishPendingTransition();
  await purgeExpiredMigrationRecovery();
  const owner = await AsyncStorage.getItem(OWNER_KEY);
  if (owner === uid) {
    await clearGuestImportConsent();
    await removeNamespace(uid);
    return;
  }

  const activeKeys = await activeAccountDataKeys();
  const hasActiveData = await activeGuestDataExists(activeKeys);
  const consent = await AsyncStorage.getItem(IMPORT_CONSENT_KEY);
  let guestChoice: 'import' | 'separate' | null = null;
  try {
    const parsed: unknown = JSON.parse(consent ?? 'null');
    if (typeof parsed === 'object' && parsed !== null && 'expiresAt' in parsed && 'choice' in parsed
      && typeof parsed.expiresAt === 'number' && parsed.expiresAt > Date.now()
      && (parsed.choice === 'import' || parsed.choice === 'separate')) guestChoice = parsed.choice;
  } catch { /* An invalid or expired consent marker never authorizes import. */ }

  if (!owner && hasActiveData && !guestChoice) throw new Error('guest_import_consent_required');
  const transition: LocalStateTransition = owner
    ? { from: owner, to: uid, phase: 'archiving' }
    : !owner && hasActiveData && guestChoice
      ? { from: '@guest', to: uid, phase: 'archiving' }
      : { from: null, to: uid, phase: 'activating' };
  await AsyncStorage.setItem(TRANSITION_KEY, JSON.stringify(transition));
  await finishPendingTransition();
  await clearGuestImportConsent();
  notifySavedRoutesChanged();
}

export async function clearAccountLocalOwner(uid: string) {
  const owner = await AsyncStorage.getItem(OWNER_KEY);
  if (owner === uid) {
    await AsyncStorage.removeItem(OWNER_KEY);
    await clearGuestImportConsent();
  }
  const keys = await AsyncStorage.getAllKeys();
  const privateCacheKeys = keys.filter((key) => key.startsWith(namespacePrefix(uid))
    || key.startsWith(namespacePrefix(MIGRATION_RECOVERY_OWNER_PREFIX + uid)));
  if (privateCacheKeys.length) await AsyncStorage.multiRemove(privateCacheKeys);
  return owner === uid;
}

export async function deactivateAccountLocalState() {
  await finishPendingTransition();
  const owner = await AsyncStorage.getItem(OWNER_KEY);
  if (!owner) return;
  await AsyncStorage.setItem(TRANSITION_KEY, JSON.stringify({ from: owner, to: null, phase: 'archiving' } satisfies LocalStateTransition));
  await finishPendingTransition();
}

export async function restoreGuestLocalState() {
  await finishPendingTransition();
  const owner = await AsyncStorage.getItem(OWNER_KEY);
  if (owner) return;
  const keys = await activeAccountDataKeys();
  if (await activeGuestDataExists(keys)) return;
  await replaceActiveStateWithNamespace('@guest', keys);
  await AsyncStorage.removeItem(OWNER_KEY);
  notifySavedRoutesChanged();
}

async function finishPendingTransition() {
  const raw = await AsyncStorage.getItem(TRANSITION_KEY);
  if (raw === null) return;
  let transition: LocalStateTransition;
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== 'object' || value === null || !('phase' in value) || !('from' in value) || !('to' in value)
      || !['archiving', 'activating', 'merging', 'clearing'].includes(String(value.phase))
      || !(value.from === null || typeof value.from === 'string') || !(value.to === null || typeof value.to === 'string')) throw new Error();
    transition = value as LocalStateTransition;
  } catch { throw new Error('The account data switch could not be read. Personal data was left untouched.'); }

  if (transition.phase === 'archiving') {
    if (transition.from) await archiveActiveState(transition.from, await activeAccountDataKeys());
    transition.phase = transition.from === '@guest' && await shouldImportGuestState(transition.to)
      ? 'merging' : transition.to ? 'activating' : 'clearing';
    await AsyncStorage.setItem(TRANSITION_KEY, JSON.stringify(transition));
  }
  if (transition.phase === 'merging') {
    if (!transition.to) throw new Error('The guest data import could not be resumed. Personal data was left untouched.');
    await mergeGuestStateWithAccountCache(transition.to);
    await archiveActiveState(transition.to, await activeAccountDataKeys());
    await retainImportedGuestRecovery(transition.to);
    await AsyncStorage.setItem(OWNER_KEY, transition.to);
    await AsyncStorage.removeItem(TRANSITION_KEY);
    await removeNamespace(transition.to);
    return;
  }
  if (transition.phase === 'activating') {
    if (!transition.to) throw new Error('The account data switch could not be resumed. Personal data was left untouched.');
    await replaceActiveStateWithNamespace(transition.to, await activeAccountDataKeys(), transition.from === null);
    await AsyncStorage.setItem(OWNER_KEY, transition.to);
    await AsyncStorage.removeItem(TRANSITION_KEY);
    await removeNamespace(transition.to);
    return;
  }
  if (transition.phase === 'clearing') {
    await AsyncStorage.setItem(SAVED_ROUTES_KEY, '[]');
    const keys = (await activeAccountDataKeys()).filter((key) => key.startsWith(DRAFT_PREFIX) || isOfflineTripKey(key));
    if (keys.length) await AsyncStorage.multiRemove(keys);
    await AsyncStorage.removeItem(OWNER_KEY);
    await AsyncStorage.removeItem(TRANSITION_KEY);
    notifySavedRoutesChanged();
  }
}

async function shouldImportGuestState(uid: string | null) {
  if (!uid) return false;
  const raw = await AsyncStorage.getItem(IMPORT_CONSENT_KEY);
  try {
    const value: unknown = JSON.parse(raw ?? 'null');
    return typeof value === 'object' && value !== null && 'choice' in value && value.choice === 'import';
  } catch { return false; }
}

async function retainImportedGuestRecovery(uid: string) {
  const guestPrefix = namespacePrefix('@guest');
  const recoveryPrefix = namespacePrefix(MIGRATION_RECOVERY_OWNER_PREFIX + uid);
  const allKeys = await AsyncStorage.getAllKeys();
  const guestKeys = allKeys.filter((key) => key.startsWith(guestPrefix));
  if (!guestKeys.length) return;
  const values = await AsyncStorage.multiGet(guestKeys);
  const recoveryTimeKey = recoveryPrefix + 'retained-at';
  const acknowledgedAtKey = recoveryPrefix + 'acknowledged-at';
  const recoveryValues = values.flatMap(([key, value]) => value === null ? [] : [[
    recoveryPrefix + key.slice(guestPrefix.length), value,
  ] as [string, string]]);
  recoveryValues.push([recoveryTimeKey, String(Date.now())]);
  if (recoveryValues.length) await AsyncStorage.multiSet(recoveryValues);
  await AsyncStorage.removeItem(acknowledgedAtKey);
  await removeNamespace('@guest');
}

async function purgeExpiredMigrationRecovery() {
  const keys = await AsyncStorage.getAllKeys();
  const prefixes = new Set(keys.filter((key) => key.startsWith(namespacePrefix(MIGRATION_RECOVERY_OWNER_PREFIX)))
    .map((key) => LOCAL_STATE_PREFIX + key.slice(LOCAL_STATE_PREFIX.length).split(':', 1)[0] + ':'));
  const expiredPrefixes: string[] = [];
  for (const prefix of prefixes) {
    const raw = await AsyncStorage.getItem(prefix + 'acknowledged-at');
    const acknowledgedAt = Number(raw);
    if (Number.isFinite(acknowledgedAt) && Date.now() - acknowledgedAt >= MIGRATION_RECOVERY_TTL_MS) expiredPrefixes.push(prefix);
  }
  const expiredKeys = keys.filter((key) => expiredPrefixes.some((prefix) => key.startsWith(prefix)));
  if (expiredKeys.length) await AsyncStorage.multiRemove(expiredKeys);
}

function namespacePrefix(uid: string) { return LOCAL_STATE_PREFIX + encodeURIComponent(uid) + ':'; }

async function activeAccountDataKeys() {
  return (await AsyncStorage.getAllKeys()).filter((key) => key === SAVED_ROUTES_KEY || key.startsWith(DRAFT_PREFIX) || isOfflineTripKey(key));
}

function isOfflineTripKey(key: string) { return OFFLINE_PREFIXES.some((prefix) => key.startsWith(prefix)); }

async function activeGuestDataExists(keys: string[]) {
  const [routes, drafts] = await Promise.all([
    AsyncStorage.getItem(SAVED_ROUTES_KEY),
    Promise.resolve(keys.some((key) => key.startsWith(DRAFT_PREFIX))),
  ]);
  if (drafts || keys.some(isOfflineTripKey)) return true;
  if (!routes) return false;
  try { const value: unknown = JSON.parse(routes); return !Array.isArray(value) || value.length > 0; }
  catch { return true; }
}

async function archiveActiveState(owner: string, activeKeys: string[]) {
  const values = await AsyncStorage.multiGet(activeKeys);
  const prefix = namespacePrefix(owner);
  const archived = values.flatMap(([key, value]) => value === null ? [] : [[
    key === SAVED_ROUTES_KEY ? prefix + 'saved-rivers'
      : key.startsWith(DRAFT_PREFIX) ? prefix + 'trip-draft:v1:' + key.slice(DRAFT_PREFIX.length)
        : prefix + 'offline:' + key.slice('paddletoday:'.length),
    value,
  ] as [string, string]]);
  if (archived.length) await AsyncStorage.multiSet(archived);
}

async function replaceActiveStateWithNamespace(uid: string, previousActiveKeys: string[], preserveGuestOffline = false) {
  const prefix = namespacePrefix(uid);
  const allKeys = await AsyncStorage.getAllKeys();
  const cacheKeys = allKeys.filter((key) => key.startsWith(prefix));
  const cacheValues = await AsyncStorage.multiGet(cacheKeys);
  const saved = cacheValues.find(([key]) => key === prefix + 'saved-rivers')?.[1] ?? '[]';
  const draftValues = cacheValues.flatMap(([key, value]) => key.startsWith(prefix + 'trip-draft:v1:') && value !== null
    ? [[DRAFT_PREFIX + key.slice((prefix + 'trip-draft:v1:').length), value] as [string, string]] : []);
  const offlineMap = new Map(cacheValues.flatMap(([key, value]) => key.startsWith(prefix + 'offline:') && value !== null
    ? [['paddletoday:' + key.slice((prefix + 'offline:').length), value] as [string, string]] : []));
  if (preserveGuestOffline) {
    const activeValues = await AsyncStorage.multiGet(previousActiveKeys.filter(isOfflineTripKey));
    for (const [key, value] of activeValues) if (value !== null) offlineMap.set(key, value);
  }
  const offlineValues = [...offlineMap.entries()];
  const nextPrivateKeys = new Set([...draftValues, ...offlineValues].map(([key]) => key));
  const staleDraftKeys = previousActiveKeys.filter((key) => (key.startsWith(DRAFT_PREFIX) || isOfflineTripKey(key)) && !nextPrivateKeys.has(key));
  await AsyncStorage.setItem(SAVED_ROUTES_KEY, saved);
  if (staleDraftKeys.length) await AsyncStorage.multiRemove(staleDraftKeys);
  if (draftValues.length) await AsyncStorage.multiSet(draftValues);
  if (offlineValues.length) await AsyncStorage.multiSet(offlineValues);
}

async function mergeGuestStateWithAccountCache(uid: string) {
  const prefix = namespacePrefix(uid);
  const guestPrefix = namespacePrefix('@guest');
  const allKeys = await AsyncStorage.getAllKeys();
  const cacheKeys = allKeys.filter((key) => key.startsWith(prefix));
  const guestKeys = allKeys.filter((key) => key.startsWith(guestPrefix));
  const [guestValues, accountValues] = await Promise.all([
    AsyncStorage.multiGet(guestKeys),
    AsyncStorage.multiGet(cacheKeys),
  ]);
  const routes = new Map<string, Record<string, unknown>>();
  for (const [key, value] of accountValues) {
    if (key !== prefix + 'saved-rivers' || value === null) continue;
    let parsed: unknown;
    try { parsed = JSON.parse(value); } catch { throw new Error('The saved account copy could not be read. It was kept for recovery.'); }
    if (!Array.isArray(parsed) || !parsed.every((route) => typeof route === 'object' && route !== null && 'slug' in route && typeof route.slug === 'string')) {
      throw new Error('The saved account copy could not be read. It was kept for recovery.');
    }
    for (const route of parsed) routes.set(route.slug, route as Record<string, unknown>);
  }
  for (const [key, value] of guestValues) {
    if (key !== guestPrefix + 'saved-rivers' || value === null) continue;
    let parsed: unknown;
    try { parsed = JSON.parse(value); } catch { throw new Error('The guest saved routes could not be read. They were kept for recovery.'); }
    if (!Array.isArray(parsed) || !parsed.every((route) => typeof route === 'object' && route !== null && 'slug' in route && typeof route.slug === 'string')) {
      throw new Error('The guest saved routes could not be read. They were kept for recovery.');
    }
    for (const route of parsed) routes.set(route.slug, route as Record<string, unknown>);
  }
  const drafts = new Map<string, string>();
  for (const [key, value] of accountValues) {
    if (key.startsWith(prefix + 'trip-draft:v1:') && value !== null) {
      drafts.set(DRAFT_PREFIX + key.slice((prefix + 'trip-draft:v1:').length), value);
    }
  }
  for (const [key, value] of guestValues) {
    if (key.startsWith(guestPrefix + 'trip-draft:v1:') && value !== null) {
      drafts.set(DRAFT_PREFIX + key.slice((guestPrefix + 'trip-draft:v1:').length), value);
    }
  }
  const offline = new Map<string, string>();
  for (const [key, value] of accountValues) {
    if (key.startsWith(prefix + 'offline:') && value !== null) offline.set('paddletoday:' + key.slice((prefix + 'offline:').length), value);
  }
  for (const [key, value] of guestValues) {
    if (key.startsWith(guestPrefix + 'offline:') && value !== null) {
      offline.set('paddletoday:' + key.slice((guestPrefix + 'offline:').length), value);
    }
  }
  const nextDrafts = [...drafts.entries()];
  const nextOffline = [...offline.entries()];
  const activeKeys = await activeAccountDataKeys();
  await AsyncStorage.setItem(SAVED_ROUTES_KEY, JSON.stringify([...routes.values()]));
  const nextPrivateKeys = new Set([...nextDrafts, ...nextOffline].map(([key]) => key));
  const staleDrafts = activeKeys.filter((key) => (key.startsWith(DRAFT_PREFIX) || isOfflineTripKey(key)) && !nextPrivateKeys.has(key));
  if (staleDrafts.length) await AsyncStorage.multiRemove(staleDrafts);
  if (nextDrafts.length) await AsyncStorage.multiSet(nextDrafts);
  if (nextOffline.length) await AsyncStorage.multiSet(nextOffline);
}

async function removeNamespace(uid: string) {
  const prefix = namespacePrefix(uid);
  const keys = (await AsyncStorage.getAllKeys()).filter((key) => key.startsWith(prefix));
  if (keys.length) await AsyncStorage.multiRemove(keys);
}
