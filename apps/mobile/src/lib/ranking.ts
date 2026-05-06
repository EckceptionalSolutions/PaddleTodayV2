import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import {
  distanceMiles,
  distancePenalty,
  estimateTravelMinutes,
  type StoredLocation,
} from './location';

const statusWeight = {
  live: 2,
  degraded: 1,
  offline: 0,
};

const confidenceWeight = {
  High: 3,
  Medium: 2,
  Low: 1,
};

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
  return {
    paddleable: rivers.filter((river) => river.rating === 'Strong' || river.rating === 'Good').length,
    watch: rivers.filter((river) => river.rating === 'Fair').length,
    skip: rivers.filter((river) => river.rating === 'No-go').length,
    highConfidence: rivers.filter((river) => river.confidence.label === 'High').length,
  };
}

function compareRivers(left: RiverSummaryApiItem, right: RiverSummaryApiItem) {
  const leftStatus = statusWeight[left.liveData.overall] ?? 0;
  const rightStatus = statusWeight[right.liveData.overall] ?? 0;
  if (leftStatus !== rightStatus) {
    return rightStatus - leftStatus;
  }

  const leftConfidence = confidenceWeight[left.confidence.label] ?? 0;
  const rightConfidence = confidenceWeight[right.confidence.label] ?? 0;
  if (leftConfidence !== rightConfidence) {
    return rightConfidence - leftConfidence;
  }

  return right.score - left.score;
}

function bestNowRank(river: RiverSummaryApiItem | NearbyRiverPick) {
  const confidenceBonus = (confidenceWeight[river.confidence.label] ?? 0) * 4;
  const travelPenalty = 'travelMinutes' in river ? distancePenalty(river.travelMinutes) : 0;
  const statusPenalty = river.liveData.overall === 'offline' ? 12 : river.liveData.overall === 'degraded' ? 4 : 0;
  return river.score + confidenceBonus - travelPenalty - statusPenalty;
}

function compareScoreThenConfidence(left: RiverSummaryApiItem, right: RiverSummaryApiItem) {
  if (left.score !== right.score) {
    return right.score - left.score;
  }

  const leftConfidence = confidenceWeight[left.confidence.label] ?? 0;
  const rightConfidence = confidenceWeight[right.confidence.label] ?? 0;
  if (leftConfidence !== rightConfidence) {
    return rightConfidence - leftConfidence;
  }

  return left.river.name.localeCompare(right.river.name);
}
