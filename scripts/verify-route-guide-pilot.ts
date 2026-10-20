import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { routeGuidePublicationReviews } from '../src/data/route-guide-publication-reviews';
import { listRiverGroups } from '../src/lib/rivers';

const origin = 'https://paddletoday.com';
const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
const counts = { hubs: 0, retainedGuides: 0, redirects: 0, preservedTripCards: 0 };
const attribute = (tag: string, name: string) => tag.match(new RegExp(`\\b${name}=("|')(.*?)\\1`, 'i'))?.[2];
for (const review of routeGuidePublicationReviews) {
  const hubPath = `/rivers/by-river/${review.riverId}/`;
  const hub = await readFile(`dist${hubPath}index.html`, 'utf8');
  assert.ok(sitemap.includes(`${origin}${hubPath}</loc>`), `Missing pilot hub: ${hubPath}`);
  assert.ok(hub.includes(review.guide.title), `Missing editorial comparison: ${hubPath}`);
  assert.ok(hub.includes('id="choose-your-reach"'), `Missing visible planning guide: ${hubPath}`);
  for (const route of listRiverGroups().find(group => group.riverId === review.riverId)!.routes) {
    assert.ok(hub.includes(`id="trip-${route.slug}"`), `Missing selected-trip anchor: ${route.slug}`);
    assert.ok(hub.includes(`data-route-slug="${route.slug}"`), `Missing interactive trip card: ${route.slug}`);
    if (review.hubOptions.includes(route.slug)) {
      assert.ok(hub.includes(route.logistics!.shuttle.replace(/&/g, '&amp;')), `Missing shuttle notes: ${route.slug}`);
    }
    counts.preservedTripCards += 1;
  }
  if (review.mode === 'access-planning') {
    assert.ok(hub.includes('Compare access plans'));
    assert.ok(hub.includes('Default order'));
    assert.ok(!hub.includes('>Recommended</option>'));
    if (review.riverId === 'piscataquis-river') assert.ok(!hub.includes('same-river proxy'), 'Piscataquis must not call the Penobscot proxy a same-river station');
  }
  for (const slug of review.retainedGuides) {
    const url = `${origin}/rivers/${slug}/`;
    const html = await readFile(`dist/rivers/${slug}/index.html`, 'utf8');
    assert.ok(sitemap.includes(`${url}</loc>`), `Retained guide absent from sitemap: ${slug}`);
    const canonical = [...html.matchAll(/<link\b[^>]*>/g)].find(tag => attribute(tag[0], 'rel') === 'canonical');
    assert.equal(attribute(canonical![0], 'href'), url);
    assert.ok(!/<meta\b[^>]*http-equiv=["']refresh/i.test(html));
    counts.retainedGuides += 1;
  }
  for (const slug of review.hubOptions) {
    const html = await readFile(`dist/rivers/${slug}/index.html`, 'utf8');
    assert.ok(!sitemap.includes(`${origin}/rivers/${slug}/</loc>`), `Retired guide remains in sitemap: ${slug}`);
    const refresh = [...html.matchAll(/<meta\b[^>]*>/g)].find(tag => attribute(tag[0], 'http-equiv') === 'refresh');
    assert.equal(attribute(refresh![0], 'content'), `0;url=${origin}${hubPath}#trip-${slug}`);
    counts.redirects += 1;
  }
  counts.hubs += 1;
}
console.log(JSON.stringify(counts));
if (process.env.PILOT_VERIFICATION_OUTPUT) {
  await writeFile(process.env.PILOT_VERIFICATION_OUTPUT, `${JSON.stringify(counts, null, 2)}\n`);
}
