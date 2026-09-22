import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = new URL('../../..', import.meta.url);
const read = async (relative) => readFile(new URL(relative, root), 'utf8');
const hash = async (relative) => createHash('sha256').update(await readFile(new URL(relative, root))).digest('hex').toUpperCase();
const selection = JSON.parse(await read('docs/access-remediation/2026-09-17-batch-06/selection.json'));
const review = JSON.parse(await read('docs/access-remediation/2026-09-17-batch-06/review.json'));
const metadata = JSON.parse(await read('docs/access-remediation/2026-09-17-batch-06/source-metadata.json'));
const controls = JSON.parse(await read('src/data/route-access-official-map-controls.json'));
const manifestText = await read('src/data/generated/withheld-route-slugs.ts');
const manifestMatch = manifestText.match(/= (\[[\s\S]*?\]) as const/);
assert.ok(manifestMatch, 'generated withheld-route manifest is parseable');
const withheld = new Set(JSON.parse(manifestMatch[1]));
const holds = await read('src/data/route-access-review-holds.ts');

const batchIds = [
  'pocomoke-river-mattaponi-milburn', 'pocomoke-river-shad-milburn',
  'south-fork-owyhee-yp-east-fork',
  'bayou-teche-arnaudville-parks', 'bayou-teche-breaux-bridge-parks', 'bayou-teche-leonville-parks',
  'bayou-teche-parks-loreauville', 'bayou-teche-parks-new-iberia', 'bayou-teche-parks-st-martinville',
  'woonasquatucket-river-cricket-manton', 'woonasquatucket-river-cricket-riverside', 'woonasquatucket-river-cricket-south-water',
  'woonasquatucket-river-cricket-waterplace', 'woonasquatucket-river-esmond-cricket', 'woonasquatucket-river-georgiaville-cricket',
  'woonasquatucket-river-whipple-cricket',
  'south-skunk-river-ames-13th-street', 'south-skunk-river-river-valley-cj-shreck', 'south-skunk-river-sleepy-hollow-river-valley',
  'saco-river-bartlett-cooks-crossing', 'saco-river-cooks-crossing-davis-park', 'saco-river-cooks-crossing-first-bridge',
  'saco-river-cooks-crossing-smith-eastman', 'redbank-creek-new-bethlehem-climax',
  'buffalo-river-erbie-ozark', 'buffalo-river-kyles-landing-ozark', 'buffalo-river-ozark-hasty',
  'buffalo-river-ozark-pruitt', 'buffalo-river-ponca-ozark',
];
assert.equal(selection.sites.length, 10, 'ten frozen sites');
assert.equal(review.decisions.length, 10, 'ten recorded decisions');
assert.equal(review.coordinateCorrectedSiteCount, 5, 'five coordinate corrections documented');
assert.equal(review.uniqueBatchRouteHoldCount, 29, '29 unique route holds documented');
assert.equal(new Set(batchIds).size, 29, 'batch hold list has no duplicate route IDs');
for (const id of batchIds) {
  assert.ok(holds.includes(JSON.stringify(id) + ':'), 'review hold exists for ' + id);
  assert.ok(withheld.has(id), 'generated manifest withholds ' + id);
}
assert.equal(withheld.size, 126, 'manifest has 97 previous routes plus 29 Batch 06 routes');

const editedTypeScript = [
  'src/data/routes/maryland.ts', 'src/data/routes/louisiana-bayou-teche.ts',
  'src/data/routes/rhode-island-woonasquatucket.ts', 'src/data/routes/iowa.ts',
  'src/data/trip-details/iowa.ts', 'src/data/routes/idaho.ts', 'src/data/routes/new-hampshire-saco.ts',
  'src/data/routes/pennsylvania.ts', 'src/data/trip-details/pennsylvania.ts',
  'src/data/routes/arkansas.ts', 'src/data/trip-details/arkansas.ts',
  'src/data/routes/arizona-verde-expansion.ts', 'src/data/route-access-review-holds.ts',
];
const texts = new Map();
for (const file of editedTypeScript) {
  const source = await read(file);
  texts.set(file, source);
  const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  assert.equal(parsed.parseDiagnostics.length, 0, 'TypeScript parses: ' + file);
}
const md = texts.get('src/data/routes/maryland.ts');
assert.equal((md.match(/38\.122164/g) ?? []).length, 6, 'all Milburn coordinate copies updated');
assert.equal((md.match(/-75\.495186/g) ?? []).length, 6, 'all Milburn longitude copies updated');
assert.ok(!md.includes('38.126901') && !md.includes('-75.490733'), 'old Milburn coordinate removed');
assert.ok(texts.get('src/data/routes/louisiana-bayou-teche.ts').includes('30.21355') && texts.get('src/data/routes/louisiana-bayou-teche.ts').includes('-91.8291'), 'Parks coordinate corrected');
assert.ok(texts.get('src/data/routes/rhode-island-woonasquatucket.ts').includes('41.8661') && texts.get('src/data/routes/rhode-island-woonasquatucket.ts').includes('-71.492967'), 'Cricket anchor corrected');
assert.ok(texts.get('src/data/routes/iowa.ts').includes('42.037356') && texts.get('src/data/routes/iowa.ts').includes('42.036895'), 'Ames feature and DNR access separated');
assert.ok(texts.get('src/data/trip-details/iowa.ts').includes('41.917002') && texts.get('src/data/trip-details/iowa.ts').includes('-90.920076'), 'Massillon DNR ramp point corrected');
assert.ok(!texts.get('src/data/routes/idaho.ts').includes('45 Ranch access area'), 'private 45 Ranch not left as an access point');
assert.ok(!texts.get('src/data/routes/new-hampshire-saco.ts').includes('Cooks Crossing access (water-entry edge)'), 'Cooks Crossing no longer overclaims a launch edge');
assert.ok(texts.get('src/data/routes/pennsylvania.ts').includes('municipal parking lot, not a verified kayak-launch edge'), 'New Bethlehem parking and launch distinguished');
assert.ok(texts.get('src/data/trip-details/arkansas.ts').includes('separate river-entry point unresolved'), 'Ozark campground point distinguished from river entry');
assert.ok(texts.get('src/data/routes/arizona-verde-expansion.ts').includes('access-site anchor (launch edge unverified)'), 'Sheep Crossing role is explicit');

const providers = new Map(controls.providers.map((provider) => [provider.id, provider]));
for (const id of ['maryland_dnr_milburn_access_feature_2026', 'iowa_dnr_river_valley_massillon_access_2026', 'teche_parks_cecil_poche_plan_launch', 'exploreri_greystone_mill_pond_access_pin']) {
  assert.ok(providers.has(id), 'source control provider exists: ' + id);
  const provider = providers.get(id);
  const snapshot = metadata.snapshots.find((item) => item.sha256 === provider.sourceSha256);
  assert.ok(snapshot?.acceptedAsEvidence, 'provider points to accepted source snapshot: ' + id);
}
for (const snapshot of metadata.snapshots.filter((item) => item.acceptedAsEvidence)) {
  assert.equal(await hash(snapshot.localPath), snapshot.sha256, 'snapshot hash matches: ' + snapshot.id);
  assert.equal(snapshot.httpStatus, 200, 'successful snapshot has recorded HTTP 200: ' + snapshot.id);
}
console.log('Batch 06 verification passed: 10 sites, 5 coordinate corrections, 29 held routes, 126 total withheld, source hashes, and TypeScript syntax.');
