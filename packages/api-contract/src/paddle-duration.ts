const number = '\\d+(?:\\.\\d+)?';
const unit = '(hours?|hrs?|h|minutes?|mins?|m)\\b';
const duration = new RegExp(`(${number})\\s*(?:(?:on-water|daylight)\\s+)?${unit}(?:\\s*(${number})\\s*(?:minutes?|mins?|m)\\b)?`, 'i');
const plainHours = new RegExp(`^(?:about\\s+|~\\s*)?(${number})(?:\\s*(?:to|[-–—])\\s*(${number}))?$`, 'i');
const rangeStart = new RegExp(`(${number})\\s*(?:to|[-–—])\\s*$`, 'i');
const rangeEnd = new RegExp(`^(${number})(?=$|[\\s,.;])`);

/** Read a paddling-time label without treating minute values as hours. */
export function parsePaddleTimeHours(value: string | null | undefined): { min: number; max: number } | null {
  const text = String(value ?? '').trim();
  const first = duration.exec(text);
  if (!first) {
    // Preserve plain hour ranges, but do not infer hours from unrelated prose.
    const plain = plainHours.exec(text);
    return plain ? orderedRange(Number(plain[1]), Number(plain[2] ?? plain[1])) : null;
  }
  const isMinutes = (label: string) => /^m/i.test(label);
  const hours = (match: RegExpExecArray) => Number(match[1]) / (isMinutes(match[2]) ? 60 : 1) + Number(match[3] ?? 0) / 60;
  const firstHours = hours(first);
  const prefix = text.slice(0, first.index);
  const sharedUnitStart = rangeStart.exec(prefix);
  if (sharedUnitStart) return orderedRange(Number(sharedUnitStart[1]) / (isMinutes(first[2]) ? 60 : 1), firstHours);

  const remainder = text.slice(first.index + first[0].length);
  const separator = /^\s*(?:to\b|[-–—])\s*/i.exec(remainder);
  if (!separator) return orderedRange(firstHours, firstHours);
  const tail = remainder.slice(separator[0].length);
  const second = duration.exec(tail);
  if (second?.index === 0) return orderedRange(firstHours, hours(second));
  const sharedUnitEnd = rangeEnd.exec(tail);
  return sharedUnitEnd ? orderedRange(firstHours, Number(sharedUnitEnd[1]) / (isMinutes(first[2]) ? 60 : 1)) : null;
}

function orderedRange(first: number, second: number) {
  return Number.isFinite(first) && Number.isFinite(second) && first > 0 && second > 0
    ? { min: Math.min(first, second), max: Math.max(first, second) }
    : null;
}
