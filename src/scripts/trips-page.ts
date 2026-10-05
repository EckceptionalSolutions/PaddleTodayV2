/// <reference types="astro/client" />
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, EmailAuthProvider, signInWithPopup, linkWithPopup, linkWithCredential, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signOut, type User } from 'firebase/auth';
import { createTripsClient, createPaddleTodayApiClient, TripRepository, type PendingTripWork } from '@paddletoday/api-client';
import { newTripPlan, isTripPlan, tripPlan, historicalWaterSuggestion, type Trip, type TripPlan, type PaddleLogInput, type TripCommand, type RiverAccessPoint, type RiverCatalogItem, type ShuttleVehicle } from '@paddletoday/api-contract';
import { tripBrowserStorage as storage } from '../lib/trip-browser-storage';
import { toDataURL } from 'qrcode';

const root = document.getElementById('trips-app')!;
const uuid = () => crypto.randomUUID();
const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const button = (action: string, label: string, id = '', primary = false) => `<button type="button" data-action="${action}" data-id="${esc(id)}" class="${primary ? 'primary' : ''}">${esc(label)}</button>`;
const field = (name: string, label: string, value: string, type = 'text', wide = false) => `<label class="${wide ? 'trip-wide' : ''}">${esc(label)}<input name="${name}" type="${type}" value="${esc(value)}" ${name === 'email' ? 'autocomplete="email" placeholder="you@example.com"' : ''}></label>`;
const area = (name: string, label: string, value: string) => `<label class="trip-wide">${esc(label)}<textarea name="${name}">${esc(value)}</textarea></label>`;
const params = new URLSearchParams(location.search), fragment = new URLSearchParams(location.hash.slice(1));
let selected = params.get('id') || '', invite = fragment.get('invite') || '', view = fragment.get('view') || '';
if (invite) localStorage.setItem('trip-pending-invite', JSON.stringify({ id: selected, token: invite }));
if (!invite && selected && location.pathname === '/account/web/') {
  try { const pending = JSON.parse(localStorage.getItem('trip-pending-invite') || 'null'); if (pending?.id === selected) invite = pending.token; } catch { /* An original invite can be reopened. */ }
}
let user: User | null = null, repo: TripRepository | null = null, unsubscribe: (() => void) | null = null;
let tab: 'upcoming' | 'past' = 'upcoming', notice = '', error = false, busy = false, emailShown = false, linkEmail = false;
let editing: TripPlan | null = null, editingId = '', logEdit: PaddleLogInput | null = null, logId = '';
let editingBaseline: TripPlan | undefined;
let logRevision = 0;
let vehicleEdit: { vehicle: ShuttleVehicle; revision: number } | null = null;
let access: RiverAccessPoint[] = [], catalog: RiverCatalogItem[] = [], search = '';
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
  const options = (value: string) => `<option value="">Choose an access point</option>${access.map(a => `<option value="${esc(a.id)}" ${a.id === value ? 'selected' : ''}>${esc(a.name)}</option>`).join('')}`;
  return `${field('routeName', 'River or location', route.name)}<label>Choose a route (optional)<input name="routeChoice" list="trip-route-catalog" value="${esc(catalog.find(c => c.river.slug === route.slug) ? routeLabel(catalog.find(c => c.river.slug === route.slug)!) : route.name)}" placeholder="Search available routes"><input type="hidden" name="slug" value="${esc(route.slug)}"><datalist id="trip-route-catalog">${catalog.map(c => `<option value="${esc(routeLabel(c))}"></option>`).join('')}</datalist></label>
    <div class="trip-wide">${button('load-route', 'Load route access points')}</div>
    ${access.length ? `<label>Put-in<select name="putInId">${options(route.putInId)}</select></label><label>Take-out<select name="takeOutId">${options(route.takeOutId)}</select></label>` : `${field('putInName', 'Put-in', route.putInName)}${field('takeOutName', 'Take-out', route.takeOutName)}`}`;
}
function render() {
  if (view) return;
  const state = clientState(), trip = state?.trips[selected];
  root.innerHTML = `<div role="status" class="trip-notice ${error ? 'error' : ''}" ${notice ? '' : 'hidden'}>${esc(notice)}</div>
    ${user ? `<div class="trip-toolbar"><span>${esc(user.displayName || user.email || 'Your account')}</span><div class="trip-actions">${button('refresh', 'Refresh')}${button('export', 'Export my trips')}${!user.providerData.some(p => p.providerId === GoogleAuthProvider.PROVIDER_ID) ? button('link-google', 'Connect Google') : ''}${!user.providerData.some(p => p.providerId === EmailAuthProvider.PROVIDER_ID) ? button('link-email', 'Connect email') : ''}${button('sign-out', 'Sign out')}</div></div>` : ''}
    ${invite ? `<section class="trip-card"><h2>You’re invited to paddle</h2><p>Join this trip to see the itinerary, respond, and coordinate with your group.</p>${user ? button('join', 'Join trip', '', true) : '<p>Sign in below to join.</p>'}</section>` : ''}
    ${!user && !editing ? authMarkup() : ''}
    ${emailShown ? emailLinkMarkup() : ''}
    ${state?.pending.length ? `<p class="trip-notice">${state.pending.length} change(s) waiting to sync.${state.pending.filter(p => p.error).map(p => `<br>${esc(p.error)} ${button('recover', 'Review saved change', p.key)}`).join('')}</p>` : ''}
    ${recovery ? recoveryMarkup() : editing ? planMarkup() : logEdit ? logMarkup() : trip ? detailMarkup(trip) : listMarkup()}
    ${link ? `<section class="trip-card"><h2>Share this link</h2><input class="trip-link" aria-label="Trip link" readonly value="${esc(link)}"><p>View links expire after 30 days; invitations after seven days. Invitations let anyone with the link join and edit.</p>${button('copy', 'Copy link')} ${button('close-link', 'Close')}<div data-qr></div></section>` : ''}`;
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
  return `<section class="trip-card"><h2>${linkEmail ? 'Connect email to your account' : 'Continue with email'}</h2><div class="trip-fields">${field('email', 'Email address', linkEmail ? user?.email || '' : '', 'email', true)}</div><div class="trip-actions">${button('send-email', 'Send sign-in link', '', true)}${button('complete-email', 'Finish email sign-in')}${button('cancel-email', 'Cancel')}</div></section>`;
}
function authMessage(value: unknown) {
  const code = value && typeof value === 'object' && 'code' in value ? String(value.code) : '';
  if (code === 'auth/account-exists-with-different-credential' || code === 'auth/credential-already-in-use') return 'This email is already connected to another sign-in method. Sign in with that method first, then connect Google or email from your account.';
  return value instanceof Error ? value.message : 'Could not complete this sign-in. Try again.';
}
function listMarkup() {
  const state = clientState();
  const trips = Object.values(state?.trips ?? {}).filter(t => t.title.toLowerCase().includes(search.toLowerCase())).sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
  const logs = Object.values(state?.logs ?? {}).filter(l => l.route.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => b.date.localeCompare(a.date));
  const rows = tab === 'upcoming' ? trips.filter(t => t.status === 'planned').map(t => `<article class="trip-card"><span class="trip-badge">${t.date ? esc(t.date) : 'Draft'}</span><h2>${esc(t.title)}</h2><p>${esc(t.route.putInName)} → ${esc(t.route.takeOutName)}</p><p class="trip-muted">${t.members.length > 1 ? `${t.members.length} paddlers` : 'Your trip'}${(state?.viewed[t.id] ?? 0) < t.revision ? ' · Updated since your last visit' : ''}</p>${button('open', 'Open trip', t.id, true)}</article>`)
    : logs.map(l => `<article class="trip-card"><p class="trip-eyebrow">${esc(l.date)}</p><h2>${esc(l.route.name)}</h2><p>${esc(l.notes.slice(0, 160))}</p><p class="trip-muted">${l.paddleAgain === 'yes' ? 'Would paddle again' : l.paddleAgain === 'no' ? 'Would choose another route' : ''}</p>${button('edit-log', 'Open paddle log', l.id)} ${button('again-log', 'Plan again', l.id)}</article>`);
  return `<div class="trip-toolbar"><h1>My trips</h1><div class="trip-actions">${button('new', 'Plan a trip', '', true)}${user ? button('new-log', 'Add past paddle') : ''}</div></div><div class="trip-tabs">${button('upcoming', 'Upcoming')}${button('past', 'Past')}</div><label>Find a trip <input class="trip-search" name="search" value="${esc(search)}" placeholder="River or trip name"></label><div class="trip-grid" style="margin-top:20px">${rows.join('') || `<div class="trip-card trip-empty"><h2>${tab === 'past' ? 'Remember your time on the water' : 'Where will you paddle next?'}</h2><p>${tab === 'past' ? 'Add a paddle to start your personal log.' : 'Choose a route, make a plan, and invite your paddling partners.'}</p></div>`}</div>
    ${tab === 'past' ? trips.filter(t => t.status !== 'planned').map(t => `<article class="trip-card"><h3>${esc(t.title)} · ${esc(t.status)}</h3>${button('open', 'Open plan', t.id)} ${button('log-trip', 'Log my paddle', t.id)}</article>`).join('') : ''}`;
}
function planMarkup() {
  const p = editing!;
  return `<section class="trip-editor"><p class="trip-eyebrow">${editingId ? 'Edit trip' : 'New trip'}</p><h1>Plan your paddle</h1><form data-plan><div class="trip-fields">${field('title', 'Trip title', p.title, 'text', true)}${routeFields(p.route)}${field('date', 'Planned date (optional)', p.date, 'date')}${field('launch', 'Launch time (optional)', p.launch, 'time')}${field('expected', 'Expected return (optional)', p.expected, 'time')}${field('timeZone', 'Trip time zone', p.timeZone)}
    </div><h2>Shared itinerary</h2><p class="trip-muted">These stops are visible to trip members and anyone with a view link.</p>${p.itinerary.map((s, i) => `<div class="trip-stop trip-fields">${field(`stop-time-${i}`, 'Time', s.time, 'time')}${field(`stop-location-${i}`, 'Meeting place', s.location)}${area(`stop-note-${i}`, 'Details', s.note)}${button('remove-stop', 'Remove stop', String(i))}</div>`).join('')}<div class="trip-actions">${button('add-stop', 'Add meeting stop')}${button('save-plan', user ? 'Save trip' : 'Save and sign in', '', true)}${button('cancel-edit', 'Back')}</div></form></section>`;
}
function detailMarkup(t: Trip) {
  const owner = t.ownerUid === user?.uid, state = clientState()!;
  const assigned = new Set(t.shuttle.flatMap(v => [v.driverUid, ...v.passengers]));
  const missing = t.members.filter(m => m.rsvp === 'going' && !assigned.has(m.uid)).length;
  return `<section class="trip-card">${button('home', '← My trips')}<p class="trip-eyebrow">${esc(t.status)} · ${esc(t.date || 'Date to be decided')}</p><h1>${esc(t.title)}</h1><p>${esc(t.route.name)} · ${esc(t.route.putInName)} → ${esc(t.route.takeOutName)}</p><p>${esc(t.launch || 'Launch time to be decided')} ${esc(t.timeZone)}${t.expected ? ` · Return ${esc(t.expected)}` : ''}</p><div class="trip-actions">${button('edit', 'Edit trip', t.id, true)}${button('phone', 'Open on phone')}${button('log-trip', 'Log this paddle', t.id)}${button('again', 'Plan again', t.id)}${t.route.slug ? `<a class="trip-button" href="/rivers/${esc(t.route.slug)}/">Route & current conditions</a>` : ''}</div>
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
  const l = logEdit!, water = l.water[0];
  return `<section class="trip-editor"><p class="trip-eyebrow">Private paddling log</p><h1>${logId ? 'Your paddle' : 'Remember this paddle'}</h1><p>Your notes and photos are only visible to you.</p><div class="trip-fields">${routeFields(l.route)}${field('logDate', 'Date paddled', l.date, 'date')}${field('logTime', 'Launch time (optional)', l.time, 'time')}${field('timeZone', 'Time zone', l.timeZone)}<label>Would paddle again<select name="paddleAgain">${[['','Not decided'],['yes','Yes'],['no','No'],['unsure','Unsure']].map(([v, label]) => `<option value="${v}" ${v === l.paddleAgain ? 'selected' : ''}>${label}</option>`).join('')}</select></label>${area('notes', 'Notes', l.notes)}
    ${field('level', 'Water level / flow (optional)', water?.value || '')}${field('unit', 'Unit (e.g. ft, cfs, m³/s)', water?.unit || '')}${field('gauge', 'Gauge / observation location', water?.gaugeName || '')}${field('measuredAt', 'Measurement date and time', water?.measuredAt || '')}${field('source', 'Source (e.g. personal observation, USGS)', water?.source || '')}</div>${button('water-history', 'Find a recorded water reading')}<p class="trip-muted">Record what you observed on this paddle. A current reading is not a historical reading.</p><div class="trip-actions">${button('save-log', 'Save paddle', '', true)}${button('cancel-log', 'Back')}${logId ? button('delete-log', 'Delete paddle') : ''}</div>
    ${logId ? `<h2>Photos</h2><p class="trip-muted">Up to 10 photos, 10 MiB each. Uploads can resume when you reopen this browser.</p><input type="file" data-photos accept="image/*" multiple aria-label="Add paddle photos"><div class="trip-photo-grid">${(clientState()?.logs[logId]?.photos ?? []).map(p => `<figure><img data-photo="${p.id}" alt="${esc(p.caption || 'Photo from this paddle')}"><figcaption>${esc(p.caption)}</figcaption>${button('remove-photo', 'Remove photo', p.id)}</figure>`).join('')}</div>` : '<p>Save the paddle to add photos.</p>'}</section>`;
}
function recoveryMarkup() {
  return `<section class="trip-card"><h2>Review your saved change</h2><p>${esc(recovery!.error)}</p><pre class="trip-recovery">${esc(JSON.stringify(recovery!.kind === 'photo' ? { photo: recovery!.photoId, caption: recovery!.caption } : recovery!.input, null, 2))}</pre><div class="trip-actions">${button('copy-recovery', 'Copy my change')}${button('discard-recovery', 'Use latest saved version')}${button('retry-recovery', 'Retry my change')}${button('close-recovery', 'Back')}</div><p>Copy your change before choosing the latest version if you want to reapply parts of it.</p></section>`;
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
  try { await repo.sync(); notice = repo.getSnapshot().pending.length ? 'Some changes are waiting for review or upload.' : 'All changes saved.'; error = false; }
  catch (e) { notice = e instanceof Error ? e.message : 'Changes are saved on this device.'; error = true; }
  if (!editing && !logEdit && !vehicleEdit && !root.querySelector('details[data-vehicle-editor][open]') && !root.contains(document.activeElement)) render();
}
async function run(action: string, id: string) {
  const t = clientState()?.trips[selected];
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
    const last = Number(sessionStorage.getItem('trip-email-sent') || 0);
    if (Date.now() - last < 60000) throw new Error('Please wait a minute before requesting another link.');
    const destination = `${location.origin}/account/web/?id=${encodeURIComponent(selected)}`;
    await sendSignInLinkToEmail(auth, email, { url: destination, handleCodeInApp: true });
    localStorage.setItem('trip-email', email); localStorage.setItem('trip-email-mode', linkEmail && user ? 'link' : 'sign-in'); if (user) localStorage.setItem('trip-email-uid', user.uid); sessionStorage.setItem('trip-email-sent', String(Date.now())); notice = 'Check your email for a sign-in link.'; return;
  }
  if (action === 'complete-email') {
    if (!auth || !isSignInWithEmailLink(auth, location.href)) throw new Error('Open the sign-in link from your email first.');
    await auth.authStateReady();
    const email = value('email') || localStorage.getItem('trip-email') || '';
    if (localStorage.getItem('trip-email-mode') === 'link') {
      const uid = localStorage.getItem('trip-email-uid');
      if (!auth.currentUser || auth.currentUser.uid !== uid) throw new Error('To connect this email, sign in to the existing account in this browser, then reopen the email link.');
      await linkWithCredential(auth.currentUser, EmailAuthProvider.credentialWithLink(email, location.href));
    } else await signInWithEmailLink(auth, email, location.href);
    localStorage.removeItem('trip-email'); localStorage.removeItem('trip-email-mode'); localStorage.removeItem('trip-email-uid'); history.replaceState(null, '', `/trips/${selected ? `?id=${selected}` : ''}`); return;
  }
  if (action === 'sign-out') {
    if (repo?.getSnapshot().pending.length && !confirm('There are unsynced changes. Discard them and sign out?')) return;
    if (editorTimer) clearTimeout(editorTimer);
    const uid = repo?.uid, previous = repo; previous?.dispose(); repo = null; await previous?.settle(); if (uid) await storage.clearAccount(uid); await signOut(auth!); return;
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
    if (!isTripPlan(editing)) throw new Error('Enter a title and location, and check your date, time, and time zone.');
    if (!repo) { await storage.setItem('trip-guest-draft', JSON.stringify({ id: uuid(), plan: editing })); await storage.removeItem('trip-editor:guest'); editing = null; notice = 'Your draft is saved here. Sign in to continue.'; return; }
    selected = await repo.savePlan(editing!, editingId || undefined, editingId ? editingBaseline : undefined); editing = null; await storage.removeItem('trip-editor:' + repo.uid); await sync(); return;
  }
  if (action === 'join') { await repo!.command(selected, { type: 'join', token: invite }); await sync(); if (clientState()?.trips[selected]) { invite = ''; history.replaceState(null, '', `/trips/?id=${selected}`); } return; }
  if (action === 'refresh') { await sync(); return; }
  if (action === 'phone') { link = `${location.origin}/trips/?id=${selected}`; return; }
  if (action === 'close-link') { link = ''; return; }
  if (action === 'copy') { await navigator.clipboard.writeText(link); notice = 'Link copied.'; return; }
  if (action === 'invite' || action === 'share') {
    const token = crypto.randomUUID().replaceAll('-', '') + crypto.randomUUID().replaceAll('-', ''), purpose = action === 'invite' ? 'invite' : 'view';
    await repo!.command(selected, { type: 'link', purpose, token }); await repo!.sync();
    if (clientState()!.pending.some(p => p.id === selected)) throw new Error('Connect and finish syncing this trip before sharing a link.');
    link = `${location.origin}/trips/?id=${selected}#${purpose}=${token}`; return;
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
  if (action === 'copy-recovery') { await navigator.clipboard.writeText(JSON.stringify(recovery!.kind === 'photo' ? { caption: recovery!.caption } : recovery!.input, null, 2)); return; }
  if (action === 'discard-recovery') { if (confirm('Discard this pending change and use the latest saved version?')) { await repo!.discard(recovery!.key); recovery = null; } return; }
  if (action === 'retry-recovery') { await repo!.retry(recovery!.key); recovery = null; return; }
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
root.addEventListener('click', event => {
  const target = (event.target as Element).closest<HTMLButtonElement>('[data-action]');
  if (!target || busy) return;
  busy = true; notice = ''; error = false;
  void run(target.dataset.action!, target.dataset.id || '').catch(e => { notice = authMessage(e); error = true; }).finally(() => { busy = false; render(); });
});
root.addEventListener('submit', e => e.preventDefault());
let editorTimer: ReturnType<typeof setTimeout> | null = null;
root.addEventListener('input', () => {
  if (!editing && !logEdit) return;
  capturePlan(); captureLog();
  if (editorTimer) clearTimeout(editorTimer);
  const key = 'trip-editor:' + (repo?.uid || 'guest');
  const data = JSON.stringify({ editing, editingId, editingBaseline, logEdit, logId, logRevision });
  editorTimer = setTimeout(() => void storage.setItem(key, data).catch(e => { notice = e.message; error = true; }), 400);
});
root.addEventListener('change', event => {
  const input = event.target as HTMLInputElement;
  if (input.name === 'search') { search = input.value; render(); }
  if (input.matches('[data-photos]') && input.files && repo) {
    captureLog();
    const files = Array.from(input.files), current = repo, destination = logId;
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
async function start() {
  if (view) {
    try { const { trip: t } = await api.view(selected, view); root.innerHTML = `<section class="trip-card"><p class="trip-eyebrow">Shared trip · ${esc(t.status)}</p><h1>${esc(t.title)}</h1><p>${esc(t.route.name)}</p><p>${esc(t.route.putInName)} → ${esc(t.route.takeOutName)}</p><p>${esc(t.date)} ${esc(t.launch)} ${esc(t.timeZone)}</p>${t.itinerary.map(s => `<p><strong>${esc(s.time)} ${esc(s.location)}</strong><br>${esc(s.note)}</p>`).join('')}<p class="trip-muted">Updated ${esc(new Date(t.updatedAt).toLocaleString())}. Check current conditions before launching.</p>${t.route.slug ? `<a class="trip-button" href="/rivers/${esc(t.route.slug)}/">View route</a>` : ''}</section>`; }
    catch (e) { root.textContent = e instanceof Error ? e.message : 'This link is unavailable.'; } return;
  }
  if (params.get('route')) editing = newTripPlan({ slug: params.get('route')!, name: params.get('name') || params.get('route')! });
  await restoreGuestEditor();
  render();
  void publicApi.getCatalog().then(r => { catalog = r.rivers; if (editing) render(); }).catch(() => {});
  const config = { apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY, authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN, projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID, appId: import.meta.env.PUBLIC_FIREBASE_APP_ID };
  if (!config.apiKey || !config.projectId) { notice = 'Website sign-in is not configured yet. You can start a draft on this device.'; render(); return; }
  auth = getAuth(getApps().find(a => a.name === 'paddletoday-web') || initializeApp(config, 'paddletoday-web'));
  if (isSignInWithEmailLink(auth, location.href)) {
    const email = localStorage.getItem('trip-email');
    await auth.authStateReady();
    if (localStorage.getItem('trip-email-mode') === 'link') {
      const uid = localStorage.getItem('trip-email-uid');
      if (email && auth.currentUser?.uid === uid) { await linkWithCredential(auth.currentUser, EmailAuthProvider.credentialWithLink(email, location.href)); localStorage.removeItem('trip-email'); localStorage.removeItem('trip-email-mode'); localStorage.removeItem('trip-email-uid'); history.replaceState(null, '', `/trips/?id=${encodeURIComponent(selected)}`); }
      else { linkEmail = true; emailShown = true; notice = 'Sign in to your existing account in this browser, then reopen the email link to connect it.'; }
    }
    else if (email) { await signInWithEmailLink(auth, email, location.href); localStorage.removeItem('trip-email'); history.replaceState(null, '', `/trips/?id=${encodeURIComponent(selected)}`); }
    else { emailShown = true; notice = 'Enter the email address that received this link, then choose Finish email sign-in.'; }
  }
  onAuthStateChanged(auth, async next => {
    unsubscribe?.(); repo?.dispose(); repo = null; user = next; vehicleEdit = null; editing = null; logEdit = null; recovery = null; link = '';
    if (!next) { await restoreGuestEditor(); if (params.get('route')) editing = newTripPlan({ slug: params.get('route')!, name: params.get('name') || params.get('route')! }); render(); return; }
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
  const route = params.get('route');
  if (route) { editing = newTripPlan({ slug: route, name: params.get('name') || route }); render(); }
}
window.addEventListener('online', () => void sync());
document.addEventListener('visibilitychange', () => { if (!document.hidden) void sync(); });
void start().catch(e => message(e instanceof Error ? e.message : 'Could not open your trips.', true));
