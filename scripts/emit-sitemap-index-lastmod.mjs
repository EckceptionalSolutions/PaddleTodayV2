import { readFile, stat, writeFile } from 'node:fs/promises';
import { relative, resolve, sep } from 'node:path';

const outputRoot = resolve(process.argv[2] || 'dist');
const siteOrigin = new URL(process.env.SITE_URL || process.env.PUBLIC_SITE_URL || 'https://paddletoday.com').origin;
const indexPath = resolve(outputRoot, 'sitemap-index.xml');
const indexXml = await readFile(indexPath, 'utf8');
const sitemapBlocks = [...indexXml.matchAll(/<sitemap\b[^>]*>[\s\S]*?<\/sitemap>/g)];

if (sitemapBlocks.length === 0) {
  throw new Error(`No child sitemaps found in ${indexPath}`);
}

const decodeXml = (value) => value
  .replaceAll('&amp;', '&')
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replaceAll('&quot;', '"')
  .replaceAll('&apos;', "'");

const lastmods = [];

for (const [block] of sitemapBlocks) {
  const locationMatch = block.match(/<loc>([\s\S]*?)<\/loc>/);
  if (!locationMatch) {
    throw new Error(`Child sitemap entry is missing a <loc> in ${indexPath}`);
  }

  const sitemapUrl = new URL(decodeXml(locationMatch[1].trim()));
  if (sitemapUrl.origin !== siteOrigin || sitemapUrl.search || sitemapUrl.hash) {
    throw new Error(`Invalid child sitemap URL in ${indexPath}: ${sitemapUrl.href}`);
  }

  const childPath = resolve(outputRoot, decodeURIComponent(sitemapUrl.pathname.replace(/^\/+/, '')));
  const childRelativePath = relative(outputRoot, childPath);
  if (childRelativePath === '..' || childRelativePath.startsWith(`..${sep}`)) {
    throw new Error(`Child sitemap escapes build output: ${sitemapUrl.href}`);
  }

  const modifiedAt = (await stat(childPath)).mtime.toISOString();
  lastmods.push(modifiedAt);
}

let sitemapIndex = 0;
const updatedIndex = indexXml.replace(/<sitemap\b[^>]*>[\s\S]*?<\/sitemap>/g, (block) => {
  const lastmod = lastmods[sitemapIndex];
  sitemapIndex += 1;
  if (!lastmod) {
    throw new Error(`Could not match child sitemap entry in ${indexPath}`);
  }

  const withoutOldLastmod = block.replace(/\s*<lastmod>[\s\S]*?<\/lastmod>/g, '');
  return withoutOldLastmod.replace(/(<loc>[\s\S]*?<\/loc>)/, `$1\n    <lastmod>${lastmod}</lastmod>`);
});

await writeFile(indexPath, updatedIndex, 'utf8');
console.log(`Added accurate lastmod timestamps for ${sitemapBlocks.length} child sitemap(s) in ${indexPath}.`);
