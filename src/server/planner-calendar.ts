import { plannerDate } from '@paddletoday/api-contract';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function plannerCalendar(today: string) {
  const anchor = new Date(today + 'T12:00:00Z');
  const plusDays = (days: number) => new Date(anchor.getTime() + days * 86400000).toISOString().slice(0, 10);
  const upcoming = Object.fromEntries(weekdays.map((name, i) => [name, plusDays((7 + i - anchor.getUTCDay()) % 7)]));
  return { today, tomorrow: plusDays(1), upcoming };
}

// Resolve only a single day named by the paddler. Months, ranges and evidence dates cannot date a draft.
export function requestedPlannerDate(quote: unknown, message: string, today: string) {
  if (typeof quote !== 'string' || !quote.trim() || !plannerDate(today)) return null;
  const text = quote.trim().toLowerCase();
  const words = message.toLowerCase();
  const start = words.indexOf(text);
  if (start < 0 || /[a-z0-9]/.test(words[start - 1] ?? '') || /[a-z0-9]/.test(words[start + text.length] ?? '')) return null;
  const before = words.slice(0, start), after = words.slice(start + text.length);
  if (/\b(last|every|except|not|day after)\s+$/.test(before) || /^,?\s+\d{4}\b/.test(after)) return null;
  const alternatives = /\b(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\s+(?:or|through|and)\s+(?:this |next )?(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/;
  if (alternatives.test(words)) return null;
  const day = text.replace(/^on (?:the )?/, '');
  const calendar = plannerCalendar(today);
  if (day === 'today' || day === 'tomorrow') return calendar[day];
  if (/^\d{4}-\d\d-\d\d$/.test(day)) return plannerDate(day) ? day : null;
  const weekday = weekdays.find(name => ['this ', 'this coming ', 'coming ', 'next ', ''].some(prefix => day === prefix + name.toLowerCase()));
  if (weekday) {
    const date = calendar.upcoming[weekday];
    if (day.startsWith('next ') && date === today) return new Date(Date.parse(today + 'T12:00:00Z') + 7 * 86400000).toISOString().slice(0, 10);
    return date;
  }
  const parts = /^([a-z]+) (\d{1,2})(?:st|nd|rd|th)?(?:,? (\d{4}))?$/.exec(day);
  if (!parts) return null;
  const month = months.findIndex(name => [name.toLowerCase(), name.slice(0, 3).toLowerCase()].includes(parts[1])) + 1;
  if (!month) return null;
  const suffix = '-' + String(month).padStart(2, '0') + '-' + parts[2].padStart(2, '0');
  let year = Number(parts[3] || today.slice(0, 4));
  if (!parts[3] && year + suffix < today) year++;
  return plannerDate(year + suffix) ? year + suffix : null;
}
