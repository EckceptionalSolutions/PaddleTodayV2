import { afterEach, describe, expect, it } from 'vitest';
import { mkdtemp, mkdir, readFile, writeFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, resolve, sep, basename } from 'node:path';
import { archiveAndroidRelease, androidReleaseCopies, inspectReleaseFile } from './android-release-archive.mjs';

const temporary: string[] = [];
afterEach(async () => {
  for (const path of temporary.splice(0)) {
    if (!resolve(path).startsWith(resolve(tmpdir()) + sep) || !basename(path).startsWith('paddle-release-archive-')) throw new Error('Unexpected fixture cleanup target');
    await rm(path, { recursive: true, force: true });
  }
});
async function fixture() {
  const directory = await mkdtemp(join(tmpdir(), 'paddle-release-archive-')); temporary.push(directory);
  const root = join(directory, 'checkout'), destination = join(directory, 'outside', 'archives');
  const bytes = Buffer.from([0, 255, 216, 0, 64, 255]);
  for (const path of androidReleaseCopies) { await mkdir(dirname(join(root, path)), { recursive: true }); await writeFile(join(root, path), bytes); }
  return { root, destination, directory, bytes };
}
describe('retrievable Android release archives', () => {
  it('verifies raw bytes, provenance and retrieval while retaining both checkout copies', async () => {
    const { root, destination, bytes } = await fixture();
    const archived = await archiveAndroidRelease({ root, destination });
    expect(await readFile(archived.archiveFile)).toEqual(bytes);
    expect(archived).toMatchObject({ retrievedVerified: true, checkoutCopiesRemoved: false, bytes: bytes.length });
    const manifest = JSON.parse(await readFile(archived.manifestFile, 'utf8'));
    expect(manifest.artifact.sha256).toBe((await inspectReleaseFile(join(root, androidReleaseCopies[0]))).sha256);
    expect(manifest.copies.map((copy: {relativePath: string}) => copy.relativePath)).toEqual(androidReleaseCopies);
    for (const path of androidReleaseCopies) expect(await readFile(join(root, path))).toEqual(bytes);
    expect((await archiveAndroidRelease({ root, destination })).archiveFile).toBe(archived.archiveFile);
  });

  it('refuses differing copies before writing an archive or changing sources', async () => {
    const { root, destination, bytes } = await fixture();
    await writeFile(join(root, androidReleaseCopies[1]), 'another release');
    await expect(archiveAndroidRelease({ root, destination })).rejects.toThrow('copies differ');
    expect(await readFile(join(root, androidReleaseCopies[0]))).toEqual(bytes);
    expect(await readFile(join(root, androidReleaseCopies[1]), 'utf8')).toBe('another release');
  });

  it('refuses a checkout destination, including a junction resolving into it', async () => {
    const { root, directory } = await fixture();
    await expect(archiveAndroidRelease({ root, destination: join(root, 'archives') })).rejects.toThrow('outside');
    const alias = join(directory, 'archive-alias');
    await symlink(root, alias, process.platform === 'win32' ? 'junction' : 'dir');
    await expect(archiveAndroidRelease({ root, destination: join(alias, 'archives') })).rejects.toThrow('outside');
  });

  it('preserves a conflicting archive and refuses to call it verified', async () => {
    const { root, destination, bytes } = await fixture();
    const archived = await archiveAndroidRelease({ root, destination });
    await writeFile(archived.archiveFile, 'conflicting retained artifact');
    await expect(archiveAndroidRelease({ root, destination })).rejects.toThrow('does not match');
    expect(await readFile(archived.archiveFile, 'utf8')).toBe('conflicting retained artifact');
    for (const path of androidReleaseCopies) expect(await readFile(join(root, path))).toEqual(bytes);
  });

  it('refuses a conflicting provenance manifest and leaves source artifacts intact', async () => {
    const { root, destination, bytes } = await fixture();
    const archived = await archiveAndroidRelease({ root, destination });
    await writeFile(archived.manifestFile, JSON.stringify({ release: 'other', artifact: {} }));
    await expect(archiveAndroidRelease({ root, destination })).rejects.toThrow('manifest differs');
    for (const path of androidReleaseCopies) expect(await readFile(join(root, path))).toEqual(bytes);
  });
});
