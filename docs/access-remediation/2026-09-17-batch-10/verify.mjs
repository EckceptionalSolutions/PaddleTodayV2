import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const batch = '2026-09-17-batch-10';
const root = process.cwd();
const batchRoot = path.join(root, 'docs', 'access-remediation', batch);
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));
const sha256 = (value) => createHash('sha256').update(value).digest('hex').toUpperCase();
const selection = await readJson(`docs/access-remediation/${batch}/selection.json`);
const review = await readJson(`docs/access-remediation/${batch}/review.json`);
const sources = await readJson(`docs/access-remediation/${batch}/source-metadata.json`);
const before = await readJson(`docs/access-remediation/${batch}/before-file-hashes.json`);
const validation = await readJson(`docs/access-remediation/${batch}/validation.json`);
const holds = await readFile(path.join(root, 'src/data/route-access-review-holds.ts'), 'utf8');
const manifest = await readFile(path.join(root, 'src/data/generated/withheld-route-slugs.ts'), 'utf8');

assert.equal(selection.sites.length, 10, 'the frozen selection must contain ten physical sites');
assert.deepEqual(selection.sites.map((site) => site.rank), [121, 122, 123, 124, 125, 126, 127, 128, 129, 130]);
assert.equal(selection.audit.evidenceMode, 'cache-only', 'the stale cache snapshot must be disclosed');
assert.equal(review.selectionFrozenBeforeResearch, true);
assert.equal(review.decisions.length, 10, 'every frozen site needs a decision');
for (const site of selection.sites) {
  const decision = review.decisions.find((item) => item.rank === site.rank);
  assert.ok(decision, `missing decision for frozen rank ${site.rank}`);
  assert.equal(decision.site, site.name, `frozen site name changed at rank ${site.rank}`);
  assert.deepEqual([...decision.routes].sort(), [...new Set(site.occurrences.map((item) => item.routeId))].sort());
}

assert.equal(review.coordinateCorrectedSiteCount, 1);
assert.equal(review.retainedAccessAnchorCount, 6);
assert.equal(review.removedUnsupportedAccessMarkerCount, 0);
assert.equal(review.unverifiedAccessSiteCount, 3);
assert.equal(review.routesHeldForGeometryRegenerationCount, 3);
assert.equal(review.uniqueBatchRouteHoldCount, 6);
assert.equal(review.totalWithheldRouteCountAfterBatch, 145);
assert.equal(validation.sourceReview, 'passed');
assert.equal(validation.servedArtifacts.status, 'stale-and-not-regenerated');
assert.equal(validation.servedArtifacts.affectedRouteIds.length, 3);

const batchHeldRoutes = [
  'little-north-fork-clearwater-headwaters-reservoir',
  'broadkill-river-milton-mccabe',
  'buffalo-river-tyler-bend-gilbert',
  'catawba-river-fort-mill-rock-hill',
  'catawba-river-fort-mill-landsford',
  'catawba-river-fort-mill-sc9',
];
for (const routeId of batchHeldRoutes) {
  assert.ok(holds.includes(routeId), `source hold missing ${routeId}`);
}
const manifestMatch = manifest.match(/coordinateWithheldRouteSlugs = (\[[\s\S]*?\]) as const;/);
assert.ok(manifestMatch, 'generated withholding manifest array not found');
const withheldRouteIds = JSON.parse(manifestMatch[1]);
assert.equal(withheldRouteIds.length, 145, 'generated withholding manifest should contain 145 route slugs');
assert.equal(new Set(withheldRouteIds).size, withheldRouteIds.length, 'generated withholding manifest has duplicate slugs');
for (const routeId of batchHeldRoutes) {
  assert.ok(withheldRouteIds.includes(routeId), `generated withholding manifest missing ${routeId}`);
}

const catawba = await readFile(path.join(root, 'src/data/routes/south-carolina-catawba.ts'), 'utf8');
assert.match(catawba, /Fort Mill public landing below Lake Wylie Dam/);
assert.match(catawba, /35\.02171656381242/);
assert.match(catawba, /-81\.00404683440097/);
assert.match(catawba, /OBJECTID 739/);
assert.doesNotMatch(catawba, /Fort Mill River Access below Lake Wylie Dam \(water-entry edge\)/);

const editedFiles = [
  'src/data/routes/south-carolina-catawba.ts',
  'src/data/route-access-review-holds.ts',
  'src/data/trip-details/utah.ts',
  'src/data/trip-details/wisconsin.ts',
  'src/data/routes/wisconsin.ts',
  'src/data/routes/louisiana-bayou-teche.ts',
  'src/data/routes/west-virginia.ts',
  'src/data/trip-details/illinois.ts',
  'src/data/routes/idaho.ts',
];
const sourceChecks = [
  ['src/data/trip-details/utah.ts', /Perception Park riverside campground access area/],
  ['src/data/routes/idaho.ts', /not a manager-verified public take-out or vehicle-staging point\. The route is withheld/],
  ['src/data/trip-details/wisconsin.ts', /difficult carry-in scout\/portage access/],
  ['src/data/routes/louisiana-bayou-teche.ts', /Charenton official dock access area/],
  ['src/data/routes/west-virginia.ts', /river-right check-in \/ access area/],
  ['src/data/routes/wisconsin.ts', /Onalaska's redevelopment plan identifies an accessible canoe launch/],
  ['src/data/trip-details/illinois.ts', /trailhead\/access-area anchors/],
];
for (const [file, pattern] of sourceChecks) {
  assert.match(await readFile(path.join(root, file), 'utf8'), pattern, `missing documented access role in ${file}`);
}

const acceptedSources = sources.snapshots.filter((snapshot) => snapshot.acceptedAsEvidence);
const failedSources = sources.snapshots.filter((snapshot) => !snapshot.acceptedAsEvidence);
assert.equal(acceptedSources.length, 21);
assert.equal(failedSources.length, 1);
for (const snapshot of acceptedSources) {
  assert.ok(snapshot.sha256, `accepted source is missing a hash: ${snapshot.id}`);
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
  assert.equal(sha256(backup), file.backupSha256, `backup SHA-256 metadata mismatch: ${file.path}`);
}

const syntaxFiles = [...editedFiles, 'src/data/generated/withheld-route-slugs.ts'];
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
console.log('Batch 10 verification passed: ten frozen sites, ten decisions, one defensible coordinate correction, six retained access anchors, three unresolved access holds, three geometry holds, 145 unique withheld routes, 21 hashed accepted sources, one logged retrieval failure, verified backups, and TypeScript syntax.');
