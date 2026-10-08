import { access, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { listRoutePageConsolidations } from '../src/data/route-page-consolidations.ts';

const outputRoot = resolve(process.argv[2] || 'dist');
const siteOrigin = new URL(process.env.SITE_URL || process.env.PUBLIC_SITE_URL || 'https://paddletoday.com').origin;
const routes = listRoutePageConsolidations();

const escapeAttribute = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

for (const { slug, target: targetPath } of routes) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Unsafe consolidated route slug: ${slug}`);
  }

  const target = new URL(targetPath, siteOrigin);
  const selectedRoute = target.searchParams.get('route');
  const isRiverHubTarget = /^\/rivers\/by-river\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(target.pathname);
  const isStandaloneRouteTarget = /^\/rivers\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(target.pathname)
    && !target.search
    && !target.hash;
  if (
    target.origin !== siteOrigin
    || (!isRiverHubTarget && !isStandaloneRouteTarget)
    || (selectedRoute && target.hash !== `#trip-${selectedRoute}`)
  ) {
    throw new Error(`Invalid route consolidation target for ${slug}: ${target.href}`);
  }

  const targetArtifact = join(outputRoot, target.pathname.slice(1), 'index.html');
  try {
    await access(targetArtifact);
  } catch {
    throw new Error(`Missing generated redirect target for ${slug}: ${targetArtifact}`);
  }

  const canonical = `${siteOrigin}${target.pathname}`;
  const targetHref = escapeAttribute(target.href);
  const canonicalHref = escapeAttribute(canonical);
  const document = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="0;url=${targetHref}">
    <link rel="canonical" href="${canonicalHref}">
    <title>Trip moved | Paddle Today</title>
  </head>
  <body>
    <main>
      <h1>This trip has moved</h1>
      <p>Open the current trip page for route details and planning information.</p>
      <p><a href="${targetHref}">View the current trip</a></p>
    </main>
  </body>
</html>
`;
  const outputPath = join(outputRoot, 'rivers', slug, 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, document, 'utf8');
}

console.log(`Generated ${routes.length} route consolidation redirects in ${outputRoot}.`);
