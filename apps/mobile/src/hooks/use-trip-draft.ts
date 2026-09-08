import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { AppState } from 'react-native';
import { createTripDraftSession, type TripDraft, type TripDraftTarget } from '../lib/trip-drafts';

export function useTripDraft(target: TripDraftTarget, defaults: TripDraft, visible: boolean) {
  // Estimates may arrive later. They must not replace timing the user has edited.
  const session = useMemo(() => createTripDraftSession(AsyncStorage, target, defaults),
    [target.routeSlug, target.putInId, target.takeOutId, visible]);
  const state = useSyncExternalStore(session.subscribe, session.getSnapshot, session.getSnapshot);
  useEffect(() => {
    if (visible) void session.load();
    const subscription = visible ? AppState.addEventListener('change', next => { if (next !== 'active') void session.save(); }) : null;
    return () => { subscription?.remove(); void session.save(); };
  }, [session, visible]);
  useEffect(() => {
    if (!visible || !state.dirty || state.saveError) return;
    const timer = setTimeout(() => void session.save(), 400);
    return () => clearTimeout(timer);
  }, [session, state.draft, state.dirty, state.saveError, visible]);
  return { session, state };
}
