import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { Trip } from '@paddletoday/api-contract';
import { colors, radius, spacing } from '../theme/tokens';
import { tripCoordinationSummary } from '../lib/trip-dashboard';
import { readableTripDate } from './trip-overview';
import { AppButton } from './app-button';

export function NextPaddleCard({ trip, onOpen, disabled, unread = false }: { trip: Trip; onOpen: () => void; disabled: boolean; unread?: boolean }) {
  const { fontScale } = useWindowDimensions();
  const accessLabelStyle = [styles.accessLabel, { width: 56 * Math.max(1, fontScale) }];
  const coordination = tripCoordinationSummary(trip);
  const date = new Date(`${trip.date}T12:00:00`);
  return <View style={styles.card}>
    <View style={styles.topline}><View style={styles.kicker}><MaterialCommunityIcons name="calendar-arrow-right" size={18} color={colors.accentDeep} /><Text style={styles.kickerText}>NEXT PADDLE</Text></View>{unread ? <Text style={styles.updated}>New update</Text> : null}</View>
    <View style={styles.heading}>
      <View style={styles.dateTile} accessible accessibilityLabel={readableTripDate(trip.date)}>
        <Text style={styles.month}>{date.toLocaleDateString(undefined, { month: 'short' }).toUpperCase()}</Text><Text style={styles.day}>{date.getDate()}</Text><Text style={styles.weekday}>{date.getFullYear()}</Text>
      </View>
      <View style={styles.headingCopy}><Text accessibilityRole="header" style={styles.title}>{trip.title}</Text>
        <Text style={styles.schedule}>{date.toLocaleDateString(undefined, { weekday: 'long' })} · {trip.launch ? `${trip.launch} launch` : 'Launch time to be decided'}</Text>
        {trip.launch ? <Text style={styles.schedule}>{trip.timeZone}</Text> : null}
      </View>
    </View>
    {trip.title !== trip.route.name && trip.route.name ? <Text style={styles.route}>{trip.route.name}</Text> : null}
    <View style={styles.access}><View style={styles.accessRow}><Text style={accessLabelStyle}>Put-in</Text><Text style={styles.hint}>{trip.route.putInName || 'To be decided'}</Text></View>
      <View style={styles.accessRow}><Text style={accessLabelStyle}>Take-out</Text><Text style={styles.hint}>{trip.route.takeOutName || 'To be decided'}</Text></View></View>
    {trip.members.length > 1 || trip.shuttle.length ? <View style={styles.summary}>{trip.members.length > 1 ? <Text style={styles.summaryText}>{coordination.crew}</Text> : null}{trip.shuttle.length ? <Text style={styles.summaryText}>{coordination.shuttle}</Text> : null}</View> : null}
    <View style={styles.actions}><AppButton label="Open trip" icon="arrow-right" onPress={onOpen} disabled={disabled} style={styles.action} /></View>
  </View>;
}
const styles = StyleSheet.create({
  card: { gap: spacing.md, padding: spacing.md, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, borderTopWidth: 3, borderTopColor: colors.accent, backgroundColor: colors.surfaceStrong },
  heading: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md }, headingCopy: { flex: 1, gap: 6 },
  topline: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  updated: { color: '#695321', backgroundColor: '#F3E8C9', paddingHorizontal: 9, paddingVertical: 5, borderRadius: radius.pill, fontSize: 11, fontWeight: '700' },
  dateTile: { width: 60, paddingVertical: 8, alignItems: 'center', gap: 2, borderRadius: radius.md, backgroundColor: colors.accentSoft },
  month: { color: colors.accentDeep, fontSize: 11, fontWeight: '800', letterSpacing: 1 }, day: { color: colors.accentDeep, fontSize: 28, lineHeight: 32, fontWeight: '800' }, weekday: { color: colors.accentDeep, fontSize: 11, lineHeight: 16 },
  kicker: { flexDirection: 'row', alignItems: 'center', gap: 7 }, kickerText: { color: colors.accentDeep, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { color: colors.text, fontSize: 19, lineHeight: 25, fontWeight: '800' }, schedule: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  access: { gap: 8, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: colors.canvas, borderRadius: radius.md }, accessRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 }, accessLabel: { color: colors.accentDeep, fontSize: 11, lineHeight: 18, fontWeight: '700' },
  route: { color: colors.text, fontSize: 14, lineHeight: 21, fontWeight: '600' }, hint: { flex: 1, color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  summary: { gap: 3, padding: spacing.sm, borderRadius: radius.md, backgroundColor: colors.canvas }, summaryText: { color: colors.text, fontSize: 13, lineHeight: 19 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end' }, action: { paddingHorizontal: spacing.md },
});
