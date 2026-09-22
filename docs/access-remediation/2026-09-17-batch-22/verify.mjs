import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const selection = await readJson('docs/access-remediation/2026-09-17-batch-22/selection.json');
const controls = await readJson('src/data/route-access-official-map-controls.json');
const registry = await readJson('src/data/generated/route-access-registry.json');
const manifest = await readFile('src/data/generated/withheld-route-slugs.ts', 'utf8');
const holds = await readFile('src/data/route-access-review-holds.ts', 'utf8');
const review = await readJson('docs/access-remediation/2026-09-17-batch-22/review.json');
const expectedRanks = [247, 248, 249, 250, 252, 253, 254, 255, 256, 257];
const expectedRoutes = [
  'nissequogue-river-paul-given-state-park',
  'guadalupe-river-state-park-nichols-landing',
  'boise-river-troutdale-willow',
  'big-sioux-river-highway-42-grandview',
  'big-sioux-river-rec-area-south-highway-42',
  'snake-river-murtaugh-bridge-twin-falls',
  'teton-river-dam-site-teton-forks',
  'bitterroot-river-bell-crossing-chief-looking-glass',
  'bitterroot-river-hannon-chief-looking-glass',
  'bitterroot-river-poker-joe-chief-looking-glass',
  'shell-rock-river-heery-woods-renning',
  'portneuf-river-lava-hot-springs-pvc',
  'manasquan-river-hospital-brice',
];
const routeIds = [...new Set(selection.sites.flatMap((site) => site.eligibleUnwithheldRoutes))];
assert.equal(selection.sites.length, 10, 'batch must contain ten physical sites');
assert.deepEqual(selection.sites.map((site) => site.rank), expectedRanks);
assert.deepEqual([...routeIds].sort(), [...expectedRoutes].sort(), 'frozen route set changed');
assert.equal(controls.providers.length, 560);
for (const id of [
  'tx_guadalupe_state_park_paddling_access_anchor',
  'id_willow_creek_campground_access_anchor',
  'sd_mary_jo_wegner_hwy42_access_anchor',
  'id_twin_falls_park_boat_ramp_access_anchor',
  'mt_chief_looking_glass_fas_access_anchor',
]) assert(controls.providers.some((provider) => provider.id === id), `missing official access control: ${id}`);
const sunken = controls.providers.find((provider) => provider.id === 'nissequogue_river_paul_given_state_park');
assert.equal(sunken?.coordinateRole, 'authoritative-access-anchor');
for (const id of [
  'teton-river-dam-site-teton-forks',
  'shell-rock-river-heery-woods-renning',
  'portneuf-river-lava-hot-springs-pvc',
]) {
  assert(holds.includes(`'${id}'`) || holds.includes(`"${id}"`), `missing review hold: ${id}`);
  assert(manifest.includes(`"${id}"`), `held route missing from generated withholding manifest: ${id}`);
}
assert.equal(review.sitesReviewed, 10);
assert.equal(review.uniqueRoutesBefore, 13);
assert.equal(review.coordinateSitesCorrected, 0);
assert.equal(review.withheldRoutesBefore, 166);
assert.equal(review.withheldRoutesAfter, 169);
assert.equal(registry.summary.entryCount, 4043);
assert.equal(registry.summary.conflictCount, 0);
assert.equal(registry.auditGeneratedAt, selection.audit.generatedAt, 'registry must identify its cache-only audit input');
assert(review.decisions.every((decision) => decision.routes.every((routeId) => routeIds.includes(routeId))));
console.log(`Batch 22 verified: ${selection.sites.length} physical sites, ${routeIds.length} routes, 3 documented holds, 5 new controls, and no coordinate moves recorded for this batch.`);
