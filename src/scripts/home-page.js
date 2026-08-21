// Keep the initial homepage module tiny so the browser can paint the static
// hero and location UI before loading the recommendation board and map code.
// Hydration still starts immediately when a user focuses or touches a control.
let hydrationPromise;

const hydrateHomepage = () => {
  if (hydrationPromise) {
    return hydrationPromise;
  }

  hydrationPromise = import('./summary-board-home.js')
    .then(({ initSummaryBoard }) => {
      initSummaryBoard();
    })
    .catch((error) => {
      console.error('Could not initialize the homepage board.', error);
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

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(hydrateHomepage, { timeout: 1200 });
} else {
  window.setTimeout(hydrateHomepage, 0);
}
