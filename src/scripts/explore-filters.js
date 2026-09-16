export const defaultExploreFilters = {
  scope: 'anywhere', paddleable: false, rating: 'all', search: '', state: '',
  difficulty: '', routeType: 'all', camping: '', distance: '', paddleTime: '', paddleLength: '', sort: 'best-now',
};

// Saved links from the previous controls use separate Strong/Good tiers.
export function normalizeExploreConditions(filters) {
  return ['Strong', 'Good'].includes(filters.rating)
    ? { ...filters, rating: '', paddleable: true }
    : filters;
}

export function countExploreTripFilters(filters) {
  return Number(filters.rating !== 'all')
    + Number(filters.routeType !== 'all')
    + ['difficulty', 'camping', 'paddleTime', 'paddleLength'].filter(key => Boolean(filters[key])).length;
}

export function setExploreScope(filters, scope) {
  const next = { ...filters, scope };
  if (scope !== 'state') next.state = '';
  if (scope !== 'nearby') {
    next.distance = '';
    if (['near-you', 'nearest'].includes(next.sort)) next.sort = 'best-now';
  } else {
    next.distance ||= '50';
    next.sort = 'near-you';
  }
  return next;
}

export function applyExploreTripPreset(filters, preset) {
  if (preset === 'all-routes') return { ...defaultExploreFilters };
  const next = { ...filters, difficulty: '', camping: '', paddleTime: '', paddleLength: '' };
  if (preset === 'quick-float') Object.assign(next, { difficulty: 'easy', paddleTime: 'up-to-3' });
  if (preset === 'full-day') next.paddleTime = '5-to-7';
  if (preset === 'long-camping') Object.assign(next, { camping: 'any-support', paddleLength: '10-plus' });
  if (preset === 'best-nearby' || preset === 'closest-paddle') {
    return { ...setExploreScope(next, 'nearby'), sort: preset === 'closest-paddle' ? 'nearest' : 'near-you', paddleable: true, rating: '' };
  }
  return next;
}

export function clearExploreFilters(filters) {
  return { ...defaultExploreFilters, scope: filters.scope, state: filters.state, distance: filters.distance,
    search: filters.search, sort: filters.sort };
}
