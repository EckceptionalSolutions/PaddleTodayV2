const pendingHighlights = new WeakMap();

// Repeated actions extend one highlight rather than queueing animations.
export function flashInteraction(element, className = 'interaction-highlight', duration = 1400) {
  if (!element?.classList) return;
  let timers = pendingHighlights.get(element);
  if (!timers) {
    timers = new Map();
    pendingHighlights.set(element, timers);
  }
  clearTimeout(timers.get(className));
  element.classList.remove(className);
  // Restart the CSS animation for another deliberate action on the same control.
  void element.offsetWidth;
  element.classList.add(className);
  timers.set(className, setTimeout(() => {
    element.classList.remove(className);
    timers.delete(className);
  }, duration));
}

export function focusLocationControls(form, input, win = window) {
  if (!form || !input) return;
  // Focus immediately; a delayed callback could steal focus after the user moves on.
  input.focus({ preventScroll: true });
  form.scrollIntoView({
    block: 'center',
    behavior: win.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  });
  flashInteraction(form);
}
