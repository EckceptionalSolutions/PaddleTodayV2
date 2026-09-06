# Deployment checks and CI recovery

`npm run operations:ci:triage` reads GitHub Actions through the authenticated `gh`
CLI and writes `.local/operations/ci-triage.md` and `.json`. It inspects the newest
outstanding failure among the latest run for each workflow/branch in the most
recent 100 runs. At most one failed log is downloaded per invocation. A newer
success supersedes an older failure on the same branch; a pending replacement is
unverified. Other failures remain counted as uninspected. This is a bounded sample,
not a complete repository health check.

The daily brief runs triage automatically. Reports retain recognized Azure operation
names and fixed recovery guidance, not raw logs, credential values, or principal
identifiers. An unavailable GitHub API or log is reported as unknown rather than
healthy. Neither command retries a workflow or changes Azure resources.

## Fail early in CI

The API, frontend, and snapshot deployment workflows now check required configuration
before dependency installation or Azure login. Run the same dependency-free check with
`npm run deployment:config:check -- api` (or `frontend`, `snapshot`), supplying the
matching environment variables through your normal secret mechanism.

- API: `AZURE_WEBAPP_NAME`, `AZUREAPPSERVICE_PUBLISHPROFILE`.
- Frontend: `AZURE_STATIC_WEB_APPS_API_TOKEN`.
- Snapshot: `AZURE_CREDENTIALS`, `SNAPSHOT_SAS_URL` (the workflow maps this from
  `RIVER_SNAPSHOT_CONTAINER_SAS_URL`). Credentials must contain the four service
  principal fields expected by the existing Azure login. SAS must use HTTPS, have
  a signature, and not have an invalid or expired explicit expiry. Stored-policy
  SAS without an explicit expiry is allowed.

These checks establish presence and basic structure, not credential validity.
The snapshot workflow additionally runs `scripts/snapshot-worker-validate.sh`
after platform provisioning and before ACR builds the image. Azure CLI 2.76+
is required for explicit `--validation-level Provider`. This validates the actual
job template, including its alerts and role assignment, with the deployment
identity's write permissions. It does not create the job or build the image.
Platform provisioning still precedes this check because the job references that
platform. Validation is not a guarantee against later runtime or deployment errors.

The validation script passes secure parameters through a temporary file, removes
it on success or failure, and suppresses normal Azure result output. Do not enable
shell tracing or Azure debug output for secret-bearing deployment steps.
The existing `deployment:azure:verify` command checks deployed platform posture;
it serves a different purpose from deployment template validation.

Azure documents Provider validation and permission checks in
[deployment group validate](https://learn.microsoft.com/en-us/cli/azure/deployment/group?view=azure-cli-latest#az-deployment-group-validate)
and [server-side preflight](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-preflight).

## Current actionable failure, September 6, 2026

[Snapshot Worker run 34000887461](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/34000887461)
failed at job deployment because its identity lacked
`Microsoft.Insights/actionGroups/write` and
`Microsoft.Insights/scheduledQueryRules/write` for the template's monitoring resources.
Have the Azure resource owner review those exact scopes and the deployment identity's
role assignments. After the permission issue is resolved, validate under that
identity before rebuilding. Local workflow edits do not resolve the Azure permissions.

## Local verification of this change

- Repository type checks and associated audits passed.
- Fourteen focused CI/configuration and daily-brief tests passed, including branch
  isolation, superseded failures, real ARM error wording, and secret-safe reporting.
- All three workflow YAML documents parsed; preflight ordering was verified.
- Mocked Azure CLI integration verified Provider arguments and temporary-file
  cleanup for exit codes 0 and 3, without invoking Azure.
- Live read-only triage correctly identified the two missing monitoring operations;
  the daily brief included the findings.

Azure-side validation and deployments were not executed locally. Workflow changes
take effect after they are merged into a branch that triggers deployment.
