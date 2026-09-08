import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import postcss from 'postcss';

const root = process.cwd();

async function cssFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await cssFiles(path));
    else if (extname(entry.name) === '.css') files.push(path);
  }
  return files;
}

// Optional paths support focused checks; the standard command checks all public CSS.
const requested = process.argv.slice(2);
const files = requested.length ? requested.map(path => resolve(root, path)) : await cssFiles(join(root, 'public'));
let failures = 0;
for (const file of files.sort()) {
  try {
    postcss.parse(await readFile(file, 'utf8'), { from: file });
  } catch (error) {
    failures++;
    const location = error.line ? `:${error.line}:${error.column}` : '';
    console.error(`[styles] ${relative(root, file)}${location}: ${error.reason ?? error.message}`);
  }
}
if (failures) {
  process.exitCode = 1;
} else {
  console.log(`[styles] CSS syntax passed for ${files.length} stylesheet${files.length === 1 ? '' : 's'}.`);
}
