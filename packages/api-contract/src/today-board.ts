type ScoreRating = 'Strong' | 'Good' | 'Fair' | 'No-go';
type ConfidenceLabel = 'Low' | 'Medium' | 'High';
type LiveDataOverall = 'live' | 'degraded' | 'offline';

interface TodayBoardRiver {
  name: string;
}

interface TodayBoardConfidence {
  label: ConfidenceLabel;
}

interface TodayBoardLiveData {
  overall: LiveDataOverall;
}

export interface TodayBoardItem {
  river: TodayBoardRiver;
  score: number;
  rating: ScoreRating;
  confidence: TodayBoardConfidence;
  liveData: TodayBoardLiveData;
}

export const todayBoardConfidenceWeight: Record<ConfidenceLabel, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export const todayBoardStatusWeight: Record<LiveDataOverall, number> = {
  live: 2,
  degraded: 1,
  offline: 0,
};

export interface TodayBoardSnapshot {
  paddleable: number;
  watch: number;
  skip: number;
  highConfidence: number;
}

export interface RatingVerdictOptions {
  strongMaxLabel?: string;
  strongLabel?: string;
  goodLabel?: string;
  fairLabel?: string;
  noGoOfflineLabel?: string;
  noGoLabel?: string;
}

export function ratingVerdictLabel(
  rating: ScoreRating,
  score?: number,
  options: RatingVerdictOptions = {},
  liveDataOverall?: LiveDataOverall
) {
  if (rating === 'Strong') {
    return typeof score === 'number' && score >= 100
      ? options.strongMaxLabel ?? options.strongLabel ?? 'Paddle today'
      : options.strongLabel ?? 'Paddle today';
  }

  if (rating === 'Good') return options.goodLabel ?? 'Paddle today';
  if (rating === 'Fair') return options.fairLabel ?? 'Watch closely';
  if (liveDataOverall === 'offline' && options.noGoOfflineLabel) return options.noGoOfflineLabel;
  return options.noGoLabel ?? 'Skip today';
}

export function ratingDetailMessage(rating: ScoreRating) {
  if (rating === 'Strong') return 'Conditions line up well.';
  if (rating === 'Good') return 'Good with normal checks.';
  if (rating === 'Fair') return 'Possible paddle with caution.';
  return 'Not a clean yes today.';
}

export function buildTodayBoardSnapshot(rivers: TodayBoardItem[]): TodayBoardSnapshot {
  return {
    paddleable: rivers.filter((river) => river.rating === 'Strong' || river.rating === 'Good').length,
    watch: rivers.filter((river) => river.rating === 'Fair').length,
    skip: rivers.filter((river) => river.rating === 'No-go').length,
    highConfidence: rivers.filter((river) => river.confidence.label === 'High').length,
  };
}

export function compareTodayScore(left: TodayBoardItem, right: TodayBoardItem) {
  if (left.score !== right.score) {
    return right.score - left.score;
  }

  return left.river.name.localeCompare(right.river.name);
}

export function compareTodayCertainty(left: TodayBoardItem, right: TodayBoardItem) {
  const leftConfidence = todayBoardConfidenceWeight[left.confidence.label] ?? 0;
  const rightConfidence = todayBoardConfidenceWeight[right.confidence.label] ?? 0;
  if (leftConfidence !== rightConfidence) {
    return rightConfidence - leftConfidence;
  }

  return compareTodayScore(left, right);
}

export function compareTodayScoreThenConfidence(left: TodayBoardItem, right: TodayBoardItem) {
  if (left.score !== right.score) {
    return right.score - left.score;
  }

  const leftConfidence = todayBoardConfidenceWeight[left.confidence.label] ?? 0;
  const rightConfidence = todayBoardConfidenceWeight[right.confidence.label] ?? 0;
  if (leftConfidence !== rightConfidence) {
    return rightConfidence - leftConfidence;
  }

  return left.river.name.localeCompare(right.river.name);
}

export function compareTodayBoardQuality(left: TodayBoardItem, right: TodayBoardItem) {
  const leftStatus = todayBoardStatusWeight[left.liveData.overall] ?? 0;
  const rightStatus = todayBoardStatusWeight[right.liveData.overall] ?? 0;
  if (leftStatus !== rightStatus) {
    return rightStatus - leftStatus;
  }

  return compareTodayCertainty(left, right);
}

export function todayBoardRank(river: TodayBoardItem, travelPenalty = 0) {
  const confidenceBonus = (todayBoardConfidenceWeight[river.confidence.label] ?? 0) * 4;
  const statusPenalty = river.liveData.overall === 'offline' ? 12 : river.liveData.overall === 'degraded' ? 4 : 0;
  return river.score + confidenceBonus - travelPenalty - statusPenalty;
}
