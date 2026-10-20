import type { River } from './types';

export type RouteValidationDeferralCategory = 'Distance' | 'Coordinate';

export interface PlanningValidationDeferral {
  routeId: string;
  category: RouteValidationDeferralCategory;
  reason: string;
  evidence: string;
}

/**
 * Planning routes are catalogued for discovery before their source package is
 * strong enough for a scored day-route claim. Their access anchors and schema
 * still receive universal validation, while mileage assertions wait for a
 * source review that can resolve map, tide, channel, or staging details.
 */
export function isPlanningDistanceDeferred(distanceLabel: string | undefined) {
  if (!distanceLabel) return true;

  return /map|chart|tide|condition|exact distance|distance.*control|control.*distance|(?:does not|doesn't) publish.*mileage|mileage.*(?:not|does not|doesn't) publish/i.test(
    distanceLabel,
  );
}

export function isPlanningCoordinateDeferred(distanceLabel: string | undefined) {
  // Planning status alone cannot excuse a numeric distance that contradicts
  // its endpoints. Variable source/map mileage still needs separate review.
  return isPlanningDistanceDeferred(distanceLabel);
}

export function isStagedDistanceLabel(distanceLabel: string | undefined) {
  return /multi[- ]day|staged|sectioned|split(?: into)?(?: \d+[-–]\d+)? day|day sections|\b[2-9]\d*\s*days?\b/i.test(distanceLabel ?? '');
}

export function areDocumentedRouteAlternatives(left: River, right: River) {
  return Boolean(left.consolidation?.group === right.consolidation?.group
    && left.consolidation?.role === 'alternative'
    && right.consolidation?.role === 'alternative'
    && left.consolidation.relatedRouteIds.includes(right.id)
    && right.consolidation.relatedRouteIds.includes(left.id));
}
