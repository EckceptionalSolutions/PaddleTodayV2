import { readFile, writeFile } from 'node:fs/promises';

// Read-only production audit of a Search Console validation CSV export.
// Usage: node scripts/audit-search-console-urls.mjs Table.csv evidence.json
const [input, output] = process.argv.slice(2);
if (!input || !output) throw new Error('Supply the exported CSV and output JSON paths.');
const origin = 'https://paddletoday.com';
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");
const attribute = (tag, name) => decode(tag.match(new RegExp(`\\b${name}=("|')(.*?)\\1`, 'i'))?.[2] || '');
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match => match[0]);
const locations = xml => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decode(match[1]));
const cache = new Map();
function page(url) {
  const target = new URL(url);
  target.hash = '';
  if (!['paddletoday.com', 'www.paddletoday.com'].includes(target.hostname) || target.protocol !== 'https:') {
    throw new Error(`Unexpected audit destination: ${target.href}`);
  }
  if (!cache.has(target.href)) cache.set(target.href, (async () => {
    const response = await fetch(target, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
    return { status: response.status, location: response.headers.get('location'),
      xRobots: response.headers.get('x-robots-tag'), contentType: response.headers.get('content-type'),
      html: await response.text() };
  })());
  return cache.get(target.href);
}

const csv = (await readFile(input, 'utf8')).replace(/^\uFEFF/, '').trim();
// GSC can export historical query URLs as quoted multiline fields.
const records = [];
let record = [], field = '', quoted = false;
for (let i = 0; i < csv.length; i++) {
  const char = csv[i];
  if (char === '"') {
    if (quoted && csv[i + 1] === '"') { field += '"'; i++; }
    else quoted = !quoted;
  } else if (!quoted && (char === ',' || char === '\n')) {
    record.push(field.replace(/\r$/, '')); field = '';
    if (char === '\n') { records.push(record); record = []; }
  } else field += char;
}
record.push(field.replace(/\r$/, '')); records.push(record);
if (quoted || records[0].join(',') !== 'URL,Last crawled,Status') throw new Error('Invalid validation CSV.');
const rows = records.slice(1).map(([url, lastCrawled, validationStatus]) => {
  if (!url || !['Pending', 'Failed', 'Passed', 'Other'].includes(validationStatus)) throw new Error('Invalid validation row.');
  return { url, lastCrawled, validationStatus };
});

async function destinationPage(url) {
  const chain = [];
  let destination = new URL(url);
  for (let hop = 0; hop < 6; hop++) {
    const response = await page(destination);
    chain.push({ url: destination.href, status: response.status, location: response.location });
    if (response.status < 300 || response.status >= 400 || !response.location) return { ...response, chain, destination };
    const next = new URL(response.location, destination);
    if (!next.hash) next.hash = destination.hash;
    destination = next;
  }
  throw new Error(`Too many redirects: ${url}`);
}
const index = await page(`${origin}/sitemap-index.xml`);
if (index.status !== 200) throw new Error(`Sitemap index returned ${index.status}`);
const sitemap = new Set();
for (const url of locations(index.html)) {
  const child = await page(url);
  if (child.status !== 200) throw new Error(`Child sitemap returned ${child.status}: ${url}`);
  for (const value of locations(child.html)) sitemap.add(value);
}
const robots = await page(`${origin}/robots.txt`);
const results = new Array(rows.length);
let next = 0;
await Promise.all(Array.from({ length: 5 }, async () => {
  while (next < rows.length) {
    const i = next++;
    const row = rows[i];
    try {
      const response = await page(row.url);
      const canonicalTags = tags(response.html, 'link').filter(tag => attribute(tag, 'rel') === 'canonical');
      const canonical = canonicalTags.map(tag => attribute(tag, 'href'));
      const metaRobots = tags(response.html, 'meta').filter(tag => /^(robots|googlebot)$/i.test(attribute(tag, 'name')))
        .map(tag => attribute(tag, 'content'));
      const refresh = tags(response.html, 'meta').find(tag => /^refresh$/i.test(attribute(tag, 'http-equiv')));
      const refreshTarget = refresh ? attribute(refresh, 'content').match(/^\s*0\s*;\s*url=(.*)$/i)?.[1] : undefined;
      const result = { ...row, status: response.status, location: response.location, canonical, metaRobots,
        xRobots: response.xRobots, refreshTarget, inSitemap: sitemap.has(row.url),
        title: decode(response.html.match(/<title>([^<]*)<\/title>/i)?.[1] || ''), issues: [] };
      if (response.status >= 300 && response.status < 400 && response.location) {
        result.category = 'http-redirect';
        const target = await destinationPage(new URL(response.location, row.url));
        const { destination } = target;
        result.redirectChain = target.chain;
        result.destinationStatus = target.status;
        if (target.status !== 200) result.issues.push('redirect-destination-not-200');
        if (destination.hash) {
          result.destinationAnchorExists = tags(target.html, '[a-z][a-z0-9-]*').some(tag => attribute(tag, 'id') === decodeURIComponent(destination.hash.slice(1)));
          if (!result.destinationAnchorExists) result.issues.push('missing-destination-anchor');
        }
      } else if (refreshTarget) {
        result.category = 'instant-meta-redirect';
        const target = await destinationPage(new URL(refreshTarget, row.url));
        const { destination } = target;
        result.redirectChain = target.chain;
        result.destinationStatus = target.status;
        if (target.status !== 200) result.issues.push('refresh-destination-not-200');
        if (destination.hash) {
          result.destinationAnchorExists = tags(target.html, '[a-z][a-z0-9-]*').some(tag => attribute(tag, 'id') === decodeURIComponent(destination.hash.slice(1)));
          if (!result.destinationAnchorExists) result.issues.push('missing-destination-anchor');
        }
      } else if (response.status !== 200) {
        result.category = 'unavailable';
        if (result.inSitemap) result.issues.push('sitemap-url-not-200');
      } else if (canonical.length === 1 && canonical[0] === row.url) {
        result.category = 'active-self-canonical';
        if (!result.inSitemap) result.issues.push('active-url-missing-from-sitemap');
        if (/noindex|none/i.test([...metaRobots, response.xRobots || ''].join(','))) result.issues.push('active-url-noindex');
        // Confirm discovery from its declared river hub using ordinary HTML links.
        const hub = tags(response.html, 'a').map(tag => attribute(tag, 'href'))
          .find(href => /^\/rivers\/by-river\/[^/]+\/$/.test(href));
        if (hub && /^\/rivers\/[^/]+\/$/.test(new URL(row.url).pathname)) {
          result.hubUrl = new URL(hub, origin).href;
          const hubPage = await page(result.hubUrl);
          result.hubStatus = hubPage.status;
          result.linkedFromHub = tags(hubPage.html, 'a').some(tag => {
            const href = attribute(tag, 'href');
            const linkedUrl = href ? new URL(href, result.hubUrl) : null;
            return linkedUrl && `${linkedUrl.origin}${linkedUrl.pathname}` === row.url;
          });
          if (!result.linkedFromHub) result.issues.push('missing-hub-link');
        }
      } else {
        result.category = 'alternate-canonical';
        if (result.inSitemap) result.issues.push('sitemap-url-not-self-canonical');
      }
      if (result.inSitemap && result.category !== 'active-self-canonical') result.issues.push('sitemap-non-active-url');
      results[i] = result;
    } catch (error) { results[i] = { ...row, category: 'fetch-error', error: error.message }; }
    if ((i + 1) % 50 === 0) console.log(`Checked ${i + 1}/${rows.length}`);
  }
}));
const count = key => results.reduce((counts, row) => ({ ...counts, [row[key]]: (counts[row[key]] || 0) + 1 }), {});
const evidence = { checkedAt: new Date().toISOString(), source: input, sitemapUrlCount: sitemap.size,
  robots: { status: robots.status, content: robots.html }, validationCounts: count('validationStatus'),
  categoryCounts: count('category'), issueCount: results.filter(row => row.issues?.length).length, results };
await writeFile(output, `${JSON.stringify(evidence, null, 2)}\n`);
console.log(JSON.stringify({ ...evidence, robots: undefined, results: undefined }, null, 2));
if (results.some(row => row.category === 'fetch-error' || row.issues?.length)) process.exitCode = 1;
