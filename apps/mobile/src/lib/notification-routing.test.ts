import type { NotificationResponse } from 'expo-notifications';
import { describe, expect, it, vi } from 'vitest';
import { createNotificationRouter } from './notification-routing';

function response(identifier = 'weekend-1', url = '/weekend'): NotificationResponse {
  return {
    actionIdentifier: 'expo.modules.notifications.actions.DEFAULT',
    notification: { date: 0, request: { identifier, trigger: { type: 'push' }, content: {
      title: 'Weekend', subtitle: null, body: null, categoryIdentifier: null, sound: null,
      data: { url, notificationType: 'weekend_outlook' },
    } } },
  };
}

function setup(ready = false, pathname = '/') {
  const state = { ready, pathname };
  const deps = { getState: () => state, navigate: vi.fn(), savePending: vi.fn().mockResolvedValue(undefined), clearResponse: vi.fn(), trackOpen: vi.fn() };
  return { state, deps, router: createNotificationRouter(deps) };
}

describe('notification startup routing', () => {
  it('opens a cold-start destination after startup becomes ready', async () => {
    const { state, deps, router } = setup();
    await router.receive(response());
    expect(deps.navigate).not.toHaveBeenCalled();
    expect(deps.savePending).not.toHaveBeenCalled();
    expect(deps.clearResponse).not.toHaveBeenCalled();
    state.ready = true;
    await router.flush();
    expect(deps.navigate).toHaveBeenCalledExactlyOnceWith('/weekend');
    expect(deps.clearResponse).toHaveBeenCalledExactlyOnceWith('weekend-1');
    expect(deps.trackOpen).toHaveBeenCalledExactlyOnceWith('weekend_outlook');
    await router.flush();
    expect(deps.navigate).toHaveBeenCalledOnce();
  });

  it('handles the same response from startup lookup and live listener only once', async () => {
    const { deps, router } = setup(true);
    await Promise.all([router.receive(response()), router.receive(response())]);
    expect(deps.navigate).toHaveBeenCalledOnce();
    expect(deps.trackOpen).toHaveBeenCalledOnce();
  });

  it('opens a warm notification immediately and handles subsequent distinct taps', async () => {
    const { deps, router } = setup(true, '/saved');
    await router.receive(response());
    await router.receive(response('today-2', '/'));
    expect(deps.navigate.mock.calls).toEqual([['/weekend'], ['/']]);
  });

  it('retains the most recent destination while startup is pending', async () => {
    const { state, deps, router } = setup();
    await router.receive(response('old', '/'));
    await router.receive(response('new', '/weekend'));
    state.ready = true;
    await router.flush();
    expect(deps.navigate).toHaveBeenCalledExactlyOnceWith('/weekend');
    expect(deps.clearResponse).toHaveBeenCalledWith('new');
  });

  it.each(['/welcome', '/tour', '/sign-in', '/auth/callback'])('defers to the existing entry handoff on %s', async pathname => {
    const { deps, router } = setup(true, pathname);
    await router.receive(response());
    expect(deps.savePending).toHaveBeenCalledExactlyOnceWith('/weekend');
    expect(deps.navigate).not.toHaveBeenCalled();
    expect(deps.clearResponse).toHaveBeenCalledOnce();
  });

  it('retains the response if the entry handoff cannot be saved', async () => {
    const { deps, router } = setup(true, '/welcome');
    deps.savePending.mockRejectedValueOnce(new Error('storage unavailable'));
    await expect(router.receive(response())).rejects.toThrow('storage unavailable');
    expect(deps.clearResponse).not.toHaveBeenCalled();
    await router.flush();
    expect(deps.clearResponse).toHaveBeenCalledOnce();
  });

  it.each(['https://example.com', '//example.com', '/\\example.com', '/weekend\n', '/sign-in?emailLink=bad', '/welcome', '/auth/callback'])('rejects an invalid notification destination %j', async url => {
    const { deps, router } = setup(true);
    await router.receive(response('invalid', url));
    expect(deps.navigate).not.toHaveBeenCalled();
    expect(deps.savePending).not.toHaveBeenCalled();
  });
});
