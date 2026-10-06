import type { TripPlan, PaddleLogInput } from '@paddletoday/api-contract';

export const planReviewFields = ['title', 'route', 'date', 'launch', 'expected', 'timeZone', 'itinerary', 'preparation'] as const;
export const logReviewFields = ['route', 'date', 'time', 'timeZone', 'notes', 'paddleAgain', 'water', 'track'] as const;
export const reviewLabels: Record<string, string> = { preparation: 'Shared trip notes', track: 'Recorded paddle', title: 'Trip title', route: 'Route & access points', date: 'Date', launch: 'Launch', expected: 'Expected return', time: 'Launch', timeZone: 'Time zone', itinerary: 'Meeting stops', notes: 'Private notes', paddleAgain: 'Would paddle again', water: 'Water observations' };

export function reviewText(value: unknown): string {
  if (value == null || value === '') return 'Not set';
  if (Array.isArray(value)) return value.length ? value.map(reviewText).join('\n') : 'None';
  if (typeof value === 'object') return Object.entries(value).filter(([key, item]) => !['id', 'slug', 'putInId', 'takeOutId', 'gaugeId'].includes(key) && item !== '').map(([, item]) => reviewText(item)).join(' · ') || 'Not set';
  return String(value);
}

/** Start from the actual server version; only explicit local choices replace fields. */
export function mergeReviewed<T extends TripPlan | PaddleLogInput>(latest: T, mine: T, choices: string[]): T {
  const allowed: readonly string[] = 'title' in latest ? planReviewFields : logReviewFields;
  const result = structuredClone(latest);
  for (const key of choices) if (allowed.includes(key)) Object.assign(result, { [key]: structuredClone(mine[key as keyof T]) });
  return result;
}
