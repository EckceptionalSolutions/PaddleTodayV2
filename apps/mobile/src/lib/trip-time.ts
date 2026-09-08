export function localTripTime(value: Date) {
  const pad = (part: number) => String(part).padStart(2, '0');
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())} ${pad(value.getHours())}:${pad(value.getMinutes())}`;
}

export function parseTripTime(value: string) {
  const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const [, yearText, monthText, dayText, hourText, minuteText] = match;
  const year = Number(yearText), month = Number(monthText), day = Number(dayText), hour = Number(hourText), minute = Number(minuteText);
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) return null;
  const date = new Date(year, month - 1, day, hour, minute);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day && date.getHours() === hour && date.getMinutes() === minute ? date : null;
}

// Native date pickers may return a midnight timestamp. Preserve the other half
// of the local value rather than letting a date selection erase the chosen time.
export function mergeTripTime(base: Date, selected: Date, mode: 'date' | 'time') {
  const result = new Date(base);
  if (mode === 'date') result.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
  else result.setHours(selected.getHours(), selected.getMinutes(), 0, 0);
  return localTripTime(result);
}
