import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import { parse } from 'yaml';
import { deploymentSource, dispatchMergedDeployments, githubClient, matchesDeploymentPaths, productionWorkflows, waitForDeployments } from './merged-deployments.mjs';

const repository = 'owner/repo', tested = 'a'.repeat(40), merged = 'b'.repeat(40), old = 'c'.repeat(40), newer = 'd'.repeat(40);
const names = productionWorkflows.map(file => parse(fs.readFileSync(`.github/workflows/${file}`, 'utf8')).name);
function fixture(options: any = {}) {
  const writes: any[] = [], reports: any[] = [], reads: string[] = []; let mainReads = 0;
  const target = options.newer ? newer : merged;
  const pr = { number: 110, state: options.unmerged ? 'open' : 'closed', merged_at: options.unmerged ? null : '2026-10-21T00:30:00Z',
    head: { sha: options.changedHead ? newer : tested, repo: { full_name: repository } }, base: { ref: 'main', repo: { full_name: repository } } };
  const run = (index: number, revision: string, status = 'completed', conclusion: string | null = 'success') => ({ id: 500 + index, display_title: `${names[index]} · ${revision} · deploy`, status, conclusion, html_url: `https://github.com/${repository}/actions/runs/${500 + index}` });
  const api = async (path: string, body?: any): Promise<any> => {
    if (path === '/graphql') {
      reads.push(path); expect(body.variables).toEqual({ owner: 'owner', name: 'repo', number: 110 });
      return { data: { repository: { pullRequest: { merged: true, headRefOid: options.badMergeHead ? newer : tested, baseRefName: 'main', mergeCommit: options.missingMerge ? null : { oid: merged } } } } };
    }
    if (body) { writes.push({ path, body }); if (options.unknownDispatch) throw new Error('Observation timeout after POST'); return { workflow_run_id: 900 + writes.length, html_url: `https://github.com/${repository}/actions/runs/${900 + writes.length}` }; }
    reads.push(path);
    if (path === '/actions/runs/100') return { name: 'Operations gates', event: 'pull_request', status: 'completed', conclusion: options.badGate ? 'failure' : 'success', head_sha: tested, head_repository: { full_name: options.fork ? 'someone/fork' : repository }, pull_requests: [] };
    if (path === '') return { default_branch: 'main' };
    if (path.startsWith(`/commits/${tested}/pulls`)) return [{ ...pr, head: { ...pr.head, sha: tested } }];
    if (path === '/pulls/110') return pr;
    if (path === '/commits/main') return { sha: options.advanceDuringPlan && ++mainReads > 1 ? newer : target, commit: { committer: { date: '2026-10-21T00:30:00Z' } } };
    if (path === `/compare/${merged}...${newer}`) return { status: options.diverged ? 'diverged' : 'ahead' };
    if (path.startsWith('/compare/')) return { status: 'ahead', files: options.files || [{ filename: 'src/data/routes/wisconsin.ts' }] };
    if (path.startsWith('/contents/')) { const file = path.split('/').at(-1)!.split('?')[0]; return { content: fs.readFileSync(`.github/workflows/${file}`).toString('base64') }; }
    if (path.startsWith('/actions/workflows/')) {
      const index = productionWorkflows.indexOf(path.split('/')[3]);
      if (path.includes('status=success')) return { workflow_runs: options.baseline ? [run(index, options.alreadyCurrent ? target : old)] : [] };
      return { workflow_runs: options.existing ? [run(index, target, options.failedExisting ? 'completed' : 'in_progress', options.failedExisting ? 'failure' : null)] : [] };
    }
    throw new Error(`Unexpected API read ${path}`);
  };
  return { writes, reads, reports, invoke: () => dispatchMergedDeployments({ api, repository, gateRunId: 100, sleep: async () => {}, onReport: (r: any) => reports.push(r) }) };
}

describe('merged publication handoff', () => {
  it('resolves an empty run PR list and a REST PR without merge_commit_sha, then pins deployments', async () => {
    const f = fixture(), result = await f.invoke();
    expect(result.status).toBe('deployments-requested'); expect(result.runIds).toEqual([901, 902, 903]);
    expect(f.writes.every(w => w.body.ref === 'main' && w.body.inputs.source_revision === merged)).toBe(true);
    expect(f.reads).toContain(`/commits/${tested}/pulls?per_page=100&page=1`);
    expect(f.reads).toContain('/graphql'); expect(result.mergeRevision).toBe(merged);
  });
  it.each([{ fork: true }, { badGate: true }, { changedHead: true }, { newer: true, diverged: true }, { badMergeHead: true }, { missingMerge: true }])('does not publish untrusted, failed or obsolete test evidence: %j', async options => {
    const f = fixture(options); await expect(f.invoke()).rejects.toThrow(); expect(f.writes).toEqual([]);
  });
  it('records an unmerged PR without dispatching or pretending it is published', async () => {
    const f = fixture({ unmerged: true }); expect((await f.invoke()).status).toBe('not-merged'); expect(f.writes).toEqual([]);
    expect(f.reads.filter(p => p === '/pulls/110')).toHaveLength(13);
  });
  it('does not dispatch a stale plan if main advances during read-only planning', async () => {
    const f = fixture({ advanceDuringPlan: true }); await expect(f.invoke()).rejects.toThrow('Main advanced'); expect(f.writes).toEqual([]);
  });
  it('selects component paths from their actual workflow filters', async () => {
    const f = fixture({ baseline: true, files: [{ filename: 'src/components/AccessPlanningContext.astro' }] });
    const result = await f.invoke(); expect(result.runIds).toHaveLength(2);
    expect(result.components[2].state).toBe('not-affected');
  });
  it('does not redeploy docs-only or already deployed revisions', async () => {
    for (const options of [{ baseline: true, files: [{ filename: 'docs/audits/note.json' }] }, { baseline: true, alreadyCurrent: true }]) {
      const f = fixture(options); expect((await f.invoke()).status).toBe('no-deployment-needed'); expect(f.writes).toEqual([]);
    }
  });
  it('uses each published baseline rather than losing changes from skipped intermediate handoffs', async () => {
    const f = fixture({ baseline: true, newer: true }); const result = await f.invoke();
    expect(result.sourceRevision).toBe(newer); expect(f.reads).toContain(`/compare/${old}...${newer}`);
    expect(f.writes.every(w => w.body.inputs.source_revision === newer)).toBe(true);
  });
  it('includes old paths of renamed files and safely handles truncated comparison lists', async () => {
    for (const files of [[{ filename: 'docs/archived.ts', previous_filename: 'src/data/old.ts' }], Array.from({ length: 300 }, (_, i) => ({ filename: `docs/audits/${i}.json` }))]) {
      const f = fixture({ baseline: true, files }); expect((await f.invoke()).runIds).toHaveLength(3);
    }
  });
  it('reuses existing runs on retries and surfaces their failures', async () => {
    const f = fixture({ baseline: true, existing: true }); expect((await f.invoke()).runIds).toEqual([500, 501, 502]); expect(f.writes).toEqual([]);
    const bad = fixture({ baseline: true, existing: true, failedExisting: true }); await expect(bad.invoke()).rejects.toThrow('existing deployment'); expect(bad.writes).toEqual([]);
  });
  it('records unknown POST outcome and does not retry it', async () => {
    const f = fixture({ unknownDispatch: true }); await expect(f.invoke()).rejects.toThrow('timeout');
    expect(f.writes).toHaveLength(1); expect(f.reports.at(-1).components[0].state).toBe('dispatch-outcome-unknown'); expect(f.reports.at(-1).status).toBe('failed');
  });
  it('distinguishes pinned source identity from workflow-definition SHA and excludes asset-only checks', () => {
    expect(deploymentSource({ head_sha: newer, display_title: `${names[0]} · ${merged} · deploy` }, names[0])).toBe(merged);
    expect(deploymentSource({ head_sha: merged, display_title: `${names[0]} · ${merged} · assets-only` }, names[0])).toBeNull();
    expect(matchesDeploymentPaths(['src/private/a.ts'], ['src/**', '!src/private/**'])).toBe(false);
  });
  it('keeps workflow checkout, package and producer identities aligned with the pinned input', () => {
    for (const file of productionWorkflows) {
      const source = fs.readFileSync(`.github/workflows/${file}`, 'utf8'), config = parse(source);
      expect(config.on.workflow_dispatch.inputs.source_revision.type).toBe('string');
      const steps = Object.values(config.jobs).flatMap((job: any) => job.steps);
      expect(steps.find((s: any) => s.uses?.startsWith('actions/checkout@')).with.ref).toBe('${{ env.SOURCE_REVISION }}');
      expect(source).not.toContain('$GITHUB_SHA');
      expect(source).not.toContain('DEPLOYMENT_EXPECTED_REVISION: ${{ github.sha }}');
    }
    const publisher = parse(fs.readFileSync('.github/workflows/publish-merged-changes.yml', 'utf8'));
    expect(publisher.on.workflow_run.workflows).toEqual(['Operations gates']);
    expect(publisher.jobs.handoff.permissions.contents).toBe('read');
    expect(publisher.jobs.verify).toBeDefined();
  });
  it('uses the current API version, accepts compare paths and never retries POST errors', async () => {
    const calls: any[] = [];
    const api = githubClient(repository, 'synthetic-token', async (url: any, init: any) => { calls.push({ url, init }); return new Response(JSON.stringify({ ok: true })); });
    await api(''); await api(`/compare/${old}...${merged}`); await api('/actions/workflows/a.yml/dispatches', { ref: 'main' });
    expect(calls).toHaveLength(3); expect(calls[2].init.headers['X-GitHub-Api-Version']).toBe('2026-03-10'); expect(calls[2].init.redirect).toBe('error');
    await api('/graphql', { query: 'query { viewer { login } }' });
    expect(calls[3].url).toBe('https://api.github.com/graphql');
  });
});

describe('deployment completion observer', () => {
  it('rejects a different run or pinned source even when that run succeeded', async () => {
    await expect(waitForDeployments({ runIds: [1], api: async () => ({ id: 2, status: 'completed', conclusion: 'success' }) })).rejects.toThrow('different deployment run');
    await expect(waitForDeployments({ runIds: [1], expectedSources: { 1: { name: names[0], sourceRevision: merged } }, api: async () => ({ id: 1, display_title: `${names[0]} · ${old} · deploy`, status: 'completed', conclusion: 'success' }) })).rejects.toThrow('different pinned source');
  });
  it('continues observing the original handle after a transient read failure', async () => {
    let reads = 0, time = 0; const paths: string[] = [];
    const result = await waitForDeployments({ runIds: [9], now: () => time, sleep: async (ms: number) => { time += ms; }, api: async (path: string) => {
      paths.push(path); if (++reads === 1) throw new Error('Transient observation timeout');
      return { id: 9, status: 'completed', conclusion: 'success' };
    } });
    expect(result.status).toBe('deployment-workflows-succeeded'); expect(paths).toEqual(['/actions/runs/9', '/actions/runs/9']);
  });
  it('follows the same run IDs until all are actually successful', async () => {
    let time = 0, round = 0; const paths: string[] = [];
    const result = await waitForDeployments({ runIds: [1, 2], now: () => time, sleep: async (ms: number) => { time += ms; round++; }, api: async (path: string) => {
      paths.push(path); return { id: Number(path.split('/').at(-1)), status: round ? 'completed' : 'in_progress', conclusion: round ? 'success' : null };
    } });
    expect(result.status).toBe('deployment-workflows-succeeded'); expect(new Set(paths)).toEqual(new Set(['/actions/runs/1', '/actions/runs/2']));
  });
  it('reports terminal failure and times out without retrying a deployment', async () => {
    await expect(waitForDeployments({ runIds: [1], api: async () => ({ id: 1, status: 'completed', conclusion: 'failure' }) })).rejects.toThrow('failure');
    let time = 0;
    await expect(waitForDeployments({ runIds: [1], now: () => time, timeoutMs: 1, sleep: async (ms: number) => { time += ms; }, api: async () => ({ id: 1, status: 'in_progress' }) })).rejects.toThrow('same run IDs');
  });
});
