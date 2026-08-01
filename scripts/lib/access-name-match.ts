const genericAccessTokens = new Set([
  'above', 'access', 'and', 'area', 'at', 'below', 'boat', 'branch', 'canoe', 'carry', 'city',
  'co', 'county', 'creek', 'east', 'egress', 'fork', 'hand', 'in', 'lake', 'landing', 'launch',
  'management', 'near', 'north', 'of', 'out', 'park', 'pond', 'public', 'putin', 'ramp',
  'regional', 'reservoir', 'river', 'site', 'slipway', 'south', 'state', 'takeout', 'the',
  'trail', 'water', 'waterway', 'west', 'wildlife',
]);

const accessTokenAliases = new Map([
  ['ave', 'avenue'],
  ['blvd', 'boulevard'],
  ['ctr', 'center'],
  ['hwy', 'highway'],
  ['natural', 'nature'],
  ['rd', 'road'],
]);

export function normalizeAccessText(value: string | null | undefined) {
  return (value ?? '')
    .toLowerCase()
    // Official inventories frequently omit the apostrophe in possessive place
    // names ("Bell's Mill" versus "Bells Mill"). Treat those spellings as the
    // same word before punctuation is converted to spaces.
    .replace(/[’']/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Official route labels sometimes append an inventory/reference code after an
 * access noun (for example, "Clermont Canoe Access #64B"). The authoritative
 * inventory may publish the same facility without that suffix. Remove only
 * that narrowly shaped trailing code; road/highway numbers remain meaningful.
 */
export function normalizeAccessIdentityText(value: string | null | undefined) {
  return normalizeAccessText(value)
    .replace(/\b(access|landing|launch|putin|ramp|site|takeout)\s+(?:no\s+)?\d+[a-z]?$/, '$1')
    .trim();
}

const facilityIdentityNoise = /\b(?:access|area|boat|canoe|carry|county|landing|launch|park|public|putin|ramp|site|takeout|watercraft)\b/g;

/**
 * Strong facility identity used when a coordinate may replace stored data.
 * Unlike the broad discovery matcher, this keeps directions, road numbers,
 * bridges, dams, and waterway/place words so North/South or adjacent accesses
 * cannot collapse into one another. It removes only generic facility nouns.
 */
export function normalizeAccessFacilityIdentityText(value: string | null | undefined) {
  return normalizeAccessIdentityText(value)
    .replace(facilityIdentityNoise, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function accessFacilityIdentitiesAgree(left: string | null | undefined, right: string | null | undefined) {
  const normalizedLeft = normalizeAccessFacilityIdentityText(left);
  const normalizedRight = normalizeAccessFacilityIdentityText(right);
  return Boolean(normalizedLeft && normalizedRight && normalizedLeft === normalizedRight);
}

export function distinctiveAccessTokens(value: string | null | undefined) {
  return normalizeAccessText(value)
    .split(' ')
    .map((token) => accessTokenAliases.get(token) ?? token)
    .filter((token) => token.length > 1 && !genericAccessTokens.has(token));
}

export function accessNamesAgree(left: string | null | undefined, right: string | null | undefined) {
  const normalizedLeft = normalizeAccessText(left);
  const normalizedRight = normalizeAccessText(right);
  if (!normalizedLeft || !normalizedRight) return false;
  if (normalizedLeft === normalizedRight) return true;

  const leftTokens = [...new Set(distinctiveAccessTokens(left))];
  const rightTokens = new Set(distinctiveAccessTokens(right));
  if (leftTokens.length === 0 || rightTokens.size === 0) return false;
  const shared = leftTokens.filter((token) => rightTokens.has(token));
  if (shared.length >= 2) return true;

  // A single distinctive token is enough only when one name reduces entirely to
  // that reasonably specific token (for example, "Welch Landing" vs "Welch").
  return shared.length === 1
    && Math.min(leftTokens.length, rightTokens.size) === 1
    && shared[0]!.length >= 5;
}

export function preferExactAccessNameMatches<T extends { name?: string | null }>(
  target: string | null | undefined,
  candidates: T[],
) {
  const agreeing = candidates.filter((candidate) => accessNamesAgree(target, candidate.name));
  const normalizedTarget = normalizeAccessText(target);
  const exact = agreeing.filter((candidate) => normalizeAccessText(candidate.name) === normalizedTarget);
  if (exact.length > 0) return exact;
  const identityTarget = normalizeAccessIdentityText(target);
  const identityExact = agreeing.filter((candidate) => normalizeAccessIdentityText(candidate.name) === identityTarget);
  if (identityExact.length > 0) return identityExact;
  const facilityExact = agreeing.filter((candidate) => accessFacilityIdentitiesAgree(target, candidate.name));
  return facilityExact.length > 0 ? facilityExact : agreeing;
}
