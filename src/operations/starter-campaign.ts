export interface StarterCampaign {
  version: number;
  active: boolean;
  passTargets: number[];
  maximumBatchSize: number;
  selectionPolicy?: 'scored-first';
  states: Array<{
    code: string;
    name: string;
    pause: null | { reason: string; retryCondition: string; until?: string };
  }>;
}

/** Use actual non-withheld public routes, not ledger status or registry membership. */
export function starterCampaignWindow(
  campaign: StarterCampaign,
  routes: ReadonlyArray<{ state: string; slug: string }>,
  now = new Date(),
) {
  if (!campaign.active) return null;
  if (!campaign.passTargets.length || campaign.passTargets.some((target, i) =>
    !Number.isInteger(target) || target <= 0 || (i > 0 && target <= campaign.passTargets[i - 1]))) {
    throw new Error('Starter campaign targets must be positive and increasing.');
  }
  if (!Number.isInteger(campaign.maximumBatchSize) || campaign.maximumBatchSize < 1) {
    throw new Error('Starter campaign batch size must be a positive integer.');
  }
  const states = campaign.states.map(state => {
    if (state.pause && (!state.pause.reason.trim() || !state.pause.retryCondition.trim())) {
      throw new Error(`Campaign pause for ${state.name} requires a reason and retry condition.`);
    }
    if (state.pause?.until && !Number.isFinite(Date.parse(state.pause.until))) {
      throw new Error(`Invalid campaign retry date for ${state.name}.`);
    }
    return {
      ...state,
      count: new Set(routes.filter(route => route.state === state.name).map(route => route.slug)).size,
      paused: Boolean(state.pause && (!state.pause.until || new Date(state.pause.until) > now)),
    };
  });
  const target = campaign.passTargets.find(value => states.some(state => !state.paused && state.count < value));
  return {
    target: target ?? null,
    states,
    eligible: states.filter(state => !state.paused && target !== undefined && state.count < target)
      .map(state => ({ ...state, batchLimit: Math.min(campaign.maximumBatchSize, target! - state.count) })),
  };
}
