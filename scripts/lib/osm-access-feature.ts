export type OsmAccessFeatureKind =
  | 'waterway-access-point'
  | 'slipway'
  | 'canoe-access'
  | 'whitewater-put-in'
  | 'road-bridge'
  | 'parking'
  | 'other';

/**
 * Classifies actual access features, not merely navigable water.
 *
 * In OSM, canoe=yes/designated on a river or waterway link describes a
 * navigation permission or route. It does not identify a launch coordinate.
 * Only the explicit canoe put_in/egress values are treated as point access
 * evidence; general canoe permissions remain contextual and review-only.
 */
export function osmAccessFeatureKind(tags: Record<string, string>): OsmAccessFeatureKind {
  if (tags.waterway === 'access_point') return 'waterway-access-point';
  if (tags.leisure === 'slipway') return 'slipway';
  if (tags.whitewater === 'put_in') return 'whitewater-put-in';
  if (tags.canoe && /(?:^|[:;,_-])(?:put_in|egress)(?:$|[:;,_-])/.test(tags.canoe)) return 'canoe-access';
  if (tags.bridge && tags.highway) return 'road-bridge';
  if (tags.amenity === 'parking') return 'parking';
  return 'other';
}
