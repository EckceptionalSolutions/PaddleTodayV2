/// <reference types="astro/client" />
import { getWebAuth } from '../lib/web-account-session';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, EmailAuthProvider, signInWithPopup, linkWithPopup, linkWithCredential, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signOut, type User } from 'firebase/auth';
import { createTripsClient, createPaddleTodayApiClient, TripRepository, nextDatedTrip, tripLocalToday, type PendingTripWork } from '@paddletoday/api-client';
import { tripNotes, withTripNotes, newTripPlan, isTripPlan, tripPlan, tripTimeIssue, historicalWaterSuggestion, type Trip, type TripPlan, type PaddleLog, type PaddleLogInput, type TripCommand, type RiverAccessPoint, type RiverCatalogItem, type ShuttleVehicle, type TripRoute } from '@paddletoday/api-contract';
import { planReviewFields, logReviewFields, reviewLabels, reviewText, mergeReviewed } from '../lib/trip-recovery';
import { logsForTrip, pastOutings } from '../lib/trip-history';
import { tripBrowserStorage as storage } from '../lib/trip-browser-storage';
import { planFromRouteLink, hydrateTripRoute, routeAccessPoints, tripRouteUrl } from '../lib/trip-planning';
import type { RiverDetailApiResult } from '@paddletoday/api-contract';
import { webFeatureFlags } from '../lib/web-feature-flags';

import { toDataURL } from 'qrcode';

const root = document.getElementById('trips-app')!;
const settingsPage = root.dataset.page === 'settings';
const authPage = location.pathname === '/account/web/';
let loading = true, loadFailed = false;
let guestPlan: TripPlan | null = null;
let guestSignIn = false;
let recoveryLatest: Trip | PaddleLog | null = null;
let recoveryLoadError = '';
let pausedEditor: string | null = null;
let invitation: { title: string; date: string } | null = null, invitationError = '';
async function loadInvitation() {
  invitationError = '';
  try { invitation = (await api.invitation(selected, invite)).invitation; if (!invitation?.title) throw new Error(); }
  catch { invitation = null; invitationError = 'This invitation could not be opened. It may have expired or been revoked. Ask the organizer for a fresh link, or retry.'; }
  render();
}
function invitationMarkup() {
  return `<section class="trip-card"><p class="trip-eyebrow">Invitation</p><h2>${esc(invitation?.title || 'You’re invited to paddle')}</h2>${invitation ? `<p>${esc(readableDate(invitation.date))}</p><p>Join to see the plan, respond, and arrange a ride. Members can edit the shared itinerary. Your paddle notes and photos stay private.</p>${user && clientState()?.trips[selected] ? '<p>You already have access to this trip.</p>' : user ? button('join', 'Join trip', '', true) : '<p>Sign in below to join.</p>'}` : invitationError ? `<p>${esc(invitationError)}</p>${button('retry-invitation', 'Retry invitation')}` : '<p role="status">Checking invitation…</p>'}</section>`;
}
const configuredAuth = getWebAuth();
const uuid = () => crypto.randomUUID();
const getLocal = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
const setLocal = (key: string, value: string) => { try { localStorage.setItem(key, value); return true; } catch { return false; } };
const removeLocal = (key: string) => { try { localStorage.removeItem(key); } catch { /* Storage can be unavailable in private browsing. */ } };
const getSession = (key: string) => { try { return sessionStorage.getItem(key); } catch { return null; } };
const setSession = (key: string, value: string) => { try { sessionStorage.setItem(key, value); } catch { /* Firebase also limits repeated email-link requests. */ } };
const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const button = (action: string, label: string, id = '', primary = false) => `<button type="button" data-action="${action}" data-id="${esc(id)}" class="${primary ? 'primary' : ''}">${esc(label)}</button>`;
const tripTab = (name: 'upcoming' | 'past', label: string, count: number) => `<button type="button" role="tab" id="trip-tab-${name}" aria-controls="trip-list-panel" aria-selected="${tab === name}" tabindex="${tab === name ? 0 : -1}" data-action="${name}"><span>${label}</span><span class="trip-tab-count" aria-label="${count} ${label.toLowerCase()}">${count}</span></button>`;
const field = (name: string, label: string, value: string, type = 'text', wide = false, required = false) => `<label class="${wide ? 'trip-wide' : ''}">${esc(label)}<input name="${name}" type="${type}" value="${esc(value)}" ${required ? 'required aria-required="true"' : ''} ${name === 'email' ? 'autocomplete="email" placeholder="you@example.com"' : ''}></label>`;
const area = (name: string, label: string, value: string) => `<div class="trip-wide"><label for="trip-field-${name}">${esc(label)}</label><textarea id="trip-field-${name}" name="${name}">${esc(value)}</textarea></div>`;
const commonTimeZones: [string, string][] = [
  ['America/New_York', 'Eastern Time'], ['America/Chicago', 'Central Time'], ['America/Denver', 'Mountain Time'],
  ['America/Phoenix', 'Arizona (no daylight saving time)'], ['America/Los_Angeles', 'Pacific Time'],
  ['America/Anchorage', 'Alaska Time'], ['America/Adak', 'Aleutian Time'], ['Pacific/Honolulu', 'Hawaii Time'], ['UTC', 'UTC'],
];
function timeZoneField(value: string) {
  const zones = commonTimeZones.some(([zone]) => zone === value) ? commonTimeZones : [[value, `${value} (current trip)`] as [string, string], ...commonTimeZones];
  return `<label>Trip time zone<select name="timeZone">${zones.map(([zone, label]) => `<option value="${esc(zone)}" ${zone === value ? 'selected' : ''}>${esc(label)}</option>`).join('')}</select><span class="trip-muted">Trip times use the time zone at the river.</span></label>`;
}

const params = new URLSearchParams(location.search), fragment = new URLSearchParams(location.hash.slice(1));
let selected = params.get('id') || '', invite = fragment.get('invite') || '', view = fragment.get('view') || '';
if (invite) setLocal('trip-pending-invite', JSON.stringify({ id: selected, token: invite }));
if (!invite && selected && location.pathname === '/account/web/') {
  try { const pending = JSON.parse(getLocal('trip-pending-invite') || 'null'); if (pending?.id === selected) invite = pending.token; } catch { /* An original invite can be reopened. */ }
}
let user: User | null = null, repo: TripRepository | null = null, unsubscribe: (() => void) | null = null;
let authStateInitialized = false;
let tab: 'upcoming' | 'past' = 'upcoming', notice = '', error = false, busy = false, emailShown = false, linkEmail = false, emailCallbackDetected = false, pendingEmail = '';
let editing: TripPlan | null = null, editingId = '', logEdit: PaddleLogInput | null = null, logId = '';
let editingBaseline: TripPlan | undefined;
let logRevision = 0;
let vehicleEdit: { vehicle: ShuttleVehicle; revision: number } | null = null;
let access: RiverAccessPoint[] = [], catalog: RiverCatalogItem[] = [], search = '';
const incomingPlan = planFromRouteLink(params);
const details = new Map<string, RiverDetailApiResult | null>();
const requests = new Set<string>();
let linkKind: 'phone' | 'invite' | 'view' = 'phone';
let link = '', recovery: PendingTripWork | null = null, auth: ReturnType<typeof getAuth> | null = null;

const publicApi = createPaddleTodayApiClient({ baseUrl: location.origin });
const api = createTripsClient(location.origin, async () => {
  if (!user) throw new Error('Sign in to continue.');
  return user.getIdToken();
});
const clientState = () => repo?.getSnapshot();
const message = (text: string, failed = false) => { notice = text; error = failed; render(); };
function routeLabel(c: RiverCatalogItem) { return `${c.river.name} · ${c.river.region || c.river.state} · ${c.river.slug.replaceAll('-', ' ')}`; }
function routeFields(route: TripPlan['route']) {
  const options = (value: string) => `<option value="">Choose an access point</option>${value && !access.some(a => a.id === value) ? `<option value="${esc(value)}" selected>${esc(value)} · unavailable in current route</option>` : ''}${access.map(a => `<option value="${esc(a.id)}" ${a.id === value ? 'selected' : ''}>${esc(a.name)}</option>`).join('')}`;
  return `${route.slug ? `<input type="hidden" name="routeName" value="${esc(route.name)}">` : field('routeName', 'River or location', route.name, 'text', false, true)}<label>Choose a route (optional)<input name="routeChoice" list="trip-route-catalog" value="${esc(catalog.find(c => c.river.slug === route.slug) ? routeLabel(catalog.find(c => c.river.slug === route.slug)!) : route.name)}" placeholder="Search available routes"><input type="hidden" name="slug" value="${esc(route.slug)}"><datalist id="trip-route-catalog">${catalog.map(c => `<option value="${esc(routeLabel(c))}"></option>`).join('')}</datalist></label>
    ${route.slug ? `<div class="trip-wide">${requests.has(route.slug) ? '<p role="status">Loading access points…</p>' : details.get(route.slug) === null ? `<p>Route details are unavailable. Your selections are kept.</p>${button('load-route', 'Retry route details')}` : ''}</div>` : ''}

    ${access.length ? `<label>Put-in<select name="putInId">${options(route.putInId)}</select></label><label>Take-out<select name="takeOutId">${options(route.takeOutId)}</select></label>` : `${field('putInName', 'Put-in', route.putInName)}${field('takeOutName', 'Take-out', route.takeOutName)}`}`;
}
async function loadRoute(slug: string, retry = false) {
  if (!slug || requests.has(slug) || (!retry && details.has(slug))) return;
  requests.add(slug);
  try {
    const { result } = await publicApi.getRiverDetail(slug);
    if (!result?.river) throw new Error('Route unavailable');
    details.set(slug, result);
    if (editing?.route.slug === slug) { capturePlan(); editing = hydrateTripRoute(editing!, result.river); access = routeAccessPoints(result.river); }
    if (logEdit?.route.slug === slug) { captureLog(); logEdit!.route = hydrateTripRoute(newTripPlan(logEdit!.route), result.river).route; access = routeAccessPoints(result.river); }
  } catch { details.set(slug, null); }
  finally { requests.delete(slug); const status = root.querySelector<HTMLElement>('[data-route-status]'); if (status?.dataset.routeStatus === slug) status.innerHTML = routeStatus(slug); if (editing?.route.slug === slug || logEdit?.route.slug === slug) render(); }
}
function routeStatus(slug: string) {
  const detail = details.get(slug);
  if (!detail) return requests.has(slug) ? 'Loading route information…' : 'Current route information is unavailable. Open the route page to retry.';
  const timestamp = Date.parse(detail.generatedAt);
  if (!Number.isFinite(timestamp)) return 'No update time is available. Check the route page for current readings.';
  const stale = Date.now() - timestamp > 60 * 60 * 1000;
  return `${stale ? 'Route information may be out of date.' : 'Latest route information available.'} Updated ${esc(new Date(timestamp).toLocaleString())}. Individual readings and alerts may have different update times; review them on the route page.`;
}
function render() {
  if (view) return;
  const state = clientState(), trip = state?.trips[selected];
  const route = editing?.route || logEdit?.route;
  if (!editing && !logEdit && trip?.route.slug) void loadRoute(trip.route.slug);
  if (route?.slug) { const detail = details.get(route.slug); if (detail) { access = routeAccessPoints(detail.river); if (editing) editing = hydrateTripRoute(editing, detail.river); } void loadRoute(route.slug); }
  const open = Array.from(root.querySelectorAll<HTMLDetailsElement>('details[data-disclosure][open]')).map(d => d.dataset.disclosure);
  const focused = root.contains(document.activeElement) ? document.activeElement as HTMLInputElement : null;
  const focusName = focused?.name, selection = focused?.selectionStart;

  root.innerHTML = `<div data-trip-status role="status" class="trip-notice ${error ? 'error' : ''}" ${notice ? '' : 'hidden'}>${esc(notice)}</div>
    ${link ? `<section class="trip-card" data-link-panel tabindex="-1"><h2>${linkKind === 'phone' ? 'Take this trip with you' : linkKind === 'invite' ? 'Invite your paddling partners' : 'Share a view-only plan'}</h2><input class="trip-link" aria-label="Trip link" readonly value="${esc(link)}"><p>${linkKind === 'phone' ? 'Scan with your phone and sign in with the same account. This link gives nobody else access. Continue in the browser if the app is unavailable.' : linkKind === 'invite' ? 'Anyone with this link can join and edit. Expires after seven days.' : 'Anyone with this link can see the itinerary, but cannot edit or see shuttle details and private notes. Expires after 30 days.'}</p>${button('copy', 'Copy link')} ${button('close-link', 'Close')}<div data-qr></div></section>` : ''}
    ${invite ? invitationMarkup() : ''}
    ${emailShown && !settingsPage ? emailLinkMarkup() : ''}
    ${state?.pending.length ? `<p class="trip-notice">${state.pending.length} change(s) waiting to sync.${state.pending.filter(p => p.error).map(p => `<br>${esc(p.error)} ${button('recover', 'Review saved change', p.key)}`).join('')}</p>` : ''}
    ${pausedEditor && !editing && !logEdit && !recovery ? `<p class="trip-notice">Your unfinished draft is kept on this device. ${button('resume-editor', 'Resume editing')}</p>` : ''}
    ${guestSignIn && !user ? `<section class="trip-editor"><h1>Save your trip to your account</h1><p>Your draft is saved on this device. Sign in to keep it across devices.</p>${authMarkup()}${button('guest-back', 'Keep planning here')}</section>` : settingsPage ? settingsMarkup() : recovery ? recoveryMarkup() : editing ? planMarkup() : logEdit ? logMarkup() : trip ? detailMarkup(trip) : authPage && !user ? `<header class="trip-page-heading"><p class="trip-eyebrow">Your Paddle Today</p><h1>Keep your paddling plans together</h1><p>Sign in to sync trips and saved routes across your devices.</p></header>${authMarkup()}<a class="trip-button trip-guest-link" href="${guestDestination()}">Continue without signing in</a>` : listMarkup()}
    `;
  for (const d of root.querySelectorAll<HTMLDetailsElement>('details[data-disclosure]')) if (open.includes(d.dataset.disclosure)) d.open = true;
  if (focusName) { const input = Array.from(root.querySelectorAll<HTMLInputElement>('[name]')).find(e => e.name === focusName); input?.focus({ preventScroll: true }); if (selection != null && input?.type === 'text') input.setSelectionRange(selection, selection); }
  root.setAttribute('aria-busy', String(loading || busy));
  root.querySelectorAll<HTMLButtonElement>('button').forEach(b => { b.disabled = loading || busy || b.dataset.unavailable === 'true' || (b.dataset.action === 'save-plan' && !!editing?.route.slug && requests.has(editing.route.slug)); });
  root.querySelectorAll<HTMLInputElement>('[data-photos]').forEach(input => { input.disabled = loading || busy || (input.matches('[data-photos]') && !input.hasAttribute('data-limit')); });
  root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input:not([readonly]), textarea, select').forEach(input => { input.disabled = loading || busy; });
  const qrLink = link;
  if (link && linkKind === 'phone') void toDataURL(link, { width: 190, margin: 2 }).then(url => {
    const target = root.querySelector('[data-qr]'); if (target && link === qrLink) { const img = new Image(); img.src = url; img.className = 'trip-qr'; img.alt = 'Scan to open this trip on your phone'; target.replaceChildren(img); }

  }).catch(() => {});
  if (logEdit && !settingsPage) void loadPhotos();
}
function authMarkup() {
  if (!configuredAuth) return `<section class="trip-auth trip-auth--unavailable"><p role="status">Website sign-in is currently unavailable. Your browser saves and private notes remain available here.</p></section>`;
  if (authPage) return `<section class="trip-auth trip-auth--signin" aria-label="Sign-in options"><div class="trip-actions">${button('google', 'Continue with Google', '', true)}${!emailShown ? button('email', 'Continue with email') : ''}</div></section>`;
  return `<section class="trip-auth"><div><h2>${invite ? 'Sign in to join your group' : 'Bring your plans with you'}</h2><p class="trip-muted">Sign in to keep trips across devices and plan with friends.</p></div><div class="trip-actions">${button('google', 'Continue with Google', '', true)}${!emailShown ? button('email', 'Continue with email') : ''}</div></section>`;
}
function guestDestination() {
  const next = params.get('next');
  return next === 'saved' ? '/favorites/' : next === 'settings' ? '/account/settings/' : '/trips/';
}
function settingsMarkup() {
  return `<header class="trip-page-heading"><p class="trip-eyebrow">Your account</p><h1>Settings</h1><p>Manage your sign-in and personal data.</p></header>
    ${emailShown ? emailLinkMarkup() : ''}
    ${loading ? '<p role="status">Loading your account…</p>' : !user ? `<section class="settings-section"><div><h2>Account and sign-in</h2><p class="trip-muted">Sign in to manage connected methods, trip exports, and account data.</p></div><div>${configuredAuth ? `<div class="trip-actions">${button('google', 'Continue with Google', '', true)}${button('email', 'Continue with email')}</div>` : '<p class="trip-muted" role="status">Account sign-in is unavailable right now. Browser-only saves and notes are still available.</p>'}</div></section>` : `<section class="settings-section"><div><h2>Account</h2><p class="trip-muted">${esc(user.email || 'Your Paddle Today account')}</p></div><div><p class="settings-name">${esc(user.displayName || 'Paddler')}</p>${button('sign-out', 'Sign out')}</div></section>
    <section class="settings-section"><div><h2>Sign-in methods</h2><p class="trip-muted">Use either connected method for the same account.</p></div><div>${user.providerData.some(p => p.providerId === GoogleAuthProvider.PROVIDER_ID) ? '<p>Google <span class="trip-badge">Connected</span></p>' : button('link-google', 'Connect Google')}${user.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID) ? '<p>Email link <span class="trip-badge">Connected</span></p>' : button('link-email', 'Connect email')}</div></section>
    <section class="settings-section"><div><h2>Your data</h2><p class="trip-muted">Download your trips and paddle logs, or get help deleting your account.</p></div><div class="trip-actions">${button('export', 'Export my trips')}<a class="trip-button" href="/account/delete/">Account deletion help</a><a href="/privacy/">Privacy policy</a></div></section>`}
    <section class="settings-section"><div><h2>Saved routes and notes</h2><p class="trip-muted">${user ? 'Account saves and private notes sync across web and mobile. Browser-only saves can be imported from Saved routes.' : 'Browser-only saves and private route notes stay on this device. Sign in to sync them across web and mobile.'}</p></div><a class="trip-button" href="/favorites/">${user ? 'Manage saved routes' : 'Open browser saves'}</a></section>`;
}
function emailLinkMarkup() {
  return `<section class="trip-card"><h2>${linkEmail ? 'Connect email to your account' : 'Continue with email'}</h2><div class="trip-fields">${field('email', 'Email address', linkEmail ? user?.email || '' : '', 'email', true)}</div><div class="trip-actions">${button('send-email', 'Send sign-in link', '', true)}${auth && isSignInWithEmailLink(auth, location.href) ? button('complete-email', 'Finish email sign-in') : ''}${button('cancel-email', 'Cancel')}</div></section>`;

}
function authMessage(value: unknown) {
  const code = value && typeof value === 'object' && 'code' in value ? String(value.code) : '';
  if (code === 'auth/expired-action-code' || code === 'auth/invalid-action-code') return 'This sign-in link expired or was already used. Request a fresh email link.';
  if (code === 'auth/unauthorized-domain') return 'This website is not authorized for PaddleToday sign-in. Contact support.';
  if (code === 'auth/popup-blocked') return 'Your browser blocked the Google sign-in window. Allow pop-ups and try again.';
  if (code === 'auth/popup-closed-by-user') return 'Google sign-in was closed before it finished.';
  if (code === 'auth/account-exists-with-different-credential' || code === 'auth/credential-already-in-use') return 'This email is already connected to another sign-in method. Sign in with that method first, then connect Google or email from your account.';
  return value instanceof Error ? value.message : 'Could not complete this sign-in. Try again.';
}
function readableDate(value: string) { return value ? new Date(value + 'T12:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'To be decided'; }
function accessMarkup(route: TripRoute) { return `<div class="trip-access-facts"><p><span>Put-in</span><strong>${esc(route.putInName || 'To be decided')}</strong></p><p><span>Take-out</span><strong>${esc(route.takeOutName || 'To be decided')}</strong></p></div>`; }
function listMarkup() {
  const state = clientState();
  const query = search.trim().toLocaleLowerCase();
  const includesQuery = (values: Array<string | undefined>) => !query || values.some(value => value?.toLocaleLowerCase().includes(query));
  const allTrips = Object.values(state?.trips ?? {});
  const allLogs = Object.values(state?.logs ?? {});
  const sortUpcoming = (a: Trip, b: Trip) => (a.date || '9999').localeCompare(b.date || '9999');
  const sortPast = (a: Trip, b: Trip) => (b.date || '').localeCompare(a.date || '');
  const planned = allTrips.filter(t => t.status === 'planned').sort(sortUpcoming);
  const completed = allTrips.filter(t => t.status !== 'planned' && !allLogs.some(l => l.sourceTripId === t.id)).sort(sortPast);
  const upcoming = planned.filter(t => includesQuery([t.title, t.route.name, t.route.putInName, t.route.takeOutName]));
  const pastPlans = completed.filter(t => includesQuery([t.title, t.route.name, t.route.putInName, t.route.takeOutName]));
  const logs = allLogs.filter(l => includesQuery([l.route.name, l.route.putInName, l.route.takeOutName, l.notes])).sort((a, b) => b.date.localeCompare(a.date));
  const pastCount = completed.length + allLogs.length;
  const featured = nextDatedTrip(upcoming);
  const planCard = (t: Trip, past = false) => `<article class="trip-card trip-list-card"><div class="trip-list-card__meta"><span class="trip-badge">${past ? esc(t.status) : t.date ? `<time datetime="${esc(t.date)}">${esc(readableDate(t.date))}</time>` : 'Date to be decided'}</span><span class="trip-muted">${t.members.length > 1 ? `${t.members.length} paddlers` : 'Your trip'}</span></div><h3>${esc(t.title)}</h3>${t.route.name !== t.title ? `<p class="trip-list-card__route">${esc(t.route.name)}</p>` : ''}${accessMarkup(t.route)}${!past && (state?.viewed[t.id] ?? 0) < t.revision ? '<p class="trip-list-card__update">New update</p>' : ''}<div class="trip-actions">${button('open', past ? 'Open plan' : 'Open trip', t.id, true)}${past ? button('log-trip', 'Log this paddle', t.id) : ''}</div></article>`;
  const featuredCard = (t: Trip) => { const date = new Date(t.date + 'T12:00:00'); return `<article class="trip-card trip-featured-plan"><div class="trip-list-card__meta"><p class="trip-eyebrow">Next paddle</p>${(state?.viewed[t.id] ?? 0) < t.revision ? '<span class="trip-badge">New update</span>' : ''}</div><div class="trip-featured-heading"><time class="trip-date-tile" datetime="${esc(t.date)}" aria-label="${esc(readableDate(t.date))}"><span>${esc(date.toLocaleDateString(undefined, {month:'short'}))}</span><strong>${date.getDate()}</strong><span>${date.getFullYear()}</span></time><div><h2>${esc(t.title)}</h2><p>${esc(date.toLocaleDateString(undefined,{weekday:'long'}))} · ${esc(t.launch ? t.launch + ' launch' : 'Launch time to be decided')}</p>${t.launch ? `<p class="trip-muted">${esc(t.timeZone)}</p>` : ''}</div></div>${t.route.name !== t.title ? `<p class="trip-list-card__route">${esc(t.route.name)}</p>` : ''}${accessMarkup(t.route)}<div class="trip-actions">${button('open','Open trip',t.id,true)}</div></article>`; };
  const logCard = (l: PaddleLogInput & { id: string }) => { const linked = allTrips.find(t => t.id === l.sourceTripId); return `<article class="trip-card trip-list-card"><div class="trip-list-card__meta"><span class="trip-badge"><time datetime="${esc(l.date)}">${esc(readableDate(l.date))}</time></span>${l.paddleAgain ? `<span class="trip-muted">${l.paddleAgain === 'yes' ? 'Would paddle again' : l.paddleAgain === 'no' ? 'Would choose another route' : 'Maybe another time'}</span>` : ''}</div><h3>${esc(linked?.title || l.route.name || 'Paddle log')}</h3>${l.notes ? `<p>${esc(l.notes.slice(0,160))}${l.notes.length > 160 ? '…' : ''}</p>` : ''}<p class="trip-muted">Private recap</p><div class="trip-actions">${button('edit-log','Open paddle log',l.id)}${linked ? button('open', 'Open plan', linked.id) : ''}${button('again-log','Plan this route again',l.id,true)}</div></article>`; };
  const groups = [
    { title: 'Scheduled plans', items: upcoming.filter(t => t.id !== featured?.id && t.date && t.date >= tripLocalToday(t)) },
    { title: 'Choose a date later', items: upcoming.filter(t => !t.date) },
    { title: 'Earlier plans · review when ready', items: upcoming.filter(t => t.date && t.date < tripLocalToday(t)) },
  ];
  const upcomingBody = (featured ? featuredCard(featured) : '') + groups.filter(group=>group.items.length).map(group=>`<section class="trip-list-group"><h2>${esc(group.title)}</h2><div class="trip-grid">${group.items.map(t=>planCard(t)).join('')}</div></section>`).join('');
  const pastBody = [
    pastPlans.length ? `<section class="trip-list-group"><h2>Completed plans</h2><div class="trip-grid">${pastPlans.map(t => planCard(t, true)).join('')}</div></section>` : '',
    logs.length ? `<section class="trip-list-group"><h2>Paddling log</h2><div class="trip-grid">${logs.map(l => logCard(l)).join('')}</div></section>` : '',
  ].filter(Boolean).join('');
  const searchAvailable = allTrips.length + allLogs.length > 0;
  const emptyState = query
    ? `<div class="trip-card trip-empty"><h2>No trips found</h2><p>Nothing matches “${esc(search.trim())}”. Try another river or trip name.</p>${button('clear-search', 'Clear search')}</div>`
      : tab === 'upcoming'
      ? `<div class="trip-card trip-empty"><p class="trip-eyebrow">Upcoming</p><h2>Ready for your next paddle?</h2><p>Your trip plans will appear here. Start one whenever you’re ready.</p><a class="trip-button" href="/explore/">Explore routes</a></div>`
      : `<div class="trip-card trip-empty"><p class="trip-eyebrow">Past</p><h2>Your time on the water, remembered</h2><p>Completed plans and paddles you log will appear here.</p>${user ? button('new-log', 'Add a past paddle', '', true) : ''}</div>`;
  const content = tab === 'upcoming' ? upcomingBody : pastBody;
  const loadError = loadFailed && user
    ? `<div class="trip-card trip-empty"><h2>Your trips couldn’t be loaded</h2><p>Your saved drafts remain on this device. Reconnect and try loading your account again.</p>${button('refresh', 'Try again', '', true)}</div>` : '';
  const visibleRows = tab === 'upcoming' ? upcoming.length : pastPlans.length + logs.length;
  return `<header class="trip-page-heading"><div><p class="trip-eyebrow">Your paddles</p><h1>My trips</h1><p>Plan a paddle, bring your group together, and keep a record of days on the water.</p></div><div class="trip-actions">${button('new', 'Plan a trip', '', true)}${user ? button('new-log', 'Log a past paddle') : ''}</div></header>
    <div class="trip-tabs" role="tablist" aria-label="Trip lists">${tripTab('upcoming', 'Plans', planned.length)}${tripTab('past', 'History', pastCount)}</div>
    ${!user && !editing && !emailShown ? authMarkup() : ''}
    ${guestPlan && !user ? `<article class="trip-card"><p class="trip-eyebrow">Draft on this device</p><h2>${esc(guestPlan.title)}</h2><p>${esc(readableDate(guestPlan.date))}</p>${button('resume-guest', 'Continue draft', '', true)}</article>` : ''}
    ${loading ? '<p role="status">Finding your trips…</p>' : ''}
    ${searchAvailable ? `<label class="trip-search-field"><span>Search trips</span><input class="trip-search" type="search" name="search" value="${esc(search)}" placeholder="River, trip, or access point"></label>` : ''}
    <section id="trip-list-panel" class="trip-list-panel" role="tabpanel" aria-labelledby="trip-tab-${tab}" tabindex="0" aria-live="polite">${loadError || (visibleRows ? content : emptyState)}</section>`;
}
function planMarkup() {
  const p = editing!;
  return `<section class="trip-editor"><p class="trip-eyebrow">${editingId ? 'Edit trip' : 'New trip'}</p><h1>Plan your paddle</h1><form data-plan><div class="trip-fields">${p.route.slug ? `<div class="trip-route-summary trip-wide"><p class="trip-eyebrow">Your route</p><h2>${esc(p.route.name || p.route.slug)}</h2><p>${esc(p.route.putInName || 'Choose a put-in')} → ${esc(p.route.takeOutName || 'Choose a take-out')}</p><a href="${esc(tripRouteUrl(p.route))}">View route</a></div></div><details data-disclosure="route"><summary>Change route or access points</summary><div class="trip-fields">${routeFields(p.route)}</div></details><div class="trip-fields">` : routeFields(p.route)}${field('date', 'Planned date (optional)', p.date, 'date')}${area('tripNotes', 'Trip notes (optional)', tripNotes(p.preparation))}</div><p class="trip-muted">Shared only with trip members. A route is enough to save; add the rest when you need it.</p>
    <details data-disclosure="times"><summary>More details</summary><div class="trip-fields">${field('title', 'Trip title', p.title, 'text', true)}${field('launch', 'Launch time (optional)', p.launch, 'time')}${field('expected', 'Expected return (optional)', p.expected, 'time')}${field('checkInLocal', 'Group check-in (optional)', (p.preparation?.checkInLocal || '').replace(' ', 'T'), 'datetime-local')}${timeZoneField(p.timeZone)}${field('groupSize', 'Group size (optional)', p.preparation?.groupSize == null ? '' : String(p.preparation.groupSize), 'number')}</div></details>
    <details data-disclosure="itinerary"><summary>${p.itinerary.length ? 'Stops · ' + p.itinerary.length : 'Add stops'}</summary><p class="trip-muted">These stops are visible to trip members and anyone with a view link.</p>${p.itinerary.map((s, i) => `<div class="trip-stop trip-fields">${field(`stop-time-${i}`, 'Time', s.time, 'time')}${field(`stop-location-${i}`, 'Meeting place', s.location)}${area(`stop-note-${i}`, 'Details', s.note)}${button('remove-stop', 'Remove stop', String(i))}</div>`).join('')}<div class="trip-actions">${button('add-stop', 'Add meeting stop')}</div></details><div class="trip-actions">${button('save-plan', user ? 'Save trip' : configuredAuth ? 'Save and sign in' : 'Save draft on this device', '', true)}${button('cancel-edit', 'Back')}</div></form></section>`;
}
function detailMarkup(t: Trip) {
  const owner = t.ownerUid === user?.uid, state = clientState()!;
  const assigned = new Set(t.shuttle.flatMap(v => [v.driverUid, ...v.passengers]));
  const missing = t.members.filter(m => m.rsvp === 'going' && !assigned.has(m.uid)).length;
  const currentMember = t.members.find(m => m.uid === user?.uid);
  const rsvpChoices: Array<['going' | 'maybe' | 'not-going', string]> = [['going', 'Going'], ['maybe', 'Maybe'], ['not-going', 'Can’t make it']];
  const recentActivity = t.activity.slice(-5).reverse();
  return `<div class="trip-detail">
    <header class="trip-detail__hero"><div>${button('home', '← My trips')}<p class="trip-eyebrow">${esc(t.status === 'planned' ? 'Trip plan' : t.status + ' trip')}</p><h1>${esc(t.title)}</h1>${t.title !== t.route.name ? `<p class="trip-detail__route">${esc(t.route.name)}</p>` : ''}<dl class="trip-summary-facts"><div><dt>Date</dt><dd>${esc(readableDate(t.date))}</dd></div><div><dt>Launch</dt><dd>${esc(t.launch || 'To be decided')}</dd></div>${t.expected ? `<div><dt>Return</dt><dd>${esc(t.expected)}</dd></div>` : ''}</dl><p class="trip-muted">Times in ${esc(t.timeZone)}</p>${accessMarkup(t.route)}</div><div class="trip-actions trip-detail__primary-actions">${button('edit', 'Edit trip', t.id, true)}${webFeatureFlags.tripAppHandoff ? button('phone', 'Open on phone') : ''}${button('log-trip', logsForTrip(Object.values(state.logs), t.id).length ? 'Open paddle log' : 'Log this paddle', t.id)}${button('again', 'Plan again', t.id)}${t.route.slug ? `<a class="trip-button" href="${esc(tripRouteUrl(t.route))}">Route conditions</a>` : ''}</div></header>
    <section class="trip-detail-section"><header class="trip-detail-section__heading"><div><p class="trip-eyebrow">The plan</p><h2>Itinerary</h2></div></header>${t.itinerary.length ? `<ol class="trip-itinerary">${t.itinerary.map(s => `<li><time>${esc(s.time || 'Time TBD')}</time><div><strong>${esc(s.location || 'Meeting place to be decided')}</strong>${s.note ? `<p>${esc(s.note)}</p>` : ''}</div></li>`).join('')}</ol>` : '<p class="trip-muted">No meeting stops yet. Add a stop when you know where to meet.</p>'}</section>
    ${tripNotes(t.preparation) ? `<section class="trip-detail-section"><h2>Trip notes</h2><p class="trip-muted">Shared only with trip members</p><p class="trip-notes-copy">${esc(tripNotes(t.preparation))}</p></section>` : ''}
    <section class="trip-detail-section"><header class="trip-detail-section__heading"><div><p class="trip-eyebrow">The group</p><h2>Paddling partners</h2></div><span class="trip-badge">${t.members.length} ${t.members.length === 1 ? 'paddler' : 'paddlers'}</span></header><div class="trip-member-name"><div class="trip-fields">${field('memberName', 'My name for this trip', currentMember?.name || '')}</div>${button('member-name', 'Update my name')}</div><ul class="trip-member-list">${t.members.map(m => `<li><div><strong>${esc(m.name)}</strong><span>${esc(m.rsvp)}${m.role === 'owner' ? ' · Organizer' : ''}</span></div>${owner && m.uid !== user?.uid ? `<div class="trip-actions">${button('transfer', 'Make organizer', m.uid)}${button('remove-member', 'Remove', m.uid)}</div>` : ''}</li>`).join('')}</ul><div class="trip-actions trip-rsvp-actions" aria-label="Your response">${rsvpChoices.map(([value, label]) => `<button type="button" data-action="rsvp" data-id="${value}" aria-pressed="${currentMember?.rsvp === value}" class="${currentMember?.rsvp === value ? 'primary' : ''}">${label}</button>`).join('')}</div>${owner ? `<div class="trip-actions trip-share-actions">${button('invite', 'Invite people', '', true)}${button('share', 'Share view-only link')}${button('revoke-invite', 'Revoke invitation')}${button('revoke-view', 'Revoke view link')}</div>` : button('leave', 'Leave trip')}</section>
    <section class="trip-detail-section"><header class="trip-detail-section__heading"><div><p class="trip-eyebrow">Getting there</p><h2>Shuttle</h2></div>${missing ? `<span class="trip-badge">${missing} ${missing === 1 ? 'paddler needs' : 'paddlers need'} a ride</span>` : ''}</header><p class="trip-muted">Shuttle details are visible only to trip members.</p>${t.shuttle.length ? `<div class="trip-shuttle-list">${t.shuttle.map(v => `<article class="trip-shuttle-card"><h3>${esc(v.label)}</h3><p><strong>Driver</strong> ${esc(t.members.find(m => m.uid === v.driverUid)?.name || 'Not set')} · ${v.passengers.length}/${v.seats} passenger seats filled</p><p><strong>Meet</strong> ${esc(v.meeting || 'Location TBD')} · ${esc(v.time || 'Time TBD')}</p><p><strong>Car stays at</strong> ${esc(v.parkedAt || 'Location TBD')}</p>${v.note ? `<p>${esc(v.note)}</p>` : ''}${v.passengers.length ? `<p class="trip-muted">Passengers: ${v.passengers.map(p => esc(t.members.find(m => m.uid === p)?.name || 'Paddler')).join(', ')}</p>` : ''}<div class="trip-actions">${button('seat', v.passengers.includes(user!.uid) ? 'Leave this ride' : 'Take a seat', v.passengers.includes(user!.uid) ? '' : v.id, !v.passengers.includes(user!.uid))}${owner || v.driverUid === user?.uid ? button('edit-vehicle', 'Edit vehicle', v.id) + button('remove-vehicle', 'Remove vehicle', v.id) : ''}</div></article>`).join('')}</div>` : '<p class="trip-empty-inline">No shuttle rides have been arranged yet.</p>'}<details class="trip-vehicle-editor" data-vehicle-editor ${vehicleEdit ? 'open' : ''}><summary>${vehicleEdit ? 'Edit shuttle vehicle' : 'Offer a shuttle ride'}</summary><div class="trip-fields">${field('vehicleLabel', 'Vehicle label', vehicleEdit ? String(vehicleEdit.vehicle.label) : '')}${field('seats', 'Passenger seats', vehicleEdit ? String(vehicleEdit.vehicle.seats) : '3', 'number')}${field('meeting', 'Meet at', vehicleEdit ? String(vehicleEdit.vehicle.meeting) : '')}${field('meetingTime', 'Meeting time', vehicleEdit ? String(vehicleEdit.vehicle.time) : '', 'time')}${field('parkedAt', 'Car will stay at', vehicleEdit ? String(vehicleEdit.vehicle.parkedAt) : '')}${area('vehicleNote', 'Shuttle notes', vehicleEdit ? String(vehicleEdit.vehicle.note) : '')}</div><div class="trip-actions">${button('vehicle', vehicleEdit ? 'Save vehicle' : 'Add ride', '', true)}${vehicleEdit ? button('cancel-vehicle', 'Cancel edit') : ''}</div></details></section>
    ${recentActivity.length ? `<details class="trip-detail-section trip-activity"><summary><span><span class="trip-eyebrow">History</span><strong>Recent changes</strong></span><span class="trip-badge">${recentActivity.length}</span></summary><ul>${recentActivity.map(a => `<li><span>${esc(t.members.find(m => m.uid === a.actor)?.name || 'Paddler')} · ${esc(a.action)}</span><time>${esc(new Date(a.at).toLocaleString())}</time></li>`).join('')}</ul></details>` : ''}
    ${state.recovery[t.id] ? `<details class="trip-detail-section"><summary>Original draft details · review time zone</summary><p>Your old draft did not record a time zone. Confirm it in Edit trip. Original private details are retained here.</p><pre class="trip-recovery">${esc(state.recovery[t.id])}</pre></details>` : ''}
    ${owner ? `<section class="trip-detail-section trip-detail-section--danger"><h2>Organizer actions</h2><p class="trip-muted">These changes affect everyone on this trip.</p><div class="trip-actions">${button('complete', 'Mark plan completed')}${button('cancel-trip', 'Cancel trip')}${button('delete', 'Delete trip')}</div></section>` : ''}<p class="trip-safety-note">Review current conditions before launching. PaddleToday does not monitor your trip.</p>
  </div>`;
}
function logMarkup() {
  const l = logEdit!, water = l.water[0], savedPhotos = clientState()?.logs[logId]?.photos ?? [];
  const queuedPhotos = clientState()?.pending.filter(p => p.kind === 'photo' && p.id === logId) ?? [];
  const remainingPhotos = Math.max(0, 10 - savedPhotos.length - queuedPhotos.length);
  return `<section class="trip-editor"><p class="trip-eyebrow">Private paddling log</p><h1>${logId ? 'Your paddle' : 'Remember this paddle'}</h1><p>Your notes and photos are only visible to you.</p><div class="trip-fields">${routeFields(l.route)}${field('logDate', 'Date paddled', l.date, 'date', false, true)}${field('logTime', 'Launch time (optional)', l.time, 'time')}${timeZoneField(l.timeZone)}<label>Would paddle again<select name="paddleAgain">${[['','Not decided'],['yes','Yes'],['no','No'],['unsure','Unsure']].map(([v, label]) => `<option value="${v}" ${v === l.paddleAgain ? 'selected' : ''}>${label}</option>`).join('')}</select></label>${area('notes', 'Notes', l.notes)}
    </div><details data-disclosure="log-water"><summary>Water observations (optional)</summary><div class="trip-fields">${field('level', 'Water level / flow (optional)', water?.value || '')}${field('unit', 'Unit (e.g. ft, cfs, m³/s)', water?.unit || '')}${field('gauge', 'Gauge / observation location', water?.gaugeName || '')}${field('measuredAt', 'Measurement date and time', water?.measuredAt || '')}${field('source', 'Source (e.g. personal observation, USGS)', water?.source || '')}</div>${button('water-history', 'Find a recorded water reading')}<p class="trip-muted">Record what you observed on this paddle. A current reading is not a historical reading.</p></details><div class="trip-actions">${button('save-log', 'Save paddle', '', true)}${button('cancel-log', 'Back')}${logId ? button('delete-log', 'Delete paddle') : ''}</div>
    ${logId ? `<h2>Photos</h2><p class="trip-muted">${savedPhotos.length} saved · ${queuedPhotos.length} waiting · ${remainingPhotos} slot(s) available. Each photo can be up to 10 MiB.</p>${queuedPhotos.map(p => `<p class="trip-muted">${p.error ? `Upload needs attention: ${esc(p.error)} ${button('recover', 'Review photo', p.key)}` : 'Photo upload waiting to sync.'}</p>`).join('')}<input type="file" data-photos accept="image/*" multiple ${remainingPhotos ? '' : 'disabled'} aria-label="Add paddle photos" ${remainingPhotos ? `data-limit="${remainingPhotos}"` : ''}><div class="trip-photo-grid">${savedPhotos.map(p => `<figure><img data-photo="${p.id}" alt="${esc(p.caption || 'Photo from this paddle')}"><figcaption>${esc(p.caption)}</figcaption>${button('remove-photo', 'Remove photo', p.id)}</figure>`).join('')}</div>` : '<p>Save the paddle to add photos.</p>'}</section>`;

}
function recoveryValue() {
  if (recovery?.kind === 'log') return recovery.input.value;
  if (recovery?.kind === 'trip' && (recovery.input.command.type === 'plan' || recovery.input.command.type === 'create')) return recovery.input.command.plan;
  return null;
}
async function loadRecovery() {
  const pending = recovery; recoveryLatest = null; recoveryLoadError = '';
  if (!pending || !recoveryValue()) return;
  try {
    const latest = pending.kind === 'trip' ? (await api.get(pending.id)).trip : (await api.getLog(pending.id)).log;
    if (recovery === pending) recoveryLatest = latest;
  } catch { if (recovery === pending) recoveryLoadError = 'The latest version is unavailable. Reconnect and retry, or download your saved change before choosing another action.'; }
}
function recoveryMarkup() {
  const mine = recoveryValue(), latest = recoveryLatest;
  const record = (v: unknown) => v as Record<string, unknown>;
  const fields = (recovery?.kind === 'trip' ? planReviewFields : logReviewFields).filter(key => !latest || !mine || JSON.stringify(record(latest)[key]) !== JSON.stringify(record(mine)[key]));
  const multiple = clientState()!.pending.some(p => p.id === recovery!.id && p.kind === recovery!.kind && p.key !== recovery!.key);
  return `<section class="trip-editor"><h1>Review your saved change</h1><p>${esc(recovery!.error)}</p>${mine ? `<p>Compare your saved changes with the latest version. Choose which values to keep before saving. Matching fields stay unchanged.</p>${recoveryLoadError ? `<p role="alert">${esc(recoveryLoadError)}</p>${button('reload-recovery', 'Load latest version')}` : ''}<div class="trip-review">${fields.map(key => `<fieldset><legend>${esc(reviewLabels[key])}</legend><div class="trip-review-values"><label>${latest ? `<input type="radio" name="review-${key}" value="latest" checked>` : ''}<strong>Latest saved</strong><p>${esc(latest ? reviewText(record(latest)[key]) : 'Unavailable')}</p></label><label>${latest ? `<input type="radio" name="review-${key}" value="mine">` : ''}<strong>Your change</strong><p>${esc(reviewText(record(mine)[key]))}</p></label></div></fieldset>`).join('')}</div>${latest && !multiple ? button('resolve-review', 'Save selected values', '', true) : multiple ? '<p>Additional changes for this item are also waiting. Download your recovery copy before resolving them individually.</p>' : ''}` : `<p>${recovery!.kind === 'photo' ? 'This photo is still waiting to upload. Retry after reconnecting, or remove this queued upload and select the photo again.' : 'This trip action could not be applied. Use the latest saved version, then make the change again from the trip.'}</p>`}<div class="trip-actions">${button('download-recovery', 'Download recovery copy')}${button('discard-recovery', 'Use latest saved version')}${!mine ? button('retry-recovery', 'Retry saved action', recovery!.key) : ''}${button('close-recovery', 'Back')}</div><details><summary>Technical details</summary><pre class="trip-recovery">${esc(JSON.stringify(recovery!.kind === 'photo' ? { caption: recovery!.caption } : recovery!.input, null, 2))}</pre>${button('copy-recovery', 'Copy my change')}</details></section>`;

}

function planSummary(plan: TripPlan) {
  return [plan.title, plan.route.name, `${plan.route.putInName || 'Put-in not set'} → ${plan.route.takeOutName || 'Take-out not set'}`,
    plan.date ? `${plan.date}${plan.launch ? ` at ${plan.launch}` : ''} (${plan.timeZone})` : 'No date selected',
    ...plan.itinerary.map(stop => `${stop.time || 'Time not set'} · ${stop.location || 'Meeting place not set'}${stop.note ? ` · ${stop.note}` : ''}`)].join('\n');
}
function logSummary(log: PaddleLogInput) {
  const water = log.water[0];
  return [log.route.name, log.date, log.notes || 'No personal notes', log.paddleAgain ? `Would paddle again: ${log.paddleAgain}` : '',
    water ? `Water: ${water.value || 'level not set'} ${water.unit} · ${water.gaugeName || 'gauge not set'} · measured ${water.measuredAt || 'time not set'} · ${water.source || 'source not set'}` : 'No water observation'].filter(Boolean).join('\n');
}
const value = (name: string, trim = true) => { const text = root.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`[name="${name}"]`)?.value ?? ''; return trim ? text.trim() : text; };
function readRoute(previous: TripPlan['route']) {
  const putInId = access.length ? value('putInId') : previous.putInId, takeOutId = access.length ? value('takeOutId') : previous.takeOutId;
  const chosen = catalog.find(c => routeLabel(c) === value('routeChoice'));
  if (chosen && chosen.river.slug !== previous.slug) return newTripPlan({ slug: chosen.river.slug, name: chosen.river.name }).route;
  return { slug: chosen?.river.slug || value('slug'), name: chosen?.river.name || value('routeName'), putInId, takeOutId, putInName: access.find(a => a.id === putInId)?.name || value('putInName') || previous.putInName, takeOutName: access.find(a => a.id === takeOutId)?.name || value('takeOutName') || previous.takeOutName };
}
function capturePlan() {
  if (!editing || !root.querySelector('[data-plan]')) return;
  const route = readRoute(editing.route);
  const title = value('title');
  const preparation = withTripNotes(editing.preparation, value('tripNotes', false)) || newTripPlan().preparation!;
  editing = { ...editing, title: !title || title === 'New paddle' || title === editing.route.name ? route.name || title : title, route, date: value('date'), launch: value('launch'), expected: value('expected'), timeZone: value('timeZone'),
    preparation: { ...preparation, checkInLocal: value('checkInLocal').replace('T', ' '), groupSize: value('groupSize') ? Number(value('groupSize')) : null },
    itinerary: editing.itinerary.map((s, i) => ({ ...s, time: value(`stop-time-${i}`), location: value(`stop-location-${i}`), note: value(`stop-note-${i}`) })) };
  const titleInput = root.querySelector<HTMLInputElement>('[name="title"]');
  if (titleInput && titleInput.value !== editing.title) titleInput.value = editing.title;
}
function validatePlanFields() {
  const form = root.querySelector<HTMLFormElement>('form[data-plan]');
  if (!form) return false;
  const input = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
  const date = input('date'), launch = input('launch'), expected = input('expected'), zone = input('timeZone');
  if (!date || !launch || !expected || !zone) return false;
  date.setCustomValidity(launch.value && !date.value ? 'Choose a date when you set a launch time.' : '');
  launch.setCustomValidity(tripTimeIssue(date.value, launch.value, zone.value) ?? '');
  expected.setCustomValidity(tripTimeIssue(date.value, expected.value, zone.value) ?? '');
  for (const control of Array.from(form.elements) as HTMLInputElement[]) { if (control.willValidate && !control.checkValidity()) { for (let parent = control.parentElement; parent && parent !== form; parent = parent.parentElement) if (parent instanceof HTMLDetailsElement) parent.open = true; } }
  const valid = form.reportValidity();
  if (!valid) form.querySelector<HTMLElement>(':invalid')?.focus();
  return valid;
}
function captureLog() {
  if (!logEdit || !root.querySelector('[name=logDate]')) return;
  logEdit = { ...logEdit, route: readRoute(logEdit.route), date: value('logDate'), time: value('logTime'), timeZone: value('timeZone'), notes: value('notes'), paddleAgain: value('paddleAgain') as PaddleLogInput['paddleAgain'],
    water: value('level') || value('gauge') ? [{ ...logEdit.water[0], gaugeId: logEdit.water[0]?.gaugeId || '', gaugeName: value('gauge'), value: value('level'), unit: value('unit'), measuredAt: value('measuredAt'), source: value('source'), note: logEdit.water[0]?.note || '' }, ...logEdit.water.slice(1)] : logEdit.water.slice(1) };
}
function beginLog(t?: Trip) {
  const existing = t ? logsForTrip(Object.values(clientState()?.logs ?? {}), t.id)[0] : undefined;
  logRevision = existing?.revision ?? 0; logId = existing?.id || ''; access = [];
  logEdit = existing ? structuredClone(existing) : { sourceTripId: t?.id || null, route: t ? tripPlan(t).route : newTripPlan().route, date: t?.date || new Date().toLocaleDateString('en-CA'), time: t?.launch || '', timeZone: t?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone, notes: '', paddleAgain: '', water: [] };
}
async function sync() {
  if (!repo || document.hidden || !navigator.onLine) return;
  try { await repo.sync(); notice = repo.getSnapshot().pending.length ? 'Some changes are waiting for review or upload.' : ''; error = false; loadFailed = false; }
  catch (e) { notice = e instanceof Error ? e.message : 'Changes are saved on this device.'; error = true; loadFailed = true; }
  if (!editing && !logEdit && !recovery && !vehicleEdit && !root.querySelector('details[data-vehicle-editor][open]') && !root.contains(document.activeElement)) render();
}
async function run(action: string, id: string) {
  const t = clientState()?.trips[selected];
  if (action === 'resume-guest' && guestPlan) { access = []; editing = structuredClone(guestPlan); editingId = ''; return; }
  if (action === 'clear-search') { search = ''; return; }

  if (action === 'email') { linkEmail = false; emailShown = true; return; }
  if (action === 'google' || action === 'link-google') {
    if (!auth) throw new Error('Website sign-in is not configured yet.');
    try {
      if (action === 'link-google' && auth.currentUser) await linkWithPopup(auth.currentUser, new GoogleAuthProvider());
      else await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) { throw new Error(authMessage(e)); }
    return;
  }
  if (action === 'link-email') { linkEmail = true; emailShown = true; return; }
  if (action === 'cancel-email') { linkEmail = false; emailShown = false; return; }
  if (action === 'send-email') {
    if (!auth) throw new Error('Website sign-in is not configured yet.');
    const email = value('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Enter your email address.');
    const last = Number(getSession('trip-email-sent') || 0);
    if (Date.now() - last < 60000) throw new Error('Please wait a minute before requesting another link.');
    const destinationUrl = new URL('/account/web/', location.origin);
    if (selected) destinationUrl.searchParams.set('id', selected);
    // Keep invite credentials in the fragment so the API/CDN never receives
    // them in request paths or query strings during email-link sign-in.
    if (invite) destinationUrl.hash = `invite=${encodeURIComponent(invite)}`;
    if (settingsPage) destinationUrl.searchParams.set('next', 'settings');
    else if (params.get('next') === 'saved') destinationUrl.searchParams.set('next', 'saved');
    const destination = destinationUrl.toString();

    await sendSignInLinkToEmail(auth, email, { url: destination, handleCodeInApp: true });
    pendingEmail = email;
    const remembered = setLocal('trip-email', email) && setLocal('trip-email-mode', linkEmail && user ? 'link' : 'sign-in') && (!user || setLocal('trip-email-uid', user.uid));
    setSession('trip-email-sent', String(Date.now()));
    notice = remembered ? 'Check your email for a sign-in link.' : 'The sign-in link was sent. If it opens in another browser, enter this email address to finish signing in.'; return;
  }
  if (action === 'complete-email') {
    if (!auth || !isSignInWithEmailLink(auth, location.href)) throw new Error('Open the sign-in link from your email first.');
    await auth.authStateReady();
    const email = value('email') || pendingEmail || getLocal('trip-email') || '';
    if (!email) throw new Error('Enter the email address that received this sign-in link.');
    if (getLocal('trip-email-mode') === 'link') {
      const uid = getLocal('trip-email-uid');
      if (!auth.currentUser || auth.currentUser.uid !== uid) throw new Error('To connect this email, sign in to the existing account in this browser, then reopen the email link.');
      await linkWithCredential(auth.currentUser, EmailAuthProvider.credentialWithLink(email, location.href));
    } else if (auth.currentUser && auth.currentUser.email?.toLowerCase() !== email.toLowerCase()) {
      throw new Error('A different account is signed in here. Sign out, then reopen this link to avoid mixing account data.');
    } else if (auth.currentUser && !auth.currentUser.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID)) {
      await linkWithCredential(auth.currentUser, EmailAuthProvider.credentialWithLink(email, location.href));
    } else await signInWithEmailLink(auth, email, location.href);
    removeLocal('trip-email'); removeLocal('trip-email-mode'); removeLocal('trip-email-uid'); emailShown = false; finishEmailSignIn(); return;
  }
  if (action === 'sign-out') {
    const savedEditor = user ? await storage.getItem('trip-editor:' + user.uid) : null;
    if ((editing || logEdit || savedEditor || repo?.getSnapshot().pending.length) && !confirm('You have unfinished trip changes on this device. Discard them and sign out?')) return;

    if (editorTimer) clearTimeout(editorTimer);
    const uid = repo?.uid, previous = repo;
    await previous?.settle();
    await signOut(auth!);
    if (editing || logEdit || savedEditor) await storage.removeItem('trip-editor:' + (uid || 'guest'));
    if (uid) await storage.clearAccount(uid);
    return;
  }
  if (action === 'guest-back') { guestSignIn = false; return; }
  if (action === 'resume-editor' && pausedEditor) { restoreEditor(JSON.parse(pausedEditor)); pausedEditor = null; return; }
  if (action === 'new') { history.replaceState(null, '', '/trips/'); selected = ''; logEdit = null; editingBaseline = undefined; editingId = ''; editing = newTripPlan(); access = []; return; }
  if (action === 'home') { vehicleEdit = null; selected = ''; history.replaceState(null, '', '/trips/'); return; }
  if (action === 'upcoming' || action === 'past') { tab = action; return; }
  if (action === 'clear-search') { search = ''; return; }
  if (action === 'open') { selected = id; history.replaceState(null, '', `/trips/?id=${id}`); await repo?.markViewed(id); return; }
  if (action === 'edit') { editingId = id; editing = tripPlan(clientState()!.trips[id]!); editingBaseline = structuredClone(editing); access = []; return; }
  if (action === 'cancel-edit' || action === 'cancel-log') { await persistEditor(); pausedEditor = editorData(); editing = null; logEdit = null; return; }
  if (action === 'add-stop') { capturePlan(); editing!.itinerary.push({ id: uuid(), time: '', location: '', note: '' }); return; }
  if (action === 'remove-stop') { capturePlan(); editing!.itinerary.splice(Number(id), 1); return; }
  if (action === 'load-route') {
    capturePlan(); captureLog();
    const slug = editing?.route.slug || logEdit?.route.slug;
    if (!slug) throw new Error('Choose a route from the route list first.');
    await loadRoute(slug, true); return;
  }
  if (action === 'save-plan') {
    capturePlan();
    if (editorTimer) clearTimeout(editorTimer);

    if ((editing?.preparation?.note.length ?? 0) > 2000) throw new Error('Keep trip notes to 2,000 characters or fewer. Your existing details are kept until you save.');

    if (!isTripPlan(editing)) throw new Error('Enter a title and location, and check your date, time, and time zone.');
    if (!repo) { guestPlan = editing; await storage.setItem('trip-guest-draft', JSON.stringify({ id: uuid(), plan: editing })); await storage.removeItem('trip-editor:guest'); editing = null; guestSignIn = !!configuredAuth; notice = configuredAuth ? 'Your draft is saved here. Sign in to keep it across devices.' : 'Your draft is saved on this device.'; return; }
    pausedEditor = null; selected = await repo.savePlan(editing!, editingId || undefined, editingId ? editingBaseline : undefined); editing = null; history.replaceState(null, '', `/trips/?id=${selected}`); await storage.removeItem('trip-editor:' + repo.uid); await sync(); return;
  }
  if (action === 'retry-invitation') { await loadInvitation(); return; }
  if (action === 'join') { await repo!.command(selected, { type: 'join', token: invite }); await sync(); if (clientState()?.trips[selected]) { invite = ''; removeLocal('trip-pending-invite'); notice = 'You joined the trip. Let your group know if you’re going.'; history.replaceState(null, '', `/trips/?id=${selected}`); } return; }
  if (action === 'refresh') { if (repo) await sync(); else location.reload(); return; }
  if (action === 'phone') { if (!webFeatureFlags.tripAppHandoff) return; await repo!.sync(); if (clientState()!.pending.some(p => p.id === selected)) throw new Error('Finish syncing this trip before opening it on another device.'); linkKind = 'phone'; link = `${location.origin}/trips/?id=${selected}&openApp=1`; return; }
  if (action === 'close-link') { link = ''; return; }

  if (action === 'copy') { await navigator.clipboard.writeText(link); notice = 'Link copied.'; return; }
  if (action === 'invite' || action === 'share') {
    const token = crypto.randomUUID().replaceAll('-', '') + crypto.randomUUID().replaceAll('-', ''), purpose = action === 'invite' ? 'invite' : 'view';
    await repo!.command(selected, { type: 'link', purpose, token }); await repo!.sync();
    if (clientState()!.pending.some(p => p.id === selected)) throw new Error('Connect and finish syncing this trip before sharing a link.');
    linkKind = purpose; link = `${location.origin}/trips/?id=${selected}#${purpose}=${token}`; return;

  }
  if (action === 'new-log') { beginLog(); return; }
  if (action === 'water-history') {
    captureLog();
    if (!logEdit?.route.slug) throw new Error('Choose a catalog route to look for a recorded reading. You can also enter an observation yourself.');
    const history = await publicApi.getRiverHistory(logEdit.route.slug, { days: 30 });
    const water = historicalWaterSuggestion(history.result, logEdit.date, logEdit.timeZone);
    if (!water) throw new Error('No recorded reading is available for this date. Add your own observation if you have one.');
    logEdit.water = [water]; notice = water.note; return;
  }
  if (action === 'member-name') { await commandName(); return; }
  if (action === 'log-trip') { beginLog(clientState()!.trips[id]); return; }
  if (action === 'edit-log') { logId = id; logEdit = { ...clientState()!.logs[id]! }; logRevision = clientState()!.logs[id]!.revision; access = []; return; }

  if (action === 'save-log') { pausedEditor = null; captureLog(); if (editorTimer) clearTimeout(editorTimer); logId = await repo!.saveLog(logEdit!, logId || undefined, logRevision); logRevision = repo!.getSnapshot().logs[logId]!.revision; await storage.removeItem('trip-editor:' + repo!.uid); await sync(); if (!clientState()?.pending.length) notice = 'Paddle saved. Add photos below whenever you like.'; return; }
  if (action === 'delete-log') { if (confirm('Delete this personal log and its photos?')) { await repo!.deleteLog(logId); logEdit = null; await sync(); } return; }
  if (action === 'remove-photo') { await api.removePhoto(logId, id); await sync(); return; }
  if (action === 'again' || action === 'again-log') { const route = action === 'again' ? clientState()!.trips[id]!.route : clientState()!.logs[id]!.route; if (editorTimer) clearTimeout(editorTimer); editing = newTripPlan(structuredClone(route)); editingId = ''; editingBaseline = undefined; logEdit = null; logId = ''; selected = ''; history.replaceState(null, '', '/trips/'); access = []; await persistEditor(); notice = 'A new outing on this route. Choose a new date; your past paddle stays unchanged.'; return; }
  if (action === 'recover') { recovery = clientState()!.pending.find(p => p.key === id)!; await loadRecovery(); return; }
  if (action === 'reload-recovery') { await loadRecovery(); return; }
  if (action === 'resolve-review' && recoveryLatest && recoveryValue()) {
    const choices = Array.from(root.querySelectorAll<HTMLInputElement>('input[name^=review-]:checked')).filter(i => i.value === 'mine').map(i => i.name.slice(7));
    const merged = mergeReviewed(recoveryLatest, recoveryValue()! as typeof recoveryLatest, choices);
    await repo!.resolveReview(recovery!.key, recoveryLatest, merged); recovery = null; await sync(); return;
  }
  if (action === 'download-recovery') {
    const a = document.createElement('a'); const url = URL.createObjectURL(new Blob([JSON.stringify(recovery, null, 2)], { type: 'application/json' })); a.href = url; a.download = 'paddle-recovery.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); return;
  }
  if (action === 'close-recovery') { recovery = null; return; }
  if (action === 'copy-recovery') { await navigator.clipboard.writeText(recovery!.kind === 'trip' ? recovery!.input.command.type === 'plan' ? planSummary(recovery!.input.command.plan) : `Saved trip action: ${recovery!.input.command.type}` : recovery!.kind === 'log' ? recovery!.input.value ? logSummary(recovery!.input.value) : 'Delete paddle log' : `Photo upload: ${recovery!.caption}`); return; }
  if (action === 'discard-recovery') { if (confirm('Discard this pending change and use the latest saved version?')) { await repo!.discard(recovery!.key); recovery = null; } return; }
  if (action === 'keep-latest') { await repo!.keepLatest(id); recovery = null; return; }
  if (action === 'retry-recovery') { await repo!.retry(id || recovery!.key); recovery = null; return; }
  if (action === 'export') { const result = await api.export(); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })); a.download = 'paddletoday-trips.json'; a.click(); URL.revokeObjectURL(a.href); return; }
  let command: TripCommand | null = null;
  if (action === 'seat') command = { type: 'seat', vehicleId: id };
  if (action === 'rsvp') command = { type: 'rsvp', rsvp: id as 'going' | 'maybe' | 'not-going' };
  if (action === 'edit-vehicle') { const v = t?.shuttle.find(v => v.id === id); if (v) vehicleEdit = { vehicle: structuredClone(v), revision: t!.revision }; return; }
  if (action === 'cancel-vehicle') { vehicleEdit = null; return; }
  if (action === 'remove-vehicle') command = { type: 'remove-vehicle', vehicleId: id };
  if (action === 'vehicle') command = { type: 'vehicle', vehicle: { id: vehicleEdit?.vehicle.id || uuid(), driverUid: vehicleEdit?.vehicle.driverUid || user!.uid, label: value('vehicleLabel'), seats: Number(value('seats')), passengers: vehicleEdit?.vehicle.passengers || [], meeting: value('meeting'), time: value('meetingTime'), parkedAt: value('parkedAt'), note: value('vehicleNote') } };
  if (action === 'remove-member' && confirm('Remove this person from the trip?')) command = { type: 'remove-member', uid: id };
  if (action === 'leave' && confirm('Leave this shared trip?')) command = { type: 'remove-member', uid: user!.uid };
  if (action === 'transfer' && confirm('Transfer organizer permissions to this person?')) command = { type: 'transfer', uid: id };
  if (action === 'delete' && confirm('Delete this shared trip for everyone? Personal logs will remain.')) command = { type: 'delete' };
  if (action === 'complete') command = { type: 'status', status: 'completed' };
  if (action === 'cancel-trip' && confirm('Cancel this trip for the group?')) command = { type: 'status', status: 'cancelled' };
  if (action === 'revoke-view' || action === 'revoke-invite') command = { type: 'revoke', purpose: action === 'revoke-view' ? 'view' : 'invite' };
  if (command && t) { await repo!.command(selected, command, action === 'vehicle' ? vehicleEdit?.revision : undefined); vehicleEdit = null; await sync(); }
}
async function commandName() { await repo!.command(selected, { type: 'name', name: value('memberName') }); await sync(); }
let preserveEditorAfterAction = false;
root.addEventListener('click', event => {
  const target = (event.target as Element).closest<HTMLButtonElement>('[data-action]');
  if (!target || busy) return;
  const restoreTabFocus = target.getAttribute('role') === 'tab';
  capturePlan(); captureLog();
  if (target.dataset.action === 'save-plan' && !validatePlanFields()) return;
  busy = true; notice = ''; error = false;
  root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>('input:not([readonly]), textarea, select, button').forEach(control => { control.disabled = true; });
  const action = target.dataset.action!, actionId = target.dataset.id || '';
  void run(action, actionId).catch(e => { notice = authMessage(e); error = true; }).finally(() => { busy = false; if (preserveEditorAfterAction) { preserveEditorAfterAction = false; root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>('input, textarea, select, button').forEach(control => { control.disabled = false; }); } else render();
    if (restoreTabFocus) { root.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]')?.focus(); return; }
    const replacement = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-action]')).find(b => b.dataset.action === action && (b.dataset.id || '') === actionId);
    if (link && ['phone', 'invite', 'share'].includes(action)) { const panel = root.querySelector<HTMLElement>('[data-link-panel]'); panel?.focus(); panel?.scrollIntoView({ block: 'start' }); } else if (replacement) replacement.focus({ preventScroll: true }); else { const heading = root.querySelector<HTMLElement>('h1, h2'); if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); } }
  });
});
root.addEventListener('keydown', event => {
  const current = (event.target as Element).closest<HTMLButtonElement>('[role="tab"]');
  if (!current) return;
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const index = tabs.indexOf(current);
  const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length
    : event.key === 'ArrowLeft' ? (index - 1 + tabs.length) % tabs.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
  if (next < 0 || !tabs[next]) return;
  event.preventDefault();
  tab = tabs[next]!.dataset.action as typeof tab;
  render();
  root.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]')?.focus();
});
root.addEventListener('submit', e => e.preventDefault());
let editorTimer: ReturnType<typeof setTimeout> | null = null;
function editorData() { return JSON.stringify({ editing, editingId, editingBaseline, logEdit, logId, logRevision, selected }); }
async function persistEditor() {
  if (editorTimer) clearTimeout(editorTimer);
  if (!editing && !logEdit) return;
  capturePlan(); captureLog();
  await storage.setItem('trip-editor:' + (repo?.uid || 'guest'), editorData());
}
function restoreEditor(draft: ReturnType<typeof JSON.parse>) {
  editing = draft.editing || null; editingId = draft.editingId || ''; editingBaseline = draft.editingBaseline;
  logEdit = draft.logEdit || null; logId = draft.logId || ''; logRevision = draft.logRevision ?? 0;
  selected = draft.selected ?? editingId ?? ''; access = [];
}
root.addEventListener('input', event => {
  const target = event.target;
  if (target instanceof HTMLInputElement && target.name === 'search') {
    const selectionStart = target.selectionStart, selectionEnd = target.selectionEnd, selectionDirection = target.selectionDirection;
    search = target.value;
    render();
    const replacement = root.querySelector<HTMLInputElement>('[name="search"]');
    replacement?.focus();
    if (replacement && selectionStart !== null && selectionEnd !== null) {
      try { replacement.setSelectionRange(selectionStart, selectionEnd, selectionDirection || undefined); } catch { /* Some browsers restrict selection on search inputs. */ }
    }
    return;
  }


  if (!editing && !logEdit) return;
  notice = 'Unsaved edits are kept in this editor. Save to add them to My trips.'; error = false;
  const status = root.querySelector<HTMLElement>('[data-trip-status]');
  if (status) { status.textContent = notice; status.hidden = false; status.classList.remove('error'); }
  capturePlan(); captureLog();
  if (editorTimer) clearTimeout(editorTimer);
  const key = 'trip-editor:' + (repo?.uid || 'guest'), data = editorData();
  editorTimer = setTimeout(() => void storage.setItem(key, data).then(() => {
    const current = root.querySelector<HTMLElement>('[data-trip-status]');
    if (current && (editing || logEdit)) { notice = 'Draft saved on this device. Save it to sync with your account.'; current.textContent = notice; current.hidden = false; }
  }).catch(e => { notice = e.message; error = true; const current = root.querySelector<HTMLElement>('[data-trip-status]'); if (current) { current.textContent = notice; current.hidden = false; current.classList.add('error'); } }), 400);

});
root.addEventListener('change', event => {
  const input = event.target as HTMLInputElement;
  if (input.name === 'routeChoice') { capturePlan(); captureLog(); access = []; const route = editing?.route || logEdit?.route; const detail = route && details.get(route.slug); if (detail && editing) editing = hydrateTripRoute(editing, detail.river); render(); }
  if (input.name === 'search') { search = input.value; render(); }
  if (input.matches('[data-photos]') && input.files && repo && !busy) {
    captureLog();
    const files = Array.from(input.files), current = repo, destination = logId;
    busy = true; render();

    void (async () => {
      const queued = current.getSnapshot().pending.filter(p => p.kind === 'photo' && p.id === destination).length;
      if (files.length + queued + (current.getSnapshot().logs[destination]?.photos.length || 0) > 10) throw new Error('A paddle can have up to 10 photos, including uploads waiting to sync.');
      if (files.some(file => file.size > 10 * 1024 * 1024)) throw new Error('Choose photos smaller than 10 MiB.');
      for (const file of files) {
        if (repo !== current || user?.uid !== current.uid) throw new Error('This account session has ended.');
        const data = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(',')[1]!); reader.onerror = () => reject(new Error('Could not read photo. Please select it again.')); reader.readAsDataURL(file); });
        if (repo !== current || user?.uid !== current.uid) throw new Error('This account session has ended.');
        await current.photo(destination, data);
      }
      await sync(); render();
    })().catch(e => { notice = e.message; error = true; }).finally(() => { busy = false; render(); });
  }
});
async function loadPhotos() {
  for (const image of root.querySelectorAll<HTMLImageElement>('[data-photo]')) {
    try { const blob = await api.photo(logId, image.dataset.photo!); if (!image.isConnected) continue; const url = URL.createObjectURL(blob); image.onload = () => URL.revokeObjectURL(url); image.src = url; } catch { image.alt = 'Photo unavailable while offline'; }
  }
}
async function restoreGuestEditor() {
  const saved = await storage.getItem('trip-guest-draft');
  guestPlan = saved ? JSON.parse(saved).plan : null;
  if (params.get('id')) return;
  const raw = await storage.getItem('trip-editor:guest');
  if (raw) { const draft = JSON.parse(raw); if (draft.editing && (!incomingPlan || draft.editing.route.slug === incomingPlan.route.slug)) { editing = draft.editing; editingId = ''; } }
}
function finishEmailSignIn() {
  emailShown = false;
  if (params.get('next') === 'saved') { location.replace('/favorites/'); return; }
  if (params.get('next') === 'settings') { location.replace('/account/settings/'); return; }
  history.replaceState(null, '', `/trips/${selected ? `?id=${encodeURIComponent(selected)}` : ''}`);
}
function cleanEmailCallback() {
  removeLocal('trip-email'); removeLocal('trip-email-mode'); removeLocal('trip-email-uid'); pendingEmail = '';
  finishEmailSignIn();
}
async function finishEmailCallback() {
  if (!auth || !isSignInWithEmailLink(auth, location.href)) return;
  emailCallbackDetected = true;
  emailShown = true;
  await auth.authStateReady();
  const email = getLocal('trip-email') || pendingEmail;
  const mode = getLocal('trip-email-mode');
  if (!email) {
    notice = 'Enter the email address that received this link, then choose Finish email sign-in.';
    return;
  }
  if (mode === 'link') {
    const expectedUid = getLocal('trip-email-uid');
    if (!auth.currentUser || auth.currentUser.uid !== expectedUid) {
      notice = 'Sign in to the account you want to connect first, then reopen this email link.';
      linkEmail = true;
      return;
    }
    await linkWithCredential(auth.currentUser, EmailAuthProvider.credentialWithLink(email, location.href));
  } else if (auth.currentUser && auth.currentUser.email?.toLowerCase() !== email.toLowerCase()) {
    notice = 'A different account is signed in here. Sign out, then reopen this link to avoid mixing account data.';
    return;
  } else if (auth.currentUser && !auth.currentUser.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID)) {
    await linkWithCredential(auth.currentUser, EmailAuthProvider.credentialWithLink(email, location.href));
  } else {
    await signInWithEmailLink(auth, email, location.href);
  }
  emailShown = false;
  linkEmail = false;
  cleanEmailCallback();
}
async function start() {
  if (view) {
    try { const { trip: t } = await api.view(selected, view); root.innerHTML = `<section class="trip-card"><p class="trip-eyebrow">Shared trip · ${esc(t.status)}</p><h1>${esc(t.title)}</h1><p>${esc(t.route.name)}</p><p>${esc(t.route.putInName)} → ${esc(t.route.takeOutName)}</p><p>${esc(t.date)} ${esc(t.launch)} ${esc(t.timeZone)}</p>${t.itinerary.map(s => `<p><strong>${esc(s.time)} ${esc(s.location)}</strong><br>${esc(s.note)}</p>`).join('')}<p class="trip-muted">Updated ${esc(new Date(t.updatedAt).toLocaleString())}. Check current conditions before launching.</p>${t.route.slug ? `<a class="trip-button" href="${esc(tripRouteUrl(t.route))}">View route</a>` : ''}</section>`; }
    catch (e) { root.textContent = e instanceof Error ? e.message : 'This link is unavailable.'; } root.setAttribute('aria-busy', 'false'); return;
  }
  if (invite) void loadInvitation();
  if (incomingPlan && !editing && !selected) editing = structuredClone(incomingPlan);
  if (!settingsPage && !authPage) await restoreGuestEditor();
  render();
  void publicApi.getCatalog().then(r => { catalog = r.rivers; if (editing) render(); }).catch(() => {});
  auth = configuredAuth;
  if (auth && isSignInWithEmailLink(auth, location.href)) { emailCallbackDetected = true; emailShown = true; }
  if (!auth) { loading = false; render(); return; }
  onAuthStateChanged(auth, async next => {
    if (next && repo?.uid === next.uid) { user = next; if (!editing && !logEdit) render(); return; }
    const wasSignedIn = Boolean(user);
    const initialAuthState = !authStateInitialized;
    authStateInitialized = true;
    unsubscribe?.();
    const previous = repo; repo = null; user = next; vehicleEdit = null; recovery = null; link = '';
    if (previous) { await previous.settle().catch(() => {}); previous.dispose(); }
    if (!next) {
      logEdit = null;
      if (wasSignedIn) {
        editing = null;
        try { await restoreGuestEditor(); } catch { notice = 'Browser storage is unavailable. Guest drafts cannot be restored on this device.'; error = true; }
      } else if (!initialAuthState) {
        editing = null;
      }
      if (incomingPlan && !editing && !selected && !settingsPage && !authPage) editing = structuredClone(incomingPlan);
      loading = false; render(); return;
    }
    editing = null; logEdit = null;
    guestSignIn = false; pausedEditor = null;
    if (authPage && !emailShown && !emailCallbackDetected && params.get('next') === 'saved') { location.replace('/favorites/'); return; }
    if (authPage && !emailShown && !emailCallbackDetected && params.get('next') === 'settings') { location.replace('/account/settings/'); return; }
    loading = true; render();

    const session = next.uid, boundApi = createTripsClient(location.origin, async () => {
      if (auth?.currentUser?.uid !== session) throw new Error('This account session has ended.');
      return next.getIdToken();
    });
    const current = new TripRepository(session, boundApi, storage, uuid); repo = current;
    try {
      await current.load();
      if (repo !== current) return;
      unsubscribe = current.subscribe(() => { if (!editing && !logEdit && !recovery && !busy && !vehicleEdit && !root.querySelector('details[data-vehicle-editor][open]') && !root.contains(document.activeElement)) render(); });
      const guest = await storage.getItem('trip-guest-draft');
      if (guest && !settingsPage) { const draft = JSON.parse(guest); await current.savePlan(draft.plan, draft.id); await storage.removeItem('trip-guest-draft'); selected = draft.id; history.replaceState(null, '', `/trips/?id=${selected}`); }
      await sync();
      if (repo !== current) return;
      let editor = await storage.getItem('trip-editor:' + session);
      const guestEditor = !settingsPage ? await storage.getItem('trip-editor:guest') : null;
      if (guestEditor) {
        const draft = JSON.parse(guestEditor);
        if (draft.editing && !editor) {
          await storage.setItem('trip-editor:' + session, guestEditor);
          await storage.removeItem('trip-editor:guest');
          editor = guestEditor;
        } else if (draft.editing) {
          notice = 'Your earlier account draft is open. Your guest draft is still saved on this device.';
        }
      }
      if (editor && !settingsPage && !invite) {
        const draft = JSON.parse(editor);
        const destination = draft.selected || draft.editingId || draft.logEdit?.sourceTripId || '';
        if ((!selected || selected === destination) && (!incomingPlan || draft.editing?.route.slug === incomingPlan.route.slug)) restoreEditor(draft);
      }
      if (incomingPlan && !editing && !selected) editing = structuredClone(incomingPlan);
      if (selected && !current.getSnapshot().trips[selected] && !invite) {
        try { await api.get(selected); await sync(); } catch { notice = 'This trip is unavailable or you need an invitation.'; }
      }
      loading = false; render();
    } catch (e) { if (repo === current) { loading = false; loadFailed = true; message(e instanceof Error ? e.message : 'Could not load trips.', true); } }
  });
  try { await finishEmailCallback(); }
  catch (e) { pendingEmail = getLocal('trip-email') || pendingEmail; emailShown = true; notice = authMessage(e); error = true; }
  render();

}
window.addEventListener('online', () => void sync());
document.addEventListener('visibilitychange', () => { if (!document.hidden) void sync(); });
void start().catch(e => { loading = false; loadFailed = true; message(e instanceof Error ? e.message : 'Could not open your trips.', true); });

window.addEventListener('paddletoday:sign-out', event => {
  if (!user || view) return;
  event.preventDefault();
  if (busy) return;
  busy = true;
  void run('sign-out', '').catch(e => message(authMessage(e), true)).finally(() => { busy = false; render(); });
});

// Finish the debounce before navigating away to sign in, including incomplete drafts.
document.querySelector('[data-account-sign-in]')?.addEventListener('click', event => {
  if (user || !editing) return;
  event.preventDefault();
  capturePlan();
  if (editorTimer) clearTimeout(editorTimer);
  const href = (event.currentTarget as HTMLAnchorElement).href;
  void storage.setItem('trip-editor:guest', JSON.stringify({ editing, editingId: '', logEdit: null }))
    .then(() => location.assign(href)).catch(e => message(authMessage(e), true));
});
