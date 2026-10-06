import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = process.argv[2] ?? '.local/efficiency-audit/build';
const chunks = new Map(await Promise.all((await readdir(join(root, '_astro'))).filter(name => name.endsWith('.js')).map(async name => {
  const body = await readFile(join(root, '_astro', name));
  return [name, { bytes: body.length, gzipBytes: gzipSync(body).length, text: body.toString() }];
})));
function dependencies(name, selected = new Set()) {
  if (!chunks.has(name) || selected.has(name)) return selected;
  selected.add(name);
  for (const match of chunks.get(name).text.matchAll(/(?:from\s*|import\s*\(|import\s*)(["'])(\.[^"']+\.js)\1/g)) dependencies(basename(match[2]), selected);
  return selected;
}
const pages = {};
for (const page of ['index.html', 'weekend/index.html']) {
  const html = await readFile(join(root, page), 'utf8');
  const selected = new Set();
  for (const match of html.matchAll(/<script\b[^>]*\bsrc="\/_astro\/([^"?]+\.js)"/g)) dependencies(match[1], selected);
  pages[page] = { files: [...selected].sort(), bytes: [...selected].reduce((n, name) => n + chunks.get(name).bytes, 0),
    gzipBytes: [...selected].reduce((n, name) => n + chunks.get(name).gzipBytes, 0) };
}
const result = { date: '2026-10-06', root, description: 'Transitive static ESM script dependencies from built page script tags; gzip level six per file. Images and runtime requests excluded.',
  galleryChunks: [...chunks].filter(([name]) => name.startsWith('route-gallery.')).map(([name, value]) => ({ name, bytes: value.bytes, gzipBytes: value.gzipBytes })), pages };
if (process.argv[3]) await writeFile(process.argv[3], JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
