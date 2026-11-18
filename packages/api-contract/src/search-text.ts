import type { RiverSummaryApiItem } from './index';

/** Normalize typing differences for matching, without changing displayed labels. */
export function normalizeSearchText(value: string): string {
  return value.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[‘’]/g, "'")
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

type SearchRoute = Partial<Pick<RiverSummaryApiItem['river'],
  'name' | 'reach' | 'state' | 'region' | 'slug' | 'putIn' | 'takeOut' | 'accessPoints'>>;

function searchWords(value: string) {
  return normalizeSearchText(value).replace(/['’]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

// Match one insertion, deletion, substitution or adjacent transposition.
function oneEditApart(left: string, right: string) {
  if (Math.abs(left.length - right.length) > 1) return false;
  let i = 0;
  while (i < left.length && left[i] === right[i]) i++;
  if (left.length < right.length) return left.slice(i) === right.slice(i + 1);
  if (left.length > right.length) return left.slice(i + 1) === right.slice(i);
  return left.slice(i + 1) === right.slice(i + 1)
    || (left[i] === right[i + 1] && left[i + 1] === right[i] && left.slice(i + 2) === right.slice(i + 2));
}

/** Higher ranks win under the default sort. Zero means the route does not match. */
export function createRouteSearch(query: string) {
  const phrase = searchWords(query);
  const terms = phrase.split(' ');
  return (river: SearchRoute, extra: readonly (string | undefined)[] = []): number => {
    if (!phrase) return query.trim() ? 0 : 1;
    const fields = [river.name, river.reach, river.putIn?.name, river.takeOut?.name,
      ...(river.accessPoints ?? []).map(point => point.name), river.region, river.state,
      river.slug, ...extra].filter((s): s is string => Boolean(s)).map(searchWords);
    if (fields.includes(phrase)) return 5;
    if (fields.some(field => field.includes(phrase))) return 4;
    const words = [...new Set(fields.flatMap(field => field.split(' ')))];
    let rank = 3;
    for (const term of terms) {
      if (words.includes(term)) continue;
      if (words.some(word => word.startsWith(term))) {
        rank = Math.min(rank, 2);
      } else if (term.length >= 5 && !/\d/.test(term) && words.some(word => oneEditApart(term, word))) {
        rank = 1;
      } else {
        return 0;
      }
    }
    return rank;
  };
}
