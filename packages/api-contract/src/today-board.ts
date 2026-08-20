type ScoreRating = 'Strong' | 'Good' | 'Fair' | 'No-go';
type ConfidenceLabel = 'Low' | 'Medium' | 'High';
type LiveDataOverall = 'live' | 'degraded' | 'offline';

interface TodayBoardRiver {
  name: string;
  reach?: string;
}

interface TodayBoardConfidence {
  label: ConfidenceLabel;
}

interface TodayBoardLiveData {
  overall: LiveDataOverall;
}

interface TodayBoardReadiness {
  status: DecisionReadinessStatus;
}

export interface TodayBoardItem {
  river: TodayBoardRiver;
  score: number;
  rating: ScoreRating;
  confidence: TodayBoardConfidence;
  liveData: TodayBoardLiveData;
  readiness?: TodayBoardReadiness;
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

export const todayBoardRatingRiskWeight: Record<ScoreRating, number> = {
  Strong: 0,
  Good: 1,
  Fair: 2,
  'No-go': 3,
};

export interface TodayBoardSnapshot {
  paddleable: number;
  watch: number;
  unavailable: number;
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
  if (rating === 'Strong') return 'Paddle today. Strong conditions.';
  if (rating === 'Good') return 'Paddle today. Good conditions.';
  if (rating === 'Fair') return 'Watch closely.';
  return 'Skip today.';
}

export type CallState = 'paddle' | 'watch' | 'skip';
export type DecisionCallState = CallState | 'unavailable';
export type DecisionReadinessStatus = 'ready' | 'verify' | 'withheld' | 'skip';
export type DecisionCallLabel = 'Paddle today' | 'Paddle this weekend' | 'Watch closely' | 'Call unavailable' | 'Skip today' | 'Skip this weekend';
export type CompactDecisionCallLabel = 'Paddle' | 'Watch' | 'No call' | 'Skip';
export type CallContext = 'today' | 'weekend';

/** The action a paddler should take. Strong and Good intentionally share a call. */
export function callStateForRating(rating: ScoreRating): CallState {
  if (rating === 'Fair') return 'watch';
  if (rating === 'No-go') return 'skip';
  return 'paddle';
}

export function callLabelForRating(
  rating: ScoreRating,
  context: CallContext = 'today',
  compact = false
) {
  const state = callStateForRating(rating);
  if (compact) {
    if (state === 'paddle') return 'Paddle';
    if (state === 'watch') return 'Watch';
    return 'Skip';
  }

  if (state === 'paddle') return context === 'weekend' ? 'Paddle this weekend' : 'Paddle today';
  if (state === 'watch') return 'Watch closely';
  return context === 'weekend' ? 'Skip this weekend' : 'Skip today';
}

/** Combines score quality with evidence/safety gates into the one public call vocabulary. */
export function callStateForDecision(
  rating: ScoreRating,
  readiness: DecisionReadinessStatus = 'ready'
): DecisionCallState {
  if (readiness === 'withheld') return 'unavailable';
  if (readiness === 'skip' || rating === 'No-go') return 'skip';
  if (readiness === 'verify') return 'watch';
  return callStateForRating(rating);
}

export function callLabelForDecision(
  rating: ScoreRating,
  readiness?: DecisionReadinessStatus,
  context?: CallContext,
  compact?: false
): DecisionCallLabel;
export function callLabelForDecision(
  rating: ScoreRating,
  readiness: DecisionReadinessStatus | undefined,
  context: CallContext | undefined,
  compact: true
): CompactDecisionCallLabel;
export function callLabelForDecision(
  rating: ScoreRating,
  readiness: DecisionReadinessStatus | undefined,
  context: CallContext | undefined,
  compact: boolean
): DecisionCallLabel | CompactDecisionCallLabel;
export function callLabelForDecision(
  rating: ScoreRating,
  readiness: DecisionReadinessStatus = 'ready',
  context: CallContext = 'today',
  compact = false
) {
  const state = callStateForDecision(rating, readiness);
  if (state === 'unavailable') return compact ? 'No call' : 'Call unavailable';
  if (state === 'watch') return compact ? 'Watch' : 'Watch closely';
  if (state === 'skip') return compact ? 'Skip' : context === 'weekend' ? 'Skip this weekend' : 'Skip today';
  return compact ? 'Paddle' : context === 'weekend' ? 'Paddle this weekend' : 'Paddle today';
}

export function qualityTierLabel(rating: ScoreRating) {
  if (rating === 'Strong') return 'Strong conditions';
  if (rating === 'Good') return 'Good conditions';
  if (rating === 'Fair') return 'Watch conditions';
  return 'Skip conditions';
}

export function buildTodayBoardSnapshot(rivers: TodayBoardItem[]): TodayBoardSnapshot {
  const calls = rivers.map((river) => callStateForDecision(river.rating, river.readiness?.status));
  return {
    paddleable: calls.filter((call) => call === 'paddle').length,
    watch: calls.filter((call) => call === 'watch').length,
    unavailable: calls.filter((call) => call === 'unavailable').length,
    skip: calls.filter((call) => call === 'skip').length,
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
  const callComparison = compareDecisionCalls(left, right);
  if (callComparison !== 0) return callComparison;

  const leftStatus = todayBoardStatusWeight[left.liveData.overall] ?? 0;
  const rightStatus = todayBoardStatusWeight[right.liveData.overall] ?? 0;
  if (leftStatus !== rightStatus) {
    return rightStatus - leftStatus;
  }

  return compareTodayCertainty(left, right);
}

export function compareTodayStatusThenScore(left: TodayBoardItem, right: TodayBoardItem) {
  const callComparison = compareDecisionCalls(left, right);
  if (callComparison !== 0) return callComparison;

  const leftStatus = todayBoardStatusWeight[left.liveData.overall] ?? 0;
  const rightStatus = todayBoardStatusWeight[right.liveData.overall] ?? 0;
  if (leftStatus !== rightStatus) {
    return rightStatus - leftStatus;
  }

  return right.score - left.score;
}

export function compareTodayConfidenceStatusScore(left: TodayBoardItem, right: TodayBoardItem) {
  const leftConfidence = todayBoardConfidenceWeight[left.confidence.label] ?? 0;
  const rightConfidence = todayBoardConfidenceWeight[right.confidence.label] ?? 0;
  if (leftConfidence !== rightConfidence) {
    return rightConfidence - leftConfidence;
  }

  return compareTodayStatusThenScore(left, right);
}

export function compareTodayLowestRisk(left: TodayBoardItem, right: TodayBoardItem) {
  const callComparison = compareDecisionCalls(left, right);
  if (callComparison !== 0) return callComparison;

  const leftRating = todayBoardRatingRiskWeight[left.rating] ?? 4;
  const rightRating = todayBoardRatingRiskWeight[right.rating] ?? 4;
  if (leftRating !== rightRating) {
    return leftRating - rightRating;
  }

  return compareTodayConfidenceStatusScore(left, right);
}

export function compareTodayAlphabetically(left: TodayBoardItem, right: TodayBoardItem) {
  const riverCompare = left.river.name.localeCompare(right.river.name);
  if (riverCompare !== 0) {
    return riverCompare;
  }

  return String(left.river.reach ?? '').localeCompare(String(right.river.reach ?? ''));
}

export function todayBoardRank(river: TodayBoardItem, travelPenalty = 0) {
  const callBonus = decisionCallWeight(callStateForDecision(river.rating, river.readiness?.status)) * 200;
  const confidenceBonus = (todayBoardConfidenceWeight[river.confidence.label] ?? 0) * 4;
  const statusPenalty = river.liveData.overall === 'offline' ? 12 : river.liveData.overall === 'degraded' ? 4 : 0;
  return callBonus + river.score + confidenceBonus - travelPenalty - statusPenalty;
}

function compareDecisionCalls(left: TodayBoardItem, right: TodayBoardItem) {
  const leftWeight = decisionCallWeight(callStateForDecision(left.rating, left.readiness?.status));
  const rightWeight = decisionCallWeight(callStateForDecision(right.rating, right.readiness?.status));
  return rightWeight - leftWeight;
}

function decisionCallWeight(call: DecisionCallState) {
  if (call === 'paddle') return 3;
  if (call === 'watch') return 2;
  if (call === 'unavailable') return 1;
  return 0;
}
