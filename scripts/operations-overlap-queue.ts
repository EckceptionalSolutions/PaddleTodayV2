import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

type QueueStatus = 'new' | 'reviewing' | 'approved' | 'rejected' | 'implemented';
type FindingType = 'duplicate_or_reversed' | 'access_chain_contains' | 'crossing_segments' | 'contained_connector' | 'near_collinear_overlap' | 'shared_endpoint';

type QueueItem = {
  id: string;
  fingerprint: string;
  state: string;
  group: string;
  category: 'probable_duplicate' | 'localized_crossing_review' | 'route_family_overlap' | 'route_family_geometry';
  proposedModel: 'duplicate_resolution' | 'route_family_multi_endpoint' | 'geometry_review';
  priority: 'high' | 'medium';
  status: QueueStatus;
  routes: string[];
  findingTypes: FindingType[];
  findingCount: number;
  maxSeverity: number;
  recommendation: string;
  safetyAccessReview: string;
  source: 'routes:audit:overlap';
  firstSeenAt: string;
  lastSeenAt: string;
  taskId?: string;
};

type TasksFile = { version: number; updatedAt?: string; tasks: Array<Record<string, unknown>> };
type RunsFile = { version: number; runs: Array<Record<string, unknown>>; updatedAt?: string };

const root = process.cwd();
const csvPath = path.join(root, 'tmp', 'route-overlap-audit.csv');
const queuePath = path.join(root, 'docs', 'operations', 'overlap-review-queue.json');
const tasksPath = path.join(root, 'docs', 'operations', 'tasks.json');
const runsPath = path.join(root, 'docs', 'operations', 'runs.json');

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (quoted) {
      if (char === '"' && next === '"') { field += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (char !== '\r') field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift() ?? [];
  return rows.filter((r) => r.length === headers.length).map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i]])));
}

function classify(types: Set<FindingType>, routeCount: number): QueueItem['category'] | null {
  if (types.has('duplicate_or_reversed')) return 'probable_duplicate';
  if (types.has('crossing_segments') && routeCount <= 4) return 'localized_crossing_review';
  if (types.has('access_chain_contains') || types.has('contained_connector')) return 'route_family_overlap';
  if (types.has('crossing_segments') || types.has('near_collinear_overlap')) return 'route_family_geometry';
  return null;
}

function recommendation(category: QueueItem['category']) {
  if (category === 'probable_duplicate') return 'Independent source review before merge, retirement, or suppression; preserve the strongest evidence package.';
  if (category === 'localized_crossing_review') return 'Verify endpoint order, river continuity, access legality, and whether the routes are genuinely distinct before proposing a family model.';
  if (category === 'route_family_overlap') return 'Prefer a corridor family with selectable validated in/out pairs when safety, gauge, and logistics remain explicit.';
  return 'Review route geometry and access-chain continuity; do not delete spans solely because they are collinear.';
}

function safetyAccessReview(category: QueueItem['category']) {
  return category === 'probable_duplicate'
    ? 'Compare public access, gauge applicability, distance, hazards, camping, and route-specific logistics before any consolidation.'
    : 'Confirm every put-in/take-out, portage, hazard, gauge reach, and material logistics difference remains visible in the proposed family model.';
}

function proposedModel(category: QueueItem['category']): QueueItem['proposedModel'] {
  if (category === 'probable_duplicate') return 'duplicate_resolution';
  if (category === 'route_family_overlap') return 'route_family_multi_endpoint';
  return 'geometry_review';
}

function fingerprint(row: Record<string, string>) {
  return [row.state, row.route_a, row.route_b].sort().join('|');
}

async function main() {
  const rows = parseCsv(await readFile(csvPath, 'utf8'));
  const grouped = new Map<string, { state: string; routes: Set<string>; types: Set<FindingType>; count: number; maxSeverity: number }>();
  for (const row of rows) {
    const key = `${row.state}|${row.name_a}`;
    const current = grouped.get(key) ?? { state: row.state, routes: new Set<string>(), types: new Set<FindingType>(), count: 0, maxSeverity: 0 };
    current.routes.add(row.route_a); current.routes.add(row.route_b);
    current.types.add(row.type as FindingType); current.count += 1; current.maxSeverity = Math.max(current.maxSeverity, Number(row.severity) || 0);
    grouped.set(key, current);
  }

  const previous = await readFile(queuePath, 'utf8').then((value) => JSON.parse(value) as { items?: QueueItem[] }).catch(() => ({ items: [] }));
  const previousByFingerprint = new Map((previous.items ?? []).map((item) => [item.fingerprint, item]));
  const now = new Date().toISOString();
  const items: QueueItem[] = [];
  for (const group of grouped.values()) {
    const category = classify(group.types, group.routes.size);
    if (!category || group.maxSeverity < 70) continue;
    const routes = [...group.routes].sort();
    const fp = crypto.createHash('sha1').update(`${group.state}|${routes.join('|')}`).digest('hex').slice(0, 12);
    const old = previousByFingerprint.get(fp);
    const item: QueueItem = {
      id: old?.id ?? `overlap-review-${fp}`,
      fingerprint: fp,
      state: group.state,
      group: `${group.state} · ${routes.slice(0, 3).join(' ↔ ')}${routes.length > 3 ? ` +${routes.length - 3}` : ''}`,
      category,
      proposedModel: proposedModel(category),
      priority: category === 'probable_duplicate' || category === 'localized_crossing_review' || (category === 'route_family_overlap' && (group.count >= 20 || group.maxSeverity >= 88)) ? 'high' : 'medium',
      status: old?.status ?? 'new',
      routes,
      findingTypes: [...group.types].sort(),
      findingCount: group.count,
      maxSeverity: group.maxSeverity,
      recommendation: recommendation(category),
      safetyAccessReview: safetyAccessReview(category),
      source: 'routes:audit:overlap',
      firstSeenAt: old?.firstSeenAt ?? now,
      lastSeenAt: now,
      taskId: old?.taskId,
    };
    items.push(item);
  }
  items.sort((a, b) => (a.priority === 'high' ? -1 : 1) - (b.priority === 'high' ? -1 : 1) || b.maxSeverity - a.maxSeverity || a.id.localeCompare(b.id));
  const bounded = items.slice(0, 40);
  const tasks = JSON.parse(await readFile(tasksPath, 'utf8')) as TasksFile;
  const existing = new Map(tasks.tasks.map((task) => [String(task.id), task]));
  // Only open findings may consume the bounded auto-created-task budget. Completed,
  // rejected, and already-implemented queue items must not crowd out fresh work.
  const highCandidates = bounded.filter((candidate) => (
    candidate.priority === 'high' && (candidate.status === 'new' || candidate.status === 'reviewing')
  ));
  const villageCreek = highCandidates.find((candidate) => candidate.group.toLowerCase().includes('village-creek'));
  const selectedHigh = highCandidates.slice(0, 6);
  if (villageCreek && !selectedHigh.includes(villageCreek)) selectedHigh[selectedHigh.length - 1] = villageCreek;
  for (const item of selectedHigh) {
    const taskId = item.taskId ?? item.id;
    item.taskId = taskId;
    const prior = existing.get(taskId);
    const task = {
      id: taskId,
      title: `Review route consolidation candidate: ${item.group}`,
      lane: prior?.lane ?? 'ready',
      kind: 'consolidation_review',
      owner: 'independent-verifier',
      priority: item.group.toLowerCase().includes('village-creek') ? 'critical' : item.priority,
      summary: `${item.recommendation} Queue status: ${item.status}. ${item.safetyAccessReview}`,
      evidence: ['docs/operations/overlap-review-queue.json', 'tmp/route-overlap-audit.csv', 'docs/operations/overlap-consolidation-summary.md'],
      routeSlugs: item.routes,
      sourceFindingId: item.id,
    };
    existing.set(taskId, task);
  }
  tasks.tasks = [...existing.values()];
  tasks.updatedAt = now;
  await writeFile(tasksPath, JSON.stringify(tasks, null, 2) + '\n');
  await writeFile(queuePath, JSON.stringify({ version: 1, generatedAt: now, source: 'npm run routes:audit:overlap', limits: { maxOpenItems: 40, maxAutoCreatedTasks: 6 }, items: bounded }, null, 2) + '\n');

  const runs = JSON.parse(await readFile(runsPath, 'utf8')) as RunsFile;
  runs.runs.push({ id: `overlap-auditor-${now.replace(/[-:.TZ]/g, '').slice(0, 14)}`, kind: 'route_overlap_audit', startedAt: now, completedAt: now, status: 'completed', automationId: 'paddletoday-route-overlap-auditor', findings: rows.length, reviewItems: bounded.length, autoCreatedTasks: selectedHigh.length, summary: `Persisted ${bounded.length} bounded deduplicated consolidation review items; ${selectedHigh.length} open high-confidence items are verifier-gated.` });
  runs.updatedAt = now;
  await writeFile(runsPath, JSON.stringify(runs, null, 2) + '\n');
  console.log(JSON.stringify({ findings: rows.length, reviewItems: bounded.length, autoCreatedTasks: selectedHigh.length }));
}

main().catch((error) => { console.error(error); process.exit(1); });
