const ANALYTICS_EVENT_ATTRIBUTE = 'data-analytics-event';

function analyticsEnabled() {
  return typeof window.plausible === 'function';
}

function pageContext() {
  const route = document.querySelector('[data-river-detail]');
  const path = window.location.pathname;

  if (route instanceof HTMLElement) {
    return {
      path,
      route: route.dataset.riverSlug || undefined,
      river: route.dataset.riverName || undefined,
      state: route.dataset.riverState || undefined,
      region: route.dataset.riverRegion || undefined,
    };
  }

  return { path };
}

function cleanProperties(properties) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
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
  const analyticsGuide = element.dataset.analyticsGuide || element.closest('[data-guide-name]')?.dataset.guideName;
  const analyticsRoute = element.dataset.analyticsRoute || element.dataset.favoriteSlug || element.closest('[data-guide-slug]')?.dataset.guideSlug;
  const analyticsRiver = element.dataset.analyticsRiver || element.dataset.favoriteName;
  const analyticsState = element.dataset.analyticsState || element.dataset.favoriteState;
  const analyticsRegion = element.dataset.analyticsRegion || element.dataset.favoriteRegion;
  const analyticsPlatform = element.dataset.analyticsPlatform || element.closest('[data-platform]')?.dataset.platform;
  const analyticsSourcePage = element.dataset.analyticsSourcePage || document.body?.className || undefined;
  const rawHref = element instanceof HTMLAnchorElement ? element.href : undefined;
  const href = rawHref && !rawHref.startsWith('mailto:') ? rawHref : undefined;
  const submitter = element instanceof HTMLButtonElement ? element : null;

  if (analyticsLabel) {
    properties.label = analyticsLabel;
  }

  if (href) {
    properties.href = href;
  }
  if (analyticsGuide) {
    properties.guide = analyticsGuide;
  }
  if (analyticsRoute) {
    properties.route = analyticsRoute;
  }
  if (analyticsRiver) {
    properties.river = analyticsRiver;
  }
  if (analyticsState) {
    properties.state = analyticsState;
  }
  if (analyticsRegion) {
    properties.region = analyticsRegion;
  }
  if (analyticsPlatform) {
    properties.platform = analyticsPlatform;
  }
  if (analyticsSourcePage) {
    properties.source_page = analyticsSourcePage;
  }

  if (submitter?.dataset.alertSubmit) {
    properties.threshold = submitter.dataset.alertSubmit;
  }

  return cleanProperties(properties);
}

export function trackEvent(name, properties = {}) {
  if (!name || !analyticsEnabled()) {
    return;
  }

  window.plausible(name, { props: cleanProperties({ ...pageContext(), ...properties }) });
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
