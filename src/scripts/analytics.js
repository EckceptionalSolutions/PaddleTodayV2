const ANALYTICS_EVENT_ATTRIBUTE = 'data-analytics-event';

function analyticsEnabled() {
  return typeof window.plausible === 'function';
}

function pageContext() {
  const route = document.querySelector('[data-river-detail]');

  if (route instanceof HTMLElement) {
    return {
      route: route.dataset.riverSlug || undefined,
      river: route.dataset.riverName || undefined,
      state: route.dataset.riverState || undefined,
      region: route.dataset.riverRegion || undefined,
    };
  }

  return {};
}

function eventProperties(target) {
  const element = target instanceof HTMLElement ? target : null;
  const properties = {
    ...pageContext(),
  };

  if (!element) {
    return properties;
  }

  const analyticsLabel = element.dataset.analyticsLabel;
  const href = element instanceof HTMLAnchorElement ? element.href : undefined;
  const submitter = element instanceof HTMLButtonElement ? element : null;

  if (analyticsLabel) {
    properties.label = analyticsLabel;
  }

  if (href) {
    properties.href = href;
  }

  if (submitter?.dataset.alertSubmit) {
    properties.threshold = submitter.dataset.alertSubmit;
  }

  return properties;
}

export function trackEvent(name, properties = {}) {
  if (!name || !analyticsEnabled()) {
    return;
  }

  window.plausible(name, { props: properties });
}

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target.closest(`[${ANALYTICS_EVENT_ATTRIBUTE}]`) : null;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const name = target.dataset.analyticsEvent;
  if (!name) {
    return;
  }

  trackEvent(name, eventProperties(target));
});

document.addEventListener('submit', (event) => {
  const target = event.target instanceof Element ? event.target.closest(`[${ANALYTICS_EVENT_ATTRIBUTE}]`) : null;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const name = target.dataset.analyticsEvent;
  if (!name) {
    return;
  }

  const submitter = event.submitter instanceof HTMLElement ? event.submitter : null;
  trackEvent(name, eventProperties(submitter ?? target));
});
