import type {
  GaugeInventoryArtifact,
  GaugeReviewEntry,
  GaugeReviewLedgerArtifact,
  GaugeRouteReadiness,
} from './gauge-coverage';
import { classifyGaugeRouteReadiness } from './gauge-coverage';

export type RouteOpportunityStatus = 'ready' | 'in_progress' | 'blocked' | 'completed';

export interface RouteOpportunity {
  id: string;
  taskId: string;
  stateId: string;
  gaugeKey: string;
  siteName: string;
  priority: 'high' | 'medium';
  score: number;
  rankingFactors: {
    frontier: number;
    searchValue: number;
    evidenceCompleteness: number;
    distinctCorridorValue: number;
    effortToClear: number;
  };
  status: RouteOpportunityStatus;
  routeReadiness: Extract<GaugeRouteReadiness, 'candidate' | 'research_needed' | 'implementation_ready'>;
  routeFamilies: string[];
  blockers: string[];
  reason: string;
  nextEvidenceAction: string;
  retryCondition: string;
}

export interface RouteOpportunityQueueArtifact {
  version: 1;
  generatedAt: string;
  maxPerState: number;
  maxGlobal: number;
  opportunities: RouteOpportunity[];
}

type ExistingTask = {
  id: string;
  lane: string;
  kind: string;
  gaugeKeys?: string[];
  routeOpportunity?: boolean;
  routeOpportunityScore?: number;
};

const permanentlyBlocked = /private|prohibit|reservation permit|not paddle relevant|expert whitewater|marine|same-access|out and back|duplicate|overlap|no route corridor|proxy_only|derived_route_inventory|route candidate references this gauge|existing route|provider-equivalent/i;

function taskId(stateId: string, gaugeKey: string) {
  return `route-opportunity-${stateId.toLowerCase()}-${gaugeKey.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()}`;
}

function isActionable(review: GaugeReviewEntry) {
  if (!['blocked', 'researching'].includes(review.status) || review.eligibility !== 'route_capable') return false;
  // A worker-recorded no-add is already a durable disposition. Keep it
  // visible in the ledger, but do not recycle it into the bounded ready queue
  // unless a later review explicitly changes the disposition.
  if (review.decisionSource === 'manual_route_worker_no_add') return false;
  // Worker/verifier records also use a run-specific source id. Once one of
  // those records ends in no-add, it is a durable disposition until a later
  // review explicitly changes the ledger entry; do not recycle it merely
  // because its structural readiness is still `candidate`.
  if (/no[-_]add/i.test(review.decisionSource)) return false;
  // A bounded fast screen records a durable no-add in the ledger while keeping
  // the gauge visible for a future evidence change. Do not recycle those
  // dispositions into a fresh ready task on the next planner pass.
  const decisionText = `${review.decisionSource} ${review.decisionReason}`.toLowerCase();
  if (
    decisionText.includes('-screen')
    || decisionText.includes('fast triage')
    || decisionText.includes('durable blocked/no-add')
    || decisionText.includes('durable no-add')
    || decisionText.includes('preserve as a durable no-add')
  ) return false;
  const readiness = review.routeReadiness ?? classifyGaugeRouteReadiness(review);
  if (readiness !== 'candidate' && readiness !== 'research_needed' && readiness !== 'implementation_ready') return false;
  const blockerText = [...review.blockers, review.decisionReason].join(' ');
  return !permanentlyBlocked.test(blockerText);
}

function nextEvidenceAction(review: GaugeReviewEntry) {
  const blockerText = [...review.blockers, review.decisionReason].join(' ').toLowerCase();
  if (blockerText.includes('threshold') || blockerText.includes('flow')) return 'Find a station-specific paddling threshold or conservative minimum-only source tied to this gauge.';
  if (blockerText.includes('endpoint') || blockerText.includes('access')) return 'Verify a named public put-in/take-out pair, access rules, and defensible endpoint coordinates.';
  if (blockerText.includes('camp')) return 'Verify camping or explicit no-camping rules for the selected route endpoints.';
  if (blockerText.includes('safety') || blockerText.includes('dam')) return 'Resolve dam, portage, obstruction, and high/low-water safety handling for a public point-to-point reach.';
  if (blockerText.includes('coordinate') || blockerText.includes('geometry')) return 'Resolve water-entry coordinates and a canonical river-line geometry for the selected reach.';
  return 'Find a complete route package for this gauge reach, then rerun the normal evidence and safety gates.';
}

function rankingFactors(stateTier: number, siteName: string, review: GaugeReviewEntry) {
  const readiness = review.routeReadiness ?? classifyGaugeRouteReadiness(review);
  const blockerText = [...review.blockers, review.decisionReason].join(' ').toLowerCase();
  const searchValue = /\briver\b|\br\b/.test(siteName.toLowerCase()) ? 80 : /creek|fork|branch/.test(siteName.toLowerCase()) ? 45 : 20;
  const evidenceCompleteness = Math.min(review.evidence.length, 20) * 5 + (readiness === 'candidate' ? 40 : 0);
  const distinctCorridorValue = review.routeFamilies.length === 0 ? 35 : 15;
  const effortToClear = Math.max(0, 100
    - (blockerText.includes('endpoint') || blockerText.includes('access') ? 30 : 0)
    - (blockerText.includes('threshold') || blockerText.includes('flow') ? 25 : 0)
    - (blockerText.includes('safety') || blockerText.includes('dam') ? 20 : 0)
    - (blockerText.includes('camp') ? 10 : 0)
    - (blockerText.includes('coordinate') || blockerText.includes('geometry') ? 10 : 0));
  return {
    frontier: Math.max(0, 100 - Math.min(stateTier, 99)),
    searchValue,
    evidenceCompleteness,
    distinctCorridorValue,
    effortToClear,
  };
}

function scoreOpportunity(stateTier: number, siteName: string, review: GaugeReviewEntry) {
  const factors = rankingFactors(stateTier, siteName, review);
  return factors.frontier * 1_000
    + factors.searchValue * 10
    + factors.evidenceCompleteness * 5
    + factors.distinctCorridorValue * 3
    + factors.effortToClear;
}

export function buildRouteOpportunityQueue(
  inventory: GaugeInventoryArtifact,
  ledger: GaugeReviewLedgerArtifact,
  stateTiers: Map<string, number>,
  existingTasks: ExistingTask[] = [],
  maxPerState = 5,
  maxGlobal = 20,
): RouteOpportunityQueueArtifact {
  const existingByGauge = new Map<string, ExistingTask>();
  for (const task of existingTasks) {
    if (task.kind !== 'route_research' && task.kind !== 'route_implementation') continue;
    for (const key of task.gaugeKeys ?? []) existingByGauge.set(key, task);
  }
  const reviews = new Map(ledger.reviews.map((review) => [review.key, review]));
  const candidates = inventory.gauges.flatMap((gauge) => {
    const review = reviews.get(gauge.key);
    if (!review || !isActionable(review)) return [];
    const stateId = gauge.homeState.toUpperCase();
    const existing = existingByGauge.get(gauge.key);
    // A completed or explicitly blocked task is not eligible for automatic
    // recycling. Reopen it only through a fresh ledger disposition or an
    // explicit task update; otherwise repeated planner passes create churn.
    if (existing?.lane === 'completed' || existing?.lane === 'blocked') return [];
    const routeReadiness = review.routeReadiness ?? classifyGaugeRouteReadiness(review);
    if (routeReadiness !== 'candidate' && routeReadiness !== 'research_needed' && routeReadiness !== 'implementation_ready') return [];
    const opportunity: RouteOpportunity = {
      id: taskId(stateId, gauge.key),
      taskId: existing?.id ?? taskId(stateId, gauge.key),
      stateId,
      gaugeKey: gauge.key,
      siteName: gauge.siteName,
      priority: (stateTiers.get(stateId) ?? 99) <= 1 ? 'high' : 'medium',
      score: scoreOpportunity(stateTiers.get(stateId) ?? 99, gauge.siteName, review),
      rankingFactors: rankingFactors(stateTiers.get(stateId) ?? 99, gauge.siteName, review),
      status: existing?.lane === 'in_progress' ? 'in_progress' : 'ready',
      routeReadiness,
      routeFamilies: review.routeFamilies,
      blockers: review.blockers,
      reason: review.decisionReason,
      nextEvidenceAction: nextEvidenceAction(review),
      retryCondition: 'Retry only when the listed evidence gap has materially changed; do not force a route or reopen final dispositions automatically.',
    };
    return [opportunity];
  });
  const byState = new Map<string, RouteOpportunity[]>();
  for (const candidate of candidates.sort((left, right) => right.score - left.score || left.siteName.localeCompare(right.siteName))) {
    const stateCandidates = byState.get(candidate.stateId) ?? [];
    if (stateCandidates.length < maxPerState) {
      stateCandidates.push(candidate);
      byState.set(candidate.stateId, stateCandidates);
    }
  }
  const opportunities = [...byState.values()]
    .flat()
    .sort((left, right) => right.score - left.score || left.stateId.localeCompare(right.stateId) || left.siteName.localeCompare(right.siteName))
    .slice(0, maxGlobal);
  return { version: 1, generatedAt: new Date().toISOString(), maxPerState, maxGlobal, opportunities };
}

export function materializeRouteOpportunityTasks<T extends ExistingTask>(
  existingTasks: T[],
  queue: RouteOpportunityQueueArtifact,
  inventoryId: string,
  stateTiers: Map<string, number>,
) {
  const currentIds = new Set(queue.opportunities.map((opportunity) => opportunity.taskId));
  const scoreByTaskId = new Map(queue.opportunities.map((opportunity) => [opportunity.taskId, opportunity.score]));
  const queueStatusByTaskId = new Map(queue.opportunities.map((opportunity) => [opportunity.taskId, opportunity.status]));
  const tasks = existingTasks.map((task) => task.routeOpportunity && currentIds.has(task.id)
    ? { ...task, lane: queueStatusByTaskId.get(task.id) === 'in_progress' ? 'in_progress' : 'ready', routeOpportunityScore: scoreByTaskId.get(task.id) } as T
    : task.routeOpportunity && task.lane === 'ready'
      ? { ...task, lane: 'blocked' } as T
      : task);
  const existingIds = new Set(tasks.map((task) => task.id));
  for (const opportunity of queue.opportunities) {
    if (existingIds.has(opportunity.taskId)) continue;
    tasks.push({
      id: opportunity.taskId,
      title: `Investigate route opportunity: ${opportunity.siteName}`,
      lane: 'ready',
      kind: opportunity.routeReadiness === 'implementation_ready' ? 'route_implementation' : 'route_research',
      owner: opportunity.routeReadiness === 'implementation_ready' ? 'route-implementation' : 'route-research',
      priority: opportunity.priority,
      summary: opportunity.routeReadiness === 'implementation_ready'
        ? `${opportunity.gaugeKey} cleared research and is ready for bounded implementation. ${opportunity.nextEvidenceAction} Publication still requires every route evidence and safety gate.`
        : `${opportunity.gaugeKey} is classified ${opportunity.routeReadiness}. ${opportunity.nextEvidenceAction} This is a bounded research task, not permission to publish a route.`,
      evidence: [
        'docs/operations/gauge-review-ledger.json',
        'docs/operations/route-opportunity-queue.json',
        `gauge:${opportunity.gaugeKey}`,
        `blocker:${opportunity.reason}`,
      ],
      stateId: opportunity.stateId,
      inventoryId,
      gaugeKeys: [opportunity.gaugeKey],
      frontierTier: stateTiers.get(opportunity.stateId) ?? 99,
      routeOpportunity: true,
      routeOpportunityScore: opportunity.score,
    } as T);
    existingIds.add(opportunity.taskId);
  }
  return tasks as T[];
}
