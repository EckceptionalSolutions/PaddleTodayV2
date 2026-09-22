import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { readFile, stat } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = new URL('../../..', import.meta.url);
const read = async (relative) => readFile(new URL(relative, root), 'utf8');
const hash = async (relative) => createHash('sha256').update(await readFile(new URL(relative, root))).digest('hex').toUpperCase();
const selection = JSON.parse(await read('docs/access-remediation/2026-09-17-batch-05/selection.json'));
const review = JSON.parse(await read('docs/access-remediation/2026-09-17-batch-05/review.json'));
const metadata = JSON.parse(await read('docs/access-remediation/2026-09-17-batch-05/source-metadata.json'));
const controls = JSON.parse(await read('src/data/route-access-official-map-controls.json'));
const dnr = JSON.parse(await read('node_modules/.cache/access-batch-05/sources/ia-dnr-wilkinson-middle-raccoon.json'));
const steelOsm = JSON.parse(await read('node_modules/.cache/access-batch-05/sources/osm-steel-slipway.json'));
const rigginsOsm = JSON.parse(await read('node_modules/.cache/access-batch-05/sources/osm-riggins-slipway.json'));
const manifestText = await read('src/data/generated/withheld-route-slugs.ts');
const manifestArray = manifestText.match(/= (\[[\s\S]*?\]) as const/);
assert.ok(manifestArray, 'generated withheld-route manifest is parseable');
const withheld = new Set(JSON.parse(manifestArray[1]));
const holds = await read('src/data/route-access-review-holds.ts');
const routesAr = await read('src/data/routes/arkansas.ts');
const detailsAr = await read('src/data/trip-details/arkansas.ts');
const routesId = await read('src/data/routes/idaho.ts');
const detailsIa = await read('src/data/trip-details/iowa.ts');
const routesIa = await read('src/data/routes/iowa.ts');
const routesWy = await read('src/data/routes/wyoming.ts');
const routesSc = await read('src/data/routes/south-carolina-edisto-main.ts');
const editedTypeScript = [
  'src/data/routes/arkansas.ts',
  'src/data/trip-details/arkansas.ts',
  'src/data/routes/idaho.ts',
  'src/data/routes/iowa.ts',
  'src/data/trip-details/iowa.ts',
  'src/data/routes/south-carolina-edisto-main.ts',
  'src/data/routes/wyoming.ts',
  'src/data/route-access-review-holds.ts',
];
const batchIds = [
  'buffalo-river-ponca-pruitt',
  'buffalo-river-ponca-steel-creek',
  'buffalo-river-steel-creek-erbie',
  'buffalo-river-steel-creek-hasty',
  'buffalo-river-steel-creek-kyles-landing',
  'buffalo-river-steel-creek-ozark',
  'buffalo-river-steel-creek-pruitt',
  'little-salmon-hazard-creek-riggins',
  'shell-rock-river-strand-wilkinson',
  'middle-raccoon-river-p28-cowles',
  'lewis-lake-shoshone-channel-wilderness-paddle',
  'edisto-river-givhans-good-hope',
  'edisto-river-givhans-messervy',
  'edisto-river-mars-oldfield-givhans',
  'big-bear-creek-highway-8-kendrick',
];

assert.equal(selection.sites.length, 10, 'ten frozen physical sites');
assert.equal(review.decisions.length, 10, 'ten site decisions recorded');
assert.equal(review.coordinateCorrectedSiteCount, 4, 'four coordinate corrections documented');
assert.equal(review.uniqueBatchRouteHoldCount, 15, 'fifteen unique held routes documented');
for (const sourcePath of editedTypeScript) {
  const source = await read(sourcePath);
  const parsed = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true);
  assert.equal(parsed.parseDiagnostics.length, 0, 'TypeScript parses: ' + sourcePath);
}
for (const routeId of batchIds) {
  assert.ok(holds.includes(JSON.stringify(routeId) + ':'), 'hold recorded for ' + routeId);
  assert.ok(withheld.has(routeId), 'generated manifest withholds ' + routeId);
}
assert.equal(withheld.size, 97, 'generated withholding manifest includes prior 82 plus 15 Batch 05 routes');

assert.equal((routesAr.match(/36\.039309/g) ?? []).length, 11, 'all Steel Creek route-source coordinate copies updated');
assert.equal((routesAr.match(/-93\.336228/g) ?? []).length, 11, 'all Steel Creek route-source longitude copies updated');
assert.equal((detailsAr.match(/36\.039309/g) ?? []).length, 7, 'all Steel Creek trip-detail latitude copies updated');
assert.equal((detailsAr.match(/-93\.336228/g) ?? []).length, 7, 'all Steel Creek trip-detail longitude copies updated');
assert.ok(!routesAr.includes('36.040776') && !detailsAr.includes('36.040776'), 'old Steel Creek coordinate removed');
assert.equal((routesId.match(/45\.425561/g) ?? []).length, 2, 'Riggins route endpoint and access point updated');
assert.equal((routesId.match(/-116\.311552/g) ?? []).length, 2, 'Riggins route endpoint and access longitude updated');
assert.equal((detailsIa.match(/43\.20224243635123/g) ?? []).length, 2, 'Wilkinson endpoint and access point updated');
assert.equal((detailsIa.match(/-93\.07858426136887/g) ?? []).length, 2, 'Wilkinson access longitude copies updated');
assert.ok(detailsIa.includes('41.64828800521774') && detailsIa.includes('-94.32664543275781'), 'Middle Raccoon feature coordinate updated');
assert.ok(routesIa.includes('OBJECTID 896') && routesIa.includes('75 ft from parking to access'), 'Wilkinson DNR feature provenance is in route evidence');

const steelFeature = steelOsm.elements.find((feature) => feature.type === 'node');
const rigginsFeature = rigginsOsm.elements.find((feature) => feature.type === 'node');
assert.equal(steelFeature.id, 12544125462, 'Steel Creek OSM feature ID');
assert.equal(steelFeature.lat, 36.0393089, 'Steel Creek OSM latitude');
assert.equal(steelFeature.lon, -93.3362282, 'Steel Creek OSM longitude');
assert.equal(rigginsFeature.id, 7560987269, 'Riggins OSM feature ID');
assert.equal(rigginsFeature.lat, 45.425561, 'Riggins OSM latitude');
assert.equal(rigginsFeature.lon, -116.311552, 'Riggins OSM longitude');
const dnrFeatures = new Map(dnr.features.map((feature) => [feature.attributes.OBJECTID, feature]));
assert.equal(dnrFeatures.get(896).attributes.GlobalID, '5a010dab-cd81-48be-af79-ad07c89abff7');
assert.equal(dnrFeatures.get(805).attributes.GlobalID, 'b2b6566e-9cd3-43a3-8a75-f45f201c03c2');
assert.equal(dnrFeatures.get(896).attributes.Parking_to_Access, 75);
assert.equal(dnrFeatures.get(805).attributes.Parking_to_Access, 10);
for (const id of ['wgfd_lusby_public_access_page_2026', 'iowa_dnr_shellrock_access_features_2026']) {
  assert.ok(controls.providers.some((provider) => provider.id === id), 'control provider exists: ' + id);
}
const iowaProvider = controls.providers.find((item) => item.id === 'iowa_dnr_shellrock_access_features_2026');
assert.equal(iowaProvider.sourceSha256, metadata.hashes.iowaDnrFeatures, 'DNR controls cite the hashed feature snapshot');
const wgfdProvider = controls.providers.find((item) => item.id === 'wgfd_lusby_public_access_page_2026');
assert.equal(wgfdProvider.sourceSha256, metadata.hashes.wgfdLusby, 'WGFD control cites the hashed page snapshot');
assert.equal(await hash('node_modules/.cache/access-batch-05/sources/osm-steel-slipway.json'), metadata.hashes.osmSteelSlipway);
assert.equal(await hash('node_modules/.cache/access-batch-05/sources/osm-riggins-slipway.json'), metadata.hashes.osmRigginsSlipway);
assert.equal(await hash('node_modules/.cache/access-batch-05/sources/wgfd-lusby.html'), metadata.hashes.wgfdLusby);
const downloads = JSON.parse(await read('node_modules/.cache/access-batch-05/sources/download-log.json'));
const dnrLog = downloads.find((entry) => entry.id === 'ia-dnr-wilkinson-middle-raccoon');
assert.equal(dnrLog.contentType, 'application/json; charset=utf-8', 'valid DNR JSON retrieval distinguished from rejected HTML response');
assert.ok(downloads.some((entry) => entry.id === 'ia-dnr-malformed-query-rejected' && entry.error), 'malformed DNR response retained as rejected retrieval');

assert.ok(!routesWy.includes('Lewis River Channel northern shallow section'), 'false Lewis access marker removed');
assert.ok(routesWy.includes('wading/lining') && routesWy.includes('shallow and rocky'), 'Lewis wade/line safety warnings retained');
assert.ok(routesSc.includes('drop-off/access area (launch unverified)'), 'Givhans anchor is no longer described as a ramp');
assert.ok(routesSc.includes('do not rely on Givhans as an intermediate bailout'), 'independent Edisto routes no longer promise Givhans bailout');
assert.ok(routesId.includes('navigation anchor, not proof of a public ramp'), 'Kendrick uncertainty note retained');
assert.equal(await hash('node_modules/.cache/access-batch-05/before-source/src__data__routes__arkansas.ts'), '4DA156310C5385C4FE5CABB6DFB0EE71186DADF5C1CD1E87DF5B70A1620E4E60', 'immutable route backup hash');
const verifierStat = await stat(new URL('docs/access-remediation/2026-09-17-batch-05/selection.json', root));
assert.ok(verifierStat.size > 1000, 'frozen batch selection remains present');
console.log('Batch 05 verification passed: 10 sites, 4 coordinate fixes, 15 held routes, preserved anchors and source hashes.');
