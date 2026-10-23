export const EMBED_REFERRAL_CAMPAIGN = 'route-embed';
export const EMBED_REFERRAL_STORAGE_KEY = 'paddletoday.embed-referral.v1';
export const EMBED_REFERRAL_TTL_MS = 30 * 60_000;

export type EmbedReferral = {
  partner: string;
  sourceRoute: string;
  entry: 'route' | 'brand';
  startedAt: number;
};

const validTag = (value: unknown): value is string => typeof value === 'string' && /^[a-z0-9][a-z0-9-]{0,63}$/.test(value);
const validRoute = (value: unknown): value is string => typeof value === 'string' && value.length <= 180 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

export function normalizeEmbedPartner(value: string | null | undefined) {
  return (value ?? '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 64).replace(/^-+|-+$/g, '');
}

/** Accept only our complete campaign and public route identifiers, never arbitrary query data. */
export function incomingEmbedReferral(url: URL, now = Date.now()): EmbedReferral | null {
  if (url.searchParams.get('utm_campaign') !== EMBED_REFERRAL_CAMPAIGN || url.searchParams.get('utm_medium') !== 'referral') return null;
  const partner = url.searchParams.get('utm_source');
  const routePath = url.pathname.match(/^\/rivers\/([^/]+)\/?$/);
  const sourceRoute = url.searchParams.get('utm_content') ?? routePath?.[1];
  if (!validTag(partner) || !validRoute(sourceRoute) || (!routePath && url.pathname !== '/')) return null;
  return { partner: partner === 'route-card' ? 'unattributed' : partner, sourceRoute, entry: routePath ? 'route' : 'brand', startedAt: now };
}

export function activeEmbedReferral(value: unknown, now = Date.now()): value is EmbedReferral {
  if (!value || typeof value !== 'object') return false;
  const item = value as EmbedReferral;
  return validTag(item.partner) && validRoute(item.sourceRoute) && ['route', 'brand'].includes(item.entry)
    && Number.isFinite(item.startedAt) && item.startedAt <= now && now - item.startedAt < EMBED_REFERRAL_TTL_MS;
}

/** Last tagged entry wins; another campaign or external entry ends the attribution window. */
export function resolveEmbedReferral(url: URL, stored: string | null, referrer = '', now = Date.now()) {
  const incoming = incomingEmbedReferral(url, now);
  if (incoming) return { referral: incoming, arrival: true };
  if ([...url.searchParams.keys()].some(key => key.startsWith('utm_'))) return { referral: null, arrival: false };
  try {
    if (referrer && new URL(referrer).origin !== url.origin) return { referral: null, arrival: false };
    const previous: unknown = JSON.parse(stored ?? 'null');
    if (activeEmbedReferral(previous, now)) {
      // Explicitly select fields so stored content cannot add analytics properties.
      const { partner, sourceRoute, entry, startedAt } = previous;
      return { referral: { partner, sourceRoute, entry, startedAt }, arrival: false };
    }
  } catch { /* Missing, malformed or blocked storage is optional. */ }
  return { referral: null, arrival: false };
}

export function embedReferralProperties(referral: EmbedReferral | null, now = Date.now()) {
  return activeEmbedReferral(referral, now) ? {
    embed_campaign: EMBED_REFERRAL_CAMPAIGN,
    embed_partner: referral.partner,
    embed_route: referral.sourceRoute,
    embed_entry: referral.entry,
  } : {};
}
