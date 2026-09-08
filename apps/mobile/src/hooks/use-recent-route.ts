import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { recordRecentRoute } from '../lib/recent-routes';

export function useRecentRoute(route?: { slug: string; name: string; reach: string } | null) {
  const slug = route?.slug, name = route?.name, reach = route?.reach;
  useFocusEffect(useCallback(() => {
    if (!slug || !name || reach === undefined) return;
    // History is best-effort: storage failure must not interrupt a route visit.
    // The writer preserves unreadable existing history rather than replacing it.
    void recordRecentRoute(AsyncStorage, { slug, name, reach }).catch(() => {});
  }, [slug, name, reach]));
}
