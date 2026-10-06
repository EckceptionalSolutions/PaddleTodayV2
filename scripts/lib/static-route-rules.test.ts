import { expect, it } from 'vitest';
import { staticRoutePatternErrors } from './static-route-rules';

const redirect = { route: '/rivers/retired', redirect: '/guides/current/', statusCode: 301 };

it('rejects explicit slash variants even when redirect and status agree', () => {
  expect(staticRoutePatternErrors([redirect, { ...redirect, route: redirect.route + '/' }])).toHaveLength(1);
});

it('allows distinct route patterns to share a destination', () => {
  expect(staticRoutePatternErrors([redirect, { ...redirect, route: '/rivers/another-retired' }])).toEqual([]);
});

it('rejects duplicate literal paths even with identical destinations', () => {
  expect(staticRoutePatternErrors([redirect, redirect])).toHaveLength(1);
});

it('rejects conflicting slash destinations', () => {
  expect(staticRoutePatternErrors([redirect, { ...redirect, route: redirect.route + '/', redirect: '/other/' }])).toHaveLength(1);
});

it('rejects conflicting slash status codes', () => {
  expect(staticRoutePatternErrors([redirect, { ...redirect, route: redirect.route + '/', statusCode: 302 }])).toHaveLength(1);
});

it('does not allow normalized duplicates without an explicit redirect', () => {
  expect(staticRoutePatternErrors([{ route: '/page' }, { route: '/page/' }])).toHaveLength(1);
});
