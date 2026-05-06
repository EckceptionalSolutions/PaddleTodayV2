import type { RiverSummaryApiItem, WeekendSummaryApiItem } from '@paddletoday/api-contract';
import { normalizeApiText } from './format';
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
  const camping = normalizeApiText(river.logistics?.camping);
  if (!camping) return null;
  if (/^(none|no )/i.test(camping)) {
    return options.includeNoCamping ? 'No camping noted' : null;
  }

  return options.campingAvailableLabel ?? 'Camping possible';
}

function capitalize(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}
