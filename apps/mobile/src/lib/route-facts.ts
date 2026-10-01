import { parsePaddleTimeHours, type RiverDetailApiResult, type RiverSummaryApiItem, type WeekendSummaryApiItem } from '@paddletoday/api-contract';
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

  return uniqueFacts(facts.map(fact => fact === river.estimatedPaddleTime ? compactPaddleTime(fact) : fact)).slice(0, maxItems);
}

export function routePreviewFactLine(river: FactRiver, options: RoutePreviewFactOptions = {}) {
  return routePreviewFactItems(river, options).join(' - ');
}

export function routeDecisionLine(explanation: string | null | undefined) {
  return normalizeApiText(explanation);
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

/** Keep the duration small enough for a chip; render the original explanation nearby. */
export function compactPaddleTime(value: string | null | undefined): string {
  const text = normalizeApiText(value);
  const range = parsePaddleTimeHours(text);
  if (!range) return text;
  const duration = (hours: number) => {
    const minutes = Math.round(hours * 60);
    const wholeHours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return wholeHours ? `${wholeHours}h${remainingMinutes ? ` ${remainingMinutes}m` : ''}` : `${minutes}m`;
  };
  return range.min === range.max ? duration(range.min) : `${duration(range.min)}–${duration(range.max)}`;
}
