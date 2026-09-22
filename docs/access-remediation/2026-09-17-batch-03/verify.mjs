import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const batchDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(batchDir, '../../..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const routeFile = read('src/data/routes/new-york.ts');
const controls = JSON.parse(read('src/data/route-access-official-map-controls.json'));
const holds = read('src/data/route-access-review-holds.ts');
const withheld = read('src/data/generated/withheld-route-slugs.ts');
const maryland = read('src/data/routes/maryland.ts');
const corridors = read('src/data/route-corridors.ts');
const byId = (id) => {
  const provider = controls.providers.find((candidate) => candidate.id === id);
  assert.ok(provider, `missing provider ${id}`);
  return provider;
};
const routeBlock = (routeId) => {
  const start = routeFile.indexOf(`id: '${routeId}'`);
  assert.notEqual(start, -1, `missing route ${routeId}`);
  const end = routeFile.indexOf('\n  }),', start);
  assert.notEqual(end, -1, `missing route end for ${routeId}`);
  return routeFile.slice(start, end);
};

const sidneyRoute = routeBlock('unadilla-river-rockdale-sidney');
assert.match(sidneyRoute, /latitude: 42\.315483/);
assert.match(sidneyRoute, /longitude: -75\.414102/);
assert.match(sidneyRoute, /takeOut: \{ name: 'NYSDEC Sidney Susquehanna River hand launch'/);
assert.doesNotMatch(sidneyRoute, /42\.313|Sidney Susquehanna confluence access/);
const sidney = byId('nysdec_unadilla_rockdale_sidney').controls.find(
  (candidate) => candidate.featureId === 'sidney-unadilla-susquehanna-confluence-access');
assert.deepEqual([sidney.latitude, sidney.longitude], [42.315483, -75.414102]);
assert.equal(byId('nysdec_unadilla_rockdale_sidney').coordinateRole, 'authoritative-access-anchor');

for (const routeId of [
  'beaver-kill-cooks-falls-peakville',
  'cohocton-river-bath-campbell',
  'salmon-river-route-2a-black-hole',
]) {
  assert.ok(holds.includes(`'${routeId}'`), `missing review hold ${routeId}`);
  assert.ok(withheld.includes(routeId), `route not generated into withholding list: ${routeId}`);
}
assert.ok(!maryland.includes("id: 'gunpowder-big-falls-road'"));
assert.ok(!byId('md_gunpowder_masemore_monkton').controls.some(
  (candidate) => candidate.featureId === 'gunpowder-big-falls-road'));
assert.ok(!corridors.includes("toId: 'gunpowder-big-falls-road'"));
assert.ok(!byId('beaver_kill_cooks_falls_peakville').controls.some(
  (candidate) => candidate.featureId === 'peakville-bridge-beaver-kill-access'));
assert.ok(!byId('cohocton_river_bath_campbell').controls.some(
  (candidate) => candidate.featureId === 'cohocton-river-bath-campbell-take-out'));

assert.equal(byId('pa_laurel_hill_state_park_beach_area_anchor').coordinateRole,
  'authoritative-access-anchor');
assert.equal(byId('hudson_river_newcomb_indian_confluence').coordinateRole,
  'authoritative-access-anchor');
assert.equal(byId('raquette_river_dead_creek_jamestown').coordinateRole,
  'authoritative-access-anchor');
assert.equal(byId('ny_raquette_river_piercefield_parmenter_access').coordinateRole,
  'authoritative-access-anchor');
assert.equal(byId('saranac_river_second_pond_lake_flower').coordinateRole,
  'authoritative-water-entry');
assert.equal(byId('esopus_creek_mount_marion_saugerties').coordinateRole,
  'authoritative-water-entry');

const sourceMetadata = JSON.parse(read('docs/access-remediation/2026-09-17-batch-03/source-metadata.json'));
const review = JSON.parse(read('docs/access-remediation/2026-09-17-batch-03/review.json'));
const sourceIds = new Set(sourceMetadata.retrievals.map((source) => source.id));
for (const site of review.sites) {
  for (const sourceId of site.sourceIds) assert.ok(sourceIds.has(sourceId), `unknown source id ${sourceId}`);
}
for (const source of sourceMetadata.retrievals.filter((item) => item.snapshot && item.sha256)) {
  const file = path.join(root, source.snapshot);
  const actual = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  assert.equal(actual, source.sha256, `source snapshot hash mismatch: ${source.id}`);
}
const beforeHashes = JSON.parse(read('docs/access-remediation/2026-09-17-batch-03/before-file-hashes.json'));
assert.equal(new Set(beforeHashes.files.map((file) => file.path)).size, beforeHashes.files.length,
  'duplicate before-file hash entries');
for (const entry of beforeHashes.files) {
  const file = path.resolve(root, entry.backup);
  const actual = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  assert.equal(actual.toLowerCase(), entry.sha256.toLowerCase(), `before-file backup hash mismatch: ${entry.path}`);
}

console.log('Batch 03 checks passed: route decisions, evidence IDs/hashes, and source backups.');
