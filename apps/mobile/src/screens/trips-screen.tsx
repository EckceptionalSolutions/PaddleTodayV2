import { useEffect, useState, useCallback, useRef } from 'react';
import { Alert, AppState, Image, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { createTripsClient, type PendingTripWork } from '@paddletoday/api-client';
import { newTripPlan, isTripPlan, tripPlan, historicalWaterSuggestion, type Trip, type TripPlan, type PaddleLogInput, type TripCommand, type RiverAccessPoint, type ShuttleVehicle, type TripRoute } from '@paddletoday/api-contract';
import { tripSession, subscribeTripSession, TRIP_RETURN_KEY } from '../lib/trip-session';
import { resolveApiBaseUrl, resolveWebUrl } from '../lib/api-base-url';
import { AppButton } from '../components/app-button';
import { SectionCard } from '../components/section-card';
import { colors, spacing } from '../theme/tokens';
import { openExternalUrl } from '../lib/external-links';
import { apiClient } from '../api/client';
import { tripDeviceStorage } from '../lib/trip-device-storage';

const emptyWater = () => ({ gaugeId: '', gaugeName: '', value: '', unit: '', measuredAt: '', source: '', note: '' });
export default function TripsScreen() {
  const params = useLocalSearchParams<{ id?: string; invite?: string; view?: string; route?: string; name?: string }>();
  const [repo, setRepo] = useState(tripSession());
  const [, refresh] = useState(0);
  const [selected, setSelected] = useState(params.id || '');
  const [invitation, setInvitation] = useState(params.invite || '');
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [editing, setEditing] = useState<TripPlan | null>(null), [editId, setEditId] = useState('');
  const editingBaseline = useRef<TripPlan | undefined>(undefined);
  const [log, setLog] = useState<PaddleLogInput | null>(null), [logId, setLogId] = useState('');
  const logRevision = useRef(0);
  const [accessPoints, setAccessPoints] = useState<RiverAccessPoint[]>([]);
  const [search, setSearch] = useState(''), [message, setMessage] = useState(''), [busy, setBusy] = useState(false);
  const [shareLink, setShareLink] = useState(''), [recover, setRecover] = useState<PendingTripWork | null>(null);
  const [vehicle, setVehicle] = useState({ label: '', seats: '3', meeting: '', time: '', parkedAt: '', note: '' });
  const [vehicleEdit, setVehicleEdit] = useState<{ vehicle: ShuttleVehicle; revision: number } | null>(null);
  const [memberName, setMemberName] = useState('');
  const [publicTrip, setPublicTrip] = useState<TripPlan | null>(null);
  const [invitePreview, setInvitePreview] = useState<{ title: string; date: string; route: TripRoute } | null>(null);
  const [inviteError, setInviteError] = useState('');
  const [editorReadyUid, setEditorReadyUid] = useState<string | null>(null);
  const state = repo?.getSnapshot(), trip = state?.trips[selected];
  useEffect(() => subscribeTripSession(() => { setEditing(null); setLog(null); setRecover(null); setVehicleEdit(null); setShareLink(''); setRepo(tripSession()); }), []);
  useEffect(() => repo?.subscribe(() => refresh(n => n + 1)), [repo]);
  useEffect(() => {
    let active = true; setEditorReadyUid(null);
    if (!repo) return;
    void tripDeviceStorage.getItem(repo.storageKey + ':editor').then(raw => {
      if (!active) return;
      if (raw && !params.id) {
        const draft = JSON.parse(raw); setEditing(draft.editing); setEditId(draft.editId); editingBaseline.current = draft.baseline;
        setLog(draft.log); setLogId(draft.logId); logRevision.current = draft.logRevision ?? 0;
      }
      setEditorReadyUid(repo.uid);
    }).catch(() => { if (active) setMessage('An unfinished editor could not be restored. Your saved trips are unchanged.'); });
    return () => { active = false; };
  }, [repo, params.id]);
  useEffect(() => {
    if (!repo || editorReadyUid !== repo.uid || (!editing && !log)) return;
    const value = JSON.stringify({ editing, editId, baseline: editingBaseline.current, log, logId, logRevision: logRevision.current });
    const timer = setTimeout(() => void tripDeviceStorage.setItem(repo.storageKey + ':editor', value).catch(() => setMessage('Could not save this editor on the device. Keep the screen open and try Save again.')), 350);
    return () => clearTimeout(timer);
  }, [repo, editorReadyUid, editing, editId, log, logId]);
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
    void sync(); const timer = setInterval(() => void sync(), 15000);
    const subscription = AppState.addEventListener('change', s => { if (s === 'active') void sync(); });
    return () => { clearInterval(timer); subscription.remove(); };
  }, [sync]));
  const run = (action: () => Promise<void>) => {
    if (busy) return;
    setBusy(true); void action().catch(e => setMessage(e instanceof Error ? e.message : 'Could not complete this action.')).finally(() => setBusy(false));
  };
  const command = async (c: TripCommand) => { if (!repo) return; await repo.command(selected, c); await sync(); };
  function confirm(title: string, action: () => Promise<void>) { Alert.alert(title, 'This change applies to the saved trip.', [{ text: 'Keep', style: 'cancel' }, { text: 'Continue', style: 'destructive', onPress: () => run(action) }]); }
  async function signIn() {
    const query = new URLSearchParams(); if (selected) query.set('id', selected); if (invitation) query.set('invite', invitation);
    await AsyncStorage.setItem(TRIP_RETURN_KEY, '/trips?' + query.toString()); router.push('/account');
  }
  function startLog(t?: Trip) {
    const existing = t && state?.logs[t.id];
    logRevision.current = existing?.revision ?? 0;
    setLogId(existing?.id || '');
    setLog(existing || { sourceTripId: t?.id || null, route: t ? tripPlan(t).route : newTripPlan().route, date: t?.date || localDate(), time: t?.launch || '', timeZone: t?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone, notes: '', paddleAgain: '', water: [] });
  }
  async function link(purpose: 'view' | 'invite') {
    const token = Crypto.randomUUID().replaceAll('-', '') + Crypto.randomUUID().replaceAll('-', '');
    await repo!.command(selected, { type: 'link', purpose, token }); await repo!.sync();
    if (repo!.getSnapshot().pending.some(p => p.id === selected)) throw new Error('Connect and finish syncing before sharing a link.');
    const url = resolveWebUrl(`/trips/?id=${selected}#${purpose}=${token}`); setShareLink(url);
    await Share.share({ message: `${trip!.title}\n${url}` });
  }
  async function addPhotos() {
    if (!repo || !logId) return;
    const existing = repo.getSnapshot().logs[logId]?.photos.length ?? 0;
    const queued = repo.getSnapshot().pending.filter(p => p.kind === 'photo' && p.id === logId).length;
    const remaining = Math.max(0, 10 - existing - queued);
    if (!remaining) throw new Error('This paddle already has 10 saved or queued photos.');
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsMultipleSelection: true, selectionLimit: remaining, quality: 0.85 });
    if (result.canceled) return;
    const session = repo, destination = logId;
    for (const image of result.assets.slice(0, remaining)) {
      if ((image.fileSize || 0) > 10 * 1024 * 1024) throw new Error('Choose photos smaller than 10 MiB.');
      const transformed = await manipulateAsync(image.uri, [{ resize: image.width > image.height ? { width: Math.min(image.width, 1920) } : { height: Math.min(image.height, 1920) } }], { compress: 0.8, format: SaveFormat.JPEG, base64: true });
      if (!transformed.base64) throw new Error('This photo could not be read. Please select it again.');
      // Persist bytes with the queued operation; temporary picker URIs do not survive reliably.
      await session.photo(destination, transformed.base64);
    }
    await sync();
  }
  const B = ({ label, onPress, secondary = false }: { label: string; onPress: () => void; secondary?: boolean }) => <AppButton label={label} disabled={busy} variant={secondary ? 'secondary' : 'primary'} onPress={onPress} />;
  const routeFields = (p: TripPlan['route'], update: (value: TripPlan['route']) => void) => <>
    <Field label="River or location" value={p.name} onChange={name => update({ ...p, name })} />
    <Field label="Put-in" value={p.putInName} onChange={putInName => update({ ...p, putInName, putInId: '' })} />
    <Field label="Take-out" value={p.takeOutName} onChange={takeOutName => update({ ...p, takeOutName, takeOutId: '' })} />
    {p.slug ? <B label={accessPoints.length ? 'Hide access choices' : 'Choose route access points'} secondary onPress={() => run(async () => { if (accessPoints.length) { setAccessPoints([]); return; } const detail = await apiClient.getRiverDetail(p.slug); setAccessPoints(detail.result.river.accessPoints ?? [detail.result.river.putIn, detail.result.river.takeOut].filter((v): v is RiverAccessPoint => !!v)); })} /> : null}
    {accessPoints.map(a => <View key={a.id}><Text style={styles.body}>{a.name}</Text><B label="Put in here" secondary onPress={() => { update({ ...p, putInId: a.id || '', putInName: a.name }); setAccessPoints([]); }} /><B label="Take out here" secondary onPress={() => { update({ ...p, takeOutId: a.id || '', takeOutName: a.name }); setAccessPoints([]); }} /></View>)}
    {!p.slug ? <Text style={styles.hint}>You can also start from a route’s Prepare Trip screen to select access points.</Text> : null}
  </>;
  return <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
    <Text style={styles.title}>My trips</Text>
    {state?.lastSync ? <Text style={styles.hint}>Last synced {new Date(state.lastSync).toLocaleString()}</Text> : null}
    {message ? <Text style={styles.notice} accessibilityLiveRegion="polite">{message}</Text> : null}
    {publicTrip ? <SectionCard title={publicTrip.title} subtitle="Shared trip plan"><Text>{publicTrip.route.name}</Text><Text>{publicTrip.route.putInName} → {publicTrip.route.takeOutName}</Text><Text>{publicTrip.date} {publicTrip.launch} ({publicTrip.timeZone})</Text>{publicTrip.itinerary.map(s => <Text key={s.id}>{s.time} {s.location}: {s.note}</Text>)}</SectionCard> : null}
    {!repo && !params.view ? <SectionCard title="Welcome to PaddleToday" subtitle="Your next paddle starts here."><B label="Sign in" onPress={() => run(signIn)} /><B label="Plan a trip" secondary onPress={() => { setEditing(newTripPlan()); setEditId(''); }} /></SectionCard> : null}
    {invitation && params.id ? <SectionCard title={invitePreview?.title || 'Trip invitation'} subtitle={invitePreview ? 'Joining lets you view and edit the shared itinerary.' : undefined}><Text style={styles.body}>{invitePreview ? `${invitePreview.route.name} · ${invitePreview.date || 'Date to be decided'}` : inviteError || 'Checking this invitation…'}</Text>{invitePreview && state?.trips[selected] ? <Text style={styles.hint}>You already have access to this trip.</Text> : repo && invitePreview ? <B label="Join trip" onPress={() => run(async () => { await command({ type: 'join', token: invitation }); if (repo.getSnapshot().trips[selected]) setInvitation(''); })} /> : !repo && invitePreview ? <Text style={styles.hint}>Sign in below to join this trip.</Text> : null}</SectionCard> : null}
    {state?.pending.length ? <SectionCard title={`${state.pending.length} change(s) waiting`}><B label="Sync now" secondary onPress={() => run(sync)} />{state.pending.filter(p => p.error).map(p => <B key={p.key} label="Review saved change" onPress={() => setRecover(p)} secondary />)}</SectionCard> : null}
    {recover ? <SectionCard title="Choose which changes to keep" subtitle={recover.error}>
      <Text style={styles.heading}>Your saved changes</Text><Text selectable style={styles.body}>{recoverySummary(recover)}</Text>
      <Text style={styles.heading}>Latest account copy</Text><Text selectable style={styles.body}>{recoveryLatestSummary(recover) || 'The saved account copy is unavailable.'}</Text>
      <B label="Copy my change" secondary onPress={() => run(async () => { await Share.share({ message: recoverySummary(recover) }); })} />
      <B label={recover.latest && (recover.kind === 'trip' ? 'members' in recover.latest : 'photos' in recover.latest) ? 'Keep account copy' : 'Remove inaccessible change'} secondary onPress={() => run(async () => { await repo!.keepLatest(recover.key); setRecover(null); })} />
      {recover.errorStatus === 409 && recover.latest && (recover.kind === 'trip' ? 'members' in recover.latest && recover.input.command.type !== 'create' : 'photos' in recover.latest) ? <B label={recover.kind === 'photo' ? 'Retry photo upload' : 'Apply my saved changes'} onPress={() => run(async () => { await repo!.retry(recover.key); setRecover(null); })} /> : null}
      <B label="Back" secondary onPress={() => setRecover(null)} />
    </SectionCard> : null}
    {editing ? <SectionCard title={editId ? 'Edit trip' : 'Plan your paddle'}>
      <Field label="Trip title" value={editing.title} onChange={title => setEditing({ ...editing, title })} />
      {routeFields(editing.route, route => setEditing({ ...editing, route }))}
      <Field label="Planned date (YYYY-MM-DD, optional)" value={editing.date} onChange={date => setEditing({ ...editing, date })} placeholder="2026-10-04" />
      <Field label="Launch time (HH:MM, optional)" value={editing.launch} onChange={launch => setEditing({ ...editing, launch })} placeholder="09:00" />
      <Field label="Expected return (HH:MM, optional)" value={editing.expected} onChange={expected => setEditing({ ...editing, expected })} />
      <Field label="Trip time zone" value={editing.timeZone} onChange={timeZone => setEditing({ ...editing, timeZone })} />
      <Text style={styles.heading}>Shared itinerary</Text><Text style={styles.hint}>Meeting stops are visible to members and people with a view link.</Text>
      {editing.itinerary.map((stop, i) => <View key={stop.id} style={styles.section}>
        <Field label="Meeting place" value={stop.location} onChange={location => setEditing({ ...editing, itinerary: editing.itinerary.map((s, j) => j === i ? { ...s, location } : s) })} />
        <Field label="Time (HH:MM)" value={stop.time} onChange={time => setEditing({ ...editing, itinerary: editing.itinerary.map((s, j) => j === i ? { ...s, time } : s) })} />
        <Field label="Details" value={stop.note} multiline onChange={note => setEditing({ ...editing, itinerary: editing.itinerary.map((s, j) => j === i ? { ...s, note } : s) })} />
        <B label="Remove stop" secondary onPress={() => setEditing({ ...editing, itinerary: editing.itinerary.filter(s => s.id !== stop.id) })} />
      </View>)}
      <B label="Add meeting stop" secondary onPress={() => setEditing({ ...editing, itinerary: [...editing.itinerary, { id: Crypto.randomUUID(), time: '', location: '', note: '' }] })} />
      <B label={repo ? 'Save trip' : 'Save and sign in'} onPress={() => run(async () => {
        if (!isTripPlan(editing)) throw new Error('Enter a title and location, and check the trip date and time.');
        if (!repo) { await AsyncStorage.setItem('paddletoday:trip-guest-draft', JSON.stringify({ id: Crypto.randomUUID(), plan: editing })); await signIn(); return; }
        const id = await repo.savePlan(editing, editId || undefined, editId ? editingBaseline.current : undefined); await tripDeviceStorage.removeItem(repo.storageKey + ':editor'); setSelected(id); setEditing(null); await sync();
      })} /><B label="Back" secondary onPress={() => setEditing(null)} />
    </SectionCard> : log ? <SectionCard title="Your paddle" subtitle="Your notes and photos are private.">
      {routeFields(log.route, route => setLog({ ...log, route }))}
      <Field label="Date paddled (YYYY-MM-DD)" value={log.date} onChange={date => setLog({ ...log, date })} />
      <Field label="Launch time (optional, HH:MM)" value={log.time} onChange={time => setLog({ ...log, time })} />
      <Field label="Time zone" value={log.timeZone} onChange={timeZone => setLog({ ...log, timeZone })} />
      <Field label="Notes" value={log.notes} multiline onChange={notes => setLog({ ...log, notes })} />
      <Text style={styles.heading}>Would paddle again?</Text>{(['yes', 'no', 'unsure'] as const).map(v => <B key={v} label={`${log.paddleAgain === v ? '✓ ' : ''}${v === 'yes' ? 'Yes' : v === 'no' ? 'No' : 'Unsure'}`} secondary onPress={() => setLog({ ...log, paddleAgain: v })} />)}
      <Text style={styles.heading}>Water observation</Text><Text style={styles.hint}>Record the level during your paddle, with its source and measurement time.</Text>
      {log.route.slug ? <B label="Find a recorded water reading" secondary onPress={() => run(async () => {
        const result = await apiClient.getRiverHistory(log.route.slug, { days: 30 });
        const suggestion = historicalWaterSuggestion(result.result, log.date, log.timeZone);
        if (!suggestion) throw new Error('No recorded reading is available for this date. Add your own observation if you have one.');
        setLog({ ...log, water: [suggestion] }); setMessage(suggestion.note);
      })} /> : null}
      {(['value', 'unit', 'gaugeName', 'measuredAt', 'source', 'note'] as const).map(key => <Field key={key} label={({ value: 'Level / flow', unit: 'Unit (ft, cfs, m³/s)', gaugeName: 'Gauge / location', measuredAt: 'Measurement date and time', source: 'Source', note: 'Observation notes' })[key]} value={log.water[0]?.[key] || ''} onChange={text => setLog({ ...log, water: [{ ...(log.water[0] || emptyWater()), [key]: text }] })} />)}
      <B label="Save paddle" onPress={() => run(async () => { const id = await repo!.saveLog(log, logId || undefined, logRevision.current); setLogId(id); logRevision.current = repo!.getSnapshot().logs[id]!.revision; await sync(); })} />
      {logId ? <><Text style={styles.heading}>Photos · {state?.logs[logId]?.photos.length || 0} saved · {state?.pending.filter(p => p.kind === 'photo' && p.id === logId).length || 0} waiting</Text>{state?.pending.filter(p => p.kind === 'photo' && p.id === logId).map(p => <Text key={p.key} style={styles.hint}>{p.error ? `Upload needs attention: ${p.error}` : 'Photo upload waiting to sync.'}</Text>)}<B label="Add photos" secondary onPress={() => run(addPhotos)} />{state?.logs[logId]?.photos.map(p => <View key={p.id}><PrivatePhoto repo={repo!} logId={logId} id={p.id} /><B label="Remove photo" secondary onPress={() => confirm('Remove this photo?', async () => { await repo!.client.removePhoto(logId, p.id); await sync(); })} /></View>)}<B label="Delete paddle" secondary onPress={() => confirm('Delete this log and its photos?', async () => { await repo!.deleteLog(logId); setLog(null); await sync(); })} /></> : <Text style={styles.hint}>Save the paddle to add photos.</Text>}
      <B label="Back" secondary onPress={() => setLog(null)} />
    </SectionCard> : trip ? <>
      <B label="← All trips" secondary onPress={() => { setSelected(''); setVehicleEdit(null); }} />
      <SectionCard title={trip.title} subtitle={`${trip.date || 'Date to be decided'} · ${trip.status}`}>
        <Text style={styles.body}>{trip.route.name}</Text><Text style={styles.body}>{trip.route.putInName} → {trip.route.takeOutName}</Text><Text style={styles.body}>{trip.launch || 'Time to be decided'} ({trip.timeZone})</Text>
        <B label="Edit trip" onPress={() => { editingBaseline.current = tripPlan(trip); setEditing(tripPlan(trip)); setEditId(trip.id); }} />
        <B label="Log this paddle" secondary onPress={() => startLog(trip)} />
        <B label="Plan again" secondary onPress={() => { setEditing(newTripPlan(trip.route)); setEditId(''); }} />
        {trip.route.slug ? <B label="Route, conditions & offline download" secondary onPress={() => router.push({ pathname: '/river/[slug]', params: { slug: trip.route.slug, putin: trip.route.putInId, takeout: trip.route.takeOutId } })} /> : null}
        {state?.recovery[trip.id] ? <View><Text style={styles.hint}>Original draft: confirm the time zone before sharing.</Text><Text selectable style={styles.hint}>{state.recovery[trip.id]}</Text></View> : null}
      </SectionCard>
      <SectionCard title="Itinerary">{trip.itinerary.length ? trip.itinerary.map(s => <Text key={s.id} style={styles.body}>{s.time} {s.location}{'\n'}{s.note}</Text>) : <Text style={styles.hint}>Add meeting stops in Edit trip.</Text>}</SectionCard>
      <SectionCard title="Paddling partners">
        <Field label="My name for this trip" value={memberName} onChange={setMemberName} placeholder={trip.members.find(m => m.uid === repo?.uid)?.name || 'Your name'} />
        <B label="Update my name" secondary onPress={() => run(() => command({ type: 'name', name: memberName }))} />
        {trip.members.map(m => <View key={m.uid}><Text style={styles.body}>{m.name} · {m.rsvp} {m.role === 'owner' ? '· Organizer' : ''}</Text>{trip.ownerUid === repo!.uid && m.uid !== repo!.uid ? <><B label={`Remove ${m.name}`} secondary onPress={() => confirm('Remove this paddler?', () => command({ type: 'remove-member', uid: m.uid }))} /><B label={`Make ${m.name} organizer`} secondary onPress={() => confirm('Transfer organizer permissions?', () => command({ type: 'transfer', uid: m.uid }))} /></> : null}</View>)}
        {(['going', 'maybe', 'not-going'] as const).map(rsvp => <B key={rsvp} label={rsvp === 'not-going' ? 'Not going' : rsvp === 'going' ? 'Going' : 'Maybe'} secondary onPress={() => run(() => command({ type: 'rsvp', rsvp }))} />)}
        {trip.ownerUid === repo!.uid ? <><B label="Invite people" onPress={() => run(() => link('invite'))} /><B label="Share view-only link" secondary onPress={() => run(() => link('view'))} /><Text style={styles.hint}>Invitations let anyone with the link join and edit for seven days. View links show the route, access points, date, and itinerary for 30 days; paddler names, shuttle details, and personal logs stay private. Creating a new link replaces the previous link of the same type.</Text><B label="Revoke invitation" secondary onPress={() => run(() => command({ type: 'revoke', purpose: 'invite' }))} /><B label="Revoke view link" secondary onPress={() => run(() => command({ type: 'revoke', purpose: 'view' }))} /></> : <B label="Leave trip" secondary onPress={() => confirm('Leave this trip?', () => command({ type: 'remove-member', uid: repo!.uid }))} />}
        {shareLink ? <Text selectable style={styles.hint}>{shareLink}</Text> : null}
      </SectionCard>
      <SectionCard title="Shuttle" subtitle="Shuttle details are visible only to trip members.">
        <Text style={styles.hint}>{trip.members.filter(m => m.rsvp === 'going' && !trip.shuttle.some(v => v.driverUid === m.uid || v.passengers.includes(m.uid))).length} paddler(s) still need a ride.</Text>
        {trip.shuttle.map(v => <View key={v.id} style={styles.section}><Text style={styles.heading}>{v.label}</Text><Text style={styles.body}>{v.passengers.length}/{v.seats} passenger seats filled. Meet at {v.meeting} {v.time}. Car stays at {v.parkedAt}.</Text><Text style={styles.body}>{v.note}</Text><Text style={styles.hint}>Driver: {trip.members.find(m => m.uid === v.driverUid)?.name}. Passengers: {v.passengers.map(p => trip.members.find(m => m.uid === p)?.name).join(', ') || 'None yet'}</Text><B label={v.passengers.includes(repo!.uid) ? 'Leave this ride' : 'Take a seat'} secondary onPress={() => run(() => command({ type: 'seat', vehicleId: v.passengers.includes(repo!.uid) ? null : v.id }))} />{v.driverUid === repo!.uid || trip.ownerUid === repo!.uid ? <><B label="Edit vehicle" secondary onPress={() => { setVehicleEdit({ vehicle: v, revision: trip.revision }); setVehicle({ label: v.label, seats: String(v.seats), meeting: v.meeting, time: v.time, parkedAt: v.parkedAt, note: v.note }); }} /><B label="Remove vehicle" secondary onPress={() => confirm('Remove this vehicle?', () => command({ type: 'remove-vehicle', vehicleId: v.id }))} /></> : null}</View>)}
        <Text style={styles.heading}>{vehicleEdit ? 'Edit vehicle' : 'Add my vehicle'}</Text>{(['label', 'seats', 'meeting', 'time', 'parkedAt', 'note'] as const).map(k => <Field key={k} label={({ label: 'Vehicle label', seats: 'Passenger seats', meeting: 'Meeting place', time: 'Time (HH:MM)', parkedAt: 'Car stays at', note: 'Shuttle notes' })[k]} value={vehicle[k]} onChange={v => setVehicle({ ...vehicle, [k]: v })} />)}
        <B label={vehicleEdit ? 'Save vehicle' : 'Add vehicle'} secondary onPress={() => run(async () => { await repo!.command(selected, { type: 'vehicle', vehicle: { ...vehicle, id: vehicleEdit?.vehicle.id || Crypto.randomUUID(), driverUid: vehicleEdit?.vehicle.driverUid || repo!.uid, seats: Number(vehicle.seats), passengers: vehicleEdit?.vehicle.passengers || [] } }, vehicleEdit?.revision); setVehicleEdit(null); setVehicle({ label: '', seats: '3', meeting: '', time: '', parkedAt: '', note: '' }); await sync(); })} />
        {vehicleEdit ? <B label="Cancel vehicle edit" secondary onPress={() => setVehicleEdit(null)} /> : null}
      </SectionCard>
      <SectionCard title="Recent changes">{trip.activity.slice(-5).reverse().map(a => <Text key={a.revision} style={styles.hint}>{trip.members.find(m => m.uid === a.actor)?.name || 'Paddler'} · {a.action} · {new Date(a.at).toLocaleString()}</Text>)}</SectionCard>
      {trip.ownerUid === repo!.uid ? <SectionCard title="Trip status"><B label="Mark plan completed" secondary onPress={() => run(() => command({ type: 'status', status: 'completed' }))} /><B label="Cancel trip" secondary onPress={() => confirm('Cancel this shared trip?', () => command({ type: 'status', status: 'cancelled' }))} /><B label="Delete trip" secondary onPress={() => confirm('Delete this trip for everyone?', () => command({ type: 'delete' }))} /></SectionCard> : null}
    </> : repo && !params.view ? <>
      <B label="Plan a trip" onPress={() => { setEditing(newTripPlan()); setEditId(''); }} /><B label="Add past paddle" secondary onPress={() => startLog()} />
      <View style={styles.row}><B label="Upcoming" secondary onPress={() => setTab('upcoming')} /><B label="Past" secondary onPress={() => setTab('past')} /></View>
      <Field label="Find a trip" value={search} onChange={setSearch} placeholder="River or trip name" />
      {tab === 'upcoming' ? Object.values(state?.trips || {}).filter(t => t.status === 'planned' && t.title.toLowerCase().includes(search.toLowerCase())).sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999')).map(t => <SectionCard key={t.id} title={t.title} subtitle={`${t.date || 'Draft'} · ${t.members.length} paddler(s)`}><Text style={styles.body}>{t.route.putInName} → {t.route.takeOutName}</Text>{(state?.viewed[t.id] ?? 0) < t.revision ? <Text style={styles.hint}>Updated since your last visit</Text> : null}<B label="Open trip" onPress={() => { setSelected(t.id); void repo.markViewed(t.id); }} /></SectionCard>) : <>
        {Object.values(state?.logs || {}).filter(l => l.route.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => b.date.localeCompare(a.date)).map(l => <SectionCard key={l.id} title={l.route.name} subtitle={l.date}><Text style={styles.body}>{l.notes.slice(0, 180)}</Text><Text style={styles.hint}>{l.paddleAgain === 'yes' ? 'Would paddle again' : ''}</Text><B label="Open paddle log" onPress={() => { logRevision.current = l.revision; setLog(l); setLogId(l.id); }} /><B label="Plan again" secondary onPress={() => { setEditing(newTripPlan(l.route)); setEditId(''); }} /></SectionCard>)}
        {Object.values(state?.trips || {}).filter(t => t.status !== 'planned').map(t => <SectionCard key={t.id} title={t.title} subtitle={t.status}><B label="Open plan" secondary onPress={() => setSelected(t.id)} /><B label="Log my paddle" onPress={() => startLog(t)} /></SectionCard>)}
      </>}
      {!Object.keys(state?.trips || {}).length && !Object.keys(state?.logs || {}).length ? <Text style={styles.hint}>Choose a route to plan your next paddle, or add a past outing to start your log.</Text> : null}
      <B label="Open My trips on the website" secondary onPress={() => run(async () => { await openExternalUrl(resolveWebUrl('/trips/')); })} />
      <B label="Export my trips" secondary onPress={() => run(async () => { const exported = await repo.client.export(); await Share.share({ message: JSON.stringify(exported, null, 2) }); })} />
    </> : null}
  </ScrollView>;
}
function localDate() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function recoverySummary(item: PendingTripWork) {
  if (item.kind === 'trip') {
    const command = item.input.command;
    if (command.type !== 'plan') return `Your saved action: ${command.type}`;
    const p = command.plan;
    return [p.title, p.route.name, `${p.route.putInName || 'Put-in not set'} → ${p.route.takeOutName || 'Take-out not set'}`, p.date || 'No date selected', ...p.itinerary.map(s => `${s.time || 'Time not set'} · ${s.location || 'Meeting place not set'}${s.note ? ` · ${s.note}` : ''}`)].join('\n');
  }
  if (item.kind === 'log') {
    const v = item.input.value;
    return v ? [v.route.name, v.date, v.notes || 'No personal notes', v.paddleAgain ? `Would paddle again: ${v.paddleAgain}` : '', v.water[0] ? `Water: ${v.water[0].value} ${v.water[0].unit} · ${v.water[0].gaugeName} · ${v.water[0].measuredAt}` : 'No water observation'].filter(Boolean).join('\n') : 'Delete this paddle log';
  }
  return `Photo upload${item.caption ? `: ${item.caption}` : ''}`;
}
function recoveryLatestSummary(item: PendingTripWork) {
  if (!item.latest) return '';
  if (item.kind === 'trip' && 'members' in item.latest) {
    const p = tripPlan(item.latest);
    return [p.title, p.route.name, `${p.route.putInName || 'Put-in not set'} → ${p.route.takeOutName || 'Take-out not set'}`, p.date || 'No date selected', ...p.itinerary.map(s => `${s.time || 'Time not set'} · ${s.location || 'Meeting place not set'}${s.note ? ` · ${s.note}` : ''}`)].join('\n');
  }
  if (item.kind !== 'trip' && 'photos' in item.latest) return recoveryLogSummary(item.latest);
  return '';
}
function recoveryLogSummary(value: PaddleLogInput) {
  const water = value.water[0];
  return [value.route.name, value.date, value.notes || 'No personal notes', value.paddleAgain ? `Would paddle again: ${value.paddleAgain}` : '', water ? `Water: ${water.value} ${water.unit} · ${water.gaugeName} · ${water.measuredAt}` : 'No water observation'].filter(Boolean).join('\n');
}
function Field({ label, value, onChange, placeholder, multiline = false }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput accessibilityLabel={label} value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={colors.textMuted} multiline={multiline} style={[styles.input, multiline && { minHeight: 100, textAlignVertical: 'top' }]} /></View>;
}
function PrivatePhoto({ repo, logId, id }: { repo: NonNullable<ReturnType<typeof tripSession>>; logId: string; id: string }) {
  const [uri, setUri] = useState('');
  useEffect(() => { let active = true; void repo.client.photo(logId, id).then(blob => new Promise<string>((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(String(r.result)); r.onerror = reject; r.readAsDataURL(blob); })).then(v => { if (active) setUri(v); }).catch(() => {}); return () => { active = false; }; }, [repo, logId, id]);
  return uri ? <Image source={{ uri }} style={{ width: '100%', height: 220, borderRadius: 12 }} accessibilityLabel="Photo from your paddle" /> : <Text style={styles.hint}>Photo available when connected.</Text>;
}
const styles = StyleSheet.create({ page: { padding: spacing.md, paddingTop: 55, paddingBottom: 40, gap: 14, backgroundColor: colors.canvas }, title: { fontSize: 30, fontWeight: '800', color: colors.text }, heading: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 12 }, body: { fontSize: 16, lineHeight: 24, color: colors.text }, hint: { fontSize: 14, lineHeight: 21, color: colors.textMuted }, notice: { padding: 14, backgroundColor: colors.surfaceStrong, borderRadius: 12, color: colors.text }, field: { gap: 6, marginVertical: 6 }, label: { fontSize: 14, fontWeight: '600', color: colors.text }, input: { minHeight: 46, padding: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 10, backgroundColor: colors.surfaceStrong, color: colors.text, fontSize: 16 }, section: { gap: 8, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }, row: { flexDirection: 'row', gap: 12 } });
