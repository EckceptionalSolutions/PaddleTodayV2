import { useReducedMotion } from '../hooks/use-reduced-motion';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RiverDetailApiResult, RiverRouteAccessPoint, RiverAccessPoint } from '@paddletoday/api-contract';
import { buildFloatPlanMessage, estimateSegmentDurationMinutes, parseDistanceMiles, type TripPlanInput } from '@paddletoday/trip-pack';
import { resolveApiUrl } from '../lib/api-base-url';
import { openExternalUrl } from '../lib/external-links';
import { useTripDraft } from '../hooks/use-trip-draft';
import { localTripTime as localInput, parseTripTime as parseLocal } from '../lib/trip-time';
import { TripTimeField, type TripTimeFieldHandle } from './trip-time-field';
import { TripDraftNotice } from './trip-draft-notice';
import { colors, radius, spacing } from '../theme/tokens';

type PrepareTripSheetProps = {
  visible: boolean;
  detail: RiverDetailApiResult;
  putIn?: RiverAccessPoint;
  takeOut?: RiverAccessPoint;
  accessPoints: RiverRouteAccessPoint[];
  onClose: () => void;
  onAction?: (action: 'gpx' | 'calendar' | 'float_plan') => void;
};

export function PrepareTripSheet({ visible, detail, putIn, takeOut, accessPoints, onClose, onAction }: PrepareTripSheetProps) {
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const distanceMiles = selectedDistance(accessPoints, putIn, takeOut, detail);
  const estimated = distanceMiles ? estimateSegmentDurationMinutes(detail.river.distanceLabel, detail.river.estimatedPaddleTime, distanceMiles) : null;
  const defaults = useMemo(() => ({ ...defaultTimes(estimated?.max ?? 240), groupSize: '', boat: '', vehicle: '', note: '' }), [estimated?.max, visible]);
  const { session: draftSession, state: draftState } = useTripDraft({ routeSlug: detail.river.slug, putInId: putIn?.id ?? null, takeOutId: takeOut?.id ?? null,
    routeName: detail.river.name, putInName: putIn?.name, takeOutName: takeOut?.name }, defaults, visible);
  const { launch, expected, checkIn, groupSize, boat, vehicle, note } = draftState.draft;
  const setLaunch = (launch: string) => draftSession.update({ launch });
  const setExpected = (expected: string) => draftSession.update({ expected });
  const setCheckIn = (checkIn: string) => draftSession.update({ checkIn });
  const setGroupSize = (groupSize: string) => draftSession.update({ groupSize });
  const setBoat = (boat: string) => draftSession.update({ boat });
  const setVehicle = (vehicle: string) => draftSession.update({ vehicle });
  const setNote = (note: string) => draftSession.update({ note });
  const draftReady = draftState.phase === 'ready';
  const [closing, setClosing] = useState(false);
  const closingRequest = useRef(false);
  const [status, setStatus] = useState('');
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [calendarPending, setCalendarPending] = useState(false);
  const calendarRequest = useRef<AbortController | null>(null);
  const [gpxPending, setGpxPending] = useState(false);
  const [sharePending, setSharePending] = useState(false);
  const [shareFallback, setShareFallback] = useState<string | null>(null);
  const shareRequest = useRef<object | null>(null);
  const gpxRequest = useRef<AbortController | null>(null);
  const launchRef = useRef<TripTimeFieldHandle>(null);
  const expectedRef = useRef<TripTimeFieldHandle>(null);
  const checkInRef = useRef<TripTimeFieldHandle>(null);
  const groupSizeRef = useRef<TextInput>(null);

  function cancelPendingRequests() {
    shareRequest.current = null;
    const calendar = calendarRequest.current;
    calendarRequest.current = null;
    calendar?.abort();
    const gpx = gpxRequest.current;
    gpxRequest.current = null;
    gpx?.abort();
  }

  async function closeSheet() {
    if (closingRequest.current) return;
    // Stop external actions as soon as Close is requested, even if saving the
    // local draft is slow or fails and the sheet must remain open for recovery.
    cancelPendingRequests();
    setCalendarPending(false);
    setGpxPending(false);
    setSharePending(false);
    if (!draftReady) { onClose(); return; }
    closingRequest.current = true;
    setClosing(true);
    try { if (await draftSession.save()) onClose(); }
    finally { closingRequest.current = false; setClosing(false); }
  }

  useEffect(() => {
    setStatus('');
    setValidationAttempted(false);
    setShareFallback(null);
    setGpxPending(false);
    setSharePending(false);
    setCalendarPending(false);
    return cancelPendingRequests;
  }, [visible, detail.river.slug, putIn?.id, takeOut?.id]);

  useEffect(() => {
    setShareFallback(null);
  }, [launch, expected, checkIn, groupSize, boat, vehicle, note, detail.river.slug, putIn?.id, takeOut?.id]);

  const plan = buildPlan(detail, putIn, takeOut, distanceMiles, launch, expected, checkIn, groupSize, boat, vehicle, note);
  const validation = validate(plan, checkIn);
  const validationError = validationAttempted && !validation.ok ? validation : null;
  const errorFor = (field: string) => validationError && 'field' in validationError && validationError.field === field ? validationError.message : undefined;

  function validateForExport() {
    if (!draftReady) return false;
    setValidationAttempted(true);
    setStatus('');
    if (validation.ok) return true;
    if ('field' in validation && validation.field) {
      const refs = { launch: launchRef, expected: expectedRef, checkIn: checkInRef, groupSize: groupSizeRef };
      refs[validation.field].current?.focus();
    }
    return false;
  }

  async function exportCalendar() {
    if (calendarRequest.current || !validateForExport()) return;
    const request = new AbortController();
    calendarRequest.current = request;
    setCalendarPending(true);
    setStatus('');
    const timeout = setTimeout(() => request.abort(), 15_000);
    const query = new URLSearchParams({ putin: plan.putIn.id ?? '', takeout: plan.takeOut.id ?? '', start: plan.launchAt!.toISOString(), end: plan.expectedTakeOutAt!.toISOString() });
    const url = resolveApiUrl(`/api/rivers/${detail.river.slug}/trip.ics?${query.toString()}`);
    try {
      onAction?.('calendar');
      const response = await fetch(url, { method: 'HEAD', signal: request.signal });
      if (calendarRequest.current !== request || request.signal.aborted) return;
      clearTimeout(timeout);
      if (!response.ok) {
        const message = response.status === 400 ? 'The calendar could not be prepared. Review your access points and trip times, then try again.'
          : response.status === 404 ? 'This route could not be found for export. Refresh the route and try again.'
          : response.status === 429 ? 'Too many export requests. Wait a moment, then try again.'
          : response.status >= 500 ? 'Calendar export is temporarily unavailable. Please try again shortly.'
          : 'The calendar file could not be checked. Please try again.';
        return setStatus(message);
      }
      const opened = await openExternalUrl(url, 'Calendar export');
      if (!opened && calendarRequest.current === request) setStatus('The calendar file could not be opened. Please try again.');
    } catch {
      if (calendarRequest.current === request) setStatus(request.signal.aborted
        ? 'The calendar check timed out. Please try again.'
        : 'The calendar file could not be checked. Check your connection and try again.');
    } finally {
      clearTimeout(timeout);
      if (calendarRequest.current === request) {
        calendarRequest.current = null;
        setCalendarPending(false);
      }
    }
  }

  async function exportGpx() {
    if (!draftReady || gpxRequest.current) return;
    if (!putIn || !takeOut || !putIn.id || !takeOut.id || !hasCoordinates(putIn) || !hasCoordinates(takeOut)) return setStatus('Choose mapped access points with coordinates first.');
    const request = new AbortController();
    gpxRequest.current = request;
    setGpxPending(true);
    setStatus('');
    const timeout = setTimeout(() => request.abort(), 15_000);
    const query = new URLSearchParams({ putin: putIn.id, takeout: takeOut.id });
    const url = resolveApiUrl(`/api/rivers/${detail.river.slug}/trip.gpx?${query.toString()}`);
    try {
      onAction?.('gpx');
      const response = await fetch(url, { method: 'HEAD', signal: request.signal });
      if (gpxRequest.current !== request || request.signal.aborted) return;
      clearTimeout(timeout);
      if (!response.ok) {
        const message = response.status === 400 ? 'These access points are no longer available. Refresh the route and choose your put-in and take-out again.'
          : response.status === 409 ? 'A GPX track is not available for these access points yet.'
          : response.status === 404 ? 'This route could not be found for export. Refresh the route and try again.'
          : response.status === 429 ? 'Too many export requests. Wait a moment, then try again.'
          : response.status >= 500 ? 'GPX export is temporarily unavailable. Please try again shortly.'
          : 'The GPX file could not be checked. Please try again.';
        return setStatus(message);
      }
      const opened = await openExternalUrl(url, 'GPX export');
      if (!opened && gpxRequest.current === request) setStatus('The GPX file could not be opened. Please try again.');
    } catch {
      if (gpxRequest.current === request) {
        setStatus(request.signal.aborted ? 'The GPX check timed out. Please try again.' : 'The GPX file could not be checked. Check your connection and try again.');
      }
    } finally {
      clearTimeout(timeout);
      if (gpxRequest.current === request) {
        gpxRequest.current = null;
        setGpxPending(false);
      }
    }
  }

  async function shareFloatPlan() {
    if (shareRequest.current || !validateForExport()) return;
    const request = {};
    shareRequest.current = request;
    setSharePending(true);
    setShareFallback(null);
    setStatus('');
    const message = buildFloatPlanMessage(plan);
    try {
      onAction?.('float_plan');
      const result = await Share.share({ title: `Float plan - ${detail.river.name}`, message });
      if (shareRequest.current === request) setStatus(result?.action === Share.dismissedAction ? 'Sharing cancelled.' : 'Float plan ready to share.');
    } catch (error) {
      if (shareRequest.current !== request) return;
      if (error instanceof Error && error.name === 'AbortError') {
        setStatus('Sharing cancelled.');
      } else {
        setStatus('Sharing is unavailable. You can copy the float plan below.');
        setShareFallback(message);
      }
    } finally {
      if (shareRequest.current === request) {
        shareRequest.current = null;
        setSharePending(false);
      }
    }
  }

  return (
    <Modal visible={visible} animationType={reducedMotion ? "none" : "slide"} presentationStyle="pageSheet" onRequestClose={() => void closeSheet()}>
      <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <View style={styles.headerCopy}><Text style={styles.kicker}>Prepare trip</Text><Text style={styles.title}>{detail.river.name}</Text><Text style={styles.subtitle}>{putIn?.name ?? 'Put-in'} to {takeOut?.name ?? 'take-out'} · {distanceMiles ? `${distanceMiles.toFixed(1)} mi` : 'distance unknown'}</Text></View>
          <Pressable onPress={() => void closeSheet()} disabled={closing} accessibilityState={{ disabled: closing, busy: closing }} style={styles.closeButton} accessibilityRole="button" accessibilityLabel="Close prepare trip"><Text style={styles.close}>Close</Text></Pressable>
        </View>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: Math.max(spacing.lg, insets.bottom) }]} keyboardShouldPersistTaps="handled">
          <TripDraftNotice state={draftState} session={draftSession} defaults={defaults} locked={closing || sharePending || calendarPending}
            onClose={onClose} onReset={() => { setStatus(''); setShareFallback(null); }} />
          <Text style={styles.sectionTitle}>Timing</Text>
          <Text style={styles.help}>Use local time. Shared with your calendar and group; PaddleToday does not monitor the trip.</Text>
          <TripTimeField editable={visible && draftReady && !sharePending && !calendarPending && !closing} error={errorFor('launch')} label="Launch" manualLabel="Launch (YYYY-MM-DD HH:MM)" inputRef={launchRef} value={launch} onChange={setLaunch} />
          <TripTimeField editable={visible && draftReady && !sharePending && !calendarPending && !closing} error={errorFor('expected')} label="Expected take-out" manualLabel="Expected take-out (YYYY-MM-DD HH:MM)" inputRef={expectedRef} value={expected} onChange={setExpected} />
          <TripTimeField editable={visible && draftReady && !sharePending && !calendarPending && !closing} error={errorFor('checkIn')} label="Check-in time" manualLabel="Check-in time (optional)" inputRef={checkInRef} value={checkIn} onChange={setCheckIn} optional />
          <Text style={styles.estimate}>{estimated ? `Planning estimate: ${estimated.min}–${estimated.max} minutes on the water, before shuttle or staging time.` : 'Planning estimate unavailable; confirm timing with the group.'}</Text>
          <Text style={styles.sectionTitle}>Group details</Text>
          <Field editable={draftReady && !sharePending && !closing} error={errorFor('groupSize')} label="Group size (optional)" inputRef={groupSizeRef} value={groupSize} onChangeText={setGroupSize} keyboardType="number-pad" />
          <Field editable={draftReady && !sharePending && !closing} label="Boat / gear (optional)" value={boat} onChangeText={setBoat} />
          <Field editable={draftReady && !sharePending && !closing} label="Vehicle / shuttle (optional)" value={vehicle} onChangeText={setVehicle} />
          <Field editable={draftReady && !sharePending && !closing} label="Note for your group (optional)" value={note} onChangeText={setNote} multiline />
          {validationError && !('field' in validationError) ? <Text accessibilityLiveRegion="polite" style={styles.status}>{validationError.message}</Text> : null}
          {status ? <Text accessibilityLiveRegion="polite" style={styles.status}>{status}</Text> : null}
          {shareFallback ? (
            <TextInput
              accessibilityLabel="Float plan to copy"
              value={shareFallback}
              editable={false}
              multiline
              autoFocus
              selectTextOnFocus
              style={[styles.input, styles.multiline, { minHeight: 180, maxHeight: 240 }]}
            />
          ) : null}
          <View style={styles.actions}>
            <ActionButton disabled={!draftReady || closing} pending={calendarPending} pendingLabel="Checking calendar…" label="Add to calendar" detail="Save launch and take-out times" onPress={() => void exportCalendar()} />
            <ActionButton disabled={!draftReady || closing} pending={gpxPending} label="Download GPX" detail="Track your selected route in a map app" onPress={() => void exportGpx()} />
            <ActionButton disabled={!draftReady || closing} pending={sharePending} pendingLabel="Opening share sheet…" label="Share float plan" detail="Send the plan to your group" onPress={() => void shareFloatPlan()} primary />
          </View>
          <Text style={styles.footer}>Confirm current gauge, weather, access, hazards, and an offline check-in plan before launching.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function Field({ label, multiline, keyboardType, value, onChangeText, inputRef, editable = true, error }: { error?: string; editable?: boolean; inputRef?: RefObject<TextInput | null>; label: string; value: string; onChangeText: (value: string) => void; multiline?: boolean; keyboardType?: 'number-pad' }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput editable={editable} ref={inputRef} accessibilityLabel={label} aria-invalid={Boolean(error)} accessibilityHint={error} value={value} onChangeText={onChangeText} multiline={multiline} keyboardType={keyboardType} placeholderTextColor={colors.textMuted} style={[styles.input, multiline ? styles.multiline : null]} />{error ? <Text accessibilityLiveRegion="polite" style={styles.status}>{error}</Text> : null}</View>;
}

function ActionButton({ label, detail, onPress, primary, pending = false, pendingLabel = 'Checking GPX…', disabled = false }: { disabled?: boolean; pending?: boolean; pendingLabel?: string; label: string; detail: string; onPress: () => void; primary?: boolean }) {
  return <Pressable style={[styles.actionButton, primary ? styles.actionButtonPrimary : null]} disabled={disabled || pending} aria-busy={pending} accessibilityState={{ disabled: disabled || pending, busy: pending }} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}><Text style={[styles.actionLabel, primary ? styles.actionLabelPrimary : null]}>{pending ? pendingLabel : label}</Text><Text style={[styles.actionDetail, primary ? styles.actionDetailPrimary : null]}>{detail}</Text></Pressable>;
}

function defaultTimes(durationMinutes: number) {
  const launchDate = new Date(Date.now() + 60 * 60 * 1000);
  launchDate.setMinutes(0, 0, 0);
  const expectedDate = new Date(launchDate.getTime() + Math.max(60, durationMinutes + 60) * 60 * 1000);
  return { launch: localInput(launchDate), expected: localInput(expectedDate), checkIn: localInput(new Date(expectedDate.getTime() + 30 * 60 * 1000)) };
}

function selectedDistance(points: RiverRouteAccessPoint[], putIn: RiverAccessPoint | undefined, takeOut: RiverAccessPoint | undefined, detail: RiverDetailApiResult) {
  const start = points.find((point) => point.id === putIn?.id);
  const end = points.find((point) => point.id === takeOut?.id);
  const measuredDistance = start && end ? end.mileFromStart - start.mileFromStart : null;
  if (measuredDistance && Number.isFinite(measuredDistance) && measuredDistance > 0) return measuredDistance;
  const isFullRoute = putIn?.id === detail.river.putIn?.id && takeOut?.id === detail.river.takeOut?.id;
  return isFullRoute ? parseDistanceMiles(detail.river.distanceLabel) : null;
}

function buildPlan(detail: RiverDetailApiResult, putIn: RiverAccessPoint | undefined, takeOut: RiverAccessPoint | undefined, distanceMiles: number | null, launch: string, expected: string, checkIn: string, groupSize: string, boat: string, vehicle: string, note: string): TripPlanInput {
  return { routeSlug: detail.river.slug, riverName: detail.river.name, reach: detail.river.reach, routeUrl: `https://paddletoday.com/rivers/${encodeURIComponent(detail.river.slug)}/?putin=${encodeURIComponent(putIn?.id ?? '')}&takeout=${encodeURIComponent(takeOut?.id ?? '')}`, putIn: pointForPlan(putIn), takeOut: pointForPlan(takeOut), distanceMiles, estimatedPaddleTime: detail.river.estimatedPaddleTime, launchAt: parseLocal(launch), expectedTakeOutAt: parseLocal(expected), checkInAt: parseLocal(checkIn), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, groupSize: groupSize.trim() ? Number(groupSize) : null, boatDescription: boat || null, vehicleDescription: vehicle || null, note: note || null };
}

function pointForPlan(point: RiverAccessPoint | undefined) { return { id: point?.id, name: point?.name ?? 'Access point', latitude: point?.latitude ?? 0, longitude: point?.longitude ?? 0 }; }
function validate(plan: TripPlanInput, checkIn: string) {
  if (!plan.launchAt) return { ok: false as const, field: 'launch' as const, message: 'Enter launch as YYYY-MM-DD HH:MM.' };
  if (!plan.expectedTakeOutAt) return { ok: false as const, field: 'expected' as const, message: 'Enter expected take-out as YYYY-MM-DD HH:MM.' };
  if (plan.expectedTakeOutAt <= plan.launchAt) return { ok: false as const, field: 'expected' as const, message: 'Expected take-out must be after launch.' };
  if (checkIn.trim() && !plan.checkInAt) return { ok: false as const, field: 'checkIn' as const, message: 'Enter check-in as YYYY-MM-DD HH:MM, or leave it blank.' };
  if (plan.checkInAt && plan.checkInAt <= plan.expectedTakeOutAt) return { ok: false as const, field: 'checkIn' as const, message: 'Check-in time should be after the expected take-out.' };
  if (plan.groupSize !== null && plan.groupSize !== undefined && (!Number.isInteger(plan.groupSize) || plan.groupSize < 1 || plan.groupSize > 100)) return { ok: false as const, field: 'groupSize' as const, message: 'Group size must be a whole number from 1 to 100.' };
  if (!plan.putIn.id || !plan.takeOut.id) return { ok: false as const, message: 'Choose mapped access points before exporting.' };
  return { ok: true as const };
}
function hasCoordinates(point: RiverAccessPoint): point is RiverAccessPoint & { latitude: number; longitude: number } { return Number.isFinite(point.latitude) && Number.isFinite(point.longitude); }

const styles = StyleSheet.create({
  closeButton: { minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' },
  screen: { flex: 1, backgroundColor: colors.canvas }, header: { width: '100%', maxWidth: 640, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface }, headerCopy: { flex: 1, gap: 3 }, kicker: { color: colors.accent, fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 }, title: { color: colors.text, fontSize: 22, fontWeight: '900' }, subtitle: { color: colors.textMuted, fontSize: 12 }, close: { color: colors.accent, fontWeight: '900', padding: spacing.xs }, content: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.xl * 2 }, sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '900', marginTop: spacing.sm }, help: { color: colors.textMuted, fontSize: 12, lineHeight: 17 }, field: { gap: 4 }, label: { color: colors.textMuted, fontSize: 11, fontWeight: '800' }, input: { minHeight: 44, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceStrong, paddingHorizontal: spacing.sm, color: colors.text, fontSize: 14 }, multiline: { minHeight: 72, paddingTop: spacing.sm, textAlignVertical: 'top' }, estimate: { color: colors.accentDeep, backgroundColor: colors.accentSoft, borderRadius: radius.sm, padding: spacing.sm, fontSize: 12, lineHeight: 17 }, status: { color: colors.noGo, fontSize: 12, fontWeight: '800' }, actions: { gap: spacing.sm, marginTop: spacing.sm }, actionButton: { borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.md, gap: 3 }, actionButtonPrimary: { backgroundColor: colors.accent, borderColor: colors.accent }, actionLabel: { color: colors.text, fontSize: 14, fontWeight: '900' }, actionLabelPrimary: { color: colors.surfaceStrong }, actionDetail: { color: colors.textMuted, fontSize: 12 }, actionDetailPrimary: { color: colors.accentSoft }, footer: { color: colors.textMuted, fontSize: 11, lineHeight: 16, marginTop: spacing.sm },
});
