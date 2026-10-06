import { normalizeSearchText } from '@paddletoday/api-contract';

function normalizeText(value) {
  return normalizeSearchText(String(value || '')).replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function prepareSearchIndex(items) {
  return items.map(item => ({
    item,
    haystack: normalizeText(item.searchText || `${item.title} ${item.subtitle} ${item.meta}`),
    title: normalizeText(item.title),
    subtitle: normalizeText(item.subtitle || ''),
  }));
}

export function findSearchMatches(index, query) {
  const terms = normalizeText(query).split(' ').filter(Boolean);
  if (!terms.length) {
    return [...index.filter(row => row.item.kind === 'river').slice(0, 6),
      ...index.filter(row => row.item.kind === 'route').slice(0, 4)].map(row => row.item);
  }
  return index.map(({ item, haystack, title, subtitle }) => {
    let score = 0;
    for (const term of terms) {
      if (!haystack.includes(term)) return null;
      score += 2;
      if (title.startsWith(term)) score += 4;
      if (subtitle.includes(term)) score += 1;
    }
    if (item.kind === 'river') score += 0.5;
    return { item, score };
  }).filter(Boolean).sort((left, right) => right.score - left.score || left.item.title.localeCompare(right.item.title))
    .slice(0, 10).map(row => row.item);
}
