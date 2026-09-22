import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const batch = '2026-09-17-batch-16';
const base = `docs/access-remediation/${batch}`;
const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), 'utf8'));
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex').toUpperCase();
const selection = await readJson(`${base}/selection.json`);
const review = await readJson(`${base}/review.json`);
const metadata = await readJson(`${base}/source-metadata.json`);
const backups = await readJson(`${base}/before-file-hashes.json`);
const snapshot = await readJson(`${base}/registry-control-snapshot.json`);
const additions = await readJson(`${base}/control-additions.json`);

assert.deepEqual(selection.sites.map((site) => site.rank), [184, 185, 186, 187, 188, 189, 190, 191, 192, 193]);
assert.equal(selection.sites.length, 10);
assert.equal(selection.audit.evidenceMode, 'cache-only');
assert.equal(review.selectionFrozenBeforeResearch, true);
assert.equal(review.decisions.length, 10);
assert.equal(review.physicalSiteCount, 10);
assert.equal(review.coordinateCorrectedSiteCount, 1);
assert.equal(review.coordinateCorrectedRouteCount, 3);
assert.equal(review.retainedCoordinateCount, 7);
assert.equal(review.rejectedSiteCount, 2);
assert.equal(review.unverifiedAccessSiteCount, 2);
assert.equal(review.officialAccessControlAddedCount, 6);
assert.equal(review.routesHeldForAccessVerificationCount, 3);
assert.equal(review.totalWithheldRouteCountAfterBatch, 152);
assert.equal(review.affectedRouteCount, 25);
assert.deepEqual(review.newlyWithheldRouteIds, [
  'black-river-wayside-reese',
  'north-raccoon-river-sac-city-hagge',
  'north-raccoon-river-vogel-riverview',
]);
assert.deepEqual(review.changedPublicRouteGeometryIds, [
  'sauk-river-spring-hill-frogtown',
  'sauk-river-spring-hill-st-martin',
  'sauk-river-oak-township-spring-hill',
]);

for (const site of selection.sites) {
  const decision = review.decisions.find((item) => item.rank === site.rank);
  assert.ok(decision, `missing decision for rank ${site.rank}`);
  assert.equal(decision.site, site.name);
  assert.deepEqual(decision.originalCoordinate, [site.latitude, site.longitude]);
  assert.deepEqual(
    [...decision.occurrences].sort((a, b) => a.routeId.localeCompare(b.routeId)),
    [...site.occurrences].sort((a, b) => a.routeId.localeCompare(b.routeId)),
  );
  assert.ok(decision.sourceUrls.length > 0, `no source URL for rank ${site.rank}`);
}

const sourceById = new Map(metadata.snapshots.map((item) => [item.id, item]));
for (const source of metadata.snapshots) {
  if (source.acceptedAsEvidence) {
    assert.equal(source.httpStatus, 200, `${source.id} is not a successful response`);
    assert.ok(source.sha256, `missing source hash ${source.id}`);
    const bytes = await readFile(path.resolve(root, source.localPath));
    assert.equal(digest(bytes), source.sha256, `source hash mismatch ${source.id}`);
  } else {
    assert.equal(source.sha256, null, `${source.id} failed but has a hash`);
    assert.equal(source.localPath, null, `${source.id} failed but has a local evidence path`);
  }
}
for (const [file, record] of Object.entries(backups.files)) {
  const bytes = await readFile(path.resolve(root, record.backupPath));
  assert.equal(digest(bytes), record.sha256, `backup hash mismatch ${file}`);
}
const controlBackup = backups.files['src/data/route-access-official-map-controls.json'];
assert.equal(snapshot.files[0].sha256, controlBackup.sha256);

const controls = await readJson('src/data/route-access-official-map-controls.json');
const controlsBefore = JSON.parse(await readFile(path.resolve(root, backups.files['src/data/route-access-official-map-controls.json'].backupPath), 'utf8'));
const addedControlIds = new Set(additions.providers.map((provider) => provider.id));
assert.deepEqual(
  controls.providers.filter((provider) => !addedControlIds.has(provider.id)),
  controlsBefore.providers,
  'existing official controls changed outside this batch',
);
for (const addition of additions.providers) {
  const provider = controls.providers.find((item) => item.id === addition.id);
  const source = sourceById.get(addition.sourceId);
  assert.ok(provider, `missing control ${addition.id}`);
  assert.ok(source?.acceptedAsEvidence, `missing accepted source ${addition.sourceId}`);
  assert.equal(provider.sourceUrl, source.url, `${addition.id} source URL mismatch`);
  assert.equal(provider.sourceSha256, source.sha256, `${addition.id} source hash mismatch`);
  assert.equal(provider.coordinateRole, 'authoritative-access-anchor');
}
const ny = controls.providers.find((item) => item.id === 'cedar_river_pelon_outer_gooley');
const md = controls.providers.find((item) => item.id === 'md_gunpowder_monkton_phoenix');
assert.ok(ny && md, 'existing NY and Maryland controls missing');
assert.equal(ny.coordinateRole, 'authoritative-water-entry');
assert.equal(md.coordinateRole, 'authoritative-access-anchor');

const routes = await readFile(path.join(root, 'src/data/routes/minnesota.ts'), 'utf8');
const details = await readFile(path.join(root, 'src/data/trip-details/minnesota.ts'), 'utf8');
const routesBefore = await readFile(path.resolve(root, backups.files['src/data/routes/minnesota.ts'].backupPath), 'utf8');
const detailsBefore = await readFile(path.resolve(root, backups.files['src/data/trip-details/minnesota.ts'].backupPath), 'utf8');
const newLat = '45.529866726150793';
const newLon = '-94.775652824582878';
assert.equal(
  routes,
  routesBefore.replaceAll('45.529026', newLat).replaceAll('-94.776531', newLon),
  'route data contains edits beyond the reviewed Spring Hill coordinate propagation',
);
assert.equal(
  details,
  detailsBefore
    .replaceAll('45.529026', newLat)
    .replaceAll('-94.776531', newLon)
    .replaceAll(
      '"name": "Spring Hill County Park carry-in access"',
      '"name": "Spring Hill County Park carry-in access (RM 56.1, right bank)"',
    ),
  'trip details contain edits beyond the reviewed coordinate and bank-label propagation',
);
assert.equal((routes.match(new RegExp(newLat, 'g')) ?? []).length, 2);
assert.equal((routes.match(new RegExp(newLon, 'g')) ?? []).length, 2);
assert.equal((details.match(new RegExp(newLat, 'g')) ?? []).length, 4);
assert.equal((details.match(new RegExp(newLon, 'g')) ?? []).length, 4);
assert.equal((details.match(/Spring Hill County Park carry-in access \(RM 56\.1, right bank\)/g) ?? []).length, 4);
assert.ok(!routes.includes('45.529026') && !routes.includes('-94.776531'), 'old coordinate remains in Minnesota route data');
assert.ok(!details.includes('45.529026') && !details.includes('-94.776531'), 'old coordinate remains in Minnesota trip details');
assert.ok(routes.includes('sauk-river-spring-hill-frogtown'));
assert.ok(details.includes('OBJECTID-2500-WAS00338') || controls.providers.some((item) => item.id === 'mn_dnr_sauk_spring_hill_was00338'));

const holds = await readFile(path.join(root, 'src/data/route-access-review-holds.ts'), 'utf8');
for (const routeId of review.newlyWithheldRouteIds) assert.ok(holds.includes(routeId), `missing hold ${routeId}`);
const manifestSource = await readFile(path.join(root, 'src/data/generated/withheld-route-slugs.ts'), 'utf8');
const manifestMatch = manifestSource.match(/coordinateWithheldRouteSlugs = (\[[\s\S]*?\]) as const;/);
assert.ok(manifestMatch, 'withheld slug array missing');
const manifest = JSON.parse(manifestMatch[1]);
assert.equal(manifest.length, 152);
assert.equal(new Set(manifest).size, 152);
assert.deepEqual(manifest, [...manifest].sort());
for (const routeId of review.newlyWithheldRouteIds) assert.ok(manifest.includes(routeId));
for (const decision of review.decisions.filter((item) => item.rank !== 186 && item.rank !== 190)) {
  for (const routeId of decision.publicRoutes) assert.ok(!manifest.includes(routeId), `unexpectedly withheld public site route ${routeId}`);
}

for (const file of ['src/data/routes/minnesota.ts', 'src/data/trip-details/minnesota.ts', 'src/data/route-access-review-holds.ts']) {
  const source = await readFile(path.join(root, file), 'utf8');
  const output = ts.transpileModule(source, {
    fileName: file,
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  const errors = (output.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, `${file} has TypeScript syntax diagnostics`);
}
console.log('Batch 16 verification passed: frozen ten; seven coordinates retained; one official coordinate correction propagated to every route/trip-detail copy; two sites rejected as unverified; six hashed official controls added; three route holds; 152 withheld slugs; source and backup hashes verified; TypeScript syntax valid.');
