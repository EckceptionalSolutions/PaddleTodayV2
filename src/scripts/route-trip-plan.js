import { buildFloatPlanMessage } from '@paddletoday/trip-pack';
import { validTimeZone } from '@paddletoday/api-contract';
import { tripSchedule, tripPlanHref } from '../lib/trip-schedule';
import { guestTripPlans, saveGuestTripPlan, GUEST_TRIP_PLANS_KEY } from '../lib/guest-trip-plans';

export function bindRouteTripPlan(root, { getContext, copyText, onShared }) {
  const panel = root.querySelector('[data-trip-pack]');
  if (!panel) return;
  const start = panel.querySelector('[data-trip-launch]'), end = panel.querySelector('[data-trip-end]');
  const zone = panel.querySelector('[data-trip-zone]'), status = panel.querySelector('[data-trip-status]');
  const share = panel.querySelector('[data-trip-share]'), calendar = panel.querySelector('[data-trip-ics]');
  const manual = panel.querySelector('[data-trip-manual-copy]');
  let version = 0, request = null, selection = '';
  const message = text => { status.textContent = text; };
  const chosen = () => ({ start: start.value, end: end.value, timeZone: zone.value });
  function invalidate() {
    version++;
    request?.controller?.abort(); request = null;
    for (const button of [share, calendar]) if (button) { button.disabled = false; button.setAttribute('aria-busy', 'false'); }
    manual.hidden = true; manual.value = ''; message('');
  }
  const params = new URLSearchParams(location.search);
  if (panel instanceof HTMLDetailsElement && ['start', 'end', 'date', 'launch', 'expected', 'timeZone'].some(key => params.has(key))) panel.open = true;
  const deviceZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const incomingZone = params.get('timeZone');
  const timeZone = incomingZone ? validTimeZone(incomingZone) ? incomingZone : '' : deviceZone;
  for (const value of new Set([timeZone, deviceZone, 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Phoenix', 'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu', 'UTC'].filter(Boolean))) {
    const option = document.createElement('option'); option.value = value; option.textContent = value.replaceAll('_', ' '); zone.append(option);
  }
  zone.value = timeZone;
  if (!timeZone) message('The link’s time zone is unavailable. Choose the correct time zone before saving or exporting.');
  const date = params.get('date');
  start.value = params.get('start') || (date && params.get('launch') ? `${date}T${params.get('launch')}` : '');
  end.value = params.get('end') || (date && params.get('expected') ? `${date}T${params.get('expected')}` : '');
  const context = getContext();
  if (!params.has('start') && !params.has('end') && !date && !incomingZone
    && (!params.has('putin') || params.get('putin') === context.putIn?.id)
    && (!params.has('takeout') || params.get('takeout') === context.takeOut?.id)) {
    try {
      const saved = guestTripPlans(localStorage.getItem(GUEST_TRIP_PLANS_KEY)).find(p => p.slug === context.slug && p.putInId === context.putIn?.id && p.takeOutId === context.takeOut?.id);
      if (saved) { start.value = saved.start; end.value = saved.end; if (![...zone.options].some(o => o.value === saved.timeZone)) zone.add(new Option(saved.timeZone, saved.timeZone)); zone.value = saved.timeZone; message('Your saved browser plan is restored. Review current access and conditions before launch.'); }
    } catch { message('Saved browser plans could not be read. Existing data was kept; you can still plan and export here.'); }
  }
  panel.querySelectorAll('[data-trip-requires-js]').forEach(button => { button.hidden = false; });
  function schedule() {
    if (!start.reportValidity() || !end.reportValidity() || !zone.reportValidity()) return null;
    const value = tripSchedule(start.value, end.value, zone.value);
    if (value.error) { message(value.error); return null; }
    const context = getContext();
    if (!context.putIn?.id || !context.takeOut?.id) { message('Confirm available put-in and take-out points before saving or exporting a plan.'); return null; }
    return { ...value, ...chosen(), context };
  }
  function planUrl(value) {
    return new URL(tripPlanHref(value.context.slug, new URLSearchParams({ putin: value.context.putIn.id, takeout: value.context.takeOut.id, ...chosen() })), location.origin).href;
  }
  panel.addEventListener('input', event => { if (event.target.matches('[data-trip-launch], [data-trip-end], [data-trip-zone]')) invalidate(); });
  panel.addEventListener('change', event => { if (event.target === zone) invalidate(); });
  panel.querySelector('[data-trip-save-plan]').addEventListener('click', () => {
    const value = schedule(); if (!value) return;
    try {
      saveGuestTripPlan(localStorage, { slug: value.context.slug, name: value.context.name, reach: value.context.reach, putInId: value.context.putIn.id, takeOutId: value.context.takeOut.id, ...chosen(), savedAt: new Date().toISOString() });
      message('Plan saved in this browser. Open Browser plans to find it again.');
    } catch { message('Could not save this plan. Existing browser data was kept. You can still share or export it.'); }
  });
  calendar?.addEventListener('click', async () => {
    if (request) return;
    const value = schedule(); if (!value) return;
    const url = new URL(`/api/rivers/${encodeURIComponent(value.context.slug)}/trip.ics`, location.origin);
    for (const [key, text] of Object.entries({ putin: value.context.putIn.id, takeout: value.context.takeOut.id, start: value.launch.toISOString(), end: value.expected.toISOString() })) url.searchParams.set(key, text);
    const active = { version, controller: new AbortController() }; request = active;
    const timeout = setTimeout(() => active.controller.abort(), 15000);
    calendar.disabled = true; calendar.setAttribute('aria-busy', 'true'); message('Preparing calendar event…');
    try {
      const response = await fetch(url.href, { method: 'HEAD', signal: active.controller.signal });
      if (request !== active || version !== active.version) return;
      if (!response.ok || !response.headers.get('content-type')?.includes('text/calendar')) { message('Calendar export is unavailable. Your chosen times were kept; try again when connected.'); return; }
      message('Downloading calendar event. Review its times in your calendar.'); location.assign(url.href);
    } catch { if (request === active) message('Could not prepare the calendar event. Your chosen times were kept; try again when connected.'); }
    finally { clearTimeout(timeout); if (request === active) { request = null; calendar.disabled = false; calendar.setAttribute('aria-busy', 'false'); } }
  });
  share.addEventListener('click', async () => {
    if (request) return;
    const value = schedule(); if (!value) return;
    const { context } = value;
    if (![context.putIn, context.takeOut].every(p => Number.isFinite(p.latitude) && Number.isFinite(p.longitude))) { message('Access coordinates are unavailable. Confirm the access points before sharing.'); return; }
    const text = buildFloatPlanMessage({ routeSlug: context.slug, riverName: context.name, reach: context.reach, routeUrl: planUrl(value), putIn: context.putIn, takeOut: context.takeOut, distanceMiles: context.distanceMiles, launchAt: value.launch, expectedTakeOutAt: value.expected, timeZone: zone.value });
    const active = { version, restoreFocus: document.activeElement === share }; request = active;
    share.disabled = true; share.setAttribute('aria-busy', 'true'); manual.hidden = true; message('Opening sharing…');
    const current = () => request === active && version === active.version;
    try {
      if (navigator.share) { await navigator.share({ title: `Float plan - ${context.name}`, text, url: planUrl(value) }); if (current()) message('Float plan shared.'); }
      else { if (!await copyText(text, current)) throw new Error('Clipboard unavailable'); if (current()) message('Float plan copied to your clipboard.'); }
      if (current()) onShared?.();
    } catch (error) {
      if (!current()) return;
      if (error?.name === 'AbortError') message('Sharing cancelled.');
      else { manual.value = text; manual.hidden = false; manual.focus(); manual.select(); message('Sharing is unavailable. Copy the selected float plan.'); }
    } finally {
      if (current()) { request = null; share.disabled = false; share.setAttribute('aria-busy', 'false'); if (active.restoreFocus && document.activeElement === document.body) share.focus({ preventScroll: true }); }
    }
  });
  window.addEventListener('pagehide', invalidate);
  return { invalidate, syncAccess() { const context = getContext(); const key = `${context.putIn?.id}:${context.takeOut?.id}`; if (selection && selection !== key) invalidate(); selection = key; } };
}
