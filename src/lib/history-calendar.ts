export const MAX_HISTORY_CATCHUP_DAYS = 366;

export function isHistoryDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = Date.parse(`${value}T12:00:00Z`);
  return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === value;
}

export function previousHistoryDate(date: string) {
  if (!isHistoryDate(date)) throw new Error('Invalid history calendar date.');
  return new Date(Date.parse(`${date}T12:00:00Z`) - 86_400_000).toISOString().slice(0, 10);
}

/** Calendar arithmetic, independent of 23/25-hour local DST days. */
export function historyDatesThrough(from: string, through: string): string[] {
  if (!isHistoryDate(from) || !isHistoryDate(through)) throw new Error('Invalid history catch-up date.');
  if (from > through) return [];
  const length = Math.round((Date.parse(`${through}T12:00:00Z`) - Date.parse(`${from}T12:00:00Z`)) / 86_400_000) + 1;
  if (length > MAX_HISTORY_CATCHUP_DAYS) throw new Error('History finalization backlog exceeds 366 days; backfill is required before advancing it.');
  return Array.from({ length }, (_, index) => new Date(Date.parse(`${from}T12:00:00Z`) + index * 86_400_000).toISOString().slice(0, 10));
}
