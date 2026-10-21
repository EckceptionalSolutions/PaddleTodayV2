// The previous line began at Bissonette Bridge, not the named Churchill launch.
// Keep facility planning available while a complete replacement trace is reviewed.
// Source: docs/audits/allagash-named-access-review-2026-10-20.json.
export const routeGeometryReviewHolds = new Map([
  ['cahaba-river-old-overton-highway-280', 'The route line and GPX download are unavailable while we correct the map. The old line went past the Highway 280 take-out toward the dam. The take-out marker shows the manager’s access location; identify the landing upstream of the dam before launch.'],
  ['saco-river-route-160-brownfield', 'The route line and GPX download are unavailable because we have not confirmed a complete river path from Swan’s Falls to Brownfield. Launch and take-out markers are shown.'],
  ['allagash-river-churchill-dam-umsaskis', 'The route line and GPX download are unavailable while we correct the map. The old line started at Bissonette Bridge instead of Churchill Dam. The corrected launch and take-out markers are shown.'],
]);

export function isRouteGeometryHeld(routeId) {
  return routeGeometryReviewHolds.has(routeId);
}
