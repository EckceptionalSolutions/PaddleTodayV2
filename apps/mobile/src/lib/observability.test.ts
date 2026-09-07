import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  logEvent: vi.fn(), recordError: vi.fn(), recordFeedbackUsageEvent: vi.fn(),
}));
vi.mock('@react-native-async-storage/async-storage', () => ({ default: {} }));
vi.mock('expo-constants', () => ({
  default: { executionEnvironment: 'standalone', expoConfig: { version: 'qa' } },
  ExecutionEnvironment: { StoreClient: 'storeClient' },
}));
vi.mock('react-native', () => ({ Platform: { select: (options: { ios?: unknown }) => options.ios }, StyleSheet: { create: (styles: unknown) => styles }, Pressable: 'button', Text: 'span', View: 'div' }));
vi.mock('./feedback-usage', () => ({ recordFeedbackUsageEvent: mocks.recordFeedbackUsageEvent }));
vi.mock('@react-native-firebase/analytics', () => ({
  getAnalytics: () => ({}), setAnalyticsCollectionEnabled: vi.fn(), logEvent: mocks.logEvent,
}));
vi.mock('@react-native-firebase/crashlytics', () => ({
  getCrashlytics: () => ({}), setCrashlyticsCollectionEnabled: vi.fn(), setAttributes: vi.fn(), log: vi.fn(), recordError: mocks.recordError,
}));

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  vi.stubGlobal('__DEV__', false);
  vi.stubEnv('EXPO_PUBLIC_APP_ENV', 'production');
  mocks.recordFeedbackUsageEvent.mockResolvedValue(undefined);
  mocks.logEvent.mockResolvedValue(undefined);
});
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe('optional diagnostics failure isolation', () => {
  it('observes rejected analytics writes without an unhandled rejection', async () => {
    mocks.logEvent.mockRejectedValue(new Error('Analytics unavailable'));
    const { trackAppEvent } = await import('./observability');
    trackAppEvent('route_opened');
    await vi.waitFor(() => expect(mocks.logEvent).toHaveBeenCalledOnce());
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  it('does not create a second error when reporting a native failure throws', async () => {
    mocks.recordError.mockImplementation(() => { throw new Error('Diagnostics unavailable'); });
    const { captureAppException } = await import('./observability');
    captureAppException(new Error('Original failure'));
    await vi.waitFor(() => expect(mocks.recordError).toHaveBeenCalledOnce());
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  it('contains feedback-usage storage failures when diagnostics are disabled', async () => {
    vi.stubGlobal('__DEV__', true);
    mocks.recordFeedbackUsageEvent.mockRejectedValue(new Error('Storage unavailable'));
    const { trackAppEvent } = await import('./observability');
    trackAppEvent('app_opened');
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mocks.recordFeedbackUsageEvent).toHaveBeenCalledOnce();
    expect(mocks.logEvent).not.toHaveBeenCalled();
  });
});
