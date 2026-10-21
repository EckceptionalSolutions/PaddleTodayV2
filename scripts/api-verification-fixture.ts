import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { getRiverBySlug } from '../src/lib/rivers';
import { isScoreEligible } from '../src/data/route-publication';
import { scoreRiverCondition } from '../src/lib/scoring';
import { serializeSummaryResult } from '../src/lib/api-contract';

/** Synthetic missing-input responses for isolated runtime/resource checks, not scoring evidence. */
export function createApiVerificationSummary(slugs: string[], now = new Date()) {
  const rivers = [...new Set(slugs)].flatMap(slug => {
    const river = getRiverBySlug(slug);
    if (!river || !isScoreEligible(river)) return [];
    return [serializeSummaryResult(scoreRiverCondition({ river, gauge: null, weather: null, now }))];
  });
  if (!rivers.length) throw new Error('Package verification requires a current score-eligible fixture route');
  return { generatedAt: now.toISOString(), riverCount: rivers.length, rivers };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  // Only borrow route identifiers. Never relabel the historical fixture's scores
  // as current, or rewrite tmp-summary.json / a production snapshot.
  const historical = JSON.parse(await readFile('tmp-summary.json', 'utf8'));
  console.log(JSON.stringify(createApiVerificationSummary(historical.rivers.map((item: { river: { slug: string } }) => item.river.slug))));
}
