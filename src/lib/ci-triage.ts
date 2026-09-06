export type CiRun = {
  databaseId: number; workflowName: string; headBranch: string; createdAt: string;
  status: string; conclusion: string; url: string;
};
const failureStates = ['failure', 'timed_out', 'action_required', 'startup_failure'];

export function latestCiFailures(runs: CiRun[]) {
  const latest = new Map<string, CiRun>();
  for (const run of [...runs].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))) {
    const key = JSON.stringify([run.workflowName, run.headBranch]);
    if (!latest.has(key)) latest.set(key, run);
  }
  return [...latest.values()].filter(run => run.status === 'completed' && failureStates.includes(run.conclusion));
}

// Persist only recognized operation names and fixed descriptions, never raw CI logs or credentials.
export function classifyCiFailure(log: string) {
  const permissionError = /Authorization\s*failed|AuthorizationPermissionMismatch|does not have (?:authorization|permission)|not authorized to perform/i.test(log);
  const actions = permissionError ? [...new Set(log.match(/Microsoft\.[A-Za-z]+\/[A-Za-z]+(?:\/[A-Za-z]+)*\/(?:write|read|action|delete)/g) ?? [])].sort() : [];
  if (permissionError) return { category: 'azure_permissions', actions, nextStep: 'Review the failing resource scopes and grant the deployment identity only the required permissions through your Azure administrator. Re-run Provider validation before another image build.' };
  if (/AADSTS\d+|Login failed|Invalid client secret|authentication failed/i.test(log)) return { category: 'authentication', actions, nextStep: 'Check the deployment credential and its expiry in the workflow secret settings; validate authentication before retrying.' };
  if (/npm (?:ERR!|error).*?(?:EUSAGE|EINTEGRITY)|package.json and package-lock.json.*in sync/is.test(log)) return { category: 'dependency_install', actions, nextStep: 'Reproduce npm ci with the locked Node version. Inspect the lockfile or integrity error before rebuilding.' };
  if (/TS\d{4}:|Tests\s+\d+ failed|FAIL\s+src\//.test(log)) return { category: 'test_or_typecheck', actions, nextStep: 'Open the failing test or compiler step and reproduce that check locally, then run npm run verify.' };
  return { category: 'unclassified', actions, nextStep: 'Inspect the failed step in the linked GitHub run before deciding whether a retry can help.' };
}
