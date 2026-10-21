import assert from 'node:assert/strict';
import { posix } from 'node:path';
import { parse } from 'yaml';

export const productionWorkflows = [
  'azure-static-web-apps.yml', 'azure-app-service-api.yml', 'azure-container-apps-snapshot-worker.yml',
];
const sha = value => typeof value === 'string' && /^[a-f0-9]{40}$/.test(value);
const terminalFailure = run => run.status === 'completed' && run.conclusion !== 'success';

export function githubClient(repository, token, fetchImpl = fetch) {
  assert.match(repository, /^[\w.-]+\/[\w.-]+$/);
  assert.ok(token, 'GitHub token is required');
  return async (path, body) => {
    assert.ok((path === '' || path.startsWith('/')) && !path.replace(/\.\.\./g, '').includes('..'), 'Unexpected GitHub API path');
    const response = await fetchImpl(path === '/graphql' ? 'https://api.github.com/graphql' : `https://api.github.com/repos/${repository}${path}`, {
      method: body === undefined ? 'GET' : 'POST', redirect: 'error', signal: AbortSignal.timeout(30000),
      headers: { accept: 'application/vnd.github+json', authorization: `Bearer ${token}`, 'content-type': 'application/json', 'X-GitHub-Api-Version': '2026-03-10' },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    assert.ok(response.ok, `GitHub ${body === undefined ? 'GET' : 'POST'} ${path}: HTTP ${response.status}`);
    return response.status === 204 ? null : response.json();
  };
}

async function pages(api, path, key) {
  const values = [];
  for (let page = 1; page <= 10; page++) {
    const payload = await api(`${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
    const batch = key ? payload[key] : payload;
    assert.ok(Array.isArray(batch), `Invalid paginated response: ${path}`);
    values.push(...batch);
    if (batch.length < 100) return values;
  }
  throw new Error(`Pagination limit reached: ${path}; refusing to assume missing records`);
}

export function matchesDeploymentPaths(files, patterns) {
  assert.ok(Array.isArray(patterns) && patterns.length, 'Deployment push paths are required');
  return files.some(file => {
    let included = false;
    for (const pattern of patterns) {
      const negative = pattern.startsWith('!');
      if (posix.matchesGlob(file, negative ? pattern.slice(1) : pattern)) included = !negative;
    }
    return included;
  });
}

export function deploymentSource(run, name) {
  const prefix = `${name} · `, suffix = ' · deploy';
  if (!run.display_title?.startsWith(prefix) || !run.display_title.endsWith(suffix)) return null;
  const revision = run.display_title.slice(prefix.length, -suffix.length);
  return sha(revision) ? revision : null;
}

export async function dispatchMergedDeployments({ api, repository, gateRunId, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)), onReport = () => {} }) {
  assert.ok(Number.isSafeInteger(Number(gateRunId)) && Number(gateRunId) > 0, 'A gate run ID is required');
  const report = { gateRunId: Number(gateRunId), status: 'resolving-merge', components: [], runIds: [], limit: 'A dispatch is not publication proof. Monitor these exact runs; release-specific public content checks remain separate.' };
  const save = () => onReport(structuredClone(report));
  save();
  try {
    const gate = await api(`/actions/runs/${gateRunId}`);
    assert.equal(gate.name, 'Operations gates');
    assert.equal(gate.event, 'pull_request');
    assert.equal(gate.status, 'completed'); assert.equal(gate.conclusion, 'success');
    assert.equal(gate.head_repository?.full_name, repository, 'Only same-repository gate runs can publish');
    assert.ok(sha(gate.head_sha));
    const metadata = await api('');
    const branch = metadata.default_branch;
    assert.equal(branch, 'main', 'Unexpected production branch');
    // GitHub often empties workflow_run.pull_requests after squash merges.
    const associated = await pages(api, `/commits/${gate.head_sha}/pulls`);
    const candidates = associated.filter(pr => pr.head?.sha === gate.head_sha && pr.head?.repo?.full_name === repository && pr.base?.repo?.full_name === repository && pr.base?.ref === branch);
    assert.equal(candidates.length, 1, 'Expected exactly one same-repository PR for the tested head');
    let pr;
    for (let attempt = 0; attempt < 13; attempt++) {
      pr = await api(`/pulls/${candidates[0].number}`);
      assert.equal(pr.head.sha, gate.head_sha, 'The PR head changed after its gate run');
      assert.equal(pr.head.repo.full_name, repository); assert.equal(pr.base.repo.full_name, repository); assert.equal(pr.base.ref, branch);
      if (pr.merged_at) break;
      if (pr.state === 'closed') throw new Error('PR closed without merging');
      if (attempt < 12) await sleep(5000);
    }
    if (!pr.merged_at) { report.status = 'not-merged'; save(); return report; }
    // The 2026 REST pull response omits merge_commit_sha. Read the canonical
    // merge identity explicitly, retaining the tested-head and base checks.
    const [owner, name] = repository.split('/');
    const identity = await api('/graphql', {
      query: 'query PublicationMerge($owner:String!,$name:String!,$number:Int!){repository(owner:$owner,name:$name){pullRequest(number:$number){merged headRefOid baseRefName mergeCommit{oid}}}}',
      variables: { owner, name, number: pr.number },
    });
    assert.ok(!identity.errors?.length, 'Unable to read merged PR identity');
    const merge = identity.data?.repository?.pullRequest;
    assert.equal(merge?.merged, true); assert.equal(merge.headRefOid, gate.head_sha); assert.equal(merge.baseRefName, branch);
    assert.ok(sha(merge.mergeCommit?.oid), 'Merged PR has no verified merge commit');
    report.pullRequest = pr.number; report.mergeRevision = merge.mergeCommit.oid;
    const target = await api(`/commits/${branch}`);
    assert.ok(sha(target.sha));
    report.sourceRevision = target.sha;
    if (target.sha !== report.mergeRevision) {
      const inclusion = await api(`/compare/${report.mergeRevision}...${target.sha}`);
      assert.equal(inclusion.status, 'ahead', 'Tested merge is not in current main');
    }
    for (const file of productionWorkflows) {
      const content = await api(`/contents/.github/workflows/${file}?ref=${target.sha}`);
      const config = parse(Buffer.from(content.content, 'base64').toString('utf8'));
      assert.equal(config.on.workflow_dispatch.inputs.source_revision.type, 'string', `${file} cannot pin source`);
      const name = config.name;
      assert.ok(Number.isFinite(Date.parse(target.commit.committer.date)), 'Target commit date is required');
      const recent = await pages(api, `/actions/workflows/${file}/runs?created=${encodeURIComponent('>=' + target.commit.committer.date)}`, 'workflow_runs');
      const successful = await api(`/actions/workflows/${file}/runs?status=success&per_page=100`);
      // Only the explicit deploy title contract is evidence of a source deployment;
      // historical jobs and asset-only checks are not accepted as baselines.
      const baseline = successful.workflow_runs.find(run => deploymentSource(run, name) && run.status === 'completed' && run.conclusion === 'success');
      const baselineRevision = baseline ? deploymentSource(baseline, name) : null;
      let affected = !baseline;
      let reason = baseline ? 'source-already-deployed' : 'no-verified-baseline';
      if (baseline && baselineRevision !== target.sha) {
        const comparison = await api(`/compare/${baselineRevision}...${target.sha}`);
        assert.ok(['ahead', 'identical'].includes(comparison.status), `${file}: baseline is outside current main`);
        assert.ok(Array.isArray(comparison.files));
        // GitHub comparison file lists cap at 300. Publish conservatively rather
        // than missing a changed component outside a truncated list.
        affected = comparison.files.length >= 300 || matchesDeploymentPaths(comparison.files.flatMap(f => [f.filename, f.previous_filename].filter(Boolean)), config.on.push.paths);
        reason = comparison.files.length >= 300 ? 'comparison-may-be-truncated' : affected ? 'component-paths-changed' : 'no-component-paths-changed';
      }
      const component = { workflow: file, name, baselineRevision, affected, reason, state: affected ? 'planned' : 'not-affected' };
      report.components.push(component); save();
      if (!affected) continue;
      const existing = recent.find(run => deploymentSource(run, name) === target.sha);
      if (existing) {
        component.state = 'existing'; component.runId = existing.id; component.url = existing.html_url;
        assert.ok(!terminalFailure(existing), `${file}: existing deployment ${existing.id} failed; inspect or rerun that run`);
      }
      save();
    }
    // Finish all read-only planning before requesting any deployment. A later
    // main commit must be reconciled from its own current component baselines.
    assert.equal((await api(`/commits/${branch}`)).sha, target.sha, 'Main advanced during planning; no deployments dispatched. Reconcile the latest main.');
    for (const component of report.components.filter(c => c.affected)) {
      if (!component.runId) {
        component.state = 'dispatch-outcome-unknown'; save();
        // Never retry this POST on a timeout: it may already have created a run.
        const dispatched = await api(`/actions/workflows/${component.workflow}/dispatches`, { ref: branch, inputs: { source_revision: target.sha } });
        assert.ok(Number.isSafeInteger(dispatched?.workflow_run_id), `${component.workflow}: dispatch did not return a run ID; inspect before retrying`);
        component.state = 'requested'; component.runId = dispatched.workflow_run_id; component.url = dispatched.html_url;
      }
      report.runIds.push(component.runId); save();
    }
    report.status = report.runIds.length ? 'deployments-requested' : 'no-deployment-needed'; save(); return report;
  } catch (error) { report.error = error.message; report.status = 'failed'; save(); throw error; }
}

export async function waitForDeployments({ api, runIds, expectedSources = {}, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)), now = Date.now, timeoutMs = 35 * 60000, onReport = () => {} }) {
  assert.ok(runIds.length && runIds.every(id => Number.isSafeInteger(id) && id > 0));
  const deadline = now() + timeoutMs;
  while (true) {
    let runs;
    try { runs = await Promise.all(runIds.map(id => api(`/actions/runs/${id}`))); }
    catch (error) {
      // A failed observation does not mean a failed/stopped deployment. Keep
      // observing the same IDs and never dispatch replacement jobs here.
      onReport({ checkedAt: new Date(now()).toISOString(), status: 'observation-error', runIds, error: error.message });
      if (/HTTP (401|403)\b/.test(error.message)) throw error;
      assert.ok(now() < deadline, 'Timed out observing deployments; inspect the same run IDs before retrying anything.');
      await sleep(15000); continue;
    }
    const report = { checkedAt: new Date(now()).toISOString(), status: 'waiting', runs: runs.map(run => ({ id: run.id, status: run.status, conclusion: run.conclusion, url: run.html_url, title: run.display_title })) };
    try {
      for (let index = 0; index < runs.length; index++) {
        assert.equal(runs[index].id, runIds[index], 'Observed a different deployment run');
        const expected = expectedSources[runIds[index]];
        if (expected) assert.equal(deploymentSource(runs[index], expected.name), expected.sourceRevision, 'Deployment run has a different pinned source');
      }
    } catch (error) { report.status = 'identity-mismatch'; report.error = error.message; onReport(report); throw error; }
    const failed = runs.find(terminalFailure);
    if (failed) { report.status = 'failed'; onReport(report); throw new Error(`Deployment ${failed.id} ended with ${failed.conclusion}`); }
    if (runs.every(run => run.status === 'completed' && run.conclusion === 'success')) { report.status = 'deployment-workflows-succeeded'; onReport(report); return report; }
    onReport(report);
    assert.ok(now() < deadline, 'Timed out observing deployments; runs may still be live. Reinspect the same run IDs before retrying anything.');
    await sleep(15000);
  }
}
