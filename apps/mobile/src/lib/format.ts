import type { GaugeUnit, ScoreRating } from '@paddletoday/api-contract';

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
  if (rating === 'Strong' || rating === 'Good') return 'Paddle today';
  if (rating === 'Fair') return 'Watch closely';
  return 'Skip today';
}

export function detailMessageForRating(rating: ScoreRating) {
  if (rating === 'Strong') return 'Conditions line up especially well right now.';
  if (rating === 'Good') return 'This looks like a workable launch window right now.';
  if (rating === 'Fair') return 'There is a path to paddling today, but it needs a second look.';
  return 'This does not look like a clean yes today.';
}

export function normalizeApiText(value: string | null | undefined) {
  if (!value) return '';

  return value
    .replace(/â€¢/g, ' - ')
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
