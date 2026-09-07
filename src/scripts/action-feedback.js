let feedback;
let timeout;

export function showActionFeedback(message, { undo, returnFocus } = {}) {
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.className = 'action-feedback';
    document.body.append(feedback);
  }
  const hadFocus = feedback.contains(document.activeElement);
  const previousFocus = document.activeElement;
  const resolveReturnFocus = returnFocus || (() => previousFocus instanceof HTMLElement && previousFocus !== document.body ? previousFocus : null);
  window.clearTimeout(timeout);
  feedback.replaceChildren();
  feedback.hidden = false;
  const status = document.createElement('span');
  status.setAttribute('role', 'status');
  feedback.append(status);
  // Populate after attaching the live region so screen readers announce it.
  window.requestAnimationFrame(() => { status.textContent = message; });
  if (undo) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Undo';
    button.addEventListener('click', () => {
      try {
        undo();
        showActionFeedback('Route restored to Saved routes.', { returnFocus: resolveReturnFocus });
      } catch {
        showActionFeedback('Could not restore this route. Browser storage is unavailable.', { undo, returnFocus: resolveReturnFocus });
      }
    });
    feedback.append(button);
  }
  const dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.textContent = 'Dismiss';
  dismiss.addEventListener('click', () => {
    const restoreFocus = feedback.contains(document.activeElement);
    feedback.hidden = true;
    if (restoreFocus) {
      const target = resolveReturnFocus();
      (target?.isConnected ? target : document.querySelector('main'))?.focus({ preventScroll: true });
    }
  });
  feedback.append(dismiss);
  if (hadFocus) feedback.querySelector('button')?.focus({ preventScroll: true });
  if (!undo) timeout = window.setTimeout(() => {
    if (!feedback.contains(document.activeElement)) feedback.hidden = true;
  }, 6000);
}
