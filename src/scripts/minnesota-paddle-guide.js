import { callLabelForDecision } from '@paddletoday/api-contract';
import { getBrowserApiClient } from './browser-api-client.js';
import { isCurrentCallUnavailable } from './board-presenters.js';

const statusLine = document.querySelector('[data-minnesota-guide-status]');
const entries = [...document.querySelectorAll('[data-minnesota-guide-entry]')];
const retry = document.querySelector('[data-guide-retry]');
let pending = false;

function renderUnavailable(entry, reason = 'Live conditions are unavailable. Open the route and check its sources before you go.') {
  const score = entry.querySelector('[data-guide-score-card]');
  if (score instanceof HTMLElement) score.hidden = true;
  setText(entry.querySelector('[data-guide-live-summary]'), reason);
}

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
  if (isCurrentCallUnavailable(item)) {
    renderUnavailable(entry, item.readiness?.reason || 'Current evidence cannot support a call. Check the route sources.');
    return;
  }
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
  setText(entry.querySelector('[data-guide-rating]'), callLabelForDecision(item.rating, item.readiness?.status, 'today', true));

  const liveSummary = entry.querySelector('[data-guide-live-summary]');
  const facts = [
    `${callLabelForDecision(item.rating, item.readiness?.status)} right now`,
    item.summary?.gaugeNow ? `Gauge: ${item.summary.gaugeNow}` : '',
    item.river?.distanceLabel ? item.river.distanceLabel : '',
    item.river?.difficulty ? `${item.river.difficulty} difficulty` : '',
  ].filter(Boolean);

  setText(liveSummary, facts.join(' / '));
}

async function loadScores() {
  if (pending) return;
  const fromRetry = document.activeElement === retry;
  const trackedEntries = entries.filter((entry) => entry instanceof HTMLElement && entry.dataset.guideSlug);
  if (trackedEntries.length === 0) {
    setText(statusLine, 'No Paddle Today live scores are attached to this guide yet.');
    return;
  }

  pending = true;
  if (retry instanceof HTMLButtonElement) { retry.disabled = true; retry.textContent = 'Checking scores…'; }
  try {
    const payload = await getBrowserApiClient().getSummary({
      cache: 'no-store',
    });
    const itemsBySlug = new Map(
      (Array.isArray(payload?.rivers) ? payload.rivers : [])
        .filter((item) => item?.river?.slug)
        .map((item) => [item.river.slug, item])
    );

    const availableSlugs = new Set();
    trackedEntries.forEach((entry) => {
      const slug = entry.dataset.guideSlug;
      const item = itemsBySlug.get(slug);
      if (item) {
        renderEntry(entry, item);
        if (!isCurrentCallUnavailable(item)) availableSlugs.add(slug);
      } else renderUnavailable(entry);
    });

    const renderedCount = availableSlugs.size;
    setText(
      statusLine,
      renderedCount > 0
        ? `Showing live Paddle Today scores for ${renderedCount} tracked guide ${renderedCount === 1 ? 'route' : 'routes'}.`
        : 'Live Paddle Today scores are unavailable for these guide routes right now.'
    );
    if (retry instanceof HTMLButtonElement) retry.hidden = renderedCount > 0;
  } catch (error) {
    console.error('Failed to load Minnesota paddle guide scores.', error);
    setText(statusLine, 'Live Paddle Today scores are unavailable right now. Use the route links and source links before you go.');
    trackedEntries.forEach(entry => renderUnavailable(entry));
    if (retry instanceof HTMLButtonElement) retry.hidden = false;
  } finally {
    pending = false;
    if (retry instanceof HTMLButtonElement) { retry.disabled = false; retry.textContent = 'Retry live scores'; }
    if (fromRetry && retry?.hidden && statusLine instanceof HTMLElement) statusLine.focus({ preventScroll: true });
  }
}

retry?.addEventListener('click', loadScores);
for (const entry of entries) {
  const photo = entry.querySelector('.minnesota-guide-card__media img');
  const fallback = entry.querySelector('.minnesota-guide-card__photo-fallback');
  if (!(photo instanceof HTMLImageElement) || !(fallback instanceof HTMLElement)) continue;
  const showFallback = () => { photo.hidden = true; fallback.hidden = false; };
  photo.addEventListener('error', showFallback, { once: true });
  if (photo.complete && photo.naturalWidth === 0) showFallback();
}
loadScores();
