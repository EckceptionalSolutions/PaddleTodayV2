import '../lib/web-saved-routes';
import { onAuthStateChanged } from 'firebase/auth';
import { getWebAuth, signOutWebAccount } from '../lib/web-account-session';

const menu = document.querySelector<HTMLElement>('[data-account-menu]');
if (menu) {
  const trigger = menu.querySelector<HTMLButtonElement>('[data-account-trigger]')!;
  const popover = menu.querySelector<HTMLElement>('#account-popover')!;
  const label = menu.querySelector<HTMLElement>('[data-account-label]')!;
  const avatar = menu.querySelector<HTMLElement>('[data-account-avatar]')!;
  const identity = menu.querySelector<HTMLElement>('[data-account-identity]')!;
  const login = menu.querySelector<HTMLAnchorElement>('[data-account-sign-in]')!;
  const logout = menu.querySelector<HTMLButtonElement>('[data-account-sign-out]')!;
  const status = menu.querySelector<HTMLElement>('[data-account-status]')!;
  if (location.pathname === '/trips/') {
    const source = new URLSearchParams(location.search), target = new URLSearchParams();
    for (const key of ['id', 'route', 'name', 'putin', 'takeout', 'date', 'launch', 'expected', 'timeZone']) { const value = source.get(key); if (value) target.set(key, value); }
    login.href = '/account/web/' + (target.size ? '?' + target.toString() : '');
  }
  if (location.pathname === '/favorites/') login.href = '/account/web/?next=saved';
  const guestIcon = avatar.innerHTML;
  function close(restoreFocus = false) {
    popover.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus();
  }
  trigger.addEventListener('click', () => {
    popover.hidden = !popover.hidden;
    trigger.setAttribute('aria-expanded', String(!popover.hidden));
  });
  document.addEventListener('click', event => { if (!menu.contains(event.target as Node)) close(); });
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
  });
  menu.addEventListener('focusout', event => {
    if (event.relatedTarget && !menu.contains(event.relatedTarget as Node)) close();
  });
  logout.addEventListener('click', async () => {
    // The editor owns its live changes and sign-out confirmation when mounted.
    const event = new CustomEvent('paddletoday:sign-out', { cancelable: true });
    if (!window.dispatchEvent(event)) { close(true); return; }
    logout.disabled = true;
    try { await signOutWebAccount(); close(true); }
    catch (error) { status.textContent = error instanceof Error ? error.message : 'Could not sign out. Please try again.'; status.hidden = false; }
    finally { logout.disabled = false; }
  });
  const auth = getWebAuth();
  if (auth) onAuthStateChanged(auth, user => {
    label.textContent = user ? 'Account' : 'Sign in';
    identity.textContent = user?.displayName || user?.email || 'Your Paddle Today';
    if (user) avatar.textContent = (user.displayName || user.email || 'P').slice(0, 1).toUpperCase();
    else avatar.innerHTML = guestIcon;
    login.hidden = Boolean(user);
    logout.hidden = !user;
    status.hidden = true;
  });
  else {
    label.textContent = 'Account';
    login.textContent = 'Sign-in availability';
  }
}
