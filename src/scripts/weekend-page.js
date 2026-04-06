import { escapeHtml } from '/scripts/map-runtime.js';
import { freshnessLabel, readCachedPayload, writeCachedPayload } from '/scripts/client-cache.js';

const AUTO_REFRESH_MS = 5 * 60 * 1000;
const WEEKEND_CACHE_KEY = 'weekend-summary:v1';

const snapshotLine = document.querySelector('[data-weekend-snapshot]');
const homeFreshness = document.querySelector('[data-home-freshness]');
const homeFreshnessWrap = document.querySelector('[data-home-freshness-wrap]');
const cardTemplate = document.querySelector('[data-weekend-card-template]');
const weekendGrid = document.querySelector('[data-weekend-grid]');
const weekendEmpty = document.querySelector('[data-weekend-empty]');

const featuredPanel = document.querySelector('.weekend-hero__featured');
const featuredLabel = document.querySelector('[data-weekend-featured-label]');
const featuredState = document.querySelector('[data-weekend-featured-state]');
const featuredName = document.querySelector('[data-weekend-featured-name]');
const featuredReach = document.querySelector('[data-weekend-featured-reach]');
const featuredVerdict = document.querySelector('[data-weekend-featured-verdict]');
const featuredScore = document.querySelector('[data-weekend-featured-score]');
const featuredRating = document.querySelector('[data-weekend-featured-rating]');
const featuredConfidence = document.querySelector('[data-weekend-featured-confidence]');
const featuredCurrent = document.querySelector('[data-weekend-featured-current]');
const featuredReason = document.querySelector('[data-weekend-featured-reason]');
const featuredSignal = document.querySelector('[data-weekend-featured-signal]');
const featuredReasons = document.querySelector('[data-weekend-featured-reasons]');
const featuredExplanation = document.querySelector('[data-weekend-featured-explanation]');
const featuredToggle = document.querySelector('[data-weekend-featured-toggle]');
const featuredLink = document.querySelector('[data-weekend-featured-link]');

const strongCount = document.querySelector('[data-weekend-strong-count]');
const goodCount = document.querySelector('[data-weekend-good-count]');
const withheldCount = document.querySelector('[data-weekend-withheld-count]');

let lastGeneratedAt = null;
let latestWeekendItems = [];

function setText(node, value) {
  if (node instanceof HTMLElement) {
    node.textContent = value;
  }
}

function ratingToneKey(rating) {
  if (rating === 'Strong') return 'great';
  if (rating === 'Fair') return 'marginal';
  return String(rating).toLowerCase().replace(/[^a-z]+/g, '-');
}

function confidenceDisplayLabel(label) {
  if (label === 'High') return 'Well-supported';
  if (label === 'Medium') return 'Some uncertainty';
  if (label === 'Low') return 'Cautious call';
  return 'Support unclear';
}

function weekendVerdict(item) {
  if (item.weekend.rating === 'Strong') return 'Best bet';
  if (item.weekend.rating === 'Good') return 'Solid weekend bet';
  if (item.weekend.rating === 'Fair') return 'Check again later';
  return 'Unlikely weekend bet';
}

function regionStateText(item) {
  return `${item.river.state} • ${item.river.region}`.toUpperCase();
}

function weekendMetaText(item) {
  return `${confidenceDisplayLabel(item.weekend.confidence)} • Today: ${item.current.rating}`;
}

function supportingReason(item) {
  if (item.current.rating !== item.weekend.rating) {
    return `Today is ${item.current.rating.toLowerCase()}, but the weekend projection improves to ${item.weekend.rating.toLowerCase()}.`;
  }

  const lowered = item.weekend.explanation.toLowerCase();
  if (lowered.includes('conservative')) {
    return 'Weekend calls stay a little more conservative than today.';
  }

  return '';
}

function slotLabel(index) {
  if (index === 0) return 'Top weekend pick';
  if (index === 1) return 'Worth planning around';
  if (index === 2) return 'Another good bet';
  return 'Also worth watching';
}

function updateFreshness({ generatedAt = lastGeneratedAt, refreshing = false, fallback = false } = {}) {
  if (!(homeFreshness instanceof HTMLElement)) {
    return;
  }

  if (homeFreshnessWrap instanceof HTMLElement) {
    homeFreshnessWrap.hidden = false;
  }

  const base =
    typeof generatedAt === 'string' && generatedAt
      ? freshnessLabel(new Date(generatedAt).getTime())
      : 'Updated recently';

  if (refreshing && generatedAt) {
    homeFreshness.textContent = `${base}. Refreshing now...`;
    return;
  }

  if (fallback && generatedAt) {
    homeFreshness.textContent = `${base}. Showing latest available data.`;
    return;
  }

  homeFreshness.textContent = `${base}.`;
}

function updateSnapshotLine(payload) {
  if (!(snapshotLine instanceof HTMLElement)) {
    return;
  }

  const count = payload?.riverCount ?? 0;
  const withheld = payload?.withheldCount ?? 0;
  const bestLabel = payload?.label || 'Weekend';

  if (count <= 0) {
    snapshotLine.textContent =
      withheld > 0
        ? `No supported weekend picks yet • ${withheld} reaches withheld for weak support`
        : 'No supported weekend picks yet • forecast support is still building';
    return;
  }

  const countLabel = count === 1 ? '1 route worth watching' : `${count} routes worth watching`;
  const insight = withheld > 0 ? `${withheld} withheld until support improves` : bestLabel;
  snapshotLine.textContent = `${countLabel} • ${insight}`;
}

function updateOverviewCounts(payload) {
  const rivers = Array.isArray(payload?.rivers) ? payload.rivers : [];
  const strong = rivers.filter((item) => item.weekend.rating === 'Strong').length;
  const good = rivers.filter((item) => item.weekend.rating === 'Good').length;
  setText(strongCount, String(strong));
  setText(goodCount, String(good));
  setText(withheldCount, String(payload?.withheldCount ?? 0));
}

function updateFeaturedSummaryToggle(text) {
  if (!(featuredToggle instanceof HTMLButtonElement) || !(featuredExplanation instanceof HTMLElement)) {
    return;
  }

  const normalized = typeof text === 'string' ? text.trim() : '';
  const shouldShow = normalized.length > 0;
  featuredToggle.hidden = !shouldShow;

  if (!shouldShow) {
    featuredExplanation.classList.remove('hero-call__summary--expanded');
    featuredToggle.setAttribute('aria-expanded', 'false');
    return;
  }

  featuredToggle.textContent = featuredExplanation.classList.contains('hero-call__summary--expanded')
    ? 'Less'
    : 'Details';
}

function renderFeatured(item) {
  if (!item) {
    setText(featuredLabel, 'Best weekend bet');
    setText(featuredState, 'Conservative planning mode');
    setText(featuredName, 'No supported weekend picks yet');
    setText(featuredReach, 'Forecast support is still too thin to surface a confident shortlist.');
    setText(featuredVerdict, 'Weekend calls withheld');
    setText(featuredScore, '--');
    setText(featuredRating, 'Withheld');
    setText(featuredConfidence, 'Support building');
    setText(featuredCurrent, 'Check again later');
    setText(
      featuredReason,
      'Weekend calls stay hidden until the forecast and river shape line up well enough to trust.'
    );
    setText(featuredSignal, 'Forecast support still building');
    setText(
      featuredExplanation,
      'This page is intentionally conservative. Weekend picks only appear when the current gauge read is good enough and the weekend forecast is strong enough to extend the call.'
    );

    if (featuredReasons instanceof HTMLElement) {
      featuredReasons.innerHTML = '';
      featuredReasons.hidden = true;
    }

    updateFeaturedSummaryToggle(
      'This page is intentionally conservative. Weekend picks only appear when the current gauge read is good enough and the weekend forecast is strong enough to extend the call.'
    );

    if (featuredLink instanceof HTMLAnchorElement) {
      featuredLink.href = '/';
      featuredLink.textContent = "Today's board";
    }

    return;
  }

  const tone = ratingToneKey(item.weekend.rating);
  if (featuredPanel instanceof HTMLElement) {
    featuredPanel.classList.remove('hero-call--great', 'hero-call--good', 'hero-call--marginal', 'hero-call--no-go');
    featuredPanel.classList.add(`hero-call--${tone}`);
  }

  setText(featuredLabel, 'Best weekend bet');
  setText(featuredState, item.weekend.label);
  setText(featuredName, item.river.name);
  setText(featuredReach, item.river.reach);
  setText(featuredVerdict, weekendVerdict(item));
  setText(featuredScore, String(item.weekend.score));
  setText(featuredRating, item.weekend.rating);
  setText(featuredConfidence, confidenceDisplayLabel(item.weekend.confidence));
  setText(featuredCurrent, `Today: ${item.current.rating}`);
  setText(featuredReason, item.weekend.summary);
  setText(featuredSignal, item.weekend.signalLine);
  setText(featuredExplanation, item.weekend.explanation);

  if (featuredReasons instanceof HTMLElement) {
    const reason = supportingReason(item);
    featuredReasons.innerHTML = reason ? `<li>${escapeHtml(reason)}</li>` : '';
    featuredReasons.hidden = !reason;
  }

  updateFeaturedSummaryToggle(item.weekend.explanation);
  if (featuredLink instanceof HTMLAnchorElement) {
    featuredLink.href = `/rivers/${item.river.slug}/`;
    featuredLink.textContent = 'View river';
  }
}

function createWeekendCard(item, index) {
  if (!(cardTemplate instanceof HTMLTemplateElement)) {
    return document.createElement('div');
  }

  const fragment = cardTemplate.content.cloneNode(true);
  const card = fragment.querySelector('.recommendation-card');
  if (!(card instanceof HTMLElement)) {
    return document.createElement('div');
  }

  const tone = ratingToneKey(item.weekend.rating);
  card.classList.add(`recommendation-card--${tone}`);

  setText(card.querySelector('[data-field="weekend-slot"]'), slotLabel(index));
  setText(card.querySelector('[data-field="weekend-state"]'), regionStateText(item));
  setText(card.querySelector('[data-field="weekend-name"]'), item.river.name);
  setText(card.querySelector('[data-field="weekend-route"]'), item.river.reach);
  setText(card.querySelector('[data-field="weekend-verdict"]'), weekendVerdict(item));
  setText(card.querySelector('[data-field="weekend-score"]'), String(item.weekend.score));
  setText(card.querySelector('[data-field="weekend-rating"]'), item.weekend.rating);
  setText(card.querySelector('[data-field="weekend-meta"]'), weekendMetaText(item));
  setText(card.querySelector('[data-field="weekend-summary"]'), item.weekend.summary);
  setText(card.querySelector('[data-field="weekend-signal"]'), item.weekend.signalLine);
  setText(card.querySelector('[data-field="weekend-full"]'), item.weekend.explanation);

  const reasons = card.querySelector('[data-field="weekend-reasons"]');
  if (reasons instanceof HTMLElement) {
    const reason = supportingReason(item);
    reasons.innerHTML = reason ? `<li>${escapeHtml(reason)}</li>` : '';
    reasons.hidden = !reason;
  }

  const details = card.querySelector('.recommendation-card__details');
  if (details instanceof HTMLElement) {
    details.hidden = !item.weekend.explanation;
  }

  const orb = card.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    orb.classList.add(`score-orb--${tone}`);
  }

  const link = card.querySelector('[data-field="weekend-link"]');
  if (link instanceof HTMLAnchorElement) {
    link.href = `/rivers/${item.river.slug}/`;
    link.textContent = 'View river';
  }

  return card;
}

function renderGrid(items) {
  if (!(weekendGrid instanceof HTMLElement)) {
    return;
  }

  weekendGrid.innerHTML = '';
  const fragment = document.createDocumentFragment();
  items.slice(0, 6).forEach((item, index) => {
    fragment.appendChild(createWeekendCard(item, index));
  });
  weekendGrid.appendChild(fragment);

  if (weekendEmpty instanceof HTMLElement) {
    weekendEmpty.hidden = items.length > 0;
  }
}

function renderWeekend(payload) {
  const items = Array.isArray(payload?.rivers) ? payload.rivers : [];
  latestWeekendItems = items;
  lastGeneratedAt = typeof payload?.generatedAt === 'string' ? payload.generatedAt : null;
  updateFreshness({ generatedAt: lastGeneratedAt });
  updateSnapshotLine(payload);
  updateOverviewCounts(payload);
  renderFeatured(items[0] ?? null);
  renderGrid(items);
}

function hydrateFromCache() {
  const cached = readCachedPayload(WEEKEND_CACHE_KEY);
  if (!cached?.payload || !Array.isArray(cached.payload.rivers)) {
    return false;
  }

  renderWeekend(cached.payload);
  updateFreshness({ generatedAt: cached.payload.generatedAt, refreshing: true });
  return true;
}

async function loadWeekend({ silent = false } = {}) {
  try {
    if (silent && lastGeneratedAt) {
      updateFreshness({ generatedAt: lastGeneratedAt, refreshing: true });
    }

    const response = await fetch('/api/weekend/summary.json', {
      headers: { accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed for /api/weekend/summary.json: HTTP ${response.status}`);
    }

    const payload = await response.json();
    writeCachedPayload(WEEKEND_CACHE_KEY, payload);
    renderWeekend(payload);
  } catch (error) {
    console.error('Failed to load weekend river scores.', error);

    if (latestWeekendItems.length > 0) {
      updateFreshness({ generatedAt: lastGeneratedAt, fallback: true });
      return;
    }

    updateSnapshotLine({ riverCount: 0, withheldCount: 0 });
    renderFeatured(null);
    renderGrid([]);
  }
}

if (featuredToggle instanceof HTMLButtonElement && featuredExplanation instanceof HTMLElement) {
  featuredToggle.addEventListener('click', () => {
    const expanded = featuredExplanation.classList.toggle('hero-call__summary--expanded');
    featuredToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    featuredToggle.textContent = expanded ? 'Less' : 'Details';
  });
}

const hydrated = hydrateFromCache();
loadWeekend({ silent: hydrated });
window.setInterval(() => {
  loadWeekend({ silent: true });
}, AUTO_REFRESH_MS);
