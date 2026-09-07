import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { trackAppEvent } from '../lib/observability';
import { isRecord, parseJson } from '../lib/storage';

const STORAGE_KEY = 'paddletoday:saved-rivers';

export interface SavedRiverRecord {
  slug: string;
  riverId?: string;
  name: string;
  reach: string;
  savedAt: string;
  notes?: string;
}

interface SavedRiversContextValue {
  isHydrated: boolean;
  savedRivers: SavedRiverRecord[];
  isSaved: (slug: string) => boolean;
  toggleSavedRiver: (river: Omit<SavedRiverRecord, 'savedAt'>) => Promise<void>;
  updateSavedRiverNotes: (slug: string, notes: string) => Promise<boolean>;
}

const SavedRiversContext = createContext<SavedRiversContextValue | null>(null);

export function SavedRiversProvider({ children }: PropsWithChildren) {
  const [savedRivers, setSavedRivers] = useState<SavedRiverRecord[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const current = useRef<SavedRiverRecord[]>([]);
  const hydrated = useRef(false);
  const queue = useRef(Promise.resolve());
  const [feedback, setFeedback] = useState<{ message: string; removed?: SavedRiverRecord } | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!feedback || feedback.removed) return;
    const timer = setTimeout(() => setFeedback(null), 6000);
    return () => clearTimeout(timer);
  }, [feedback]);

  useEffect(() => {
    void hydrateSavedRivers();
  }, []);

  async function hydrateSavedRivers() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = parseJson(raw);
      if (Array.isArray(parsed)) {
        current.current = uniqueSavedRiversBySlug(parsed.filter(isSavedRiverRecord).map((river) => ({
          ...river, notes: typeof river.notes === 'string' ? river.notes.slice(0, 2000) : undefined,
        })).sort(sortSavedRiversByRecency));
        setSavedRivers(current.current);
      }
    } catch {
      // Leave saved rivers empty if local state is corrupt.
    } finally {
      hydrated.current = true;
      setIsHydrated(true);
    }
  }

  function updateSavedRivers(river: Omit<SavedRiverRecord, 'savedAt'>, restore?: SavedRiverRecord) {
    queue.current = queue.current.then(async () => {
      if (!hydrated.current) {
        setFeedback({ message: 'Saved routes are still loading. Please try again.' });
        return;
      }
      const original = current.current.find((item) => item.slug === river.slug);
      const next = restore
        ? (original ? current.current : [...current.current, restore].sort(sortSavedRiversByRecency))
        : buildNextSavedRivers(current.current, river);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        current.current = next;
        setSavedRivers(next);
        setFeedback(restore ? { message: `${river.name} restored to Saved routes.` } : original
          ? { message: `${river.name} removed from Saved routes.`, removed: original }
          : { message: `${river.name} saved.` });
        trackAppEvent('saved_river_toggled', { slug: river.slug, riverId: river.riverId, saved: restore ? true : !original });
      } catch {
        setFeedback({ message: 'Could not update Saved routes. Please try again.', removed: restore });
      }
    });
    return queue.current;
  }

  function toggleSavedRiver(river: Omit<SavedRiverRecord, 'savedAt'>) {
    return updateSavedRivers(river);
  }

  function updateSavedRiverNotes(slug: string, notes: string) {
    const result = queue.current.then(async () => {
      if (!hydrated.current || notes.length > 2000 || !current.current.some((item) => item.slug === slug)) return false;
      const next = current.current.map((item) => item.slug === slug ? { ...item, notes: notes.trim() || undefined } : item);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        current.current = next;
        setSavedRivers(next);
        setFeedback({ message: notes.trim() ? 'Personal note saved.' : 'Personal note removed.' });
        return true;
      } catch {
        return false;
      }
    });
    queue.current = result.then(() => {});
    return result;
  }

  const value = useMemo<SavedRiversContextValue>(
    () => ({
      isHydrated,
      savedRivers,
      isSaved: (slug) => savedRivers.some((item) => item.slug === slug),
      toggleSavedRiver,
      updateSavedRiverNotes,
    }),
    [isHydrated, savedRivers]
  );

  return (
    <SavedRiversContext.Provider value={value}>
      {children}
      {feedback ? (
        <View style={[feedbackStyles.panel, { bottom: 80 + insets.bottom }]}>
          <Text accessibilityLiveRegion="polite" role="status" style={feedbackStyles.message}>{feedback.message}</Text>
          <View style={feedbackStyles.actions}>
            {feedback.removed ? (
              <Pressable accessibilityRole="button" style={feedbackStyles.button} onPress={() => void updateSavedRivers(feedback.removed!, feedback.removed)}>
                <Text style={feedbackStyles.label}>Undo</Text>
              </Pressable>
            ) : null}
            <Pressable accessibilityRole="button" style={feedbackStyles.button} onPress={() => setFeedback(null)}>
              <Text style={feedbackStyles.label}>Dismiss</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </SavedRiversContext.Provider>
  );
}

export function useSavedRivers() {
  const context = useContext(SavedRiversContext);
  if (!context) {
    throw new Error('useSavedRivers must be used within SavedRiversProvider.');
  }

  return context;
}

function buildNextSavedRivers(
  current: SavedRiverRecord[],
  river: Omit<SavedRiverRecord, 'savedAt'>
) {
  const exists = current.some((item) => item.slug === river.slug);
  return exists
    ? current.filter((item) => item.slug !== river.slug)
    : [{ ...river, savedAt: new Date().toISOString() }, ...current];
}

function isSavedRiverRecord(value: unknown): value is SavedRiverRecord {
  return (
    isRecord(value) &&
    typeof value.slug === 'string' &&
    typeof value.name === 'string' &&
    typeof value.reach === 'string' &&
    typeof value.savedAt === 'string'
  );
}

function sortSavedRiversByRecency(left: SavedRiverRecord, right: SavedRiverRecord) {
  return right.savedAt.localeCompare(left.savedAt);
}

function uniqueSavedRiversBySlug(rivers: SavedRiverRecord[]) {
  const seen = new Set<string>();
  return rivers.filter((river) => {
    if (seen.has(river.slug)) {
      return false;
    }

    seen.add(river.slug);
    return true;
  });
}

const feedbackStyles = StyleSheet.create({
  panel: { position: 'absolute', left: 16, right: 16, zIndex: 100, backgroundColor: '#163a3a', borderRadius: 14, padding: 14, gap: 8, elevation: 8 },
  message: { color: '#ffffff', fontSize: 14, lineHeight: 20 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  button: { minHeight: 44, minWidth: 60, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  label: { color: '#ffffff', fontWeight: '700' },
});
