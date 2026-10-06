import { describe, expect, it, vi } from 'vitest';
import { GeometryCache } from './geometry-cache';

const feature = (routeId: string) => JSON.stringify({ properties: { routeId }, geometry: { type: 'LineString', coordinates: [[-93, 45], [-92, 44]] } });

describe('bounded geometry retention', () => {
  it('coalesces pending reads and reloads the least recently used route after eviction', async () => {
    let release!: (raw: string) => void;
    const read = vi.fn((slug: string) => slug === 'one' && !release ? new Promise<string>(resolve => { release = resolve; }) : Promise.resolve(feature(slug)));
    const cache = new GeometryCache(read, { maxEntries: 2 });
    const first = cache.load('one'), concurrent = cache.load('one');
    expect(read).toHaveBeenCalledTimes(1); release(feature('one'));
    expect(await first).toBe(await concurrent);
    await cache.load('two'); await cache.load('one'); await cache.load('three');
    expect(read).toHaveBeenCalledTimes(3);
    await cache.load('two'); expect(read).toHaveBeenCalledTimes(4);
    expect(cache.stats()).toMatchObject({ entries: 2, inflight: 0 });
  });

  it('keeps source bytes bounded and serves oversized features without retaining them', async () => {
    const raw = feature('same');
    const read = vi.fn(async (slug: string) => slug === 'large' ? feature('x'.repeat(1000)) : raw);
    const cache = new GeometryCache(read, { maxBytes: Buffer.byteLength(raw) * 2 });
    for (const slug of ['one', 'two', 'three']) await cache.load(slug);
    expect(cache.stats()).toMatchObject({ entries: 2, sourceBytes: Buffer.byteLength(raw) * 2 });
    expect((await cache.load('large'))?.geometry?.type).toBe('LineString');
    await cache.load('large'); expect(read).toHaveBeenCalledTimes(5);
    expect(cache.stats().sourceBytes).toBeLessThanOrEqual(Buffer.byteLength(raw) * 2);
  });

  it('bounds negative entries and retries missing routes after expiry', async () => {
    let now = 0;
    const read = vi.fn(async () => null);
    const cache = new GeometryCache(read, { maxMissing: 3, missingTtlMs: 100, now: () => now });
    for (let n = 0; n < 1000; n++) await cache.load(`missing-${n}`);
    expect(cache.stats()).toMatchObject({ entries: 0, sourceBytes: 0, missing: 3, inflight: 0 });
    await cache.load('missing-999'); expect(read).toHaveBeenCalledTimes(1000);
    now = 100; await cache.load('missing-999'); expect(read).toHaveBeenCalledTimes(1001);
  });

  it('expires successful values and releases their byte accounting', async () => {
    let now = 0;
    const read = vi.fn(async () => feature('one'));
    const cache = new GeometryCache(read, { ttlMs: 100, now: () => now });
    await cache.load('one'); now = 100; await cache.load('one');
    expect(read).toHaveBeenCalledTimes(2);
    expect(cache.stats()).toMatchObject({ entries: 1, sourceBytes: Buffer.byteLength(feature('one')) });
  });

  it('retries failed or malformed reads and rejects traversal before reading', async () => {
    const read = vi.fn().mockRejectedValueOnce(new Error('read failed')).mockResolvedValueOnce('invalid').mockResolvedValue(feature('one'));
    const cache = new GeometryCache(read);
    await expect(cache.load('one')).rejects.toThrow('read failed');
    await expect(cache.load('one')).rejects.toThrow();
    expect(cache.stats()).toMatchObject({ entries: 0, missing: 0, inflight: 0 });
    expect((await cache.load('one'))?.properties?.routeId).toBe('one');
    expect(await cache.load('../one')).toBeNull(); expect(read).toHaveBeenCalledTimes(3);
  });
});
