import { ratingDisplayLabel } from './ui-taxonomy.js';

const statusLine = document.querySelector('[data-minnesota-guide-status]');
const entries = [...document.querySelectorAll('[data-minnesota-guide-entry]')];

function setText(node, value) {
  if (node instanceof HTMLElement) {
    node.textContent = value;
  }
}

function toneClass(rating) {
  if (rating === 'Strong') return 'minnesota-guide-card__score--strong';
  if (rating === 'Good') return 'minnesota-guide-card__score--good';
  if (rating === 'Fair') return 'minnesota-guide-card__score--fair';
  return 'minnesota-guide-card__score--low';
}

function renderEntry(entry, item) {
  const scoreCard = entry.querySelector('[data-guide-score-card]');
  if (scoreCard instanceof HTMLElement) {
    scoreCard.hidden = false;
    scoreCard.classList.remove(
      'minnesota-guide-card__score--strong',
      'minnesota-guide-card__score--good',
      'minnesota-guide-card__score--fair',
      'minnesota-guide-card__score--low'
    );
    scoreCard.classList.add(toneClass(item.rating));
  }

  setText(entry.querySelector('[data-guide-score]'), String(item.score));
  setText(entry.querySelector('[data-guide-rating]'), ratingDisplayLabel(item.rating, { compact: true }));

  const liveSummary = entry.querySelector('[data-guide-live-summary]');
  const facts = [
    `${ratingDisplayLabel(item.rating, { liveData: item.liveData })} right now`,
    item.summary?.gaugeNow ? `Gauge: ${item.summary.gaugeNow}` : '',
    item.river?.distanceLabel ? item.river.distanceLabel : '',
    item.river?.difficulty ? `${item.river.difficulty} difficulty` : '',
  ].filter(Boolean);

  setText(liveSummary, facts.join(' / '));
}

async function loadScores() {
  const trackedEntries = entries.filter((entry) => entry instanceof HTMLElement && entry.dataset.guideSlug);
  if (trackedEntries.length === 0) {
    setText(statusLine, 'No Paddle Today live scores are attached to this guide yet.');
    return;
  }

  try {
    const response = await fetch('/api/summary.json', {
      headers: { accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed for /api/summary.json: HTTP ${response.status}`);
    }

    const payload = await response.json();
    const itemsBySlug = new Map(
      (Array.isArray(payload?.rivers) ? payload.rivers : [])
        .filter((item) => item?.river?.slug)
        .map((item) => [item.river.slug, item])
    );

    let renderedCount = 0;
    trackedEntries.forEach((entry) => {
      const slug = entry.dataset.guideSlug;
      const item = itemsBySlug.get(slug);
      if (item) {
        renderEntry(entry, item);
        renderedCount += 1;
      }
    });

    setText(
      statusLine,
      renderedCount > 0
        ? `Showing live Paddle Today scores for ${renderedCount} tracked guide ${renderedCount === 1 ? 'route' : 'routes'}.`
        : 'Live Paddle Today scores are unavailable for these guide routes right now.'
    );
  } catch (error) {
    console.error('Failed to load Minnesota paddle guide scores.', error);
    setText(statusLine, 'Live Paddle Today scores are unavailable right now. Use the route links and source links before you go.');
  }
}

loadScores();
