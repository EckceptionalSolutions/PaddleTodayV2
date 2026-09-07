import { beforeEach, describe, expect, it, vi } from 'vitest';

const native = vi.hoisted(() => ({
  Alert: { alert: vi.fn() },
  Linking: { canOpenURL: vi.fn(), openURL: vi.fn(), openSettings: vi.fn() },
}));
vi.mock('react-native', () => native);
import { openDeviceSettings, openExternalUrl } from './external-links';

beforeEach(() => vi.resetAllMocks());

describe('external actions', () => {
  it('explains when no email application is available', async () => {
    native.Linking.canOpenURL.mockResolvedValue(false);
    expect(await openExternalUrl('mailto:hello@example.com', 'Email')).toBe(false);
    expect(native.Linking.openURL).not.toHaveBeenCalled();
    expect(native.Alert.alert).toHaveBeenCalledWith('Email unavailable', expect.any(String));
  });

  it('handles a link failing after availability was checked', async () => {
    native.Linking.canOpenURL.mockResolvedValue(true);
    native.Linking.openURL.mockRejectedValue(new Error('Application unavailable'));
    expect(await openExternalUrl('https://example.com')).toBe(false);
    expect(native.Alert.alert).toHaveBeenCalledOnce();
  });

  it('provides a manual path when device settings cannot open', async () => {
    native.Linking.openSettings.mockRejectedValue(new Error('Unavailable'));
    expect(await openDeviceSettings()).toBe(false);
    expect(native.Alert.alert).toHaveBeenCalledWith('Settings unavailable', expect.stringContaining('PaddleToday'));
  });

  it('opens supported links and settings without an error notice', async () => {
    native.Linking.canOpenURL.mockResolvedValue(true);
    native.Linking.openURL.mockResolvedValue(undefined);
    native.Linking.openSettings.mockResolvedValue(undefined);
    expect(await openExternalUrl('https://example.com')).toBe(true);
    expect(await openDeviceSettings()).toBe(true);
    expect(native.Alert.alert).not.toHaveBeenCalled();
  });
});
