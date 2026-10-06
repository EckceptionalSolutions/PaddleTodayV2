import { readFile, access, mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { listRivers, listRiverGroups, listAllRiversForAudit, WITHHELD_ROUTE_SLUGS } from '../src/lib/rivers';

// Inspect the actual build, not just template intent. Run after build:app.
const root = resolve(process.argv[2] || 'dist');
const origin = new URL(process.env.SITE_URL || process.env.PUBLIC_SITE_URL || 'https://paddletoday.com').origin;
const errors: string[] = [];
const warnings: string[] = [];
const decode = (text: string) => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const normalizedText = (text: string) => decode(text.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim().toLowerCase();
const locs = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
const tags = (html: string, name: string) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
const attr = (tag: string, name: string) => decode(tag.match(new RegExp(`\\b${name}=("|')(.*?)\\1`, 'i'))?.[2] || '');
const fileFor = (pathname: string) => join(root, pathname.endsWith('/') ? `${pathname}index.html` : pathname);
const utilityPaths = ['/admin/', '/admin/operations/', '/alerts/unsubscribe/', '/favorites/', '/request-river/'];
const config = JSON.parse(await readFile(join(root, 'staticwebapp.config.json'), 'utf8'));
if (config.navigationFallback) errors.push('Static pages must not fall back to the homepage for missing URLs.');
if (config.responseOverrides?.['404']?.statusCode !== 404 || config.responseOverrides?.['404']?.rewrite !== '/404.html') {
  errors.push('Azure must serve the branded 404 page with HTTP 404.');
}
const routePatterns = new Map<string, string>();
for (const rule of config.routes || []) {
  const pattern = rule.route === '/' ? '/' : rule.route.replace(/\/$/, '');
  const previous = routePatterns.get(pattern);
  if (previous) errors.push(`Duplicate static route pattern: ${previous} and ${rule.route}`);
  else routePatterns.set(pattern, rule.route);
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
const routeHeadings = new Map<string, string[]>();
const routeDescriptions = new Map<string, string[]>();
const routeLinks = new Map<string, Set<string>>();
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
  if (/^\/rivers\/[^/]+\/$/.test(url.pathname)) {
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => normalizedText(match[1]));
    if (headings.length !== 1 || !headings[0]) errors.push(`Route page must have exactly one nonempty H1: ${value}`);
    else routeHeadings.set(headings[0], [...(routeHeadings.get(headings[0]) || []), url.pathname]);

    const descriptions = tags(html, 'meta')
      .filter((tag) => attr(tag, 'name') === 'description')
      .map((tag) => normalizedText(attr(tag, 'content')));
    if (descriptions.length !== 1 || !descriptions[0]) errors.push(`Route page must have exactly one nonempty meta description: ${value}`);
    else routeDescriptions.set(descriptions[0], [...(routeDescriptions.get(descriptions[0]) || []), url.pathname]);
  }
  for (const tag of tags(html, 'a')) {
    const href = attr(tag, 'href');
    if (!href) continue;
    const target = new URL(href, value);
    if (target.origin !== origin) continue;
    if (target.pathname === '/request-river/' && target.search) errors.push(`Crawlable form prefill on ${url.pathname}`);
    if (target.pathname.startsWith('/rivers/')) {
      const destination = redirects.get(target.pathname.replace(/\/$/, '')) || target.pathname;
      const normalized = destination.endsWith('/') ? destination : `${destination}/`;
      const sources = routeLinks.get(normalized) || new Set<string>();
      sources.add(url.pathname);
      routeLinks.set(normalized, sources);
    }
  }
}
for (const rule of config.routes || []) {
  if (!rule.redirect) continue;
  const target = new URL(rule.redirect, origin);
  if (target.origin !== origin) continue;
  const pathname = target.pathname.endsWith('/') ? target.pathname : `${target.pathname}/`;
  if (!paths.has(pathname)) errors.push(`Static redirect target is not in the sitemap: ${rule.route} -> ${rule.redirect}`);
  try { await access(fileFor(pathname)); }
  catch { errors.push(`Static redirect target is missing from the build: ${rule.route} -> ${rule.redirect}`); }
}
for (const [title, pages] of titles) {
  if (pages.length > 1) warnings.push(`Shared title (${pages.length} pages): ${title}: ${pages.join(', ')}`);
}
const duplicateRouteHeadings = [...routeHeadings]
  .filter(([, pages]) => pages.length > 1)
  .map(([text, pages]) => ({ text, pages }));
const duplicateRouteDescriptions = [...routeDescriptions]
  .filter(([, pages]) => pages.length > 1)
  .map(([text, pages]) => ({ text, pages }));
for (const { text, pages } of duplicateRouteHeadings) warnings.push(`Shared route H1 (${pages.length} pages): ${text}: ${pages.join(', ')}`);
for (const { text, pages } of duplicateRouteDescriptions) warnings.push(`Shared route description (${pages.length} pages): ${text}: ${pages.join(', ')}`);
const routes = listRivers();
const routePaths = routes.map((route) => `/rivers/${route.slug}/`);
const expected = [
  ...routePaths,
  ...listRiverGroups().filter((group) => group.routeCount > 1).map((group) => `/rivers/by-river/${group.riverId}/`),
];
for (const pathname of expected) if (!paths.has(pathname)) errors.push(`Published route/hub absent from sitemap: ${pathname}`);
const unlinkedPublicPages = expected.filter((pathname) =>
  ![...(routeLinks.get(pathname) || [])].some((source) => source !== pathname),
);
for (const pathname of unlinkedPublicPages) {
  errors.push(`Public route/hub has no incoming internal link from another sitemap page: ${pathname}`);
}
for (const [pathname, sources] of routeLinks) {
  const destination = redirects.get(pathname.replace(/\/$/, '')) || pathname;
  const normalized = destination.endsWith('/') ? destination : `${destination}/`;
  try { await access(fileFor(normalized)); }
  catch { errors.push(`Broken route link ${pathname} from ${[...sources][0] || 'unknown source'}`); }
}
const routeLinkAudit = routePaths.map((pathname) => {
  const sources = [...(routeLinks.get(pathname) || new Set<string>())].filter((source) => source !== pathname);
  const directorySources = sources.filter((source) => source.startsWith('/states/') || source.startsWith('/rivers/by-river/'));
  return { pathname, inlinkCount: sources.length, directoryInlinkCount: directorySources.length };
});
const unlinkedRoutePaths = routeLinkAudit.filter((route) => route.inlinkCount === 0).map((route) => route.pathname);
const routesWithoutDirectoryInlinks = routeLinkAudit.filter((route) => route.directoryInlinkCount === 0).map((route) => route.pathname);
if (unlinkedRoutePaths.length) {
  warnings.push(`${unlinkedRoutePaths.length} sitemap route pages have no incoming internal HTML link. Sample: ${unlinkedRoutePaths.slice(0, 20).join(', ')}`);
}
if (routesWithoutDirectoryInlinks.length) {
  warnings.push(`${routesWithoutDirectoryInlinks.length} sitemap route pages have no state-page or river-hub link. Sample: ${routesWithoutDirectoryInlinks.slice(0, 20).join(', ')}`);
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
const report = {
  generatedAt: new Date().toISOString(),
  origin,
  pages: urls.length,
  publishedRoutes: routes.length,
  checkedRouteLinks: routeLinks.size,
  routeLinkAudit: {
    routesWithNoInternalInlinks: unlinkedRoutePaths.length,
    routesWithoutStateOrRiverHubInlinks: routesWithoutDirectoryInlinks.length,
    sampleRoutesWithNoInternalInlinks: unlinkedRoutePaths.slice(0, 50),
    sampleRoutesWithoutStateOrRiverHubInlinks: routesWithoutDirectoryInlinks.slice(0, 50),
  },
  internallyLinkedPublicPages: expected.length - unlinkedPublicPages.length,
  unlinkedPublicPages,
  uniqueRouteH1s: routeHeadings.size,
  uniqueRouteDescriptions: routeDescriptions.size,
  duplicateRouteHeadings,
  duplicateRouteDescriptions,
  sampleStatus,
  errors,
  warnings,
};
const reportDate = new Date().toISOString().slice(0, 10);
const reportDirectory = join('.local', `seo-${reportDate}`);
await mkdir(reportDirectory, { recursive: true });
await writeFile(join(reportDirectory, 'build-indexability.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
