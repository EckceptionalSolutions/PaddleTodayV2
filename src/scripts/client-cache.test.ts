import { afterEach, expect, it, vi } from 'vitest';
import { freshnessLabel, readCachedPayload, writeCachedPayload } from './client-cache.js';

afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

it('does not describe missing or invalid update times as recent', () => {
  for (const timestamp of [undefined, null, NaN, Infinity, 1e20]) {
    expect(freshnessLabel(timestamp)).toBe('Update time unavailable');
  }
});

it('ignores cached payloads whose timestamps cannot represent a date', () => {
  vi.stubGlobal('window', { localStorage: { getItem: () => '{"version":1,"fetchedAt":1e999,"payload":{"rivers":[]}}' } });
  expect(readCachedPayload('summary')).toBeNull();
});

it('retains valid cached payloads and reports their elapsed age', () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-09-07T12:00:00Z'));
  const stored = new Map();
  vi.stubGlobal('window', { localStorage: { getItem: (key: string) => stored.get(key) ?? null, setItem: (key: string, value: string) => stored.set(key, value) } });
  writeCachedPayload('summary', { rivers: [] });
  const cached = readCachedPayload('summary');
  expect(cached?.payload).toEqual({ rivers: [] });
  expect(freshnessLabel(cached?.fetchedAt)).toBe('Updated just now');
  vi.advanceTimersByTime(10 * 60_000);
  expect(freshnessLabel(cached?.fetchedAt)).toBe('Updated 10 min ago');
});
