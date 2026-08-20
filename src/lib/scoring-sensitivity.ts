import type { River, GaugeReading, WeatherSnapshot, RiverScoreResult } from './types';
import { callStateForDecision } from '@paddletoday/api-contract';
import { scoreRiverCondition } from './scoring';

export const SCORING_SENSITIVITY_SCHEMA_VERSION = 1;
export const SCORING_SENSITIVITY_NOW = '2026-06-15T12:00:00.000Z';

export type SensitivitySeverity = 'critical' | 'high' | 'medium' | 'low';

export interface SensitivityFinding {
  routeSlug: string;
  routeName: string;
  severity: SensitivitySeverity;
  category: 'invariant' | 'discontinuity' | 'sensitivity' | 'profile';
  code: string;
  message: string;
  evidence: string;
  rank: number;
}

export interface SensitivityRouteSummary {
  routeSlug: string;
  routeName: string;
  state: string;
  thresholdModel: River['profile']['thresholdModel'];
  sourceStrength: River['profile']['thresholdSourceStrength'];
  scenarioCount: number;
  scoreSpan: number;
  maxBoundaryJump: number;
  trendSensitivity: number;
  weatherSensitivity: number;
  reviewPriority: number;
  findingCount: number;
}

export interface SensitivityScenarioSnapshot {
  score: number;
  rating: RiverScoreResult['rating'];
  readiness: RiverScoreResult['readiness']['status'];
  gaugeBand: RiverScoreResult['gaugeBand'];
  tomorrowScore: number | null;
  weekendScore: number | null;
}

export interface SensitivityBaseline {
  schemaVersion: number;
  generatedAt: string;
  fixedEvaluationTime: string;
  routeCount: number;
  scenarioCount: number;
  routes: Record<string, Record<string, SensitivityScenarioSnapshot>>;
}

export interface SensitivityBaselineComparison {
  baselineAvailable: boolean;
  addedRoutes: number;
  removedRoutes: number;
  changedScenarios: number;
  readinessChanges: number;
  ratingChanges: number;
  maxScoreDelta: number;
}

export interface SensitivityBaselineChange {
  routeSlug: string;
  scenarioId: string;
  scoreBefore: number;
  scoreAfter: number;
  scoreDelta: number;
  ratingBefore: RiverScoreResult['rating'];
  ratingAfter: RiverScoreResult['rating'];
  readinessBefore: RiverScoreResult['readiness']['status'];
  readinessAfter: RiverScoreResult['readiness']['status'];
}

export interface ScoringSensitivityReport {
  schemaVersion: number;
  generatedAt: string;
  fixedEvaluationTime: string;
  routeCount: number;
  scenarioCount: number;
  invariantFailureCount: number;
  findings: SensitivityFinding[];
  routes: SensitivityRouteSummary[];
  comparison: SensitivityBaselineComparison;
  baselineChanges: SensitivityBaselineChange[];
}

interface RouteAnalysis {
  scenarios: Record<string, SensitivityScenarioSnapshot>;
  summary: SensitivityRouteSummary;
  findings: SensitivityFinding[];
}

const severityRank: Record<SensitivitySeverity, number> = {
  critical: 100,
  high: 70,
  medium: 40,
  low: 15,
};

export function analyzeScoringSensitivity(
  routes: River[],
  baseline: SensitivityBaseline | null = null,
  generatedAt = new Date().toISOString()
): { report: ScoringSensitivityReport; baseline: SensitivityBaseline } {
  const scoredRoutes = routes.filter((route) => route.scoreEligibility !== 'planning');
  const analyses = scoredRoutes.map(analyzeRoute);
  const nextBaseline: SensitivityBaseline = {
    schemaVersion: SCORING_SENSITIVITY_SCHEMA_VERSION,
    generatedAt,
    fixedEvaluationTime: SCORING_SENSITIVITY_NOW,
    routeCount: analyses.length,
    scenarioCount: analyses.reduce((total, analysis) => total + Object.keys(analysis.scenarios).length, 0),
    routes: Object.fromEntries(analyses.map((analysis) => [analysis.summary.routeSlug, analysis.scenarios])),
  };
  const findings = analyses
    .flatMap((analysis) => analysis.findings)
    .sort((left, right) => right.rank - left.rank || left.routeSlug.localeCompare(right.routeSlug));
  const routeSummaries = analyses
    .map((analysis) => analysis.summary)
    .sort((left, right) => right.reviewPriority - left.reviewPriority || left.routeSlug.localeCompare(right.routeSlug));

  return {
    baseline: nextBaseline,
    report: {
      schemaVersion: SCORING_SENSITIVITY_SCHEMA_VERSION,
      generatedAt,
      fixedEvaluationTime: SCORING_SENSITIVITY_NOW,
      routeCount: analyses.length,
      scenarioCount: nextBaseline.scenarioCount,
      invariantFailureCount: findings.filter((finding) => finding.category === 'invariant').length,
      findings: findings.slice(0, 200),
      routes: routeSummaries.slice(0, 150),
      comparison: compareSensitivityBaselines(baseline, nextBaseline),
      baselineChanges: findSensitivityBaselineChanges(baseline, nextBaseline).slice(0, 250),
    },
  };
}

export function compareSensitivityBaselines(
  previous: SensitivityBaseline | null,
  current: SensitivityBaseline
): SensitivityBaselineComparison {
  if (!previous || previous.schemaVersion !== current.schemaVersion) {
    return {
      baselineAvailable: false,
      addedRoutes: current.routeCount,
      removedRoutes: 0,
      changedScenarios: 0,
      readinessChanges: 0,
      ratingChanges: 0,
      maxScoreDelta: 0,
    };
  }

  const previousSlugs = new Set(Object.keys(previous.routes));
  const currentSlugs = new Set(Object.keys(current.routes));
  let changedScenarios = 0;
  let readinessChanges = 0;
  let ratingChanges = 0;
  let maxScoreDelta = 0;

  for (const slug of currentSlugs) {
    const previousScenarios = previous.routes[slug];
    if (!previousScenarios) continue;
    for (const [scenarioId, snapshot] of Object.entries(current.routes[slug])) {
      const prior = previousScenarios[scenarioId];
      if (!prior) continue;
      const scoreDelta = Math.abs(snapshot.score - prior.score);
      const readinessChanged = snapshot.readiness !== prior.readiness;
      const ratingChanged = snapshot.rating !== prior.rating;
      if (scoreDelta > 0 || readinessChanged || ratingChanged || snapshot.gaugeBand !== prior.gaugeBand) {
        changedScenarios += 1;
      }
      if (readinessChanged) readinessChanges += 1;
      if (ratingChanged) ratingChanges += 1;
      maxScoreDelta = Math.max(maxScoreDelta, scoreDelta);
    }
  }

  return {
    baselineAvailable: true,
    addedRoutes: [...currentSlugs].filter((slug) => !previousSlugs.has(slug)).length,
    removedRoutes: [...previousSlugs].filter((slug) => !currentSlugs.has(slug)).length,
    changedScenarios,
    readinessChanges,
    ratingChanges,
    maxScoreDelta,
  };
}

export function findSensitivityBaselineChanges(
  previous: SensitivityBaseline | null,
  current: SensitivityBaseline
): SensitivityBaselineChange[] {
  if (!previous || previous.schemaVersion !== current.schemaVersion) return [];
  const changes: SensitivityBaselineChange[] = [];
  for (const [routeSlug, scenarios] of Object.entries(current.routes)) {
    const priorScenarios = previous.routes[routeSlug];
    if (!priorScenarios) continue;
    for (const [scenarioId, snapshot] of Object.entries(scenarios)) {
      const prior = priorScenarios[scenarioId];
      if (!prior) continue;
      if (
        snapshot.score === prior.score &&
        snapshot.rating === prior.rating &&
        snapshot.readiness === prior.readiness &&
        snapshot.gaugeBand === prior.gaugeBand
      ) continue;
      changes.push({
        routeSlug,
        scenarioId,
        scoreBefore: prior.score,
        scoreAfter: snapshot.score,
        scoreDelta: snapshot.score - prior.score,
        ratingBefore: prior.rating,
        ratingAfter: snapshot.rating,
        readinessBefore: prior.readiness,
        readinessAfter: snapshot.readiness,
      });
    }
  }
  return changes.sort((left, right) =>
    Number(right.readinessBefore !== right.readinessAfter) - Number(left.readinessBefore !== left.readinessAfter)
    || Number(right.ratingBefore !== right.ratingAfter) - Number(left.ratingBefore !== left.ratingAfter)
    || Math.abs(right.scoreDelta) - Math.abs(left.scoreDelta)
    || left.routeSlug.localeCompare(right.routeSlug)
    || left.scenarioId.localeCompare(right.scenarioId)
  );
}

function analyzeRoute(route: River): RouteAnalysis {
  const findings: SensitivityFinding[] = [];
  const scenarios = new Map<string, RiverScoreResult>();
  const now = new Date(SCORING_SENSITIVITY_NOW);
  const weather = standardWeather();
  const gaugePoints = thresholdGaugePoints(route);

  if (gaugePoints.length === 0) {
    addFinding(findings, route, 'high', 'profile', 'untestable-threshold-profile', 'Threshold profile cannot produce sensitivity scenarios.', 'No finite scoring threshold was found.');
  }

  for (const point of gaugePoints) {
    scenarios.set(point.id, scoreRiverCondition({
      river: route,
      gauge: standardGauge(route, point.value),
      weather,
      now,
    }));
  }

  const referenceValue = referenceGaugeValue(route);
  if (referenceValue !== null) {
    const referenceGauge = standardGauge(route, referenceValue);
    scenarios.set('reference', scoreRiverCondition({ river: route, gauge: referenceGauge, weather, now }));
    scenarios.set('missing-gauge', scoreRiverCondition({ river: route, gauge: null, weather, now }));
    scenarios.set('stale-gauge', scoreRiverCondition({
      river: route,
      gauge: { ...referenceGauge, observedAt: '2026-06-14T00:00:00.000Z' },
      weather,
      now,
    }));
    scenarios.set('missing-weather', scoreRiverCondition({ river: route, gauge: referenceGauge, weather: null, now }));
    scenarios.set('cold-water', scoreRiverCondition({
      river: route,
      gauge: { ...referenceGauge, waterTempF: 39 },
      weather,
      now,
    }));
    scenarios.set('severe-weather', scoreRiverCondition({
      river: route,
      gauge: referenceGauge,
      weather: severeWeather(),
      now,
    }));

    requireReadiness(findings, route, scenarios.get('missing-gauge'), 'withheld', 'missing-gauge-withheld');
    requireReadiness(findings, route, scenarios.get('stale-gauge'), 'withheld', 'stale-gauge-withheld');
    forbidReady(findings, route, scenarios.get('missing-weather'), 'missing-weather-ready');
    forbidReady(findings, route, scenarios.get('cold-water'), 'cold-water-ready');

    const reference = scenarios.get('reference');
    if (route.profile.thresholdModel === 'minimum-only' && reference && reference.score > 74) {
      addFinding(findings, route, 'critical', 'invariant', 'minimum-only-cap', 'Minimum-only route exceeded the score cap.', `Score ${reference.score}.`);
    }

    if (reference) {
      const tomorrow = reference.outlooks.find((outlook) => outlook.id === 'tomorrow');
      const weekend = reference.outlooks.find((outlook) => outlook.id === 'weekend');
      if (tomorrow?.scoreRange && weekend?.scoreRange) {
        const tomorrowWidth = tomorrow.scoreRange.max - tomorrow.scoreRange.min;
        const weekendWidth = weekend.scoreRange.max - weekend.scoreRange.min;
        if (weekendWidth < tomorrowWidth) {
          addFinding(findings, route, 'high', 'invariant', 'forecast-horizon-uncertainty', 'Weekend uncertainty is narrower than tomorrow uncertainty.', `${weekendWidth} vs ${tomorrowWidth} points.`);
        }
      }
    }
  }

  const boundaryPairs = localBoundaryPairs(route);
  let maxBoundaryJump = 0;
  for (const pair of boundaryPairs) {
    const left = scoreAt(route, pair.left, weather, now);
    const right = scoreAt(route, pair.right, weather, now);
    scenarios.set(`${pair.id}-left`, left);
    scenarios.set(`${pair.id}-right`, right);
    const jump = Math.abs(right.score - left.score);
    maxBoundaryJump = Math.max(maxBoundaryJump, jump);
    if (jump > 3) {
      addFinding(findings, route, jump > 8 ? 'high' : 'medium', 'discontinuity', 'boundary-score-jump', `Score changes ${jump} points across ${pair.label}.`, `${formatValue(pair.left, route)} → ${formatValue(pair.right, route)}.`);
    }
  }

  auditMonotonicity(route, scenarios, findings);
  auditPublicCallSafety(route, scenarios, findings);
  const trendSensitivity = auditTrendSensitivity(route, scenarios, findings, weather, now);
  const reference = scenarios.get('reference');
  const severe = scenarios.get('severe-weather');
  const weatherSensitivity = reference && severe ? Math.abs(reference.score - severe.score) : 0;
  const scores = [...scenarios.values()].map((result) => result.score);
  const scoreSpan = scores.length > 0 ? Math.max(...scores) - Math.min(...scores) : 0;
  const profilePriority = route.profile.thresholdSourceStrength === 'derived' ? 16 : route.profile.thresholdSourceStrength === 'community' ? 10 : 0;
  const modelPriority = route.profile.thresholdModel === 'minimum-only' ? 8 : 0;
  const findingPriority = findings.reduce((max, finding) => Math.max(max, finding.rank), 0);
  const reviewPriority = Math.round(Math.max(findingPriority, maxBoundaryJump * 8 + trendSensitivity + weatherSensitivity / 2 + profilePriority + modelPriority));

  return {
    scenarios: Object.fromEntries([...scenarios.entries()].map(([id, result]) => [id, snapshot(result)])),
    findings,
    summary: {
      routeSlug: route.slug,
      routeName: `${route.name} — ${route.reach}`,
      state: route.state,
      thresholdModel: route.profile.thresholdModel,
      sourceStrength: route.profile.thresholdSourceStrength,
      scenarioCount: scenarios.size,
      scoreSpan,
      maxBoundaryJump,
      trendSensitivity,
      weatherSensitivity,
      reviewPriority,
      findingCount: findings.length,
    },
  };
}

function auditPublicCallSafety(route: River, scenarios: Map<string, RiverScoreResult>, findings: SensitivityFinding[]) {
  for (const [scenarioId, result] of scenarios) {
    const call = callStateForDecision(result.rating, result.readiness.status);
    const unsafeUpgrade =
      (result.readiness.status === 'skip' && call !== 'skip')
      || (result.rating === 'No-go' && result.readiness.status !== 'withheld' && call !== 'skip')
      || (result.readiness.status === 'verify' && result.rating !== 'No-go' && call === 'paddle');
    if (unsafeUpgrade) {
      addFinding(
        findings,
        route,
        'critical',
        'invariant',
        'public-call-upgrade',
        'The public call is less conservative than the score/readiness decision.',
        `${scenarioId}: ${result.rating} / ${result.readiness.status} rendered as ${call}.`,
      );
      return;
    }
  }
}

function auditMonotonicity(route: River, scenarios: Map<string, RiverScoreResult>, findings: SensitivityFinding[]) {
  if (route.profile.thresholdModel === 'minimum-only') {
    const below = scenarios.get('minimum-below');
    const at = scenarios.get('minimum-at');
    const above = scenarios.get('minimum-above');
    if (below && at && above && (at.score < below.score || above.score < at.score)) {
      addFinding(findings, route, 'critical', 'invariant', 'minimum-monotonicity', 'Score falls while water moves upward through the minimum.', `${below.score} → ${at.score} → ${above.score}.`);
    }
    return;
  }

  const low = ['below-too-low', 'too-low', 'low-shoulder', 'ideal-min'].map((id) => scenarios.get(id)).filter(Boolean) as RiverScoreResult[];
  const high = ['ideal-max', 'high-shoulder', 'too-high', 'above-too-high'].map((id) => scenarios.get(id)).filter(Boolean) as RiverScoreResult[];
  if (hasDecrease(low.map((result) => result.score))) {
    addFinding(findings, route, 'critical', 'invariant', 'low-side-reversal', 'Score decreases while flow moves from hazardous low water toward ideal.', low.map((result) => result.score).join(' → '));
  }
  if (hasIncrease(high.map((result) => result.score))) {
    addFinding(findings, route, 'critical', 'invariant', 'high-side-reversal', 'Score increases while flow moves from ideal toward hazardous high water.', high.map((result) => result.score).join(' → '));
  }
}

function auditTrendSensitivity(
  route: River,
  scenarios: Map<string, RiverScoreResult>,
  findings: SensitivityFinding[],
  weather: WeatherSnapshot,
  now: Date
) {
  const testValue = adverseTrendGaugeValue(route);
  if (testValue === null) return 0;
  const trend: GaugeReading['trend'] = route.profile.thresholdModel === 'two-sided' ? 'rising' : 'falling';
  const mildGauge = standardGauge(route, testValue, trend, 5);
  const rapidGauge = standardGauge(route, testValue, trend, 35);
  const mild = scoreRiverCondition({ river: route, gauge: mildGauge, weather, now });
  const rapid = scoreRiverCondition({ river: route, gauge: rapidGauge, weather, now });
  scenarios.set('adverse-trend-mild', mild);
  scenarios.set('adverse-trend-rapid', rapid);
  if (rapid.score > mild.score) {
    addFinding(findings, route, 'critical', 'invariant', 'adverse-trend-reversal', 'A stronger adverse trend improved today’s score.', `${mild.score} → ${rapid.score}.`);
  }
  const mildTomorrow = mild.outlooks.find((outlook) => outlook.id === 'tomorrow')?.score;
  const rapidTomorrow = rapid.outlooks.find((outlook) => outlook.id === 'tomorrow')?.score;
  if (typeof mildTomorrow === 'number' && typeof rapidTomorrow === 'number' && rapidTomorrow > mildTomorrow) {
    addFinding(findings, route, 'critical', 'invariant', 'adverse-outlook-reversal', 'A stronger adverse trend improved tomorrow’s forecast.', `${mildTomorrow} → ${rapidTomorrow}.`);
  }
  return Math.abs(mild.score - rapid.score);
}

function thresholdGaugePoints(route: River): Array<{ id: string; value: number }> {
  const profile = route.profile;
  if (profile.thresholdModel === 'minimum-only') {
    const minimum = finite(profile.tooLow) ?? finite(profile.idealMin);
    if (minimum === null) return [];
    const step = meaningfulStep(route, minimum);
    return [
      { id: 'minimum-below', value: minimum - step },
      { id: 'minimum-at', value: minimum },
      { id: 'minimum-above', value: minimum + step * 3 },
      { id: 'minimum-well-above', value: minimum + step * 10 },
    ];
  }
  const tooLow = finite(profile.tooLow);
  const idealMin = finite(profile.idealMin);
  const idealMax = finite(profile.idealMax);
  const tooHigh = finite(profile.tooHigh);
  if (tooLow === null || idealMin === null || idealMax === null || tooHigh === null) return [];
  const span = Math.max(idealMax - idealMin, meaningfulStep(route, idealMin) * 4);
  return [
    { id: 'below-too-low', value: tooLow - Math.max((idealMin - tooLow) * 0.5, span * 0.1) },
    { id: 'too-low', value: tooLow },
    { id: 'low-shoulder', value: (tooLow + idealMin) / 2 },
    { id: 'ideal-min', value: idealMin },
    { id: 'ideal-center', value: (idealMin + idealMax) / 2 },
    { id: 'ideal-max', value: idealMax },
    { id: 'high-shoulder', value: (idealMax + tooHigh) / 2 },
    { id: 'too-high', value: tooHigh },
    { id: 'above-too-high', value: tooHigh + Math.max((tooHigh - idealMax) * 0.5, span * 0.1) },
  ];
}

function localBoundaryPairs(route: River): Array<{ id: string; label: string; left: number; right: number }> {
  const profile = route.profile;
  const boundaries = profile.thresholdModel === 'minimum-only'
    ? [['minimum', finite(profile.tooLow) ?? finite(profile.idealMin)] as const]
    : [
        ['too-low boundary', finite(profile.tooLow)] as const,
        ['ideal minimum', finite(profile.idealMin)] as const,
        ['ideal maximum', finite(profile.idealMax)] as const,
        ['too-high boundary', finite(profile.tooHigh)] as const,
      ];
  return boundaries.flatMap(([label, value], index) => {
    if (value === null) return [];
    const epsilon = boundaryEpsilon(route, value);
    return [{ id: `boundary-${index}`, label, left: value - epsilon, right: value + epsilon }];
  });
}

function referenceGaugeValue(route: River) {
  const profile = route.profile;
  if (profile.thresholdModel === 'minimum-only') {
    const minimum = finite(profile.tooLow) ?? finite(profile.idealMin);
    return minimum === null ? null : minimum + meaningfulStep(route, minimum) * 5;
  }
  const idealMin = finite(profile.idealMin);
  const idealMax = finite(profile.idealMax);
  return idealMin === null || idealMax === null ? null : (idealMin + idealMax) / 2;
}

function adverseTrendGaugeValue(route: River) {
  const profile = route.profile;
  if (profile.thresholdModel === 'minimum-only') {
    const minimum = finite(profile.tooLow) ?? finite(profile.idealMin);
    return minimum === null ? null : minimum - meaningfulStep(route, minimum);
  }
  const idealMax = finite(profile.idealMax);
  const tooHigh = finite(profile.tooHigh);
  return idealMax === null || tooHigh === null ? null : (idealMax + tooHigh) / 2;
}

function standardGauge(
  route: River,
  current: number,
  trend: GaugeReading['trend'] = 'steady',
  changePercent24h = 0
): GaugeReading {
  const delta24h = current * (changePercent24h / 100) * (trend === 'falling' ? -1 : 1);
  return {
    sourceId: route.gaugeSource.id,
    observedAt: '2026-06-15T11:30:00.000Z',
    current,
    unit: route.gaugeSource.unit,
    trend,
    delta24h: trend === 'steady' ? 0 : delta24h,
    changePercent24h: trend === 'steady' ? 0 : changePercent24h,
    recentSamples: [],
    gaugeHeightNow: route.gaugeSource.unit === 'ft' ? current : null,
    dischargeNow: route.gaugeSource.unit === 'cfs' ? current : null,
    waterTempF: 62,
    waterTempObservedAt: '2026-06-15T11:30:00.000Z',
    gaugeSource: 'Sensitivity harness',
    waterTempSource: 'Sensitivity harness',
  };
}

function standardWeather(): WeatherSnapshot {
  return {
    observedAt: '2026-06-15T11:30:00.000Z',
    temperatureF: 72,
    windMph: 6,
    gustMph: 9,
    currentPrecipitationIn: 0,
    next12hPrecipProbabilityMax: 10,
    next12hPrecipitationIn: 0,
    next12hPrecipStartsInHours: null,
    next12hWindMphMax: 9,
    next12hStormRisk: false,
    weatherCode: 1,
    conditionLabel: 'Mostly clear',
    todayHourly: [],
    tomorrow: forecastWindow('Tomorrow', '2026-06-16', 12, 0.01, 9, false),
    weekend: forecastWindow('Weekend', '2026-06-20', 20, 0.04, 11, false),
    recentRain24hIn: 0,
    recentRain72hIn: 0.1,
    precipitationProbabilityNow: 5,
    rainTimingLabel: 'None',
    weatherSource: 'Sensitivity harness',
    rainfallSource: 'Sensitivity harness',
    waterTempSource: 'Sensitivity harness',
  };
}

function severeWeather(): WeatherSnapshot {
  return {
    ...standardWeather(),
    temperatureF: 38,
    windMph: 22,
    gustMph: 35,
    next12hPrecipProbabilityMax: 90,
    next12hPrecipitationIn: 1.2,
    next12hPrecipStartsInHours: 1,
    next12hWindMphMax: 30,
    next12hStormRisk: true,
    conditionLabel: 'Storms',
    precipitationProbabilityNow: 75,
    rainTimingLabel: 'Imminent',
  };
}

function forecastWindow(label: string, date: string, probability: number, rain: number, wind: number, stormRisk: boolean) {
  return {
    label,
    startDate: date,
    endDate: date,
    precipProbabilityMax: probability,
    precipitationIn: rain,
    windMphMax: wind,
    stormRisk,
    weatherCode: 1,
    temperatureHighF: 74,
    temperatureLowF: 55,
  };
}

function scoreAt(route: River, value: number, weather: WeatherSnapshot, now: Date) {
  return scoreRiverCondition({ river: route, gauge: standardGauge(route, value), weather, now });
}

function snapshot(result: RiverScoreResult): SensitivityScenarioSnapshot {
  return {
    score: result.score,
    rating: result.rating,
    readiness: result.readiness.status,
    gaugeBand: result.gaugeBand,
    tomorrowScore: result.outlooks.find((outlook) => outlook.id === 'tomorrow')?.score ?? null,
    weekendScore: result.outlooks.find((outlook) => outlook.id === 'weekend')?.score ?? null,
  };
}

function requireReadiness(
  findings: SensitivityFinding[],
  route: River,
  result: RiverScoreResult | undefined,
  expected: RiverScoreResult['readiness']['status'],
  code: string
) {
  if (result?.readiness.status !== expected) {
    addFinding(findings, route, 'critical', 'invariant', code, `Expected ${expected} readiness.`, `Received ${result?.readiness.status ?? 'no result'}.`);
  }
}

function forbidReady(findings: SensitivityFinding[], route: River, result: RiverScoreResult | undefined, code: string) {
  if (result?.readiness.status === 'ready') {
    addFinding(findings, route, 'critical', 'invariant', code, 'Incomplete or safety-limited evidence produced Ready.', result.readiness.reason);
  }
}

function addFinding(
  findings: SensitivityFinding[],
  route: River,
  severity: SensitivitySeverity,
  category: SensitivityFinding['category'],
  code: string,
  message: string,
  evidence: string
) {
  findings.push({
    routeSlug: route.slug,
    routeName: `${route.name} — ${route.reach}`,
    severity,
    category,
    code,
    message,
    evidence,
    rank: severityRank[severity] + (category === 'invariant' ? 20 : category === 'discontinuity' ? 10 : 0),
  });
}

function meaningfulStep(route: River, value: number) {
  return Math.max(route.gaugeSource.unit === 'ft' ? 0.1 : 10, Math.abs(value) * 0.05);
}

function boundaryEpsilon(route: River, value: number) {
  if (route.gaugeSource.unit === 'ft') return 0.001;
  const idealSpan =
    finite(route.profile.idealMin) !== null && finite(route.profile.idealMax) !== null
      ? Math.abs((route.profile.idealMax as number) - (route.profile.idealMin as number))
      : 0;
  return Math.max(0.1, idealSpan * 0.001, Math.abs(value) * 0.00001);
}

function finite(value: number | undefined): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function hasDecrease(values: number[]) {
  return values.some((value, index) => index > 0 && value < values[index - 1]);
}

function hasIncrease(values: number[]) {
  return values.some((value, index) => index > 0 && value > values[index - 1]);
}

function formatValue(value: number, route: River) {
  return `${Number(value.toFixed(route.gaugeSource.unit === 'ft' ? 3 : 1))} ${route.gaugeSource.unit}`;
}
