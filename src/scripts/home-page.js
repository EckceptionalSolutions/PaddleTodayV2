// Keep the initial homepage module tiny so the browser can paint the static
// hero and location UI before loading the recommendation board and map code.
// Hydration still starts immediately when a user focuses or touches a control.
let hydrationPromise;
let homepageReady = false;
let pendingLocationSubmit = false;

const hydrateHomepage = () => {
  if (hydrationPromise) {
    return hydrationPromise;
  }

  hydrationPromise = import('./summary-board-home.js')
    .then(({ initSummaryBoard }) => {
      initSummaryBoard();
      homepageReady = true;
      return true;
    })
    .catch((error) => {
      console.error('Could not initialize the homepage board.', error);
      hydrationPromise = null;
      return false;
    });

  return hydrationPromise;
};

const interactionSelector = [
  '[data-nearby-location-panel]',
  '[data-home-preset]',
  '[data-home-reset-filters]',
  '[data-nearby-sort-select]',
  '[data-home-jump-target]',
  '[data-summary-map-shell]',
].join(', ');

const hydrateOnInteraction = (event) => {
  const target = event.target;
  if (target instanceof Element && target.closest(interactionSelector)) {
    void hydrateHomepage();
  }
};

document.addEventListener('pointerdown', hydrateOnInteraction, { passive: true });
document.addEventListener('focusin', hydrateOnInteraction);

// A fast Enter press must wait for the deferred form handler, not navigate away.
document.addEventListener('submit', async (event) => {
  const form = event.target;
  if (homepageReady || !(form instanceof HTMLFormElement) || !form.matches('[data-location-form]')) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (pendingLocationSubmit) return;
  pendingLocationSubmit = true;
  const input = form.querySelector('[data-location-input]');
  const query = input instanceof HTMLInputElement ? input.value : '';
  const ready = await hydrateHomepage();
  pendingLocationSubmit = false;
  if (ready) {
    // Initialization may restore a previous location. Keep the submitted query.
    if (input instanceof HTMLInputElement) input.value = query;
    form.requestSubmit();
  } else {
    const status = document.querySelector('[data-location-status]');
    if (status instanceof HTMLElement) {
      status.hidden = false;
      status.textContent = 'Location search could not start. Please try again.';
    }
  }
}, true);

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(hydrateHomepage, { timeout: 1200 });
} else {
  window.setTimeout(hydrateHomepage, 0);
}

const preferences = document.querySelector('[data-home-preferences]');
if (preferences instanceof HTMLDetailsElement) {
  try { preferences.open = localStorage.getItem('paddletoday:home-preferences-open') === 'true'; } catch {}
  preferences.addEventListener('toggle', () => {
    try { localStorage.setItem('paddletoday:home-preferences-open', String(preferences.open)); } catch {}
    if (preferences.open) void hydrateHomepage();
  });
}
