/** Content-free, bounded counters for Azure log alerts. Never accept paths, tokens, or user IDs. */
type Operation = 'read' | 'trip' | 'join' | 'log' | 'photo' | 'public' | 'migration' | 'export';
const counts = new Map<string, number>();
let maxQueueAgeMs = 0;
export function recordTripRequest(operation: Operation, status: number, queueAgeMs = 0) {
  const outcome = status < 400 ? 'ok' : status === 409 ? 'conflict' : [401, 403].includes(status) ? 'authorization' : status < 500 ? 'rejected' : 'unavailable';
  const key = `${operation}.${outcome}`;
  counts.set(key, (counts.get(key) || 0) + 1);
  if (Number.isFinite(queueAgeMs)) maxQueueAgeMs = Math.max(maxQueueAgeMs, Math.min(Math.max(0, queueAgeMs), 30 * 86400000));
}
export function flushTripCounters() {
  if (!counts.size) return;
  console.info('[trip-metrics]', JSON.stringify({ counts: Object.fromEntries(counts), maxQueueAgeMs }));
  counts.clear(); maxQueueAgeMs = 0;
}
const timer = setInterval(flushTripCounters, 60000); timer.unref();
