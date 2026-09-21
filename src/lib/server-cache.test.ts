import { describe, expect, it, vi } from 'vitest';
import { forgetCache, remember } from './server-cache';

describe('bounded server cache', () => {
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
