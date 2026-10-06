import { createReadStream, constants } from 'node:fs';
import { copyFile, mkdir, lstat, realpath, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, join, dirname, basename, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

export const androidReleaseCopies = ['paddletoday-1.1.2.aab', 'apps/mobile/paddletoday-1.1.2.aab'];
const pathKey = value => process.platform === 'win32' ? value.toLowerCase() : value;
const within = (path, root) => pathKey(path) === pathKey(root) || pathKey(path).startsWith(pathKey(root) + sep);

/** Hash from disk in bounded chunks, rejecting links and concurrent changes. */
export async function inspectReleaseFile(path) {
  const before = await lstat(path);
  if (!before.isFile() || before.isSymbolicLink()) throw new Error('Release artifact must be a regular file');
  const digest = createHash('sha256'); let bytes = 0;
  for await (const chunk of createReadStream(path)) { digest.update(chunk); bytes += chunk.length; }
  const after = await lstat(path);
  if (before.size !== after.size || before.mtimeMs !== after.mtimeMs || before.ctimeMs !== after.ctimeMs || bytes !== before.size) throw new Error('Release artifact changed during verification');
  return { bytes, sha256: digest.digest('hex'), modifiedAt: after.mtime.toISOString() };
}

async function physicalDestination(destination) {
  let parent = resolve(destination);
  const missing = [];
  while (true) {
    try { return resolve(await realpath(parent), ...missing.reverse()); }
    catch (error) {
      if (error.code !== 'ENOENT' || dirname(parent) === parent) throw error;
      missing.push(basename(parent)); parent = dirname(parent);
    }
  }
}

/** Archive only. Checkout removal is a separate action after user-selected destination verification. */
export async function archiveAndroidRelease({ root = process.cwd(), destination }) {
  if (!destination || /^\w+:\/\//.test(destination)) throw new Error('An explicit local archive directory is required');
  root = await realpath(resolve(root));
  const target = await physicalDestination(destination);
  if (within(target, root)) throw new Error('Archive destination must be outside the repository checkout');
  const copies = [];
  for (const relativePath of androidReleaseCopies) {
    const path = resolve(root, relativePath);
    if (!within(await realpath(path), root)) throw new Error('Release source escapes the repository checkout');
    copies.push({ relativePath, path, ...await inspectReleaseFile(path) });
  }
  const original = copies[0];
  if (copies.some(copy => copy.bytes !== original.bytes || copy.sha256 !== original.sha256)) throw new Error('Release copies differ; preserve both and resolve their provenance before archival');
  const directory = join(target, 'paddletoday-1.1.2-' + original.sha256.slice(0, 12));
  await mkdir(directory, { recursive: true });
  // Verify the physical path again after creation; a symlink/junction must not
  // redirect the archive into the checkout or another unexpected location.
  if (pathKey(await realpath(directory)) !== pathKey(directory)) throw new Error('Archive directory changed physical location');
  const archiveFile = join(directory, 'paddletoday-1.1.2.aab');
  try { await copyFile(original.path, archiveFile, constants.COPYFILE_EXCL); }
  catch (error) { if (error.code !== 'EEXIST') throw error; }
  const archived = await inspectReleaseFile(archiveFile);
  if (archived.sha256 !== original.sha256 || archived.bytes !== original.bytes) throw new Error('Existing or copied archive does not match the release; no checkout files were removed');
  let head = null;
  try { head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8', windowsHide: true, stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch { /* Fixture or project without Git; source paths and digests remain recorded. */ }
  const manifestFile = join(directory, 'archive-manifest.json');
  const manifest = { version: 1, release: '1.1.2', archivedAt: new Date().toISOString(), sourceCheckout: root, sourceHead: head,
    artifact: { file: basename(archiveFile), bytes: archived.bytes, sha256: archived.sha256 },
    copies: copies.map(({ relativePath, bytes, sha256, modifiedAt }) => ({ relativePath, bytes, sha256, modifiedAt })),
    retention: 'No automatic expiry or cleanup configured by this command', checkoutCopiesRemoved: false };
  try { await writeFile(manifestFile, JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' }); }
  catch (error) { if (error.code !== 'EEXIST') throw error; }
  const saved = JSON.parse(await readFile(manifestFile, 'utf8'));
  if (saved.release !== manifest.release || saved.artifact?.sha256 !== archived.sha256 || saved.artifact?.bytes !== archived.bytes || saved.artifact?.file !== basename(archiveFile)) throw new Error('Existing archive manifest differs; no checkout files were removed');
  // Read/hash again from the saved manifest location to prove retrieval; never
  // treat a successful copy operation alone as a verified archive.
  const retrieved = await inspectReleaseFile(join(directory, saved.artifact.file));
  if (retrieved.sha256 !== original.sha256 || retrieved.bytes !== original.bytes) throw new Error('Archived release could not be retrieved unchanged');
  return { archiveFile, manifestFile, bytes: archived.bytes, sha256: archived.sha256, retrievedVerified: true, checkoutCopiesRemoved: false };
}
