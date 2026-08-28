import { useEffect, useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import type { RiverDetailApiResult, RiverRouteAccessPoint, RiverAccessPoint } from '@paddletoday/api-contract';
import { buildFloatPlanMessage, estimateSegmentDurationMinutes, parseDistanceMiles, type TripPlanInput } from '@paddletoday/trip-pack';
import { resolveApiUrl } from '../lib/api-base-url';
import { openExternalUrl } from '../lib/external-links';
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
  const distanceMiles = selectedDistance(accessPoints, putIn, takeOut, detail);
  const estimated = distanceMiles ? estimateSegmentDurationMinutes(detail.river.distanceLabel, detail.river.estimatedPaddleTime, distanceMiles) : null;
  const defaults = useMemo(() => defaultTimes(estimated?.max ?? 240), [estimated?.max]);
  const [launch, setLaunch] = useState(defaults.launch);
  const [expected, setExpected] = useState(defaults.expected);
  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [groupSize, setGroupSize] = useState('');
  const [boat, setBoat] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!visible) return;
    const next = defaultTimes(estimated?.max ?? 240);
    setLaunch(next.launch);
    setExpected(next.expected);
    setCheckIn(next.checkIn);
    setStatus('');
  }, [visible, detail.river.slug, putIn?.id, takeOut?.id, estimated?.max]);

  const plan = buildPlan(detail, putIn, takeOut, distanceMiles, launch, expected, checkIn, groupSize, boat, vehicle, note);
  const validation = validate(plan);

  async function exportCalendar() {
    if (!validation.ok) return setStatus(validation.message);
    onAction?.('calendar');
    const query = new URLSearchParams({ putin: plan.putIn.id ?? '', takeout: plan.takeOut.id ?? '', start: plan.launchAt!.toISOString(), end: plan.expectedTakeOutAt!.toISOString() });
    await openExternalUrl(resolveApiUrl(`/api/rivers/${detail.river.slug}/trip.ics?${query.toString()}`), 'Calendar export');
  }

  async function exportGpx() {
    if (!putIn || !takeOut || !putIn.id || !takeOut.id || !hasCoordinates(putIn) || !hasCoordinates(takeOut)) return setStatus('Choose mapped access points with coordinates first.');
    onAction?.('gpx');
    const query = new URLSearchParams({ putin: putIn.id, takeout: takeOut.id });
    const url = resolveApiUrl(`/api/rivers/${detail.river.slug}/trip.gpx?${query.toString()}`);
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (!response.ok) return setStatus('GPX is not available for this route yet.');
      await openExternalUrl(url, 'GPX export');
    } catch {
      setStatus('GPX export is unavailable while offline.');
    }
  }

  async function shareFloatPlan() {
    if (!validation.ok) return setStatus(validation.message);
    onAction?.('float_plan');
    try {
      await Share.share({ title: `Float plan - ${detail.river.name}`, message: buildFloatPlanMessage(plan) });
      setStatus('Float plan ready to share.');
    } catch {
      Alert.alert('Share unavailable', 'The device share sheet could not be opened.');
    }
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.headerCopy}><Text style={styles.kicker}>Prepare trip</Text><Text style={styles.title}>{detail.river.name}</Text><Text style={styles.subtitle}>{putIn?.name ?? 'Put-in'} to {takeOut?.name ?? 'take-out'} · {distanceMiles ? `${distanceMiles.toFixed(1)} mi` : 'distance unknown'}</Text></View>
          <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close prepare trip"><Text style={styles.close}>Close</Text></Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.sectionTitle}>Timing</Text>
          <Text style={styles.help}>Use local time. Shared with your calendar and group; PaddleToday does not monitor the trip.</Text>
          <Field label="Launch (YYYY-MM-DD HH:MM)" value={launch} onChangeText={setLaunch} />
          <Field label="Expected take-out (YYYY-MM-DD HH:MM)" value={expected} onChangeText={setExpected} />
          <Field label="Check-in time (optional)" value={checkIn} onChangeText={setCheckIn} />
          <Text style={styles.estimate}>{estimated ? `Planning estimate: ${estimated.min}–${estimated.max} minutes on the water, before shuttle or staging time.` : 'Planning estimate unavailable; confirm timing with the group.'}</Text>
          <Text style={styles.sectionTitle}>Group details</Text>
          <Field label="Group size (optional)" value={groupSize} onChangeText={setGroupSize} keyboardType="number-pad" />
          <Field label="Boat / gear (optional)" value={boat} onChangeText={setBoat} />
          <Field label="Vehicle / shuttle (optional)" value={vehicle} onChangeText={setVehicle} />
          <Field label="Note for your group (optional)" value={note} onChangeText={setNote} multiline />
          {status ? <Text style={styles.status}>{status}</Text> : null}
          <View style={styles.actions}>
            <ActionButton label="Add to calendar" detail="Download an .ics event" onPress={() => void exportCalendar()} />
            <ActionButton label="Download GPX" detail="Load the canonical river line" onPress={() => void exportGpx()} />
            <ActionButton label="Share float plan" detail="Send the plan to your group" onPress={() => void shareFloatPlan()} primary />
          </View>
          <Text style={styles.footer}>Confirm current gauge, weather, access, hazards, and an offline check-in plan before launching.</Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

function Field({ label, multiline, keyboardType, value, onChangeText }: { label: string; value: string; onChangeText: (value: string) => void; multiline?: boolean; keyboardType?: 'number-pad' }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput value={value} onChangeText={onChangeText} multiline={multiline} keyboardType={keyboardType} placeholderTextColor={colors.textMuted} style={[styles.input, multiline ? styles.multiline : null]} /></View>;
}

function ActionButton({ label, detail, onPress, primary }: { label: string; detail: string; onPress: () => void; primary?: boolean }) {
  return <Pressable style={[styles.actionButton, primary ? styles.actionButtonPrimary : null]} onPress={onPress} accessibilityRole="button"><Text style={[styles.actionLabel, primary ? styles.actionLabelPrimary : null]}>{label}</Text><Text style={[styles.actionDetail, primary ? styles.actionDetailPrimary : null]}>{detail}</Text></Pressable>;
}

function defaultTimes(durationMinutes: number) {
  const launchDate = new Date(Date.now() + 60 * 60 * 1000);
  launchDate.setMinutes(0, 0, 0);
  const expectedDate = new Date(launchDate.getTime() + Math.max(60, durationMinutes + 60) * 60 * 1000);
  return { launch: localInput(launchDate), expected: localInput(expectedDate), checkIn: localInput(new Date(expectedDate.getTime() + 30 * 60 * 1000)) };
}

function localInput(value: Date) {
  const pad = (part: number) => String(part).padStart(2, '0');
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())} ${pad(value.getHours())}:${pad(value.getMinutes())}`;
}

function parseLocal(value: string) {
  const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const [, yearText, monthText, dayText, hourText, minuteText] = match;
  const year = Number(yearText), month = Number(monthText), day = Number(dayText), hour = Number(hourText), minute = Number(minuteText);
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) return null;
  const date = new Date(year, month - 1, day, hour, minute);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day && date.getHours() === hour && date.getMinutes() === minute ? date : null;
}

function selectedDistance(points: RiverRouteAccessPoint[], putIn: RiverAccessPoint | undefined, takeOut: RiverAccessPoint | undefined, detail: RiverDetailApiResult) {
  const start = points.find((point) => point.id === putIn?.id), end = points.find((point) => point.id === takeOut?.id);
  const distance = start && end ? end.mileFromStart - start.mileFromStart : parseDistanceMiles(detail.river.distanceLabel);
  return distance && distance > 0 ? distance : null;
}

function buildPlan(detail: RiverDetailApiResult, putIn: RiverAccessPoint | undefined, takeOut: RiverAccessPoint | undefined, distanceMiles: number | null, launch: string, expected: string, checkIn: string, groupSize: string, boat: string, vehicle: string, note: string): TripPlanInput {
  return { routeSlug: detail.river.slug, riverName: detail.river.name, reach: detail.river.reach, routeUrl: `https://paddletoday.com/rivers/${encodeURIComponent(detail.river.slug)}/?putin=${encodeURIComponent(putIn?.id ?? '')}&takeout=${encodeURIComponent(takeOut?.id ?? '')}`, putIn: pointForPlan(putIn), takeOut: pointForPlan(takeOut), distanceMiles, estimatedPaddleTime: detail.river.estimatedPaddleTime, launchAt: parseLocal(launch), expectedTakeOutAt: parseLocal(expected), checkInAt: parseLocal(checkIn), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, groupSize: groupSize.trim() ? Number(groupSize) : null, boatDescription: boat || null, vehicleDescription: vehicle || null, note: note || null };
}

function pointForPlan(point: RiverAccessPoint | undefined) { return { id: point?.id, name: point?.name ?? 'Access point', latitude: point?.latitude ?? 0, longitude: point?.longitude ?? 0 }; }
function validate(plan: TripPlanInput) {
  if (!plan.launchAt || !plan.expectedTakeOutAt) return { ok: false as const, message: 'Enter launch and expected take-out as YYYY-MM-DD HH:MM.' };
  if (plan.expectedTakeOutAt <= plan.launchAt) return { ok: false as const, message: 'Expected take-out must be after launch.' };
  if (plan.checkInAt && plan.checkInAt <= plan.expectedTakeOutAt) return { ok: false as const, message: 'Check-in time should be after the expected take-out.' };
  if (plan.groupSize !== null && plan.groupSize !== undefined && (!Number.isInteger(plan.groupSize) || plan.groupSize < 1 || plan.groupSize > 100)) return { ok: false as const, message: 'Group size must be a whole number from 1 to 100.' };
  if (!plan.putIn.id || !plan.takeOut.id) return { ok: false as const, message: 'Choose mapped access points before exporting.' };
  return { ok: true as const };
}
function hasCoordinates(point: RiverAccessPoint): point is RiverAccessPoint & { latitude: number; longitude: number } { return Number.isFinite(point.latitude) && Number.isFinite(point.longitude); }

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface }, headerCopy: { flex: 1, gap: 3 }, kicker: { color: colors.accent, fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 }, title: { color: colors.text, fontSize: 22, fontWeight: '900' }, subtitle: { color: colors.textMuted, fontSize: 12 }, close: { color: colors.accent, fontWeight: '900', padding: spacing.xs }, content: { padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.xl * 2 }, sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '900', marginTop: spacing.sm }, help: { color: colors.textMuted, fontSize: 12, lineHeight: 17 }, field: { gap: 4 }, label: { color: colors.textMuted, fontSize: 11, fontWeight: '800' }, input: { minHeight: 44, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceStrong, paddingHorizontal: spacing.sm, color: colors.text, fontSize: 14 }, multiline: { minHeight: 72, paddingTop: spacing.sm, textAlignVertical: 'top' }, estimate: { color: colors.accentDeep, backgroundColor: colors.accentSoft, borderRadius: radius.sm, padding: spacing.sm, fontSize: 12, lineHeight: 17 }, status: { color: colors.noGo, fontSize: 12, fontWeight: '800' }, actions: { gap: spacing.sm, marginTop: spacing.sm }, actionButton: { borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.md, gap: 3 }, actionButtonPrimary: { backgroundColor: colors.accent, borderColor: colors.accent }, actionLabel: { color: colors.text, fontSize: 14, fontWeight: '900' }, actionLabelPrimary: { color: colors.surfaceStrong }, actionDetail: { color: colors.textMuted, fontSize: 12 }, actionDetailPrimary: { color: colors.accentSoft }, footer: { color: colors.textMuted, fontSize: 11, lineHeight: 16, marginTop: spacing.sm },
});
