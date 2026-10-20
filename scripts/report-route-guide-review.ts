import { mkdir, writeFile } from 'node:fs/promises';
import { listRiverGroups } from '../src/lib/rivers';
import { hasStandaloneRoutePage } from '../src/data/route-page-consolidations';
import { routeGuideReviewByRiverId } from '../src/data/route-guide-publication-reviews';
import { isScoreEligible } from '../src/data/route-publication';
import type { River } from '../src/lib/types';

const tokenize = (text: string) => text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
const editorial = (route: River) => [
  route.summary, route.logistics?.summary, route.logistics?.shuttle,
  ...(route.logistics?.accessCaveats ?? []), ...(route.logistics?.watchFor ?? []),
  route.profile.difficultyNotes, route.profile.confidenceNotes, route.profile.seasonNotes,
].join(' ');
const shingles = (text: string) => {
  const words = tokenize(text);
  return new Set(words.slice(0, -4).map((_, index) => words.slice(index, index + 5).join(' ')));
};
const similarity = (left: Set<string>, right: Set<string>) => {
  let intersection = 0;
  for (const phrase of left) if (right.has(phrase)) intersection += 1;
  return intersection / (left.size + right.size - intersection || 1);
};
const conditionKey = (route: River) => JSON.stringify([
  route.gaugeSource.provider, route.gaugeSource.siteId, route.gaugeSource.metric,
  route.gaugeSource.unit, isScoreEligible(route), route.profile.thresholdModel,
  route.profile.idealMin, route.profile.idealMax, route.profile.tooLow,
  route.profile.tooHigh, route.profile.tooHighInclusive,
]);

const candidates = [];
let standalonePages = 0;
for (const group of listRiverGroups()) {
  const routes = group.routes.filter(route => hasStandaloneRoutePage(route.slug));
  standalonePages += routes.length;
  const phrases = routes.map(route => shingles(editorial(route)));
  for (let index = 0; index < routes.length; index += 1) {
    const route = routes[index];
    let nearest: { slug: string; similarity: number } | undefined;
    for (let other = 0; other < routes.length; other += 1) {
      if (index === other) continue;
      const score = similarity(phrases[index], phrases[other]);
      if (!nearest || score > nearest.similarity) nearest = { slug: routes[other].slug, similarity: score };
    }
    if (!nearest || nearest.similarity < 0.5 || routeGuideReviewByRiverId.has(group.riverId)) continue;
    candidates.push({
      slug: route.slug, riverId: group.riverId, state: route.state,
      role: isScoreEligible(route) ? 'scored' : 'planning',
      nearestSibling: nearest.slug,
      phraseSimilarity: Number(nearest.similarity.toFixed(3)),
      sharesConditionSetup: conditionKey(route) === conditionKey(routes.find(other => other.slug === nearest!.slug)!),
      status: 'needs-editorial-review',
      requiredReview: 'Check documented reach, access terms, hazard/condition boundaries, distinct trip value and historical demand before deciding guide versus hub option.',
    });
  }
}
candidates.sort((left, right) => right.phraseSimilarity - left.phraseSimilarity || left.slug.localeCompare(right.slug));
const report = {
  policy: 'docs/seo-route-publication-policy.md',
  method: 'Five-word-shingle Jaccard similarity on route summary, logistics summary/shuttle/caveats/watchFor and profile difficulty/confidence/season notes. Excludes the page template. The 0.50 screening threshold is an editorial queue heuristic, not a Google metric or an automatic publication rule.',
  scope: 'Current source catalog after explicit pilot decisions; this is proposed build inventory, not a claim about deployed URLs or indexing.',
  standalonePages,
  reviewedPilotFamilies: [...routeGuideReviewByRiverId.keys()],
  candidates: candidates.length,
  planningCandidates: candidates.filter(route => route.role === 'planning').length,
  scoredCandidates: candidates.filter(route => route.role === 'scored').length,
  queue: candidates,
};
await mkdir('docs/audits', { recursive: true });
const path = 'docs/audits/route-guide-publication-review-queue.json';
await writeFile(path, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ path, standalonePages, candidates: report.candidates, planning: report.planningCandidates, scored: report.scoredCandidates }));
