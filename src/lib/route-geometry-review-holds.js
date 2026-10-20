// The previous line began at Bissonette Bridge, not the named Churchill launch.
// Keep facility planning available while a complete replacement trace is reviewed.
// Source: docs/audits/allagash-named-access-review-2026-10-20.json.
export const routeGeometryReviewHolds = new Map([
  ['saco-river-route-160-brownfield', 'Route line and GPX withheld: legacy named hydrography consists of disconnected fragments and does not establish the full Swan’s Falls–Brownfield corridor. Facility pins remain available.'],
  ['allagash-river-churchill-dam-umsaskis', 'Route line and GPX withheld: the former line started at Bissonette Bridge. Corrected Churchill launch and Umsaskis facility locations are shown; a complete replacement corridor remains under review.'],
]);

export function isRouteGeometryHeld(routeId) {
  return routeGeometryReviewHolds.has(routeId);
}
