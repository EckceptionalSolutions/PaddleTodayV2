import { execFileSync } from 'node:child_process';
import { stat, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const destination = resolve(process.argv[2] ?? 'deploy-package');
const manifest = JSON.parse(await readFile(join(destination, 'api-package-manifest.json'), 'utf8'));
const rootLock = JSON.parse(await readFile('package-lock.json', 'utf8'));
const packageLock = JSON.parse(await readFile(join(destination, 'package-lock.json'), 'utf8'));
const files = [...new Set(execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean))];
const oldDirectories = ['src/', 'packages/', 'docs/operations/', 'automations/route-control-plane/'];
const groups = {};
for (const prefix of oldDirectories) {
  let bytes = 0, count = 0;
  for (const path of files.filter(path => path.startsWith(prefix))) {
    try { const info = await stat(path); if (info.isFile()) { bytes += info.size; count++; } } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  groups[prefix] = { files: count, bytes };
}
const before = (manifest.staticSource ?? manifest.static).bytes + Object.values(groups).reduce((sum, group) => sum + group.bytes, 0);
const after = manifest.static.bytes + manifest.compiledBytes + manifest.resources.reduce((sum, resource) => sum + resource.packagedBytes, 0);
const originalVersions = new Set(Object.entries(rootLock.packages).filter(([path, value]) => path.startsWith('node_modules/') && value.version).map(([path, value]) => `${path.slice(path.lastIndexOf('node_modules/') + 13)}@${value.version}`));
const versionsAbsentFromRootLock = Object.entries(packageLock.packages).filter(([path, value]) => path.startsWith('node_modules/') && value.version && !originalVersions.has(`${path.slice(path.lastIndexOf('node_modules/') + 13)}@${value.version}`)).map(([path, value]) => ({ path, version: value.version }));
const result = { date: '2026-10-06', scope: 'Application files before dependency installation; vendor tarballs, manifests and lockfiles excluded. Original copy policy applied to current non-ignored worktree files.',
  before: { bytes: before, sourceGroups: groups, static: manifest.staticSource ?? manifest.static }, after: { bytes: after, compiledBytes: manifest.compiledBytes, runtimeResources: manifest.resources, static: manifest.static, staticCompression: manifest.staticCompression },
  bytesSaved: before - after, percentSaved: 100 * (before - after) / before,
  installedPackageRecords: Object.keys(packageLock.packages).filter(path => path.startsWith('node_modules/')).length, versionsAbsentFromRootLock,
  preserved: ['complete static fallback', 'all gallery and geometry assets', 'runtime admin resources', 'root dependency overrides', 'locked external dependency versions'],
  packageVerificationLog: '.local/efficiency-audit/api-package-verification.log' };
if (process.argv[3]) await writeFile(process.argv[3], JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
