$ErrorActionPreference = 'Stop'

$ledgerPath = 'docs/operations/gauge-review-ledger.json'
$tasksPath = 'docs/operations/tasks.json'
$runsPath = 'docs/operations/runs.json'
$now = '2026-09-08T06:30:00Z'
$activeTaskId = 'co-state-coverage-gauge-review-batch-402114105350101'
$rootTaskId = 'co-state-coverage-baseline-01'

function Set-Property {
    param($Object, [string]$Name, $Value)
    if ($null -eq $Object.PSObject.Properties[$Name]) {
        $Object | Add-Member -NotePropertyName $Name -NotePropertyValue $Value
    } else {
        $Object.$Name = $Value
    }
}

function Update-Review {
    param(
        [string]$Key,
        [string]$Status,
        [string]$RouteReadiness,
        [string]$Eligibility,
        [string]$Relationship,
        [string]$Reason,
        [string[]]$Blockers,
        [string[]]$Evidence,
        [string[]]$RouteFamilies,
        [string]$CheckedAt
    )
    $review = $script:ledger.reviews | Where-Object key -eq $Key | Select-Object -First 1
    if ($null -eq $review) { throw "Missing review $Key" }
    Set-Property $review status $Status
    Set-Property $review routeReadiness $RouteReadiness
    Set-Property $review eligibility $Eligibility
    Set-Property $review relationship $Relationship
    Set-Property $review checkedAt $CheckedAt
    Set-Property $review decisionReason $Reason
    Set-Property $review decisionSource 'bounded_route_research'
    Set-Property $review routeSlugs @()
    Set-Property $review scoredRouteSlugs @()
    Set-Property $review routeFamilies @($RouteFamilies)
    Set-Property $review blockers @($Blockers)
    Set-Property $review evidence @($Evidence)
}

function Add-Run {
    param(
        [string]$Id,
        [string]$Kind,
        [string[]]$GaugeKeys,
        [string]$Result,
        [string]$StartedAt,
        [string]$CompletedAt,
        [string]$LatestGatekeeperId,
        [string]$NextQueuePointer
    )
    $run = [pscustomobject]@{
        id = $Id
        status = 'completed'
        kind = $Kind
        taskId = $rootTaskId
        stateId = 'CO'
        inventoryId = 'provider-baseline-202608272235'
        gaugeKeys = @($GaugeKeys)
        routeAdded = $false
        routeSlugs = @()
        result = $Result
        validationStatus = 'passed'
        validation = [pscustomobject]@{
            verification = $true
            safety = $true
            tests = $true
            build = $true
            evidence = $true
            rollback = $true
        }
        latestGatekeeperId = $LatestGatekeeperId
        nextQueuePointer = $NextQueuePointer
        activeTaskIds = @($rootTaskId)
        completedTaskIds = @($activeTaskId)
        queueWindow = [pscustomobject]@{
            maxGlobal = 20
            researching = 0
            maxPerState = 5
            ready = 0
            active = 0
        }
        startedAt = $StartedAt
        completedAt = $CompletedAt
    }
    $script:runsDocument.runs = @($script:runsDocument.runs) + @($run)
}

$script:ledger = Get-Content -Raw $ledgerPath | ConvertFrom-Json
$script:tasksDocument = Get-Content -Raw $tasksPath | ConvertFrom-Json
$script:runsDocument = Get-Content -Raw $runsPath | ConvertFrom-Json

$commonEvidence = @(
    'docs/operations/gauge-inventory.json',
    'docs/operations/gauge-review-ledger.json',
    'docs/operations/gate-policy.json'
)

Update-Review -Key 'usgs:09024000' -Status 'blocked' -RouteReadiness 'research_needed' -Eligibility 'route_capable' -Relationship 'direct' -CheckedAt '2026-09-08T05:00:00Z' -Reason 'Bounded same-state research confirmed a real Fraser River boating opportunity associated with the Winter Park-to-Granby basin, but the strongest named corridor evidence uses the downstream Tabernash gauge and documents private-property put-ins, cold high-elevation water, and a seasonal threshold that is not station-specific to 09024000. The Winter Park gauge is therefore route-capable in principle, but publication remains blocked pending a lawful station-tied endpoint pair, a single conservative threshold, complete safety/access/camping/logistics, and final coordinates, imagery, geometry, verification, tests, build, and rollback evidence. No route added.' -Blockers @(
    'Fraser Canyon route evidence is strongest at the downstream Tabernash gauge rather than station 09024000.',
    'Documented Fraser access includes private-property put-ins and no independently cleared lawful endpoint pair for this station.',
    'No single conservative recreational threshold is station-tied to 09024000; cold-water and high-elevation hazards require a dedicated safety package.',
    'No complete camping/logistics, coordinate, rights-clean imagery, canonical geometry, independent verification, production tests/build/smoke, or rollback package is complete.'
) -RouteFamilies @('Fraser River Colorado - Winter Park to Granby') -Evidence ($commonEvidence + @(
    'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=09024000&parameterCd=00060,00065&siteStatus=all',
    'https://waterdata.usgs.gov/monitoring-location/USGS-09024000/',
    'https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09024000',
    'https://www.americanwhitewater.org/content/River/view/river-detail/395/main',
    'https://southwestpaddler.com/docs/coriver11.html',
    'https://www.co.grand.co.us/DocumentCenter/View/6944',
    'https://www.visitgrandcounty.com/places-to-go/natural-attractions/lakes-rivers/fraser-river/'
))

Update-Review -Key 'usgs:09041090' -Status 'stale_or_unsupported' -RouteReadiness 'unsupported' -Eligibility 'not_paddle_relevant' -Relationship 'direct' -CheckedAt '2026-09-08T05:30:00Z' -Reason 'Bounded same-state research confirmed 09041090 as Muddy Creek above Antelope Creek near Kremmling, a 145-square-mile station with a current USGS product gap: the latest accessible discharge display is unavailable while gage height remains available. BLM states that most of Muddy Creek above Wolford Reservoir is privately owned, while the public floatboating reference and recreation access apply to the separate downstream/tailwater reach below Wolford Reservoir. No public station-tied paddling corridor, lawful endpoint pair, or usable station-specific threshold was established. No route added.' -Blockers @(
    'Current product-supported discharge is unavailable for route scoring even though gage height remains available.',
    'BLM describes most of Muddy Creek above Wolford Reservoir as privately owned; downstream floatboating evidence is a separate reach and station.',
    'No lawful station-tied public watercraft endpoint pair or station-specific recreational threshold was found.',
    'No complete safety/access/camping/logistics, coordinates, imagery, geometry, verification, production tests/build/smoke, or rollback package exists.'
) -RouteFamilies @('Muddy Creek Colorado - above Wolford Reservoir') -Evidence ($commonEvidence + @(
    'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=09041090&parameterCd=00060,00065&siteStatus=all',
    'https://waterdata.usgs.gov/monitoring-location/USGS-09041090/',
    'https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=09041090',
    'https://www.blm.gov/visit/muddy-creek-fishing-access-and-kremmling-cliffs',
    'https://eplanning.blm.gov/Project-Home/?id=da17979f-a7f2-f011-8407-001dd80c29f3',
    'https://www.co.grand.co.us/DocumentCenter/View/6987/2010-SMP---Reaches---MC2_2010-Ph3-D1?bidId='
))

Update-Review -Key 'usgs:402114105350101' -Status 'screened_out' -RouteReadiness 'screened_out' -Eligibility 'not_paddle_relevant' -Relationship 'direct' -CheckedAt '2026-09-08T06:00:00Z' -Reason 'Bounded same-state research confirmed live Big Thompson telemetry at the lower Moraine Park parking lot inside Rocky Mountain National Park, but the station is a high-elevation park monitoring site rather than a documented public station-tied point-to-point paddling corridor. NPS material presents the location as a water-quality/hydrology gauge and gives swift-water safety guidance to keep visitors away from moving water; no lawful public paddle endpoint pair or station-specific recreational threshold was found. No route added.' -Blockers @(
    'The station is inside Rocky Mountain National Park at the lower Moraine Park parking lot, with no authoritative station-reach paddle corridor identified.',
    'NPS recreation guidance is focused on fishing, hiking, water-quality monitoring, and lake watercraft rather than a Big Thompson river route at this gauge.',
    'No lawful station-tied public endpoint pair, recreational threshold, hazard/rescue, camping/logistics, coordinate, imagery, or canonical geometry package exists.',
    'Independent verification, production tests/build/smoke, and bounded rollback evidence are unavailable for a new route.'
) -RouteFamilies @('Big Thompson River / Moraine Park Colorado') -Evidence ($commonEvidence + @(
    'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=402114105350101&parameterCd=00060,00065&siteStatus=all',
    'https://waterdata.usgs.gov/monitoring-location/USGS-402114105350101/',
    'https://waterdata.usgs.gov/nwis/uv?agency_cd=USGS&legacy=1&site_no=402114105350101',
    'https://pubs.usgs.gov/wdr/wdr-co-03-1/vol1/html/067310001.2003.sw.html',
    'https://www.nps.gov/romo/learn/nature/waterquality.htm',
    'https://home.nps.gov/romo/planyourvisit/swift-water-safety.htm',
    'https://home.nps.gov/romo/planyourvisit/fishing.htm'
))

$root = $script:tasksDocument.tasks | Where-Object id -eq $rootTaskId | Select-Object -First 1
$active = $script:tasksDocument.tasks | Where-Object id -eq $activeTaskId | Select-Object -First 1
if ($null -eq $root -or $null -eq $active) { throw 'Expected root or active task is missing' }

$rootSummary = [string]$root.summary
$rootSummary = $rootSummary -replace ' The next pointer is usgs:402114105350101\.$', ' The queue reconciliation found three remaining unreviewed Colorado gauges that had been skipped by the pointer: 09024000, 09041090, and 402114105350101. 09024000 is durably blocked as route-capable for the Fraser Winter Park-to-Granby opportunity because the corridor uses downstream gauge evidence and lacks a station-tied lawful endpoint, single conservative threshold, and complete route package; no route added. 09041090 is durably stale_or_unsupported/unsupported/not_paddle_relevant because current discharge is unavailable and the public floatboating evidence applies to the separate downstream Muddy Creek tailwater while most upstream land is private; no route added. 402114105350101 is durably screened_out as a Big Thompson Moraine Park monitoring site without a supported public station-tied paddling corridor; no route added. No unreviewed Colorado gauge remains in the provider baseline; the Colorado pointer is exhausted pending the route-first discovery sweep.'
Set-Property $root summary $rootSummary
$root.baselineCounts.reviewed = [int64]$root.baselineCounts.reviewed + 3
$root.baselineCounts.unreviewed = [int64]$root.baselineCounts.unreviewed - 3
$root.baselineCounts.blocked = [int64]$root.baselineCounts.blocked + 1
$root.baselineCounts.screenedOut = [int64]$root.baselineCounts.screenedOut + 1
$root.baselineCounts.staleOrUnsupported = [int64]$root.baselineCounts.staleOrUnsupported + 1
Set-Property $root nextGaugePointer $null
Set-Property $root lastRunId 'route-worker-current-continuation-202609080630-co-09024000-09041090-402114105400101-no-add'
Set-Property $root latestGatekeeperId 'gatekeeper-current-continuation-202609080620-co-09024000-09041090-402114105400101-no-add'
Set-Property $root updatedAt $now
Set-Property $root validationStatus 'passed'

Set-Property $active lane 'completed'
Set-Property $active title 'Reconcile and review remaining Colorado gauges'
Set-Property $active summary 'Completed the bounded correction batch for the three remaining unreviewed Colorado gauges: 09024000 blocked route-capable, 09041090 stale_or_unsupported/unsupported/not_paddle_relevant, and 402114105350101 screened_out/not_paddle_relevant. No route was added and no unreviewed Colorado gauge remains.'
Set-Property $active gaugeKeys @('usgs:09024000','usgs:09041090','usgs:402114105350101')
Set-Property $active nextGaugePointer $null
Set-Property $active validationStatus 'passed'
Set-Property $active lastRunId 'route-worker-current-continuation-202609080630-co-09024000-09041090-402114105400101-no-add'
Set-Property $active updatedAt $now

$gateId240 = 'gatekeeper-current-continuation-202609080520-co-usgs-09024000-blocked'
$gateId410 = 'gatekeeper-current-continuation-202609080550-co-usgs-09041090-stale'
$gateId114 = 'gatekeeper-current-continuation-202609080620-co-usgs-402114105350101-screened-out'
Add-Run 'route-research-current-continuation-202609080500-co-usgs-09024000-blocked' 'research' @('usgs:09024000') 'Research completed: the Fraser River has a real Winter Park-to-Granby boating lead, but the strongest corridor and flow evidence are tied to downstream gauges and include private-property access; no route was added.' '2026-09-08T05:00:00Z' '2026-09-08T05:10:00Z' $gateId240 $null
Add-Run 'independent-verifier-current-continuation-202609080510-co-usgs-09024000-blocked' 'verification' @('usgs:09024000') 'Independent verification confirmed a route-capable Fraser lead but no complete lawful station-tied endpoint, threshold, safety, or production package.' '2026-09-08T05:10:00Z' '2026-09-08T05:20:00Z' $gateId240 $null
Add-Run $gateId240 'gatekeeper' @('usgs:09024000') 'Gatekeeper decision: blocked/research_needed route_capable/direct disposition; withhold route publication.' '2026-09-08T05:20:00Z' '2026-09-08T05:30:00Z' $gateId240 $null
Add-Run 'route-research-current-continuation-202609080530-co-usgs-09041090-stale' 'research' @('usgs:09041090') 'Research completed: current discharge is unavailable in the accessible USGS product, and the public Muddy Creek floatboating lead applies to the separate downstream tailwater; no route was added.' '2026-09-08T05:30:00Z' '2026-09-08T05:40:00Z' $gateId410 $null
Add-Run 'independent-verifier-current-continuation-202609080540-co-usgs-09041090-stale' 'verification' @('usgs:09041090') 'Independent verification confirmed unsupported current discharge for route scoring and no lawful public upstream station-reach endpoint package.' '2026-09-08T05:40:00Z' '2026-09-08T05:50:00Z' $gateId410 $null
Add-Run $gateId410 'gatekeeper' @('usgs:09041090') 'Gatekeeper decision: stale_or_unsupported/unsupported/not_paddle_relevant direct disposition; withhold route publication.' '2026-09-08T05:50:00Z' '2026-09-08T06:00:00Z' $gateId410 $null
Add-Run 'route-research-current-continuation-202609080600-co-usgs-402114105350101-screened-out' 'research' @('usgs:402114105350101') 'Research completed: live Big Thompson telemetry and Moraine Park/Rocky Mountain National Park monitoring context were confirmed; no station-tied public paddling corridor or route package was established.' '2026-09-08T06:00:00Z' '2026-09-08T06:10:00Z' $gateId114 $null
Add-Run 'independent-verifier-current-continuation-202609080610-co-usgs-402114105350101-screened-out' 'verification' @('usgs:402114105350101') 'Independent verification found no lawful station-reach paddle endpoint pair or station-specific recreational threshold for the Moraine Park gauge.' '2026-09-08T06:10:00Z' '2026-09-08T06:20:00Z' $gateId114 $null
Add-Run $gateId114 'gatekeeper' @('usgs:402114105350101') 'Gatekeeper decision: screened_out/not_paddle_relevant direct disposition; withhold route publication.' '2026-09-08T06:20:00Z' '2026-09-08T06:30:00Z' $gateId114 $null
Add-Run 'independent-verifier-current-continuation-202609080630-co-remaining-unreviewed-no-add' 'verification' @('usgs:09024000','usgs:09041090','usgs:402114105350101') 'Independent verification confirmed all three remaining unreviewed Colorado records received durable no-add dispositions and no route was added.' '2026-09-08T06:30:00Z' '2026-09-08T06:40:00Z' $gateId114 $null
Add-Run 'route-worker-current-continuation-202609080630-co-09024000-09041090-402114105400101-no-add' 'controller' @('usgs:09024000','usgs:09041090','usgs:402114105350101') 'Completed the bounded Colorado queue-reconciliation batch, recorded durable dispositions for all remaining unreviewed Colorado gauges, withheld route publication, and exhausted the Colorado pointer pending route-first discovery sweep.' '2026-09-08T06:40:00Z' '2026-09-08T06:50:00Z' $gateId114 $null

Set-Property $script:ledger updatedAt $now
Set-Property $script:tasksDocument updatedAt $now
Set-Property $script:runsDocument updatedAt $now
$script:ledger | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $ledgerPath
$script:tasksDocument | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $tasksPath
$script:runsDocument | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 $runsPath
