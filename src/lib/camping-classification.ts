import type { CampingClassification } from './types';

const noCampingPattern =
  /^(none|no\b|n\/a)|no established camping|no on-route camping|no camping noted|no camping is known|do not plan to camp|do not camp|no route camping is indicated|camping is not confirmed|not tracked yet|not documented/i;

const overnightCapablePattern =
  /overnight-capable|best planned as an overnight|split as an overnight|multi-day|two-day|long day or light overnight|natural overnight/i;

const sandbarPattern =
  /sandbar camping|sandbars?|gravel-bar camping|gravel bars?|islands and sandbars/i;

const onRoutePattern =
  /watercraft campsites?|campsites? along|canoe camps?|paddle-in camping|backcountry canoe campsite|riverside campsites?|primitive first-come|float camps?|designated campsites?|campsites? at river mile/i;

const endpointPattern =
  /campground at the (put-in|take-out)|at the put-in|at the take-out|put-in.*campground|take-out.*campground|landing.*campground|campground.*landing|access.*campground|campground.*access/i;

const nearbyPattern =
  /nearby .*camp|campgrounds? nearby|campground support|camping anchor|campground facilities|camping options|camping context|campground context|camping by reservation|separate .*camping|base-?camp|staging option/i;

export function classifyCamping(camping: string | null | undefined): CampingClassification {
  const text = camping?.trim() ?? '';

  if (!text) {
    return 'unknown';
  }

  if (noCampingPattern.test(text)) {
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
