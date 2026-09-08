import { isRecord } from './storage';

export const RECENT_ROUTES_KEY = 'paddletoday:recent-routes:v1';
export const RECENT_ROUTES_LIMIT = 8;
export interface RecentRoute { slug: string; name: string; reach: string; viewedAt: string }
interface RecentStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<unknown>;
  removeItem(key: string): Promise<unknown>;
}
const queues = new WeakMap<RecentStorage, Promise<unknown>>();
function serialized<T>(storage: RecentStorage, action: () => Promise<T>): Promise<T> {
  const result = (queues.get(storage) ?? Promise.resolve()).catch(() => {}).then(action);
  queues.set(storage, result);
  void result.finally(() => { if (queues.get(storage) === result) queues.delete(storage); }).catch(() => {});
  return result;
}
function parseRecentRoutes(raw: string | null): RecentRoute[] {
  if (raw === null) return [];
  const value: unknown = JSON.parse(raw);
  if (!isRecord(value) || value.version !== 1 || !Array.isArray(value.routes)) throw new Error('Unreadable recent routes');
  const routes: RecentRoute[] = [];
  const seen = new Set<string>();
  for (const entry of value.routes) {
    if (!isRecord(entry) || typeof entry.slug !== 'string' || !entry.slug.trim()
      || typeof entry.name !== 'string' || !entry.name.trim() || typeof entry.reach !== 'string'
      || typeof entry.viewedAt !== 'string' || !Number.isFinite(Date.parse(entry.viewedAt))) throw new Error('Unreadable recent route');
    if (!seen.has(entry.slug)) {
      routes.push({ slug: entry.slug, name: entry.name, reach: entry.reach, viewedAt: entry.viewedAt });
      seen.add(entry.slug);
    }
  }
  return routes.slice(0, RECENT_ROUTES_LIMIT);
}
export function readRecentRoutes(storage: RecentStorage) {
  return serialized(storage, async () => parseRecentRoutes(await storage.getItem(RECENT_ROUTES_KEY)));
}
export function recordRecentRoute(storage: RecentStorage, route: Omit<RecentRoute, 'viewedAt'>, now = new Date()) {
  // Capture only shortcut metadata, never conditions, personal notes or location.
  const entry = { slug: route.slug, name: route.name, reach: route.reach, viewedAt: now.toISOString() };
  return serialized(storage, async () => {
    const previous = parseRecentRoutes(await storage.getItem(RECENT_ROUTES_KEY));
    const routes = [entry, ...previous.filter(item => item.slug !== entry.slug)].slice(0, RECENT_ROUTES_LIMIT);
    await storage.setItem(RECENT_ROUTES_KEY, JSON.stringify({ version: 1, routes }));
  });
}
export function clearRecentRoutes(storage: RecentStorage) {
  // Clear is queued after older visits so they cannot recreate cleared history.
  return serialized(storage, async () => { await storage.removeItem(RECENT_ROUTES_KEY); });
}
