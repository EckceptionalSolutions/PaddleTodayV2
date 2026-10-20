import { expect, it } from 'vitest';
import { riverHubPublicationErrors, routeGuidePublicationErrors } from './route-guide-publication';
import { routeGuidePublicationReviews } from '../../src/data/route-guide-publication-reviews';

it('allows grandfathered guides while rejecting new automatically published records', () => {
  expect(routeGuidePublicationErrors(['old-guide'], ['old-guide'], [])).toEqual([]);
  expect(routeGuidePublicationErrors(['new-endpoint-pair'], ['old-guide'], [])).toEqual([
    expect.stringContaining('requires a publication review'),
  ]);
});

const planningReview = routeGuidePublicationReviews.find(review => review.riverId === 'aroostook-river')!;
const planningHub = { riverId: planningReview.riverId, routeSlugs: [...planningReview.hubOptions] };

it('does not let consolidation publish an unreviewed new hub', () => {
  expect(riverHubPublicationErrors([planningHub], [planningHub.riverId], [])).toEqual([]);
  expect(riverHubPublicationErrors([planningHub], [], [])).toEqual([expect.stringContaining('requires one explicit publication review')]);
  expect(riverHubPublicationErrors([planningHub], [], [planningReview])).toEqual([]);
  expect(riverHubPublicationErrors([planningHub], [], [planningReview, planningReview])).toEqual([expect.stringContaining('requires one explicit publication review')]);
  const reachReview = routeGuidePublicationReviews.find(review => review.riverId === 'contoocook-river-new-hampshire')!;
  expect(riverHubPublicationErrors([{ riverId: reachReview.riverId, routeSlugs: [...reachReview.retainedGuides, ...reachReview.hubOptions] }], [], [reachReview])).toEqual([]);
});

it('requires complete, unambiguous classification of the new hub family', () => {
  for (const hubOptions of [planningReview.hubOptions.slice(1), [...planningReview.hubOptions, 'unrelated-trip'], [...planningReview.hubOptions.slice(1), planningReview.hubOptions[1]]]) {
    expect(riverHubPublicationErrors([planningHub], [], [{ ...planningReview, hubOptions }])).toEqual([expect.stringContaining('classify every public trip exactly once')]);
  }
});

it('requires usable source-backed hub guidance in addition to a decision register entry', () => {
  for (const guide of [
    { ...planningReview.guide, introduction: 'Some launches.' },
    { ...planningReview.guide, decisions: [] },
    { ...planningReview.guide, decisions: planningReview.guide.decisions.map(decision => ({ ...decision, source: { ...decision.source, url: 'http://example.com' } })) },
  ]) {
    expect(riverHubPublicationErrors([planningHub], [], [{ ...planningReview, guide }])).toEqual([expect.stringContaining('source-linked trip decision')]);
  }
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
