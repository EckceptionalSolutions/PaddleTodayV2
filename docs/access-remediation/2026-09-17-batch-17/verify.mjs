import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const base = 'docs/access-remediation/2026-09-17-batch-17';
const readText = async (file) => readFile(path.join(root, file), 'utf8');
const readJson = async (file) => JSON.parse(await readText(file));
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex').toUpperCase();

const selection = await readJson(`${base}/selection.json`);
const review = await readJson(`${base}/review.json`);
const metadata = await readJson(`${base}/source-metadata.json`);
const backups = await readJson(`${base}/before-file-hashes.json`);
const snapshot = await readJson(`${base}/registry-control-snapshot.json`);
const additions = await readJson(`${base}/control-additions.json`);
const expectedRanks = [194, 195, 196, 197, 198, 199, 200, 201, 202, 203];

assert.deepEqual(selection.sites.map((site) => site.rank), expectedRanks);
assert.equal(selection.sites.length, 10);
assert.equal(selection.audit.evidenceMode, 'cache-only');
assert.equal(review.selectionFrozenBeforeResearch, true);
assert.equal(review.physicalSiteCount, 10);
assert.equal(review.coordinateCorrectedSiteCount, 1);
assert.equal(review.coordinateCorrectedRouteCount, 5);
assert.equal(review.retainedCoordinateCount, 9);
assert.equal(review.rejectedSiteCount, 0);
assert.equal(review.unverifiedAccessSiteCount, 0);
assert.equal(review.officialAccessControlAddedCount, 9);
assert.equal(review.officialAccessControlRoleCorrections, 1);
assert.equal(review.routesHeldForAccessVerificationCount, 0);
assert.deepEqual(review.newlyWithheldRouteIds, []);
assert.equal(review.totalWithheldRouteCountAfterBatch, 152);
assert.equal(review.affectedUnwithheldRouteCount, 23);

const sourceById = new Map(metadata.snapshots.map((source) => [source.id, source]));
for (const source of metadata.snapshots) {
  assert.equal(source.acceptedAsEvidence, true, `unaccepted source ${source.id}`);
  assert.equal(source.httpStatus, 200, `bad response ${source.id}`);
  const bytes = await readFile(path.resolve(root, source.localPath));
  assert.equal(bytes.length, source.bytes, `byte count changed for source ${source.id}`);
  assert.equal(digest(bytes), source.sha256, `source hash mismatch ${source.id}`);
}
for (const [file, record] of Object.entries(backups.files)) {
  const bytes = await readFile(path.resolve(root, record.backupPath));
  assert.equal(bytes.length, record.bytes, `backup byte count mismatch ${file}`);
  assert.equal(digest(bytes), record.sha256, `backup hash mismatch ${file}`);
}

const controlsFile = 'src/data/route-access-official-map-controls.json';
const controls = await readJson(controlsFile);
const beforeControls = JSON.parse(await readText(backups.files[controlsFile].backupPath));
const firstBrookBefore = beforeControls.providers.find((provider) => provider.id === 'south_branch_grass_river_spruce_first_brook');
assert.ok(firstBrookBefore, 'missing pre-existing First Brook control');
const expectedControls = structuredClone(beforeControls);
const expectedFirstBrook = expectedControls.providers.find((provider) => provider.id === 'south_branch_grass_river_spruce_first_brook');
expectedFirstBrook.coordinateRole = 'authoritative-access-anchor';
expectedFirstBrook.method = 'NYSDEC identifies Spruce Mountain Road and First Brook as public hand-launch sites. The published First Brook coordinate is specifically for its parking area along Tooley Pond Road, while the hand-launch description says the site is off that road. Keep the route point as a parking/access-area anchor; DEC does not publish the exact waterline or carry distance. Confirm the entry path and current road/land rules before launch.';
expectedFirstBrook.sourceSha256 = sourceById.get('nysdec-grass-river').sha256;
assert.equal(additions.providers.length, 9);
for (const addition of additions.providers) {
  const source = sourceById.get(addition.sourceId);
  assert.ok(source, `missing source snapshot ${addition.sourceId}`);
  assert.equal(addition.sourceUrl, source.url, `${addition.id} source URL mismatch`);
  assert.equal(addition.sourceSha256, source.sha256, `${addition.id} source hash mismatch`);
  assert.equal(addition.coordinateRole, 'authoritative-access-anchor', `${addition.id} has the wrong role`);
  assert.ok(!expectedControls.providers.some((provider) => provider.id === addition.id), `control id already existed: ${addition.id}`);
  expectedControls.providers.push(addition);
}
assert.deepEqual(controls, expectedControls, 'official control file has edits beyond the reviewed additions and First Brook role correction');
const correctedFirstBrook = controls.providers.find((provider) => provider.id === 'south_branch_grass_river_spruce_first_brook');
assert.equal(correctedFirstBrook.coordinateRole, 'authoritative-access-anchor');
assert.equal(correctedFirstBrook.sourceSha256, sourceById.get('nysdec-grass-river').sha256);

const query = await readJson(sourceById.get('mn-dnr-miller-was00341').localPath);
const feature = query.features.find((item) => item.attributes.UNIQUE_SWAS_ID === 'WAS00341');
assert.ok(feature, 'official DNR response has no WAS00341 feature');
assert.equal(feature.attributes.OBJECTID, 2504);
assert.equal(feature.attributes.WATER_TRAIL_RIVER_MILE, 7.6);
assert.equal(feature.geometry.x, -94.26496023134358);
assert.equal(feature.geometry.y, 45.55179577632979);

const newLat = '45.55179577632979';
const newLon = '-94.26496023134358';
const routesPath = 'src/data/routes/minnesota.ts';
const detailsPath = 'src/data/trip-details/minnesota.ts';
const routes = await readText(routesPath);
const details = await readText(detailsPath);
const routesBefore = await readText(backups.files[routesPath].backupPath);
const detailsBefore = await readText(backups.files[detailsPath].backupPath);
assert.equal(routes, routesBefore.replaceAll('45.5504544', newLat).replaceAll('-94.2641031', newLon), 'Minnesota route data contains unrelated edits');
assert.equal(details, detailsBefore.replaceAll('45.5504544', newLat).replaceAll('-94.2641031', newLon)
  .replaceAll('45.5517091', newLat).replaceAll('-94.2647146', newLon), 'Minnesota trip details contain unrelated edits');
assert.equal((routes.match(new RegExp(newLat, 'g')) ?? []).length, 2);
assert.equal((routes.match(new RegExp(newLon, 'g')) ?? []).length, 2);
assert.equal((details.match(new RegExp(newLat, 'g')) ?? []).length, 5);
assert.equal((details.match(new RegExp(newLon, 'g')) ?? []).length, 5);
for (const oldCoordinate of ['45.5504544', '-94.2641031', '45.5517091', '-94.2647146']) {
  assert.ok(!routes.includes(oldCoordinate), `old Miller coordinate remains in routes: ${oldCoordinate}`);
  assert.ok(!details.includes(oldCoordinate), `old Miller coordinate remains in trip details: ${oldCoordinate}`);
}
const nyPath = 'src/data/routes/new-york.ts';
const ny = await readText(nyPath);
const nyBefore = await readText(backups.files[nyPath].backupPath);
const oldNyName = "name: 'First Brook Hand Launch', latitude: 44.3042";
const newNyName = "name: 'First Brook Hand Launch Parking Area', latitude: 44.3042";
assert.equal(ny, nyBefore.replaceAll(oldNyName, newNyName), 'New York route contains unrelated edits');
assert.equal((ny.match(/First Brook Hand Launch Parking Area/g) ?? []).length, 2);

const manifest = await readText('src/data/generated/withheld-route-slugs.ts');
const manifestMatch = manifest.match(/coordinateWithheldRouteSlugs = (\[[\s\S]*?\]) as const;/);
assert.ok(manifestMatch, 'withheld slug array missing');
const slugs = JSON.parse(manifestMatch[1]);
assert.equal(slugs.length, 152);
assert.equal(new Set(slugs).size, 152);
assert.deepEqual(slugs, [...slugs].sort());
assert.equal(snapshot.files[0].sha256, backups.files[controlsFile].sha256);
const registryBytes = await readFile(path.join(root, 'src/data/generated/route-access-registry.json'));
assert.equal(digest(registryBytes), snapshot.generatedArtifacts[0].sha256, 'generated registry changed after the before-edits snapshot');

for (const file of [routesPath, detailsPath, nyPath]) {
  const source = await readText(file);
  const output = ts.transpileModule(source, {
    fileName: file,
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  const errors = (output.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, `${file} has TypeScript syntax diagnostics`);
}

console.log('Batch 17 verification passed: ten frozen sites; one DNR GIS coordinate correction propagated through five routes and seven coordinate pairs; nine official access-anchor controls added; First Brook role corrected; no new holds; 152 withheld slugs preserved; source and backup hashes verified; TypeScript syntax valid.');
