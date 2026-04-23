import { escapeHtml } from './map-runtime.js';
import { freshnessLabel, readCachedPayload, writeCachedPayload } from './client-cache.js';
import { bindFavoriteButtons, decorateFavoriteButton, refreshFavoriteButtons } from './favorites-ui.js';
import { confidenceDisplayLabel } from './ui-taxonomy.js';
import { createRequestGuard, isAbortError } from './request-guard.js';

const AUTO_REFRESH_MS = 5 * 60 * 1000;
const WEEKEND_CACHE_KEY = 'weekend-summary:v1';

const snapshotLine = document.querySelector('[data-weekend-snapshot]');
const weekendDates = document.querySelector('[data-weekend-dates]');
const homeFreshness = document.querySelector('[data-home-freshness]');
const homeFreshnessWrap = document.querySelector('[data-home-freshness-wrap]');
const cardTemplate = document.querySelector('[data-river-card-template]');
const weekendGrid = document.querySelector('[data-weekend-grid]');
const weekendEmpty = document.querySelector('[data-weekend-empty]');
const weekendEmptyTitle = document.querySelector('[data-weekend-empty-title]');
const weekendEmptyCopy = document.querySelector('[data-weekend-empty-copy]');
const weekendWatchSection = document.querySelector('[data-weekend-watch-section]');
const weekendWatchGrid = document.querySelector('[data-weekend-watch-grid]');

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
const fairCount = document.querySelector('[data-weekend-fair-count]');
const withheldCount = document.querySelector('[data-weekend-withheld-count]');

let lastGeneratedAt = null;
let latestWeekendItems = [];
const weekendRequestGuard = createRequestGuard();

function splitWeekendItems(items) {
  return {
    bestBets: items.filter((item) => item.weekend.rating === 'Strong' || item.weekend.rating === 'Good'),
    worthWatching: items.filter((item) => item.weekend.rating === 'Fair'),
  };
}

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

function splitBulletParts(text) {
  if (typeof text !== 'string') {
    return [];
  }

  return text
    .split(/\s+(?:\u2022|\/)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseWeekendSignalLine(rawSignal) {
  if (typeof rawSignal !== 'string' || !rawSignal.trim()) {
    return [];
  }

  return splitBulletParts(rawSignal)
    .map((part) => {
      if (/^Gauge:/i.test(part)) {
        return { kind: 'gauge', value: part.replace(/^Gauge:\s*/i, '') };
      }
      if (/^Wind:/i.test(part)) {
        return { kind: 'wind', value: part.replace(/^Wind:\s*/i, '') };
      }
      if (/^Temps?:/i.test(part)) {
        return { kind: 'temp', value: part.replace(/^Temps?:\s*/i, '') };
      }
      if (/^High:/i.test(part)) {
        return { kind: 'temp', value: part.replace(/^High:\s*/i, '') };
      }
      if (/^Low:/i.test(part)) {
        return { kind: 'temp', value: part.replace(/^Low:\s*/i, '') };
      }
      return null;
    })
    .filter(Boolean);
}

function parseWeekendTemperature(rawSignal) {
  const match =
    typeof rawSignal === 'string'
      ? rawSignal.match(/Temps?:\s*(-?\d+)(?:\u00B0)?(?:\s*-\s*|-)(-?\d+)(?:\u00B0)?F/i) ||
        rawSignal.match(/High:\s*(-?\d+)(?:\u00B0)?F/i) ||
        rawSignal.match(/Low:\s*(-?\d+)(?:\u00B0)?F/i)
      : null;
  if (!match) {
    return null;
  }

  const values = match.slice(1).filter(Boolean).map((value) => Number.parseInt(value, 10)).filter(Number.isFinite);
  if (values.length === 0) {
    return null;
  }

  return Math.min(...values);
}

function signalIconMarkup(kind) {
  switch (kind) {
    case 'gauge':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 15c2.2 0 2.2-3 4.4-3s2.2 3 4.4 3 2.2-3 4.4-3 2.2 3 4.4 3"></path>
          <path d="M3 19c2.2 0 2.2-3 4.4-3s2.2 3 4.4 3 2.2-3 4.4-3 2.2 3 4.4 3"></path>
        </svg>
      `;
    case 'wind':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 9h10a2.5 2.5 0 1 0-2.5-2.5"></path>
          <path d="M3 13h14a2.5 2.5 0 1 1-2.5 2.5"></path>
          <path d="M5 17h7"></path>
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0Z"></path>
          <path d="M12 9v8"></path>
        </svg>
      `;
  }
}

function weekendSignalRowMarkup(item) {
  const items = parseWeekendSignalLine(item?.weekend?.signalLine);
  if (items.length === 0) {
    return '<span class="river-card__signal-empty">Weekend forecast still settling.</span>';
  }

  return items
    .map(
      (entry) => `
        <span class="river-card__signal-item">
          <span class="river-card__signal-icon river-card__signal-icon--${entry.kind}">
            ${signalIconMarkup(entry.kind)}
          </span>
          <span>${escapeHtml(entry.value)}</span>
        </span>
      `
    )
    .join('');
}

function weatherVisualLabel(state) {
  switch (state) {
    case 'storm':
      return 'Storm risk';
    case 'rain':
      return 'Rain later';
    case 'cold':
      return 'Cold weather';
    case 'wind':
      return 'Windy';
    default:
      return 'Mostly dry';
  }
}

function weatherVisualMarkup(state) {
  const label = weatherVisualLabel(state);

  switch (state) {
    case 'storm':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <path d="M7 15.5a4 4 0 1 1 .9-7.9A5 5 0 0 1 18 9.5a3.5 3.5 0 1 1-.5 7H7Z"></path>
          <path d="m12 15 2 0-1.4 3H15l-3 4 1-3h-2Z"></path>
        </svg>
      `;
    case 'rain':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <path d="M7 16a4 4 0 1 1 .9-7.9A5 5 0 0 1 18 10a3.5 3.5 0 1 1-.5 7H7Z"></path>
          <path d="M9 18.5l-.8 2"></path>
          <path d="M13 18.5l-.8 2"></path>
          <path d="M17 18.5l-.8 2"></path>
        </svg>
      `;
    case 'cold':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <path d="M12 3v18"></path>
          <path d="M5.5 6.5 18.5 17.5"></path>
          <path d="M5.5 17.5 18.5 6.5"></path>
          <path d="M4 12h16"></path>
        </svg>
      `;
    case 'wind':
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <path d="M4 9h10a2.5 2.5 0 1 0-2.5-2.5"></path>
          <path d="M3 13h14a2.5 2.5 0 1 1-2.5 2.5"></path>
          <path d="M5 17h7"></path>
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-label="${label}" role="img">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2.5v3"></path>
          <path d="M12 18.5v3"></path>
          <path d="m4.9 4.9 2.1 2.1"></path>
          <path d="m17 17 2.1 2.1"></path>
          <path d="M2.5 12h3"></path>
          <path d="M18.5 12h3"></path>
          <path d="m4.9 19.1 2.1-2.1"></path>
          <path d="m17 7 2.1-2.1"></path>
        </svg>
      `;
  }
}

function weekendWeatherVisualState(item) {
  const combined = `${item?.weekend?.summary || ''} ${item?.weekend?.explanation || ''} ${item?.weekend?.signalLine || ''}`.toLowerCase();
  const temperature = parseWeekendTemperature(item?.weekend?.signalLine);
  const coldSevere = typeof temperature === 'number' && temperature <= 35;
  const coldNoticeable = typeof temperature === 'number' && temperature <= 40;

  if (combined.includes('storm')) {
    return 'storm';
  }
  if (coldSevere) {
    return 'cold';
  }
  if (combined.includes('rain')) {
    return 'rain';
  }
  if (coldNoticeable) {
    return 'cold';
  }
  if (combined.includes('wind')) {
    return 'wind';
  }
  return 'calm';
}

function weekendWeatherBadgeMarkup(item) {
  const state = weekendWeatherVisualState(item);
  const label = weatherVisualLabel(state);

  return `
    <span class="card-weather-badge card-weather-badge--${state}">
      <span class="card-weather-badge__icon weather-indicator weather-indicator--${state}" aria-hidden="true">
        ${weatherVisualMarkup(state)}
      </span>
      <span class="card-weather-badge__label">${escapeHtml(label)}</span>
    </span>
  `;
}

function weekendVerdict(item) {
  if (item.weekend.rating === 'Strong') return 'Top weekend pick';
  if (item.weekend.rating === 'Good') return 'Good weekend pick';
  if (item.weekend.rating === 'Fair') return 'Fair to re-check';
  return 'No weekend pick';
}

function regionStateText(item) {
  return `${item.river.state} \u2022 ${item.river.region}`.toUpperCase();
}

function difficultyLabel(item) {
  const difficulty = item?.river?.difficulty;
  if (!difficulty) {
    return '';
  }

  return `${String(difficulty).slice(0, 1).toUpperCase()}${String(difficulty).slice(1)} difficulty`;
}

function favoriteRecord(item) {
  if (!item?.river?.slug) {
    return null;
  }

  return {
    slug: item.river.slug,
    name: item.river.name,
    reach: item.river.reach,
    state: item.river.state,
    region: item.river.region,
    url: `/rivers/${encodeURIComponent(item.river.slug)}/`,
  };
}

function weekendMetaText(item) {
  const parts = [
    confidenceDisplayLabel(item.weekend.confidence),
    `Today: ${item.current.rating}`,
  ];

  if (difficultyLabel(item)) {
    parts.push(difficultyLabel(item));
  }
  if (item?.river?.estimatedPaddleTime) {
    parts.push(item.river.estimatedPaddleTime);
  }

  return parts.join(' \u2022 ');
}

function weekendFactsMarkup(item) {
  const facts = [
    confidenceDisplayLabel(item.weekend.confidence),
    `Today: ${item.current.rating}`,
  ];

  if (difficultyLabel(item)) {
    facts.push(difficultyLabel(item));
  }

  if (item?.river?.estimatedPaddleTime) {
    facts.push(item.river.estimatedPaddleTime);
  }

  return facts
    .filter(Boolean)
    .map((fact) => `<span class="river-card__fact">${escapeHtml(fact)}</span>`)
    .join('');
}

function supportingReason(item) {
  if (item.current.rating !== item.weekend.rating) {
    return `Today is ${item.current.rating.toLowerCase()}, but the weekend projection improves to ${item.weekend.rating.toLowerCase()}.`;
  }

  const lowered = item.weekend.explanation.toLowerCase();
  if (lowered.includes('conservative')) {
    return 'Weekend picks stay a little more conservative than today.';
  }

  return '';
}

function slotLabel(index) {
  if (index === 0) return 'Top weekend pick';
  if (index === 1) return 'Another good pick';
  if (index === 2) return 'Good backup';
  return 'Another pick';
}

function watchSlotLabel(index) {
  if (index === 0) return 'Fair route';
  return 'Also fair';
}

function weekendDateRangeText(label) {
  if (typeof label !== 'string') {
    return 'Dates loading';
  }

  const trimmed = label.trim();
  const match = trimmed.match(/\(([^)]+)\)/);
  if (match?.[1]) {
    return match[1];
  }

  return trimmed.replace(/^weekend\s*/i, '').trim() || 'Dates loading';
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

  const items = Array.isArray(payload?.rivers) ? payload.rivers : [];
  const { bestBets, worthWatching } = splitWeekendItems(items);
  const count = bestBets.length;
  const withheld = payload?.withheldCount ?? 0;
  const bestLabel = payload?.label || 'Weekend';

  if (count <= 0) {
    if (worthWatching.length > 0) {
      const watchLabel =
        worthWatching.length === 1
          ? '1 fair route worth re-checking'
          : `${worthWatching.length} fair routes worth re-checking`;
      snapshotLine.textContent = `No weekend picks yet / ${watchLabel}`;
      return;
    }

    snapshotLine.textContent =
      withheld > 0
        ? `No weekend picks yet / ${withheld} routes still need better support`
        : 'No weekend picks yet / forecast support is still building';
    return;
  }

  const countLabel = count === 1 ? '1 weekend pick' : `${count} weekend picks`;
  const insight = withheld > 0 ? `${withheld} still need better support` : bestLabel;
  snapshotLine.textContent = `${countLabel} / ${insight}`;
}

function updateOverviewCounts(payload) {
  const rivers = Array.isArray(payload?.rivers) ? payload.rivers : [];
  const strong = rivers.filter((item) => item.weekend.rating === 'Strong').length;
  const good = rivers.filter((item) => item.weekend.rating === 'Good').length;
  const fair = rivers.filter((item) => item.weekend.rating === 'Fair').length;
  setText(strongCount, String(strong));
  setText(goodCount, String(good));
  setText(fairCount, String(fair));
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

function renderFeatured(item, worthWatchingCount = 0) {
  if (!item) {
    setText(featuredLabel, 'Top weekend pick');
    setText(featuredState, 'Conservative planning mode');
    setText(
      featuredName,
      worthWatchingCount > 0 ? 'No weekend picks yet' : 'No supported weekend picks yet'
    );
    setText(
      featuredReach,
      worthWatchingCount > 0
        ? 'A few fair routes are worth re-checking, but none are strong enough to recommend yet.'
        : 'Forecast support is still too thin to surface a confident shortlist.'
    );
    setText(featuredVerdict, worthWatchingCount > 0 ? 'Fair routes to re-check' : 'Not shaping up yet');
    setText(featuredScore, '--');
    setText(featuredRating, 'No-go');
    setText(featuredConfidence, 'Support building');
    setText(featuredCurrent, 'Check again later');
    setText(
      featuredReason,
      worthWatchingCount > 0
        ? 'The forecast is warm enough to watch, but still too risky to recommend a route yet.'
        : 'Nothing is lining up well enough for a confident weekend pick yet.'
    );
    setText(
      featuredSignal,
      worthWatchingCount > 0
        ? `${worthWatchingCount} ${worthWatchingCount === 1 ? 'fair route is' : 'fair routes are'} worth re-checking`
        : 'Forecast support still building'
    );
    setText(
      featuredExplanation,
      worthWatchingCount > 0
        ? 'This page is intentionally conservative. Warm temperatures alone are not enough for a weekend recommendation when the weekend rain or storm signal is still this strong.'
        : 'This page is intentionally conservative. Weekend picks only show up when the current gauge and forecast both look solid.'
    );

    if (featuredReasons instanceof HTMLElement) {
      featuredReasons.innerHTML = '';
      featuredReasons.hidden = true;
    }

    updateFeaturedSummaryToggle(featuredExplanation.textContent || '');

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

  setText(featuredLabel, 'Top weekend pick');
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

function createWeekendCard(item, index, options = {}) {
  if (!(cardTemplate instanceof HTMLTemplateElement)) {
    return document.createElement('div');
  }

  const fragment = cardTemplate.content.cloneNode(true);
  const card = fragment.querySelector('.river-card');
  if (!(card instanceof HTMLElement)) {
    return document.createElement('div');
  }

  const tone = ratingToneKey(item.weekend.rating);
  card.classList.add(`river-card--${tone}`, 'river-card--route', 'river-card--weekend');
  if (options.watchCard) {
    card.classList.add('river-card--weekend-watch');
  }

  const slotText = typeof options.slotLabel === 'string' ? options.slotLabel : slotLabel(index);
  setText(card.querySelector('[data-field="card-kind"]'), 'Weekend');
  setText(card.querySelector('[data-field="card-slot"]'), slotText);
  setText(card.querySelector('[data-field="state"]'), regionStateText(item));
  setText(card.querySelector('[data-field="route-label"]'), item.river.reach);
  setText(card.querySelector('[data-field="card-verdict"]'), weekendVerdict(item));
  setText(card.querySelector('[data-field="score"]'), String(item.weekend.score));
  setText(card.querySelector('[data-field="rating"]'), item.weekend.rating);
  setText(card.querySelector('[data-field="meta-line"]'), '');
  setText(card.querySelector('[data-field="card-summary-main"]'), item.weekend.summary);

  const signal = card.querySelector('[data-field="raw-signal"]');
  if (signal instanceof HTMLElement) {
    signal.innerHTML = weekendSignalRowMarkup(item);
  }

  const facts = card.querySelector('[data-field="card-facts"]');
  const factsSection = card.querySelector('[data-field="card-facts-section"]');
  if (facts instanceof HTMLElement) {
    const factsMarkup = weekendFactsMarkup(item);
    facts.innerHTML = factsMarkup;
    facts.hidden = !factsMarkup;
    if (factsSection instanceof HTMLElement) {
      factsSection.hidden = !factsMarkup;
    }
  }

  const weather = card.querySelector('[data-field="card-weather"]');
  if (weather instanceof HTMLElement) {
    weather.hidden = false;
    weather.innerHTML = weekendWeatherBadgeMarkup(item);
  }

  const orb = card.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    orb.classList.add(`score-orb--${tone}`);
  }

  const titleLink = card.querySelector('[data-field="card-title-link"]');
  if (titleLink instanceof HTMLAnchorElement) {
    titleLink.href = `/rivers/${item.river.slug}/`;
    titleLink.textContent = item.river.name;
  }

  const link = card.querySelector('[data-card-link]');
  if (link instanceof HTMLAnchorElement) {
    link.href = `/rivers/${item.river.slug}/`;
    link.textContent = 'View river';
  }

  decorateFavoriteButton(card.querySelector('[data-favorite-button]'), favoriteRecord(item));

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
  refreshFavoriteButtons(weekendGrid);

  if (weekendEmpty instanceof HTMLElement) {
    weekendEmpty.hidden = items.length > 0;
  }
}

function updateWeekendEmptyState({ worthWatchingCount = 0, hasWithheld = false } = {}) {
  if (!(weekendEmpty instanceof HTMLElement)) {
    return;
  }

  if (worthWatchingCount > 0) {
    weekendEmpty.hidden = false;
      setText(weekendEmptyTitle, 'No weekend picks yet');
      setText(
        weekendEmptyCopy,
        worthWatchingCount === 1
          ? '1 fair route is worth re-checking if the forecast improves, but none are strong enough to recommend yet.'
        : `${worthWatchingCount} fair routes are worth re-checking if the forecast improves, but none are strong enough to recommend yet.`
    );
    return;
  }

  weekendEmpty.hidden = false;
  setText(weekendEmptyTitle, hasWithheld ? 'No weekend picks yet' : 'No supported weekend picks yet');
  setText(
    weekendEmptyCopy,
    hasWithheld
      ? 'Current river shape and forecast support are still too thin to surface a confident weekend pick.'
      : 'Forecast support is still too weak to recommend weekend picks.'
  );
}

function renderWatchGrid(items) {
  if (!(weekendWatchSection instanceof HTMLElement) || !(weekendWatchGrid instanceof HTMLElement)) {
    return;
  }

  weekendWatchSection.hidden = items.length <= 0;
  weekendWatchGrid.innerHTML = '';

  if (items.length <= 0) {
    return;
  }

  const fragment = document.createDocumentFragment();
  items.slice(0, 6).forEach((item, index) => {
    fragment.appendChild(createWeekendCard(item, index, { slotLabel: watchSlotLabel(index), watchCard: true }));
  });
  weekendWatchGrid.appendChild(fragment);
  refreshFavoriteButtons(weekendWatchGrid);
}

function renderWeekend(payload) {
  const items = Array.isArray(payload?.rivers) ? payload.rivers : [];
  const { bestBets, worthWatching } = splitWeekendItems(items);
  latestWeekendItems = items;
  lastGeneratedAt = typeof payload?.generatedAt === 'string' ? payload.generatedAt : null;
  setText(weekendDates, weekendDateRangeText(payload?.label));
  updateFreshness({ generatedAt: lastGeneratedAt });
  updateSnapshotLine(payload);
  updateOverviewCounts(payload);
  renderFeatured(bestBets[0] ?? null, worthWatching.length);
  renderGrid(bestBets);
  renderWatchGrid(worthWatching);

  if (weekendEmpty instanceof HTMLElement) {
    if (bestBets.length > 0) {
      weekendEmpty.hidden = true;
    } else {
      updateWeekendEmptyState({
        worthWatchingCount: worthWatching.length,
        hasWithheld: (payload?.withheldCount ?? 0) > 0,
      });
    }
  }
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
  const { requestId, controller } = weekendRequestGuard.begin();

  try {
    if (silent && lastGeneratedAt) {
      updateFreshness({ generatedAt: lastGeneratedAt, refreshing: true });
    }

    const response = await fetch('/api/weekend/summary.json', {
      headers: { accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API request failed for /api/weekend/summary.json: HTTP ${response.status}`);
    }

    const payload = await response.json();
    if (!weekendRequestGuard.isCurrent(requestId)) {
      return;
    }
    writeCachedPayload(WEEKEND_CACHE_KEY, payload);
    renderWeekend(payload);
  } catch (error) {
    if (isAbortError(error)) {
      return;
    }

    if (!weekendRequestGuard.isCurrent(requestId)) {
      return;
    }
    console.error('Failed to load weekend river scores.', error);

    if (latestWeekendItems.length > 0) {
      updateFreshness({ generatedAt: lastGeneratedAt, fallback: true });
      return;
    }

    updateSnapshotLine({ riverCount: 0, withheldCount: 0 });
    renderFeatured(null);
    renderGrid([]);
  } finally {
    weekendRequestGuard.finish(controller);
  }
}

if (featuredToggle instanceof HTMLButtonElement && featuredExplanation instanceof HTMLElement) {
  featuredToggle.addEventListener('click', () => {
    const expanded = featuredExplanation.classList.toggle('hero-call__summary--expanded');
    featuredToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    featuredToggle.textContent = expanded ? 'Less' : 'Details';
  });
}

bindFavoriteButtons(document);
const hydrated = hydrateFromCache();
loadWeekend({ silent: hydrated });
window.setInterval(() => {
  loadWeekend({ silent: true });
}, AUTO_REFRESH_MS);
