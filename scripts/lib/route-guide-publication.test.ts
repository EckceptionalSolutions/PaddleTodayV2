import { expect, it } from 'vitest';
import { routeGuidePublicationErrors } from './route-guide-publication';
import { routeGuidePublicationReviews } from '../../src/data/route-guide-publication-reviews';

it('allows grandfathered guides while rejecting new automatically published records', () => {
  expect(routeGuidePublicationErrors(['old-guide'], ['old-guide'], [])).toEqual([]);
  expect(routeGuidePublicationErrors(['new-endpoint-pair'], ['old-guide'], [])).toEqual([
    expect.stringContaining('requires a publication review'),
  ]);
});

it('requires a source-backed decision for the exact new guide, independently of scoring status', () => {
  const review = routeGuidePublicationReviews.find(review => review.riverId === 'contoocook-river-new-hampshire')!;
  const slug = review.retainedGuides[0];
  expect(routeGuidePublicationErrors([slug], [], [review])).toEqual([]);
  expect(routeGuidePublicationErrors([slug], [], [{ ...review, guide: { ...review.guide, decisions: [] } }])).toEqual([
    expect.stringContaining('source-linked decision for its exact reach'),
  ]);
  expect(routeGuidePublicationErrors([slug], [], [{ ...review, rationale: 'Keep it.' }])).toEqual([
    expect.stringContaining('substantive rationale'),
  ]);
});
