#!/usr/bin/env bash
# Read-only ARM validation; run after platform provisioning and before the image build.
set -euo pipefail
parameters=$(mktemp)
trap 'rm -f "$parameters"' EXIT
chmod 600 "$parameters"
node --input-type=module - "$parameters" <<'NODE'
import { writeFileSync } from 'node:fs';
const env = process.env;
const values = {
  containerRegistryName: env.AZURE_CONTAINER_REGISTRY,
  containerAppsEnvironmentName: env.AZURE_CONTAINER_APPS_ENVIRONMENT,
  jobName: env.AZURE_CONTAINER_APPS_JOB,
  snapshotAlertEmail: env.SNAPSHOT_ALERT_EMAIL,
  snapshotContainerSasUrl: env.SNAPSHOT_SAS_URL,
  image: `${env.AZURE_CONTAINER_REGISTRY}.azurecr.io/${env.IMAGE_NAME}:${env.GITHUB_SHA}`,
};
for (const [key, value] of Object.entries(values)) if (!value) throw new Error(`Missing parameter ${key}`);
writeFileSync(process.argv[2], JSON.stringify({ parameters: Object.fromEntries(Object.entries(values).map(([key, value]) => [key, { value }])) }));
NODE
az deployment group validate \
  --resource-group "$AZURE_RESOURCE_GROUP" \
  --template-file infra/azure/container-apps-job.bicep \
  --validation-level Provider \
  --parameters "@$parameters" \
  --output none
