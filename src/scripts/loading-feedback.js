// Each operation owns its completion callback. An aborted older request cannot
// clear the feedback belonging to a newer request.
export function createLoadingFeedback(name, { root = globalThis.document, clock = globalThis } = {}) {
  const element = root?.querySelector(`[data-loading-feedback="${name}"]`);
  const message = element?.querySelector('[data-loading-message]');
  let revision = 0;
  let waitingTimer;

  return {
    start({ refreshing = false, silent = false } = {}) {
      const current = ++revision;
      clock.clearTimeout(waitingTimer);
      const mode = refreshing ? 'refresh' : 'initial';
      root?.body?.setAttribute(`data-loading-${name}`, mode);
      root?.body?.removeAttribute(`data-loading-${name}-waiting`);
      if (element) {
        element.dataset.mode = mode;
        element.hidden = refreshing || silent;
        if (message) message.textContent = refreshing
          ? 'Checking for updated conditions…'
          : element.dataset.loadingLabel;
        waitingTimer = clock.setTimeout(() => {
          root?.body?.setAttribute(`data-loading-${name}-waiting`, 'true');
          element.hidden = false;
          if (message) message.textContent = refreshing
            ? 'Still checking for updates. You can keep using the current results.'
            : element.dataset.loadingWaiting;
        }, 6000);
      }
      return () => {
        if (revision !== current) return;
        clock.clearTimeout(waitingTimer);
        root?.body?.removeAttribute(`data-loading-${name}`);
        root?.body?.removeAttribute(`data-loading-${name}-waiting`);
        if (element) element.hidden = true;
      };
    },
  };
}
