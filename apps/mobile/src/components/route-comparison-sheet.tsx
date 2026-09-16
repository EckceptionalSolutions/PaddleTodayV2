import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import type { StoredLocation } from '../lib/location';
import { routeComparisonFacts, type ComparableRoute, type ComparisonFactGroup } from '../lib/route-comparison';
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
        {routes.length > 0 ? <ScrollView horizontal contentContainerStyle={styles.tableScroll} showsHorizontalScrollIndicator accessibilityLabel="Horizontally scrollable route comparison">
          <View style={[styles.table, { minWidth: Math.max(320, routes.length * 190 + 112) }]}>
            <View style={styles.routeHeaders}>
              <View style={styles.labelColumn} />
              {routes.map((route, index) => <View key={route.river.slug} style={styles.routeHeader}>
                <Text style={styles.eyebrow}>ROUTE {index + 1}</Text>
                <Text style={styles.riverName}>{route.river.name}</Text>
                <Text accessibilityRole="header" style={styles.routeTitle}>{route.river.reach}</Text>
                <View style={styles.actions}>
                  <AppButton label="Open" accessibilityLabel={`Open compared route: ${route.river.name}: ${route.river.reach}`} onPress={() => onOpen(route)} />
                  <AppButton label="Remove" accessibilityLabel={`Remove from comparison: ${route.river.name}: ${route.river.reach}`} variant="secondary" onPress={() => onRemove(route.river.slug)} />
                </View>
              </View>)}
            </View>
            {(['Conditions', 'Trip effort', 'Access'] as ComparisonFactGroup[]).map(group => {
              const facts = routeComparisonFacts(routes[0], location, isStale).filter(fact => fact.group === group);
              const routeFacts = routes.map(route => routeComparisonFacts(route, location, isStale));
              return <View key={group} style={styles.group}>
                <Text accessibilityRole="header" style={styles.groupTitle}>{group}</Text>
                {facts.map(fact => {
                  const values = routeFacts.map(routeFact => routeFact.find(item => item.id === fact.id)?.value ?? 'Not listed');
                  const comparableValues = routeFacts.map(routeFact => routeFact.find(item => item.id === fact.id)?.comparableValue ?? 'not-listed');
                  const differs = new Set(comparableValues).size > 1;
                  return <View key={fact.id} style={[styles.factRow, differs ? styles.factRowDifferent : null]}>
                    <View style={styles.labelColumn}><Text style={styles.label}>{fact.label}</Text>{differs ? <Text style={styles.differs}>Differs</Text> : null}</View>
                    {values.map((value, index) => <Text key={`${routes[index].river.slug}-${fact.id}`} style={styles.value}>{value}</Text>)}
                  </View>;
                })}
              </View>;
            })}
          </View>
        </ScrollView> : null}
      </ScrollView>
    </View>
  </Modal>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  header: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: spacing.md, gap: spacing.sm, borderBottomWidth: 1, borderColor: colors.border },
  title: { color: colors.text, fontSize: 22, lineHeight: 28, fontWeight: '800' },
  content: { width: '100%', maxWidth: 960, alignSelf: 'center', padding: spacing.md, gap: spacing.md },
  body: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  warning: { color: colors.text, backgroundColor: colors.canvasMuted, padding: spacing.md, borderRadius: radius.md, fontSize: 14, lineHeight: 20 },
  tableScroll: { paddingBottom: spacing.sm },
  table: { backgroundColor: colors.surfaceStrong, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  routeHeaders: { flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.border, backgroundColor: colors.canvasMuted },
  routeHeader: { width: 190, padding: spacing.sm, gap: spacing.xs, borderLeftWidth: 1, borderColor: colors.border },
  labelColumn: { width: 112, padding: spacing.sm, justifyContent: 'center' },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  riverName: { color: colors.accentDeep, fontSize: 14, lineHeight: 20, fontWeight: '700' },
  routeTitle: { color: colors.text, fontSize: 19, lineHeight: 25, fontWeight: '800' },
  label: { width: 110, color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  value: { flex: 1, minWidth: 100, color: colors.text, fontSize: 14, lineHeight: 20, fontWeight: '600' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, paddingTop: spacing.xs },
  group: { borderBottomWidth: 1, borderColor: colors.border },
  groupTitle: { padding: spacing.sm, color: colors.accentDeep, fontSize: 13, lineHeight: 18, fontWeight: '800' },
  factRow: { flexDirection: 'row', minHeight: 48, borderTopWidth: 1, borderColor: colors.border },
  factRowDifferent: { backgroundColor: colors.canvasMuted },
  differs: { color: colors.accentDeep, fontSize: 10, lineHeight: 14, fontWeight: '800' },
});
