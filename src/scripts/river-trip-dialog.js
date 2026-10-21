import { escapeHtml } from './map-runtime.js';
import { bindFavoriteButtons, refreshFavoriteButtons } from './favorites-ui.js';

export function tripDetailsButtonMarkup(slug, selected = false) {
  return `<button type="button" class="river-link river-link--inline route-choice__details-button" data-trip-details="${escapeHtml(slug)}"${selected ? ' data-trip-details-selected' : ''} aria-haspopup="dialog" aria-controls="river-trip-details-dialog">View trip details</button>`;
}

// Published facts and trip tools are independent of live conditions availability.
export function bindRiverTripDialog(root, { onSelect = () => {}, onShowMap = () => false } = {}) {
  const dialog = root.querySelector('[data-trip-details-dialog]');
  if (!(dialog instanceof HTMLDialogElement)) return;
  const title = dialog.querySelector('[data-trip-dialog-title]');
  const body = dialog.querySelector('[data-trip-dialog-body]');
  const closeButton = dialog.querySelector('[data-trip-dialog-close]');
  const trips = new Map();
  for (const card of root.querySelectorAll('[data-group-route-card]')) {
    const content = card.querySelector('[data-trip-details-content]'), heading = card.querySelector('.route-choice__title');
    if (!content || !heading) continue;
    trips.set(card.dataset.routeSlug, { title: heading.textContent, content: content.cloneNode(true) });
    const fallback = card.querySelector('[data-trip-details-fallback]');
    if (fallback) fallback.hidden = true;
    card.insertAdjacentHTML('beforeend', tripDetailsButtonMarkup(card.dataset.routeSlug));
  }
  for (const template of root.querySelectorAll('[data-trip-details-extra]')) {
    if (!(template instanceof HTMLTemplateElement)) continue;
    const content = template.content.querySelector('[data-trip-details-content]');
    if (content) trips.set(template.dataset.tripSlug, { title: template.dataset.tripTitle, content: content.cloneNode(true) });
  }
  const selectedFallback = root.querySelector('[data-trip-selected-fallback]');
  if (selectedFallback) {
    const slug = selectedFallback.getAttribute('href')?.replace('#trip-', '');
    if (trips.has(slug)) selectedFallback.outerHTML = tripDetailsButtonMarkup(slug, true);
  }
  let opener = null, openedSlug = null, selectedOpener = false, previousOverflow = '';
  let version = 0, exportRequest = null, afterClose = null;
  const status = message => { const node = body.querySelector('[data-modal-status]'); if (node) node.textContent = message; };
  const cancelExport = () => { exportRequest?.abort(); exportRequest = null; };
  const current = token => dialog.open && token === version;
  const chosenSlug = () => new URL(location.href).searchParams.get('details');

  function render(slug) {
    const trip = trips.get(slug);
    if (!trip) return;
    cancelExport(); version++; openedSlug = slug;
    onSelect(slug);
    title.textContent = trip.title;
    body.replaceChildren(trip.content.cloneNode(true));
    body.querySelector('[data-modal-calendar-download]')?.removeAttribute('hidden');
    const zone = body.querySelector('[data-modal-timezone]');
    if (zone) zone.textContent = ` (${Intl.DateTimeFormat().resolvedOptions().timeZone})`;
    refreshFavoriteButtons(dialog);
    if (!dialog.open) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    }
    closeButton.focus({ preventScroll: true }); body.scrollTop = 0;
  }
  function open(slug, button = null) {
    if (!trips.has(slug)) return;
    opener = button; selectedOpener = Boolean(button?.hasAttribute('data-trip-details-selected'));
    const url = new URL(location.href);
    url.searchParams.set('details', slug); url.hash = `trip-${slug}`;
    history.pushState({ ...history.state, riverTripModal: slug }, '', url);
    render(slug);
  }
  function requestClose() {
    if (!dialog.open) return;
    if (history.state?.riverTripModal === openedSlug) history.back();
    else {
      const url = new URL(location.href); url.searchParams.delete('details');
      history.replaceState({ ...history.state, riverTripModal: undefined }, '', url); dialog.close();
    }
  }
  function syncHistory() {
    const slug = chosenSlug();
    if (trips.has(slug)) { if (!dialog.open || slug !== openedSlug) render(slug); }
    else {
      if (dialog.open) dialog.close();
      const selected = location.hash.match(/^#trip-(.+)$/)?.[1];
      if (trips.has(selected)) onSelect(selected);
    }
  }
  async function copy(text, token, message) {
    try { await navigator.clipboard.writeText(text); if (current(token)) status(message); }
    catch {
      if (!current(token)) return;
      const fallback = body.querySelector('[data-modal-manual-copy]');
      fallback.value = text; fallback.hidden = false; fallback.focus(); fallback.select();
      status('Automatic copying is unavailable. Copy the selected text below.');
    }
  }
  async function download(url, kind, token, button, inputsUnchanged = () => true) {
    if (exportRequest) return;
    const controller = new AbortController(); exportRequest = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    button.setAttribute('aria-busy', 'true');
    status(kind === 'gpx' ? 'Checking the route line…' : 'Preparing calendar event…');
    try {
      const response = await fetch(url, { method: 'HEAD', signal: controller.signal });
      if (!current(token)) return;
      if (!inputsUnchanged()) return status('The times changed while preparing the download. Review them and download again.');
      if (!response.ok || !response.headers.get('content-type')?.includes(kind)) {
        status(kind === 'gpx' ? 'GPX is unavailable for this route. Access maps and planning notes remain available.' : 'Calendar export is unavailable. Your chosen times were kept; try again when connected.');
      } else { status(kind === 'gpx' ? 'Downloading GPX…' : 'Downloading calendar event. Review the times in your calendar.'); window.location.assign(url); }
    } catch { if (current(token)) status('Could not prepare the download. Your trip details were kept; try again when connected.'); }
    finally { clearTimeout(timeout); if (exportRequest === controller) exportRequest = null; button.removeAttribute('aria-busy'); }
  }
  root.addEventListener('click', event => {
    const button = event.target instanceof Element ? event.target.closest('[data-trip-details]') : null;
    if (button instanceof HTMLButtonElement) open(button.dataset.tripDetails, button);
  });
  bindFavoriteButtons(dialog, {
    onToggle: ({ saved }) => status(saved ? 'Trip saved on this device.' : 'Trip removed from Saved routes.'),
    onError: () => status('Could not update Saved routes. Your saved list was kept. Check browser storage and try again.'),
  });
  body.addEventListener('click', async event => {
    const button = event.target instanceof Element ? event.target.closest('button, a') : null;
    if (!(button instanceof HTMLElement)) return;
    const token = version;
    if (button.hasAttribute('data-modal-copy-coordinates')) {
      await copy(button.dataset.modalCopyCoordinates, token, 'Coordinates copied.');
    } else if (button.hasAttribute('data-modal-copy-link') || button.hasAttribute('data-modal-share')) {
      const content = body.querySelector('[data-trip-details-content]');
      const url = new URL(content.dataset.tripShareUrl, location.origin).href;
      if (button.hasAttribute('data-modal-copy-link')) return copy(url, token, 'Trip link copied.');
      const text = `${content.dataset.tripName} — ${content.dataset.tripReach}\nPut-in: ${body.querySelector('[data-modal-access-name="put-in"]').textContent}\nTake-out: ${body.querySelector('[data-modal-access-name="take-out"]').textContent}\n${url}\nRecheck access, gauge, weather and hazards before launch.`;
      if (navigator.share) {
        try { await navigator.share({ title: `${content.dataset.tripName} trip`, text, url }); if (current(token)) status('Trip shared.'); }
        catch (error) { if (error.name !== 'AbortError') await copy(text, token, 'Trip details copied.'); }
      } else await copy(text, token, 'Trip details copied.');
    } else if (button.hasAttribute('data-modal-show-map')) {
      if (!onShowMap(openedSlug, true)) return status('The interactive map is unavailable. Use the launch and take-out map links above.');
      const slug = openedSlug; afterClose = () => onShowMap(slug); requestClose();
    } else if (button.hasAttribute('data-modal-gpx')) {
      event.preventDefault();
      await download(button.href, 'gpx', token, button);
    } else if (button.hasAttribute('data-modal-calendar-download')) {
      const form = button.closest('[data-modal-calendar-form]');
      const startInput = form.querySelector('[name="start"]'), endInput = form.querySelector('[name="end"]');
      if (!startInput.reportValidity() || !endInput.reportValidity()) return;
      const startValue = startInput.value, endValue = endInput.value;
      const start = new Date(startValue), end = new Date(endValue);
      if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start) return status('Expected take-out must be after launch.');
      const url = new URL(form.dataset.calendarUrl, location.origin);
      url.searchParams.set('start', start.toISOString()); url.searchParams.set('end', end.toISOString());
      await download(url.href, 'calendar', token, button, () => startInput.value === startValue && endInput.value === endValue);
    }
  });
  closeButton.addEventListener('click', requestClose);
  dialog.addEventListener('cancel', event => { event.preventDefault(); requestClose(); });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('a[href], button, summary, input, textarea, select, [tabindex="0"]')]
      .filter(element => !element.disabled && element.getClientRects().length > 0);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) requestClose();
  });
  dialog.addEventListener('close', () => {
    cancelExport(); version++; document.body.style.overflow = previousOverflow;
    const replacement = [...root.querySelectorAll('[data-trip-details]')].find(button => button.dataset.tripDetails === openedSlug && button.hasAttribute('data-trip-details-selected') === selectedOpener);
    (opener?.isConnected ? opener : replacement)?.focus({ preventScroll: true });
    const callback = afterClose; afterClose = null;
    if (callback) queueMicrotask(callback);
  });
  window.addEventListener('popstate', syncHistory);
  const initial = chosenSlug();
  if (trips.has(initial)) {
    const base = new URL(location.href); base.searchParams.delete('details');
    history.replaceState({ ...history.state, riverTripModal: undefined }, '', base); open(initial);
  }
  return { syncSelection: () => { if (dialog.open) onSelect(openedSlug); } };
}
