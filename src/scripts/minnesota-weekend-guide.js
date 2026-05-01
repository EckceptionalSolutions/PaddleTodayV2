import { escapeHtml } from './map-runtime.js';
import { bindFavoriteButtons, decorateFavoriteButton, refreshFavoriteButtons } from './favorites-ui.js';
import { confidenceDisplayLabel, ratingDisplayLabel } from './ui-taxonomy.js';

const statusLine = document.querySelector('[data-guide-weekend-status]');
const noteLine = document.querySelector('[data-guide-weekend-note]');
const grid = document.querySelector('[data-guide-weekend-grid]');
const emptyState = document.querySelector('[data-guide-weekend-empty]');
const cardTemplate = document.querySelector('[data-river-card-template]');
const decentRatings = new Set(['Strong', 'Good']);

function setText(node, value) {
  if (node instanceof HTMLElement) {
    node.textContent = value;
  }
}

function isDecentScore(score, rating) {
  return decentRatings.has(rating) && typeof score === 'number' && score >= 70;
}

function isMinnesotaWeekendPick(item) {
  return (
    item?.river?.state === 'Minnesota' &&
    isDecentScore(item?.weekend?.score, item?.weekend?.rating) &&
    isDecentScore(item?.current?.score, item?.current?.rating)
  );
}

function ratingToneKey(rating) {
  if (rating === 'Strong') return 'great';
  if (rating === 'Fair') return 'marginal';
  return String(rating).toLowerCase().replace(/[^a-z]+/g, '-');
}

function weekendVerdict(item) {
  if (item.weekend.rating === 'Strong') return 'Top weekend pick';
  if (item.weekend.rating === 'Good') return 'Good weekend pick';
  return 'Weekend route';
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

function regionStateText(item) {
  return `${item.river.state} / ${item.river.region}`.toUpperCase();
}

function difficultyLabel(item) {
  const difficulty = item?.river?.difficulty;
  if (!difficulty) {
    return '';
  }

  return `${String(difficulty).slice(0, 1).toUpperCase()}${String(difficulty).slice(1)} difficulty`;
}

function factsMarkup(item) {
  const facts = [
    confidenceDisplayLabel(item.weekend.confidence),
    `Today: ${ratingDisplayLabel(item.current.rating, { liveData: item.current.liveData })}`,
    difficultyLabel(item),
    item?.river?.estimatedPaddleTime,
  ];

  return facts
    .filter(Boolean)
    .map((fact) => `<span class="river-card__fact">${escapeHtml(fact)}</span>`)
    .join('');
}

function slotLabel(index) {
  if (index === 0) return 'Best Minnesota pick';
  if (index === 1) return 'Good backup';
  return 'Weekend pick';
}

function createCard(item, index) {
  if (!(cardTemplate instanceof HTMLTemplateElement)) {
    return document.createElement('div');
  }

  const fragment = cardTemplate.content.cloneNode(true);
  const card = fragment.querySelector('.river-card');
  if (!(card instanceof HTMLElement)) {
    return document.createElement('div');
  }

  const tone = ratingToneKey(item.weekend.rating);
  card.classList.add(`river-card--${tone}`, 'river-card--route', 'river-card--weekend', 'river-card--guide-weekend');
  setText(card.querySelector('[data-field="card-kind"]'), 'Guide pick');
  setText(card.querySelector('[data-field="card-slot"]'), slotLabel(index));
  setText(card.querySelector('[data-field="state"]'), regionStateText(item));
  setText(card.querySelector('[data-field="route-label"]'), item.river.reach);
  setText(card.querySelector('[data-field="card-verdict"]'), weekendVerdict(item));
  setText(card.querySelector('[data-field="score"]'), String(item.weekend.score));
  setText(card.querySelector('[data-field="rating"]'), ratingDisplayLabel(item.weekend.rating, { compact: true }));
  setText(
    card.querySelector('[data-field="meta-line"]'),
    `Today: ${ratingDisplayLabel(item.current.rating, { liveData: item.current.liveData })} / ${item.current.score}`
  );
  setText(card.querySelector('[data-field="card-summary-main"]'), item.weekend.summary);

  const signal = card.querySelector('[data-field="raw-signal"]');
  if (signal instanceof HTMLElement) {
    signal.textContent = item.weekend.signalLine || 'Weekend forecast signals are still settling.';
  }

  const facts = card.querySelector('[data-field="card-facts"]');
  const factsSection = card.querySelector('[data-field="card-facts-section"]');
  if (facts instanceof HTMLElement) {
    const markup = factsMarkup(item);
    facts.innerHTML = markup;
    facts.hidden = !markup;
    if (factsSection instanceof HTMLElement) {
      factsSection.hidden = !markup;
    }
  }

  const weather = card.querySelector('[data-field="card-weather"]');
  if (weather instanceof HTMLElement) {
    weather.hidden = true;
  }

  const orb = card.querySelector('.score-orb');
  if (orb instanceof HTMLElement) {
    orb.classList.add(`score-orb--${tone}`);
    orb.setAttribute('aria-label', 'Weekend paddle score');
  }

  const titleLink = card.querySelector('[data-field="card-title-link"]');
  if (titleLink instanceof HTMLAnchorElement) {
    titleLink.href = `/rivers/${item.river.slug}/`;
    titleLink.textContent = item.river.name;
  }

  const link = card.querySelector('[data-card-link]');
  if (link instanceof HTMLAnchorElement) {
    link.href = `/rivers/${item.river.slug}/`;
    link.textContent = 'View route';
  }

  decorateFavoriteButton(card.querySelector('[data-favorite-button]'), favoriteRecord(item));

  return card;
}

function renderGuide(payload) {
  const allItems = Array.isArray(payload?.rivers) ? payload.rivers : [];
  const picks = allItems.filter(isMinnesotaWeekendPick).slice(0, 9);
  const label = typeof payload?.label === 'string' ? payload.label : 'this weekend';

  setText(
    statusLine,
    picks.length > 0
      ? `${picks.length} Minnesota ${picks.length === 1 ? 'route meets' : 'routes meet'} the weekend and current-score filter for ${label}.`
      : `No Minnesota routes meet the Good-or-better current and weekend filter for ${label}.`
  );
  setText(
    noteLine,
    picks.length > 0
      ? `Showing routes from the weekend board with Good or Strong weekend scores and Good or Strong current Paddle Today scores.`
      : 'The filter is intentionally strict. Use the full weekend board for tradeoff routes to re-check.'
  );

  if (grid instanceof HTMLElement) {
    grid.innerHTML = '';
    const fragment = document.createDocumentFragment();
    picks.forEach((item, index) => {
      fragment.appendChild(createCard(item, index));
    });
    grid.appendChild(fragment);
    refreshFavoriteButtons(grid);
  }

  if (emptyState instanceof HTMLElement) {
    emptyState.hidden = picks.length > 0;
  }
}

async function loadGuide() {
  try {
    const response = await fetch('/api/weekend/summary.json', {
      headers: { accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed for /api/weekend/summary.json: HTTP ${response.status}`);
    }

    renderGuide(await response.json());
  } catch (error) {
    console.error('Failed to load Minnesota weekend guide.', error);
    setText(statusLine, 'Weekend recommendations are unavailable right now.');
    setText(noteLine, 'Try the full weekend board or refresh this page in a few minutes.');
    if (emptyState instanceof HTMLElement) {
      emptyState.hidden = false;
    }
  }
}

bindFavoriteButtons(document);
loadGuide();
