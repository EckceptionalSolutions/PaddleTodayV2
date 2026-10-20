import type { RouteGuidePublicationReview } from '../../src/data/route-guide-publication-reviews';

/** Existing pages are grandfathered pending review; new guide URLs need an explicit decision. */
export function routeGuidePublicationErrors(
  standaloneSlugs: readonly string[],
  baselineSlugs: readonly string[],
  reviews: readonly RouteGuidePublicationReview[],
): string[] {
  const baseline = new Set(baselineSlugs);
  const approved = new Map(reviews.flatMap(review => review.retainedGuides.map(slug => [slug, review] as const)));
  const errors: string[] = [];
  for (const slug of standaloneSlugs) {
    if (baseline.has(slug)) continue;
    const review = approved.get(slug);
    if (!review) {
      errors.push(`New standalone route guide requires a publication review: ${slug}. Classify it in route-guide-publication-reviews.ts; use a hub option when the record does not justify an independent guide.`);
      continue;
    }
    const decision = review.guide.decisions.find(decision => decision.route?.slug === slug && /^https:\/\//.test(decision.source.url));
    if (review.rationale.trim().length < 50 || !decision) {
      errors.push(`New guide approval needs a substantive rationale and a source-linked decision for its exact reach: ${slug}`);
    }
  }
  return errors;
}
