import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { rivers } from '../src/data/rivers';
import { coordinateWithheldRouteSlugs } from '../src/data/generated/withheld-route-slugs';
import { routeAccessReviewHolds } from '../src/data/route-access-review-holds';

type AuditReport = { generatedAt: string; routeCount: number; endpointCount: number; bySeverity: Record<string, number> };
type SuggestionReport = { generatedAt: string; count: number; autoApplyEligibleCount: number; items: Array<{ routeId: string }> };
type OsmReport = { generatedAt: string; itemCount: number; queriedItemCount: number; remainingItemCount: number; complete: boolean; failedBatches?: unknown[] };
type AuthoritativeReport = { generatedAt: string; itemCount: number; providers: Array<{ id: string; name: string; state: string; inventoryFeatureCount: number; matchedEndpointCount: number }> };
type RegistryReport = { generatedAt: string; summary: Record<string, number> };
type HistoryReport = { updatedAt: string; batchCount: number; totalCorrectionCount: number };
type ValidationReport = { generatedAt: string; correctionCount: number; passedCount: number; failedCount: number };
type GeometryManifest = { routeCount: number; matchedRouteCount: number; networkTracedRouteCount: number; namedFallbackRouteCount: number; curatedRouteCount?: number; unmatchedRouteIds: string[] };

const root = process.cwd();
async function readJson<T>(relativePath: string) {
  return JSON.parse(await readFile(path.join(root, relativePath), 'utf8')) as T;
}

async function main() {
  const [audit, suggestions, osm, authoritative, registry, history, validation, geometry] = await Promise.all([
    readJson<AuditReport>('docs/route-coordinate-river-audit.json'),
    readJson<SuggestionReport>('docs/route-coordinate-suggestions.json'),
    readJson<OsmReport>('docs/route-coordinate-osm-evidence.json'),
    readJson<AuthoritativeReport>('docs/route-coordinate-authoritative-evidence.json'),
    readJson<RegistryReport>('src/data/generated/route-access-registry.json'),
    readJson<HistoryReport>('docs/route-coordinate-auto-corrections.json'),
    readJson<ValidationReport>('docs/route-coordinate-auto-validation.json'),
    readJson<GeometryManifest>('public/data/canonical-river-geometries.json'),
  ]);
  const withheld = new Set<string>(coordinateWithheldRouteSlugs);
  const unresolvedRoutes = new Set([
    ...suggestions.items.map((item) => item.routeId),
    ...Object.keys(routeAccessReviewHolds),
  ]);
  const missingFromHold = [...unresolvedRoutes].filter((routeId) => !withheld.has(routeId)).sort();
  const staleHolds = [...withheld].filter((routeId) => !unresolvedRoutes.has(routeId)).sort();
  const report = {
    generatedAt: new Date().toISOString(),
    audit: {
      generatedAt: audit.generatedAt,
      routeCount: audit.routeCount,
      endpointCount: audit.endpointCount,
      bySeverity: audit.bySeverity,
    },
    triage: {
      reviewItemCount: suggestions.count,
      unresolvedRouteCount: unresolvedRoutes.size,
      withheldRouteCount: withheld.size,
      publicRouteCount: rivers.filter((route) => !withheld.has(route.id)).length,
      holdCoveragePasses: missingFromHold.length === 0 && staleHolds.length === 0,
      missingFromHold,
      staleHolds,
    },
    evidence: {
      osm: {
        generatedAt: osm.generatedAt,
        itemCount: osm.itemCount,
        queriedItemCount: osm.queriedItemCount,
        remainingItemCount: osm.remainingItemCount,
        complete: osm.complete,
        failedBatchCount: osm.failedBatches?.length ?? 0,
      },
      authoritative: {
        generatedAt: authoritative.generatedAt,
        endpointCount: authoritative.itemCount,
        providers: authoritative.providers,
      },
    },
    canonicalRegistry: { generatedAt: registry.generatedAt, ...registry.summary },
    routeGeometry: {
      routeCount: geometry.routeCount,
      matchedRouteCount: geometry.matchedRouteCount,
      networkTracedRouteCount: geometry.networkTracedRouteCount,
      namedFallbackRouteCount: geometry.namedFallbackRouteCount,
      curatedRouteCount: geometry.curatedRouteCount ?? 0,
      unmatchedRouteCount: geometry.unmatchedRouteIds.length,
    },
    automation: {
      historyUpdatedAt: history.updatedAt,
      batchCount: history.batchCount,
      correctionCount: history.totalCorrectionCount,
      validationGeneratedAt: validation.generatedAt,
      validatedCount: validation.correctionCount,
      passedCount: validation.passedCount,
      failedCount: validation.failedCount,
      allCorrectionsPass: validation.correctionCount === history.totalCorrectionCount && validation.failedCount === 0,
      currentlyAutoEligibleCount: suggestions.autoApplyEligibleCount,
    },
  };
  const outputPath = path.join(root, 'docs', 'route-coordinate-workflow-status.json');
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Generated ${path.relative(root, outputPath)}.`);
  console.log(JSON.stringify({
    failures: audit.bySeverity.failure ?? 0,
    reviewItems: suggestions.count,
    withheldRoutes: withheld.size,
    osmCoverage: `${osm.queriedItemCount}/${osm.itemCount}`,
    autonomousCorrections: history.totalCorrectionCount,
    validated: `${validation.passedCount}/${validation.correctionCount}`,
    holdCoveragePasses: report.triage.holdCoveragePasses,
    topologyTracedGeometries: `${geometry.networkTracedRouteCount}/${geometry.matchedRouteCount}`,
  }));
  if (!report.triage.holdCoveragePasses) process.exitCode = 1;
  if (!report.automation.allCorrectionsPass) process.exitCode = 1;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
