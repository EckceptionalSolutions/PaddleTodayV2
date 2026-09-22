import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const batch = '2026-09-17-batch-13';
const root = process.cwd();
const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), 'utf8'));
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex').toUpperCase();
const selection = await readJson(`docs/access-remediation/${batch}/selection.json`);
const review = await readJson(`docs/access-remediation/${batch}/review.json`);
const metadata = await readJson(`docs/access-remediation/${batch}/source-metadata.json`);
const backups = await readJson(`docs/access-remediation/${batch}/before-file-hashes.json`);
const holds = await readFile(path.join(root, 'src/data/route-access-review-holds.ts'), 'utf8');
const manifest = await readFile(path.join(root, 'src/data/generated/withheld-route-slugs.ts'), 'utf8');

assert.equal(selection.sites.length, 10);
assert.deepEqual(selection.sites.map((site) => site.rank), [151,152,153,154,155,156,157,158,159,160]);
assert.equal(selection.audit.evidenceMode, 'cache-only');
assert.equal(review.selectionFrozenBeforeResearch, true);
assert.equal(review.decisions.length, 10);
assert.equal(review.coordinateCorrectedSiteCount, 0);
assert.equal(review.retainedAccessAnchorCount, 8);
assert.equal(review.reclassifiedNavigationWaypointCount, 1);
assert.equal(review.unverifiedAccessSiteCount, 1);
assert.equal(review.routesHeldForAccessVerificationCount, 1);
assert.equal(review.uniqueBatchRouteHoldCount, 1);
assert.equal(review.totalWithheldRouteCountAfterBatch, 149);
for (const site of selection.sites) {
  const decision = review.decisions.find((item) => item.rank === site.rank);
  assert.ok(decision, `missing decision at rank ${site.rank}`);
  assert.equal(decision.site, site.name, `frozen site name changed at rank ${site.rank}`);
  assert.deepEqual([...decision.routes].sort(), [...new Set(site.occurrences.map((row) => row.routeId))].sort());
}

const accepted = metadata.snapshots.filter((item) => item.acceptedAsEvidence);
const failed = metadata.snapshots.filter((item) => !item.acceptedAsEvidence);
assert.equal(accepted.length, 24);
assert.equal(failed.length, 6);
for (const snapshot of accepted) {
  assert.equal(snapshot.httpStatus, 200, `${snapshot.id} is not a successful retrieval`);
  assert.ok(snapshot.sha256, `missing accepted snapshot hash: ${snapshot.id}`);
  const bytes = await readFile(path.resolve(root, snapshot.localPath));
  assert.equal(sha256(bytes), snapshot.sha256, `source hash mismatch: ${snapshot.id}`);
}
for (const snapshot of failed) {
  assert.equal(snapshot.acceptedAsEvidence, false);
  assert.equal(snapshot.sha256, null);
  assert.ok([403,404].includes(snapshot.httpStatus), `unexpected failed status: ${snapshot.id}`);
}
for (const file of backups.files) {
  const bytes = await readFile(path.resolve(root, file.backupPath));
  assert.equal(sha256(bytes), file.sha256, `before-source backup mismatch: ${file.path}`);
  assert.equal(sha256(bytes), file.backupSha256, `recorded backup hash mismatch: ${file.path}`);
}

const ids = [...new Set(review.decisions.flatMap((decision) => decision.routes))];
assert.equal(ids.length, 23, 'unexpected number of affected frozen routes');
const barber = 'north-fork-boise-barber-flat-troutdale';
assert.ok(holds.includes(barber), 'Barber Flat hold missing');
const parsedManifest = manifest.match(/coordinateWithheldRouteSlugs = (\[[\s\S]*?\]) as const;/);
assert.ok(parsedManifest, 'withholding manifest array missing');
const withheld = JSON.parse(parsedManifest[1]);
assert.equal(withheld.length, 149);
assert.equal(new Set(withheld).size, 149);
assert.deepEqual(withheld, [...withheld].sort());
assert.ok(withheld.includes(barber));
assert.ok(!withheld.includes('east-canada-creek-powley-place-out-and-back'), 'navigation waypoint must not cause a route hold');

const newYork = await readFile(path.join(root, 'src/data/routes/new-york.ts'), 'utf8');
assert.match(newYork, /east-canada-creek-powley-place-out-and-back-turnaround[^\n]*accessPointRole: 'navigation-waypoint'/);
const idaho = await readFile(path.join(root, 'src/data/routes/idaho.ts'), 'utf8');
assert.match(idaho, /Barber Flat Forest Service station \/ cabin area \(launch unverified\)/);
assert.match(idaho, /Recreation\.gov currently posts a wildfire do-not-visit notice/);
const washington = await readFile(path.join(root, 'src/data/routes/washington-spokane.ts'), 'utf8');
assert.match(washington, /Sullivan Park public river access \/ parking area/);
const rhodeIsland = await readFile(path.join(root, 'src/data/routes/rhode-island-woonasquatucket.ts'), 'utf8');
assert.match(rhodeIsland, /Esmond Park below-dam launch \/ carry area/);
const nebraskaDetails = await readFile(path.join(root, 'src/data/trip-details/nebraska.ts'), 'utf8');
assert.match(nebraskaDetails, /hotel parking \/ Pawnee Park Trail access-area anchor, not the river landing/);
assert.match(nebraskaDetails, /voluntary; do not park in private hotel space without current signs or permission/);
const iowaDetails = await readFile(path.join(root, 'src/data/trip-details/iowa.ts'), 'utf8');
assert.match(iowaDetails, /Tailwater East campground \/ public boat-ramp area/);
assert.match(iowaDetails, /Eureka Bridge concrete boat-ramp access area/);
assert.match(iowaDetails, /Interstate Park east-end canoe-ramp area/);
const arkansasDetails = await readFile(path.join(root, 'src/data/trip-details/arkansas.ts'), 'utf8');
assert.match(arkansasDetails, /U\.S\. 278 Cossatot River access area/);

const syntaxFiles = backups.files.map((file) => file.path);
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
console.log('Batch 13 verification passed: ten frozen sites and decisions; eight retained access-area anchors; one navigation-waypoint reclassification; Barber Flat withheld; 23 unique affected routes; 149 unique withheld slugs; 24 accepted snapshot hashes; six failed retrievals excluded; all pre-edit backups verified; edited TypeScript syntax valid.');
