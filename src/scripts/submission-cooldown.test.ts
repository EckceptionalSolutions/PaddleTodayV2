import { describe, expect, it } from 'vitest';
import { createSubmissionCooldown } from './submission-cooldown.js';

describe('submission cooldown', () => {
  it('starts only after success and expires 30 seconds after receipt', () => {
    let time = 100_000;
    const cooldown = createSubmissionCooldown('test', 30_000, { now: () => time, storage: () => null });
    expect(cooldown.isActive()).toBe(false);
    time += 10_000;
    cooldown.recordSuccess();
    time += 29_999;
    expect(cooldown.isActive()).toBe(true);
    time += 1;
    expect(cooldown.isActive()).toBe(false);
  });

  it('retains the in-page cooldown when storage access throws', () => {
    const cooldown = createSubmissionCooldown('test', 30_000, {
      now: () => 100_000,
      storage: () => { throw new Error('Storage blocked'); },
    });
    expect(cooldown.isActive()).toBe(false);
    expect(() => cooldown.recordSuccess()).not.toThrow();
    expect(cooldown.isActive()).toBe(true);
  });

  it('observes successful submissions in another tab', () => {
    const values = new Map<string, string>();
    const options = {
      now: () => 100_000,
      storage: () => ({ getItem: (key: string) => values.get(key), setItem: (key: string, value: string) => values.set(key, value) }),
    };
    const first = createSubmissionCooldown('test', 30_000, options);
    const second = createSubmissionCooldown('test', 30_000, options);
    first.recordSuccess();
    expect(second.isActive()).toBe(true);
  });

  it.each(['bad', 'Infinity', '-1', '200000'])('ignores corrupt or future timestamps: %s', (stored) => {
    const cooldown = createSubmissionCooldown('test', 30_000, {
      now: () => 100_000,
      storage: () => ({ getItem: () => stored, setItem: () => {} }),
    });
    expect(cooldown.isActive()).toBe(false);
    cooldown.recordSuccess();
    expect(cooldown.isActive()).toBe(true);
  });
});
