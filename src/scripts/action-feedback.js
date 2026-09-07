let feedback;
let timeout;

export function showActionFeedback(message, { undo } = {}) {
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.className = 'action-feedback';
    document.body.append(feedback);
  }
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
        showActionFeedback('Route restored to Saved routes.');
      } catch {
        showActionFeedback('Could not restore this route. Browser storage is unavailable.', { undo });
      }
    });
    feedback.append(button);
  }
  const dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.textContent = 'Dismiss';
  dismiss.addEventListener('click', () => { feedback.hidden = true; });
  feedback.append(dismiss);
  if (!undo) timeout = window.setTimeout(() => {
    if (!feedback.contains(document.activeElement)) feedback.hidden = true;
  }, 6000);
}
