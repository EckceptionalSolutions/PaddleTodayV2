const US_STATE_ABBREVIATIONS = Object.freeze({
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
});

const STATE_NAMES_BY_ABBREVIATION = Object.fromEntries(
  Object.entries(US_STATE_ABBREVIATIONS).map(([name, abbreviation]) => [abbreviation.toLowerCase(), name])
);
const SEARCH_FOOTPRINT_STATE_ABBREVIATIONS = new Set(['MN', 'WI', 'IA', 'IL', 'SD', 'ND']);

export function formatLocationLabel(name, admin1, country = '') {
  const labelName = typeof name === 'string' ? name.trim() : '';
  if (!labelName) return country || 'your current location';
  const admin = US_STATE_ABBREVIATIONS[admin1] || admin1 || country || '';
  return admin ? `${labelName}, ${admin}` : labelName;
}

export function normalizeStateQueryToken(value) {
  const normalized = typeof value === 'string' ? value.trim().replace(/\./g, '') : '';
  if (!normalized) return null;

  const lower = normalized.toLowerCase();
  const abbreviationMatch = STATE_NAMES_BY_ABBREVIATION[lower];
  if (abbreviationMatch) {
    return { name: abbreviationMatch, abbreviation: US_STATE_ABBREVIATIONS[abbreviationMatch] };
  }

  const stateEntry = Object.entries(US_STATE_ABBREVIATIONS).find(([name]) => name.toLowerCase() === lower);
  return stateEntry ? { name: stateEntry[0], abbreviation: stateEntry[1] } : null;
}

export function parseManualLocationQuery(query) {
  const raw = typeof query === 'string' ? query.trim().replace(/\s+/g, ' ') : '';
  if (!raw) return { raw: '', city: '', state: null };

  const commaParts = raw.split(',').map((part) => part.trim()).filter(Boolean);
  if (commaParts.length > 1) {
    const state = normalizeStateQueryToken(commaParts.at(-1));
    if (state) return { raw, city: commaParts.slice(0, -1).join(', '), state };
  }

  const words = raw.split(' ').filter(Boolean);
  if (words.length > 1) {
    for (const candidateLength of [2, 1]) {
      if (words.length <= candidateLength) continue;
      const state = normalizeStateQueryToken(words.slice(-candidateLength).join(' '));
      if (state) return { raw, city: words.slice(0, -candidateLength).join(' '), state };
    }
  }

  return { raw, city: raw, state: null };
}

export function matchesStateForGeocodeResult(result, state) {
  const admin1 = typeof result?.admin1 === 'string' ? result.admin1.trim() : '';
  if (!admin1 || !state) return false;
  const normalizedAdmin = admin1.toLowerCase();
  return normalizedAdmin === state.name.toLowerCase() || normalizedAdmin === state.abbreviation.toLowerCase();
}

export function normalizeGeocodeToken(value) {
  return typeof value === 'string'
    ? value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
    : '';
}

export function levenshteinDistance(left, right) {
  if (left === right) return 0;
  if (!left) return right.length;
  if (!right) return left.length;

  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  const current = new Array(right.length + 1).fill(0);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    current[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitutionCost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + substitutionCost
      );
    }
    for (let rightIndex = 0; rightIndex <= right.length; rightIndex += 1) {
      previous[rightIndex] = current[rightIndex];
    }
  }
  return previous[right.length];
}

export function matchesCityForGeocodeResult(result, city) {
  const normalizedCity = normalizeGeocodeToken(city);
  if (!result || !normalizedCity) return false;
  return [result.name, result.admin2, result.admin3, result.admin4]
    .map(normalizeGeocodeToken)
    .filter(Boolean)
    .some((value) => value === normalizedCity);
}

export function fuzzyMatchesCityForGeocodeResult(result, city) {
  const normalizedCity = normalizeGeocodeToken(city);
  if (!result || normalizedCity.length < 5) return false;
  return [result.name]
    .map(normalizeGeocodeToken)
    .filter(Boolean)
    .some((value) => levenshteinDistance(value, normalizedCity) <= 1);
}

export function stateAbbreviationForGeocodeResult(result) {
  const admin1 = typeof result?.admin1 === 'string' ? result.admin1.trim() : '';
  return admin1 ? US_STATE_ABBREVIATIONS[admin1] || admin1.toUpperCase() : '';
}

export function geocodeCandidateScore(result, parsed) {
  let score = 0;
  if (matchesStateForGeocodeResult(result, parsed.state)) score += 1000;
  if (matchesCityForGeocodeResult(result, parsed.city)) score += 400;
  else if (fuzzyMatchesCityForGeocodeResult(result, parsed.city)) score += 260;
  if (!parsed.state && SEARCH_FOOTPRINT_STATE_ABBREVIATIONS.has(stateAbbreviationForGeocodeResult(result))) {
    score += 140;
  }
  if (typeof result.population === 'number' && Number.isFinite(result.population)) {
    score += Math.min(result.population / 1000, 120);
  }
  if (result?.feature_code === 'PPLA') score += 20;
  if (result?.feature_code === 'PPL') score += 12;
  return score;
}

export function chooseBestGeocodeCandidate(candidates, parsed) {
  if (!Array.isArray(candidates) || candidates.length === 0) return null;
  const ranked = [...candidates].sort((left, right) =>
    geocodeCandidateScore(right, parsed) - geocodeCandidateScore(left, parsed)
    || String(left?.name ?? '').localeCompare(String(right?.name ?? ''))
  );
  if (parsed.state) {
    return ranked.find((candidate) => matchesStateForGeocodeResult(candidate, parsed.state)) ?? ranked[0];
  }
  return ranked[0];
}
