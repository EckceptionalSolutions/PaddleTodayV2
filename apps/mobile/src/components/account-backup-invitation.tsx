import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { ACCOUNT_BACKUP_INVITATION_DISMISSED_KEY, WELCOME_CHOICE_STORAGE_KEY, WELCOME_COMPLETED_STORAGE_KEY } from '../lib/onboarding';
import { subscribeAccountBackupInvitation } from '../lib/account-invitation';
import { radius, spacing, type AppColors } from '../theme/tokens';
import { useAppTheme, useThemedStyles } from '../theme/theme-provider';

const INVITATION_SHOWN_KEY = 'paddletoday:account-backup-invitation-shown:v1';
const SAVED_ROUTES_KEY = 'paddletoday:saved-rivers';
const TRIP_DRAFT_PREFIX = 'paddletoday:trip-draft:v1:';

export function useSavedBackupInvitation(focused: boolean) {
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createStyles);
  const { width, fontScale } = useWindowDimensions();
  const router = useRouter();
  const [authReady, setAuthReady] = useState(Platform.OS === 'web' || process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED !== '1');
  const [signedIn, setSignedIn] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'web' || process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED !== '1') return;
    let active = true;
    let unsubscribe: (() => void) | null = null;
    void import('@react-native-firebase/auth').then(({ getAuth, onAuthStateChanged }) => {
      if (!active) return;
      unsubscribe = onAuthStateChanged(getAuth(), user => {
        setSignedIn(Boolean(user));
        setAuthReady(true);
      });
    }).catch(() => { if (active) setAuthReady(true); });
    return () => { active = false; unsubscribe?.(); };
  }, []);

  useEffect(() => {
    if (!focused || !authReady || signedIn) return;
    let active = true;
    const check = () => {
      void eligibleGuest().then(async eligible => {
        if (!active || !eligible) return;
        setVisible(true);
        await AsyncStorage.setItem(INVITATION_SHOWN_KEY, '1');
      }).catch(() => {});
    };
    check();
    const unsubscribe = subscribeAccountBackupInvitation(check);
    return () => { active = false; unsubscribe(); };
  }, [authReady, signedIn, focused]);

  async function eligibleGuest() {
    const [completed, choice, dismissed, shown, keys, routes] = await Promise.all([
      AsyncStorage.getItem(WELCOME_COMPLETED_STORAGE_KEY),
      AsyncStorage.getItem(WELCOME_CHOICE_STORAGE_KEY),
      AsyncStorage.getItem(ACCOUNT_BACKUP_INVITATION_DISMISSED_KEY),
      AsyncStorage.getItem(INVITATION_SHOWN_KEY),
      AsyncStorage.getAllKeys(),
      AsyncStorage.getItem(SAVED_ROUTES_KEY),
    ]);
    const hasData = hasSavedRoutes(routes) || keys.some(key => key.startsWith(TRIP_DRAFT_PREFIX));
    return completed === '1' && choice !== 'account' && hasData && dismissed !== '1' && shown !== '1';
  }

  async function dismiss() {
    setVisible(false);
    await AsyncStorage.setItem(ACCOUNT_BACKUP_INVITATION_DISMISSED_KEY, '1').catch(() => {});
  }

  async function signIn() {
    await dismiss();
    router.push({ pathname: '/sign-in', params: { returnTo: '/saved' } } as never);
  }

  if (!focused || !visible || signedIn) return null;
  return (
    <View style={[styles.card, width / fontScale < 430 && styles.stackedCard]} accessibilityLiveRegion="polite">
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
  );
}

function hasSavedRoutes(raw: string | null) {
  try { const routes: unknown = JSON.parse(raw ?? '[]'); return Array.isArray(routes) && routes.length > 0; }
  catch { return Boolean(raw); }
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  stackedCard: { flexDirection: 'column', alignItems: 'stretch' },
  card: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm, padding: spacing.md, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceStrong, elevation: 8, shadowColor: '#000', shadowOpacity: 0.16, shadowRadius: 14, shadowOffset: { width: 0, height: 5 } },
  copy: { flexGrow: 1, flexShrink: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  icon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft },
  text: { flex: 1, minWidth: 0, gap: 2 },
  title: { color: colors.text, fontSize: 14, lineHeight: 19, fontWeight: '900' },
  body: { color: colors.textMuted, fontSize: 12, lineHeight: 16 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: spacing.xs },
  primaryAction: { minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: radius.pill, backgroundColor: colors.accent, paddingHorizontal: spacing.md },
  primaryLabel: { color: colors.onAccent, fontSize: 13, fontWeight: '800' },
  dismiss: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});
