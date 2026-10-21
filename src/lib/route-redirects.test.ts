import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { listRivers, listRiverGroups, listRiverStateGroups } from './rivers';
import { listRoutePageConsolidations } from '../data/route-page-consolidations';
import { staticRoutePatternErrors } from '../../scripts/lib/static-route-rules';

it('keeps retired-route redirects unique and directed to published destinations', () => {
  const routing = JSON.parse(readFileSync('staticwebapp.config.json', 'utf8'));
  const destinations = new Set([
    ...listRivers().map(route => `/rivers/${route.slug}/`),
    ...listRiverGroups().map(group => `/rivers/by-river/${group.riverId}/`),
    ...listRiverStateGroups().map(state => `/states/${state.slug}/`),
    ...listRoutePageConsolidations().map(({ target }) => target),
    // Astro's sitemap integration emits these XML destinations outside the page catalog.
    '/sitemap-index.xml',
    '/sitemap-0.xml',
    // Authored guide pages are published separately from the route catalog.
    '/guides/minnehaha-creek-paddling/',
  ]);
  expect(staticRoutePatternErrors(routing.routes)).toEqual([]);
  for (const rule of routing.routes.filter((rule: { redirect?: string }) => rule.redirect)) {
    expect(destinations.has(rule.redirect), `Unavailable redirect destination: ${rule.redirect}`).toBe(true);
    expect([301, 302]).toContain(rule.statusCode);
  }
});

it('does not redirect any supported trip away from its detail page', () => {
  const routing = JSON.parse(readFileSync('staticwebapp.config.json', 'utf8'));
  for (const route of listRivers()) for (const rule of routing.routes) {
    if (!rule.redirect) continue;
    const path = `/rivers/${route.slug}`;
    const pattern = rule.route.replace(/\/$/, '');
    const matches = pattern.endsWith('*') ? path.startsWith(pattern.slice(0, -1)) : path === pattern;
    expect(matches, `Supported trip ${route.slug} is intercepted by ${rule.route}`).toBe(false);
  }
});
