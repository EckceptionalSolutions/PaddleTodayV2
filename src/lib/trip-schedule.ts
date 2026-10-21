import { validTripDate, validTripTime, validTimeZone } from '@paddletoday/api-contract';

/** A wall-clock time must identify exactly one instant, including at DST changes. */
export function tripLocalInstant(value: string, timeZone: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value) || !validTimeZone(timeZone)
    || !validTripDate(value.slice(0, 10), false) || !validTripTime(value.slice(11))) return null;
  const nominal = Date.parse(`${value}:00Z`);
  const format = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const local = (epoch: number) => {
    const parts = Object.fromEntries(format.formatToParts(epoch).map(p => [p.type, p.value]));
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  const offsets = new Set([-86400000, 0, 86400000].map(delta => Date.parse(`${local(nominal + delta)}:00Z`) - nominal - delta));
  const candidates = [...offsets].map(offset => nominal - offset).filter(epoch => local(epoch) === value);
  return candidates.length === 1 ? new Date(candidates[0]) : null;
}

export function tripSchedule(start: string, end: string, timeZone: string) {
  if (!start || !end) return { error: 'Choose a launch date and time and an expected take-out date and time.' };
  const launch = tripLocalInstant(start, timeZone), expected = tripLocalInstant(end, timeZone);
  if (!launch || !expected) return { error: 'Check the dates, times and time zone. A time skipped or repeated by a clock change must be adjusted.' };
  if (expected <= launch) return { error: 'Expected take-out must be after launch. For an overnight trip, choose the next date.' };
  return { launch, expected };
}

export function tripPlanHref(slug: string, params = new URLSearchParams()) {
  return `/rivers/${encodeURIComponent(slug)}/${params.size ? `?${params}` : ''}#trip-plan`;
}
