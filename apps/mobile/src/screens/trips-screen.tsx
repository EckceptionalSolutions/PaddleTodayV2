import { useEffect, useState, useCallback, useRef, useMemo, type ComponentProps } from 'react';
import { Alert, AppState, BackHandler, KeyboardAvoidingView, Platform, Pressable, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useIsFocused, useNavigation, usePreventRemove } from '@react-navigation/native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { createTripsClient, type PendingTripWork } from '@paddletoday/api-client';
import { newTripPlan, isTripPlan, tripPlan, historicalWaterSuggestion, normalizeSearchText, type Trip, type TripPlan, type PaddleLogInput, type TripCommand, type RiverSummaryApiItem, type ShuttleVehicle, type TripRoute } from '@paddletoday/api-contract';
import { tripSession, subscribeTripSession, TRIP_RETURN_KEY } from '../lib/trip-session';
import { resolveApiBaseUrl, resolveWebUrl } from '../lib/api-base-url';
import { AppButton } from '../components/app-button';
import { SectionCard } from '../components/section-card';
import { colors, radius, shadow, spacing, typography } from '../theme/tokens';
import { apiClient } from '../api/client';
import { tripDeviceStorage } from '../lib/trip-device-storage';
import { useExploreCatalogQuery } from '../api/queries';
import { RouteSearchModal } from '../components/route-search-modal';
import { buildRouteGroupMeta } from '../lib/route-groups';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { androidBottomInset } from '../lib/safe-area';
import { checkpointPaddleTrackingSession, clearPaddleTrackingSession, finishPaddleTracking, pausePaddleTracking, readPaddleTrackingSession, recoverPaddleTrackingSession, resumePaddleTracking, startPaddleTracking, type PaddleTrackingSession } from '../lib/paddle-tracking';
import { PaddleTrackMap } from '../components/paddle-track-map';
import { PaddleRecordingCard } from '../components/paddle-recording-card';
import { PaddleStats } from '../components/paddle-stats';
import { PrivatePaddlePhoto as PrivatePhoto } from '../components/private-paddle-photo';
import { TripRoutePicker } from '../components/trip-route-picker';
import { TripSyncRecoveryCard } from '../components/trip-sync-recovery-card';
import { TripTimeField, type TripTimeFieldHandle } from '../components/trip-time-field';
import { TripOverview, TripScreenHeader, TripFact, rsvpLabel, readableTripDate, type TripPanel } from '../components/trip-overview';
import { NextPaddleCard } from '../components/next-paddle-card';
import { nextDatedTrip, tripLocalToday, paddleLogSchedule } from '../lib/trip-dashboard';
import { parseEditorDraft, type EditorDraft, type LogMode } from '../lib/trip-editor-draft';
import { tripTitleForRoute, titleFollowsRoute } from '../lib/trip-title';
import { tripSyncRecovery } from '../lib/trip-sync-recovery';
import { tripNotes, withTripNotes } from '@paddletoday/api-contract';

const emptyWater = () => ({ gaugeId: '', gaugeName: '', value: '', unit: '', measuredAt: '', source: '', note: '' });
export default function TripsScreen() {
  const params = useLocalSearchParams<{ id?: string; invite?: string; view?: string; route?: string; name?: string }>();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const stackScreen = navigation.getState()?.type === 'stack';
  const bottomContentInset = androidBottomInset(insets.bottom, 40);
  const [repo, setRepo] = useState(tripSession());
  const [, refresh] = useState(0);
  const [selected, setSelected] = useState(params.id || '');
  const [invitation, setInvitation] = useState(params.invite || '');
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [editing, setEditing] = useState<TripPlan | null>(null), [editId, setEditId] = useState('');
  const [planSection, setPlanSection] = useState<'schedule' | 'itinerary' | null>(null);
  const [planStep, setPlanStep] = useState<'route' | 'details'>('route');
  const editingBaseline = useRef<TripPlan | undefined>(undefined);
  const [log, setLog] = useState<PaddleLogInput | null>(null), [logId, setLogId] = useState('');
  const [waterDetailsOpen, setWaterDetailsOpen] = useState(false);
  const [logMode, setLogMode] = useState<LogMode>('edit');
  const [logTimeDetailsOpen, setLogTimeDetailsOpen] = useState(false);
  const [recapDetailsOpen, setRecapDetailsOpen] = useState(false);
  const [tracking, setTracking] = useState<PaddleTrackingSession | null>(null);
  const [trackingNow, setTrackingNow] = useState(Date.now());
  const logRevision = useRef(0);
  const [routeSearchOpen, setRouteSearchOpen] = useState(false), [routeQuery, setRouteQuery] = useState('');
  const [routePickerKey, setRoutePickerKey] = useState(0);
  const [routePickerCustom, setRoutePickerCustom] = useState(false);
  const [panel, setPanel] = useState<TripPanel | null>(null);
  const [viewLogId, setViewLogId] = useState('');
  const [draft, setDraft] = useState<EditorDraft | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [search, setSearch] = useState(''), [message, setMessage] = useState(''), [busy, setBusy] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<TextInput>(null);
  const [shareLink, setShareLink] = useState(''), [recover, setRecover] = useState<PendingTripWork | null>(null);
  const [vehicle, setVehicle] = useState({ label: '', meeting: '', time: '', parkedAt: '', note: '' });
  const [vehicleEdit, setVehicleEdit] = useState<{ vehicle: ShuttleVehicle; revision: number } | null>(null);
  const [vehicleFormOpen, setVehicleFormOpen] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [publicTrip, setPublicTrip] = useState<TripPlan | null>(null);
  const [invitePreview, setInvitePreview] = useState<{ title: string; date: string; route: TripRoute } | null>(null);
  const [inviteError, setInviteError] = useState('');
  const [editorReadyUid, setEditorReadyUid] = useState<string | null>(null);
  const editorStorageKey = repo ? repo.storageKey + ':editor' : 'paddletoday:trip-guest-editor';
  const editorSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFocused = useIsFocused();
  const routeCatalog = useExploreCatalogQuery(isFocused && routeSearchOpen);
  const searchableRoutes = routeCatalog.data?.rivers ?? [];
  const routeCounts = useMemo(() => buildRouteGroupMeta(searchableRoutes), [searchableRoutes]);
  const routeMatches = useMemo(() => findTripRouteMatches(searchableRoutes, routeQuery).slice(0, 10), [searchableRoutes, routeQuery]);
  const supportedStates = useMemo(() => [...new Set(searchableRoutes.map(item => item.river.state))].sort((a, b) => a.localeCompare(b)), [searchableRoutes]);
  const state = repo?.getSnapshot(), trip = state?.trips[selected];
  const savedLog = state?.logs[viewLogId];
  const tripRecap = trip ? Object.values(state?.logs || {}).filter(l => l.sourceTripId === trip.id).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0] : undefined;
  const screenKey = editing ? `edit:${editId}:${planStep}` : log ? `recap-edit:${logId}:${logMode}` : viewLogId ? `recap:${viewLogId}` : `${selected}:${panel || ''}:${vehicleFormOpen}`;
  useEffect(() => { scrollRef.current?.scrollTo({ y: 0, animated: false }); }, [screenKey, tab]);
  useFocusEffect(useCallback(() => {
    if (tracking?.status !== 'recording') return;
    const timer = setInterval(() => setTrackingNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [tracking?.status]));
  useEffect(() => {
    let active = true;
    const refresh = async () => {
      const next = AppState.currentState === 'active' ? await checkpointPaddleTrackingSession() : await readPaddleTrackingSession();
      if (active) { setTracking(next?.ownerUid === repo?.uid ? next : null); setTrackingNow(Date.now()); }
    };
    void refresh();
    const recoverIfNeeded = async () => {
      const next = await recoverPaddleTrackingSession();
      if (active) { setTracking(next?.ownerUid === repo?.uid ? next : null); setTrackingNow(Date.now()); }
    };
    void recoverIfNeeded();
    // Keep recording checkpoints and app-resume recovery alive across tabs.
    // An idle, hidden Trips screen has no tracking display to poll.
    const timer = isFocused || tracking?.status === 'recording'
      ? setInterval(() => void refresh(), 3000) : null;
    const appState = AppState.addEventListener('change', state => { if (state === 'active') void recoverIfNeeded(); });
    return () => { active = false; if (timer) clearInterval(timer); appState.remove(); };
  }, [repo?.uid, isFocused, tracking?.status]);
  useEffect(() => subscribeTripSession(() => {
    const nextRepo = tripSession();
    void readPaddleTrackingSession().then(session => {
      if (session && session.ownerUid !== nextRepo?.uid && session.status === 'recording') void pausePaddleTracking();
    });
    setEditing(null); setLog(null); setDraft(null); setViewLogId(''); setPanel(null); setRecover(null); setVehicleEdit(null); setVehicleFormOpen(false); setShareLink(''); setRepo(nextRepo);
  }), []);
  useEffect(() => repo?.subscribe(() => refresh(n => n + 1)), [repo]);
  useEffect(() => {
    let active = true; setEditorReadyUid(null);
    setDraft(null);
    void tripDeviceStorage.getItem(editorStorageKey).then(raw => {
      if (!active) return;
      if (raw) {
        setDraft(parseEditorDraft(raw));
      }
      setEditorReadyUid(repo?.uid || 'guest');
    }).catch(() => { if (active) { setEditorReadyUid(repo?.uid || 'guest'); setMessage('An unfinished editor could not be restored. Your saved trips are unchanged.'); } });
    return () => { active = false; };
  }, [repo, editorStorageKey]);
  useEffect(() => {
    if (editorReadyUid !== (repo?.uid || 'guest') || (!editing && !log)) return;
    const value = JSON.stringify({ editing, editId, baseline: editingBaseline.current, log, logId, logRevision: logRevision.current, logMode, planStep });
    const timer = setTimeout(() => void tripDeviceStorage.setItem(editorStorageKey, value).catch(() => setMessage('Could not save this editor on the device. Keep the screen open and try Save again.')), 350);
    editorSaveTimer.current = timer;
    return () => clearTimeout(timer);
  }, [repo, editorStorageKey, editorReadyUid, editing, editId, log, logId, logMode, planStep]);
  useEffect(() => { if (params.id) setSelected(params.id); if (params.invite) setInvitation(params.invite); }, [params.id, params.invite]);
  useEffect(() => {
    if (!params.view || !params.id) return;
    const client = createTripsClient(resolveApiBaseUrl(), async () => '');
    void client.view(params.id, params.view).then(v => setPublicTrip(v.trip)).catch(e => setMessage(e.message));
  }, [params.view, params.id]);
  useEffect(() => {
    if (!invitation || !params.id) { setInvitePreview(null); setInviteError(''); return; }
    let active = true;
    setInvitePreview(null); setInviteError('');
    const client = createTripsClient(resolveApiBaseUrl(), async () => '');
    void client.invitation(params.id, invitation).then(result => { if (active) setInvitePreview(result.invitation); })
      .catch(e => { if (active) { const text = e instanceof Error ? e.message : 'This invitation is unavailable.'; setInvitePreview(null); setInviteError(text); setMessage(text); } });
    return () => { active = false; };
  }, [invitation, params.id]);
  const sync = useCallback(async () => {
    if (!repo || AppState.currentState !== 'active') return;
    try {
      await repo.sync();
      setMessage(repo.getSnapshot().pending.length ? 'Some changes are waiting to sync or need review.'
        : editing || log || vehicleEdit ? 'Your open editor has not been saved to your trips yet.' : 'All changes saved.');
    }
    catch (e) { setMessage(e instanceof Error ? e.message : 'Changes are saved on this device.'); }
  }, [repo, editing, log, vehicleEdit]);
  useFocusEffect(useCallback(() => {
    void sync();
    const subscription = AppState.addEventListener('change', s => { if (s === 'active') void sync(); });
    return () => { subscription.remove(); };
  }, [sync]));
  const run = (action: () => Promise<void>) => {
    if (busy) return;
    setBusy(true); void action().catch(e => { setMessage(e instanceof Error ? e.message : 'Could not complete this action.'); scrollRef.current?.scrollTo({ y: 0, animated: true }); }).finally(() => setBusy(false));
  };
  const command = async (c: TripCommand) => { if (!repo) return; setMessage(''); await repo.command(selected, c); await sync(); };
  function confirm(title: string, action: () => Promise<void>) { Alert.alert(title, undefined, [{ text: 'Keep', style: 'cancel' }, { text: 'Continue', style: 'destructive', onPress: () => run(action) }]); }
  async function signIn() {
    const query = new URLSearchParams(); if (selected) query.set('id', selected); if (invitation) query.set('invite', invitation);
    await AsyncStorage.setItem(TRIP_RETURN_KEY, '/trips?' + query.toString()); router.push('/account');
  }
  function resumeDraft() {
    if (!draft) return;
    setMessage('');
    setEditing(draft.editing); setEditId(draft.editId || ''); editingBaseline.current = draft.baseline;
    setLog(draft.editing ? null : draft.log); setLogId(draft.logId || ''); logRevision.current = draft.logRevision ?? 0;
    setLogMode(draft.logMode || 'edit'); setPlanStep(draft.planStep || 'details'); setLogTimeDetailsOpen(false); setRecapDetailsOpen(false);
    setPlanSection(null); setWaterDetailsOpen(false); setDraft(null); setPanel(null); setRoutePickerCustom(false); setRoutePickerKey(n => n + 1);
    if (draft.editId) setSelected(draft.editId);
  }
  function withDraftGuard(action: () => void) {
    if (editorReadyUid !== (repo?.uid || 'guest')) { setMessage('Loading your saved draft. Try again in a moment.'); return; }
    if (!draft) { setMessage(''); action(); return; }
    Alert.alert('You have an unfinished draft', 'Resume it, or replace it with this new edit. Your saved trips won’t change.', [
      { text: 'Keep draft', style: 'cancel' }, { text: 'Resume draft', onPress: resumeDraft },
      { text: 'Replace draft', style: 'destructive', onPress: () => { setDraft(null); setMessage(''); action(); } },
    ]);
  }
  async function closeEditor() {
    const value = { editing, editId, baseline: editingBaseline.current, log, logId, logRevision: logRevision.current, logMode, planStep };
    if (editorSaveTimer.current) clearTimeout(editorSaveTimer.current);
    await tripDeviceStorage.setItem(editorStorageKey, JSON.stringify(value));
    setDraft(value); setEditing(null); setLog(null); setRouteSearchOpen(false);
    setMessage(tracking ? '' : 'Draft saved on this device.');
  }
  async function clearEditorDraft() {
    if (editorSaveTimer.current) clearTimeout(editorSaveTimer.current);
    await tripDeviceStorage.removeItem(editorStorageKey);
    setDraft(null); setMessage('');
  }
  function back() {
    if (busy) return;
    if (editing || log) { run(closeEditor); return; }
    if (vehicleFormOpen) { setVehicleFormOpen(false); setVehicleEdit(null); return; }
    if (panel) { setPanel(null); return; }
    if (viewLogId) { setViewLogId(''); return; }
    setSelected(''); setShareLink(''); router.setParams({ id: undefined });
  }
  usePreventRemove(Boolean(editing || log), ({ data }) => {
    if (busy) return;
    run(async () => { await closeEditor(); navigation.dispatch(data.action); });
  });
  useFocusEffect(useCallback(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!editing && !log && !selected && !viewLogId && !panel) return false;
      back(); return true;
    });
    return () => subscription.remove();
  }, [editing, log, selected, viewLogId, panel, busy, vehicleFormOpen, repo, logMode, planStep]));
  function editTrip() {
    if (!trip) return;
    if (tracking) { setMessage('Finish your current recording before editing another trip.'); return; }
    withDraftGuard(() => { editingBaseline.current = tripPlan(trip); setEditing(tripPlan(trip)); setEditId(trip.id); setPlanStep('details'); setLog(null); setPanel(null); setPlanSection(null); setRoutePickerCustom(false); setRoutePickerKey(n => n + 1); });
  }
  function editRecap() {
    if (!savedLog) return;
    if (tracking) { openTrackingRecap(); return; }
    withDraftGuard(() => { logRevision.current = savedLog.revision; setLog(savedLog); setLogId(savedLog.id); setLogMode('edit'); setLogTimeDetailsOpen(false); setRecapDetailsOpen(false); setEditing(null); setWaterDetailsOpen(false); setRoutePickerCustom(false); setRoutePickerKey(n => n + 1); });
  }
  function startLog(t?: Trip, mode: 'record' | 'past' = 'past') {
    if (tracking) { openTrackingRecap(); return; }
    withDraftGuard(() => {
    const existing = mode !== 'record' && t ? Object.values(state?.logs || {}).filter(l => l.sourceTripId === t.id).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0] : undefined;
    logRevision.current = existing?.revision ?? 0;
    setLogId(existing?.id || '');
    setLogMode(existing ? 'edit' : mode); setLogTimeDetailsOpen(false); setRecapDetailsOpen(false); setWaterDetailsOpen(false);
    const timeZone = t?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const schedule = paddleLogSchedule(t, mode, timeZone);
    setLog(existing || { sourceTripId: t?.id || null, route: t ? tripPlan(t).route : newTripPlan().route, ...schedule, timeZone, notes: '', paddleAgain: '', water: [] });
    setEditing(null); setPanel(null); setRoutePickerCustom(false); setRoutePickerKey(n => n + 1);
    });
  }
  function startPlanning(route?: TripPlan['route']) {
    if (tracking) { setMessage('Finish your current recording before planning another trip.'); return; }
    withDraftGuard(() => { editingBaseline.current = undefined; setEditing({ ...newTripPlan(route), title: tripTitleForRoute(route?.name || '') }); setEditId(''); setPlanStep('route'); setLog(null); setPanel(null); setPlanSection(null); setRoutePickerCustom(false); setRoutePickerKey(n => n + 1); });
  }
  function chooseRoute(item: RiverSummaryApiItem) {
    clearRouteValidation();
    const river = item.river;
    const routeName = river.reach && normalizeSearchText(river.reach) !== normalizeSearchText(river.name)
      ? `${river.name} · ${river.reach}` : river.name;
    const selectedRoute = {
      slug: river.slug, name: routeName,
      putInId: river.putIn?.id || '', putInName: river.putIn?.name || '',
      takeOutId: river.takeOut?.id || '', takeOutName: river.takeOut?.name || '',
    };
    setEditing(current => current ? {
      ...current,
      title: titleFollowsRoute(current.title, current.route.name) ? tripTitleForRoute(routeName) : current.title,
      route: selectedRoute,
    } : current);
    setLog(current => current ? { ...current, route: selectedRoute } : current);
    setRoutePickerCustom(false); setRouteSearchOpen(false); setRouteQuery(''); setRoutePickerKey(n => n + 1);
  }
  function updateEditingRoute(route: TripPlan['route']) {
    clearRouteValidation();
    setEditing(current => {
      if (!current) return current;
      return { ...current, title: titleFollowsRoute(current.title, current.route.name) ? tripTitleForRoute(route.name) : current.title, route };
    });
  }
  function clearRouteValidation() {
    setMessage(current => ['Choose an app route or enter a custom route name.', 'Choose a river or enter a custom location first.'].includes(current) ? '' : current);
  }
  async function startRecording() {
    if (!repo) throw new Error('Sign in to save a private GPS track with your paddle recap.');
    if (tracking) throw new Error('Finish the current GPS recording before starting another.');
    if (!log?.route.name.trim()) throw new Error('Choose a river or enter a custom location first.');
    const session = await startPaddleTracking(log.route, log.sourceTripId, repo.uid, logId || undefined);
    const start = new Date(session.startedAt);
    setTracking(session); setTrackingNow(Date.now()); setLogId(session.logId);
    setLog({ ...log, date: formatLocalDate(start), time: formatLocalTime(start), timeZone: log.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone });
    setMessage('');
  }
  async function pauseRecording() { setTracking(await pausePaddleTracking()); setTrackingNow(Date.now()); setMessage(''); }
  async function resumeRecording() { setTracking(await resumePaddleTracking()); setTrackingNow(Date.now()); setMessage(''); }
  async function discardRecording() {
    await clearPaddleTrackingSession(); setTracking(null); setTrackingNow(Date.now());
    setMessage('Unsaved GPS track discarded. Your existing paddle recaps are unchanged.');
  }
  async function finishRecording() {
    const finished = await finishPaddleTracking();
    if (!finished?.track) throw new Error('The saved recording could not be recovered. Keep the screen open and try again.');
    if (!repo || repo.uid !== finished.ownerUid) throw new Error('Sign in to the account that started this private GPS track to save the recap.');
    const started = new Date(finished.startedAt);
    const existing = repo.getSnapshot().logs[finished.logId];
    const base = (logId === finished.logId ? log : null) || (draft?.logId === finished.logId ? draft.log : null) || existing || { sourceTripId: finished.sourceTripId, route: finished.route, date: formatLocalDate(started), time: formatLocalTime(started), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, notes: '', paddleAgain: '' as const, water: [] };
    const value = { ...base, sourceTripId: finished.sourceTripId, route: finished.route, date: formatLocalDate(started), time: formatLocalTime(started), track: finished.track };
    setTracking(finished); setLog(value); setLogId(finished.logId);
    const id = await repo.saveLog(value, finished.logId, logId === finished.logId ? logRevision.current : draft?.logId === finished.logId ? draft.logRevision : existing?.revision ?? 0);
    logRevision.current = repo.getSnapshot().logs[id]?.revision ?? logRevision.current;
    await clearPaddleTrackingSession(); setTracking(null); setTrackingNow(Date.now());
    setLog(null); setEditing(null); setViewLogId(id); await clearEditorDraft();
    await sync(); setMessage(repo.getSnapshot().pending.some(p => p.id === finished.logId)
      ? 'Track saved on this device. It has not synced yet; review the saved change below.'
      : 'Track saved privately. Add notes or photos to finish your recap.');
  }
  function openTrackingRecap(session = tracking) {
    if (!session) return;
    if (!repo || session.ownerUid !== repo.uid) { setMessage('Sign in to the account that started this private GPS track.'); return; }
    const existing = state?.logs[session.logId];
    const unfinished = logId === session.logId ? log : draft?.logId === session.logId ? draft.log : null;
    logRevision.current = unfinished ? (draft?.logId === session.logId ? draft.logRevision : logRevision.current) : existing?.revision ?? 0;
    setLogId(session.logId);
    const value = unfinished || existing;
    setEditing(null); setPanel(null); setDraft(null); setRoutePickerCustom(false); setRoutePickerKey(n => n + 1);
    setLogMode('record');
    setLog(value ? (session.track ? { ...value, track: session.track } : value) : {
      sourceTripId: session.sourceTripId, route: session.route,
      date: formatLocalDate(new Date(session.startedAt)), time: formatLocalTime(new Date(session.startedAt)),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, notes: '', paddleAgain: '', water: [],
      ...(session.track ? { track: session.track } : {}),
    });
  }
  async function link(purpose: 'view' | 'invite') {
    const token = Crypto.randomUUID().replaceAll('-', '') + Crypto.randomUUID().replaceAll('-', '');
    await repo!.command(selected, { type: 'link', purpose, token }); await repo!.sync();
    if (repo!.getSnapshot().pending.some(p => p.id === selected)) throw new Error('Connect and finish syncing before sharing a link.');
    const url = resolveWebUrl(`/trips/?id=${selected}#${purpose}=${token}`); setShareLink(url);
    await Share.share({ message: `${trip!.title}\n${url}` });
  }
  async function addPhotos(destinationId = logId) {
    if (!repo || !destinationId) return;
    const existing = repo.getSnapshot().logs[destinationId]?.photos.length ?? 0;
    const queued = repo.getSnapshot().pending.filter(p => p.kind === 'photo' && p.id === destinationId).length;
    const remaining = Math.max(0, 10 - existing - queued);
    if (!remaining) throw new Error('This paddle already has 10 saved or queued photos.');
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsMultipleSelection: true, selectionLimit: remaining, quality: 0.85 });
    if (result.canceled) return;
    const session = repo, destination = destinationId;
    for (const image of result.assets.slice(0, remaining)) {
      if ((image.fileSize || 0) > 10 * 1024 * 1024) throw new Error('Choose photos smaller than 10 MiB.');
      const transformed = await manipulateAsync(image.uri, [{ resize: image.width > image.height ? { width: Math.min(image.width, 1920) } : { height: Math.min(image.height, 1920) } }], { compress: 0.8, format: SaveFormat.JPEG, base64: true });
      if (!transformed.base64) throw new Error('This photo could not be read. Please select it again.');
      // Persist bytes with the queued operation; temporary picker URIs do not survive reliably.
      await session.photo(destination, transformed.base64);
    }
    await sync();
    if (destinationId === logId) logRevision.current = repo.getSnapshot().logs[destinationId]?.revision ?? logRevision.current;
  }
  const B = ({ label, onPress, secondary = false }: { label: string; onPress: () => void; secondary?: boolean }) => <AppButton label={label} disabled={busy} variant={secondary ? 'secondary' : 'primary'} onPress={onPress} />;
  const routeFields = (route: TripPlan['route'], update: (value: TripPlan['route']) => void) => <TripRoutePicker
    key={routePickerKey} route={route} onChange={update} disabled={busy || (!!log && tracking?.logId === logId)} initialCustom={routePickerCustom} recentRoutes={recentRoutes}
    onSearch={() => { setRouteQuery(''); setRouteSearchOpen(true); }}
  />;
  const overview = !editing && !log && !selected && !viewLogId && !params.view;
  const trips = Object.values(state?.trips || {});
  const upcomingTrips = trips
    .filter(t => t.status === 'planned')
    .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
  const pastTrips = trips.filter(t => t.status !== 'planned' && !Object.values(state?.logs || {}).some(l => l.sourceTripId === t.id));
  const paddleLogs = Object.values(state?.logs || {}).sort((a, b) => b.date.localeCompare(a.date));
  const recentRoutes = [...new Map([...trips, ...paddleLogs].filter(item => item.route.name.trim()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map(item => [JSON.stringify(item.route), item.route] as const)).values()].slice(0, 3);
  const searchTerm = search.trim().toLocaleLowerCase();
  const nextTrip = nextDatedTrip(upcomingTrips, new Date(trackingNow));
  const featuredTrip = overview && tab === 'upcoming' && !searchTerm ? nextTrip : undefined;
  const filteredUpcoming = upcomingTrips.filter(t => `${t.title} ${t.route.name}`.toLocaleLowerCase().includes(searchTerm));
  const filteredPastTrips = pastTrips.filter(t => `${t.title} ${t.route.name}`.toLocaleLowerCase().includes(searchTerm));
  const filteredPaddleLogs = paddleLogs.filter(l => l.route.name.toLocaleLowerCase().includes(searchTerm));
  const pastCount = pastTrips.length + paddleLogs.length;
  const visiblePastCount = filteredPastTrips.length + filteredPaddleLogs.length;
  const hasRecords = trips.length > 0 || paddleLogs.length > 0;
  const recordingCard = (onOpen?: () => void) => tracking ? <PaddleRecordingCard session={tracking} elapsedSeconds={trackingElapsedSeconds(tracking, trackingNow)} busy={busy}
    onPause={() => run(pauseRecording)} onResume={() => run(resumeRecording)} onFinish={() => {
      if (tracking.status === 'finished') { run(finishRecording); return; }
      Alert.alert('Finish this paddle?', 'Your track will be saved privately. You can add notes and photos afterward.', [
        { text: 'Keep open', style: 'cancel' }, { text: 'Finish & save', onPress: () => run(finishRecording) },
      ]);
    }}
    onDiscard={() => Alert.alert('Discard this recording?', 'This removes the unsaved GPS track from this device.', [
      { text: 'Keep track', style: 'cancel' }, { text: 'Discard track', style: 'destructive', onPress: () => run(discardRecording) },
    ])} onOpen={onOpen} /> : null;
  return <>
  <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.canvas }} behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'android' ? 'height' : undefined} keyboardVerticalOffset={headerHeight}>
  <ScrollView ref={scrollRef} style={{ marginTop: stackScreen ? 0 : insets.top, backgroundColor: colors.canvas }} contentContainerStyle={[styles.page, { paddingTop: spacing.md, paddingBottom: 32 + bottomContentInset }]} keyboardShouldPersistTaps="handled">
    {overview ? <TripsHero compact={hasRecords || !!tracking} showTitle={!stackScreen} lastSync={state?.lastSync} pendingCount={state?.pending.length ?? 0} /> : !params.view ? <TripScreenHeader
      title={editing ? (editId ? 'Edit trip' : 'Plan a trip') : log ? (tracking ? 'Paddle recording' : logMode === 'record' ? 'Record a paddle' : logMode === 'past' ? 'Log a past paddle' : 'Edit paddle recap') : viewLogId ? 'Paddle recap' : panel ? ({ crew: 'Paddling crew', shuttle: vehicleFormOpen ? (vehicleEdit ? 'Edit vehicle' : 'Add vehicle') : 'Shuttle', sharing: 'Invite & share', activity: 'Recent changes', manage: 'Trip options' })[panel] : 'Trip overview'}
      context={editing ? (editId ? trip?.title : undefined) : log ? log.route.name : viewLogId ? savedLog?.route.name : panel ? trip?.title : undefined}
      backLabel={log && tracking ? 'Close recording' : editing || log ? 'Save draft & close' : vehicleFormOpen ? 'Shuttle' : panel || (viewLogId && trip) ? 'Trip overview' : 'All trips'}
      onBack={back} disabled={busy}
    /> : null}
    {tracking && !log && !editing && !params.view ? recordingCard(() => openTrackingRecap()) : null}
    {overview && draft && draft.logId !== tracking?.logId ? <View style={styles.draftNotice}>
      <Pressable accessibilityRole="button" accessibilityLabel="Resume draft" disabled={busy} onPress={resumeDraft} style={({ pressed }) => [styles.draftResume, pressed && { opacity: 0.7 }]}>
        <MaterialCommunityIcons name="file-document-edit-outline" size={22} color={colors.accentDeep} /><View style={styles.draftCopy}><Text style={styles.draftTitle}>Resume unfinished draft</Text><Text numberOfLines={2} style={styles.logPreviewMuted}>{draft.editing?.route.name || draft.log?.route.name || 'Continue where you left off.'}</Text></View><MaterialCommunityIcons name="chevron-right" size={20} color={colors.accentDeep} />
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Discard draft" disabled={busy} onPress={() => confirm('Discard this unfinished draft?', clearEditorDraft)} style={styles.draftDiscard}><MaterialCommunityIcons name="trash-can-outline" size={20} color={colors.textMuted} /></Pressable>
    </View> : null}
    {overview && repo && !tracking && !hasRecords ? <View style={styles.startCard}>
      <View style={styles.startIcon}><MaterialCommunityIcons name="map-marker-path" size={26} color={colors.accentDeep} /></View>
      <Text style={styles.startTitle}>Your next paddle starts with a route</Text>
      <Text style={styles.startCopy}>Choose a river section and access points. Add a date or invite your crew when you’re ready, then keep notes and photos from the day here.</Text>
      <View style={styles.primaryActions}><AppButton label="Plan a trip" icon="map-marker-plus-outline" onPress={() => startPlanning()} disabled={busy} style={styles.primaryAction} /><AppButton label="Record paddle" icon="record-rec" variant="secondary" disabled={busy} onPress={() => startLog(undefined, 'record')} style={styles.primaryAction} /></View>
    </View> : null}
    {overview && repo && !tracking && hasRecords ? <View style={styles.primaryActions}>
      <AppButton label="Plan a trip" icon="map-marker-plus-outline" disabled={busy} onPress={() => startPlanning()} style={styles.primaryAction} />
      <AppButton label="Record paddle" icon="record-rec" variant="secondary" disabled={busy} onPress={() => startLog(featuredTrip, 'record')} style={styles.primaryAction} />
    </View> : null}
    {overview && repo && !tracking ? <Pressable accessibilityRole="button" disabled={busy} onPress={() => startLog()} style={styles.pastEntry}><MaterialCommunityIcons name="notebook-plus-outline" size={18} color={colors.accentDeep} /><Text style={styles.offlineLinkText}>Log a past paddle</Text></Pressable> : null}
    {message ? <View style={styles.notice} accessibilityLiveRegion="polite"><MaterialCommunityIcons name="information-outline" size={18} color={colors.accentDeep} /><Text style={styles.noticeText}>{message}</Text></View> : null}
    {publicTrip ? <SectionCard title={publicTrip.title} subtitle="Shared trip plan"><Text>{publicTrip.route.name}</Text><Text>{publicTrip.route.putInName} → {publicTrip.route.takeOutName}</Text><Text>{publicTrip.date} {publicTrip.launch} ({publicTrip.timeZone})</Text>{publicTrip.itinerary.map(s => <Text key={s.id}>{s.time} {s.location}: {s.note}</Text>)}</SectionCard> : null}
    {!repo && overview ? <View style={styles.welcomeCard}>
      <View style={styles.welcomeIcon}><MaterialCommunityIcons name="account-group-outline" size={26} color={colors.accentDeep} /></View>
      <Text style={styles.welcomeTitle}>Bring your paddling crew together</Text>
      <Text style={styles.welcomeCopy}>Sign in to sync trip plans across devices, or sketch out a trip on this one first.</Text>
      <View style={styles.welcomeActions}>
        <AppButton label="Sign in" icon="account-arrow-right-outline" onPress={() => run(signIn)} style={styles.welcomeAction} />
        <AppButton label="Choose a route" variant="secondary" onPress={() => startPlanning()} style={styles.welcomeAction} />
      </View>
    </View> : null}
    {invitation && params.id ? <SectionCard title={invitePreview?.title || 'Trip invitation'} subtitle={invitePreview ? 'Joining lets you view and edit the shared itinerary.' : undefined}><Text style={styles.body}>{invitePreview ? `${invitePreview.route.name} · ${invitePreview.date || 'Date to be decided'}` : inviteError || 'Checking this invitation…'}</Text>{invitePreview && state?.trips[selected] ? <Text style={styles.hint}>You already have access to this trip.</Text> : repo && invitePreview ? <B label="Join trip" onPress={() => run(async () => { await command({ type: 'join', token: invitation }); if (repo.getSnapshot().trips[selected]) setInvitation(''); })} /> : !repo && invitePreview ? <Text style={styles.hint}>Sign in to join this trip.</Text> : null}</SectionCard> : null}
    {state?.pending.length ? <SectionCard title={`${state.pending.length} saved change${state.pending.length === 1 ? '' : 's'} waiting to sync`}><B label="Sync now" secondary onPress={() => run(sync)} />{state.pending.filter(p => p.error).map(p => <B key={p.key} label={`Review ${tripSyncRecovery(p).title.toLowerCase()}`} onPress={() => { setRecover(p); scrollRef.current?.scrollTo({ y: 0, animated: true }); }} secondary />)}</SectionCard> : null}
    {recover ? <TripSyncRecoveryCard key={recover.key} work={state?.pending.find(p => p.key === recover.key) || recover} busy={busy}
      onRetry={() => run(async () => {
        const before = new Set(repo!.getSnapshot().pending.map(p => p.key));
        await repo!.retry(recover.key);
        const remaining = repo!.getSnapshot().pending.find(p => p.key === recover.key || (p.id === recover.id && p.kind === recover.kind && !before.has(p.key)));
        setRecover(remaining || null); setMessage(remaining ? 'This change still needs attention. Your saved details are kept on this device.' : 'Change synced.');
      })}
      onDiscard={() => Alert.alert('Discard this unsynced change?', 'Your local change will be removed. The latest synced version will be kept.', [
        { text: 'Keep changes', style: 'cancel' }, { text: 'Discard change', style: 'destructive', onPress: () => run(async () => { setMessage(''); await repo!.discard(recover.key); setRecover(null); setMessage('Local change discarded.'); }) },
      ])}
      onShare={text => run(async () => { await Share.share({ message: text }); })} onClose={() => setRecover(null)} /> : null}
    {params.view ? null : editing ? <SectionCard title="Trip details" subtitle={editId ? undefined : 'Choose where you’ll paddle, then add the details you need.'}>
      {routeFields(editing.route, updateEditingRoute)}
      <ScheduleField label="Planned date" value={editing.date} dateOnly optional disabled={busy} onChange={date => setEditing({ ...editing, date })} />
      <Field disabled={busy} label="Trip notes (optional)" value={tripNotes(editing.preparation)} onChange={note => setEditing({ ...editing, preparation: withTripNotes(editing.preparation, note) })} multiline placeholder="Meeting details, gear, or anything your group should know" />
      <Text style={styles.hint}>Shared only with trip members. A route is enough to save; add the rest when you need it.</Text>
      <AppButton label="More details" icon="tune-variant" variant="secondary" disabled={busy} expanded={planSection === 'schedule'} onPress={() => setPlanSection(planSection === 'schedule' ? null : 'schedule')} />
      {planSection === 'schedule' ? <>
      <Field disabled={busy} label="Trip name" value={editing.title} onChange={title => setEditing({ ...editing, title })} />
      <Field disabled={busy} label="Launch time (HH:MM, optional)" value={editing.launch} onChange={launch => setEditing({ ...editing, launch })} placeholder="09:00" />
      <Text style={styles.hint}>Times in {editing.timeZone}</Text>
      <Field disabled={busy} label="Expected return (HH:MM, optional)" value={editing.expected} onChange={expected => setEditing({ ...editing, expected })} />
      <ScheduleField label="Group check-in" optional value={preparationValues(editing.preparation).checkInLocal} disabled={busy} onChange={checkInLocal => setEditing({ ...editing, preparation: { ...preparationValues(editing.preparation), checkInLocal } })} />
      <Field disabled={busy} label="Trip time zone" value={editing.timeZone} onChange={timeZone => setEditing({ ...editing, timeZone })} />
      <Field disabled={busy} label="Group size" value={editing.preparation?.groupSize == null ? '' : String(editing.preparation.groupSize)} onChange={value => {
        if (!/^\d*$/.test(value)) return;
        setEditing({ ...editing, preparation: { ...preparationValues(editing.preparation), groupSize: value ? Number(value) : null } });
      }} placeholder="Number of paddlers" keyboardType="number-pad" />
      </> : null}
      <AppButton label={editing.itinerary.length ? `Stops · ${editing.itinerary.length}` : 'Add stops'} icon="map-marker-plus-outline" variant="secondary" disabled={busy} expanded={planSection === 'itinerary'} onPress={() => setPlanSection(planSection === 'itinerary' ? null : 'itinerary')} />
      {planSection === 'itinerary' ? <>
      <Text style={styles.heading}>Shared itinerary</Text><Text style={styles.hint}>Meeting stops are visible to members and people with a view link.</Text>
      {editing.itinerary.map((stop, i) => <View key={stop.id} style={styles.section}>
        <Field disabled={busy} label="Meeting place" value={stop.location} onChange={location => setEditing({ ...editing, itinerary: editing.itinerary.map((s, j) => j === i ? { ...s, location } : s) })} />
        <Field disabled={busy} label="Time (HH:MM)" value={stop.time} onChange={time => setEditing({ ...editing, itinerary: editing.itinerary.map((s, j) => j === i ? { ...s, time } : s) })} />
        <Field disabled={busy} label="Details" value={stop.note} multiline onChange={note => setEditing({ ...editing, itinerary: editing.itinerary.map((s, j) => j === i ? { ...s, note } : s) })} />
        <B label="Remove stop" secondary onPress={() => setEditing({ ...editing, itinerary: editing.itinerary.filter(s => s.id !== stop.id) })} />
      </View>)}
      <B label="Add meeting stop" secondary onPress={() => setEditing({ ...editing, itinerary: [...editing.itinerary, { id: Crypto.randomUUID(), time: '', location: '', note: '' }] })} />
      </> : null}
      <B label={repo ? (editId ? 'Save changes' : 'Save trip plan') : 'Save and sign in'} onPress={() => run(async () => {
        if (!editing.route.name.trim()) throw new Error('Choose an app route or enter a custom route name.');
        if (!editing.title.trim()) throw new Error('Enter a name for this trip.');
        if (editing.launch && !editing.date) throw new Error('Choose a planned date for your launch time.');
        if ((editing.preparation?.note.length ?? 0) > 2000) throw new Error('Keep trip notes to 2,000 characters or fewer. Your existing details are kept until you save.');
        if (!isTripPlan(editing)) throw new Error('Check the dates, times, time zone, and optional group details before saving.');
        if (!repo) { await AsyncStorage.setItem('paddletoday:trip-guest-draft', JSON.stringify({ id: Crypto.randomUUID(), plan: editing })); await clearEditorDraft(); await signIn(); return; }
        const id = await repo.savePlan(editing, editId || undefined, editId ? editingBaseline.current : undefined); setSelected(id); setEditing(null); setViewLogId(''); setPanel(null); await clearEditorDraft(); await sync(); setMessage(repo.getSnapshot().pending.length ? 'Trip saved on this device. Changes are waiting to sync.' : 'Trip saved.');
      })} /><B label="Save draft & close" secondary onPress={() => run(closeEditor)} />
    </SectionCard> : log && logMode === 'record' && !tracking ? <SectionCard title="Choose your route" subtitle="Start a private GPS recording when you’re ready to launch.">
      {routeFields(log.route, route => setLog({ ...log, route }))}
      <Text style={styles.hint}>Location is used after you start and until you pause or finish. Recording can continue with your screen locked. Your track is private to your account.</Text>
      <AppButton label="Start GPS recording" icon="record-rec" busy={busy} busyLabel="Starting recording…" disabled={!log.route.name.trim()} onPress={() => run(startRecording)} />
      <Text style={styles.hint}>You’ll add notes and photos after you finish.</Text>
      <B label="Save draft & close" secondary onPress={() => run(closeEditor)} />
    </SectionCard> : log && tracking ? <>{recordingCard()}<B label="Close recording" secondary onPress={() => run(closeEditor)} /></> : log ? <SectionCard title={logMode === 'past' ? 'Remember this paddle' : 'Your paddle notes'} subtitle="Notes and photos stay private to your account.">
      <Field disabled={busy} label="Notes" placeholder="What made this paddle memorable?" value={log.notes} multiline onChange={notes => setLog({ ...log, notes })} />
      {logMode === 'edit' ? <AppButton label={recapDetailsOpen ? 'Hide route & paddle details' : 'Edit route & paddle details'} icon="tune-variant" variant="secondary" disabled={busy} expanded={recapDetailsOpen} onPress={() => setRecapDetailsOpen(value => !value)} /> : null}
      {logMode !== 'edit' || recapDetailsOpen ? <>
      {routeFields(log.route, route => setLog({ ...log, route }))}
      <ScheduleField label="Date paddled" value={log.date} dateOnly disabled={busy} onChange={date => setLog({ ...log, date })} />
      <AppButton label="Launch time & time zone" variant="secondary" disabled={busy} expanded={logTimeDetailsOpen} onPress={() => setLogTimeDetailsOpen(value => !value)} />
      {logTimeDetailsOpen ? <>
      <Field disabled={busy} label="Launch time (optional, HH:MM)" value={log.time} onChange={time => setLog({ ...log, time })} />
      <Field disabled={busy} label="Time zone" value={log.timeZone} onChange={timeZone => setLog({ ...log, timeZone })} />
      </> : null}
      <Text style={styles.heading}>Would paddle again?</Text><View style={styles.primaryActions}>{(['yes', 'no', 'unsure'] as const).map(v => <AppButton key={v} selected={log.paddleAgain === v} label={v === 'yes' ? 'Yes' : v === 'no' ? 'No' : 'Unsure'} variant={log.paddleAgain === v ? 'primary' : 'secondary'} disabled={busy} style={styles.primaryAction} onPress={() => setLog({ ...log, paddleAgain: v })} />)}</View>
      <Text style={styles.heading}>Water observation</Text><Text style={styles.hint}>Record the level during your paddle, with its source and measurement time.</Text>
      <B label={waterDetailsOpen ? 'Hide water observations' : 'Add a water observation (optional)'} secondary onPress={() => setWaterDetailsOpen(value => !value)} />
      {waterDetailsOpen ? <>
      {log.route.slug ? <B label="Find a recorded water reading" secondary onPress={() => run(async () => {
        const result = await apiClient.getRiverHistory(log.route.slug, { days: 30 });
        const suggestion = historicalWaterSuggestion(result.result, log.date, log.timeZone);
        if (!suggestion) throw new Error('No recorded reading is available for this date. Add your own observation if you have one.');
        setLog({ ...log, water: [suggestion] }); setMessage(suggestion.note);
      })} /> : null}
      {(['value', 'unit', 'gaugeName', 'measuredAt', 'source', 'note'] as const).map(key => <Field disabled={busy} key={key} label={({ value: 'Level / flow', unit: 'Unit (ft, cfs, m³/s)', gaugeName: 'Gauge / location', measuredAt: 'Measurement date and time', source: 'Source', note: 'Observation notes' })[key]} value={log.water[0]?.[key] || ''} onChange={text => setLog({ ...log, water: [{ ...(log.water[0] || emptyWater()), [key]: text }] })} />)}
      </> : null}
      </> : null}
      <B label="Save paddle" onPress={() => run(async () => { if (tracking) throw new Error('Finish the recording before saving this recap.'); const id = await repo!.saveLog(log, logId || undefined, logRevision.current); setLogId(id); logRevision.current = repo!.getSnapshot().logs[id]!.revision; setLog(null); setViewLogId(id); await clearEditorDraft(); await sync(); setMessage(repo!.getSnapshot().pending.length ? 'Recap saved on this device. Changes are waiting to sync.' : 'Paddle recap saved.'); })} />
      {state?.logs[logId] ? <><Text style={styles.heading}>Photos</Text><B label="Add photos to recap" secondary onPress={() => run(addPhotos)} />{state.logs[logId]!.photos.map(p => <View key={p.id}><PrivatePhoto repo={repo!} logId={logId} id={p.id} /><B label="Remove photo" secondary onPress={() => confirm('Remove this photo?', async () => { await repo!.client.removePhoto(logId, p.id); await sync(); logRevision.current = repo!.getSnapshot().logs[logId]?.revision ?? logRevision.current; })} /></View>)}{!tracking ? <B label="Delete paddle" secondary onPress={() => confirm('Delete this log and its photos?', async () => { await repo!.deleteLog(logId); setLog(null); setViewLogId(''); await clearEditorDraft(); await sync(); })} /> : null}</> : <Text style={styles.hint}>Save the recap to add photos.</Text>}
      <B label="Save draft & close" secondary onPress={() => run(closeEditor)} />
    </SectionCard> : savedLog && repo ? <>
      <SectionCard title={savedLog.route.name} subtitle={`${readableTripDate(savedLog.date)}${savedLog.time ? ` · ${savedLog.time}` : ''} · ${savedLog.timeZone}`}>
        <View style={styles.recapPrivacy}><MaterialCommunityIcons name="lock-outline" size={15} color={colors.accentDeep} /><Text style={styles.hint}>Your private paddle journal</Text></View>
        {savedLog.track ? <><PaddleTrackMap track={savedLog.track} /><PaddleStats distanceMeters={savedLog.track.distanceMeters} elapsedSeconds={savedLog.track.elapsedSeconds} /></> : savedLog.photos[0] ? <><PrivatePhoto repo={repo} logId={savedLog.id} id={savedLog.photos[0].id} />{savedLog.photos[0].caption ? <Text style={styles.hint}>{savedLog.photos[0].caption}</Text> : null}</> : null}
        <Text style={styles.body}>{savedLog.route.putInName || 'Put-in not set'} → {savedLog.route.takeOutName || 'Take-out not set'}</Text>
        <View style={styles.primaryActions}>
          <AppButton label={savedLog.notes ? 'Edit notes' : 'Add a note'} icon="pencil-outline" variant="secondary" onPress={editRecap} disabled={busy} style={styles.primaryAction} />
          <AppButton label="Add photos" icon="camera-outline" onPress={() => run(() => addPhotos(savedLog.id))} disabled={busy} style={styles.primaryAction} />
        </View>
        <Text style={styles.hint}>Your paddle is saved. Notes and photos are optional.</Text>
      </SectionCard>
      <SectionCard title="Notes">
        <Text style={styles.body}>{savedLog.notes || 'No notes yet. Add a few details to remember this day.'}</Text>
        {savedLog.paddleAgain ? <TripFact label="WOULD PADDLE AGAIN" value={savedLog.paddleAgain === 'yes' ? 'Yes' : savedLog.paddleAgain === 'no' ? 'No' : 'Unsure'} /> : null}
      </SectionCard>
      {savedLog.track || savedLog.photos.length !== 1 ? <SectionCard title="Photos" subtitle="Private to your account">
        {savedLog.photos.slice(savedLog.track ? 0 : 1).map(photo => <View key={photo.id} style={styles.photoItem}><PrivatePhoto repo={repo} logId={savedLog.id} id={photo.id} />{photo.caption ? <Text style={styles.hint}>{photo.caption}</Text> : null}</View>)}
        {!savedLog.photos.length ? <Text style={styles.hint}>Keep a few moments from the water here.</Text> : null}
        <B label="Add photos" secondary onPress={() => run(() => addPhotos(savedLog.id))} />
      </SectionCard> : null}
      {savedLog.water.length ? <SectionCard title="Water observations">{savedLog.water.map((water, index) => <View key={index} style={styles.section}>
        <Text style={styles.body}>{[water.gaugeName, [water.value, water.unit].filter(Boolean).join(' ')].filter(Boolean).join(' · ')}</Text>
        {water.measuredAt ? <Text style={styles.hint}>Measured: {water.measuredAt}</Text> : null}
        {water.source ? <Text style={styles.hint}>Source: {water.source}</Text> : null}{water.note ? <Text style={styles.body}>{water.note}</Text> : null}
      </View>)}</SectionCard> : null}
      <B label="Plan this route again" secondary onPress={() => startPlanning(savedLog.route)} />
      {savedLog.sourceTripId && state?.trips[savedLog.sourceTripId] ? <B label="Open trip plan" secondary onPress={() => { setSelected(savedLog.sourceTripId!); setViewLogId(''); }} /> : null}
    </> : trip && repo && panel ? <>
      {panel === 'crew' ? <>
        <SectionCard title="Your place in the crew">
          <Text style={styles.label}>YOUR RSVP</Text>
          <View style={styles.primaryActions}>{(['going', 'maybe', 'not-going'] as const).map(rsvp => <AppButton key={rsvp} selected={trip.members.find(m => m.uid === repo.uid)?.rsvp === rsvp} label={rsvpLabel(rsvp)} variant={trip.members.find(m => m.uid === repo.uid)?.rsvp === rsvp ? 'primary' : 'secondary'} disabled={busy} onPress={() => run(() => command({ type: 'rsvp', rsvp }))} style={styles.primaryAction} />)}</View>
          <Field disabled={busy} label="My name for this trip" value={memberName} onChange={setMemberName} />
          <B label="Save my name" secondary onPress={() => run(async () => { await command({ type: 'name', name: memberName.trim() }); setPanel(null); })} />
        </SectionCard>
        <SectionCard title="Paddling partners">{trip.members.map(m => <View key={m.uid} style={styles.section}>
          <Text style={styles.body}>{m.name}{m.uid === repo.uid ? ' (you)' : ''}</Text><Text style={styles.hint}>{rsvpLabel(m.rsvp)}{m.role === 'owner' ? ' · Organizer' : ''}</Text>
          {trip.ownerUid === repo.uid && m.uid !== repo.uid ? <View style={styles.primaryActions}>
            <AppButton label="Remove" accessibilityLabel={`Remove ${m.name}`} variant="secondary" disabled={busy} style={styles.primaryAction} onPress={() => confirm('Remove this paddler?', () => command({ type: 'remove-member', uid: m.uid }))} />
            <AppButton label="Make organizer" accessibilityLabel={`Make ${m.name} organizer`} variant="secondary" disabled={busy} style={styles.primaryAction} onPress={() => confirm('Transfer organizer permissions?', () => command({ type: 'transfer', uid: m.uid }))} />
          </View> : null}
        </View>)}</SectionCard>
      </> : panel === 'shuttle' ? vehicleFormOpen ? <SectionCard title={vehicleEdit ? 'Vehicle details' : 'Your vehicle'} subtitle="Visible only to trip members.">
        {(['label', 'meeting', 'time', 'parkedAt', 'note'] as const).map(k => <Field disabled={busy} key={k} label={({ label: 'Vehicle / driver', meeting: 'Meeting place (optional)', time: 'Meeting time (HH:MM, optional)', parkedAt: 'Car stays at (optional)', note: 'Shuttle notes (optional)' })[k]} value={vehicle[k]} multiline={k === 'note'} onChange={v => setVehicle({ ...vehicle, [k]: v })} />)}
        <B label="Save vehicle" onPress={() => run(async () => {
          setMessage('');
          if (!vehicle.label.trim()) throw new Error('Name the vehicle or driver so your crew can recognize it.');
          await repo.command(selected, { type: 'vehicle', vehicle: { ...vehicle, label: vehicle.label.trim(), id: vehicleEdit?.vehicle.id || Crypto.randomUUID(), driverUid: vehicleEdit?.vehicle.driverUid || repo.uid, seats: vehicleEdit?.vehicle.seats ?? 0, passengers: vehicleEdit?.vehicle.passengers || [] } }, vehicleEdit?.revision);
          setVehicleFormOpen(false); setVehicleEdit(null); await sync();
        })} />
        <B label="Cancel" secondary onPress={() => { setVehicleFormOpen(false); setVehicleEdit(null); }} />
      </SectionCard> : <SectionCard title="Shuttle plan" subtitle="Keep vehicles, drivers, and meeting details in one place.">
        {trip.shuttle.map(v => <View key={v.id} style={styles.section}>
          <Text style={styles.heading}>{v.label}</Text>
          {v.meeting ? <TripFact label="MEET AT" value={[v.meeting, v.time].filter(Boolean).join(' · ')} /> : v.time ? <TripFact label="MEETING TIME" value={v.time} /> : null}
          {v.parkedAt ? <TripFact label="CAR STAYS AT" value={v.parkedAt} /> : null}{v.note ? <Text style={styles.body}>{v.note}</Text> : null}
          <Text style={styles.hint}>Driver: {trip.members.find(m => m.uid === v.driverUid)?.name || 'Paddler'}</Text>
          {v.driverUid === repo.uid || trip.ownerUid === repo.uid ? <View style={styles.primaryActions}>
            <AppButton label="Edit vehicle" variant="secondary" disabled={busy} style={styles.primaryAction} onPress={() => { setVehicleEdit({ vehicle: v, revision: trip.revision }); setVehicle({ label: v.label, meeting: v.meeting, time: v.time, parkedAt: v.parkedAt, note: v.note }); setVehicleFormOpen(true); }} />
            <AppButton label="Remove" accessibilityLabel={`Remove ${v.label}`} variant="secondary" disabled={busy} style={styles.primaryAction} onPress={() => confirm('Remove this vehicle?', () => command({ type: 'remove-vehicle', vehicleId: v.id }))} />
          </View> : null}
        </View>)}
        {!trip.shuttle.length ? <Text style={styles.body}>No vehicles yet. Add one when your group needs a shuttle.</Text> : null}
        <B label="Add my vehicle" onPress={() => { setVehicle({ label: '', meeting: '', time: '', parkedAt: '', note: '' }); setVehicleEdit(null); setVehicleFormOpen(true); }} />
      </SectionCard> : panel === 'sharing' ? <SectionCard title="Share the plan">
        <Text style={styles.body}>Invite people to join the crew, or send a view of the route and schedule.</Text>
        {trip.ownerUid === repo.uid ? <>
          <B label="Invite paddlers" onPress={() => run(() => link('invite'))} />
          <Text style={styles.hint}>Invitation links let anyone with the link join and edit the plan for seven days.</Text>
          <B label="Share view-only link" secondary onPress={() => run(() => link('view'))} />
          <Text style={styles.hint}>View links last 30 days and show the route, times, and itinerary. Crew, shuttle, group notes, and private recaps are excluded.</Text>
          {shareLink ? <Text selectable style={styles.hint}>{shareLink}</Text> : null}
          <Text style={styles.heading}>Link access</Text>
          <B label="Revoke invitation links" secondary onPress={() => confirm('Revoke invitation links?', () => command({ type: 'revoke', purpose: 'invite' }))} />
          <B label="Revoke view links" secondary onPress={() => confirm('Revoke view links?', () => command({ type: 'revoke', purpose: 'view' }))} />
        </> : <Text style={styles.hint}>Ask the organizer to share an invitation.</Text>}
      </SectionCard> : panel === 'activity' ? <SectionCard title="Updates from your crew">
        {trip.activity.slice(-10).reverse().map(a => <View key={a.revision} style={styles.section}><Text style={styles.body}>{trip.members.find(m => m.uid === a.actor)?.name || 'Paddler'} · {a.action}</Text><Text style={styles.hint}>{new Date(a.at).toLocaleString()}</Text></View>)}
        {!trip.activity.length ? <Text style={styles.hint}>No changes yet.</Text> : null}
      </SectionCard> : <SectionCard title="Manage this plan" subtitle="Changes affect everyone in the trip.">
        <B label="My RSVP & name" secondary onPress={() => { setMemberName(trip.members.find(m => m.uid === repo.uid)?.name || ''); setPanel('crew'); }} />
        {trip.ownerUid === repo.uid ? <>
          {trip.status !== 'completed' ? <B label="Mark plan completed" secondary onPress={() => run(async () => { await command({ type: 'status', status: 'completed' }); setPanel(null); })} /> : null}
          {trip.status !== 'planned' ? <B label="Reopen plan" secondary onPress={() => run(async () => { await command({ type: 'status', status: 'planned' }); setPanel(null); })} /> : null}
          {trip.status !== 'cancelled' ? <B label="Cancel trip" secondary onPress={() => confirm('Cancel this shared trip?', async () => { await command({ type: 'status', status: 'cancelled' }); setPanel(null); })} /> : null}
          <B label="Delete trip" secondary onPress={() => confirm('Delete this trip for everyone?', async () => { await command({ type: 'delete' }); setPanel(null); setSelected(''); router.setParams({ id: undefined }); })} />
        </> : <B label="Leave trip" secondary onPress={() => confirm('Leave this trip?', async () => { await command({ type: 'remove-member', uid: repo.uid }); setPanel(null); setSelected(''); router.setParams({ id: undefined }); })} />}
      </SectionCard>}
    </> : trip && repo ? <>
      <TripOverview trip={trip} uid={repo.uid} recap={tripRecap} disabled={busy} onEdit={editTrip} onRecap={() => startLog(trip)} onRecord={() => startLog(trip, 'record')}
        onOpenRecap={() => setViewLogId(tripRecap!.id)}
        onPanel={value => { setMemberName(trip.members.find(m => m.uid === repo.uid)?.name || ''); setPanel(value); setVehicleFormOpen(false); setShareLink(''); }}
        onRoute={() => router.push({ pathname: '/river/[slug]', params: { slug: trip.route.slug, putin: trip.route.putInId, takeout: trip.route.takeOutId } })}
        onPlanAgain={() => startPlanning(trip.route)} />
      {state?.recovery[trip.id] ? <SectionCard title="Recovered plan"><Text style={styles.hint}>Confirm the time zone before sharing.</Text><Text selectable style={styles.hint}>{state.recovery[trip.id]}</Text></SectionCard> : null}
    </> : repo && !params.view && (hasRecords || !overview) ? <>
      <View style={styles.libraryTools}>
        <TripTabs tab={tab} upcomingCount={upcomingTrips.length} pastCount={pastCount} onSelect={setTab} />
        <Pressable accessibilityRole="button" accessibilityLabel={searchOpen ? 'Close search' : 'Search trips and routes'} accessibilityState={{ expanded: searchOpen }} onPress={() => { setSearchOpen(value => !value); if (searchOpen) setSearch(''); }} style={styles.searchToggle}>
          <MaterialCommunityIcons name={searchOpen ? 'close' : 'magnify'} size={22} color={colors.accentDeep} />
        </Pressable>
      </View>
      {searchOpen ? <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={20} color={colors.textMuted} />
        <TextInput ref={searchRef} autoFocus editable={!busy} accessibilityLabel="Search trips and routes" value={search} onChangeText={setSearch} placeholder="River or trip name" placeholderTextColor={colors.textMuted} style={styles.searchInput} />
        {search ? <Pressable accessibilityRole="button" accessibilityLabel="Clear search" onPress={() => { setSearch(''); searchRef.current?.focus(); }} style={styles.clearSearch}><MaterialCommunityIcons name="close-circle" size={20} color={colors.textMuted} /></Pressable> : null}
      </View> : null}
      {tab === 'upcoming' ? <>
        {featuredTrip ? <NextPaddleCard trip={featuredTrip} disabled={busy} unread={(state?.viewed[featuredTrip.id] ?? 0) < featuredTrip.revision} onOpen={() => { setSelected(featuredTrip.id); void repo.markViewed(featuredTrip.id); }} /> : null}
        {[
          { title: 'Scheduled plans', items: filteredUpcoming.filter(t => t.id !== featuredTrip?.id && t.date && t.date >= tripLocalToday(t, new Date(trackingNow))) },
          { title: 'Choose a date later', items: filteredUpcoming.filter(t => !t.date) },
          { title: 'Earlier plans · review when ready', items: filteredUpcoming.filter(t => t.date && t.date < tripLocalToday(t, new Date(trackingNow))) },
        ].filter(group => group.items.length).map(group => <View key={group.title} style={styles.planGroup}>
          <Text accessibilityRole="header" style={styles.groupHeading}>{group.title}</Text>
          {group.items.map(t => <UpcomingTripCard key={t.id} trip={t} unread={(state?.viewed[t.id] ?? 0) < t.revision} onOpen={() => { setSelected(t.id); void repo.markViewed(t.id); }} />)}
        </View>)}
        {!filteredUpcoming.length ? <TripsEmptyState
          icon={search ? 'text-search' : 'calendar-plus-outline'}
          title={search ? 'No plans found' : 'Your next paddle starts here'}
          body={search ? 'Try another river or trip name.' : 'Save a route and add a date, launch time, and crew details when you’re ready.'}
          actionLabel={search ? 'Clear search' : 'Choose a route'}
          onAction={search ? () => setSearch('') : () => startPlanning()}
        /> : null}
      </> : <>
        {filteredPaddleLogs.map(l => <PaddleLogCard
          key={l.id}
          log={l}
          repo={repo}
          onOpen={() => setViewLogId(l.id)}
          onPlanAgain={() => startPlanning(l.route)}
        />)}
        {filteredPastTrips.map(t => <PastTripCard
          key={t.id}
          trip={t}
          onOpen={() => setSelected(t.id)}
          onLog={() => startLog(t)}
        />)}
        {!visiblePastCount ? <TripsEmptyState
          icon={search ? 'text-search' : 'notebook-plus-outline'}
          title={search ? 'No paddles found' : 'Your paddle log starts here'}
          body={search ? 'Try another river or trip name.' : 'Add a past outing to save notes, photos, and water observations.'}
          actionLabel={search ? 'Clear search' : 'Log a paddle'}
          onAction={search ? () => setSearch('') : () => startLog()}
        /> : null}
      </>}
    </> : null}
    {overview ? <Pressable accessibilityRole="button" onPress={() => router.push({ pathname: '/saved', params: { tab: 'offline' } })} style={styles.offlineLink}>
      <MaterialCommunityIcons name="download-box-outline" size={19} color={colors.accentDeep} />
      <Text style={styles.offlineLinkText}>Offline downloads & local drafts</Text>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
    </Pressable> : null}
  </ScrollView>
  </KeyboardAvoidingView>
  <RouteSearchModal
    visible={routeSearchOpen}
    query={routeQuery}
    results={routeMatches}
    routeCounts={routeCounts}
    states={supportedStates}
    topInset={Math.max(insets.top, 0)}
    bottomInset={bottomContentInset}
    loading={routeCatalog.isPending}
    error={routeCatalog.isError ? 'Route search could not refresh. Try again to check the full catalog.' : undefined}
    onRetry={() => void routeCatalog.refetch()}
    onChange={setRouteQuery}
    onClose={() => { setRouteSearchOpen(false); setRouteQuery(''); }}
    onOpenRiver={chooseRoute}
    onCreateCustom={() => {
      const route = { slug: '', name: routeQuery.trim(), putInId: '', putInName: '', takeOutId: '', takeOutName: '' };
      updateEditingRoute(route); setLog(current => current ? { ...current, route } : null);
      setRoutePickerCustom(true); setRoutePickerKey(n => n + 1); setRouteSearchOpen(false); setRouteQuery('');
    }}
    onExplore={() => { setRouteSearchOpen(false); router.push('/explore'); }}
    onRequestRoute={() => { const name = routeQuery.trim(); setRouteSearchOpen(false); router.push({ pathname: '/request-route', params: { name } }); }}
    onExploreState={setRouteQuery}
  />
  </>;
}
function TripsHero({ compact, showTitle = true, lastSync, pendingCount }: { compact: boolean; showTitle?: boolean; lastSync?: string | number | null; pendingCount: number }) {
  const syncLabel = pendingCount
    ? `${pendingCount} saved change${pendingCount === 1 ? '' : 's'} waiting to sync`
    : lastSync
      ? `Synced ${new Date(lastSync).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`
      : 'Ready to save your plans';

  return <View style={[styles.hero, compact && styles.heroCompact]}>
    {!compact ? <View style={styles.heroKickerRow}>
      <View style={styles.heroIcon}><MaterialCommunityIcons name="kayaking" size={23} color="#EAF3ED" /></View>
      <Text style={styles.heroKicker}>PLAN · PADDLE · REMEMBER</Text>
    </View> : null}
    <View style={styles.heroHeading}>{showTitle ? <Text accessibilityRole="header" style={[styles.heroTitle, compact && styles.heroCompactTitle]}>My trips</Text> : null}
    <View style={styles.heroSync}>
      <MaterialCommunityIcons name={pendingCount ? 'cloud-sync-outline' : 'cloud-check-outline'} size={15} color={colors.textMuted} />
      <Text style={styles.heroSyncText}>{syncLabel}</Text>
    </View></View>
    {!compact ? <Text style={styles.heroSubtitle}>Bring your crew together and keep every river day in one place.</Text> : null}
  </View>;
}

function TripTabs({ tab, upcomingCount, pastCount, onSelect }: {
  tab: 'upcoming' | 'past';
  upcomingCount: number;
  pastCount: number;
  onSelect: (next: 'upcoming' | 'past') => void;
}) {
  return <View style={styles.segmentedTabs}>
    {([
      { id: 'upcoming', label: 'Plans', count: upcomingCount },
      { id: 'past', label: 'History', count: pastCount },
    ] as const).map(item => {
      const active = tab === item.id;
      return <Pressable
        key={item.id}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        onPress={() => onSelect(item.id)}
        style={[styles.segmentButton, active && styles.segmentButtonActive]}
      >
        <Text style={[styles.segmentLabel, active && styles.segmentLabelActive]}>{item.label}</Text>
        <Text style={[styles.segmentCount, active && styles.segmentCountActive]}>{item.count}</Text>
      </Pressable>;
    })}
  </View>;
}

function UpcomingTripCard({ trip, unread, onOpen }: { trip: Trip; unread: boolean; onOpen: () => void }) {
  return <View style={styles.tripCard}>
    <View style={styles.cardTopline}>
      <MetaPill icon="calendar-month-outline" label={`${readableTripDate(trip.date)}${trip.launch ? ` · ${trip.launch}` : ''}`} />
      {unread ? <View style={styles.updatedPill}><Text style={styles.updatedText}>New update</Text></View> : null}
    </View>
    <Text style={styles.tripCardTitle}>{trip.title}</Text>
    {trip.title !== trip.route.name ? <Text style={styles.tripRiverName}>{trip.route.name}</Text> : null}
    <View style={styles.routeLine}>
      <MaterialCommunityIcons name="map-marker-path" size={17} color={colors.accentDeep} />
      <Text style={styles.routeLineText}>{trip.route.putInName || 'Put-in to be decided'} <Text style={styles.routeArrow}>→</Text> {trip.route.takeOutName || 'Take-out to be decided'}</Text>
    </View>
    <View style={styles.tripCardFooter}>
      <View style={styles.memberMeta}>
        <MaterialCommunityIcons name="account-group-outline" size={17} color={colors.textMuted} />
        <Text style={styles.memberMetaText}>{trip.members.length} {trip.members.length === 1 ? 'paddler' : 'paddlers'}</Text>
      </View>
      <AppButton label="Open trip" icon="arrow-right" onPress={onOpen} style={styles.tripCardButton} />
    </View>
  </View>;
}

function PastTripCard({ trip, onOpen, onLog }: { trip: Trip; onOpen: () => void; onLog: () => void }) {
  const status = trip.status === 'cancelled' ? 'Cancelled' : 'Completed';
  return <View style={styles.tripCard}>
    <View style={styles.cardTopline}>
      <MetaPill icon="check-circle-outline" label={status} />
      {trip.date ? <Text style={styles.pastDate}>{readableTripDate(trip.date)}</Text> : null}
    </View>
    <Text style={styles.tripCardTitle}>{trip.title}</Text>
    {trip.title !== trip.route.name ? <Text style={styles.tripRiverName}>{trip.route.name}</Text> : null}
    <View style={styles.routeLine}>
      <MaterialCommunityIcons name="map-marker-path" size={17} color={colors.accentDeep} />
      <Text style={styles.routeLineText}>{trip.route.putInName || 'Put-in to be decided'} <Text style={styles.routeArrow}>→</Text> {trip.route.takeOutName || 'Take-out to be decided'}</Text>
    </View>
    <View style={styles.tripCardFooter}>
      <AppButton label="Open plan" icon="arrow-right" variant="secondary" onPress={onOpen} style={styles.tripCardButton} />
      <AppButton label="Add recap" icon="notebook-plus-outline" onPress={onLog} style={styles.tripCardButton} />
    </View>
  </View>;
}

function PaddleLogCard({ log, repo, onOpen, onPlanAgain }: { log: PaddleLogInput & { id: string; photos: { id: string }[] }; repo: NonNullable<ReturnType<typeof tripSession>>; onOpen: () => void; onPlanAgain: () => void }) {
  return <View style={styles.tripCard}>
    <View style={styles.cardTopline}>
      <MetaPill icon="notebook-outline" label={readableTripDate(log.date)} />
      {log.paddleAgain === 'yes' ? <View style={styles.updatedPill}><Text style={styles.updatedText}>Would paddle again</Text></View> : null}
    </View>
    <Text style={styles.tripCardTitle}>{log.route.name || 'Paddle log'}</Text>
    {log.photos[0] ? <PrivatePhoto repo={repo} logId={log.id} id={log.photos[0].id} height={132} /> : log.track ? <PaddleTrackMap track={log.track} height={132} /> : null}
    {log.notes ? <Text numberOfLines={3} style={styles.logPreview}>{log.notes}</Text> : <Text style={styles.logPreviewMuted}>Add a note or photos to remember this day.</Text>}
    {log.track ? <PaddleStats distanceMeters={log.track.distanceMeters} elapsedSeconds={log.track.elapsedSeconds} /> : null}
    <View style={styles.recapPrivacy}><MaterialCommunityIcons name="lock-outline" size={14} color={colors.textMuted} /><Text style={styles.logPreviewMuted}>Private recap{log.photos?.length ? ` · ${log.photos.length} ${log.photos.length === 1 ? 'photo' : 'photos'}` : ''}</Text></View>
    <View style={styles.tripCardFooter}>
      <AppButton label="View recap" icon="arrow-right" onPress={onOpen} style={styles.tripCardButton} />
      <AppButton label="Plan again" icon="replay" variant="secondary" onPress={onPlanAgain} style={styles.tripCardButton} />
    </View>
  </View>;
}

function MetaPill({ icon, label }: { icon: ComponentProps<typeof MaterialCommunityIcons>['name']; label: string }) {
  return <View style={styles.metaPill}>
    <MaterialCommunityIcons name={icon} size={15} color={colors.accentDeep} />
    <Text style={styles.metaPillText}>{label}</Text>
  </View>;
}

function TripsEmptyState({ icon, title, body, actionLabel, onAction }: {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return <View style={styles.emptyCard}>
    <View style={styles.emptyIcon}><MaterialCommunityIcons name={icon} size={28} color={colors.accentDeep} /></View>
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyCopy}>{body}</Text>
    {actionLabel && onAction ? <AppButton label={actionLabel} icon="arrow-right" onPress={onAction} style={styles.emptyAction} /> : null}
  </View>;
}

function formatLocalDate(d: Date) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function formatLocalTime(d: Date) { return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; }
function trackingElapsedSeconds(session: PaddleTrackingSession, now: number) {
  const end = session.status === 'finished' && session.endedAt !== null ? session.endedAt : now;
  const currentPause = session.status === 'paused' && session.pausedAt !== null ? Math.max(0, end - session.pausedAt) : 0;
  return Math.max(0, Math.round((end - session.startedAt - session.pausedDurationMs - currentPause) / 1000));
}
function preparationValues(value?: TripPlan['preparation']) {
  return { checkInLocal: '', groupSize: null as number | null, boatDescription: '', vehicleDescription: '', note: '', ...value };
}
function ScheduleField({ label, value, onChange, disabled, optional = false, dateOnly = false }: {
  label: string; value: string; onChange: (value: string) => void; disabled: boolean; optional?: boolean; dateOnly?: boolean;
}) {
  const inputRef = useRef<TripTimeFieldHandle>(null);
  return <TripTimeField label={label} manualLabel={`${label} (${dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:MM'})`} value={value} onChange={onChange} editable={!disabled} inputRef={inputRef} optional={optional} dateOnly={dateOnly} />;
}
function Field({ label, value, onChange, placeholder, multiline = false, keyboardType, disabled = false }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean; keyboardType?: 'number-pad'; disabled?: boolean }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput editable={!disabled} accessibilityLabel={label} value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={colors.textMuted} multiline={multiline} keyboardType={keyboardType} style={[styles.input, multiline && { minHeight: 100, textAlignVertical: 'top' }]} /></View>;
}
const styles = StyleSheet.create({
  page: { padding: spacing.md, paddingTop: 55, paddingBottom: 40, gap: 14, backgroundColor: colors.canvas },
  hero: { paddingVertical: spacing.sm, gap: spacing.sm },
  heroCompact: { paddingVertical: spacing.xs },
  heroCompactTitle: { fontSize: 30, lineHeight: 36, marginTop: 0 },
  heroHeading: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  heroKickerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heroIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentDeep },
  heroKicker: { color: colors.accentDeep, fontSize: 11, fontWeight: '800', letterSpacing: 1.1 },
  heroTitle: { color: colors.text, fontSize: 31, lineHeight: 36, fontWeight: '800' },
  heroSubtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },
  heroSync: { flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 1 },
  heroSyncText: { color: colors.textMuted, fontSize: 11, lineHeight: 16, flexShrink: 1 },
  pastEntry: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingHorizontal: spacing.sm, marginTop: -8 },
  libraryTools: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center', marginTop: spacing.xs },
  searchToggle: { width: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center', borderRadius: radius.md, backgroundColor: colors.surfaceStrong, borderWidth: 1, borderColor: colors.border },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 12, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceStrong },
  searchInput: { flex: 1, minHeight: 48, paddingVertical: 10, fontSize: 15, color: colors.text },
  clearSearch: { minWidth: 44, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  planGroup: { gap: spacing.sm },
  groupHeading: { color: colors.textMuted, fontSize: 13, fontWeight: '800' },
  primaryActions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  primaryAction: { flexGrow: 1, flexBasis: 130, minWidth: 0, paddingHorizontal: spacing.sm },
  draftNotice: { flexDirection: 'row', alignItems: 'stretch', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.accentSoft, overflow: 'hidden' },
  draftResume: { flex: 1, minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 8, padding: spacing.sm }, draftCopy: { flex: 1, gap: 3 }, draftTitle: { fontSize: 14, lineHeight: 20, fontWeight: '700', color: colors.accentDeep },
  draftDiscard: { minWidth: 48, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: colors.border },
  offlineLink: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: spacing.md, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceStrong },
  offlineLinkText: { flex: 1, color: colors.accentDeep, fontSize: 13, fontWeight: '800' },
  notice: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, padding: spacing.md, backgroundColor: colors.accentSoft, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  noticeText: { flex: 1, color: colors.text, fontSize: 13, lineHeight: 19 },
  welcomeCard: { padding: spacing.lg, gap: spacing.sm, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceStrong, ...shadow },
  welcomeIcon: { width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 17, backgroundColor: colors.accentSoft },
  welcomeTitle: { ...typography.section, color: colors.text, marginTop: 3 },
  welcomeCopy: { ...typography.supporting, color: colors.textMuted },
  welcomeActions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xs },
  welcomeAction: { flexGrow: 1, flexBasis: 135 },
  startCard: { alignItems: 'flex-start', gap: spacing.sm, padding: spacing.lg, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceStrong, ...shadow },
  startIcon: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center', borderRadius: 17, backgroundColor: colors.accentSoft },
  startTitle: { ...typography.section, color: colors.text, marginTop: spacing.xs },
  startCopy: { ...typography.supporting, color: colors.textMuted },
  startAction: { alignSelf: 'stretch', marginTop: spacing.xs },
  heading: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 12 },
  body: { fontSize: 16, lineHeight: 24, color: colors.text },
  hint: { fontSize: 14, lineHeight: 21, color: colors.textMuted },
  segmentedTabs: { flex: 1, flexDirection: 'row', gap: 5, padding: 4, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceStrong },
  segmentButton: { flex: 1, minHeight: 43, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingHorizontal: 8, borderRadius: radius.md },
  segmentButtonActive: { backgroundColor: colors.accentDeep },
  segmentLabel: { color: colors.textMuted, fontSize: 14, fontWeight: '800' },
  segmentLabelActive: { color: colors.surfaceStrong },
  segmentCount: { minWidth: 21, height: 21, textAlign: 'center', textAlignVertical: 'center', overflow: 'hidden', borderRadius: radius.pill, backgroundColor: colors.canvasMuted, color: colors.textMuted, fontSize: 11, fontWeight: '900' },
  segmentCountActive: { backgroundColor: 'rgba(255, 255, 255, 0.18)', color: colors.surfaceStrong },
  field: { gap: 6, marginVertical: 3 },
  recapPrivacy: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  journalIllustration: { minHeight: 74, flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderRadius: radius.md, padding: spacing.md, backgroundColor: colors.accentSoft },
  journalLabel: { ...typography.supporting, color: colors.accentDeep, fontWeight: '700', flexShrink: 1 },
  label: { fontSize: 13, fontWeight: '700', color: colors.textMuted },
  input: { minHeight: 48, paddingHorizontal: 14, paddingVertical: 11, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceStrong, color: colors.text, fontSize: 15 },
  tripCard: { padding: spacing.md, gap: 10, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, backgroundColor: colors.surfaceStrong, ...shadow },
  cardTopline: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  metaPill: { maxWidth: '100%', minHeight: 28, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 9, paddingVertical: 5, borderRadius: radius.pill, backgroundColor: colors.accentSoft },
  metaPillText: { flexShrink: 1, color: colors.accentDeep, fontSize: 11, lineHeight: 16, fontWeight: '800' },
  updatedPill: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: radius.pill, backgroundColor: '#F3E8C9' },
  updatedText: { color: '#695321', fontSize: 10, fontWeight: '900' },
  pastDate: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  tripCardTitle: { ...typography.section, color: colors.text, marginTop: 2 },
  tripRiverName: { color: colors.textMuted, fontSize: 13, lineHeight: 18, fontWeight: '700' },
  routeLine: { minHeight: 40, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 10, paddingVertical: 10, borderRadius: radius.md, backgroundColor: colors.canvas },
  routeLineText: { flex: 1, color: colors.text, fontSize: 13, lineHeight: 19 },
  routeArrow: { color: colors.accent, fontWeight: '900' },
  tripCardFooter: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 2 },
  memberMeta: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  memberMetaText: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  tripCardButton: { flex: 1, minWidth: 0, paddingHorizontal: 9 },
  logPreview: { color: colors.text, fontSize: 14, lineHeight: 21 },
  logPreviewMuted: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  emptyCard: { alignItems: 'center', gap: spacing.sm, padding: spacing.lg, borderRadius: radius.lg, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.border, backgroundColor: colors.surface },
  emptyIcon: { width: 58, height: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: colors.accentSoft },
  emptyTitle: { ...typography.section, color: colors.text, textAlign: 'center' },
  emptyCopy: { ...typography.supporting, color: colors.textMuted, textAlign: 'center', maxWidth: 290 },
  emptyAction: { alignSelf: 'stretch', marginTop: spacing.xs },
  section: { gap: 8, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  photoItem: { gap: spacing.xs },
  row: { flexDirection: 'row', gap: 12 },
});

function findTripRouteMatches(routes: RiverSummaryApiItem[], query: string) {
  const normalized = normalizeSearchText(query);
  if (!normalized) return [];
  return routes.filter(item => normalizeSearchText([
    item.river.name, item.river.reach, item.river.region, item.river.state,
    item.river.distanceLabel, item.river.difficulty, item.river.routeType,
    item.river.putIn?.name, item.river.takeOut?.name, ...(item.river.accessPoints ?? []).map(point => point.name),
  ].filter(Boolean).join(' ')).includes(normalized)).sort((left, right) => {
    const rank = (item: RiverSummaryApiItem) => {
      const name = normalizeSearchText(item.river.name), reach = normalizeSearchText(item.river.reach);
      return name === normalized ? 0 : name.startsWith(normalized) ? 1 : reach.startsWith(normalized) ? 2 : 3;
    };
    return rank(left) - rank(right) || left.river.name.localeCompare(right.river.name) || left.river.reach.localeCompare(right.river.reach);
  });
}
