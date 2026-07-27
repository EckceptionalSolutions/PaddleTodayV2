import { afterEach, describe, expect, it, vi } from 'vitest';
import { isStoredSnapshotFresh } from './river-snapshots';

const NOW = new Date('2026-07-27T04:00:00.000Z');

afterEach(() => {
  vi.useRealTimers();
});

describe('stored river snapshot freshness', () => {
  it('accepts a recent snapshot and small producer clock skew', () => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);

    expect(isStoredSnapshotFresh({ generatedAt: '2026-07-27T02:00:00.000Z' })).toBe(true);
    expect(isStoredSnapshotFresh({ generatedAt: '2026-07-27T04:05:00.000Z' })).toBe(true);
  });

  it('rejects stale, invalid, and implausibly future snapshots', () => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);

    expect(isStoredSnapshotFresh({ generatedAt: '2026-07-27T01:59:59.999Z' })).toBe(false);
    expect(isStoredSnapshotFresh({ generatedAt: 'not-a-date' })).toBe(false);
    expect(isStoredSnapshotFresh({ generatedAt: '2026-07-27T04:05:00.001Z' })).toBe(false);
  });
});
