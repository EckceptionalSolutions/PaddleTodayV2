import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  classifyGaugeRouteReadiness,
  type GaugeInventoryArtifact,
  type GaugeReviewLedgerArtifact,
  type GaugeRouteReadiness,
} from '../src/lib/gauge-coverage';
import { buildRouteOpportunityQueue } from '../src/lib/route-opportunities';

const ledgerPath = resolve(process.cwd(), 'docs/operations/gauge-review-ledger.json');
const inventoryPath = resolve(process.cwd(), 'docs/operations/gauge-inventory.json');
const queuePath = resolve(process.cwd(), 'docs/operations/route-opportunity-queue.json');
const tasksPath = resolve(process.cwd(), 'docs/operations/tasks.json');
const stateRegistryPath = resolve(process.cwd(), 'docs/operations/state-registry.json');
const ledger = JSON.parse(await readFile(ledgerPath, 'utf8')) as GaugeReviewLedgerArtifact;
const counts = new Map<GaugeRouteReadiness, number>();

ledger.reviews = ledger.reviews.map((review) => {
  const routeReadiness = classifyGaugeRouteReadiness(review);
  counts.set(routeReadiness, (counts.get(routeReadiness) ?? 0) + 1);
  return { ...review, routeReadiness };
});

await writeFile(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`, 'utf8');
const inventory = JSON.parse(await readFile(inventoryPath, 'utf8')) as GaugeInventoryArtifact;
const tasks = JSON.parse(await readFile(tasksPath, 'utf8')) as { tasks: Array<{ id: string; lane: string; kind: string; gaugeKeys?: string[]; routeOpportunity?: boolean }> };
const stateRegistry = JSON.parse(await readFile(stateRegistryPath, 'utf8')) as { canonicalStates: Array<{ id: string; frontierTier: number }> };
const stateTiers = new Map(stateRegistry.canonicalStates.map((state) => [state.id, state.frontierTier]));
const queue = buildRouteOpportunityQueue(inventory, ledger, stateTiers, tasks.tasks);
await writeFile(queuePath, `${JSON.stringify(queue, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({
  reviews: ledger.reviews.length,
  routeReadiness: Object.fromEntries([...counts.entries()].sort(([left], [right]) => left.localeCompare(right))),
  queuedOpportunities: queue.opportunities.length,
}, null, 2));
