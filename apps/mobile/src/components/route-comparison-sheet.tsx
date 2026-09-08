import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import type { StoredLocation } from '../lib/location';
import { routeComparisonFacts, type ComparableRoute } from '../lib/route-comparison';
import { colors, radius, spacing } from '../theme/tokens';
import { AppButton } from './app-button';

export function RouteComparisonSheet<T extends ComparableRoute>({ visible, routes, location, isStale, onClose, onRemove, onOpen }: {
  visible: boolean; routes: T[]; location: StoredLocation | null; isStale: boolean;
  onClose: () => void; onRemove: (slug: string) => void; onOpen: (route: T) => void;
}) {
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  return <Modal visible={visible} animationType={reducedMotion ? 'none' : 'slide'} onRequestClose={onClose} presentationStyle="pageSheet">
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text accessibilityRole="header" style={styles.title}>Your route comparison</Text>
        <AppButton label="Close comparison" variant="secondary" onPress={onClose} />
      </View>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}>
        <Text style={styles.body}>Compare the same facts for each route. Open a route to review its access and prepare your trip.</Text>
        <Text style={styles.body}>{location ? `Drive estimates from ${location.label} use approximate route distance, without traffic or road routing.` : 'Set a planning location on Today to include approximate drive estimates.'}</Text>
        {isStale ? <Text accessibilityLiveRegion="polite" style={styles.warning}>Saved conditions need an update. These stored calls are not a current recommendation.</Text> : null}
        {routes.length < 2 ? <Text accessibilityLiveRegion="polite" style={styles.body}>Close this comparison to choose {routes.length ? 'another route' : 'two or three routes'}.</Text> : null}
        {routes.map((route, index) => <View key={route.river.slug} style={styles.card}>
          <Text style={styles.eyebrow}>ROUTE {index + 1}</Text>
          <Text style={styles.riverName}>{route.river.name}</Text>
          <Text accessibilityRole="header" style={styles.routeTitle}>{route.river.reach}</Text>
          {routeComparisonFacts(route, location, isStale).map(fact => <View key={fact.label} style={styles.fact}>
            <Text style={styles.label}>{fact.label}</Text><Text style={styles.value}>{fact.value}</Text>
          </View>)}
          <View style={styles.actions}>
            <AppButton label="Open route" accessibilityLabel={`Open compared route: ${route.river.name}: ${route.river.reach}`} onPress={() => onOpen(route)} />
            <AppButton label="Remove" accessibilityLabel={`Remove from comparison: ${route.river.name}: ${route.river.reach}`} variant="secondary" onPress={() => onRemove(route.river.slug)} />
          </View>
        </View>)}
      </ScrollView>
    </View>
  </Modal>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  header: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: spacing.md, gap: spacing.sm, borderBottomWidth: 1, borderColor: colors.border },
  title: { color: colors.text, fontSize: 22, lineHeight: 28, fontWeight: '800' },
  content: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: spacing.md, gap: spacing.md },
  body: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  warning: { color: colors.text, backgroundColor: colors.canvasMuted, padding: spacing.md, borderRadius: radius.md, fontSize: 14, lineHeight: 20 },
  card: { backgroundColor: colors.surfaceStrong, padding: spacing.md, gap: spacing.sm, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  riverName: { color: colors.accentDeep, fontSize: 14, lineHeight: 20, fontWeight: '700' },
  routeTitle: { color: colors.text, fontSize: 19, lineHeight: 25, fontWeight: '800' },
  fact: { flexDirection: 'row', flexWrap: 'wrap', columnGap: spacing.sm, paddingVertical: spacing.xs, borderBottomWidth: 1, borderColor: colors.border },
  label: { width: 110, color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  value: { flex: 1, minWidth: 100, color: colors.text, fontSize: 14, lineHeight: 20, fontWeight: '600' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, paddingTop: spacing.sm },
});
