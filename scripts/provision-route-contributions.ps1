param(
  [Parameter(Mandatory = $true)] [string] $StorageAccount,
  [Parameter(Mandatory = $false)] [string] $Container = 'paddletoday-data',
  [Parameter(Mandatory = $false)] [int] $ExpiryDays = 365
)

$expiry = (Get-Date).ToUniversalTime().AddDays($ExpiryDays).ToString('yyyy-MM-ddTHH:mmZ')

Write-Host "Creating container $Container in $StorageAccount..."
az storage container create --auth-mode login --account-name $StorageAccount --name $Container --public-access off | Out-Null

Write-Host "Generating container SAS..."
$sas = az storage container generate-sas --auth-mode login --as-user --account-name $StorageAccount --name $Container --permissions racwdl --expiry $expiry -o tsv

if (-not $sas) {
  throw 'Could not generate SAS.'
}

$baseUrl = "https://$StorageAccount.blob.core.windows.net/$Container"
$fullUrl = "$baseUrl`?$sas"

Write-Host ''
Write-Host 'Set these App Service settings:'
Write-Host "ROUTE_CONTRIBUTIONS_CONTAINER_SAS_URL=$fullUrl"
Write-Host 'ROUTE_CONTRIBUTIONS_BLOB_PREFIX=route-contributions'
Write-Host 'PADDLETODAY_ADMIN_PASSWORD=<set-a-password>'
Write-Host 'PADDLETODAY_ADMIN_SESSION_SECRET=<set-a-random-secret>'
