import { describe, expect, it, vi } from 'vitest';
import { createTripDraftSession, listTripDrafts, removeTripDraft, tripDraftKey, type TripDraft } from './trip-drafts';

const target = { routeSlug: 'river-a', putInId: 'launch', takeOutId: 'landing' };
const defaults: TripDraft = { launch: '2026-09-09 09:00', expected: '2026-09-09 13:00', checkIn: '', groupSize: '', boat: '', vehicle: '', note: '' };
function memory() {
  const values = new Map<string, string>();
  return { values, getItem: vi.fn(async (key: string) => values.get(key) ?? null), setItem: vi.fn(async (key: string, value: string) => { values.set(key, value); }),
    getAllKeys: vi.fn(async () => [...values.keys()]), removeItem: vi.fn(async (key: string) => { values.delete(key); }) };
}

describe('device trip drafts', () => {
  it('does not persist untouched defaults and restores edited details', async () => {
    const storage = memory();
    const session = createTripDraftSession(storage, target, defaults);
    await session.load();
    await session.save();
    expect(storage.setItem).not.toHaveBeenCalled();
    session.update({ groupSize: '3', note: 'Meet at the landing' });
    expect(await session.save()).toBe(true);
    const reopened = createTripDraftSession(storage, target, { ...defaults, launch: 'new default' });
    await reopened.load();
    expect(reopened.getSnapshot().draft).toEqual({ ...defaults, groupSize: '3', note: 'Meet at the landing' });
    expect(reopened.getSnapshot().dirty).toBe(false);
  });

  it('keeps routes, access segments and absent access points separate', () => {
    const keys = [target, { ...target, routeSlug: 'river-b' }, { ...target, takeOutId: 'other' }, { ...target, putInId: null }].map(tripDraftKey);
    expect(new Set(keys).size).toBe(4);
  });

  it('protects unreadable records until explicit replacement', async () => {
    const storage = memory();
    storage.values.set(tripDraftKey(target), '{broken');
    const session = createTripDraftSession(storage, target, defaults);
    expect(await session.load()).toBe(false);
    session.update({ note: 'must not overwrite' });
    expect(await session.save()).toBe(false);
    expect(storage.setItem).not.toHaveBeenCalled();
    session.startFresh(defaults);
    expect(await session.save()).toBe(true);
    expect(JSON.parse(storage.values.get(session.key)!).draft).toEqual(defaults);
  });

  it('allows read and write failures to be retried without losing edits', async () => {
    const storage = memory();
    storage.getItem.mockRejectedValueOnce(new Error('read failure'));
    const session = createTripDraftSession(storage, target, defaults);
    expect(await session.load()).toBe(false);
    expect(await session.load()).toBe(true);
    session.update({ vehicle: 'Blue car' });
    storage.setItem.mockRejectedValueOnce(new Error('full disk'));
    expect(await session.save()).toBe(false);
    expect(session.getSnapshot()).toMatchObject({ dirty: true, saveError: true, saving: false });
    expect(await session.save()).toBe(true);
    expect(session.getSnapshot()).toMatchObject({ dirty: false, saveError: false });
    expect(JSON.parse(storage.values.get(session.key)!).draft.vehicle).toBe('Blue car');
  });

  it('serializes in-flight revisions and waits for them when reopening', async () => {
    const storage = memory();
    let release!: () => void;
    const gate = new Promise<void>(resolve => { release = resolve; });
    storage.setItem.mockImplementationOnce(async (key, value) => { await gate; storage.values.set(key, value); });
    const session = createTripDraftSession(storage, target, defaults);
    await session.load();
    session.update({ note: 'First' });
    const first = session.save();
    expect(session.save()).toBe(first);
    session.update({ note: 'Latest' });
    const latest = session.save();
    const reopened = createTripDraftSession(storage, target, defaults);
    const loading = reopened.load();
    expect(reopened.getSnapshot().phase).toBe('loading');
    release();
    await Promise.all([first, latest, loading]);
    expect(reopened.getSnapshot().draft.note).toBe('Latest');
    expect(session.getSnapshot()).toMatchObject({ dirty: false, saving: false });
  });

  it('does not mark newer unsaved edits clean when an older save finishes', async () => {
    const storage = memory();
    const session = createTripDraftSession(storage, target, defaults);
    await session.load();
    session.update({ note: 'First' });
    const first = session.save();
    session.update({ note: 'Still unsaved' });
    await first;
    expect(session.getSnapshot().dirty).toBe(true);
    session.discardUnsaved();
    await session.save();
    expect(JSON.parse(storage.values.get(session.key)!).draft.note).toBe('First');
  });

  it('lists valid drafts with metadata while preserving unreadable records', async () => {
    const storage = memory();
    const session = createTripDraftSession(storage, { ...target, routeName: 'River A' }, defaults);
    await session.load(); session.update({ note: 'Local only' }); await session.save();
    storage.values.set(tripDraftKey({ ...target, takeOutId: 'damaged' }), '{bad');
    storage.values.set('unrelated', 'keep');
    const list = await listTripDrafts(storage);
    expect(list.records).toHaveLength(1);
    expect(list.records[0].target.routeName).toBe('River A');
    expect(list.unreadable).toBe(1);
    expect(storage.values.size).toBe(3);
    expect(storage.removeItem).not.toHaveBeenCalled();
  });

  it('rejects a record copied under another segment key', async () => {
    const storage = memory();
    const original = createTripDraftSession(storage, target, defaults);
    await original.load(); original.update({ note: 'Original segment' }); await original.save();
    const wrongTarget = { ...target, takeOutId: 'different' };
    storage.values.set(tripDraftKey(wrongTarget), storage.values.get(original.key)!);
    const wrongSession = createTripDraftSession(storage, wrongTarget, defaults);
    expect(await wrongSession.load()).toBe(false);
    expect((await listTripDrafts(storage)).unreadable).toBe(1);
  });

  it('removes only the selected draft after queued saves, and preserves failed removals', async () => {
    const storage = memory();
    const session = createTripDraftSession(storage, target, defaults);
    await session.load(); session.update({ note: 'Queued' });
    const saved = session.save();
    const removed = removeTripDraft(storage, target);
    await Promise.all([saved, removed]);
    expect(storage.values.has(session.key)).toBe(false);
    session.update({ note: 'Keep if delete fails' }); await session.save();
    storage.removeItem.mockRejectedValueOnce(new Error('Storage unavailable'));
    await expect(removeTripDraft(storage, target)).rejects.toThrow('Storage unavailable');
    expect(storage.values.has(session.key)).toBe(true);
    storage.getAllKeys.mockRejectedValueOnce(new Error('Read unavailable'));
    await expect(listTripDrafts(storage)).rejects.toThrow('Read unavailable');
    expect(storage.values.has(session.key)).toBe(true);
  });
});
