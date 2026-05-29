import {
  buildTodayBoardSnapshot,
  compareTodayBoardQuality,
  compareTodayScoreThenConfidence,
  todayBoardRank,
  type RiverSummaryApiItem,
} from '@paddletoday/api-contract';
import {
  distanceMiles,
  distancePenalty,
  estimateTravelMinutes,
  type StoredLocation,
} from './location';

export interface NearbyRiverPick extends RiverSummaryApiItem {
  distanceMiles: number;
  travelMinutes: number;
  effectiveScore: number;
}

export function selectBestNowPicks(
  rivers: RiverSummaryApiItem[],
  location: StoredLocation | null | undefined,
  limit = 5
) {
  const scored = location
    ? withTravelContext(rivers, location)
    : rivers;

  return [...scored]
    .sort((left, right) => {
      const leftRank = bestNowRank(left);
      const rightRank = bestNowRank(right);
      if (leftRank !== rightRank) {
        return rightRank - leftRank;
      }

      return compareScoreThenConfidence(left, right);
    })
    .slice(0, limit);
}

export function selectTopPicks(rivers: RiverSummaryApiItem[], limit = 5) {
  return [...rivers].sort(compareRivers).slice(0, limit);
}

export function selectNearbyPicks(
  rivers: RiverSummaryApiItem[],
  location: StoredLocation,
  limit = 5
): NearbyRiverPick[] {
  return withTravelContext(rivers, location)
    .filter((river) => river.travelMinutes <= 180)
    .sort((left, right) => {
      if (left.effectiveScore !== right.effectiveScore) {
        return right.effectiveScore - left.effectiveScore;
      }

      if (left.travelMinutes !== right.travelMinutes) {
        return left.travelMinutes - right.travelMinutes;
      }

      return compareRivers(left, right);
    })
    .slice(0, limit);
}

function withTravelContext(rivers: RiverSummaryApiItem[], location: StoredLocation): NearbyRiverPick[] {
  return rivers.map((river) => {
    const miles = distanceMiles(
      location.latitude,
      location.longitude,
      river.river.latitude,
      river.river.longitude
    );
    const travelMinutes = estimateTravelMinutes(miles);
    return {
      ...river,
      distanceMiles: miles,
      travelMinutes,
      effectiveScore: river.score - distancePenalty(travelMinutes),
    };
  });
}

export function buildBoardSnapshot(rivers: RiverSummaryApiItem[]) {
  return buildTodayBoardSnapshot(rivers);
}

function compareRivers(left: RiverSummaryApiItem, right: RiverSummaryApiItem) {
  return compareTodayBoardQuality(left, right);
}

function bestNowRank(river: RiverSummaryApiItem | NearbyRiverPick) {
  const travelPenalty = 'travelMinutes' in river ? distancePenalty(river.travelMinutes) : 0;
  return todayBoardRank(river, travelPenalty);
}

function compareScoreThenConfidence(left: RiverSummaryApiItem, right: RiverSummaryApiItem) {
  return compareTodayScoreThenConfidence(left, right);
}
