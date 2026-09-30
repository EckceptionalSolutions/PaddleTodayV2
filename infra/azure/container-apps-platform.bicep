targetScope = 'resourceGroup'

@description('Azure region for the worker resources.')
param location string = resourceGroup().location

@description('Globally unique Azure Container Registry name.')
param containerRegistryName string = 'paddletodayjobs'

@description('Container Apps environment that hosts the scheduled worker job.')
param containerAppsEnvironmentName string = 'paddletoday-jobs'

@description('Existing Storage Account that holds PaddleToday snapshots and history.')
param storageAccountName string = 'paddletoday'

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-07-01' = {
  name: containerRegistryName
  location: location
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: false
  }
}

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: '${containerAppsEnvironmentName}-logs'
  location: location
  properties: {
    retentionInDays: 30
    features: {
      enableLogAccessUsingOnlyResourcePermissions: true
    }
    sku: {
      name: 'PerGB2018'
    }
  }
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' existing = {
  name: storageAccountName
}

resource storageLifecyclePolicy 'Microsoft.Storage/storageAccounts/managementPolicies@2023-05-01' = {
  name: 'default'
  parent: storageAccount
  properties: {
    policy: {
      rules: [
        {
          name: 'cool-and-expire-hourly-history'
          type: 'Lifecycle'
          enabled: true
          definition: {
            filters: {
              blobTypes: [
                'blockBlob'
              ]
              prefixMatch: [
                'river-history/hourly/'
              ]
            }
            actions: {
              baseBlob: {
                tierToCool: {
                  daysAfterModificationGreaterThan: 2
                }
                delete: {
                  daysAfterModificationGreaterThan: 180
                }
              }
            }
          }
        }
      ]
    }
  }
}

resource containerAppsEnvironment 'Microsoft.App/managedEnvironments@2025-01-01' = {
  name: containerAppsEnvironmentName
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalytics.properties.customerId
        sharedKey: logAnalytics.listKeys().primarySharedKey
      }
    }
  }
}

output registryLoginServer string = containerRegistry.properties.loginServer
output environmentId string = containerAppsEnvironment.id
