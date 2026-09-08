import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { clearRecentRoutes, readRecentRoutes, type RecentRoute } from '../lib/recent-routes';
import { colors, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';
import { SectionCard } from './section-card';

export function RecentRoutes({ onOpen }: { onOpen: (slug: string) => void }) {
  const [routes, setRoutes] = useState<RecentRoute[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [opening, setOpening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const focused = useRef(false), epoch = useRef(0), mutation = useRef(false), navigation = useRef(false);
  const refresh = useCallback(async () => {
    const request = ++epoch.current;
    setLoading(true);
    try {
      const result = await readRecentRoutes(AsyncStorage);
      if (!focused.current || epoch.current !== request) return;
      setRoutes(result); setLoadError(false);
    } catch { if (focused.current && epoch.current === request) setLoadError(true); }
    finally { if (focused.current && epoch.current === request) setLoading(false); }
  }, []);
  useFocusEffect(useCallback(() => {
    focused.current = true; navigation.current = false;
    setOpening(false); setConfirmClear(false); setFeedback('');
    void refresh();
    return () => { focused.current = false; epoch.current++; };
  }, [refresh]));
  async function clear() {
    if (mutation.current) return;
    mutation.current = true; setClearing(true); setFeedback('');
    const request = ++epoch.current;
    try {
      await clearRecentRoutes(AsyncStorage);
      if (focused.current && epoch.current === request) {
        setRoutes([]); setLoadError(false); setConfirmClear(false); setLoading(false);
        setFeedback('Recent history cleared. Saved routes and trip drafts are unchanged.');
      }
    } catch { if (focused.current && epoch.current === request) setFeedback('History could not be cleared. Please try again.'); }
    finally { mutation.current = false; setClearing(false); }
  }
  function open(slug: string) {
    if (navigation.current) return;
    navigation.current = true; setOpening(true);
    try { onOpen(slug); }
    catch { navigation.current = false; setOpening(false); setFeedback('Could not open this route. Please try again.'); }
  }
  if (!routes.length && !loadError && !feedback) return null;
  return <SectionCard title="Recently viewed" subtitle="Your last eight route views on this device.">
    {loadError ? <View style={styles.actions}>
      <Text style={styles.body}>Recent history could not be read. It has not been replaced.</Text>
      <AppButton label="Retry recent routes" onPress={() => void refresh()} busy={loading} busyLabel="Loading history…" disabled={clearing} />
    </View> : null}
    {(expanded ? routes : routes.slice(0, 3)).map(route => <Pressable key={route.slug} accessibilityRole="button"
      accessibilityLabel={`Reopen ${route.name}: ${route.reach}`} disabled={clearing || opening}
      onPress={() => open(route.slug)} style={({ pressed }) => [styles.route, pressed && styles.pressed]}>
      <View style={styles.copy}><Text style={styles.name}>{route.name}</Text><Text style={styles.body}>{route.reach}</Text></View>
      <MaterialCommunityIcons name="chevron-right" color={colors.accent} size={22} accessible={false} />
    </Pressable>)}
    {feedback ? <Text accessibilityLiveRegion="polite" style={styles.body}>{feedback}</Text> : null}
    {confirmClear ? <View style={styles.actions}>
      <Text style={styles.body}>Clear recent route history from this device? New visits will appear as you browse.</Text>
      <AppButton label="Clear recent history" busy={clearing} busyLabel="Clearing history…" onPress={() => void clear()} />
      <AppButton label="Keep history" variant="secondary" disabled={clearing} onPress={() => setConfirmClear(false)} />
    </View> : routes.length || loadError ? <View style={styles.actions}>
      {routes.length > 3 ? <AppButton label={expanded ? 'Show fewer recent routes' : `Show all ${routes.length} recent routes`}
        variant="secondary" expanded={expanded} disabled={clearing || opening} onPress={() => setExpanded(!expanded)} /> : null}
      <AppButton label="Clear history" variant="secondary" disabled={loading || clearing || opening} onPress={() => setConfirmClear(true)} />
    </View> : null}
  </SectionCard>;
}
const styles = StyleSheet.create({
  route: { minHeight: 60, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  copy: { flex: 1, minWidth: 0, gap: 3 }, name: { ...typography.label, color: colors.text },
  body: { ...typography.supporting, color: colors.textMuted }, actions: { gap: spacing.sm }, pressed: { opacity: 0.65 },
});
