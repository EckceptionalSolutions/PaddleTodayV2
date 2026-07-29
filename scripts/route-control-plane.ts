import { open, readFile, rename, rm, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

type Difficulty = 'standard' | 'difficult';
type WorkMode = 'implementation' | 'research';
type ClaimStatus = 'claimed' | 'completed' | 'expired';
type Outcome =
  | 'implemented'
  | 'promoted'
  | 'progress'
  | 'blocked_source_access'
  | 'blocked_threshold'
  | 'blocked_access'
  | 'blocked_live_provider'
  | 'no_change'
  | 'invalidated';

interface Defaults {
  maxConsecutiveClaims: number;
  minimumSourceFamilies: number;
  minimumDiscoveryTouches: number;
  maximumStaleCandidateRechecks: number;
  claimLeaseMinutes: number;
  difficultStateReservationEvery: number;
  historyWindow: number;
}

interface StateProfile {
  state: string;
  code: string;
  enabled: boolean;
  weight: number;
  difficulty: Difficulty;
  playbookPath: string;
  primarySourceFamilies: string[];
  fallbackSourceFamilies: string[];
  mandatoryChecks: string[];
  sourceRecoveryTactics?: string[];
}

interface ProfilesFile {
  version: number;
  defaults: Defaults;
  states: StateProfile[];
}

interface Lead {
  candidateId: string;
  lane: string;
  priority: number;
  state: string;
  river: string;
  route: string;
  currentStatus: string;
  blocker: string | null;
  retryCondition: string | null;
  recommendedNextStep: string;
}

interface LeadInbox {
  generatedAt: string;
  summary: {
    discoverySearchBriefs?: Array<{
      state: string;
      tier: string;
      sourceFamilies: string[];
      searchQueries: string[];
      ledgerStrategy: string;
    }>;
  };
  leads: Lead[];
}

interface SourceAttempt {
  family: string;
  method: string;
  result: string;
}

interface Claim {
  id: string;
  state: string;
  stateCode: string;
  mode: WorkMode;
  claimedAt: string;
  leaseExpiresAt: string;
  status: ClaimStatus;
  candidateIds: string[];
  completedAt?: string;
  outcome?: Outcome;
  sourceAttempts?: SourceAttempt[];
  factsChanged?: string[];
  blocker?: string | null;
  retryCondition?: string | null;
  notes?: string;
}

interface ControlState {
  version: number;
  updatedAt: string | null;
  claims: Claim[];
}

interface CompletionReport {
  version: number;
  workOrderId: string;
  outcome: Outcome;
  candidateIds: string[];
  sourceAttempts: SourceAttempt[];
  factsChanged: string[];
  blocker: string | null;
  retryCondition: string | null;
  notes: string;
}

interface ScoredState {
  profile: StateProfile;
  score: number;
  recentClaims: number;
  daysSinceClaim: number | null;
  leads: Lead[];
  reasons: string[];
}

interface WorkOrder {
  version: 1;
  id: string;
  generatedAt: string;
  leaseExpiresAt: string;
  state: string;
  stateCode: string;
  mode: WorkMode;
  selection: {
    score: number;
    reasons: string[];
    recentClaimsInWindow: number;
    daysSinceLastClaim: number | null;
  };
  specialization: {
    playbookPath: string;
    primarySourceFamilies: string[];
    fallbackSourceFamilies: string[];
    mandatoryChecks: string[];
    sourceRecoveryTactics: string[];
  };
  candidates: Lead[];
  executionContract: {
    minimumDistinctSourceFamilies: number;
    minimumDiscoveryTouches: number;
    maximumStaleCandidateRechecks: number;
    requiredStartupFiles: string[];
    requiredBehavior: string[];
    allowedOutcomes: Outcome[];
    completionCommand: string;
  };
}

const root = process.cwd();
const controlDir = path.join(root, 'automations', 'route-control-plane');
const profilesPath = path.join(controlDir, 'state-profiles.json');
const statePath = path.join(controlDir, 'state.json');
const lockPath = path.join(controlDir, '.lock');
const inboxPath = path.join(root, 'docs', 'route-lead-inbox.json');
const workOrderJsonPath = path.join(controlDir, 'current-work-order.json');
const workOrderMarkdownPath = path.join(controlDir, 'current-work-order.md');
const previewJsonPath = path.join(controlDir, 'next-work-order-preview.json');
const previewMarkdownPath = path.join(controlDir, 'next-work-order-preview.md');
const reportsDir = path.join(controlDir, 'reports');

async function readJson<T>(filePath: string): Promise<T> {
  return JSON.parse(await readFile(filePath, 'utf8')) as T;
}

async function writeJson(filePath: string, value: unknown) {
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await rename(temporaryPath, filePath);
}

async function withLock<T>(operation: () => Promise<T>): Promise<T> {
  await mkdir(controlDir, { recursive: true });
  let handle;
  try {
    handle = await open(lockPath, 'wx');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
      throw new Error('The route control plane is already being updated. Retry after the active claim/complete operation finishes.');
    }
    throw error;
  }

  try {
    return await operation();
  } finally {
    await handle.close();
    await rm(lockPath, { force: true });
  }
}

function expireClaims(state: ControlState, now: Date) {
  for (const claim of state.claims) {
    if (claim.status === 'claimed' && new Date(claim.leaseExpiresAt) <= now) {
      claim.status = 'expired';
    }
  }
}

function daysBetween(earlier: string, now: Date) {
  return Math.max(0, (now.valueOf() - new Date(earlier).valueOf()) / 86_400_000);
}

function activeLeadValue(leads: Lead[]) {
  const implementationReady = leads.filter((lead) => lead.lane === 'implementation_ready').length;
  const bestPriority = leads.reduce((best, lead) => Math.max(best, lead.priority), 0);
  return {
    implementationReady,
    score: Math.min(18, implementationReady * 6) + bestPriority / 10,
  };
}

export function selectState(
  profiles: ProfilesFile,
  inbox: LeadInbox,
  controlState: ControlState,
  now: Date,
  requestedMode?: WorkMode,
): ScoredState {
  const enabled = profiles.states.filter((profile) => {
    if (!profile.enabled) return false;
    if (requestedMode !== 'implementation') return true;
    return inbox.leads.some(
      (lead) =>
        (lead.state === profile.state || lead.state === profile.code) &&
        lead.lane === 'implementation_ready',
    );
  });
  if (enabled.length === 0 && requestedMode === 'implementation') {
    throw new Error('No route is implementation-ready. Start research first.');
  }
  const activeStates = new Set(
    controlState.claims.filter((claim) => claim.status === 'claimed').map((claim) => claim.state),
  );
  const recent = controlState.claims
    .filter((claim) => claim.status !== 'expired')
    .slice(-profiles.defaults.historyWindow);
  const latest = recent.at(-1);
  const difficultRunDue =
    recent.length >= profiles.defaults.difficultStateReservationEvery - 1 &&
    !recent.slice(-profiles.defaults.difficultStateReservationEvery + 1)
      .some((claim) => profiles.states.find((profile) => profile.state === claim.state)?.difficulty === 'difficult');

  let eligible = enabled.filter((profile) => !activeStates.has(profile.state));
  if (latest) {
    const consecutive = [...recent].reverse().findIndex((claim) => claim.state !== latest.state);
    const consecutiveCount = consecutive === -1 ? recent.length : consecutive;
    if (consecutiveCount >= profiles.defaults.maxConsecutiveClaims) {
      eligible = eligible.filter((profile) => profile.state !== latest.state);
    }
  }
  if (difficultRunDue && eligible.some((profile) => profile.difficulty === 'difficult')) {
    eligible = eligible.filter((profile) => profile.difficulty === 'difficult');
  }
  if (eligible.length === 0) {
    throw new Error('No state is eligible: every enabled state has an active lease or the fairness constraints are impossible.');
  }

  const totalWeight = enabled.reduce((sum, profile) => sum + profile.weight, 0);
  const discoveryStates = new Set((inbox.summary.discoverySearchBriefs ?? []).map((brief) => brief.state));
  const scored = eligible.map<ScoredState>((profile) => {
    const stateClaims = recent.filter((claim) => claim.state === profile.state);
    const lastClaim = [...controlState.claims].reverse().find((claim) => claim.state === profile.state);
    const leads = inbox.leads.filter((lead) => lead.state === profile.state || lead.state === profile.code);
    const targetClaims = ((recent.length + 1) * profile.weight) / totalWeight;
    const fairnessDeficit = targetClaims - stateClaims.length;
    const leadValue = activeLeadValue(leads);
    const daysSinceClaim = lastClaim ? daysBetween(lastClaim.claimedAt, now) : null;
    const neverSelectedBonus = lastClaim ? 0 : 45;
    const stalenessBonus = daysSinceClaim === null ? 0 : Math.min(30, daysSinceClaim * 2);
    const discoveryBonus = discoveryStates.has(profile.state) ? 5 : 0;
    const difficultBonus = difficultRunDue && profile.difficulty === 'difficult' ? 35 : 0;
    const score =
      fairnessDeficit * 100 +
      neverSelectedBonus +
      stalenessBonus +
      discoveryBonus +
      difficultBonus +
      leadValue.score;
    const reasons = [
      `${stateClaims.length} claim(s) in the ${profiles.defaults.historyWindow}-claim fairness window; weighted target is ${targetClaims.toFixed(2)}.`,
      leads.length > 0
        ? `${leads.length} open ledger lead(s), including ${leadValue.implementationReady} implementation-ready.`
        : 'No open ledger lead; assign bounded fresh discovery instead of silently skipping the state.',
    ];
    if (profile.difficulty === 'difficult') {
      reasons.push('Protected difficult-state rotation applies.');
    }
    if (difficultRunDue) {
      reasons.push(`A difficult-state reservation is due every ${profiles.defaults.difficultStateReservationEvery} claims.`);
    }
    if (lastClaim?.outcome?.startsWith('blocked_')) {
      reasons.push(`The previous outcome was ${lastClaim.outcome}; this work order must use recovery tactics rather than repeat the same attempt.`);
    }
    return {
      profile,
      score,
      recentClaims: stateClaims.length,
      daysSinceClaim,
      leads,
      reasons,
    };
  });

  return scored.sort((left, right) => right.score - left.score || left.profile.state.localeCompare(right.profile.state))[0];
}

function makeId(profile: StateProfile, now: Date) {
  return `${profile.code.toLowerCase()}-${now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}`;
}

export function buildWorkOrder(
  selected: ScoredState,
  profiles: ProfilesFile,
  controlState: ControlState,
  now: Date,
  requestedMode?: WorkMode,
): WorkOrder {
  const implementationLeads = selected.leads
    .filter((lead) => lead.lane === 'implementation_ready')
    .sort((left, right) => right.priority - left.priority);
  const researchLeads = selected.leads
    .filter((lead) => lead.lane !== 'implementation_ready')
    .sort((left, right) => right.priority - left.priority);
  const mode: WorkMode = requestedMode ?? (implementationLeads.length > 0 ? 'implementation' : 'research');
  const candidates = (mode === 'implementation' ? implementationLeads : researchLeads).slice(0, mode === 'implementation' ? 3 : 6);
  const id = makeId(selected.profile, now);
  const leaseExpiresAt = new Date(now.valueOf() + profiles.defaults.claimLeaseMinutes * 60_000).toISOString();
  const previous = [...controlState.claims].reverse().find((claim) => claim.state === selected.profile.state);
  const recoveryTactics = [...(selected.profile.sourceRecoveryTactics ?? [])];

  if (previous?.outcome === 'blocked_source_access') {
    recoveryTactics.unshift(
      'Do not repeat the same URL/method first. Start with an alternate endpoint, PDF, GIS layer, API, cached official document, or responsible manager.',
    );
  }

  return {
    version: 1,
    id,
    generatedAt: now.toISOString(),
    leaseExpiresAt,
    state: selected.profile.state,
    stateCode: selected.profile.code,
    mode,
    selection: {
      score: Number(selected.score.toFixed(2)),
      reasons: selected.reasons,
      recentClaimsInWindow: selected.recentClaims,
      daysSinceLastClaim: selected.daysSinceClaim === null ? null : Number(selected.daysSinceClaim.toFixed(1)),
    },
    specialization: {
      playbookPath: selected.profile.playbookPath,
      primarySourceFamilies: selected.profile.primarySourceFamilies,
      fallbackSourceFamilies: selected.profile.fallbackSourceFamilies,
      mandatoryChecks: selected.profile.mandatoryChecks,
      sourceRecoveryTactics: recoveryTactics,
    },
    candidates,
    executionContract: {
      minimumDistinctSourceFamilies: mode === 'implementation' ? 2 : profiles.defaults.minimumSourceFamilies,
      minimumDiscoveryTouches: mode === 'implementation' ? 0 : profiles.defaults.minimumDiscoveryTouches,
      maximumStaleCandidateRechecks: profiles.defaults.maximumStaleCandidateRechecks,
      requiredStartupFiles: [
        selected.profile.playbookPath,
        'docs/route-addition-requirements.md',
        'docs/route-safety-policy.md',
        'docs/route-candidate-ledger.json',
        'docs/route-lead-inbox.json',
      ],
      requiredBehavior: [
        'Stay within the assigned state for this work order.',
        'Use the state playbook and mandatory checks; the general controller does not replace local expertise.',
        'If a site fails, change retrieval method or source family and record the exact failure.',
        'Do not count opening the same failing page repeatedly as separate source attempts.',
        'A blocked result is valid only with a precise blocker, retry condition, and proof of the required source attempts.',
        'Prefer several materially improved ledger facts over spending the entire run on one stale blocker.',
        'Never weaken route safety, access, gauge, coordinate, or threshold gates to manufacture progress.',
      ],
      allowedOutcomes: [
        'implemented',
        'promoted',
        'progress',
        'blocked_source_access',
        'blocked_threshold',
        'blocked_access',
        'blocked_live_provider',
        'no_change',
        'invalidated',
      ],
      completionCommand:
        'npm run routes:control:complete -- path/to/completion-report.json',
    },
  };
}

function markdownFor(order: WorkOrder) {
  const lines = [
    '# Route Control-Plane Work Order',
    '',
    `- ID: \`${order.id}\``,
    `- State: **${order.state}**`,
    `- Mode: **${order.mode}**`,
    `- Lease expires: ${order.leaseExpiresAt}`,
    '',
    '## Why this state',
    '',
    ...order.selection.reasons.map((reason) => `- ${reason}`),
    '',
    '## State specialization',
    '',
    `Read \`${order.specialization.playbookPath}\` before research.`,
    '',
    `Primary sources: ${order.specialization.primarySourceFamilies.join('; ')}`,
    '',
    `Fallback sources: ${order.specialization.fallbackSourceFamilies.join('; ')}`,
    '',
    'Mandatory checks:',
    '',
    ...order.specialization.mandatoryChecks.map((check) => `- ${check}`),
  ];

  if (order.specialization.sourceRecoveryTactics.length > 0) {
    lines.push('', 'Recovery tactics:', '', ...order.specialization.sourceRecoveryTactics.map((tactic) => `- ${tactic}`));
  }

  lines.push('', '## Candidate queue', '');
  if (order.candidates.length === 0) {
    lines.push('- No open candidate is queued. Perform bounded fresh discovery and seed qualified leads in the ledger.');
  } else {
    for (const candidate of order.candidates) {
      lines.push(
        `- **${candidate.river} — ${candidate.route}** (\`${candidate.candidateId}\`, ${candidate.lane}, priority ${candidate.priority})`,
        `  Next: ${candidate.recommendedNextStep}`,
      );
    }
  }

  lines.push(
    '',
    '## Completion contract',
    '',
    `- Use at least ${order.executionContract.minimumDistinctSourceFamilies} distinct source families.`,
    order.executionContract.minimumDiscoveryTouches > 0
      ? `- Make at least ${order.executionContract.minimumDiscoveryTouches} bounded discovery touches.`
      : '- Reverify the implementation evidence; broad discovery is not required.',
    `- Recheck no more than ${order.executionContract.maximumStaleCandidateRechecks} stale candidates.`,
    '- Record exact methods and results in a completion report.',
    '- A no-change or blocked outcome requires a specific blocker and retry condition.',
    '',
    'Complete with:',
    '',
    `\`${order.executionContract.completionCommand}\``,
    '',
  );
  return lines.join('\n');
}

async function loadInputs(now: Date) {
  const [profiles, inbox, controlState] = await Promise.all([
    readJson<ProfilesFile>(profilesPath),
    readJson<LeadInbox>(inboxPath),
    readJson<ControlState>(statePath),
  ]);
  expireClaims(controlState, now);
  return { profiles, inbox, controlState };
}

async function plan(claim: boolean, requestedMode?: WorkMode) {
  const execute = async () => {
    const now = new Date();
    const { profiles, inbox, controlState } = await loadInputs(now);
    const selected = selectState(profiles, inbox, controlState, now, requestedMode);
    const order = buildWorkOrder(selected, profiles, controlState, now, requestedMode);

    if (claim) {
      controlState.claims.push({
        id: order.id,
        state: order.state,
        stateCode: order.stateCode,
        mode: order.mode,
        claimedAt: order.generatedAt,
        leaseExpiresAt: order.leaseExpiresAt,
        status: 'claimed',
        candidateIds: order.candidates.map((candidate) => candidate.candidateId),
      });
      controlState.updatedAt = now.toISOString();
      await writeJson(statePath, controlState);
    }

    const jsonOutputPath = claim ? workOrderJsonPath : previewJsonPath;
    const markdownOutputPath = claim ? workOrderMarkdownPath : previewMarkdownPath;
    await Promise.all([
      writeJson(jsonOutputPath, order),
      writeFile(markdownOutputPath, `${markdownFor(order)}\n`, 'utf8'),
    ]);
    process.stdout.write(
      `${claim ? 'Claimed' : 'Planned'} ${order.state} ${order.mode} work order ${order.id}.\n` +
      `${markdownOutputPath}\n`,
    );
  };

  if (claim) {
    await withLock(execute);
  } else {
    await execute();
  }
}

export function validateCompletion(report: CompletionReport, claim: Claim, defaults: Defaults) {
  if (report.version !== 1) {
    throw new Error('Completion report version must be 1.');
  }
  if (report.workOrderId !== claim.id) {
    throw new Error(`Completion report targets ${report.workOrderId}; active work order is ${claim.id}.`);
  }
  const allowed: Outcome[] = [
    'implemented',
    'promoted',
    'progress',
    'blocked_source_access',
    'blocked_threshold',
    'blocked_access',
    'blocked_live_provider',
    'no_change',
    'invalidated',
  ];
  if (!allowed.includes(report.outcome)) {
    throw new Error(`Unsupported completion outcome: ${report.outcome}`);
  }
  const requiredFamilies = claim.mode === 'implementation' ? 2 : defaults.minimumSourceFamilies;
  const requiredTouches = claim.mode === 'implementation' ? requiredFamilies : defaults.minimumDiscoveryTouches;
  const families = new Set(report.sourceAttempts.map((attempt) => attempt.family.trim().toLowerCase()).filter(Boolean));
  if (families.size < requiredFamilies) {
    throw new Error(`Completion requires ${requiredFamilies} distinct source families; received ${families.size}.`);
  }
  if (report.sourceAttempts.length < requiredTouches) {
    throw new Error(`Completion requires ${requiredTouches} bounded source attempts; received ${report.sourceAttempts.length}.`);
  }
  for (const attempt of report.sourceAttempts) {
    if (!attempt.family.trim() || !attempt.method.trim() || !attempt.result.trim()) {
      throw new Error('Every source attempt requires family, method, and result.');
    }
  }
  if (
    ['blocked_source_access', 'blocked_threshold', 'blocked_access', 'blocked_live_provider', 'no_change'].includes(report.outcome) &&
    (!report.blocker?.trim() || !report.retryCondition?.trim())
  ) {
    throw new Error(`${report.outcome} requires both blocker and retryCondition.`);
  }
  if (report.outcome === 'blocked_source_access') {
    const methods = new Set(report.sourceAttempts.map((attempt) => attempt.method.trim().toLowerCase()));
    if (methods.size < 2) {
      throw new Error('blocked_source_access requires at least two distinct retrieval methods.');
    }
  }
  if (!report.notes.trim()) {
    throw new Error('Completion notes are required.');
  }
}

async function complete(reportPathArgument: string | undefined) {
  if (!reportPathArgument) {
    throw new Error('Usage: npm run routes:control:complete -- path/to/completion-report.json');
  }
  const reportPath = path.resolve(root, reportPathArgument);
  await withLock(async () => {
    const now = new Date();
    const [profiles, controlState, report] = await Promise.all([
      readJson<ProfilesFile>(profilesPath),
      readJson<ControlState>(statePath),
      readJson<CompletionReport>(reportPath),
    ]);
    expireClaims(controlState, now);
    const claim = controlState.claims.find((entry) => entry.id === report.workOrderId);
    if (!claim) {
      throw new Error(`Unknown work order: ${report.workOrderId}`);
    }
    if (claim.status !== 'claimed') {
      throw new Error(`Work order ${claim.id} is ${claim.status}, not claimable for completion.`);
    }
    validateCompletion(report, claim, profiles.defaults);
    Object.assign(claim, {
      status: 'completed' as ClaimStatus,
      completedAt: now.toISOString(),
      outcome: report.outcome,
      candidateIds: report.candidateIds,
      sourceAttempts: report.sourceAttempts,
      factsChanged: report.factsChanged,
      blocker: report.blocker,
      retryCondition: report.retryCondition,
      notes: report.notes,
    });
    controlState.updatedAt = now.toISOString();
    await mkdir(reportsDir, { recursive: true });
    await Promise.all([
      writeJson(statePath, controlState),
      writeJson(path.join(reportsDir, `${claim.id}.json`), report),
    ]);
    process.stdout.write(`Completed ${claim.id} with outcome ${report.outcome}.\n`);
  });
}

async function main() {
  const command = process.argv[2] ?? 'plan';
  const modeFlagIndex = process.argv.indexOf('--mode');
  const requestedMode = modeFlagIndex >= 0 ? process.argv[modeFlagIndex + 1] as WorkMode : undefined;
  if (requestedMode && !['research', 'implementation'].includes(requestedMode)) {
    throw new Error('--mode must be research or implementation.');
  }
  if (command === 'plan') {
    await plan(false, requestedMode);
    return;
  }
  if (command === 'claim') {
    await plan(true, requestedMode);
    return;
  }
  if (command === 'complete') {
    await complete(process.argv[3]);
    return;
  }
  throw new Error('Usage: route-control-plane.ts [plan|claim [--mode research|implementation]|complete <report.json>]');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}

export type {
  Claim,
  CompletionReport,
  ControlState,
  Defaults,
  LeadInbox,
  ProfilesFile,
  WorkOrder,
};
