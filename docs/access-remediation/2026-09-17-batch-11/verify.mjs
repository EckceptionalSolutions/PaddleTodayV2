import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const batch = '2026-09-17-batch-11';
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
assert.deepEqual(selection.sites.map((site) => site.rank), [131, 132, 133, 134, 135, 136, 137, 138, 139, 140]);
assert.equal(selection.audit.evidenceMode, 'cache-only', 'the cached audit must be disclosed');
assert.equal(review.selectionFrozenBeforeResearch, true);
assert.equal(review.decisions.length, 10, 'every frozen site needs a decision');
for (const site of selection.sites) {
  const decision = review.decisions.find((item) => item.rank === site.rank);
  assert.ok(decision, `missing decision for frozen rank ${site.rank}`);
  assert.equal(decision.site, site.name, `frozen site name changed at rank ${site.rank}`);
  assert.deepEqual([...decision.routes].sort(), [...new Set(site.occurrences.map((item) => item.routeId))].sort());
}

assert.equal(review.coordinateCorrectedSiteCount, 0);
assert.equal(review.retainedAccessAnchorCount, 8);
assert.equal(review.unverifiedAccessSiteCount, 2);
assert.equal(review.uniqueBatchRouteHoldCount, 2);
assert.equal(review.totalWithheldRouteCountAfterBatch, 147);
assert.equal(validation.sourceReview, 'passed');

const batchHeldRoutes = [
  'little-north-fork-coeur-dalene-laverne-mouth',
  'south-fork-payette-grandjean-deadwood',
];
for (const routeId of batchHeldRoutes) assert.ok(holds.includes(routeId), `source hold missing ${routeId}`);
const manifestMatch = manifest.match(/coordinateWithheldRouteSlugs = (\[[\s\S]*?\]) as const;/);
assert.ok(manifestMatch, 'generated withholding manifest array not found');
const withheldRouteIds = JSON.parse(manifestMatch[1]);
assert.equal(withheldRouteIds.length, 147, 'generated withholding manifest should contain 147 route slugs');
assert.equal(new Set(withheldRouteIds).size, withheldRouteIds.length, 'generated withholding manifest has duplicate slugs');
for (const routeId of batchHeldRoutes) assert.ok(withheldRouteIds.includes(routeId), `generated withholding manifest missing ${routeId}`);

const acceptedSources = sources.snapshots.filter((snapshot) => snapshot.acceptedAsEvidence);
const failedSources = sources.snapshots.filter((snapshot) => !snapshot.acceptedAsEvidence);
assert.equal(acceptedSources.length, 26);
assert.equal(failedSources.length, 2);
for (const snapshot of acceptedSources) {
  assert.ok(snapshot.sha256, `accepted source is missing a hash: ${snapshot.id}`);
  const bytes = await readFile(path.resolve(root, snapshot.localPath));
  assert.equal(sha256(bytes), snapshot.sha256, `source snapshot hash mismatch: ${snapshot.id}`);
}
for (const snapshot of failedSources) {
  assert.equal(snapshot.sha256, null, `failed source must not be treated as evidence: ${snapshot.id}`);
  assert.equal(snapshot.acceptedAsEvidence, false);
  assert.equal(snapshot.httpStatus, 404);
}

for (const file of before.files) {
  const backup = await readFile(path.resolve(root, file.backupPath));
  assert.equal(sha256(backup), file.sha256, `pre-edit backup hash mismatch: ${file.path}`);
  assert.equal(sha256(backup), file.backupSha256, `backup SHA-256 metadata mismatch: ${file.path}`);
}

const roleChecks = [
  ['src/data/routes/montana-blackfoot.ts', /Russell Gates Memorial Fishing Access Site \(public ramp\/access area\)/],
  ['src/data/routes/montana-blackfoot.ts', /not a surveyed ramp-edge point/],
  ['src/data/routes/louisiana-bayou-teche.ts', /Loreauville official dock access area \(119 Bridge St\)/],
  ['src/data/routes/louisiana-bayou-teche.ts', /At New Iberia, confirm event closures, parking and the city-dock water-entry path/],
  ['src/data/routes/idaho.ts', /not a surveyed water-edge point/],
  ['src/data/routes/new-york.ts', /Outer Gooley Parking Area \/ Hudson Gorge carry/],
  ['src/data/routes/new-york.ts', /about 0\.1 mile from the Hudson River take-out/],
  ['src/data/routes/washington-stillaguamish.ts', /park access-area anchor, not a published launch-edge coordinate/],
  ['src/data/trip-details/iowa.ts', /not a surveyed bridge-side water-entry point/],
];
for (const [file, pattern] of roleChecks) assert.match(await readFile(path.join(root, file), 'utf8'), pattern, `missing access-role clarification in ${file}`);

const syntaxFiles = [
  'src/data/routes/new-york.ts',
  'src/data/routes/idaho.ts',
  'src/data/routes/montana-blackfoot.ts',
  'src/data/routes/louisiana-bayou-teche.ts',
  'src/data/trip-details/iowa.ts',
  'src/data/routes/washington-stillaguamish.ts',
  'src/data/route-access-review-holds.ts',
  'src/data/generated/withheld-route-slugs.ts',
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
console.log('Batch 11 verification passed: ten frozen sites, ten decisions, eight retained access anchors with corrected role labels, two unverified-access route holds, 147 unique withheld route slugs, 26 hashed accepted sources, two failed retrievals excluded, verified backups, and TypeScript syntax.');
