import { tripStorage } from '../lib/trip-storage';
/** Every API instance may run this: mutations are conditional and jobs idempotent. */
export function startTripMaintenance() {
  if (process.env.TRIP_MAINTENANCE_ENABLED !== '1') return;
  let running = false;
  const run = async () => {
    if (running) return;
    running = true;
    const startedAt = Date.now();
    try { await tripStorage().maintenance(); console.info('[trip-maintenance]', JSON.stringify({ status: 'completed', durationMs: Date.now() - startedAt })); }
    catch (e) { console.error('Trip maintenance needs retry', { type: e instanceof Error ? e.name : 'unknown' }); }
    finally { running = false; }
  };
  const timer = setInterval(() => void run(), 5 * 60 * 1000); timer.unref(); void run();
}
