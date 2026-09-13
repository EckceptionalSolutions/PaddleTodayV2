import { mkdir, writeFile } from 'node:fs/promises';
import { routeInventory } from '../src/data/rivers';
import { isPublicRoute, isScoreEligible } from '../src/data/route-publication';

const states = [
  'Alabama', 'Arizona', 'California', 'Connecticut', 'Florida', 'Louisiana',
  'Massachusetts', 'Mississippi', 'Montana', 'Nevada', 'New Hampshire',
  'New Mexico', 'Oregon', 'Rhode Island', 'South Carolina', 'Vermont', 'Washington',
] as const;

const report = {
  version: 1,
  generatedAt: new Date().toISOString(),
  targetPerState: 30,
  selectionPolicy: 'demand-first, scored-first',
  notes: 'Counts include current route inventory. Stop below 30 only after a documented research shortfall; never pad with unsupported or redundant reaches.',
  states: states.map((state) => {
    const routes = routeInventory.filter((route) => route.state === state);
    const scored = routes.filter(isScoreEligible);
    const publicRoutes = routes.filter(isPublicRoute);
    return {
      state,
      total: routes.length,
      scored: scored.length,
      planning: routes.length - scored.length,
      public: publicRoutes.length,
      remainingToTarget: Math.max(0, 30 - routes.length),
      routeIds: routes.map((route) => route.id),
    };
  }),
};

await mkdir('docs/operations', { recursive: true });
await writeFile('docs/operations/lower-48-expansion-30-progress.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(`Wrote ${report.states.length}-state expansion report.`);
