import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { listRivers, listRiverStateGroups } from './rivers';

it('keeps retired-route redirects unique and directed to published destinations', () => {
  const routing = JSON.parse(readFileSync('staticwebapp.config.json', 'utf8'));
  const destinations = new Set([
    ...listRivers().map(route => `/rivers/${route.slug}/`),
    ...listRiverStateGroups().map(state => `/states/${state.slug}/`),
  ]);
  expect(new Set(routing.routes.map((rule: { route: string }) => rule.route)).size).toBe(routing.routes.length);
  for (const rule of routing.routes.filter((rule: { redirect?: string }) => rule.redirect)) {
    expect(destinations.has(rule.redirect), `Unavailable redirect destination: ${rule.redirect}`).toBe(true);
    expect([301, 302]).toContain(rule.statusCode);
  }
});
