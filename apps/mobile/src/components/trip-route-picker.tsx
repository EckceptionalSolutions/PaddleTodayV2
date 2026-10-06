import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { RiverAccessPoint, TripRoute } from '@paddletoday/api-contract';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { apiClient } from '../api/client';
import { AppButton } from './app-button';
import { colors, radius, spacing } from '../theme/tokens';
import { useReducedMotion } from '../hooks/use-reduced-motion';

/** Route choice is part of the editor; access lists never expand the whole trip form. */
export function TripRoutePicker({ route, onChange, onSearch, disabled, initialCustom = false, recentRoutes = [] }: {
  route: TripRoute; onChange: (route: TripRoute) => void; onSearch: () => void; disabled: boolean;
  initialCustom?: boolean; recentRoutes?: TripRoute[];
}) {
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const [custom, setCustom] = useState(initialCustom || (!route.slug && !!route.name));
  const [endpoint, setEndpoint] = useState<'putIn' | 'takeOut' | null>(null);
  const [points, setPoints] = useState<RiverAccessPoint[]>([]);
  const [loading, setLoading] = useState(false), [error, setError] = useState('');
  const [manualName, setManualName] = useState('');
  useEffect(() => { if (route.slug) setCustom(false); setEndpoint(null); }, [route.slug]);
  useEffect(() => {
    if (!endpoint || !route.slug) return;
    let active = true;
    setLoading(true); setError(''); setPoints([]);
    void apiClient.getRiverDetail(route.slug).then(({ result }) => {
      if (active) setPoints(result.river.accessPoints ?? [result.river.putIn, result.river.takeOut].filter((p): p is RiverAccessPoint => !!p));
    }).catch(() => { if (active) setError('Access points could not load. Reopen this picker to retry, or enter a name below.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [endpoint, route.slug]);
  const chooseEndpoint = (name: string, id = '') => {
    if (!endpoint) return;
    onChange({ ...route, [`${endpoint}Id`]: id, [`${endpoint}Name`]: name }); setEndpoint(null);
  };
  const createCustom = () => {
    onChange({ slug: '', name: '', putInId: '', putInName: '', takeOutId: '', takeOutName: '' }); setCustom(true);
  };
  return <View style={styles.card}>
    <Text accessibilityRole="header" style={styles.title}>Where are you paddling?</Text>
    {route.name && !custom ? <>
      <Text style={styles.tag}>{route.slug ? 'APP ROUTE' : 'CUSTOM ROUTE'}</Text>
      <Text style={styles.routeName}>{route.name}</Text>
      <View style={styles.accessLine}><Text style={styles.copy}>{route.putInName || 'Put-in to be decided'} → {route.takeOutName || 'Take-out to be decided'}</Text></View>
    </> : !custom ? <Text style={styles.copy}>Choose a route from PaddleToday or name a place of your own.</Text> : null}
    <View style={styles.choices}>
      <AppButton label={route.slug ? 'Change app route' : 'Choose app route'} icon="magnify" onPress={onSearch} disabled={disabled} style={styles.choice} />
      {!custom ? <AppButton label="Create custom route" icon="pencil-outline" variant="secondary" onPress={createCustom} disabled={disabled} style={styles.choice} /> : null}
    </View>
    {!route.name && !custom && recentRoutes.length ? <>
      <Text style={styles.label}>Or reuse one of your routes</Text>
      {recentRoutes.map((recent, index) => <Pressable key={index} accessibilityRole="button" disabled={disabled} onPress={() => { onChange({ ...recent }); setCustom(!recent.slug); }} style={styles.point}>
        <MaterialCommunityIcons name="history" size={20} color={colors.accentDeep} /><View style={styles.recentCopy}><Text style={styles.pointName}>{recent.name}</Text><Text style={styles.copy}>{recent.putInName || 'Put-in not set'} → {recent.takeOutName || 'Take-out not set'}</Text></View><MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
      </Pressable>)}
    </> : null}
    {custom ? <>
      <Text style={styles.copy}>Your custom route is saved with this trip. It won’t be added to the public route catalog.</Text>
      {(['name', 'putInName', 'takeOutName'] as const).map(key => <View key={key} style={styles.field}>
        <Text style={styles.label}>{{ name: 'River or location', putInName: 'Put-in (optional)', takeOutName: 'Take-out (optional)' }[key]}</Text>
        <TextInput editable={!disabled} accessibilityLabel={{ name: 'River or location', putInName: 'Put-in (optional)', takeOutName: 'Take-out (optional)' }[key]} value={route[key]} onChangeText={value => onChange({ ...route, [key]: value, slug: '', putInId: '', takeOutId: '' })} style={styles.input} />
      </View>)}
    </> : route.slug ? <View style={styles.choices}>
      {(['putIn', 'takeOut'] as const).map(key => <AppButton key={key} label={key === 'putIn' ? 'Change put-in' : 'Change take-out'} variant="secondary" disabled={disabled} style={styles.choice} onPress={() => { setManualName(route[`${key}Name`]); setEndpoint(key); }} />)}
    </View> : null}
    <Modal visible={!!endpoint} animationType={reducedMotion ? 'none' : 'slide'} onRequestClose={() => setEndpoint(null)}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'android' ? 'height' : undefined} style={[styles.modal, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.md }]}>
        <View style={styles.header}><Text accessibilityRole="header" style={styles.title}>Choose {endpoint === 'putIn' ? 'put-in' : 'take-out'}</Text><AppButton label="Done" variant="secondary" onPress={() => setEndpoint(null)} /></View>
        <Text style={styles.copy}>{route.name}</Text>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.list}>
          {loading ? <Text style={styles.copy}>Loading access points…</Text> : null}
          {error ? <Text accessibilityRole="alert" style={styles.copy}>{error}</Text> : null}
          {!loading && !error && !points.length ? <Text style={styles.copy}>No access points are listed for this route. Enter your meeting place below.</Text> : null}
          {points.map((point, index) => {
            const active = endpoint && (point.id ? route[`${endpoint}Id`] === point.id : route[`${endpoint}Name`] === point.name);
            return <Pressable key={point.id || index} accessibilityRole="button" accessibilityState={{ selected: !!active }} onPress={() => chooseEndpoint(point.name, point.id || '')} style={styles.point}>
              <MaterialCommunityIcons name="map-marker-outline" size={22} color={colors.accentDeep} /><Text style={styles.pointName}>{point.name}</Text><MaterialCommunityIcons name={active ? 'check-circle' : 'chevron-right'} size={22} color={colors.accentDeep} />
            </Pressable>;
          })}
          <Text style={styles.label}>Or enter an access point name</Text>
          <TextInput accessibilityLabel="Access point name" value={manualName} onChangeText={setManualName} style={styles.input} />
          <AppButton label="Use this name" disabled={!manualName.trim()} onPress={() => chooseEndpoint(manualName.trim())} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  </View>;
}
const styles = StyleSheet.create({
  card: { gap: spacing.sm, padding: spacing.md, borderRadius: radius.lg, backgroundColor: colors.canvas, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 18, fontWeight: '800', color: colors.text, flexShrink: 1 },
  tag: { fontSize: 10, letterSpacing: 1, fontWeight: '800', color: colors.accentDeep },
  routeName: { fontSize: 18, lineHeight: 25, fontWeight: '800', color: colors.text },
  copy: { fontSize: 14, lineHeight: 21, color: colors.textMuted },
  accessLine: { padding: spacing.sm, backgroundColor: colors.surfaceStrong, borderRadius: radius.md },
  choices: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  choice: { flexGrow: 1, flexBasis: 130 },
  field: { gap: 6 },
  label: { fontSize: 13, fontWeight: '700', color: colors.textMuted },
  input: { minHeight: 48, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceStrong, padding: 12, fontSize: 16, color: colors.text },
  modal: { flex: 1, paddingHorizontal: spacing.md, gap: spacing.md, backgroundColor: colors.canvas },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  list: { gap: spacing.sm, paddingBottom: spacing.lg },
  point: { minHeight: 60, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.md, borderRadius: radius.md, backgroundColor: colors.surfaceStrong },
  pointName: { flex: 1, color: colors.text, fontSize: 16 },
  recentCopy: { flex: 1, gap: 3 },
});
