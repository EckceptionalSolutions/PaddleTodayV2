/// <reference types="astro/client" />
import { getAuth, onAuthStateChanged, GoogleAuthProvider, EmailAuthProvider, signInWithPopup, linkWithPopup, linkWithCredential, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signOut, type User } from 'firebase/auth';
import { createTripsClient, createPaddleTodayApiClient, TripRepository, type PendingTripWork } from '@paddletoday/api-client';
import { newTripPlan, isTripPlan, tripPlan, tripTimeIssue, historicalWaterSuggestion, type Trip, type TripPlan, type PaddleLogInput, type TripCommand, type RiverAccessPoint, type RiverCatalogItem, type ShuttleVehicle, type TripRoute } from '@paddletoday/api-contract';
import { tripBrowserStorage as storage } from '../lib/trip-browser-storage';
import { webFeatureFlags } from '../lib/web-feature-flags';
import { firebaseWebAuth } from '../lib/firebase-web';
import { toDataURL } from 'qrcode';

const root = document.getElementById('trips-app')!;
const uuid = () => crypto.randomUUID();
const getLocal = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
const setLocal = (key: string, value: string) => { try { localStorage.setItem(key, value); return true; } catch { return false; } };
const removeLocal = (key: string) => { try { localStorage.removeItem(key); } catch { /* Storage can be unavailable in private browsing. */ } };
const getSession = (key: string) => { try { return sessionStorage.getItem(key); } catch { return null; } };
const setSession = (key: string, value: string) => { try { sessionStorage.setItem(key, value); } catch { /* Firebase also limits repeated email-link requests. */ } };
const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const button = (action: string, label: string, id = '', primary = false) => `<button type="button" data-action="${action}" data-id="${esc(id)}" class="${primary ? 'primary' : ''}">${esc(label)}</button>`;
const tripTab = (name: 'upcoming' | 'past', label: string) => `<button type="button" role="tab" id="trip-tab-${name}" aria-controls="trip-list-panel" aria-selected="${tab === name}" tabindex="${tab === name ? 0 : -1}" data-action="${name}">${label}</button>`;
const field = (name: string, label: string, value: string, type = 'text', wide = false, required = false) => `<label class="${wide ? 'trip-wide' : ''}">${esc(label)}<input name="${name}" type="${type}" value="${esc(value)}" ${required ? 'required aria-required="true"' : ''} ${name === 'email' ? 'autocomplete="email" placeholder="you@example.com"' : ''}></label>`;
const area = (name: string, label: string, value: string) => `<label class="trip-wide">${esc(label)}<textarea name="${name}">${esc(value)}</textarea></label>`;
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
let tab: 'upcoming' | 'past' = 'upcoming', notice = '', error = false, busy = false, emailShown = false, linkEmail = false, emailCallbackDetected = false, pendingEmail = '';
let editing: TripPlan | null = null, editingId = '', logEdit: PaddleLogInput | null = null, logId = '';
let editingBaseline: TripPlan | undefined;
let logRevision = 0;
let vehicleEdit: { vehicle: ShuttleVehicle; revision: number } | null = null;
let access: RiverAccessPoint[] = [], catalog: RiverCatalogItem[] = [], search = '';
let invitePreview: { title: string; date: string; route: TripRoute } | null = null, inviteError = '';
let link = '', linkPurpose: 'invite' | 'view' | 'phone' | '' = '', recovery: PendingTripWork | null = null, auth: ReturnType<typeof getAuth> | null = null;
const publicApi = createPaddleTodayApiClient({ baseUrl: location.origin });
const api = createTripsClient(location.origin, async () => {
  if (!user) throw new Error('Sign in to continue.');
  return user.getIdToken();
});
const clientState = () => repo?.getSnapshot();
const message = (text: string, failed = false) => { notice = text; error = failed; render(); };
function routeLabel(c: RiverCatalogItem) { return `${c.river.name} · ${c.river.region || c.river.state} · ${c.river.slug.replaceAll('-', ' ')}`; }
function routeFields(route: TripPlan['route']) {
  const options = (value: string) => `<option value="">Choose an access point</option>${access.map(a => `<option value="${esc(a.id)}" ${a.id === value ? 'selected' : ''}>${esc(a.name)}</option>`).join('')}`;
  return `${field('routeName', 'River or location', route.name, 'text', false, true)}<label>Choose a route (optional)<input name="routeChoice" list="trip-route-catalog" value="${esc(catalog.find(c => c.river.slug === route.slug) ? routeLabel(catalog.find(c => c.river.slug === route.slug)!) : route.name)}" placeholder="Search available routes"><input type="hidden" name="slug" value="${esc(route.slug)}"><datalist id="trip-route-catalog">${catalog.map(c => `<option value="${esc(routeLabel(c))}"></option>`).join('')}</datalist></label>
    <div class="trip-wide">${button('load-route', 'Load route access points')}</div>
    ${access.length ? `<label>Put-in<select name="putInId">${options(route.putInId)}</select></label><label>Take-out<select name="takeOutId">${options(route.takeOutId)}</select></label>` : `${field('putInName', 'Put-in', route.putInName)}${field('takeOutName', 'Take-out', route.takeOutName)}`}`;
}
function render() {
  if (view) return;
  const state = clientState(), trip = state?.trips[selected];
  const alreadyJoined = Boolean(user && trip);
  root.innerHTML = `<div data-trip-status role="status" class="trip-notice ${error ? 'error' : ''}" ${notice ? '' : 'hidden'}>${esc(notice)}</div>
    ${user ? `<div class="trip-toolbar"><span>${esc(user.displayName || user.email || 'Your account')}</span><div class="trip-actions">${button('account', 'Account settings')}${button('refresh', 'Refresh')}${button('export', 'Export my trips')}${!user.providerData.some(p => p.providerId === GoogleAuthProvider.PROVIDER_ID) ? button('link-google', 'Connect Google') : ''}${!user.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID) ? button('link-email', 'Connect email') : ''}${button('sign-out', 'Sign out')}</div></div>` : ''}
    ${invite ? `<section class="trip-card"><h2>${invitePreview ? esc(invitePreview.title) : 'Trip invitation'}</h2><p>${invitePreview ? `${esc(invitePreview.route.name)} · ${esc(invitePreview.date || 'Date to be decided')}` : esc(inviteError || 'Checking this invitation…')}</p>${invitePreview ? `<p>Join this trip to see the itinerary, respond, and coordinate with your group.</p>${alreadyJoined ? '<p>You already have access to this trip.</p>' : user ? button('join', 'Join trip', '', true) : '<p>Sign in below to join.</p>'}` : ''}</section>` : ''}
    ${!user && !editing ? authMarkup() : ''}
    ${emailShown ? emailLinkMarkup() : ''}
    ${state?.pending.length ? `<p class="trip-notice">${state.pending.length} change(s) waiting to sync.${state.pending.filter(p => p.error).map(p => `<br>${esc(p.error)} ${button('recover', 'Review saved change', p.key)}`).join('')}</p>` : ''}
    ${recovery ? recoveryMarkup() : editing ? planMarkup() : logEdit ? logMarkup() : trip ? detailMarkup(trip) : listMarkup()}
    ${link ? `<section class="trip-card"><h2>${linkPurpose === 'invite' ? 'Invite paddlers' : linkPurpose === 'view' ? 'View-only link' : 'Open this trip on your phone'}</h2><input class="trip-link" aria-label="Trip link" readonly value="${esc(link)}"><p>${linkPurpose === 'invite' ? 'Anyone with this link can join and edit the itinerary for seven days.' : linkPurpose === 'view' ? 'Anyone with this link can view the route, access points, date, and itinerary for 30 days. It does not show paddler names, shuttle details, or private logs and photos.' : 'Open this link on your phone to continue planning.'} Creating another link of the same type replaces the previous one.</p>${button('copy', 'Copy link')} ${button('close-link', 'Close')}<div data-qr></div></section>` : ''}`;
  root.querySelectorAll<HTMLButtonElement>('button').forEach(b => { b.disabled = busy; });
  if (link && !link.includes('#')) void toDataURL(link, { width: 190, margin: 2 }).then(url => {
    const target = root.querySelector('[data-qr]'); if (target) { const img = new Image(); img.src = url; img.className = 'trip-qr'; img.alt = 'Scan to open this trip on your phone'; target.replaceChildren(img); }
  }).catch(() => {});
  if (logEdit) void loadPhotos();
}
function authMarkup() {
  return `<section class="trip-auth"><p class="trip-eyebrow">Welcome to PaddleToday</p><h2>Your next paddle starts here</h2><div class="trip-actions">${button('google', 'Continue with Google', '', true)}${!emailShown ? button('email', 'Continue with email') : ''}</div><p class="trip-muted">You can also start a trip before signing in.</p></section>`;
}
function emailLinkMarkup() {
  return `<section class="trip-card"><h2>${linkEmail ? 'Connect email to your account' : 'Continue with email'}</h2><div class="trip-fields">${field('email', 'Email address', pendingEmail || getLocal('trip-email') || (linkEmail ? user?.email || '' : ''), 'email', true)}</div><div class="trip-actions">${button('send-email', linkEmail ? 'Send link to connect email' : 'Send sign-in link', '', true)}${emailCallbackDetected ? button('complete-email', 'Finish email sign-in') : ''}${button('cancel-email', 'Cancel')}</div></section>`;
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
function listMarkup() {
  const state = clientState();
  const trips = Object.values(state?.trips ?? {}).filter(t => t.title.toLowerCase().includes(search.toLowerCase())).sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
  const logs = Object.values(state?.logs ?? {}).filter(l => l.route.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => b.date.localeCompare(a.date));
  const rows = tab === 'upcoming' ? trips.filter(t => t.status === 'planned').map(t => `<article class="trip-card"><span class="trip-badge">${t.date ? esc(t.date) : 'Draft'}</span><h2>${esc(t.title)}</h2><p>${esc(t.route.putInName)} → ${esc(t.route.takeOutName)}</p><p class="trip-muted">${t.members.length > 1 ? `${t.members.length} paddlers` : 'Your trip'}${(state?.viewed[t.id] ?? 0) < t.revision ? ' · Updated since your last visit' : ''}</p>${button('open', 'Open trip', t.id, true)}</article>`)
    : logs.map(l => `<article class="trip-card"><p class="trip-eyebrow">${esc(l.date)}</p><h2>${esc(l.route.name)}</h2><p>${esc(l.notes.slice(0, 160))}</p><p class="trip-muted">${l.paddleAgain === 'yes' ? 'Would paddle again' : l.paddleAgain === 'no' ? 'Would choose another route' : ''}</p>${button('edit-log', 'Open paddle log', l.id)} ${button('again-log', 'Plan again', l.id)}</article>`);
  return `<div class="trip-toolbar"><h1>My trips</h1><div class="trip-actions">${button('new', 'Plan a trip', '', true)}${user ? button('new-log', 'Add past paddle') : ''}</div></div>
    <div class="trip-tabs" role="tablist" aria-label="Trip lists">${tripTab('upcoming', 'Upcoming')}${tripTab('past', 'Past')}</div>
    <section id="trip-list-panel" role="tabpanel" aria-labelledby="trip-tab-${tab}" tabindex="0"><label>Find a trip <input class="trip-search" name="search" value="${esc(search)}" placeholder="River or trip name"></label><div class="trip-grid" style="margin-top:20px">${rows.join('') || `<div class="trip-card trip-empty"><h2>${tab === 'past' ? 'Remember your time on the water' : 'Where will you paddle next?'}</h2><p>${tab === 'past' ? 'Add a paddle to start your personal log.' : 'Choose a route, make a plan, and invite your paddling partners.'}</p></div>`}</div>
    ${tab === 'past' ? trips.filter(t => t.status !== 'planned').map(t => `<article class="trip-card"><h3>${esc(t.title)} · ${esc(t.status)}</h3>${button('open', 'Open plan', t.id)} ${button('log-trip', 'Log my paddle', t.id)}</article>`).join('') : ''}</section>`;
}
function planMarkup() {
  const p = editing!;
  return `<section class="trip-editor"><p class="trip-eyebrow">${editingId ? 'Edit trip' : 'New trip'}</p><h1>Plan your paddle</h1><form data-plan><div class="trip-fields">${field('title', 'Trip title', p.title, 'text', true, true)}${routeFields(p.route)}${field('date', 'Planned date (optional)', p.date, 'date')}${field('launch', 'Launch time (optional)', p.launch, 'time')}${field('expected', 'Expected return (optional)', p.expected, 'time')}${timeZoneField(p.timeZone)}
    </div><h2>Shared itinerary</h2><p class="trip-muted">These stops are visible to trip members and anyone with a view link.</p>${p.itinerary.map((s, i) => `<div class="trip-stop trip-fields">${field(`stop-time-${i}`, 'Time', s.time, 'time')}${field(`stop-location-${i}`, 'Meeting place', s.location)}${area(`stop-note-${i}`, 'Details', s.note)}${button('remove-stop', 'Remove stop', String(i))}</div>`).join('')}<div class="trip-actions">${button('add-stop', 'Add meeting stop')}${button('save-plan', user ? 'Save trip' : 'Save and sign in', '', true)}${button('cancel-edit', 'Back')}</div></form></section>`;
}
function detailMarkup(t: Trip) {
  const owner = t.ownerUid === user?.uid, state = clientState()!;
  const assigned = new Set(t.shuttle.flatMap(v => [v.driverUid, ...v.passengers]));
  const missing = t.members.filter(m => m.rsvp === 'going' && !assigned.has(m.uid)).length;
  return `<section class="trip-card">${button('home', '← My trips')}<p class="trip-eyebrow">${esc(t.status)} · ${esc(t.date || 'Date to be decided')}</p><h1>${esc(t.title)}</h1><p>${esc(t.route.name)} · ${esc(t.route.putInName)} → ${esc(t.route.takeOutName)}</p><p>${esc(t.launch || 'Launch time to be decided')} ${esc(t.timeZone)}${t.expected ? ` · Return ${esc(t.expected)}` : ''}</p><div class="trip-actions">${button('edit', 'Edit trip', t.id, true)}${webFeatureFlags.tripAppHandoff ? button('phone', 'Open on phone') : ''}${button('log-trip', 'Log this paddle', t.id)}${button('again', 'Plan again', t.id)}${t.route.slug ? `<a class="trip-button" href="/rivers/${esc(t.route.slug)}/">Route & current conditions</a>` : ''}</div>
    <h2>Itinerary</h2>${t.itinerary.map(s => `<p><strong>${esc(s.time)} ${esc(s.location)}</strong><br>${esc(s.note)}</p>`).join('') || '<p>No meeting stops yet.</p>'}
    <h2>Paddling partners</h2><div class="trip-fields">${field('memberName', 'My name for this trip', t.members.find(m => m.uid === user?.uid)?.name || '')}</div>${button('member-name', 'Update my name')}${t.members.map(m => `<p>${esc(m.name)} · ${esc(m.rsvp)} ${m.role === 'owner' ? '· Organizer' : ''}${owner && m.uid !== user?.uid ? button('remove-member', 'Remove', m.uid) + button('transfer', 'Make organizer', m.uid) : ''}</p>`).join('')}<div class="trip-actions">${button('rsvp', 'Going', 'going')}${button('rsvp', 'Maybe', 'maybe')}${button('rsvp', 'Not going', 'not-going')}</div>
    ${owner ? `<div class="trip-actions">${button('invite', 'Invite people')}${button('share', 'Share view-only link')}${button('revoke-invite', 'Revoke invitation')}${button('revoke-view', 'Revoke view link')}</div>` : button('leave', 'Leave trip')}
    <h2>Shuttle ${missing ? `<span class="trip-badge">${missing} still need a ride</span>` : ''}</h2><p class="trip-muted">Shuttle details are visible only to trip members.</p>${t.shuttle.map(v => `<article class="trip-card"><h3>${esc(v.label)}</h3><p>Driver: ${esc(t.members.find(m => m.uid === v.driverUid)?.name)} · ${v.passengers.length}/${v.seats} passenger seats filled</p><p>${esc(v.meeting)} ${esc(v.time)} · Car stays at ${esc(v.parkedAt)}</p><p>${esc(v.note)}</p><p>${v.passengers.map(p => esc(t.members.find(m => m.uid === p)?.name)).join(', ')}</p>${button('seat', v.passengers.includes(user!.uid) ? 'Leave this ride' : 'Take a seat', v.passengers.includes(user!.uid) ? '' : v.id)}${owner || v.driverUid === user?.uid ? button('edit-vehicle', 'Edit vehicle', v.id) + button('remove-vehicle', 'Remove vehicle', v.id) : ''}</article>`).join('')}
    <details data-vehicle-editor ${vehicleEdit ? 'open' : ''}><summary>${vehicleEdit ? 'Edit shuttle vehicle' : 'Add my shuttle vehicle'}</summary><div class="trip-fields">${field('vehicleLabel', 'Vehicle label', vehicleEdit ? String(vehicleEdit.vehicle.label) : '')}${field('seats', 'Passenger seats', vehicleEdit ? String(vehicleEdit.vehicle.seats) : '3', 'number')}${field('meeting', 'Meet at', vehicleEdit ? String(vehicleEdit.vehicle.meeting) : '')}${field('meetingTime', 'Meeting time', vehicleEdit ? String(vehicleEdit.vehicle.time) : '', 'time')}${field('parkedAt', 'Car will stay at', vehicleEdit ? String(vehicleEdit.vehicle.parkedAt) : '')}${area('vehicleNote', 'Shuttle notes', vehicleEdit ? String(vehicleEdit.vehicle.note) : '')}</div>${button('vehicle', vehicleEdit ? 'Save vehicle' : 'Add vehicle')}${vehicleEdit ? button('cancel-vehicle', 'Cancel edit') : ''}</details>
    <h2>Recent changes</h2>${t.activity.slice(-5).reverse().map(a => `<p class="trip-muted">${esc(t.members.find(m => m.uid === a.actor)?.name || 'Paddler')} · ${esc(a.action)} · ${esc(new Date(a.at).toLocaleString())}</p>`).join('')}
    ${state.recovery[t.id] ? `<details><summary>Original draft details · review time zone</summary><p>Your old draft did not record a time zone. Confirm it in Edit trip. Original private details are retained here.</p><pre class="trip-recovery">${esc(state.recovery[t.id])}</pre></details>` : ''}
    ${owner ? `<div class="trip-actions">${button('complete', 'Mark plan completed')}${button('cancel-trip', 'Cancel trip')}${button('delete', 'Delete trip')}</div>` : ''}<p class="trip-muted">Review current conditions before launching. PaddleToday does not monitor your trip.</p></section>`;
}
function logMarkup() {
  const l = logEdit!, water = l.water[0], savedPhotos = clientState()?.logs[logId]?.photos ?? [];
  const queuedPhotos = clientState()?.pending.filter(p => p.kind === 'photo' && p.id === logId) ?? [];
  const remainingPhotos = Math.max(0, 10 - savedPhotos.length - queuedPhotos.length);
  return `<section class="trip-editor"><p class="trip-eyebrow">Private paddling log</p><h1>${logId ? 'Your paddle' : 'Remember this paddle'}</h1><p>Your notes and photos are only visible to you.</p><div class="trip-fields">${routeFields(l.route)}${field('logDate', 'Date paddled', l.date, 'date', false, true)}${field('logTime', 'Launch time (optional)', l.time, 'time')}${timeZoneField(l.timeZone)}<label>Would paddle again<select name="paddleAgain">${[['','Not decided'],['yes','Yes'],['no','No'],['unsure','Unsure']].map(([v, label]) => `<option value="${v}" ${v === l.paddleAgain ? 'selected' : ''}>${label}</option>`).join('')}</select></label>${area('notes', 'Notes', l.notes)}
    ${field('level', 'Water level / flow (optional)', water?.value || '')}${field('unit', 'Unit (e.g. ft, cfs, m³/s)', water?.unit || '')}${field('gauge', 'Gauge / observation location', water?.gaugeName || '')}${field('measuredAt', 'Measurement date and time', water?.measuredAt || '')}${field('source', 'Source (e.g. personal observation, USGS)', water?.source || '')}</div>${button('water-history', 'Find a recorded water reading')}<p class="trip-muted">Record what you observed on this paddle. A current reading is not a historical reading.</p><div class="trip-actions">${button('save-log', 'Save paddle', '', true)}${button('cancel-log', 'Back')}${logId ? button('delete-log', 'Delete paddle') : ''}</div>
    ${logId ? `<h2>Photos</h2><p class="trip-muted">${savedPhotos.length} saved · ${queuedPhotos.length} waiting · ${remainingPhotos} slot(s) available. Each photo can be up to 10 MiB.</p>${queuedPhotos.map(p => `<p class="trip-muted">${p.error ? `Upload needs attention: ${esc(p.error)} ${button('recover', 'Review photo', p.key)}` : 'Photo upload waiting to sync.'}</p>`).join('')}<input type="file" data-photos accept="image/*" multiple ${remainingPhotos ? '' : 'disabled'} aria-label="Add paddle photos" ${remainingPhotos ? `data-limit="${remainingPhotos}"` : ''}><div class="trip-photo-grid">${savedPhotos.map(p => `<figure><img data-photo="${p.id}" alt="${esc(p.caption || 'Photo from this paddle')}"><figcaption>${esc(p.caption)}</figcaption>${button('remove-photo', 'Remove photo', p.id)}</figure>`).join('')}</div>` : '<p>Save the paddle to add photos.</p>'}</section>`;
}
function recoveryMarkup() {
  const item = recovery!;
  const local = item.kind === 'trip'
    ? item.input.command.type === 'plan' ? planSummary(item.input.command.plan) : `Your saved action: ${item.input.command.type}`
    : item.kind === 'log' ? item.input.value ? logSummary(item.input.value) : 'Your saved action: delete this paddle log'
      : `Photo upload${item.caption ? `: ${item.caption}` : ''}`;
  const latest = item.latest
    ? item.kind === 'trip' && 'members' in item.latest ? planSummary(tripPlan(item.latest))
      : item.kind !== 'trip' && 'photos' in item.latest ? logSummary(item.latest) : ''
    : '';
  const label = item.kind === 'photo' ? 'Retry photo upload' : 'Apply my saved changes';
  const latestAvailable = Boolean(item.latest && (item.kind === 'trip' ? 'members' in item.latest : 'photos' in item.latest));
  const canApply = item.errorStatus === 409 && latestAvailable && !(item.kind === 'trip' && item.input.command.type === 'create');
  return `<section class="trip-card"><h2>Choose which changes to keep</h2><p>${esc(item.error)}</p><h3>Your saved changes</h3><p class="trip-recovery">${esc(local)}</p><h3>Latest account copy</h3><p class="trip-recovery">${esc(latest || 'The saved account copy is unavailable.')}</p><div class="trip-actions">${button('copy-recovery', 'Copy my change')}${button('keep-latest', latestAvailable ? 'Keep account copy' : 'Remove inaccessible change', item.key)}${canApply ? button('retry-recovery', label, item.key, true) : ''}${button('close-recovery', 'Back')}</div>${canApply ? '<p>Applying your changes merges only the fields you changed onto the latest saved trip.</p>' : '<p>This saved operation cannot be replayed against the current account copy. Copy it before removing it if you want to keep a reference.</p>'}</section>`;
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
const value = (name: string) => (root.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`[name="${name}"]`)?.value ?? '').trim();
function readRoute(previous: TripPlan['route']) {
  const putInId = access.length ? value('putInId') : previous.putInId, takeOutId = access.length ? value('takeOutId') : previous.takeOutId;
  const chosen = catalog.find(c => routeLabel(c) === value('routeChoice'));
  return { slug: chosen?.river.slug || value('slug'), name: value('routeName'), putInId, takeOutId, putInName: access.find(a => a.id === putInId)?.name || value('putInName'), takeOutName: access.find(a => a.id === takeOutId)?.name || value('takeOutName') };
}
function capturePlan() {
  if (!editing) return;
  editing = { ...editing, title: value('title'), route: readRoute(editing.route), date: value('date'), launch: value('launch'), expected: value('expected'), timeZone: value('timeZone'),
    itinerary: editing.itinerary.map((s, i) => ({ ...s, time: value(`stop-time-${i}`), location: value(`stop-location-${i}`), note: value(`stop-note-${i}`) })) };
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
  return form.reportValidity();
}
function captureLog() {
  if (!logEdit) return;
  logEdit = { ...logEdit, route: readRoute(logEdit.route), date: value('logDate'), time: value('logTime'), timeZone: value('timeZone'), notes: value('notes'), paddleAgain: value('paddleAgain') as PaddleLogInput['paddleAgain'],
    water: value('level') || value('gauge') ? [{ gaugeId: '', gaugeName: value('gauge'), value: value('level'), unit: value('unit'), measuredAt: value('measuredAt'), source: value('source'), note: '' }] : [] };
}
function beginLog(t?: Trip) {
  logRevision = t ? clientState()?.logs[t.id]?.revision ?? 0 : 0;
  logId = t?.id || ''; access = [];
  logEdit = t && clientState()?.logs[t.id] ? clientState()!.logs[t.id]! : { sourceTripId: t?.id || null, route: t ? tripPlan(t).route : newTripPlan().route, date: t?.date || new Date().toLocaleDateString('en-CA'), time: t?.launch || '', timeZone: t?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone, notes: '', paddleAgain: '', water: [] };
  // A new source-trip log has an ID but must be saved before accepting photos.
  if (!clientState()?.logs[logId]) logId = '';
}
async function sync() {
  if (!repo || document.hidden || !navigator.onLine) return;
  try {
    await repo.sync();
    notice = repo.getSnapshot().pending.length ? 'Some changes are waiting for review or upload.'
      : editing || logEdit || vehicleEdit ? 'Your open draft has not been saved to your trips yet.' : 'All changes saved.';
    error = false;
  }
  catch (e) { notice = e instanceof Error ? e.message : 'Changes are saved on this device.'; error = true; }
  if (!editing && !logEdit && !vehicleEdit && !root.querySelector('details[data-vehicle-editor][open]') && !root.contains(document.activeElement)) render();
}
async function run(action: string, id: string) {
  const t = clientState()?.trips[selected];
  if (action === 'account') { location.assign('/account/'); return; }
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
    removeLocal('trip-email'); removeLocal('trip-email-mode'); removeLocal('trip-email-uid'); pendingEmail = ''; emailShown = false; history.replaceState(null, '', `/trips/${selected ? `?id=${selected}` : ''}`); return;
  }
  if (action === 'sign-out') {
    const hasPending = Boolean(repo?.getSnapshot().pending.length);
    const hasDraft = Boolean(editing || logEdit || root.querySelector('details[data-vehicle-editor][open]'));
    if ((hasPending || hasDraft) && !confirm(`Signing out will discard ${[hasPending && 'changes waiting to sync', hasDraft && 'unfinished editor changes'].filter(Boolean).join(' and ')}. Continue?`)) return;
    if (editorTimer) clearTimeout(editorTimer);
    const uid = repo?.uid, previous = repo;
    await previous?.settle();
    await signOut(auth!);
    if (hasDraft) await storage.removeItem('trip-editor:' + (uid || 'guest'));
    if (uid) await storage.clearAccount(uid);
    return;
  }
  if (action === 'new') { selected = ''; editingId = ''; editing = newTripPlan(); access = []; return; }
  if (action === 'home') { vehicleEdit = null; selected = ''; history.replaceState(null, '', '/trips/'); return; }
  if (action === 'upcoming' || action === 'past') { tab = action; return; }
  if (action === 'open') { selected = id; history.replaceState(null, '', `/trips/?id=${id}`); await repo?.markViewed(id); return; }
  if (action === 'edit') { editingId = id; editing = tripPlan(clientState()!.trips[id]!); editingBaseline = structuredClone(editing); access = []; return; }
  if (action === 'cancel-edit') { editing = null; return; }
  if (action === 'add-stop') { capturePlan(); editing!.itinerary.push({ id: uuid(), time: '', location: '', note: '' }); return; }
  if (action === 'remove-stop') { capturePlan(); editing!.itinerary.splice(Number(id), 1); return; }
  if (action === 'load-route') {
    capturePlan(); captureLog();
    const slug = editing?.route.slug || logEdit?.route.slug;
    if (!slug) throw new Error('Choose a route from the route list first.');
    const { result } = await publicApi.getRiverDetail(slug);
    access = result.river.accessPoints ?? [result.river.putIn, result.river.takeOut].filter((a): a is RiverAccessPoint => !!a);
    const route = { slug, name: result.river.name, putInId: result.river.putIn?.id || '', putInName: result.river.putIn?.name || '', takeOutId: result.river.takeOut?.id || '', takeOutName: result.river.takeOut?.name || '' };
    if (editing) editing.route = route; if (logEdit) logEdit.route = route; return;
  }
  if (action === 'save-plan') {
    capturePlan();
    if (editorTimer) clearTimeout(editorTimer);
    if (!validatePlanFields()) { preserveEditorAfterAction = true; return; }
    if (!isTripPlan(editing)) throw new Error('Enter a title and location, and check your date, time, and time zone.');
    if (!repo) { await storage.setItem('trip-guest-draft', JSON.stringify({ id: uuid(), plan: editing })); await storage.removeItem('trip-editor:guest'); editing = null; notice = 'Your draft is saved here. Sign in to continue.'; return; }
    selected = await repo.savePlan(editing!, editingId || undefined, editingId ? editingBaseline : undefined); editing = null; await storage.removeItem('trip-editor:' + repo.uid); await sync(); return;
  }
  if (action === 'join') { await repo!.command(selected, { type: 'join', token: invite }); await sync(); if (clientState()?.trips[selected]) { invite = ''; history.replaceState(null, '', `/trips/?id=${selected}`); } return; }
  if (action === 'refresh') { await sync(); return; }
  if (action === 'phone') {
    if (!webFeatureFlags.tripAppHandoff) return;
    linkPurpose = 'phone'; link = `${location.origin}/trips/?id=${selected}`; return;
  }
  if (action === 'close-link') { link = ''; linkPurpose = ''; return; }
  if (action === 'copy') { await navigator.clipboard.writeText(link); notice = 'Link copied.'; return; }
  if (action === 'invite' || action === 'share') {
    const token = crypto.randomUUID().replaceAll('-', '') + crypto.randomUUID().replaceAll('-', ''), purpose = action === 'invite' ? 'invite' : 'view';
    await repo!.command(selected, { type: 'link', purpose, token }); await repo!.sync();
    if (clientState()!.pending.some(p => p.id === selected)) throw new Error('Connect and finish syncing this trip before sharing a link.');
    linkPurpose = purpose; link = `${location.origin}/trips/?id=${selected}#${purpose}=${token}`; return;
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
  if (action === 'cancel-log') { logEdit = null; return; }
  if (action === 'save-log') { captureLog(); logId = await repo!.saveLog(logEdit!, logId || undefined, logRevision); logRevision = repo!.getSnapshot().logs[logId]!.revision; await storage.removeItem('trip-editor:' + repo!.uid); await sync(); return; }
  if (action === 'delete-log') { if (confirm('Delete this personal log and its photos?')) { await repo!.deleteLog(logId); logEdit = null; await sync(); } return; }
  if (action === 'remove-photo') { await api.removePhoto(logId, id); await sync(); return; }
  if (action === 'again' || action === 'again-log') { const route = action === 'again' ? clientState()!.trips[id]!.route : clientState()!.logs[id]!.route; editing = newTripPlan(route); editingId = ''; access = []; return; }
  if (action === 'recover') { recovery = clientState()!.pending.find(p => p.key === id)!; return; }
  if (action === 'close-recovery') { recovery = null; return; }
  if (action === 'copy-recovery') { await navigator.clipboard.writeText(recovery!.kind === 'trip' ? recovery!.input.command.type === 'plan' ? planSummary(recovery!.input.command.plan) : `Saved trip action: ${recovery!.input.command.type}` : recovery!.kind === 'log' ? recovery!.input.value ? logSummary(recovery!.input.value) : 'Delete paddle log' : `Photo upload: ${recovery!.caption}`); return; }
  if (action === 'discard-recovery') { if (confirm('Discard this pending change and use the latest saved version?')) { await repo!.discard(recovery!.key); recovery = null; } return; }
  if (action === 'keep-latest') { await repo!.keepLatest(id); recovery = null; return; }
  if (action === 'retry-recovery') { await repo!.retry(id); recovery = null; return; }
  if (action === 'export') { const result = await api.export(); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })); a.download = 'paddletoday-trips.json'; a.click(); URL.revokeObjectURL(a.href); return; }
  let command: TripCommand | null = null;
  if (action === 'rsvp') command = { type: 'rsvp', rsvp: id as 'going' | 'maybe' | 'not-going' };
  if (action === 'edit-vehicle') { const v = t?.shuttle.find(v => v.id === id); if (v) vehicleEdit = { vehicle: structuredClone(v), revision: t!.revision }; return; }
  if (action === 'cancel-vehicle') { vehicleEdit = null; return; }
  if (action === 'seat') command = { type: 'seat', vehicleId: id || null };
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
  busy = true; notice = ''; error = false;
  void run(target.dataset.action!, target.dataset.id || '').catch(e => { notice = authMessage(e); error = true; }).finally(() => {
    busy = false;
    if (preserveEditorAfterAction) preserveEditorAfterAction = false;
    else render();
    if (restoreTabFocus) root.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]')?.focus();
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
root.addEventListener('input', () => {
  if (!editing && !logEdit) return;
  notice = 'Unsaved edits are kept in this editor. Save to add them to My trips.'; error = false;
  const status = root.querySelector<HTMLElement>('[data-trip-status]');
  if (status) { status.textContent = notice; status.hidden = false; status.classList.remove('error'); }
  capturePlan(); captureLog();
  if (editorTimer) clearTimeout(editorTimer);
  const key = 'trip-editor:' + (repo?.uid || 'guest');
  const data = JSON.stringify({ editing, editingId, editingBaseline, logEdit, logId, logRevision });
  editorTimer = setTimeout(() => void storage.setItem(key, data).then(() => {
    const current = root.querySelector<HTMLElement>('[data-trip-status]');
    if (current && (editing || logEdit)) { notice = 'Draft saved on this device. Save it to sync with your account.'; current.textContent = notice; current.hidden = false; }
  }).catch(e => { notice = e.message; error = true; const current = root.querySelector<HTMLElement>('[data-trip-status]'); if (current) { current.textContent = notice; current.hidden = false; current.classList.add('error'); } }), 400);
});
root.addEventListener('change', event => {
  const input = event.target as HTMLInputElement;
  if (input.name === 'search') { search = input.value; render(); }
  if (input.matches('[data-photos]') && input.files && repo) {
    captureLog();
    const current = repo, destination = logId;
    const savedCount = current.getSnapshot().logs[destination]?.photos.length ?? 0;
    const queuedCount = current.getSnapshot().pending.filter(p => p.kind === 'photo' && p.id === destination).length;
    const remaining = Math.max(0, 10 - savedCount - queuedCount);
    if (!remaining) { message('This paddle already has 10 saved or queued photos.', true); return; }
    const files = Array.from(input.files).slice(0, remaining);
    void (async () => {
      for (const file of files) {
        if (file.size > 10 * 1024 * 1024) throw new Error('Choose photos smaller than 10 MiB.');
        const data = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(',')[1]!); reader.onerror = () => reject(new Error('Could not read photo. Please select it again.')); reader.readAsDataURL(file); });
        await current.photo(destination, data);
      }
      await sync(); render();
    })().catch(e => message(e.message, true));
  }
});
async function loadPhotos() {
  for (const image of root.querySelectorAll<HTMLImageElement>('[data-photo]')) {
    try { const blob = await api.photo(logId, image.dataset.photo!); if (!image.isConnected) continue; const url = URL.createObjectURL(blob); image.onload = () => URL.revokeObjectURL(url); image.src = url; } catch { image.alt = 'Photo unavailable while offline'; }
  }
}
async function restoreGuestEditor() {
  if (params.get('route') || params.get('id')) return;
  const raw = await storage.getItem('trip-editor:guest');
  if (raw) { const draft = JSON.parse(raw); if (draft.editing) { editing = draft.editing; editingId = ''; } }
}
function cleanEmailCallback() {
  removeLocal('trip-email'); removeLocal('trip-email-mode'); removeLocal('trip-email-uid'); pendingEmail = '';
  history.replaceState(null, '', `/account/web/${selected ? `?id=${encodeURIComponent(selected)}` : ''}`);
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
    try { const { trip: t } = await api.view(selected, view); root.innerHTML = `<section class="trip-card"><p class="trip-eyebrow">Shared trip · ${esc(t.status)}</p><h1>${esc(t.title)}</h1><p>${esc(t.route.name)}</p><p>${esc(t.route.putInName)} → ${esc(t.route.takeOutName)}</p><p>${esc(t.date)} ${esc(t.launch)} ${esc(t.timeZone)}</p>${t.itinerary.map(s => `<p><strong>${esc(s.time)} ${esc(s.location)}</strong><br>${esc(s.note)}</p>`).join('')}<p class="trip-muted">Updated ${esc(new Date(t.updatedAt).toLocaleString())}. Check current conditions before launching.</p>${t.route.slug ? `<a class="trip-button" href="/rivers/${esc(t.route.slug)}/">View route</a>` : ''}</section>`; }
    catch (e) { root.textContent = e instanceof Error ? e.message : 'This link is unavailable.'; } return;
  }
  if (invite && selected) {
    try { invitePreview = (await api.invitation(selected, invite)).invitation; }
    catch (e) { inviteError = e instanceof Error ? e.message : 'This invitation is unavailable.'; notice = inviteError; error = true; }
  }
  if (params.get('route')) editing = newTripPlan({ slug: params.get('route')!, name: params.get('name') || params.get('route')! });
  try { await restoreGuestEditor(); }
  catch { notice = 'Browser storage is unavailable. You can still sign in, but guest drafts cannot be saved on this device.'; error = true; }
  render();
  void publicApi.getCatalog().then(r => { catalog = r.rivers; if (editing) render(); }).catch(() => {});
  try { auth = firebaseWebAuth(); }
  catch { notice = 'Website sign-in is not configured yet. You can start a draft on this device.'; error = true; render(); return; }
  if (isSignInWithEmailLink(auth, location.href)) emailCallbackDetected = true;
  onAuthStateChanged(auth, async next => {
    if (next && repo?.uid === next.uid) { user = next; if (!editing && !logEdit) render(); return; }
    const wasSignedIn = Boolean(user);
    unsubscribe?.();
    const previous = repo; repo = null; user = next; vehicleEdit = null; editing = null; logEdit = null; recovery = null; link = '';
    if (previous) { await previous.settle().catch(() => {}); previous.dispose(); }
    if (!next) { if (wasSignedIn) { try { await restoreGuestEditor(); } catch { notice = 'Browser storage is unavailable. Guest drafts cannot be restored on this device.'; error = true; } } if (params.get('route')) editing = newTripPlan({ slug: params.get('route')!, name: params.get('name') || params.get('route')! }); render(); return; }
    const session = next.uid, boundApi = createTripsClient(location.origin, async () => {
      if (auth?.currentUser?.uid !== session) throw new Error('This account session has ended.');
      return next.getIdToken();
    });
    const current = new TripRepository(session, boundApi, storage, uuid); repo = current;
    try {
      await current.load();
      if (repo !== current) return;
      unsubscribe = current.subscribe(() => { if (!editing && !logEdit && !busy && !vehicleEdit && !root.querySelector('details[data-vehicle-editor][open]') && !root.contains(document.activeElement)) render(); });
      const guest = await storage.getItem('trip-guest-draft');
      if (guest) { const draft = JSON.parse(guest); await current.savePlan(draft.plan, draft.id); await storage.removeItem('trip-guest-draft'); selected = draft.id; }
      await sync();
      const editor = await storage.getItem('trip-editor:' + session);
      if (editor && !params.get('id') && !params.get('route')) {
        const draft = JSON.parse(editor); editing = draft.editing; editingId = draft.editingId; editingBaseline = draft.editingBaseline; logEdit = draft.logEdit; logId = draft.logId; logRevision = draft.logRevision ?? 0;
      }
      if (params.get('route')) editing = newTripPlan({ slug: params.get('route')!, name: params.get('name') || params.get('route')! });
      if (selected && !current.getSnapshot().trips[selected] && !invite) {
        try { await api.get(selected); await sync(); } catch { notice = 'This trip is unavailable or you need an invitation.'; }
      }
      render();
    } catch (e) { if (repo === current) message(e instanceof Error ? e.message : 'Could not load trips.', true); }
  });
  try { await finishEmailCallback(); }
  catch (e) { pendingEmail = getLocal('trip-email') || pendingEmail; emailShown = true; notice = authMessage(e); error = true; }
  render();
  const route = params.get('route');
  if (route) { editing = newTripPlan({ slug: route, name: params.get('name') || route }); render(); }
}
window.addEventListener('online', () => void sync());
document.addEventListener('visibilitychange', () => { if (!document.hidden) void sync(); });
setInterval(() => { if (!busy) void sync(); }, 15000);
void start().catch(e => message(e instanceof Error ? e.message : 'Could not open your trips.', true));
