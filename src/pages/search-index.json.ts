import { listRiverGroups, listScoredRivers } from '../lib/rivers';

export const prerender = true;

export function GET() {
  const routeItems = listScoredRivers()
    .map((river) => ({
      kind: 'route',
      kindLabel: river.scoreEligibility === 'planning' ? 'Planning route' : 'Scored route',
      title: river.name,
      subtitle: river.scoreEligibility === 'planning' ? `${river.reach} · Planning route` : river.reach,
      meta: [river.region, river.state].filter(Boolean).join(' / '),
      href: `/rivers/${river.slug}/`,
      searchText: [river.name, river.reach, ...(river.aliases ?? []), river.region, river.state].filter(Boolean).join(' '),
    }))
    .sort((left, right) => left.title.localeCompare(right.title));

  const riverItems = listRiverGroups()
    .map((group) => {
      const scoredRouteCount = group.routes.filter((route) => route.scoreEligibility === 'scored').length;
      const planningRouteCount = group.routes.length - scoredRouteCount;
      const routeLabel = `${group.routeCount} ${group.routeCount === 1 ? 'route' : 'routes'}`;
      const coverageLabel = planningRouteCount > 0
        ? `${scoredRouteCount} scored · ${planningRouteCount} planning`
        : `${scoredRouteCount} scored`;

      return {
        kind: 'river',
        kindLabel: 'River',
        title: group.name,
        subtitle: `${routeLabel} · ${coverageLabel}`,
        meta: group.states.join(' / '),
        href:
          group.routeCount > 1
            ? `/rivers/by-river/${group.riverId}/`
            : `/rivers/${group.routes[0]?.slug ?? group.riverId}/`,
        searchText: [
          group.name,
          ...group.states,
          ...group.regions,
          ...group.routes.map((route) => route.reach),
          ...group.routes.flatMap((route) => route.aliases ?? []),
        ]
          .filter(Boolean)
          .join(' '),
      };
    })
    .sort((left, right) => left.title.localeCompare(right.title));

  return new Response(JSON.stringify([...riverItems, ...routeItems]), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=300',
    },
  });
}
