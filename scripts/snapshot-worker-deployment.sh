#!/usr/bin/env bash
# Use identical secure deployment parameters for provider validation and deployment.
set -euo pipefail
operation="${1:-}"
case "$operation" in
  validate) options=(--validation-level Provider) ;;
  create) options=(--mode Incremental) ;;
  *) echo 'Expected validate or create.' >&2; exit 1 ;;
esac
parameters=$(mktemp)
trap 'rm -f "$parameters"' EXIT
chmod 600 "$parameters"
node --input-type=module - "$parameters" <<'NODE'
import { writeFileSync } from 'node:fs';
const env = process.env;
const values = {
  registryUsername: env.GHCR_PULL_USERNAME,
  registryPullToken: env.GHCR_PULL_TOKEN,
  containerAppsEnvironmentName: env.AZURE_CONTAINER_APPS_ENVIRONMENT,
  jobName: env.AZURE_CONTAINER_APPS_JOB,
  snapshotAlertEmail: env.SNAPSHOT_ALERT_EMAIL,
  snapshotContainerSasUrl: env.SNAPSHOT_SAS_URL,
  provisionMonitoring: env.PROVISION_SNAPSHOT_MONITORING === 'true',
  snapshotDetailLayout: env.SNAPSHOT_DETAIL_LAYOUT || 'legacy',
  image: env.SNAPSHOT_IMAGE,
};
for (const [key, value] of Object.entries(values)) if (value === undefined || value === '') throw new Error(`Missing parameter ${key}`);
if (!/^ghcr\.io\/eckceptionalsolutions\/paddletoday-worker@sha256:[a-f0-9]{64}$/.test(values.image)) {
  throw new Error('Expected a digest-pinned Paddle Today GHCR image');
}
writeFileSync(process.argv[2], JSON.stringify({ parameters: Object.fromEntries(Object.entries(values).map(([key, value]) => [key, { value }])) }));
NODE
az deployment group "$operation" \
  --resource-group "$AZURE_RESOURCE_GROUP" \
  --template-file infra/azure/container-apps-job.bicep \
  "${options[@]}" \
  --parameters "@$parameters" \
  --output none
