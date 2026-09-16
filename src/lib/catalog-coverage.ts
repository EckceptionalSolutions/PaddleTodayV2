import { createHash } from 'node:crypto';
import { isScoreEligible } from '../data/route-publication';
import type { River } from './types';

export function catalogRevision(routes: River[]) {
  return createHash('sha256').update(routes.map(route => `${route.slug}:${isScoreEligible(route)}`).sort().join('\n')).digest('hex').slice(0, 16);
}

export function assertScoredCatalogCoverage(expectedSlugs: string[], resultSlugs: string[]) {
  const actual = new Set(resultSlugs);
  const missing = expectedSlugs.filter(slug => !actual.has(slug));
  if (missing.length || actual.size !== resultSlugs.length || actual.size !== expectedSlugs.length) {
    throw new Error(`Snapshot catalog mismatch: expected ${expectedSlugs.length} scored routes, received ${resultSlugs.length}, missing ${missing.length}. Existing snapshots were preserved.`);
  }
}
