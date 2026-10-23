import { describe, expect, it } from 'vitest';
import { incomingEmbedReferral, resolveEmbedReferral, embedReferralProperties, EMBED_REFERRAL_TTL_MS, normalizeEmbedPartner } from './embed-referrals';
import { routeEmbedPlanUrl, routeEmbedBrandUrl } from './route-embed';

const now = Date.parse('2026-10-23T01:00:00Z');
const origin = 'https://paddletoday.com';
const slug = 'little-miami-river-kelley-milford';
const tagged = routeEmbedPlanUrl(origin, slug, 'riverbend-campground');

describe('partner-tagged route-card referrals', () => {
  it('keeps normalized builder tags compatible with accepted arrival tags', () => {
    expect(normalizeEmbedPartner('--Riverbend-Campground--')).toBe('riverbend-campground');
    expect(normalizeEmbedPartner('---')).toBe('');
    expect(incomingEmbedReferral(routeEmbedPlanUrl(origin, slug, '--Riverbend--'), now)?.partner).toBe('riverbend');
  });
  it('attributes both route and brand links to the configured partner and original card route', () => {
    expect(incomingEmbedReferral(tagged, now)).toEqual({ partner: 'riverbend-campground', sourceRoute: slug, entry: 'route', startedAt: now });
    expect(incomingEmbedReferral(routeEmbedBrandUrl(origin, slug, 'riverbend-campground'), now))
      .toMatchObject({ partner: 'riverbend-campground', sourceRoute: slug, entry: 'brand' });
    expect(incomingEmbedReferral(routeEmbedPlanUrl(origin, slug), now)?.partner).toBe('unattributed');
    const legacy = new URL(tagged); legacy.searchParams.delete('utm_content');
    expect(incomingEmbedReferral(legacy, now)?.sourceRoute).toBe(slug);
  });
  it('ignores incomplete campaigns, previews, private paths, and arbitrary query content', () => {
    for (const [key, value] of [['utm_source', 'name@example.com'], ['utm_medium', 'email'], ['utm_campaign', 'route-embed-preview'], ['utm_content', 'private text / tokens']]) {
      const url = new URL(tagged); url.searchParams.set(key, value);
      expect(incomingEmbedReferral(url, now)).toBeNull();
    }
    const privateUrl = new URL(tagged); privateUrl.pathname = '/trips/private-token/';
    expect(incomingEmbedReferral(privateUrl, now)).toBeNull();
    const noSource = new URL(tagged); noSource.searchParams.delete('utm_source');
    expect(incomingEmbedReferral(noSource, now)).toBeNull();
  });
  it('retains only safe attribution fields through internal navigation and expires after 30 minutes', () => {
    const referral = incomingEmbedReferral(tagged, now)!;
    const stored = JSON.stringify({ ...referral, email: 'must-not-be-carried@example.com' });
    const resumed = resolveEmbedReferral(new URL('/explore/', origin), stored, tagged.href, now + 60_000);
    expect(resumed).toEqual({ referral, arrival: false });
    expect(embedReferralProperties(resumed.referral, now + 60_000)).toEqual({
      embed_campaign: 'route-embed', embed_partner: 'riverbend-campground', embed_route: slug, embed_entry: 'route',
    });
    expect(resolveEmbedReferral(new URL('/explore/', origin), stored, tagged.href, now + EMBED_REFERRAL_TTL_MS).referral).toBeNull();
    expect(embedReferralProperties(referral, now + EMBED_REFERRAL_TTL_MS)).toEqual({});
  });
  it('gives a new partner entry precedence and clears attribution for another acquisition channel', () => {
    const stored = JSON.stringify(incomingEmbedReferral(tagged, now));
    const next = routeEmbedPlanUrl(origin, slug, 'second-partner');
    expect(resolveEmbedReferral(next, stored, '', now + 60_000)).toMatchObject({ arrival: true, referral: { partner: 'second-partner' } });
    expect(resolveEmbedReferral(new URL('/?utm_campaign=newsletter', origin), stored, '', now + 60_000).referral).toBeNull();
    expect(resolveEmbedReferral(new URL('/explore/', origin), stored, 'https://www.google.com/', now + 60_000).referral).toBeNull();
  });
  it('handles missing, corrupt and implausibly future stored context without losing a direct referral', () => {
    for (const stored of [null, 'not json', '{}', JSON.stringify({ ...incomingEmbedReferral(tagged, now), startedAt: now + 1 })]) {
      expect(resolveEmbedReferral(new URL('/explore/', origin), stored, '', now).referral).toBeNull();
      expect(resolveEmbedReferral(tagged, stored, '', now).referral?.partner).toBe('riverbend-campground');
    }
  });
});
