import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const batchDir = 'docs/access-remediation/2026-09-17-batch-08';
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const readText = (path) => readFileSync(resolve(root, path), 'utf8');
const sha256 = (path) => createHash('sha256').update(readFileSync(resolve(root, path))).digest('hex').toUpperCase();
const fail = (message) => assert.ok(false, message);

const selection = readJson(`${batchDir}/selection.json`);
const review = readJson(`${batchDir}/review.json`);
const sourceMetadata = readJson(`${batchDir}/source-metadata.json`);
const beforeHashes = readJson(`${batchDir}/before-file-hashes.json`);
const controls = readJson('src/data/route-access-official-map-controls.json');
const withheld = readText('src/data/generated/withheld-route-slugs.ts');
const holds = readText('src/data/route-access-review-holds.ts');
const wyoming = readText('src/data/routes/wyoming.ts');
const wisconsin = readText('src/data/routes/wisconsin.ts');
const wisconsinTrip = readText('src/data/trip-details/wisconsin.ts');
const iowa = readText('src/data/routes/iowa.ts');

assert.equal(selection.sites.length, 10, 'selection must retain the frozen ten physical sites');
assert.equal(review.decisions.length, 10, 'review must cover every frozen site');
assert.equal(review.coordinateCorrectedSiteCount, 1);
assert.equal(review.retainedAccessAnchorCount, 6);
assert.equal(review.removedUnsupportedAccessMarkerCount, 1);
assert.equal(review.unverifiedPublicAccessCount, 2);
assert.equal(review.accessRoleClarifiedSiteCount, 1);
assert.equal(review.uniqueBatchRouteHoldCount, 4);

const acceptedSnapshots = sourceMetadata.snapshots.filter((item) => item.acceptedAsEvidence);
assert.equal(sourceMetadata.snapshots.length, 23, 'all attempted source retrievals must be logged');
assert.equal(acceptedSnapshots.length, 20, 'only successful source retrievals count as evidence');
for (const snapshot of acceptedSnapshots) {
  assert.ok(snapshot.sha256, `${snapshot.id}: accepted snapshot needs a digest`);
  assert.equal(statSync(resolve(root, snapshot.localPath)).size, snapshot.bytes, `${snapshot.id}: byte count`);
  assert.equal(sha256(snapshot.localPath), snapshot.sha256, `${snapshot.id}: source hash`);
}
assert.equal(sourceMetadata.snapshots.filter((item) => !item.acceptedAsEvidence).length, 3);

for (const entry of beforeHashes.files) {
  assert.equal(statSync(resolve(root, entry.backupPath)).size, entry.bytes, `${entry.path}: preserved backup size`);
  assert.equal(sha256(entry.backupPath), entry.sha256, `${entry.path}: preserved original hash`);
}
assert.ok(beforeHashes.files.some((entry) => entry.path === 'src/data/routes/iowa.ts'), 'Iowa source must have been backed up before editing');

const fontenelle = controls.providers.find((entry) => entry.id === 'wy_blm_fontenelle_reservoir_launch');
assert.ok(fontenelle, 'Fontenelle manager control must remain present');
assert.equal(fontenelle.controls[0].featureId, 'BLM National Recreation Boat Ramp OBJECTID 83549');
assert.equal(fontenelle.controls[0].latitude, 42.07868016);
assert.equal(fontenelle.controls[0].longitude, -110.15335551);
assert.equal(fontenelle.sourceSha256, '8A253D51B6D7E308E9176FF32DDEF2ECE95B937061AE0713F6C2DE1760685A10');
assert.equal((wyoming.match(/42\.07868016/g) ?? []).length, 4, 'all four Fontenelle latitude copies must be corrected');
assert.equal((wyoming.match(/-110\.15335551/g) ?? []).length, 4, 'all four Fontenelle longitude copies must be corrected');
assert.ok(!/42\.0722577|-110\.1537967/.test(wyoming), 'old Fontenelle facility pin must be absent');

assert.ok(!wisconsin.includes('Highway 31 / Ole Davidson Road Root River access'), 'unsupported Ole Davidson access marker must be removed from route access data');
assert.ok(!wisconsinTrip.includes('Highway 31 / Ole Davidson Road Root River access'), 'unsupported Ole Davidson marker must be removed from trip-detail access data');
assert.match(wisconsin, /not an officially designated landing/, 'route hazard warning must remain');
assert.match(wisconsinTrip, /Middle accesses around Highway 31 or Armstrong Park should be treated as bailouts only after confirming legal parking/, 'trip-detail access caution must remain');

const carmans = controls.providers.find((entry) => entry.id === 'carmans_river_montauk_beaverdam');
assert.equal(carmans?.controls[0].featureId, 'carmans-river-montauk-dec-hand-launch');
assert.equal(carmans.coordinateRole, 'authoritative-access-anchor');
assert.match(carmans.method, /300-yard carry/);

const requiredHolds = [
  'fontenelle-reservoir-creek-recreation-area-loop',
  'wappinger-creek-cady-greenvale',
  'cape-fear-river-raven-rock-lillington',
  'cedar-river-otranto-acorn',
];
for (const routeId of requiredHolds) {
  assert.ok(holds.includes(`"${routeId}"`), `${routeId}: hold entry missing`);
  assert.ok(withheld.includes(`"${routeId}"`), `${routeId}: generated withheld manifest entry missing`);
}
const withheldIds = [...withheld.matchAll(/^\s*"([^"]+)",?\s*$/gm)].map((match) => match[1]);
assert.equal(withheldIds.length, 138, 'generated withholding list must contain 138 unique routes');
assert.equal(new Set(withheldIds).size, withheldIds.length, 'generated withholding list must not contain duplicate slugs');

assert.match(iowa, /Otranto Park is reported closed for season 2026 for renovations/);
assert.match(iowa, /WITHHELD: Mitchell County Conservation Board reports Otranto Park closed/);
assert.match(review.decisions.find((decision) => decision.rank === 109).reason, /above the dam and cannot substitute/);

for (const path of [
  'src/data/routes/wyoming.ts',
  'src/data/routes/wisconsin.ts',
  'src/data/trip-details/wisconsin.ts',
  'src/data/routes/new-york.ts',
  'src/data/routes/north-carolina.ts',
  'src/data/routes/iowa.ts',
  'src/data/route-access-review-holds.ts',
]) {
  const source = readText(path);
  const result = ts.transpileModule(source, {
    fileName: path,
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  const errors = (result.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, `${path}: TypeScript parse/transpile diagnostics: ${errors.map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('; ')}`);
}

console.log('Batch 08 verification passed: ten frozen sites, 20 accepted source snapshots with matching hashes, backed-up edits, corrected Fontenelle ramp coordinates, removed unsupported Ole Davidson marker, clarified Carmans anchor, four held routes, 138 total withheld, and TypeScript syntax.');
