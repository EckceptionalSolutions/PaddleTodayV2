import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { isRecord, parseJson } from '../lib/storage';

const STORAGE_KEY = 'paddletoday:saved-rivers';

export interface SavedRiverRecord {
  slug: string;
  riverId?: string;
  name: string;
  reach: string;
  savedAt: string;
}

interface SavedRiversContextValue {
  isHydrated: boolean;
  savedRivers: SavedRiverRecord[];
  isSaved: (slug: string) => boolean;
  toggleSavedRiver: (river: Omit<SavedRiverRecord, 'savedAt'>) => Promise<void>;
}

const SavedRiversContext = createContext<SavedRiversContextValue | null>(null);

export function SavedRiversProvider({ children }: PropsWithChildren) {
  const [savedRivers, setSavedRivers] = useState<SavedRiverRecord[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    void hydrateSavedRivers();
  }, []);

  async function hydrateSavedRivers() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = parseJson(raw);
      if (Array.isArray(parsed)) {
        setSavedRivers(parsed.filter(isSavedRiverRecord).sort(sortSavedRiversByRecency));
      }
    } catch {
      // Leave saved rivers empty if local state is corrupt.
    } finally {
      setIsHydrated(true);
    }
  }

  async function toggleSavedRiver(river: Omit<SavedRiverRecord, 'savedAt'>) {
    const next = buildNextSavedRivers(savedRivers, river);

    setSavedRivers(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  const value = useMemo<SavedRiversContextValue>(
    () => ({
      isHydrated,
      savedRivers,
      isSaved: (slug) => savedRivers.some((item) => item.slug === slug),
      toggleSavedRiver,
    }),
    [isHydrated, savedRivers]
  );

  return <SavedRiversContext.Provider value={value}>{children}</SavedRiversContext.Provider>;
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
