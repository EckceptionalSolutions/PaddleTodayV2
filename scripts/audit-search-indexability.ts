import { readFile, access, mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { listRivers, listRiverGroups, listAllRiversForAudit, WITHHELD_ROUTE_SLUGS } from '../src/lib/rivers';
import { staticRoutePatternErrors } from './lib/static-route-rules';
import { isIndexableRoutePage, routePageConsolidationTarget, listRoutePageConsolidations } from '../src/data/route-page-consolidations';
import { routeGuidePublicationReviews } from '../src/data/route-guide-publication-reviews';
import { riverHubPublicationErrors, routeGuidePublicationErrors } from './lib/route-guide-publication';

// Inspect the actual build, not just template intent. Run after build:app.
const root = resolve(process.argv[2] || 'dist');
const origin = new URL(process.env.SITE_URL || process.env.PUBLIC_SITE_URL || 'https://paddletoday.com').origin;
const errors: string[] = [];
const warnings: string[] = [];
const guideBaseline = JSON.parse(await readFile('docs/audits/route-guide-publication-baseline-2026-10-19.json', 'utf8'));
errors.push(...routeGuidePublicationErrors(
  listRivers().filter(route => isIndexableRoutePage(route.slug)).map(route => route.slug),
  guideBaseline.standaloneGuideSlugs,
  routeGuidePublicationReviews,
));
const decode = (text: string) => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const normalizedText = (text: string) => decode(text.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim().toLowerCase();
const locs = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
const tags = (html: string, name: string) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
const attr = (tag: string, name: string) => decode(tag.match(new RegExp(`\\b${name}=("|')(.*?)\\1`, 'i'))?.[2] || '');
const fileFor = (pathname: string) => join(root, pathname.endsWith('/') ? `${pathname}index.html` : pathname);
const utilityPaths = ['/admin/', '/admin/operations/', '/alerts/unsubscribe/', '/favorites/', '/request-river/'];
const configText = await readFile(join(root, 'staticwebapp.config.json'), 'utf8');
const config = JSON.parse(configText);
if (Buffer.byteLength(configText, 'utf8') > 20 * 1024) {
  errors.push(`Azure staticwebapp.config.json exceeds its 20 KB limit (${Buffer.byteLength(configText, 'utf8')} bytes).`);
}
if (config.navigationFallback) errors.push('Static pages must not fall back to the homepage for missing URLs.');
if (config.responseOverrides?.['404']?.statusCode !== 404 || config.responseOverrides?.['404']?.rewrite !== '/404.html') {
  errors.push('Azure must serve the branded 404 page with HTTP 404.');
}
errors.push(...staticRoutePatternErrors(config.routes || []));
const redirects = new Map<string, string>((config.routes || []).filter((r: any) => r.redirect).map((r: any) => [r.route.replace(/\/$/, ''), r.redirect]));
const sitemapFiles = locs(await readFile(join(root, 'sitemap-index.xml'), 'utf8'));
const sitemapPaths = new Set(['/sitemap-index.xml', ...sitemapFiles.map((sitemap) => new URL(sitemap).pathname)]);
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
const planningRoutePaths = new Set(listRivers()
  .filter(route => route.scoreEligibility === 'planning' && isIndexableRoutePage(route.slug))
  .map(route => `/rivers/${route.slug}/`));
for (const value of urls) {
  const url = new URL(value);
  if (url.origin !== origin || url.search || url.hash) errors.push(`Noncanonical sitemap URL: ${value}`);
  if (paths.has(url.pathname)) errors.push(`Duplicate sitemap URL: ${value}`);
  paths.add(url.pathname);
  const configuredRedirect = redirects.get(url.pathname.replace(/\/$/, ''));
  if (configuredRedirect) {
    errors.push(`Sitemap URL has a configured redirect: ${value} -> ${configuredRedirect}`);
  }
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
  if (planningRoutePaths.has(url.pathname)) {
    if (/Only a low-water floor is known|We can tell when this route is likely too low/.test(html)) {
      errors.push(`Planning guide must not claim a calibrated low-water floor: ${value}`);
    }
    const sources = tags(html, 'section').find(tag => attr(tag, 'id') === 'planning-sources');
    if (!sources || attr(sources, 'data-detail-section') !== 'planning-sources' || /\shidden(?:\s|=|>)/i.test(sources)) {
      errors.push(`Planning guide must expose its evidence and source section: ${value}`);
    }
    if (!tags(html, 'a').some(tag => attr(tag, 'href') === '#planning-sources')) {
      errors.push(`Planning guide must link to its source section: ${value}`);
    }
    if (tags(html, 'section').some(tag => attr(tag, 'id') === 'why-this-call')) {
      errors.push(`Planning guide must not emit a score explanation panel: ${value}`);
    }
  }
  for (const tag of tags(html, 'a')) {
    const href = attr(tag, 'href');
    if (!href) continue;
    const target = new URL(href, value);
    if (target.origin !== origin) continue;
    if (target.pathname === '/request-river/' && target.search) errors.push(`Crawlable form prefill on ${url.pathname}`);
    if (target.pathname.startsWith('/rivers/')) {
      const redirect = redirects.get(target.pathname.replace(/\/$/, ''));
      const destinationPath = redirect ? new URL(redirect, origin).pathname : target.pathname;
      const normalized = destinationPath.endsWith('/') ? destinationPath : `${destinationPath}/`;
      const sources = routeLinks.get(normalized) || new Set<string>();
      sources.add(url.pathname);
      routeLinks.set(normalized, sources);
    }
  }
}
const publicTripSlugs = new Set(listRivers().map(route => route.slug));
const consolidatedRedirects = listRoutePageConsolidations().filter(({ slug }) => !publicTripSlugs.has(slug));
for (const { slug, target } of consolidatedRedirects) {
  const sourcePath = `/rivers/${slug}/`;
  const targetUrl = new URL(target, origin);
  if (paths.has(sourcePath)) errors.push(`Consolidated route must not appear in the sitemap: ${sourcePath}`);
  if (!paths.has(targetUrl.pathname)) errors.push(`Consolidated route target is not in the sitemap: ${sourcePath} -> ${target}`);
  try {
    const html = await readFile(fileFor(sourcePath), 'utf8');
    const refresh = tags(html, 'meta').find((tag) => attr(tag, 'http-equiv').toLowerCase() === 'refresh');
    const refreshTarget = refresh ? attr(refresh, 'content').replace(/^0;url=/i, '') : '';
    if (!refresh || new URL(refreshTarget, origin).href !== targetUrl.href) {
      errors.push(`Consolidated route must instantly redirect to its selected hub trip: ${sourcePath} -> ${target}`);
    }
    const canonical = tags(html, 'link').find((tag) => attr(tag, 'rel') === 'canonical');
    if (!canonical || attr(canonical, 'href') !== `${origin}${targetUrl.pathname}`) {
      errors.push(`Consolidated route has the wrong hub canonical: ${sourcePath}`);
    }
    if (!tags(html, 'a').some((tag) => new URL(attr(tag, 'href'), origin).href === targetUrl.href)) {
      errors.push(`Consolidated route is missing a fallback link to its selected hub trip: ${sourcePath}`);
    }
  } catch {
    errors.push(`Consolidated route redirect page is missing from the build: ${sourcePath}`);
  }
}
for (const rule of config.routes || []) {
  if (!rule.redirect) continue;
  const target = new URL(rule.redirect, origin);
  if (target.origin !== origin) continue;
  if (sitemapPaths.has(target.pathname)) {
    try { await access(join(root, target.pathname.replace(/^\/+/, ''))); }
    catch { errors.push(`Static sitemap redirect target is missing from the build: ${rule.route} -> ${rule.redirect}`); }
    continue;
  }
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
const routeOptions = listRivers();
const hubBaseline = JSON.parse(await readFile('docs/audits/river-hub-publication-baseline-2026-10-20.json', 'utf8'));
const groupsById = new Map(listRiverGroups().map(group => [group.riverId, group]));
errors.push(...riverHubPublicationErrors(
  [...paths].filter(pathname => /^\/rivers\/by-river\/[^/]+\/$/.test(pathname)).map(pathname => {
    const riverId = pathname.split('/')[3];
    return { riverId, routeSlugs: groupsById.get(riverId)?.routes.map(route => route.slug) ?? [] };
  }),
  hubBaseline.riverIds,
  routeGuidePublicationReviews,
));
const routes = routeOptions.filter((route) => isIndexableRoutePage(route.slug));
const consolidatedRoutes = routeOptions.filter((route) => !isIndexableRoutePage(route.slug));
for (const route of consolidatedRoutes) {
  const pathname = `/rivers/${route.slug}/`;
  if (paths.has(pathname)) errors.push(`Nonindexable trip page must stay out of sitemap: ${pathname}`);
  if (redirects.has(pathname.replace(/\/$/, ''))) errors.push(`Public trip page must not redirect: ${pathname}`);
  try {
    const html = await readFile(fileFor(pathname), 'utf8');
    const robots = tags(html, 'meta').filter(tag => attr(tag, 'name') === 'robots');
    if (robots.length !== 1 || attr(robots[0], 'content') !== 'noindex, follow') errors.push(`Trip page requires noindex, follow: ${pathname}`);
    if (tags(html, 'meta').some(tag => attr(tag, 'http-equiv').toLowerCase() === 'refresh')) errors.push(`Public trip must render details instead of a redirect: ${pathname}`);
    const canonical = tags(html, 'link').filter(tag => attr(tag, 'rel') === 'canonical');
    if (canonical.length !== 1 || attr(canonical[0], 'href') !== `${origin}${pathname}`) errors.push(`Trip page must use its own canonical: ${pathname}`);
    if (!tags(html, 'article').some(tag => attr(tag, 'data-river-slug') === route.slug)) errors.push(`Trip detail page is missing: ${pathname}`);
    if (route.scoreEligibility === 'planning' && (
      /Only a low-water floor is known|We can tell when this route is likely too low/.test(html)
      || !tags(html, 'section').some(tag => attr(tag, 'id') === 'planning-sources')
      || tags(html, 'section').some(tag => attr(tag, 'id') === 'why-this-call')
    )) errors.push(`Planning trip must expose sources without score claims: ${pathname}`);
  } catch { errors.push(`Nonindexable trip page missing from build: ${pathname}`); }
}
const routePaths = routes.map((route) => `/rivers/${route.slug}/`);
const expected = [
  ...routePaths,
  ...listRiverGroups().filter((group) => group.routeCount > 1).map((group) => `/rivers/by-river/${group.riverId}/`),
];
for (const pathname of expected) if (!paths.has(pathname)) errors.push(`Published route/hub absent from sitemap: ${pathname}`);
for (const route of routeOptions) {
  const routePath = `/rivers/${route.slug}/`;
  const hubPath = `/rivers/by-river/${route.riverId}/`;
  if (!paths.has(hubPath)) continue;
  const hubHtml = await readFile(fileFor(hubPath), 'utf8');
  // A map-selection button and inline notes must not replace the HTML link
  // to a standalone route that the hub actually lists in its trip picker.
  const hasTripCard = tags(hubHtml, 'article').some((tag) => attr(tag, 'id') === `trip-${route.slug}`);
  if (hasTripCard && !routeLinks.get(routePath)?.has(hubPath)) {
    errors.push(`River-hub trip card is missing its standalone route link: ${hubPath} -> ${routePath}`);
  }
}
const unlinkedPublicPages = expected.filter((pathname) =>
  ![...(routeLinks.get(pathname) || [])].some((source) => source !== pathname),
);
for (const pathname of unlinkedPublicPages) {
  errors.push(`Public route/hub has no incoming internal link from another sitemap page: ${pathname}`);
}
for (const [pathname, sources] of routeLinks) {
  const redirect = redirects.get(pathname.replace(/\/$/, ''));
  const destination = redirect ? new URL(redirect, origin).pathname : pathname;
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
  status: paths.has(`/rivers/${slug}/`) ? 'published-in-build' : publicTripSlugs.has(slug) ? 'published-noindex-trip' : routePageConsolidationTarget(slug) ? 'retired-redirect' : WITHHELD_ROUTE_SLUGS.has(slug) ? 'withheld-for-coordinate-review' : inventory.has(slug) ? 'not-public-in-current-catalog' : 'absent-from-current-catalog',
}));
const report = {
  generatedAt: new Date().toISOString(),
  origin,
  pages: urls.length,
  publicRouteOptions: routeOptions.length,
  publishedRoutes: routes.length,
  publicTripDetailPages: routeOptions.length,
  noindexTripDetailPages: consolidatedRoutes.length,
  consolidatedRouteOptions: consolidatedRoutes.length,
  checkedRouteLinks: routeLinks.size,
  routeLinkAudit: {
    routesWithNoInternalInlinks: unlinkedRoutePaths.length,
    routesWithoutStateOrRiverHubInlinks: routesWithoutDirectoryInlinks.length,
    sampleRoutesWithNoInternalInlinks: unlinkedRoutePaths.slice(0, 50),
    sampleRoutesWithoutStateOrRiverHubInlinks: routesWithoutDirectoryInlinks.slice(0, 50),
  },
  internallyLinkedPublicPages: expected.length - unlinkedPublicPages.length,
  consolidatedRedirectPages: consolidatedRedirects.length,
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
