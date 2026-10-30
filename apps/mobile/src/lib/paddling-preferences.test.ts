import { describe, expect, it, vi } from 'vitest';
import { emptyPaddlingState, experienceOptions, loadPaddlingState, matchesPaddlingPreferences, paddlingFilterValues, paddlingMatchReason, parsePaddlingState, savePaddlingState, type PaddlingPreferences } from './paddling-preferences';

const beginner: PaddlingPreferences = { experience: 'new', waterTypes: ['recreational'] };
const route = (difficulty: 'easy' | 'moderate' | 'hard', routeType: 'recreational' | 'whitewater' = 'recreational') => ({ river: { difficulty, routeType }, score: 94, rating: 'Strong' });

describe('paddling recommendation preferences', () => {
  it('narrows by experience and water type independently without changing conditions', () => {
    const choices = [route('easy'), route('moderate'), route('hard'), route('easy', 'whitewater')];
    const original = structuredClone(choices);
    expect(choices.filter(item => matchesPaddlingPreferences(item, beginner))).toEqual([choices[0]]);
    expect(choices).toEqual(original);
    expect(paddlingMatchReason(choices[0], beginner)).toBe('Matches your preferences: Easy difficulty · recreational paddling.');
    expect(paddlingMatchReason(choices[3], beginner)).toBeNull();
  });
  it('keeps experienced recreational paddlers on recreational routes at every difficulty', () => {
    const preferences: PaddlingPreferences = { experience: 'experienced', waterTypes: ['recreational'] };
    expect(matchesPaddlingPreferences(route('hard'), preferences)).toBe(true);
    expect(matchesPaddlingPreferences(route('easy', 'whitewater'), preferences)).toBe(false);
  });
  it('supports either, both, unspecified, and absent water preferences', () => {
    for (const waterTypes of [[], ['recreational', 'whitewater']] as PaddlingPreferences['waterTypes'][]) {
      expect(matchesPaddlingPreferences(route('easy', 'whitewater'), { experience: 'some', waterTypes })).toBe(true);
      expect(matchesPaddlingPreferences(route('moderate'), { experience: 'some', waterTypes })).toBe(true);
      expect(matchesPaddlingPreferences(route('hard'), { experience: 'some', waterTypes })).toBe(false);
    }
    expect(matchesPaddlingPreferences(route('hard', 'whitewater'), null)).toBe(true);
    expect(paddlingMatchReason(route('hard'), { experience: 'unspecified', waterTypes: [] })).toBeNull();
  });
  it('uses exactly the same difficulty and water constraints in Explore', () => {
    for (const experience of experienceOptions.map(option => option.value)) {
      for (const waterTypes of [[], ['recreational'], ['whitewater'], ['recreational', 'whitewater']] as PaddlingPreferences['waterTypes'][]) {
        const preferences = { experience, waterTypes };
        const filters = paddlingFilterValues(preferences);
        for (const difficulty of ['easy', 'moderate', 'hard'] as const) {
          for (const type of ['recreational', 'whitewater'] as const) {
            const expected = (filters.difficulty === 'any' || (filters.difficulty === 'easy' ? difficulty === 'easy' : difficulty !== 'hard'))
              && (filters.routeType === 'all' || (filters.routeType === 'whitewater' ? type === 'whitewater' : type === 'recreational'));
            expect(matchesPaddlingPreferences(route(difficulty, type), preferences)).toBe(expected);
          }
        }
      }
    }
  });
});

describe('device preference persistence', () => {
  it('round trips configured, dismissed, and empty preferences', async () => {
    const storage = { getItem: vi.fn(async () => null as string | null), setItem: vi.fn(async (_key: string, _value: string) => {}) };
    expect(await loadPaddlingState(storage)).toEqual(emptyPaddlingState);
    for (const state of [emptyPaddlingState, { ...emptyPaddlingState, dismissed: true }, { ...emptyPaddlingState, preferences: beginner }]) {
      await savePaddlingState(storage, state);
      const serialized = storage.setItem.mock.calls.at(-1)![1];
      storage.getItem.mockResolvedValueOnce(serialized);
      expect(await loadPaddlingState(storage)).toEqual(state);
    }
  });
  it('rejects corrupt or future data instead of silently replacing saved choices', () => {
    for (const raw of ['{', 'null', '{}', '{"version":2,"preferences":null,"dismissed":false}',
      JSON.stringify({ ...emptyPaddlingState, preferences: { experience: 'expert', waterTypes: [] } }),
      JSON.stringify({ ...emptyPaddlingState, preferences: { experience: 'new', waterTypes: ['ocean'] } }),
      JSON.stringify({ ...emptyPaddlingState, preferences: { experience: 'new', waterTypes: ['whitewater', 'whitewater'] } })]) {
      expect(() => parsePaddlingState(raw)).toThrow();
    }
  });
  it('reports read and write failures to the caller for recovery', async () => {
    const failure = new Error('device storage unavailable');
    const storage = { getItem: vi.fn().mockRejectedValue(failure), setItem: vi.fn().mockRejectedValue(failure) };
    await expect(loadPaddlingState(storage)).rejects.toBe(failure);
    await expect(savePaddlingState(storage, { ...emptyPaddlingState, preferences: beginner })).rejects.toBe(failure);
  });
});
