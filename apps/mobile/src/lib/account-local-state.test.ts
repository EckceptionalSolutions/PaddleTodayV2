import { beforeEach, describe, expect, it, vi } from 'vitest';

const values = vi.hoisted(() => new Map<string, string>());
const storage = vi.hoisted(() => ({
  getItem: vi.fn(async (key: string) => values.get(key) ?? null),
  setItem: vi.fn(async (key: string, value: string) => { values.set(key, value); }),
  removeItem: vi.fn(async (key: string) => { values.delete(key); }),
  getAllKeys: vi.fn(async () => [...values.keys()]),
  multiGet: vi.fn(async (keys: string[]) => keys.map(key => [key, values.get(key) ?? null])),
  multiSet: vi.fn(async (entries: [string, string][]) => { entries.forEach(([key, value]) => values.set(key, value)); }),
  multiRemove: vi.fn(async (keys: string[]) => { keys.forEach(key => values.delete(key)); }),
}));
vi.mock('@react-native-async-storage/async-storage', () => ({ default: storage }));
vi.mock('./account-storage-events', () => ({ notifySavedRoutesChanged: vi.fn() }));
import { activateAccountLocalState, deactivateAccountLocalState, grantGuestImportConsent, markGuestMigrationRecoveryAcknowledged } from './account-local-state';

const routesKey = 'paddletoday:saved-rivers';
const ownerKey = 'paddletoday:account-local-owner';
const prefix = (uid: string) => 'paddletoday:account-local:v1:' + encodeURIComponent(uid) + ':';
const recovery = (uid: string) => prefix('@migration-recovery:' + uid);
const guestRoutes = JSON.stringify([{ slug: 'guest-route', note: 'Guest note' }]);
const draftKey = 'paddletoday:trip-draft:v1:["guest-route",null,null]';
const offlineKey = 'paddletoday:offline-trip:v1:guest-route';

beforeEach(() => {
  vi.clearAllMocks(); values.clear();
  values.set(routesKey, guestRoutes);
  values.set(draftKey, '{"note":"Guest trip plan"}');
  values.set(offlineKey, '{"packet":"downloaded map"}');
});

describe('guest recovery and account isolation', () => {
  it('preserves routes, trip plans, and downloads before activating the account', async () => {
    await grantGuestImportConsent();
    await activateAccountLocalState('account-a');
    expect(values.get(ownerKey)).toBe('account-a');
    expect(values.get(routesKey)).toBe(guestRoutes);
    expect(values.get(recovery('account-a') + 'saved-rivers')).toBe(guestRoutes);
    expect(values.get(recovery('account-a') + draftKey.slice('paddletoday:'.length))).toBe(values.get(draftKey));
    expect(values.get(recovery('account-a') + 'offline:' + offlineKey.slice('paddletoday:'.length))).toBe(values.get(offlineKey));
    expect([...values.keys()].some(key => key.startsWith(prefix('@guest')))).toBe(false);
  });

  it('does not import the first account’s data into a second account', async () => {
    await grantGuestImportConsent();
    await activateAccountLocalState('account-a');
    await activateAccountLocalState('account-b');
    expect(values.get(ownerKey)).toBe('account-b');
    expect(values.get(routesKey)).toBe('[]');
    expect(values.has(draftKey)).toBe(false);
    expect(values.has(offlineKey)).toBe(false);
    expect(values.get(prefix('account-a') + 'saved-rivers')).toBe(guestRoutes);
    expect(values.get(recovery('account-a') + 'saved-rivers')).toBe(guestRoutes);
  });

  it('resumes an interrupted recovery-copy write before changing ownership', async () => {
    await grantGuestImportConsent();
    storage.multiSet.mockRejectedValueOnce(new Error('Storage full'));
    await expect(activateAccountLocalState('account-a')).rejects.toThrow('Storage full');
    expect(values.get(routesKey)).toBe(guestRoutes);
    expect(values.has(ownerKey)).toBe(false);
    await activateAccountLocalState('account-a');
    expect(values.get(ownerKey)).toBe('account-a');
    expect(values.get(recovery('account-a') + 'saved-rivers')).toBe(guestRoutes);
  });

  it('keeps unreadable guest data and its archive rather than activating an empty account', async () => {
    values.set(routesKey, '{unreadable');
    await grantGuestImportConsent();
    await expect(activateAccountLocalState('account-a')).rejects.toThrow('kept for recovery');
    expect(values.get(routesKey)).toBe('{unreadable');
    expect(values.get(prefix('@guest') + 'saved-rivers')).toBe('{unreadable');
    expect(values.has(ownerKey)).toBe(false);
  });

  it('retains an unacknowledged recovery copy indefinitely and starts retention only after sync succeeds', async () => {
    const now = vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-10-01T12:00:00Z'));
    try {
      await grantGuestImportConsent();
      await activateAccountLocalState('account-a');
      now.mockReturnValue(Date.parse('2026-12-01T12:00:00Z'));
      await activateAccountLocalState('account-a');
      expect(values.get(recovery('account-a') + 'saved-rivers')).toBe(guestRoutes);
      await markGuestMigrationRecoveryAcknowledged('account-a');
      now.mockReturnValue(Date.parse('2027-01-01T12:00:00Z'));
      await activateAccountLocalState('account-a');
      expect([...values.keys()].some(key => key.startsWith(recovery('account-a')))).toBe(false);
    } finally { now.mockRestore(); }
  });

  it('signs out without deleting the recovery copy or exposing account data as guest data', async () => {
    await grantGuestImportConsent();
    await activateAccountLocalState('account-a');
    await deactivateAccountLocalState();
    expect(values.has(ownerKey)).toBe(false);
    expect(values.get(routesKey)).toBe('[]');
    expect(values.get(recovery('account-a') + 'saved-rivers')).toBe(guestRoutes);
  });
});
