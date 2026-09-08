import { useSyncExternalStore } from 'react';

const initialTime = Date.now();
let now = initialTime;
let interval: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();
export function refreshFreshnessClock() {
  now = Date.now();
  listeners.forEach(listener => listener());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    interval = setInterval(refreshFreshnessClock, 60_000);
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') window.addEventListener('focus', refreshFreshnessClock);
    refreshFreshnessClock();
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      if (interval) clearInterval(interval);
      interval = null;
      if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') window.removeEventListener('focus', refreshFreshnessClock);
    }
  };
}
const snapshot = () => now;
const serverSnapshot = () => initialTime;

// Query staleTime schedules revalidation; it does not expire an old response
// after failed requests. Recheck displayed freshness while a screen stays open.
export function useFreshnessClock() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
