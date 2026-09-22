import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const batch = '2026-09-17-batch-12';
const root = process.cwd();
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));
const sha256 = (value) => createHash('sha256').update(value).digest('hex').toUpperCase();
const selection = await readJson(`docs/access-remediation/${batch}/selection.json`);
const review = await readJson(`docs/access-remediation/${batch}/review.json`);
const sources = await readJson(`docs/access-remediation/${batch}/source-metadata.json`);
const before = await readJson(`docs/access-remediation/${batch}/before-file-hashes.json`);
const holds = await readFile(path.join(root, 'src/data/route-access-review-holds.ts'), 'utf8');
const manifest = await readFile(path.join(root, 'src/data/generated/withheld-route-slugs.ts'), 'utf8');

assert.equal(selection.sites.length, 10, 'the frozen selection must contain ten physical sites');
assert.deepEqual(selection.sites.map((site) => site.rank), [141, 142, 143, 144, 145, 146, 147, 148, 149, 150]);
assert.equal(selection.audit.evidenceMode, 'cache-only', 'cached audit ranks must be disclosed');
assert.equal(review.selectionFrozenBeforeResearch, true);
assert.equal(review.decisions.length, 10, 'every frozen site needs a decision');
for (const site of selection.sites) {
  const decision = review.decisions.find((item) => item.rank === site.rank);
  assert.ok(decision, `missing decision for frozen rank ${site.rank}`);
  assert.equal(decision.site, site.name, `frozen site name changed at rank ${site.rank}`);
  assert.deepEqual([...decision.routes].sort(), [...new Set(site.occurrences.map((item) => item.routeId))].sort());
}
assert.equal(review.coordinateCorrectedSiteCount, 1);
assert.equal(review.retainedAccessAnchorCount, 9);
assert.equal(review.unverifiedAccessSiteCount, 0);
assert.equal(review.uniqueBatchRouteHoldCount, 1);
assert.equal(review.totalWithheldRouteCountAfterBatch, 148);

const heldRoute = 'minnehaha-creek-grays-bay-longfellow-lagoon';
assert.ok(holds.includes(heldRoute), 'source hold missing for corrected Longfellow endpoint');
const manifestMatch = manifest.match(/coordinateWithheldRouteSlugs = (\[[\s\S]*?\]) as const;/);
assert.ok(manifestMatch, 'generated withholding manifest array not found');
const withheldRouteIds = JSON.parse(manifestMatch[1]);
assert.equal(withheldRouteIds.length, 148, 'generated withholding manifest should contain 148 route slugs');
assert.equal(new Set(withheldRouteIds).size, withheldRouteIds.length, 'generated withholding manifest has duplicate slugs');
assert.deepEqual(withheldRouteIds, [...withheldRouteIds].sort(), 'generated withholding manifest must be sorted');
assert.ok(withheldRouteIds.includes(heldRoute), 'generated manifest missing Longfellow hold');

const acceptedSources = sources.snapshots.filter((snapshot) => snapshot.acceptedAsEvidence);
const failedSources = sources.snapshots.filter((snapshot) => !snapshot.acceptedAsEvidence);
assert.equal(acceptedSources.length, 25);
assert.equal(failedSources.length, 3);
for (const snapshot of acceptedSources) {
  assert.ok(snapshot.sha256, `accepted source is missing a hash: ${snapshot.id}`);
  const bytes = await readFile(path.resolve(root, snapshot.localPath));
  assert.equal(sha256(bytes), snapshot.sha256, `source snapshot hash mismatch: ${snapshot.id}`);
}
for (const snapshot of failedSources) {
  assert.equal(snapshot.sha256, null, `failed source must not be treated as evidence: ${snapshot.id}`);
  assert.equal(snapshot.acceptedAsEvidence, false);
  assert.equal(snapshot.httpStatus, null);
  assert.match(snapshot.retrievalNote, /fetch failed|timeout/i);
}

for (const file of before.files) {
  const backup = await readFile(path.resolve(root, file.backupPath));
  assert.equal(sha256(backup), file.sha256, `pre-edit backup hash mismatch: ${file.path}`);
  assert.equal(sha256(backup), file.backupSha256, `backup SHA-256 metadata mismatch: ${file.path}`);
}

const minnesotaDetails = await readFile(path.join(root, 'src/data/trip-details/minnesota.ts'), 'utf8');
const longfellowStart = minnesotaDetails.indexOf('"minnehaha-creek-grays-bay-longfellow-lagoon"');
const longfellowEnd = minnesotaDetails.indexOf('\n  "cloquet-river-island-lake-bachelor-road"', longfellowStart);
assert.ok(longfellowStart >= 0 && longfellowEnd > longfellowStart, 'Longfellow trip detail block not found');
const longfellowBlock = minnesotaDetails.slice(longfellowStart, longfellowEnd);
assert.equal((longfellowBlock.match(/44\.916125473/g) ?? []).length, 3, 'terminal, access point, and source note must use the corrected latitude');
assert.equal((longfellowBlock.match(/-93\.215040979/g) ?? []).length, 3, 'terminal, access point, and source note must use the corrected longitude');
assert.ok(!longfellowBlock.includes('44.961125473'), 'old incorrect latitude remains in the Longfellow source block');
assert.ok(!longfellowBlock.includes('-93.215049079'), 'old coordinate remains in the Longfellow source block');

const roleChecks = [
  ['src/data/routes/washington-skagit.ts', /stored NPS site point is an access-area anchor, not a surveyed gravel-ramp edge/],
  ['src/data/routes/new-york.ts', /Noblewood Park cartop launch \/ Boquet mouth access area/],
  ['src/data/routes/new-york.ts', /NYSDEC Sevey Hand Launch access area/],
  ['src/data/routes/new-york.ts', /NPS\/DEC Mongaup River Access \/ Route 97 carry area/],
  ['src/data/trip-details/wisconsin.ts', /roughly 350-foot grass carry to parking/],
  ['src/data/routes/michigan.ts', /Calhoun County's 2025–2029 plan documents a public kayak\/canoe launch and parking/],
  ['src/data/routes/michigan.ts', /Riverside coordinate is a park\/access-area anchor, not the dock edge/],
  ['src/data/routes/north-carolina.ts', /Hammocks Beach State Park mainland kayak-launch area/],
  ['src/data/routes/arizona-gila-box.ts', /BLM announced phased repairs at Dry Canyon/],
  ['src/data/trip-details/minnesota.ts', /mandatory final landing before Minnehaha Falls/],
];
for (const [file, pattern] of roleChecks) assert.match(await readFile(path.join(root, file), 'utf8'), pattern, `missing access-role clarification in ${file}`);

const syntaxFiles = [
  'src/data/routes/washington-skagit.ts',
  'src/data/routes/new-york.ts',
  'src/data/trip-details/wisconsin.ts',
  'src/data/routes/michigan.ts',
  'src/data/trip-details/michigan.ts',
  'src/data/routes/north-carolina.ts',
  'src/data/routes/arizona-gila-box.ts',
  'src/data/trip-details/minnesota.ts',
  'src/data/route-access-review-holds.ts',
  'src/data/generated/withheld-route-slugs.ts',
];
for (const file of syntaxFiles) {
  const source = await readFile(path.join(root, file), 'utf8');
  const output = ts.transpileModule(source, {
    fileName: file,
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  const errors = (output.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, `${file} has TypeScript syntax diagnostics`);
}

console.log('Batch 12 verification passed: ten frozen sites and decisions, one coordinate correction, nine retained access anchors, one route held for geometry regeneration, 148 unique withheld route slugs, 25 hashed accepted snapshots, three failed retrievals excluded, verified pre-edit backups, and edited TypeScript syntax.');
