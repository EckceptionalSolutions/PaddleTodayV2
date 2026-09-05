import type {
  GaugeUnit,
  ObservedWaterLevel,
  ScoringOutcomeObservationInput,
  ScoringGaugeTrend,
  ScoreRating,
  TripCompletion,
  TripOutcomeVerdict,
} from '@paddletoday/api-contract';

export type ScoringOutcomeParseResult =
  | { ok: true; value: ScoringOutcomeObservationInput }
  | { ok: false; error: string };

const WATER_LEVELS: ObservedWaterLevel[] = ['too-low', 'low', 'ideal', 'high', 'unsafe', 'unknown'];
const COMPLETIONS: TripCompletion[] = ['completed', 'shortened', 'aborted', 'not-launched'];
const VERDICTS: TripOutcomeVerdict[] = ['unsafe', 'poor', 'fair', 'good', 'excellent'];
const RATINGS: ScoreRating[] = ['Strong', 'Good', 'Fair', 'No-go'];
const GAUGE_UNITS: GaugeUnit[] = ['cfs', 'ft'];
const TRENDS: ScoringGaugeTrend[] = ['rising', 'falling', 'steady', 'unknown'];
const READINESS = ['ready', 'verify', 'withheld', 'skip'] as const;
const THRESHOLD_MODELS = ['two-sided', 'minimum-only'] as const;
const SOURCE_STRENGTHS = ['official', 'mixed', 'community', 'derived'] as const;
const ACCESS_STATUSES = ['open', 'limited', 'closed', 'unknown'] as const;
const EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'advanced', 'guide'] as const;
const CRAFT_TYPES = ['canoe', 'recreational-kayak', 'touring-kayak', 'whitewater-kayak', 'packraft', 'sup', 'other'] as const;

export function parseScoringOutcomeObservation(value: unknown): ScoringOutcomeParseResult {
  if (!isRecord(value) || value.schemaVersion !== 1) {
    return { ok: false, error: 'Scoring outcomes must use schemaVersion 1.' };
  }

  if (!includes(WATER_LEVELS, value.observedWaterLevel)) {
    return { ok: false, error: 'Choose a valid observed water level.' };
  }
  if (!includes(COMPLETIONS, value.tripCompletion)) {
    return { ok: false, error: 'Choose a valid trip completion outcome.' };
  }
  if (!includes(VERDICTS, value.overallVerdict)) {
    return { ok: false, error: 'Choose a valid overall trip verdict.' };
  }

  const decisionCapturedAt = optionalTimestamp(value.decisionCapturedAt);
  if (decisionCapturedAt === false) {
    return { ok: false, error: 'decisionCapturedAt must be a valid timestamp.' };
  }

  const decisionPolicyRevision = optionalShortString(value.decisionPolicyRevision, 80);
  const evidenceAgeMinutes = optionalBoundedNumber(value.evidenceAgeMinutes, 0, 7 * 24 * 60);
  if (decisionPolicyRevision === false || evidenceAgeMinutes === false) {
    return { ok: false, error: 'Decision policy revision or evidence age is invalid.' };
  }

  const appScore = optionalBoundedNumber(value.appScore, 0, 100);
  const appConfidence = optionalBoundedNumber(value.appConfidence, 0, 100);
  const gaugeValue = optionalFiniteNumber(value.gaugeValue);
  if (appScore === false || appConfidence === false || gaugeValue === false) {
    return { ok: false, error: 'Scores, confidence, and gauge values must be finite numbers in their valid ranges.' };
  }

  if (value.appRating !== undefined && !includes(RATINGS, value.appRating)) {
    return { ok: false, error: 'appRating is invalid.' };
  }
  if (value.gaugeUnit !== undefined && !includes(GAUGE_UNITS, value.gaugeUnit)) {
    return { ok: false, error: 'gaugeUnit is invalid.' };
  }
  if (value.gaugeTrend !== undefined && !includes(TRENDS, value.gaugeTrend)) {
    return { ok: false, error: 'gaugeTrend is invalid.' };
  }
  if (value.appReadiness !== undefined && !includes(READINESS, value.appReadiness)) {
    return { ok: false, error: 'appReadiness is invalid.' };
  }
  if (value.thresholdModel !== undefined && !includes(THRESHOLD_MODELS, value.thresholdModel)) {
    return { ok: false, error: 'thresholdModel is invalid.' };
  }
  if (value.thresholdSourceStrength !== undefined && !includes(SOURCE_STRENGTHS, value.thresholdSourceStrength)) {
    return { ok: false, error: 'thresholdSourceStrength is invalid.' };
  }
  if (value.comfortRating !== undefined && ![1, 2, 3, 4, 5].includes(Number(value.comfortRating))) {
    return { ok: false, error: 'comfortRating must be from 1 to 5.' };
  }
  if (value.accessStatus !== undefined && !includes(ACCESS_STATUSES, value.accessStatus)) {
    return { ok: false, error: 'accessStatus is invalid.' };
  }
  if (value.paddlerExperience !== undefined && !includes(EXPERIENCE_LEVELS, value.paddlerExperience)) {
    return { ok: false, error: 'paddlerExperience is invalid.' };
  }
  if (value.craftType !== undefined && !includes(CRAFT_TYPES, value.craftType)) {
    return { ok: false, error: 'craftType is invalid.' };
  }

  const hazards = cleanTokens(value.hazards);
  const reasonCodes = cleanTokens(value.reasonCodes);
  if (hazards === false || reasonCodes === false) {
    return { ok: false, error: 'Hazards and reason codes must be short string arrays.' };
  }

  return {
    ok: true,
    value: {
      schemaVersion: 1,
      ...(decisionCapturedAt ? { decisionCapturedAt } : {}),
      ...(decisionPolicyRevision ? { decisionPolicyRevision } : {}),
      ...(evidenceAgeMinutes !== undefined ? { evidenceAgeMinutes } : {}),
      ...(appScore !== undefined ? { appScore } : {}),
      ...(value.appRating !== undefined ? { appRating: value.appRating as ScoreRating } : {}),
      ...(appConfidence !== undefined ? { appConfidence } : {}),
      ...(value.appReadiness !== undefined ? { appReadiness: value.appReadiness as ScoringOutcomeObservationInput['appReadiness'] } : {}),
      ...(value.thresholdModel !== undefined ? { thresholdModel: value.thresholdModel as ScoringOutcomeObservationInput['thresholdModel'] } : {}),
      ...(value.thresholdSourceStrength !== undefined ? { thresholdSourceStrength: value.thresholdSourceStrength as ScoringOutcomeObservationInput['thresholdSourceStrength'] } : {}),
      ...(gaugeValue !== undefined ? { gaugeValue } : {}),
      ...(value.gaugeUnit !== undefined ? { gaugeUnit: value.gaugeUnit as GaugeUnit } : {}),
      ...(value.gaugeTrend !== undefined ? { gaugeTrend: value.gaugeTrend as ScoringGaugeTrend } : {}),
      observedWaterLevel: value.observedWaterLevel as ObservedWaterLevel,
      tripCompletion: value.tripCompletion as TripCompletion,
      overallVerdict: value.overallVerdict as TripOutcomeVerdict,
      ...(value.comfortRating !== undefined ? { comfortRating: Number(value.comfortRating) as 1 | 2 | 3 | 4 | 5 } : {}),
      ...(value.accessStatus !== undefined ? { accessStatus: value.accessStatus as ScoringOutcomeObservationInput['accessStatus'] } : {}),
      ...(value.paddlerExperience !== undefined ? { paddlerExperience: value.paddlerExperience as ScoringOutcomeObservationInput['paddlerExperience'] } : {}),
      ...(value.craftType !== undefined ? { craftType: value.craftType as ScoringOutcomeObservationInput['craftType'] } : {}),
      ...(hazards.length > 0 ? { hazards } : {}),
      ...(reasonCodes.length > 0 ? { reasonCodes } : {}),
    },
  };
}

function optionalTimestamp(value: unknown): string | undefined | false {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string' || !Number.isFinite(new Date(value).getTime())) return false;
  return new Date(value).toISOString();
}

function optionalShortString(value: unknown, maxLength: number): string | undefined | false {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string') return false;
  const normalized = value.trim();
  return normalized.length > 0 && normalized.length <= maxLength ? normalized : false;
}

function optionalBoundedNumber(value: unknown, min: number, max: number): number | undefined | false {
  const number = optionalFiniteNumber(value);
  if (number === false || (number !== undefined && (number < min || number > max))) return false;
  return number;
}

function optionalFiniteNumber(value: unknown): number | undefined | false {
  if (value === undefined || value === null || value === '') return undefined;
  return typeof value === 'number' && Number.isFinite(value) ? value : false;
}

function cleanTokens(value: unknown): string[] | false {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value) || value.length > 12) return false;
  const tokens = value.map((item) => typeof item === 'string' ? item.trim().slice(0, 80) : '').filter(Boolean);
  return tokens.length === value.length ? [...new Set(tokens)] : false;
}

function includes<T extends string>(values: readonly T[], value: unknown): value is T {
  return typeof value === 'string' && values.includes(value as T);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
