import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const read = (relativePath) => readFileSync(path.join(root, relativePath), 'utf8');
const json = (relativePath) => JSON.parse(read(relativePath));
const selection = json('docs/access-remediation/2026-09-17-batch-18/selection.json');
const review = json('docs/access-remediation/2026-09-17-batch-18/review.json');
const controls = json('src/data/route-access-official-map-controls.json');
const sourceMetadata = json('docs/access-remediation/2026-09-17-batch-18/source-metadata.json');
const beforeHashes = json('docs/access-remediation/2026-09-17-batch-18/before-file-hashes.json');
const heldSource = read('src/data/route-access-review-holds.ts');
const withheld = read('src/data/generated/withheld-route-slugs.ts');
const nc = read('src/data/routes/north-carolina.ts');
const idaho = read('src/data/routes/idaho.ts');
const arkDetails = read('src/data/trip-details/arkansas.ts');

assert.equal(selection.sites.length, 10, 'frozen selection must contain ten sites');
assert.equal(review.decisions.length, 10, 'all selected sites need a decision');
assert.equal(review.coordinateCorrectedSiteCount, 0, 'no coordinate was approved for movement');
assert.equal(review.totalWithheldRouteCountAfterBatch, 154);
assert.equal((withheld.match(/"[^"]+"/g) ?? []).length, 154, 'generated withholding manifest count must match review');
assert.equal(new Set(selection.sites.flatMap((site) => site.eligibleUnwithheldRoutes)).size, review.uniqueAffectedRouteCount);
assert.deepEqual(review.newlyWithheldRouteIds.sort(), [
  'big-wood-river-baker-north-fork',
  'esopus-creek-phoenicia-boiceville',
].sort());
for (const slug of review.newlyWithheldRouteIds) {
  assert.ok(heldSource.includes(`'${slug}'`), `${slug} must have a source hold`);
  assert.ok(withheld.includes(`"${slug}"`), `${slug} must be in generated withholding manifest`);
}
assert.ok(withheld.includes('"black-river-wayside-reese"'), 'unrelated prior hold must remain');

const requiredProviders = [
  'idfg_teton_dam_site_access_anchor',
  'wi_germania_marsh_dam_access_anchor',
  'mt_fwp_bell_crossing_fas',
  'wallkill_gardiner_launch_anchor',
  'tpwd_buffalo_bayou_woodway_access',
  'raleigh_neuse_falls_dam_launch_anchor',
  'turner_bend_private_fee_landing_anchor',
];
for (const id of requiredProviders) {
  const provider = controls.providers.find((entry) => entry.id === id);
  assert.ok(provider, `missing access-anchor provider ${id}`);
  assert.equal(provider.coordinateRole, 'authoritative-access-anchor', `${id} must be an access-area anchor`);
}
const popp = controls.providers.find((entry) => entry.id === 'wallkill_river_popp_gardiner');
assert.equal(popp?.coordinateRole, 'authoritative-access-anchor');
assert.deepEqual(popp?.controls.map((control) => control.featureId), ['popp-park-wallkill-river-launch']);
assert.ok(!controls.providers.some((entry) => entry.id === 'wallkill_river_gardiner_new_paltz'));
const chenango = controls.providers.find((entry) => entry.id === 'chenango_river_port_crane_chenango_bridge');
assert.ok(chenango?.controls.some((control) => control.featureId === 'chenango-bridge-route-12a-launch'));

assert.ok(idaho.includes('Teton Dam access corridor / carry-in'));
assert.ok(idaho.includes('about 0.3 mi north'));
assert.ok(nc.includes("reach: 'Falls Dam public paddlecraft launch to Thornton Road'"));
assert.ok(nc.includes('USACE Tailrace Fishing Area lot'));
assert.ok(arkDetails.includes('Turner Bend private-fee landing (Highway 23 corridor anchor)'));

let verifiedBackupHashes = 0;
for (const item of beforeHashes) {
  const digest = createHash('sha256')
    .update(readFileSync(path.join(root, 'node_modules/.cache/access-batch-18/backups', item.backup)))
    .digest('hex')
    .toUpperCase();
  assert.equal(digest, item.sha256, `backup hash mismatch: ${item.path}`);
  verifiedBackupHashes += 1;
}
let verifiedSourceHashes = 0;
for (const site of sourceMetadata.sources) {
  for (const source of site.sources ?? []) {
    if (!source.localPath || !source.sha256) continue;
    const digest = createHash('sha256')
      .update(readFileSync(path.join(root, source.localPath)))
      .digest('hex')
      .toUpperCase();
    assert.equal(digest, source.sha256, `source hash mismatch: ${source.localPath}`);
    verifiedSourceHashes += 1;
  }
}

console.log(`Batch 18 checks passed: ${review.decisions.length} sites, ${requiredProviders.length} new anchor providers, ${review.newlyWithheldRouteIds.length} new holds, ${verifiedSourceHashes} source hashes, ${verifiedBackupHashes} backup hashes.`);
