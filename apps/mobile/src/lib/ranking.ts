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

export function selectTopPicks(rivers: RiverSummaryApiItem[], limit = 5) {
  return [...rivers].sort(compareRivers).slice(0, limit);
}

export function selectNearbyPicks(
  rivers: RiverSummaryApiItem[],
  location: StoredLocation,
  limit = 5
): NearbyRiverPick[] {
  return rivers
    .map((river) => {
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
    })
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
