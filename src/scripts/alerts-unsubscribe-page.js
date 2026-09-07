const routeNode = document.querySelector('[data-alert-manage-route]');
const thresholdNode = document.querySelector('[data-alert-manage-threshold]');
const statusNode = document.querySelector('[data-alert-manage-status]');
const subtitleNode = document.querySelector('[data-alert-manage-subtitle]');
const submitButton = document.querySelector('[data-alert-manage-submit]');
const cancelLink = document.querySelector('[data-alert-manage-cancel]');

const params = new URLSearchParams(window.location.search);
const alertId = params.get('alert') || '';
const token = params.get('token') || '';
const riverName = params.get('river') || 'this route';
const riverSlug = params.get('slug') || '';
const threshold = params.get('threshold') || '';

function setText(node, value) {
  if (node instanceof HTMLElement) {
    node.textContent = value;
  }
}

function thresholdLabel(value) {
  return value === 'strong' ? 'Strong' : 'Good';
}

function setStatus(message, tone = 'muted') {
  if (!(statusNode instanceof HTMLElement)) {
    return;
  }

  statusNode.textContent = message;
  statusNode.classList.remove('alert-manage__status--success', 'alert-manage__status--error');
  if (tone === 'success') {
    statusNode.classList.add('alert-manage__status--success');
  } else if (tone === 'error') {
    statusNode.classList.add('alert-manage__status--error');
  }
}

setText(routeNode, riverName);
setText(
  thresholdNode,
  threshold
    ? `This turns off your ${thresholdLabel(threshold)} alert for ${riverName}.`
    : 'This turns off the alert tied to this email link.'
);
setText(
  subtitleNode,
  threshold ? `Disable your ${thresholdLabel(threshold)} threshold alert.` : 'Disable this email alert.'
);

if (cancelLink instanceof HTMLAnchorElement && riverSlug) {
  cancelLink.href = `/rivers/${riverSlug}/`;
  cancelLink.textContent = 'Back to river';
}

if (!(submitButton instanceof HTMLButtonElement) || !alertId || !token) {
  setStatus('This alert link is missing information. Try the latest email instead.', 'error');
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = true;
  }
} else {
  setStatus('Ready to turn this alert off.');
  submitButton.addEventListener('click', async () => {
    if (submitButton.disabled) return;
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.textContent = 'Unsubscribing…';
    setStatus('Turning off this alert...');

    try {
      const response = await fetch('/api/alerts/unsubscribe', {
        method: 'POST',
        signal: AbortSignal.timeout(15_000),
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          alertId,
          token,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload?.ok !== true) {
        throw new Error(payload?.message || 'Could not turn off this alert.');
      }

      submitButton.hidden = true;
      setStatus(
        payload?.alreadyInactive
          ? 'This alert was already turned off.'
          : 'This alert is now off. You will not get more emails for it.',
        'success'
      );
      setText(
        thresholdNode,
        payload?.alreadyInactive
          ? 'No action was needed.'
          : 'You can always create a new alert again from the river page.'
      );
      cancelLink?.focus();
    } catch (error) {
      console.error('Failed to unsubscribe river alert.', error);
      submitButton.disabled = false;
      setStatus(error instanceof Error && error.name === 'TimeoutError'
        ? 'The request took too long. Try again to confirm this alert is off.'
        : error instanceof Error ? error.message : 'Could not turn off this alert right now.', 'error');
    } finally {
      submitButton.removeAttribute('aria-busy');
      submitButton.textContent = 'Unsubscribe';
    }
  });
}
