import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const batch = '2026-09-17-batch-15';
const root = process.cwd();
const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), 'utf8'));
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex').toUpperCase();
const selection = await readJson(`docs/access-remediation/${batch}/selection.json`);
const review = await readJson(`docs/access-remediation/${batch}/review.json`);
const metadata = await readJson(`docs/access-remediation/${batch}/source-metadata.json`);
const backups = await readJson(`docs/access-remediation/${batch}/before-file-hashes.json`);
const priorSnapshot = await readJson(`docs/access-remediation/${batch}/registry-control-snapshot.json`);
const expectedRanks = [173, 174, 176, 177, 178, 179, 180, 181, 182, 183];
assert.deepEqual(selection.sites.map((site) => site.rank), expectedRanks);
assert.equal(selection.sites.length, 10);
assert.equal(selection.audit.evidenceMode, 'cache-only');
assert.equal(selection.priorFrozenSiteCount, 130);
assert.equal(selection.skippedHeldQueueEntryCount, 1);
assert.equal(review.selectionFrozenBeforeResearch, true);
assert.equal(review.decisions.length, 10);
assert.equal(review.physicalSiteCount, 10);
assert.equal(review.coordinateCorrectedSiteCount, 1);
assert.equal(review.coordinateCorrectedRouteCount, 1);
assert.equal(review.retainedCoordinateCount, 9);
assert.equal(review.rejectedSiteCount, 0);
assert.equal(review.unverifiedAccessSiteCount, 0);
assert.equal(review.routesHeldForAccessVerificationCount, 0);
assert.equal(review.totalWithheldRouteCountAfterBatch, 149);

for (const site of selection.sites) {
  const decision = review.decisions.find((item) => item.rank === site.rank);
  assert.ok(decision, `missing decision at rank ${site.rank}`);
  assert.equal(decision.site, site.name, `frozen site name changed at rank ${site.rank}`);
  assert.deepEqual([...decision.routes].sort(), [...new Set(site.occurrences.map((row) => row.routeId))].sort());
  assert.deepEqual(decision.originalCoordinate, [site.latitude, site.longitude]);
  assert.ok(decision.sourceUrls.length > 0, `missing sources at rank ${site.rank}`);
}
assert.equal(review.decisions.find((item) => item.rank === 174).alreadyHeldRoutes.length, 1);
assert.deepEqual(review.changedPublicRouteGeometryIds, ['arkansas-river-granite-boat-chute-buena-vista']);

const accepted = metadata.snapshots.filter((item) => item.acceptedAsEvidence);
const failed = metadata.snapshots.filter((item) => !item.acceptedAsEvidence);
assert.equal(accepted.length, 17);
assert.equal(failed.length, 2);
assert.deepEqual(failed.map((item) => item.id).sort(), ['syracuse-kayaking', 'syracuse-launch-announcement']);
for (const snapshot of accepted) {
  assert.equal(snapshot.httpStatus, 200, `${snapshot.id} is not a successful retrieval`);
  assert.ok(snapshot.sha256, `missing accepted snapshot hash: ${snapshot.id}`);
  const bytes = await readFile(path.resolve(root, snapshot.localPath));
  assert.equal(sha256(bytes), snapshot.sha256, `source hash mismatch: ${snapshot.id}`);
}
for (const source of failed) {
  assert.equal(source.acceptedAsEvidence, false);
  assert.equal(source.sha256, null);
  assert.equal(source.localPath, null);
}
for (const [file, record] of Object.entries(backups.files)) {
  const bytes = await readFile(path.resolve(root, record.backupPath));
  assert.equal(sha256(bytes), record.sha256, `before-source backup mismatch: ${file}`);
}
for (const file of priorSnapshot.files) {
  const record = backups.files[file.path];
  assert.equal(file.sha256, record.sha256, `prior snapshot does not match pre-edit source ${file.path}`);
  assert.ok(file.matchedRecordCount > 0, `no matching prior records captured for ${file.path}`);
}

const withheldSource = await readFile(path.join(root, 'src/data/generated/withheld-route-slugs.ts'), 'utf8');
const manifestMatch = withheldSource.match(/coordinateWithheldRouteSlugs = (\[[\s\S]*?\]) as const;/);
assert.ok(manifestMatch, 'withholding manifest array missing');
const withheld = JSON.parse(manifestMatch[1]);
assert.equal(withheld.length, 149);
assert.equal(new Set(withheld).size, 149);
assert.deepEqual(withheld, [...withheld].sort());
const selectedPublicIds = [...new Set(review.decisions.flatMap((item) => item.publicRoutes))];
assert.ok(selectedPublicIds.every((id) => !withheld.includes(id)), 'selected public route unexpectedly withheld');

const route = await readFile(path.join(root, 'src/data/routes/colorado.ts'), 'utf8');
const details = await readFile(path.join(root, 'src/data/trip-details/colorado.ts'), 'utf8');
const controls = await readJson('src/data/route-access-official-map-controls.json');
const peconic = controls.providers.find((provider) => provider.id === 'peconic_river_river_road_edwards_avenue');
const bv = controls.providers.find((provider) => provider.id === 'co_ahra_buena_vista_whitewater_park_ramp');
const oldBv = controls.providers.find((provider) => provider.id === 'co_ahra_granite_buena_vista_access');
assert.ok(peconic && bv && oldBv, 'expected access control providers missing');
assert.equal(peconic.coordinateRole, 'authoritative-access-anchor');
assert.match(peconic.method, /75-yard.*100-yard.*not surveyed wet-edge/i);
assert.equal(peconic.sourceSha256, accepted.find((source) => source.id === 'nydec-suffolk-launches').sha256);
assert.equal(bv.coordinateRole, 'authoritative-access-anchor');
assert.deepEqual([bv.controls[0].latitude, bv.controls[0].longitude], [38.847248805868695, -106.12221661900705]);
assert.equal(bv.sourceSha256, accepted.find((source) => source.id === 'cpw-bv-swa-ramp-feature-verified').sha256);
assert.equal(bv.controls[0].uncertaintyFeet, 125);
assert.equal(oldBv.controls.length, 1);
assert.equal((route.match(/38\.847248805868695/g) ?? []).length, 2);
assert.equal((route.match(/-106\.12221661900705/g) ?? []).length, 2);
assert.match(details, /"takeOut"[^\n]*38\.847248805868695[^\n]*-106\.12221661900705/);
assert.match(details, /"accessPoints"[\s\S]*38\.847248805868695[^\n]*-106\.12221661900705/);
assert.ok(!route.includes('CPW�s') && !details.includes('CPW�s'), 'mojibake detected');

for (const file of ['src/data/routes/colorado.ts', 'src/data/trip-details/colorado.ts']) {
  const source = await readFile(path.join(root, file), 'utf8');
  const output = ts.transpileModule(source, {
    fileName: file,
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  const errors = (output.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, `${file} has TypeScript syntax diagnostics`);
}
console.log('Batch 15 verification passed: frozen ten; one coordinate correction propagated to route, trip details, and official controls; one shared access-role correction; nine retained coordinates; two failed retrievals excluded; source and backup hashes verified; 149 withheld slugs unchanged; selected public routes remain public; TypeScript syntax valid.');
