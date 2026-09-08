import { describe, expect, it } from 'vitest';
import { clearRecentRoutes, readRecentRoutes, recordRecentRoute, RECENT_ROUTES_KEY } from './recent-routes';

function storage() {
  const values = new Map<string, string>();
  return { values, getItem: async (key: string) => values.get(key) ?? null,
    setItem: async (key: string, value: string) => { values.set(key, value); },
    removeItem: async (key: string) => { values.delete(key); } };
}
const route = (slug: string) => ({ slug, name: `Route ${slug}`, reach: 'Launch to landing' });
describe('recent route shortcuts', () => {
  it('keeps eight distinct latest visits and updates returning route metadata', async () => {
    const store = storage();
    await Promise.all(Array.from({ length: 10 }, (_, index) => recordRecentRoute(store, route(String(index)))));
    expect((await readRecentRoutes(store)).map(item => item.slug)).toEqual(['9', '8', '7', '6', '5', '4', '3', '2']);
    await recordRecentRoute(store, { ...route('5'), name: 'Updated name' });
    const items = await readRecentRoutes(store);
    expect(items[0].name).toBe('Updated name');
    expect(items.filter(item => item.slug === '5')).toHaveLength(1);
  });
  it('records only shortcut metadata, never scores or personal notes', async () => {
    const store = storage();
    await recordRecentRoute(store, { ...route('a'), score: 95, personalNotes: 'Private' } as ReturnType<typeof route>);
    expect(Object.keys((await readRecentRoutes(store))[0]).sort()).toEqual(['name', 'reach', 'slug', 'viewedAt']);
  });
  it('does not overwrite unreadable history and permits an explicit clear', async () => {
    const store = storage(); store.values.set(RECENT_ROUTES_KEY, '{broken');
    await expect(recordRecentRoute(store, route('a'))).rejects.toThrow();
    expect(store.values.get(RECENT_ROUTES_KEY)).toBe('{broken');
    await expect(readRecentRoutes(store)).rejects.toThrow();
    await clearRecentRoutes(store);
    expect(await readRecentRoutes(store)).toEqual([]);
    await recordRecentRoute(store, route('b'));
    expect((await readRecentRoutes(store))[0].slug).toBe('b');
  });
  it('queues clear after earlier visits and never removes unrelated saved data', async () => {
    const store = storage(); store.values.set('saved-route-notes', 'Keep these');
    let release!: () => void;
    const original = store.setItem;
    store.setItem = async (key, value) => { await new Promise<void>(resolve => { release = resolve; }); await original(key, value); };
    const pending = recordRecentRoute(store, route('a'));
    while (!release) await Promise.resolve();
    const cleared = clearRecentRoutes(store);
    release(); await pending; await cleared;
    expect(await readRecentRoutes(store)).toEqual([]);
    expect(store.values.get('saved-route-notes')).toBe('Keep these');
  });
  it('preserves history after failed removal and recovers on retry', async () => {
    const store = storage(); await recordRecentRoute(store, route('a'));
    const remove = store.removeItem;
    store.removeItem = async () => { throw new Error('Unavailable storage'); };
    await expect(clearRecentRoutes(store)).rejects.toThrow();
    expect((await readRecentRoutes(store))[0].slug).toBe('a');
    store.removeItem = remove; await clearRecentRoutes(store);
    expect(await readRecentRoutes(store)).toEqual([]);
  });
});
