export type PresentationRoute = {
  slug: string;
  reach: string;
};

export type RoutePresentationFamily = {
  id: string;
  label: string;
  description: string;
  canonicalSlug: string;
  routeSlugs: string[];
};

export type RoutePresentationFamilyView = RoutePresentationFamily & {
  routes: PresentationRoute[];
  canonicalRoute: PresentationRoute;
};

const marylandPotomacSlugs = [
  'potomac-river-oldtown-paw-paw',
  'potomac-river-paw-paw-bonds',
  'potomac-river-bonds-fifteen-mile-creek',
  'potomac-river-fifteen-mile-creek-hancock',
  'potomac-river-hancock-big-pool',
  'potomac-river-big-pool-williamsport',
  'potomac-river-williamsport-big-slackwater',
  'potomac-river-big-slackwater-taylors',
  'potomac-river-dam-four-shepherdstown',
  'potomac-river-taylors-snyders',
  'potomac-river-shepherdstown-dargan',
  'potomac-river-brunswick-point-of-rocks',
  'potomac-river-point-of-rocks-monocacy',
  'potomac-river-monocacy-edwards',
  'potomac-river-edwards-violettes',
];

const pennsylvaniaSusquehannaSlugs = [
  'susquehanna-river-sayre-towanda',
  'susquehanna-river-sayre-wysox-township-park',
  'susquehanna-river-hornbrook-wysox-township-park',
  'susquehanna-river-ulster-bridge-towanda',
  'susquehanna-river-ulster-bridge-wysox-township-park',
  'susquehanna-river-ulster-bridge-terrytown',
  'susquehanna-river-hornbrook-terrytown',
  'susquehanna-river-towanda-terrytown',
  'susquehanna-river-wysox-township-park-terrytown',
  'susquehanna-river-hornbrook-towanda',
  'susquehanna-river-towanda-laceyville',
  'susquehanna-river-laceyville-west-falls',
  'susquehanna-river-canal-park-wetlands',
  'susquehanna-river-canal-park-test-track',
  'susquehanna-river-test-track-danville',
  'susquehanna-river-pfbc-danville-wrays',
  'susquehanna-river-wrays-shikellamy-west',
  'susquehanna-river-pfbc-danville-shikellamy-west',
  'susquehanna-river-wetlands-bloomsburg',
  'susquehanna-river-pfbc-bloomsburg-montgomery-park',
  'susquehanna-river-test-track-indian-head',
  'susquehanna-river-danville-montgomery-shikellamy-north',
  'susquehanna-river-riverside-borough-shikellamy-north',
];

export const routePresentationFamilies: RoutePresentationFamily[] = [
  {
    id: 'md-potomac-access-ladder',
    label: 'Potomac River access ladder',
    description: 'Distinct Maryland access pairs from Oldtown through the middle Potomac, including dam and portage boundaries.',
    canonicalSlug: 'potomac-river-dam-four-shepherdstown',
    routeSlugs: marylandPotomacSlugs,
  },
  {
    id: 'md-monocacy-access-ladder',
    label: 'Monocacy River access ladder',
    description: 'Three selectable Monocacy reaches with shared water-trail context and route-specific endpoints.',
    canonicalSlug: 'monocacy-river-rocky-ridge-devilbiss',
    routeSlugs: [
      'monocacy-river-rocky-ridge-devilbiss',
      'monocacy-river-devilbiss-gambrill',
      'monocacy-river-gambrill-monocacy-ramp',
    ],
  },
  {
    id: 'md-catoctin-access-ladder',
    label: 'Catoctin Creek access ladder',
    description: 'Two access-pair variants on the Catoctin Creek reach, kept separate because the launch and take-out commitments differ.',
    canonicalSlug: 'catoctin-creek-doubs-meadow-catoctin-park',
    routeSlugs: [
      'catoctin-creek-doubs-meadow-catoctin-park',
      'catoctin-creek-catoctin-park-lander',
    ],
  },
  {
    id: 'md-gunpowder-access-ladder',
    label: 'Gunpowder Falls access ladder',
    description: 'Selectable Gunpowder Falls reaches with route-specific gorge, dam, and take-out guidance retained on each card.',
    canonicalSlug: 'gunpowder-falls-masemore-monkton',
    routeSlugs: [
      'gunpowder-falls-prettyboy-falls-road',
      'gunpowder-falls-masemore-monkton',
      'gunpowder-falls-monkton-phoenix',
    ],
  },
  {
    id: 'pa-susquehanna-access-ladder',
    label: 'Susquehanna River access ladder',
    description: 'The reviewed Pennsylvania Susquehanna access-pair set, presented as selectable trips while preserving gauge and endpoint differences.',
    canonicalSlug: 'susquehanna-river-sayre-towanda',
    routeSlugs: pennsylvaniaSusquehannaSlugs,
  },
  {
    id: 'pa-conodoguinet-access-ladder',
    label: 'Conodoguinet Creek access ladder',
    description: 'Six Cumberland County access-pair variants sharing the same creek access chain; each route remains a separate trip choice.',
    canonicalSlug: 'conodoguinet-creek-willow-mill-vincent-difilippo',
    routeSlugs: [
      'conodoguinet-creek-willow-mill-vincent-difilippo',
      'conodoguinet-creek-willow-mill-good-hope',
      'conodoguinet-creek-vincent-difilippo-good-hope',
      'conodoguinet-creek-vincent-difilippo-acri-meadow',
      'conodoguinet-creek-good-hope-acri-meadow',
      'conodoguinet-creek-willow-mill-acri-meadow',
    ],
  },
];

export function listRoutePresentationFamiliesForState(
  state: string,
  routes: PresentationRoute[],
): RoutePresentationFamilyView[] {
  const availableRoutes = new Map(routes.map((route) => [route.slug, route]));
  const statePrefix = state === 'Maryland' ? 'md' : state === 'Pennsylvania' ? 'pa' : '__none__';
  return routePresentationFamilies
    .filter((family) => family.id.startsWith(`${statePrefix}-`))
    .map((family) => {
      const familyRoutes = family.routeSlugs
        .map((slug) => availableRoutes.get(slug))
        .filter((route): route is PresentationRoute => Boolean(route));
      const canonicalRoute = availableRoutes.get(family.canonicalSlug) ?? familyRoutes[0];
      return canonicalRoute && familyRoutes.length > 1 ? { ...family, routes: familyRoutes, canonicalRoute } : null;
    })
    .filter((family): family is RoutePresentationFamilyView => Boolean(family));
}
