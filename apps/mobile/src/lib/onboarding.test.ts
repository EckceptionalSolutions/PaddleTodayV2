import { beforeEach, describe, expect, it, vi } from 'vitest';

const storage = vi.hoisted(() => ({ getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn(), multiRemove: vi.fn() }));
vi.mock('@react-native-async-storage/async-storage', () => ({ default: storage }));
import { completeWelcome, consumeFirstRouteOpenPending, consumePendingLaunchTarget, migrateOnboardingStorage, savePendingLaunchTarget, WELCOME_CHOICE_STORAGE_KEY, WELCOME_COMPLETED_STORAGE_KEY } from './onboarding';

beforeEach(() => {
  vi.resetAllMocks();
  storage.getItem.mockResolvedValue(null);
  storage.setItem.mockResolvedValue(undefined);
  storage.removeItem.mockResolvedValue(undefined);
  storage.multiRemove.mockResolvedValue(undefined);
});

describe('onboarding storage recovery', () => {
  it('allows completion when only optional analytics storage fails', async () => {
    storage.setItem.mockImplementation((key) => key === WELCOME_COMPLETED_STORAGE_KEY
      ? Promise.resolve() : Promise.reject(new Error('Storage unavailable')));
    await expect(completeWelcome({ trackFirstRouteOpen: true })).resolves.toBeUndefined();
    expect(storage.setItem).toHaveBeenCalledWith(WELCOME_COMPLETED_STORAGE_KEY, '1');
  });

  it('preserves the retry path when actual completion cannot be saved', async () => {
    storage.setItem.mockRejectedValue(new Error('Storage unavailable'));
    await expect(completeWelcome({ trackFirstRouteOpen: true })).rejects.toThrow('Storage unavailable');
  });

  it('remembers whether a first-run user chose guest access or an account', async () => {
    await completeWelcome({ choice: 'guest' });
    expect(storage.setItem).toHaveBeenCalledWith(WELCOME_COMPLETED_STORAGE_KEY, '1');
    expect(storage.setItem).toHaveBeenCalledWith(WELCOME_CHOICE_STORAGE_KEY, 'guest');
    storage.setItem.mockClear();
    await completeWelcome({ choice: 'account' });
    expect(storage.setItem).toHaveBeenCalledWith(WELCOME_CHOICE_STORAGE_KEY, 'account');
  });

  it('preserves an internal notification destination until onboarding finishes', async () => {
    await savePendingLaunchTarget('/river/somewhere');
    storage.getItem.mockResolvedValue('/river/somewhere');
    await expect(consumePendingLaunchTarget()).resolves.toBe('/river/somewhere');
    expect(storage.removeItem).toHaveBeenCalledOnce();
  });

  it('rejects external or onboarding destinations as pending routes', async () => {
    await savePendingLaunchTarget('//example.com');
    await savePendingLaunchTarget('/welcome');
    expect(storage.setItem).not.toHaveBeenCalled();
  });

  it('retries obsolete preference cleanup after a storage failure', async () => {
    storage.multiRemove.mockRejectedValueOnce(new Error('Storage unavailable'));
    await expect(migrateOnboardingStorage()).resolves.toBeUndefined();
    expect(storage.setItem).not.toHaveBeenCalled();
    await migrateOnboardingStorage();
    expect(storage.multiRemove).toHaveBeenCalledTimes(2);
    expect(storage.setItem).toHaveBeenCalledOnce();
  });

  it('does not produce an unhandled rejection when analytics storage fails', async () => {
    storage.getItem.mockRejectedValueOnce(new Error('Read unavailable'));
    expect(await consumeFirstRouteOpenPending()).toBe(false);
    storage.getItem.mockResolvedValue('1');
    storage.removeItem.mockRejectedValueOnce(new Error('Removal unavailable'));
    expect(await consumeFirstRouteOpenPending()).toBe(false);
  });

  it('consumes a saved first-route marker before reporting it', async () => {
    storage.getItem.mockResolvedValue('1');
    expect(await consumeFirstRouteOpenPending()).toBe(true);
    expect(storage.removeItem).toHaveBeenCalledOnce();
  });
});
