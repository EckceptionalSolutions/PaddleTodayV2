import type { RouteType } from '@paddletoday/api-contract';
import { isRecord } from './storage';

export const PADDLING_PREFERENCES_KEY = 'paddletoday:paddling-preferences:v1';
export type PaddlingExperience = 'new' | 'some' | 'experienced' | 'unspecified';
export interface PaddlingPreferences {
  experience: PaddlingExperience;
  waterTypes: RouteType[];
}
export interface PaddlingPreferenceState {
  version: 1;
  preferences: PaddlingPreferences | null;
  dismissed: boolean;
}
export const emptyPaddlingState: PaddlingPreferenceState = { version: 1, preferences: null, dismissed: false };
export const experienceOptions: Array<{ value: PaddlingExperience; label: string; detail: string }> = [
  { value: 'new', label: 'Just starting', detail: 'New to paddling or building the basics. Start with easy routes.' },
  { value: 'some', label: 'Some experience', detail: 'Comfortable with the basics. Include easy and moderate routes.' },
  { value: 'experienced', label: 'Experienced', detail: 'Confident planning paddles. Include every difficulty.' },
  { value: 'unspecified', label: 'Skip for now', detail: 'Keep every difficulty available.' },
];

interface PreferenceRoute { river: { difficulty: 'easy' | 'moderate' | 'hard'; routeType: RouteType } }

export function paddlingFilterValues(preferences: PaddlingPreferences) {
  return {
    difficulty: preferences.experience === 'new' ? 'easy' as const
      : preferences.experience === 'some' ? 'easy-moderate' as const : 'any' as const,
    routeType: preferences.waterTypes.length === 1
      ? preferences.waterTypes[0] === 'whitewater' ? 'whitewater' as const : 'non-whitewater' as const
      : 'all' as const,
  };
}

// Preferences narrow recommendations; they never modify conditions, calls, or scores.
export function matchesPaddlingPreferences(route: PreferenceRoute, preferences: PaddlingPreferences | null) {
  if (!preferences) return true;
  const { difficulty } = paddlingFilterValues(preferences);
  if (difficulty === 'easy' && route.river.difficulty !== 'easy') return false;
  if (difficulty === 'easy-moderate' && route.river.difficulty === 'hard') return false;
  return preferences.waterTypes.length === 0 || preferences.waterTypes.includes(route.river.routeType);
}

export function paddlingPreferenceSummary(preferences: PaddlingPreferences) {
  const difficulty = preferences.experience === 'new' ? 'Easy routes'
    : preferences.experience === 'some' ? 'Easy & moderate' : 'Any difficulty';
  const water = preferences.waterTypes.length === 1
    ? preferences.waterTypes[0] === 'whitewater' ? 'Whitewater' : 'Recreational' : 'All water types';
  return `${difficulty} · ${water}`;
}

export function paddlingMatchReason(route: PreferenceRoute, preferences: PaddlingPreferences | null) {
  if (!preferences || !matchesPaddlingPreferences(route, preferences)) return null;
  const reasons: string[] = [];
  if (preferences.experience === 'new' || preferences.experience === 'some') reasons.push(`${route.river.difficulty === 'easy' ? 'Easy' : 'Moderate'} difficulty`);
  if (preferences.waterTypes.length === 1) reasons.push(`${route.river.routeType === 'whitewater' ? 'whitewater' : 'recreational'} paddling`);
  return reasons.length ? `Matches your preferences: ${reasons.join(' · ')}.` : null;
}

export function parsePaddlingState(raw: string | null): PaddlingPreferenceState {
  if (raw === null) return emptyPaddlingState;
  const value: unknown = JSON.parse(raw);
  if (!isRecord(value) || value.version !== 1 || typeof value.dismissed !== 'boolean') throw new Error('Invalid paddling preferences');
  if (value.preferences === null) return { version: 1, preferences: null, dismissed: value.dismissed };
  const preferences = value.preferences;
  if (!isRecord(preferences) || !experienceOptions.some(option => option.value === preferences.experience)
    || !Array.isArray(preferences.waterTypes) || preferences.waterTypes.length > 2
    || !preferences.waterTypes.every(type => type === 'recreational' || type === 'whitewater')
    || new Set(preferences.waterTypes).size !== preferences.waterTypes.length) throw new Error('Invalid paddling preferences');
  return { version: 1, dismissed: value.dismissed, preferences: {
    experience: preferences.experience as PaddlingExperience, waterTypes: preferences.waterTypes as RouteType[],
  } };
}

interface PreferenceStorage { getItem(key: string): Promise<string | null>; setItem(key: string, value: string): Promise<void> }
export async function loadPaddlingState(storage: PreferenceStorage) {
  return parsePaddlingState(await storage.getItem(PADDLING_PREFERENCES_KEY));
}
export async function savePaddlingState(storage: PreferenceStorage, state: PaddlingPreferenceState) {
  const serialized = JSON.stringify(state);
  parsePaddlingState(serialized);
  await storage.setItem(PADDLING_PREFERENCES_KEY, serialized);
}
