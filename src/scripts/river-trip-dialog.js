import { escapeHtml } from './map-runtime.js';

export function tripDetailsButtonMarkup(slug, selected = false) {
  return `<button type="button" class="river-link river-link--inline route-choice__details-button" data-trip-details="${escapeHtml(slug)}"${selected ? ' data-trip-details-selected' : ''} aria-haspopup="dialog" aria-controls="river-trip-details-dialog">View trip details</button>`;
}

// Published trip facts stay available even if the conditions API cannot load.
// Cache their server-rendered content before live comparison replaces the cards.
export function bindRiverTripDialog(root) {
  const dialog = root.querySelector('[data-trip-details-dialog]');
  if (!(dialog instanceof HTMLDialogElement)) return;
  const title = dialog.querySelector('[data-trip-dialog-title]');
  const body = dialog.querySelector('[data-trip-dialog-body]');
  const closeButton = dialog.querySelector('[data-trip-dialog-close]');
  const trips = new Map();
  for (const card of root.querySelectorAll('[data-group-route-card]')) {
    const content = card.querySelector('[data-trip-details-content]');
    const heading = card.querySelector('.route-choice__title');
    if (!content || !heading) continue;
    trips.set(card.dataset.routeSlug, { title: heading.textContent, content: content.cloneNode(true) });
    const fallback = card.querySelector('[data-trip-details-fallback]');
    if (fallback) fallback.hidden = true;
    card.insertAdjacentHTML('beforeend', tripDetailsButtonMarkup(card.dataset.routeSlug));
  }
  const selectedFallback = root.querySelector('[data-trip-selected-fallback]');
  if (selectedFallback) {
    const slug = selectedFallback.getAttribute('href')?.replace('#trip-', '');
    if (trips.has(slug)) selectedFallback.outerHTML = tripDetailsButtonMarkup(slug, true);
  }
  let opener = null;
  let openedSlug = null;
  let selectedOpener = false;
  let previousOverflow = '';
  root.addEventListener('click', event => {
    const button = event.target instanceof Element ? event.target.closest('[data-trip-details]') : null;
    if (!(button instanceof HTMLButtonElement)) return;
    const trip = trips.get(button.dataset.tripDetails);
    if (!trip) return;
    opener = button;
    openedSlug = button.dataset.tripDetails;
    selectedOpener = button.hasAttribute('data-trip-details-selected');
    title.textContent = trip.title;
    body.replaceChildren(trip.content.cloneNode(true));
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    closeButton.focus({ preventScroll: true });
    body.scrollTop = 0;
  });
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('a[href], button, summary, [tabindex="0"]')]
      .filter(element => !element.disabled && element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    // Conditions refresh can replace the opener while the dialog is open.
    const replacement = [...root.querySelectorAll('[data-trip-details]')].find(button =>
      button.dataset.tripDetails === openedSlug && button.hasAttribute('data-trip-details-selected') === selectedOpener);
    const target = opener?.isConnected ? opener : replacement;
    target?.focus({ preventScroll: true });
  });
}
