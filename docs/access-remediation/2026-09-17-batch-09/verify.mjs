import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const batch = '2026-09-17-batch-09';
const root = process.cwd();
const batchRoot = path.join(root, 'docs', 'access-remediation', batch);
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));
const sha256 = (value) => createHash('sha256').update(value).digest('hex').toUpperCase();
const selection = await readJson(`docs/access-remediation/${batch}/selection.json`);
const review = await readJson(`docs/access-remediation/${batch}/review.json`);
const sources = await readJson(`docs/access-remediation/${batch}/source-metadata.json`);
const before = await readJson(`docs/access-remediation/${batch}/before-file-hashes.json`);
const holds = await readFile(path.join(root, 'src/data/route-access-review-holds.ts'), 'utf8');
const manifest = await readFile(path.join(root, 'src/data/generated/withheld-route-slugs.ts'), 'utf8');
const idaho = await readFile(path.join(root, 'src/data/routes/idaho.ts'), 'utf8');
const minnesota = await readFile(path.join(root, 'src/data/routes/minnesota.ts'), 'utf8');
const utahTrips = await readFile(path.join(root, 'src/data/trip-details/utah.ts'), 'utf8');
const verde = await readFile(path.join(root, 'src/data/routes/arizona-verde-expansion.ts'), 'utf8');
const accessControls = await readJson('src/data/route-access-official-map-controls.json');
const audit = await readFile(path.join(root, 'scripts/audit-route-coordinate-river-distance.ts'), 'utf8');
const roleHelper = await readFile(path.join(root, 'scripts/lib/access-point-audit-role.ts'), 'utf8');
const roleTest = await readFile(path.join(root, 'scripts/lib/access-point-audit-role.test.ts'), 'utf8');
const typeSource = await readFile(path.join(root, 'src/lib/types.ts'), 'utf8');

assert.equal(selection.sites.length, 10, 'selection must keep all ten frozen physical sites');
assert.deepEqual(selection.sites.map((site) => site.rank), [110, 111, 112, 113, 114, 115, 116, 117, 118, 119]);
assert.equal(review.selectionFrozenBeforeResearch, true);
assert.equal(review.decisions.length, 10, 'every selected site needs a decision');
for (const site of selection.sites) {
  const decision = review.decisions.find((item) => item.rank === site.rank);
  assert.ok(decision, `missing decision for frozen rank ${site.rank}`);
  assert.equal(decision.site, site.name, `site name changed at rank ${site.rank}`);
  assert.deepEqual(decision.routes, [...new Set(site.occurrences.map((item) => item.routeId))]);
}

assert.equal(review.coordinateCorrectedSiteCount, 0);
assert.equal(review.retainedAccessAnchorCount, 7);
assert.equal(review.removedUnsupportedAccessMarkerCount, 1);
assert.equal(review.navigationWaypointReclassifiedCount, 1);
assert.equal(review.unverifiedPublicAccessCount, 1);
assert.equal(review.uniqueBatchRouteHoldCount, 1);
assert.equal(review.totalWithheldRouteCountAfterBatch, 139);
assert.match(holds, /poplar-river-lutsen-seventh-bridge/);
assert.match(manifest, /poplar-river-lutsen-seventh-bridge/);
assert.match(manifest, /coordinateWithheldRouteSlugs/);

const routeIdsInManifest = manifest.match(/"[a-z0-9]+(?:-[a-z0-9]+)+"/g) ?? [];
assert.equal(routeIdsInManifest.length, 139, 'generated withholding manifest should contain 139 unique route slugs');
assert.equal(new Set(routeIdsInManifest).size, routeIdsInManifest.length, 'withholding manifest has duplicate slugs');

assert.match(idaho, /accessPointRole\?: RiverRouteAccessPoint\["accessPointRole"\]/);
assert.match(idaho, /accessPointRole: "navigation-waypoint"/);
assert.match(idaho, /access\.accessPointRole \? \{ accessPointRole: access\.accessPointRole \}/);
assert.match(audit, /\.filter\(isAccessPointForQualityAudit\)/);
assert.match(roleHelper, /point\.accessPointRole !== 'navigation-waypoint'/);
assert.match(roleTest, /keeps existing access points in the audit by default/);
assert.match(roleTest, /omits explicitly classified route-navigation waypoints/);
assert.match(typeSource, /accessPointRole\?: 'public-access' \| 'navigation-waypoint'/);
assert.doesNotMatch(utahTrips, /Lower Meadows Campground/);
assert.match(minnesota, /WITHHELD: The available state and resort sources do not confirm public kayak\/canoe parking, carry, and water entry/);
assert.match(verde, /Skidmore Drive RAP access area \(river about 150 yards down trail\)/);
for (const providerId of [
  'maquoketa_river_canton_bridge',
  'hudson_river_tivoli_north_bay_loop',
  'peconic_river_forge_pond_upper_mills',
  'peconic_river_upper_mills_weeping_willow',
  'west_nishnabotna_botna_bend',
  'woonasquatucket_manton_aleppo_launch',
  'verde_river_skidmore_drive',
]) {
  assert.ok(accessControls.providers.some((provider) => provider.id === providerId), `missing access-anchor control ${providerId}`);
}

const acceptedSources = sources.snapshots.filter((snapshot) => snapshot.acceptedAsEvidence);
const failedSources = sources.snapshots.filter((snapshot) => !snapshot.acceptedAsEvidence);
assert.equal(acceptedSources.length, 14);
assert.equal(failedSources.length, 5);
for (const snapshot of acceptedSources) {
  const bytes = await readFile(path.resolve(root, snapshot.localPath));
  assert.equal(sha256(bytes), snapshot.sha256, `source snapshot hash mismatch: ${snapshot.id}`);
}
for (const snapshot of failedSources) {
  assert.equal(snapshot.sha256, null, `failed source must not be treated as evidence: ${snapshot.id}`);
  assert.equal(snapshot.acceptedAsEvidence, false);
}

for (const file of before.files) {
  const backup = await readFile(path.resolve(root, file.backupPath));
  assert.equal(sha256(backup), file.sha256, `pre-edit backup hash mismatch: ${file.path}`);
}

const syntaxFiles = [
  'scripts/audit-route-coordinate-river-distance.ts',
  'scripts/lib/access-point-audit-role.ts',
  'src/lib/types.ts',
  'src/data/routes/idaho.ts',
  'src/data/routes/minnesota.ts',
  'src/data/routes/arizona-verde-expansion.ts',
  'src/data/routes/rhode-island-woonasquatucket.ts',
  'src/data/trip-details/iowa.ts',
  'src/data/trip-details/minnesota.ts',
  'src/data/trip-details/utah.ts',
];
for (const file of syntaxFiles) {
  const source = await readFile(path.join(root, file), 'utf8');
  const output = ts.transpileModule(source, {
    fileName: file,
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  const errors = (output.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, `${file} has TypeScript syntax diagnostics`);
}

await stat(batchRoot);
console.log('Batch 09 verification passed: ten frozen sites, ten documented decisions, seven retained access anchors, one removed optional marker, one typed navigation waypoint excluded from the audit, one held route, 139 withheld slugs, 14 hashed accepted source snapshots, five logged retrieval failures, backed-up edits, and TypeScript syntax.');
