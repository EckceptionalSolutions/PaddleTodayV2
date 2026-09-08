import { describe, expect, it } from 'vitest';
import { createAlertPreferenceStore } from './alert-preference-store';

const existing = { email: 'old@example.test', routeAlerts: [{ riverSlug: 'old-route', threshold: 'good', deliveryMethod: 'push', updatedAt: '2026-09-08' }] };
function storage(raw: string | null = JSON.stringify(existing)) {
  return { raw, readFails: false, writeFails: false, writes: 0,
    async getItem() { if (this.readFails) throw new Error('read failure'); return this.raw; },
    async setItem(_key: string, value: string) { this.writes++; if (this.writeFails) throw new Error('write failure'); this.raw = value; },
  };
}
const newAlert = { riverSlug: 'new-route', threshold: 'strong' as const, deliveryMethod: 'push' as const };

describe('local alert preference recovery', () => {
  it('preserves unreadable data and merges new choices after a successful read retry', async () => {
    const disk = storage(); disk.readFails = true;
    const store = createAlertPreferenceStore(disk);
    await store.load();
    await store.recordRouteAlert(newAlert);
    await store.setEmail('new@example.test');
    expect(disk.writes).toBe(0);
    expect(store.getSnapshot().loadError).toBe(true);
    disk.readFails = false;
    await store.retry();
    expect(JSON.parse(disk.raw!)).toMatchObject({ email: 'new@example.test', routeAlerts: [newAlert, existing.routeAlerts[0]] });
    expect(store.getSnapshot().loadError).toBe(false);
  });
  it.each(['{"broken":', '{"email":"old@example.test","routeAlerts":[{}]}'])('does not replace corrupt records: %s', async raw => {
    const disk = storage(raw);
    const store = createAlertPreferenceStore(disk);
    await store.load();
    await store.recordRouteAlert(newAlert);
    await store.retry();
    expect(disk.raw).toBe(raw);
    expect(disk.writes).toBe(0);
    expect(store.getSnapshot().routeAlerts).toHaveLength(1);
  });
  it('retains confirmed choices after a write failure and retries only local persistence', async () => {
    const disk = storage(); const store = createAlertPreferenceStore(disk);
    await store.load(); disk.writeFails = true;
    await store.recordRouteAlert(newAlert);
    expect(store.getSnapshot()).toMatchObject({ saveError: true, busy: false, routeAlerts: [newAlert, existing.routeAlerts[0]] });
    expect(JSON.parse(disk.raw!).routeAlerts).toHaveLength(1);
    disk.writeFails = false;
    await store.retry();
    expect(store.getSnapshot().saveError).toBe(false);
    expect(disk.writes).toBe(2);
    expect(JSON.parse(disk.raw!).routeAlerts).toHaveLength(2);
  });
  it('serializes overlapping email and alert changes without losing either alert', async () => {
    const disk = storage(); const store = createAlertPreferenceStore(disk);
    await store.load();
    let release!: () => void;
    const originalWrite = disk.setItem.bind(disk);
    let first = true;
    disk.setItem = async (key, value) => {
      if (first) { first = false; await new Promise<void>(resolve => { release = resolve; }); }
      await originalWrite(key, value);
    };
    const firstSave = store.recordRouteAlert(newAlert);
    await Promise.resolve();
    const emailSave = store.setEmail('latest@example.test');
    const secondSave = store.recordRouteAlert({ ...newAlert, riverSlug: 'third-route' });
    release();
    await Promise.all([firstSave, emailSave, secondSave]);
    expect(JSON.parse(disk.raw!)).toMatchObject({ email: 'latest@example.test', routeAlerts: [
      { riverSlug: 'third-route' }, { riverSlug: 'new-route' }, { riverSlug: 'old-route' },
    ] });
  });
  it('supports the legacy email-only record without rewriting it merely on load', async () => {
    const disk = storage('{"email":" old@example.test "}');
    const store = createAlertPreferenceStore(disk); await store.load();
    expect(store.getSnapshot()).toMatchObject({ email: 'old@example.test', routeAlerts: [], loadError: false });
    expect(disk.writes).toBe(0);
  });
});
