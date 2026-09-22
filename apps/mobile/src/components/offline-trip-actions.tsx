import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import type { RiverAccessPoint, RiverDetailApiResult } from '@paddletoday/api-contract';
import { apiClient } from '../api/client';
import { downloadOfflineTrip, listOfflineTrips, loadOfflineTrip, mappedAccess, offlineTripBytes, offlineTripId, removeOfflineTrip, retryOfflineGeometry, updateOfflineTripDraft, type OfflineTrip } from '../lib/offline-trips';
import { listTripDrafts, type TripDraft, type TripDraftRecord, type TripDraftTarget } from '../lib/trip-drafts';
import { compareOfflineTripDraft, compareOfflineTripDraftValues, offlineTripDraftFreshnessLabel, type OfflineTripDraftFreshness } from '../lib/offline-trip-freshness';
import { colors, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';
import { SectionCard } from './section-card';
import { OfflineTripView, offlineStatus } from './offline-trip-view';

const fetchGeometry = (slug: string, signal: AbortSignal) => apiClient.getRiverGeometry(slug, { signal });
const errorMessage = (error: unknown) => error instanceof Error ? error.message : 'Offline trip could not be saved. Please try again.';

export function PrepareOfflineTrip({ detail, putIn, takeOut, draft, ready, saveDraft, registerCancellation }: {
  detail: RiverDetailApiResult; putIn?: RiverAccessPoint; takeOut?: RiverAccessPoint; draft: TripDraft; ready: boolean;
  saveDraft: () => Promise<boolean>; registerCancellation: (cancel: (() => void) | null) => void;
}) {
  const [packet, setPacket] = useState<OfflineTrip | null>(null);
  const [loading, setLoading] = useState(true), [busy, setBusy] = useState(false), [message, setMessage] = useState('');
  const request = useRef<AbortController | null>(null), epoch = useRef(0);
  const target = { routeSlug: detail.river.slug, putInId: putIn?.id ?? null, takeOutId: takeOut?.id ?? null };
  const id = offlineTripId(target);
  const reload = useCallback(async () => {
    const generation = ++epoch.current;
    setLoading(true); setMessage('');
    try { const found = await loadOfflineTrip(AsyncStorage, target as TripDraftTarget);
      if (epoch.current === generation) setPacket(found); }
    catch { if (epoch.current === generation) setMessage('Saved offline trip could not be read. Retry before replacing it.'); }
    finally { if (epoch.current === generation) setLoading(false); }
  }, [id]);
  useEffect(() => {
    setPacket(null); void reload();
    const cancel = () => { request.current?.abort(); };
    registerCancellation(cancel);
    return () => { cancel(); request.current = null; epoch.current++; registerCancellation(null); };
  }, [reload, registerCancellation]);
  async function download() {
    if (!ready || request.current) return;
    const controller = new AbortController(); request.current = controller;
    setBusy(true); setMessage('');
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      if (!await saveDraft()) throw new Error('Your draft could not be saved. Retry saving the draft before downloading.');
      const saved = await downloadOfflineTrip(AsyncStorage, { detail, putIn, takeOut, draft }, fetchGeometry, controller.signal);
      if (request.current === controller) { setPacket(saved); setMessage(saved.missing.length ? 'Available details saved. Download is incomplete; retry when connected.' : 'Trip downloaded. Open it from Saved, even without a connection.'); }
    } catch (error) { if (request.current === controller) setMessage(controller.signal.aborted ? 'Download stopped or timed out. Your previous offline trip is unchanged. Retry when ready.' : errorMessage(error)); }
    finally { clearTimeout(timeout); if (request.current === controller) { request.current = null; setBusy(false); } }
  }
  async function updateDraftCopy() {
    if (!packet || request.current) return;
    const controller = new AbortController(); request.current = controller;
    setBusy(true); setMessage('');
    try {
      if (!await saveDraft()) throw new Error('Your draft could not be saved. Retry saving the draft before updating the offline copy.');
      const updated = await updateOfflineTripDraft(AsyncStorage, packet.target, draft, controller.signal);
      if (request.current === controller) { setPacket(updated); setMessage('Offline copy updated with your saved timing and notes.'); }
    } catch (error) { if (request.current === controller) setMessage(controller.signal.aborted ? 'Offline copy update stopped. Your previous copy is unchanged.' : errorMessage(error)); }
    finally { if (request.current === controller) { request.current = null; setBusy(false); } }
  }
  const draftFreshness = packet ? compareOfflineTripDraftValues(packet, draft) : null;
  return <SectionCard title="Prepare for offline use" subtitle="Save your selected landings, route outline, timing, notes, and a dated conditions snapshot. Background maps and live updates are not included. Reopen it from Saved → Trips.">
    {packet ? <OfflinePacketCard packet={packet} freshness={draftFreshness ?? undefined} disabled={busy || loading} onRemoved={() => setPacket(null)} onUpdated={setPacket} /> : null}
    {message ? <Text accessibilityLiveRegion="polite" style={styles.body}>{message}</Text> : null}
    {packet && draftFreshness?.state === 'differs' ? <AppButton label="Update offline copy" variant="secondary" busy={busy} busyLabel="Updating offline copy…"
      disabled={!ready} onPress={() => void updateDraftCopy()} /> : null}
    {loading ? <Text style={styles.body}>Checking offline trip…</Text> : <AppButton label={packet ? 'Refresh offline download' : 'Download offline trip'} busy={busy} busyLabel="Downloading offline trip…"
      disabled={!ready || !mappedAccess(putIn) || !mappedAccess(takeOut) || putIn.id === takeOut.id} onPress={() => void download()} />}
    {!mappedAccess(putIn) || !mappedAccess(takeOut) ? <Text style={styles.body}>Choose mapped put-in and take-out points to download a trip.</Text> : null}
    {busy ? <AppButton label="Cancel offline operation" variant="secondary" onPress={() => request.current?.abort()} /> : null}
    {message && !busy ? <AppButton label="Retry offline trip" variant="secondary" onPress={() => void reload()} /> : null}
  </SectionCard>;
}

function OfflinePacketCard({ packet, freshness, draft, disabled = false, onRemoved, onUpdated }: {
  packet: OfflineTrip; freshness?: OfflineTripDraftFreshness; draft?: TripDraft; disabled?: boolean; onRemoved: () => void; onUpdated: (packet: OfflineTrip) => void;
}) {
  const [open, setOpen] = useState(false), [confirm, setConfirm] = useState(false), [busy, setBusy] = useState(false), [message, setMessage] = useState('');
  const request = useRef<AbortController | null>(null), mounted = useRef(true), removing = useRef(false);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; request.current?.abort(); }; }, []);
  async function remove() {
    if (removing.current || request.current) return;
    removing.current = true; setBusy(true); setMessage('');
    try { await removeOfflineTrip(AsyncStorage, packet.target); if (mounted.current) onRemoved(); }
    catch { if (mounted.current) setMessage('Removal could not finish. Retry to remove the offline files. Your trip draft is kept separately.'); }
    finally { removing.current = false; if (mounted.current) setBusy(false); }
  }
  async function retry() {
    if (request.current || removing.current) return;
    const controller = new AbortController(); request.current = controller; setBusy(true); setMessage('');
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try { const updated = await retryOfflineGeometry(AsyncStorage, packet.target, fetchGeometry, controller.signal); if (mounted.current) onUpdated(updated); }
    catch { if (mounted.current) setMessage('Geometry download could not finish. Saved details are unchanged. Retry with a connection.'); }
    finally { clearTimeout(timeout); request.current = null; if (mounted.current) setBusy(false); }
  }
  async function updateDraftCopy() {
    if (!draft || freshness?.state !== 'differs' || request.current || removing.current) return;
    const controller = new AbortController(); request.current = controller; setBusy(true); setMessage('');
    try {
      const updated = await updateOfflineTripDraft(AsyncStorage, packet.target, draft, controller.signal);
      if (mounted.current) { onUpdated(updated); setMessage('Offline copy updated with your saved timing and notes.'); }
    } catch (error) { if (mounted.current) setMessage(controller.signal.aborted ? 'Offline copy update stopped. Your previous copy is unchanged.' : errorMessage(error)); }
    finally { request.current = null; if (mounted.current) setBusy(false); }
  }
  const label = `${packet.name}: ${packet.putIn.name} to ${packet.takeOut.name}`;
  return <View style={styles.card}>
    <Text accessibilityRole="header" style={styles.label}>{packet.name}</Text>
    <Text style={styles.body}>{packet.putIn.name} to {packet.takeOut.name}</Text>
    <Text style={styles.body}>{offlineStatus(packet)} · {Math.ceil(offlineTripBytes(packet) / 1024)} KB</Text>
    <Text style={styles.body}>Saved {new Date(packet.savedAt).toLocaleString()}</Text>
    {freshness ? <Text accessibilityLiveRegion="polite" style={styles.body}>{offlineTripDraftFreshnessLabel(freshness)}</Text> : null}
    {packet.missing.length ? <Text style={styles.body}>Missing: {packet.missing.join(', ')}. Update from Prepare trip for missing logistics.</Text> : null}
    <AppButton label="Open offline trip" accessibilityLabel={`Open offline trip for ${label}`} disabled={disabled || busy} onPress={() => setOpen(true)} />
    {freshness?.state === 'differs' && draft ? <AppButton label="Update offline copy" variant="secondary" busy={busy} busyLabel="Updating offline copy…" disabled={disabled || busy} onPress={() => void updateDraftCopy()} /> : null}
    {packet.missing.includes('Route geometry') ? <AppButton label="Retry geometry download" variant="secondary" disabled={disabled} busy={busy} onPress={() => void retry()} /> : null}
    {confirm ? <View style={styles.card}>
      <Text style={styles.body}>Remove this offline copy from this device? Your trip draft will remain.</Text>
      <AppButton label="Remove offline copy" busy={busy} disabled={disabled} onPress={() => void remove()} />
      <AppButton label="Keep offline copy" variant="secondary" disabled={disabled || busy} onPress={() => setConfirm(false)} />
    </View> : <AppButton label="Remove offline trip" accessibilityLabel={`Remove offline trip for ${label}`} variant="secondary" disabled={disabled || busy} onPress={() => setConfirm(true)} />}
    {message ? <Text accessibilityLiveRegion="polite" style={styles.body}>{message}</Text> : null}
    {open ? <OfflineTripView packet={packet} freshness={freshness} onClose={() => setOpen(false)} /> : null}
  </View>;
}

export function SavedOfflineTrips() {
  const [records, setRecords] = useState<OfflineTrip[]>([]), [drafts, setDrafts] = useState<TripDraftRecord[]>([]), [error, setError] = useState(''), [draftsReadable, setDraftsReadable] = useState(true), [loading, setLoading] = useState(true);
  const epoch = useRef(0);
  const draftsByTarget = useMemo(() => new Map(drafts.map(record => [offlineTripId(record.target), record])), [drafts]);
  const refresh = useCallback(async () => {
    const generation = ++epoch.current; setLoading(true);
    try { const [result, draftResult] = await Promise.all([listOfflineTrips(AsyncStorage), listTripDrafts(AsyncStorage)]);
      if (epoch.current === generation) {
        setRecords(result.records); setDrafts(draftResult.records); setDraftsReadable(draftResult.unreadable === 0);
        setError(result.unreadable ? 'Some offline trips could not be read. Nothing has been removed.' : draftResult.unreadable ? 'Some trip drafts could not be read. Offline-copy freshness cannot be confirmed.' : '');
      } }
    catch { if (epoch.current === generation) setError('Offline trips could not be read. Nothing has been removed.'); }
    finally { if (epoch.current === generation) setLoading(false); }
  }, []);
  useFocusEffect(useCallback(() => { void refresh(); return () => { epoch.current++; }; }, [refresh]));
  return <SectionCard title="Offline trips" subtitle="Open downloaded trip plans without a connection. Current conditions are unavailable in saved copies.">
    {loading ? <Text style={styles.body}>Loading offline trips…</Text> : null}
    {!loading && !records.length && !error ? <Text style={styles.body}>Open a route, choose your landings, then use Prepare trip → Download offline trip.</Text> : null}
    {error ? <><Text accessibilityLiveRegion="polite" style={styles.body}>{error}</Text><AppButton label="Retry offline trips" busy={loading} variant="secondary" onPress={() => void refresh()} /></> : null}
    {records.map(packet => {
      const draft = draftsByTarget.get(offlineTripId(packet.target));
      return <OfflinePacketCard key={offlineTripId(packet.target)} packet={packet} draft={draft?.draft} freshness={compareOfflineTripDraft(packet, draft, draftsReadable)} disabled={loading}
      onRemoved={() => { epoch.current++; setRecords(current => current.filter(p => offlineTripId(p.target) !== offlineTripId(packet.target))); }}
      onUpdated={updated => { epoch.current++; setRecords(current => current.map(p => offlineTripId(p.target) === offlineTripId(updated.target) ? updated : p)); }} />;
    })}
  </SectionCard>;
}
const styles = StyleSheet.create({
  card: { gap: spacing.sm, paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  body: { ...typography.supporting, color: colors.textMuted }, label: { ...typography.label, color: colors.text },
});
