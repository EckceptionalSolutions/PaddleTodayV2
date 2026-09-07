import { formatLocationLabel, matchesStateForGeocodeResult, parseManualLocationQuery } from './location-domain.js';

export function createBoardLocationService({
  fetchImpl = fetch,
  chooseCandidate,
  timeoutMs = 10_000,
}) {
  if (typeof chooseCandidate !== 'function') {
    throw new TypeError('createBoardLocationService requires chooseCandidate.');
  }

  async function searchManualLocation(query, { signal = AbortSignal.timeout(timeoutMs) } = {}) {
    const response = await fetchImpl(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json&countryCode=US`,
      {
        headers: { accept: 'application/json' },
        signal,
      },
    );

    if (!response.ok) {
      throw new Error(`Geocoding failed: HTTP ${response.status}`);
    }

    const payload = await response.json();
    return Array.isArray(payload?.results) ? payload.results : [];
  }

  async function geocodeManualLocation(query, { signal } = {}) {
    // All query variants share one deadline, rather than each adding ten seconds.
    const deadline = AbortSignal.timeout(timeoutMs);
    const lookupSignal = signal ? AbortSignal.any([signal, deadline]) : deadline;
    const parsed = parseManualLocationQuery(query);
    const searchQueries = [];

    if (parsed.city && parsed.state?.name) {
      searchQueries.push(`${parsed.city}, ${parsed.state.name}`);
    }
    if (parsed.city && parsed.state?.abbreviation) {
      searchQueries.push(`${parsed.city}, ${parsed.state.abbreviation}`);
    }
    if (parsed.city) {
      searchQueries.push(parsed.city);
    }
    searchQueries.push(parsed.raw);

    const seen = new Set();
    for (const searchQuery of searchQueries) {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      if (!normalizedQuery || seen.has(normalizedQuery)) {
        continue;
      }
      seen.add(normalizedQuery);

      lookupSignal.throwIfAborted();
      const results = await searchManualLocation(searchQuery, { signal: lookupSignal });
      const candidates = results.filter(
        (result) => Number.isFinite(result?.latitude) && Math.abs(result.latitude) <= 90
          && Number.isFinite(result?.longitude) && Math.abs(result.longitude) <= 180
          && (!parsed.state || matchesStateForGeocodeResult(result, parsed.state)),
      );
      if (candidates.length === 0) {
        continue;
      }

      const match = chooseCandidate(candidates, parsed);
      if (!match) {
        continue;
      }

      return {
        latitude: match.latitude,
        longitude: match.longitude,
        label: formatLocationLabel(match.name, match.admin1, match.country),
        source: 'manual',
      };
    }

    return null;
  }

  async function reverseGeocodeLocation(latitude, longitude) {
    const response = await fetchImpl(
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&language=en&format=json&count=1`,
      {
        headers: { accept: 'application/json' },
        signal: AbortSignal.timeout(timeoutMs),
      },
    );

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: HTTP ${response.status}`);
    }

    const payload = await response.json();
    const match = Array.isArray(payload?.results) ? payload.results[0] : null;
    return match ? formatLocationLabel(match.name, match.admin1, match.country) : null;
  }

  return {
    geocodeManualLocation,
    reverseGeocodeLocation,
    searchManualLocation,
  };
}
