const willimanticRouteSlugs = [
  'willimantic-river-commuter-nye-holman',
  'willimantic-river-nye-holman-heron-cove',
  'willimantic-river-heron-cove-pecks-mill',
  'willimantic-river-pecks-mill-merrow-meadow',
  'willimantic-river-merrow-river-park',
  'willimantic-river-river-park-eagleville-lake',
  'willimantic-river-eagleville-route-66',
  'willimantic-river-commuter-heron-cove',
  'willimantic-river-commuter-pecks-mill',
  'willimantic-river-commuter-merrow-meadow',
  'willimantic-river-commuter-river-park',
  'willimantic-river-commuter-eagleville-lake',
  'willimantic-river-nye-holman-pecks-mill',
  'willimantic-river-nye-holman-merrow-meadow',
  'willimantic-river-nye-holman-river-park',
  'willimantic-river-heron-cove-merrow-meadow',
  'willimantic-river-heron-cove-river-park',
  'willimantic-river-nye-holman-eagleville-lake',
  'willimantic-river-heron-cove-eagleville-lake',
  'willimantic-river-pecks-mill-river-park',
  'willimantic-river-pecks-mill-eagleville-lake',
  'willimantic-river-merrow-eagleville-lake',
  'willimantic-river-river-park-eagleville-downstream',
  'willimantic-river-merrow-eagleville-downstream',
  'willimantic-river-heron-cove-eagleville-downstream',
  'willimantic-river-pecks-mill-eagleville-downstream',
  'willimantic-river-nye-holman-eagleville-downstream',
  'willimantic-river-commuter-eagleville-downstream',
  'willimantic-river-commuter-route-66',
  'willimantic-river-nye-holman-route-66',
  'willimantic-river-heron-cove-route-66',
  'willimantic-river-pecks-mill-route-66',
  'willimantic-river-merrow-route-66',
  'willimantic-river-river-park-route-66',
] as const;

const willimanticHubPath = '/rivers/by-river/willimantic-river-connecticut/';

const consolidatedRouteTargets = new Map<string, string>(
  willimanticRouteSlugs.map((slug) => [slug, `${willimanticHubPath}#trip-${slug}`]),
);

export function routePageConsolidationTarget(slug: string): string | undefined {
  return consolidatedRouteTargets.get(slug);
}

/** Build a route link while keeping planner selections on the consolidated hub URL. */
export function routePageHref(slug: string, params = new URLSearchParams()): string {
  const target = routePageConsolidationTarget(slug);
  const query = params.size ? `?${params.toString()}` : '';
  if (!target) return `/rivers/${encodeURIComponent(slug)}/${query}`;

  const hashIndex = target.indexOf('#');
  const pathname = hashIndex >= 0 ? target.slice(0, hashIndex) : target;
  const hash = hashIndex >= 0 ? target.slice(hashIndex) : '';
  return `${pathname}${query}${hash}`;
}

export function hasStandaloneRoutePage(slug: string): boolean {
  return !consolidatedRouteTargets.has(slug);
}

export function listRoutePageConsolidations() {
  return [...consolidatedRouteTargets.entries()].map(([slug, target]) => ({ slug, target }));
}
