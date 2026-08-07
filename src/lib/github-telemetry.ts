export type GitHubTelemetry = {
  repository: string;
  fetchedAt: string;
  available: boolean;
  pullRequests: Array<{ number: number; title: string; state: string; draft: boolean; updatedAt: string; url: string }>;
  workflowRuns: Array<{ name: string; status: string; conclusion: string | null; branch: string; updatedAt: string; url: string }>;
  failureCount: number;
  error?: string;
};

const repository = process.env.GITHUB_REPOSITORY || 'EckceptionalSolutions/PaddleTodayV2';

async function githubJson(path: string, signal: AbortSignal) {
  const response = await fetch(`https://api.github.com/repos/${repository}${path}`, {
    headers: { accept: 'application/vnd.github+json', 'user-agent': 'PaddleToday-operations-center' }, signal,
  });
  if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
  return response.json() as Promise<any>;
}

export async function getGitHubTelemetry(): Promise<GitHubTelemetry> {
  const fetchedAt = new Date().toISOString();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const [pullRequests, workflowData] = await Promise.all([
      githubJson('/pulls?state=open&per_page=10', controller.signal),
      githubJson('/actions/runs?per_page=20', controller.signal),
    ]);
    const workflowRuns = (workflowData.workflow_runs ?? []).map((run: any) => ({ name: run.name ?? 'workflow', status: run.status ?? 'unknown', conclusion: run.conclusion ?? null, branch: run.head_branch ?? 'unknown', updatedAt: run.updated_at ?? run.created_at ?? fetchedAt, url: run.html_url ?? '' }));
    return { repository, fetchedAt, available: true, pullRequests: (pullRequests ?? []).map((pr: any) => ({ number: pr.number, title: pr.title, state: pr.state, draft: Boolean(pr.draft), updatedAt: pr.updated_at, url: pr.html_url })), workflowRuns, failureCount: workflowRuns.filter((run: any) => run.conclusion === 'failure').length };
  } catch (error) {
    return { repository, fetchedAt, available: false, pullRequests: [], workflowRuns: [], failureCount: 0, error: error instanceof Error ? error.message : 'GitHub telemetry unavailable' };
  } finally { clearTimeout(timeout); }
}
