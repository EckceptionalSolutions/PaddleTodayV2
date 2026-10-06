import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ values: new Map<string, string>(), permission: vi.fn(), request: vi.fn(), registered: vi.fn(), start: vi.fn(), stop: vi.fn() }));
vi.mock('@react-native-async-storage/async-storage', () => ({ default: {
  getItem: async (key: string) => mocks.values.get(key) ?? null,
  setItem: async (key: string, value: string) => { mocks.values.set(key, value); },
  removeItem: async (key: string) => { mocks.values.delete(key); },
} }));
vi.mock('react-native', () => ({ Platform: { OS: 'android' } }));
vi.mock('expo-crypto', () => ({ randomUUID: () => 'test-recording' }));
vi.mock('expo-task-manager', () => ({ defineTask: vi.fn(), isAvailableAsync: async () => true }));
vi.mock('expo-location', () => ({
  Accuracy: { High: 4 }, ActivityType: { Fitness: 3 },
  getForegroundPermissionsAsync: mocks.permission, requestForegroundPermissionsAsync: mocks.request,
  hasServicesEnabledAsync: async () => true, hasStartedLocationUpdatesAsync: mocks.registered,
  startLocationUpdatesAsync: mocks.start, stopLocationUpdatesAsync: mocks.stop,
  getCurrentPositionAsync: async () => ({ coords: { latitude: 45, longitude: -93, accuracy: 10 }, timestamp: Date.now() }),
}));

const route = { slug: '', name: 'QA river', putInId: '', putInName: '', takeOutId: '', takeOutName: '' };
const granted = { granted: true, android: { accuracy: 'fine' } };
beforeEach(() => {
  vi.resetModules(); vi.clearAllMocks(); mocks.values.clear();
  mocks.permission.mockResolvedValue(granted); mocks.request.mockResolvedValue(granted);
  mocks.registered.mockResolvedValue(true); mocks.start.mockResolvedValue(undefined); mocks.stop.mockResolvedValue(undefined);
});

describe('recording recovery', () => {
  it('pauses a saved recording after a process restart even if Android retains task registration', async () => {
    const first = await import('./paddle-tracking');
    const original = await first.startPaddleTracking(route, null, 'alice');
    vi.resetModules();
    const restored = await import('./paddle-tracking');
    const session = await restored.recoverPaddleTrackingSession();
    expect(session?.status).toBe('paused');
    expect(session?.interruptedAt).toBeTruthy();
    expect(session?.segments[0]).toHaveLength(1);
    expect(session?.pausedAt).toBe(original.lastRecordedAt);
    expect(mocks.stop).toHaveBeenCalledOnce();
  });
  it('keeps an active recording running when returning to the app in the same process', async () => {
    const tracking = await import('./paddle-tracking');
    await tracking.startPaddleTracking(route, null, 'alice');
    expect((await tracking.recoverPaddleTrackingSession())?.status).toBe('recording');
    expect(mocks.stop).not.toHaveBeenCalled();
  });
  it('retains stationary paddle time through a checkpoint and excludes the later interruption gap', async () => {
    const tracking = await import('./paddle-tracking');
    const original = await tracking.startPaddleTracking(route, null, 'alice');
    const clock = vi.spyOn(Date, 'now').mockReturnValue(original.startedAt + 20000);
    try {
      await tracking.checkpointPaddleTrackingSession();
      vi.resetModules(); clock.mockReturnValue(original.startedAt + 90000);
      const restored = await import('./paddle-tracking');
      await restored.checkpointPaddleTrackingSession();
      const session = await restored.recoverPaddleTrackingSession();
      expect(session?.pausedAt).toBe(original.startedAt + 20000);
      expect((await restored.finishPaddleTracking())?.track?.elapsedSeconds).toBe(20);
    } finally { clock.mockRestore(); }
  });
  it('requests location again before resuming when the one-time permission expired', async () => {
    const tracking = await import('./paddle-tracking');
    await tracking.startPaddleTracking(route, null, 'alice');
    await tracking.pausePaddleTracking();
    mocks.permission.mockResolvedValue({ granted: false });
    const session = await tracking.resumePaddleTracking();
    expect(mocks.request).toHaveBeenCalledOnce();
    expect(session?.status).toBe('recording');
    expect(session?.segments).toHaveLength(2);
  });
  it('keeps the saved track paused when renewed permission is denied', async () => {
    const tracking = await import('./paddle-tracking');
    await tracking.startPaddleTracking(route, null, 'alice');
    await tracking.pausePaddleTracking();
    mocks.permission.mockResolvedValue({ granted: false }); mocks.request.mockResolvedValue({ granted: false });
    await expect(tracking.resumePaddleTracking()).rejects.toThrow('Allow location');
    expect((await tracking.readPaddleTrackingSession())?.status).toBe('paused');
    expect(mocks.start).toHaveBeenCalledOnce();
  });
});
