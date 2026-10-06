import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { PaddleLog, Trip } from '@paddletoday/api-contract';
import { AppButton } from './app-button';
import { SectionCard } from './section-card';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { TripRoutePreview } from './trip-route-preview';
import { tripNotes } from '@paddletoday/api-contract';

export type TripPanel = 'crew' | 'shuttle' | 'sharing' | 'activity' | 'manage';
type Icon = ComponentProps<typeof MaterialCommunityIcons>['name'];
export function TripScreenHeader({ title, context, backLabel, onBack, disabled }: {
  title: string; context?: string; backLabel: string; onBack: () => void; disabled: boolean;
}) {
  return <View style={styles.screenHeader}>
    <Pressable accessibilityRole="button" accessibilityLabel={backLabel} disabled={disabled} onPress={onBack} style={styles.back}>
      <MaterialCommunityIcons name="arrow-left" size={22} color={colors.accentDeep} /><Text style={styles.backText}>{backLabel}</Text>
    </Pressable>
    {context ? <Text numberOfLines={2} style={styles.context}>{context}</Text> : null}
    <Text accessibilityRole="header" style={styles.screenTitle}>{title}</Text>
  </View>;
}
export function TripActionRow({ icon, title, detail, onPress, disabled, compact = false }: {
  icon: Icon; title: string; detail?: string; onPress: () => void; disabled?: boolean; compact?: boolean;
}) {
  return <Pressable accessibilityRole="button" disabled={disabled} accessibilityLabel={detail ? `${title}. ${detail}` : title} accessibilityState={{ disabled: !!disabled }} onPress={onPress} style={({ pressed }) => [styles.actionRow, compact && styles.compactRow, pressed && !disabled && styles.pressed]}>
    <View style={[styles.actionIcon, compact && styles.compactIcon]}><MaterialCommunityIcons name={icon} size={compact ? 20 : 22} color={colors.accentDeep} /></View>
    <View style={styles.actionCopy}><Text style={styles.actionTitle}>{title}</Text>{detail ? <Text style={styles.supporting}>{detail}</Text> : null}</View>
    <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textMuted} />
  </Pressable>;
}
export function TripFact({ label, value }: { label: string; value: string }) {
  return <View style={styles.fact}><Text style={styles.factLabel}>{label}</Text><Text style={styles.factValue}>{value}</Text></View>;
}
export function TripOverview({ trip, uid, recap, disabled, onEdit, onRecap, onRecord, onOpenRecap, onPanel, onRoute, onPlanAgain }: {
  trip: Trip; uid: string; recap?: PaddleLog; disabled: boolean;
  onEdit: () => void; onRecap: () => void; onRecord: () => void; onOpenRecap: () => void;
  onPanel: (panel: TripPanel) => void; onRoute: () => void; onPlanAgain: () => void;
}) {
  const going = trip.members.filter(m => m.rsvp === 'going');
  const me = trip.members.find(m => m.uid === uid);
  const preparation = trip.preparation;
  return <>
    <View style={styles.summary}>
      <Text style={styles.status}>{trip.status === 'planned' ? 'TRIP PLAN' : trip.status === 'cancelled' ? 'CANCELLED TRIP' : 'COMPLETED TRIP'}</Text>
      <Text accessibilityRole="header" style={styles.tripTitle}>{trip.title}</Text>
      {trip.title !== trip.route.name ? <Text style={styles.routeName}>{trip.route.name}</Text> : null}
      <View style={styles.facts}>
        <TripFact label="DATE" value={readableTripDate(trip.date)} />
        <TripFact label="LAUNCH" value={trip.launch || 'To be decided'} />
        {trip.expected ? <TripFact label="RETURN" value={trip.expected} /> : null}
      </View>
      <Text style={styles.supporting}>Times in {trip.timeZone}</Text>
      <View style={styles.buttons}>
        <AppButton label="Edit trip" icon="pencil-outline" variant="secondary" onPress={onEdit} disabled={disabled} style={styles.button} />
        <AppButton label={recap ? 'View recap' : 'Record paddle'} icon={recap ? 'notebook-outline' : 'record-rec'} onPress={recap ? onOpenRecap : onRecord} disabled={disabled} style={styles.button} />
      </View>
    </View>
    <SectionCard title="Your route" subtitle={!trip.route.slug ? 'Custom route · saved with this trip' : undefined}>
      <View style={styles.routeStops}>
        <View style={styles.endpoint}><View style={styles.endpointMark}><MaterialCommunityIcons name="circle-outline" size={16} color={colors.accentDeep} /></View><TripFact label="PUT-IN" value={trip.route.putInName || 'To be decided'} /></View>
        <View style={styles.endpoint}><View style={styles.endpointMark}><MaterialCommunityIcons name="map-marker-outline" size={18} color={colors.accentDeep} /></View><TripFact label="TAKE-OUT" value={trip.route.takeOutName || 'To be decided'} /></View>
      </View>
      {trip.route.slug ? <TripRoutePreview route={trip.route} onOpenRoute={onRoute} disabled={disabled} /> : null}
    </SectionCard>
    {recap ? <TripActionRow icon="record-rec" title="Record another paddle" detail="Start a new private recording on this route" onPress={onRecord} disabled={disabled} /> : <TripActionRow icon="notebook-plus-outline" title="Log a past paddle" detail="Add a date, notes, and photos for this outing" onPress={onRecap} disabled={disabled} />}
    {trip.members.length === 1 && !trip.shuttle.length ? <View style={styles.buttons}>
      {trip.ownerUid === uid ? <AppButton label="Invite paddlers" icon="account-plus-outline" variant="secondary" onPress={() => onPanel('sharing')} disabled={disabled} style={styles.button} /> : null}
      <AppButton label="Add shuttle" icon="car-outline" variant="secondary" onPress={() => onPanel('shuttle')} disabled={disabled} style={styles.button} />
    </View> : <SectionCard title="Crew & shuttle" subtitle="Shared with trip members">
      {trip.members.length > 1 ? <TripActionRow icon="account-group-outline" title={`${going.length} going · ${trip.members.length} in the crew`} detail={`${me ? `You: ${rsvpLabel(me.rsvp)} · ` : ''}${trip.members.slice(0, 3).map(m => m.name).join(', ')}${trip.members.length > 3 ? ` +${trip.members.length - 3}` : ''}`} onPress={() => onPanel('crew')} disabled={disabled} /> : null}
      <TripActionRow icon="car-outline" title={trip.shuttle.length ? `${trip.shuttle.length} vehicle${trip.shuttle.length === 1 ? '' : 's'}` : 'Shuttle (optional)'} detail={trip.shuttle.length ? trip.shuttle.map(v => v.label).join(' · ') : 'Add vehicles and meeting details if needed'} onPress={() => onPanel('shuttle')} disabled={disabled} />
      {trip.ownerUid === uid ? <TripActionRow icon="share-variant-outline" title="Invite & share" detail="Invite the crew or share a view of the plan" onPress={() => onPanel('sharing')} disabled={disabled} /> : null}
    </SectionCard>}
    {preparation && (preparation.checkInLocal || preparation.groupSize || tripNotes(preparation)) ? <SectionCard title="Trip notes" subtitle="Shared only with trip members">
      {preparation.checkInLocal ? <TripFact label="GROUP CHECK-IN" value={`${preparation.checkInLocal} (${trip.timeZone})`} /> : null}
      {preparation.groupSize ? <TripFact label="GROUP SIZE" value={`${preparation.groupSize} paddlers`} /> : null}
      {tripNotes(preparation) ? <Text style={styles.body}>{tripNotes(preparation)}</Text> : null}
    </SectionCard> : null}
    {trip.itinerary.length ? <SectionCard title="Itinerary">{trip.itinerary.map((stop, index) => <View key={stop.id} style={styles.stop}>
      <Text style={styles.stopNumber}>{index + 1}</Text><View style={styles.actionCopy}><Text style={styles.actionTitle}>{stop.location || 'Meeting stop'}{stop.time ? ` · ${stop.time}` : ''}</Text>{stop.note ? <Text style={styles.body}>{stop.note}</Text> : null}</View>
    </View>)}</SectionCard> : null}
    <View style={styles.utilities}><TripActionRow compact icon="history" title="Recent changes" onPress={() => onPanel('activity')} disabled={disabled} />
    <TripActionRow compact icon="replay" title="Plan this route again" onPress={onPlanAgain} disabled={disabled} />
    <TripActionRow compact icon="dots-horizontal" title="Trip options" detail={trip.ownerUid === uid ? 'Complete, cancel, or delete this plan' : 'Leave this trip'} onPress={() => onPanel('manage')} disabled={disabled} /></View>
  </>;
}
export function rsvpLabel(value: Trip['members'][number]['rsvp']) { return value === 'going' ? 'Going' : value === 'maybe' ? 'Maybe' : 'Not going'; }
export function readableTripDate(date: string) {
  if (!date) return 'To be decided';
  const value = new Date(`${date}T12:00:00`);
  return Number.isNaN(value.getTime()) ? date : value.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
const styles = StyleSheet.create({
  screenHeader: { gap: 4 }, back: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }, backText: { color: colors.accentDeep, fontSize: 14, fontWeight: '700' },
  context: { color: colors.textMuted, fontSize: 13, lineHeight: 19 }, screenTitle: { ...typography.title, color: colors.text },
  summary: { padding: spacing.md, gap: spacing.md, borderRadius: radius.lg, backgroundColor: colors.surfaceStrong, borderWidth: 1, borderColor: colors.border, borderTopWidth: 3, borderTopColor: colors.accent },
  status: { fontSize: 11, letterSpacing: 1, fontWeight: '800', color: colors.accentDeep }, tripTitle: { fontSize: 26, lineHeight: 32, fontWeight: '800', color: colors.text }, routeName: { fontSize: 16, color: colors.textMuted },
  routeStops: { gap: spacing.md, padding: spacing.md, borderRadius: radius.md, backgroundColor: colors.canvas },
  endpoint: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 }, endpointMark: { paddingTop: 3 },
  facts: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg, padding: spacing.md, borderRadius: radius.md, backgroundColor: colors.accentSoft }, fact: { gap: 3, flexShrink: 1 }, factLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 0.6 }, factValue: { color: colors.text, fontSize: 15, lineHeight: 22, fontWeight: '600' },
  utilities: { gap: 1, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.border },
  buttons: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, button: { flexGrow: 1, flexBasis: 130 },
  actionRow: { minHeight: 72, padding: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, borderRadius: radius.md, backgroundColor: colors.surfaceStrong },
  compactRow: { minHeight: 56, borderRadius: 0, paddingHorizontal: spacing.md }, compactIcon: { width: 28, height: 28, backgroundColor: 'transparent' }, pressed: { backgroundColor: colors.accentSoft },
  actionIcon: { width: 40, height: 40, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft },
  actionCopy: { flex: 1, gap: 4 }, actionTitle: { fontSize: 15, lineHeight: 21, fontWeight: '800', color: colors.text }, supporting: { fontSize: 13, lineHeight: 19, color: colors.textMuted }, body: { fontSize: 15, lineHeight: 23, color: colors.text },
  stop: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, paddingVertical: spacing.sm }, stopNumber: { width: 30, height: 30, borderRadius: 15, textAlign: 'center', textAlignVertical: 'center', backgroundColor: colors.accentSoft, color: colors.accentDeep, fontWeight: '800' },
});
