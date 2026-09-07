import AsyncStorage from '@react-native-async-storage/async-storage';
import { advanceSavedRouteSnapshot, parseSavedRouteSnapshots, savedRouteChanges, savedRouteSnapshot, type RiverSummaryApiItem, type SavedRouteSnapshots } from '@paddletoday/api-contract';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { SavedRiverRecord } from '../providers/saved-rivers-provider';

const KEY = 'paddletoday:saved-route-changes:v1';

export function useSavedRouteChanges(saved: SavedRiverRecord[], rivers: RiverSummaryApiItem[], fresh: boolean) {
  const [baseline, setBaseline] = useState<SavedRouteSnapshots | null>(null);
  const nextVisit = useRef<SavedRouteSnapshots>({});
  const writes = useRef(Promise.resolve());
  useFocusEffect(useCallback(() => {
    let active = true;
    setBaseline(null);
    void writes.current.then(() => AsyncStorage.getItem(KEY)).catch(() => null).then((raw) => {
      if (!active) return;
      const previous = parseSavedRouteSnapshots(raw);
      nextVisit.current = { ...previous };
      setBaseline(previous);
    });
    return () => { active = false; setBaseline(null); };
  }, []));

  useEffect(() => {
    if (!baseline || !fresh) return;
    const lookup = new Map(rivers.map((river) => [river.river.slug, river]));
    for (const item of saved) {
      const river = lookup.get(item.slug);
      if (river) advanceSavedRouteSnapshot(nextVisit.current, item.slug, item.savedAt, savedRouteSnapshot(river));
    }
    const routes = Object.fromEntries(saved.filter((item) => nextVisit.current[item.slug]).map((item) => [item.slug, nextVisit.current[item.slug]]));
    const raw = JSON.stringify({ version: 1, routes });
    writes.current = writes.current.then(() => AsyncStorage.setItem(KEY, raw)).catch(() => {});
  }, [baseline, fresh, saved, rivers]);

  const changes: Record<string, string[]> = {};
  if (baseline && fresh) {
    for (const river of rivers) {
      const previous = baseline[river.river.slug];
      if (previous && saved.some((item) => item.slug === river.river.slug && item.savedAt === previous.savedAt)) {
        changes[river.river.slug] = savedRouteChanges(previous.snapshot, savedRouteSnapshot(river));
      }
    }
  }
  return changes;
}
