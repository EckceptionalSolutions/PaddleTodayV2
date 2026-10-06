import { readFile, readdir, writeFile, unlink, access } from 'node:fs/promises';
import { relative, join, resolve, sep } from 'node:path';
import { gzipSync, gunzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';

/** Transform only the packager's copied HTML. Verify lossless bytes before removing each plain copy. */
export async function compressStaticHtml(directory) {
  const root = resolve(directory), inventory = {};
  if (await access(join(root, '.static-compression.json')).then(() => true, error => { if (error.code === 'ENOENT') return false; throw error; })) throw new Error('Static output is already compressed.');
  let sourceBytes = 0, compressedBytes = 0;
  async function walk(parent) {
    for (const entry of await readdir(parent, { withFileTypes: true })) {
      const path = resolve(parent, entry.name);
      if (!path.startsWith(root + sep)) throw new Error('Static compression escaped its output directory');
      if (entry.isDirectory()) await walk(path);
      else if (entry.isFile() && entry.name.endsWith('.html')) {
        const source = await readFile(path), compressed = gzipSync(source, { level: 6 });
        if (!gunzipSync(compressed).equals(source)) throw new Error('HTML compression changed source bytes');
        const output = path + '.gz';
        await writeFile(output, compressed, { flag: 'wx' });
        const saved = await readFile(output);
        if (!saved.equals(compressed)) throw new Error('Could not verify stored compressed HTML');
        inventory[relative(root, output).split(sep).join('/')] = { sourceBytes: source.length, sha256: createHash('sha256').update(source).digest('hex') };
        sourceBytes += source.length; compressedBytes += compressed.length;
        await unlink(path);
      }
    }
  }
  await walk(root);
  await writeFile(join(root, '.static-compression.json'), JSON.stringify(inventory) + '\n');
  return { files: Object.keys(inventory).length, sourceBytes, compressedBytes };
}
