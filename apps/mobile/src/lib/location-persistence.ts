import type { StoredLocation } from './location';

export function createLocationPersistence(storage: {
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}, onState: (state: { saving: boolean; error: boolean }) => void) {
  let queue = Promise.resolve();
  let revision = 0;
  let error = false;
  return (location: StoredLocation | null) => {
    const current = ++revision;
    onState({ saving: true, error });
    const raw = location ? JSON.stringify(location) : null;
    queue = queue.catch(() => {}).then(async () => {
      if (current !== revision) return;
      try {
        if (raw === null) await storage.removeItem('paddletoday:user-location');
        else await storage.setItem('paddletoday:user-location', raw);
        if (current === revision) { error = false; onState({ saving: false, error }); }
      } catch {
        if (current === revision) { error = true; onState({ saving: false, error }); }
      }
    });
    return queue;
  };
}
