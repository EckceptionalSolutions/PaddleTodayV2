import { formatRouteSegmentLabel } from '../lib/route-segments.ts';
import {
  groupRoutesByConditionScore,
  routesForRiverItem,
} from '../lib/river-coverage.js';
import { isGroupedItem, joinWithBullet } from './board-domain.js';
import { confidenceDisplayLabel } from './ui-taxonomy.js';
import { mapCallLabelForRating } from './map-runtime.js';

export function createBoardMapModel({
  groupRouteQualifier = 'shown',
  includeSetupRepresentative = false,
} = {}) {
  const mapMarkerLabel = (item) => String(item.cardRoute.score);
  const visibleMapMarkerLabel = (item) => mapMarkerLabel(item);

  const routeCountLabel = (item) => `${item.totalRouteCount} routes on this river`;

  const representativeRouteLabel = (item) => {
    const prefix = item.representativeMode === 'nearest'
      ? 'Nearest route'
      : includeSetupRepresentative && item.representativeMode === 'setup'
        ? 'Route for your setup'
        : 'Best route';
    return `${prefix}: ${item.cardRoute.river.reach}`;
  };

  const routeLabelForItem = (item) =>
    isGroupedItem(item) ? routeCountLabel(item) : item.cardRoute.river.reach;

  const segmentLabelForItem = (item) =>
    formatRouteSegmentLabel(item.segmentSummary, item.selectedSegment)
      || (isGroupedItem(item) ? representativeRouteLabel(item) : '');

  const featuredRouteLabelForItem = (item) =>
    isGroupedItem(item)
      ? joinWithBullet([routeCountLabel(item), representativeRouteLabel(item)])
      : routeLabelForItem(item);

  const mapMarkerContext = (item) => {
    if (!isGroupedItem(item)) {
      return mapCallLabelForRating(item.cardRoute.rating);
    }

    const routes = routesForRiverItem(item);
    const matchingCount = routes.length || item.matchingRouteCount || item.totalRouteCount;
    const zoneCount = groupRoutesByConditionScore(routes).length;
    return `${matchingCount} ${groupRouteQualifier} ${matchingCount === 1 ? 'route' : 'routes'} · ${zoneCount} score ${zoneCount === 1 ? 'zone' : 'zones'}`;
  };

  const mapMarkerAriaLabel = (item) => {
    if (!isGroupedItem(item)) {
      return `${item.cardRoute.river.name}: score ${item.cardRoute.score}, ${confidenceDisplayLabel(item.cardRoute.confidence.label).toLowerCase()}`;
    }

    return `${item.cardRoute.river.name}: ${mapMarkerContext(item)}. Select to reveal full coverage and zone scores.`;
  };

  return Object.freeze({
    featuredRouteLabelForItem,
    mapMarkerAriaLabel,
    mapMarkerContext,
    mapMarkerLabel,
    representativeRouteLabel,
    routeCountLabel,
    routeLabelForItem,
    segmentLabelForItem,
    visibleMapMarkerLabel,
  });
}

export function featuredMapCaptionText(accessPoints) {
  if (!Array.isArray(accessPoints) || accessPoints.length === 0) {
    return '';
  }

  const putIn = accessPoints.find((point) => point.kind === 'putIn');
  const takeOut = accessPoints.find((point) => point.kind === 'takeOut');

  if (putIn && takeOut) {
    return `${putIn.name} / ${takeOut.name}`;
  }

  const point = accessPoints[0];
  return `${point.kind === 'putIn' ? 'Put-in' : 'Take-out'}: ${point.name}`;
}
