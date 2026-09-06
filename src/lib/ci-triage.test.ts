import { describe, expect, it } from 'vitest';
import { classifyCiFailure, latestCiFailures, type CiRun } from './ci-triage';
import { checkDeploymentConfig } from '../../scripts/lib/deployment-config.mjs';

const run = (id: number, branch: string, conclusion: string, status = 'completed'): CiRun => ({ databaseId: id, workflowName: 'Deploy', headBranch: branch, conclusion, status, createdAt: `2026-09-06T${String(id).padStart(2, '0')}:00:00Z`, url: `https://example.com/${id}` });
describe('CI triage', () => {
  it('does not hide a branch failure behind another branch success', () => {
    expect(latestCiFailures([run(1, 'main', 'failure'), run(2, 'feature', 'success')]).map(r => r.databaseId)).toEqual([1]);
  });
  it('suppresses superseded failures and treats a pending replacement as unverified', () => {
    expect(latestCiFailures([run(1, 'main', 'failure'), run(2, 'main', 'success')])).toEqual([]);
    expect(latestCiFailures([run(1, 'main', 'failure'), run(2, 'main', '', 'in_progress')])).toEqual([]);
  });
  it('extracts denied operations without retaining secrets or client identities', () => {
    const result = classifyCiFailure("AuthorizationFailed client 'private-id' cannot Microsoft.Insights/actionGroups/write and Microsoft.Insights/scheduledQueryRules/write https://blob.test/?sig=private-token");
    expect(result.category).toBe('azure_permissions');
    expect(result.actions).toEqual(['Microsoft.Insights/actionGroups/write', 'Microsoft.Insights/scheduledQueryRules/write']);
    expect(JSON.stringify(result)).not.toContain('private-');
  });
  it('does not invent a diagnosis for unknown errors or normal resource mentions', () => {
    expect(classifyCiFailure('Microsoft.Insights/actionGroups/write succeeded; unexplained crash').category).toBe('unclassified');
  });
  it('recognizes the ARM InvalidTemplateDeployment permission wording', () => {
    expect(classifyCiFailure("InvalidTemplateDeployment: Authorization failed for template resource. The client does not have permission to perform action 'Microsoft.Insights/actionGroups/write'").category).toBe('azure_permissions');
  });
});
describe('deployment configuration', () => {
  const credentials = JSON.stringify({ clientId: 'id', clientSecret: 'secret', tenantId: 'tenant', subscriptionId: 'subscription' });
  it('fails missing credentials before deployment work', () => {
    expect(checkDeploymentConfig('api', {})).toHaveLength(2);
    expect(checkDeploymentConfig('frontend', { AZURE_STATIC_WEB_APPS_API_TOKEN: '   ' })).toHaveLength(1);
  });
  it('rejects expired SAS and malformed credentials without echoing values', () => {
    const errors = checkDeploymentConfig('snapshot', { AZURE_CREDENTIALS: 'private-secret', SNAPSHOT_SAS_URL: 'https://blob.test/container?sig=private-token&se=2020-01-01' });
    expect(errors).toHaveLength(2);
    expect(JSON.stringify(errors)).not.toContain('private-');
  });
  it('accepts a valid configuration including SAS governed by a stored policy', () => {
    expect(checkDeploymentConfig('snapshot', { AZURE_CREDENTIALS: credentials, SNAPSHOT_SAS_URL: 'https://blob.test/container?sig=token&si=policy' })).toEqual([]);
  });
});
