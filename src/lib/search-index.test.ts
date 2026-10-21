import { expect, it } from 'vitest';
import { GET } from '../pages/search-index.json';
import { listRivers } from './rivers';
import { routePageHref } from '../data/route-page-consolidations';

it('indexes every public route, including individual Erie Canal planning trips', async () => {
  const items = await GET().json();
  const routes = items.filter((item: { kind: string }) => item.kind === 'route');
  expect(new Set(routes.map((item: { href: string }) => item.href)))
    .toEqual(new Set(listRivers().map(route => routePageHref(route.slug))));
  expect(routes.find((item: { href: string }) => item.href === '/rivers/erie-canal-fairport-bushnells-basin/'))
    .toMatchObject({ kindLabel: 'Planning route', title: 'Erie Canal' });
});
