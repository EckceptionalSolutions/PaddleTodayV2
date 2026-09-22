import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = new URL('../../..', import.meta.url);
const read = async (relative) => readFile(new URL(relative, root), 'utf8');
const hash = async (relative) => createHash('sha256').update(await readFile(new URL(relative, root))).digest('hex').toUpperCase();
const selection = JSON.parse(await read('docs/access-remediation/2026-09-17-batch-07/selection.json'));
const review = JSON.parse(await read('docs/access-remediation/2026-09-17-batch-07/review.json'));
const metadata = JSON.parse(await read('docs/access-remediation/2026-09-17-batch-07/source-metadata.json'));
const controls = JSON.parse(await read('src/data/route-access-official-map-controls.json'));
const manifestText = await read('src/data/generated/withheld-route-slugs.ts');
const manifestMatch = manifestText.match(/= (\[[\s\S]*?\]) as const/);
assert.ok(manifestMatch, 'generated withheld-route manifest is parseable');
const withheld = new Set(JSON.parse(manifestMatch[1]));
const holds = await read('src/data/route-access-review-holds.ts');

const batchIds = [
  'eleven-point-river-cane-bluff-greer-crossing', 'eleven-point-river-greer-crossing-narrows',
  'eleven-point-river-greer-crossing-riverton', 'eleven-point-river-greer-crossing-turner-mill',
  'eleven-point-river-greer-crossing-turner-mill-south', 'eleven-point-river-greer-crossing-whitten',
  'eleven-point-river-thomasville-greer-crossing', 'eighteenmile-creek-burt-newfane',
];
assert.equal(selection.sites.length, 10, 'ten frozen sites');
assert.equal(review.decisions.length, 10, 'ten recorded decisions');
assert.equal(review.coordinateCorrectedSiteCount, 1, 'one coordinate correction documented');
assert.equal(review.uniqueBatchRouteHoldCount, 8, 'eight unique route holds documented');
assert.equal(new Set(batchIds).size, 8, 'batch hold list has no duplicate route IDs');
for (const id of batchIds) {
  assert.ok(holds.includes(JSON.stringify(id) + ':'), 'review hold exists for ' + id);
  assert.ok(withheld.has(id), 'generated manifest withholds ' + id);
}
assert.equal(withheld.size, 134, 'manifest contains the prior 126 routes plus 8 Batch 07 routes');

const editedTypeScript = [
  'src/data/routes/idaho.ts', 'src/data/routes/iowa.ts', 'src/data/routes/maryland.ts',
  'src/data/routes/missouri.ts', 'src/data/routes/new-york.ts', 'src/data/routes/wisconsin.ts',
  'src/data/trip-details/iowa.ts', 'src/data/trip-details/missouri.ts', 'src/data/trip-details/wisconsin.ts',
  'src/data/route-access-review-holds.ts',
];
const texts = new Map();
for (const file of editedTypeScript) {
  const source = await read(file);
  texts.set(file, source);
  const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  assert.equal(parsed.parseDiagnostics.length, 0, 'TypeScript parses: ' + file);
}
const missouri = texts.get('src/data/routes/missouri.ts');
const missouriDetails = texts.get('src/data/trip-details/missouri.ts');
assert.equal((missouri.match(/"latitude": 36\.793439/g) ?? []).length, 5, 'five route endpoint copies use the corrected Greer latitude');
assert.equal((missouriDetails.match(/"latitude": 36\.793439/g) ?? []).length, 7, 'seven trip-detail copies use the corrected Greer latitude');
assert.ok(!missouri.includes('36.79356389') && !missouri.includes('-91.32854167'), 'old Greer facility coordinate removed from route source');
assert.ok(!missouriDetails.includes('36.79356389') && !missouriDetails.includes('-91.32854167'), 'old Greer facility coordinate removed from trip details');
assert.ok(!texts.get('src/data/routes/idaho.ts').includes('Shotgun Scout / Portage River Left'), 'rapid scout/portage point removed from access list');
assert.ok(missouri.includes('this is an access anchor, not a surveyed ramp edge'), 'Greer route notes identify the map point as an access anchor');
assert.ok(missouriDetails.includes('Greer Crossing river access'), 'Greer trip-detail labels identify the river access');
assert.ok(texts.get('src/data/routes/new-york.ts').includes('Fisherman’s Park fishing access (paddle launch unverified)'), 'Newfane fishing access caveat is explicit');
assert.ok(texts.get('src/data/routes/new-york.ts').includes('Keep this route withheld until the lawful water entry and carry are confirmed'), 'Newfane route explains why it is withheld');
assert.ok(texts.get('src/data/routes/wisconsin.ts').includes('Riverside Park / Urban Ecology Center access area'), 'Milwaukee route uses park-area anchor label');
assert.ok(texts.get('src/data/trip-details/wisconsin.ts').includes('Riverside Park / Urban Ecology Center access area'), 'Milwaukee trip details match park-area anchor label');
const sheboyganStart = texts.get('src/data/routes/wisconsin.ts').indexOf('"id": "sheboygan-river-dassow-river-park"');
assert.ok(sheboyganStart >= 0, 'Sheboygan route exists');
const sheboyganSection = texts.get('src/data/routes/wisconsin.ts').slice(sheboyganStart, sheboyganStart + 11000);
assert.ok(!sheboyganSection.includes('Highway C bridge access'), 'Sheboygan bridge reference is not listed as an access point');

const providers = new Map(controls.providers.map((provider) => [provider.id, provider]));
const greerProvider = providers.get('usfs_eleven_point_greer_crossing_access_map_2026');
assert.ok(greerProvider, 'Greer authoritative map control exists');
assert.equal(greerProvider.controls[0].latitude, 36.79343889, 'Greer control latitude matches source map');
assert.equal(greerProvider.controls[0].longitude, -91.33161667, 'Greer control longitude matches source map');
const controlSnapshot = metadata.snapshots.find((item) => item.sha256 === greerProvider.sourceSha256);
assert.ok(controlSnapshot?.acceptedAsEvidence, 'Greer map control points to accepted evidence snapshot');
assert.equal(metadata.snapshots.filter((item) => item.acceptedAsEvidence).length, 13, '13 successful snapshots retained');
assert.equal(metadata.snapshots.filter((item) => !item.acceptedAsEvidence).length, 2, 'two failed retrievals retained as rejected records');
for (const snapshot of metadata.snapshots.filter((item) => item.acceptedAsEvidence)) {
  assert.equal(await hash(snapshot.localPath), snapshot.sha256, 'snapshot hash matches: ' + snapshot.id);
  assert.equal(snapshot.httpStatus, 200, 'successful snapshot records HTTP 200: ' + snapshot.id);
}
console.log('Batch 07 verification passed: 10 sites, corrected Greer coordinates, 8 held routes, 134 total withheld, evidence hashes, and TypeScript syntax.');
