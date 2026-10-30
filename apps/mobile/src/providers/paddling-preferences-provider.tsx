import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { PaddlingPreferencesSheet } from '../components/paddling-preferences-sheet';
import { emptyPaddlingState, loadPaddlingState, savePaddlingState, type PaddlingPreferences, type PaddlingPreferenceState } from '../lib/paddling-preferences';

interface PaddlingContextValue extends PaddlingPreferenceState {
  ready: boolean;
  loadError: boolean;
  openPreferences: () => void;
  retryLoad: () => void;
}
const PaddlingContext = createContext<PaddlingContextValue | null>(null);

export function PaddlingPreferencesProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(emptyPaddlingState);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [saveError, setSaveError] = useState('');
  const saving = useRef(false);
  const mounted = useRef(true);
  const retryLoad = useCallback(() => {
    setReady(false);
    setLoadError(false);
    void loadPaddlingState(AsyncStorage).then(value => {
      if (mounted.current) setState(value);
    }).catch(() => { if (mounted.current) setLoadError(true); })
      .finally(() => { if (mounted.current) setReady(true); });
  }, []);
  useEffect(() => {
    mounted.current = true;
    retryLoad();
    return () => { mounted.current = false; };
  }, [retryLoad]);

  async function commit(next: PaddlingPreferenceState) {
    if (saving.current || !ready) return;
    saving.current = true;
    setBusy(true);
    setSaveError('');
    try {
      await savePaddlingState(AsyncStorage, next);
      if (mounted.current) { setState(next); setLoadError(false); setOpen(false); }
    } catch {
      if (mounted.current) setSaveError('Could not save on this device. Your previous preferences are unchanged. Try again.');
    } finally {
      saving.current = false;
      if (mounted.current) setBusy(false);
    }
  }
  const openPreferences = useCallback(() => { setSaveError(''); setOpen(true); }, []);
  return <PaddlingContext.Provider value={{ ...state, ready, loadError, openPreferences, retryLoad }}>
    {children}
    <PaddlingPreferencesSheet visible={open} initial={state.preferences} busy={busy} error={saveError}
      loadError={loadError} onClose={() => { if (!saving.current) setOpen(false); }}
      onSave={(preferences: PaddlingPreferences) => void commit({ version: 1, dismissed: false, preferences })}
      onSkip={() => void commit({ ...emptyPaddlingState, dismissed: true })}
      onReset={() => void commit(emptyPaddlingState)} />
  </PaddlingContext.Provider>;
}

export function usePaddlingPreferences() {
  const context = useContext(PaddlingContext);
  if (!context) throw new Error('Paddling preferences provider is missing');
  return context;
}
