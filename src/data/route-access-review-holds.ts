// Human-reviewed access failures that hydrography proximity alone cannot clear.
// Remove an entry only after verifying the actual named public water entry.
export const routeAccessReviewHolds: Readonly<Record<string, string>> = {
  'maumee-river-kreager-moser':
    'Moser Park remains a park-area pin near Paul Trier Ditch, not a verified Maumee launch. Connected-network proximity does not establish public access. See docs/route-coordinate-corrections-2026-09-05.md.',
};
