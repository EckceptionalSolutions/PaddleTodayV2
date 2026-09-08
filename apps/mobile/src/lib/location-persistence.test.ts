import { describe, expect, it } from 'vitest';
import { createLocationPersistence } from './location-persistence';
const location = { latitude: 45, longitude: -93, label: 'City', source: 'search' as const };

describe('location persistence', () => {
  it('surfaces failed writes and retries without discarding the requested value', async () => {
    let fail = true, stored = '';
    const states: Array<{ saving: boolean; error: boolean }> = [];
    const persist = createLocationPersistence({ setItem: async (_key, value) => { if (fail) throw Error('disk'); stored = value; }, removeItem: async () => {} }, state => states.push(state));
    await persist(location);
    expect(states.at(-1)).toEqual({ saving: false, error: true });
    fail = false;
    const retry = persist(location);
    expect(states.at(-1)).toEqual({ saving: true, error: true });
    await retry;
    expect(JSON.parse(stored)).toEqual(location);
    expect(states.at(-1)).toEqual({ saving: false, error: false });
  });
  it('serializes a clear after an in-flight save so an older location cannot return', async () => {
    let finish!: () => void, started!: () => void;
    const entered = new Promise<void>(resolve => { started = resolve; });
    const blocked = new Promise<void>(resolve => { finish = resolve; });
    let stored: string | null = null;
    const persist = createLocationPersistence({ setItem: async (_key, value) => { started(); await blocked; stored = value; }, removeItem: async () => { stored = null; } }, () => {});
    const saving = persist(location);
    await entered;
    const clearing = persist(null);
    finish();
    await Promise.all([saving, clearing]);
    expect(stored).toBeNull();
  });
  it('skips superseded queued writes and recovers from a failed removal', async () => {
    let calls = 0, fail = true;
    const states: Array<{ saving: boolean; error: boolean }> = [];
    const persist = createLocationPersistence({ setItem: async () => { calls++; }, removeItem: async () => { if (fail) throw Error('disk'); } }, state => states.push(state));
    await Promise.all([persist(location), persist(null)]);
    expect(calls).toBe(0);
    expect(states.at(-1)?.error).toBe(true);
    fail = false;
    await persist(null);
    expect(states.at(-1)).toEqual({ saving: false, error: false });
  });
});
