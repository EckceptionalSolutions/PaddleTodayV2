import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const batch = '2026-09-17-batch-14';
const root = process.cwd();
const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), 'utf8'));
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex').toUpperCase();
const selection = await readJson(`docs/access-remediation/${batch}/selection.json`);
const review = await readJson(`docs/access-remediation/${batch}/review.json`);
const metadata = await readJson(`docs/access-remediation/${batch}/source-metadata.json`);
const backups = await readJson(`docs/access-remediation/${batch}/before-file-hashes.json`);
const priorSnapshot = await readJson(`docs/access-remediation/${batch}/registry-control-snapshot.json`);
const manifest = await readFile(path.join(root, 'src/data/generated/withheld-route-slugs.ts'), 'utf8');

assert.deepEqual(selection.sites.map((site) => site.rank), [161,163,164,165,167,168,169,170,171,172]);
assert.equal(selection.sites.length, 10);
assert.equal(selection.audit.evidenceMode, 'cache-only');
assert.equal(selection.priorFrozenSiteCount, 120);
assert.equal(selection.skippedHeldQueueEntryCount, 2);
assert.equal(review.selectionFrozenBeforeResearch, true);
assert.equal(review.decisions.length, 10);
assert.equal(review.coordinateCorrectedSiteCount, 2);
assert.equal(review.retainedAccessAnchorCount, 7);
assert.equal(review.reclassifiedNavigationWaypointCount, 1);
assert.equal(review.unverifiedAccessSiteCount, 0);
assert.equal(review.routesHeldForAccessVerificationCount, 0);
assert.equal(review.totalWithheldRouteCountAfterBatch, 149);
assert.equal(review.uniqueBatchRouteCount, 20);
assert.equal(review.coordinateCorrectedRouteCount, 10);

for (const site of selection.sites) {
  const decision = review.decisions.find((item) => item.rank === site.rank);
  assert.ok(decision, `missing decision at rank ${site.rank}`);
  assert.equal(decision.site, site.name, `frozen site name changed at rank ${site.rank}`);
  assert.deepEqual([...decision.routes].sort(), [...new Set(site.occurrences.map((row) => row.routeId))].sort());
  assert.deepEqual(decision.originalCoordinate, [site.latitude, site.longitude]);
  assert.ok(decision.sourceUrls.length > 0, `missing sources at rank ${site.rank}`);
}

const accepted = metadata.snapshots.filter((item) => item.acceptedAsEvidence);
const failed = metadata.snapshots.filter((item) => !item.acceptedAsEvidence);
assert.equal(accepted.length, 22);
assert.equal(failed.length, 1);
for (const snapshot of accepted) {
  assert.equal(snapshot.httpStatus, 200, `${snapshot.id} is not a successful retrieval`);
  assert.ok(snapshot.sha256, `missing accepted snapshot hash: ${snapshot.id}`);
  const bytes = await readFile(path.resolve(root, snapshot.localPath));
  assert.equal(sha256(bytes), snapshot.sha256, `source hash mismatch: ${snapshot.id}`);
}
assert.equal(failed[0].id, 'catskill-village-parks-rules');
assert.equal(failed[0].httpStatus, 404);
assert.equal(failed[0].acceptedAsEvidence, false);
assert.equal(failed[0].sha256, null);

for (const [file, record] of Object.entries(backups.files)) {
  const bytes = await readFile(path.resolve(root, record.backupPath));
  assert.equal(sha256(bytes), record.sha256, `before-source backup mismatch: ${file}`);
}
for (const file of priorSnapshot.files) {
  const record = backups.files[file.path];
  if (record) assert.equal(file.sha256, record.sha256, `prior snapshot does not match pre-edit source ${file.path}`);
  else assert.match(file.sha256, /^[A-F0-9]{64}$/, `missing prior source hash for ${file.path}`);
  assert.ok(file.matchedRecordCount > 0, `no matching prior records captured for ${file.path}`);
}

const decisionsRouteIds = [...new Set(review.decisions.flatMap((decision) => decision.routes))].sort();
assert.equal(decisionsRouteIds.length, 20);
const parsedManifest = manifest.match(/coordinateWithheldRouteSlugs = (\[[\s\S]*?\]) as const;/);
assert.ok(parsedManifest, 'withholding manifest array missing');
const withheld = JSON.parse(parsedManifest[1]);
assert.equal(withheld.length, 149);
assert.equal(new Set(withheld).size, 149);
assert.deepEqual(withheld, [...withheld].sort());
assert.ok(decisionsRouteIds.every((id) => !withheld.includes(id)), 'a selected public route became withheld');

const controls = await readJson('src/data/route-access-official-map-controls.json');
const mo = controls.providers.find((provider) => provider.id === 'mo_meramec_state_park_boat_launch');
const mt = controls.providers.find((provider) => provider.id === 'mt_fwp_whitaker_bridge_fas');
assert.ok(mo && mt, 'official access-area controls missing');
assert.equal(mo.coordinateRole, 'authoritative-access-anchor');
assert.deepEqual([mo.controls[0].latitude, mo.controls[0].longitude], [38.203259, -91.09888]);
assert.equal(mt.coordinateRole, 'authoritative-access-anchor');
assert.deepEqual([mt.controls[0].latitude, mt.controls[0].longitude], [46.94277, -113.59983]);
assert.equal(mo.sourceSha256, metadata.snapshots.find((source) => source.id === 'meramec-state-park-boat-launch').sha256);
assert.equal(mt.sourceSha256, metadata.snapshots.find((source) => source.id === 'whitaker-fwp-site-detail').sha256);

const newYork = await readFile(path.join(root, 'src/data/routes/new-york.ts'), 'utf8');
assert.match(newYork, /miami-river-lewey-lake-out-and-back-miami-turnaround[^\n]*accessPointRole: 'navigation-waypoint'/);
const missouri = await readFile(path.join(root, 'src/data/routes/missouri.ts'), 'utf8');
const missouriDetails = await readFile(path.join(root, 'src/data/trip-details/missouri.ts'), 'utf8');
assert.match(missouri, /"latitude": 38\.203259,[\s\S]{0,45}"longitude": -91\.09888/);
assert.match(missouri, /38\.203259, -91\.09888/);
assert.equal((missouriDetails.match(/"latitude": 38\.203259/g) ?? []).length, 2);
assert.equal((missouriDetails.match(/"longitude": -91\.09888/g) ?? []).length, 2);
const montana = await readFile(path.join(root, 'src/data/routes/montana-blackfoot.ts'), 'utf8');
assert.equal((montana.match(/46\.94277/g) ?? []).length, 4);
assert.equal((montana.match(/-113\.59983/g) ?? []).length, 4);
assert.ok(!montana.includes('46.9430') && !montana.includes('-113.6000'));
assert.ok(montana.includes('Whitaker Bridge Fishing Access Site (public access-area anchor)'));

const syntaxFiles = Object.keys(backups.files).filter((file) => file.endsWith('.ts'));
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
console.log('Batch 14 verification passed: ten frozen sites; two official coordinate fixes applied across ten route records; seven retained access-area anchors; one navigation waypoint reclassification; 20 unique public routes; no new holds; 149 withheld slugs; 22 accepted source hashes and one failed retrieval excluded; five before-source backups and prior registry/control snapshots verified; edited TypeScript syntax valid.');
