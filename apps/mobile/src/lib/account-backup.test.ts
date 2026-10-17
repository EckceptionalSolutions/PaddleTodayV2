import { beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({ values: new Map<string, string>(), uid: 'account-a' }));
const native = vi.hoisted(() => ({ AppState: { currentState: 'active' }, Platform: { OS: 'android' } }));
const local = vi.hoisted(() => ({ active: vi.fn(), activate: vi.fn(), deactivate: vi.fn(), consent: vi.fn(), acknowledge: vi.fn() }));
const api = vi.hoisted(() => ({ getAccountSync: vi.fn(), syncAccount: vi.fn() }));
const storage = vi.hoisted(() => ({
  getItem: vi.fn(async (key: string) => state.values.get(key) ?? null),
  setItem: vi.fn(async (key: string, value: string) => { state.values.set(key, value); }),
  removeItem: vi.fn(async (key: string) => { state.values.delete(key); }),
  getAllKeys: vi.fn(async () => [...state.values.keys()]),
  multiGet: vi.fn(async (keys: string[]) => keys.map(key => [key, state.values.get(key) ?? null])),
  multiSet: vi.fn(async (entries: [string, string][]) => {
    if (!entries.length) throw new Error('Empty native batch');
    entries.forEach(([key, value]) => state.values.set(key, value));
  }),
  multiRemove: vi.fn(async (keys: string[]) => {
    if (!keys.length) throw new Error('Empty native batch');
    keys.forEach(key => state.values.delete(key));
  }),
}));
vi.mock('@react-native-async-storage/async-storage', () => ({ default: storage }));
vi.mock('react-native', () => native);
vi.mock('expo-crypto', () => ({ CryptoDigestAlgorithm: { SHA256: 'SHA256' }, digestStringAsync: vi.fn() }));
vi.mock('../api/client', () => ({ apiClient: api }));
vi.mock('./account-storage-events', () => ({ notifySavedRoutesChanged: vi.fn() }));
vi.mock('./account-local-state', () => ({ activateAccountLocalState: local.activate, deactivateAccountLocalState: local.deactivate,
  accountLocalStateIsActive: local.active, grantGuestImportConsent: local.consent, markGuestMigrationRecoveryAcknowledged: local.acknowledge }));
vi.mock('./trip-drafts', () => ({ listTripDrafts: async () => ({ records: [], unreadable: 0 }), tripDraftKey: vi.fn() }));

import { deactivateAccountLocalData, flushAccountBackup, lastSuccessfulSyncKey, prepareAccountLocalData, registerAccountBackupAuthProvider, requestAccountBackup, syncAccountBackup } from './account-backup';

const snapshot = () => ({ version: 1, epoch: 0, revision: 0, updatedAt: null,
  routes: [], drafts: [], receipts: [], entityRevisions: { routes: {}, drafts: {} } });

beforeEach(() => {
  vi.clearAllMocks();
  state.values.clear(); state.uid = 'account-a';
  local.activate.mockReset().mockResolvedValue(undefined);
  local.active.mockReset().mockResolvedValue(false);
  local.consent.mockReset().mockResolvedValue(undefined);
  api.getAccountSync.mockReset().mockResolvedValue({ snapshot: snapshot() });
  registerAccountBackupAuthProvider(() => ({ uid: state.uid, getIdToken: async () => 'token' }));
});

describe('account preparation and backup', () => {
  it('automatically authorizes guest import only when the namespace requires it', async () => {
    local.activate.mockRejectedValueOnce(new Error('guest_import_consent_required'));
    await prepareAccountLocalData('account-a');
    expect(local.consent).toHaveBeenCalledOnce();
    expect(local.activate).toHaveBeenCalledTimes(2);
    expect(api.getAccountSync).not.toHaveBeenCalled();
  });

  it('does not treat unreadable local data as permission to import or replace it', async () => {
    local.activate.mockRejectedValueOnce(new Error('Local recovery copy is unreadable'));
    await expect(prepareAccountLocalData('account-a')).rejects.toThrow('unreadable');
    expect(local.consent).not.toHaveBeenCalled();
    expect(api.getAccountSync).not.toHaveBeenCalled();
  });

  it('stops an old account before granting consent when the signed-in user changes', async () => {
    local.activate.mockImplementationOnce(async () => { state.uid = 'account-b'; throw new Error('guest_import_consent_required'); });
    await expect(prepareAccountLocalData('account-a')).rejects.toThrow('Account changed');
    expect(local.consent).not.toHaveBeenCalled();
  });

  it('serializes sign-out behind local preparation', async () => {
    let release!: () => void;
    local.activate.mockImplementationOnce(() => new Promise<void>(resolve => { release = resolve; }));
    const preparation = prepareAccountLocalData('account-a');
    await vi.waitFor(() => expect(local.activate).toHaveBeenCalledOnce());
    const signOut = deactivateAccountLocalData();
    await Promise.resolve();
    expect(local.deactivate).not.toHaveBeenCalled();
    release();
    await Promise.all([preparation, signOut]);
    expect(local.deactivate).toHaveBeenCalledOnce();
  });

  it('syncs an empty account without empty native write batches and records this device’s successful sync', async () => {
    const summary = await syncAccountBackup('token', 'account-a');
    expect(storage.multiSet).not.toHaveBeenCalled();
    expect(storage.multiRemove).not.toHaveBeenCalled();
    expect(summary.updatedAt).toBeNull();
    expect(Date.parse(summary.lastSyncedAt!)).toBeGreaterThan(0);
    expect(state.values.get(lastSuccessfulSyncKey('account-a'))).toBe(summary.lastSyncedAt);
    expect(local.acknowledge).toHaveBeenCalledWith('account-a');
  });

  it('keeps the previous successful sync time and recovery data after a network failure', async () => {
    const previous = '2026-10-01T12:00:00Z';
    state.values.set(lastSuccessfulSyncKey('account-a'), previous);
    api.getAccountSync.mockRejectedValueOnce(new Error('Offline'));
    await expect(syncAccountBackup('token', 'account-a')).rejects.toThrow('Offline');
    expect(state.values.get(lastSuccessfulSyncKey('account-a'))).toBe(previous);
    expect(local.acknowledge).not.toHaveBeenCalled();
  });

  it('does not overwrite unreadable routes with an empty cloud response', async () => {
    state.values.set('paddletoday:saved-rivers', '{unreadable');
    await expect(syncAccountBackup('token', 'account-a')).rejects.toThrow();
    expect(state.values.get('paddletoday:saved-rivers')).toBe('{unreadable');
    expect(api.getAccountSync).not.toHaveBeenCalled();
  });

  it('does not acknowledge recovery or advance the successful sync time while conflicts remain', async () => {
    const previous = '2026-10-01T12:00:00Z';
    state.values.set(lastSuccessfulSyncKey('account-a'), previous);
    state.values.set('paddletoday:account-conflict:account-a:route:local-route', JSON.stringify({
      kind: 'route', local: { slug: 'local-route', notes: 'Keep both copies' }, cloud: null,
    }));
    const summary = await syncAccountBackup('token', 'account-a');
    expect(summary.conflicts).toBe(1);
    expect(summary.lastSyncedAt).toBe(previous);
    expect(local.acknowledge).not.toHaveBeenCalled();
  });

  it('lets an already prepared account continue while the cloud request remains pending', async () => {
    local.active.mockResolvedValue(true);
    let release!: (value: unknown) => void;
    api.getAccountSync.mockImplementationOnce(() => new Promise(resolve => { release = resolve; }));
    const cloudSync = syncAccountBackup('token', 'account-a');
    await vi.waitFor(() => expect(api.getAccountSync).toHaveBeenCalledOnce());
    await expect(prepareAccountLocalData('account-a')).resolves.toBeUndefined();
    release({ snapshot: snapshot() });
    await cloudSync;
  });

  it('retains edits made during a slow backup and does not mark them fully synced', async () => {
    vi.useFakeTimers();
    try {
      local.active.mockResolvedValue(true);
      const previous = '2026-10-01T12:00:00Z';
      state.values.set(lastSuccessfulSyncKey('account-a'), previous);
      let release!: (value: unknown) => void;
      let started!: () => void;
      const remoteStarted = new Promise<void>(resolve => { started = resolve; });
      api.getAccountSync.mockImplementationOnce(() => { started(); return new Promise(resolve => { release = resolve; }); });
      const cloudSync = flushAccountBackup();
      await remoteStarted;
      state.values.set('paddletoday:saved-rivers', JSON.stringify([{ slug: 'new-route', name: 'New River',
        reach: 'Launch to landing', savedAt: '2026-10-17T12:00:00Z', notes: 'New note' }]));
      requestAccountBackup();
      // Let the save debounce fire before the original cloud request finishes.
      await vi.advanceTimersByTimeAsync(901);
      expect(vi.getTimerCount()).toBe(0);
      release({ snapshot: snapshot() });
      const summary = (await cloudSync)!;
      expect(summary.pending).toBe(true);
      expect(summary.lastSyncedAt).toBe(previous);
      expect(state.values.get('paddletoday:saved-rivers')).toContain('New note');
      expect(local.acknowledge).not.toHaveBeenCalled();
      expect(vi.getTimerCount()).toBe(1);
    } finally { vi.clearAllTimers(); vi.useRealTimers(); }
  });
});
