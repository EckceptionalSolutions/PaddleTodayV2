/// <reference types="astro/client" />
import {
  EmailAuthProvider, GoogleAuthProvider, isSignInWithEmailLink, linkWithCredential, linkWithPopup,
  onAuthStateChanged, reauthenticateWithCredential, reauthenticateWithPopup, sendSignInLinkToEmail,
  signInWithEmailLink, signInWithPopup, signOut, type User,
} from 'firebase/auth';
import { createPaddleTodayApiClient, createTripsClient } from '@paddletoday/api-client';
import { firebaseWebAuth } from '../lib/firebase-web';
import { tripBrowserStorage } from '../lib/trip-browser-storage';

const root = document.getElementById('account-app')!;
const api = createPaddleTodayApiClient({ baseUrl: location.origin });
const getLocal = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
const setLocal = (key: string, value: string) => { try { localStorage.setItem(key, value); return true; } catch { return false; } };
const removeLocal = (key: string) => { try { localStorage.removeItem(key); } catch { /* Browser storage may be disabled. */ } };
const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const button = (action: string, label: string, primary = false) => `<button type="button" class="${primary ? 'primary' : ''}" data-action="${action}">${esc(label)}</button>`;
const emailField = (email = '') => `<label class="trip-wide">Email address<input name="email" type="email" autocomplete="email" placeholder="you@example.com" value="${esc(email)}"></label>`;
const providers = (user: User) => user.providerData.map(p => p.providerId === 'google.com' ? 'Google' : p.providerId === 'password' ? 'Email link' : p.providerId).join(', ') || 'No sign-in method found';
let auth: ReturnType<typeof firebaseWebAuth> | null = null;
let user: User | null = null, busy = false, notice = '', failed = false, pendingEmail = '', emailEntryShown = false, emailLinkExpired = false, deletionReady = false, deletionComplete = false;
try { auth = firebaseWebAuth(); }
catch { render('Website sign-in is not configured yet.'); }

function render(startupError?: string) {
  if (!root) return;
  if (startupError) notice = startupError;
  const emailCallback = Boolean(auth && isSignInWithEmailLink(auth, location.href));
  root.innerHTML = `<div class="trip-notice ${failed ? 'error' : ''}" role="status" ${notice ? '' : 'hidden'}>${esc(notice)}</div>
    ${deletionComplete ? '<section class="trip-card"><h1>Your account was deleted</h1><p>Your active account data has been removed.</p></section>' : user ? `<section class="trip-card"><p class="trip-eyebrow">Account</p><h1>${esc(user.displayName || user.email || 'Your account')}</h1><p>Connected sign-in methods: ${esc(providers(user))}</p><div class="trip-actions"><a class="trip-button" href="/trips/">Open My trips</a>${button('export', 'Export my trips')}${!user.providerData.some(p => p.providerId === GoogleAuthProvider.PROVIDER_ID) ? button('link-google', 'Connect Google') : ''}${button('sign-out', 'Sign out')}</div>
      ${!user.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID) ? `<h2>Connect email</h2><div class="trip-fields">${emailField(pendingEmail || user.email || '')}</div><div class="trip-actions">${emailCallback && !emailLinkExpired ? button('complete-email', 'Finish email link', true) : button('send-link', 'Send link to connect email', true)}</div>` : ''}
      <hr><h2>Delete account</h2><p>This removes your account, saved routes and notes backed up to it, trips you own, personal paddle logs, and photos. Copies stored only in this browser are not automatically removed. Trips owned by someone else remain with that organizer. This action cannot be undone.</p>${deletionReady ? '<p>Identity verified. Confirm deletion to continue.</p>' : ''}${button('delete', deletionReady ? 'Confirm delete account' : 'Continue to delete account')}</section>`
      : `<section class="trip-auth"><p class="trip-eyebrow">Welcome to PaddleToday</p><h1>Manage your account</h1><div class="trip-actions">${button('google', 'Continue with Google', true)}${!emailEntryShown ? button('show-email', 'Continue with email') : ''}</div>${emailEntryShown || pendingEmail || emailCallback ? `<div class="trip-fields">${emailField(pendingEmail)}</div><div class="trip-actions">${emailCallback && !emailLinkExpired ? button('complete-email', 'Finish email sign-in', true) : button('send-link', 'Send sign-in link', true)}</div>` : ''}</section>`}
    ${busy ? '<p role="status">Please wait…</p>' : ''}`;
  root.querySelectorAll<HTMLButtonElement>('button[data-action]').forEach(value => { value.disabled = busy; });
}

function authMessage(error: unknown) {
  const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
  if (code === 'auth/expired-action-code' || code === 'auth/invalid-action-code') return 'This email link expired or was already used. Request a fresh link.';
  if (code === 'auth/requires-recent-login') return 'Verify your identity again before deleting your account.';
  if (code === 'auth/unauthorized-domain') return 'This website is not authorized for PaddleToday sign-in. Contact support.';
  if (code === 'auth/popup-blocked') return 'Your browser blocked the Google sign-in window. Allow pop-ups and try again.';
  if (code === 'auth/popup-closed-by-user') return 'Google sign-in was closed before it finished.';
  if (code === 'auth/network-request-failed') return 'Check your internet connection and try again.';
  if (code === 'auth/too-many-requests') return 'Too many attempts were made. Wait a little, then request a fresh link.';
  if (code === 'auth/account-exists-with-different-credential' || code === 'auth/credential-already-in-use') return 'This email already uses another sign-in method. Sign in with it first, then connect providers in Account settings.';
  if (code === 'auth/operation-not-allowed') return 'This sign-in method is not enabled for PaddleToday yet.';
  return error instanceof Error ? error.message : 'Could not complete this action. Try again.';
}

async function sendEmailLink(mode: 'sign-in' | 'link' | 'delete', inputEmail = '') {
  if (!auth) throw new Error('Website sign-in is not configured yet.');
  const email = (inputEmail.trim() || pendingEmail || root.querySelector<HTMLInputElement>('[name="email"]')?.value || user?.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Enter a valid email address.');
  pendingEmail = email;
  const destination = `${location.origin}/account/?intent=${mode}`;
  await sendSignInLinkToEmail(auth, email, { url: destination, handleCodeInApp: true });
  emailLinkExpired = false;
  const persisted = setLocal('web-account-email', email) && setLocal('web-account-mode', mode) && (!user || setLocal('web-account-uid', user.uid));
  notice = persisted ? 'Check your email for the sign-in link. Open it in this browser to continue.' : 'The link was sent. If needed, enter this email again to finish.';
  failed = false;
}

async function finishEmailLink(inputEmail = '') {
  const webAuth = auth;
  if (!webAuth) throw new Error('Website sign-in is not configured yet.');
  if (!isSignInWithEmailLink(webAuth, location.href)) throw new Error('Open the sign-in link from your email first.');
  const email = pendingEmail || getLocal('web-account-email') || inputEmail.trim() || root.querySelector<HTMLInputElement>('[name="email"]')?.value.trim() || '';
  if (!email) throw new Error('Enter the email address that received this link.');
  const mode = new URL(location.href).searchParams.get('intent') || getLocal('web-account-mode') || 'sign-in';
  const expectedUid = getLocal('web-account-uid');
  await webAuth.authStateReady();
  if (mode === 'link') {
    if (!webAuth.currentUser || webAuth.currentUser.uid !== expectedUid) throw new Error('Sign in to the account you want to connect, then reopen this email link.');
    await linkWithCredential(webAuth.currentUser, EmailAuthProvider.credentialWithLink(email, location.href));
  } else if (mode === 'delete') {
    if (webAuth.currentUser && expectedUid && webAuth.currentUser.uid !== expectedUid) throw new Error('A different account is signed in. Sign in to the account you want to delete, then reopen this link.');
    if (webAuth.currentUser) {
      if (!webAuth.currentUser.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID)) throw new Error('Connect this email to your account before using it to verify deletion.');
      await reauthenticateWithCredential(webAuth.currentUser, EmailAuthProvider.credentialWithLink(email, location.href));
    } else {
      const result = await signInWithEmailLink(webAuth, email, location.href);
      if (expectedUid && result.user.uid !== expectedUid) { await signOut(webAuth); throw new Error('This link belongs to a different account. Sign in to the account you want to delete.'); }
    }
    deletionReady = true;
    notice = 'Email verified. Review the deletion details below and confirm when ready.';
  } else if (webAuth.currentUser && webAuth.currentUser.email?.toLowerCase() !== email.toLowerCase()) {
    throw new Error('A different account is signed in. Sign out before using this sign-in link.');
  } else if (webAuth.currentUser && !webAuth.currentUser.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID)) {
    await linkWithCredential(webAuth.currentUser, EmailAuthProvider.credentialWithLink(email, location.href));
  } else {
    await signInWithEmailLink(webAuth, email, location.href);
  }
  removeLocal('web-account-email'); removeLocal('web-account-mode'); removeLocal('web-account-uid'); pendingEmail = '';
  history.replaceState(null, '', deletionReady ? '/account/?delete=1' : '/account/');
}

async function deleteAccount() {
  const webAuth = auth;
  const currentUser = webAuth?.currentUser;
  if (!webAuth || !currentUser) throw new Error('Sign in again before deleting your account.');
  const uid = currentUser.uid;
  const token = await currentUser.getIdToken(true);
  let status: Awaited<ReturnType<typeof api.deleteAccount>>;
  try { status = await api.deleteAccount(token); }
  catch (deleteError) {
    const recovery = await api.getAccountDeletion(token).catch(() => { throw deleteError; });
    if (!recovery.deletionRequested) throw deleteError;
    status = { ...recovery, deleted: recovery.deletionComplete };
  }
  while (!status.deletionComplete) {
    notice = 'Removing your account data…'; failed = false; render();
    await new Promise(resolve => setTimeout(resolve, 1000));
    const freshToken = webAuth.currentUser ? await webAuth.currentUser.getIdToken(true) : token;
    status = await api.getAccountDeletion(freshToken).then(value => ({ ...value, deleted: value.deletionComplete }));
    if (!status.deletionRequested) throw new Error('Account deletion could not be resumed. Contact support before signing in again.');
  }
  let localCleanupFailed = false;
  try { await tripBrowserStorage.clearAccount(uid); } catch { localCleanupFailed = true; }
  deletionComplete = true; deletionReady = false;
  notice = localCleanupFailed
    ? 'Your account and cloud data were deleted, but this browser could not clear its cached trip files. Clear this site’s stored data in browser settings.'
    : 'Your account and PaddleToday trip data were deleted.';
  failed = localCleanupFailed;
  await signOut(webAuth);
}
async function exportTrips() {
  const currentUser = auth?.currentUser;
  if (!currentUser) throw new Error('Sign in again to export your trips.');
  const client = createTripsClient(location.origin, () => currentUser.getIdToken());
  const data = await client.export();
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  const download = document.createElement('a'); download.href = url; download.download = 'paddletoday-trips.json'; download.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

root.addEventListener('click', event => {
  const target = (event.target as Element).closest<HTMLButtonElement>('[data-action]');
  if (!target || busy) return;
  const action = target.dataset.action!;
  const submittedEmail = root.querySelector<HTMLInputElement>('[name="email"]')?.value || '';
  busy = true; notice = ''; failed = false; render();
  void (async () => {
    if (!auth) throw new Error('Website sign-in is not configured yet.');
    if (action === 'google') await signInWithPopup(auth, new GoogleAuthProvider());
    if (action === 'show-email') { emailEntryShown = true; pendingEmail = getLocal('web-account-email') || ''; }
    if (action === 'send-link') { pendingEmail = submittedEmail.trim(); await sendEmailLink(user ? 'link' : 'sign-in', submittedEmail); }
    if (action === 'complete-email') await finishEmailLink(submittedEmail);
    if (action === 'link-google' && user) await linkWithPopup(user, new GoogleAuthProvider());
    if (action === 'export') await exportTrips();
    if (action === 'sign-out') { await signOut(auth); }
    if (action === 'delete') {
      if (deletionReady) {
        if (confirm('Delete this PaddleToday account and its active trips, personal logs, and photos? This cannot be undone.')) await deleteAccount();
      } else if (user?.providerData.some(p => p.providerId === GoogleAuthProvider.PROVIDER_ID)) {
        await reauthenticateWithPopup(user, new GoogleAuthProvider());
        deletionReady = true; notice = 'Identity verified. Review the deletion details and confirm when ready.';
      } else if (user?.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID)) {
        await sendEmailLink('delete');
        notice = 'We sent an email link to verify your identity before deletion.';
      } else throw new Error('Connect Google or email to verify your identity before deleting this account.');
    }
  })().catch(error => {
    if (action === 'complete-email' && submittedEmail.trim()) pendingEmail = submittedEmail.trim();
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
    if (code === 'auth/expired-action-code' || code === 'auth/invalid-action-code') emailLinkExpired = true;
    notice = authMessage(error); failed = true;
  }).finally(() => { busy = false; render(); });
});

if (auth) {
  onAuthStateChanged(auth, value => { user = value; render(); });
  if (isSignInWithEmailLink(auth, location.href)) {
    pendingEmail = getLocal('web-account-email') || '';
    emailEntryShown = !pendingEmail;
    void finishEmailLink().catch(error => {
      pendingEmail = getLocal('web-account-email') || pendingEmail;
      const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
      if (code === 'auth/expired-action-code' || code === 'auth/invalid-action-code') emailLinkExpired = true;
      notice = authMessage(error); failed = true; render();
    });
  }
}
