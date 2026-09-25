import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { EmailAuthProvider, GoogleAuthProvider, isSignInWithEmailLink, onAuthStateChanged, sendSignInLinkToEmail, signInWithCredential, signInWithEmailLink } from '@react-native-firebase/auth';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { apiClient } from '../api/client';
import { AppButton } from '../components/app-button';
import { WebReady } from '../components/web-ready';
import { syncAccountBackup } from '../lib/account-backup';
import { accountBackupFailureMessage } from '../lib/account-backup-errors';
import { clearGuestImportConsent, grantGuestImportConsent } from '../lib/account-local-state';
import { PENDING_EMAIL, PENDING_EMAIL_ACTION, PENDING_EMAIL_RETURN_TO } from '../lib/auth-secure-store-keys';
import { emailLinkDomainOption } from '../lib/email-link-domain';
import { completeWelcome, consumePendingLaunchTarget } from '../lib/onboarding';
import { colors, radius, spacing, typography } from '../theme/tokens';

const LINK_DOMAIN = process.env.EXPO_PUBLIC_FIREBASE_AUTH_LINK_DOMAIN?.trim();
const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID?.trim();
const EMAIL_COOLDOWN_MS = 30_000;
const welcomeRiverImage = require('../../assets/images/welcome-river.jpg');
const welcomeLogo = require('../../assets/images/welcome-logo.png');

export default function AccountEntryScreen({ isWelcome = false, defaultReturnTo = '/' }: { isWelcome?: boolean; defaultReturnTo?: string }) {
  return <WebReady title={isWelcome ? 'Welcome to PaddleToday' : 'Sign in'}><AccountEntryContent isWelcome={isWelcome} defaultReturnTo={defaultReturnTo} /></WebReady>;
}

function AccountEntryContent({ isWelcome, defaultReturnTo }: { isWelcome: boolean; defaultReturnTo: string }) {
  const router = useRouter();
  const params = useLocalSearchParams<{ returnTo?: string | string[] }>();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const returnTo = safeReturnTo(Array.isArray(params.returnTo) ? params.returnTo[0] : params.returnTo, defaultReturnTo);
  const isAccountContext = !isWelcome && returnTo === '/account';
  const [email, setEmail] = useState('');
  const [emailStep, setEmailStep] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [emailLinkUrl, setEmailLinkUrl] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [signedInUid, setSignedInUid] = useState<string | null>(null);
  const [syncResult, setSyncResult] = useState<'synced' | 'pending' | null>(null);
  const [resultTitle, setResultTitle] = useState('Your account is ready');
  const [completionReturnTo, setCompletionReturnTo] = useState<string | null>(null);
  const [resendAt, setResendAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const finalizedUid = useRef<string | null>(null);
  const emailLinkInProgress = useRef(false);
  const authEnabled = process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED === '1';
  const googleEnabled = authEnabled && Platform.OS !== 'web' && Boolean(GOOGLE_WEB_CLIENT_ID);
  const emailEnabled = authEnabled && Platform.OS !== 'web' && Boolean(LINK_DOMAIN);
  const resendSeconds = Math.max(0, Math.ceil((resendAt - now) / 1000));

  useEffect(() => {
    if (!resendAt) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [resendAt]);

  useEffect(() => {
    if (Platform.OS === 'web' || process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED !== '1') {
      setSessionChecked(true);
      return;
    }
    let active = true;
    const unsubscribe = onAuthStateChanged(auth(), user => {
      if (!active) return;
      setSessionChecked(true);
      setSignedInUid(user?.uid ?? null);
      if (user && finalizedUid.current !== user.uid) {
        void SecureStore.getItemAsync(PENDING_EMAIL_ACTION).then(action => {
          if (active && action !== 'reauthenticate') return finishSuccessfulSignIn(user);
        });
      }
    });
    return () => { active = false; unsubscribe(); };
  }, []);

  useEffect(() => {
    let active = true;
    const handle = (url: string | null) => { if (url) void consumeEmailLink(url, () => active); };
    void Linking.getInitialURL().then(handle);
    const subscription = Linking.addEventListener('url', ({ url }) => handle(url));
    return () => { active = false; subscription.remove(); };
  }, []);

  async function finishSuccessfulSignIn(user: NonNullable<ReturnType<typeof auth>['currentUser']>) {
    if (finalizedUid.current === user.uid) return;
    finalizedUid.current = user.uid;
    setBusy(true);
    setMessage('Your account is connected. Checking your backup…');
    setResultTitle('Your account is ready');
    try {
      await completeWelcome({ choice: 'account' });
      const token = await user.getIdToken();
      await apiClient.registerAccount(token);
      const result = await syncWithGuestImport(token, user.uid);
      setSyncResult(result.pending ? 'pending' : 'synced');
      setMessage(result.pending
        ? 'You’re signed in. Some saved data is still waiting to sync.'
        : 'You’re signed in, and your saved routes and trip plans are backed up.');
    } catch (error) {
      setSyncResult('pending');
      setMessage(`You’re signed in. ${accountBackupFailureMessage(error)} You can retry from Account & Backup.`);
    } finally { if (!auth().currentUser) await clearGuestImportConsent().catch(() => {}); setBusy(false); }
  }

  async function continueWithoutAccount() {
    if (busy) return;
    setBusy(true);
    setMessage('');
    try {
      await completeWelcome({ choice: 'guest', trackFirstRouteOpen: isWelcome });
      const destination = isWelcome ? ((await consumePendingLaunchTarget()) ?? returnTo) : returnTo;
      router.replace(destination as never);
    } catch {
      setMessage("Couldn't save your choice. Please try again.");
      setBusy(false);
    }
  }

  async function runGoogleSignIn() {
    if (busy || !googleEnabled || !GOOGLE_WEB_CLIENT_ID) return;
    try { await prepareGuestDataImport(); }
    catch { setMessage('This phone’s saved data could not be checked. Sign-in was paused to protect it.'); return; }
    setBusy(true);
    setMessage('');
    try {
      const { GoogleSignin, isCancelledResponse } = await import('@react-native-google-signin/google-signin');
      GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID });
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      if (isCancelledResponse(result)) {
        setMessage('Sign-in was canceled. You can try again or continue without an account.');
        return;
      }
      const tokens = await GoogleSignin.getTokens();
      if (!tokens.idToken) throw new Error('Google did not return an ID token.');
      const credential = GoogleAuthProvider.credential(tokens.idToken);
      const current = auth().currentUser;
      if (current) await current.linkWithCredential(credential);
      else await signInWithCredential(auth(), credential);
      const user = auth().currentUser;
      if (user) await finishSuccessfulSignIn(user);
    } catch (error) {
      const code = error && typeof error === 'object' && 'code' in error ? String(error.code).toLowerCase() : '';
      setMessage(code.includes('cancel')
        ? 'Sign-in was canceled. You can try again or continue without an account.'
        : 'Google sign-in could not be completed. Check your connection and try again.');
    } finally { if (!auth().currentUser) await clearGuestImportConsent().catch(() => {}); setBusy(false); }
  }

  async function sendEmailLink() {
    const normalized = email.trim().toLowerCase();
    if (busy) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) { setMessage('Enter a valid email address.'); return; }
    if (!LINK_DOMAIN) { setMessage('Email sign-in is not configured for this build.'); return; }
    if (Date.now() < resendAt) { setMessage('Please wait ' + resendSeconds + ' seconds before sending another link.'); return; }
    try { await prepareGuestDataImport(); }
    catch { setMessage('This phone’s saved data could not be checked. Email sign-in was paused to protect it.'); return; }
    setBusy(true);
    setMessage('');
    setResendAt(Date.now() + EMAIL_COOLDOWN_MS);
    try {
      await SecureStore.setItemAsync(PENDING_EMAIL, normalized);
      await SecureStore.setItemAsync(PENDING_EMAIL_ACTION, 'sign-in');
      await SecureStore.setItemAsync(PENDING_EMAIL_RETURN_TO, returnTo);
      await sendSignInLinkToEmail(auth(), normalized, {
        url: 'https://paddletoday.com/auth/callback?returnTo=' + encodeURIComponent(returnTo), handleCodeInApp: true,
        ...emailLinkDomainOption(LINK_DOMAIN),
        iOS: { bundleId: 'com.paddletoday.mobile' },
        android: { packageName: 'com.paddletoday.mobile', installApp: false, minimumVersion: '1' },
      });
      setSentEmail(normalized);
      setMessage('Check ' + normalized + ' for your sign-in link. Open it on this device to finish.');
    } catch {
      await SecureStore.deleteItemAsync(PENDING_EMAIL).catch(() => {});
      await SecureStore.deleteItemAsync(PENDING_EMAIL_ACTION).catch(() => {});
      await SecureStore.deleteItemAsync(PENDING_EMAIL_RETURN_TO).catch(() => {});
      setResendAt(0);
      if (!auth().currentUser) await clearGuestImportConsent().catch(() => {});
      setMessage('Could not send a link right now. Check the address and try again shortly.');
    } finally { setBusy(false); }
  }

  async function consumeEmailLink(explicitUrl?: string, isCurrent = () => true) {
    const url = explicitUrl ?? await Linking.getInitialURL();
    if (!url || !isSignInWithEmailLink(auth(), url)) return;
    const pendingEmail = await SecureStore.getItemAsync(PENDING_EMAIL);
    if (!pendingEmail) {
      setEmailLinkUrl(url);
      setEmailStep(true);
      setMessage('Enter the same email address used to request this link.');
      return;
    }
    if (emailLinkInProgress.current) return;
    emailLinkInProgress.current = true;
    setBusy(true);
    try {
      const pendingAction = await SecureStore.getItemAsync(PENDING_EMAIL_ACTION);
      const activeUser = auth().currentUser;
      const savedReturnTo = await SecureStore.getItemAsync(PENDING_EMAIL_RETURN_TO).catch(() => null);
      if (savedReturnTo) setCompletionReturnTo(savedReturnTo);
      if (pendingAction === 'reauthenticate' && activeUser) {
        await activeUser.reauthenticateWithCredential(EmailAuthProvider.credentialWithLink(pendingEmail, url));
        setSignedInUid(activeUser.uid);
        setSyncResult('synced');
        setResultTitle('Email verified');
        setMessage('Your email is verified. Return to Account & Backup to retry account deletion.');
      } else if (pendingAction === 'link' && activeUser) {
        await activeUser.linkWithCredential(EmailAuthProvider.credentialWithLink(pendingEmail, url));
      } else if (activeUser) {
        setMessage('Another account is signed in on this device. Open the link where it was requested, or sign out first.');
        return;
      } else {
        await prepareGuestDataImport();
        await signInWithEmailLink(auth(), pendingEmail, url);
      }
      await SecureStore.deleteItemAsync(PENDING_EMAIL);
      await SecureStore.deleteItemAsync(PENDING_EMAIL_ACTION);
      await SecureStore.deleteItemAsync(PENDING_EMAIL_RETURN_TO).catch(() => {});
      setSentEmail('');
      setEmailLinkUrl(null);
      const user = auth().currentUser;
      if (user) await finishSuccessfulSignIn(user);
    } catch {
      await clearGuestImportConsent().catch(() => {});
      if (isCurrent()) setMessage('That link could not be used. Request a fresh link and try again.');
    } finally { emailLinkInProgress.current = false; if (!auth().currentUser) await clearGuestImportConsent().catch(() => {}); setBusy(false); }
  }

  async function finishCrossDeviceEmailLink() {
    const normalized = email.trim().toLowerCase();
    if (!emailLinkUrl || !isSignInWithEmailLink(auth(), emailLinkUrl)) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) { setMessage('Enter the email address used to request this link.'); return; }
    try { await prepareGuestDataImport(); }
    catch { setMessage('This phone’s saved data could not be checked. Sign-in was paused to protect it.'); return; }
    setBusy(true);
    try {
      await signInWithEmailLink(auth(), normalized, emailLinkUrl);
      setEmailLinkUrl(null);
      await SecureStore.deleteItemAsync(PENDING_EMAIL).catch(() => {});
      await SecureStore.deleteItemAsync(PENDING_EMAIL_ACTION).catch(() => {});
      await SecureStore.deleteItemAsync(PENDING_EMAIL_RETURN_TO).catch(() => {});
      const user = auth().currentUser;
      if (user) await finishSuccessfulSignIn(user);
    } catch {
      setMessage('That link could not be used with this email. Request a fresh link and try again.');
    } finally { if (!auth().currentUser) await clearGuestImportConsent().catch(() => {}); setBusy(false); }
  }

  async function prepareGuestDataImport() {
    if (await hasGuestBackupData()) await grantGuestImportConsent();
  }

  async function syncWithGuestImport(token: string, uid: string) {
    try { return await syncAccountBackup(token, uid); }
    catch (error) {
      if (!(error instanceof Error) || error.message !== 'guest_import_consent_required') throw error;
      await grantGuestImportConsent();
      return syncAccountBackup(token, uid);
    }
  }

  const showSignedInResult = Boolean(signedInUid && syncResult);
  const continueAfterSignIn = async () => {
    await SecureStore.deleteItemAsync(PENDING_EMAIL_RETURN_TO).catch(() => {});
    router.replace((safeReturnTo(completionReturnTo ?? (await consumePendingLaunchTarget()) ?? undefined, returnTo)) as never);
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.md }]} keyboardShouldPersistTaps="handled">
        {isAccountContext ? <Pressable accessibilityRole="button" accessibilityLabel="Back to More" disabled={busy} onPress={() => router.replace('/more' as never)} style={styles.backToMore}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.accentDeep} />
          <Text style={styles.backToMoreText}>More</Text>
        </Pressable> : null}
        {isWelcome ? <>
          <View style={styles.brand}>
            <Image source={welcomeLogo} accessible={false} style={styles.logo} resizeMode="contain" />
            <Text style={styles.brandText}>PaddleToday</Text>
          </View>
          <ImageBackground source={welcomeRiverImage} style={[styles.hero, height < 640 && styles.heroCompact]} imageStyle={styles.heroImage}>
            <View style={styles.heroShade} />
            <View style={styles.heroCopy}>
              <Text style={styles.kicker}>WELCOME TO PADDLETODAY</Text>
              <Text accessibilityRole="header" style={styles.title}>Your next paddle starts here.</Text>
              <Text style={styles.benefit}>Explore rivers, check conditions, and plan a day on the water.</Text>
            </View>
          </ImageBackground>
        </> : <View style={styles.accountIntro}>
          <View style={styles.accountIcon}><MaterialCommunityIcons name="account-circle-outline" size={32} color={colors.accentDeep} /></View>
          <Text accessibilityRole="header" style={styles.accountTitle}>Account & backup</Text>
          <Text style={styles.accountSubtitle}>Sign in to back up your saved routes, notes, and trip plans across devices.</Text>
        </View>}
        <View style={styles.actions}>
          {showSignedInResult ? (
            <View style={styles.resultCard} accessibilityLiveRegion="polite">
              <View style={styles.resultIcon}><MaterialCommunityIcons name={syncResult === 'synced' ? 'cloud-check-outline' : 'cloud-sync-outline'} color={colors.accentDeep} size={24} /></View>
              <Text accessibilityRole="header" style={styles.resultTitle}>{resultTitle}</Text>
              <Text style={styles.resultBody}>{message}</Text>
              <AppButton label={isAccountContext ? 'Open Account & Backup' : 'Continue to PaddleToday'} icon="arrow-right" onPress={continueAfterSignIn} style={styles.actionButton} />
            </View>
          ) : emailStep ? (
            <View style={styles.emailCard}>
              <Text accessibilityRole="header" style={styles.sectionTitle}>{sentEmail ? 'Check your email' : 'Continue with email'}</Text>
              {sentEmail ? <Text style={styles.emailHelp}>We sent a secure sign-in link to {sentEmail}. Open it on this device to finish signing in.</Text> : null}
              <TextInput value={email} onChangeText={value => { setEmail(value); setMessage(''); }} autoCapitalize="none" autoComplete="email" keyboardType="email-address" textContentType="emailAddress" placeholder="you@example.com" placeholderTextColor={colors.textMuted} accessibilityLabel="Email address" editable={!busy} returnKeyType="done" onSubmitEditing={() => { if (emailLinkUrl) void finishCrossDeviceEmailLink(); else void sendEmailLink(); }} style={styles.input} />
              {emailLinkUrl ? <AppButton label="Finish signing in with email" busy={busy} onPress={() => void finishCrossDeviceEmailLink()} style={styles.actionButton} /> : <AppButton label={sentEmail ? resendSeconds ? 'Send another link in ' + resendSeconds + 's' : 'Send another link' : 'Email me a sign-in link'} busy={busy} disabled={resendSeconds > 0} onPress={() => void sendEmailLink()} style={styles.actionButton} />}
              {sentEmail ? <Pressable accessibilityRole="button" onPress={() => { setEmail(''); setSentEmail(''); setResendAt(0); setMessage(''); }} style={styles.textAction}><Text style={styles.textActionLabel}>Use a different email</Text></Pressable> : null}
              <Pressable accessibilityRole="button" onPress={() => { setEmailStep(false); setMessage(''); }} style={styles.textAction}><Text style={styles.textActionLabel}>Back to sign-in options</Text></Pressable>
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>{isWelcome ? 'Choose how to start' : 'Choose a sign-in method'}</Text>
              {googleEnabled ? <AppButton label="Continue with Google" icon="google" busy={busy} onPress={() => void runGoogleSignIn()} style={styles.actionButton} /> : null}
              {emailEnabled ? <AppButton label="Continue with email" icon="email-outline" variant="secondary" busy={busy} onPress={() => { setEmailStep(true); setMessage(''); }} style={styles.actionButton} /> : null}
              {!googleEnabled && !emailEnabled ? <Text style={styles.unavailable}>Account sign-in is unavailable in this build. You can still explore PaddleToday.</Text> : null}
              {!isAccountContext ? <AppButton label={isWelcome ? 'Explore PaddleToday' : 'Back to PaddleToday without signing in'} icon="arrow-right" variant="secondary" busy={busy} onPress={() => void continueWithoutAccount()} style={styles.actionButton} /> : null}
            </>
          )}
          {message && !showSignedInResult ? <Text accessibilityRole="alert" style={styles.message}>{message}</Text> : null}
          {busy ? <ActivityIndicator accessibilityLabel="Signing in and checking your backup" color={colors.accent} style={styles.spinner} /> : null}
          {!isWelcome ? <View style={styles.privacy}>
            <MaterialCommunityIcons name="shield-check-outline" size={16} color={colors.accent} />
            <Text style={styles.privacyText}>Signing in adds this device’s saved routes, notes, and trip plans to your account backup.</Text>
          </View> : null}
        </View>
        {!sessionChecked && process.env.EXPO_PUBLIC_ACCOUNT_AUTH_ENABLED === '1' ? <View style={styles.sessionGate} accessibilityLabel="Checking your account"><ActivityIndicator color={colors.accent} /></View> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

async function hasGuestBackupData() {
  const [rawRoutes, keys] = await Promise.all([AsyncStorage.getItem('paddletoday:saved-rivers'), AsyncStorage.getAllKeys()]);
  let hasRoutes = false;
  try { const value: unknown = JSON.parse(rawRoutes ?? '[]'); hasRoutes = Array.isArray(value) && value.length > 0; }
  catch { hasRoutes = Boolean(rawRoutes); }
  return hasRoutes || keys.some(key => key.startsWith('paddletoday:trip-draft:v1:') || key.startsWith('paddletoday:offline-trip:v1:') || key.startsWith('paddletoday:offline-trip-data:v1:'));
}

function safeReturnTo(value: string | undefined, fallback: string) {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith('/sign-in') || value.startsWith('/welcome') || value.startsWith('/auth/callback')) return fallback;
  return value;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  scroll: { flexGrow: 1, width: '100%', maxWidth: 520, alignSelf: 'center', paddingHorizontal: spacing.md, gap: spacing.md },
  backToMore: { minHeight: 44, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: spacing.xs },
  backToMoreText: { color: colors.accentDeep, fontSize: 16, fontWeight: '700' },
  brand: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs },
  logo: { width: 34, height: 34 },
  brandText: { color: colors.accentDeep, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }), fontSize: 20, fontWeight: '700' },
  hero: { minHeight: 270, justifyContent: 'flex-end', overflow: 'hidden', borderRadius: radius.lg, backgroundColor: '#2F5D53' },
  heroCompact: { minHeight: 205 },
  heroImage: { borderRadius: radius.lg },
  heroShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(7, 28, 23, 0.38)' },
  heroCopy: { padding: spacing.lg, gap: spacing.sm },
  kicker: { color: '#E2EFE7', fontSize: 11, fontWeight: '900', letterSpacing: 1.1 },
  title: { color: '#FFFFFF', fontSize: 34, lineHeight: 40, fontWeight: '900', maxWidth: 400 },
  benefit: { color: '#FFFFFF', fontSize: 16, lineHeight: 23, fontWeight: '600', maxWidth: 420 },
  accountIntro: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.md },
  accountIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft },
  accountTitle: { ...typography.title, color: colors.text, fontSize: 27, lineHeight: 33, textAlign: 'center' },
  accountSubtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 22, textAlign: 'center', maxWidth: 360 },
  actions: { gap: spacing.sm, paddingBottom: spacing.sm },
  sectionTitle: { ...typography.title, color: colors.text, fontSize: 20, lineHeight: 26, textAlign: 'center', marginBottom: spacing.xs },
  actionButton: { minHeight: 52, borderRadius: radius.md, width: '100%' },
  textAction: { minHeight: 44, alignItems: 'center', justifyContent: 'center', padding: spacing.xs },
  textActionLabel: { color: colors.accentDeep, fontSize: 15, lineHeight: 20, fontWeight: '800', textDecorationLine: 'underline' },
  privacy: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs, paddingTop: spacing.xs },
  privacyText: { color: colors.textMuted, fontSize: 12, lineHeight: 18, flexShrink: 1, textAlign: 'center' },
  emailCard: { gap: spacing.sm, padding: spacing.md, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  emailHelp: { color: colors.textMuted, fontSize: 15, lineHeight: 22, textAlign: 'center' },
  input: { minHeight: 52, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.md, color: colors.text, backgroundColor: colors.surfaceStrong, fontSize: 16 },
  message: { color: colors.text, fontSize: 14, lineHeight: 20, textAlign: 'center', padding: spacing.sm, backgroundColor: colors.canvasMuted, borderRadius: radius.md },
  unavailable: { color: colors.textMuted, textAlign: 'center', fontSize: 14, lineHeight: 20 },
  spinner: { marginTop: spacing.xs },
  resultCard: { alignItems: 'center', gap: spacing.sm, padding: spacing.md, borderRadius: radius.lg, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
  resultIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft },
  resultTitle: { color: colors.text, fontSize: 21, lineHeight: 27, fontWeight: '900', textAlign: 'center' },
  resultBody: { color: colors.textMuted, fontSize: 15, lineHeight: 22, textAlign: 'center' },
  sessionGate: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.canvas, zIndex: 2 },
});
