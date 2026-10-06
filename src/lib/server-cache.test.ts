import { describe, expect, it, vi } from 'vitest';
import { forgetCache, remember } from './server-cache';

describe('bounded server cache', () => {
  it('does not let a default cache writer evict a protected namespace', async () => {
    const protectedLoad = vi.fn(async () => 'snapshot');
    await remember({ key: 'isolation:snapshot', namespace: 'isolation:snapshot', ttlMs: 60000, maxEntries: 1, load: protectedLoad });
    for (let i = 0; i < 300; i++) await remember({ key: `isolation:other:${i}`, ttlMs: 60000, load: async () => i });
    await remember({ key: 'isolation:snapshot', namespace: 'isolation:snapshot', ttlMs: 60000, maxEntries: 1, load: protectedLoad });
    expect(protectedLoad).toHaveBeenCalledTimes(1);
    forgetCache('isolation:', { prefix: true });
  });

  it('retains recently used entries and serves stale data after a failed reload', async () => {
    vi.useFakeTimers();
    try {
      const namespace = 'lru-test';
      const read = (key: string, load = async () => key) => remember({ namespace, key, maxEntries: 2, ttlMs: 1000, staleWhileErrorMs: 2000, load });
      await read('lru:a'); await read('lru:b'); await read('lru:a'); await read('lru:c');
      const hit = vi.fn(async () => 'changed');
      expect(await read('lru:a', hit)).toBe('lru:a'); expect(hit).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1001);
      expect(await read('lru:a', async () => { throw new Error('offline'); })).toBe('lru:a');
      vi.advanceTimersByTime(2000);
      await expect(read('lru:a', async () => { throw new Error('offline'); })).rejects.toThrow('offline');
    } finally { vi.useRealTimers(); forgetCache('lru:', { prefix: true }); }
  });

  it('does not publish a superseded in-flight value after invalidation', async () => {
    let release!: (value: string) => void;
    const first = remember({ key: 'publish:test', namespace: 'publish', ttlMs: 60000, load: () => new Promise<string>(resolve => { release = resolve; }) });
    forgetCache('publish:', { prefix: true });
    const second = await remember({ key: 'publish:test', namespace: 'publish', ttlMs: 60000, load: async () => 'new' });
    release('old'); await first;
    expect(second).toBe('new');
    expect(await remember({ key: 'publish:test', namespace: 'publish', ttlMs: 60000, load: async () => 'unexpected' })).toBe('new');
    forgetCache('publish:', { prefix: true });
  });
  it('coalesces concurrent loads for one key', async () => {
    const key = `cache-test:coalesce:${Date.now()}`;
    let release!: (value: string) => void;
    const load = vi.fn(() => new Promise<string>((resolve) => { release = resolve; }));

    const first = remember({ key, ttlMs: 1_000, load });
    const second = remember({ key, ttlMs: 1_000, load });
    release('value');

    await expect(Promise.all([first, second])).resolves.toEqual(['value', 'value']);
    expect(load).toHaveBeenCalledTimes(1);
    forgetCache(key);
  });

  it('bounds a cache namespace without evicting unrelated entries', async () => {
    const prefix = `cache-test:bounded:${Date.now()}:`;
    const load = vi.fn(async (value: string) => value);

    await remember({ key: `${prefix}one`, ttlMs: 1_000, maxEntries: 2, maxEntriesPrefix: prefix, load: () => load('one') });
    await remember({ key: `${prefix}two`, ttlMs: 1_000, maxEntries: 2, maxEntriesPrefix: prefix, load: () => load('two') });
    await remember({ key: `${prefix}three`, ttlMs: 1_000, maxEntries: 2, maxEntriesPrefix: prefix, load: () => load('three') });
    await remember({ key: `${prefix}one`, ttlMs: 1_000, maxEntries: 2, maxEntriesPrefix: prefix, load: () => load('one-again') });

    expect(load).toHaveBeenCalledWith('one-again');
    forgetCache(prefix, { prefix: true });
  });
});
