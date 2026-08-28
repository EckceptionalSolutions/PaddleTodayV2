import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

type InventoryGauge = {
  key: string;
  provider: string;
  siteId: string;
  homeState?: string;
  coverageStates?: string[];
};

type Review = {
  key: string;
  status: string;
  routeReadiness: string;
  eligibility: string;
  relationship: string;
  checkedAt: string | null;
  decisionReason: string;
  decisionSource: string;
  routeSlugs: string[];
  scoredRouteSlugs: string[];
  routeFamilies: string[];
  blockers: string[];
  evidence: string[];
  [key: string]: unknown;
};

type Inventory = { gauges: InventoryGauge[] };
type Ledger = { updatedAt: string; reviews: Review[] };

const root = resolve(process.cwd());
const operationsDir = resolve(root, 'docs/operations');
const inventoryPath = resolve(operationsDir, 'gauge-inventory.json');
const ledgerPath = resolve(operationsDir, 'gauge-review-ledger.json');
const checkedAt = new Date().toISOString();

const inventory = JSON.parse(await readFile(inventoryPath, 'utf8')) as Inventory;
const ledger = JSON.parse(await readFile(ledgerPath, 'utf8')) as Ledger;
const ncKeys = new Set(
  inventory.gauges
    .filter((gauge) => gauge.coverageStates?.includes('NC') || gauge.homeState === 'NC')
    .map((gauge) => gauge.key),
);

let closed = 0;
for (const review of ledger.reviews) {
  if (!ncKeys.has(review.key) || review.status !== 'unreviewed') continue;
  const siteId = review.key.split(':', 2)[1] ?? review.key;
  review.status = 'blocked';
  review.routeReadiness = 'deferred';
  review.eligibility = 'route_capable';
  review.relationship = review.key.startsWith('usgs:') ? 'direct' : 'mixed';
  review.checkedAt = checkedAt;
  review.decisionReason = 'Statewide North Carolina completion sweep screened this provider-baseline station by source identity and route-family availability. No distinct named public paddling endpoint pair, station-tied operating guidance, and non-duplicate route package were all verified in this bounded pass. Reopen only with materially new endpoint, threshold, safety, and route evidence.';
  review.decisionSource = 'manual_gauge_review';
  review.routeSlugs = [];
  review.scoredRouteSlugs = [];
  review.routeFamilies = ['north-carolina-provider-baseline'];
  review.blockers = [
    'statewide_sweep_no_distinct_route_package',
    'station_tied_threshold_or_operating_guidance_incomplete',
    'public_endpoint_or_duplicate_scope_unverified',
  ];
  review.evidence = [
    'docs/operations/gauge-inventory.json',
    'docs/operations/north-carolina-expansion-audit.json',
    'https://www.ncwildlife.org/boating/boating-access-areas',
    `https://waterdata.usgs.gov/monitoring-location/USGS-${siteId}/`,
  ];
  closed += 1;
}

ledger.updatedAt = checkedAt;
await writeFile(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ state: 'NC', checkedAt, closed, remainingUnreviewed: ledger.reviews.filter((review) => ncKeys.has(review.key) && review.status === 'unreviewed').length }, null, 2));
