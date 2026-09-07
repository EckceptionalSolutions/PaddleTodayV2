import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  constants: { expoConfig: { extra: { eas: { projectId: '' } } } },
  getPermissionsAsync: vi.fn(),
  requestPermissionsAsync: vi.fn(),
  getExpoPushTokenAsync: vi.fn(),
  captureAppException: vi.fn(),
}));
vi.mock('expo-constants', () => ({ default: mocks.constants }));
vi.mock('react-native', () => ({ Platform: { OS: 'ios' } }));
vi.mock('expo-notifications', () => ({
  getPermissionsAsync: mocks.getPermissionsAsync,
  requestPermissionsAsync: mocks.requestPermissionsAsync,
  getExpoPushTokenAsync: mocks.getExpoPushTokenAsync,
}));
vi.mock('./observability', () => ({ captureAppException: mocks.captureAppException }));
import { registerForRiverAlertPushNotifications } from './native-notifications';

beforeEach(() => {
  vi.resetAllMocks();
  mocks.constants.expoConfig.extra.eas.projectId = '';
  mocks.getPermissionsAsync.mockResolvedValue({ granted: true });
});

describe('phone alert recovery messages', () => {
  it('gives app-update guidance when the build cannot register phone alerts', async () => {
    const result = await registerForRiverAlertPushNotifications();
    expect(result.ok).toBe(false);
    expect(result.message).toContain('app update');
    expect(mocks.getExpoPushTokenAsync).not.toHaveBeenCalled();
  });

  it('keeps technical registration failures in diagnostics and offers retry', async () => {
    const failure = new Error('Native provider diagnostic');
    mocks.constants.expoConfig.extra.eas.projectId = 'qa-project';
    mocks.getExpoPushTokenAsync.mockRejectedValue(failure);
    const result = await registerForRiverAlertPushNotifications();
    expect(result.ok).toBe(false);
    expect(result.message).toContain('Please try again');
    expect(result.message).not.toContain(failure.message);
    expect(mocks.captureAppException).toHaveBeenCalledWith(failure, { name: 'notification_registration_failed' });
  });

  it('keeps permission denial guidance actionable', async () => {
    mocks.getPermissionsAsync.mockResolvedValue({ granted: false });
    mocks.requestPermissionsAsync.mockResolvedValue({ granted: false });
    const result = await registerForRiverAlertPushNotifications();
    expect(result.message).toContain('system settings');
    expect(mocks.getExpoPushTokenAsync).not.toHaveBeenCalled();
  });
});
