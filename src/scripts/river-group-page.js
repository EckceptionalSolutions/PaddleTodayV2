const root = document.querySelector('[data-river-group-page]');

if (!(root instanceof HTMLElement)) {
  throw new Error('Missing river group root.');
}

const riverId = root.dataset.riverId;
if (!riverId) {
  throw new Error('Missing river group id.');
}

const routeList = root.querySelector('[data-group-route-list]');
const banner = root.querySelector('[data-group-status-banner]');
const bannerTitle = root.querySelector('[data-group-banner-title]');
const bannerDetail = root.querySelector('[data-group-banner-detail]');
const refreshButton = root.querySelector('[data-group-refresh]');
const refreshNote = root.querySelector('[data-group-refresh-note]');
const selectedLink = root.querySelector('[data-group-selected-link]');

const AUTO_REFRESH_MS = 5 * 60 * 1000;
let lastSuccessAt = null;
let currentResult = null;
let selectedSlug = null;

function setText(field, value) {
  const elements = Array.from(root.querySelectorAll(`[data-field="${field}"]`));
  for (const element of elements) {
    element.textContent = value;
  }
  return elements[0] ?? null;
}

function decisionLabel(rating) {
  if (rating === 'Strong' || rating === 'Good') return 'Paddle today';
  if (rating === 'Borderline') return 'Maybe today';
  return 'Skip today';
}

function ratingToneKey(rating) {
  if (rating === 'Strong') return 'great';
  if (rating === 'Borderline') return 'marginal';
  return String(rating).toLowerCase().replace(/[^a-z]+/g, '-');
}

function setBanner(kind, title, detail) {
  if (!(banner instanceof HTMLElement)) return;
  banner.classList.remove('status-banner--loading', 'status-banner--live', 'status-banner--degraded', 'status-banner--offline');
  banner.classList.add(`status-banner--${kind}`);
  if (bannerTitle instanceof HTMLElement) {
    bannerTitle.textContent = title;
  }
  if (bannerDetail instanceof HTMLElement) {
    bannerDetail.textContent = detail;
  }
}

function setRefreshState(state, detail = '') {
  if (refreshButton instanceof HTMLButtonElement) {
    refreshButton.disabled = state === 'loading';
    refreshButton.textContent = state === 'loading' ? 'Refreshing...' : 'Refresh river';
  }

  if (refreshNote instanceof HTMLElement) {
    if (state === 'loading') {
      refreshNote.textContent = 'Refreshing grouped route scores.';
      return;
    }

    if (state === 'error') {
      refreshNote.textContent = detail || 'Last refresh failed.';
      return;
    }

    if (lastSuccessAt) {
      refreshNote.textContent = `Last refresh ${new Date(lastSuccessAt).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      })}. Auto-refreshes every 5 minutes.`;
      return;
    }

    refreshNote.textContent = 'Auto-refreshes every 5 minutes.';
  }
}

function renderSelectedRoute(route) {
  if (!route) return;

  const orb = root.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    orb.classList.remove('score-orb--great', 'score-orb--good', 'score-orb--marginal', 'score-orb--no-go');
    orb.classList.add(`score-orb--${ratingToneKey(route.rating)}`);
  }

  setText('selected-score', String(route.score));
  setText('selected-rating', route.rating);
  setText('selected-reach', route.reach);
  setText('selected-decision', `${decisionLabel(route.rating)} - ${route.gaugeBandLabel}`);
  setText('selected-confidence', `${route.confidence.label} confidence (${route.confidence.score}/100)`);
  setText('selected-explanation', route.explanation);

  if (selectedLink instanceof HTMLAnchorElement) {
    selectedLink.href = `/rivers/${route.slug}/`;
    selectedLink.textContent = `Open ${route.reach}`;
  }
}

function renderRouteList(routes) {
  if (!(routeList instanceof HTMLElement)) return;

  routeList.innerHTML = routes
    .map((route) => {
      const active = route.slug === selectedSlug;
      return `
        <button
          class="route-choice${active ? ' route-choice--active' : ''}"
          type="button"
          data-group-route-button
          data-route-slug="${route.slug}"
        >
          <span class="route-choice__eyebrow">${route.state} | ${route.region}</span>
          <strong class="route-choice__title">${route.reach}</strong>
          <span class="route-choice__score route-choice__score--${ratingToneKey(route.rating)}">
            ${route.score} - ${route.rating}
          </span>
          <span class="route-choice__meta">${route.gaugeBandLabel} - ${route.confidence.label} confidence</span>
        </button>
      `;
    })
    .join('');

  for (const button of Array.from(routeList.querySelectorAll('[data-group-route-button]'))) {
    if (!(button instanceof HTMLButtonElement)) continue;
    button.addEventListener('click', () => {
      selectedSlug = button.dataset.routeSlug;
      if (!currentResult) return;
      const route = currentResult.routes.find((candidate) => candidate.slug === selectedSlug);
      if (!route) return;
      renderSelectedRoute(route);
      renderRouteList(currentResult.routes);
    });
  }
}

function normalizeRoutes(routes) {
  return routes.map((route) => ({
    slug: route.river.slug,
    name: route.river.name,
    reach: route.river.reach,
    state: route.river.state,
    region: route.river.region,
    score: route.score,
    rating: route.rating,
    gaugeBandLabel: route.gaugeBandLabel,
    confidence: route.confidence,
    explanation: route.explanation,
    liveData: route.liveData,
  }));
}

async function loadGroup({ silent = false } = {}) {
  if (!silent) {
    setRefreshState('loading');
  }

  try {
    const response = await fetch(`/api/river-groups/${encodeURIComponent(riverId)}.json`, {
      headers: { accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed for river group ${riverId}: HTTP ${response.status}`);
    }

    const payload = await response.json();
    const result = payload?.result;
    const routes = Array.isArray(result?.routes) ? normalizeRoutes(result.routes) : [];

    if (!routes.length) {
      throw new Error(`River group ${riverId} returned no routes.`);
    }

    currentResult = {
      group: result.group,
      routes,
    };

    if (!selectedSlug || !routes.some((route) => route.slug === selectedSlug)) {
      selectedSlug = routes[0].slug;
    }

    const selectedRoute = routes.find((route) => route.slug === selectedSlug) ?? routes[0];
    renderSelectedRoute(selectedRoute);
    renderRouteList(routes);

    const liveCount = routes.filter((route) => route.liveData?.overall === 'live').length;
    setBanner(
      liveCount === routes.length ? 'live' : 'degraded',
      `${routes.length} routes scored for ${result.group.name}.`,
      liveCount === routes.length
        ? 'All listed routes are using fresh enough reads right now.'
        : 'At least one route is using stale or partial reads. Open the full route call before you drive.'
    );

    lastSuccessAt = Date.now();
    setRefreshState('ready');
  } catch (error) {
    console.error('Failed to load river group page.', error);
    setBanner(
      'offline',
      'Grouped route comparison is unavailable.',
      'Open an individual route page if you need a direct live call right now.'
    );
    setRefreshState('error', 'Last refresh failed. Retry now.');
  }
}

if (refreshButton instanceof HTMLButtonElement) {
  refreshButton.addEventListener('click', () => {
    loadGroup();
  });
}

loadGroup();
window.setInterval(() => {
  loadGroup({ silent: true });
}, AUTO_REFRESH_MS);
