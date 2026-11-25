import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { listRiverGroups } from '../src/lib/rivers';
import { riverOutfitterReviews } from '../src/data/river-outfitters';
import { routeGuideReviewByRiverId } from '../src/data/route-guide-publication-reviews';

// Run with tsx. Use --pending to list outstanding reviews, --require-complete
// to enforce catalog coverage, or a local Astro origin to check rendered links.
const args = process.argv.slice(2);
const origin = args.find(arg => /^https?:\/\//.test(arg));
const groups = listRiverGroups();
const reviewedIds = Object.keys(riverOutfitterReviews);
const pending = groups.filter(group => !reviewedIds.includes(group.riverId));
if (args.includes('--require-complete')) {
  assert.equal(pending.length, 0, 'Unreviewed rivers: ' + pending.map(group => group.riverId).join(', '));
}
const pages = new Map<string, string[]>();
let operators = 0;
let withoutMatch = 0;

for (const [id, review] of Object.entries(riverOutfitterReviews)) {
  const group = groups.find(candidate => candidate.riverId === id);
  assert.ok(group, 'Unknown reviewed river ' + id);
  const entries = 'outfitters' in review ? review.outfitters : [];
  if ('noMatch' in review) {
    assert.ok(review.noMatch.trim() && review.sources.length, id);
    withoutMatch++;
  } else {
    assert.ok(entries.length, id);
  }
  operators += entries.length;
  const hasHub = group.routeCount > 1 || id === 'saluda-river' || routeGuideReviewByRiverId.has(id);
  if (hasHub) pages.set('/rivers/by-river/' + id + '/', entries.map(operator => operator.url));
  for (const operator of entries) {
    assert.equal(new URL(operator.url).protocol, 'https:', operator.name);
    assert.ok(hasHub || operator.routes.length, 'No published placement for ' + operator.name);
    for (const slug of operator.routes) {
      assert.ok(group.routes.some(route => route.slug === slug), 'Mismatched route ' + slug);
    }
  }
  for (const route of group.routes) {
    pages.set('/rivers/' + route.slug + '/', entries.filter(operator => operator.routes.includes(route.slug)).map(operator => operator.url));
  }
}

if (origin) {
  const browser = await chromium.launch({ channel: process.platform === 'win32' ? 'msedge' : undefined });
  try {
    const remaining = pages.entries();
    async function checkPages() {
      const page = await browser.newPage({ javaScriptEnabled: false });
      for (const [path, expected] of remaining) {
        const response = await page.goto(new URL(path, origin).href, { waitUntil: 'commit' });
        assert.equal(response?.status(), 200, path);
        await page.waitForLoadState('domcontentloaded');
        const links = page.locator('section[aria-labelledby="local-outfitters"] a[href^="http"]');
        assert.deepEqual(await links.evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))), expected, path);
      }
    }
    await Promise.all(Array.from({ length: 4 }, checkPages));
  } finally {
    await browser.close();
  }
  console.log('Checked rendered outfitter links on', pages.size, 'pages.');
}

const linkedPages = [...pages].filter(([, urls]) => urls.length);
const linkedHubs = linkedPages.filter(([path]) => path.startsWith('/rivers/by-river/')).length;
console.log({
  rivers: groups.length, reviewed: reviewedIds.length, pending: pending.length, withoutMatch,
  operatorListings: operators, linkedHubs, linkedRoutes: linkedPages.length - linkedHubs,
});
if (args.includes('--pending')) {
  for (const group of pending) console.log(group.riverId, group.name, group.states.join(', '));
}
