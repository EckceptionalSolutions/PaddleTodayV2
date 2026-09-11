import { readFile, writeFile } from 'node:fs/promises';
import { listRivers } from '../src/lib/rivers';
import { routeInventory } from '../src/data/rivers';
import { starterCampaignWindow, type StarterCampaign } from '../src/operations/starter-campaign';

const path = 'docs/operations/lower-48-starter-campaign.json';
const campaign = JSON.parse(await readFile(path, 'utf8')) as StarterCampaign;
const routes = listRivers();
const window = starterCampaignWindow(campaign, routes);
const states = campaign.states.map(state => {
  const publicRoutes = routes.filter(route => route.state === state.name);
  return {
    state: state.name, code: state.code,
    inventory: routeInventory.filter(route => route.state === state.name).length,
    publicCheckout: publicRoutes.length,
    scored: publicRoutes.filter(route => route.scoreEligibility === 'scored').length,
    needsScoredCoverage: publicRoutes.every(route => route.scoreEligibility !== 'scored'),
    promotionReviewRouteIds: publicRoutes.filter(route => route.scoreEligibility === 'planning').map(route => route.slug),
    planning: publicRoutes.filter(route => route.scoreEligibility === 'planning').length,
    recreational: publicRoutes.filter(route => route.routeType !== 'whitewater').length,
    riverSystems: new Set(publicRoutes.map(route => route.riverId ?? route.name)).size,
    routeIds: publicRoutes.map(route => route.slug),
    pause: state.pause,
  };
});
const report = {
  generatedAt: new Date().toISOString(),
  selectionPolicy: campaign.selectionPolicy ?? 'public-coverage',
  countsDescribe: 'Non-withheld public checkout catalog; not proof of deployment, completed research, or quality review.',
  nextPassTarget: window?.target ?? null, nextEligibleStates: window?.eligible.map(state => state.name) ?? [], states,
};
await writeFile('docs/operations/lower-48-starter-progress.json', JSON.stringify(report, null, 2) + '\n');
console.table(states.map(({ state, publicCheckout, scored, planning, recreational, riverSystems }) => ({ state, publicCheckout, scored, planning, recreational, riverSystems })));
console.log(`Current pass target: ${report.nextPassTarget ?? 'none'}; deployment tracked in the campaign release records.`);
