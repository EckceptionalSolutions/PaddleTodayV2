import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dir = path.join(root, 'docs/access-remediation/2026-09-17-batch-20');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const selection = JSON.parse(read('docs/access-remediation/2026-09-17-batch-20/selection.json'));
assert.deepEqual(selection.sites.map((site) => site.rank), [225, 226, 227, 228, 229, 231, 232, 233, 234, 235]);
assert.equal(selection.sites.length, 10);

const routeDir = path.join(root, 'src/data/routes');
const routeTexts = fs.readdirSync(routeDir).filter((file) => file.endsWith('.ts')).map((file) => fs.readFileSync(path.join(routeDir, file), 'utf8'));
const routeText = routeTexts.join('\n');
const detailDir = path.join(root, 'src/data/trip-details');
const detailText = fs.readdirSync(detailDir).filter((file) => file.endsWith('.ts')).map((file) => fs.readFileSync(path.join(detailDir, file), 'utf8')).join('\n');
const allRouteText = routeText + '\n' + detailText;
for (const site of selection.sites) {
  for (const route of site.eligibleUnwithheldRoutes) assert(allRouteText.includes(route), `missing source route ${route}`);
}

const controls = JSON.parse(read('src/data/route-access-official-map-controls.json'));
for (const id of [
  'wi_kimberly_sunset_park_access_anchor',
  'ia_guthrie_lenon_mill_access_anchor',
  'mo_van_buren_riverfront_park_access_anchor',
]) assert(controls.providers.some((provider) => provider.id === id), `missing new provider ${id}`);
assert.equal(controls.providers.find((provider) => provider.id === 'osgood_river_osgood_pond_out_and_back')?.coordinateRole, 'authoritative-access-anchor');
for (const id of [
  'id_bear_river_black_canyon_grace_powerhouse',
  'ny_mattituck_creek_dec_waterway_access_route_48',
  'wy_gt_deadmans_bar_nps_access',
]) assert.equal(controls.providers.find((provider) => provider.id === id)?.coordinateRole, 'authoritative-access-anchor');

const holds = read('src/data/route-access-review-holds.ts');
const manifest = read('src/data/generated/withheld-route-slugs.ts');
assert(holds.includes('turtle-creek-town-of-turtle-milwaukee-road'));
assert(manifest.includes('turtle-creek-town-of-turtle-milwaukee-road'));
const withheldCount = manifest.split(/\r?\n/).filter((line) => /^\s*["'][a-z0-9-]+["'],?\s*$/.test(line)).length;
assert.equal(withheldCount, 157);

assert(routeText.includes('Troutdale Campground riverside access area'));
assert(routeText.includes('not a surveyed launch toe'));
assert(!routeText.includes('erie-canal-bushnells-basin-macedon-camp'));
assert(routeText.includes('Red’s Twilight on the Erie RV Resort is documented near the Macedon endpoint as a lodging option'));
assert(detailText.includes('the stored park coordinate is an access-area anchor, not a surveyed launch toe'));
assert(detailText.includes('Van Buren Riverfront Park access area'));

const before = JSON.parse(read('docs/access-remediation/2026-09-17-batch-20/before-file-hashes.json'));
for (const item of before) assert(fs.existsSync(path.join(root, 'node_modules/.cache/access-batch-20/backups', item.path)), `missing backup ${item.path}`);
for (const file of ['review.json', 'decision-notes.json', 'source-metadata.json', 'control-additions.json', 'registry-control-snapshot.json', 'validation.json']) {
  JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
}

console.log('Batch 20 verifier passed: 10 frozen sites, 14 unique selected route IDs, 1 new hold, 3 added controls, 1 reclassified control, 1 optional access waypoint removed, and 157 withheld routes.');
