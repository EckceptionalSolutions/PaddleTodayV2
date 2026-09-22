import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const dir=path.join(root,'docs/access-remediation/2026-09-17-batch-21');
const read=(f)=>fs.readFileSync(path.join(root,f),'utf8');
const selection=JSON.parse(read('docs/access-remediation/2026-09-17-batch-21/selection.json'));
assert.deepEqual(selection.sites.map(s=>s.rank),[236,237,238,239,240,241,242,243,244,246]);
assert.equal(selection.sites.length,10);
const routeIds=[...new Set(selection.sites.flatMap(s=>s.eligibleUnwithheldRoutes))];
assert.equal(routeIds.length,20);
const controls=JSON.parse(read('src/data/route-access-official-map-controls.json'));
assert(controls.providers.length>=582,'official access controls should include all providers in the repaired workspace');
for(const id of ['wa_mirabeau_small_craft_access_anchor','nd_chautauqua_park_access_anchor','mn_oak_township_county_park_access_anchor','wi_rochester_park_site_center_anchor','mt_marco_flats_fas_access_anchor','ny_cameron_mills_cr110_access_anchor','wi_trego_town_park_landing_anchor','tx_heath_canyon_access_anchor','id_three_forks_blm_boat_launch_anchor','tx_riverdale_lane_access_anchor']) assert(controls.providers.some(p=>p.id===id),'missing provider '+id);
const registry=JSON.parse(read('src/data/generated/route-access-registry.json'));
assert.equal(registry.summary.entryCount,registry.entries.length);
for(const [name,latitude,longitude] of [['Marco Flats Fishing Access Site (official access-area anchor)',46.88969,-113.82973],['Cameron Mills County Route 110 public boat-launch area',42.178617,-77.363567],['Rochester Park access-area anchor (launch path unverified)',43.72573,-87.803695]]) {
  const entry=registry.entries.find(e=>e.name===name); assert(entry,'missing generated registry entry '+name);
  assert(Math.abs(entry.accessCoordinate.latitude-latitude)<1e-8&&Math.abs(entry.accessCoordinate.longitude-longitude)<1e-8,'registry coordinate mismatch '+name);
}
const holds=read('src/data/route-access-review-holds.ts');
const manifest=read('src/data/generated/withheld-route-slugs.ts');
const held=['sheboygan-river-rochester-esslingen'];
for(const id of held) { assert(holds.includes(id),'missing source hold '+id); assert(manifest.includes(id),'missing generated hold '+id); }
const releasedMarco=['blackfoot-river-angevine-marco-flats','blackfoot-river-k-ross-toole-marco-flats','blackfoot-river-marco-flats-johnsrud','blackfoot-river-marco-flats-weigh-station','blackfoot-river-roundup-marco-flats','blackfoot-river-russell-gates-marco-flats','blackfoot-river-scotty-brown-marco-flats','blackfoot-river-whitaker-marco-flats'];
for(const id of releasedMarco) { assert(!holds.includes(id),'released Marco route still has a source hold '+id); assert(!manifest.includes(id),'released Marco route remains in generated withholding '+id); }
const count=manifest.split(/\r?\n/).filter(line=>/^\s*["'][a-z0-9-]+["'],?\s*$/.test(line)).length;
assert(count>=185,'generated withholding should retain the Batch 21 Rochester hold and its follow-up reviews');
const montana=read('src/data/routes/montana-blackfoot.ts'); assert(!montana.includes('46.89104')&&!montana.includes('-113.82732')); assert(montana.includes('46.88969')&&montana.includes('-113.82973'));
const ny=read('src/data/routes/new-york.ts'); assert(ny.includes('42.178617, longitude: -77.363567'));
const wi=read('src/data/routes/wisconsin.ts'); assert(wi.includes('43.72573')&&wi.includes('-87.803695')); assert(!wi.includes('43.7266')&&!wi.includes('-87.8166'));
for(const file of ['review.json','decision-notes.json','source-metadata.json','control-additions.json','registry-control-snapshot.json','validation.json']) JSON.parse(fs.readFileSync(path.join(dir,file),'utf8'));
const before=JSON.parse(read('docs/access-remediation/2026-09-17-batch-21/before-file-hashes.json'));
for(const item of before.filter(x=>!x.path.startsWith('src/data/generated/'))) assert(fs.existsSync(path.join(root,'node_modules/.cache/access-batch-21/backups',item.path),'missing backup '+item.path));
console.log(`Batch 21 verifier passed: 10 sites, 20 unique routes, 3 coordinate-site corrections, 10 new access anchors, 8 Marco route releases, Rochester remains held, ${count} total withheld route slugs, and generated registry coordinates.`);
