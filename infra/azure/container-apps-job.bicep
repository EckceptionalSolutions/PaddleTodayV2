targetScope = 'resourceGroup'

@description('Azure region for the worker resources.')
param location string = resourceGroup().location

@description('Globally unique Azure Container Registry name.')
param containerRegistryName string = 'paddletodayjobs'

@description('Container Apps environment that hosts the scheduled worker job.')
param containerAppsEnvironmentName string = 'paddletoday-jobs'

@description('Scheduled river snapshot job name.')
param jobName string = 'paddletoday-river-snapshots'

@description('Commit-pinned worker image in the existing registry.')
param image string

@secure()
@description('Read/write SAS URL for the existing river snapshot Blob container.')
param snapshotContainerSasUrl string

@description('Blob prefix used by the snapshot worker and API.')
param snapshotBlobPrefix string = 'river-snapshots'

@description('UTC cron schedule. Azure Container Apps Jobs use five-field cron expressions.')
param cronExpression string = '7,37 * * * *'

@description('CPU cores allocated to the worker replica.')
param cpu int = 1

@description('Memory allocated to the worker replica.')
param memory string = '2Gi'

@description('Stable name for the job identity ACR pull role assignment.')
param acrPullRoleAssignmentName string = 'cdea3635-c341-4003-a192-8744f24cdf67'

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-07-01' existing = {
  name: containerRegistryName
}

resource containerAppsEnvironment 'Microsoft.App/managedEnvironments@2025-01-01' existing = {
  name: containerAppsEnvironmentName
}

resource job 'Microsoft.App/jobs@2025-01-01' = {
  name: jobName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    environmentId: containerAppsEnvironment.id
    configuration: {
      triggerType: 'Schedule'
      replicaTimeout: 1800
      replicaRetryLimit: 3
      scheduleTriggerConfig: {
        cronExpression: cronExpression
        parallelism: 1
        replicaCompletionCount: 1
      }
      secrets: [
        {
          name: 'snapshot-container-sas-url'
          value: snapshotContainerSasUrl
        }
      ]
      registries: [
        {
          server: containerRegistry.properties.loginServer
          identity: 'system'
        }
      ]
    }
    template: {
      containers: [
        {
          name: 'snapshot-worker'
          image: image
          resources: {
            cpu: cpu
            memory: memory
          }
          env: [
            {
              name: 'RIVER_SNAPSHOT_CONTAINER_SAS_URL'
              secretRef: 'snapshot-container-sas-url'
            }
            {
              name: 'RIVER_SNAPSHOT_BLOB_PREFIX'
              value: snapshotBlobPrefix
            }
            {
              name: 'RIVER_SCORE_CONCURRENCY'
              value: '24'
            }
            {
              name: 'RIVER_SNAPSHOT_WRITE_CONCURRENCY'
              value: '24'
            }
            {
              name: 'UPSTREAM_MONITOR_IGNORED_PROVIDERS'
              value: 'mapservices.weather.noaa.gov'
            }
          ]
        }
      ]
    }
  }
}

resource acrPullRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: acrPullRoleAssignmentName
  scope: containerRegistry
  properties: {
    principalId: job.identity.principalId
    principalType: 'ServicePrincipal'
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions',
      '7f951dda-4ed3-4680-a7ca-43fe172d538d'
    )
  }
}

output jobId string = job.id
