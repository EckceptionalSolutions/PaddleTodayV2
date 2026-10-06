import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { listRivers, listRiverGroups, listRiverStateGroups } from './rivers';

it('keeps retired-route redirects unique and directed to published destinations', () => {
  const routing = JSON.parse(readFileSync('staticwebapp.config.json', 'utf8'));
  const destinations = new Set([
    ...listRivers().map(route => `/rivers/${route.slug}/`),
    ...listRiverGroups().map(group => `/rivers/by-river/${group.riverId}/`),
    ...listRiverStateGroups().map(state => `/states/${state.slug}/`),
    // Authored guide pages are published separately from the route catalog.
    '/guides/minnehaha-creek-paddling/',
  ]);
  // Static Web Apps matches slash variants separately. Both entries are valid
  // when they agree, but duplicate literals and conflicting destinations are not.
  expect(new Set(routing.routes.map((rule: { route: string }) => rule.route)).size).toBe(routing.routes.length);
  const normalizedRules = new Map<string, { redirect?: string; statusCode?: number }>();
  for (const rule of routing.routes) {
    const path = rule.route.replace(/\/$/, '') || '/';
    const previous = normalizedRules.get(path);
    if (previous) {
      expect(rule.redirect, `Conflicting slash redirect: ${path}`).toBe(previous.redirect);
      expect(rule.statusCode, `Conflicting slash status: ${path}`).toBe(previous.statusCode);
    }
    normalizedRules.set(path, rule);
  }
  for (const rule of routing.routes.filter((rule: { redirect?: string }) => rule.redirect)) {
    expect(destinations.has(rule.redirect), `Unavailable redirect destination: ${rule.redirect}`).toBe(true);
    expect([301, 302]).toContain(rule.statusCode);
  }
});
