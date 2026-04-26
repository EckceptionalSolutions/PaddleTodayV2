export function formatMixedResultCount(count, { withVerb = false } = {}) {
  const amount = Number.isFinite(count) ? count : 0;
  if (withVerb) {
    return amount === 1 ? '1 result matches your filters' : `${amount} results match your filters`;
  }

  return amount === 1 ? 'Showing 1 result' : `Showing ${amount} results`;
}

export function formatMixedPaginationSummary(pagination) {
  if (!pagination || pagination.totalItems === 0) {
    return 'No results match these filters.';
  }

  return `Showing ${pagination.startIndex + 1}-${pagination.endIndex} of ${pagination.totalItems} results`;
}

export function formatMixedFilterSummary(count, { sortLabel = '', locationLabel = '', ratingLabel = '' } = {}) {
  return `Showing ${count} results / ${sortLabel}${locationLabel}${ratingLabel}`;
}

export function mixedCardLinkLabel(isGrouped) {
  return isGrouped ? 'Compare routes' : 'View route';
}

export function mixedResultsTitle() {
  return 'Matching results';
}

export function mixedResultsEmptyText({ nearby = false } = {}) {
  return nearby
    ? 'Adjust your nearby preferences to bring results back onto the map.'
    : 'Adjust the filters to bring results back onto the map.';
}

export function mixedResultsNoMatchText({ nearby = false } = {}) {
  return nearby ? 'No results match your current preferences.' : 'No results match these filters.';
}

export function mixedSelectionPromptText(countLabel, name = '') {
  return name ? `${countLabel}. ${name} is selected below.` : `${countLabel}. Tap a result below to highlight it.`;
}
