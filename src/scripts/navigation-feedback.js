export function isPageNavigation(destination, current) {
  try {
    const from = new URL(current);
    const to = new URL(destination, from);
    return ['http:', 'https:'].includes(to.protocol) && to.origin === from.origin
      && (to.pathname !== from.pathname || to.search !== from.search);
  } catch { return false; }
}

export function initNavigationFeedback({ doc = document, win = window } = {}) {
  const feedback = doc.querySelector('[data-navigation-feedback]');
  if (!feedback) return;
  const message = feedback.querySelector('[data-navigation-message]');
  let showTimer;
  let waitingTimer;
  let expiryTimer;

  function reset() {
    [showTimer, waitingTimer, expiryTimer].forEach(timer => win.clearTimeout(timer));
    feedback.hidden = true;
    feedback.removeAttribute('data-long-wait');
    if (message) message.textContent = '';
  }
  function start() {
    reset();
    showTimer = win.setTimeout(() => {
      feedback.hidden = false;
      if (message) message.textContent = 'Opening page…';
    }, 300);
    waitingTimer = win.setTimeout(() => {
      feedback.setAttribute('data-long-wait', 'true');
      if (message) message.textContent = 'Still opening the page. You can try the link again.';
    }, 6000);
    // A canceled or stalled navigation must not leave an endless loading bar.
    expiryTimer = win.setTimeout(reset, 30000);
  }

  if (win.navigation?.addEventListener) {
    win.navigation.addEventListener('navigate', event => {
      if (!event.defaultPrevented && !event.hashChange && event.downloadRequest == null
        && isPageNavigation(event.destination.url, win.location.href)) start();
    });
    win.navigation.addEventListener('navigateerror', reset);
    win.navigation.addEventListener('navigatesuccess', reset);
  } else {
    doc.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target?.closest?.('a[href]');
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      if (isPageNavigation(link.href, win.location.href)) {
        queueMicrotask(() => { if (!event.defaultPrevented) start(); });
      }
    });
  }
  win.addEventListener('pagehide', reset);
  win.addEventListener('pageshow', reset);
}
