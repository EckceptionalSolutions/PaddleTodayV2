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

/** Consolidating new records must not bypass editorial review by publishing a new hub. */
export function riverHubPublicationErrors(
  publishedHubs: readonly { riverId: string; routeSlugs: readonly string[] }[],
  baselineRiverIds: readonly string[],
  reviews: readonly RouteGuidePublicationReview[],
): string[] {
  const baseline = new Set(baselineRiverIds);
  const errors: string[] = [];
  for (const hub of publishedHubs) {
    if (baseline.has(hub.riverId)) continue;
    const matches = reviews.filter(review => review.riverId === hub.riverId);
    if (matches.length !== 1) {
      errors.push(`New indexable river hub requires one explicit publication review: ${hub.riverId}. Grouping endpoint records does not establish an independently useful hub.`);
      continue;
    }
    const review = matches[0];
    const classified = [...review.retainedGuides, ...review.hubOptions];
    const actual = new Set(hub.routeSlugs);
    if (!actual.size || classified.length !== actual.size || new Set(classified).size !== classified.length || classified.some(slug => !actual.has(slug))) {
      errors.push(`New hub review must classify every public trip exactly once: ${hub.riverId}`);
    }
    const sourceDecision = review.guide.decisions.some(decision =>
      decision.heading.trim() && decision.text.trim().length >= 80 &&
      decision.source.label.trim() && /^https:\/\//.test(decision.source.url),
    );
    if (review.rationale.trim().length < 50 || !review.guide.title.trim() || review.guide.introduction.trim().length < 80 || !sourceDecision) {
      errors.push(`New hub approval needs a substantive rationale, introduction and source-linked trip decision: ${hub.riverId}`);
    }
  }
  return errors;
}
