/** Normalize typing differences for matching, without changing displayed labels. */
export function normalizeSearchText(value: string): string {
  return value.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[‘’]/g, "'")
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}
