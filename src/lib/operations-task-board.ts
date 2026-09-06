const lanes = new Set(['proposed', 'ready', 'in_progress', 'blocked', 'completed', 'done']);
const schedulable = new Set(['proposed', 'ready', 'in_progress']);
const text = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
type Task = Record<string, any>;

export function validateTaskBoard(payload: unknown, now = new Date()) {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!payload || typeof payload !== 'object' || !Array.isArray((payload as Task).tasks)) return { errors: ['Task board must contain a tasks array.'], warnings };
  const seen = new Set<string>();
  for (const [index, task] of (payload as { tasks: Task[] }).tasks.entries()) {
    if (!task || typeof task !== 'object' || Array.isArray(task)) { errors.push(`Row ${index}: task must be an object.`); continue; }
    const label = text(task.id) ? task.id : `Row ${index}`;
    for (const field of ['id', 'title', 'kind', 'summary']) if (!text(task[field])) errors.push(`${label}: missing ${field}.`);
    if (seen.has(task.id)) errors.push(`${label}: duplicate id.`);
    seen.add(task.id);
    if (!lanes.has(task.lane)) errors.push(`${label}: invalid or missing lane.`);
    const normalizedStatus = task.status === 'done' ? 'completed' : task.status;
    const normalizedLane = task.lane === 'done' ? 'completed' : task.lane;
    if (lanes.has(task.status) && normalizedStatus !== normalizedLane) {
      if (task.lane === 'blocked' && task.metadata?.workflowReconciliation?.reason && text(task.retryCondition)) warnings.push(`${label}: legacy status conflict quarantined; ${task.retryCondition}`);
      else errors.push(`${label}: status ${task.status} conflicts with lane ${task.lane}.`);
    }
    if (schedulable.has(task.lane)) {
      if (!text(task.owner)) errors.push(`${label}: schedulable task needs an owner.`);
      if (!['critical', 'high', 'medium', 'low'].includes(task.priority)) errors.push(`${label}: schedulable task needs a valid priority.`);
      if (!Array.isArray(task.evidence) || !task.evidence.length || task.evidence.some((item: unknown) => !text(item))) errors.push(`${label}: schedulable task needs evidence references.`);
    }
    if (task.updatedAt && Date.parse(task.updatedAt) > now.getTime()) warnings.push(`${label}: future-dated updatedAt; original timestamp preserved.`);
  }
  return { errors, warnings };
}

// Only normalize an already-declared terminal state. Never infer readiness or completion from prose.
export function normalizeTerminalLanes(tasks: Task[]) {
  const changes: Array<{ id: string; lane: string; source: string }> = [];
  const normalized = tasks.map(task => {
    if (task.lane !== undefined || !['completed', 'done'].includes(task.status)) return task;
    changes.push({ id: task.id, lane: 'completed', source: `status:${task.status}` });
    return { ...task, lane: 'completed' };
  });
  return { tasks: normalized, changes };
}
