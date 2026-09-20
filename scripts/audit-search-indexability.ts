import { readFile, access, mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { listRivers, listRiverGroups, listAllRiversForAudit, WITHHELD_ROUTE_SLUGS } from '../src/lib/rivers';

// Inspect the actual build, not just template intent. Run after build:app.
const root = resolve(process.argv[2] || 'dist');
const origin = new URL(process.env.SITE_URL || process.env.PUBLIC_SITE_URL || 'https://paddletoday.com').origin;
const errors: string[] = [];
const warnings: string[] = [];
const decode = (text: string) => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const locs = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
const tags = (html: string, name: string) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
const attr = (tag: string, name: string) => decode(tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1] || '');
const fileFor = (pathname: string) => join(root, pathname.endsWith('/') ? `${pathname}index.html` : pathname);
const utilityPaths = ['/admin/', '/admin/operations/', '/alerts/unsubscribe/', '/favorites/', '/request-river/'];
const config = JSON.parse(await readFile('staticwebapp.config.json', 'utf8'));
if (config.navigationFallback) errors.push('Static pages must not fall back to the homepage for missing URLs.');
if (config.responseOverrides?.['404']?.statusCode !== 404 || config.responseOverrides?.['404']?.rewrite !== '/404.html') {
  errors.push('Azure must serve the branded 404 page with HTTP 404.');
}
const redirects = new Map<string, string>((config.routes || []).filter((r: any) => r.redirect).map((r: any) => [r.route.replace(/\/$/, ''), r.redirect]));
const sitemapFiles = locs(await readFile(join(root, 'sitemap-index.xml'), 'utf8'));
const urls: string[] = [];
for (const sitemap of sitemapFiles) {
  const url = new URL(sitemap);
  if (url.origin !== origin) errors.push(`Wrong sitemap origin: ${sitemap}`);
  urls.push(...locs(await readFile(fileFor(url.pathname), 'utf8')));
}
const paths = new Set<string>();
const titles = new Map<string, string[]>();
const routeLinks = new Map<string, string>();
for (const value of urls) {
  const url = new URL(value);
  if (url.origin !== origin || url.search || url.hash) errors.push(`Noncanonical sitemap URL: ${value}`);
  if (paths.has(url.pathname)) errors.push(`Duplicate sitemap URL: ${value}`);
  paths.add(url.pathname);
  let html: string;
  try { html = await readFile(fileFor(url.pathname), 'utf8'); }
  catch { errors.push(`Sitemap page missing from build: ${value}`); continue; }
  const canonical = tags(html, 'link').filter((tag) => attr(tag, 'rel') === 'canonical');
  if (canonical.length !== 1 || attr(canonical[0], 'href') !== value) errors.push(`Incorrect canonical: ${value}`);
  if (tags(html, 'meta').some((tag) => attr(tag, 'name') === 'robots' && /noindex/i.test(attr(tag, 'content')))) {
    errors.push(`Noindex page in sitemap: ${value}`);
  }
  const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] || '');
  if (!title) errors.push(`Missing title: ${value}`);
  titles.set(title, [...(titles.get(title) || []), url.pathname]);
  for (const tag of tags(html, 'a')) {
    const href = attr(tag, 'href');
    if (!href) continue;
    const target = new URL(href, value);
    if (target.origin !== origin) continue;
    if (target.pathname === '/request-river/' && target.search) errors.push(`Crawlable form prefill on ${url.pathname}`);
    if (target.pathname.startsWith('/rivers/')) routeLinks.set(target.pathname, url.pathname);
  }
}
for (const [title, pages] of titles) {
  if (pages.length > 1) warnings.push(`Shared title (${pages.length} pages): ${title}: ${pages.join(', ')}`);
}
const routes = listRivers();
const expected = [
  ...routes.map((route) => `/rivers/${route.slug}/`),
  ...listRiverGroups().filter((group) => group.routeCount > 1).map((group) => `/rivers/by-river/${group.riverId}/`),
];
for (const pathname of expected) if (!paths.has(pathname)) errors.push(`Published route/hub absent from sitemap: ${pathname}`);
for (const [pathname, source] of routeLinks) {
  const destination = redirects.get(pathname.replace(/\/$/, '')) || pathname;
  const normalized = destination.endsWith('/') ? destination : `${destination}/`;
  try { await access(fileFor(normalized)); }
  catch { errors.push(`Broken route link ${pathname} from ${source}`); }
}
for (const pathname of [...utilityPaths, '/404.html']) {
  if (paths.has(pathname)) errors.push(`Utility page in sitemap: ${pathname}`);
  const html = await readFile(fileFor(pathname), 'utf8');
  if (!tags(html, 'meta').some((tag) => attr(tag, 'name') === 'robots' && /noindex/i.test(attr(tag, 'content')))) {
    errors.push(`Utility page missing noindex: ${pathname}`);
  }
}
const samples = [
  'pine-river-lincoln-pine-river-park-county-w', 'juniata-river-newport-green-valley',
  'cedar-river-dreisner-riverwood', 'beaver-dam-river-county-s-lowell',
  'namekagon-river-springbrook-big-bend', 'cuyahoga-river-ira-lock-29',
  'eau-claire-river-ross-drott', 'rock-river-county-p-willow-street',
  'st-louis-river-toivola-county-road-29', 'mississippi-river-iron-bridge-county-road-12-dam',
  'peshtigo-river-roaring-rapids', 'susquehanna-river-laceyville-meshoppen',
];
const inventory = new Set(listAllRiversForAudit().map((route) => route.slug));
const sampleStatus = samples.map((slug) => ({
  slug,
  status: paths.has(`/rivers/${slug}/`) ? 'published-in-build' : WITHHELD_ROUTE_SLUGS.has(slug) ? 'withheld-for-coordinate-review' : inventory.has(slug) ? 'not-public-in-current-catalog' : 'absent-from-current-catalog',
}));
const report = { generatedAt: new Date().toISOString(), origin, pages: urls.length, publishedRoutes: routes.length, checkedRouteLinks: routeLinks.size, sampleStatus, errors, warnings };
await mkdir('.local/seo-2026-09-20', { recursive: true });
await writeFile('.local/seo-2026-09-20/build-indexability.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
