import { EMBED_REFERRAL_STORAGE_KEY, resolveEmbedReferral, embedReferralProperties } from '../lib/embed-referrals';

const ANALYTICS_EVENT_ATTRIBUTE = 'data-analytics-event';
const analyticsAllowed = document.body?.dataset.analyticsEnabled === 'true';
let referral = null;
let referralArrival = false;
if (analyticsAllowed) {
  let stored = null;
  try { stored = sessionStorage.getItem(EMBED_REFERRAL_STORAGE_KEY); } catch { /* Storage may be blocked. */ }
  const resolved = resolveEmbedReferral(new URL(location.href), stored, document.referrer);
  referral = resolved.referral;
  referralArrival = resolved.arrival;
  try {
    if (referral) sessionStorage.setItem(EMBED_REFERRAL_STORAGE_KEY, JSON.stringify(referral));
    else sessionStorage.removeItem(EMBED_REFERRAL_STORAGE_KEY);
  } catch { /* Direct landing attribution still works without storage. */ }
}

// The deferred provider may load after page modules. Retain a small startup
// queue so a slow tracker does not systematically lose referral arrivals.
const pendingEvents = [];
const trackerDeadline = Date.now() + 15_000;
let trackerTimer;

function analyticsEnabled() {
  return analyticsAllowed && typeof window.umami?.track === 'function';
}

function sendEvent(name, properties) {
  try {
    const pending = window.umami.track(name, properties);
    if (pending && typeof pending.catch === 'function') pending.catch(() => {});
  } catch { /* Analytics must never interrupt a successful action. */ }
}

function flushEvents() {
  clearTimeout(trackerTimer);
  trackerTimer = undefined;
  if (analyticsEnabled()) {
    for (const { name, properties } of pendingEvents.splice(0)) sendEvent(name, properties);
  } else if (pendingEvents.length && Date.now() < trackerDeadline) {
    trackerTimer = setTimeout(flushEvents, 250);
  } else pendingEvents.length = 0;
}

document.querySelector('script[data-website-id]')?.addEventListener('load', flushEvents, { once: true });
window.addEventListener('pagehide', () => { clearTimeout(trackerTimer); pendingEvents.length = 0; });

function pageContext() {
  const route = document.querySelector('[data-river-detail]');
  const riverGroup = document.querySelector('[data-river-group-page]');
  const path = window.location.pathname;

  if (route instanceof HTMLElement) {
    return {
      path,
      route: route.dataset.riverSlug || undefined,
      river: route.dataset.riverName || undefined,
      state: route.dataset.riverState || undefined,
      region: route.dataset.riverRegion || undefined,
      score_eligibility: route.dataset.routeScoreEligibility || 'scored',
      readiness: route.dataset.routeReadiness || undefined,
      live_data_overall: route.dataset.routeLiveDataOverall || undefined,
    };
  }

  if (riverGroup instanceof HTMLElement) {
    return {
      path,
      river: riverGroup.dataset.riverName || undefined,
      state: riverGroup.dataset.riverState || undefined,
      region: riverGroup.dataset.riverRegion || undefined,
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
  const analyticsCorridor = element.dataset.analyticsCorridor;
  const analyticsTripCount = element.dataset.analyticsTripCount;
  const analyticsSource = element.dataset.analyticsSource;
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
  if (analyticsCorridor) {
    properties.corridor_id = analyticsCorridor;
  }
  if (analyticsTripCount) {
    properties.trip_option_count = Number(analyticsTripCount);
  }
  if (analyticsSource) {
    properties.source = analyticsSource;
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
  try {
    if (!name || !analyticsAllowed) return;
    const data = cleanProperties({ ...pageContext(), ...properties, ...embedReferralProperties(referral) });
    if (analyticsEnabled()) { flushEvents(); sendEvent(name, data); }
    else if (Date.now() < trackerDeadline && pendingEvents.length < 32) {
      pendingEvents.push({ name, properties: data });
      if (!trackerTimer) flushEvents();
    }
  } catch {
    // Tracking is optional; keep the user's action successful.
  }
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

if (referralArrival) trackEvent('Route card referral');
