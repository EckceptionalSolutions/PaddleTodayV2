import { AccessToken, AuthenticationToken, LoginManager } from 'react-native-fbsdk-next';
import { GoogleSignin, isCancelledResponse } from '@react-native-google-signin/google-signin';
import auth, {
  AppleAuthProvider,
  EmailAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithCredential,
  signInWithEmailLink,
  reauthenticateWithCredential,
  signOut,
} from '@react-native-firebase/auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';
import { WebReady } from '../components/web-ready';
import { AppButton } from '../components/app-button';
import { SectionCard } from '../components/section-card';
import { apiClient } from '../api/client';
import { accountOutboxKey, deactivateAccountLocalData, listAccountConflicts, pauseAccountBackup, resolveAccountConflict, resumeAccountBackup, syncAccountBackup, type AccountBackupSummary, type AccountConflict } from '../lib/account-backup';
import { notifySavedRoutesChanged } from '../lib/account-storage-events';
import { clearAccountLocalOwner, clearGuestImportConsent, grantGuestImportConsent, grantGuestKeepSeparateConsent } from '../lib/account-local-state';
import { colors, spacing } from '../theme/tokens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const PENDING_EMAIL = 'paddletoday:auth:pending-email';
const PENDING_EMAIL_ACTION = 'paddletoday:auth:pending-action';
const LINK_DOMAIN = process.env.EXPO_PUBLIC_FIREBASE_AUTH_LINK_DOMAIN?.trim();
const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID?.trim();
const GOOGLE_IOS_SIGN_IN_ENABLED = process.env.EXPO_PUBLIC_GOOGLE_IOS_SIGN_IN_ENABLED === '1';
const APPLE_SIGN_IN_ENABLED = process.env.EXPO_PUBLIC_APPLE_SIGN_IN_ENABLED === '1';
const FACEBOOK_APP_ID = process.env.EXPO_PUBLIC_FACEBOOK_APP_ID?.trim();
const FACEBOOK_CLIENT_TOKEN = process.env.EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN?.trim();
const GOOGLE_SIGN_IN_ENABLED = Boolean(GOOGLE_WEB_CLIENT_ID) && (Platform.OS !== 'ios' || GOOGLE_IOS_SIGN_IN_ENABLED);

export default function AccountScreen() {
  return <WebReady title="Loading account"><AccountContent /></WebReady>;
}

function AccountContent() {
  const [user, setUser] = useState<ReturnType<typeof auth>['currentUser']>(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [cooldownEmail, setCooldownEmail] = useState('');
  const [resendAvailableAt, setResendAvailableAt] = useState(0);
  const [clockNow, setClockNow] = useState(Date.now());
  const [emailLinkUrl, setEmailLinkUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [backup, setBackup] = useState<AccountBackupSummary | null>(null);
  const [conflicts, setConflicts] = useState<AccountConflict[]>([]);
  const [deletionPending, setDeletionPending] = useState(false);
  const emailLinkInProgress = useRef(false);
  const lastAuthUid = useRef<string | null>(null);
  const normalizedEmail = email.trim().toLowerCase();
  const sentLinkForCurrentEmail = emailSent && normalizedEmail === sentEmail;
  const resendSeconds = normalizedEmail === cooldownEmail ? Math.max(0, Math.ceil((resendAvailableAt - clockNow) / 1000)) : 0;

  useEffect(() => {
    if (!resendAvailableAt) return;
    const timer = setInterval(() => {
      const now = Date.now();
      setClockNow(now);
      if (now >= resendAvailableAt) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendAvailableAt]);

  useEffect(() => onAuthStateChanged(auth(), (value) => {
    const nextUid = value?.uid ?? null;
    if (lastAuthUid.current !== nextUid) {
      setBackup(null); setConflicts([]); setMessage(''); setEmail(''); setEmailSent(false); setSentEmail('');
      setCooldownEmail(''); setResendAvailableAt(0);
    }
    lastAuthUid.current = nextUid;
    setUser(value);
    if (value) {
      void consumeEmailLink();
      void inspectPendingDeletion(value).then((pending) => {
        if (!pending) { resumeAccountBackup(); void backupNow(); }
      });
    } else setDeletionPending(false);
  }), []);

  useEffect(() => {
    if (!user) { setConflicts([]); return; }
    void listAccountConflicts(user.uid).then(setConflicts).catch(() => {});
  }, [user, backup]);

  useEffect(() => {
    let active = true;
    const consume = (url: string | null) => { if (url) void consumeEmailLink(url, () => active); };
    void Linking.getInitialURL().then(consume);
    const subscription = Linking.addEventListener('url', ({ url }) => consume(url));
    return () => { active = false; subscription.remove(); };
  }, []);

  async function consumeEmailLink(explicitUrl?: string, isCurrent = () => true) {
    const url = explicitUrl ?? await Linking.getInitialURL();
    if (!url || !isSignInWithEmailLink(auth(), url)) return;
    const pendingEmail = await SecureStore.getItemAsync(PENDING_EMAIL);
    if (!pendingEmail) {
      if (auth().currentUser) {
        setMessage('Open this link on the device where you requested it to protect the account already signed in here.');
      } else {
        setEmailLinkUrl(url);
        setMessage('Enter the same email address used to request this link to finish signing in.');
      }
      return;
    }
    if (emailLinkInProgress.current) return;
    emailLinkInProgress.current = true;
    setBusy(true);
    try {
      const action = await SecureStore.getItemAsync(PENDING_EMAIL_ACTION);
      const currentUser = auth().currentUser;
      const wasReauthentication = action === 'reauthenticate' && Boolean(currentUser);
      if (action === 'reauthenticate' && currentUser) {
        const credential = EmailAuthProvider.credentialWithLink(pendingEmail, url);
        await currentUser.reauthenticateWithCredential(credential);
      } else if (action === 'link' && currentUser) {
        const credential = EmailAuthProvider.credentialWithLink(pendingEmail, url);
        await currentUser.linkWithCredential(credential);
      } else if (currentUser) {
        setMessage('Another account is signed in on this phone. Sign out before using this link, or connect this email from the signed-in account.');
        return;
      } else {
        await signInWithEmailLink(auth(), pendingEmail, url);
      }
      await SecureStore.deleteItemAsync(PENDING_EMAIL);
      await SecureStore.deleteItemAsync(PENDING_EMAIL_ACTION);
      setEmailSent(false);
      setSentEmail('');
      setResendAvailableAt(0);
      if (isCurrent()) setMessage(wasReauthentication
        ? 'Email verified. You can now retry account deletion.'
        : 'Email verified. Your account is ready.');
    } catch {
      await clearGuestImportConsent().catch(() => {});
      if (isCurrent()) setMessage('That link could not be used. Request a fresh sign-in link and try again.');
    } finally { emailLinkInProgress.current = false; if (isCurrent()) setBusy(false); }
  }

  async function finishCrossDeviceEmailLink() {
    const normalized = email.trim().toLowerCase();
    if (!emailLinkUrl || !isSignInWithEmailLink(auth(), emailLinkUrl)) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) { setMessage('Enter the email address used to request this link.'); return; }
    try { if (await hasGuestBackupData() && !await confirmGuestDataChoice()) return; }
    catch { setMessage('This phone’s saved data could not be checked. Sign-in was paused to protect it.'); return; }
    setBusy(true);
    try {
      await signInWithEmailLink(auth(), normalized, emailLinkUrl);
      setEmailLinkUrl(null);
      setEmailSent(false);
      setSentEmail('');
      setMessage('Email verified. Your account is ready.');
    } catch {
      setMessage('That link could not be used with this email. Request a fresh sign-in link and try again.');
    } finally { if (!auth().currentUser) await clearGuestImportConsent().catch(() => {}); setBusy(false); }
  }

  async function runLogin(action: () => Promise<unknown>) {
    if (Platform.OS === 'web' || busy) return;
    if (!auth().currentUser) {
      try { if (await hasGuestBackupData() && !await confirmGuestDataChoice()) return; }
      catch { setMessage('This phone’s saved data could not be checked. Sign-in was paused to protect it.'); return; }
    }
    setBusy(true); setMessage('');
    try { await action(); }
    catch (error) {
      const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
      if (!code.toLowerCase().includes('cancel')) setMessage('Sign-in could not be completed. Check your connection and try again.');
    } finally { if (!auth().currentUser) await clearGuestImportConsent().catch(() => {}); setBusy(false); }
  }

  async function signInGoogle() {
    const webClientId = GOOGLE_WEB_CLIENT_ID;
    if (!webClientId) throw new Error('Google sign-in has not been configured.');
    GoogleSignin.configure({ webClientId });
    await GoogleSignin.hasPlayServices();
    const result = await GoogleSignin.signIn();
    if (isCancelledResponse(result)) return;
    const tokens = await GoogleSignin.getTokens();
    if (!tokens.idToken) throw new Error('Google did not return an ID token.');
    const credential = GoogleAuthProvider.credential(tokens.idToken);
    const current = auth().currentUser;
    if (current) await current.linkWithCredential(credential);
    else await signInWithCredential(auth(), credential);
  }

  async function signInFacebook() {
    if (!FACEBOOK_APP_ID || !FACEBOOK_CLIENT_TOKEN) throw new Error('Facebook sign-in has not been configured.');
    if (Platform.OS === 'ios') {
      const nonce = Crypto.randomUUID();
      const hashedNonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce);
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email'], 'limited', hashedNonce);
      if (result.isCancelled) return;
      const token = await AuthenticationToken.getAuthenticationTokenIOS();
      if (!token?.authenticationToken) throw new Error('Facebook did not return an authentication token.');
      const credential = FacebookAuthProvider.credential(token.authenticationToken, nonce);
      const current = auth().currentUser;
      if (current) await current.linkWithCredential(credential);
      else await signInWithCredential(auth(), credential);
      return;
    }
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) return;
    const token = await AccessToken.getCurrentAccessToken();
    if (!token?.accessToken) throw new Error('Facebook did not return an access token.');
    const credential = FacebookAuthProvider.credential(token.accessToken);
    const current = auth().currentUser;
    if (current) await current.linkWithCredential(credential);
    else await signInWithCredential(auth(), credential);
  }

  async function signInApple() {
    if (Platform.OS !== 'ios') throw new Error('Sign in with Apple is available on iPhone and iPad.');
    const nonce = Crypto.randomUUID();
    const hashedNonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce);
    const result = await AppleAuthentication.signInAsync({
      requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL, AppleAuthentication.AppleAuthenticationScope.FULL_NAME],
      nonce: hashedNonce,
    });
    if (!result.identityToken) throw new Error('Apple did not return an identity token.');
    const credential = AppleAuthProvider.credential(result.identityToken, nonce);
    const current = auth().currentUser;
    if (current) await current.linkWithCredential(credential);
    else await signInWithCredential(auth(), credential);
  }

  async function sendEmailLink() {
    const normalized = email.trim().toLowerCase();
    const remainingForAddress = normalized === cooldownEmail ? Math.max(0, Math.ceil((resendAvailableAt - Date.now()) / 1000)) : 0;
    if (remainingForAddress > 0) { setMessage(`Please wait ${remainingForAddress} seconds before requesting another email link to this address.`); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) { setMessage('Enter a valid email address.'); return; }
    if (!LINK_DOMAIN) { setMessage('Email sign-in has not been configured on this build.'); return; }
    if (!auth().currentUser) {
      try { if (await hasGuestBackupData() && !await confirmGuestDataChoice()) return; }
      catch { setMessage('This phone’s saved data could not be checked. Email sign-in was paused to protect it.'); return; }
    }
    setBusy(true); setMessage('');
    const cooldownEndsAt = Date.now() + 30_000;
    setClockNow(Date.now());
    setCooldownEmail(normalized);
    setResendAvailableAt(cooldownEndsAt);
    try {
      await SecureStore.setItemAsync(PENDING_EMAIL, normalized);
      await SecureStore.setItemAsync(PENDING_EMAIL_ACTION, auth().currentUser ? 'link' : 'sign-in');
      await sendSignInLinkToEmail(auth(), normalized, {
        url: 'https://paddletoday.com/auth/callback',
        handleCodeInApp: true,
        linkDomain: LINK_DOMAIN,
        iOS: { bundleId: 'com.paddletoday.mobile' },
        android: { packageName: 'com.paddletoday.mobile', installApp: false, minimumVersion: '1' },
      });
      setEmailSent(true);
      setSentEmail(normalized);
      setMessage('If that address can sign in, a link is on its way. Open it on this device to finish.');
    } catch {
      if (!auth().currentUser) await clearGuestImportConsent().catch(() => {});
      setMessage('Could not send a link right now. Check the address and try again shortly.');
    } finally { setBusy(false); }
  }

  async function backupNow() {
    if (!auth().currentUser || busy || deletionPending) return;
    setBusy(true); setMessage('');
    try {
      const token = await auth().currentUser!.getIdToken();
      await apiClient.registerAccount(token);
      const summary = await syncWithGuestConsent(token, auth().currentUser!.uid);
      setBackup(summary);
      setConflicts(await listAccountConflicts(auth().currentUser!.uid));
      setMessage(summary.pending ? 'Your backup is continuing in the background.' : 'Your routes and trip plans are backed up.');
    } catch (error) {
      setMessage(error instanceof Error && error.message === 'guest_import_cancelled'
        ? 'Your saved data remains on this phone. No backup was made.'
        : 'Backup could not finish. Your copies on this device were kept.');
    } finally { setBusy(false); }
  }

  async function resolve(conflict: AccountConflict, choice: 'local' | 'cloud') {
    const current = auth().currentUser;
    if (!current || busy) return;
    setBusy(true);
    try {
      await resolveAccountConflict(current.uid, conflict, choice);
      const token = await current.getIdToken();
      setBackup(await syncWithGuestConsent(token, current.uid));
      setConflicts(await listAccountConflicts(current.uid));
    } catch { setMessage('The conflict could not be resolved. Both copies were kept on this device.'); }
    finally { setBusy(false); }
  }

  async function deleteAccount() {
    if (!auth().currentUser || busy) return;
    if (deletionPending) { void confirmDelete(); return; }
    Alert.alert('Delete Paddle Today account?', 'Your account and synced routes, notes, and trip plans will be deleted. Offline trip downloads on this phone will also be removed. This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete account', style: 'destructive', onPress: () => { void confirmDelete(); } },
    ]);
  }

  async function confirmDelete() {
    const activeUser = auth().currentUser;
    if (!activeUser) return;
    setBusy(true);
    let deletionToken: string | null = null;
    try {
      await reauthenticateIfNeeded(activeUser);
      await pauseAccountBackup();
      const providers = activeUser.providerData.map((item) => item.providerId);
      if (providers.includes('apple.com') && Platform.OS === 'ios') {
        const nonce = Crypto.randomUUID();
        const hashedNonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce);
        const appleUserId = activeUser.providerData.find((item) => item.providerId === 'apple.com')?.uid;
        const result = await AppleAuthentication.signInAsync({ requestedScopes: [], nonce: hashedNonce });
        if (!result.user || result.user !== appleUserId) throw new Error('Sign in with the same Apple account before deleting this account.');
        if (result.authorizationCode) await auth().revokeToken(result.authorizationCode);
      }
      const token = await activeUser.getIdToken(true);
      deletionToken = token;
      try { await apiClient.deleteAccount(token); }
      catch (deleteError) {
        const status = await apiClient.getAccountDeletion(token);
        if (!status.deletionRequested) throw deleteError;
        // Retry idempotently so a lost response after tombstoning cannot leave
        // the Firebase identity active while this device clears its local data.
        if (!status.deletionComplete) await apiClient.deleteAccount(token);
      }
      await deactivateAccountLocalData();
      await clearAccountLocalData(activeUser.uid);
      if (providers.includes('facebook.com')) LoginManager.logOut();
      await signOut(auth());
      setDeletionPending(false);
      setMessage('Your account was deleted.');
    } catch (error) {
      let requestPending = false;
      if (deletionToken) {
        try {
          const status = await apiClient.getAccountDeletion(deletionToken);
          setDeletionPending(status.deletionRequested && !status.deletionComplete);
          requestPending = status.deletionRequested && !status.deletionComplete;
          if (status.deletionComplete) {
            await deactivateAccountLocalData();
            await clearAccountLocalData(activeUser.uid);
            await signOut(auth());
            setMessage('Your account was deleted.');
            return;
          }
        } catch { /* The server keeps the deletion request for the next retry. */ }
      }
      if (!requestPending) resumeAccountBackup();
      if ((error && typeof error === 'object' && 'code' in error && String(error.code) === 'recent_authentication_required')
        || (error instanceof Error && error.message === 'recent_authentication_required')) {
        setMessage('A recent sign-in is required. Sign in again, then retry account deletion.');
      } else if (error instanceof Error && error.message === 'email_reauthentication_link_sent') {
        setMessage('A sign-in link was sent to your account email. Open it, then retry account deletion.');
      } else setMessage('Account deletion could not be completed. Please try again.');
    } finally { setBusy(false); }
  }

  async function reauthenticateIfNeeded(activeUser: NonNullable<ReturnType<typeof auth>['currentUser']>) {
    const result = await activeUser.getIdTokenResult(true);
    const authTime = Date.parse(result.authTime);
    if (Number.isFinite(authTime) && Date.now() - authTime < 5 * 60_000) return;
    const providerIds = activeUser.providerData.map((item) => item.providerId);
    if (providerIds.includes('google.com')) {
      const webClientId = GOOGLE_WEB_CLIENT_ID;
      if (!webClientId) throw new Error('recent_authentication_required');
      GoogleSignin.configure({ webClientId });
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      if (isCancelledResponse(result)) throw new Error('recent_authentication_required');
      const token = await GoogleSignin.getTokens();
      if (!token.idToken) throw new Error('recent_authentication_required');
      await reauthenticateWithCredential(activeUser, GoogleAuthProvider.credential(token.idToken));
      return;
    }
    if (providerIds.includes('apple.com')) {
      const nonce = Crypto.randomUUID();
      const hashedNonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce);
      const result = await AppleAuthentication.signInAsync({ requestedScopes: [], nonce: hashedNonce });
      if (!result.identityToken) throw new Error('recent_authentication_required');
      await reauthenticateWithCredential(activeUser, AppleAuthProvider.credential(result.identityToken, nonce));
      return;
    }
    if (providerIds.includes('facebook.com')) {
      if (Platform.OS === 'ios') {
        const nonce = Crypto.randomUUID();
        const hashedNonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce);
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email'], 'limited', hashedNonce);
        if (result.isCancelled) throw new Error('recent_authentication_required');
        const limitedToken = await AuthenticationToken.getAuthenticationTokenIOS();
        if (!limitedToken?.authenticationToken) throw new Error('recent_authentication_required');
        await reauthenticateWithCredential(activeUser, FacebookAuthProvider.credential(limitedToken.authenticationToken, nonce));
        return;
      }
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) throw new Error('recent_authentication_required');
      const token = await AccessToken.getCurrentAccessToken();
      if (!token?.accessToken) throw new Error('recent_authentication_required');
      await reauthenticateWithCredential(activeUser, FacebookAuthProvider.credential(token.accessToken));
      return;
    }
    if (providerIds.includes('password')) {
      const pendingEmail = activeUser.email;
      if (!pendingEmail || !LINK_DOMAIN) throw new Error('recent_authentication_required');
      await SecureStore.setItemAsync(PENDING_EMAIL, pendingEmail);
      await SecureStore.setItemAsync(PENDING_EMAIL_ACTION, 'reauthenticate');
      await sendSignInLinkToEmail(auth(), pendingEmail, {
        url: 'https://paddletoday.com/auth/callback', handleCodeInApp: true, linkDomain: LINK_DOMAIN,
        iOS: { bundleId: 'com.paddletoday.mobile' },
        android: { packageName: 'com.paddletoday.mobile', installApp: false, minimumVersion: '1' },
      });
      throw new Error('email_reauthentication_link_sent');
    }
    throw new Error('recent_authentication_required');
  }

  async function inspectPendingDeletion(activeUser: NonNullable<ReturnType<typeof auth>['currentUser']>) {
    try {
      const token = await activeUser.getIdToken();
      const status = await apiClient.getAccountDeletion(token);
      const pending = status.deletionRequested && !status.deletionComplete;
      setDeletionPending(pending);
      if (status.deletionComplete) {
        await pauseAccountBackup();
        await deactivateAccountLocalData();
        await clearAccountLocalData(activeUser.uid);
        await signOut(auth());
        setMessage('Your account was deleted.');
        return true;
      }
      if (pending) setMessage('Account deletion is still in progress. Continue deletion to finish it.');
      return pending;
    } catch { setDeletionPending(false); return false; }
  }

  async function signOutAndClear() {
    const activeUser = auth().currentUser;
    if (!activeUser) return;
    setBusy(true);
    try {
      const token = await activeUser.getIdToken();
      await apiClient.registerAccount(token);
      const summary = await syncWithGuestConsent(token, activeUser.uid);
      if (summary.pending) throw new Error('account_sync_pending');
      if (summary.conflicts) throw new Error('account_conflicts_need_review');
      await pauseAccountBackup();
      await clearAccountLocalData(activeUser.uid);
      await signOut(auth());
      setBackup(null); setMessage('Signed out. Your cloud backup is still available next time you sign in.');
    } catch (error) {
      resumeAccountBackup();
      setMessage(error instanceof Error && error.message === 'guest_import_cancelled'
        ? 'Your saved data remains on this phone. Stay signed in to keep using this account.'
        : error instanceof Error && error.message === 'account_conflicts_need_review'
        ? 'Review the conflicting changes before signing out.' : error instanceof Error && error.message === 'account_sync_pending'
          ? 'Some changes are still waiting to sync. Stay signed in and try again.'
          : 'Your changes could not be backed up. Stay signed in and try again.');
    }
    finally { setBusy(false); }
  }

  function confirmSignOut() {
    Alert.alert('Sign out on this phone?', 'Saved routes and trip plans will be backed up and removed from this phone. Downloaded offline trip packets are not backed up; they will be removed and need to be downloaded again.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Back up and sign out', style: 'destructive', onPress: () => { void signOutAndClear(); } },
    ]);
  }

  async function syncWithGuestConsent(token: string, uid: string) {
    try { return await syncAccountBackup(token, uid); }
    catch (error) {
      if (!(error instanceof Error) || error.message !== 'guest_import_consent_required') throw error;
      if (!await confirmGuestDataChoice()) throw new Error('guest_import_cancelled');
      return syncAccountBackup(token, uid);
    }
  }

  return <ScrollView contentContainerStyle={styles.page}>
    <SectionCard title="Account & backup" subtitle="Keep saved rivers, personal notes, and trip plans when you move to another phone.">
      {user ? <>
        <Text style={styles.body}>Signed in{user.email ? ' as ' + user.email : ''}.</Text>
        <Text style={styles.body}>Connect another sign-in method so you can recover your account if you lose access to one.</Text>
        {APPLE_SIGN_IN_ENABLED && Platform.OS === 'ios' && !user.providerData.some((item) => item.providerId === 'apple.com') ? <AppButton label="Connect Apple" variant="secondary" disabled={busy} onPress={() => void runLogin(signInApple)} /> : null}
        {GOOGLE_SIGN_IN_ENABLED && !user.providerData.some((item) => item.providerId === 'google.com') ? <AppButton label="Connect Google" variant="secondary" disabled={busy} onPress={() => void runLogin(signInGoogle)} /> : null}
        {FACEBOOK_APP_ID && FACEBOOK_CLIENT_TOKEN && !user.providerData.some((item) => item.providerId === 'facebook.com') ? <AppButton label="Connect Facebook" variant="secondary" disabled={busy} onPress={() => void runLogin(signInFacebook)} /> : null}
        <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address"
          placeholder="Email address" accessibilityLabel="Email address" style={styles.input} editable={!busy} />
        <AppButton label={resendSeconds > 0 ? `${emailSent && normalizedEmail === sentEmail ? 'Send another link' : 'Try again'} in ${resendSeconds}s` : 'Connect email with a sign-in link'} variant="secondary" busy={busy} disabled={busy || resendSeconds > 0} onPress={() => void sendEmailLink()} />
        <AppButton label="Sync now" busyLabel="Syncing…" busy={busy} onPress={() => void backupNow()} />
        {backup ? <Text style={styles.body}>{backup.routes} routes and {backup.drafts} trip plans backed up. {backup.pending ? 'Changes are waiting to sync. ' : backup.updatedAt ? `Last synced ${new Date(backup.updatedAt).toLocaleString()}. ` : ''}{backup.conflicts ? backup.conflicts + ' changes need review.' : ''}</Text> : null}
        {conflicts.map((conflict) => <View key={conflict.key} style={styles.conflict}>
          <Text style={styles.body}>This phone and your backup both changed the same {conflict.kind.startsWith('route') ? 'saved route' : 'trip plan'}. Choose which copy to keep.</Text>
          <Text style={styles.conflictLabel}>This phone</Text>
          <Text selectable style={styles.conflictValue}>{describeConflictValue(conflict.local, conflict.kind.startsWith('route'))}</Text>
          <Text style={styles.conflictLabel}>Account backup</Text>
          <Text selectable style={styles.conflictValue}>{describeConflictValue(conflict.cloud, conflict.kind.startsWith('route'))}</Text>
          <View style={styles.actions}>
            <AppButton label="Keep backed up copy" variant="secondary" disabled={busy} onPress={() => void resolve(conflict, 'cloud')} />
            <AppButton label="Keep this phone's copy" disabled={busy} onPress={() => void resolve(conflict, 'local')} />
          </View>
        </View>)}
        <AppButton label="Sign out" variant="secondary" disabled={busy} onPress={confirmSignOut} />
        <AppButton label={deletionPending ? 'Finish account deletion' : 'Delete account'} variant="secondary" disabled={busy} onPress={() => void deleteAccount()} />
      </> : <>
        <Text style={styles.body}>You can sign in with {GOOGLE_SIGN_IN_ENABLED ? 'Google or an email link' : 'an email link'}. River browsing stays available without an account.</Text>
        {APPLE_SIGN_IN_ENABLED && Platform.OS === 'ios' ? <AppButton label="Continue with Apple" busy={busy} onPress={() => void runLogin(signInApple)} /> : null}
        {GOOGLE_SIGN_IN_ENABLED ? <AppButton label="Continue with Google" busy={busy} onPress={() => void runLogin(signInGoogle)} /> : null}
        {FACEBOOK_APP_ID && FACEBOOK_CLIENT_TOKEN ? <AppButton label="Continue with Facebook" variant="secondary" busy={busy} onPress={() => void runLogin(signInFacebook)} /> : null}
        <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address"
          placeholder="Email address" accessibilityLabel="Email address" style={styles.input} editable={!busy} />
        <AppButton label={resendSeconds > 0 ? `${sentLinkForCurrentEmail ? 'Send another link' : 'Try again'} in ${resendSeconds}s` : sentLinkForCurrentEmail ? 'Send another link' : 'Continue with email'} variant="secondary" busy={busy} disabled={busy || resendSeconds > 0} onPress={() => void sendEmailLink()} />
        {sentLinkForCurrentEmail && !emailLinkUrl ? <AppButton label="Use a different email" variant="secondary" disabled={busy} onPress={() => { setEmail(''); setEmailSent(false); setSentEmail(''); setMessage('Enter a different address. A new link will be sent to that address.'); }} /> : null}
        {emailLinkUrl ? <AppButton label="Finish signing in with email" busy={busy} onPress={() => void finishCrossDeviceEmailLink()} /> : null}
      </>}
      {busy ? <ActivityIndicator color={colors.accent} /> : null}
      {message ? <Text accessibilityLiveRegion="polite" style={styles.message}>{message}</Text> : null}
      {!user ? <Text style={styles.privacy}>Your account backs up only saved routes, personal notes, and trip plans.</Text> : null}
    </SectionCard>
  </ScrollView>;
}

const styles = StyleSheet.create({
  page: { padding: spacing.md, gap: spacing.md, paddingBottom: 48 },
  body: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
  privacy: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  message: { color: colors.text, fontSize: 14, lineHeight: 20 },
  conflict: { gap: spacing.xs, padding: spacing.sm, backgroundColor: colors.canvasMuted, borderRadius: 12 },
  conflictLabel: { color: colors.text, fontSize: 13, fontWeight: '700' },
  conflictValue: { color: colors.textMuted, fontSize: 13, lineHeight: 19, paddingBottom: spacing.xs },
  actions: { gap: spacing.xs },
  input: { minHeight: 48, borderColor: colors.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, color: colors.text, backgroundColor: colors.surfaceStrong },
});

function describeConflictValue(value: AccountConflict['local'], isRoute: boolean) {
  if (!value) return 'Deleted in this copy';
  if (isRoute && 'slug' in value) {
    return [value.name, value.reach, value.notes ? `Notes: ${value.notes}` : 'No personal notes'].join('\n');
  }
  if (!isRoute && 'draft' in value) {
    const { target, draft } = value;
    return [
      target.routeName ?? target.routeSlug,
      `Put-in: ${target.putInName ?? target.putInId ?? 'Not selected'}`,
      `Take-out: ${target.takeOutName ?? target.takeOutId ?? 'Not selected'}`,
      `Launch: ${draft.launch || 'Not set'} · Expected: ${draft.expected || 'Not set'}`,
      `Check-in: ${draft.checkIn || 'Not set'} · Group: ${draft.groupSize || 'Not set'}`,
      `Boat: ${draft.boat || 'Not set'} · Vehicle: ${draft.vehicle || 'Not set'}`,
      draft.note ? `Notes: ${draft.note}` : 'No personal notes',
    ].join('\n');
  }
  return 'This copy could not be displayed.';
}

async function clearAccountLocalData(uid: string) {
  const ownsSharedData = await clearAccountLocalOwner(uid);
  const keys = await AsyncStorage.getAllKeys();
  const privateKeys = keys.filter((key) => (ownsSharedData && (key === 'paddletoday:saved-rivers'
    || key.startsWith('paddletoday:trip-draft:v1:')
    || key.startsWith('paddletoday:offline-trip:v1:')
    || key.startsWith('paddletoday:offline-trip-data:v1:')))
    || key.startsWith('paddletoday:account-conflict:' + uid + ':')
    || key === 'paddletoday:account-baseline:' + uid
    || key === 'paddletoday:account-pending:' + uid
    || key === accountOutboxKey(uid));
  if (privateKeys.length) await AsyncStorage.multiRemove(privateKeys);
  notifySavedRoutesChanged();
  await SecureStore.deleteItemAsync(PENDING_EMAIL).catch(() => {});
  await SecureStore.deleteItemAsync(PENDING_EMAIL_ACTION).catch(() => {});
}

async function hasGuestBackupData() {
  const [rawRoutes, keys] = await Promise.all([
    AsyncStorage.getItem('paddletoday:saved-rivers'),
    AsyncStorage.getAllKeys(),
  ]);
  let hasRoutes = false;
  try { const value: unknown = JSON.parse(rawRoutes ?? '[]'); hasRoutes = Array.isArray(value) && value.length > 0; }
  catch { hasRoutes = Boolean(rawRoutes); }
  return hasRoutes || keys.some((key) => key.startsWith('paddletoday:trip-draft:v1:')
    || key.startsWith('paddletoday:offline-trip:v1:') || key.startsWith('paddletoday:offline-trip-data:v1:'));
}

function confirmGuestDataChoice() {
  return new Promise<boolean>((resolve) => {
    let settled = false;
    Alert.alert(
      'Use this phone’s saved data?',
      'Choose whether to add this phone’s saved routes, personal notes, and trip plans to your account. Keeping them separate leaves them on this phone and out of the account backup.',
      [
        { text: 'Cancel sign-in', style: 'cancel', onPress: () => { if (!settled) { settled = true; resolve(false); } } },
        { text: 'Keep separate', onPress: () => {
          if (settled) return;
          settled = true;
          void grantGuestKeepSeparateConsent().then(() => resolve(true), () => resolve(false));
        } },
        { text: 'Add to account', onPress: () => {
          if (settled) return;
          settled = true;
          void grantGuestImportConsent().then(() => resolve(true), () => resolve(false));
        } },
      ],
      { cancelable: true, onDismiss: () => { if (!settled) { settled = true; resolve(false); } } },
    );
  });
}
