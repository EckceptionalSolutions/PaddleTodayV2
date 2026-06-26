import type { RiverDetailApiResult, RiverSummaryApiItem, WeekendSummaryApiItem } from '@paddletoday/api-contract';
import { normalizeApiText } from './format';
import { formatTravelTime } from './location';

type FactRiver = RiverSummaryApiItem['river'] | WeekendSummaryApiItem['river'] | RiverDetailApiResult['river'];

interface RouteFactOptions {
  travelMinutes?: number | null;
  includePaddleTime?: boolean;
  includeNoCamping?: boolean;
  campingAvailableLabel?: string;
}

interface RoutePreviewFactOptions extends RouteFactOptions {
  driveDistanceLabel?: string | null;
  maxItems?: number;
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

export function routePreviewFactItems(river: FactRiver, options: RoutePreviewFactOptions = {}) {
  const maxItems = options.maxItems ?? 3;
  const facts = [
    ...routeFactItems(river, {
      ...options,
      includePaddleTime: options.includePaddleTime ?? true,
    }),
    options.driveDistanceLabel,
  ].filter(Boolean) as string[];

  return uniqueFacts(facts).slice(0, maxItems);
}

export function routePreviewFactLine(river: FactRiver, options: RoutePreviewFactOptions = {}) {
  return routePreviewFactItems(river, options).join(' - ');
}

export function routeDecisionLine(rating: string, explanation: string | null | undefined) {
  return `${rating}: ${normalizeApiText(explanation)}`;
}

function travelFact(minutes: number | null | undefined) {
  return typeof minutes === 'number' && Number.isFinite(minutes) ? formatTravelTime(minutes) : null;
}

function difficultyFact(river: FactRiver) {
  const difficulty = 'difficulty' in river ? river.difficulty : river.profile.difficulty;
  return difficulty ? `${capitalize(difficulty)} difficulty` : null;
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

function uniqueFacts(facts: string[]) {
  const seen = new Set<string>();
  return facts.filter((fact) => {
    const key = fact.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
