export const exploreFilterOptions = {
  rating: ['', 'all', 'Strong', 'Good', 'Fair', 'No-go'],
  difficulty: ['', 'easy', 'moderate', 'hard'],
  routeType: ['non-whitewater', 'whitewater', 'all'],
  camping: ['', 'any-support', 'overnight', 'endpoint', 'nearby'],
  distance: ['', '25', '50', '75', '100', '150', '200'],
  paddleTime: ['', 'up-to-3', '3-to-5', '5-to-7', '7-plus'],
  paddleLength: ['', 'under-5', '5-to-10', '10-plus'],
  sort: ['best-now', 'near-you', 'nearest', 'highest-confidence', 'lowest-risk', 'a-z'],
};

export function readExploreSearch(url) {
  const params = new URL(url).searchParams;
  if (params.get('searchVersion') !== '1') return null;
  const filters = { paddleable: params.get('paddleable') !== 'false', search: (params.get('search') || '').trim().slice(0, 200), state: (params.get('state') || '').slice(0, 100) };
  for (const [key, options] of Object.entries(exploreFilterOptions)) {
    filters[key] = options.includes(params.get(key)) ? params.get(key) : options[0];
  }
  const latitude = params.has('lat') && params.get('lat').trim() ? Number(params.get('lat')) : NaN;
  const longitude = params.has('lng') && params.get('lng').trim() ? Number(params.get('lng')) : NaN;
  const location = Number.isFinite(latitude) && Math.abs(latitude) <= 90 && Number.isFinite(longitude) && Math.abs(longitude) <= 180
    ? { latitude, longitude, label: (params.get('place') || 'Shared location').slice(0, 200) }
    : null;
  return { filters, location };
}

export function writeExploreSearch(url, filters, location) {
  const next = new URL(url);
  next.searchParams.set('searchVersion', '1');
  for (const key of [...Object.keys(exploreFilterOptions), 'paddleable', 'search', 'state']) {
    const value = filters[key];
    if (value === '' || value == null) next.searchParams.delete(key);
    else next.searchParams.set(key, String(value));
  }
  for (const key of ['lat', 'lng', 'place']) next.searchParams.delete(key);
  if (location) {
    next.searchParams.set('lat', String(location.latitude));
    next.searchParams.set('lng', String(location.longitude));
    next.searchParams.set('place', location.label);
  }
  return next.href;
}
