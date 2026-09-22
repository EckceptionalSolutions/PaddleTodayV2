import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const layer=JSON.parse(fs.readFileSync(new URL('./official-launch-layer-query.json',import.meta.url),'utf8'));
const routes=fs.readFileSync(new URL('../../../../src/data/routes/nebraska.ts',import.meta.url),'utf8');
const trip=fs.readFileSync(new URL('../../../../src/data/trip-details/nebraska.ts',import.meta.url),'utf8');
const controls=JSON.parse(fs.readFileSync(new URL('../../../../src/data/route-access-official-map-controls.json',import.meta.url),'utf8'));
const holds=fs.readFileSync(new URL('../../../../src/data/route-access-review-holds.ts',import.meta.url),'utf8');
const withheld=fs.readFileSync(new URL('../../../../src/data/generated/withheld-route-slugs.ts',import.meta.url),'utf8');
const map=new Map(layer.features.map(f=>[f.attributes.GlobalID,f]));
for (const [id,lat,lon] of [['65448e45-38e8-4ec1-847a-f9edbd6f9fdc',42.02187581,-96.57456907],['5efc7a98-ec2c-4c0a-888f-3d4110f89b16',41.82960424,-96.48265492]]) { const f=map.get(id); assert.ok(f); assert.equal(f.attributes.AccessType,'Public'); assert.equal(f.attributes.Ramp_Status,'Open'); assert.equal(f.attributes.ShoreLaunch,'Yes'); assert.equal(f.attributes.Paddle_Lat,lat); assert.equal(f.attributes.Paddle_Long,lon); assert.ok(Math.abs(f.geometry.y-lat)<1e-6); assert.ok(Math.abs(f.geometry.x-lon)<1e-6); }
assert.ok(routes.includes('"latitude":42.02187581,"longitude":-96.57456907')); assert.ok(routes.includes('"latitude":41.82960424,"longitude":-96.48265492')); assert.ok(!routes.includes('"latitude":42.012773,"longitude":-96.57281')); assert.ok(!routes.includes('"latitude":41.8263,"longitude":-96.4931'));
assert.ok(trip.includes('"name":"Oakland City Park Access","latitude":41.82960424,"longitude":-96.48265492')); assert.ok(!trip.includes('"latitude":41.8263,"longitude":-96.4931'));
const provider=controls.providers.find(p=>p.id==='nebraska_ngpc_logan_creek_launch_layer_2026'); assert.ok(provider); assert.equal(provider.sourceSha256,crypto.createHash('sha256').update(fs.readFileSync(new URL('./official-launch-layer-query.json',import.meta.url))).digest('hex')); assert.equal(provider.controls.length,2); assert.ok(holds.includes('"logan-creek-pender-oakland"')); assert.ok(withheld.includes('"logan-creek-pender-oakland"')); console.log('Logan Creek source/occurrence/control/hold checks passed.');
