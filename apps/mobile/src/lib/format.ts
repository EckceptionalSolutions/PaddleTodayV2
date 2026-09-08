import {
  callLabelForDecision,
  callLabelForRating,
  callStateForDecision,
  callStateForRating,
  qualityTierLabel,
  ratingDetailMessage,
  ratingVerdictLabel,
  type CallContext,
  type DecisionReadinessStatus,
  type GaugeUnit,
  type ScoreRating,
} from '@paddletoday/api-contract';

export function formatTimestamp(value: string | null | undefined) {
  if (!value) return 'Unavailable';

  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) return 'Unavailable';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(parsed);
}

export function formatRelativeTime(value: string | null | undefined) {
  if (!value) return 'No recent update';

  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) return 'No recent update';

  const elapsedMinutes = Math.max(0, Math.round((Date.now() - parsed.getTime()) / 60000));
  if (elapsedMinutes < 1) return 'Updated just now';
  if (elapsedMinutes < 60) return `Updated ${elapsedMinutes} min ago`;

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const remainingMinutes = elapsedMinutes % 60;
  if (elapsedHours < 24) {
    return remainingMinutes === 0
      ? `Updated ${elapsedHours}h ago`
      : `Updated ${elapsedHours}h ${remainingMinutes}m ago`;
  }

  const elapsedDays = Math.floor(elapsedHours / 24);
  return elapsedDays === 1 ? 'Updated yesterday' : `Updated ${elapsedDays}d ago`;
}

export function formatGaugeValue(value: number | null | undefined, unit: GaugeUnit, empty = 'No reading') {
  if (typeof value !== 'number' || !Number.isFinite(value)) return empty;
  if (unit === 'ft') return `${value.toFixed(2).replace(/\.00$/, '')} ${unit}`;
  return `${Math.round(value).toLocaleString('en-US')} ${unit}`;
}

export function formatPercent(value: number | null | undefined, empty = 'No reading') {
  if (typeof value !== 'number' || !Number.isFinite(value)) return empty;
  return `${Math.round(value)}%`;
}

export function formatRainInches(value: number | null | undefined, empty = 'No reading') {
  if (typeof value !== 'number' || !Number.isFinite(value)) return empty;
  return `${value < 0.1 ? value.toFixed(2) : value.toFixed(1)} in`;
}

export function formatTemperature(value: number | null | undefined, empty = 'No reading') {
  if (typeof value !== 'number' || !Number.isFinite(value)) return empty;
  return `${Math.round(value)}°F`;
}

export function verdictForRating(rating: ScoreRating) {
  return ratingVerdictLabel(rating);
}

export function callForRating(rating: ScoreRating, context: CallContext = 'today', compact = false) {
  return callLabelForRating(rating, context, compact);
}

export function callForDecision(
  rating: ScoreRating,
  readiness: DecisionReadinessStatus,
  context: CallContext = 'today',
  compact = false
) {
  return callLabelForDecision(rating, readiness, context, compact);
}

export function qualityForRating(rating: ScoreRating) {
  return qualityTierLabel(rating);
}

// Same-day badges must respect evidence gates just like the primary call.
// Forecast-only views can continue to use qualityForRating explicitly.
export function qualityForDecision(rating: ScoreRating, readiness: DecisionReadinessStatus) {
  return readiness === 'ready' ? qualityTierLabel(rating) : callLabelForDecision(rating, readiness);
}

export { callStateForDecision, callStateForRating };

export function detailMessageForRating(rating: ScoreRating) {
  return ratingDetailMessage(rating);
}

export function normalizeApiText(value: string | null | undefined) {
  if (!value) return '';

  return value
    .replace(/â€¢/g, ' - ')
    .replace(/�+/g, ' - ')
    .replace(/Â·/g, ' - ')
    .replace(/·/g, ' - ')
    .replace(/â€¦/g, '...')
    .replace(/…/g, '...')
    .replace(/Â°F/g, '°F')
    .replace(/Â/g, '')
    .replace(/\s+-\s+-\s+/g, ' - ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function formatPaddleTimeRange(minHours: number, maxHours: number) {
  if (!Number.isFinite(minHours) || !Number.isFinite(maxHours) || minHours <= 0 || maxHours < minHours) {
    return 'Paddle time unavailable';
  }
  const min = Math.max(0.5, roundPaddleHours(minHours));
  const max = Math.max(min, roundPaddleHours(maxHours));

  if (min === max) {
    return `About ${formatPaddleHours(min)}`;
  }

  return `About ${formatPaddleHours(min)} to ${formatPaddleHours(max)}`;
}

function roundPaddleHours(hours: number) {
  return Math.round(hours * 2) / 2;
}

function formatPaddleHours(hours: number) {
  if (hours < 1) {
    return '30 min';
  }

  return `${hours.toFixed(hours % 1 === 0 ? 0 : 1)} hr`;
}
