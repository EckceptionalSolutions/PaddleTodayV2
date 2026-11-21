import type { NotificationResponse } from 'expo-notifications';

interface RoutingDependencies {
  getState: () => { ready: boolean; pathname: string };
  navigate: (url: string) => void;
  savePending: (url: string) => Promise<void>;
  clearResponse: (identifier: string) => void;
  trackOpen: (type: 'nearby_today' | 'weekend_outlook') => void;
}

export function createNotificationRouter(deps: RoutingDependencies) {
  const seen = new Set<string>();
  let pending: { identifier: string; url: string; type: unknown } | null = null;
  let work = Promise.resolve();

  function flush() {
    work = work.catch(() => {}).then(async () => {
      const { ready, pathname } = deps.getState();
      if (!ready || !pending) return;
      const target = pending;
      pending = null;
      try {
        if (pathname === '/welcome' || pathname === '/tour' || pathname === '/sign-in' || pathname.startsWith('/auth/callback')) {
          await deps.savePending(target.url);
        } else {
          deps.navigate(target.url);
        }
      } catch (error) {
        // Keep a failed handoff available for the next readiness change.
        if (!pending) pending = target;
        throw error;
      }
      deps.clearResponse(target.identifier);
      if (target.type === 'nearby_today' || target.type === 'weekend_outlook') deps.trackOpen(target.type);
    });
    return work;
  }

  return {
    receive(response: NotificationResponse | null | undefined) {
      if (!response) return Promise.resolve();
      const { identifier, content: { data } } = response.notification.request;
      const url = data?.url;
      if (seen.has(identifier) || typeof url !== 'string' || !url.startsWith('/') || url.startsWith('//') || /[\\\r\n]/.test(url)
        || /^\/(welcome|tour|sign-in|auth)(?:[/?#]|$)/.test(url)) return Promise.resolve();
      seen.add(identifier);
      pending = { identifier, url, type: data.notificationType };
      return flush();
    },
    flush,
  };
}
