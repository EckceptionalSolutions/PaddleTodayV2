/** Keep a river-family label independent of whichever branch route sorts first. */
export function riverGroupName(riverId: string, routes: readonly { name: string }[]) {
  const fallback = routes[0]?.name ?? riverId;
  if (!routes.some(route => /\b(?:branch|fork)\b/i.test(route.name))) return fallback;

  // Use an existing route's exact family identity, never an invented name or
  // an inferred decision to merge unrelated tributaries or condition zones.
  const family = routes.find(route => route.name.trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') === riverId);
  return family?.name ?? fallback;
}
