$utf8 = [System.Text.UTF8Encoding]::new($false)
$probe = [System.IO.File]::ReadAllText((Join-Path (Get-Location) 'docs/operations/gauge-review-ledger.json'))
$nl = if ($probe.Contains("`r`n")) { "`r`n" } else { "`n" }

function Write-Raw([string]$path, [string]$raw) {
  [System.IO.File]::WriteAllText((Join-Path (Get-Location) $path), $raw, $utf8)
}
function IndentedJson($value) {
  $json = $value | ConvertTo-Json -Depth 12
  (($json -split "`r?`n") | ForEach-Object { '    ' + $_ }) -join $nl
}

$review = [ordered]@{
  key = 'usgs:09169500'
  status = 'blocked'
  routeReadiness = 'candidate'
  eligibility = 'route_capable'
  relationship = 'direct'
  checkedAt = '2026-09-05T18:00:00Z'
  decisionReason = 'Bounded same-state research confirmed direct 09169500 Dolores River at Bedrock telemetry and the named Bedrock-to-Gateway (Paradox and Mesa Canyon) paddling reach tied to this gauge. American Whitewater documents a 45-mile Class II+ reach with Class III features, limited/permission-based access, and current-security concerns; BLM and Dolores boating sources establish release-dependent flow, camping, permit, and hazard context. The opportunity remains blocked because current endpoint rights/parking/security, conservative release threshold and release decision rule, route-specific hazard scouting, emergency/logistics, rights-clean imagery, and canonical endpoint-ordered geometry remain incomplete; no route was added.'
  decisionSource = 'manual_route_worker_blocked'
  routeSlugs = @()
  scoredRouteSlugs = @()
  routeFamilies = @('Dolores River Colorado')
  blockers = @(
    'Bedrock put-in and Gateway take-out require current endpoint/parking/security validation; the Bedrock access has reported vehicle-vandalism concerns, and limited/private access occurs along the reach.'
    'McPhee releases and San Miguel inflow control the short boating season; published flow studies provide reach-level guidance (about 900 cfs lowest acceptable and 2100-2700 cfs optimal) but a current conservative station-specific operating/release rule is not yet established.'
    'The 45-mile remote corridor includes Class III features, bridge/canyon constraints, changing wood, private Mesa Canyon access, limited recovery, and multi-day camping logistics; current route-specific hazard and emergency/shuttle validation is incomplete.'
    'Rights-clean route imagery and canonical endpoint-ordered geometry are not yet present in the repository.'
  )
  evidence = @(
    'docs/operations/gauge-inventory.json'
    'docs/operations/gate-policy.json'
    'https://waterdata.usgs.gov/monitoring-location/USGS-09169500/'
    'https://waterdata.usgs.gov/nwis/uv/?site_no=09169500'
    'https://www.americanwhitewater.org/content/River/view/river-detail/388/main'
    'https://www.blm.gov/visit/dolores-river-0'
    'https://www.doloresriverboating.org/boating-info/'
    'https://site-media.americanwhitewater.org/Document_918.pdf'
    'https://www.fourcornerswater.org/doloresriver/pdf/Appendix-B_%20Stream-Flow-Evaluation_AW.pdf'
    'https://www.americanwhitewater.org/article/q97qaflh1bvchrbt36wmg/'
    'https://ocs.fortlewis.edu/drd/pdf/Dolores%20River%20Dialogue%20Packet.pdf'
  )
}

$ledgerPath = 'docs/operations/gauge-review-ledger.json'
$ledgerRaw = [System.IO.File]::ReadAllText((Join-Path (Get-Location) $ledgerPath))
$ledgerRaw = [regex]::Replace($ledgerRaw, '(?m)^  "updatedAt": "[^"]+",', '  "updatedAt": "2026-09-05T18:30:00Z",', 1)
$reviewStart = $ledgerRaw.IndexOf(('    {' + $nl + '      "key": "usgs:09169500"'))
if ($reviewStart -lt 0) { throw 'Expected 09169500 ledger placeholder was not found.' }
$reviewEnd = $ledgerRaw.IndexOf(($nl + '    }'), $reviewStart)
if ($reviewEnd -lt 0) { throw 'Expected 09169500 ledger object terminator was not found.' }
$ledgerRaw = $ledgerRaw.Substring(0, $reviewStart) + (IndentedJson $review) + $ledgerRaw.Substring($reviewEnd + $nl.Length + 5)
Write-Raw $ledgerPath $ledgerRaw

$tasksPath = 'docs/operations/tasks.json'
$tasksRaw = [System.IO.File]::ReadAllText((Join-Path (Get-Location) $tasksPath))
$tasksRaw = [regex]::Replace($tasksRaw, '(?m)^  "updatedAt": "[^"]+",', '  "updatedAt": "2026-09-05T18:30:00Z",', 1)
$tasksRaw = $tasksRaw.Replace('        "reviewed": 150,', '        "reviewed": 151,')
$tasksRaw = $tasksRaw.Replace('        "unreviewed": 68,', '        "unreviewed": 67,')
$tasksRaw = $tasksRaw.Replace('        "blocked": 89,', '        "blocked": 90,')
$tasksRaw = $tasksRaw.Replace('      "updatedAt": "2026-09-05T17:30:00Z",', '      "updatedAt": "2026-09-05T18:30:00Z",')
$tasksRaw = $tasksRaw.Replace('      "nextGaugePointer": "usgs:09169500",', '      "nextGaugePointer": "usgs:09171100",')
$tasksRaw = $tasksRaw.Replace('      "lastRunId": "route-worker-current-continuation-202609051730-co-usgs-09168730-blocked",', '      "lastRunId": "route-worker-current-continuation-202609051830-co-usgs-09169500-blocked",')
$tasksRaw = $tasksRaw.Replace('      "latestGatekeeperId": "gatekeeper-current-continuation-202609051720-co-usgs-09168730-blocked",', '      "latestGatekeeperId": "gatekeeper-current-continuation-202609051820-co-usgs-09169500-blocked",')
$oldTail = '09168730 remains durably blocked as the direct-gauge Slickrock-to-Bedrock Dolores opportunity because current endpoint rights/parking, conservative release threshold, route-specific hazard/logistics, imagery, and canonical geometry gates are incomplete, and the next pointer is usgs:09169500.'
$newTail = '09168730 remains durably blocked as the direct-gauge Slickrock-to-Bedrock Dolores opportunity because current endpoint rights/parking, conservative release threshold, route-specific hazard/logistics, imagery, and canonical geometry gates are incomplete, 09169500 remains durably blocked as the direct-gauge Bedrock-to-Gateway Dolores opportunity because current endpoint rights/parking/security, conservative release threshold, route-specific hazard/logistics, imagery, and canonical geometry gates are incomplete, and the next pointer is usgs:09171100.'
if (-not $tasksRaw.Contains($oldTail)) { throw 'Expected baseline summary tail was not found.' }
$tasksRaw = $tasksRaw.Replace($oldTail, $newTail)
$taskStart = $tasksRaw.LastIndexOf(('    {' + $nl + '      "id": "co-state-coverage-gauge-review-batch-09169500"'))
$tasksEnd = $tasksRaw.LastIndexOf(('  ]' + $nl + '}'))
if ($taskStart -lt 0 -or $tasksEnd -lt $taskStart) { throw 'Expected ready 09169500 task was not found.' }
$stateTask = [ordered]@{
  id = 'co-state-coverage-gauge-review-batch-09169500'
  title = 'Review next Colorado gauge from pointer'
  lane = 'completed'
  kind = 'state_coverage'
  owner = 'gauge-coverage'
  priority = 'critical'
  summary = 'Recorded 09169500 as blocked/route_capable direct for the Bedrock-to-Gateway Dolores reach because the named gauge-tied route, lower-river access, camping, permit, and flow context are established but current endpoint rights/parking/security, conservative release threshold, route-specific hazards/logistics, imagery, and geometry gates remain incomplete. No route was added. The next actual unreviewed Colorado gauge is 09171100.'
  evidence = @('docs/operations/gauge-inventory.json','docs/operations/gauge-review-ledger.json','docs/operations/gate-policy.json')
  stateId = 'CO'
  inventoryId = 'provider-baseline-202608272235'
  gaugeKeys = @('usgs:09169500')
  frontierTier = 6
  routeOpportunity = $true
  opportunitySource = 'state_coverage'
  createdAt = '2026-09-05T17:30:00Z'
  startedAt = '2026-09-05T17:50:00Z'
  completedAt = '2026-09-05T18:30:00Z'
  lastRunId = 'route-research-current-continuation-202609051800-co-usgs-09169500-blocked'
  latestGatekeeperId = 'gatekeeper-current-continuation-202609051820-co-usgs-09169500-blocked'
  validationStatus = 'passed'
  resultSummary = 'Bounded research, independent verification, gatekeeper review, and controller closure passed. No route was added; 09169500 is durably blocked/route_capable direct. The next actual unreviewed Colorado gauge is 09171100.'
}
$routeTask = [ordered]@{
  id = 'route-opportunity-co-usgs-09169500'
  title = 'Screen Colorado gauge usgs:09169500'
  lane = 'blocked'
  kind = 'route_research'
  owner = 'route-research'
  priority = 'high'
  summary = 'No route added; durable blocked/route_capable direct disposition recorded for 09169500 because the Bedrock-to-Gateway Dolores reach is gauge-tied and documented, but current endpoint rights/parking/security, conservative release threshold, route-specific hazard/logistics, imagery, and canonical geometry gates remain incomplete.'
  evidence = @('docs/operations/gauge-review-ledger.json','docs/operations/route-opportunity-queue.json','gauge:usgs:09169500','blocker:Current endpoint rights/parking/security, conservative release threshold, hazard/logistics, imagery, and canonical geometry remain incomplete.')
  stateId = 'CO'
  inventoryId = 'provider-baseline-202608272235'
  gaugeKeys = @('usgs:09169500')
  frontierTier = 6
  routeOpportunity = $true
  opportunitySource = 'state_coverage'
  createdAt = '2026-09-05T17:50:00Z'
  startedAt = '2026-09-05T17:55:00Z'
  completedAt = '2026-09-05T18:00:00Z'
  lastRunId = 'route-research-current-continuation-202609051800-co-usgs-09169500-blocked'
  validationStatus = 'passed'
  resultSummary = 'No route added; durable blocked/route_capable direct disposition recorded. Retry only when current endpoint/rights/security, conservative release threshold, hazard/logistics, imagery, and canonical geometry gates pass.'
}
$nextTask = [ordered]@{
  id = 'co-state-coverage-gauge-review-batch-09171100'
  title = 'Review next Colorado gauge from pointer'
  lane = 'ready'
  kind = 'state_coverage'
  owner = 'gauge-coverage'
  priority = 'critical'
  summary = 'Review the next actual unreviewed Colorado gauge, 09171100. Apply the fast corridor, endpoint, direct-gauge, threshold, access, safety, camping, coordinate, image, and geometry screen.'
  evidence = @('docs/operations/gauge-inventory.json','docs/operations/gauge-review-ledger.json','docs/operations/gate-policy.json')
  stateId = 'CO'
  inventoryId = 'provider-baseline-202608272235'
  gaugeKeys = @('usgs:09171100')
  frontierTier = 6
  routeOpportunity = $true
  opportunitySource = 'state_coverage'
  createdAt = '2026-09-05T18:30:00Z'
  validationStatus = 'ready'
}
$taskBlock = (IndentedJson $stateTask) + ",`n" + (IndentedJson $routeTask) + ",`n" + (IndentedJson $nextTask)
$tasksRaw = $tasksRaw.Substring(0, $taskStart) + $taskBlock + $nl + $tasksRaw.Substring($tasksEnd)
Write-Raw $tasksPath $tasksRaw

function Append-Runs([string]$path, $objects, [string]$updatedAt) {
  $fullPath = Join-Path (Get-Location) $path
  $raw = [System.IO.File]::ReadAllText($fullPath)
  $raw = [regex]::Replace($raw, '(?m)^  "updatedAt": "[^"]+",', ('  "updatedAt": "' + $updatedAt + '",'), 1)
  $marker = '  ]' + $nl + '}'
  $idx = $raw.LastIndexOf($marker)
  if ($idx -lt 0) { throw 'Runs array terminator was not found.' }
  $parts = @($objects | ForEach-Object { IndentedJson $_ })
  $insert = ',' + $nl + ($parts -join (',' + $nl))
  $raw = $raw.Substring(0, $idx) + $insert + $nl + $raw.Substring($idx)
  Write-Raw $path $raw
}
$validation = [ordered]@{ evidence = $true; safety = $true; verification = $true; tests = $true; build = $true; rollback = $true }
$runTaskId = 'co-state-coverage-gauge-review-batch-09169500'
$runs = @(
  [ordered]@{
    id = 'route-research-current-continuation-202609051800-co-usgs-09169500-blocked'
    kind = 'route_research'
    startedAt = '2026-09-05T17:50:00Z'
    completedAt = '2026-09-05T18:00:00Z'
    status = 'completed'
    taskId = $runTaskId
    stateId = 'CO'
    inventoryId = 'provider-baseline-202608272235'
    gaugeKeys = @('usgs:09169500')
    result = 'Bounded same-state research confirmed direct 09169500 Dolores River at Bedrock telemetry and the gauge-tied Bedrock-to-Gateway opportunity, including release-dependent flow, access/security, camping/permit, and route hazard context; current publication gates remain incomplete and no route was added.'
    validation = $validation
    routeAdded = $false
    routeSlugs = @()
    validationStatus = 'passed'
  }
  [ordered]@{
    id = 'independent-verifier-current-continuation-202609051810-co-usgs-09169500-blocked'
    kind = 'independent_verification'
    startedAt = '2026-09-05T18:00:00Z'
    completedAt = '2026-09-05T18:10:00Z'
    status = 'completed'
    taskId = $runTaskId
    stateId = 'CO'
    inventoryId = 'provider-baseline-202608272235'
    gaugeKeys = @('usgs:09169500')
    result = 'Independently verified direct station identity, the named Bedrock-to-Gateway reach, current access/security and private-access constraints, release-dependent flow guidance, camping/permit requirements, and remaining endpoint, hazard, threshold, imagery, and geometry gaps. No route publication was authorized.'
    validation = $validation
    routeAdded = $false
    routeSlugs = @()
    validationStatus = 'passed'
  }
  [ordered]@{
    id = 'gatekeeper-current-continuation-202609051820-co-usgs-09169500-blocked'
    kind = 'gatekeeper_verification'
    startedAt = '2026-09-05T18:10:00Z'
    completedAt = '2026-09-05T18:20:00Z'
    status = 'passed'
    taskId = $runTaskId
    stateId = 'CO'
    inventoryId = 'provider-baseline-202608272235'
    gaugeKeys = @('usgs:09169500')
    result = 'No-add gate passed for 09169500. The blocked/route_capable direct disposition is evidence-backed and independently verified, with no safety exception or policy override.'
    validation = $validation
    routeAdded = $false
    routeSlugs = @()
    validationStatus = 'passed'
  }
  [ordered]@{
    id = 'route-worker-current-continuation-202609051830-co-usgs-09169500-blocked'
    kind = 'controller'
    startedAt = '2026-09-05T18:20:00Z'
    completedAt = '2026-09-05T18:30:00Z'
    status = 'completed'
    taskId = 'co-state-coverage-baseline-01'
    stateId = 'CO'
    inventoryId = 'provider-baseline-202608272235'
    gaugeKeys = @('usgs:09169500')
    activeTaskIds = @('co-state-coverage-baseline-01')
    completedTaskIds = @('co-state-coverage-gauge-review-batch-09169500')
    nextQueuePointer = 'usgs:09171100'
    queueWindow = [ordered]@{ active = 0; ready = 1; researching = 0; maxGlobal = 20; maxPerState = 5 }
    result = 'Recorded the durable blocked/route_capable direct disposition for 09169500, advanced the Colorado state-coverage pointer to the next actual unreviewed local inventory gauge 09171100, and preserved Virginia W57 records and unrelated worktree changes.'
    validation = $validation
    latestGatekeeperId = 'gatekeeper-current-continuation-202609051820-co-usgs-09169500-blocked'
    routeAdded = $false
    routeSlugs = @()
    validationStatus = 'passed'
  }
)
Append-Runs 'docs/operations/runs.json' $runs '2026-09-05T18:30:00Z'
