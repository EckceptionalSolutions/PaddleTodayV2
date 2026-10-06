import { afterEach, describe, expect, it, vi } from 'vitest';
import { createRoutePhotoPreviewController, createRoutePhotoPreviewLoader } from './route-photo-preview.js';

const photo = { id: 'one', src: '/gallery/one.jpg', alt: 'River bend', caption: 'Downstream', credit: 'Paddler', takenLabel: 'CC BY 4.0', isPlaceholder: false, sourceKind: 'route' };
const response = (routeId: string) => ({ ok: true, json: async () => ({ routeId, photo }) });
const storage = () => { const entries = new Map<string, string>(); return { getItem: (key: string) => entries.get(key) ?? null, setItem: (key: string, value: string) => entries.set(key, value), entries }; };
afterEach(() => vi.useRealTimers());

describe('small browser photo requests', () => {
  it('shares requests and preserves photo metadata in memory and offline persistence', async () => {
    const store = storage();
    let release!: (value: ReturnType<typeof response>) => void;
    const fetchImpl = vi.fn(() => new Promise<ReturnType<typeof response>>(resolve => { release = resolve; }));
    const load = createRoutePhotoPreviewLoader({ storage: store, fetchImpl });
    const first = load('one'), second = load('one'); release(response('one'));
    expect(await first).toEqual(photo); expect(await second).toEqual(photo);
    expect(await load('one')).toEqual(photo); expect(fetchImpl).toHaveBeenCalledTimes(1);
    const offlineFetch = vi.fn(async () => { throw new Error('offline'); });
    expect(await createRoutePhotoPreviewLoader({ storage: store, fetchImpl: offlineFetch })('one')).toEqual(photo);
    expect(offlineFetch).not.toHaveBeenCalled();
  });

  it('bounds saved entries and serialized text and reloads evicted routes', async () => {
    const store = storage();
    const fetchImpl = vi.fn(async (path: string) => response(path.split('/')[3]));
    const load = createRoutePhotoPreviewLoader({ storage: store, fetchImpl });
    for (let n = 0; n < 100; n++) await load(`route-${n}`);
    const raw = [...store.entries.values()][0];
    expect(JSON.parse(raw)).toHaveLength(32); expect(raw.length).toBeLessThanOrEqual(32768);
    await load('route-0'); expect(fetchImpl).toHaveBeenCalledTimes(101);
  });

  it('uses a recently expired preview offline but rejects one older than seven days', async () => {
    let now = 1000000000;
    const store = storage();
    const fetchImpl = vi.fn(async () => response('one'));
    const load = createRoutePhotoPreviewLoader({ storage: store, fetchImpl, now: () => now });
    await load('one');
    now += 86400001;
    fetchImpl.mockRejectedValue(new Error('offline'));
    expect(await load('one')).toEqual(photo);
    now += 7 * 86400000;
    expect(await load('one')).toBeNull();
  });

  it('applies the text budget before the entry count for previews with long attribution', async () => {
    const store = storage();
    const large = { ...photo, caption: 'c'.repeat(5000), credit: 'p'.repeat(5000), takenLabel: 'l'.repeat(5000) };
    const load = createRoutePhotoPreviewLoader({ storage: store, fetchImpl: async (path: string) => ({ ok: true, json: async () => ({ routeId: path.split('/')[3], photo: large }) }) });
    for (let n = 0; n < 10; n++) await load(`route-${n}`);
    const raw = [...store.entries.values()][0];
    expect(raw.length).toBeLessThanOrEqual(32768);
    expect(JSON.parse(raw).length).toBeLessThan(32);
    expect(JSON.parse(raw).at(-1)[1].photo.credit).toBe(large.credit);
  });

  it('handles malformed previews, route mismatches, invalid slugs and inaccessible storage', async () => {
    const fetchImpl = vi.fn().mockResolvedValueOnce({ ok: true, json: async () => ({ routeId: 'one', photo: { src: 'broken' } }) })
      .mockResolvedValueOnce(response('another')).mockResolvedValue(response('one'));
    const load = createRoutePhotoPreviewLoader({ fetchImpl, storage: { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('quota'); } } });
    expect(await load('one')).toBeNull(); expect(await load('one')).toBeNull(); expect(await load('one')).toEqual(photo);
    expect(await load('../one')).toBeNull(); expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it('times out the body read as well as the connection', async () => {
    vi.useFakeTimers();
    const fetchImpl = vi.fn(async (_url: string, { signal }: { signal: AbortSignal }) => ({ ok: true, json: () => new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(new Error('aborted')))) }));
    const load = createRoutePhotoPreviewLoader({ fetchImpl, timeoutMs: 100, storage: undefined });
    const pending = load('one'); await vi.advanceTimersByTimeAsync(100);
    expect(await pending).toBeNull();
    const retry = load('one'); await vi.advanceTimersByTimeAsync(100); await retry;
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it('ignores delayed results after a newer selection or a cleared board', async () => {
    const releases = new Map<string, (photo: unknown) => void>();
    const controller = createRoutePhotoPreviewController((slug: string) => new Promise(resolve => releases.set(slug, resolve)));
    const apply = vi.fn();
    const first = controller.update('one', apply), second = controller.update('two', apply);
    releases.get('two')!(photo); await second;
    releases.get('one')!({ ...photo, id: 'old' }); await first;
    expect(apply).toHaveBeenCalledTimes(1); expect(apply).toHaveBeenCalledWith(photo);
    const third = controller.update('three', apply); controller.cancel(); releases.get('three')!(photo); await third;
    expect(apply).toHaveBeenCalledTimes(1);
  });
});
