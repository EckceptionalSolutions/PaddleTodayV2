import type { RiverSummaryApiItem, WeekendSummaryApiItem } from '@paddletoday/api-contract';
import { formatTravelTime } from './location';

type FactRiver = RiverSummaryApiItem['river'] | WeekendSummaryApiItem['river'];

interface RouteFactOptions {
  travelMinutes?: number | null;
  includePaddleTime?: boolean;
  includeNoCamping?: boolean;
  campingAvailableLabel?: string;
}

export function routeFactItems(river: FactRiver, options: RouteFactOptions = {}) {
  return [
    travelFact(options.travelMinutes),
    river.distanceLabel || null,
    options.includePaddleTime ? river.estimatedPaddleTime || null : null,
    difficultyFact(river),
    campingFact(river, options),
  ].filter(Boolean) as string[];
}

export function routeFactLine(river: FactRiver, options: RouteFactOptions = {}) {
  return routeFactItems(river, options).slice(0, 3).join(' - ');
}

function travelFact(minutes: number | null | undefined) {
  return typeof minutes === 'number' && Number.isFinite(minutes) ? formatTravelTime(minutes) : null;
}

function difficultyFact(river: FactRiver) {
  return river.difficulty ? `${capitalize(river.difficulty)} difficulty` : null;
}

function campingFact(river: FactRiver, options: RouteFactOptions) {
  const classification = river.logistics?.campingClassification;
  if (!classification || classification === 'unknown') return null;
  if (classification === 'none') {
    return options.includeNoCamping ? 'No camping noted' : null;
  }

  if (options.campingAvailableLabel) return options.campingAvailableLabel;
  if (classification === 'nearby_basecamp') return 'Camp nearby';
  if (classification === 'endpoint_campground') return 'Campground access';
  if (classification === 'sandbar_or_gravel_bar') return 'Sandbar camping';
  return 'Overnight-friendly';
}

function capitalize(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}
