import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { routeInventory, rivers } from '../src/data/rivers';

const root = resolve(process.cwd());
const outputDir = resolve(root, 'docs/operations');
mkdirSync(outputDir, { recursive: true });
const scored = new Set(rivers.map((route) => route.slug));
const findings = routeInventory.map((route) => {
  const issues: string[] = [];
  if (scored.has(route.slug) && route.gaugeSource.kind !== 'direct') issues.push('proxy-or-non-direct-gauge');
  if (!route.sourceLinks?.length) issues.push('missing-source-links');
  if (!route.evidenceNotes?.length) issues.push('missing-evidence-notes');
  if (!route.safetyProfile || route.safetyProfile.reviewStatus !== 'reviewed') issues.push('safety-review-needed');
  if (!route.logistics?.camping) issues.push('camping-status-missing');
  if (!route.putIn || !route.takeOut) issues.push('endpoint-package-incomplete');
  return { slug: route.slug, state: route.state, scored: scored.has(route.slug), issues, severity: issues.includes('safety-review-needed') ? 'high' : issues.length ? 'medium' : 'ok' };
}).filter((finding) => finding.issues.length > 0);

writeFileSync(resolve(outputDir, 'route-freshness-report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), scope: 'metadata-and-package freshness; live gauge freshness remains provider-runtime data', totals: { routesReviewed: routeInventory.length, findings: findings.length, high: findings.filter((f) => f.severity === 'high').length }, findings }, null, 2) + '\n');
console.log(JSON.stringify({ routesReviewed: routeInventory.length, findings: findings.length }));
