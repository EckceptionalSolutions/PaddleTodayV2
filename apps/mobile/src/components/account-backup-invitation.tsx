import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ACCOUNT_BACKUP_INVITATION_DISMISSED_KEY, WELCOME_CHOICE_STORAGE_KEY, WELCOME_COMPLETED_STORAGE_KEY } from '../lib/onboarding';
import { subscribeAccountBackupInvitation } from '../lib/account-invitation';
import { colors, radius, spacing } from '../theme/tokens';

const INVITATION_SHOWN_KEY = 'paddletoday:account-backup-invitation-shown:v1';
const SAVED_ROUTES_KEY = 'paddletoday:saved-rivers';
const TRIP_DRAFT_PREFIX = 'paddletoday:trip-draft:v1:';

export function AccountBackupInvitation() {
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [authReady, setAuthReady] = useState(Platform.OS === 'web' || process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED !== '1');
  const [signedIn, setSignedIn] = useState(false);
  const [visible, setVisible] = useState(false);
  const userRef = useRef(false);
  const entryRoute = pathname === '/welcome' || pathname === '/sign-in' || pathname === '/tour' || pathname.startsWith('/auth/callback');

  useEffect(() => {
    if (Platform.OS === 'web' || process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED !== '1') return;
    let active = true;
    let unsubscribe: (() => void) | null = null;
    void import('@react-native-firebase/auth').then(({ getAuth, onAuthStateChanged }) => {
      if (!active) return;
      unsubscribe = onAuthStateChanged(getAuth(), user => {
        userRef.current = Boolean(user);
        setSignedIn(Boolean(user));
        setAuthReady(true);
      });
    }).catch(() => { if (active) setAuthReady(true); });
    return () => { active = false; unsubscribe?.(); };
  }, []);

  useEffect(() => {
    if (!authReady || signedIn || entryRoute) return;
    let active = true;
    void showForExistingGuest().then(show => { if (active && show) setVisible(true); });
    return () => { active = false; };
  }, [authReady, signedIn, entryRoute]);

  useEffect(() => subscribeAccountBackupInvitation(() => {
    void showOnce();
  }), []);

  async function showForExistingGuest() {
    const [completed, choice, dismissed, shown, keys, routes] = await Promise.all([
      AsyncStorage.getItem(WELCOME_COMPLETED_STORAGE_KEY),
      AsyncStorage.getItem(WELCOME_CHOICE_STORAGE_KEY),
      AsyncStorage.getItem(ACCOUNT_BACKUP_INVITATION_DISMISSED_KEY),
      AsyncStorage.getItem(INVITATION_SHOWN_KEY),
      AsyncStorage.getAllKeys(),
      AsyncStorage.getItem(SAVED_ROUTES_KEY),
    ]);
    const hasData = hasSavedRoutes(routes) || keys.some(key => key.startsWith(TRIP_DRAFT_PREFIX));
    if (completed !== '1' || choice === 'account' || !hasData || dismissed === '1' || shown === '1') return false;
    await AsyncStorage.setItem(INVITATION_SHOWN_KEY, '1');
    return true;
  }

  async function showOnce() {
    if (!authReady || signedIn || userRef.current || entryRoute) return;
    const [dismissed, shown] = await Promise.all([
      AsyncStorage.getItem(ACCOUNT_BACKUP_INVITATION_DISMISSED_KEY),
      AsyncStorage.getItem(INVITATION_SHOWN_KEY),
    ]);
    if (dismissed === '1' || shown === '1') return;
    await AsyncStorage.setItem(INVITATION_SHOWN_KEY, '1');
    setVisible(true);
  }

  async function dismiss() {
    setVisible(false);
    await AsyncStorage.setItem(ACCOUNT_BACKUP_INVITATION_DISMISSED_KEY, '1').catch(() => {});
  }

  async function signIn() {
    await dismiss();
    router.push({ pathname: '/sign-in', params: { returnTo: pathname } } as never);
  }

  if (!visible || signedIn || entryRoute) return null;
  return (
    <View style={[styles.anchor, { bottom: Math.max(insets.bottom, 10) + 68 }]} pointerEvents="box-none">
      <View style={styles.card} accessibilityLiveRegion="polite">
        <View style={styles.copy}>
          <View style={styles.icon}><MaterialCommunityIcons name="cloud-upload-outline" size={20} color={colors.accentDeep} /></View>
          <View style={styles.text}>
            <Text accessibilityRole="header" style={styles.title}>Keep your paddling plans safe</Text>
            <Text style={styles.body}>Create an account to back up saved rivers, notes, and trip plans.</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Pressable accessibilityRole="button" onPress={() => void signIn()} style={styles.primaryAction}>
            <Text style={styles.primaryLabel}>Set up backup</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Dismiss account backup invitation" onPress={() => void dismiss()} style={styles.dismiss}>
            <MaterialCommunityIcons name="close" size={20} color={colors.textMuted} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function hasSavedRoutes(raw: string | null) {
  try { const routes: unknown = JSON.parse(raw ?? '[]'); return Array.isArray(routes) && routes.length > 0; }
  catch { return Boolean(raw); }
}

const styles = StyleSheet.create({
  anchor: { position: 'absolute', left: spacing.md, right: spacing.md, zIndex: 50, alignItems: 'center' },
  card: { width: '100%', maxWidth: 520, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm, padding: spacing.md, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceStrong, elevation: 8, shadowColor: '#000', shadowOpacity: 0.16, shadowRadius: 14, shadowOffset: { width: 0, height: 5 } },
  copy: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  icon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft },
  text: { flex: 1, minWidth: 0, gap: 2 },
  title: { color: colors.text, fontSize: 14, lineHeight: 19, fontWeight: '900' },
  body: { color: colors.textMuted, fontSize: 12, lineHeight: 16 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  primaryAction: { minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: radius.pill, backgroundColor: colors.accent, paddingHorizontal: spacing.md },
  primaryLabel: { color: colors.surfaceStrong, fontSize: 13, fontWeight: '800' },
  dismiss: { width: 40, height: 44, alignItems: 'center', justifyContent: 'center' },
});
