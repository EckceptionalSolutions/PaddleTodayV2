import type { CampingClassification } from './types';

const noCampingPattern =
  /^(none|n\/a)|^no camping\b|no established camping|no on-route camping|no camping noted|no camping is known|no camping is assumed|no camping is part|no camping plan is assumed|no public camping is known|no route camping is indicated|no legal (?:on-route )?(?:camping plan|campsite) is assumed|no on-route legal campsite is assumed|no route-specific river camping is assumed|no on-route overnight plan is assumed|no dependable on-route camping|no simple on-route camping assumption|do not plan (?:on river camping|on camping|to camp)|do not camp|do not assume .*camping|not an overnight route|not tracked yet|not documented|day-use run|daylight (?:day trip|water-trail run)|treat this as (?:a |an )?(?:short |long )?day (?:trip|run|route|float|paddle) unless (?:you )?(?:have|separately|independently)|camping is prohibited|unauthorized camping|no overnight parking/i;

const overnightCapablePattern =
  /overnight-capable|best planned as an overnight|split as an overnight|multi-day|two-day|long day or light overnight|natural overnight/i;

const sandbarPattern =
  /sandbar camping|gravel-bar camping|camp(?:ing)? .*sandbars?|camp(?:ing)? .*gravel bars?|sandbars?.{0,24}(?:camping|campsite|overnight)|gravel bars?.{0,24}(?:camping|campsite|overnight)|islands and sandbars.*camp/i;

const onRoutePattern =
  /watercraft campsites?|campsites? along|canoe camps?|paddle-in camping|backcountry canoe campsite|riverside campsites?|primitive first-come|float camps?|designated campsites?|campsites? at river mile/i;

const endpointPattern =
  /campground at the (put-in|take-out)|at the put-in|at the take-out|put-in.*campground|take-out.*campground|landing.*campground|campground.*landing|access.*campground|campground.*access|campground.*(put-in|take-out)|primitive camping at the .* (put-in|take-out)/i;

const nearbyPattern =
  /nearby .*camp|camp.*nearby|campgrounds? nearby|camping support|campground support|camping anchor|campground facilities|camping options|camping context|campground context|camping by reservation|separate .*camp(?:ing|ground|site)|base-?camp|staging option|has .*campground|campground and lodging|seasonal camping|state-park reservation|park has .*camping|reserve or confirm camping|reserve or arrange camping/i;

const explicitNoCampingPattern = /do not assume .*camping|treat this as (?:a |an )?(?:short |long )?day (?:trip|run|route|float|paddle) unless camping is separately confirmed/i;

export function classifyCamping(camping: string | null | undefined): CampingClassification {
  const text = camping?.trim() ?? '';

  if (!text) {
    return 'unknown';
  }

  if (explicitNoCampingPattern.test(text)) {
    return 'none';
  }

  if (overnightCapablePattern.test(text)) {
    return 'overnight_capable';
  }

  if (sandbarPattern.test(text)) {
    return 'sandbar_or_gravel_bar';
  }

  if (onRoutePattern.test(text)) {
    return 'on_route_campsite';
  }

  if (endpointPattern.test(text)) {
    return 'endpoint_campground';
  }

  if (nearbyPattern.test(text)) {
    return 'nearby_basecamp';
  }

  if (noCampingPattern.test(text)) {
    return 'none';
  }

  return 'unknown';
}

export function hasOvernightCampingSupport(classification: CampingClassification | null | undefined) {
  return (
    classification === 'overnight_capable' ||
    classification === 'on_route_campsite' ||
    classification === 'sandbar_or_gravel_bar'
  );
}

export function hasCampingSupport(classification: CampingClassification | null | undefined) {
  return hasOvernightCampingSupport(classification) || classification === 'endpoint_campground' || classification === 'nearby_basecamp';
}
